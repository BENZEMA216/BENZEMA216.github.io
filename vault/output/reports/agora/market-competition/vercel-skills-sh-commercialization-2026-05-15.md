<!--
status: supporting
status_reviewed: 2026-07-17
evidence_level: product-research
-->

# Vercel skills.sh 商业化分析（2026-05-15）

> 查询问题：Vercel 的 skills.sh 有商业化的部分吗？它怎么做？

## 结论

skills.sh 目前没有做成 creator marketplace，也没有看到平台内的 paid skill、checkout、creator payout、revenue share 或 marketplace take rate。

它的商业化更像 **Vercel 的 agent ecosystem wedge**：用开放目录、CLI、install telemetry、official skills 和安全审计，把自己放到 AI coding agent 的上下文安装入口里，再把流量和信任导向 Vercel 的 AI Cloud / Frontend Cloud 产品。

一句话：skills.sh 不是直接卖 skill；它在占据 "agent context package manager" 的默认入口。

## 公开产品形态

Vercel 2026-01-20 发布 `skills` CLI 和 skills.sh。官方定位：

- `npx skills add <package>` 安装 skill package
- skills.sh 是 skill package 的 directory + leaderboard
- 用于发现技能、按分类/热度浏览、追踪 install stats

skills.sh About 页说明：

- skills.sh 是 AI agent skills 的 open directory
- Vercel 运营该站点
- CLI、ingestion pipeline、site 都是 open source
- 排名来自用户 opt-in 的匿名、去重 install counts
- 不收集个人信息或 session content

截至本次查询，skills.sh 首页 all-time leaderboard 显示约 90,942；Vercel 2026-02-20 blog 曾披露 skills.sh 已超过 69,000 skills、2 million skill CLI installs。Top skill `find-skills` 显示 1.5M installs。

## 有没有直接商业化

公开资料下，答案偏向：**没有直接 marketplace 商业化**。

证据：

- Vercel KB 写得很明确：没有 special publish command；把 skill 放到 git repo，别人用 `npx skills add` 安装后，就可能通过 install telemetry 出现在 skills.sh。也就是它不是传统 registry submission / paid listing 流程。
- skills.sh Terms 说，目录里的 skills 是作者财产，按源 repo license 分发；Vercel 不拥有、不托管、不重新授权 skill content。
- skills.sh 没有公开 pricing 页、creator dashboard、publisher account、checkout、entitlement、license key、payout 或 take rate。
- skill author requests 也只是 corrected / hidden / redirected，通过 PR 或联系团队处理，不是 merchant 后台。

因此，创作者在 skills.sh 上的收益路径不是平台分账，而是间接变现：

1. 免费发布 skill，提升 repo / product / API / SaaS 的 discovery。
2. skill 内引导用户配置自己的 API key，真正付费发生在作者自己的 SaaS。
3. 用 skill 做 developer marketing，让 agent 更容易使用某个产品或框架。
4. 企业/工具厂商发布 official skills，降低用户接入和留存成本。

## Vercel 真正怎么赚钱

skills.sh 的商业化不在站内交易，而在四层间接收益。

### 1. Vercel 自己产品的 agent-native onboarding

Vercel Docs 已经把 skills 放进自己的产品接入路径：

- AI Gateway getting started prompt 要求 agent 安装 Vercel Skills：`npx skills add vercel-labs/agent-skills`
- Vercel Agent Resources 页面列出 Vercel official skills：AI SDK、AI Elements、Streamdown、agent-browser、vercel-deploy、vercel-cli、workflow、Microfrontends、UCP 等
- Microfrontends changelog 直接发布了对应 skill，让 coding agent 通过自然语言配置 group、projects、routes

这说明 Vercel 把 skills 当作 **agent onboarding layer**：不是让用户读文档，而是让 agent 装上 Vercel 的操作手册，然后直接替用户配置 Vercel 产品。

商业化路径是：

skill → agent 能更顺利接入 Vercel → 创建项目/拉 env/用 AI Gateway/部署/用 Workflow/Microfrontends → Vercel Pro/Enterprise/usage billing。

### 2. 抢 agent package manager / context distribution 入口

Vercel 明确把 `npx skills` 做成跨 agent CLI，支持 Claude Code、Cursor、Codex、GitHub Copilot、Windsurf、Gemini、Cline 等。Andrew Qu 在 Skills Night 里把它称为 agent context 的 package manager。

这对 Vercel 的战略价值很大：

- 传统开发者入口是 npm / GitHub / docs / framework
- AI agent 时代的新入口是 agent 能装什么 context、信任什么 workflow、默认查哪个目录
- Vercel 通过 skills.sh 拿到 "agent 该学什么" 的分发位置

这不是短期收入项，但可能是长期生态控制点。

### 3. 安全审计与 trust layer

Vercel 2026-02-17 宣布 skills.sh 自动安全审计，合作方包括 Gen、Socket、Snyk。公开页面显示 Security Audits 汇总 Gen Agent Trust Hub、Socket、Snyk 的结果。

这层目前对用户免费展示，但它有明显商业化潜力：

- partner security vendors 获得分发与 brand exposure
- Vercel 获得安全可信的生态叙事
- 未来可扩展为 enterprise policy、private registry、allowlist、signed skills、compliance reports、paid audit provider marketplace

目前还不能说它已经这样收费，但 partnership / security provider / enterprise procurement 是最明显的商业入口。

### 4. API 和数据层

skills.sh API docs 写明 API 用于 programmatic access to catalog、leaderboard、search；文档显示可通过 `skills-api@vercel.com` 申请 API key，更高限额为 600 requests/min。

这不是公开 self-serve 计费，但已经有 API key gate。潜在商业化方向包括：

- 给 agent platforms / IDE / enterprise tooling 提供更高限额
- 作为 skill discovery feed 嵌入第三方 agent
- 提供 telemetry / trend / audit feed
- private skill registry / enterprise catalog

本次实际请求公开 API 时返回 `authentication_required`，说明它比文档描述的 "unauthenticated allowed with stricter limits" 更收紧。这个变化本身也说明 Vercel 可能在控制 API 分发。

## 和 Smithery 的差异

Smithery 的收费已经比较直接：MCP Connect / Gateway 按 RPC usage、namespace、OAuth、persistent connections 收费。

skills.sh 更上游：

- Smithery 卖连接层：tool/server 怎么被 agent 调用
- skills.sh 卖不直接收费的上下文分发入口：agent 该学什么、装什么 workflow、相信哪个目录

两者都没有完整 creator payout，但商业化重心不同：

- Smithery 更像 MCP gateway SaaS
- skills.sh 更像 npm + Product Hunt + security leaderboard + Vercel product onboarding

## 对 Agora 的启发

skills.sh 验证了一个事实：**agent capability 的分发入口可以先免费、开放、跨 agent，占住 install habit 和 telemetry，再接商业化**。

但它没有解决：

- paid skill
- publisher account
- entitlement
- license enforcement
- usage metering
- versioned package contract
- payout / refund
- task success attribution

所以 Agora 不应简单复制 skills.sh 做目录。更好的定位是补 skills.sh 没有做的 producer / merchant layer：

- Skill / Capability listing contract
- install doctor + compatibility matrix
- canonical tests
- paid protected steps
- credential subject / delegated auth
- event ledger
- pricing studio
- payout / refund / failure attribution

## Sources

- Vercel changelog: Introducing skills, the open agent skills ecosystem — https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem
- skills.sh About — https://skills.sh/about
- skills.sh Terms — https://skills.sh/terms
- skills.sh API docs — https://skills.sh/docs/api
- Vercel KB: Agent Skills: Creating, Installing, and Sharing Reusable Agent Context — https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context
- Vercel changelog: Automated security audits now available for skills.sh — https://vercel.com/changelog/automated-security-audits-now-available-for-skills-sh
- Vercel blog: Skills Night — https://vercel.com/blog/skills-night-69000-ways-agents-are-getting-smarter
- Vercel docs: Agent Skills — https://vercel.com/docs/agent-resources/skills
- Vercel docs: AI Gateway Getting Started — https://vercel.com/docs/ai-gateway/getting-started
- Vercel changelog: Manage Vercel Microfrontends with AI Agents and the CLI — https://vercel.com/changelog/manage-vercel-microfrontends-with-ai-agents-and-the-cli
