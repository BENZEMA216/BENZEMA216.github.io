<!--
date: 2026-05-07
tags: [agent-vm, agent-profile, agent-distribution, agent-capability-package, a2a, mcp, agora]
status: historical
status_reviewed: 2026-07-17
evidence_level: technical-exploration
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
related:
  - "[agent-vm-project-analysis](/output/reports/agora/product/agent-vm-project-analysis/)"
  - "[agora-bp-agent-capability-package](/output/reports/agora/product/agora-bp-agent-capability-package/)"
  - "[agent-distribution-atomic-units](/output/reports/agora/market-competition/agent-distribution-atomic-units/)"
  - "[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)"
-->

# AVM Shared Agent Profile 研究

> [!note] 历史技术探索
> 本文保留 Agent Profile 发布与调用研究，不代表 Combo 当前产品路线。

> Query: "基于我们聊的 AVM，我想要在一个 AGENT profile 的基础上，让我 share 的 AGENT，别人能访问到，研究是否值得尝试，以及实现需要做哪些事情。"
> 日期：2026-05-07

---

## TL;DR

**值得尝试，但不要把它做成 "GPT Store clone" 或 "把我的私人 Agent 直接开放给别人用"。**

更准确的方向是：

> **把 AVM 的 Agent Profile 从本地配置对象升级为可发布、可安装、可审计、可调用的 Agent Capability Package。**

这件事有两个层次，必须分清：

1. **Share Profile Package**：别人通过 link / registry 安装你的 profile，在自己的 runtime 和凭据下运行。风险低，最适合作为 MVP。
2. **Expose Live Agent**：别人可以远程调用一个由你托管或平台托管的 agent endpoint。价值更大，但需要 auth、sandbox、rate limit、billing、logging、permission、abuse handling 和 uptime。

我的建议是：**先做 A，再留 B 的接口。** 也就是先做 `avm publish` / `avm install <url>`，把 Agent Profile 变成可分享的能力包；同时生成一个标准化 `Agent Card`，以后可以接 A2A / MCP / registry，让其他 Agent 找到它、理解它、调用它。

---

## 1. 这个想法是否值得尝试

### 结论：值得，但 wedge 要窄

它值得尝试的原因不是 "大家需要更多 bot"，而是市场正在从聊天式 bot 进入 **agent capability distribution**：

- OpenAI Workspace Agents 把 GPTs 进化成组织内可共享、可执行工作流的 agents。来源：[OpenAI Workspace Agents](https://openai.com/index/introducing-workspace-agents-in-chatgpt/)
- OpenAI AgentKit 提供 Agent Builder、Connector Registry、ChatKit、evals 等平台原语。来源：[OpenAI AgentKit](https://openai.com/index/introducing-agentkit/)
- Claude Skills 已经支持自定义 skill，并能在组织内共享。来源：[Claude Skills docs](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)、[Claude Help](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- AWS Agent Registry 已经把 agents、tools、skills、MCP servers 做成企业内 catalog + governance。来源：[AWS Agent Registry preview](https://aws.amazon.com/about-aws/whats-new/2026/04/aws-agent-registry-in-agentcore-preview/)
- A2A 的 Agent Card 正在标准化 agent 的 identity、skills、endpoint 和 discoverability。来源：[A2A Agent Skills & Agent Card](https://a2a-protocol.org/latest/tutorials/python/3-agent-skills-and-card/)
- MCP Registry 已经开始做 server discovery，但它只解决 tool/server，不解决完整 profile、permissions、memory refs、tests、runtime adapters。来源：[Official MCP Registry](https://registry.modelcontextprotocol.io/)

这些信号说明：**"让别人访问到我的 Agent" 是真需求，但已有平台大多是单 runtime / 企业内 / 工具层 / app store 形态。** AVM 的差异化在于跨 Codex / Claude Code / Cline / Cursor 的本地 Profile control plane。

### 真正的空白

当前市场缺的不是：

- 一个新的 bot store
- 一个新的 MCP server directory
- 一个只分享 prompt 的网站
- 一个让用户把本地凭据交给陌生 Agent 的平台

缺的是：

> **一个 profile-native 的发布/安装/权限/测试/更新层：把一个可运行 Agent 的 identity、skills、tools、permissions、memory refs、runtime compatibility 和 tests 打成可迁移单位。**

这和 AVM 的现状高度吻合。AVM 已经有 `agent create/list/show`、`use`、adapter、mapping status、memory import dry-run、export/import。下一步自然就是从 "本地使用" 走到 "可信分享"。

### 不值得做的版本

如果做成下面几种，价值会很低：

| 版本 | 问题 |
|---|---|
| 只导出一个 YAML / zip | 没有安装验证、权限声明、依赖解析和 runtime compatibility，很快变成 dotfiles |
| 公开我的完整私人 Agent | memory、secrets、local paths、账号权限风险太大 |
| 通用 Agent Store | GPT Store / Coze / Poe / Apify / AWS / OpenAI 都在更强分发入口上竞争 |
| 纯远程 Agent API | 需要先解决 uptime、账单、安全、滥用、prompt injection，MVP 过重 |
| 纯 MCP directory | MCP 只覆盖 tool surface，不覆盖 profile、workflow、memory、eval 和 install doctor |

---

## 2. 应该怎么定义这个产品

### 推荐定义

> **Shared Agent Profile = 一个 AVM Agent Profile 的发布态，包含可公开的 profile metadata、capability refs、runtime mapping、permission schema、resource binding schema、canonical tests、version/signature，以及可选的 remote access endpoint。**

这里的关键词是 "发布态"。它不是把 `~/.avm` 原样上传，而是做一次 compiler pass：

```text
local AVM profile
  -> redaction / dependency resolve / compatibility check
  -> shareable package
  -> install link + agent card + optional live endpoint
```

### 三种访问模式

#### Mode A: Installable Profile

别人访问你的 Agent = 别人安装你的 profile package，然后在自己的机器上运行。

```bash
avm install https://registry.example.com/agents/backend-coder
avm use backend-coder
avm doctor backend-coder
```

优点：
- 最快实现
- 不需要你托管 runtime
- 用户凭据和本地文件留在用户机器
- 和 AVM 当前能力最贴

缺点：
- 本地包可复制
- creator 的私有 know-how 保护弱
- 每个用户环境差异会导致安装失败

适合 MVP。

#### Mode B: Hosted Protected Step

profile 本地运行，但某些高价值步骤走 creator / platform 的 hosted endpoint。

例子：
- 私有 rubric
- 专有案例库
- 付费 data source
- model call proxy
- license / execution token

优点：
- 保护核心能力
- 支持计费
- 不需要托管整个 Agent

缺点：
- 要做 auth、usage ledger、fallback、错误归因
- 需要明确哪些步骤可以远程，哪些必须本地

适合 v0.2 / v0.3。

#### Mode C: Live Agent Endpoint

别人访问你的 Agent = 其他人或其他 Agent 直接调用一个 endpoint。

```text
GET /.well-known/agent-card.json
POST /a2a/tasks
POST /mcp
```

优点：
- 更像真正的 "Agent as a service"
- 可被 A2A / MCP / registry 发现和调用
- 可以做按次计费和跨 Agent 协作

缺点：
- 需要托管 runtime、状态、队列、sandbox、quota、abuse handling
- 如果 endpoint 能触达你的私人 memory / tools，安全边界非常难

适合保留协议接口，不适合第一版全做。

---

## 3. 最小可行产品

### MVP 目标

用 2-3 周做出一个小闭环：

> 我能把一个本地 AVM profile 发布成 link；另一个人能通过 `avm install <link>` 安装、看到权限声明、绑定自己的资源、运行 smoke test，并在 Codex / Claude Code 至少一个 runtime 里成功使用。

MVP 不追求 marketplace，不追求付费，不追求远程 live agent。只验证：

1. profile 能不能被干净分享
2. 安装体验是否成立
3. runtime mapping 是否可信
4. 用户是否能理解权限和资源绑定
5. 被安装后的 Agent 是否明显优于通用 Agent

### 第一批 profile 选择

优先选 developer / research profile，不要先选需要用户账号和 cookie 的 xhs profile。

推荐三个候选：

| Profile | 为什么适合 |
|---|---|
| `repo-onboarding-agent` | 输入 repo，输出架构图、风险点、初始 AGENTS.md；测试容易 |
| `code-review-agent` | 权限可控，价值清楚，canonical tests 容易写 |
| `llm-wiki-query-agent` | 和 KAN / vault 强相关，可验证 "compiled wiki > generic search" |

不建议第一版选：

- 小红书 / 抖音账号自动化：权限和风控太重
- 通用个人助理：边界太宽
- 包含私人 memory 的 Agent：redaction 风险太高

---

## 4. 实现需要做哪些事情

### A. Package Manifest

定义一个发布态 manifest，例如：

```yaml
name: repo-onboarding-agent
version: 0.1.0
publisher: benzema
description: Onboard a repository and produce architecture, risks, and next actions.
profile:
  identity: ...
  model_run: ...
  capabilities:
    skills: [...]
    mcps: [...]
    commands: [...]
  permissions:
    filesystem: read
    network: optional
    shell: restricted
  memory_refs:
    public: [...]
    required_user_binding: [...]
runtime_compatibility:
  codex: native
  claude-code: rendered
  cline: partial
  cursor: partial
resources:
  required:
    - type: local_dir
      name: target_repo
tests:
  smoke: tests/smoke.yaml
  canonical: tests/cases/
signature:
  publisher_key: ...
```

关键原则：

- profile 本身不能直接包含 secrets
- local path 必须变成 resource binding schema
- memory 分 public、private、required_user_binding
- runtime support 必须来自 adapter mapping status，不能靠作者手写宣传

### B. Redaction / Privacy Compiler

`avm publish` 之前必须跑检查：

- secret scan：API key、token、cookie、SSH key、private URL
- PII scan：邮箱、手机号、地址、身份证等
- local path scan：`/Users/benzema/...` 这类路径不能进入公共包
- private memory scan：用户偏好、商业计划、账号信息必须显式标记
- tool risk scan：高危 tool 需要 human approval 或禁止发布

输出应该是一个 publish diff：

```text
Included:
  - skills/repo-onboarding
  - permissions/read-only-filesystem

Excluded:
  - memory/private/user-preferences.md
  - env var OPENAI_API_KEY

Needs user binding:
  - target_repo
```

### C. Install / Import Flow

用户侧不应该只是下载文件，而是一个 staged install：

```bash
avm install benzema/repo-onboarding-agent
avm inspect benzema/repo-onboarding-agent
avm bind repo-onboarding-agent target_repo ~/work/foo
avm doctor repo-onboarding-agent
avm use repo-onboarding-agent
```

安装流程需要：

- dependency resolution：skills、MCP servers、commands、hooks
- runtime check：当前机器有哪些 runtime
- permission prompt：读/写/网络/shell/浏览器权限
- conflict detection：是否会覆盖用户已有配置
- smoke test：安装后能否跑通最小任务
- rollback：失败后撤销 managed paths

### D. Agent Card / Discovery

每个 published profile 应该生成一个 `agent-card.json`，向 A2A / registry 对齐：

```json
{
  "name": "repo-onboarding-agent",
  "description": "Onboards repositories and produces architecture/risk summaries.",
  "skills": [
    {
      "id": "repo_onboarding",
      "description": "Read a repository and produce an onboarding report."
    }
  ],
  "interfaces": {
    "install": "avm://install/benzema/repo-onboarding-agent",
    "mcp": null,
    "a2a": null
  }
}
```

MVP 里 `mcp` / `a2a` 可以为空，但 card 结构先保留。这样未来从 "installable profile" 升级到 "callable agent" 不需要重做身份层。

### E. Registry

第一版可以很轻：

- GitHub repo + static index
- 或一个简单 registry service
- public / unlisted / org-private 三种可见性
- versioned package
- publisher signature
- download count / install success / test status

不要第一天做推荐算法、评论系统、复杂 marketplace。

### F. Canonical Tests

能力包必须附带测试，否则别人无法相信它在自己环境能跑。

测试至少三层：

| 测试 | 目的 |
|---|---|
| smoke test | 安装后最小运行成功 |
| canonical task | 证明 profile 真能完成声明的任务 |
| permission test | 证明它不会访问未声明资源 |

这也是未来计费、退款、ranking、版本更新的基础。

### G. Optional Live Endpoint

如果未来要让别人远程访问你的 Agent，需要补：

- A2A endpoint 或 MCP server
- auth：API key / OAuth / signed request
- quota / rate limit
- sandboxed execution
- event ledger
- usage-based billing
- task queue
- status / cancellation
- logs redaction
- abuse reporting
- revocation

这是第二阶段，不应拖慢 MVP。

---

## 5. 技术架构建议

```text
Creator local AVM
  avm publish
    -> profile compiler
    -> redaction scanner
    -> dependency resolver
    -> runtime compatibility matrix
    -> tests package
    -> signed package
    -> agent-card.json

Registry
  metadata / versions / signatures / test status / install URL

User local AVM
  avm install
    -> inspect permissions
    -> bind resources
    -> install dependencies
    -> run smoke test
    -> activate into Codex / Claude Code / Cline / Cursor

Optional platform
  hosted protected steps / billing / event ledger / remote agent endpoint
```

---

## 6. 关键风险

### 1. 隐私和 secrets 泄漏

AVM profile 很容易夹带本地路径、private memory、MCP credentials。没有 redaction compiler 就不能发布。

### 2. 虚假兼容

一个 profile 在 Claude Code 里好用，不代表在 Codex / Cursor 好用。AVM 已经有 mapping status，这是优势；发布态必须展示字段级兼容结果。

### 3. 安装失败

Agent 能力包最脆弱的地方不是 prompt，而是用户环境：runtime 版本、MCP server、node/python/go、API key、本地路径、权限策略。必须有 `avm doctor`。

### 4. Prompt / Skill 被复制

本地包无法绝对防复制。商业化不能建立在 "别人不能复制文件" 上，而要建立在：

- 持续更新
- hosted protected step
- reputation
- tests / verification
- support
- usage ledger

### 5. Live Agent 的安全边界

如果别人能直接调用你的 live Agent，它到底能访问什么？

- 你的 memory？
- 你的 tools？
- 你的账号？
- 你的 API quota？
- 你的电脑？

这些边界没定义清楚前，只能做 read-only / sandbox / no-private-memory 的 endpoint。

---

## 7. 建议路线图

### v0.1: Shareable Profile Package

- `avm publish --dry-run`
- manifest schema
- redaction scan
- dependency list
- runtime compatibility matrix
- signed zip / tar package
- `avm install <url>`
- `avm doctor`
- one smoke test format

目标：一个朋友能安装你分享的 profile 并跑通。

### v0.2: Lightweight Registry

- static registry index
- public / unlisted / org visibility
- package pages
- install count
- test status
- version history
- publisher signature

目标：3-5 个 creator 可以互相分享 profile。

### v0.3: Hosted Protected Steps

- execution token
- hosted private rubric / data call
- usage ledger
- basic billing placeholder
- failure attribution

目标：验证 "本地 open package + 云端 protected value" 是否能防止纯复制并支撑付费。

### v0.4: Callable Agent

- generate A2A Agent Card
- optional A2A / MCP endpoint
- remote task submission
- quota / auth / logs / cancellation
- read-only memory endpoint

目标：从 "别人能安装我的 Agent" 升级到 "别人的 Agent 能调用我的 Agent"。

---

## 8. 对 BENZEMA / Agora 的战略含义

这个想法是 Agora 主线的一个很好落点：

| AVM Shared Profile | Agora |
|---|---|
| 把本地 Agent Profile 发布出来 | 能力包 publisher |
| 让别人安装和运行 | installer + runtime adapter |
| 展示权限和兼容性 | trust layer |
| 运行 smoke/canonical tests | verification layer |
| 可选 hosted protected step | monetization layer |
| 未来支持 A2A/MCP endpoint | agent-to-agent distribution |

它也能和 KAN 连接：

- KAN 是 "我的 compiled knowledge 可被其他 Agent 查"
- AVM Shared Profile 是 "我的 Agent 能力可被其他人安装/调用"
- 两者合起来就是：**知识节点 + 能力节点都可以被发现、访问、验证、结算**

所以这是值得做的，但最好把第一性问题说清楚：

> 不是分享一个会聊天的 Agent，而是分享一个可运行能力。

---

## 9. 近期行动建议

1. 选一个最窄 profile：`repo-onboarding-agent` 或 `llm-wiki-query-agent`。
2. 定义 `avm-package.yaml` schema，不超过 30 个核心字段。
3. 做 `avm publish --dry-run`，先只输出 redaction report + compatibility matrix。
4. 做 `avm install <local-package>`，先不用云 registry。
5. 找 2 个朋友测试安装，指标是 10 分钟内跑通 smoke test。
6. 如果跑通，再做 static registry page 和 `agent-card.json`。
7. 暂时不要做 live remote agent，除非 profile 是 read-only、无私人 memory、无高危 tool。

---

## Sources Checked

- OpenAI Workspace Agents: https://openai.com/index/introducing-workspace-agents-in-chatgpt/
- OpenAI AgentKit: https://openai.com/index/introducing-agentkit/
- OpenAI GPT sharing docs: https://help.openai.com/en/articles/8798868-introducing-the-gpt-store
- Claude Agent Skills docs: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
- Claude Skills sharing help: https://support.claude.com/en/articles/12512180-using-skills-in-claude
- AWS Agent Registry preview: https://aws.amazon.com/about-aws/whats-new/2026/04/aws-agent-registry-in-agentcore-preview/
- A2A Agent Skills and Agent Card: https://a2a-protocol.org/latest/tutorials/python/3-agent-skills-and-card/
- Official MCP Registry: https://registry.modelcontextprotocol.io/
- Apify AI agent publishing: https://apify.com/partners/publish-ai-agents
- Poe creator monetization: https://help.poe.com/hc/en-us/articles/21921312368020-Poe-Creator-Monetization-FAQs
