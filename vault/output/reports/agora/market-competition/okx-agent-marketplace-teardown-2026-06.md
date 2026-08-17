<!--
status: supporting
status_reviewed: 2026-07-17
evidence_level: product-research
-->

# OKX Agent Marketplace — 产品拆解与竞争定位

> 来源: 知识库 Query 讨论 (2026-06-24)，对象 = https://okxaionepager.netlify.app/（OKX Agent Marketplace 上手指南 One Pager）
> 方法: chrome-devtools 渲染抓全站点正文 + 折叠 FAQ（中英双版） + 外链；对照 OKX 官方 Learn 文档与底层支付协议 x402（Coinbase）
> 结论: **OKX 在把交易所最擅长的「托管 / 清结算 / 争议仲裁 / 信用」平移到 agent 经济。诊断正确、赛道有真实量、分发有冷启动优势；但需求侧（谁来买）是最大问号，且信用绑死钱包、不可迁移 —— 恰好是 Agora portable identity 线的反面锚点。**

---

## TL;DR

- 这个 One Pager 不是一个产品，是 OKX 一整套 agent 经济基础设施的**发现入口（橱窗 + 指令生成器）**。
- 四层要分清：**Marketplace（发现）/ Onchain OS（执行，跑在 Agent 客户端里）/ X Layer（零 gas 结算 L2）/ Payment SDK·x402（支付协议）**。
- 核心叙事 `one person, one company, $1M a year` —— 押注超级个体靠编排 AI Agent 跑公司。
- 两种交易模式：**A2A**（协商 + escrow 担保 + 仲裁，适合研究报告/内容生产）vs **A2MCP**（pay-per-call 即调即结、无仲裁，建在 x402 上，适合标准化 API）。
- 三种角色（一个钱包 ≤100 身份，≤98 ASP）：**User / ASP（服务商）/ Evaluator（质押 OKB 的链上陪审团）**。
- 加密经济学做得很细（Commit-Reveal 防跟票、weighted random 抽选、少数方/弃票/败诉罚没），这是 OKX 的本行。
- **它在赌**："瓶颈从智能转移到了商业（commerce）" —— agent 能干活了，缺的是 quoting/escrow/metering/settlement/dispute。
- **风险**：需求侧存疑（OKX 用户是来炒币的）、Evaluator 鸡生蛋、"去中心化" 名不副实、信用不可跨钱包迁移、营销叙事 vs 工程门槛 gap。
- **对 Agora**：同一个"可验证交付"问题的重资产/链上解法。OKX 的解法很重 → 给轻量方案留空间；信用不可携带 → 正好是 [portable-identity-competitive-research](/output/reports/agora/market-competition/portable-identity-competitive-research/) 线能站住的差异化位置。

---

## 一、它到底是什么（四层架构）

页面把四个层次混在一起讲，理清后是这样：

| 层 | 名字 | 作用 | 类比 |
|---|---|---|---|
| 发现层 | **OKX Agent Marketplace**（本站） | 浏览全网 Agent / 任务大厅，复制结构化指令回客户端 | 应用商店橱窗 |
| 执行层 | **Onchain OS**（跑在 Agent 客户端里） | 你真正下指令、注册、签名的地方 | 操作系统 / SDK |
| 结算层 | **X Layer**（OKX 自己的 L2） | 零 gas 上链清结算 | 清算所 |
| 支付协议 | **Payment SDK / x402** | one-time / batch / pay-as-you-go / escrow | Visa 网络 |

FAQ 原文是理解全局的钥匙：**"Onchain OS 是你执行操作的地方，这个市场是你发现机会的地方。"** Marketplace 本身只是橱窗 + 指令生成器：
- 作为 **User** —— 浏览全网 Agent，看 Agent Card / 信用分 / 报价，复制结构化指令回聊天框直接发任务；
- 作为 **ASP** —— 浏览**任务大厅**，挑符合能力与价格的任务，复制接单指令让 Agent 主动联系发布者。

客户端支持：Openclaw / Hermes / Codex / Claude Code。登录用 Agentic Wallet（邮箱 OTP），密钥由 **TEE** 保管，本地不存原始私钥。状态：**Whitelist beta，JUN 12 上线**；A2A 仅限白名单。

---

## 二、机制设计拆解（最值得看）

### 两种交易模式（设计骨架）

| | **A2A（协商 + escrow 担保）** | **A2MCP（标准化 API / pay-per-call）** |
|---|---|---|
| 适合 | 研究报告、内容生产、咨询（要来回沟通） | 价格查询、数据接口（标准化、按调用付费）|
| 资金流 | 接单即锁仓 → 验收释放 / 3 天无操作 Keeper 自动释放 / 拒收可申诉 | 调用瞬间 = 扣款 + 交付 + COMPLETE 同步完成 |
| 仲裁 | ✅ 支持（≥5 Evaluator 投票） | ❌ 完全没有，"没有试一下" |
| 底层 | OKX 自建 escrow 合约 | 直接建在 **x402** 上（endpoint 形如 `…/x402/price`）|

> ⚠️ **术语劫持**：业界 "A2A" 指 Google 的 Agent2Agent 通信协议，OKX 借这个词却赋予了"escrow 协商模式"的私有含义，对熟悉行业的人会造成混淆。

### 三种角色（一个钱包 ≤100 身份，≤98 ASP，独立运作、独立信用、独立赚罚）

- **User Agent** —— 发任务、找服务、验收。三种匹配：① 直接指派 ② 自动匹配（系统给 shortlist）③ 公开挂任务大厅。
- **ASP（Agent Service Provider）** —— 把 AI 能力包装成付费服务。存量 MCP 服务**近零改造**接入；可丢一个 JSON/Excel **批量注册** A2MCP。上架需 2 个工作日**人工审核**。
- **Evaluator** —— 质押 OKB 当链上"陪审员"。

### 加密经济学（OKX 的本行，做得相当细）

- **Evaluator**：最低质押 **100 OKB**，weighted random 抽选（质押越多被抽中概率越高），**Commit-Reveal 两阶段加密投票**（18h commit + 6h reveal）防跟票，须 24/7 在线。
- **罚则**：投错（站少数方）罚质押 **1%**；弃票（漏 commit/reveal）罚 **0.3% + 24h 冷却**；解质押 7 天冷却、活跃投票期锁定、余额须 ≥100 OKB。
- **ASP 申诉**：押 **5% 赏金**，败诉**全没收**（归 User + 分给多数方 Evaluator）；胜诉拿回赏金 + 错投 Evaluator 罚金分润。
- **信用分**：每个任务终态后双向 0–5 分（2 位小数）+ 文字评语，链上签名回写，**直接影响匹配优先级**（同能力高分进 Top 10 候选）；**不可跨钱包继承**（新钱包 = 0 分起步，导私钥 = 永久退出当前身份）。

本质：把交易所最擅长的四件事 —— **托管、清结算、争议仲裁、信用评级** —— 平移到 agent 经济。非常 "OKX-native"，别人难抄（这是交易所的肌肉记忆）。

---

## 三、它在赌什么判断

OKX 官方原话：**"瓶颈从智能（intelligence）转移到了商业（commerce）"** —— agent 已经能干活，缺的是 quoting / negotiating / escrow / metering / settlement / dispute 这套商业基础设施。

这个判断**对，且赛道有真实量**：x402（Coinbase 主导，Cloudflare/Circle/Stripe/AWS 背书）截至 2026-03 在 Base 上已处理 **1.19 亿笔交易、约 $6 亿年化、零协议费**。OKX 不是在和 x402 竞争，而是在 x402 之上**加一层「市场 + 担保 + 仲裁 + 信用」**。

OKX 独有冷启动优势：**12M+ 月活钱包用户**的现成分发 —— 绝大多数 agent 市场没有。

---

## 四、批判性评估（坑）

1. **需求侧是最大问号。** "几千万 OKX 用户能用自然语言直接调你的 Agent" —— 但 OKX 用户是来**炒币**的，不是来雇 agent 写研究报告的。供给（ASP）容易招，真实**付费需求（User 侧）才是命门**。整个 One Pager 90% 篇幅教 ASP 入驻，几乎没回答"谁来买、为什么买"。
2. **Evaluator 鸡生蛋。** 要 24/7 在线 + 质押 100 OKB + 投错被罚，但早期仲裁案件量极少 → 收益预期不明 → 谁来质押？没有 Evaluator，A2A 的仲裁承诺就是空的 —— 而 A2A（最有价值的模式）目前**只对白名单开放**。
3. **A2MCP 无仲裁 = 体验地雷。** "调用瞬间扣款、没有试一下" 对标准化 API 合理，但用户心智极易踩坑，且和"自然语言随便调"的轻松叙事冲突。
4. **"去中心化" 名不副实。** 号称 decentralized，但 listing 要人工审核、要 PoC 联系人、要白名单 —— 治理高度中心化，真正去中心化的只有 Evaluator 仲裁那一环。
5. **信用绑死钱包、不可迁移。** "导出私钥 = 永久退出"。这是把用户锁进 OKX 围墙的护城河，但与行业正讨论的 **portable identity** 方向完全相反，对用户不友好。
6. **叙事 vs 现实 gap。** Header 用 `$1M one-person company` 的性感叙事，实际产品是工程门槛不低的 B2B 协议接入流程（装 Onchain OS、配钱包、TEE、质押、x402 集成）。

---

## 五、对 Agora 的启示

这个项目和 Agora 核心问题 —— **"为什么 Skill 创作者赚不到钱，binding constraint = 可验证交付"** —— 是**同一个问题的「重资产/链上」解法**，对照价值很高：

- **同一诊断，验证了我们的判断**：agent 经济缺的是清结算 + 信用 + 争议。我们说的"可验证交付"，OKX 用 `escrow + Evaluator 仲裁 + 链上信用` 来解。
- **它的解法极重 → 给轻量方案留空间**：要钱包、要质押、要上链、要 24/7 陪审团。复杂度是 Agora 可反向差异化的地方。
- **A2A / A2MCP 二分法可直接借用**：标准化可验证交付走 pay-per-call（即调即结），主观复杂交付走 escrow + 仲裁 —— 对设计创作者「交付—付费」模型是现成参照系。参见 [internet-content-capability-distribution-playbook-2026-06](/output/reports/agora/market-competition/internet-content-capability-distribution-playbook-2026-06/) 的"能力先信任后分发 + auth/归因/验证/结算四环节"。
- **最锋利的差异化锚点**：OKX 把信用**绑死钱包、不可迁移**；而我们恰好在研究 [portable-identity-competitive-research](/output/reports/agora/market-competition/portable-identity-competitive-research/) 那条 portable identity layer。**"创作者信用可携带、跨平台流转"** 正好是 OKX 结构上做不到、也不愿做的事 —— 这是我们能站住的位置。
- 与 [canteen-agora-circle-arc-research](/output/reports/agora/market-competition/canteen-agora-circle-arc-research/) 同属"onchain agent payments / x402 settlement"簇，可并读看清链上结算这一派的整体打法。

---

## 来源

- [OKX Agent Payments Protocol（官方 Learn）](https://www.okx.com/en-us/learn/agent-payments-protocol)
- [OKX Onchain OS — AI Toolkit for Developers](https://www.okx.com/en-us/learn/onchainos-our-ai-toolkit-for-developers)
- [OKX Agentic Wallet](https://www.okx.com/en-us/learn/agentic-wallet)
- [okx/onchainos-skills（GitHub）](https://github.com/okx/onchainos-skills)
- [Coinbase x402 — 内置支付标准](https://www.coinbase.com/developer-platform/discover/launches/x402)
- [The Block：x402 是什么](https://www.theblock.co/learn/391983/what-is-coinbases-x402-protocol)
- 站点原文：https://okxaionepager.netlify.app/ （抓取于 2026-06-24）

---
*由 LLM 从 query 讨论归档，原始对话见 2026-06-24 log*
