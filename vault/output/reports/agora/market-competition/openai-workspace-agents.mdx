<!--
date: 2026-04-24
tags: [openai, workspace-agents, codex, agentkit, frontier, custom-gpts, enterprise-agents]
status: supporting
trigger: 用户要求深挖 OpenAI Workspace Agents（从 enterprise-agent-platform-landscape 延伸）
related:
  - "[enterprise-agent-platform-landscape](/output/reports/agora/market-competition/enterprise-agent-platform-landscape/)"
  - "[agent-distribution-orchestrator-worker](/output/reports/agora/market-competition/agent-distribution-orchestrator-worker/)"
-->

# OpenAI Workspace Agents 深挖（2026-04-22 发布）

## TL;DR

- **2026-04-22 发布**，Research Preview，**免费到 2026-05-06**，之后按 **credit-based** 计费（费率未公开）
- **定位**：**custom GPTs 的继任者**，企业 Business / Enterprise / Edu / Teachers 订阅独占。custom GPTs **明确被 deprecate**（时间未定），企业版用户必须把旧 GPTs 迁移到 Workspace Agents
- **技术底座**：**由 Codex 驱动**（不是普通 ChatGPT），每个 agent 部署到 Slack 时就是一个 Codex 实例在监听 @ mention
- **三层栈定位**：AgentKit（dev SDK）→ Frontier（enterprise 管理面）→ **Workspace Agents（产品化的用户入口）**
- **能力**：background computer use、90+ plugins、长期记忆、自主 schedule/trigger、跨 ChatGPT + Slack 运行、multi-day 异步工作
- **企业集成**：Slack、Google Drive / Calendar / Gmail / Docs / Sheets、Microsoft Suite、Salesforce、Notion、Atlassian Rovo、SharePoint
- **Business 起步价**：$20/user/月 + credits（待公布）
- **战略信号**：OpenAI 正在用 Codex 作为统一 runtime，**从模型 API 商** 一路上移到 **产品/SaaS/平台**。VentureBeat 的潜台词：**vendor lock-in 风险上升**

**对 BENZEMA 的直接启示**：Workspace Agents **完全不碰 2C / 个人用户场景**——只做 $20+/user 的 Business+订阅。Claude Code Skill 垂直 marketplace 空白没被吃到。但 Codex computer use + 90+ plugins + multi-day scheduling 这套**正在重新定义"agent 能做什么"的上限**，是你要追的能力基线。

---

## 1. 定位与发布

### 1.1 时间线
- **2024-11**：Custom GPTs 发布（允许普通用户定制 ChatGPT 角色）
- **2025-10**：AgentKit 发布（Agent Builder 可视化 + Connector Registry + ChatKit）
- **2026-02**：Frontier 发布（企业 orchestration 平台，HP / Oracle / Uber 早期客户）
- **2026-04-15**：Agents SDK 更新加入 sandbox 能力
- **2026-04-22**：**Workspace Agents 发布**
- **2026-05-06**：免费试用结束，改 credit-based 计费

### 1.2 发布信号
**custom GPTs 被明确 deprecate**（时间待定），企业/教育/团队版**必须迁移**。官方承诺旧 GPTs 可转换为 workspace agent。这是 OpenAI **第一次公开砍掉一个已有相当使用量的 2C 产品**——信号强烈：

- OpenAI 认为 **2C 个人 agent（custom GPTs）价值低**
- OpenAI 要把资源压到 **企业订阅的 team-level automation**
- custom GPTs 两年后验证的结论：**个人 agent 不赚钱，企业 agent 赚钱**（和 memory 里你对 agent 经济的判断一致）

### 1.3 目标用户（严格限定）

只开放给这四个订阅：

| 订阅 | 价格 | 角色 |
|---|---|---|
| ChatGPT Business | $20/user/月 | 中小企业 |
| ChatGPT Enterprise | 企业报价 | 大企业 |
| ChatGPT Edu | 教育定价 | 高校/机构 |
| ChatGPT Teachers | 教师定价 | K-12 老师 |

**Plus / Pro / Free 用户完全没有**。这是 OpenAI 明确抛弃个人 agent 市场的动作。

---

## 2. 技术架构

### 2.1 Codex 作为统一 runtime

Workspace Agents **不用 GPT-5 推理环，而是跑在 Codex harness 上**。Codex 是 OpenAI 2026 大改造的"AI coding harness"，可：

- **Background computer use**：Codex 在用户不看的时候操作 macOS 应用（自己移动光标）
- **In-app browser + 网页上直接评论**
- **Image gen**：GPT-Image-1.5
- **Schedule + autonomous resume**：agent 可以自己 schedule "明天 9 点继续"

当 agent 部署到 Slack 频道，**就是一个 Codex 实例在 listen @ mention，把工作 thread 回来**。——这是非常重要的架构认知：**Slack 里的 agent 物理上是一个 Codex 会话**。

### 2.2 90+ Plugin 生态

Codex 在 2026-04 新增 90+ 插件，其中能名列的：

| 插件 | 功能 |
|---|---|
| Atlassian Rovo | JIRA 集成 |
| CircleCI | CI/CD pipeline |
| CodeRabbit | Code review |
| GitLab Issues | GitLab 工单 |
| Microsoft Suite | Office / M365 全家桶 |
| Neon by Databricks | 数据库 |
| Remotion | 视频生成 |
| Render | 部署 |
| Superpowers | 杂项工具集 |

**Plugin 架构**：每个 plugin 是 "custom skills + app integrations + MCP servers" 的组合，agent 在 runtime 动态发现和调用——**MCP 是 OpenAI 的 plugin 底层协议**，这和 Anthropic / Google 完全一致。

### 2.3 Agent 创建流程

用户在 ChatGPT 新 tab 里：

1. 自然语言描述想要的 workflow
2. 系统**自动 map workflow**、连接所需工具、测试功能
3. 用户审核 → 激活
4. 可 schedule 或 trigger-based 触发

这是 **low-code agent builder 的成熟形态**——和 Gemini Enterprise 的 Agent Studio、Coze Studio、百炼控制台技术路径一致。

### 2.4 三层栈协同

```
┌─────────────────────────────────────────────┐
│  Workspace Agents  (产品/SaaS 消费端入口)    │  ← 用户
├─────────────────────────────────────────────┤
│  Frontier  (企业 orchestration + 语义层)     │  ← IT / Admin
├─────────────────────────────────────────────┤
│  AgentKit  (开发者 SDK)                      │  ← Developer
├─────────────────────────────────────────────┤
│  Codex Harness  (agent loop runtime)         │  ← 底层 runtime
├─────────────────────────────────────────────┤
│  GPT-5 / GPT-5.3 / GPT-5.4-Cyber (模型)     │
└─────────────────────────────────────────────┘
```

- **AgentKit**：Developer 用 Python/TS SDK 自己造
- **Frontier**：企业 IT 管理员统一管理、接数据仓库（outcome-based 定价，**按完成工作付钱**不是按座位付）
- **Workspace Agents**：业务用户直接用，不用写代码

---

## 3. 集成和连接器

### 3.1 已确认的第三方集成

| 类别 | 服务 |
|---|---|
| 协作 | **Slack**（核心）、Notion |
| Google | Drive、Calendar、Gmail、Docs、Sheets |
| Microsoft | Microsoft Suite、SharePoint、Outlook |
| 销售 | Salesforce |
| 开发 | Atlassian Rovo（JIRA）、GitLab、CircleCI、CodeRabbit |
| 其他 | Neon / Databricks、Render、Remotion |

### 3.2 扩展机制
- **Custom MCP servers**：用户可接自己的 MCP server
- **Files**：agent 可以读工作区文件
- **Skills**：custom skill 可以上传
- **Image gen / Web search**：原生

### 3.3 **最关键的集成洞察**

**Slack 是 Workspace Agents 的核心**。官方 blog 标题是 "agents in ChatGPT"，但架构实际是：

- **ChatGPT = 管理台 + 主要交互界面**
- **Slack = agent 实际"在场"的地方**——每个 agent = 一个 Codex 实例在 Slack 频道里 listen

这意味着 OpenAI 在赌：**企业 agent 的消费场景在 Slack/Teams/飞书里**，不在 ChatGPT 窗口里。这与 Microsoft Copilot（集成到 Teams / Outlook / SharePoint）的路径一致——**agent 要在人本来就在的地方**。

对比 Anthropic：Claude Code 跑在 CLI 和 IDE 里——这是**开发者场景**，不是**业务场景**。OpenAI 和 Microsoft 更像在抢"agent in Slack/Teams"这个场景，Anthropic 在抢"agent in IDE"。

---

## 4. 企业管控 / Admin 能力

这是 **workspace agents 和 custom GPTs 最大的区别**：

| 能力 | Custom GPTs | Workspace Agents |
|---|---|---|
| **持久化** | Session-based | Cloud-based，multi-day 运行 |
| **共享** | 个人或公开 | 组织内 team-level |
| **权限** | 无 | **org controls + approvals** |
| **记忆** | 有限 session | **长期 persistent memory** |
| **执行** | 同步 chat | **异步 schedule + trigger** |
| **分析** | 无 | **org-level analytics dashboard** |
| **部署** | ChatGPT only | **ChatGPT + Slack + Codex app** |
| **工具** | OpenAI 固定 | **90+ plugins + custom MCP** |
| **治理** | 无 | **prompt injection protection + admin 审批 + 数据访问限制** |

### 具体的企业控制
- **数据/工具访问粒度**：admin 限制 agent 能访问什么数据、什么工具
- **敏感操作前要 approval**：写入、发送、删除前可插入人审
- **Prompt injection 保护**：官方 blog 专门强调
- **Audit trail**：审计日志

---

## 5. 定价逻辑

### 5.1 已知的
- **免费到 2026-05-06**（研究预览）
- **5-6 起改 credit-based**
- **ChatGPT Business**: $20/user/月（入场券）
- **Enterprise / Edu / Teachers**: 销售报价

### 5.2 未公开的
- Credit 怎么算（按 task?按 token?按 session-hour?）
- 每 $20 订阅含多少 credit
- Plugin 使用是否额外收费
- Codex app 单独定价？

### 5.3 定价对标（跨家比）

| 平台 | 单位 | 价格 |
|---|---|---|
| OpenAI Workspace Agents | 订阅 + credits | $20+/user + credits |
| Anthropic Claude Managed Agents | session-hour | **$0.08/session-hour + token**（最透明）|
| Microsoft Agent 365 | 订阅 | $15/user/月（E7 bundle $99）|
| Microsoft Copilot Studio | credit pack | $200/25k credits |
| Salesforce Agentforce | per-conversation | bundled with CRM |
| Google Gemini Enterprise | 企业定制 | 未公开 |
| ByteDance Coze 企业版 | flat | ¥4,980/月 |

**OpenAI 的 credit-based 方向**：和 Microsoft 一致，走 Azure 式的资源消耗计费。这对**个人独立开发者不友好**——个人不会付 $20/月 Business 订阅只为了搭一个 agent。OpenAI 基本放弃了 indie dev 市场。

---

## 6. Custom GPTs → Workspace Agents 迁移

**战略关键**：OpenAI 明说会 deprecate custom GPTs（时间未公布），企业订阅用户**必须**迁移。

### 潜在影响
- Custom GPTs 此前在 GPT Store 里几十万个 GPT 的作者——大部分**没有组织订阅**，他们的 GPT 不能直接迁到 Workspace Agents
- **GPT Store 实际上被慢性安乐死**（和 memory 里 Sally Liu 那篇"Why GPT Store Failed"的预测一致）
- OpenAI 在用 Workspace Agents 完成一次**用户清洗**：丢弃 2C / free / plus 用户做的 agent，只要企业订阅里的 agent

### 对中国市场的含义
国内基本用不到（ChatGPT 企业订阅不正式对中国开放），但是国内企业 agent 平台（扣子 / 百炼 / 千帆）**不会被 Workspace Agents 直接冲击**。

---

## 7. 竞争态势

按场景对位：

### 7.1 vs Claude Managed Agents（Anthropic）
| 维度 | Workspace Agents | Claude Managed Agents |
|---|---|---|
| 目标 | 业务用户（no-code）| 开发者 / 企业 |
| 定义方式 | 自然语言 / 模板 | YAML / 自然语言 |
| 部署 | Slack / ChatGPT / Codex app | 云端 managed |
| 定价 | $20+/user + credits | $0.08/session-hour + token |
| 差异 | **产品化更狠，锁企业订阅** | **开发者 API 友好，可组合** |

### 7.2 vs Microsoft Copilot Studio
| 维度 | Workspace Agents | Copilot Studio |
|---|---|---|
| 生态 | Slack / Google Workspace 友好 | **M365 / Teams / SharePoint 深度绑定** |
| 治理 | 正在建 | **成熟（governance-first）** |
| 协议 | MCP（通过 Codex plugin）| **A2A + MCP 最中立** |
| 用户画像 | 业务用户 + dev | **IT admin + business user** |
| 差异 | 更灵活 | **更合规** |

### 7.3 vs Google Gemini Enterprise
| 维度 | Workspace Agents | Gemini Enterprise |
|---|---|---|
| 模型开放 | OpenAI 独占（Codex）| **200+ 模型含 Claude** |
| 架构打包 | 三层栈（AgentKit/Frontier/WA）| **单一收束（吸收 Vertex AI）** |
| 身份 | 订阅 + admin 权限 | **cryptographic agent identity** |
| 差异 | OpenAI 锁定 | 多供开放 |

### 7.4 vs Salesforce Agentforce
| 维度 | Workspace Agents | Agentforce 360 |
|---|---|---|
| 锚点 | Slack 通信场景 | **CRM 数据 + Atlas Reasoning Engine** |
| 客户 | 任意企业 | SF 客户池（12k 已签约）|
| 差异 | 消息 / 协作 driven | CRM driven |

---

## 8. VentureBeat / 业内的 critique

### 8.1 Vendor lock-in
VentureBeat 明确提**三个 lock-in 信号**：
1. **Codex 独占**：workspace agent 跑 Codex，不能切换到 Claude / Gemini
2. **Custom GPTs 强制迁移**：旧用户没有别的选项
3. **Credit-based 定价不透明**：到 5-6 才公布

### 8.2 95% AI pilot 失败陷阱（DataCamp 对 Frontier 的 critique，延伸到 WA）
> up to 95% of company AI test projects fail to produce clear business value, typically due to system integration failures

Frontier / Workspace Agents 的价值主张是解决这个——但 DataCamp 指出：**它同时要求"clean, connected data infrastructure + workforce AI literacy"——59% 受访企业自认有技能缺口**。即 OpenAI 卖平台前提是**企业已经完成 data + people 的基础建设**。对大部分中小企业不成立。

### 8.3 免费 14 天 + 突然转 credit-based
**用户获取套路**明显：先让企业免费试用 14 天到 5-6，然后把价格一锁——这在 SaaS 老玩法里叫"bait-and-switch lite"。Business 订阅客户已经在 $20 池子里，**谁都不好意思半个月后退订**。这是 OpenAI 对订阅现金流的一次硬拉升。

---

## 9. 战略解读：OpenAI 的真实意图

把 2024-2026 OpenAI 企业动作串起来：

```
custom GPTs (2024-11)        ─ 2C / Plus 用户 agent
    ↓ 失败（GPT Store 零变现）
Assistants API (2024)        ─ Developer API 入口
    ↓ 被 Agents SDK 合并
Agents SDK (2025-03)         ─ 开源 SDK
    ↓ 成为 AgentKit 一部分
AgentKit (2025-10)           ─ Developer toolkit（Agent Builder + Connector Registry + ChatKit）
    ↓ 企业需要更多 orchestration
Frontier (2026-02)           ─ Enterprise 管理平台（HP/Oracle/Uber）
    ↓ 需要 no-code 消费端
Workspace Agents (2026-04)   ─ 业务用户产品化入口
```

**OpenAI 的真实战略演化**：
- **从"模型 API 商"转型为"企业 SaaS 公司"**
- **从"2C"（custom GPTs）转向"2B"**（Business+ 订阅独占）
- **从"通用 model"转向"垂直 harness + 插件生态"**（Codex + 90+ plugins）
- **从"开放生态"转向"vendor lock-in"**（Codex 独占 + credit-based + 强制迁移）

这个方向和 Microsoft Copilot / Salesforce Agentforce **完全是同一个**。OpenAI 已经不是"模型公司"，是"企业 agent SaaS 公司"。

---

## 10. 对 BENZEMA 方向的影响

复盘 memory 里的方向（Claude Code 寄生 + 2C 垂直 agent marketplace + xhs wedge）：

### 10.1 正面信号
- **OpenAI 主动放弃 2C 个人 agent 市场**（custom GPTs 被 deprecate），**空白进一步扩大**
- **ChatGPT Plus/Pro/Free 用户没有 agent 能力**（除了 default ChatGPT）——个人付费用户有未被满足的需求
- **OpenAI 在企业场景，不进 Claude Code 这个 IDE/CLI 场景**——宿主场景分工清晰：OpenAI → Slack，Anthropic → IDE，你可以继续押 Claude Code
- **credit-based 定价**（费率未公开但 $0.08/session-hour 是 B2B 参考）= **2C 个人订阅 $9.99/$19.99/月是完全合理的**

### 10.2 负面信号
- **Codex + 90+ plugins 正在快速定义"agent 能做什么"的上限**——你的垂直 skill 要跟上
- **Slack 作为 agent 消费场景**被 OpenAI 重押 —— 如果你想做 2C，要想清楚消费场景在哪（Claude Code? 微信? 飞书? 小红书内本身？）
- **Workspace Agents 免费 14 天 + $20/user credit 模式**，会抽走部分企业客户预算 ——（不影响 BENZEMA 的 2C 方向，但影响 B2B 分层）

### 10.3 一个新的 wedge 想法

OpenAI 把 custom GPTs deprecate 后，**GPT Store 里几十万个 GPT 的作者面临弃作选择**：

- 企业订阅用户 → 迁移到 Workspace Agents
- 个人 Plus / Pro 用户 → **没有迁移路径**，他们的 GPT 死了

这部分创作者里有大量**中文创作者 + 中文 GPT**（旅游助手、写作 GPT、翻译 GPT、小红书文案 GPT 等）。他们接下来要找**可以承载他们"GPT 二次生命"的平台**。

**潜在 wedge**：做一个"GPT 迁移到 Claude Code Skill / MCP"的工具 + marketplace。创作者一键把旧 GPT 定义搬到 Skill/MCP 形态，挂在你的 marketplace 里变现。

这是一个**极短窗口**（2026-04 到 OpenAI 正式 deprecate custom GPTs 之间的窗口）的迁移机会。值得认真评估。

---

## 11. 待跟踪的 6 个问题

1. **Credit-based 具体费率**（5-6 公布）—— 决定 2C 价格对标
2. **Codex 90+ plugins 完整清单**和迭代速度 —— 决定你的垂直 skill 要提供什么能力
3. **Frontier 是否向中型企业下沉**（目前只做大企业）—— 影响 B2B 客户分层
4. **Workspace Agents 在中国用户的实际可访问性**（目前 ChatGPT 企业版在国内不直接提供）—— 影响中国市场竞争
5. **Custom GPTs 正式 deprecate 时间**和迁移窗口长度
6. **Slack / Teams 里的 agent 互通**（OpenAI agent 能访问 Microsoft agent 吗？）—— 决定"Slack 作为 agent 消费场景"是否真的成立

---

## 12. 关键 References

### 官方
- **OpenAI Workspace Agents 发布**：https://openai.com/index/introducing-workspace-agents-in-chatgpt/
- **OpenAI Frontier**：https://openai.com/business/frontier/
- **AgentKit 发布**：https://openai.com/index/introducing-agentkit/
- **Codex for (almost) everything**：https://openai.com/index/codex-for-almost-everything/
- **Codex + Slack 集成**：https://developers.openai.com/codex/integrations/slack
- **Agents SDK (Python)**：https://openai.github.io/openai-agents-python/

### 深度分析
- **VentureBeat**（**最推荐**）：https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more
- **DataCamp — Frontier 解析**：https://www.datacamp.com/blog/openai-frontier
- **Big Hat Group — Codex 企业更新**：https://www.bighatgroup.com/blog/openai-codex-enterprise-ai-automation-april-2026/
- **TechCrunch — Agents SDK 2026-04 更新**：https://techcrunch.com/2026/04/15/openai-updates-its-agents-sdk-to-help-enterprises-build-safer-more-capable-agents/

### 行业报道
- **SiliconANGLE**：https://siliconangle.com/2026/04/22/openai-subscribers-get-new-workspace-agents-automate-complex-tasks-across-teams/
- **9to5Mac**：https://9to5mac.com/2026/04/22/openai-updates-chatgpt-with-codex-powered-workspace-agents-for-teams/
- **Neowin**：https://www.neowin.net/news/openai-launches-autonomous-workspace-agents-in-chatgpt/
- **Testing Catalog — 24/7 always-on 角度**：https://www.testingcatalog.com/openai-launched-24-7-always-on-workspace-agents-in-chatgpt/
- **Let's Data Science — Codex Claude Code killer**：https://letsdatascience.com/blog/openai-rebuilt-codex-into-a-claude-code-killer-it-now-runs-your-mac-while-youre-

### 竞品对比
- **Pasquale Pillitteri — ChatGPT vs Claude vs Copilot vs Gemini**：https://pasqualepillitteri.it/en/news/1321/chatgpt-workspace-agents-openai-comparison-2026
