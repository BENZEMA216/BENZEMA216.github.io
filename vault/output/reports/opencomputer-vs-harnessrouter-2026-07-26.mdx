# OpenComputer vs HarnessRouter：已经是直接竞品，但控制点不同

> 生成时间：2026-07-26
> 查询：[diggerhq/opencomputer](https://github.com/diggerhq/opencomputer) 和 HarnessRouter 这类产品有什么区别
> 研究快照：OpenComputer 官网、Docs、GitHub main / Releases / Issues / Self-hosting、TypeScript / Python SDK 入口，以及 2026-07-25 的 [harnessrouter-product-analysis-2026-07-25](/output/reports/harnessrouter-product-analysis-2026-07-25/)

## 摘要

**OpenComputer 最初更像 E2B / Daytona 一类 persistent VM substrate，但它最新的 Durable Agent Sessions 已经把 Claude Code、Codex、Pi、Flue 统一成 Agent / Session / Events / Steering / Webhook API。到 2026-07-26，它与 HarnessRouter 已经不是单纯的上下游，而是核心能力直接重叠的竞品。**

不过，两者的主控制点仍然不同：

- **OpenComputer 从 compute 向上做 Agent platform**：底层是 Apache 2.0 的 QEMU/KVM VM、hibernate、checkpoint/fork、elastic compute、preview URL、CLI/SDK 和 AWS/Azure self-hosting；上层才是多 runtime Agent Session。
- **HarnessRouter 从 harness integration 向下包 runtime**：重点是让应用通过 OpenAI Responses 风格 API 调用 Codex、Claude Code、Hermes，并统一 Session、SSE、files、changed files、zip、Artifact metadata、Continue/Cancel 与 trace。

一句话：

> **OpenComputer 卖“可控制、可自托管的 Agent computer + durable runtime”；HarnessRouter 卖“更快嵌入应用的 managed harness backend + artifact contract”。**

我的选型判断：

1. **要长期 per-user workspace、自托管/BYOK、基础设施控制权、退出路径**：优先评估 OpenComputer。
2. **要最快把多种 Coding Agent 做成应用功能，尤其交付多文件 artifact，不想运营 VM 平台**：HarnessRouter 的产品抽象更直接。
3. **高权限生产场景现在都不应盲选。** 两者的执行 sandbox 当前都允许公网 outbound；per-agent egress allowlist、完整 HITL/action policy、精确 aggregate spend cap 等仍不完整。
4. **成熟度上 OpenComputer 明显领先。** 它有 400+ GitHub stars、1,700+ commits、几十个 forks、持续 releases、完整源码和 self-hosting 文档；HarnessRouter 公开核心实现和生产证据都很少。
5. **但 OpenComputer 的“Agent platform”仍是 Preview。** Flue 标为 experimental，部分文档彼此冲突，self-hosting 是 operator path 而非一键部署；不能把开源和提交数直接等同于生产可靠性。

## 1. 放到同一条技术栈里

```text
用户产品：UI / auth / tenant ownership / payment / outcome verification
────────────────────────────────────────────────────────────
应用 Agent API：Agent config / Session / Events / Steering / Result
          OpenComputer Durable Agent Sessions ≈ HarnessRouter
────────────────────────────────────────────────────────────
Harness：Claude Code / Codex / Pi / Hermes / Skills / tools
          两者都在封装，但支持集合和接口不同
────────────────────────────────────────────────────────────
Compute：VM / sandbox / filesystem / network / checkpoint
          OpenComputer 是公开产品核心；HarnessRouter 是托管黑盒
```

所以关系应分两种看：

- **在 Agent API 层：直接替代。**
- **在 compute 层：OpenComputer 更底层、更开放；理论上甚至可以用它搭一个 HarnessRouter。**

## 2. 核心差异表

| 维度 | OpenComputer | HarnessRouter | 判断 |
|---|---|---|---|
| 产品原点 | persistent full Linux VM | managed harness gateway | OpenComputer 更偏 infra；HarnessRouter 更偏 application backend |
| 当前 Agent runtime | Claude、Codex、Pi；Flue experimental | Codex、Claude Code、Hermes；Pi coming soon | 已直接重叠，具体 harness 覆盖不同 |
| 应用接口 | 自有 `/v3/agents`、`/v3/sessions`、events、steer、result、hooks/webhooks | OpenAI Responses 风格、Session、Continue/Cancel、files/artifacts | HarnessRouter 更容易复用 OpenAI API 心智；OpenComputer surface 更宽 |
| 执行环境 | 每个 sandbox 是 KVM VM；hibernate、checkpoint/fork、elastic CPU/RAM | 隔离 sandbox，但公开材料不披露同等底层实现与自管能力 | OpenComputer 的 infra 控制和可核验性更强 |
| 持久化 | VM filesystem、checkpoint、session event log、runtime state | Session、turns、workspace files、event/file store | 都支持长任务；OpenComputer 同时提供 VM 级原语 |
| 产物交付 | result event、filesystem API、preview URL、repo/PR flow | changed files、单文件、zip、Artifact metadata、多格式 renderer contract | HarnessRouter 对“把 Agent 结果交给终端用户”更完整 |
| Skills / tools | Skills；built-in runtime 当前固定 remote tools：`bash/read/write/ls`；Flue 可编译自定义工具 | Skills、MCP servers、harness 原生工具 | 当前 HarnessRouter 的通用 MCP/configured-tool surface 更直接 |
| 凭证 | Managed credits 或 BYOK；Infisical vault；provider egress proxy；真实 key 不进入 sandbox | Managed credits；BYOK 在 2026-07-25 仍未发布；可向 MCP 转发 per-user headers | OpenComputer 当前 credential architecture 更成熟 |
| Browser auth | session-scoped short-lived client token，可直接 stream/steer 一个 Session | 宿主 server 保存 Workspace key，并代理 Session/files | OpenComputer 更接近前端 SDK；宿主仍须先做用户 authorization |
| 外部触发 | Agent URL、可撤销 Hook URL、signed outbound webhooks、Slack、watches、schedules | 主要是应用 API 与 Session 交互 | OpenComputer 正向“可部署长期 Agent”扩展 |
| 自托管 | Apache 2.0；AWS/Azure operator path | Enterprise private deployment，核心不开源 | OpenComputer 退出路径明显更好 |
| 价格 | 4 GB / 1 vCPU 为 `$0.004/min`；20 GB disk included；Managed model credits 未公开换算；可 BYOK | `$20/$100/$200` 月费 + credits/top-up，但 credit 换算未公开 | OpenComputer compute 更透明；两者的 managed model 总成本都不透明 |
| 当前成熟度 | 400+ stars、1,700+ commits、持续 releases、完整 repo；Agent Sessions 为 Preview | 刚发布、公开 repo 基本无实现、独立 production evidence 很少 | OpenComputer 显著领先，但新 Agent 层仍早 |

## 3. OpenComputer 现在已经不只是 sandbox

只看首页和 README，会以为 OpenComputer 是：

```text
create VM
→ exec / files
→ hibernate / wake
→ checkpoint / fork
```

但最新 `Durable Agent Sessions` 已经是：

```text
create reusable agent
  = runtime + model + prompt + skills + credential + limits
→ create durable session
→ async bounded turn
→ append-only event log
→ stream / webhook / steer
→ result + usage
→ supervise crash / hang / lost machine
```

公开文档还描述了相当具体的 durable runtime 机制：

- runtime brain 与 hands sandbox 分离；
- model key 只在 brain 路径，通过 egress proxy 注入，不进入 hands；
- adapter 负责 event log、fencing、idempotency 和 committed output；
- session pin 住 runtime / model / prompt / skills revision；
- brain crash 会重启，hang 受 turn deadline 限制；
- sandbox 丢失后，从 checkpointed state + durable log 恢复；
- side effect 仍要求调用方自己保证 idempotency，因为最后一个 committed step 之后的工作可能重复。

这已经是完整 [agent-runtime](/wiki/concepts/agent-runtime/)，不是简单给一个容器。

## 4. 两者各自真正更强的地方

### OpenComputer 更强：基础设施所有权

OpenComputer 的硬能力更容易核验：

- QEMU/KVM full VM，而不是共享 kernel container；
- hibernate / wake；
- named checkpoint、restore、fork；
- CPU / memory elastic resize；
- preview URL；
- cell-based multi-region/multi-cloud scheduler；
- CLI、TypeScript SDK、Python SDK；
- server、worker、`osb-agent`、scheduler、event pipeline 和 deployment 代码公开；
- AWS / Azure self-hosting。

这不是说 VM 天然比 container 好，而是它给买方更多可见、可改和可迁移的控制面。

### HarnessRouter 更强：面向产品交付的结果抽象

HarnessRouter 的 API 更围绕“宿主产品怎么把工作交付给用户”设计：

- OpenAI Responses 风格请求与 SSE；
- purpose-specific configured harness；
- Session / Continue / Cancel；
- changed files；
- 单文件下载与完整 zip；
- code、Diff、Markdown、HTML、图片、PDF、Office、CSV/XLSX 等 Artifact metadata / renderer contract；
- 官方 `agents.md` 直接指导 Coding Agent 在客户 repo 中实现 route、SSE parser、ownership、file proxy 和安全渲染。

OpenComputer 可以通过 filesystem / preview / repo flow 实现同样结果，但宿主应用需要自己定义：

```text
哪些文件算 deliverable
→ 怎样做 artifact manifest
→ 怎样做安全 preview
→ 怎样做验收、版本和下载
```

因此 HarnessRouter 的抽象对内容生成、网页、代码项目和多文件交付型产品更贴近最后一公里。

## 5. “Real computers, not sandboxes” 是营销，不是严格分类

OpenComputer README 反复强调 “real computers, not sandboxes”，但它自己的 SDK、API 和文档仍把 VM 资源叫 `Sandbox`。

这是因为：

- **sandbox** 描述的是隔离用途；
- **VM / container / microVM** 描述的是隔离实现。

一个 sandbox 完全可以由 KVM VM 实现。E2B、Daytona 等产品也能提供持久 workspace、pause/stop 和 snapshot。OpenComputer 的真实差异不是“不属于 sandbox”，而是：

> **它把 full VM、长期 filesystem、hibernate、checkpoint/fork、elastic compute 与 Agent runtime 做成同一个可开源/自托管的平台。**

这比口号更准确，也更能解释买方为什么付费。

## 6. 安全边界

### OpenComputer 已经做得更好的部分

- model provider key 可 Managed 或 BYOK；
- BYOK 存入专用 vault、write-only；
- 真实 key 不进入 VM，由 outbound provider request 的 egress proxy 替换；
- brain 与 hands 分离，hands sandbox 不持有 model key；
- browser 只拿 session-scoped、短期 `read/steer` token；
- webhook 支持 Standard Webhooks 签名、重试、dead letter 和 event-id dedupe；
- preview bearer token 只存 SHA-256 hash；
- sandbox 阻止 private、loopback、link-local 和 cloud metadata 访问。

### OpenComputer 仍未补齐的部分

1. **hands sandbox 默认仍有公网 outbound internet**，per-agent egress allowlist 标为 coming。
2. **preview URL 默认公开**，必须显式开启 bearer auth。
3. EventSource 和部分 WebSocket 流需要把 scoped token / API key 放 query string，部署方必须禁止 access log、analytics、referrer 等记录完整 URL。
4. built-in runtime 的 token limit 只在 model turn 之间检查，可能 overshoot 一轮；不是 dollar cap 或 aggregate spend cap。
5. Flue 当前不执行通用 session limits，只能依赖 agent/org gateway 的 spend fuse。
6. `ask` 当前是 yield，正式 blocking ask state 仍在 coming；`deliver/reconcile` 等外部 action path 也在逐步发布。
7. Agent Sessions 仍标记 Preview，不能只凭架构文档推断 SLA、RTO/RPO 和真实多租户隔离质量。

### 与 HarnessRouter 的相对判断

HarnessRouter 当前也允许 sandbox 公网 outbound，configurable egress、HITL permission gating、BYOK 和 strict per-user cap 尚未发布。

因此：

- **credential isolation：OpenComputer 更强。**
- **network/action authorization：两者都未达到高权限生产的理想边界。**
- **代码可审计与自管：OpenComputer 更强。**
- **宿主 tenant authorization：两者都不会替你解决。**

## 7. 自托管不是免费午餐

OpenComputer 的 self-hosting 是真实优势，但官方文档明确说它是 **operator path，不是一键托管产品**。

生产部署需要：

- control plane host；
- 支持 KVM / nested virtualization 的 bare-metal worker；
- PostgreSQL；
- Redis；
- S3-compatible object storage；
- secrets backend；
- 自己 bake QEMU、worker binary、kernel/rootfs、`osb-agent` 和 systemd 的 worker image；
- DNS、HTTPS、网络规则、observability 与 autoscaling；
- AWS 或 Azure compute provisioning。

所以“OpenComputer 可自托管”更准确的含义是：

> **有可行的退出路径和控制权，但你需要真正的 infra/platform team 才能接住。**

对没有 infra 人员的小团队，HarnessRouter 的闭源托管反而可能是合理的成本交换。

## 8. 可靠性与成熟度

### OpenComputer：明显更成熟，但要分层看

已验证的成熟度信号：

- Apache 2.0 公开仓库；
- GitHub 页面在本次研究时显示 400+ stars、1,700+ commits、几十个 forks；
- CLI 有连续版本发布；
- TypeScript / Python SDK 和文档完整；
- control plane、worker、scheduler、VM agent、billing/event path、自托管文件都能审查；
- 官方 scaling 文章给出 cell 架构和厂商测得的 boot p95 `<1s`、wake `1–2s`、hibernate 约 `6s`。

仍不能直接当成 production proof：

- lifecycle latency 是厂商自测，没有独立 benchmark；
- “million sandboxes” 是 capacity architecture 目标，不是已证明的真实同时在线用量；
- Durable Agent Sessions 标 Preview；
- Flue 标 experimental；
- self-hosting 没有 turnkey chart / one-command deployment；
- 当前 open issue 包括 checkpoint fork filesystem integrity failure；
- 文档快速演进中存在冲突：一处 quickstart 已支持 registered private repo，另一处 runtime-tools 仍写 private repo coming soon；Codex 示例也一度错误使用 Anthropic model id。

这些冲突不是否定产品，而是说明 **Agent platform surface 仍在高频变化，必须 pin SDK/API version 并跑自己的 acceptance tests。**

### HarnessRouter：产品抽象成立，公开证据明显更早

HarnessRouter 的优点是 integration contract 具体，尤其 Session ownership、idempotency、断线恢复、file proxy 和 Artifact renderer。

但相对 OpenComputer，它目前缺少：

- 可审查的 scheduler/runtime/core code；
- 自托管 operator path；
- 长期 release history；
- 可见 SDK adoption；
- 独立 load / recovery benchmark；
- 公开 production scale、SLA、security audit。

因此在“谁更像可以长期下注的基础设施公司”这个问题上，OpenComputer 当前证据更强。

## 9. 成本结构

### OpenComputer

官网当前公开的基础 compute 价格：

- 4 GB memory / 1 vCPU：`$0.004/min`，即 `$0.24/hour`；
- 20 GB disk included；
- 超出部分约 `$0.26/GB-month`，运行和 hibernated 都计 storage；
- Managed model 走 OpenComputer credits，但公开页未给出 credit 与 token / dollar 换算；
- BYOK 时 model 费用直接进入 Anthropic / OpenAI 账单。

优点是 compute 单价可算，且 BYOK 可以把 model cost 与平台 cost 分开。

### HarnessRouter

公开计划为 `$20 / $100 / $200` 月费加 production credits/top-up，但没有公开：

- credits 对应多少 model token / sandbox time；
- top-up 单价；
- failure/retry 如何计费；
- 并发、retention、storage 明细；
- 不同 harness/model 的最终 `cost per accepted artifact`。

所以 HarnessRouter 当前更像为 convenience 收 platform fee，OpenComputer 更像可组合的 infra usage bill。真正比较必须统一到：

```text
总费用 ÷ 被用户接受的交付数
```

而不是只比 token 或 VM 小时价格。

## 10. Moat 判断

### OpenComputer

当前更硬、也更可见：

- VM lifecycle 与 checkpoint/hibernate engineering；
- cell scheduler 与 multi-cloud capacity；
- credential proxy；
- durable event / recovery；
- self-hosted codebase 与 operator know-how。

但 full VM 和 persistence 本身会被 E2B、Daytona、Dedalus、云厂商复制。它更长期的 moat 要来自：

- production reliability；
- density / margin；
- global capacity；
- agent-specific workload data；
- durable session + channel + trigger 生态；
- 企业自托管与 managed cloud 的统一接口。

### HarnessRouter

当前 moat 较弱，真正可能形成的是：

- 同一真实任务在不同 harness/model/config 下的结果、成本和人工接受数据；
- behavioral portability，而非机械 API portability；
- artifact/result contract；
- 让 Coding Agent 自动完成宿主集成的分发标准；
- 高价值 vertical workflow 与 eval。

但这些数据飞轮目前都没有公开证据。

## 11. 选型建议

### 选 OpenComputer，如果

- 每个用户/creator 需要一个长期存在的 computer/workspace；
- 安装包、缓存、repo、filesystem 要跨 session 保留；
- 要 checkpoint/fork、preview URL 或 elastic compute；
- 需要 BYOK、credential isolation；
- 希望能审查源码、最终 self-host；
- 想从 session API 继续扩展到 Hooks、Slack、schedules、watches；
- 团队有能力维护更宽的 infra surface。

### 选 HarnessRouter，如果

- 目标是两周内把 Agent 能力嵌入现有产品；
- 需要 Codex / Claude Code / Hermes 的统一调用；
- 交付物主要是 files、zip、Diff、HTML、Office、图片等 artifacts；
- 需要官方集成规范直接让 Coding Agent 修改宿主 repo；
- 不想运营 VM、checkpoint、worker pool 和 control plane；
- 能接受更强 vendor dependency，且当前任务无敏感数据和高风险 action。

### 两者都不要直接锁定，如果

- 要处理支付、生产运维、患者/金融数据或不可逆 action；
- 必须 deny-by-default egress；
- 需要强制逐工具审批与 policy engine；
- 要精确 per-user dollar cap；
- 要已公开 SLA / audit / incident history；
- 不能接受 Preview API 或快速变化的 contract。

## 12. 对 Combo 的建议

两者都只是 Combo 的可替换 runtime input，不应拥有：

- creator identity、capability lineage、approved manifest；
- tenant ownership；
- 订单、支付、退款与 settlement；
- outcome verification；
- creator judgment；
- 试用确认与交付证据；
- 用户反馈和训练数据授权。

如果 Combo 当前目标是验证“用户是否愿意为 creator Agent 的结果付费”：

1. **HarnessRouter 适合最快做多 artifact PoC。**
2. **OpenComputer 更适合作为长期 runtime 候选**，尤其未来需要 per-creator persistent computer、BYOK 或自托管时。
3. 两者都放在 Combo 自己的 `RuntimeAdapter` 后面，不让 Session ID、event schema、file URL 或 billing credit 进入核心 domain model。
4. 用同一真实任务跑 blind comparison：
   - accepted-output rate；
   - 人工修改分钟；
   - P50/P95 latency；
   - crash / disconnect / retry 恢复；
   - 单次成功交付成本；
   - prompt injection / outbound exfiltration；
   - 跨 tenant 读取、继续、取消和下载；
   - complete export 与 provider fallback。

如果今天必须二选一做较长期技术下注，我会选 **OpenComputer 进入 PoC shortlist**；如果只是做最快的市场验证，我会选 **HarnessRouter 做短期 baseline**。

## 13. 证据分层

### 已验证

- OpenComputer repo、Apache 2.0 license、README、Self-hosting、CLI releases；
- full KVM VM、hibernate、checkpoint/fork、elastic compute、preview URL；
- Durable Agent Sessions 的 Claude / Codex / Pi / Flue runtime surface；
- Agent / Session / Events / Steering / Result / Hooks / Webhooks；
- Managed / BYOK、vault、provider egress proxy、session-scoped client token；
- open outbound network、per-agent egress allowlist coming；
- compute 公开价格；
- HarnessRouter 的公开产品/API/Session/Artifact contract。

### 部分验证

- OpenComputer crash/hang/lost-machine recovery：代码和文档可审查，未独立故障注入；
- lifecycle latency：官方 production measurement，未第三方复测；
- multi-cloud million-scale architecture：实现路径合理，不等于已运行百万 sandbox；
- OpenComputer 比 HarnessRouter 更成熟：公开工程证据显著更强，但客户规模和 SLA 仍未知。

### 未验证

- 两者的真实 enterprise customer usage；
- tenant isolation 的独立审计；
- P50/P95/P99 task success rate；
- exact accepted-artifact unit economics；
- SOC 2 / HIPAA 等当前完整状态；
- OpenComputer Durable Agent Sessions 和 HarnessRouter 在同任务下的质量差异。

## 数据来源

### OpenComputer

- [GitHub repository](https://github.com/diggerhq/opencomputer)
- [README](https://github.com/diggerhq/opencomputer/blob/main/README.md)
- [Self-hosting](https://github.com/diggerhq/opencomputer/blob/main/SELFHOSTING.md)
- [GitHub Releases](https://github.com/diggerhq/opencomputer/releases)
- [GitHub Issues](https://github.com/diggerhq/opencomputer/issues)
- [官网与 Pricing](https://opencomputer.dev/)
- [Introduction](https://docs.opencomputer.dev/introduction)
- [Durable Agent Sessions：Agents](https://docs.opencomputer.dev/agent-sessions/agents)
- [Durable Agent Sessions：Runtimes](https://docs.opencomputer.dev/agent-sessions/runtimes)
- [Runtime tools](https://docs.opencomputer.dev/agent-sessions/runtime-tools)
- [Sessions](https://docs.opencomputer.dev/agent-sessions/sessions)
- [Authentication](https://docs.opencomputer.dev/agent-sessions/authentication)
- [Credentials](https://docs.opencomputer.dev/agent-sessions/credentials)
- [Webhooks](https://docs.opencomputer.dev/agent-sessions/webhooks)
- [Scaling architecture](https://opencomputer.dev/blog/scaling-one-vm-to-million-sandboxes/)

### HarnessRouter 与知识库

- [HarnessRouter 官网](https://harnessrouter.ai/)
- [HarnessRouter Docs](https://harnessrouter.ai/docs)
- [HarnessRouter agents.md](https://harnessrouter.ai/agents.md)
- [harnessrouter-product-analysis-2026-07-25](/output/reports/harnessrouter-product-analysis-2026-07-25/)
- [agent-runtime](/wiki/concepts/agent-runtime/)
- [harness-engineering](/wiki/concepts/harness-engineering/)
- [safe-autonomy](/wiki/concepts/safe-autonomy/)
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

---
*由 LLM 从知识库查询生成*
