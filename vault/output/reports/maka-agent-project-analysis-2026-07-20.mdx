# Maka Agent 项目分析

> 生成时间：2026-07-20
> 查询：`maka-agent/maka-agent` 在做什么，工程成熟度如何，对 Combo 有什么启发？

## 摘要

Maka 不是普通 Electron 聊天客户端，而是一套 **local-first、log-first、projection-driven 的个人 Agent workspace/runtime**。它把模型消息、Tool Call、Tool Result、权限决定与终止状态写成 append-only execution facts，再从日志投影出 Session/UI、下一次模型上下文、可恢复 TaskRun 与 Self-check evidence；Desktop、TUI/CLI、Headless 共用同一 Runtime。

项目最有价值的部分不是“又支持了多少模型与工具”，而是把 **事实、上下文、任务、验证** 四者拆开：compaction 可以改变模型看到什么，但不能改写已经发生的事实；Agent 的 self-check 只能产生 evidence，不能凭一句“我检查过了”升级为系统事实。这个内核对生产 Agent 很有研究价值。

但它还不是成熟终端产品：README 明确面向从源码运行者与贡献者；默认工具执行没有真正 OS 隔离；凭证以本地明文 JSON 保存；SQLite canonical store 与 interrupted-turn resume 仍是 opt-in；外部副作用结果不确定时的完整 reconciliation 尚未实现。它更像一套快速演进、测试密集、架构野心很大的 pre-1.0 runtime/product prototype。

## 1. 它在做什么

### 1.1 产品表面

| Surface | 用途 | 真实能力 |
|---|---|---|
| Desktop | 日常工作、文件与 Artifact、模型/权限配置 | Electron + React；流式 Session、Tool timeline、branch/search/recovery |
| TUI / CLI | 当前目录交互与单 Turn 非交互运行 | 与 Desktop 共用 workspace、模型连接和 Runtime |
| Headless | 长任务、实验与 eval | TaskRun、task event log、budget、pause/continue、export/retry、bounded Self-check |

基础工具包含 Read/Write/Edit/Bash/Glob/Grep，并已有 web search、memory、HTTP/SSE gateway、bot、Office workflow 与 computer-use 基础包；但 README 明确说明实验入口不一定默认可用。

### 1.2 后端脊柱

```text
Desktop / TUI / Headless
          ↓
SessionManager → AgentRun → Model + Tool Runtime
          ↓
Runtime Event Log → Context / Session / UI projections
          ↓
Task Event Log → TaskRun → Self-check / AHE evidence
```

这套结构有四个重要区分：

1. **Execution fact ≠ UI state**：消息、工具调用、结果和终止状态是 canonical facts，UI 与 Session 是可重建 read model。
2. **Recorded history ≠ active context**：Tool Result pruning 与 LLM compaction 只改变下一次 inference 的输入，不删除证据。
3. **Turn ≠ durable task**：一个 Turn 中断或进程退出后，Headless 的 TaskRun 可以凭独立 event log、budget 与 continuation 延续。
4. **Self-check ≠ authority**：自检结果必须携带 command/artifact evidence、sandbox hygiene 与 workspace guard；自报 pass 不自动构成完成事实。

这与 [agent-runtime](/wiki/concepts/agent-runtime/) 中“事件驱动持久化”的方向一致，但 Maka 更明确地把 context 当作 log projection，而不是把会话消息数组本身当作唯一真相。

## 2. 真正有意思的设计

### 2.1 “Log is the Runtime”比普通聊天 JSONL 更进一步

Claude Code、kimi-cli 等 harness 也有 append-only session，但 Maka 试图建立更严格的事实脊柱：Runtime Event Log 保存交互语义，AgentRun ledger 保存运行记录，Task Event Log 保存长任务进度。下游 consumer 不各自维护互相打架的真相源。

它的工程意义是：

- context overflow 不等于历史丢失；
- UI crash 后可以从 canonical events 重建；
- durable task 不必猜测“上次跑到哪里”；
- eval/evolution 可以引用 trajectory identity，而不是只读一段最终回答。

### 2.2 Evidence before compression

Maka 不把“大 Tool Result 塞不进 context”处理成简单截断，而是先保留 Turn-level evidence，再 prune active result。这里最值得迁移的不是具体 compaction 算法，而是契约：**证据保存策略与模型上下文预算是两个系统问题**。

### 2.3 Self-check is not self-trust

Headless 的 Heavy-task gate 会拒绝缺少公开 command/artifact evidence、sandbox execution evidence 或 workspace guard 的 `pass`。它允许一次 bounded repair，但不允许 Agent 无限自我说服。这是 [harness-engineering](/wiki/concepts/harness-engineering/) 中 feedback control 的更严格版本：LLM judge 只是证据生产者，最终状态由 deterministic policy 决定。

### 2.4 对 crash / side effect 的态度正确

项目区分 `failed` 与 `indeterminate`：工具调用在 crash 前是否真正产生副作用，不能靠重放历史或 LLM 猜测。当前实现对 dangling tool state 选择 park，避免 blind retry；完整的 `indeterminate → reconcile/park` resolver 仍属后续阶段。虽然未完成，但问题定义是生产 Agent runtime 必须面对的真实难点。

## 3. 工程成熟度

### 3.1 支持“不是概念仓库”的证据

截至 2026-07-20 查询：

- GitHub API：约 **814 stars、90 forks**，仓库创建于 2026-05-27，仍在高频提交；
- GitHub 页面显示 **2,229 commits**；查询时 main SHA 为 `9c6959ea1a6c127ef4010afd029efd08887d2d1a`；
- monorepo 约 **2,090 files、1,723 个 TS/TSX source files、797 个 test files**；
- 测试文件重点分布：core 58、storage 28、runtime 158、headless 100、desktop 366；
- main 最新 push CI 成功；仓库有 build/typecheck/test/release check，以及真实窗口、visual、computer-use real-model/restart/recovery 的专项脚本；
- 文档会逐章标注 `current` 或 `mixed-current-and-target` 与 `last_verified`，比把路线图伪装成现状更可信。

这些证据说明 Maka 已经是一套真实、规模不小的实现，而非 README 架构图项目。

### 3.2 不能被成熟度数字掩盖的边界

- 根 package 仍是 private monorepo `0.1.0`；README 明确声明数据格式、CLI 与实验能力可能变化。
- 只有一个 `oracle-evidence-*` prerelease，不是面向普通用户的稳定产品 release。
- 默认 canonical Runtime Event store 仍是 JSONL；SQLite 迁移通过 flag 开启，且是 sticky one-way migration，自动备份与部分升级覆盖未完成。
- interrupted-turn safe resume 默认关闭；开启后可能自动调用 provider 并消耗 token。
- Phase 3 side-effect reconciliation 未完成，ambiguous outcome 目前 park。
- 通用 AHE self-iteration runner、部分 verifier adapter 仍未实现。
- computer-use 的一些路径仍是 Desktop foundation / experimental opt-in，不应按“完整跨 surface computer-use”理解。

综合判断：**工程实现 7/10，产品稳定性 3/10，生产安全边界 4/10，架构研究价值 9/10**。这些分数是基于当前公开代码与文档的分析判断，不是项目官方指标。

## 4. 安全与隐私边界

项目安全文档最值得肯定的是没有把 permission prompt 宣称为 sandbox：它明确说对 adversarial LLM 唯一可靠的 enforcement boundary 是 OS user account。

当前关键事实：

- 工具默认以用户 OS 权限运行，不在独立进程/container 中；macOS Seatbelt transformer 存在，但产品 composition 尚未接入；
- permission engine、secret redaction、URL allowlist 都只是 UX heuristic，不是 containment；
- provider/API/OAuth/bot credentials 保存在 workspace 下的明文 `credentials.json`，依靠目录 `0700`、文件 `0600` 与 OS account；
- Electron renderer sandbox + preload IPC 是 load-bearing boundary，明文 secret 不应从 main 返回 renderer；
- Headless real-model eval 默认 fail closed，并要求显式外部 isolation boundary。

因此，local-first 在 Maka 中意味着“数据默认留在本机”，不等于“Agent 进程被安全隔离”。这是试用与二次开发时最重要的风险说明。

## 5. 放到现有 Agent 产品坐标里

| 项目 | 主要产品边界 | Maka 的区别 |
|---|---|---|
| Claude Code / Codex | 成熟 coding-agent 产品与 harness | Maka 更开放、更 local-first、更强调多 surface 与事件投影，但模型效果、产品稳定性和隔离成熟度弱得多 |
| kimi-cli | 极简可扩展 coding harness、Wire、D-Mail、cross-brand skills | Maka 不是只做 CLI loop，而是同时建设 Desktop、durable task、evidence、recovery 与 eval runtime |
| Eve | filesystem-first Agent application framework + managed/self-host runtime | Maka 更像个人 workspace/runtime 产品；Eve 更像供开发者编译 Agent application 的框架与部署契约 |
| Osaurus | Mac-native personal Agent control plane + local inference | 二者都押注 local-first persistent harness；Osaurus更强调本地 inference/identity/automation，Maka 更强调 event sourcing、task evidence 与 crash semantics |
| Go Micro | 分布式 business-agent service runtime | Go Micro 面向服务注册、RPC、broker 与长期业务服务；Maka 面向单用户桌面工作、CLI 与 Headless task |

Maka 的差异化不是“本地桌面 Agent”这个品类本身，而是 **execution fact ledger + context projection + task evidence** 这一套统一语义。如果这套语义最终真正跨 Desktop、CLI、Headless、computer-use 与 integrations 稳定工作，它会比普通 desktop wrapper 更有长期资产价值。

## 6. 对 Combo 的 insight

### 值得吸收

1. **Verified Run Ledger 应从 append-only facts 开始**  
   Combo 不应只存最终结果、评分或 Agent 自报状态。最小 receipt 应包含 task identity、capability/version、permission decision、tool attempt/result、artifact identity、verification evidence、termination reason 与人工介入。

2. **Context 与 evidence 必须分层**  
   Context Packet 可以裁剪、总结和个性化；交付证据不能随 context compaction 消失。对 Combo 来说，这直接关系到退款、争议、创作者结算和 reputation。

3. **“Agent 说完成”不等于可结算**  
   Maka 的 self-check authority boundary 很适合 Combo：创作者 Agent 可以提交 claim/evidence，但付款、退款与 reputation 更新必须由 capability-specific verifier 或 human approval 决定。

4. **把 indeterminate 当一等状态**  
   支付、发布、发消息、删除、调用外部创作工具都可能发生“请求已发出但响应丢失”。Combo 的 ledger 至少需要 `prepared / dispatched / succeeded / failed / indeterminate / reconciled / parked` 一类语义，不能把 timeout 简化为 failed 后自动重试。

5. **同一事实脊柱，多种 surface**  
   Combo 未来的 creator console、buyer UI、Agent API 与后台审核不应各自定义交付状态；应该读取同一 event/receipt spine 的不同 projection。

### 不应照搬

1. **不要自己重造通用 Agent runtime**：Maka、Eve、Codex、Claude Code、Go Micro 已说明 runtime 是拥挤且资本密集的基础设施层。Combo 的 wedge 仍应是专业能力产品化、买卖双方工作流、验证、确权、结算和 reputation。
2. **不要把 local-first 当当前核心需求证据**：Maka 证明本地控制面有技术价值，不证明创作者愿意为 Combo 的本地 runtime 付费。
3. **不要继承 plaintext credential 与 OS-account-only boundary**：若 Combo 涉及第三方 capability、支付或跨用户调用，需要更强的 credential broker、tenant isolation、least privilege 与 revocation。
4. **不要先实现通用 event-sourcing 宇宙**：先为一个垂类定义最小 Verified Run Receipt；只有真实订单显示多个 surface/consumer 需要重建状态时，再扩成通用 event spine。

## 7. 最终判断

**值得认真跟踪，也值得读源码；不建议现在把它当日用主力或 Combo 的直接依赖。**

如果研究 Agent runtime，Maka 当前最值得读的不是 Desktop UI，而是：

1. Runtime Event Log 与 projection；
2. Turn Evidence / Tool Result pruning / Compaction；
3. Task Event Log 与 TaskRun；
4. Heavy-task Self-check gate；
5. crash resume、tool journal 与 `indeterminate` 设计。

如果只想找一个立即可用、稳定、隔离完善的桌面 Agent，它还太早；如果想研究“Agent 执行事实怎样支撑恢复、验证和长期任务”，它是目前公开项目里相当有思想密度的一例。

## 数据来源

- [Maka GitHub repository](https://github.com/maka-agent/maka-agent)
- [README](https://github.com/maka-agent/maka-agent/blob/main/README.md)
- [Architecture](https://github.com/maka-agent/maka-agent/blob/main/ARCHITECTURE.md)
- [Security policy](https://github.com/maka-agent/maka-agent/blob/main/SECURITY.md)
- [GitHub Actions](https://github.com/maka-agent/maka-agent/actions)
- [agent-runtime](/wiki/concepts/agent-runtime/)
- [harness-engineering](/wiki/concepts/harness-engineering/)
- [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)

---
*由 LLM 从知识库查询生成*
