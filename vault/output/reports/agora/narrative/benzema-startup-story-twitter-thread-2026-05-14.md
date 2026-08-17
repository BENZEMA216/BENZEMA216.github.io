<!--
status: historical
status_reviewed: 2026-07-17
evidence_level: narrative-draft
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# BENZEMA 创业故事推文版 v0.1

> [!warning] 历史文案
> 本文保留发布文案演进，不应直接用于当前融资或官网。当前表达见 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)。

> Query: "把创业故事用 Logseq 或 CLI 的风格在推文中发布，并结合之前调研的产品重新构思故事线"  
> 日期: 2026-05-14  
> 用途: X / Twitter thread、即刻长帖、飞书同步草稿

---

## 叙事设计

这次不要从 "我们要做 Agent marketplace" 开始。

更好的入口是：

```text
AI 已经能生成。
但生成结果 ≠ 产品。
会用 Agent ≠ 能把能力卖给别人。
```

过去调研的产品各自验证了一块：

- **Claude Artifacts / Websim / YouWare / Promptarium**：Agent 产物可以被展示、发布、remix，但这更多是 output 层。
- **Poe**：B 可以托管 endpoint，A 在平台内使用，计费可以按 token / dynamic cost 走。
- **Apify**：automation / actor 可以按 event、result、usage 计费，并有测试、质量分和 payout。
- **Relevance AI**：paid agent/tool 可以绑定 project entitlement、退款、clone restriction。
- **Smithery**：MCP server 可以被发现、连接、授权、tunnel，但连接不等于交易。
- **Agent.ai**：agent listing 不只是卡片，而是 callable schema + metadata + executions + reviews；Agent Pack 把工作流拆成 `run_full` 和 `run_step_*`。

这些产品共同说明：

> 市场不是没有 Agent 分发，而是缺一套帮生产方把能力产品化和交易化的表达语言。

生产方真正需要的不是 "上架按钮"，而是一个 productization console：

```text
workflow        -> package
prompt/tool     -> callable schema
local context   -> resource binding
quality claim   -> canonical test
usage           -> event ledger
support         -> update channel
price           -> entitlement / payout
```

关键视角：

1. **商品页不是介绍页，是合约。** 它要告诉买方输入、输出、权限、成本、失败归因和支持边界。
2. **交易的不是 Agent，而是重复完成任务的概率。** 生产方卖的是经过验证的工作流，不是一段 prompt。
3. **产物社区只解决 "做出来以后怎么展示"；能力包解决 "别人怎么复用这套生产方式"。**
4. **生产方最难的是从 "我会做" 到 "我能卖"。** 我们要帮他完成拆解、封装、测试、定价和交付。
5. **runtime 会越来越多，交易层反而需要跨 runtime。** Claude Code、Codex、Cursor、MCP、local worker 都应该被适配，而不是被替代。

---

## 主推 Thread：CLI / Logseq 混合风格

### 1/

```bash
$ cat ai-market.md
```

过去几个月，我们看了很多 Agent 产品。

Claude Artifacts、Websim、YouWare、Promptarium。  
Poe、Apify、Relevance AI、Smithery、Agent.ai。

表面看都像 "AI marketplace"。

但我越来越觉得，真正缺的不是 marketplace。

### 2/

```bash
$ grep "missing layer" ./agent-products/*
```

现在市场已经有几层：

- 产物展示：Artifacts / Websim / YouWare
- endpoint 调用：Poe
- automation 计费：Apify
- paid agent/tool：Relevance AI
- MCP 连接：Smithery
- agent workflow：Agent.ai

缺的是中间那层：

**生产方怎么把自己的能力产品化。**

### 3/

Logseq block：

- 一个 creator 今天可能已经调出了一套很强的 workflow
  - 会选题
  - 会调用工具
  - 会规避失败
  - 有自己的判断标准
  - 有一堆案例和经验
- 但他很难回答：
  - 我到底卖什么？
  - 怎么交付？
  - 怎么证明有效？
  - 怎么持续收费？

### 4/

这就是我们看到的核心问题：

```text
can do  !=  can sell
demo    !=  product
prompt  !=  capability
agent   !=  business object
```

很多人已经 "会做"。

但 AI 时代真正会释放生产力的，是把这些 "会做" 编译成别人也能安装、验证、运行、更新和付费使用的东西。

### 5/

所以我们不想从 "Agent Store" 讲起。

这个词太容易让人想到：

- GPT Store
- bot directory
- prompt market
- MCP list
- workflow template

这些都不是错的。

但它们都太薄。

真正有价值的 Agent 能力，通常不是一个 bot，而是一整套运行态。

### 6/

```bash
$ tree capability-package
```

一个真正可交易的能力，至少应该长这样：

```text
skill/
mcp.json
runtime.json
memory_schema.md
routines.yaml
tests/
pricing.yaml
manifest.lock
event_ledger
```

不是为了复杂而复杂。

而是因为交易必须回答：谁能用、怎么跑、怎么验、怎么付、坏了算谁的。

### 7/

Agent.ai 给我的启发是：

> listing 不应该只是商品卡片，而应该是 callable schema。

一个 agent listing 需要：

- 输入 schema
- 输出格式
- executions
- reviews
- updated_at
- function metadata

这更像 API contract，不是营销文案。

### 8/

Apify 给我的启发是：

> automation 可以按 event / result / usage 交易。

不是所有能力都适合订阅。

有些按结果收费，有些按任务收费，有些按调用收费，有些卖持续维护。

Agent 能力商业化的关键，不是统一价格，而是把计费事件定义清楚。

### 9/

Relevance AI 给我的启发是：

> 购买不是下载文件，而是获得 scoped entitlement。

比如绑定到 project、限制 clone、支持退款、控制访问。

这件事很重要。

因为本地运行的 prompt / skill 不可能靠加密形成长期护城河。

真正可卖的是持续可用性、更新、验证、支持和受保护步骤。

### 10/

Smithery 给我的启发是：

> connection 是基础，但 connection 不是 transaction。

MCP server 能被发现、授权、连接，这是第一步。

但生产方还需要：

- 定价
- 分账
- 调用记录
- 失败归因
- 版本兼容
- 下架与退款

也就是说，工具协议之后，还需要交易协议。

### 11/

Artifacts / Websim / YouWare / Promptarium 给我的启发是：

> AI 产物会变成可展示、可 remix、可传播的对象。

但这里还有一个更深的问题：

别人看到你的 artifact 之后，能不能复用你的生产方式？

能展示 output 是第一步。

能交易 workflow，才是下一步。

### 12/

所以我们的判断是：

```text
future market != agent store
future market == capability package network
```

交易的不是 "一个会聊天的 Agent"。

交易的是：

- 一套可复现 workflow
- 一组工具和权限边界
- 一组测试和质量承诺
- 一个持续更新的能力线

### 13/

对生产方来说，这件事像什么？

不是 "上传 prompt"。

更像：

```bash
$ agora init
$ agora extract workflow
$ agora define resources
$ agora add smoke-test
$ agora price --mode event
$ agora publish
```

我们想帮生产方完成从 "我会做" 到 "我能卖" 的那一段。

### 14/

对用户来说，这件事也不是 "买一个 Agent"。

而是：

```bash
$ agora install xhs-trend-research
$ agora bind ./workspace
$ agora run smoke-test
$ agora run "帮我做下周选题"
```

用户买到的不是黑箱。

而是一套能在自己 runtime / 账号 / 文件 / 工具里跑起来的能力。

### 15/

这也是为什么我们会从产品化角度讲 Agora：

```text
creator workflow
 -> package extraction
 -> resource binding
 -> tests
 -> entitlement
 -> event ledger
 -> update channel
```

Agora 不应该是另一个 runtime。

它应该是第三方 Agent 能力的 productization + transaction layer。

### 16/

如果用一句话总结：

> AI 时代最重要的商品，不是 prompt，也不是 bot，而是被验证过、可迁移、可持续更新的工作流能力。

我们想做的事：

把专家调出来的 AI workflow，变成别人也能安装、验证、运行和付费使用的能力产品。

### 17/

```bash
$ echo "Not one genius. Millions."
```

不是一个超级 Agent 解决所有问题。

而是千万个生产方，把自己调出来的能力封装成可复用、可组合、可交易的 package。

这可能才是 Agent economy 真正开始的地方。

---

## 更短的一条推文版

过去几个月看了 Claude Artifacts、Websim、Poe、Apify、Relevance AI、Smithery、Agent.ai 后，我越来越觉得：真正缺的不是 Agent Store，而是帮生产方把能力产品化的那一层。

一个 creator 已经调出一套 workflow，不代表它能被别人购买。prompt 太薄，bot 太浅，MCP 只是连接，artifact 只是结果展示。真正可交易的是一套被验证过、能迁移、能更新、能计费的能力。

所以我们想做的不是另一个 runtime，而是 Agent Capability Package：把 expert AI workflow 变成别人也能安装、验证、运行和付费使用的能力产品。

---

## 备用标题

1. `can do != can sell`
2. `Agent Store 是错的隐喻`
3. `未来交易的不是 Agent，而是能力包`
4. `从 prompt market 到 capability market`
5. `生产方缺的不是上架按钮，而是产品化语言`
6. `AI workflow 如何从经验变成商品`
7. `Artifacts 展示结果，Capability Packages 交易生产方式`

---

## 关键来源

- `output/reports/agora/01-narrative/benzema-startup-story-2026-05-14.md`
- `output/reports/agora/03-product/agora-bp-agent-capability-package.md`
- `output/reports/agora/02-market-competition/agent-ai-deep-research-2026-05.md`
- `output/reports/agora/02-market-competition/user-a-use-user-b-agent-deep-research-feishu-2026-05.md`
- `output/reports/agora/02-market-competition/agent-output-sharing-platforms-2026-05.md`
- `output/reports/agora/04-business-model/agora-business-model-after-skill-trilemma.md`
