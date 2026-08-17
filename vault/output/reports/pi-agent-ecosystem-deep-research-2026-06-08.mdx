# Pi Agent 生态深度研究报告

> Mario Zechner 的 `earendil-works/pi`（即 `pi-mono`）——驱动 OpenClaw 的极简 agent harness
> 编制日期：2026-06-08 | 用途：Agora 创业战略参考 | 置信度标注见正文

---

## TL;DR / 核心结论

- **Pi 是“极简主义 harness”的标杆**：系统提示词 + 工具定义合计 **<1000 tokens**（实测约 800），核心只有 4 个工具（read/write/edit/bash），与 Claude Code 的 ~28k tokens/27 工具形成极端对照。["What I learned building an opinionated and minimal coding agent"](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
- **Pi 没有原生 GenUI**：没有 artifact 模式、没有声明式 UI spec、没有 web UI 库。GenUI 需要你自己在三条路径上构建（TUI 扩展 / OpenClaw 的 Live Canvas+A2UI / SDK 包壳 web）。这恰恰是 Agora “对话沉淀成可用应用”论题的**空位机会**——但比你想象的窄（见下文校正）。
- **魔改的正道是“先扩展，后 fork”**：Pi 的扩展系统（TypeScript extensions / skills / prompt templates / themes）可在不动核心的前提下注册工具、订阅生命周期事件、替换 UI。作者本人态度是“如果不合用，我恳请你 fork”（[原文](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)）。oh-my-pi 是 fork 的极端样本（27k 行 Rust、32 工具、LSP/DAP），代价是“相比原版臃肿”（[oh-my-pi](https://github.com/can1357/oh-my-pi)）。
- **Harness 是商品（commodity），价值在更高层**：Pi MIT 许可、无商业模式、鼓励 fork——它主动把 harness 层做成公地。给创业者的信号很明确：**别在 harness 本身建护城河，要在分发、身份、GenUI 抽象、agent 打包/市场上建**。
- **OpenClaw 是“分发即护城河”的活证据**：它不靠独立 app，而是把 agent 插进微信/WhatsApp/Telegram/Discord 等 IM（**实为 22 个渠道，非传言的 9 个**——已校正），加上 `memory.md` 单一记忆 + 心跳机制，制造了“它记得我”的情感黏性。这是产品形态创新，尤其在中国爆火。([[播客推荐  戴雨森的创投观察第2集]])
- **身份层（portable identity）在 Pi 中完全缺失（已核实，confirmed）**：无内置权限系统、无凭证路由、无多租户，凭证就是单用户的 `~/.pi/agent/auth.json`。这是创业差异化的**确认机会点**。
- **几个流传的说法需要校正**：① OpenClaw 渠道数是 22 不是 9；② Pi 扩展生态比“荒芜”说法更成熟（npm 上 250+ `pi-package`，官方有 `pi.dev/packages` 目录）；③ agent-to-agent 通信并非“与 Pi 无关”——oh-my-pi 已内置 IRC 工具 + AgentRegistry；④ 多个被传的中国社区 fork（如 `zenobi-us/pi-dcp`、“67% token 节省”）**查无实据**，低置信度。
- **诚实的不确定性**：Pi 真实生产采用率无遥测数据可证；GitHub star 数（earendil-works/pi ~60k，社区另有 “250k+ 周内增长” 的说法）来源不一致，请谨慎引用。

---

## Pi 是什么（定位）

Pi 是 Mario Zechner（社区 ID **badlogic**，游戏圈以 libgdx 跨平台引擎闻名）开发的一个**极简、provider-agnostic 的 coding agent harness**，以 TypeScript monorepo 形式发布（`pi-mono`，镜像仓库 `earendil-works/pi`，MIT 许可）。它由四个分层包组成：**pi-ai**（统一 40+ LLM provider 的流式 API）、**pi-agent-core**（agent 循环 + 工具执行 + 状态管理）、**pi-coding-agent**（CLI + 扩展 + 会话持久化）、**pi-tui**（终端 UI 框架）。其设计哲学是“激进极简”——*"if I don't need it, it won't be built"*——明确拒绝 Claude Code 那种“batteries-included、80% 我用不上的太空船”，追求**对进入模型上下文窗口的内容拥有绝对控制与完全可观测性**。它最知名的下游产品是病毒级的 OpenClaw（个人开发者 Peter Steinberger）和 Cola（MarsWave，基于 pi v0.62.0）。([Mario 博客](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), [Nader 分析](https://nader.substack.com/p/how-to-build-a-custom-agent-framework), [Cola_0.3.10_Deep_Analysis](/raw/Inbox/Cola_0.3.10_Deep_Analysis/))

### 架构总览

```
┌─────────────────────────────────────────────────────────┐
│  应用层  pi-coding-agent  (CLI / print / JSON / RPC / SDK) │
│          + extensions + skills + prompt templates         │
├─────────────────────────────────────────────────────────┤
│  核心层  pi-agent-core  (nested dual-loop, steering,       │
│          context compaction, AgentMessage↔Message 转换)    │
├──────────────────────────────┬──────────────────────────┤
│  基础层  pi-ai                │  基础层  pi-tui            │
│  (40+ providers, EventStream, │  (retained-mode TUI,      │
│   strategy+registry pattern)  │   differential rendering) │
└──────────────────────────────┴──────────────────────────┘
   下游产品：OpenClaw (web UI / TUI / 22 IM channels / Live Canvas)
            Cola (desktop, 35 skills, MOD)  ·  oh-my-pi (Rust fork)
            pi-chat (Slack/chat 自动化，独立 repo)
```

**严格分层**：基础层零内部依赖，核心层只依赖基础层，应用层依赖核心层，禁止循环依赖（TypeScript project references 强制构建顺序）。([deepwiki](https://deepwiki.com/badlogic/pi-mono/1.1-package-architecture), [guangzhengli 课程](https://guangzhengli.com/notes/pi-ai-and-agent-core-course))

**核心工具集**：默认 `read / write / edit / bash`，可选 `grep / find / ls`，可选启用 `mcp`。理由：“前沿模型已被 RL 训练得彻底理解 coding agent 是什么，这四个工具就够了。”（[Mario 博客](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), [coding-agent README](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md)）

**几个值得记住的工程细节**：
- **EventStream 模式**（`AsyncIterable<T>` + `Promise<R>`）：每个事件携带 `partial`（迄今构造的完整消息），三种消费方式——流式 for-await / 阻塞 `.result()` / 混合。([guangzhengli](https://guangzhengli.com/notes/pi-ai-and-agent-core-course))
- **嵌套双循环**：外循环处理 follow-up 消息，内循环处理 tool calls 与 steering（中途打断、跳过剩余工具、注入新消息）。
- **AgentMessage ↔ Message 分离**：应用层消息类型经 `transformContext() → convertToLlm() → streamSimple()` 转换，使上下文工程可在**不污染 LLM 可见内容**的前提下进行。
- **工具结果双内容设计**：`content`（LLM 可见）与 `details`（仅 UI），避免 UI 元数据污染上下文。
- **JSONL 树形会话**：append-only DAG，支持分支与跨 provider 对话、崩溃恢复。
- **自动上下文压缩**：`contextTokens > contextWindow - reserveTokens` 时触发，可由扩展完全自定义。
- **YOLO by default**：无安全护栏、无权限检查——Mario 认为“一旦工具能改代码、跑代码，安全剧场就失效了”。安全交给容器化（OpenShell / Gondolin / Docker）。

---

## 1. Pi + GenUI 最佳实践

### 1.1 诚实评估：Pi 原生 GenUI 能力 ≈ 0，但“可组合性”被低估

先把最重要的话说清楚：**Pi 没有原生 GenUI 系统**——没有 artifact 模式、没有声明式 UI spec、没有 web UI 库（无 `pi-web` 包），`pi-tui` 也只提供基础原语（Text / Input / Editor / SelectList），**没有 Button / Form 等 agent 可生成的复合组件**。([pi-mono README](https://github.com/badlogic/pi-mono/blob/main/README.md), [tui README](https://github.com/badlogic/pi-mono/blob/main/packages/tui/README.md))

但有一个**重要校正**（针对“Pi 缺乏多轮 UI 可组合性和状态重建”的说法，verdict: *partially_confirmed*）：

| 说法 | 实际情况 |
|---|---|
| “无多轮 UI 可组合性” | ❌ **不准确**。pi-agent-core 的事件驱动架构 + 消息历史原生支持多轮交互 |
| “无状态重建” | ❌ **不准确**。`agent.state.messages` 可显式变更/恢复，`transformContext()` 可裁剪/注入上下文，状态重建是原生的 |
| “无 UI 组件工具箱” | ✅ **准确**。这是真正的缺口——缺的是“agent 生成 UI 的通用组件库”，不是“可组合性/状态” |

**结论**：GenUI 机会真实存在，但**比“一片空白”窄**。Pi 给了你 headless-first 的 agent 核心 + JSON/RPC（严格 LF-delimited JSONL framing）+ 可替换 UI，缺的是上面那层“声明式组件渲染 + 跨平台规格”。([Mario 博客](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), [pi-mono](https://github.com/badlogic/pi-mono))

### 1.2 三条构建 GenUI 的路径（含适用场景）

| 路径 | 机制 | 适用场景 | 成熟度 |
|---|---|---|---|
| **A. TUI 扩展** | `ctx.ui.custom()` 全屏组件、`ctx.ui.setWidget()` 内联 widget、可临时替换 editor | 终端绑定的交互式 UI（对话框、设置、游戏） | 已验证：doom-overlay 跑到 **35 FPS**、snake/tic-tac-toe/modal-editor 示例 |
| **B. OpenClaw Live Canvas + A2UI** | OpenClaw（基于 Pi SDK）实现 agent 驱动的可视化工作区，用 A2UI v0.8 命令操作 canvas | 需要多平台原生 GenUI 渲染时 | 生产路径（OpenClaw macOS menu bar app） |
| **C. SDK 包壳 web/desktop** | `createAgentSession()` → `prompt() / subscribe()`，把 agent core 嵌入 Next.js/Electron/vanilla JS | 自建 web/桌面 UI，完全自定义 | 一等公民（headless-first） |

([extensions 文档](https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/docs/extensions.md), [SDK 文档](https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/docs/sdk.md), [OpenClaw](https://github.com/openclaw/openclaw), [示例 README](https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/examples/extensions/README.md))

### 1.3 具体最佳实践

1. **用“工具结果双内容”做 UI-LLM 分离**：工具 `execute()` 返回 `{content: [...], details: {...}}`——`content` 给 LLM，`details` 给 UI 渲染。这是 GenUI 的天然落点：让 agent 产出结构化 UI 规格放进 `details`，UI 层负责渲染，LLM 上下文不被污染。这是 Pi **核心设计原则**，不是 hack。
2. **优先扩展驱动的 UI 组合，而非单体方案**：用 `tool_result` 事件拦截/改写工具结果再渲染。
3. **需要跨平台时走 OpenClaw 的 A2UI**，不要自己从零造跨端渲染。
4. **注意流式限制（低置信度边界）**：工具结果的**流式渲染目前“不可能”**（文档标注 planned）。如果你的 GenUI 依赖“工具执行中实时渲染部分结果”，这是当前硬约束。
5. **对 Agora 的“对话沉淀成可用应用”论题**：Pi 提供了干净的 SDK + 扩展面，让你**不 fork 核心就能加 GenUI 层**——这是技术底座的优势。但你要自己定义“应用规格”（A2UI? HTML? 自定义 schema?），这恰是产品差异化所在。

> ⚠️ **不确定**：Pi 是否有 OpenClaw 之外的实验性/计划中原生 GenUI 层，现有文档不清楚（低置信度）。

---

## 2. 魔改 Pi 的最佳实践

### 2.1 扩展模型（多层次，从轻到重）

| 层次 | 机制 | 不需要 fork |
|---|---|---|
| **配置/文件** | `SYSTEM.md` / `APPEND_SYSTEM.md`、`AGENTS.md`/`CLAUDE.md`（父目录递进发现）、`~/.agents/skills` | ✅ |
| **TypeScript 扩展** | 放 `~/.pi/agent/extensions/`（全局）或 `.pi/extensions/`（项目），自动加载、`/reload` 热重载 | ✅ |
| **SDK 编程** | `createAgentSession()`、`ModelRegistry`、`SessionManager`、事件订阅 | ✅ |
| **自定义 provider** | 实现 `stream()`/`streamSimple()` → `registerApiProvider()`（Strategy+Registry） | ✅ |
| **Fork** | 整体改架构/哲学时 | ❌ 需 fork |

**扩展能力**：注册 LLM 可调工具（TypeBox schema）、订阅 **20+ 生命周期钩子**（`before_agent_start` / `agent_start` / `turn_start` / `turn_end` / `agent_end` 等，可访问 prompt/images/system prompt/tools/tool results）、注册 slash 命令、用 `ctx.ui` 做 prompt/confirm、替换 editor、加 widget/status line/footer/overlay。([extensions 文档](https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/docs/extensions.md), [pi.dev/docs extensions](https://pi.dev/docs/latest/extensions))

### 2.2 关键实践要点

1. **系统提示词：用 `APPEND_SYSTEM.md`，别覆盖 `SYSTEM.md`**——避免破坏核心功能。([Sean Pedersen](https://seanpedersen.github.io/posts/pi-agent/))
2. **文件化外置优于内置功能**：用 `TODO.md` 代替内置 todo、`PLAN.md` 代替 plan mode、自定义工具做成带 README 的 CLI 让 agent 按需读文档（**渐进式披露**，而非把整个工具目录塞进上下文——这正是 Mario 对 MCP 的批评）。([Mario 博客](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/))
3. **权限/沙箱靠容器化**：Pi **无内置权限系统**，跑在调用者的完整权限下。三种推荐模式：OpenShell、Gondolin 扩展、Plain Docker。⚠️ **扩展以你的完整系统权限运行、可执行任意代码——只装可信来源**。([pi-mono README](https://github.com/badlogic/pi-mono))
4. **供应链加固**：直接外部依赖锁定精确版本，`.npmrc` 设 `save-exact=true`、`min-release-age=2`（避免当天发布），新依赖在审查前 fail。把“npm 依赖变更当作 reviewed 代码变更”。
5. **认证继承（auth inheritance）**：凭证存 `~/.pi/agent/auth.json`（单用户单 scope）+ 环境变量回退。**没有凭证路由/委托/多租户**（见第 3 节，这是机会点）。

### 2.3 从真实 fork 学到的（oh-my-pi）

oh-my-pi（can1357，~11k stars / 927 forks）是把 Pi 从“极简”推向“batteries-included”的极端样本：

- **用 Rust 重写约 27k 行**（crates: `pi-natives` / `pi-shell` / `pi-ast`），grep/shell/AST/PTY 等全部 in-process（libuv 线程池，避免 fork/exec 开销）
- **32 工具 vs 原版 4**
- **Hashline 哈希锚定编辑**：用内容哈希做锚点代替重打整行，消除“string-not-found 循环”和空白冲突——**Grok 4 Fast 输出 token 减少 61%**
- **LSP 集成**直接接入写操作（`workspace/willRenameFiles` 原子重构）；**DAP 集成**（lldb/dlv/debugpy 真调试器，而非 print）
- **一等公民 subagents**：fan-out 到隔离 worktree，返回 **schema 校验的结构化对象**（无散文解析）
- **time-traveling stream rules**：regex 匹配在 token 中途中断流、注入 system reminder、原地重试——“course-correction 不用每轮付上下文税；注入能挺过 compaction”
- **配置自动发现**：Cursor/Claude/Cline 的 MDC/.clinerules/AGENTS.md 直接复用，无迁移脚本
- **诚实的代价**：作者承认“oh-my-pi 相比原版 Pi 会显得臃肿”（系统提示词庞大）。([oh-my-pi](https://github.com/can1357/oh-my-pi), [Sean Pedersen](https://seanpedersen.github.io/posts/pi-agent/))

另一个样本 **Cola**（MarsWave）：基于 `@mariozechner/pi-*`，加了 35 skills（Google Workspace/Office/语音）、MOD 人格系统、自治 memory cron、25+ LLM provider 网关——证明 Pi 的极简内核能横向支撑差异极大的产品。([Cola_0.3.10_Deep_Analysis](/raw/Inbox/Cola_0.3.10_Deep_Analysis/))

### 2.4 何时扩展 vs 何时 fork

| | 扩展（extend） | Fork |
|---|---|---|
| **适用** | 加工具、改上下文工程、自定义 UI、加 provider、改系统提示词追加 | 改核心架构、换语言（如 TS→Rust）、整体重定哲学 |
| **成本** | 低，跟随上游 | 高，维护负担、与上游脱钩 |
| **示例** | 大多数 GenUI/工具需求 | oh-my-pi（27k 行 Rust）|
| **作者态度** | 默认推荐 | “如果不合用，我恳请你 fork——我是认真的” |
| **gotcha** | 扩展冲突（用户工具 vs 内置）、热重载边界、流式工具结果暂不支持 | 上游同步困难（oh-my-pi 实质是独立 fork）、产生臃肿 |

> ⚠️ **校正**：之前“Pi 第三方扩展生态荒芜、无市场”的说法是 *partially_confirmed*——实际 npm 上有 250+ `pi-package`（`pi-mcp-adapter` 月下载 99k+、`pi-acp` 30k+），官方有 **`pi.dev/packages`** 目录（README 未突出），还有 `@gotgenes/pi-permission-system`、`@agentuity/pi` 等。缺的是 VS Code 那种中心化发现 registry，不是生态本身。

---

## 3. 从创业 idea 角度你必须知道的

### 3.1 核心战略论题：Pi 把 harness 做成了 commodity

Mario 的隐含论题是 **“真正的价值不是这个 coding agent，而是让你能造自己的 agent”**。配合 MIT 许可 + 无商业模式 + “我恳请你 fork”，Pi 在**主动把 harness 层公地化**。对 Agora（agent+GenUI 创业）的含义：

> **不要在 harness 本身建护城河。** harness 已是 commodity，竞争只在三处：(a) LLM 集成深度、(b) 工具生态、(c) IDE/开发体验——而这些 oh-my-pi 已经在补。真正的高价值层在 harness 之上：**分发、可移植身份、GenUI 抽象、agent 打包/市场、agent-to-agent 通信编排**。([Mario 博客](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), [Nader](https://nader.substack.com/p/how-to-build-a-custom-agent-framework))

戴雨森的框架很贴切：**“harness 是 OS，模型是处理器（驱动 OS 的 CPU）”**——价值正在从模型层迁移到 OS 层。([[播客推荐  戴雨森的创投观察第2集]])

### 3.2 OpenClaw 作为“分发即护城河”的证明点

OpenClaw 验证了**非模型公司、个人开发者也能做出第一方级别的 harness 并爆火**。它的制胜不在 harness 技术，而在产品形态：

- **IM-first 分发**：不靠独立 app（“OpenClaw 有自己的 TUI，但基本没人用”），而是把 agent 插进用户最熟悉的 IM——**实测支持 22 个渠道**（WhatsApp/Telegram/Slack/Discord/Signal/iMessage/微信/QQ/飞书/LINE/Matrix… 而**非传言的 9 个**，verdict: *refuted*）。“这个产品形态是之前没有的……尤其在中国风靡的重要原因。”
- **情感黏性即护城河**：单一 `memory.md` + 每日整理 + 30 分钟心跳，制造“它记得我”的感觉，用户“养成系”地养 agent。研究员一开始不以为然（“context 会串、会幻觉”），但用户黏性是真实的。
- **校正**：OpenClaw 在 credits 里致谢 Pi，但它**主要是 local-first gateway 架构的独立个人 AI 助手，不是 Pi 框架模块化的“参考实现”**——把它当“分发创新案例”看，别过度绑定到“Pi 架构证明”叙事。([OpenClaw](https://github.com/openclaw/openclaw), [[播客推荐  戴雨森的创投观察第2集]])

### 3.3 机会与风险地图

| 维度 | 判定 | 含义 |
|---|---|---|
| **可移植身份** | ✅ **确认缺失**（confirmed, 内部评估 Pi 0/6 vs Epitome 5.5/6） | 无身份层/凭证管理/auth 继承/多租户。**最清晰的差异化机会** |
| **GenUI 抽象** | ⚠️ 机会真实但**比想象窄** | 缺的是“agent 生成 UI 的通用组件库 + 跨平台规格”，不是可组合性/状态 |
| **Agent 打包/市场** | ⚠️ 半成熟 | 有 npm `pi-package` + `pi.dev/packages`，但无中心化发现/curation 层——可做“agent 的 npm/marketplace” |
| **Agent-to-Agent 通信** | ❌ **并非空白**（refuted） | oh-my-pi 已有 IRC 工具 + AgentRegistry + 类型化 subagent 编排；Cola 有 session-spawned 多 agent。别把它当处女地 |
| **TypeScript 锁定** | 双刃 | 类型安全（TypeBox）是优势，但把第三方工具锁进 JS/Node 生态，限制采用 |
| **依赖漂移风险** | ⚠️ 高 | 快速变动的 LLM API + provider 抽象泄漏（thinking/vision/tool 调用跨 provider 行为不一）；锁版本能缓解但不消除 |
| **生产硬化** | ⚠️ 未完成 | GitHub 多个 issue（#5445/#5420 等）报“Cannot continue from message”崩溃、配置 reload、工具 replay 同步 bug；54 open issues |
| **采用率** | ❓ 低置信度 | star 数强（earendil-works/pi ~60k；另有“250k+ 周内”说法，来源不一致）但无遥测证明真实生产使用 |

### 3.4 Pi vs Claude Code 对比

| 维度 | Pi | Claude Code |
|---|---|---|
| 形态 | TypeScript npm 包，4 层 | 单体 198MB Bun 二进制 |
| 工具数 | 4（+可选 grep/find/ls） | 27 |
| 系统提示词 | <1000 tokens（hello 任务实测 2,768 tokens / $0.0031） | ~10k（hello 实测 28,407 tokens / $0.0391） |
| 权限/sub-agent | 无内置（靠扩展/容器） | 内置 |
| 哲学 | 模块化极简，用户选复杂度 | batteries-included |
| 上下文控制 | 绝对控制、完全可观测 | 被批“背后注入隐藏上下文”“频繁改系统提示词扰乱工作流” |
| 缓存稳态 | 单次便宜，但稳态下 OpenCode 等的缓存可反超 | 缓存机制成熟 |

([Mario 博客](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), [c-daniele 对比](https://c-daniele.github.io/en/posts/2026-05-18-coding-harness-comparison/), [lucumr](https://lucumr.pocoo.org/2026/1/31/pi/))

### 3.5 给本泽马 / Agora 的具体建议

1. **不要重造 harness。** 在 Pi（或其 SDK 层 pi-ai/pi-agent-core）之上建，把工程预算投在分发 + GenUI + 身份。harness 是 commodity，自建只换来独立性、却赔上社区与扩展生态。
2. **把“可移植身份”作为头号差异化。** 这是被核实确认的空白（Pi 0/6）。做 auth 继承 / 凭证路由 / 多租户 agent 执行——这层既是技术护城河，又是 B 端刚需。
3. **GenUI 论题要精准定位。** 别声称“填补 Pi 的可组合性空白”（那不准确）。真正的产品是**“agent 生成 UI 的声明式组件库 + 跨平台渲染规格”**——把 OpenClaw 的 A2UI 当作既有锚点研究/兼容，而非从零造协议。
4. **分发学 OpenClaw，但别神化它。** IM-first + 情感黏性（持久记忆/心跳/养成感）是可复制的产品杠杆；同时知道它是 local-first 独立架构，不要把战略绑死在“Pi 模块化证明”叙事上。
5. **Agent 市场是可争夺的中间地带。** npm `pi-package` + `pi.dev/packages` 已存在但无中心化 curation——“agent capability package 的发现/分发/计费层”是无主之地，与 Agora 的方向契合。
6. **对依赖漂移做工程对冲。** 锁版本（`save-exact` + `min-release-age`）、把 provider 抽象泄漏（thinking/tool 调用差异）纳入测试矩阵、自己 pin Pi 版本——别让上游系统提示词/API 变动击穿你的工作流。
7. **生产硬化是你的机会也是风险。** Pi 有未完成的多轮状态/会话 bug；如果你 B 端化，把“会话可靠性 + 崩溃恢复 + 多租户隔离”做成卖点。
8. **许可清白，放心建。** MIT，无商业限制；但意味着**任何人都能复制你 harness 层的一切**——再次印证护城河必须在更高层。

---

## 4. Pi 有意思的内容

### 4.1 OpenClaw / 龙虾（龍蝦）的故事

- **“养龙虾”亚文化**：OpenClaw 在中国早期病毒期的代号关联“龙虾/龍蝦”，用户把维护长期存活的 agent 实例当成**养成游戏**——“很多人拿它其实不是做什么重要工作，很多时候像养成系一样”，反复“捞救”自己的小龙虾。([[播客推荐  戴雨森的创投观察第2集]])
- **“它记得我”的神奇感**：所有内容在一个大聊天里、只靠每天整理 `memory.md` 实现记忆。研究员们一开始**不以为然**（觉得 context 会串、会幻觉），但用户的情感连接是真实的——“对齐文件写得比较有人味”，产生情感投射。这是反直觉的设计胜过了“会话隔离”的工程正统。
- **心跳机制（heartbeat）**：每 30 分钟让模型检查有没有没做的事。“讲出来都很简单，但其实让模型在长程任务上完成得更好。”——用生物学隐喻 humanize agent 自治，在 agent 设计话语里很不寻常。

### 4.2 文化与反直觉设计

- **从“套壳”到“harness 工程”的语义翻转**：“去年大家都说这是套壳、不重要，现在大家说原来这叫 harness、变得很重要。”这是 2024→2025 VC/工程文化的关键转折点。([[播客推荐  戴雨森的创投观察第2集]])
- **“token 亿万富翁”梗**：源自 OpenAI Frontier 团队 5 个月零人类手写代码造 1M 行的实验，Ryan Lopopolo 自称烧“每天 10 亿 token（~$2-3k/天）”。他刻意“拒绝自己写代码”，逼出洞察：**人类的同步注意力才是真正稀缺资源**——“唯一根本稀缺的是我团队的同步人类注意力……一天就那么几小时，我还想睡觉。” ([extreme-harness-engineering-token-billionaires](/raw/articles/harness-engineering/extreme-harness-engineering-token-billionaires/))
- **“ghost library”模式**：把软件当作高保真规格（spec）而非共享源码分发——coding agent 能从规格重建复杂系统，反转了传统开源的代码共享逻辑。
- **Mario 的“独裁式”维护**：主仓库严格控制贡献以保持专注与可维护性，但对社区分歧的回应是“恳请你 fork”——一种罕见的“专制内核 + 自由分叉”治理哲学。

### 4.3 值得记住的金句

- *"if I don't need it, it won't be built."* —— Mario Zechner
- *"Claude Code 是一艘太空船，80% 的功能我用不上。"*
- *"前沿模型被 RL 训练到骨子里，天生理解 coding agent 是什么。read/write/edit/bash 四个工具就是你需要的全部。"*
- *"你省略什么，比你放进什么更重要（what you leave out matters more than what you put in）。"*
- *"一旦你的 agent 能写代码、能跑代码，安全（剧场）基本就 game over 了。"*
- *"如果 pi 不合你用，我恳请你 fork 它。我是认真的。"*
- *"软件造软件——agent 创造自己的工具、技能、扩展，而非组装预制组件。"*

### 4.4 中国社区接受度

- 中国技术社区（linux.do、广密/guangzhengli 的 pi-ai & agent-core 课程笔记）把 Pi 当“最强 AI Agent”教程对象热议；Meng Shao（@shao__meng）称 Pi 为“**当今系统提示词最短的编程 Agent**”。([guangzhengli](https://guangzhengli.com/notes/pi-ai-and-agent-core-course), [Meng Shao X](https://x.com/shao__meng/status/2017745045156467003))
- ⚠️ **需谨慎的传言（低置信度/查无实据）**：流传的“中国社区活跃 fork 如 `zenobi-us/pi-dcp`”经核实 **GitHub 上零结果**；“单功能 67% token 节省”**无公开实证**；引用的 linux.do 帖子返回 **403 无法验证**。`mksglu/context-mode`、`ace-tool` 等工具确实存在，但**与 pi 的直接关联未被证实**。请勿在对外材料中引用这些未证实的具体 fork/数字。(verdict: *partially_confirmed → 多项 refuted/unverified*)

---

## 参考来源

**一手 / 核心**
- Mario Zechner, "What I learned building an opinionated and minimal coding agent" — https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
- pi-mono 仓库 — https://github.com/badlogic/pi-mono
- earendil-works/pi — https://github.com/earendil-works/pi
- coding-agent README — https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md
- extensions 文档 — https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/docs/extensions.md
- SDK 文档 — https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/docs/sdk.md
- 扩展示例 README — https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/examples/extensions/README.md
- pi.dev docs (extensions / session-format) — https://pi.dev/docs/latest/extensions · https://pi.dev/docs/latest/session-format
- pi.dev/packages（官方包目录）— https://pi.dev/packages

**分析 / 教程**
- Nader Dabit, "How to build a custom agent framework" — https://nader.substack.com/p/how-to-build-a-custom-agent-framework
- guangzhengli, pi-ai & agent-core course notes — https://guangzhengli.com/notes/pi-ai-and-agent-core-course
- deepwiki, pi-mono package architecture — https://deepwiki.com/badlogic/pi-mono/1.1-package-architecture · /4.3-session-management-and-history-tree
- Sean Pedersen, pi-agent — https://seanpedersen.github.io/posts/pi-agent/
- Armin Ronacher (lucumr), "pi" — https://lucumr.pocoo.org/2026/1/31/pi/
- c-daniele, coding harness comparison — https://c-daniele.github.io/en/posts/2026-05-18-coding-harness-comparison/
- Terminal-Bench 2 leaderboard — https://llm-stats.com/benchmarks/terminal-bench-2

**Fork / 下游**
- oh-my-pi (can1357) — https://github.com/can1357/oh-my-pi
- OpenClaw — https://github.com/openclaw/openclaw
- OpenClaw agent-runtime 架构 — https://docs.openclaw.ai/agent-runtime-architecture
- Cola 0.3.10 Deep Analysis — [Cola_0.3.10_Deep_Analysis](/raw/Inbox/Cola_0.3.10_Deep_Analysis/)

**社区 / 文化**
- Meng Shao (@shao__meng) on Pi — https://x.com/shao__meng/status/2017745045156467003
- 戴雨森的创投观察 第2集（播客）— [[播客推荐  戴雨森的创投观察第2集]]
- 极致 harness 工程 / token 亿万富翁 — [extreme-harness-engineering-token-billionaires](/raw/articles/harness-engineering/extreme-harness-engineering-token-billionaires/)
- linux.do pi 讨论（注：HTTP 403，内容不可验证）— https://linux.do/t/topic/1680124
- npm `pi-package` 搜索 — https://registry.npmjs.org/-/v1/search?text=pi-package

---

*说明：本报告基于已验证的研究数据合成。凡 verdict 标注为 refuted 的说法（OpenClaw 9 渠道、A2A 与 Pi 无关、生态荒芜、中国社区具体 fork/67% 数字）均已在正文校正，未作为事实陈述。star 数、采用率等无遥测佐证者已标低置信度。由 LLM 从 raw/ 与查询数据编译。*
