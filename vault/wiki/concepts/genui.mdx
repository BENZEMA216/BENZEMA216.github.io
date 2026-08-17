# GENUI（Generative UI / 动态生成界面）

> Agent 在运行时根据对话状态、工具输出或用户意图，动态选择 / 生成 / 组合的用户界面——不是构建时写死的固定 UI。

## 核心要点

- **定义**：UI 是 agent 的输出而不是 app 的静态资产。具体形态有三：**registry-bound**（agent 选预注册组件）、**artifact / sandbox**（agent 写 HTML/React 代码在 iframe 跑）、**full code-gen**（agent 产完整项目）
- **共识**：到 2026-05 已有五条 table stake——chat-only 是局部最优；typed component registry 是 in-app GenUI 事实基线；Skills 是新 style guide；UI 即审计日志；GenUI 是 harness 问题不是模型问题
- **协议**：AG-UI（运行时事件双向流）+ A2UI（声明式 widget tree）+ MCP Apps（iframe 沙盒）三套互补
- **评估**：七大指标家族 + 六层评估栈；评估空白是 GenUI 创业最具差异化的护城河方向之一
- 在 BENZEMA 体系里，GENUI 也是 Creative CoWork 的核心差异化特性（HTML 沙盒渲染 + Skills 模板组合）

## 详细说明

### 工作定义

Generative UI（GenUI）= 用户面对的 UI 不是构建时写死的，而是 agent 在运行时根据对话、工具结果或意图，从一个 schema/component/skill 空间里**动态选择、生成或组合**出来的。

它在传统软件里没有对应物——固定 UI 默认所有界面在 release 时已确定；GenUI 默认每一次会话甚至每一轮都可以产出新的界面。

### 三条路线

| 路线 | 代表 | Agent 输出 | 渲染机制 |
|---|---|---|---|
| **Registry-Bound** | Vercel AI SDK `streamUI` / Tambo / Thesys C1 / CopilotKit / assistant-ui / LangGraph | 结构化 tool call + Zod-typed props | 前端 resolver 映射到预注册 React 组件 |
| **Artifact / Sandbox** | Claude Artifacts / ChatGPT Canvas / Gemini Canvas / OpenAI Apps SDK | HTML / React / SVG / Mermaid 代码块 | iframe 沙盒里直接执行 LLM 生成代码 |
| **Full Code-Gen** | v0 / Bolt / Lovable / Replit Agent 4 | 完整 Next.js / React 项目 | 沙盒里跑真实 dev server |

CopilotKit 2026 把三条路线作为一个产品提供（Static / Declarative / Open-ended GenUI），代表三选一的格局开始默认化。

### 协议栈（2026-05）

- **AG-UI**（CopilotKit 主导，Google / LangChain / AWS / Microsoft / Mastra / PydanticAI 采纳）：16 种事件类型双向 wire format，类似"in-app agent 的 HTTP"
- **A2UI v0.9**（Google，2026-05）：声明式 widget tree spec，框架无关（web / Flutter / SwiftUI）
- **MCP Apps**（Anthropic + OpenAI + 社区，2026-01）：iframe 沙盒 + JSON-RPC postMessage bridge，跨产品 UI 扩展
- **Open-JSON-UI**：社区轻量 spec（cards / lists / forms）

事实标准栈：AG-UI + A2UI/Open-JSON-UI + MCP Apps + MCP（工具） + A2A（agent 互通）。

### 三家 lab 的押注

- **Anthropic**：Claude Artifacts + Skills + Live Artifacts + Claude Design；2026-05 开源 Artifacts 参考实现
- **OpenAI**：ChatGPT Canvas + Apps SDK + Operator agent mode；MCP Apps bridge 是最早工程化的 iframe + postMessage 标准
- **Google**：Gemini Canvas + A2UI + Gemini 3 generative UI in AI Mode；"每个答案都是一个定制小界面"

三家路径不同，终点收敛到"agent 写一个小 app + 用户原地迭代"。

### 评估体系

七大指标家族：A 视觉保真度（Design2Code / WebCode2M / CLIP-DINO-SSIM / TreeBLEU）/ B 功能-任务完成（WebArena / Mind2Web 2 / WebGen-Bench）/ C 组件-语义正确性（schema / axe-core / A11yN / Web Codegen Scorer）/ D 人评质量（Anthropic 4-criterion rubric / Impeccable Slop / UI-Bench / Design Arena）/ E LLM-as-judge / F Agent-UI 耦合（intent 对齐 / trust calibration / TTFT / 流稳定性）/ G 新兴（UIX / DesignBench / UI2Code^N / 视觉回归 / Skill-artifact eval）。

详见 `output/reports/generative-ui-landscape-2026-05.md` 的六层评估栈推荐。

### 在 BENZEMA 体系内的角色

在 Creative CoWork 产品里，GENUI 是核心差异化：选 HTML + Sandbox 组合，Skills 定义可用组件模板，agent 负责组合和填充。详见 [context-container](/wiki/concepts/context-container/) + [skills-system](/wiki/concepts/skills-system/) + [creative-agent-design](/wiki/concepts/creative-agent-design/)。

更广义上，GENUI 也是"把 Agent 对话沉淀成可用应用"这条 BENZEMA 主线的关键技术底座——参见 [generative-ui-landscape-2026-05](/output/reports/generative-ui-landscape-2026-05/) 第 4 节给出的产品启发：避开全代码生成 / freeform HTML artifact / 重写 streamUI 三个红海，押注"对话 → 结构化 UI intent + 你家组件 registry + 跨次复用沉淀"这个 Promptarium + Tambo + Anthropic Skills 三者交集的空白。

### 设计参考不能只压缩成 style

[personal-website-design-inspiration-2026-08-04](/raw/articles/genui/personal-website-design-inspiration-2026-08-04/) 收录的 12 个个人网站提供了一组 design-quality benchmark：辨识度来自 OS、terminal、房间、游戏或笔记等**世界隐喻**，以及内容架构、导航动作、loading、motion、sound、cursor 和 Easter egg 对该隐喻的共同服从，而不是孤立的配色或动效。对 GenUI 更有价值的做法，是把参考编译成 design intent、交互语法与可验收约束，再交给生成器实现并用真实浏览器验证；单纯模仿表面 style 很容易得到缺少个人身份和因果一致性的高仿页面。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [generative-ui-landscape-2026-05](/output/reports/generative-ui-landscape-2026-05/) | **主要参考**：2026-05 全景研究，30+ 论文 + 25+ 产品 + 3 协议 + 30+ 博客 + 8 主题推文 + 28 评估指标 |
| [frontend-agent-ui-freeze-logic-workflow-2026-05](/output/reports/frontend-agent-ui-freeze-logic-workflow-2026-05/) | UI 冻结 / 逻辑可编辑工程边界（与 GenUI 互补：在 GenUI 之外的人写 UI 上如何让 agent 只改互动逻辑） |
| [frontend-vibe-coding-practices-2026-05](/output/reports/frontend-vibe-coding-practices-2026-05/) | 前端 vibe coding 实践技巧；v0 / Lovable / Bolt / Replit 全代码生成路线的工程化 |
| [agent-artifact-community-products-2026-05](/output/reports/agora/market-competition/agent-artifact-community-products-2026-05/) | Agent artifact 聚合社区产品图谱；GenUI 产物的发现、复用、remix 层 |
| [conversation-to-content-consumer-products-2026-05](/output/reports/agora/market-competition/conversation-to-content-consumer-products-2026-05/) | 对话 → 内容编译产品图谱；Conversation Result Compiler 与 GenUI 的关系 |
| [personal-website-design-inspiration-2026-08-04](/raw/articles/genui/personal-website-design-inspiration-2026-08-04/) | 12 个高辨识度个人网站参考；展示世界隐喻、内容架构、交互语法与个人身份的一致性如何构成设计质量基线 |
| [01 Creative CoWork - DEMO思路](/raw/projects/creative-cowork/01%20Creative%20CoWork%20-%20DEMO%E6%80%9D%E8%B7%AF/) | BENZEMA 体系内首次提出 GENUI 概念 |
| [02 Creative CoWork - 产品深化](/raw/projects/creative-cowork/02%20Creative%20CoWork%20-%20%E4%BA%A7%E5%93%81%E6%B7%B1%E5%8C%96/) | 细化 GENUI 技术方案和用户体验设计 |
| [04 Creative CoWork - MVP需求](/raw/projects/creative-cowork/04%20Creative%20CoWork%20-%20MVP%E9%9C%80%E6%B1%82/) | 确定 HTML 渲染方案 |
| [06 Creative CoWork - 侧边栏设计方案](/raw/projects/creative-cowork/06%20Creative%20CoWork%20-%20%E4%BE%A7%E8%BE%B9%E6%A0%8F%E8%AE%BE%E8%AE%A1%E6%96%B9%E6%A1%88/) | Sandbox + GENUI 运行架构和安全模型 |

## 关联概念

- [skills-system](/wiki/concepts/skills-system/) — Skills 是 GenUI 的 style guide / 行为先验（Anthropic frontend-design skill 是关键案例）
- [context-container](/wiki/concepts/context-container/) — GenUI 根据 Context Container 状态动态渲染
- [harness-engineering](/wiki/concepts/harness-engineering/) — GenUI 瓶颈是 harness 问题：generator / evaluator 分离 + design-quality critic + taste-aware harness
- [self-verification](/wiki/concepts/self-verification/) — Anthropic 4-criterion rubric + Web Codegen Scorer 是 GenUI 自验证的具体实现
- [agent-communication](/wiki/concepts/agent-communication/) — AG-UI / A2UI / MCP Apps 是 agent 通信协议在 UI 层的延伸
- [creative-agent-design](/wiki/concepts/creative-agent-design/) — GenUI 是创意 Agent 面向用户的可视化层

---
*由 LLM 从 raw/ 数据 + output/reports/ 编译，请勿手动编辑*
