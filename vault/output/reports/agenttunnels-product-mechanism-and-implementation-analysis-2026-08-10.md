# Agent Tunnels 产品机制、实现方法与 GitHub 项目对照

> Agent Tunnels 不是 localhost / 端口穿透工具，也不是新的 Agent 通信协议；它把跨公司技术支持重组为一个临时共享 session：双方 Agent 保留各自私有上下文，只把问题、选择性上下文和修复提案写入托管事件流。公开的非 `report_only` 自动执行路径只在客户侧 MCP bridge 本地发生，并要求 proposal 已 granted，或 customer governance 允许 autonomous apply；手动执行及 `report_only` 也可发生在 bridge 外。

> 查询：研究 Agent Tunnels 的产品思路、解决的问题与公开实现方法，并在 GitHub 寻找同层项目和可组合的技术参考。

- 研究日期：2026-08-10（Asia/Shanghai）
- 产品入口：[agenttunnels.com](https://agenttunnels.com/)
- 公开客户端快照：`agenttunnels@0.1.17`，Node.js ≥ 20，MIT
- npm shasum：`7bf8b4ee367dec5dce12c592137b4e12647a803e`
- npm dist.integrity：`sha512-PKF3cyTMZNPB1suwFfqKPn0NO7+9ObxtcS2xKNdNzMNiZYeJgnD/f49dBPkzjQLLB25ZqnXsCdn/AaPBy9z91Q==`
- tarball SHA-256：`8a0e4fd2bd5fe78fa864b56d358802be6cbf568f4fd3690fb711196e8031ea3e`
- [registry tarball](https://registry.npmjs.org/agenttunnels/-/agenttunnels-0.1.17.tgz)：32 个文件，25,241 B 压缩包，92,892 B unpacked
- npm latest 发布时间：2026-08-08T01:17:55Z
- 公开分发边界：tarball 只有编译 JS、`.d.ts`、README、skill、package metadata 与 LICENSE；没有 TypeScript `src/`、测试、Web app、Worker、Supabase schema / RLS 或部署配置。MIT 只确认 npm 客户端包，不能外推到托管服务
- 研究证据：官网、公开演示、Terms / Privacy、公开 npm 编译产物、package metadata 指向但不可访问的仓库、公开 GitHub 对照项目与本知识库既有研究
- 验证边界：未注册账号、未建立真实 tunnel、未执行远程 command / patch；网站业务后端、Cloudflare session service 与数据库源码未公开，因此服务器侧权限、删除、WebSocket 认证和审计完整性不能从客户端代码反推为已证明

---

## Executive summary

1. **问题真实而且足够具体。** SDK / API 厂商在 Slack Connect 做技术支持时，客户 Agent 掌握客户 repo、报错和尝试记录，厂商 Agent 掌握内部实现、已知坑与修复方式，但两个上下文被两个人工中继隔开。Agent Tunnels 试图删除这段“Agent → 人 → Slack → 人 → Agent”的反复复制粘贴。
2. **产品原子不是 tunnel，而是跨组织的受控协作 session。** 一个 session 包含双方成员、有序 event timeline、选择性 context、结构化 proposal、governance / proposal status 与本地 effect。客户端能按 `seq` 排序和合并事件，但服务端日志是否不可变并未公开。它真正分离的是“谁知道什么”与“谁有权在客户机器上执行什么”。
3. **公开实现是薄客户端 + 托管 session service。** 官方 installer 把 Cursor / Claude Code 配成 MCP stdio host；Codex / OpenCode 等 shell 场景走 headless CLI。两者都连接默认 Cloudflare Worker；一次 `wait` 尚未结束时，client 同时监听 WebSocket 并每 4 秒拉取 snapshot，wait 返回后轮询即停止。只有 customer-side MCP bridge 暴露本地 command / patch 执行，headless CLI 没有 run / apply。
4. **只有客户端编译分发物和执行器逻辑公开，关键 trust boundary 仍闭源。** npm 包足以证明角色工具、事件同步和本地副作用实现，但无法证明服务器是否真正 enforce capability、一次性邀请、审批状态机、留存删除或组织隔离。package metadata 指向的 [GitHub repo](https://github.com/lakshman111/agenttunnels) 当前 404；registry 有 tarball integrity / signature，但 README 明确没有 npm provenance，不能把 tarball 映射到一个公开源码 commit。
5. **最接近的 GitHub 项目是 Coral Protocol 的 cross-org demo，但它仍不是完整替代。** Coral 已有 MCP thread / participant / message 原语和跨组织协作叙事，但当前 demo 是单个本地 Coral server 上的多目录模拟，并未证明真实组织隔离；server 仍标 WIP，安全配置留有 TODO，两个 repo 也没有明确开源许可。A2A、agentgateway、Pilot、Tutti、OpenChamber、NetBird 各覆盖协议、治理、网络或 UX 的一部分，没有一个已明确开源且成熟的单仓覆盖完整闭环。
6. **现在不应把 Agent Tunnels 用于 secrets、生产数据或高权限工作目录。** 公开客户端存在 approval payload substitution、`shell:true`、继承完整环境变量、无 OS sandbox、patch 非事务、invite/token 明文持久化和无本地 DLP 等风险；其 Terms / Privacy 本身也明确要求不要提交 credentials、production data 或第三方机密信息。

一句话判断：

> **这是一个有洞察的 B2B Agent support wedge 和可工作的早期原型，但尚不是可承载企业机密与生产权限的跨组织 trust plane。**

---

## 1. 它解决的不是 Agent “不会交流”，而是跨公司 context 与 authority 被割裂

### 1.1 当前支持链路

官方 [Show HN](https://news.ycombinator.com/item?id=49217232) 与 [Loom 演示](https://www.loom.com/share/68a4307b4c534e649f93cc4c16a19ee6) 描述的是同一条链路：

1. 客户在集成某个 SDK / API 时遇到 bug；
2. 客户的 coding agent 已读过 repo、错误日志和此前尝试；
3. 客户人类把 Agent 输出压缩后贴到 Slack；
4. 厂商支持人员再把信息交给厂商 Agent；
5. 厂商 Agent 结合私有代码、已知问题和内部文档产出问题或修复；
6. 结果沿原路返回，客户再让本地 Agent 实施。

这条链路的问题不是缺少聊天窗口，而是：

- **上下文损耗**：每次由人摘要时都会丢掉文件、调用链、环境与失败尝试；
- **异步延迟**：双方人类必须轮流在线，Agent 的速度被人工中继锁死；
- **授权模糊**：Slack 文本无法表达“允许读什么、建议什么、谁能执行什么”；
- **可追责性差**：问题、提案、批准、真实执行和结果散落在 Slack 与两个本地 session 中；
- **私密性两难**：共享整个 repo 过度，完全不共享又无法定位问题。

### 1.2 Agent Tunnels 的产品命题

[官网](https://agenttunnels.com/)把双方上下文分开：

| 一侧 | 私有上下文 | 在共享 session 中的职责 |
|---|---|---|
| Customer Agent | 客户 repo、错误日志、已尝试方案、运行环境 | 选择性分享事实；回答厂商问题；在人类 Web 批准或 customer governance 允许后本地执行 |
| Vendor Agent | 厂商代码库、内部 gotchas、已验证修复 | 追问；解释；提交 patch / command proposal |
| 两侧 Human | 业务关系、风险承受、最终责任 | 观察 timeline；批准或拒绝副作用；解决歧义 |

关键点是 **两侧 Agent 并不共享一个 repo，也不需要把某一侧 runtime 搬到云端**。共享的是 session 里的显式事件与提案。

因此，它与常见产品的边界如下：

| 它不是 | 原因 |
|---|---|
| 网络端口 tunnel | 不暴露 localhost/TCP service；“tunnel”只是跨组织 session 的产品比喻 |
| 共享终端 / 云 IDE | 双方仍在各自本地 Agent 与工作目录里运行 |
| A2A protocol | 没有定义通用 Agent Card、task lifecycle 或跨实现标准；MCP 只是本地适配面 |
| 完整 Agent runtime | 不负责模型 loop、长期 memory、sandbox lifecycle 或模型托管 |
| 零知识 / E2EE 协作 | 公开材料没有端到端加密或 zero-knowledge 证据，session 内容会进入托管基础设施 |

它更准确的类别是：

> **cross-organization session gateway + proposal/approval/effect workflow**。

这与 [mpai-multiplayer-ai-implementation-analysis-2026-08-04](/output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04/) 所拆解的 local-first session gateway 属于相邻层，也符合 [agent-infrastructure](/wiki/maps/agent-infrastructure/) 与 [agent-communication](/wiki/concepts/agent-communication/) 对“session gateway ≠ A2A ≠ runtime ≠ model gateway”的分层。

---

## 2. 产品流程：邀请、接入、选择性共享、提案、批准、本地执行

公开演示显示，创建 session 时会选择 `Vendor` 或 `Customer` 角色、填写 session 标题和显示名，并生成邀请链接。session 页面是一条双方人类与 Agent 都能看到的 timeline，并提供“执行 action 前要求人工批准”的控制。

### 2.1 启用 `require_approval=true` 时的典型 Golden path

~~~mermaid
sequenceDiagram
    participant CH as Customer Human
    participant CA as Customer Agent + local bridge
    participant S as Hosted Session
    participant VA as Vendor Agent + local bridge
    participant VH as Vendor Human

    CH->>S: 创建 session / 发送 invite
    VH->>S: 以 Vendor 身份加入
    CA->>S: 加入并等待 event
    VA->>S: 加入并等待 event
    CA->>S: 分享经过选择的日志 / 文件片段 / 复现结果
    S-->>VA: 推送 context event
    VA->>S: 提问或提交 patch / command proposal
    S-->>CH: 显示提案与待审批状态
    CH->>S: approve / reject
    S-->>CA: 返回已批准 proposal
    CA->>CA: 在客户本地 workdir 执行
    CA->>S: 回传 stdout / stderr / patch result
    S-->>VA: 推送 effect 与后续结果
    CH->>S: resolve / 结束 session
~~~

### 2.2 为什么这个交互比普通群聊多一层价值

- **Context 是显式对象**：不是把整个聊天记录当上下文，而是由客户侧提交 `label / content / redacted`；
- **Proposal 是显式对象**：厂商不是直接获得客户 shell，而是提交待审的 patch / command；
- **Effect 是显式对象**：执行结果回到同一 timeline，形成问题—建议—授权—效果链；
- **Role 是产品内核**：公开客户端目前硬编码 vendor / customer，而非任意 peer；
- **人类不是退出 loop，而是从搬运工转为 authority holder。**

这也说明产品当前最强适用场景是高上下文、低频但高价值的 B2B integration support，而不是开放式多 Agent 社交网络。

---

## 3. 公开实现证据：四个 plane

以下架构把“代码直接可见”与“从公开资产合理推断”分开：

~~~mermaid
flowchart LR
    subgraph V["Vendor environment"]
        VH["Vendor human"]
        VA["Vendor coding agent"]
        VB["agenttunnels CLI / MCP bridge"]
        VR["Vendor private repo"]
        VA --- VR
        VA --- VB
        VH --- VA
    end

    subgraph C["Customer environment"]
        CH["Customer human"]
        CA["Customer coding agent"]
        CB["agenttunnels CLI / MCP bridge"]
        CR["Customer repo / logs"]
        EX["Local command / patch executor"]
        CA --- CR
        CA --- CB
        CB --> EX
        CH --- CA
    end

    subgraph H["Hosted control + session service"]
        WEB["Next.js web / approval UI"]
        AUTH["Supabase auth / control data"]
        LIVE["Cloudflare live session endpoint"]
        LOG["Session event log"]
        WEB --- AUTH
        WEB --- LIVE
        LIVE --- LOG
    end

    VB <-->|"HTTP + WebSocket"| LIVE
    CB <-->|"HTTP + WebSocket"| LIVE
    VH --- WEB
    CH --- WEB
~~~

### 3.1 Control plane：账号、session、邀请与 Web 审批

**公开可见：**

- 网站应用由 Next.js 前端承载，部署痕迹指向 Vercel；
- 未登录访问 `/new`、`/history` 会进入工作邮箱 magic-link 登录；
- [Privacy](https://agenttunnels.com/privacy) 披露使用 Supabase 做认证 / 数据库，Cloudflare 做 live session infrastructure，Vercel 托管，Sentry、PostHog、Crisp 分别用于诊断 / replay、analytics 与支持；
- Web UI 负责创建 session、查看 timeline、显示参与者、审批和 resolve。

**不能从公开代码确认：**

- org / domain 是否是真正的租户边界；
- invite 是否一次性、如何撤销和是否在数据库中哈希保存；
- approval 是否由服务器强 enforce；
- history 删除是否触发底层事件、诊断、备份与第三方副本删除。

### 3.2 Session data plane：HTTP JSON + WebSocket + active-wait snapshot poll

公开包 [`dist/session-client.js`](https://unpkg.com/agenttunnels@0.1.17/dist/session-client.js) 的默认 endpoint 是：

`https://agenttunnels-live.lakshman111.workers.dev`

客户端可见的核心调用包括：

- `POST /sessions/:id/join`：提交 invite code、role、name 和 agent actor；
- `GET /sessions/:id`：读取 session snapshot；
- `POST /sessions/:id/message`；
- `POST /sessions/:id/context`；
- `POST /sessions/:id/proposals`；
- `POST /sessions/:id/effects`；
- `WS /sessions/:id/ws?member_id=...`。

HTTP member 请求使用 Bearer token。[`dist/tunnel-watcher.js`](https://unpkg.com/agenttunnels@0.1.17/dist/tunnel-watcher.js) 的 watcher buffer 按 `event_id` 去重、按到达顺序保存，本地最多 500 条；read / merge 路径再按 `seq` 排序。WebSocket 以 500 ms 指数退避重连、最高 10 秒。每个 pending wait 还会每 4 秒 poll snapshot，wait resolve 后对应 interval 被清除，因此这不是常驻后台 poll loop。

认证流在客户端侧可见的部分是：从 invite URL 的 `?invite=` 读取 secret，join 时作为 `invite_code` 放入 JSON；join response 返回 `member_token`，后续 HTTP 放进 `Authorization: Bearer`。公开 WebSocket URL 只携带 `member_id`，client 没有附上可见的 bearer、signed nonce 或 cookie；这只能证明“公开 client 未提供可见 WS credential”，不能断言闭源 server 完全没有其他校验。

**合理推断，不是已证实事实：** 这种“每个 session 有顺序事件、WebSocket 广播、TTL 和 snapshot”的负载很适合 Cloudflare Durable Objects；但公开材料只证明 Worker endpoint，未证明内部一定采用 Durable Object。

### 3.3 Local bridge：MCP stdio 与 headless CLI

公开 [README](https://unpkg.com/agenttunnels@0.1.17/README.md) 与 [skill.md](https://unpkg.com/agenttunnels@0.1.17/skill.md) 显示两种接法：

1. **MCP mode**：把 Agent Tunnels 当成本地 MCP server，由 coding agent 调用 read / wait / post / propose / share / execute 工具；
2. **headless CLI**：用 `join`、`attach`、`wait`、`post`、`read` 等命令接入，适合没有 MCP host 的场景。

当前 headless CLI 没有 execute / apply 命令；自动运行 command 或应用 patch 是 MCP bridge 的 customer-side 能力。这里的 “approve” 也不是 Agent 自己调用的 MCP tool，而是人类在 Web UI 做出的决定，Agent 随后从 snapshot 读取 proposal status。

公开 `0.1.17` 的 exact surfaces 如下：

| MCP tools | 可用角色与主要参数 |
|---|---|
| `tunnel_read_events`、`tunnel_wait_for_events`、`tunnel_post_message` | vendor + customer；read limit 1–200；MCP wait 默认 60 秒、上限 300 秒；message ≤ 8k chars |
| `tunnel_ask_question`、`tunnel_propose_fix` | vendor only；question / summary ≤ 500；proposal payload ≤ 100k |
| `tunnel_share_context` | customer only；label ≤ 120、content ≤ 64k、可带 `redacted` boolean |
| `tunnel_run_command`、`tunnel_apply_patch` | customer only；均要求 proposal_id，但允许 optional payload override 与 `report_only` |
| approve / reject tool | **不存在**；Web / server 写路径不在 npm 包中 |

| CLI commands | 用途与关键参数 |
|---|---|
| `join [--role] [--name] [--cwd] [--mcp]` | 默认 role 为 customer；裸 join 是 headless attach，只有 `--mcp` / `AGENTTUNNELS_MCP=1` 启动 stdio |
| `attach [--role] [--name] [--cwd]`、`wait [--since-seq] [--timeout]`、`read [--since-seq] [--limit]`、`post --text` | 通用接入与消息循环；CLI wait 默认 120 秒、上限 300 秒 |
| `ask --question`、`propose --summary [--kind] [--patch] [--command] [--details]` | vendor only |
| `share --label --content [--redacted]` | customer only |
| `install [--role] [--name] [--project] [--no-global]` | 写 Cursor / Claude MCP config 与 skill |
| run / apply command | **不存在**；headless 只能提案、分享和通信 |

产品演示使用过类似：

`npx -y agenttunnels@0.1.10 attach '<invite>' --role customer`

当前安装器生成的却是未 pin 版本的 `npx -y agenttunnels join ... --mcp`。这使 session 邀请中的操作说明能快速工作，但未来解析可能漂移到 npm latest；本地 cache 与 npm 解析行为会影响实际取到的版本，风险仍是缺少可审计的 exact pin。

另一个可审计性偏差是：package version 已是 `0.1.17`，但 `mcp-server.js` 向 MCP host 自报的 server version 仍硬编码为 `0.1.10`。它不必然影响协议运行，却会让日志、兼容性判断和事故取证混淆。

### 3.4 Execution plane：客户侧本地 shell / patch

[`dist/mcp-server.js`](https://unpkg.com/agenttunnels@0.1.17/dist/mcp-server.js) 暴露的能力不是对称的：

| 能力 | Vendor | Customer |
|---|---:|---:|
| 读 session / 等事件 / 发消息 | ✓ | ✓ |
| 提问、提交 command / patch proposal | ✓ | — |
| 分享选择性 context | — | ✓ |
| Agent 直接批准 / 拒绝 | — | —；由人类在 Web UI 操作 |
| 执行 command | — | ✓ |
| 应用 patch | — | ✓ |

公开代码确实没有给 vendor 直接运行客户命令或直接写客户文件的 MCP tool。内置的非 `report_only` 自动执行路径由客户本地 bridge 调用 [`dist/local-effects.js`](https://unpkg.com/agenttunnels@0.1.17/dist/local-effects.js) 完成，再把结果作为 effect event 回传；手动执行结果或外部 executor 也可通过 `report_only` 上报。

这个设计方向是正确的：**远端只提案，本地主体保留执行权。** 但当前 executor 的安全强度不足，见第 5 节。

还要注意内置非 `report_only` 路径的执行顺序：approval / governance 检查发生在本地 `mcp-server.js`；command / patch 先在客户机器发生，之后才 `POST /effects`。即使服务器拒绝这次 effect 上报，也无法撤销已经发生的本地副作用。公开代码不能证明服务器侧存在第二道执行 gate。

---

## 4. 客户端确证的数据形状与推荐状态机

先区分公开 npm 包直接证实的字段与产品实现应补的字段：

| 对象 | 公开客户端直接证实 | 不能据此断言 |
|---|---|---|
| Session meta | `session_id`、`status`；可选 `title / invite_code / created_at / resolved_at / expires_at` | 服务端存储模型、不可变性、租户隔离 |
| Event | `event_id / session_id / seq / type / actor_member_id / actor_role / actor_type / payload / created_at` | append-only storage、签名、防篡改 |
| Member | snapshot 类型只是 `unknown[]`；join 返回 `member_id / member_token` | presence、组织身份、设备证明的真实 schema |
| Proposal | `proposal_id / kind / status / summary / payload?` | approver、decision history、payload hash |
| Governance | vendor / customer 各有 `require_approval:boolean` | Web 写入逻辑、server policy enforce 方式 |
| Context request | `member_id / label / content / redacted` | source metadata、自动 redaction、DLP provenance |
| Effect request | `member_id / proposal_id / effect / ok / detail` | stdout / stderr / diff 的结构化 schema，或结果已被可信验证 |
| Approval | npm 包没有 approval write API、MCP tool 或公开 schema | 审批记录的结构、签名、不可抵赖性 |

推荐把状态机显式定义为：

`draft → submitted → pending_approval → approved | rejected → leased → executing → succeeded | failed | indeterminate → resolved`

当前客户端能读 proposal status / governance，并能发送 effect report；它没有公开 approval 写路径。若要成为真正的 trust plane，还缺四个关键约束：

1. approval 必须绑定 **不可变 proposal payload hash**；
2. approved 不应直接等于可无限执行，而应兑换成一次性、短时 execution lease；
3. executor 必须报告 `base_sha / workdir / payload_hash / tool_version`；
4. timeout、response loss、重复投递需要独立的 `indeterminate` 与 reconciliation，而不能简单重跑。

---

## 5. 安全审计：产品叙事与公开客户端之间的关键缺口

### 5.1 风险表

| 风险 | 公开证据 | 影响 | 建议 |
|---|---|---|---|
| **审批未绑定最终 payload** | `tunnel_run_command` 可传 optional `command` 覆盖 proposal payload；`tunnel_apply_patch` 同样可传 optional `patch` | 人批准 A，Agent 在执行时可能提交 B，形成 semantic TOCTOU | proposal canonicalization + SHA-256；approval 签 hash；executor 拒绝任何 override |
| **审批语义与 skill 文档不一致** | `requireGrantedProposal` 在 `require_approval=false` 时可接受 pending；skill 又称 vendor 建议的 patch / command 总需 customer human | UI 开关、文档承诺与真实授权路径可能不一致 | 服务器端统一 policy；高风险 action 永远不可关闭 human approval |
| **context 分享无客户端审批 gate** | `tunnel_share_context` 直接 POST `/context`，没有 `proposal_id` 或本地 approval check；skill 却称 vendor-suggested `share_context` 仍需 customer human | npm client 没有可审计的本地 hard gate；闭源 server、外部 MCP host 或人工流程是否另有 gate 均未验证 | 上传前强制本地 preview / DLP / human confirm，并把 approval hash 与 context bytes 绑定 |
| **workdir 不是 sandbox，也未被 install project 绑定** | command 通过 `spawn(..., {cwd, shell:true, env:process.env})` 执行；`install --project` 只决定配置写入位置，生成的 join command 不含 `--cwd`，真实 workdir 是 explicit `--cwd` > `AGENTTUNNELS_WORKDIR` > `process.cwd()` | 用户可能误以为 projectDir 限定执行范围；命令仍可读 workdir 外文件、环境变量和网络 | 显式、可见且 hash-bound workdir；container / microVM / OS sandbox；env allowlist；egress policy；结构化 argv |
| **patch 只做 lexical containment** | parser 拒绝 binary/delete 并检查 path，但无 realpath / symlink containment | symlink 可绕过目录意图；多文件写入不是原子事务 | realpath containment；拒绝 symlink；`git apply --check`；临时分支、备份与 rollback |
| **patch apply 非事务** | 多文件按顺序写；失败时无全局 rollback | 部分文件已写、部分失败，session 状态可能与 repo 不一致 | apply plan + preflight + atomic commit；记录 before/after tree hash |
| **effect 是自报，不是执行证明** | command / patch tool 都支持 `report_only`，可直接提供 stdout / stderr / exit code 或 ok / detail 后上报 | timeline 中的 success 可能没有对应本地执行，不能当 attestation | 设备签名、executor nonce、before / after hash；区分 claimed 与 verified effect |
| **先执行、后上报，且无幂等结算协议** | approval check 在本地；command / patch 先发生再 POST effect；timeout 仅向直接 child 发 SIGTERM 后 reject；未见 idempotency key、并发消费锁、process-tree 确认或失败 effect report | server 拒绝 effect 不能 rollback；子进程树可能状态不明；response loss / retry 可能重复执行 | execution id、process group sandbox、indeterminate state、reconcile API、exactly-once lease |
| **普通 write 无显式可靠性协议** | message / context / proposal / effect HTTP write 未见 request timeout、自动 retry 或 idempotency key | response 丢失后调用方不知道 server 是否已提交；盲目重试又可能重复写入或重复后续 action | client request id、server dedupe、bounded timeout、read-after-write reconciliation |
| **邀请与 token 本地明文持久化** | install 写完整 invite URL 到 `.mcp.json` / Cursor config 与 `~/.agenttunnels/install.json`；session store 写 member token 到 `~/.agenttunnels/sessions.json`，无显式 `0600`；控制台提示也打印完整 invite | invite 泄漏可能允许加入 session；repo 配置、shell history 或 terminal log 可能泄密 | OS keychain；secret reference；文件 0600；日志脱敏；短期、一次性、可撤销 invite |
| **版本未 pin 且审计标识漂移** | installer 默认 `npx -y agenttunnels`；package `0.1.17` 的 MCP server 自报 `0.1.10` | 运行行为可随 latest 改变，日志又可能误报实际客户端版本 | pin exact version + integrity / provenance；server version 从 package metadata 单源生成；升级单独确认 |
| **“redacted”不是 DLP，effect 也未 scrub** | 客户端把原 content 与 `redacted` boolean 一起发送；command effect detail 上传 command、cwd、stdout / stderr 与 exit code，超限约 200k chars 截断，未见本地 secret scanner | UI 标签不能阻止 secret / PII 上传，命令输出还可能二次泄露环境与数据 | 本地 secret / PII scanner、路径 allowlist、effect scrub、diff preview、provenance |
| **WebSocket 身份边界不透明** | HTTP 使用 Bearer；公开 WS URL 只显示 `member_id`，server 不开源 | 无法判断 WS 是否另有 token / cookie 校验 | 显式 WS bearer / signed nonce；重连重新鉴权；设备 key |
| **托管留存并非“删历史即删除”** | Privacy 称 live tunnel 通常 7 天，但 history / diagnostics / backups 可能保留；Remove from history 只是隐藏 | 不能把 session 当临时即不可恢复 | 可验证 deletion receipt；第三方 retention map；企业 data residency |

### 5.2 Privacy / Terms 给出的真实采用边界

[Privacy Policy](https://agenttunnels.com/privacy) 明确可能处理：

- tunnel title、display name、message；
- shared context、proposal、patch、command、command output；
- approval 与 activity event；
- technical usage、support data、diagnostic / session replay。

政策同时要求不要提交 credentials、secrets、production data、personal data 或第三方 confidential information；[Terms](https://agenttunnels.com/terms) 也明确本地 Agent action 可能修改文件、失败或造成不可逆损害，产品处于免费 experimental beta。

因此，官网的 “repos stay isolated” 应理解为：

> **没有自动上传整个 repo，双方默认保留本地目录；但用户选择分享的片段、提案和执行结果会进入托管 session。**

它不等同于“所有代码都不离开设备”，更不等同于 E2EE。

这与 [mcp-server-trust](/wiki/concepts/mcp-server-trust/) 的基本原则一致：能被发现或能被安装不代表可被信任；package identity、版本 pinning、权限边界与运行证据必须分别验证。也与 [safe-autonomy](/wiki/concepts/safe-autonomy/) 的结论一致：prompt 里的“不要越权”不能替代 executor 的硬边界。

---

## 6. GitHub 类似项目：没有单仓替代，只有分层拼图

下表的 star 与最近推送时间为 2026-08-10 18:44（Asia/Shanghai）的 GitHub API 快照；star 只表示可见度，不等于生产成熟度。

| 项目 | 快照 | 覆盖层 | 与 Agent Tunnels 的重合 | 替代判断 |
|---|---:|---|---|---|
| [Coral Protocol server](https://github.com/Coral-Protocol/coral-server) + [cross-org demo](https://github.com/Coral-Protocol/coral-cross-org-software-development-demo) | 247★ / demo 1★；server 2026-07-19 push；无明确许可 | 跨 Agent session、thread、participant、MCP messaging | **语义上最接近**；现有 demo 是单 server、多本地目录的跨组织模拟 | 只证明 thread / message workflow，不证明真实多组织认证、部署或网络隔离 |
| [A2A](https://github.com/a2aproject/A2A) | 25,270★；2026-08-10 push；Apache-2.0 | Agent interoperability protocol | task、message、artifact、stream、auth、HITL state | 可作为未来 wire protocol，不能替代邀请房间、本地 bridge 与审批台 |
| [agentgateway](https://github.com/agentgateway/agentgateway) | 4,288★；2026-08-07 push；Apache-2.0 | LLM / MCP / A2A gateway 与 policy | JWT / OAuth / TLS、RBAC、rate limit、guardrail、OTel | 很适合补 policy plane，不提供跨公司 support workflow |
| [Pilot Protocol](https://github.com/pilot-protocol/pilotprotocol) | 131★；2026-08-09 push；AGPL-3.0 | Agent-native P2P network | rendezvous、STUN、hole punching、relay、mutual trust、E2E | 仅作为实验性 P2P / E2E underlay 候选；生产前仍需独立安全、互操作与运维验证 |
| [Alook](https://github.com/alookai/alook) | 1,056★；2026-08-10 push；Apache-2.0 | local agents + hosted / self-hostable control plane | room、inbox、Kanban、calendar、trace | 围绕单一 workspace / AI company；没有明确的双边组织身份、session selective disclosure 与双边审批 |
| [Tutti](https://github.com/tutti-os/tutti) | 3,239★；2026-08-10 push；Apache-2.0 | 当前为本地单用户、多 Agent shared workspace | context、file、task、output、approval UI；repo 含 DeviceLink primitive | 多设备 / 多人 room 属尚未发布的 Tutti VM，不能当作当前跨组织能力 |
| [OpenChamber](https://github.com/openchamber/openchamber) | 8,068★；2026-08-10 push；MIT | 远程 coding-agent session | WebSocket/SSE、diff review、approval、E2E relay、device token | 最值得参考本地执行与审阅 UX；仍是单 owner 远控 Agent |
| [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy) | 2,700★；2026-07-20 push；MIT | MCP transport adapter | stdio ↔ SSE / Streamable HTTP；remote-client 方向支持 OAuth / TLS | 入站暴露本地 stdio server 时仍需认证代理或私网；不解决 room、invite、角色和授权 |
| [NetBird](https://github.com/netbirdio/netbird) | 28,214★；2026-08-10 push；mixed license | 企业 private mesh / identity / policy | WireGuard、SSO/MFA、ACL、audit，另有 Agent Network 方向 | 大部分 BSD-3-Clause；management / signal / relay / combined 为 AGPL-3.0；仍需上层 session workflow |
| [cloudflared](https://github.com/cloudflare/cloudflared) | 15,162★；2026-08-07 push；Apache-2.0 | reverse tunnel / edge connectivity | NAT 后可达与 Cloudflare edge | 只解决连接；没有证据表明 Agent Tunnels 使用 cloudflared |
| [frp](https://github.com/fatedier/frp) | 108,682★；2026-08-09 push；Apache-2.0 | reverse proxy / NAT traversal | 暴露内网 service | 产品名字相似但问题层完全不同 |

### 6.1 Coral Protocol：最接近的公开源码语义原型

Coral 的 cross-org demo 直接表达了与 Agent Tunnels 相近的原则：多个 Agent 通过中间 thread 协作，Claude Code、Cursor 等可通过 MCP 连接 Coral server。但 README 明确将其描述为跨组织场景的 **模拟**：三个 Agent 目录接到同一个本地 Coral server，再调用 local session API。它证明了 thread / message workflow，不证明真实组织间的独立部署、认证域、网络隔离或“私有数据必然留在各组织”。

Coral server 已有：

- session、thread、participant 与 message；
- create / close thread、add / remove participant、send / wait 等 MCP tools；
- 每个 Agent 的 MCP SSE / Streamable HTTP endpoint 与 secret；
- Kotlin / Ktor server，可本地 executable 或 Docker 运行。

但它仍不能直接作为生产替代：

- README 标注 WIP；
- 固定提交 `38c5dec1cc2e2da7ee18b78c8c84f6d8c84493aa` 的 [SecurityConfig.kt](https://github.com/Coral-Protocol/coral-server/blob/38c5dec1cc2e2da7ee18b78c8c84f6d8c84493aa/src/main/kotlin/org/coralprotocol/coralserver/config/SecurityConfig.kt) 仍是明确 TODO；
- [`SessionThread.addParticipant()`](https://github.com/Coral-Protocol/coral-server/blob/38c5dec1cc2e2da7ee18b78c8c84f6d8c84493aa/src/main/kotlin/org/coralprotocol/coralserver/session/SessionThread.kt#L119-L148) 只要求请求者已在 thread 中，并无明确 owner / admin gate；新成员还会收到全部历史消息；
- demo 中 human approval 更像 prompt / 演示约定，而不是服务器的一等状态机；
- Docker 路线需要 host `docker.sock`，本身带来高权限边界；
- 两个 repo 都没有根级 LICENSE / COPYING，GitHub API 也返回 `license=null`。

结论：**Coral 适合借鉴 domain model 与 MCP surface，不适合原样承担 trust plane；未获得明确许可前，不应复制或再分发其代码。**

### 6.2 A2A 与 MCP：协议位置不同

- **MCP** 适合让当前 coding agent 调用本地 Agent Tunnels bridge，是 tool plane；
- **A2A** 适合未来描述 Agent Card 元数据 / 能力 / 认证方案声明，以及 task、message、artifact、stream 与中断 / HITL state，是 interoperability plane；它本身不签发身份，也不是 policy service；
- **Agent Tunnels session** 仍需自己定义 org membership、invite、selective disclosure、proposal、approval、effect 与 retention。

因此，给兼容 MCP 的本地 IDE host 做 MVP 时应 MCP-first；Codex / OpenCode 等 shell 场景保留 headless CLI。等需要让不同企业 Agent 平台直接互通，再增加 A2A adapter，而不是一开始重造协议。

### 6.3 最值得借鉴的公开项目组合

| 目标能力 | 推荐参考 |
|---|---|
| 跨组织 room / thread / participant / messaging | Coral Protocol 的领域模型（仅借鉴，源码无明确许可） |
| 标准化 task / artifact / Agent Card | A2A |
| JWT/OAuth、RBAC、rate limit、guardrail、observability | agentgateway |
| diff review、approval center、本地 Agent remote UX | OpenChamber、Tutti |
| P2P / E2E transport 实验 | Pilot Protocol、Tutti DeviceLink primitive |
| 企业 private mesh 与 device identity | NetBird |
| 仅做 MCP transport adaptation | mcp-proxy |

没有单一、许可清晰且成熟的 repo 是 Agent Tunnels 的完整克隆。一个可信实现更像：

> **Coral-like domain model + agentgateway-like policy + hardened local executor + relay / private mesh + OpenChamber/Tutti-like approval UX。**

---

## 7. 如果自己实现：推荐架构

### 7.1 五个组件

1. **Control plane**
   - Account、Organization、verified domain、device；
   - session lifecycle、one-time invite、membership、retention；
   - Web timeline、proposal diff、approve / reject、resolve / export / delete。

2. **Session actor / event log**
   - 每个 session 一个严格单调 `seq`；
   - append-only event、snapshot、WebSocket、resume cursor；
   - TTL、backpressure、size cap、idempotency key；
   - MVP 可用 Cloudflare Durable Objects；企业版需评估 region pinning 和 export / deletion。

3. **Local bridge**
   - MCP stdio server，提供 read / wait / post / share_context / propose / execute，并只读观察 human decision；
   - headless CLI 作为 fallback；
   - host adapter 只负责把 session events 翻译成 Agent tools，不直接扩大 OS 权限。

4. **Policy plane**
   - `principal × organization × session × role × capability × resource × time`；
   - vendor 默认只能 message / ask / propose；
   - customer 才能 disclose context 与兑换本地 execution lease；
   - 所有 action 写 immutable audit event。

5. **Hardened executor**
   - 默认只读；
   - command 用结构化 argv，不走 `shell:true`；
   - container / microVM / OS sandbox，env allowlist、network deny-by-default；
   - patch 绑定 git base SHA，执行 `git apply --check`，拒绝 symlink 与 worktree 外 realpath；
   - 临时分支 / snapshot、原子 apply、失败 rollback。

### 7.2 最重要的授权协议

不要让 “approved proposal id” 直接触发任意本地 action。推荐流程：

1. Vendor 提交 canonical proposal：
   - kind；
   - exact payload；
   - target workdir logical id；
   - expected base SHA；
   - requested capabilities；
   - expiry。
2. Server 计算 `payload_hash = SHA256(canonical_json)`；
3. Customer UI 展示 exact payload、diff、workdir、base SHA 和能力；
4. Human 批准该 hash；
5. Server 签发一次性 lease：
   - session / proposal / payload hash；
   - customer device public key；
   - max runtime / egress / files；
   - expires_at、nonce；
6. Local executor 验签、重新计算 hash、确认 base SHA / realpath；
7. 只执行 lease 内的 exact payload；
8. 上传签名 effect，包含 tool version、before / after SHA、exit code 与输出摘要；
9. lease 立即作废，重复请求返回原 effect 而不是重跑。

这一步是产品能否从“协作聊天”升级为“跨组织授权基础设施”的分水岭。

### 7.3 Context 分享协议

客户侧不应只提供一个 `redacted=true` 标签，而应在上传前完成：

- path allowlist / denylist；
- secret scanner、PII scanner、entropy token detection；
- 最大字节、行数、文件类型；
- origin metadata：repo、commit、path、line range、采集时间；
- preview 与人工确认；
- 可选 client-side encryption，使 session service 只转发 ciphertext；
- context revoke 只影响未来读取时，还要明确已被对方 Agent消费的内容无法“撤回认知”。

### 7.4 推荐 API / event 边界

最小 API 可以保持很小：

- `POST /sessions`
- `POST /sessions/:id/invites`
- `POST /sessions/:id/join`
- `POST /sessions/:id/events`
- `GET /sessions/:id/events?after_seq=`
- `GET /sessions/:id/stream`
- `POST /proposals`
- `POST /proposals/:id/decision`
- `POST /proposals/:id/lease`
- `POST /effects`
- `POST /sessions/:id/resolve`
- `DELETE /sessions/:id`

event type 则应显式版本化：

`member.joined | message.posted | context.shared | proposal.submitted | proposal.approved | lease.issued | effect.started | effect.succeeded | effect.failed | effect.indeterminate | session.resolved`

比起增加更多工具，优先保证同一事件在断网、重连、重复投递和超时后仍只有一个可解释结果。

---

## 8. 分阶段实现路线

### P0：只读协作房间

范围：

- verified work email + one-time invite；
- 双方 Agent 只读 / 发消息 / 等待；
- 客户手动粘贴经过 redaction 的 context；
- 无 command / patch executor；
- 7 天 TTL 与显式 export / delete。

证明门槛：

- 5–10 个真实 API / SDK support case；
- 相对 Slack 基线，time-to-first-useful-diagnosis 与人工 copy-paste 次数显著下降；
- 没有 unauthorized disclosure；
- disconnect / reconnect 后事件不丢、不乱、不重复。

### P1：结构化提案，客户手动应用

范围：

- vendor 生成 patch / command proposal；
- Web 做 syntax highlight、diff、风险解释；
- customer 复制或让自己 Agent 手动 apply；
- proposal / approval / outcome 进入审计。

这一步可以先验证“结构化提案是否真的加速支持”，而不急着引入本地 RCE 风险。

### P2：受限本地 executor

只有 P1 证明用户确实需要一键执行后才加入：

- hash-bound approval；
- one-time lease；
- sandbox、env / egress policy、git rollback；
- side-effect idempotency 与 indeterminate reconciliation；
- device identity / signed effect。

### P3：企业 trust plane

- Organization / domain verification、OIDC / SCIM；
- mTLS / device key、RBAC / ABAC、SIEM export；
- DLP、data residency、customer-managed key；
- third-party subprocessor governance 与 verifiable deletion；
- policy versioning、break-glass 与 security review。

---

## 9. 产品判断：wedge、边界与护城河

### 9.1 最合理的首批用户

- API / SDK 公司；
- solutions engineering、developer support、DevRel；
- 已经使用 Slack Connect / shared channel 服务客户；
- 双方都在使用 Claude Code、Codex、Cursor、OpenCode 等 coding agent；
- 问题需要 repo / log 级上下文，但不能直接把客户 repo 交给 vendor。

这比“所有 Agent 都需要互相聊天”更窄，也更可销售。买方更可能是 vendor 的 support / engineering leader，客户 developer 是被邀请使用者。

### 9.2 真正可能形成的护城河

不是：

- MCP tool 数量；
- HTTP + WebSocket transport；
- invite link；
- “两个 Agent 互聊”的 demo。

可能是：

1. 跨组织 identity 与低摩擦 onboarding；
2. 精确、可审计、可撤销的 delegated authority；
3. 支持场景的 proposal / approval / effect 数据模型；
4. 主流 coding agent 与 Slack / support platform 的稳定 adapter；
5. 在不扩大数据披露的前提下显著降低 resolution time；
6. 安全审查、数据驻留、删除和事故响应形成的企业信任。

### 9.3 最强反命题

1. **高价值 case 恰好最不能上传。** Privacy 要求用户不要提交 production / confidential data，且公开 client 未见技术拦截，这会把产品挡在最有价值的支持问题之外。
2. **安装阻力可能大于复制粘贴成本。** 双方都要安装 bridge、保持 Agent 在线、理解角色和审批；低频支持 case 可能不值得。
3. **Slack + GitHub patch 已经够用。** 如果诊断不复杂，厂商发一段 patch / gist，客户自己 review，会比新 session 产品更简单。
4. **Agent 会放大 prompt injection 与错误权限。** 厂商 Agent 看到客户恶意 repo 内容，或客户 Agent 误执行 vendor proposal，都可能把跨组织信任变成攻击路径。
5. **平台方可原生吸收。** GitHub、Slack、Sentry、主流 coding agent 或 API support 平台若加入 structured context handoff / approval，独立中间层的分发与议价空间会缩小。
6. **双边网络效应很弱。** 每次 session 都是一次新的组织配对；如果 vendor 不能把客户一键带入，产品会受双边 adoption 摩擦约束。

### 9.4 应用数据证明，而不是 demo 证明

最重要的 proof gates：

| Gate | 指标 |
|---|---|
| 支持效果 | median time-to-reproduction、time-to-resolution、首次有效修复率 |
| 人工负担 | 每 case 人工 copy-paste 次数、双方 human active minutes |
| Context 效率 | 上传字节 / 文件数、被实际引用比例、因缺 context 重问次数 |
| 授权正确性 | proposal 与 executed payload hash 100% 一致；未授权执行为 0 |
| 可靠性 | reconnect、duplicate、timeout、response-loss 的可恢复率 |
| 安全 | secret leakage、workdir escape、egress violation、cross-session access 为 0 |
| 留存 | vendor 团队在真实客户 case 的周复用；不是注册数或创建 session 数 |

---

## 10. 最终结论

Agent Tunnels 抓住了一个比“Agent social network”更可落地的切口：**两个组织各自已经有 Agent，但缺少一个既不合并私有上下文、又能把问题—提案—授权—执行连起来的协作层。**

从公开 npm 包看，它已经不是纯 landing page：

- 有真实 vendor / customer role；
- 有 sequenced session event、WebSocket 与 pending-wait snapshot poll；
- 有 MCP / CLI 两种 bridge；
- 有 proposal status / governance 读取、client-side approval gate 与 effect report；approval 的 Web 写入和服务端强制逻辑本身不公开；
- 有客户本地 command / patch executor。

但产品最难的部分恰好也是当前未被证明的部分：

- server-enforced cross-org identity；
- approval 与 exact payload 的密码学绑定；
- 本地 sandbox / DLP / rollback；
- WebSocket 与 invite 安全；
- verifiable retention / deletion；
- 真实企业 pilot 的 resolution-time 与安全结果。

所以当前最佳理解不是“已经完成的跨公司 Agent 网络”，而是：

> **一个设计方向正确、客户端原型可审计、但 trust plane 仍待重做和验证的 B2B Agent support beta。**

若要复刻，建议先做 P0 / P1 的只读 session 与结构化提案，用真实 SDK support case 证明价值；不要把本地 RCE 当作 MVP 必需功能。只有协作价值通过后，再以 hash-bound approval、一次性 lease 和 sandboxed executor 加回自动执行。

---

## Sources

### Agent Tunnels

- [Official site](https://agenttunnels.com/)
- [Show HN](https://news.ycombinator.com/item?id=49217232)
- [Loom demo](https://www.loom.com/share/68a4307b4c534e649f93cc4c16a19ee6)
- [Privacy Policy](https://agenttunnels.com/privacy)
- [Terms](https://agenttunnels.com/terms)
- [npm package](https://www.npmjs.com/package/agenttunnels)
- [npm registry metadata](https://registry.npmjs.org/agenttunnels)
- [registry tarball @ 0.1.17](https://registry.npmjs.org/agenttunnels/-/agenttunnels-0.1.17.tgz)
- [package.json @ 0.1.17](https://unpkg.com/agenttunnels@0.1.17/package.json)
- [README @ 0.1.17](https://unpkg.com/agenttunnels@0.1.17/README.md)
- [skill.md @ 0.1.17](https://unpkg.com/agenttunnels@0.1.17/skill.md)
- [index.js](https://unpkg.com/agenttunnels@0.1.17/dist/index.js)
- [headless.js](https://unpkg.com/agenttunnels@0.1.17/dist/headless.js)
- [session-client.js](https://unpkg.com/agenttunnels@0.1.17/dist/session-client.js)
- [session-types.d.ts](https://unpkg.com/agenttunnels@0.1.17/dist/session-types.d.ts)
- [membership.js](https://unpkg.com/agenttunnels@0.1.17/dist/membership.js)
- [tunnel-watcher.js](https://unpkg.com/agenttunnels@0.1.17/dist/tunnel-watcher.js)
- [mcp-server.js](https://unpkg.com/agenttunnels@0.1.17/dist/mcp-server.js)
- [local-effects.js](https://unpkg.com/agenttunnels@0.1.17/dist/local-effects.js)
- [install.js](https://unpkg.com/agenttunnels@0.1.17/dist/install.js)
- [session-store.js](https://unpkg.com/agenttunnels@0.1.17/dist/session-store.js)
- [caps.js](https://unpkg.com/agenttunnels@0.1.17/dist/caps.js)
- [sentry.js](https://unpkg.com/agenttunnels@0.1.17/dist/sentry.js)
- [package metadata 指向、当前不可公开访问的 GitHub repo](https://github.com/lakshman111/agenttunnels)

### GitHub comparison

- [Coral Protocol server](https://github.com/Coral-Protocol/coral-server)
- [Coral cross-org software development demo](https://github.com/Coral-Protocol/coral-cross-org-software-development-demo)
- [A2A](https://github.com/a2aproject/A2A)
- [agentgateway](https://github.com/agentgateway/agentgateway)
- [Pilot Protocol](https://github.com/pilot-protocol/pilotprotocol)
- [Alook](https://github.com/alookai/alook)
- [Tutti](https://github.com/tutti-os/tutti)
- [OpenChamber](https://github.com/openchamber/openchamber)
- [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)
- [NetBird](https://github.com/netbirdio/netbird)
- [cloudflared](https://github.com/cloudflare/cloudflared)
- [frp](https://github.com/fatedier/frp)

### Knowledge base

- [mpai-multiplayer-ai-implementation-analysis-2026-08-04](/output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04/)
- [user-a-use-user-b-agent-deep-research-feishu-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-deep-research-feishu-2026-05/)
- [agent-infrastructure](/wiki/maps/agent-infrastructure/)
- [agent-communication](/wiki/maps/agent-communication/)
- [agent-communication](/wiki/concepts/agent-communication/)
- [agent-native-im](/wiki/concepts/agent-native-im/)
- [mcp-server-trust](/wiki/concepts/mcp-server-trust/)
- [safe-autonomy](/wiki/concepts/safe-autonomy/)

---
*由 LLM 基于公开网页、公开 npm 包、GitHub 仓库与知识库查询生成*
