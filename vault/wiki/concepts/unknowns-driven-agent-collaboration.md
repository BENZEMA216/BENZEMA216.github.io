# Unknowns-Driven Agent Collaboration（未知项驱动的人机协作）

> 把 prompt / spec 与真实代码库、业务环境之间的差距显式化，并在实现前、实现中、实现后持续发现和消解未知项的人机协作方法。

## 核心要点

- **Map ≠ Territory**：prompt、spec 和 context 是工作地图，代码库、用户、数据与现实约束才是疆域；两者差距就是 unknowns
- 四类未知项：known knowns、known unknowns、unknown knowns、unknown unknowns
- 过度具体会锁死错误方向，过度模糊会迫使 Agent 用通用最佳实践替代本地判断
- 实现前通过 blind-spot pass、brainstorm、prototype、interview、reference 和 implementation plan 暴露未知项
- 实现中用 implementation notes 记录偏离计划的 edge case、保守决策与新发现
- 实现后用 explainer、pitch 和 quiz 让人理解、验收并真正拥有结果
- 计划的目标不是消灭未知项，而是让未知项尽早、低成本、可追踪地出现

## 详细说明

Agent 输出质量不只受模型能力和 prompt 质量影响，还取决于人和 Agent 对问题中未知项的共同管理。用户往往知道自己想要什么的一部分，却未必知道什么问题值得问、什么是高质量结果、代码库有哪些历史约束，或者哪些隐含偏好只有看到 prototype 后才会显现。Agent 如果没有被告知这些边界，只能用训练数据中的常见模式补空白。

四类 unknowns 对应不同协作方式：

| 类型 | 含义 | 合适机制 |
|------|------|----------|
| Known knowns | 已知且能表达 | 直接写入 prompt / spec |
| Known unknowns | 知道尚未解决 | interview、research、decision log |
| Unknown knowns | 会判断但难以提前表达 | prototype、多个方向、reference |
| Unknown unknowns | 尚未意识到的问题 | blind-spot pass、repo exploration、失败复盘 |

这套方法把协作分成三个阶段。实现前，先让 Agent 搜索代码库、做 blind-spot pass、生成多个低成本原型，并优先追问“答案会改变架构”的问题。实现中，不假设 plan 永远正确，而是让 Agent在遇到 edge case 时选择保守路径并写入 implementation notes。实现后，通过 explainer 和 quiz 检查人是否理解发生了什么，而不是只看 diff 或接受“任务完成”的表面状态。

它与 Spec-Driven Development 的区别是：spec 是当前已知意图的显式合同，而 unknowns-driven collaboration 负责发现合同之外仍未被表达的部分。它与 Human in the Loop 的区别是：HITL 决定哪些节点由人批准，这里进一步规定人和 Agent 应围绕哪些未知项协作。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [claude-fable-5-finding-your-unknowns](/raw/articles/harness-engineering/claude-fable-5-finding-your-unknowns/) | Anthropic 工程实践：四类 unknowns、blind-spot pass、prototype、interview、implementation notes、explainer 与 quiz |
| [spec-driven-development](/wiki/concepts/spec-driven-development/) | spec、Interview Pattern 与 Explore → Plan → Implement 工作流 |
| [human-in-the-loop](/wiki/concepts/human-in-the-loop/) | 人类在高影响决策点保留控制权 |
| [harness-engineering](/wiki/concepts/harness-engineering/) | 将 unknown discovery 作为 human-side feedback loop |

## 关联概念

- [spec-driven-development](/wiki/concepts/spec-driven-development/) — Spec 固化当前已知意图，未知项驱动协作持续补全它
- [human-in-the-loop](/wiki/concepts/human-in-the-loop/) — 未知项决定哪些节点值得暂停并请求人类判断
- [harness-engineering](/wiki/concepts/harness-engineering/) — prototype、notes、tests 与 explainer 都是 Harness artifact
- [self-verification](/wiki/concepts/self-verification/) — 验证不仅检查结果，也暴露尚未理解的行为和边界
- [context-engineering](/wiki/concepts/context-engineering/) — 用户的知识起点和本地约束应成为显式 Context

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
