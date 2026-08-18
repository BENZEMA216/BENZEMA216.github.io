# inferock-bench 项目分析：独立的 LLM 账单审计工具

> 2026-08-17 web query。来源：GitHub README 与仓库结构（https://github.com/inferock/inferock-bench，main 分支，pushed 2026-08-06）。

## 一句话定义

**inferock-bench 是一个本地运行的 LLM 成本追踪代理（cost-tracking proxy）**：把你的 OpenAI / Anthropic / Gemini / OpenRouter API 流量指向本地端口，它记录每一次调用的 token 用量、失败证据与计费证据，并按「The Inferock Standard」规范生成独立的 per-call 计费回执（receipt），用来审计「你的 AI 账单是不是悄悄错了」。

## 核心问题：收费方不该给自己打分

> Providers shouldn't get to grade their own bills.

现状里，向你收费的公司同时决定「什么算失败、什么该退款、账目细节存在哪」——OpenAI/Anthropic 既是收费方又是记账方，用户手里没有独立的逐调用记录。项目的立场是：

- 你的 AI 账单只统计「模型消耗了多少 token」，从不统计「你有没有得到东西」。一次 refusal 可能和一次完整回答收一样的钱；同名模型可能悄悄变差；出问题时举证责任全在你。
- 推理的 dashboard、日志、usage API、token 估算器、成本工具很多，但几乎没有工具把「逐调用的 provider 账单」和「交付证据」交叉核对。

inferock-bench 就是这个缺口的测量仪器：它在本地看着真实流量进出真实 provider API，把可靠性、延迟、花费、失败代价的证据保存下来供账单审计。

## 它是什么 / 不是什么

| 是 | 不是 |
|---|---|
| 本地诊断代理（`npx inferock-bench`，默认监听 `http://127.0.0.1:4318`） | 不是 provider 排名、不是对 provider 意图的指控 |
| 把 Claude Code / OpenAI SDK / Gemini SDK 等客户端指向本地，转发到真实 provider | 不能审计绕过代理的流量，不能解释没有对应发票的月度账单 |
| 用 `@inferock/measure` 包 + [The Inferock Standard](https://github.com/inferock/inferock-bench/blob/main/spec/standard.md)（公开 spec）对事件记录打分，渲染 receipt | 不把每个 mismatch 都定性为「OpenAI 多收费 / Anthropic 计费错误」——它保留 token、成本、重试、失败证据供核查 |

两种数字在 receipt 中明确标注：

- **Observations（观测）**：状态码、实测延迟、provider 上报的 token 数、检测器标记的调用——「发生过什么」。
- **Interpretations（解释）**：在公开假设（阈值、时薪、整调用下限）下从观测算出的美元数字——「我们的算术套在真实事件上」，不是 provider 的承认。项目的演进方向是把尽可能多的数字从第二列挪到第一列，剩余限制写在 [MEASUREMENT-PHILOSOPHY.md](https://github.com/inferock/inferock-bench/blob/main/MEASUREMENT-PHILOSOPHY.md) 里而不是藏起来。

## Receipt 头部的四类数字（互不混加）

| 词 | 含义 |
|---|---|
| `spent` | 本次运行观测到的、有定价调用的 provider 花费 |
| `money loss` | The Inferock Standard 能关联到观测花费/收费证据的、以账单为上限的美元损失 |
| `time loss` | 实测的等待/停机时间，只以时间计，绝不加进美元 |
| `invoice-check exposure` | 需要核发票的金额（如 cache discount at risk），标注「请核对你自己的发票」，不计入 money loss |

## 检测的失败模式（会影响账单或审计链的交付失败）

- 计费但输出为空（billed-empty output）
- refusal
- 截断（truncation）
- token 重新计数不一致（token-recount mismatch）
- 重复 request ID
- cache 折扣风险证据（cache-discount-at-risk）
- provider 故障导致的重试

每个检测面有 coverage 状态：`watched-clean` / `signal` / `not-openable`——没打开的检查是可见的，而不是假装干净。

## 支持范围与集成

- **四个实测 provider plane**：OpenAI、Anthropic、Gemini Developer API、固定的 OpenRouter 端点（meta-llama、deepseek、mistral、moonshot/kimi、z-ai/glm、qwen 等）。其余按设计可扩展，但「今天没实测」。
- **接入方式**：客户端（Claude Code 的 `ANTHROPIC_BASE_URL`、OpenAI SDK 的 `baseURL`、Gemini SDK）指向 `http://127.0.0.1:4318`，用本地 bench key（`ibl_` 前缀）即可。内置 `npx inferock-bench test` 在真实调用前先展示估算 token、估算美元和花费上限。
- 配置与 key 存 `~/.inferock-bench/`，owner-only 权限，仪表盘里只显示掩码形式。

## Key 边界（隐私设计）

- **provider key 不会发给 Inferock**：本地代理只把 key 附加到 provider 请求上；receipt 默认本地保存，除非你主动分享。
- 本地 bench key（`ibl_`）是仅本地的凭据，不是你的 provider key。
- 配套文档：[what-leaves-your-machine.md](https://github.com/inferock/inferock-bench/blob/main/docs/what-leaves-your-machine.md)（什么东西会离开你的机器）、[threat-model.md](https://github.com/inferock/inferock-bench/blob/main/docs/threat-model.md)（威胁模型，邀请对抗性审查）。

## 利益冲突披露（项目自己写的）

README 开头就声明：**Inferock 卖托管产品，而这个 benchmark 按 Inferock 自己写的 The Inferock Standard 打分**。所以项目要求你不要凭权威接受结论：去看 `docs/` 里的公开 run cards、spec 和源码，读 [hard-questions.md](https://github.com/inferock/inferock-bench/blob/main/docs/hard-questions.md)（尖锐问题）和 threat model 里的局限与对抗性审查邀请。这正是「独立审计工具」最容易被怀疑的地方——它选择正面披露而不是假装中立。

## 公开测量账本（截至 2026-08-05 run card）

- 从 2026-07-09 起累计：**1,303 次实测调用、598 条 receipt findings**。
- `$8.43` provider 花费观测、`$0.03` 账单受限 money loss（0.3%）、约 `2.9 min` 时间损失、`$18.88` invoice-check exposure。
- 对比基准：superseded run15 快照的 564 条 findings 拆分为 31 条失败 findings / 331 条仅分诊观测 / 202 条发票核验暴露。README 明确标注 run15 的快照分解与 35 行增量没有等价分类，所以不编造。
- 仓库元数据：TypeScript，136 stars / 49 forks（2026-08-17 时点），创建于 2026-07-02，license 为 FSL-1.1-ALv2（Functional Source License，到期转 Apache-2.0）。

## 对知识库的关联

- 与 [model-supply-entitlements](/wiki/concepts/model-supply-entitlements/)（`raw/articles/agent-economy/token-kills-ai-applications-2026-07-30.md`）互补：那篇讲 token 作为供给与现金流约束，这篇讲「花了钱是否拿到货」的逐调用证据——**计费真值（billing-integrity）是 AI 应用成本治理的第二根支柱**。
- 与 [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) 同源：per-call receipt（观测 + 解释分层）本质上是「可审计的执行账本」，与 Combo 的 `RunReceipt` / `Acceptance` 真值思路（见 [beardrive-agent-workspace-product-analysis-2026-08-14](/output/reports/beardrive-agent-workspace-product-analysis-2026-08-14/)）同一模式——独立第三方或本地持有的证据，而不是服务方自报。
- 方法论启发：**审计工具的最大风险是审计者与被审计者利益重合**；inferock-bench 用「公开 spec + 公开 run cards + 利益冲突披露 + 邀请对抗性审查」对冲，值得任何自建评测/审计体系照抄。

## 实际用途：能退钱吗？（同日追加）

**结论：它是「讨债的证据链工具」，不是自动退款工具。** 能不能退钱，最终由 provider 退款政策决定；它负责把「被计费但没交付」的调用变成可举证、可争议的记录。

**它和 provider 退款政策的关系（spec 原文立场）**：
- The Inferock Standard 明确「独立于 provider 退款政策」——provider 政策决定一笔钱现在认不认退（recognize as refundable），Standard 只衡量「客户是否遭受可测量的损失、证据有多强、该进钱账还是时间账」。
- `estimated recoverable` 是 Inferock 算术按 signal 经济学和可得政策证据**推算**的金额，字段名本身不承诺 provider 会认账；provider 不认的损失进 `recognition gap`（一等公民指标，不许隐藏）。
- 但证据等级（evidence grade）直接决定一行是 **ready to dispute（可争议）** 还是 watch-only；spec 明确引导 disputant「先把 receipt 变成 provider claim 再去找 provider」——**receipt 就是为争议/索赔设计的可分享工件**（shareable artifact）。

**现实退钱路径**：拿到 receipt 里的 request ID + 失败证据 → 去 OpenAI / Anthropic / Gemini 支持渠道开 ticket 主张 credits。inferock 引用的外部审计锚（[Business Wire 2026-06-30 报道 Vaudit 启动 TokenAudit](https://www.businesswire.com/news/home/20260630108235/en/Vaudit-Launches-TokenAudit-to-Recover-Millions-in-Enterprise-Token-Spend-Billing-Errors-From-Anthropic-OpenAI-and-AI-Providers)）称：约 $3,400 万被审计 AI 花费中发现约 $170 万计费错误（5.0%），客户争议后约 **80% 获得 credit**——注意这是 inferock 引用的外部校准数据，不是它自己的实测。

**三类真实用途**：
1. **追钱 / 核发票**：money loss 的可追回部分 + `invoice-check exposure`（如 cache 折扣风险）提醒你去核发票、主张合同级权益。
2. **成本治理**：对重 AI 花费的团队，per-call 证据支撑内部核算、发现重复计费 request ID、token 数对不上、异常花费。
3. **质量证据**：同名模型悄悄变差、延迟退化、refusal 率——不是钱的问题，是换供应商 / 谈判的依据。

**清醒预期**：
- 公开实测账本极小（$8.43 观测花费 / $0.03 money loss / 0.3%），说明**真实流量里目前没测出多大问题**——工具价值在于给大额账单提供审计手段，不是普遍能捞钱。对个人用户意义有限（0.3% 在小账单上无感）；对月账单数十万美元的企业，0.3% + cache 折扣类合同权益才谈得上「追回真钱」。
- 不自动提交索赔；退款靠你拿着证据去 provider 主张。
- 它的英雄图（$124K/月账单 → $5,708 损失）是合成场景走真实管线，**明确标注不是实测、不是保证、不是账单审计**。

---
*由 LLM 从 raw/ 与 output/ 数据编译，请勿手动编辑*
