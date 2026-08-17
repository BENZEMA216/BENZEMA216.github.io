# Keystroke：把 coding agent 写出的 TypeScript 变成可运营的内部 Agent

> **一句话结论**：Keystroke 不是一个通用聊天 Agent，也不只是一个 Agent SDK；它是一套面向 coding-agent 团队的内部 Agent / 自动化开发与运行平台。AI builder 负责把业务需求写成真实 TypeScript，Keystroke Cloud 再负责部署、模型、凭证、触发器、持久化运行、Slack/Web/API 入口、History 与团队管理。

**研究日期**：2026-08-06  
**研究入口**：[用户给出的 Agents Overview](https://keystroke.ai/docs/learn/agents/overview)  
**代码快照**：[keystrokehq/keystroke](https://github.com/keystrokehq/keystroke) <code>d9f7809961c1e52f81b941b2bacc8776b93acc41</code>  
**证据边界**：主要使用官方文档、官方 GitHub 与 YC Launch；未登录产品、未连接真实凭证、未跑 Keystroke Cloud。公开仓库可以证明 source-available runtime 的实现，不等同于验证托管 Cloud 的 SLA、全部企业功能或真实客户效果。

## 0. 先回答最关心的三个问题

| 问题 | 结论 |
|---|---|
| 它怎样定义 Agent？ | 一个能理解请求、在运行时决定路径、选择工具、使用 memory 和 files，并持续执行到回答或完成任务的 LLM worker。工程上是 <code>instructions + model + allowlisted tools + context/state + session tool loop</code>。 |
| Agent 对用户有什么用？ | 把原来需要人跨多个 SaaS 查资料、判断、执行和跟进的半结构化工作，变成可从 Slack、Web、API 或 Trigger 反复调用的内部服务。它的价值不只是生成文字，而是完成跨系统动作并留下运行记录。 |
| 用户流程与技术实现是什么？ | Builder 用 platform agent、Cursor/Claude Code/Codex + CLI，或 hosted MCP 写同一套 TypeScript；测试后部署。运行时创建/续接 session，组装 memory、skills/files、credentials、tools、sandbox，进入多步 LLM tool loop，逐步保存 tool event、usage、checkpoint 和最终结果。 |

我的总体判断是：

1. **产品 wedge 成立**：Keystroke 填的是“coding agent 已经能写 Agent 代码，但团队还缺生产运行层”的断层。
2. **Agent runtime 比营销页看起来更完整**：公开源码中有真实的 context assembly、tool loop、memory、crash resume、context compaction、credential resolution、sandbox 和 tracing。
3. **它不是成熟的通用自治治理平台**：通用 per-tool approval、自动事实验证、原生 browser use、更多外部渠道、完整 visual builder 与部分企业治理仍缺失或未普遍开放。
4. **最合理的使用方式不是 all-in Agent**：固定步骤交给 Workflow，模型只负责其中真正不确定的判断；高风险副作用用 Workflow hook 做人工批准。

## 1. 这个产品到底是什么

### 1.1 实际输入、产物与输出

Keystroke 的真实产品链不是“输入一句 prompt，输出一段回答”，而是：

~~~text
输入
业务目标 + 现有 SOP + Apps/credentials + Files/Skills + 约束
  ↓
构建产物
Action / Agent / Workflow / Trigger 的 TypeScript + tests
  ↓
部署产物
可运行的 live project
  ↓
运行输入
Slack 消息 / Web chat / HTTP / cron / webhook / poll / parent workflow
  ↓
运行输出
回答、报告、外部系统写入、通知、任务、dashboard
+ session / tool calls / errors / cost / trace / status
~~~

因此更准确的产品类别是：

> **coding-agent-native internal automation platform**

它不是在模型层与 OpenAI、Anthropic 竞争，而是在模型之上提供 authoring、runtime 和 operations。官方首页直接把自己称为“为 coding agent 构建的 n8n 替代”，文档则把 Agent、Workflow、Action、Trigger、credentials、run history 和团队 workspace 放进同一个项目模型。[官网](https://keystroke.ai/)、[Introduction](https://keystroke.ai/docs/index)、[Explore features](https://keystroke.ai/docs/explore-features)

### 1.2 它要解决的两个断层

[YC Launch](https://www.ycombinator.com/launches/RNB-keystroke-open-sourcing-our-internal-agents-automations-platform)对问题的描述很清楚：

1. **Visual automation 的扩展性断层**  
   n8n、Gumloop 一类产品能很快搭出流程，但复杂后容易变成难 review、难测试、难 typecheck、难 debug 的 JSON/节点系统。

2. **Code-first framework 的生产化断层**  
   TypeScript、Git、tests 和 coding agents 对开发者很友好，但 chat UI、streaming、OAuth、credentials、integrations、run history、permissions、sharing 和部署通常仍要团队自己搭。

Keystroke 的方案不是发明一种新 Agent 算法，而是把两边拼在一起：

> **用 coding agent 写可审查的代码，再用 Keystroke 把代码变成团队能长期使用的服务。**

这也是它与 Dify/Coze/n8n 型画布产品最根本的差异：当前主 artifact 是 TypeScript，不是 workflow JSON，也不是平台数据库里的一组隐藏配置。[GitHub README](https://github.com/keystrokehq/keystroke)

### 1.3 产品对象不是一个 Agent，而是一套分工明确的 primitives

| 对象 | 责任 | 不应该承担什么 |
|---|---|---|
| Project | 代码、部署、成员、凭证和运行历史的基本隔离单元 | 不等同于单个 Agent |
| Action | 带 Zod input/output 的 typed leaf capability | 不负责开放式规划 |
| Agent | 运行时路径不固定，由模型判断下一步 | 不适合承载所有固定业务步骤 |
| Workflow | 普通 async TypeScript 组成的已知序列，支持 durable step、retry、sleep、hook | 不负责自由探索 |
| Trigger | cron、webhook、poll；定义何时启动及怎样转换输入 | 不放核心业务逻辑 |
| Skill | 按需加载的程序性 playbook | 不是长期业务数据 |
| File | 随项目版本化部署的稳定静态资料 | 不适合作为 Agent 自写 memory |
| Memory | 单 Agent 的会话历史与 agent-curated 长期记忆 | 不是组织级权威知识库 |
| Company Brain | 多 Agent / 多项目共享的检索型组织知识 | 当前仍是 request-only early access |
| App / Credential | 外部服务与其具体授权连接 | Credential 不直接写在 Agent 定义中 |
| Session / Run | 一次多轮 Agent 会话或 Workflow 执行的状态与证据 | 不等同于部署版本 |

来源：[Actions](https://keystroke.ai/docs/learn/actions/overview)、[Agents](https://keystroke.ai/docs/learn/agents/overview)、[Workflows](https://keystroke.ai/docs/learn/workflows/overview)、[Triggers](https://keystroke.ai/docs/learn/triggers/overview)、[Credentials](https://keystroke.ai/docs/learn/credentials/overview)、[Company Brain](https://keystroke.ai/docs/learn/settings/company-brain)。

最关键的架构关系是：

~~~text
Trigger 决定何时启动
  ↓
Workflow 管理已知顺序、重试、等待与批准
  ↓
Agent 只处理运行时不确定的判断
  ↓
Action 执行确定性的外部能力
~~~

## 2. Keystroke 怎样定义 Agent

### 2.1 官方定义

官方将 Agent 定义为一种 LLM-powered worker：它能针对请求推理、选择工具、使用 memory、读取 files，并继续工作直至给出答案或完成任务。官方同时明确：如果步骤预先已知，应该使用 Workflow；如果路径只能在运行时决定，才使用 Agent。[Agents Overview](https://keystroke.ai/docs/learn/agents/overview)

最小 Agent 放在 <code>src/agents/</code>，通过 <code>defineAgent()</code> 默认导出。必填字段是：

- <code>slug</code>
- <code>name</code>
- <code>description</code>
- <code>systemPrompt</code>
- <code>model</code>

可选字段包括 <code>thinkingLevel</code>、<code>maxSteps</code>、<code>tools</code>、<code>skills</code>、<code>sandbox</code>、<code>memory</code>；默认最大 tool-loop steps 是 100。[Build agents](https://keystroke.ai/docs/learn/agents/build-agents)

### 2.2 更完整的工程定义

结合文档和源码，Keystroke Agent 可以表达为：

~~~text
Agent
= Identity
  slug / name / description

+ Policy
  systemPrompt / model / thinking / step limit

+ Context
  current request / session history / files / skills / memory / Brain

+ Action surface
  Actions / Workflows / subagents / MCP / web / shell

+ State
  session transcript / memory filesystem / workspace / trigger state

+ Runtime loop
  model → tool call → observation → next model step → stop

+ Operations
  queue / checkpoint / trace / cost / status / History
~~~

这与知识库里的 [harness-engineering](/wiki/concepts/harness-engineering/)、[agent-loop](/wiki/concepts/agent-loop/) 和 [agent-runtime](/wiki/concepts/agent-runtime/) 一致：一个工程完整的 Agent 不是模型本身，而是模型、Context、Action、State、Verification 与 Control 的组合。

### 2.3 产品里其实有两种 Agent

这是理解 Keystroke 最容易混淆的地方。

| 名称 | 谁在用 | 做什么 | 产物 |
|---|---|---|---|
| Platform agent / coding agent | Builder | 读取文档和项目，写 TypeScript、测试、部署 | Agent/Workflow/Action/Trigger 代码 |
| Deployed business Agent | 最终业务用户 | 运行时理解业务请求、选择工具、执行任务 | 回答、外部动作与 run history |

第一种 Agent 是“造系统的 Agent”；第二种 Agent 是“系统里工作的 Agent”。Web platform agent、Cursor、Claude Code、Codex 和 hosted MCP 都属于 authoring side；<code>defineAgent()</code> 定义出来并部署的 Agent 才属于 runtime side。[Platform agent](https://keystroke.ai/docs/build-with-ai/platform-agent)、[Web App Chat](https://keystroke.ai/docs/learn/web-app/chat)

如果不把两者分开，官网的“用 Agent 构建 Agent”会显得循环且难理解；分开后，产品逻辑就是：

> coding agent 是开发界面，business Agent 是部署后的内部软件。

## 3. Agent 对用户到底有什么用

### 3.1 不是“多聊几轮”，而是完成可重复的跨系统工作

Agent 的增量价值来自五件事：

1. **路径可动态决定**：用户只说明目标，不必把所有分支预先画成节点。
2. **能行动**：调用 Actions、Workflows、MCP、subagents、web 和 sandbox，而不是只输出文本。
3. **能携带组织 Context**：使用 Files、Skills、session history、persistent memory，以及未来的 Company Brain。
4. **能反复进入日常工作**：从 Slack、Web、API、schedule、webhook 或 poll 触发。
5. **能被运营**：保留 messages、tool calls、error、timing、usage、cost 和 trace。

来源：[Run agents](https://keystroke.ai/docs/learn/agents/run-agents)、[Agent tools](https://keystroke.ai/docs/learn/actions/agent-tools)、[Agent runs](https://keystroke.ai/docs/learn/logs/agent-runs)。

### 3.2 三类角色获得的价值不同

| 角色 | 实际入口 | 主要价值 |
|---|---|---|
| Builder | Platform agent、Cursor、Claude Code、Codex、CLI | 用 coding agent 生成真实 TypeScript，同时保留 Git、tests、typecheck 和 escape hatch |
| Operator / Admin | Project、Credentials、Deploy、History、Settings | 管理授权、上线、失败、费用、成员和变更 |
| End user | Slack、Web Agent page、自有系统 API | 不理解代码也能使用；往往永远不打开 Keystroke builder |

因此，它的销售对象可能是技术团队，但日常受益者可以是 Support、Sales、Ops、Finance 或产品团队。合理闭环不是“每个员工都来搭 Agent”，而是：

> **少数 Builder 创建，明确的 Operator 负责，更多 End users 在原有工作入口里持续消费。**

### 3.3 五个场景，用 input → loop → output 看价值

#### 场景 A：数据分析 Agent

- Input：同事在 Slack 问临时业务问题，或 Agent 定时检查指标。
- Loop：查 Postgres/PostHog，读取 schema 文件，必要时创建 Metabase dashboard，结合 memory 和自调度 trigger。
- Output：Slack 答案、dashboard、异常告警。
- 证据：中高。创始人在 YC Launch 描述了内部 Agent Delbert 的实际 dogfood，但仍是第一方陈述，不是独立客户案例。[YC Launch](https://www.ycombinator.com/launches/RNB-keystroke-open-sourcing-our-internal-agents-automations-platform)

#### 场景 B：会议后的行动闭环

- Input：定时 poll Granola，取得新会议 transcript。
- Loop：Agent 提取决定、action items 和 owner；Workflow 确定性写入 Linear，再发 Slack。
- Output：带 owner 的 recap、Linear tasks、团队通知。
- 证据：中。Quickstart 和官方 use-case prompt 都给出该路径，未见生产效果数据。[Quickstart](https://keystroke.ai/docs/quickstart)、[Use cases](https://keystroke.ai/docs/use-cases)

#### 场景 C：研究 Agent

- Input：Slack 中 tagged message 或 Web chat 里的研究主题。
- Loop：web search/fetch，多来源对比，调用 Skills、Files 或 subagent。
- Output：带 source links 的结构化报告，回 Slack 或写入外部文档。
- 证据：中。属于官方 Agent overview 的典型用例，能力组件可逐项验证，未见外部客户案例。[Agents Overview](https://keystroke.ai/docs/learn/agents/overview)

#### 场景 D：Support engineer

- Input：客户问题、Intercom bug 或 Slack mention。
- Loop：读取产品文档和客户资料；复杂情形检查 GitHub、复现问题、查 Linear；低置信度或高风险步骤交给人。
- Output：回复草稿、bug issue、修复 PR 或升级处理。
- 证据：中。官方提供 build example 和 use-case prompt，但“bug 到 PR 再回复”的生产闭环仍需实测。[Build agents](https://keystroke.ai/docs/learn/agents/build-agents)、[Use cases](https://keystroke.ai/docs/use-cases)

#### 场景 E：Morning briefing

- Input：工作日 schedule；读取 Calendar、Gmail、Linear。
- Loop：汇总会议、待回复邮件和阻塞任务，判断优先级。
- Output：一条 Slack 日程与风险简报。
- 证据：中低。主要来自首页演示和 Quickstart prompt，可实现不等于已有客户采用。[官网](https://keystroke.ai/)、[Quickstart](https://keystroke.ai/docs/quickstart)

### 3.4 哪些任务最适合，哪些不适合

适合 Keystroke Agent 的任务可以用一个筛选式表达：

> **重复发生 × 跨系统 × 运行时存在语义不确定性 × 输出可观察/验证 × 高风险副作用可拦截**

比较适合：

- 每天/每周反复出现；
- 需要读多个 SaaS 或数据库；
- 中间有一小段必须由模型判断的内容；
- 成功结果能看到、能抽样或能用 schema 检查；
- 发信、付款、删除、写库等动作能放到批准后的 Workflow。

不适合：

- 一次性问答或低频个人任务，直接用 ChatGPT/Claude 更快；
- 完全确定的简单同步，用普通 automation 或 Action/Workflow 更便宜；
- 需要成熟 drag-and-drop builder 的纯非技术团队；
- 目前强依赖通用 browser/computer use 的流程；
- 无法验证、错误不可逆、又要求全自动的高风险决策。

## 4. 完整用户流程

### 4.1 构建流程

三种 authoring 入口最终修改同一个 TypeScript 项目：

1. **Web platform agent**：用户在浏览器描述业务结果；platform agent 在托管 checkout 中编辑共享 <code>ks/draft</code>。
2. **本地 coding agent + CLI**：Cursor、Claude Code、Codex 读官方文档、修改 repo、运行 tests 与 CLI；官方当前认为这是最稳定、最推荐的路径。
3. **Hosted MCP workspace**：ChatGPT/Claude 通过 Keystroke MCP 构建；官方说明它比本地 CLI 更新、实战成熟度较低。

来源：[Platform agent](https://keystroke.ai/docs/build-with-ai/platform-agent)、[CLI for agents](https://keystroke.ai/docs/build-with-ai/cli-for-agents)、[MCP for agents](https://keystroke.ai/docs/build-with-ai/mcp-for-agents)。

典型 build loop：

~~~mermaid
flowchart LR
    A["业务负责人描述结果与约束"] --> B["Platform agent 或本地 coding agent"]
    B --> C["生成 Action / Agent / Workflow / Trigger TypeScript"]
    C --> D["连接 Apps 与 credentials"]
    D --> E["definition test / smoke test / tool-use test"]
    E --> F["lint + typecheck + build"]
    F --> G["部署 ks/draft"]
    G --> H["health check 后 promote 到 main"]
    H --> I["Slack / Web / API / Trigger 可用"]
    I --> J["History 观察失败、费用与结果"]
    J --> B
~~~

部署并不是“聊天里说已经完成”。Cloud 维持 <code>ks/draft</code> 与 <code>main</code> 的分离；deploy 会 build、检查并把健康的 draft 提升为 live 状态。[Deploy a project](https://keystroke.ai/docs/learn/projects/deploy-a-project)

### 4.2 End user 的日常流程

最终用户通常不从 builder 开始，而从一个业务触发器开始：

~~~text
Slack mention / Web message / API call / schedule / webhook / poll
  ↓
Agent 创建或续接 session
  ↓
理解请求、读 Context、选择工具
  ↓
必要时调用一个可靠 Workflow
  ↓
返回结果或执行外部动作
  ↓
Operator 只处理失败、批准和例外
~~~

当前可核实的运行入口包括 Web Agent page、Slack、CLI、HTTP API、Workflow step、Trigger 和 parent Agent；HTTP 是异步队列接口，返回 <code>202 + sessionId + runId</code>，同一 <code>sessionId</code> 可继续多轮。[Run agents](https://keystroke.ai/docs/learn/agents/run-agents)

### 4.3 高风险任务的正确流程

Keystroke 最稳妥的设计不是把所有 destructive tools 直接交给 Agent，而是：

~~~text
Action 读取数据
  → Agent 判断或起草
  → Workflow 发出审批请求
  → ctx.hook() durable pause
  → 人通过 Slack button / email link / API callback 批准
  → Workflow 执行确定性副作用
~~~

<code>ctx.hook()</code> 是一等的 durable pause/resume primitive；恢复 URL/token 本身是凭证。[Workflow hooks](https://keystroke.ai/docs/learn/workflows/build-workflows#hooks)、[Resume a suspended run](https://keystroke.ai/docs/learn/workflows/run-workflows#resume-a-suspended-run)

## 5. Agent 的技术实现

### 5.1 总体架构

~~~mermaid
flowchart TD
    A["Web / Slack / API / Trigger / Workflow / Parent Agent"] --> B["Queue + sessionId + runId/promptId"]
    B --> C["Load deployed Agent definition"]
    C --> D["Load transcript + compaction checkpoint"]
    D --> E["Build runtime"]

    E --> E1["Model + system prompt"]
    E --> E2["Files + Skills + Memory"]
    E --> E3["Credential resolver"]
    E --> E4["Actions + Workflows + MCP + subagents"]
    E --> E5["Default workspace or VM sandbox"]

    E1 --> F["Vercel AI SDK ToolLoopAgent"]
    E2 --> F
    E3 --> F
    E4 --> F
    E5 --> F

    F --> G["Model step"]
    G -->|tool call| H["Execute allowlisted tool"]
    H --> I["Persist tool start/end + result/error + usage"]
    I --> G
    G -->|final / structured output / maxSteps| J["Persist assistant message + status + trace"]
    J --> K["History + reply to caller"]
~~~

官方 <code>@keystrokehq/agent</code> package 明确建立在 Vercel AI SDK <code>ToolLoopAgent</code> 上，并提供 <code>defineAgent</code>、session-backed prompt、context compaction、sandbox workspace 和工具解析。[Agent package README](https://github.com/keystrokehq/keystroke/blob/d9f7809961c1e52f81b941b2bacc8776b93acc41/packages/agent/README.md#L1-L47)

### 5.2 每次 prompt 的运行序列

根据公开源码，可以还原为：

1. 创建或解析 <code>sessionId</code>。
2. 加载 transcript 与 durable compaction checkpoint。
3. 如果同一 <code>promptId</code> 因 queue redelivery 再次进入，检测上次是否中断；有 partial checkpoint 时恢复，无 checkpoint 时从原 user turn 重跑。
4. 创建 memory handle，准备 persistent memory tool。
5. 构造 credential context，根据 assignment/scope/default 解析凭证。
6. 只解析 Agent definition 中声明的 Actions、Workflows、MCP 和 subagents。
7. 创建默认 workspace 或 VM sandbox，挂载 Files、Skills 与工作目录。
8. 把 memory、sandbox/files/skills 说明注入作者的 system prompt。
9. 解析 model、thinking、maxSteps、messages 和 tools，构造 ToolLoopAgent。
10. 每一步模型可以返回文本或 tool call；runtime 执行工具，把 observation 送回模型。
11. 每个 tool start/end、result/error、usage 和 step boundary 都写入事件/stream。
12. 到 final answer、structured output 条件或 step limit 后停止，并持久化 assistant message、session status、trace 和 cost。
13. error/abort 时保存 partial assistant 与 checkpoint，供重试与 History 使用。

关键代码证据：

- session、redelivery 与 crash resume：[run-prompt.ts 84–125](https://github.com/keystrokehq/keystroke/blob/d9f7809961c1e52f81b941b2bacc8776b93acc41/packages/agent/src/define/run-prompt.ts#L84-L125)
- runtime 组装 memory、credentials、tools、sandbox、prompt：[build-agent-runtime.ts 172–338](https://github.com/keystrokehq/keystroke/blob/d9f7809961c1e52f81b941b2bacc8776b93acc41/packages/agent/src/define/build-agent-runtime.ts#L172-L338)
- ToolLoopAgent、停止条件与 tool event：[stream-agent-prompt.ts 379–466](https://github.com/keystrokehq/keystroke/blob/d9f7809961c1e52f81b941b2bacc8776b93acc41/packages/agent/src/ai/stream-agent-prompt.ts#L379-L466)
- error、abort 与 partial assistant 持久化：[stream-agent-prompt.ts 619–696](https://github.com/keystrokehq/keystroke/blob/d9f7809961c1e52f81b941b2bacc8776b93acc41/packages/agent/src/ai/stream-agent-prompt.ts#L619-L696)

### 5.3 Context、Memory 与 Files 的边界

| 机制 | 内容 | 生命周期 | 主要用途 |
|---|---|---|---|
| Session history | messages、tool parts、当前对话 | 同一 session | 多轮连续工作 |
| Persistent memory | Agent 自己维护的 MEMORY.md、USER.md、archive 与 session search | 同一 Agent 跨 session | 用户偏好、长期任务事实 |
| Files | 项目作者提交的稳定资料 | 跟随项目部署版本 | policy、schema、reference docs |
| Skills | 按需读取的 SKILL.md 程序 | 跟随项目部署版本 | 做事方法、工具使用规范 |
| Company Brain | 跨 Agent / 项目的组织知识检索 | 组织级 | 大规模共享知识；当前 early access |

开源 memory 默认实现把 Markdown/JSONL 作为 source of truth，把 SQLite FTS5 作为派生搜索索引。[Memory package README](https://github.com/keystrokehq/keystroke/blob/d9f7809961c1e52f81b941b2bacc8776b93acc41/packages/memory/README.md#L5-L24)

长 session 接近可用 context budget 时会生成 durable summary checkpoint；完整 transcript 仍保留给 UI，模型侧使用 summary + checkpoint 之后的新消息。这里的 compaction 解决 Context Window，不等于事实验证。

重要边界：

- Persistent memory 是 **agent-curated**，可能写错、过时或污染后续 session。
- 稳定 policy 不应只依赖 memory，应放 system prompt、Files 或 Workflow。
- 组织级权威知识不能默认等同于 Company Brain，因为该功能尚未普遍开放。

### 5.4 Tools、Credentials 与授权

Agent 的 tools 是显式 allowlist，不是项目内所有能力的全局访问。主要类型：

- Action：typed、deterministic leaf；
- Workflow：作为一个可靠的复合工具；
- Subagent：queued child session；
- MCP：外部协议工具；
- built-ins：web、memory、workspace、trigger 等。

Action 的 input/output 用 Zod 校验。Credentials 在 Action 执行前解析，普通 Action 调用时模型不会看到 secret。解析顺序是：

1. 显式 credential assignment；
2. pinned organization/project/user scope；
3. project default；
4. organization default；
5. 缺失时报错。

User credential 不会仅根据当前消息发送者自动推断，必须 pin user scope 并显式 assignment。[Use credentials in code](https://keystroke.ai/docs/learn/credentials/use-credentials)

但 VM 是另一条安全边界：

- Credential env 会进入 VM 可执行环境，官方说明 token 对模型可见；
- Slack channel 中能向 Agent 发消息的人，使用的是 Agent 绑定的 tools 和 credentials，而不是发送者自己的凭证；
- 因此 Slack channel 成员、tool allowlist、credential scope 与 destructive Action 的组合必须一起审查。[Agent sandboxes](https://keystroke.ai/docs/learn/agents/build-agents#sandboxes)、[External channels](https://keystroke.ai/docs/learn/agents/external-channels)

### 5.5 Sandbox

默认 workspace 不是完整 VM，而是轻量 in-process 环境，带 <code>bash/read/write/edit</code>：

- <code>/workspace/agent</code>：同一 Agent 跨 sessions 共享；
- <code>/workspace/session</code>：当前 session 的临时 scratch。

需要真实 git/python/ffmpeg、安装依赖、运行 Chromium、构建代码库或强隔离时，才显式使用 VM mode。Agent 推理仍在 Keystroke worker，只有工具命令在 VM 中执行。[Agent sandboxes](https://keystroke.ai/docs/learn/agents/build-agents#sandboxes)

因此“full sandbox”应理解为“默认轻量 workspace + 可选 VM-backed execution”，公开文档没有充分披露 VM 的网络 egress、tenant isolation 与虚拟化实现。

### 5.6 Agent durability 与 Workflow durability 不同

Agent 侧已经有：

- persistent transcript；
- step/stream checkpoint；
- partial assistant 保存；
- 同一 prompt redelivery 恢复；
- context compaction checkpoint；
- completed / failed / canceled 状态。

但 Agent tool loop 仍是开放式执行，不意味着每个外部副作用天然 exactly-once。

Workflow 侧更强：

- Action/Agent/LLM/sub-workflow call 是 durable step；
- 已成功 step 写入 event log，retry 时 replay 结果；
- queue-level retry/backoff；
- <code>ctx.sleep()</code> 与 <code>ctx.hook()</code> durable pause/resume。

同时官方明确：

- 没有内建 saga/compensation engine；
- Workflow body 中未包在 durable step 里的副作用，replay 时可能重跑；
- poll delivery 是 at-least-once，严格去重仍需外部 durable log。

来源：[Workflow durability and retries](https://keystroke.ai/docs/learn/workflows/build-workflows#durability-and-retries)、[Polling](https://keystroke.ai/docs/learn/triggers/polling)。

## 6. Verification 与 Control：最容易被高估的部分

### 6.1 已有的验证层

Keystroke 提供：

- deploy verification：lint、typecheck、build、cloud health check；
- behavior tests：definition test、qualitative run、smoke test、tool-use test、E2E；
- runtime contracts：Zod input/output、per-prompt structured output；
- observability：History、tool args/result/error、usage、cost、trace、status。

来源：[Test agents](https://keystroke.ai/docs/learn/agents/test-agents)、[Run History](https://keystroke.ai/docs/learn/logs/overview)。

### 6.2 尚未形成通用能力的验证

公开材料中没有看到默认提供的：

- 事实正确性 verifier；
- citation validator；
- 业务结果自动验收；
- 双模型 judge；
- 每次 deploy 必须通过的 product eval gate；
- 自动检查 memory 是否写错或过时。

Structured output 只能证明形状正确，不能证明事实正确。若需要这些保证，Builder 必须把 verifier、canonical test 或人工验收显式写进 Workflow。

### 6.3 Approval 不是通用 per-tool policy engine

公开 Action schema 没有通用 per-tool <code>approval</code> 字段。[Action definition source](https://github.com/keystrokehq/keystroke/blob/d9f7809961c1e52f81b941b2bacc8776b93acc41/packages/action/src/action-definition.ts#L7-L16)

因此：

- Prompt 中写“发送前先确认”属于模型指令，不是 runtime 强制；
- Platform agent 构建时询问 consequential choices，不等于部署后的业务 Agent 每次调用高风险工具都会被拦截；
- 真正可依赖的批准机制是显式 Workflow <code>ctx.hook()</code>；
- 高风险 Action 应只放在 hook 之后的确定性路径，而不是直接暴露给开放式 Agent。

[Terms](https://keystroke.ai/terms)也明确提醒，Agent/Workflow 可能在没有逐步人工确认的情况下发送消息、改文件、执行脚本、查询数据库和调用外部服务；测试、review、备份与监控责任仍在用户。

### 6.4 用完整 Agent 工程的五层看 Keystroke

| 层 | 现状 | 判断 |
|---|---|---|
| Context | Files、Skills、session、memory、workspace、Brain | **强**；Brain 尚非普遍可用，memory 需防污染 |
| Action | typed Action、Workflow tool、MCP、subagent、web、sandbox | **强**；browser/computer use 仍缺 |
| State | session event、memory FS、workspace、trigger、checkpoint | **强**；外部副作用 exactly-once 仍靠作者设计 |
| Verification | tests、schema、History、trace | **部分完整**；缺默认事实/业务结果验收 |
| Control | allowlist、credential scope、Workflow hook、roles | **部分完整**；缺通用 per-tool approval/policy，部分治理 request-gated |

所以我的技术评价是：

> **Keystroke 已是一个相当完整的 Agent harness/runtime，但还不是一个自带通用 verification 与 policy enforcement 的安全自治平台。**

## 7. 当前功能与路线图必须分开看

| 能力 | 当前状态 | 备注 |
|---|---|---|
| TypeScript Action/Agent/Workflow/Trigger | 已有 | 产品核心 |
| Platform agent | 已有 | 浏览器内 authoring |
| 本地 coding agent + CLI | 已有，官方推荐 | 当前最稳定 build path |
| Hosted MCP authoring | 已有但较新 | 不等同于把 deployed Agent 暴露成 MCP |
| Web Agent chat | 已有 | 项目成员使用 |
| Slack channel | 已有 | 当前主要 external channel |
| HTTP / CLI / Trigger / Workflow / subagent | 已有 | 多 surface runtime |
| web_search / web_fetch | 已有 | 不等同于 browser automation |
| Default workspace + optional VM | 已有 | VM 需显式开启 |
| Persistent memory / self-scheduling | 已有 | Agent 自维护 memory 和 ephemeral triggers |
| Company Brain | Early access / request-only | 不应按普遍 GA 计算 |
| Teams、Telegram、WhatsApp、Linear、Discord、Google Chat | Coming soon | 官网较宽泛表达需按 docs 降级 |
| Native browser automation | Coming soon | 当前需自写 Action/Workflow 或 VM + Playwright |
| Deployed Agent 暴露为 MCP server | Coming soon | 与 MCP authoring 方向相反 |
| Visual Agent/Workflow Builder、instant apps、organization registry | Coming next | 当前非技术 build 主要是 chat-to-code |
| 细粒度 permission groups、identity、audit 等 | 部分 request-gated | 需 demo 逐项确认 |

来源：[Non-technical roles](https://keystroke.ai/docs/non-technical-roles)、[External channels](https://keystroke.ai/docs/learn/agents/external-channels)、[Build agents](https://keystroke.ai/docs/learn/agents/build-agents)、[Organization](https://keystroke.ai/docs/learn/settings/organization)。

## 8. 商业、部署与成熟度判断

### 8.1 Cloud 与 standalone 的边界

GitHub 提供 source-available standalone runtime，但 README 明确说明它不是 Keystroke Cloud 全套服务的自托管副本。许可证是 Elastic License 2.0：可以检查、修改和自用，但不能把 substantial Keystroke functionality 作为托管服务提供给第三方。[Cloud or standalone](https://github.com/keystrokehq/keystroke#cloud-or-standalone)、[LICENSE](https://github.com/keystrokehq/keystroke/blob/main/LICENSE)

因此准确表述应是：

- 用户拥有自己的 TypeScript artifact；
- 有 standalone escape hatch；
- 但 integrations、team app、managed credentials、gateway、deployment UX 等 Cloud 能力仍构成平台依赖；
- 不是 Apache/MIT 意义上的全栈开源云平台。

### 8.2 价格结构

以 2026-08-06 [Pricing](https://keystroke.ai/pricing.md) 快照为准：

- Hobby：免费，含每月 1 美元 credit；
- Pro：20 美元/月 + usage，含 20 美元 credit；
- Organization：custom；
- 顶层 Agent run / Workflow run：各 0.01 美元；
- empty poll：0.005 美元；
- Exa search：0.007 美元，fetch：0.001 美元；
- VM sandbox：约 0.067 美元/小时；
- 平台 LLM gateway：provider list price 的 1.1 倍；
- BYOK：Keystroke 不收模型使用费。

这意味着低频、高价值内部知识工作最容易成立；高频 polling、event processing 或长 VM 任务要单独算成本。这个结论是成本结构推断，不是官方 ROI 承诺。

### 8.3 采用与证据强度

截至研究日：

- YC Launch 仍把产品描述为 open alpha；
- 官方 Trust 页面称团队规模小、逐步 onboarding 用户；
- 未找到公开客户 case study、客户 logo、留存或跨客户效果数据；
- 首页大量场景属于 demo / ready-to-copy prompt，不能当作采用证据；
- 目前最强场景证据是创始人自己的 Delbert dogfood；
- 公开 GitHub 仓库能证明 runtime 实现真实，但 stars、forks 和 commit 不能证明 business PMF。

来源：[YC Launch](https://www.ycombinator.com/launches/RNB-keystroke-open-sourcing-our-internal-agents-automations-platform)、[Trust](https://keystroke.ai/trust)、[GitHub](https://github.com/keystrokehq/keystroke)。

因此：

> 可以确认“产品机制和主要 runtime 能力存在”，暂时不能确认“跨客户、跨场景的生产稳定性与商业留存”。

## 9. Anti-thesis：不要把它误解成什么

1. **不是成熟 no-code canvas**  
   当前非技术 build 体验是 chat-to-code，visual builders 仍在路线图。

2. **不是所有流程都该 Agent 化**  
   官方自己要求已知路径用 Workflow。它的最佳形态是 hybrid agentic workflow。

3. **不是现成的通用 browser-use 平台**  
   原生 browser automation 仍 coming soon。VM 里自己装 Playwright 是工程方案，不是 turnkey 产品能力。

4. **不是 omnichannel Agent 平台**  
   当前可核实的 external channel 只有 Slack；其他渠道仍 coming soon。

5. **不是完整开源 Keystroke Cloud**  
   standalone runtime 与 Cloud 全套服务不同，许可证也是 source-available ELv2。

6. **不是默认安全自治**  
   allowlist、credential scope 和 Workflow hook 很有用，但通用 per-tool approval 与业务结果验证仍需作者实现。

7. **不是已经证明 PMF 的成熟企业平台**  
   open alpha、公开客户证据有限，Organization 页面与定价里的治理能力需要逐项 demo。

8. **不是所有团队都比 n8n 更适合**  
   如果团队不使用 coding agent、不愿维护 TypeScript、只需要几个简单可视化连接，Keystroke 当前反而更重。

## 10. 最终产品判断

### 最强之处

- 找到了一个很当下的 authoring wedge：Cursor/Claude Code/Codex 已成为开发界面；
- Artifact 是真实 TypeScript，可 diff、测试、review、Git 管理；
- Agent、Workflow、Action、Trigger 分工清晰；
- runtime 有 memory、workspace、queue resume、context compaction、credentials、sandbox、tracing；
- Builder、Operator、End user 的使用面可以分开；
- Slack/Web/API 把内部 Agent 从 demo 变成可消费服务。

### 最弱之处

- “coding agent 会生成正确系统”仍未被通用 eval/verification 闭环解决；
- approval 是可编程 Workflow pattern，不是默认全局政策层；
- browser、更多 channels、visual builder、Brain 和部分治理仍不完整；
- standalone 不能完全替代 Cloud；
- 外部客户和长期生产效果证据不足。

### 我给它的准确定位

> **Keystroke 是 Agent 时代的 internal automation application platform：coding agent 负责开发，Keystroke 负责把代码运行成团队服务。**

它最值得关注的不是“Agent 能做什么神奇任务”，而是它重新定义了 Agent 软件的制作方式：

> **自然语言不直接成为生产系统；自然语言先被 coding agent 编译成可审查的 TypeScript，再由 runtime 承担持续执行。**

这比纯 prompt builder 更可控，也比只给 SDK 更接近真实团队使用。但它真正能否建立产品壁垒，取决于三件仍需验证的事：

1. coding agent 生成的系统能否通过低成本、可持续的 eval；
2. 非技术 End user 是否真的通过 Slack/Web 形成高频留存；
3. credentials、approval、identity 与 governance 是否足以支持高价值副作用。

## 11. 如果继续试用，优先做这七个 proof gates

1. **跨系统闭环**：用真实 Gmail/Slack/Linear 跑一次读 + 写任务，确认 input、output 与权限。
2. **失败恢复**：让第二个 Workflow step 故意失败，确认第一个有副作用的 step 不会被重复执行。
3. **人工批准**：实做 <code>Agent → Workflow tool → ctx.hook → resume → Action</code>。
4. **身份与凭证**：多位 Slack 用户发消息，确认谁能调用、使用哪组 credentials、谁能看 History。
5. **Memory 质量**：跨多个 sessions 写入、纠错、删除并检查 persistent memory 是否污染后续结果。
6. **Behavior eval**：建立至少一组正常、缺信息、对抗输入、拒绝、工具失败与高风险动作测试。
7. **Cloud / standalone / enterprise 边界**：要求官方现场展示 standalone 覆盖范围、permission groups、audit、Company Brain、认证与 SLA。

## 12. 主要来源

- [Keystroke Documentation](https://keystroke.ai/docs/index)
- [Agents Overview](https://keystroke.ai/docs/learn/agents/overview)
- [Build agents](https://keystroke.ai/docs/learn/agents/build-agents)
- [Run agents](https://keystroke.ai/docs/learn/agents/run-agents)
- [Test agents](https://keystroke.ai/docs/learn/agents/test-agents)
- [Workflows Overview](https://keystroke.ai/docs/learn/workflows/overview)
- [Build workflows](https://keystroke.ai/docs/learn/workflows/build-workflows)
- [Platform agent](https://keystroke.ai/docs/build-with-ai/platform-agent)
- [Credentials](https://keystroke.ai/docs/learn/credentials/overview)
- [Run History](https://keystroke.ai/docs/learn/logs/overview)
- [Non-technical roles](https://keystroke.ai/docs/non-technical-roles)
- [Pricing](https://keystroke.ai/pricing.md)
- [Data Use](https://keystroke.ai/data-use)
- [Terms](https://keystroke.ai/terms)
- [YC Launch](https://www.ycombinator.com/launches/RNB-keystroke-open-sourcing-our-internal-agents-automations-platform)
- [Official GitHub](https://github.com/keystrokehq/keystroke)

---
*由 LLM 从知识库与官方公开资料查询生成*
