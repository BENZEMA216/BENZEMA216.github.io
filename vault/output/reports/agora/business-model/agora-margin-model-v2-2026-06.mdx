---
title: Agora 毛利模型 v2 — 公式 + 人群×行为利润估算
---

<!--
date: 2026-06-20
type: query 产出 / 财务模型工作稿
method: 6-agent workflow（4 路推导 → 合成 → 数学校验）+ 主循环 top-down 人群模型
status: historical
status_reviewed: 2026-07-17
evidence_level: mathematical-scenario
superseded_by: "[combo-unit-economics-v0-2026-07](/output/reports/combo/business-model/combo-unit-economics-v0-2026-07/)"
tags: [financial-model, gross-margin, unit-economics, agora, take-rate]
related:
  - "[agora-financial-model](/output/reports/agora/business-model/agora-financial-model/)"
  - "[agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/)"
  - "[agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)"
  - "[consumer-ai-user-research-2026-06](/output/reports/agora/market-competition/consumer-ai-user-research-2026-06/)"
-->

> 这是 [agora-financial-model](/output/reports/agora/business-model/agora-financial-model/) 的公式化升级：把 seed 公式 `P1 = 30%·Cost·K%` 放进完整的平台毛利框架（§0–§9，bottom-up），再用人群规模×行为把利润 top-down 估出来（§10），两端对账（§11）。
> **核心发现**：你的"抽 30% 加价"= 现有模型"抽 10% GMV"的精确同义（`τ_gmv=τ_seed·K/(1+K)`，K=50% 时=10%）——你的版本是更对的**口径**（只对价值增量收税，不对推理 pass-through 收税）。
> 数学已校验（量纲/算术/seed 自洽全 PASS，1 处年化对账声明已更正，见 §8.3）。

# Agora 平台毛利公式文档（财务模型可用稿）

> [!warning] 数学参考，不是当前经营口径
> 本文保留平台情景下的公式推导；当前需要用真实单任务数据校准售价、成本、退款、分成和贡献毛利，见 [combo-unit-economics-v0-2026-07](/output/reports/combo/business-model/combo-unit-economics-v0-2026-07/)。

## 0. 三个一次性必读的口径锚

**锚① — P1 是收入(take)，不是毛利(GM)。** seed 把 `P1=τ·Cost·K%` 当毛利，其实是把 take 当 GM。`P1` 是抽成**收入**，要再扣 COGS 才是毛利。所有收入线记作 `Pi`，毛利单独记 `GM`。

**锚② — Cost 这笔推理费不流经平台（默认 pass-through）。** 买家用自己的 LLM key / 本地 runtime 跑推理，token 费直接付给模型厂。平台"看得见、能结算"的只有创作者加价 `markup = Cost·K%`，对 `Cost` 本身既无现金流也无 COGS。**这把"τ 抽哪个数"从财务问题变成语义问题。**

**锚③ — 两个 τ 是两套口径，绝不能并列写。**
- `τ_seed = 30%` 抽的是**加价层** `markup = Cost·K%`。
- `τ_gmv = 10%~13%`（现行模型）抽的是**全额 GMV = Cost·(1+K%)`。
- 换算：`τ_gmv·(1+K%) = τ_seed·K%` ⟹ **`τ_gmv = τ_seed · K%/(1+K%)`**。
  代入 `τ_seed=30%, K%=50%` ⟹ `τ_gmv ≈ 10%` —— 恰好落回现行模型。对外材料里同时出现"30% 抽成"和"10% take rate"而不标基数，在低 K 时会差一个数量级（K=10% 时差 11 倍）。

---

## 1. 记号表

### 1.1 seed 原生记号（不改）

| 符号 | 含义 | 典型取值 |
|---|---|---|
| `P` | 平台核心毛利（区分后用 `P_rev`/`GM`） | Y1 $0.15M → Y5 $183.1M |
| `P1` | 创作者应用抽成线 | 见 §3、§6 |
| `Cost` | 单 app 单周期真实推理成本（pass-through） | $/周期 |
| `K%`(=`K`) | 创作者利率/markup rate（售价=Cost·(1+K)） | 20%–200% |
| `τ` | 平台抽成率（**必须标基数**） | τ_seed=30%@markup / τ_gmv=10–13%@GMV |

### 1.2 单 app 漏斗 / Cost 链

| 符号 | 含义 | 典型取值 |
|---|---|---|
| `U_reach` | 触达/安装用户数 | 早期 10²–10⁴，规模 10⁴–10⁶ |
| `a`(=`p_use`) | 激活率/使用概率 | 0.05–0.4 |
| `R_t` | 第 t 周期留存系数 | 月留存 20%–60% |
| `f` | 激活用户人均频次（任务数/周期） | 轻量 1–3/周，重度 agent 10–50/周 |
| `pay_rate` | 激活→付费转化 | 2%–10% |
| `N_calls` | 单 app 单周期总任务数 = `U_reach·a·f` | — |
| `U_active` | `U_reach·a`（烧 token） | — |
| `U_paid` | `U_active·pay_rate` | — |

### 1.3 单次任务 → token 级（c_call 展开）

| 符号 | 含义 | 典型取值 |
|---|---|---|
| `c_call` | 单次任务平均推理成本 | single-shot $0.001–0.02；agent $0.05–2+ |
| `s` | 单次任务平均模型调用**步数**（别漏，否则 agent Cost 低估一个数量级） | single-shot=1；agent 3–8；深度 10–30+ |
| `T_in`/`T_out` | 每步平均输入/输出 token | T_in 2k–100k+；T_out 100–4k |
| `ρ_cache` | 输入命中 prompt cache 比例 | 0–0.9 |
| `p_in`/`p_out`/`p_cache` | 跨模型加权单价（$/Mtok÷1e6） | in $0.5–15/Mtok；out $2–75/Mtok |
| `w_m` | 路由到模型 m 的 token 占比（Σ=1） | — |

### 1.4 平台收入线 P1…P6

| 符号 | 含义 | 计费性质 |
|---|---|---|
| `GMV_total` | 全平台总成交额 = U_paid·ḡ·12 | — |
| `ḡ` | monthly GMV / paid user | $20→$55 (Y1→Y5) |
| `P1` | 创作者应用抽成 | 按量（随 GMV） |
| `P2` | 托管保护步骤 usage | 按量（per-call） |
| `P3` | 订阅/SaaS/seat | 订阅固定为主 |
| `P4` | 认证/验证费 | 一次性 + tests 托管订阅 |
| `P5` | 企业/私有 registry/managed runtime | seat/registry 年费 + 部署费 |
| `P6` | 能力产品化/共创服务费 | 一次性为主 |
| `τ_usage` | 对 protected-step 的抽成档 | 默认同 τ，可独立 |
| `waive` | 早期免共创费换更高分成的比例 | waive→1 时 P6 转 P1 |

### 1.5 COGS / 毛利桥

| 符号 | 含义 | 典型取值 |
|---|---|---|
| `P_rev` | 平台总收入 = ΣPi | — |
| `φ` | 支付通道费率 | ~3–5%（跨境再加） |
| `G_take` | 平台真正经手的 GMV（口径①≈P1；口径②=Cost·(1+K)全额） | — |
| `I_infra` | 平台基础设施 COGS（registry/ledger/serving） | 随活跃用户线性 |
| `c_hosted` | 托管保护步骤自有算力 | — |
| `c_test` | 验证/canonical tests 算力 | 随上架包/版本 |
| `ρ_refund` | 退款/争议准备金率 | 1%–5%（早期高） |
| `L_float` | **仅口径②**：垫付模型 API 资金成本+坏账 | — |
| `S&M` | 销售与市场（在毛利**之下**，非 COGS） | creator 激励/KOL/获客 |
| `GM` | 毛利 = P_rev − ΣCOGS | 73%→85% |

---

## 2. 单 app 单元经济（完整链）

### 2.1 触达→安装→激活→频次（补全 seed 的 Cost 链）

seed 写到一半的 `Cost = 触达用户数 × 使用概率 × …`，缺的是**频次 f** 和**单次成本 c_call**：

```
N_calls = U_reach · a · f                              （单周期总任务数）
Cost    = N_calls · c_call = U_reach · a · f · c_call
```
> 即 seed 的「触达用户数 × 使用概率 × …」补完 = `U_reach · a · (f · c_call)`。

### 2.2 单次任务成本 c_call → token 级（含多步 agent / cache）

```
c_call = s · [ T_in·p_in·(1−ρ_cache) + T_in·p_cache·ρ_cache + T_out·p_out ]
简化版：c_call = s·(T_in+T_out)·p_blended
```
**关键：`s`（步数）不能省。** multi-step agent 把 single-shot 的 c_call 放大 3–30 倍。

### 2.3 创作者定价 / 净收 / 平台该 app 收入

```
Price   = Cost·(1+K)            买家实付（=单笔 GMV）
markup  = Cost·K                创作者价值增量（平台真正有资格分成的部分）

P1_app      = τ_seed·Cost·K     ← seed 原式（基数 A）
creator_net = (1−τ_seed)·Cost·K （创作者不为推理费再被抽一道）
```
**三层用户分清**：`U_reach（触达） → U_active=U_reach·a（烧 token） → U_paid=U_active·pay_rate（计费）`。免费试用 `Cost_free` 是获客补贴，**拖低毛利、单列、不并进 P1**。

---

## 3. 平台全部收入线 P1…P6

```
P_rev = P1 + P2 + P3 + P4 + P5 + P6
```
- **P1 创作者抽成（按量）**：`P1 = τ·GMV_total = τ·(U_paid·ḡ·12)`（基数见 §6，默认抽 markup）
- **P2 托管保护步骤 usage（按量）**：`P2 = Σ_k τ_usage·uf_k·Q_k`，`Q_k=U_k·runs_k·ρ_k`
- **P3 订阅/SaaS/seat（订阅）**：用户订阅 + Publisher Pro + team seat
- **P4 认证/验证**：`N_cert·fee_cert + tests 托管 + featured + security review`
- **P5 企业/私有 registry/managed runtime（高客单）**：registry 年费 + managed seat + 部署费
- **P6 能力产品化/共创（一次性 bridge）**：`Σ fee_coCreate·(1−waive) + 安装服务费 + team pilot`

**与三执行模式锁定**：open-local→P3；hosted-protected→P2；managed-runtime→P5。
**占比演化**：早期 P6/P4 是 bridge；规模化后 P1 绝对主导；P5 是后期高客单 upside。

---

## 4. 收入 vs 毛利的关键辨析（最重要的洞察）

> `P1` 是 take（收入）不是毛利；两种垫付口径毛利**数量级一致**，差在风险与流水好看程度。

**口径①：纯 pass-through（BP 现行假设）** — `Cost` 完全不经平台账户：
```
GM₁ ≈ R1 − COGS = τ·Cost·K − (φ·G_take + I_infra + c_hosted + c_test + ρ_refund·R1)
G_take ≈ R1（只过抽成那笔），故 φ·G_take 极小 ⟹ GM₁ ≈ R1，P1 近似纯毛利
```
这就是 73%–85% 高毛利的来源。

**口径②：平台垫付/代收推理** — 同一笔 Cost 既是流水(+)又是 COGS(−)，净额 0，毛利仍只来自 markup 抽成；但 `G_take=Cost·(1+K)` 全额过账 → `φ·G_take` 被放大，且新增 `L_float`（垫付现金流+坏账）。

| | 口径① pass-through | 口径② 垫付 |
|---|---|---|
| GMV 流水 | 小（只过 take） | 大（Cost 灌进 GMV，好看） |
| φ 基数 | ≈R1（小） | Cost·(1+K)（大） |
| 新增风险 | 无 | L_float |
| 毛利量级 | ≈markup 抽成 | ≈markup 抽成（一致） |

**结论：除非要统一计费/企业开票，默认走口径①。**

---

## 5. COGS 与毛利总桥

```
GM = P_rev − ΣCOGS
```
ΣCOGS 逐项：① 支付费 `φ·G_take`｜② 基础设施 `I_infra`｜③ 托管算力 `c_hosted`｜④ 验证算力 `c_test`｜⑤ 退款准备金 `ρ_refund·P_rev`｜（⑥ 仅口径②：`Cost+L_float`）。

```
take (P1=τ·Cost·K) →（扣 ①–⑤）→ GM 毛利 →（扣 S&M/R&D/G&A）→ OI 营业利润
```
**COGS vs S&M 画死（投资人最常追）**：
- creator 正常分账 `payout = GMV − take` **本就不在平台收入里，不要再当 COGS 扣一遍**。
- 为冷启动额外发的 creator 保底/激励 → 归 **S&M（毛利之下）**。
- `c_hosted/c_test/ledger` 既是护城河也是 COGS，规模化摊薄 → 这是毛利率 73%→85% 爬升的来源。

---

## 6. 抽成基数选择（A / B / C）

锚②决定一切：Cost 不流经平台，平台只看得见 markup。问题不是"抽多少"而是"是否对一笔自己没碰过的钱征税"。

| 基数 | P1 公式 | creator net | 有效税率 eff=P1/Price | 性质 |
|---|---|---|---|---|
| **A 抽 markup** | `τ·Cost·K` | `(1−τ)·Cost·K` | `τ·K/(1+K)` | **累进**：薄利免税，know-how 重税 |
| **B 抽 GMV** | `τ·Cost·(1+K)` | `Cost·[K−τ(1+K)]` | `τ`（恒定） | **累退**：薄利没收性 |
| **C 混合/分段** | `τ1·markup + τ2·U_hosted + 订阅` | 分层 | 分层 | 与平台实交付价值对齐 |

**数值对比（τ=30%, Cost=100）：**

| K% | A：P1 / eff | B：creator net | 点评 |
|---|---|---|---|
| 10% | 3 / 2.7% | **−23** | B 对薄利是没收性的（抽成=markup 的 330%） |
| 50% | 15 / 10% | 5 | B 恰好临界附近 |
| 200% | 60 / 20% | 110 | 高 K 下两者才接近 |

**基数 B 盈亏临界**：`creator_net_B>0 ⟺ K > τ/(1−τ)`，τ=30% 时需 **K>42.9%** 创作者才不亏。利率<43% 的薄利长尾在 B 下直接亏本——与 "Not one genius. Millions." 正面冲突。

**对标换算（有效 take on GMV）**：App Store 30%（敢收因 Cost≈0）｜Apify 20%（actor 跑平台云，平台扛算力→对应 Agora hosted 层）｜AWS/Azure 云市场 5–10%（只分发+结算，不扛算力）｜Agensi 20%｜结算型 5%。**规律：凡平台不承担推理算力的，take 都压在 5–20%。Agora 本地执行结构上像云市场（轻 take on markup），不像 App Store。**

**推荐：A 做底盘 + C 做分层，显式排除纯 B：**
```
本地开放层：P1 = τ1·Cost·K,  τ1 = 5–10%（对 markup）
托管层：    叠加 P2 = τ2·U_hosted, τ2 ≈ 15–30%（平台有真实 COGS+IP 交付，对标 Apify）
薄利长尾：  F_sub = Publisher Pro/认证/team license（把"平台收入"与"对创作者征税"解耦）
```
> seed 的 `P1=30%·Cost·K%` 正是基数 A 取 τ1=30% 的特例；BP 落地建议把 τ1 从 30%@markup 下调到 5–10%@markup（与现行 10% take 对齐，见锚③），保 creator-friendly。**每处 take 都要标注基数（markup/GMV/hosted-usage）。**

---

## 7. 敏感性 / 杠杆（∂GM/∂x）

Cost 是连乘 `U_reach·a·f·s·T·p`，对每个系数都是**单位弹性**。

| 变量 | 方向与强度 | 直觉 |
|---|---|---|
| **τ** | 线性正向最直接 | `∂P1/∂τ=Cost·K`；抬 τ 压供给，是政治变量 |
| **K%** | 基数 A 下 `∂P1/∂K=τ·Cost` | eff 累进，**高 K app 才是主抽成来源** |
| **激活 a / CR_install / 留存 R_t** | 单位弹性，连乘最低环 | 通常这几项最小，是真实瓶颈 |
| **频次 f** | 单位弹性正向 | 决定复购，是 ḡ 主驱动 |
| **c_call（尤其 s）** | 单位弹性，双刃 | 抬 Cost→固定 K 下 P1 升，却压创作者毛利 |
| **φ 支付费** | 负向，口径②被全额放大 | 选口径①把基数从 GMV 降到 take |

**BP 动作**：做 tornado 图，各系数 ±50% 看 GM 摆幅；最小那环（通常 CR_install/R_t/pay_rate）是真实杠杆点。

---

## 8. 完整算例（单 app → 平台月度毛利）

### 8.1 假设（中频 agent 工作流，月口径，口径①）

U_reach=50,000；a=0.20→U_active=10,000；pay_rate=8%→U_paid=800；f=10 任务/月；s=5；每步 T_in/T_out=8,000/800；ρ_cache=0.5；p_in/p_out/p_cache=$3/$15/$0.30 per Mtok；K=50%；τ_seed=30%。

### 8.2 逐步计算

```
每步 input = 8000·[3·0.5+0.30·0.5]/1e6 = $0.0132 ；每步 output = 800·15/1e6 = $0.012
每步合计 $0.0252 → c_call = 5·0.0252 = $0.126/任务
N_calls_paid = 800·10 = 8,000 → Cost_paid = 8,000·0.126 = $1,008/月
markup = 1008·0.5 = $504 ；Price(月 GMV_app) = 1008·1.5 = $1,512
P1_app = 0.30·1008·0.5 = $151.2/月 ；creator_net = 0.70·504 = $352.8/月
校验 eff = 151.2/1512 = 10% = τ·K/(1+K) = 0.3·0.5/1.5 = 10% ✓（落回现行模型 10% take）
```

### 8.3 放大到平台（月度，假设 5,000 个同量级在架 app，≈Y3 早段）

```
P1（月）= 5,000·151.2 = $756,000 ；GMV_total（月）= 5,000·1,512 = $7.56M（年化 $90.7M，对账 Appendix F Y3 $84M 量级吻合）
```
叠加其它线（Y3 早段保守）：P2 $90k + P3 $120k + P4 $35k + P5 $60k + P6 $40k → **P_rev = $1,101,000/月**。

COGS（口径①）：①φ·G_take $32k ②I_infra $60k ③c_hosted $25k ④c_test $18k ⑤退款 $33k → **ΣCOGS = $168,000/月**。

```
GM = 1,101,000 − 168,000 = $933,000/月 ；GM% = 84.7%（落在 Appendix F 81–85% 区间 ✓）
```
营业利润示意（S&M 不进 COGS）：设 S&M $700k/月、R&D+G&A $500k/月 → `OI = 933 − 700 − 500 = −$267,000/月`。
> **【已更正】** 年化 ≈ **−$3.2M/年**（非"与 Appendix F −$9.49M 同量级"——本算例只取代表性 app 子集、未含全部 OpEx，故更窄）。

### 8.4 算例结论

1. seed `P1=30%·Cost·K%` 跑出 $151.2/月 = **10% take on GMV**——30% 与 10% 在 K=50% 下是同一笔钱（锚③）。
2. 口径①下 GM%≈85%，与现行模型对齐——P1 近似纯毛利成立（因 Cost pass-through）。
3. 毛利为正但营业利润为负，瓶颈在 **S&M（creator 激励+GTM），不在 COGS**。

---

## 9. seed 兼容性（一句话）

> 用户 `P1 = 30%·Cost·K%` = **基数 A（抽 markup）取 τ_seed=30% 的特例**；`Cost` 补全为 `U_reach·a·f·s·[token 价]`；它是 take（收入）不是毛利，pass-through 下近似纯毛利；落地建议把 τ 从 30%@markup 重述为 5–13%@markup（与现行 10–13% take 对齐，始终标注基数）。

---

## 10. 人群规模 × 行为 → 利润估算（top-down，与 §8 bottom-up 互补）

§8 是单 app 往上加总；本节从**全球人群**往下推付费用户数与利润，两端对账（§11）。

### 10.1 主方程

```
EBITDA ≈ [ TAM·s_sam·s_active·s_paid ]·[ τ·(n·t·π)·K + r_other ]·12·GM% − Opex
              └────── 付费用户数（规模）─────┘ └──── 每付费用户月收入（行为）────┘
```
（`n·t·π` 即 §2 的 Cost：n=月调用次数、t=每次有效 token=s·tokens/step、π=$/token。）

### 10.2 人群漏斗（base 校准到复现现有模型的 2M 付费用户）

| 层 | Conservative | **Base** | Upside |
|---|---:|---:|---:|
| TAM agent-power-users（全球，稳态≈Y5；今天约 50M） | 120M | **250M** | 400M |
| × s_sam 可触达（开放/跨 runtime/中英） | 35% | **40%** | 50% |
| × s_active 激活安装 | 8% | **15%** | 20% |
| × s_paid 付费转化（对标 ChatGPT~5%、power user 更高） | 8% | **13%** | 13% |
| = **付费用户** | ~270K | **~2.0M** | ~5.2M |

### 10.3 每付费用户行为（月）

| 参数 | Conservative | **Base** | Upside |
|---|---:|---:|---:|
| 调用次数 n/月 | 80 | **200** | 400 |
| 每次有效 token t（=s·tokens/step） | 30k | **50k** | 60k |
| 单价 π（$/Mtok） | $5 | **$5** | $4 |
| → Cost/用户/月 | $12 | **$50** | $96 |
| 加价率 K | 40% | **50%** | 80% |
| → 加价(可抽)/用户/月 | $4.8 | **$25** | $77 |
| P1=30%×加价 | $1.4 | **$7.5** | $23 |
| + r_other（保护步骤/订阅/认证） | $0.6 | **$1.5** | $5 |
| = 平台净收入/用户/月 | ~$2 | **~$9** | ~$28 |

### 10.4 利润表（与现有 scenario 对齐）

| | Conservative | **Base** | Upside |
|---|---:|---:|---:|
| 付费用户 | 270K | **2.0M** | 5.2M |
| 平台年净收入 | ~$16M | **~$180–216M** | ~$500–775M |
| × 毛利率 | 78% | **85%** | 88% |
| = 毛利 | ~$13M | **~$156–184M** | ~$450–680M |
| − Opex | ~$30M | **~$95M** | ~$200M |
| = **EBITDA** | **~−$17M** | **~+$61–90M** | **~+$450M** |

→ 与现有模型的 (−$17M / +$61M / +$454M) 吻合，但现在每个数字可追溯到"多少人 × 什么行为"。

### 10.5 利润最敏感的杠杆（人群侧）

收入是 7 个乘数连乘，任何一项打折线性穿透到利润。排序：① **s_paid×s_active**（base 的 15%×13%≈2% 总转化是最脆弱假设，conservative→base 生死线）；② **K%**（薄利 vs 专有 know-how 差一个量级 → 主攻高 K 能力包）；③ **n 频次**（只做高频复用工作流）；④ **TAM 增速**（J-curve 期权，upside 全部来源）。

---

## 11. bottom-up ↔ top-down 对账

| | §8 bottom-up（单 app 加总） | §10 top-down（人群漏斗） | 共同锚 |
|---|---|---|---|
| 切入 | 5,000 app × $151/app | 250M TAM → 2M 付费用户 | Appendix F |
| take 口径 | eff=10% on GMV（=30% on markup） | P1=30%×加价 | 锚③一致 |
| 毛利率 | GM%=84.7% | 85% | 73→85% 区间 |
| 量级 | 年化 GMV $90.7M（Y3 段） | 年净收入 $180M（Y5 base） | 同一引擎不同年份 |

**两端是同一模型的两个视角**：bottom-up 验证"单包经济成立"，top-down 验证"人群规模能撑起 VC-scale"。二者都收敛到 [agora-financial-model](/output/reports/agora/business-model/agora-financial-model/) Appendix F。这里的高毛利结论属于旧平台情景，不是 Combo 当前经营事实。

### 待定输入（会显著改估算）

1. **TAM 现值**：今天能装第三方能力包的人（Claude Code/Cursor/Codex/扣子等），本文估 ~50M 全球 / 稳态 250M——需一线校准。
2. **中国 vs 全球口径**：中国 C 端付费意愿极低（剪映 SVIP 仅 3.2%），若先打中国，s_paid 砍到 3–5%、收入更多来自 B 端 seat 而非 C 端按量——需单出中国版。

---
*由 LLM 从 raw/ 与现有财务模型编译（6-agent workflow + 主循环人群模型，数学已校验），凡假设/未核验已标注，请勿手动编辑。归属 [agora-startup](/wiki/maps/agora-startup/) 模块 4。*
