<!--
date: 2026-05-29
tags: [genui, mvp, spec, lab, vercel-ai-sdk, nextjs, generative-ui, tool-calling, declarative-ui, iframe, artifact, streaming, technical-boundary]
status: active
trigger: 用户想自己摸 GenUI 机制/找手感，并希望尽量多地试不同技术方案、感受技术边界
related:
  - "[generative-ui-landscape-2026-05](/output/reports/generative-ui-landscape-2026-05/)"
  - "[genui](/wiki/concepts/genui/)"
  - "[tool-routing](/wiki/concepts/tool-routing/)"
-->

# GenUI 技术边界探索 Lab（多方案对比版）

> 目标：在**同一个 chat host** 里并排实现 GenUI 的几条主流技术路线，用同一批"刁难 prompt"去跑，**亲手撞到每种方案的天花板**——知道各自能干什么、在哪里崩、为什么。
> 定位：技术探索 Lab，不是产品 MVP。比"摸机制版"重，预计 3-5 天。
> 日期：2026-05-29

---

## 0. 设计哲学：变量隔离

把"GenUI"当成一个有多个解的工程问题。Lab 的关键是**控制变量**：

```
固定：同一个 chat host + 同一批刁难 prompt
变化：渲染策略（Track 1/2/3/4）
观察：同一个请求在不同策略下，做得出吗 / 长什么样 / 多快 / 安不安全 / 能不能改
```

只有"同任务、换策略"才能让边界**可对比、可感知**。所以全程一个 Next.js app，4 个 Track 共用一个对话框，只切换底层渲染管线。

---

## 1. 栈

| 选择 | 理由 |
|---|---|
| **Vercel AI SDK** 作脊梁 | 它一套 API 能同时支撑三种策略：`tool` → 组件（Track 1）、`streamObject` → 声明式 spec（Track 2）、生成代码字符串 → iframe（Track 3）。用一个 SDK 跑通多路线，对比最干净 |
| **Next.js (App Router)** | `app/api/chat/route.ts` 后端 + `useChat` 前端 |
| **Claude Sonnet 4.6**（`claude-sonnet-4-6`）或同级 | tool-calling 和代码生成都强；AI SDK provider 无关，可换着试感受模型差异 |
| **Zod** | Track 1/2 的 schema |
| **Tailwind + shadcn/ui**（可选） | Track 1/2 的组件家底，用来对比"有设计系统 vs 没有"的一致性 |

官方主文档（照抄避免 API 过时）：
- Track 1：https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces
- Track 2：https://ai-sdk.dev/docs/ai-sdk-ui/object-generation （`streamObject`）
- Track 3 参考：[e2b-dev/fragments](https://github.com/e2b-dev/fragments)、[CopilotKit/OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI)

---

## 2. 四条 Track（每条 = 一种技术路线）

### Track 1 — Registry：tool-call → 预建 typed 组件
> 报告里的 **Static/Registry GenUI**（Tambo / shadcn 路线）

- **机制**：注册 N 个 React 组件 + Zod schema；LLM 选一个、流式填 props；前端按 `toolName` 渲染。
- **实现**：`tools.ts` 定义 `weatherCard` / `confirmAction` / `dataTable`，前端 switch 渲染。
- **你会撞到的墙**👉 **菜单天花板**：LLM 只能产出你预置的东西。请求一个 registry 里没有的组件，它要么 fallback 文字、要么硬塞最接近的组件。**自由度低，但安全 + 一致 + 可回流。**

### Track 2 — Declarative：LLM 吐 JSON UI 树 → 你写的 mini renderer
> 报告里的 **Declarative GenUI**（A2UI / Open-JSON-UI / Thesys-Crayon 路线）

- **机制**：用 `streamObject` 让 LLM 输出一棵抽象 UI 树，如 `{type:"stack", children:[{type:"metric",props:{...}},{type:"table",props:{...}}]}`；你写一个 ~80 行的 `<Renderer spec>` 把节点类型映射到组件。
- **实现**：定义一个 UI-spec 的 Zod schema（节点类型有限集）+ 一个递归 renderer。
- **你会撞到的墙**👉 **词汇表天花板**：比 Track 1 自由（LLM 能**组合**树而不只是选一个组件），但 renderer 必须认识每种节点类型；LLM 编出一个你没实现的 `type` → 渲染不出。**同时你会亲手体会"样式归 renderer 管"——换肤只改 renderer 一处。**

### Track 3 — Open-ended：LLM 生成 raw HTML/JS → 沙盒 iframe
> 报告里的 **Open-ended GenUI**（Claude Artifacts / E2B Fragments 路线）

- **机制**：让 LLM 直接生成一整段自包含 HTML/CSS/JS，塞进 `<iframe sandbox>` 渲染。
- **实现**：tool 返回代码字符串 → 前端写进 iframe `srcdoc`，加 `sandbox="allow-scripts"`。
- **你会撞到的墙**👉 同时撞**四面墙**，这是最有信息量的一条：
  1. **安全**：不加 `sandbox` 它能读你 cookie/localStorage、乱发请求 → 亲手体会为什么必须 iframe 隔离。
  2. **一致性**：每次生成都不一样，紫色渐变 + 玻璃卡 slop → 体会"自由的代价是失控"。
  3. **通信难**：iframe 想把用户操作传回 host 必须走 `postMessage` 桥 → 体会"隔离=回流变难"。
  4. **可靠性**：生成的代码有时直接报错白屏 → 体会"无 schema 约束 = 无渲染保证"。

### Track 4（进阶）— 流式形态对比
> 不是新路线，而是把上面三条的**流式行为**摆出来比

- **机制**：同一个"渲染一个有 500 行表格 + 一个图"的请求，分别用：(a) `streamObject` 部分渲染（边生成边出）、(b) 一次性等全部生成完再渲染、(c) RSC `streamUI` 流式组件。
- **你会撞到的墙**👉 **延迟与抖动**：感受 time-to-first-pixel、流式途中 layout flicker（CLS）、以及"为了不闪烁而牺牲首屏速度"的权衡。这是 GenUI 产品体验的隐形战场。

---

## 3. Boundary Probe Matrix（核心：用同一批刁难 prompt 撞墙）

**这是整个 Lab 的灵魂。** 把下面 6 个 probe 依次丢给每个 Track，记录结果，你就得到一张亲手画出的"技术边界地图"。

| Probe（刁难 prompt） | Track 1 Registry | Track 2 Declarative | Track 3 iframe | 你该感受到的边界 |
|---|---|---|---|---|
| **P1 越界**："做一个能弹的钢琴键盘" | ❌ 做不出（无此组件） | ❌ 做不出（renderer 无此节点） | ✅ 能弹但可能丑/有 bug | 表达力天花板：registry/declarative 受限于你预置的东西 |
| **P2 一致性**："做一个符合我们设计规范的 dashboard" | ✅ 一致 | ✅ 一致（renderer 统一 token） | ⚠️ slop，每次不同 | 一致性天花板：自由生成 = 失控 |
| **P3 回流**："让我在 UI 里调参数，Agent 据此重算" | ✅ 容易（props/事件回 host） | ✅ 容易 | ⚠️ 难（要 postMessage 桥） | 沙盒隔离 = 双向通信成本 |
| **P4 延迟**："渲染 500 行表 + 实时图" | 看组件实现 | 部分渲染 vs 等全量 | 整段代码生成完才出 | 流式/首屏/抖动权衡（Track 4 重点） |
| **P5 安全**："生成一个会 fetch 外部 API、读 localStorage 的组件" | ✅ 天然安全（只跑你代码） | ✅ 天然安全 | ⚠️ 不 sandbox 就危险 | 为什么 open-ended 必须沙盒 |
| **P6 可持久化**："把刚才这个界面存下来，下次重新打开" | ✅ 存 spec（结构化、可再编辑） | ✅ 存 spec | ⚠️ 只能存代码 blob，难再编辑 | 结构化 spec vs 代码 blob 的可演进性差异 |

> 做的时候：每个 probe 跑完，在表里记一句"实际发生了什么"。跑完 18 格（6×3），技术边界就刻进脑子了。

---

## 4. 目录结构

```
genui-lab/
├── app/
│   ├── api/chat/route.ts         # 后端：按 ?track= 切换 tools / streamObject / codegen
│   └── page.tsx                  # 前端：chat + track 切换器 + 三种渲染管线
├── components/genui/
│   ├── registry/                 # Track 1 组件：WeatherCard / ConfirmAction / DataTable
│   ├── renderer/
│   │   ├── uiSpecSchema.ts        # Track 2：UI 树的 Zod schema（有限节点集）
│   │   └── Renderer.tsx           # Track 2：递归渲染器（~80 行）
│   └── sandbox/
│       └── IframeArtifact.tsx     # Track 3：srcdoc + sandbox + postMessage 桥
├── lib/
│   ├── tools.ts                  # Track 1 tool 定义
│   └── probes.ts                 # 6 个刁难 prompt，做成按钮一键发
├── BOUNDARY-LOG.md               # 你填的边界地图（18 格记录）
└── .env.local
```

`probes.ts` + `BOUNDARY-LOG.md` 是 Lab 的产出物——把刁难 prompt 做成一键按钮，结果记进 log，最后这份 log 就是你要的"技术边界感"。

---

## 5. 里程碑

| # | 里程碑 | 验收 |
|---|---|---|
| **M0** | 骨架：chat 能跑 + track 切换器（先都指向纯文字） | 切 track 不报错 |
| **M1** | Track 1 Registry 跑通（3 组件） | P1/P2/P3 在 Track 1 下有结果 |
| **M2** | Track 2 Declarative + mini renderer | 同样 6 probe 在 Track 2 下跑一遍 |
| **M3** | Track 3 iframe artifact（含 sandbox + postMessage） | 同样 6 probe 在 Track 3 下跑一遍，**故意试一次不加 sandbox 感受危险** |
| **M4** | 填满 `BOUNDARY-LOG.md`（18 格） | 你能一句话说清每条路线的天花板 |
| **M5**（可选） | Track 4 流式对比 | 感受 flicker / 首屏 |

到 M4 就拿到了"技术边界地图"。

---

## 6. 做完你会得到的"边界地图"（预期结论，亲手验证后会更立体）

| 路线 | 自由度 | 一致性/安全 | 回流难度 | 可持久化 | 最适合 |
|---|---|---|---|---|---|
| **Registry** | 低（限预置） | 高 | 易 | 易（spec） | 品牌一致、企业内、安全要求高 |
| **Declarative** | 中（可组合） | 高 | 易 | 易（spec） | 要灵活又要可控；多端复用 |
| **iframe / Open-ended** | 极高 | 低 | 难 | 难（代码 blob） | 探索性、一次性工具、artifact |

对你"对话沉淀成应用"的主线，这张表会直接告诉你：**沉淀要可持久化、可再编辑 → 偏 Registry/Declarative;但想覆盖"啥都能生成" → 需要 iframe 兜底。最终大概率是 Registry 为主 + iframe 为兜底的混合**——但这个结论要你亲手撞完墙才信得过,而不是我告诉你。

---

## 7. 明确不做

- ❌ 真做产品级持久化/registry 市场/鉴权/部署（这是验证完边界之后的事）
- ❌ 接 MCP Apps / AG-UI 真协议（Lab 用本地简化版模拟即可；真协议留到确定路线后）
- ❌ 全代码生成（v0/Bolt 那种生成整个项目）——超出单 host 对比范围，且红海
- ❌ 评估体系（报告 §3）——有产品形态再上

---

## 8. 起步命令

```bash
npx create-next-app@latest genui-lab --ts --tailwind --app
cd genui-lab
npm install ai @ai-sdk/react @ai-sdk/anthropic zod
# .env.local 填 ANTHROPIC_API_KEY
# 按 §4 结构 + §2 各 Track 文档实现；先 M0→M1，再逐 Track 加
```

---

*由 LLM 根据 [generative-ui-landscape-2026-05](/output/reports/generative-ui-landscape-2026-05/) 为用户"尽量多试方案、感受技术边界"的目标定制。AI SDK 具体 API 以 ai-sdk.dev 官方文档为准；Track 3 安全实现务必加 iframe sandbox。*
