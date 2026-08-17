# LLM Benchmark 全景：主流模型卡都在测什么，榜单该怎么看

> 生成时间：2026-07-23
> 查询：现在 LLM 大家都做什么榜单？从其他模型卡片和技术报告理解 benchmark

## 摘要

截至 2026-07，行业已经没有一张公认的“LLM 总榜”。主流模型卡实际使用的是一组 benchmark portfolio：

- **基础能力单元测试**：MMLU-Pro、GPQA、HLE、AIME、LiveCodeBench；
- **模型系统测试**：BrowseComp、MMMU-Pro、长上下文评测；
- **Agent 集成测试**：SWE、Terminal、OSWorld、τ-bench、MCP Atlas；
- **真实交付物测试**：GDPval、Agents’ Last Exam、LAB、HealthBench；
- **安全与前沿风险测试**：AgentHarm、CyberGym、ExploitBench、WMDP、RE-Bench 等；
- **人类偏好榜**：Arena，以及 LLM-judge 驱动的开放式回答评测。

最新趋势不是“题越来越难”这么简单，而是评测对象从**裸模型**变成了**模型 + reasoning setting + system prompt + tools + harness + environment + grader + budget**。因此，同一个 benchmark 名称下的两个分数，也可能并不可比。

最实用的结论是：benchmark 适合做能力筛选和异常发现，不适合替你做采购决策。判断一个模型，应该看一组互补证据，并最终回到自己的真实任务集。

## 1. 先分清五个经常混用的词

| 名称 | 是什么 | 例子 |
|---|---|---|
| Benchmark | 题集/任务集 + 运行协议 + grader + metric | HLE、SWE-Bench Pro |
| Eval | 某个模型按某套配置实际跑一次或多次 benchmark | GPT-5.6 Sol + max + Terminal-Bench 2.1 |
| Leaderboard | 汇集多次 eval 结果并排序的表 | Terminal-Bench leaderboard |
| Arena | 用户匿名比较两个输出，按偏好形成相对排名 | LMArena |
| Model/System Card | 厂商披露模型能力、限制、安全评估和部署决策的文档 | Gemini 3.1 Pro Model Card |

一句话区分：

> Benchmark 是考试；eval 是某个考生按某种考试条件参加考试；leaderboard 是成绩单；model card 是厂商选择公布哪些成绩和风险说明。

技术报告通常比 model card 更强调 architecture、training 和标准公开 benchmark；system card 更强调部署版本、安全能力与 safeguard；产品发布页则会选择最能表现产品定位的 headline results。三者不能当成同一种证据。

## 2. 模型卡现在到底在测谁

### Level 1：裸模型

固定 prompt、无工具、一次回答。主要测：

- 知识；
- 数学与逻辑推理；
- 指令遵循；
- 单次代码生成；
- 图文理解。

典型 benchmark：MMLU-Pro、GPQA Diamond、HLE no-tools、AIME、LiveCodeBench、MMMU-Pro。

### Level 2：模型系统

加入 system prompt、thinking/reasoning effort、搜索、代码执行或其他工具。此时测到的已经是部署系统。

典型例子：

- HLE with tools；
- BrowseComp + Search/Python；
- GDPval-AA 中的 shell 与 web browsing；
- GPT-5.6 的 max / ultra；
- Claude adaptive thinking；
- Gemini Thinking High。

### Level 3：Agent / 产品

模型在 harness 中多轮调用工具、操作环境、维护状态并完成最终交付。

典型 benchmark：SWE-Bench、Terminal-Bench、OSWorld、AutomationBench、LAB。

Agent benchmark 实际测量的是：

`模型 × harness × tool schema × context strategy × budget × environment × grader`

因此“模型 A 在某 Agent benchmark 高 3 个点”不一定意味着裸模型更强。Anthropic 的 Agent eval 方法也明确把 harness 与模型看成联合评测对象。

官方方法：[Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

## 3. 主流模型卡/技术报告的真实样本

本节不是全行业穷举，而是抽样近期官方资料，观察厂商实际上报告哪些 benchmark。

### 闭源前沿模型

| 官方资料 | 主要公开 capability benchmark | 报告风格 |
|---|---|---|
| [OpenAI GPT-5.6 发布与 System Card](https://openai.com/index/gpt-5-6/) | Agents’ Last Exam、GDPval-AA v2、SWE-Bench Pro、DeepSWE、Terminal-Bench 2.1、BrowseComp、OSWorld 2.0、AutomationBench、HealthBench Professional、BenchCAD、ExploitBench、SEC-Bench Pro、LifeSciBench、FrontierMath、GPQA、MRCR/GraphWalks、ARC-AGI-3 | 强调专业工作、Agent、成本/时延、安全与 multi-agent scaling |
| [Anthropic Fable 5 / Mythos 5 System Card](https://www-cdn.anthropic.com/2f9323abbcc4abe219577539efe19a623c9ca2bd/Claude%20Fable%205%20%26%20Claude%20Mythos%205%20System%20Card.pdf) | SWE-Bench Pro、FrontierCode、Terminal-Bench、GDPval-AA、GDP.pdf、Blueprint-Bench 2、AutomationBench、OSWorld、LAB、HLE、BioMysteryBench、ExploitBench、HealthBench | 能力面覆盖广；同时详细披露 cyber/bio safeguard 与 fallback |
| [Google Gemini 3.1 Pro Model Card](https://deepmind.google/models/model-cards/gemini-3-1-pro/) | HLE、ARC-AGI-2、GPQA、Terminal-Bench、SWE Verified/Pro、LiveCodeBench Pro、SciCode、APEX-Agents、GDPval-AA、τ2-bench、MCP Atlas、BrowseComp、MMMU-Pro、MMMLU、MRCR | 表格条件相对清楚，区分 no-tools/tools、harness、single attempt 与 context 长度 |
| [xAI Grok 4.5 Model Card](https://media.x.ai/v1/website/4p5-5184fdf9.pdf) | DeepSWE、APEX-SWE、SWE-Bench Pro/Multilingual、SWE-Marathon、FrontierSWE、Terminal-Bench、GDPval-AA、τ³-banking、DeepSearchQA、CyberGym、HackerBench、生命科学与行为安全 eval | coding 比重高；capability 与 dual-use/safety 放在同一张卡中 |

闭源卡片的共同趋势是：

1. 从静态考试迁移到 Agent、专业工作和真实环境；
2. 开始同时报告 token、cost、latency 和 reasoning effort；
3. 大量使用 private/internal benchmark 延长有效期；
4. system card 中安全 eval 的篇幅越来越大；
5. headline score 越来越代表完整产品配置，而不是裸模型。

### 开源 / 开放权重模型

抽样 6 家近期官方模型卡/技术报告：DeepSeek-V4-Pro、Qwen3.6、Kimi-K2.5、Llama 4、Mistral Medium 3.5、GLM-5.2。

| Benchmark 家族 | 在 6 家样本中出现 | 主要用途 |
|---|---:|---|
| MMLU-Pro | 4/6 | 通用知识与推理基线 |
| HLE | 4/6 | 高难专家知识与多领域推理 |
| GPQA-Diamond | 4/6；Qwen 另报 GPQA | 高难研究生级科学问答 |
| AIME | 4/6 | 数学竞赛推理 |
| HMMT / IMOAnswerBench | 各 4/6 | 更难数学与奥赛答案 |
| LiveCodeBench | 4/6 | 较新、滚动更新的代码生成 |
| SWE-Bench Verified | 4/6 | 历史上常用的仓库级 coding Agent |
| SWE-Bench Pro | 4/6 | 更长周期的仓库级 coding |
| Terminal-Bench 2.x | 4/6 | 终端环境中的 Agent 执行 |
| SWE-Bench Multilingual | 3/6 | 多语言仓库级 coding |
| BrowseComp | 3/6 | Agentic web research |
| MCP Atlas | 3/6 | MCP 工具与多步 workflow |
| MMMU-Pro / MathVista | 各 3/6 | 多模态理解与推理 |
| LongBench-V2 | 2/6 | 长上下文理解 |

官方样本来源：

- [DeepSeek-V4-Pro Model Card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [Qwen3.6-35B-A3B Model Card](https://huggingface.co/Qwen/Qwen3.6-35B-A3B)
- [Kimi-K2.5 官方仓库与报告](https://github.com/MoonshotAI/Kimi-K2.5)
- [Llama 4 Maverick Model Card](https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct)
- [Mistral Medium 3.5 Model Card](https://huggingface.co/mistralai/Mistral-Medium-3.5-128B)
- [GLM-5.2 Model Card](https://huggingface.co/zai-org/GLM-5.2)

开放权重技术报告仍保留大量公共标准 benchmark，原因包括：

- 需要证明 pretraining 与 post-training 的基础质量；
- 社区需要可重复运行、可与不同参数规模比较的标准任务；
- 通常要分别报告 base model、instruct model、thinking/non-thinking；
- 评测成本必须能由社区承担。

但“模型声明支持 1M context”不等于“已证明 1M 内都能正确推理”。在上述样本中，有模型公布了巨大 context window，却没有同步提供专门 long-context benchmark。

## 4. 现在最常见的 11 类 Benchmark

### 4.1 通用知识与科学推理

| Benchmark | 测什么 | 现在怎么看 |
|---|---|---|
| MMLU / MMLU-Pro | 多学科选择题 | MMLU 原版更适合历史回归；前沿比较优先 Pro |
| GPQA Diamond | 专家级科学知识与推理 | 仍常见，但前沿分数已接近 90%+，判别空间变小 |
| HLE | 100+ 学科的高难、可验证问题 | 当前常见综合难题；需区分 no-tools / with-tools 与版本 |
| SimpleQA / Omniscience | 短事实回答与幻觉 | 要同时看正确、错误与拒答/不确定性 |

它们主要回答“模型是否知道、是否能推出来”，不能证明它会完成长周期工作。

### 4.2 数学与抽象推理

| Benchmark | 测什么 | Caveat |
|---|---|---|
| AIME | 30 道竞赛数学题 | 样本极小、年度难度波动大；pass@k 与 pass@1 不能混 |
| MATH-500 | 竞赛级数学子集 | 已接近饱和，更适合回归 |
| FrontierMath | 高难专业数学 | 更难、更私密，但 grader 与 access 成本高 |
| ARC-AGI | 从少量示例归纳抽象变换 | 与语言知识不同；test-time compute 影响很大 |

数学 benchmark 的优势是答案可验证，弱点是范围窄、容易被大量采样和 verifier 放大。

### 4.3 单次代码生成

| Benchmark | 测什么 | 现状 |
|---|---|---|
| HumanEval / MBPP | 从描述生成短函数 | 经典但小、公开、测试覆盖有限 |
| EvalPlus / HumanEval+ | 用更强测试重新审查代码 | 能暴露“原测试通过但实现错误” |
| LiveCodeBench | 持续加入新竞赛题 | 抗污染较好，但代表 competitive programming，不是软件工程 |
| SciCode | 科研问题中的代码实现 | 比普通算法题更贴近科学工作 |

### 4.4 Coding Agent

| Benchmark | 测什么 | 关键条件 |
|---|---|---|
| SWE-Bench 系列 | 阅读仓库与 issue，提交 patch | dataset split、harness、测试、attempt、budget |
| Terminal-Bench | 在 terminal 中完成复杂任务 | dataset 2.0/2.1、CLI/harness、VM 资源 |
| FrontierCode / DeepSWE / FrontierSWE | 更难或更重质量的工程任务 | 有的看测试，有的看 maintainer rubric 或更长 horizon |

这里测的是 Agent 系统，不是单纯“会不会写代码”。

### 4.5 Tool Use 与业务 Agent

| Benchmark | 测什么 |
|---|---|
| BFCL | function/tool selection、参数正确性和多轮调用 |
| τ-bench / τ² / τ³ | 客服或业务流程中，Agent 与用户/环境协作 |
| MCP Atlas / MCPMark | 通过 MCP 完成多工具、多步 workflow |
| AutomationBench | 跨 SaaS REST API 执行工作流，以最终环境状态评分 |
| Toolathlon / Tool-Decathlon | 多种工具组合与长链执行；二者是不同 benchmark，不能因名字相近合并 |

### 4.6 Search、Research 与 Computer Use

| Benchmark | 测什么 | 不代表什么 |
|---|---|---|
| BrowseComp | 搜索、网页浏览、证据整合 | 不等于开放式科研 |
| DeepSearchQA | 更长搜索链与研究回答 | 依赖搜索工具、网站状态与 citation grader |
| OSWorld / OSWorld 2.0 | 操作真实桌面软件 | 不等于所有网站和账号环境都可靠 |
| WebArena | 在网站环境中完成任务 | 模拟环境与真实线上仍有差距 |

### 4.7 专业工作与交付物

| Benchmark | 测什么 | 评分方式 |
|---|---|---|
| GDPval / GDPval-AA | 44 种职业的文档、表格、slides 等工作产品 | 人类/模型盲评、win/tie 或 Elo |
| Agents’ Last Exam | 55 个专业领域的长周期 Agent workflow | 多阶段工作流完成质量 |
| APEX-Agents | 跨应用的专业服务任务 | 长 horizon、tool use |
| Legal Agent Benchmark | 法律 client matter 与交付物 | 所有 rubric criteria 全过才计成功 |
| HealthBench Professional | clinician chat 与专业医疗任务 | 医生编写 rubric |

这一类生态效度更高，但更贵、更难复现，也经常依赖 LLM judge 或私人任务。

### 4.8 多模态与专业文档

| Benchmark | 测什么 |
|---|---|
| MMMU-Pro | 跨学科图文理解与推理，并减少文本捷径 |
| MathVista | 视觉数学推理 |
| ChartQA / CharXiv | 图表与科研图像 |
| DocVQA / OmniDocBench | 文档 OCR、layout、表格与问答 |
| GDP.pdf | 真实专业 PDF 中的 grounded multimodal reasoning |

多模态成绩必须确认模型是否真的收到原图、图像分辨率、是否使用 OCR/tool，以及纯文本是否也能解题。

### 4.9 长上下文

| Benchmark | 测什么 | 现在的要求 |
|---|---|---|
| Needle-in-a-Haystack | 在长文本中找到一个事实 | 已太简单，只能当连通性测试 |
| RULER | 多 needle、多跳、聚合 | 比单 needle 更有判别力 |
| MRCR | 多轮 coreference 与长上下文追踪 | 应分 128K、256K、1M 等长度报告 |
| GraphWalks | 在超长图结构中追踪路径 | 侧重结构化长程推理 |
| LongBench-V2 | 多类长文档理解 | 适合开放权重模型统一比较 |

Window size 是容量规格，不是能力得分。

### 4.10 Human Preference

LMArena 让用户在匿名条件下选择更喜欢的回答，再用 Bradley-Terry/Elo 类模型形成相对排名。

它很适合回答：

- 哪个聊天模型的总体体验更讨喜；
- 风格、清晰度、帮助感是否更好；
- 用户在真实 prompts 上偏好什么。

它不能单独回答：

- 哪个答案更真实；
- 哪个 Agent 完成了任务；
- 哪个模型更安全；
- 哪个模型在你的专业领域更可靠。

官方方法：[LMArena](https://lmarena.ai/)、[Chatbot Arena 论文](https://arxiv.org/abs/2403.04132)

### 4.11 Safety 与 Frontier Risk

安全卡片关注的不是“回答得好不好”，而是能力和防护是否越过风险阈值。

| 领域 | 常见 benchmark / eval |
|---|---|
| 普通有害请求与 jailbreak | HarmBench、StrongREJECT、内部 refusal suites |
| Agent misuse / prompt injection | AgentHarm、AgentDojo |
| Cyber | WMDP-Cyber、CyberGym、CyBench、ExploitBench、CTF |
| Biology / Chemistry | WMDP Bio/Chem、ProtocolQA、VCT、BioLP、BioMysteryBench |
| AI R&D / autonomy | RE-Bench、METR time horizon、internal research engineering evals |
| Deception / manipulation | MASK、sycophancy、persuasion evals |

安全能力分数和 safeguard 后的部署表现要分开。去掉 safeguards 后的高 cyber 分，表示底层能力更强；不等于公开产品能直接完成同样任务。

## 5. 分数口径：最容易读错的地方

| 指标 | 正确解释 | 常见误读 |
|---|---|---|
| Accuracy / exact match | 答对比例 | 把猜对当理解；忽略校准与成本 |
| Pass@1 | 单次尝试成功比例 | 忽略随机性与 prompt |
| Pass@k | k 次中至少一次成功的概率 | 与 pass@1 直接放同一排行榜 |
| pass^k | 连续 k 次都成功的概率 | 误当 best-of-k；其实它衡量重复可靠性 |
| Rubric score | 满足 criteria 的加权比例 | 误当完整任务通过率 |
| All-pass | 所有必需条件都过才成功 | 认为低分等于完全没能力 |
| Elo / Bradley-Terry | 在特定参赛池中的相对排名 | 当作绝对智力刻度 |
| LLM-judge score | 某 judge 按 rubric 给分 | 忽视长度、位置、自偏好和 judge 能力 |
| Capability coverage | 能力阶梯中覆盖多少 flags | 误当多少任务完整完成 |
| Time horizon | 50% 成功率对应的人类任务时长 | 误当 Agent 真实连续工作时长 |

代码中的 pass@k 定义来自 [Codex / HumanEval 论文](https://arxiv.org/abs/2107.03374)；Agent 重复可靠性则更应该同时关注 pass@1、pass@k 和 pass^k。

## 6. 为什么模型卡数字经常互相打架

### 6.1 Benchmark 版本不同

例如：

- Terminal-Bench 2.0 与 2.1；
- OSWorld-Verified 与 OSWorld 2.0；
- SWE-Bench Verified、Pro、Multilingual；
- GDPval 与 GDPval-AA v1/v2。

这些不是同一张卷子。

### 6.2 Harness 不同

同一个模型可能通过 Claude Code、Codex CLI、Gemini CLI、Terminus、mini-SWE-agent 或厂商内部 Agent 运行。Harness 决定：

- tools；
- prompt；
- context compaction；
- retry；
- memory；
- stopping condition；
- test/recovery loop。

### 6.3 推理与预算不同

常见变量包括：

- low / medium / high / xhigh / max；
- adaptive thinking；
- token/turn/time cap；
- 1 agent / 4 agents / 16 agents；
- single attempt / multiple attempts；
- best-of-N / majority vote / verifier selection。

例如 GPT-5.6 的 `ultra` 默认协调 4 个 Agent，不能与单 Agent 分数直接称为“同条件模型比较”。

### 6.4 Grader 不同

- exact match；
- unit tests；
- final environment state；
- deterministic flags；
- expert rubric；
- LLM-as-judge；
- human pairwise preference。

这些 grader 对“什么叫成功”的定义不同。

### 6.5 基础设施噪声

VM CPU/RAM、网络、依赖、网站变化和 rate limit 都会影响 Agent。Anthropic 的基础设施实验显示，Terminal-Bench 中资源配置能造成约 6 个百分点差异，因此小于约 3 点的领先需要谨慎解释。

官方来源：[Anthropic — Infrastructure noise in agentic evaluations](https://www.anthropic.com/engineering/infrastructure-noise)

### 6.6 版本和样本选择漂移

- 模型 API alias 可能更新；
- dataset 可能修复任务；
- leaderboard 可能展示最佳 run；
- 厂商发布页可能选自己最强的 benchmark；
- private benchmark 外界无法完整审计。

## 7. 哪些经典榜单已经不适合证明“前沿”

| 经典 benchmark | 现在的问题 | 更合理的替代/补充 |
|---|---|---|
| GLUE / SuperGLUE | 已饱和，主要是历史 NLP 回归 | HELM、多维现代任务 |
| MMLU | 成绩高、题目公开、噪声和污染 | MMLU-Pro、GPQA、HLE |
| BIG-Bench / BBH | 多个子集接近满分 | BBEH、更新的专业推理 |
| GSM8K | 模式固定、存在 overfitting 信号 | 新年度数学题、Omni-MATH |
| MATH-500 | 前沿模型接近 97%+ | FrontierMath、AIME/HMMT 新题 |
| HumanEval | 164 题、测试覆盖不足 | EvalPlus、LiveCodeBench |
| Needle-in-a-Haystack | 只证明简单检索 | RULER、MRCR、GraphWalks |
| SWE-Bench Verified | 污染、欠规格与测试缺陷 | 不能只换榜；需使用多组新鲜/private coding eval |
| SWE-Bench Pro public | 2026-07 审计估计约 30% 任务有问题 | 只作次级信号，搭配 Terminal、FrontierCode/DeepSWE 和私有任务 |

“旧”不等于完全没用。它们仍适合：

- 回归测试；
- 小模型比较；
- 兼容历史结果；
- 检查某项基础能力是否严重退化。

但不再适合单独支撑“模型已经具备前沿通用智能”。

官方证据：

- [MMLU-Pro 论文](https://arxiv.org/abs/2406.01574)
- [EvalPlus / HumanEval+](https://arxiv.org/abs/2305.01210)
- [RULER](https://arxiv.org/abs/2404.06654)
- [OpenAI：SWE-Bench Verified 不再适合前沿评测](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)
- [OpenAI：SWE-Bench Pro public split 审计](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)

## 8. 读模型卡时的检查清单

看到一条 benchmark 分数时，至少找齐：

1. **模型 snapshot**：具体版本，不只是产品名；
2. **benchmark version / split**；
3. **是否有 tools / search / code execution**；
4. **Agent harness / CLI**；
5. **system prompt 与 reasoning effort**；
6. **token / turn / time budget**；
7. **attempt 数、pass@k、并行 Agent 数**；
8. **grader 类型**；
9. **样本数、trial 数、置信区间**；
10. **成本、延迟与输出长度**；
11. **是否 provider-run、independent-run 或 self-reported**；
12. **是否公开任务、可能污染、是否刚被修订**。

如果一张图只给模型名和百分比，适合把它看成**发布方 capability claim**，不适合作为最终采购证据。

## 9. 2026 年一个更合理的最小评测组合

这不是新“总榜”，而是一组互补信号：

| 需要判断的能力 | 推荐至少看 |
|---|---|
| 基础知识与科学推理 | HLE no-tools + GPQA / MMLU-Pro |
| 数学 | 新年度 AIME/HMMT + FrontierMath 或其他私有高难题 |
| 单次代码 | LiveCodeBench + EvalPlus |
| Coding Agent | Terminal-Bench 2.1 + 新鲜/private repo tasks；SWE 只作补充 |
| Tool Use | BFCL + τ-bench / MCP Atlas |
| Web research | BrowseComp + 自己的 citation/grounding eval |
| Computer Use | OSWorld 2.0 + 自己真实应用 workflow |
| 专业工作 | GDPval / Agents’ Last Exam + 垂直领域 rubric eval |
| 多模态文档 | MMMU-Pro + GDP.pdf / 自己的 PDF 与图表 |
| 长上下文 | RULER/MRCR/GraphWalks，并按长度分段报告 |
| 聊天体验 | Arena / 盲化人类偏好 |
| 安全与可靠性 | 正常任务成功率 + 错误拒绝 + jailbreak ASR + pass^k |
| 产品经济性 | cost/task + latency + tokens + human intervention rate |

这里最后一行通常比“总榜第一”更接近商业结果。

## 10. 如果是为自己的产品选模型

推荐按四层做：

### 第一层：公共 benchmark 做初筛

排除明显能力不足、成本不合适或 modality 不匹配的模型。

### 第二层：自己的任务集

从真实用户任务抽样，保留：

- 正常案例；
- 长尾案例；
- 容易误解的指令；
- 缺少信息时应该澄清/拒绝的案例；
- 需要工具、文件和多步执行的案例。

### 第三层：结果与责任

不要只打“答案好不好”，而要检查：

- 最终结果是否完整；
- 是否有证据；
- 是否造成错误 side effect；
- 失败是否被发现；
- 是否能恢复；
- 谁需要人工复核。

### 第四层：经济性和稳定性

至少报告：

`task success｜pass^3｜成本/任务｜P50/P95 延迟｜平均 turns｜人工介入率｜不可恢复失败率`

这才是产品 benchmark。

## 结论

LLM benchmark 正在经历三次迁移：

1. **从知识考试到可验证推理**：MMLU → GPQA/HLE/FrontierMath；
2. **从单次回答到环境执行**：HumanEval → LiveCodeBench → SWE/Terminal/OSWorld；
3. **从能力展示到真实交付**：accuracy → rubric/all-pass/end-state → 成本、延迟、稳定性与责任。

所以，不应再问“哪个模型总榜第一”，而应问：

> 它在我关心的任务上，以什么工具、什么预算、什么 grader、多少次尝试，稳定地产出什么结果；失败时是否能被发现和恢复？

这才是 benchmark 对产品真正有用的地方。

## 数据来源

- [OpenAI GPT-5.6 release](https://openai.com/index/gpt-5-6/)
- [OpenAI GPT-5.5 release](https://openai.com/index/introducing-gpt-5-5/)
- [Anthropic model system cards](https://www.anthropic.com/system-cards)
- [Google DeepMind model cards](https://deepmind.google/models/model-cards/)
- [xAI Grok 4.5 Model Card](https://media.x.ai/v1/website/4p5-5184fdf9.pdf)
- 上述开放权重模型的官方 model cards / technical reports
- [Stanford HELM](https://crfm.stanford.edu/2022/11/17/helm.html)
- [Artificial Analysis eval methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)
- [claude-mythos-5-benchmark-details-2026-07-23](/output/reports/claude-mythos-5-benchmark-details-2026-07-23/)
- [harness-engineering](/wiki/maps/harness-engineering/)

---
*由 LLM 从知识库查询并结合官方模型卡、技术报告与 benchmark 原始资料核验生成*
