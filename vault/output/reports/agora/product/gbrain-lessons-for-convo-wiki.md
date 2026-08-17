<!--
status: historical
status_reviewed: 2026-07-17
evidence_level: technical-reference
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# GBrain 经验吸纳 — 对 convo-wiki 的升级建议

> [!note] 历史技术参考
> 本文属于 convo-wiki 历史路线，不代表 Combo 当前产品定义。

> 来源: 实读 garrytan/gbrain repo (2026-04-11)
> 目的: 识别 GBrain 的优秀设计, 评估哪些值得吸纳进 convo-wiki

---

## TL;DR

GBrain 有 5 个设计决策值得直接学, 3 个不适合我们。

**学**:
1. Compiled Truth + Timeline 分离 (entity 级)
2. Dream Cycle (夜间自动整理)
3. Entity Detection on Every Message (持续 ingest)
4. Thin Harness, Fat Skills (架构哲学)
5. Diarization (读 50 文档写 1 页判断)

**不学**:
1. PGLite / Postgres 存储 (我们保持 markdown + git)
2. 向量嵌入搜索 (我们的规模不需要)
3. Supabase 远程部署 (我们本地优先)

---

## 1. 学: Compiled Truth + Timeline 分离

### GBrain 怎么做的

每个 entity (人/公司/deal/概念) 有一个 page, 包含两部分:

```
compiled_truth:  当前对这个 entity 的最佳理解 (每次有新信息就 REWRITE)
timeline:        append-only 证据链 (永不修改, 逆序排列)
```

关键规则:
- **compiled_truth 是 REWRITE, 不是 APPEND** — "当前最佳理解" 只有一份, 有新信息就覆盖
- **timeline 是 APPEND, 永不改** — 原始证据完整保留
- **同一个事件出现在所有相关 entity 的 timeline 上** — Alice 见了 Bob 在 Acme, 三个 page 都有这条

### convo-wiki 怎么吸纳

当前 convo-wiki 是 **flat entries** (286 个独立 .md 文件)。 没有 entity page。

**升级方案**: 给每个 wing 建一个 entity page, 包含 compiled truth + timeline:

```
wiki/wings/
├── life-compass/
│   ├── truth.md        ← "我对 life-compass 的当前理解" (REWRITE)
│   └── timeline.md     ← 所有跟 life-compass 相关的 entries 按时间排列 (APPEND)
├── agent-economy/
│   ├── truth.md
│   └── timeline.md
└── ...
```

**truth.md 示例**:
```markdown
# Life Compass — 当前状态

## 是什么
一个 Claude skill, 帮人找到人生理想。 Research-backed, 4 phase。

## 当前进度
spec 466 行 + plan 2294 行已 commit。 待执行。

## 核心设计决策
- 开放式 toolkit, 不要固定协议
- MLQ 原题直接用, 学术权威 > 法律规避
- 跟 superpowers skills 对比后补齐了 10 个缺陷

## 关联
- 跟 convo-wiki 有交叉: life-compass 的对话是 convo-wiki 第一个测试素材
- 跟"是否创业"有关: 做 life-compass 的动机是自己在找方向
```

**价值**: 以后问 "life-compass 现在什么状态?", 直接读 truth.md 就行, 不用扫 286 个 entry。

---

## 2. 学: Dream Cycle (夜间自动整理)

### GBrain 怎么做的

一个定时跑的 "大脑整理" 进程:
- 扫描最近的对话
- 丰富 entity pages (enrichment)
- 修复引用 (citation check)
- 合并重复 (dedup)
- 发现矛盾 (contradiction detection)
- "醒来时脑子更聪明"

### convo-wiki 怎么吸纳

我们的版本叫 **compile cycle**:

```
每日 / 每周自动运行:
1. SCAN:  检测新 session (增量, 不重跑已处理的)
2. EXTRACT:  从新 session 提取 attention moments
3. RECONCILE:  跨 session 降级 (decision → try, 基于后续证据)
4. COMPILE TRUTH:  更新所有 wing 的 truth.md (REWRITE)
5. SPOTLIGHT:  从全部 entries 筛出 Tier 1 (人生线) 精华
6. IDENTITY:  更新 identity/ 目录 (patterns / values / contradictions)
```

**这就是 fusion spec 里 Pipeline C 的实现**。 GBrain 叫 dream cycle, 我们叫 compile cycle, 本质一样。

---

## 3. 学: Entity Detection on Every Message

### GBrain 怎么做的

生产级 agent 在 **每条消息** 上都做 entity detection:
- 扫描消息, 找人名/公司名/概念
- 已有 page? 用 compiled truth 辅助回答, 有新信息则更新
- 没有 page? 评估 notability, 值得跟踪就创建
- **不阻塞对话** — entity detection 跟回答并行

### convo-wiki 怎么吸纳

当前 convo-wiki 是 **batch 模式** (跑一次 compile 处理所有 session)。 GBrain 的 insight 是 **实时 ingest**。

**升级路径**:
- v0.1: batch (当前)
- v0.2: daemon 模式 (chokidar 监听新 session 文件)
- v0.3: MCP server 模式 (其他 AI 工具通过 MCP 实时往 convo-wiki 写)

不急, 但方向对。

---

## 4. 学: Thin Harness, Fat Skills

### GBrain 怎么做的

Garry Tan 的核心哲学 (有完整 essay):

> **Thin harness**: CLI 只有 ~500 行 TS, 只做 4 件事 (跑模型循环 / 读写文件 / 管 context / 安全边界)
>
> **Fat skills**: 智能在 markdown skill 文件里, 不在代码里。 "Markdown is actually code."

7 个 skill:
- ingest: 把会议/文档/对话 ingest 进 brain
- query: 3 层搜索 + 合成回答
- maintain: 健康检查 (矛盾/过时/孤儿)
- enrich: 从外部 API 丰富 entity
- briefing: 每日简报
- migrate: 从 Obsidian/Notion/Logseq 迁移
- setup: 自动配置

### convo-wiki 怎么吸纳

当前 convo-wiki 的智能全在 `extract-prompt.mjs` 的 system prompt 里。 这其实已经是 "fat skill" 了, 只是没有分文件。

**升级方案**: 把提取逻辑拆成独立 skill 文件:

```
skills/
├── extract-attention.md    ← 从 session 提取 attention moments (当前 prompt)
├── compile-truth.md        ← 从 entries 编译 wing truth
├── reconcile.md            ← 跨 session 降级 decision → try
├── spotlight.md            ← 筛选 Tier 1 精华
├── identity.md             ← 提取人格模式
└── manifest.json
```

**价值**: skill 文件可以独立迭代, 不改代码。

---

## 5. 学: Diarization (读 N 写 1)

### GBrain 怎么做的

> "The model reads everything about a subject and writes a structured profile. Read 50 documents, produce 1 page of judgment."

这不是总结, 不是 RAG, 是 **判断**。 模型读完所有材料, 注意矛盾, 注意变化, 然后写一页结构化的 intelligence assessment。

### convo-wiki 怎么吸纳

这就是我们的 **identity layer**。 读完 286 个 attention moments → 写 1 页 portrait.md:

```markdown
# portrait.md — Dongzhe, 2026-04-11

## 行为模式
- 同时探索 5-7 条线, 快速 kill 大部分, 偶尔 commit
- explore 时说得像 decide, 实际大部分是 try
- "既然做就做到位" vs "mycat-meme 选砍" — 取舍标准取决于是否反复使用

## 核心信念
- Agent-friendly 设计 > 固定流程
- Shopify 式低抽成 > 收税模式
- 真 agent 形态 > 加了 AI 功能的 app
- 学术严谨 > 法律规避

## 当前状态
- 从字节跳槽去 HK (另一家公司, 非字节 HK)
- "是否创业" 仍是 open-loop
- 48 天探索了 12 个方向, 2 个还在活跃

## 矛盾
- 说"已经决定创业" 但又纠结
- 有时 all-in ("全都补吧") 有时砍 (mycat-meme)
- 想做大事 (agent 经济) 但每次竞品研究都发现有人先到
```

GBrain 叫 diarization, 我们叫 identity extraction, 但方法一样: **读 N 写 1, 写判断不是写总结**。

---

## 6-8. 不学的 3 件事

### 6. 不学: PGLite / Postgres

GBrain 用嵌入式 Postgres (PGLite via WASM)。 我们保持 **markdown + git**, 因为:
- 286 entries 不需要数据库
- Markdown 是 Obsidian 原生格式
- Git 给版本历史
- 简单

如果未来 entries 超过 5000, 再考虑 SQLite FTS5。

### 7. 不学: 向量嵌入

GBrain 用 `text-embedding-3-large` 做语义搜索。 我们不需要, 因为:
- ripgrep 对 286 个 markdown 文件搜索 < 100ms
- 我们的产品是"人读", 不是"AI 语义检索"
- 引入 embedding 需要 OpenAI API key, 破坏"本地优先 + 零依赖"

### 8. 不学: Supabase 远程部署

GBrain 支持 Supabase 远程。 我们保持本地, cloud 是远期。

---

## 执行优先级

如果要从 GBrain 吸纳, 按这个顺序:

| 优先级 | 要吸纳的 | 工作量 | 效果 |
|--------|---------|--------|------|
| **P0** | Compiled Truth per wing | 1 天 | 解决"286 条 flat entries 没重点"的问题 |
| **P0** | Spotlight / Tier 分级 | 半天 | 解决"人不知道看哪些"的问题 |
| **P1** | Skill 文件拆分 | 半天 | 提取逻辑可独立迭代 |
| **P1** | Identity / Diarization | 1 天 | 产出 portrait.md |
| **P2** | Dream / Compile Cycle | 1-2 天 | 增量 + 定时 |
| **P3** | Entity Detection 实时 | 远期 | daemon / MCP |

---

## 一句话

> **GBrain 是给 AI 用的 entity graph + 智能检索。 convo-wiki 是给人用的 narrative wiki + 行动轨迹。**
>
> **两者的重叠在 "compiled truth" 和 "dream cycle" 这两个 pattern 上。 这两个是 GBrain 的精华, 也是 convo-wiki 下一步最应该做的事。**
>
> **其他的 (Postgres / embedding / Supabase) 是 GBrain 为投资人场景优化的, 跟我们无关。**

---
*2026-04-11 · 从 garrytan/gbrain repo 实读 code 后整理*
