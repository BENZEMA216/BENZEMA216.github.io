# Model Supply Entitlements（模型供给权益）

> 对 AI 应用而言，模型 API 的合同不只是按量采购 token；它同时定义模型能力的可获得性、并发、功能权限、延迟与现金流约束。

## 核心要点

- Token 成本是变量，但年框、最低消耗和预付款会把它转化为现金流与供给风险
- 并发、排队优先级、特定模型版本、内容/素材库权限等 entitlement 会直接改变用户体验和可售卖的产品范围
- 当多个应用可同时接入同一顶级模型时，首发接入本身不是可持续壁垒；差异仍须来自工作流、分发、结果质量、服务与经营能力
- 定价不能只按 token markup 推导，还须覆盖失败重试、排队、退款、人工交付、获客与上游价格变动
- Gateway 可以把 key、预算、限流、fallback 与观测产品化，却不能消除不同 provider/endpoint/字段的能力差异；协议翻译本身会引入静默失真风险

## 详细说明

模型能力向应用层开放时，采购对象常被简化为“token”。但对视频生成、Agent 执行等需要即时响应的产品，合同里真正影响交付的还包括并发配额、可访问的模型版本、素材/身份权限、服务等级和供给稳定性。它们共同决定用户是否能在承诺的时间内得到可用结果。

因此，应用的单位经济不应把上游模型当作一个可无限弹性的按量成本。年框与预付款会在需求兑现前锁定现金，模型升级或上游调价会重写成本曲线；而并发不足则会把同一份模型能力变成排队、超时与退款。产品团队应分别跟踪：每次成功交付成本、失败/重试成本、峰值并发、可用率、用户等待时长、退款率，以及上游合同的最低承诺。

这也划出“模型接入”与“应用价值”的边界：接入一流模型可以抬高能力下限，却不能自动形成护城河。可持续价值要落在特定用户的输入组织、工作流、评估标准、分发与复购关系上；若这些没有形成，应用只是把上游供给转售给终端用户。

[bifrost-ai-gateway-product-analysis-2026-08-04](/output/reports/bifrost-ai-gateway-product-analysis-2026-08-04/) 说明 Gateway 是把供给权益转成可运营控制面的典型位置：Virtual Key、provider/model/key 白名单、budget、rate limit、weighted routing、retry/fallback、cache 与 OTel 可以统一管理多家上游。但统一 schema 不等于能力同质化；provider-native 的 token limit、prompt cache、container reuse、streaming 或工具字段可能在 translation layer 被丢失。生产替换前需要按 `provider × endpoint × streaming × tools × cache × cost` 做 wire-level 直连对照。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [token-kills-ai-applications-2026-07-30](/raw/articles/agent-economy/token-kills-ai-applications-2026-07-30/) | AI 视频应用采购 Seedance API 年框时，token、首发、并发与人脸库权限共同决定产品能否交付及现金流压力 |
| [combo-startup](/wiki/maps/combo-startup/) | Combo 的真实付费验证需覆盖单任务贡献毛利、推理成本、退款、售后与可规模化交付，而不能把模型调用视为唯一成本 |
| [bifrost-ai-gateway-product-analysis-2026-08-04](/output/reports/bifrost-ai-gateway-product-analysis-2026-08-04/) | Virtual Key、预算、限流、key/provider routing 与 fallback 如何运营化模型供给，以及协议翻译不等于能力等价 |

## 关联概念

- [creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/) — 模型能力只有嵌入明确服务输入、输出和责任边界后才成为可售卖结果
- [agent-runtime](/wiki/concepts/agent-runtime/) — Runtime 的并发、队列、重试与成本控制决定供给权益如何转化为实际交付
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) — 成功率、时延、人工介入、退款和成本是判断模型供给是否带来业务价值的运行证据

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
