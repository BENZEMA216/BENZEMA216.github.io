<!--
status: historical
status_reviewed: 2026-07-17
evidence_level: technical-reference
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# Agent VM 项目分析

> [!note] 历史技术资产
> Agent-VM 保留为本地 Profile / runtime activation 研究，不再是 Combo 当前第一版产品定义。

> 查询归档：用户问「https://github.com/xz1220/Agent-VM 这个项目在做什么？」
> 访问方式：使用 BENZEMA216 的 GitHub 权限读取 private repo，并临时 clone 到 `/tmp` 分析。
> 分析版本：`cca2983882dab1206509fe44af6d07b89b8f113b`，main 最新提交 `Fix Claude runtime-home test defaults`，提交时间 2026-04-29 01:01:36 +08:00。

## 一句话结论

Agent VM（`avm`）是在做 **AI Coding Agent 时代的 nvm**：用一个本地 CLI 管理可迁移的 Agent Profile，把同一个 agent 的角色、工具、权限、模型设置和长期记忆引用投射到 Codex、Claude Code、Cline、Cursor 等不同 coding agent runtime。

它不是简单的 dotfiles，也不是只管理 MCP config；它的核心是把「一个 agent 是谁、能用什么、默认携带哪些记忆、在不同 runtime 里如何降级映射」抽象成一等对象。

## 它要解决的问题

今天一个「后端开发 agent」通常散落在多处：

- `AGENTS.md` / `CLAUDE.md` / `.cursorrules`
- MCP server 配置
- skills / commands / hooks
- 模型、reasoning effort、approval、sandbox 等运行参数
- 用户偏好、项目架构、团队约定等 memory

Agent VM 想把这些合成一个可版本化、可导入导出、可切换的 **Agent Profile**。用户的主路径是：

```bash
avm use backend-coder
```

然后 AVM 将 `backend-coder` 这个 profile 渲染成对应 runtime 能理解的配置：Codex profile、Claude Code agent、Cline rules/MCP settings、Cursor rules/MCP PoC。

## 核心模型

### 1. Agent Profile

Profile 是主对象，包含：

- identity：agent 名称、角色、描述
- runtime：偏好运行时和 fallback
- model_run：模型名、reasoning effort、verbosity、temperature
- capabilities：skills、MCPs、commands、hooks、toolsets
- permissions：approval、sandbox、allow/deny policy
- memory_refs：项目知识、团队约定、用户偏好的可迁移引用
- runtime_extensions：保留各 runtime 原生扩展

关键判断：Profile 定义 agent；runtime 配置只是派生产物。

### 2. Capability Registry

能力本体放在 registry，Profile 只引用能力。这样一个 `backend-coder` profile 可以携带它依赖的 skills、MCP、commands、hooks 的引用和元数据，而不是把能力散落到 environment。

### 3. Portable Memory

AVM 不取代 Claude Code、Codex 或 IDE agent 的原生 memory，而是提供一个可审计的中间层：

- `avm use` 默认只投影当前 profile 引用的 memory refs
- runtime native memory 的 import/export/push/pull 必须显式触发
- Phase 1 已有 `avm memory import --from <file> --dry-run`
- Phase 3 才计划做 memory export、diff、push/pull 和团队 memory bundle

### 4. Environment Activation

Environment 不是第一心智，而是多 runtime 场景下的映射表。例如：

```text
backend-dev:
  codex -> backend-coder
  claude-code -> code-reviewer
  cline -> backend-assistant
```

用户 `avm use backend-dev` 后，各 runtime 分别切到对应 agent。

## 当前已经实现了什么

仓库是 Go CLI 项目，模块名 `github.com/xz1220/agent-vm`，主要依赖 `cobra` 和 `yaml.v3`。核心命令已经存在：

- `avm init`
- `avm agent create/list/show`
- `avm env create`
- `avm use`
- `avm status`
- `avm sync`
- `avm deactivate`
- `avm shell init bash|zsh|fish`
- `avm memory import --from <file> --dry-run`
- `avm export` / `avm import`

核心包结构：

- `internal/config`：YAML model、validation、activation resolve
- `internal/adapter`：统一 adapter contract、render plan、mapping status
- `internal/sync`：active rebuild、adapter 编排、conflict detection、backup、state 写入
- `internal/state`：sync state、runtime state、hash/mapping state
- `internal/memory`：portable memory metadata 和 dry-run import
- `internal/packageio`：profile/env package export/import
- `cmd/avm`：CLI 命令层

## Runtime 支持状态

README 和代码显示 Phase 1/2 的 runtime coverage 已基本落地：

| Runtime | 当前策略 | 状态 |
|---|---|---|
| Codex | 写 `config.toml`、agent role TOML、skills | full adapter |
| Claude Code | 写 `.claude/agents/*.md`、settings、MCP、skills | full adapter |
| Cline | 渲染 rules 和 MCP settings | full adapter，但 agent 非原生 |
| Cursor | `.cursor/rules/avm-<agent>.md` + `.cursor/mcp.json` | partial PoC |

项目很强调 **mapping status**：每个字段要标记为 `native`、`rendered_as_instructions`、`ignored` 或 `unsupported`。这避免了「看起来同步了，其实某些 runtime 根本不支持」的虚假一致性。

## 安全边界

设计上比较保守：

- `avm init` 只扫描和写 `~/.avm`，不修改 runtime 文件
- `avm use` 只写 adapter 声明的 managed paths
- 写入前做 conflict detection 和 backup
- 不默认覆盖 `AGENTS.md`、`CLAUDE.md`、`.cursorrules`
- secrets 应引用环境变量，不打包成明文 profile 数据
- runtime 原生 memory 不做静默双向同步

## 项目进度判断

这不是只有 README 的概念项目，已经是可运行的 early preview / MVP：

- `go test ./...` 本地通过
- 最近 GitHub Actions 是 success
- `ROADMAP.md` 中 Phase 1 Local Profile Activation 和 Phase 2 Runtime Coverage 基本已完成
- Phase 3 Portable Memory 和 Phase 4 Team Registry 仍未完成
- GitHub 当前没有 open PR / issue
- 仓库暂无 open-source license，README 说明目前 source-available 但不代表可自由复用

## 它和现有方案的区别

| 方案 | 管什么 | Agent VM 的差异 |
|---|---|---|
| dotfiles | 文件、软链 | AVM 有 Agent Profile 对象和 mapping status |
| MCP config manager | 工具连接 | AVM 同时管理角色、权限、模型、memory refs |
| runtime-native profiles | 单一工具生态 | AVM 试图跨 Codex / Claude Code / Cline / Cursor |
| agent platform | 通常云端或平台内 | AVM 首先是本地控制平面 |

最准确的定位是：**Agent Virtualization layer**，不是 config sync 工具。

## 对 BENZEMA 知识库的意义

Agent VM 和 vault 里已有几个主题强相关：

- [agent-runtime](/wiki/concepts/agent-runtime/)：它是一个本地 agent runtime control plane，而不是 agent 本体。
- [harness-engineering](/wiki/concepts/harness-engineering/)：它把 profile、adapter、mapping、状态、测试和安全写入变成 harness 工程问题。
- [agent-memory](/wiki/concepts/agent-memory/)：它把 memory 从 runtime 私有状态抽成 portable memory refs。
- [skills-system](/wiki/concepts/skills-system/)：它把 skills 作为 profile capability 引用，并渲染到不同 runtime。
- [safe-autonomy](/wiki/concepts/safe-autonomy/)：它的 approval/sandbox/managed path/conflict detection 是本地安全自治边界。
- [harness-to-kan](/wiki/connections/harness-to-kan/)：Agent Profile + Portable Memory 可以成为 KAN 中「可迁移知识 agent」的本地打包/激活层。

## 后续值得追踪的问题

1. Portable Memory 是否能真正跨 Claude Code / Codex / Cursor 保持语义一致，而不是只把文本渲染成 instructions。
2. Team Registry 的 package policy、签名、审计和 secrets 剥离怎么做。
3. Cursor / Cline 这种非原生 agent runtime 的降级体验是否足够好。
4. `avm use` 是否能在真实用户日常中成为肌肉记忆，而不是只在 demo 中成立。
5. 它是否应该成为 Agora / capability package 的本地安装和激活层。
