# Harness Engineering 全景

> 塑造 AI Agent 运行环境使其可靠工作的工程实践

## 定义

Agent = Model + Harness。Harness 是 Agent 中除 Model 之外的一切——System Prompt、工具定义、上下文管理、评估机制、运行时架构、记忆系统、权限边界。Model 是"大脑"，Harness 是"身体 + 环境"。当模型能力趋于同质化，Harness Engineering 成为 Agent 产品差异化的核心战场。

## 核心框架

### Feedforward vs Feedback

来自 Birgitta Bockeler / Thoughtworks 的控制论框架，将 Harness 的所有机制分为两类：

- **Feedforward（前馈控制）**：在 Agent 执行之前施加的约束。System Prompt 指令、工具白名单、权限边界、输入校验——这些在 Agent 开始推理之前就已确定，不依赖运行时反馈。类似恒温器的预设温度。
- **Feedback（反馈控制）**：在 Agent 执行过程中或之后的检查和修正。Self-verification、trajectory critics、用户 approve、错误重试——这些基于实际输出动态调整行为。类似恒温器的温度传感器。

最佳 Harness 设计同时使用两种控制：Feedforward 设定边界降低出错概率，Feedback 捕获漏网之鱼并持续改进。

### Computational vs Inferential

Agent 的执行可以分为两种模式：

- **Computational（计算执行）**：确定性的、可验证的操作。运行测试、执行 linter、编译代码、格式校验——结果非对即错，无需 LLM 判断。
- **Inferential（推理执行）**：需要 LLM 判断的操作。理解需求、生成代码、设计方案、创意发散——结果有灰度，需要评估。

Harness 的关键设计原则：尽可能将任务从 Inferential 转化为 Computational。让 LLM 做判断，用确定性工具做验证。"Verification > Generation" 的本质就是将评估从 Inferential 推向 Computational。

## 八大支柱

### 1. Context Engineering

> 系统性管理 LLM 可用的所有上下文

- [context-engineering](/wiki/concepts/context-engineering/) — 上下文工程的完整概念
- [progressive-disclosure](/wiki/concepts/progressive-disclosure/) — 三层渐进式披露（L1/L2/L3）

**关键文章**：
- Anthropic "Effective context engineering"：Context 是 Agent 的第一约束，管理上下文比优化 prompt 更重要
- Manus context engineering：Context 编排的工程实践，KV-Cache 效率优化
- HumanLayer backpressure：当上下文过载时的反压机制，避免 Agent 被信息淹没

**核心技术**：Context Budget 管理、KV-Cache 命中率优化、Compaction 策略（摘要 + 截断）、Just-in-Time Retrieval（按需检索替代预加载）

### 2. Constraints & Safe Autonomy

> 定义 Agent 的行为边界和安全自主范围

- [safe-autonomy](/wiki/concepts/safe-autonomy/) — 安全自主的概念和设计模式
- [tool-routing](/wiki/concepts/tool-routing/) — 工具路由与权限控制

**关键文章**：
- Anthropic permissions：三层权限模型（允许 / 需确认 / 禁止），用户可配置 Agent 的自主边界
- ACI (Agent-Computer Interface) design：工具设计原则——最小权限、明确语义、防误操作
- Hooks：Harness 层的事件钩子，在 Agent 执行前后注入确定性检查

**核心技术**：Permission boundaries、Tool allowlists、Pre/post-execution hooks、Dangerous command detection

### 3. Evaluation & Observability

> 评估 Agent 输出质量并保持可观测性

- [self-verification](/wiki/concepts/self-verification/) — Agent 自我验证机制

**关键文章**：
- GAN-inspired eval：Generator Agent 生成，Evaluator Agent 评估，形成对抗式质量提升循环
- Sprint Contract：将 Agent 任务拆解为可评估的 sprint，每个 sprint 有明确的验收标准
- Trajectory critics：不只评估最终输出，还评估 Agent 的推理轨迹和决策路径

**核心技术**：Automated scoring、Trajectory analysis、Regression benchmarks、"Silence on success; errors only on failure" 原则

### 4. Runtime Architecture

> Agent 的运行时基础设施和执行模型

- [agent-runtime](/wiki/concepts/agent-runtime/) — Agent 运行时架构
- [agent-loop](/wiki/concepts/agent-loop/) — Agent 循环机制
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — 子 Agent 分层委托

**关键文章**：
- Inngest durability：持久化执行——Agent 长时间运行时的断点续传、状态恢复、错误重试
- Initializer agent：启动时的初始化 Agent，负责环境检测、上下文加载、工具注册
- Multi-agent systems：多 Agent 协作的编排模式——串行 pipeline、并行 fan-out、层级委托

**核心技术**：Durable execution、Checkpoint/resume、Sub-agent context firewall、Agent loop lifecycle

**Managed Agents（2026 新增）**：
- Anthropic 将 runtime 产品化为 meta-harness：Brain/Hands/Session 三层解耦
- 四原语：Agent（model+prompt+tools）、Environment（容器模板）、Session（运行实例）、Events（双向消息 via SSE）
- Brain 和 Hands 均为 cattle——失败 = tool call error，可独立替换
- Session 事件日志 = 持久化的 context 对象，`getEvents()` 按需 slice，不做不可逆 compaction
- 凭证隔离：vault + MCP proxy，sandbox 永远不接触 token
- 性能收益：p50 TTFT -60%，p95 TTFT -90%
- Beta 状态，Research preview：Outcomes / Multi-agent / Memory

**OpenAI Agents SDK / Frontier（2026 新增）**：
- Agents SDK 把 sandbox execution、workspace Manifest、MCP、Skills、AGENTS.md、shell、apply_patch 打包为 model-native harness
- Harness-compute separation：凭证不进入模型生成代码运行的 sandbox，失败后可 snapshot/rehydrate
- Frontier / Symphony 案例说明 agent-legible repo、fast build loop、spec、quality score、observability 是大规模 agent coding 的前提

### 5. Specs & Workflow Design

> 用结构化规范驱动 Agent 的行为

- [spec-driven-development](/wiki/concepts/spec-driven-development/) — 规范驱动开发
- [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/) — 模块化 Prompt 架构

**关键文章**：
- CLAUDE.md：项目级配置文件，定义 Agent 的行为规范、代码风格、禁止操作——Harness 的核心 feedforward 控制
- AGENTS.md：目录级配置，让不同目录有不同的 Agent 行为——粒度化的 harness 分区
- 12 Factor Agents：构建可靠 Agent 的 12 条原则，类比 12-Factor App 的工程方法论

**核心技术**：Layered config（项目/目录/用户级）、Modular system prompt、Spec-first workflow

**Unknown-discovery loop**：实现前用 blind-spot pass、prototype、interview 和 reference 找未知项；实现中用 implementation notes 记录偏离；实现后用 explainer / quiz 检查人是否理解并验收。详见 [unknowns-driven-agent-collaboration](/wiki/concepts/unknowns-driven-agent-collaboration/)。

### 6. Memory & Working State

> Agent 的记忆系统和工作状态管理

- [agent-memory](/wiki/concepts/agent-memory/) — Agent 记忆系统
- [context-engineering](/wiki/concepts/context-engineering/) — 记忆与上下文的交叉领域

**关键文章**：
- Filesystem memory：文件系统作为跨 session 的核心记忆层，JSON > Markdown（结构化优先）
- Compaction：上下文压缩——当对话过长时自动摘要历史，保留关键信息丢弃细节
- Context reset：主动清空上下文重新开始，避免"上下文腐化"（累积噪声导致性能下降）

**核心技术**：Progress files、Scratchpad patterns、Hot/cold memory 分层、Auto-compaction triggers

### 7. Trajectory & Learning Loop

> 将生产任务的 intent、state、action、outcome、用户反馈、成本与 lineage 记录为可审计轨迹

- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) — 真实工作轨迹、RL environment、OPSD 与 post-training
- 近端价值：failure cluster → test / rule / routing / memory / Harness fix
- 远端价值：在 Eval 清晰、任务高频、数据独特且价值足够高时进入 SFT / DPO / RL / policy distillation

```text
Production Harness → Trajectory capture → QA / Eval
                  → Harness fix 或 Post-training
                  → 更强执行 → 新轨迹
```

### 8. Repository Control Plane & Release Boundaries

> 把“任务已记录、代码已存在、检查已通过、环境已部署、生产已发布”拆成不同证据层

| 层 | 能证明什么 | 不能证明什么 |
|---|---|---|
| **Linear / issue** | 任务意图、owner、优先级、依赖与验收口径 | 代码已存在或部署已生效 |
| **Local checkout** | 当前机器上的 tracked / untracked / ignored 状态与本地运行结果 | 远端有同样内容，或其他人能够复现 |
| **Git commit / PR** | 可审查 diff、review 与合并拓扑 | Test 已配置、真实依赖已工作 |
| **Remote CI** | 特定版本在预设测试条件下通过 | Test gateway、回调、数据库或第三方服务已就绪 |
| **Test deployment** | 特定版本在测试环境完成配置与验收 | Production 已晋升或真实业务结果成立 |
| **Production** | 特定版本已进入生产并具备运行证据 | 付费、退款、复购、稳定性或单位经济成立 |

**混合脏分支的安全迁移模式**：

1. 先只读清点 branch/upstream/merge-base、tracked/untracked/ignored 与运行服务；
2. 建立可恢复 snapshot，按功能拆分批次，拒绝 bulk stage；
3. 从目标基线创建干净 worktree；
4. 只迁移确认过的 commit / patch，不把整个混合分支一并带入；
5. 在新 worktree 重跑对应测试与构建，再决定 PR、Test 或 Production 动作。

这一支柱把 repo topology、release evidence 与可恢复迁移纳入 Harness。它约束的不只是 Agent 生成什么代码，也约束“哪些状态能被宣称、哪些改动可以安全传播”。详见 [combo-repo-control-plane-and-release-boundaries-2026-08-04](/output/reports/combo/product/combo-repo-control-plane-and-release-boundaries-2026-08-04/)。

## Benchmarks 速览

| Benchmark | 评估维度 | 说明 |
|-----------|---------|------|
| SWE-bench Verified | 真实 GitHub issue 修复 | 最主流的 coding agent benchmark，500 个人工验证样本 |
| Terminal-Bench | 终端操作能力 | 评估 Agent 在真实终端环境中的操作能力 |
| OSWorld | 桌面 GUI 操作 | 评估 Agent 操作完整操作系统界面的能力 |
| WebArena | Web 浏览和交互 | 在真实网站上完成复杂任务 |
| τ-Bench | 工具使用可靠性 | 测试 Agent 在多轮工具调用中的鲁棒性 |
| GAIA | 通用 AI 助手能力 | 需要多步推理、工具使用、信息检索的综合任务 |
| MCPMark | MCP 协议工具调用 | 评估 Agent 通过 MCP 协议使用外部工具的能力 |

## 数据来源

- [awesome-harness-engineering](/raw/articles/harness-engineering/awesome-harness-engineering/)
- [harness-engineering-deep-research](/raw/articles/harness-engineering/harness-engineering-deep-research/)
- [managed-agents-blog-brain-hands](/raw/articles/harness-engineering/managed-agents-blog-brain-hands/)
- [managed-agents-overview-docs](/raw/articles/harness-engineering/managed-agents-overview-docs/)
- [anatomy-of-agent-harness](/raw/articles/harness-engineering/anatomy-of-agent-harness/)
- [langchain-harrison-chase-harness-interview](/raw/articles/harness-engineering/langchain-harrison-chase-harness-interview/)
- [extreme-harness-engineering-token-billionaires](/raw/articles/harness-engineering/extreme-harness-engineering-token-billionaires/)
- [openai-agents-sdk-next-evolution](/raw/articles/harness-engineering/openai-agents-sdk-next-evolution/)
- [notion-custom-agents-postmortem](/raw/articles/agent-platforms/notion-custom-agents-postmortem/)
- [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/)
- [Claude Code System Prompt 详解](/raw/articles/claude-code-research/Claude%20Code%20System%20Prompt%20%E8%AF%A6%E8%A7%A3/)
- [Superpowers Skills 架构分析](/raw/articles/claude-code-research/Superpowers%20Skills%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/)
- [0707-12-factor-agent](/raw/articles/learning-notes/12-factor-agent/)
- [claude-fable-5-finding-your-unknowns](/raw/articles/harness-engineering/claude-fable-5-finding-your-unknowns/)
- [real-world-workflow-data-rlaas-2026-07-22](/raw/articles/agent-economy/real-world-workflow-data-rlaas-2026-07-22/)
- [dsh-deepseek-harness-product-analysis-2026-08-13](/output/reports/dsh-deepseek-harness-product-analysis-2026-08-13/) — dsh 完整开源实现样本：微内核 + 事件分类法 + session log 唯一事实源 + capability seam（本地 checkout 研究，源码已删除）
- [combo-repo-control-plane-and-release-boundaries-2026-08-04](/output/reports/combo/product/combo-repo-control-plane-and-release-boundaries-2026-08-04/)

## 关键 Takeaways

1. **简单优先** — 最好的 Harness 是最简单的 Harness。Claude Code 证明单循环 + 智能委托优于复杂的多 Agent 编排
2. **Context 是第一约束** — 上下文窗口有限且注意力有衰减，Context Engineering 是 Harness 的第一支柱
3. **Verification > Generation** — 将评估推向 Computational 领域（跑测试、linter）比让 LLM 自己判断更可靠
4. **文件系统是记忆层** — Filesystem memory 简单、可审计、跨 session 持久化，优于复杂的记忆方案
5. **分离关注点** — Sub-agent 作为 context firewall，每个 Agent 只关注自己的任务域
6. **Harness assumptions expire** — 模型能力持续提升，今天的最佳 Harness 设计明天可能过度约束（Managed Agents 博客直接验证：Sonnet 4.5 context anxiety 在 Opus 4.5 上消失）
7. **Incremental > One-shot** — 增量式执行（小步迭代 + 验证）比一次性大规模生成更可靠
8. **Meta-harness > Specific harness** — Managed Agents 赌的是"未来会有想不到的 harness 形态"，所以系统要能承载它们而不是押注任何特定实现
9. **Agent-legible > Human-only codebase** — 代码库、构建系统、spec、eval、文档和质量分数都应让 Agent 能稳定读取、修改、验证
10. **Model-friendly representation** — Notion 的 Markdown/SQL 教训：不要把内部复杂度直接暴露给模型，要提供模型熟悉且足够表达任务的中间表征
11. **Unknowns are a managed state** — 计划不会消灭未知项，应在实现前、中、后用 artifact 持续暴露和记录
12. **Trajectory before training** — 先证明轨迹能稳定改善 eval / Harness，再判断是否值得 post-train
13. **Evidence layers are non-substitutable** — Issue、Local、Git、CI、Test、Production 各自只证明一层事实
14. **Snapshot before selective migration** — 混合脏分支先建立恢复点，再把获批批次迁入干净 worktree

## 关联

- [harness-to-creative](/wiki/connections/harness-to-creative/) — Harness Engineering → Creative CoWork 的设计模式映射（CLAUDE.md / feedforward-feedback / context firewall / filesystem memory / spec-driven）
- [dynamic-workflows](/wiki/concepts/dynamic-workflows/) — 把编排逻辑搬进确定性代码，是 harness「编排所有权」维度的新一级
- [unknowns-driven-agent-collaboration](/wiki/concepts/unknowns-driven-agent-collaboration/) — 围绕高影响未知项组织 Human-Agent feedback
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) — 运行证据到 Harness / 模型改进的数据回路

---
*由 LLM 从 raw/ 与 output/ 数据编译，请勿手动编辑*
