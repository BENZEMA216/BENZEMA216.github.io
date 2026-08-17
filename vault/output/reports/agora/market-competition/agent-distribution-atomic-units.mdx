<!--
date: 2026-04-27
tags: [agent-infrastructure, agent-distribution, multi-agent, delegation, marketplace, orchestration]
status: supporting
related:
  - "[agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/)"
  - "[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)"
  - "[agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/)"
  - "[agent-communication](/wiki/concepts/agent-communication/)"
  - "[agent-runtime](/wiki/concepts/agent-runtime/)"
-->

# Agent 分发的原子单元、组合模式与方法论

> Query: "AGENT 在分发上有哪些可以分发的原子单元和组合？和方式方法？"
> 日期: 2026-04-27

---

## TL;DR

这里的"分发"有两层，容易混在一起：

1. **能力分发**：把一个 agent 能力交付给用户、开发者或 marketplace 消费。问题是"卖/装/复用什么"。
2. **任务分发**：在运行时把一次复杂任务拆给 tools、subagents、workers、teams。问题是"谁来做哪一段，怎么交接"。

核心判断：

- **不要把"完整 agent"当作唯一分发单元**。真正可分发的是一组更小的原语：instructions、skills、tools/MCP、connectors、context packs、subagent definitions、workflow graphs、runtime workers、evals/guardrails、billing contracts。
- **最有商业价值的不是 prompt，而是 bundle**：`Skill + Tool/MCP + Context Pack + Permission Scope + Eval + Install/Billing`。Prompt 太容易复制；MCP 太像裸 API；完整 agent 又太重。中间层的 capability bundle 最像 agent 时代的 npm package / Chrome extension。
- **运行时任务分发的最小可靠单元不是"一句话任务"，而是 task packet**：目标、输入、上下文、边界、工具权限、写入所有权、输出 schema、验收标准、预算、handoff 格式必须一起给。
- **多 agent 只有在三类场景明显成立时才值得**：广度优先搜索、上下文隔离、独立并行执行。否则 Cognition/Devin 的反方提醒是对的：并行 agent 会产生隐含决策冲突。
- 对 BENZEMA 更像机会的是：**Claude Code / Cursor / Chrome 宿主里的垂直 capability marketplace**，而不是通用 agent store。首发包形态应是"本地 worker + 云端 registry/计费/审计"。

一句话：

> Agent 分发不是分发一个会聊天的壳，而是分发"可安装、可限权、可验证、可结算的能力包"；运行时再用明确 task packet 把工作分发给合适的 worker。

---

## 一、可分发的原子单元

### 1. Instruction / Prompt

最小的能力单元：system prompt、role prompt、few-shot examples、rubric。

适合：
- 角色风格、判断标准、写作规则、轻量工作流。
- 快速传播和试验。

问题：
- 可复制性太强，几乎没有防盗版。
- 只描述"怎么想"，不提供真实能力。
- 稍复杂就会和工具、上下文、权限耦合，单独分发价值低。

结论：**prompt 是能力包的源码片段，不是好商品本身**。

### 2. Skill

Skill 是比 prompt 更强的分发单元：说明文档 + 操作流程 + 可选脚本/模板/资产。Claude Skills、Claude Code Skills、本 vault 的 creative skills 都属于这一类。

适合：
- 稳定流程：写报告、做 code review、生成视频分镜、跑特定平台操作。
- 需要 progressive disclosure 的能力：平时只暴露 name/description，命中后再加载完整规则。

优点：
- 轻，可版本化，可装卸。
- 可以包含脚本和模板，比 prompt 更可执行。
- 与 Claude Code / Cursor 等宿主天然匹配。

问题：
- 如果没有工具/API，skill 仍然只能"指导"而不能"行动"。
- 如果没有 eval，很难证明质量。
- 本地执行时盗版难防。

结论：**Skill 是目前最好的 2C/indie agent 能力分发底座，但需要和工具、eval、计费组合**。

### 3. Tool / Function / MCP Server

Tool 是 agent 对外部世界的动作接口；MCP server 是当前最通用的分发形式。

适合：
- API 能力、数据库查询、浏览器控制、本地文件系统、第三方平台操作。
- 开发者消费，尤其是 BYOC / local tool 场景。

优点：
- 接口清晰，便于权限控制、日志、审计。
- 能被不同 agent runtime 复用。
- 和 registry/marketplace 结合后，像 agent 时代的 API package。

问题：
- 裸工具没有 workflow。用户装完还不知道怎么用。
- 工具描述差会直接导致 agent 误用。
- 权限与凭据管理是主要风险。

结论：**MCP 是分发"动作能力"的标准，不是完整产品；它需要 Skill/Workflow 告诉 agent 何时、为何、按什么顺序调用**。

### 4. Connector / Credential / Permission Scope

很多 agent 价值不是来自模型，而是来自它能访问用户的账号、文件、浏览器会话或本地 app。

可分发内容：
- OAuth connector。
- Browser cookie/session 绑定方式。
- 本地文件访问 scope。
- SaaS workspace 权限映射。
- Chrome extension permission。
- MCP tool allowlist/denylist。

适合：
- xhs / 抖音 / 淘宝 / LinkedIn / Gmail / Notion / Slack 等 identity-bound execution。
- 企业内权限治理。

问题：
- 这是信任模型的核心。cookie、token、私有文件一旦给错 agent，损失大。
- marketplace 要做不起来，通常不是因为 agent 不会写，而是因为用户不敢授权。

结论：**权限 scope 本身就是分发单元，而且可能比 prompt 更值钱**。

### 5. Context Pack / Memory Pack

Context pack 是可复用知识包：领域资料、案例库、用户偏好、品牌 voice、项目约定、决策日志、样例输入输出。

适合：
- 垂直行业 agent：法律、投研、内容运营、设计系统、代码库迁移。
- 组织内共享知识。
- 多 agent handoff 中保留决策背景。

优点：
- 直接提高 agent 质量。
- 可以成为 marketplace 中的"知识商品"。

问题：
- 需要 provenance、版本、时效、权限。
- 多 agent 共享 memory 时容易污染：不同 agent 写入的事实和判断可能互相矛盾。

结论：**context pack 是未来 agent 分发的高价值单元，但必须和来源、时效、授权、审计绑定**。

### 6. Subagent Definition

Subagent definition 包含：name、description、model、system prompt、tool allowlist、permission mode、memory、hooks。Claude Code 文档已经把它产品化。

适合：
- read-only explorer、reviewer、debugger、data analyst、security auditor、copywriter。
- 上下文隔离：让探索、日志、检索不污染主对话。
- 限权：某类 agent 只能读，不能写。

优点：
- 比单 tool 更有智能。
- 比完整 agent 更轻。
- 可以作为 Skill/Plugin 的一部分分发。

问题：
- subagent 之间通常不能直接沟通，只能回主 agent。
- 并行写共享状态会冲突。
- 太多 specialist 会让自动路由变差。

结论：**subagent definition 是运行时任务分发的核心单元，也是 marketplace 可以售卖的组件，但必须要求明确描述和工具边界**。

### 7. Workflow / Graph / SOP

Workflow 是固定或半固定拓扑：prompt chain、routing、parallelization、orchestrator-workers、evaluator-optimizer、LangGraph graph、CrewAI crew、Dify/Coze flow。

适合：
- 可预测流程：客服分流、内容审核、报告生成、数据管道。
- 需要稳定重复的业务流程。

优点：
- 可观察、可测试、可回放。
- 比让一个 agent 自由发挥更可控。

问题：
- 动态性弱。任务变化大时，固定 graph 会膨胀。
- DSL/图编辑器容易把简单问题复杂化。

结论：**workflow 是团队/企业最容易采购的分发单元，但 2C 场景可能太重；更适合打包成模板，而不是让用户手画图**。

### 8. Agent App / Actor

完整 agent app 是用户可直接运行的成品：Coze bot、GPT、Apify Actor、Poe bot、Agentforce agent、browser operator。

适合：
- 用户不想理解底层组件，只想"点一下运行"。
- 输入输出非常明确的任务。

优点：
- 交付完整，用户门槛低。
- 适合 marketplace 展示、评分、付费。

问题：
- 平台锁定严重。
- 泛化范围常被夸大。
- 复杂账号/本地执行场景很难纯云端托管。

结论：**完整 agent app 是消费层包装，不是底层原子；真正要运营 marketplace，需要拆到更小单元才能复用和治理**。

### 9. Runtime / Worker / Sandbox

Runtime 是 agent 真正执行的地方：云端 sandbox、本地 worker、browser environment、desktop automation、Temporal workflow、Claude Managed Agents session。

适合：
- 长任务、定时任务、浏览器任务、代码执行、本地账号任务。
- 需要恢复、重试、checkpoint、审计的生产任务。

优点：
- 解决"能不能跑完"而不只是"能不能想明白"。
- 支持 orchestrator-worker：控制面在云，执行面在用户本地。

问题：
- 安装、权限、稳定性、always-on 都难。
- 沙箱和本地 app 控制的安全边界复杂。

结论：**runtime 是分发的基础设施层；如果不想自建，应该寄生 Claude Code / Cursor / Chrome / Browserbase / Temporal 等宿主**。

### 10. Eval / Guardrail / Policy

Eval 和 guardrail 是常被忽略的分发单元：测试集、judge prompt、权限规则、approval policy、rollback policy、trace schema。

适合：
- code review、安全、支付、发布、数据修改、企业流程。
- marketplace 的信任证明。

优点：
- 能把"这个 agent 很强"变成可验证声明。
- 能支撑付费、退款、SLA。

问题：
- 难做得通用。
- 创意任务的 eval 很难客观化。

结论：**没有 eval/guardrail 的 agent package 只能算玩具；能商业化的分发必须附带验证机制**。

### 11. Billing / Settlement Contract

这不是技术能力，但它决定 agent 能力能不能成为商品。

可分发内容：
- 订阅。
- 按调用。
- 按任务成功。
- revenue share。
- 一次性 license。
- execution token。
- 本地执行 + 云端关键能力计费。

适合：
- marketplace。
- BYOC skill market。
- agent-to-agent paid context/tool calls。

问题：
- 本地执行防盗版难。
- 调用归因和成本对账难。

结论：**Agent 经济的空白不在"能不能调用"，而在 discovery + trust + billing + audit**。

---

## 二、运行时任务分发的原子单元

如果说上面是"卖什么/装什么"，这里是"跑的时候拆什么"。

### 最小可靠 task packet

不要只给 subagent 一句"研究一下 X"。一个可分发任务至少应包含：

```yaml
task:
  objective: 要完成什么
  non_goals: 不做什么
  inputs: 输入文件、URL、数据、用户原话
  context_packet: 必要背景、已知约束、已做决策
  tool_scope: 允许/禁止的工具
  write_ownership: 哪些文件/资源可写，哪些只读
  output_schema: 返回结构、字段、格式
  success_criteria: 怎么判断完成
  budget: token/时间/调用次数上限
  deadline: 是否阻塞主路径
  conflict_policy: 和其他 worker 冲突时如何处理
  handoff_format: 给下一个 agent/主 agent 的交接格式
```

Anthropic 的 multi-agent research 经验也指向同一点：subagent 需要 objective、output format、tool/source guidance、clear boundaries，否则会重复工作、留下空白或找错方向。

### 运行时可拆的工作单元

| 单元 | 例子 | 适合分发给谁 | 风险 |
|---|---|---|---|
| 单个 tool call | 查 API、读文件、跑测试 | tool/runtime | 权限和并发安全 |
| tool call batch | 同时读 10 个文件、并行搜索 5 个关键词 | 并发 executor | 速率限制、结果聚合 |
| research question | "查竞品 A/B/C 的定价" | read-only subagent | 搜索重复、引用不准 |
| codebase slice | "只负责 auth 模块" | worker subagent | 跨模块隐含依赖 |
| pipeline stage | 先规划、后实现、再测试 | sequential subagents | handoff 信息丢失 |
| independent variants | 三版文案、三种 UI 方案 | parallel workers | 输出风格不统一 |
| verifier task | 审核实现、安全检查、事实核查 | fresh reviewer | 标准不明确会空泛 |
| long-running run | 定时监控、批量抓取、持续运营 | durable worker | checkpoint/恢复/成本 |
| human approval step | 支付、删除、发布、发私信 | HITL gate | 卡住流程 |
| memory update | 写入偏好、决策、总结 | memory agent | 记忆污染、过时 |

关键不是"能不能拆"，而是**拆完是否减少主路径认知负担**。如果拆完还要主 agent 花更多时间合并冲突，就不该拆。

---

## 三、组合模式

### 1. Augmented LLM

组合：

```text
Model + Instructions + Tools + Memory
```

这是最小 agent。Anthropic 把它称为 agentic system 的 building block。

适合：
- 单人单任务。
- 工具数量少、边界清楚。

不适合：
- 工具相似度高。
- 上下文很长。
- 需要多视角审查。

### 2. Skill + MCP = Portable Capability

组合：

```text
Skill(何时/如何用) + MCP Server(实际动作) + Examples + Permissions
```

这是最像"agent package"的中间层。

例子：
- `xhs-research.skill` + local browser MCP。
- `video-storyboard.skill` + 即梦/Runway/Kling tools。
- `code-review.skill` + repo read/test tools。

价值：
- Skill 负责 workflow 和判断。
- MCP 负责动作。
- Permission scope 负责安全。

这是 BENZEMA 做 marketplace 的优先形态。

### 3. Specialist Subagent

组合：

```text
Subagent Definition + Tool Allowlist + Memory Scope + Output Contract
```

适合：
- explorer、reviewer、debugger、security、data analyst。

Claude Code 的实践信号：
- 需要读很多文件 → 派 explorer。
- 多个独立任务 → 后台 subagents 并发。
- 需要 fresh perspective → 派 reviewer。
- 同文件写入、强依赖链路、小任务 → 不派。

### 4. Prompt Chain / Pipeline

组合：

```text
Step A -> Gate -> Step B -> Gate -> Step C
```

适合：
- 固定流程，如提取 → 规范化 → 排序 → 格式化。
- 每一步输出可以检查。

优点是可靠；缺点是灵活性低。

### 5. Routing

组合：

```text
Classifier -> Specialist A/B/C
```

适合：
- 客服、工单、内容类型、模型成本路由、工具路由。

分发方法：
- 规则路由：最稳定。
- LLM 分类：灵活。
- embedding/semantic routing：适合大量能力包。
- eval-driven routing：根据历史成功率/成本动态选择。

### 6. Parallelization / Scatter-Gather

组合：

```text
Input -> Worker 1
      -> Worker 2
      -> Worker 3
Aggregator -> Final
```

两种：
- **Sectioning**：不同切片并行处理。
- **Voting**：同一任务多次独立尝试，再投票或综合。

适合：
- 广度优先 research。
- 多视角评估。
- 多变体创作。
- 多文件只读分析。

不适合：
- 共享写状态。
- 强依赖顺序。
- 每个 agent 都需要完整隐含上下文的任务。

### 7. Orchestrator-Workers

组合：

```text
Lead agent -> dynamic task decomposition -> workers -> synthesis
```

这是 Anthropic Research 和很多 coding agent 的核心形态。

适合：
- 不能预先知道子任务数量和类型。
- 广度探索明显有价值。
- worker 之间低依赖。

代价：
- Anthropic 公开数据里，multi-agent 通常比普通 chat 多得多 token，Research 场景可到 chat 的约 15x；只有高价值任务才划算。

### 8. Manager Agents-as-Tools

组合：

```text
Manager owns conversation
Specialist agents exposed as tools
Manager synthesizes final answer
```

OpenAI Agents SDK 推荐的核心模式之一。

适合：
- 最终答复必须由一个 owner 负责。
- 需要统一 guardrails。
- specialist 只是帮忙，不直接接管用户。

这是大多数产品的默认安全模式。

### 9. Handoff / Decentralized Agents

组合：

```text
Triage agent -> transfer_to_refund_agent -> specialist owns next turn
```

OpenAI 和 Microsoft Agent Framework 都把 handoff 做成特殊 tool call。

适合：
- 用户面对的多部门流程。
- 专家需要直接和用户多轮交互。
- 每个 agent 有不同 instructions/model/tools。

风险：
- 上下文同步。Microsoft 文档中特别强调 handoff orchestration 下不同 agents 不共享同一 session，需要广播用户和 agent 消息来保持一致，但 tool call 内容不会广播。

### 10. Blackboard / Shared State

组合：

```text
Workers read/write shared workspace
Supervisor watches state and dispatches
```

适合：
- 多 agent 需要围绕同一任务状态协作。
- 不是简单点对点 handoff。

关键：
- 写入 schema。
- provenance。
- locking。
- stale data 处理。

没有这些，blackboard 会变成多人乱写的 markdown。

### 11. Evaluator-Optimizer

组合：

```text
Generator -> Evaluator -> Feedback -> Generator ...
```

适合：
- 有明确质量标准。
- 反馈能稳定改善结果。
- 代码、翻译、安全、报告事实核查。

不适合：
- 标准模糊的创意任务，除非人类给 rubric。

### 12. Orchestrator-Worker Product Architecture

组合：

```text
Cloud control plane:
  registry + install + billing + audit + updates

Local execution plane:
  browser/session/files/apps + local worker + permissions
```

适合：
- xhs、抖音、淘宝、Gmail、LinkedIn、本地 repo、本地 app。
- 账号和 cookie 不能上云的 identity-bound execution。

这是前一篇 `agent-distribution-orchestrator-worker.md` 的核心结论：它不是 decentralized，而是中心化 control plane + 本地 execution plane。

---

## 四、分发方式方法

### 方法 1：Registry / Marketplace

把能力包放到一个可搜索、可评分、可安装、可计费的目录。

适合：
- Skills。
- MCP servers。
- Agent apps。
- Workflow templates。
- Context packs。

关键能力：
- manifest 标准。
- capability tags。
- 权限声明。
- 版本管理。
- 安装脚本。
- sandbox 审核。
- 评价/成功率/成本展示。
- 结算。

### 方法 2：Package Manager / CLI Install

像 npm/pip/brew 一样安装：

```bash
agent install xhs-scout
agent enable xhs-scout --scope browser:xhs --billing monthly
```

适合 developer/creator 工具。比纯网页 marketplace 更适合 Claude Code / Cursor 宿主。

### 方法 3：Plugin Bundle

把多个单元打包：

```text
plugin/
  manifest.yaml
  skills/
  mcp/
  agents/
  workflows/
  evals/
  memory/
  permissions.yaml
  pricing.yaml
```

这是我认为最应该产品化的分发形态。

### 方法 4：Agent-as-a-Tool

把 specialist agent 暴露成 manager 可调用的 tool。

适合：
- 统一入口产品。
- 需要主 agent 控制最终输出。
- 不想让 specialist 直接面对用户。

### 方法 5：Handoff Tool

把"转交给某 agent"建模成 tool call。

适合：
- 客服/销售/售后/IT 支持。
- 多轮 conversation ownership 转移。

需要：
- context sync。
- handoff rules。
- user-visible transition。
- approval/checkpoint。

### 方法 6：Task Queue / Durable Workflow

把任务写入 queue，由 worker 消费，并用 Temporal/LangGraph/Agent runtime 做 checkpoint。

适合：
- 长任务。
- 定时任务。
- 可恢复任务。
- 多 worker 并发。

关键：
- 每步 event log。
- retry policy。
- idempotency。
- cancellation。
- cost accounting。

### 方法 7：Local Worker Enrollment

用户安装本地 worker，云端发任务，本地执行。

适合：
- xhs/抖音/淘宝/LinkedIn/Gmail。
- 本地 app 控制。
- 私有 repo/文件。

关键：
- 一次性 execution token。
- 最小权限。
- 日志脱敏。
- 用户可见的 approval。
- worker 在线状态。
- 可选云端 fallback。

### 方法 8：Context Exchange / Paid Context Call

Agent A 向 Agent B 购买或请求某段 context。

适合：
- KAN。
- 垂直知识 agent。
- 企业内部跨部门知识。

需要：
- context provenance。
- freshness。
- permission。
- price。
- audit。

这是 `org-context-landscape-2026.md` 里指出的空白：agent-to-agent context 的路由、审计、计费层。

### 方法 9：Eval-Gated Distribution

发布前必须跑 eval，安装页展示结果。

适合：
- 安全、代码、金融、医疗、企业 workflow。

机制：
- package 提供 eval suite。
- registry 复跑核心 benchmark。
- 用户侧运行 smoke test。
- runtime 记录成功率和失败原因。

没有 eval 的 marketplace 会变成 GPT Store 式噪声市场。

---

## 五、什么时候该分发，什么时候不该分发

### 该分发给 subagent / worker 的信号

- 需要读大量资料，但主上下文不需要保留原始过程。
- 多个子任务相互独立。
- 需要不同工具权限。
- 需要不同模型成本层级。
- 需要 fresh review。
- 任务有明确输出 schema。
- 可以被自动验证。
- 失败可以局部重试。

### 不该分发的信号

- 多个 worker 会改同一个文件或同一账号状态。
- 子任务之间隐含决策强依赖。
- 每个 agent 都需要完整上下文才能不犯错。
- handoff 后主 agent 还要花大量时间猜测 worker 做了什么。
- 任务很小，分发开销大于收益。
- 没有明确验收标准。

### 决策树

```text
1. 单 agent + 好工具能做吗？
   能 -> 先别拆。
   不能 -> 继续。

2. 问题是工具太多/指令太复杂吗？
   是 -> 拆 specialist agent 或 skill。

3. 问题是上下文太长吗？
   是 -> 派 read-only explorer / context compiler。

4. 子任务互不依赖吗？
   是 -> parallel scatter-gather。
   否 -> prompt chain / pipeline。

5. 需要一个最终 owner 统一输出吗？
   是 -> manager agents-as-tools。
   否 -> handoff / decentralized。

6. 会写共享状态吗？
   是 -> 单 owner / lock / sequential handoff。
   否 -> 并发可行。

7. 绑定用户本地身份或 cookie 吗？
   是 -> orchestrator-worker，本地执行。

8. 输出能自动评估吗？
   能 -> evaluator-optimizer / eval-gated。
   不能 -> 加 human checkpoint。
```

---

## 六、给 BENZEMA 的产品化建议

### 推荐分发单元：Capability Bundle

不要从"agent store"开始。从更小但可售卖的 bundle 开始：

```text
Capability Bundle =
  Skill
  + MCP/tool connector
  + Subagent definitions
  + Permission scope
  + Context pack
  + Evals/smoke tests
  + Install script
  + Billing contract
```

manifest 示例：

```yaml
name: xhs-scout
version: 0.1.0
host:
  - claude-code
  - cursor
  - chrome-worker
capabilities:
  - xhs.search
  - xhs.profile_analyze
  - xhs.note_collect
permissions:
  browser:
    domains: ["xiaohongshu.com"]
    requires_user_session: true
  files:
    write: ["output/xhs/"]
agents:
  - xhs-explorer
  - xhs-analyst
  - copywriter
workflows:
  - competitor_scan
evals:
  - smoke_login_detect
  - no_private_data_upload
billing:
  model: subscription
  price: 199 CNY / month
  metering: execution_token
```

### 首发组合

最小可卖版本：

```text
Claude Code Skill
+ local browser MCP
+ xhs workflow template
+ read-only explorer subagent
+ report writer subagent
+ smoke test
+ registry page
+ monthly license / execution token
```

不要一开始做：
- 通用 agent marketplace。
- 自己的完整 runtime。
- 去中心化 agent 网络。
- agent-to-agent 通用协议。

### 关键护城河

1. **安装和权限体验**：用户敢不敢把账号交给本地 worker。
2. **垂直 workflow**：不是 MCP server 列表，而是能跑出结果的 SOP。
3. **评测和审计**：证明不偷 cookie、不乱发内容、不越权。
4. **计费绑定关键服务**：本地代码可复制，但关键 LLM call、反爬策略、模板更新、日志审计、评价体系可以在云端。
5. **宿主寄生**：先吃 Claude Code / Cursor / Chrome 的安装基础，不自建 agent IDE。

### 反直觉点

- 最值得卖的可能不是"agent"，而是**带权限、测试、安装、结算的 Skill+MCP bundle**。
- 最值得分发的上下文不是"所有记忆"，而是**带 provenance 的决策日志和行业 context pack**。
- 最重要的调度能力不是"开很多 agent"，而是**知道哪些任务不能并行**。
- Agent marketplace 的质量问题不是 discovery alone，而是**没有 eval-gated trust**。

---

## 七、资料来源

### Vault 内部

- `output/reports/agora/02-market-competition/agent-distribution-orchestrator-worker.md` — Agent 分发六形态、orchestrator-worker、xhs wedge。
- `output/reports/agora/02-market-competition/org-context-landscape-2026.md` — context 路由、审计、计费空白。
- `output/reports/agent-tool-concurrency-discussion.md` — sync handle/async future、per-tool concurrency safety。
- `wiki/concepts/sub-agent-architecture.md` — Main/Explore/Plan、context firewall。
- `wiki/concepts/agent-communication.md` — MCP/A2A、7 种通信模式。
- `wiki/concepts/agent-runtime.md` — durable execution、session、checkpoint。
- `wiki/concepts/tool-routing.md` — Tool Search、progressive disclosure。
- `raw/articles/learning-notes/0615-agent-architectures.md` — Anthropic vs Cognition/Devin vs Google MASS 的本地学习笔记。

### 外部资料

- Anthropic, [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), 2024-12-19 — prompt chaining / routing / parallelization / orchestrator-workers / evaluator-optimizer。
- Anthropic, [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system), 2025-06-13 — Research 的 orchestrator-worker、多 agent 适用边界、token 成本与 eval 经验。
- Claude, [How and when to use subagents in Claude Code](https://claude.com/blog/subagents-in-claude-code), 2026-04-07 — subagent 适用信号、并行/隔离/fresh perspective、不要使用的场景。
- Claude Code Docs, [Create custom subagents](https://code.claude.com/docs/en/sub-agents) — subagent frontmatter、工具权限、后台并发、chain subagents。
- OpenAI, [Agent Orchestration | Agents SDK](https://openai.github.io/openai-agents-js/guides/multi-agent/) — agents-as-tools、handoffs、code orchestration、parallel execution。
- OpenAI, [A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) — manager vs decentralized multi-agent、何时拆 agent。
- Microsoft Learn, [Agent Framework Handoff orchestration](https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/handoff) — handoff rules、context sync、tool approval、checkpointing。
- LangGraph, [langgraph-supervisor JS reference](https://langchain-ai.github.io/langgraphjs/reference/modules/langgraph-supervisor.html) — supervisor、hierarchical agents、message history、memory。
- Zhou et al., [Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies](https://arxiv.org/abs/2502.02533), arXiv 2025/2026 — prompt + topology 的联合优化，MASS。
- Jason Liu, [Why Cognition does not use multi-agent systems](https://jxnl.co/writing/2025/09/11/why-cognition-does-not-use-multi-agent-systems/) — 对 Cognition "Don't Build Multi-Agents" 的二手整理：上下文传递与隐含决策冲突。
