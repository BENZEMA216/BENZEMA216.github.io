# OpenSEO 项目速析

> 生成时间：2026-07-20
> 查询：`every-app/open-seo` 这个项目在做什么？

## 摘要

OpenSEO 是一个开源、可自托管的 SEO 工作台，定位为 Semrush / Ahrefs 的轻量替代。它把 DataForSEO 的第三方数据、Google Search Console 的一方数据、现代 Web UI、23 个 MCP tools 和一组 Agent Skills 组合起来，让人可以在界面里做关键词研究、排名追踪、竞品/外链分析、站点审计和 AI Visibility，也让 Claude Code、OpenClaw、Hermes 等 Agent 直接读取并编排同一批 SEO 数据。

它的创新重点不是新的搜索数据源或“全自动排名 Agent”，而是把传统 SEO SaaS 变成 **AI-agent-ready、可自托管、按 API 用量付费、可修改的操作层**。

## 它具体做什么

| 工作流 | 能力 |
|---|---|
| Keyword research | 关键词扩展、搜索量/KD/CPC/意图、SERP 检查、保存与标签 |
| Rank tracking | 按项目和配置持续追踪关键词排名 |
| Competitor insights | 域名概览、排名关键词、SERP 竞品与内容缺口 |
| Backlinks | 外链概览与 profile 分析 |
| Site audits | 发起爬取，读取审计状态、问题和页面明细 |
| Local SEO | 本地商家、local SERP、Google Business Q&A |
| First-party data | 接入 GSC，读取 clicks、impressions、CTR、position，并做 URL inspection |
| AI Visibility | 产品 UI 提供 AI 搜索可见性工作流 |

代码中 MCP server 显式注册了 23 个 tools，包括 `research_keywords`、`get_keyword_metrics`、`get_ranked_keywords`、`get_serp_results`、`find_serp_competitors`、`get_backlinks_overview`、`get_search_console_performance`、`run_site_audit` 等。仓库同时提供面向 Agent 的 SEO workflows，例如 keyword research、keyword clustering、competitor analysis、competitive landscape、link prospecting 与 SEO project setup。

## 产品结构

```text
DataForSEO API ─┐
                ├─ OpenSEO backend / project state ── Web UI
Google GSC ─────┘                                └── MCP server ── AI Agent
                                                         └── Agent Skills 编排工作流
```

- 前端/服务端主要为 TypeScript、React、TanStack Start。
- 默认云部署路径是 Cloudflare Workers + D1；也支持 PostgreSQL。
- 个人本地使用可通过 Docker 部署；公网/团队部署可走 Cloudflare。
- MIT License，允许修改和商业使用。

## 商业与成本模型

- 官方托管版提供免费试用，订阅标价为 `$10/月`。
- 自托管仍必须自备 DataForSEO API key，数据不是“免费开源”的；费用直接按 DataForSEO 请求产生。
- 官方称托管服务会在 DataForSEO 请求成本上加收 28%。

所以它真正降低的是 **软件订阅、产品复杂度和可控性门槛**，不是把 SEO 数据采集成本降为零。

## 它不是什么

- **不是自己的搜索索引**：核心商业 SEO 数据主要来自 DataForSEO。
- **不是纯 GSC MCP**：相比只读 GSC adapter，它覆盖关键词、SERP、竞品、外链、审计、local SEO，并带 UI、项目状态和写操作。
- **不是全自动 SEO 代理**：MCP 提供数据与操作面，Skills 提供分析步骤；内容策略、页面修改、发布和效果负责仍需 Agent/人完成。
- **不是成熟度等同 Semrush/Ahrefs 的完整替代品**：功能覆盖在快速扩张，但数据差异化、历史深度、企业协作与稳定性仍不能仅由功能清单推断。

## 当前成熟度与风险

截至 2026-07-20，GitHub 页面显示约 5.1k stars、569 forks、385 commits、28 个 releases；最新 `v0.1.0` 发布于 2026-07-19，仓库 HEAD 为 `6f2eb052`。这说明项目有明显早期关注度和持续迭代，但语义版本仍处早期。

自托管需要注意：Docker 模式使用 `local_noauth`，官方明确要求只能放在有认证的反向代理、tunnel 或私有网络之后；DataForSEO key 也是敏感凭据。项目默认采集匿名聚合 telemetry，可通过 `OPENSEO_TELEMETRY_DISABLED=1` 或 `DO_NOT_TRACK=1` 关闭。

## 一句话判断

**OpenSEO = 开源 SEO 数据工作台 + Agent 可调用的 MCP 层 + SEO 方法论 Skills。**

对个人站长、小型增长团队、SEO agency 或希望让 coding agent 参与 SEO 的团队，它很有吸引力；如果核心需求是独家数据、超大规模历史库、成熟 enterprise governance 或“无人值守自动增长”，它暂时不是 Semrush/Ahrefs 的等价替代。

## 数据来源

- [OpenSEO GitHub repository](https://github.com/every-app/open-seo)
- [OpenSEO 官方网站](https://openseo.so/)
- [Docker self-hosting 文档](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_DOCKER.md)
- 仓库源码快照：`every-app/open-seo@6f2eb052116077d85b4486cbfa7391f2380b7cf1`
- [gsc-mcp-project-analysis-2026-07-20](/output/reports/gsc-mcp-project-analysis-2026-07-20/)

---
*由 LLM 从知识库查询生成*
