# Claude Mythos 5 发布图中的 Benchmark 细节

> 生成时间：2026-07-23
> 查询：帮我把图中的几个 benchmark 的细节整理一下

## 摘要

这张图混合了四种完全不同的分数：任务成功率、rubric 得分、Elo、能力覆盖率。它能说明 Claude Mythos 5 / Fable 5 在多类评测上的发布时表现，但**不能把各行百分比直接横向比较，也不能只凭表格判断一个模型在真实生产中的完成率**。

最值得关注的信号有三类：

1. **接近真实交付物**：GDPval-AA、GDP.pdf、AutomationBench、Legal Agent Benchmark；
2. **Agent 与环境的联合能力**：SWE-Bench Pro、FrontierCode、OSWorld-Verified、Terminal-Bench 2.1；
3. **高难专业能力或安全能力**：BioMysteryBench、ExploitBench、HealthBench Professional。

同时存在三项重要限制：

- SWE-Bench Pro 的 731-task public split 在 2026-07 被 OpenAI 审计，估计约 30% 任务存在问题；
- 多项分数显著受 harness、工具、reasoning effort、turn/token budget、重试次数影响，测到的是“模型 + Agent 系统”，不是裸模型；
- 图中带 `*` 的 Mythos/Fable 分数受安全路由影响：Anthropic 说明两者通常相差 1–3 个百分点，但在 cyber / biology 问题上 Fable 5 可能 fallback 到 Opus 4.8，因此星号项目更应视为 Mythos 5 的受控能力展示。

## 先看懂分数口径

| 口径 | Benchmark | 数字实际表示什么 |
|---|---|---|
| Pass / success rate | SWE-Bench Pro、OSWorld-Verified、Terminal-Bench 2.1、LAB | 达到完整成功条件的任务比例；LAB 是“所有 rubric 条件全过”才算成功 |
| Rubric / normalized score | FrontierCode、GDP.pdf、Blueprint-Bench 2、HealthBench | 满足多少加权标准，或归一化后的相似度；不等于完整任务通过率 |
| Elo | GDPval-AA | 盲评成对比较得到的相对工作质量评级；人类专家基线为 1000 |
| Capability coverage | ExploitBench Cap% | 41 个漏洞 × 16 个能力旗标的覆盖率；不是“成功拿下 78% 漏洞” |

## 逐项整理

### 1. SWE-Bench Pro

**它想测什么**

给 Agent 一个真实代码仓库和 issue，让它阅读代码、修改多个文件并生成能通过新测试且不破坏旧功能的 patch。重点是长周期、仓库级软件工程，而不是单函数代码生成。

**数据与评测**

- 原始数据集共 1,865 个问题，来自 41 个活跃维护仓库；
- 分为 public、held-out 和 commercial 三部分；当前常见发布分数使用 731-task public split；
- 问题可能需要专业工程师数小时到数天，包含跨文件和大规模修改；
- 常用指标为成功解决任务的比例（Pass@1），但结果高度依赖 Agent scaffold、时间/turn/token budget、测试环境和重试策略。

**图中分数**

- Mythos/Fable 5：80.3%
- Mythos Preview：77.8%
- Opus 4.8：69.2%
- GPT-5.5：58.6%
- Gemini 3.1 Pro：54.2%

**必须加上的 caveat**

OpenAI 在 2026-07 对 public split 做了审计，估计约 30% 的任务有 broken/problematic datapoints，例如 prompt、测试或参考实现不能公平反映能力。因此 80.3% 是“在该 grader 与配置下通过的比例”，不能解释成“独立完成 80.3% 的真实企业工程工作”。

官方来源：[Scale AI paper / dataset](https://arxiv.org/abs/2509.16941)、[官方代码仓库](https://github.com/scaleapi/SWE-bench_Pro-os)、[OpenAI 2026-07 审计](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)

### 2. FrontierCode（Diamond）

**它想测什么**

不仅问 patch 能不能过测试，而是问：**真实开源项目 maintainer 会不会认为它达到可合并标准**。

**数据与评测**

- 150 个真实 OSS issue，分为 Extended 150、Main 最难 100、Diamond 最难 50；
- 评估 behavioral correctness、regression safety、build/style cleanliness、项目约定和 scope discipline；
- 每个任务有 maintainer-authored rubric 和 blocker criteria；
- 任何 blocker 失败，该次 solution 的 rubric score 直接归零；
- 每个模型在各 reasoning effort 下运行 5 次，取最佳 effort 的五次平均。

**如何读图中 29.3%**

它是 Diamond 上的 gated weighted rubric score，不是 29.3% 的 issue 被完整修复。截图是 Anthropic 对新模型的发布评测；Cognition 较早的公开表中 Opus 4.8 为 13.4%。比较时必须确认 benchmark 版本、harness 和 reasoning effort；Cognition 已在 2026-07 发布 FrontierCode 1.1 并开始弃用旧 Diamond，因此旧榜单不宜长期混用。

官方来源：[Cognition 介绍与方法](https://cognition.com/blog/frontier-code)、[FrontierCode 1.1](https://cognition.com/blog/frontier-code-1.1)

### 3. GDPval-AA

**它想测什么**

衡量模型能否产出接近职业人士的真实知识工作交付物，而非回答知识题。任务覆盖 9 个高 GDP 行业、44 种职业，输出包括文档、slides、diagram、spreadsheet 等。

**数据与评测**

- OpenAI GDPval 全集为 1,320 个任务，由平均约 14 年经验的行业人士参与设计；
- GDPval-AA v2 使用其中 220 个任务；
- 模型在 Stirrup agent loop 中获得 shell 和 web browsing；
- 输出由 judge panel 做盲化 pairwise comparison，再转换为 Elo；
- 人类专家基线锚定为 1000；分数是相对质量排序，不是百分比，也不表示完成了多少任务。

**图中分数**

- Mythos/Fable 5：1932
- Opus 4.8：1890
- GPT-5.5：1769
- Gemini 3.1 Pro：1314

图中的 1932 应按当时发布所用版本/配置阅读；当前 GDPval-AA v2 榜单与图中数字已不完全一致，不能跨版本直接排名。

官方来源：[GDPval-AA v2 与方法](https://artificialanalysis.ai/evaluations/gdpval-aa)、[GDPval 论文](https://arxiv.org/abs/2510.04374)

### 4. GDP.pdf

**它想测什么**

让多模态模型读取真实专业 PDF，并回答从业者真的会问的问题。不是单测 OCR，而是把文字定位、表格/图表理解、跨页引用、空间信息、脚注/排除项、修订覆盖关系和“证据不足时拒答”放进同一个任务。

**数据与评测**

- 100 个 question-document pairs，来自 10 个专业领域；
- 问题由实际从业者编写；
- 只有当至少两个前沿多模态模型出现实质性失败时，候选问题才被保留；
- 每项有 atomic rubric，可报告 graded rubric score 和严格 task-level pass rate；
- 能力 taxonomy 共 11 类、3 层。

**图中分数**

- Mythos/Fable 5：29.8%（no tools）
- Opus 4.8：22.5%
- GPT-5.5：24.9%
- Gemini 3.1 Pro：16.7%

注意不同榜单可能展示 strict pass rate 或 rubric score，截图显然采用 Anthropic 发布时的统一口径；不要与公开站点上四舍五入的 accuracy 混为同一列。

官方来源：[GDP.pdf 论文](https://arxiv.org/abs/2607.11192)、[公开数据集](https://huggingface.co/datasets/surgeai/GDP.pdf)

### 5. Blueprint-Bench 2

**它想测什么**

让视觉 Agent 从室内照片重建 2D 户型图，重点测跨视角空间重建：有哪些房间、房间如何连接、相对面积和方位是什么。

**数据与评测**

- 50 套公寓，每套约 20 张室内照片；
- Agent 逐套处理，并有 persistent notepad，可把前面公寓学到的策略带到后面；
- 主要区分指标是房间连通关系的 Jaccard similarity；
- 分数归一化为 random baseline = 0、perfect = 1；
- 人类参考分约 0.586，说明 0.386 并不等于“只做对 38.6% 户型”，而是归一化连通性相似度。

**图中分数**

- Mythos/Fable 5：38.6%
- Opus 4.8：14.5%
- GPT-5.5：36.2%
- Gemini 3.1 Pro：26.5%

主要局限是样本仅 50 套、允许跨任务 notepad 学习，而且测的是照片到平面拓扑，不等同机器人 3D world model 或现实导航。

官方来源：[Andon Labs Blueprint-Bench 2](https://andonlabs.com/evals/blueprint-bench-2)

### 6. AutomationBench

**它想测什么**

衡量 Agent 能否通过 REST API 跨多个业务应用完成端到端 workflow，例如在 CRM 找对记录、处理邮件、日历和消息，再把正确数据写回正确系统。

**数据与评测**

- 来自 Zapier 常见业务流程，覆盖 Sales、Marketing、Operations、Support、Finance、HR；
- Agent 必须自主发现 API endpoint、遵守分层业务规则；
- 环境含相似姓名、格式不一致、无关甚至误导记录；
- 采用 public/private split；
- deterministic、end-state-only grading：只看最终各系统状态是否满足 success criteria，不用 LLM judge。

**图中分数**

- Mythos/Fable 5：17.4%
- Opus 4.8：15.5%
- GPT-5.5：12.9%
- Gemini 3.1 Pro：9.6%

这是较强的企业 Agent 信号，但仍是模拟 API 世界；没有覆盖真实 OAuth、权限审批、供应商故障、组织政治、人工确认和不可逆操作风险。

官方来源：[Zapier AutomationBench](https://zapier.com/blog/introducing-automationbench/)、[论文](https://arxiv.org/abs/2604.18934)

### 7. OSWorld-Verified

**它想测什么**

让多模态 Computer-Use Agent 在真实桌面软件中通过鼠标、键盘和视觉完成任务。典型应用包括 Chrome、LibreOffice、VS Code、GIMP、Thunderbird、VLC 和操作系统文件操作。

**数据与评测**

- Verified 版本约 369 个经人工复核的任务；
- 在可控虚拟机/操作系统环境中执行；
- 通常以任务 success rate / pass@1 计分；
- Verified 版本的目标是修复原 OSWorld 中环境不稳定、任务歧义和 grader 问题。

**图中分数**

- Mythos/Fable 5：85.0%
- Mythos Preview：85.4%
- Opus 4.8：83.4%
- GPT-5.5：78.7%
- Gemini 3.1 Pro：76.2%

这是图中唯一 Mythos Preview 略高的项目，差 0.4 个点，不应视为有意义的能力倒退。模型、视觉解析、动作空间、最大步数、computer-use harness 和环境稳定性都会显著影响结果。

官方来源：[XLang Lab OSWorld-Verified](https://xlang.ai/blog/osworld-verified)

### 8. Legal Agent Benchmark（LAB）

**它想测什么**

模拟大所真实委派：partner 给 associate 一段简短 instruction，Agent 进入一个 client matter，筛选材料并生成可供 review 的法律交付物。

**数据与评测**

- 首版 1,250 个任务，覆盖 24 个法律 practice areas；
- 超过 75,000 条律师编写的 atomic rubric criteria；
- instruction 平均约 50 词，环境混入关键与外围文件；
- 交付物要满足 facts、conclusions、citations、analysis、format 等要求；
- 采用严格 **all-pass**：一个任务只有所有必需 criteria 都通过才计成功。

**图中分数**

- Mythos/Fable 5：13.3%
- Opus 4.8：10.4%
- GPT-5.5：2.1%
- Gemini 3.1 Pro：0.0%

这解释了为何数值极低：它不是“平均满足了多少法律要点”，而是整份工作产品零遗漏通过。它更接近“能否自主交付”，但仍不能替代律师复核，也不能外推到不同法域、时效性法律检索或真实客户责任。

官方来源：[Harvey LAB 方法](https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark)、[初始结果](https://www.harvey.ai/blog/legal-agent-benchmark-initial-results)

### 9. Humanity’s Last Exam（HLE）

**它想测什么**

测试广泛学科中的专家级、封闭式、可验证知识与推理，专门对抗 MMLU 等旧 benchmark 的饱和。

**数据与评测**

- 最终公开论文/当前常用版本约 2,500 道题；早期论文和发布材料常写 3,000，比较榜单时要确认版本；
- 覆盖 100+ 学科，包含 multiple-choice、short-answer 和约 10% 多模态题；
- 由全球大量 subject-matter experts 提交并筛选；
- 题目目标是答案明确、可验证，但不能靠快速网页检索直接回答。

**图中分数**

| 条件 | Mythos/Fable 5 | Preview | Opus 4.8 | GPT-5.5 | Gemini 3.1 Pro |
|---|---:|---:|---:|---:|---:|
| no tools | 59.0%* | 56.8% | 49.8% | 41.4% | 44.4% |
| with tools | 64.58%* | 64.7% | 57.9% | 52.2% | 51.4% |

工具版不再只是闭卷推理，还混入了检索与 tool-use 能力。HLE 衡量的是高难 closed-ended knowledge，不代表能做开放式研究、形成新发现或长期执行专业工作；公开题还会随时间面临 contamination。

官方来源：[HLE 论文](https://arxiv.org/abs/2501.14249)、[项目网站](https://lastexam.ai/)

### 10. BioMysteryBench

**它想测什么**

评估模型能否像 bioinformatics researcher 一样处理 messy real-world data，而不是做生物学选择题。

**数据与评测**

- 99 个由领域专家编写的问题，覆盖多种 bioinformatics 子领域；
- 问题来自受控、客观、可验证的数据属性，不要求先有论文结论；
- Agent 在 container 中获得基础 bioinformatics tools；
- 可通过 pip/conda 安装工具，并访问 NCBI、Ensembl 等 canonical databases；
- 设有 hard subset 和 human-solved subset。

**图中分数**

| 切分 | Mythos/Fable 5 | Preview | Opus 4.8 |
|---|---:|---:|---:|
| hard | 46.1%* | 29.6% | 40.0% |
| human solved | 83.9%* | 82.6% | 80.4% |

“human solved”不是人类总体基线，而是专家参与者成功解出的那部分题；hard 切分更能表现模型处理人类也难解决的数据研究问题。该 benchmark 由 Anthropic 开发并用于自家模型评估，虽有可验证 ground truth，仍需关注 provider-owned benchmark 的选择偏差。

官方来源：[Anthropic BioMysteryBench 研究说明](https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench)、[数据集](https://huggingface.co/datasets/Anthropic/BioMysteryBench-full)

### 11. Terminal-Bench 2.1

**它想测什么**

让 Agent 在隔离 terminal 环境中完成真实、复杂、长周期任务。任务不局限写代码，也包括配置系统、构建项目、处理数据和完成可由 tests 验证的环境变更。

**数据与评测**

- Terminal-Bench 2.0 有 89 个任务；
- 2.1 修复其中 28 个任务，并对外部依赖做持续验证；
- 以任务测试是否通过计 accuracy；
- 同一个模型使用 Claude Code、Codex CLI、Gemini CLI、Terminus 2 等不同 harness，分数可能明显变化。

**图中分数**

- Mythos/Fable 5：88.0%*
- Opus 4.8：82.7%
- GPT-5.5 + Codex CLI：83.4%
- Gemini 3.1 Pro + Gemini CLI：70.7%

图已经明确标了部分 harness，因此它不是纯模型排行榜。89 个任务样本较小，且 2.0→2.1 修复就曾让部分组合上涨 5–12 个点；必须连同 dataset version、harness、资源配额、attempt 数一起引用。

官方来源：[Terminal-Bench 2.1 发布说明](https://www.tbench.ai/news/terminal-bench-2-1)、[运行方法](https://www.tbench.ai/docs/run-terminal-bench-2-1)

### 12. ExploitBench（Cap%）

**它想测什么**

测 Agent 能否把已知 V8 N-day 漏洞从“找到脆弱代码”逐步推进到 crash、exploit primitive、任意读写、程序计数器控制和 arbitrary code execution。

**数据与评测**

- 当前 v8-bench 包含 41 个 V8 漏洞；
- Agent 获得 source tree、修复 commit 前的 git history、简短描述、patch diff、vulnerable/fixed binaries 和调试工具，但没有 reference PoC；
- 每个漏洞由 16 个 grader-verified capability flags、5 个 tier 构成；
- Cap% 对每个漏洞合并 5 seeds 展示过的 flags，除以 16，再对 41 个漏洞取平均；
- grader 会在 vuln/fixed builds、随机 heap layout 和 challenge-response secret 下重放，降低硬编码取巧。

**图中分数**

- Mythos/Fable 5：78.0%*
- Mythos Preview：69.0%
- Opus 4.8：40.0%
- GPT-5.5：34.0%

78% 表示能力旗标覆盖，不表示 78% 漏洞达到任意代码执行。结果还强依赖 seeds、turn budget、AutoNudge、harness 以及是否获得厂商 cyber research access；普通 API policy refusal 也会改变结果。

官方来源：[ExploitBench 官网与方法](https://exploitbench.ai/)、[论文](https://arxiv.org/abs/2605.14153)、[代码](https://github.com/exploitbench/exploitbench)

### 13. HealthBench Professional

**它想测什么**

把 HealthBench 从广义健康对话收窄到真实 clinician chat tasks，覆盖三个用途：care consult、writing/documentation、medical research。

**评测背景**

- 原始 HealthBench 有 5,000 个多轮、多语言健康对话；
- 由 262 位、在 60 个国家执业过的医生参与；
- 共 48,562 条 conversation-specific rubric criteria；
- criteria 带重要性权重，可要求应包含的事实，也可惩罚不该出现的内容；
- 原版用 GPT-4.1 model-based grader 判断每条 criterion 是否满足。

**图中 HealthBench Professional 分数**

- Mythos/Fable 5：66.0%*
- Mythos Preview：64.7%
- Opus 4.8：56.9%
- GPT-5.5：51.8%

这是临床沟通/辅助工作质量信号，不是诊断准确率、患者结局或“可独立行医率”。Rubric grader、对话采样和地区/专业覆盖都限制外推；任何高分模型仍需临床责任主体和 workflow-level safety evaluation。

官方来源：[OpenAI HealthBench](https://openai.com/index/healthbench/)、[HealthBench Professional 发布背景](https://openai.com/index/making-chatgpt-better-for-clinicians/)

## 按“产品决策价值”重新分组

| 你要判断的问题 | 优先看 | 不足以证明 |
|---|---|---|
| Coding Agent 能否做仓库级任务 | SWE-Bench Pro + FrontierCode + Terminal-Bench 2.1 | 真实团队协作、需求澄清、上线责任、长期维护 |
| Enterprise Agent 能否完成跨系统工作 | AutomationBench + GDPval-AA | 企业权限、异常恢复、人工审批、生产可靠率 |
| Computer-use 是否成熟 | OSWorld-Verified | 网站变化、真实账号风控、长周期任务、不可逆动作安全 |
| 专业服务能否交付完整结果 | LAB + GDP.pdf + HealthBench Professional | 法律/医疗责任转移、真实客户接受度和结果责任 |
| 模型是否有高难科研能力 | HLE + BioMysteryBench | 自主提出研究问题、产生新知识、实验复现 |
| Cyber 能力是否达到高风险水平 | ExploitBench | 覆盖所有漏洞类型、真实浏览器完整攻击链、稳定成功率 |
| 是否具备空间理解 | Blueprint-Bench 2 | 机器人导航、3D world model、物理交互 |

## 对这张图的最终判断

这不是一张单纯的“模型智力榜”，而是一张 Anthropic 精心选择的**能力面覆盖图**。它最有价值的信息不是 Mythos/Fable 在 13 行中赢了多少行，而是：

1. 前沿评测正在从回答题目迁移到操作环境和交付 work product；
2. harness、tools、effort、fallback 和 grader 已成为分数不可分割的一部分；
3. 越接近真实工作，越多 benchmark 使用 all-pass、end-state 或 blocker-gated grading；
4. 分数提高仍不等于责任可以交给模型——尤其是 legal、health、cyber 和跨系统写操作。

因此引用这张图时，建议写成“在指定 benchmark、版本与 Agent 配置下的发布结果”，不要简化成“模型完成真实工作的成功率”。

## 数据来源

- [Anthropic Claude Mythos 5 页面](https://www.anthropic.com/claude/mythos)
- [Anthropic Claude Fable 5 / Mythos 5 System Card](https://www-cdn.anthropic.com/2f9323abbcc4abe219577539efe19a623c9ca2bd/Claude%20Fable%205%20%26%20Claude%20Mythos%205%20System%20Card.pdf)
- 上述各 benchmark 的官方论文、项目页、代码仓库与方法页
- [0517-health-bench](/raw/articles/learning-notes/health-bench/)
- [harness-engineering](/wiki/maps/harness-engineering/)

---
*由 LLM 从知识库查询并结合官方来源核验生成*
