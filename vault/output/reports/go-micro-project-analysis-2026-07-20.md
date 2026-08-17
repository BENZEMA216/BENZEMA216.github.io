# Go Micro 项目速析

> 生成时间：2026-07-20
> 查询：`micro/go-micro` 这个项目在做什么？

## 摘要

Go Micro 是一个有长期微服务框架历史、目前转向 **Go Agent harness + service framework** 的开源项目。它的核心判断是：生产级 Agent 本质上也是分布式服务，因此 Agent、业务服务和确定性 workflow 应共享同一套 runtime。它不是单纯的 LLM SDK，也不是 Kubernetes 替代品；更接近“Go 微服务底座 + Agent runtime + MCP/A2A gateway + CLI”。

## 它具体解决什么问题

传统 Agent framework 常从“模型循环”出发；Go Micro 从“可运营的分布式系统”出发，把以下能力放进同一个 Go runtime：

- **Services**：RPC client/server、service registry、load balancing、streaming、pub/sub、store、typed model。
- **Agents**：LLM provider、持久 memory、tools、plan/delegate、step/loop limits、人工审批和 tool middleware。
- **Flows**：确定性、多步、可 checkpoint/resume 的 durable workflow；未知路径才交给 Agent 决策。
- **Interop**：服务 endpoint 自动暴露为 MCP tool；Agent 自动通过 A2A 对外可达；还支持 x402 按次付费 tool。
- **Developer loop**：`micro new` 脚手架、`micro run` 热重载和交互 console、`micro chat/call/inspect`、SSH + systemd 部署。

其最关键的抽象映射是：

| Go Micro 对象 | Agent 系统中的角色 |
|---|---|
| Service endpoint | 可调用 tool |
| Agent | 带 LLM 的 service，暴露 `Agent.Chat` |
| Registry | service / agent discovery 与路由 |
| Flow | 已知路径的 durable orchestration |
| MCP gateway | 把内部服务暴露给外部 Agent |
| A2A gateway | 把内部 Agent 暴露给其他 Agent |

## 一个直观例子

你可以用 Go 写 `task` 和 `project` 两个业务服务，再创建一个 task-manager Agent。Agent 从 registry 发现这两个服务，把它们的 endpoint 当 tools，用 store 保留对话记忆，并通过 RPC、MCP 或 A2A 被调用。确定性的“创建项目 → 创建任务 → 通知”可以放进 Flow；遇到开放式规划再由 Agent 处理。

## 它与常见类别的区别

- **不是 LangChain 的 Go 复刻**：重点不是 prompt/chain abstraction，而是把 Agent 放进服务发现、RPC、持久状态、恢复与部署体系。
- **不是纯微服务框架了**：旧有 service framework 仍是底座，但 v6 的当前叙事明显以 Agent harness 为中心。
- **不是完整云平台**：它是 Apache-2.0 的代码框架和 CLI；生产托管、基础设施选型及运维仍主要由使用者承担。
- **不是只做协议适配**：MCP/A2A 是出口，核心仍是 Agent、服务和 Flow 的统一 runtime。

## 适合与不适合

适合：

- 团队以 Go 为主，Agent 需要调用真实内部服务；
- 需要 service discovery、durable state、guardrails、跨 Agent 调用与协议互通；
- 希望确定性 workflow 和 LLM 决策共存，而不是所有流程都交给模型。

不太适合：

- 只想快速做一个单机聊天机器人或轻量 demo；
- 团队完全不使用 Go；
- 想要的是开箱即用的托管 Agent SaaS，而非自行构建和运行 runtime。

## 判断

它真正想占据的位置是 **“Agent 时代的 Go application/runtime framework”**：把过去微服务时代积累的 registry、RPC、broker、store 等能力，重新解释为 Agent 的工具层、通信层、状态层和执行层。这个方向有工程一致性，但也意味着框架表面积很大；采用前应重点验证 Agent 新模块的成熟度、文档与生态是否跟得上传统微服务部分，而不能仅凭约 23k stars 判断当前 v6 Agent 能力的成熟度。

## 数据来源

- [micro/go-micro 官方仓库](https://github.com/micro/go-micro)
- [Go Micro package reference](https://pkg.go.dev/go-micro.dev/v6)
- [agent-runtime](/wiki/concepts/agent-runtime/)
- [agent-communication](/wiki/concepts/agent-communication/)
- [harness-engineering](/wiki/concepts/harness-engineering/)

---
*由 LLM 从知识库查询生成*
