<!--
date: 2026-05-11
tags: [agent-distribution, agent-marketplace, billing, authorization, agent-capability-package, mcp, a2a]
status: supporting
related:
  - "[avm-shared-agent-profile-research](/output/reports/agora/product/avm-shared-agent-profile-research/)"
  - "[agent-capability-distribution-investment-landscape-2026-04](/output/reports/agora/market-competition/agent-capability-distribution-investment-landscape-2026-04/)"
  - "[agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
-->

# 用户 A 使用用户 B 的 Agent：产品形态、计费与确权

> Query: "我在找一些产品，这类产品能让用户 A 直接使用用户 B 的 Agent。这个用户 B 的 Agent 可能运行在用户 B 本地的环境，或者运行在用户 B 拥有全部权限的云端环境。我想找找看有没有类似的产品，以及它们的计费和确权是怎么做的？"
> 日期：2026-05-11

---

## TL;DR

**有类似产品，但真正满足 "A 直接调用 B 自己环境里的 Agent" 的成熟产品很少。市场现在分成三类：**

1. **B 自托管 endpoint，A 在平台里调用**：最贴近的是 Poe API Bots / Server Bots 和 Smithery 的 URL MCP server。B 可以把自己的 endpoint 接进平台，A 从 Poe 或 MCP client 里用。
2. **B 发布可运行资产，A 在平台 runtime 里运行或 clone**：Apify、Relevance AI、Dify、Claude Skills / plugin marketplace、GPT Store、HF Spaces 都是这个方向。计费和权限清晰一些，但不是 "B 本地 Agent 被 A 远程调用"。
3. **企业内共享 agent / registry**：OpenAI Workspace Agents、AWS Agent Registry、Claude Team/Enterprise Skills。这些解决组织内共享、RBAC、审计、审批，但不是开放 creator marketplace。

**最重要的产品判断：**

> 今天还没有一个强成熟的 "个人/creator 把本地或自有云 Agent 安全开放给外部用户调用，并自动完成计费、授权、审计、退款、分账" 的通用产品。

相邻产品已经把原语拼出来了：

- Poe 证明了 **B 的自有 endpoint + 平台内消费 + per-message 计费**。
- Apify 证明了 **developer 发布 automation/agent + 用户按事件/结果/资源付费 + 平台分账**。
- Relevance AI 证明了 **paid agent/tool listing + project-scoped entitlement + clone restriction**。
- Smithery 证明了 **B 已有 MCP server 可以被发现、连接和安装**。
- OpenAI Workspace Agents / AWS Agent Registry 证明了 **组织内共享 agent 必须带 RBAC、审批、审计和 admin visibility**。
- Arcade / Composio / Pipedream / Zapier MCP 证明了 **真正难点不是 chat，而是 A 的账号授权、scope、token lifecycle 和 tool-call 审计**。

对 Agora / AVM 的含义：机会不是再做一个 agent store，而是做 **mode-aware capability marketplace**：明确每个能力包是 open-local、hosted-protected，还是 live-agent endpoint，并用 event ledger 绑定 entitlement、计费、调用归因和退款。

---

## 1. 关键产品图谱

| 产品 | A 如何使用 B 的 Agent | B 的运行位置 | 计费 | 确权 / 权限 | 相关性 |
|---|---|---|---|---|---|
| **Poe API Bots / Server Bots** | A 在 Poe 里给 B 的 bot 发消息；Poe proxy 到 B 配置的 endpoint | B 自有 API / 云端 endpoint | Poe points；creator 可设 per-message price；Server Bot 可用 authorize/capture 做动态计费 | Poe 负责用户账户、bot handle、points；第三方 bot 可收到 chat 内容；B endpoint 的 API key 配在 Poe；外部账号权限需 B 自己实现 | **最高**：最像 "A 用 B 自托管 Agent" |
| **Apify Store / AI Agents** | A 从 Store 运行 B 发布的 Actor / AI agent，也可通过 API/MCP 调用 | Apify containerized cloud runtime | Pay-per-event、pay-per-result、pay-per-usage；Apify 抽 20%，平台成本从收益扣除；rental 2026-10-01 退场 | Apify 账号、Actor 页面、input schema、secrets、run logs、quality score；事件由 B 代码触发并计费 | **高**：成熟 marketplace + 自动分账，但 B 不在本地跑 |
| **Relevance AI Marketplace** | A 购买或 clone B 的 Agent/Tool 到自己的 project，再在 Relevance Chat 使用 | Relevance 平台 project/runtime | listing 价格由 creator 决定；7 天退款；购买绑定 project | My Purchases、project-scoped entitlement、RBAC；paid listing 可禁用 Copy to Project 防止二次分发 | **高**：最清晰的 paid agent/tool entitlement 模型 |
| **Smithery** | A 从任意 MCP client 连接 B 发布的 MCP server | B 可用 URL method 连接已部署 server；也可发布本地 stdio server bundle | 文档强调 distribution/analytics/OAuth UI，未看到成熟内置 creator billing | MCP server page、analytics、OAuth UI、user config/API key；B 的 server 自己做访问控制 | **高**：很贴近 "B 自有 server 被 A 调用"，但计费弱 |
| **OpenAI Workspace Agents** | A 在同一 workspace / Slack 里使用 B 创建并发布的 shared agent | OpenAI Codex cloud | 2026-05-06 起 credit-based pricing；限 Business/Enterprise/Edu/Teachers research preview | RBAC 控制 browse/build/share/publish；admin 控制 tools/actions；可要求敏感步骤审批；publish with personal connections 有明显风险 | **中高**：组织内强模型，不是开放 marketplace |
| **ChatGPT GPTs / GPT Store** | A 使用 B 发布的 GPT；Actions 可调用 B 的 API | OpenAI runtime；Actions 可连外部 API | 当前更像 ChatGPT plan/credits，公开 creator monetization 不如 Poe/Apify 清晰 | Builder profile、policy review、privacy policy；Actions 支持 none/API key/OAuth，OAuth 用 A 的账号授权 | **中**：分享成熟，商业化弱 |
| **Claude Skills / Claude Code plugin marketplace** | A 安装或启用 B 的 Skill / plugin；Team/Enterprise 可组织内分享 | A 自己的 Claude / Claude Code runtime；API 技能在 Claude container 中跑 | 无公开通用 creator billing；依赖 Claude 订阅/API | 个人 skill 默认私有；Team/Enterprise owner 可开启 org sharing；Claude Code marketplace 依赖 GitHub/私有 repo 权限 | **中**：更像 installable capability package |
| **Dify Template Marketplace** | A 一键 adopt B 的 workflow template 到自己的 Dify 项目 | A 的 Dify Cloud/self-host project | 通过 PartnerStack affiliate 带来订阅佣金，不是直接按 agent 使用付费 | Creator Center、organization permissions、模板预览、一键 adopt | **中低**：template distribution，不是 live B-agent |
| **Hugging Face Spaces** | A 访问 B 的 Space app/agent | B/HF 拥有的 Space cloud runtime | 通常 B 或 org 付 compute；按 GPU/CPU 小时、usage threshold 计费；非原生 agent marketplace 分账 | public/private Space、HF OAuth、scopes、secrets；secrets 不随 duplicate 复制 | **中低**：B 自有云 app 成立，商业化需外接 |
| **AWS Agent Registry** | 组织内 A 或 A 的 agent 搜索并使用 B 发布的 agents/tools/skills/MCP resources | 企业 AWS / Bedrock AgentCore 环境 | Registry 按 records 和 Search/List/Get API calls 计费，有 free tier | 私有 catalog、approval workflow、IAM/组织治理、human/agent discovery | **中低**：enterprise governance，不是开放市场 |

---

## 2. 计费模式拆解

### A. Platform credits / points

代表：Poe、OpenAI Workspace Agents。

特点：
- A 不直接理解 B 的 infra cost，而是消耗平台 points / credits。
- B 可以设置每条消息价格，或让平台根据 token / response cost 计价。
- 对 B 自托管 endpoint 友好，因为 B 能把自己的 GPU/API/server cost 折进 per-message price。

适合：
- chat / inference / API bot
- 成本随输入输出复杂度变化的 agent
- B 不想自己做支付和账单

风险：
- 平台控制用户入口和价格单位。
- A 对实际成本构成不透明。
- 如果 B 的 endpoint 很贵，价格需要足以覆盖 server cost，否则 creator 会亏。

### B. Pay per event / result / usage

代表：Apify。

特点：
- B 在代码里定义计费事件，例如 started run、processed page、external API call、generated result。
- A 按事件、结果或平台资源付费。
- 平台处理 billing、payout、analytics、退款/争议基础设施。

适合：
- scraping、browser automation、data extraction
- agent 执行链路中可清晰计数的步骤
- "一次任务产生 N 条结果" 的工作流

风险：
- event 定义由 B 代码触发，需要防刷、防虚假事件、防结果质量争议。
- 如果事件价格不能覆盖资源成本，会侵蚀 B 收益。

### C. Paid listing / project entitlement

代表：Relevance AI。

特点：
- A 购买某个 Agent/Tool listing。
- 购买权益绑定到 A 的某个 project，而不是全账号无限复制。
- creator 可限制是否允许 clone / copy to other projects。

适合：
- workflow template
- business agent / sales agent / ops agent
- 用户会二次定制的 agent

风险：
- 一旦 clone 到 A 的项目，prompt / workflow 可能被查看和修改。
- 保护 IP 主要靠 license、project entitlement 和禁复制，不是技术上绝对防泄漏。

### D. B-pays hosted app

代表：Hugging Face Spaces、自建 SaaS、部分 Smithery URL MCP server。

特点：
- B 付 cloud/compute/hosting，A 免费或通过外部 paywall 使用。
- 最简单，但 marketplace 不替 B 自动完成按调用计费。

适合：
- demo、lead generation、开源社区、低频工具
- B 想保留完整 backend 控制权

风险：
- A 滥用会烧 B 的账单。
- 需要 B 自建 rate limit、API key、Stripe、quota、refund、support。

### E. Enterprise registry usage

代表：AWS Agent Registry。

特点：
- 不对 creator 分账，而是对企业 catalog 和 discovery API 收费。
- 收费对象是组织，不是外部用户。

适合：
- 大企业内部 agent/tool/skill catalog
- governance、审计、approval、重复建设治理

风险：
- 不解决开放 marketplace 的 creator incentive。

---

## 3. 确权要拆成三层

中文里 "确权" 在这个问题里至少包含三件不同的事，必须分开设计。

### 3.1 Agent 所有权 / Publisher identity

问题：这个 Agent 到底是谁发布的？是不是 B 的正版？

现有做法：
- OpenAI GPT Store：builder profile、verified domain、policy review。
- Relevance AI：verified Relevance Builders，Enterprise RBAC 影响谁能提交 listing。
- Apify：Actor owner、Store page、README、quality score、issue response。
- Smithery：server page、published MCP metadata、analytics。
- AWS Agent Registry / AGNTCY：registry record、identity metadata、approval workflow / cryptographic identity。

Agora/AVM 应该吸收：
- publisher profile
- package signature
- versioned manifest
- source/provenance
- compatibility matrix
- canonical tests result

### 3.2 A 的使用权 / Entitlement

问题：A 有没有权使用这个 Agent？能用几次？在哪个 workspace/project/org 里用？

现有做法：
- Poe：bot handle + user points + per-message price。
- Apify：paid Actor run + event/result/usage billing + monthly payout。
- Relevance AI：My Purchases；购买绑定 project；paid listing 可禁止跨 project copy。
- OpenAI Workspace Agents：workspace RBAC 控制 browse/build/share/publish。
- Claude Skills：personal skill 私有；Team/Enterprise 可 share 给 specific people 或 entire organization。

Agora/AVM 应该吸收：
- entitlement token
- seat / project / org scope
- per-call quota
- version pinning
- refund window
- revocation
- usage ledger

### 3.3 行动权限 / Delegated authorization

问题：这个 Agent 执行任务时，到底用谁的账号、谁的文件、谁的 API quota？

这是最关键的安全边界。

现有做法分三种：

| 权限模式 | 代表 | 好处 | 风险 |
|---|---|---|---|
| **Creator-owned connection** | OpenAI Workspace Agents 可允许 agent-owned / personal connections | A 不需要配置，体验顺 | A 可能通过 B 的账号访问数据或执行动作；官方也提醒要 least privilege、limit audience、audit |
| **End-user OAuth / delegated auth** | OpenAI GPT Actions OAuth、Arcade、Composio、Pipedream MCP、Zapier MCP | A 用自己的账号授权，scope 清晰 | OAuth flow、token refresh、scope drift、tool-call audit 很复杂 |
| **Local credentials / worker execution** | Claude Code Skills、本地 MCP、AVM profile、xhs/浏览器类 agent | cookie、本地文件、私钥不离开 A 的机器 | onboarding 难、always-on 难、B 的 IP 保护弱 |

结论：

> 任何让 A 使用 B 的 Agent 的产品，都必须明确展示 "这个 run 使用谁的 credential"。否则会出现 A 借 B 的权限行动，或 B 的 Agent 偷 A 的 credential 两类事故。

最健康的默认值应该是：

- A 使用自己的 credentials / local resources
- B 的核心 know-how 可作为 hosted protected step
- 平台只保存 entitlement、audit log、metering event，不保存 A 的高敏凭据
- 高风险 action 需要 approval
- 每个 tool call 记录 actor、subject、resource、scope、version、cost、result

---

## 4. 最贴近你描述的产品

### 4.1 Poe：最像 "B 自有云 Agent 被 A 直接用"

Poe API Bots 支持 B 配置自己的 Chat Completions / Responses API endpoint。A 在 Poe 里发消息时，Poe 把请求转发给 B 的 endpoint，再把 response stream 回 A。Poe 根据 B endpoint 报告的 token usage 和 B 配置的 pricing 向 A 收 points。

Server Bot 还支持动态计费：先 authorize 预留费用，服务后 capture 实际费用。这非常接近 Agent marketplace 需要的 "meter before action / charge after result"。

它的限制：
- B 的 bot 主要表现为 chat/API bot，不天然覆盖 long-running local worker。
- A 的外部账号权限不由 Poe 原生解决，B 需要自己设计 OAuth / tool permission。
- 第三方 developer bot 可能收到 A 的 chat 内容，隐私边界需要 A 看 privacy shield。

### 4.2 Apify：最成熟的 agent/automation marketplace 计费样板

Apify 不一定叫 Agent，但它的 Actor model 非常接近 "发布一个可运行能力"。B 写 Actor，发布到 Store；A 运行 Actor，平台收钱、记账、抽佣、分发、监控。

它值得学的不是 agent UI，而是商业基础设施：
- pay-per-event / pay-per-result / pay-per-usage
- 平台成本和 creator profit 分开算
- payout invoice、threshold、analytics
- quality score、README、issue response、testing
- pricing changes 需要 notice，保护用户预期

它的限制：
- B 的代码主要跑在 Apify cloud，不是 B 自己本地。
- 适合 browser/data automation，不适合任意 personal agent endpoint。

### 4.3 Relevance AI：paid listing 和 project-scoped entitlement 样板

Relevance AI Marketplace 明确支持 paid Agents / Tools，价格由 creator 决定。A 购买后可以在 My Purchases 里重新访问；购买绑定到 project；creator 可以限制 paid listing 被 copy 到其他 project。

这对 Agora 很有启发：
- entitlement 不一定要绑定个人账号，可以绑定 project/workspace。
- clone 和 use 要分开定价/授权。
- paid listing 的 IP 保护不是 "别人看不到"，而是通过 project scope 和禁复制降低再分发。

### 4.4 Smithery：B 自有 MCP server 的 discovery/connection 层

Smithery 允许 B 把已部署的 Streamable HTTP MCP server 用 URL method 发布，也支持本地 stdio server bundle。A 可以从任何 MCP client 发现和连接。

它很贴近 "B 自有云环境里有一个 agent/tool server，A 的 agent 调用它"。但从公开文档看，Smithery更偏 discovery、analytics、OAuth UI 和 protocol gateway，不像 Apify/Poe 那样已经把 creator billing 做深。

### 4.5 OpenAI Workspace Agents：组织内共享 agent 的权限警示样板

OpenAI Workspace Agents 不是 creator marketplace，但它直接击中了你的问题里最危险的一点：**发布 agent 时如果允许 personal / agent-owned connections，别人使用这个 agent 可能通过创建者的账号访问数据或执行动作。**

OpenAI 的做法是：
- workspace admins 控制谁能 browse/run/build/publish agents；
- 控制 connected tools/actions；
- 敏感动作可要求 approval；
- Compliance API 暴露配置、更新和 runs；
- 对 personal connections 明确提醒 least privilege、limit audience、audit。

这说明一个原则：如果 B 的 Agent 拥有 B 的全部云端权限，开放给 A 使用时，必须把 "A 是否能借用 B 的权限" 做成显式开关，而不是默认能力。

---

## 5. 对本地运行场景的判断

用户 B 的 Agent 运行在 B 本地，然后用户 A 直接使用，这个形态公开市场里仍然不成熟。原因很简单：

1. **在线性差**：B 合上电脑、断网、sleep，A 就调不了。
2. **信任差**：A 不知道 B 的本地 agent 是否记录输入、泄露数据、执行恶意逻辑。
3. **权限边界差**：如果 agent 能碰 B 的本地文件、账号、cookie，A 的请求可能借 B 的身份行动。
4. **计费难**：平台如何证明某次 run 成功、失败、消耗多少、谁该退款？
5. **安全审计难**：本地环境不是平台可完整观测的 trusted runtime。

更现实的路线不是 P2P 本地 agent 网络，而是：

```text
Platform control plane
  - discovery
  - entitlement
  - billing
  - event ledger
  - publisher reputation
  - version/test status

B/A execution plane
  - local worker or BYOC cloud endpoint
  - scoped permissions
  - signed run token
  - logs/redaction
  - approval gates
```

也就是 "中心化控制面 + 本地/BYOC 执行面"。这个判断和之前 AVM Shared Agent Profile / Agent Capability Package 的方向一致。

---

## 6. Agora / AVM 可借鉴的产品原语

### 发布侧

- `agent-card.json` / manifest：identity、skills、endpoint、auth requirement、pricing、runtime compatibility。
- publisher verification：verified domain / GitHub / organization profile。
- redaction compiler：发布前扫描 secrets、PII、local paths、private memory。
- canonical tests：证明 agent 不只是描述好看，而是真的能跑。

### 安装/使用侧

- inspect before use：展示会访问什么、用谁的凭据、调用哪里、如何计费。
- bind resources：A 绑定自己的 repo、browser、OAuth account、API key。
- approval gates：写文件、发邮件、付款、发帖等高风险 action 默认需要确认。
- revocation：A 能随时撤销购买、OAuth、local worker token。

### 计费侧

- per-message / per-call：适合 Poe 式 API agent。
- per-event / per-result：适合 Apify 式 data/automation agent。
- subscription + support：适合 open-local skill，卖持续更新和兼容维护。
- hosted protected step：适合 B 要保护核心 know-how 的能力。
- enterprise registry fee：适合组织内治理，不适合 creator marketplace。

### 审计/分账侧

能力包 marketplace 真正需要的是 event ledger：

| 字段 | 用途 |
|---|---|
| `caller_user_id` | 谁发起 |
| `agent_package_id` / `version` | 调了哪个能力包 |
| `publisher_id` | 谁应获得收入/承担责任 |
| `credential_subject` | 用谁的账号/资源 |
| `tool_scope` | 使用了哪些权限 |
| `pricing_meter` | 按 message/event/result/time 哪种方式计费 |
| `run_status` | success / partial / failed / cancelled |
| `failure_attribution` | 是 B agent、A credential、平台、第三方 API、runtime 哪一方失败 |
| `refund_policy` | 是否退款、退多少、谁承担 |

---

## 7. 产品空白

现在市场没有被很好解决的是：

> **一个让 creator 发布 live Agent endpoint / hosted protected step，同时让用户用自己的 credential 或 local worker 执行，并自动完成 entitlement、billing、audit、refund、payout 的产品。**

这不是纯 MCP registry，也不是 GPT Store，也不是 Apify Actor Store。它更像：

```text
Poe 的 self-hosted bot endpoint
+ Apify 的 pay-per-event marketplace
+ Relevance 的 project-scoped entitlement
+ Arcade/Composio 的 delegated auth
+ OpenAI Workspace Agents 的 RBAC / approval / audit
+ AVM 的 local runtime profile / install doctor
```

如果要做 MVP，不建议第一版做 "A 调 B 的本地 Agent"。更稳的是三步：

1. **Installable profile package**：A 安装 B 的 profile，用 A 自己的 runtime 和凭据跑。
2. **Hosted protected step**：B 的核心逻辑作为 paid endpoint 被 A 的本地 agent 调用。
3. **Live Agent endpoint**：成熟后再允许 A 或 A 的 agent 直接调用 B 的 A2A/MCP endpoint。

这样既能避开本地 Agent online/safety 难题，又能验证计费和确权。

---

## Sources Checked

- Poe API Bots docs: https://creator.poe.com/docs/api-bots/overview
- Poe Bot Monetization API: https://creator.poe.com/docs/server-bots/poe-bot-monetization-api-documentation
- Poe points FAQ: https://help.poe.com/hc/en-us/articles/19944206309524-Poe-FAQs
- Poe privacy center: https://poe.com/pages/privacy-center
- Apify monetization docs: https://docs.apify.com/platform/actors/publishing/monetize
- Apify AI agent publishing: https://apify.com/partners/publish-ai-agents
- Apify creator payout help: https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store
- Relevance AI Marketplace docs: https://relevanceai.com/docs/get-started/marketplace/introduction
- Relevance AI sharing docs: https://relevanceai.com/docs/build/agents/share-your-agent
- Smithery docs: https://smithery.ai/docs/build
- OpenAI Workspace Agents announcement: https://openai.com/index/introducing-workspace-agents-in-chatgpt/
- OpenAI Workspace Agents admin controls: https://help.openai.com/en/articles/20001143/
- OpenAI GPT Actions docs: https://help.openai.com/en/articles/9442513-configuring-actions-in-gpts
- OpenAI GPT Action authentication: https://developers.openai.com/api/docs/actions/authentication
- Claude Agent Skills docs: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Claude Skills help: https://support.claude.com/en/articles/12512180-use-skills-in-claude
- Claude Code plugin marketplaces: https://code.claude.com/docs/en/plugin-marketplaces
- Dify Creator Center / Template Marketplace: https://dify.ai/blog/dify-creator-center-template-marketplace-share-your-workflows
- Hugging Face Spaces overview: https://huggingface.co/docs/hub/main/spaces-overview
- Hugging Face billing: https://huggingface.co/docs/hub/main/billing
- Hugging Face Spaces OAuth: https://huggingface.co/docs/hub/spaces-oauth
- AWS Agent Registry preview: https://aws.amazon.com/about-aws/whats-new/2026/04/aws-agent-registry-in-agentcore-preview/
- AWS AgentCore pricing: https://aws.amazon.com/bedrock/agentcore/pricing/
- Arcade authorization docs: https://docs.arcade.dev/en/get-started/about-arcade
- Composio docs: https://docs.composio.dev/frameworks/langchain
- Pipedream MCP docs: https://pipedream.com/docs/connect/mcp/developers/
- Zapier MCP access control: https://help.zapier.com/hc/en-us/articles/45150730551693-Manage-access-to-your-MCP-server
- A2A Agent documentation: https://learn.microsoft.com/en-us/agent-framework/agents/providers/agent-to-agent
- AGNTCY identifiers: https://docs.agntcy.org/identity/identifiers/
