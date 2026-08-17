---
title: Combo / Agora 知识库表达迁移 Lint 报告
---

<!--
date: 2026-07-17
as_of: 2026-07-17
status: current
evidence_level: verified-structural-audit
source_session: 019f5c89-6aca-7523-9012-6fc58970a98b
tags: [combo, knowledge-base, lint, narrative-migration, fundraising]
related:
  - "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
  - "[combo-investor-learning-synthesis-2026-07-17](/output/reports/combo/fundraising/combo-investor-learning-synthesis-2026-07-17/)"
  - "[combo-startup](/wiki/maps/combo-startup/)"
  - "[agora-startup](/wiki/maps/agora-startup/)"
-->

# Combo / Agora 知识库表达迁移 Lint 报告

> 结论：本轮已把“Combo 是当前公司与产品；Agora 是长期平台机制与历史研究代号”落实为知识库的单一导航关系。审阅范围内没有剩余 P0 / P1 表达冲突；旧材料被保留，但不再与当前公司事实混写。

## 一、范围与证据

本轮综合：

- 融资整理会话 `019f5c89-6aca-7523-9012-6fc58970a98b`；
- WBJ、经纬、江远、蓝色光标、星连、真格六个对象共 207 条结构化问答；
- `active_context.md`、知识库入口、Combo 当前资料、Agora 54 份历史 / 长期研究文件；
- `wiki/maps/`、`wiki/concepts/`、`wiki/connections/` 的回流页面；
- 单位经济、数字标签、合规禁语、Wiki-links、YAML、标题、footer 与统计一致性。

`raw/` 继续作为 immutable source of truth，本轮没有修改任何 raw 文件。

## 二、迁移后的表达层级

| 层级 | 唯一口径 | 状态 |
|---|---|---|
| 当前公司 | Combo 帮助垂类创作者，把反复提供的专业服务变成可收费、可规模化交付的 AI 产品 | `current` |
| 当前产品阶段 | 带有平台期权的创作者变现工具；完整交易与履约体验仍待真实订单验证 | `current + mixed evidence` |
| 首轮验证 | AI 原生专业视觉创作者是测试候选；具体服务、共创名单、付费与复购尚未被证明 | `validation-plan` |
| 当前经济模型 | 订单级、创作者级实填模型；2%、15% 等是待验证输入 | `hypothesis` |
| Agora | Agent Capability Package、可验证交付、Context Network、event ledger 等长期机制与历史研究 | `supporting / historical / superseded / future-thesis` |
| 平台 | 只有跨创作者购买与 Context 复用、平台内生新增需求、结果改善路由三项同时出现后才成立 | `future-thesis` |

## 三、本轮修正的主要问题

### 1. 当前真源分裂

旧索引、Agora map、BP、财务模型、PKC / KAN / Agent-VM 材料曾同时使用“当前主线”“cornerstone”“正在做”等时态。现在：

- [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/) 是唯一当前公司表达真源；
- [combo-startup](/wiki/maps/combo-startup/) 是当前项目地图；
- `active_context.md` 只保留 Combo 当前优先级；
- [agora-startup](/wiki/maps/agora-startup/) 与 [README](/output/reports/agora/README/) 只作为长期 / 历史入口。

### 2. 平台终局被写成当前事实

旧材料中的 Marketplace、Feed、Context Network、event ledger 与网络效应已统一降级为条件式未来。Agent 数量、供给数量或页面形态不再被当作平台证据。

### 3. 产品方向与商业事实混写

“能力提取、Runtime、支付、退款、售后”现在被区分为目标产品机制与真实经营证据。知识库不再因为工程链路或产品架构存在，就推导完整交易体验、PMF 或壁垒已经成立。

### 4. 数字与单位经济口径混乱

- 修正 `300 × 8,000 = 240 万`、`100,000 × 2% = 2,000`；
- 2%、15%、点击率、粉丝变现额等统一标为 `assumption`；
- 区分平台抽成率 `t` 与创作者实际结算额，避免把 15% 同时写成两个相反方向的分成；
- 部分退款改用实际退款金额 `R`，不再用“退款订单比例”计算退款本金；
- 区分 `CM/GMV = CM$ ÷ G` 与平台 `CM% = CM$ ÷ Net Revenue`；
- 为 `B ≤ 0`、`G ≤ 0`、`Net Revenue ≤ 0` 增加 `N/A` 边界，避免除零和反向百分比；
- 补贴只在未进入用户实付或创作者结算额时另扣，避免双重扣减。

### 5. 历史状态不完整

Agora 文件夹现有 54 份 Markdown：

| 状态 | 数量 | 含义 |
|---|---:|---|
| `supporting` | 34 | 仍可引用的竞品、市场或机制研究 |
| `historical` | 17 | 已退出当前路线的产品、叙事、财务或 GTM 探索 |
| `superseded` | 1 | 已被 Combo 当前真源替代的旧 BP |
| `future-thesis` | 1 | 仅作为条件式未来使用的 Agent 世界研究 |
| README | 1 | 文件夹入口，不使用文档状态字段 |

Agora 文件夹内已无 `status: active` 或 `status: current`。深链进入旧文件时，也能看到历史 / 支撑说明或 `superseded_by`。

### 6. 索引和链接歧义

- `_index.md`、`_summaries.md`、根 README 与 `active_context.md` 已路由到 Combo；
- `[README](/README/)`、`[_index](/wiki/_index/)` 等重名链接已改成 path-qualified 链接；
- `agora-financial-model.md` 与同名 `.xlsx` 的链接已显式指定 Markdown 文件，避免 basename 歧义；
- 修复 Conversation Wiki Fusion 的异常 `111#` 标题，并为 Claude 观察卡补 H1。

## 四、新增的长期知识

- [creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/)：定义什么服务适合被产品化、谁付费、如何验证与升级真人；
- [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)：定义工具跃迁为平台的三个必要条件与停止平台叙事的反证；
- [combo-startup](/wiki/maps/combo-startup/)：把当前定位、目标产品机制、平台期权和 Agora 历史资产放进一张地图。

## 五、验证结果

最终验证应满足：

- 迁移审阅范围内的 `[[Wiki-links]]`：真实断链 0、歧义 0；
- YAML frontmatter：可解析错误 0；
- `git diff --check`：退出码 0；
- 新增未跟踪 Markdown 的 whitespace check：错误 0；
- malformed heading：0；
- `raw/` 改动：0；
- Wiki 状态：30 concepts / 9 maps / 9 connections / 106 output reports / 324 raw files；
- `_index.md`、`_summaries.md`、Combo README 与 `wiki/log.md` 均覆盖本轮新产物。

## 六、保留的低优先级结构债

以下是本轮前已存在、且不影响 Combo / Agora 语义迁移的格式债：

- `internet-content-capability-distribution-playbook-2026-06.md` 存在多个 H1；
- `gbrain-lessons-for-convo-wiki.md` 的代码示例包含额外 H1；
- 全库未来仍可增加自动化规则：禁止旧 Agora 文件重新出现 `status: active/current`，禁止未经标签的经营数字进入当前 Pitch。

## 七、仍需由业务数据回答的问题

Lint 能修复表达一致性，不能替代市场验证。当前仍未知：

1. 首轮视觉创作者候选能否产生 3–5 个真实上线产品；
2. “视觉作品诊断与改进包”是否明显优于免费通用模型；
3. 用户是否愿意真实付费、少退款并在 7/30 日复购；
4. 创作者是否获得有意义的增量收入并愿意发布第二个产品；
5. 在推理、工具、Sandbox、支付、退款、分成、补贴、支持与共创成本之后，贡献利润是否为正；
6. 数据授权、隐私删除、支付、结算与高风险品类边界能否形成稳定方案。

---
*由 LLM 按知识库 Query + Lint 流程生成；结论基于 2026-07-17 的工作区状态。*
