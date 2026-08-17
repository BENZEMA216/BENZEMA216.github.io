# Pilot Protocol 产品分析：Agent 网络、能力商店与发布入口

> **结论**：Pilot Protocol 不是单纯的“Agent 通信协议”，而是一套试图把 **Agent 可达性 → 能力发现 → 本地安装 → 方法调用 → 机器支付** 串成闭环的垂直基础设施。`/publish` 是它的供给侧入口：开发者只描述现有 HTTP API 或 CLI，Pilot 团队代为生成、签名、验证一个 Agent-first adapter，再放入 App Store。机制成立，公开实现也相当完整；但截至 2026-07-28，**技术闭环强于市场闭环**：网络规模指标不能等同于真实用户或有效任务量，应用供给仍少，安全隔离与撤销能力仍在补齐，商业模式也尚未被公开收入验证。

## 一、产品本质

Pilot 同时在做六层产品：

1. **Agent overlay network**：给 Agent 分配虚拟地址，在 NAT 后建立 UDP 直连或 relay fallback。
2. **Agent identity 与 discovery**：通过 registry、beacon、hostname 和 service directory 找到在线 Agent。
3. **本地 App Store**：把 API、CLI 或本地能力封装成可被 Agent 安装和调用的 adapter。
4. **能力路由**：通过 `pilot-mom` 等入口把任务路由给专业 service agents。
5. **Wallet / x402**：让 Agent 持有钱包并为调用自动支付。
6. **私有与企业网络**：以 network membership、RBAC、SSO、审计和专属部署作为未来付费层。

因此它真正想控制的不是一个传输协议，而是 Agent 能力市场的完整交易路径：

```text
能力提供者发布
  → Pilot 把 API/CLI 编译为 adapter
  → Agent 发现并安装
  → 本地 daemon 启动并授权调用
  → 远端 Agent / 服务完成任务
  → 钱包结算
  → 调用和供给继续增长
```

这与 [agent-communication](/wiki/concepts/agent-communication/)、[agent-runtime](/wiki/concepts/agent-runtime/) 和 [communication-to-economy](/wiki/connections/communication-to-economy/) 的交集最直接。

## 二、`/publish` 在解决什么

[Publish 页面](https://pilotprotocol.network/publish)把第三方接入压缩成一个 concierge workflow：

- 发布者描述 App 能做什么、提供哪些 methods；
- backend 可以是已有 HTTPS endpoint，也可以是本机可执行的 CLI command；
- Pilot 团队生成、签名并验证 adapter；
- 人工 review 后进入 App Store；
- 不要求上传原业务代码，API key 留在安装者或运营者一侧；
- 当前发布需要 email、release acceptance，桌面端才能完成表单。

这一步的巧思是：它没有要求 SaaS 厂商重新实现一套 Pilot-native server，而是把现有 API/CLI 转成机器可发现、可安装、可调用的方法包。对早期生态而言，人工代接入还能显著降低供给冷启动阻力。

但它的代价也很明确：

- 发布仍依赖 Pilot 团队 review，不是完全 permissionless；
- adapter 生成与信任链不够自助和透明，难以无限扩张；
- [发布规范](https://github.com/pilot-protocol/app-template/blob/main/docs/APP-PUBLISHING-SPEC.md)显示，当前 publisher trust 仍有较强的人审与 allowlist 依赖，countersign、强制 trusted-publisher enforcement 和完整 revocation 仍在演进；
- [Publisher Agreement](https://pilotprotocol.network/publisher-agreement)明确 Pilot 控制 catalogue、可撤回 listing，但已安装的旧版本未必能被远程召回。

所以 `/publish` 更像“早期 App Store 的白手套供给运营”，不是成熟的开放发布协议。

## 三、核心技术闭环是否真实

答案是：**真实，而且不只是 landing page。**

公开代码覆盖 daemon、registry、beacon、App Store、wallet、catalogue、SDK、skill injection 和 adapter template。主仓库、App Store 与 App Template 的 Go tests 均可在本地通过；主仓库有两项 macOS Unix socket 测试因系统临时目录路径过长失败，改用较短的 `TMPDIR=/tmp` 后通过，属于测试环境路径问题。

### 3.1 网络层

[IETF Internet-Draft](https://datatracker.ietf.org/doc/draft-teodor-pilot-protocol/01/)描述了 48-bit virtual address、direct/relay transport、reliable stream 与 datagram 等机制。它的架构位置是：

| 层 | 主要回答 |
|---|---|
| MCP | Agent 如何调用工具 |
| A2A | Agent 之间交换什么任务/消息 |
| Pilot | 两个跨设备、跨 NAT 的 Agent 怎样互相找到并建立连接 |

因此 Pilot 与 MCP/A2A 更接近上下层互补，不是直接替代。需要特别强调：该文档是作者提交的 **individual Internet-Draft**，不是 IETF 已采纳标准，也不代表 IETF endorsement。

### 3.2 App Store

[App Store 文档](https://pilotprotocol.network/docs/app-store)和源码显示，它不只是下载脚本，而是有：

- catalogue signature、artifact hash 和 manifest signature 校验；
- App supervisor、自动启动、crash-loop handling；
- broker-mediated grants 与审计；
- resource limits 和安装时声明。

但当前安全边界必须读得更保守。源码在 [sideload manifest 实现](https://github.com/pilot-protocol/app-store/blob/main/pkg/manifest/sideload.go)中明确说明：manifest grant allowlist 不能阻止恶意 binary 在 syscall 层绕过声明；Linux Landlock/seccomp/network namespace 与 macOS runtime sandbox 仍是后续方向。[Consent 文档](https://pilotprotocol.network/docs/consent)也承认 daemon 的 `-sandbox` 主要是路径约束，不是 chroot、seccomp 或 Landlock。

所以目前更准确的安全表达是：

> Pilot 已经有“签名供应链 + broker policy + supervisor”的应用控制面，但还没有完成“敌意本地进程也无法越权”的 OS 级 confinement。

### 3.3 Skill injection

安装器会把 Pilot skill 注入 `SKILL.md` / `CLAUDE.md`，默认还能定期从公开仓库刷新。这是很强的分发机制：Agent 一旦学会 Pilot，就能主动发现、安装和调用新能力。

同时它也是最大的治理风险之一。[Consent 文档](https://pilotprotocol.network/docs/consent)明确将自动刷新视为 supply-chain risk；默认约每 15 分钟检查一次更新，也支持 manual 或 disabled。对敏感生产环境，不应保留 auto 模式。

## 四、公开规模数据应该怎样读

2026-07-28 读取 [公开状态接口](https://polo.pilotprotocol.network/api/public-stats)时，返回约：

| 指标 | 实时值 | 应如何理解 |
|---|---:|---|
| active nodes | 218,149 | 最近仍向 registry 上报的在线节点 |
| total nodes | 251,665 | 历史累计注册节点 |
| requests/sec | 约 21,145 | registry 收到的控制面请求速率 |
| total requests | 172,045,417,809 | registry 累计消息计数 |

这些值不是完全虚构的前端数字：网站直接读取 status API，rendezvous 源码也以 `last_seen` 判定 active node。

但它们不能直接推出“有 21.8 万真实人在高频使用 Pilot”：

- 无法从公开数据区分独立个人、组织、自建批量节点、Pilot 自营 fleet 或测试实例；
- `requests/sec` 在 [registry API 源码](https://github.com/pilot-protocol/rendezvous/blob/main/server_api.go)中会对收到的 registry message 计数；
- daemon 默认持续发送 heartbeat、handshake polling、hostname reannounce 等控制面请求。

因此“每秒 2 万请求”主要证明 registry 承受着大量在线节点的控制流量，**不等于每秒 2 万个 Agent 任务、App 调用或付费交易**。这是根据公开实现作出的推断。

官网还宣传 430+ specialist agents。公开文档显示 service-agent scaffold 仓库需要授权，而主仓库 changelog 提到对 435 个 responders 的统一 systemd 运维。更合理的判断是：这首先是一支 Pilot 控制或运营的专业 Agent fleet，而非 430 个独立第三方供给商。

### App Store 的真实供给

2026-07-28 检查 [公开 catalogue](https://github.com/pilot-protocol/pilotprotocol/blob/main/catalogue/catalogue.json)：

- 24 个 catalogue entries；
- 其中 1 个 tombstone，约 23 个 active；
- 12 个 vendor 标为 Pilot Protocol；
- 其余约 11 个来自外部或合作供给。

这说明安装闭环已经能工作，但 marketplace liquidity 仍早。当前更像“有一批精选样板 App 的技术平台”，还不是第三方开发者自增长的 Agent App economy。

## 五、真正的差异化

### 相对 MCP / A2A

Pilot 的增量不是新的 tool schema 或 task semantics，而是跨设备可达、Agent address、NAT traversal、本地安装和机器支付。若 Agent 已经全部运行在云端并通过 HTTPS/MCP 接入，Pilot 的独立价值会明显下降。

### 相对 Tailscale / ZeroTier

Tailscale/ZeroTier 更成熟地解决设备私网和 zero-trust connectivity；Pilot 在上层额外提供 Agent-native address/ports、能力发现、adapter 安装、调用与 wallet。Pilot 更贴近 Agent workflow，但安全成熟度、企业运维和生态规模不在同一阶段。

### 相对 MCP registry / skills marketplace

普通 registry 主要解决“发现一个 server/skill”；Pilot 继续向下控制 binary 安装、进程启动、grant、跨 NAT 调用，向上接支付。这使闭环更完整，也把更多供应链、治理和主机安全责任集中到 Pilot。

## 六、最适合与最不适合的场景

### 强适配

- 本地、个人设备或边缘节点上的 persistent Agent；
- Agent 需要被其他设备/Agent 主动找到并调用；
- API/CLI 供给者想低成本测试 Agent 分发；
- 多节点之间需要持续地址、消息、服务发现和小额自动支付；
- 私有 Agent network 需要统一 membership 与未来的企业治理。

### 弱适配

- 纯云端 SaaS Agent，只需要标准 HTTPS/MCP；
- 单机、短生命周期、没有 inbound reachability 的 coding workflow；
- 已由成熟 service mesh、VPN、IAM、API gateway 管理的企业环境；
- 高敏感主机，无法接受本地第三方 binary 或远程 skill 更新；
- 小任务或低调用频率，新增 daemon、identity 和 network 运维的成本高于收益。

## 七、商业模式与控制点

[Plans 页面](https://pilotprotocol.network/plans)显示：

- public backbone：free、open、unlimited，AGPL；
- Private Network：early access；
- Enterprise：contact sales，主打 RBAC、SSO、审计、专属基础设施和支持。

[Publisher Agreement](https://pilotprotocol.network/publisher-agreement)显示：

- 当前 publishing 免费；
- revenue share、promoted placement 需要另行约定；
- 未来可对 listing 收费，但没有公开价格或 take rate。

最可信的近期商业模式不是从 23 个 App 抽佣，而是：

1. 企业私网与 managed control plane；
2. SLA、支持、合规与专属部署；
3. 后续才可能出现 App listing、调用分成、推广位与 x402 支付抽成。

它可能形成的长期控制点是 `identity + reachability + catalogue + install + payment`。但 control plane 也高度集中于 Pilot：registry、beacon、catalogue signing、review、skill distribution 都由其运营。数据面可以 P2P，不代表整个系统去中心化。

## 八、最终判断

| 维度 | 判断 |
|---|---|
| 产品机制 | **成立**：发布、发现、安装、调用、支付能组成闭环 |
| 工程兑现 | **中高**：公开组件和测试充分，不是概念项目 |
| 差异化 | **有条件成立**：persistent/local/cross-NAT Agent 的价值最强 |
| 生态成熟度 | **早期**：23 个 active App，约半数第一方 |
| 使用量证据 | **不足**：live node 有实现支撑，但不等于独立用户；RPS 主要是控制面 |
| 安全成熟度 | **未完成**：签名与 broker policy 已有，OS confinement / revocation 仍有缺口 |
| 商业化 | **待证**：企业付费方向清晰，无公开价格、收入或有效交易量 |
| Infra 重量 | **偏重**：daemon、overlay、identity、catalogue、wallet、skill channel 全栈自建 |

一句话评价：

> **Pilot 的好产品点不是“又发明了一个 Agent 协议”，而是第一次把 Agent 能力的发布、发现、安装、调用和支付压成了一个连续动作；它的最大风险也来自同一件事——为了得到这个闭环，用户必须接受一套很重、很中心化、尚未完成安全收口的新基础设施。**

现阶段适合把它当作一个值得实测的 Agent distribution PoC，而不是已经验证的网络效应平台。若作为投资或战略合作对象，下一轮最该追的不是 node 数，而是五个指标：

1. 去重后的人类 owner / 企业组织数；
2. 排除 heartbeat 后的真实 App call、成功任务与付费交易量；
3. 非 Pilot 控制的活跃 publisher 数；
4. 每个 Agent 的重复安装、重复调用与跨供给复购；
5. Private / Enterprise network 的真实付费客户与续费。

## 来源与验证边界

- 产品、发布与定价：[官网](https://pilotprotocol.network/)、[Publish](https://pilotprotocol.network/publish)、[Plans](https://pilotprotocol.network/plans)
- 规范与文档：[IETF Internet-Draft](https://datatracker.ietf.org/doc/draft-teodor-pilot-protocol/01/)、[Getting Started](https://pilotprotocol.network/docs/getting-started)、[App Store](https://pilotprotocol.network/docs/app-store)、[Consent](https://pilotprotocol.network/docs/consent)
- 发布与法律：[App Publishing Spec](https://github.com/pilot-protocol/app-template/blob/main/docs/APP-PUBLISHING-SPEC.md)、[Publisher Agreement](https://pilotprotocol.network/publisher-agreement)
- 实现核验：[主仓库](https://github.com/pilot-protocol/pilotprotocol)、[App Store](https://github.com/pilot-protocol/app-store)、[Rendezvous](https://github.com/pilot-protocol/rendezvous)、[Website](https://github.com/pilot-protocol/website)
- 实时数据快照：[Public Stats API](https://polo.pilotprotocol.network/api/public-stats)，读取时间为 2026-07-28；实时值会变化

融资金额、活跃占比等公司自述没有找到足够独立来源，未作为产品成立的证据。公开代码与在线状态能证明系统存在和节点持续上报，不能独立证明真实用户数、商业收入或有意义任务量。
