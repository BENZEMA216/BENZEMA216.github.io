# Alkera 与 DataAgentBench 产品分析

> 生成时间：2026-07-19
> 查询：Alkera 在做什么？YC Launch 中提到的 data benchmark 是什么？

## 摘要

Alkera 是面向 data engineer、analyst 和 data scientist 的专用 Agent。它不只生成 SQL，而是把数据库、dbt/Airflow、notebook 和远程计算环境接进同一个执行系统，并用 column-level lineage、团队知识库、权限和审批机制降低“代码能跑但数据语义已错”的风险。

YC 文中所说的 benchmark 是 UC Berkeley EPIC Data Lab 与 Hasura PromptQL 合作发布的 **DataAgentBench（DAB）**。它测的不是 spreadsheet 操作，也不只是 text-to-SQL，而是 Agent 能否在多个异构数据库中完成一条端到端数据问题：发现表和 schema、跨库查询、修复不一致 join key、从自由文本提取结构化字段、运用领域规则计算，最后返回可被确定性程序验证的答案。

## Alkera 在做什么

Alkera 的产品定位可以概括为：**把 coding agent 变成理解生产 data stack 的执行 Agent。**

- 通过 VS Code / Cursor、CLI 或浏览器使用。
- 连接 Snowflake、Databricks、BigQuery、PostgreSQL、DuckDB、dbt、Airflow 等数据系统。
- 建立跨系统、column-level lineage，在改字段或 transformation 前计算 downstream blast radius。
- 保存 schema docs、trusted queries、ownership 和团队口头约定，形成 human/agent verified 的 living knowledge base。
- 用 graph-based planning 和并行 Agent 执行分析、pipeline 构建、迁移、成本优化和故障定位。
- 对 SQL、bash 和 destructive action 加权限、审批、成本记录与 audit log，并支持 VPC/on-prem。

它真正售卖的不是“AI 会写 SQL”，而是 **data change 的 context + verification + governance**。

## DataAgentBench 具体测什么

DAB v1 包含 54 个自然语言问题、12 个数据集、9 个领域和 4 种 DBMS（PostgreSQL、MongoDB、SQLite、DuckDB）。每个数据集至少被拆到两个数据库中。领域包括新闻、电商书评、CRM、软件依赖与 GitHub、local business、音乐、股票、癌症研究和专利。

它集中制造四类生产数据难题：

1. **Multi-database integration**：同一问题必须查询和整合多个数据库，而非单库写一条 SQL。
2. **Ill-formatted key joins**：同一个实体在不同库中的 ID 有 prefix、空格、缩写或格式差异，Agent 要自己识别和归一化。
3. **Unstructured text transformation**：关键字段被藏在 description/details 等自由文本里，要先抽取成结构化值再过滤、聚合或 join。
4. **Domain knowledge**：例如计算股票波动率应使用 adjusted close；仅看 schema 无法知道正确业务规则。

一个典型题类似：两个数据库分别放 books 与 reviews；publisher、published date 被塞进 `details` 文本，两个表的 book ID 又分别变成 `bid` 与带 prefix 的 `bref`。Agent 要检查 schema、分别查询 PostgreSQL/SQLite、解析文本、修复 key、join、计算并输出指定答案。

运行时，Agent 在 ReAct loop 中获得数据库查询和 Python execution tools。答案不是由主观 LLM judge 打分，而是每个 query 用 `validate.py` 对照作者验证过的 deterministic ground truth。榜单要求每题跑 5 次并提交结果与 execution traces。

## 83.28% 应该怎么理解

截至 2026-07-16 的公开榜单，Alkera（Fable-5 + Claude Opus 4.8）为 0.8328 Pass@1；Alkera 的纯 Claude Opus 4.8 配置为 0.8044。这个分数按数据集先求每题通过率，再对数据集平均；不是“83.28% 的 SQL 语句正确”，而是一次运行得到最终正确答案的加权平均概率。

需要注意：榜首 Alkera 使用了 dataset hints，并使用了 **DAB-specific tuned prompt**。榜单明确把 tuned prompt 定义为研究过 DAB task conventions、domain rules、解析口径和答案格式的前置 prompt。因此 83.28% 是一个很强的 benchmark engineering 结果，但不能直接等价为“对任意陌生企业 data stack 有 83% 的生产可靠性”。它证明 Alkera 的 agent scaffold、工具使用和数据任务策略对这类题非常有效；生产可信度仍需看真实 lineage coverage、权限、验证、回滚及长期运行数据。

论文首版写“最佳 frontier model 38%”，而当前榜单更高，并不矛盾：论文比较的是早期通用 frontier-model baseline；动态榜单后来加入了更强模型和专用 data-agent systems，并允许 hints、tuned prompt 和多模型 scaffold。当前榜单重算后，Gemini-3-Pro baseline 为 45.46%，Alkera 为 83.28%。

## 判断

这个 benchmark 与 Alkera 的产品叙事只有部分重合。DAB 很好地测到了跨库发现、脏 key、文本抽取、领域计算和最终答案正确性，因此能证明 Alkera 不只是 SQL wrapper。但 DAB 主要是 **read/answer benchmark**，没有充分覆盖 Alkera 更重要的生产承诺：修改 dbt model 后的 downstream impact、pipeline migration equivalence、Airflow orchestration、成本控制、权限审批、destructive action 防护和长期 observability。

所以最准确的结论是：**DAB 证明了 Alkera 在复杂数据问答与异构数据整合上是当前最强的一批 Agent；它没有单独证明 Alkera 已经能够安全地自治维护生产 data stack。**

## 数据来源

- [YC Alkera company/launch page](https://www.ycombinator.com/companies/alkera-ai)
- [Alkera 官网与榜单声明](https://www.alkera.ai/)
- [DataAgentBench leaderboard 与代码](https://github.com/ucbepic/DataAgentBench)
- [DataAgentBench 论文](https://arxiv.org/abs/2603.20576)

---
*由 LLM 从知识库查询生成*
