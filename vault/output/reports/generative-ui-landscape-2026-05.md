<!--
date: 2026-05-27
tags: [generative-ui, genui, agent-ui, artifact, llm-ui, ai-sdk, vercel, anthropic, openai, langchain, copilotkit, thesys, tambo, ag-ui, a2ui, mcp-apps, evaluation, design2code, ui-bench]
status: active
trigger: 用户研究如何把 Agent 对话内容总结成可用应用，需要全面盘点 Generative UI 的论文 / 产品 / 博客 / 推文 / 评估体系
related:
  - "[genui](/wiki/concepts/genui/)"
  - "[skills-system](/wiki/concepts/skills-system/)"
  - "[context-container](/wiki/concepts/context-container/)"
  - "[harness-engineering](/wiki/concepts/harness-engineering/)"
  - "[frontend-agent-ui-freeze-logic-workflow-2026-05](/output/reports/frontend-agent-ui-freeze-logic-workflow-2026-05/)"
  - "[frontend-vibe-coding-practices-2026-05](/output/reports/frontend-vibe-coding-practices-2026-05/)"
  - "[agent-artifact-community-products-2026-05](/output/reports/agora/market-competition/agent-artifact-community-products-2026-05/)"
  - "[conversation-to-content-consumer-products-2026-05](/output/reports/agora/market-competition/conversation-to-content-consumer-products-2026-05/)"
-->

# Generative UI 全景研究 (2026-05)

> Query：把 Agent 对话总结成"可用的应用"绕不开 Generative UI。请帮我盘点市面上的论文、产品、技术博客、重要推文（提炼主要观点），总结现状，并调研评估方式与指标。
> 日期：2026-05-27
> 方法：5 路并行深研究（论文 / 产品 / 博客 / 推文 / 评估）+ 主线合成

---

## 0. 一句话结论

**2026 年 5 月，Generative UI 已经从"Vercel AI SDK 的一个 demo"演化为有协议、有产品、有评估体系的独立工程范式。**

收敛点是清晰的："Chat-only 是局部最优；右屏放 canvas/artifact/plan/diff、左屏放对话"已经成为 Agent 产品的默认结构。再往下，"typed component registry + tool-call → JSX 流"成为应用内 GenUI 的默认实现；"iframe + postMessage bridge"成为跨厂商扩展的默认协议（MCP Apps / OpenAI Apps SDK）；Anthropic 的 Skills、shadcn 的 registry、Vercel 的 v0 三股力量把"如何让 Agent 输出有品味的 UI"从模型问题变成 harness 问题。

仍未收敛的是：**registry / artifact / 全代码生成**三条路线的关系、**协议**（AG-UI / A2UI / MCP Apps / Open-JSON-UI）的最终格局、以及**评估体系**——目前没有 Arize/Braintrust 级别的"GenUI 选对组件、用户真用了吗"的工具，多数团队靠 LLM-as-judge + 视觉回归 + 人审拼起来用。

对"把 Agent 对话沉淀成应用"这个具体方向，核心判断是：**不要走"prompt → 一个完整 app"的全代码生成路线（v0/Bolt/Lovable 已经做得很完整），也不要走"freeform HTML artifact"路线（Anthropic 已经吃掉了），更可行的是做"对话 → 结构化 UI intent + 自家组件 registry + 跨次复用与沉淀"——把每次对话的产物聚合成可发现、可 remix 的轻量应用单元**，参考 Promptarium + Tambo + Anthropic Skills 三者的交集。

---

## 1. 现状总结：Generative UI in May 2026

### 1.1 定义与三条路线

**Generative UI 的工作定义**：用户面对的 UI 不是构建时写死的，而是 Agent 在运行时根据对话状态、工具输出或用户意图动态选择 / 生成 / 组合的。

到 2026 年 5 月，业界已经稳定分化成三条路线：

| 路线 | 代表 | Agent 输出 | 渲染机制 | 适用场景 |
|---|---|---|---|---|
| **A. Registry-Bound（受限）** | Vercel AI SDK `streamUI` / Tambo / Thesys C1 / CopilotKit / assistant-ui / LangGraph | 结构化 tool call + props (Zod schema) | 前端 resolver 映射到预注册 React 组件 | 企业内 / 品牌一致性要求高 / 安全合规场景 |
| **B. Artifact / Sandbox** | Claude Artifacts / ChatGPT Canvas / Gemini Canvas / OpenAI Apps SDK | HTML / React / SVG / Mermaid 代码块 | iframe 沙盒里直接运行 LLM 生成的代码 | 探索性任务 / 一次性工具 / "personal software" |
| **C. Full Code-Gen** | v0 / Bolt / Lovable / Replit Agent 4 / Tempo | 完整 Next.js / React 项目 | 沙盒里跑真实的 dev server | 0→1 prototype / 非工程师做 app |

CopilotKit 在 2026 Generative UI 指南里第一次把三条路线作为一个产品提供（Static / Declarative / Open-ended GenUI），意味着这种"三选一"的格局开始被默认化。

### 1.2 协议层：三套协议的"互补叙事"

之前业界预期会爆发"协议大战"，到 2026 年 5 月反而形成了互补：

- **AG-UI**（CopilotKit 主导，Google / LangChain / AWS / Microsoft / Mastra / PydanticAI 采纳）：16 种事件类型的双向 wire format，对标"in-app agent 的 HTTP"。
- **A2UI v0.9**（Google，2026-05 发布）：声明式 widget tree spec，框架无关（web / Flutter / SwiftUI），偏"UI 形状"。
- **MCP Apps**（Anthropic + OpenAI + 社区，2026-01）：iframe 沙盒 + JSON-RPC postMessage bridge，对标"跨产品 UI 扩展"。
- **Open-JSON-UI**：社区轻量 spec（cards/lists/forms）。

CopilotKit 已经把 A2UI / Open-JSON-UI 跑在 AG-UI 之上，证明三者可以协同。事实上的标准栈正在形成：**AG-UI（运行时事件） + A2UI/Open-JSON-UI（UI 描述） + MCP Apps（跨产品扩展）+ MCP（工具）+ A2A（Agent 互通）**。

> **协议层主流排序（2026-05 复核）**：不是赢家通吃，而是分层各管一段。按势头 + 落地排：
> 1. **MCP（工具层底座）**——最成熟、采纳最广，已捐给基金会，是事实标准。
> 2. **MCP Apps (SEP-1865)（UI 层整合赢家）**——2025-11-21 公布、2026-01-26 正式发布，关键不是技术优越而是**政治整合**：Anthropic + OpenAI + 社区 MCP-UI 团队没有各搞各的，而是合并成一个官方 MCP 扩展。落地客户端 ChatGPT / Claude / Goose / VS Code；启动伙伴 Asana / Box / Canva / Figma / Slack / Salesforce / monday.com / Hex。"build a mini web app 塞进 chat 宿主"这条路线已统一。
> 3. **AG-UI（in-app agent UI 传输层）**——和 MCP Apps 不是竞争而是不同层：MCP Apps 解决"第三方 app 在 chat 宿主里渲染 UI"，AG-UI 解决"你自家 app 里的 agent 把更新流式推给前端"。框架适配面最广（LangChain / CrewAI / Mastra / PydanticAI）。
> 4. **A2UI（声明式，native-first）**——方向对（跨 web/Flutter/SwiftUI）但 v0.9、偏 Google 生态，现在还不能押。
>
> 对"对话沉淀成应用"的押注建议：**接 MCP Apps（拿跨 ChatGPT/Claude/Goose/VS Code 分发）+ AG-UI（拿 in-app 传输 + 最广框架适配），A2UI 观望。**

### 1.3 厂商格局：三家 lab 的三种押注

| 厂商 | 主入口 | 押注 | 关键差异 |
|---|---|---|---|
| **Anthropic** | Claude Artifacts + Skills + Live Artifacts + Claude Design | Artifact-first，Skills 作为风格 / 行为先验 | 自家 frontend-design skill 把"消除 AI slop"从模型问题变成工程问题。**注：Anthropic 并未开源 Claude.ai 的 Artifacts 本体**（`anthropics` GitHub org 无该 repo）；开源的是社区复刻见 §1.4 与 §2.2 |
| **OpenAI** | ChatGPT Canvas + Apps SDK + Operator (agent mode) | Apps SDK 押注"ChatGPT 即分发渠道"，第三方做组件 | MCP Apps bridge 是最早工程化的 iframe + postMessage 标准 |
| **Google** | Gemini Canvas + A2UI + Gemini 3 generative UI in AI Mode | A2UI 押注"声明式 widget 跨设备渲染" | 把"每个答案都是一个定制小界面"作为 Search 默认体验 |

三家都收敛到同一个产品形态："agent 写一个小 app + 用户在原地迭代"，路径不同但终点一致。

### 1.4 主流 SDK / 产品速览（4 类共 25+ 项）

**Bucket 1 — Registry SDK**：Vercel AI SDK（事实基线，20M+ 月下载）、Tambo（typed registry + 自管 backend）、Thesys C1（GenUI as a Service，$0.01/page，300+ 团队）、CopilotKit + AG-UI（三种 GenUI 都支持，财富 500 强 10%+）、assistant-ui（"shadcn for AI chat"，~50K 月下载）、Mastra UI、LangGraph generative UI、LlamaIndex chat-ui。

**Bucket 2 — Artifact / Sandbox**：Claude Artifacts + Live Artifacts + Claude Design（闭源产品，非开源）、ChatGPT Canvas + Apps SDK、Gemini Canvas + A2UI、v0（6M+ 开发者）、Bolt.new（StackBlitz WebContainers）、Lovable（消费级 GenUI 出圈，Sabrine Matos $456K ARR 案例）、Replit Agent 4（infinite canvas 设计变体）。

> **Artifact 模式的开源复刻（2026-05 复核，重要更正）**：Anthropic **没有**官方开源 Claude Artifacts。市面上的"Claude Artifacts 开源"消息混淆了三件事——(a) Anthropic 官方未开源；(b) 一批社区开源复刻；(c) 与之无关的 Claude **Code** 2026-03-31 source map 误泄露事件。真正可用的开源复刻：
> - **[e2b-dev/fragments](https://github.com/e2b-dev/fragments)**（Apache-2.0，~6.3k star，2026-05-15 更新）：最成熟，Next.js + E2B Sandbox + Code Interpreter + shadcn + Vercel AI SDK，"完整 app 生成 + 云沙盒安全执行"路线。
> - **[CopilotKit/OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI)**（MIT，~1.3k star，2026-05-26 更新）：触发"Claude Artifacts now open source"标题的就是它；LangGraph agent 直吐 raw HTML/SVG/Canvas，前端 `useComponent` 收成 named tool call 渲染进 sandboxed iframe，"对话内联生成 artifact"路线，**与"对话沉淀成应用"最贴**。
> - 其他：[KittenYang/ai-artifacts](https://github.com/KittenYang/ai-artifacts)、[13point5/open-artifacts](https://github.com/13point5/open-artifacts)、[valyentdev/fragments-on-valyent](https://github.com/valyentdev/fragments-on-valyent)。

**Bucket 3 — Agent-native Panel**：LangGraph Studio、OpenAI Agents SDK + Operator agent mode、Anthropic Skills（17+ 官方 skill）、Manus 1.6（Design View + Mobile Development view，Meta $2.5B 收购）、Devin。

**Bucket 4 — 企业 / no-code**：Retool AI（AppGen + native Agents + RBAC/audit 默认）、Builder.io Visual Copilot + Fusion（Figma→Code 最佳保真）、Plasmic AI、Tempo Labs（YC 2026-02，60-80% 前端代码 AI 产）。

**显著缺位**：Voice + GenUI。Vapi / Retell / ElevenLabs 都把 UI 留给集成方，"语音 agent 边说边在屏幕上同步生成可视化"是清晰的产品空白。

### 1.5 五条"已成共识"的命题

到 2026 年 5 月，下列五条在业界基本已被当作 table stakes：

1. **Chat-only 是局部最优**。Linus Lee、Maggie Appleton、swyx 在 2023 年的批评成了主流共识；没有人再认真把"纯文本聊天"作为 AI 产品的默认形态。
2. **Typed Component Registry 是 in-app GenUI 的事实基线**。Zod 成了 schema 通用语；"给模型一个 kit，不给它一支画笔"是主流姿势。
3. **Skills 是新的 style guide**。Anthropic 的 frontend-design skill 把"AI slop"从模型问题转成 steering 问题；shadcn / Manus / OpenAI 都采纳 Skill 形状（markdown + scripts + assets）作为 taste / brand / project context 的单位。
4. **UI 就是审计日志**。Trust 来自"show your work"。Cursor 的 plan + diff 边栏、Manus 的 split-screen 浏览器、Shopify Sidekick 的 plan/action card、Anthropic 的 tool-call trace、Replit 的 variant canvas，模式高度一致：preview-before-commit、undo、provenance marker 已经是 agent 产品的 a11y 级基线。
5. **GenUI 的瓶颈是 harness 不是模型**。Addy Osmani 的"70% 问题"和"agent harness engineering"赢了"模型变强就够了"的辩论：design quality evaluator、taste-aware critic、skill / brand 才是质量护栏，generation is cheap, verification is the product。

### 1.6 四个未解争议

- **Registry vs Artifact vs 全代码生成**：三种哲学共存。CopilotKit 已经把三种都给你。多数产品最终会三种都提供。
- **协议碎片化能持续多久**：AG-UI / A2UI / MCP Apps / Vercel AI SDK 的传输层 / 各家私有协议并存。当前是互补叙事，但能否长期保持仍未知。
- **Ephemeral vs Persistent**：Geoffrey Litt 主张 malleable persistent personal software；Rauch / Anthropic 倾向 throwaway ephemeral apps。两边都在出货。
- **Design system 应该住在哪**：在模型（via Skills）、在 registry（via shadcn/Tambo）、还是在 renderer（via Thesys/Crayon）？

---

## 2. 资料搜集与提炼

### 2.1 学术论文（30+ 篇，分 6 个方向）

#### A. LLM 驱动的 UI 生成

- **Generative Interfaces for Language Models**（Chen et al., ACL 2026 Findings, arXiv:2508.19227）——LLM 主动生成 task-specific UI 而非文字；引入 iterative refinement + query-specific 评估 rubric；70%+ 人评偏好。**这是"agent 应该 emit interface，不是 emit text"的标准学术表述。**
- **Generative UI: LLMs are Effective UI Generators**（Leviathan et al., Google, 2026, arXiv:2604.09577）——主张现代 LLM 几乎不用 scaffolding 就能为任意 prompt 产出高质量 UI，人评压倒 markdown 输出。**Google 工业规模的可行性背书。**
- **Portal UX Agent**（Microsoft, 2025, arXiv:2511.00843）——"bounded generation"中间路线：LLM 做高层 plan，确定性 renderer 用 vetted 组件库装配。**最贴"不让模型写自由 React，但让它组合你家设计系统"。**
- **GenerativeGUI**（CHI EA 2025）——在 chat 里按需生成 HTML widget；实证 chat 形态在"detailed input"任务下退化、on-demand widget 弥补差距。**对 chat-only 产品加 GenUI 的直接动机。**
- **A Multimodal GUI Architecture for LLM Conversational Assistants**（van Dam, 2025, arXiv:2510.06223）——反向设计：通过 MCP 暴露已有 app 的导航图与语义，让 voice/chat LLM 操控既有 GUI。**hybrid 产品的有用框架。**

#### B. Screenshot / Design / Sketch → Code

- **pix2code**（Beltramelli, 2017, arXiv:1705.07962）——CNN+LSTM 从截图学 DSL token，77%。**这条线的源头。**
- **ScreenAI**（Google, IJCAI 2024, arXiv:2402.04615）——5B VLM 专攻 UI 理解，screen-annotation 预训练。**当前 UI-aware VLM 的基础。**
- **WebSight**（HF, 2024, arXiv:2403.09029）——2M 合成 HTML/截图对，Sightseer 模型；v0.2 加 Tailwind + 真实图。**开放训练集事实标准。**
- **Design2Code**（Si et al., NAACL 2025, arXiv:2403.03163）——484 个手工 curated 真实页面 + 自动 metric。**design-to-code 的标准 benchmark。**
- **WebCode2M**（WWW 2025, arXiv:2404.06369）——2.56M 真实(design, code, layout)三元组 + ViT 基线 WebCoder + TreeBLEU 结构 metric。**真实数据规模最大。**
- **Sketch2Code**（Stanford, 2024, arXiv:2410.16232）——731 手绘 sketch；passive feedback-follow vs proactive question-ask 两种 agent eval，proactive 胜出。**直接覆盖"GenUI 的对话澄清"。**
- **DCGen**（2024, arXiv:2406.16386）——分块描述再装配，复杂 layout 上分治胜端到端。
- **ScreenCoder**（2025, arXiv:2507.22827）——grounding → planning → coding 多 agent pipeline，明确把 agent decomposition 用于 GenUI。

#### C. 自适应 / 上下文感知 UI

- **SUPPLE**（Gajos & Weld, IUI/UIST 2004-2010）——决策论优化自动生成个性化 UI；functional model + cost function → optimal rendering。**LLM 时代 GenUI 的智识祖先；"abstract spec → rendered concrete UI"词汇全部源自这里。**
- **Generative and Malleable User Interfaces with Generative and Evolving Task-Driven Data Model**（Cao, Jiang, Xia, CHI 2025, arXiv:2503.04084）——不生成 UI 代码，生成 evolving task-driven data model，UI 自动从 model 渲染；NL 与直接操作都回流到 model。**避免代码再生成的脆弱性；如果你的 agent 维护结构化 world state，这是首选架构。**
- **LLM Agents as UI Adjusters for the Visually Impaired**（UbiComp 2025）——LLM 实时调字号 / 对比度 / layout，支持 chat refinement。**accessibility 楔子的具体例子。**
- **MorphGUI**（2025, ScienceDirect）——运行时 GUI 改造，活界面再皮肤化。**适合在已有 app 上叠 agent。**
- **Improving User Interface Generation Models from Designer Feedback**（2025, arXiv:2509.16779）——designer-in-the-loop preference model 改进 UI 生成。**UI 版 RLHF。**

#### D. Tool-augmented UI / 结构化输出

- **SpecifyUI**（Chen et al., 2025, arXiv:2509.07334）——SPEC 中间表示：结构化、参数化、层级化的 IR，UI 元素作为可控参数；16 designer 用户研究证 SPEC 胜 one-shot prompt。**"结构化 IR 才能让 GenUI 可迭代"。**
- **PrototypeFlow**（Yuan et al., TOCHI 2024, arXiv:2412.20071）——多模态输入 + 设计师可直接编辑 AI 输出 + intent clarification。**针对"prompt 欠规定"问题。**
- **A Roadmap for Tamed Interactions with LLMs**（2025, arXiv:2510.24819）——控制 LLM 输出 / structured generation / validation 综述。**"为何 structured + schema-validated 是生产 GenUI 主流"的背景。**

#### E. Agent + UI 共设计

- **On the Regulatory Potential of UIs for AI Agent Governance**（Feng et al., RegML @ NeurIPS 2025, arXiv:2512.00742）——分析 22 个部署 agent 系统，提炼 6 种有 regulatory leverage 的设计模式（如 editable agent memory）。**第一份"agent UI 里有什么"的系统 taxonomy。**
- **Designing The Internet of Agents (HAX)**（2025, arXiv:2512.11979）——多 agent 共享一个用户 surface 时的三阶段设计框架。
- **2025 AI Agent Index**（2026, arXiv:2602.17753）——30 个部署 agent 系统的多维 catalog。**经验主义 grounding。**
- **Trust in Transparency**（2025, arXiv:2510.04968）——可解释性 surface 对 trust 与决策质量的影响。**透明度 widget 的证据基。**
- **Survey of UI Design and Interaction Techniques in Generative AI Applications**（Adobe Research, 2024, arXiv:2410.22370）——生成 AI 应用里 UI 模式的 taxonomy（suggestion strip、regeneration、infill 等）。**命名 UI 模式的参考。**

#### F. GenUI 的评估

- **UI-Bench**（Jung et al., 2025, arXiv:2508.20410）——10 工具 × 30 prompt → 300 站点 × 4000+ 专家成对评，TrueSkill 排名，公开 leaderboard。**ship GenUI 产品后实际会被对标的活 leaderboard。**
- **DesignBench**（Xiao et al., 2025, arXiv:2506.06251）——900 webpage × React/Vue/Angular/HTML × {generate, edit, repair}。**最具可操作性的"选哪个模型"benchmark。**
- **GEBench**（2026, arXiv:2602.09007）——把图生成模型当 GUI 环境评，GE-Score 多维 rubric。
- **FrontendBench**（2025, arXiv:2506.13832）——自动评估前端开发，含功能正确性。
- **Qualitative Evaluation of LLM-Designed GUI**（2026, arXiv:2601.22759）——专家定性发现：layout 强、accessibility / interactive behavior 弱。

#### G. 评估空白（学术视角）

文献在 design→code 静态转换、one-shot 生成上已经成熟，但在四个方向仍很薄：(1) 对话状态 → UI 的绑定（turn t 生成的 UI 在 t+1 如何持久 / 变更 / 替换）；(2) 流式 / partial UI 的质量；(3) "bounded generation" vs "free generation"的实证对比；(4) cross-turn UI 作为 memory surface。

---

### 2.2 产品 / SDK（4 类共 25+ 项）

#### Bucket 1：Registry SDK

| 产品 | 一句话定位 | GenUI 机制 | 状态 / 关键差异 |
|---|---|---|---|
| **Vercel AI SDK** (`streamUI`, AI SDK 5) | 默认 TS GenUI 栈 | tool 返回 RSC（不是 string），token-by-token stream | GA / OSS, 20M+ 月下载；事实基线，其他多数 SDK 与之 interop |
| **Tambo** (tambo.ai) | fullstack GenUI SDK | Zod schema 自动转 tool def；区分"generative components"vs"interactables"；MCP 原生 | OSS + Tambo Cloud，自带 backend orchestration |
| **Thesys C1** | GenUI as Service | HTTP API 返回 JSON UI spec，`<C1Chat>` / `<C1Component>` 渲染 | $0.01/page，300+ 团队，唯一"managed GenUI" |
| **CopilotKit + CoAgents** | 三种 GenUI 都给你 + AG-UI | Static (registry) / Declarative (A2UI) / Open-ended (MCP Apps) 三模式 | OSS，Fortune 500 10%+ 采用；拥有最广泛采纳的协议 |
| **assistant-ui** (YC W25) | "shadcn for AI chat" | headless React primitives + tool render 内联 | ~50K 月下载，OSS；最流行的"自己拼 chat"基线 |
| **Mastra UI** | TS agent framework + ref GenUI | Mastra + Vercel AI SDK 渲染；agent network 可视化 | OSS / GA |
| **LangGraph generative UI** | graph node 是 UI 发射单元 | `push_ui_message` / `typedUi().push()`；`LoadExternalComponent` 加载 | GA / OSS，被 Replit / Uber / LinkedIn / GitLab 采用 |
| **LlamaIndex chat-ui + Server** | workflow 事件 → React | 同时支持结构化事件 GenUI 和 runtime JSX-string GenUI | OSS / GA |
| **AG-UI Protocol** | 跨厂商运行时协议 | 16 种事件类型双向 stream；非 UI framework 本身 | OSS，Google / LangChain / AWS / MS / Mastra / PydanticAI 全部适配 |

#### Bucket 2：Artifact / Sandbox

| 产品 | 一句话定位 | 关键差异 |
|---|---|---|
| **Claude Artifacts + Live Artifacts + Claude Design** | Artifact 范式的开创者 | 2026 新增 Live Artifacts（数据源自动刷新）+ artifact 内调 Claude API 形成"intelligent micro-apps"；Claude Artifacts 参考实现 2026-05 开源 |
| **ChatGPT Canvas + Apps SDK** | OpenAI 的两面押注 | Canvas 是 chat-side 编辑器；Apps SDK 是第三方 in-ChatGPT 应用：MCP server + UI bundle 跑在 iframe，MCP Apps bridge 通信 |
| **Gemini Canvas + A2UI** | Google 的声明式 GenUI 押注 | A2UI v0.9（2026-05）跨设备框架无关 widget spec；AI Mode 默认就是 generative UI |
| **v0** (Vercel) | text-to-React，6M+ 开发者 | 输出 Next.js + Tailwind + shadcn 真实代码；v0 Platform API 让第三方嵌入 v0 生成能力 |
| **Bolt.new** (StackBlitz) | 浏览器内完整 dev server | WebContainers (WASM Node) 全部在浏览器；Bolt Cloud 加 Postgres / 边缘函数 |
| **Lovable** | 消费级 GenUI | 2026-03 从 app builder 转通用工作工具；mobile 2026-04 出货；非开发者达消费规模的代表 |
| **Replit Agent 4** | infinite canvas 设计变体 | "Generate variants" 任意元素出替代方案，写回生产代码 |

#### Bucket 3：Agent-native Panel

- **LangGraph Studio / LangSmith Playground**：graph node + 即将 push 的 UI 共可视化
- **OpenAI Agents SDK + Operator (agent mode)**：operator.chatgpt.com 已退役，并入 ChatGPT agent mode
- **Anthropic Skills**：17 个官方 skill，metadata 100 token + body <5K 懒加载；`/frontend-design`、`/canvas-design`、`/ui-design:color-palette` 是 Claude 生成 UI 风格的关键先验
- **Manus 1.6**：Design View + Mobile Development view；Web + Desktop + Telegram / WhatsApp / LINE / Slack 多 shell；Meta 2025-12 以 $2.5B 收购
- **Devin (Cognition)**：dashboard 非生成式，但 plan / 思考 / PR-merge bar 由 agent state 动态组合

#### Bucket 4：企业 / No-Code

- **Retool AI**：AppGen + AI Assist + native Agents，输出 Retool visual component model（非工程师可继续编辑）；RBAC / audit / 合规默认
- **Builder.io Visual Copilot + Fusion 1.0**：Figma → 多框架代码最高保真；Fusion 把 Slack / Jira ticket 直接转 PR
- **Plasmic AI**：定位向"headless visual CMS + AI-ready"漂移，被 Builder Fusion + v0 超越
- **Tempo Labs**：YC 2026-02，60-80% 前端代码 AI 产，bidirectional 设计↔代码循环

#### 协议层（速查表）

| 协议 | 拥有者 | 角色 | 状态 |
|---|---|---|---|
| **AG-UI** | CopilotKit + 采纳者联盟 | 双向 runtime wire format，16 事件类型 | OSS，广泛采纳 |
| **A2UI** | Google | 声明式 widget tree spec，框架无关 | v0.9 public preview, 2026-05 |
| **MCP Apps** | MCP project（Anthropic + 合作者） | MCP 的 iframe UI 扩展，sandboxed postMessage | Live；ChatGPT / Claude / Goose / VS Code 支持 |
| **Open-JSON-UI** | 社区（CopilotKit-aligned） | cards / lists / forms JSON spec | 与 A2UI 并行采纳 |
| **MCP-UI** | 社区 | MCP Apps 前身 | OSS，并入 MCP Apps |

---

### 2.3 技术博客与工程笔记（按 6 大主题分组）

#### Theme 1：The Case for GenUI（为什么 chat 不够）

- **swyx, "[It's Time To Build AI | UX](https://www.latent.space/p/build-ai-ux)"**（2023-04）——LLM 的 capabilities overhang 需要新 UI 范式；"AI UX 是独立学科"。
- **Linus Lee, "Generative Interfaces Beyond Chat"**（2023-05，反复被引用）——知识工作不是文本生成；chat 把高维思考压成一进一出；canonical "chat is not the future"。
- **Maggie Appleton, "[Language Model Sketchbook](https://maggieappleton.com/lm-sketchbook)"**（2023-）——chatbot 无 affordance；sketch many non-chat interfaces；Daemons / Branches / Reasonable explanations 词汇被沿用。
- **Geoffrey Litt et al., "[The Future of Malleable Software](https://www.inkandswitch.com/essay/malleable-software/)"** (Ink & Switch, 2025-05)——application 模型已破；LLM 终于让用户运行时重塑工具变得可能。**为什么 GenUI 重要的最严肃论述。**
- **Google Research, "Generative UI"**（2025）——大多数 prompt 的正确答案不是文字而是定制小界面；Gemini "dynamic view" + Search AI Mode。

#### Theme 2：Implementation Patterns

- **Vercel, "[Introducing AI SDK 3.0 with Generative UI](https://vercel.com/blog/ai-sdk-3-generative-ui)"**（2024-03）——开源 v0 的 GenUI tech 为 `streamUI`；tool call 返回 RSC，inline stream。**最被复制的实现模式。**
- **Vercel / Lee Robinson, "[Announcing v0: Generative UI](https://vercel.com/blog/announcing-v0-generative-ui)"**（2023-10）——prompt → shadcn/ui + Next.js 真代码（不是截图 / HTML）；bootstrap 了 shadcn 作为 AI 设计系统。
- **Thesys, "[Building the First Generative UI API](https://www.thesys.dev/blogs/generative-ui-architecture)"**（2025-04）——C1 + Crayon 把 GenUI 抽出来做协议层。
- **LangChain, "[How to implement generative UI with LangGraph](https://docs.langchain.com/langsmith/generative-ui-react)"**（2025）——agent state 驱动 UI；UI 以 graph state 节点为 key 渲染。
- **CopilotKit, "[Introducing AG-UI: The Protocol Where Agents Meet Users](https://www.copilotkit.ai/blog/introducing-ag-ui-the-protocol-where-agents-meet-users)"**（2025）——16 种事件类型；agent runtime ↔ frontend 标准。
- **Tambo, "Introducing Tambo 1.0"**（2026）——Zod schema 注册 + interactable vs generative 分离。
- **Michael Livschitz, "Reverse-engineering Claude's generative UI — then building it for the terminal"**（2026）——最佳公开 Claude GenUI 技术尸检 + 移植到 TUI。

#### Theme 3：UX 原则（信任、透明、撤销、canvas vs chat）

- **swyx + Linus Lee, "Building the AI × UX Scenius — with Linus Lee of Notion AI"**（2024）——Notion 的主交互不是 chatbot，是 select-text-and-transform；surface > conversation；affordance > prompt。
- **Roger Wong, "Generative UI and the Ephemeral Interface"**（2025-11）——"ephemeral interface"成词；GenUI 打破 50 年 UX heuristic（一致性、可学性、空间记忆）。
- **UXmatters, "Designing AI UIs That Foster Trust and Transparency"**（2025-04）——Trust = Transparency + Control + Predictability；provenance、preview-before-commit、撤销作为基线。
- **Emerge Haus, "The New Dominant UI Design for AI Agents"**（2025）——chat 左 + live surface 右的 split-screen 是 Manus / Devin / ChatGPT Agent / Cursor / Replit 的共识。
- **Shopify Engineering, "Sidekick's Improved Streaming Experience"**（2025）——把 streaming token 换成 streamed structured progress UI（cards / plans / live diff），可量化的 engagement 提升。

#### Theme 4：Skills / Component Library for Agents

- **Anthropic, "[Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)"**（2026）——LLM 收敛到"Inter + 紫色渐变 + 玻璃 card"是 distributional bias；前端设计 skill 把美学选择映射到 code 原语并显式 ban 反默认。**把 AI slop 重新定义为可解决工程问题的里程碑。**
- **Anthropic, "[Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)"**（2025-10）——Skill = 文件夹 + SKILL.md + 脚本 / 资源；progressive disclosure；可组合 skill pack。
- **shadcn/ui [Skills](https://ui.shadcn.com/docs/skills) + 2026-03 update**——component library 不再是 JS 包，是 AI context layer；告诉 agent 项目 framework / Tailwind 版本 / alias / icon / 已装组件。
- **Manus, "Manus AI Embraces Open Standards: Integrating Agent Skills"**（2026）——adopt Anthropic skill 格式做跨产品 portability。
- **OpenAI, "Build your ChatGPT UI — Apps SDK"** + **"15 lessons learned building ChatGPT Apps"**（2025-2026）——iframe 沙盒 + MCP Apps bridge；鼓励"component-shaped, not page-shaped"设计。

#### Theme 5：反模式 / 警告

- **Puck, "[AI Slop vs Constrained UI](https://puckeditor.com/blog/ai-slop-vs-constrained-ui)"**（2025）——自由生成产生 slop 因为无语法；constrained registry（block + props 白名单）在质量 / a11y / 一致性都胜出。**支持 registry 范式的最强论据。**
- **Addy Osmani, "[AI's 70% Problem](https://zed.dev/blog/ai-70-problem-addy-osmani)"**（2025）——AI 写完 70% 很快，最后 30%（边界情况 / 空态 / focus management / a11y / 集成）是用户实际生活的地方。**"the final mile"的标准引用。**
- **Addy Osmani, "Agent Harness Engineering"**（2026）——GenUI 质量主要是 harness 问题，不是模型问题；design-quality evaluator + multi-day memory + taste-aware critic + coordinator over specialist agents。
- **Daily AI World, "Killing AI Slop"**（2026）——Anthropic frontend-design skill 在真实 brief 上的实操；"anti-default"作为手艺。

#### Theme 6：产品案例

- **Anthropic, "Build Artifacts"** + **Simon Willison, "Everything I built with Claude Artifacts this week"**（2024-25）——Artifacts 让用户为每个问题起 throwaway tool；Anthropic 称 500M+ artifact 已被创建。
- **Shopify Engineering, "Building production-ready agentic systems: Lessons from Sidekick"**（2025）——plan / action 作为一等 UI，不是 chat text。
- **Cursor, "Introducing Cursor 2.0 and Composer"**（2025-10）——files 不再是主对象，agents 才是；diff 作为主 canvas。
- **Replit, "Introducing Replit Agent 4"**（2026）——设计 + code 在一个 canvas；infinite canvas variants；视觉变体选择即控制。
- **Manus, "Context Engineering for AI Agents"**（2025）——长跑 agent UI 的连贯感是 context engineering 下游产物；KV-cache 稳定 / tool 命名前缀 / FS-as-memory / 保留 mistake。
- **Sequoia × Rauchg, "Building the Generative Web with AI"**（2025）——web 从 documents 走向 ephemeral apps；React 作为通用目标。

---

### 2.4 推文 / X 讨论（按 8 个主题分组）

> Method note：X 后 API 受限，参与度不再可公开抓取；"influential"按二次引用判断。下面有 URL 的是直接验证过的。

#### Theme 1：Chat is the wrong UI

- **@Wattenberger** 2024-02 "Why chat is not the future"——chat 无 affordance 无空间记忆；"humans and AIs are both multimodal: we can talk and point at the same time"。
- **@CopilotKit** 2025 末 "[UI is Dead. Long Live Generative UI](https://x.com/CopilotKit/status/2049886940292587665)"——把 slogan 定住。
- **@karpathy** 2025-06 YC AI Startup School "Software 3.0"——partial autonomy UI + control slider + generate-and-verify loop；"agents are blind to beautiful UI because they live in the CLI"。
- **@amasad** 2024-25 反复——"users start with pure natural language, but the UI sort of unfolds as you're talking to it"；Replit Agent 4 launch 印证。
- **Allen Pike, "Post-Chat UI"**（2025）——"post-chat" 词汇入 Twitter lexicon。

#### Theme 2：streamUI / RSC / Generative UI primitives

- **@rauchg** 2024-03-14 "[Generative UI with the AI SDK 3.0 to go beyond text-only docs Q&A](https://x.com/rauchg/status/1764805530424357237)"——"Generative UI"作为 Vercel-branded category 入主流。
- **@leeerob** 2024-04-09 "[Google Gemini + Vercel AI SDK chatbot template](https://x.com/leeerob/status/1778121817959333890)"——book-a-flight 演示成 canonical GenUI 截图。
- **@shuding_** 是 streamUI 工程作者，commit 串是技术锚。
- **@rauchg** 2023-10-11 v0 launch tweet——3 周 10 万 waitlist；"Generative UI"作为 Vercel-owned phrase 的起点。
- **@hwchase17 / @LangChainAI** 2025 多次——LangGraph Generative UI / `useStream` React hook。

#### Theme 3：Artifacts 与 Canvas 作为新 surface

- **@alexalbert__** 2024-06 Artifacts launch demo "Artifacts has so much potential as a new UX paradigm"。
- **@alexalbert__** 2024-08-27 "[The State of Claude Artifacts](https://x.com/alexalbert__/status/1828869275710579026)" walkthrough。
- **@alexalbert__** 2024-06-23 "[creating software that would never be written otherwise](https://x.com/alexalbert__/status/1805261958134055409)"——为 personal software 运动奠基。
- **@alexalbert__** 2024-10-24 "[Claude can now write and run code… render interactive visualizations as Artifacts](https://x.com/alexalbert__/status/1849471363456577806)"——Artifacts 从 HTML preview 到 generative analysis surface。
- **OpenAI / @sama** 2025-10-06 DevDay Apps SDK——"apps inside ChatGPT… distribution"。
- **Google DeepMind / blog** 2025-11-18 Gemini 3 + "generative UI in AI Mode"——"每个答案是一个定制小界面"。

#### Theme 4：Skills, shadcn-as-API, component-registry-as-API

- **@shadcn** 2024-25 多次——shadcn registry 作为 AI 工具的组合单位；2025-08 CLI 3.0 + MCP server 把 v0 / Lovable / Cursor / Windsurf / Claude Code 串起来。
- **@alexalbert__** 2025-10-17 "[Skills are a glimpse into how much capability is already inside current models](https://x.com/alexalbert__/status/1979577547575951616)"——Skills 把 AI slop 到 branded UI 的差距闭合。
- **@nutlope** 2024-08 "[LlamaCoder](https://x.com/nutlope/status/1819445838705578091)" 与 2025-01 [v2](https://x.com/nutlope/status/1876673438057898221)——证明 Artifacts 不是 model-specific。
- **@thesys_dev** 2025-04-18 "C1, the world's first API built for Generative UI"——GenUI 作为 infrastructure category。
- **@CopilotKit** 2025 AG-UI Protocol launch——"HTTP for agent-UI sync"。

#### Theme 5：Personal software / Malleable UI / Tools for thought

- **@geoffreylitt** 2024-07-08 "[Ephemeral software with shared data](https://x.com/geoffreylitt/status/1810442615264796864)"——"AI 用来建 personal software → 下一代 data architecture without cloud silos"。HCI 阵营最被引用单条。
- **@MaggieAppleton** 2024-25 "Home-Cooked Software and Barefoot Developers"——非工程师为自己造 one-off 工具的道德论据。
- **@thesephist** 2023-12-13 "[Gemini generative interface 很有意思](https://x.com/thesephist/status/1735029691319509340)"。
- **@swyx** 2024-26 系列——"AI capabilities overhang → AI UX is the unlock"；"UX is the moat"成 category cliché。

#### Theme 6：批评 / 怀疑

- **Puck team, "AI Slop vs Constrained UI: Why Most Generative Interfaces Fail"**（2025）——"purple gradient on white, Inter everywhere, glossy-but-hollow"；constrained generation 反击的源头。
- **@baldur** 2026-01-20——anthropomorphism-induced delusion；2026 最被引的 anti-GenUI 立场。
- **Trilogy AI, "Fixing Visual AI Slop"**——AI coding agent 前端设计标准化的引子。
- **@nikitabier** 2024-25 "AI portrait 一周高 churn"——novelty GenUI ≠ retention 的隐性批评。

#### Theme 7：Voice + GenUI

- **@VapiAI** 2025-05 changelog——`assistant.speechStarted` 事件让任意 UI 跟 assistant 音频同步。
- **OpenAI Realtime API + Apps SDK** 2025-10——voice-driven GenUI in ChatGPT 成 recurring demo（订票、购物）。

#### Theme 8："every app will have a GenUI"

- **Jakob Nielsen, "18 Predictions for 2026"**（2025-12）——"2026 is the year we start the shift to Generative UI"。
- **@amasad** 2025-08 Replit Agent 4——"infinite canvas, parallel agents, ship working apps, sites, slides"。
- **@rauchg** Sequoia "Training Data" podcast 2025——"the speed at which you deliver this user interface is king"。
- **Manus 1.6 launch** + Meta $2.5B 收购（2025-12）——"GenUI is now a strategic asset"。
- **9to5Google, "Gemini's generative UIs are the future of 'there's an app for that'"**（2025-11-25）——直接挑战 Apps SDK / Artifacts 的"kill the app store"叙事。

#### Top 10 最被复述的 soundbite

1. *"UI is Dead. Long Live Generative UI."* — @CopilotKit
2. *"Software 1.0 you wrote it. Software 2.0 you trained it. Software 3.0 you just ask it."* — @karpathy
3. *"Artifacts has so much potential as a new UX paradigm."* — @alexalbert__
4. *"Niche apps that only a few people will ever use — but those people love them."* — @alexalbert__
5. *"Humans and AIs are both multimodal: we can talk and point at the same time."* — @Wattenberger
6. *"Agents are blind to beautiful UI because they live in the CLI, not the canvas."* — @karpathy
7. *"What if AI personal software leads to a next-gen data architecture without cloud silos?"* — @geoffreylitt
8. *"The speed at which you deliver this user interface is king."* — @rauchg
9. *"Smart software deserves a smarter interface."* — @thesys_dev
10. *"Every answer becomes a bespoke micro-interface — and when the task is done, the interface dissolves."* — 流传于 Gemini 3 + Nielsen 2026 之后

---

## 3. 评估体系：怎么判断 GenUI 是"好"的

### 3.1 七大指标家族总览

| 家族 | 它捕捉什么 | 它漏掉什么 |
|---|---|---|
| **A. 视觉保真度**（Design2Code / WebCode2M / WebGen-V / CLIP-DINO-SSIM / TreeBLEU）| 渲染与 reference 视觉接近度；layout / text / color 准确度；DOM 结构 recall | 交互性、runtime correctness、intent 对齐、"没有 reference 时的好设计" |
| **B. 功能 / 任务完成**（WebArena / VisualWebArena / Mind2Web 2 / WebGen-Bench / UXAgent）| UI / app 对人或 agent 任务是否真能用；long-horizon correctness | 美学、a11y、情感反应 |
| **C. 组件 / 语义正确性**（schema / registry-pick / runtime / axe / A11yN / Web Codegen Scorer）| 硬结构 / 安全属性：能不能 parse / build / render / 选对组件 / 过 a11y | 用户是否真要 |
| **D. 人评质量**（Anthropic rubric / Nielsen / Impeccable Slop / UI-Bench / Design Arena / WebDev Arena）| 主观设计质量、原创、taste、anti-slop | 不可复现；规模化贵；评委 taste 漂移 |
| **E. LLM-as-judge**（MLLM-as-UI-Judge / 分解 rubric / render-and-judge / Agent-as-a-Judge）| 用结构化 rubric 规模化代理人评 | 位置 / 长度 / self-enhancement bias；同模型族 collusion |
| **F. Agent-UI 耦合**（intent 对齐 / trust calibration / TTFT-TTFP / 流稳定性）| 只在 agentic GenUI 里才存在的：匹配 agent 意图、校准 trust、流畅 stream | 任一静态 render 的质量 |
| **G. 新兴**（UIX 生成-vs-chat / DesignBench / UI2Code^N / 视觉回归 / Skill-artifact eval）| chat-vs-GenUI 投放、框架覆盖、迭代 polish、回归、packaged skill 质量 | 标准化仍在流动 |

### 3.2 28 个关键 benchmark / metric（速查）

> 完整方法、强弱项见附录引用；这里只列入选项。

**A. 视觉保真度**
- A.1 **Design2Code**：CLIP + block-match (matched area / text / color CIEDE2000 / position)，484 真实页面，人评校准
- A.2 **WebSight**：2M 合成对，VLM 训练 + 评测
- A.3 **WebCode2M + TreeBLEU**：2.56M 真实三元组；TreeBLEU = DOM 1-height 子树匹配率
- A.4 **WebGen-V Bench**：分 section 的多模态评测
- A.5 **Web2Code (WCGB + WUB)**：render-back + GPT-4V 评分
- A.6 **CLIP / DINO / SSIM / LPIPS / MSE**：通用视觉相似度
- A.7 **Layout IoU / OCR 准确度**

**B. 功能 / 任务完成**
- B.1 **WebArena**：14.41% (GPT-4) → 78.24% (人) → ~60% (SOTA)
- B.2 **VisualWebArena**：910 任务多模态
- B.3 **Mind2Web 2 (Agent-as-a-Judge)**：tree-rubric（平均 50 节点 / 最大 603），judge agent 可 browse + 事实核查
- B.4 **WebGen-Bench**：101 instruction / 647 test case；最佳组合 27.8%，WebGen-LM-32B 38.2%
- B.5 **UXAgent**：LLM persona 当用户做 usability test

**C. 组件 / 语义正确性**
- C.1 **Schema 一致性**：Zod / JSON-schema / A2UI / AG-UI 验证
- C.2 **Component-pick accuracy**：tool-call 评估方法挪到 UI
- C.3 **Runtime / render error rate**
- C.4 **a11y lint pass rate**：axe-core / Pa11y / Lighthouse，自动只覆 30-40% WCAG
- C.5 **A11yN reward**：severity 加权 a11y reward；降低 60% inaccessibility rate（保视觉）
- C.6 **Web Codegen Scorer**（Google / Angular）：build + runtime + a11y + security + best practices + LLM-judge 综合

**D. 人评质量**
- D.1 **Anthropic 4-criterion rubric**：Design Quality / Originality / Craft / Functionality 加权（Originality 0.2）；评测 agent 用 Playwright MCP 真交互再评；few-shot anchored；AI-slop 罚分
- D.2 **Nielsen heuristics for GenAI**：10 条改写到 agentic / generative UI
- D.3 **Impeccable Slop catalog**：37 条 anti-pattern（紫蓝渐变 / glassmorphism orbs / 渐变标题 / 彩色左边框 card / dark+neon / monospace 滥用）；25 条决定式 + 12 条 LLM critique；Chrome ext + Claude Code skill
- D.4 **UI-Bench**：10 工具 × 30 prompt × 300 站 × 4000+ 专家成对；TrueSkill
- D.5 **Design Arena**：crowd 成对 + Bradley-Terry → Elo；50+ LLM / 12+ image model，2 小时更新
- D.6 **WebDev Arena / Text Arena**：成对偏好挪到 web-app 生成

**E. LLM-as-judge**
- E.1 **MLLM-as-UI-Judge benchmark**：30 界面 × 3 MLLM 评，对不同维度对齐度不同
- E.2 **分解 rubric + few-shot judging**：人评一致 80-90%；需主动 mitigate position / length / self-enhancement / authority bias
- E.3 **Render-and-judge**：HTML → 截图 → MLLM 对比 reference
- E.4 **Agent-as-a-Judge with tool access**

**F. Agent-UI 耦合**
- F.1 **Agent-intent alignment**：UI 是否准确呈现 agent 即将执行的 action（目前无公开 benchmark，CopilotKit / AG-UI 集成测试代理）
- F.2 **Trust calibration**：用户主观 trust 与 agent 客观可靠性的对齐；Confident/Likely/Uncertain 显示 vs ground-truth accuracy
- F.3 **Latency**：TTFT（200-500ms）/ TTFP / TTI（<1.5s）；StreamingEval (arXiv 2603.21493) 联合标准化
- F.4 **流稳定性 / flicker**：DOM diff @ chunk 边界；CLS-style

**G. 新兴**
- G.1 **UIX / Generative-Interfaces benchmark**：100 query / 10 domain，人选 gen-UI vs chat，70%+ 偏好 gen-UI
- G.2 **DesignBench**：900 webpage × {React/Vue/Angular/HTML} × {generate/edit/repair}
- G.3 **UI2Code^N**：multi-turn polish，4 轮 +12%
- G.4 **视觉回归**：Chromatic / Percy / Applitools / BackstopJS / Autonoma
- G.5 **Skill / artifact 级评估**：Anthropic generator-evaluator harness；ArtifactHub / Promptarium 社区投票

### 3.3 推荐评估栈（cost / fidelity 分层）

> 给"在 Agent 对话上做 GenUI"的产品的实操栈，由 cheap-fast 到 expensive-slow 排列：

- **Layer 0（每次生成，毫秒）**：UI-intent spec 的 schema 校验、组件 prop 类型检查、headless DOM 烟雾渲染。失败立即回灌给模型自纠。
- **Layer 1（每次生成，秒）**：axe-core + Impeccable Slop 决定式规则（25/37，<2s 出可操作反馈）；夜测加 Web Codegen Scorer 全 pipeline；流式 GenUI 加 TTFT / TTFP / 类 CLS flicker。
- **Layer 2（每发布 / 每 PR）**：Chromatic / Playwright 视觉回归 against 基线；有 reference 时算 CLIP+DINO+TreeBLEU 三件套捕静默漂移。
- **Layer 3（每发布）**：用 Anthropic 4-criterion rubric 做 LLM-judge（给 judge Playwright MCP 让它真交互再评）；swap A/B 位置 + few-shot anchor + 分解；在保留 30 个 UI 样本上跟踪 judge-vs-人校准（MLLM-as-UI-Judge 方法）。
- **Layer 4（每发布）**：自建 WebGen-Bench-style 50 个代表性 user intent + 程序化检查；agentic flow 用 Mind2Web-2 树状 judge agent 验证"用户 / agent 真完成了任务吗"。
- **Layer 5（每月）**：内部专家用 UI-Bench TrueSkill 方法成对 A/B；上 Design Arena / WebDev Arena 拿外部诚实信号。
- **Layer 6（每季度）**：trust calibration 纵向研究、override / undo 率、任务完成速度、留存——只有这一层能抓到"rubric 9/10 但用户不信任"。

**关键跨层实践**：所有评估按 model + prompt + code SHA 版本化归档，建发布级 dashboard 抓回归。

### 3.4 评估空白（必须自己写 benchmark 的方向）

1. **Agent-intent alignment**：schema 有效告诉你形状对，但没人告诉你语义跟 agent plan 对得上。
2. **纵向用户 trust**：F.2 理论好但缺纵向公开 benchmark。
3. **规模化 originality**：模式检测必然进入 evasion 竞赛。
4. **跨 render stability / identity**：会话级"还是同一个 UI"无 metric。
5. **多 turn polish 质量**：UI2Code^N 只测固定 reference 上的 polish。
6. **认知负荷 / 情感**：UIX 提及但缺可靠 proxy；MLLM judge 在情感 / 感知维度跟人发散。
7. **a11y 超出 axe-core 的部分**：键盘 / 屏幕阅读器叙事 / 认知 a11y 仍靠人。
8. **Counterfactual 质量**：GenUI vs 手写 static UI 同任务对比几乎无 benchmark；UIX 只比 GenUI vs chat。
9. **评估器 collusion**：cross-family judging（≥2 judge family）尚未制度化。
10. **成本调整后的质量**：没 benchmark 按 token / 延迟 / dollar 归一化；9/10 $0.50 15s vs 8/10 $0.02 1s 不可直接比。

---

## 4. 对 BENZEMA / "对话沉淀成应用"方向的产品启发

把上面的全景应用到"如何把 Agent 对话内容总结成可用应用"这个具体方向，给五条判断：

### 4.1 不要做的三件事

1. **不要做又一个全代码生成 builder**（v0 / Lovable / Bolt / Replit Agent 4 已经做到消费规模，护城河已被 Vercel / StackBlitz / 模型厂卡住）。
2. **不要做另一个 freeform HTML artifact 平台**（Anthropic Artifacts 500M+ 创建，分发也在 Claude 里；本体闭源，但开源复刻已很多——E2B Fragments / CopilotKit OpenGenerativeUI 等，再做一个没差异化）。
3. **不要重写又一个 streamUI primitive**（Vercel AI SDK 已是事实基线；做不会比它更好）。

### 4.2 真正的空白：跨次对话的产物聚合 + Registry

机会在三个产品边界的**交集**：

- **Promptarium 形态**：跨工具上传单文件 HTML artifact、live preview + 投票 + 源码对比；但只是 directory 不是 agent-native。
- **Tambo 形态**：typed component registry + 自管 backend；但只服务 in-app 单次对话。
- **Anthropic Skills 形态**：风格 / 行为先验包，跨次复用；但只在 Claude 一家。

把三者交集化：**"对话 → 结构化 UI intent → 你家组件 registry → 跨次复用与沉淀，并且产物可被发现 / remix"**。

这跟你之前的 `agent-artifact-community-products-2026-05` 那条线吻合：MVP 最窄切口是"上传一个 AI 生成的 self-contained HTML artifact → 自动渲染截图 + live preview + prompt/source 展示 + remix 按钮"，但 2026 年的关键升级是：

- 不止是 HTML artifact，要支持 **AG-UI / A2UI / MCP Apps** 输出（这样可以收 Claude / ChatGPT / Gemini / v0 / Bolt 多源）。
- registry 不止是装饰，要带 **schema validation + a11y lint + slop detector** 作为入站质量门。
- 沉淀单位不是 file，是 **Skill**（markdown + 脚本 + 资源），跨次可重新调用。

### 4.3 评估体系的护城河机会

GenUI 评估目前最像 Arize / Braintrust 缺位的市场：

- 没有"agent 选对组件、用户真用了吗"的产品级工具。
- 没有 "trust calibration 纵向跟踪"。
- 没有 cost-adjusted quality leaderboard。

如果你做的是对话 → 应用聚合社区，**自带评估 dashboard**是天然的 retention 引擎（创作者要看排名 + 改进 + 学习），也是 LP 故事的差异化。

### 4.4 协议押注

务必接 **AG-UI**（采纳面最广，跨多家 agent runtime）+ **MCP Apps**（跨 ChatGPT / Claude / Goose / VS Code 分发）。**A2UI** 还在 v0.9 preview，先观望。

### 4.5 反 slop 是核心 craft

Anthropic frontend-design skill + Impeccable Slop catalog + Web Codegen Scorer 三件套是 2026 年的 GenUI 工程基线。要么直接采用，要么基于他们做自家 boutique style pack——"反 AI slop"已经成了独立的设计 craft，是任何想做"看着不像 AI 出的"产品都必须翻过的山。

---

## 5. 关键来源（一级精读清单）

### 论文（必读 8 篇）

- [Generative Interfaces for Language Models (arXiv:2508.19227)](https://arxiv.org/abs/2508.19227)
- [Portal UX Agent (arXiv:2511.00843)](https://arxiv.org/abs/2511.00843)
- [Design2Code (arXiv:2403.03163)](https://arxiv.org/abs/2403.03163)
- [WebCode2M (arXiv:2404.06369)](https://arxiv.org/abs/2404.06369)
- [Generative and Malleable UIs (arXiv:2503.04084)](https://arxiv.org/abs/2503.04084)
- [SpecifyUI (arXiv:2509.07334)](https://arxiv.org/abs/2509.07334)
- [On the Regulatory Potential of UIs for AI Agent Governance (arXiv:2512.00742)](https://arxiv.org/abs/2512.00742)
- [UI-Bench (arXiv:2508.20410)](https://arxiv.org/abs/2508.20410)

### 产品 / 协议（必看 10 个）

- [Vercel AI SDK](https://ai-sdk.dev/docs/introduction) + [AI SDK 3 generative UI announcement](https://vercel.com/blog/ai-sdk-3-generative-ui)
- [Thesys C1 + Crayon](https://www.thesys.dev/) + [架构](https://www.thesys.dev/blogs/generative-ui-architecture)
- [Tambo](https://docs.tambo.co/)
- [CopilotKit + AG-UI + 2026 GenUI 指南](https://www.copilotkit.ai/blog/the-developer-s-guide-to-generative-ui-in-2026)
- [assistant-ui](https://www.assistant-ui.com/)
- [LangGraph generative UI](https://docs.langchain.com/langsmith/generative-ui-react)
- [Claude Artifacts help](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)
- [OpenAI Apps SDK + ChatGPT UI](https://developers.openai.com/apps-sdk/build/chatgpt-ui)
- [Gemini Canvas](https://gemini.google/overview/canvas/) + [A2UI v0.9](https://developers.googleblog.com/a2ui-v0-9-generative-ui/)
- [MCP Apps blog](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)

### 博客（必读 8 篇）

- swyx, [It's Time To Build AI | UX](https://www.latent.space/p/build-ai-ux)
- Maggie Appleton, [Language Model Sketchbook](https://maggieappleton.com/lm-sketchbook)
- Ink & Switch, [The Future of Malleable Software](https://www.inkandswitch.com/essay/malleable-software/)
- Vercel, [Introducing AI SDK 3.0 with Generative UI](https://vercel.com/blog/ai-sdk-3-generative-ui)
- Anthropic, [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)
- Anthropic, [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- Puck, [AI Slop vs Constrained UI](https://puckeditor.com/blog/ai-slop-vs-constrained-ui)
- Addy Osmani, [AI's 70% Problem](https://zed.dev/blog/ai-70-problem-addy-osmani)

### 评估（必看 6 项）

- Anthropic, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)（4-criterion rubric + generator-evaluator harness）
- [Web Codegen Scorer (Angular / Google)](https://github.com/angular/web-codegen-scorer)
- [Design Arena](https://www.designarena.ai/about) + [WebDev Arena](https://arena.ai/blog/webdev-arena/)
- [Impeccable Slop catalog](https://impeccable.style/slop/)
- [A11yN (arXiv:2510.13914)](https://arxiv.org/abs/2510.13914)
- [Mind2Web 2 (arXiv:2506.21506)](https://arxiv.org/abs/2506.21506)

### 综述 / 协议生态文章（高密度入门）

- [Generative UI Report 2025 (Thesys)](https://www.thesys.dev/report/gen-ui-2025)
- [The Complete Guide to Generative UI Frameworks in 2026 (Medium)](https://medium.com/@akshaychame2/the-complete-guide-to-generative-ui-frameworks-in-2026-fde71c4fa8cc)
- [A2A, MCP, AG-UI, A2UI: 2026 AI Agent Protocol Stack (Medium)](https://medium.com/@visrow/a2a-mcp-ag-ui-a2ui-the-essential-2026-ai-agent-protocol-stack-ee0e65a672ef)
- [Things Are Moving Fast: Generative UI, MCP Apps (DEV)](https://dev.to/betodias/things-are-moving-fast-generative-ui-mcp-apps-and-the-new-standards-race-56bk)

---

*由 LLM 综合 5 路深研究产出（论文 / 产品 / 博客 / 推文 / 评估）。事实截至 2026-05-27。若使用此报告做产品决策，关键引用建议二次核查。*
