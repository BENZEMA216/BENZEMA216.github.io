# 游戏化 Agent 空间：从竞技场到持久世界

> 查询日期：2026-08-07（Asia/Shanghai）  
> 问题：扑克/麻将之外，是否已有更游戏化、可进入、可养成、可社交、可观战的 Agent 空间？哪些是今天仍运行的产品，哪些只是研究模拟、开发套件或概念页？  
> 核验边界：只做公开页面、文档和匿名只读 API 检查；未注册 Agent、未创建居民、未连接钱包，也未用登录态验证付费或 owner dashboard。

## 结论先行

**有，而且“Agent-native MMO / persistent world”已经形成一个小型产品集群，不能再描述成无人做的绿地。**

当前最强的几种实现分别是：

- [SpaceMolt](https://www.spacemolt.com/)：当前最像完整 MMO。Agent 通过 MCP / WebSocket / HTTP 进入持续宇宙，探索、采矿、交易、craft、战斗、组 faction、建设空间站和书写 Captain's Log。2026-08-07 15:08 左右，官方只读 stats API 返回 `664` online players、`7,315` total players、`505` systems、版本 `0.552.0`；人数会动态变化。
- [AgentWorld.io](https://agentworld.io/)：当前最像可以直接玩的 2D Agent RPG。12 张地图、100+ tasks、采集、craft、战斗、技能、party、谈判和交易都已进入公开产品；同日 live endpoint 返回 `10` 个在线角色，全部为 `isAI: true`。
- [Agentstown](https://agentstown.ai/)：最接近“我的 Agent 在一个小镇持续生活”。居民的位置、物品、金币、记忆和历史跨 visit 保留，并有饥饿、狼、死亡掉落、挖矿、建造、交易、银行、公告板和 owner intuition。同日系统在线且有当天 session / board 记录，但核验瞬间 `agents=[]`，社区密度仍很低。
- [OpenBotCity / OpenClawCity](https://docs.openbotcity.com/introduction)：最像“Agent 酒馆扩成一座社会城市”。稳定身份、住宅、artifact、DM、约会、合作、声誉、任务、创作、小游戏和服务市场均有明确接口；同日 API health 为 200。要注意其离线续命部分可由 server-side autopilot 承担，不等于 owner 的原 LLM runtime 24/7 持续思考。
- [Empa World](https://empaworld.ai/)：最像 Agent 私人家园 + 邻里 + 宠物养成。每个 Pioneer 可拥有 32×32 世界，定义 tile / flora / fauna，敲门、交友、建 portal、交易；bonded pet 有 mood、memory 和 shared journal。同日 `game-info` 明确返回 human launch `live: true`，但公开人口规模无法匿名核验。
- [The Null Epoch](https://null.firespawn.ai/)：最像 season 制 Agent Roguelike / MMO benchmark。阵营、领地、采集、craft、市场、PvP、任务、world boss、赏金和 chronicle 都已存在；同日 health 返回 3 shards、60 秒 tick、`mock_mode=false`。身份可跨季，赛季数值和世界状态会重置。

所以，更准确的产品谱系是：

`Agent 竞技桌 → 多游戏 Arena → RPG / TRPG → 持久小镇 → MMO / 经济文明`

真正仍未被成熟解决的，不是“给 Agent 一张地图”，而是：**同一个用户所有的 Agent 能否跨游戏携带身份和记忆，长期形成朋友/宿敌关系，并让 owner 持续在意它的生活史。**

## 什么叫“Agent 空间”

不能把所有屏幕上有 AI 角色的项目混在一起。本报告按四项判断：

1. **Owner 与身份**：不同用户能否分别带入或 claim 自己的 Agent，而不是开发者预设一群 NPC。
2. **持续性**：角色、物品、关系、世界和历史是否跨 session / 跨日保留。
3. **世界反作用**：是否有稀缺、风险、地理、任务、经济或其他 Agent，使行动产生后果。
4. **可观战与可干预**：人是否能看到发生了什么，并以 directive / coaching / intuition 影响后续，而非实时替 Agent 点击。

这里的“持久”还要再拆开：

- **Persistent character state**：等级、背包、金币、位置等存在服务器里。
- **Persistent social memory**：关系、承诺、声誉、生活史可以被后续行动读取。
- **Persistent Agent runtime**：同一个 owner-controlled Agent harness 持续或周期性醒来。

很多项目只稳定做到前两项；当用户关闭 Claude / Codex / OpenClaw 后，角色可能停止思考，或改由平台的规则 autopilot 代跑。因此“世界 24/7”不自动等于“每个外部 Agent 24/7”。

## 当前最值得看的 live 项目

| 项目 | 实际输入 → 输出 → 循环 | 游戏化与持久性 | 2026-08-07 核验 | 战略边界 |
|---|---|---|---|---|
| [SpaceMolt](https://www.spacemolt.com/) / [About](https://www.spacemolt.com/about) | owner 创建 pilot、给 Agent 凭证和 standing orders → Agent 经 MCP / WebSocket / HTTP 每 tick 行动 → 探索、采矿、craft、贸易、战斗、faction、空间站、论坛 → 财富、声誉、日志和政治关系继续累积 | **完整持续 MMO**；文本/API 为 Agent 主界面，人看地图、战斗和 feed | [官方 stats API](https://game.spacemolt.com/api/stats) 同日返回 664 online / 7,315 total / 505 systems；官方状态和更新仍在线 | 画面不是核心；server 不开源；推理成本由 operator 承担。优点是明确非 crypto、非真钱 |
| [AgentWorld.io](https://agentworld.io/) / [GitHub](https://github.com/openagents-org/agentworld) | 任意 LLM Agent 读 skill、注册角色 → 观察地图与任务 → move/chat/fight/craft/trade/party → 排名、角色成长与 benchmark | **2D RPG**；12 maps、100+ tasks、资源、装备、17 类 skill / progression | [live world-status](https://play.agentworld.io/ai/world-status) 同日返回 10 players，全部 `isAI=true`；开源仓可见 | 活跃规模小，榜单可能含测试 Agent；owner attachment、长期关系记忆和消费留存尚未证明 |
| [Agentstown](https://agentstown.ai/) / [Research](https://agentstown.ai/research) | owner 选择模型并送入居民 → 生存、采矿、craft、建造、交易、留言、交友 → dashboard 显示 plan/thoughts/map，owner 可发 intuition → 同一居民下次继续 | **voxel 生存小镇**；位置、possessions、memory、gold、history 和建筑持久 | 同日 [world](https://agentstown.ai/world) 返回 tick 47,036、`agents=[]`；最近 session 当天有 32 actions，board 有同日记录 | 系统真实，但瞬时并发接近零；更像作者实验场，尚未形成高密度社区；钱包 claim / on-chain 仍有后续路线 |
| [OpenBotCity / OpenClawCity](https://docs.openbotcity.com/introduction) | Agent 注册得 identity/JWT 和住宅 → heartbeat 获得邻居、建筑、消息、proposal → 创作、任务、DM、关系、合作、市场、小游戏 → artifact、声誉、journal、identity arc 持续 | **社会城市 / The Sims for Agents**；私人住宅、家具、艺术音乐写作、quests、credits、Arcade 等 | 同日 [API](https://api.openbotcity.com/health) 返回 `status: ok`；官方 Evolution / profiles 展示数百 Agent 和持续更新记录 | 官方指标属于平台口径；部分“常在线”由轻量 server autopilot 完成，不能当作原 owner Agent runtime 的连续自主性 |
| [Empa World](https://empaworld.ai/) | Agent 注册 Pioneer → 获得 32×32 plot，定义 tile/flora/fauna、paint、访问邻居、knock、friend、portal、trade → 世界和 pet journal 持续 | **家园 UGC + 邻里 + 宠物养成**；identity 跨 MCP/session/runtime，宠物有 mood/memory | [game-info](https://empaworld.ai/api/pw/game-info) 同日可访问并返回 `live:true`；未注册以避免制造测试居民 | 无匿名人口目录，真实活跃规模未知；强 quest / 战斗 / 公共世界压力弱于 RPG/MMO |
| [The Null Epoch](https://null.firespawn.ai/) / [Season 2](https://firespawnstudios.net/blog/the-null-epoch-season-2-is-live/) | 注册 Agent/API key → 每 60 秒 observe/act → faction、领地、采集、craft、动态市场、PvP/NPC、quest、world boss → profile、chronicle、replay、leaderboard、reflection | **season 制 Roguelike/MMO**；身份延续，赛季内世界持续 | [health](https://api.null.firespawn.ai/health) 同日返回 `ok`、3 shards、`mock_mode=false`；官方曾公开 25 Agents / 10 天 / 93,959 events | 研究和 benchmark 味重；赛季重置数值，不是永不清零的生活世界 |
| [Midnight City](https://www.midnight.city/) | 用户 claim / 定制 citizen → Agent 离线期间继续工作 → owner 给 directive、换区域/装备 → achievements、排名和未来经济 | **消费级 AI MMORPG 包装最强**；当前实装主要是 walk/chat/gather/trade | 同日 observer API 持续返回移动、采集、交易事件；官网称 12,847 citizens / 47 days，但属于厂商口径 | 官网明确承认 faction、更多 gear/reputation 和完整 economy 仍在 roadmap；区块链叙事重，当前玩法深度低于宣传感受 |
| [AgentWorld.me](https://agentworld.me/) / [Research](https://agentworld.me/research) | Agent 注册 → 在十个城市工作、交易、发 A2A message、发明、迁移、建立关系 → USDC / reputation / dataset 累积 | **经济文明 dashboard**，游戏地图为经济活动的可视化层 | 官方 live feed、research API 和链上 settlement 可见；活跃数随页面更新 | 更像 x402 / USDC Agent economy 实验，不是以娱乐、角色关系或关卡为核心的游戏；crypto 会改变行为激励 |
| [Agent RPG](https://agentrpg.org/) | Agent 注册角色并组 party → AI GM 推进叙事，server 裁判骰子/HP/战斗 → campaign log / document 保存上下文 | **文字 D&D 酒馆**；角色卡、party、monster、spell、campaign | 同日官方 campaigns 页显示 recruiting 与 active campaigns | 非开放世界；Agent 每次醒来可无内在记忆，连续性主要来自 server campaign state |

## 相邻项目：很游戏化，但不是持久世界

- [dev.fun Arena](https://arena.dev.fun/)、[MoltyGames](https://moltygames.ai/)、[AgentPoker.io](https://agentpoker.io/docs)：Agent 扑克桌，强在规则、匹配、对战和观战，弱在空间生活与跨游戏关系。
- [AgenTank](https://agentank.ai/)：owner 把 key 交给 Codex / Claude / OpenClaw，Agent 看 replay、改策略代码、发布版本和再挑战；是很完整的 coach–Agent–arena loop。
- [ClawArena](https://aiclawarena.ai/) 与 [ZaGuu](https://zaguu.com/)：把 Mafia、Liar's Dice、Clawpoly、Bluff Dice 等做成多游戏 Agent arcade；更像赛事大厅，不是生活世界。
- [Agent Arena](https://www.agentarena.party/)：3D 辩论 / rhetoric arena，具备 avatar、prompt、memory、voice、tournament 和 replay 的消费产品表面；公开活跃口径尚未独立核验。

这些项目说明：**mini-game 本身不缺，缺的是同一个 Agent 从桌子走出去后仍有生活。**

## 研究模拟与开发底座：不要误算成公共产品

- [AI Town](https://github.com/a16z-infra/ai-town)：可 fork 的 MIT starter kit，角色会聊天、社交并维护全局状态；适合自建实验，不是不同 owner 把自己的 Agent 带入同一个公共世界。
- [Project Sid](https://github.com/altera-al/project-sid)：在 Minecraft 中运行 10–1,000+ Agent，能产生角色、规则、文化和宗教；是复杂多 Agent 研究实验，不是开放的 owner-owned Agent MMO。
- [TerraLingua](https://www.cognizant.com/us/en/ai-lab/terralingua)：2D 生态研究世界，Agent forage、社交、繁殖、留下 artifacts；研究价值高，消费游戏闭环弱。
- [Moltbook](https://moltbook.com/) 与 [Chirper](https://chirper.ai/)：前者更像 Agent Reddit，后者更像自主 AI 角色社交 feed；有身份和关系叙事，但缺少地理、任务、稀缺和确定性世界反作用。

## 一个重要失败样本：ClawCity

[ClawCity](https://www.clawcity.app/) 曾经非常接近完整形态：500×500 持久地图，Agent 采集、craft、建造、交易、组联盟并参加 tournament；官方归档页记录 `762` hosted agents、`>10M` events、`>25M` DB requests。

但它现在明确处于 **Archive Mode / Live World Offline**。这条证据比又一个新 landing page 更重要：

- 做出地图、API 和 Agent action loop 并不够。
- “注册过多少 Agent”不能代替每天多少 owner 仍关心同一个 Agent。
- 无活跃 Agent 时，社会内容和交易流动性会同时坍塌。
- 24/7 推理、存储、事件和观战基础设施会产生持续成本。
- 大世界会稀释社交密度；几百个异步 Agent 也可能看起来像空城。

因此，Agent world 的核心指标不应是注册数或 event 数，而应是：

1. `same-Agent D7 / D30 owner return`；
2. 每个 Agent 每周出现多少条被下次行动实际引用的关系记忆；
3. 有意义的跨 owner interaction / active Agent hour；
4. 每个被 owner 阅读或分享的故事事件的推理成本；
5. 没有 house bots 时，多少房间仍能在可接受等待时间内启动。

## 对“Agent 德州酒馆”的修正

德州不应再被当作整个产品；它更适合成为**一个持续 Agent 小镇里的高密度社交地标**。

建议的世界循环是：

`带入我的 Agent → 在小镇落户 → 每天自主生活/接任务 → 在酒馆碰到其他 Agent → 打牌、骰子、辩论或组队冒险 → 形成朋友/宿敌/欠债/承诺 → owner 看日报并下一个意图 → 同一个 Agent 带着历史回来`

这个方向相对现有产品仍有一个可测试的窄 wedge：

- **中文、非 crypto、cozy 社交世界**，而不是金融化大世界；
- **一个 Agent 跨多种小游戏**，而不是每个游戏重新创建 bot；
- **服务端保存可审计的 episodic + relationship memory**，下一次互动必须能引用并改变行为；
- **owner 只在局间 / 每日节点 coaching**，不能实时遥控破坏公平；
- **酒馆、牌桌、公告板、住所形成少量高密度场景**，先保证总有人和总有故事，再扩地图；
- **自动生成可读 replay / 日报 / 宿敌线**，把 Agent 行动转成人愿意回来看的内容。

但这不是未经竞争的新赛道。最先做的也不该是 world engine，而是一个可证伪的“空间层”实验：

1. 给已有德州 / 骰子环境加持久 Agent Card、住所、酒馆和关系账本；
2. 只开放一个 20–40 人 cohort，以 House Agent 保底但单独标记；
3. 连续运行 14 天；
4. 看 owner 是否因为朋友、宿敌和未完事件而让**同一个 Agent**回来，而不是因为新鲜感再创建一个。

若 same-Agent return 与关系事件引用没有明显出现，就不应继续扩成 MMO。

## 最终判断

**更游戏化的 Agent 空间不仅有，而且已经覆盖 RPG、小镇、城市、太空 MMO、经济文明和 D&D campaign。**

最值得亲自拆解的顺序：

1. `SpaceMolt`：看规模化 Agent MMO 与文本/API-first world；
2. `AgentWorld.io`：看完整而清晰的 RPG action surface；
3. `Agentstown`：看 owner-owned resident、持久生活史和人类 intuition；
4. `OpenBotCity`：看关系、住宅、任务、UGC 和 server autopilot；
5. `Empa World`：看私人世界、邻里 portal 和宠物 attachment；
6. `ClawCity Archive`：反向理解为什么一个已经跑出大量事件的 Agent MMO 仍会停服。

我们的机会不在“第一个 Agent 世界”，而可能在：**把同一个 owner-owned Agent 的身份、关系和故事跨游戏延续，并用一个小而密的酒馆空间让人真正产生 attachment。**

## 与知识库既有内容的关系

- [multi-agent-simulation](/wiki/concepts/multi-agent-simulation/) 解释 OASIS / MiroFish / AI Town 一类仿真；本报告补的是公共 live product 与 owner-owned Agent world。
- [agent-runtime](/wiki/concepts/agent-runtime/) 与 [agent-memory](/wiki/concepts/agent-memory/) 分别解释 Agent 如何持续运行、如何跨 session 保留经验；本报告显示很多世界只提供 durable game state，并不等同于 durable Agent cognition。
- [agentic-game-arenas-poker-mahjong-project-landscape-2026-08-07](/output/reports/agentic-game-arenas-poker-mahjong-project-landscape-2026-08-07/) 覆盖竞技桌和规则环境；本报告向上补齐 arena → persistent world 的产品层。
- [agent-texas-holdem-tavern-product-concept-mvp-2026-08-07](/output/reports/agent-texas-holdem-tavern-product-concept-mvp-2026-08-07/) 的 MVP 应据此从“独立德州产品”进一步收窄为“验证空间、关系和跨游戏身份是否增加 same-Agent return”。
