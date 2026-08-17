# HarnessRouter 产品分析：把 Codex / Claude Code 变成应用里的 Agent backend

> 生成时间：2026-07-25
> 查询：https://harnessrouter.ai/ 研究下这个产品
> 研究快照：官网、Pricing、Docs、官方 `agents.md`、GitHub、Product Hunt、YC 公司页及竞品官方文档；产品刚发布，价格、roadmap 与生产能力可能快速变化

## 摘要

**HarnessRouter 的产品本质不是 model router，也不是新的 Coding Agent，而是托管的 Agent execution backend。** 产品开发者通过一套 API，把终端里的 Codex、Claude Code、Hermes 变成自己应用里的 runtime worker；HarnessRouter 负责 sandbox、agent loop、长任务 session、SSE、文件产物、超时、恢复、trace 和部分成本控制，调用方继续负责 UI、用户认证、tenant authorization、业务数据与最终验收。

我的判断是：

1. **问题真实，组合也有价值。** 把一个会用 shell、文件、MCP 和 Skills 的长任务 Agent 安全地嵌入多租户产品，确实远比一次 LLM API 调用复杂。HarnessRouter 把 `task → durable run → files/artifacts` 做成统一接口，能显著缩短原型和早期产品上线时间。
2. **当前更像“managed harness gateway”，不是智能路由。** 官网的核心是手工选择或配置 `codex`、`claude-code`、`hermes`；公开资料没有证明它已经根据任务自动选择最优 harness。创始团队谈到的 harness + model eval routing 更像正在形成的方向。
3. **最聪明的产品机制是让 Coding Agent 反过来完成集成。** 用户把官方 `agents.md` 交给 Codex / Claude Code，由 Agent 自动创建 server routes、session ownership、SSE parser、file proxy 与 renderer。这降低了 SDK 学习成本，也把官方集成规范变成增长渠道；但该文件会在产品规划前强制进入 API-key 配置并修改 `.env`、`.env.example`、`.gitignore`，具有明显的 vendor capture 和 repo mutation 风险。
4. **公开产品仍非常早。** 2026-07-25 GitHub organization 只有一个公开 repo，内容仅一份 License、1 commit、2 stars；产品本周才在 Product Hunt 发布。官网客户 Logo、医疗/合规案例、durability、横向扩展与 eval suite 都主要是厂商自述，缺独立 benchmark、公开 SLA、事故记录和可核验用量。
5. **生产安全边界目前不足。** 创始人在发布讨论中确认：公网 SaaS sandbox 当前允许直接 outbound internet，可配置 egress 尚在 roadmap；tool call 默认在 sandbox 内自主执行，Human-in-the-Loop permission gating 仍是下一小版本；严格 per-request token cap / per-user dollar cap、BYOK 和持久业务数据库也尚未发布。
6. **最大竞争不是另一个小型 router，而是原厂平台化。** Anthropic Managed Agents 已原生提供 Agent / Environment / Session / Events、cloud 或 self-hosted sandbox、Skills、MCP、permission policy 和长任务恢复；E2B、Daytona 已把隔离、持久 workspace、pause/resume 做成成熟底座。HarnessRouter 必须证明跨 harness portability、任务级 eval routing、可靠性和企业隔离的价值高于额外中间层风险。

一句话结论：**HarnessRouter 是一个方向成立、集成设计有巧思、但生产证据与安全控制明显落后于叙事的早期 Agent backend；适合无敏感数据的可逆 PoC，不适合现在成为高权限或受监管业务的不可替换控制面。**

## 1. 它到底卖什么

### 买方

买方是想在自己的产品里提供 Agent 功能的 founder、开发者和应用团队，不是直接使用 Coding Agent 的个人。

典型需求是：

- 用户提交一个 brief，应用返回视频、游戏、代码库、文档或可审查 Diff；
- 一个任务持续数分钟，有 shell、文件、浏览、MCP 和多步验证；
- 断开浏览器或 SSE 后，任务仍在后台运行；
- 用户可以查看进度、继续、取消、预览和下载产物；
- 不想自己拼 agent loop、sandbox、session、event store、file store 和 retry。

### 交付结果

HarnessRouter 真正交付的是：

> **一个可以被宿主产品调用、能完成多步任务并返回文件产物的托管 Agent run。**

它不是完整应用 backend。官方集成规范明确把责任分成两边：

| HarnessRouter 负责 | 宿主产品负责 |
|---|---|
| Base harness、model policy、agent loop | UI 与产品体验 |
| Sandbox、shell、files、Skills、MCP | 用户认证与 tenant authorization |
| Session continuity、stream、run recovery | 产品记录、业务数据与 ownership mapping |
| Retry、timeout、cancel、trace | 结果展示、验收、保存、退款与责任边界 |
| Artifact/file API | 浏览器侧安全渲染与下载代理 |

所以官网的 “AI agents as your product backend” 更准确地应写成 **Agent execution backend**。

## 2. 实现链路

```text
End user
  → Host app UI
  → authenticated server route
  → feature_key → allowlisted harness_id
  → POST /{harness_id}/v1/responses
  → HarnessRouter control plane
  → Codex / Claude Code / Hermes + model
  → isolated workspace + tools / MCP / Skills
  → durable events + files + Artifact metadata
  → host app proxy / renderer / approval
```

具体链路可从官方 `agents.md` 还原：

1. Builder 创建 Workspace API key，server-side 保存为 `HR_API_KEY`。
2. 通过 `POST /v1/harnesses` 创建 purpose-specific configured agent，指定 base harness、model、system prompt、MCP servers、Skills 与 limits。
3. 宿主产品只允许前端提交受信任的 `feature_key`，server-side 将其映射到 allowlisted `harness_id`，避免用户直接选择任意高权限 Agent。
4. 初始任务调用 `POST /{harness_id}/v1/responses`，必须带新的 `Idempotency-Key`；长任务优先使用 SSE。
5. `response.created` 后立即保存 `response.id` 与 `response.metadata.session_id`。网络断开不取消 server-side run；应用从 Session、turns 和 files 恢复。
6. 继续任务时传 `previous_response_id + session_id`；取消任务显式调用 `/sessions/{id}/cancel`。
7. 文件下载 URL 仍需要 Workspace Bearer key，因此浏览器不能直接访问，必须经过宿主产品的 authenticated proxy。
8. 宿主产品必须隔离 HTML/code preview，并验证第二个用户不能读取、继续、取消或下载第一个用户的 Session。

这是相当具体、工程上也基本正确的 integration contract。尤其是 idempotency、断线恢复、tenant ownership、受保护文件代理和跨用户测试，说明团队确实踩过 Agent backend 的常见坑。

## 3. 当前公开能力

### 已公开、可从文档确认

- Base harness：Codex、Claude Code、Hermes；Pi 标记为 coming soon。
- Configured agent：purpose、system prompt、model、MCP servers、Skills、max steps、timeout。
- OpenAI Responses 风格的 `data:`-only SSE。
- Durable Session、turn history、Continue、Cancel。
- Session workspace 的文件列举、单文件下载、最近一轮 changed files、完整 zip archive。
- Code、Diff、Markdown、JSON、HTML、图片、PDF、Office、CSV/XLSX 与多文件项目的 Artifact 交付设计。
- Run trace、event count、model/backend、elapsed、cost 等可观察字段。
- Workspace-scoped API key；通过声明 `additional_headers` 转发 per-user JWT 给 MCP，避免把用户 token 存入 Agent 配置。
- 默认 server limit 语义：约 400 steps / 1800 秒；具体值仍应以部署 API 为准。

### 不是当前已证明的能力

- 根据任务自动选择最佳 harness/model 的生产 router；
- 跨 harness 相同质量的 “swap-and-forget”；
- 完整 Human-in-the-Loop tool approval；
- deny-by-default 或 allowlist egress；
- per-request token / dollar hard cap、per-user monthly budget；
- BYOK；
- 宿主应用所需的通用持久数据库；
- 公布的 P50/P95/P99、success rate、恢复丢失率、uptime 或 SLA；
- 公开的 eval suite、客户任务集或第三方 benchmark；
- 公开 SOC 2、HIPAA、DPA、数据保留/删除和 incident response 材料。

## 4. 产品设计上的真正巧思

### 4.1 用 `agents.md` 取代传统 Quickstart

传统 infra 产品让人读 API docs、复制 SDK 示例。HarnessRouter 让 Coding Agent 读一份完整集成协议，然后直接在 repo 里完成接入。

这个机制有三重价值：

1. **降低学习成本**：Builder 不必自己理解所有 Session/SSE/file edge cases。
2. **把 best practice 变成可执行分发物**：官方指南不是给人看的 marketing tutorial，而是给 Agent 的 implementation spec。
3. **跟随 Coding Agent 能力升级**：宿主 app 的 UI、server route、测试和 renderer 由当前最强 Coding Agent 生成，HarnessRouter 不必自己提供前端框架。

但它也有明显问题：

- 指南要求第一个 tool call 先处理 API key，早于产品规划；
- 会创建或修改 `.env`、`.env.example`、`.gitignore`，甚至调用 OS-native password dialog；
- 用 standing rule 要求多步 runtime 功能一律走 HarnessRouter，不允许 hand-roll loop；
- 一份远程可更新的超长指令正在影响客户 repo 和凭证流程，必须 pin version、review diff，并限制它的写权限。

因此 `agents.md` 同时是 **integration accelerator、sales channel 和 vendor policy injection**。

### 4.2 统一的是任务结果，不只是模型输出

OpenRouter 一类产品统一的是 model request/response；HarnessRouter 试图统一的是：

```text
task
→ harness execution
→ event trajectory
→ durable session
→ files / artifacts
→ continue / revise / accept
```

这比 model gateway 更接近用户买单的“完成工作”。如果接口稳定，它让宿主应用不必知道 Codex 和 Claude Code 的内部事件差异。

### 4.3 `harness + model + tools + skills + eval` 才是路由单元

团队在 Product Hunt 的回答承认，换一行 base harness 不会自动得到等价结果；真正可移植的是 typed tools、Skills、job-level instructions 和 eval suite。切换 harness 后必须重跑真实任务 eval，再修正 tool boundary。

这个判断是对的，也符合 [harness-engineering](/wiki/concepts/harness-engineering/)：**同一 model 换 harness 会改变结果，同一 prompt 换 harness 更不会天然等价。**

如果 HarnessRouter 最终能积累：

- task type；
- 完整 harness/model/config version；
- tool trajectory；
- success/failure；
- 人工接受、修改、退款或复购；
- latency 与 cost；

它才可能从 gateway 升级为 task-level harness router 和 [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) 飞轮。当前公开证据还没有证明这个飞轮已经运转。

## 5. 真实边界与风险

### 5.1 安全控制落后于高权限叙事

官网把 permissions 和 guardrails 列为已解决 backlog，但创始人在发布讨论中明确：

- 当前 sandbox 可直接访问公网；
- configurable egress 仍在 roadmap；
- tool calls 在 sandbox 内自主执行，不回到宿主 app 做逐次 permission handshake；
- Human-in-the-Loop gating 是下一小版本。

这意味着它目前更适合“隔离环境内生成 artifact”，不适合直接持有支付、生产运维、患者数据或不可逆业务 action 权限。VM isolation 只能限制 sandbox 之间的影响，不能阻止 Agent 把允许读取的数据发到公网，或通过已授权 MCP 做错误 side effect。

按照 [safe-autonomy](/wiki/concepts/safe-autonomy/)，生产控制至少还需要：

- network egress hard boundary；
- task-scoped credential；
- backend-side deterministic authorization；
- tool allowlist / argument validation；
- high-risk action HOLD / approval；
- audit、kill switch 与 fail-closed 行为。

### 5.2 Session durable 不等于 side effect durable

公开资料说明 run events 和 workspace 会持久化，control-plane node 失败后可以恢复。但没有说明：

- tool call 在写入成功、ack 丢失时如何避免重复执行；
- 外部支付、邮件、数据库写入如何做 exactly-once 或 reconciliation；
- checkpoint 恢复时如何判定外部 side effect 已发生；
- cancel 与 timeout 时正在进行的工具调用如何收敛。

所以当前能确认的是 **conversation/workspace durability**，不能外推为经济行为的事务性 durability。

### 5.3 “不锁定”只在 API surface 层成立

HarnessRouter 的 host integration、Session、files 和 Artifact API 可以屏蔽部分底层差异，这是真的。但：

- Claude Code、Codex、Hermes 的 prompt semantics、tool usage、permission model、context management 和输出习惯不同；
- 具体 Skills 可能依赖某个 harness 的工具名与 filesystem 约定；
- 同一输出 contract 不代表相同成功率；
- 历史 Session 能否跨 base harness 无损继续，公开资料没有证明。

因此一行切换解决的是 **mechanical portability**，不是 **behavioral portability**。后者必须由同任务 eval 和人工验收保证。

### 5.4 HarnessRouter 本身成为单点依赖

创始人在发布讨论中直接承认：control plane 全面故障时，不会自动让客户绕过 HarnessRouter 直连 provider；通过它的调用会一起失败。内部可做 provider/model failover、control plane 横向扩展和 durable event recovery，但这仍是新的 hard dependency。

生产客户需要验证：

- multi-region 与 edge failure；
- control plane / event store / file store 的 RTO、RPO；
- 限流、背压与 noisy neighbor；
- provider outage 与 HarnessRouter outage 的区分；
- 数据和 Agent config 的完整 export；
- 紧急 direct-provider fallback 是否真能在不重写业务的情况下启用。

### 5.5 数据与合规表述还不完整

Product Hunt 回答称医疗客户可使用同一 private network、只读 reference mount、任务后销毁 workspace，且客户数据不用于训练。这可能对应 Enterprise private deployment，不足以说明公共 SaaS 的：

- region / residency；
- source file、event、artifact、trace 的默认 retention；
- backup 和 deletion SLA；
- subprocess / model provider 的数据流向；
- DPA、BAA、SOC 2、HIPAA 状态；
- support/engineering access；
- 跨客户 telemetry 是否用于 eval 或 routing。

在没有正式安全和法律文件前，医疗 Logo 不能作为合规证明。

### 5.6 价格无法算清单次成功交付

公开计划：

| Plan | 月费 | 当前公开说明 |
|---|---:|---|
| Developer | $20 | 含 production credits，可 top-up |
| Production | $100 | 含 production credits，可 top-up |
| Scale | $200 | 含 production credits，可 top-up |
| Enterprise | 年约 | private deployment、security review、audit controls、SLA |

但官网没有公开：

- 每个计划具体包含多少 credits；
- credit 与美元、token、sandbox time、tool cost 的换算；
- top-up 单价；
- 并发、Session、storage、retention 和 rate limit；
- 失败、重试、incomplete run 如何计费；
- 不同 harness/model 的成本差异。

而且高档计划不降低 production usage 单价。现在无法计算 `cost per accepted artifact`，也无法判断平台毛利和客户预算可预测性。

## 6. 竞品位置

| 方案 | 提供什么 | HarnessRouter 的相对价值 | HarnessRouter 的劣势 |
|---|---|---|---|
| Anthropic Managed Agents | 原生 Agent / Environment / Session / Events、cloud/self-hosted sandbox、tools、Skills、MCP、permission policy | 跨 Codex / Claude / Hermes；统一 Artifact API | 原厂能力更深，安全、版本、品牌和可靠性路径更直接 |
| OpenAI Responses / Agents SDK / Codex | OpenAI 模型与 agent primitives、tools、background/multi-turn execution | 可替换 OpenAI，不锁单一模型厂商 | 如果客户只用 OpenAI，多一层网关未必值得 |
| E2B | 隔离 sandbox、filesystem + memory pause/resume、snapshot、长期保留 | 不只给 compute，还运行完整 base harness 并规范 Session/Artifact | E2B compute 更成熟、可组合、基础设施证据更强 |
| Daytona | sandbox、persistence、snapshot/fork/volume、OpenAI Agents integration | 更上层，开发者少拼 agent loop 与 output contract | Daytona 更通用，可自选 framework，基础能力更完整 |
| 自建 Agent SDK + sandbox + workflow | 最大控制、可贴合业务 auth/policy/eval | HarnessRouter 上线更快、维护更少 | 自建可避免平台依赖，并把业务语义留在自己 control plane |

最直接的替代判断：

- **只需要 Claude**：先看 Anthropic Managed Agents。
- **只需要 OpenAI / Codex**：先看 OpenAI 原生 API/SDK。
- **需要自定义 loop 与 compute**：E2B / Daytona + Agent SDK。
- **确实需要多种完整 harness、统一 Session/Artifact，并愿意让第三方成为 control plane**：HarnessRouter 才有明显理由。

## 7. 公司与商业判断

### 公司脉络

- HarnessRouter 官网写 “Backed by Y Combinator”。
- YC 官方当前收录的是 **Epsilla（S23）**，创始人为 Richard Song 与 Ricki Qin，定位仍是 private-knowledge Agent platform。
- HarnessRouter 的 Product Hunt 页面复用了 `p/epsilla` 产品页和既有 followers/review，Maker 包括 Richard Song 与 Kuanze Ma。

因此更准确的表述是：

> **HarnessRouter 看起来是 YC S23 公司 Epsilla 团队推出的新产品或战略转向，不应把它解读成一个全新的 YC 项目，也不能把 Epsilla 历史 followers/review 直接算作 HarnessRouter adoption。**

这段历史有双重含义：

- 正面：团队做过 vector DB、knowledge Agent 与企业客户，可能已有 infra 和 FDE 能力；
- 风险：从 Epsilla、SwarmStack、ClawTrace 到 HarnessRouter 的多次 launch 说明仍在找最强 wedge。

### 谁会付费

最可能付费的是：

1. 3–20 人的 AI application startup，没有 runtime/platform team；
2. 需要生成多文件 artifact、长任务和 follow-up 的产品；
3. 同时想比较 Codex、Claude Code 和开源/第三方 harness；
4. 需要 founder-assisted / FDE 集成的企业 PoC。

较弱的客户：

- 单一模型、单次文本生成；
- 已经用原厂 Managed Agent；
- 有成熟 platform/SRE/security team 的大型企业；
- 极强数据主权、低延迟、严格 per-user budget 或不可逆 action 的业务。

### 商业模式

当前是：

```text
platform subscription
+ prepaid usage wallet / top-up
+ Enterprise annual contract / private deployment / services
```

收入可以成立，但毛利同时承受：

- frontier model cost；
- sandbox compute/storage；
- event/file/trace storage；
- retry 与失败 run；
- FDE / support；
- 上游 provider 价格和条款变化。

若没有任务级 routing 节省、较高 platform fee 或 enterprise contract，单纯转售 harness execution 容易成为低毛利中间层。

## 8. Moat 与公司成立条件

### 当前 moat：弱

当前公开能力大多是可复制的组合：

- agent configuration；
- cloud sandbox；
- SSE 和 event store；
- Session / files；
- MCP、Skills；
- model/provider fallback；
- dashboard trace。

GitHub 没有公开核心实现，不能从代码判断调度、隔离、恢复与成本工程。

### 可能形成的 moat

1. **跨 harness task eval data**：同一真实任务在不同 harness/model/config 上的质量、成本、延迟与人工接受数据。
2. **Behavioral portability layer**：将 Skills、typed tools、permissions、Artifact contract 与 eval suite 真正迁移到不同 harness。
3. **可靠性与隔离**：大规模 concurrent run、failure recovery、egress、credential proxy、private deployment。
4. **分发标准**：如果 `agents.md + feature_key + harness_id + Artifact` 成为 builder 熟悉的集成范式。
5. **FDE 形成的 vertical workflows**：反复解决医疗、法律、内容等高价值任务后，把隐性经验编译为可复用 Skills、tools 和 eval。

### 公司真正成立的硬条件

HarnessRouter 需要证明至少四项：

- **结果优势**：同任务的 accepted-output rate 高于单一原厂或自建组合；
- **经济优势**：按成功交付计算的总成本低于客户自建和直接调用；
- **切换优势**：跨 harness 切换只需小幅适配，并通过真实 eval，不只是 API 不变；
- **生产优势**：可公开或 data-room 核验的 uptime、恢复、隔离、egress、HITL、retention、DPA/SLA 和客户用量。

如果做不到，它更可能被吸收为：

- Anthropic / OpenAI 原厂 Managed Agent 的 feature；
- E2B / Daytona 的上层 template；
- Vercel AI SDK / Agents SDK 的 adapter；
- 企业内部 platform team 的一段 orchestration service。

## 9. 对 Combo 的意义

HarnessRouter 与 Combo 的关系不是直接竞品，更像可替换的 production input。

适用：

- creator Agent 返回视频、PPT、代码、网页、数据表等真实 artifact；
- 每次 trial 有独立 workspace、trace、Session 和可下载文件；
- 用 Codex / Claude / Hermes 对同一 creator capability 做 blind eval；
- 快速验证“用户是否愿意为结果付费”，避免先造完整 runtime。

不应交给它的核心：

- creator 的身份、capability lineage 和 approved manifest；
- 用户 / tenant ownership；
- 订单、支付、退款与 settlement；
- outcome verification、人工接管和交付证据；
- 产品级 usage limits 与 unit economics；
- creator judgment、用户反馈和可训练数据授权。

建议只做一个 adapter 后的可逆 PoC：

1. 选一个真实 creator service，而不是 demo prompt；
2. 同一任务对比 HarnessRouter、Anthropic Managed Agents、OpenAI + E2B/Daytona；
3. 测 accepted-output rate、人工修改分钟、P50/P95 latency、失败恢复、单次成功成本；
4. 做跨用户 Session/file 越权测试；
5. 做 prompt injection、outbound exfiltration、MCP side effect 与 cancel/retry 测试；
6. 要求书面确认 data flow、retention、region、subprocessors、DPA/SLA 和 export；
7. 在 egress、HITL、per-user cap 未上线前，不接支付、生产写权限或敏感原始数据。

## 10. 证据分层

### 已验证

- 官网定位、支持的 harness、Pricing plan 和公开 Docs；
- `agents.md` 中的 API path、Session/SSE/file contract、tenant ownership 与安全集成要求；
- GitHub organization 当前只有一个公开 repo，且仅 License / 1 commit；
- Product Hunt 本周发布、#6 day rank、253 points；
- YC 当前公司页仍为 Epsilla S23 及其创始人；
- Anthropic Managed Agents、E2B、Daytona 的官方公开能力。

### 部分验证

- 每次运行独立 sandbox、durable event storage、workspace checkpoint、stateless control plane、provider fallback：有官方文档或创始人说明，未独立压测；
- 客户可以在私有网络运行、reference read-only mount、workspace task 后销毁：创始人针对医疗场景的说明，未见公开架构或审计；
- typed tools + Skills + eval 可降低跨 harness 迁移成本：机制合理，但 eval 未公开。

### 未验证或明确未发布

- 官网客户 Logo 与生产用量；
- “数千 harness 并发”在真实负载下的可靠性；
- 自动 task-level harness routing 的质量收益；
- strict egress、Human-in-the-Loop gating、BYOK、per-user budget、managed persistent DB；
- SOC 2 / HIPAA / DPA / BAA、公开 SLA、RTO/RPO、incident history；
- 单次成功交付成本与平台 gross margin。

## 数据来源

### 外部

- [HarnessRouter 官网](https://harnessrouter.ai/)
- [HarnessRouter Pricing](https://harnessrouter.ai/pricing)
- [HarnessRouter Docs](https://harnessrouter.ai/docs)
- [HarnessRouter 官方 agents.md](https://harnessrouter.ai/agents.md)
- [Harness catalog](https://harnessrouter.ai/docs/harnesses)
- [Agent backend vs model router](https://harnessrouter.ai/guides/agent-backend-vs-model-router)
- [HarnessRouter GitHub organization](https://github.com/HarnessRouter)
- [HarnessRouter Product Hunt 发布页](https://www.producthunt.com/products/epsilla)
- [Epsilla YC 公司页](https://www.ycombinator.com/companies/epsilla)
- [Claude Managed Agents Overview](https://platform.claude.com/docs/en/managed-agents/overview)
- [Claude Managed Agents Tools](https://platform.claude.com/docs/en/managed-agents/tools)
- [E2B Sandbox Persistence](https://e2b.dev/docs/sandbox/persistence)
- [Daytona OpenAI Agents SDK + Sandbox](https://www.daytona.io/docs/en/guides/openai-agents/openai-agents-sdk-with-sandboxes/)

### 知识库

- [harness-engineering](/wiki/concepts/harness-engineering/)
- [harness-engineering](/wiki/maps/harness-engineering/)
- [agent-runtime](/wiki/concepts/agent-runtime/)
- [safe-autonomy](/wiki/concepts/safe-autonomy/)
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)
- [dedalus-labs-product-analysis-2026-07-25](/output/reports/dedalus-labs-product-analysis-2026-07-25/)

---
*由 LLM 从知识库查询生成*
