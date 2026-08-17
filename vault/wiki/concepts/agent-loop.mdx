# Agent 循环架构（Agent Loop）

> Agent 的核心运行机制：感知、思考、行动、反馈的持续循环，驱动任务从输入到完成的全过程。

## 核心要点

- 基本循环：感知（Perceive）→ 思考（Think）→ 行动（Act）→ 反馈（Feedback）
- Claude Code 采用单循环 + 智能委托（sub-agent delegation）模式，主循环保持简洁
- Creative CoWork 在标准循环基础上增加创意模式：发散（Diverge）与收敛（Converge）阶段
- 循环的终止条件、错误恢复、用户介入点是架构设计的关键决策
- 任务存在多个目标时应拆成嵌套控制环：先以确定性 verifier 收敛 correctness，再以真实测量优化 performance

## 详细说明

Agent Loop 是所有 Agent 系统的运行核心。不同于传统的请求-响应模式，Agent 通过持续循环来处理复杂任务：先感知环境和用户输入，然后进行推理和规划，接着调用工具执行动作，最后评估结果并决定是否继续循环。这个循环会持续进行直到任务完成或需要用户介入。

Claude Code 的架构分析揭示了一种优雅的实现：单主循环 + 智能委托。主 Agent 保持一个简洁的循环，当遇到可以并行或独立处理的子任务时，委托给 sub-agent 执行。这避免了多 Agent 协调的复杂性，同时保持了任务分解的灵活性。对比 4 种 Agent System Prompt 的研究（Claude Code、Cursor、Devin、Manus）显示，循环架构的选择直接影响了 Agent 的能力边界和用户体验。

Creative CoWork 在此基础上做了关键扩展：引入创意循环模式。标准 Agent Loop 偏向收敛——尽快找到正确答案。但创意工作需要发散阶段（生成多种可能性、探索非常规方向）和收敛阶段（筛选、精炼、确定最终方案）。Creative Agent SP 模板中定义了这两种模式的切换触发条件和行为差异。情书 Agent（core-sp.md）是这种创意循环的早期实现案例。

QIMENG 的研究框架补充了另一种重要扩展：一个“生成—反馈”循环不足以同时保证正确与高性能。[qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03](/output/reports/qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03/) 将工作拆成 correctness inner loop 与 performance outer loop：内环由编译、仿真、测试等 verifier 产生可修复错误；只有满足约束的候选才进入外环，用实际性能测量驱动搜索和裁剪。这个结构适用于任何“先满足硬约束、再优化软目标”的 Agent 系统。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) | 分析了单循环 + 委托模式的实现细节和设计取舍 |
| [Agent System Prompt 研究](/raw/articles/claude-code-research/Agent%20System%20Prompt%20%E7%A0%94%E7%A9%B6/) | 对比 4 种主流 Agent 的循环架构差异 |
| [Creative Agent System Prompt 模板](/raw/projects/creative-cowork/reference/Creative%20Agent%20System%20Prompt%20%E6%A8%A1%E6%9D%BF/) | 定义了创意循环的发散/收敛模式及切换条件 |
| [core-sp](/raw/articles/claude-code-research/agent-prompt-design/core-sp/) | 情书 Agent 作为创意循环的实际实现案例 |
| [qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03](/output/reports/qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03/) | correctness 内环与 performance 外环的 verifier-driven neural-symbolic 实例 |

## 关联概念

- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — Agent Loop 中的智能委托机制，子任务分发与结果收集
- [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/) — 循环中每个阶段的 Prompt 构建方式
- [creative-agent-design](/wiki/concepts/creative-agent-design/) — 在标准循环上叠加的创意发散/收敛机制
- [self-verification](/wiki/concepts/self-verification/) — 外部 verifier 为循环提供可执行、可比较的反馈

---
*由 LLM 从 raw/ 与 output/ 数据编译，请勿手动编辑*
