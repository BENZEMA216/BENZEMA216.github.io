# Self-Verification（自验证）

> Agent 自我检查输出正确性的机制，Anthropic 认为这是 "the single highest-leverage thing you can do" 来提升 Agent 可靠性。

## 核心要点

- 包括 tests、screenshots、browser automation、expected outputs 等多种验证手段
- 没有 clear success criteria，model 会生成看似正确但实际不工作的东西
- GAN-inspired 模式：将 generation 与 evaluation 分离成不同 Agent（Generator + Evaluator）
- Model 评价自己的工作时倾向于 "confident praising"，所以需要独立 evaluator
- Sprint Contract Pattern：Generator 和 Evaluator 在每个 sprint 前协商验收标准
- Claude 倾向于 mark features as complete without proper testing
- 验证不仅决定交付是否完成，也决定轨迹能否成为稳定反馈或训练信号；可验证性与环境可重置性需要同时成立
- 复杂工程常需要双环验证：correctness 内环负责发现并修复错误，performance 外环负责实测、搜索与裁剪；两者不能被一次“生成成功”合并

## 详细说明

Self-Verification 解决的核心问题是：LLM 在生成输出时具有高度自信，但这种自信与正确性之间的相关性远低于预期。当 model 被要求评价自己刚生成的代码时，它会倾向于给出 "confident praising"——列出代码的优点，忽略潜在问题。这不是 model 在"说谎"，而是生成模式和评估模式之间存在系统性偏差。

解决方案的核心思路是 GAN-inspired separation：将生成（generation）和评估（evaluation）分离到不同的 Agent 或不同的 session 中。Generator 负责写代码、实现功能；Evaluator 负责运行 tests、检查 screenshots、验证 expected outputs。两者使用不同的 system prompt，甚至可以使用不同的 model。这种分离打破了 "自己评价自己" 的偏差循环。

Sprint Contract Pattern 进一步结构化了这个过程：在每个 sprint 开始前，Generator 和 Evaluator 协商明确的验收标准（acceptance criteria），写入可执行的测试用例。这些测试用例既是 Generator 的工作目标，也是 Evaluator 的评分标准。Sprint 结束时，Evaluator 运行所有测试，只有全部通过才算 sprint 完成。这避免了 Agent 常见的 "mark as complete" 行为——声称功能已完成但实际跳过了边界情况。

实践中最有效的验证手段往往是最简单的：运行 tests、截取 screenshots、对比 expected outputs。这些都是 computational verification——确定性的、可重复的、不依赖 model 判断的。相比之下，让另一个 LLM 做 code review 是 inferential verification，有用但不如 tests 可靠。最佳实践是两者结合：先跑确定性 tests，再用 LLM 做高层次的逻辑审查。

真实工作流数据把 verification 的作用向训练侧延伸。Verifier's Law 强调任务越容易被可靠衡量，越容易被优化；但只有结果可验证还不够，环境还需要可复制或可重置，模型才能反复探索并获得一致 reward。Coding 天然具备 repo、container 与 tests，而销售、法律、管理等现实任务反馈慢、因果模糊、难以重放，因此更依赖高质量 trajectory、过程反馈与 sample-efficient learning。

[qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03](/output/reports/qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03/) 展示了双环在硬件 / 软件协同任务中的具体形态：correctness loop 用 compiler、simulator、test 与错误反馈执行 `generate → verify → repair`；performance loop 则在正确候选上执行 `search → measure → prune`。这不是“让 LLM 自评”，而是让外部符号系统提供可执行反馈。报告同时提醒：多个组件各自通过任务级验证，不等于统一端到端系统已经贯通。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [harness-engineering-deep-research](/raw/articles/harness-engineering/harness-engineering-deep-research/) | 四维评估框架（Computational/Inferential × Feedforward/Feedback）、Sprint Contract Pattern 详解 |
| [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) | Claude Code 的 hook 验证机制，pre-tool-use 和 post-tool-use hooks 实现确定性验证 |
| [real-world-workflow-data-rlaas-2026-07-22](/raw/articles/agent-economy/real-world-workflow-data-rlaas-2026-07-22/) | Verifier's Law、环境可重置性、hillclimbability 与 RL environment 的训练边界 |
| [qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03](/output/reports/qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03/) | correctness verify-repair 内环、performance search-measure-prune 外环，以及组件验证不等于端到端成立的证据边界 |

## 关联概念

- [harness-engineering](/wiki/concepts/harness-engineering/) — Self-Verification 是 Harness 中最高杠杆的 feedback 控制组件
- [human-in-the-loop](/wiki/concepts/human-in-the-loop/) — 人工审核是 Self-Verification 的兜底层
- [agent-loop](/wiki/concepts/agent-loop/) — Agent Loop 提供验证-修正的迭代结构
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) — 验证把任务轨迹转成可比较的结果、偏好与 reward

---
*由 LLM 从 raw/ 与 output/ 数据编译，请勿手动编辑*
