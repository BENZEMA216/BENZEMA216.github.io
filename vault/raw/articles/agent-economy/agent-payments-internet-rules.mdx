是莫尔索 *2026年4月9日 21:21*

> 距离研究 ACP 过去 6 个月，上个月我的服务获得第一笔来自 Agent 的自动付款，本月我的 Agent 完成第一次自助支付，两件事意义重大，故写此文，系统梳理面向 Agent 的支付基础设施。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/G2tce5whiaMtreUfmJxic0z3H4oiblUjVcfNc9He8UPIMfnuNubXIXjKlOnzvmcPgWc7tLef1eNnTwZR8udt11ZcZSv11iaookWficnTsmIWkO5U/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

## 一场正在发生的金融系统重写

2026 年 3 月，Stripe 宣布与 Tempo 联合推出 Machine Payments Protocol（MPP） <sup>[1]</sup> ，一个专为 AI Agent 设计的开放支付标准。同一时期，Coinbase 在持续推进基于 x402 协议的稳定币支付生态，Google 联合多家科技公司推出 AP2（Agent Payment Protocol），OpenAI 与 Stripe 共同设计了 ACP（Agentic Commerce Protocol）。

这些动作并非巧合，它们指向同一个方向： **当前互联网的金融基础设施，完全不是为 AI Agent 设计的，而这个问题正在变得无法忽视。**

互联网的商业模式从 1995 年诞生那一刻，就默认用户浏览免费。平台依靠广告变现，内容平台靠订阅维持，搜索引擎靠用户行为数据分发广告。然而，当 AI 成为互联网的主要内容消费者，它不看广告、不为品牌曝光付费、只抓取内容转化为知识——这套逻辑开始从根基动摇。

更深层的矛盾在支付侧。每当我们用支付宝或 VISA 完成支付，背后一套复杂的风控体系正在识别和对抗机器行为。然而，AI Agent 的支付行为从第一天起，就站在了现代支付系统的对立面。Agent 不会在手机上按按钮，不会等验证码，不会扫二维码——它无法进入人类支付体系的合法流程。

> **从风控模型的角度看，每一个 AI 的支付行为都是可疑的；从 AI 自己的角度看，每一个人类支付流程都是无法执行的。**

这种结构性断裂，正在催生一套全新的支付基础设施。

## HTTP 402：沉睡三十年的协议复活

要理解 Agent 支付，必须从一个极具历史感的技术细节说起： **HTTP 状态码 402** 。

在 HTTP 协议的设计中，402 是"Payment Required"（需要付款）的状态码。它在 1991 年就写入了 HTTP/1.0 规范，原本预留给未来的收费网络服务——但在互联网以免费为基础的三十年发展中，这个状态码从未被真正启用，只是在规范文档里沉睡。

现在，它被唤醒了，成为机器支付的天然载体。

MPP 和 x402 协议的核心机制，都建立在 HTTP 402 之上：

1. **Agent 请求付费资源** ：向 API、MCP 端点或任何 HTTP 地址发送请求
2. **服务返回 402 响应** ：附带支付要求（金额、接受的支付方式、收款地址）
3. **Agent 授权支付** ：使用预配置的支付凭证完成支付
4. **Agent 重试请求** ：携带支付证明，服务验证后返回资源

整个流程是机器对机器的，无需人类干预。这正是它与现有支付流程的根本差异——没有跳转页面，没有短信验证码，没有人脸识别，只有一次标准化的 HTTP 往返。

```bash
ounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(line客户端                      服务端  |                           |  |------ GET /resource ----> |  |                           |  |<----- HTTP 402 ---------- |  |   { "amount": "0.01",     |  |     "currency": "usd",    |  |     "recipient": "..." }  |  |                           |  |  [Agent 完成支付]          |  |                           |  |------ GET /resource ----> |  |   Authorization: Bearer   |  |   <payment-proof>         |  |                           |  |<----- HTTP 200 ---------- |  |   { data: "..." }         |
```

这个设计的优雅之处在于，它完全兼容现有的 HTTPS 基础设施，不需要任何新的网络层协议，只需在应用层加入支付逻辑。

## 三大协议格局：谁在定义 Agent 支付的标准

当前 Agent 支付领域已经形成了三条主要技术路线，各有侧重，背后的推手也各不相同。

### MPP：Stripe 与 Tempo 的机器支付协议

Machine Payments Protocol（MPP） <sup>[2]</sup> 由 Stripe 和 Tempo 联合设计，于 2026 年 3 月正式发布。其定位是"机器对机器支付的开放互联网原生标准"，核心使命是让 Agent 能够以编程方式支付 API 调用、工具调用或内容访问。

**MPP 的技术架构** 支持两种支付方式的统一：

- **加密支付** ：直接链上支付，通过 Tempo 区块链上的稳定币（USDC）完成，适合低金额高频交易
- **法币支付** ：通过 Shared Payment Tokens（SPT）机制，支持信用卡、BNPL 等传统支付方式，适合需要更广泛支付方法的场景

对于 Stripe 上的商家，接入 MPP 只需几行代码：

```php
ounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineconst paymentIntent = await stripe.paymentIntents.create({  amount: 1,  currency: "usd",  payment_method_types: ["crypto"],  payment_method_data: {    type: "crypto",  },  payment_method_options: {    crypto: {      mode: "deposit",      deposit_options: {        networks: ["tempo"],      },    },  },  confirm: true,});
```

MPP 已有一批早期落地案例，展示了其应用场景的多样性：

- **Browserbase <sup>[3]</sup>** ：无头浏览器基础设施提供商，Agent 现在可以按 session 付费启动浏览器实例
- **PostalForm** ：Agent 付费打印和邮寄实体邮件
- **Prospect Butcher Co.**：Agent 可以在纽约市任意地点下单订三明治
- **Parallel Web Systems** ：Agent 按 API 调用次数付费访问互联网，创始人 Parag Agrawal 表示："几行代码就集成了机器支付，现在 Agent 可以自主为每次 API 调用付费"
- **Stripe Climate** ：Agent 可以程序化地向气候捐款项目捐款

这些案例的共同点是： **支付作为 Agent 任务执行链条中的一个原子动作，而非需要人类干预的异步步骤** 。

### x402：Coinbase 主导的链上支付协议

x402 协议由 Coinbase 主导推进，以 Base 链和 USDC 稳定币为核心，目标是让每一次 HTTP API 调用都能承载支付行为。

x402 的生态格局可以用四方博弈来理解：

**供应方（卖家）** 分为两类：第一方卖家是直接出售自身数据或服务的项目（比如新闻网站要求 AI 爬虫付费访问内容）；第二方是 API 集市，整合多种 API 并提供统一支付入口，类似于早期互联网时代的 API 聚合器。

**需求方（买家）** 主要是 AI Agent，但真实需求仍处于早期阶段，大部分交易仍属测试性质。要点燃需求，需要两个条件：独家高价值内容（只通过 x402 提供），或足够丰富的 x402 支持 API 生态。

**中间商** 在 x402 生态中扮演类似 Visa/万事达的角色，但护城河极薄——技术门槛低，Cloudflare 或 Google 随时可以以零成本入场。更重要的是，像 Coinbase 这样的生态推动者为了推广整个生态，可能会开源并免费提供中间商服务。

**底层链与代币** 才是 x402 生态中最大的赢家。Coinbase 掌握完整技术栈：中间商（CDP）+ 公链（Base）+ 稳定币（USDC）+ 钱包，这种端到端控制地位具有极强的战略价值。a16z 将 x402 协议背后的市场潜力估算为 **30 万亿美元** 。

### ACP：Stripe 与 OpenAI 的消费电商协议

Agentic Commerce Protocol（ACP） <sup>[4]</sup> 由 Stripe 和 OpenAI 联合开发，目标场景更接近消费者电商：AI 购物助手帮用户在商家平台购物。ACP 已在 Apache 2.0 许可证下开源。

ChatGPT 是 ACP 的第一个实现者。用户可以直接在 ChatGPT 对话中完成商品发现、选择和结账，商家作为商户记录方（Merchant of Record）保留对客户关系、产品展示和订单履约的完全控制权。

已加入 ACP 生态的品牌包括： **Etsy、URBN（含 Anthropologie、Free People、Urban Outfitters）、Ashley Furniture、Coach、Kate Spade、Revolve** 等。

Etsy CTO Rafe Colburn 说："Stripe 的 Agentic Commerce Suite 让我们更容易将卖家的商品展示给跨平台的买家。"

ACP 的关键设计原则：REST API 和 MCP 双协议兼容，支持实物商品、数字商品、订阅和异步购买，商家可以按 Agent、按交易或自定义逻辑选择接受或拒绝交易。

## Tempo：为什么需要一条专用的支付区块链

通用区块链是为去中心化应用设计的，而不是为高频、低价值的支付交易设计的。 **在 Solana 或 Base 上进行大规模微支付，目前并不经济** ——基础费加优先费的存在，让低于 0.1 美元的支付在与投机交易竞争区块空间时往往不划算。

Tempo <sup>[5]</sup> 正是为了解决这个问题而生的。这是一条由 **Paradigm 和 Stripe 孵化** 的专用 L1 区块链，核心使命是"为支付而生"。

**Tempo 的核心技术优势：**

**专属支付通道（Dedicated Payment Lanes）** ：在协议层为支付交易保留专用区块空间。即使网络活跃度飙升，支付费用也保持低廉且可预测，不会被投机交易挤占。

**稳定币原生 Gas** ：用 USD 稳定币支付 Gas 费，彻底消除了先买 ETH 才能付款的摩擦，简化了会计核算。

**确定性结算** ：区块在 **~0.6 秒** 内完成最终确认，无需重组（re-org）。这种结算确定性与传统金融系统对齐，是商业应用的必要条件。

**支付元数据** ：支持结构化备注字段，用于发票号、订单 ID 等标识符，可以直接与 ERP 系统对账，不需要额外的代码映射。

**可编程智能账户** ：支持 Gas 赞助、批量交易、定期支付和 Passkey 鉴权，让 Agent 可以以更复杂的方式管理资金流。

Tempo 的存在，使得 MPP 协议的微支付场景在经济上成为可行。Agent 按 session 付费使用浏览器、Agent 按次付费获取数据——这类每笔金额在分钱级别的交易，只有在专用支付链上才能真正规模化运转。

## Shared Payment Tokens：Agent 支付的安全密语

在 Agent 支付中，有一个核心安全挑战： **Agent 如何代表用户付款，同时不暴露用户的真实支付凭证？**

Stripe 设计了 Shared Payment Tokens（SPT） <sup>[6]</sup> 来解决这个问题。SPT 是一种新的支付原语，让 AI Agent 可以使用买家保存的支付方式发起支付，但不暴露底层支付凭证。

**SPT 的工作流程：**

```css
ounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(line客户（用户）  ↓ 提交 PaymentMethod（信用卡等）AI Agent（授权方）  ↓ 发行 SharedPaymentToken（带使用限制）商家  ↓ 用 SharedPaymentToken 创建 PaymentIntentStripe  ↓ 处理交易，向所有方发送事件通知
```

**SPT 的安全机制** 体现在几个维度：

- **按卖家限定** ：每个 Token 只能被特定商家使用，防止 Token 被滥用到其他商家
- **金额上限** ：Agent 设定最大可授权金额，与交易总金额匹配
- **时间限制** ：Token 有明确的过期时间
- **全生命周期可观察** ：商家和 Agent 都会收到 Token 使用、撤销或过期的 Webhook 事件

```php
ounter(lineounter(lineounter(lineounter(lineounter(lineounter(lineounter(line// 商家使用 SPT 创建支付意图const paymentIntent = await stripe.paymentIntents.create({  amount: 10000, // $100.00  currency: "usd",  shared_payment_granted_token: "spt_123",  confirm: true,});
```

SPT 还可以与 Stripe Radar <sup>[7]</sup> 集成，将底层的风险信号（欺诈概率、卡片测试、被盗卡、发卡行拒绝等）传递给商家，同时区分高意图 Agent 和低信任自动化机器人。

这个机制从本质上解决了一个悖论： **Agent 需要代表人类行动，但不能成为人类信任凭证的裸露通道。**

## Agentic Commerce Suite：一站式 Agent 商务基础设施

为了降低商家接入 Agent 商务的门槛，Stripe 将多个组件整合为 Agentic Commerce Suite（ACS） <sup>[8]</sup> 。

**ACS 的四大模块：**

**1\. 商品可发现性** ：商家将产品目录连接到 Stripe，Stripe 为其生成一个专属的 ACP 端点，向 AI Agent 提供近实时的商品、价格和库存信息，并自动将产品信息分发给支持的 AI Agent。商家无需为每个 Agent 单独维护 API。

**2\. 结账简化** ：基于 Stripe Checkout Sessions API，处理运费计算、税务核算、订单管理等复杂流程。商家可以选择由 Stripe Tax 自动处理，也可以用自有系统上传税码和动态运费规则。

**3\. 支付处理** ：与现有 Stripe 账户完全打通，Agent 支付与人类支付在同一个 Dashboard 可见，资金按相同的结算周期和默认货币结算，同时支持退款、税务计算、欺诈保护等。

**4\. 欺诈检测** ：Agentic Commerce 正在重塑欺诈模式。针对人类流量调优的欺诈信号正在过时——AI Agent 缺乏人类的随机性，容易被现有风控系统误判为机器人攻击；同时也存在新型欺诈风险，即 Agent 被恶意行为者操控去绕过正常防护机制下单。SPT + Stripe Radar 的组合正是为了对抗这种双向挑战。

ACS 已经吸引了一批头部零售品牌。 **商家作为商户记录方保留对客户关系的完全控制** ：退款、纠纷处理、客户数据——这些都仍然属于商家。Stripe 只是提供基础设施层。

## AI 驱动的新经济形态：从注意力到访问计量

从更宏观的视角看，Agent 支付基础设施的兴起，折射出互联网经济模型的深层转变。

**互联网内容的商业逻辑正在被重写。** 网站从未将 AI 爬虫纳入收费体系，因为它们的商业模式建立在人类浏览免费、然后通过广告或订阅变现的逻辑上。但当 AI 每次访问网页、抓取内容、解析文档、调用数据接口，背后都是可计量的资源消耗时，互联网第一次出现了从 **注意力经济** 向 **访问计量经济** 迁移的机会。

Cloudflare 已经率先将 AI 爬虫纳入付费体系；BrowserBase 和 FireCrawl 将抓网页本身做成了商品；Coinbase 的 x402 则试图将 AI 访问互联网内容标准化为可计费协议。内容创作者也开始意识到： **AI 才是未来最大的读者，而 AI 的访问行为将构成全新的收入曲线。**

**API 正在从开发者工具变成经济结算单位。** 在 Agent 持续运行的观察—判断—行动循环中，API 调用次数、失败率、延迟、价格都成为经济信号。过去 SaaS 产品按月/年订阅收费，但对 Agent 来说，按调用次数的微支付模型更自然，因为 Agent 的使用模式具有高度的突发性和任务导向性。

**嵌入式金融 2.0 正在登场。** 过去的嵌入式支付，是把付款放进产品界面，让用户一键结算。现在，支付正在进入模型的上下文，由智能代理在对话或任务执行中主动处理。 **支付不再依赖用户操作，而是作为智能行为的一环，根据意图自动触发并完成。**

更广泛的金融服务——信贷、保险、账户服务——也将以无感化的方式嵌入 AI 的每一个调用。基于 AI 对用户行为和财务状态的深度理解，金融产品将第一次从静态产品变成动态服务：实时现金流贷款、基于个人风险偏好的财务建议、基于当前市场状况的动态定价保险……

**未来的资源市场想象力。** 当前的 Agent 支付主要处理固定定价场景（如每次 API 调用 0.001 美元），但区块链的真正潜力在于为万物创造市场。设想一个 Agent 商务未来：用户告诉 AI"用 500 美元按这些规格给我定制一把椅子"，Agent 自主协调采购木材、雇佣木匠、安排配送——全程自动化，多方资源的实时动态定价由市场决定，而非人工设定。这种超金融化的资源市场，正是这套基础设施所指向的终极形态。

## 竞争格局与待解挑战

Agent 支付赛道的格局不会一帆风顺，有几个关键问题值得关注。

### 标准大战：协议的碎片化风险

MPP、x402、ACP、AP2——四条技术路线同时并存，背后各自有不同的技术栈和利益格局：

- Stripe 站在法币支付基础设施的制高点，通过 MPP + ACP + ACS 构建完整的 Agent 商务生态
- Coinbase 掌握 Base 链 + USDC + CDP 的端到端链上技术栈，x402 是其链上支付野心的自然延伸
- Google 联合科技巨头推出 AP2，试图在 Agent 授权层面建立标准

谁会赢？历史给出过类似的参考——支付协议的竞争最终往往是生态规模和网络效应决定的。Stripe 已有全球数百万商家的基础，这是最难复制的护城河。

### 中间商的护城河困境

在 x402 等协议的中间商层，技术门槛极低——任何人都可以搭建路由支付的服务，并收取 0-25 基点的手续费。但这种护城河几乎不可持续：Cloudflare 或 Google 可以随时以成本价提供同等服务；Coinbase 为了推广整个生态，可能开源免费提供中间商能力。真正的价值积累在底层链和协议层，而不在中间商。

### 微支付的经济可行性

低于 0.01 美元的支付——Agent 按次访问内容、按秒使用计算资源——在目前的大多数区块链上都不经济。Tempo 的专用支付链是当前最接近解决方案的尝试，但规模化后的实际费用表现仍需验证。Layer 2 方案、应用链或专用 Rollup 将是这个问题的另一条求解路径。

### Agent 的资金权限边界

当 Agent 拥有真实的支付能力后，一个根本性的问题浮出水面： **如何界定 AI 可以使用资金的范围和权限？**

SPT 给出了一个起点答案：限定商家、限定金额、限定时间。但在更复杂的场景中——Agent 需要动态协调多方资源、进行连续谈判和结算——权限模型的设计将成为整个生态安全性的关键。谁负责定义 Agent 的消费授权书？用户、企业、还是平台？这套治理框架尚未形成共识。

### 新型欺诈模式的挑战

传统欺诈防控假设异常行为等同于机器行为，但 Agent 支付时代，正常行为本来就是机器行为。这需要从根本上重建欺诈识别框架——区分高意图 Agent 和低信任自动化机器人，需要新的信号体系：支付行为的上下文一致性、商品与用户意图的匹配度、支付模式的规律性……这是一个全新的技术挑战。

## 核心收获：Agent 支付时代的七条洞察

**1\. HTTP 402 是机器支付的天然协议层，无需发明新的网络协议**

三十年前预留的状态码，恰好拥有机器支付需要的所有特性：标准化、与现有基础设施兼容、清晰的语义。互联网设计者的先见之明终于找到了用武之地。

**2\. Agent 支付不是更快的人类支付**

人类支付的核心是意图表达、身份验证与授权确认，每一步都需要人类在场。Agent 支付的核心是任务驱动、程序化授权与自动完成——支付是任务执行链条中的一个原子步骤，而非终点。

**3\. 专用支付区块链是微支付经济可行性的必要条件**

通用区块链的设计优先级不是支付，Tempo 的出现填补了这个空白。未来将有更多专用支付层涌现——侧链、应用链、Rollup——这是基础设施竞争的下一个主战场。

**4\. 三大协议（MPP/x402/ACP）将长期并存，而非零和竞争**

MPP 面向机器支付（API/工具调用），x402 面向内容付费和 Web3 生态，ACP 面向消费者电商。三者的目标场景不同，很可能最终形成互补而非替代关系。

**5\. 真正的价值将积累在掌控入口的一方**

中间商没有护城河，但掌握用户入口（ChatGPT 用户、Cloudflare 网络节点）和底层基础设施（支付链、稳定币）的一方，将获得最大的价值捕获能力。这是所有支付系统竞争的铁律。

**6\. 安全机制的设计决定 Agent 支付能走多远**

SPT 是第一个系统性回答如何让 Agent 安全代理人类付款的方案。未来更复杂的资金授权模型、跨 Agent 的信任传递机制，将是整个生态规模化的关键瓶颈。

**7\. 内容创作者和 API 提供者需要现在思考 AI 时代的定价模型**

AI 爬虫正在成为你的最大用户，但它们不会看广告、不会订阅、不会自愿付钱。无论是选择 x402、MPP 还是其他方案，尽早为机器访问建立计费机制，是内容生产者和数据提供者的战略选择。

### 参考资源

- Stripe: Introducing the Machine Payments Protocol <sup>[9]</sup>
- MPP 官网 mpp.dev <sup>[10]</sup>
- Stripe: Introducing the Agentic Commerce Suite <sup>[11]</sup>
- Agentic Commerce Protocol (ACP) <sup>[12]</sup>
- Stripe: Shared Payment Tokens 文档 <sup>[13]</sup>
- Stripe: MPP 集成指南 <sup>[14]</sup>
- Tempo: 专为支付设计的 L1 区块链 <sup>[15]</sup>
- Cloudflare 正与 Coinbase 合作创立 x402 Foundation <sup>[16]</sup>

### 参考资料

\[1\]

Machine Payments Protocol（MPP）: *https://mpp.dev/*

\[2\]

Machine Payments Protocol（MPP）: *https://mpp.dev/*

\[3\]

Browserbase: *https://browserbase.com/*

\[4\]

Agentic Commerce Protocol（ACP）: *https://www.agenticcommerce.dev/*

\[5\]

Tempo: *https://tempo.xyz/*

\[6\]

Shared Payment Tokens（SPT）: *https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens*

\[7\]

Stripe Radar: *https://stripe.com/radar*

\[8\]

Agentic Commerce Suite（ACS）: *https://stripe.com/blog/agentic-commerce-suite*

\[9\]

Stripe: Introducing the Machine Payments Protocol: *https://stripe.com/blog/machine-payments-protocol*

\[10\]

MPP 官网 mpp.dev: *https://mpp.dev/*

\[11\]

Stripe: Introducing the Agentic Commerce Suite: *https://stripe.com/blog/agentic-commerce-suite*

\[12\]

Agentic Commerce Protocol (ACP): *https://www.agenticcommerce.dev/*

\[13\]

Stripe: Shared Payment Tokens 文档: *https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens*

\[14\]

Stripe: MPP 集成指南: *https://docs.stripe.com/payments/machine/mpp*

\[15\]

Tempo: 专为支付设计的 L1 区块链: *https://tempo.xyz/*

\[16\]

Cloudflare 正与 Coinbase 合作创立 x402 Foundation: *https://blog.cloudflare.com/zh-cn/x402/*

莫尔索随笔

邀请你前往腾讯公益一起捐

照亮凉山孩子上学路

作者提示: 个人观点，仅供参考

阅读原文

继续滑动看下一个

莫尔索随笔

向上滑动看下一个