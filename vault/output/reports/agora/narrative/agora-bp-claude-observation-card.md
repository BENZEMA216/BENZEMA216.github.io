<!--
status: historical
status_reviewed: 2026-07-17
evidence_level: strategic-signal
superseded_by: "[combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/)"
-->

# Claude 产品节奏对 Agora 的历史旁证

#### 观察卡 — Claude 的产品节奏对这一判断的旁证（非正文）

> [!warning] 历史观察卡
> 本文仅保留为 Agent 基础设施趋势旁证，不证明 Combo 当前产品或平台效应成立。

> 这不是 pitch 主文，而是一张战略旁注：Claude 最近的产品节奏说明，Agent 正在从聊天界面进入生产基础设施。它验证 Agora 的方向，但也提醒我们：不能把自己讲成另一个 runtime。

##### 我们看到的信号

| Claude 正在补齐的层 | 代表动作 | 对 Agora 的含义 |
|---|---|---|
| 开发者工作台 | Claude Code desktop、parallel agents、session management | 开发者会越来越习惯把 Agent 当工作环境，而不是聊天窗口 |
| 云端生产运行 | Managed Agents、memory、checkpoint、sandbox、credentials | 通用 runtime 会被模型厂和云厂持续上移吃掉 |
| 外部系统连接 | MCP、connectors、OAuth、tool discovery | 工具连接层会逐渐标准化，单纯做 connector 不够 |
| 能力模块化 | Skills、routines、multi-agent patterns | Agent 能力开始有了可复用的“模块形态” |
| 安全与治理 | 权限、审计、隔离、凭据管理 | 第三方能力分发必须按 supply chain security 设计 |

##### 对 Agora 的直接判断

**Agora 不应该卖“另一个 Agent runtime”，而应该卖“第三方 Agent 能力如何变成可交付商品”。**

更具体地说，我们要做的是：

- Publisher：把创作者 workflow 打成能力包；
- Installer：让用户在自己的 runtime / 本地环境里装起来；
- Verification：用 canonical tests 证明能力能跑；
- Update channel：持续适配模型、MCP、connector、网页 UI 和用户环境变化；
- Distribution：让能力被发现、试用、评价、复购；
- Billing / settlement：把能力、更新、支持、托管保护步骤变成可收费对象。

##### 对能力包定义的影响

能力包 v0.1 应该顺着 Claude 生态已有原语长出来，而不是发明一个孤立格式：

| 能力包组件 | 作用 |
|---|---|
| `skill/` | prompt、方法论、领域知识、示例和资源文件 |
| `mcp.json` | 需要接入的工具、MCP server、OAuth scope |
| `runtime.json` | Claude Code / Codex / Cursor / Agent-VM 的适配声明 |
| `memory_schema.md` | 哪些状态可以长期记忆，哪些只能临时处理 |
| `routines.yaml` | schedule、webhook、API trigger 等触发方式 |
| `tests/` | smoke test、capability test、permission test、regression test |
| `pricing.yaml` | license、update channel、support boundary、hosted protected step |
| `manifest.lock` | 版本、依赖、hash、发布者签名、兼容矩阵 |

##### 最重要的产品启发

1. **Canonical tests 是交易信任基础。**  
   能力包商品页不应该先展示营销文案，而应该先展示：它能做什么、在哪些 runtime 通过测试、需要什么权限、最近一次通过测试是什么版本、失败后如何归因。

2. **商业模式不是卖文件，而是卖持续可运行性。**  
   本地 skill / workflow 文件天然可复制。用户愿意持续付费的对象应是安装跑通、更新兼容、测试报告、失败归因、团队治理、hosted protected step 和创作者分发。

3. **工程壁垒来自大量脏活累活。**  
   权限 diff、secret scan、dependency scan、action audit、publisher signature、rollback、install doctor、compatibility matrix 都很繁琐，但正是这些东西形成启动时间差。

##### 这张卡对 BP 主文的提醒

> Claude 正在把 Agent 变成生产系统；Agora 要把第三方 Agent 能力变成生产资料商品。

因此，BP 里应避免把 Agora 讲成“大而全 Agent 平台”，而要反复强调一个更尖锐的切口：**已经有人调出来的 Agent 能力，如何被别人可信安装、验证运行、持续更新并付费使用。**

来源：Claude Blog、Claude Managed Agents、MCP production systems、Claude Code Routines、Claude Skills、Claude Code session management、multi-agent coordination patterns。
