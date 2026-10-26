---
title: "Agent 订阅与事件触发推理：现有项目对照"
source: "output/reports/agent-subscription-event-triggered-reasoning-products-2026-09-10.md"
type: "产品拆解"
risk: "无"
why_first_batch: "机制对照表清晰，适合工程师读者收藏"
sanitized: false
---

# Agent 订阅与事件触发推理：现有项目对照

> 生成日期：2026-09-10（Asia/Shanghai）
> 原始问题：有做 Agent 订阅机制的项目或者产品吗？
> 具体场景：一个 Agent / automation 每日盯盘、产出盘前报告；其他 Agent 订阅该产出，收到后自动开始推理。
> 证据层：当前官方文档与官方示例；未安装、部署或实际运行这些系统，未验证真实报告链路、延迟、成本或生产可靠性。

## 核心结论

有现成的相关产品和开源框架，而且部分已经明确提供“外部事件 → Agent 处理/模型调用”的完整机制。需要区分：向已有会话注入事件、通过外部入口提交一次 Agent 运行、同一事件启动多个工作流，以及只负责交付事件的接入层。

- **Claude Code Channels**：最贴近“把新报告送进一个已有 Agent 会话，利用现有上下文处理”；会话必须保持打开，当前仍是 research preview。[S1][S2]
- **OpenClaw Inbound Webhooks**：提供外部提交 Agent turn 的 HTTP 入口；适合由报告发布程序触发一个配置好的 Agent。仍需配置发布节点与接收 Agent 的路由。[S3]
- **Inngest + AgentKit**：同一事件可以自动启动多个函数，函数内执行模型调用或 Agent 工作流；与“同一份报告，多个订阅者分别推理”高度匹配，需要开发和部署。[S4][S5]
- **n8n**：Webhook 启动 workflow，后接 AI Agent 与 Chat Model，可以配置出该流程；节点订阅和多 Agent 广播关系需要自行配置。[S6][S7][S8]
- **Microsoft AutoGen Core**：原生 topic/subscription，官方示例展示订阅消息后直接调用模型；但项目当前已进入维护模式，作为机制参考比默认新项目选型更合适。[S9][S10][S11]
- **Composio Triggers**：提供已连接应用的事件订阅与交付，接收方仍要编写 handler 来启动 Agent。[S12][S13]

这里的“最贴近/适合”是根据已核查机制对用户场景作出的判断，不是产品性能或采用率排名。

## 项目与具体实现位置

| 项目 | 订阅/触发对象 | 真正开始推理的位置 | 盘前报告如何接入 | 主要边界 |
|---|---|---|---|---|
| Claude Code Channels | 本次会话显式启用的 channel server 发来的事件 | 事件进入运行中的 Claude Code 会话，由 Claude 处理 | 发布程序将报告正文或可读取引用 POST 给自定义 channel receiver | 当前 research preview；自定义渠道需开发测试或组织批准；会话关闭时不收事件；无内建处理确认 |
| OpenClaw | 外部服务调用 Gateway agent hook | `POST /hooks/agent` 提交 Agent turn | 报告完成后带目标 `agentId`、处理任务和报告内容/引用提交请求 | Gateway 和目标 Agent 需可运行；hooks 默认关闭；默认 isolated session，不能假定自动恢复旧对话 |
| Inngest + AgentKit | 自定义事件名称；多个函数可使用同一 trigger | 事件自动启动函数，函数内 `agent.run()` 或 AI inference step 调模型 | 发布报告事件，分别绑定宏观、持仓、核验三个函数 | 需自行定义 Agent、报告读取、上下文和输出；不是通用跨产品订阅前端 |
| n8n | Webhook 收到 HTTP 请求 | 启动 workflow，AI Agent 节点结合 Chat Model 推理 | Webhook 输入报告，expression 映射到 AI Agent prompt | 流程必须配置并发布；报告地址的读取和多订阅者关系需要自己接 |
| AutoGen Core | topic 与 subscription | 下游 message handler 内调用模型客户端 | 上游发布报告消息，下游 Agent 订阅相应 topic | 需要运行 runtime 并接外部入口；示例不自动证明跨机器持久交付；项目维护模式 |
| Composio Triggers | toolkit 提供的已连接应用事件 | 用户自己的 webhook handler 再调用 Agent runner | 报告先进入支持的应用，再选择该应用实际提供的事件类型 | 事件交付不自带 Agent 推理；未核实任意节点能自行定义公开报告主题 |

表中把各能力接到盘前报告的路径属于实现建议；本轮没有配置或运行这些路径。

## 三个最值得优先看的机制

### 1. Claude Code Channels：直接把事件送进已有上下文

官方文档明确描述 channel 为向运行中的 Claude Code session 推送事件的 MCP server。自定义 receiver 可以接收 HTTP POST，通过 `notifications/claude/channel` 将正文和元信息送入会话，模型看到 `<channel>` 包裹的事件。[S1][S2]

这已经覆盖用户所说的“能让 Agent 进行推理的感知”。需要特别保留三项边界：

1. 只有会话打开时接收；长期使用需保持进程/终端运行。
2. 忙碌期间的事件会排队，多个通知可能在下一轮一起处理；并行独立处理需使用不同会话。
3. `mcp.notification()` 返回仅表示写入传输层，Claude Code 不确认模型已处理。若渠道未启用或被组织策略阻止，事件可能被静默丢弃；需要完成回执时，要自行记录事件状态并暴露回报工具。[S2]

这证明的是 Claude Code 明确定义的 channel 扩展，不能从中推出任意 MCP 客户端都会自动开始推理。

### 2. OpenClaw：外部请求直接提交 Agent turn

官方 Inbound Webhooks 文档提供 `/hooks/agent`，允许外部系统提交消息并指定已配置的 Agent。示例返回 `runId`，并说明默认 `sessionMode` 为 `isolated`。[S3]

报告生成程序因此可以成为触发方。但“这个发布者有哪些订阅者、每位订阅者的处理任务是什么”仍需要配置层维护，不能把单个 HTTP 入口视为完整订阅网络。

HTTP 200 的默认含义是运行获得调度准入，不代表模型完成或结果送达。当前文档还提供 `waitForCompletion` 返回执行与交付状态；响应不包含模型正文。这是观察报告是否真正被处理时需要区分的证据层。[S3]

### 3. Inngest + AgentKit：一份报告启动多个独立分析

官方 fan-out 文档说明，同一个事件能够触发多个独立函数，也可以跨不同应用/代码库。AI orchestration 文档进一步展示事件绑定函数后调用 AI inference 或 AgentKit 的模型运行方法。这两组证据合起来，支持“事件分发 → 实际推理”的判断。[S4][S5]

针对用户场景，可以设计成：

```text
盘前报告保存完成
  → 发布 market/premarket-report.published（示意事件名）
  → 宏观分析函数：加载报告与宏观研究上下文，运行 Agent
  → 持仓分析函数：加载报告与持仓上下文，运行 Agent
  → 核验函数：加载报告和来源，运行 Agent
```

这是基于官方能力组合出来的方案，不是官方提供的现成盯盘模板，也不会自动拥有其他 Agent 产品里的历史聊天。

## 两类容易被误判为完整答案的能力

### Composio：能收到事件，还要连接运行器

官方 Triggers 文档的机制是已连接应用事件进入 Composio，再交付到用户 webhook；处理逻辑由用户编写。生产使用 webhook，本地 `subscribe()` 接收方式面向基本原型。因此它适合作为应用事件接入层，但不能单独证明下游已运行模型。[S12][S13]

### A2A Push Notifications：已有任务的更新订阅

A2A 当前规范中的 `SubscribeToTask` 面向特定已有任务，推送配置也绑定 `taskId` 和接收 URL。它传递任务状态和产物更新，规范本身没有要求接收者调用模型。[S14]

所以“接收某次任务的产物更新”和“长期关注一个节点今后每天发布的新报告”是不同范围。后者仍需长期订阅登记、跨任务路由和接收端运行调度。

## 对产品方向的判断

已经有充分的机制证据说明该场景可以构建。若要进一步产品化，值得关注的是：把订阅对象、过滤条件、报告版本、接收 Agent、既有任务上下文、启动入口和完成回执连接成一个用户能配置的整体。

在本轮核对的项目中，没有证据证明它们已经统一提供“跨任意 Agent 产品，一键长期订阅任意内容节点，并自动恢复各自上下文推理”的完整体验。这是本次样本的能力边界，不能扩张成全市场不存在此类产品的结论。

针对用户当前场景的阅读顺序建议：先看 Claude Code Channels 理解会话如何接收事件，再看 Inngest fan-out 理解一对多运行；如果目标接收方就是 OpenClaw，则直接研究 `/hooks/agent`。需要可视化配置原型时，可用 n8n 组合流程。

## 来源

以下均于 2026-09-10 核对；文档可能变化。Claude Code、OpenClaw、Inngest 的关键机制使用 Ego 浏览器读取官方页面，其余项使用官方网页与官方仓库文档核对。

- [S1 Claude Code — Channels](https://code.claude.com/docs/en/channels)
- [S2 Claude Code — Channels reference](https://code.claude.com/docs/en/channels-reference)
- [S3 OpenClaw — Inbound webhooks](https://docs.openclaw.ai/automation/cron-jobs/webhooks)
- [S4 Inngest — Fan-out](https://www.inngest.com/docs/guides/fan-out-jobs)
- [S5 Inngest — AI inference / AgentKit](https://www.inngest.com/docs/features/inngest-functions/steps-workflows/step-ai-orchestration)
- [S6 n8n — Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [S7 n8n — AI Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
- [S8 n8n — Tools Agent prompt](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent/#prompt)
- [S9 AutoGen — Topic and Subscription](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/core-concepts/topic-and-subscription.html)
- [S10 AutoGen — Sequential Workflow](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/sequential-workflow.html)
- [S11 AutoGen 官方仓库与维护状态](https://github.com/microsoft/autogen)
- [S12 Composio — Triggers](https://docs.composio.dev/docs/triggers)
- [S13 Composio — Receiving events](https://docs.composio.dev/docs/setting-up-triggers/subscribing-to-events)
- [S14 A2A — Specification，Subscribe to Task / Create Push Notification Config](https://a2a-protocol.org/latest/specification/)

相关讨论：[[output/reports/agent-communication-mainstream-methods-2026-07-21]]。该旧报告仅作为已有讨论入口，本报告的现有产品能力判断以本轮官方资料为依据。

