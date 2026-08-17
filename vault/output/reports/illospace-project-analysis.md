# Illospace 项目分析

> 查询对象：https://github.com/Illospace/illospace  
> 查询日期：2026-05-08  
> 结论：Illospace / Illo Brain 是一个 self-hostable human-agent workspace，目标不是做单个 agent SDK，而是做一个多人类、多 Agent、带记忆/技能/密钥/浏览器/运行监控的 Agent OS 工作台。

## 一句话判断

Illospace 想把 AI agent 从“一个聊天框或 CLI”升级成“团队里的可观察工作成员”：人类、项目、长期记忆、技能包、vault 密钥、Cortex thought threads、browser/tool execution、AgentRuns dashboard 和 recurring cycles 都放进同一个 self-hosted workspace。

它更像一个 **开源 Agent workspace / control plane**，而不是 LangChain 这类 agent 编排库，也不是单纯的 Claude Code / Codex 替代品。

## 它在做什么

| 层 | 实现 | 作用 |
|---|---|---|
| Backend | FastAPI + SQLAlchemy | teams、auth、memory、skills、vault、Cortex、agent runs、browser sessions、workspace apps |
| Storage | PostgreSQL + pgvector | 持久化用户/团队/运行记录/记忆/技能/密钥元数据，并支持 semantic retrieval |
| Frontend | SvelteKit + Svelte 5 | 共享工作区和运营 dashboard，页面包含 cortex、memory、skills、vault、cycles、costs、system、team |
| Runtime | Cortex worker + AgentRuns | 队列化执行 agent run，支持独立 worker 或本地 inline runner |
| Tools | tool catalog + handlers | 给 agent 暴露 browser、files、web、ideas、projects、skills、workspace data 等工具 |
| Skills | builtin skill bundles | 内置 `SKILL.md`、`skill.toml`、evals、schemas、templates，支持能力包式扩展 |
| Secrets | Vault | 把 provider key / runtime secret 放进加密 vault，而不是散落在 prompt 或文件里 |
| MCP | Brain MCP server | 让其他 agent 按需调用 memory、skills、guardrails、vault，而不是一次性塞进 prompt |

## 当前成熟度

公开仓库状态显示它还很早期：

- GitHub 页面显示 0 stars、0 forks、0 open issues、0 PR、无 releases。
- README 明确标注为 early/open-source preview，还不是 hosted product 或 stable library API。
- 仓库只有 1 个 initial import commit，但不是空壳：浅克隆后有约 1124 个 tracked files，其中 `brain/` 约 527 个文件，`frontend/src/` 约 271 个文件，`tests/` 约 248 个文件。
- GitHub 语言占比以 Python 为主，其次是 Svelte / TypeScript。

所以判断是：**已有相当多内部实现，一次性开源出来；但公共生态、release discipline、外部用户验证都还没开始。**

## 对 BENZEMA / Agora 有价值的点

1. **Skill bundle 设计值得看**  
   内置 skill bundle 不是只放 prompt，而是把 `SKILL.md`、metadata、evals、schemas、templates 放在一起。这和 Agent Capability Package / Agora 能力包思路高度相邻。

2. **Agent runtime 的“可观察性”很强**  
   它不只追求把 agent 跑起来，还围绕 run events、ops snapshot、dashboard、costs、cycles、worker queue 做运行控制面。这是从 demo agent 到生产 agent 的关键差别。

3. **Vault + team permission 是正确方向**  
   真实 agent workspace 最大的问题不是模型，而是密钥、权限、运行边界和团队上下文。Illospace 把这些放进一等模块，说明它瞄准的是生产协作而不是个人玩具。

4. **Workspace apps / GENUI 方向相邻**  
   仓库里有 workspace app compiler/service/contracts，以及前端 dashboard。它可能在做 agent 生成/承载工作区内小应用的方向，和 Creative CoWork 的 GENUI 有交集。

5. **MCP server 把 memory/skills/vault 服务化**  
   这对 KAN / LLM Wiki 很有启发：知识库不只是 markdown，而可以变成 agent 可调用的 MCP memory + guardrails + skill source。

## 风险和疑问

- **命名不一致**：README 叫 Illospace，代码/文档大量叫 Illo Brain，可能是开源前品牌迁移尚未完成。
- **部署门槛不低**：Python 3.11+、Node 22+、Postgres/pgvector、provider keys、本地/远程 worker，对普通用户不轻。
- **single initial import 风险**：只有一个公开提交，外部很难判断开发节奏、维护方式和 issue response。
- **API 未稳定**：README 已说明不是 stable library API，现阶段不适合作为强依赖。
- **需要跑起来看 UX**：仅靠代码和文档能判断方向，但还不能判断实际 dashboard 是否好用、setup 是否顺滑、agent run 是否可靠。

## 结论

Illospace 是一个 **Agent OS / team workspace 的开源预览版**。它把很多我们在 Agent 基础设施里反复讨论的模块放到了一起：memory、skills、vault、tool execution、browser runtime、runs dashboard、cycles、MCP、team permissions。

最值得进一步研究的不是“它能不能替代 Codex/Claude Code”，而是三件事：

1. 它的 skill bundle 是否能作为 Agora capability package 的参考样本。
2. 它的 runtime observability / AgentRuns 模型是否可迁移到 BENZEMA 的 agent workbench。
3. 它的 MCP memory + vault 边界是否能启发 LLM Wiki 从 markdown vault 升级为 agent-callable knowledge service。

## 来源

- GitHub repo: https://github.com/Illospace/illospace
- README: https://github.com/Illospace/illospace/blob/main/README.md
- Architecture: https://github.com/Illospace/illospace/blob/main/docs/architecture.md
- Roadmap: https://github.com/Illospace/illospace/blob/main/ROADMAP.md
- Frontend package: https://github.com/Illospace/illospace/blob/main/frontend/package.json
- Python package metadata: https://github.com/Illospace/illospace/blob/main/pyproject.toml
