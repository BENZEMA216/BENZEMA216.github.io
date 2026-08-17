# Cloud Agent Infra 2026：厂商分层、选型与验证门槛

> 生成时间：2026-08-06
> 查询：cloud agent infra 有哪家做得比较好？
> 研究边界：基于知识库现有 Agent Infra 材料，并以厂商官方文档、官方工程博客和官方 GitHub 核验当前产品；性能和客户数字若没有独立复现，均按 vendor-reported 处理。

## 摘要

**没有一家在所有层都最好。若把问题限定为 Agent 的云端执行环境，当前最值得作为默认双跑的是 E2B 与 Modal；Daytona 因功能面特殊而保留第三席：**

- **Modal**：大规模并发、RL / eval、突发创建和 GPU / serverless compute 一体化最强；它更像高性能 Agent compute fabric。
- **E2B**：Agent-native SDK、Firecracker microVM、Template、pause/resume、snapshot 和开源自托管之间最均衡；对多数初创 Agent 产品是最稳妥的默认项。
- **Daytona**：持久 workspace、Linux VM / Windows / GPU、hot snapshot / fork、Volume、egress firewall 与凭证代理的功能面最宽；但 2026-06 已把核心开发转入私有代码库，旧 OSS 停止维护，因而只在这些特殊能力命中时进入 PoC，不再作为通用默认项。

如果不想自己维护 agent loop、session、event stream 和恢复逻辑，而是希望直接调用完整托管 Agent，则应另看 **Claude Managed Agents** 或云厂商的 Agent platform；它们不是 E2B / Modal / Daytona 的同类替代。浏览器任务则优先看 **Browserbase + Stagehand**，它也不是通用 Linux runtime。

一句话选型：

| 需求 | 当前首选 | 第二选择 | 原因 |
|---|---|---|---|
| 通用 Agent 产品，先快速上线 | **E2B** | Modal | agent-native DX、microVM、状态和退出路径均衡 |
| 10k–1M 级突发 sandbox、RL / eval | **Modal** | E2B Enterprise | 调度与资源平台是其真正强项 |
| 长期 per-user computer、Windows、hot fork | **Daytona VM（合同确认）** | E2B / OpenComputer | VM、持久化、fork、Volume、secret proxy；但开源治理已转向 |
| 企业级完整 Agent 平台 | **AWS AgentCore** | Google / Microsoft | Runtime + Harness + IAM/VPC/Gateway/Policy/Eval 已大体 GA |
| Claude-first、想少造完整 runtime | **Claude Managed Agents** | AWS AgentCore | Agent / Environment / Session / Events 已产品化，DX 最直接 |
| Browser / computer-use 自动化 | **Browserbase + Stagehand** | Browserless / Steel | browser session、identity、proxy、replay 是专门控制面 |
| 跨进程/跨天 durable workflow | **Temporal** | 云厂商工作流 | 负责 orchestration，不负责 sandbox 或 Agent 智能 |
| 开源可私有化 traces / eval | **Langfuse** | Braintrust / LangSmith | 观测层，不是执行层 |

## 1. 先把“Cloud Agent Infra”拆开

Cloud Agent Infra 至少包含五层：

```text
Agent application / product UX / tenant ownership / outcome acceptance
  ↓
Agent runtime：loop、Session、Events、steering、retry、memory、approval
  ↓
Execution environment：sandbox / VM、filesystem、network、credential、snapshot
  ↓
Specialized hands：browser、search、MCP / API tools
  ↓
Observability / eval / durable workflow / business state
```

这五层可以打包出售，但不能互相证明：

- 能启动一个容器，不等于任务中断后能可靠恢复；
- 有 durable workflow，不等于不可信代码已安全隔离；
- 有 trace，不等于结果正确；
- 有 browser session，不等于有业务状态、审批和 outcome acceptance；
- 有 model / agent SDK，不等于有多租户云端执行面。

知识库中的 [agent-runtime](/wiki/concepts/agent-runtime/) 与 [agent-infrastructure](/wiki/maps/agent-infrastructure/) 已把 Runtime 定义为安全执行、长期状态、恢复和责任闭环，而非一个 shell API。[agent-infra-update-2026-08-03](/raw/articles/agent-infrastructure/agent-infra-update-2026-08-03/) 也将 Sandbox、File System 与 Stateful Backend 分开，这个分层比把所有厂商放进一张总榜更有用。

## 2. 核心执行环境 shortlist

### 2.1 Modal：规模与 compute fabric 最强

**实际输入 / 输出**

```text
Image + command + CPU/RAM/GPU + network policy + timeout
→ isolated gVisor container
→ exec/stdout/stderr/files/tunnel/lifecycle
→ filesystem/directory/memory snapshot
```

**为什么做得好**

1. Modal 的优势不是“也有 Sandbox SDK”，而是它原本就是 serverless CPU/GPU 平台，Sandbox 复用了 image、调度、资源和多云 fleet。
2. 官方 2026-07 压测称一分钟内创建 100 万个 Sandbox、单实例 time-to-interactivity 中位数低于 0.5 秒；这是厂商自测，不是独立 benchmark，但至少披露了控制面重构和瓶颈位置。
3. Sandboxes 已 GA；官方案例公开了 Poe / Quora、Codegen、Relevance AI 和 SWE-bench 并行运行等生产形态。
4. 网络可全断、按 CIDR allowlist，domain allowlist 也已提供但仍为 Beta；Sandbox 默认不能访问同 Workspace 的 Modal resources。
5. 计费按秒，CPU、RAM、GPU 与整个平台统一，适合 workload 波动大、任务数远高于活跃用户数的场景。

**战略边界 / 反方**

- 它首先是高性能 compute，不是完整 Agent Session / business workflow runtime；你的 app 仍需保存用户、任务、事件、审批、恢复点和最终验收。
- 单个 Sandbox 最长 24 小时；更长任务需外部 controller 配合 filesystem snapshot 后重建。
- filesystem snapshot 已成熟，memory snapshot 仍是 Alpha，存在 7 天 TTL、网络连接断开、GPU 不支持等限制。
- Modal 没有通用 on-prem / self-host 路线；需要数据面完全进入客户 VPC 时，优先看 E2B，Daytona 仅以合同确认的 BYOC runner 作为条件候选。
- Modal Secret 若以环境变量注入执行环境，Agent 代码可以读取它。高权限任务仍应采用 sandbox 外的 credential proxy，而非只靠“Secret store”。

**适合**：RL environment、benchmark/eval、代码执行平台、突发多租户、GPU 与 sandbox 共用资源面。

**不适合优先选**：需要一台同 ID 的电脑跨数周保持完整 RAM/process 状态、强 BYOC/on-prem、或希望供应商直接交付完整 agent loop 的团队。

官方来源：[Sandboxes](https://modal.com/docs/guide/sandboxes) · [百万并发工程说明](https://modal.com/blog/scaling-to-1-million-concurrent-sandboxes-in-seconds) · [Snapshots](https://modal.com/docs/guide/sandbox-snapshots) · [Networking](https://modal.com/docs/guide/sandbox-networking) · [Pricing](https://modal.com/products/sandboxes)

### 2.2 E2B：多数 Agent startup 的默认项

**实际输入 / 输出**

```text
Template + resource + lifecycle + network policy + command/files
→ Firecracker microVM
→ process/files/ports/desktop/code interpreter
→ pause/resume same sandbox 或 snapshot → many sandboxes
```

**为什么做得好**

1. E2B 从 Coding Agent 转型而来，SDK、Template、Code Interpreter、Desktop 与 Cookbook 都直接围绕 Agent application 的调用方式设计。
2. 每个 Sandbox 基于 Firecracker microVM，隔离强度与审计面比共享 kernel container 更直观。
3. pause/resume 保存 filesystem 和 memory，包括 process 与 loaded variables；paused sandbox 官方称可无限期保留，恢复约 1 秒。
4. snapshot 是一对多 checkpoint，原 sandbox 可继续运行；这适合并行探索、评测和从已安装环境批量分叉。
5. 核心 SDK / infra 公开；公开 Terraform 路线当前明确支持 GCP、AWS 为 Beta，Azure / 通用 Linux 尚未支持。Enterprise 另售更广 BYOC / on-prem 能力，但不能与公开 OSS 路线等同。
6. Manus、Gumloop、Groq、Hugging Face 等官方案例说明它不只服务 code interpreter，但仍属于厂商案例而非独立 SLA 证明。

**战略边界 / 反方**

- E2B 是“手”和 workspace，不会替你完成 durable business workflow、approval、tool authorization、side-effect reconciliation 与 outcome verification。
- Base / Pro 的连续运行上限分别为 1 / 24 小时；长任务依赖正确 pause/resume，controller 仍需容忍掉线与重复执行。
- 独立于 sandbox 生命周期、可跨 sandbox 挂载的 Volume 已有，但当前仍是 private beta；共享 durable volume 若是硬需求，必须列为合同与 PoC gate。
- 公共套餐的创建速率和并发不高：Hobby 1 sandbox/s、Pro 5/s，标准并发 20 / 100，超大规模要谈 Enterprise。
- 传入 sandbox 的普通 env var / secret 仍可能被不可信代码读取；E2B 有 network allow/deny，但高权限凭证最好留在外部 proxy。
- 自托管基础设施真实存在，但意味着自行运营 Firecracker、调度、网络、存储和升级，不是“零锁定、零成本”。

**适合**：通用 SaaS Agent、coding/research/data Agent、需要 microVM 隔离与可迁移性的早期团队。

**不适合优先选**：已经确认需要百万级瞬时 burst，或需要 Windows / 丰富 VM class / 内建凭证代理的场景。

官方来源：[Sandbox](https://e2b.dev/docs/sandbox) · [Persistence](https://e2b.dev/docs/sandbox/persistence) · [Snapshots](https://e2b.dev/docs/sandbox/snapshots) · [Volumes](https://e2b.dev/docs/volumes) · [Pricing](https://e2b.dev/pricing) · [Open-source infra](https://github.com/e2b-dev/infra) · [Enterprise / BYOC](https://e2b.dev/enterprise)

### 2.3 Daytona：功能面最宽，但开源治理转向后降为条件候选

**实际输入 / 输出**

```text
Image / Dockerfile / Snapshot + container / Linux VM / Windows / GPU class
+ CPU/RAM/disk + Volume + egress policy + proxied secret
→ persistent sandbox computer
→ process/files/git/LSP/code interpreter/computer-use/preview
→ stop/start、pause/resume、snapshot、fork、archive
```

**为什么做得好**

1. 默认 container 追求 `<90ms` 启动；Linux VM、Windows 和 GPU class 则覆盖更强隔离、桌面与专用计算。
2. 持久化是产品一等能力：filesystem 默认随 sandbox 保留；VM 可 pause/resume memory；cold/hot snapshots、fork 和独立 Volume 处理不同生命周期。
3. outbound firewall 可 block-all、CIDR/domain allowlist；Secret 不是明文 env var，而是 sandbox 内的 opaque placeholder，由 outbound HTTPS proxy 仅对 allowlisted host 替换真实值。这个结构比“把密钥放进 Secret 后作为 env 注入”更适合不可信 Agent。
4. BYOC 可把 runner / compute 放到客户机器和 custom region，能控制执行数据面；但它仍依赖 Daytona 的当前控制面，不等于完整 self-host。
5. SDK/API/CLI 覆盖 Python、TypeScript、Go、Java、Ruby，并已提供 Claude Managed Agents、Devin Outposts 等执行面接法。

**战略边界 / 反方**

- 功能面最宽也意味着变化和运维复杂度最高；container、VM、Windows、GPU、browser、Volume、snapshot 与 BYOC 不能因出现在同一文档就视为同等成熟。
- 默认快速路径是 Linux namespace container，而产品页同时使用“每个 sandbox dedicated kernel”的措辞，官方材料存在实质冲突。只有采购合同明确指定 VM class、host-kernel sharing、escape boundary 与 CVE patch SLA 后，才能把它当作强敌对代码的独立 kernel 执行面；不要把所有 `<90ms` 启动与 VM 强隔离同时套在同一个 workload 上。
- 公共池默认的 per-sandbox 资源和组织 tier 有限制，规模更大要升级 tier 或 BYOC；公开的百万级控制面压力证据弱于 Modal。
- **硬风险：官方 GitHub README 已声明仓库不再维护，2026-06 起核心开发迁至 private codebase，不再获得更新、修复或 release。** 旧 `v0.190.0` 仍可按原 license as-is fork/build，但无支持或保证；不能继续把 Daytona 当成当前开源、可持续自托管的默认选择。
- SOC / HIPAA 等合规信号来自其 Trust Center，采购仍需索取具体报告、覆盖范围与有效期。

**适合**：长生命周期 coding Agent、每用户一台电脑、Windows、computer-use、VM hot snapshot / fork、需要 secret proxy 与细粒度 egress 的任务；必须以合同确认 runtime 与 BYOC 边界。

**不适合优先选**：只需一次性 Python code execution；开源/self-host 是硬门槛；无法接受核心转私有；或需要已有充分公开规模证据的团队。

官方来源：[Sandboxes](https://www.daytona.io/docs/en/sandboxes/) · [Persistence](https://www.daytona.io/docs/en/persistence/) · [Snapshots](https://www.daytona.io/docs/snapshots/) · [Secrets](https://www.daytona.io/docs/en/secrets/) · [Network limits](https://www.daytona.io/docs/en/network-limits/) · [Scale / BYOC](https://www.daytona.io/docs/en/scale/) · [GitHub](https://github.com/daytonaio/daytona)

### 2.4 OpenComputer：durable VM / Agent Session 方向值得跟踪，暂不列默认生产首选

OpenComputer 从 KVM persistent VM 向上做 hibernate、checkpoint/fork、elastic compute 与 durable Agent Sessions，控制点比普通 sandbox 更靠近完整 runtime。知识库已有 [opencomputer-vs-harnessrouter-2026-07-26](/output/reports/opencomputer-vs-harnessrouter-2026-07-26/) 的源码与产品对照。

它对 per-user coding workspace 的抽象很合理，但当前公开 Session API 仍标 experimental / preview，独立 production、规模、SLA 和安全审计证据都弱于前三家。适合可回滚 PoC，不应仅因“full VM”口号就成为高权限默认底座。

官方来源：[Product](https://opencomputer.dev/) · [VM / checkpoint docs](https://docs.opencomputer.dev/introduction) · [Session API](https://docs.opencomputer.dev/sessions-api/sessions)

## 3. 完整托管 Agent runtime

### Claude Managed Agents：Claude-first 的当前首选

Managed Agents 的真正输入不是一条 shell command，而是：

```text
Agent(model + system prompt + tools + MCP + skills)
+ Environment(container template + packages + network + mounts)
+ user Events
→ durable Session
→ streamed Events / tool calls / files / status
→ steer / interrupt / archive
```

它把 Agent / Environment / Session / Events 产品化，并把 harness、sandbox 与 append-only session log 分离。harness 或 sandbox 失败后可以重建，凭证留在 vault / MCP proxy，不进入不可信 execution sandbox。这比仅有 sandbox SDK 更接近完整的 long-horizon runtime。

当前价格为 active runtime `$0.08 / session-hour`，另计标准模型 token；API 仍要求 `managed-agents-2026-04-01` Beta header。优点是少造一整层 runtime，缺点是 Claude model lock-in、Beta 变化、平台抽象和计费控制权下降。适合 Claude-first 的异步研究、coding 和企业知识任务；不适合需要模型中立、完全自定义 loop、或把 session control plane 完全留在自有云的团队。

官方来源：[Overview](https://platform.claude.com/docs/en/managed-agents/overview) · [Sessions](https://platform.claude.com/docs/en/managed-agents/sessions) · [Engineering architecture](https://www.anthropic.com/engineering/managed-agents) · [Pricing](https://claude.com/pricing)

### AWS AgentCore：企业生产的默认首选

AgentCore 当前已经不能只理解为“你带 loop 的托管 container”。它有两条路径：

- **Runtime**：运行你自己的 Agent 代码、framework 与 loop，每个 session 使用独立 microVM；
- **Harness**：配置 model、prompt、tools、skills，由 AWS 托管完整 Agent loop。

Memory、Gateway、Identity、Browser、Code Interpreter、Observability 已在 2025-10 GA；Policy、Evaluations 与 Harness 也已在 2026 年分别 GA。它的真正优势是 IAM、VPC / PrivateLink、credential vault、外部 tool Gateway、Cedar 确定性 Policy、CloudWatch / OTel 和模型/框架中立可以组成同一套企业控制面。

边界也要逐项写清：Agent Registry 仍为 Preview；Optimization 中部分 failure / intent / trajectory insights 仍为 Preview；Runtime 单次执行最长 8 小时，跨 session state 仍需 Memory / files / application DB；采用 IAM、Gateway 和 Memory 越深，AWS 运维锁定越高。

**结论**：大型企业、已有 AWS landing zone、需要多模型与生产治理时，AgentCore 是完整 Agent platform 的当前首选；对小团队只想跑一段不可信代码，它比 E2B / Modal 重得多。

官方来源：[AgentCore GA](https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-agentcore-is-now-generally-available/) · [Harness GA](https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-bedrock-agentcore-harness-generally-available/) · [Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/)

### Google 与 Microsoft：已有 cloud home 时按生态选

| 平台 | 真正强项 | 当前边界 | 适用条件 |
|---|---|---|---|
| **Google Gemini Enterprise Agent Platform** | BYO Agent Runtime、Sessions / Memory Bank、最长 7 天任务、SPIFFE agent identity、mTLS / DPoP、Gateway / Registry / OTel | Managed Agents API 与 Semantic Governance 等仍有 Preview；治理与状态层绑定 GCP | BigQuery / Vertex / GCP 数据栈，重视长任务和 per-agent identity |
| **Microsoft Foundry Hosted Agents** | 自定义 Agent container、每 session VM、最长 30 天 session、Entra identity / OBO、M365 / Teams / Toolbox、版本与流量切分 | Hosted Agents 已 GA，但 session management、resilient tasks、Memory / routines 成熟度不一 | Entra、M365、Teams 与 Azure 网络是既有标准 |

Google 的状态以 [Gemini Enterprise Agent Platform release notes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes) 为准；Microsoft 的 Hosted Agents GA 见 [Foundry 公告](https://azure.microsoft.com/en-us/blog/gpt-5-6-now-available-in-microsoft-foundry/)。

对 greenfield startup，hyperscaler 通常比专用 sandbox 更重；对已有明确 cloud home、IAM 与私网要求的企业，它们可能反而是总拥有成本最低的方案。任何平台仍需逐项验证 generated code 是否进入独立 sandbox、credential 是否留在外部 broker、side effect retry 是否幂等、trace 能否导出，以及 GA / Preview 是否混用。

### OpenAI：已有 managed agent execution，但不是完整 hyperscaler runtime

Responses API 已有 server-side loop、background job、durable Conversation、MCP / web / file / computer，以及带 filesystem、shell、network allowlist 与 skills 的托管 container。若产品是“OpenAI model + hosted tools”，它可能已经够用。

但它目前不等价于 AgentCore / Google / Foundry 的通用企业 Agent application runtime：尚缺任意 Agent application container、per-agent workload identity / delegation broker、VPC private runtime、集中 tool gateway / 组织策略，以及完整 deployment / traffic-splitting control plane。不要因为工具面变宽就把它当成模型中立云平台。

## 4. 相邻基础设施：强，但不要买错层

### Browserbase + Stagehand

Browserbase 管 remote browser session、proxy、identity/auth、CDP/Playwright 和 session replay；Stagehand 在其上提供 code + AI 的控制层。它适合需要登录态、网页交互、视觉/DOM fallback 和可回放调试的 Agent，是当前 managed browser 默认 shortlist。

它不负责通用 Linux compute、durable business workflow 或最终验收。稳定、高频页面应把探索结果编译为 Playwright / API，而不是每一步永久让模型操作浏览器；可参考 [intuned-automation-integration-analysis-2026-07-22](/output/reports/intuned-automation-integration-analysis-2026-07-22/)。

官方来源：[Browserbase docs](https://docs.browserbase.com/) · [Stagehand](https://github.com/browserbase/stagehand)

### Temporal

Temporal 解决跨进程、跨 deploy、等待人类或外部事件后的 durable workflow；它适合保存 orchestration history、retry timer 和 compensation。它不提供安全执行不可信代码的 sandbox，也不会替 Agent 判断结果是否正确。合理组合是：

```text
Temporal workflow owns lifecycle
→ E2B / Modal / Daytona owns execution
→ application DB owns business truth
→ evaluator / human owns acceptance
```

官方来源：[Temporal docs](https://docs.temporal.io/)

### Langfuse / Braintrust / LangSmith

- **Langfuse**：开源、可自托管、OpenTelemetry 与 trace/eval 数据闭环，适合需要数据控制和 provider neutrality 的团队。
- **Braintrust**：eval-first、dataset/experiment/scorer 工作流较强，适合把发布 gate 建在评测之上。
- **LangSmith**：如果主栈已经是 LangChain / LangGraph，trace、deployment 和 eval 集成最顺；否则不必因知名度额外引入框架耦合。

三者都只能告诉你“发生了什么、按某个 evaluator 看起来如何”，不能自动证明业务结果正确，也不是 Agent execution cloud。

## 5. 公司质量与产品适配要分开

如果问题是在判断“哪家公司 infra 能力最硬”，当前顺序可以概括为：

1. **Modal**：底层调度、资源利用、GPU/CPU platform 与公开规模工程最强，infra 复利最明显。
2. **E2B**：Agent sandbox 类别心智、生态、microVM 与开源退出路径最均衡。
3. **Daytona**：产品原语很宽，但核心转入私有代码库、旧 OSS 停更是明确的治理负分；只有 Windows、VM hot fork、computer-use、secret proxy 等能力命中时才值得进 PoC。

如果问题是在判断“我的产品今天该采购谁”，这个顺序会反过来依赖 workload：多数 startup 默认 E2B，极端并发选 Modal；只有长期电脑、Windows、hot fork 或特定 BYOC 执行面才把 Daytona 加入合同化 PoC。**公司强不等于你的 workload fit 最好。**

新公司 Runta、Morph、Archil、Mesa 等分别押 execution governance、compute branching、POSIX-over-object-storage 和 versioned agent filesystem，方向值得跟踪，但当前不应在没有 production/SLA/客户迁移证据的情况下替代前三家。[agent-infra-update-2026-08-03](/raw/articles/agent-infrastructure/agent-infra-update-2026-08-03/) 对这些路线已有初步 mapping。

## 6. 真正的选型门槛：同一 workload 做 bake-off

不要依据 cold-start 单点数字或首页 logo 决策。用同一个 Agent、同一组任务、同一资源规格至少跑 100 次，并记录：

| Gate | 必测问题 | 通过标准示例 |
|---|---|---|
| Tenant isolation | A 用户能否枚举/连接 B 的 sandbox、port、file、snapshot | 0 越权；ID 不构成访问凭证 |
| Credential safety | prompt injection 能否读取或外传 token | 真实 token 永不进入 sandbox；只对 allowlisted host 注入 |
| Network | metadata、内网、任意公网、DNS rebinding 是否被控制 | 默认 deny 或明确 allowlist；策略变化可审计 |
| Lifecycle | controller / sandbox / network 分别 crash 后发生什么 | session 可重连；状态损失和 replay 边界明确 |
| Side effects | 最后一步超时后 retry 是否重复发邮件、付款、写库 | idempotency key / receipt / reconcile 生效 |
| Persistence | 72 小时 idle 后 file、process、memory、port 状态如何 | 与产品声明一致；连接断开有明确重连协议 |
| Fork / rollback | 多分支是否数据隔离、能否精确恢复 | checksum、diff、process 边界可验证 |
| Scale | 100 / 1k / 10k burst 的 p50/p95/p99 与失败率 | 在目标 SLO 内，无静默排队或 quota surprise |
| Cost | 每次运行费用与 idle/storage/egress/固定月费 | 以 verified successful task 计价，而非只看 vCPU 秒价 |
| Deletion | kill/delete 后文件、snapshot、log、backup 如何处理 | 有 retention、不可恢复边界与审计记录 |

最终决策指标应是：

> **Cost per verified successful task = compute + storage + model + browser/tool + retry + failure handling + human review 的总成本 / 被验收的成功任务数。**

冷启动最快、单核最便宜、GitHub star 最多，都可能在这个指标上输掉。

## 7. 给当前团队的建议

如果现在从零搭一个面向外部用户的 cloud Agent：

1. **第一轮用 E2B 与 Modal 做双跑 PoC**：同一 Agent、同一任务包、同一 credential proxy / egress policy；不要一开始锁定。
2. **把 canonical Session、business state、artifact manifest 和 acceptance 留在自己的控制面**，sandbox 只做可替换的 hands。
3. **只有明确需要 Windows、computer-use、VM memory snapshot / hot fork 或 Daytona secret proxy 时，再把 Daytona VM 加入第三席**，并把 exact isolation runtime、BYOC 控制面依赖和私有核心升级策略写进合同。
4. **若产品强绑定 Claude且团队不想自建 loop / event / recovery，单独做 Claude Managed Agents PoC；若目标是大型企业多模型平台，则优先评估 AWS AgentCore。** 这两条路线与采购 raw sandbox 是不同架构选择。
5. **浏览器任务使用 Browserbase / Browserless 等专门层**，不要默认在通用 Linux sandbox 里自养 Chrome fleet。
6. 上线前必须完成 credential exfiltration、egress、cross-tenant、resume/replay、duplicate side effect、deletion 和 spend-cap 测试；未通过前只跑可逆、无敏感数据任务。

## 数据来源

- [agent-infra-update-2026-08-03](/raw/articles/agent-infrastructure/agent-infra-update-2026-08-03/)
- [agent-coworker-identity-system-2026-07-29](/raw/articles/agent-infrastructure/agent-coworker-identity-system-2026-07-29/)
- [agent-runtime](/wiki/concepts/agent-runtime/)
- [agent-infrastructure](/wiki/maps/agent-infrastructure/)
- [opencomputer-vs-harnessrouter-2026-07-26](/output/reports/opencomputer-vs-harnessrouter-2026-07-26/)
- [dedalus-labs-product-analysis-2026-07-25](/output/reports/dedalus-labs-product-analysis-2026-07-25/)
- [intuned-automation-integration-analysis-2026-07-22](/output/reports/intuned-automation-integration-analysis-2026-07-22/)
- 各厂商官方 Docs、官方工程博客与官方 GitHub，链接已随文列出

---
*由 LLM 从知识库查询与 2026-08-06 官方公开资料生成*
