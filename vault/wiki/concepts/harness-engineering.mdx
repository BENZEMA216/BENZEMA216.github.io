# Harness Engineering（驾驭工程）

> 塑造 AI Agent 运行环境使其可靠工作的工程实践：Agent = Model + Harness，Harness 是 Agent 中除 Model 之外的一切——system prompt、tools、sandbox、memory、orchestration、verification。

## 核心要点

- Agent = Model + Harness，模型提供智能，Harness 让智能可靠
- 两类控制：Feedforward（前馈/引导，如 CLAUDE.md）vs Feedback（反馈/传感，如 tests）
- 两种执行：Computational（确定性，如 linters）vs Inferential（推理性，如 LLM-as-judge）
- Harnessability（可驾驭性）：不同代码库对 harness 的亲和度不同
- 每个 harness component 编码了对 model 能力的假设，这些假设会过期
- Managed Agents 是 Anthropic 的 **meta-harness**——对接口强势、对实现开放，支持未来任何 harness/sandbox 形态
- Brain（Claude + harness）/ Hands（sandbox + tools）/ Session（append-only 事件日志）三层解耦，各自可独立失败和替换
- OpenAI Frontier / Symphony、Notion Custom Agents、OpenAI Agents SDK 都在把 harness 从内部工程实践提升为平台原语
- Agent-legible software 成为新方向：代码库、构建系统、spec、eval、文档和 quality score 都要让 agent 能稳定操作
- Unknown discovery 是 Harness 的 human-side feedback loop：实现前找 blind spots，实现中记录偏离，实现后用 explainer / quiz 验收
- 工程交付需要 evidence ladder：Linear / issue、Local checkout、Git / PR、CI、Test 与 Production 各自只证明一层事实，不能用“已经做了”互相替代
- 混合脏分支先建立可恢复 snapshot，再把获批批次 selective migration 到干净 worktree；bulk stage 或整分支搬运会把无关状态一起扩散
- "Anytime you find an agent makes a mistake, you engineer a solution so it never makes that mistake again" — Mitchell Hashimoto

## 详细说明

Harness Engineering 是 2025-2026 年 Agent 开发中浮现的核心工程学科。它的核心洞察是：让 Agent 可靠的关键不是更强的模型，而是更好的运行环境。Model 提供原始智能——推理、生成、判断；Harness 提供结构——约束、引导、验证、恢复。两者缺一不可，但工程师能直接控制的只有 Harness。

Harness 的控制手段分为两个维度。第一个维度是方向：Feedforward 控制在 Agent 执行前引导它（system prompt、CLAUDE.md、few-shot examples），Feedback 控制在 Agent 执行后纠正它（tests、linters、human review）。第二个维度是执行方式：Computational 控制是确定性的（regex 检查、AST 分析），Inferential 控制是概率性的（LLM-as-judge、embedding similarity）。最强的 harness 同时使用四个象限。

一个容易被忽视的概念是 Harnessability——代码库对 harness 的亲和度。有清晰类型系统、完善测试套件、模块化架构的代码库天然更容易被 harness 驯服。反之，全局状态满天飞、没有测试的代码库会让最精巧的 harness 也失效。这意味着 harness engineering 不只是"给 Agent 加护栏"，还包括"让代码库本身更适合 Agent 操作"。

Claude Code 本身就是一个成熟的 harness 实现：它的 system prompt 是 feedforward，hooks 是 feedback，permission system 是 computational control，而 model 的自我纠正能力是 inferential control。Superpowers Skills 在此基础上增加了 discipline layer——通过标准化的 workflow pattern（brainstorm → plan → execute → verify）进一步约束 Agent 行为。

2026 年 Anthropic 推出 Managed Agents，将 Harness Engineering 提升到 meta-harness 层面。核心思路借鉴 OS 虚拟化：正如 `read()` 系统调用不关心底下是 70 年代的磁盘还是现代 SSD，Managed Agents 的接口（Agent / Environment / Session / Events）不关心底下跑的是什么 harness 实现。Brain（Claude + harness）、Hands（sandbox + tools）、Session（事件日志）三层解耦——每一层都是 cattle 而非 pet，失败后可独立替换。这直接带来了：p50 TTFT 降 60%、p95 降 90%；凭证与 sandbox 物理隔离（vault + MCP proxy 解决 prompt injection 拿 token 的问题）；session 作为 context window 之外的可查询对象，避免了不可逆的 compaction 决策。

同一时间，OpenAI、Notion 和 LangChain 的材料显示 harness 正在从“让单个 agent 更可靠”的工程技巧，变成产品平台竞争的核心。OpenAI Frontier 的极端实验把 build loop、repo structure、docs、tests、quality scores 和 PR lifecycle 都改造成 Codex 可消费的系统；Notion 将复杂 block/database API 改写为模型熟悉的 Markdown / SQL，说明 agent 产品要暴露“模型容易用的表征”而不是真实内部复杂度；OpenAI Agents SDK 则把 MCP、Skills、AGENTS.md、shell、apply_patch、sandbox manifest 打包成 model-native harness。三者共同指向：未来软件不只要 human-readable，还要 agent-legible。

更强的模型并不会消除 prompt/spec 与真实环境之间的差距。Unknowns-driven collaboration 将这个差距纳入 Harness：pre-implementation 用 blind-spot pass、prototype、interview 和 reference 找到隐含约束；implementation 中用 notes 保存偏离计划的 edge case；post-implementation 用 explainer 和 quiz 让人真正理解并接管结果。这些 artifact 都是低成本 feedback，比在大规模实现后返工更便宜。

Harness 也延伸到代码交付与发布控制面。Linear / issue 保存任务意图、owner、依赖与验收口径；Local checkout 保存当前机器上的 tracked、untracked、ignored 与运行状态；Git commit / PR 保存可审查变更和合并拓扑；CI 只证明特定版本在预设条件下通过；Test 还要验证部署、配置和真实依赖；Production 则需要独立晋升、回滚与运行证据。后一个状态不能由前一个状态推导，Production 发布本身也不能证明付费、留存或业务结果。

当本地 checkout 混有多条功能线与未提交工作时，安全 Harness 不是自动合并，而是先只读审计拓扑与文件状态，建立可恢复 snapshot，按功能拆分获批批次，从目标基线创建干净 worktree，只迁移确认过的 commit / patch，再重跑对应测试与构建。这个流程把“避免误带状态”从人的临场谨慎变成可重复的工程约束。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [awesome-harness-engineering](/raw/articles/harness-engineering/awesome-harness-engineering/) | 完整资源列表，汇集 harness engineering 领域的工具、论文和实践 |
| [harness-engineering-deep-research](/raw/articles/harness-engineering/harness-engineering-deep-research/) | 深度研究报告，定义 feedforward/feedback、computational/inferential 四象限框架 |
| [managed-agents-blog-brain-hands](/raw/articles/harness-engineering/managed-agents-blog-brain-hands/) | Anthropic 工程博客：Brain/Hands/Session 三层解耦、meta-harness 设计哲学 |
| [managed-agents-overview-docs](/raw/articles/harness-engineering/managed-agents-overview-docs/) | Claude Platform 官方文档：Managed Agents 四原语 + 5 步工作流 + Beta 状态 |
| [anatomy-of-agent-harness](/raw/articles/harness-engineering/anatomy-of-agent-harness/) | LangChain 对 harness 组成的结构化定义：filesystem、bash/code、sandbox、context rot、long horizon |
| [extreme-harness-engineering-token-billionaires](/raw/articles/harness-engineering/extreme-harness-engineering-token-billionaires/) | OpenAI Frontier / Symphony：1M+ LOC、0 human-written code、agent-legible repo、ghost libraries |
| [openai-agents-sdk-next-evolution](/raw/articles/harness-engineering/openai-agents-sdk-next-evolution/) | OpenAI Agents SDK 将 sandbox、Manifest、MCP、Skills、AGENTS.md、shell/apply_patch 打包为 SDK 原语 |
| [notion-custom-agents-postmortem](/raw/articles/agent-platforms/notion-custom-agents-postmortem/) | Notion 把系统复杂度转换成模型熟悉的 Markdown / SQL，并用 eval/headroom 驱动 agent 产品 |
| [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) | Claude Code 本身就是一个成熟的 harness 实现 |
| [Superpowers Skills 架构分析](/raw/articles/claude-code-research/Superpowers%20Skills%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) | Superpowers 是 harness 的 discipline layer |
| [dai-yusen-vc-observation-ep2](/raw/articles/startup/dai-yusen-vc-observation-ep2/) | 戴雨森创投观察第2集：从 VC 视角论证 Harness 显学化——好 Harness 的数据反哺模型（Claude Code = Anthropic 数据闭环、Cursor Composer），并提出「Harness 是 OS、模型是处理器」可插拔类比 |
| [claude-code-dynamic-workflows](/raw/articles/harness-engineering/claude-code-dynamic-workflows/) | Dynamic Workflows：把编排逻辑搬进代码的确定性运行时，是 harness 在「编排所有权」维度（你 → Claude → 代码）的新一级（见 [dynamic-workflows](/wiki/concepts/dynamic-workflows/)） |
| [claude-fable-5-finding-your-unknowns](/raw/articles/harness-engineering/claude-fable-5-finding-your-unknowns/) | Anthropic 工程实践：四类 unknowns 与实现前/中/后的持续发现、记录和验收机制 |
| [trust-not-in-code-review-2026-07-27](/raw/articles/harness-engineering/trust-not-in-code-review-2026-07-27/) | 将 Code Review 定义为一次性事件，主张用 mutation testing、结构约束、缺陷聚集、分阶段发布等连续信号积累对系统的可预测性 |
| [meshy-muse-agent-legible-autonomous-development-2026-07-31](/raw/articles/harness-engineering/meshy-muse-agent-legible-autonomous-development-2026-07-31/) | Meshy Muse：agent-legible 分层、目录内文档、依赖 guardrail、CI 与 AI review 共同构成无人值守开发闭环 |
| [combo-repo-control-plane-and-release-boundaries-2026-08-04](/output/reports/combo/product/combo-repo-control-plane-and-release-boundaries-2026-08-04/) | 从近期工程 session 脱敏提炼：工作控制面、Local、Git、CI、Test、Production 的证据分层，以及脏分支 snapshot + selective migration |
| [dsh-deepseek-harness-product-analysis-2026-08-13](/output/reports/dsh-deepseek-harness-product-analysis-2026-08-13/) | DeepSeek Harness 完整开源实现样本：微内核 + 事件分类法、"model-visible ⟺ logged" 不变量、capability seam 三角色、Agent Notes 决策制度（本地 checkout 研究，源码已删除） |

## 关联概念

- [context-engineering](/wiki/concepts/context-engineering/) — Context Engineering 是 Harness 中 feedforward 控制的核心手段
- [agent-loop](/wiki/concepts/agent-loop/) — Agent Loop 是 Harness 编排的执行骨架
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — Sub-Agent 架构是 Harness 的 orchestration 维度
- [self-verification](/wiki/concepts/self-verification/) — Self-Verification 是 Harness 中最高杠杆的 feedback 控制
- [safe-autonomy](/wiki/concepts/safe-autonomy/) — Safe Autonomy 是 Harness 在安全维度的设计目标
- [tool-routing](/wiki/concepts/tool-routing/) — Tool Routing 是 Harness 中工具层的编排逻辑
- [unknowns-driven-agent-collaboration](/wiki/concepts/unknowns-driven-agent-collaboration/) — 将 map 与 territory 的差距做成可持续发现的协作回路
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) — 生产 Harness 捕获的轨迹可反哺 eval、规则、memory 与 post-training

---
*由 LLM 从 raw/ 与 output/ 数据编译，请勿手动编辑*
