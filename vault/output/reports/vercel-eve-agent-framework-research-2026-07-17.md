# Eve：Vercel 把 Agent 编译成「可持久运行的软件」

> **一句话结论**：Eve 不是一个可视化/no-code 的 Agent Builder，而是 Vercel 官方推出的、filesystem-first 的开源 Agent application framework。它最像「Agent 时代的 Next.js」：用一个 `agent/` 目录把 instructions、tools、skills、connections、sandbox、subagents、channels、schedules、evals 编译成可持久运行、可测试、可部署的完整应用。

**研究日期**：2026-07-17  
**资料边界**：Eve / Vercel 官方网站、官方文档、官方 GitHub、npm 一手资料；动态数据均按研究当日快照处理。  
**用户入口**：[Eve Introduction](https://eve.dev/docs/introduction)

## 0. 先给判断

### Eve 是什么

Eve 是：

- **Agent application framework**：不是只包一层模型调用，而是规定完整 Agent 项目如何组织、运行和部署；
- **build system**：扫描文件目录、按路径注册能力、生成 discovery / compiled manifest 和 host output；
- **durable runtime contract**：把会话拆成 session / turn / step，用 Workflow SDK checkpoint、暂停和恢复；
- **Vercel Agent Stack 的上层统一入口**：把 AI Gateway、Workflow、Sandbox、Connect、Chat SDK、Observability 接成一条默认路径；
- **开源且可自托管**：Apache-2.0，可用 Nitro Node、direct provider、Docker/microsandbox 和自有 Workflow world 部署。

Eve 不是：

- 可视化 workflow canvas；
- 面向业务人员的 no-code builder；
- 内建 RAG / vector database / tenant-aware long-term memory；
- Agent marketplace、Skill 商店或支付结算平台；
- 已经稳定到 1.0 的成熟标准。

最准确的类比不是「Vercel 版 Dify / Coze」，而是：

> **AI SDK 之上的 Agent application framework，加上一套默认 production harness。**

### 对我们的核心启发

Eve 解决的是：

> **Agent 怎么被构建、测试、部署并稳定跑起来。**

Agora 应解决的是：

> **一个已经能跑的能力，怎么被陌生买家可信购买、授权使用、验证结果，并完成结算和责任归因。**

因此，Eve 会直接压缩「再做一个 Agent Builder / runtime / deployment platform」的空间，但目前还没有覆盖 Agora 的跨 runtime 可信交易层。

---

## 1. 它真的是 Vercel 官方产品吗

是，而且更准确地说是 **Vercel 内部孵化后开源的官方框架**。

| 证据 | 结论 |
|---|---|
| [Vercel 官方发布文章](https://vercel.com/blog/introducing-eve)称 Eve 是其构建和运行内部 Agents 的框架 | 来源是 Vercel 内部实践，不是第三方项目简单换牌 |
| 官方仓库位于 [vercel/eve](https://github.com/vercel/eve) | 代码、Issue、Release 都由 Vercel 组织维护 |
| [NOTICE](https://github.com/vercel/eve/blob/main/NOTICE)写明 Copyright 2026 Vercel, Inc. and contributors | 版权和开发主体明确 |
| [Vercel Eve 产品文档](https://vercel.com/docs/eve)将其列入正式产品体系并标为 Beta | 不是员工个人实验 |
| [SECURITY.md](https://github.com/vercel/eve/blob/main/SECURITY.md)由 Vercel 接收漏洞报告 | 安全责任主体是 Vercel |

官方没有「收购 Eve 公司或外部项目」的叙事。最稳妥的说法是：**Vercel 从内部构建大量 Agent 的经验中抽象出了 Eve。**

### 一个容易误判的 npm 历史

npm 的 `eve` 包名早年曾属于无关的 custom-events 项目。当前 Vercel Agent framework 是从 `0.6.0-beta.1`（2026-06-09）附近开始使用这一包名，随后元数据转向 `github.com/vercel/eve`。

因此：

- 不能把 npm 上 2011 年的创建时间当成当前 Eve 的项目年龄；
- 包名复用不等于 Vercel 收购了当前 Eve framework。

### 当前成熟度快照

截至 2026-07-17：

- License：Apache-2.0；
- 阶段：Public Beta / 0.x；
- npm / GitHub 最新版本：`0.24.6`（2026-07-16）；
- Node.js：`>=24`；
- GitHub 页面约 3.7k stars、340 forks、61 releases；
- 官方自述内部有 100+ 个 production Agents 在跑。

这些信号说明它不是概念 demo，但 **高频发布 + 0.x + Beta** 也意味着 API 和行为仍会快速变化。生产采用应锁版本，并给迁移留预算。

另一个命名陷阱：Vercel 还有一个用于 code review / incident investigation 的 [Vercel Agent](https://vercel.com/docs/agent) 产品，它与 Eve 不是同一个东西，不能把那个产品的功能或定价套到 Eve 上。

---

## 2. Eve 的核心产品思想：「Agent 是一个目录」

[Eve 首页](https://eve.dev/)把最小 Agent 收缩到一个 `instructions.md`。随着能力增加，再往同一目录中放文件：

```text
agent/
├── agent.ts                  # 模型、limits、compaction、runtime config，可选
├── instructions.md          # 稳定身份和行为约束
├── tools/                   # TypeScript typed tools
├── skills/                  # 按需加载的 SKILL.md procedures
├── connections/             # MCP / OpenAPI 外部能力
├── channels/                # Web、Slack、Discord、Teams、GitHub 等
├── sandbox/                 # 隔离 shell/filesystem runtime
├── subagents/               # 专门化 child agents
├── schedules/               # Cron tasks
├── hooks/                   # lifecycle / audit / metrics
├── extensions/              # npm/local reusable capability packages
└── lib/                     # 共享实现

evals/                       # 真实 HTTP session 上运行的测试
```

文件路径就是 identity：

- `tools/get_weather.ts` → tool `get_weather`；
- `connections/linear.ts` → connection `linear`；
- `skills/research/SKILL.md` → skill `research`；
- `subagents/researcher/` → subagent `researcher`。

这套设计有三个重要含义。

### 2.1 Git 直接成为 Agent 的 authoring / review surface

Prompt、tool、skill、approval policy、eval 不再藏在平台数据库里，而是普通文件：

- 可以 diff；
- 可以 code review；
- 可以跑 CI；
- 可以用 preview deployment；
- 可以回滚代码版本；
- coding agent 能直接理解和修改。

### 2.2 Build 会把松散文件编译成确定的运行清单

`eve build` 会生成 discovery manifest、compiled manifest、diagnostics、module map 和对应 host output。`GET /eve/v1/info` 还可以从运行实例检查它实际加载了哪些：

- model / instructions；
- framework 与 authored tools；
- skills / channels / schedules；
- subagents / connections；
- sandbox / hooks / workflow / workspace metadata。

这比「目录里看起来装了什么」更可靠，因为最终可以检查 **编译后、部署中真正生效的能力表面**。

### 2.3 它对 coding agents 非常友好

Eve 把完整文档放进 npm 包的 `node_modules/eve/docs/`。这意味着 Claude Code、Codex 一类 coding agent 在项目本地就能读取与当前安装版本匹配的文档，不必只依赖可能漂移的网页知识。

---

## 3. 它怎么把 Agent 跑起来

整体链路是：

```text
Web / API / Slack / Discord / Teams / GitHub / Linear / Cron
                              ↓
                   Channel auth + normalization
                              ↓
                   durable session / turn / step
                         （Workflow SDK）
                              ↓
                    Eve default model harness
             ↙                ↓                 ↘
trusted app runtime    per-session sandbox    child sessions
tools / state / MCP    shell / files / code   local / remote agents
             ↘                ↓                 ↙
                 durable NDJSON event stream
                 hooks / OTel / Agent Runs
```

### 3.1 Session、Turn、Step

[Execution Model](https://github.com/vercel/eve/blob/main/docs/concepts/execution-model-and-durability.md)定义了三层：

| 层级 | 含义 | 持久化边界 |
|---|---|---|
| Session | 一段完整对话或长任务，可持续数天或数周 | 保存历史、state、stream 与 continuation |
| Turn | 一条用户消息触发的全部工作 | 直到 Agent 产出回复、失败或取消 |
| Step | 一次模型调用及其触发的 tool calls | durable checkpoint |

每个 turn 都在 Workflow SDK 上运行：

- 已完成 step 不重跑，而是 replay 已记录结果；
- crash、timeout、redeploy 后从最近 checkpoint 恢复；
- **执行到一半的 step 会重跑**；
- 等待审批、OAuth 或 subagent 时会 durably park，不持续占用计算。

所以「durable」不等于「任何副作用天然 exactly-once」。付款、发邮件、创建订单等非幂等动作仍要：

- 使用 idempotency key；
- 或放进 approval gate；
- 或把 side-effect receipt 持久化后再判断是否重试。

### 3.2 跨部署版本语义不是 immutable session binding

这是与 Sim 很不一样的一点。

Vercel 上 production deployment 更新后，**已有 session 的下一次 model turn 会使用当前 production deployment 的 instructions、model 和 tools**；conversation history 与 authored state 保留。

优点是 Slack / Telegram / phone conversation 不必新建 session 就能得到 Agent 更新。代价是：

- 一个长期 session 会跨多个代码版本；
- 仅凭 session id 不能证明整段任务一直运行在同一 immutable capability version；
- 若要做交易、验证或责任归因，必须额外记录每个 turn 对应的 deployment / source commit / compiled manifest。

这恰好说明 Agora 不能直接把 Eve session 当作 immutable verified release。

### 3.3 Session 不是 durable FIFO message queue

`continuationToken` 是恢复当前 session 的句柄，不是通用消息队列地址。

官方明确说明：

- 并发输入只会在特定 workflow boundary 被消费；
- 多条消息可能被合并进下一 turn；
- 行为受 transport 和 timing 影响；
- 不应假设它像传统聊天系统一样严格 FIFO。

需要确定性时，应一次发送一条，等待 `session.waiting` 后再发下一条；高并发 channel 应在 app/channel layer 自己维护 per-session queue。

### 3.4 HTTP 协议有两个不同句柄

- `continuationToken`：继续同一对话，由 channel 持有；
- `sessionId / runId`：stream 和 inspect，由 runtime 持有。

核心 API：

```text
POST /eve/v1/session
POST /eve/v1/session/:sessionId
GET  /eve/v1/session/:sessionId/stream
GET  /eve/v1/info
GET  /eve/v1/health
```

Stream 是可 replay 的 NDJSON，支持按 `startIndex` 断线续读。事件覆盖：

- session / turn / step 生命周期；
- user message；
- tool request / result；
- HITL input；
- subagent lineage；
- OAuth authorization；
- reasoning / message streaming；
- compaction；
- structured result；
- cancel / failed / waiting。

这使同一个 runtime 能同时服务 Web UI、channel adapter、eval runner、CLI 和外部系统。

---

## 4. Eve 真正提供了哪些 primitives

| Primitive | Eve 的做法 | 关键边界 |
|---|---|---|
| Instructions | `instructions.md/.ts`，每次 model call 的稳定系统指令 | TS instructions 在 build-time 解析，不是任意运行时记忆 |
| Models | string model id 走 Vercel AI Gateway；AI SDK provider object 可直连 provider | 可 dynamic resolve，但仍需自己管理成本与数据边界 |
| Tools | `defineTool` + Standard Schema / Zod，运行于可信 Node app runtime | **不在 sandbox**；可读 `process.env`，因此必须单独做审批与最小权限 |
| Skills | Agent Skills 兼容 `SKILL.md`，通过 `load_skill` progressive disclosure | 只增加 instructions，不增加执行能力 |
| Connections | MCP / OpenAPI，先 `connection_search` 再调用 namespaced tool | 认证和 allow/block 可配置，但第三方服务风险仍由部署者承担 |
| Sandbox | 每个 session 独立 `/workspace`，支持 Vercel、Docker、microsandbox、just-bash、自定义 backend | 默认 egress 是 `allow-all`；不同 backend 隔离强度不同 |
| State | `defineState` 提供 typed、durable、per-session working memory | 不跨 session / user / subagent；长期记忆要外接数据库 |
| Subagents | root copy、declared specialist、remote Eve agent | child 不看 parent history；上下文必须显式传入 |
| Channels | Web/API、Slack、Discord、Teams、Telegram、Twilio、GitHub、Linear 等 | channel 负责 caller verification 与 continuation ownership |
| Schedules | Markdown cron task | task-mode 不适合需要即时 HITL / OAuth 的工作 |
| Evals | 根目录 `.eval.ts`，对真实 HTTP session 做 deterministic / LLM judge 检查 | 属于作者自己的 software tests，不等于中立 buyer proof |
| Tracing | OpenTelemetry + Vercel Agent Runs | 是调试遥测，不是长期支付/退款/reputation ledger |
| Extensions | npm / local 包复用 tools、connections、skills、instructions、hooks | 不能声明 sandbox、agent config、schedules、limits，也不能嵌套 extension |

### 4.1 Skills 与 Tools 的分界很清楚

[Skills 文档](https://github.com/vercel/eve/blob/main/docs/skills.mdx)明确写道：

- Skill 的 description 始终在模型可见范围；
- 完整 `SKILL.md` 只在匹配任务时通过 `load_skill` 注入；
- packaged Skill 可以带 references / assets / scripts；
- **加载 Skill 只添加指令，不会自动增加新的 tool surface**。

这比把「提示词知识」和「可执行权限」混为一谈更安全，也强化了一个判断：

> Skill 是 context package；Tool / Connection / Extension 才是 executable capability。

### 4.2 Extensions 是 Eve 最值得关注的新对象

[Extensions 文档](https://github.com/vercel/eve/blob/main/docs/extensions.md)允许把以下内容做成 npm 或 local package：

- tools；
- connections；
- skills；
- instructions；
- hooks；
- extension-scoped state。

消费方将它挂载到 `agent/extensions/`，贡献自动 namespace，例如 `crm__search`；还能：

- 传入 typed config；
- override 单个 contribution；
- 为敏感工具补 approval；
- 用 `disableTool()` 禁用贡献；
- 通过 peer dependency 强制 Eve 版本兼容；
- 随 package manager 更新，而不是复制文件。

这已经比纯 `SKILL.md` 更接近真正的 runtime-native capability package。

但官方公开产品里目前没有看到：

- extension marketplace；
- publisher identity / verification；
- paid entitlement；
- buyer-specific test；
- usage billing / payout；
- refund / dispute；
- portable reputation。

所以 Extensions 是 Agora 很值得接入的 **供给格式**，还不是完整交易市场。

### 4.3 Subagents 是 child session，而不是一个 prompt 里的角色扮演

[Subagents 文档](https://github.com/vercel/eve/blob/main/docs/subagents.mdx)区分：

1. **Built-in `agent` tool**：创建当前 Agent 的 fresh copy，继承 instructions、tools、connections，与 parent 共享 sandbox，但 history 和 state 全新；
2. **Declared subagent**：拥有自己的目录、instructions、tools、connections、skills、hooks、sandbox 和 nested subagents，不继承 root authored slots；
3. **Remote agent**：调用另一个独立部署的 Eve agent，用异步 callback 返回。

默认 subagent depth 只允许一层 child session，可通过 limits 调整。Model 还可以在 opt-in 的 experimental `Workflow` tool 中写受限 QuickJS，只编排 subagents，不能访问 host、文件、网络或 env。

这个设计很像：

> 文件系统定义静态能力树，runtime 按任务动态生成 durable child-session tree。

### 4.4 Evals 测的是完整 Agent，不只是 prompt

[Evals 文档](https://github.com/vercel/eve/blob/main/docs/evals/overview.mdx)让测试通过真实 HTTP surface：

- 启动或指向真实 Eve server；
- 创建真实 durable session；
- 驱动单轮、多轮、HITL、tool / subagent 行为；
- 检查是否成功、调用了什么、顺序是否正确、回复内容与 schema；
- 可用 deterministic assertion、mock model 或 LLM-as-judge；
- CI 中失败可直接返回 non-zero exit。

优点是 eval 覆盖 route、auth、session、tool loop 和 response，而不是只对一段 prompt 做离线评分。

局限是：这些测试仍由作者或内部团队定义。对于 marketplace，必须区分：

- creator test；
- platform canonical test；
- buyer-context test；
- production outcome receipt。

不能把作者自写 eval 自动升级为第三方可信证明。

---

## 5. 开发者实际怎么用

基本闭环：

```text
npx eve@latest init my-agent
        ↓
在 agent/ 中写 instructions / tools / skills / connections
        ↓
eve dev：TUI + local server + approval / OAuth / stream 调试
        ↓
eve info：检查真实发现与编译表面
        ↓
eve eval：在真实 HTTP session 上回归
        ↓
eve build：生成 .eve/ + Nitro 或 Vercel Build Output
        ↓
vercel deploy 或 eve start
        ↓
Agent Runs / OTel / external observability
```

Next.js 用户可以用 `withEve(nextConfig)` 把 Agent routes 挂进现有应用，再用 `useEveAgent()` 处理 session、stream、attachments、HITL 和 OAuth UI state。Nuxt、SvelteKit 也有官方集成。

### 三类角色

| 角色 | 怎么进入 | 真正得到什么 |
|---|---|---|
| Builder / product engineer | 编辑 `agent/`，写 tools、evals、connections | 少搭 durable runtime、sandbox、channel、auth glue |
| Operator / process owner | 看 run、处理审批、回归和异常 | 把 SOP 变成可持续运营的软件 |
| End user | 留在 Web、Slack、GitHub、Linear、API 等业务入口 | 不必知道 Eve 存在，只得到工作结果 |

这说明 Eve 不是「最终用户打开一个 Agent Builder」，而是：

> **工程师在代码仓库里构建，业务用户在原工作界面里消费。**

---

## 6. 哪些场景真的适合 Eve

### 6.1 很适合

理想任务通常同时满足：

> **重复发生 × 跨系统 × 有有限语义判断 × 输入输出可定义 × 结果可验证 × 错误可拦截 × 需要长任务或等待。**

#### 场景 A：Support triage / resolution Agent

- Trigger：新 ticket / Slack mention；
- Context：用户记录、产品文档、历史 ticket；
- Actions：查询、分类、草拟回复、更新 CRM；
- Human gate：退款、补偿、敏感账号动作；
- Outcome：首响时间、正确路由率、自动解决率。

Eve 的价值在 durable session、OAuth connections、approval、multi-channel 和 trace，而不只是「会写客服回复」。

#### 场景 B：Lead enrichment Agent

- Trigger：CRM 新 lead；
- Tools：公司数据、搜索、内部 warehouse；
- Actions：研究、打分、写回字段、分配 owner；
- Outcome：研究耗时、路由准确率、pipeline conversion。

#### 场景 C：每周经营报告

- Trigger：schedule；
- Context：指标定义、数据库、上周结果；
- Actions：查询、解释异常、生成报告、发 Slack；
- Outcome：节省工时、数据完整率、异常发现速度。

#### 场景 D：GitHub issue / PR operations

- Trigger：GitHub App webhook；
- Actions：复现、查代码、运行 sandbox、生成建议、更新 issue；
- Human gate：写代码、合并、发布；
- Outcome：time-to-triage、review latency、reopen rate。

#### 场景 E：嵌入 SaaS 的垂直 Agent backend

开发者用一个 Eve project 提供：

- Web chat；
- REST / streaming API；
- Slack / Teams channel；
- schedule；
- remote subagent endpoint。

终端产品只看到自己的品牌和业务 surface，Eve 在后端统一 session、tool、trace 和 deployment。

### 6.2 不太适合

- **一次性创意任务**：直接用 ChatGPT / Claude 更轻；
- **简单确定性自动化**：Zapier / cron / ordinary code 能解决时，不需要 model loop；
- **业务人员需要可视化搭建**：Eve 是 TypeScript / Git / coding-agent-first；
- **Python-first 团队**：官方主路径是 Node 24 / ESM / TypeScript；
- **必须内建知识库和长期用户记忆**：Eve 把它留给外部 DB / KV / vector store；
- **高风险全自动写操作**：默认策略不等于生产安全，需要主动补 approval、ACL、idempotency、egress policy；
- **要求稳定 1.0 API 的核心系统**：当前 Beta 迭代速度仍高；
- **只做 `streamText + 2 tools` 的简单 chatbot**：完整 durable runtime 可能过重。

---

## 7. 它是 Vercel locked-in 吗

结论是：

> **代码层面可移植，生产体验明显 Vercel-native。**

| 维度 | Vercel managed path | Self-host path |
|---|---|---|
| HTTP host | Vercel Build Output / Functions | Nitro Node `.output/` |
| Durability | Vercel Workflow | local world + persistent disk，或兼容的 custom/Postgres world |
| Sandbox | Vercel Sandbox + prewarm | Docker / microsandbox / custom backend |
| Model | AI Gateway + project OIDC | AI Gateway API key，或 AI SDK provider 直连 |
| OAuth / credentials | Vercel Connect | static token、自定义 auth、外部 OAuth |
| Schedule | Vercel Cron | Nitro task runner 或自有 scheduler |
| Observability | Agent Runs + OTel | OTel / 自建观测系统 |
| Auth | Vercel OIDC 可直接用 | Basic / JWT / OIDC / custom verifier |

[Deployment guide](https://github.com/vercel/eve/blob/main/docs/guides/deployment.md)明确提供：

```bash
eve build
PORT=3000 eve start --host 0.0.0.0
```

自托管不是假选项，但需要自己处理：

- workflow state 持久化；
- compatible Workflow world 版本；
- sandbox fleet；
- TLS / routing / autoscaling；
- secrets 与 auth；
- cron；
- logs / traces；
- provider key；
- reverse proxy。

特别容易踩的坑是：反向代理必须同时转发 `/eve/` 和 `/.well-known/workflow/`。只代理前者时，session 看似能创建，但 workflow callback 会静默卡住。

所以更准确的商业判断是：

> **Eve 的开源与 self-host 降低了硬锁定；Vercel 则通过“少运维很多”的 managed happy path 获得平台拉力。**

---

## 8. 生产使用前必须知道的风险

### 8.1 Tool 与 Sandbox 是两个不同信任域

[Security Model](https://github.com/vercel/eve/blob/main/docs/concepts/security-model.md)把系统分成：

| Trusted app runtime | Isolated sandbox |
|---|---|
| authored tools、model calls、connections、state、durability | shell、files、scripts、`/workspace` |
| 可读 `process.env` | 看不到 `process.env` 和 secrets |
| unrestricted Node.js code | 网络由 sandbox policy 控制 |

自定义 `defineTool` 默认在可信 Node runtime 运行，不会自动进 sandbox。模型虽然看不到 secret 本身，但它能触发读 secret 的工具，因此：

- tool input validation；
- approval policy；
- least-privilege token；
- output redaction；
- audit；

都仍是开发者职责。

### 8.2 默认 sandbox egress 是 allow-all

Sandbox 是隔离 filesystem / process 的 primitive，不代表默认网络策略已经最小化。敏感 workload 应显式设置 deny-all 或 allowlist，并验证实际 backend 的隔离能力：

- Vercel Sandbox / microsandbox 支持更强网络策略；
- Docker 的网络控制更粗；
- just-bash 是 pure-JS fallback，不是完整 container，也没有真实 binary 和同等级网络隔离。

### 8.3 Tool approval 未配置时不会自动询问

HITL primitive 是内建的，但 authored tool 如果没有配置 approval，默认等价于不审批。敏感或不可逆 action 必须主动声明 policy。

### 8.4 Auth fail-closed，不等于自动做好 tenant ACL

Eve routes 未被 AuthFn 接受时会返回 401，scaffold 的 `placeholderAuth()` 在 production 也会关闭访问。这是好的默认。

但 route authentication 只回答「来的人是谁」，不自动回答：

- 他是否拥有这个 session；
- 是否可以读取这个 run；
- 是否可以代表这个 tenant 使用某 connection；
- 是否能批准这次 action。

多用户应用仍要自行实现 session ownership / resource authorization。

### 8.5 内建 state 不是长期记忆

`defineState`：

- 跨 step、turn、crash、redeploy 保留；
- 只在当前 session 生命周期内有效；
- 不跨 session、user 或 subagent；
- 不能被独立查询。

跨会话用户记忆、组织知识、vector retrieval、删除权和 tenant isolation 都要接外部存储。

### 8.6 Observability 不是交易账本

Vercel Agent Runs 很适合调试：

- session / turn / model / tool trace；
- token usage；
- error；
- parent / child lineage。

但公开默认 retention 主要是小时到天级，Observability Plus 也只是更长的观测留存；且文档对 Agent Runs 是否对所有团队自动开放仍有 gated / auto-detect 的表述差异。

它不能直接承担：

- entitlement；
- payout；
- refund；
- dispute；
- version-bound reputation；
- 长期 Verified Run Ledger。

### 8.7 其他明确边界

- task-mode schedule 不能停下来等即时 HITL / OAuth；
- interrupted step 会重跑；
- dynamic `Workflow` tool 仍是 experimental 且默认关闭；
- self-host custom Workflow world 当前要与 `5.0.0-beta` protocol line 兼容；
- instrumentation 若记录 inputs / outputs，敏感数据需要主动关闭或脱敏；
- Extensions 中的 TypeScript 是可信可执行代码，不能按普通 Markdown Skill 的安全等级直接安装。

---

## 9. 它和 AI SDK、Sim、skills.sh、SkillHub、Agora 的关系

| 产品 / 层 | 基本单位 | 主要解决 | 不负责 |
|---|---|---|---|
| Vercel AI SDK | model call / tool call / stream | provider abstraction、generation、tool loop primitives | 完整 Agent 项目、durability、deploy |
| Eve | filesystem Agent application | build、durable runtime、sandbox、channel、eval、deploy | 视觉画布、长期 memory、交易结算 |
| Sim | visual workflow / deployment snapshot | conversation-to-graph、workspace data、可视化编排、immutable live version | 跨 runtime capability commerce |
| skills.sh / SkillHub | `SKILL.md` package | discovery、install、diff、compose、context distribution | production runtime、buyer proof、payout |
| Agora | versioned capability promise | cross-runtime identity、verification、entitlement、settlement、reputation | 不应重造每个 runtime |

### 9.1 Eve vs AI SDK

AI SDK 更底层，解决「怎样调用模型、stream、tool」。Eve 解决「如何把这些调用组织成可部署、可恢复、可审计的 Agent application」。

### 9.2 Eve vs Sim

两者都在 capability production / runtime 层，但 inspectable artifact 不同：

- Sim：workflow-first，graph + immutable deployment snapshot；
- Eve：code-first，filesystem + Git + compiled manifest。

Sim 更适合可视化业务流程；Eve 更适合工程团队、coding agents 和 Next.js/Vercel 项目。

对 Agora 来说，两者都应该成为 runtime adapters，而不是必须复制的产品。

### 9.3 Eve vs Skills 生态

skills.sh / SkillHub 主要占：

```text
发现 → 安装 → diff → compose → context 注入
```

Eve 接手后半段：

```text
构建 → 执行 → durable state → auth / approval → eval → deploy → trace
```

Eve Extensions 又把 Skill、Tool、Connection、Hook 组合成可执行 npm package，说明 capability distribution 正在从「Markdown 说明书」向「runtime-native package」升级。

### 9.4 Eve vs Agora

Eve 已经有：

- Git / package identity；
- auth / credential / approval primitives；
- evals；
- trace；
- runtime lineage；
- multi-surface delivery。

但它没有公开解决：

| Merchant / trust plane | 当前缺口 |
|---|---|
| Publisher identity | 作者签名、跨 runtime 可携带 reputation |
| Entitlement | 购买者、seat、runtime、usage、有效期授权 |
| Verification | 中立 canonical test、buyer-context proof、verifier attestation |
| Settlement | checkout、take rate、creator payout、escrow、refund、分账 |
| Responsibility | 失败归因、争议、版本绑定责任 |
| Long-term ledger | capability version + context fingerprint + outcome + payment / refund |

因此一句最清楚的边界是：

> **Eve 把 Agent 变成可运行的软件；Agora 要把可运行的软件变成可交易、可负责的能力承诺。**

---

## 10. Vercel 为什么要做 Eve

Eve 的战略作用很像 Next.js：

1. 先把行业中反复出现的工程问题抽象成开源 framework；
2. 用好用的本地开发和文件约定获得开发者 authoring habit；
3. 让框架天然适配 Vercel 的 managed infrastructure；
4. 每个 Agent deployment 都可能消费 Gateway、Workflow、Sandbox、Connect、Observability、Functions；
5. self-host escape hatch 降低采用顾虑，但最顺滑的路径仍回到 Vercel。

因此它不是单独卖一套 Eve 订阅，更像：

> **用 open-source framework 把 Agent application 的默认生产路径收拢到 Vercel Agent Stack。**

如果把 Vercel 当前产品拼起来：

```text
skills.sh：Skill 发现 / 安装
        ↓
Eve：Agent 构建 / 运行 / 部署
        ↓
AI Gateway / Workflow / Sandbox / Connect：基础设施
        ↓
Agent Runs / Observability：运行数据
```

Vercel 已经占住从 context package 到 runtime telemetry 的纵向链路。它离 marketplace 只差把这些数据和控制面扩成：

```text
publisher account
→ verified listing
→ paid entitlement
→ task-success attribution
→ payout / refund
```

所以：

- 对「Agent Builder / production harness」方向：**高威胁**；
- 对「纯 Skill 目录 / package manager」方向：skills.sh + Eve 组合后是 **高威胁**；
- 对 Agora 的可信交易层：**当前低到中威胁，但战略邻接很强**。

---

## 11. 对 Agora 最值得吸收什么

### 11.1 把 Eve directory / Extension 当成一种 capability source format

Agora 不必再发明一个执行 runtime。可以做 Eve adapter，读取：

- instructions；
- tools / schemas；
- skills；
- connections；
- subagents；
- schedules；
- evals；
- compiled manifest；
- permission / approval policy。

再补上市场所需字段：

- `publisher_id`；
- source commit / dependency hash；
- immutable capability version；
- permission scopes；
- pricing；
- entitlement；
- canonical tests；
- verifier attestation；
- support / refund policy。

### 11.2 复用 `GET /info` 和 build diagnostics 做 package doctor

不是只扫描源目录，而是检查：

- 实际编译出的 tools；
- connection allow/block；
- approval 是否缺失；
- sandbox egress；
- route auth；
- dynamic capabilities；
- extension peer compatibility；
- eval coverage。

这可以成为 `agora doctor --runtime eve`。

### 11.3 从 Eve stream 提取最小 Verified Run Receipt

不复制整套 Observability，只提取隐私最小化证据：

```text
capability version
+ deployment / source commit
+ context fingerprint
+ approval decisions
+ material tool calls
+ child-session lineage
+ verifier verdict
+ cost / latency
+ outcome / failure node
```

原始用户 context 和 credentials 尽量留在用户侧；Agora 保存支持交易、退款和声誉所需的 receipt。

### 11.4 显式补上跨 deployment 的版本证明

Eve 现有 session 下一 turn 会采用最新 production deployment。这适合持续更新的聊天 Agent，却不天然适合交易证明。

Agora adapter 应把每个 turn / receipt 锁定到：

- source commit；
- Eve version；
- compiled manifest hash；
- model / tool / extension versions；
- eval evidence；
- runtime policy。

### 11.5 保持商品 identity 与消费 surface 分离

同一个 Eve Agent 可以出现在 Web、API、Slack、GitHub、Linear、Cron。Agora 的 capability identity 不应等于某个 UI、Skill 文件或 endpoint，而应允许同一商品通过多个 runtime / surface 交付。

### 11.6 不要照搬

- 不做 Eve 的另一个版本；
- 不做另一个 workflow canvas；
- 不把作者自写 eval 当中立证明；
- 不把全量 trace 当长期业务 ledger；
- 不把可执行 Extension 当安全 Markdown 包直接安装；
- 不绑定 Vercel 单一 runtime；
- 不把 connector 数量当护城河。

真正更难被 framework 吃掉的是：

> **运行现场、权限、失败、验证、责任关系和交易结果沉淀成的跨 runtime 执行账本。**

---

## 12. 建议的最小验证实验

可以做一个很小的 Eve adapter spike，而不是启动新 runtime 项目：

```text
agora import --runtime eve ./agent
        ↓
解析 source + compiled manifest + GET /info
        ↓
生成 signed capability manifest
        ↓
运行 creator smoke + platform canonical test
        ↓
冻结 verified release
        ↓
发 entitlement
        ↓
调用真实 Eve deployment
        ↓
从 NDJSON stream 生成 Verified Run Receipt
        ↓
payout / refund / reputation
```

建议优先验证四件事：

1. 能否稳定从不同 Eve 项目提取统一 manifest；
2. 能否识别 tools / connections / approvals / egress 的真实权限表面；
3. 能否把 eval 与 compiled manifest hash 绑定；
4. 能否从 stream 得到足够支持结算与失败归因、但不过度泄露 context 的 receipt。

如果这四件事成立，Eve 对 Agora 的价值就不是「竞品研究」，而是第一批高质量 executable capability supply。

---

## 13. 最终判断

Eve 最重要的创新不是某个单独 feature，而是把已经分散在 Agent 工程里的共性问题收敛成一个默认框架：

```text
filesystem authoring
→ compiled manifest
→ durable session
→ sandbox / tools / connections
→ HITL / OAuth park-resume
→ subagent lineage
→ eval
→ deploy
→ trace
```

它证明了一件事：

> **Agent 的基本单位正在从 prompt / conversation / Skill file，升级为有状态、可测试、可部署、可观察的 executable application。**

对我们更重要的反向结论是：

> **当 build/run/deploy 被 Eve、Sim、OpenAI、Anthropic 等平台逐步标准化后，新的平台价值不应继续堆 runtime，而应占据跨 runtime 的 identity、verification、entitlement、settlement 与 responsibility ledger。**

---

## 官方一手资料

- [Eve Introduction](https://eve.dev/docs/introduction)
- [Eve Homepage](https://eve.dev/)
- [Vercel：Introducing Eve](https://vercel.com/blog/introducing-eve)
- [Vercel Eve 产品文档](https://vercel.com/docs/eve)
- [Vercel Eve GitHub](https://github.com/vercel/eve)
- [Execution Model and Durability](https://github.com/vercel/eve/blob/main/docs/concepts/execution-model-and-durability.md)
- [Sessions, Runs and Streaming](https://github.com/vercel/eve/blob/main/docs/concepts/sessions-runs-and-streaming.md)
- [Security Model](https://github.com/vercel/eve/blob/main/docs/concepts/security-model.md)
- [State](https://github.com/vercel/eve/blob/main/docs/guides/state.md)
- [Skills](https://github.com/vercel/eve/blob/main/docs/skills.mdx)
- [Subagents](https://github.com/vercel/eve/blob/main/docs/subagents.mdx)
- [Extensions](https://github.com/vercel/eve/blob/main/docs/extensions.md)
- [Evals Overview](https://github.com/vercel/eve/blob/main/docs/evals/overview.mdx)
- [Deployment](https://github.com/vercel/eve/blob/main/docs/guides/deployment.md)
- [Eve Agent Observability changelog](https://vercel.com/changelog/eve-agent-observability)

## 本地关联研究

- [simstudioai-sim-project-analysis-2026-07-11](/output/reports/simstudioai-sim-project-analysis-2026-07-11/)
- [skillhub-project-analysis-2026-07-03](/output/reports/skillhub-project-analysis-2026-07-03/)
- [vercel-skills-sh-commercialization-2026-05-15](/output/reports/agora/market-competition/vercel-skills-sh-commercialization-2026-05-15/)
- [agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)
- [agora-problem-statement](/output/reports/agora/narrative/agora-problem-statement/)

