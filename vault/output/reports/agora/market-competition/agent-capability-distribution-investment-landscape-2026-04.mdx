<!--
date: 2026-04-29
tags: [agent-economy, agent-distribution, investment, marketplace, mcp, skills, agora]
status: supporting
related:
  - "[agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)"
  - "[agent-distribution-atomic-units](/output/reports/agora/market-competition/agent-distribution-atomic-units/)"
  - "[agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/)"
  - "[agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/)"
  - "[agora-financial-model](/output/reports/agora/business-model/agora-financial-model/)"
-->

# Agent 能力分发项目与投资图谱

> Query: "关于 AGENT 的能力分发，找一些项目和产品，特别是基于我们的项目 BP，找这方面的投资项目。"
> 日期：2026-04-29
> 口径：面向 Agora / Agent Capability Package BP 的市场研究和投资项目筛选，不构成财务投资建议。

---

## TL;DR

**结论：Agora 的 BP 方向是成立的，但不能讲成 "Agent marketplace" 或 "MCP marketplace"。市场已经有大量 agent/tool/workflow/connector marketplace，真正空白在更窄也更硬的层：**

> **跨 runtime 的 Agent 能力包发布、安装、权限绑定、测试验证、更新维护、运行归因、计费分账。**

外部市场给出的信号很强：

- Anthropic 已经把 **Skills + MCP** 明确成互补关系：MCP 给 agent 外部系统能力，Skills 教 agent 如何把这些工具用于真实工作；远程 MCP server 是生产 agent 的关键分发形态。来源：[Claude blog, 2026-04-22](https://claude.com/blog/building-agents-that-reach-production-systems-with-mcp)
- OpenAI AgentKit / Agents SDK 正在把 builder、connector registry、eval、sandbox、snapshot/rehydration 做成平台能力。来源：[OpenAI AgentKit](https://openai.com/index/introducing-agentkit/), [Agents SDK update](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)
- AWS 已经发布企业内 **Agent Registry**：私有 catalog + discovery + governance，覆盖 agents、tools、skills、MCP servers 和 custom resources。来源：[AWS Agent Registry preview](https://aws.amazon.com/about-aws/whats-new/2026/04/aws-agent-registry-in-agentcore-preview/)
- Linux Foundation / AAIF / A2A 证明协议层正在标准化：MCP、AGENTS.md、goose、A2A 都进入中立治理。来源：[AAIF](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), [A2A milestone](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year)
- 资金正在投向 agent 构建与编排平台：LangChain $125M Series B、n8n $180M Series C、Gumloop $50M Series B、Dify $30M Series Pre-A、Composio $29M、Arcade.dev $12M、Manufact $6.3M。

**对 Agora 最重要的判断：**

1. **大厂会吃 runtime、connector、workflow builder。** 不要正面做 OpenAI AgentKit / Claude Managed Agents / AWS AgentCore / Dify / n8n。
2. **MCP directory 会快速商品化。** Smithery、Glama、mcp.so、PulseMCP 已经在做 discovery；如果没有测试、权限、计费和运行归因，目录本身价值会薄。
3. **能力包比 MCP server 更像商品。** 最有价值的可交易单位不是 prompt，也不是裸 MCP，而是 `Skill + MCP/tool config + resource schema + tests + runtime adapter + pricing + support boundary + event ledger`。
4. **本地执行是 wedge，不是去中心化叙事。** xhs / 抖音 / 淘宝 / Gmail / Obsidian / code repo 这类 identity-bound execution 必须让用户的账号和文件留在本地，但 discovery、billing、trust、update 应该中心化。
5. **最值得盯的投资项目不是完整 agent app，而是四类基础设施：publisher、auth/action、verification/trust、settlement。**

---

## 1. 基于 BP 的筛选框架

Agora BP 的核心 primitive 是 **Agent Capability Package**。所以筛选项目不能问 "谁在做 AI agent"，而要问：

| 问题 | 为什么重要 |
|---|---|
| 它分发的原子单位是什么？ | prompt、skill、MCP server、workflow、agent app、runtime worker、eval、billing contract 的商业价值完全不同 |
| 它是否跨 runtime？ | 如果只在单一平台内运行，本质是平台功能，不是开放市场 |
| 它是否解决安装和资源绑定？ | Agent 能力迁移失败通常死在 OAuth、API key、cookie、本地路径、权限 scope |
| 它是否有测试和验证？ | 没有 canonical tests，用户无法相信能力包到自己环境仍能工作 |
| 它是否支持更新和兼容维护？ | Agent 能力不是一次性文件，而是会受模型、API、网页、风控、runtime 变化影响的持续服务 |
| 它是否支持计费和归因？ | 多能力包串联时，必须知道谁被调用、哪个版本、哪个步骤失败，才能分账、退款和 ranking |

按这个框架看，市场可以拆成 6 层。

---

## 2. 六层市场图谱

### L0. 模型厂 / 云厂 runtime 与私有 registry

这些不是 Agora 的直接投资标的，但决定边界。

| 项目 | 形态 | 对 Agora 的含义 |
|---|---|---|
| OpenAI AgentKit / Agents SDK | Agent Builder、Connector Registry、ChatKit、Evals、sandbox、snapshot/rehydration | OpenAI 会把 agent build/deploy/eval 内化；第三方机会在跨 runtime 能力迁移和外部 creator ecosystem |
| Anthropic Claude Skills + MCP + Managed Agents | Skill、MCP、云端 agent runtime、memory、credentials、routines | Anthropic 证明 Skills 是能力分发单元，但官方 marketplace / 计费 / 第三方 trust layer 仍不完整 |
| AWS Agent Registry | 企业私有 catalog，覆盖 agents/tools/skills/MCP/custom resources | 大企业会要 registry，但 AWS 做的是组织内治理，不是 creator marketplace |
| A2A / AAIF | agent-to-agent 通信、MCP/AGENTS.md/goose 中立治理 | 协议标准化降低 Agora 跨 runtime 打包的未来成本 |

**判断：** 这些平台越成熟，Agora 越不能做 runtime；但它们越标准化，Agora 越有机会做跨 runtime 能力商品化层。

### L1. MCP directory / registry / marketplace

| 项目 | 现状 | 价值 | 风险 |
|---|---|---|---|
| [Smithery](https://smithery.ai/docs) | 自称最大 open MCP marketplace；支持 find/use/publish MCP servers，提供 managed OAuth/credentials 和 observability | 最接近 "MCP server app store" | 如果停留在目录，会被官方 registry、Cloudflare/AWS、Composio/Pipedream 吃掉 |
| Glama / mcp.so / PulseMCP | MCP server 搜索、分类、榜单 | 证明 discovery 需求存在 | 同质化严重，缺收费、认证、测试 |
| AgentSky | "One MCP. Every agent."，一个 MCP endpoint 内发现、调用、出售 agents/skills/tools，显示 public beta、38 live agents、95% creator payout | 与 Agora "能力包可被主 Agent 调用和计费" 高度同向 | 很早期，供给质量、真实支付、滥用治理、wallet/credit 冷启动待验证 |

**判断：** L1 是最容易被误认为 Agora 的方向，但单纯 registry 不够。Agora 要吸收它的入口形态，而不是把公司做成一个列表网站。

### L2. Tool execution / managed auth / connector layer

| 项目                                                                                                                |                                                      融资/信号 | 价值                                               | 对 Agora 的关系                                           |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------: | ------------------------------------------------ | ----------------------------------------------------- |
| [Composio](https://composio.dev/blog/series-a)                                                                    |                    $29M funding；定位让 agent 的 skills 随执行经验进化 | managed auth、tool router、850+ integrations、执行可靠性 | 强潜在 partner/competitor；它解决 "能调工具"，Agora 解决 "能力如何成为商品" |
| [Arcade.dev](https://blog.arcade.dev/arcade-dev-raises-12m-to-solve-the-biggest-security-challenge-in-ai-agents/) |                 $12M seed；secure authentication for agents | per-user auth、agent tools、OAuth/permission flow  | 对 identity-bound execution 极重要，可作为权限层标杆               |
| [Pipedream MCP](https://mcp.pipedream.com/developers)                                                             | 3,000+ APIs / 10,000+ tools，hosted MCP server，managed auth | 传统 integration 直接升级成 MCP tool surface            | 强大 incumbent；适合合作，不适合正面复制                             |
| Zapier MCP / Agents                                                                                               |                     Zapier 把 automations、agents、MCP 放到同一平台 | 证明普通用户愿意把账号授权给 automation 平台                     | Zapier 的弱点是开放 creator 能力包和本地执行不强                      |
| Workato Enterprise MCP                                                                                            |                                 企业级 composable MCP servers | 大企业安全治理强                                         | 偏 enterprise integration，不是开放市场                       |

**判断：** 这一层会被快速投资。Agora 早期不应自建 3,000 个 connector，而应通过 Pipedream/Composio/Arcade 接入；自身重点放在能力包 manifest、测试、安装诊断和交易关系。

### L3. Agent builder / workflow builder / deployment platform

| 项目 | 融资/信号 | 价值 | 对 Agora 的关系 |
|---|---:|---|---|
| [LangChain](https://www.langchain.com/blog/series-b) | $125M Series B，$1.25B valuation | LangGraph/LangSmith/agent engineering 平台 | 生产 agent 工程化标杆；不是 creator marketplace |
| [n8n](https://blog.n8n.io/series-c/) | $180M Series C，total $240M，$2.5B valuation | AI orchestration + workflow community/templates | 证明 workflow automation 正被 agent 化；但它是 builder + runtime |
| [Gumloop](https://www.gumloop.com/blog/series-b) | $50M Series B by Benchmark | no-code AI automation & agent platform | 投资人押 "每个员工成为 agent builder"；与 Agora 供给侧 creator tooling 相邻 |
| [Dify](https://dify.ai/blog/dify-raises-30m-tomorrow-s-organizations-will-be-built-by-people-and-agents) | $30M Series Pre-A；open-source agentic workflow platform | visual builder + production infra | 中文/全球开源供给强；更像 "build your own"，不是交易别人的能力 |
| [Manufact](https://manufact.com/) | YC S2025，$6.3M seed；mcp-use SDK + Manufact Cloud | MCP apps/servers 从 scaffold 到 deploy、auth、testing、observability | 非常值得盯：它是 Agora publisher tooling 的上游形态 |
| CrewAI Marketplace | enterprise crew templates，一键安装 approved assets，可本地下载 refine | multi-agent template distribution | 模板市场信号好，但偏 CrewAI 平台内 |

**判断：** L3 资金热，估值会高。Agora 不能和这些平台比谁更会建 agent，而要成为这些 builder 产物的 **publisher / distribution / verification / billing** 层。

### L4. Agent / actor / skill marketplace

| 项目                                                                              | 形态                                                                                     | 价值                                                      | 对 Agora 的启发                                                                     |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Apify AI agent marketplace](https://apify.com/ai-agents/ai-agent-marketplace/) | Browse/deploy specialized software agents；developers can build/publish/monetize agents | 最像已有的 "agent actor marketplace"，特别是 web/data automation | Agora 可借鉴 actor listing、usage、review、developer monetization，但不要局限于 web scraping |
| [Relevance AI Marketplace](https://marketplace.relevanceai.com/)                | sales/marketing/ops agent templates，可 clone 到 builder                                  | 证明模板化 agent 在 GTM 场景有需求                                 | 更像 template gallery，付费和跨 runtime 能力弱                                            |
| Claude Skills / anthropics skills marketplace                                   | Skills 可跨 Claude apps、Claude Code、API 使用；Claude Code 可通过 plugins 安装 skills             | "Skill 作为能力模块" 已被模型厂教育市场                                | 官方生态缺第三方付费、测试认证、跨 runtime 安装                                                    |
| ChatGPT GPTs / GPT Store                                                        | 大分发入口但 monetization 弱                                                                  | 反面教材：只有 discovery 和流量不够                                 | BP 不能承诺 "GPT Store 但开放"，必须讲 trust + running + billing                           |
| Coze / 扣子、腾讯元器、百度文心智能体                                                          | 中文区平台型 agent builder/store                                                             | 证明中文区 creator supply 和平台流量存在                            | 平台锁定强，开放 BYOC skill market 仍空                                                   |

**判断：** L4 说明用户可以理解 "买/装一个 agent"。但从 BP 角度，完整 agent app 太重、platform lock-in 太强；能力包要可被主 agent 调用和组合。

### L5. Billing / settlement / agent commerce

| 项目                                                                                                      | 形态                                                                                                           | 价值                                    | 对 Agora 的关系                                                |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ---------------------------------------------------------- |
| [Stripe ACP](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)                  | Stripe + OpenAI 的 Agentic Commerce Protocol；merchant backend build once, distribute to ACP-compatible agents | 人类/agent 发起购买的标准化 checkout            | 支付基础设施会商品化，但 Agora 的多能力包分账和 creator payout 仍需 event ledger |
| [Coinbase x402 + Google AP2](https://www.coinbase.com/developer-platform/discover/launches/google_x402) | agent-to-agent / agent-to-service micropayments，stablecoin settlement                                        | 适合 per-crawl、per-call、microservice 调用 | 技术有用，但直接 crypto marketplace 冷启动很难                          |
| [Skyfire](https://skyfire.xyz/skyfire-launches-identity-and-payments-for-autonomous-ai-agents/)         | identity + payments for autonomous agents，services can onboard agents as customers                           | 把 agent 当 verified customer           | 可作为 Agora 未来 agent-to-agent paid invocation 参照             |
| Paid                                                                                                    | results-based billing for AI agents，TechCrunch reported $21M seed                                            | "按结果收费" 是 agent 时代强需求                 | 更偏 agent vendor billing，不一定是 marketplace                   |

**判断：** 支付协议本身不是 Agora 的壁垒。Agora 应该把支付和分账嵌进 **capability event ledger**：谁调用、哪个版本、哪个 hosted protected step、是否成功、如何退款和分账。

---

## 3. 投资项目优先级

### P0：最贴 BP，值得持续跟踪 / 约访 / 研究

| 项目 | 为什么贴 Agora | 投资/合作判断 |
|---|---|---|
| AgentSky | 最直接做 "agent/skill/tool 通过一个 MCP endpoint 被发现、调用和收费"；是 Agora 多能力包被主 agent 调用的雏形 | 高相关、极早期。重点看真实付费、供给质量、恶意 agent 治理、调用日志和退款机制 |
| Smithery | MCP server discovery / publish / managed OAuth / observability；是 MCP 能力分发入口 | 如果它继续往 trust、certification、billing、runtime compatibility 走，会成为 Agora 直接竞品 |
| Manufact | 从 mcp-use SDK 到 cloud deploy、testing、auth、observability、ChatGPT/Claude marketplace 提交资产；很像 MCP app publisher tooling | 高质量上游标的。Agora 可以学习其 "build once, every surface" 叙事 |
| Arcade.dev | agent auth / permission，是 identity-bound execution 的关键环节 | 更适合 partner；若做 xhs/账号自动化，本地/云端 credential boundary 可借鉴 |
| Composio | tool router + managed auth + execution reliability + shared tool learning | 估值可能不便宜，但与 Agora 的 capability bundle 互补度很高 |

### P1：强市场信号，但不应正面竞争

| 项目 | 信号 | 对 Agora 的动作 |
|---|---|---|
| Pipedream MCP | 3,000+ APIs / 10,000+ tools，managed auth | 作为 connector backend 候选，不自建长尾 integration |
| Apify | actor marketplace 已经有 monetization 和 developer supply | 借鉴 listing、usage、developer payout、review；避开 web scraping 单点 |
| n8n / Dify / Gumloop | agent/workflow builder 获得大额融资 | 这些平台会成为能力包 supply 来源，而不是 Agora 必须替代的对象 |
| LangChain | agent engineering 生产平台 | 作为 eval/trace/observability 思路来源 |
| Browserbase | browser runtime for AI agents | xhs/抖音/网页账号自动化如果要上云，会需要类似 browser execution 层 |
| CrewAI Marketplace / Relevance AI | templates/crew/agent marketplace | 说明模板分发有需求，但还没解决跨 runtime 和持续运行 |

### P2：看起来热，但目前要谨慎

| 类型 | 谨慎原因 | 何时重新看 |
|---|---|---|
| 纯 MCP directory | 很容易变成 SEO/listing，缺测试和结算 | 出现 strong certification、usage analytics、paid install、enterprise policy 时 |
| 纯 agent-to-agent crypto marketplace | wallet 冷启动、任务需求不清、投机噪声大 | 当有真实 agent buyer 每月重复购买服务，而不是 demo 支付 |
| 去中心化本地 agent 网络 | 用户要好用、安全、便宜、在线，不想维护 server | 除非服务的是强技术用户或 regulated/on-prem 场景 |
| 通用 agent store | GPT Store 反例已经说明 discovery 不等于 monetization | 先垂直类目跑出 GMV，再谈通用 store |

---

## 4. 与 Agora BP 的差异化定位

现在市场里已有的东西很多，但它们大多只覆盖能力分发的一部分：

| 已有产品 | 解决了什么 | 没解决什么 |
|---|---|---|
| MCP registry / Smithery / Glama | 找到工具和 server | 能力包的 workflow、测试、付费、支持、跨 runtime install |
| Composio / Pipedream / Arcade | 工具执行、auth、API 可靠性 | 完整 Agent 能力商品化和 creator 经济 |
| n8n / Dify / Gumloop | 用户/团队自己构建 agent workflow | 第三方 creator 发布、用户购买、安装验证、收益分配 |
| Apify | Actor marketplace 和开发者变现 | agent runtime 跨平台、skills/MCP/context/tests 组合包 |
| Stripe ACP / x402 / Skyfire | 支付协议和 agent commerce | 能力包 discovery、质量验证、调用归因、退款 |
| AWS Agent Registry | 企业内部 agent/tool/skill catalog | 开放 creator marketplace 和个人/本地执行场景 |

所以 Agora 最好一句话不是：

> Agent marketplace。

而是：

> **Agora is the publisher, installer, verifier, and settlement layer for cross-runtime Agent Capability Packages.**

中文：

> **Agora 是跨 runtime Agent 能力包的发布、安装、验证和结算层。**

这比 "Shopify for agents" 更准确，因为 Shopify 只解释商家开店，不解释 agent 能力为什么能迁移、验证和运行。

---

## 5. 推荐切入：不要先做大 marketplace

基于现有 BP，最合理的 90 天切入不是通用市场，而是两个候选 wedge：

### Wedge A：Claude Code / Codex / Cursor 的技术能力包

目标用户：
- 已经使用 coding agent 的 engineer、AI founder、agent builder。

首批能力包：
- repo onboarding package
- code review package
- release note / changelog package
- MCP server builder package
- agent security review package
- docs-to-skill converter / GPT-to-skill migrator

优点：
- 用户能理解 runtime、skill、MCP、权限。
- 安装成本可接受。
- eval/canonical tests 更容易定义。
- 购买理由清楚：省时间、降低失败率、提升团队一致性。

风险：
- 市场可能太 developer-heavy。
- Claude / OpenAI / Cursor 官方可能快速吸收。

适合 BP 的叙事：
- 先从最强 AI power users 验证 capability package，再扩展到非技术创作者。

### Wedge B：本地账号执行型创作 / 运营能力包

目标用户：
- 小红书/抖音/淘宝商家、KOL、MCN、代运营、AI 创作者。

首批能力包：
- xhs trend research + content planning
- 小红书笔记结构分析
- 账号评论/私信 semi-auto assistant
- 电商素材生成与发布检查
- 多模态短视频脚本到分镜能力包

优点：
- identity-bound execution 强，平台无法完全云端替代。
- 结果和付费场景清晰。
- 和 BENZEMA 过往多模态创作/即梦/剪映/漫剧经验贴合。

风险：
- 平台风控、cookie 安全、always-on、onboarding 都很难。
- 需要强信任和强售后，早期 COGS 高。

适合 BP 的叙事：
- 证明 "本地私域资源 + 云端能力市场" 的 hybrid execution 价值。

**建议优先级：** 如果目标是融资 BP，Wedge A 更容易让投资人相信技术可行；如果目标是真实付费，Wedge B 更可能验证高频高痛点。

---

## 6. 投资人会问的问题与回答

### Q1：这不就是 Smithery / MCP marketplace 吗？

不是。Smithery 分发的核心是 MCP server；Agora 分发的是完整能力包：

`skill + MCP/tool config + context pack + resource schema + tests + runtime adapter + pricing/support + event ledger`

MCP server 只解决 "能接什么工具"，不解决 "怎样用这些工具稳定完成一类工作"。

### Q2：Composio / Pipedream 已经做了工具和 auth，Agora 还有什么？

Composio / Pipedream 是 execution layer。Agora 可以用它们，但用户购买的不是 "Gmail API 能被调用"，而是 "某个创作者调好的 Gmail outbound workflow 能在我的账号上安全跑起来，并持续更新"。

### Q3：Dify / n8n / Gumloop 都能做 agent，为什么还需要 Agora？

它们让用户自己 build。Agora 让用户购买别人已经验证过的能力。类比：

- Dify/n8n/Gumloop = IDE / workflow builder
- Agora = package registry + app store + certification + billing + install doctor

### Q4：能力包本地运行会被复制，怎么防盗版？

不要承诺强 DRM。按现有 BP，商业模式应拆为：

- open-local package：卖更新、支持、认证、团队 license
- hosted-protected capability：关键 IP 通过托管 step 调用
- managed runtime package：企业/下沉市场用私有 registry 或托管 runtime

护城河不是加密文件，而是持续可运行性、兼容矩阵、测试、信誉、分发和结算。

### Q5：为什么大厂不直接做？

大厂会做自己的 runtime 和私有 registry。它们天然不愿意做跨 runtime creator sovereignty：

- OpenAI 希望能力留在 OpenAI。
- Anthropic 希望 Skills / MCP 强化 Claude。
- AWS 希望企业资源进 AgentCore。

Agora 的机会在中立层：Claude Code、Codex、Cursor、Dify、n8n、Agent-VM、MCP server、local worker 都能消费同一类能力包。

---

## 7. 具体项目清单

### 直接相关项目

| 项目 | 层级 | 融资/状态 | BP 相关性 | 建议动作 |
|---|---|---:|---|---|
| AgentSky | A2A / marketplace | Public beta，38 agents | 极高：一个 MCP endpoint 调用/出售 agents | 约访/持续跟踪，验证真实交易 |
| Smithery | MCP marketplace | 未确认融资 | 高：MCP discovery + publish + OAuth | 跟踪其是否加 billing/certification |
| Manufact | MCP publisher infra | $6.3M seed | 高：SDK + deploy + test + marketplace submission | 深研产品和 SDK，作为 publisher tooling benchmark |
| Composio | Tool execution/auth | $29M funding | 高：工具执行和 shared learning | 作为 partner/competitor 框架 |
| Arcade.dev | Agent auth | $12M seed | 高：secure auth for agents | 深研权限模型 |
| Pipedream MCP | Hosted MCP action layer | 成熟公司 | 中高：可作为 connector backend | 集成优先于竞争 |
| Apify | Actor marketplace | 成熟 marketplace | 中高：developer monetization precedent | 借鉴 marketplace 运营 |
| Dify | Agent workflow builder | $30M Pre-A | 中：supply-side builder | 观察 template/marketplace 演进 |
| n8n | AI orchestration | $180M Series C | 中：workflow community | 学习社区 + template supply |
| Gumloop | No-code agents | $50M Series B | 中：non-technical builders | 观察企业内部 agent builder |
| LangChain | Agent engineering platform | $125M Series B | 中：eval/trace/production | 学习可靠性叙事 |
| Browserbase | Browser runtime | $40M Series B reported | 中：web/local execution | xhs/网页任务云端执行候选 |
| Skyfire | Agent identity/payments | Public launch | 中：agent-as-customer | 观察 agent-to-agent paid services |
| Stripe ACP / x402 | Payment protocols | 大厂协议 | 中：settlement rails | 使用而非自建 |

### 中文区项目 / 平台

| 项目 | 形态 | 判断 |
|---|---|---|
| Coze / 扣子 | 字节平台型 agent builder/store | 强分发入口，但平台锁定；中文区开放能力包市场仍空 |
| 腾讯元器 | 智能体/插件/工作流商店，Multi-Agent 模式 | 腾讯生态内有分发，但不是跨 runtime |
| 百度文心智能体 | 智能体平台，曾强调有分发、有钱赚 | 更像搜索/百度生态流量分发 |
| ModelScope / AgentScope | 模型/Agent 开源社区与多 agent 框架 | 开源生态强，可作为供给侧来源 |
| Dify | 华语背景开源 agentic workflow 平台 | 可能成为中文区 agent workflow 标准之一 |

**中文区机会判断：** 大厂都在做平台内智能体商店，但 **"Claude Code / Codex / Cursor / 本地 worker + 中文账号场景 + 付费能力包"** 仍然几乎空白。

---

## 8. 最值得加入 BP 的市场证据

可以直接放进 BP 或 investor memo 的证据：

1. **Anthropic 明确说 MCP 与 Skills 互补。** 这验证能力包不是裸工具，而是工具 + procedural knowledge 的组合。
2. **OpenAI AgentKit 有 Connector Registry、Evals、Agent Builder。** 这验证 agent 生产化需要 registry、versioning、eval，而不仅是 prompt。
3. **AWS Agent Registry 覆盖 agents/tools/skills/MCP/custom resources。** 这验证 "agent capability catalog" 是企业真实需求。
4. **Composio / Pipedream / Arcade 都在补 MCP 没解决的 auth/execution gap。** 这验证协议之上还需要生产基础设施。
5. **Dify / Gumloop / n8n / LangChain 的融资证明 agent builder 与 orchestration 是热层。** 但它们越热，越会产生可被 Agora 发布和交易的能力供给。
6. **Apify 证明 "developer-created automation actors can be monetized"。** Agora 可以把这个模式从 web actors 扩到 agent capability packages。
7. **Stripe ACP / x402 / Skyfire 证明 agent commerce 会需要标准化交易和身份。** Agora 不需要发明支付协议，但必须有 event ledger 和 creator settlement。

---

## 9. 推荐后续研究任务

### 1. 做一张 "Agora vs 竞品" BP 图

横轴：分发单元。

- MCP server
- workflow template
- agent app
- runtime registry
- capability package

纵轴：商业化能力。

- discovery
- install
- auth/resource binding
- verification
- update/support
- billing/settlement
- event ledger

这张图会清楚显示 Agora 不在 "agent store" 红海里，而在 "capability package commercialization" 空白处。

### 2. 约访 / 产品试用优先级

1. AgentSky：注册、调用、上架一个 endpoint，测试是否真能收 credit。
2. Smithery：发布一个 MCP server，检查 OAuth、analytics、observability。
3. Manufact：用 mcp-use scaffold 一个 MCP App，评估测试/部署/marketplace submission。
4. Arcade / Composio / Pipedream：比较 auth/resource binding、tool execution logs。
5. Apify：研究 actor monetization、listing、ranking、review、developer payout。

### 3. BP 加强点

- 补一页 "Why now": Skills/MCP/A2A/AgentKit/AWS Registry 同时成熟。
- 补一页 "What others solve / what remains": registry、auth、builder、runtime、payments 各自只解决一段。
- 补一页 "Wedge": developer capability packages 或 identity-bound local execution，二选一讲清楚。
- 补一页 "Trust moat": canonical tests、compatibility matrix、install doctor、permission scanner、event ledger、creator reputation。

---

## 10. 中美 VC 已投标的

### 10.1 美国 VC：投得很积极，但多数在相邻层

美国 VC 已经在 agent capability distribution 的上游和侧翼下注很多，但真正等同于 Agora 的 "capability package marketplace" 仍少。

| VC / 投资方 | 已投标的 | 轮次 / 金额 | 对 Agora 的含义 |
|---|---|---:|---|
| IVP、CapitalG、Sapphire | LangChain | $125M Series B，$1.25B valuation | agent engineering / LangGraph / LangSmith 成为生产基础设施；Agora 不应做 builder，而应分发 builder 产物 |
| Accel、Meritech、Insight、Sequoia、Highland Europe | n8n | $180M Series C，$2.5B valuation | workflow automation 正被 agent 化；template / workflow community 是能力包供给侧 |
| Benchmark、Index、Nexus、First Round、Shopify Ventures、Bessemer 等 | Gumloop | $50M Series B | no-code AI agent builder 被重仓；说明 "每个员工搭 agent" 是资本共识 |
| Lightspeed | Composio | $29M total funding / Series A | tool execution + managed auth + integrations 是 agent 能力商品化的底层 rails |
| Laude Ventures 等 | Arcade.dev | $12M seed | agent auth / permission 是 identity-bound execution 的关键标的 |
| Peak XV、Y Combinator、Remus、TQ Ventures、SV Angel 等 | Manufact | $6.3M seed | MCP publisher tooling 很贴 Agora 上游：scaffold、deploy、auth、test、marketplace submission |
| Notable Capital、CRV、Kleiner Perkins 等 | Browserbase | $40M Series B reported | browser runtime 是 xhs/抖音/网页任务上云执行的基础设施候选 |
| Lightspeed 等 | Paid | $21M seed | results-based billing for AI agents，说明 agent vendor/creator 的计费问题被资本关注 |
| Benchmark | Manus / Butterfly Effect | reported $75M round | 不是能力分发，而是通用 agent app；说明资本愿意押 agent-native 产品入口 |

**判断：** 美国 VC 的共识不是 "agent store" 本身，而是把 agent 生产化所需的 rails 拆开投资：builder、workflow、auth、tool execution、browser runtime、billing、observability。Agora 如果融资，需要把自己放在这些 rails 的交汇点：**把 builder 产出的能力变成可安装、可验证、可计费商品。**

### 10.2 中国 / 华人 VC：更多投 workflow builder、Agent OS 和应用入口

中国方向更少看到纯 Agent capability marketplace 融资，主要是三类：开源 workflow builder、Agent OS / 通用 agent app、平台内智能体生态。

| VC / 投资方 | 已投标的 | 轮次 / 金额 | 对 Agora 的含义 |
|---|---|---:|---|
| HSG / 红杉中国、GL Ventures / 高瓴创投、5Y Capital / 五源资本、Mizuho Leaguer、Alt-Alpha 等 | Dify / LangGenius | $30M Series Pre-A | 最贴中文区 agent workflow builder；未来可成为能力包供给来源，也可能自己做 marketplace |
| HSG / 红杉中国、Tencent / 腾讯、ZhenFund / 真格等；Benchmark later led round | Manus / Butterfly Effect | reported $75M round by Benchmark | 中国团队做出的 agent-native app 被中美资本同时追；但它是应用入口，不是开放能力分发层 |
| Vertex Ventures、Sequoia China Seed Fund / 红杉中国种子、LongRiver / 江远等 | Flowith | seed funding reported | "Agent OS / Action OS / agent canvas" 方向，偏用户工作台与 workflow orchestration |
| ByteDance | Coze / 扣子 | 内部孵化，不是 VC 标的 | 平台内智能体商店会教育市场，但开放跨 runtime marketplace 仍空 |
| Tencent | 腾讯元器 | 内部产品，不是 VC 标的 | 微信/QQ 分发强，但平台锁定强 |
| Baidu | 文心智能体 | 内部产品，不是 VC 标的 | 搜索/百度生态内分发，不是中立市场 |

**判断：** 中国 VC 还没有明显把 "Agent 能力包分发 / creator monetization / cross-runtime settlement" 当成独立赛道来投。现在投得最多的是 **agent builder / agent app / Agent OS**。这对 Agora 反而是窗口：中文区如果要讲差异化，应强调 "大厂智能体商店是平台内分发，Agora 做 Claude Code / Codex / Cursor / 本地 worker 可消费的开放能力包市场"。

### 10.3 最像 Agora 的可投标的排序

如果把 "投资标的" 按 Agora BP 相关性排序：

| 优先级 | 标的 | 国家/区域 | 为什么像 |
|---|---|---|---|
| P0 | AgentSky | US/Global | 一个 MCP endpoint 里发现、调用、出售 agents/skills/tools，最接近 capability invocation marketplace |
| P0 | Smithery | US/Global | MCP discovery/publish/OAuth/observability，若加 billing + tests 会逼近 Agora |
| P0 | Manufact | US/India network | MCP publisher tooling，上游能力打包和发布工具 |
| P0 | Composio | US/India network | tool execution + managed auth + integrations，是能力包运行底座 |
| P0 | Arcade.dev | US | agent auth / permission，解决本地账号和用户授权边界 |
| P1 | Dify | 中国/全球 | agent workflow builder，可产生供给，但不是 marketplace 本身 |
| P1 | n8n / Gumloop | US/EU | workflow/automation builder，可产生供给和模板市场 |
| P1 | Apify | EU/US-facing | actor marketplace 和开发者变现标杆 |
| P1 | Browserbase | US | browser execution layer，适合本地账号/网页 agent 的 runtime |

**一句话：** 中美 VC 都在投 "Agent 能力生产与运行的零件"，但还没有形成一个清晰的 "Agent Capability Package marketplace" 类别。这是 Agora BP 可以争取定义的 category。

---

## Sources

- Anthropic / Claude: [Building agents that reach production systems with MCP](https://claude.com/blog/building-agents-that-reach-production-systems-with-mcp), [Claude Skills](https://www.anthropic.com/news/skills?t=n)
- OpenAI: [Introducing AgentKit](https://openai.com/index/introducing-agentkit/), [The next evolution of the Agents SDK](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)
- Linux Foundation: [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), [A2A one-year milestone](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year)
- AWS: [Agent Registry preview](https://aws.amazon.com/about-aws/whats-new/2026/04/aws-agent-registry-in-agentcore-preview/)
- Composio: [$29M funding announcement](https://composio.dev/blog/series-a), [Tool calling guide](https://composio.dev/blog/ai-agent-tool-calling-guide)
- Arcade.dev: [$12M seed announcement](https://blog.arcade.dev/arcade-dev-raises-12m-to-solve-the-biggest-security-challenge-in-ai-agents/)
- Pipedream: [Pipedream MCP for developers](https://mcp.pipedream.com/developers)
- n8n: [$180M Series C](https://blog.n8n.io/series-c/)
- Gumloop: [$50M Series B](https://www.gumloop.com/blog/series-b)
- Dify: [$30M Series Pre-A](https://dify.ai/blog/dify-raises-30m-tomorrow-s-organizations-will-be-built-by-people-and-agents)
- LangChain: [$125M Series B](https://www.langchain.com/blog/series-b)
- Manufact: [product site](https://manufact.com/), [VentureBeat funding report](https://venturebeat.com/infrastructure/manufact-raises-usd6-3m-as-mcp-becomes-the-usb-c-for-ai-powering-chatgpt-and)
- Browserbase: [Director launch and $40M Series B report](https://finance.yahoo.com/news/browserbase-launches-director-automate-everyone-150000541.html)
- Smithery: [docs](https://smithery.ai/docs)
- AgentSky: [product site](https://www.agentsky.co/)
- Apify: [AI agent marketplace](https://apify.com/ai-agents/ai-agent-marketplace/)
- Relevance AI: [agent marketplace](https://marketplace.relevanceai.com/)
- Stripe: [Agentic Commerce Protocol](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)
- Coinbase: [Google AP2 + x402](https://www.coinbase.com/developer-platform/discover/launches/google_x402)
- Skyfire: [identity and payments for autonomous AI agents](https://skyfire.xyz/skyfire-launches-identity-and-payments-for-autonomous-ai-agents/)
- Paid: [TechCrunch seed funding report](https://techcrunch.com/2025/09/28/paid-the-ai-agent-results-based-billing-startup-from-manny-medina-raises-huge-21m-seed/)
- 中文区： [扣子平台升级介绍](https://developer.volcengine.com/articles/7540134532457562155), [腾讯元器产品更新](https://yuanqi.tencent.com/changelog/product-changelog)
- Manus / Butterfly Effect: [TechCrunch funding report](https://techcrunch.com/2025/04/25/chinas-manus-reportedly-reached-500m-valuation-with-benchmark-led-funding/)
- Flowith: [Tech in Asia coverage](https://www.techinasia.com/news/flowith-completes-seed-funding-for-autonomous-ai-agents)
- Research: [Agent Skills paper](https://arxiv.org/abs/2602.12430), [Bridging Protocol and Production](https://arxiv.org/abs/2603.13417), [Evidence from 177,000 MCP tools](https://arxiv.org/abs/2603.23802)
