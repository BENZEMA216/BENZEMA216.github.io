# Agent 基础设施研究全景

> 从 Agent 循环到记忆系统，从 Prompt 工程到工具路由——构建 AI Agent 的完整技术栈。

## Agent 循环架构

Agent 的核心运行机制：感知-思考-行动-反馈的持续循环。

| 概念 | 说明 | 来源 |
|------|------|------|
| **[agent-loop](/wiki/concepts/agent-loop/)** | 单循环 + 智能委托，Claude Code 验证的架构范式 | [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) |
| **[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)** | 分层 Agent 委托：Main Agent → Explore/Plan/General Sub-Agent，最多一层嵌套 | [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) |
| **[creative-agent-design](/wiki/concepts/creative-agent-design/)** | 在标准循环上叠加发散/收敛模式，适配创意工作 | [Creative Agent System Prompt 模板](/raw/projects/creative-cowork/reference/Creative%20Agent%20System%20Prompt%20%E6%A8%A1%E6%9D%BF/) |

### 关键论文

- [LLM-in-Sandbox 论文笔记](/raw/papers/agent-infrastructure/LLM-in-Sandbox%20%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/) — Agent 沙盒执行环境设计
- [Tool Search Tool 笔记](/raw/papers/agent-infrastructure/Tool%20Search%20Tool%20%E7%AC%94%E8%AE%B0/) — 工具发现与路由的自动化

### 学习笔记

- [0615-agent-architectures](/raw/articles/learning-notes/agent-architectures/) — Agent 架构综述
- [0620-anthropic-agent-cookbook](/raw/articles/learning-notes/anthropic-agent-cookbook/) — Anthropic 官方 Agent 构建指南
- [0707-12-factor-agent](/raw/articles/learning-notes/12-factor-agent/) — 12-Factor Agent 设计原则
- [0710-agent-how](/raw/articles/learning-notes/agent-how/) — Agent 实现方法论
- [0719-manus](/raw/articles/learning-notes/manus/) — Manus Agent 架构分析
- [0804-oppo-agent](/raw/articles/learning-notes/oppo-agent/) — OPPO Agent 实践

### 2026 赛道更新：Runtime、Identity 与 Eval

- [agent-infra-update-2026-08-03](/raw/articles/agent-infrastructure/agent-infra-update-2026-08-03/) — 独立 Infra 的价值从已被模型内化的通用 Memory/RAG/MCP，迁移到长程任务的执行、状态、恢复、成本和治理
- [agent-coworker-identity-system-2026-07-29](/raw/articles/agent-infrastructure/agent-coworker-identity-system-2026-07-29/) — Agent identity 不是静态账号：应把 principal delegation、task-bound authorization、最小权限、到期回收与审计证据组成运行时控制链
- [china-ai-office-competition-2026-08-03](/raw/articles/agent-platforms/china-ai-office-competition-2026-08-03/) — 企业办公 Agent 的可用性取决于既有组织上下文和应用连接；这也是 Runtime/Identity/Context 必须在真实工作流中一起验证的原因

### Agent-native Harness：从审阅到连续验证

- [trust-not-in-code-review-2026-07-27](/raw/articles/harness-engineering/trust-not-in-code-review-2026-07-27/) — 信任不应由一次 diff 审阅代理，而应由硬测试、结构约束、线上运行信号与对失败输入的修复持续积累
- [meshy-muse-agent-legible-autonomous-development-2026-07-31](/raw/articles/harness-engineering/meshy-muse-agent-legible-autonomous-development-2026-07-31/) — 可执行的参照：双盲评测产出结果信号，代码库则以局部模块、文档、依赖规则、CI 与 AI review 支撑自主开发

### 相邻控制面：模型流量与协作 Session

Agent Runtime 上下两侧还会出现不同的控制面。它们可以组合，但控制对象不同，不能因为都带有 gateway、routing 或 audit 就视为同一种基础设施：

```text
Human / Team
  ↓ MPAI：collaboration surface + session-scoped access control
Host-owned Codex / Claude Code Session + Harness
  ↓ Bifrost：model traffic gateway + provider governance
Model Providers
```

| 层 | 控制对象 | 代表机制 | 明确边界 | 来源 |
|---|---|---|---|---|
| **Collaboration surface / Session Gateway** | 谁能进入 Host 已有的原生 Agent session，以及能读、能写、能撤销什么 | MPAI 复用本地 transcript 与 provider-native resume，在其外增加私网身份、session ACL、viewer/participant、署名、presence、stream、cancel 与 audit | 不复制新的 Agent，不提供模型路由，也不是 Agent-to-Agent 互操作协议 | [mpai-multiplayer-ai-implementation-analysis-2026-08-04](/output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04/) |
| **Agent Runtime / Harness** | Session、状态、工具、approval、恢复、验证与副作用 | Codex / Claude Code 等原生 Agent runtime | 负责执行闭环；不能把上游流量治理或多人进入 session 自动视为自身已解决 | [agent-runtime](/wiki/concepts/agent-runtime/)、[harness-engineering](/wiki/maps/harness-engineering/) |
| **Model Gateway / Traffic Control Plane** | Runtime 或应用如何选择 provider、model 与 key，并处理 retry/fallback、预算、限流、缓存和观测 | Bifrost 将多种请求协议归一到内部请求，再路由到上游并翻译响应 | 不是 durable task/session、跨会话 memory、业务状态或结果验收系统；协议翻译还需防静默失真 | [bifrost-ai-gateway-product-analysis-2026-08-04](/output/reports/bifrost-ai-gateway-product-analysis-2026-08-04/) |

这是一张概念分层图，不表示 MPAI、任一 Agent Runtime 与 Bifrost 已经组成同一套部署。长期可复用的判断是：**MPAI 管“人如何进入既有 session”，Bifrost 管“执行层如何访问模型”，Runtime / Harness 管“任务如何可靠完成”。**

## Prompt 工程

从单体 Prompt 到模块化架构的演进。

| 概念 | 说明 | 来源 |
|------|------|------|
| **[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)** | 110+ 文件模块化 SP 系统，按需动态组装 | [Claude Code System Prompt 详解](/raw/articles/claude-code-research/Claude%20Code%20System%20Prompt%20%E8%AF%A6%E8%A7%A3/) |
| **[creative-agent-design](/wiki/concepts/creative-agent-design/)** | 创意 Prompt 模块化：system/ + tools/ + agents/ + skills/ + reminders/ | [Creative Agent System Prompt 模板](/raw/projects/creative-cowork/reference/Creative%20Agent%20System%20Prompt%20%E6%A8%A1%E6%9D%BF/) |

### 对标研究

- [Agent System Prompt 研究](/raw/articles/claude-code-research/Agent%20System%20Prompt%20%E7%A0%94%E7%A9%B6/) — Claude Code / Cursor / Devin / Manus 四大 Agent SP 对比
- [Claude Code System Prompt 详解](/raw/articles/claude-code-research/Claude%20Code%20System%20Prompt%20%E8%AF%A6%E8%A7%A3/) — 116 文件完整拆解
- [0807-cc-prompt](/raw/articles/learning-notes/cc-prompt/) — Claude Code Prompt 深度分析
- [0407-define-agent-requirement](/raw/articles/learning-notes/define-agent-requirement/) — Agent 需求定义方法

## 上下文管理

Agent 能力的上限取决于上下文质量。

| 概念 | 说明 | 来源 |
|------|------|------|
| **[context-container](/wiki/concepts/context-container/)** | 项目级上下文聚合器，Creative CoWork 的核心 | [01 Creative CoWork - DEMO思路](/raw/projects/creative-cowork/01%20Creative%20CoWork%20-%20DEMO%E6%80%9D%E8%B7%AF/) |
| **[context-engineering](/wiki/concepts/context-engineering/)** | Context Engineering > Prompt Engineering，Anthropic/Manus 共识 | [AI Agent 产品设计 Blog 阅读清单](/raw/articles/blog/AI%20Agent%20%E4%BA%A7%E5%93%81%E8%AE%BE%E8%AE%A1%20Blog%20%E9%98%85%E8%AF%BB%E6%B8%85%E5%8D%95/) |
| **[progressive-disclosure](/wiki/concepts/progressive-disclosure/)** | 信息按需分层加载，避免上下文过载 | [0205 - init 机制设计](/raw/projects/creative-cowork/0205%20-%20init%20%E6%9C%BA%E5%88%B6%E8%AE%BE%E8%AE%A1/) |

### 论文前沿

- [Claude Context Awareness 机制](/raw/papers/context-engineering/Claude%20Context%20Awareness%20%E6%9C%BA%E5%88%B6/) — Token 预算感知：模型知道自己还剩多少 token
- [SWE-Pruner 论文笔记](/raw/papers/context-engineering/SWE-Pruner%20%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/) — 0.6B 轻量模型动态裁剪代码上下文，节省 23-54% token
- [Context Management 技术方案汇总](/raw/papers/context-engineering/Context%20Management%20%E6%8A%80%E6%9C%AF%E6%96%B9%E6%A1%88%E6%B1%87%E6%80%BB/) — 滑动窗口、LLM 摘要、压缩、分层检索方案对比

### 学习笔记

- [0702-scaling-test-time-compute](/raw/articles/learning-notes/scaling-test-time-compute/) — Test-time Compute 与上下文管理的关系
- [0709-websailor](/raw/articles/learning-notes/websailor/) — Web 场景下的上下文管理

## 记忆系统

跨会话记忆是 Agent 最强烈的未满足需求之一。

| 概念 | 说明 | 来源 |
|------|------|------|
| **[agent-memory](/wiki/concepts/agent-memory/)** | 三种记忆范式：任务编排（Beads）、知识事实（OpenClaw）、规范指令（Claude Code） | [AI Agent 记忆方案对比 - Beads vs OpenClaw vs Claude Code](/raw/articles/memory-research/AI%20Agent%20%E8%AE%B0%E5%BF%86%E6%96%B9%E6%A1%88%E5%AF%B9%E6%AF%94%20-%20Beads%20vs%20OpenClaw%20vs%20Claude%20Code/) |

### 论文前沿

- [MemEvolve_论文笔记](/raw/papers/agent-memory/MemEvolve_%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/) — 记忆系统的元进化：不仅积累经验，还动态调整记忆架构本身
- [Distilling Feedback into Memory-as-a-Tool](/raw/papers/agent-memory/Distilling%20Feedback%20into%20Memory-as-a-Tool/) — 将评估反馈转化为可持久复用的记忆工具（RAG + 自动评估闭环）

### 学习笔记

- [0823-multimodal-agent-long-term-memory](/raw/articles/learning-notes/multimodal-agent-long-term-memory/) — 多模态 Agent 长期记忆
- [0830-memory-r1](/raw/articles/learning-notes/memory-r1/) — Memory R1 研究
- [0310-agent-knowledge](/raw/articles/learning-notes/agent-knowledge/) — Agent 知识管理

## 工具系统

Agent 的能力边界由工具决定。

| 概念 | 说明 | 来源 |
|------|------|------|
| **[skills-system](/wiki/concepts/skills-system/)** | SKILL.md + YAML frontmatter 标准，模块化能力加载 | [Superpowers Skills 架构分析](/raw/articles/claude-code-research/Superpowers%20Skills%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) |
| **[init-mechanism](/wiki/concepts/init-mechanism/)** | /init 三层推荐：项目类型 + 用户历史 + 社区热门 | [0205 - init 机制设计](/raw/projects/creative-cowork/0205%20-%20init%20%E6%9C%BA%E5%88%B6%E8%AE%BE%E8%AE%A1/) |
| **[tool-routing](/wiki/concepts/tool-routing/)** | 工具发现与路由，自动匹配最适合当前任务的工具 | [Tool Search Tool 笔记](/raw/papers/agent-infrastructure/Tool%20Search%20Tool%20%E7%AC%94%E8%AE%B0/) |

### Skills 实现参考

- [Creative CoWork Skills 架构启发](/raw/articles/claude-code-research/Creative%20CoWork%20Skills%20%E6%9E%B6%E6%9E%84%E5%90%AF%E5%8F%91/) — 多 Skills 实现的架构启发
- [Superpowers Skills 架构分析](/raw/articles/claude-code-research/Superpowers%20Skills%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) — Superpowers 的 Skill 发现和加载机制
- [为 Claude 构建 Skills 完整指南](/raw/articles/claude-code-research/%E4%B8%BA%20Claude%20%E6%9E%84%E5%BB%BA%20Skills%20%E5%AE%8C%E6%95%B4%E6%8C%87%E5%8D%97/) — 从零构建 Skill 的完整流程

## 执行证据与训练数据

Runtime、Evaluation 与模型改进之间需要一层可审计的 trajectory：

| 概念 | 说明 | 来源 |
|------|------|------|
| **[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)** | 记录 intent、state、tool action、outcome、用户反馈、成本与 lineage，用于 Harness 修复或 post-training | [real-world-workflow-data-rlaas-2026-07-22](/raw/articles/agent-economy/real-world-workflow-data-rlaas-2026-07-22/) |

关键边界：

- 日志不自动等于高质量训练数据，必须补 intent、outcome、QA、privacy 与 data lineage
- Memory 是保存和检索经历，policy learning 是改变行为能力，两者不可混同
- Coding 环境易复制和重置；真实商业工作流更依赖 sample efficiency 与过程反馈
- 优先用 production trajectory 修复 tests、rules、routing、memory 和 Harness，再评估 post-training ROI

## 视频 Agent 实例

即梦视频 Agent 是创意 Agent 的核心实践案例。

| 文件 | 内容 |
|------|------|
| [视频AGENT 主SP](/raw/projects/jimeng-video-agent/%E8%A7%86%E9%A2%91AGENT%20%E4%B8%BBSP/) | 视频 Agent 主 System Prompt |
| [视频AGENT 主SP（优化版）](/raw/projects/jimeng-video-agent/%E8%A7%86%E9%A2%91AGENT%20%E4%B8%BBSP%EF%BC%88%E4%BC%98%E5%8C%96%E7%89%88%EF%BC%89/) | 优化后版本 |
| [[raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_构思]] | 构思阶段 Skill |
| [[raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_创意与剧本（优化版）]] | 创意与剧本 Skill |
| [[raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_参考素材生成（优化版）]] | 参考素材生成 Skill |
| [[raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_故事板生成]] | 故事板生成 Skill |
| [[raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_配乐方案（优化版）]] | 配乐方案 Skill |
| [[raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_bgm]] | BGM 搜索 Skill |

### 学习笔记

- [0326-sora-feed-agent](/raw/articles/learning-notes/sora-feed-agent/) — Sora Feed Agent 分析
- [0826-filmaster](/raw/articles/learning-notes/filmaster/) — Filmaster 视频 Agent 分析
- [0513-lovart](/raw/articles/learning-notes/lovart/) — Lovart 创意 Agent 分析

## 论文前沿（按方向）

### 推理与规划

- [DrZero_论文笔记](/raw/papers/reasoning/DrZero_%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/) — DrZero 推理研究
- [Multi-Persona Thinking 论文笔记](/raw/papers/reasoning/Multi-Persona%20Thinking%20%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/) — 多角色思维方法

### 视觉生成

- [PaperBanana 论文笔记](/raw/papers/visual-generation/PaperBanana%20%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/) — PaperBanana 视觉生成
- [VisPainter 论文笔记](/raw/papers/visual-generation/VisPainter%20%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/) — VisPainter 视觉绘画
- [Generative Modeling via Drifting - 笔记](/raw/papers/generative-models/Generative%20Modeling%20via%20Drifting%20-%20%E7%AC%94%E8%AE%B0/) — 生成式漂移建模

### 行业动态

- [0416-ai-second-half](/raw/articles/learning-notes/ai-second-half/) — AI 下半场
- [0527-beyond-agent-tech](/raw/articles/learning-notes/beyond-agent-tech/) — 超越 Agent 技术
- [0701-era-of-exploration](/raw/articles/learning-notes/era-of-exploration/) — 探索时代
- [0621-ak-software-changing](/raw/articles/learning-notes/ak-software-changing/) — 软件正在改变
- [1009-openai-dev-day](/raw/articles/learning-notes/openai-dev-day/) — OpenAI Dev Day
- [0929-claude-release](/raw/articles/learning-notes/claude-release/) — Claude 新版本发布

## 核心洞察

1. **架构简单性优先**：Claude Code 用单循环 + 委托胜过复杂的多 Agent 系统
2. **上下文 > 模型**：Context Engineering 成为新共识，好的上下文比更强的模型更有效
3. **记忆分层是必须的**：热数据全量注入、冷数据按需检索，无限积累会淹没上下文窗口
4. **工具模块化**：Skills 系统让 Agent 能力可组合、可进化，是平台化的关键
5. **创意循环需要发散**：标准 Agent Loop 偏收敛，创意工作需要显式的发散阶段
6. **运行证据是改进接口**：高质量 trajectory 把生产失败连接到 eval、Harness 修复和模型学习
7. **控制面必须分层**：协作 Session、Agent Runtime 与模型流量分别治理人员进入、任务执行和上游调用，不能互相冒充完整能力

---
*由 LLM 从 raw/ 与 output/ 数据编译，请勿手动编辑*
