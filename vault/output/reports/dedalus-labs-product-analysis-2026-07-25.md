# Dedalus Labs 产品与技术分析：从 MCP Agent 平台转向持久 VM

> 生成时间：2026-07-25
> 查询：https://docs.dedaluslabs.ai/ 研究一下这个产品
> 研究快照：官网、Docs、Pricing、Blog、GitHub 与竞品官方文档；动态价格、Beta 能力和性能数字应在采购前重新核验

## 摘要

**Dedalus 当前的产品本质，不再是一个“5 行代码写 Agent”的 SDK，而是面向 Agent builder 的持久 Linux VM 云。** 开发者为每个用户或任务创建一台隔离 VM，让 repo、依赖、文件与 shell 环境跨 session 保留；不用时机器 sleep、停止 CPU/RAM 计费，需要时由 API、CLI、SSH 或 WebSocket terminal 唤醒。

我的判断是：

1. **问题真实，产品有用。** 长期运行的 coding、browser、research Agent 确实需要隔离、持久状态、root/full Linux、快速唤醒和按活跃时间计费。
2. **最有价值的不是 Agent orchestration，而是 VM 与存储层工程。** Agents SDK 的 model gateway、tool loop、handoff 和 policy 都较常规；若自研 VMM、低延迟 snapshot restore、disaggregated filesystem 与 live migration 能在规模下成立，才是硬价值。
3. **差异化已被明显压缩。** E2B、Daytona、Fly Machines 都支持 pause/stop 后只收存储或不收 CPU/RAM；E2B、Daytona 还支持 memory persistence、snapshot/fork 等能力。Dedalus 活跃算力单价约比 E2B/Daytona 低 10%，并非官网计算器暗示的 60%–71% 普遍优势。
4. **目前仍是 public beta，官网和具体文档存在明显漂移。** 官网宣称 memory/background processes、GPU、ports 等能力，具体 Docs 却说明 sleep 会丢弃 RAM，GPU、port URL、memory snapshot、fork 等不在 public beta。生产选型应以具体 Docs 和实测为准。
5. **值得做可逆 PoC，不值得现在形成生产锁定。** 当前缺独立性能 benchmark、公开 SLA/故障数据、安全审计、生产客户用量与毛利证据。

一句话结论：**Dedalus 是一家从 “OpenRouter + Smithery/Composio 式 Agent 平台” 向 “Agent 时代的低延迟 Fly/E2B” 收敛的基础设施公司；方向比旧叙事更扎实，但 moat 仍未被公开证据证明。**

## 1. 它到底在卖什么

### 当前旗舰：Dedalus Machines

买方是构建 Agent 产品的开发者或平台团队，不是最终消费者。

| 买方问题 | Dedalus 交付 |
|---|---|
| 每个用户的 Agent 需要独立执行环境 | 每个 machine 有独立 guest kernel 与 filesystem |
| repo、依赖、缓存与文件不能每次重装 | root filesystem 跨 sleep/wake 保留 |
| Agent 只偶尔工作，常驻 VM 太贵 | autosleep，sleep 时停止 compute billing |
| Agent 需要真实 shell、系统包与编译器 | full Linux、systemd、root、SSH、terminal、execution API |
| 本地 Agent 无法 24/7 在线 | 云端机器，可由 API/CLI/SDK 驱动 |

用户真正买到的结果是：**一个可以被 Agent 当成自己长期电脑使用的隔离 Linux 运行环境**，而不是“更聪明的 Agent”。

官方当前价格为：

- vCPU：`$0.04536 / vCPU-hour`
- Memory：`$0.01458 / GiB-hour`
- Storage overage：约 `$0.073 / GiB-month`
- Hobby：`$0/月`，5 台 machines、每台 10 GiB、50 active hours/月上限
- Pro：`$20/月`，包含 `$20` compute credit、20 台 machines、每台 20 GiB
- Enterprise：SSO、RBAC、audit logs、SLA、dedicated fleet、BYOC 均为销售承诺

1 vCPU + 2 GiB RAM 的活跃成本是：

`0.04536 + 2 × 0.01458 = $0.07452/hour`

与官方 FAQ 的约 `$0.075/hour` 一致。

### 上一代产品仍然存在

Dedalus 不是单产品，而是四层平台：

| 层 | 产品 | 当前判断 |
|---|---|---|
| Compute | Dedalus Machines | 当前旗舰与最清晰的付费产品 |
| Runtime | Agents API / DedalusRunner | model gateway + local tools + MCP + streaming + handoff + policy |
| Tool supply | MCP framework、hosting、marketplace | 有真实部署与目录，但 creator revenue sharing 仍写作 “in the future” |
| Trust | DAuth | 有公开 client/framework 和架构文档；核心 enclave/control plane 未公开验证 |

演进路径也很明显：

- **2025**：MCP server 三键部署、Marketplace、跨模型 Agent SDK；
- **2026-01**：DAuth，解决第三方 MCP 使用用户凭证的问题；
- **2026-06**：Dedalus Machines 成为旗舰，官网、Pricing、Careers 和 Docs 首页都转向 “compute substrate”。

这不是完全放弃旧产品，而是发现 Agent SDK 和 MCP hosting 缺少可控 compute，于是向下吃掉 runtime substrate。但它也说明公司曾经的 wedge 不够稳，当前仍处于战略收敛期。

## 2. 技术实现链

当前可从具体文档还原出的机器链路是：

1. Builder 通过 CLI、Python/TypeScript/Go SDK 或 HTTP API 创建 machine，指定 vCPU、memory、storage 与 autosleep。
2. 官方称其使用从 Cloud Hypervisor fork 的自研 VMM，以 snapshot restore 而非 image pull 启动 VM。
3. 每台 machine 有独立 Linux kernel、root filesystem、systemd、SSH、PTY terminal 和 execution API。
4. Compute 与持久存储解耦；`/home`、`/root`、`/etc`、`/usr/local`、`/var` 等 root filesystem 路径跨 sleep/wake 保留。
5. 默认 5 分钟 idle 后 autosleep。**具体 Docs 明确说 sleep 会 deallocate RAM、丢弃 memory state；它保留的是 filesystem，不是运行进程。**
6. 新请求到来时 wake，再通过一次性 execution 或长连接 terminal/SSH 继续工作。
7. 官方称 wake 在 50ms 内，但当前没有公开、独立、可复现的 P50/P95/P99 benchmark。

这套设计最适合：

- per-user coding Agent；
- browser/research Agent 的长期工作目录；
- bursty CI runners 与 PR preview；
- 需要 root、apt/pip/npm/cargo、Docker 或长任务的执行；
- filesystem 作为跨 session 状态载体。

它不自动提供：

- durable Agent step/event log、重试与 side-effect reconciliation；
- task-bound permission、业务审批与 outcome verification；
- 向量记忆、context compression 或用户画像；
- 生产 Agent 的 CRM、支付、库存、法律与责任边界。

因此 Dedalus Machines 是 [agent-runtime](/wiki/concepts/agent-runtime/) 的 **compute/environment 层**，不是完整 Agent Runtime 或 Harness。

## 3. Agents SDK 与 MCP 层有没有技术巧思

### Agents SDK：好用，但基本常规

`DedalusRunner.run()` 把以下能力放进同一调用：

- `provider/model` 形式的统一 model gateway；
- local typed function tools；
- hosted 或 external MCP server；
- streaming 与 structured output；
- 多模型 handoff；
- 每 step 注入的 runtime policy；
- tool event callback 与 max steps。

这些解决的是 integration friction，但核心循环仍是常见的 `model → tool call → execute → append result → next model step`。Handoff 本质上是向模型暴露多个模型并让 coordinator 路由；Policy 本质上是按 step/messages/tools_called 修改 prompt、max steps 或 stop。它不是新的规划算法、durable workflow engine 或新的训练范式。

公开的 Python Agents SDK 还是由 Stainless 从 API schema 生成的 typed REST client。它证明 API surface 与 DX，不证明 orchestration moat。

### Dedalus MCP：公开代码比营销更扎实

`dedalus-mcp-python` 的价值在工程正确性：

- decorator 只附 metadata，`server.collect()` 再注册，避免 ambient global state；
- 针对多个 MCP protocol version 做 typed profile 与 schema validation；
- OAuth 2.1、DPoP、scopes、Streamable HTTP、client/server primitives；
- 公开 repo 快照 `89d556055301a62e488e2e86c2f14d142da9e505` 中有 91 个 test-related files。

这属于“把开放协议做对”的产品价值，不是不可复制算法。公开 repo 在 2026-07-25 为约 144 stars、10 forks，最新 release v0.7.0 发布于 2026-01-28；有真实代码，但 adoption 仍小。

### DAuth：方向重要，安全保证仍需降级

DAuth 的设计意图是正确的：

`用户凭证 client-side encryption → scoped/DPoP token → MCP server 只拿 opaque handle → dispatch gateway/enclave 代为调用外部 API → 只返回结果`

这比把 API key 直接塞进第三方 MCP 的 env 或内存更合理，也直击 [mcp-server-trust](/wiki/concepts/mcp-server-trust/) 的 credential 风险。

但公开证据只能验证：

- MCP framework 里的 OAuth/DPoP/scopes；
- `ctx.dispatch()`、connection handle、gateway wire format；
- client 对 enclave endpoint 的 HTTP/DPoP/HMAC 调用与 mock tests。

公开 repo 没有 enclave server、Nitro/硬件 attestation、key management、egress enforcement 或第三方安全审计。官方“任何 tool 或恶意 actor 都永远无法偷 secret”“Dedalus 也看不到”的绝对保证目前不能独立确认。Marketplace server 的 tool semantics、prompt injection、过宽 intent、结果泄露与 malicious-but-authorized call 也不因隐藏凭证而消失。

## 4. 官网与 Docs 的关键冲突

| 官网/About 宣传 | 具体 Docs | 应采用的保守结论 |
|---|---|---|
| filesystem、memory、background processes 都跨 sleep 保留 | sleep deallocates RAM and discards memory state | 当前确认的是 filesystem persistence，不是 hibernation |
| GPU、public ports、500 GB disk、nested virtualization | GPU machines、port URLs、premium storage、memory snapshots、fork 等不在 public beta | 不应把 marketing surface 当作 self-serve GA |
| “0 cold starts”、50ms wake | 无独立 benchmark，旧官网材料还曾写 250ms | 仅算 vendor latency claim |
| live migration “zero downtime” | Docs 只说 failure/maintenance 时会迁移 machine | 未见 SLA、故障演练和丢失率 |
| “其他容器 sleep 仍收费”、可省 60%–71% | E2B、Daytona 的 paused/stopped 状态也不收 CPU/RAM，只收存储 | 价格优势主要约 10% active rate + 计划差异，不是普遍 60%+ |

这种 drift 不只是文案问题。基础设施产品的状态、持久性与计费语义必须精确；否则开发者可能错误地把 RAM/process 当 durable state，导致 wake 后任务丢失。

## 5. 竞品位置

| 产品 | 隔离/形态 | 持久性 | 恢复与限制 | 相对 Dedalus |
|---|---|---|---|---|
| **Dedalus Machines** | full Linux VM，独立 kernel | filesystem；具体 Docs 说 RAM 不保留 | vendor claim `<50ms`；无固定运行时长；public beta | 唤醒与 full Linux 叙事强，功能与证据仍薄 |
| **E2B** | Agent sandbox | pause 同时保存 filesystem + memory/process | 官方约 1s resume；Pro 单次连续运行 24h | 更成熟、客户证据强；恢复慢于 Dedalus claim |
| **Daytona** | container + Linux/Windows VM + GPU | filesystem；VM pause/hot snapshot 可保 memory；另有 fork/volume | container `<90ms`，VM 性能需分开看 | 能力面更完整，当前 active 单价约高 10% |
| **Fly Machines** | 通用 Firecracker microVM | suspend 保存 memory；volume/rootfs 持久 | resume 数百 ms；suspend 只收 storage | 通用 infra 更成熟，但不提供 agent-native SDK/MCP/DAuth |

价格上，E2B 与 Daytona 公布的 active rates均约为：

- `$0.0504 / vCPU-hour`
- `$0.0162 / GiB-hour`

同样 1 vCPU + 2 GiB 约为 `$0.0828/hour`，Dedalus 的 `$0.07452/hour` 约低 10%。这是真实但不颠覆性的差距。

Dedalus 更可信的差异化应表述为：

> 如果 `<50ms` 的 full Linux VM wake、长期 filesystem durability、无固定 runtime timeout 与低 10% active cost 能在 P95/P99 和故障场景成立，它是一个更适合长寿命 Agent 的 compute primitive。

而不是：

> 只有 Dedalus 能 persistence、sleep-to-zero，所有其他 sandbox 都贵且不安全。

## 6. 商业模式与公司判断

### 谁付费、为什么付费

- Agent app / coding-agent / browser-agent 团队按 CPU、RAM、storage 付费；
- Pro 计划收订阅并返同额 compute credit，本质仍是 usage cloud；
- Enterprise 为 dedicated fleet、SLA、BYOC、SSO/RBAC/audit logs 付费；
- MCP creator monetization 仍是未来收入分成，不应计作当前已验证商业模式。

公司于 2025-10 官方宣布完成 **$11M seed round**，由 Kindred Ventures 与 Saga Ventures co-lead，并为 YC S25。融资和招聘 systems/distributed-systems engineers 说明它有资源做重基础设施，但不等于当前 traction。

### 三层产品检验

1. **组件是否新：部分否。** microVM、snapshot restore、persistent storage、scale-to-zero、MCP client/server、model gateway 都有成熟替代。
2. **组合是否解决真实问题：是。** Agent builder 想要 full Linux、per-user isolation、跨 session FS 与低 idle cost，这个组合清楚。
3. **是否已有难复制壁垒：未证明。** 需要规模运行数据、filesystem correctness、P95/P99 wake、failure recovery、density/margin、安全 attestation、客户 retention 与工具分发网络。

潜在 moat 不在 “Agent” 这个标签，而在：

- VM restore 与调度延迟；
- storage correctness、恢复与 live migration；
- 单 host density 与毛利；
- enterprise reliability 和 multi-region capacity；
- DAuth 的独立审计与 credential boundary；
- compute、auth、tool marketplace 之间能否产生真实分发/使用飞轮。

主要风险是：

- 与 E2B、Daytona、Modal、Fly、云厂商的水平竞争；
- platform surface 过宽，MCP、Auth、model gateway、marketplace、VM 同时投入；
- public beta 能力和 marketing drift；
- “Agent-native” 最终只是通用 sandbox IaaS 的包装；
- 未公开客户、active machine hours、retention、uptime、incident 与毛利。

## 7. 对 Combo 的意义

Dedalus 对 Combo 最合理的角色是 **可替换的 backend production input**，不是产品方向。

可能适用：

- 每位 creator/KOL 的试运行拥有隔离的 persistent workspace；
- 用户多次回来时保留 repo、依赖、素材处理脚本与中间产物；
- 执行 creator 生成或半可信的代码；
- bursty browser/code task 按 active time 计费。

它不解决：

- 用户为什么买；
- creator 的独特判断如何采集和确认；
- 交付结果如何验收；
- 失败、退款、人工升级和复购；
- capability 是否真的比通用模型更好。

因此建议只做一个可退出的对比 PoC，以同一真实任务比较 Dedalus / E2B / Daytona：

1. create、wake、first-command 的 P50/P95/P99；
2. sleep 24h/7d 后 filesystem、env、process、network 的真实恢复；
3. 并发 100/1,000 machines 的 rate limit 与失败恢复；
4. egress control、secret scope、cross-tenant isolation、audit；
5. 单个成功交付的 compute + storage + retry 成本；
6. SDK/API 可替换性与 export/migration。

在这些证据出来前，不要让 DAuth、DedalusRunner 或 machine-specific semantics 渗透到 Combo 的核心 domain model。

## 证据分层

### 已验证

- Dedalus Machines 的公开 API/CLI/SDK surface、public beta 状态、autosleep、filesystem persistence 与具体 current limits；
- 当前 pricing 与计划限制；
- Agents SDK、MCP framework、Marketplace 页面与公开 GitHub repo；
- `$11M` seed round 与 YC S25；
- E2B、Daytona、Fly 官方 persistence、billing 与恢复能力。

### 部分验证

- 自研 Cloud Hypervisor VMM、disaggregated filesystem、pjdfstest、live migration、nested virtualization：有官方技术说明，但无独立 benchmark/源码/审计；
- DAuth：公开 client、protocol 与 dispatch 层存在，核心 enclave/control plane 不公开；
- Marketplace 有真实 server 列表，但运行质量、付费、收入分成和网络效应未知。

### 未验证

- `<50ms` 在生产 workload 下的 P95/P99；
- “zero cold starts”、zero-downtime migration 与长期 durability；
- “任何 malicious actor 都无法取得 credentials”的绝对安全保证；
- 生产客户数、machine hours、retention、uptime、incident rate、gross margin；
- 当前 self-serve 环境是否真的开放 GPU、ports、nested virtualization 与大盘容量。

## 数据来源

### Dedalus 官方

- [Dedalus Docs 首页与完整索引](https://docs.dedaluslabs.ai/)
- [What are Dedalus Machines?](https://docs.dedaluslabs.ai/dcs/dm/dedalus-machines)
- [Lifecycle](https://docs.dedaluslabs.ai/dcs/dm/lifecycle)
- [Dedalus Machines Pricing](https://www.dedaluslabs.ai/pricing)
- [Why we are building virtual machines for AI agents](https://www.dedaluslabs.ai/blog/dedalus-machines-journey)
- [About Dedalus Machines](https://www.dedaluslabs.ai/about)
- [Agents SDK Quickstart](https://docs.dedaluslabs.ai/sdk/agents)
- [Handoffs](https://docs.dedaluslabs.ai/sdk/agents/handoffs)
- [Policies](https://docs.dedaluslabs.ai/sdk/agents/policies)
- [MCP Servers](https://docs.dedaluslabs.ai/sdk/agents/mcp)
- [DAuth Architecture](https://docs.dedaluslabs.ai/sdk/mcp/python/dauth-architecture)
- [MCP Deploy / Marketplace](https://docs.dedaluslabs.ai/sdk/mcp/python/deploy)
- [Dedalus $11M Seed](https://www.dedaluslabs.ai/blog/dedalus-seed-round)
- [dedalus-mcp-python](https://github.com/dedalus-labs/dedalus-mcp-python)
- [dedalus-agents-python](https://github.com/dedalus-labs/dedalus-agents-python)

### 竞品官方

- [E2B Sandbox Persistence](https://e2b.dev/docs/sandbox/persistence)
- [E2B Pricing](https://e2b.dev/pricing)
- [Daytona Persistence](https://www.daytona.io/docs/en/persistence/)
- [Daytona Billing](https://www.daytona.io/docs/billing)
- [Daytona Pricing](https://www.daytona.io/pricing)
- [Fly Machine Suspend and Resume](https://fly.io/docs/reference/suspend-resume/)
- [Fly Billing](https://fly.io/docs/about/billing/)

### 知识库关联

- [agent-runtime](/wiki/concepts/agent-runtime/)
- [mcp-server-trust](/wiki/concepts/mcp-server-trust/)
- [tool-routing](/wiki/concepts/tool-routing/)
- [agent-infrastructure](/wiki/maps/agent-infrastructure/)

---
*由 LLM 从知识库与公开来源查询生成*
