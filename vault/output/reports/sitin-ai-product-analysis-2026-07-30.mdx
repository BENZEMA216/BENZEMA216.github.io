# SITIN.ai 产品研究：不是普通 Instagram 获客工具，而是社交流量驱动的 AI Agentic Marketplace

> 生成时间：2026-07-30
> 查询：SITIN 是一个帮助真人在 Instagram 上获客的产品，研究其真实机制、商业模式、竞争差异与风险
> 结论基于 2026-07-30 可访问的官网、Creator PWA、公开前端 bundle、App Store 元数据、投资方页面和 Meta 官方资料；经营数字除特别注明外均为公司或团队自报，未经过独立审计

## 摘要

“帮助真人在 Instagram 上获客”只说对了一半。SITIN 的营销网站把产品描述为面向专业人士、创作者和教练的 `Individual OS`：读取用户的内容与对话、克隆 persona、代发帖/回复/私信，再交付高意向客户。但其当前公开 Creator PWA 暴露出的实际产品更垂直：**它把真人的身份、形象、声音与社交账号变成可由 AI 扩张的付费互动供给；AI 先代聊，真人在身份验证、异常对话、语音、自拍和付费视频环节接管，平台完成匹配、计费与 PayPal 提现。**

因此 SITIN 更准确的分类不是 social CRM 或通用 lead-gen SaaS，而是：

> **Instagram 获客入口 × AI persona 代运营 × 真人例外处理 × 付费聊天/视频 marketplace。**

它最有价值的创新不是“克隆语气”，而是把 `获客 → AI 首轮互动 → 意向/异常识别 → 真人接管 → 付费履约 → 分账` 串成同一条经营闭环。它最危险的部分也来自同一个地方：当前公开前端显示 Instagram 接入使用登录 WebView 与 `startSocialProxyRobot`，而非只通过 Meta 官方 API；这使渠道稳定性、账号安全、AI 身份披露和隐私合规成为公司级风险。

## 一、产品本质

### 1. 官网说的是什么

[SITIN 官网](https://sitin.ai/)声称：

- 一键读取用户的 posts 与 conversations，克隆 persona；
- AI clone 处理 90% 的首轮客户互动；
- 自动化 Instagram、Snapchat、TikTok、X、LinkedIn 的 posting、replies 与 DMs；
- 识别机会、互动潜客并交付 high-intent paying clients；
- 对个人用户免费，最高可赚取 `$10,000/month`。

[申请页](https://sitin.ai/claim)声称已服务 `5,000+ creators`，但实际优先收集的领域是 Astrology、Therapy、Gaming 与 Streaming，以及用户当前社交收入。这与泛化的“所有专业人士 Individual OS”相比，更像从高互动、高情绪价值、可聊天/视频交付的供给切入。

### 2. 当前产品实际上交付什么

公开 PWA 的首页不是 CRM、lead list 或预约日历，而是 `Task / Earnings / Chat / Live / Profile` 五个核心工作区；收入被拆成 `AI Persona message` 与 `Video & task`。Live 页面直接写明：

> `Auto-matches male users for paid video calls · Earn $60/h`

Creator referral 页面称为 `BFF Creator Program`，文案是邀请 “your girls”，并出现美国 ID、W2、位置与身份验证流程。由此看，当前最成熟的供给并不是所有职业，而是**愿意通过聊天、语音、自拍视频和视频通话变现的女性 creator / companion 类供给**。

这不等于官网未来的横向愿景是假的，但说明当前已经运行的 wedge 与“泛专业人士获客 OS”之间仍有明显距离。

## 二、提交什么、系统消费什么、最后产出什么

| 角色 | 提交给 SITIN 的核心 artifact | 系统消费方式 | 得到的输出 |
|---|---|---|---|
| Creator / 真人供给 | Instagram 登录态与账号、历史内容/对话、头像、简介、兴趣、职业、照片、声音、位置、身份资料、PayPal | 建 persona、启动社交自动化、生成/发送回复、判断风险与意向、匹配付费用户 | 自动互动、待真人处理的任务队列、付费聊天/视频机会、收入与提现 |
| 互动/付费用户 | 关注、消息、聊天上下文、礼物/付费请求、视频意向 | 匹配 creator，维持会话，触发 message/voice/photo/video 任务 | 持续回复、真人证明、付费聊天或视频互动 |
| 平台 | 双方行为、回复效果、异常信号、支付/提现、任务完成情况 | 训练 persona、意图和异常评分，优化分发与任务路由 | 更高自动化率、转化率、抽成空间和供给流动性 |

关键点：**SITIN 的交付物不是静态名单，而是被持续经营的关系与交易机会。** Lead 只有进入会话、被判断意向、由 AI 或真人推进，并最终形成付费互动，才对平台有价值。

## 三、真实运行闭环

### Step 1：把真人变成可调用的供给

Creator 需要完成 profile、头像/真人验证、手机、位置、通知、Instagram 授权、PayPal 等步骤。系统同时采集职业、学校、兴趣、照片与声音，不只是创建一个销售 chatbot，而是在建立可被需求侧相信和消费的“真人 persona”。

### Step 2：通过 Instagram 登录态启动机器人

当前公开 [bridge bundle](https://app.sitin.ai/assets/js/bridge-JY8r4-Ir.js) 的 Instagram 流程会：

- 打开 `https://www.instagram.com/accounts/login`；
- 调用原生桥的 `openSocialProxyWebview`；
- 在授权后调用 `startSocialProxyRobot`；
- 失败时回退到旧的 `openInsWebView` / `startInsRobot`；
- 检查 Instagram 页面异常并要求悬浮窗权限。

这不是标准的 Meta Graph API OAuth + webhook 形态，而是让 Android APK 控制 Instagram Web 登录会话的 client-side robot。下载工具仍把 APK 指向 `https://app.gracechat.com/apk/Sitin.apk`，Creator referral 也明确为 Android only。

### Step 3：AI persona 自动维持大量初始互动

Chat 工作区包含：

- 多会话队列；
- AI 建议回复；
- 自动发送首个建议的倒计时路径；
- green / yellow / red 异常等级；
- `AI earnings paused`、`distribution stopped` 等状态；
- message、voice、image、video 不同奖励。

这表明 AI 不只草拟文案，而是在一定条件下直接经营会话；真人更像 exception operator。

### Step 4：信任或异常事件升级给真人

系统支持 voice probe、selfie probe、paid video call 与真人回复任务。公开 bundle 的 debug/mock 数据还把以下情况建模为异常：

- 用户怀疑 “Are you a bot?”；
- 语气不一致；
- 人设故事前后矛盾；
- 需要真人语音或自拍证明。

这些 mock 数据不能证明线上一定使用相同话术，但说明产品设计的核心问题是：**当 AI persona 露馅或进入高信任环节时，用真人及时修复信任，而不是结束自动化。**

### Step 5：把关系留在 SITIN 内成交和履约

平台提供自有 Chat、Live、video call、gift、任务、收入明细与 PayPal cashout，并对 off-platform meeting / personal information exchange 设限。其商业目标不是把联系人交给 creator 后退出，而是把互动、支付、履约与复购尽量留在平台内。

## 四、商业模式与增长飞轮

SITIN 对 creator 强调免费和“边聊天边赚钱”，因此更像 marketplace 而不是 seat-based SaaS：

1. 免费、任务奖励与收入承诺吸引 creator；
2. Creator 授权 Instagram，把已有身份、内容和社交关系接入；
3. Robot 与 AI persona 扩大可同时服务的会话数；
4. 付费用户为消息、礼物、语音/视频等互动付费；
5. 平台把部分收入分给 creator，通过 PayPal 提现；
6. `BFF Creator Program` 用 creator 邀请 creator，降低供给 CAC；
7. 更多供给提升匹配与付费转化，反过来强化 creator 收入预期。

当前公开资料没有披露 take rate、消费者价格表、gross billings 与 revenue 的定义，也没有披露退款、chargeback、账号封禁损失和真人分钟成本。没有这些数据，不能仅凭 payout 或 ARR 口号判断单位经济。

## 五、和相邻产品真正差在哪里

| 产品 | 获客入口 | AI 的角色 | 真人角色 | 交易/分账 | 关键边界 |
|---|---|---|---|---|---|
| SITIN | Instagram 等外部社交平台，且当前 bundle 显示 account robot | 代发/代聊、评分、自动维持关系 | 异常、身份、语音、自拍、视频与高价值接管 | 内建 marketplace、任务收入、PayPal | 主动扩张强，但渠道与身份风险高 |
| [ManyChat](https://manychat.com/blog/instagram-dm-automation-rules/) | 评论、DM、Story reply 等合规 inbound trigger | workflow / DM automation | 配置流程、销售接管 | 可接支付，但不负责供给市场 | 使用 Meta 官方 API；本质是营销工具 |
| [Meta AI Studio](https://about.fb.com/news/2024/07/create-your-own-custom-ai-with-ai-studio/) | Instagram 原生入口 | Creator extension，回答 DM 与 Story | 配置 persona、内容和回复对象 | 无独立 marketplace | AI 回复清晰标注，透明且平台原生 |
| [Fanvue AI](https://www.fanvue.com/pages/fanvue-ai) | Fanvue 自有订阅平台 | AI message / voice，24/7 服务 fan | Creator 提供内容与身份 | 订阅平台，creator take-home | 变现相似，但外部获客自动化较弱 |

SITIN 的差异化不是“Instagram 自动回复”，而是同时占据四个层：

1. **外部分发**：直接经营 creator 的 Instagram 账号；
2. **可复制供给**：AI persona 把一位真人扩成并发服务；
3. **人机调度**：真人只处理高信任、高收益或异常时刻；
4. **交易结算**：平台拥有聊天、视频、收入和分账。

如果这四层能稳定运行，它比 ManyChat 更接近 `Agentic Marketplace`；如果 Instagram robot 被限制，它会退化成一个依赖自有需求侧流量的 creator monetization app。

## 六、牵引与公司背景：哪些可信，哪些只是自报

### 有公开外部交叉信号

- [MindWorks Capital](https://www.mindworks.vc/logos/sitin-ai)把 SITIN 列为 Pre-A 项目，投资时间为 2026，并将 Max Zhou 列为 Founder & CEO。
- [Max Zhou 的 MindWorks 档案](https://www.mindworks.vc/entrepreneurs/max-zhou)显示其此前创办 Presence，Presence 获 Lightspeed 与 BlueRun Ventures 支持；此前经历包括 MetaApp、Mobike、Uber 与 LinkedIn。
- AI Fantasy Inc 在美国 App Store 仍运营 [GraceChat](https://itunes.apple.com/lookup?id=1658972379&country=us)。2026-07-30 Apple Lookup 返回 21,173 个评分、版本 2.3.2；SITIN 的 APK、API host、Terms 和前端代码仍保留 GraceChat / Haven / Presence 遗产，说明它是同一消费社交产品体系的再定位，而非凭空新建的 B2B SaaS。

### 公司自报、尚未独立验证

- 官网：最高 `$10,000/month`；
- Claim 页：`5,000+ creators`；
- PWA 登录页：`150K members`、`$67M payouts`；
- CTO 个人简历：日收入 `$300K`、ARR `$60.3M`、估值 `$500M`、30 日留存 `33%`、美国 App Store 最高第 6。

这些数字展示了很强的增长叙事，但口径和时间点没有公开说明。例如日收入 `$300K` 若持续一年对应超过 `$100M` 年化流水，与 `$60.3M ARR` 可能分别指 gross billings、net revenue 或不同阶段；在拿到财务与 cohort 证据前，不能混为同一经营事实。

## 七、最重要的风险

### 1. Instagram 渠道风险：高

Meta 维护的 [Instagram API 文档](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api)说明：

- 官方 API 面向 Business / Creator professional accounts；
- messaging conversation 只有在 Instagram 用户先发消息后才能开始；
- recipient 必须已经给 professional account 发过消息。

Instagram Terms 也禁止未经明确允许的自动化访问或信息收集。SITIN 当前 `SocialProxyWebview + Robot` 路径明显绕开了官方 API 允许的窄边界，特别是自动 follow、主动寻找机会和冷启动消息。如果账号限制率上升，creator 最有价值的分发资产会直接受损。

### 2. AI 身份与信任风险：高

Meta AI Studio 对 creator AI 回复做清晰标签；SITIN 的产品价值却部分来自“像真人一样回复”，并用真人语音、自拍和视频处理真实性怀疑。若用户不知道自己主要在和 AI 互动，可能产生误导、退款、平台政策和消费者保护风险。

### 3. Terms / Privacy 与真实产品严重错位：高

[官网链接的 Terms](https://sites.google.com/view/terms-of-service-for-sitin-ai)仍把产品描述为 pixel-style video、swipe/match、feed 和 chat，没有覆盖：

- 社交账号登录与自动化；
- persona clone 与 AI 代聊；
- creator earnings、消费者付费与分账；
- PayPal、W2、身份与位置验证；
- 照片、声音、视频与 AI 训练/推理用途。

PWA 内嵌 Terms 仍使用 Haven 名称和 2024-10-10 生效日期；Privacy 页面只列 username、email、interests 和 Apple/Google login。对一个处理社交登录态、私信、身份材料、声音、照片、视频和财务数据的产品，这不是小瑕疵，而是上线规模与合规治理不同步的直接信号。

### 4. “Individual OS” 的泛化风险：中高

陪伴、占星、therapy-style conversation、gaming 与 streaming 具备高频聊天、强 persona、可视频交付和用户为注意力付费的共同结构。普通 consultant、freelancer 或蓝领服务的购买路径更依赖资质、报价、scope、预约、合同、交付与售后，不能直接复用“代聊 + 视频”闭环。当前产品证明的是一个垂直市场，不是横向 OS。

### 5. Marketplace 运营与安全风险：中高

平台需要同时处理 creator 身份、未成年人、骚扰、露骨内容、诈骗、支付争议、真人安全、跨州/跨国税务和内容审核。公开产品已出现年龄、位置、ID、W2、聊天 moderation 与异常任务，但公开法律文本和治理说明远落后于产品复杂度。

## 八、对 Combo 最值得学与最不该学的部分

### 值得学

1. **不要只给 creator 一个 AI 工具，要把分发、交付和收入连起来。**
2. **AI 自动化不是全自动率竞赛，而是把真人放在最能提高信任与收入的 exception point。**
3. **任务、异常、收入和接管时机都应成为显式状态，而不是藏在聊天 prompt 里。**
4. **只有当 AI 供给最终进入付费、履约与分账，persona 才从内容资产变成经济供给。**

### 不该学

1. 不应把对第三方平台账号的未授权 robot control 当作长期壁垒；
2. 不应依赖用户误以为 AI 是真人来维持转化；
3. 不应把一个陪伴/互动 vertical 的成立外推成所有专业服务的成立；
4. 不应先追求跨平台“Individual OS”，再补结果契约、透明身份、验收和法律边界。

Combo 更稳的对应闭环应是：

> 内容/案例获客 → 用户明确授权并提交 Context → Agent 履约 → 真人例外与责任 → 可检查结果 → 退款/补救 → 创作者分账。

SITIN 说明“人类衍生供给可以被 AI 扩张并交易”有真实产品形态，但没有证明通过隐藏身份和账号 robot 扩张是可持续路径。

## 九、最终判断

| 维度 | 判断 |
|---|---|
| 产品机制 | **强**：已经形成 AI 自动化、真人 exception、交易与 payout 的闭环 |
| 当前 wedge | **清晰但窄**：女性 creator / paid companionship、聊天与视频变现 |
| 技术差异 | **中等**：persona、意图/异常评分和调度有价值，但模型本身不是壁垒 |
| 商业潜力 | **高波动**：若自报流水真实，需求与供给均已被验证；但需拆清 gross/net 和 cohort |
| 横向扩张 | **未证明**：从陪伴互动到泛专业服务存在 scope、资质与履约鸿沟 |
| 渠道可持续性 | **低到中**：Instagram robot 是最直接的系统性风险 |
| 法律/信任成熟度 | **偏低**：Terms、Privacy、AI disclosure 与真实数据流不匹配 |

一句话结论：

> **SITIN 是一个非常聪明、也非常激进的 Agentic Marketplace：它真正做的不是替真人“找名单”，而是代真人经营关系，并在需要信任和付费履约时调用真人；它最值得研究的是人机供给调度和交易闭环，最不应被高估的是跨职业泛化与 Instagram 账号自动化的可持续性。**

## 十、下一轮 DD 必须拿到的十项证据

1. 一次完整 screen recording：Instagram 授权 → 首次自动 action → 首个付费用户 → creator 提现；
2. Meta App ID、App Review 权限、Business Partner 身份及官方 API 与 robot 流量占比；
3. Instagram 账号 30/90 天 challenge、restriction、logout 与 ban 率；
4. `150K members / 5K creators / $67M payouts` 的时间范围、去重和活跃口径；
5. GMV、gross billings、net revenue、creator payout、退款和 chargeback 的 reconciliation；
6. Creator D1/D7/D30、收入分层、前 1% 集中度和供给退出原因；
7. 每 `$100` 收入对应的 AI 消息数、真人分钟、审核成本和模型成本；
8. AI 身份是否向付费用户披露、何时披露、用户是否可要求纯真人；
9. SITIN、GraceChat、Haven、Presence、AI Fantasy Inc 之间的产品、合同与数据控制者关系；
10. 修订后的 Terms、Privacy、数据保留/删除、persona 训练授权和未成年人安全方案。

## 数据来源

### SITIN / Presence 一手与准一手

- [SITIN 官网](https://sitin.ai/)
- [Claim my AI Agent](https://sitin.ai/claim)
- [SITIN Creator PWA](https://app.sitin.ai/)
- [SITIN 当前前端主 bundle](https://app.sitin.ai/assets/js/main-Dm340so-.js)
- [SITIN Instagram / native bridge bundle](https://app.sitin.ai/assets/js/bridge-JY8r4-Ir.js)
- [SITIN 官网 Terms](https://sites.google.com/view/terms-of-service-for-sitin-ai)
- [MindWorks：SITIN.ai](https://www.mindworks.vc/logos/sitin-ai)
- [MindWorks：Max Zhou](https://www.mindworks.vc/entrepreneurs/max-zhou)
- [Apple Lookup：GraceChat / AI FANTASY INC](https://itunes.apple.com/lookup?id=1658972379&country=us)
- [SITIN CTO 个人简历，自报经营数据](https://resume.vincentqiao.com/)

### 平台规则与参照产品

- [Meta / Postman：Instagram API](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api)
- [Instagram Terms of Use](https://www.facebook.com/help/instagram/581066165581870)
- [Meta：AI Studio creator AI](https://about.fb.com/news/2024/07/create-your-own-custom-ai-with-ai-studio/)
- [ManyChat：Instagram DM automation rules](https://manychat.com/blog/instagram-dm-automation-rules/)
- [Fanvue AI](https://www.fanvue.com/pages/fanvue-ai)

### 可复核快照

- 2026-07-30 15:06 CST，`https://app.sitin.ai/` SHA-256：`a5a789947dd0af1bbd2601d253eeb1f726a7acfc5be24b75f9d8c61e28060eda`
- 同时刻，`main-Dm340so-.js` SHA-256：`050be83832a6359b973f7ee4ae59c3ad8665352f0febd11d5122d851f97aeb9f`
- Bundle `Last-Modified`：2026-07-30 02:58:40 GMT

---
*由 LLM 从知识库查询生成*
