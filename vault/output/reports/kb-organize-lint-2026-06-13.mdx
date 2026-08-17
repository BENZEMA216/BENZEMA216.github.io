# 知识库整理 + Lint 报告（2026-06-13）

> 一次 kb-organize：18-agent workflow 审计 → 主循环应用修复。索引同步 + 断链清零 + 孤儿清零 + 矛盾回流 + Clipping 归档。

## 概览

本次对整个 vault 做了一遍系统整理。出发点是 git status 里积压的 60+ 未追踪 output 报告、未收录的 raw 素材和 3 篇 Clippings。审计用 workflow 并行跑了「逐文件摘要 ×13 + 4 个 lint 维度 + 合成」，发现并修复四类问题：

1. **索引漂移**（小）：bookkeeping 其实大体跟得上，仅 8 篇 output 报告缺 `_summaries` 条目、7 篇缺 `_index` 条目。
2. **断链 52 处**（最严重）：`wiki/concepts/` 早期编译时写的 `[[raw/简写]]` 链接全部从未解析——真实文件名带空格/中文，Obsidian 按 basename 解析。**已全部修复，复扫断链 = 0。**
3. **孤儿页 4 个**：4 张关键桥接/综合页零 inbound link。**已补 inbound link，复扫孤儿 = 0。**
4. **矛盾/过时 4 处**：A2A 协议押注张力（master index 早识别但从未回流 concept 页）、"双协议栈事实标准"措辞夸大、UCP 阵营不一致、World Model 论文计数 39→49 漂移。**已全部回流到 concept 页。**

并把 3 篇 Clippings 归档进 `raw/`、轻量回流到相关 concept 页，其中 Dynamic Workflows 提炼成了一篇新 concept。

最终 Wiki 状态：**29 concepts / 7 maps / 8 connections / 71 output reports**。

## 1. 索引同步（已应用）

13 个文件写入 `_summaries.md`（新增「整理批次 2026-06-13」段）+ `_index.md`：

| 文件 | 去向 section | 一句话 |
|---|---|---|
| `output/reports/china-product-startup-first-funding.md` | Agent Economy | 国内产品型创业第一笔融资全景（8 渠道 + 20 案例 + 超级个体叙事） |
| `output/reports/genui-implementation-gotchas-2026-05.md` | Agent Economy | GenUI 实现 Gotcha（8 维对抗验证 65 findings） |
| `output/reports/personal-knowledge-card-product-spec.md` | LLM Wiki | PKC 产品方向：build knowledge card 让自己 AI 用 |
| `output/reports/personal-knowledge-card-competitive-research.md` | LLM Wiki | PKC 竞品 gap：self-use 红海 → share-first 蓝海 |
| `output/reports/personal-knowledge-card-launch-posts.md` | LLM Wiki | PKC 多平台发布文案策略 |
| `output/reports/portable-identity-competitive-research.md` | LLM Wiki | Portable Identity 竞品矩阵与中文 wedge |
| `output/reports/richard-chien/stack.md` | (已在 index) | RC 完整 agent stack |
| `output/reports/world-model/benchmarks-interactive-video.md` | (已在 index) | 交互视频 24 benchmark 全景 |
| `output/reports/ai-era-product-research-iteration-2026-05-31.md` | Harness | AI 时代产研迭代（5 场访谈综合） |
| `raw/Inbox/设计流程已死-Jenny-Wen-AI设计变革.md` | 学习笔记 | Jenny Wen 谈 AI 时代设计流程转型 |
| `raw/papers/reasoning/LLM-Reasoning-Paper-Index.md` | Harness | LLM 推理论文分级索引（CoT/ToT/RAP/LATS） |
| `raw/articles/world-model/functional-taxonomy-of-world-models.md` | Agent 基础设施 | Fei-Fei Li 世界模型功能三分法（Clipping→raw） |
| `raw/articles/harness-engineering/claude-code-dynamic-workflows.md` | Harness | Dynamic Workflows 深度拆解（Clipping→raw） |
| `raw/articles/startup/dai-yusen-vc-observation-ep2.md` | Agent Economy | 戴雨森创投观察第2集（Clipping→raw） |

## 2. 断链修复（已应用，72 处 → 0）

根因：早期编译把链接写成简写/英文化别名（`[[raw/0201-技术研究]]`、`[[raw/interview-lsw]]`、`[[raw/Tool-Search-Tool]]`），但真实文件名带空格/中文（`0201 - 技术研究.md`、`漫剧访谈 LSW - 总结.md`、`Tool Search Tool 笔记.md`）。Obsidian 按 basename 解析，故全部失效。

统一修复为 `[[真实 basename]]`，覆盖 16 个 concept 页、共 72 处替换。几类：

- **Creative CoWork 文档**（01-06）：`[[raw/0X-xxx]]` → `[[0X Creative CoWork - xxx]]`
- **访谈**：`[[raw/interview-lsw]]` → `[漫剧访谈 LSW - 总结](/raw/projects/user-interview/%E6%BC%AB%E5%89%A7%E8%AE%BF%E8%B0%88%20LSW%20-%20%E6%80%BB%E7%BB%93/)` 等 4 组
- **Claude Code 研究**：`[[raw/Claude-Code架构分析]]` → `[Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/)` 等
- **论文笔记**：`[[raw/SWE-Pruner]]` → `[SWE-Pruner 论文笔记](/raw/papers/context-engineering/SWE-Pruner%20%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0/)`、`[[raw/Tool-Search-Tool]]` → `[Tool Search Tool 笔记](/raw/papers/agent-infrastructure/Tool%20Search%20Tool%20%E7%AC%94%E8%AE%B0/)` 等
- **视频 Agent**：`[[raw/video-agent-main-sp]]` → `[视频AGENT 主SP](/raw/projects/jimeng-video-agent/%E8%A7%86%E9%A2%91AGENT%20%E4%B8%BBSP/)` 等
- **集合引用**：`[[raw/用户访谈总结]]` → `[user-research-insights](/wiki/maps/user-research-insights/)`（同时帮助消解孤儿）

> 注：`[视频Agent-skill]故事短片_*.md` 这类带方括号的文件名可被 `[[...]]` 解析（结尾 `]]` 不歧义）。

## 3. 孤儿页修复（已应用，4 → 0）

| 孤儿页 | 补的 inbound link |
|---|---|
| `maps/user-research-insights` | ← `maps/creative-cowork-product`、`concepts/super-creators`/`context-container`（经断链修复） |
| `connections/harness-to-creative` | ← `maps/harness-engineering`、`maps/creative-cowork-product` |
| `connections/memory-to-context` | ← `concepts/agent-memory`、`concepts/context-engineering` |
| `connections/user-pain-to-product` | ← `maps/creative-cowork-product`、`maps/user-research-insights` |

## 4. 矛盾 / 过时（已回流到 concept 页）

- **A2A 押注张力**（medium）：`concepts/agent-communication.md` 原写「MCP/ACP/A2A…应叠加」，读起来像无条件看好 A2A；而 `output/reports/enterprise-agent-platform-landscape.md` 判断「短期只押 MCP+AP2、对 A2A 观望」。master index 早标记过这个 lint 点但从未回流。→ 已在 concept 页加「⚠️ 立场注记」明确区分「协议演进互补」vs「BENZEMA 产品下注观望」，并标注 MCP Registry/Coordination 落地风险。
- **"双协议栈事实标准"夸大**（medium）：同页 :8 把 MCP+A2A 并称「事实标准」，与同页「A2A 生产部署极少」自相削弱。→ 已下调为分级表述：MCP = 已成事实标准（97M 月下载），A2A = 领先候选但生产部署稀疏。
- **UCP 阵营 / 归属不一致**（low）：concept 只列 3 家发起方且标「开放标准」，connection 列 9 家。→ 已统一为「创始成员 Google/Shopify/Visa + 后续 Etsy/Walmart 等」，并补 UCP 与 AP2/ACP 的分层说明。
- **World Model 论文计数漂移**（low）：`concepts/world-model.md` 仍写「39 篇」，`_index`/`log` 已是「49 篇」。→ 已更新为 49。

## 5. Clipping 回流（已应用）

3 篇 Clippings 移入 `raw/` 并轻量回流：

- **A Functional Taxonomy of World Models** → `raw/articles/world-model/functional-taxonomy-of-world-models.md`；在 `concepts/world-model` 源表补一行（Renderer/Simulator/Planner 功能三分法）。
- **Claude Code Dynamic Workflows** → `raw/articles/harness-engineering/claude-code-dynamic-workflows.md`；**新建 `concepts/dynamic-workflows.md`**（编排所有权 你→Claude→代码、计划搬进代码、agent()/parallel()/pipeline() 原语、Bun Zig→Rust 迁移），并在 `sub-agent-architecture` / `harness-engineering` 源表互链。
- **戴雨森创投观察第2集** → `raw/articles/startup/dai-yusen-vc-observation-ep2.md`；在 `concepts/harness-engineering` 源表补一行（VC 视角的「数据反哺模型」「Harness 是 OS」）。

## 6. 后续建议

1. **log 回流补齐**：2026-05 之后多个更新 `_index` 的 query（genui / a2a-master-index / pi-agent / smithery 等）没 append `log.md`，且 log 里 "Wiki state" 的 output 计数停在 39（实际 71）。建议补全 log 条目。
2. **计数脚本化**：concept/`_index`/log 三处手填计数易漂移，建议用脚本生成统计表。
3. **新 concept `dynamic-workflows` 可继续深化**：补 `parallel` vs `pipeline` 屏障语义、resume/journal 机制的实操要点。
4. **未追踪目录归位**：`tasks/`（kanban）、`output/ideas/`（有独立 _index）、`AGENTS.md` 仍未纳入 git；本轮未动，建议确认是否提交。
5. **A2A 立场可升级为独立 connection**：协议中立 vs 产品下注的张力值得单独成 `connections/` 页。

---
*由 LLM 在 2026-06-13 kb-organize 中生成*
