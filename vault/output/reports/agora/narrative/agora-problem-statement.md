<!--
status: supporting
status_reviewed: 2026-07-17
evidence_level: mechanism-hypothesis
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# Agora — Problem Statement v2

> [!warning] 状态说明（2026-07-17）
> 本文保留为“可验证交付 / verify 不了就 price 不了”的机制参考，不再是 Combo 当前公司的 Problem Statement。当前对外表达以 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/) 为准。

> 创业项目核心问题陈述。v2 收敛自 2026-06-20 与 Claude 的 problem-statement 讨论。
> 本文曾作为 Agora 平台叙事的 cornerstone；2026-07-17 起降级为长期交易信任机制参考。
> v1（讨论前的版本）见文末「与 v1 对照」。
> 模块归属：[agora-startup](/wiki/maps/agora-startup/) · 模块 1 核心叙事

---

## 一句话

**我们要解决的问题：为什么一个真实有效的 Agent / Skill 能力，创作者却赚不到钱？**

更精确地说，问题不在"创作者想变现"这个愿望，而在一条断裂的价值链：

> **买家在付钱前无法相信这个能力对自己有用 → 不敢付 → 创作者无法定价 → 赚不到钱。**

---

## 为什么 builder 通过自己的产物赚不到钱

"赚不到钱"是症状。拆开看是三个不同层的"坏掉"，它们需要不同的解法。把它们并列会让问题陈述失焦——好的 problem statement 要指出 **binding constraint（松开哪一条，钱就会流）**，而不是列清单。

### Layer 1 — 价值捕获坏了（可无限复制 → 无产权 → 无定价）

Skill 本身不能作为商品。它撞上一个**不可能三角**：

> 标准化 agent runtime × 客户端本地运行 × 源码保护，三者不可兼得。

只要能力在用户本地的标准 runtime 里跑，模型就必须读到它的 prompt / workflow / tool instruction；只要模型能读，用户就能通过 prompt injection、日志、session history、runtime 文件把它抽出来。加密只能提高摩擦，不能成为护城河。**一个能被 0 成本无限复制的东西，不具备作为商品的稀缺性与产权。**

→ 结论不是"能力卖不掉"，而是"**卖的单位不能是文件**"。（详见 [agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/)）

### Layer 2 — 市场触达坏了（能流畅使用 Skill 的人太少）

必须先是 Agent 用户，才能用 Skill——这本身是一个巨大的人群漏斗，大量用户被隔离在 agent 体系之外。即使能力是好的，可触达的买家池也太小。

### Layer 3 — 价值证明坏了（交付不可预期、不透明）★ binding constraint

作为高频 agent 用户，你实际上无法预判一个 skill 会给你带来什么增益。大多数情况是：

> skill 火了 → 点个 star → 有缘试一下 → 不太行 → 删掉。

付钱前无法验证结果，所以没人敢付，创作者也无法标价。

---

## 哪一层是 binding constraint

**是 Layer 3，不是看起来最"硬"的 Layer 1。**

最强的反证来自**开源软件**：代码是无限可复制的（Layer 1 对 OSS 永远成立），但整个 OSS 商业化行业（hosting / support / 验证 / 持续维护）赚到了钱。这证明：

> **"可复制"本身不是赚不到钱的根因——可复制的东西照样能变现，只要价值可证明 + 有持续服务。**

而 Layer 3 是定价的上游：**verify 不了的东西，price 不了**。它也不需要解开不可能三角就能单独攻——你不需要让文件不可复制，你需要让结果可信、增益可预判。这恰好接上能力包的 canonical tests，以及消费研究的判断：**reliability 而非 capability 才是护城河**（Gartner 预测 40% agent 项目会被取消；见 [consumer-ai-user-research-2026-06](/output/reports/agora/market-competition/consumer-ai-user-research-2026-06/) §13）。

三层与解法的对应：

| 层 | 坏掉的是 | 性质 | Agora 的处理 |
|---|---|---|---|
| Layer 1 | 价值捕获（可复制） | 机制 | 承认它，绕过它——卖 contract 不卖文件 |
| Layer 2 | 市场触达（人群漏斗） | 分发 | 先不强攻，服务高付费意愿的 agent 重度用户/创作者 |
| **Layer 3** | **价值证明（不可验证）** | **信任/信息** | **先攻点：可验证交付** |

---

## 认知翻转

> 不是"怎么让 skill 创作者赚到钱"，而是：
> **为什么买家在付钱前无法相信一个能力对自己有用？**
>
> 解决了这个，创作者自然能定价、复购、赚钱——哪怕能力本身可被复制（就像 OSS）。

这把原来并列的三点收成一条主线：Layer 1 决定了**卖的不是文件**；Layer 2 + Layer 3 合并成**"可信的能力-需求匹配"才是要 build 的东西**；而 Layer 3（可验证的交付）是先攻点。

---

## 所以我们 build 什么

一个让 Agent 能力可被**可信交付**的层：把创作者已经调通的 workflow，变成可安装、可验证（canonical tests）、可持续维护、可计费的能力交付——卖的不是文件，是"被验证能跑、且持续有人负责"的 outcome。这就是 **Agora**。

- **卖的单位**：capability contract（访问 / 更新 / 兼容 / 验证 / 支持 / 托管保护步骤 / 结算），不是 artifact
- **先攻点**：Layer 3 的"可验证交付"——install doctor + smoke / canonical tests + 失败归因，让买家在付钱前/试用时就能预判增益
- **护城河**：不是源码加密，是验证数据、runtime 兼容矩阵、更新渠道、event ledger 这些"复制文件拿不到的东西"

详见 [agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)（产品与 BP 主文）、[skill-creator-monetization-mvp-2026-05-17](/output/reports/agora/product/skill-creator-monetization-mvp-2026-05-17/)（变现 MVP）。

---

## 边界（我们暂时不解决什么）

- 不做"让非 agent 用户也能用"的普及化（Layer 2 的人群漏斗先不强攻）
- 不靠本地加密包防复制（承认 Layer 1，绕过它）
- 不做又一个通用 Agent Store / prompt 商店

---

## 与 v1 对照

| | v1（讨论前） | v2（本陈述） |
|---|---|---|
| 问题 | "怎么让 Skill 创作者赚到钱" | "为什么买家付钱前无法相信能力对自己有用" |
| 结构 | 两点并列（不可能三角 + 人群/体验） | 三层根因 + 指明 binding constraint |
| 首要矛盾 | 不可能三角（价值捕获，Layer 1） | 价值证明 / 可验证交付（Layer 3） |
| 对 Layer 1 的处理 | "skill 不能当商品" | "所以卖的不是文件"——用 OSS 反证：可复制 ≠ 卖不掉 |
| 高度 | 供给侧（帮 creator 赚钱） | 需求侧（可信的能力-需求匹配），creator 赚钱是结果 |

---

## 一段话版本（可直接用于 pitch 开场）

> 今天大量 builder 已经能用 Agent / Skill 调出真正有效的能力，却赚不到钱。表面原因是 skill 可被无限复制、没有产权——但开源软件证明，可复制的东西照样能变现。真正卡住的是：买家在付钱前无法相信一个能力对自己有用，于是 star 一下、试一下、删掉，没人敢付，创作者也无法定价。Agora 解决的就是这条断裂的价值链——把创作者调通的 workflow 变成可安装、可验证、可持续维护、可计费的能力交付。我们卖的不是文件，是"被验证能跑、且持续有人负责"的 outcome。

---
*由 LLM 从知识库 query 讨论（2026-06-20）合成；本文是 Agora 历史 cornerstone，现仅作为“可验证交付”机制参考。当前 pitch / BP / 投资人沟通以 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/) 为准。*
