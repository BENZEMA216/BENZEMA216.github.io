# Agent Communication（Agent 通信）

> Agent 之间交换信息、协调行为、协作完成任务的机制和协议

## 核心要点

- Agent 通信是 Multi-Agent 系统的基础能力，决定了协作质量、效率和可扩展性
- 协议格局分级（避免把 A2A 采用度误读为与 MCP 同级）：**MCP 已是 Agent-to-Tool 事实标准**（97M 月下载 + 全厂采用），**A2A 是 Agent-to-Agent 层领先候选协议但生产部署仍稀疏**（50+ partner 多停在声明层，见下文「最大空白」与 [enterprise-agent-platform-landscape](/output/reports/agora/market-competition/enterprise-agent-platform-landscape/)）；二者解决纵向（Agent → Tool）与横向（Agent ↔ Agent）不同问题
- 学术研究识别出 7 种核心通信模式，从经典 Debate 到前沿 Latent Space Communication
- **最大空白**：Agent 间如何定价、结算、分润几乎没有标准化产品 — Agent Economy 的核心机会
- MCP / ACP / A2A 不在同一层：MCP 是 model-to-tool/context，ACP/A2A 是 peer agent communication，**协议演进层面二者设计互补、可叠加**而非互相替代
- ⚠️ 立场注记（协议中立研究 vs 产品下注）：演进层面 A2A 与 MCP 互补，但 **BENZEMA 产品下注层面判断短期只押 MCP + AP2、对 A2A 持观望**（A2A 八大厂里仅 Microsoft 明确押，详见 [enterprise-agent-platform-landscape](/output/reports/agora/market-competition/enterprise-agent-platform-landscape/)）；MCP Registry 已进入实际运行，若 MCP Agent-to-Agent Coordination 继续落地，可能进一步侵蚀 A2A 横向地盘
- 支付协议层正在单独形成：MPP / x402 / ACP / AP2 围绕 HTTP 402、shared payment token、agent commerce 授权展开
- MCP credential 管理是当前协议生态最大安全缺口：大量 server 仍依赖静态 API key / PAT 和环境变量
- 2026-07-07 MCP Registry 快照已有 15,382 个去重 Server、7,203 个 remote endpoint；生态问题已从“有没有目录”转为身份、健康、名称冲突与供应链信任
- 多人共享一个 Agent session 不自动构成 Agent-to-Agent communication：MPAI 一类 session gateway 把人的输入写回同一 Codex / Claude session，核心对象是授权、恢复、事件流与审计，而不是 peer Agent route

## 协议分层

### Agent-to-Tool 层
- **MCP** (Anthropic) — 97M 月下载，事实标准。JSON-RPC 2.0，四大原语（Resources / Tools / Prompts / Sampling）。2025.12 捐赠 Linux Foundation AAIF，OpenAI/Google/MS/Amazon 全采用

### Agent-to-Agent 层
- **A2A** (Google) — Agent Card + Task lifecycle（submitted → working → completed），100+ partner。v0.3 支持 gRPC + Agent Card 数字签名。2025.06 捐赠 Linux Foundation
- **ACP** (IBM → 并入 A2A) — Brokered client-server 架构，引入中央注册中心概念，2025 末并入 A2A

### Agent Network 层
- **ANP** — W3C DID-based 去中心化身份 + 无需中央注册中心的 Agent 发现。三层架构：Identity & Encryption → Meta-Protocol Negotiation → Application Protocol。W3C 草案规范 (2026.01)
- **AGNTCY** — 6 层架构（OASF → Agent Directory → SLIM → Identity → Observability → Security），Cisco/Dell/Google Cloud/Oracle 创始成员，Linux Foundation 项目

### Agent Commerce 层
- **UCP** (创始成员 Google / Shopify / Visa + 后续 Etsy / Wayfair / Target / Walmart / Mastercard / Stripe / Adyen) — Agentic Commerce 开放标准，支持 Checkout/Identity/Order/Cart/Catalog。注：UCP 偏「人类代购 commerce 标准」，与 agent 支付授权层的 AP2 / ACP 不在同一层；较新报告叙事已多转向 AP2 / Stripe ACP
- **AITP** (NEAR Foundation) — Web3 导向的 Agent 交互 + 支付协议
- **AP2** — Agent Payment Protocol，角色分离 + 加密签名数字合约
- **MPP / x402 / ACP** — 以 HTTP 402 / stablecoin / shared payment token / merchant checkout 为核心，解决 Agent 代理用户或自身访问付费资源的问题

### Credential / Security 层
- **MCP Secret Wrapper / vault injection** — 对 MCP server 的静态 credential 风险做运行时封装，避免 token 直接暴露在 host 或 sandbox 中
- **OAuth / scoped NHI** — Agent 生态需要短期、细粒度、可审计的 non-human identity，而不是 long-lived PAT/API key

## 七种通信模式

1. **Debate/Discussion** — 多 Agent 辩论提升推理质量。奠基论文: Du et al. (ICML 2024)。2025 年发现 debate 效果存在天花板，需要异构 Agent + 动态辩论突破
2. **Role-Playing** — 角色扮演 + inception prompting。CAMEL (NeurIPS 2023) 开创，ChatDev (ACL 2024) 引入 Chat Chain，MetaGPT (ICLR 2024) 用 SOP 编码替代无结构对话
3. **Hierarchical Delegation** — 管理者-工作者委托。DyLAN 证明动态 Agent 选择优于静态分配（+13% MATH），AutoGen 提供最通用的 conversation framework
4. **Blackboard** — 共享工作空间 + 自愿响应（非指派式）。端到端任务成功率相对提升 +57%，数据发现准确度 +9%
5. **Market-Based** — 经济机制驱动的协调，Agent 交换概率信念通过"交易"趋向共识。准确率比 single-shot baseline 高 +10%，保持推理可解释性
6. **Emergent** — Agent 自发发展共享语言。仅需 4 轮通信即可发展出具有组合性、泛化性、多义性的共享语言
7. **Latent Space** — 隐空间直接传输，绕过自然语言瓶颈。C2C: 延迟降低 2.5x，准确率 +6.4-14.2%；LatentMAS: 比 text-based 高效 235-471x

## 框架层

- **OpenAI Agents SDK** — Handoff 机制（LLM 自主路由）+ Agent-as-Tool（保持控制权委派）
- **AutoGen** — GroupChat + Pub-Sub 对话编程，支持 Round-robin / LLM-based Speaker Selection，已与 Semantic Kernel 合并为 Microsoft Agent Framework
- **LangGraph** — Shared State Graph，Supervisor / Hierarchical / Scatter-Gather 模式，月搜索量 27,100（框架类最高）
- **CrewAI** — 角色编排 + Delegation Tool + Question Tool，"Crew" 隐喻最直觉的多 Agent 模型

## 产品格局

### Enterprise 四巨头
- **Salesforce Agentforce** — $8 亿 ARR，29,000 deals，AgentExchange Marketplace
- **IBM watsonx Orchestrate** — 80+ 企业应用集成，150+ Agent + 工具 catalog
- **Microsoft Copilot Studio** — A2A + MCP 双协议原生支持，跨 first/second/third-party Agent 通信
- **Amazon Bedrock Agents** — Multi-Agent Collaboration GA，Supervisor + Specialist 模式，I/O wait 免费省 30-70%

### 中国生态
- **Coze 2.0** (字节跳动) — 开源 CozeStudio + CozeLoop (Apache 2.0)，Agent Skills Store，入门门槛最低
- **Dify** — 60K+ GitHub stars，开源生态最活跃，全球化定位
- **蚂蚁 Agentar** — 金融级 Agent 平台，中国信通院最高 5 级认证，按效果付费

### 市场数据
- Agentic AI 市场 (2025): $70.6 亿 → 2032: $932 亿 (CAGR 44.6%)
- 中国企业级 Agent 市场 (2025): ~1900 亿 RMB (CAGR 110%+)
- 79% 企业已采用 Agent，仅 11% 进入生产 — 最大 deployment gap
- MCP Census（2026-07-07 快照）：15,382 个 Registry Server，47% 提供 remote endpoint；16% 存在可核实的 repo/package/维护问题，且 stars、repo 与 Registry entry 并非一一对应

### 协作 Surface / Session Gateway（不等于 A2A）

[mpai-multiplayer-ai-implementation-analysis-2026-08-04](/output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04/) 展示了协议栈之外的协作面：Host 选择一条本地 Codex / Claude Code session，经 Tailscale identity、Bearer invite 和 session ACL 允许远程 participant 读写，再用 provider-native resume 将输入追加到原 session。这个闭环解决的是“多人如何围绕同一 Agent 会话协作”，没有定义 Agent Card、peer discovery、跨 Agent task route 或 Agent 间结算，因此不应被统计成 A2A 采用。

## 最大空白

**Agent 间如何定价、结算、分润几乎没有标准化产品** — Agent Economy 的核心机会。具体空白：

1. Agent 经济层缺失 — 谁来做跨平台的 Agent pricing/billing/settlement？
2. Agent Discovery 仍原始 — ANS/Agent-Reg 仅在 proposal 阶段
3. 跨平台 Agent 互操作 — A2A 有 50+ partner 但实际生产部署极少
4. 中国生态与全球协议脱节 — MCP 有一定采用但 A2A/AGNTCY 参与度极低
5. AGNTCY 的 6 层架构是最好的参考框架 — 但缺少经济层

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [protocols-and-standards](/raw/articles/agent-communication/protocols-and-standards/) | 协议分层、MCP/A2A/ANP/AGNTCY/UCP 详细分析、FIPA ACL 历史 |
| [academic-research](/raw/articles/agent-communication/academic-research/) | 7 种通信模式、25+ 篇论文分析、Benchmark 评估体系 |
| [product-landscape](/raw/articles/agent-communication/product-landscape/) | 40+ 产品/平台格局分析、商业模式分类、中国生态 |
| [mcp-acp-a2a-protocol-comparison](/raw/articles/agent-communication/mcp-acp-a2a-protocol-comparison/) | MCP/ACP/A2A 分层：model protocol vs agent protocol，MCP 可与 peer protocol 叠加 |
| [state-of-mcp-server-security-2025](/raw/articles/agent-communication/state-of-mcp-server-security-2025/) | 5,205 MCP server security 调研：credential 类型、env var 暴露、OAuth 采用率 |
| [mcp-ecosystem-census-2026-07](/raw/articles/agent-communication/mcp-ecosystem-census-2026-07/) | MCP Registry 规模、remote/local 分布、健康、长尾、共享 repo metadata、名称冲突与方法边界 |
| [agent-payments-internet-rules](/raw/articles/agent-economy/agent-payments-internet-rules/) | Agent 支付协议：MPP、x402、ACP、AP2、HTTP 402、Shared Payment Tokens |
| [0410-agent2agent](/raw/articles/learning-notes/agent2agent/) | A2A 协议学习笔记 |
| [agents-need-names-2026-07-27](/raw/articles/agent-communication/agents-need-names-2026-07-27/) | 团队中名字作为 addressable instance：将能力、历史与信任压缩为人类可调用的路由 handle，而非静态角色 schema |
| [mpai-multiplayer-ai-implementation-analysis-2026-08-04](/output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04/) | 多人共享同一本地 Agent session 的授权、resume、流式消息和审计机制，以及它与跨 Agent 通信的边界 |

## 关联概念

- [agent-loop](/wiki/concepts/agent-loop/) — 通信是 Agent Loop 的外部接口
- [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/) — 子 Agent 通信是最基础的 agent-to-agent 场景
- [tool-routing](/wiki/concepts/tool-routing/) — MCP 作为 Agent-to-Tool 通信层
- [harness-engineering](/wiki/concepts/harness-engineering/) — 通信协议是 Harness 的编排层
- [context-engineering](/wiki/concepts/context-engineering/) — 通信效率直接影响 context budget
- [mcp-server-trust](/wiki/concepts/mcp-server-trust/) — Registry discovery 之后的身份、provenance、权限与运行证据

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
