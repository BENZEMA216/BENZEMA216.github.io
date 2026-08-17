# DeepSeek Harness(dsh)代码与产品研究:Everything-is-a-plugin 的 Agent Harness

> 生成时间:2026-08-13
> 查询:研究 dsh 的代码和实现思路,重点提炼产品上的启发
> 研究快照:本地 checkout @ 47f943859b(0.1.0-rc.5,2026-08-13);研究完成后源码已从工作区删除,本报告与 wiki 相关页面是留存的编译产物

## 摘要

**dsh 是 DeepSeek AI 的开源 agent harness,把"一切皆插件"做到了产品内核层面:没有特权内核,连模型适配器、工具注册表、会话日志、执行循环本身都是可替换插件。** 它不是又一个 Claude Code 前端,而是把 harness 当作可组合、可发行、可审计的软件制品来工程化:

1. **架构上是"微内核 + 事件分类法"。** 基于 vendored 的 Cordis 框架,扩展点不是插件 API 而是带刻意分发模式的类型化事件(waterfall / serial / parallel / emit);session log 是唯一事实源,强制执行"模型可见 ⟺ 已落日志"不变量——任何进入模型请求的内容必须能从 log 字节级重建。
2. **产品上是"组合即配置"。** profile(命名组合)/ bundle(发行格式)/ patch(覆盖层)三层装配,`dsh --profile web --dump-config` 能 dump 整棵插件树;新部署形态(TUI、provider 包)以普通 npm 包安装,不需要改仓库。
3. **能力上是"seam 三角色"拆分。** Service Definition / Provider / Consumer 按变化速率切边界,换一个 provider(本地 sandbox → 远端 E2B)整个产品跟随搬家,工具 schema 不变。
4. **工程上是 agent-driven 开发的极限案例。** 2 个月 12,293 commits,~1,500 篇 Agent Notes(每条非平凡改动必须附决策记录 + 被否决的备选方案),文档是编译产物且有一致性门禁,中英双语全量维护。
5. **Web UI 把可观察性做成产品面。** 审批接管 composer、权限预设、上下文注入/跨会话召回的披露、ContextMeter 占用环、tool render intent、Think row 折叠、会话统计条——每个模型可见事实都在 UI 上有可审计的呈现。
6. **本报告本身就是 dsh 的产品实测**:写这份报告时我(研究 agent)就跑在 dsh 的 Web UI 上,用 dsh 自己的工具集(subagent 并行研究、todo/goal、job 后台管理、permission 预设),全程无重启、无上下文截断。

## 1. 项目概况

| 维度 | 事实 |
|---|---|
| 项目 | DeepSeek Harness(`dsh`),DeepSeek AI 开源 agent harness |
| 状态 | developer preview,0.1.0-rc.5,明示 "THERE WILL BE COMPATIBILITY-BREAKING CHANGES" |
| 历史 | 首个 commit 2026-06-10,至 2026-08-13 共 12,293 commits(约 2 个月,最活跃日 887 commits) |
| 规模 | 60+ npm packages(@deepseek-ai/dsh-*)、checkout 1.6GB(node_modules 1.4G) |
| 形态 | CLI(`dsh --profile web/headless`)、Web UI、Python SDK(JSON-RPC over stdio)、ACP server |
| 框架 | vendored Cordis(源码拷贝进仓库,rescope 为 @deepseek-ai/*,18 条本地改动有日志) |
| 开发方式 | agent + 工程师混合,gh stack PR 文化,5,594 merge commits,主要贡献者 Tianyi Cui(5,235 commits) |
| 文档 | 中英双语全量,i18n 流程,website(VitePress)投影;~1,500 篇 Agent Notes 决策记录 |

### 产品定位

dsh 不是"又一个编码 agent",而是 **harness 本身作为可组合产品**:

- 用户安装的不是一个应用,而是一个 profile(命名插件组合)+ 自己的 patch 覆盖层
- 模型适配器、工具、sandbox、持久化、UI 全是插件,可从配置替换
- 提供 headless(一次性任务)、web(交互式 GUI)、JSON-RPC/Python SDK(程序化驱动)、ACP(自动化 server)多种表面

### 与知识库既有研究的定位差异

与 [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)(kimi-cli / Claude Code 对照)和 Managed Agents(Anthropic meta-harness)不同,dsh 选择的是"开源框架层 + 可组合发行"路线:它不赌单一 harness 形态,而是把 harness 的每个部件做成可替换插件,让部署形态成为配置而非代码。知识库此前研究的都是"harness 作为产品被消费"(Claude Code 的 UX、kimi-cli 的架构),dsh 是第一个"harness 作为平台被扩展"的完整开源实现样本。

## 2. 核心架构:微内核 + 事件分类法 + 单一事实源

### 2.1 "Everything is a plugin" 的三层组合

dsh 没有特权内核——模型适配器、工具注册表、session log、甚至 agent loop 本身都是插件,任何一部分都可以从配置替换。运行中的 dsh 是启动时按序叠加的插件树,由三个机制装配:

- **profile**(命名组合):`$DSH_HOME/profiles/<name>`,列出叠加的 bundles、持有树外插件、保存用户自己的 `cordis.patch.yml`;`web` 和 `headless` 作为模板随安装提供
- **bundle**(发行格式):Cordis 配置行 + 代码的发行包,通过自身 `package.json` 的 `dsh.bundle.patch` 指向 patch 文件
- **patch**(覆盖层):按 id 定位条目并整段替换其 config(不深合并),叠加顺序为 bundle → profile patch → home 级 patch → `--patch` 覆盖层

任何一条配置都能用 `dsh --profile web --dump-config` 打印出来并被用户 patch 替换。设计意图:**组合即数据、manifest 只作声明**,用户/第三方在不改仓库的前提下拥有任意部署形态,组合结果可完整 dump 审计。动机记录在 `2026-08-05-profile-plugin-bundles.md`:launcher 硬编码组合无法装树外插件,"一切皆 profile"后新部署形态(TUI、provider 包)作为普通 npm 包按 profile 安装。

### 2.2 事件分类法:扩展点 = 带分发模式的类型化事件

事件是 dsh 的扩展点。三类事件按"事实的持久性 vs 活体状态"划分:

| 类别 | 语义 | 用途 |
|---|---|---|
| **session events** | durable 事实,append 到 log | 必须 survive reload 的事实(turn/step/user/assistant/tool 边界) |
| **agent events**(`agent/*`) | 携带活体 Agent | 观察/拦截在途工作(inbox、step、status、request、validation) |
| **capability events** | 为 seam 挂策略与适配器 | `fs/*`、`tools/*`、`telemetry/*`,不 import loop |

四种分发模式是事件公共契约的一部分(带 `@mode` 标注,生成目录校验声明与分发点一致):

- **waterfall**(around 中间件):监听器必须调用 `next()` 才放行,不调用即短路——用于所有"拦截/改写/恢复"型扩展点(`agent/pre-step`、`agent/request`、`llm/stream`、`tools/pre-execute/execute/post-execute`)
- **serial**:按序等待的有序检查点(`agent/turn-stopping`)
- **parallel**:并行 fan-out,每个监听者独立机会(`session/flush` 持久化检查点)
- **emit**:同步 fire-and-forget 通知

决策记录(`2026-06-11-microkernel-event-taxonomy.md`):备选的 koa-compose 中间件栈和显式阶段状态机都被否决,因为会重新实现 Cordis 事件系统自带的 dispatch/disposal/HMR;作为 Cordis effects,监听器免费获得 HMR 与卸载回滚。

### 2.3 Session log 作为唯一事实源

Session 是类型化 `SessionEvent` 的 append-only log。模型看到的 message history 是从 log **派生**的(`deriveMessages()`),从不另存。核心不变量:

> **Model-visible means logged.** 任何进入模型请求的内容必须能从 log 重建,运行时 invariant 独立重建请求并比对强制验证。

- **turn/step 模型**:step = 一次 model request + 它调用的 tools;turn = 零或多个 step。拒绝或空 claim 仍关闭一个"花了零步"的 durable turn——log 记录尝试本身
- 每个模型可见事实在下一步派生之前已回到 log(`request/header` 全量快照让每个请求成为 log 的纯函数)
- 事件溯源的理由(`2026-06-11-event-sourced-sessions.md`):否决"可变 message 数组 + 事件通知"——状态与 log 会分叉;"log 就是状态,分叉在结构上不可能"
- 推论:回放/追踪/telemetry 是结构性保证而非事后加装;持久化、fork、compaction、UI 渲染全部从同一条 log 派生,不存在第二套真相

### 2.4 Capability seam:按变化速率切边界

一个可替换能力 = **Service Definition**(声明接口,拥有 `ctx.<key>` 与词汇类型)+ **Service Provider**(实现)+ **Consumer**(产品其余部分,通常是模型可见 tool)。三者变化速率不同,换实现不应波及模型可见契约。

- 实例:`ctx.fs`(seam)→ `fs-local`/`fs-sandbox`/`fs-e2b`(providers)→ `tool-fs`(consumer);`fs-observation-policy` 通过 `fs/*` event 挂策略
- 最强效果:filesystem 与 subprocess providers 共享一个执行世界,指向远端 sandbox 时 Bash、PTY、LSP 一起搬家,无 provider fork
- 克制:LLM seam 把 Definition+Consumer 折叠进 dsh-llm(消费者即 loop 本身),"Don't split preemptively"

### 2.5 Cordis 被 vendored:框架层是被拥有的源码

Cordis 以源码拷贝进仓库而非走 npm,理由:**harness 完全拥有自己的框架层**(可审计、可打补丁、可固定版本),同时 rescope 为 `@deepseek-ai/*` 避免 squat 上游包名。18 条本地改动全部登记(生命周期加固、JSDoc 富化、事务化配置协调、把 include 的私有 `applyPatches` 提取为公开 `applyEntryPatches` 让 `--dump-config` 与真实挂载共用同一 patch 算法等),同步是受控流程(记上游 commit → 拷 src → 重放/废弃本地改动 → 更新 manifest → 全量 test+build)。

### 2.6 Agent Notes:把"为什么"当一等公民

~1,500 篇决策记录,路径编码两个轴:生命周期(proposed/implemented/rejected/archived)+ 类别(feature/bug-fix/simplification/architecture/process/testing)。制度核心:

- 非平凡改动必须同 PR 附 note;格式强制 `Problem / Decision / Alternatives considered / Consequences`
- "alternatives are recorded, never invented"——防止同一错误决策被重新采纳
- implemented note 必须与已发布现实保持同步;归档即冻结,永不作为当前权威
- 文档分层:"rationale → Agent Notes"是唯一归属地;architecture.md 只留地图,类型定义去 subsystems,步骤去 cookbook

### 2.7 架构理念总结(8 条)

1. **可扩展性先于一切,内核最小化**——连 agent loop 都可换,扩展 = 在旁挂插件
2. **单一事实源与可回放性**——"log 即状态,分叉结构上不可能"
3. **信任靠可验证不变量,而非口头约定**——"model-visible ⟺ logged"由运行时 invariant 强制
4. **显式大于隐式,fail loud**——默认值是显式 resolve 步骤,插件内无硬编码 tunable,misconfiguration 加载时大声失败
5. **按变化速率切边界**——包边界反映演进速率而非功能分类
6. **决定必须留档、备选必须记录**
7. **文档是编译产物,有一致性门禁**——doc tiers "one home per fact",生成目录由脚本生成并校验新鲜度
8. **pre-release 务实主义**——"foundation over blast radius":无外部消费者时自由改名/重组,把正确地基置于兼容垫片之上

## 3. Web UI 产品设计:把 agent 会话当作可审计、可回放的数据流

### 3.1 整体信息架构:无路由的单页 + 三栏工作台

Web UI 是一个无路由的单页应用(没有 router、没有独立 URL 页面),由"三栏框架 + 会话视图环 + 模态设置"组合;浏览器端跑**第二条 Cordis 插件树**,每个 UI 功能一个插件包(27 个 ui-* 包),运行时按需加载(`GET /plugins/<id>/client.js`)、可独立 fail、可 HMR。入口链:`apps/web`(9 行 Vite 薄壳)→ `@deepseek-ai/dsh-client-web`(shell 内核)→ 浏览器端插件树。

- 三栏布局:sidebar / conversation / details;sidebar 可折叠成 56px 轨道,details 可折叠为 0 宽
- "页面"只有两类:会话视图(无 session 时是 New Session hero)与设置模态(每 feature 一页:General/Models/Agent presets/Plugins)
- boot 是"一次成型":任何一个 entry 失败都**留在加载页并逐条列出失败的插件**,不做部分可用(fail-loud 卡片)
- 开发期 client-plugin 改动靠 HMR 单 fiber 热换,无需刷新页面

### 3.2 会话 = Agent 作用域,一条时间线三种视图

UI 上"一个会话 = 一个 conversation",会话由 Host 一次性创建(Session+Agent+cwd 同生)。session 内的事件流由 **ConversationNodeAssembler 折叠成节点,再按节点 kind 分发到 keyed renderer**:

- 节点 kind 清单:user/steering/context/assistant-step/command/manual-compaction/compaction/model-retry/turn-error/turn-max-tokens/turn-tail/unknown + tool-call/workflow-run
- 三种消费同一窗口的视图:chat(默认)、trajectory(调试器级事件账本 + 时序 Overview 时间轴 + 本地 inspector)、workflow-run(嵌套 chat 节点)
- fork 从最后完成的 turn 出发并自动递增继承标题;发送走 Queue/Steer 两种投放(busy 时 Enter 与 Cmd+Enter 可分别绑定)
- subagent 是会话树的第二维度:父会话 header 有可展开的子代理目录,子会话不占用 sidebar 行

### 3.3 关键交互设计

**输入触发与命令面板**:`/`、`@` 在光标下触发 combobox 式候选菜单(焦点留在 textarea),命令平面与消息平面分离——命令由 Host 目录驱动、客户端只读缓存,分三种派发形态(leadingInput 回填 / popupSelect 零组件 / execute 选中即执行)。

**权限审批接管 composer**:审批不是弹窗卡片,而是 **ApprovalPanel 占据整个 composer 输入区**(琥珀色条 + justification 标题 + 配对命令 + 一次性 refuse/allow),把"正在等用户批准"变成最醒目的状态;composer 底部有权限 chip(`/permission <preset>` 会话级切换),选 `danger-full-access` 先开 Modal 风险确认(勾选后按钮才可用)。

**工具调用可视化 = render intent 联合类型**:工具"想怎么被展示"是工具自己声明的、与 UI 无关的带 tag 联合类型(generic/terminal/diff + locations,结果端加 search/web/read);UI 按 tag 渲染专用卡片(TerminalBlock 含 ANSI 解析与 cursor 回放、DiffBlock 逐行统计、ReadBlock 行号高亮),任何卡片回退扁平结果文本;渲染只依赖 args/结果——**直播与回放结果一致**。

**产出文件行**:ui-deliverables 按 render intent(而非工具名)识别 mutation 调用,把 `locations` 折叠成每 turn 的 produced-files 行,正文 inline code 变成可点击文件引用。

**其他值得注意的 UX 决策**:
- 上下文注入/跨会话召回渲染为默认折叠的 disclosure,标注 role + producer,读者不展开也能分辨来源
- Think row 默认折叠,折叠态显示 live reasoning 吞吐;展开后回到普通页面流
- ContextMeter:composer 尾部 14px 占用环,点击打开 panel(percent used + 启发式构成 rows:system prompt/tools/messages)
- 模型 retry 跨重试轮次合并为一条稳定的 muted 状态行(倒计时锚定客户端时间、最新一次 shimmer)
- 每 turn 追加 hover 才显示的 TTFT/tps;composer 旁 stats dock(token 计量:uncached/cache reads/writes 分开)
- TodoDock(计划条)+ GoalBar + QueueDock(排队消息,>1 条折叠)构成输入区 dock 栈

### 3.4 设置系统与安全默认

- 设置 = 域基座(零 UI)+ 壳 + 每 feature 一页 + **schema 驱动的表单**(`settings.describe` 携带序列化 schema,浏览器重建同一个 validator——"client-side validation never drifts from the Service Definition's")
- 写入契约:一次一个字段、携带 last-known revision 做 CAS,冲突重读
- **API 密钥 write-only**:页面只持有 redacted 描述符,settings.yaml 永不存密钥值;credentials RPC loopback-only(远程浏览器降级 memory 模式)
- 主题:`ui-theme` 单一 token 权威(`--dsw-*` deepseek 蓝系),feature 组件只消费语义别名;CSS Modules + clsx,禁组件库与 Tailwind;产品文案中文、代码注释英文

### 3.5 UI 可扩展性:ConversationNodeDefinition + keyed renderer + ui-slots

新增一个业务行 = 声明合并一个 `ChatNodeDataMap` key + 注册一个 Definition(事件→节点的折叠引擎)+ 注册一个 keyed renderer,不碰 Session 折叠或中央 switch。ui-slots 的 SlotMap declaration merging 是类型权威;slot 冲突在加载期 fail loud。

### 3.6 UI 设计理念总结(8 条)

1. **是开发者工具,不是消费级聊天产品**——入口是 `dsh web` 命令,UI 面向"配模型、选 workspace、管权限、读 token 统计"的技术用户
2. **可观察性被设计进契约**——工具 render intent 是工具定义的一部分且是 args 的纯函数;trajectory 是调试器级账本
3. **可控性 = 审批优先、权限分级、风险显式确认**
4. **"Host 是唯一权威"贯穿性哲学**——UI 乐观假设极少,回放与直播共享同一批 Definition,刷新不改变任何东西
5. **安全默认:写敏感、读受限、远程降级**
6. **"一切皆插件"延伸到 UI 本身**——浏览器跑第二条插件树,产品形态是"平台"思维
7. **性能工程是产品要求**——流式 token 不抖动渲染树、markdown 增量 AST 渲染、trajectory 虚拟窗口
8. **诚实的预发布心态**——Known Limitations 逐条承认短板,工程正确 > 演示完整

## 4. 运行时能力与安全模型

### 4.1 工具系统:scoped 注册表 + 三级 waterfall + 单调 guard

- `ctx.tools` 提供 register/restrict/guard/get/schemas/execute;注册在调用方 agent scope 生效并 shadow 全局,`restrict` 对继承工具做 allow/deny 过滤(多 restrict 相交),scope 自有注册不受影响
- 执行管线:`tools/pre-execute`(allow/deny/ask)→ 单调 guards(只能否决不能翻案)→ `tools/execute` around-wrappers(超时/重试/度量)→ 工具 body → `tools/post-execute`(accept/replace/block)→ `tools/result`(冻结的最终观察)
- 参数在 policy 前一次性 lossless-JSON 物化并 deep-freeze——"历史、审计、UI、执行必须一致"是显式取舍
- 并发:`isConcurrencySafe(args)` 返回精确 `true` 才允许并行,否则 fail-closed 为 exclusive 屏障
- 超时是协作式预算(`timeoutMs` 声明即承诺转发 signal);重试发生在请求层(`llm-retry` 走 `agent/request-error` waterfall),失败的 partial 输出绝不进上下文
- 模型可见工具共 52 个注册条目(24 个 tool 包);tool-catalog 由 generator 启动真实 context 读取 `ctx.tools.schemas()` 生成并有完整性 guard

### 4.2 安全模型:分层防御 + fail-closed

- `SandboxMode`(read-only / workspace-write / danger-full-access)只管文件效果;`SandboxExecutionPolicy` 按调用携带 mode + workspaceRoot + sessionId 解析,`danger-full-access` 不调沙箱直接跑
- 本地多后端:Linux bwrap 优先/Landlock(native addon)、macOS Seatbelt、Windows ACL(报告 partial,不谎报 full);`SANDBOX_UNAVAILABLE` fail-closed,静默无沙箱透传非法
- 审批:`ctx.approval.request()` 要求 open turn,先追加 log-only `approval/asked`,经 waterfall 得到 `allowed-once | rejected | cancelled | unavailable`;唯一授予是 allowed-once,`unavailable` 即拒绝——**默认无回答即拒绝**
- Permission presets:两个旋钮(sandbox mode + approval policy)打包为命名预设,默认 `workspace-write`(workspace-write + ask)与 `danger-full-access`(danger + never)
- 文件系统 read-before-edit:fs-observation-policy 通过 `fs/*` 事件门实现——未观察过 → `FS_NOT_OBSERVED`;edit 以 observed version 为 CAS 基准
- 远程:e2b 把 fs/subprocess 两个 seam 指向 E2B Linux sandbox,本地实现无需 fork 即随之迁移——"可移植执行世界"
- 循环卫生:`repeat-tool-reminder` 统计同工具同参数连续调用(3/5/8 阈值),注入升级式提醒但不否决

### 4.3 Subagent:一个接口,六个 transport

- `ctx.subagents` 是命名 provider 注册表;spawn/fork 进程内,acp/codex/claude-code/dsh-sdk 进程外(每次运行全新进程,`inheritsParentContext: false`、零能力)
- 能力静态校验:缺能力直接 `UNSUPPORTED_CAPABILITY` 拒绝,绝不"接受后忽略"
- Continuable child:持久 child Session + 至多一个进程内 Activation;`followup` 按 Activation 驻留状态路由,冷恢复不经过 provider
- 工具分工:`subagent`(委托)、`interrupt_agent/list_agents/send_message`(控制)、`report`(子代理回报,子代理是唯一授权凭证)

### 4.4 Workflow 与 Goal

- workflow:"模型写编排脚本、批量起子代理";worker-thread 执行,脚本无权访问 FS/网络/定时器;`WorkflowRun.result` 永不 reject,dispose 有界不挂死;明说 vm/worker 是 containment 不是 security boundary
- goal:同会话跨轮长目标,完全由 session log 的 `goal/change` 事件驱动;`GoalRef`(id+revision)是 CAS 身份;create/edit/pause/resume 要求 direct-human root authority,blocked 默认 3 轮下限;goal activation 是 process-local,resume/fork 需人工授权
- Ralph:固定前台 workflow,每轮全新无上下文 child,只有受限结构化报告跨轮传递

### 4.5 Session 持久化:事件溯源 + 双后端

- 持久化是抽象 seam:`ctx.sessionPersistence`(locate/create/append/prepare/load...);JSONL(每会话一个文件,checksummed Zstandard 帧)vs SQLite(一行一事件,无平行 schema)
- 崩溃恢复不截断:给孤儿 turn 补合成 `turn/end { reason: 'interrupted' }` 保持平衡
- Projection:纯函数 unit(init/apply/view)订阅一次 `session/event` eager 折叠;checkpoint 在 turn/end 与 dispose 强制落盘
- Telemetry:OTel 双通道(ledger + ops);`session-telemetry/record` redaction waterfall 对导出副本脱敏,绝不改写规范 log
- Session-query:SQLite FTS;5 个只读工具都从"不可变调用方 session"授权每个结果
- Title:latest-wins;用户改名即 pin;自动生成记录精确 model provenance

### 4.6 上下文管理

- Compaction 是能力缝:`compaction/start|summary|end` 三个 log-only 事件构成锁;摘要以 `user/message surfaceOp: replace` 替换 surface 区间(带 shadowedSeqs 可重建);区间必须保持 tool-call/result 配对平衡
- Tool-result pruner:确定性 head/middle/tail 裁剪超预算工具结果,替换前写 `compaction/prune` 事件
- Token meter:复用 provider usage 锚点(需 canonical envelope 匹配),否则启发式重估
- 上下文插件:agent-instructions(AGENTS.md/CLAUDE.md 链首轮注入)、session-reference(跨会话只读快照,默认 3 个、单源 64KB)、time-context(浏览器时区)

### 4.7 Skill 系统

- `ctx.skills` 分层 provider registry(host + per-scope,就近层同名直接胜出)
- filesystem provider 按 rank 扫描 6 级目录(项目 .dsh/skills → .agents/skills → 自定义 → dsh home → agents home → bundled)
- 模型侧:`<available_skills>` catalog 只含 name + description 首轮注入,digest 变化才替换;`skill({name})` 按 cwd 重读完整定义返回 `<skill_content>`
- 双表面调用策略:modelInvocable / userInvocable 独立控制

### 4.8 其他值得注意

- credentials:配置只存环境变量名引用,provider 持值,每次操作重新 resolve(轮换即生效);`describe` 永不暴露值
- spill:超大工具结果落盘换 locator;attachment:图片字节原子提交,禁止把 browser path/base64 写进 session 事件
- schedule:三个 Session-scoped 提醒工具,状态在 session log,定时器只是可丢弃投影
- mcp-client:每 MCP server 一个插件实例,注册为 `mcp__<server>__<tool>` 原生工具,走完整守卫管线
- hooks:把 Claude Code/Codex 的 hook 配置桥到本 harness 拦截点(SessionStart→inject、PreToolUse→pre-execute deny/ask...);README 明言"原生 cordis 插件能做更多,桥只为兼容路径存在"
- code-runtime / extensions:模型可写 TS 程序调子工具(Code Mode)、agent 可在 vm 沙箱里定义/运行自修改 Cordis 包(opt-in)

## 5. 产品启发(重点)

### 5.1 可扩展性不是功能,是产品架构

dsh 最核心的产品判断:**把"可扩展性"做到内核,而不是做成功能菜单**。模型适配器、工具注册表、会话日志、执行循环全是插件,UI 本身也是浏览器端第二条插件树。三个直接后果:

1. **部署形态成为配置而非代码**——profile/bundle/patch 三层组合 + `--dump-config`,让"headless 任务、交互 GUI、程序化 SDK、企业定制"都是同一产品的不同组合,不需要产品团队维护多条产品线
2. **生态扩张的成本结构被改变**——新能力(新模型 provider、新沙箱、新工具)以普通 npm 包发行,第三方可以在不改主仓库的前提下做出完整产品变体;这接近 VS Code 的扩展市场模型,而 VS Code 证明了这个模型能同时服务"极客定制"和"企业管控"
3. **代价是极高的架构纪律**——"everything is a plugin"意味着每个决策都要考虑扩展点、逆兼容、文档契约;dsh 用强制 Agent Notes + generated catalogs + 运行时 invariant 来维持纪律,这不是小团队能轻易复制的

**对 Combo 的映射**:Combo 的产品化对象是"专业服务"。dsh 的启示是:如果 Combo 要让"服务"可组合、可扩展、可被第三方增强,应该在架构上把"服务能力"做成 seam(定义/实现/消费者三角色),让新服务类型、新交付方式以插件形式生长,而不是在单体产品里堆功能。

### 5.2 可观察性 = 信任的基础设施

dsh 的"model-visible ⟺ logged"不变量把可观察性从"事后日志"变成"结构性保证":UI 渲染、回放、telemetry、审计全部从同一条 session log 派生,不存在第二套真相。产品层面:

- **直播与回放一致**:刷新页面不改变任何东西;fork 有精确边界(最后完成的 turn);崩溃恢复补合成事件保持 log 平衡
- **每个模型可见事实都有 UI 呈现**:工具卡片、轨迹视图、上下文注入披露、compaction 摘要、retry 状态行
- **可审计性成为卖点**:任何一次模型请求都能字节级重建(request/header 快照 + 固定版本代码)——这是企业采购"AI 产品"时最想要的信任证据

**对 Combo 的映射**:Combo 卖的是"结果服务",用户(粉丝)和供给者(创作者)都需要信任:结果是怎么来的、过程是否可审计、失败如何补救。dsh 展示了"事件溯源 + 结果可重建"可以成为产品的信任底座——Combo 的每个服务订单如果能记录完整轨迹(输入、过程、结果、验收、退款),就有机会把"可审计交付"做成差异化,而不是只靠结果本身竞争。

### 5.3 安全模型产品化:默认关闭,打开需要显式授权

- 审批唯一授予 allowed-once;`unavailable` 即拒绝(默认无回答即拒绝);approval policy 'never' 是确定性拒绝而非"假装询问"
- 沙箱无后端即 `SANDBOX_UNAVAILABLE`,绝不无沙箱透传;Windows partial 不谎报 full
- 权限预设把"沙箱强度 + 审批策略"两个旋钮打包成用户可理解的命名预设
- 凭证 write-only、引用化(配置只存环境变量名),telemetry 脱敏 waterfall 对导出副本脱敏
- 用户侧 UX:审批接管 composer(而不是弹窗打扰)、danger-full-access 强制风险确认

**对 Combo 的映射**:Combo 涉及付费、退款、隐私数据、跨境结算,安全与合规是产品级投入。dsh 的"fail-closed + 每动作授权 + 风险显式确认"模式可以直接借鉴到服务执行链路的权限设计;特别是"无人值守是显式选择"——Combo 的自动履约只有在用户明确授权范围内才被允许。

### 5.4 人类在环的一等公民设计

dsh 把"等待人"做成 UI 和协议的一等状态:approval 接管 composer、ask_user_question 暂停工具调用直到人类回答、plan mode 是"引导而非沙箱"、goal 的暂停/恢复需要 direct-human authority。产品含义:

- 半自主产品(agent 干活、人验收)的核心不是"自动化程度",而是"人在什么时候、以什么方式介入"的体验设计
- 审批不是弹窗而是状态机接管——把"正在等用户批准"变成最醒目的产品状态,而不是一个可以忽略的通知

### 5.5 配置即产品:用户是组合者

dsh 的 profile/patch 体系让用户成为"组合者"而非"配置者":`--dump-config` 打印整棵树,任何一行可被 patch 替换。这是"configuration as product surface"——高级用户的能力边界不是"预设功能",而是"组合自由度"。与之配套的工程纪律:组合结果可完整 dump 审计、配置错误加载期 fail loud、文档=可机器验证的契约。

### 5.6 Agent-driven 开发的组织启示

dsh 是 agent 参与开发的极限案例:2 个月 12k commits,~1,500 篇 Agent Notes。能支撑这种速度的不是"更快的 agent",而是一套让 agent 可信的工程制度:

- **Agent Notes = 决策记忆**:每条非平凡改动附 Problem/Decision/Alternatives/Consequences,让后来的 agent 重放推理而非猜谜,防止同一错误决策被重新采纳
- **可验证的文档契约**:generated catalogs(事件矩阵、工具 schema、config 目录)由脚本生成并校验新鲜度,文档不是"写出来的"而是"编译出来的"
- **运行时 invariant 取代口头约定**:"model-visible ⟺ logged"由 invariant 独立重建请求强制
- **snapshot 测试取代 mock**:关键路径用真实可运行示例的 transcript 做 keyless snapshot,回放驱动
- **中英双语全量维护**作为发布要求(对 DeepSeek 国际化是刚需,也倒逼文档"真的被读")

这与 [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) 的"production harness → trajectory → harness fix"闭环直接呼应:dsh 自己就是这条数据回路的完整实现。

### 5.7 产品定位对照:harness 平台 vs harness 产品

| 维度 | Claude Code(产品) | Managed Agents(平台服务) | dsh(开源框架+组合) |
|---|---|---|---|
| 核心交付 | 终端里的编码 agent | 托管 agent runtime API | 可组合的 harness 插件树 |
| 扩展方式 | skills/hooks/MCP | 平台 API + 托管能力 | 任意插件包 + profile 组合 |
| 数据主权 | 用户本地 | 平台侧 | 用户本地(JSONL/SQLite 双后端) |
| 信任证据 | 产品口碑 | 平台 SLA | 源码 + 可回放日志 + 可验证文档 |
| 商业模型 | 订阅 | 按用量 | npm 发行 + Python SDK(生态先行) |

dsh 的路线更像"开源 harness 的 Android":平台化通过开放组合权实现,信任通过可审计性实现。对 Combo 的启示:如果目标是"让服务供给生态化",开放组合权和可审计交付比平台托管更早、更便宜地建立信任。

## 6. 关联知识库

- [agent-harness-implementations](/wiki/maps/agent-harness-implementations/) — dsh 应作为第三行对照加入:kimi-cli / Claude Code / dsh(事件溯源、seam、插件化)
- [harness-engineering](/wiki/concepts/harness-engineering/) — dsh 是 harness engineering 的完整开源实现样本(Agent = Model + Harness 的工程化)
- [agent-runtime](/wiki/concepts/agent-runtime/) — session 持久化、turn/step、compaction 的实现参照
- [agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/) — isConcurrencySafe 精确 true 才并行的 fail-closed 设计
- [context-engineering](/wiki/concepts/context-engineering/) — compaction/token-meter/context 插件
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) — session log 事件溯源 = trajectory 数据的工程底座
- [skills-system](/wiki/concepts/skills-system/) — skill registry 分层 + catalog 渐进披露
- [safe-autonomy](/wiki/concepts/safe-autonomy/) — fail-closed 安全模型、审批 UX
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — 一个接口六个 transport 的 provider 化

---
*由 LLM 从 deepseek-harness 源码 checkout 编译,研究完成后源码已删除;请勿手动编辑*
