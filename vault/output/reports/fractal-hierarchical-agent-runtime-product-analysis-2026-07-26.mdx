# Fractal：让 Coding Agent 递归组成一支可治理的软件团队

> 生成时间：2026-07-26
> 查询：[plasma-ai/fractal](https://github.com/plasma-ai/fractal) 这个产品在做什么，核心设计思路和场景是什么
> 研究快照：GitHub `main` SHA `0e36514d3b2a945d414dd684610b9453663806a7`；PyPI `plasma-fractal 1.0.0`

## 摘要

**Fractal 是一个本地运行、Git-native 的多 Coding Agent 编排器。** 它不提供新模型、云端 sandbox 或通用 Agent API，而是把 Claude Code、Codex、Grok Build、OpenCode、Oh My Pi 这些现成 Coding Agent 包进同一种自治节点：每个节点拥有自己的 Git branch/worktree、tmux iteration loop、任务合同、私有记忆，并可继续生成子节点。

它最核心的产品判断是：

> **复杂软件任务不应全部塞进一个越来越长的 Agent context；应把任务拆成一棵按需生长的 Agent 组织树，用 Git 隔离工作、用明确合同分工、用预算和状态机约束自治，再把结果逐层合并回来。**

因此 Fractal 更像 **Coding Agent fleet 的本地 process manager + organization runtime**，而不是普通 multi-agent chat framework。它最适合模块边界清楚、可并行、可用 tests/Git 验收的长周期软件任务；不适合小改动、强耦合同文件协作、敏感生产环境或非 Git 工作流。

## 1. 它到底在做什么

用户先在一个普通 Git repo 里初始化 Fractal。此时当前 branch 成为不运行 Agent 的 user/root node，也是人的操作席。之后用户或一个正在运行的父 Agent 可以创建子节点：

```text
user/root: main
└── main.feature
    ├── main.feature.backend
    ├── main.feature.frontend
    └── main.feature.tests
```

每个非 root 节点同时是四个对象：

1. 一条 Git branch；
2. 一个独立 Git worktree；
3. 一个在 tmux 中持续运行的 iteration loop；
4. 一个包含 `NODE.md`、steps、scripts、skills、plans、memory 和 config 的节点目录。

整棵树共享一个 SQLite control plane，保存 node、run、iteration、step、cost、event、signal、message 和 approval 状态。节点之间通过 Radio mailbox 汇报进度、接收指令和协调子任务；操作员可通过 CLI/TUI 观察、pause、resume、stop、kill、steer、approve 和 merge。

节点默认每轮执行：

```text
PREPARE → PLAN → EXECUTE → REVIEW → COMMIT
```

- `PREPARE` 同步父分支并集成已完成的子节点；
- `PLAN` 读取任务合同、私有 memory 和共享 wiki，决定本轮计划以及是否继续拆子节点；
- `EXECUTE` 做代码和验证；
- `REVIEW` 检查 diff、tests、知识和交付完整性；
- `COMMIT` 提交本轮结果；
- loop 未收到完成信号时继续下一轮，直到完成或触发 iterations/time/cost 上限。

官方架构和源码可确认这些对象真实存在，不只是 README 概念：当前源码约 31,395 行 Python，测试约 43,093 行 Python；数据库 schema、五个 Agent adapter、lifecycle、budget、Radio、TUI、merge 和大量 integration tests 均已实现。但这些只能证明工程实现密度，不能证明同等成本下的任务成功率优于单 Agent 或原生 sub-agent。

## 2. 核心设计思路

### 2.1 固定执行底座，动态生成组织结构

Fractal 不是先让人画好一个固定 DAG。每个 node 都拿到同一套递归能力：如果任务可分、上下文应隔离或需要独立验证，它可以通过 CLI 创建、配置和启动自己的 child。树的深度与宽度因此由任务在运行中决定。

需要去掉神秘化：所谓“recursive self-organization”并不是一个独立的自动分解算法。真正做拆解判断的仍是底层 LLM；Fractal 提供的是：

- `NODE.md` 和 Skill 中的分工规则；
- child init/start/merge 的可调用 CLI；
- worktree、budget、scope、status 和 message 等硬原语；
- 对 depth、children、descendants 的确定性上限。

也就是说，**LLM 负责组织判断，runtime 负责让这个组织判断可以执行、观察和收束。**

### 2.2 用 context isolation 换取复杂任务的可管理性

每个子节点有独立 Agent session、计划、memory、分支和任务合同。父节点不必把子节点全部过程塞回自己的 context，只需读取其提交、Radio 进度和最终结果。这与 [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) 中的 context firewall 一致，但 Fractal 把临时 sub-agent 提升成有生命周期和 Git identity 的长期 worker。

它试图解决的是单 Agent 长任务的三个结构性问题：

- context 越来越长，任务边界和注意力变差；
- 多个独立问题串行处理，浪费 wall-clock；
- 中途失败、重启或换模型后，状态只存在于对话里。

### 2.3 把 Git 变成协作协议，而不只是最终版本库

Fractal 用 branch/worktree 隔离并行写入，用 commits 保存每轮 artifact，用 parent/child branch 表达组织关系，用 squash merge 将已验收结果逐层收束。工作成果的真源是可 diff、可 test、可 review 的 repo，而不是 Agent 的自然语言总结。

这让它天然适合 coding，也限制了它的边界：它并没有为支付、发消息、浏览器账户或数据库 transaction 提供幂等性和 side-effect reconciliation。Git 能很好地管理代码变更，不能自动治理外部世界的不可逆动作。

### 2.4 自治必须有 budget、lifecycle 和人工刹车

每个节点可配置 iterations、run/iteration/step timeout、depth、children、descendants、scope 和 cost cap；还提供 `idle / active / paused / completed / stopped / exited / killed / retired` 状态机、tree-wide pause、crash reconciliation 和 operator steering。

这是 Fractal 相对轻量 sub-agent prompt 的核心增量：**它不是只让 Agent 多开几个会话，而是给会话加了运行账本和控制面。**

不过控制并不等于完全安全：

- timeout 是进程级硬停止；
- depth/width/scope 是结构性约束；
- run cost 根据后端能力可能只在 step 之间或事后生效，Codex 等后端的 step cost 不是硬限额；
- step approval 是 workflow checkpoint，不是每个 tool action 的 permission gate。

### 2.5 把管理过程也做成一等 artifact

Fractal 不只记录最终 commit，还记录 run/iteration/step、cost、plan、Radio、read receipt、approval、signal 和 lifecycle event。节点另有 private memory，项目还有所有节点共享的 wiki。

它的 thesis 与 [agent-runtime](/wiki/concepts/agent-runtime/)、[harness-engineering](/wiki/concepts/harness-engineering/) 一致：可靠性主要来自 model 外部的状态、反馈、恢复和验证机制，而不只是换更强模型。

## 3. 最适合的场景

| 场景 | 为什么适合 | 典型拆法 |
|---|---|---|
| 大型 feature / repo-wide migration | 工作可按 package、layer 或验证面分开，最后可通过 Git/tests 集成 | backend / frontend / schema / tests / docs |
| 长周期重构与技术债治理 | 需要多轮 plan-execute-review，且希望中途暂停、续跑、看成本 | inventory / implementation / compatibility / benchmark |
| 多实现并行探索 | 独立 worktree 允许多个节点做不同方案，父节点比较后选择性合并 | approach A / B / independent reviewer |
| 大规模测试、审计、文档补全 | 任务可按目录或问题簇切分，结果易通过 diff 和 checks 验收 | package owners / security / test gaps / docs |
| 异构 Agent / model 分工 | manager、实现、机械检查可使用不同 backend/model/cost profile | frontier manager + cheaper leaf workers |
| 需要人随时监督的 unattended coding | TUI、Radio、budget ledger、pause/resume 和 approval 能提供 operator control | 夜间长任务、阶段性人工放行 |

一个好的 Fractal 任务通常同时满足：

1. 交付物在 Git repo 中；
2. 至少有两个真正可分离的工作面；
3. 子任务能用明确文件 ownership、tests 或 completion requirement 验收；
4. 并行收益大于 node 配置、同步、Review 和 merge 成本；
5. 允许在 disposable/sandboxed host 上运行。

## 4. 不适合的场景与真实边界

### 小任务会被组织开销吞掉

一次 iteration 默认包含五次工作 step，并在每个 step 前运行 SYNC。对改一个函数、修一处文案或半小时能完成的任务，原生单 Agent 往往更快、更便宜。Fractal 自己也允许给 leaf 裁剪 steps，这反向说明默认完整 loop 的 overhead 很重。

### 强耦合修改不适合通过 worktree 强行并行

多个节点同时修改同一批核心文件，最后仍会把复杂性推迟到 merge。公开 [issue #9](https://github.com/plasma-ai/fractal/issues/9) 报告了 v1.0.0 长寿命五节点树中的 squash-merge stale-file regression 和 child seed 泄漏，甚至可能把其他节点的 task contract conflict markers 写入一个运行中节点的 `NODE.md`。该报告不是独立复现，但截至查询时 issue 仍 open，足以说明复杂树目前必须做 merge 后 scope diff 和人工核验。

### Worktree 是代码隔离，不是安全 sandbox

官方 README 明确警告，所有 seeded backend 默认绕过 permission prompt：Claude `bypassPermissions`、Codex `danger-full-access`、Grok `always-approve`、OpenCode `--auto`、OMP `--yolo`。节点与用户共享机器权限、凭证和网络；worktree 只隔离 Git branch，不能隔离 filesystem、network 或外部账户。

这与 [safe-autonomy](/wiki/concepts/safe-autonomy/) 的分层原则存在明显缺口。涉及生产凭证、客户数据、部署账户、支付、删除或发布权限时，应只在额外 container/VM、最小权限 credential、egress policy 和可回收环境中运行。

### 它是本地 coding orchestrator，不是 distributed agent cloud

核心依赖本机 Git、tmux、filesystem 和单一 SQLite database。公开 [issue #3](https://github.com/plasma-ai/fractal/issues/3) 也说明无 tmux 的 locked-down/headless 环境尚不能完整运行多节点树。它不提供 OpenComputer/HarnessRouter 那类 hosted sandbox、multi-tenant API、credential broker、webhook delivery 或 SLA。

### “self-organizing” 不等于结果自动可靠

节点是否拆对、给 child 的合同是否清楚、预算是否足够、tests 是否能覆盖结果，仍由 Agent/操作者质量决定。源码与 tests 证明 runtime 机制真实，但官方目前没有公开：

- 与单 Agent、原生 Claude/Codex sub-agent 的同任务 benchmark；
- accepted-output cost、成功率或 wall-clock 改善；
- 大规模长期树的 merge conflict / intervention rate；
- 生产客户、留存或 ROI。

因此“机制已实现”是已验证，“在真实复杂任务上更好”仍未验证。

## 5. 它和相邻产品到底有什么区别

| 类别 | 主要解决什么 | Fractal 的区别 |
|---|---|---|
| Claude Code / Codex 原生 sub-agent | 一次主任务中的短期委托和 context isolation | Fractal 给 child 长期 branch/worktree、循环、账本、预算和递归生子能力 |
| LangGraph / CrewAI 等 workflow | 在应用代码中定义 Agent graph、state 和 routing | Fractal 不要求先编码固定 graph，拓扑由运行中的 Coding Agent 按需生成 |
| OpenComputer / HarnessRouter | hosted compute、sandbox、durable Session 或应用 Agent API | Fractal 不托管 compute，也不是应用 backend；它在开发者本机组织现有 CLI agents |
| GitHub Actions / CI | 确定性 workflow、checks 和部署 | Fractal 负责推理型、开放式 coding；CI 仍应承担确定性验收 |
| 普通 tmux + git worktree 脚本 | 并行运行多个 Agent | Fractal 多了递归组织、lifecycle、budget、Radio、plans、memory、TUI 和统一账本 |

一句话定位：

> **OpenComputer 给 Agent 一台可持续的电脑；HarnessRouter 把 Agent 包成应用 API；Fractal 把多台现成 Coding Agent 组织成一支会递归分工的本地软件团队。**

## 6. 最终判断

Fractal 的设计思想是成立的，而且实现密度高于普通“multi-agent prompt demo”。它把三件常被混在一起的事分开了：

1. LLM 做任务拆解和技术判断；
2. Git/worktree 做 artifact 与并行写入隔离；
3. runtime 做生命周期、成本、通信、暂停恢复和人工控制。

最值得借鉴的不是“Agent 数量越多越强”，而是：

> **只在任务真正可分时增加节点；每个节点有独立 context、明确合同和可验收 artifact；自治必须由预算、状态机和 operator control 收束。**

如果要试用，建议先选一个无敏感凭证、可回滚、边界清楚的 repo 任务，用 1 个 manager + 2–3 个 disjoint leaf nodes 做对照实验；同时保留单 Agent baseline，比较 accepted output、总 token/cost、wall-clock、人工干预和 merge 修复成本。不要直接从大型生产 monorepo 或高权限主机开始。

## 数据来源

- [Fractal GitHub repository / README](https://github.com/plasma-ai/fractal)
- [Fractal Architecture](https://docs.plasma.ai/fractal/guide/architecture.html)
- [The Iteration Loop](https://docs.plasma.ai/fractal/guide/loop.html)
- [Node Lifecycle](https://docs.plasma.ai/fractal/guide/lifecycle.html)
- [Radio](https://docs.plasma.ai/fractal/guide/radio.html)
- [Plans and Steps](https://docs.plasma.ai/fractal/guide/plans.html)
- [PyPI `plasma-fractal 1.0.0`](https://pypi.org/project/plasma-fractal/)
- [Issue #9: squash-merge topology failures](https://github.com/plasma-ai/fractal/issues/9)
- [Issue #3: tmux-free headless execution](https://github.com/plasma-ai/fractal/issues/3)
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- [agent-runtime](/wiki/concepts/agent-runtime/)
- [harness-engineering](/wiki/concepts/harness-engineering/)
- [safe-autonomy](/wiki/concepts/safe-autonomy/)
- [opencomputer-vs-harnessrouter-2026-07-26](/output/reports/opencomputer-vs-harnessrouter-2026-07-26/)

---
*由 LLM 从知识库查询生成*
