<!--
status: supporting
status_reviewed: 2026-07-17
evidence_level: strategic-reference
-->

# Claude Blog 2026-04 对 Agora 的启发

> 结论：Anthropic 最近的叙事不是“模型更聪明”，而是把 Agent 工程化成一套生产基础设施。对 Agora 来说，这同时是验证和压力：runtime、connector、memory、routine 正在被模型厂吃掉；我们的机会必须更清楚地站在第三方能力商品化层，即能力如何被发布、安装、验证、更新、分发和计费。

## 阅读范围

- Claude Blog 主页（2026-04 最新列表）：https://claude.com/blog
- New connectors in Claude for everyday life：https://claude.com/blog/connectors-for-everyday-life
- Built-in memory for Claude Managed Agents：https://claude.com/blog/claude-managed-agents-memory
- Building agents that reach production systems with MCP：https://claude.com/blog/building-agents-that-reach-production-systems-with-mcp
- Claude Managed Agents: get to production 10x faster：https://claude.com/blog/claude-managed-agents
- Harnessing Claude's intelligence：https://claude.com/blog/harnessing-claudes-intelligence
- Redesigning Claude Code on desktop for parallel agents：https://claude.com/blog/claude-code-desktop-redesign
- Introducing routines in Claude Code：https://claude.com/blog/introducing-routines-in-claude-code
- Using Claude Code: session management and 1M context：https://claude.com/blog/using-claude-code-session-management-and-1m-context
- Seeing like an agent: how we design tools in Claude Code：https://claude.com/blog/seeing-like-an-agent
- Multi-agent coordination patterns：https://claude.com/blog/multi-agent-coordination-patterns
- Improving frontend design through Skills：https://claude.com/blog/improving-frontend-design-through-skills
- Skills 产品页：https://claude.com/skills

## Anthropic 的真实方向

Anthropic 正在把 Claude 从聊天产品推进到一个 Agent OS：

1. Claude Code 负责开发者工作台：并行 session、diff、terminal、preview、local/cloud session。
2. Managed Agents 负责云端生产运行：sandbox、checkpoint、credential、permission、trace、multi-agent。
3. MCP / connectors 负责接入外部系统：auth、tool discovery、form/URL elicitation、vault。
4. Skills 负责按需加载能力和组织知识：把 prompt、流程、领域知识变成可复用文件夹。
5. Memory 负责跨 session 学习：filesystem-based memory、scope、audit log、rollback。
6. Routines 负责事件化和定时化：schedule、API trigger、webhook trigger。
7. Multi-agent patterns 负责复杂任务分解：generator-verifier、orchestrator-subagent、agent teams、message bus、shared-state。

这意味着 Agent 的基础能力正在从“prompt 技巧”变成“可配置、可审计、可部署的生产系统”。

## 对 Agora 的核心启发

### 1. 不能把自己讲成又一个 runtime

Anthropic 已经在做 Claude Code、Managed Agents、Memory、Routines。大厂会持续吃掉通用 runtime。Agora 更合理的位置是：

> 第三方 Agent 能力包的 Publisher + Installer + Verification + Update + Distribution + Billing layer。

换句话说，我们不应该说“我们让 Agent 能跑”，而应该说“我们让第三方沉淀出来的 Agent 能力变成可以买、装、跑、验、更新、续费的商品”。

### 2. 能力包要顺着 Claude 的原语长出来

Claude 的原语已经很清楚：Skill、MCP、connector、memory、routine、subagent、managed session。Agora 的能力包不应发明一套脱离生态的新抽象，而应成为这些原语的商品化封装。

一个 Agora Capability Package v0.1 可以定义为：

- `skill/`：任务方法、prompt、领域知识、示例和资源文件
- `mcp.json`：需要接入的工具、MCP server、OAuth scope
- `runtime.json`：Claude Code / Codex / Cursor / Agent-VM 的适配声明
- `memory_schema.md`：哪些状态可以长期记忆，哪些必须临时处理
- `routines.yaml`：可选的 schedule / webhook / API trigger
- `tests/`：smoke test、capability test、permission test、regression test
- `pricing.yaml`：license、update channel、support boundary、hosted protected step
- `manifest.lock`：版本、依赖、hash、发布者签名、兼容矩阵

Agent-VM 的位置因此更清楚：它是本地 install / activate / adapter 层，不是最终 marketplace 本身。

### 3. 为什么现在：能力已经可产品化，但交易层没跟上

Claude blog 展现的状态是：Agent 现在已经能接系统、跑长任务、跨 session 记忆、并行执行、定时触发、调用技能。但这些能力主要停留在一方平台内部。第三方创作者如果做出一个好 workflow，仍然缺：

- 怎样包装成跨环境可运行的 artifact
- 怎样让用户安装后一次成功
- 怎样证明它真的能做事
- 怎样把权限、凭据、隐私边界讲清楚
- 怎样持续更新和兼容模型/runtime 变化
- 怎样收费、续费、退款、处理争议

这就是 Agora 的市场空位。

### 4. Canonical tests 应该成为能力商品的核心，不是附属功能

Anthropic 在 multi-agent patterns 里反复强调 verifier 只有在 criteria 明确时才有意义。对 Agora 来说，canonical tests 不只是工程测试，而是交易信任的基础。

能力包商品页应该优先展示：

- 它能完成哪些标准任务
- 标准任务用什么输入、什么环境、什么权限跑
- 最近一次通过测试的 runtime / model / connector 版本
- 失败时是模型问题、权限问题、环境问题，还是 creator package 问题
- 更新是否破坏旧 case

如果没有这层，marketplace 会退化成 prompt/template 商店，用户无法判断购买后的真实交付质量。

### 5. 商业模式应从“卖文件”转为“卖持续可运行性”

Claude Skills 的文件夹形态会天然带来复制问题。能力包如果只是卖一个 skill 文件夹，本地分发后很难防复制。Claude blog 反而提示我们：用户真正愿意持续付费的东西不是静态文件，而是持续可运行性。

可收费对象应该是：

- verified install：安装、权限绑定、smoke test 一次跑通
- update channel：模型、MCP、connector、网站 UI 变化后的持续适配
- canonical test report：能力质量证明
- support boundary：失败归因和修复责任
- team/private registry：团队内复用和治理
- hosted protected step：creator 的高价值 know-how 不下发到本地
- distribution/reputation：创作者获客和信任背书

### 6. 安全叙事要升级为 Agent capability supply chain

Anthropic 的安全文章提醒了一个重要风险：AI 会提高攻击和漏洞发现速度。Agora 如果做第三方能力包分发，不能只讲“权限确认”，要把它讲成供应链安全问题。

能力包发布时应该做：

- 权限 diff：新版本比旧版本多要了什么权限
- secret scan：禁止把 creator 或用户凭据打进包里
- dependency scan：MCP server / npm / python dependency 的风险
- action audit：外部 API 调用、写文件、发消息、下单等高风险动作单独声明
- provenance：publisher identity、签名、版本 hash、构建记录
- rollback：坏版本快速回退

这部分是工程脏活，但会形成启动时间差。

## 对 BP 的改法建议

1. 在“为什么现在”里加一句：Claude 最近的产品节奏证明 Agent 已经进入生产基础设施阶段，接入、记忆、长任务、并行、定时触发都在成熟；缺口从“能不能跑”转向“第三方能力怎么交易和持续交付”。
2. 在“竞争格局”里明确：Anthropic 是底层 runtime / first-party distribution，不是直接等价竞争；真正风险是它未来补 marketplace + billing。
3. 在“产品形态”里把 v0.1 能力包写成兼容 Claude Skills / MCP / Agent-VM / Routines 的 manifest，而不是自造孤立格式。
4. 在“技术壁垒”里把 canonical tests、compatibility matrix、supply-chain security、install doctor、failure attribution 放到核心。
5. 在“商业模式”里强调卖持续可运行性：更新、验证、兼容、支持、保护步骤和分发，而不是卖 prompt 文件。

## 14 天内可执行动作

1. 定义 `agora-package.yaml` v0.1：skill、MCP、runtime、memory、routine、tests、pricing、permissions、manifest.lock。
2. 做一个 Claude Skill → Agora Capability Package 的 wrapper：读取现有 skill folder，补 manifest、tests、install script。
3. 做三个 lighthouse package：
   - 小红书运营助手：本地账号/浏览器/素材库 + hosted protected scoring step
   - Code review / repo onboarding：Claude Code skill + MCP + canonical tests
   - LLM Wiki compiler：Obsidian vault + skills + routine + memory schema
4. 做 install doctor：检查 runtime、依赖、connector、OAuth、权限、测试输入，最后给用户一个“可运行证明”。
5. 做商品页原型：不要先做 marketplace 首页，先做一个 package detail page，展示 demo、权限、测试、兼容、价格、更新记录。

## 最硬的一句话

Claude 正在把 Agent 变成生产系统；Agora 要把第三方 Agent 能力变成生产资料商品。

---
*Query output compiled from Claude official blog reading on 2026-04-29.*
