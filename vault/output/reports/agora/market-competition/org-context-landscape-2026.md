---
description: Agent 之间 / 团队内部 / 企业级 Context 传递相关项目的全景调研，覆盖协议、记忆层、企业知识层、编排、中文区
---

<!--
name: 组织内 Context 传递生态调研 2026
type: reference
originSessionId: c4313964-18b4-4e72-8add-28e99778e5f1
status: supporting
status_reviewed: 2026-07-17
-->

# 组织内 Context 传递：2026 年生态调研

> 调研日期：2026-04-20，发起自 BENZEMA216 Agent 经济变现方向

## TL;DR

- **协议层已定**：MCP（Anthropic）+ A2A（Google）在 2025/12 一起捐给 Linux Foundation 下的 **Agentic AI Foundation (AAIF)**。IBM ACP、Cisco AGNTCY 都并入/互操作。MCP 事实上负责 tool/resource，A2A 负责 agent-to-agent 对话。
- **记忆层混战**：mem0 ($24M Series A, Basis Set/Peak XV/YC) / Letta ($10M 种子 Felicis) / Cognee ($7.5M 种子 Pebblebed) / Zep(Graphiti, YC W24) / Honcho / MemOS / Memori。技术路线分叉：三库混合 vs 时序知识图谱 vs LLM-as-OS vs 社交心智模型。
- **企业知识层**：Glean 2026/02 raise $150M @ $7.2B 估值，已锁死 CIO 采购端。Dust（欧洲）、Credal（控制平面/权限）、Vectara（受监管行业）、LlamaCloud、Unstructured 各有细分。
- **国内**：**OpenViking (ByteDance 2026/01 开源, 15k⭐)** 是"context OS"最成规模的中文项目，所有国产 Claw 框架（QClaw/ArkClaw/JVS Claw/MiClaw）基于它。Dify/Coze/RAGFlow/FastGPT 各有位置。

## 综合实力 Top 5
1. **Anthropic MCP** (10/10) — 10k+ 公共 server, 97M+ SDK 月下载
2. **Google A2A v1.0** (9/10) — 150+ 组织，MS/AWS/Salesforce/SAP/ServiceNow 在生产
3. **Glean** (9/10, 商业) — Work AI 霸主
4. **mem0** (9/10, 开源+SaaS) — 48k⭐，最通用的 agent memory
5. **Letta/MemGPT** (8/10) — LLM-as-OS 范式原创者

## 按类别 Top Picks

### 协议
- MCP, A2A, AGNTCY (Cisco) — 其他别押

### Agent 记忆
- **mem0**（三库混合，最通用）
- **Letta**（有身份的 agent）
- **Zep/Graphiti**（时序知识图谱，事实有时效）
- **Cognee**（graph+vector, 38 数据源 ingest）
- **Honcho**（社交心智模型，最另类）

### 企业知识 → Agent
- **Glean**（$7.2B，锁死头部）
- **Dust**（欧洲中大型科技公司）
- **Credal**（控制平面 + 权限治理，客户 HHS/MongoDB/NBC/Wise）
- **Vectara**（Guardian Agents, 受监管行业）
- **LlamaCloud**（开发者一站式）

### Multi-Agent 编排
- **LangGraph**（状态图事实标准，Klarna/Replit/Elastic）
- **CrewAI**（40k⭐，最易上手）
- **MS Agent Framework 1.0 GA**（2026/04，SK+AutoGen 合并）
- **OpenAI Agents SDK**（Sessions 原生 + Temporal 集成）
- **Temporal**（durable execution 底座）

### 开发者基建
- **Langfuse**（开源自托管）
- Braintrust / LangSmith / Arize

### 中文区
- **OpenViking**（ByteDance，9/10 契合中文市场）
- **RAGFlow** (78k⭐)
- Dify / Coze / Qwen-Agent / Youtu-Agent

## 🎯 对 BENZEMA216 的空白机会（Agent 经济方向）

1. **"Context 路由 + 审计 + 计费"空白**：Credal 做企业内，没人做 **"agent-to-agent 付费调用 context 的结算层"**。**Stripe for agent context calls** 这个定位目前真空。直接和 Agent 经济变现基础设施研究重合。
2. **"Agent 之间的记忆市场"**：mem0/Letta 只做单 agent 记忆，没人做 **"agent A 卖一段 context 给 agent B 用"** 的标准 + 定价 + 交付。A2A + marketplace + 结算 = 完整产品。
3. **中文区独立开发者 Context 层 SaaS**：国内开源强 SaaS 弱，给"小团队/独立开发者"的 context 层没有明确赢家。

## 别做的坑
- 又一个通用 agent memory（mem0/Letta/Zep/Cognee/Honcho 太拥挤）
- 又一个企业知识搜索（Glean 已赢）

## 暗马（1 年内重点观察）
1. **Smithery + Glama** — MCP 分发层，可能变成 agent 界的 npm/PyPI
2. **OpenViking 出海** — 若出英文 docs，成为中文区唯一能出海的 context OS
3. **Arcade.dev** — 企业级 MCP+权限 SDK
4. **Agent Registry consolidation** — AWS/Entra/GCP 各有 registry，2026 内有 IETF 统一尝试
5. **Compaction API 标准化** — Anthropic compaction-2026-01-12 + LangChain Deep Agents + Factory 都在做上下文压缩 API 化

## 推荐栈（如果 BENZEMA216 自己搭 agent 集群）
- 协议：**MCP + A2A 原生支持**（MCP server 发 Smithery/Glama 两个 registry）
- 记忆：**mem0（通用）+ Letta（需要 agent 有身份时）**，Zep 作为时序强一致性备选
- 编排：**LangGraph 或 OpenAI Agents SDK + Temporal（durable 底座）**
- 可观测：**Langfuse 自托管**（开源，数据自持，符合 agent 经济对账需求）

## 关键 References
- MCP: https://modelcontextprotocol.io / GitHub modelcontextprotocol/servers
- A2A: https://github.com/a2aproject/A2A
- mem0: https://github.com/mem0ai/mem0
- Letta: https://github.com/letta-ai/letta
- Zep Graphiti: https://github.com/getzep/graphiti / arxiv 2501.13956
- Cognee: https://github.com/topoteretes/cognee
- Honcho: https://github.com/plastic-labs/honcho
- OpenViking: https://emelia.io/hub/openviking-context-database-ai-agents
- Glean $150M F: https://www.glean.com/press/glean-raises-150m-series-f-at-7-2b-valuation
- Credal: https://www.credal.ai/
- LangGraph: https://github.com/langchain-ai/langgraph
- MS Agent Framework: https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/
- Temporal + OpenAI: https://temporal.io/blog/introducing-temporal-and-agentic-sandboxes-openai-agents-sdk
- Factory Compression: https://factory.ai/news/evaluating-compression
