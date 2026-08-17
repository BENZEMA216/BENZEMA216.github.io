<!--
date: 2026-05-11
tags: [agent-ai, agent-marketplace, agent-builder, mcp, agent-packs, billing, authorization, agent-distribution]
status: supporting
feishu_manual_doc_url: https://www.feishu.cn/docx/REaCdaPqVouYm4xl5ZVc2MOZnYe
related:
  - "[user-a-use-user-b-agent-deep-research-feishu-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-deep-research-feishu-2026-05/)"
  - "[slock-agentrq-like-products-and-external-notes-2026-05](/output/reports/agora/market-competition/slock-agentrq-like-products-and-external-notes-2026-05/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
-->

# Agent.ai 深度研究

> Query：深度研究 Agent.ai，并判断它对 "用户 A 使用用户 B 的 Agent；B 的 Agent 跑在 B 自己环境；A 需要 B 授权；推理费用由 B 承担" 这个场景的价值。  
> 日期：2026-05-11

---

## 0. 一句话结论

**Agent.ai 值得优先研究，但它不是我们要找的完整答案。**

它最强的地方不是 "让 A 直接用 B 本地 Agent"，而是把三件事放到一个产品里：

1. **Agent marketplace / professional network**：用户可以 discover、use、add to team、review agents。
2. **No-code Agent Builder**：builder 可以用 actions、LLM、HubSpot/Google/LinkedIn/X、serverless functions、webhooks、schedules 做多步 workflow agents。
3. **API + MCP surface**：Agent.ai 可以把用户自己的 agents/actions 通过 API、SDK、MCP server 暴露给 ChatGPT、Claude、Cursor 等外部 assistants。

对我们最值得借鉴的是：

- **Agent listing 不只是卡片，而是可调用 function schema + metadata + executions + reviews。**
- **Agent Pack** 把一个完整业务流程做成 "一键 orchestrated pipeline + granular step actions" 两种接口。
- **MCP Server** 把 "我在 Agent.ai 里的 agents/tools" 自动暴露给外部 assistant，且走 OAuth 2.1 + PKCE + DCR。
- **Builder visibility** 已经有 private、unlisted link、specific users、specific HubSpot portals、public 等 entitlement 原语。
- **Clone Agent** 明确把一部分 agent flow 变成可查看、可克隆的 "open-source agent"。
- **Agent Requests** 是需求侧冷启动机制：用户提交想要的 agent，社区 upvote，平台把高票需求给 builder。

但它对我们四条约束的匹配度有限：

| 约束 | Agent.ai 是否满足 | 判断 |
|---|---|---|
| A 可以使用 B 的 agent | 部分满足 | B 可发布 public / link / specific users agent；A 可运行 |
| B 的 agent 跑在 B 自己环境 | 大多不满足 | 默认跑 Agent.ai 平台；可通过 External Agent URL / Invoke Web API / OpenClaw pack 指向外部环境，但不是主路径 |
| A 需要获得 B 授权 | 部分满足 | 有 visibility、specific users、HubSpot portal、MCP OAuth；但没有面向 A/B lease 的授权模型 |
| 推理费用由 B 承担 | 未明确满足 | Agent.ai 有 credits、Pro/Premium pricing；公开资料没看到 creator payout、B-paid run ledger、event billing |

所以我的判断是：

> Agent.ai 是 "Agent 能力商品化前台 + no-code builder + MCP/API gateway" 的强样板；不是 "B 本地/BYOC agent 授权给 A，并由 B 支付推理费" 的完整样板。

---

## 1. Agent.ai 是什么

Agent.ai 官网定位是 **"The #1 Marketplace for Professional AI Agents"**，用户可以 discover、use、build agents，形成自己的 personal AI agent team。

官方文档的 Welcome 页把它定义为：

- 面向用户：discover、connect with、hire AI agents to do useful things。
- 面向 builders：用 no-code 平台、data tools、frontier LLMs 构建 advanced AI agents。
- 对高级用户：可使用第三方 APIs 和 serverless functions。

外部背景：

- 创始人是 HubSpot co-founder / CTO Dharmesh Shah。
- 2024-09 INBOUND 公开 beta 时已有约 47,000 users。
- CX Today 在 2025-01 报道称它已有 258,000 users、3,420 agents，其中 302 public agents。
- Dharmesh 在 2025-07 的 simple.ai 文章称 Agent.ai 已超过 2M users，25,337 builders 创建了 44,000+ agents，其中 1,800 public agents。
- 它与 HubSpot 强相关但当时仍是独立项目；CX Today 报道中提到 Dharmesh 希望它未来进入 HubSpot ecosystem，类似 ChatSpot 后来成为 Breeze Copilot。

重要：这些增长数字来自 Dharmesh 自述和媒体报道，适合作为 traction signal，但需要用产品内数据或官方 dashboard 进一步核验。

来源：

- https://agent.ai/
- https://docs.agent.ai/welcome
- https://simple.ai/p/agent-ai-just-hit-2-million-users
- https://www.cxtoday.com/crm/hubspot-founders-agentic-ai-platform-surges-past-2500000-users/

---

## 2. 产品结构：三层叠加

### 2.1 Agent Network：用户侧 marketplace

用户侧核心是发现、运行、保存、评价 agents。

可见模块：

- Marketplace / Agent Network
- Agent Team：类似 saved agent library / bookmark list
- Agent Runs：历史运行记录 + scheduled runs
- Agent Requests：用户提交想要的 agent，其他人 upvote，平台把高票需求分享给 builders
- Reviews / ratings：public agents 可被评分，影响质量和搜索
- Pro / Premium agents：平台开始对部分 agent 能力收费

Agent.ai 的 marketplace 比 GPT Store 更像 "专业任务 agent 目录"，因为它的公开 examples 很多集中在 B2B、sales、marketing、CRM、content、meeting、prospecting。

### 2.2 Agent Builder：builder 侧 workflow runtime

Builder 是 Agent.ai 的核心。官方描述是 no-code tool，用户可以几分钟内搭出 agentic AI applications。

Builder 的重要机制：

| 模块 | 能力 |
|---|---|
| Settings | agent 名称、描述、tags、icon、demo video、agent username、visibility |
| Visibility | private only me、private unlisted link、user only、specific HubSpot portals、specific users、public |
| Advanced options | shareable URLs、LLM action cache 7 天、External Agent URL、HubSpot Lead Magnet |
| Triggers | manual、user configured schedule、email、HubSpot contact/company added、webhook |
| Actions | 数据获取、社媒、HubSpot CRM、business data、workflow logic、LLM/content generation、outputs |
| Preview panel | simple view / detail view、step log、variables/context、从修改步骤重跑 |
| Secrets | 存 API keys / tokens，通过 `{{secrets.foo}}` 引用 |
| Serverless functions | 在 workflow 中执行自定义代码，并看 logs |
| Clone Agent | builder 可选择让别人查看 actions/details 并克隆 agent |

这说明 Agent.ai 的 "agent" 本质上不是单个聊天机器人，而是 **trigger + workflow graph + actions + LLM steps + integrations + output renderer**。

### 2.3 API / SDK / MCP：开发者和外部 assistant surface

Agent.ai 不只提供 UI，也把能力暴露成：

- REST API：例如 `/v1/action/search` 搜索 agents。
- Python SDK：`pip install agentai`
- JavaScript SDK：`npm install @agentai/agentai`
- MCP Server：`https://mcp.agent.ai/mcp`
- Legacy NPM MCP package：`@agentai/mcp-server`

最关键的是 MCP Server：

- 允许 ChatGPT、Claude、Cursor 等 MCP client 直接调用用户的 Agent.ai tools、agents、actions。
- 推荐 secure sign-in，不需要手工复制 API token。
- 使用 OAuth 2.1 + PKCE、JWT、token refresh、Dynamic Client Registration。
- 支持 2024-11-05 和 2025-03-26 MCP protocol versions。
- 自动暴露的范围包括 Action Tools、Team Agents、Private Agents、Public Agents。
- 在 Integrations 页面，用户可选择暴露 Action Agents、My Team Agents、Private Agents、Top Public Agents。
- Agent.ai 也可以作为 MCP client，把外部 MCP servers 加进 Agent.ai，然后在 MCP Chat 中使用。

这是 Agent.ai 对我们最重要的部分：它已经把 "平台内 agent 能力" 变成外部 assistant 可发现、可调用的 MCP tools。

来源：

- https://docs.agent.ai/builder/overview
- https://docs.agent.ai/mcp-server
- https://docs.agent.ai/user/integrations
- https://docs.agent.ai/actions-available

---

## 3. Agent 的商品单位：不是 prompt，是 callable workflow

Agent.ai 的 agent listing / API 返回结构很值得研究。

Agent Discovery Search 返回的每个 agent 类似 OpenAI function/tool schema：

- `function.name`：如 `invoke_agent_...`
- `function.description`：agent 描述
- `metadata`：id、slug、icon、name、description、status、type、executions、reviews_count、reviews_score、created_at、updated_at、score
- `parameters`：JSON schema，包括字段、描述、枚举、required、additionalProperties
- `strict: true`

这比普通 marketplace card 更接近：

> Agent Card = 人能读的商品页 + agent/client 能直接调用的 function schema + 市场质量信号。

这对我们的启发很直接：如果做 "A 使用 B 的 Agent"，listing 不能只给 H1/描述/截图，还需要：

- callable schema
- required inputs
- expected outputs
- runtime mode
- tool permissions
- credential subject
- cost estimate
- reviews / executions
- version / updated_at
- failure policy

来源：

- https://docs.agent.ai/api-reference/agent-discovery/search

---

## 4. Agent Pack：最值得借鉴的能力打包方式

Agent.ai 的 Agent Packs 是 **purpose-built, multi-step agent pipelines**，可作为单个 action 调用，也可拆成 granular steps。

官方把每个 pack 分成：

- **Orchestrated actions**：例如 `run_full_*` / `run_optimized_pipeline`，一次调用跑完整流程。
- **Granular step actions**：用户可以在 Builder 中 mix、match、customize。
- **Render HTML action**：把结构化 JSON 输出变成 email-ready / human-readable report。

已列出的 Agent Packs 包括：

- Company Research v2
- Competitive Brief
- Meeting Prep
- Meeting Follow-Up
- Prospect Research / Prospect Finder / Lead Qualifier / Outreach Drafter
- Sales Outreach Team
- Content Marketing Team / Social Content Team / YouTube Creator Team
- Industry Research / Trends Research
- HeyGen Avatar / Photo Avatar
- Instant Headshot
- File Converter
- OpenClaw

这套设计比 "单个 agent bot" 更接近真正能商品化的单位：

| 形态 | 使用方式 | 适合谁 |
|---|---|---|
| Orchestrated pipeline | 一次调用得到完整结果 | 非技术用户、快速集成 |
| Granular step actions | 拆开、插入自己的 prompts/branches/cache | Builder、power user、企业内部工作流 |
| Render action | 把 JSON 变成人能读的 report | sales/marketing/ops 场景 |

对我们来说，Agent Pack 是比 "Agent" 更健康的商品单位。我们的能力包也应该有：

- `run_full`
- `run_step_*`
- `render`
- `test`
- `estimate_cost`
- `required_credentials`
- `approval_points`

来源：

- https://docs.agent.ai/agent-packs/overview
- https://docs.agent.ai/actions-available

---

## 5. OpenClaw Pack：最贴近 "个人 agent instance 被平台调用" 的信号

Agent.ai docs 的 Agent Packs index 中有 OpenClaw pack：

- OpenClaw pack 描述为：和个人 OpenClaw instance 通过 OpenAI-compatible API 对话，并调用其 tools。
- API index 包括：
  - OpenClaw Chat Completion
  - OpenClaw Get Details
  - OpenClaw Tools Invoke
- 文档里说 Get Details 会获取当前用户的 OpenClaw instance IP、auth token、status，后续 actions 可以引用 `{{openclaw.instance_ip}}` 和 `{{openclaw.auth_token}}`。

这点很关键：Agent.ai 已经把一个外部 personal agent runtime 做成了 Agent Pack。

但从公开文档看，它更像：

> 当前用户把自己的 OpenClaw instance 接入 Agent.ai，Agent.ai 帮用户调用它。

而不是：

> 用户 A 获得用户 B 授权，远程使用 B 的 OpenClaw instance，且推理费由 B 承担。

所以 OpenClaw Pack 是强信号，但还不是完整 A/B 模型。

来源：

- https://docs.agent.ai/llms.txt
- https://docs.agent.ai/agent-packs/overview

---

## 6. 计费：已有消费层，但没有成熟 creator settlement

### 6.1 Credits

Agent.ai 文档说 credits 是 marketplace currency，但没有 monetary value：

- credits 不能买卖或兑换现金。
- 一般运行一个 agent 花 1 credit。
- 用户可通过完善 profile、referral 等获得 credits。
- 如果余额低于 25，会每周自动补到 100。
- 官方说 Agent.ai free to use and build，目标是成为最好的 professional marketplace for AI agents。

这说明 credits 更像 usage throttle + community reward，不是成熟结算货币。

### 6.2 Pro / Premium

Pricing 页显示：

- Marketplace agents still free to use。
- 单个 Premium agent：$10/月。
- Pro：$25/月，访问所有 Agent.ai Pro agents。
- Pro 包括 all Pro agents、generous runs、new Pro agents added automatically、private community chat with founder。

这说明 Agent.ai 已经开始从 beta 免费转到 paid agent access，但计费对象更像：

> 用户向 Agent.ai 购买 Pro/Premium access。

公开资料里没有看到：

- creator payout / revenue share
- builder 定价面板
- per-run event billing
- B-paid run ledger
- refund / dispute policy
- agent owner 的成本回收机制

### 6.3 模型成本

Builder docs 允许选择 OpenAI、Anthropic、Google、Perplexity、open-source 等模型，并给出 speed/accuracy/context/cost 的相对评分。

但公开文档没有清楚说明：

- builder 是否可以接入自己的 model API key
- builder 是否承担自己 agent 被别人运行时的模型成本
- public agent 的成本由平台、builder、订阅用户还是 credits pool 承担

从 pricing 和 credits 机制推断，默认更像平台统一承担/抽象模型成本，用户用 credits / subscription 消费；但这只是推断，需要实测或询问官方。

来源：

- https://docs.agent.ai/marketplace-credits
- https://agent.ai/pricing
- https://docs.agent.ai/llm-models

---

## 7. 确权：有 visibility 和 OAuth，但没有 A/B lease

Agent.ai 的确权至少有四层。

### 7.1 Agent ownership / builder IP

Security & Privacy 文档说：

- builder 保留 agent 相关 IP。
- Agent.ai 是 hosting/discovery venue，不声称拥有 builder 的 creative work。
- builder 负责确保 agent 不侵犯他人 IP。

这是 marketplace 的基本前提。

### 7.2 Agent visibility / usage entitlement

Builder settings 支持：

- Private only me
- Private unlisted link
- User only
- Specific HubSpot portals
- Specific users by email
- Public

这个 visibility model 是 Agent.ai 对我们最有价值的确权设计之一。它已经覆盖了 "B 授权 A 使用" 的一部分，但它还缺：

- time-bound lease
- budget-bound usage
- per-tool scope
- revocation audit
- cost owner / credential subject
- run-level delegated authorization

### 7.3 Public Agent policy

Agent.ai 对 public agents 有 URS 标准：

- Usability：成功运行、清晰名称/描述、抗烂输入、输出有用。
- Remarkability：不能只是复制别的 agent，要有独特 purpose / integration / method / expertise。
- Safety：不得 spam、不得无同意发消息、收集 PII 前要 consent、不得收 passwords/payment/government IDs、不得伪装成人，监管行业要 disclaimer。
- Agents 可因差评、反复问题或违反 ToS 被 delist。

这给 agent marketplace 的 quality gate 提供了实用模板。

### 7.4 MCP / API authorization

MCP 层：

- 推荐 OAuth secure sign-in。
- Client 通过 `.well-known/oauth-authorization-server` 发现 auth endpoints。
- Dynamic Client Registration。
- 用户登录 Agent.ai 后换取 Bearer token。
- 外部 assistant 调用 tools 时，文档说会 ask permission。

API 层：

- 用户 integration page 中有 API key。
- 文档明确提醒 API key grants access to account and credit usage，要像 password 一样保密。

这很好地说明：MCP/API gateway 是 user-account scoped，而不是 creator-to-consumer settlement scoped。

来源：

- https://docs.agent.ai/security-privacy
- https://docs.agent.ai/builder/public-agent-policy
- https://docs.agent.ai/builder/overview
- https://docs.agent.ai/user/integrations
- https://docs.agent.ai/mcp-server

---

## 8. 数据和安全边界

Agent.ai 明确存储用户提交给 agents 的 inputs 和 outputs，用于上下文与历史体验。

安全/隐私文档还说明：

- 不出售或转售用户数据。
- 不把用户数据用于模型训练或提供服务以外目的。
- 数据 in transit 加密。
- 使用第三方 LLM 时，用户数据会传给对应 LLM provider；provider 的数据处理受各自隐私政策约束。
- 对 PII、金融、健康、公司敏感数据建议用户审查 provider policy、数据保留和合规。
- 截至文档当时，Agent.ai 没有 SOC 2、HIPAA、ISO 27001 等行业认证。

这对我们有两个启发：

1. 如果做面向个人/SMB 的 agent marketplace，公开披露 "inputs/outputs 是否存储、是否训练、是否传第三方 LLM" 是必须项。
2. 如果做 "A 用 B 的本地/BYOC agent"，还要额外披露：
   - A 的 input 是否被 B 看到
   - B 的环境输出是否被 A 看到
   - 日志存在哪里
   - credential subject 是 A 还是 B
   - 谁能删除 run history

来源：

- https://docs.agent.ai/security-privacy

---

## 9. Agent.ai 与我们四条约束的映射

用户当前要构建的是：

1. 用户 A 可以使用用户 B 的 agent
2. 用户 B 的 agent 跑在用户 B 自己的环境里
3. 用户 A 需要获得用户 B 的授权
4. Agent 的实际推理费用由用户 B 来承担和支付

### 9.1 可以满足的部分

Agent.ai 可以满足：

- B 创建一个 agent。
- B 将 agent 设为 public、unlisted link、specific users，A 可以运行。
- A 运行 agent 时，Agent.ai 有 run history。
- 如果 agent 通过 MCP 暴露，A 的外部 assistant 可调用 A 账号可见的 Agent.ai tools/agents。
- 如果 B 把 agent 设计成调用 external URL 或 Web API，理论上可以让 Agent.ai 调 B 的云 endpoint。

### 9.2 不能直接满足的部分

Agent.ai 默认不能满足：

- B 的 agent 跑在 B 本地环境：Agent.ai 默认是平台 builder/runtime。
- A 使用 B 的 private MCP gateway：MCP 是按登录用户暴露 "你的 Agent.ai tools/agents"。
- B 为 A 的每次调用承担明确推理费：公开资料没有 B-paid ledger。
- 成熟 creator billing：没有看到 builder 自定价、creator payout、event billing。
- 细粒度 lease：没有 time/budget/tool-scope lease。

### 9.3 可能的绕法

可以组合出近似形态：

| 做法 | 形态 | 问题 |
|---|---|---|
| B 创建 private/unlisted/specific-user Agent.ai agent 给 A 用 | A 用 B 的 platform-hosted workflow | 不在 B 本地；费用归属不清 |
| B 的 Agent.ai agent 调用 B 的 external endpoint | A 经 Agent.ai 间接调用 B 云端 agent | 需要 B 自建 auth/rate limit/billing；Agent.ai 不是结算层 |
| B 用 OpenClaw Pack 接自己的 OpenClaw，A 使用 B 分享的 wrapper agent | 最接近 B self-owned runtime | 需要确认 OpenClaw auth token 是否能安全共享/委托；不是官方 A/B 模型 |
| A 在自己的 MCP client 中登录自己的 Agent.ai，添加 B public agent | A 的 assistant 调 public agent | 费用/权限仍是 A account scoped；不是 B 授权 lease |

---

## 10. 对我们最有价值的设计借鉴

### 10.1 Agent listing = callable schema + market signal

Agent.ai Search API 的设计很好。我们应该把 marketplace listing 设计成 machine-readable first：

```yaml
agent_id:
owner:
visibility:
runtime_mode: platform | byoc_cloud | local_tunnel | installable
input_schema:
output_schema:
required_credentials:
tool_permissions:
cost_estimate:
approval_points:
executions:
reviews:
updated_at:
version:
```

### 10.2 Agent Pack 双接口

每个能力包都应该同时支持：

- `run_full`：非技术用户一次调用
- `run_step_*`：builder / orchestrator 可组合
- `render`：给人看
- `estimate_cost`：运行前估价
- `audit`：运行后归因

### 10.3 Visibility 只是 lease 的起点

Agent.ai 有 private/public/specific users，但我们需要进一步做：

- `allowed_requesters`
- `expires_at`
- `budget_cap`
- `max_runs`
- `allowed_tools`
- `credential_subject`
- `model_key_owner`
- `approval_policy`
- `revocation_policy`

### 10.4 MCP gateway 必须区分 "我自己的 tools" 和 "别人授权给我的 tools"

Agent.ai MCP 的强点是把用户自己的 Agent.ai agents/tools 暴露给外部 assistant。我们如果做 A/B 模型，MCP tools/list 里要显式标注：

- owned by me
- shared by B
- payable by B
- using my credential
- using B credential
- approval required
- estimated cost

否则 A 的 assistant 会把 B 的 agent 当成普通 tool，权限边界不清。

### 10.5 Agent Requests 是冷启动好机制

Agent.ai 的 Request an Agent 能解决 marketplace 冷启动：

- demand side 提交真实需求
- upvote 排序
- builder community 认领/实现
- 平台知道哪些 agent 有需求但没有供给

我们可以做类似：

> Request a capability / Request a remote agent session

并把需求拆成：

- user task
- required environment
- expected credential
- max acceptable cost
- whether local/BYOC required
- whether creator can use hosted protected step

---

## 11. 该优先研究哪些页面 / 功能

P0：

1. **MCP Server**：OAuth、tools/list、visibility、private/team/public agents 暴露方式。
2. **Agent Builder**：visibility、External Agent URL、webhook、schedule、email trigger、preview step logs。
3. **Agent Packs**：orchestrated vs granular action 的商品结构。
4. **Search API**：function schema + metadata + reviews/executions。
5. **Public Agent Policy**：URS gate 和 delist criteria。

P1：

1. **Pricing / credits**：验证 Pro/Premium 是否只适用于 Agent.ai 自营 agents，第三方 builder 是否能收费。
2. **Clone Agent**：研究哪些 agent 可开源 flow，clone 后 secret / credentials 如何处理。
3. **OpenClaw Pack**：实测是否能把个人 OpenClaw instance 变成 Agent.ai action。
4. **HubSpot integration**：specific HubSpot portals 作为 entitlement scope 的设计很有参考价值。

P2：

1. Chrome extension：看是否有页面级 agent invocation 模式。
2. Community / Agent Requests：看需求侧如何冷启动 builder ecosystem。
3. Agent.ai + HubSpot Breeze 关系：判断未来是否会被 HubSpot CRM 内嵌，从 marketplace 转向 CRM agent ecosystem。

---

## 12. 最终判断

Agent.ai 的真正定位不是 "卖别人的 Agent 给我用"，而是：

> **让专业工作流被 no-code builder 做成 callable agents，再通过 marketplace、API、MCP 分发。**

它证明了三件事：

1. 非开发者会愿意把自己的工作 know-how 做成 agent。
2. Agent marketplace 需要 function schema、reviews、executions、run history、request board，而不是只有 bot card。
3. MCP 可以成为 "平台内 agent 能力 → 外部 assistant" 的导出层。

但它没有证明：

1. B 的本地/BYOC agent 可以安全授权给外部 A 使用。
2. B 可以为 A 的调用承担推理费用并清晰记账。
3. creator 能通过按次/按事件调用获得 payout。
4. A/B credential subject、cost owner、approval subject 可以被运行时显式区分。

所以对我们来说，Agent.ai 应列为 **P0 研究对象**，但研究目的应非常明确：

- 学它的 **agent listing / function schema**。
- 学它的 **no-code workflow builder**。
- 学它的 **Agent Pack 商品单位**。
- 学它的 **MCP export layer**。
- 学它的 **Agent Requests 冷启动机制**。

不要把它误认为已经解决了 "用户 A 使用用户 B 本地 Agent，且 B 支付推理费"。

---

## 13. Sources

- Agent.ai official: https://agent.ai/
- Agent.ai pricing: https://agent.ai/pricing
- Agent.ai docs index: https://docs.agent.ai/llms.txt
- Welcome: https://docs.agent.ai/welcome
- Builder Overview: https://docs.agent.ai/builder/overview
- Public Agent Policy: https://docs.agent.ai/builder/public-agent-policy
- LLM Models: https://docs.agent.ai/llm-models
- Marketplace Credits: https://docs.agent.ai/marketplace-credits
- MCP Server: https://docs.agent.ai/mcp-server
- Integrations: https://docs.agent.ai/user/integrations
- Security & Privacy: https://docs.agent.ai/security-privacy
- Agent Team: https://docs.agent.ai/user/agent-team
- Agent Runs: https://docs.agent.ai/user/agent-runs
- Agent Requests: https://docs.agent.ai/user/request-an-agent
- Agent Packs: https://docs.agent.ai/agent-packs/overview
- Agent Discovery Search: https://docs.agent.ai/api-reference/agent-discovery/search
- Invoke Other Agent: https://docs.agent.ai/actions/invoke_other_agent
- Wait for User Confirmation: https://docs.agent.ai/api-reference/inputs-%26-data-retrieval/wait-for-user-confirmation
- Action Availability: https://docs.agent.ai/actions-available
- Secrets: https://docs.agent.ai/builder/secrets
- Serverless Functions: https://docs.agent.ai/builder/serverless-functions
- Clone Agents: https://docs.agent.ai/clone-agents
- Using Agent.ai with HubSpot: https://docs.agent.ai/builder/using-hubspot
- Dharmesh Simple.ai update: https://simple.ai/p/agent-ai-just-hit-2-million-users
- CX Today Agent.ai article: https://www.cxtoday.com/crm/hubspot-founders-agentic-ai-platform-surges-past-2500000-users/
- PR.ai Agent.ai thread / INBOUND 2024 index: https://pr.ai/threads/agent-ai-network-of-ai-agents-usa.25553/
- Reddit B2B marketing discussion: https://www.reddit.com/r/b2bmarketing/comments/1fr00ly/did_anyone_watch_hubspots_inbound_2024/
