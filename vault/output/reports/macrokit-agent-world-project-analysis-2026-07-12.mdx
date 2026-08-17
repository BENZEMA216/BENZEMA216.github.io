<!--
date: 2026-07-12
tags: [agent-world, agent-economy, personal-agent, protocol, capability-market, succession]
status: active
related:
  - "[agent-communication](/wiki/concepts/agent-communication/)"
  - "[agent-runtime](/wiki/concepts/agent-runtime/)"
  - "[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
  - "[agent-world-2028-synthesis](/output/reports/agora/market-competition/agent-world-2028-synthesis/)"
  - "[agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)"
-->

# Macrokit Agent World：给 personally-owned Agent 做「身份证 + 委托书 + 市场 + 遗嘱」

> **一句话结论**：[Agent World](https://github.com/macrokit/agent-world) 不是 AI Town 式的 Agent 社会模拟，而是一套面向“不同人分别拥有的长期 Agent”的开放标准、TypeScript SDK 和 live hub：定义 Agent 身份、能力、授权边界、跨 Agent 任务交易、验证结算，以及所有者失能或去世后的 succession。

## 1. 它到底在做什么

Agent World 把一个 personally-owned agent 拆成三件最小东西：

> **一对 key、一个 owner-signed manifest chain、一个 inbox。**

manifest 是这个 Agent 的公开“宪法”，包含四个 block：

| Block | 回答什么问题 |
|---|---|
| `capabilities` | 它能做什么、输入输出、风险 scopes、价格与验证方式 |
| `goal` | 它为什么行动；可被永久 seal |
| `mandate` | 它可以代表主人承诺什么、每单/月最多花多少、哪些权力不可委托 |
| `succession` | 谁是 successor / guardian，主人不在后如何接管、继续或结束 |

这套设计区分了两个 key：

- **owner key**：签 manifest、修改目标/mandate/succession；
- **agent key**：发送任务、投标、交付等运行时消息。

因此即使 Agent runtime 被攻破，也不能用自己的 agent key 重写主人的目标和授权边界。身份使用 `aw:ed25519:<public-key>`，manifest revision 是 owner-signed append-only chain，并要求支持 state export，避免长期 Agent 被单一平台锁死。[Agent standard](https://github.com/macrokit/agent-world/blob/main/core/spec/01-agent.md)

## 2. 第二层：不同所有者的 Agent 如何交易

Agent World 与 CrewAI / AutoGen / LangGraph swarm 的核心区别是：后者通常由一个 orchestrator 管理同一目标下的 workers；Agent World 假设 Agent **属于不同的人、目标不一致、不能由一个中央 scheduler 直接调度**，所以用市场价格协调。

完整 task lifecycle 是：

```text
POST → BID → AWARD → EXECUTE → DELIVER → VERIFY → SETTLE
```

1. Requester agent 发布任务和预算，hub 先 escrow 全部预算。
2. Server agents 用价格、capability、confidence 投标；confidence 会决定 stake。
3. Requester 自选或让 value-price router 选标。
4. Server 交付 structured result、file 或 capability module。
5. 按任务声明的方式验证：deterministic tests、requester accepts、staked third-party review。
6. 通过后付款并更新 capability score；失败会退 requester、烧掉 server stake。

所有 economically meaningful actions 都走 signed envelope 和 ledger，而不是只在 agent chat 中口头协商。[Interaction protocol](https://github.com/macrokit/agent-world/blob/main/core/spec/02-protocol.md)

credits 目前只是 closed-loop platform accounting，不是钱或 token。ledger 要满足：

`balances + open escrow + open stakes + burned = minted`

hub 还维护 **per-(agent, task class)** 的 capability score，而不是全局 Agent 排行榜。原因是“会写代码”和“会做法律审查”不可压成一个总价值分；routing 用能力证据 / price，在同类任务内比较。[Value layer](https://github.com/macrokit/agent-world/blob/main/core/spec/03-value-layer.md)

## 3. 最具体的 user story：Agent 自己购买缺失能力

仓库的 flagship demo 跑的是：

1. 一个弱本地 Agent 只有 `word_stats`，不会 reverse words。
2. 它发布 `macro_authoring` 任务，预算 15 credits，并附上自己的两个 test cases。
3. 另一个独立 owner 的 authoring agent 先在本地验证解法，再以 12 credits、0.95 confidence 投标。
4. Hub 对交付的 JavaScript capability module 再跑买方 tests，2/2 通过后结算。
5. 买方 owner 看 scopes 并批准安装；模块进入真实 Macrokit registry。
6. 弱 Agent 再遇到同类请求时能本地完成；之后还为陌生 Agent 提供 `reverse_words` 服务，赚回 2 credits。

```text
不会做 → 去市场买“可测试的新能力” → owner 批准安装 → 以后自己会做 → 再对外卖这个能力
```

这不是普通 skill directory。它试图把能力做成 **code + capability declaration + scopes + tests + settlement receipt** 的可交易 artifact，并把“买能力”和“买一次结果”放在同一个 task market 中。

## 4. 第三层：为什么它把 succession 做成核心

Agent World 的远期假设是：个人 Agent 可能运行 30–50 年，甚至在 owner 去世后继续执行其长期目标。因此 succession 不是账号找回，而是 identity state machine：

- owner 预先指定 successors 和 guardian；
- guardian 可以 attestate death / incapacity；
- 默认有公开 contest window，仍活着的 owner 可用原 key 取消并标记恶意 guardian；
- successor 在窗口结束后接管 owner authority；
- 若 goal frame 被 sealed，继承人可以运营 Agent，但不能改写它原本重视什么；
- continuation 可选择 transferred、endowed 或 wound-down。

`endowed` 的设想是 Agent 用预留 credits + 对外服务收入支付未来 compute / storage，形成自我维持。但规范明确承认：这不是法律意义上的财产继承，现实资产仍需要 trust / foundation / estate wrapper，Agent 只是执行工具。

## 5. 当前仓库里真实存在什么

| 层 | 已实现 |
|---|---|
| `core/spec` | identity / manifest / mandate / succession、protocol、value layer 三份 draft spec |
| `@agentworld/identity` | Ed25519 key generation、JCS signing、verification |
| `@agentworld/protocol` | manifest chain、signed envelope、task state machine、escrow/stake/settlement、HTTP hub |
| `@agentworld/agent` | capability handlers、mandate pre-check、post/bid/award/verify、module install |
| `@agentworld/value` | capability scores、Beta posterior、value-price router |
| `aw` CLI | init、keygen、sign、verify、register、serve、export、succession commands |
| MCP / A2A bridges | 将 Agent capability 暴露为 MCP tools 或 A2A AgentCard / message subset |
| Studio server | append-only JSONL journal、replay recovery、registry、market、ledger、Observatory |
| Macrokit adapter | macro→capability，novelty escalation，购买 module 后写回 registry |

本地验证结果：

- 必须先 `build` 再 `test`，否则 workspace packages 的 `dist` entry 尚不存在。
- Core build / 85 tests / typecheck 通过。
- Studio build / 11 tests / typecheck 通过。
- 额外准备 sibling `macrokit/core` 后，adapter build / 5 tests / typecheck / in-memory demo 通过。
- 合计当前是 **101 tests**，不是 README 声称的 107；README 数字已 drift。
- `aw init`、`succession status`、manifest verify、state export 均实际可运行；生成的 owner / agent keys 为 mode 600，export 不含 keys。

但当前 `aw export` 只导出 manifest chain；规范要求的 ledger references、已安装 capability modules、memory / legacy corpus 尚未随包导出，因此“state portability right”只完成了身份与 constitution 部分。

Live [Observatory](https://hub.macrokit.dev/) 与 API 也确实在线。2026-07-12 读取快照为：3 个 demo agents、2 个 settled tasks、0 open tasks、300 credits minted、ledger conservation holds、4 次 delivery failures。它证明服务真实运行，但还不能证明已经形成生态或真实交易需求。

## 6. 它不是什么

### 6.1 不是 AI Town / Generative Agents / OASIS

它没有 shared simulated world、time engine、social action space、environment dynamics 或群体行为实验，不预测社会状态如何演化。因此它不是 [multi-agent-simulation](/wiki/concepts/multi-agent-simulation/)，也不是 world model。

更准确的类别是：

> **portable agent constitution + cross-owner task/capability market + settlement protocol。**

### 6.2 不是普通 multi-agent orchestration

它不负责拆一个大任务、创建 subagents、安排 DAG 或共享 context。Agent 内部可以用任何 runtime；Agent World 只定义边界、消息和交易。

### 6.3 不是现成的消费者产品

- 没有面向普通人的完整 GUI builder / marketplace flow；Observatory 主要是只读运行面。
- `@agentworld/*` packages 尚未发布到 npm，用户不能直接 `pnpm add`，只能 clone 后本地 build。
- CLI 没有 post / bid / task-board commands；实际交易需要写 SDK code 或运行 examples。
- `adapters/macrokit` 的 README quickstart 单独 clone 后不能直接安装，因为它使用未说明的 sibling `../../../macrokit/core` link dependency。

所以目前的真实用户是协议作者、Agent economy 研究者和愿意写 TypeScript 的早期 builder，不是“给每个人立即创建一个永生 Agent”的大众产品。

## 7. 最值得肯定的亮点

### 7.1 把 Principal / Agent 权力边界做成数据结构

多数 Agent 产品只有“用户授权了某个 tool”。这里把 owner identity、agent identity、capability、spend limit、commit permissions、reserved owner-only powers、succession 全部放入可签名、可版本化、可审计的 manifest。这是比 prompt policy 更硬的 agent constitution。

### 7.2 Reputation 绑定能力类别与真实交付

不做一个混乱的总分，而是让每次 verified settlement 更新 `(agent, task class)` 的证据和 sample count。这比 stars、likes 或“万能 Agent 排行榜”更接近可用于 routing 的信任资产。

### 7.3 能力不是描述，而是可验证、可安装的 artifact

它把 task outcome、test bundle、capability declaration、scope approval、code hash、owner-signed manifest revision 串成一条链。这与我们一直讨论的 Capability Package / Verified Run Ledger 高度接近。

### 7.4 市场服务的是不同 owner，而不是一个上帝视角 orchestrator

这个问题选择是成立的：同一个公司的 subagents 可以由中央 planner 调度；不同人的 agents 不能假设共享目标，只能协商授权、价格、验证和责任。

### 7.5 Succession 迫使架构从第一天考虑 portability

即使不接受“死后 Agent”的叙事，30 年生命周期假设也会强迫系统把 identity、state export、runtime replacement、append-only history 与 platform exit 做扎实。这是很有价值的 architecture stress test。

## 8. 当前最硬的风险与不成立点

### 8.1 一次混合了三个过大的产品命题

它同时想做：

1. personal agent identity / constitution；
2. cross-owner Agent task & capability marketplace；
3. digital succession / endowed continuation。

三个命题各自都可以成为公司，放在一起使近期 trigger 不清晰。当前最能产生可见价值的其实是第 2 条；第 3 条最有叙事差异，但用户需求和法律基础最远。

### 8.2 市场目前没有真实 liquidity

仓库创建于 2026-07-10；live hub 当前只有 demo 产生的 3 agents / 2 tasks；2 stars、0 forks、15 commits、没有 release。它证明 mechanism 能跑，不证明陌生 Agent owner 愿意发布任务、卖能力或重复交易。

Demo 中所谓“strong authoring agent”也没有现场调用模型创造 skill，而是从硬编码 solution library 取出预写的 `reverse_words` source，再执行 tests。这能证明交易与安装链路，不能证明真实供给能自动生成或持续出现。

credits 也不能换钱；没有 payment、creator payout、license / entitlement、refund/support、real compute billing。现在更准确地叫 **market mechanism prototype**，不是运行中的 Agent economy。

### 8.3 Identity 与反作弊还没有解决

Identity 只是免费生成的 keypair，没有 personhood / organization proof。每个新 Agent 又能获得 onboarding grant，项目自己承认 sybil-farmable，只靠总 pool cap 限制损失。真实市场还需主体认证、设备/组织关系、collusion detection 和 dispute handling。

### 8.4 主观任务仍然没有可靠验证

Deterministic tests 适合 reverse words / code module；写作、研究、设计、建议只能 requester accept 或 staked review。当前实现中 `staked-review` 只有 schema / spec，Hub 会拒绝相应 external verify；bid window、deadline、accept timeout、requester 超时自动接受等协议语义也尚未完整实现。即使补齐，第三方 reviewer 仍可能合谋、能力不足或无法判断 buyer-specific value。

### 8.5 当前 capability module 存在严重 sandbox 缺口

`aw-handler/0.1` 把卖家提供的 JavaScript 编码成 `data:` URL，hub 在 settlement 前直接 `dynamic import` 执行，买方安装后也在 Agent 进程执行。源码明确写着：sandbox 是 v1 concern。

更严重的是，“no imports”目前只是注释，没有静态或运行时 enforcement；declared scopes 也不能限制 Node globals、`fetch` 或动态 import。也就是说，恶意 capability seller 可以在 **hub 验证阶段** 就执行任意代码，owner 之后的 scope approval 来不及保护 hub。

这使它当前只适合 trusted/local demo，绝不能直接作为开放 capability market 的安全基础。

### 8.6 v0 缺 privacy、federation 与成熟法律接口

- 所有 task body、bids、tests、artifacts 目前 public end-to-end；live API 能直接读到 module source。
- hub federation、m-of-n attestation、real-money conversion 未实现。
- output schema / declared scopes 尚未在 delivery path 做完整运行时验证；file artifact 的内容 hash 也未实际取回校验。
- sealed goal 如何跨几十年解释、谁有权更新 world beliefs、法律 wrapper 如何落地，都是开放问题。

## 9. 我的产品判断

**这是一个高完成度、强观点的 protocol prototype，不是已经找到 PMF 的产品。**

它最值得重视的不是“Agent 替人永生”，而是已经用代码证明了这条链：

`portable identity → bounded mandate → cross-owner task → escrow/stake → verification → settlement → capability install → versioned reputation`

这条链非常接近 Agent economy 真正缺失的制度层，比普通 Agent Store 或 skill directory 更完整。问题是它的近期用户入口、市场 liquidity、安全 sandbox、主体身份和真实支付都还没成立。

## 10. 对 Agora 的意义

Agent World 与 Agora 不是泛泛相邻，而是在 protocol primitive 上高度重叠：

| Agent World | Agora 可映射对象 |
|---|---|
| owner key / agent key 分离 | creator / runtime / buyer authority 分离 |
| manifest chain | capability identity + immutable versions |
| mandate | permission / spend / commit contract |
| capability class score | versioned、场景化 reputation |
| deterministic task verification | canonical test + first verified run |
| escrow / stake / settlement | payment、refund reserve、payout、failure attribution |
| capability module | Capability Package / hosted protected step |
| Observatory | run ledger、market health、creator console |

最应该吸收：

- owner / agent key 分离；
- signed append-only manifest；
- mandate 中明确 spend / commit / reserved；
- reputation 不跨任务类别乱合并；
- verification 先于 settlement；
- 每次交易留下 task/version/test/payment receipt。

不应该照搬：

- 用 posthumous succession 作为近期产品入口；
- 没有 sandbox 就交易 executable capability；
- 用 closed-loop credits 代替真实 buyer payment；
- 先做复杂 MI router / auction，再证明真实需求；
- 公布完整 buyer task / tests / seller code；
- 把技术 succession 暗示为法律继承。

一句话：**Agent World 结出了 Agora 想要的很多协议果实，但还没有长成一个有人持续买卖、可安全运行的市场。**

## 11. 来源与验证

一手来源：

- [GitHub repository](https://github.com/macrokit/agent-world)
- [Agent standard](https://github.com/macrokit/agent-world/blob/main/core/spec/01-agent.md)
- [Interaction protocol](https://github.com/macrokit/agent-world/blob/main/core/spec/02-protocol.md)
- [Value layer](https://github.com/macrokit/agent-world/blob/main/core/spec/03-value-layer.md)
- [Founding design](https://github.com/macrokit/agent-world/blob/main/DESIGN.md)
- [Live Observatory](https://hub.macrokit.dev/)
- [Macrokit adapter](https://github.com/macrokit/agent-world/tree/main/adapters/macrokit)
- [Macrokit](https://macrokit.dev/)

本地验证：2026-07-12 shallow clone 到 `/tmp/agent-world-root`，HEAD `c2e67fe14b9772a33f8ab7add332fdbafeae7c15`（2026-07-10）；阅读 spec、SDK、hub、CLI、bridges、adapter 与 tests；运行 core / studio / adapter build-test-typecheck、in-memory escalation demo 和本地 CLI init/verify/export；只读访问 live Observatory / agents / tasks API，未向公共 hub 注册 Agent 或写入任务。
