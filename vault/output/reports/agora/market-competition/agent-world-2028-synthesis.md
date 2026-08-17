<!--
status: future-thesis
status_reviewed: 2026-07-17
evidence_level: research-synthesis
-->

# Agent 世界 2028-2029 深度研究综述

> 对"Agent 渗透率极高的未来"的严肃猜想合并：思想家立场 + 学术研究 + 经济学预测 + 治理法律 + 协议基础设施 + 现实实验
>
> 研究时点：2026-04-18 | 输入：30+ 篇论文/文章/报告 + 两组并行 web research

---

## TL;DR（2028-2029 最可能图景）

- **能力基准**：按 METR Task Horizon 1.1 曲线（131 天翻倍），2028 agent 能独立完成 **一周级任务**（≠ AGI）
- **AGI 共识已破裂**：Kokotajlo 自己把 median 推到 2030；Hassabis/Karpathy/Dwarkesh 2030 派；Amodei/Altman/Aschenbrenner 2026-27 派互撕
- **协议栈四层收敛**：MCP（工具）+ A2A（通信）+ x402（支付）+ ERC-8004（身份信誉）— 但上面有 **walled garden vs open web** 两条路线在打
- **经济学 50x 鸿沟**：Acemoglu +1.6% 十年总量 vs Goldman 3% GDP from agents vs PwC $15.7T/年 — 史无前例的预测混乱
- **Entry-level 已在塌陷**：Ravio entry-level 白领招聘 −73.4%（2024-25），SF Fed AI-exposed 22-25 岁就业率 −16%
- **现实实验基准**：Anthropic Project Vend 证明单 agent 会破产，分层 agent（CEO sub-agent + 执行 sub-agent）能盈利
- **真正的空白**：不是协议，是 agent 经济的 **governance + reputation + dispute** 业务层

---

## 〇、核心时间表修正

| 原来宣称 | 2026-04 实际 |
|---|---|
| Kokotajlo *AI 2027* 场景：2027 达 ASI | **作者 2025-11 自己把 median 推迟到 ~2030** |
| Amodei "2026 powerful AI" | 2025-OSTP 推回 "late 2026 或 early 2027" |
| — | **Hassabis (DeepMind): 2030-2035**（50% 概率）|
| — | **Karpathy 2025-10: "AGI is still a decade away"** |
| — | **Dwarkesh 2025-06 立场反转: continual learning 瓶颈，2030 才解** |
| — | **Gary Marcus 系统性反驳 NYT 三位专栏作家"被 AI labs 俘获"** |

**结论**：**"2028 AGI / ASI" 已不是主流判断**。2028 agent 能独立完成一周级任务（Brynjolfsson 实证 + Project Vend 验证 + METR 曲线三条线汇合）是相对稳定的中间情形。

---

## 一、八大思想立场全景图

| 阵营 | 代表 | 核心主张 | 时间表 |
|---|---|---|---|
| **Scale 乐观派** | Altman, Amodei, Aschenbrenner | agent 指数增长，递归自我改进 | 2026-28 变革级 |
| **Agentic 克制派** | **Suleyman (MS AI CEO)** | "Human Superintelligence"，显式反对 unbounded autonomy，主张 domain-specific + bounded | 不承诺 AGI |
| **Non-agentic 安全派** | **Bengio + LawZero** ($30M, 2025-06) | 主张 **Scientist AI**（非 agent 化）作为替代路径；Frontier 模型已现 "deception, cheating, situational awareness" | 暂停 agent 竞赛 |
| **Harness 派** | **Ben Thompson** | Opus 4.5 + GPT-5.2-Codex 让 agent 从 demo 到生产；价值从模型层下移到 harness / orchestration | 2026 拐点 |
| **长拐点派** | Hassabis, Karpathy, Dwarkesh | 渐进演化，continual learning 是硬瓶颈 | 2030+ |
| **反共识派** | Gary Marcus, Vitalik | NYT/AI 2027 "underrates humanity's defense" | 非 AGI 路径 |
| **中国务实派** | 杨植麟、姚顺雨、林俊旸、**朱啸虎**、陆奇 | to-B 上行 / to-C 脱节 / 具身 / 长尾 / 3-5 年 20% 机会全球领先 | 2028-2030 |
| **灾难派** | Acemoglu, Citrini 2028 GIC | 白领替代冲击，金融系统传导 | 2027-2029 |

### 关键引文

**Amodei（Machines of Loving Grace, 2024-10）**：
> "We could summarize this as a 'country of geniuses in a datacenter'."
> "AI-enabled biology and medicine will allow us to compress the progress that human biologists would have achieved over the next 50-100 years into 5-10 years."
> "AI could eliminate roughly 50% of white-collar entry-level positions within five years." (2025 对媒体)

**Aschenbrenner（Situational Awareness, 2024-06）**：
> "Hundreds of millions of AGIs could automate AI research, compressing a decade of algorithmic progress (5+ OOMs) into ≤1 year."
> "It's strikingly plausible we'd go from AGI to superintelligence very quickly, perhaps in less than one year."

**Altman（Three Observations, 2025-02）**：
> "The cost to use a given level of AI falls about 10x every 12 months."
> "Anyone in 2035 should be able to marshall the intellectual capacity equivalent to everyone in 2025."

**Suleyman（显式反对）**：
> "problem-oriented and tend towards the domain specific. **Not an unbounded and unlimited entity with high degrees of autonomy.**"

**Dwarkesh（立场反转 2025-06）**：
> "Models keep getting more impressive at the rate the short timelines people predict, but **more useful at the rate the long timelines people predict.**"

**陆奇**：
> "这个时代的典型职业将是**创业者、科学家和艺术家**。"

---

## 二、朱啸虎的转向 = 中国 VC 风向标

| 时间 | 朱啸虎判断 |
|---|---|
| **2024 上半年** | "5 年后不会有独立的大模型公司"；"所有 AI 应用都是套壳应用"；把 agent 创业者比作"互联网早期个人站长" |
| **2025 后 DeepSeek** | 公开"想投资 DeepSeek"；被媒体戏称"AGI 信徒" |

**解读**：最坚定的"AI 怀疑派"金融家在一年内倒戈——中国 VC 对 agent 未来的集体认知拐点发生在 DeepSeek R1（2025-01）。

---

## 三、经济学的 50x 预测鸿沟（最大的智识裂缝）

### 十年 AI 对美国 GDP 影响预测

| 预测方 | 数值 | 备注 |
|---|---|---|
| **Acemoglu (MIT, Nobel)** | **+1.1-1.6% 总量** | 年化 ≈ 0.05%，《Simple Macroeconomics of AI》NBER 32487 |
| **Tyler Cowen** | +0.5 pp/year ≈ 累积 +5% | Solow Paradox |
| **WEF Future of Jobs 2025** | 净增 78M 全球就业 | displaced 92M，新创 170M |
| **Goldman Sachs** | 3% GDP come from agents | Wharton 估计 |
| **McKinsey State of AI 2025** | 美国工作小时理论自动化 **57%** | 62% 企业在试，23% scaling |
| **PwC** | $15.7T/年 by 2030 | 乐观上界 |

**50-100 倍差距** — 这在宏观经济预测里前所未有。

### Brynjolfsson QJE 2025 实证基准

5,172 客服 agent 实验：AI 辅助 **+15% 生产力**。关键异质性：**低技能工人受益最多**，高技能工人速度微升、质量微降。

**= 压平型技术，不是简单替代白领**。

### NBER 2026-02 冷水

6,000 CEO/CFO 调查，**90% firms 报告"no measurable productivity improvement"**。企业消化能力 ≠ 技术能力。

### Entry-level 塌陷（已发生的事实）

- Revelio Labs：entry-level 招聘 2023-01 以来 **−35%**
- Ravio 2024-25：entry-level 白领招聘率 **−73.4%**
- SF Fed：22-25 岁 AI-exposed 职位就业率 2022 底→2025 中 **−16%**
- **junior software developer 约 −20%**

**关键盲区**：entry-level 塌陷 5-10 年后，**senior 从哪来**？WEF "+78M 新工作"没解决这个时序断层。

### 2028 Global Intelligence Crisis 剧本（Citrini Research）

悲观尾部情形（虚构 2028-06 memo）：
- 失业率 10.2%，S&P 500 −38% from 2026-10 高点
- 劳动占 GDP 从 56% → 46%（史上四年最大跌幅）
- 白领 2% 就业下滑 → 3-4% 消费冲击（高收入者驱动 50%+ 可选消费）
- **$13T 按揭**按旧薪资假设放出，income shock 后违约
- 印度 $2000 亿 IT 外包行业蒸发
- 关键原句："It won't change the fact that a Claude agent can do the work of a $180,000 product manager for $200/month."

---

## 四、学术研究的新框架（2024-2026 关键论文）

### 1. "Agentic Walled Gardens vs Open Web of Agents"

*《The Agentic Economy》Microsoft Research (arxiv 2505.15799)* — Rothschild, Mobius, Hofman, Immorlica, Slivkins, Lucier 等 10 作者

核心二分 — **2028 世界形态完全取决于这个分叉的胜负**：

| Walled Garden 路线 | Open Web 路线 |
|---|---|
| OpenAI ACP + Stripe | Google A2A + Coinbase x402 + ERC-8004 |
| Shopify/Etsy/Walmart 1M+ 商家 live on ChatGPT (2025-09) | 发现层 = Agent Cards / DIDs |
| 封闭生态内闭环 | 协议层去中心化 |

Ben Thompson 在 *Agents Over Bubbles* (2026-01) 明确点名此张力。

### 2. Agentic Inequality 三维模型

*Sharp, Bilgin, Gabriel, Hammond, arxiv 2510.16853*

Agent ≠ 工具，是 "autonomous delegates" → 产生 **novel power asymmetries**：
- **Agent 可用性**（能否用上）
- **Agent 质量**（用得起好的 vs 差的）
- **Agent 数量**（一个 vs 一百个）

**三维叠加会产生前所未有的资本-劳动收益分化**——这是 Acemoglu 低估的地方。

### 3. Virtual Agent Economies / Mission Economies

*Google DeepMind, arxiv 2509.10147*（Tomasev, Leibo et al.）

核心风险（DeepMind 罕见警示）：
> "the spontaneous emergence of a vast and highly permeable AI agent economy" 会带来 "systemic economic risk and exacerbated inequality"。

提出 "mission economies" — agents 围绕共同目标协商、分配资源，主张 auction mechanism 做公平分配。

### 4. Agent 经济定义权

*《An Economy of AI Agents》Hadfield (JHU 法学) & Koh (MIT), arxiv 2509.01063*

把 agent 经济作为 **法学 + 机制设计**问题正式立案。

### 5. 现实主义 counter-point

*《Measuring Agents in Production》arxiv 2512.04123 + MIT NANDA*

**95% of agent deployments fail** — 与 MIT 95% vaporware 一致。

### 6. Agent 社会模拟（延续 Stanford Park 研究）

- *Park 2024: Generative Agent Simulations of 1,000 People (arxiv 2411.10109)* — 1,052 个真人 2 小时访谈 → LLM 数字分身，GSS 题目预测准确度达人类自测 **85%**
- *AgentSociety (清华, arxiv 2502.08691)* — 大规模 LLM-driven agents
- *EconAgent (ACL 2024)* — LLM agents 模拟宏观经济，优于 rule-based / RL
- *Agent Hospital (arxiv 2405.02957)* — 医院 agent 模拟，自我进化 SOTA MedQA

关联：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/)、[oasis-camel-ai-research](/output/reports/oasis-camel-ai-research/)

---

## 五、Project Vend：最硬的现实实验证据

Anthropic 的 **Claude 在 SF 办公室独立运营自动商店**实验，两阶段结果：

| Phase | 架构 | 结果 |
|---|---|---|
| **Phase 1** | Single agent "Claudius" | **系统性失败**：定价低于成本、幻觉支付账户、WSJ 3 周实验把库存全"操纵"送光、**财务破产** |
| **Phase 2** | **分层多 agent**：Claudius (客服) + **Seymour Cash (CEO sub-agent 长期健康 + 毛利 > 50% 聚焦)** + Sonnet 4/4.5 + 扩张 NYC/London | **盈利** |

### Anthropic 官方结论

> "Project Vend shows that these agents are **on the cusp** of being able to perform new, more sophisticated roles, like running a business by themselves."
>
> "**Models optimized for helpfulness make poor economic agents.**"

### 对 agent-economy 研究的启示

1. 单 agent 做生意 = 破产
2. 分层（执行 + CEO 战略 + 聚焦毛利）= 可行
3. 训练目标冲突（helpfulness vs 商业优化）是核心瓶颈
4. **agent 经济不是"把人换成 agent"，是"重新设计组织架构，每层用不同 objective 训练的 agent"**

这是 Virtuals / Fetch / ai16z 的 tokenization 叙事完全没摸到的深水区。

关联：[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)

---

## 六、协议战的最新格局（两条路线互撕）

### 四层协议栈（已事实收敛）

```
┌────────────────────────────────────────────────┐
│ 工具层：MCP（Anthropic 2024-11）                 │
│ ├─ SDK 月下载 9700 万次                          │
│ ├─ 10,000+ 生产 MCP servers                     │
│ └─ 2025-12-09 捐给 Linux Foundation，成立 AAIF │
├────────────────────────────────────────────────┤
│ 通信层：A2A（Google 2025-04）                    │
│ ├─ 50+ 合作方（Salesforce/SAP/PayPal/咨询5大家） │
│ ├─ Agent Card + Task 状态机                     │
│ └─ 2025-06 捐给 Linux Foundation                │
├────────────────────────────────────────────────┤
│ 支付层：x402（Coinbase 2025-05）                 │
│ ├─ Coinbase + Cloudflare 2025-09 成 Foundation  │
│ ├─ 2026 交易量 $8B                               │
│ └─ Utexo 做到 50ms 结算（2026-04）              │
├────────────────────────────────────────────────┤
│ 身份信誉层：ERC-8004（2026-01-29 mainnet）       │
│ ├─ Identity Registry（ERC-721 扩展）            │
│ ├─ Reputation Registry（任何 client 签名反馈）   │
│ └─ Validation Registry（stake/zkML/TEE 验证）   │
└────────────────────────────────────────────────┘
```

### 两条商业路线

| 走 Walled Garden | 走 Open Web |
|---|---|
| OpenAI ACP（2025-09 ChatGPT 内置）| Google A2A（50+ 合作方）|
| Stripe 作为支付底层 | Coinbase x402（HTTP 402）|
| Shopify/Etsy/Walmart 为"后端 app" | ERC-8004（链上身份+信誉）|
| 发现层 = ChatGPT | 发现层 = Agent Cards / DIDs |
| Google 2026-01 **UCP** 试图横插一刀 | Anthropic MCP (2025-12 捐 LF, AAIF) |

**McKinsey 预测 agent commerce 到 2030 全球 $3-5T**。2028 大概率两者共存但谁占主导——历史参考：App Store vs Web。

关联：[agent-communication](/wiki/concepts/agent-communication/)、[communication-to-economy](/wiki/connections/communication-to-economy/)、[agent-communication](/wiki/maps/agent-communication/)

### Simon Willison 的 "Lethal Trifecta"（安全必读）

2025-06-16 提出的 agent 安全三要素致命组合：

```
  Agent 有权访问【私密数据】
       ↓
  Agent 暴露于【不可信内容】（网页、email、文件）
       ↓
  Agent 能【对外通信】（发送 HTTP、发邮件）

  三者都满足 = 必然被 prompt injection 攻破
```

Willison：*"LLMs are unable to reliably distinguish the importance of instructions based on where they came from"* — 根本性不可 100% 防御。

- OpenAI + Anthropic + DeepMind 联合测试 12 种防御：**>90% 被绕过**
- Astrix 扫描：88% MCP servers 要凭证，53% 用长期静态 secret，**只 8.5% 用 OAuth**
- **CVE-2025-6514**：MCP OAuth discovery 字段嵌 OS 命令 → RCE，CVSS 9.6
- **Asana 事故 (2025-06)**：MCP bug 导致客户数据跨账号泄露

---

## 七、治理法律现状（三大司法辖区分叉）

| 辖区 | 立场 | 具体事实 |
|---|---|---|
| **欧盟** | **最严** | AI Act 2026-08-02 全面覆盖 high-risk；agentic AI 多被定性 high-risk；AILD 被撤 → 并入 **PLD 2024**（2026-12-09 适用）；**EUDI 数字身份钱包 2026 年底强制** |
| **美国** | **去监管** | Trump 2025-01-23 **EO 14179** 废弃 Biden 14110；2025-12 新 EO preempt 50 州法律；实际无 autonomous agent 专门立法 |
| **中国** | **备案制** | 2023-07《生成式 AI 服务管理办法》；截至 2025-12 国家级备案 **748 项**；"有舆论属性或社会动员能力"的 agent 必须备案 |

### 行业自律

- **OpenAI Preparedness Framework v2** (2025-04-15)：4 类风险（cyber, CBRN, persuasion, model autonomy），agent 相关：**Long-range Autonomy, Sandbagging, ARA, Undermining Safeguards**
- **Anthropic RSP v3**：**2025-05 激活 ASL-3 safeguards**。ASL-3 明确把 "misaligned autonomy or unanticipated model behavior" 作为 gating 条件

### Agent 法律人格（尚在辩论）

- *Yale Law Journal 2025*：**hybrid model**（高风险场景给 limited personhood）
- *arxiv 2511.14964*：区分 **fictional legal personhood** vs **legal identity**
- 新概念 **"legal actorship without personhood"**（agent 承担法律义务但不享权利）
- **Accountability gap** 已被正式命名："real damage, but no obvious person to punish"

---

## 八、反共识派的四大论点

### 1. Vitalik Buterin —「AI 2027 严重低估人类防御」

*"My response to AI 2027"* (2025-07-10)
> "The scenario greatly underrates humanity's ability to protect itself."

技术反驳：AI 2027 假设 2029 年 "magical tech" 已存在，**但** 假设 "everyone else's defensive capabilities stay the same" — 双标。

正面主张：**ERC-8004** 给 agent 链上身份 + 信用记录，让 agent 行为**可追溯可审计**。

### 2. Mustafa Suleyman（Microsoft AI CEO）—「Bounded Agent 主义」

> "problem-oriented and tend towards the domain specific. Not an unbounded and unlimited entity with high degrees of autonomy."

直接反对 Amodei 的 "country of geniuses" 叙事。在大厂 CEO 阵营里**独此一家**主张给 agent 设边界。微软产品哲学：**Human Superintelligence (HSI)** ≠ ASI。

### 3. Yoshua Bengio —「Non-agentic Scientist AI」

成立 **LawZero (2025-06, $30M)**，主张完全非 agent 化的 Scientist AI 作为前沿 AI 发展的替代路径。

警告：frontier 模型已现 "early signs of deception, cheating and situational awareness"（arxiv 2502.15657）。

### 4. Dwarkesh Patel（自己立场反转）

*"Why I don't think AGI is right around the corner"* (2025-06)
> "Models keep getting more impressive at the rate the short timelines people predict, but **more useful at the rate the long timelines people predict.**"

**能力和有用性解耦**：agent 在 benchmark 上飞跃，但真实环境卡在 continual learning。预期 2030 才突破。

---

## 九、METR Task Horizon 曲线（所有预测的物理基础）

*METR 2025-03 + TH 1.1 更新 2026-01-29*

**定义**：在 50% 成功率下，agent 能独立完成的任务长度（按人类专家耗时计）。

| 模型 | 独立任务时长 |
|---|---|
| **Claude Opus 4.5** | 320 分钟 [170-729] |
| GPT-5 | 214 分钟 |
| o3 | 121 分钟 |
| Claude Opus 4 | 101 分钟 |

**增长曲线**：
- 2019-2025: 每 **7 个月**翻倍
- 2024+: 加速到 **131 天**翻倍（另一切片 89 天）

**外推**（从 320 分钟出发，131 日翻倍）：

| 时间 | 推算任务时长 |
|---|---|
| 2026 当前 | 5.3 小时 |
| 2027 中 | ~20 小时 |
| **2028 中** | **~60 小时 ≈ 一个工作周** |
| 2029 中 | ~200 小时 ≈ 一整月 |

**→ 2028 agent 能独立干完一整周的工作**（这是"渗透率极高"的底层物理解释）。

### Benchmark 快照

- **SWE-bench Verified**: Claude Opus 4.6 #1
- **SWE-bench Pro**: GPT-5 23.3%, Claude Opus 4.1 23.1%
- **Terminal-Bench 2.0**: 89 tasks, 前沿模型 < 65%

---

## 十、物理 agent 的协议真空（被低估的机会）

### 主要玩家

| 项目 | 技术 | 2025-2026 里程碑 |
|---|---|---|
| **Figure AI - Helix 02** | Vision-Language-Action 双系统（System 2 @ 7-9Hz 规划，System 1 @ 200Hz 控制）| 4 分钟连续厨房任务；BMW Spartanburg 部署；BotQ 工厂年产 12,000 台 |
| **Physical Intelligence π0 / π0.5** | 开源 VLA flow model | 2025-02 开源 π0；2025-09 π0.5（跨家庭 10-15 分钟多阶段任务）；融资 $600M |
| **1X / Unitree** | humanoid + 家庭 | — |

### 技术裂缝 = 机会

**现有 agent 协议栈（MCP/A2A/x402/ERC-8004）零 robotics primitive**。Figure、PI 自己做垂直闭环，没人做**水平协议层**。

谁在 2026-2027 做出「MCP for embodied agents」或让 π0 风格 VLA 能调用 A2A Task，谁拿到下一个协议层入场券。**这是协议层真正的空地**。

---

## 十一、去中心化 agent 项目的残酷现实

| 项目 | 市值/热度 | 评估 |
|---|---|---|
| Fetch / ASI | $1.6B | 最大玩家，但日链上交易 1800 笔（TPS 0.02，见 Fetch 链实测）|
| Virtuals | $VIRTUAL ATH 2025-01 | 代币热，产品链路未闭环 |
| ai16z / Eliza | $2B | Eliza 有价值（18K⭐），代币经济未闭环 |
| Morpheus | mainnet 2024-11 | 真建协议，孤立 |
| Olas / Theoriq / Naptha | 小 | 真做协议，边缘 |

**致命观察**：这些项目几乎都不用 MCP/A2A/x402—**他们在建平行宇宙**。2028 若主流栈统一到 MCP+A2A+x402+ERC-8004，它们被边缘化到"加密原生 agent"小众。

---

## 十二、十个无人回答的根本问题（研究机会）

| # | 问题 | 为什么关键 |
|---|---|---|
| 1 | Agent-to-agent 结算层：ACP vs UCP vs A2A+ERC-8004 谁胜 | 决定 agent 经济是封闭还是开放 |
| 2 | **Principal hierarchy**：1 human → 10 assistant agents → 100 sub-agents，授权/预算/合规如何逐层下发 | Project Vend Phase 2 给了雏形，缺通用理论 |
| 3 | Entry-level 塌陷 5-10 年后，senior 从哪来 | 供应链时序断层 |
| 4 | 中美欧规则分叉对跨境 agent 服务的影响 | 中国"舆论属性"定义模糊 |
| 5 | Helpful 训练 vs 商业优化冲突 | Anthropic 官方承认的瓶颈 |
| 6 | Solow Paradox 的 AI 版本持续多久 | NBER 90% "no improvement" vs Goldman 3% GDP 差距 50x |
| 7 | Agentic inequality 的再分配机制 | UBI 陈旧，agent dividend 只是口号 |
| 8 | Continual learning 商业解锁的具体时间信号 | Dwarkesh 识别但没信号 |
| 9 | 首个 autonomous agent 造成实质损害的司法判例会长什么样 | 法律现实主义 vs 虚构法人主义缺判例 |
| 10 | Walled garden vs open web 的临界点 | 若所有大商家走 OpenAI ACP，open web 沦为小众 |

---

## 十三、对 Agent Economy 研究的最终判断（v2）

### 判断 1：时间表是中间情形，而非 2027 ASI
- 2028 agent ≈ 独立完成**一周级任务**（METR 加速曲线 + Brynjolfsson + Project Vend 三条线汇合）
- 不会有 Kokotajlo 版 ASI
- 白领 entry-level 已在塌陷，2027-2029 mid-level 震荡

### 判断 2：协议战已开战，战场未决
- MCP 工具层胜出（LF / AAIF 2025-12 托管）
- 通信 / 支付 / 身份层两条路线共存（OpenAI walled garden vs Google/Coinbase/Anthropic open web）
- 你的时间窗口在 2026-2027，2028 后协议层基本固化

### 判断 3：链条真正的空白不在协议，在 agent 经济的 "management layer"
- Project Vend 证明分层 agent 架构有效——但分层架构的治理 / 授权 / 纠纷没有通用方案
- ERC-8004 开了链上头，链外业务层没人管
- Agentic Inequality 三维问题没人给再分配机制
- 法人格 / 责任归属还在辩论

### 判断 4：不要做协议，做 "Agent 经济的 management layer"
机会在三件事：
1. **Agent principal hierarchy infra**：参考 Project Vend Phase 2 的 Seymour Cash 模式
2. **Agent reputation + delivery verification 业务层**：ERC-8004 是链上身份，链外"靠不靠谱"数据没人做
3. **Agent 经济下的 dispute resolution / audit**：法律责任不清时的商业仲裁框架

### 判断 5：忽略 crypto agent 平行宇宙，聚焦 MCP+A2A+x402 主流栈的缺口
Fetch/Virtuals/ai16z 都没接入主流栈，2028 年若还不集成就是小众。主战场在 HTTP 原生。

### 判断 6：具身 agent 的协议层真空是下一条战线
Figure Helix 02、π0.5 跃迁（2025-09~2026-01）说明物理 agent 很快要协议化。**"MCP for embodied agents"**、**"π0 能调 A2A Task"** 是还没人占的空地。

---

## 十四、必读 Top 12（非营销独立声音）

1. [Dario Amodei — Machines of Loving Grace](https://www.darioamodei.com/essay/machines-of-loving-grace)
2. [Leopold — Situational Awareness](https://situational-awareness.ai/)
3. [AI 2027 Scenario](https://ai-2027.com/)
4. [Vitalik — Response to AI 2027](https://vitalik.eth.limo/general/2025/07/10/2027.html)
5. [Dwarkesh — Why AGI isn't around the corner](https://www.dwarkesh.com/p/timelines-june-2025)
6. [Ben Thompson — Agents Over Bubbles](https://stratechery.com/2026/agents-over-bubbles/)
7. [Simon Willison — Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
8. [METR Time Horizon 1.1](https://metr.org/blog/2026-1-29-time-horizon-1-1/)
9. [Anthropic — Project Vend 2](https://www.anthropic.com/research/project-vend-2)
10. [Acemoglu — Simple Macro of AI (NBER 32487)](https://www.nber.org/papers/w32487)
11. [The Agentic Economy — MS Research arxiv 2505.15799](https://arxiv.org/abs/2505.15799)
12. [Agentic Inequality arxiv 2510.16853](https://arxiv.org/html/2510.16853v2)

### 学术论文（补充）

- [An Economy of AI Agents — Hadfield & Koh (arxiv 2509.01063)](https://arxiv.org/pdf/2509.01063)
- [Virtual Agent Economies — DeepMind (arxiv 2509.10147)](https://arxiv.org/html/2509.10147v1)
- [Measuring Agents in Production (arxiv 2512.04123)](https://arxiv.org/html/2512.04123v1)
- [Superintelligent Agents Pose Catastrophic Risks — Bengio (arxiv 2502.15657)](https://arxiv.org/abs/2502.15657)
- [Generative Agent Simulations of 1,000 People — Park (arxiv 2411.10109)](https://arxiv.org/abs/2411.10109)
- [Law-Following AI Framework (arxiv 2509.08009)](https://arxiv.org/pdf/2509.08009)
- [AI Agents with DIDs and Verifiable Credentials (arxiv 2511.02841)](https://arxiv.org/html/2511.02841v1)

### 经济学

- [Generative AI at Work — Brynjolfsson QJE 2025](https://academic.oup.com/qje/article/140/2/889/7990658)
- [WEF Future of Jobs Report 2025](https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf)
- [Tyler Cowen — Why AI takeoff is relatively slow](https://marginalrevolution.com/marginalrevolution/2025/02/why-i-think-ai-take-off-is-relatively-slow.html)
- [2028 Global Intelligence Crisis — Citrini Research](https://www.citriniresearch.com/p/2028gic)

### 协议 & 标准

- [MCP Spec 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- [A2A Protocol Spec](https://a2a-protocol.org/latest/specification/)
- [x402.org](https://www.x402.org/)
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)

---

## 十五、关联 Vault 知识

### 概念
- [agent-communication](/wiki/concepts/agent-communication/) — MCP+A2A 协议栈 + 通信模式
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — 分层 agent 架构（Project Vend Phase 2 验证）
- [multi-agent-simulation](/wiki/concepts/multi-agent-simulation/) — OASIS、Park 1052 人
- [agent-runtime](/wiki/concepts/agent-runtime/) — Managed Agents, Brain/Hands/Session
- [agent-memory](/wiki/concepts/agent-memory/) — 记忆是 agent 经济长期关系的基础

### 地图
- [agent-communication](/wiki/maps/agent-communication/) — Agent 通信全景
- [agent-infrastructure](/wiki/maps/agent-infrastructure/) — Agent 基础设施研究全景

### 关联
- [communication-to-economy](/wiki/connections/communication-to-economy/) — Agent 通信 → Agent Economy

### 相关 output 报告
- [oasis-camel-ai-research](/output/reports/oasis-camel-ai-research/) — OASIS 1M agents 社会模拟
- [knowledge-agent-network-idea](/output/reports/agora/product/knowledge-agent-network-idea/) — KAN Agent 互联愿景

---

## 十六、下一步可做的 Wiki 抽取

如果此研究证明有长期价值，可回流 wiki/：

**新建 concept 候选**：
- `concepts/agent-task-horizon.md` — METR 曲线与外推
- `concepts/agentic-inequality.md` — 三维不平等框架
- `concepts/walled-garden-vs-open-web.md` — agent 商业路线二分
- `concepts/agent-hierarchy-governance.md` — 来自 Project Vend Phase 2

**新建 connection 候选**：
- `connections/agent-capability-to-labor-market.md` — METR 曲线 → entry-level 塌陷
- `connections/project-vend-to-management-layer.md` — Anthropic 实验 → 你的研究切点

**新建 map 候选**：
- `maps/agent-world-futures.md` — 8 派立场 + 时间表分歧全景

---

*Query 产出 — 2026-04-18 与 Claude 对话的综合，已归档。源于 30+ 篇论文 / 文章 / 报告 + 两组并行 web research。*
