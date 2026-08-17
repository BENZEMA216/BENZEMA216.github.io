# Cloudflare OS 产品机制、技术分层与战略边界

> 生成时间：2026-08-06
>
> 查询：Cloudflare OS 在做什么？
>
> 研究边界：阅读 Cloudflare 2026-08-05 发布博文、内部采用复盘、官方文档，并静态核验 `cloudflare/cloudflare-os@0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f` 与 `cloudflare/cloudflare-os-starter@9c18a2e8b0c3741e5f4813546bbf24be5bbb98ee`。未登录 Demo、未部署到 Cloudflare account、未连接真实企业系统，也未做安全红队或生产压测。

## 摘要

**Cloudflare OS 不是传统操作系统，也不是 E2B / Modal 那种给 Agent 一台通用 Linux computer 的底层 Sandbox。它是可部署到企业自己 Cloudflare account 的 Agent 工作台、AI-native Office / 小应用平台和权限治理层。**

它把三个通常分散的问题放进同一个产品：

1. 员工在浏览器里使用带公司 context、术语、流程与 skills 的通用 Agent；
2. 一次对话可以继续成为文档、Slides、Spreadsheet、全栈小应用 Gadget，或重复运行的确定性任务；
3. Agent 和 Gadget 默认没有任何资源权限，必须通过 Gatekeeper 获得具体 capability，且系统尝试把“Agent 实际读过什么”继续约束到分享、协作和外发。

放回 [cloud-agent-infrastructure-vendor-selection-2026-08-06](/output/reports/cloud-agent-infrastructure-vendor-selection-2026-08-06/) 的分层中，它跨越**员工产品层 + 部分 Agent runtime / harness + tool governance + 轻量代码执行**，但当前不覆盖完整 Linux / GPU / 任意 native package 执行层。Cloudflare 自己与 E2B / Modal 同层的产品是 [Sandbox SDK](https://developers.cloudflare.com/sandbox/)；Cloudflare OS v2 当前主要运行在 Dynamic Workers 的 V8 isolate，官方把 Containers 开发工作流列为下一步。

一句话定位：**一个带企业权限和可生成应用能力的 Agentic Office，而不是另一家裸 Agent Sandbox。**

## 1. 实际用户、输入与输出

### 谁部署，谁使用

- **部署 / 购买决策者**：CIO、IT、Security、AI Platform 团队；
- **日常用户**：全体员工，尤其是不使用 terminal 的销售、运营、财务、HR、支持等知识工作者；
- **实施者**：维护组织 context / skills、连接内部系统、编写 Gatekeeper 与生产运维配置的平台团队或实施伙伴。

Cloudflare 的内部复盘说明，这个用户定义来自一次失败：把偏 coding 的 Agent harness 直接交给非工程团队，会产生大量“找问题的 vibe-coded apps”。他们后来先运营一个人工辅助的“magic AI email”，从员工真正不想做的重复工作中提炼 jobs-to-be-done、skills、数据连接和输出格式，再把这些沉淀进平台。这说明 Cloudflare OS 的真实楔子是**乏味、高频、跨系统的企业知识工作**，不是让所有人随意造 App。[内部采用复盘](https://blog.cloudflare.com/how-we-use-ai-with-cloudflare-os/)

### Input → Operating loop → Output

```text
员工目标 / 对话 / 附件 / 指定企业资源
  + 公司维护的 context、skills、术语、流程
  + 用户或 Agent 请求的具体 capability
        ↓
浏览器 Workspace + 持久 chat/state
        ↓
Pi agent loop：模型规划 → Code Mode 写 JS →
Dynamic Worker 执行 → Gatekeeper / Gadget RPC → 观察结果 → 继续
        ↓
用户检查并接受 / 撤销代码变更与资源连接
        ↓
回答、文档、Slides、Spreadsheet、Gadget、Blueprint、Scheduled Task
```

Agent 不一定生成 App。仓库的系统提示明确要求：只需用现有资源完成的一次性任务，应直接用 `executeCode`；需要长期 UI、逻辑和状态时才创建 Gadget。其主要工具包括 `readFile`、`writeFile`、`editFile`、`webFetch`、`describeBinding`、`executeCode`、`createGadget`、`setGadgetBinding`、`listBlueprints`、`requestConnection`。Agent loop 来自 `pi-agent-core`，chat history、model-facing reasoning snapshot、token / cost、compaction checkpoint、代码版本和 proposed changes 则由 Workshop backend 持久化。[agent.ts](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/packages/workshop-backend/src/agent.ts) · [overseer.ts](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/packages/workshop-backend/src/overseer.ts)

## 2. 三个核心产品对象

### 2.1 Workspace：带组织上下文的 Agent 工作区

一个 Workspace 组合了 Agent sessions、持久状态、文件与输出、资源访问和代码执行环境。管理员可以配置 Agent instructions、标准输出格式、Featured Blueprints、可用 connector 和模型；用户从浏览器开始，不需要本地 terminal。每个 workspace 在后端由一个 `OverseerDurableObject` 管理，其状态包含 chat、code version、Gadgets、Gatekeepers、sharing、observation 与 action queue。

### 2.2 Gadget：每个“文件”都是一份可修改的小应用

Gadget 是 Cloudflare OS 最有辨识度的产品主张：

- Agent 写 `client.js` 与 `server.js`；
- Client 运行在浏览器 sandboxed iframe；
- Server 按需加载为 Dynamic Worker，再实例化为 Durable Object Facet；
- 每个 Facet 有独立 SQLite / KV 状态，不能读取 supervisor 的数据库；
- Client、Server 与 Agent 都通过 Cap’n Web RPC 使用同一套方法，因此 App 天然可被人和 Agent 共同操作；
- Gadget 私有默认，可把同一实例分享给协作者，也可继续让 Agent 改代码。

这不是“生成完再部署到另一个平台的原型”，而是生成代码、运行、状态、协作和继续修改发生在同一套产品里。[Cloudflare OS README](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/README.md) · [Durable Object Facets](https://developers.cloudflare.com/dynamic-workers/usage/durable-object-facets/)

### 2.3 Blueprint：分享 App 的代码，不分享数据和权限

Blueprint 是 Gadget 的可复用代码快照，类似“整个应用的模板”。它包含 source code、binding requirements 与 metadata，但不包含 Gadget SQLite 数据、chat history、live connections 或 credentials。别人从 Blueprint 创建的新 Gadget 拥有独立状态、资源和对话；目前也不会自动继承 Blueprint 后续更新。[Blueprints](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/docs/blueprints.md)

这代表 Cloudflare 的反 SaaS 命题：过去是所有用户连接同一个中心化 App；在 AI 可以低成本修改代码后，每个人可以运行并修改自己的 App 实例。这个命题是否能胜过集中维护仍待验证，但它不是普通 Office 模板功能。

## 3. Gatekeeper：比普通 MCP 更向前一步的安全设计

普通 MCP server 主要回答“Agent 可以调用哪些 tool”；Cloudflare OS 要进一步回答“Agent 通过这些 tool 实际观察了哪些 resource，以及这些信息之后可以流向谁”。

### 3.1 默认无权限，按具体资源授予 capability

Agent 与 Gadget 默认 `access to nothing`。用户把 GitHub repo、Google Doc、Linear team 等具体资源介绍给 Agent 后，Gatekeeper 才把一个 typed binding 放进其 `env`。OAuth credential 留在 Gatekeeper，不进入模型上下文或 generated code。Server Dynamic Worker 设置 `globalOutbound: null`；Client iframe 通过 CSP 与 sandbox 限制网络，只能经明确 binding 与外部系统交互。[官方发布博文](https://blog.cloudflare.com/cloudflare-os/) · [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/)

每种 Gatekeeper 都要理解对应服务的 resource、ACL、operation 与 side effect。例如它可以只开放一个 repo、只读 issue、不读 source，mask 特定字段、限速，并让 merge PR 等动作进入审批。仓库目前包含 GitHub、Google、Cloudflare、Supabase、Notion、Confluence、Email、Slack、Linear、Home Assistant、MCP Portal、Scheduler 等实现，但每个真实企业还需补自己的系统和政策。

### 3.2 Observation provenance 跟随数据

当 Agent / Gadget 读取资源时，Gatekeeper 记录 observation。分享 Gadget 时，新协作者需要用自己的连接账号证明其也能直接读取这些历史资源；之后若 Gadget 读取了某协作者无权看的新资源，读操作应被阻止，或先撤销该协作者权限。接收者不是继承创建者的 credential。

这个机制瞄准 Agent 产品的关键泄露路径：**一次合法读取，不应通过生成的 Dashboard、文档或共享 App 变成越权再分发。** 但仓库的 observer 文档也明确其 v1 是 workspace / collaborator 级别的 all-or-nothing enforcement，还没有 per-thread enforcement；真实 Gatekeeper 对 vendor ACL、撤权和新 observation 的覆盖必须逐个验证。[Observers](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/docs/observers.md) · [Sharing](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/docs/sharing.md)

### 3.3 Side effect 可模拟后延迟审批

官方设计允许 Gatekeeper 先模拟需要审批的 action，让 Agent 基于模拟结果继续规划并排队多个动作；用户最后批量或逐一批准 / 拒绝，而不是 Agent 第一处写操作就同步阻塞。这个机制若实现正确，可在 autonomy 与安全之间找到更好的操作节奏；但每个 Gatekeeper 都必须正确模拟 read-after-write、依赖顺序、失败和最终 apply，不能把 README 设计自动视为所有 connector 的生产保证。[Gatekeeper 说明](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/README.md#gatekeepers-a-capability-based-security-layer)

## 4. 当前技术栈与明确边界

| 层 | 当前实现 | 能做什么 | 不能据此证明什么 |
|---|---|---|---|
| Web / identity | Workshop frontend；Starter 默认 Cloudflare Access | 浏览器工作区、组织身份与 admin | 不等于完整企业 RBAC / lifecycle 已适配每家公司 |
| Agent loop | `pi-agent-core` + Workshop chat / compaction / code tools | 多模型 Agent、Code Mode、持久对话与代码提案 | 不是模型训练平台，也不是中立 runtime API 产品 |
| Light execution | Dynamic Worker Loader，`globalOutbound: null` | 快速执行 Agent 生成的 JavaScript | 不是 Linux shell、Python/native package、GPU computer |
| App state | Overseer Durable Object + Gadget Facet 独立 SQLite | 每 workspace / App 的持久状态和实时协作 | 不等于任意关系数据库或跨地域事务 |
| Tool governance | Gatekeeper Worker / Facet + typed bindings | OAuth 隔离、resource scope、observation、actions | 真实 ACL 正确性依赖每个 connector 实现 |
| Artifacts | KV metadata + R2 Blueprint content | Blueprint 发布、复制与代码快照持久化 | 不是完整企业备份、迁移和 retention 方案 |
| Model control | 多 provider；AI Gateway 可统一预算、日志与限流 | 模型中立调用与成本治理 | AI Gateway 可选，仍需企业自己配置资金与政策 |
| Browser | Browser Rendering 用于 PDF 等服务端渲染 | 导出与页面渲染 | 不是 Browserbase 式带登录身份的通用 Agent browser |
| Scheduling | Scheduler Gatekeeper：DO alarm、bounded retry、`runId` | interval / calendar / one-shot callback | v1 无编辑、暂停、删除、catch-up 或 recurring run history；不是完整 durable workflow engine |

生产 Starter 当前要求 Workers、KV、R2、Browser Rendering 与 Dynamic Worker Loaders；AI 产品可选。官方虽然说核心可在开源 `workerd` 上运行，但 self-host production 文档与工具仍标为 `COMING SOON`。因此“代码可移植”与“今天已有成熟的非 Cloudflare 生产部署路径”必须分开。[Starter README](https://github.com/cloudflare/cloudflare-os-starter) · [Core README](https://github.com/cloudflare/cloudflare-os#deploy-to-your-own-server-using-workerd) · [Scheduler](https://github.com/cloudflare/cloudflare-os/blob/0eaec6c5e8fc6b3298ea1aa73bf5c3e47b923c7f/packages/gatekeeper-scheduler/README.md)

## 5. 为什么叫 OS

官方不是把它称为传统 OS，而是做职责类比：

| 传统 OS | Cloudflare OS |
|---|---|
| kernel | `workshop-backend` |
| device drivers | `gatekeeper-*` |
| shell | `workshop-frontend` |
| processes | Gadgets |
| executables | Blueprints |
| users | users |
| ACLs | sharing permissions |
| 新对象 | 归属于某个人、但拥有独立受限权限的 Agent |

这个类比的实质是：Workshop backend 负责把用户、Agent、动态程序、持久状态和外部“设备”连接起来，同时做隔离、资源授权和生命周期管理。因此“OS”有架构含义，但仍是**企业 AI productivity environment 的产品命名**，不能把它理解成 kernel、VM image 或 desktop OS。[官方 OS 类比](https://github.com/cloudflare/cloudflare-os#it-kind-of-is-an-operating-system)

## 6. 放回 Cloud Agent Infra 分层

```text
Enterprise work surface / Agentic Office   ← Cloudflare OS 的主产品
Agent runtime / harness                    ← 已覆盖一部分
Tool identity / governance / provenance    ← Gatekeepers 是差异化核心
Lightweight code execution                 ← Dynamic Workers / V8 isolate
Full Linux / VM / GPU sandbox              ← 当前不覆盖
```

| 对象 | 核心控制对象 | 与 Cloudflare OS 的关系 |
|---|---|---|
| E2B | Firecracker Linux microVM、filesystem、process、snapshot | 底层 execution environment；不是员工 Office 产品 |
| Modal | Serverless CPU / GPU、container、超大并发 compute | compute fabric；兼容性和重计算远强于当前 V8 execution |
| Cloudflare Sandbox SDK | Containers 上的完整 Linux、shell、files、process | Cloudflare 体系内真正与 E2B / Modal 同层的组件；尚非 OS v2 核心 |
| AWS AgentCore | Runtime、Harness、Identity、Gateway、Memory、Browser、Code Interpreter、Observability | 横向企业 Agent 平台；Cloudflare OS 是已有 UX、App model 和安全主张的纵向产品 |
| Microsoft Copilot Studio / Power Apps、Google Workspace / Agents、Glean 等 | 企业工作入口、现有数据与 App 生态 | 更直接的产品竞争对象；Cloudflare OS 的差异在 per-user modifiable app 与 observation-based governance |

所以询问“Cloudflare OS 能否替代 E2B”本身是层级错误。正确问题是：**是否要采用 Cloudflare OS 作为员工 Agent 工作入口；若 workload 还需 Linux / browser identity / GPU，应为它另外接哪种执行 hands。**

## 7. 真正 wedge 与 Cloudflare 战略意图

### 可证实的产品 wedge

1. **组织 Context / Skills 可复用**：把最佳流程变成 Agent 可执行的公共能力，而非每次重写 Prompt；
2. **Agent 产物从 Artifact 变成持续软件**：对话可以结束为一次性答案，也可变成带 UI、逻辑、SQLite、API 与实时协作的 App；
3. **Deterministic code 替代重复 inference**：重复报表或 workflow 不必每次重跑 token-heavy agent session，模型只留在确实需要判断的环节；
4. **权限追踪超越 tool allowlist**：Gatekeeper 不只控制能调用什么，还试图控制已观察数据之后能被谁看到、流向哪里。

### 战略意图（推断）

这是 Cloudflare Developer Platform 与 Zero Trust 的旗舰 dogfood / reference architecture：Workers、Dynamic Workers、Durable Objects、Facets、Access、AI Gateway、MCP Portals、KV/R2 都在同一个可理解的企业场景里被消费。Core 与 Starter 以 Apache-2.0 开源，企业部署到自己的 Cloudflare account；Cloudflare 又明确计划把它加入 Dashboard 成为 fully managed product，并用合作伙伴帮助企业定制 context、skills、Gatekeepers 与 UI。

因此其长期目标不是只卖 Agent sandbox，而是向上占据企业的 **AI work surface / agentic productivity platform**；OSS 既降低黑箱和试用阻力，也把底层 Cloudflare 服务变成默认运行环境。这是基于发布方式与 roadmap 的推断，不是 Cloudflare 明示的收入拆分。[发布博文](https://blog.cloudflare.com/cloudflare-os/) · [Starter](https://github.com/cloudflare/cloudflare-os-starter)

## 8. 成熟度证据与不能混用的数字

Cloudflare 自报：数千名员工每周使用该平台，最近一个月创建超过 4,000 个 App / tool，销售团队估算节省超过 10,000 小时。这说明真实内部问题和使用形态存在，但这些是 vendor-reported 数字，没有独立审计，也没有披露活跃定义、任务成功率、维护成本或安全事件。[内部采用复盘](https://blog.cloudflare.com/how-we-use-ai-with-cloudflare-os/)

更重要的是，公开仓库明确写明：2026-08 的 v2 是一次完整重写，仍处于 `early access`、有许多 rough edges。Starter 也要求 pin upstream release，并在每次 production upgrade 前重新核查 trust boundary。不能把内部 v1 的长期运行、内部定制组件和开放源码 v2 的外部可复制成熟度直接等同。[Core README](https://github.com/cloudflare/cloudflare-os#warning-early-access) · [Starter README](https://github.com/cloudflare/cloudflare-os-starter)

## 9. 反命题

1. **“每个文件都是 App”可能把 Shadow IT 扩大数个数量级。** 生成容易，所有权继承、质量、测试、升级、数据 retention、故障处理和下线仍要有人承担；
2. **Gatekeeper 是安全 wedge，也是实施税。** 每个系统都要正确建模 resource、ACL、OAuth、field masking、rate limit、observation、side effect simulation 与 approval；错误 adapter 会直接击穿平台承诺；
3. **当前 execution 太轻。** JavaScript + Worker API 很适合数据处理和小型 Web App，却不能替代任意 Linux package、复杂 repo build、desktop、GPU 与训练 / eval；
4. **Deterministic workflow 仍不是完整业务 runtime。** Scheduler 有 idempotency key 与有限重试，但没有完整 run ledger、catch-up、编辑与人工恢复控制面；
5. **组织 context 会成为新的治理负债。** Context / skill 错误、过时或互相冲突时，会把单次个人错误升级成全员自动化错误；
6. **开放源码不等于低锁定。** 当前最成熟生产路径深度依赖 Cloudflare 新原语；standalone `workerd` 生产部署仍缺正式工具链；
7. **Microsoft / Google / ServiceNow / Salesforce / Glean 等已有身份、数据和工作入口。** Cloudflare 必须证明其 per-user modifiable app 与 provenance security 的增量价值足以抵消另建一套工作面和 connector 的成本。

## 10. 采用前的 Proof Gates

不要以白板、井字棋或一次性 Slides Demo 作为采购证据。建议用三个真实、重复、跨系统的任务做 4–6 周 PoC，并设置以下门槛：

1. **工作价值**：同一任务比较人工、每次 Agent、Gadget / deterministic task 的成功率、耗时、token、人工验收和返工；
2. **权限红队**：越权读取、被撤销账号、跨用户分享、Blueprint 复制、外网 exfiltration、prompt injection、敏感字段和 collaborator downgrade；
3. **Action 正确性**：模拟 action 的 read-after-write、依赖顺序、部分批准、重复 apply、失败重试和 idempotency；
4. **真实 Gatekeeper E2E**：OAuth 到期、ACL 变化、resource deletion、rate limit、vendor API schema drift 和 audit export；
5. **Gadget 生命周期**：owner 离职、code upgrade、state migration、backup / restore、删除、并发协作、Blueprint 版本与下线；
6. **Scheduler / recovery**：进程中断、重复触发、八次 retry exhaustion、missed occurrence、人工补跑和最终 outcome ledger；
7. **Runtime fit**：验证 Worker CPU / memory / duration、npm / native dependency、browser、Python、GPU 和私网需求，明确哪些 workload 必须外接 Sandbox；
8. **组织成本**：统计每个 Gatekeeper 的实现与维护人时、context / skill owner、审阅 SLA、安全响应和平台运维；
9. **最终指标**：不要只看 App 创建数，至少看 4 周复用率、`cost per verified successful task`、人工接受率、真实节省时间、维护负担和安全事件。

## 结论

Cloudflare OS 的核心并不是“让 Agent 在云端跑起来”，而是尝试重新定义公司里的软件对象：

```text
对话不是终点
→ 它可以生成一次性 Artifact
→ 也可以生成每人一份、可继续修改的 live App
→ App 和 Agent 只通过具体 capability 访问企业系统
→ 数据来源权限继续约束分享与外发
```

如果目标是给全公司一个安全的 Agent 工作入口，并让非工程员工把重复工作变成内部小应用，它值得 PoC；如果目标只是运行任意代码、coding repo、GPU 或 browser automation，应先选 E2B、Modal、Cloudflare Sandbox 或专门 Browser Infra，而不是 Cloudflare OS。

## 主要来源

- [Cloudflare OS 发布博文](https://blog.cloudflare.com/cloudflare-os/)
- [Cloudflare 内部采用与组织复盘](https://blog.cloudflare.com/how-we-use-ai-with-cloudflare-os/)
- [Cloudflare OS Core](https://github.com/cloudflare/cloudflare-os)
- [Cloudflare OS Starter](https://github.com/cloudflare/cloudflare-os-starter)
- [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/)
- [Durable Object Facets](https://developers.cloudflare.com/dynamic-workers/usage/durable-object-facets/)
- [MCP Server Portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/)
- [Cloudflare Sandbox SDK](https://developers.cloudflare.com/sandbox/)
