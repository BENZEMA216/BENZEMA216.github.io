# Agentic Trajectory Data（Agent 工作轨迹数据）

> 记录 Agent 在真实任务中的意图、状态、观察、工具调用、决策、结果、用户修正、成本与时延，并可用于评估、改进 Harness 或 post-training 的过程数据。

## 核心要点

- 最有价值的轨迹不只是 action log，还要保留 intent、context、state transition、outcome 与接受/拒绝信号
- 真实工作流数据（Type 1）比纯人工构造任务（Type 2）更接近长周期任务中的历史状态、组织规则和异常分支
- Type 1.5 用长期专家、真实工具、工程化 QA 和 data lineage 让人工任务更接近真实工作
- 好训练任务不仅“模型不会”，还要具备 hillclimbability：模型通过多次探索能够偶尔找到成功路径
- 可验证性与环境可重置性共同决定轨迹能否稳定转化为训练信号
- 应用公司的优势来自工作流入口，但原始日志不会自动成为 moat；必须有授权、质量、可审计 lineage 与结果闭环
- OPSD 将带完整 Context 的 teacher 经验蒸馏成 policy；Dreaming 用 world model 扩展少量真实经历，两者都不同于只存 transcript
- 企业 post-training 的最低判断式：数据独特性 × Eval 清晰度 × 任务频率 × 单次改善价值
- 外部信号只有连接到 `signal → decision → action → outcome` 才形成可学习轨迹；更多 dashboard、摘要或候选指标本身不等于业务价值

## 轨迹结构

一条可复用轨迹至少应回答：

1. **Objective / Intent**：用户或组织要达成什么结果
2. **Context / State**：当时可见信息、历史状态、权限与约束
3. **Observation / Decision**：Agent 看到了什么、为什么选择下一步
4. **Action / Tool**：调用了什么工具、参数、版本与 side effect
5. **Outcome / Evidence**：结果是否被独立验证、是否需要人工接管
6. **Feedback**：用户接受、拒绝、小改、大改、下载、退款或复购
7. **Efficiency**：token、latency、工具成本、人力介入与失败重试
8. **Lineage / Consent**：数据来源、授权范围、清洗、脱敏、版本与撤回

如果缺少 intent 与 outcome，日志只能说明“发生了什么”，不能说明“为什么这样做、是否做对”。如果缺少 lineage 和 consent，即使轨迹稀缺，也不能安全用于跨客户训练。

## 从工作流到模型改进

```text
真实任务
  → Trajectory capture
  → QA / Data lineage / Privacy
  → Eval 与可验证 reward
  → Harness、routing、memory 或 policy 改进
  → 新任务结果
  → 继续产生更高质量轨迹
```

这个飞轮有两种近端价值。第一种不改模型权重：用失败聚类、规则、tests、memory 和 tool routing 修复 Harness。第二种进入 post-training：把成功/失败、接受/拒绝、低成本/高成本路径转成 SFT、DPO、RL 或 policy distillation 数据。前者门槛更低、反馈更快，后者只有在任务高频、Eval 清晰、数据独特且价值足够高时才成立。

[pronto-stream-signal-to-action-product-analysis-2026-08-03](/output/reports/pronto-stream-signal-to-action-product-analysis-2026-08-03/) 把这一要求扩展到外部数据产品：接入、统一 schema、去重、关联和指标计算只完成了 observation 层。必须继续记录谁依据什么信号做了什么动作、是否产生收益或避免损失、误报和漏报的代价，数据才会进入可验证的 decision trajectory；否则系统只是让 Agent 生成更多简报。

## RLaaS 的产品边界

RLaaS 将企业工作流转成可调用工具、执行任务、检查结果并发 reward 的训练环境，本质上组合环境工程、Agent system、数据 QA 与 post-training 服务。它的难点不是做一个 demo environment，而是在规模扩大后仍保持任务真实性、可重置性、质量与安全边界。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [real-world-workflow-data-rlaas-2026-07-22](/raw/articles/agent-economy/real-world-workflow-data-rlaas-2026-07-22/) | Type 1/1.5/2 数据、hillclimbability、RL environment、OPSD、Dreaming 与企业 post-training ROI |
| [dai-yusen-vc-observation-ep2](/raw/articles/startup/dai-yusen-vc-observation-ep2/) | Harness 收集真实反馈，应用数据反哺模型的产业判断 |
| [agent-labs-gpt-wrapper-summer](/raw/articles/agent-economy/agent-labs-gpt-wrapper-summer/) | Agent 产品、专用环境与 post-training 的关系 |
| [agnost-ai-product-analysis-2026-07-17](/output/reports/agnost-ai-product-analysis-2026-07-17/) | Production failure cluster → canonical test → fix |
| [intuned-automation-integration-analysis-2026-07-22](/output/reports/intuned-automation-integration-analysis-2026-07-22/) | 生产 run、trace、异常与修复循环 |
| [pronto-stream-signal-to-action-product-analysis-2026-08-03](/output/reports/pronto-stream-signal-to-action-product-analysis-2026-08-03/) | 外部数据聚合只有绑定具体决策、动作与可衡量 outcome，才从信息 feed 变成可验证轨迹 |

## 关联概念

- [self-verification](/wiki/concepts/self-verification/) — 可验证结果把轨迹转成可靠反馈和训练信号
- [harness-engineering](/wiki/concepts/harness-engineering/) — 轨迹首先可用于修复 Harness，而不必直接训练模型
- [agent-memory](/wiki/concepts/agent-memory/) — Memory 保留经历，policy learning 改变行为，两者不可混同
- [world-model](/wiki/concepts/world-model/) — Dreaming 用内部模拟扩展稀缺的真实经历
- [agent-runtime](/wiki/concepts/agent-runtime/) — Runtime 决定可观察状态、工具调用和 side effect 是否能被完整记录
- [creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/) — 专业服务结果、人工修正和退款可构成任务级反馈，但须得到授权

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
