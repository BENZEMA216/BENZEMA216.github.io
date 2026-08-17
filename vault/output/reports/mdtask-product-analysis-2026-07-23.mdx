# mdtask 产品速析

> 生成时间：2026-07-23
> 查询：https://mdtask.dev/ 这个产品在做什么？

## 摘要

mdtask 是一个面向 Coding Agent / Agentic Coding 的 **Git-native、Markdown-first Spec-Driven Development 工具**。它不是 Jira、Linear 一类协作 SaaS，也不是会自己写代码的 Agent；它把“系统现在如何工作”的 spec 和“接下来要做什么”的 task 放进同一个 Markdown 文件，再用 CLI 提供 ID、筛选、优先级、依赖和归档等轻量 tracker 能力。

它希望形成的最小闭环是：

> Agent 选择一个未阻塞任务 → 实现并验证代码 → 勾选任务 → 把已实现行为写回 spec → 在同一个 Git commit 中提交。

因此它真正解决的不是“没有任务管理工具”，而是 **代码已改变、任务已关闭，但 spec 已经过时** 的漂移问题。

## 它具体怎么工作

一个 spec 就是一个普通 Markdown 文件：

```markdown
# Authentication

Users sign in with email and password.

# Tasks

- [x] AUTH-001 Add email and password login
- [ ] AUTH-004 Add passwordless magic-link login !high
- [ ] AUTH-005 Rate-limit magic links @blocked_by:AUTH-004
```

文件上半部分描述当前真实行为，下半部分的 checkbox 同时充当 backlog 和完成历史。mdtask CLI 扫描 repo 中的 Markdown：

- 给任务分配稳定 ID；
- 用 `#tag`、`!priority`、`@key:value` 表达标签、优先级和自定义字段；
- 理解 `@blocked_by:TASK-ID` 依赖；
- 支持 `list`、`view`、`open`、`move`、`set`、`archive`、`validate` 等操作；
- 输出可供 shell、脚本和 Coding Agent 查询的任务状态。

项目另外提供 Skills：`sdd` 定义 Spec-Driven Development 方法，`mdtask-add` 添加任务，`mdtask-do` 驱动单个任务从选择、计划、实现、更新文档到 commit。**循环执行整个 backlog 的仍是外部 Coding Agent，mdtask 本身不提供 Agent runtime 或 orchestrator。**

## 它和现有方案的差异

| 方案 | 任务/规格放在哪里 | mdtask 的判断 |
|---|---|---|
| Jira / Linear / GitHub Issues | 独立数据库或看板 | 代码 diff 看不到完整任务与 spec 变化 |
| OpenSpec / Spec Kit | 每个 feature 生成 spec、plan、tasks 等独立文件 | 多出一套需要与代码同步的文档系统 |
| `TODO.md` | 普通 checklist | 足够简单，但缺少稳定 ID、依赖、筛选、字段和校验 |
| mdtask | repo 内同一个 Markdown spec | 用 Git diff 同时 review 代码、任务状态和行为文档 |

它可以理解为：

> `Markdown checklist + 轻量 CLI tracker + Agent workflow Skills`

而不是一个新的项目管理平台。

## 谁会真正需要

最适合：

- 个人开发者或小团队；
- 大量使用 Claude Code、Codex 等 Coding Agent；
- 希望 repo 本身就是事实真源；
- 任务可以拆成小块，并由 Agent 一次完成一个；
- 重视跨 session 接力、可读 Git diff 和低工具复杂度。

不太适合：

- 依赖 roadmap、看板、报表、权限、通知和跨团队实时协作的大团队；
- 多人/多 Agent 高频并行修改同一批 spec；
- 需要工具强制证明“实现与 spec 已一致”的高保证场景。

## 我的判断

mdtask 的产品想法是成立的，而且切口很干净：它没有重造 Agent、数据库或 workflow engine，而是把 `spec → task → code → updated spec` 压缩到一个可 review 的 commit。

但它的能力也很薄。官网声称让 spec “never drift”，实际 README 明确说明 CLI **不会强制检查 spec 是否真的更新正确**；Agent 可以直接勾选 checkbox 而不改正文。也就是说，它减少了漂移发生的结构性摩擦，却没有从机制上消灭漂移。并行编辑仍是普通 Git conflict，实时协作、可视化和端到端 Agent loop 也不在产品范围内。

所以更准确的定位是：

> mdtask 是 Agentic Coding 时代的 repo-local 任务协议与执行纪律，不是完整项目管理系统，也不是自动化开发平台。

截至 2026-07-23，GitHub 页面显示项目约 195 stars、5 forks、277 commits 和 2 个 tags，属于已有一定开发密度、但 adoption 仍早期的小工具。代码可见，但采用 PolyForm Shield 1.0.0，禁止用其构建竞争产品，不是 MIT / Apache 式宽松开源许可。

## 数据来源

- [mdtask 官网](https://mdtask.dev/)
- [syabro/mdtask GitHub README](https://github.com/syabro/mdtask)
- [spec-driven-development](/wiki/concepts/spec-driven-development/)

---
*由 LLM 从知识库查询生成*
