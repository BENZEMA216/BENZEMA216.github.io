# gsc-mcp 项目速析

> 生成时间：2026-07-20
> 查询：`AkashRajpurohit/gsc-mcp` 是什么项目、用来做什么？

## 摘要

`gsc-mcp` 是一个本地运行、只读的 Google Search Console MCP Server。它把 Search Console API 包装成 4 个 MCP tools，让 Claude Code、Claude Desktop、Cursor、Windsurf、VS Code Copilot 等 MCP client 可以直接查询网站的 Google 搜索表现与收录状态。

它不是 SEO Agent、爬虫、排名优化器或 Search Console 替代品；它只负责把已有 GSC 数据接进 AI 对话。

## 它具体能做什么

| MCP tool | 能力 |
|---|---|
| `gsc_list_sites` | 列出 service account 可读的所有 Search Console properties |
| `gsc_search_analytics` | 查询 clicks、impressions、CTR、average position，可按 query、page、date、country、device、search appearance 分组 |
| `gsc_inspect_url` | 查询单个 URL 是否被索引、last crawl、canonical、coverage、mobile usability |
| `gsc_list_sitemaps` | 查询 sitemap 的 submitted / indexed 数量、errors 与 warnings |

典型问题包括：本月流量最高的关键词是什么、哪些页面点击下降、哪些高曝光关键词 CTR 偏低、某篇文章是否已收录、sitemap 提交与收录差多少。

## 工作方式

```text
MCP client --stdio--> mcp.mjs --> gsc.mjs --> Google Search Console API
```

- `mcp.mjs`：声明 4 个 MCP tools，接收调用并返回 JSON。
- `gsc.mjs`：用 `googleapis` 和 service-account JSON key 调 Google API。
- `cli.mjs`：绕开 AI，手动做 sites / perf / pages / queries / inspect / sitemaps smoke test。
- 默认 key 路径为 `~/.config/gsc-mcp/key.json`，也可通过 `GSC_KEY_PATH` 指定。

鉴权 scope 是 `webmasters.readonly`。用户需自行建立 Google Cloud service account，并在每个 Search Console property 中把该 service-account email 添加为 Restricted/read 用户。

## 它不做什么

- 不提交 sitemap、不改设置、不增删 property，也不能修改 Search Console 账户。
- 不绕过 Google API 的数据窗口、配额、sampling 或字段限制。
- 不自动生成 SEO 策略、内容或修复；这些分析和动作仍由上层 AI、人或其他工具完成。
- 默认是本机 `stdio` server，不是作者托管的云服务；数据路径是本机与 Google API 之间。

## 成熟度与使用边界

截至 2026-07-20，仓库 manifest 为 `0.1.0`，GitHub 页面显示 2 commits、2 stars、无 releases，源码主体只有 `mcp.mjs`、`gsc.mjs`、`cli.mjs` 三个小文件。它的优点是简单、可审计、MIT、read-only；边界是产品成熟度很早，尚未看到测试、CI、OAuth 多租户、远程部署鉴权、缓存、配额治理或分析工作流。

service-account JSON key 虽然只有 GSC read scope，仍是敏感凭证：应放在本机 secret path，不应提交 Git，也不应直接把无鉴权的 remote MCP 暴露到公网。

## 一句话判断

它相当于给 AI 装了一个「Google Search Console 只读数据插头」：很适合让 coding assistant / desktop assistant 帮你查 SEO 数据，但它本身不负责做 SEO。

## 数据来源

- [AkashRajpurohit/gsc-mcp GitHub repository](https://github.com/AkashRajpurohit/gsc-mcp)
- [package.json](https://github.com/AkashRajpurohit/gsc-mcp/blob/main/package.json)
- [mcp.mjs](https://github.com/AkashRajpurohit/gsc-mcp/blob/main/mcp.mjs)
- [gsc.mjs](https://github.com/AkashRajpurohit/gsc-mcp/blob/main/gsc.mjs)
- [agent-communication](/wiki/concepts/agent-communication/)

---
*由 LLM 从知识库查询生成*
