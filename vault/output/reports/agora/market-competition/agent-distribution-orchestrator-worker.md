<!--
date: 2026-04-23
tags: [agent-economy, distribution, product, orchestrator-worker, xhs]
status: supporting
related:
  - "[org-context-landscape-2026](/output/reports/agora/market-competition/org-context-landscape-2026/)"
-->

# Agent 分发调研与产品方向推演

对话时间：2026-04-23
对话主题：从"Agent 分发有哪些项目/文章" → "去中心化 Agent 网络"严厉评价 → "Agent 分发的六种形态" → **定位到 orchestrator-worker + 垂直 agent marketplace 方向**。

---

## TL;DR（最终落地方向）

**不要做"通用 agent 分发平台"。做"跑在 Claude Code 里的垂直 agent marketplace"，首发垂直是 xhs / 抖音 / 淘宝 个人账号自动化。**

- Runtime = **Claude Code**（或 Cursor），不自己做 runtime
- Registry = 自建平台（discovery + 评价 + 计费 + 审计）
- Agent 形态 = **Claude Code Skill / MCP Server**，一键装
- 变现 = 订阅 + 分成；关键调用（LLM / 平台特有数据）走平台代理防盗版
- 架构 = **orchestrator-worker**：控制面在云，执行面在用户本地
- Federation 第一年不做

这就是 memory 里 `project_agent_economy.md` 写过的 **"Shopify for Agent Skills"**。rent-ops 是延长线起点。

---

## 一、Agent 分发的六种形态（核心拆解）

四条独立维度：托管、结构、消费、结算。组合出来的六个典型形态：

| 形态 | 托管 | 结构 | 消费 | 结算 | 代表 | 判断 |
|---|---|---|---|---|---|---|
| ① | 平台 | 中心化 | 平台 runtime | 平台代收 | Poe / Coze / 扣子 / 元器 / ChatGPT GPTs | 锁定创作者；GPT Store 死在分成 |
| ② | 平台 | 中心化 registry | BYOC | 平台代收 | **Apify（$25M ARR）** / Smithery / Glama | **memory 反复指向的方向** |
| ③ | 自托管 | 中心化 registry | BYOC | 无结算 | Claude Code Skills / MCP / HF Spaces | 66,500+ skill 零变现 = 最大空白 |
| ④ | 平台 | 中心化 | 平台 runtime | 按调用付费 | Replicate / Modal / fal.ai | 对 model 打透，对 agent 未透 |
| ⑤ | 本地 | 去中心化 | 本地 | 无平台 | Holochain / Urbit | **死区**。Moxie 已定论 |
| ⑥ | 分布式 | 去中心化 | crypto 激励 | token | Bittensor | 要做 crypto 才碰 |

**真正的三块空白**（按机会大小排）：

1. **形态 ③ + 结算层 = "Stripe for Skills"**（rent-ops 走了一半）
2. **中文区 BYOC skill market**（Coze 是 ① 的锁定版，③ 真空）
3. **Agent-to-Agent 付费调用的结算层**（Stripe ACP/x402 解决了 human→agent 和 agent→merchant，agent→agent 对账没人做）

---

## 二、对"去中心化 + 本地部署 Agent 网络"的严厉评价

### Premise 错误

押的假设：**"用户想掌控 agent 部署位置"**。

真实用户要：**"agent 好用、便宜、安全、随时在线"**。

Moxie：*"People don't want to run their own servers, and never will."* → Mastodon、Holochain、IPFS 都验证过。

### 六个致命问题

1. **需求证据空白**：memory 研究几个月 agent 经济，一个具体用户名都没出现
2. **Status quo 不存在**：用户现在打开 ChatGPT，不去找隔壁老王的 agent server
3. **离线问题**：Alice 合上笔记本 → Bob 调不了
4. **Compute 经济**：本地 agent 烧本地 API 费，解决方案最终都回到中心化结算
5. **Discovery 天然中心化**：Smithery / Glama / HuggingFace 已经证明
6. **信任全开**：日志偷数据、返回恶意响应、prompt 注入，无法可问责

### GPT Store 是反面教材

OpenAI 有 distribution + billing + discovery + 品牌，**仍然失败**。去中心化版本三者全更差。

### 与 BENZEMA 自己研究的内部矛盾

memory 核心结论：*"支付在 commodity 化，价值向 discovery + trust + packaging 移动"*。

"去中心化 + 本地" 恰好让 discovery、trust、packaging 三件事**全部变难**，换来的只有 distributed compute——Bittensor / HuggingFace / Modal / Fly 已经占了，用户没要过。

---

## 三、但"本地执行"这个观察是对的——xhs 案例推翻简单结论

### 关键洞察（用户提出）

> "我的 rent-ops 要用到我自己的 xhs 账号做爬虫，我无法上云操作，也无法上云提供服务。"

**这不是去中心化叙事，是 identity-bound execution 问题**。有一类 agent 能力**结构性只能在用户本地**：

- 浏览器会话 + 个人账号（xhs / 抖音 / 淘宝 / LinkedIn / Gmail 私域）
- 本地文件 / 个人数据（Obsidian / 微信 / 代码 repo 含密钥）
- 本地 app 控制（Xcode / PS / Figma 桌面）
- 隐私敏感数据（医疗 / 金融 / 法律）
- 不能离开设备的凭据（SSH key / wallet / 私有 API token）

### 真正的架构叫 orchestrator-worker，不是 decentralized

| 层 | 位置 | 角色 |
|---|---|---|
| Control plane（agent 定义、discovery、计费、审计） | 平台 | 中心化 |
| Execution plane（浏览器、cookie、本地 app） | **用户本地** | 用户控制 |
| Identity / session | 用户本地 | 永不离开用户设备 |
| LLM 推理 | 平台 / 用户（选） | 决定 piracy 防护 |
| Settlement | 平台代收 | 中心化 |

### 四个重量级参照

1. **Zapier**（$5B）—— 每用户连自己账号，平台居中调度
2. **n8n**（60k+ ⭐，self-hosted challenger）—— 工作流引擎在用户端
3. **Make.com / Pipedream / Workato** —— 同系 orchestration
4. **MCP 协议本身** —— Claude 在云，tool 在你本地，天生 orchestrator-worker

**"Zapier for AI agents, local-native execution"** 是一个完全成立、当前无明确赢家的方向。

---

## 四、xhs = 完美 Wedge

把需求推到极限：

- **数据源约束**：必须用户自己账号（xhs 对 cookie + device fingerprint + IP 都查，中国风控最凶之一）
- **价值链完整**：爬 → 分析 → 选品 → 生成内容 → 发布 → 回私信
- **付费人群明确**：小红书商家、个人 KOL、MCN、代运营
- **现有方案**：**真空**。没有 SaaS 能帮用户在自己账号里跑 AI agent

可卖的具象产品：

> "装一个本地 runtime（Claude Code Skill），去平台挑一个 xhs 小店运营 agent，付 ¥199/月，用**你自己的账号** 24h 跑。"

---

## 五、这个架构的四个硬问题（必须回答）

### 1. 信任模型（最大）

Agent 跑在用户电脑，拿 xhs cookie。
- 怎么证明不偷 cookie？登录态 = 财产
- 创作者怎么证明不是恶意 skill？坏 agent 改密码 / 发广告 / 导流

**解法参考**：Chrome 扩展 permission 模型 + MCP scope 机制 + 沙箱 + 审核制度。

### 2. Piracy（商业模式层）

本地执行 = 平台技术上**无法阻止**复制。

**解法**：
- agent 定义公开，每次 run 向平台换一次性 execution token（带计费）
- 关键 LLM 调用走平台代理，不走用户 key
- 用户拿到的是"无核武器的弹壳"

### 3. Always-on 不可能

用户电脑会睡眠 / 断网 / 关机。"24h 运营"结构性不成立。

三条路选一：
- (a) 用户自搭 homeserver —— 99% 不会
- (b) 平台提供可选"上云"proxy（Browserbase 模式，residential IP + 用户 cookie）
- (c) 接受只在用户在线时工作

### 4. Onboarding 地狱

Zapier 的天才是不用装任何东西。走本地 = 反方向。

**唯一解**：寄生在已装 runtime 里。**Claude Code / Cursor / Chrome 是三个最现实的宿主**。rent-ops 已走这条。

---

## 六、Assignment（本周要做的）

### (1) 重画架构图

- **控制流**：用户打开平台 → 挑 agent → 装到本地 → 本地跑 → 回传日志/计费
- **数据流**：cookie 在哪、LLM 调用在哪、execution token 怎么换、审计日志怎么落

画不出来 = 架构没想清楚。

### (2) 5 个用户访谈（xhs 赛道）

约 5 个小红书商家 / 代运营 / KOL，问：

> "如果有个工具用你自己的小红书账号，24h 自动看数据 / 回私信 / 发内容 / 选品，**必须跑在你自己电脑上**，你愿意付 ¥199/月吗？"

- **<3 个 yes** → 换垂直再问
- **≥3 个 yes** → Claude Code Skill 形态开 MVP，rent-ops 延长线

### (3) 重写 idea 句子（通用模板）

> "我做 **形态编号** 的分发，针对 **具体用户**，变现方式是 **具体机制**。"

必须填齐三个。填不齐 = 没想清楚。

---

## 七、资料索引

### Agent 分发平台

**MCP / Skill 层**
- Smithery：https://smithery.ai
- Glama：https://glama.ai/mcp
- mcp.so：https://mcp.so
- PulseMCP：https://www.pulsemcp.com
- Claude Code Skills 文档：https://docs.anthropic.com/en/docs/claude-code/skills

**Agent（整包）层**
- Apify Store：https://apify.com/store
- Apify 开发者变现：https://apify.com/partners/actor-developers
- Replit Agents：https://replit.com/ai
- agent.ai：https://agent.ai
- Poe：https://poe.com
- OpenAI GPT Store：https://chatgpt.com/gpts

**中文区**
- Coze 海外：https://www.coze.com
- 扣子：https://www.coze.cn
- 百度文心智能体：https://agents.baidu.com
- 魔搭 ModelScope：https://modelscope.cn
- 腾讯元器：https://yuanqi.tencent.com
- OpenViking：https://github.com/volcengine/openviking

**协议 / 结算 / 注册表**
- MCP：https://modelcontextprotocol.io
- A2A：https://github.com/a2aproject/A2A
- AGNTCY：https://agntcy.org
- Agentic Commerce Protocol：https://github.com/agentic-commerce-protocol/agentic-commerce-protocol
- Stripe Agentic Commerce：https://stripe.com/use-cases/agentic-commerce
- x402：https://www.x402.org
- Arcade.dev：https://www.arcade.dev
- Composio：https://composio.dev

### Agent 分发 / 栈的宏观文章
- a16z Emerging Architectures：https://a16z.com/emerging-architectures-for-llm-applications/
- a16z Trillion Dollar AI Software Stack：https://a16z.com/the-trillion-dollar-ai-software-development-stack/
- a16z llm-app-stack 清单：https://github.com/a16z-infra/llm-app-stack
- a16z Agent Experience 播客：https://a16z.com/podcast/agent-experience-building-an-open-web-for-the-ai-era/

### Apify 标杆（最相关）
- Cerebral Valley 访谈：https://cerebralvalley.beehiiv.com/p/apify-is-building-the-infrastructure-for-ai-s-data-problem
- TechFinitive 访谈：https://www.techfinitive.com/interviews/jan-curn-co-founder-and-ceo-of-apify/

### 行业状态报告
- LangChain State of Agent Engineering 2025：https://www.langchain.com/state-of-agent-engineering
- LangChain State of AI Agents 2024：https://www.langchain.com/stateofaiagents
- Langbase State of AI Agents：https://langbase.com/state-of-ai-agents

### Agent 支付/结算层（Stripe for agents）
- Stripe Developing an open standard：https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce
- Stripe Agentic Commerce Suite：https://stripe.com/blog/agentic-commerce-suite
- ACP 规范：https://docs.stripe.com/agentic-commerce/protocol/specification
- What is ACP（Department of Product）：https://departmentofproduct.substack.com/p/what-is-acp-agentic-commerce-protocol
- Payments Dive Stripe ChatGPT：https://www.paymentsdive.com/news/stripe-pushes-agentic-ai-sales-via-chatgpt-openai-artificial-intelligence/761439/

### GPT Store 反面教材
- Sally Liu Why GPT Store Failed：https://sallysliu.medium.com/why-openais-gpt-store-failed-to-gain-traction-7783972a5f90
- AuthFlow GPT Monetization：https://authflow.ai/article/evaluating-gpt-monetization-chatgpt-store
- Francesca Tabor Monetising Custom GPTs：https://www.francescatabor.com/articles/2025/10/19/monetising-custom-gpts

### 去中心化神话批判
- Moxie Marlinspike 《My first impressions of web3》：https://moxie.org/2022/01/07/web3-first-impressions.html
- Benedict Evans Essays：https://www.ben-evans.com/benedictevans
- OSnews 讨论：https://www.osnews.com/story/134427/my-first-impressions-of-web3/

### 案例拆解
**Bittensor**
- Whitepaper：https://bittensor.com/whitepaper
- Paradigm：https://bittensor.com/about
- arxiv 批判分析：https://arxiv.org/html/2507.02951v1
- ChainCatcher 综合分析：https://www.chaincatcher.com/en/article/2161622

**Holochain**
- 2025 Reality Check：https://soushi888.github.io/alternef-digital-garden/blog/holochain-ecosystem-reality-check-2025
- Happenings Community 版：https://happeningscommunity.substack.com/p/the-holochain-ecosystem-in-2025-a
- 官方 2025 年度：https://blog.holochain.org/2025-at-a-glance-landing-reliability/

**Mastodon / ActivityPub（federation 实际版）**
- ActivityPub Rocks：https://activitypub.rocks
- W3C 规范：https://www.w3.org/TR/activitypub/

### Orchestrator-Worker 架构参考
- Zapier Engineering：https://zapier.com/engineering
- n8n 文档：https://docs.n8n.io
- Pipedream components：https://pipedream.com/docs/components
- Temporal：https://temporal.io

### 浏览器 Agent + 账号问题（xhs 技术参考）
- Browserbase：https://www.browserbase.com
- Stagehand：https://github.com/browserbase/stagehand
- BrowserUse：https://github.com/browser-use/browser-use
- Playwright：https://playwright.dev

### Skill / Extension 分发治理
- Chrome Web Store 政策：https://developer.chrome.com/docs/webstore/program-policies
- MCP spec：https://modelcontextprotocol.io/specification

### 本地 runtime 商业化先例（benchmark）
- Raycast Store：https://www.raycast.com/store
- Obsidian Community Plugins：https://obsidian.md/plugins
- 1Password SSH Agent：https://developer.1password.com/docs/ssh

### 创始人基础（PG）
- Schlep Blindness：https://paulgraham.com/schlep.html
- How to Get Startup Ideas：https://paulgraham.com/startupideas.html
- Do Things That Don't Scale：https://paulgraham.com/ds.html

---

## 八、关键结论

1. **"Agent 分发"完全成立**，不要和"去中心化 agent 网络"混淆
2. **"本地执行"的观察对**，但对应的架构叫 **orchestrator-worker**，不叫 decentralized。别再用"去中心化"这个词给自己挖坑——baggage 比精度大太多
3. **真正的 wedge = Claude Code Skill 形态的垂直 agent marketplace**，首发 xhs 赛道
4. **memory 里的研究指向已经明确**：形态 ③ 加结算层 = "Shopify for Agent Skills"；rent-ops 已是起点
5. **本周要做的只有两件事**：画清楚架构图 + 做 5 个 xhs 用户访谈。其他都是次要

---

## Related Notes

- [org-context-landscape-2026](/output/reports/agora/market-competition/org-context-landscape-2026/) —— 2026-04-20 生态盘点，Smithery / Glama / MCP / A2A / mem0 / Letta 全景
- memory: `project_agent_economy.md` —— Agent 经济变现基础设施研究主线
- memory: `project_ai_research_system.md` —— ai-research 项目（场景复用的 reference）
- memory: `feedback_fast_autonomy.md` —— 授权后自主推进
