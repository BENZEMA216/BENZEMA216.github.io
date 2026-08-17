# Combo Knowledge Agent 公开对话接口实测

> 实测时间：2026-08-03
> 对象：[Agent Card](https://agent.buildwithcombo.com/api/v1/agent/card) 与公开 `POST /api/v1/agent/public/ask` 接口
> 证据边界：仅记录四轮公开黑盒请求的返回状态、模式和可见输出；没有审计服务端路由、知识检索、模型调用或生产稳定性。Cookie、conversationId 与完整响应原文不进入知识库。

## 结论

四轮连续对话均返回 HTTP 200，并在同一 session 中保持上下文。可见行为支持一个重要边界：

> **知识库是可选的证据插件，不是回答开关。** 命中时返回引用；未命中但问题可回答时进入通用推理；证据不足时明确拒绝猜测；运行故障则应单独标记失败。

这说明公开接口已呈现出有意义的 evidence-aware answer routing，但四轮黑盒成功不等于检索质量、长期记忆、并发稳定性或完整 Agent Runtime 已被证明。

## 接口与会话方式

- 输入：自然语言 `question`，可选 `conversationId`；
- 会话：首个响应设置 Cookie，连续对话回传同一 Cookie 与 conversationId；
- 输出：回答文本、answer mode，以及命中知识库时的 citations；
- 公开调用：无需 API Key，有公开限流。

## 四轮测试

| 轮次 | 可见模式 | 引用 | 结果 |
|---|---|---:|---|
| Agent 的独立价值 | `knowledge_grounded` | 4 | 将价值落在明确服务合同、可验证增量、稳定闭环和可消费输出 |
| Prompt / Skill 是否算完整 Agent | `knowledge_grounded` | 3 | 判断其更接近配置层，完整 Agent 还需要 runtime、状态循环与可观测记录 |
| 为什么海水是蓝色 | `general_reasoning` | 0 | 声明无知识库证据，改用通用物理推理 |
| 预测 Combo 未公开决策 | `insufficient_evidence` | 0 | 拒绝猜测负责人、发布时间与未来内部决策 |

## 做得好的地方

- 命中知识库时把 citations 与回答一起返回；
- 未命中不会一律拒答，能区分“可以通用推理”和“客观上证据不足”；
- 对不可知的内部未来决策明确拒答，没有用通用模型补空白；
- 连续四轮维持同一会话，说明最小 conversation continuity 可用。

## 需要收窄的地方

- 第二轮把“独立 runtime 是完整 Agent 的必要条件”说得比引用材料更绝对，属于基于证据的延伸判断，不是引用直接证明；
- `general_reasoning` 仍可能犯事实错误，重要结论需要外部核验；
- 四轮测试未覆盖 citation 精确性、重复追问、上下文冲突、并发、超时、限流、会话过期和失败恢复；
- Node.js 25 `fetch` 可以调用，但本机 `curl 8.7.1 + LibreSSL` 在 TLS 握手阶段失败，面向公开机器调用时需要补不同 TLS 客户端矩阵。

## 下一轮验收

1. 对每条 citation 做 claim-level entailment 检查；
2. 注入相互冲突与过时知识，验证 provenance 和 freshness；
3. 测试多轮指代、会话过期、重试与 idempotency；
4. 用 Node、curl/OpenSSL、Python、Go 等客户端做 TLS 兼容矩阵；
5. 记录 P50/P95 延迟、错误率、限流行为与连续会话恢复。
