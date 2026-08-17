# 知识库整理、最近 Session 补档与 Lint 报告

> 日期：2026-08-04
> 范围：`raw/`、`wiki/`、`output/`、`active_context.md` 与近期本地 Codex sessions
> 状态：仅本地工作树；未 commit、未 push

## 结论

本轮没有执行覆盖式 `/kb-compile --force`，而是完成了“session 对照 → 高价值补档 → Wiki 增量回流 → 索引修复 → 全库 lint”。原因是当前仓库没有可执行的全量 compiler / dry-run / manifest，现有 compile skill 是 LLM 操作模板；它只描述从 `raw/` 重建 `wiki/`，而本库正式 schema 允许高价值 `output/` 回流，直接覆盖会丢失现有来源关系和未提交工作。

近期共审计 135 个相关 session 文件，去除子代理后为 28 个 root sessions（含本次整理）。已确认：11 个高价值主题已有 Vault 表达；2 个真实遗漏已补档；2 个工程 session 的长期原则合并为 1 份脱敏报告；1 个仍在推进的发布线程没有被误写成完成事实。

## 最近 Session 对照

| 分类 | 数量 | 处理 |
|---|---:|---|
| 已有完整表达的高价值主题 | 11 | 保留 SITIN、Prelint、DeNovo、Combo 战略 / 竞品 / 框架、AppLovin、Ego Lite、QIMENG、个人网站、MPAI、Bifrost 等现有 report，并补深层回流 |
| 明确遗漏 | 2 | 新增 Pronto 信号产品判断与 Combo Knowledge Agent 公开行为验收 |
| 可长期复用的工程原则 | 2 sessions → 1 report | 脱敏提炼 Linear / issue、Git、本地 checkout、CI、Test、Production 的事实分层，以及 snapshot + selective migration |
| 进行中发布线程 | 1 | 不提升为 canonical 产品事实；稳定后再做 release / acceptance postmortem |
| 可选低优先级 side project | 1 | Grill My Startup 已有独立 public repo，但不是当前 Vault 的核心知识主线，本轮不机械复制 |

新增归档：

- `output/reports/pronto-stream-signal-to-action-product-analysis-2026-08-03.md`
- `output/reports/combo/03-product/combo-knowledge-agent-live-dialogue-check-2026-08-03.md`
- `output/reports/combo/03-product/combo-repo-control-plane-and-release-boundaries-2026-08-04.md`

最近工作树中已有但尚未提交的 MPAI、Bifrost 与个人网站 GenUI 产出也完成了索引确认和深层回流，没有因只检查 Git commit 而被漏掉。

## Wiki 回流

- Bifrost 回到 `model supply / gateway / runtime / tool routing` 分层，不把 provider / model / key routing 误写成业务 Tool Routing，也不把 Gateway 误写成完整 Agent Runtime。
- MPAI 回到 `session gateway / collaboration surface`，明确它共享的是 Host 上既有 Agent session，而不是 Agent-to-Agent 协议或多个 Agent route。
- QIMENG 的长期增量回到 Agent Loop 与 Self-Verification：correctness `generate → verify → repair` 内环和 performance `search → measure → prune` 外环分离。
- Pronto 回到 trajectory：只有 `signal → decision → action → outcome` 可观测，数据聚合才可能从信息展示升级为业务价值。
- Combo Knowledge Agent 回到 KAN 与项目地图：知识库是可选 evidence plugin；黑盒四轮成功不外推 citation 质量、长期记忆、并发或 SLA。
- Combo 战略的当前事实、未来平台 thesis 与承销 Gate 继续分层；工程状态则使用 Issue → Local → Git / PR → CI → Test → Production evidence ladder。

## 覆盖与索引修复

- 为 6 个此前漏记的 raw Markdown / TXT source 补齐 `_summaries.md`，并识别 Cola 英文版与中文版本是同一分析的双语 source，而不是两项独立证据。
- 为 2 个此前漏记的 output report Markdown 补齐 `_summaries.md`。
- 将 `output/ideas/_index.md` 作为 116 个历史 sessions / 12 个 idea 的聚合入口接入，避免机械展开 14 个文件；它不代表当前优先级。
- 修复 `_index.md` 中 `agent-economy`、`product-research`、`startup`、`harness-engineering` 四个目录计数和 Cola 路径漂移。
- 清理 `_summaries.md` 中 35 个不存在的历史 raw 路径：34 个早期 Prompt 模块改为“已合并的历史设计清单”，`raw/articles/设计原则.md` 映射到现存 `raw/articles/即梦设计原则？.md`；stale raw reference 降为 0。
- 修复 `[CLAUDE](/CLAUDE/)` 双目标歧义；修正 AGENTS 里的 `.Codex/commands/` 为实际 `.agents/skills/`；移除 README / AGENTS 中会持续漂移的硬编码规模。
- 明确 Wiki page footer 可按真实 provenance 标注 `raw/` 或 `raw/ + output/`，不再把 query 回流伪装成 raw-only 编译。

## Lint 结果

| 检查 | 结果 |
|---|---|
| 物理规模 | `raw/` 347 文件，其中 344 个内容文件；`output/reports/` 187 个 Markdown；35 concepts / 9 maps / 9 connections |
| `_summaries.md` 覆盖 | 174 / 174 个 raw Markdown / TXT；187 / 187 个 output report Markdown |
| `_summaries.md` stale raw reference | 0（35 个旧引用已校正） |
| YAML frontmatter | 解析错误 0 |
| Concept / Map / Connection footer | 53 / 53 |
| Compiled Wiki 孤儿页 | 0 |
| Wiki-link | 断链 0、歧义 0；已知 `[CLAUDE](/CLAUDE/)` 双目标已消除 |
| 格式 | `git diff --check` 通过 |
| raw 不变性 | 本轮 tracked raw diff 0；工作树中已有一份未提交 GenUI raw source，本轮未修改 |
| 敏感信息 | 新增报告与 Wiki diff 未发现实际凭据；Cookie、conversationId、私有路径、主机、Preview 地址、临时工程 SHA 与部署秘密未写入 session 补档 |

## 有意不收录的边界

- 2 个私密投资 DD session 不进入公开 Git Vault。
- 不复制原始 session JSONL、完整对话、Cookie、conversationId、临时响应或任何凭据。
- 一份录音分析的 speaker attribution 曾被纠正但尚未完成回听与 Base read-back；本轮只加显式警告，不继续提升其参与者归因结论。
- 自动巡检、私人录音、健康问诊、私有 repo、聊天数据与图片编辑等任务型 session 不当作长期知识。
- 一个近期开发 session 的输入中出现 API credential；该值没有进入 Vault，但应在对应服务侧轮换。

## Git 边界

本轮没有 stage、commit、branch switch、merge、rebase、push 或部署。工作树在开始时已经包含最近几次 session 的未提交修改；本轮保留并增量整理，没有覆盖或清理这些用户工作。
