<!--
status: historical
status_reviewed: 2026-07-17
evidence_level: product-spec
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# Conversation Wiki Fusion — 产品文档 v2

> [!note] 历史产品探索
> 本文保留 Conversation Wiki Fusion 的产品实验，不是 Combo 当前产品定义。

> 来源: 知识库 Query 讨论 (2026-04-09, 继承 04-08 的 v1 spec)
> 状态: v1 spec (`conversation-wiki-compiler-product-spec.md`) 之后, 经过 v0.0.1 → v0.0.4 四次实跑验证, 融合 MemPalace 与 AK LLM Wiki 的产品重构
> 前身: `conversation-wiki-compiler-product-spec.md` (04-08) + v0.0.1-0.0.4 原型 (04-08 夜)
> 关键评判: 这个 spec 代表从 "convo-wiki 一个小工具" 升级到 "**个人记忆 + 知识 + 身份 统一基础设施**" 的产品转向
> 决定点: 读完 spec 之后, 24 小时内决定 build / 不 build / 继续调方向

---

## 一、TL;DR

> **一个本地跑的个人知识系统, 把你所有 AI 对话 + 已读材料 + 笔记, 自动 compile 成 Karpathy 式 LLM Wiki, 同时自动提取你的行动轨迹和身份画像。**
>
> 融合 MemPalace 的 "auto-capture + perfect fidelity" 和 AK LLM Wiki 的 "LLM-compiled + human-curated" 两侧优点, 开创新品类。

英文版:

> **A local-first personal knowledge system that auto-captures all your AI conversations, compiles them into a Karpathy-style LLM Wiki alongside your articles and notes, and continuously extracts your action trajectory and identity portrait.**

---

## 二、Problem

### 2.1 用户实测数据 (2026-04-08 扫描)

| 位置 | 数量 | 状态 |
|------|------|------|
| `~/.claude/projects/` | **246 个 JSONL 会话**, 178 MB | 完全未组织 |
| `~/.codex/sessions/` | 148 文件, 82 MB | 完全未组织 |
| `~/.cursor/` | 7,852 文件, 343 MB | 完全未组织 |
| `~/.gemini/` | 627 文件, 66 MB | 完全未组织 |
| `~/.openclaw/memory/` | **2.7 GB** | 黑洞 |
| `~/.qclaw/qmemory/` | 26 MB | 黑洞 |
| 散落 `CLAUDE.md` / `AGENTS.md` | 17 份 | 互相重复/矛盾 |
| Obsidian vaults | **5 个独立 vault** | 互相孤立 |
| BENZEMA 主 vault | 362 MB | 已部分 AK 化 |

**翻译**: 用户过去几个月的思考、决策、探索, 散落在 **50+ 个位置**, 跨 **6 个 AI 工具**, **没有任何一处能给出完整视图**。

### 2.2 v0.0.1-0.0.4 原型验证的真实发现

2026-04-08 夜间的 4 版原型跑出来的关键数据:

| 发现                                     | 证据                                                                      |
| -------------------------------------- | ----------------------------------------------------------------------- |
| **用户忘记自己几小时前的讨论**                      | 04-08 上午 459 KB life-compass session 产出 3 个高质量 concept, 下午用户完全不记得       |
| **Agent 能可靠提取 AK pattern 质量的 concept** | v0.0.1 跑 1 个 session 产出 3 个 concept, 逐条核对都是 verbatim quote              |
| **用户 vs Agent 的 attention 是两套记忆**      | v0.0.2 pivot 到 user-attention 模式, 产出质量远超 v0.0.1                         |
| **人的"决定"大部分是 try, 不是 commitment**      | v0.0.3 有 13 个 decision, v0.0.4 严格化后只剩 3 个 decision + 7 个 try, 跟用户事实完全对齐 |
| **Agent 能做跨 session 模式识别 (emergent)**  | 在分析 "全都补吧" 时, 自动对比了用户之前的 "mycat-meme 选择砍" 决策                            |

**最重要的 meta 发现**: 用户和 agent 的 reaction —— 看到自己过去的讨论时的"我晕了, 这个都没印象" —— 证明了产品的核心价值 (帮人看见自己的 memory amnesia) 在最强烈的形式下可以 trigger。

### 2.3 现有方案 (18+ 竞品) 的系统性缺陷

详见 `portable-identity-competitive-research.md` + `personal-knowledge-card-competitive-research.md`。 本 spec 加入 **MemPalace** 的深入分析。

#### 现有方案的 5 种短板

| 类型                          | 代表                                                                     | 短板                                     |
| --------------------------- | ---------------------------------------------------------------------- | -------------------------------------- |
| **Viewer / Search**         | jhlee0409/claude-code-history-viewer (875⭐), CASS (652⭐), spool (269⭐) | 只让你**浏览** raw, 不 compile 成可读 artifact  |
| **Identity Card**           | Epitome (5.5/6), limitless-ai.dev (5/6)                                | 让用户**填表**, 没有 auto-capture, 没有 compile |
| **Memory Infra**            | Mem0, Letta, OpenMemory MCP                                            | 存 flat memory, 不 compile, 面向 AI 不面向人   |
| **LLM Wiki**                | sage-wiki (215⭐)                                                       | 输入是文章, **不处理对话**, 手动 ingest            |
| **MemPalace** (最新, 实读 code) | milla-jovovich/mempalace                                               | ChromaDB + regex 提取, **给 AI 调用, 人读不了** |

**没有任何竞品同时做对以下 5 件事**:

1. **Auto-capture**: 自动捕捉所有 AI 对话 + 已有笔记 + 文章
2. **Perfect fidelity**: raw 层完整保留, 不丢信息
3. **LLM compile**: 从 raw 编译出结构化的 concepts / trajectory / identity
4. **Human readable**: 输出是 markdown, 人可读可 curate
5. **AI addressable**: 通过 MCP 暴露, 任何 AI 可调用

融合产品在这 5 维上全部命中。

---

## 三、Fusion Insight

### 3.1 两个系统的短板是互补的

| 问题            | MemPalace 解法                          | AK LLM Wiki 解法                           |
| ------------- | ------------------------------------- | ---------------------------------------- |
| 如何存海量对话?      | ✅ ChromaDB + wings/rooms metadata     | ❌ 只支持 markdown 文件, 不扩展                   |
| 如何自动捕捉?       | ✅ `convo_miner` 扫所有对话 export          | ❌ 全手动                                    |
| 如何 LLM 编译?    | ❌ 纯 regex 提取, 无 LLM                   | ✅ LLM 从 raw 编译 wiki                      |
| 如何让人读?        | ❌ 输出是向量搜索结果                           | ✅ concepts / maps / connections markdown |
| 如何做 curation? | ❌ 无 edit 流程                           | ✅ git + obsidian                         |
| 跨 session 叙事? | ❌ 每条 chunk 独立                         | ✅ connections/ 连接多个源                     |
| AI 调用?        | ✅ MCP (19 tools) + 4 层 context loader | ⚠️ 需要额外的 MCP 层 (如 wiki-mcp-server)       |
|               |                                       |                                          |

**融合之后两边的短板都被堵上**, 产生一个**没有任何现有系统能做到**的东西。

### 3.2 融合不是 "两个 repo 相加"

是: **抽取两个系统各自擅长的部分, 在新架构里 reorganize**:

- 从 MemPalace 抽: `auto-capture + perfect fidelity storage + wings metadata`
- 从 AK LLM Wiki 抽: `raw/wiki/output three-layer + LLM compile + human curation`
- 从 convo-wiki v0.0.4 抽: `first-person trajectory extraction (decision/try/milestone/aha/open-loop/position/work)`
- 全新加: `identity layer (pattern recognition across everything)`

---

## 四、产品架构

### 4.1 三层数据流

```
┌─────────────────────────────────────────────────────────────┐
│ INPUTS                                                       │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌───────────┐ │
│  │ AI 对话    │ │ 文章/论文  │ │ 笔记/博客  │ │ 代码/PRs  │ │
│  │ (自动)     │ │ (手动)     │ │ (手动)     │ │ (自动)    │ │
│  └──────┬─────┘ └──────┬─────┘ └──────┬─────┘ └─────┬─────┘ │
└─────────┼──────────────┼──────────────┼─────────────┼───────┘
          │              │              │             │
          ▼              ▼              ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1 — raw/ (perfect fidelity, auto-captured)            │
│                                                              │
│  raw/                                                        │
│  ├── conversations/                                          │
│  │   ├── claude/2026-04-09/{session-id}.md                   │
│  │   ├── codex/                                              │
│  │   ├── cursor/                                             │
│  │   ├── gemini/                                             │
│  │   └── openclaw/                                           │
│  ├── articles/                                               │
│  ├── papers/                                                 │
│  ├── projects/                                               │
│  └── .palace/                                                │
│      ├── sessions.json   (id, date, source, wings, summary)  │
│      ├── wings.json      (entity → [session-ids])            │
│      ├── entities.json   (people, projects, topics)          │
│      ├── timeline.json   (chronological view)                │
│      └── search.db       (optional: SQLite FTS5)             │
└─────────┬───────────────────────────────────────────────────┘
          │ LLM compile
          ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2 — wiki/ (compiled, human-readable, curatable)      │
│                                                              │
│  wiki/                                                       │
│  ├── concepts/         ← AK: 从 raw 编译的 durable concepts  │
│  ├── maps/             ← AK: 主题地图                        │
│  ├── connections/      ← AK: 跨域连接                        │
│  │                                                           │
│  ├── trajectory/       ← 新: 第一人称行动路线                │
│  │   ├── decision/     ← 严格: 有 follow-through 的 commit   │
│  │   ├── try/          ← 探索, 试错, trial balloon           │
│  │   ├── milestone/    ← 已完成                              │
│  │   ├── aha/          ← 认知更新                            │
│  │   ├── open-loop/    ← 还在 chew                           │
│  │   ├── position/     ← 主动表达的立场                      │
│  │   └── work/         ← 当前 in-progress                    │
│  │                                                           │
│  ├── identity/         ← 新: "我是谁" portrait               │
│  │   ├── patterns.md       (反复的行为模式)                  │
│  │   ├── values.md         (持有的价值观)                    │
│  │   ├── contradictions.md (自己不一致的地方)                │
│  │   ├── style.md          (工作 / 表达风格)                 │
│  │   └── portrait.md       (一页纸 composite)                │
│  │                                                           │
│  ├── wings/            ← 交叉视图: per-project/person/topic  │
│  │   ├── life-compass/                                       │
│  │   │   ├── timeline.md                                     │
│  │   │   ├── state.md                                        │
│  │   │   └── sessions.md                                     │
│  │   └── ...                                                 │
│  │                                                           │
│  ├── log.md            ← AK: append-only 时间线              │
│  ├── _index.md         ← AK: by-domain 导航                  │
│  └── _summaries.md     ← AK: 一行摘要                        │
└─────────┬───────────────────────────────────────────────────┘
          │ query
          ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3 — output/ (query outputs, ephemeral or archived)    │
│                                                              │
│  output/                                                     │
│  ├── reports/          ← AK: 深度研究归档                    │
│  ├── slides/           ← AK: Marp                            │
│  └── answers/          ← 新: daily/weekly review 输出        │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 4 个核心 pipeline

#### Pipeline A — Capture (daemon)
```
文件监听 (~/.claude/projects, ~/.codex/sessions, etc.)
  ↓
新文件/修改 → parse → clean → 写 raw/conversations/{source}/{date}/{id}.md
  ↓
update .palace/sessions.json (加 session metadata + wing tags + 1-para summary)
```

**LLM 调用**: 只在 summarize 那一步, 每个 session 1 次 (~1s, 非常便宜)。

#### Pipeline B — Compile (scheduled / on-demand)
```
扫描 raw/ + sessions.json
  ↓
对未编译的新 raw: agent 决定它属于哪种 output
  - 有论文/文章 → wiki/concepts/
  - 有对话 → wiki/trajectory/ (attention moments)
  - 有跨源 pattern → wiki/connections/
  ↓
写入 wiki/, 更新 log.md / _index.md / _summaries.md
```

**LLM 调用**: 每个 raw 源 1-5 次。 可以 batch 或增量。

#### Pipeline C — Identity (periodic, weekly)
```
扫描 wiki/trajectory/ + wiki/concepts/ + wiki/positions/
  ↓
agent 从 aggregate 中找 recurring patterns
  ↓
写入 wiki/identity/
```

**LLM 调用**: 每周一次, 读全部 aggregate 一次。

#### Pipeline D — Query (interactive)
```
用户通过 MCP 调用 / 直接打开 obsidian
  ↓
从 wiki/ 读 compiled artifact
  ↓
如果需要 raw, 用 .palace/search.db 快速定位
  ↓
返回结果, 可选 archive 到 output/
```

---

## 五、What each layer does

### 5.1 Layer 1 — raw/ (perfect fidelity)

**原则**: 每一条对话, 每一篇文章, 都完整保留。 不删, 不改, 不丢。 AK 原味的 immutability。

**输入源**:
- `~/.claude/projects/*.jsonl` → `raw/conversations/claude/`
- `~/.codex/sessions/**/*.jsonl` → `raw/conversations/codex/`
- `~/.cursor/` → `raw/conversations/cursor/`
- `~/.gemini/` → `raw/conversations/gemini/`
- `~/.openclaw/memory/` → `raw/conversations/openclaw/`
- 手动添加的 pdf/md/url → `raw/articles/`, `raw/papers/`
- Obsidian vaults → 可选 sync

**格式**: 全部 markdown (方便 grep / git / obsidian)。 附加 `.palace/sessions.json` 作为 metadata index。

**搜索**: 默认 ripgrep + grep。 大规模时可选 SQLite FTS5 (v0.3+)。

### 5.2 Layer 2 — wiki/ (compiled)

#### 5.2.1 concepts/ (原 AK)
- 输入: raw/articles, raw/papers, 或多个 raw/conversations 的 intersection
- 输出: 1 篇 concept = 1 个可复用的概念 / mental model / framework
- 例子: "Sync handle / async future 模式", "Empty Layer 哲学", "AK LLM Wiki 三层架构"

#### 5.2.2 trajectory/ (convo-wiki v0.0.4 继承)
- 输入: raw/conversations
- 输出: 第一人称 attention moment
- 7 个 type: decision / try / milestone / aha / open-loop / position / work
- 每条带 wings tag + emotion + 原话 quote + "对未来的我意味着什么"

#### 5.2.3 identity/ (新)
- 输入: wiki/trajectory + wiki/concepts + wiki/positions (聚合)
- 输出: "我是谁" 的 portrait
- 示例文件:
  - `patterns.md`: "我是那种 explore 时说得像 decide 的人" (证据: v0.0.4 的 7 个 try 被降级)
  - `values.md`: "我一致拒绝固定流程, 偏好 agent-friendly 开放 toolkit" (证据: life-compass + lark-cli + agent-deck 三个 session 都体现)
  - `contradictions.md`: "mycat-meme 我选砍, life-compass 我选全补 — 取舍标准不一致"
  - `portrait.md`: 一页纸 composite, 包含角色/项目/人物/风格

#### 5.2.4 wings/ (交叉视图)
- 每个项目 / 人物 / 主题一个目录
- 汇总该 wing 的所有 raw + trajectory + concepts
- 动态生成 timeline + state

#### 5.2.5 connections/ (原 AK)
- 跨领域的发现
- 例子: "AK LLM Wiki 和 MemPalace 是互补的, 不是竞品"
- 例子: "kosong 的 Empty Layer 哲学与 Anthropic 的 'less is more' 指令对齐"

#### 5.2.6 log.md / _index.md / _summaries.md (原 AK)
- 保留 AK 原味的时间线 / 导航 / 摘要

### 5.3 Layer 3 — output/ (ephemeral)

保留 AK 的 output/reports/ 作为 query 归档。 新增:
- `output/answers/`: daily/weekly review 的 structured 回答
- `output/reviews/`: weekly 自省报告

---

## 六、Differentiation vs all 19 competitors

| # | 产品 | auto-capture | perfect fidelity | LLM compile | human readable | AI addressable | 多源 | 第一人称叙事 | identity portrait |
|---|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | jhlee0409/claude-code-history-viewer | ✅ | ✅ | ❌ | ⚠️ viewer | ❌ | ✅ | ❌ | ❌ |
| 2 | CASS (Dicklesworthstone) | ✅ | ✅ | ❌ | ⚠️ TUI | ❌ | ✅ | ❌ | ❌ |
| 3 | spool | ✅ | ✅ | ❌ | ⚠️ | ❌ | ✅ | ❌ | ❌ |
| 4 | **MemPalace** | ✅ | ✅ | ❌ (regex) | ❌ | ✅ (MCP) | ⚠️ | ❌ | ⚠️ (manual L0) |
| 5 | Epitome | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ⚠️ (user fill) |
| 6 | limitless-ai.dev | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ⚠️ |
| 7 | Mem0 OpenMemory | ✅ | ⚠️ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| 8 | Letta | ⚠️ | ⚠️ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| 9 | sage-wiki | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 10 | alanagoyal/mcp | ⚠️ blog only | ✅ | ⚠️ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 11 | Pieces LTM-2 | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| 12 | Claude Projects / CLAUDE.md | ❌ | ❌ | ❌ | ⚠️ | ⚠️ (locked) | ❌ | ❌ | ❌ |
| 13 | openmnemo | ✅ | ✅ | ⚠️ summary | ✅ | ⚠️ | ✅ | ❌ | ❌ |
| 14 | POWDER-RANGER/contextual-memory-ui | ⚠️ | ✅ | ❌ | ✅ graph | ❌ | ✅ | ❌ | ❌ |
| 15 | Obsidian + Smart Connections | ❌ | ✅ | ⚠️ RAG | ✅ | ✅ | ❌ | ❌ | ❌ |
| 16 | Khoj | ⚠️ | ✅ | ❌ | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| 17 | Heirloom | ? | ? | ? | ? | ? | ? | ? | ? |
| 18 | Plurality Network | ❌ | ❌ | ❌ | ✅ | ⚠️ | ❌ | ❌ | ⚠️ |
| 19 | Anthropic Claude Import Memory | ❌ | ❌ | ❌ | ⚠️ | ⚠️ (vendor-locked) | ❌ | ❌ | ❌ |
| **★** | **融合产品 (本 spec)** | **✅** | **✅** | **✅ LLM** | **✅** | **✅** | **✅** | **✅** | **✅** |

**8 个维度全命中的只有融合产品**。 这是 0 竞品 position。

---

## 七、Anti-Product

明确**拒绝**以下定位:

| 拒绝的定位 | 为什么 |
|-----------|--------|
| AI 的 memory 基础设施 (像 Mem0 / Letta) | 我们优先给**人**用, AI 是 beneficiary |
| 手动 identity card (像 Epitome) | 违反 auto-capture 原则 |
| 向量搜索引擎 (像 MemPalace) | 我们输出 compiled artifact, 不是 search result |
| Obsidian 的 AI 插件 | 我们是独立 stack, 可以跟 Obsidian 配合但不依赖 |
| 面向企业 / 团队 | 严格 single-user, privacy-first |
| 跨厂商 memory 导入 | Anthropic 已经在做, 不要正面竞争 |
| knowledge agent network | 太抽象, 不是 v0.1 |

---

## 八、Architecture (tech stack)

### 8.1 v0.1 技术选型

| 组件 | 选择 | 理由 |
|------|------|------|
| 运行时 | **Node.js 22+** | 承接 convo-wiki v0.0.4 + wiki-mcp-server 现有代码 |
| 输出格式 | Markdown + JSON | git-friendly, obsidian-compatible |
| 存储 | 文件系统 | 150-500 个 session 这个量级足够 |
| 搜索 | **ripgrep** + 简单 JSON index | 不需要向量库 |
| 元数据 | `.palace/*.json` | 简单 enough, 版本化可能 |
| LLM 调用 | `claude -p sonnet` subprocess | 免 API key, 借用 Claude Code session |
| 文件监听 | `chokidar` (v0.2+ daemon 模式) | 成熟 |
| MCP server | `@modelcontextprotocol/sdk` | 复用 wiki-mcp-server 的实现 |

### 8.2 明确拒绝的依赖

| 拒绝 | 理由 |
|------|------|
| Python / ChromaDB / embedding | 单栈 Node 保持简单, 规模不需要向量库 |
| 数据库 (PostgreSQL / SQLite) | 文件系统 + JSON 足够 v0.1 |
| 任何 SaaS | 本地优先 |
| 用户账户系统 | 单用户 |
| 订阅 / 付费 | v0.1 OSS, 商业化远期 |

### 8.3 v0.3+ 可选升级

- SQLite FTS5 (如果 ripgrep 慢了)
- 轻量向量 (如果需要语义搜索, 考虑 `sqlite-vec`)
- Web UI (daemon 模式下的浏览器)
- MCP 暴露 (复用 wiki-mcp-server)

---

## 九、Roadmap (revised)

### v0.1.0 — 3 layer skeleton (1 周)

**目标**: 跑通三层, 一次性 batch, 不做 daemon。

- ✅ **Layer 1 scanner**: Claude + Codex + Gemini (其他工具 v0.2 再加)
- ✅ **Layer 1 storage**: `raw/conversations/{source}/` + `.palace/sessions.json`
- ✅ **Layer 1 summarize**: 每 session 1 次 LLM 调用 (wings + 1-para)
- ✅ **Layer 2 concepts**: 从 raw/articles 编译 (继承 AK pattern, 已 verified)
- ✅ **Layer 2 trajectory**: 复用 convo-wiki v0.0.4 提取
- ✅ **Layer 2 log/index/summaries**: 继承 AK
- ⬜ Layer 3 (output/): 暂不实现, 保留目录
- ✅ **CLI**: `wiki compile`, `wiki status`
- ✅ **Viewer**: 复用 convo-wiki viewer, 加 wings filter + full search

### v0.2.0 — Identity layer + daemon (1 周)

- ✅ **identity/ 生成**: patterns / values / contradictions / portrait (weekly 运行)
- ✅ **Daemon 模式**: chokidar 监听 + 增量 compile
- ✅ **wings/ 交叉视图**: per-project timeline + state
- ✅ **Cross-session reconciliation**: decision → try 降级基于后续 session 证据
- ✅ **Obsidian 兼容**: 确保 wiki/ 目录可作为 Obsidian vault 打开

### v0.3.0 — MCP + query layer (1 周)

- ✅ 复用 wiki-mcp-server, 暴露整个 wiki/ 给任意 AI 客户端
- ✅ `output/answers/` daily review 自动生成
- ✅ Before/After demo: 同一问题接不接 wiki 的回答对比
- ✅ 更多 scanner: Cursor / openclaw / qclaw

### v0.4.0 — Distribution ready (1 周)

- ✅ 一行安装 (类似 wiki-mcp-server 的 `curl | bash`)
- ✅ 2-minute demo 视频
- ✅ Landing page
- ✅ GitHub README 完整化
- ✅ 第一波 ship: 即刻 / X / Reddit / HN

**总时间**: **4 周** (v0.1 → v0.4), 不是 18 个月。

---

## 十、Naming

**现用候选名**:

| 候选 | 优点 | 缺点 |
|------|------|------|
| **convo-wiki** (当前) | 清晰, 直接, 已用 | 只描述 conversations, 不 cover articles/papers |
| **personal-wiki** | 更通用 | 太 generic |
| **wiki.me** | 简洁, brandable | 可能域名被占 |
| **mywiki** | 简洁 | 太 generic |
| **codex** | 古典知识感 | OpenAI Codex 冲突 |
| **autobio** | "auto-biography" | 有点抽象 |
| **karpedia** | Karpathy + encyclopedia | 可能 Karpathy 本人介意 |
| **wikime** | contraction | 发音歧义 |
| **llm-wiki** | 继承 Karpathy 命名 | 太 generic, 没品牌 |
| **BENZEMA-wiki** | 个人品牌 | 不 generalize 给其他用户 |
| **rear-view** | 回看, 后视镜 | 偏 metaphor |
| **日志 / richu** | 中文原生 | 英文受众不友好 |

**我的建议**: 暂用 **convo-wiki** 不换, v0.1 ship 之前再决定。 过早命名会锁死范围。

---

## 十一、Risks (revised)

### 11.1 技术 risk (已降)

| Risk | 状态 |
|------|------|
| Agent compile 质量 | ✅ v0.0.1-0.0.4 验证, 8-9 分稳定 |
| LLM API 成本 | ✅ 用 claude -p, 免 key |
| jsonl schema 变化 | ⚠️ scanners 模块化, schema 变时 fail loud |
| PII / 敏感信息 | ✅ 本地, 永不上传 |
| 规模 (1000+ sessions) | ⚠️ ripgrep 够用到 ~500 sessions, 之后考虑 FTS5 |

### 11.2 市场 risk

| Risk | 缓解 |
|------|------|
| Anthropic `/memory-import` | 他们做 flat memory, 不做 compiled wiki |
| MemPalace 加 LLM compile 层 | 他们优化 AI context loading, 不是 human narrative |
| jhlee0409 / CASS pivot 到 prosumer | OSS dev tool 作者不会做 prosumer UX |
| 一个 funded startup 进场 | 需持续观察, 90 天 check-in |

### 11.3 个人 risk

| Risk | 状态 |
|------|------|
| 第 7 次 pivot | ⚠️ 如果这次还想 pivot, 停下来 30 天再说 |
| build → distribution gap | v0.4 强制带 launch checklist |
| 18 个月承诺过重 | ✅ 新 roadmap 只要 4 周 |
| 信心源只来自用户自己 | ⚠️ v0.1 ship 后 14 天内必须 onboard 5 个真实 user |

---

## 十二、Validation Plan (48 小时内必须完成)

这次**不要跳过 validation**。 spec 再好, 没数据支撑不立项。

### 12.1 Experiment 1 — 技术可行性 (已完成 ✅)

v0.0.1-0.0.4 原型已经证明:
- Agent 能 produce 8-9 分质量的 concept/trajectory
- 跨 session pattern recognition 是 emergent 的
- Strict decision / try 分类用户能接受

### 12.2 Experiment 2 — Demand validation (24 小时)

**操作**:
1. 写 1 页 landing (复用 convo-wiki viewer 的审美)
2. Hero: "Stop forgetting what you learned from AI. Your conversations, compiled into a personal wiki."
3. 一个 email 框, "Get notified when v0.1 ships"
4. 发即刻 + X 各一次

**成功指标**: 24 小时 ≥50 个 email sign-up
**失败指标**: <10 个
**中等**: 10-50 个 → 重写 landing 再试

### 12.3 Experiment 3 — Pricing validation (24 小时)

**操作**:
1. 给 5 个朋友 (后端兄弟 / 车昊轩 / ai 圈朋友) 看 v0.0.4 的 viewer
2. 问: "如果这个产品 v0.1 ship 了, 你会:
   - (a) 免费下载试试
   - (b) 付 $5 / 月
   - (c) 付 $10 / 月
   - (d) 付 $20 / 月"

**成功指标**: 5 人里 ≥2 人选 (c) 或 (d)
**失败指标**: 全部选 (a)
**中等**: 全部选 (b) → pricing 重新想

### 12.4 Experiment 4 — 真正的 user need 验证 (48 小时内)

**操作**:
1. 给 5 个朋友直接跑 v0.0.4 在他们自己机器上
2. 让他们看自己的 trajectory
3. 问: "看完之后你的第一反应是什么?"

**成功**: ≥3 人的反应是 "我晕了, 这都没印象" 或类似的 awareness shock
**失败**: ≥3 人反应是 "有点意思" (polite disinterest)

---

## 十三、Open Questions

### 13.1 范围相关

1. **v0.1 是只做 conversations, 还是同时做 articles/papers?**
   - 只做 conversations = 更窄, 更快 ship, 但跟 jhlee0409 定位重叠
   - 全做 = 更全, 更慢 ship, 但更差异化
   - **倾向**: 全做, 但 articles 是 "passthrough" (AK 原味, 不改)

2. **identity 层 v0.1 做还是 v0.2?**
   - v0.1 做 = 立刻有 demo wow factor
   - v0.2 做 = v0.1 更容易 ship
   - **倾向**: v0.1 加一个最小版 (只有 portrait.md), v0.2 补全

3. **Obsidian integration 做多深?**
   - 浅: wiki/ 是合法 vault, 用户自己打开
   - 深: 做 obsidian plugin 直接跑 compile
   - **倾向**: 浅。 plugin 是 v0.3+。

### 13.2 竞争相关

4. **是否跟 MemPalace 合作?**
   - 他们是 Python 生态, 我们 Node, 合作难
   - 可以在 README 里互相链接 ("complementary products")
   - 可以在 raw/ 层提供 MemPalace export 格式

5. **怎么处理 Anthropic Import Memory 威胁?**
   - 最多 12 个月, 他们会 ship vendor-side cross-import
   - 我们的护城河是 "中立 + human-readable + compiled"
   - **回答**: 定位明确到 "个人 wiki, 不是 memory infra", 这样 Anthropic 的动作跟我们无关

### 13.3 承诺相关

6. **4 周承诺确认?**
   - v0.1 → v0.4 在 4 周内 ship
   - 期间不再 pivot framing
   - 如果 v0.4 后 data 说 kill, 就真 kill
   - **需要用户 verbal commit**

---

## 十四、Decision Framework

用户读完 spec 后, 三种 path:

### Path A: Go (build v0.1)
- ✅ 承诺 4 周 sprint (v0.1 → v0.4)
- ✅ 24 小时内完成 §12.2-12.4 的 validation experiments
- ✅ 如果 validation 过了, 立刻开始 v0.1 sprint
- ✅ 期间不再 pivot framing

### Path B: No-Go (kill)
- ✅ 把这份 spec 当作 4 天讨论的最终归档
- ✅ convo-wiki v0.0.4 继续自己用, 不 ship
- ✅ 开始想完全不同的方向

### Path C: Wait (不决)
- ✅ spec 存档
- ✅ 睡一晚 / 一天
- ✅ 明天再决定

**Path C 的时间上限是 48 小时**。 超过就默认 Path B (避免无限 pivot)。

---

## 十五、One-line Summary

> **过去 4 天 6 次 framing pivot 后, 这是第一个同时通过 (a) 技术 feasibility (v0.0.1-0.0.4 已跑通), (b) 竞品 sanity check (19 竞品里 0 个同时做对 8 维), (c) 用户 hook (v0.0.4 已触发 user 的 awareness shock), (d) roadmap realism (4 周而非 18 个月), (e) 哲学一致性 (narrative for humans, not memory for AI) 的 framing。**
>
> **如果这一版还要 pivot, 说明问题不在 framing, 在决心。**

---

## 附录 A — 来源文档 (继承关系)

- `personal-knowledge-card-product-spec.md` (04-08 am) — 初版 PKC 定位, 已弃
- `personal-knowledge-card-competitive-research.md` (04-08 day) — 第一轮竞品, 8+ 竞品
- `portable-identity-competitive-research.md` (04-08 eve) — 第二轮竞品, 10+ 竞品
- `conversation-wiki-compiler-product-spec.md` (04-08 late) — v1 spec, 本 spec 的前身
- `personal-knowledge-card-launch-posts.md` (04-08) — 当时写的 launch posts, v0.1 ship 时可复用
- Memory Archaeology 深度 research (04-08 night) — 第三轮竞品, 17+ 竞品
- convo-wiki v0.0.1 → v0.0.4 原型 (04-08 late night) — 4 次迭代验证
- MemPalace 实读 code (04-09 am) — 本 spec 融合对象

## 附录 B — 关键外部参考

- Karpathy LLM Wiki gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- MemPalace: https://github.com/milla-jovovich/mempalace
- sage-wiki: https://github.com/xoai/sage-wiki
- jhlee0409 viewer: https://github.com/jhlee0409/claude-code-history-viewer
- CASS: https://github.com/Dicklesworthstone/coding_agent_session_search
- Epitome: https://epitome.fyi
- limitless-ai.dev: https://limitless-ai.dev
- Anthropic Memory Import: https://claude.com/import-memory
