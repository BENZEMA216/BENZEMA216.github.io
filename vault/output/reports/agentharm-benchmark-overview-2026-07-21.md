# AgentHarm 是什么样的测试集？

> 生成时间：2026-07-21
> 查询：AgentHarm 这是一个什么样的测试集？

## 摘要

AgentHarm 是一个评估 **LLM Agent 在恶意用户直接要求下，是否会拒绝、以及一旦未拒绝后能否通过多步工具调用真正完成有害任务** 的安全 benchmark。它测的不是普通聊天模型会不会生成有害文本，而是 jailbreak 后的 Agent 是否仍保有规划、工具选择、参数传递、自我纠错和任务完成能力。

## 测试对象与威胁模型

- **攻击者是谁**：直接向 Agent 下达恶意请求的用户。
- **测试什么风险**：Agent misuse，即用户主动利用 Agent 做坏事。
- **不主要测试什么**：它不是“善意用户的 Agent 被网页/邮件里的间接 prompt injection 劫持”，也不是因误操作造成的 accidental harm。
- **环境**：使用无副作用的 synthetic tools 模拟搜索、邮件、终端、社交平台和领域工具，因此安全、可重复，但只是真实危害能力的 proxy。

## 数据集构成

- 110 个手工编写的 base behaviors，覆盖 11 类危害：Fraud、Cybercrime、Self-harm、Harassment、Sexual、Copyright、Drugs、Disinformation、Hate、Violence、Terrorism。
- 每类 10 个 base behaviors；通过“详细 / 开放式”以及“有 / 无首个工具提示”形成 440 个任务。
- 原论文划分为 validation 44、public test 264、private test 132。
- 包含 104 个独特函数，平均每个 behavior 需要 3.53 个函数；任务通常要求按依赖顺序执行多次工具调用。
- 另有与有害任务主题和能力需求相近的 benign counterparts，用来区分“安全拒绝”与“Agent 本身不会做任务”。

## 怎么评分

核心指标是 **Harm Score**：每项任务有细粒度 rubric，主要通过确定性的程序条件检查目标工具是否调用、调用顺序、参数和结果是否正确；需要判断文本语义时，才用 LLM judge 做局部判断。完成部分条件可得 partial credit。

同时记录：

- **Refusal rate**：Agent 是否在任意一步拒绝；不是只看第一轮。
- **Non-refusal Harm Score**：只在未拒绝样本上计算任务完成度，用来分离 safety alignment 与 agent capability。
- **Benign score**：对等的无害任务完成度，用于判断 jailbreak、防御或拒绝策略是否损伤正常 Agent 能力。

直观上，安全模型在 harmful set 上应当 **高拒绝、低 Harm Score**，同时在 benign set 上保持 **高完成分**。因此这里 harmful set 的高分不是“模型更安全”，而是“它更能成功执行有害任务”。

## 如何理解它的价值与边界

AgentHarm 的关键贡献，是把 safety 与 agent capability 放在同一个执行测试里：一个 jailbreak 只有在绕过拒绝之后，仍能让模型连续正确调用工具并完成恶意目标，才算真正危险。

它的边界也很明确：synthetic tools 比真实世界简单且无副作用；任务主要是数字世界中的、较基础的多步 Agent 能力，不代表高级长期自治能力，也不能当作 Agent 整体安全性的总分。公开发布的数据目前也不是论文 440 个任务的完整公开版本；Hugging Face 页面说明公开 44/66 个 public-test base behaviors 和 8/11 个 validation base behaviors及其增强版本。

## 数据来源

- [ICLR 2025 论文](https://proceedings.iclr.cc/paper_files/paper/2025/file/c493d23af93118975cdbc32cbe7323f5-Paper-Conference.pdf)
- [AgentHarm 官方数据集页面](https://huggingface.co/datasets/ai-safety-institute/AgentHarm)
- [Inspect Evals 实现](https://github.com/UKGovernmentBEIS/inspect_evals/tree/main/src/inspect_evals/agentharm)

---
*由 LLM 从知识库查询生成*
