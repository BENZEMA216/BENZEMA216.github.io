<!--
date: 2026-05-11
tags: [agent-native-im, human-in-the-loop, agent-remote-control, local-agent, byoc-agent, mcp, external-research]
status: supporting
feishu_manual_doc_url: https://www.feishu.cn/docx/REaCdaPqVouYm4xl5ZVc2MOZnYe
related:
  - "[user-a-use-user-b-agent-deep-research-feishu-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-deep-research-feishu-2026-05/)"
  - "[user-a-use-user-b-agent-product-landscape-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-product-landscape-2026-05/)"
  - "[agent-native-im](/wiki/concepts/agent-native-im/)"
  - "[slock-ai-research](/output/reports/richard-chien/slock-ai-research/)"
-->

# Slock / AgentRQ 类产品与外部研究记录补充

> Query 补充：用户希望在 Slock、AgentRQ 这类产品之外，继续找类似产品，并顺手找别人已有的研究记录。  
> 日期：2026-05-11  
> 当前使用场景：用户 A 使用用户 B 的 Agent；B 的 Agent 跑在 B 自己环境；A 需要 B 授权；实际推理费用由 B 承担和支付。

---

## 0. 一句话结论

如果把问题从 "Agent marketplace" 收窄到 **agent-native collaboration / remote control / human-in-the-loop layer**，现在已经出现一批更贴近 Slock 和 AgentRQ 的产品。

最值得马上研究的不是单个 "store"，而是四条产品线：

1. **Slock / HiClaw / OpenClaw**：把本地或自有环境里的 agent 变成一个长期在线、可协作、可被 channel 触达的 worker。
2. **AgentRQ / Hiloop / askHuman / Lassare / HITL Relay**：把人类审批、问题、任务和 agent run 之间的 loop 产品化。
3. **Marmy / Ticlawk / agent-freeway / Claude Remote Control / Claude Dispatch**：把本地 session 暴露给手机、浏览器或另一个 client，形成远程指挥层。
4. **Agensi / Apify MCP / NEXUS / AgentGate**：分别在 "能力包付费"、"MCP server 变现"、"agent-to-agent 结算"、"credential + approval gateway" 上提供可借鉴机制。

对我们四条约束的判断：

- **完整满足四条约束的成熟产品仍没看到。**
- 最接近 "B 的 agent 跑在 B 自己环境、A 远程使用、B 承担推理费" 的技术组合是：  
  **Slock/OpenClaw/Marmy/agent-freeway 做 B-side runtime exposure + AgentRQ/Hiloop 做授权与任务 loop + AgentGate 做 action/credential gate + 自建 entitlement/cost ledger。**
- 外部研究记录已经开始把这个问题命名为 "remote control is not enough, attention layer is needed"、"local-first agent body belongs to user"、"agent-native IM / SlackAgents"、"OpenClaw security boundary"。这些记录很值得作为我们产品需求和风险边界的参考。

---

## 1. 产品清单：类似 Slock / AgentRQ 的产品

### P0：马上研究

| 产品 | 链接 | 类型 | 为什么值得看 | 和四条约束的关系 |
|---|---|---|---|---|
| **Slock** | https://slock.ai/ | Agent-native IM + local daemon | 官方定位是 humans and agents 在 channels/DMs 协作；agent 通过 `npx @slock-ai/daemon` 跑在自己的电脑上。Slock 的 slide 还明确提到 "Agent 资源共享问题：non-tech 不会配 agent、别人的 agent 更好用" | B-side runtime 最像。还缺 A/B 授权、B 付费 metering、跨用户 entitlement |
| **AgentRQ** | https://agentrq.com/ / https://github.com/agentrq/agentrq | MCP-native HITL task board | 1 workspace per agent；agent 和 human 双向分配任务；Supervisor MCP 跨 workspace 管理；Apache-2.0/self-hostable；目前 beta 免费 | 解决 A 指挥/审批 B agent 的 task layer，但不是计费结算层 |
| **Hiloop** | https://hi-loop.com/ | Zero-trust HITL interaction platform | 支持 Claude Code plugin、OpenClaw channel、SDK/MCP/webhook；每个 tool call/file edit/bash command 可流到 app；E2E 加密，服务端只看路由/计费 metadata | 是 "授权/审批交互层" 的强样板，尤其是审批 UI、encrypted content、routing metadata |
| **Marmy** | https://marmy.ai/ / https://github.com/marmy-ai/marmy | Mobile IDE for terminal agents | Rust agent 跑在本地机器，手机控制 tmux session；支持 Claude Code 或任意 terminal agent；LAN/Tailscale/token；能看文件、diff、推送通知、语音确认 | 很贴近 "B 的机器上跑 agent，被远程 client 控制"；但默认是同一 owner，不是 A/B 权限和 billing |
| **Ticlawk + agent-freeway** | https://ticlawk.com/ / https://github.com/darthjaja6/agent-freeway | Attention feed + agent harness bridge | agent-freeway 把 Claude Code/Codex/OpenClaw/opencode 接到 Telegram 或 Ticlawk；Ticlawk 把多 agent 工作做成 feed，只在需要人时打断 | 值得研究 "remote control 之后的 attention layer"；安全边界提示很直接：chat 几乎等于 shell |
| **HiClaw** | https://hiclaw.io/ / https://github.com/agentscope-ai/hiclaw | Matrix-based multi-agent OS | Manager/Worker 架构；Matrix rooms 里 agent-agent/human-agent 协作；Higress AI Gateway 负责 credential 风险；人可随时进入房间观察/干预 | 是 Slock 的开源/企业版对照；强在透明、审计、credential proxy |
| **AgentGate** | https://agentgate.org/ | HITL API Gateway | 让 agent 读数据即时通过，写操作排队等待审批；真实 API credentials 不进入 AI layer；MCP server 支持 Claude Code/Codex/OpenClaw | 对我们最关键：A/B 授权时，必须把 credential subject 和 action approval 分开 |

### P1：需要跟踪

| 产品 | 链接 | 类型 | 特别值得研究点 | 和四条约束的关系 |
|---|---|---|---|---|
| **askHuman / ALPH** | https://docs.askhuman.net/ | Agent IM messenger + MCP config CLI | 一个 MCP endpoint 连接多种本地 agent；ALPH 自动检测 Gemini/Cursor/Claude Code 并写配置；activity feed、context library、cloud memory | 证明 "把多个本地 agent 接到一个远程人类界面" 是真实需求 |
| **Lassare** | https://lassare.com/ | Slack-based remote approval MCP | Claude Code/Cursor/Copilot/Gemini CLI 都能用；问题发到 Slack DM；免费 200 questions/month，Solo $9/month 2,000 questions | 轻量收费样板；它把每次 human question 当计费单位 |
| **Mycelium** | https://mycelium.fyi/ | Agent network coordination OS | 任务、计划、inter-agent messaging、shared memory、drift detection、approval gates；任何 HTTP process 可加入；可 self-host | 更偏 agent team coordination，可能成为 Slock/AgentRQ 的 infra 侧竞品 |
| **Claude Code Remote Control** | https://code.claude.com/docs/en/remote-control | 官方本地 session remote control | 把本地 Claude Code session 接到 phone/tablet/browser；适合学习 "官方如何做 session pairing / subscription gating" | 同一用户场景，不解决 A 使用 B，但验证 remote local session 模式 |
| **Claude Cowork Dispatch** | https://claude.com/resources/tutorials/dispatch-in-claude-cowork | Phone-to-desktop task dispatch | 手机发任务，Claude 在用户电脑上用文件、浏览器和本地 app 执行；官方强调强 trust chain | 对我们有启发：B 的 agent 若对 A 开放，本质是把 A 的指令变成 B 机器上的真实动作 |
| **HITL Relay** | https://humanintheloop-relay.com/developers | Generic HITL MCP relay | Claude Code、Codex CLI、Gemini、Cursor、Windsurf、Zed 等接入；15 分钟等待窗口 | 工具形态朴素，但 wait/timeout semantics 值得参考 |
| **Agensi** | https://www.agensi.io/ | AI Agent Skill.md marketplace | 一次性购买、80% creator share、Stripe Connect、buyer-fingerprinted download、security review、SKILL.md 标准 | 不满足 "B 付推理费"，但它是确权/防转卖/creator payout 的直接样板 |
| **NEXUS** | https://nexusprotocol.dev/ | Agent economy protocol | A2A + MCP；agent discovery/delegation/reputation；per-task credit settlement；Stripe checkout；5% platform settlement | 早期产品，但直接命中 agent-to-agent marketplace + micro-billing |
| **Apify MCP** | https://apify.com/mcp/developers | MCP monetization via Apify Actors | Apify 明确宣传 MCP marketplace、out-of-box infra and billing、36K+ monthly developers、$500K+ monthly developer payouts | 计费和 payout 最成熟；但 agent 运行在 Apify runtime，不在 B 本地 |

### P2：外部研究/论文型参考，不一定是竞品

| 名称 | 链接 | 研究价值 |
|---|---|---|
| **ChatCollab** | https://arxiv.org/abs/2412.01992 | 多个 human/AI agents 在 Slack 中以 peer 方式协作；验证角色、任务等待、协同 dynamics |
| **SlackAgents** | https://aclanthology.org/2025.emnlp-demos.76.pdf | Salesforce AI Research 的 Slack-native multi-agent framework；直接研究 agent-to-agent 和 agent-to-human collaboration |
| **OpenClaw PRISM** | https://arxiv.org/abs/2603.11853 | 本地高权限 agent gateway 的 runtime security layer；对我们做 B-side agent exposure 很关键 |
| **ClawSafety** | https://arxiv.org/abs/2604.01438 | 本地 personal AI agent 在高权限 workspace 中的 prompt injection / credential leakage 风险测试 |
| **ClawWorm** | https://arxiv.org/abs/2603.15727 | 长期运行、互联 agent 生态里的自传播攻击；对 "A 可触达 B 的 agent" 是红线级风险 |

---

## 2. 外部研究记录：已经有人写过/讨论过什么

### 2.1 Slock 一手/准一手记录

| 来源 | 链接 | 关键信息 | 该怎么用 |
|---|---|---|---|
| **Slock 官方首页** | https://slock.ai/ | Slock 明确说 humans and AI agents work in channels and DMs；agent 运行在 "your own computers"；接入方式是 `npx @slock-ai/daemon` | 用来确认 Slock 的官方主张：local daemon + channel/DM + agent memory |
| **RC 的 Slock slides** | https://slides.com/stdrc/slock | 起源里列了 Multiple agents、Long-running single session、persistent memory、channel/topic management；痛点里出现 "Agent 资源共享：non-tech 不会配 agent、别人的 agent 更好用" | 这是最贴近我们问题的外部记录：它明确把 "别人 agent 更好用" 作为痛点 |
| **42章经 / Podwise Slock 访谈摘要** | https://podwise.ai/dashboard/episodes/7831210 | 访谈中提到 Slock 从 OPC 到 "40 个 Agents + 7 个人" 的团队实践，强调 Agent 动力学和 agent-human 协作组织 | 用来理解 Slock 的组织/协作假设，不是计费/授权材料 |
| **Koala OSS Slock 介绍** | https://koala-oss.app/news/1590/ | 第三方简评：AI 代理不是工具而是团队成员；复杂任务可靠性仍不足，可能产生大量人工审查输出 | 可作为外部 skeptical note：Slock 形态的瓶颈是 agent reliability + human review load |

### 2.2 AgentRQ 使用者/作者讨论

| 来源 | 链接 | 关键信息 | 该怎么用 |
|---|---|---|---|
| **AgentRQ 官网** | https://agentrq.com/ | real-time agent-human task collaboration；1 workspace per agent；MCP channel；Beta 免费；self-hostable | 产品功能基线 |
| **AgentRQ GitHub** | https://github.com/agentrq/agentrq | Go/Fiber backend、Vue frontend、SQLite user-scoped storage、Google OAuth、Supervisor MCP、Apache-2.0；workspace-specific MCP URL + token | 技术架构基线，尤其是 "workspace-scoped MCP + global supervisor MCP" |
| **Reddit: lead colony of Claude Code agents** | https://www.reddit.com/r/ClaudeCode/comments/1syjm5t/mcp_humanintheloop_task_manager_lead_colony_of/ | 作者说用 supervisor + multiple worker sub agents；AgentRQ 生产使用 6 周、完成 500+ tasks；每个 workspace 有 persona/memory | 是真实 dogfooding 记录，比官网更能说明痛点 |
| **Reddit: open-source task manager for agents** | https://www.reddit.com/r/OpenSourceeAI/comments/1szn9gp/opensource_task_manager_for_ai_agents_mcp/ | 讨论里有人认可 supervisor/workspace split；作者解释 self-improving-loop note 是每 workspace 记忆，可保存到 skills 或外部 memory | 对我们很重要：agent marketplace 也需要 per-agent memory / mission / task history |

### 2.3 Remote control / attention layer 讨论

| 来源 | 链接 | 关键信息 | 该怎么用 |
|---|---|---|---|
| **Marmy 官网 + GitHub** | https://marmy.ai/ / https://github.com/marmy-ai/marmy | Rust agent 跑在机器上；手机连接 tmux；可读输出、发输入、看文件、收 push、voice approval；self-hosted | 对 "B 机器里的 agent 如何被远程查看和控制" 很直接 |
| **Reddit: run 20+ Claude Code sessions across machines** | https://www.reddit.com/r/ClaudeCode/comments/1s0d2vw/i_run_20_claude_code_sessions_across_multiple/ | 作者说需求从 writing code 变成 directing agents；想要 manager agent 控制 worker sessions，手机上看产物和审批 | 证明 remote control 正从单 session 走向多 agent fleet management |
| **Ticlawk 官网** | https://ticlawk.com/ | 主张 "Agents should check in when they need you"；支持 Claude Code、Codex、OpenCode、Pi、OpenClaw；built on agent-freeway | 值得研究它的 attention/feed 设计，而不是只看 dashboard |
| **Reddit: Dispatch solves remote control, not attention/context switching** | https://www.reddit.com/r/ClaudeCode/comments/1t8ofng/dispatch_solves_remote_control_it_doesnt_fully/ | 用户认为 Dispatch 解决了手机控制，但没解决多 session 下什么需要注意、什么可等待、是否可信的 cognitive load | 对我们产品定义很关键：授权不是一次性 approve，而是持续 attention routing |
| **agent-freeway GitHub** | https://github.com/darthjaja6/agent-freeway | 把 Claude Code/Codex/OpenClaw/opencode 接到 Telegram 或 Ticlawk；文档明确提示 chat client can ask it to do whatever runtime can do in bound workdir | 安全边界教材：A 控 B agent 时，聊天入口几乎就是 shell，必须做 scope / revocation |

### 2.4 OpenClaw 外部技术/安全记录

| 来源 | 链接 | 关键信息 | 该怎么用 |
|---|---|---|---|
| **OpenClaw official docs: Agent Runtime** | https://docs.openclaw.ai/concepts/agent | single embedded agent runtime、workspace、bootstrap files、sessions、skills、runtime boundaries | 用来理解 B-side local agent runtime 的基本 contract |
| **MMNTM: Anatomy of a Personal AI Agent** | https://www.mmntm.net/openclaw | 把 OpenClaw 定义成 local-first personal AI agent platform；"Brain can be rented, Body must belong to the user" | 非常适合引用为本地 agent 主权叙事 |
| **OpenClaw.report deepdive** | https://openclaw.report/deepdive/what-is-openclaw-the-lobster-revolution | self-hosted local-first agent；通过 WhatsApp/Telegram/Discord/Slack/Signal/iMessage 等对话；agent 有 hands | 第三方 explainer，可辅助市场语言 |
| **OpenClaw PRISM** | https://arxiv.org/abs/2603.11853 | 提出十个 lifecycle hooks 的 runtime security layer：ingress、prompt construction、tool execution、sub-agent spawning、gateway startup 等 | 如果我们允许 A 触达 B 的 local agent，这些 hook 是最小安全面 |
| **ClawSafety** | https://arxiv.org/abs/2604.01438 | 在高权限本地 workspace 里，skill files/email/web pages 都可能成为攻击向量；ASR 40%-75% | 说明 "B 环境执行" 不能只靠模型安全，必须 runtime policy + audit |
| **ClawWorm** | https://arxiv.org/abs/2603.15727 | 长期运行且互联的 agent 可能被单条消息触发自传播攻击 | 说明 agent-to-agent / user-to-agent exposure 需要隔离、签名、permission wall |

### 2.5 MCP / marketplace / monetization 研究记录

| 来源 | 链接 | 关键信息 | 该怎么用 |
|---|---|---|---|
| **Apify MCP developers** | https://apify.com/mcp/developers | Apify 明确宣传 MCP marketplace、zero upfront cost、out-of-box infra and billing、developer payout | 计费/payout 参考 |
| **ChatForest: MCP marketplace monetization guide** | https://chatforest.com/guides/mcp-marketplace-monetization/ | 对 Smithery、Cline、MCPize、Apify 的 publishing / billing / pricing 做了横向整理 | 这是外部研究记录，但需要二次核验，因为有些平台数据是 "reportedly" |
| **AgentMarketCap: AI agent discovery crisis** | https://agentmarketcap.ai/blog/2026/04/11/ai-agent-marketplaces-discovery-2026 | 提到 Hugging Face Agents Hub、Salesforce AgentExchange、AWS marketplace 化等 registry fragmentation | 可作市场 fragmentation 背景，不直接当事实锚 |
| **DEV: State of MCP Monetization in 2026** | https://dev.to/kirothebot/the-state-of-mcp-monetization-in-2026-where-builders-actually-get-paid-34k9 | 把 free directories、MCP Marketplace、x402、Apify MCP、MuleRun Creator Studio 等分层比较 | 是 builder 视角研究记录；需要逐项验证数字 |
| **Agensi** | https://www.agensi.io/ | Skill marketplace：one-time purchase、security review、fingerprinted downloads、80% creator share | 对 "Agent 能力包卖给别人" 的确权有借鉴价值 |
| **NEXUS** | https://nexusprotocol.dev/ | A2A/MCP agent discovery、trust/reputation、per-task billing、Stripe checkout、5% settlement | 早期但非常贴近 "agent-to-agent economy" |

---

## 3. 对我们最有启发的产品机制

### 3.1 B-side runtime exposure：不要先做 marketplace，先定义 B 的 worker contract

Slock、OpenClaw、Marmy、agent-freeway 共同说明：**真正稀缺的是 B 的 agent 能稳定、可控、可审计地运行在 B 的机器/云里，并被外部 channel 唤醒。**

需要定义的最小 contract：

- `agent_id`
- `owner_user_id = B`
- `runtime_location = local | byoc_cloud | platform_cloud`
- `online_status`
- `allowed_projects / allowed_workdirs`
- `model_provider / model_key_owner`
- `cost_metering_mode`
- `approval_policy`
- `tool_scope`
- `audit_sink`
- `revocation_key`

### 3.2 A/B 授权不是 "share link"，而是 bounded lease

现有产品多数是同一用户远程控制自己的 agent。我们的场景变成 A 使用 B 的 agent 后，授权应该是：

- B 发出 lease：A 可以在某段时间、某个 task scope、某个工具集合内使用 B 的 agent。
- A 的请求必须带 `subject=A`，不能伪装成 B。
- B 需要能随时 revoke。
- B 需要看到 cost estimate、actual cost、tool calls、outputs。
- A 需要看到 agent 是 B 的、费用由 B 承担、哪些输入会被 B 看到。

### 3.3 计费要先记账，再决定谁付钱

用户当前约束是 "实际推理费用由 B 承担和支付"，这跟常规 marketplace 的 "A 付费购买 B 的 agent" 不同。

所以我们应先做 **cost ledger**，不是先做 creator monetization：

| 字段 | 含义 |
|---|---|
| `run_id` | 一次 agent run |
| `requester=A` | 谁发起 |
| `agent_owner=B` | 谁拥有 agent/runtime |
| `model_key_owner=B` | 谁付推理费 |
| `credential_subject=A/B/service` | tool call 用谁的外部账号 |
| `estimated_model_cost` | 运行前预估 |
| `actual_model_cost` | 实际 token / model 成本 |
| `tool_cost` | 第三方 API / browser / infra 成本 |
| `approval_events` | B 或 A 批准过什么 |
| `metering_events` | 可结算事件 |
| `failure_attribution` | 模型、B agent、A 输入、第三方 API、平台 |

以后如果要 monetization，可在 ledger 上加：

- A reimburse B
- 平台补贴 B
- B sponsor A
- org pool pay
- pay-per-task
- pay-per-seat

### 3.4 Attention layer 比 dashboard 更重要

AgentRQ、Ticlawk、Marmy、Hiloop 共同指向一个判断：

> 多 agent 后，用户不想看所有 session。用户只想在需要决策、审查、失败、超预算时被打断。

所以产品不应只是 "agent dashboard"，而应有：

- decision inbox
- approval cards
- diff/artifact review
- budget alert
- stalled run alert
- trust score / risk level
- "quiet unless needed" policy

---

## 4. 马上要研究的产品优先级

| 优先级 | 产品 | 研究目标 | 具体要看 |
|---|---|---|---|
| P0 | Slock | B-side local agent + collaboration primitive | daemon 接入、channel/DM semantics、agent memory、agent 资源共享、权限模型 |
| P0 | AgentRQ | task queue + supervisor/workspace split | workspace-scoped MCP、Supervisor MCP、OAuth/token、self-host deploy、task history |
| P0 | Hiloop | HITL interaction + encryption + approvals | message primitives、approval cards、E2E encryption、metadata/plaintext boundary、MCP server |
| P0 | Marmy | phone controls local terminal agent | local Rust agent、tmux session binding、file/diff review、Tailscale/token、push notification |
| P0 | agent-freeway / Ticlawk | runtime harness bridge + attention feed | Claude/Codex/OpenClaw adapter、Telegram/Ticlawk binding、安全警告、feed/inbox pattern |
| P0 | AgentGate | credential/action gate | read-through/write-approval 模型、credential isolation、MCP interface、rejected feedback |
| P1 | HiClaw | multi-agent rooms + credential proxy | Matrix room audit、Manager/Worker、Higress AI Gateway、shared filesystem |
| P1 | Agensi | paid capability package entitlement | fingerprinted downloads、80% creator share、security review、one-time purchase |
| P1 | Apify MCP | MCP monetization and payout | Actor.charge、billing event、payout、partner distribution |
| P1 | NEXUS | agent-to-agent settlement | A2A task lifecycle、reputation、per-task credit settlement |

---

## 5. 对当前四条约束的产品化建议

当前要构建的是：

1. 用户 A 可以使用用户 B 的 agent
2. 用户 B 的 agent 跑在用户 B 自己的环境里
3. 用户 A 需要获得用户 B 的授权
4. Agent 的实际推理费用由用户 B 来承担和支付

建议 MVP 不要叫 marketplace，而叫：

> **Authorized Remote Agent Session**

最小闭环：

1. B 在自己的机器/云里安装 connector。
2. B 连接一个 agent runtime，例如 Claude Code、Codex、OpenClaw、custom MCP/A2A agent。
3. B 创建一个授权 session：指定 A、任务范围、时长、预算、工具权限、是否需要每步审批。
4. A 在 web/IM/API 发起请求。
5. 请求进入 B 的 agent queue；agent 用 B 的模型 key 推理，所以推理费由 B 承担。
6. 高风险动作进入 B 的 decision inbox；低风险 read-only/tool-safe 动作可自动执行。
7. 运行结束后生成 run ledger：输入、输出、token cost、tool calls、approval events、失败归因。

这套 MVP 要优先防三类事故：

- A 借 B 的 agent/credentials 做越权动作。
- B 的 agent 看到/保存了 A 不该暴露的信息。
- B 承担了不可预期的模型或第三方 API 费用。

---

## 6. Sources

- Slock official: https://slock.ai/
- Slock slides by RC: https://slides.com/stdrc/slock
- 42章经 / Podwise Slock episode: https://podwise.ai/dashboard/episodes/7831210
- Koala OSS Slock note: https://koala-oss.app/news/1590/
- AgentRQ official: https://agentrq.com/
- AgentRQ GitHub: https://github.com/agentrq/agentrq
- AgentRQ Reddit discussion: https://www.reddit.com/r/ClaudeCode/comments/1syjm5t/mcp_humanintheloop_task_manager_lead_colony_of/
- AgentRQ OpenSourceeAI discussion: https://www.reddit.com/r/OpenSourceeAI/comments/1szn9gp/opensource_task_manager_for_ai_agents_mcp/
- Hiloop: https://hi-loop.com/
- Marmy: https://marmy.ai/ and https://github.com/marmy-ai/marmy
- Ticlawk: https://ticlawk.com/
- agent-freeway: https://github.com/darthjaja6/agent-freeway
- HiClaw: https://hiclaw.io/ and https://github.com/agentscope-ai/hiclaw
- OpenClaw docs: https://docs.openclaw.ai/concepts/agent
- MMNTM OpenClaw anatomy: https://www.mmntm.net/openclaw
- OpenClaw.report deepdive: https://openclaw.report/deepdive/what-is-openclaw-the-lobster-revolution
- askHuman docs: https://docs.askhuman.net/
- Lassare: https://lassare.com/
- AgentGate: https://agentgate.org/
- Mycelium: https://mycelium.fyi/
- Claude Code Remote Control: https://code.claude.com/docs/en/remote-control
- Claude Cowork Dispatch: https://claude.com/resources/tutorials/dispatch-in-claude-cowork
- HITL Relay: https://humanintheloop-relay.com/developers
- Agensi: https://www.agensi.io/
- NEXUS: https://nexusprotocol.dev/
- Apify MCP developers: https://apify.com/mcp/developers
- ChatForest MCP monetization guide: https://chatforest.com/guides/mcp-marketplace-monetization/
- AgentMarketCap discovery crisis: https://agentmarketcap.ai/blog/2026/04/11/ai-agent-marketplaces-discovery-2026
- DEV MCP monetization: https://dev.to/kirothebot/the-state-of-mcp-monetization-in-2026-where-builders-actually-get-paid-34k9
- ChatCollab: https://arxiv.org/abs/2412.01992
- SlackAgents: https://aclanthology.org/2025.emnlp-demos.76.pdf
- OpenClaw PRISM: https://arxiv.org/abs/2603.11853
- ClawSafety: https://arxiv.org/abs/2604.01438
- ClawWorm: https://arxiv.org/abs/2603.15727
