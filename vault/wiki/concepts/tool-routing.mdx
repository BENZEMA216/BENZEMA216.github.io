# 工具路由（Tool Routing）

> Agent 根据任务需求智能选择和分配工具的机制，包括延迟加载、平台路由和上下文优化。

## 核心要点

- 延迟加载（Tool Search）：50+ 工具不全量注入，按需搜索和加载，节省上下文空间
- 平台路由：视频生成场景中根据需求智能选择 Sora/Minimax/Runway/Kling 等平台
- CLI-style MCP：用命令行风格的工具描述替代详细的 JSON Schema，大幅压缩 Token 消耗
- 路由决策因素：任务类型、质量要求、时长限制、风格匹配、成本预算
- 与 Progressive Disclosure 配合，实现工具的渐进式暴露
- 不要把 provider/model/API-key routing 与 Tool Routing 混为一谈：前者选择模型供给路径，后者选择完成任务所需的工具或能力

## 详细说明

当 Agent 可用工具数量超过几十个时，将所有工具描述一次性注入 System Prompt 会消耗大量上下文窗口。Tool Routing 解决的核心问题就是：如何让 Agent 在需要时找到正确的工具，而不是一开始就"知道"所有工具。Claude Code 的 Tool Search 机制是目前最成熟的实现——Agent 可以通过关键词搜索发现延迟加载的工具，只有被搜索命中的工具才会将完整 Schema 注入上下文。

在视频 Agent 场景中，Tool Routing 还承担了平台选择的职责。不同的视频生成平台各有优劣：Sora 擅长写实风格，Minimax 在动画风格上表现出色，Runway 的运动控制精度高，Kling 在特定场景下性价比最优。优化版的视频 Agent 主 SP 设计了平台路由表，根据画面风格、时长要求、质量预期等维度自动推荐最合适的平台。

技术研究文档中提出的 CLI-style MCP 是另一个重要优化。传统的工具描述使用 JSON Schema 格式，每个工具的描述可能占用数百 Token。CLI-style MCP 将工具描述压缩为类似命令行 help 的格式（工具名 + 简要说明 + 参数列表），在 50+ 工具的场景下可以节省数千 Token。这种优化与延迟加载互补：常用工具用 CLI-style 简要描述保持在上下文中，不常用工具则完全延迟加载。

[bifrost-ai-gateway-product-analysis-2026-08-04](/output/reports/bifrost-ai-gateway-product-analysis-2026-08-04/) 提供了一个容易误分类的样本。Bifrost 的主路由单元是 provider、model 与 API key，并围绕队列、预算、retry/fallback 和上游能力做决策；即使产品加入 MCP client/server、Agent Mode 与 Code Mode，也不自动变成按任务语义选择业务工具的 Tool Router。系统设计和产品分析都应先明确“被路由的对象是什么”。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [0201 - 技术研究](/raw/projects/creative-cowork/0201%20-%20%E6%8A%80%E6%9C%AF%E7%A0%94%E7%A9%B6/) | sec 6.3.4 CLI-style MCP 设计，用命令行风格压缩工具描述 |
| [0205 - init 机制设计](/raw/projects/creative-cowork/0205%20-%20init%20%E6%9C%BA%E5%88%B6%E8%AE%BE%E8%AE%A1/) | sec 12 工具路由，工具的分层加载策略 |
| [Tool Search Tool 笔记](/raw/papers/agent-infrastructure/Tool%20Search%20Tool%20%E7%AC%94%E8%AE%B0/) | Claude API 延迟加载机制分析，Tool Search 的实现细节 |
| [视频AGENT 主SP（优化版）](/raw/projects/jimeng-video-agent/%E8%A7%86%E9%A2%91AGENT%20%E4%B8%BBSP%EF%BC%88%E4%BC%98%E5%8C%96%E7%89%88%EF%BC%89/) | 视频生成平台路由表，根据需求选择最佳平台 |
| [harness-engineering-deep-research](/raw/articles/harness-engineering/harness-engineering-deep-research/) | ACI 设计原则、CLI tools > MCP、"the dumb zone" 问题 |
| [bifrost-ai-gateway-product-analysis-2026-08-04](/output/reports/bifrost-ai-gateway-product-analysis-2026-08-04/) | 区分 provider/model/key 路由与 Agent 的 task-to-tool 路由；MCP 增量不改变 Gateway 的主控制对象 |

## 关联概念

- [progressive-disclosure](/wiki/concepts/progressive-disclosure/) — 工具路由是渐进式披露在工具层面的具体实现
- [context-engineering](/wiki/concepts/context-engineering/) — 工具路由的核心目标之一是优化上下文空间使用
- [skills-system](/wiki/concepts/skills-system/) — Skills 的按需加载与工具路由共享延迟加载机制

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
