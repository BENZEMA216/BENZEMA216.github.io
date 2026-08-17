<!--
status: historical
status_reviewed: 2026-07-17
evidence_level: discussion-draft
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# BENZEMA 创业故事 v0.1

> [!warning] 历史叙事
> 本文记录 2026-05-14 的方向收敛过程，不代表当前公司定义。当前表达见 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)。

> Query: "从头梳理一遍我们的创业故事"  
> 日期: 2026-05-14  
> 状态: discussion draft，可继续改成 BP 开场、官网 about、融资邮件或个人叙事

---

## TL;DR

这条创业线不是从 "我要做一个 Agent marketplace" 开始的。

它真正的起点是一个更朴素的观察：

**AI 已经能生成很多东西，但人类真正有价值的工作流、上下文、判断力和失败经验，还没有被稳定地保存、复用、分发和交易。**

我们一路探索过 Creative CoWork、LLM Wiki、convo-wiki、Knowledge Agent Network、Agent Economy、Agora、AI Chronicle、NightShift。表面上这些方向很散，底层其实都在回答同一个问题：

> 如何把少数 power user / creator / researcher 已经调出来的 AI 能力，编译成别人也能安装、验证、运行、更新和付费使用的生产资料？

所以现在最清楚的主线不是 "做一个 AI 工具"，而是：

**把 AI 时代散落在人、对话、项目、runtime 和本地环境里的 know-how，编译成可复用的能力对象。**

这句话落到产品上，就是 Agora 的 Agent Capability Package；落到知识上，就是 LLM Wiki / KAN；落到创作上，就是 Creative CoWork 的 Studio / Skill；落到 GTM 上，就是先用 1-3 个高价值 workflow 跑通一个极窄闭环。

---

## 一句话版本

**BENZEMA 要做的是 AI 时代的能力商品化基础设施：把专业创作者和 power users 调出来的 Agent workflow，变成可安装、可验证、可计费、可持续更新的能力包。**

更口语一点：

> 今天会用 Agent 的人，已经在自己的机器、账号、对话和项目里调出了很多真实能力；但这些能力没法像软件一样交付给别人。我们要把这些能力编译成产品。

---

## 从头讲故事

### 1. 最早的入口：创作者不是缺模型，而是缺上下文工作台

Creative CoWork 的出发点很具体：AI 创作者已经能用即梦、可灵、Runway、剪映、Midjourney、SD 等工具赚钱，但真实生产流程极其碎片化。

访谈里反复出现几个痛点：

- 角色一致性很难维护。
- 素材、参考、生成结果、审核记录散落在多个工具和微信群里。
- 大量时间花在抽卡、筛选、返工，而不是创作判断。
- 真实工作更像 "一个导演 + 多个 Agent / 工具"，不是一键全自动。

所以 Creative CoWork 的核心定义是：

> 创作项目的上下文容器 + Agent + 可定制 Studio。

这一步形成了第一层判断：**AI 产品的价值不只是生成，而是把一个项目的上下文组织起来，让 Agent 能长期工作。**

这也是后面所有方向的源头。Context Container 后来变成了 LLM Wiki 的 raw/wiki/output，也变成了 Agora 能力包里的 context pack、memory schema、runtime adapter。

### 2. 第二个入口：自己的思考也散落了，必须被编译

后来问题从创作者身上回到自己身上。

过去几个月的 AI 对话、研究、决策、试错，散落在 Claude、Codex、Cursor、Gemini、OpenClaw、Obsidian 等多个地方。不是没有数据，而是没有一处能回答：

- 我到底想过什么？
- 哪些是 try，哪些是真的 decision？
- 哪些方向只是兴奋一晚，哪些方向持续出现？
- 我现在的创业主线到底是什么？

convo-wiki 的关键发现是：**Agent 记住信息，人记住反应。**

v0.0.1 想提取 "知识"，效果不够打中人；v0.0.2 开始提取 "用户注意力"，质量跳升；v0.0.4 严格区分 decision / try / milestone / aha / open-loop，才开始诚实地反映真实行动轨迹。

这一步形成了第二层判断：

> AI 时代最稀缺的不是更多 raw data，而是把 raw conversation 编译成人能理解、能复盘、能继续行动的 narrative artifact。

LLM Wiki 不是笔记工具，而是一个 compiler。它把 raw material 编译成 concepts、maps、connections、summaries、log。这个 vault 自己就是最好的 dogfood。

### 3. 第三步：如果我的 Wiki 有价值，它就应该能被别的 Agent 查询

当个人 LLM Wiki 跑通后，下一个问题自然出现：

> 如果我深度研究了 Agent Communication、Agent Economy、World Model，为什么别人的 Agent 不能直接来查询我的 compiled knowledge？

这就是 Knowledge Agent Network。

它的四阶段非常清楚：

1. Personal LLM Wiki：个人知识被编译。
2. Wiki Agent：wiki 通过 MCP / API 被查询。
3. Agent Network：多个 Wiki Agent 互相发现、路由、查询。
4. Knowledge Economy：知识查询开始有定价、声誉、分润和 marketplace。

这一步把故事从 "个人知识管理" 推到了 "知识经济"。

但也暴露出一个更普遍的问题：知识只是能力的一种。真正更大的市场，是所有能被 Agent 调用和复用的专业能力。

### 4. 第四步：从知识能力，扩展到 Agent 能力商品化

Agent Economy 线里最核心的洞察是：

**能力孤岛 + 创作者零激励。**

今天已经有很多人会写好用的 prompt、skill、MCP server、workflow、Claude Code 配置、Cursor 规则、本地脚本、自动化链路。但这些东西大多只能私下传播：

- prompt 太容易复制，不是好商品。
- MCP server 只是动作接口，没有 workflow。
- GPT / bot 太浅，不能承载完整运行态。
- GitHub repo 不能解决安装、权限、验证、付费、更新和支持。
- 本地 runtime 里想靠加密保护 skill，商业上不成立。

所以 Agora 的主句变成：

> Agora 不是另一个 Agent runtime，而是第三方 Agent 能力的 Publisher + Installer + Verification + Update + Distribution + Billing layer。

它的核心 primitive 是 Agent Capability Package：

```text
skill / prompt / workflow
+ MCP / tool config
+ runtime adapter
+ resource binding
+ memory schema / context pack
+ canonical tests / smoke tests
+ permission scope
+ pricing / entitlement
+ event ledger
+ update channel
```

这一步把前面几条线统一起来：

- Creative CoWork 的 Studio，本质是创作 workflow 的能力包。
- LLM Wiki / KAN，本质是知识查询能力包。
- Agent-VM，本质是本地安装和激活能力包的 activation layer。
- Agora，本质是这些能力包的发布、验证、计费和分发层。

### 5. 最近的支线：AI Chronicle 和 NightShift 不是偏离，而是补足证据

AI Chronicle 当前在 active context 里排第一，但它更像一个信息产品 / 数据资产 / 市场观察器，而不是主叙事的终局。它验证的是另一件事：

> AI 时代需要编年史式的结构化记忆，不只是融资数据库，而是公司、产品、创始人、milestone 的时间线。

它可以成为内容/data wedge，也可以服务融资研究、创业地图、投资人 briefing，但目前还没有像 Agora 那样直接承接 "能力商品化" 这条大主线。

NightShift 则提供了另一个重要战术：

> 当一个能力还太难直接产品化时，先做 benchmark，定义这个能力应该如何被测量。

NightShift 的洞察是 "用户睡觉时，Agent 在真实手机上做长任务"。但它最现实的 MVP 不是直接做 iPhone Agent，而是先做中国 App + 长任务 + 真机 GUI Agent benchmark。这个模式可以反哺 Agora：能力包要商业化，必须有 canonical tests；谁定义测试，谁定义市场语言。

---

## 统一后的创业主线

把所有线压缩后，主线可以写成三层：

### 第一层：世界变化

Agent 正从聊天框变成生产系统。Claude Code、Codex、MCP、Managed Agents、Skills、Routines、browser runtime、local workers 都在把 Agent 推向真实工作流。

但模型厂和大平台主要在补 runtime、connector、memory、sandbox 和工作台。开放生态里缺的是第三方能力如何被交付。

### 第二层：核心缺口

今天真正有价值的 Agent 能力，存在于少数人的本地环境和长期试错里：

- 一个创作者调出来的短视频选题和分镜流程。
- 一个研究者维护的 LLM Wiki 查询能力。
- 一个开发者沉淀的 repo onboarding / code review workflow。
- 一个运营者跑通的小红书/抖音/淘宝账号任务链。
- 一个团队内部反复使用的私有 SOP。

这些能力不是一句 prompt，也不是一个 bot，而是上下文、工具、权限、测试、失败经验和更新维护的组合。

### 第三层：我们的答案

把这些能力编译成 Agent Capability Package，并提供完整交付链：

```text
Creator workflow
→ package extraction
→ redaction / permission design
→ install / local binding
→ smoke test / canonical test
→ update / support
→ entitlement / billing / event ledger
→ marketplace / reputation
```

早期不做大而全 marketplace。先强运营 3 个高价值能力包，证明：

1. 创作者愿意把 workflow 产品化。
2. 用户能在自己的 runtime 里安装并跑通。
3. 能力可以通过测试证明有效。
4. 用户愿意为结果、更新、兼容和支持付费。
5. 创作者能拿到收入。

---

## 对外叙事版本

### 30 秒版

过去一年，Agent 能力提升很快，但真正会用 Agent 完成工作的人还是少数。大量 know-how 被困在个人 prompt、Claude Code 配置、MCP server、本地脚本和私有 workflow 里，别人既装不上，也验证不了，更没法付费使用。

我们在做 Agora：把这些成熟 Agent workflow 编译成可安装、可验证、可计费、可持续更新的能力包。早期从 AI 创作者和 power users 的高价值 workflow 切入，长期做 Agent 能力商品化的基础设施。

### 2 分钟版

我们最早做 Creative CoWork 时，看到 AI 创作者不是缺生成工具，而是缺一个能承载素材、参考、对话、版本、失败结果和多工具链路的上下文工作台。后来我们把同样的问题搬到自己的知识生产里，做了 LLM Wiki 和 convo-wiki：把散落的 AI 对话、文章和研究编译成可以长期查询、复盘和继续行动的 wiki。

这两条线最后指向同一个判断：AI 时代的价值不在 raw generation，而在把高质量 workflow 编译成可复用对象。

现在 Agent 生态正在快速成熟，Claude Code、Codex、MCP、Skills、Managed Agents、local runtime 都在让 Agent 进入真实生产系统。但第三方创作者调出来的能力仍然很难交付给别人。prompt 太浅，MCP server 太裸，GitHub repo 太难装，GPT Store 又不适合本地账号和复杂权限。

Agora 要解决的是这中间层：Agent Capability Package。它把 skill、workflow、tool config、runtime adapter、context pack、permission scope、tests、pricing 和 event ledger 打成一个可安装、可验证、可计费、可更新的能力商品。早期我们不做泛 marketplace，而是强运营 3 个高价值能力包，先证明用户能跑通、创作者能赚钱、能力能持续维护。

### 投资人版

AI/Agent 的能力在快速增长，但生产率释放被卡在 workflow know-how 的分发上。真正能完成任务的 Agent 能力，今天被困在少数 power users 的本地环境、私有账号、prompt、MCP 配置、Claude Code/Codex 习惯和反复试错里。市场缺的不是另一个 runtime，而是把这些能力变成可交付生产资料的分发层。

Agora 是 Agent 能力包发布与分发平台。我们把一个 Agent 的 prompt、skill、workflow、tool config、runtime adapter、context、权限边界、测试集、价格和更新渠道打包成能力包，让用户能在自己的 runtime 和本地环境中安装、验证和运行，让创作者通过订阅、更新、托管保护步骤和支持获得收入。

长期看，Agent 经济需要的不只是通信协议和工具协议，还需要 discovery、trust、billing、audit、settlement 和 reputation。Agora 从极窄的能力包交付服务开始，逐步变成跨 runtime 的 Agent Capability Marketplace。

---

## 什么不要讲

1. **不要讲成通用 Agent Store。** 这个词会让人想到 GPT Store / Coze，显得浅。
2. **不要讲成卖加密 skill 包。** 本地标准 runtime 里源码保护不成立，商业价值应来自持续更新、验证、支持、托管保护步骤和结算。
3. **不要讲成另一个 runtime。** runtime 会被 Claude / OpenAI / Cursor / 云厂继续上移吃掉。
4. **不要把 AI Chronicle 放成主创业故事。** 它是数据/内容/市场情报支线，除非你明确决定 pivot。
5. **不要一上来讲宏大的 Agent 网络。** 先讲 productivity gap 和一个能力包如何跑通。
6. **不要只讲创作者工具。** Creative CoWork 是起点，但 Agora 应该是跨创作、知识、代码、本地账号任务的能力商品化层。

---

## 当前诚实状态

最强主线：**Agora / Agent Capability Package**。

已有资产：

- Creative CoWork：创作者上下文与 workflow 的原始行业洞察。
- User interviews：漫剧/短剧团队对角色一致性、上下文分散、工具碎片化的真实痛点。
- LLM Wiki / convo-wiki：自己 dogfood 的知识编译系统。
- KAN：从个人 wiki 到知识 agent 网络的长期愿景。
- Agora BP：能力包、商业模式、financial model、Claude blog 旁证、竞品和投资图谱。
- Agent-VM：本地 Agent Profile / runtime adapter 的 activation layer 原型。
- NightShift：benchmark-first 的战术模板。
- AI Chronicle：AI 公司与产品 milestone 数据资产。

最大缺口：

- 还没有一个被真实用户付费使用的能力包。
- 还没有一个创作者因为能力包获得收入。
- 还没有证明安装成功率、smoke test 通过率、复购或续费意愿。

所以接下来不是继续扩写宏大叙事，而是把故事压成一个可以验证的服务闭环。

---

## 14 天建议动作

1. **选第一个 lighthouse capability。** 最合适的候选是 `llm-wiki-query`、`repo-onboarding/code-review`、`小红书/创作者内容 workflow` 三选一。
2. **用 Agent-VM 做安装层。** 不追求 marketplace，先做到一个 package 能被导出、安装、绑定资源、跑 smoke test。
3. **写 capability package spec v0.1。** 字段只保留 manifest、runtime adapter、resource binding、tests、pricing/update、event ledger。
4. **找 3 个种子用户真实安装。** 目标不是点赞，是 "15 分钟内跑通一次真实任务"。
5. **找 1 个创作者共创。** 把他的 workflow 产品化，哪怕早期人工服务很重。
6. **产出一个 demo video。** 叙事顺序是：散落 workflow → 编译成能力包 → 本地安装 → smoke test → 完成任务 → event ledger。
7. **AI Chronicle 暂时只作为市场研究侧支线。** 不要让它抢主线，除非它能反过来服务能力包 discovery / creator intelligence。

---

## 最终推荐口径

这版故事最稳的标题不是 "Agent Marketplace"，而是：

> **Agent Capability Package: turning expert AI workflows into installable products.**

中文可以是：

> **把专家调出来的 AI 工作流，变成别人也能安装、验证、运行和付费使用的能力产品。**

这句话能同时容纳 Creative CoWork、LLM Wiki、KAN、Agora、Agent-VM 和未来的能力市场，而且不会过早被某一个具体产品形态锁死。

---

## 关键来源

- `wiki/maps/creative-cowork-product.md`
- `wiki/maps/user-research-insights.md`
- `raw/projects/creative-cowork/02 Creative CoWork - 产品深化.md`
- `output/ideas/01-agent-economy-infra.md`
- `output/ideas/03-convo-wiki.md`
- `output/ideas/05-ai-chronicle.md`
- `output/ideas/nightshift/product-thinking.md`
- `wiki/concepts/knowledge-agent-network.md`
- `wiki/connections/llm-wiki-to-agent-network.md`
- `output/reports/agora/03-product/llm-wiki-product-opportunity.md`
- `output/reports/agora/03-product/knowledge-agent-network-idea.md`
- `output/reports/agora/03-product/conversation-wiki-fusion-spec.md`
- `output/reports/agora/03-product/agora-bp-agent-capability-package.md`
- `output/reports/agora/04-business-model/agora-business-model-after-skill-trilemma.md`
- `output/reports/agora/02-market-competition/agent-distribution-atomic-units.md`
- `output/reports/agora/02-market-competition/china-product-startup-first-funding.md`
