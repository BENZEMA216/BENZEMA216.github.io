<!--
date: 2026-04-24
tags: [agent-platform, enterprise, big-co, google-gemini, microsoft, aws, anthropic, openai, salesforce, servicenow, bytedance, alibaba, baidu, tencent]
status: supporting
trigger: >
  用户链接 cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform
  要求研究大厂在 Agent Platform 上的尝试
related:
  - "[agent-world-2028-synthesis](/output/reports/agora/market-competition/agent-world-2028-synthesis/)"
  - "[org-context-landscape-2026](/output/reports/agora/market-competition/org-context-landscape-2026/)"
  - "[agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/)"
-->

# 大厂 Agent Platform 全景（2026-04）

## TL;DR

**一句话**：2026 年 4 月，**美国云三巨头（Google / Microsoft / AWS）、两家模型厂（OpenAI / Anthropic）、两家 SaaS 巨头（Salesforce / ServiceNow）、中国四强（字节扣子 / 阿里百炼 / 百度千帆 / 腾讯元器）**同时把"Agent 平台"产品化到 GA，平台原语快速收敛，企业端进入大规模采购年。

**重要时点**：
- **2026-04-23**：Google 发布 **Gemini Enterprise Agent Platform**，**Vertex AI 作为独立产品被整个吸收进来**——这是本次研究的起点，也是大厂 agent 平台"收束"最显性的事件
- **2026-04-08**：Anthropic 发布 **Claude Managed Agents**（公共 beta，$0.08/session-hour）
- **2026-04-06**：Microsoft **Agent Framework 1.0 GA**（.NET + Python，SK + AutoGen 合并）
- **2026-04**：AWS **Bedrock AgentCore** 新增 Managed Harness（preview）+ 免费 harness/CLI/skills
- **2026-04**：OpenAI **Workspace Agents**（继任 custom GPTs 的企业形态）+ Agents SDK 增加 sandbox
- **2026-01-20**：字节 **扣子 2.0** 品牌升级（Agent Skills/Plan/Coding/Office 四件套，企业版 ¥4,980/月）

**大盘数字**：
- Gartner 预测：**2026 年底 40% 企业应用会带 task-specific AI agent**（2025 年 < 5%）
- 乐观情形：2035 年 agentic AI 贡献 **~$450B / 30%** 企业应用软件收入（2025 = 2%）
- 云 IaaS 份额：AWS 38% / Azure 24% / GCP 9%（Gartner）
- Microsoft + Google 在 enterprise AI 并列领先，AWS 持续追赶

**对 BENZEMA 方向的启示**：大厂正在把企业端（control plane + runtime + registry + gateway）全包掉。**真正留给独立开发者的空白**是：(a) 个人账号绑定 + 本地执行（xhs / 抖音 / 淘宝）；(b) Claude Code / Cursor / Chrome 寄生的垂直 skill 市场；(c) 2C 长尾场景结算层——见本文末尾"大厂不碰的空白"。

---

## 1. 市场信号

### Gartner 2026 年关键预测
- **40%**：2026 年底带 task-specific AI agent 的企业应用比例（2025 < 5%）
- **30% / $450B**：2035 年 agentic AI 对企业应用软件收入的贡献上限（2025 = 2%）
- **Top 3 incumbent（按营收）**：Microsoft、Salesforce、SAP——但只有 Microsoft 跑赢大盘
- **Enterprise AI 竞争格局**：Microsoft（partner 生态 + 平台厚度） vs Google（agentic 技术栈 + scalable adoption）为"company to beat"并列头部，AWS 紧追

### 头部云三巨头格局
| | 云市场份额（IaaS） | 2026 agent 平台打法 |
|---|---|---|
| AWS | ~38% | **Bedrock AgentCore**：模块化 + 按 CPU 实际消耗计费（I/O wait 不收费）|
| Azure | ~24% | **Copilot Studio + Agent Framework 1.0**：SaaS（Copilot Studio）+ OSS SDK（Agent Framework）双轨 |
| GCP | ~9% | **Gemini Enterprise Agent Platform**：all-in，吸收 Vertex AI，Build/Scale/Govern/Optimize 四层 |

---

## 2. 美国云三巨头对比

### 2.1 Google — Gemini Enterprise Agent Platform（2026-04-23 GA）

**战略信号（最重要）**：
> "Moving forward, all Vertex AI services and roadmap evolutions will be delivered exclusively through the Agent Platform, rather than as a standalone service."

**Vertex AI 作为独立产品被整个吸收**。这是"大厂把 ML 平台彻底 agent 化"的最明确动作——不是加一个 agent 模块，是用 agent 取代原来的 ML 平台定位。

**四层架构**：

| 层 | 组件 |
|---|---|
| **Build** | Agent Studio（可视化 low-code）、ADK（code-first）、Agent Garden（模板集） |
| **Scale** | Agent Runtime（sub-second 冷启动，秒级 provision）、Memory Bank（长期记忆 + Memory Profiles）、Agent Sandbox、Custom Session IDs（映射内部 CRM）、多日级 long-running agents |
| **Govern** | Agent Identity（每个 agent 一个 cryptographic ID）、Agent Registry（内部 agent/tool/skill 统一清单）、Agent Gateway（air traffic control，enforce policy）、Model Armor、Agent Anomaly Detection（LLM-as-judge）、Agent Security Dashboard（接 Security Command Center） |
| **Optimize** | Agent Simulation（合成用户交互压测）、Agent Evaluation（multi-turn autoraters）、Agent Observability、Agent Optimizer（failure clustering + 自动 prompt 改写） |

**差异化亮点**：
- **Memory-first**：把长期记忆做成一等公民（不只是 context window 管理）
- **Cryptographic agent identity**：每个 agent 加密身份，审计可追溯
- **Sub-agent graph network**：图结构编排子 agent
- **Multi-day autonomy**：multi-day long-running agent
- **Bidirectional streaming (WebSocket)**：多模态实时音视频
- **AP2（Agent Payment Protocol）**：新支付协议，PayPal 首批
- **模型开放**：**200+ 模型**，含 **Anthropic Claude Opus/Sonnet/Haiku**、Gemini 3.1、Lyria 3、Gemma 4
- **ADK 已跑 6 万亿 token/月**——这条"锚定使用规模"的数据最有力

**客户**：Burns & McDonnell、Color Health、Comcast、Geotab、Gurunavi、**L'Oréal**（通过 MCP 连自家 Beauty Tech 平台）、Payhawk、PayPal

**协议支持**：MCP、AP2（新）、WebSocket、Pub/Sub、BigQuery

**定价**：未披露

### 2.2 Microsoft — Copilot Studio + Agent Framework 1.0

**打法**：SaaS + OSS SDK 双轨，覆盖所有客户层级。

**Agent Framework 1.0 GA（2026-04-06）**：
- **SK + AutoGen 合并**的开源 SDK（.NET + Python）
- "enterprise-grade multi-agent orchestration, multi-provider model support, cross-runtime interoperability via A2A and MCP"
- 基础构件：agent、workflow、memory、middleware、orchestration
- **原生支持 A2A 和 MCP**——协议层中立

**Copilot Studio 2026 Release Wave 1（2026-04 起）**：
- 新知识类型、评估工具、out-of-the-box workflow actions
- SaaS 定位："帮组织构建 AI agent 和 agentic workflow"
- 与 Microsoft 365 深度耦合

**战略意图**：
- Copilot Studio = 面向 IT 管理员和业务用户的 SaaS agent 构建器（低代码）
- Agent Framework = 面向开发者的代码级 SDK（代码）
- **统一通过 A2A/MCP 互操作** — 明确押协议中立，不自建封闭协议
- **Frontier Suite（2026-03）**：企业级开发者工具集，更 tech-heavy

### 2.3 AWS — Bedrock AgentCore

**架构**（模块化，可单独选用）：
- **Runtime**：serverless 部署，会话隔离 + VPC + PrivateLink
- **Gateway**：统一工具/API 访问
- **Memory**：跨 session 上下文
- **Identity**：跨 AWS + 第三方服务的认证
- **Browser + Code Interpreter**：内置
- **Observability / Evaluations / Policy**：监控、质量评分、细粒度权限

**2026-04 新增**：
- **Managed Harness（preview）**：指定 model + system prompt + tools 就能跑，无需 orchestration code——**和 Anthropic Claude Managed Agents 打法一致**
- **免费**：harness / CLI / skills 都不单独收费
- **2026-04-15 起**：Browser Profiles 的 S3 存储（cookies/localStorage）按 S3 Standard 计费

**定价逻辑**：
- CPU：按实际消耗，I/O wait 不收费
- Memory：按峰值内存/秒
- **模块按需组合**——"用哪个付哪个"，不强打包

**定位**：
- 对开发者更友好、更"原子化"
- 企业端不强调 governance 完整性（留给客户 DIY），开发速度优先

### 2.4 三巨头横向对比

| 维度           | Google Gemini Enterprise                          | Microsoft Copilot Studio + Agent Framework | AWS Bedrock AgentCore     |
| ------------ | ------------------------------------------------- | ------------------------------------------ | ------------------------- |
| **平台形态**     | 单一收束产品（吸收 Vertex AI）                              | SaaS + OSS SDK 双轨                          | 模块化组件                     |
| **目标用户**     | 大企业（governance 强需求）                               | 所有层级（IT 管理员 + dev）                         | 开发者优先                     |
| **Build 工具** | Studio + ADK + Garden                             | Copilot Studio + Agent Framework 1.0       | Bedrock + Managed Harness |
| **治理能力**     | ★★★★★（identity / registry / gateway / simulation） | ★★★★（Entra 生态）                             | ★★★（IAM + 自定义）            |
| **协议支持**     | MCP + AP2 + WebSocket                             | **A2A + MCP**（最中立）                         | MCP（通过 Gateway）           |
| **模型开放度**    | 200+ 含 Claude 全系                                  | Azure OpenAI + 少量第三方                       | Bedrock catalog           |
| **计费策略**     | 未公布                                               | 打包 Copilot 授权                              | **消耗为单位**，I/O wait 免费     |
| **杀手锏**      | Memory Bank + Agent Identity + ADK 6T token/月     | Microsoft 365 + Office 分发                  | AWS 已有客户池 + 模块化           |
| **弱点**       | 新平台，生态待建                                          | 不同产品线割裂                                    | 治理完整性弱                    |

---

## 3. 模型厂自建平台：OpenAI + Anthropic

### 3.1 OpenAI — AgentKit + Agents SDK + Workspace Agents + Frontier

**多产品并行**（打法杂）：

1. **Agents SDK**（开源，Python + TypeScript）
   - 从 Swarm 实验升级而来
   - 2026-04-15 更新：新增 **sandbox**，agent 可在受控计算机环境里独立工作

2. **AgentKit**（2025-10 发布，2026 持续扩展）
   - **Agent Builder**：可视化多 agent workflow 画布
   - **Connector Registry**：管理员侧管理跨 OpenAI 产品的数据/工具连接
   - **ChatKit**：嵌入式 chat agent UI 工具包
   - **状态**：Agent Builder 在 beta；Connector Registry beta 推给 API + ChatGPT Enterprise + Edu 客户

3. **Frontier（2026-02 发布）**
   - 企业平台，面向"管理 AI 同事（AI coworkers）"
   - 共享业务上下文 + execution 环境 + evaluation + permissions
   - 这是 OpenAI 明确"**做 agent 管理层，不只是模型 API**"的信号

4. **Workspace Agents（2026-04-23）**
   - **Custom GPTs 的继任者**
   - 直接插 Slack / Salesforce 等企业应用
   - 由 **Codex**（云端部分开源的 AI coding harness）驱动

**战略节奏**：从 ChatGPT Plugins → Custom GPTs → Assistants API → AgentKit → Frontier → Workspace Agents。**每年换一套命名和 API**——企业客户正在吐槽这个碎片化。

### 3.2 Anthropic — Claude Managed Agents + Agent SDK

**Agent SDK**（2026-Q1 更名，原名 Claude Code SDK）
- 和 Claude Code 共享 tool、agent loop、context management
- Python + TypeScript
- 用于自建 agent

**Claude Managed Agents（2026-04-08 公共 beta）**——**这次研究最值得关注的单品**

- **定位**：套可组合 API，用于在 Anthropic 基础设施上部署云端 agent
- **开发范式**：自然语言或 YAML 定义 agent + guardrails
- **核心承诺**："无需 provision 服务器、配 sandbox、监看 orchestration loop"
- **定价**：**$0.08/session-hour**（叠加标准 token 价格）——**业界第一个公开"按 session-hour"计费的 agent 平台**
- **客户**：Notion、Rakuten、Asana、Sentry、Allianz
- **范式**：开发者只定义 outcome（persona、permitted tools、MCP servers、success criteria），系统自动管理 tool 调用时机、context 压缩、错误恢复
- **beta header**：`managed-agents-2026-04-01`

**VentureBeat 提醒**：这是"enterprise 新的一站式入口，但有 vendor lock-in 风险"——这个评估很关键。**Anthropic 在用打包 managed runtime 的方式把客户从"multi-model"推回"Anthropic-only"**。

---

## 4. SaaS 巨头内嵌：Salesforce + ServiceNow

这层是 2026 企业 agent 采购的**真正现金流入口**。他们不卖平台，他们卖"已绑定的 CRM/ITSM 客户资产 + agent"。

### 4.1 Salesforce — Agentforce 360

**数字（最扎实）**：
- **12,000 客户**（2025-10）—— CEO Marc Benioff 称"**Salesforce 史上增长最快的产品**"
- **8,000 客户**在 6 个月内签约（Slack Workforce Index）
- 从 2025 年连续四次重大更新，全面 GA 为 **Agentforce 360**

**Agentforce 3（2025-06）关键能力**：
- **Command Center**：全局 observability
- **MCP 原生支持**：开放标准互操作
- **AgentExchange**：30+ 合作伙伴集成，包括 AWS、Box、Cisco、Google Cloud、IBM、Notion、PayPal、Stripe

**客户效果**（数字说话）：
- Engine：客户 case 处理时间降 **15%**
- 1-800Accountant：报税高峰期自动处理 **70%** admin chat
- Grupo Globo：订阅留存提升 **22%**

**本质**：Salesforce 把 CRM 客户资产 + Einstein → Agentforce 重新包装，**绑 SaaS 订阅卖 agent**，不碰开发者生态。

### 4.2 ServiceNow — Autonomous Workforce + Moveworks

**2026-04 关键动作**：
- **Autonomous Workforce**：不是一堆 task agent，而是**多个"专职 AI specialist"组队**（L1 Service Desk / Employee Service Agent / Security Operations Analyst），协作完成端到端工作——比"单 agent"更 enterprise-friendly
- **收购 Moveworks 并入平台**
- **全产品线 AI enabled**：不再是 sidecar，而是 AI-native across all products
- **2026-04-22 与 Google Cloud 联合**：ServiceNow agent + Google Cloud agent 互连，用于 5G / 零售 / IT

**打法与 Salesforce 雷同**：拿 ITSM 老客户升级到 agentic，绑订阅。

### 4.3 其他 SaaS 提及
- SAP **Joule** + agents
- Oracle **Fusion AI Agents**
- HubSpot **Breeze**
- **本文未深入**——都是相同逻辑：存量客户 + agent 订阅

---

## 5. 中国四强 + OpenViking

### 5.1 字节 — 扣子 2.0（2026-01-20 升级）

**四件套**：Agent Skill / Agent Plan / Agent Coding / Agent Office

**服务规模**：
- 2024-02 诞生
- 服务 **1000 万+ 真实开发场景**
- 2.0 全局重构，定位"帮职场人"

**企业版定价（少见的透明）**：
- **¥4,980/月**
- 3,000,000 资源点/月
- 12,000 模型请求/分钟
- 空间 + 人数无上限
- 2TB 知识库 + 声音复刻

**开源武器**：
- Coze Studio + Coze Loop（Prompt 运维）**Apache 2.0 开源**
- 允许商业使用和分发
- **这在 US 大厂里没有对等物**——这是字节的独特战略

### 5.2 阿里 — 百炼（Bailian）

**规模（最大的）**：
- **20 万+开发者**
- **80 万+ Agents**
- 日均模型调用量一年增 **15 倍**
- 客户：**90% 互联网公司、90% 上市商业银行、90% 汽车品牌、90% 手机品牌、1000+ 政企、300+ 科研院校**

**Agent Infra 七件套（2025-04 升级完成）**：
MCP Server（工具）+ RAG Server（多模数据）+ Sandbox Server + Memory Server + Pay Server + 2 个其他 enterprise 能力

**未来**：**AI Agent Store**——阿里明确要做"agent 分发"，Coze 打对家

### 5.3 百度 — 千帆 AgentBuilder + 文心智能体平台

**规模**：
- **130 万+ Agents**
- 60+ 工具组件（OCR、TTS 等）
- 开发者大使计划启动（2026-02）

**特色**：RAG + GBI（生成式 BI）+ 长文档摘要 + CoT 规划

### 5.4 腾讯 — 元器（Yuanqi）

**差异化优势**：
- **微信 + QQ 分发护城河**——别人要自己铺渠道，腾讯天然覆盖
- 零代码 + 强生态组合
- 典型客户：电商 WeChat 客服机器人（处理 70% 常见问题，降本 50%）；美妆品牌 AI 肌肤检测（转化率提升 35%）

**市场背景**：IDC 2025H1 中国 AI 大模型解决方案市场 ¥307 亿，同比 +122.1%——**中文企业 agent 已经是实打实的 scale production 阶段**

### 5.5 OpenViking（ByteDance 2026-01 开源，15k ⭐）

- 不是分发平台，是**"context OS"**
- 所有国产 Claw 框架（QClaw / ArkClaw / JVS Claw / MiClaw）基于它
- 详见 [org-context-landscape-2026](/output/reports/agora/market-competition/org-context-landscape-2026/)

### 5.6 中国市场特色
- **开源策略积极**（扣子 + OpenViking Apache 2.0），美国大厂基本闭源
- **分发渠道现成**（微信、QQ、钉钉、飞书）——美国缺对等物（Salesforce / Slack 是最接近的）
- **定价透明**：扣子 ¥4,980/月这种 SKU 美国大厂罕见
- **大盘仍在早期**：IDC 数据显示刚进"规模化生产"阶段

---

## 6. 平台原语收敛图

以下是 **2026-04 所有大厂 agent 平台的公共原语**。谁没做齐谁就落后：

| 原语 | Google | Microsoft | AWS | Anthropic | OpenAI | Salesforce | 阿里百炼 | 字节扣子 |
|---|---|---|---|---|---|---|---|---|
| **可视化 Builder** | Agent Studio | Copilot Studio | AgentCore Console | 无 | Agent Builder | Agent Builder | 百炼控制台 | 扣子 Studio |
| **Code SDK** | ADK | Agent Framework 1.0 | Bedrock SDK | Agent SDK | Agents SDK | Apex + AI SDK | SDK | SDK |
| **Runtime** | Agent Runtime | Copilot Studio runtime | AgentCore Runtime | Managed Agents | Responses API | Agentforce runtime | 百炼 Runtime | 扣子 Runtime |
| **长期 Memory** | ★ Memory Bank | ★ Memory middleware | ★ AgentCore Memory | session state | Memory tool | Atlas reasoning engine | ★ Memory Server | Agent Plan 记忆 |
| **Sandbox / Code Exec** | Agent Sandbox | - | Code Interpreter | 内置 | Sandboxing | - | Sandbox Server | 沙箱 |
| **Registry/Marketplace** | ★ Agent Registry | Copilot Studio hub | - | - | Connector Registry | AgentExchange（30+） | **AI Agent Store**（规划中）| 扣子商店 |
| **Gateway/权限** | ★ Agent Gateway | Entra Agent ID | AgentCore Gateway | - | - | Permission Sets | - | - |
| **Identity（加密）** | ★ cryptographic | Entra Agent ID | IAM | - | - | - | - | - |
| **Simulation / Eval** | ★ Agent Simulation + Evaluation | Evaluation tools | Evaluations | beta eval | Evals | Testing Center | - | 扣子评测 |
| **Observability** | ★ Agent Observability + Optimizer | Copilot Studio analytics | AgentCore Observability | Console | Logs + Traces | Command Center | 百炼监控 | Coze Loop |
| **MCP 支持** | ✓ | ✓（A2A + MCP）| ✓（Gateway）| ✓（原生）| ✓ | ✓（3.0 原生）| ✓（MCP Server）| ✓ |
| **A2A 支持** | 部分 | **✓（明确）** | 部分 | - | - | - | - | - |
| **支付协议** | AP2 | - | - | - | - | Stripe 集成 | Pay Server | 预留 |

**收敛信号**：
- **Memory、Registry、Gateway、Identity、Simulation、Evaluation**——六大企业级治理原语，全员补齐赛跑
- **MCP 全员支持** —— 事实协议
- **A2A 只有 Microsoft 明确押** —— 其他家暧昧（Google 有 A2A 但 2026-04 blog 没强调）
- **支付协议碎片化**：Google AP2 vs Stripe ACP vs 各家自建——见 [agent-world-2028-synthesis](/output/reports/agora/market-competition/agent-world-2028-synthesis/) 的协议四层栈

---

## 7. 大厂 Agent Platform 的五个战略选择

将大厂打法抽象出来，有五个独立的战略维度：

### 轴 1：是做 **SDK/开源** 还是 **SaaS/托管**？
- **SDK 优先**：Microsoft Agent Framework、Anthropic Agent SDK、OpenAI Agents SDK
- **SaaS 优先**：Salesforce Agentforce、ServiceNow Autonomous Workforce、字节扣子企业版
- **两者都做**：Google、AWS、Microsoft（Copilot Studio + AF 双轨）

### 轴 2：**平台打包** 还是 **模块组合**？
- **一揽子打包**：Google Gemini Enterprise（Vertex AI 吸收）、Salesforce Agentforce 360
- **模块组合**：AWS AgentCore、Microsoft Agent Framework

### 轴 3：**模型多供** 还是 **模型独占**？
- **多供**：Google（200+ 含 Claude）、Microsoft（SDK 层多供；SaaS 层 Azure OpenAI）、AWS（Bedrock catalog）
- **独占**：Anthropic Managed Agents、Salesforce（Einstein + 部分外部模型）

### 轴 4：**协议中立** 还是 **自建封闭**？
- **最中立**：Microsoft（A2A + MCP 原生，对外喊最响）
- **中立**：Salesforce（MCP 原生 + 30+ 合作）、AWS
- **半中立**：Google（MCP + AP2 自建）、Anthropic（MCP 但绑 runtime）
- **封闭**：OpenAI（碎片化的私有 API 生态）

### 轴 5：**分发靠平台自建** 还是 **寄生已有渠道**？
- **寄生**：Salesforce（CRM 客户池）、ServiceNow（ITSM）、字节扣子（飞书/抖音）、腾讯元器（微信/QQ）、Microsoft（Office/M365）
- **自建**：Google、AWS、Anthropic、OpenAI（对 B 端）

**对 BENZEMA 方向的含义**：第五轴最关键——**没有现成分发渠道的 agent 平台都在苦苦扩张客户**。Claude Code 寄生，是聪明的"寄生在已被开发者装的 runtime 上"的打法，属于**"逆向寄生"**（模型厂/平台寄生在自己 CLI 客户端里）。

---

## 8. 大厂不碰 / 做不好的空白

结合 memory `project_agent_economy.md` + 近两次 session 的方向收敛（[agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/)），以下是大厂结构性不会碰的空白：

### 空白 1：**个人账号绑定 + 本地执行**（xhs / 抖音 / 淘宝 / 淘特）
- **大厂做不到**：AgentCore / Agent Runtime 都在云，IP 是数据中心，小红书风控秒封
- **Browserbase 在做**：residential IP + 用户 cookie，但这是 B2B infra，不是 consumer 自动化
- **空白**：orchestrator-worker 架构（控制面 SaaS + 执行面用户本地），垂直 SKU

### 空白 2：**Claude Code / Cursor / Chrome 寄生的 2C 垂直 marketplace**
- **大厂做不到**：Anthropic 有 Skills 但零变现层；Cursor 无 registry；Chrome Web Store 有但治理不够严
- **空白**：**"Stripe for Skills"**——结算 + 审核 + piracy 防护 + 订阅
- **竞争者**：Smithery / Glama / PulseMCP 偏 B2B 开发者；没有 2C 垂直玩家

### 空白 3：**中国独立开发者级 BYOC marketplace**
- 扣子 / 百炼 / 千帆 / 元器都是平台锁定
- OpenViking 是 infra OS 不是 marketplace
- **空白**：中文独立开发者 + 用户自带 API key + 创作者分成，类 Apify 的中国版

### 空白 4：**2C 长尾场景结算**
- 大厂支付协议（AP2 / ACP / x402）都偏 B2B agent-to-merchant、agent-to-agent
- **空白**：C 端用户为某个 agent skill 付 $9.99/月 这种低客单长尾结算
- Anthropic Managed Agents 的 $0.08/session-hour 是 B2B，不是 C 端

### 空白 5：**Personal AI workforce**（不是 enterprise）
- 大厂都讲 Autonomous Workforce / AI Coworker，但都是 enterprise 语境
- **空白**：个人用户（"我"）有一队 agent 帮我跑 xhs / 抖音 / 选品 / 回私信——这正是 rent-ops + xhs wedge 指向的方向

---

## 9. 对 BENZEMA 方向的直接判断

memory 里写过的"Shopify for Agent Skills"方向，**在大厂 2026-04 的布局后反而更清晰了**：

1. **Claude Code 寄生 + 垂直 agent marketplace 是正确方向**
   - 大厂不会碰 2C 长尾
   - Anthropic Managed Agents 的 $0.08/session-hour 定义了 B2B 底价，2C 垂直可以做更高定价
   - Skill 形态已被 Anthropic 背书（6T token/月 只是 Google ADK 数据，Anthropic Skills 规模类似）

2. **不要和 Google / Microsoft / AWS 正面打 B2B governance**
   - 他们六大原语（memory/registry/gateway/identity/simulation/eval）已全员补齐
   - 你做不过他们的 enterprise sales motion
   - **只做 2C + 个人账号场景**

3. **xhs wedge 的技术门槛在上升**
   - Browserbase + residential IP 是 2026 方向
   - 你如果做纯本地执行，要想清楚 always-on 方案
   - 或者 embrace "只在用户在线时工作"的约束，做 B2SMB（中小商家自己电脑挂着跑）

4. **协议押 MCP + AP2（不是 A2A）**
   - Google / Anthropic / Microsoft / Salesforce 全员 MCP 原生——MCP 胜出
   - 支付押 AP2（Google + PayPal 生态）或 Stripe ACP（成熟）
   - A2A 目前只有 Microsoft 喊，吃不准

5. **AI Agent Store（阿里规划中）是近期最大威胁**
   - 阿里若真做 AI Agent Store，会把中国独立开发者 marketplace 这个空白吃掉
   - **抢跑窗口：2026 Q2-Q3 大概 6-9 个月**
   - 或者 embrace 阿里生态，做 store 之上的垂直 curation 层

---

## 10. 关键 References

### Google Gemini Enterprise（起点）
- 官方博客：https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform
- Agent Platform 产品页：https://cloud.google.com/agent-platform

### Microsoft
- Agent Framework 1.0 GA 博客：https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/
- Copilot Studio 2026 Wave 1：https://learn.microsoft.com/en-us/power-platform/release-plan/2026wave1/microsoft-copilot-studio/
- Visual Studio Magazine 分析：https://visualstudiomagazine.com/articles/2026/04/06/microsoft-ships-production-ready-agent-framework-1-0-for-net-and-python.aspx
- Frontier Suite（2026-03）：https://adtmag.com/articles/2026/03/12/microsoft-e7.aspx

### AWS
- AgentCore 主页：https://aws.amazon.com/bedrock/agentcore/
- AgentCore 定价：https://aws.amazon.com/bedrock/agentcore/pricing/
- 2026-04 新特性：https://aws.amazon.com/about-aws/whats-new/2026/04/agentcore-new-features-to-build-agents-faster/
- AWS ML blog：https://aws.amazon.com/blogs/machine-learning/get-to-your-first-working-agent-in-minutes-announcing-new-features-in-amazon-bedrock-agentcore/

### OpenAI
- AgentKit 发布：https://openai.com/index/introducing-agentkit/
- Agents SDK（Python）：https://openai.github.io/openai-agents-python/
- 2026-04-15 SDK 更新（TechCrunch）：https://techcrunch.com/2026/04/15/openai-updates-its-agents-sdk-to-help-enterprises-build-safer-more-capable-agents/
- Workspace Agents（2026-04-23）：https://www.dataworldbank.net/2026/04/23/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more/
- Team 400 综合分析：https://team400.ai/blog/2026-03-openai-agents-platform-guide

### Anthropic
- Claude Managed Agents 官方文档：https://platform.claude.com/docs/en/managed-agents/overview
- VentureBeat 深度（lock-in 风险评）：https://venturebeat.com/orchestration/anthropics-claude-managed-agents-gives-enterprises-a-new-one-stop-shop-but
- InfoWorld 报道：https://www.infoworld.com/article/4156852/anthropic-rolls-out-claude-managed-agents.html
- SiliconANGLE：https://siliconangle.com/2026/04/08/anthropic-launches-claude-managed-agents-speed-ai-agent-development/
- Agent SDK 文档：https://code.claude.com/docs/en/agent-sdk/overview
- GitHub：https://github.com/anthropics/claude-agent-sdk-python

### Salesforce
- Agentforce 3 官方：https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement/
- Agentforce 360 投资者 PR：https://investor.salesforce.com/news/news-details/2025/Welcome-to-the-Agentic-Enterprise-With-Agentforce-360-Salesforce-Elevates-Human-Potential-in-the-Age-of-AI/default.aspx
- Cirra 产品解析：https://cirra.ai/articles/salesforce-agentforce-3-ai-agents
- Salesforce Ben 分析：https://www.salesforceben.com/salesforce-announces-agentforce-3-0-command-center-mcp-and-apps/
- CompanyBench 2026 指南：https://companybench.com/blog/salesforce-agentforce-guide-2026

### ServiceNow
- AI Agents 产品页：https://www.servicenow.com/products/ai-agents.html
- Autonomous Workforce + Moveworks 新闻：https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-Autonomous-Workforce-that-thinks-and-acts-adds-Moveworks-to-the-ServiceNow-AI-Platform/default.aspx
- 与 Google Cloud 联合（2026-04-22）：https://www.googlecloudpresscorner.com/2026-04-22-ServiceNow-and-Google-Cloud-Unite-AI-Agents-for-Autonomous-Enterprise-Operations
- 2026 Agentic AI 指南：https://www.kellton.com/kellton-tech-blog/servicenow-agentic-ai-2026-guide

### 中国
- 字节扣子 2.0（极客公园深度）：https://www.geekpark.net/news/359437
- 扣子 2.0 官宣：https://news.bjd.com.cn/2026/01/20/11535519.shtml
- 阿里百炼主页：https://www.aliyun.com/product/bailian
- 百炼 Agent 工厂（量子位）：https://www.qbitai.com/2025/04/272196.html
- 百炼全栈能力（InfoQ）：https://www.infoq.cn/article/ya6zml7irki6ph3c56hr
- 百度千帆 AppBuilder：https://ai.baidu.com/ai-doc/index/AppBuilder
- 千帆开发者大使（2026-02）：https://finance.sina.com.cn/tech/roll/2026-02-06/doc-inhkvvnp5144041.shtml
- 腾讯元器 V2：https://yuanqi.tencent.com/v2
- 国内 Agent 平台 8 强对比：https://www.betteryeah.com/blog/domestic-agent-platforms-2026

### Gartner 市场数据
- 40% 企业应用带 agent（2026 年底）：https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025
- Microsoft + Google 领先分析：https://www.ciodive.com/news/microsoft-google-rule-ai-market-enterprises/808311/
- Next Web Google Cloud Next 2026：https://thenextweb.com/news/google-cloud-next-ai-agents-agentic-era

---

## 11. 待深挖的几条线（下次 query）

1. **Anthropic Managed Agents 定价对比分析**：$0.08/session-hour 对比 AWS AgentCore 消耗计费、Google 未公布、字节扣子 ¥4,980/月——建一个 unit economics 表，看 2C 垂直能承受的上限
2. **阿里 AI Agent Store 时间表**：2026 什么时候正式推出？对独立开发者开放程度？分成比例？
3. **Google AP2 vs Stripe ACP vs x402 三支付协议落地竞争**：哪家真正跑起来，PayPal 等金融机构怎么选
4. **Claude Skills 变现层的进展**：Anthropic 是否会在 2026 下半年给 Skills 加 marketplace 层？若会，会吃掉我方向
5. **OpenViking 生态进展**：是否出海？是否接 MCP？能否演化出 registry？
6. **browserbase / stagehand 等 residential IP 方案的成本和封禁率**：xhs 垂直做不做得下来
