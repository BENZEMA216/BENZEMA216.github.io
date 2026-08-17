# Intuned：把没有 API 的网站编译成可维护 automation integration

> 生成时间：2026-07-22  
> 查询：Intuned 在做什么？为什么它能称为 automation integration？

## 摘要

Intuned 不是 Zapier 式的预制 connector 市场，也不只是“云端浏览器 + AI”。它把一个网站上的浏览器工作流封装成可调用、可调度、可观察、带登录态的 API：底层以 Python / TypeScript + Playwright 形成确定性代码，平台负责浏览器和代码同机运行、队列、重试、并发、认证、结果投递与 traces，Intuned Agent 负责从自然语言生成代码、在真实页面验证，并利用生产 run history 修复代码。

它最有辨识度的产品判断是：**AI 应主要处在 automation 的编译与维修阶段，而不必永久处在每次执行的热路径里。** Web Tasks 首次运行用 AI 探索并生成代码，随后按 `reuseKey` 优先重放已保存代码；只有站点变化或代码失效时才重新调用 AI 修复。由此把一次性的 computer use 变成可以反复消费的 integration。

## 它实际在做什么

### 1. Projects：把浏览器流程部署成 API

一个 Project 同时是代码库和 runtime 边界。开发者用 Python / TypeScript + Playwright 编写多个 API；每个 API 接收页面与参数，执行网页操作并返回结构化结果。部署后，这些 API 可通过 Intuned Client API 调用。

平台不是只出租浏览器：它把 automation code 与 browser 放在同一台机器，提供独立执行、队列、自动扩缩、retry、timeout、logs、Playwright traces、session recordings 和 result sinks。单次调用成为 `Run`，一次真实尝试成为 `Attempt`；批量或定时工作由 `Job → JobRun → Runs → Attempts` 管理。

### 2. AuthSessions：把“连接账户”变成长期运行能力

浏览器 integration 最难的部分之一不是 click，而是登录态。Intuned 让项目实现 `create`（如何登录）与 `check`（如何确认 session 有效），平台负责运行前验证、复用 session、过期重建，并支持 credentials-based、runtime-based 和 human recorder-based 认证。这使一个应用可以为每个终端用户创建独立 AuthSession，再代表该用户执行网页动作。

### 3. Intuned Agent：生成、验证与维修 automation code

Agent 能从自然语言建立 Project、在真实浏览器探索目标网站、生成 Playwright 代码、展示 diff，并在生产同构基础设施上测试。它还能读取失败 Run 的 parameters、results、logs 和 traces；self-healing 开启后，平台根据 success rate、failure count、result size 和历史模式发现异常，Agent 比较健康/失败运行、归因、在新 branch 修复，并按可配置层级 auto-merge / auto-deploy。

需要校正：self-healing 目前被官方标为 **experimental**，问题浮现可能有最长约 6 小时 batching window，具体 detection logic 未公开。因此它是有闭环设计的能力，不等于已经被独立证明为低误报、高成功率的生产自治系统。

### 4. Web Tasks：自然语言调用，但逐步“编译”为代码

Web Tasks 面向不想先建 Project 的用户：传入 task、start URL 与 parameters，拿回异步结果。关键是 `reuseKey`：

1. 首次运行由 Agent 探索网页，并决定哪些部分值得生成代码；
2. 成功后把代码保存在该 key 下；
3. 后续运行优先执行保存代码，因而更快、更便宜、更一致；
4. 代码失效时 AI 修复，成功后保存新 revision；
5. 失败运行永远不覆盖旧的 working revision，避免“坏运行污染资产”。

这相当于 `prompt → exploration → executable code → versioned reusable integration → monitored repair`。官方称首次运行 AI-heavy，稳定阶段 code-heavy，repair 阶段再次付出中等 AI 成本。

## 为什么这可以叫 automation integration

传统 SaaS integration 通常依赖目标产品的正式 API；browser automation 则直接把网页 UI 当作非正式 API。Intuned 补齐了 UI integration 成为“生产 integration”所缺的五层：

| 层 | Intuned 的实现 | 解决的问题 |
|---|---|---|
| Interface | Project API / Web Tasks API / parameters / structured return | 上游系统如何稳定调用 |
| Execution | Playwright code 与 browser 同机、isolated machines、queue、scale | 浏览器脚本如何稳定运行 |
| Identity | AuthSession create/check/reuse/recreate | 如何长期代表用户操作账户 |
| Operations | Runs, Attempts, Jobs, retry, concurrency, sinks | 如何批量、定时和交付结果 |
| Maintenance | traces + anomaly detection + Agent repair + branch/deploy | 网站改版后如何恢复 |

因此它的真正产品不是某一个 scraper，而是 **browser integration lifecycle platform**。

## 它的核心技术/产品诀窍

### AI 不常驻热路径，而是做 code synthesis + repair

纯 computer use 或 Browser Use 类方案每一步都让模型判断，灵活但慢、贵、随机且难 debug。Intuned 的默认选择是让 Agent 写确定性 Playwright，重复执行只跑代码；AI 在第一次 discovery、站点发生变化、失败诊断时回归。Web Tasks 的 `reuseKey` 把这个策略直接产品化。

### 把生产证据反馈给维修 Agent

普通 coding agent 只看到 repo 和一次 browser session；Intuned Agent 还能访问 deployment、AuthSession、Job、Run history、outputs、logs、Playwright traces，并在与生产相同的 stealth / proxy / CAPTCHA 环境验证。这使其有可能依据真实 failure evidence 修复，而不是盲猜 selector。

### 将 automation 的状态对象显式化

Project、API、Deployment、Run、Attempt、Job、JobRun、AuthSession、Issue、Branch 和 reusable revision 都是可寻址对象。可靠性不是一句“Agent 会自己做”，而来自这些对象之间可追踪的生命周期。

### 允许 deterministic / AI / hybrid 共存

平台不强迫所有步骤都 AI 化。可用纯 Playwright、Browser Use、Stagehand、computer use 或混合逻辑；这让高变化步骤用 AI、高频稳定步骤用代码，按任务实际 failure mode 分配成本。

## 与相邻产品的区别

| 类别 | 主要交付 | Intuned 多做了什么 |
|---|---|---|
| Zapier / 原生 connector | 已知 SaaS API 的预制动作 | 面向无 API / API 不完整的网站 UI，自定义能力更强，但维护成本也更高 |
| Browserbase / Browserless | 远程 managed browser | 同时托管 automation code、auth、jobs、retries、results 与 observability |
| Browser Use / Stagehand | runtime AI browser library | 可把它们作为库运行，但默认把重复流程编译成 deterministic code |
| Firecrawl 类 extraction API | 通用 scrape/crawl endpoint | 支持任意交互、authenticated RPA 与自定义业务逻辑 |
| Codex / Claude Code | 通用 coding agent | 额外拥有 browser automation 专用工具和生产 run/traces/auth context |

## 真实边界

- 它仍受网页 UI 脆弱性、bot detection、CAPTCHA、MFA、目标网站条款与 UI 变更影响；不是“所有网站自动得到稳定 API”。
- self-healing 的 anomaly detection 细节和独立成功率证据未公开，且功能处于 experimental。
- Hosted Project 的 AI / self-healing 能力比 Connected Project 更完整；选择 Git/本地协作会牺牲部分平台原生维修体验。
- `reuseKey` 是 automation identity，不会按 URL 自动隔离；错误复用同一 key 可能把不同网站任务混成同一份代码。
- automation 是否适合完全自动合并/部署，取决于动作风险。读数据 scraper 与支付、删除、发布类 RPA 不应使用相同 autonomy policy。

## 对 Agent / Combo 的 insight

最值得借鉴的不是“我们也做 browser automation”，而是三个结构：

1. **把 Agent 的一次性成功沉淀为 executable asset。** Prompt 和轨迹不是最终资产；可读代码、schema、revision、tests 与 evidence 才能复用、审计和摊薄成本。
2. **把 AI 从 always-on executor 移到 compiler / maintainer。** 对 Combo 的高频 creator workflow，Agent 首次探索后应尽量固化成可验证步骤、Skill 或 workflow revision；变化发生时再进入维修模式。
3. **维修闭环必须吃生产证据。** `run → evidence → anomaly → issue → scoped branch → test → merge/deploy` 比“失败后重新 prompt”更接近可运营产品。

但 Intuned 没有直接证明 Combo 的创作者需求、供给、分发、支付或服务商品化。它提供的是 automation asset lifecycle 与 maintenance architecture 的参考，不是 Combo 战略本身。

## 数据来源

- [Intuned Introduction](https://intunedhq.com/docs/main/00-getting-started/introduction)
- [How the platform works](https://intunedhq.com/docs/main/00-getting-started/how-intuned-works)
- [Intuned in depth](https://intunedhq.com/docs/main/01-learn/deep-dives/intuned-indepth)
- [How Web Tasks work](https://intunedhq.com/docs/main/07-web-tasks/how-it-works)
- [Self-healing projects](https://intunedhq.com/docs/main/02-intuned-agent/self-healing-projects)
- [Intuned vs other approaches](https://intunedhq.com/docs/main/01-learn/deep-dives/intuned-vs-others)
- [AuthSessions](https://intunedhq.com/docs/main/02-features/auth-sessions)
- [Jobs](https://intunedhq.com/docs/main/02-features/jobs-batched-executions)
- [harness-engineering](/wiki/concepts/harness-engineering/)
- [self-verification](/wiki/concepts/self-verification/)
- [agent-runtime](/wiki/concepts/agent-runtime/)

---
*由 LLM 从知识库查询生成*
