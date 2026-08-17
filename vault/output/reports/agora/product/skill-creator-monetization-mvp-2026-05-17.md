<!--
date: 2026-05-17
tags: [agent-economy, skills-system, creator-monetization, marketplace, agora, mvp]
status: supporting
status_reviewed: 2026-07-17
evidence_level: product-mechanism
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
related:
  - "[agent-shopify-product-story-2026-05-14](/output/reports/agora/narrative/agent-shopify-product-story-2026-05-14/)"
  - "[agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/)"
  - "[agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)"
  - "[smithery-commercialization-2026-05-15](/output/reports/agora/market-competition/smithery-commercialization-2026-05-15/)"
  - "[vercel-skills-sh-commercialization-2026-05-15](/output/reports/agora/market-competition/vercel-skills-sh-commercialization-2026-05-15/)"
  - "[agent-ai-deep-research-2026-05](/output/reports/agora/market-competition/agent-ai-deep-research-2026-05/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
-->

# Skill 创作者变现功能评估与 MVP 建议

> [!note] 状态说明（2026-07-17）
> Producer Console、支付、授权、更新与真实收入闭环仍可复用；当前客户已从狭义 Skill creator 扩展为垂类创作者，当前公司定义见 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)。

> Query：我们一直在讨论怎么帮助 skills（给 Agent 增加能力的人）创作者赚到钱；请逐个思考现有功能项是否有价值、是否有效，是否还有更多可能性，MVP 最重要功能是什么，以及还需要做哪些调研。

## 0. 一句话结论

**帮助 Skill 创作者赚钱的核心，不是先做一个热闹的 Skill Store，而是先把创作者的 workflow 变成买家敢购买、能安装、能验证、能复购的能力商品。**

早期最应该做的是：

1. **Producer Console v0**：帮助创作者把 skill/workflow 编译成商品页、输入输出、权限、runtime、测试和定价。
2. **Install + Smoke Test**：让买家在付款前后都能看到它要访问什么、能不能在自己的环境跑通。
3. **Payment + Entitlement + Update Channel**：完成购买、授权、版本更新、售后和创作者分账。
4. **Curated Demand Loop**：先用人工策展、RFB/request board、lighthouse packages 连接真实需求，不急着做公域推荐流。

如果只做“上传 skill + 付款 + 下载”，会很快变成低价 prompt/template marketplace，创作者收入天花板低，买家信任也弱。

## 1. 当前外部校验

截至 2026-05-17 快速校验，市场已经出现几类相邻产品，但没有一个完整解决“创作者持续靠 skill 赚钱”的闭环。

| 产品/现象 | 已证明什么 | 仍缺什么 |
|---|---|---|
| [Agensi](https://www.agensi.io/home/) | 已经出现 paid SKILL.md marketplace，支持 80/20 分成、Stripe Connect、买家指纹、水印和安全扫描 | 更偏静态本地 skill 文件交易；本地执行的 IP 保护仍只能提高摩擦，不能成为根本护城河 |
| [skills.sh](https://skills.sh/about) | Vercel 正在占 agent context package manager 入口，做开放目录、install telemetry、安全审计和 API | 没有 paid skill、checkout、creator payout、entitlement；更像分发入口，不是商业后台 |
| [Smithery](https://smithery.ai/docs) | MCP discovery、OAuth、credential storage、Connect/Gateway 是真实基础设施痛点 | 解决“怎么连”，不解决“怎么卖、怎么结算、怎么退款、怎么分账” |
| [Agent.ai MCP Server](https://docs.agent.ai/mcp-server) | 平台内 agent/tools 可以通过 MCP 暴露给外部 assistant；listing/function schema 值得学 | 不是开放 creator payout 型 live-agent market；更偏平台 runtime |
| [Stripe Agentic Commerce](https://stripe.com/use-cases/agentic-commerce) | Agent commerce 的 payment/token/merchant-of-record 原语正在成熟 | 主要面向商品购买，不直接解决 Skill 履约、测试、失败归因和 creator payout |
| [Agent Skills 数据分析论文](https://arxiv.org/abs/2602.08004) | 公开 skill marketplace 已经足够大，能做 40,285 个 skill 的数据分析 | 生态同质化、意图冗余和安全风险明显，说明 marketplace 不能只靠数量 |
| [SkillProbe 安全论文](https://arxiv.org/abs/2603.21019) | Skill marketplace 的安全问题不只是单个恶意文件，还有跨 skill 组合风险 | 需要安全审核、权限声明、组合风险评估和运行审计 |

外部信号支持一个判断：**paid skill marketplace 会出现，但真正有壁垒的是 trust、install、runtime compatibility、entitlement、event ledger、support/update，而不是普通目录。**

## 2. 对现有功能项的逐点判断

### 2.1 流量池

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 私域 | 高 | 早期最有效。Skill 创作者天然先在微信、Twitter、Discord、GitHub、飞书群、课程社群里成交。平台应允许 creator 带自己的流量来开店、发 coupon、做私密链接和订阅更新 | P0 |
| 公域 | 中到高 | 长期重要，但早期容易变成垃圾 skill feed。没有测试、退款、安装成功率和 creator reputation，公域推荐只会放大低质供给 | P1/P2 |

结论：**先服务私域成交，再把交易和使用数据沉淀成公域排序信号。** 先做公域 feed 是顺序错误。

### 2.2 变现方式

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 定做 | 很高 | 早期最接近真实收入。很多买家不是要买通用 skill，而是要“把这个 workflow 改到我的场景能跑”。缺点是 service-heavy，但能帮平台学习需求 | P0 |
| 接广告 | 低 | 只有平台有大量注意力后才成立。早期做广告会污染信任，且对创作者真实收入帮助有限 | P3 |
| 建站，产品订阅 | 高，但要收窄 | 不应先做完整建站工具，而应做 creator storefront + 订阅更新/社群/support。买家不是为网页付费，是为持续可用能力付费 | P0/P1 |
| 单次调用 | 高，但依赖执行形态 | 对 hosted endpoint、protected step、MCP/API 能力很有效；对纯本地静态 skill 很难准确计量。需要 event ledger 和 run receipt | P1 |

结论：MVP 最好支持三种收入：**一次性购买、年/季订阅更新与 support、定做/咨询订单**。usage-based 单次调用可以作为 hosted protected step 的 P1，不要阻塞第一版。

### 2.3 信任度

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 第三方评测 | 高，但要自动化优先 | 主观评测只能补充信任。真正有效的是 smoke test、canonical test、runtime compatibility test、security scan、install success rate | P0/P1 |
| 可视化数据 | 高 | 但不要展示 vanity metrics。应展示测试通过率、最近更新时间、兼容 runtime、退款率、重复购买率、成功运行样例、支持响应 | P0/P1 |

结论：**信任不是“别人说好”，而是买家能看到它在类似环境下跑通过。**

### 2.4 用户体验：消费者前端

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 消费流程可视化 | 极高 | Agent capability 的购买恐惧来自不透明：访问什么、用谁账号、花多少钱、会不会写入/发布/付款。必须可视化权限、成本、runtime、安装步骤、测试结果 | P0 |
| 投后管理 | 高 | 买完后要能看到已购 skill、版本、更新、receipt、支持、退款、订阅状态、运行记录。否则复购和续费很难 | P0/P1 |

结论：消费者体验的核心不是“浏览更爽”，而是**降低安装和运行风险**。

### 2.5 用户体验：创作者前端

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 创作路径 | 极高 | 创作者最大痛点是从 workflow 到商品：怎么写 listing、声明输入输出、权限、安装、测试、定价、支持边界。Producer Console 是核心 | P0 |
| 投后管理 | 高 | 创作者要看销售、退款、支持 ticket、安装失败、用户运行日志摘要、版本采用率、收入。否则很难持续维护 | P1 |

结论：**创作者不是只需要上传按钮，而是需要商业后台。**

### 2.6 后端：延迟与并发

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 延迟 | 中 | 纯本地 skill / installable package 阶段不是核心。hosted execution 和 remote endpoint 阶段才重要 | P2 |
| 并发 | 中 | 同上。早期更重要的是可安装、可验证、可退款、可追踪 | P2 |

结论：除非第一版就做 hosted runtime，否则后端性能不是最关键风险。**早期关键风险是 failure attribution，不是 QPS。**

### 2.7 通道：支付与多收费模式

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 支付 | 极高 | 没有支付就没有 creator proof。可以先用 Stripe/微信/支付宝/手动订单，不必一开始自研 agent payment protocol | P0 |
| 同一产品支持不同收费 | 高 | 同一个能力需要免费样例、一次性购买、订阅更新、定做、团队 license、hosted step usage。价格弹性本身会提升成交 | P1 |

结论：支付要早做，但 agent-native payment protocol 可以晚做。**先证明买家愿意付钱和创作者能收到钱。**

### 2.8 安全

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 资金安全/储备金 | 中到高 | 当平台开始自动分账、退款和争议处理后很重要。早期可以用延迟结算、保留一定比例、人工仲裁 | P1 |
| 用户个人信息加密 | 高 | PII、secrets、OAuth token、cookie 不能进入 skill package；需要 credential subject、scope、redaction 和本地绑定 | P0 |
| 创作者能力资产加密 | 低到中 | 不能承诺“本地标准 runtime 下源码绝对保护”。加密只能防君子。更有效的是 hosted protected step、license、fingerprint、watermark、update/support、品牌和法律 | P0 作为诚实声明；技术深度 P1 |

结论：**用户安全要强承诺；创作者 IP 保护要诚实，不要卖不成立的 DRM。**

### 2.9 流量运营

| 功能项 | 价值判断 | 有效性 | MVP 优先级 |
|---|---|---|---|
| 平台推流机制 | 中 | 公域推流要建立在质量数据上。早期可做人工精选、榜单、request board、case study，不做算法 feed | P1/P2 |
| 负向处罚 | 高 | 必须有下架、退款、降权、安全封禁、抄袭处理，但第一版可以人工执行 | P1 |
| 正向激励 | 高 | 创作者需要 featured、补贴、认证、challenge、RFB、首单奖励、收入榜。早期比复杂推荐更有效 | P1 |

结论：平台治理要有，但 MVP 不要先做复杂生态规则。**先人工运营 10 个高质量供给。**

### 2.10 创作者成长

| 阶段 | 价值判断 | 有效动作 | MVP 优先级 |
|---|---|---|---|
| 新手 | 高 | 模板、skill lint、商品页生成、定价建议、免费上架、首单辅导 | P0/P1 |
| 成熟 | 高 | analytics、bundle、订阅、版本频道、support tooling、私域导流 | P1 |
| 进阶 | 中到高 | hosted protected step、团队 license、API/MCP surface、合作分销 | P2 |
| 沉默 | 中 | 唤醒、版本提醒、买家需求匹配、自动诊断下架风险 | P2/P3 |

结论：成长体系有价值，但早期不要做泛教育社区。**用 5-10 个种子创作者共创 SOP，比做课程中心更有效。**

## 3. 还有哪些可能性

### 3.1 Demand-first：Request / RFB Board

不要只让创作者猜市场要什么。做一个 request board：

- 买家发布“我愿意为这个 skill 付多少钱”
- 平台把高频需求整理成 RFB（request for builders）
- 创作者接单、竞标、共创
- 成交后沉淀成公开/半公开能力包

这比冷启动空 marketplace 更有效，因为它先验证需求。

### 3.2 Skill Bundle / Agent Pack

单个 skill 容易低价。更高价值的是 bundle：

- `run_full` 完整流程
- `run_step_*` 可组合步骤
- examples、tests、fixtures、checklists
- update/support/community

Agent.ai 的 Agent Pack 说明“完整 pipeline + granular step actions”比单个 prompt 更像商品。

### 3.3 Install Doctor

买家失败通常不是 skill 本身坏了，而是 runtime、依赖、API key、权限、模型版本、目录结构、浏览器登录状态不一致。Install Doctor 可以成为核心差异化：

- 检查 runtime
- 检查依赖
- 检查权限
- 跑 smoke test
- 输出失败归因
- 决定是否允许正式购买/运行

### 3.4 Compatibility Matrix

每个 skill 应展示：

- Claude Code 是否通过
- Codex 是否通过
- Cursor 是否通过
- Gemini CLI 是否通过
- 依赖的 MCP/tool 是否可用
- 最近测试时间

这会比“五星好评”更有交易价值。

### 3.5 Outcome-linked Ranking

排序不要只看 install/upvote/star，应看：

- install success rate
- smoke test pass rate
- paid conversion
- repeat purchase
- refund rate
- support response
- runtime coverage
- creator update frequency

这和 PHBench 的启发一致：community signal 有价值，但必须和真实 outcome 绑定。

### 3.6 Creator Services Layer

创作者赚钱不一定只靠卖静态 skill，还可以卖：

- 定制改造
- 私有部署
- 团队培训
- 高级 support
- hosted protected step
- 数据/API 订阅
- 认证与审计

平台可以从“交易 skill”扩展到“交易围绕 skill 的服务”。

### 3.7 Private / Team Registry

B2B 买家可能不敢用开放市场，但愿意用企业私有目录：

- 团队内部 approved skills
- admin allowlist
- version pinning
- audit log
- spend limit
- seat/team license

这是中后期高客单方向。

## 4. MVP 最重要功能

我建议 MVP 不叫 marketplace，而叫：

> **Skill Producer Console + Curated Paid Storefront**

最小闭环是：

```text
1 个真实创作者 workflow
  -> 编译成 capability package
  -> 生成 listing contract
  -> 买家查看权限/输入/输出/价格
  -> 安装并跑 smoke test
  -> 付款/授权
  -> 正式使用
  -> 生成 receipt / support / update
  -> 创作者收到钱
```

### P0：必须有

| 模块 | 为什么必须 |
|---|---|
| Creator onboarding + manual review | 保证前 10 个供给质量，避免垃圾市场 |
| Listing contract | 商品页必须包含输入、输出、权限、runtime、依赖、示例、支持边界 |
| Pricing + checkout | 支持一次性购买、订阅更新/support、定做订单三类 |
| Entitlement | 买家买了什么、能用多久、能否更新、是否团队可用 |
| Install guide / Install Doctor v0 | 至少能检查目录、runtime、依赖和 smoke test |
| Smoke test / canonical example | 买家知道它不是“只有作者机器能跑” |
| Creator payout | 哪怕早期人工结算，也要有第一批收入截图 |
| Basic safety scan | secrets、危险命令、混淆、可疑网络访问、prompt injection 风险 |
| Support / refund channel | 没有售后就没有高价和复购 |

### P1：第二阶段

| 模块 | 为什么 |
|---|---|
| Event ledger | 为 usage pricing、退款、失败归因、分账打基础 |
| 多收费模式 | free sample、paid bundle、subscription、team license、hosted protected step |
| Agent-native discovery | MCP server / CLI search，让 Agent 在任务中推荐 skill |
| Request board | 需求侧冷启动，降低创作者猜题成本 |
| Reputation | creator profile、verified、收入/成功案例、runtime compatibility |
| Bundle / pack support | 提高客单价和复购 |

### P2：暂缓

| 模块 | 暂缓原因 |
|---|---|
| 完整公域推荐流 | 没有质量数据前容易劣化 |
| 广告系统 | 早期伤害信任，且不解决 creator core revenue |
| 自研 agent payment protocol | 先用现成支付和人工仲裁验证需求 |
| 大规模并发 hosted runtime | 除非明确从 hosted execution 切入 |
| 完整创作者学院 | 先共创 SOP，再产品化教育内容 |

## 5. 推荐的第一批垂直类目

选择标准：

- 任务频次高
- 用户已有付费习惯
- 结果可验证
- workflow 有专业判断
- 能展示 before/after
- 安装复杂度可控

优先类目：

1. **AI coding / repo operations**：code review、test generation、repo onboarding、release notes。买家理解 skill，付费意愿强。
2. **内容创作 / 自媒体增长**：选题、竞品分析、长文转短视频、公众号/小红书内容工作流。创作者已有私域和服务收入。
3. **多模态生产**：脚本、分镜、封面、素材一致性、视频质检。适合 BENZEMA 既有 Creative CoWork / 即梦经验。
4. **个人本地工作流**：Obsidian/Notion/文件整理/研究报告编译。适合展示本地执行与隐私优势。

不建议第一批做泛“效率提升”“万能助手”“人生规划”等低可验证场景。

## 6. 必要调研

### 6.1 创作者侧访谈

对象：

- 已经卖过 skill / prompt / workflow 的人
- skills.sh/Agensi/Claude Skills 热门作者
- Smithery/MCP server 作者
- 用 Claude Code/Codex 做生产 workflow 的 power users
- AI 内容创作者、视频创作者、增长运营者

要问的不是“你想赚钱吗”，而是：

- 最近一次通过 AI workflow 收钱是什么？
- 客单价多少？
- 交付物是什么？
- 最痛的售后问题是什么？
- 你最怕别人复制哪部分？
- 如果平台抽 10-20%，你期望它帮你做什么？

### 6.2 买家侧访谈

对象：

- 买过模板、课程、自动化脚本、咨询服务的人
- 需要把 AI workflow 接入团队的人
- 已经用 Claude Code/Codex/Cursor 的高级用户

关键问题：

- 最近一次为什么愿意为 workflow/template/自动化付费？
- 付款前最担心什么？
- 你如何判断它值不值？
- 失败后你希望谁负责？
- 你更愿意买一次、订阅、按结果付费，还是定做？

### 6.3 技术验证

用 5 个真实 skill 做实验：

- 同一个 skill 在 Claude Code / Codex / Cursor / Gemini CLI 跑通率
- 安装耗时
- smoke test pass rate
- 失败原因分类
- 用户能否理解权限声明
- 本地 secrets/PII 是否可能被误打包
- 买家能否通过 prompt injection 提取核心内容

这会直接决定平台应更偏 open-local、hosted-protected 还是 hybrid。

### 6.4 竞品与市场数据

需要持续跟踪：

- Agensi、Paperclip Skills、Agent37、ClaudeSkills.ai、skills.pub 等 paid marketplace
- skills.sh、AgentSkill.club、findskills.co、llmskills.org 等开放目录
- Smithery、Glama、PulseMCP、mcp.so 等 MCP registry
- Apify、Relevance、Poe、Agent.ai 的计费/分账/确权变化

要建立一个表：

```text
平台 | skill 数 | paid listing 数 | 价格分布 | take rate | payout | 安全审核 | 运行方式 | 是否支持 subscription | 是否有 usage metering
```

### 6.5 法务/支付/税务

必须提前确认：

- 跨境创作者 payout
- Stripe Connect / 微信 / 支付宝 / Paddle / Lemon Squeezy 可行性
- 平台是 merchant of record 还是 marketplace facilitator
- 退款和储备金规则
- 技术服务、数字内容、咨询服务的税务差异
- 侵犯版权/泄露源码/恶意 skill 的责任边界

### 6.6 安全研究

重点不是“能否加密”，而是：

- skill package 中 secrets/PII 检测
- prompt injection 对 paid skill 的泄露风险
- malicious skill 的 terminal/file/network 风险
- 多 skill 组合导致的 emergent risk
- 权限最小化和运行日志 redaction

SkillProbe 和 Agent Skills 数据分析论文都提示：skill marketplace 的安全风险会比普通插件市场更语义化。

## 7. 最终建议

不要把产品定义成：

> 我们帮 skill 创作者上架并卖钱。

这太浅，容易被任何目录型 marketplace 复制。

更准确的定义是：

> 我们帮 skill 创作者把可重复完成任务的 Agent workflow，变成可安装、可验证、可授权、可更新、可售后、可结算的能力商品。

MVP 成功标准也不要设成“有多少上架 skill”，而应设成：

- 10 个高质量能力包
- 100 个真实购买用户
- 1 个创作者月收入超过 $1K
- 购买后安装成功率 >70%
- smoke test 通过率 >70%
- M2 repeat / renewal / update usage >30%
- refund / dispute 有可解释归因

如果这些指标成立，才值得扩大公域流量、自动推荐、usage billing 和生态治理。

---

## 参考与来源

- `output/reports/agora/01-narrative/agent-shopify-product-story-2026-05-14.md`
- `output/reports/agora/04-business-model/agora-business-model-after-skill-trilemma.md`
- `output/reports/agora/03-product/agora-bp-agent-capability-package.md`
- `output/reports/agora/02-market-competition/smithery-commercialization-2026-05-15.md`
- `output/reports/agora/02-market-competition/vercel-skills-sh-commercialization-2026-05-15.md`
- `output/reports/agora/02-market-competition/agent-ai-deep-research-2026-05.md`
- [Agensi marketplace](https://www.agensi.io/home/)
- [Agensi creator guide](https://www.agensi.io/learn/sell-ai-agent-skills-creator-guide)
- [Agensi security review](https://www.agensi.io/security)
- [skills.sh About](https://skills.sh/about)
- [skills.sh Terms](https://skills.sh/terms)
- [skills.sh API docs](https://skills.sh/docs/api)
- [Smithery docs](https://smithery.ai/docs)
- [Agent.ai MCP Server docs](https://docs.agent.ai/mcp-server)
- [Agent.ai pricing](https://agent.ai/pricing)
- [Stripe Agentic Commerce](https://stripe.com/use-cases/agentic-commerce)
- [Stripe Agentic Commerce docs](https://docs.stripe.com/agentic-commerce)
- [Agent Skills: A Data-Driven Analysis of Claude Skills](https://arxiv.org/abs/2602.08004)
- [SkillProbe: Security Auditing for Emerging Agent Skill Marketplaces](https://arxiv.org/abs/2603.21019)
