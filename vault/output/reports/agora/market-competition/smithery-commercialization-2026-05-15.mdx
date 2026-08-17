<!--
status: supporting
status_reviewed: 2026-07-17
evidence_level: product-research
-->

# Smithery 商业化与创作者变现分析（2026-05-15）

> 查询问题：https://smithery.ai 的商业化做得怎么样？平台怎么收费，创作者怎么赚钱？

## 结论

Smithery 目前更像 **MCP registry + gateway / Connect SaaS**，不是完整的 creator marketplace。

它已经把商业化从早期的免费 registry 推到更清晰的基础设施收费：用免费层获取生态供给和开发者心智，再对更高 RPC 调用、更多 namespace、OAuth/credential 管理、persistent connection、SLA/support 收费。这个方向是合理的，但它解决的是 **连接、发现、托管、认证、观测**，不是 **交易、分账、creator payout**。

对创作者而言，Smithery 现在更像分发入口和 MCP 连接层。公开资料里没有看到平台内置的 paid server checkout、creator revenue share、payout dashboard 或 marketplace take rate。创作者要赚钱，主要还是靠自己在 Smithery 之外完成商业化：把 MCP server 接到已有 SaaS/API 订阅、要求用户提供 paid API key、自己做 Stripe/许可校验，或把 Smithery 当成获客渠道导向 enterprise / support / hosted plan。

## 公开牵引力

Smithery 官方文档自称是 "largest open registry for connecting AI agents to the outside world"，并强调既能连接外部工具，也能发布自己的 integration。

截至本次查询，公开 API `https://api.smithery.ai/servers?page=1&pageSize=1` 返回：
- `totalCount`: 5,254 MCP servers
- Top server 示例：`exa`，`useCount`: 38,322

Skills API `https://api.smithery.ai/skills?page=1&pageSize=1` 返回：
- `totalCount`: 132,203 skills
- `smithery-ai/cli` 示例：`uniqueUsers`: 733，`totalActivations`: 847

GitHub 上 `smithery-ai/cli` 约 718 stars、89 forks，README 定位是 "connects your agents to thousands of skills and MCP servers directly from the command line"。

这些信号说明它在 MCP discovery / install 心智上有位置，但不能直接等同于收入规模。Smithery 没有公开 ARR、GMV、creator payout 或付费转化率。

## 平台怎么收费

官网 Pricing 页当前展示三档：

| Plan | 价格 | 配额/能力 |
|---|---:|---|
| Hobby | Free | 50K RPCs/month；3 namespaces；Managed OAuth；Persistent connections |
| Pay as you Go | $10/mo | 100K RPCs/month；100 namespaces；Managed OAuth；Persistent connections |
| Custom | Contact us | Everything in Pay as you Go；custom rate limits；uptime SLA；Slack support |

Pay as you Go 的脚注是：RPCs consume your $10 credits, then $0.10 / 1K。也就是 $10/mo 本质上买 100K RPC credits，之后按 $0.10 / 1K RPC 计费。

这里的核心计费单位不是 "卖一个 MCP server 抽成"，而是 **Smithery Connect / Gateway 的 RPC usage**。它更接近 API gateway / integration infrastructure pricing：谁在通过 Smithery 连接、调用、维护 MCP connection，谁为连接层付费。

## 产品卖点对应的商业化

Smithery docs 把价值集中在几块：

- Registry / distribution：发布后用户能从任何 MCP client 发现并连接 server
- Analytics：追踪 tool calls 和 usage patterns
- Spec compliance：Gateway 处理 MCP protocol compliance、metadata enrichment、caching
- OAuth UI：对需要 user config 或 API key 的 server 自动生成认证 UI
- Connect API：用 REST interface 连接 MCP servers，不用自己实现 MCP、OAuth flows、credential storage、session lifecycle

这解释了为什么它的收费项是 RPC、namespace、OAuth、persistent connections、SLA：它卖的是 **agent 应用接入外部能力的控制面 + 数据面**。

## 创作者怎么赚钱

公开资料下，答案是：**Smithery 本身还没有给创作者一个完整赚钱系统**。

可行路径有三种：

1. **外部 SaaS/API 订阅**
   创作者把 MCP server 作为自己 SaaS 的 agent interface。用户通过 Smithery 发现/安装，但真正付费发生在创作者自己的产品里，例如 API key、team subscription、enterprise contract。

2. **自托管 paid endpoint**
   Smithery 支持已经部署在外部的 URL method。创作者可以把 server 托管在自己基础设施上，在 server 内做 license key、Stripe subscription、quota enforcement，然后把 MCP endpoint 发布到 Smithery。

3. **获客与信任背书**
   Smithery server page、verified namespace、usage analytics 可以帮助创作者获得 visibility，再导向咨询、support、hosted version、企业集成。

目前没有看到的能力：

- 平台内购买某个 MCP server
- creator 设置价格/套餐
- Smithery 托管 checkout
- 平台内 entitlement / license 分发
- usage-based creator payout
- revenue share / take rate 说明
- refund、failure attribution、SLA 与 payout 绑定

所以 Smithery 对创作者的价值更像 "App Store 的 listing + Cloudflare/Zapier-style connection layer"，但还不是 "Shopify/Gumroad/Apify-style merchant backend"。

## 做得怎么样

我的判断：**商业化方向清楚，但 creator economy 还没闭环。**

强项：
- MCP 趋势对它有结构性利好，registry 和 CLI 是自然入口
- 定价已经从模糊 "host registry" 转成可理解的 usage-based infrastructure
- Managed OAuth / credential storage / persistent connections 是真实痛点，尤其对 agent app builder 有价值
- 免费层足够大，有利于维持供给侧和开发者增长

短板：
- 价格很低，短期 revenue ceiling 取决于是否能吃到高调用量 app / team / enterprise
- MCP registry 容易同质化，mcp.so、Glama、PulseMCP、GitHub MCP Registry 都会分流 discovery
- 对 creator 来说没有内置商业后台，Smithery 无法直接回答 "我的 MCP server 如何卖钱"
- 如果调用流量绕过 Smithery，registry 心智不必然转化成 usage revenue

## 对 Agora / Agent Capability Package 的启发

Smithery 验证了一个关键原语：**MCP discovery + connection + OAuth + gateway 是必要层**。

但它也暴露了空白：MCP 解决 "怎么连"，不解决 "怎么卖"。

如果 Agora 要做 Agent 能力包商业化，不能只做 Smithery-style directory。应该补上 Smithery 没做完的 producer / merchant layer：

- capability listing contract
- callable schema + install doctor
- canonical tests / quality claims
- entitlement / license / delegated auth
- event ledger / usage metering
- pricing studio
- payout / refund / failure attribution
- versioning / update channel

一句话：Smithery 是 MCP 连接基础设施，Agora 的机会是把连接后的能力变成可售、可审计、可结算的商品。

## Sources

- Smithery docs introduction: https://smithery.ai/docs
- Smithery publish docs: https://smithery.ai/docs/build
- Smithery Connect docs: https://smithery.ai/docs/use/connect
- Smithery pricing: https://smithery.ai/pricing
- Smithery servers API docs: https://smithery.ai/docs/api-reference/servers/list-all-servers
- Smithery CLI GitHub: https://github.com/smithery-ai/cli
