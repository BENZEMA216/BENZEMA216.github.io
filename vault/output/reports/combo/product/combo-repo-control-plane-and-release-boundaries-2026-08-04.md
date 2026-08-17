# Combo 仓库工作控制面与发布状态边界

> 整理时间：2026-08-04
> 来源边界：从近期 Combo 工程 session 提炼可长期复用的操作原则；不保留当时的分支名、SHA、文件数量、私有路径、主机拓扑、Preview 地址、凭据或部署秘密。本文不是当前环境状态快照。

## 结论

Combo 的工程状态必须分成四类事实，不能用一个“已经做了”替代：

1. **工作控制面**：Linear / issue 记录目标、owner、优先级、依赖与验收；
2. **代码事实**：Git commit、branch、PR 与 review 记录实际可审查变更；
3. **部署事实**：CI 通过、Test 已部署并配置、Production 已晋升是三种不同状态；
4. **本地事实**：未提交文件、ignored artifact、临时环境与本机服务只存在于 checkout，云端 Agent 和 GitHub 默认看不到。

因此，Linear 适合做“下一步做什么”的工作控制面，GitHub 适合做“究竟改了什么”的代码事实层；两者互补，任何一方都不能代替本地 checkout 审计和运行时验收。

## 状态分层

| 层 | 能证明什么 | 不能证明什么 |
|---|---|---|
| Linear / issue | 任务意图、owner、优先级、依赖、验收口径 | 代码已存在、PR 已合并、部署已生效 |
| Local checkout | 当前机器上的 tracked / untracked / ignored 状态和本地运行结果 | 远端已有同样内容、其他人可复现 |
| Git commit / PR | 可审查 diff、作者、review、合并拓扑 | Test 环境已配置或功能已在真实依赖下工作 |
| Remote CI | 某 SHA 在 CI 预设条件下通过 | Test gateway、密钥、回调、数据库和真实外部服务已就绪 |
| Test deployment | 特定版本在测试环境可访问并完成验收 | Production 已晋升、真实用户交易与长期稳定性 |
| Production | 特定版本已发布到生产 | 业务结果、付费、退款、复购和单位经济成立 |

## 混合脏分支的安全迁移

当一个 checkout 同时混有多条功能线、未提交工作和历史分支时，先建立可恢复边界，再做迁移：

1. 只读清点 branch、upstream、merge-base、tracked / untracked / ignored 与运行服务；
2. 把可识别工作按功能分批，拒绝 bulk stage；
3. 先生成可恢复 snapshot，再为每个获批批次创建小而清楚的 commit；
4. 从目标基线创建新的 worktree；
5. 只迁移经过确认的 commit / patch，不把整个混合分支一并带入；
6. 在新 worktree 重跑对应测试和构建，最后再决定是否发 PR 或部署。

任何 rebase、merge、clean、branch switch、push 或覆盖操作都应建立在明确拓扑和用户授权上。

## 发布与支付验收纪律

- Fake / CI 测试只能证明代码路径被模拟覆盖；
- 真实 Test readiness 还要证明部署版本、配置、第三方 gateway、回调、幂等、余额或订单状态的 read-back；
- redirect 成功不等于支付入账，前端成功页也不等于服务端已经 credit；
- Production 需要独立的晋升、回滚、监控与真实交易证据；
- 所有状态报告都应附时间和被核验的 SHA / 环境，但这些漂移数据留在 repo runbook 或当次审计，不升为本 Wiki 的长期事实。

## 何时回写知识库

可长期复用的流程原则、失败模式和验收边界可以进入 Wiki。具体分支、主机、凭据、Preview 地址、临时日志、机器资源和进行中的发布状态只留在工程系统；任务稳定后，再做脱敏的 release / acceptance postmortem。
