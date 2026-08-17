# chandrudp29/skillhub 项目分析

> 2026-07-03 query：快速判断 `chandrudp29/skillhub` 在做什么，以及它对 Agent capability / skill marketplace 的意义。

## 一句话结论

`skillhub` 是一个面向 AI coding agent 的 **skill package manager + skill composer**：它让用户搜索、安装、比较、合并 Claude Code / Cursor / Codex / Gemini 等环境里的 skill，并支持从多个公开 skill 生态或本地文件拉取 skill 组合成一个新的 expert skill。

它不是完整 marketplace，也没有 payment / entitlement / payout / verified delivery；更准确地说，它在解决 **skill 的发现、安装、互操作、组合**，属于 Agent capability distribution 的工具层。

## 它具体做什么

### 1. Skill registry 与发现

仓库自带 `registry/index.json`，当前 registry 标注 `version: 1.1.0`、`updated_at: 2026-07-02`，包含 26 个 skill，覆盖 research、code quality、docs、dev patterns、DevOps、AI/ML、career、community persona 等分类。

CLI 命令包括：

- `skillhub list`
- `skillhub search <query>`
- `skillhub info <name>`

### 2. 跨 agent 安装

它把同一个 skill 写入不同 agent 的本地约定路径：

| Agent | 写入方式 |
|---|---|
| Claude Code | `.claude/commands/{name}.md` |
| Cursor | `.cursor/rules/{name}.mdc` |
| Codex | append 到 `AGENTS.md`，用 `<!-- skillhub:name -->` marker 包住 |
| Gemini CLI | `.gemini/skills/{name}.md` |

核心命令是：

- `skillhub install <name>`
- `skillhub install <name> --all-agents`
- `skillhub uninstall <name>`
- `skillhub update`

### 3. Diff 与 compose

这是项目真正的差异点。`composer.py` 会把 skill markdown 按 `##` section 解析，然后做两件事：

- `skillhub diff a b`：比较两个 skill 哪些 section 独有、哪些 section 同名冲突。
- `skillhub compose a b -o output`：把多个 skill 合成一个 skill。

冲突策略有两种：

- `first-wins`：默认，保留第一个 skill 的同名 section。
- `ai`：调用 Anthropic SDK，让 Claude 合并冲突 section。

内置模板包括：

- `fastapi-expert`
- `fullstack-expert`
- `ml-platform`
- `pre-pr-reviewer`
- `research-analyst`

### 4. 跨生态抓取 skill

`registry.py` 不只支持自身 registry，还硬编码支持多个来源：

- `skills.sh:name`
- `anthropic:name`
- `openai:name`
- `copilot:name`
- `microsoft:name`
- `google:name`
- `addyosmani:name`
- `agency-agents:name`
- `scientific:name`
- `antigravity:name`
- `gamedev:name`
- `tech-leads:name`
- `github:owner/repo/path`
- `./local-file.md`
- 已安装本地 skill：`claude:name` / `cursor:name` / `codex:name` / `gemini:name`

这说明它的产品假设是：未来 skill 会分散在很多 agent / registry / repo 里，用户需要一个统一入口来抓取和组合。

## 技术实现

- Python package：`skillhub-ai`
- 当前仓库版本：`0.3.0`
- Python：`>=3.9`
- CLI：Typer + Rich
- 网络与 registry：httpx
- skill frontmatter：PyYAML
- AI merge：optional dependency `anthropic`
- License：MIT

本地临时 clone 后跑测试：

```bash
python3 -m pytest -q
```

结果：70 tests passed。

## 对 BENZEMA / Agora 的判断

### 它解决了什么

它解决的是能力包分发链条里的 **packaging / installation / composition** 问题：

- skill 从哪里来；
- 怎么装进不同 agent；
- 两个 skill 合起来会不会冲突；
- 如何把多个 skill 合成一个更强的 expert skill；
- 如何把本地 team standard 和外部 skill 混合。

这对应 Agora 语境里的 L2 / L3 之间的一小段：让能力更容易被安装和组合，并在 compose 前给一点结构化可见性。

### 它没有解决什么

它还没有进入真正 marketplace 的核心闭环：

- 没有 creator payout；
- 没有付费 entitlement；
- 没有 per-run event ledger；
- 没有 verified delivery / canonical test marketplace；
- 没有 buyer-specific proof；
- 没有 runtime usage / outcome tracking；
- 没有 source protection 或 hosted protected step。

所以它更像一个 **open-source skill npm / Homebrew / package manager**，不是 Agent capability Shopify。

### 可以借鉴的点

- `diff before compose` 是很好的信任前置动作：买家/用户在安装前能看到冲突和重叠。
- Codex / Claude / Cursor / Gemini 的多 agent adapter 思路值得借鉴，说明 skill distribution 不能绑定单一 runtime。
- `github:` 和 local file 作为 escape hatch 很务实，可以降低 registry 冷启动成本。
- Compose template 可以变成高层商品形态：用户不买单个 skill，而买 “pre-pr-reviewer / fastapi-expert” 这种组合包。

### 风险或弱点

- 冲突检测目前主要按同名 `##` section 判断，语义冲突识别很浅。
- `first-wins` 可能静默丢掉后续 skill 的同名 section。
- 多生态支持依赖硬编码 GitHub 路径，外部 repo 结构变化会破。
- Codex 安装方式是 append `AGENTS.md`，对已有项目规范可能有文件污染风险。
- 当前 adoption 很早期：GitHub 页面显示 1 star / 0 forks / no releases；PyPI 虽已发布，但社区验证还少。

## 总结

`skillhub` 的核心不是“skill 列表”，而是 **skill composition layer**。它把分散的 markdown skill 当成可安装、可比较、可合成的能力单元来处理。

对 Agora 来说，它是一个很好的相邻信号：市场已经有人意识到 skill 会变成可分发对象，而且 pain point 不只是发现，还包括跨 agent 安装、冲突管理和组合。但它停在本地开源工具层，尚未触及商业化市场真正难的部分：购买前证明、运行后归因、支付结算、权限和持续交付。

## Sources

- GitHub repo: https://github.com/chandrudp29/skillhub
- PyPI JSON: https://pypi.org/pypi/skillhub-ai/json
- Local inspection: `/tmp/skillhub-inspect`
