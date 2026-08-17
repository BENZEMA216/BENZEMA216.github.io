<!--
date: 2026-05-11
tags: [agent-distribution, agent-marketplace, billing, authorization, entitlement, mcp, a2a, feishu-ready]
status: supporting
feishu_url: https://www.feishu.cn/docx/E3mldxaLioPiQcxh2xSc1gelnaf
related:
  - "[user-a-use-user-b-agent-product-landscape-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-product-landscape-2026-05/)"
  - "[avm-shared-agent-profile-research](/output/reports/agora/product/avm-shared-agent-profile-research/)"
  - "[agent-capability-distribution-investment-landscape-2026-04](/output/reports/agora/market-competition/agent-capability-distribution-investment-landscape-2026-04/)"
  - "[agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
-->

# 用户 A 使用用户 B 的 Agent：产品图谱、计费与确权深度研究

> Feishu-ready 文档  
> Feishu: https://www.feishu.cn/docx/E3mldxaLioPiQcxh2xSc1gelnaf  
> 日期：2026-05-11  
> 研究问题：有没有产品能让用户 A 直接使用用户 B 的 Agent？如果 B 的 Agent 跑在 B 本地，或跑在 B 拥有全部权限的云端环境，现有产品怎么计费、怎么确权、怎么处理权限边界？

---

## 0. 一句话结论

**类似产品已经出现，但还没有一个成熟的通用产品完整解决 "A 直接调用 B 的本地/BYOC 云端 Agent，并自动完成授权、计费、审计、退款、分账"。**

现有市场只把这个问题拆成了几块局部能力：

- **Poe** 解决了 "B 自己托管 endpoint，A 在平台里使用，并按 message / token / 动态成本计费"。
- **Apify** 解决了 "B 发布一个可运行 automation/agent，A 按 event/result/usage 付费，平台自动分账"。
- **Relevance AI** 解决了 "B 发布 paid Agent/Tool，A 购买后 clone/use，并做 project-scoped entitlement"。
- **Smithery** 解决了 "B 发布 remote/local MCP server，A 的 agent/client 发现和连接"；它的 Uplink 已经很接近本地 Agent tunnel，但公开计费层还弱。
- **Agent.ai** 解决了 "用户把自己的 Agent.ai agents/tools 通过 MCP 暴露给 ChatGPT/Claude/Cursor 使用"，也有 marketplace 和 premium agent pricing，但不是开放 creator payout 型 live-agent market。
- **OpenAI Workspace Agents / Notion Custom Agents / Claude Skills / AWS Agent Registry** 解决的是组织内共享、RBAC、审计和 workspace 计费，不是开放市场。
- **Arcade / Composio / Pipedream / Zapier MCP** 不是 marketplace，但它们解决了最硬的一层：A 的账号授权、OAuth、scope、token lifecycle 和 tool-call audit。

我的判断：

> 真正的空白不是 "Agent Store"，而是 **mode-aware Agent Capability Marketplace**：每个能力明确标注它是 open-local package、hosted protected step、BYOC endpoint，还是 live Agent endpoint；并用 entitlement、delegated auth、event ledger、refund policy 和 payout 统一起来。

---

## 1. 先定义：A 使用 B 的 Agent 到底有几种含义

"A 直接使用 B 的 Agent" 很容易被混成一个问题，但产品上至少有五种不同形态。

| 形态 | A 实际得到什么 | B 保留什么 | 代表产品 | 关键风险 |
|---|---|---|---|---|
| **Remote endpoint** | A 在平台里调用 B 的 API / agent endpoint | B 保留后端代码、模型、infra、数据 | Poe API Bots、Smithery URL MCP server、A2A endpoint | B 可见 A 输入；A 依赖 B uptime；计费需要平台中介 |
| **Local tunnel** | A 或 A 的 client 通过平台 tunnel 调 B 本地服务 | B 的本地资源、browser、SSH key、私有数据库 | Smithery Uplink 类形态 | B 电脑离线即不可用；安全和审计边界弱 |
| **Platform-hosted executable** | A 在平台 runtime 跑 B 发布的 actor/agent | B 交出代码或包，平台托管运行 | Apify Actors、Relevance AI Agents | IP 保护弱；runtime lock-in；用户环境差异小 |
| **Installable package** | A 安装 B 的 skill/profile/template，用 A 的 runtime 和凭据跑 | B 的 know-how 变成可复制 package | Claude Skills、Dify templates、AVM profile | 本地包可被复制；商业化不能靠加密 |
| **Org-shared agent** | A 在同一个 workspace/org 内使用 B 创建的 agent | 权限由组织 admin 管 | OpenAI Workspace Agents、Notion Custom Agents、Claude Team Skills、AWS Agent Registry | A 可能借 B 的 personal connection 行动 |

所以这类产品的核心问题不是 "能不能 share"，而是：

1. **谁运行？** B 本地、B 云端、A 本地、平台云端。
2. **用谁的权限？** A 的账号、B 的账号、平台 service account、临时 delegated token。
3. **谁付钱？** A 付平台、A 付 B、B 付云资源、组织统一付 credits。
4. **谁承担失败？** B 的 agent、A 的 credential、平台 runtime、第三方 API、模型成本。

---

## 2. 产品图谱：最值得看的 11 类产品

### 2.1 Poe：最接近 "B 自托管 Agent，A 平台内调用"

Poe 的 API Bots 允许 B 把自己的 Chat Completions / Responses API compatible endpoint 接进 Poe。A 在 Poe 里给 bot 发消息，Poe proxy 到 B 的 endpoint，再把 response stream 回来。

关键机制：

- B 配置 endpoint base URL、model name、API key 和 pricing。
- Poe 根据 B endpoint 返回的 token usage 和 B 配置的 per-token price 向 A 收 points。
- Server Bots 的 Monetization API 支持 `authorize` / `capture`：先预留预计费用，服务完成后再 capture 实际费用。
- Poe Creator Monetization 允许 bot creator 参与收益。
- API Bots 仍有一些设置要在 poe.com UI 配置，包括 private bot sharing。

计费：

- Poe points 是平台统一消费单位。
- API Bots 可按 token usage 和 B 配置的 pricing 计费。
- Server Bots 可按输入长度、输出长度、计算复杂度等动态计费。
- 对 creator 的意义是：可以把自己的 GPU/API/server cost 折进 per-message 或 dynamic cost。

确权：

- Bot handle / Poe account 代表 creator identity。
- A 的使用权来自 Poe account + points。
- B endpoint 的 API key 配在 Poe 中；B 控制后端。
- 隐私上，第三方 developer bot 可能收到 A 的 chat 内容；Poe 用 privacy shield 提示不同 bot 的数据处理方式。

对我们问题的判断：

**Poe 是目前最贴近 "B 自己运行 Agent，A 直接使用" 的主流产品。** 但它更像 chat/API bot marketplace，不是完整 local worker / long-running agent marketplace；A 的外部账号授权还需要 B 自己实现。

来源：
- https://creator.poe.com/docs/api-bots/overview
- https://creator.poe.com/docs/server-bots/poe-bot-monetization-api-documentation
- https://creator.poe.com/docs/creator-monetization
- https://help.poe.com/hc/en-us/articles/19944206309524-Poe-FAQs
- https://poe.com/pages/privacy-center

### 2.2 Apify：最成熟的 "agent/automation marketplace + 自动计费分账"

Apify 不一定把每个 Actor 都叫 Agent，但它的 Actor Store 是最成熟的 "B 发布可运行自动化能力，A 付费运行" 模型。

关键机制：

- B 发布 Actor 到 Apify Store。
- A 可以在 Apify cloud 运行 Actor，也可以通过 API、MCP、n8n、Make、CrewAI、LangGraph 等集成调用。
- Actor 可做 web scraping、browser automation、data extraction、AI agent workflow。
- Apify 有 automated testing、quality score、issue/support、analytics。

计费：

- Pay per event：B 在代码里触发计费事件，例如处理一页、生成一个结果、调用外部 API。
- Pay per result：A 按产出的 dataset item 付费。
- Pay per usage：A 只付平台资源成本，B 不额外收费。
- Rental 模式正在退场：2026-04-01 后不能发布新 rental Actor，2026-10-01 完全退休。
- Apify 标准抽成 20%。对 PPR/PPE，平台成本从收益中扣除。
- 月度 payout、dashboard、revenue/cost/profit analytics 已经很完整。

确权：

- Actor owner + Store page + README + issue response + quality score 构成 publisher trust。
- A 的 entitlement 来自 paid Actor run / event billing。
- secrets、input schema、run logs、permissions、automated tests 构成运行治理。
- 质量侧，Apify 每天做自动测试；连续失败会 under maintenance，再持续失败会 deprecate。

对我们问题的判断：

**Apify 是计费和分账的最佳参考，不是本地/BYOC Agent 的最佳参考。** 它适合 web automation 和 data agent，但 B 的执行环境主要在 Apify cloud，而不是 B 本地。

来源：
- https://docs.apify.com/platform/actors/publishing/monetize
- https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store
- https://docs.apify.com/platform/actors/publishing/test
- https://docs.apify.com/platform/actors/publishing/quality-score
- https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-store-works

### 2.3 Relevance AI：paid Agent/Tool entitlement 的好样板

Relevance AI Marketplace 支持社区 Builder 发布 Agents 和 Tools，A 可以购买、clone 到自己的 project，然后在 Relevance Chat / workflow 中使用。

关键机制：

- Relevance Builder 当前是 verified / exclusive program，平台审核 listing。
- Paid listing 价格由 creator 设置，最高 $1000。
- 用户购买后可以在 My Purchases 找回。
- 购买绑定到具体 project；不同 project 不一定共享购买权益。
- Creator 可选择 paid listing 是否可 clone 到其他 project，防止用户二次分发。
- A 购买后可修改 Agent/Tool，这说明 IP 保护不是靠 "用户看不到"，而是靠 project-scoped licensing 和平台限制。

计费：

- Creator 可通过 Stripe 收款。
- Relevance 当前不抽 marketplace listing 分成，creator 保留 100% listing price，扣 Stripe 标准处理费。
- 7 天无理由退款；退款后用户失去 access，钱从 creator Stripe account 扣回。
- 用户通常还需要 Relevance AI subscription / credits 来运行 Agent。

确权：

- Builder verification + internal review。
- Purchase tied to project。
- Paid listing clone / copy restriction。
- Marketplace listing approval and version update approval。
- 提交时要求 OAuth/API keys 作为 tool inputs 暴露给用户填写，不要把 secrets 放进 listing。
- Knowledge tables、triggers、snippets、secrets 等不会随 clone 自动复制。

对我们问题的判断：

**Relevance AI 是 "A 购买 B 的 Agent/Tool 能力" 的确权样板。** 它没有解决 B 本地/BYOC live endpoint，但它把 project-scoped entitlement、refund、creator pricing、clone restriction 做得最清楚。

来源：
- https://relevanceai.com/docs/get-started/marketplace/introduction
- https://relevanceai.com/docs/get-started/marketplace/relevance-builders/submit-agents
- https://relevanceai.com/docs/get-started/marketplace/relevance-builders/getting-paid
- https://relevanceai.com/docs/build/agents/share-your-agent

### 2.4 Smithery：remote/local MCP server 的 distribution layer

Smithery 是 MCP registry / gateway / credential layer。它允许 B 发布 MCP server，让 A 的 agent/client 发现和连接。

关键机制：

- URL publishing：B 已经部署了 Streamable HTTP MCP server，可以把 public HTTPS URL 发布到 Smithery。
- Local publishing：B 可以发布 MCPB bundle，用户下载后本地运行 stdio server。
- Server scanning：Smithery 扫描 server metadata、tools、prompts、resources。
- Static server card：如果 auth wall 或扫描失败，可以提供 `/.well-known/mcp/server-card.json`。
- OAuth UI / credential UI：Smithery 可根据 config schema 自动生成 user config/API key 表单。
- Connect API：开发者可以通过 REST API 管理 MCP connections，Smithery 处理 OAuth、token refresh、credential storage。
- Uplink：把本地 MCP server 通过 secure tunnel 暴露为 Smithery connection，不需要部署。

计费：

- 文档明确强调 distribution、analytics、OAuth UI、Connect API。
- 公开文档中没有看到像 Poe/Apify/Relevance 那样成熟的 creator billing / payout 机制。

确权：

- namespace / server page / server card 负责发布身份和元数据。
- connectionId / Smithery API key / OAuth connection 负责调用授权。
- config schema 负责用户提供 API key/preferences。
- Uplink 适合 private/team/dev usage，但如果变成外部 marketplace，需要更强 audit、rate limit、billing、abuse handling。

对我们问题的判断：

**Smithery 是最接近 "B 的 remote/local tool server 被 A 的 agent 发现和调用" 的协议入口。** 它解决 connection，不解决完整 Agent 商业化；如果要做 Agora，Smithery 是 partner/competitor 都需要盯的对象。

来源：
- https://smithery.ai/docs
- https://smithery.ai/docs/build
- https://smithery.ai/docs/build/publish
- https://smithery.ai/docs/use/connect
- https://smithery.ai/docs/use/uplink
- https://smithery.ai/docs/build/session-config

### 2.5 Agent.ai：professional agent marketplace + MCP exposure

Agent.ai 的定位是 professional network / marketplace for AI agents。它的公开信息显示两条线：

1. 用户可以 build/discover/activate agents。
2. 用户可以把自己的 Agent.ai agents/tools 通过 MCP server 暴露给 ChatGPT、Claude、Cursor 等 assistant 使用。

关键机制：

- Agent.ai docs 明确说 MCP Server 可以让 ChatGPT、Claude、Cursor 使用你的 Agent.ai tools、agents 和 actions。
- 推荐 OAuth secure sign-in，不需要手动复制 API token。
- 所有你的 Agent.ai agents/tools 可通过 MCP 自动出现在外部 assistant 中，包括 Team Agents、Private Agents、Public Agents。
- Agent.ai 的 llms.txt 中还有 OpenClaw agent pack：可与个人 OpenClaw instance 通过 OpenAI-compatible API 对话并调用其工具。这是 "个人 agent instance 被平台 agent 调用" 的强信号。

计费：

- Marketplace agents 仍然 free to use。
- Premium agent 可单个 $10/月；Pro $25/月可访问所有 Pro agents。
- Agent.ai credits 是 marketplace currency，但文档明确说没有货币价值，不能买卖或兑换现金，主要用于 usage 和 community rewards。
- 公开文档里没有看到成熟 creator payout / revenue share。

确权：

- Agent.ai account OAuth 负责连接外部 assistants。
- 外部 assistant 使用 tool 时需要用户批准。
- OAuth 2.1 + PKCE、JWT、token refresh、Dynamic Client Registration。
- Private / Team / Public agents 在 MCP server 中都有不同可见性。

对我们问题的判断：

**Agent.ai 很值得看，因为它把 "我的 agent 能被其他 assistant 调用" 做成 MCP surface。** 但它目前更像平台内 premium agents + user-owned MCP gateway，不是 A 购买 B live agent 的开放市场。

来源：
- https://agent.ai/pricing
- https://docs.agent.ai/marketplace-credits
- https://docs.agent.ai/mcp-server
- https://docs.agent.ai/llms.txt

### 2.6 OpenAI Workspace Agents：组织内共享 agent 的权限警示样板

OpenAI Workspace Agents 是 Codex-powered shared agents for teams。它不是开放 marketplace，但它非常准确地暴露了共享 agent 最危险的权限问题。

关键机制：

- Team 可以创建 shared agents，在 ChatGPT 或 Slack 中使用。
- Agent run in cloud，可以 long-running、scheduled、跨工具执行。
- Workspace admins 管理谁能 browse/run/build/publish agents。
- Admins 控制 connected tools / actions。
- Compliance API 提供 agent configuration、updates、runs 的 visibility。
- 敏感步骤可要求 permission approval。

计费：

- Research preview 在 ChatGPT Business、Enterprise、Edu、Teachers plans。
- 2026-05-06 起进入 credit-based pricing。

确权：

- RBAC 控制 agent use/build/publish。
- 最关键一条：如果允许 "agent publishing with personal connections"，其他人使用这个 agent 时，可能通过 builder 的账号访问数据或执行动作。
- OpenAI 明确要求 least privilege、limit audience、avoid sensitive/high-impact connectors、audit configurations。

对我们问题的判断：

**OpenAI Workspace Agents 给出了 B-owned credential sharing 的官方风险定义。** 如果 B 的 Agent 拥有 B 的全部云端权限，A 能不能借这个权限行动必须做成显式、可审计、可撤销的能力，而不是默认行为。

来源：
- https://openai.com/index/introducing-workspace-agents-in-chatgpt/
- https://help.openai.com/en/articles/20001143/
- https://openai.com/academy/workspace-agents/

### 2.7 Notion Custom Agents：workspace credit + inherited access 的强案例

Notion Custom Agents 允许团队构建可分享的 workspace agents，跨 Notion、Slack、Mail 等工具运行 end-to-end workflow。

关键机制：

- Build once, share with workspace。
- Agent 有详细 permissions，控制能访问和编辑什么。
- Enterprise owner 可通过 Agent Directory 修改任何 agent 的 permissions。
- Notion 文档给了一个非常关键的例子：部门负责人可以向 BudgetBot 提问并得到基于 finance team internal docs 的答案，即使他们没有直接访问那些页面。

计费：

- 2026-05-04 起 Custom Agents 使用 Notion credits。
- $10 / 1,000 credits。
- credits 是 Business / Enterprise add-on，workspace shared，monthly reset，不 rollover。
- 如果 credits 不足，Custom Agents pause，不会意外收费。
- dashboard 追踪 credit usage，80% 和 100% 用量时有通知。

确权：

- workspace sharing + page-like permission model。
- Agent permissions 控制 access/edit。
- Admin dashboard 控制 create/run/disable。
- 但如果 agent 可以回答用户本来不能直接访问的页面内容，本质上就是 "通过 agent 暴露 owner/team 权限下的数据"。这是非常值得 Agora 学的边界案例。

对我们问题的判断：

**Notion 证明用户愿意把 agent 当 workspace 资产共享，但它也证明 inherited access 极其敏感。** 对外部 creator marketplace 来说，B-owned knowledge/credential 一旦被 A 间接访问，就必须有 explicit entitlement、visibility、audit 和 revocation。

来源：
- https://www.notion.com/en-gb/blog/introducing-custom-agents
- https://www.notion.com/help/custom-agent-pricing
- https://www.notion.com/en-gb/help/custom-agents-sharing-and-permissions
- https://www.notion.com/en-gb/help/notion-credits-dashboard

### 2.8 Claude Skills / Claude Code plugin marketplaces：installable capability package

Claude Skills 和 Claude Code plugins 更接近 "把能力包安装到 A 的 runtime"。

关键机制：

- Claude custom skills 可作为 ZIP 上传，个人默认私有。
- Team / Enterprise 可 share skill 给 specific people 或 entire organization。
- Shared skills 是 view-only，recipient 可 enable/use 但不能 edit，creator 更新后 recipient 自动获得更新。
- Claude Code plugin marketplaces 可以托管在 GitHub / git / local path，用 `/plugin marketplace add owner/repo` 安装。
- Plugin 可以包含 skills、agents、hooks、MCP servers、LSP servers、monitors。
- Private repos 依赖 GitHub token / repo 权限。

计费：

- 官方没有看到通用 creator monetization。
- 商业化多半要靠外部 SaaS、support、private repo access、hosted protected step。

确权：

- Claude.ai Team/Enterprise skill sharing 由 org owner 开关控制。
- Claude Code marketplace 依赖 Git/GitHub permissions。
- 本地 skill/package 一旦安装，IP 保护很弱；适合 open-local / team-internal，不适合强保护的 paid capability。

对我们问题的判断：

**Claude 是 installable capability 的强信号，但不是 live B-agent 的强信号。** 它验证了 "Skill as package" 的用户理解，但商业化不能建立在本地 skill 加密上。

来源：
- https://support.claude.com/en/articles/12512180-using-skills-in-claude
- https://code.claude.com/docs/en/plugin-marketplaces
- https://code.claude.com/docs/en/discover-plugins
- https://code.claude.com/docs/en/plugins

### 2.9 Dify Creator Center / Template Marketplace：workflow template distribution

Dify 的 Creator Center 和 Template Marketplace 让 creator 发布 workflow templates，用户一键 adopt。

关键机制：

- Creator 上传 workflow export file。
- Template Marketplace 提供 graph view、creator profile、organization profile、Open in Dify。
- Users 一键 adopt 到自己的 Dify 项目，guided setup。
- Marketplace 中 templates 与 plugins/tools 并列。

计费：

- 不是直接卖 agent run。
- 通过 Dify Affiliate Program / PartnerStack，creator 可从 template link 带来的 subscription/payment 中赚 recurring commission，最高 50% recurring commission。

确权：

- Creator Center profile / organization permissions。
- Template adoption 后更像 A 拥有自己的 workflow copy。
- 不是 B live agent endpoint。

对我们问题的判断：

**Dify 是 template distribution，不是 A 调 B Agent。** 但它说明 agent builder 平台会自然长出 creator center 和 template marketplace；这会成为 Agora 的 supply source 或竞争面。

来源：
- https://dify.ai/blog/dify-creator-center-template-marketplace-share-your-workflows
- https://dify.ai/creator-program
- https://marketplace.dify.ai/templates

### 2.10 Hugging Face Spaces：B-owned cloud app/agent 的低层形态

Hugging Face Spaces 不是 agent marketplace，但它是 "B 拥有云端 app，A 访问使用" 的通用形态。

关键机制：

- B 发布 Space，A 访问 web app。
- Space 可以 public/private，可以 duplicate。
- B 可以配置 variables/secrets。
- Secrets 不会随 duplicate 复制。
- Space 可启用 HF OAuth，用户登录后 app 可识别用户，选择 scopes。

计费：

- CPU Basic 免费。
- GPU/CPU upgrade 按小时计费，例如 T4、L4、L40S、A100 等不同硬件价格。
- free hardware 会 sleep；要持续运行需要 paid hardware。
- billing 是 usage-based compute，通常由 Space owner/org 承担。
- 没有内置 agent creator payout / marketplace take rate。

确权：

- repo visibility、HF OAuth、scopes、secrets。
- A 如果 duplicate Space，需要自己配置 secrets/hardware/storage。

对我们问题的判断：

**HF Spaces 是 B-owned hosted agent/app 的基础设施样板，不是 agent 使用权和分账样板。** 如果 B 自建 agent cloud，可以从 Spaces 学 secrets/duplicate/OAuth，但计费要外接。

来源：
- https://huggingface.co/docs/hub/main/spaces-overview
- https://huggingface.co/docs/hub/main/billing
- https://huggingface.co/docs/hub/spaces-oauth

### 2.11 AWS Agent Registry / A2A / AGNTCY：企业 registry 和协议层

AWS Agent Registry、A2A 和 AGNTCY 不一定面向 creator marketplace，但它们定义了长期会成为标准件的 identity/discovery 层。

AWS Agent Registry：
- Bedrock AgentCore 下的 private governed catalog。
- 可以登记 agents、tools、skills、MCP servers、custom resources。
- 支持 search/list/get discovery、approval workflow、human/agent discovery。
- 计费按 records 和 API calls，包含 free tier。

A2A：
- Remote A2A agent 可通过 `/.well-known/agent-card.json` 暴露 Agent Card。
- Agent Card 可来自 well-known URI、central registry/catalog 或 direct configuration。
- 支持 streaming、long-running/background tasks。

AGNTCY：
- Agent、MCP server、MAS 都有 ID。
- ID 关联 ResolverMetadata，包含 cryptographic material 和 assertion methods，用于建立 trust。
- Agent Directory Service 用于存储和发现 agent metadata。

对我们问题的判断：

**这些不是今天的商业产品答案，但它们会成为 "B 的 Agent 可以被 A 或 A 的 Agent 发现/验证/调用" 的底层标准。** Agora 若做 live endpoint，Agent Card / manifest / publisher identity 应该向这些对齐。

来源：
- https://aws.amazon.com/about-aws/whats-new/2026/04/aws-agent-registry-in-agentcore-preview/
- https://aws.amazon.com/bedrock/agentcore/pricing/
- https://learn.microsoft.com/en-us/agent-framework/agents/providers/agent-to-agent
- https://docs.agntcy.org/identity/identifiers/
- https://docs.agntcy.org/dir/overview/

---

## 3. 计费模式：现在市场已经验证了哪些

### 3.1 Per-message / token pricing

代表：Poe API Bots。

适合：
- B 的 agent 主要是对话/API endpoint。
- 成本主要来自 LLM token、GPU inference、API call。
- A 的每次使用边界清晰。

优点：
- 用户理解简单。
- 平台可统一用 points/credits。
- B 的 server cost 可折算进 price。

问题：
- 对 long-running agent 不够自然。
- 很难为 "任务成功" 付费。
- A 可能不理解为什么长上下文/复杂任务突然贵。

### 3.2 Dynamic authorize / capture

代表：Poe Server Bot Monetization API。

适合：
- 任务成本事前可估算、事后可结算。
- 需要避免 B 免费烧资源。
- 多步骤 agent 可能中途失败。

优点：
- 先 reserve，后 charge。
- 可按实际复杂度收费。
- 是 agent event ledger 的雏形。

问题：
- 需要处理 insufficient funds、over-authorize、under-authorize、partial failure。
- 每次 authorize/capture 都可能增加用户摩擦。

### 3.3 Pay per event / result

代表：Apify。

适合：
- web scraping / browser automation / data extraction。
- 可以明确 "生成一条结果"、"处理一个页面"、"开始一个 run"。

优点：
- 比按 token 更贴近业务价值。
- 用户成本可预期。
- 容易做 payout 和 analytics。

问题：
- event 由 B 代码触发，需要防止虚假 event。
- 结果质量争议难处理。
- 失败归因需要更细 event ledger。

### 3.4 Paid listing / project-scoped entitlement

代表：Relevance AI。

适合：
- workflow template、agent config、业务 agent。
- A 买来后要复制/修改/部署到自己的 workspace。

优点：
- 权益边界清晰：绑定 project。
- 适合一次性购买 + 后续 support。
- 可设置 clone restriction。

问题：
- A 能看到和修改 agent，IP 保护弱。
- 很难收每次运行费用，除非 runtime 也归平台。

### 3.5 Workspace credits

代表：OpenAI Workspace Agents、Notion Custom Agents。

适合：
- 企业内部共享 agent。
- Admin 统一购买、统一监控。

优点：
- 组织预算/usage dashboard/credit caps 容易实现。
- 避免每个 creator 单独收款。

问题：
- 不解决开放 creator economy。
- 用户容易抱怨 credits 不透明、不可 rollover、运行成本不可预测。

### 3.6 Affiliate / revenue referral

代表：Dify Creator Program。

适合：
- 模板市场早期。
- 平台想鼓励 creator 带来订阅用户，但不想处理 paid template 商品化。

优点：
- 实现简单。
- 对平台 subscription 增长友好。

问题：
- Creator 不是按能力本身被付费。
- 模板使用和收益之间归因弱。

### 3.7 BYOC / B-pays-hosting

代表：HF Spaces、自建 endpoint、Smithery URL server。

适合：
- B 想保留完整 backend control。
- demo、lead gen、私有工具、早期开发。

优点：
- B 能保护代码和数据。
- A 使用入口简单。

问题：
- B 承担滥用和云成本。
- 需要自己做 rate limit、paywall、quota、refund、support。

---

## 4. 确权：必须拆成三层

这个方向最大的坑是把 "确权" 说成一个词。实际至少有三层。

### 4.1 Publisher ownership：这个 Agent 是谁发布的

要解决：
- Agent 是不是 B 发布的？
- 是不是正版？
- 当前版本是什么？
- 这个 endpoint/package 有没有被篡改？
- 能力声明是否经过测试？

现有产品怎么做：
- Poe：bot handle / creator account。
- Apify：Actor owner、Store page、quality score、automated tests、issues。
- Relevance：verified Builder、internal review、version update review。
- Smithery：namespace、server page、server card、metadata scan。
- OpenAI GPTs：builder profile、verified domain、policy review。
- AGNTCY：ID + ResolverMetadata + cryptographic material。

Agora/AVM 应该做：
- publisher profile + verified domain/GitHub/org。
- package signature。
- versioned manifest。
- canonical tests result。
- runtime compatibility matrix。
- public support boundary。

### 4.2 User entitlement：A 有没有权使用

要解决：
- A 是否购买？
- 能用几次？
- 能在哪个 workspace/project/org 用？
- 可不可以转让、复制、二次分发？
- 退款后 access 如何撤销？

现有产品怎么做：
- Poe：A 用 points 调用 bot。
- Apify：A 运行 paid Actor，按 event/result/usage 付费。
- Relevance：purchase tied to project；My Purchases；refund 后失去 access。
- OpenAI：workspace RBAC 控制 browse/run/build/publish。
- Notion：workspace credits + permissions + pause on insufficient credits。
- Claude：specific people / entire organization sharing；shared skill view-only。

Agora/AVM 应该做：
- entitlement token。
- seat/project/org scope。
- per-call quota / spend cap。
- version pinning。
- refund and revocation。
- transfer / non-transfer policy。
- audit-visible usage history。

### 4.3 Delegated authorization：执行时用谁的权限

这是最关键的层。

要解决：
- Agent 读的是谁的文件？
- 发邮件用谁的邮箱？
- 调 Slack/GitHub/HubSpot 用谁的 OAuth token？
- 如果 B 的 agent 连接了 B 的 CRM，A 能不能借 B 的账号查数据？
- 如果 A 提供自己的 cookie/API key，B 是否能看到？

三种权限模式：

| 权限模式 | 代表 | 好处 | 风险 |
|---|---|---|---|
| **B-owned connection** | OpenAI Workspace Agent personal connections、Notion shared BudgetBot 类案例 | A 零配置，agent 继承 B/team knowledge | A 可能借 B 的权限行动或读数据 |
| **A-owned delegated auth** | GPT Actions OAuth、Arcade、Composio、Pipedream MCP、Zapier MCP | A 自己授权，scope 可控 | OAuth/token lifecycle/tool-call audit 很复杂 |
| **A-local worker** | Claude Code Skills、本地 MCP、AVM profile、browser/cookie agent | A 的 cookie/文件/SSH key 不离开本地 | onboarding 难，always-on 难，B 的 IP 保护弱 |

最健康的默认值：

> A 使用自己的 credential，B 的核心 know-how 作为 hosted protected step，平台记录 entitlement 和 event ledger，高风险 action 需要 approval。

---

## 5. 为什么 "B 本地 Agent 给 A 用" 还没成熟

这是直觉上很诱人的形态，但商业上很难。

### 5.1 在线性问题

B 的本地机器会 sleep、断网、关机、升级、网络变差。A 不会接受 "我买的 Agent 因为 creator 合上电脑不能用"。

Smithery Uplink 证明技术上可以 tunnel local MCP server，但它更适合：

- 开发测试
- 私有/team usage
- 访问某台机器独有资源
- 不想部署的临时工具

如果做成外部 marketplace，就必须补：

- uptime SLA
- heartbeat
- queue/retry
- fallback
- status page
- refund on unavailable

### 5.2 信任问题

A 不知道 B 本地 agent 会不会记录输入、返回恶意内容、泄露数据。平台也难以完整观测本地 runtime。

需要：

- signed binary/package
- reproducible build or sandbox
- limited tool scope
- log redaction
- user-visible data boundary
- abuse reporting

### 5.3 权限问题

B 本地 agent 往往能访问 B 的文件、浏览器、账号、SSH key、wallet。如果 A 可以远程调用它，本质上 A 可能借 B 的身份行动。

这不是 "共享 agent" 的小问题，而是 delegated authority。

最低要求：

- 默认 read-only。
- 默认 no private memory。
- 默认 no B-owned credentials unless explicitly granted。
- 每个 tool call 展示 credential subject：A / B / platform / service account。
- 高风险 action 逐次审批。

### 5.4 计费归因问题

如果一次 run 失败，是谁的问题？

- B 的 agent bug？
- B 的本地机器离线？
- A 的输入不满足要求？
- A 的 credential 无权限？
- 第三方 API 挂了？
- 平台 tunnel 断了？

没有 failure attribution，就无法退款、无法分账、无法 ranking。

---

## 6. 最值得借鉴的组合架构

把现有产品拼起来，一个更合理的架构是：

```text
Central control plane
  - discovery
  - publisher identity
  - entitlement
  - pricing
  - event ledger
  - refund / payout
  - version / tests / reputation

Execution plane
  - A-local worker
  - B-owned BYOC endpoint
  - platform sandbox runtime
  - hosted protected step

Auth plane
  - A-owned OAuth / API key / local resource binding
  - optional B-owned data/credential with explicit scope
  - policy gates
  - approval and revocation
```

这个模型比 "decentralized agent network" 更现实。用户不想维护 server，creator 也不想被复制，平台必须负责 trust、billing 和 event ledger。

---

## 7. Agora / AVM 应该怎么切

### 7.1 不要第一版做 live local-agent marketplace

风险太多：

- B 本地在线性差。
- A/B 权限边界难解释。
- 计费/退款争议多。
- 需要 tunnel、sandbox、rate limit、abuse handling、SLA、log redaction。

### 7.2 推荐三阶段

| 阶段 | 产品形态 | 谁运行 | 怎么计费 | 解决什么 |
|---|---|---|---|---|
| **v0.1 Installable Profile Package** | B 发布 profile/skill package，A 安装 | A local runtime / A cloud | free / subscription / support | 验证能力包分享、安装、resource binding |
| **v0.2 Hosted Protected Step** | package 本地跑，核心步骤调用 B/platform endpoint | A local + B hosted step | per-call / per-event / subscription | 保护 B 的核心 know-how，建立计费和 event ledger |
| **v0.3 Live Agent Endpoint** | A 或 A 的 agent 直接调 B endpoint | B BYOC cloud / platform sandbox | dynamic authorize/capture / usage | 真正 Agent-as-a-service，但边界清楚 |

### 7.3 MVP 最该学的产品

优先研究顺序：

1. **Poe**：学习 self-hosted endpoint + points + dynamic authorize/capture。
2. **Relevance AI**：学习 paid listing、project-scoped entitlement、clone restriction、refund。
3. **Apify**：学习 pay-per-event、quality score、automated testing、payout analytics。
4. **Smithery**：学习 remote/local MCP publishing、Uplink、OAuth UI、server card。
5. **Agent.ai MCP**：学习把个人/团队 agent surface 暴露给 ChatGPT/Claude/Cursor。
6. **OpenAI / Notion**：学习 shared agent 的 RBAC、credit dashboard、personal connection 风险提示。
7. **Arcade / Composio / Pipedream**：学习 A-owned delegated auth，不自建长尾 OAuth。

### 7.4 Agora 应该有的核心对象

```yaml
capability_package:
  id: benzema/repo-review-agent
  publisher: benzema
  version: 0.3.2
  modes:
    - open_local
    - hosted_protected_step
  runtime_compatibility:
    codex: native
    claude_code: compatible
    cursor: partial
  required_bindings:
    - local_repo
    - github_oauth_optional
  credential_subject:
    default: user
    creator_owned: false
  pricing:
    type: per_event
    events:
      review_run: 0.50
      protected_rubric_call: 0.10
  tests:
    smoke: pass
    canonical: pass
  safety:
    filesystem: read_only_by_default
    network: ask
    shell: ask
```

### 7.5 Event ledger 是真正护城河

每次调用都应该记录：

| 字段 | 用途 |
|---|---|
| `run_id` | 一次执行的唯一 ID |
| `caller_user_id` | 谁发起 |
| `package_id` / `version` | 调了哪个能力包 |
| `publisher_id` | 谁应收款 / 承担维护责任 |
| `runtime_subject` | A local / B BYOC / platform sandbox |
| `credential_subject` | A / B / platform / service account |
| `tool_scope` | 使用了哪些权限 |
| `approval_events` | 哪些步骤请求过人类批准 |
| `metering_events` | message/event/result/time/token |
| `cost_basis` | 平台成本、B hosted cost、model cost |
| `run_status` | success / partial / failed / cancelled |
| `failure_attribution` | A credential / B agent / platform / third-party / model |
| `refund_decision` | 是否退款、退多少、谁承担 |
| `payout_split` | creator/platform/connector/provider 分账 |

没有 event ledger，marketplace 就只能做 listing；有 event ledger，才能做 billing、refund、ranking、trust、support、insurance。

---

## 8. 市场空白判断

我会把市场空白写成这样：

> 现有 Agent marketplace 要么只卖 chat bot，要么只卖 workflow template，要么只运行在平台 cloud，要么只服务企业内部。还没有一个产品把 "creator-owned capability"、"user-owned credentials/local context" 和 "platform-owned entitlement/billing/audit" 组合成一个可交易单元。

更直白：

```text
Poe proves self-hosted bot endpoints can be monetized.
Apify proves automation actors can be billed by events/results.
Relevance proves paid agents/tools need project-scoped entitlement.
Smithery proves remote/local MCP servers can be discovered and connected.
OpenAI/Notion prove shared agents need RBAC, credits, approvals, and audit.
Arcade/Composio/Pipedream prove delegated auth is the hard production layer.

But no one has put these together into a cross-runtime capability marketplace.
```

---

## 9. 对产品定位的建议

不要叫：

- Agent Store
- GPT Store for Agents
- decentralized agent network
- MCP marketplace

更准确的定位：

> **Agora is the entitlement, execution, and settlement layer for cross-runtime Agent Capability Packages.**

中文：

> **Agora 是跨 runtime Agent 能力包的授权、执行和结算层。**

如果要更贴近用户价值：

> 让一个专家调好的 Agent 能力，被别人安全安装、调用、付费，并且每一次调用都能说明用谁的权限、跑在哪里、花了多少钱、谁该收钱、失败谁负责。

---

## 10. 资料索引

### 最相关产品

- Poe API Bots: https://creator.poe.com/docs/api-bots/overview
- Poe Server Bot Monetization API: https://creator.poe.com/docs/server-bots/poe-bot-monetization-api-documentation
- Poe Creator Monetization: https://creator.poe.com/docs/creator-monetization
- Poe FAQ / privacy: https://help.poe.com/hc/en-us/articles/19944206309524-Poe-FAQs, https://poe.com/pages/privacy-center
- Apify Actor monetization: https://docs.apify.com/platform/actors/publishing/monetize
- Apify get paid: https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store
- Apify automated testing / quality score: https://docs.apify.com/platform/actors/publishing/test, https://docs.apify.com/platform/actors/publishing/quality-score
- Relevance AI Marketplace: https://relevanceai.com/docs/get-started/marketplace/introduction
- Relevance submit / getting paid: https://relevanceai.com/docs/get-started/marketplace/relevance-builders/submit-agents, https://relevanceai.com/docs/get-started/marketplace/relevance-builders/getting-paid
- Relevance share your agent: https://relevanceai.com/docs/build/agents/share-your-agent
- Smithery docs: https://smithery.ai/docs
- Smithery publish / connect / uplink: https://smithery.ai/docs/build/publish, https://smithery.ai/docs/use/connect, https://smithery.ai/docs/use/uplink
- Agent.ai pricing / credits / MCP server: https://agent.ai/pricing, https://docs.agent.ai/marketplace-credits, https://docs.agent.ai/mcp-server
- Agent.ai llms index: https://docs.agent.ai/llms.txt

### 组织内共享 agent

- OpenAI Workspace Agents: https://openai.com/index/introducing-workspace-agents-in-chatgpt/
- OpenAI Workspace Agents admin controls: https://help.openai.com/en/articles/20001143/
- Notion Custom Agents: https://www.notion.com/en-gb/blog/introducing-custom-agents
- Notion Custom Agent pricing: https://www.notion.com/help/custom-agent-pricing
- Notion Custom Agent sharing and permissions: https://www.notion.com/en-gb/help/custom-agents-sharing-and-permissions
- Claude Skills sharing: https://support.claude.com/en/articles/12512180-using-skills-in-claude
- Claude Code plugin marketplaces: https://code.claude.com/docs/en/plugin-marketplaces
- Dify Creator Center: https://dify.ai/blog/dify-creator-center-template-marketplace-share-your-workflows
- Hugging Face Spaces: https://huggingface.co/docs/hub/main/spaces-overview
- AWS Agent Registry: https://aws.amazon.com/about-aws/whats-new/2026/04/aws-agent-registry-in-agentcore-preview/

### Auth / protocol substrate

- Arcade agent auth: https://docs.arcade.dev/en/get-started/about-arcade
- Composio docs: https://docs.composio.dev/
- Pipedream MCP: https://pipedream.com/docs/connect/mcp/developers/
- Zapier MCP access: https://help.zapier.com/hc/en-us/articles/45150730551693-Manage-access-to-your-MCP-server
- A2A agent card: https://learn.microsoft.com/en-us/agent-framework/agents/providers/agent-to-agent
- AGNTCY identifiers: https://docs.agntcy.org/identity/identifiers/
- AGNTCY directory: https://docs.agntcy.org/dir/overview/
