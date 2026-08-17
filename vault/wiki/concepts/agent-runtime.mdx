# Agent Runtime（Agent 运行时）

> Agent 的状态管理、持久化、重试和生命周期控制基础设施——"Your agent needs a harness, not a framework"，可靠性是基础设施问题而非模型问题。

## 核心要点

- "Your agent needs a harness, not a framework" — 可靠性是基础设施问题
- Event-driven durability：每个 LLM/tool call 是独立可重试的 step
- Initializer + Coding Agent 架构：第一个 session 创建 init.sh/feature list/progress file，后续 session 读取并继续
- Singleton concurrency：每个 conversation 只有一个 agent run，新消息 cancel 之前的
- Filesystem memory 是跨 session 核心记忆层：progress files + feature list (JSON) + git history
- JSON > Markdown for feature tracking（model 更不容易 overwrite JSON）
- Multi-Agent 实测对比：Solo agent ($9, 20min, broken) vs Full harness ($200, 6h, playable)
- Compaction 不够用——Sonnet 4.5 有 "context anxiety"（过早收尾），需要 context reset
- Managed Agents 将 runtime 产品化为四原语：Agent / Environment / Session / Events，harness 和 sandbox 均为 cattle（可随时替换）
- Session 事件日志 = context window 之外的持久 context 对象，通过 `getEvents()` 按需 slice，避免不可逆 compaction
- OpenAI Agents SDK 将 sandbox execution、workspace Manifest、snapshot/rehydration 和 harness-compute separation 作为 runtime 原语
- 真实世界 autonomy 的 runtime 不只是“能运行”，还要有 CRM、库存、支付、授权、reminder、审批和法律/安全边界（Project Vend）
- AI Gateway 可以提供协议翻译、provider/model/key routing、retry/fallback、预算与观测，但若没有 durable task/session、业务状态、恢复和结果验收，仍不是完整 Agent Runtime
- Session Gateway 可以发现、读取并恢复既有 Agent session，却把执行、账号、workspace 与权限留在 Host；它补协作 surface，不替代 runtime 的状态和责任边界

## 详细说明

Agent Runtime 解决的核心问题是：LLM 调用本质上是无状态的函数调用，但 Agent 任务需要跨越多次调用、多个 session、甚至多天的有状态执行。没有可靠的 runtime 基础设施，Agent 会在中途失败后丢失进度、在长任务中迷失方向、在并发场景中产生冲突。

Event-driven durability 是现代 Agent Runtime 的核心架构模式。以 Inngest 为代表的方案将 Agent 的每一步（LLM 调用、工具执行、人工审批）建模为独立的、可重试的 event step。任何一步失败都可以从该步重试，而不需要重跑整个 workflow。这比传统的"try-catch + retry loop"强大得多，因为它天然支持持久化——每个 step 的输入输出都被记录，crash recovery 变成了基础设施提供的能力而非应用层需要实现的逻辑。

Initializer + Coding Agent 架构解决了跨 session 的状态延续问题。第一个 session 专门用于初始化：分析需求、生成 feature list（JSON 格式）、创建 init.sh、写入 progress file。后续每个 session 启动时先读取这些文件，了解项目状态和下一步任务，然后继续执行。之所以用 JSON 而非 Markdown 做 feature tracking，是因为 model 更不容易意外 overwrite JSON 的结构——Markdown 的自由格式反而成了隐患。

实测数据说明了 runtime 基础设施的价值：同一个项目，Solo agent 花费 $9、耗时 20 分钟，产出 broken 的结果；配备完整 harness（包括 initializer、progress tracking、multi-agent orchestration、verification）的方案花费 $200、耗时 6 小时，但产出了 playable 的结果。成本增加了 20 倍，但从"不能用"到"能用"的差距是质变。另一个值得注意的发现是 Sonnet 4.5 的 "context anxiety"——当 context window 接近满时，model 会表现出过早收尾的倾向，跳过剩余任务直接输出总结。Compaction（上下文压缩）在这种情况下不够用，更有效的做法是 context reset——开新 session 并传入 progress file。

2026 年的材料进一步表明，Agent Runtime 正从 coding-agent 场景扩展到 business-agent 和 platform-agent 场景。OpenAI Agents SDK 通过 Manifest 把 workspace 输入、输出目录、对象存储和 sandbox provider 抽象成可迁移运行环境，并通过 harness-compute separation 避免凭证暴露在模型生成代码执行的容器中。Project Vend 则显示，现实世界 agent runtime 需要的不是一个通用 shell，而是一组业务状态和约束：CRM、库存成本可见、payment link、reminder、采购审批、客户交互记录、法律/安全边界和对抗用户处理。Runtime 的边界正在从“执行代码”扩展到“持续承担经济责任”。

[bifrost-ai-gateway-product-analysis-2026-08-04](/output/reports/bifrost-ai-gateway-product-analysis-2026-08-04/) 与 [mpai-multiplayer-ai-implementation-analysis-2026-08-04](/output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04/) 进一步澄清了两个相邻层。Bifrost 把多模型 ingress、key selection、队列、fallback、cache、预算和 OTel 做成统一流量层，但 conversation state 默认仍由应用负责；MPAI 则把既有 session 的发现、授权、resume 和 stream 做成多人入口，但真实执行仍发生在 Host 的原生 Agent。两者都可能成为 Runtime 的组件或边缘接口，却不能单独证明 durable business state、side-effect reconciliation、跨故障恢复与 outcome acceptance。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [harness-engineering-deep-research](/raw/articles/harness-engineering/harness-engineering-deep-research/) | Inngest event-driven 架构、Initializer Agent 模式、Solo vs Full harness 成本对比 |
| [managed-agents-blog-brain-hands](/raw/articles/harness-engineering/managed-agents-blog-brain-hands/) | Brain/Hands/Session 三层解耦、pets→cattle、session ≠ context window |
| [managed-agents-overview-docs](/raw/articles/harness-engineering/managed-agents-overview-docs/) | Managed Agents 四原语产品化、SSE event streaming、Rate limits |
| [openai-agents-sdk-next-evolution](/raw/articles/harness-engineering/openai-agents-sdk-next-evolution/) | Native sandbox execution、workspace Manifest、snapshot/rehydration、harness-compute separation |
| [project-vend-phase-1-claude-shop](/raw/articles/agent-economy/project-vend-phase-1-claude-shop/) | 长期运行 business agent 的记忆、工具、客户交互和身份混淆失败 |
| [project-vend-phase-2](/raw/articles/agent-economy/project-vend-phase-2/) | CRM、库存、payment link、CEO/merch sub-agent 等业务 runtime scaffold |
| [metr-measuring-ai-long-tasks](/raw/articles/agent-benchmarks/metr-measuring-ai-long-tasks/) | 用任务时长衡量 autonomous runtime 可承载的 long-horizon 能力 |
| [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) | Claude Code 的 session 管理、singleton concurrency、compaction 机制 |
| [agent-infra-update-2026-08-03](/raw/articles/agent-infrastructure/agent-infra-update-2026-08-03/) | 赛道视角将长程 state、失败恢复、成本与大规模调度确认为独立 Runtime 的核心需求，且模型内化已压缩通用 Memory/RAG/MCP 的独立空间 |
| [agent-coworker-identity-system-2026-07-29](/raw/articles/agent-infrastructure/agent-coworker-identity-system-2026-07-29/) | 运行时权限必须绑定用户委托与具体任务，随步骤动态收放，并在任务结束后回收 |
| [bifrost-ai-gateway-product-analysis-2026-08-04](/output/reports/bifrost-ai-gateway-product-analysis-2026-08-04/) | AI Gateway 的协议、队列、key routing、retry/fallback、预算与观测能力，以及它与 durable Agent Runtime 的边界 |
| [mpai-multiplayer-ai-implementation-analysis-2026-08-04](/output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04/) | Session gateway 读取并恢复 Host 上的原生 Codex / Claude session；协作入口不等于拥有执行状态与责任的 Runtime |

## 关联概念

- [harness-engineering](/wiki/concepts/harness-engineering/) — Agent Runtime 是 Harness 的基础设施层
- [context-engineering](/wiki/concepts/context-engineering/) — Context Reset 和 Compaction 是 Runtime 与 Context Engineering 的交汇点
- [agent-memory](/wiki/concepts/agent-memory/) — Filesystem memory 是 Runtime 提供的跨 session 记忆机制
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — Multi-Agent orchestration 依赖 Runtime 的并发和状态管理能力

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
