# Fractal vs Claude Agent Teams / Managed Agents：相似表象下的两条分界线

> 生成时间：2026-07-26
> 查询：Fractal 和 Claude 的 Agent Management 有什么大的区别
> 说明：Claude 侧有两个容易混淆的产品，本报告同时比较 Claude Code Agent Teams 与 Claude Managed Agents。

## 摘要

如果所指是 **Claude Code Agent Teams**，Fractal 与它约有七成是同一类东西：都有 lead/manager、独立 context、共享任务、Agent 间消息和多会话并行。真正重要的差异是：

> **Claude Agent Teams 管的是一次 Claude Code 会话里的协作团队；Fractal 管的是一棵可递归、Git-isolated、可长期运行的多 harness 软件组织树。**

Fractal 的增量主要来自每个节点绑定 branch/worktree、递归生成 child、iteration loop、private memory、预算/成本账本和逐层 merge。Claude Agent Teams 更轻、更原生，但当前不支持 nested teams，teammates 也不自动获得独立 worktree。

如果所指是 **Claude Managed Agents**，差异则很大：Managed Agents 是提供 sandbox、durable session、event stream、webhook 和 API 的云端/自托管 Agent execution platform；Fractal 是开发者机器上的 Git/tmux/SQLite coding orchestration runtime。前者适合把 Agent 嵌进产品，后者适合组织现成 CLI Coding Agents 完成 repo 工作。

## 1. Fractal vs Claude Code Agent Teams

| 维度 | Claude Code Agent Teams | Fractal |
|---|---|---|
| 基本单位 | 一次独立 Claude Code session | 一个绑定 branch/worktree 的长期 node |
| 组织拓扑 | 固定 lead + teammates；不支持 nested teams | 任意 node 可继续生成 child，形成递归树 |
| 协调方式 | shared task list、依赖、mailbox、peer messaging | `NODE.md` 合同、plans/steps、Radio、shared SQLite ledger |
| 文件隔离 | teammates 默认共享 working directory；官方要求按文件 ownership 拆分 | 每个 node 默认独立 branch/worktree，成果通过 commit/merge 收束 |
| 生命周期 | 面向一次交互团队；当前一个 session 只能有一个 team | node/run/iteration/step 状态机，可 pause/resume/stop/reconcile |
| 恢复与记忆 | in-process teammates 当前不能随 `/resume` 恢复 | node private memory、共享 wiki、持久数据库和多轮 iteration |
| 模型与 harness | Claude Code 原生，只运行 Claude sessions | 可封装 Claude Code、Codex、Grok Build、OpenCode、Oh My Pi |
| Git 集成 | Git/worktree 是相邻能力，不是 Agent Teams 自身的团队协议 | branch/worktree/commit/parent-child merge 是核心协议 |
| UX 与上手 | Claude Code 内置，直接用自然语言创建 team，摩擦更低 | 需安装并理解 node、tree、TUI、loop、merge，组织成本更高 |
| 安全边界 | teammates 继承 lead 权限；permission request 可回传 lead | seeded backend 默认 bypass permission；worktree 不是安全 sandbox |
| 当前成熟度 | experimental，官方列出 resume、task lag、shutdown、orphan tmux 等限制 | 开源实现较完整，但仍有公开 merge regression，且无独立 benchmark |

Claude 官方明确说明 Agent Teams 由 lead、独立 teammates、shared task list 和 mailbox 构成；teammates 能直接互相发消息，但当前 **不支持 nested teams**，并且 Agent Teams **不自动隔离 worktree**。[Claude Code Agent Teams](https://code.claude.com/docs/en/agent-teams) [Claude parallel agents guide](https://code.claude.com/docs/en/agents)

### 最大的真实区别：session collaboration vs repository organization

Claude Agent Teams 的成员首先是“并行 Claude 会话”。团队结束后，主要资产仍是代码修改和主会话综合结果。

Fractal 的成员首先是“repo 中有身份的自治节点”：节点有自己的 branch、worktree、任务合同、计划、记忆、成本和生命周期；父子关系既是组织关系，也是 Git 集成关系。它试图把组织状态本身做成可观察、可恢复的 runtime artifact。详细机制见 [fractal-hierarchical-agent-runtime-product-analysis-2026-07-26](/output/reports/fractal-hierarchical-agent-runtime-product-analysis-2026-07-26/)。

这一区别只在以下情况里值钱：

- 任务需要跨数小时或多轮持续运行；
- 子任务能按 package/layer/files 明确隔离；
- 需要混用 Claude、Codex 等不同 harness；
- 需要节点级成本、暂停恢复、反复 review 和逐层 merge；
- manager 本身也需要继续拆 manager/worker。

如果只是一次 research、debugging hypotheses、独立 code review 或前后端/tests 三路并行，Claude Agent Teams 已覆盖大部分价值，而且体验更轻。Fractal 不会因为“递归”自动得到更高质量；树越深，合同错误、重复工作和 merge 风险也会放大。

## 2. 如果你说的是 Claude Managed Agents

Claude Managed Agents 的四个核心对象是 **Agent、Environment、Session、Events**。它提供 Anthropic-managed 或 self-hosted sandbox、持久 session/filesystem、SSE event history、steer/interrupt、webhook 和 scheduled deployment，目标是让开发者不再自己构建 agent loop 与执行基础设施。[Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)

它现在也支持 multi-agent coordinator：

- 每个 agent 有自己的 model、system prompt、tools、MCP 和 skills；
- agent 在同一 session 中拥有隔离的 thread/context；
- 所有 agents 共享 sandbox、filesystem 和 session-level vault credentials；
- coordinator roster 最多列出 20 个 unique agents，最多 25 个并发 threads；
- 只允许一层 delegation，不支持递归 coordinator 树。[Managed Agents multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)

因此它和 Fractal 的分界是：

| 问题 | Claude Managed Agents | Fractal |
|---|---|---|
| 谁使用 | 产品开发者通过 API 调用 | 开发者/Agent 在本地 repo 中操作 |
| 提供什么 | managed/self-hosted sandbox + durable Agent API | 本地多 CLI Coding Agent 的组织和 Git 协作 |
| 数据与事件 | server-side session history、SSE、webhook | local SQLite、tmux、Radio、Git |
| 隔离方式 | session sandbox；multi-agent threads 共享该 sandbox/filesystem | 每个 node 独立 Git worktree，但共享宿主机权限 |
| 部署形态 | Anthropic cloud 或 self-hosted worker | 本机/local host |
| 供应商 | Claude-only | 多 harness、多模型供应商 |
| 递归组织 | 一层 coordinator delegation | 可递归 node tree |
| 产品嵌入 | 强：API、events、webhooks、scheduled runs | 弱：不是 multi-tenant application backend |

它们甚至可以组合：Managed Agents 提供安全、可持久的 execution substrate；Fractal-like 逻辑在其上负责更深的 Git 组织。但 Fractal 当前实现强绑定本地 tmux/worktree/SQLite，不能直接当作 Managed Agents 的上层控制面。

## 3. 产品判断

### 如果和 Claude Agent Teams 比

**有重要差异，但不是代际差异。** Fractal 的核心价值可以压缩成四项：

1. recursive topology；
2. per-node Git worktree/branch；
3. durable node lifecycle、memory 与 ledger；
4. multi-harness portability。

除这四项外，lead/worker、task list、mailbox、独立 context、plan approval 和人工 steering，Claude 原生已经覆盖很多。随着 Claude 把 Agent Teams、Agent View、worktrees 和 `/batch` 继续整合，Fractal 的独立空间会被进一步压缩。

### 如果和 Claude Managed Agents 比

**是不同层，差异很大。** Managed Agents 更像 Agent cloud/runtime API，Fractal 更像 local software factory supervisor。前者解决“怎样让应用稳定运行 Agent”，后者解决“怎样让多个 Coding Agent 围绕一个 Git repo 形成组织”。

### 对 ODW 的启示

ODW 不应复制整套 Fractal。更值得吸收的是：

- worker 的 artifact/ownership contract；
- 可选 worktree isolation；
- budget、timeout、status 和 operator visibility；
- manager 只消费压缩结果和验收 artifact。

ODW 仍应保持 code-controlled、可移植的 workflow kernel。全 Claude、一次性交互协作可直接用 Agent Teams；跨 harness、长周期、模块化 repo 工作才值得试 Fractal。换言之，Fractal 更像可选的“组织外壳”，ODW 更像节点内部的“并行计算内核”。

## 数据来源

- [Fractal GitHub repository](https://github.com/plasma-ai/fractal)
- [Fractal Architecture](https://docs.plasma.ai/fractal/guide/architecture.html)
- [Claude Code Agent Teams](https://code.claude.com/docs/en/agent-teams)
- [Claude Code parallel agents guide](https://code.claude.com/docs/en/agents)
- [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)
- [Claude Managed Agents multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)
- [fractal-hierarchical-agent-runtime-product-analysis-2026-07-26](/output/reports/fractal-hierarchical-agent-runtime-product-analysis-2026-07-26/)
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- [agent-runtime](/wiki/concepts/agent-runtime/)
- [harness-engineering](/wiki/concepts/harness-engineering/)
- [safe-autonomy](/wiki/concepts/safe-autonomy/)

---
*由 LLM 从知识库查询生成*
