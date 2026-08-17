# YC 全量项目信息能否进入知识库？

> 生成时间：2026-07-25
> 查询：https://www.ychasit.com/ 我们能不能获取 YC 所有的项目信息，填充到知识库里？

## 摘要

**技术上可以完整枚举 YC 当前公开目录，但不应直接从 YC 或 YC Has It 批量抓取后灌库。** 2026-07-25 实测 YC 官网公开搜索索引有 **6,079 家公司**，其中 Active 4,201、Inactive 1,055、Acquired 800、Public 23；索引字段足以建立一个基础公司库。问题不在技术，而在数据授权：YC Terms of Use 明确禁止 scraping、data mining、robots 和类似自动提取；YC Has It 也只是覆盖 4,000+ Active 公司、按问题返回少量匹配结果的搜索产品，并非可下载的权威全量数据源。

建议把这件事拆成两步：先取得 YC 的书面授权，或选择一个能证明数据权利与 license 的数据集；再把全量记录作为 dated immutable snapshot 放入 `raw/`，只在 `wiki/` 编译生态地图、行业/批次统计和高价值公司概念，不生成 6,079 个 Markdown 页面。

## 已验证的公开数据规模

### YC 官方目录

2026-07-25 对 YC 官网页面实际使用的公开搜索索引做了只读、低频探测：

| 状态 | 记录数 |
|---|---:|
| Active | 4,201 |
| Inactive | 1,055 |
| Acquired | 800 |
| Public | 23 |
| **合计** | **6,079** |

索引当前可返回的核心字段包括：

- `id`、`name`、`slug`、`former_names`
- `website`、`small_logo_thumb_url`
- `one_liner`、`long_description`
- `team_size`、`all_locations`
- `industry`、`subindustry`、`industries`、`tags`
- `batch`、`launched_at`、`stage`、`status`
- `regions`、`isHiring`、`top_company`、`nonprofit`

单家公司公开页面还可能包含 founders、founder bios、launch posts、jobs、news、Primary Partner 和社交链接，但这些不都在目录搜索索引中。也就是说，“全部公司基础目录”和“每家公司页面上的全部公开信息”是两个不同规模、不同风险的采集任务。

### YC Has It

YC Has It 首页宣称可搜索 4,000+ YC startups。其公开 quick search 实测一次只返回 10 个匹配结果，字段主要是公司 ID、名称、one-liner、logo、website、YC URL、batch、tags、industries、stage、招聘状态和匹配分数。它适合“描述问题 → 找匹配公司”，不适合：

- 枚举全部公司；
- 证明记录完整性与更新时间；
- 作为 YC 全量目录的权威 provenance；
- 提供 founders、funding、收入、完整 launch、jobs、news 等所有页面信息。

它的 4,000+ 口径与 YC 官方索引的 4,201 家 Active 公司高度吻合，说明它大概率只是对 Active 子集建立了搜索与 embedding 层，而不是掌握一个比 YC 官方更完整的独立数据集。

## 为什么现在不直接抓

### 1. YC robots 不是授权

YC `robots.txt` 允许普通路径被 crawler 访问，但禁止带 query string 的 `/companies?*`。robots 只表达 crawler 路径偏好，不会覆盖网站 Terms of Use。

### 2. YC Terms 明确禁止自动提取

YC Terms of Use 明确写明，除非获得授权，用户不得 copy、scrape 或基于 Site / Site Content 创建衍生内容；并明确禁止 data mining、robots、scraping 或类似的数据收集与提取方法。因此：

- 公开可访问 ≠ 获得批量镜像许可；
- 浏览器里暴露搜索凭据 ≠ 获得下载或再分发许可；
- 技术上能按 batch 分区取完 6,079 条 ≠ 适合直接执行。

这只是对公开 Terms 的工程风险判断，不是法律意见。

### 3. 第三方数据集的 license 未必能清除上游风险

互联网上存在自称 CC0、Kaggle 或 GitHub 开源的 YC company datasets，但很多明确说明数据是从 YC Directory 程序化提取。数据集作者给出的 license 只在其确实拥有相应权利时有效，不能自动授予 YC Site Content 的权利；而且多数数据集存在时间滞后、字段缺失和更新链路不透明。

因此第三方数据集可作为候选 bootstrap source，但必须逐个做 provenance、license、时间、字段和记录数审计，不能看到 “CC0” 就直接认定风险已经消失。

## 推荐的数据获取路径

### 路径 A：向 YC 取得书面授权

这是最干净、可长期更新的路线。建议向 `yclegal@ycombinator.com` 说明：

- 用途是个人、非公开的研究知识库；
- 需要的字段、预计记录数和刷新频率；
- 是否仅保存事实字段，是否保存 long description、founder bios、logo；
- 不做联系人销售、cold outbound 或模型训练；
- 是否允许内部 embedding / semantic search；
- 是否允许在 GitHub private repo 保存快照。

授权里至少要确认：采集方式、字段范围、保存期限、刷新频率、内部检索、embedding、再分发和删除/纠错机制。

### 路径 B：使用可审计的授权数据集

若 YC 不授权，可选择有明确 license 的第三方 dataset，但只能在完成以下检查后进入 `raw/`：

1. license 文件与 dataset card 一致；
2. 数据生产者说明其来源和采集权利；
3. 记录数、更新时间、字段表与缺失率可验证；
4. 不包含私人邮箱、电话或非公开 founder data；
5. 能保留原始文件、checksum、下载时间和来源 URL；
6. 对“旧记录、失效公司、改名、重复公司”有明确处理。

当前看到的 CC0 Hugging Face 快照是 2025-08 版本，最多适合作为历史 bootstrap 候选，不能替代 2026-07-25 的官方 live state。

### 路径 C：只做按需研究，不建全量镜像

若目标只是提高产品研究效率，可以继续像当前知识库一样：

- 用户提出公司或赛道问题时，读取少量相关 YC 公司页面；
- 查询结果归档到 `output/reports/`；
- 只有长期稳定、被反复引用的模式回流 `wiki/`；
- 不保存 6,079 家公司的完整站点副本。

这条路线覆盖面较低，但数据更新、证据边界和维护成本更可控。

## 获得授权后的入库设计

### Raw 层：保存数据集，不生成 6,079 篇文章

建议结构：

```text
raw/datasets/yc-directory/
├── README.md
├── manifest.json
└── snapshots/
    └── 2026-07-25/
        ├── companies.jsonl
        ├── companies.parquet
        └── checksums.sha256
```

- `companies.jsonl`：可读、可 grep、可做 Git diff；
- `companies.parquet`：用于统计与批量查询；
- `manifest.json`：记录 source、license/permission、acquired_at、schema、row_count、status counts、field null rates、checksum；
- 每次更新写新 dated snapshot，旧 snapshot 不改，符合 `raw/` immutable 约束。

### Wiki 层：编译地图与可复用结论

不建议为每家公司创建 concept。更合理的是：

- `wiki/maps/yc-ecosystem.md`：batch、industry、status、region、stage 全景；
- 按长期研究需要增强现有 product / startup concepts；
- 只为高频被查询或形成独立机制的公司创建 concept；
- 在 `_index.md` 记录 dataset、最新 snapshot、更新日期和覆盖边界。

### Query 层：从结构化数据按需生成报告

查询时先在 JSONL / Parquet 做筛选，再回溯少量公司官网、YC profile 和 launch 原文。典型查询包括：

- 某 batch 的 AI Agent 公司有哪些？
- 某工作流是否已有 YC 公司在做？
- 同一问题在不同 batch 中如何演化？
- Active / Acquired / Inactive 的赛道分布有何差异？
- 哪些公司值得进一步做产品或投资 DD？

### 增量更新

每周或每月做一次 snapshot：

1. 保存新快照；
2. 用稳定 `id` 做 upsert/diff；
3. 记录 new、changed、status_changed、missing；
4. 不立即把 `missing` 判成删除，连续多个快照缺失后再标 tombstone；
5. 重编统计与 `wiki/maps/yc-ecosystem.md`；
6. 对 description、team size、status、website 的变化保留 provenance。

## 验收标准

获得授权后，建议用以下条件判断全量入库完成：

| 验收项 | 标准 |
|---|---|
| 数据权利 | permission / license 可审计 |
| 记录数 | 与获授权源当日总数一致 |
| 唯一性 | `id`、`slug` 唯一，重复公司有 merge rule |
| 状态分布 | 合计与 Active / Inactive / Acquired / Public 分项一致 |
| 字段质量 | required fields、null rate、URL、batch、status 通过 schema check |
| 可追溯 | 每条记录可回到 source URL 和 snapshot |
| 不可变性 | 旧 snapshot 不修改 |
| 可查询性 | 能按 batch / industry / status / region / keyword 检索 |
| 更新性 | 能生成增量 diff，不靠全库手工重写 |
| 隐私 | 不收集私人 email、phone 或非公开数据 |

## 最终判断

| 问题 | 判断 |
|---|---|
| 能否技术上获取 YC 全部公开公司基础信息 | **能，当前可验证为 6,079 条** |
| 能否从 YC Has It 直接导出全量 | **不能；它是 top-match 搜索层，不是 bulk dataset** |
| 能否现在直接从 YC 自动抓完灌库 | **不建议；与 YC 现行 Terms 明确冲突** |
| 最稳妥方案 | **先取得 YC 书面授权；否则只用权利清晰的数据集或按需研究** |
| 知识库最佳形态 | **raw 保存结构化快照，wiki 保存地图和长期概念，output 保存具体查询报告** |

## 数据来源

- [YC Startup Directory](https://www.ycombinator.com/companies)
- [YC Terms of Use / Legal](https://www.ycombinator.com/legal#tou)
- [YC robots.txt](https://www.ycombinator.com/robots.txt)
- [YC Has It](https://www.ychasit.com/)
- [YC Has It Terms](https://www.ychasit.com/terms)
- [YC Has It robots.txt](https://www.ychasit.com/robots.txt)
- [Product Hunt — YC Has It](https://www.producthunt.com/products/yc-has-it)
- [Hugging Face — yc-companies-august-2025](https://huggingface.co/datasets/jeffboudier/yc-companies-august-2025)

---
*由 LLM 从知识库查询生成*
