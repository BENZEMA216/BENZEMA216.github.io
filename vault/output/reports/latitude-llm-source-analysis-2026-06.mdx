# Latitude (`latitude-dev/latitude-llm`) 源码深度分析

> 开源 AI Agent 可观测性 / 可靠性平台（"Sentry, but for agents and LLMs"）。基于本地 clone 实读 `dev-docs/`、`AGENTS.md`、`CHANGELOG.md` + 仓库源码 + 官方文档。

- 日期：2026-06-24
- 类型：外部项目源码深研（query 产出）
- 仓库：https://github.com/latitude-dev/latitude-llm ｜ 文档：https://docs.latitude.so
- 方法：`git clone --depth 1` 实读源码树 + 内部设计文档（dev-docs 共 40+ 篇）+ WebFetch README/docs

---

## 0. 一句话定位 + 一个关键事实：它正在经历一次彻底转型

GitHub README 现在的标题是 **"Open source AI Agent Monitoring — Sentry, but for agents and LLMs"**。但文档站和搜索结果仍把它描述为"开源 prompt engineering 平台"——这不是矛盾，而是**项目正在做重大 pivot**，代码里有铁证：

- 仓库两条长期分支：`latitude-v1`（v1 维护）与 `development`（v2 主线，当前默认）。
- `dev-docs/reliability.md` 大量 "Legacy V1 References"，明确 v1=旧 prompt 平台、v2=全新 reliability/observability 系统。
- 核心实体刚改过名：`dev-docs/signals.md` 开头 **"Renamed from 'Issues' (Signals spec, Phase 1)"**——几周内还在重构的活代码。

| | **V1（`latitude-v1`）** | **V2（`development`，现在）** |
|---|---|---|
| 定位 | Prompt 工程协作平台 | AI Agent 可观测性 / 可靠性平台 |
| 核心动作 | **写** prompt、版本管理、当 API 部署 | **观测**线上 agent、发现失败模式 |
| 比喻 | "prompt 界的 GitHub" | "agent 界的 Sentry" |
| License | LGPL-3.0 | 向 MIT/permissive 收敛（AGENTS.md 强制只用 MIT/Apache/BSD/ISC 依赖） |

**为什么转型**——最值得琢磨的一点：Prompt 管理被严重商品化（每家 LLMOps 都做），且 prompt 已被塞进 coding agent / IDE。真正长期、难、有粘性的问题是 **"agent 在生产环境会以无法预测的方式失败"**。所以战场从"创作端"挪到了"运行端"。docs 原话：*"AI agents fail in ways that are hard to predict upfront."*

---

## 1. 核心目标（What problem）

> **让你提前看到 AI Agent "接下来会在哪坏掉"，并在用户发现之前修好它。**（README: "shows you what will break next"）

三个具体痛点：

1. **传统日志/APM 不适配 agent**：agent 是多轮 session、带 tool call、有完整执行路径，不是 request-response。
2. **失败是"行为级"而非"事件级"**：单条日志看不出"一类用户在某场景下反复受挫"，需要把散落失败**聚类成可追踪问题**。
3. **Eval 会和人脱节（drift）**：LLM-as-judge 写死后会和人类真实判断越漂越远，需要能持续对齐人类判断的机制。

三个招牌特性：**Signals（失败聚类）/ Human-aligned Evals（人类对齐评估）/ Semantic Search（100% trace 语义可搜，不采样）**。

---

## 2. 产品思路（The thinking）

整个 V2 围绕一个闭环——`reliability.md` 里叫 "the reliability loop"：

```
线上 agent 流量 (traces)  ← Telemetry SDK (OTel)
        ▼
Conversation Intelligence  ── 把原始 session 变成语义结构
        ▼
Signals (失败聚类)  ←──  Scores (人工标注 / LLM eval / 自定义)
        ▼
Human-aligned Evals  ── 从人类标注里自动生成 & 用 GEPA 优化评估器
        ▼
Monitors (告警) → Simulations (上线前模拟验证) → 回到流量
```

几个**非共识的产品判断**（项目真正聪明处）：

1. **把"Issue"做成一等公民（Signals）**：不给一堆 trace 让你自己找，而是自动把"相似失败"聚成有状态（new/escalating/resolved/regressed/ignored）、有趋势、有受影响用户的"信号"。直接抄 Sentry 的 issue 模型，搬到 LLM 语义空间。
2. **Eval 不是写出来的，是从人类判断里"长"出来的**：产品里对 trace 标注（annotation）= 人类 ground truth → 自动切正/负样本 → 从 signal 生成 eval 脚本 → GEPA 优化 → 算 **alignment score（漂移分）** 持续告诉你"自动评估器还有多像人"。这是与 LangSmith/Braintrust 的核心差异。
3. **MCP / API 是一等交付面**：`reliability.md` 第 5 原则——*"equally accessible to humans through the web app UI and to other LLM Agents through MCP/API"*。coding agent 本身就是它的一类用户。

---

## 3. 技术实现（The implementation）

### 3.1 整体架构：DDD ports-and-adapters monorepo

`AGENTS.md` 总结：`apps/*` 管 HTTP 边界（校验/鉴权/路由到 use-case）；`packages/domain/*` 管业务规则和 ports；`packages/platform/*` 管基础设施 adapter；`@repo/utils` 管纯函数。

```
apps/
  api        → 公开 REST API（OpenAPI + MCP 自动生成，Fern 生成 TS/Python SDK）
  ingest     → 高吞吐 OTel trace 摄取（独立服务、限流、org-scoped）
  web        → 产品 Web App（React + TanStack，server functions 直连 domain）
  workers    → BullMQ 单步队列任务
  workflows  → Temporal 持久化多步编排

packages/
  domain/    → ~40 业务域：scores, signals, evaluations, taxonomy, monitors,
               annotations, conversation-intelligence, simulations,
               optimizations, datasets ...
  platform/  → 基础设施适配器（皆 bring-your-own）：db-postgres(Drizzle+RLS) /
               db-clickhouse(Goose) / cache-redis / queue-bullmq /
               workflows-temporal / ai-vercel(调LLM) / ai-voyage(embed+rerank) /
               op-gepa(Python GEPA) / sandbox-quickjs / storage-object(SeaweedFS) / slack
  telemetry/ → SDK：typescript / python / claude-code(抓CC会话) / pi / openclaw
  sdk/       → Fern 从 OpenAPI 自动生成的 TS + Python SDK
```

**技术栈**：TypeScript(89%) + Python(GEPA/搜索引擎)；**Effect-TS**（函数式 effect + `Data.TaggedError` 类型化错误）；**Zod-first** 契约；Better Auth；Drizzle ORM；**Postgres + ClickHouse + Redis + Temporal + BullMQ**；**Voyage embeddings（voyage-4-large, 2048 维）+ pgvector**。

### 3.2 存储分工（核心设计决策）

| 存储 | 职责 |
|---|---|
| **Postgres** | **唯一可变真相**：scores/signals/evaluations/annotation_queues/simulations + 派生 `centroid_embedding`(pgvector) + generated `search_document`(tsvector)。org-scoped、**RLS、不用外键**。 |
| **ClickHouse** | **只存不可变分析行**：score/span/trace/session 分析、taxonomy_observations。append-only、`ReplacingMergeTree`。 |
| **Redis** | 锁/缓存/队列。key 强制 `org:${orgId}:...` 前缀。 |
| **对象存储** | SeaweedFS（Apache-2.0，刻意避开 AGPL 的 MinIO，为自托管干净）。 |

混合搜索 = **pgvector cosine + Postgres tsvector + Voyage rerank**，**不引入外部搜索引擎**。

### 3.3 数据管道：从原始 trace 到 Signal

**最关键的工程原则（`conversation-intelligence.md`）**：

> **"Analyzing every session with an LLM is not economically viable at telemetry volume."**
> 热路径里**只用 embedding + 确定性数学**，LLM 只用在可摊销的"命名/画像"工作上，绝不每个 session 调一次。阈值用**固定常量**而非 per-project 调参（保 QA 可控、防隐性漂移）。

```
trace 进来 → TracesIngested 事件(debounce) → trace-end:run
   ├─► Conversation Intelligence (Temporal, 每 session 一个 workflow)
   │     load session spine → 抽 turn(剥掉 tool 噪声) → embed(voyage)
   │       → 语义切分(cosine 连续性 → "semantic moments", 最小单位=完整一来一回)
   │       → moment labels(锚句 cosine vs 静态阈值 → escalation/frustration/
   │          abandonment/policy_refusal 等 8 类行为信号)
   │       → 整段对话 embedding → 路由进 taxonomy 树
   ├─► Live Evaluations (采样 → 跑 eval → 写 score)
   └─► Annotation Queue 采样(给人审)
              ▼
         Score 写入(Postgres first) → ScoreCreated 事件
              ▼
   signals:discovery → 失败 score embedding → 和现有 signal 质心做
        pgvector cosine + tsvector + Voyage rerank → 命中则归入,
        否则建新 signal(用 occurrence 生成名字/描述)
```

**Taxonomy（主题聚类树）** 是最有意思的子系统：每个 project 一棵**统一主题聚类树**，深度=聚类密度（根粗叶细）。两条路并存：
- **Online assignment**：新 session 用"最深拟合下降"路由器实时塞进树（beam width 1，匹配不上子节点就把"残渣 residue"留在父节点）。
- **Gardening**：Temporal 每 6h 全量重建——top-down divisive k-means，放 Node `worker_threads` 跑（不阻塞 Temporal event loop），含跨 run lineage 连续性匹配。
- 质心用**带衰减加权和**存 pgvector，和 signal 共享同一套 `@domain/shared/centroid` 数学。

### 3.4 编排：Temporal vs BullMQ 的纪律

一条反复强调的原则：**"BullMQ is transport, not lifecycle storage."**
- 单步任务 → BullMQ（`apps/workers`）；多步/长流程 → Temporal（`apps/workflows`）。
- **持久状态、幂等、ownership 一律放 Postgres**，不放队列历史。
- workflow id 确定性命名做去重；`signalWithStart` 让一个 session 所有 trace 收敛到同一 execution；前端轮询 `workflow.describe()` 拿进度，**不搞 Redis job-status 镜像**。
- 节流语义分得细：`debounceMs`（重排+保最新）/ `throttleMs`（首发定时、窗口内丢弃）/ `latestThrottleMs`（首发定时但替换 payload）。

### 3.5 评估优化：GEPA

- Eval 是 **"script-native, GEPA-backed artifacts"**，跑在与 simulations 共享的**可移植 runtime**（同一 eval 既能后台监控、也能本地 CLI 跑，local-first）。
- **GEPA**（Genetic-Pareto，DSPy 系 prompt 优化）是第一个优化器，接口可替换（`@domain/optimizations` 抽象 + `@platform/op-gepa` 实现）。
- 分工：**TS 编排+候选执行，Python 只当"搜索引擎"**，藏在 stdio JSON-RPC 边界后、打进 workers 镜像。
- 目标 = 标量轨迹分（`predictedPositive == expectedPositive`）；只持久化**混淆矩阵**，alignment 指标（当前 balanced accuracy）+ recall/precision/F1/MCC 读时推导（换公式不动调用方）。

### 3.6 自托管与 OSS 纪律

`AGENTS.md` 一整段守这条线：运行时依赖只能 MIT/Apache/BSD/ISC，**禁 AGPL/SSPL**；每个基础设施都要 **isolatable + bring-your-own-able**（独立 schema/db/namespace/bucket）；三种部署 Docker Compose / K8s Helm / Railway 一键。

---

## 4. 差异化（vs LangSmith / Braintrust / Langfuse）

- **Issue-centric（Signals）**：别人给 trace 列表，它给"被聚类、有生命周期的失败问题"。
- **Human-aligned eval + alignment drift score**：把"eval 会和人脱节"产品化。
- **OTel-native、provider 无关**：任何 OTel 应用都能接；专门做了 **Claude Code session transcript** 抓取包。
- **MCP 一等公民**：coding agent 直接当用户。
- **干净 OSS + 自托管**：刻意的许可证纪律，对企业内网部署友好。

---

## 5. 知识库关联与启发

与 vault 的 [agent-communication](/wiki/concepts/agent-communication/)、harness-engineering、agent 可观测性主线直接相关；对 [agora-startup](/wiki/maps/agora-startup/) 也有交叉启发（但本文是**通用项目深研**，非 Agora 竞品材料）：

1. **"可验证交付"的工程化范本**：Signals + human-aligned eval + alignment score，本质是把"agent 产出质量"变得**可观测、可追踪、可对齐人类标准**——与 Agora 的「可验证交付 = binding constraint」同构，可当 reference 拆解。
2. **pivot 方向判断**：从"创作/编辑端"撤到"运行/可靠性端"，因前者被 coding agent 商品化、后者才有粘性。对"能力分发价值在哪一层"是强信号——价值可能不在 authoring，而在 production reliability。
3. **embeddings-only 热路径** 的成本工程：telemetry 量级下"不能每条都调 LLM"。任何规模化处理 agent 输出/调用的产品都会撞同一堵墙，这套"embedding+确定性数学做热路径、LLM 只做摊销工作"的范式可复用。
4. **MCP-first 交付面**：产品对 human 和对 agent 是同一套能力面，与 GenUI"对话沉淀成可用应用"同源。

---

## 信源

- [github.com/latitude-dev/latitude-llm](https://github.com/latitude-dev/latitude-llm)（README + 仓库源码 + `dev-docs/`、`AGENTS.md`、`CHANGELOG.md`，本地 clone 实读）
- [docs.latitude.so](https://docs.latitude.so) / [introduction](https://latitudellms.mintlify.app/guides/getting-started/introduction)
- [github.com/latitude-dev/promptl](https://github.com/latitude-dev/promptl)（V1 的 PromptL 模板语言）

---
*Query 产出，归档自 2026-06-24 对话。*
