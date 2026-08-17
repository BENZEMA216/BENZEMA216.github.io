<!--
date: 2026-05-10
tags: [agent-economy, stablecoin, circle, arc, x402, prediction-markets, agora, canteen]
status: supporting
related:
  - "[agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)"
  - "[agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/)"
  - "[agora-financial-model](/output/reports/agora/business-model/agora-financial-model/)"
  - "[agent-capability-distribution-investment-landscape-2026-04](/output/reports/agora/market-competition/agent-capability-distribution-investment-landscape-2026-04/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
-->

# Canteen Agora / Circle Arc 深度研究

> Query: `https://agora.thecanteenapp.com/ 深度研究下这个`
> 日期：2026-05-10
> 口径：基于公开网页、Canteen 官方文章、Circle / Arc 文档、Polymarket builder 文档和已有 Agora BP 研究，对 Canteen 的 Agora Agents Hackathon 做产品、生态和战略分析。

---

## TL;DR

**一句话判断：Canteen 的 Agora 不是一个普通 hackathon 页面，而是 Circle Arc 在 mainnet 前做 agentic markets 生态预热的 builder funnel；Canteen 则把自己的研究内容、RFB 题库、开发者社区、投资网络和活动运营串成一个 deal-flow engine。**

它对 BENZEMA / Agora BP 的价值不在于“又有人叫 Agora”，而在于它给出了一个非常具体的市场信号：

> Agent Economy 正在从抽象的 “agent marketplace” 收敛到更硬的 primitives：可归因的调用、可结算的交易、可验证的结果、可收费的 builder contribution。

这个方向和我们已有的 Agent Capability Package BP 高度相邻，但边界不同：

| 维度 | Canteen Agora | BENZEMA Agora |
|---|---|---|
| 核心场景 | 金融 / prediction market / stablecoin-native agent apps | 跨 runtime 的 Agent 能力包发布、安装、验证和结算 |
| 底层依赖 | Circle Arc、USDC、Gateway、x402、onchain attribution | Claude Code / Codex / Cursor / Agent-VM、本地 runtime、hosted protected step |
| 第一批供给 | trading / portfolio / arbitrage / social intelligence agents | coding、创作、账号运营、知识库、vertical workflow 能力包 |
| 关键 primitive | wallet、transaction、builder code、fee、market data、risk control | manifest、permissions、tests、runtime adapter、event ledger、entitlement、settlement |
| 商业重心 | 帮 Arc 跑出开发者和交易 volume | 让第三方 Agent 能力成为可安装、可运行、可持续收费的商品 |

**最重要的启发**：BP 里要继续强化 `event ledger / attribution / settlement`。Canteen Agora 和 Polymarket Builder Program 都在证明，agent 时代的收费不是“上架一个 bot 然后抽成”这么粗，而是要精确记录谁在什么时候贡献了什么能力、触发了哪笔交易、是否产生价值、如何分账和退款。

---

## 1. 它到底是什么

Agora Agents Hackathon 是 Canteen 与 Circle / Arc 合作的线上活动，时间是 **2026-05-11 到 2026-05-25**，总奖金 **$50,000**。页面显示活动定位为：

- building AI agents that trade, invest, create, and interface with markets
- 通过 Circle Arc 结算和部署
- 赛道覆盖 prediction markets、portfolio management、onchain payments、social trading、cross-platform arbitrage 等
- 申请需要钱包 token，入选 builder 可获得 $10 testnet USDC、导师、Arc / Canteen / partner network 资源

页面显示 Luma 有 **250 going**，这对一个垂直线上 hackathon 来说不是低信号，尤其是它不是泛 AI app，而是 stablecoin / agentic markets 交叉赛道。

评分权重很说明问题：

| 权重 | 维度 | 真正含义 |
|---:|---|---|
| 30% | Agent sophistication | 不是 prompt demo，要看自主性、工具使用、决策能力 |
| 30% | Real-world traction | 不是论文或 backtest alone，要看用户、交易、volume、TVL、可持续使用 |
| 20% | Circle tools integration | 明确服务 Circle Arc / Gateway / USDC / x402 生态 |
| 20% | Innovation | 希望跑出新的 market primitive，而不是复制交易 bot |

所以它的真实目标不是“办活动发奖金”，而是：

1. 给 Arc 找到第一批会产生链上行为的 AI-native 应用。
2. 给 Circle 验证 USDC-native chain 是否适合 machine payments / agent transactions。
3. 给 Canteen 沉淀最早一批 agentic finance builder、项目和投资线索。

来源：
- [Agora Agents Hackathon](https://agora.thecanteenapp.com/)
- [Luma 活动页](https://luma.com/h31zb9a0)

---

## 2. Canteen 是谁

Canteen 官方 About 页面把自己定义为 **NYC-based web3 research and technology firm**，专注 crypto、AI 和 payments，计划在 2026 Q1 正式 launch。页面强调：

- 写研究和分析
- 和 partner 一起办 builder events
- build / invest in projects at the intersection of crypto, AI, and payments
- team 背景来自 Coinbase、Solana、Protocol Labs、YC companies 等

这不是传统媒体，也不是单纯开发者社区。它更像一个小型 ecosystem studio：

```
research thesis
  -> public analysis
  -> RFB / hackathon
  -> builder community
  -> mentorship / partner network
  -> investment / company formation / ecosystem deal flow
```

有一个细节值得注意：2025 年 HN 上出现过 Canteen 的 recruiting 产品 Show HN，标题是 “Canteen: An agentic communication layer for hiring engineers”，现在 `recruiting.thecanteenapp.com` 仍然是工程师招聘 waitlist 页面。这说明 Canteen 很可能经历过一次从 recruiting / agentic comms 到 crypto+AI+payments research studio 的转向，或者至少是同一团队在多个相邻方向上探索。

这会影响我们对它的判断：

- **正面**：团队不是空壳，有连续探索，能快速从产品尝试转向市场更热的 agentic finance。
- **负面**：组织本身还年轻，公开产品和代码资产不多，很多信号来自内容、活动和 partner，而不是成熟平台。

来源：
- [Canteen About](https://thecanteenapp.com/about/)
- [Canteen recruiting waitlist](https://recruiting.thecanteenapp.com/)
- [Show HN: Canteen](https://news.ycombinator.com/item?id=45267216)

---

## 3. SWARM 是前置样板

Agora 之前，Canteen 已经和 Colosseum 做过 **SWARM Online Hackathon**。这个活动也很像“研究 thesis + builder funnel”的模板：

- 总奖金 $25,000
- 主题是 Solana 上的 agent applications
- RFB 包括 trading agents、tokenized agent ownership、DAO community management、DeFi agents、agent reputation、onchain identity 等
- Canteen 提供 `SWARM-cli`，用于 builder 提交进展更新
- Colosseum 提供教育资源、导师和加速器网络

这说明 Agora 不是一次临时营销，而是 Canteen 已经形成的一套生态运营方法：

1. 找一个强 L1 / infra partner。
2. 写出赛道研究和 RFB。
3. 用线上 hackathon 聚集早期 builder。
4. 用 CLI / Discord / mentorship 追踪项目进展。
5. 从项目中筛出可投资、可合作、可继续孵化的团队。

对 BENZEMA 的启发：如果做 Agent Capability Package，不一定从“先做 marketplace 网站”开始，也可以从 **RFB + 标杆能力包共创 + 小型 hackathon / bounty** 开始。先定义需求，再让创作者围绕能力包规范提交作品。

来源：
- [SWARM Hackathon](https://thecanteenapp.com/releases/2026/03/02/swarm-hackathon.html)
- [the-canteen-dev/SWARM-cli](https://github.com/the-canteen-dev/SWARM-cli)

---

## 4. 为什么是 Circle Arc

Arc 是 Circle 推出的 stablecoin-native Layer 1。Circle 官方介绍里，Arc 的核心卖点包括：

- gas fee 使用 USDC
- sub-second deterministic finality
- EVM-compatible
- opt-in privacy
- integrated stablecoin FX / CCTP / Gateway / Circle Wallets
- 目标是服务 payments、FX、capital markets、commerce 等金融应用

Arc 文档里还有一些更具体的工程口径：

- block time 约 350ms
- target transaction fee 约 $0.01
- testnet 已开放，支持 QuickNode / Tenderly / Thirdweb / Alchemy / Foundry / Hardhat / Remix 等开发工具

Circle 2026 product vision 里补了更大的战略图：

- Arc testnet 前 90 天已有 150M transactions、1.5M wallets、近 1000 个生态项目申请
- Gateway 让同一个 USDC balance 可以跨链访问
- Circle Payments Network / Gateway / Arc 是同一套 Internet Financial System 里的不同层
- Nanopayments 允许最低 $0.000001 USDC 的授权，链下逐笔授权、批量链上 settlement，并以 x402 作为 machine-to-machine payment 的接口层

这正好解释 Agora 为什么选择 “agents that interface with markets”：

| Arc / Circle primitive | Agentic markets 对应需求 |
|---|---|
| USDC gas | agent 不需要处理 volatile gas token |
| sub-second finality | trading / arbitrage / market action 更可用 |
| Gateway unified balance | agent 可跨链调动资金，减少桥接摩擦 |
| CCTP / stablecoin settlement | 金融应用可以以 USDC 为结算层 |
| x402 / Nanopayments | per-call / per-data / per-agent-service 计费成为可能 |
| opt-in privacy | 机构和 agent 策略有机会隐藏部分敏感交易逻辑 |

这个组合不是在服务一般 consumer AI app，而是在服务 **agent 自己会花钱、收钱、交易、订阅数据、调用服务** 的世界。

来源：
- [Circle: Introducing Arc](https://www.circle.com/blog/introducing-arc-an-open-layer-1-blockchain-purpose-built-for-stablecoin-finance)
- [Arc docs](https://docs.arc.network/arc-chain)
- [Circle 2026 Product Vision](https://www.circle.com/blog/building-the-internet-financial-system-circles-product-vision-for-2026)
- [Circle Gateway docs](https://developers.circle.com/gateway/quickstarts/unified-balance-evm)
- [Circle Nanopayments docs](https://developers.circle.com/gateway/nanopayments)

---

## 5. Canteen 的底层 thesis：prediction markets 会被 agent 化

Canteen 近期文章不是随机写的，基本都在给 Agora 铺路。

### 5.1 Prediction market stack 正在 unbundle

《Unbundling the Prediction Market Stack》把 prediction market 拆成几个层：

- market creation
- forecasting / research
- trading / execution
- data / discovery
- settlement / attribution
- creator / community distribution

它强调一个关键变化：预测市场过去像单一 venue，现在更像金融市场 stack，可以被拆成多个专业层。AI agents 可以切入其中的研究、交易、套利、流动性、内容、社区、风控和垂直市场创建。

这和 Agora RFB 的结构完全一致：不是只问“做一个交易 bot”，而是把市场栈拆成不同 agent primitive。

### 5.2 LLM 适合慢速、文本密集、事件驱动市场

Canteen 对 AI trading agents 的判断比较克制：LLM 不适合高频交易，但适合处理文本、新闻、社交情绪、赛程、政策、财报、论坛讨论等事件驱动信号。Prediction markets 比传统 HFT 更适合 LLM，因为很多市场是慢速、语义密集、流动性较薄、信息整理成本高。

这也是它 RFB 里反复出现 prediction market、social intelligence、vertical markets 的原因。

### 5.3 Builder attribution 会成为关键

Canteen 在 Polymarket stack 文章里提到 Builder Programs / attribution 的重要性。Polymarket 文档里，builder 可以通过在 order 里写入 `builder` field、设置 builder fee basis points，并监听 `OrderFilled` event 来追踪成交和费用。协议目前对 non-affiliate builders 支持最高 100 bps taker fee、50 bps maker fee。

这个机制的战略意义大于 Polymarket 本身：

> 如果 agent 帮用户发现机会、下单、组合策略、完成交易，那么必须有一种方式记录这个 agent / builder 对结果的贡献，并据此收费。

这和 BENZEMA Agora 的 `event ledger` 是同一个方向。只是 Polymarket 的 event 是交易层的，Agent Capability Package 的 event ledger 要覆盖更宽的任务执行、工具调用、hosted protected step、版本、失败归因和退款。

来源：
- [Canteen: Unbundling the Prediction Market Stack](https://thecanteenapp.com/analysis/2026/05/01/unbundling-the-prediction-market-stack.html)
- [Canteen: AI Agent Landscape](https://thecanteenapp.com/analysis/2026/01/06/ai-agent-landscape.html)
- [Polymarket Builder Overview](https://docs.polymarket.com/builders/overview)
- [Polymarket Builder Fees](https://docs.polymarket.com/builders/fees)

---

## 6. RFB 逐项拆解

Agora 页面列了 6 个主要 RFB。它们可以按产品 primitive 重写成下面这张表。

| RFB | 表层题目 | 背后 primitive | 成功形态 |
|---|---|---|---|
| Perp Trading Agent | 永续合约交易 agent | autonomous execution + risk limits + strategy eval | 有真实交易、回撤控制、仓位约束、可解释策略 |
| Prediction Market Trader Intelligence | 预测市场交易智能 | research-to-order pipeline | 从新闻/社媒/数据到概率估计、下注、复盘 |
| Prediction Market Verticals | 垂直预测市场 | domain-specific market creation | 体育、政治、crypto、娱乐、宏观等垂直市场的自动创建和运营 |
| Adaptive Portfolio Manager | 自适应组合管理 | agent as asset manager | 资产配置、rebalance、风险预算、收益归因 |
| Cross-Platform Arbitrage | 跨平台套利 | venue abstraction + execution routing | 监控多市场价差，完成跨 venue 执行和结算 |
| Social Trading Intelligence | 社交交易智能 | social signal extraction + copy/anti-copy trading | 从 KOL、群聊、论坛、钱包行为中提取交易信号 |

这些 RFB 共同指向一个更大的设想：

```
market data
  -> agent research
  -> decision / strategy
  -> wallet / execution
  -> onchain settlement
  -> attribution / fee
  -> performance reputation
```

也就是说，Canteen 不只是想要 “AI agent apps”，而是在诱导 builder 把 **金融市场参与者的完整链路** agent 化。

---

## 7. 它对 Agent Economy 的真实信号

### 7.1 Agent payment 会先在金融场景跑起来

Agent Economy 最抽象的问题是：agent 为什么要付钱？谁给 agent 付钱？agent 付了钱怎么证明产生了价值？

Agora 选择 prediction markets / trading / portfolio 是合理的，因为这些场景天然有：

- 明确账户和 wallet
- 明确收益 / 损失
- 明确 transaction event
- 明确 builder attribution
- 高频数据和服务订阅需求
- 用户愿意为 edge 付费

换句话说，agent-to-agent / agent-to-service payment 不会先从“通用聊天机器人互相调用”跑出来，而更可能从 **能直接产生金融收益或节省交易成本的调用** 跑出来。

### 7.2 Event ledger 比 marketplace listing 更重要

Agora 页面和 Polymarket builder 文档一起看，给出的核心启发是：

> 未来的 agent marketplace 不是靠 listing 赚钱，而是靠可归因的执行事件赚钱。

对 Agent Capability Package 来说，`event ledger` 至少应该记录：

- 哪个能力包被调用
- 哪个版本
- 哪个用户 / 主 agent / workflow 调用
- 输入输出摘要
- 调用了哪些工具 / hosted protected steps
- 消耗了多少 token / API / credits
- 是否产生目标结果
- 哪一步失败
- 该如何分账、退款、计算 reputation

Canteen Agora 的金融场景会把这个问题放大，因为一笔交易成功后，用户会问：

- 是哪个 signal agent 贡献了 alpha？
- 是哪个 execution agent 完成成交？
- 哪个 portfolio agent 做了风险限制？
- 如果亏损，是策略错、数据错、执行滑点，还是 market maker 问题？

这正是 `failure attribution` 和 `settlement ledger` 的产品价值。

### 7.3 RFB 是比“开 marketplace”更早的供给冷启动方式

过去我们讨论 Agora 很容易落到 marketplace 页面、listing、搜索、支付。Canteen 的玩法提醒我们，早期更好的方式可能是：

1. 定义 5-10 个明确 RFB。
2. 每个 RFB 对应一个可验证的 capability package spec。
3. 用 bounty / hackathon / creator cohort 找供给。
4. 要求提交 manifest、tests、demo、event trace、pricing proposal。
5. 从完成度高的作品里挑 lighthouse packages。

这比空建 marketplace 更像真实供给形成路径。

---

## 8. 对 BENZEMA / Agora BP 的直接启发

### 8.1 不要被名字冲突干扰

Canteen 的 Agora 是“市场广场”意义上的生态活动名；BENZEMA Agora 是 Agent 能力商品化平台。名字撞了，但战略上不完全重叠。

真正应该关注的是：他们已经把 “agent + market + payment + attribution” 这组关键词打包成 public builder program。这个外部信号可以反过来加强我们 BP 里的经济层论证。

### 8.2 BP 需要更强地写 settlement primitives

当前 Agora BP 已经有 `pricing.yaml`、`event ledger`、`hosted protected step`、creator payout 等设计。基于 Canteen Agora，可以进一步把能力包 manifest 里的 settlement 相关字段写实：

```yaml
settlement:
  attribution_code: "cap_pkg_..."
  billing_mode: "subscription | usage | success_fee | per_event | hybrid"
  fee_split:
    creator_bps: 8500
    platform_bps: 1000
    upstream_tools_bps: 500
  billable_events:
    - hosted_step_completed
    - verified_result
    - order_filled
    - report_delivered
  refund_policy:
    failed_smoke_test: full
    partial_execution: prorated
  receipts:
    required: true
    fields: [version, input_hash, output_hash, tool_calls, cost, result_status]
```

这会让 Agora 不像 GPT Store，而更像 capability commerce infrastructure。

### 8.3 可以补一个 “market-facing capability package” wedge

我们已有两个候选 wedge：

- Claude Code / Codex / Cursor 的技术能力包
- 本地账号执行型创作 / 运营能力包

Agora hackathon 提供了第三个可选 wedge：

**Market-facing capability packages**：帮助 agent / human 在市场中研究、决策、执行和归因的能力包。

候选 demo：

| Demo | 说明 | 为什么有价值 |
|---|---|---|
| Prediction Market Research Package | 输入事件主题，自动抓取新闻、社媒、历史赔率、生成概率区间和下注建议 | 语义密集、非 HFT，适合 LLM |
| Builder Attribution Wrapper | 给 agent action 自动生成 attribution code、receipt、fee split 和 event trace | 直接连接 Agent Economy 的结算层 |
| Trading Agent Evaluation Harness | 对 trading / prediction agent 做 backtest、paper trading、risk report、prompt regression | 能力包 marketplace 需要 trust / tests |
| Market Agent Listing Spec | 为 trading agent listing 定义收益、回撤、样本数、风险约束、权限、custody boundary | 避免 marketplace 变成夸大 PnL 的噪声市场 |

其中最贴 BENZEMA 主线的不是直接做交易 bot，而是 **Builder Attribution Wrapper + Trading Agent Evaluation Harness**。这两者是金融 agent 能力包市场的基础设施，而不是和参赛者抢应用层。

### 8.4 Canteen 的活动模型值得复制

如果 BENZEMA 要冷启动能力包供给，可以借鉴：

1. 写一篇 “Agent Capability Package RFBs”。
2. 先列 6 个垂直包，而不是泛泛征集 agent。
3. 每个包要求提交：
   - `manifest.lock`
   - `runtime adapter`
   - `resource schema`
   - `canonical tests`
   - `event ledger sample`
   - `pricing / support boundary`
4. 奖金不一定大，但要给 distribution、case study、creator payout。
5. 用活动结果反向改 BP 和 package spec。

这比“等平台完成再找创作者”更早拿到供给质量和安装摩擦数据。

---

## 9. 批判性风险

### 9.1 Arc 仍有 mainnet / adoption 风险

Arc testnet 指标强，但 Arc 是否会成为稳定币金融应用的默认 L1，还取决于：

- mainnet 上线和稳定性
- 真实 liquidity 和 market maker
- 机构采用速度
- 监管环境
- 开发者是否愿意离开 Base / Solana / Ethereum L2 等现有生态

Circle 的品牌和 USDC 分发很强，但 hackathon 不能自动转化为长期生态。

### 9.2 Trading agent 容易过度叙事

金融 agent 的 demo 很好看，但真实产品会遇到：

- PnL 不稳定
- backtest overfit
- prompt / model drift
- 数据源延迟
- 交易滑点
- custody / private key 风险
- 投资建议与监管边界
- 用户亏损后的责任归因

所以 “agent trades for you” 不一定是最佳产品形态。更稳的切口可能是 research、risk, execution assistant、evaluation harness、attribution middleware。

### 9.3 Canteen 组织本身还早期

Canteen 的研究和活动组织能力有信号，但公开资产仍有限：

- 官方 GitHub org 当前公开项目较少
- 早期 recruiting 产品与当前方向存在转向
- 活动依赖强 partner，比如 Colosseum / Circle / Arc
- 还没有看到成熟自有平台的持续使用数据

因此它更适合作为 **市场方向信号**，而不是作为成熟竞品 benchmark。

### 9.4 Agent payment 协议不等于 Agent Economy

x402、USDC gas、nanopayments 能解决支付动作，但不能单独解决：

- 能力发现
- 质量认证
- 权限边界
- 运行可验证性
- 多 agent 分账
- 退款争议
- 长期 reputation

这恰好是 BENZEMA Agora 的空间：支付协议是底座，能力包的 trust / install / verification / settlement 才是应用层。

---

## 10. 建议动作

### 立即动作

1. **报名 / 加入 Discord 观察**：即使不参赛，也值得看 builder 提交质量、Arc tooling friction、judge 反馈和获奖项目。
2. **整理一页 “Agent Capability Package × Arc Hackathon” memo**：把我们 BP 的 event ledger / settlement / evaluation 放到金融 agent 场景里验证。
3. **盯获奖项目**：重点看不是谁 PnL 最高，而是谁解决了 attribution、risk、evaluation、data sourcing、跨 venue abstraction。

### 如果参赛，建议不要做普通交易 bot

更适合 BENZEMA 的参赛方向：

**Market Agent Evaluation + Attribution Layer**

功能：

- 让 trading / prediction agents 接入一个标准 wrapper
- 自动记录版本、工具调用、输入 hash、输出 hash、交易事件、费用、结果状态
- 生成可提交给 marketplace / judge / user 的 receipt
- 支持 Polymarket builder code 或 Arc event 模型
- 提供 smoke test / backtest / paper trading report

为什么这个方向更好：

- 贴 Circle / Arc 的 transaction primitive
- 贴 Canteen 的 builder attribution thesis
- 贴 BENZEMA Agora 的 event ledger / capability package thesis
- 避开直接承诺 alpha 的高风险
- 可以沉淀成未来 Agent Capability Package 的金融类标准模块

### 对现有 BP 的更新建议

可以在 Agora BP 的 “能力包为何需要 event ledger” 一节补一句：

> 金融 agent 场景已经开始把 builder attribution、per-transaction fee、event receipt 和 stablecoin settlement 放进同一个开发者 funnel。Agora 不应只做 listing marketplace，而应成为能力调用、结果验证和收益归因的基础设施。

这句话能把 Canteen Agora、Polymarket Builder Program、x402 / USDC Nanopayments 和我们已有的 Agent Capability Package 论证接起来。

---

## References

- [Agora Agents Hackathon](https://agora.thecanteenapp.com/)
- [Luma: Agora Agents Hackathon](https://luma.com/h31zb9a0)
- [Canteen About](https://thecanteenapp.com/about/)
- [Canteen recruiting waitlist](https://recruiting.thecanteenapp.com/)
- [Show HN: Canteen](https://news.ycombinator.com/item?id=45267216)
- [Canteen: SWARM Online Hackathon](https://thecanteenapp.com/releases/2026/03/02/swarm-hackathon.html)
- [GitHub: the-canteen-dev/SWARM-cli](https://github.com/the-canteen-dev/SWARM-cli)
- [Canteen: Unbundling the Prediction Market Stack](https://thecanteenapp.com/analysis/2026/05/01/unbundling-the-prediction-market-stack.html)
- [Canteen: AI Agent Landscape](https://thecanteenapp.com/analysis/2026/01/06/ai-agent-landscape.html)
- [Circle: Introducing Arc](https://www.circle.com/blog/introducing-arc-an-open-layer-1-blockchain-purpose-built-for-stablecoin-finance)
- [Arc docs](https://docs.arc.network/arc-chain)
- [Circle 2026 Product Vision](https://www.circle.com/blog/building-the-internet-financial-system-circles-product-vision-for-2026)
- [Circle Gateway docs](https://developers.circle.com/gateway/quickstarts/unified-balance-evm)
- [Circle Nanopayments docs](https://developers.circle.com/gateway/nanopayments)
- [Polymarket Builder Overview](https://docs.polymarket.com/builders/overview)
- [Polymarket Builder Fees](https://docs.polymarket.com/builders/fees)
