<!--
status: historical
status_reviewed: 2026-07-17
evidence_level: product-spec
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# Conversation Wiki Compiler — 产品文档

> [!note] 历史产品探索
> 本文保留 Conversation Wiki Compiler 的产品实验，不是 Combo 当前产品定义。

> 来源: 知识库 Query 讨论 (2026-04-08)
> 状态: v0.1 spec, 待 1 小时 agent compile 实验验证后决定是否动手
> 工作名: **Conversation Wiki Compiler** (正式名 TBD)
> 前身: 历经 4 天 6 次 framing pivot 后的收敛形态

---

## TL;DR

> **一个跑在你本地的 agent, 持续把你跟所有 AI 工具的对话 + 所有附件 + 已有笔记, 自动编译成 Karpathy 式的 LLM Wiki。本地优先, 云为可选。**

英文版:

> **A background agent that continuously compiles all your AI conversations, attachments, and notes into a Karpathy-style LLM Wiki — locally.**

这是过去 4 天讨论里**第一个**同时满足以下 6 条的产品定位:

1. ✅ 跟 18 个已 verified 竞品都不重叠
2. ✅ 跟 Anthropic / OpenAI / Cursor 路线图不冲突
3. ✅ 用户已亲手验证 pipeline 对自己有用 (BENZEMA vault 4 天产出)
4. ✅ 一句话能讲清楚
5. ✅ 跟现有 wiki-mcp-server 完美串联
6. ✅ 跟用户已掌握的 LLM Wiki 方法论完美对齐

---

## 一、Problem

### 1.1 用户机器实测扫描结果 (2026-04-08)

| 位置 | 数量 | 类型 |
|------|------|------|
| `~/.claude/projects/` | **246 个 JSONL 会话**, 178 MB | Claude 对话历史 |
| `~/.claude/projects/*/memory/` | 11 个 .md | Claude 自动 memory |
| `~/.codex/` | 148 文件, 82 MB | Codex (ChatGPT CLI) |
| `~/.cursor/` | **7,852 文件**, 343 MB | Cursor |
| `~/.gemini/` | 627 文件, 66 MB | Gemini + GEMINI.md |
| `~/.openclaw/memory/` | **2.7 GB** | 国产 agent harness |
| `~/.qclaw/qmemory/` | 26 MB | 国产 agent harness |
| 散落 `CLAUDE.md` | 8 个 | 项目级配置 |
| 散落 `AGENTS.md` | 9 个 | 项目级配置 |
| Obsidian vaults | **5 个独立 vault** | 笔记 |
| BENZEMA vault | 362 MB | 主 vault |
| MCP configs | 2 个 | 工具配置 |

**翻译过来**: 用户在 6 个 AI 工具 + 5 个 Obsidian vault + 17 份散落 markdown 配置上, **散落了 ~3000+ 段记忆 / 对话 / 思考片段**。 没有任何一个工具知道另一个工具记了什么。 用户自己也不记得这些都在哪。

### 1.2 现有解决方案的根本缺陷

详见 `portable-identity-competitive-research.md` 和 `personal-knowledge-card-competitive-research.md`。 简化总结:

| 现有方案 | 输出形态 | 缺陷 |
|---------|---------|------|
| jhlee0409 / CASS / spool (875 / 652 / 269 ⭐) | **viewer / search index** | 给你浏览 raw 的 UI, 不产出 compiled artifact |
| Epitome / limitless-ai.dev (5.5 / 5 ÷ 6) | **identity card** | 让用户填表, 完全相反方向 |
| sage-wiki / alanagoyal | **LLM Wiki** | 输入是文章, 不是对话 |
| Mem0 / Letta / OpenMemory | **memory blocks** | flat memory, 不是 wiki |
| Claude Import Memory (Anthropic) | **vendor-side flat memory** | 单向, 不出 Claude |

**没有任何竞品在做"把 AI 对话编译成 LLM Wiki"**。

---

## 二、Product

### 2.1 核心 IO

```
INPUT (scanners 自动发现)
  ┌─ ~/.claude/projects/*.jsonl       # Claude 对话
  ├─ ~/.codex/sessions/*.jsonl        # Codex 对话
  ├─ ~/.cursor/...                    # Cursor 历史
  ├─ ~/.gemini/...                    # Gemini 对话
  ├─ ~/.openclaw/memory/              # 国产 harness
  ├─ ~/.qclaw/qmemory/                # 国产 harness
  ├─ 所有 Obsidian vault              # 笔记
  ├─ 散落的 CLAUDE.md / AGENTS.md     # 项目配置
  ├─ 对话中提到 / 附加的所有文件      # 附件
  └─ (可选) blog / X / GitHub README

PROCESS (agent 自动运行)
  scan → extract → dedupe → compile → connect → write → log

OUTPUT (本地文件夹)
  ~/llm-wiki/
  ├── raw/                  # 原始素材保留 + 来源元数据
  │   ├── claude/
  │   ├── codex/
  │   ├── cursor/
  │   ├── obsidian/
  │   └── attachments/
  ├── wiki/                 # AK pattern compiled artifact
  │   ├── concepts/         # 提取的核心概念 (带 citations)
  │   ├── maps/             # 按主题归类
  │   ├── connections/      # 跨域 / 跨工具 / 跨对话连接
  │   ├── log.md            # 时间线 grep-able
  │   ├── _index.md         # by-domain 索引
  │   └── _summaries.md     # 一行摘要每个文件
  └── output/               # discussion outputs (后期)
```

### 2.2 核心 loop (single iteration)

```
1. SCAN
   检测所有支持的源, 列出 N 个新增 / 修改 文件

2. EXTRACT
   对每个新增文件, agent 提取 candidate concepts:
   - "这次对话的核心议题是什么?"
   - "哪些段落值得变成 wiki/concepts/?"
   - "这次讨论里出现了什么新的 framework / mental model?"

3. DEDUPE
   检查 wiki/concepts/ 已有 → 如果重复, merge 而非新增

4. COMPILE
   把 candidate 写成符合 AK pattern 的 wiki/concepts/*.md:
   - frontmatter (来源, 日期, tags)
   - 概念定义
   - 关键观察
   - citations (回指原始对话)

5. CONNECT
   扫描 connections/ 已有, 找新增 concept 跟其他概念的潜在连接

6. WRITE
   - 写入 wiki/concepts/
   - append wiki/log.md
   - 更新 wiki/_index.md
   - 更新 wiki/_summaries.md

7. (可选) DAEMON MODE
   持续监听新对话, 增量执行 1-6
```

### 2.3 三个 aha moment (见 4-08 晚讨论)

1. **Discovery shock**: 第一次跑完, 弹出 "扫描了 6 个工具 + 5 个 vault, 找到 3,247 段记忆, 编译出 47 个 concept, 标记了 12 个 cross-tool connection"
2. **First-open visualization**: concepts × maps × connections 的图谱 / 时间线 / 主题云
3. **Before/After value proof**: 同一个问题, 不接 wiki 的 Claude 答 vs 接了 wiki (通过 MCP) 的 Claude 答, 并排对比

---

## 三、Anti-Product (这不是什么)

明确**拒绝**以下定位, 任何讨论里出现都要拉回:

| 拒绝的定位 | 为什么 |
|----------|--------|
| Memory viewer / search UI | jhlee0409 / CASS 已占, 我们的输出是 wiki 不是搜索框 |
| Identity card 让用户填表 | Epitome / limitless-ai.dev 已占, 完全相反哲学 |
| Memory aggregator / unifier | Mem0 / Letta 已占, flat memory 不是我们要的 |
| 跨厂商 memory 桥 | Anthropic Import Memory 在做这事 |
| 个人 IP 分发 / Expert Network | 太抽象, 不是 v0.1 |
| Knowledge Agent Network | 太抽象, 不是 v0.1 |
| 全自动 prosumer SaaS | v0.1 是 local CLI, 不是 SaaS |

---

## 四、Differentiation Matrix

跟之前 18 个竞品在 4 个新维度上重新对比:

| 维度 | 18 竞品 | 本产品 |
|------|--------|--------|
| **Input** | 单一工具 / 手动 ingest | **所有 AI 工具 + 附件 + 笔记 自动发现** |
| **Process** | viewer / search / form / flat memory | **Agent 自主 compile** |
| **Output** | 浏览 UI / 搜索框 / memory blocks | **AK LLM Wiki (concepts / maps / connections / log)** |
| **Hosting** | 各种 | **本地优先 + cloud 可选** |

**没有竞品在这 4 维上跟我们重叠**。 详细打分见 `portable-identity-competitive-research.md` 和 `personal-knowledge-card-competitive-research.md`。

---

## 五、Architecture (v0.1)

```
conversation-wiki-compiler/
├── bin/
│   └── compile                    # 主 CLI
├── scanners/                      # 各源的 parser
│   ├── claude.js                  # ~/.claude/projects/*.jsonl
│   ├── codex.js                   # ~/.codex/sessions/*.jsonl
│   ├── cursor.js                  # ~/.cursor/...
│   ├── gemini.js
│   ├── openclaw.js                # ~/.openclaw/memory/
│   ├── qclaw.js
│   ├── obsidian.js                # 自动找所有 .obsidian/
│   ├── markdown-config.js         # CLAUDE.md / AGENTS.md / GEMINI.md
│   └── attachments.js             # 对话引用的本地文件
├── compiler/
│   ├── extract.js                 # raw → candidate concepts
│   ├── dedupe.js                  # 跟现有 wiki 去重
│   ├── compile.js                 # candidate → AK-format markdown
│   ├── connect.js                 # 跨域连接发现
│   └── prompts/                   # ★ 真正的产品 IP 在这
│       ├── extract.md
│       ├── compile.md
│       └── connect.md
├── writer/
│   ├── wiki-writer.js             # 写 wiki/
│   ├── index-updater.js           # 更新 _index.md / _summaries.md
│   └── log-appender.js            # append log.md
├── agent/
│   ├── loop.js                    # background daemon
│   └── trigger.js                 # 文件监听 / 定时
├── config/
│   └── default.json               # 默认扫描路径 + 排除规则
└── output/
    └── ~/llm-wiki/                # 用户的本地 wiki (默认路径)
```

**关键依赖**:
- LLM API (Claude / GPT / 国产 model 任选)
- 本地文件 IO
- markdown-it / front-matter / yaml
- chokidar (daemon mode)

**不依赖**:
- 任何后端服务
- 任何用户账户
- 任何 SaaS 基础设施

v0.1 = 完全离线的本地 CLI。

---

## 六、Roadmap

### v0.1 — Local CLI batch compile (2 周)

**目标**: 一行命令, 把所有源扫一遍, 编译出 wiki, 用户能用。

**功能**:
- ✅ scan claude / codex / cursor / gemini / obsidian
- ✅ extract → compile → write
- ✅ output to `~/llm-wiki/`
- ✅ AK pattern: concepts / maps / connections / log / _index
- ✅ citations 回指原始对话

**不做**:
- ❌ daemon / 增量
- ❌ UI / 可视化
- ❌ 云同步
- ❌ 多用户

### v0.2 — Daemon + 增量 compile (1 个月)

**新增**:
- 文件监听, 新对话出现自动 compile
- 增量更新 wiki, 不重做
- 简单的 web UI 浏览 (本地起 server)

### v0.3 — Visualization + Discovery shock (1 个月)

**新增**:
- 第一屏 discovery shock screen
- 知识图谱 / 主题云 / 时间线
- Before/After demo
- MCP server 暴露 wiki 给任意 AI (复用 wiki-mcp-server)

### v0.4 — Cloud 可选 (TBD)

**新增** (用户决定要不要做):
- 加密同步
- 跨设备 wiki
- 朋友间 wiki 互引

---

## 七、致命未知数 (必须先验证)

### 7.1 The One Question

**整个产品的命脉只有一个问题**:

> **一个 agent 能不能在没有人监督的情况下, 产出符合 AK pattern 质量的 compile?**

过去 4 天 BENZEMA vault 里 28 个 wiki/concepts/ + 7 个 maps + 8 个 connections, **全部是用户跟 Claude 协作出来的**。 用户做编辑判断, Claude 做执行。

**如果背景 agent 自己跑, 它能不能产出同等质量?**

- 如果能 → 真产品
- 如果不能 → 死

### 7.2 1 小时验证实验 (写代码之前必跑)

**Setup**:
- 输入: 用户最近 5 个 Claude session jsonl
- 工具: 一个 Claude agent, 不依赖主对话记忆
- 任务: 完全自主从 5 个 session 编译出 1-2 个 wiki/concepts/*.md

**评判**:
- 用户对比"自己手动会写的版本", 打 1-10 分

**三种结果**:

| 分 | 含义 | 决策 |
|----|------|------|
| 8-10 | production 质量 | 直接 build, 当前 prompt 即 v0.1 引擎 |
| 5-7 | 60% 草稿 + 人润色 | Build, 但产品是 user-in-loop, 不是全自动 |
| 0-4 | 垃圾 | **不 build**, LLM 还不够, 6 个月后回头 |

**这一个实验的结果, 决定要不要花 18 个月**。 比写 100 页 spec 有用。

---

## 八、Risks

### 8.1 技术 risk

| Risk | 缓解 |
|------|------|
| Agent compile 质量不够 | **§7.2 实验先验证** |
| LLM API 成本失控 (每天扫几百个 session) | 增量 + 本地缓存 + 用户自带 API key |
| 不同工具的 jsonl schema 频繁变 | scanners 模块化, schema mismatch fail loud |
| 对话里的 PII / 敏感信息 | 本地优先, 永不上传 (除非用户主动开 cloud) |

### 8.2 市场 risk

| Risk | 缓解 |
|------|------|
| Anthropic 自己做 `/memory-import` | Anthropic 永远不会做 LLM Wiki 编译 (它是 user-facing artifact, 不是 model-facing memory) |
| jhlee0409 / CASS 加 compile 功能 | OSS dev tool 作者不会 pivot 到 prosumer SaaS, 不同人种 |
| 用户不愿意付费 | v0.1 OSS 免费, 验证 demand 后再决定商业化 |
| 用户嫌 wiki 没用 | **这是 §7 的 follow-up: agent compile 行了之后, 还得验证 wiki 真的被用户翻** |

### 8.3 个人 risk

| Risk | 缓解 |
|------|------|
| 用户 build 中途又想 pivot | 已经 6 次 pivot, 第 7 次的概率应该低了 |
| 用户做出来不发布 (build → distribution gap) | v0.1 ship 必须强制带 launch checklist |
| 18 个月承诺过重 | 先做 1 小时实验 + 2 周 v0.1, 不一次承诺 18 个月 |

---

## 九、Business Model (远期, v0.3+ 再决定)

### 不卖钱的版本
- v0.1 / v0.2 OSS, MIT
- 用户自带 LLM API key
- 声誉 / 简历 / 社区影响力

### 卖钱的版本 (v0.3+)
- **Pricing 假设**: $10-20 / 月 prosumer
- **收费功能**:
  - 云同步 + 加密存储
  - 跨设备 wiki
  - LLM API 代付 (managed)
  - 高级 visualization
  - 团队共享 wiki
- **目标用户**: 用 ≥3 个 AI 工具的 dev / PM / researcher
- **TAM (粗估)**: 50-100 万全球 multi-tool AI power user

**v0.1 阶段不要碰这块**。

---

## 十、Distribution (v0.1)

按 `personal-knowledge-card-launch-posts.md` 同款渠道:

1. **即刻** 中文版首发 (用户最熟 audience)
2. **X** 英文 thread
3. **Reddit r/ClaudeAI** 短帖
4. **HN Show HN** 极简
5. **Indie Hackers**
6. **手动 onboard 5 个朋友** (后端兄弟 / 车昊轩 / 任何 AI 圈)

**核心信息纪律**:
- ✅ "把你跟所有 AI 的对话, 自动编译成 LLM Wiki"
- ✅ "本地, 离线, 你的数据不出你的电脑"
- ❌ 不提 "expert network" / "agent economy" / "Karpathy validated" / "cross-tool memory"

---

## 十一、Open Questions

需要用户回答:

1. **正式产品名**? 候选:
   - Conversation Wiki Compiler
   - Karpedia (Karpathy + encyclopedia)
   - Wikiloop
   - Compiled
   - LogMine
   - (用户提议)

2. **第一次 v0.1 是否包含 Obsidian / 笔记**, 还是只做 AI 对话?
   - 只做对话 = 更窄更尖, 故事更清楚
   - 包含笔记 = 更全, 但跟 Obsidian native search 重叠

3. **是否复用 wiki-mcp-server**? 还是另起项目?
   - 复用: wiki-mcp-server 改造成 "compile + serve" 双能力
   - 分开: 两个独立项目, compiler 输出文件夹, mcp-server 读文件夹

4. **LLM 选哪家**?
   - 默认 Claude (用户已有 API key)
   - 支持用户切 GPT / 国产 model
   - v0.1 是否多 model 兼容?

5. **18 个月承诺确认**?
   - 看完这份 spec, 用户是否愿意把这事当成未来 18 个月的中心?

---

## 十二、Next Step

**只决定一件事**: 做 §7.2 的 1 小时实验吗?

- ✅ 做 → 现在告诉我用哪 5 个 session, 或让我自己挑, 1 小时给硬数据
- ❌ 不做 → 这份 spec 存档, 等用户准备好

如果实验过了 (8-10 分), 下一步:
- 立项 GitHub repo
- v0.1 sprint 计划 (2 周)
- 第一周写 scanner + extractor
- 第二周写 compiler + writer
- 第二周末跑通 e2e, 出第一个用户自己的 wiki

如果实验只到 5-7 分, 下一步:
- 调整 v0.1 为 user-in-loop
- 加 review / approve UI

如果实验 0-4 分, 下一步:
- 停, 6 个月后回头看 LLM 是否进步

---

## 一句话

> **过去 4 天 6 次 pivot, 这是第一个 framing 通过了所有 brutal sanity check**:
> 跟 18 个竞品都不重叠, 跟 Anthropic 不冲突, 用户已亲手验证 pipeline, 一句话能讲清楚, 跟 wiki-mcp-server 串联, 跟用户已有方法论对齐。
>
> **唯一的命脉是 §7.2 那 1 小时实验**。
> 在跑那个之前, 不要写第一行代码。
> 在跑那个之前, 也不要再 pivot 第 7 次。
