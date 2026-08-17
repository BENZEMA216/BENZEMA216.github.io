# Claude Managed Agents — Overview (Official Docs)

> Source: Claude Platform Docs
> URL: https://platform.claude.com/docs/en/managed-agents/overview
> Date: 2026 (Beta, `managed-agents-2026-04-01` header)
> Ingested: 2026-04-09

---

## 定位

Anthropic 提供两种使用 Claude 的方式：

| | Messages API | Claude Managed Agents |
|---|---|---|
| What it is | 直接调模型 | 预制的、可配置的 agent harness + 托管基础设施 |
| Best for | 自定义 agent loop、细粒度控制 | 长任务、异步工作 |

Managed Agents 提供 harness 和基础设施，开发者不需要自己构建 agent loop、tool execution 和 runtime。Claude 可以在安全的托管环境中读写文件、运行命令、浏览网页、执行代码。内置 prompt caching、compaction 等优化。

## 四个核心概念

| Concept | Description |
|---------|-------------|
| **Agent** | model + system prompt + tools + MCP servers + skills。一次定义，多 session 复用 |
| **Environment** | 容器模板（预装包如 Python/Node/Go、网络规则、挂载文件） |
| **Session** | 一个运行中的 agent 实例，在某个 environment 内执行特定任务 |
| **Events** | app ↔ agent 之间交换的消息（user turns, tool results, status updates） |

## 工作流程

1. **Create an agent** — 定义 model/prompt/tools/MCP/skills，拿到 agent ID
2. **Create an environment** — 配置容器（预装包、网络访问规则、挂载文件）
3. **Start a session** — 引用 agent + environment 启动
4. **Send events & stream** — 用户消息以 event 发送，Claude 自主调工具，结果通过 SSE 流回。事件历史 server-side 持久化，可整段拉回
5. **Steer or interrupt** — 跑到一半可以追加 user event 引导或打断

## 适用场景

- **长任务执行** — 分钟到小时级、多轮 tool call
- **云基础设施** — 安全容器 + 预装包 + 网络访问
- **最小基础设施** — 不需要自建 agent loop / sandbox / tool execution
- **有状态 session** — 持久文件系统 + 会话历史

## 内置工具

- **Bash** — 容器内执行 shell
- **File operations** — read, write, edit, glob, grep
- **Web search & fetch** — 搜索网页 + 抓取 URL 内容
- **MCP servers** — 接入外部工具提供者

## Beta 状态

- 所有 endpoint 需要 `managed-agents-2026-04-01` beta header（SDK 自动设置）
- 默认对所有 API 账户开放
- **Research preview**（需申请）：Outcomes、Multi-agent、Memory

## Rate Limits

| Operation | Limit |
|-----------|-------|
| Create endpoints（agents, sessions, environments 等）| 60 RPM |
| Read endpoints（retrieve, list, stream 等）| 600 RPM |

组织级 spend limits 和 tier-based rate limits 也同时生效。

## 品牌指南

合作伙伴集成时：
- ✅ 允许：「Claude Agent」、「Claude」（菜单已标注 Agents 时）、「{YourAgent} Powered by Claude」
- ❌ 不允许：「Claude Code」「Claude Code Agent」「Claude Cowork」「Claude Cowork Agent」
- ❌ 不允许模仿 Claude Code 的 ASCII art 或视觉元素

→ Anthropic 明确划分了 Claude Code（终端用户产品）和 Managed Agents（平台底座）的边界，鼓励第三方在 Managed Agents 上做品牌化产品。
