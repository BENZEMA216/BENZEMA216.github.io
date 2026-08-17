<!--
date: 2026-04-28
tags: [openai, codex, frontier, harness-engineering, symphony, agent-legible-software]
status: active
trigger: 用户问「OpenAI Ryan Lopopolo 的极端 Codex 实验是什么？」
related:
  - "[extreme-harness-engineering-token-billionaires](/raw/articles/harness-engineering/extreme-harness-engineering-token-billionaires/)"
  - "[harness-engineering](/wiki/concepts/harness-engineering/)"
  - "[harness-engineering](/wiki/maps/harness-engineering/)"
-->

# OpenAI Ryan Lopopolo 的极端 Codex 实验

## 一句话结论

Ryan Lopopolo 的「极端 Codex 实验」不是简单的 vibe coding，而是 OpenAI Frontier Product Exploration 团队把一个真实内部 beta 产品的工程系统改造成 **Codex-first / agent-legible** 的生产线：约五个月内，用 Codex 生成并推进超过 100 万行代码、数千个 PR，约束为 **0 human-written code**，并进一步走到 **merge 前不做人类逐行 code review**。

核心目标不是证明「人类不用管代码」，而是验证：当 token 和 GPU 可以高度并行时，真正稀缺的是同步人类注意力；人类应该从写代码和逐 PR review，转向设计 harness、规格、测试、可观测性、质量分数和组织控制面。

## 实验做了什么

- **实验主体**：OpenAI Frontier Product Exploration，一个面向企业大规模部署 agent、治理 agent 的产品探索团队。
- **实验对象**：一个内部 beta 产品，不是 toy demo；代码库超过 100 万行。
- **硬约束**：Ryan 刻意不亲自写代码，让 Codex 端到端承担实现工作。
- **规模**：五个月、数千 PR、跨多个 Codex 模型代际，内部使用量达到每天十亿级 token。
- **更激进的点**：不只是「代码由 AI 写」，而是很多 PR 在 merge 前不再由人类逐行 review；人类 review 更多变成抽样、事后、系统级治理。

这就是文章标题里的「Dark Factory」含义：代码生产流水线里，人工不再站在每一道工序旁边手动验收，而是在更高层设计工厂、传感器、闸门和返工机制。

## 关键工程方法

### 1. Agent 失败时，不是改 prompt，而是补系统

他们的工作方式是：当 Codex 做错，不先归因于「模型不够努力」，而是追问缺了什么：

- 缺少更小的 building blocks？
- 缺少规范或非功能要求？
- 缺少测试、lint、CI、observability？
- 缺少 repo 结构或构建系统上的可操作性？

所以每次失败都会被转化为 harness 改进：文档、脚本、测试、质量分数、review 规则、构建拆分或工具封装。

### 2. 把 repo 变成 agent-legible software

传统代码库主要服务人类读写；这个实验里，代码库也必须服务 Codex 稳定操作。具体包括：

- 根目录文档、skills、SPEC、quality score、tech tracker 等文本化上下文。
- 错误信息和脚本输出尽量告诉 agent 下一步怎么修。
- CLI 优先于复杂 GUI，因为 CLI 对 agent 更 token-efficient。
- 代码结构极度模块化，以适应多 agent 并行和低冲突合并。

这里的重点是：软件不只要 human-readable，还要 agent-legible。

### 3. 内循环必须快，构建时间变成 harness 指标

早期 Codex 很慢，前一个半月甚至比 Ryan 自己写慢约 10 倍。后来他们发现，agent 的生产力高度依赖 build/test inner loop，于是把一分钟作为大致上限，甚至为了保持这个上限重做构建系统：从 bespoke Makefile，到 Bazel、Turbo，最后到 Nx。

这个细节很关键：agent coding 的速度不是只由模型决定，也由 repo 的反馈延迟决定。构建慢，本质上就是 harness 差。

### 4. 人类从 PR reviewer 变成系统设计者

当 Codex 可以并行跑很多任务时，瓶颈不再是 token，而是团队成员的同步注意力。于是人类的职责上移：

- 定义产品方向和不可自动化的高难新问题。
- 把工程 taste 写成 docs、tests、review rules 和 quality scores。
- 设计 observability，让 agent 能定位和修复问题。
- 抽样检查系统产物，而不是逐行审每个 PR。
- 对 release branch / smoke test 等高风险节点保留人工闸门。

换句话说，Ryan 更像是在 tech lead 一个 500 人工程组织，而不是自己做每个 PR 的 author/reviewer。

### 5. Symphony：把多 Codex agent 编排成生产系统

Symphony 是 OpenAI 内部/参考的 Elixir 编排层，用来启动、监督、返工、协调大量 Codex agent。它解决的是「人不想坐在 terminal 前切换几十个 tmux pane」的问题。

它的核心能力包括：

- 从 ticket / spec 启动 Codex worker。
- 等待 PR、CI、review、merge queue。
- 失败时进入 rework，甚至丢弃整个 worktree 和 PR，从头再做。
- 让人类只在少数高层判断点做 yes/no 或指出返工原因。

这把 coding agent 从「我旁边的 copilots」推向「可编排的 worker fleet」。

### 6. Ghost libraries：用高保真 spec 分发软件

实验里还出现了「ghost libraries」思路：不直接开源或共享完整实现，而是让 Codex 从 proprietary repo 提炼高保真 spec，再让另一个 Codex 仅凭 spec 复现系统；再用 reviewer Codex 比对差距，循环改进 spec。

这说明在 agent 时代，软件的可分发形态可能从 source code 变成「足够让 agent 重建系统的 specification」。

## 为什么重要

这个实验给 [harness-engineering](/wiki/concepts/harness-engineering/) 增加了一个很强的实证案例：

1. **模型不是全部**：Codex 能力强，但真正释放生产力的是围绕它的 harness、repo shape、build loop、observability、skills 和 specs。
2. **token 不是瓶颈，人类注意力才是瓶颈**：当 agent 可并行时，人类逐 PR 控制会压垮吞吐。
3. **代码变得更 disposable**：如果一个 PR 不好，可以让 agent 丢掉重做；更耐久的资产是 spec、tests、quality score 和 architecture constraints。
4. **工程组织形态变化**：工程师从 author/reviewer 转向 operator/architect/evaluator，管理的是 agent 生产系统。
5. **agent-legible software 会成为新标准**：未来优秀代码库不只是给人看，也要给 agent 稳定运行。

## 边界与误读

这个实验不等于所有团队明天都应该取消 code review。它成立有几个前提：

- greenfield repo，历史负债少；
- OpenAI 内部 token / model / Codex access 条件极强；
- 团队有足够强的工程判断去设计 harness；
- 仍然保留 release、smoke test、治理和安全边界；
- 主要目标是探索 Frontier / enterprise agent 平台能力，而不是给所有业务代码提供通用模板。

所以更准确的理解是：这是一次 **extreme harness engineering** 实验，展示当模型、token、工具和工程系统一起被优化时，软件生产线可以被推到多远。

## 参考来源

- [extreme-harness-engineering-token-billionaires](/raw/articles/harness-engineering/extreme-harness-engineering-token-billionaires/)：Latent Space 对 Ryan Lopopolo 的访谈原文。
- [harness-engineering](/wiki/concepts/harness-engineering/)：知识库中的 Harness Engineering 概念页。
- [harness-engineering](/wiki/maps/harness-engineering/)：Harness Engineering 主题地图。
