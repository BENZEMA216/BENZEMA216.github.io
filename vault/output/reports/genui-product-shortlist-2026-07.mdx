<!--
date: 2026-07-01
tags: [genui, generative-ui, product-shortlist, ai-app-builder, component-registry, design-system, artifacts, appgen]
status: active
trigger: 用户希望从 Generative UI 全景研究中继续筛出真正值得看的产品，重点是生成品味、规则、整合和生成结果的可用性
related:
  - "[generative-ui-landscape-2026-05](/output/reports/generative-ui-landscape-2026-05/)"
  - "[genui-implementation-gotchas-2026-05](/output/reports/genui-implementation-gotchas-2026-05/)"
  - "[genui](/wiki/concepts/genui/)"
  - "[skills-system](/wiki/concepts/skills-system/)"
  - "[harness-engineering](/wiki/concepts/harness-engineering/)"
-->

# GENUI 产品 shortlist（品味 / 规则 / 整合 / 可用性）

> 结论日期：2026-07-01。方法：复读 `generative-ui-landscape-2026-05.md` 的产品段落，再用官方页面 / 文档核实当前能力。  
> 这份清单不是“所有 AI app builder”，而是按“生成结果是否有可用性，且是否具备成熟的生成约束”筛选。

## 筛选标准

1. **品味 / taste**：是否能吃进 design system、组件库、tokens、样式规则，避免通用 AI slop。
2. **规则 / constraint**：是否让模型在 registry / schema / spec / component catalog 内生成，而不是完全自由写 HTML。
3. **整合 / integration**：是否能接真实数据、工具、MCP、代码库、Figma、GitHub、部署或权限体系。
4. **可用性 / usability**：输出是否是 live UI / working app / 可部署页面 / 可嵌入组件，而不是静态 mockup。

## 最值得优先看的产品

| 优先级 | 产品 | 类型 | 为什么值得看 | 主要短板 |
|---|---|---|---|---|
| P0 | **OpenUI / OpenUI Cloud（Thesys）** | structured GenUI runtime | 最接近“Agent 只组合你允许的组件”：定义 component library → 生成 prompt → LLM 输出 OpenUI Lang → renderer 实时渲染；支持 live data、MCP、BYO components、safe-by-default、design system、输出校验、observability | 新标准，生态仍需验证 |
| P0 | **Thesys C1** | managed GenUI API | API 直接从 prompt 生成并 stream 交互式 UI components，主打 dashboards / forms / charts / slides / reports；适合研究“非 codegen 的 GenUI as a service” | 托管产品，需实测输出质量和可控性 |
| P0 | **Tambo** | React GenUI SDK | 注册现有 React components + Zod schema，agent 选择组件并 stream props；最符合“让 agent speak your UI”的 in-app 路线 | 需要你已有组件库；不是现成最终产品 |
| P0 | **Figma Make** | prompt-to-app / design workspace | 强在品味与视觉约束：可从现有 Figma frame / team library / style context 生成；支持视觉编辑、live data、backend、publish、code export | 更像设计/原型/脚手架，不是 runtime GenUI 协议 |
| P0 | **v0 by Vercel** | AI UI / app builder | shadcn + Tailwind 生态成熟；Design Systems 2.0 可让 v0 使用真实 components / tokens / conventions；Design Mode 可视化微调，Vercel 一键部署 | 更偏 full code-gen，不是动态 in-app GenUI |
| P1 | **Claude Artifacts + Skills** | artifact / personal micro-app | Artifacts 可生成 shareable apps/tools/interactive React；Anthropic 官方用 frontend-design skill 改进 artifact 质量，是“Skills = taste pack”的关键参考 | freeform artifact 容易漂，和真实外部系统整合有限 |
| P1 | **Retool AI AppGen** | enterprise internal app generation | 生成 UI 只是第一步，强项是数据连接、安全、部署、维护；适合看“可用性优先”的企业 AppGen | 视觉 taste 不一定是重点，偏 internal tools |
| P1 | **Microsoft Power Apps Generative Pages** | enterprise low-code / Dataverse | 自然语言 + Dataverse tables 生成 model-driven app pages；继承 app theme，支持 ALM、代码透明和手工编辑 | 绑定 Microsoft / Dataverse 生态 |
| P1 | **Builder.io Fusion** | visual code agent | 接现有 codebase + Figma + components + styles + APIs，让 AI 用真实上下文生成 UI，并能发 PR / 导出代码 | 更像产品开发 agent，不是通用 GenUI runtime |
| P2 | **Replit Agent 4** | creative app builder | Infinite design canvas、Generate variants、可直接 apply 到 app；适合观察“设计探索 + 真实代码同步” | 约束和 design-system 控制弱于 v0 / Figma / Builder |
| P2 | **Lovable** | full-stack AI app builder | 有 design guidance、Enterprise design systems、workspace/project knowledge、Supabase/GitHub 整合；非技术用户能得到 working app | 品味和工程质量需持续人工校正 |
| P2 | **OpenAI Apps SDK / MCP Apps** | platform / distribution surface | structured tool result → iframe UI in ChatGPT；是跨 host 的 UI 分发标准，不是单个生成产品 | 你要自己做 app / component bundle |
| P2 | **Google A2UI / Gemini Canvas** | protocol + consumer reference | A2UI 把 UI intent 与 renderer 分离；Gemini Canvas / Dynamic View 是“答案变成定制界面”的产品参考 | A2UI 更偏协议，Canvas 不是可嵌入产品 |

## 我的排序判断

如果目标是找“成熟 GENUI 产品形态”，不是普通 vibe-coding 工具，优先顺序应该是：

1. **OpenUI / Thesys C1**：最贴 GENUI 本体。核心不是写代码，而是把模型输出约束成可渲染、可校验、可观测、可接工具的 UI spec / runtime。
2. **Tambo**：最贴 Creative CoWork 里“Skills / Sandbox / GENUI”的产品实现路径。它要求你有自己的 components，然后让 agent 选和填。
3. **Figma Make + v0**：最适合研究“生成品味”和“design system 如何喂给模型”。它们不是最纯的 runtime GenUI，但生成结果最容易直观看到可用性。
4. **Retool / Power Apps / Builder Fusion**：适合研究“整合和可上线”。它们证明可用性来自数据、权限、ALM、审计、发布流程，而不只是 UI 漂亮。
5. **Claude Artifacts**：适合研究“一个对话变成一个可用工具”的用户心智，以及 Skills 如何提升 artifact 品味。

## 逐个产品怎么看

### 1. OpenUI / OpenUI Cloud

最值得优先拆。官方定位是让 AI agents “respond with your UI”。机制上，开发者定义 component library，OpenUI 从 library 生成 system prompt，LLM 输出 line-oriented OpenUI Lang，renderer 实时解析并渲染 UI。它明确支持 live data、MCP servers、cross-platform、streaming-first、interactive、safe-by-default、bring your own components。

更关键的是 Cloud 部分已经把生产要素写出来了：production-grade rendering、editable artifacts、bring your design system、output validation、model/provider resilience、observability/audit trail、design tokens、brand configurations、built-in accessibility、rollbacks、latency/error metrics。

这正是“有规则、有品味、有整合、有可用性”的范式。

来源：<https://www.openui.com/>、<https://www.openui.com/docs/openui-lang/examples/dashboard>、<https://github.com/thesysdev/openui>

### 2. Thesys C1

C1 是托管版 GenUI API / React SDK：把自然语言 prompt 送进 API，生成并 stream live interactive UI components 到 client app。官网主打 dashboards、forms、charts、slides、reports。相比 v0 / Lovable 这类 full app codegen，C1 更像“LLM 返回 UI，而不是返回文本”的基础层。

适合看两个问题：

- 他们如何把 prompt → interactive UI 这件事产品化；
- managed GenUI 能否比自建 component registry 更稳定。

来源：<https://www.thesys.dev/>、<https://docs.thesys.dev/guides/what-is-thesys-c1>

### 3. Tambo

Tambo 的核心是 “register your components, agent renders them”。你把已有 React components 注册给 Tambo，并用 Zod schemas 描述 props；agent 根据用户消息选择组件并 stream props。例如 “show me sales by region” 渲染你的 `<Chart>`，“Add a task” 更新你的 `<TaskBoard>`。

这条路线的价值在于：品味和规则不靠 prompt，而靠你已经存在的产品组件库。Agent 只能在你的 UI 语言里说话。对 BENZEMA / Creative CoWork 来说，Tambo 很像 GENUI 的最小工程版本：Skills 决定能力，component registry 决定可展示界面。

来源：<https://docs.tambo.co/>、<https://docs.tambo.co/concepts/generative-interfaces/generative-components>、<https://github.com/tambo-ai/tambo>

### 4. Figma Make

Figma Make 值得看，不是因为它是最纯 GenUI，而是它最接近“成熟品味 + 设计系统上下文”。官方说它可以从自然语言生成 interactive flows、dashboards、complete apps，并能在同一个 workspace 里 refine / test。它支持 backend/live data、publish、code export，也能把已有 Figma designs 作为 visual reference，把 team library 的 colors / typography / components 作为 style context。

对你想找的“生成品味、规则、整合”来说，Figma Make 的关键不是 prompt-to-app，而是 **把生成动作放进设计工具和 team library 里**。

来源：<https://www.figma.com/solutions/ai-app-builder/>、<https://www.figma.com/make/>

### 5. v0 by Vercel

v0 是“生成结果明显可用”的强 benchmark。它的规则层来自 shadcn/ui、Tailwind、templates、custom registry、Design Systems 2.0。官方文档说 Design Systems 2.0 让 v0 学会团队的 components、tokens、design system conventions；Design Mode 让用户在 live preview 上选中元素、调整样式并应用回代码；官网也主打一键 deploy to Vercel。

它不是最贴“runtime GenUI”的产品，因为它更偏 full code-gen / app builder；但如果要研究 **AI 生成 UI 的品味如何工业化**，v0 是必看。

来源：<https://v0.app/>、<https://v0.app/docs/design-systems-2>、<https://v0.app/docs/design-mode>

### 6. Claude Artifacts + Skills

Claude Artifacts 的价值是用户心智：用户描述需求，Claude 在对话旁生成 shareable apps、tools、visualizations、single-page websites、interactive React components 等。Anthropic 官方也明确把 frontend-design skill 用来改善 artifact quality，样例里同一 prompt 加 skill 后视觉层级、主题、字体和动效明显更完整。

这条线适合研究“对话 → 可用小工具”的 artifact 心智，以及 “Skill = taste / behavior prior” 的工程手法。

来源：<https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them>、<https://claude.com/blog/improving-frontend-design-through-skills>

### 7. Retool AI AppGen

Retool 的看点不是美，而是可上线。官方把 AppGen 定义成“AI-driven app generation + actually run those apps 的基础设施”：data connectivity、security、deployment、ongoing maintenance。也就是说，UI generation 只是 step one。

如果你要看“生成结果有明显可用性”，Retool 是重要反例：它说明真正可用来自业务数据、权限、安全、审计、维护，而不是生成一次 dashboard。

来源：<https://retool.com/ai-app-generation>、<https://docs.retool.com/education/labs/ai/assist>

### 8. Microsoft Power Apps Generative Pages

这条线值得单独看，因为它非常“企业级 GENUI”：用户用自然语言描述页面，选择 Microsoft Dataverse tables，甚至上传参考图，AI 生成 fully functional pages。Microsoft 官方说生成页面会遵循当前 model-driven app 的 modern theme，迭代后可看代码 diff，也能手工编辑；页面还 solution-aware，能纳入 ALM。

它不是开放 GenUI 产品，但非常适合研究“生成页面如何继承现有 app 主题、数据模型和企业发布流程”。

来源：<https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generative-pages>、<https://www.microsoft.com/en-us/power-platform/blog/2025/11/05/generative-pages-in-power-apps-is-now-generally-available/>

### 9. Builder.io Fusion

Fusion 的关键是接入 existing codebase + Figma files，让 AI 用你的 components、styles、APIs 生成和编辑 UI。输出能给 live preview link、创建 PR、导出 clean code。Builder 总站也强调 visual canvas 直接连 components 和 design tokens，改动保持 on-brand 和 production-ready。

这条线适合研究“把 AI generation 放进真实代码库和设计系统里”，比单独 app builder 更贴成熟团队。

来源：<https://www.builder.io/fusion>、<https://www.builder.io/>

### 10. Replit Agent 4 / Lovable

这两个更像成熟 app builder，而不是纯 GenUI runtime。

Replit Agent 4 的看点是 design canvas + generate variants + 直接 apply 到 app。它适合研究“设计探索和工程实现如何同屏同步”。  
Lovable 的看点是 full-stack app generation，并补了 design guidance、Enterprise design systems、workspace/project knowledge、Supabase/GitHub 整合。

它们应该作为对照组：验证“生成应用是否真的可用”，但不要把它们当成 GENUI 的最终答案。

来源：<https://replit.com/agent4>、<https://replit.com/blog/introducing-agent-4-built-for-creativity>、<https://docs.lovable.dev/introduction/welcome>、<https://docs.lovable.dev/features/design-systems>、<https://docs.lovable.dev/features/design-guidance>

## 不建议优先看的

- **assistant-ui**：很好的 chat primitives / headless UI，但不是“生成品味 + 可用产物”的核心产品。
- **LangGraph Generative UI**：重要工程参考，但更像 agent runtime 的 UI emission pattern，不是成熟设计产品。
- **Bolt / Base44**：能生成可用 app，但公开材料里“规则 / design system / 生产整合”的表达不如 v0、Figma Make、Retool、Power Apps、Builder 清楚。
- **Promptarium / ArtifactHub 类社区**：更像 artifact distribution，不解决生成质量本身。

## 已核实与仍不确定

已核实：

- OpenUI / Thesys、Tambo、v0、Figma Make、Retool、Power Apps、Builder、Lovable、Claude Artifacts 的核心能力均来自官方文档 / 官方产品页 / 官方 repo，而不是二手榜单。
- OpenUI / Tambo / v0 / Figma Make 都明确提供 component library / design system / registry / team library 一类的约束入口。
- Retool / Power Apps / Builder 明确把生成结果接入数据、权限、发布、代码库或 ALM 流程，因此“可用性”证据强于普通 app builder。

仍不确定：

- 这份报告没有实际登录产品跑同一 prompt，因此“输出质量 / 品味稳定性”还只是基于官方能力描述和公开 demo 的推断。
- OpenUI 虽然产品表达最贴 GENUI，但仍是新标准；官网同时显示 GitHub star 很高、npm 下载为 0 monthly downloads，这意味着生态成熟度需要实测。
- v0 / Figma Make / Lovable 的 design-system 支持多为高级计划或特定工作流，实际能否严格坚持组件库，需要用同一测试 prompt 验证。
- Claude Artifacts 的 taste 能被 Skills 明显改善，但它仍是 freeform artifact 路线；安全、持久状态和外部工具整合不应默认成立。

## 建议实测顺序

1. **OpenUI dashboard example**：跑它的 dashboard + MCP 例子，看“LLM 生成 UI，但 runtime 调工具不用 LLM”的架构。
2. **Tambo starter**：拿一个已有 React component，比如 `StoryboardGrid` / `SceneCard`，注册 Zod schema，让 agent 只在这些组件里渲染。
3. **Thesys C1 API demo**：同一个 prompt 让 C1 生成 dashboard / report，看输出是否稳定、有无可编辑结构。
4. **Figma Make**：喂一个已有 Figma frame / team library，看它能否生成符合设计系统的交互 app。
5. **v0 Design Systems 2.0**：接一个组件 registry 或 design-system docs，看它是否能坚持使用真实组件。
6. **Retool / Power Apps**：用真实表结构生成内部工具，看它如何处理权限、数据绑定、发布和后续编辑。
7. **Claude Artifacts + frontend-design skill**：同一个 prompt 比较 skill on/off，观察品味提升是否稳定。

## 推荐统一测试 prompt

> 你是一个创意项目工作台。请生成一个“短视频分镜管理”界面：左侧是 6 个 scene 的脚本摘要和状态，右侧是分镜图片网格，顶部有进度/KPI，底部有输出文件区。用户可以点击 Scene 5 的“重新生成视觉”按钮，按钮应调用工具 `regenerate_scene_visual(scene_id)`，成功后更新缩略图和状态。必须遵守以下 design tokens：背景 `#0f172a`，主色 `#22c55e`，圆角 8px，使用紧凑 dashboard 布局，不要营销 hero，不要紫色渐变，不要装饰性光球。移动端必须可用。

验收点：

- 是否选择合适组件，而不是长文本解释；
- 是否坚持 tokens / layout 规则；
- 是否能表达工具调用与状态更新；
- 是否有 loading / empty / error 状态；
- 是否能跨轮修改 Scene 5 而不重画全界面；
- 是否能导出 / 保存 / 复用生成产物；
- 是否能接真实数据或 mock API。

## 对 BENZEMA 的产品启发

最像 Creative CoWork GENUI 的路径不是 Lovable / Bolt 式“生成完整 app”，而是：

```
Skills / tools define what can be done
Sandbox / context defines current project state
Component registry defines what can be shown
Agent emits structured UI intent
Renderer composes trusted components
User actions flow back through tool calls
```

对应外部产品参考：

- **OpenUI / Thesys**：UI spec + renderer + validation + observability；
- **Tambo**：现有 React components 变成 agent 可调用 UI；
- **Figma Make / v0**：design system / visual taste 如何喂给模型；
- **Retool / Power Apps / Builder**：真实数据、权限、发布和维护如何让生成物可用；
- **Claude Artifacts**：对话沉淀成 shareable micro-app 的用户心智。

---
*由 LLM 从本地 GenUI 全景研究 + 2026-07-01 官方资料核实整理。*
