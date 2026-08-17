# Agent 通信：当前主流方法与选择框架

> 生成时间：2026-07-21
> 查询：AGENT 通信我们聊过很多次，现在有哪些主流的方法？

## 摘要

“Agent 通信”至少要拆成三层：**同一应用内的编排模式、Agent 之间交换的信息载体、跨系统互操作协议**。如果只看当前生产实践，主流不是让一群 Agent 自由聊天，而是：**Manager / Supervisor 中心编排、显式 Workflow / Shared State、Handoff、并行 Fan-out/Fan-in**。共享黑板和 Pub/Sub 在异步、长任务中实用；Group Chat / Debate 适合评审与探索，但不宜作为默认架构。跨平台连接上，**MCP 是 Agent-to-Tool / Context；A2A 是 Agent-to-Agent 候选标准**，二者不应混为同一种通信方法。

## 一、先把“通信”拆成三件事

| 层 | 回答的问题 | 典型选择 |
|---|---|---|
| 编排拓扑 | 谁决定下一步、谁拥有最终答案？ | Manager、Handoff、Workflow、Group Chat、Blackboard |
| 消息与状态 | Agent 到底传什么？ | 自然语言、结构化 task packet、artifact、shared state、event |
| 跨系统协议 | 不同 runtime / 公司如何发现和调用彼此？ | MCP、A2A、普通 HTTP/gRPC/event bus |

很多讨论把这三层混在一起，于是会出现“MCP 和 supervisor 谁更好”这种无效比较：前者主要解决工具/上下文连接，后者解决应用内部控制权。

## 二、当前生产上最主流的 6 种方法

### 1. Manager / Supervisor（Agent-as-Tool）

一个中心 Agent 拆任务、调用 specialist，并收回结构化结果；最终答案和 guardrails 仍由中心统一负责。

- **适合**：研究汇总、编码流水线、跨专业任务、需要统一最终口径的产品。
- **优势**：控制边界清楚，易审计、重试、并行和做权限隔离。
- **风险**：manager 成为 context、延迟和判断瓶颈；把所有历史塞给所有 specialist 会迅速失控。
- **当前地位**：默认首选。OpenAI 官方将其表述为 “agents as tools”；Microsoft 的 Magentic 也是 manager 动态协调 specialist。

### 2. Explicit Workflow / Shared State Graph

用代码或图明确规定节点、边、条件路由、checkpoint；Agent 是 workflow 中的某类 executor，消息通常是 typed state，而非自由聊天。

- **适合**：业务流程明确、需要恢复/HITL/合规、长时任务、可测试生产系统。
- **优势**：确定性、checkpoint、失败恢复、可观测性最好。
- **风险**：流程变化时维护成本较高；过早画死图会限制开放式探索。
- **当前地位**：生产系统主流。Microsoft Agent Framework 已把 sequential、concurrent、handoff、group chat、magentic 都放进 graph workflow；LangGraph 同样以 shared state 为中心。

### 3. Handoff / Control Transfer

当前 Agent 根据上下文把控制权和必要历史移交给 specialist，后者成为面向用户的 active agent。

- **适合**：客服分流、多阶段会话、不同权限/人格/工具集之间切换。
- **优势**：prompt 聚焦，specialist 可直接服务用户，模块边界自然。
- **风险**：上下文移交过多会污染，过少会失忆；多跳 handoff 容易循环、责任不清。
- **当前地位**：主流，但它解决的是“控制权转移”，不是所有子任务委派。若原 Agent 仍应拥有最终答案，优先用 Agent-as-Tool。

### 4. Fan-out / Fan-in（并行分发与汇总）

把互相独立的子任务并行发给多个 Agent，再由 reducer / judge / manager 汇总。

- **适合**：多源检索、候选生成、代码/文档分片、独立审查、不同假设并行验证。
- **优势**：降低墙钟时间，引入视角多样性。
- **风险**：并行任务若不独立会产生写冲突；汇总器可能丢失少数派正确答案；成本近似随分支数增长。
- **当前地位**：非常实用，通常作为 manager 或 workflow 的一个局部模式，而非完整架构。

### 5. Blackboard / Artifact-mediated Communication

Agent 不直接互聊，而是读写一个共享工作区：任务状态、事实、计划、代码、测试结果、decision log、event log。其他 Agent 根据订阅或条件响应。

- **适合**：异步长任务、跨 session / 跨人协作、多个 Agent 围绕同一 repo 或 case 工作。
- **优势**：时间解耦，减少重复传递全文；artifact 可审计、可恢复，也方便人加入。
- **风险**：需要 schema、ownership、版本、并发控制和垃圾回收，否则黑板会变成污染池。
- **当前地位**：工程价值高，但常以数据库、repo、task store、event log 的形式出现，而不一定叫 blackboard。

### 6. Pub/Sub / Event-driven Messaging

Agent 发布 typed event，感兴趣的 Agent 订阅处理；通常借助 queue、broker 或 event bus 解耦生产者与消费者。

- **适合**：大量异步 Agent、外部事件触发、跨服务、需要 backpressure / retry / dead-letter queue 的系统。
- **优势**：扩展性和解耦强。
- **风险**：最终一致性、重复消息、顺序、幂等和 tracing 比 prompt 本身更难。
- **当前地位**：分布式生产系统常见；对小型多 Agent 应用往往过重。

## 三、常见但不是默认生产主线的方法

| 方法 | 真正适用 | 为什么不应默认使用 |
|---|---|---|
| Group Chat / Round-robin | brainstorming、模拟会议、开放讨论 | token 成本高、责任和终止条件模糊、容易相互放大错误 |
| Debate / Critic-Judge | 高风险答案复核、候选比较、红队 | “多个同质模型互聊”不保证胜过强 single-agent + verifier；应用在关键节点而非全流程 |
| Role-playing / SOP | 组织流程仿真、固定专业分工 | 角色 prompt 不等于真实能力或权限；生产价值主要来自 SOP 和结构化 artifact |
| Market / Auction | 动态资源分配、供应方竞争、Agent marketplace | pricing、identity、SLA、支付、争议解决尚未成熟 |
| Emergent language | 研究 Agent 自组织 | 不可解释、难治理、难跨模型/版本稳定复现 |
| Latent-space / KV-cache communication | 同构模型间极低延迟研究 | 强耦合模型架构，缺通用互操作、审计和成熟生产工具链 |

## 四、协议层：MCP、A2A 和普通基础设施怎么放

### MCP：Agent ↔ Tool / Context

MCP 的官方架构是 host-client-server：server 暴露 tools、resources、prompts，双方进行 capability negotiation，通过 stdio 或 Streamable HTTP 传输。它非常适合把外部能力接进 Agent，但默认并不提供一个完整的 peer-agent 协作、任务所有权或多方治理模型。

### A2A：跨 runtime 的 Agent ↔ Agent

A2A 的价值是把远程 Agent 当成有能力描述、任务生命周期和异步交互能力的服务，而不仅是一个无状态函数。它适合跨团队/跨供应商边界；在同一个应用内部，用普通函数、typed message 或 workflow 往往更简单。

### HTTP / gRPC / Queue 仍然是主力

Agent 系统并没有废掉传统分布式系统。认证、幂等、超时、重试、消息顺序、schema evolution、backpressure、tracing，仍主要依靠 HTTP/gRPC、数据库和消息队列解决。A2A/MCP 是语义层接口，不是可靠性基础设施的替代品。

## 五、最实用的选择法

| 你的问题 | 首选 |
|---|---|
| 一个 Agent 应拥有最终答案，其他 Agent 只提供专长 | Manager + Agents-as-Tools |
| 用户需要直接被转到 specialist | Handoff |
| 步骤、审批、恢复点明确 | Explicit Workflow + Shared State |
| 多个独立子问题可同时做 | Fan-out/Fan-in |
| 跨 session、异步、多人/多 Agent 共用事实 | Blackboard / Artifact Store |
| 大规模事件驱动、跨服务 | Pub/Sub |
| 跨公司调用远程 Agent | A2A（外加 auth、SLA、trace） |
| 给 Agent 接工具和数据 | MCP |
| 只想提高答案可靠性 | 先 single-agent + verifier；必要节点再 debate |

## 六、真正决定效果的不是“Agent 会不会聊天”

生产系统的通信质量主要取决于下面六项：

1. **typed task contract**：目标、输入、约束、交付物、截止/预算、允许动作。
2. **最小上下文传递**：给下游必要事实和 artifact reference，不复制整个 transcript。
3. **ownership**：谁能写什么、谁拥有最终答案、谁对 side effect 负责。
4. **termination 与 budget**：最大轮数、超时、token/cost cap、循环检测。
5. **verification**：结果附 evidence、tests、provenance；claim 与 verified fact 分开。
6. **durability / observability**：task id、状态机、checkpoint、trace、幂等、失败归因。

所以我的最终判断是：**Agent communication 的主线已经从“让 Agent 多聊”转向“让 Agent 通过结构化任务、共享状态和可验证 artifact 协作”**。协议只是边界接口；可靠协作的核心仍是 orchestration、state、contract 和 verification。

## 数据来源

### 知识库

- [agent-communication](/wiki/concepts/agent-communication/)
- [agent-communication](/wiki/maps/agent-communication/)
- [academic-research](/raw/articles/agent-communication/academic-research/)
- [a2a-agent-communication-master-index-2026-05-31](/output/reports/a2a-agent-communication-master-index-2026-05-31/)
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)

### 当前官方资料核验

- [OpenAI Agents SDK: Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/)
- [OpenAI Agents SDK: Handoffs](https://openai.github.io/openai-agents-python/handoffs/)
- [Microsoft Agent Framework: Workflow orchestrations](https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/)
- [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/)
- [Model Context Protocol: Architecture](https://modelcontextprotocol.io/docs/learn/architecture)
- [LangChain: Handoffs](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs)

---
*由 LLM 从知识库查询生成*
