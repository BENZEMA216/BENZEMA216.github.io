# BENZEMA216 Knowledge Base

> AK-style personal knowledge base: raw sources + query outputs → LLM compilation → markdown wiki → Obsidian

## Architecture

```
raw/          → 原始素材（论文、项目文档、学习笔记、访谈）
output/       → 查询产出（报告、幻灯片，可回流）
wiki/         → LLM 从 raw/ 与高价值 output/ 编译的概念、地图和关联
```

## 核心原则

- **raw/ 只增不改** — 原始数据是 ground truth
- **wiki/ 由 LLM 维护** — 人不直接编辑，LLM 从 raw/ 与高价值 output/ 编译，并保留来源
- **output/ 回流增强** — 查询结果归档回 wiki，知识持续积累

## 当前创业项目

**Combo 是当前公司与产品；Agora 是长期平台机制与历史研究代号。**

> Combo 帮助垂类创作者，把反复提供的专业服务变成可收费、可规模化交付的 AI 产品。

- 当前资料入口：[README](/output/reports/combo/README/)
- 唯一公司表达真源：[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)
- 当前项目地图：[combo-startup](/wiki/maps/combo-startup/)
- Agora 历史研究入口：[README](/output/reports/agora/README/)

## Quick Stats

统计不在 README 中硬编码，以当前文件树为准。统一排除 `.DS_Store`；查询报告只统计 `output/reports/` 下的 Markdown；Wiki 页面分别按 `concepts/`、`maps/`、`connections/` 下的 Markdown 统计。

```zsh
rg --files -uu raw | rg -v '/\.DS_Store$' | wc -l
rg --files -uu output/reports -g '*.md' | wc -l
rg --files -uu wiki/concepts -g '*.md' | wc -l
rg --files -uu wiki/maps -g '*.md' | wc -l
rg --files -uu wiki/connections -g '*.md' | wc -l
```

## 研究方向

- **Agent 基础设施** — 循环架构、Prompt 工程、上下文管理、记忆系统、工具路由
- **Creative AI** — 创意 Agent 设计、视频生成工作流、漫剧制作
- **产品设计** — Combo、Creative CoWork、用户研究、设计系统

## 使用方式

1. 在 Obsidian 中打开此 vault
2. 从 `wiki/_index.md` 开始浏览
3. 使用 Codex 与 `.agents/skills/` 中的知识库命令进行 ingest/query/lint/compile

---

*Knowledge base maintained by LLM, inspired by [Karpathy's LLM Knowledge Bases](https://x.com/karpathy/status/2039805659525644595)*
