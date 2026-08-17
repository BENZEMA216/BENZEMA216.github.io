# AI 时代的产研迭代与思考 —— 五场访谈/演讲的综合提炼

> Query 产出 | 2026-05-31
> 主题：当"写代码不再是稀缺资源"，Anthropic 与 OpenAI 的产品/工程/设计/研究负责人如何重构产研迭代

## 关于"逐字稿"的说明

用户列出的五个内容均为**视频/播客/现场演讲**，完整逐字稿（full transcript）保存在下列原始来源里（多为付费 newsletter 或视频）。本报告做的是：**逐源提炼每位讲者的核心论点 + 可引用原话（英文原文 + 中译）**，再做横向综合。如需把某一篇的完整 transcript 收进 `raw/`，可单独抓取对应视频字幕。

| # | 讲者 | 身份 | 主题 | 主要来源 |
|---|---|---|---|---|
| 1 | Cat Wu | Head of Product, Claude Code/Cowork | 如何让产品迭代变快 | [Lenny's Podcast](https://www.lennysnewsletter.com/p/how-anthropics-product-team-moves) · [YouTube](https://www.youtube.com/watch?v=PplmzlgE0kg) |
| 2 | Fiona Fung | Director of Eng, Claude Code | 代码不再稀缺后对产研的影响 | [Code with Claude 2026 会议笔记](https://chrisebert.net/notes-from-code-with-claude-2026/) · [developing.dev 访谈](https://www.developing.dev/p/anthropic-eng-leader-and-ex-senior) |
| 3 | Alex Albert | Research PM | Claude 的新特性是怎么设计出来的 | [Creator Economy 访谈](https://creatoreconomy.so/p/inside-how-anthropic-is-building-the-next-claude) |
| 4 | Jenny Wen | Design Lead, Claude | 传统设计流程的消亡 | [Lenny's Podcast](https://www.lennysnewsletter.com/p/the-design-process-is-dead) · [Roger Wong 笔记](https://rogerwong.me/2026/03/the-design-process-is-dead-jenny-wen-head-of-design-at-claude) |
| 5 | Tibo Sottiaux & Vijaye Raji | Head of Codex Eng / CTO of Applications, OpenAI | 把 Codex 视为研发同事 | [Pragmatic Engineer: How Codex is built](https://newsletter.pragmaticengineer.com/p/how-codex-is-built) · [Pragmatic Summit 视频](https://www.youtube.com/watch?v=Bo6Gtq3nMXc) |

---

## 一、逐人提炼

### 1. Cat Wu —— 如何让产品迭代变快

**核心论点：迭代节奏从"月"压缩到"周"再到"天"，PM 角色随之重写。**

- **节奏压缩**：发布周期 "from months to weeks to days"。2026 年前三个月 Claude Code 上了 45+ 个新特性。
- **流程即敌人**：Anthropic 极度去流程化——"Anthropic's mission alignment eliminates the friction that slows most large organizations"。每个人都被授权在一周内把一个 idea 从想法做到上线。
- **在模型能力到位前就造产品**：最反直觉的一条——*"build products that don't yet fully work, so you're ready when the next model closes the gap."*（先造还不完全 work 的产品，等下一代模型补上能力差时你已就位）。PM 要为"未来的能力"做架构，而不是为"当下的约束"。
- **PM 的新技能**：除了用户研究和指标，必须会 **AI evals、能力评估（capability assessment）、理解模型边界**。
- **角色融合**：PM / Eng / Design 边界模糊，最重要的工作原则是 **"just do things"**，减少交接。
- **被低估的 AI 技能**：让模型"自省自己的错误"（ask the model to introspect on its own mistakes）是简单但强大的评估手段。

### 2. Fiona Fung —— 代码不再稀缺后，产研被如何重塑

**核心论点（一句话）：*"the bottleneck moved from coding to everything around coding."*（瓶颈从写代码转移到了写代码周边的一切。）**

- **旧约束 vs 新约束**：旧瓶颈是写+测代码的带宽；新瓶颈是 **review 能力、验证（verification）、跨职能协调、安全**。
- **被打破/重写的流程**：
  - **Design doc 先行**这个仪式基本消失——"the 'design doc before any code' ritual is largely gone"。
  - **规划靠原型而非前期设计**（prototyping rather than upfront design）。
  - **技术争论**："In technical debates, code wins" —— 两个方案都做原型，用代码定胜负。
  - **Code review** 围绕"哪些真正需要深审"的人类判断来组织，而非全量覆盖。
  - **Onboarding** 重构，因为"问蠢问题"现在零成本。
  - **验证（verification）加倍投入**——这是吞吐量暴涨后唯一能守住质量的方式。
- **强制函数**："Claudify everything you can"（能让 Claude 干的全让它干）是对所有工程师的普遍期待；并明确"允许杀掉旧流程"，制造 forcing function。
- **工程角色转变**：从"直接写代码"转向"管理一支异步 agent 舰队"。

### 3. Alex Albert —— Claude 的新特性是怎么设计出来的

**核心论点：能力是"在预训练之前"就押注好的，模型与 harness 是耦合设计的。**

- **能力押注前置**：团队 "picks the big capability bets upfront before pre-training"（如 coding、knowledge work）。这些押注来自**企业客户访谈** + **Anthropic 员工自己干活时撞到的墙**。
- **模型与 harness 耦合**："The model and the harness are coupled. Each surface wraps the model in a different prompt and tool setup." —— 同一个模型，因所处 surface（Claude / Cowork / Claude Code）不同而表现不同。Research PM 必须跨多个产品面同时评估模型表现。
- **可逆决策几乎免费**："If it's not a one-way door, then it's essentially free." —— 非单向门的决策就大胆试。
- **反馈回流训练**：用户反馈流入模型训练过程；并有专门研究者研究 Claude 自主性提升后的哲学问题（如 consciousness）。

### 4. Jenny Wen —— 传统设计流程的消亡

**核心论点：被奉为圭臬的设计流程已死，取而代之的是"品味 + 产品判断"。**

- **流程之死**："This design process that designers have been taught, we sort of treat it as gospel. That's basically dead." 高层步骤还在，但**设计师把时间花在哪儿被重新分配了**。
- **被工程逼着变**："engineers can go off and spin off their seven Claudes" —— 工程师可以同时跑 7 个 Claude，代码几小时就上线，设计师再也不能用数月的 discovery–diverge–converge 去 block 工程。
- **时间分配的迁移**：
  - 过去：60–70% 时间在 mocking / prototyping。
  - 现在：mocking 降到 30–40%，另外 30–40% 花在**与工程师直接 jamming 和 pairing**，外加实现。
- **新的稀缺是"产品判断"而非"视觉判断"**：当设计师离产品更近（在生产环境修 bug、对着活模型做原型），他们用的判断是 **product sense**——知道哪些方案值得上线、哪些 edge case 会击穿信任、模型输出何时"够好"。这就是 taste。
- **新设计原则**：
  - **缩短愿景时间轴**：2–5 年愿景过时，改为 **3–6 个月的方向性原型**。
  - **拥抱非确定性设计**：AI 产品没法完全 mock，要**用真实模型 + 真实用户来设计**。
  - **高标准下的心理安全**（psychological safety with high standards）。
- **招聘新原型**：偏爱"crack new grads"——没有被旧流程和仪式固化的"白纸"早期设计师。

### 5. Tibo Sottiaux & Vijaye Raji（OpenAI）—— 把 Codex 当研发同事

**核心论点：Codex 从工具→扩展→agent→"队友"，工程师变成"agent manager"。**

- **从工具到队友**（Vijaye Raji）：Codex "evolved from being just a tool, to an extension, to an agent, and now it actually feels like a teammate."
- **多 agent 并行是默认形态**：典型工程师同时跑 **4–8 个并行 agent**，分别做功能实现、code review、安全审计、代码库理解。"Codex is really built for multitasking... most tasks will just get done to completion."
- **自举开发**：Codex 自身代码库 **90%+ 由 Codex 生成**（meta-circular）。
- **每代模型都要重新摸能力边界**："we have to relearn these capabilities with every model."
- **结构化护栏**：
  - **分级 review**：非关键代码 AI 审完即可合并，核心组件必须人审。
  - **测试驱动让 agent 必然成功**：刻意用完善的测试 + 清晰模块边界构造代码库，让 agent"成功是注定的"，失败时也有反馈回路。
  - **夜间自动审计**：每晚 Codex 跑一遍找问题，修复排队等早上人审。
- **什么仍然属于人**：**taste 与方向**——战略方向、质量标准、关键系统的最终决策权仍在人类工程师手里。

---

## 二、横向综合：五人共识下的"AI 时代产研范式"

把五个视角叠在一起，浮现出一套高度一致的范式转移。

### 共识 1：稀缺资源换位 —— 编码不再是瓶颈

> Fiona："瓶颈从编码转移到编码周边的一切。"
> Codex：90% 代码自生成，工程师变 agent manager。

写代码的边际成本趋近于零。**新瓶颈 = 验证 + review + 协调 + 方向判断**。所有人的时间都在向"判断密集型"工作迁移。

### 共识 2：节奏压缩 —— 月 → 周 → 天

Cat Wu 的"months to weeks to days"和 Fiona 的"design doc 先行已死"是同一件事的两面：**当实现变快，任何"先规划数月再动手"的仪式都成了净负债**。技术争论用原型解决（code wins），愿景从 2–5 年缩到 3–6 个月（Jenny Wen）。

### 共识 3：角色边界消融，taste 成为通用货币

- Cat Wu："just do things"，PM/Eng/Design 互相渗透。
- Jenny Wen：设计师的核心价值从 visual judgment 变成 product sense。
- Codex：人保留的是 taste 和方向。

**当执行被 agent 抹平，差异化回到"判断力/品味"上。** 这是五人最强的共识：可外包的是生产，不可外包的是"知道什么值得做、什么够好了"。

### 共识 4：先于能力造产品 / 与不确定性共处

- Cat Wu：造"还不 work"的产品，等模型补差。
- Alex Albert：能力在预训练前就押注；模型–harness 耦合。
- Jenny Wen：用真实模型 + 用户做"非确定性设计"。

产研不再是"需求确定 → 设计 → 实现"的瀑布，而是**"押注未来能力 → 用真实模型探索 → 让用例在使用中浮现"**的探索式循环。可逆决策"essentially free"（Alex），所以默认多试。

### 共识 5：验证（verification）成为新的工程学科

吞吐量暴涨后，唯一守住质量的办法是把验证"左移"并系统化：Fiona 的"verification 加倍"、Codex 的"分级 review + 测试驱动 + 夜间审计"、Cat Wu 的"AI evals"、Alex 的"让模型自省错误"——**evals/验证从边缘技能变成产研核心能力**。

---

## 三、Anthropic vs OpenAI：同一范式的两种语气

| 维度 | Anthropic（Cat/Fiona/Alex/Jenny） | OpenAI Codex（Tibo/Vijaye） |
|---|---|---|
| 核心隐喻 | "去流程 + 角色融合 + taste" | "Agent 是队友，工程师是 agent manager" |
| 切入层 | 组织/流程/角色重写 | 工具形态 + 工作流（多 agent 并行） |
| 共同点 | 编码不再稀缺、验证成瓶颈、人保留方向与品味、每代模型重学能力边界 | 同左 |
| 差异 | 更强调"杀掉旧仪式"和"先于模型造产品" | 更强调"并行 agent 编排 + 结构化护栏（测试/分级 review/夜审）" |

两家把同一个底层事实（写代码变便宜）讲成了两个故事：Anthropic 讲"组织怎么重构"，OpenAI 讲"个人工作流怎么重构"。合起来正好是一枚硬币的两面。

---

## 四、给"产研团队"的可操作 takeaways

1. **砍仪式**：把"先写 design doc / 先写 PRD / 多年路线图"换成"原型先行、code wins、3–6 个月方向性押注"。
2. **重投验证**：把省下来的实现时间投到 evals、分级 review、自动审计上——验证是新的瓶颈也是新的护城河。
3. **训练 taste**：让 PM/设计/工程都更靠近活产品（修生产 bug、对真实模型做原型），判断力比职能边界更重要。
4. **先于能力下注**：为"下一代模型能做到"的产品提前搭架子，宁可暂时不完全 work。
5. **把 agent 当团队成员编排**：从"我写代码"转向"我管 4–8 个并行 agent"，并用测试+模块边界让 agent"成功是注定的"。
6. **招"白纸"**：没有被旧流程固化的人，反而更快适应新范式（Jenny Wen）。

---

## 来源

- Cat Wu — [How Anthropic's product team moves faster than anyone else (Lenny's)](https://www.lennysnewsletter.com/p/how-anthropics-product-team-moves) · [YouTube](https://www.youtube.com/watch?v=PplmzlgE0kg)
- Fiona Fung — [Notes from Code with Claude 2026 (Chris Ebert)](https://chrisebert.net/notes-from-code-with-claude-2026/) · [developing.dev 访谈](https://www.developing.dev/p/anthropic-eng-leader-and-ex-senior) · [Code with Claude session](https://claude.com/code-with-claude/session/sf-running-an-ai-native-engineering-org)
- Alex Albert — [Inside How Anthropic Is Building the Next Claude (Creator Economy)](https://creatoreconomy.so/p/inside-how-anthropic-is-building-the-next-claude) · [YouTube](https://www.youtube.com/watch?v=T4ieZPIEmd8)
- Jenny Wen — [The design process is dead (Lenny's)](https://www.lennysnewsletter.com/p/the-design-process-is-dead) · [Roger Wong 笔记](https://rogerwong.me/2026/03/the-design-process-is-dead-jenny-wen-head-of-design-at-claude)
- Tibo Sottiaux & Vijaye Raji — [How Codex is built (Pragmatic Engineer)](https://newsletter.pragmaticengineer.com/p/how-codex-is-built) · [Pragmatic Summit 视频](https://www.youtube.com/watch?v=Bo6Gtq3nMXc)

---
*Query 产出，归档于 output/reports/。如需把任一来源完整逐字稿收入 raw/，可单独抓取视频字幕。*
