# Dynamic Workflows（动态工作流）

> Claude 把编排过程写成一段可执行的 JavaScript 脚本，交给确定性运行时执行——中间结果留在脚本变量里而非主上下文，从而处理单轮对话装不下的超大规模任务

## 核心要点

- **编排所有权再上移一级**：协作能力的阶梯是 单 session → subagent → Agent Teams → **Dynamic Workflows**，对应编排者从「你」→「Claude」→「代码」。前三层的共同瓶颈是「编排者始终是 Claude 本身」，每个 subagent 的返回都要回到 Claude 的上下文窗口
- **计划被搬进代码**（plan moves into code）：脚本自己持有循环、分支和中间结果，Claude 的上下文里只剩最终答案。这是「上下文怎么省着用」之外的另一条路线——「当工作量大到上下文根本装不下时怎么办」
- **不请求服务端**：Workflow 工具本身是 Claude Code 在本机跑的一段 JS 编排脚本；真正调模型的是脚本里 `agent()` spawn 出来的 subagent，其调用方式与主对话完全一样（Anthropic 原生 Messages API）
- **核心原语**：`agent()`（spawn 子 agent，可带 schema 强制结构化输出）/ `parallel()`（屏障式并发）/ `pipeline()`（无屏障流水线，默认选择）/ `phase()` / `log()`，配合 `budget`、`args` 注入
- **确定性 + 可恢复**：控制流由代码决定而非模型逐轮决策；journal + `resumeFromRunId` 支持中断后从最长未变前缀恢复（缓存命中）
- **标志案例**：Bun 运行时从 Zig 迁移到 Rust——**11 天 / 约 75 万行 Rust / 99.8% 原有测试通过**，由 Dynamic Workflows 扛主力，设计上「每个文件配两个 reviewer」

## 详细说明

Dynamic Workflows 随 Claude Opus 4.8（2025-05-28）作为 research preview 发布，瞄准「单个 Agent 一次跑不完」的任务：整个服务范围的 bug 排查、动辄上百文件的迁移、需要从各角度反复推敲才敢拍板的方案。

与 subagent/Agent Teams 的网状协作不同，典型 Workflow 是**树状扇出-扇入**结构：一个 Claude 扇出上百个 task，每个 task 走 implementer → 两个 verifier → fixer 三层，最后扇入返回。官方对转变的概括：

> A workflow moves the plan into code. With subagents and skills, Claude is the orchestrator… and every result lands in Claude's context. A workflow script holds the loop, the branching, and the intermediate results itself, so Claude's context holds only the final answer.

关键约束：脚本是 JavaScript（非 TS）；并发上限约 `min(16, cores-2)`、终身 agent 数上限 1000；`pipeline()` 是默认选择（无屏障，item 各自独立流过所有 stage），`parallel()` 仅在确需聚合全部上一阶段结果时使用（dedup/early-exit/交叉引用）。质量模式包括对抗式 verify（多 skeptic 投票否决）、judge panel、loop-until-dry、multi-modal sweep、completeness critic。

这与本知识库已有的 [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)（context firewall）、[harness-engineering](/wiki/concepts/harness-engineering/)（Agent = Model + Harness）和 [agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/)（sync/async 并发模型）是同一条脉络的延伸——Workflow 把「编排」本身从模型推理迁移成了可复用、可恢复、确定性执行的程序。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [claude-code-dynamic-workflows](/raw/articles/harness-engineering/claude-code-dynamic-workflows/) | 原始深度拆解：从 subagent 到 workflow 的位置、本机运行真相、Messages API 调用、Bun Zig→Rust 迁移案例 |
| [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) | Workflow 突破 subagent「每个结果都回 Claude 大脑」的上下文瓶颈 |
| [harness-engineering](/wiki/concepts/harness-engineering/) | Dynamic Workflows 是 harness 在「编排所有权」维度（你 → Claude → 代码）的新一级 |

## 关联概念

- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — Workflow 是 subagent 委托模式之上的确定性编排层
- [harness-engineering](/wiki/concepts/harness-engineering/) — Workflow 把编排固化进代码，是 harness 工程的新原语
- [agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/) — `parallel()`/`pipeline()` 的屏障与无屏障语义对应 Tool 并发模型
- [context-engineering](/wiki/concepts/context-engineering/) — 「中间结果留脚本变量、只回最终答案」是上下文管理的延伸思路
- [self-verification](/wiki/concepts/self-verification/) — 对抗式 verify / judge panel 模式是 Generator-Evaluator 分离的工作流实现

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
