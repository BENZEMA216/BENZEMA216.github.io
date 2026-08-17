# A2A & Agent 通信 — 主索引与深度评述

> 2026-05-31 query 归档。把分散在 raw / wiki / output 三层、50+ 个文件里的「Agent 间通信 + 协议 + 经济层 + 产品」素材整理成一张可导航的全图，并在末尾给出深度评述（主线、张力、空白、阅读路径）。
>
> 已有编译产物 [agent-communication](/wiki/maps/agent-communication/)（协议栈+学术+产品全景）和 [agent-communication](/wiki/concepts/agent-communication/)（概念）是入口；本文是**跨层素材清单 + 反向地图**，补上 map 底部只列了 7 个源文件的导航缺口。

---

## 0. 一句话结论

这块在知识库里已经**极度成熟**——不是缺料，而是料散在三层。核心叙事是一条清晰的链：

> **协议（MCP↔A2A↔ANP）→ 学术（7 种通信模式）→ 产品（大厂四巨头 + 中国四强 + BYOC 长尾）→ 经济层（支付协议 + 能力包交易）→ 最大空白（Agent 间定价/结算/分润 + management layer）**

而 BENZEMA 的押注（Agora / 能力包 / Claude Code 寄生 / 2C 垂直 marketplace）正是踩在这条链最末端的结构性空白上。

---

## 1. 协议与标准（Protocols & Standards）

> 主线：**MCP（纵向 Agent→Tool）+ A2A（横向 Agent↔Agent）双协议栈**已成 2026 事实标准；ANP/AGNTCY 是更激进的去中心化/基础设施层；商业层（UCP/AITP/AP2/x402）正在单独成形。

| 文件 | 层 | 内容 |
|------|----|------|
| [protocols-and-standards](/raw/articles/agent-communication/protocols-and-standards/) | raw | **协议总纲（823 行）**：15+ 协议/框架深度分析，MCP/A2A/ANP/AGNTCY/UCP，FIPA ACL 历史追溯、对比矩阵、对 Agent Economy 启示 |
| [mcp-acp-a2a-protocol-comparison](/raw/articles/agent-communication/mcp-acp-a2a-protocol-comparison/) | raw | **分层辨析**：MCP=model-to-tool/context；ACP/A2A=peer agent communication。MCP 应与 peer protocol **叠加**而非替代，否则把 agent 降格为 host 的 tool |
| [building-agents-mcp-production](/raw/articles/agent-communication/building-agents-mcp-production/) | raw | MCP 生产级落地：server/client 集成、错误处理模式 |
| [state-of-mcp-server-security-2025](/raw/articles/agent-communication/state-of-mcp-server-security-2025/) | raw | **5,205 个 MCP server 安全调研**：80%+ 仍用静态 API key/PAT/env var，credential 生命周期是协议生态最大安全缺口 |
| [0410-agent2agent](/raw/articles/learning-notes/agent2agent/) | raw | A2A 学习笔记：Agent Card、Task lifecycle、5 大设计原则、与 MCP 对比 |
| [0310-agent-knowledge](/raw/articles/learning-notes/agent-knowledge/) | raw | MCP 协议深度学习笔记 |
| [agent-communication](/wiki/maps/agent-communication/) | wiki | **全景地图**：协议栈图 + 对比速查 + 推荐采纳路径（MCP→A2A→UCP/AITP→ANP） |
| [agent-communication](/wiki/concepts/agent-communication/) | wiki | 概念页：协议分层、7 模式、产品格局、最大空白 |

**协议清单速记**：
- Agent↔Tool：**MCP**（Anthropic/LF，97M 月下载）
- Agent↔Agent：**A2A**（Google/LF，Agent Card + Task lifecycle，v0.3 gRPC + 数字签名）、**ACP**（IBM，已并入 A2A）、**ANP**（W3C DID 去中心化发现）
- 基础设施：**AGNTCY**（Cisco/Dell/Google/Oracle，6 层：OASF→Directory→SLIM→Identity→Obs→Security）
- 商业/支付：**UCP**（Google/Shopify/Visa）、**AITP**（NEAR Web3）、**AP2**（角色分离 + 加密签名）、**MPP/x402**（HTTP 402 + stablecoin）、**ERC-8004**
- 历史：**FIPA ACL**（1990s，Speech Act Theory，20+ performatives）

---

## 2. 学术研究（Academic Research）

> 主线：**7 种通信模式**从经典 Debate 到前沿 Latent Space；研究重心 2025 起从"多 agent 能不能更好"转向"怎么通信更高效"（Yan et al. 唯一 communication-centric 综述）。

| 文件 | 层 | 内容 |
|------|----|------|
| [academic-research](/raw/articles/agent-communication/academic-research/) | raw | **学术深潜（555 行）**：7 种通信模式 + 25-30 篇论文分析 + 各模式 benchmark |
| [paper-index](/raw/articles/agent-communication/paper-index/) | raw | **论文索引（110 行）**：30 篇 S/A/B/C 分级，含引用数 + 7 模式归类 |
| [agent-communication](/wiki/maps/agent-communication/) §二/§四 | wiki | 学术时间线 1990s→2026 + 综述/各模式论文索引表 |
| [[raw/papers/]] 各方向 | raw | PDF：agent-memory（9 篇）、agent-infrastructure、reasoning、context-engineering 等 |

**7 种通信模式 + 代表作 + 关键数据**：
1. **Debate/Discussion** — Du et al.(ICML 2024)。2025 发现 debate 无法一致性超越 single-agent；A-HMAD 用异构专家+动态辩论突破天花板
2. **Role-Playing** — CAMEL(NeurIPS 23)/ChatDev(ACL 24)/MetaGPT(ICLR 24)。MetaGPT HumanEval 85.9%，用 SOP 编码替代无结构对话
3. **Hierarchical Delegation** — DyLAN(+13% MATH)、AutoGen
4. **Blackboard** — 共享工作区 + 自愿竞标（非指派），+57% 任务成功率
5. **Market-Based** — 概率信念交换"交易"趋向共识，+10% accuracy 且可解释
6. **Emergent** — 仅 4 轮通信即可涌现具组合性的共享语言
7. **Latent Space** — C2C（KV-cache 投影，延迟 -2.5x）、LatentMAS（比 text-based 高效 235-471x）、ThoughtComm

**关键综述**：Guo et al.(IJCAI 2024, 首个系统综述)、Yan et al.(2025, Beyond Self-Talk)、Tran et al.(2025, 五维分类法)、A Survey of Agent Interoperability Protocols(MCP/ACP/A2A/ANP 四协议)。

---

## 3. 产品格局（Product Landscape）

> 主线：三层格局（Infra 协议/注册 → Platform 编排/部署 → Application 垂直 Agent）；大厂四巨头 + 中国四强 + BYOC 长尾三股力量。

| 文件 | 层 | 内容 |
|------|----|------|
| [product-landscape](/raw/articles/agent-communication/product-landscape/) | raw | **产品总览（447 行）**：40+ 产品，市场数据，8 种商业模式分类 |
| [enterprise-agent-platform-landscape](/output/reports/agora/market-competition/enterprise-agent-platform-landscape/) | output | **大厂全景（2026-04）**：美国云三巨头（Google Gemini Enterprise / MS Agent Framework 1.0 / AWS AgentCore）+ 模型厂（OpenAI 碎片化 / Anthropic Managed Agents $0.08/session-hr）+ SaaS（Salesforce Agentforce 12k 客户 / ServiceNow）+ 中国四强（扣子 2.0 / 百炼 80 万 agents / 千帆 130 万 / 元器）。平台原语收敛表 8×12 + 5 个战略维度 + 5 块空白。**判断：协议押 MCP+AP2，不押 A2A** |
| [openai-workspace-agents](/output/reports/agora/market-competition/openai-workspace-agents/) | output | OpenAI Workspace Agents 架构：AgentKit/Frontier/WA 栈 |
| [org-context-landscape-2026](/output/reports/agora/market-competition/org-context-landscape-2026/) | output | 组织内 Context 传递生态：MCP/A2A/记忆层混战（mem0/Letta/Zep）/企业知识(Glean $7.2B)/中文区(OpenViking)。栈推荐 MCP+A2A / mem0+Letta |
| [agent-ai-deep-research-2026-05](/output/reports/agora/market-competition/agent-ai-deep-research-2026-05/) | output | Agent AI landscape 深研 |
| [agent-communication](/wiki/maps/agent-communication/) §三 | wiki | 三层产品格局表 + 8 种商业模式 |

**BYOC / agent-native 长尾**（与 Richard Chien 生态重叠）：
| 文件 | 层 | 内容 |
|------|----|------|
| [slock-agentrq-like-products-and-external-notes-2026-05](/output/reports/agora/market-competition/slock-agentrq-like-products-and-external-notes-2026-05/) | output | BYOC agent 产品扫描：Slock / AgentRQ / Hiloop / Marmy / Ticlawk / HiClaw / AgentGate |
| [slock-ai-research](/output/reports/richard-chien/slock-ai-research/) | output | slock.ai 深研：agent-native IM、本地 daemon、Remember/One Conversation/Your Machines |
| [agent-native-im](/wiki/concepts/agent-native-im/) | wiki | slock.ai / HiClaw / RockClaw 概念 |
| [multi-agent-simulation](/wiki/concepts/multi-agent-simulation/) / [oasis-camel-ai-research](/output/reports/oasis-camel-ai-research/) | wiki/out | OASIS 1M-agent 社会模拟（需求侧 testbed，非 economy 本身） |

**市场数据**：Agentic AI 2025 $70.6B→2032 $932B(CAGR 44.6%)；中国企业级 ~1900 亿 RMB(CAGR 110%+)；79% 企业采用但仅 11% 进生产（最大 deployment gap）。

---

## 4. 框架层（Orchestration Frameworks）

| 框架 | 通信模型 | 采用 | 文件 |
|------|----------|------|------|
| OpenAI Agents SDK | Handoff + Agent-as-Tool | OpenAI 生态 | product-landscape, enterprise-landscape |
| AutoGen / MS Agent Framework | Pub-Sub GroupChat | Microsoft | 同上 |
| LangGraph | Shared State Graph（Supervisor/Hierarchical） | 400+ 企业 | 同上 |
| CrewAI | Role + Delegation/Question Tool | 60% Fortune 500 | 同上 |
| Google ADK | A2A 原生 | Google Cloud | 同上 |

相关概念：[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)、[tool-routing](/wiki/concepts/tool-routing/)、[agent-loop](/wiki/concepts/agent-loop/)、[agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[agent-harness-implementations](/wiki/maps/agent-harness-implementations/)。

---

## 5. Agent 经济层与支付（Economy & Payments）

> 主线：**通信协议解决"怎么连"，但"怎么定价/结算/分润"几乎无标准化产品**——这是全栈最大空白，也是 BENZEMA 的主战场。

| 文件 | 层 | 内容 |
|------|----|------|
| [agent-payments-internet-rules](/raw/articles/agent-economy/agent-payments-internet-rules/) | raw | **支付协议总纲**：HTTP 402 复活、Stripe/Tempo MPP、Coinbase x402、OpenAI/Stripe ACP、Google AP2、Shared Payment Tokens。Agent 作为主要消费者会动摇广告/订阅/人类支付流程 |
| [agent-skill-commercialization-trilemma](/raw/articles/agent-economy/agent-skill-commercialization-trilemma/) | raw | **能力商业化三角**：Open-Local / Hosted-Protected / Managed-Runtime 的取舍 |
| [nature-of-the-firm-coase](/raw/articles/agent-economy/nature-of-the-firm-coase/) | raw | Coase《企业的性质》(1937)：交易成本理论，Agent Economy 能力包交易层的理论底座 |
| [machines-of-loving-grace](/raw/articles/agent-economy/machines-of-loving-grace/) | raw | 计算资本主义 + Agent Economy 未来理论 |
| [project-vend-phase-1-claude-shop](/raw/articles/agent-economy/project-vend-phase-1-claude-shop/) | raw | Claude Shop Phase 1：单 agent 经营实验 |
| [project-vend-phase-2](/raw/articles/agent-economy/project-vend-phase-2/) | raw | Phase 2：分层 agent（CEO sub-agent + merch agent），capable 与 robust 间仍有鸿沟 |
| [agent-labs-gpt-wrapper-summer](/raw/articles/agent-economy/agent-labs-gpt-wrapper-summer/) | raw | GPT wrapper 创业经济学 |
| [communication-to-economy](/wiki/connections/communication-to-economy/) | wiki | **桥接文件**：A2A Card→marketplace listing；MCP Registry→commerce；Blackboard 竞标→任务匹配；Market-based→定价；Task lifecycle→按 Task 计费 |

---

## 6. Agent 分发与能力包（Distribution & Capability Packages）

> 主线：把"分发"拆成**能力分发**（卖/装/复用什么）+ **任务分发**（运行时谁做哪段），收敛到能力包（Capability Package）作为可交易商品。

| 文件 | 层 | 内容 |
|------|----|------|
| [agent-distribution-atomic-units](/output/reports/agora/market-competition/agent-distribution-atomic-units/) | output | **11 类可分发原子单元** + task packet schema + 12 种组合模式 + BENZEMA Capability Bundle 建议 |
| [agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/) | output | 6 种分发形态 + orchestrator-worker 收敛 + Skill 垂直 marketplace |
| [agent-capability-distribution-investment-landscape-2026-04](/output/reports/agora/market-competition/agent-capability-distribution-investment-landscape-2026-04/) | output | **投资地图**：6 层市场 + P0/P1/P2 + Agora 差异化 + Smithery/Composio/Arcade/x402 分析 |
| [avm-shared-agent-profile-research](/output/reports/agora/product/avm-shared-agent-profile-research/) | output | Shared Agent Profile：installable→hosted-protected→live endpoint |
| [user-a-use-user-b-agent-product-landscape-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-product-landscape-2026-05/) | output | **用户 A 用 用户 B 的 Agent**：Poe/Apify/Relevance/Smithery/Dify/HF Spaces 的支付与权限模型 |
| [user-a-use-user-b-agent-deep-research-feishu-2026-05](/output/reports/agora/market-competition/user-a-use-user-b-agent-deep-research-feishu-2026-05/) | output | 扩展版：+Agent.ai/Notion/Smithery Uplink，publisher 所有权/entitlement/delegation |

**Agora 产品线**（BENZEMA 自有项目）：
| 文件 | 层 | 内容 |
|------|----|------|
| [agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/) | output | Agora BP v17：productivity gap 叙事 + 能力包定义（skill/mcp.json/runtime.json/tests/pricing.yaml/manifest.lock）+ 多 agent 调用链计费/分账/失败归因 |
| [agora-business-model-after-skill-trilemma](/output/reports/agora/business-model/agora-business-model-after-skill-trilemma/) | output | 三角后修正：拆 open-local/hosted-protected/managed-runtime，hybrid execution 既是隐私也是商业架构 |
| [agora-financial-model](/output/reports/agora/business-model/agora-financial-model/) | output | 5 年财务情景（含 .xlsx） |
| [agora-bp-claude-observation-card](/output/reports/agora/narrative/agora-bp-claude-observation-card/) | output | Claude blog + capability manifest + canonical tests |
| [agent-shopify-product-story-2026-05-14](/output/reports/agora/narrative/agent-shopify-product-story-2026-05-14/) | output | "Agent 的 Shopify"叙事：storefront/contract/test/install/settlement/royalty |
| [skill-creator-monetization-mvp-2026-05-17](/output/reports/agora/product/skill-creator-monetization-mvp-2026-05-17/) | output | Creator 变现 MVP |
| [canteen-agora-circle-arc-research](/output/reports/agora/market-competition/canteen-agora-circle-arc-research/) | output | Arc stablecoin + 预测市场 + 归因账本 |

---

## 7. Agent 网络与知识网络（Network & KAN）

> 主线：从中心化注册（A2A Card directory）→ 去中心化身份（ANP W3C DID）；BENZEMA 的 KAN 把个人 LLM Wiki 演进成互联 agent 知识网络。

| 文件 | 层 | 内容 |
|------|----|------|
| [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/) | wiki | KAN 概念：LLM Wiki → 网络化 agent 知识 |
| [llm-wiki-to-agent-network](/wiki/connections/llm-wiki-to-agent-network/) | wiki | 4 阶段演进 |
| [knowledge-agent-network-idea](/output/reports/agora/product/knowledge-agent-network-idea/) | output | KAN 完整愿景 + 与 Agent Communication/Economy/AGNTCY 对齐表 |
| [knowledge-agent-network-design](/output/reports/agora/product/knowledge-agent-network-design/) | output | KAN 技术架构 |
| [world-model-to-agent](/wiki/connections/world-model-to-agent/) | wiki | World Model → Agent 的规划核心 |

---

## 8. 未来推演与综合（Synthesis）

| 文件 | 层 | 内容 |
|------|----|------|
| [agent-world-2028-synthesis](/output/reports/agora/market-competition/agent-world-2028-synthesis/) | output | **最深综合**：八派立场 + 经济学 50x 预测鸿沟 + 协议四层栈(MCP/A2A/x402/ERC-8004) + walled garden vs open web + METR 曲线(2028≈一周级任务) + 治理三辖区(EU/US/CN) + 10 个空白。**核心判断：不做协议做 management layer，聚焦 principal hierarchy/reputation/dispute** |

---

## 9. 深度评述

### 9.1 这块的"脊柱"
素材其实在反复论证同一条因果链，且层层下沉到一个商业落点：

```
协议成熟(MCP+A2A 双栈)
  → 通信模式被学术穷举(7 种)
    → 产品三层格局成形(大厂吃企业 / BYOC 啃长尾)
      → 但"连得上"≠"算得清账"
        → 经济层(定价/结算/分润/归因)是结构性空白
          → BENZEMA 的落点:不做第 N 个协议或 runtime,做 management/经济层
```

### 9.2 三组核心张力（值得继续深挖的地方）
1. **MCP 会不会吃掉 A2A？** — MCP Agent-to-Agent Coordination(Q3 2026) + MCP Registry(Q4 2026) 一旦落地，A2A 的横向地盘可能被侵蚀。enterprise-landscape 的判断已经是"押 MCP+AP2，不押 A2A"——这与 wiki concept 里"二者应叠加"的中性表述存在**张力**，是知识库里一个值得 lint 的潜在矛盾点。
2. **协议层 vs management 层** — agent-world-2028 明确主张"不做协议做 management layer"。这意味着 A2A/ANP 这些协议研究对 BENZEMA 是**地形侦察**，不是产品方向；真正的护城河在 reputation / dispute / principal hierarchy / 归因账本。
3. **中美脱节既是风险也是窗口** — 中国 1900 亿 RMB 市场几乎没有 Agent 间通信标准和经济层，A2A/AGNTCY 参与度极低。但阿里 AI Agent Store 被点名为"6-9 个月内最大威胁"。

### 9.3 全栈最大空白（跨文件反复出现的共识）
1. **Agent 间定价/结算/分润** — 几乎无标准化产品（核心机会）
2. **Agent Discovery** — ANS/Agent-Reg 仍在 proposal
3. **跨平台互操作** — A2A 50+ partner 但生产部署极少；大厂都是 walled garden
4. **AGNTCY 缺 economic layer** — 6 层架构里没有 pricing/billing/marketplace
5. **Credential 生命周期** — 80%+ MCP server 仍静态 key；缺短期/细粒度/可审计的 NHI
6. **失败归因 + 多 agent 调用链计费** — 多 agent 编排下"谁该为失败买单/分多少账"无标准

### 9.4 推荐阅读路径
- **30 min 入门**：[agent-communication](/wiki/maps/agent-communication/)（协议栈 + 时间线 + 7 模式 + 产品三层）
- **协议深潜 60 min**：[protocols-and-standards](/raw/articles/agent-communication/protocols-and-standards/)
- **学术 45 min**：[academic-research](/raw/articles/agent-communication/academic-research/) + [paper-index](/raw/articles/agent-communication/paper-index/)
- **经济桥接 20 min**：[communication-to-economy](/wiki/connections/communication-to-economy/)
- **产品/投资 60 min**：[enterprise-agent-platform-landscape](/output/reports/agora/market-competition/enterprise-agent-platform-landscape/) + [agent-capability-distribution-investment-landscape-2026-04](/output/reports/agora/market-competition/agent-capability-distribution-investment-landscape-2026-04/)
- **终局综合 60 min**：[agent-world-2028-synthesis](/output/reports/agora/market-competition/agent-world-2028-synthesis/)

### 9.5 建议的下一步动作（可选）
- **lint 矛盾**：concept 页"A2A/MCP 应叠加" vs enterprise-landscape"不押 A2A"——建议在 concept 页加一句立场注记，说明这是"协议中立研究 vs BENZEMA 产品押注"的不同视角，而非事实矛盾。
- **回流提炼**：本索引若长期有用，可把 §9 评述提炼进 [communication-to-economy](/wiki/connections/communication-to-economy/)，或新建 `wiki/maps/agent-economy.md`（目前经济层只有 connection 没有独立 map）。
- **数据补缺**：A2A v0.3 之后的版本进展、MCP Registry 实际上线情况、ERC-8004 现状，可 web search 补充。

---

## 关联

- [agent-communication](/wiki/maps/agent-communication/) — 正向全景地图（本文是其反向素材索引）
- [agent-communication](/wiki/concepts/agent-communication/) — 概念页
- [communication-to-economy](/wiki/connections/communication-to-economy/) — 通信→经济桥接
- [agent-world-2028-synthesis](/output/reports/agora/market-competition/agent-world-2028-synthesis/) — 终局综合
