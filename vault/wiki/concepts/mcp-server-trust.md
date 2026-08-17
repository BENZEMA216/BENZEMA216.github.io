# MCP Server Trust（MCP Server 信任）

> MCP Registry 解决“发现什么”，但不能自动回答“这个 Server 是否真实、健康、安全、适合生产使用”；信任必须由身份、来源、维护状态、权限与运行证据共同建立。

## 核心要点

- **Discovery ≠ Trust**：进入 Registry 不等于代码、包、维护者、权限或运行质量已经被审计
- 2026-07-07 MCP Census 快照收录 15,382 个去重 Server，其中 7,203 个提供 remote endpoint
- Census 标记 16% 存在可核实问题，包括 repo 消失、归档、包弃用与长期无更新
- stars 与 Registry entry 不是一一对应：同一 repo 可被多个条目声明，不能把 repo stars 直接当 Server 质量
- 同名 Server 和 namespace collision 会放大误装、仿冒与 supply-chain 风险
- Credential 风险与 package 风险叠加：静态 API key、PAT、env var 注入仍是常见模式
- 可信目录至少需要 publisher identity、包/仓库绑定、版本 provenance、维护状态、权限声明、扫描、运行证据与撤销机制

## 详细说明

MCP 生态已经从“是否有 Server”进入“如何从大量供给中选择可信 Server”的阶段。Registry 能标准化 metadata 和发现入口，但一个条目仍可能指向消失或归档的仓库、已弃用的 package、共享或错误声明的 repo，以及与多个实现冲突的通用名称。远程 endpoint 还增加了服务端变更、数据处理、可用性和身份验证问题。

MCP Census 的价值不只是规模数字，而是揭示 Registry metadata 的证据边界。Stars 属于被声明的 GitHub repo，不天然属于某个 Server；名称也未形成唯一身份。选择 `filesystem`、`github` 或 `weather` 之类通用名称时，用户需要先验证 namespace、publisher、package digest、source repo 和 release provenance。

安全信任还必须覆盖运行时授权。即使 package 来源真实，Server 若依赖 long-lived PAT、宽权限 API key 或把凭证直接注入 Agent 环境，仍会把 prompt injection 和 tool misuse 放大为真实 side effect。可信 MCP 分发因此不是“做一个更大的目录”，而是把 supply-chain、identity、permission、runtime evidence 和 incident response 做成同一套信任面。

## 最小信任清单

1. Publisher identity 与 namespace 唯一性
2. Registry entry、package、source repo、release digest 的可验证绑定
3. 最近维护状态、deprecated / archived / removed 状态与撤销通知
4. Tool 与资源权限清单、credential 类型、OAuth/scopes、数据出境边界
5. 静态扫描、依赖审计、恶意行为与 prompt-injection surface 检查
6. 安装量、成功运行、失败率、版本兼容与用户报告等运行证据
7. 安全更新、版本 pinning、rollback 和 kill switch

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [mcp-ecosystem-census-2026-07](/raw/articles/agent-communication/mcp-ecosystem-census-2026-07/) | 官方 Registry + GitHub/npm/PyPI 的规模、健康、集中度、分类与名称冲突快照 |
| [state-of-mcp-server-security-2025](/raw/articles/agent-communication/state-of-mcp-server-security-2025/) | 5,205 个开源 MCP Server 的 credential、OAuth、API key 与 env var 风险 |
| [agent-communication](/wiki/concepts/agent-communication/) | MCP 作为 Agent-to-Tool / Context 的事实标准 |
| [safe-autonomy](/wiki/concepts/safe-autonomy/) | 第三方工具的权限边界、最小授权与可审计执行 |

## 关联概念

- [agent-communication](/wiki/concepts/agent-communication/) — MCP 的协议角色与生态位置
- [safe-autonomy](/wiki/concepts/safe-autonomy/) — Server 信任最终要落实为有限权限和可恢复执行
- [tool-routing](/wiki/concepts/tool-routing/) — 路由前必须验证工具身份、能力与风险级别
- [communication-to-economy](/wiki/connections/communication-to-economy/) — Registry 已有 discovery，但交易与质量担保仍未解决

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
