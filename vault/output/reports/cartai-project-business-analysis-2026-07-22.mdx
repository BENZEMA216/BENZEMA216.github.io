# CartAI 项目与商业分析

> 生成时间：2026-07-22
> 查询：https://docs.cartai.ai/docs/introduction 这个项目在做什么、问题是什么、解决方案是什么、商业上是什么

## 摘要

CartAI 不是面向消费者的 AI 导购，而是面向开发者和平台的 **Agentic Commerce execution layer**：把任意商品 URL 变成可由 API 发起、由 Agent 在商家现有网站上完成的真实订单。它要解决的是商品发现发生在搜索、社交、内容、垂直 AI 和金融 App 内，但交易仍被迫跳回商家 checkout，导致体验断裂、转化流失和 affiliate attribution 丢失。

商业上，它是 **B2B2C transaction infrastructure + affiliate network**：一边按生产 API 用量/GMV basis points 向集成方收费，一边捕获联盟佣金并与流量平台分成；商家仍是 Merchant of Record，CartAI 尽量不承担库存、履约、退款和售后责任。

## 1. 它在做什么

一句话：**给“有商品发现和购买意图、但没有交易能力”的产品提供统一结账 API。**

开发者提交商品 URL、商品规格、顾客地址和 tokenized payment credential；CartAI 创建异步任务，由浏览器 Agent 访问商家网站，完成加购、选择配送、支付和订单确认，再通过 webhook 返回状态与规范化订单结果。

当前产品面覆盖四层：

| 层 | 功能 | 商业意义 |
|---|---|---|
| Catalog | 跨商家搜索、variant、实时价格、checkout estimate | 接住发现与推荐入口 |
| Checkout | 在商家 live surface 上下单，支持多 SKU、多商家并行 | 把 recommendation 变成 confirmed order |
| Payments | Hosted payment session、vaulted token、Visa / Mastercard agentic payment rails | 降低集成方 PCI 暴露与支付风险 |
| Monetization | commission URL、归因和联盟佣金分成 | 让内容/搜索/AI 平台从点击价值升级为成交价值 |

## 2. 它认为的问题是什么

### 表层问题：购买链路断裂

搜索、AI 推荐、社交内容和比价产品负责创造意图，但点击购买后用户会被 redirect 到不同商家的网页，重新选择规格、填地址和支付。体验上下文被切断，移动端尤其容易流失。

### 平台问题：创造需求的人拿不到交易价值

发现平台通常只能拿 affiliate click；跳转、cookie、跨设备和 Agent 代购会破坏 attribution。平台既看不到完整 checkout，也难以确认最终价格、订单是否成立、优惠码是否生效。

### Agent commerce 的基础设施问题

Agent 能推荐商品不等于能安全地买商品。真实交易还要求：实时价格和库存、用户明确授权、支付凭证隔离、最终金额确认、异步状态、失败恢复、bot 信任与订单凭证。Merchant API 逐家集成覆盖慢，而纯浏览器自动化又脆弱且风险高。

## 3. 它的解决方案是什么

CartAI 的关键取舍不是改造商家，而是 **站在买方/流量平台一侧，适配商家已有网站**：

1. 用统一 API 接收不同商家的商品与用户 checkout profile。
2. 用专用浏览器 Agent 操作 live merchant surface，不要求每个商家接入 CartAI。
3. 用 taskId、webhook、`PENDING_CONFIRMATION` 等状态将长耗时、不确定的网页操作变成可管理的交易任务。
4. 在提交订单前回传实际 subtotal、shipping、tax、total，让上层产品获得最终确认。
5. 原始卡号交给 PCI-compliant vault；Agent 使用 vaulted / single-use agentic payment token，而非直接持有 PAN。
6. 订单仍原生落在商家系统中，商家继续履约、发确认邮件、处理退换货。

它的本质类似 **“Stripe for the buy side” + browser automation execution network**，但不是支付收单本身：Stripe 统一“商家收钱”，CartAI 试图统一“任何应用替用户去不同商家下单”。

## 4. 商业上是什么

### 客户与用户

- 付费/集成客户：搜索与社交平台、垂直 AI、内容出版商、优惠返现与比价平台、influencer commerce、银行与 fintech。
- 最终用户：在这些第三方界面中完成购买的消费者。
- 商家：交易对手和 Merchant of Record，但不一定是 CartAI 的直接客户，也不需要先完成技术集成。

### 收入模型

官方条款明确生产 API 费用按 **交易量（GMV basis points）和/或其他 usage metrics** 收取，具体费率在账户后台或企业协议中约定，公开页面未列标准价格。第二条收入/价值流是 **affiliate commission capture**：Catalog redirect 或 CartAI 完成的 checkout 都可保留归因，CartAI再向集成平台分成。

因此更准确的模型是：

`平台产生购买意图 → CartAI 搜索/执行/支付 → 商家获得 GMV → affiliate network 产生佣金 → CartAI 与平台分成，同时 CartAI 收 API/GMV fee`

### 为什么这个商业结构有吸引力

- 不必先说服成千上万商家接 API，理论上可先从需求侧扩张。
- 收费与 GMV/订单成功绑定，价值计量直接。
- 平台从 CPC/affiliate click 升级到 completed transaction，ROI 容易解释。
- Checkout profile、商家适配、成功率/失败数据和佣金覆盖可形成复利资产。

### 最难的商业风险

1. **可靠性**：商家 DOM、库存、登录、3DS、CAPTCHA 与 bot policy 持续变化；一次错误可能是重复下单或错价，不是普通网页抓取失败。
2. **信任与授权**：谁授权买什么、最高金额多少、何时必须人工确认，需要可审计证据；否则欺诈与争议成本会吞掉 margin。
3. **责任被切割但体验不会切割**：条款把履约、退款、chargeback 和商家错误留给商家/客户，但用户仍会把失败归咎于嵌入 CartAI 的产品。
4. **毛利结构**：browser Agent 成本、merchant maintenance、支付/反欺诈和客服成本，必须低于 bps + affiliate take；这决定它能否成为基础设施而非高人力 managed service。
5. **平台依赖**：支付网络、vault、affiliate networks、bot mitigation 和商家网站任何一层改变规则，都可能影响覆盖与成功率。
6. **协议替代**：若大型商家普遍采用 UCP/AP2/ACP 等结构化 commerce protocol，浏览器执行的重要性会下降。CartAI 的防守应是成为协议与 legacy web 的统一路由，而不是只押注网页 Agent。

## 5. 我的判断

CartAI 抓到的是一个真实且价值很高的缺口：**AI 已经占据 recommendation layer，但还没有普遍占据 transaction layer。** 它卖的不是“更聪明的购物建议”，而是把意图转化为可确认、可归因、可结算订单的能力。

但这也是一个 execution-heavy business。项目是否成立，不能只看“支持任意网站”的演示，而要看五个运营指标：checkout 成功率、人工介入率、重复/错误订单率、每成功订单执行成本、以及 affiliate + API 收入后的 contribution margin。公开材料目前解释了架构和收入机制，尚未公开这些核心经营数据，因此可以确认产品逻辑成立，不能据此确认规模化单位经济已经成立。

对 Combo / Agent marketplace 的启发是：支付协议本身不够，真正能收费的是 `intent → permission → execution → verification → settlement` 的完整闭环。CartAI 还展示了另一条可能的商业化路径：不只向能力调用收费，也把结果事件接入 affiliate/revenue-share，让能力生产方和分发方共享实际交易收益。

## 数据来源

- [CartAI Introduction](https://docs.cartai.ai/docs/introduction)
- [CartAI Homepage](https://www.cartai.ai/)
- [Create Checkout Task](https://docs.cartai.ai/reference/create-checkout-task)
- [CartAI Monetization](https://www.cartai.ai/product/monetization)
- [CartAI Terms of Service](https://www.cartai.ai/terms)
- [CartAI Privacy Policy](https://www.cartai.ai/privacy)
- [agent-communication](/wiki/concepts/agent-communication/)
- [okx-agent-marketplace-teardown-2026-06](/output/reports/agora/market-competition/okx-agent-marketplace-teardown-2026-06/)

---
*由 LLM 从知识库查询生成*
