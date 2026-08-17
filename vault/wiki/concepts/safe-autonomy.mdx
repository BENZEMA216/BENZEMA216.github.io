# Safe Autonomy（安全自治）

> 在减少人工审批摩擦的同时保持 Agent 行为可控的设计原则：让 Agent 尽可能自主，同时确保不会造成不可逆的损害。

## 核心要点

- Claude Code 三层权限：Auto mode（classifier 审查）→ Permission allowlists → OS-level sandboxing
- ACI（Agent-Computer Interface）设计：tool interfaces 必须 self-evident、格式匹配 training data patterns
- Hooks 是确定性控制（vs CLAUDE.md 是 advisory），guarantee action happens
- "Success should be silent; only failures produce output" — 静默成功原则
- 优先 CLI tools over MCP servers（training data 覆盖更好）
- 多个工具创造 "the dumb zone" — 膨胀 context window，降低准确率
- Guardrails 三层：Maintainability → Architecture fitness → Behavior（最弱）
- 实例：exclusively require absolute filepaths 消除了整个 error class
- 第三方 MCP / Skill 的信任不能只看目录与名称，还要验证 publisher、package/repo provenance、维护状态、权限与撤销机制

## 详细说明

Safe Autonomy 是 Agent 工程中的核心张力：自治程度越高，Agent 越高效（减少人工审批的等待时间），但风险也越大（一个错误的 `rm -rf` 或者一个错误的 API 调用可能造成不可逆损害）。解决这个张力的关键不是在"安全"和"自治"之间找平衡点，而是通过分层设计让两者同时最大化。

Claude Code 的权限系统是一个优秀的分层实现。最外层是 OS-level sandboxing——限制文件系统访问范围和网络访问能力，这是硬约束，model 无法绕过。中间层是 permission allowlists——用户预先批准哪些工具、哪些命令可以自动执行。最内层是 auto mode 的 classifier 审查——对每个操作做实时安全评估。三层互为补充：即使 classifier 判断失误，sandboxing 也能兜底。

ACI（Agent-Computer Interface）设计是 safe autonomy 的另一个关键维度。工具的接口设计直接影响 Agent 的出错率。好的 ACI 遵循几个原则：接口必须 self-evident（参数名和返回值不需要额外解释），格式要匹配 model 的 training data patterns（CLI 格式优于自定义协议），工具数量要克制——每增加一个工具都在膨胀 context window，创造 "the dumb zone"，降低所有工具的使用准确率。

Hooks 机制体现了确定性控制的价值。CLAUDE.md 中的指令是 advisory 的——model 大概率会遵循，但不保证。Hooks 是确定性的——pre-tool-use hook 在每次工具调用前必定执行，无论 model 想不想。这个区别在安全场景中至关重要：你不能依赖 model "记住"不要删除某些文件，但你可以用 hook 确保每次文件操作前都检查路径是否在白名单内。一个具体的例子：exclusively require absolute filepaths 这一条规则，通过确定性检查实现后，消除了整个 relative path resolution 的 error class。

Safe autonomy 还依赖工具供应链。MCP Registry 能帮助发现 Server，却不保证条目声明的 repo、package、publisher 和运行 endpoint 可信；同名实现、消失仓库、弃用 package 与共享 metadata 会让 Agent 误装或误调用第三方能力。安装和路由前应核实 namespace、release digest、source provenance、权限范围和维护状态，运行时再用 scoped credentials、sandbox、audit 与 kill switch 限制后果。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [harness-engineering-deep-research](/raw/articles/harness-engineering/harness-engineering-deep-research/) | Sandboxing 层级、ACI 设计原则、Hooks vs Advisory 控制、Guardrails 三层模型 |
| [Claude Code System Prompt 详解](/raw/articles/claude-code-research/Claude%20Code%20System%20Prompt%20%E8%AF%A6%E8%A7%A3/) | Claude Code 的权限系统实现细节，auto mode classifier 机制 |
| [mcp-ecosystem-census-2026-07](/raw/articles/agent-communication/mcp-ecosystem-census-2026-07/) | MCP Server 的健康、名称冲突、repo metadata 与供应链选择风险 |
| [state-of-mcp-server-security-2025](/raw/articles/agent-communication/state-of-mcp-server-security-2025/) | Credential 类型、env var、静态 API key/PAT 与 OAuth 边界 |

## 关联概念

- [harness-engineering](/wiki/concepts/harness-engineering/) — Safe Autonomy 是 Harness Engineering 在安全维度的设计目标
- [tool-routing](/wiki/concepts/tool-routing/) — Tool Routing 中的工具选择直接影响安全边界
- [human-in-the-loop](/wiki/concepts/human-in-the-loop/) — Human-in-the-Loop 是 Safe Autonomy 的退化模式和兜底机制
- [mcp-server-trust](/wiki/concepts/mcp-server-trust/) — 第三方工具身份与 provenance 是权限控制之前的信任前提

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
