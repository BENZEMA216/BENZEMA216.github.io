<!--
status: superseded
status_reviewed: 2026-07-17
evidence_level: future-thesis
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# Agora

> [!warning] 已被当前 Combo 叙事取代
> 本文是 Agent Capability Package 与长期平台架构的历史 BP，不再作为当前融资材料。当前公司真源见 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)；投资人反馈见 [combo-investor-learning-synthesis-2026-07-17](/output/reports/combo/fundraising/combo-investor-learning-synthesis-2026-07-17/)。

古希腊的开放市场广场，是人类历史上第一个自由交易的公共空间。今天，我们要让 Agent 的能力也能自由发布、分发和交易。

**Slogan**：Not one genius. Millions.

> 阅读方式：前 12 节是 Pitch 主文，适合投资人第一遍快速阅读；Appendix 保留定义、订阅机制、工程细节、financial model、Q&A 和 references。

---

## Pitch 主文

### 1. 一句话

**Agora 是面向 Agent 创作者的 Agent 能力包发布与分发平台。**

现有协议正在解决 Agent 怎么连接工具、怎么互相通信；Agora 解决下一层问题：

**一个真正有能力的 Agent，如何被完整打包、可信发布、跨用户运行、持续变现？**

我们的核心 primitive 是 **Agent 能力包（Agent Capability Package）**：把一个 Agent 的 prompt、skills、workflow、tool config、memory、context、测试集、权限边界和运行要求打包成可分发单元。

技术上，能力包由一次发布时的 **versioned snapshot** 生成；商业和产品上，用户购买、安装、运行的是一个可验证、可更新、可计费的 **能力包**。

---

### 2. 为什么现在：AI 能力很强，但 GDP 贡献还没释放

先不从“未来一定是无数专精 Agent 的网络”讲起。更稳的起点是一个 productivity gap：

**AI / Agent 的能力在快速增长，但这些能力还没有充分变成真实生产率和 GDP 贡献。**

原因不是模型完全做不了事，而是“会用 Agent 完成任务”的 know-how 仍然停留在少数人、少数团队、少数机器里。大量企业和个人还停在 demo、prompt、内部脚本和一次性自动化，因为能力没有进入可复制、可安装、可验证、可维护的生产流程。

所以 Agora 要解决的不是“让大家相信一个宏大 Agent 网络”，而是一个更具体的生产率 bottleneck：

**怎么把已经有人调出来、已经能完成任务的 Agent 能力，更快分发给别人使用。**

| 为什么 AI/Agent 还没有充分变成 GDP | 对 Agora 的启发 |
|---|---|
| 工作流 know-how 分散在人和团队里 | 要把成熟 workflow 打成可安装、可复用的能力包 |
| 部署和集成成本太高 | 用户需要一键安装、资源绑定、runtime adapter，而不是自己读 README |
| 权限、隐私、凭据和本地环境复杂 | 需要 resource schema、local binding、hybrid execution |
| 任务成功率无法验证 | 需要 smoke tests、canonical tests、版本回归 |
| 失败后没人能归因 | 需要 event ledger 和明确的 support boundary |
| 创作者缺变现路径 | 需要订阅、分账、更新渠道和 reputation |

这也是为什么新技术通常会出现 productivity J-curve：早期需要大量看不见的互补资产，生产率和 GDP 贡献不会立刻释放；等 workflow、组织流程、工具链和分发机制补齐，价值才会突然兑现。

外部资料给出了同一方向的信号：

| 外部锚点 | 含义 |
|---|---|
| [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025) 预测 2026 年底 40% 企业应用将包含 task-specific AI agents，2025 年低于 5% | Agent 正从功能点进入企业应用主流程 |
| [McKinsey](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier) 估算 generative AI 可带来每年 $2.6T-$4.4T 经济价值 | AI 的价值来自具体业务流程，而不是模型本身 |
| [The Productivity J-Curve](https://www.aeaweb.org/articles?id=10.1257%2Fmac.20180386&page=438) 指出通用技术需要互补无形资产，价值释放会滞后 | Agent 的 bottleneck 会落在 workflow、测试、组织和分发 |
| [MIT NANDA / GenAI Divide](https://www.searchyour.ai/archivos/genai-divide-state-ai-business-2025-mit-nanda-report.pdf) 指向大量 GenAI pilot 无法转成 P&L impact，常见原因是集成和工作流适配不足 | 市场缺的不是更多 demo，而是能进入真实工作的能力交付层 |

Agora 要押的不是“大家都会相信一个宏大 Agent 网络”，而是一个更具体的痛点：

**那些已经有人调出来、已经能完成任务的 Agent 能力，今天很难被别人安装、验证、运行、更新和付费使用。**

---

### 3. 现在的问题：能力存在，但不能商品化

今天已经有大量 AI 原生创作者在构建能力：

| 供给形态 | 当前状态 | 问题 |
|---|---|---|
| GPTs | 大量创建与上架 | 分成弱，能力传递浅 |
| MCP servers | GitHub 上大量开源 repo | 几乎没有结算层 |
| Claude Code Skills | 创作者已经会写 skill | 没有 marketplace 和付费分发 |
| n8n / Zapier workflows | 大量模板 | 更偏自动化，不是 Agent 能力交易 |
| 垂直工作流脚本 | 真实好用 | 只能私下传播，无法可信交易 |

问题不是供给不存在，而是 **供给没有被产品化成可交易单位**。

现有协议也没有回答这些问题：

- 能力如何作为商品被打包？
- 什么内容应该随 Agent 一起发布，什么必须剥离？
- 如何证明一个 Agent 到了新用户那里仍然有效？
- 如何收费、分账、治理、退款、下架？
- 如何让用户运行 Agent，但不泄露自己的 cookie、文件和账号？

所以更准确的说法不是“完全空白”，而是：

**已有很多单点分发形态，但缺一个跨 runtime、本地友好、可验证、可计费的 Agent 能力商品化层。**

更细的竞品对比可以放到 Q&A。主文只需要说明一个事实：GPT Store、Coze、Claude Skills、MCP registry、GitHub repo、n8n template 都证明“能力分发”已经有人在做；但它们大多只解决 bot、tool、code 或 workflow template 的分发，还没有把完整 Agent 能力变成可安装、可验证、可更新、可付费的商品单位。

#### Claude 的产品节奏正在放大这个缺口

Claude 最近的产品节奏也在验证这个判断：Agent 正在从聊天界面进入生产基础设施，但这些基础设施主要仍在一方平台内部成熟。

| Claude 正在补齐的层 | 代表动作 | 对行业的含义 |
|---|---|---|
| 开发者工作台 | Claude Code desktop、parallel agents、session management | 开发者会越来越习惯把 Agent 当工作环境，而不是聊天窗口 |
| 云端生产运行 | Managed Agents、memory、checkpoint、sandbox、credentials | 通用 runtime 会被模型厂和云厂持续上移吃掉 |
| 外部系统连接 | MCP、connectors、OAuth、tool discovery | 工具连接层会逐渐标准化，单纯做 connector 不够 |
| 能力模块化 | Skills、routines、multi-agent patterns | Agent 能力开始有了可复用的“模块形态” |
| 安全与治理 | 权限、审计、隔离、凭据管理 | 第三方能力分发必须按 supply chain security 设计 |

这给 Agora 的启发不是“我们也做一个 Claude runtime”，而是相反：runtime、connector、memory、routine 会越来越多地被模型厂和云厂补齐；开放生态里更缺的是 **第三方能力如何跨 runtime 被发布、安装、验证、更新、计费和分发**。

换句话说，Claude 正在把 Agent 变成生产系统；Agora 要把第三方 Agent 能力变成生产资料商品。

---

### 4. 我们的答案：Agent 能力包

Agora 不是另一个 Agent runtime。Agora 要做的是：**让第三方 Agent 能力变成可交付商品。**

一个成熟 Agent 的能力不只是 prompt，也不只是 code。它来自完整运行态。

更宏观地说：**信息损失越少，能力传递越完整。**

一个专家能把 Agent 用好，通常不是因为他有一句神奇 prompt，而是因为他同时拥有任务判断、工具配置、失败经验、评价标准、上下文选择和权限边界。只复制 prompt，等于只复制了能力的一小部分。

- 它知道何时用哪个 tool
- 它有稳定的多步 SOP
- 它有从历史任务中沉淀的判断规则
- 它知道常见失败模式和避坑方式
- 它有一组能证明能力可迁移的测试案例
- 它有自己的权限边界和运行环境约束

**Agent 能力包是 Agent 经济里的“应用包 + 运行态 + 测试集 + 权限声明”。**

它保留能力迁移所需的信息，同时剥离隐私和凭据：

| 保留 | 剥离 |
|---|---|
| workflow、判断框架、失败经验、tool config、canonical tests、可复用上下文 | API key、OAuth token、cookie、密码、PII、私有文件原文 |

**Snapshot 适合描述技术动作，不适合作为主叙事。** 我们的商品不是一张静态截图，而是可安装、可运行、可验证、可更新、可计费的能力。

从产品结构上，能力包 v0.1 应该顺着现有 Agent 生态的原语长出来，而不是发明一套孤立格式：

| 能力包组件 | 作用 |
|---|---|
| `skill/` | prompt、方法论、领域知识、示例和资源文件 |
| `mcp.json` | 需要接入的工具、MCP server、OAuth scope |
| `runtime.json` | Claude Code / Codex / Cursor / Agent-VM 的适配声明 |
| `memory_schema.md` | 哪些状态可以长期记忆，哪些只能临时处理 |
| `routines.yaml` | schedule、webhook、API trigger 等触发方式 |
| `tests/` | smoke test、capability test、permission test、regression test |
| `pricing.yaml` | license、update channel、support boundary、hosted protected step |
| `manifest.lock` | 版本、依赖、hash、发布者签名、兼容矩阵 |

#### 多 Agent 使用方式：能力包不是孤立 app

能力包的最小售卖单位可以是一个 Agent，但用户未来的真实使用方式不会停在“买一个 Agent，然后手动打开它”。更自然的形态是：用户有一个主 Agent / 工作台 / orchestrator，它在任务过程中按需调用多个专业能力包。

也就是说，Agora 分发的不是一个个封闭 bot，而是能被人类、主 Agent 或其他 Agent 调用的 **专业能力模块**。

| 使用方式 | 用户怎么用 | 对能力包的要求 |
|---|---|---|
| 单能力包直用 | 用户安装一个能力包，直接完成一个任务 | 安装简单、权限清楚、smoke test 能跑通 |
| 主 Agent 调用能力包 | 用户自己的 Claude Code / Codex / Cursor / Agent-VM 在任务中调用某个专业能力 | 能力包要有清楚的输入输出、权限边界、失败模式和成本说明 |
| 多能力包串联 | 一个任务被拆给多个专业 Agent：研究、写作、设计、发布、监控分别由不同能力包完成 | 需要 event ledger、版本兼容、调用链追踪、分账和失败归因 |
| 团队工作流组合 | 团队把多个能力包固定成一个可复用 SOP | 需要 private registry、team policy、统一版本和审计 |

例子：

- 小红书运营：趋势研究能力包 → 选题评分能力包 → 图文生成能力包 → 发布检查能力包 → 评论回复能力包。
- 代码仓库维护：repo onboarding 能力包 → 测试生成能力包 → code review 能力包 → release note 能力包。
- 多模态创作：脚本能力包 → 分镜能力包 → 图像风格能力包 → 视频生成能力包 → 质量检查能力包。

这解释了为什么能力包必须包含 `manifest`、`permissions`、`tests`、`pricing` 和 `runtime adapter`。如果能力包只是给人看的 prompt，它不需要这些；但如果它要被另一个 Agent 安全调用、组合、计费和更新，就必须从第一天设计成可组合的生产资料。

Agora 的长期价值也在这里：早期先证明单个能力包能被安装和跑通；之后平台会逐渐从“能力包 marketplace”变成 **Agent 能力组合网络**，让不同创作者的专业能力可以被主 Agent 编排、复用和结算。

---

### 5. 产品路径：先跑通一个极窄闭环

> [!warning] 历史路线
> 本节记录 2026 年 6 月 Agora BP 的产品时间表，不是 Combo 当前路线。当前验证计划见 [combo-one-vertical-validation-2026-07](/output/reports/combo/gtm/combo-one-vertical-validation-2026-07/)；Agent-VM 仅保留为历史技术资产。

当时 Agora 计划的第一步不是做一个大而全 marketplace，而是用 AI 团队的速度，先跑通一个极窄闭环：**一个创作者 workflow → 一个能力包 → 一个用户本地成功运行 → 一次付费/复购信号。**

| 阶段 | 时间 | 目标 | 核心交付 |
|---|---|---|---|
| 0-2 周 | Agent-VM + 手工 Publisher | 把 1 个真实 workflow 打成可安装 profile | Agent Profile、凭据剥离、安装说明、1 个 smoke test |
| 3-4 周 | 3 个标杆能力包 | 证明不同类型 workflow 能复用同一套打包流程 | 中文 listing、权限说明、3-5 个 canonical tests、试用用户 |
| 5-8 周 | 10 个种子创作者 / 100 个种子用户 | 证明用户能在自己的 runtime 里跑通 | Agent-VM 安装、资源绑定、失败归因、更新反馈 |
| 9-12 周 | 付费 pilot | 证明用户愿意为结果、更新和支持付费 | 订阅/年费/usage bundle、creator payout、case study |
| 3-6 个月 | 小型 marketplace beta | 从强运营转向半自动化 | registry、搜索、结算、版本频道、质量分 |

当时不应先讲“终局是一张 Agent 执行互联网”。对当时 BP 更重要的是：**先证明一个具体的服务循环能跑起来。**

**当时正在做的第一版尝试是 Agent-VM。**

项目地址：[https://github.com/xz1220/Agent-VM](https://github.com/xz1220/Agent-VM)

Agent-VM 是 AI Coding Agent 时代的 `nvm`：用一个本地 CLI 管理可迁移的 Agent Profile，把同一个 agent 的角色、工具、权限、模型设置和 memory refs 投射到 Codex、Claude Code、Cline、Cursor 等不同 runtime。它不是最终的 Agora marketplace；在该历史路线中，它被用于验证 Agora 最底层的几个假设：

| Agora 假设 | Agent-VM 正在验证什么 |
|---|---|
| Agent 需要一个可迁移的定义对象 | Agent Profile 成为 role、tools、permissions、model_run、memory_refs 的 source of truth |
| 能力包必须适配不同 runtime | adapter 把 profile 渲染到 Codex / Claude Code / Cline / Cursor，并输出 mapping status |
| 发布不能泄露用户资产 | `avm init` 只读导入，`avm use` 只写 managed paths，写前做 backup / conflict detection |
| 能力需要可导入导出 | `avm export` / `avm import` 已经提供 profile package 的第一版形态 |

所以 Agent-VM 在历史上被定位为 Agora 的本地 installation / activation layer 原型：先把“一个 Agent 能被定义、迁移、激活”做实，再尝试升级为可发布、可验证、可计费的 Agent 能力包。

---

### 6. 切入策略：从最容易付费的能力包开始

当时设想的切入不是“所有 Agent 都来上架”，而是从最容易形成高价值能力包的两类场景开始。

这个选择和 Anthropic / Claude Code 生态的现实很接近：早期真正愿意配置、调试、付费和反馈 Agent 的，不是泛人群，而是两类高强度用户：

1. **创作者**：已经有可复用 workflow，结果可展示，愿意为了变现持续维护。
2. **程序员 / power users**：已经在 Claude Code、Codex、Cursor、MCP 里工作，能理解 runtime、权限和本地执行。

我们暂时不服务“所有人都来买一个通用 Agent”。越早期，越应该只服务能给出高质量反馈、能承受安装成本、能贡献真实 workflow 的人。

**第一类：多模态创作 Agent。**  
Benzema 做过 Seedance 1.0 / 2.0、即梦 Web Agent、剪映 AI 视频工具，直接接触中国最活跃的 AI 创作者社群。我们可以从多模态创作链路开始，把成熟创作者的 workflow 打包成能力包：

- 封面设计 Agent
- 短视频脚本到分镜 Agent
- 图生视频工作流 Agent
- 电商素材生成 Agent
- 漫剧角色一致性 Agent

**第二类：个人账号 / 本地执行 Agent。**  
这类 Agent 结构性不能完全上云，因为它依赖用户自己的账号、cookie、本地文件或设备环境。

- 小红书 / 抖音 / 淘宝账号运营
- 租房信息聚合与避雷
- 个人知识库研究 Agent
- 本地文件整理和工作流自动化
- 私域数据分析

这正是 hybrid execution 的优势：**平台负责分发、计费、审计；用户本地 runtime 负责拿自己的账号和数据执行。**

---

### 7. 冷启动操作计划

这部分不靠“我们认识很多人”来讲，而是靠一个可执行计划。

**30 天目标：做出 3 个能跑的能力包，不追求规模。**

| 动作 | 数量 | 交付 |
|---|---:|---|
| 约访创作者 | 20 人 | 找到已经有真实 workflow 的人，而不是只会写 prompt 的人 |
| 深度共创 | 5 人 | 每人拆出 1 个可打包 workflow |
| 标杆能力包 | 3 个 | 每个都有 listing、安装、resource schema、smoke test |
| 种子用户 | 30-50 人 | 每个能力包至少 10 个用户真实安装 |
| 付费信号 | 3-5 笔 | 年费、项目费、订阅或 usage bundle 都可以 |

**90 天目标：证明一个小循环能转起来。**

| 指标 | 目标 |
|---|---:|
| 可发布能力包 | 10 个 |
| 完成安装的用户 | 100-300 人 |
| 首次成功运行时间 | < 15 分钟 |
| 安装成功率 | >70% |
| smoke test 通过率 | >70% |
| 付费用户 M2 repeat / renewal intention | >30% |
| 创作者收入证明 | 至少 1 个创作者月收入 >$1K |

如果这组指标不成立，就不应该急着做大 marketplace；应该回到 package extraction、安装体验、测试标准和垂直场景选择。

---

### 8. 商业模式：先最小闭环，再丰富平台

Agora 第一阶段不和模型厂竞争 token 收入。用户会用自己的 LLM token、本地 runtime 和个人账号执行任务，所以我们不能把收入设计成“每次本地推理抽成”。

更清楚的说法是：

**Agora 早期卖的不是文件，也不是 runtime，而是“被验证能跑的能力交付”。**

#### 早期最简版本

第一阶段不要先做完整 marketplace，而是做一个强运营的能力包交付服务：

```text
创作者已有 workflow
→ Agora 帮他打成能力包
→ 用户在本地安装
→ smoke test 跑通
→ 完成一个真实任务
→ 根据失败和反馈更新能力包
```

这个阶段只有五个收费点，足够清楚：

| 收费点 | 我们实际提供什么 | 谁为什么付钱 | 收费方式 |
|---|---|---|---|
| 能力产品化 | 把创作者散落的 prompt、skill、MCP、脚本、经验、案例整理成 package manifest、安装说明、商品页 | 创作者想把个人 workflow 变成可售卖产品 | 共创项目费、早期 waive 换分成、Publisher Pro |
| 验证安装 | 用 Agent-VM / adapter 帮用户装到 Claude Code、Codex、Cursor 等 runtime，并跑通 smoke test | 用户不想读 README、改配置、排错 | 一次性 package fee、安装服务费、team pilot fee |
| 更新和支持 | 外部网站、API、模型、MCP、runtime 变化后，维护新版本和失败归因 | 用户需要这个 workflow 长期重复使用 | 月费 / 年费 update plan、team license |
| 托管保护步骤 | 把创作者不愿公开的 scoring、rubric、动态规则库、专有数据放在云端调用 | 创作者不想把核心 know-how 全部下发到本地 | usage fee、subscription share |
| 认证和分发 | canonical tests、质量分、上架推荐、退款证据、创作者收益结算 | 用户想降低试错成本，创作者想获客 | 平台抽成、认证费、分账 |

这比“卖 entitlement + billing + event ledger”更具体：我们先卖的是 **产品化、安装跑通、验证、更新、保护步骤和分发**。

#### 跑通一次后，用户为什么还会继续付费？

不是所有能力包都应该做订阅。如果一个能力包只是一次性任务，用户跑通一次后没有持续需求，那它就应该是一笔一次性购买或安装费，不要硬讲复购。

真正适合订阅的能力包，必须有持续依赖：

| 持续依赖 | 例子 | 用户续费理由 |
|---|---|---|
| 任务本身高频重复 | 小红书选题、广告素材生成、竞品监控、周报研究 | 每周 / 每月都要跑，能力包是生产流程的一部分 |
| 外部环境会漂移 | 网站 UI、API、MCP、模型行为、平台风控策略变化 | 不维护就跑不通，用户为持续兼容付费 |
| 创作者持续更新判断力 | 新案例、新提示词、新 scoring rubric、新行业数据 | 用户买的是创作者持续迭代后的经验 |
| 团队需要治理 | 多人使用、统一版本、权限策略、审计、私有 registry | 组织不是买一次文件，而是买可管理的工作方式 |
| 核心逻辑在云端保护 | 选题评分、投放策略、私有数据、行业规则库 | 用户每次调用 protected step 都依赖平台和创作者 |

所以 Agora 不应该承诺“所有能力包都能订阅化”。早期要筛选那些天然有重复使用和环境漂移的场景。一次性工具可以卖一次，重复性工作流才适合订阅。

#### 本地包被复制怎么办？

这是一个必须正面讲清楚的边界：

**Agora 不把商业模式建立在“本地加密 skill 包永远无法被提取”上。**

如果一个能力包完整运行在用户本地的标准 runtime 里，模型就必须读到它的 prompt、workflow、tool instruction 或关键逻辑。只要模型能读，用户就可能通过 prompt injection、日志、session history 或 runtime 文件把内容抽出来。加密、签名、activation 可以提高复制摩擦，但不能成为真正护城河。

因此能力包会被拆成三层：

| 层 | 是否下发到本地 | 商业含义 |
|---|---|---|
| 开放本地层 | 下发 | workflow 主体、工具配置、示例、基础 prompt；可以被复制，所以不靠它单独收费 |
| 持续服务层 | 不等同于文件 | 更新、测试、兼容、失败归因、team policy、质量认证；复制文件拿不到这些 |
| 托管保护层 | 不下发 | creator 最核心的 rubric、动态库、专有数据、评分逻辑；按调用或订阅收费 |

被复制后，盗版用户可能拿到一个旧版本文件，但拿不到更新、测试、退款保障、团队治理、creator 支持、hosted protected step 和平台信誉。这也是为什么早期主攻方向应该是：

**开放本地包 + 少量托管保护步骤 + 持续更新支持。**

#### 创作者为什么要和平台共同维护？

平台和创作者维护的不是同一件事。

| 维护对象 | 谁负责 | 具体内容 |
|---|---|---|
| Runtime 适配 | Agora | Claude Code、Codex、Cursor、Agent-VM、MCP config、安装路径、权限声明 |
| 安装与诊断 | Agora | install doctor、smoke test、resource binding、错误分类 |
| 领域判断 | 创作者 | prompt、workflow、案例、rubric、成功标准、失败经验 |
| 测试样本 | Agora + 创作者 | Agora 提供 test harness，创作者提供真实任务和合格标准 |
| 商品和定价 | Agora + 创作者 | listing、plan、refund boundary、update channel |

Agora 维护“这个能力包如何在不同用户环境里跑起来”；创作者维护“这个能力到底怎样才算做得好”。两者缺一不可。

#### 多 Agent 使用时怎么收费和归因？

当一个任务只调用一个能力包，计费很简单；但当主 Agent 串联多个能力包时，平台真正有价值的部分会变成调用链账本。

一个多 Agent 任务可能长这样：

```text
用户目标
→ 主 Agent 拆任务
→ 调用研究能力包
→ 调用写作能力包
→ 调用设计能力包
→ 调用发布检查能力包
→ 用户确认结果
```

这时 Agora 需要记录：

| 问题 | 为什么重要 |
|---|---|
| 哪个能力包被调用 | 决定创作者分账和用户账单 |
| 调用了哪个版本 | 决定失败是否来自旧版本、兼容问题或 creator 更新 |
| 输入输出是什么摘要 | 支持效果评估，但不能泄露用户隐私 |
| 哪一步失败 | 决定退款、重试和责任归因 |
| 哪一步用了 hosted protected step | 决定 usage fee 和 creator 的核心 know-how 保护 |
| 最终结果是否通过测试或用户确认 | 决定 reputation、ranking 和续费 |

所以多 Agent 使用不是一个额外愿景，而是 Agora 的 event ledger、canonical tests、pricing 和分账系统为什么必须存在。早期我们可以先做单能力包交付；但数据结构上要为“一个任务调用多个能力包”预留位置。

#### 长期最丰富版本

等早期闭环跑通后，Agora 才自然长成更完整的平台：

| 平台能力 | 长期收入 |
|---|---|
| 能力包 marketplace | 交易抽成，Y1-Y2 可以按 10% 起步 |
| Publisher tooling | Publisher Pro、团队发布工具、测试生成、版本管理 |
| Verification network | canonical tests、认证、质量分、退款证据 |
| Hosted protected steps | usage fee、subscription share |
| Team / private registry | seat、team license、private marketplace |
| Event ledger / settlement | 分账、退款、争议处理、reputation、ranking |
| Managed runtime fallback | 企业、强合规、强 IP 保护场景的更高客单价产品 |

长期看，Agora 可以成为 Agent 能力商品化层；但冷启动时不要讲得过大。我们第一阶段只需要证明：

1. 创作者愿意把真实 workflow 交给我们产品化；
2. 用户能在自己的 runtime 里 15 分钟内跑通；
3. 有一类高频 workflow 会因为更新、兼容、验证和 protected step 持续付费；
4. 创作者能从能力包拿到真实收入。

---

### 9. 工程壁垒：脏活累活带来的启动时间差

Agora 的壁垒不是“写一个 marketplace 页面”，而是把 Agent 从个人工作流变成可分发商品时，中间那一层没人愿意做、但必须做对的工程脏活累活。

| 工程资产 | 为什么后来者难追 |
|---|---|
| Package schema | 需要从大量不同 Agent 形态中抽象，不是一开始就能设计完 |
| Agent package compiler | 要把混乱的 prompt、tool config、历史轨迹和运行日志编译成结构化 manifest |
| Redaction rules | 依赖真实隐私 / 能力冲突案例，靠空想不够 |
| Runtime adapters | 每个宿主都有文件系统、权限、tool calling、streaming、错误恢复差异 |
| Canonical tests | 需要真实任务样本和失败轨迹积累；它决定用户敢不敢安装、平台敢不敢退款 |
| Event ledger | 计费、审计、争议处理要从 Day 1 设计，否则后补很难 |
| Creator playbook | 高质量供给来自反复共创，不是开放注册自然产生 |
| IP exposure policy | 本地包无法绝对防提取，需要明确哪些内容开放、哪些内容托管、哪些内容只靠更新和服务变现 |

**所以 Agora 的先发优势来自启动时间：越早跑真实能力包，越早积累这些脏数据和脏流程；越晚进入，越容易只复制 marketplace 表面，而补不齐底层工程系统。**

这里尤其要强调 canonical tests。它不是一个“工程洁癖”功能，而是能力包交易的核心信任机制：

| Test 类型 | 回答的问题 | 谁受益 |
|---|---|---|
| Smoke test | 这个包在用户机器上能不能启动、能不能找到工具和资源 | 用户、平台 |
| Capability test | 给一个标准任务，它能不能产出可接受结果 | 用户、创作者 |
| Permission test | 它有没有调用不该调用的工具、访问不该访问的文件 | 用户、平台 |
| Regression test | 创作者更新后，原来的核心能力有没有退化 | 创作者、订阅用户 |
| Refund evidence | 失败到底是包的问题、用户环境问题，还是第三方平台变化 | 平台、用户、创作者 |

没有 canonical tests，能力包 marketplace 会变成“看起来很厉害的 prompt 商店”；有了 tests，能力包才有机会成为可续费、可退款、可排序、可认证的生产资料。

---

### 10. 财务模型：由服务循环推导

财务模型不应该和商业模式分开看。Agora 的收入不是凭空来的，而是来自上面那条服务循环：

1. 创作者把 workflow 产品化，可能付共创服务费 / Publisher Pro / 认证费
2. 用户购买能力包，可能付年费、月费、team license 或 protected step usage
3. 平台从交易、托管保护步骤、团队版和认证中获得收入

所以 Agora 不是纯 SaaS，也不是单纯 marketplace；它更像 **能力产品化服务 + 本地安装交付 + 订阅/分账 + 托管保护步骤** 的组合。

Base case：

| 指标 | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Listed capability packages, EOY | 50 | 250 | 1,000 | 4,000 | 12,000 |
| Paid creators, EOY | 20 | 80 | 300 | 1,200 | 4,000 |
| Avg monthly paid users | 2,000 | 30,000 | 200,000 | 750,000 | 2,000,000 |
| Marketplace GMV | $0.48M | $9.0M | $84.0M | $405.0M | $1.32B |
| Total net revenue | $0.15M | $1.35M | $11.43M | $56.65M | $183.10M |
| Gross margin | 73% | 78% | 81% | 83% | 85% |
| EBITDA | -$3.79M | -$6.96M | -$9.49M | $3.52M | $61.04M |

这个模型只是说明 upside，不应该作为当前融资承诺。当前阶段更重要的是证明：

- 10 个能力包能否完成安装和首次成功运行
- 用户是否愿意为更新、支持、托管保护步骤或 team license 付费
- 创作者是否能拿到真实收入
- 失败归因和退款机制是否能跑通

如果这些指标成立，再用 GMV / net revenue 模型讲 Series A 会更有说服力。

---

### 11. 团队

| 成员 | 背景 | 对 Agora 的价值 |
|---|---|---|
| Benzema — CEO / Product & Supply | 字节即梦 AI 产品经理；0→1 Seedance 1.0 / 2.0、即梦 Web Agent、剪映 AI 视频工具 | 懂 AI 创作产品、Agent 产品和第一批供给侧创作者 |
| Jeff — CGO / Demand & Growth | 连续创业者；OKX 5 年产品经理；全球化增长；500+ KOL 资源 | 帮助创作者把能力包分发给真实用户，冷启动需求侧 |
| Ethan — CTO / Engineering | 帝国理工 CS；字节即梦后端核心工程经验；Agent 研发与工程落地经验 | 负责 package publisher、hybrid runtime、registry 和计费系统 |
| Yingheng Wang — CSO / AI & Evaluation | Cornell CS 博士；ICLR / AAAI / ICML / Nature MI；Microsoft Research / AWS AI Lab / Amazon Grand Challenge | 负责 Agent 能力评估、canonical tests、推荐与质量体系 |

Advisors：

- **Marcus**：字节高 P，前 T3 出行 CTO，双边 marketplace 技术架构经验
- **Peter Wang**：支付行业 10 年，Coolfen 联合创始人 / Giift 大中华区负责人
- **Seven**：电商十年，操盘多个年销售额过亿品牌，冷启动与 KOL 运营

---

### 12. 融资需求与 90 天计划

**建议融资口径：Seed core $3M，stretch $5M。**

当前阶段更适合用两档融资叙事，而不是只给一个大额目标。$3M 证明闭环，$5M 加速扩张；这样能同时回应“团队现在凭什么拿钱”和“如果信号很好，为什么值得多拿钱”。

| 方案 | 金额 | 目标 | 适合何时谈 |
|---|---:|---|---|
| Core Seed | $3M | 18 个月 runway，证明 10 个能力包、100-300 种子用户、首次成功运行和付费信号 | 现在即可对外讲 |
| Stretch Seed | $5M | 24 个月 runway，增加创作者激励、海外 GTM、支付/法务/合规和更多 runtime adapter | 有 lead investor 或 pilot 数据后讲 |

这笔钱的目标不是把 marketplace 直接推到规模收入，而是完成三个验证：

1. Agent 能力包能从真实创作者工作流中被发布出来
2. 能力包能迁移到新用户环境，并通过 canonical tests
3. 用户愿意为结果明确的能力包持续付费

| 用途 | 金额 | 占比 | 说明 |
|---|---:|---:|---|
| 人力 | $1.4M | 47% | 创始团队 + 4-6 位早期 hire，优先 publisher、Agent-VM、adapter、测试系统 |
| 创作者共创与激励 | $0.5M | 17% | 5-10 个标杆能力包、保底收入、共创补贴 |
| 种子用户与内容增长 | $0.4M | 13% | KOL 合作、case study、社群、demo video |
| 法务 / 支付 / 合规 | $0.4M | 13% | 分账、license、隐私、退款和跨境支付 |
| 技术基础设施 | $0.3M | 10% | registry、runtime adapter、canonical tests、event ledger |

Stretch 到 $5M 时，多出来的 $2M 主要用于：更多 creator incentive、更多 runtime 适配、海外增长、支付合规和更长 runway。这样比直接喊 $5M 更容易被投资人接受。

未来 90 天：

| 时间 | 目标 |
|---|---|
| Week 1-2 | 定义 Agent Package v0 字段；选定首批 5 个能力包；完成发布流程 wireframe |
| Week 3-6 | 做 Publisher alpha：manifest generator、secrets / PII scanner、context distillation、canonical tests generator |
| Week 7-10 | 和 5-10 个创作者共创能力包；完成安装和运行闭环；验证第一批付费意愿 |
| Week 11-12 | 公开 demo video；发布 creator case studies；启动 waitlist；准备 seed fundraising materials |

---

## Appendix A — Agent 能力包完整定义

Agent 能力包不是把用户电脑原样复制出去，也不是只导出一份 prompt。它把“能力可迁移所需的信息”结构化打包，同时剥离隐私和凭据。

| 模块 | 内容 |
|---|---|
| Identity Manifest | 名称、版本、作者、能力描述、适用场景、兼容 runtime |
| Prompt & Policy | system prompt、行为边界、拒绝策略、用户交互规范 |
| Skills & Tools | Skill 定义、MCP server 依赖、工具调用模式、参数约束 |
| Workflow Memory | 成熟 SOP、多步任务轨迹、失败恢复策略、常见判断框架 |
| Context Distillation | 从历史对话中提炼出的可复用偏好、反例、rubric、domain knowledge |
| Resource Schema | 需要哪些账号、文件、API、cookie、浏览器权限；只发布 schema，不发布凭据 |
| Canonical Tests | 创建者提供的一组标准测试，用来验证能力包到新用户环境后仍有效 |
| Execution Policy | 云端、本地或 hybrid 执行；哪些动作需要用户确认 |
| Pricing & License | 调用价格、订阅方式、商业授权、分成规则 |

现有生态的分发单位都不够完整：

| 分发单位 | 能传递什么 | 丢失什么 |
|---|---|---|
| Prompt | 角色设定和简单规则 | 工具、运行轨迹、上下文、评估 |
| Code repo | 工程实现 | 调教经验、任务 SOP、创作者 know-how |
| MCP server | 工具接口 | Agent 本身的判断与执行策略 |
| Skill | 某个能力模块 | 长期运行态和跨任务记忆 |
| Agent 能力包 | 完整可迁移能力 | 只剥离隐私和凭据 |

---

## Appendix B — 产品形态与执行架构

### 创作者侧：Agora Publisher

创作者打开本地项目或 Agent 工作区，运行发布流程：

1. 选择要发布的 Agent / Skill / workflow
2. Agora 扫描文件、prompt、tool config、历史轨迹
3. 自动生成 package manifest
4. 标出隐私风险和缺失信息
5. 创作者补充 demo、pricing、license、canonical tests
6. 发布到 Agora registry

### 用户侧：Agora Registry

用户搜索一个任务，比如“帮我做小红书账号选题”或“把产品截图做成广告视频”。

用户看到的不只是介绍页，而是一份可验证的能力说明：

- 这个能力包能做什么
- 需要哪些权限和 runtime
- 已通过哪些 canonical tests
- 运行时哪些步骤在本地、哪些在云端
- 价格是多少
- 作者是谁，历史评分如何

### 执行侧：Hybrid Runtime

| 执行位置 | 负责内容 |
|---|---|
| Agora Cloud | package registry、install、计费、审计、版本、测试、分发 |
| 用户本地 runtime | 私域账号、cookie、本地文件、浏览器控制、本地工具调用 |
| 创作者维护区 | 能力包更新、测试集、pricing、support、版本发布 |

这个架构避免了两个极端：

- 纯云端：处理不了个人账号和本地数据
- 纯去中心化：没有分发、信任和结算

### 历史第一版实践：Agent-VM

Agent-VM（`avm`）是团队当时基于 Agora 故事开展的第一版工程尝试。它的定位是 **AI Coding Agent 时代的 nvm**：用户通过一个本地 CLI 管理 Agent Profile，并把同一个 profile 激活到多个 coding agent runtime。

主路径是：

```bash
avm use backend-coder
```

这条命令背后的产品含义是：用户不再手动维护散落在 `AGENTS.md`、`CLAUDE.md`、`.cursorrules`、MCP config、skills 目录和 memory notes 里的配置，而是把它们抽象成一个可版本化、可导入导出、可切换的 Agent Profile。

截至本文当时的工程快照，Agent-VM 已经实现：

| 能力 | 状态 |
|---|---|
| Agent Profile | `avm agent create/list/show`，profile 携带 identity、runtime、model_run、capabilities、permissions、memory_refs |
| Environment Activation | `avm env create`，支持多 runtime 场景映射 |
| Runtime adapters | Codex、Claude Code、Cline、Cursor PoC |
| Mapping status | 字段级标记 `native`、`rendered_as_instructions`、`ignored`、`unsupported` |
| Safety model | `avm init` 只读导入；`avm use` 只写 managed paths；写前 backup / conflict detection |
| Portable memory 起点 | `avm memory import --from <file> --dry-run` |
| Package I/O | `avm export` / `avm import` |

本文记录时的检查状态：

- private repo: `xz1220/Agent-VM`
- latest main: `cca2983`，`Fix Claude runtime-home test defaults`
- latest CI: success
- local `go test ./...`: pass
- Phase 1 Local Profile Activation 与 Phase 2 Runtime Coverage 基本完成
- Phase 3 Portable Memory 与 Phase 4 Team Registry 仍未完成

它和 Agora 的关系：

| Agent-VM | Agora |
|---|---|
| 本地 Agent Profile 控制平面 | 能力包发布与分发平台 |
| 管理 role、tools、permissions、model_run、memory_refs | 把这些变成可发布、可验证、可计费的商品单位 |
| 解决“在我机器上如何激活一个 Agent” | 解决“这个 Agent 如何给别人安装、运行、付费使用” |
| 输出 adapter mapping status | 形成 runtime compatibility matrix |
| 支持 export / import | 演进为 Agent Capability Package |

因此在该历史路线中，Agent-VM 当时不被视为偏离主线，而被视为 Agora 的第一块基础设施：先把 **Agent Profile → runtime activation** 跑通，再补 package compiler、privacy redaction、canonical tests、registry、billing 和 creator distribution。它不再代表 Combo 当前产品主线。

---

## Appendix C — 能力包订阅机制

能力包由一次发布时的 versioned snapshot 生成，但订阅关系不应绑定在一个静态 snapshot 上。更准确地说：

**Snapshot 生成版本，订阅绑定能力线。**

用户订阅的不是 `v1.0.3` 这个文件，而是某个 creator 持续维护的一条 capability line。例如：

```text
xhs-growth-agent / stable channel
  current: v1.0.3
  compatible: Claude Code, Codex, Chrome local worker
  includes: 200 runs / month
  update policy: minor updates included, major upgrades optional
```

### 订阅开始：从 listing 到 entitlement

一次订阅应该包含五个动作：

1. 用户在 listing 页理解能力、权限、runtime 要求、价格和 canonical tests
2. 用户选择 plan：monthly、usage bundle、seat、team、或 pay-per-run fallback
3. Agora 创建 entitlement：谁可以用、用到什么时候、可以在哪些 runtime 里运行、包含多少 usage
4. 用户把能力包安装到本地或云端 runtime，并绑定自己的资源：账号、cookie、API key、文件夹、数据库等
5. 系统跑一次 smoke test / canonical test，确认能力包在用户环境里可运行

订阅成功不等于“文件下载完成”，而是 **entitlement + install + resource binding + verification** 同时成立。

### 用户每月为什么续费

用户续费的原因不是“我拥有这个 Agent”，而是这个 Agent 持续替我完成任务。

| 续费理由 | 用户感知 |
|---|---|
| 任务结果稳定 | 每月都能生成素材、跑运营、监控信息、完成研究 |
| 外部环境变化有人维护 | 小红书页面改版、MCP 更新、模型行为变化、API 字段变化后，能力包仍能工作 |
| 新版本持续变好 | creator 把失败案例、用户反馈、行业经验沉淀进新版本 |
| 权限和风险可控 | 用户知道能力包需要哪些权限，敏感凭据留在本地 |
| 支持和退款机制明确 | 失败时知道是用户环境、第三方平台、模型波动还是能力包 bug |

所以订阅的心理模型更接近：**订阅一个持续工作的专家流程**，不是买一个 bot。

这里的“维护”需要分工清楚：

| 变化类型 | 谁负责 |
|---|---|
| Claude Code / Codex / Cursor 的配置格式变化 | Agora 负责 runtime adapter |
| MCP server 安装方式、权限、版本变化 | Agora 负责兼容层，创作者确认能力包是否仍适用 |
| 小红书、抖音、网页、第三方 API 变化 | 创作者负责 workflow 和策略更新，Agora 提供日志和失败样本 |
| 模型行为变化导致输出质量波动 | 创作者更新 prompt / rubric / examples，Agora 帮助跑 regression tests |
| 用户本地账号、cookie、文件缺失 | Agora 负责 resource binding 和错误提示，用户负责提供自己的资源 |

### 创作者每月为什么有收入

创作者的收入不来自“卖掉 prompt”，而来自持续维护一份生产能力：

- 修复 runtime / tool / API 兼容问题
- 把用户反馈转成新 SOP、guardrail、test case
- 维护 demo trajectories 和 canonical tests
- 标注哪些任务适用，哪些任务不适用
- 提供版本更新、changelog 和 support boundary
- 维护自己的 reputation 和转化率

这让 creator 的商业行为从“卖课 / 卖模板”变成“经营一个可运行能力产品”。

### 订阅计划应该长什么样

早期建议保留 4 种 plan，避免一开始设计过度复杂：

| Plan | 适用对象 | 计费方式 |
|---|---|---|
| Trial / Demo | 新用户试用 | 免费或低价，限制调用次数和输出水印 |
| Individual Monthly | 个人高频用户 | 月费，包含更新、测试、支持和少量 protected step 调用 |
| Usage Bundle | 任务频率不稳定用户 | 只对 hosted protected step 或云端执行部分按量计费 |
| Team Seat | 小团队或工作室 | seat + shared usage + team memory / policy |

不建议第一天做复杂 outcome-based pricing。Agent 任务的成功归因、外部平台变化、模型波动和用户数据质量都会影响结果，过早做 outcome-based 会制造争议处理成本。

### 版本与更新：订阅的是 channel，不是单点版本

能力包应该有 channel 概念：

| Channel | 含义 |
|---|---|
| Stable | 默认订阅线路，更新前必须通过 canonical tests |
| Beta | 新 workflow / 新模型 / 新 runtime 适配，适合高级用户 |
| Legacy | 老用户保留版本，限期维护 |
| Major Upgrade | 重大重写，creator 可选择单独定价或 grandfather existing subscribers |

订阅用户默认跟随 stable channel。平台需要记录每个用户实际运行的版本、更新时间、回滚状态和测试结果。

### 取消、退款和争议

取消订阅后，应该区分三层权利：

| 权利 | 取消后的处理 |
|---|---|
| Cloud entitlement | 到期后停止计费、停止云端调用、停止更新 |
| Local installed copy | 可选择只保留不可更新的 frozen version，或按 license 禁用 |
| Creator support / tests | 到期后不再提供新版本、兼容维护和 support |

退款和争议不能只看“Agent 有没有跑完”，而要看 event ledger：

- 是否通过安装后的 smoke test
- 是否在订阅期内使用了 included runs
- 失败发生在哪一步
- 是否是第三方网站、模型、用户凭据、用户输入或能力包自身问题
- creator 是否在 SLA 内修复

这就是为什么 Agora 需要 event ledger、canonical tests 和 runtime logs；它们不仅是工程系统，也是订阅经济的信任系统。

本地包被复制或开源之后怎么办？

如果能力包是 open-local 模式，我们默认它有被复制的风险，不能把“防复制”当收入前提。平台能做的是四件事：

1. license / watermark / signature：提高低成本盗卖和冒充的摩擦
2. update channel：只有订阅用户拿到最新版本、测试结果和兼容修复
3. hosted protected step：真正高价值且不想公开的部分不下发到本地
4. reputation / support：用户为可信来源、稳定维护和出错处理付费

所以 open-local 的续费逻辑不是“我不能复制”，而是“复制旧版本不如订阅一个持续维护、能跑通、有人负责的版本”。

### Agora 在订阅里的角色

Agora 不只是收款方，而是三件事的保证方：

| Agora 角色 | 具体职责 |
|---|---|
| Entitlement layer | 管理谁订阅了什么、可用到什么时候、在哪些 runtime / seats 上可用 |
| Trust layer | 管理权限声明、测试结果、版本记录、风险提示、退款证据 |
| Settlement layer | 在用户、创作者、平台、模型 API、第三方工具之间做 usage 记账和分账 |

这也解释了为什么平台有 take rate：Agora 提供的不是流量入口本身，而是让 Agent 能力可以被安全订阅、持续运行和可信结算的基础设施。

---

## Appendix D — 第一阶段服务闭环

这一节把主文里的“能力产品化服务”和“可运行能力交付服务”展开成第一阶段可执行流程。重点是：Agora 不是先做一个空 marketplace，而是先用半手工、强运营的方式跑通少量高质量能力包。

### 创作者侧：从 workflow 到能力产品

第一阶段的 creator onboarding 应该像一个 package sprint：

| Day | 动作 | 输出 |
|---|---|---|
| Day 0 | 选择创作者和任务 | 一个已经被创作者自己反复使用的 Agent workflow |
| Day 1 | workflow interview | 任务边界、输入输出、失败案例、目标用户、价格假设 |
| Day 2 | package extraction | Agent Profile、skills、MCP、tool config、resource schema |
| Day 3 | privacy / IP review | 删除凭据和 PII；决定 open-local、hosted-protected 或 managed-runtime |
| Day 4 | canonical tests | 3-5 个真实任务样例、成功标准、禁止动作、权限要求 |
| Day 5 | listing + install | 商品页、demo trajectory、安装指令、trial plan |
| Day 6-7 | user pilot | 10-30 个种子用户试用，收集失败原因和付费意愿 |

这本质上是一种“把专家流程产品化”的服务。自动化程度一开始可以不高，关键是把每一步做成模板，后续才有机会变成 publisher tool。

### 用户侧：从购买到第一次成功运行

用户体验必须围绕第一次成功运行设计：

```text
Search task
  -> choose package
  -> see demo and permission requirements
  -> choose plan
  -> install through Agent-VM / runtime adapter
  -> bind local resources
  -> run smoke test
  -> run first real task
  -> rate result / report failure
```

如果用户第一次跑不通，平台要能给出明确归因：

| 失败类型 | 平台动作 |
|---|---|
| 缺 runtime | 提示安装或切换支持的 runtime |
| 缺 MCP / tool | 自动生成安装指令或降级方案 |
| 缺账号 / cookie / API key | 引导用户本地绑定，不上传凭据 |
| 第三方网站改版 | 标记为 creator / adapter update issue |
| 模型输出不稳定 | 增加 guardrail、test case 或推荐模型 |
| 能力包本身问题 | 触发 creator 修复、退款或降权 |

这就是 event ledger 的真实用途：不是为了做一个抽象账本，而是为了让用户知道为什么失败、创作者知道该修哪里、平台知道该不该退款。

### 早期循环：小红书能力包举例

以“小红书账号运营 Agent”为例：

1. 创作者已经有一套选题、竞品分析、标题生成、封面建议、发布时间建议 workflow
2. Agora 把它打成 `xhs-growth-agent`
3. 本地部分：用户自己的小红书账号、浏览器 cookie、历史笔记、素材文件
4. 托管保护部分：创作者不愿公开的选题评分 rubric、爆款案例库、行业更新规则
5. 用户订阅后，Agent-VM 安装本地 profile，用户绑定账号和素材目录
6. smoke test：输入一个账号定位，输出 10 个选题和 3 个标题方向
7. 用户每周运行，平台记录任务完成率、用户修改率、收藏率、退款原因
8. 创作者每周根据失败案例更新 rubric 和 canonical tests
9. 如果用户持续使用并复购，Agora 才扩大到更多小红书 creator 或相邻类目

这个循环能成立，说明 Agora 卖的是“一个持续变好的运营工作流”，不是一个可复制的 prompt。

### 为什么这个循环会变强

每跑一个能力包，平台都会学到新的结构：

- 哪些字段必须进入 package manifest
- 哪些资源应该本地绑定，哪些应该托管
- 哪些 runtime 适配最容易失败
- 哪些测试最能预测真实任务成功率
- 用户愿意为什么结果付费
- 创作者愿意维护什么，不愿意维护什么
- 什么样的失败应该退款，什么样的失败应该教育用户

这就是 Agora 的飞轮：

```text
更多真实能力包
  -> 更多安装和运行数据
  -> 更好的 adapter / tests / listing / pricing
  -> 更高成功率和复购
  -> 更好的 creator earning proof
  -> 吸引更多创作者发布能力包
```

---

## Appendix E — 工程壁垒展开

### 能力抽取不是复制文件

从一个 creator 的本地 Agent 里生成能力包，不能简单 zip 文件夹。系统要判断：

- 哪些 prompt 是能力本身，哪些只是一次任务的临时上下文
- 哪些历史轨迹可以变成 workflow memory
- 哪些失败案例应该沉淀成 guardrail 或 test
- 哪些 tool config 是通用依赖，哪些只属于原用户环境
- 哪些文件可以只发布 schema，不发布原文

这需要一套 **agent package compiler**：把混乱的本地项目、对话历史、工具配置和运行日志编译成结构化 manifest。这个 compiler 会随着每个真实创作者案例不断变厚。

### 隐私剥离是能力保真问题

最难的不是把所有敏感信息删掉，而是在不泄露隐私的前提下保留能力。

例如，“这个账号经常被小红书限流”可能是运营经验；“这个 cookie / token / 手机号”必须永远不进入能力包。做得太松会泄密；做得太狠，能力包就失真。

### Runtime 兼容性是长期泥坑

能力包要跑在 Claude Code、Cursor、Chrome、本地 MCP client、未来 Codex 或其他 runtime 上。每个宿主的文件系统、权限模型、tool calling、streaming、错误恢复都不同。

平台需要维护 runtime adapter、dependency resolver、permission mapper、tool availability checker、install / rollback 流程和版本兼容矩阵。创作者不想处理这些，用户也不想 debug；平台吃掉这层复杂度，才有分发价值。

### Canonical Test Suite 会变成平台资产

Agent 能力包的核心信任问题是：它到了新用户环境，还能不能工作？

每个能力包都需要一组 canonical tests：标准输入和预期输出、必须调用 / 禁止调用的工具、权限边界验证、迁移到新用户数据后的成功标准、回归测试。

这些测试不是传统 unit test。很多测试是“任务是否完成”的多步轨迹评估，需要结合 LLM judge、工具日志、用户反馈和人工抽检。

### Hybrid execution 的细节很脏

“云端编排 + 本地执行”听起来简单，实际要处理大量边界：

- 本地 worker 离线、睡眠、断网怎么办
- 浏览器 cookie 永不上传，但任务日志如何回传
- 用户取消授权后，能力包如何失效
- 高风险操作如何插入 approval
- 本地 tool 失败时，云端如何重试或降级
- 计费发生在任务开始、完成、还是关键步骤之后
- 创作者如何看见必要日志，但看不见用户隐私

### 计费与审计不是 Stripe 接一下就结束

Agent 能力包的计费对象不是一笔简单交易，而是一次多步任务。它可能调用多个工具，可能本地执行一部分、云端执行一部分，可能失败、重试、中断、人工确认，也可能由一个 Agent 调用另一个 Agent。

平台要有可解释的 event ledger：每次调用、每个费用、每个失败、每次退款都能追溯。这个 ledger 后续会成为 dispute、reputation、ranking、pricing 的数据底座。

---

## Appendix F — Financial Model 细表

Base case：

| 指标 | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Listed capability packages, EOY | 50 | 250 | 1,000 | 4,000 | 12,000 |
| Paid creators, EOY | 20 | 80 | 300 | 1,200 | 4,000 |
| Avg monthly paid users | 2,000 | 30,000 | 200,000 | 750,000 | 2,000,000 |
| Monthly GMV / paid user | $20 | $25 | $35 | $45 | $55 |
| Marketplace GMV | $0.48M | $9.0M | $84.0M | $405.0M | $1.32B |
| Take rate | 10% | 10% | 12% | 13% | 13% |
| Total net revenue | $0.15M | $1.35M | $11.43M | $56.65M | $183.10M |
| Gross margin | 73% | 78% | 81% | 83% | 85% |
| Total opex | $3.90M | $8.01M | $18.75M | $43.50M | $94.60M |
| EBITDA | -$3.79M | -$6.96M | -$9.49M | $3.52M | $61.04M |

三种情景：

| Scenario | Y5 paid users | Y5 monthly GMV/user | Y5 GMV | Y5 net revenue | Y5 EBITDA | 解释 |
|---|---:|---:|---:|---:|---:|---|
| Conservative | 350K | $35 | $147M | $21.64M | -$17.26M | 能力包市场存在，但复购和用户扩张不足，仍是小众 creator tooling |
| Base | 2.0M | $55 | $1.32B | $183.10M | $61.04M | 出现多个垂直类目，能力包成为 AI 高级用户的常规购买方式 |
| Upside | 5.0M | $80 | $4.80B | $775.00M | $454.25M | Agent runtime 普及，Agora 成为跨 runtime 能力分发网络 |

Seed 阶段真正要证明的不是“大收入”，而是 marketplace 的四个底层假设：

| 里程碑 | Seed 阶段目标 |
|---|---|
| Supply | 20-50 个可发布能力包，5-10 个标杆能力包 |
| Migration | 能力包在 canonical tests 上迁移成功率 >60-70% |
| Demand | 1,000-3,000 个付费用户，或等价的强 waitlist / pre-order |
| Economics | 月 GMV / paid user >$20 |
| Retention | 付费用户 M2 repeat >30-40% |
| Creator proof | 至少 1 个创作者月收入 >$1K，后续目标 >$5K |

Series A 的触发条件可以不是传统 ARR，而是：

- $100K-$250K monthly GMV
- $10K-$30K monthly net revenue
- GMV 连续增长
- 付费用户复购成立
- 能力包迁移成功率稳定
- 供给侧出现 creator earning case study

---

## Appendix G — 竞争、风险与 Q&A

### 竞争格局

| 对手 | 它们是什么 | Agora 的区别 |
|---|---|---|
| GPT Store | Prompt / GPT 分发 | 只传 prompt，不传完整运行态；分成弱 |
| MCP Registries | 工具目录 | 解决 tool discovery，不解决 Agent 能力商品化 |
| Claude Skills / GitHub repos | 能力模块或代码 | 缺 marketplace、计费、测试和隐私发布流程 |
| Apify | Web automation actor marketplace | 更偏爬虫和云 actor；Agora 面向通用 Agent 能力包和 hybrid runtime |
| Coze / 百炼 / 元器 | 平台内 Agent 构建与分发 | 封闭生态，创作者能力被平台锁定 |
| Claude Managed Agents / OpenAI Workspace Agents | 企业托管 Agent 平台 | 面向企业和自有 runtime，不服务开放创作者分发 |
| Lovart | 单一 AI 创作产品 | Agora 是让很多创作者发布自己的“Lovart” |

### 风险与应对

| 风险 | 应对 |
|---|---|
| 能力包到新用户环境后能力迁移率不高 | Canonical tests + context distillation + runtime requirement 明确化 |
| 发布过程泄露隐私或凭据 | secrets scan、PII redaction、resource schema 与 credentials 分离 |
| 本地执行导致源码泄露或盗版 | 不承诺本地加密包绝对安全；通过 open-local 订阅、hosted protected step、license、更新渠道、support、reputation 和 event ledger 商业化 |
| 用户不愿安装本地 runtime | 先寄生 Claude Code / Cursor / Chrome 等已安装环境；必要时提供托管 fallback |
| 大厂跟进 marketplace | 大厂结构性偏企业和封闭 runtime；我们先绑定开放创作者和长尾个人场景 |
| 通用 marketplace 冷启动困难 | 先做 Publisher 和标杆能力包，再从多模态创作与个人账号自动化切入 |

### Investor Q&A

**Q1：这和 GPT Store 有什么区别？**  
GPT Store 分发的是 prompt wrapper，Agora 分发的是完整 Agent 能力包。Prompt 不能携带 workflow、tool config、memory、tests 和 execution policy，所以能力迁移很弱。

**Q2：为什么不是 MCP Registry 直接做？**  
MCP Registry 解决 tool discovery。Agora 解决的是 Agent 能力本身的 packaging、privacy、trust、billing 和 distribution。MCP 是底层工具协议，Agora 是经济和分发层。

**Q3：如果大厂也做 marketplace 怎么办？**  
大厂会做企业 Agent 平台和自有生态 marketplace，但很难做开放、跨 runtime、创作者主权、个人账号本地执行的分发层。我们先服务他们做不好也不愿意做的长尾开放生态。

**Q4：能力包会不会泄露创作者 know-how？**  
如果一个能力包完整运行在用户本地的标准 runtime 里，Agora 不承诺它的 prompt / skill / workflow 永远无法被提取。我们的设计不是靠“本地加密包”建立护城河，而是让创作者选择 open-local、hosted-protected 或 managed-runtime 三种商业化模式。高价值 know-how 可以保留在 hosted protected step；本地开放部分通过持续更新、测试、support、license、reputation 和分发变现。

**Q5：用户为什么愿意付费？**  
用户不是为“一个 Agent 名字”付费，而是为可验证的任务结果付费。Canonical tests、demo trajectories、评分和退款机制降低试错成本。

**Q6：为什么从发布工具开始，而不是直接 marketplace？**  
没有标准化商品，就没有高质量市场。先做 Publisher，是为了定义什么可以被卖、如何验证、如何运行。Marketplace 是能力包 primitive 成熟后的自然结果。

---

## Appendix H — References

- Gartner AI Agents Forecast: https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025
- McKinsey Generative AI Economic Potential: https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/The-economic-potential-of-generative-AI-The-next-productivity-frontier
- The Productivity J-Curve: https://www.aeaweb.org/articles?id=10.1257%2Fmac.20180386&page=438
- MIT NANDA / GenAI Divide: https://www.searchyour.ai/archivos/genai-divide-state-ai-business-2025-mit-nanda-report.pdf
- PwC AI and Global GDP: https://www.pwc.com/th/en/press-room/press-release/2025/ai-adoption-could-boost-global-gdp-by-an-additional-15-percentage.html
- IDC AI Economic Impact: https://www.idc.com/events/futurescape
- MCP / A2A / Agent Card：Agent 通信和工具连接的现有协议基础
- Claude Code Skills：能力模块化和本地 runtime 的重要供给来源
- GPT Store：prompt-only marketplace 的反面案例
- Apify：自动化能力市场的标杆
- Agent-VM private repo：Agora 第一版本地 Agent Profile / runtime activation 原型
- Agent Skill 商业化三角不可能定理：标准化 agent runtime × 客户端本地运行 × 源码保护不可兼得
- Stripe Pricing：支付、退款、争议和跨境成本是 marketplace COGS 的基础变量
- Apple App Store Small Business Program / Microsoft Commercial Marketplace：用于校准 marketplace take rate 的外部参照
- Claude Managed Agents / OpenAI Workspace Agents：企业 agent runtime 正在成熟
- Claude Blog 2026-04：Claude Code desktop、Managed Agents、MCP production systems、Skills、Routines、Memory、multi-agent patterns
- Coze / 百炼 / 元器：中文闭环 agent 平台的供给和威胁
- BENZEMA vault research：Agent distribution、orchestrator-worker、enterprise agent platform、Creative CoWork、多模态创作者访谈
