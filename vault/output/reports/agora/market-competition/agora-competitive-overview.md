<!--
status: supporting
status_reviewed: 2026-07-17
evidence_level: research-synthesis
-->

# Agora 竞品总览 — 他们做了什么，为什么不成立

> [!warning] 长期机制参考
> 本文保留 Agora 平台竞品框架；其中 event ledger、verification 与“护城河”均是长期假设，不是 Combo 当前已形成的能力。当前公司定义见 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)。

> 把知识库里 11 份竞品报告合成成一张图：现有玩家在"让 Skill / Agent 能力创作者赚到钱"上各自试了什么、卡在哪。
> 映射框架来自 [agora-problem-statement](/output/reports/agora/narrative/agora-problem-statement/) 的三层根因：
> **L1** 价值捕获（可无限复制 → 无产权 → 无定价）｜**L2** 市场触达（agent 用户漏斗太窄）｜**L3** 价值证明（买家付钱前无法预判有用，binding constraint）。
> 来源：见文末「证据来源」。整理：2026-06-20。

---

## 一句话结论

> **所有竞品都在抢 L2（发现/连接/安装）、少数在铺 L1（计费 rails），没有任何一个系统性解决 L3（价值证明）——而 L3 正是我们定义的 binding constraint。** 离闭环最近的那个（Agensi：Stripe 分账 + 水印指纹）恰好反证了 L1 的根因（本地能力可无限复制）用 DRM 解不了。

---

## 六种 archetype，各自卡在哪

### A. 纯目录 / 连接层 —— 解了 L2，钱没了（L1 空白）
| 竞品 | 试了什么 | 为什么不成立 |
|---|---|---|
| **Smithery** | MCP registry + Gateway，按 RPC 计费（$0.10/1K RPC），5,254 servers / 132,203 skills | 解"怎么连"，**完全没有 creator payout / 分账 / take rate / checkout / refund / failure attribution**；创作者只能绕到平台外接 Stripe；registry 易被 mcp.so/Glama/PulseMCP 分流 |
| **Vercel skills.sh** | 跨 agent 的 skill 包管理器，`npx skills add`，2M installs / 69,000+ skills | Terms 明说不拥有不托管不分账，**无 paid skill / checkout / payout / entitlement / license enforcement**；本质是 Vercel 自己的获客 wedge |
| **Glama / mcp.so / PulseMCP** | MCP 目录 | 同质化严重，缺收费/认证/测试，易沦为 SEO listing |

→ **卡在 L1**：有发现、无产权、无定价。

### B. 平台托管 runtime —— L1 真解了，但代价是放弃本地执行
| 竞品 | 试了什么 | 为什么有局限 |
|---|---|---|
| **Apify** | Actor Store，**pay-per-event / result，平台抽 20%**，$25M ARR，每日自动测试 + quality score + 月度 payout；rental 模式 2026-10 退休 | L1 最强（托管=能力不外泄=可分账），但**代码跑在 Apify 云不是用户本地**，做不了 identity-bound（账号类）场景，且与大厂 runtime 正面撞 |
| **Relevance AI** | paid listing creator 自定价（≤$1000），Stripe 收款，**project-scoped entitlement + 禁 clone**，7 天退款，当前不抽成 | **最清晰的 entitlement 样板**（绑定+禁复制=弱保护），但 A 购买后能看到改 agent，很难收"每次运行费" |
| **Poe** | per-message 定价，**Server Bot `authorize`→`capture`（事前估、事后结）** | 形态局限 chat/API bot，A 的外部账号授权它不原生解决 |

→ **这一组证明 L1 唯一已验证的解法 = 平台托管 runtime，但要牺牲本地/身份绑定场景。**

### C. 大厂自带全套分发，仍然失败 —— 最强反例（L2 ≠ 变现）
| 竞品 | 试了什么 | 为什么不成立 |
|---|---|---|
| **GPT Store** | OpenAI 自带 distribution + billing + discovery + 品牌 | **四件套齐全仍死在分成/变现**——证明流量入口补不了买家漏斗，discovery≠让买家敢付 |
| **Claude Skills**（66,500+） | installable 能力包，可 org 内分享，view-only | **我们命题的活病灶**：本地可无限复制 → 无产权 → 零变现；安装前也不知有没有用（L1+L3 双坏） |
| **Agent.ai**（Dharmesh，44k agents） | MCP export 跨 assistant + Premium $10/mo + Pro $25/mo + credits | **credits 官方明说无现金价值、不能兑现 → 创作者实际赚不到钱**（L1 自爆） |
| **Dify** | template marketplace | 靠 affiliate 抽佣（≤50% recurring），**不是为能力本身定价**，归因弱 |
| **HF Spaces** | B 付 compute 托管 | usage-based 烧 B 账单，**无内置 creator payout** |

### D. 最接近闭环 —— 却暴露 L1 根因不可解
| 竞品 | 试了什么 | 为什么不成立 |
|---|---|---|
| **Agensi** | **唯一的 paid SKILL.md 闭环**：80/20 分成 + Stripe Connect + 买家指纹 + 水印 + 安全扫描 | 交易的是**静态本地文件**，一旦本地执行源码无法真正保护；指纹/水印只能"防君子"。**这是不可能三角的实证**——反证 Agora 不该押加密，要用 hosted protected step + 服务化绕过 |

### E. 去中心化 agent 网络 —— 三层全恶化（明确否决）
来自 [agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/) 的严厉批评。Premise 本身错（用户要的是"好用便宜安全在线"，不是"掌控部署位置"；Moxie 定论 *"People don't want to run their own servers"*）。六个致命问题：**需求证据空白（研究几个月一个用户名都举不出）、离线即失效、compute 最终回到中心化结算、discovery 天然中心化、信任全开无法问责**。GPT Store 有四件套尚且失败，去中心化版本三者全更差。正确对应物是 **orchestrator-worker**（控制面在云、执行面在本地），不是 decentralized。→ 让 L1/L2/L3 同时变烂。

### F. 需求侧身份线（PKC / Portable Identity）—— 确认红海 + 厂商抽地板
| 竞品 | 评分 | 状态 |
|---|---|---|
| **Epitome** | **5.5/6** | 几乎就是我们想做的（MIT+Docker+9 MCP tools+USDC pay-per-call），有先发优势 |
| **limitless-ai.dev** | **5/6** | identity schema（about/projects/preferences/people/decisions）与我们逐字撞 |
| **Base Layer / mem0 OpenMemory / Letta / MemPalace** | 4–4.5/6 | 跨工具、MCP、自部署都做了 |
| **Anthropic Claude Import Memory** | 0.5/6 但**威胁最大** | 功能几乎为零，但叙事杀伤："不需要第三方，厂商之间互导就行"；判断 **12 个月后第三方层只剩"中立托管+用户控制"一条护城河** |

**尸体成排**：Inflection Pi（被微软收编）、Rewind→Limitless（被 Meta 收、memory 锁硬件=死路）、Personal.ai（5 年仍 niche，"我有自己的 AI"不是产品形态）、Heirloom（卡在 presale）。→ self-use / 硬件 / 封闭路线已被反复证伪。**身份层是红海里的功能，不是产品**；唯一逻辑自洽是降级为 Agent Economy 入口资产（Path B）。详见 [personal-knowledge-card-competitive-research](/output/reports/agora/market-competition/personal-knowledge-card-competitive-research/)、[portable-identity-competitive-research](/output/reports/agora/market-competition/portable-identity-competitive-research/)。

---

## 谁碰到了 L3?—— 只有零星几个，且都只做了一半

全市场对"价值证明"几乎是盲区，碰到一点的都活得更久，但机制都是"把风险从买家身上转移走"，而不是"付费前让买家相信对自己有用"：

- **Poe**：authorize→capture（事前估成本、事后按实结）
- **Relevance**：7 天无理由退款（事后托底）
- **Apify**：pay-per-result + 每日自动测试 + quality score（按可数产出付 + 可证明能跑）

**但没有一家做到「买家在购买决策点，看到这个能力在我这类环境跑通过」**——没有 per-buyer 的 canonical tests 结果、runtime compatibility matrix、对买家自己环境的 dry-run。这就是整张图谱里**没人占据的空白**。

---

## 共同规律 → Agora 的历史护城河假设

1. **L1（产权/定价）目前只有两条已验证路径，且都有代价**：平台托管 runtime（Apify/Relevance/Poe，能力不外泄）；project-scoped entitlement + 禁复制（Relevance，弱保护）。反例链清晰：纯本地包（Claude Skills 零变现）、纯目录（Smithery 无 billing）、无价值 credits（Agent.ai）、affiliate 抽佣（Dify）、B-pays-hosting（HF Spaces）全部在 L1 失血。
2. **L2（触达）人人能做一半，GPT Store 一击命中要害**：discovery / 流量 ≠ 变现。
3. **L3（价值证明）几乎是全市场盲区，谁碰一点谁就活得久**，但没人在购买决策点提供 per-buyer 适配性证据。
4. **历史结构假设**：可能成立的形态是「**中心化控制面（discovery / entitlement / billing / event ledger / reputation / test status）+ 本地或 BYOC 执行面（A 用自己 credential，B 核心 know-how 作 hosted protected step）**」。旧 Agora thesis 把 event ledger 视为潜在护城河，因为它可记录 caller / package+version / publisher / credential_subject / tool_scope / metering / failure_attribution / refund / payout_split；这仍需跨创作者交易和结果路由的真实数据验证。

**对 Agora 历史研究最尖锐的含义**：所有人把钱压在 L1（计费 rails）和 L2（触达），而 L3 价值证明仍是值得继续观察的空白。verification-as-tradable-unit（每个能力包自带 canonical tests + compatibility matrix + 针对买家环境的预演证据，并把验证结果绑进 entitlement 和 event ledger）是一项待验证的长期机制，不代表 Combo 当前壁垒。

---

## 证据来源

供给侧 marketplace：[smithery-commercialization-2026-05-15](/output/reports/agora/market-competition/smithery-commercialization-2026-05-15/)、[vercel-skills-sh-commercialization-2026-05-15](/output/reports/agora/market-competition/vercel-skills-sh-commercialization-2026-05-15/)、[agent-ai-deep-research-2026-05](/output/reports/agora/market-competition/agent-ai-deep-research-2026-05/)、[skill-creator-monetization-mvp-2026-05-17](/output/reports/agora/product/skill-creator-monetization-mvp-2026-05-17/)（含 Agensi/Stripe ACP 校验）
A 用 B 的 agent + 投资图谱 + 去中心化批评：[user-a-use-user-b-agent-product-landscape-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-product-landscape-2026-05/)、[user-a-use-user-b-agent-deep-research-feishu-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-deep-research-feishu-2026-05/)、[agent-capability-distribution-investment-landscape-2026-04](/output/reports/agora/market-competition/agent-capability-distribution-investment-landscape-2026-04/)、[agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/)
需求侧身份线 + 结算方向：[personal-knowledge-card-competitive-research](/output/reports/agora/market-competition/personal-knowledge-card-competitive-research/)、[portable-identity-competitive-research](/output/reports/agora/market-competition/portable-identity-competitive-research/)、[canteen-agora-circle-arc-research](/output/reports/agora/market-competition/canteen-agora-circle-arc-research/)

---
*由 LLM 从 11 份竞品报告（3 路并行子代理抽取 → 合成）编译；价值证明后可提炼回 wiki/concepts。归属 [agora-startup](/wiki/maps/agora-startup/) 模块 2。*
