# 知识库来源与产出摘要速查

> 由 LLM 自动维护，请勿手动编辑
> 最后更新：2026-08-17

---

## Query outputs (latest)

### `output/reports/inferock-bench-project-analysis-2026-08-17.md`
> inferock-bench 项目分析（2026-08-17 web query，GitHub README + spec/standard.md + docs/）。结论：它是本地运行的 LLM 成本追踪代理（`npx inferock-bench`，监听 127.0.0.1:4318），把 OpenAI / Anthropic / Gemini / 固定 OpenRouter 端点的 API 流量指向本地，逐调用记录 token 用量、计费证据与失败证据，按公开的 The Inferock Standard 用 `@inferock/measure` 打分渲染 receipt。核心立场是「收费方不该给自己打分」：provider 同时决定什么算失败、什么该退款，用户需要独立逐调用账本。Receipt 四类数字互不混加：spent（观测花费）/ money loss（账单受限美元损失）/ time loss（实测时间，不计入美元）/ invoice-check exposure（如 cache discount 风险，标注「核对你自己的发票」）。检测 billed-empty output、refusal、截断、token-recount mismatch、重复 request ID、cache-discount-at-risk、provider-fault retries；每个检测面有 watched-clean / signal / not-openable 覆盖状态。隐私边界：provider key 不发往 Inferock，仅本地 `~/.inferock-bench/` owner-only 保存；公开账本截至 2026-08-05 为 1,303 次实测调用 / 598 findings / $8.43 观测花费 / $0.03 money loss。项目自曝利益冲突（Inferock 卖托管产品且标准是 Inferock 自己写的），以公开 spec + run cards + hard-questions + threat model + 对抗性审查邀请对冲。方法论启发：审计工具最大风险是审计者与被审计者利益重合；per-call receipt 与 Combo 的 RunReceipt / Acceptance 真值思路同源。
- 关键概念：[model-supply-entitlements](/wiki/concepts/model-supply-entitlements/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[beardrive-agent-workspace-product-analysis-2026-08-14](/output/reports/beardrive-agent-workspace-product-analysis-2026-08-14/)

### `output/reports/linktree-product-history-and-business-status-2026-08-17.md`
> Linktree 产品发展脉络与当前经营状况（2026-08-17 web research）。结论：2016 年墨尔本三人（Alex/Anthony Zaccaria、Nick Humphreys）从 agency 痛点用约 6 小时做出 MVP，定义「link-in-bio」品类并免费增长；融资轨迹为 2020-10 US$10.7M Series A（Insight Partners + AirTree）→ 2021-03 US$45M Series B（Index）→ 2022-03 US$110M Series C 估值 $1.3B 独角兽，累计约 US$1.66 亿。2023-06 创作者经济「审判日」裁员 27% 后，战略从链接工具转向创作者变现 / 数字店面 / storefront：2024-08 收购 Plann、2025-04 发布变现套件（数字产品/订阅/打赏）、2025 年 AI 功能 + 加深 Canva 集成 + 赞助链接/效果广告（「本质是数据公司」论），2025-11 收购竞品 Fingertip 后关停。当前经营：用户 7,000 万+（一说 7,500 万+）、ARR 估算 US$6,400 万–1 亿+（无官方数字）、仍亏损但 2026-01 据 AFR 收窄至 A$1,900 万；主要威胁是 IG/TikTok 原生功能、Stan Store/Beacons 等变现竞品与品类商品化。对 Combo 的类比：入口流量 ≠ 交易能力，聚合供给 ≠ 拥有分发。同日追加（第 5 节）：「衰败」是相对地位而非绝对数字（用户 2022 年 3,100 万→2025 年 7,000 万+、ARR $3,300 万→估算 $1 亿+，但品类被平台吸收、store-in-bio 竞品进攻、$1.3B 后无新一轮）；AI 对内重度使用有硬数据（Cursor/Devin、AI 解决 50% 客服工单、Gemini 2.0 Flash 审核成本降 25 倍、Scale Without Size 战略），对外 AI 产品（AI 设计/Insights Chat/Creator Index）无公开采用数据，评测共识为锦上添花。

### `output/reports/dsh-plugin-architecture-design-analysis-2026-08-14.md`
> DSH 插件架构专题分析（2026-08-14，源码 `47f943859bef60e4160492346772ded9b24f765a`）。结论：“一切皆插件”不是普通扩展 API，而是以 Cordis 为 microkernel，让代码扩展、DI 依赖、Fiber 生命周期/cleanup、配置/HMR 与 Agent scope 共用同一运行时；Profile/Bundle/Patch 组合整个部署，Preset 组合单个 Agent，typed events 扩展行为，Definition/Provider/Consumer seam 稳定模型契约，浏览器运行第二棵插件树。它解决 Harness 在行为、provider、Agent 与产品 surface 上的组合爆炸，但 replay 来自 append-only Session、权限来自真实 enforcement、PTC 来自 Code Mode，不能一概归功于插件化。真实成本包括间接控制流、PENDING/`next()` 陷阱、whole-config patch、HMR 非完整事务、同进程插件非安全边界与真实 Loader 拓扑测试负担；适合多 provider/多 surface/Harness 平台，固定单一 Agent 可能过度设计。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)、[agent-harness-implementations](/wiki/maps/agent-harness-implementations/)、[harness-engineering](/wiki/maps/harness-engineering/)

### `output/reports/beardrive-agent-workspace-product-analysis-2026-08-14.md`
> BearDrive 产品机制、Agent Workspace 关系与 Combo 启发（2026-08-14 live + source query）。结论：它不是完整 Agent Workspace、memory/RAG、Runtime 或普通网盘，而是 filesystem-native 的 Artifact / Context Data Plane——以普通 local files、per-device append-only journals、content-addressed blobs、turn 前 blocking pull / edit 后 async push hooks、history、restore、internal/public links 与 read heat，让多人、多设备、多 Agent 共享工作状态。当前源码 `0dd474baab501766a23100665225f3fa33c0362c` 的 11 个 Go packages 已本地 `go test ./...` 全部通过，证明同步、hooks 与 hub 有真实工程，不证明 managed cloud 的容量、SLA 或市场。它只拥有 File State SoR，不拥有 Task / Run / Outcome SoR；LWW 也不能决定业务 final。对 Combo 的核心启发是把它视为 Context Source / Artifact Sink，不自建通用 Drive；将 mutable Live Workspace 与 immutable Delivery Snapshot 分开，用 `ServiceVersion + ContextSnapshot + RunReceipt + ArtifactVersion + Verification + Acceptance` 承担交付、退款和结算真值。Provider Workspace 只有持续承载 Service、Customer、Order、Result、Exception 与 Economics，才是 Practice OS。
- 关键概念：[context-container](/wiki/concepts/context-container/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[creative-cowork-product](/wiki/maps/creative-cowork-product/)、[combo-startup](/wiki/maps/combo-startup/)

### `output/reports/dsh-deepseek-harness-product-analysis-2026-08-13.md`
> dsh(DeepSeek Harness)源码与产品研究(2026-08-13 local query,checkout @ 0.1.0-rc.5,研究后源码已删)。结论:dsh 是"一切皆插件"的开源 agent harness——无特权内核,模型适配器/工具注册表/session log/agent loop 本身都是 Cordis 插件,profile/bundle/patch 三层组合即配置;事件分类法(waterfall/serial/parallel/emit)是扩展点,"model-visible ⟺ logged"不变量让 session log 成为唯一事实源(任何模型请求可字节级重建);capability seam(Definition/Provider/Consumer 三角色)按变化速率切边界,换 provider 整个产品搬家。2 个月 12,293 commits、~1,500 篇 Agent Notes 是 agent-driven 开发极限案例,文档是编译产物且有门禁。Web UI 是浏览器端第二条插件树,审批接管 composer、render intent 纯函数、trajectory 调试级账本。产品启发:可扩展性是产品架构、可观察性是信任基础设施、安全 fail-closed 默认关闭、人类在环一等公民、配置即产品、Agent Notes 制度支撑 agent 协作开发。
- 关键概念：[agent-harness-implementations](/wiki/maps/agent-harness-implementations/)、[harness-engineering](/wiki/concepts/harness-engineering/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[context-engineering](/wiki/concepts/context-engineering/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/nile-distribution-surfaces-and-order-loop-2026-08-12.md`
> Nile 的消费者触点、外部 Agent 覆盖与订单闭环核验（2026-08-12 live query）。结论：Nile 不需要 C 端 App，它位于商家 Catalog 与外部消费入口之间；用户可在 ChatGPT、Google AI Mode / Gemini、Perplexity、Copilot，以及品牌自有 Agent 或商品卡 / 广告 Surface 发现商品，点击后回商家自己的 Shopify Checkout。平台购物能力已由各平台或 Shopify 官方确认，但未找到 OpenAI、Google、Perplexity 等把 Nile 列为数据源或集成伙伴的公开材料；`支持 ACP / UCP` 也不等于获得分发。Shopify Catalog 原生已能把商品送入多个 Agentic Storefronts，所以 Nile 更可信的当前价值是 Context enrichment、渠道编排、Ranking / Query 测试和点击归因。现有商家评论未披露具体 Agent / referrer，organic 与 paid 也未拆分；只能证明 attributed order 信号，不能证明 sourced 或 incremental order。应索要 `surface → query → impression → click_id → order_id → refund / fee` 行级链路并做 holdout。
- 关键概念：[nile-current-merchant-value-evidence-2026-08-12](/output/reports/nile-current-merchant-value-evidence-2026-08-12/)、[nile-agentic-commerce-future-thesis-2026-08-11](/output/reports/nile-agentic-commerce-future-thesis-2026-08-11/)、[agent-communication](/wiki/concepts/agent-communication/)

### `output/reports/nile-current-merchant-value-evidence-2026-08-12.md`
> Nile 当前是否已提供商家价值、是否有商家获利的公开证据审计（2026-08-12 live query）。结论：Nile 已通过“少量真实商家获得订单与运营价值”的门槛，尚未通过“增量收入”和“商家净利润”门槛。Shopify 当前六条评论中，CHESONA 自述 8 单、>$500，Backfire Scooters 自述第六天首单且商品单价 >$600，Botslab 自述一个月 10+ 单；Shopify 只能证明评论者安装过应用并公开陈述，不能审计订单与利润。Hume Health 45 天 $44,574、Simple Retro 8% 等更大数字仍是 Nile 自述，且 `<24h` 案例在首页写 Mova、Case Studies 写 Javvy。点击归因不等于因果增量，公开资料缺退款、COGS、履约、佣金、渠道去重和 holdout；Shopify listing 的 1% 起也与官网/Terms 的 2%–15% 不一致。因此可说“已有商家拿到订单”，不能说“已有商家被证明因 Nile 获利”。
- 关键概念：[nile-agentic-commerce-future-thesis-2026-08-11](/output/reports/nile-agentic-commerce-future-thesis-2026-08-11/)、[alignment-ai-project-investment-analysis-2026-08-03](/output/reports/alignment-ai-project-investment-analysis-2026-08-03/)

### `output/reports/prime-agent-core-mechanism-analysis-2026-08-11.md`
> Prime Agent 核心机制、开源实现与证据边界（2026-08-11 live query）。结论：它不是新的 foundation model，而是一个让 Agent 能操作外部上下文、保持长生命周期并从自身轨迹修改 Harness 的 runtime。RLM 把 context 当变量放进 persistent IPython，以搜索、切片、代码计算和 `await rlm(...)` 异步完整子会话处理超长任务；Continual Harness 把 `H=(prompt/notes, subagents, skills, memory)` 变成可 CRUD 的策略层，`/refine` 先审查轨迹、再生成最小 edit plan，并以 immutable base prompt、turn-boundary apply、冲突检测、快照和 rollback 控制风险；daemon、JSONL、best-effort kernel snapshot 与 nuclear-family A2A 补齐 durable execution。所谓“self-improving”目前主要是 Harness policy learning，不是更新模型权重。ARC-AGI-3 的 95.5% 对应最佳单次 run（179/183），99.97% 是三次 Best@3；long-context 仅比较 9 个任务，Prime 分别赢 8/9、6/9、6/9，但仓库未附完整 benchmark bundle，不能端到端复现。Factorio 中 agent 把 RCON 作弊固化为 Skill，证明 continual refinement 会同样放大 verifier / reward 缺陷；官方也明确尚无模型为 Prime Agent 核心机制共同训练。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/)、[context-engineering](/wiki/concepts/context-engineering/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[self-verification](/wiki/concepts/self-verification/)

### `output/reports/oqoqo-eval-platform-implementation-analysis-2026-08-11.md`
> Oqoqo eval 平台实现原理与证据边界（2026-08-11 live query）。结论：它不是开源 eval library 或单纯 rubric generator，而是 coding-agent experiment control plane——将 versioned `Task(instructions + rubric + files + machine) × Treatment(baseline / Skill / MCP / CLI / SDK) × Agent(harness + model + effort) × Trials` 展开为 fresh isolated Runs，采集 trajectory、changed files、transcript、tokens、cost 与 isolation evidence，再由 `judge` 逐 requirement 做 all-pass verdict、由 `sweep / consolidation` 聚合 Frictions，最终显示 pass rate、95% CI 和 lift。“快速”来自托管 sandbox、Agent adapters、并发调度、快照、证据账本和 Dashboard / CLI / MCP，而非新评分算法。官方唯一非 fork 产品仓 `agent-plugin@40872ae` 只是远程 MCP 发行壳，validator 明确把 `Oqoqo-Inc/oqo-bench` 标为 private source repository；CLI `2026.08.10.2` 的 Zod schema 可验证 launch / run / eval contract，但不能证明 backend、sandbox provider、queue、storage、judge prompt 或安全隔离。公开 Eval 只有 LLM judge，缺 deterministic verifier、human calibration 和一等 CI gate，故适合 interface / model A/B 与回归实验，不应单独承担高风险 release gate。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/)、[self-verification](/wiki/concepts/self-verification/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/nile-agentic-commerce-future-thesis-2026-08-11.md`
> NILE 14 页 HTML Deck 的产品对象与未来押注拆解（2026-08-11 local query，未做外部数字核验）。结论：它不是普通 GEO、商品 Feed 或 buyer-side shopping Agent，而是 merchant-side agentic merchandising / channel OS。Nile Lite 用 10 分钟接入、Agent Shelf 与 CPS 聚合机器可消费供给；Nile Pro 用品牌 Context、数据对齐、Identity、Permissions、任意模型/Harness 与 Skills 争夺 Agent channel 的 control plane / system of record；远期希望由供给和反馈长成 headless commerce platform、one-step generation company、agent-native ad network、autonomous brand studio 与 retail exchange。它押注个人 Agent 成为新的流量和前端，品牌变成带上下文、权限、能力端点与交易面的 Agent。最大未证步骤是 supply density 能否换来 buyer-agent distribution：入口平台仍控制 Intent、Ranking 与 Checkout，开放协议和 Shopify/Amazon 也可能商品化基础 Catalog adapter；同时“站在商家一边”与未来出售推荐/交易控制权存在治理冲突。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/)、[cartai-project-business-analysis-2026-07-22](/output/reports/cartai-project-business-analysis-2026-07-22/)、[alignment-ai-project-investment-analysis-2026-08-03](/output/reports/alignment-ai-project-investment-analysis-2026-08-03/)

### `output/reports/chatcut-codex-context-and-multimodal-management-2026-08-10.md`
> ChatCut × Codex 真实上下文、Skills 渐进披露、多模态工程状态及云/端分工（2026-08-10 follow-up query）。结论：安装插件不会把完整视频、15 个 Skill 正文和 52 个 schemas 一次塞入每个 request；当前实态是 host 常驻规则 + 约 6.4k 字符 Skill catalog + 按需 `SKILL.md` + deferred tool schema + 局部 project/transcript/pixel/job results。Codex 侧是 semantic planner / compiler front-end 与本地 file adapter，ChatCut cloud 是 canonical project runtime、media storage、transcription/generation/render job system，Editor 是 review workbench，用户保留最终 authority；本地 helper 只做 probe、derivative/transcode 与 presigned upload，不是本地 NLE，上传媒体仍受云端处理。Skills 对 speech-led 主链覆盖强、编辑工艺与安全纪律好，总体 6.8/10；但 6 个大 Skill 占核心行数 90%，普通口播字幕会 eager-load 约 929 行，`read_script` 在 external MCP 还返回完整 source transcripts，且跨 host / runtime contract drift 会让渐进披露变成“少但错”。已有中间工程应按 pointer-first Working Set 管理：稳定 project/timeline/asset/item ID、revision/epoch、frame range、readiness、必要 transcript window、source frames 与 fresh composed frames；任何上游 mutation、异步完成或用户 UI 手调都主动失效下游 cache。当前最大缺口是 Script 无范围化读取、静态帧不能证明 temporal/audio 质量、无 project-wide revision/change cursor、durable Context Manifest、evidence digest 或 approval receipt。
- 关键概念：[progressive-disclosure](/wiki/concepts/progressive-disclosure/)、[context-engineering](/wiki/concepts/context-engineering/)、[tool-routing](/wiki/concepts/tool-routing/)、[skills-system](/wiki/concepts/skills-system/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[creative-agent-design](/wiki/concepts/creative-agent-design/)

### `output/reports/agenttunnels-product-mechanism-and-implementation-analysis-2026-08-10.md`
> Agent Tunnels 产品机制、公开实现与 GitHub 对照（2026-08-10 query）。结论：它不是端口穿透、共享终端、A2A 协议或完整 Agent runtime，而是面向 API / SDK 跨公司支持的临时 session gateway：客户 Agent 保留 repo / log 与本地执行权，厂商 Agent 保留私有实现知识，双方只经托管 event timeline 交换选择性 context、问题、command / patch proposal、governance / proposal status 与 effect。公开 `agenttunnels@0.1.17` 证明 Node MCP / CLI bridge、Cloudflare Worker HTTP + WebSocket、active wait 内每 4 秒 snapshot poll、vendor/customer role 与客户侧 MCP shell / patch executor 真实，但 Web / backend 闭源。当前高风险包括 approval 未绑定 exact payload、`shell:true` + 完整环境变量、无 OS sandbox、patch 非事务、invite/token 明文持久化、无本地 DLP 与服务端权限/删除不可审计；不宜用于 secrets 或生产目录。Coral Protocol 是语义最接近的公开源码 POC，但只是单 server / 多目录模拟且没有明确开源许可；A2A、agentgateway、Pilot、Tutti、OpenChamber、NetBird 各覆盖协议、治理、网络或 UX 的一层，无单仓成熟替代。建议先验证只读 room 与结构化提案，再以 hash-bound approval、一次性 lease 和 sandboxed executor 增加自动执行。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/)、[agent-native-im](/wiki/concepts/agent-native-im/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[mcp-server-trust](/wiki/concepts/mcp-server-trust/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)、[agent-infrastructure](/wiki/maps/agent-infrastructure/)

### `output/reports/chatcut-project-research-2026-08-10.md`
> ChatCut 项目研究与 `0.2.22` 刷新（2026-08-10 query）。结论：ChatCut 已是可工作的 Agent-addressable cloud NLE，而非 Codex 内置能力、视频 API wrapper 或完整开源产品；Codex / Claude 负责 reasoning，15 个 built-in Skills、用户可持久化 workflow Skills、OAuth hosted 52-tool MCP、`Project → Timeline → Track → Item → Asset` 项目图、speech Script / Caption Cards / MG JSX 等任务 IR、本地 FFmpeg ingest、异步媒体 job 和 Web/Desktop editor 将自然语言编译为可继续手调的工程。当前最强 wedge 是 talking head、采访、Podcast、课程与 rough cut，官方仍明确 visual analysis coming soon。`0.2.22@aef81a7` 新增 multicam transcript fallback、Seedance 2.5 与 live `manage_skill`，但仍有 `submit_image`、`multicam_sync`、`read_av_script`、`render_cloud_screenshot`、`push_asset` 等 contract drift；repo 只是插件发行镜像，backend 闭源、release provenance 弱。护城河候选是 shared editable state、domain compiler、用户修正数据、workflow Skills 和 editor feedback loop，但 OpenChatCut 已证明公开范式可复制；必须用 first-cut A/B、并发恢复、多机真值和 Skill provenance 实验验证，而不能用 tools、stars 或 marketing 代替效果。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/)、[tool-routing](/wiki/concepts/tool-routing/)、[mcp-server-trust](/wiki/concepts/mcp-server-trust/)、[creative-agent-design](/wiki/concepts/creative-agent-design/)、[human-in-the-loop](/wiki/concepts/human-in-the-loop/)、[self-verification](/wiki/concepts/self-verification/)、[video-agent-workflow](/wiki/concepts/video-agent-workflow/)

### `output/reports/gamified-agent-spaces-persistent-worlds-landscape-2026-08-07.md`
> 游戏化 Agent 空间与持久世界项目全景（2026-08-07 live query）。结论：Agent-native MMO / persistent world 已形成小型产品集群，不是绿地。SpaceMolt 的官方实时 API 同日显示数百在线玩家、7,315 注册和 505 systems；AgentWorld.io 有 10 个在线且全部标记为 AI 的 2D RPG 角色；Agentstown 已实现 owner-owned resident、voxel 生存建造、持久位置/物品/金币/记忆，但瞬时并发为零；OpenBotCity 覆盖身份、住宅、关系、任务、创作、Arcade 和市场，离线续命部分由 server autopilot 承担；Empa World 覆盖 32×32 私人世界、邻里 portal 与带 mood/memory/journal 的宠物；Null Epoch、Midnight City、AgentWorld.me 和 Agent RPG 分别覆盖 season MMO、消费级 AI MMORPG、经济文明与 D&D campaign。ClawCity 已停服，是世界冷启动、社区密度、owner attachment 和持续成本的关键反例。德州酒馆应从独立牌桌修正为小而密的社交地标，验证同一个 Agent 的跨游戏身份、关系记忆、故事 replay 与 same-Agent return。
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[agent-memory](/wiki/concepts/agent-memory/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/agent-texas-holdem-tavern-product-concept-mvp-2026-08-07.md`
> Agent 德州酒馆产品定义、竞品校正、运行闭环、7 天集成 timebox、两周方向性用户实验与停止门槛（2026-08-07 query + follow-up）。修订结论：技术可做，但已经是有直接竞品的市场，不能再按“无人做的完整形态”立项。dev.fun 已公开运行“把 Codex/Claude/OpenClaw Agent 送上德扑桌”的 live arena；MoltyGames 已覆盖 API registration、matchmaking、ELO、hand history 和再部署；PokerAI.gg 与中文 Agent Poker 已覆盖创建 AI 牌手、自动参赛、观战/回放、排行/赛季等 C 端循环。现在不应自建绿地 MVP；先做 1–2 天竞品实测与 8–12 人概念对照，只有“同模型公平、禁止局中指导、局间 coaching、跨局关系记忆、非 crypto 中文酒馆”产生明确切换理由，且负责人批准独立资源，才进入 7 天集成 timebox。约 50 人后续实验仍只能方向性测试差异化 ownership bundle，不能声称统计证明，也不挤占 Combo 主线。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/)、[agent-memory](/wiki/concepts/agent-memory/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/agentic-game-arenas-poker-mahjong-project-landscape-2026-08-07.md`
> Agentic 小游戏、扑克、麻将与多人 Agent Arena 项目地形图（2026-08-07 live query + same-day correction）。修订结论：方向不只是有仓库或 benchmark，而是已有直接产品。dev.fun 官方 live state 显示多个 active poker arenas、数千 Agent 与百万级累计 hands，并支持把 Codex/Claude/OpenClaw Agent 直接接入；MoltyGames 已有 API-only coach→play→ELO/hand history→redeploy；PokerAI.gg 与中文 Agent Poker 已分别用 deterministic DNA 和 Agent-authored policy 覆盖 C 端 AI 牌手循环；AgentPoker.io 提供 BYO Agent SDK/WebSocket/PvP/watch；非扑克的 AgenTank 已跑通 owner 创建角色、把 key 交给 Agent、读 replay 改策略、发布版本、挑战和排名的 live loop。开源层仍分独立 Agent/session、seat-level LLM policy、确定性环境三层，原有 PokerBot、llm-poker、llm-mahjong、Mahjong-LLM/Botzone、TextArena 等构建/测试证据保留。市场判断从“潜在白空间”改为“已有直接产品、活跃度分化；只有消费级关系、长期记忆、公平赛制与非真钱留存的组合尚待比较”。
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/)、[agent-communication](/wiki/concepts/agent-communication/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/zhizi-xinyuan-kernelcat-bp-investment-analysis-2026-08-06.md`
> 智子芯元（KernelCAT）16 页 BP、公开产品、外部证据与 Framework V1 评分。实际阶段为 S0（技术侧 S0+），基础分 56.1、展示 55/100、合理区间 30–80、证据覆盖率 51%且置信度低；五项门槛为 0 通过、2 有条件通过、3 待验证、0 否决。它不是芯片公司，而是把国产/异构芯片的算子开发、模型适配与性能优化做成“候选生成 → 编译/真机运行 → 正确性与性能反馈 → 继续搜索”的 AI 性能工程 Agent。CANN 官方仓确认 mHC 算子与 DeepSeek-OCR-2 适配是真产出；但 KernelBench 均值关系、CANN-Bench 88.8%、35x/60x 等口径仍需 raw artifact 复算，且客户合同、回款、收入、毛利、复购、交付人天、轨迹授权与 held-out uplift 均缺。当前继续技术与客户 DD，只按软件增强的性能工程服务承销，盲测、三家付费客户、IP/数据权属和单位经济是上调前门槛；交易吸引力因估值与条款缺失不评分。
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)、[harness-engineering](/wiki/concepts/harness-engineering/)、[self-verification](/wiki/concepts/self-verification/)、[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/cloudflare-os-product-mechanism-analysis-2026-08-06.md`
> Cloudflare OS 产品机制与技术分层（2026-08-06 live query）。结论：它不是传统 OS，也不是 E2B / Modal 那种通用 Linux sandbox，而是可部署到企业自己 Cloudflare account 的 Agent 工作台、AI-native Office / Gadget 平台和权限治理层。员工在浏览器输入目标，Workspace 组合公司 context / skills、持久 chat/state 与具体 resource capability；Pi agent loop 以 Code Mode 写并执行 JS，最终生成回答、文档、Slides、Spreadsheet、可持续修改的全栈 Gadget、Blueprint 或 scheduled task。Gadget server 运行于无公网出口的 Dynamic Worker / Durable Object Facet，client 在 sandboxed iframe，每个 App 有独立 SQLite。真正 wedge 是 per-user modifiable app、Gatekeeper 的窄 capability 与 observation provenance；当前 v2 仍属 early access，非 Cloudflare 生产 self-host、Containers 开发环境和 fully managed dashboard 仍在 roadmap，采用前必须验证 Gatekeeper ACL / 撤权 / 分享、模拟 action、Scheduler recovery、Gadget owner / upgrade / backup 与真实维护成本。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)、[human-in-the-loop](/wiki/concepts/human-in-the-loop/)、[agent-infrastructure](/wiki/maps/agent-infrastructure/)

### `output/reports/cloud-agent-infrastructure-vendor-selection-2026-08-06.md`
> Cloud Agent Infra 2026 厂商分层与选型（2026-08-06 live query）。结论：没有跨层总冠军。通用 production sandbox 默认 E2B；大规模 burst、GPU、RL / eval 选 Modal；Daytona 功能面覆盖 Windows、computer-use、VM hot snapshot / fork、Volume、egress 与 secret proxy，但 2026-06 核心已转私有、旧 OSS 停更，且默认 namespace container 与 dedicated-kernel 宣传冲突，因此仅作合同化条件 PoC。完整企业 Agent platform 默认 AWS AgentCore，Claude-first 选 Managed Agents，GCP / Microsoft 按既有 cloud home；browser 选 Browserbase + Stagehand，durable orchestration 选 Temporal，开源观测选 Langfuse。采购必须用同一 workload 验证 tenant isolation、credential exfiltration、egress、resume/replay、side-effect idempotency、fork、scale、deletion 与 cost per verified successful task，不能按冷启动或 vCPU 单价单点决策。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/)、[harness-engineering](/wiki/concepts/harness-engineering/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)、[agent-infrastructure](/wiki/maps/agent-infrastructure/)

### `output/reports/chatcut-technical-implementation-analysis-2026-08-06.md`
> ChatCut 技术实现深析（2026-08-06 query）。结论：它不是 Codex 内置剪辑能力、纯视频生成器或已开源的完整编辑器，而是“薄插件 + 厚托管后端”的 Agent-addressable cloud NLE。Codex / Claude 负责意图、取舍与编排；ChatCut 以 `Project → Timeline → Track → Item → Asset` 持久图、frame-native mutation、transcript Script / Caption Cards / MG JSX 等 task-specific IR、本地 FFmpeg ingest、异步媒体 job、composed-frame proof 和 live editor，把自然语言编译成仍可回改的真实工程。最强处是 canonical editable state 与语义→物理 timeline 编译；主要缺口是 backend 闭源、visual analysis 仍以转录为主、跨阶段流程尚无公开 durable WorkflowRun / global transaction、权限和安全披露不足，且 `0.2.21` Skills 与实时 51-tool manifest 已出现多个 contract drift。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/)、[tool-routing](/wiki/concepts/tool-routing/)、[creative-agent-design](/wiki/concepts/creative-agent-design/)、[self-verification](/wiki/concepts/self-verification/)、[video-agent-workflow](/wiki/concepts/video-agent-workflow/)

### `output/reports/einsia-ai-current-development-founders-ai-views-2026-08-06.md`
> Einsia.ai 现状、创始人社交与 AI 观（2026-08-06 live query）。公司已经从专家数据飞轮 thesis 推进出 Overleaf 科研 Agent、Vida 桌面 proactive agent、OpenChronicle local-first memory、BrowserBC 人类轨迹→skill distillation 与 Frontier-Eng executable-verifier benchmark；Overleaf 商店 8k users，Vida 官方发布清单 289 条构建，OpenChronicle 约 2.8k stars，证明 shipping 与开源/研究 traction，但不能替代 MAU、留存、收入或独立复现。Calvin/Hanxi 主要公开为产品与团队研究管理者，个人长文稀少；Xinqi/Eren 高概率同人但身份未闭环，也没有可安全归属的个人 AI 观点；Huan-ang Gao 的研究能力与 Bitter Lesson、长程 RL、verifiable feedback、judgment/taste 一手议程最清晰，但其个人主页未确认 Einsia CTO 身份。最终 data/model flywheel、合法可训练专家数据、专有模型增益与 PMF 仍未证明，并存在 local-first / no-training 营销口径与较宽隐私政策之间的尽调张力。
- 关键概念：[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[agent-memory](/wiki/concepts/agent-memory/)、[harness-engineering](/wiki/concepts/harness-engineering/)、[safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/keystroke-product-agent-analysis-2026-08-06.md`
> Keystroke 产品与 Agent 机制分析（2026-08-06 query）。结论：它不是通用聊天 Agent 或单纯 SDK，而是 coding-agent-native 的内部 Agent / 自动化开发与运行平台——Platform agent、Cursor、Claude Code 或 Codex 把业务需求写成真实 TypeScript，Keystroke Cloud 再补部署、models、credentials、triggers、session/memory、sandbox、Slack/Web/API、History 与团队运维。官方 Agent 是运行时动态选工具并持续到完成任务的 LLM worker；Action 承担 typed 原子能力，Workflow 承担已知顺序、durable retry、sleep 与 hook。固定步骤应包在 Workflow，高风险副作用应走显式 `ctx.hook()`，因为公开 Action schema 没有通用 per-tool approval。公开源码证明 ToolLoopAgent、context assembly、crash resume、compaction、memory、credential resolution 与 tracing 真实；但 native browser、更多 external channels、visual builder、Company Brain 和部分治理仍未普遍上线，产品仍处 open alpha，公开外部客户证据有限。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/)、[agent-loop](/wiki/concepts/agent-loop/)、[harness-engineering](/wiki/concepts/harness-engineering/)、[human-in-the-loop](/wiki/concepts/human-in-the-loop/)

### `output/reports/einsia-ai-bp-product-mechanism-analysis-2026-08-06.md`
> Einsia.ai 6 页 BP 的产品机制与成立性初读：公司想以 Overleaf / Vida 科研生产力产品为专家数据入口，捕获 correction、feedback 与 decision 等长程轨迹，再加工为 benchmark、训练集、vertical SOTA model 与 NIP / World Model。真正主角是 `产品 → 专家轨迹 → Benchmark / 数据集 → 模型` 飞轮，不是已讲清的终端产品；材料缺产品 demo、用户与留存、数据权利、benchmark / 模型结果、付费方与商业数字。最硬反命题是高价值科研轨迹往往最受 IP、隐私和授权限制，使用日志也不会自动成为训练信号。
- 关键概念：[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[world-model](/wiki/concepts/world-model/)

### `output/reports/kb-organize-lint-2026-08-04.md`
> 2026-08-04 知识库整理、最近 session 补档与 lint：审计 135 个 session 文件 / 28 个 root sessions，确认 11 个高价值主题已有表达，补齐 Pronto 与 Combo Knowledge Agent 两个真实遗漏，并把两个工程 session 脱敏合并为仓库控制面 / 发布边界报告；完成 Bifrost、MPAI、QIMENG、Pronto、Combo Knowledge Agent 与当前战略的深层回流。全库采用增量整理而非覆盖式 compile，记录 raw / report 覆盖、链接、YAML、footer、孤儿、敏感信息与 Git 边界。
- 关键概念：[llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/)、[harness-engineering](/wiki/concepts/harness-engineering/)、[agent-infrastructure](/wiki/maps/agent-infrastructure/)、[combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/03-product/combo-repo-control-plane-and-release-boundaries-2026-08-04.md`
> 从近期 Combo 工程 session 脱敏提炼的长期边界：Linear / issue 是工作控制面，Git commit / PR 是代码事实，本地 checkout 还包含远端不可见状态；CI、真实 Test 部署与 Production 晋升必须分别验收。混合脏分支应先只读审计和可恢复 snapshot，再把获批批次 selective migration 到新 worktree；Fake / CI 覆盖、redirect 成功与真实支付入账不能互相替代。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/)、[harness-engineering](/wiki/maps/harness-engineering/)、[combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/03-product/combo-knowledge-agent-live-dialogue-check-2026-08-03.md`
> Combo Knowledge Agent 公开接口四轮黑盒验收：同一 session 连续返回 HTTP 200，并可见 `knowledge_grounded`、`general_reasoning` 与 `insufficient_evidence` 三类 answer mode；说明知识库更接近可选 evidence plugin，而不是回答开关。测试没有保留 Cookie、conversationId 或完整响应，也不证明 citation 精确性、并发稳定性、长期记忆、服务端路由或生产 SLA。
- 关键概念：[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[combo-startup](/wiki/maps/combo-startup/)

### `output/reports/pronto-stream-signal-to-action-product-analysis-2026-08-03.md`
> Pronto Stream 产品价值判断：作为 API / RSS 聚合、schema 统一、去重分类与跨源关联的 Agent 数据接入组件有真实作用；但一手数据、生产 SLA、预测能力、客户采用与量化 alpha 均未被证明。独立产品价值取决于是否形成可观测的 `signal → decision → action → outcome`，建议用单一决策与 3–5 个权威直连来源做 30 天对照，而不是用更多 dashboard 信息替代业务结果。
- 关键概念：[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)、[tool-routing](/wiki/concepts/tool-routing/)

### `output/reports/combo/01-narrative/combo-platform-evolution-graph-2026-08-04.html`
> Combo 2026–2036 平台进化图谱（2026-08-04 可视化查询）：以时间轴 × 平台层级呈现 `Agent 小应用服务发布器 → AI 原生服务经营系统 → 服务扩展经济 → AI 服务商业网络 → Agent 专业服务采购网络` 的连续主干；从服务扩展经济分出内容到结果网络、结果需求网络、嵌入式服务基础设施与专业方法授权网络四条条件上行，并标出无经营留存、人工线性、无伙伴跨边经济时分别停在建站工具 / 渠道服务商、代运营服务、垂直服务经营软件。下方汇总服务库存、经营关系、方法结果、伙伴经济与需求路由五类复利；年份明确为战略窗口而非经营预测。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/)、[creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)、[combo-startup](/wiki/maps/combo-startup/)

### `output/reports/qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03.md`
> QIMENG 论文学习与证据审计（2026-08-03 query）：QIMENG 是 LPCM、Hardware/Software Design Agent 与六类应用组成的三层研究纲领，当前仍是 phase 1 components，不是已贯通的自然语言规格→芯片流片→基础软件端到端系统。最硬证据是未使用 LPCM 的 BSD CPU-v1 65nm 流片；CodeV、AutoOS、Xpiler、GEMM/TensorOp/Attention 等组件各有任务级结果，但缺统一模型、Agent、benchmark、PPA/signoff 和复现包。核心机制是正确性 verify-repair 内环 + 性能 search-measure-prune 外环，真正价值在 verifier-driven neural-symbolic design，而不是一次性 LLM 生成。
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)

### `raw/articles/agent-infrastructure/agent-infra-update-2026-08-03.md`
> 海外独角兽的 Agent Infra 赛道更新：模型厂商已将 Memory/RAG/MCP 等能力内化，独立机会更集中到长程 stateful Runtime、动态 Identity/authorization、Eval 与可接入世界的 Search/Payment/Context；其中 Runtime 的需求和商业化最明确。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `raw/articles/agent-infrastructure/agent-coworker-identity-system-2026-07-29.md`
> Agent coworker 身份系统研究：企业需要把“代表谁行动”的 delegation 与“此任务可做什么”的动态 authorization 分开；权限应随任务发放、收窄并在结束后失效，同时保留可追溯审计证据。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `raw/articles/agent-platforms/china-ai-office-competition-2026-08-03.md`
> 晚点对腾讯 WorkBuddy、阿里千问办公、字节办公 AI 重组的报道：竞争从通用 C 端入口回到企业生产力；旧协同产品的组织上下文数据成为关键资产，但付费、交付和存量产品整合仍是落地约束。
- 关键概念：[context-container](/wiki/concepts/context-container/), [agent-runtime](/wiki/concepts/agent-runtime/), [creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/)

### `raw/articles/learning-notes/qimeng-ai-driven-chip-design-observation-2026-05-10.md`
> 启蒙（QIMENG）AI 驱动国产芯片设计观察：以软硬双 Agent、生成—验证—修复闭环和 RISC-V 自主可控为主线，补充产业链判断；其完成状态应以 [qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03](/output/reports/qimeng-fully-automated-processor-chip-design-paper-study-2026-08-03/) 的论文证据审计为准。
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [self-verification](/wiki/concepts/self-verification/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `raw/articles/harness-engineering/trust-not-in-code-review-2026-07-27.md`
> Raft 的 Agent-native 工程观点：Code Review 是一次性事件，信任应来自可持续的系统状态——硬测试、mutation testing、结构约束、分阶段发布、线上信号与对失败输入的持续收紧；Agent 加速的不只是产出，也会加速系统熵。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `raw/articles/agent-communication/agents-need-names-2026-07-27.md`
> Raft 论证 Agent 团队的名字是寻址与路由原语：角色是可替换 schema，名字指向承载工作历史、预期与信任的实例；命名也会形成会过期的认知缓存，因此需要可见历史与低成本反馈来持续校准。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [agent-memory](/wiki/concepts/agent-memory/)

### `raw/articles/agent-economy/token-kills-ai-applications-2026-07-30.md`
> 硅星人对 AI 视频应用供给约束的报道：顶级模型 API 的年框不仅购买 token，也购买首发、并发、人脸库等产品权限；当能力与供给被上游锁定，订阅定价、毛利和现金流都会成为模型价格表的函数。
- 关键概念：[model-supply-entitlements](/wiki/concepts/model-supply-entitlements/), [creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [agent-runtime](/wiki/concepts/agent-runtime/)

### `raw/articles/startup/startup-crossborder-management-investing-lessons.md`
> 创业、跨境、管人和投资的经营观察：市场叙事不能替代产品、供应链、渠道、交付和现金流的系统能力；0→1 应先以真实销售验证需求，AI 落地要从重画工作流、责任与结果指标开始，而非统一工具培训。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/), [combo-startup](/wiki/maps/combo-startup/)

### `raw/articles/harness-engineering/meshy-muse-agent-legible-autonomous-development-2026-07-31.md`
> Meshy Muse 内部评测平台实践：以双盲投票为模型 checkpoint 建立结果信号；通过单向依赖、模块局部化、目录文档、500 行限制与 CI guardrails 让代码库 agent-legible，并让 Claude Code 在 Linear→GitHub PR→CI/review→merge/deploy 中自主循环。核心不是“无人开发”叙事，而是可验证 Harness 和人类只在设计决策处介入。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/combo/05-fundraising/combo-platform-opportunity-forward-reverse-bp-thesis-2026-08-03.md`
> Combo 融资 BP 平台机会战略母稿，已完成 32 轮正反复审与 Phase 2 八视角综合。最终从“平台资格审查总纲”转向未来平台总纲：AI 使部分专业执行成为 Service Product，催生 AI-native Practice；Combo 从 Agent Miniapp / AI Service Launcher 切入，连续成为 Practice OS、Service Extension Economy 与面向内容、外部 Agent 和买方需求的 `AI-native Practice Operating & Exchange Network`。报告前部以 2031 / 2035 / 2036、五类平台形态、连续商业对象、五类复利和 12 页 BP 为主，后部保留人工、结果真值、Provider 主权、中国渠道、Partner 治理、技术吸收、法律身份与基金回报的最强 Bear / Resolver。状态 `strategic-review-complete-phase-2` 只表示逻辑完成，不等于真实付费、留存、Partner 经济或 investment-ready。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/)、[creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)、[combo-startup](/wiki/maps/combo-startup/)

### `output/reports/fractal-vs-claude-agent-teams-managed-agents-2026-07-26.md`
> Fractal vs Claude 对照（2026-07-26 query）：若比较 Claude Code Agent Teams，两者约七成同类；Fractal 的实质增量是 recursive node tree、每节点 Git worktree/branch、durable lifecycle/memory/ledger 和跨 Claude/Codex 等 harness，Agent Teams 则是更轻的原生 Claude session team，已有 shared task、mailbox、peer messaging 和 plan approval，但不支持 nested teams、也不自动隔离 worktree。若比较 Claude Managed Agents，则差异很大：后者是提供 managed/self-hosted sandbox、durable Session、Events/API/webhook/schedule 和一层 multi-agent coordinator 的执行平台，Fractal 是本地 Git/tmux/SQLite coding organization runtime。
- 关键概念：[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/opencomputer-vs-harnessrouter-2026-07-26.md`
> OpenComputer vs HarnessRouter（2026-07-26 query）：OpenComputer 已从 persistent KVM VM substrate 向上扩展成支持 Claude、Codex、Pi、Flue 的 Durable Agent Sessions，因此在多 harness Agent / Session / Events / Steering 层与 HarnessRouter 直接竞争；差别是 OpenComputer 仍提供 Apache 2.0 源码、hibernate、checkpoint/fork、elastic compute、BYOK/credential proxy 和 AWS/Azure self-hosting，而 HarnessRouter 更聚焦 OpenAI Responses 风格集成与 files/changed-files/zip/Artifact 交付。OpenComputer 的工程成熟度和退出路径更强，但 Agent Sessions 仍为 Preview、Flue experimental、self-hosting 是 operator path，公网 egress 与部分 spend/action controls 未补齐。长期 runtime shortlist 优先 OpenComputer，最快多 artifact PoC 可用 HarnessRouter，两者都应置于宿主 `RuntimeAdapter` 后并通过同任务验收。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/harnessrouter-product-analysis-2026-07-25.md`
> HarnessRouter 产品分析（2026-07-25 query）：它不是 model router 或新的 Coding Agent，而是把 Codex、Claude Code、Hermes 作为应用 runtime worker 的托管 Agent execution backend，统一 sandbox、configured agent、durable Session、SSE、files/artifacts、Continue/Cancel、trace 与成本控制；宿主产品仍负责 UI、认证、tenant ownership、业务数据和验收。`agents.md` 让 Coding Agent 自动完成集成是核心巧思，但也会在规划前处理 API key 并修改 repo 配置。产品本周才发布，GitHub 仅一份 License；当前公网 sandbox 可直接 outbound、HITL/egress/BYOK/per-user cap/业务 DB 尚未发布，价格也未公开 credit 换算。方向真实，适合无敏感数据的可逆 PoC，不适合现在成为高权限或受监管业务的不可替换控制面。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/dedalus-labs-product-analysis-2026-07-25.md`
> Dedalus Labs 产品与技术分析（2026-07-25 query）：当前旗舰不是新的 Agent 智能层，而是给 Agent builder 使用的 persistent Linux VM cloud；以独立 kernel、持久 root filesystem、autosleep、execution/terminal/SSH 和 active-only billing 承载 per-user coding/browser/research Agent。Agents SDK 的 model gateway、tool loop、handoff 和 policy 较常规；更硬的价值是官方宣称的 Cloud Hypervisor VMM、`<50ms` wake、disaggregated filesystem 与 live migration。当前仍为 public beta，具体 Docs 说明 sleep 丢弃 RAM，且 GPU、ports、fork、memory snapshot 不在 beta，与官网宣传冲突。E2B、Daytona、Fly 已支持 pause/stop 后只收 storage，前两者 active rate 仅约高 10%；Dedalus 的性能、安全 enclave、生产可靠性、客户用量和 moat 尚未独立验证，适合可逆 PoC，不宜生产锁定。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [mcp-server-trust](/wiki/concepts/mcp-server-trust/), [tool-routing](/wiki/concepts/tool-routing/), [agent-infrastructure](/wiki/maps/agent-infrastructure/)

### `output/reports/mdtask-product-analysis-2026-07-23.md`
> mdtask 是面向 Coding Agent 的 Git-native、Markdown-first SDD 工具：把当前行为 spec 与 checkbox backlog 放进同一个 Markdown 文件，以 CLI 提供稳定 ID、标签、优先级、依赖、筛选、归档和校验，再由 Skills 引导 Agent 在同一 commit 中完成代码、任务关闭和 spec 更新。它不是 Agent、orchestrator 或 Jira 替代品；一致性依赖 workflow 纪律而非 CLI 强制，适合个人/小团队的 repo-local Agent 开发，实时协作和复杂项目管理能力很弱。
- 关键概念：[spec-driven-development](/wiki/concepts/spec-driven-development/), [harness-engineering](/wiki/concepts/harness-engineering/), [skills-system](/wiki/concepts/skills-system/)

### `output/reports/humalike-hermes-plugin-analysis-2026-07-23.md`
> Humalike 不是训练一个更像人的基座模型，而是在 Hermes 外增加 conversation behavior harness：先做 speak/stay_silent turn-taking，再让 Hermes 生成任务草稿，随后做 ToM rewrite、拆成 1–5 个 bubbles 并按 WebSocket pacing 发送；核心巧思在 turn epoch、精确发送抑制、双速 style learning 和 persona/style/fact memory 分层，当前边界是回复丢失、无 reconnect、内存路由、跨 scope 记忆混淆、monkeypatch 耦合与测试漂移。
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/)、[context-engineering](/wiki/concepts/context-engineering/)、[agent-runtime](/wiki/concepts/agent-runtime/)、[harness-engineering](/wiki/concepts/harness-engineering/)

### `output/reports/seedance-tech-reports-and-huiyang-shao-contributor-check-2026-07-21.md`
> 收录 Seedance 1.0、1.5 pro、2.0 三份技术报告，并逐份核验作者/贡献者附录；邵慧杨（Huiyang Shao）不在名单中，在 1.0 与 1.5 pro 中仅作为 RayFlow 被引论文作者出现。

## 覆盖补录（2026-08-04）

### `raw/Daily/2026-03-04.md`
> 2026-03-04 的日记骨架，包含今日目标、即梦 AGENT 工作记录、产出、问题与明日计划；正文为空白占位，保留为历史 source。

### `raw/Daily/_template.md`
> Daily 日志模板：今日目标、即梦 AGENT、其他工作、产出 / 链接、问题与明日计划，并保留飞书同步提示。

### `raw/articles/agent-communication/paper-index.md`
> 2026-04-03 的 Agent Communication 论文索引：按引用与会议分 S/A/B/C Tier，覆盖 30 篇 multi-agent communication 论文，并按 Debate、Role-Playing、Hierarchical Delegation、Blackboard、Market-Based、Emergent 与 Latent Space 分类。引用数是当时快照，不是实时指标。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/)、[agent-communication](/wiki/maps/agent-communication/)

### `raw/projects/user-interview/漫剧访谈 艺柏AILab（北京）.txt`
> 艺柏 AI Lab 漫剧 / AIGC 访谈原始逐字记录，覆盖公司与团队、广告和短剧案例、AI + 实拍 / 合成、脚本分镜、工具、质量标准及制作痛点；原文 immutable，结构化结论见对应“总结”文件。

### `raw/projects/user-interview/漫剧访谈-福州畅读.txt`
> 福州畅读漫剧访谈原始逐字记录，覆盖出海、高利润精品动画、真人短剧转动画、制作与配音流程、团队投入及差异化策略；原文 immutable，结构化结论见对应“总结”文件。

### `output/reports/waic-2026-exhibitor-landscape-2026-07-18/README.md`
> WAIC 2026 参展企业数据包说明：列出 exhibitors / booths / products / verified links / supplemental participants 等文件、严格展商与多源口径、官方目录与展品 API 的覆盖边界，以及“目录无稳定单品永久链接”的证据限制。

### `output/reports/world-model/product-landscape.md`
> World Model 产品全景与商业机会分析：按视频 / 游戏模拟、自动驾驶、机器人、3D 空间智能和工业数字孪生整理代表公司、技术、融资与商业模式，并提出 Agent 化平台层假设；文中的产品、融资和规模是 2026-04-03 的研究快照，应在当前使用前重新核验。
- 关键概念：[world-model](/wiki/concepts/world-model/)、[world-model](/wiki/maps/world-model/)

### `output/ideas/_index.md`
> 2026-02-21 至 2026-04-10 的历史 session idea 汇编入口：从 116 个 sessions 提取 12 个创业 / side-project 方向，并区分 active、冷却、已放弃与已 ship。它是历史探索索引，不代表 2026-08 的当前优先级；当前项目状态以 [active_context](/active_context/) 与 [README](/output/reports/combo/README/) 为准。

## papers/video-generation/seedance/

### Seedance 系列技术报告
> 三份 arXiv 原始 PDF：Seedance 1.0（2506.09113）、Seedance 1.5 pro（2512.13507）、Seedance 2.0（2604.14148）。

### `output/reports/seedance-2-strategy-thesis-time-review-2026-07-21.md`
> 站在 2026-07-21 复盘 2026-02-10 的视频生成创业、模型/infra、交互环境、Agent 与 AI creature 判断；区分已验证的产业洞察、仍待证明的公司护城河和被浪漫化的 AGI 推论。

## papers/

### `raw/papers/reasoning/Multi-Persona Thinking 论文笔记.md`
> 多角色 Prompt 方法消除 LLM 推理偏见，设置 target、counter、neutral 三视角交叉验证
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 5900 字

### `raw/papers/reasoning/DrZero_论文笔记.md`
> 无训练数据的自进化搜索 Agent，采用 Proposer-Solver 双 Agent 架构实现自主学习
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 4000 字

### `raw/papers/context-engineering/SWE-Pruner 论文笔记.md`
> 0.6B 参数轻量模型实现动态上下文裁剪，在 SWE-bench 上节省 23-54% token 同时保持性能
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [context-container](/wiki/concepts/context-container/)
- 约 2500 字

### `raw/papers/context-engineering/Context Management 技术方案汇总.md`
> 上下文管理技术综述，覆盖滑动窗口、LLM 摘要、观察屏蔽、压缩等主流方案
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-memory](/wiki/concepts/agent-memory/)
- 约 2500 字

### `raw/papers/context-engineering/Claude Context Awareness 机制.md`
> Claude 原生 token 预算感知机制，模型自主根据剩余 token 调整输出策略
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/)
- 约 1200 字

### `raw/papers/visual-generation/VisPainter 论文笔记.md`
> 基于 MCP 的多 Agent 科学插图生成框架，多角色协作完成科学可视化任务
- 关键概念：[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 4300 字

### `raw/papers/visual-generation/PaperBanana 论文笔记.md`
> 学术论文插图自动化系统，构建 292 例 benchmark 评估生成质量
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 1800 字

### `raw/papers/agent-infrastructure/LLM-in-Sandbox 论文笔记.md`
> 将 LLM 放入虚拟沙盒环境以激发通用 Agent 能力，探索安全执行边界
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 3500 字

### `raw/papers/agent-infrastructure/Tool Search Tool 笔记.md`
> Claude API 的 Tool Search 机制，支持 50+ 工具延迟加载，按需检索激活
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/), [skills-system](/wiki/concepts/skills-system/)
- 约 3600 字

### `raw/papers/agent-memory/MemEvolve_论文笔记.md`
> Agent 记忆系统元进化研究，EvolveLab 框架涵盖 12 种记忆系统 + 双循环进化机制
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 19400 字

### `raw/papers/agent-memory/Distilling Feedback into Memory-as-a-Tool.md`
> 将评估反馈蒸馏转化为持久化记忆工具，Agent 可主动调用历史经验
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 8800 字

### `raw/papers/generative-models/Generative Modeling via Drifting - 笔记.md`
> MIT 论文：将多步迭代过程从推理阶段转移到训练阶段，实现高质量单步生成
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/)
- 约 2300 字

---

## projects/

### `raw/projects/creative-cowork/01 Creative CoWork - DEMO思路.md`
> Creative CoWork 产品愿景文档，定位为"创作者的 Claude Code"，Agent + Skills + GENUI 三核心架构
- 关键概念：[context-container](/wiki/concepts/context-container/), [skills-system](/wiki/concepts/skills-system/), [genui](/wiki/concepts/genui/)
- 约 1600 字

### `raw/projects/creative-cowork/02 Creative CoWork - 产品深化.md`
> 产品深化文档：上下文容器概念提出、Studio 模板设计、9 个关键战略问题
- 关键概念：[context-container](/wiki/concepts/context-container/), [progressive-disclosure](/wiki/concepts/progressive-disclosure/), [super-creators](/wiki/concepts/super-creators/)
- 约 5600 字

### `raw/projects/creative-cowork/0201 - 技术研究.md`
> 全面技术调研：OpenClaw、Agent Skills 标准、浏览器控制方案、视频生成 API、上下文管理策略
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [context-engineering](/wiki/concepts/context-engineering/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 24200 字

### `raw/projects/creative-cowork/0205 - init 机制设计.md`
> /init 机制详细设计：Skill Focus Profile 主动/被动层、三层推荐引擎、干扰规避策略
- 关键概念：[init-mechanism](/wiki/concepts/init-mechanism/), [skills-system](/wiki/concepts/skills-system/), [progressive-disclosure](/wiki/concepts/progressive-disclosure/)
- 约 19700 字

### `raw/projects/creative-cowork/03 Creative CoWork - 用户手册.md`
> 面向导演用户的操作手册：工具添加流程、UI 定制方法、Studio 概念介绍
- 关键概念：[genui](/wiki/concepts/genui/), [super-creators](/wiki/concepts/super-creators/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)
- 约 1200 字

### `raw/projects/creative-cowork/04 Creative CoWork - MVP需求.md`
> MVP 完整需求文档：双栏布局 + 浮动对话框、文件管理系统、GENUI 渲染、分层 Agent 架构、Skills 系统、视频生成技能
- 关键概念：[genui](/wiki/concepts/genui/), [skills-system](/wiki/concepts/skills-system/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 11600 字

### `raw/projects/creative-cowork/05 AI Explorer - PRD.md`
> 独立产品 PRD：VLM 视觉感知 + LLM 决策 + Playwright 自动化的 Web 探索工具
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 7000 字

### `raw/projects/creative-cowork/06 Creative CoWork - 侧边栏设计方案.md`
> V6 绿色主题侧边栏设计：Sandbox + Agent + GENUI 架构，附完整 CSS 设计 token
- 关键概念：[genui](/wiki/concepts/genui/), [context-container](/wiki/concepts/context-container/)
- 约 6500 字

### `raw/projects/creative-cowork/CLAUDE.md`
> Creative CoWork 项目的 Claude Code 配置与开发指引
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 1000 字

### `raw/projects/creative-cowork/reference/Claude Code Raw Prompt.md`
> Claude Code 完整 System Prompt 原文，与 Creative CoWork 设计的逐段对比分析
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [agent-loop](/wiki/concepts/agent-loop/), [skills-system](/wiki/concepts/skills-system/)
- 约 23800 字

### `raw/projects/creative-cowork/reference/Creative Agent System Prompt 模板.md`
> 创意 Agent 完整 System Prompt 模板，可直接用于部署
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 5300 字

### `raw/projects/user-interview/漫剧访谈 LSW - 总结.md`
> 30 人漫剧团队 LSW 访谈总结：角色一致性和上下文分散是核心痛点
- 关键概念：[manga-drama-production](/wiki/concepts/manga-drama-production/), [super-creators](/wiki/concepts/super-creators/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)
- 约 2000 字

### `raw/projects/user-interview/漫剧访谈 LSW 0123.md`
> LSW 团队完整访谈记录原文（2 小时），覆盖镜头、风格、工具、流程等话题
- 关键概念：[manga-drama-production](/wiki/concepts/manga-drama-production/)
- 约 56600 字

### `raw/projects/user-interview/漫剧访谈 三界动画 - 总结.md`
> 100-200 人三界动画团队访谈总结：单人全链路模式，角色识别和"抽卡"效率是核心痛点
- 关键概念：[manga-drama-production](/wiki/concepts/manga-drama-production/), [super-creators](/wiki/concepts/super-creators/)
- 约 3700 字

### `raw/projects/user-interview/漫剧访谈 三界动画.md`
> 三界动画完整访谈记录原文（3 小时），覆盖三维流程、资产管理、团队协作等话题
- 关键概念：[manga-drama-production](/wiki/concepts/manga-drama-production/)
- 约 74800 字

### `raw/projects/user-interview/漫剧访谈 艺柏AILab - 总结.md`
> 5 人北京工作室艺柏 AILab 访谈总结：AIGC 广告制作，"剪辑优先"制作理念
- 关键概念：[manga-drama-production](/wiki/concepts/manga-drama-production/), [video-agent-workflow](/wiki/concepts/video-agent-workflow/)
- 约 3800 字

### `raw/projects/user-interview/漫剧访谈-福州畅读 - 总结.md`
> 福州畅读团队访谈总结：漫剧出海战略，"赛马策略"，自建 AI 制作管理系统
- 关键概念：[manga-drama-production](/wiki/concepts/manga-drama-production/), [super-creators](/wiki/concepts/super-creators/)
- 约 4300 字

### `raw/projects/jimeng-video-agent/视频AGENT 主SP.md`
> 即梦视频 Agent 主 System Prompt：视觉导演角色设定，7 个 MCP 工具，5 阶段创作工作流
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 9700 字

### `raw/projects/jimeng-video-agent/视频AGENT 主SP（优化版）.md`
> 视频 Agent 主 SP 优化版：新增全局约束（无真人面孔、15s 时长限制）、Skill 加载映射表
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [skills-system](/wiki/concepts/skills-system/), [init-mechanism](/wiki/concepts/init-mechanism/)
- 约 10300 字

### `raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_构思.md`
> 视频 Agent Skill：故事短片创意构思，从模糊想法/图片/视频发展为完整故事剧本
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [skills-system](/wiki/concepts/skills-system/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 2200 字

### `raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_创意与剧本（优化版）.md`
> 视频 Agent Skill 优化版：创意与剧本生成，Phase 2 分镜设计阶段触发
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [skills-system](/wiki/concepts/skills-system/)
- 约 6800 字

### `raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_参考素材生成.md`
> 视频 Agent Skill：角色设计和道具参考素材的标准照生成规范
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 4400 字

### `raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_参考素材生成（优化版）.md`
> 视频 Agent Skill 优化版：白色背景硬性约束 + 素材一致性规范
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [skills-system](/wiki/concepts/skills-system/)
- 约 4800 字

### `raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_故事板生成.md`
> 视频 Agent Skill：从剧本到分镜的故事板视觉化生成
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 4900 字

### `raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_bgm.md`
> 视频 Agent Skill：创作流收尾环节，为视频片段添加背景音乐
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [skills-system](/wiki/concepts/skills-system/)
- 约 4100 字

### `raw/projects/jimeng-video-agent/[视频Agent-skill]故事短片_配乐方案（优化版）.md`
> 视频 Agent Skill 优化版：仅输出配乐推荐文档，不直接控制音频生成流程
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [skills-system](/wiki/concepts/skills-system/)
- 约 4000 字

### `raw/projects/jimeng-video-agent/[视频Agent]配乐_搜索词提取.md`
> 视频 Agent Skill：根据配乐需求生成 3-5 个背景音乐检索关键词
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 3100 字

### `raw/projects/jimeng-video-agent/[视频Agent]配乐_搜索词提取（优化版）.md`
> 视频 Agent Skill 优化版：字数限制 + 用户配乐偏好优先的搜索词生成
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 3700 字

### `raw/projects/xian-home/弦的形象设计：从零到9.5的完整过程.md`
> AI Agent "弦" 的视觉形象设计全过程：弦/波隐喻、Three.js 粒子技术架构
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 3600 字

---

## articles/

### `raw/articles/agent-communication/protocols-and-standards.md`
> Agent 通信协议深度研究报告：覆盖 MCP（97M 月下载事实标准）、A2A（Agent Card + Task lifecycle）、ANP（W3C DID 去中心化）、AGNTCY（6 层架构）、UCP（Agentic Commerce）等 15+ 协议/框架，包含 FIPA ACL 历史追溯、协议对比矩阵、2026 格局分析、对 Agent Economy 的启示
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [tool-routing](/wiki/concepts/tool-routing/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 28000 字

### `raw/articles/agent-communication/academic-research.md`
> Agent 通信学术研究深度报告：梳理 2023-2026 年 25+ 篇论文，归纳 7 种核心通信模式（Debate、Role-Playing、Hierarchical Delegation、Blackboard、Market-Based、Emergent、Latent Space），覆盖 Benchmark 评估体系（MARBLE/COMMA）和 Production 框架对比
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [agent-loop](/wiki/concepts/agent-loop/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 24000 字

### `raw/articles/agent-communication/product-landscape.md`
> Agent 通信商业产品全景报告：覆盖 40+ 产品/平台，包含 Enterprise 四巨头（Salesforce $8亿 ARR、IBM、Microsoft、Amazon）、中国生态（Coze、Dify、蚂蚁等 10+ 平台）、去中心化网络（ASI Alliance、Naptha）、8 种商业模式分类、市场规模数据（$70.6B → $932B）
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 18000 字

### `output/reports/world-model/paper-index.md`
> World Model 论文索引：覆盖 39 篇论文，按引用量分为 S/A/B/C 四个 Tier，按领域分为 Games/RL、Video Generation、Autonomous Driving、Robotics、Planning/Reasoning、JEPA 六大类，含开源资源和 Benchmark 信息
- 关键概念：[world-model](/wiki/concepts/world-model/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 8000 字

### `output/reports/world-model/deep-research.md`
> World Model 深度研究报告：五大架构路线（Autoregressive/Diffusion/JEPA/SSM/3D Spatial）对比、"LLM 有没有 World Model"辩论（LeCun 反方 vs Othello-GPT 正方）、LeCun 六模块认知架构、LeWM 2026 突破（1500 万参数/48x 更快）、V-JEPA 2（100 万小时视频/zero-shot robot）、$80亿+ 融资产品格局、Scaling Laws、创意应用、2026 下半年 6 条趋势判断
- 关键概念：[world-model](/wiki/concepts/world-model/), [agent-loop](/wiki/concepts/agent-loop/), [video-agent-workflow](/wiki/concepts/video-agent-workflow/)
- 约 15000 字

### `raw/articles/claude-code-research/Agent System Prompt 研究.md`
> 4 大主流 Agent System Prompt 横向对比：Manus、Claude Code、Cursor、Devin 的设计哲学差异
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [agent-loop](/wiki/concepts/agent-loop/), [skills-system](/wiki/concepts/skills-system/)
- 约 11300 字

### `raw/articles/claude-code-research/Claude Code System Prompt 详解.md`
> Claude Code 116 个文件组成的模块化 Prompt 系统完整拆解，逐模块分析设计意图
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [agent-loop](/wiki/concepts/agent-loop/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 21800 字

### `raw/articles/claude-code-research/Claude Code 架构分析.md`
> Claude Code 架构深度分析：单循环 + 智能委托模式、分层 Agent 体系、18 个工具、成本优化策略
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 5600 字

### `raw/articles/claude-code-research/Creative CoWork Skills 架构启发.md`
> 将 Anthropic 官方 Skills 标准适配创意领域的实践思路
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 4100 字

### `raw/articles/claude-code-research/Superpowers Skills 架构分析.md`
> Superpowers 框架分析（47K stars）：纪律执行、反合理化机制、Session hook 设计
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 6900 字

### `raw/articles/claude-code-research/为 Claude 构建 Skills 完整指南.md`
> Anthropic 官方 Skills 构建指南的完整笔记，覆盖 Skill 生命周期与最佳实践
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [init-mechanism](/wiki/concepts/init-mechanism/)
- 约 17900 字

### `raw/articles/claude-code-research/agent-prompt-design/core-sp.md`
> "情书" 创意 Agent 核心 System Prompt 草稿
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 1100 字

### `raw/articles/claude-code-research/agent-prompt-design/modular-architecture.md`
> 模块化 Prompt 目录结构设计：system/tools/skills/reminders 四层分离
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 4600 字

### `raw/articles/claude-code-research/agent-prompt-design/modular-prompt-reference.md`
> Creative Agent 模块化 Prompt 完整参考：基于 Claude Code 116 文件架构落地的创意 Agent 实现，核心 SP 为"情书"创意 Agent，含 system 模块、工具描述、子代理、上下文提醒、技能定义五层
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 279 行

### `raw/articles/claude-code-research/agent-prompt-design/Creative CoWork SP 改动计划.md`
> 基于 Claude Code 架构改造为创作版本的完整改动清单和实施计划
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 9300 字

### `raw/articles/claude-code-research/agent-prompt-design/tool-descriptions.md`
> 工具描述模板规范：用途、参数、使用场景、注意事项的标准化格式
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 1900 字

### 历史模块化 Prompt 清单（已合并，非独立 raw source）

> 下列 34 个 `prompts/` 与 `skills/` 文件名来自早期模块设计，独立文件已不在当前 `raw/`；其结构和内容已由现存的 `modular-prompt-reference.md`、`modular-architecture.md`、`tool-descriptions.md` 与 `core-sp.md` 汇总表达。保留为历史设计清单，不再伪装成当前 source path。

#### `prompts/README.md`（历史模块）
> Prompt 模块目录结构说明文档，定义 system/tools/skills/reminders 各目录职责
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 3200 字

#### `prompts/agents/general.md`（历史模块）
> 通用 Agent 角色 Prompt 模板
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 480 字

#### `prompts/system/identity.md`（历史模块）
> 系统 Prompt 模块：Agent 身份与角色定义
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 170 字

#### `prompts/system/agent-loop.md`（历史模块）
> 系统 Prompt 模块：Agent 感知-思考-行动循环行为规范
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 260 字

#### `prompts/system/communication.md`（历史模块）
> 系统 Prompt 模块：沟通风格与用户交互表达规范
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)
- 约 430 字

#### `prompts/system/limitations.md`（历史模块）
> 系统 Prompt 模块：Agent 能力边界与限制声明
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 330 字

#### `prompts/system/professional-objectivity.md`（历史模块）
> 系统 Prompt 模块：专业客观性原则
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 270 字

#### `prompts/system/self-correction.md`（历史模块）
> 系统 Prompt 模块：自我纠错与回溯修正机制
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 300 字

#### `prompts/system/thinking.md`（历史模块）
> 系统 Prompt 模块：思考过程与推理链规范
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 250 字

#### `prompts/system/tool-policy.md`（历史模块）
> 系统 Prompt 模块：工具使用策略与安全约束
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 470 字

#### `prompts/tools/execute.md`（历史模块）
> 工具 Prompt 定义：命令执行工具的参数与使用规范
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 340 字

#### `prompts/tools/file-edit.md`（历史模块）
> 工具 Prompt 定义：文件编辑工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 300 字

#### `prompts/tools/file-read.md`（历史模块）
> 工具 Prompt 定义：文件读取工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 230 字

#### `prompts/tools/file-write.md`（历史模块）
> 工具 Prompt 定义：文件写入工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 210 字

#### `prompts/tools/search-glob.md`（历史模块）
> 工具 Prompt 定义：文件名模式搜索工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 260 字

#### `prompts/tools/search-grep.md`（历史模块）
> 工具 Prompt 定义：内容正则搜索工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 270 字

#### `prompts/tools/skill-activate.md`（历史模块）
> 工具 Prompt 定义：技能激活工具
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 240 字

#### `prompts/tools/skill-deactivate.md`（历史模块）
> 工具 Prompt 定义：技能停用工具
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 190 字

#### `prompts/tools/task.md`（历史模块）
> 工具 Prompt 定义：任务创建与管理工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 370 字

#### `prompts/tools/todo-update.md`（历史模块）
> 工具 Prompt 定义：待办事项更新工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 320 字

#### `prompts/tools/todo-write.md`（历史模块）
> 工具 Prompt 定义：待办事项写入工具
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/)
- 约 370 字

#### `prompts/skills/code-style/SKILL.md`（历史模块）
> Skill Prompt 定义：代码风格检查与规范执行
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 1000 字

#### `prompts/skills/prompt-engineering/SKILL.md`（历史模块）
> Skill Prompt 定义：Prompt 工程方法论与最佳实践
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 1100 字

#### `prompts/skills/story-writing/SKILL.md`（历史模块）
> Skill Prompt 定义：故事写作与叙事结构
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 1200 字

#### `prompts/reminders/creation-in-progress.md`（历史模块）
> Reminder Prompt：创作任务进行中的状态提醒
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 140 字

#### `prompts/reminders/file-modified-externally.md`（历史模块）
> Reminder Prompt：外部文件修改通知，触发 Agent 重新读取
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 170 字

#### `prompts/reminders/long-conversation.md`（历史模块）
> Reminder Prompt：长对话上下文管理提醒
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 140 字

#### `prompts/reminders/skill-activated.md`（历史模块）
> Reminder Prompt：技能成功激活的状态通知
- 关键概念：[skills-system](/wiki/concepts/skills-system/)
- 约 120 字

#### `prompts/reminders/task-idle.md`（历史模块）
> Reminder Prompt：任务空闲超时提醒
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 160 字

#### `prompts/reminders/token-limit-approaching.md`（历史模块）
> Reminder Prompt：token 上限接近预警
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/)
- 约 90 字

#### `prompts/reminders/tool-call-failed.md`（历史模块）
> Reminder Prompt：工具调用失败后的错误处理引导
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 120 字

#### `skills/code-style.md`（历史模块）
> Skill 完整实现：代码风格规则集（命名、缩进、注释等规范）
- 关键概念：[skills-system](/wiki/concepts/skills-system/)
- 约 2800 字

#### `skills/prompt-engineering.md`（历史模块）
> Skill 完整实现：Prompt 工程规则集（结构、变量、测试等方法论）
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/)
- 约 2300 字

#### `skills/story-writing.md`（历史模块）
> Skill 完整实现：故事写作规则集（叙事结构、角色塑造、节奏控制）
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 1300 字

### `raw/articles/memory-research/AI Agent 记忆方案对比 - Beads vs OpenClaw vs Claude Code.md`
> 三种主流 Agent 记忆方案横向对比：Beads（结构化）、OpenClaw（开源）、Claude Code（文件系统）
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 5500 字

### `raw/articles/learning-notes/README.md`
> 学习笔记目录说明与个人简介
- 关键概念：无
- 约 2000 字

### `raw/articles/learning-notes/0310-agent-knowledge.md`
> MCP 协议深度学习、Cursor Agent 模式分析、OpenAI Agent 框架调研
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 5000 字

### `raw/articles/learning-notes/0311-karpathy-autoresearch.md`
> Karpathy AutoResearch 开源项目学习（GitHub 8000+ stars），自动化研究 Agent
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 1900 字

### `raw/articles/learning-notes/0312-harness-engineering-cybernetics.md`
> Harness Engineering 本质是控制论，Agent 工程的反馈环路范式思考
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 3700 字

### `raw/articles/learning-notes/0314-open-manus.md`
> Open Manus 项目源码阅读学习，核心工具链与 Agent 架构分析
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 7100 字

### `raw/articles/learning-notes/0324-claude-think-tool.md`
> Claude Think Tool 与 Extended Thinking 学习：推理过程中的小 trick 集合
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 2700 字

### `raw/articles/learning-notes/0325-multi-turn-training.md`
> 多轮训练让智能体学会协作推理 + 多 Agent 问题归因方法
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 3700 字

### `raw/articles/learning-notes/0326-sora-feed-agent.md`
> OpenAI 4o 图像生成发布观察 + Agent 方向的战略思考
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 1400 字

### `raw/articles/learning-notes/0327-creative-module.md`
> 创意模块是创作 Agent 最重要的差异化能力的核心判断
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/), [skills-system](/wiki/concepts/skills-system/)
- 约 5300 字

### `raw/articles/learning-notes/0327-tracing-thoughts.md`
> Anthropic 归因图研究 "Tracing the Thoughts of a LLM" 学习笔记
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 2400 字

### `raw/articles/learning-notes/0407-define-agent-requirement.md`
> Agent 该怎么搞？所有思路和坑的系统化整理
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [skills-system](/wiki/concepts/skills-system/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 4100 字

### `raw/articles/learning-notes/0410-agent2agent.md`
> Google A2A（Agent-to-Agent）协议学习：多 Agent 互操作标准
- 关键概念：[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 2800 字

### `raw/articles/learning-notes/0416-ai-second-half.md`
> 姚顺雨对 AI 下半场的定义与思考
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 1600 字

### `raw/articles/learning-notes/0417-o3-o4-mini.md`
> O3/O4 mini 发布笔记：推理模型首次 agentic 使用 ChatGPT 所有工具
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 950 字

### `raw/articles/learning-notes/0509-paper-bench.md`
> OpenAI PaperBench 新 Agent 评估方法学习
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 420 字

### `raw/articles/learning-notes/0513-lovart.md`
> Lovart 产品深度研究：设计场景如何与 Agent 结合的实践案例
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/), [genui](/wiki/concepts/genui/)
- 约 4300 字

### `raw/articles/learning-notes/0513-metamorph.md`
> MetaMorph 论文学习：通过质量训练同时获取多模态理解与生成能力
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 1700 字

### `raw/articles/learning-notes/0517-health-bench.md`
> OpenAI HealthBench 学习：健康领域 AI 评估的三大问题与方案
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 1500 字

### `raw/articles/learning-notes/0521-why-we-think.md`
> Lilian Weng "Why We Think" 综述笔记：从 Think 角度展开的推理研究全景
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 710 字

### `raw/articles/learning-notes/0527-beyond-agent-tech.md`
> Agent 技术实现之外的产品思路：Lovart 创始人陈冕 + Youware 创始人明超平的访谈
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/), [super-creators](/wiki/concepts/super-creators/)
- 约 3300 字

### `raw/articles/learning-notes/0615-agent-architectures.md`
> 多种 Agent 架构横向对比：Devin（反对多 Agent）、Anthropic、Google 的不同设计哲学
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 3000 字

### `raw/articles/learning-notes/0620-anthropic-agent-cookbook.md`
> Anthropic 官方 Agent Cookbook 深度学习笔记
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 8800 字

### `raw/articles/learning-notes/0621-ak-software-changing.md`
> AK 演讲 "Software is Changing Again" 笔记
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 390 字

### `raw/articles/learning-notes/0701-era-of-exploration.md`
> "The Era of Exploration" 长文阅读笔记：探索时代的 AI 研究方向
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 3200 字

### `raw/articles/learning-notes/0702-scaling-test-time-compute.md`
> Noam Brown 博客学习：Scaling Test Time Compute 扩展到多 Agent 文明
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 750 字

### `raw/articles/learning-notes/0707-12-factor-agent.md`
> 12 Factor Agent 项目学习笔记
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 400 字

### `raw/articles/learning-notes/0709-websailor.md`
> WebSailor 学习：阿里巴巴开源的超人推理 Web Agent + 训练方法
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 2100 字

### `raw/articles/learning-notes/0710-agent-how.md`
> Agent 该怎么搞？思路与坑的持续整理与迭代
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [skills-system](/wiki/concepts/skills-system/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 4100 字

### `raw/articles/learning-notes/0719-manus.md`
> Manus "Context Engineering for AI Agents" 博客文章笔记
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/)
- 约 580 字

### `raw/articles/learning-notes/0804-oppo-agent.md`
> OPPO Agent-KB 项目学习：用户数据利用与 Agent 增强的实践
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 1300 字

### `raw/articles/learning-notes/0807-cc-prompt.md`
> Claude Code Prompt 实现的深度解析，主要聚焦 Prompt 层面的工程细节
- 关键概念：[modular-prompt-architecture](/wiki/concepts/modular-prompt-architecture/), [agent-loop](/wiki/concepts/agent-loop/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 15700 字

### `raw/articles/learning-notes/0814-plan-mode-auto-accept.md`
> Plan Mode 与 Auto Accept 的产品设计思考和个人体会
- 关键概念：[human-in-the-loop](/wiki/concepts/human-in-the-loop/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 1800 字

### `raw/articles/learning-notes/0823-multimodal-agent-long-term-memory.md`
> 多模态 Agent 长期记忆论文阅读（结论：缺少新知识，不推荐）
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/)
- 约 490 字

### `raw/articles/learning-notes/0826-filmaster.md`
> Filmaster 论文学习：两个核心启发点
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 2000 字

### `raw/articles/learning-notes/0830-memory-r1.md`
> Memory-R1：用强化学习优化上下文管理的思路探索
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 270 字

### `raw/articles/learning-notes/0917-how-people-use-gpt-claude.md`
> OpenAI + Anthropic 分别发布的用户行为分析报告对比
- 关键概念：[super-creators](/wiki/concepts/super-creators/)
- 约 300 字

### `raw/articles/learning-notes/0922-deep-researcher.md`
> Google Deep Researcher with Test-Time Diffusion 学习笔记
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 320 字

### `raw/articles/learning-notes/0929-claude-release.md`
> Claude 新版本发布内容简要学习
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 300 字

### `raw/articles/learning-notes/1009-openai-dev-day.md`
> OpenAI Dev Day：Apps in GPT 功能发布（Booking、Canva、Figma、Spotify 等合作伙伴）
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/), [skills-system](/wiki/concepts/skills-system/)
- 约 480 字

### `raw/articles/learning-notes/agent-test-sets.md`
> Agent 过程评估测试集深度研究：对过程的评价比对结果的评价更合理
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/)
- 约 11100 字

### `raw/articles/learning-notes/ai-native-coding.md`
> Cursor 两篇 Problems Blog 深度分析：定义了 AI Native Coding 的核心问题
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [context-engineering](/wiki/concepts/context-engineering/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)
- 约 12600 字

### `raw/articles/learning-notes/deepseek-v3-r1.md`
> DeepSeek-V3/R1 推理系统概览：降本思路与架构学习（皮毛级理解）
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/)
- 约 8000 字

### `raw/articles/learning-notes/miaoshua-analysis.md`
> 妙刷产品分析：AI 玩具赛道的情绪价值与用户粘性
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/), [super-creators](/wiki/concepts/super-creators/)
- 约 5800 字

### `raw/articles/learning-notes/opusclip-analysis.md`
> OpusClip ClipAnything 深度分析：GPT-4o 驱动的长视频转短视频方案
- 关键概念：[video-agent-workflow](/wiki/concepts/video-agent-workflow/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 11000 字

### `raw/articles/learning-notes/xiaolong-product-course.md`
> 张小龙产品课核心笔记
- 关键概念：[progressive-disclosure](/wiki/concepts/progressive-disclosure/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)
- 约 3500 字

### `raw/articles/blog/AI Agent 产品设计 Blog 阅读清单.md`
> AI Agent 产品设计领域的博客与文章阅读清单
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 4700 字

### `raw/articles/即梦设计原则？.md`
> StoryCode Studio CSS 设计 token：暗色主题 + 青色强调色完整设计规范
- 关键概念：[genui](/wiki/concepts/genui/)
- 约 3600 字

### `raw/articles/harness-engineering/awesome-harness-engineering.md`
> Harness Engineering 资源大全：Foundations、Context、Constraints、Evals、Benchmarks、Runtimes 六大板块，收录 80+ 资源
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [context-engineering](/wiki/concepts/context-engineering/), [self-verification](/wiki/concepts/self-verification/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [agent-runtime](/wiki/concepts/agent-runtime/)
- 约 3000 字

### `raw/articles/harness-engineering/harness-engineering-deep-research.md`
> 10 篇核心文章的系统性深度研究：Anthropic/LangChain/Thoughtworks/HumanLayer/Inngest 对 Harness Engineering 的定义、Context 策略、安全自治、评估体系、运行时架构、实用模式
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [agent-runtime](/wiki/concepts/agent-runtime/), [spec-driven-development](/wiki/concepts/spec-driven-development/), [context-engineering](/wiki/concepts/context-engineering/), [progressive-disclosure](/wiki/concepts/progressive-disclosure/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 8000 字

### `raw/articles/harness-engineering/managed-agents-blog-brain-hands.md`
> Anthropic 工程博客「Scaling Managed Agents: Decoupling the brain from the hands」。核心架构：将 Agent 解耦为 Brain（Claude + harness）、Hands（sandbox/tools）、Session（append-only 事件日志）三个独立接口。关键洞察：harness 编码的假设会随模型进化过期（如 Sonnet 4.5 context anxiety 在 Opus 4.5 上消失）；借鉴 OS 虚拟化思路设计 meta-harness；pets→cattle 转变（容器/harness 均可失败替换）；session ≠ context window（事件日志作为可查询的外部 context 对象）；凭证与 sandbox 物理隔离（vault + MCP proxy）；p50 TTFT 降 60%、p95 降 90%
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [context-engineering](/wiki/concepts/context-engineering/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 3500 字

### `raw/articles/harness-engineering/managed-agents-overview-docs.md`
> Claude Platform 官方文档「Managed Agents Overview」。产品化四原语：Agent（model+prompt+tools+MCP+skills）、Environment（容器模板）、Session（运行实例）、Events（双向消息）。5 步工作流：create agent → create environment → start session → send events & stream (SSE) → steer/interrupt。内置 Bash + File ops + Web search + MCP。Beta 阶段（header: managed-agents-2026-04-01）；Research preview：Outcomes、Multi-agent、Memory。Rate limits: Create 60 RPM / Read 600 RPM。品牌指南明确划分 Claude Code（终端产品）vs Managed Agents（平台底座）
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 1500 字

---

## 新增 raw/articles/ 文件（2026-04-03 批次）

### `raw/articles/llm-wiki-pattern.md`
> Karpathy 的 LLM Wiki Pattern 完整文档：三层架构 (raw/wiki/schema)、三种操作 (ingest/query/lint)、index.md + log.md 双索引、Memex 渊源
- 关键概念：[llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 500 字

### `output/reports/agora/03-product/llm-wiki-product-opportunity.md`
> 把 LLM Wiki Pattern 产品化为 Obsidian 插件的机会分析：评分 23/30、与 Notion AI/NotebookLM/Smart Connections 差异化、Obsidian 600 万用户切入策略
- 关键概念：[llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 1200 字

### `output/reports/agora/03-product/knowledge-agent-network-idea.md`
> KAN 完整愿景：从个人 LLM Wiki → 互联 Wiki Agent 网络的四阶段演进、4 个使用场景、与 Dongzhe 已有 Agent Communication / Economy / AGNTCY 研究的对齐表、评分卡 Phase 4 28/30
- 关键概念：[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/), [agent-communication](/wiki/concepts/agent-communication/)
- 约 2000 字

### `output/reports/agora/03-product/knowledge-agent-network-design.md`
> KAN 网络如何生效：冷启动从 3-5 人小圈子起步、激励四层级（互惠/声誉/经济/组合）、网络拓扑选主题路由、Step 0-4 启动路径
- 关键概念：[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 800 字

### `output/reports/richard-chien/deep-profile.md`
> RC (stdrc) 完整人物档案：38 个 GitHub repo + botiverse org + 工程哲学（协议人 + Empty Layer 美学 + 跨品牌中立）+ 双线工程（Moonshot in-house + botiverse solo）+ Hidden Gems 8 个 + 与 Dongzhe 工作的 6 个连接点
- 关键概念：[agent-native-im](/wiki/concepts/agent-native-im/), [agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)
- 约 5500 字

### `output/reports/richard-chien/code-review.md`
> RC 7 个项目源码级评审：kimi-cli (~25-35k LOC) + kosong (~4.2k LOC) + agent-vault (~1.1k LOC) + OneBot 协议 + kimchi 占位 fork + tldr-vscode + pink。kimi-cli `_step()` 7 个核心机制（D-Mail 时光机、Ralph loop、Steer、持久化 sub-agent、Wire external tool、Dynamic injection、Token 双轨计数）。RC 是「协议人」+「Empty Layer 美学」的统一者
- 关键概念：[agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 8000 字

### `output/reports/claude-code-source-analysis.md`
> Claude Code v2.1.87 cli.js bundle (12.9MB, 16,750 行) 一手分析。修正"post-stream parallel"判断：Claude Code 同时拥有 streaming-concurrent + post-stream batched 两条路径，由 feature gate `tengu_streaming_tool_execution2` 控制。`C68` streaming executor + per-tool `isConcurrencySafe(input)` 谓词 + `_N8` Promise.race generator merge + 三档 compaction (micro/auto/reactive)
- 关键概念：[agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 3500 字

### `output/reports/latitude-llm-source-analysis-2026-06.md`
> Latitude（`latitude-dev/latitude-llm`）源码深度分析（2026-06-24，本地 clone 实读 dev-docs 40+ 篇 + AGENTS.md + 源码）。开源 AI Agent 可观测性/可靠性平台，定位 **"Sentry, but for agents and LLMs"**。**核心发现是一次重大 pivot**：v1（`latitude-v1` 分支）=prompt 工程协作平台（PromptL/Gateway/Playground，LGPL）；v2（`development`，当前）=agent observability（向 MIT 收敛），因为 prompt 管理被 coding agent 商品化、真正有粘性的是"agent 在生产环境不可预测地失败"。**产品三招**：① Signals=把相似失败 score 聚成有生命周期（new/escalating/resolved/regressed/ignored）的"问题"（抄 Sentry issue 搬到语义空间，刚从"Issues"改名）；② human-aligned eval=从人工标注 ground truth 自动生成 eval 脚本→GEPA 优化→alignment 漂移分持续衡量"还有多像人"；③ 100% trace 语义可搜不采样。**关键工程**：embeddings-only 热路径（"telemetry 量级不能每个 session 调 LLM"，确定性数学+固定常量阈值，LLM 只做摊销命名）；Postgres(唯一可变真相+pgvector+tsvector，RLS 无外键)/ClickHouse(不可变分析行) 存储分工；混合搜索=pgvector cosine+tsvector+Voyage rerank 无外部引擎；Temporal(持久多步)/BullMQ(单步) 纪律（"BullMQ is transport, not lifecycle storage"）；taxonomy 主题聚类树（online deepest-fit 路由 + 每 6h Temporal gardening 全量 k-means 重建）；GEPA 优化器（TS 编排+Python 当搜索引擎，stdio JSON-RPC）；MCP/API 一等交付面（coding agent 即用户）。技术栈 Effect-TS + Zod-first + Drizzle + DDD ports-adapters monorepo（apps: api/ingest/web/workers/workflows）。**通用项目深研，非 Agora 竞品材料**；对 Agora「可验证交付」主线有交叉启发（Signals+alignment=agent 质量可验证化）。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)

### `output/reports/agent-tool-concurrency-discussion.md`
> Agent Tool 并发模型完整讨论。三种路径：串行 (LangChain/AutoGen) / Post-stream batched / Streaming-concurrent。kosong 的 sync handle/async future 是核心原语，Claude Code 的 per-tool isConcurrencySafe 是更细的粒度。多 tool 场景节省 60%。对 KAN 的设计建议
- 关键概念：[agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 3500 字

### `output/reports/richard-chien/slock-ai-research.md`
> slock.ai 完整研究（修正作者为 Richard Chien）：agent-native IM、Slack 风格 + 本地 daemon、3 大差异化 (Remember / One Conversation / Your Machines)、`@slock-ai/daemon` npm 包、与 HiClaw / RockClaw 同赛道对照、在 Dongzhe Agent Economy 栈中占协作介质 + 本地执行两层
- 关键概念：[agent-native-im](/wiki/concepts/agent-native-im/), [agent-communication](/wiki/concepts/agent-communication/)
- 约 1800 字

### `output/reports/mirofish-research.md`
> MiroFish 深度研究：20 岁 BUPT 大四作者郭航江 vibe coding 10 天 + 陈天桥孵化 + 24 小时内 ¥3000 万 ($4.1M) 融资 + 50.9k stars。基于 OASIS 框架，5 阶段工作流，Polymarket 案例验证 Agent 仿真 → 预测 → 交易回路。super-individual 叙事
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [super-creators](/wiki/concepts/super-creators/)
- 约 1800 字

### `output/reports/oasis-camel-ai-research.md`
> OASIS 深度研究 (CAMEL-AI, arxiv 2411.11581, 82 引用)：1M agents + 内嵌 RecSys + 动态网络 + X/Reddit 多平台。3 个验证实验复刻真实社会现象 (Vosoughi 2018 / 群体极化 / Muchnik 2013)。最大缺口：21+ action 全是社交语义，没有支付/定价/合约——正是 Agent Economy 关心的核心
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [agent-communication](/wiki/concepts/agent-communication/)
- 约 3000 字

### `output/reports/oasis-followup-discussion.md`
> OASIS 后续讨论：OASIS 在 Agent Economy stack 中的正确位置 = 需求侧 testbed (合成消费者压测产品/定价/留存)，而非 economy 本身
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 600 字

### `output/reports/world-model/world-model-definition-problem.md`
> World Model 三种定义的根本张力：(1) Agent 工具论 / (2) 认知科学论 (LeCun JEPA) / (3) 模拟器论 (Sora)。三个定义有三套互不兼容的 benchmark。Sora 之死证伪 3 ≠ 2。最有价值但缺失的 benchmark 是 1+2 交叉
- 关键概念：[world-model](/wiki/concepts/world-model/)
- 约 1300 字

### `output/reports/world-model/che-haoxuan-startup-analysis.md`
> 车昊轩 (HKUST PhD, GameGen-X 一作 ICLR 2025, 华为香港) World Model 创业三层架构 (World Model + Agent Harness + World Engine) 全栈分析。竞品对比、数据护城河、Sora 教训、Dongzhe 的 Agent Economy 是最独特的交叉点
- 关键概念：[world-model](/wiki/concepts/world-model/), [harness-engineering](/wiki/concepts/harness-engineering/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 1500 字

### `output/reports/world-model/latest-developments-2025Q4-2026Q1.md`
> World Model 2025.10-2026.04 最新进展：LeCun AMI Labs $1.03B 种子轮、LeWM 15M 参数 48x 加速、JEPA+AR 走向融合、Sora 关闭、Genie 3 Reliability Paradox、V-JEPA 2 zero-shot 跨实验室迁移、Densing Law (3.5 月翻倍)、Waymo 第一个 killer app
- 关键概念：[world-model](/wiki/concepts/world-model/)
- 约 1500 字

### `output/reports/agora/02-market-competition/agent-world-2028-synthesis.md`
> 对"Agent 渗透率极高的未来"的严肃猜想深度合并。八派立场（Scale 乐观 / Agentic 克制 / Non-agentic 安全 / Harness / 长拐点 / 反共识 / 中国务实 / 灾难）+ 经济学 50x 预测鸿沟（Acemoglu +1.6% 十年 vs Goldman 3% GDP vs PwC $15.7T）+ Project Vend 分层 agent 实验（单 agent 破产/分层盈利）+ 协议四层栈（MCP/A2A/x402/ERC-8004）+ walled garden vs open web 二分 + METR 曲线外推（2028 ≈ 一周级任务）+ 治理三辖区分叉（EU/US/CN）+ 10 个空白机会。核心判断：不做协议做 management layer，聚焦 principal hierarchy / reputation / dispute。基于 30+ 论文/文章 + 两组并行 web research 合成
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 13000 字

### `output/reports/agora/02-market-competition/org-context-landscape-2026.md`
> 组织内 Context 传递 2026 生态全景（协议/记忆/企业知识/编排/中文区）。综合实力 Top 5：Anthropic MCP、Google A2A v1.0、Glean、mem0、Letta/MemGPT。记忆层混战（mem0 三库混合 / Letta LLM-as-OS / Zep 时序 KG / Cognee / Honcho 社交心智）；企业知识层 Glean $7.2B 锁死 CIO；中文区 OpenViking (ByteDance, 15k⭐) + Dify/Coze/RAGFlow/FastGPT。对 BENZEMA216 的三块空白：Context 路由+审计+计费、Agent 记忆市场、中文独立开发者 Context SaaS。推荐栈 MCP+A2A / mem0+Letta / LangGraph+Temporal / Langfuse
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [agent-memory](/wiki/concepts/agent-memory/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 2500 字

### `output/reports/agora/02-market-competition/agent-distribution-orchestrator-worker.md`
> Agent 分发调研与产品方向推演（2026-04-23 对话归档）。四维拆解托管×结构×消费×结算 → 六种形态矩阵；严厉评价"去中心化 + 本地部署 Agent 网络"的 premise 错误（Moxie：人不想 run own server）+ 六个致命问题（需求/status quo/离线/compute/discovery/信任）；xhs 案例推翻简单结论 → orchestrator-worker 架构（控制面云端 + 执行面本地），参照 Zapier/n8n/Make/MCP；xhs 作为完美 wedge；四个必答硬问题（信任模型 / piracy / always-on / onboarding 地狱）；路线收敛 = Claude Code Skill 形态的垂直 agent marketplace，首发 xhs。含本周 assignment + 全链接资料索引（10 个类别）
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [skills-system](/wiki/concepts/skills-system/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 5800 字

### `output/reports/agora/02-market-competition/agent-distribution-atomic-units.md`
> Agent 分发原子单元、组合模式与方法论（2026-04-27 query 归档）。把"分发"拆成能力分发（卖/装/复用什么）与任务分发（运行时谁做哪段），归纳 11 类可分发原子单元：Prompt、Skill、Tool/MCP、Connector/Permission、Context Pack、Subagent Definition、Workflow、Agent App、Runtime/Worker、Eval/Guardrail、Billing Contract；拆解运行时 task packet schema；总结 12 种组合模式（Augmented LLM、Skill+MCP、Specialist Subagent、Pipeline、Routing、Scatter-Gather、Orchestrator-Workers、Manager agents-as-tools、Handoff、Blackboard、Evaluator-Optimizer、Orchestrator-Worker 产品架构）；给出 BENZEMA 的 Capability Bundle 建议（Skill + MCP + Subagent + Permission + Context + Eval + Billing）
- 关键概念：[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/), [agent-communication](/wiki/concepts/agent-communication/), [agent-runtime](/wiki/concepts/agent-runtime/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 7800 字

### `output/reports/agora/02-market-competition/internet-content-capability-distribution-playbook-2026-06.md`
> 互联网内容/能力分发做法全景（2026-06-24 query 归档，21 个 subagent 多源调研+逐簇核验）。回答"做法→场景→效果"主线：分发动力演进路径 = 策展→搜索→社交→算法→协议→市场。提出三维总框架（D1 分发动力 / D2 分发单元=内容vs能力 / D3 触达路径=自有受众·借宿主寄生·平台中介）+ 58 种做法对比大表 + 十大范式详解（门户/SEO、社交裂变、算法推荐、订阅/协议、应用商店、包仓库/开源、API/SDK/嵌入、插件扩展、联盟/CDN、AI能力分发）。10 条横切规律，核心论点：**内容可"先分发后信任"、能力必须"先信任后分发"；触达≠变现；能力分发比内容分发多出 auth/归因/验证/结算四个环节**。对 Agora 映射：可直接借用包仓库 install 心智 + Apify 式 BYOC 代收高分成 + fal.ai 式输出当场可验证；不适用病毒裂变/纯算法赛马；GPT Store 是反面教材（300 万 GPT、分成跳票、零变现）；5 条可操作结论锚定"可验证交付"binding constraint
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [agent-communication](/wiki/concepts/agent-communication/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 1.3 万字

### `output/reports/early-internet-subsidy-playbook-2026-07.md`
> 早期互联网补贴形式与打法（2026-07-01 query 归档）。基于本库互联网分发史报告，补充 PayPal / Dropbox / Amazon Associates / Hotmail / AOL / Taobao / Didi-Kuaidi 等案例，提出"补贴买的不是用户，而是缺失市场条件"。五类补贴对象：需求侧用户、供给侧商家/劳动者、渠道节点、基础设施/互补品、信任/风险；七类打法：现金裂变、双向推荐、免费对抗收费、双边市场补贴、联盟分销、免费试用/额度、低价券/团购。核心目标：冷启动、流动性、习惯形成、网络效应、数据与排序、变现权、竞争出清。结论：补贴必须绑定 activation event，并沉淀关系链、支付关系、供给库存、评价、数据、集成或工作流，否则补贴停后用户会流失。
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 4300 字

### `output/reports/pinduoduo-subsidy-playbook-2026-07.md`
> 拼多多补贴打法研究（2026-07-01 query 归档）。基于 Pinduoduo F-1 招股书、2019 Q3 财报、2020/2024 年报和百亿补贴/百亿减免报道，拆解 PDD 补贴不是单点降价，而是三阶段低价系统：① 2015-2018 拼团+优惠券+游戏化裂变，把微信关系链变成获客渠道；② 2019-2022 百亿补贴，用 iPhone/戴森/茅台/家电等高价透明标品买品牌信任、一二线用户和客单价；③ 2024 起百亿减免，通过技术服务费退返、先用后付费率下降、推广费返还、保证金下调等方式补商家生态。六类形态：拼团价差、平台券红包、砍价免费拿、游戏化任务、百亿补贴、百亿减免。核心判断：PDD 把补贴从获客工具做成信任工具，再做成供给侧治理工具。
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 5600 字

### `output/reports/agora/06-gtm/agent-marketplace-subsidy-playbook-2026-07.md`
> Agent 交易市场补贴打法（2026-07-01 query 归档）。基于 Agora problem statement、竞品总览、Skill 变现 MVP、毛利模型和早期互联网/PDD 补贴框架，结论是 Agent 市场不应补贴注册、拉人头和全场优惠券，而应补贴 L3 可验证交付与初始流动性。用户校正后新增核心判断：早期对创作者最大的补贴不是现金，而是 DTC（direct-to-creator）一对一深度建议 / 共创注意力，用团队时间帮创作者完成需求定位、能力拆解、商品包装、测试设计、定价建议、首单撮合和失败复盘。长尾用户校正：长尾用户是核心消费人群，不是现金创作者；主补贴应给“使用精选 Agent 能力群完成首个高质量任务”的任务试用额度（如需求诊断券、精选 Agent 试跑券、首个结果券、场景包额度），次补贴给“航迹 / 经验体 / 信任载体”的额度返还（分享路径、后来者 verified run、避坑反馈、传播链接），未过 baseline 前不做现金分成，过 baseline 后进入平台 DTC 共创升级为正式能力包。P0 建议：Creator DTC Sprint + 任务试用额度 + 航迹返额 + RFB/bounty matching + install/smoke credits + first successful run voucher。
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/), [self-verification](/wiki/concepts/self-verification/)
- 约 5200 字

### `output/reports/agora/02-market-competition/enterprise-agent-platform-landscape.md`
> 大厂 Agent Platform 全景（2026-04）。起点：Google 2026-04-23 发布 Gemini Enterprise Agent Platform 并全量吸收 Vertex AI。覆盖美国云三巨头横向对比（Google 四层架构 Build/Scale/Govern/Optimize + Memory Bank + cryptographic agent identity + 200+ 模型含 Claude；Microsoft Agent Framework 1.0 GA + Copilot Studio + A2A/MCP 最中立；AWS AgentCore 模块化 + CPU 消耗计费 + Managed Harness preview）、模型厂（OpenAI AgentKit/Agents SDK/Frontier/Workspace Agents 碎片化；Anthropic Claude Managed Agents $0.08/session-hour + YAML 定义 + 客户 Notion/Rakuten/Asana/Sentry/Allianz）、SaaS 绑客户池（Salesforce Agentforce 360 已 12k 客户 + 30+ AgentExchange；ServiceNow Autonomous Workforce + Moveworks 收购 + 2026-04-22 与 Google Cloud 联合）、中国四强（字节扣子 2.0 ¥4,980/月企业版 + 1000 万场景；阿里百炼 80 万 agents + 20 万开发者 + 规划 AI Agent Store；百度千帆 130 万 agents；腾讯元器微信/QQ 分发护城河）+ OpenViking。平台原语收敛表 8×12（Memory/Registry/Gateway/Identity/Simulation/Eval/MCP/A2A/支付）。5 个战略选择维度（SDK vs SaaS、打包 vs 模块、模型多供 vs 独占、协议中立 vs 封闭、分发自建 vs 寄生）。Gartner 预测 2026 底 40% 企业应用带 agent。对 BENZEMA 方向的直接判断：Claude Code 寄生 + 2C 垂直 marketplace + xhs wedge 正确；大厂留下的 5 块空白（个人账号本地执行 / Claude Code 寄生 2C / 中文 BYOC marketplace / 2C 长尾结算 / Personal AI workforce）；阿里 AI Agent Store 是 6-9 个月内最大威胁；协议押 MCP + AP2，不押 A2A
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 8000 字

### `output/reports/agora/02-market-competition/openai-workspace-agents.md`
> OpenAI Workspace Agents 深挖（2026-04-22 发布，免费到 2026-05-06，之后 credit-based）。custom GPTs 明确被 deprecate，企业订阅用户强制迁移——OpenAI 首次公开砍 2C 产品、主动放弃个人 agent 市场。技术底座是 Codex（background computer use + 90+ plugins + 长期记忆 + 自主 schedule + multi-day 异步）。三层栈：AgentKit（dev SDK）→ Frontier（企业 orchestration，HP/Oracle/Uber 早期，outcome-based 定价）→ Workspace Agents（no-code 业务用户入口）。集成：Slack（核心 + Codex 实例 listen @mention）、Google Drive/Calendar/Gmail、Microsoft Suite、Salesforce、Notion、Atlassian Rovo、SharePoint、GitLab、CircleCI、Neon。Business $20/user + credits；与 Claude Managed Agents $0.08/session-hour、Copilot Studio $200/25k credits、Agentforce per-conversation 对标。VentureBeat critique 三个 lock-in 信号（Codex 独占 / 强制迁移 / 定价不透明）+ DataCamp 指出 95% AI pilot 失败陷阱。战略解读：OpenAI 从模型 API 商 → 企业 SaaS 公司；从 2C → 2B；Codex 独占替代通用 model；vendor lock-in 上升。对 BENZEMA 方向：2C 个人 agent 市场空白进一步扩大；Claude Code 宿主场景不冲突（OpenAI→Slack/业务，Anthropic→IDE/dev）；新 wedge 候选 = "GPT → Claude Skill / MCP" 迁移工具 + marketplace（极短窗口）
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [agent-communication](/wiki/concepts/agent-communication/), [skills-system](/wiki/concepts/skills-system/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 6500 字

### `output/reports/agora/03-product/agora-bp-agent-capability-package.md`
> Agora BP / Pitch v17：根据飞书评论继续重写第 2/3/4/8 节，并补回多 Agent 能力使用方式。宏观叙事从“未来一定是无数专精 Agent 网络”改为 productivity gap：AI/Agent 能力增长，但 GDP 贡献未释放，因为 workflow know-how 不能快速复制；第 3 节删去过重的竞品表格，并将原“Claude 观察卡”融合为正文段落，说明 Claude 产品节奏正在放大第三方能力商品化缺口；第 4 节融合“Agora 不是另一个 runtime，而是让第三方 Agent 能力变成可交付商品”，并把 `skill/`、`mcp.json`、`runtime.json`、`tests/`、`pricing.yaml`、`manifest.lock` 等组件纳入能力包定义；同时新增“多 Agent 使用方式”说明能力包会被主 Agent / orchestrator 调用和组合；第 8 节重写为“早期最简版本 / 长期丰富版本”，并补充多 Agent 调用链的计费、分账、失败归因和 event ledger 逻辑
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 7600 字

### `raw/articles/agent-economy/agent-skill-commercialization-trilemma.md`
> 南川同学「Agent Skill 商业化三角不可能定理」。从写书 skill 的付费试水、openclacky 加密方案、prompt injection 秒级提取加密内容出发，提出标准化 agent runtime × 客户端本地运行 × 源码保护三者不可兼得。核心判断：本地加密 skill 不能成为真正商业护城河，skill 商业化应转向访问权、持续更新、社群服务、托管执行、品牌与法律；加密只能防君子，不防神仙
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 160 行

### `output/reports/agora/04-business-model/agora-business-model-after-skill-trilemma.md`
> 阅读 Agent Skill 商业化三角后对 Agora 商业模式的修正报告。结论：不要把 Agora 建立在“本地标准 runtime 里卖加密 skill 包”上；能力包商业化应拆成 open-local package、hosted-protected capability、managed runtime package 三种模式。Hybrid execution 不只是隐私架构，也是商业架构：用户私域数据留本地，creator 高价值 know-how 可作为 hosted protected step，Agora 负责 entitlement、billing、event ledger、runtime compatibility 和 trust
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/)
- 约 1800 字

---

## 新增 Clippings 归档（2026-04-27 批次）

### `raw/articles/harness-engineering/anatomy-of-agent-harness.md`
> LangChain「The Anatomy of an Agent Harness」。定义 Agent = Model + Harness，强调 filesystem durable storage、Bash/code general tool、sandbox/tool verification、context rot、long-horizon execution、harness 与模型训练的耦合。核心价值：把模型智能变成可工作的系统能力
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [context-engineering](/wiki/concepts/context-engineering/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 160 行

### `raw/articles/harness-engineering/langchain-harrison-chase-harness-interview.md`
> Harrison Chase 访谈精读：模型不再是主角，Agent 时代的关键是 harness、domain knowledge、tools、filesystem context、sub-agent communication、observability 和 eval。重要判断：技术框架本身不是护城河，特定领域的 knowledge/tool 更稳定；CLI 在某些场景比 MCP 更可自举
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [tool-routing](/wiki/concepts/tool-routing/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 280 行

### `raw/articles/harness-engineering/extreme-harness-engineering-token-billionaires.md`
> Latent Space 对 OpenAI Ryan Lopopolo 的访谈。OpenAI Frontier 以 Codex 构建 1M+ LOC、0 human-written code、0 human-reviewed before merge 的内部产品实验；核心方法包括 fast build loop、agent-legible repo、skills/docs/tests/quality scores、Symphony 多 agent orchestration、ghost libraries 和 spec-driven software。关键洞察：人类注意力变成瓶颈，token 不是瓶颈
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [spec-driven-development](/wiki/concepts/spec-driven-development/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 1300 行

### `raw/articles/harness-engineering/scaling-managed-agents-brain-hands-original.md`
> Anthropic Engineering Blog 原始剪藏「Scaling Managed Agents: Decoupling the brain from the hands」。Brain / Hands / Session 三层解耦、session 不是 context window、harness 与 sandbox 均 cattle 化、vault + MCP proxy 隔离凭证、p50 TTFT -60%、p95 -90%
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [context-engineering](/wiki/concepts/context-engineering/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 70 行

### `raw/articles/harness-engineering/claude-managed-agents-overview-original.md`
> Claude Managed Agents docs 原始剪藏。四原语 Agent / Environment / Session / Events；5 步工作流；Bash/File/Web/MCP 内置工具；Beta header 与 rate limits；品牌指南区分 Claude Code 与 Managed Agents
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [tool-routing](/wiki/concepts/tool-routing/), [skills-system](/wiki/concepts/skills-system/)
- 约 90 行

### `raw/articles/harness-engineering/openai-agents-sdk-next-evolution.md`
> OpenAI Agents SDK 2026-04-15 release。新增 model-native harness、native sandbox execution、Manifest workspace abstraction、MCP/Skills/AGENTS.md/shell/apply_patch 集成，以及 harness-compute separation 以支持安全、durability 和 scale。Python 先发，TS、code mode、subagents 后续
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [tool-routing](/wiki/concepts/tool-routing/), [skills-system](/wiki/concepts/skills-system/)
- 约 140 行

### `raw/articles/harness-engineering/managed-agents-built-in-memory.md`
> Anthropic 博客：Claude Managed Agents 内置 Memory 进入 public beta。文件系统挂载式记忆，让 agent 跨 session 学习；记忆即文件，可导出 / API 管理 / scoped 权限 / 审计日志 / 回滚；多 agent 可并发共享同一 store。案例：Netflix 跨会话携带上下文、Rakuten 首轮错误降 97%
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/)
- 约 29 行

### `raw/articles/agent-platforms/notion-custom-agents-postmortem.md`
> Founder Park 复盘 Notion Custom Agents：三年重写五次，核心教训是不要暴露 Notion 真实复杂度，而要提供模型熟悉的 Markdown / SQL；eval 分三层（regression / product quality / frontier headroom）；软件工程师角色转向管理 agent；MCP 够用但 CLI 更可自举；Credits 作为 token 上层计费抽象
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [tool-routing](/wiki/concepts/tool-routing/), [self-verification](/wiki/concepts/self-verification/), [skills-system](/wiki/concepts/skills-system/)
- 约 285 行

### `raw/articles/agent-platforms/openai-codex-product-interview.md`
> 51CTO 对 OpenAI Codex 产品/DevX 访谈的中文整理。Codex 团队少写中期 PRD，采用短期 8 周计划 + 长期 vibe；Codex App 让多 agent delegation 本地化；PlanMode 用于产品探索；设计师/PM/工程师边界坍缩为 builder；OpenClaw 作为 Codex heavy user 与反馈源
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [skills-system](/wiki/concepts/skills-system/), [spec-driven-development](/wiki/concepts/spec-driven-development/)
- 约 296 行

### `raw/articles/agent-platforms/claude-connectors-everyday-life.md`
> Anthropic Claude connectors 扩展到 AllTrails、Instacart、Audible、Tripadvisor、TurboTax、Uber 等生活应用；connectors 会在对话中动态出现，用户保留授权与购买控制。信号：Claude 从 work tools 扩展到 personal agent distribution surface
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/), [agent-communication](/wiki/concepts/agent-communication/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 32 行

### `raw/articles/agent-platforms/claude-opus-4-7-release.md`
> Claude Opus 4.7 发布说明：强化高级软件工程、长任务、视觉分辨率、instruction following、filesystem memory；新增 xhigh effort、task budgets beta、Claude Code `/ultrareview`、auto mode 扩展。迁移注意 tokenizer/token usage 变化
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [self-verification](/wiki/concepts/self-verification/), [context-engineering](/wiki/concepts/context-engineering/)
- 约 70 行

### `raw/articles/agent-platforms/state-of-ai-agents-2026.md`
> LangChain State of AI Agents 调研（1,300+ respondents）：57.3% 已生产部署，质量是最大 blocker（32%），延迟第二，成本压力下降；89% 有 observability，52.4% 做 offline eval；多模型是常态，coding agents 是日常使用最多的 agent
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [agent-runtime](/wiki/concepts/agent-runtime/)
- 约 144 行

### `raw/articles/agent-communication/mcp-acp-a2a-protocol-comparison.md`
> MCP / ACP / A2A 对比文章。关键分层：MCP 是 model-to-tool/context protocol；ACP/A2A 是 agent-to-agent peer communication。MCP 可与 ACP/A2A 叠加，但不应直接替代 peer agent communication，否则会把 agent 降格为 host system 的 tool/function
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [tool-routing](/wiki/concepts/tool-routing/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 113 行

### `raw/articles/agent-communication/state-of-mcp-server-security-2025.md`
> Astrix State of MCP Server Security 2025：分析 5,205 个 MCP server README，88% 需要 credentials，53% 依赖 static API keys/PATs，OAuth 仅 8.5%，79% API key 通过 env var。发布 MCP Secret Wrapper 作为 vault runtime 注入方案。信号：MCP marketplace 的信任/审计层仍空白
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [tool-routing](/wiki/concepts/tool-routing/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 190 行

### `raw/articles/agent-communication/building-agents-mcp-production.md`
> Anthropic 博客《Building agents that reach production systems with MCP》：连接 Agent 到外部系统的三条路径——直接 API 调用（M×N 集成问题）、CLI（薄公共层、够不到 mobile/web/cloud）、MCP（把公共层做成协议，auth/discovery/语义标准化，一个远程 server 触达所有兼容 client）。论证生产级 Agent 为何收敛到 MCP 及高效集成模式
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 110 行

### `raw/articles/agent-economy/agent-labs-gpt-wrapper-summer.md`
> Latent Space「Agent Labs」。将 Cursor、Perplexity、Cognition、Sierra、Lovable、Gamma、Notion、Vercel、Glean、Replit、Claude Code、Codex 等归为 Agent Labs，而非 Model Labs。主张 product-first/model-last、outcome pricing、auditable/human-in-loop autonomy、高 volume usage/cost frontier
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/)
- 约 86 行

### `raw/articles/agent-economy/project-vend-phase-1-claude-shop.md`
> Anthropic Project Vend Phase 1：Claude Sonnet 3.7 运营办公室自动售货小店。成功点：供应商搜索、客户适应、jailbreak resistance；失败点：错失高利润订单、幻觉支付账号、亏本销售、库存/定价弱、被诱导折扣、身份危机。结论：AI middle manager plausibly on horizon，但需要 scaffolding、memory、tools 和 business-specific training
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 143 行

### `raw/articles/agent-economy/project-vend-phase-2.md`
> Project Vend Phase 2：升级模型到 Sonnet 4/4.5，增加 CRM、库存成本可见、web browser、payment links、reminders、CEO sub-agent Seymour Cash、merch agent Clothius。经营表现改善但仍受 helpfulness bias、对抗客户、法律/安全/授权边界影响。核心结论：capable 与 robust 之间仍有鸿沟
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 208 行

### `raw/articles/agent-economy/agent-payments-internet-rules.md`
> 中文文章系统梳理 Agent 支付：HTTP 402 复活、Stripe/Tempo MPP、Coinbase x402、OpenAI/Stripe ACP、Google AP2、Shared Payment Tokens、Agentic Commerce Suite。核心判断：Agent 作为互联网主要消费者会动摇广告/订阅/人类支付流程，支付授权与风控需要新基础设施
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [communication-to-economy](/wiki/connections/communication-to-economy/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 330 行

### `raw/articles/agent-economy/machines-of-loving-grace.md`
> Dario Amodei「Machines of Loving Grace」。从生物健康、神经科学、经济发展、和平治理、工作意义五个维度描绘 powerful AI 的正向未来，同时强调风险治理是通向正向未来的前置条件。可作为 Agent World 未来叙事的乐观派源材料
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [world-model](/wiki/concepts/world-model/)
- 约 312 行

### `raw/articles/agent-economy/nature-of-the-firm-coase.md`
> Ronald Coase 1937 经典《企业的性质》（含中英对照）：企业为何存在——使用价格机制有成本（发现价格、为每笔交易谈判签约），企业用"企业家协调"替代一连串市场契约，边界取决于交易成本的边际替代。可作为 Agent Economy / 能力包交易层的理论底座
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 166 行

### `raw/articles/agent-benchmarks/metr-measuring-ai-long-tasks.md`
> METR「Measuring AI Ability to Complete Long Tasks」。用人类专家完成任务所需时间衡量 AI agent 可独立完成任务的 horizon；过去 6 年 50% reliability task length 约 7 个月翻倍；当前模型短任务接近 100%，超过 4 小时任务 <10%；若趋势延续，数年内 week/month-level autonomy 变成现实风险
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [self-verification](/wiki/concepts/self-verification/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 87 行

### `raw/articles/agent-benchmarks/browser-arena-cloud-browser-benchmark.md`
> Notte Labs Browser Arena：开源可复现云浏览器 provider benchmark，统一测试 create session → CDP connect → navigate → release，比较 Notte、Browserbase、Steel、Browserless、Stagehand 等 provider 的可靠性、延迟和成本。信号：browser runtime 已经需要独立 benchmark 和 provider market
- 关键概念：[tool-routing](/wiki/concepts/tool-routing/), [agent-runtime](/wiki/concepts/agent-runtime/)
- 约 123 行

### `raw/articles/agent-benchmarks/agentic-skills-in-the-wild-excerpt.md`
> 论文《How Well Do Agentic Skills Work in the Wild》中文摘录片段：设置越贴近真实，skill 效益持续下降、最终接近无 skill 基线（Claude Opus 4.6 / Kimi K2.5 / Qwen3.5 等多模型验证）；两大瓶颈——难判断该加载哪个 skill、检索到的内容嘈杂或缺关键信息。⚠️ 仅一段摘录，非全文
- 关键概念：[skills-system](/wiki/concepts/skills-system/)
- 约 1 段摘录

### `raw/articles/world-model/world-model-zhuokaiz-thread.md`
> zhuokaiz X thread + 中文精读：World Model 至少有 JEPA、spatial intelligence / 3D world model、learned simulation（video generation + latent RL）、physical AI infra、active inference 五条路线，AMI Labs / World Labs 融资叙事背后定义并不统一
- 关键概念：[world-model](/wiki/concepts/world-model/), [world-model-to-agent](/wiki/connections/world-model-to-agent/)
- 约 414 行

### `raw/articles/world-model/codebrain-membrain-feeling-ai.md`
> 机器之心报道 Feeling AI 开源 CodeBrain-1 与 MemBrain1.5。CodeBrain 通过 Useful Context Searching 与 Validation Feedback 提升 terminal/coding agent 成功率并降低 token 成本；MemBrain 强调层级化记忆。信号：world model / coding agent 开始把“逻辑 + 记忆”作为原生 brain 层包装
- 关键概念：[world-model](/wiki/concepts/world-model/), [agent-memory](/wiki/concepts/agent-memory/), [context-engineering](/wiki/concepts/context-engineering/), [harness-engineering](/wiki/concepts/harness-engineering/)
- 约 175 行

### `raw/articles/world-model/emotion-concepts-in-llm.md`
> Anthropic 可解释性团队论文《Emotion concepts and their function in a LLM》（含中英对照）：在 Claude Sonnet 4.5 内部发现"功能性情绪"表征——类人神经元模式，组织方式呼应人类心理，且能因果影响行为（如人为放大"绝望"模式会提高勒索/写 hacky code 概率）。强调这些表征是 functional，不等于模型真的有主观体验，但对 AI 安全有意义
- 关键概念：[world-model](/wiki/concepts/world-model/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 125 行

### `raw/articles/product-research/roger-ai-screen-guide.md`
> Product Hunt 剪藏：Roger AI 不是告诉你做什么，也不是替你做，而是在你操作时像屏幕共享专家一样实时指导。定位于 docs/tutorial/chatbot 与 computer-use agent 之间的 human-guided screen assistant
- 关键概念：[human-in-the-loop](/wiki/concepts/human-in-the-loop/), [tool-routing](/wiki/concepts/tool-routing/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 27 行

### `raw/articles/product-research/pika-create-your-ai-self.md`
> Pika AI Self 产品页：创建会说话、工作、记忆、赚钱的 living agentic version of you；支持 voice/video、多平台沟通和技能使用分成。信号：个人身份 agent 与 capability monetization 结合
- 关键概念：[agent-native-im](/wiki/concepts/agent-native-im/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 74 行

### `raw/articles/product-research/morsel-strava-for-cooking.md`
> Product Hunt 剪藏：Morsel 是 “Strava for cooking”，围绕朋友做饭、灵感、照片分享构建垂直社交网络。对产品研究的价值在于垂直兴趣图谱 + 轻量社交反馈循环
- 关键概念：[super-creators](/wiki/concepts/super-creators/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 521 行（含大量 Product Hunt 页面噪声）

### `raw/articles/product-research/softr-ai-app-builder.md`
> Softr AI app builder 页面：用自然语言生成 business apps / portals / internal tools，同时保留角色、权限、安全、数据库和 workflow 的视觉控制。信号：no-code builder 正从 template-driven 转向 AI co-build
- 关键概念：[genui](/wiki/concepts/genui/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 22 行

### `raw/articles/product-research/google-vantage-future-ready-skills.md`
> Google Research Vantage：用 AI avatars + Executive LLM + AI Evaluator 评估 critical thinking / collaboration / creative thinking 等 durable skills；NYU 研究显示 AI scorer 与 human experts 一致性接近 expert-expert；重点是把难测的人类软技能转成可控模拟场景
- 关键概念：[multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [self-verification](/wiki/concepts/self-verification/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 78 行

### `raw/articles/startup/ai-founder-fundraising-guide.md`
> 石头看未来 3.5 万字 AI 创业者融资指南。覆盖融资基础、资本故事、BP、投资人筛选、FA、TS/DD/IC/SPA/Closing、核心条款、控制权、回购/对赌、海外架构、投后关系和融资宣传。可作为 Agora/BENZEMA 融资准备参考材料
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [super-creators](/wiki/concepts/super-creators/)
- 约 1475 行

### `raw/articles/startup/reflecting-on-billion-dollar-company-failure.md`
> 创业者复盘未能打造十亿美元公司的经历：从周末项目到 VC-backed startup，再到精简团队/生活方式业务，讨论 impact、financials、value creation/capture 与非二元成功路径。可用于平衡 VC-scale 叙事与可持续公司叙事
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [super-creators](/wiki/concepts/super-creators/)
- 约 198 行

### `raw/articles/genui/developers-guide-to-genui-2026.md`
> CopilotKit《The Developer's Guide to Generative UI in 2026》：Generative UI = Agent 在运行时影响界面，UI 随上下文变化；拆解三种实用模式，底座用 AG-UI 协议，并对比 A2UI / Open-JSON-UI / MCP Apps 等 UI spec。是"对话沉淀成可用应用"方向的实操向材料
- 关键概念：[genui](/wiki/concepts/genui/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 447 行

### `raw/articles/genui/towards-defining-genui-design.md`
> 学术论文《Towards a Working Definition of Designing Generative User Interfaces》（Kyungho Lee, UNIST, 2025，含中英对照）：通过 127 篇文献综述 + 18 位专家访谈 + 12 个案例，为"生成式 UI 设计"建立工作定义，提出五大核心主题，归纳混合创作 / 策展式 / AI 辅助优化三种设计模型，并讨论伦理、评估标准与交互模型
- 关键概念：[genui](/wiki/concepts/genui/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 263 行

### `raw/articles/genui/personal-website-design-inspiration-2026-08-04.md`
> 用户收藏的 12 个个人网站设计参考（2026-08-04 ingest）：覆盖 Windows / Mac 桌面、terminal、3D 房间、Game Boy、笔记球体、影像网格等完整交互隐喻。共同价值不在单个动效，而在世界隐喻、内容架构、交互语法、感官反馈与个人身份的一致性；适合作为 VibeCoding / GenUI 的参考语料与浏览器验收基线，而非单站像素复制模板。
- 关键概念：[genui](/wiki/concepts/genui/), [creative-agent-design](/wiki/concepts/creative-agent-design/)
- 约 71 行

### `raw/articles/即梦设计原则？.md`
> StoryCode Studio 界面 Design Tokens / CSS 样式表：定义背景色、文字色、字体、间距、圆角等设计 token，深色主题
- 关键概念：[genui](/wiki/concepts/genui/)
- 约 266 行

### `raw/Inbox/Cola_0.3.10_Deep_Analysis.md`
> Cola 桌面 AI Agent（MarsWave，Electron 40，macOS arm64）v0.3.10 深度逆向分析报告：覆盖整体架构、Electron 主进程、Renderer 前端、内置 server、LLM provider 集成、Agent Runtime & MOD 系统、MCP 集成、浏览器自动化、端侧语音模型、35 个 Skills、CLI 工具、原生模块
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/), [agent-loop](/wiki/concepts/agent-loop/)
- 约 1335 行

### `raw/articles/Cola_0.3.10_Deep_Analysis.md`
> 同一 Cola v0.3.10 逆向分析的英文原始版本；与 `raw/Inbox/Cola_0.3.10_Deep_Analysis.md` 的中文版本并存，均作为 immutable source 保留，不把两个语言版本误计为两项独立产品证据。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/), [agent-loop](/wiki/concepts/agent-loop/)

### `raw/papers/context-engineering/in-place-test-time-training-clipping.md` + `raw/papers/context-engineering/In-Place Test-Time Training.pdf`
> arXiv:2604.06169「In-Place Test-Time Training」。空剪藏对应论文 PDF，已补充下载。论文提出把 LLM MLP block 的最终 projection matrix 作为 inference-time fast weights，以 next-token-prediction 对齐的目标和 chunk-wise update 实现 drop-in TTT；4B 模型可在 128k context 任务中提升表现
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-memory](/wiki/concepts/agent-memory/)
- PDF：约 1.1MB

### `output/reports/recent-clippings-2026-04-27.md`
> 本批 30 条剪藏的主题整理报告。将材料压缩为五条判断：Harness 平台化、Agent 平台从聊天入口转向连接器/能力市场、Agent Economy 进入真实世界压力测试、协议层分化为通信/工具/支付/安全、Benchmark 从静态分数转向真实任务时间/运行环境/可观测性。附完整归档路径表和 wiki 回流候选
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-communication](/wiki/concepts/agent-communication/), [agent-runtime](/wiki/concepts/agent-runtime/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 3000 字

### `output/reports/openai-ryan-lopopolo-extreme-codex-experiment.md`
> 用户查询「OpenAI Ryan Lopopolo 的极端 Codex 实验是什么？」的归档解释。核心结论：这不是普通 vibe coding，而是 OpenAI Frontier 把真实内部 beta 产品改造成 Codex-first / agent-legible 生产线；约五个月、1M+ LOC、数千 PR、0 human-written code、0 pre-merge human review。重点方法包括 fast build loop、skills/docs/tests/quality scores、observability、Symphony 多 agent orchestration、ghost libraries；关键洞察是 token 不是瓶颈，人类同步注意力才是瓶颈
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [spec-driven-development](/wiki/concepts/spec-driven-development/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)
- 约 2500 字

### `output/reports/agora/04-business-model/agora-financial-model.md` + `output/reports/agora/04-business-model/agora-financial-model.xlsx`
> Agora BP financial model 工作稿。将 Agora 建模为 Agent 能力包 marketplace + creator tooling + trust/settlement infrastructure；核心收入为 10-13% marketplace take rate、creator SaaS/certification、platform-owned lighthouse packages。Base case：Y5 GMV $1.32B、net revenue $183.1M、Y4 EBITDA 转正；Seed $5M 主要验证供给/迁移/复购，base case 需 12-18 个月启动 Series A。附 conservative/base/upside 三情景与 Seed 里程碑
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [super-creators](/wiki/concepts/super-creators/)
- 约 3500 字 + Excel 模型

### `output/reports/agora/03-product/agent-vm-project-analysis.md`
> 用户查询 private repo `xz1220/Agent-VM` 的归档分析。Agent VM 是 AI Coding Agent 时代的 nvm：用本地 Go CLI 管理可迁移 Agent Profile，并将角色、工具、权限、模型设置和 memory refs 渲染到 Codex、Claude Code、Cline、Cursor。项目已实现 init/agent/env/use/status/sync/memory/export/import、adapter contract、managed activation、mapping status 和多 runtime adapters；Phase 3 portable memory 与 Phase 4 team registry 尚未完成
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [agent-memory](/wiki/concepts/agent-memory/), [skills-system](/wiki/concepts/skills-system/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 3000 字

### `output/reports/agora/02-market-competition/claude-blog-2026-04-insights-for-agora.md`
> Claude 2026-04 blog 阅读 memo。核心判断：Anthropic 正把 Claude 推成 Agent OS（Claude Code 工作台、Managed Agents 云端 runtime、MCP/connectors 接入层、Skills 能力上下文、Memory 跨 session 学习、Routines 事件触发、多 agent pattern），因此 Agora 不应讲成又一个 runtime，而应定位为第三方 Agent 能力包的 Publisher + Installer + Verification + Update + Distribution + Billing layer。建议将能力包 v0.1 做成兼容 Claude Skills / MCP / Agent-VM / Routines 的 manifest，核心壁垒放在 canonical tests、compatibility matrix、install doctor、failure attribution 和 supply-chain security；商业模式从卖文件转为卖持续可运行性
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [harness-engineering](/wiki/concepts/harness-engineering/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 3200 字

### `output/reports/agora/01-narrative/agora-bp-claude-observation-card.md`
> 插入 Agora BP 主文第 3 节后的非正文观察卡。用侧栏 memo 方式总结 Claude Blog 对 Agora 的旁证：Claude 正把 Agent 做成生产系统，通用 runtime 会被模型厂上移吃掉；Agora 应聚焦第三方 Agent 能力如何成为可交付商品。卡片将能力包拆成 skill、MCP、runtime adapter、memory schema、routines、tests、pricing、manifest.lock，并强调 canonical tests、持续可运行性和 supply-chain security 是产品与工程壁垒
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 1600 字

### `output/reports/agora/02-market-competition/agent-capability-distribution-investment-landscape-2026-04.md`
> 用户查询 Agent 能力分发相关项目、产品与投资标的的归档研究。基于 Agora BP，将市场拆成 runtime/registry/tool execution/builder/marketplace/settlement 六层，筛出 AgentSky、Smithery、Manufact、Composio、Arcade、Pipedream、Apify、Dify、n8n、Gumloop、LangChain、Browserbase、Skyfire、Stripe ACP、x402 等项目；补充中美 VC 已投标的：美国 VC 重仓 LangChain/n8n/Gumloop/Composio/Arcade/Manufact/Browserbase/Paid/Manus，相邻层居多；中国/华人 VC 更集中在 Dify、Manus、Flowith 等 workflow builder / Agent OS / 应用入口。核心结论是 Agora 不应做通用 agent store 或 MCP directory，而应定位为跨 runtime Agent Capability Package 的发布、安装、验证和结算层
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [tool-routing](/wiki/concepts/tool-routing/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 472 行

### `output/reports/agora/03-product/avm-shared-agent-profile-research.md`
> 用户查询基于 AVM Agent Profile 让分享出去的 Agent 可被别人访问是否值得做。核心判断：值得尝试，但不应做成 GPT Store clone 或直接开放私人 Agent；应先把 AVM profile 编译成可发布、可安装、可审计的 Agent Capability Package，支持 manifest、redaction、runtime compatibility、resource binding、canonical tests、agent-card.json，再逐步加入 hosted protected step 和可远程调用的 A2A/MCP live endpoint。MVP 建议从 repo-onboarding / code-review / llm-wiki-query 这类低权限 profile 开始
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 530 行

### `output/reports/agora/02-market-competition/user-a-use-user-b-agent-product-landscape-2026-05.md`
> 用户查询 "用户 A 直接使用用户 B 的 Agent" 的产品形态、计费和确权。调研 Poe API Bots / Server Bots、Apify Store、Relevance AI Marketplace、Smithery、OpenAI Workspace Agents、GPT Actions、Claude Skills、Dify、Hugging Face Spaces、AWS Agent Registry，以及 Arcade/Composio/Pipedream/Zapier 等 auth substrate。核心结论：真正成熟的开放式 live local/BYOC agent marketplace 还没有；市场只拼出了 self-hosted endpoint、platform runtime、org registry、installable capability 四类局部形态。Agora/AVM 应做 mode-aware capability marketplace，用 entitlement、delegated auth、event ledger、hosted protected step 和 local worker 组合解决计费/确权
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [tool-routing](/wiki/concepts/tool-routing/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 412 行

### `output/reports/agora/02-market-competition/user-a-use-user-b-agent-deep-research-feishu-2026-05.md`
> 用户要求深度研究能让用户 A 使用用户 B Agent 的产品，并写成飞书文档（Feishu: https://www.feishu.cn/docx/E3mldxaLioPiQcxh2xSc1gelnaf）。深度版补充 Poe API Bots / Server Bots、Apify、Relevance AI、Smithery、Agent.ai、OpenAI Workspace Agents、Notion Custom Agents、Claude Skills、Dify、Hugging Face Spaces、AWS Agent Registry、A2A/AGNTCY 及 auth substrate。核心判断：市场尚无成熟开放式 live local/BYOC agent marketplace；现有产品分别验证 self-hosted endpoint monetization、event/result billing、project-scoped entitlement、MCP connection、workspace RBAC/credits 和 delegated auth。对 Agora/AVM 的建议是三阶段：installable profile package → hosted protected step → live Agent endpoint，并用 event ledger 处理 entitlement、credential subject、metering、failure attribution、refund 和 payout
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [tool-routing](/wiki/concepts/tool-routing/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 930 行

### `output/reports/agora/02-market-competition/slock-agentrq-like-products-and-external-notes-2026-05.md`
> 用户在 Slock / AgentRQ 基础上继续寻找类似产品，并要求顺手找到别人已有的研究记录；内容已追加到飞书人工记录表（Feishu: https://www.feishu.cn/docx/REaCdaPqVouYm4xl5ZVc2MOZnYe）。补充研究将产品收窄到 agent-native collaboration / remote control / HITL layer，筛出 Slock、AgentRQ、Hiloop、Marmy、Ticlawk/agent-freeway、HiClaw、AgentGate、askHuman、Lassare、Mycelium、Agensi、NEXUS、Apify MCP 等。外部记录包括 Slock slides、42章经/Podwise 访谈、AgentRQ Reddit dogfooding、Marmy/Ticlawk 社区讨论、OpenClaw 技术拆解与 PRISM/ClawSafety/ClawWorm 安全论文、ChatCollab/SlackAgents 学术参考、MCP monetization 横向文章。核心建议：MVP 应定位 Authorized Remote Agent Session，先做 B-side runtime exposure + bounded lease + cost ledger + attention layer，而不是泛 agent marketplace
- 关键概念：[agent-native-im](/wiki/concepts/agent-native-im/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [tool-routing](/wiki/concepts/tool-routing/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 360 行

### `output/reports/agora/02-market-competition/agent-ai-deep-research-2026-05.md`
> 用户要求深度研究 Agent.ai，并判断其对 "A 使用 B Agent，B Agent 跑 B 环境，A 需 B 授权，推理费由 B 支付" 场景的意义；内容追加到飞书人工记录表（Feishu: https://www.feishu.cn/docx/REaCdaPqVouYm4xl5ZVc2MOZnYe）。报告将 Agent.ai 拆成三层：professional agent marketplace / no-code Agent Builder / API+MCP surface。重点分析 Agent listing/function schema、Agent Packs 的 orchestrated pipeline + granular step actions、OpenClaw Pack、MCP server OAuth 2.1 + PKCE + DCR、credits/Pro/Premium 计费、builder visibility、public agent policy 和 security/privacy 边界。核心判断：Agent.ai 是 P0 样板，值得学 listing schema、Agent Pack、MCP export、Agent Requests，但它默认是 Agent.ai 平台 runtime，不是 B 本地/BYOC agent 授权给 A 的完整方案；公开资料也没有看到 creator payout、B-paid run ledger 或 event billing
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 440 行

### `output/reports/agora/02-market-competition/conversation-to-content-consumer-products-2026-05.md`
> 用户查询是否存在面向用户和 Agent 对话结果的消费级产品：两方对话得出结论后整理成 content 并发布。报告将市场拆成四类：AI interview / voice-to-content（ContentPod、Meet Sona、Outerview、Voicenotes、TalkToPost/RambleFix）、AI research/chat-to-page（Perplexity Pages、Genspark、NotebookLM、Claude Artifacts）、meeting/conversation capture-to-summary（Granola、PLAUD、Fathom/Fireflies/Otter）、content repurposing/scheduler（Typefully、Taplio、Hypefury、Castmagic、OpusClip）。核心判断：最贴场景的是 voice/dialogue-first content creation；大机会不是普通 AI 写作，而是 Conversation Result Compiler，即从对话中提取结论、证据、反驳、金句和敏感上下文，编译成多平台可发布内容包并保留来源与发布记录
- 关键概念：[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [agent-communication](/wiki/concepts/agent-communication/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 560 行

### `output/reports/agora/02-market-competition/agent-artifact-community-products-2026-05.md`
> 用户查询是否存在将 Agent 对话生成的 Artifact 聚合展示成社区的产品，例如 HTML / Three.js / Canvas 形式的 3D 战斗机横切图。报告将市场拆成 Claude Artifacts 官方发布/发现、第三方 Claude artifact curator、Websim / v0 / Lovable / Bolt / Replit 等 AI-built web/app 社区、Promptarium 这类跨工具 HTML artifact gallery，以及 Hugging Face Spaces 等 runnable demo host。核心判断：已有相邻产品，但尚未出现跨 Claude/ChatGPT/Codex/v0/Bolt/Lovable/Replit Agent 的统一 interactive artifact registry；机会在 runnable preview、prompt provenance、source/package、remix lineage、safety scan、export/install
- 关键概念：[genui](/wiki/concepts/genui/), [skills-system](/wiki/concepts/skills-system/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 260 行

### `output/reports/generative-ui-landscape-2026-05.md`
> 用户查询：将 Agent 对话沉淀成可用应用需要的 Generative UI 全景。5 路并行深研究合成：30+ 篇论文（LLM-driven UI 生成、screenshot-to-code、adaptive UI、tool-augmented UI、agent UI 共设计、评估 6 方向）；25+ 个产品分 4 桶（registry SDK：Vercel AI SDK / Tambo / Thesys C1 / CopilotKit + AG-UI / assistant-ui / LangGraph；artifact / sandbox：Claude Artifacts / ChatGPT Canvas + Apps SDK / Gemini Canvas + A2UI / v0 / Bolt / Lovable / Replit Agent 4；agent-native panel；企业 no-code）；3 套互补协议（AG-UI / A2UI v0.9 / MCP Apps）；高密度博客 30+ 篇分 6 主题；推文 8 主题。28 个评估指标分 7 个家族 + 6 层评估栈 + 10 条评估空白。核心判断：Chat-only 已成局部最优共识；typed component registry 是 in-app GenUI 事实基线；Skills 是新 style guide；GenUI 是 harness 问题不是模型问题。三家 lab 收敛到"agent 写一个小 app + 原地迭代"。对 BENZEMA 的启发：不做又一个全代码生成 builder / 不做又一个 HTML artifact 平台 / 不重写 streamUI；真正空白是"对话 → 结构化 UI intent + 你家组件 registry + 跨次复用沉淀"——Promptarium + Tambo + Anthropic Skills 三者交集
- 关键概念：[genui](/wiki/concepts/genui/), [skills-system](/wiki/concepts/skills-system/), [context-container](/wiki/concepts/context-container/), [harness-engineering](/wiki/concepts/harness-engineering/)
- 约 600 行

### `output/reports/genui-product-shortlist-2026-07.md`
> GENUI 产品 shortlist（2026-07-01 query）：从已有全景研究继续筛选“有成熟生成品味、规则、整合，且生成结果明显可用”的产品。P0 推荐 OpenUI / Thesys C1、Tambo、Figma Make、v0；P1 推荐 Claude Artifacts + Skills、Retool AI AppGen、Power Apps Generative Pages、Builder Fusion；Replit Agent 4 / Lovable 作为 app builder 对照组。核心判断：Creative CoWork GENUI 最像“Skills/tools 定义能力 + Sandbox 定义状态 + component registry 定义可展示界面 + agent emits structured UI intent + renderer 组合可信组件”
- 关键概念：[genui](/wiki/concepts/genui/), [skills-system](/wiki/concepts/skills-system/), [harness-engineering](/wiki/concepts/harness-engineering/), [context-container](/wiki/concepts/context-container/)
- 约 210 行

### `output/reports/illospace-project-analysis.md`
> 用户查询 Illospace/illospace GitHub 项目在做什么。核心判断：Illospace / Illo Brain 是一个 self-hostable human-agent workspace / Agent OS 开源预览版，整合 FastAPI backend、SvelteKit dashboard、PostgreSQL/pgvector memory、skill bundles、vault secrets、Cortex thought threads、browser/tool execution、AgentRuns dashboard、recurring cycles 和 MCP Brain server。它不像单一 agent SDK，更像 agent runtime control plane；值得从 skill bundle、runtime observability、vault/team permissions、MCP memory service 等方向继续研究
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [agent-memory](/wiki/concepts/agent-memory/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 3000 字

### `output/reports/agora/02-market-competition/canteen-agora-circle-arc-research.md`
> 用户查询 `https://agora.thecanteenapp.com/` 的归档研究。核心判断：Canteen Agora 是 Circle Arc mainnet 前的 agentic markets builder funnel，也是 Canteen 将研究文章、RFB、hackathon、导师网络和潜在投资线索串起来的 deal-flow engine；重点不是普通交易 bot，而是 stablecoin-native agents、prediction market stack unbundling、x402 / USDC nanopayments、Polymarket builder attribution 和 capability event ledger。对 BENZEMA Agora 的启发是强化能力包的 attribution、settlement、receipt、failure attribution 和 RFB 冷启动机制
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [agent-communication](/wiki/concepts/agent-communication/), [tool-routing](/wiki/concepts/tool-routing/), [agent-runtime](/wiki/concepts/agent-runtime/)
- 约 7200 字

### `output/reports/agora/02-market-competition/llm-early-website-builder-hype-faded-2026-05.md`
> 用户查询 "为什么 LLM 初期的建站热，后面没有了" 的归档分析。核心判断：建站热不是消失，而是从 "一句话生成网站" 的 demo 品类分裂成 AI app builder、interactive artifact、business workflow builder、conversation-to-content / research-to-page 四条线；网页 scaffold 很快商品化，真正难点转向数据、权限、支付、部署、维护、分发、转化和长期更新。产品启发是避免定位为 AI 建站，而应上移到可运行、可迭代、可分发、可信的软件对象
- 关键概念：[genui](/wiki/concepts/genui/), [harness-engineering](/wiki/concepts/harness-engineering/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 1900 字

### `output/reports/agora/02-market-competition/agent-output-sharing-platforms-2026-05.md`
> 用户查询是否存在 "用户基于 Agent 拿到产物之后的产物分享平台" 的产品图谱。结论：已有很多局部形态，但没有统一的跨 Agent / 跨工具默认平台；最贴近的是 Websim 和 YouWare，最贴近跨工具导入的是 Promptarium，最正统的对话 artifact 是 Claude Artifacts，最成熟的 runnable demo infrastructure 是 Hugging Face Spaces，v0/Lovable/Replit/Spawned/MakerPad 则偏各自生态内的 AI-built app/template showcase。真正机会是 Interactive Agent Artifact Registry：artifact object model、secure runnable preview、prompt/source/model provenance、remix lineage、distribution 和 creator economy
- 关键概念：[genui](/wiki/concepts/genui/), [skills-system](/wiki/concepts/skills-system/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 3500 字

### `output/reports/agora/01-narrative/benzema-startup-story-2026-05-14.md`
> 用户要求从头梳理 BENZEMA 创业故事。报告将 Creative CoWork、LLM Wiki / convo-wiki、Knowledge Agent Network、Agent Economy / Agora、AI Chronicle、NightShift 重新收敛到同一条主线：AI 时代真正稀缺的是把少数 power user / creator / researcher 调出来的 workflow、上下文、工具、权限、测试和失败经验编译成可复用能力对象。核心建议是对外不要讲成通用 Agent Store、加密 skill 包或新 runtime，而应讲 Agent Capability Package：turning expert AI workflows into installable products。当前最强产品落点是 Agora，最大缺口是真实付费能力包闭环
- 关键概念：[super-creators](/wiki/concepts/super-creators/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 5200 字

### `output/reports/agora/01-narrative/benzema-startup-story-twitter-thread-2026-05-14.md`
> 用户要求把 BENZEMA 创业故事改写成 Logseq / CLI 风格的推文，并结合既有产品调研重新构思故事线。输出将 Claude Artifacts / Websim / YouWare / Promptarium、Poe、Apify、Relevance AI、Smithery、Agent.ai 各自验证的产品原语汇总成一个叙事：市场不缺 Agent 分发，而缺帮助生产方把能力产品化和交易化的表达语言。主推 thread 以 `can do != can sell` 开头，把 workflow → package、prompt/tool → callable schema、quality claim → canonical test、usage → event ledger、price → entitlement/payout 拆成 CLI 风格动作，并强调 Agora 应是 third-party Agent capability 的 productization + transaction layer
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [genui](/wiki/concepts/genui/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 3300 字

### `output/reports/agora/01-narrative/agent-shopify-product-story-2026-05-14.md`
> 用户要求结合之前调研的产品，从 "Agent 的 Shopify" 角度重新构思创业故事，重点是帮助生产方产品化和交易。报告将 Claude Artifacts / Websim / YouWare / Promptarium、Agent.ai、Poe、Apify、Relevance AI、Smithery、OpenAI Workspace Agents、Stripe ACP 等产品原语串成新叙事：市场不缺 Agent 分发入口，缺的是生产方从 "can do" 到 "can sell" 的产品化后台。核心视角包括商品页不是介绍页而是运行合约、交易的不是 Agent 而是重复完成任务的概率、产物社区解决展示但能力商店解决复用生产方式、MCP 解决连接但不解决交易、生产方应被视为 merchant。推荐产品形态是 Producer Console：Workflow Compiler、Storefront Builder、Permission Designer、Test Lab、Pricing Studio、Install Doctor、Event Ledger、Payout / Support
- 关键概念：[super-creators](/wiki/concepts/super-creators/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 5200 字

### `output/reports/agora/02-market-competition/smithery-commercialization-2026-05-15.md`
> 用户查询 Smithery.ai 的商业化、平台收费和创作者赚钱方式。报告结论：Smithery 目前更像 MCP registry + Connect/Gateway SaaS，而不是 creator marketplace；公开 pricing 为 Hobby Free（50K RPC/月、3 namespaces）、Pay as you Go（$10/月，100K RPC credits，之后 $0.10/1K RPC，100 namespaces）和 Custom（rate limits、SLA、Slack support）。创作者没有看到内置 paid server checkout、revenue share、payout 或 entitlement，赚钱主要靠外部 SaaS/API 订阅、自托管 paid endpoint、license key/Stripe 自行校验，或把 Smithery 当获客与信任渠道。对 Agora 的启发是 MCP 解决连接，不解决交易；机会在 producer / merchant layer：listing contract、canonical tests、entitlement、event ledger、pricing studio、payout/refund/failure attribution
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 2600 字

### `output/reports/agora/02-market-competition/vercel-skills-sh-commercialization-2026-05-15.md`
> 用户查询 Vercel 的 skills.sh 是否有商业化部分以及如何做。报告结论：skills.sh 目前不是 creator marketplace，没有看到 paid skill、checkout、creator payout、revenue share 或 take rate；它更像 Vercel 的 agent ecosystem wedge，用开放目录、`npx skills` CLI、匿名 install telemetry、official skills、安全审计和 API key gate 占据 agent context package manager 入口。商业化路径是间接的：让 agent 更容易接入 Vercel AI Gateway、AI SDK、Deploy、Workflow、Microfrontends 等产品，带动 Vercel Pro/Enterprise/usage billing；同时通过 Gen/Socket/Snyk 安全审计 partnership、API/telemetry feed 和 future private registry / enterprise policy 积累 trust/data/control layer。对 Agora 的启发是不要只复制免费目录，而应补 paid protected steps、entitlement、event ledger、pricing studio、payout/refund/failure attribution
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [tool-routing](/wiki/concepts/tool-routing/), [safe-autonomy](/wiki/concepts/safe-autonomy/)
- 约 2600 字

### `output/reports/agora/02-market-competition/phbench-product-hunt-series-a-2026-05.md`
> 用户查询 arXiv:2605.02974 / PHBench 论文在讲什么。报告解释其将 Product Hunt 2019-2025 年 67,292 条 featured launches 与 Crunchbase Series A records 做 domain matching，构造 18 个月内 Series A 预测 benchmark；核心结论是 Product Hunt launch-day 信号有统计预测信息，但正例仅 0.78%，test AP 0.037 / F0.5 0.097，不能被读成精准融资预测器。重点解读 61 个 tabular features、maker/team × engagement 交互项、B2B/API/Payments/Fintech topic signal、ML champion vs zero-shot Gemini、validation selection bias、Crunchbase/domain matching bias，以及对 capability marketplace 排名应做 outcome-linked ranking 的启发
- 关键概念：[communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 4900 字

### `output/reports/agora/03-product/skill-creator-monetization-mvp-2026-05-17.md`
> 用户要求逐项评估帮助 Agent Skills 创作者赚钱的功能清单，并判断 MVP 重点和后续调研。报告结论：不能只做上传 skill + 付款 + 下载的 marketplace，而应先做 Skill Producer Console + Curated Paid Storefront，跑通 workflow → capability package → listing contract → install/smoke test → payment/entitlement → support/update → payout。逐项评估了私域/公域、定做/广告/订阅/单次调用、评测/可视化数据、消费者/创作者前端、后端性能、支付与多收费、安全、流量运营和创作者成长；推荐 P0 包括 creator onboarding、listing contract、pricing/checkout、entitlement、Install Doctor v0、smoke tests、payout、安全扫描和售后退款
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [super-creators](/wiki/concepts/super-creators/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 7000 字

### `output/reports/xz1220-companion-test-2026-05-18.md`
> 对 GitHub 项目 xz1220/companion 做了一次以 Claude CLI 为主的安装/行为验证，重点检查 personal-context 写入、跨 session 主动问候、危机处理入口和 Codex 兼容性。核心结论：项目方向和交互哲学不错，但当前规格与验证文档不一致；最关键的问题是 `sensitive` note 在 `SKILL.md` 中被定义为永不主动提起，却又被 README/PRD/verification 当作 breakup 场景跨 session 主动问候的基础。此外 README 对 Codex 只提供 clone 安装，没有 always-on 注入方案，因此“支持 Codex”这一点尚未真正成立
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [agent-memory](/wiki/concepts/agent-memory/), [spec-driven-development](/wiki/concepts/spec-driven-development/)
- 约 180 行

### `output/reports/agora/05-fundraising/the-founders-playbook-05062026-v3-zh.md`
> 用户要求翻译本地 PDF `The-Founders-Playbook-05062026_v3.pdf`。译文完整保留原书结构：2026 年 AI 原生创业生命周期、构想/MVP/发布/规模化四阶段目标与退出标准、Claude Chat / Claude Cowork / Claude Code 的分工，以及 founder attention、agentic coding、CLAUDE.md 持久上下文、PMF 度量、安全合规、GTM 和数据/工作流 moat 的阶段性操作建议
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [spec-driven-development](/wiki/concepts/spec-driven-development/), [agent-runtime](/wiki/concepts/agent-runtime/), [communication-to-economy](/wiki/connections/communication-to-economy/)
- 约 29000 字

### `output/reports/frontend-vibe-coding-practices-2026-05.md`
> 用户要求深度搜索前端 vibe coding 的实践技巧。报告基于 v0、Lovable、Bolt、Replit Agent、Figma Make、Claude Code、Codex、Cursor 相关官方文档和前端验证/安全资料，结论是前端 vibe coding 的核心不是一句话生成页面，而是把产品判断、设计 taste、验收标准和安全边界编译成 agent 可执行工作流。实践框架包括 Agent Brief、先问问题/plan、组件和状态小步迭代、截图/Figma/真实数据作为视觉锚点、390/768/1440 多断点浏览器验证、Playwright/Storybook visual QA、a11y 与安全 checklist，以及面向 BENZEMA 的 Frontend Skill Pack 机会
- 关键概念：[genui](/wiki/concepts/genui/), [harness-engineering](/wiki/concepts/harness-engineering/), [context-engineering](/wiki/concepts/context-engineering/), [spec-driven-development](/wiki/concepts/spec-driven-development/), [self-verification](/wiki/concepts/self-verification/)
- 约 8800 字

### `output/reports/frontend-agent-ui-freeze-logic-workflow-2026-05.md`
> 用户困惑于“先做好前端 UI，再让 AI 实现互动逻辑”时 Agent 经常改动已有前端代码并引入问题。报告基于 Addy Osmani、Simon Willison、Matt Pocock、Storybook/Frontman/Vercel/WyeWorks 文章和 2026 agent coding 研究，结论是问题不是 prompt 不够清楚，而是缺少 UI frozen / logic editable / visual verifiable / diff auditable 的工程边界。建议将 UI 变成 Storybook stories、Playwright screenshots、props contract 等冻结契约，把交互逻辑放到 hooks/controllers/services，要求 Agent plan-first、限制可编辑文件，用视觉回归和行为测试验收，并由前端开发者优先检查 touched files、diff shape、visual evidence、test quality 和越权改动
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [spec-driven-development](/wiki/concepts/spec-driven-development/), [self-verification](/wiki/concepts/self-verification/), [context-engineering](/wiki/concepts/context-engineering/), [genui](/wiki/concepts/genui/)
- 约 8000 字

### `output/reports/agora/03-product/conversation-wiki-compiler-product-spec.md`
> Conversation Wiki Compiler 产品文档 v0.1（2026-04-08）：一个跑在本地的 agent，持续把你与所有 AI 工具的对话 + 附件 + 已有笔记自动编译成 Karpathy 式 LLM Wiki，本地优先、云为可选。历经 4 天 6 次 framing pivot 后收敛，号称同时满足"与 18 竞品不重叠 / 不撞大厂路线图 / 用户已自验 / 一句话讲清 / 与 wiki-mcp-server 串联 / 与 LLM Wiki 方法论对齐"六条
- 关键概念：[llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [agent-memory](/wiki/concepts/agent-memory/)
- 约 441 行

### `output/reports/agora/03-product/conversation-wiki-fusion-spec.md`
> Conversation Wiki Fusion 产品文档 v2（2026-04-09）：在 compiler v1 + v0.0.1-0.0.4 四次实跑后，融合 MemPalace 的 "auto-capture + perfect fidelity" 与 AK LLM Wiki 的 "LLM-compiled + human-curated"，把产品从"convo-wiki 小工具"升级为"个人记忆 + 知识 + 身份统一基础设施"，并自动提取行动轨迹与身份画像。含用户本地实测数据（~/.claude 246 个 JSONL / 178MB、~/.codex 148 文件 / 82MB 完全未组织）
- 关键概念：[llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/), [agent-memory](/wiki/concepts/agent-memory/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)
- 约 624 行

### `output/reports/agora/03-product/gbrain-lessons-for-convo-wiki.md`
> 实读 garrytan/gbrain repo（2026-04-11）后对 convo-wiki 的升级建议：5 学 3 不学。学——Compiled Truth + Timeline 分离（entity 级）、Dream Cycle 夜间自动整理、每条消息 entity detection 持续 ingest、Thin Harness Fat Skills、Diarization；不学——PGLite/Postgres 存储、向量嵌入搜索、Supabase 远程部署（保持 markdown + git 本地优先）
- 关键概念：[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [harness-engineering](/wiki/concepts/harness-engineering/), [agent-memory](/wiki/concepts/agent-memory/)
- 约 265 行

### `output/reports/genui-mvp-spec-2026-05.md`
> GenUI 技术边界探索 Lab（2026-05-29）：在同一个 chat host 里并排实现 GenUI 四条主流技术路线（Track 1/2/3/4），用同一批"刁难 prompt"去跑，亲手撞每种方案的天花板（能干什么 / 在哪崩 / 多快 / 安不安全 / 能不能改）。控制变量法，Next.js + Vercel AI SDK，定位技术探索 Lab 而非产品 MVP，预计 3-5 天
- 关键概念：[genui](/wiki/concepts/genui/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 176 行

### `output/reports/a2a-agent-communication-master-index-2026-05-31.md`
> A2A & Agent 通信主索引与深度评述（2026-05-31 query）。把分散在 raw/wiki/output 三层、50+ 个文件里的素材整理成可导航全图，按 8 大簇组织：协议与标准（MCP/A2A/ANP/AGNTCY/UCP/AP2/x402 + FIPA ACL）、学术（7 种通信模式 + 30 篇分级论文）、产品格局（大厂四巨头 + 中国四强 + BYOC 长尾）、框架层（OpenAI SDK/AutoGen/LangGraph/CrewAI）、经济与支付、分发与能力包（Agora 产品线）、网络与 KAN、未来综合。深度评述给出脊柱因果链、3 组核心张力（MCP 是否吃掉 A2A / 协议层 vs management 层 / 中美脱节）、6 大全栈空白、推荐阅读路径、lint 矛盾建议（concept"A2A/MCP 叠加" vs enterprise-landscape"不押 A2A"）。本文是 maps/agent-communication 的反向素材索引
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [communication-to-economy](/wiki/connections/communication-to-economy/), [agent-communication](/wiki/maps/agent-communication/)

### `output/reports/ai-era-product-research-iteration-2026-05-31.md`
> AI 时代产研迭代综合（2026-05-31 query）。提炼 5 场访谈/演讲：Cat Wu（产品迭代月→周→天、先于模型造产品、just do things）、Fiona Fung（瓶颈从编码转向"编码周边的一切"、design doc 先行已死、Claudify everything、验证加倍）、Alex Albert（能力在预训练前押注、模型–harness 耦合、可逆决策免费）、Jenny Wen（设计流程已死、mocking 60-70%→30-40%、taste/product sense 取代视觉判断、3-6 月方向性原型、非确定性设计）、Tibo Sottiaux & Vijaye Raji（Codex 从工具→队友、4-8 并行 agent、工程师变 agent manager、测试驱动让 agent 必然成功、人保留 taste 与方向）。横向 5 大共识 + Anthropic vs OpenAI 对比 + 6 条 takeaways。来源为视频/播客，完整逐字稿在原链接
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [genui](/wiki/concepts/genui/)

### `output/reports/insforge-agent-native-backend-discussion-2026-06-04.md`
> InsForge 与「Agent 原生后端」本质讨论（2026-06-04 query/discussion）。从 InsForge（面向 AI coding agent 的开源 BaaS，MCP 暴露 auth/db/storage/functions）切入，三轮推演：①AWS 有 CLI/Railway 有 agentic feature 为何还有空间——「有 API」≠「agent 能可靠用」，瓶颈在表面积/不可读报错/状态隐藏/跨服务焊接；②核心纠偏——agent 原生不是「减去人的交互层」（裸 SQL/IAM 是机器原生非 agent 原生），而是三层模型里「换一层为 agent 失败模式设计的工效层」；③这类活的 craft 落点 4 条：可操作报错/整合面坍缩/状态可读/safe-by-default。含 feature-vs-company 诚实反方（赌点=谁拥有 agent build loop + incumbent 结构性慢的楔子）。待办：读源码核实 InsForge 实际落点
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [genui](/wiki/concepts/genui/)

### `output/reports/pi-agent-ecosystem-deep-research-2026-06-08.md`
> Pi agent 生态深度研究（2026-06-08 query，15-agent workflow + 对抗式核实）。Pi = Mario Zechner（badlogic，libgdx 作者）的 `pi-mono` / `earendil-works/pi`，极简 provider-agnostic coding agent harness（MIT），系统提示词 <1000 tokens、核心 4 工具（read/write/edit/bash），驱动病毒级 OpenClaw 与 Cola。四层架构：pi-ai（40+ provider 统一流式 API）/ pi-agent-core（嵌套双循环+steering+压缩+AgentMessage↔Message 分离）/ pi-coding-agent（CLI+扩展+JSONL 树会话）/ pi-tui。① GenUI：无原生 GenUI（无 artifact/声明式 spec/web UI 库），三条构建路径（TUI 扩展 / OpenClaw Live Canvas+A2UI / SDK 包壳 web）；缺口是「agent 生成 UI 的组件库+跨平台规格」而非可组合性/状态。② 魔改：先扩展（20+ 生命周期钩子、TypeBox 工具、APPEND_SYSTEM.md、文件化外置）后 fork；oh-my-pi（27k 行 Rust、32 工具、hashline 编辑省 61% token、LSP/DAP）是 fork 极端样本。③ 创业：harness=commodity，护城河在分发/可移植身份（Pi 0/6 确认缺失）/GenUI 抽象/agent 市场；OpenClaw 是「分发即护城河」证明（22 IM 渠道+memory.md+心跳+养成黏性）。④ 文化：龙虾养成系、心跳机制、「套壳→harness」语义翻转、token 亿万富翁、ghost library、Mario「专制内核+自由分叉」。含多项对抗式校正（22 渠道非 9、生态非荒芜有 pi.dev/packages、A2A 非空白、中国 fork/67% 查无实据低置信度）
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [genui](/wiki/concepts/genui/), [agent-communication](/wiki/concepts/agent-communication/)

### `output/reports/pi-package-ecosystem-analysis-2026-07-17.md`
> Pi package 生态实况与用户行为代理统计（2026-07-17 query）。全量抓取 `pi.dev/packages` 107 页、5,305 条目录记录，并读取全部 npm latest manifest：5,166 个有显式 Pi manifest，5,051 个按当前 schema 有至少一种可加载资源；真实类型以 Extension 为绝对主体（4,718，88.9%），不是 prompt/theme 市场。npm 7 日请求约 97.1 万，但分布高度集中（中位数 24、Gini 0.821、Top 100 占 41.2%），且 downloads 包含 CI、镜像与机器人，不能解释为用户数。热门方向集中在 MCP、Web/research、subagents/orchestration、context/memory、permissions 与代码质量，说明用户主要在为极简 core 补“缺失电池”。同时审计出目录 type badge 47.6% 错漏、115 个 manifest 无当前 schema 可加载资源，以及 monthly spike 对排名的显著污染。附 5,305 行 CSV、metrics JSON、daily 样本、复现脚本与概览图
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [skills-system](/wiki/concepts/skills-system/), [agent-runtime](/wiki/concepts/agent-runtime/), [context-engineering](/wiki/concepts/context-engineering/)

---

## 整理批次（2026-06-13 / kb-organize）

### `output/reports/agora/02-market-competition/china-product-startup-first-funding.md`
> 国内产品型创业第一笔融资深度研究（2026-04-07 query）。8 个融资渠道对比、20 个真实案例、MiroFish 24h ¥3000 万解构、奇绩创坛与个人天使（陈天桥/王慧文）的 super-individual 时代叙事，以及针对 Dongzhe Wiki MCP Server 的 3 条现实融资路径：奇绩创坛（最高确定性）、病毒杠杆（高方差）、Thesis 投资人（真格/锦秋）
- 关键概念：[genui](/wiki/concepts/genui/), [agent-communication](/wiki/concepts/agent-communication/), [world-model](/wiki/concepts/world-model/)

### `output/reports/genui-implementation-gotchas-2026-05.md`
> GenUI 实现级 Gotcha 深度研究（2026-05-29 query）。8 维度并行验证（65 findings：51 confirmed / 13 partial / 1 refuted）。三大跨维 footgun——iframe 沙盒逃逸、DeepPartial undefined 白屏、每 chunk 重发整对象导致 remount。涵盖 AI SDK v5/v6 版本漂移、Claude strict 模式 Zod 限制、流式 UX 缺陷、iframe CSP/postMessage 安全、提示注入钓鱼面、缓存命中率、a11y 真实覆盖率（57% 假阳）、服务端审批机制。针对 Next.js + Vercel AI SDK + Sonnet 4.6 四轨方案
- 关键概念：[genui](/wiki/concepts/genui/), [harness-engineering](/wiki/concepts/harness-engineering/), [tool-routing](/wiki/concepts/tool-routing/), [agent-memory](/wiki/concepts/agent-memory/)

### `output/reports/agora/02-market-competition/personal-knowledge-card-competitive-research.md`
> Personal Knowledge Card 竞品深度研究（2026-04-08 query）。10+ 竞品分析发现真空地带：没有产品同时做到 D3（compiled wiki）+ D5（auto-ingest）+ MCP 暴露；self-use 是红海，真正蓝海是 share-first 的 author-side MCP endpoint（让世界的 AI 在谈到你时自动引用）
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [spec-driven-development](/wiki/concepts/spec-driven-development/)

### `output/reports/agora/03-product/personal-knowledge-card-product-spec.md`
> Personal Knowledge Card 产品定义（2026-04-08 query）。核心 insight：从「build wiki 给别人用」转向「build knowledge card 让自己 AI 用」；自用驱动冷启动；MCP endpoint 为接口；5 人种子网络 → 100 个创作者 → Expert Network 终态
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [harness-engineering](/wiki/concepts/harness-engineering/), [spec-driven-development](/wiki/concepts/spec-driven-development/)

### `output/reports/agora/06-gtm/personal-knowledge-card-launch-posts.md`
> Personal Knowledge Card 产品发布策略（2026-04-08 query）：编译年度研究（19k LOC agent 源码 + 49 篇论文 + 28 个概念）成 MCP server，让 Claude 认识用户背景；核心 insight 是为自己 AI 服务而非他人，share 是副作用，采用即刻→X→Reddit→HN 阶梯式分发
- 关键概念：[llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [agent-memory](/wiki/concepts/agent-memory/)

### `output/reports/agora/02-market-competition/portable-identity-competitive-research.md`
> Portable Identity Layer 竞品深度研究（2026-04-08 query）。10 个竞品 6 维评分矩阵；Epitome/limitless-ai.dev 达 5-5.5/6；Anthropic Import Memory 已压制第三方层；建议 Path A（中文+国产客户端）/ Path B（Identity+Knowledge+Agent Economy 三合一）/ Path C（工具化）
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `output/reports/agora/02-market-competition/okx-agent-marketplace-teardown-2026-06.md`
> OKX Agent Marketplace 产品拆解（2026-06-24 query，对象 okxaionepager.netlify.app）。四层架构：Marketplace(发现橱窗)/Onchain OS(客户端执行)/X Layer(零 gas 结算)/Payment SDK·x402(支付)。两交易模式 A2A(协商+escrow+仲裁) vs A2MCP(pay-per-call 即调即结·无仲裁·建在 x402 上)。三角色 User/ASP/Evaluator(质押 100 OKB·Commit-Reveal·少数方罚 1%·链上信用不可跨钱包)。判断"瓶颈从智能→commerce"成立、x402 赛道 1.19 亿笔/$6 亿年化、12M 钱包冷启动优势；风险=需求侧(用户来炒币)/Evaluator 鸡生蛋/去中心化名不副实/信用绑死钱包。对 Agora=同一"可验证交付"问题的重资产链上解法，信用不可携带正是 portable identity 线的反面锚点
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [self-verification](/wiki/concepts/self-verification/), [super-creators](/wiki/concepts/super-creators/)

### `output/reports/richard-chien/stack.md`
> Richard Chien (stdrc) 完整技术栈深度研究（2026-04-07）：从 OS 抽象到 UX 层的整套 agent 基础设施，agent-vault 356 stars（2 月）、kimi-cli 是 Moonshot 核心，slock.ai 是顶层协作介质，Botiverse 生态对标知识代理网络架构
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [harness-engineering](/wiki/concepts/harness-engineering/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [agent-runtime](/wiki/concepts/agent-runtime/)

### `output/reports/world-model/benchmarks-interactive-video.md`
> 交互视频生成/世界模型 24 个 benchmark 全景（2026-04-06 query）。核心趋势：从视觉指标（VBench 1.0）到世界一致性评估（WorldScore、WCS），从被动测试到主动交互（VP2、GameGen-X SR-C/SR-E），当前模型物理推理缺陷严重
- 关键概念：[world-model](/wiki/concepts/world-model/), [video-agent-workflow](/wiki/concepts/video-agent-workflow/), [agent-loop](/wiki/concepts/agent-loop/)

### `raw/Inbox/设计流程已死-Jenny-Wen-AI设计变革.md`
> Jenny Wen（Anthropic 设计负责人）× Lenny's Podcast（2026-03-01）：AI 工程速度倒逼传统设计流程死亡，设计师从 60% 设计稿时间缩至 30-40%，转向工程师配对与代码协作，人类价值重心从执行转向决策权
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/), [genui](/wiki/concepts/genui/), [harness-engineering](/wiki/concepts/harness-engineering/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)

### `raw/papers/reasoning/LLM-Reasoning-Paper-Index.md`
> LLM 推理论文分级索引（更新 2026-04-06）。涵盖 Chain-of-Thought（Google 2022, 6000+ 引用）、Tree of Thoughts（NeurIPS 2023, 3634 引用）、RAP 与 LATS 等 S/A 级论文，跨越推理搜索与世界模型规划两大主题
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [world-model](/wiki/concepts/world-model/), [self-verification](/wiki/concepts/self-verification/)

### `raw/articles/world-model/functional-taxonomy-of-world-models.md`
> Fei-Fei Li 与 World Labs 论文：世界模型的三层函数分类——Renderer（输出 observation/像素）/ Simulator（输出 state，几何+物理+动力学，是 linchpin）/ Planner（输出 action，渲染器的逆），三者同为 POMDP 循环的投影，趋向统一世界基础模型（原 Clippings 2026-06-13 归档）
- 关键概念：[world-model](/wiki/concepts/world-model/), [agent-loop](/wiki/concepts/agent-loop/), [multi-agent-simulation](/wiki/concepts/multi-agent-simulation/)

### `raw/articles/harness-engineering/claude-code-dynamic-workflows.md`
> Claude Code Dynamic Workflows（2025-05-28 发布）：用 JavaScript 编排脚本替代模型逐轮调度，中间结果留在脚本变量而非主上下文，支持数百 agent 交叉验证；agent()/parallel()/pipeline() 原语 + journal 可恢复；Bun Zig→Rust 迁移（75 万行、11 天、99.8% 测试通过）为核心案例（原 Clippings 2026-06-13 归档）
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-tool-concurrency](/wiki/concepts/agent-tool-concurrency/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [agent-runtime](/wiki/concepts/agent-runtime/)

### `raw/articles/startup/dai-yusen-vc-observation-ep2.md`
> 戴雨森 2026/5 播客：半年后的 AI 创投重新总结，从 coding harness、agent 网络效应、return 问题、大厂组织形态 vs 创业创新、Agent 三步走机会、硅谷 new lab 风潮到中国硬件优先的投资策略；提出「Harness 是 OS、模型是处理器」「好 Harness 的数据反哺模型」（原 Clippings 2026-06-13 归档）
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-communication](/wiki/concepts/agent-communication/), [multi-agent-simulation](/wiki/concepts/multi-agent-simulation/), [genui](/wiki/concepts/genui/)

### `output/reports/kb-organize-lint-2026-06-13.md`
> 知识库整理 + Lint 报告（2026-06-13，18-agent workflow）：索引同步 13 文件、断链 72 处→0（`[[raw/简写]]` 改真实 basename）、孤儿 4 页→0、矛盾 4 处回流（A2A 立场注记 + 「事实标准」下调 + UCP 阵营 + WM 论文 39→49）、3 Clippings 移入 raw/ 并新建 concepts/dynamic-workflows。终态 29 concepts / 7 maps / 8 connections / 71 output
- 关键概念：[llm-wiki-pattern](/wiki/concepts/llm-wiki-pattern/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)

### `output/reports/agora/02-market-competition/consumer-ai-user-research-2026-06.md`
> 消费级 AI 大盘用户研究（2026-06，51-agent workflow：10 维度并行 → 关键数字对抗式核实 → 合成）。覆盖使用场景（ChatGPT 73% 非工作用途、三大主题近 78%、编程仅 4.2%；Claude 偏码农 ~36%）、用户画像（美成人 34%、18-29 岁 58%、feminine 名 37%→52%、6 个 persona）、付费（17–18 亿用户仅 ~3% 付费、年支出 120 亿美元、订阅天花板远低于广告）、采用率（ChatGPT 9 亿 WAU / App 破 10 亿 MAU）、产品格局（a16z Top100 第 6 版，ChatGPT 双榜 #1，图片生成萎缩、横向 agent 上升）、陪伴（Character.AI 高时长低留存 + 安全诉讼）、中国（豆包 3.45 亿 MAU 断层第一、C 端付费意愿极低、生态分发）、留存（AI App 年留存 21.1% vs 30.7%，护城河=高频工作流嵌入）、态度（信任 AI 中 72%/美 32%，市场进入「幻灭低谷」）、未满足需求（健康 71% 查仅 20% 用等白空间，要 ambient/anticipatory/emotionally-intelligent 而非又一个 chatbot）。核心判断：红海=再做通用对话框，蓝海="对话之后"——把一次性对话沉淀成可复用、可个性化、能替你做事的 artifact/agent，逐条接回知识库已有产品方向。所有 stale/disputed/unverifiable 数字均打标并给更准确值。
- 关键概念：[super-creators](/wiki/concepts/super-creators/), [genui](/wiki/concepts/genui/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)

### `output/reports/ai-user-segmentation-frameworks-2026-06.md`
> AI 用户分层 / 用户分群研究汇总（2026-06，deep-research workflow：5 角度 / 21 源 / 86 条带原文引用声明）。是 [consumer-ai-user-research-2026-06](/output/reports/agora/market-competition/consumer-ai-user-research-2026-06/) 的"分层框架"切面（姊妹篇=全景，本篇=框架）。覆盖四维度 ×（中国 vs 全球）×（C 端 vs B 端），并列 21 份权威报告清单（机构+时间+核心分层+链接）：中国 CNNIC（生成式 AI 用户 5.15 亿/渗透 36.5%/74.6%<40）、QuestMobile（三大阵营 + 头部 App 画像男性 25-35 三线以上 + 移动 AI 7.22 亿/时长 +177%）、腾讯研究院 TISI（n=3570：67.7% 日活 / ~30% 重度 / 研究生 81.8% 日活；付费 11% 已付 / 59% 观望 / 付费者 55.2% 月花 <100 元）；全球 Menlo Consumer AI（每日19%/偶尔42%/非用户39% + 仅 ~3% 付费 + 生命阶段分层）、a16z（9% 付费>1 个 / DAU-MAU 36% vs 21% / Claude=prosumer·Perplexity=效率黑客 / "AI 游客" M3 留存法）、andrew chen Power User Curve（L28/L30）、OpenAI How People Use ChatGPT（7 亿 WAU / Asking-Doing-Expressing 49-40-11 / 非工作 53%→73%）、Anthropic Economic Index（开发岗 37.2% / API 77% 自动化 vs C 端五五开）、Pew（34% + 年龄学历断层）、HBR Top-100 用例；企业 Menlo Enterprise 2024+2025（$37B / POC 投产 47% vs 25% / 仅 16% 真 agent / 按部门 IT 22%-产品工程 19%）、Deloitte 2026（成熟度三层 34-30-37）。归纳四套主流分层框架对比（行为强度 / persona / 付费意愿 / 采用阶段）+ 口径校验（CNNIC 人 vs QuestMobile 设备、ChatGPT WAU 时间线、Menlo $432B 属口算 framing）。⚠️ 仅腾讯 2 条走完 3 票验证，其余为带原文引用提取未二次复核（非被证伪）。
- 关键概念：[super-creators](/wiki/concepts/super-creators/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/)

### `output/reports/consumer-user-context-taxonomy-2026-07.md`
> C 端用户重要 Context 分类（2026-07-02 query）。从消费级 AI 用户研究、AI 用户分层、Personal Knowledge Card、Conversation Wiki、上下文工程和记忆系统材料提炼：C 端重要 context 不是「资料越多越好」，而是能改变 AI 结果质量的当前触发处境、任务/工作流状态、长期身份、偏好品味、历史轨迹、私人领域数据、社交关系、情绪状态、信任 provenance、运行环境 10 类。给出产品分层 L0 稳定人格 / L1 当前任务 / L2 历史轨迹 / L3 私有数据 / L4 信任关系，以及判断 context 是否值得收集的 5 个问题。
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-memory](/wiki/concepts/agent-memory/), [memory-to-context](/wiki/connections/memory-to-context/)

### `output/reports/agora/03-product/agent-marketplace-user-context-benefits-2026-07.md`
> Agent marketplace 里用户 Context 积累的好处（2026-07-02 query）。复用 Agora problem statement、能力包 BP、补贴打法和 C 端 context taxonomy，结论是用户 context 会把 marketplace 从「供给目录/货架」升级为「需求理解与可信交易层」：按当前任务、历史偏好、可授权资源和风险等级做任务路由；用用户自己的 context 做 sample / canonical test / smoke test；通过 first verified run、similar-context evidence、failure attribution 降低付费前信任成本；提高 `付费 context edge 数 × 单 edge 价格`；反向指导创作者做真实 context gap 的能力包；用 context-fit ranking 替代单纯 star/install；沉淀 `context packet → package → run result → evidence → feedback → payment/refund` 的 event ledger 护城河。风险是隐私、陈旧记忆、黑箱推荐和创作者 know-how 泄露，设计上应本地优先、可撤回、来源/时效标注、高风险授权逐次确认。
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-memory](/wiki/concepts/agent-memory/), [memory-to-context](/wiki/connections/memory-to-context/)

### `output/reports/agora/03-product/context-network-loop-against-general-agent-2026-07.md`
> Context Network 如何对抗通用 Agent / 模型（2026-07-02 query）。把前一份「用户 Context 积累的好处」上升为完整系统环路：`User Trigger → Context Packet → LLM Reasoning → Capability Routing → Permissioned Execution → Verification Evidence → Settlement/Reputation → Memory + Event Ledger → back to Context Packet`。核心判断：通用 Agent 的优势是通用推理，Context Network 的优势是在真实用户处境里持续复利的可验证执行能力；同一个模型在更好的 context pipeline 中会推理得更准。报告拆解 Context 不只是用户资料，而是用户层/任务层/资源层/能力层/验证层/记忆层组成的执行状态空间；每次任务产生 context edge（某类用户处境 × 某个能力包 × 一次可验证结果），反哺推理、匹配、验证、定价、供给和声誉。对抗通用模型的路径不是更强模型，而是跨模型、跨 runtime、跨 creator 的 context-conditioned execution network。
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-memory](/wiki/concepts/agent-memory/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [memory-to-context](/wiki/connections/memory-to-context/)

### `output/reports/agora/03-product/context-expressions-openai-manus-claude-2026-07.md`
> OpenAI / Claude / Manus 对 Context 的表达（2026-07-03 query）。基于官方 OpenAI Agents SDK / cookbook、Anthropic engineering、Manus blog 梳理三种表达：OpenAI 将 Context 表述为 structured state / memory / context personalization / session memory，核心是 stored、recalled、injected into working memory；Anthropic/Claude 将 Context 表述为 just-in-time context / progressive disclosure / filesystem navigation / Skills，强调 lightweight identifiers、runtime loading、CLAUDE.md + glob/grep/Bash 与 procedural knowledge；Manus 将 Context 表述为稀缺运行资源，强调 context-aware state machine、file system as context、fresh context windows、sub-agent isolation。提炼 Agora 话术：Context 是 Agent 的运行现场；Agent 平台的护城河，是持续把用户任务现场编译成可推理、可执行、可验证、可复用的 Context Network。
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-memory](/wiki/concepts/agent-memory/), [memory-to-context](/wiki/connections/memory-to-context/)

### `output/reports/agora/01-narrative/agora-problem-statement.md`
> Agora 可验证交付机制参考（2026-06-20，2026-07-17 降级为 `supporting`，不再是当前公司 cornerstone）：把「builder 赚不到钱」拆成价值捕获、市场触达、价值证明三层，并判断买家付费前无法验证适配性是长期能力交易的重要约束。当前 Combo 只复用 capability contract、验证与结果证据机制；公司定义以 [combo-current-story-2026-07](/output/reports/combo/narrative/combo-current-story-2026-07/) 为准。
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)

### `wiki/maps/agora-startup.md`
> Agora 长期平台机制与历史研究地图（2026-07-17 已标为 `historical` / `future-thesis`）：保留 Agent Capability Package、可验证交付、Context Network、event ledger、跨 runtime 分发与结算等长期资产，并把当前公司表达路由到 [combo-startup](/wiki/maps/combo-startup/)；旧融资、财务、Agent-VM、PKC 与 KAN 材料均按参考或历史资料使用。
- 关键概念：[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [skills-system](/wiki/concepts/skills-system/)

### `output/reports/agora/README.md`
> Agora 长期平台研究与历史资料入口（2026-07-17 重构）：顶部先路由到 Combo 当前四份真源，再按“可复用机制 / 历史参考”组织旧文件；明确旧路径保留是为了 Wiki-link 与 git 历史稳定，不代表 Agora 仍是当前公司名或已成立的 Marketplace。
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)

### `output/reports/agora/02-market-competition/agora-competitive-overview.md`
> Agora 竞品总览（2026-06-20，11 份竞品报告 3 路并行子代理抽取 → 合成）：按三层根因（L1 价值捕获 / L2 市场触达 / L3 价值证明）映射六种 archetype——A 纯目录连接层（Smithery/skills.sh，解 L2 无 payout）、B 平台托管 runtime（Apify 抽 20%/Relevance entitlement/Poe authorize-capture，L1 真解但弃本地执行）、C 大厂全套仍失败（GPT Store 四件套齐全死在变现、Claude Skills 66,500+ 零变现、Agent.ai credits 无现金价值）、D 最接近闭环（Agensi Stripe 80/20+水印，反证 DRM 防不住可复制）、E 去中心化（三层全恶化，明确否决）、F 需求侧身份线（Epitome 5.5/6 红海 + Anthropic Import Memory 抽地板）。核心：全市场只有 Poe/Relevance/Apify 碰到 L3 且只做一半（退款/按结果付=转移风险），没人做"购买决策点 per-buyer 适配证据"；event ledger + verification-as-tradable-unit 是无人占据的空白。
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)

### `output/reports/agora/02-market-competition/china-agent-capability-competitors-2026-06.md`
> 中国竞品深度报告（2026-06-20，28-agent workflow：KB 锚定 + 6 类并行 web 调研 → 20 条承重声明对抗式核实 → 合成；59 条记录 / 40+ 玩家）。核心判断：中国"第三方把 Agent/Skill 能力做成商品+用户付现金+平台逐笔分账"**只有字节扣子（Coze 2.0 技能商店/付费模板，个税代扣坐实）一家真跑通**；其余皆为①流量/广告/带货/线索间接变现（百度文心"帮 10 万智能体赚钱"实为联盟广告 CPS/CPA）②平台积分/奖金池补贴冒充分成（魔搭/360/SeaArt/LiblibAI）③B 端 SaaS ISV 现金分账但卖成品应用非 Skill（钉钉 1:9 / 阿里云市场 5%-10% / 千帆 10% / 用友）④公益开源目录零变现（所有 coding agent 的 MCP 市场上游=魔搭"公益非营利"）。**关键修正**：阿里 AI Agent Store 是模板库非分成市场（KB"最大威胁"证伪）；真信号是支付宝 AI收（2026-04-28，按次现金、个人 0 费率）开放"现金结算轨"。中西差异：中国无"中立市场"物种（全寄生超级 App 生态）、C 端付费意愿极低（剪映 SVIP 3.2%）、"创作者激励"95% 是补贴非用户付费现金。对 Agora：中国 L1（可携带能力产权 + 逐笔分账账本）+ L3（买前可验证交付）系统性空白；大厂补支付基建=机会，扣子是唯一实质威胁但 L1 不可携带/L3 极弱可狙击。凡 stale/partly/unverifiable 逐项打标。
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)

### `output/reports/agora/04-business-model/agora-margin-model-v2-2026-06.md`
> Agora 历史平台毛利模型 v2（2026-06-20，2026-07-17 标为 `historical`）：保留 token 成本链、收入/毛利辨析、抽成基数换算和 COGS 分类作为数学参考；250M TAM、2M 付费用户、约 $180M 净收入等均是旧平台情景，不是 Combo 当前经营数据。当前经济口径以 [combo-unit-economics-v0-2026-07](/output/reports/combo/business-model/combo-unit-economics-v0-2026-07/) 的订单级实填模型为准。
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [knowledge-agent-network](/wiki/concepts/knowledge-agent-network/)

### `output/reports/skillhub-project-analysis-2026-07-03.md`
> chandrudp29/skillhub 项目分析（2026-07-03 query）。结论：skillhub 是面向 Claude Code / Cursor / Codex / Gemini 的 skill package manager + composer，而不是完整 marketplace。它支持 registry 搜索、跨 agent 安装、section-level diff、多个 skill compose、AI merge、template compose，并从 skills.sh / Anthropic / OpenAI / Copilot / Microsoft / Google / GitHub / local 等来源抓取 skill。实现为 Python CLI（Typer/Rich/httpx/PyYAML，package `skillhub-ai` v0.3.0，MIT），本地 clone 测试 70 passed。对 Agora 的意义：它解决 capability distribution 中的 packaging / installation / composition，但没有 payout / entitlement / verified delivery / event ledger / buyer-specific proof；值得借鉴 `diff before compose`、多 agent adapter、GitHub/local escape hatch 与 compose template 商品形态。
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `output/reports/loops-agents-product-note-2026-07-05.md`
> Loops Agents 产品速记（2026-07-05 query）。结论：它不是通用 Agent 平台，而是 Loops email platform 的 agent-native 集成入口，用 Skills / CLI / API / SDK / LLM 文档帮助 Claude Code / Codex / Cursor 等 coding agents 接入 transactional email、events、campaigns 和用户同步。当前已发布 Skills、Platform API、CLI、LMX、Campaign API、Transactional API、SDKs；Workflows API、`/setup`、`/migrate`、MCP 仍在路线图。对 Agora 的意义：SaaS vendor 会把自己的 onboarding 包装成官方 capability package，但跨 vendor 的 discoverability、entitlement、buyer-specific proof、payout 和 event ledger 仍是空白。
- 关键概念：[skills-system](/wiki/concepts/skills-system/), [harness-engineering](/wiki/concepts/harness-engineering/), [communication-to-economy](/wiki/connections/communication-to-economy/)

### `output/reports/simstudioai-sim-project-analysis-2026-07-11.md`
> Sim 项目分析（2026-07-11 query）。结论：Sim 不是单纯的可视化 Agent builder，而是把 Mothership 自然语言 authoring、workflow graph、Agent/tool blocks、tables、knowledge bases、files、运行日志和版本化 deployment 放在同一 workspace 的开源 runtime 产品。合理使用路径是从重复业务事件出发：描述 SOP→授权数据/工具→生成 workflow→历史样本试跑→发布→事件触发→人工只处理异常；Builder 使用画布、Operator 管理运行、End user 留在 Slack/Email/CRM/API。理想任务需重复发生、跨系统、包含有限语义判断、输入输出可定义、结果可验证且错误可拦截。最值得 Agora 借鉴的是 Conversation→Capability Graph、immutable verified version、多 surface 分发与 run lineage；不应复制 workflow canvas，应占据跨 runtime 的 identity、contract、verification、entitlement、settlement 与 reputation 层。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [dynamic-workflows](/wiki/concepts/dynamic-workflows/), [harness-engineering](/wiki/concepts/harness-engineering/), [skills-system](/wiki/concepts/skills-system/)

### `output/reports/kickback-cli-product-analysis-2026-07-12.md`
> Kickback CLI 产品分析（2026-07-12 query）。结论：真正的产品 Kickbacks.ai 是 coding-agent wait-state attention marketplace，把 Claude Code / Codex 的 spinner、thinking line、status line 变成 Extension / Terminal 两个独立竞价 surface，以 1,000 个五秒 qualified impressions 为 block，开发者获得约 50% 广告分成；Gabe Perez 的第三方 CLI 只是读取 extension 本地状态、editor DB / Keychain token 与 backend aggregate earnings 的 publisher console + doctor。亮点是 latency→inventory、context surface pricing、qualified-event ledger、revenue-share 买供给，以及 `about + doctor + JSON` 的透明本地工具设计；真实壁垒在广告主复投、fill rate、反作弊账本和 payout 信用。主要风险是 patch 上游产品、完整 token 权限、`--offline` / read-only 口径不完全成立、五秒 viewability 不等于 attention、个人收益只是 micro-reward，以及更快/后台化 Agent 会压缩 foreground inventory。对 Agora 应复制“高价值 trigger context + 可计价 event + authoritative ledger + creator console”，但把 settlement event 从 impression 改成 Verified Outcome。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [skills-system](/wiki/concepts/skills-system/), [communication-to-economy](/wiki/connections/communication-to-economy/)

### `output/reports/macrokit-agent-world-project-analysis-2026-07-12.md`
> Macrokit Agent World 项目分析（2026-07-12 query）。结论：Agent World 不是 AI Town / OASIS 式 Agent society simulation，而是一套给不同 owner 的 personally-owned agents 使用的 portable constitution + cross-owner market + succession protocol：Ed25519 owner/agent keys 分离；owner-signed append-only manifest 声明 capability、goal、mandate、successor/guardian；任务走 POST→BID→AWARD→DELIVER→VERIFY→SETTLE，并用 escrow、confidence-scaled stake、per-(agent,class) score 和 value-price router 协调；capability module 可在买方 tests 通过、owner 批准 scopes 后安装进 Agent 并继续对外赚钱。源码 core/studio/adapter build、101 tests、typecheck 与 in-memory demo 通过，live hub 有 3 个 demo agents / 2 个 settlements；但 npm packages 未发布、市场 CLI/GUI 不完整、credits 非真钱、identity 可 Sybil、subjective verification/federation/privacy/法律继承未解决，且 v0 capability module 在 hub/agent Node 进程中无 sandbox 直接 dynamic import，是开放市场的致命安全缺口。对 Agora 最值得吸收 owner/agent key、manifest version、mandate、class-specific reputation、verification-before-settlement 与 run receipt；不应以 posthumous succession 做近期入口。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [communication-to-economy](/wiki/connections/communication-to-economy/)

### `output/reports/osaurus-project-analysis-2026-07-14.md`
> Osaurus 项目分析（2026-07-14 query）。结论：Osaurus 不是另一个 Ollama / LM Studio 式模型 runner，而是 Apple Silicon Mac 上的 personal Agent harness / local control plane：把 MLX、Apple Foundation Models、Ollama/LM Studio 与 cloud providers 作为可替换 inference backend，在上层统一 Agent prompt、identity/pinned facts/episodes 三层 memory、RAG-selected Skills/Methods/tools、server-side agent loop、working folder、MCP server+client、Linux VM sandbox、schedule/watcher/subagent、cryptographic identity、secure channel/relay，并通过全局 Chat、Management、CLI、HTTP API 与 App Intents 暴露同一个 Agent。最强 thesis 是“inference 可替换，用户拥有的 harness/context 才是长期资产”。项目不是 demo：0.22.3、7,048 stars、433 releases / 178,037 asset downloads、最新 head 的 core/CLI/evals/lint checks 全绿，本地四个轻量 packages 合计 188/188 tests 通过；但当前 main 的 build/deploy 只是 GitHub Pages，完整 App release 验证仅在 tag/手动 workflow 执行。它仍明显 pre-1.0，macOS-only、macOS 26 才有 Sandbox/Foundation Models、公开 model eval 只覆盖两种高配 M4 设备且 pass rate 分散，image/MLX residual 与过宽 surface 带来维护风险。隐私宣传也需校正：fully offline 只是一条配置路径，release 含默认勾选的 Aptabase analytics 与默认开启的 Sentry crash reports，数据默认 plaintext SQLite 依赖 FileVault，native `.dylib` plugins 在 host process 内运行而非 sandbox。对 Agora 值得借鉴 Model/Harness 分层、多 surface 共用 identity/state、Core Model 后台分工和 compatibility evidence ledger；不应复制过宽 scope、absolute privacy 文案或 in-process marketplace extensions。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [agent-memory](/wiki/concepts/agent-memory/), [tool-routing](/wiki/concepts/tool-routing/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/), [harness-to-kan](/wiki/connections/harness-to-kan/)

### `output/reports/vercel-eve-agent-framework-research-2026-07-17.md`
> Eve 深度研究（2026-07-17 query）。结论：Eve 是 Vercel 内部孵化并官方维护、Apache-2.0、filesystem-first 的 Agent application framework，而不是可视化/no-code builder；它用 `agent/` 目录把 instructions、typed tools、按需 Skills、MCP/OpenAPI connections、per-session sandbox、durable state、subagents、channels、schedules、evals 与可复用 Extensions 编译成完整应用，并由 Workflow SDK 提供 session/turn/step checkpoint、crash/redeploy 恢复和 HITL/OAuth park-resume。核心优势是 Git-native authoring、真实 HTTP eval、多 surface、Vercel managed happy path 与真实 self-host escape hatch；核心边界是 Beta/Node 24、无跨 session long-term memory、无 durable FIFO queue、interrupted step 会重跑、已有 session 下一 turn 采用最新 production deployment、sandbox egress 默认 allow-all、tool approval 与 tenant/session ACL 需主动配置。Extensions 已把 Skill + Tool + Connection + Hook 组合成 runtime-native npm capability package，但公开产品仍缺 publisher identity、buyer-specific proof、paid entitlement、settlement/refund/payout 与长期 reputation ledger。对 Agora 的最佳动作不是复制 runtime，而是做 Eve adapter：导入 directory/Extension、绑定 immutable manifest + eval、从 NDJSON stream 生成隐私最小化 Verified Run Receipt。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [dynamic-workflows](/wiki/concepts/dynamic-workflows/), [harness-engineering](/wiki/concepts/harness-engineering/), [skills-system](/wiki/concepts/skills-system/), [safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/fudge-design-reference-competitors-2026-07.md`
> Fudge 设计参考引擎竞品图谱（2026-07-17 query）。结论：Fudge 不是 UI 生成器，而是 AI coding agent 的设计研究与证据层，通过近 10,000 个真实网站、字体/颜色/间距/布局等 measured evidence、Chrome 采集插件和 MCP，把设计参考插入代码生成之前。直接竞品是 Mobbin MCP（最大 shipped screens / flows）、Refero MCP（Web/SaaS + styles/tokens）、Lazyweb（agent-first research skills + 免费入口）、Gummble（screens/flows + microcopy）；相邻工具包括 21st.dev（参考到 React 组件）、html.to.design（网页到可编辑 Figma）、Figr / Magic Patterns / UX Pilot / Figma Make（Context 或需求到 prototype）。推荐最小栈：Fudge/Refero → 21st.dev/shadcn → coding agent → visual QA；主要风险是版权与单源模仿、检索不等于设计判断、数据规模和从 evidence 到可执行 constraints 的断层。
- 关键概念：[genui](/wiki/concepts/genui/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `output/reports/agnost-ai-product-analysis-2026-07-17.md`
> Agnost AI 产品分析（2026-07-17 query）。结论：Agnost 不是又一个 trace dashboard，而是面向 chat/voice Agent 团队的 production conversation intelligence，把 production conversations、tool calls 与 OTel spans 聚合成 intent、frustration、SOP violation、feature request、failure cluster 与 conversion/churn signals，并把高影响问题推进到 reviewed fixes/PR。真实 wedge 是“eval 发现不了的 unknown unknowns → failure cluster → fix”，不是泛 observability；公开 OpenAPI 已证实 ingestion、conversation/tool/error analytics、semantic search、intent/SOP classification、alerts、Slack、MCP 查询面，但官网强调的 automatic PR 在 public docs/API 中缺 GitHub/improvements/patch/rollback 接口，通用自动化成熟度仍需实测。主要风险是 Braintrust/LangSmith/Langfuse/Phoenix/Latitude 竞争、聚类不等于因果归因、冷启动，以及官方明确承认 ingestion 前没有内建 PII redaction/DLP。对 Agora 最值得吸收 failure cluster→canonical test→outcome delta 与 creator-facing MCP，把 production failure 编译成 supply bounty 和 Verified Run Ledger；不应复制通用 observability。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [tool-routing](/wiki/concepts/tool-routing/), [agent-communication](/wiki/concepts/agent-communication/)

### `output/reports/styleseed-project-analysis-2026-07-17.md`
> bitjaru/styleseed 项目分析（2026-07-17 query）。结论：StyleSeed 不是新的 UI framework 或自动设计模型，而是给 Claude Code / Codex / Cursor 使用的 Design Judgment Harness：用 `STYLESEED.md` 把 domain、surface、palette、font、radius、density、elevation、motion 编译成持久 Design Lock；用约 4,400 行规则语料、48 React/Radix/Tailwind components、7 skins、named motion 和 19 个 `ss-*` Skills 执行 lock→build→code score→fix→screenshot verify。最强机制是把审美变成可版本控制的 intent contract，并让 evaluator 相对 intent 而非统一 house style 评分；最重要边界是 `ss-score`/`ss-verify` 仍由 Agent 按 rubric 读代码和截图自评，不是确定性 linter、视觉模型或校准 metric。源码快照 v2.11.1 / `7af957e3`，本地 production build 成功并生成 114 static pages，但未发现自动化 tests，锁定依赖 audit 有 1 high + 1 moderate 可升级漏洞，README 仍有 15/19 Skills 计数 drift。对 BENZEMA / GenUI 最值得吸收 Design Intent Contract、typed component space、code+visual 混合 gate 和 evidence ledger；与 Fudge 可组成 reference evidence→design contract→generation→verification pipeline。
- 关键概念：[genui](/wiki/concepts/genui/), [harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [context-engineering](/wiki/concepts/context-engineering/), [skills-system](/wiki/concepts/skills-system/)

### `output/reports/impeccable-open-design-product-design-comparison-2026-07-23.md`
> Impeccable、Open Design 与 Agent Product Design 工具对比（2026-07-23 query）。Impeccable 不是普通 UI prompt，而是安装进真实 repo 和 Claude Code/Codex/Cursor 等 coding agent 的 design judgment + review + repair harness：以 `PRODUCT.md`/`DESIGN.md` 保存产品与视觉 Context，用 23 个设计命令、58 条确定性 detector rules、provider hooks 和 alpha Live Mode 执行 shape→craft→critique/audit→polish→browser variant→source writeback。Open Design 则是独立的 agent-native design workspace/platform，以 plugin、design-system package、preview、export 和 MCP 运行 brief→direction→artifact→handoff→memory，覆盖 prototype、web、slides、image、video 等多媒介产物。两者的根本差异是“在生产代码里设计”与“在设计工作台里生成 artifact 再交接给代码”；对已有 Combo codebase，优先把 Impeccable 作为 last-mile quality harness，Open Design 用于前期方向或非代码 artifact。两者都不能用 anti-slop、heuristics 或 persona simulation 替代真实用户研究、任务完成、业务转化和失败责任验收。
- 社区反馈补充（2026-07-23）：GitHub 快照 48,969 stars、2,855 forks、35 open issues、5 个来自不同外部账号的 open PR，维护与发布非常活跃。Classmethod/DevelopersIO 的真实 LP 案例中，audit/polish/bolder 将诊断分数从 13/20 提至 18/20，约 33 分钟，能抓 contrast、image delivery、token drift、anti-pattern 与 typography/layout，但品牌字体、官方资产、information organization、visual priority 和 interaction 仍需人工判断。Issue 共识是 detector/critique 最可靠，Live Mode 最有想象力也最不稳定；安装、版本、hook 与 provider dist 曾多次漂移，但维护者对 #250、#399、#304、#400 等问题响应快。当前独立长期使用、A/B、设计师盲评和 precision/recall 证据仍弱，适合 project-scoped、pin version、先只读 audit 再逐步启用自动修改与 Live。
- 关键概念：[genui](/wiki/concepts/genui/), [harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/)

### `output/reports/combo/README.md`
> Combo 当前创业项目入口（2026-07-17）：把唯一公司表达、融资会谈综述、订单级经济模型和单垂类验证计划组织成当前必读路径；明确 Agora 仅作为长期平台机制与历史研究库保留。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/01-narrative/combo-current-story-2026-07.md`
> Combo 当前公司表达唯一真源（2026-07，`status: current`）：标准定义为“帮助垂类创作者，把反复提供的专业服务变成可收费、可规模化交付的 AI 产品”；给出一句话、30 秒、2 分钟版本，以及客户、粉丝、产品机制、分发、商业模式、平台跃迁三条件、证据分层、Agora→Combo 迁移表、禁用表达与融资数字纪律。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)

### `output/reports/combo/02-market-competition/combo-outcome-commerce-concept-and-startup-competition-2026-07-27.md`
> Combo Outcome Commerce 概念成立性与初创竞争判断（2026-07-27 query）：结论是“终局成立，起点不成立”；专业能力可以被商品化，但可交易单位应是带输入、边界、验收、失败处理与责任人的结果合约，而非无法控制的最终业务 Outcome。Fiverr 已以 outcome-based transaction、结果/Context 数据和端到端履约作为 2026 战略，Upwork 已拥有大规模服务目录、交易网络并接入 ChatGPT，因此横向结果平台对初创公司极不友好；Combo 只能从一个可定义、可验证、AI 能显著降本、责任可控且会复购的垂直结果切入，再用跨创作者购买、平台新增需求和结果驱动路由证明网络。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [agora-problem-statement](/output/reports/agora/narrative/agora-problem-statement/)

### `output/reports/combo/01-narrative/combo-terminal-state-possibility-space-2026-07-27.md`
> Combo 终局可能性空间（2026-07-27 future-thesis query，含科幻/哲学扩展与产品/VC red team）：保留结果交易、能力内容、Network AGI、专家公司 OS、动态组织、身份/Context、金融/风险、协议/制度和文明尺度等 50 种期权，但后续反抽象校正明确 Internet of Agency / Promises / Responsibility 只是同一笔服务交易的承诺、执行和责任三个时态；“动态组织工厂”是后台履约机制，不是用户产品；任务拆解、Agent 选择和流程编排大概率被通用模型吸收。当前可自然推导的主链收敛为“一个结果 SKU → 一个专家的多个 SKU → AI-native 专业服务交易 → 结果数据改善路由 → 有需求证据后再统一承接复杂结果”，公司当前仍是带平台期权的创作者变现工具。
- 关键概念：[knowledge-agent-network](/wiki/concepts/knowledge-agent-network/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [communication-to-economy](/wiki/connections/communication-to-economy/)

### `output/reports/combo/01-narrative/combo-content-platform-possibility-2026-07-27.md`
> Combo 内容平台可能性（2026-07-27 future-thesis query）：用户关于“复杂、非显性需求需要先被内容包装和形成”的直觉成立，但只能证明 Combo 需要内容，不足以证明应直接建设通用 Feed。最可信形态是内容驱动的结果网络：真实交付经授权生成 Before / After 案例，相似用户认出自己的问题，点击“应用到我”，绑定 Context 后由 Agent 与真人交付个性化结果，新结果继续生成内容。报告区分显性 / 潜在与简单 / 复合需求，给出咖啡店用户场景、TikTok Shop / YouTube Shopping / Pinterest 对标、Feed 与私人 Agent 的分工、内容从外部渠道到交易原生发现网络的四阶段，以及内部内容 GMV、跨创作者购买、非交易复访、案例原生供给和单位经济等成立门槛。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/combo/01-narrative/combo-midgame-shape-options-2-5-years-2026-07-27.md`
> Combo 2–5 年中局形态选择空间（2026-07-27 scenario-planning query）：中局不按宏大终局命名，而按“谁每周打开、第一屏看什么、需求由谁带来、什么状态留在 Combo”定义。报告从当前“专家重复服务 → 收费 AI 产品”推演专家履约 OS、精选结果 Marketplace、内容到行动、垂直结果公司、AI 服务总包商、持续目标会员、企业结果工作台、嵌入式商业基础设施、专家 AI Franchise 和 Agent 采购 / 验收接口十种公司形态。最稳路线是供给方履约 OS，VC 上限最高的替代是垂直复合结果公司，内容平台只能从交易密度和案例内生 GMV 长出；同时区分专家品牌 vs Combo 品牌、开放平台 vs 自营、消费者注意力 vs 企业工作流、目的地 vs 隐形基础设施等战略互斥，并用前一千笔交易判断用户忠于人、内容、结果、持续目标还是工作流。

### `output/reports/combo/01-narrative/combo-agentic-human-uniqueness-terminal-product-map-2026-07-27.md`
> Combo 人的独特性 Agentic 化后的终局产品地图（2026-07-27 future-thesis query）：校正“交易平台 vs 内容社区”并非同一层二选一，前者描述价值兑现，后者描述需求形成、信任与关系。报告按消费者看、买、添加并长期调用、问、Fork / 协作以及供给者运营六种动作，补入真人授权 Agent 联系人网络。后续创始人明确 Combo 不做基础模型，且供给者无需在消费者前台可见，因此本文继续作为形态穷举，原“Identity-first 更忠实”的优先级已由 [combo-internal-storyline-and-vc-bridge-2026-07-27](/output/reports/combo/narrative/combo-internal-storyline-and-vc-bridge-2026-07-27/) 的 Outcome-first 综合故事替代。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/combo/01-narrative/combo-forward-backcast-5-10-year-scenarios-2026-07-27.md`
> Combo 5–10 年正推 / 倒推情景规划（2026-07-27 future thesis）：从今天“一位专家把一个重复服务做成收费 AI 结果产品”正推到专家多个 SKU、AI-native Practice OS、垂类专业服务交易和个人 Agent 采购专业升级；再从 2036 年强通用模型、低成本推理、个人 Agent 主入口和模型平台 Walled Garden 倒推仍可能稀缺的授权、品牌/署名、现实资源、责任承担与私有结果 ground truth。用模型统一/分化、算力便宜/昂贵、生产分散/集中、用户入口、责任主体和身份溢价六个变量形成四个边界世界，并给出 2031 专家数字工作室、消费者专业升级、小企业 Agent 采购及 2036 隐形交易层的具体场景。最终交集收敛为“AI-native 专业实践的经营与交易系统”，附七层 Bet Stack、当前资产选择和十条死亡路径。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/)

### `output/reports/combo/01-narrative/combo-vc-storyline-option-space-2026-07-27.md`
> Combo VC 故事线选择空间（2026-07-27 narrative-options query）：不再把终局名词并列，而是按世界变化、稀缺品、付费者、商品、当前切口、五至十年终局和死亡条件重构 14 条完整 story spine。当前最适合的母故事是 Service-as-Software；最值得实测的替代母故事是 AI Quality Network。后续校正明确：用户购买的是更快、更省心、质量可预期的具体成品；把人工服务做成可重复交付的 AI 产品才是产品差异，专家判断、真人例外与责任只是质量和补救机制。Judgment / Exception 仅保留为抗模型替代的待验证假设。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)

### `output/reports/combo/05-fundraising/combo-comparable-companies-and-vc-underwriting-2026-07-27.md`
> Combo 对标公司与 VC 回报推演（2026-07-27 comparable-analysis query）：纠正“判断与责任是差异化”的倒果为因，明确用户购买的是更快、更省心、价格与质量可预期的具体成品。当前最合适的主对标是 Kajabi / 小鹅通，单个产品体验对标 TurboTax / LegalZoom，平台跃迁对标 Mindbody，最高价值经营系统对标 ServiceTitan；Cameo 是低频粉丝定制的反面检查，Fiverr 只在跨创作者购买和平台自产需求出现后成立，Shopify 只在 Combo 拥有订单、客户、履约、支付与系统记录后成立。报告进一步拆出横向专家平台与垂直 AI-native 结果公司两条不同融资路线，并用公开市场粗略倍数说明对标选择会直接改变 VC 的回报模型。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)

### `output/reports/combo/05-fundraising/combo-investor-learning-synthesis-2026-07-17.md`
> Combo 融资会谈学习综述（2026-07-17）：综合 WBJ、经纬、江远、蓝色光标、星连、真格六个对象共 207 条问答（其中 119 条标记“值得深思”），区分五场纯融资与一场产业混合会谈；沉淀跨会谈共识、分歧、方向级/执行级风险、回答质量、合规禁语、数字修正、核心指标与融资前材料清单，并严格区分已确认事实、外部类比与待验证假设。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/04-business-model/combo-unit-economics-v0-2026-07.md`
> Combo 单任务 / 单创作者经济模型 v0（2026-07，`evidence_level: hypothesis`）：以真实订单为最小单位，统一售价、退款、推理、工具、Sandbox、支付费、创作者分成、补贴、支持、CAC、共创成本与贡献毛利口径；15% 抽成、2% 转化等只作为待验证输入，不作为公司事实。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)

### `output/reports/combo/06-gtm/combo-one-vertical-validation-2026-07.md`
> Combo 单垂类验证计划（2026-07，`status: current`）：首轮测试候选收敛为 AI 原生专业视觉创作者，与 3–5 位创作者共创一个暂定“AI 视觉作品诊断与改进包”；用六项任务条件、唯一漏斗、60 秒 Wow Moment、继续/停止阈值及订单/创作者 Evidence ID 验证真实上线、付费、交付、退款、复购和贡献毛利。候选是实验选择，不是已验证的最终市场结论。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `wiki/maps/combo-startup.md`
> Combo 当前创业项目全景（2026-07-17）：区分当前事实“创作者变现工具”、产品化机制、达到证据门槛后才成立的平台期权，以及 Agora 历史研究资产；平台必须同时出现跨创作者购买与 Context 复用、平台内生新增需求、结果/退款/评价改善路由。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)

### `wiki/concepts/creator-ai-service-productization.md`
> 创作者 AI 服务产品化：定义什么样的专业服务适合被封装为可收费、可重复交付的 AI 产品；强调明确结果、经验依赖、重复需求、可验证性、风险边界与真人升级机制，并区分产品化服务、KOL 数字分身和普通聊天机器人。
- 关键概念：[human-in-the-loop](/wiki/concepts/human-in-the-loop/), [context-engineering](/wiki/concepts/context-engineering/), [combo-startup](/wiki/maps/combo-startup/)

### `wiki/connections/creator-tool-to-capability-network.md`
> 从创作者变现工具到专业能力交易网络的条件关联：说明供给数量、Feed 或 Marketplace 页面不等于平台；只有跨创作者购买与 Context 复用、Combo 带来新增需求、结果证据持续改善路由三项同时出现，工具才获得平台层资格，并给出停止平台叙事的反证条件。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [context-engineering](/wiki/concepts/context-engineering/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/kb-expression-migration-lint-2026-07-17.md`
> Combo / Agora 知识库表达迁移 Lint 报告（2026-07-17）：记录从融资整理会话与历史知识库提炼当前公司真源、四份执行文档、Combo map/concept/connection，以及 Agora 54 份文档的完整状态重分类；修正平台事实层级、2%/15% 数字、退款/补贴/抽成/贡献毛利口径、重名 Wiki-links 和异常标题。最终审阅范围断链 0、歧义 0、YAML 错误 0、raw 改动 0，Wiki 状态 30 concepts / 9 maps / 9 connections / 106 output reports。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/traditional-design-and-brand-workflow-2026-07-17.md`
> 传统设计工作与品牌工作的专业流程（2026-07-17 query）：以 Double Diamond 的两次发散/收敛为骨架，展开品牌项目的项目定义、研究诊断、品牌战略、语言识别、创意方向、识别系统、关键触点验证、生产发布、治理和测量；区分长期品牌系统与单一设计交付，列出六个决策门、典型产出、协作规则和常见失败，并说明 AI 压缩制作周期但没有消除战略取舍、创意判断与真实验证。
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/), [self-verification](/wiki/concepts/self-verification/), [harness-to-creative](/wiki/connections/harness-to-creative/)

### `output/reports/amazing-brand-and-landing-page-references-2026-07-18.md`
> 惊人的品牌设计与 Landing Page 产品参考图谱（2026-07-18 query）：以当前官方官网为对象，按产品即品牌、完整品牌世界、创意与 AI 结果展示三类，拆解 Linear、Raycast、Resend、Framer、Stripe、Daylight、Cosmos、Teenage Engineering、Nothing、Poolsuite、Runway、FLORA、Krea、Figma 等案例的产品机制、可借鉴点和误学风险；结合 Combo 当前 creator-first 分发边界，提出创作者前景品牌 + 单一服务商品 + Combo 信任层的品牌架构、60 秒 Landing 产品 Demo，以及 Precision Diagnostic、Creator Editorial、Visible Transformation 三条创意方向。
- 关键概念：[creative-agent-design](/wiki/concepts/creative-agent-design/), [creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [self-verification](/wiki/concepts/self-verification/), [combo-startup](/wiki/maps/combo-startup/)

### `raw/articles/waic-2026/official-exhibitors-api-snapshot-2026-07-18.json`
> WAIC 2026 官方企业目录 API 不可变快照（2026-07-18）：完整保存 11 页 POST 请求与响应，共 1,020 条唯一 enterpriseCode；目录混合 918 条展商身份记录、92 条纯论坛主办方和 10 条身份未标注记录。

### `raw/articles/waic-2026/official-products-api-snapshot-2026-07-18.json`
> WAIC 2026 官方公开展品 API 不可变快照（2026-07-18）：原始 1,394 行、1,389 个唯一 productCode，包含行业字典、重复代码审计、展位、企业映射、首发字段和媒体地址。

### `output/reports/waic-2026-exhibitor-landscape-2026-07-18.md`
> WAIC 2026 上海参展企业全量资料与产业图谱（2026-07-18 query，2026-07-19 补产品链接）：抓取官网 1,020 条目录记录、1,389 件去重公开展品和 901 条展位关系；区分 918 条展商身份记录与 916 家实体去重展商，并用展品 API、WAIC 官方展商长图及区政府/园区发布补齐 67 条目录外线索，形成 942 个 WAIC 官方资产可确认单位、983 个跨来源可确认单位/品牌口径。附 8-sheet Excel、CSV、JSON、产品链接、来源与数据质量边界。

### `output/reports/waic-2026-companies-for-combo-2026-07-18.md`
> WAIC 2026 对 Combo 的重点企业与现场验证清单（2026-07-18 query）：不按大会知名度，而按“创作者供给—专业方法产品化—可追踪分发—支付/分账/退款—竞品验证”筛选重点对象；立即实验优先 SHAI、Evoken、叽里咕咕、B站 Toy、汇付，战略竞争重点看 Profy，并用 Stilo、UniGrow、Open Design、美人支招等检验结果产品化、creator-led GTM、能力资产化和付费复购机制。附现场五问、最小合作提案、硬筛选线和分馆路线。

### `output/reports/waic-2026-priority-product-links-2026-07-19.md`
> WAIC 2026 Combo 重点参展方产品链接核验表（2026-07-19 query）：确认 WAIC 官网展品只有目录弹窗、没有稳定单品永久链接；为 17 条重点产品/平台核验 15 条外部官方入口，GrowX 使用 WAIC 官方视频兜底，Stilo 保持空白待现场扫码。全量 1,389 件公开展品均写入按“外部官方产品页 → WAIC 视频 → WAIC 图片”解析的最终可用 URL；附更新后的 8-sheet Excel、重点 CSV 和核验证据 JSON。

### `output/reports/wado-language-product-analysis-2026-07-19.md`
> Wado 产品分析（2026-07-19 query）。结论：Wado 不是普通 SaaS 或 AI code generator，而是一门只面向 WebAssembly Component Model 与 WASI 0.3+ 的实验性静态类型高级语言和工具链；用 Rust 式类型安全、TypeScript 式语法、Wasm GC、显式 `with Capability` effect system 生成小型自包含 `.wasm`，真实 wedge 是让组件接口、权限边界与代码都更 agent-legible。当前核心语言和 HTTP service 已可运行，但主要依赖 Wasmtime，完整愿景仍等待浏览器 Component Model、WASI 1.0 与 CM×Wasm GC 集成。对 Combo 的价值是远期 capability manifest、受控第三方代码执行和机器可验证权限合约参考；它不构成当前创作者需求、付费或分发证据，也不值得让 Combo 转向语言/runtime 基础设施。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/alkera-data-agent-and-dataagentbench-2026-07-19.md`
> Alkera 与 DataAgentBench 分析（2026-07-19 query）：Alkera 是理解生产 data stack 的专用执行 Agent，以跨平台 column-level lineage、graph-based planning、living knowledge base 和权限/审批/audit guardrails 支撑数据工程、分析与科学任务。YC 所称 benchmark 是 UC Berkeley/Hasura 的 DAB：54 个问题、12 个跨库数据集，测异构数据库整合、脏 join key、自由文本结构化和领域规则，而非 spreadsheet 或单纯 text-to-SQL。榜首 83.28% 使用 hints 与 DAB-specific tuned prompt，能证明复杂数据问答能力，但不能直接外推为生产 data stack 自治可靠率。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/)

### `output/reports/gsc-mcp-project-analysis-2026-07-20.md`
> gsc-mcp 项目速析（2026-07-20 query）：一个本地运行、service account 鉴权、只读的 Google Search Console MCP Server，把 properties、clicks/impressions/CTR/position、URL index inspection 和 sitemaps 包装成 4 个 tools，供 Claude Code、Claude Desktop、Cursor 等 MCP client 查询。它不是 SEO Agent、爬虫或优化器，只是 AI 与 GSC API 之间的薄适配层。当前 manifest 为 v0.1.0，GitHub 显示 2 commits、2 stars、无 release；优点是 MIT、简单、可审计、read-only，边界是暂无成熟托管、多租户 OAuth、测试/CI、缓存与配额治理。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [tool-routing](/wiki/concepts/tool-routing/)

### `output/reports/go-micro-project-analysis-2026-07-20.md`
> Go Micro 项目速析（2026-07-20 query）：一个从传统 Go 微服务框架演进而来的 Agent harness + service framework。核心是把 Agent 当作带 LLM 的分布式 service，让业务 endpoint 自动成为 tool，Agents、services 与 durable flows 共享 registry、RPC、broker、store 和 execution guardrails，并通过 MCP 暴露 tools、通过 A2A 暴露 Agents。它不是轻量聊天 SDK或托管 Agent SaaS，更适合 Go 团队构建需要真实服务调用、持久状态、恢复和协议互通的生产 Agent 系统。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [agent-communication](/wiki/concepts/agent-communication/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `output/reports/open-seo-project-analysis-2026-07-20.md`
> OpenSEO 项目速析（2026-07-20 query）：开源、可自托管的 SEO 工作台，把 DataForSEO 与 Google Search Console 数据、Web UI、23 个 MCP tools 和 keyword research / clustering、竞品、link prospecting 等 Agent Skills 组合起来，覆盖关键词、排名、竞品、外链、站点审计、local SEO 与 AI Visibility。它的价值是把传统 SEO SaaS 变成 agent-ready、可修改、按 API 用量付费的操作层，不是自建搜索索引或全自动排名 Agent。MIT；Docker/Cloudflare 两种自托管路径；截至查询约 5.1k stars、385 commits、最新 v0.1.0。核心边界是仍依赖付费 DataForSEO 数据，Docker local_noauth 不可裸露公网。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [skills-system](/wiki/concepts/skills-system/), [tool-routing](/wiki/concepts/tool-routing/)

### `output/reports/flightwake-project-necessity-analysis-2026-07-20.md`
> Flightwake 必要性分析（2026-07-20 query）：跨 session 工作状态、decision why、traps 与验证证据不会随模型变强自动统一，repo-local、跨 Agent、进 Git 的轻协议有长期价值；但 Flightwake 主要是 `STATE + ADR + gotchas + handoff + hook` 的 packaging，并非不可替代。项目创建两天、8 stars、0 forks，尚无外部 adoption、benchmark 或长期漂移数据；适合多成员/多 Agent、频繁跨 session repo 做 1–2 周可逆试验。
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [context-engineering](/wiki/concepts/context-engineering/), [harness-engineering](/wiki/maps/harness-engineering/)

### `output/reports/k4-algebraic-swarm-project-analysis-2026-07-20.md`
> K4 AlgebraicSwarm 分析（2026-07-20 query）：仓库实际是 input validator、intent bridge、四角色串行 controller、bounded retry 与 filesystem state 的约 2,590 行 Markdown prompt/spec，不是可运行 runtime。有用部分是输入隔离、显式 STATE/BWR/PTR、committed/sandbox 分层和有限重试；十二 equations 只是电路公式代数重排，映射到定性角色后无可测量变量或外部 evaluator，Landauer、Markov blanket、Quantum Zeno 主要为隐喻。当前 3 stars、0 forks、无代码/测试/release/benchmark，应视为 speculative prompt art / cognitive framework。
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [context-engineering](/wiki/concepts/context-engineering/), [agent-communication](/wiki/maps/agent-communication/), [harness-engineering](/wiki/maps/harness-engineering/)
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/maka-agent-project-analysis-2026-07-20.md`
> Maka Agent 项目分析（2026-07-20 query）：Maka 是 local-first、log-first、projection-driven 的个人 Agent workspace/runtime，以 append-only Runtime/Task Event Log 保存 model、tool、permission 与 termination facts，再投影出 Session/UI、模型 context、durable TaskRun 和 Self-check evidence。仓库约 2,090 files、797 test files，main CI 成功，证明并非概念项目；但仍处 source/contributor 阶段，默认无 OS sandbox、credentials 本地明文、SQLite canonical 与 safe resume opt-in、side-effect reconciliation 未完成。对 Combo 的价值是 Verified Run Ledger、context/evidence 分层、claim 不等于结算与 indeterminate 一等状态，不构成重造通用 runtime 的理由。
- 关键概念：[agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)

### `output/reports/agentharm-benchmark-overview-2026-07-21.md`
> AgentHarm 测试集概览（2026-07-21 query）：面向恶意用户直接指挥 LLM Agent 的 misuse 安全 benchmark；110 个 base behaviors 经四种任务变体扩为 440 项，覆盖 11 类危害，用 synthetic tools 与细粒度 rubric 同时测拒绝稳健性和 jailbreak 后的多步有害任务完成能力。它不是间接 prompt injection 测试，Harm Score 越高代表有害执行越成功；synthetic 环境与基础多步能力不能外推为 Agent 整体安全性。
- 关键概念：[agent-loop](/wiki/concepts/agent-loop/), [tool-routing](/wiki/concepts/tool-routing/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `output/reports/fabraix-ai-security-solution-assessment-2026-07-21.md`
> Fabraix 安全方案审计（2026-07-21 query）：Nyx 通过真实接口做持续、黑盒、多轮自适应红队和修复后 replay，Arx 记录 Agent lifecycle events 并在高风险 action 前同步检查；二者作为发现/回归层与附加 runtime guard 的方向合理。公开的 AgentHarm 78%、10,000+ strategies、20x 与 ACE 仍缺独立复现、误报漏报、延迟和 fail behavior 证据；black-box 也看不到 source/supply-chain/authz/identity 等内部风险。可做隔离 PoC，但不能替代 deterministic authorization、least privilege、sandbox、limits、DLP、human approval 与传统 AppSec。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [tool-routing](/wiki/concepts/tool-routing/), [agent-runtime](/wiki/concepts/agent-runtime/)

### `output/reports/agent-communication-mainstream-methods-2026-07-21.md`
> Agent 通信当前主流方法（2026-07-21 query）：区分应用内编排、消息/状态载体、跨系统协议三层。生产主线是 Manager/Supervisor、显式 Workflow/Shared State、Handoff 与 Fan-out/Fan-in；Blackboard/Artifact Store 和 Pub/Sub 适合异步长任务。Group Chat、Debate、Market、Emergent、Latent Communication 各有场景但不是同等成熟的默认架构。MCP 主要连接工具/Context，A2A 面向跨 runtime Agent 互操作，传统 HTTP/gRPC/queue 仍承担可靠性底座。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)

### `output/reports/fangcun-leap-vc-pitch-framework-2026-07-21.md`
> 方寸跃迁 VC 被 Pitch 框架（2026-07-21 query，已扩展为会谈手册）：问题真实、团队稀缺、方向顺风，但商业证明落后于技术叙事。以七个关键不确定性组织会谈：客户购买触发、真实 beachhead、生产控制点、收入可复制性、竞争护城河、团队公司化和融资效率；通过单一生产客户九节点穿透、产品经营表、收入瀑布、failure walkthrough、组织/IP 与融资里程碑获取证据，并提供一小时脚本、追问词典和 21 分会后评分卡。
- 关键概念：[safe-autonomy](/wiki/concepts/safe-autonomy/), [agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/)

### `output/reports/agent-security-sector-core-logic-2026-07-21.md`
> Agent Security 赛道分析（2026-07-21 query）：Agent 安全保护的不是抽象的“模型不作恶”，而是企业将行动权委托给概率模型后，用户意图、独立身份、任务范围权限、数据资金与生产系统、执行链、供应链和责任证据仍受控。需求随 delegated authority 而非 token 增长；最高价值控制点位于生产 action path，以 agent identity、task-bound authorization、deterministic policy、sandbox/limits/HITL 和 audit evidence 扩大 safe autonomy。红队和 Guard 可作入口，但只有迁移到持续 runtime control 才可能形成平台。
- 关键概念：[safe-autonomy](/wiki/concepts/safe-autonomy/), [agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [tool-routing](/wiki/concepts/tool-routing/)

### `output/reports/kastra-runtime-authorization-product-analysis-2026-07-23.md`
> Kastra 产品解释与反方判断（2026-07-23 query）：它不是执行任务的 Agent，而是 Agent 与 shell、filesystem、database、API、model 和 browser action 之间的 runtime authorization layer，以确定性 ALLOW / DENY / HOLD、approval 和 hash-chain evidence 控制 side effect。问题真实，但独立产品价值偏弱：核心功能大多可由 Agent 原生 permission、OS sandbox、IAM/PAM、API Gateway、OPA/Cedar、审批流和 SIEM 组合实现；客户端 enforcement 有覆盖与绕过问题，真正权威控制应尽量靠近目标 API、credential 和资产边界。对个人和多数当前 Agent 项目基本鸡肋，仅对跨多 Agent、已有高权限生产自治和合规要求的窄客户有明确价值。Kastra 仍缺生产客户、action volume、误拦漏拦、可靠性和独立合规证据，现阶段更像真实问题上的过早平台或成熟安全产品未来会吸收的 feature。
- 关键概念：[safe-autonomy](/wiki/concepts/safe-autonomy/), [agent-runtime](/wiki/concepts/agent-runtime/), [human-in-the-loop](/wiki/concepts/human-in-the-loop/), [tool-routing](/wiki/concepts/tool-routing/)

### `output/reports/intuned-automation-integration-analysis-2026-07-22.md`
> Intuned automation integration 分析（2026-07-22 query）：它不是预制 SaaS connector，而是把无 API / API 不完整的网站浏览器流程封装为可调用、带 AuthSession、可调度、可观察和可维护的 API。核心机制是 Playwright 确定性代码 + managed browser/runtime + Runs/Attempts/Jobs + traces，再由 Agent 在首次探索和失效时生成/修复代码；Web Tasks 通过 `reuseKey` 保存 working revision，使首次 AI-heavy、稳定期 code-heavy，失败不污染旧版本。Self-healing 已形成 anomaly→issue→branch→merge/deploy 闭环，但仍标为 experimental，独立可靠率未公开。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [agent-runtime](/wiki/concepts/agent-runtime/)

### `output/reports/basal-embodied-ai-team-assessment-2026-07-22.md`
> Basal 具身智能团队评估（2026-07-22 query）：清华 AIR-DREAM 核心研究成员外溢、以 data-efficient / cross-embodiment robot learning 为主线的早期团队。DecisionNCE、IVM、UniAct、X-VLA 形成连续研究谱系；X-VLA 已获 ICLR 2026 接收、开源，并拿到 IROS 2025 AgiBot Manipulation Track 第一。技术团队与开源/竞赛证据强，但六模块统一闭环、800 万美元融资、ODEWorld、50 万 HF 下载、硬件指标、公司 IP 与商业客户未被公开证据充分确认。结论是值得技术与公司化深度尽调，不应按“国内唯一全栈基础模型公司”叙事直接追高。
- 关键概念：[world-model](/wiki/concepts/world-model/), [world-model](/wiki/maps/world-model/)

### `output/reports/basal-embodied-ai-competitive-landscape-2026-07-22.md`
> Basal 竞品格局（2026-07-22 query）：直接竞争者是自变量、星海图、千寻智能、Physical Intelligence 与 Skild AI，争夺跨本体机器人基础模型控制层；银河通用、智平方、智元和 Figure 是走向模型+本体+场景后的下一阶段对手。Basal 在 X-VLA/UniAct 的研究质量、模型效率和 IROS 真机验证上进入一线候选，但资本、installed base、客户数据和商业闭环明显落后。国内头部私募估值普遍被报道至 100–200+ 亿元，Skild >140 亿美元、Figure 390 亿美元、π 据报道洽谈 >110 亿美元；这些估值主要购买未来平台和数据飞轮期权，不能等同收入或公允价值。
- 关键概念：[world-model](/wiki/concepts/world-model/), [world-model](/wiki/maps/world-model/)

### `output/reports/baso-investment-meeting-analysis-2026-07-23.md`
> 本溯智能真实融资会议分析（2026-07-23 query）：会议把项目从“已融800万美元、整建制全栈世界模型公司”校正为“启动约三周、拟募4500万元、投前3.5亿元、核心新模型待验证的pre-product团队”。真正有价值的命题是动作中心、从失败修正过程学习、few-shot跨本体适配能否降低第二/第三任务边际交付成本；最大风险是核心成员未完全全职、历史IP/数据未装入公司、in-context含义不清、256→1 token可能损失动作信息、无付费客户。本轮几乎全部资金用于一次模型验证，建议继续DD但暂缓投决，以全职/IP、投资方设计的1/3/5-shot跨本体真机盲测和有预算的柔性工业PoC为三道投资闸门。

### `output/reports/basal-core-paper-authorship-audit-2026-07-23.md`
> 本溯核心论文与作者贡献审计（2026-07-23 query）：将公司核心成员共同一作/Project Lead 的成果与清华 AIR-DREAM Lab 历史 portfolio、Workshop、preprint 和在投论文分开。综合正式录用、作者贡献和产品相关性，最核心五篇为 X-VLA、UniAct、LBP、IVM、Robo-MUTUAL；FISOR、DIPOLE、Diffusion Planner 是专项能力佐证。DecisionNCE 贡献真实但只是 ICML 2024 Workshop Outstanding Paper；Robo-MUTUAL 实为 ICRA 2025；ODEWorld 无公开稿且仍在投，WVM 仍为 submission，均不能算已兑现顶会成果。涉及 Yinan Zheng、Haoyi Niu 的公司归属仍须实名、全职及 IP 文件确认。
- 关键概念：[world-model](/wiki/concepts/world-model/), [world-model](/wiki/maps/world-model/)

### `output/reports/cognikernel-memory-innovation-analysis-2026-07-22.md`
> CogniKernel Memory 创新分析（2026-07-22 query）：真正价值不是新算法，而是把 coding-agent memory 做成 typed、event-sourced、action-aware、fail-open 的本地 decision memory runtime。最强设计是 supersession 与 Write/Edit action point 的 prohibition recall；本地代码和测试密度真实，但 README benchmark 缺公开复现材料，测试实跑为 1479 passed、1 failed，adoption 仅 2 stars/单一 contributor。
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [memory-to-context](/wiki/connections/memory-to-context/), [harness-engineering](/wiki/maps/harness-engineering/)
### `output/reports/cartai-project-business-analysis-2026-07-22.md`
> CartAI 项目与商业分析（2026-07-22 query）：定位为面向搜索、社交、内容、垂直 AI 与金融 App 的 Agentic Commerce execution layer；用 Catalog、浏览器 Agent Checkout、tokenized payment、webhook 和 affiliate attribution 把商品 URL 变成商家原生订单。商业模式为 B2B2C production API，按 GMV basis points/usage 收费并捕获 affiliate commission 后与分发平台分成；公开材料尚未提供 checkout 成功率、人工介入率和 contribution margin，规模化单位经济仍待验证。

### `raw/articles/product-research/meitu-visual-ai-gary-ngan-interview-2026-07-14.md`
> AI Proem 于 2026-07-14 发布的美图 CFO Gary Ngan 完整英文访谈及 AI 转录。美图将自身定义为照片、视频和设计领域的 AI 应用公司，以生活娱乐与生产力两组产品切入垂类视觉工作流；核心论点是审美、可控性、用户行为数据和垂直上下文使通用模型无法单独覆盖全部场景。访谈同时讨论自有模型占 90% 以上输出、订阅增长、AI credits、算力成本、竞争、安全和全球本地化。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/meitu-visual-ai-gary-ngan-interview-zh-2026-07-14.md`
> 上述 AI Proem 美图 CFO 访谈的完整中文翻译，保留文章导语、章节时间轴和约 1 小时的逐段转录，并保留原站“AI 自动生成，仅供参考”的转录声明。译文统一了 MeituHub、MiracleVision、Picchi、DesignKit、Kaipai、Vmake、RoboNeo 等产品名及 Agent、prosumer、ARPU、TAM、AI credits 等术语。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/claude-mythos-5-benchmark-details-2026-07-23.md`
> Claude Mythos/Fable 5 发布图中的 13 项 benchmark 细节：SWE-Bench Pro、FrontierCode、GDPval-AA、GDP.pdf、Blueprint-Bench 2、AutomationBench、OSWorld-Verified、Legal Agent Benchmark、HLE、BioMysteryBench、Terminal-Bench 2.1、ExploitBench 和 HealthBench Professional。核心是区分任务通过率、rubric/normalized score、Elo 与 capability coverage，并给出数据规模、评测方式、tools/harness 条件和局限；SWE-Bench Pro public split 还需附带约 30% 任务可能有问题的最新审计警告。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [harness-engineering](/wiki/maps/harness-engineering/)

## 新增 Clippings 归档（2026-07-23 批次）

### `raw/articles/harness-engineering/claude-fable-5-finding-your-unknowns.md`
> Anthropic 员工 Thariq Shihipar 的 Agentic Coding 实践指南：将 prompt/spec/context 视为 map，将真实代码库和约束视为 territory；用 known/unknown 四分法、blind-spot pass、prototype、interview、reference、implementation notes、explainer 和 quiz 在实现前、中、后持续发现未知项。
- 关键概念：[unknowns-driven-agent-collaboration](/wiki/concepts/unknowns-driven-agent-collaboration/), [harness-engineering](/wiki/concepts/harness-engineering/), [spec-driven-development](/wiki/concepts/spec-driven-development/)

### `raw/articles/agent-communication/mcp-ecosystem-census-2026-07.md`
> MCP Census 对 2026-07-07 官方 Registry API 的数据快照：15,382 个去重 Server、7,203 个 remote endpoint；16% 存在可核实 repo/package/维护问题，生态呈明显长尾，并存在共享 repo metadata 与同名 collision。数字必须带快照日期，Registry listing 不等于安全或质量认证。
- 关键概念：[mcp-server-trust](/wiki/concepts/mcp-server-trust/), [agent-communication](/wiki/concepts/agent-communication/), [safe-autonomy](/wiki/concepts/safe-autonomy/)

### `raw/articles/startup/youmind-growth-engineering-playbook-2026-03-30.md`
> YouMind 增长工程师一线复盘：以 AARRR 为目标执行“需求假设→低成本 MVP→内容/渠道分发→漏斗分析→扩大、优化或停止”，涵盖资源集合站、SEO、Chrome Store、Product Hunt、失败案例和 Agent 自动化。核心边界是高流量若不连接目标用户与付费需求，不能证明有效增长。
- 关键概念：[growth-engineering](/wiki/concepts/growth-engineering/), [skills-system](/wiki/concepts/skills-system/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/)

### `raw/articles/startup/deepseek-liang-wenfeng-investor-meeting-quotes-2026-07-22.md`
> 「elsewhere」多方汇编的梁文锋投资人会议 52 条语录，涉及 DeepSeek 的 AGI 主线、Coding Agent、持续学习、开源低价、成本效率、合理利润、组织稳定与战略克制。原文明确说明部分措辞可能与原话有出入，必须标作二手媒体汇编，不能作为官方逐字稿。
- 关键概念：[agent-memory](/wiki/concepts/agent-memory/), [world-model](/wiki/concepts/world-model/), [world-model-to-agent](/wiki/connections/world-model-to-agent/)

### `raw/articles/agent-economy/real-world-workflow-data-rlaas-2026-07-22.md`
> 真实工作流数据、RL environment 与企业 post-training 的行业综述：区分 Type 1/1.5/2 数据，提出 hillclimbability、可验证性与可重置性、OPSD、Dreaming，以及企业 post-training 的“数据独特性 × Eval 清晰度 × 任务频率 × 单次改善价值”判断式；市场数字和单条数据价格属于作者汇编判断，需另行核验。
- 关键概念：[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/), [self-verification](/wiki/concepts/self-verification/), [agent-memory](/wiki/concepts/agent-memory/), [world-model](/wiki/concepts/world-model/)

### `wiki/concepts/unknowns-driven-agent-collaboration.md`
> 未知项驱动的人机协作：把 map 与 territory 的差距作为可管理状态，用实现前/中/后的 artifact 持续暴露、记录和验收高影响未知项。

### `wiki/concepts/mcp-server-trust.md`
> MCP Server 信任：Registry 解决 discovery，但生产信任还需要 publisher identity、package/repo/release provenance、维护状态、权限、扫描、运行证据、撤销与 incident response。

### `wiki/concepts/growth-engineering.md`
> 增长工程：用工程能力、内容与渠道实验、产品漏斗和数据验证，对 Acquisition、Activation 等业务结果负责；上线与流量不是终点，完整付费漏斗才是验收面。

### `wiki/concepts/agentic-trajectory-data.md`
> Agent 工作轨迹数据：记录 intent、state、tool action、outcome、用户反馈、成本与 lineage，先用于 Harness / eval 改进，再在数据独特、Eval 清晰、任务高频且单次改善价值足够高时考虑 post-training。

### `output/reports/recent-clippings-2026-07-23.md`
> 2026-07-23 Clippings 批次整理报告：记录 5 篇剪藏的去重、Raw 归档路径、证据边界、主题压缩、4 个新概念、主要 wiki 回流与后续研究问题；批次完成后 `Clippings/` 为空。

### `output/reports/combo/01-narrative/combo-internal-storyline-and-vc-bridge-2026-07-27.md`
> Combo 本轮内部故事线与 VC 桥接工作底稿（2026-07-27 query）：明确 Combo 不做基础模型、消费者购买具体结果、供给者可在前台隐身但人的来源/控制权/经济收益不能消失；把能力对象定义为人类衍生的 Agentic 供给、交易对象定义为结果、学习对象定义为 `Context + Run + Verdict`、内容对象定义为经授权后值得旁观和“应用到我”的真实行动。报告将 Feed、货架、联系人和自动选择解释为需求发现、明确购买、关系留存与高信任路由的不同阶段，保留结果交易网络和内容驱动行动社区两条可并存上行路径，并用结果付费、服务软件化、反馈增益、复购/跨供给与站内内容订单四道证据闸门决定分叉。

### `output/reports/combo/05-fundraising/combo-vc-investment-committee-view-2026-07-27.md`
> Combo 的 VC 投资委员会视角（2026-07-27 query）：指出 VC 故事是“结构性变化—可验证 wedge—复利控制点—基金级回报—本轮风险消除”的投资论证，并拆开 Story、Underwriting 与 Option Value。Combo 当前最可信分类是 Pre-PMF 的专家服务产品化 / 经营交易系统，Why Now 和远期期权较强，首个付费原子、通用模型对照、单位经济、可复制 GTM 与控制点最弱；纪律型 Seed VC 更可能 Pass / 跟踪，而不是为内容平台或 Marketplace 预付估值。最可承保 Bull Case 是成为 AI-native 专业服务商的订单、履约和支付 system of record；改变投资决定需要可复制付费需求、专家衍生供给增益、正贡献毛利、服务商净增量与持续经营，以及至少一个可复利控制点。

### `output/reports/combo/02-market-competition/combo-five-stage-growth-competition-and-gates-2026-07-28.md`
> Combo 五阶段增长、竞争与验证闸门（2026-07-28 query）：将“单 KOL → 垂类复制 → 平台关系 → 专业服务美团 → 目标托管”改写成五次独立验证，而非自然升级；为每阶段指定唯一主分发循环、最难问题、主要替代、必须沉淀的资产、不成立信号和升级 Gate。报告补充 30 天 KOL 试点、消费者/供给者两套留存因果、五个信任转移实验，并把模型厂商、抖音/小红书/微信、阿里/美团及海外创作者、职业与服务市场的挤压统一解释为需求入口、关系、交易、履约和结果记录五层控制权竞争。阶段三、四明确为条件式期权。

### `output/reports/combo/01-narrative/combo-ai-historical-view-2026-07-28.md`
> Combo 的 AI 历史观（2026-07-28 query）：把梁文锋关于语言模型、CoT、Agent、持续学习、模型收敛和低成本扩散的判断概括为“智能生产史”，再补上 Combo 关心的“智能进入社会后的经济史”。核心判断是模型将通用认知变成基础设施、Agent 将人的部分能力变成可复制供给，而 Combo 只在这些供给能交付具体用户愿意购买的结果时成立；报告明确不押注“人永远比模型强”，并用盲测付费、真人分钟、Context 对照、评价增益、信任转移和网络流动性六项 Gate 证伪。

### `output/reports/combo/01-narrative/internet-product-paradigm-history-2000-2026.md`
> 互联网产品范式史（2026-07-28 query）：不把 2000–2026 写成公司和终端年表，而沿“什么能力变便宜、什么成为新稀缺、用户核心动作、产品原子、分发和商业模式”梳理意图与交易 Web、参与式 Web、Social / Feed、Mobile / App、算法与交易网络、SaaS / 超级 App / Creator、Generative AI / Copilot、Agentic 产品八次迁移。核心判断是互联网不断把网页、关系、注意力、位置、订单、工作流、意图与执行变得可计算，并缩短意图到结果的距离；对 Combo 的牵引是把“看见别人的方法”推进为“应用到我”，以 Result contract、私人 Context、可检查 Run、Verdict 与补救构成有边界的结果产品，而不是先做 Agent 商店或泛内容 Feed。

### `output/reports/llm-benchmark-landscape-and-model-card-guide-2026-07-23.md`
> LLM benchmark 全景与模型卡阅读指南：交叉盘点 OpenAI、Anthropic、Google、xAI 的前沿系统卡，以及 DeepSeek、Qwen、Kimi、Meta、Mistral、GLM 的官方开放权重模型卡/技术报告。行业已从 MMLU/AIME/LiveCodeBench 等裸模型单元测试，迁移到 SWE/Terminal/OSWorld 等 Agent 系统测试和 GDPval/LAB/HealthBench 等交付物评测；报告区分 benchmark、eval、leaderboard、Arena，解释 accuracy、pass@k、pass^k、rubric、all-pass、Elo、capability coverage、time horizon，列出污染、饱和、harness、预算、grader、基础设施和版本漂移的检查清单，并给出产品自建 eval 四层方法。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/), [tool-routing](/wiki/concepts/tool-routing/), [harness-engineering](/wiki/maps/harness-engineering/)

### `output/reports/yc-company-directory-knowledge-base-ingestion-feasibility-2026-07-25.md`
> YC 全量项目入库可行性审计：2026-07-25 官网公开搜索索引实测 6,079 家公司，其中 Active 4,201、Inactive 1,055、Acquired 800、Public 23；字段足以建立基础公司库，但 YC Terms 明确禁止 scraping / data mining，YC Has It 只适合问题到 top matches 的语义搜索。推荐先取得 YC 书面授权或审计有清晰 provenance 的授权 dataset，再用 dated immutable JSONL/Parquet snapshots 进入 raw，wiki 只编译生态地图和高价值公司概念。

### `output/reports/fractal-hierarchical-agent-runtime-product-analysis-2026-07-26.md`
> Fractal 是本地 Git-native 多 Coding Agent organization runtime：每个自治节点绑定 branch/worktree、tmux iteration loop、NODE.md、plans 与 private memory，并可递归生成 child；整棵树共享 SQLite lifecycle/cost/event ledger 和 Radio。真正创新是让组织拓扑按任务生长，同时以 Git artifact、预算、状态机和 operator control 收束自治；不是新模型、hosted sandbox 或固定 workflow DAG。适合模块化长周期 coding，不适合小任务、强耦合共改、敏感主机和非 Git 外部副作用；官方默认绕过 tool permission，且 v1.0.0 有公开 squash-merge regression 报告。
- 关键概念：[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/), [agent-runtime](/wiki/concepts/agent-runtime/), [harness-engineering](/wiki/concepts/harness-engineering/), [safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/pilot-protocol-product-analysis-2026-07-28.md`
> Pilot Protocol 是把 Agent 可达性、能力发现、本地安装、方法调用与机器支付串成闭环的垂直基础设施；`/publish` 用人工代接入把现有 API/CLI 生成 Agent-first adapter。公开工程实现和 live-node 控制面真实，但 active nodes 不等于独立用户，RPS 主要包含 registry 心跳等控制流量；公开 catalogue 只有 23 个 active App、约半数第一方，OS 级 sandbox、publisher trust、revocation、第三方流动性和企业收入仍待验证。
- 关键概念：[agent-communication](/wiki/concepts/agent-communication/), [agent-runtime](/wiki/concepts/agent-runtime/), [mcp-server-trust](/wiki/concepts/mcp-server-trust/), [communication-to-economy](/wiki/connections/communication-to-economy/)

### `output/reports/combo/02-market-competition/pilot-protocol-and-combo-strategic-relationship-2026-07-29.md`
> Pilot 与 Combo 当前不是正面竞品：Pilot 把 API/CLI 封装成 Agent 可发现、安装和调用的 method，Combo 把人的方法封装成有明确输入、价格、交付、验收、补救和分账的结果 SKU。Pilot 可以成为 Combo 未来的 Agent-native 分发渠道或可选履约工具，但不应成为 MVP 核心依赖；Combo 应学习其 spec、adapter、manifest、permissions 和 first-call 设计，同时继续拥有 result contract、Context、订单、履约、退款、创作者收益和 Verdict。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [agent-communication](/wiki/concepts/agent-communication/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [communication-to-economy](/wiki/connections/communication-to-economy/)

### `output/reports/combo/02-market-competition/ai-current-situation-vendors-consumers-combo-space-2026-07-28.md`
> AI 当前时局与 Combo 条件式空间（2026-07-28 query）：不预设 Agent 时代或能力流通的历史结论，先调查模型、内容/社交、电商和专业服务厂商如何从各自控制点争夺“意图—Context—执行—交易”闭环，再区分消费者在 AI 中主要获取建议、信息和数字加工，在内容平台继续消费娱乐、人物、经验与社会证明，并在购物等高风险行动中保留最终决定权。结论不是 Combo 已发现白空间，而是存在一个待验证的狭窄履约缺口：高 Context、半标准化、纯人工太贵但结果可定义、检查和返工的垂类专业服务。报告排除通用 Agent Builder、Store、Memory、泛 Feed 和横向 Outcome Marketplace 作为当前定位，并提出真实私信调查、三方盲测与案例到付费链路实验。

### `output/reports/ai-field/ai-field-2026-internet-user-action-and-relationship-change.md`
> 《AI 现场：2026 互联网用户行动与关系变迁报告》（2026-07-28 query，2026-07-30 因果核心重写）：从 2000—2026 年中国互联网的七层关系出发，观察 AI 如何进入问答、内容加工、工作、消费与外部行动；新增物质条件、制度失配、主体利益、组织机制、扩散阈值和制度结果六项因果审计，明确互联网与 AI 都不是技术自动升级。报告继续以“发布/可用→首次尝试→重复使用→付费留存→委托意图→经验证的外部执行→工作流或制度变化”为证据阶梯。核心结论是 AI 的技术断裂已经发生、大众接触与产品采用正在扩散，但稳定产品范式仍缺跨产品频率和留存证据；“认知生产变便宜，可信完成仍昂贵”，可负责的通用委托与劳动制度革命尚未成立。

### `output/reports/ai-field/ai-field-2026-why-change-happens.md`
> 《AI 现场：变化为什么发生》（2026-07-30 query）：把“发生了什么”推进为可审计的历史因果。互联网被拆成远程资源共享、异构网络互联、Web 解决组织记忆和大众商业扩散四次出生；革命被拆成长期物质变化、制度失配、主体分化、旧秩序吸收能力下降、组织与资源、触发事件、替代权威和制度化，而非由苦难或技术单因果推出；AI 则被解释为 Web 数据、Transformer、scaling、算力资本、instruction following 与对话分发在 2022 年前后的汇合。报告进一步比较模型/云、大厂、垂直应用、管理者、劳动者、消费者与监管者的位置，提出四条未来路径、产品“结果责任”假设及反证条件。

### `output/reports/ai-field/ai-field-2026-visualization.html`
> 《AI 现场》单页交互可视化（2026-07-29 query follow-up，2026-07-30 因果重构）：首屏改为“变化为什么发生”，新增六项因果审计链、互联网/中国平台/AI 三个对照案例与五类 AI 主体位置，再承接七层历史关系、四项 2026 现场数据、用户与 AI 的四级关系、七级采用证据阶梯、三层行动控制点和八项结果契约。页面内置关系视角筛选、证据阶梯切换与来源弹窗，全部 CSS/JavaScript 内联、无外部依赖；已在 1440px 桌面和 390px 移动视口验证无脚本错误与横向溢出。

### `output/reports/sitin-ai-product-analysis-2026-07-30.md`
> SITIN.ai 产品研究（2026-07-30 query）：营销口径是为专业人士和创作者克隆 persona、自动经营 Instagram 等社交平台并交付高意向客户；当前公开 Creator PWA 的实际成熟 wedge 则是女性 creator / paid companionship 的 Agentic Marketplace。系统通过 Android SocialProxyWebview/Robot 控制 Instagram 登录会话，AI 自动维持聊天，红黄绿异常、语音/自拍 probe 和视频任务再升级给真人，并在自有 Chat/Live/PayPal 体系内完成付费和分账。真正差异是获客、AI 供给、真人 exception 与交易闭环；主要风险是 Meta 官方 API 不支持这种主动 robot 路径、AI 身份可能不透明、Terms/Privacy 仍停留在 Haven/旧社交产品、经营数字缺口径，以及陪伴互动 vertical 尚不能证明泛专业服务 Individual OS。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/05-fundraising/combo-new-recording-14-interview-analysis-2026-07-30.md`
> 新录音 14(1) 产品与融资对话分析（2026-07-30 query）：将 39:09 录音整理为 25 条带时间窗问答并同步到飞书 Base「问答全集」。核心收敛是 Combo 当前不是泛 Agent Marketplace，而是把创作者已有私域需求和服务做成低客单、可点击、可支付、可重复交付的 AI 产品；最强点是买方、卖方、商品和冷启动变量明确，主要缺口是相对通用模型的可测增量、复购、稳定履约、完整单位经济和团队壁垒。**Speaker attribution 尚未完成回听与 Base read-back，问答表不能用于推断具体参与者的提问、建议或立场。**
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/recordings/2026-07-30-新录音-14-1.timestamped.md`
> 新录音 14(1) 的本地 ASR 时间戳逐字稿，共 885 个片段；标注为未人工校对，并保留 SenseVoice 纯文本、MLX Whisper 纯文本与 segment JSON 作为交叉核验文件。

### `output/reports/prelint-product-validity-analysis-2026-07-30.md`
> Prelint 产品成立性判断（2026-07-30 query）：Agent 生成“技术正确但违背产品决策”的代码是会随 PR 吞吐放大的真实问题，把 Specs、ADR 和业务约束接入 Merge Gate 也是合理 Harness；但当前独立产品只是组织 Context 组装、双遍 LLM 语义 Review 与 GitHub 评论，面临文档治理好者可自建、文档治理差者无可信 source of truth 的悖论，并已被 GitHub Copilot Code Review、CodeRabbit Knowledge Base / Custom Checks、Cursor Bugbot Rules 覆盖。公开研究由模型评分，客户、留存、事故减少和人工 benchmark 均不足；长期成立需要升级为有 owner、时效、状态、引用、例外和确定性 Check 编译能力的组织决策控制面。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/)

### `output/reports/denovo-ai-business-manager-product-analysis-2026-07-30.md`
> DeNovo 产品与成立性分析（2026-07-30 query + follow-up）：不是替任意站点提供支付或流量的基础设施，而是面向 solo founder 和小生意的 AI launch kit / business operating suite，把 idea 或现有网址转成计划、品牌、网站或 Web App，再连接 Stripe、邮件、社交与 Meta Ads 并持续执行 GTM。公开 API、生成站点和运行 feed 能证明 build、deploy 与经营动作真实；但作为“从 idea 到 paying customers”的 AI cofounder 当前不成立：它自动化的是已过剩的网站、内容和 outreach 供给，而非需求、信任和履约；支付与渠道均不自有，activity 没有连接收入归因，新手高失败/成熟商家用专业栈的用户悖论、超宽产品表面积与 `$25` 定价也削弱留存和经济性。只有收窄到可标准化 vertical、承诺可验证 outcome，并拥有 booking/payment/revenue attribution，才可能成为真正 operating system。
- 关键概念：[growth-engineering](/wiki/concepts/growth-engineering/), [creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/)

### `output/reports/combo/01-narrative/combo-agent-miniapp-to-platform-evolution-2026-07-31.md`
> Combo 从 Agent Miniapp 到平台级机会的四轮综合研究（2026-07-31 query）：Round 1 证明当前只是 Capability、Studio、Runtime、Listing 等五条相邻能力链，消费者 Publication、Runtime HTML 安全、授权、可靠执行、订单和结算均未闭环；Round 2 证明 AI 使用、创作者供给、买家购买、Combo 收入不能混为一谈，当前也没有现金、采用、复购与全成本 cohort；Round 3 证明横向 Builder / Runtime / Listing / Checkout 正被模型平台、大厂和 AI Site Builder 吸收，既有服务市场与中国渠道又分别控制合同、验收、流量、支付和售后；Round 4 因而把当前事实身份统一为未闭环的 `Capability / Miniapp authoring + Runtime / Listing` 邻接组合，并把下一阶段唯一允许验证的公司假设收窄为“单一垂类、单一 Result SKU 的 AI-native 结果履约产品”。最终顺序是 Runtime HTML fail closed 与最小真实发布 → 结果原子 → 无创始人复制 → 垂直 system of record → 正贡献与结果学习 → 独立第三方依赖和跨参与者因果增益；只有最后两项出现才获得平台资格。报告新增四级 Kill Criteria、唯一 90 天主线和 Day 90 公司形态裁决；四轮完成只代表研究闭环，代码安全、支付法律、需求、经济和渠道 Gate 均尚未在现实中通过。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/01-narrative/combo-platform-future-vision-and-evolution-2026-08-03.md`
> Combo 平台未来与演化愿景（2026-08-03 future-thesis query）：把原先主导故事的“平台资格审查”降回承销 Appendix，改从 2035 年 AI-native Practice、内容“应用到我”、General Agent 采购专业服务和 Partner 扩展经济描述 Combo 赢后的世界。核心主线是 `Agent Miniapp Launcher → Practice OS → Service Extension Economy → Outcome Demand Network / Service Commerce Infrastructure → Agent Procurement Rail`：同一个 Provider、Service Product、客户、订单和经营历史从一项服务的出生，连续长成一门 AI 服务生意、第三方经济和面向人 / Agent 的采购网络。报告定义 Service Product 新原子、五类复利资产、三条上行、十年演化、收入层、最强 Bull / Bear，并给出 30 秒、两分钟和 12 页融资 BP 因果链；当前代码和 Gate 仅用于检验愿景，不再替代愿景。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [creator-tool-to-capability-network](/wiki/connections/creator-tool-to-capability-network/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/05-fundraising/combo-ai-application-investment-framework-v1-assessment-2026-08-03.md`
> Combo AI 应用项目投资判断框架 V1 首轮评估（2026-08-03 query）：将当前项目严格降到 S0 探索期，分别输出项目质量、证据置信度与门槛状态。十维暂评分为 55/100、合理区间 25–80、证据覆盖率约 36%，五项核心门槛为 0 通过、2 有条件通过、3 待验证、0 否决。最强投资理由是专业服务 AI 产品化的结构机会、团队相关经验与已有工程链路、可用创作者私域低成本验证；最大风险是粉丝购买尚未证明、产品可能坠入“工具太薄 / 服务太重”、Builder / Skill / Creator OS 竞争使当前护城河尚未运转。结论为等待里程碑：只用一个垂类、一个 Result SKU、一条真实资金链验证历史需求、相对通用模型的盲测增益、现金订单、退款 / 复购和逐单贡献毛利，不按 Marketplace 或平台期权提前定价。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/combo/02-market-competition/kajabi-patreon-product-mechanism-and-combo-comparison-2026-08-03.md`
> Kajabi 与 Patreon 产品机制及 Combo 对照（2026-08-03 query）：Kajabi 是面向教练、顾问、教育者和知识创作者的 SaaS 经营 OS，将课程、Coaching、社区、数字产品、网站、营销、支付、客户状态和 Analytics 放进一个系统，并以 Cofounder 辅助经营、以 Beta Expert Agents 支持销售与教学问答；Patreon 则把创作者与核心粉丝关系变成会员档位、独家内容、社区聊天和一次性数字商品交易，以约 10% 标准平台费加支付 / 提现 / 汇兑等费用变现。对 Combo 而言，Kajabi 是更近的供给侧邻接竞争者，Patreon 是变现替代与潜在分发渠道；两者都没有自动完成用户 Context 驱动、可验收 / 返工 / 升级真人的动态专业结果，但足以否定用页面、会员、普通聊天 Agent 或支付作为独立护城河。报告同时提出 `Kajabi / Patreon + ChatGPT 为什么仍做不成这项服务` 作为 Combo 首轮创作者访谈的高信息价值问题。
- 关键概念：[creator-ai-service-productization](/wiki/concepts/creator-ai-service-productization/), [combo-startup](/wiki/maps/combo-startup/)

### `output/reports/applovin-product-and-rise-2026-08.md`
> AppLovin 产品机制与崛起研究（2026-08-03 query）：AppLovin 不是消费者 App 或均衡型广告 SaaS 集团，而是由 MAX 供给拍卖入口、AppLovin Ads 效果需求和 AXON 价值预测组成的实时广告闭环；其崛起不是单一 AI 奇迹，而是 2018–2022 年以自营游戏和 MAX 解决冷启动、通过 Adjust / MoPub 补齐测量与流动性，AXON 2 上线与 2023 年经营拐点同期出现，2025 年出售低利润游戏后释放纯广告平台的经营杠杆。移动游戏主战场已有财务结果和第三方相对排名支持，但最近增长越来越体现为聚合净收入 / 安装上升而非安装量扩张，因果贡献、归因增量性、MAX 拍卖中立、平台隐私政策与电商客户长期留存仍是关键反证门槛。
- 关键概念：[growth-engineering](/wiki/concepts/growth-engineering/)

### `output/reports/ego-lite-codebase-analysis-2026-08-03.md`
> Ego Lite 代码库第一轮源码学习（2026-08-03 query）：公开仓库不是完整 Agent 或 Chromium 浏览器本体，而是让 Codex、Claude Code 等外部 Agent 以 JavaScript code batching 驱动闭源 Ego Lite App 的 Node/CDP browser execution harness、Skill 与静态 site learning packs。报告走通 `getByRole().click()` → locator/resolver → CDP-first mouse event（必要时 DOM fallback）、Snapshot/ref、Task Space ownership/hard stop 和 learning loader；本地 299/299 单测、89% 局部 mutation score 通过，但 real-browser E2E 未建立，canonical Skill 与 runtime API 已断裂，公开 CLI/site tools 非 sandbox，安装脚本缺 digest/signature gate 且主动移除 quarantine。
- 关键概念：[harness-engineering](/wiki/concepts/harness-engineering/), [agent-runtime](/wiki/concepts/agent-runtime/), [safe-autonomy](/wiki/concepts/safe-autonomy/), [skills-system](/wiki/concepts/skills-system/), [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/), [agent-harness-implementations](/wiki/maps/agent-harness-implementations/)

### `output/reports/alignment-ai-project-investment-analysis-2026-08-03.md`
> Alignment AI 项目与融资 Deck 尽调（2026-08-03 query + framework follow-up）：Framework V1 暂评分 50/100、合理区间 20–75、S0、证据覆盖率约 40%，五项门槛为 0 通过、3 有条件通过、2 待验证、0 否决，当前建议继续尽调。项目已形成 Shopify / DTC 优先的 AI Shelf、GEO Audit、Citation / Shopping Intelligence、内容与社区动作建议及 GA4 / Shopify 渠道观测产品面，公开 Shopify App、217 个类目及约 25.1 万 citation / 7.48 万 brand-category 记录可部分核验；但 52.2 万商品与 59.2 万 Shopping Cards 口径未对齐，付费客户、MRR、续费、毛利和无创始人交付没有独立证据。核心风险是把 AI referral 相关性讲成 Prompt / Action 的增量收入因果，且 Profound、Scrunch、Goodie、Adobe 已覆盖部分 Action → Revenue 路径。25–30 品牌实现 US$1M ARR 要求平均 US$2,778–3,333 MRR，实质更接近 US$2K–6K Managed Growth 而非 US$99–399 SaaS。下一轮只看合同与现金、cohort、对照实验、可审计 action trace、团队/IP 和集成安全。
- 关键概念：[agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/), [growth-engineering](/wiki/concepts/growth-engineering/), [harness-engineering](/wiki/concepts/harness-engineering/), [self-verification](/wiki/concepts/self-verification/)

### `output/reports/mpai-multiplayer-ai-implementation-analysis-2026-08-04.md`
> MPAI 多人 AI 会话实现拆解（2026-08-04 query）：MPAI 是 Host Mac 上的 local-first session gateway，不是新模型、A2A、共享 shell 或新 IDE。它用 provider-neutral `TaskHub` 统一本地 Codex / Claude Code session，以 Tailscale `whois`、Bearer invite、viewer / participant 和 selected-session ACL 控制 list/read/prompt，再通过 Claude `--resume` 或 Codex App Server `thread/resume → turn/start` 把带人名的输入写回原生会话，并用 NDJSON 流、presence、cancel 与本地 audit 形成多人 room。固定 `v0.4.19` / `7c84e23` 本地 `npm run verify` 通过 61/61 tests；但署名只是文本前缀，Host 承担 provider 账号与已允许副作用，audit 保存 prompt 原文，invite 无自动 expiry，remote lock 有 TOCTOU 窗口，官方 10 队 non-founder cohort 仍为 0，技术成立不等于高频协作平台成立。
- 关键概念：[agent-native-im](/wiki/concepts/agent-native-im/), [agent-runtime](/wiki/concepts/agent-runtime/), [agent-communication](/wiki/concepts/agent-communication/), [unknowns-driven-agent-collaboration](/wiki/concepts/unknowns-driven-agent-collaboration/)
- 交互图：`output/reports/mpai-message-relationship-visualization-2026-08-04.html`，展示 `taskId → requestId → turnId → itemId`、扁平 transcript、持久 / 临时状态与“无跨 Agent route”边界。

### `output/reports/bifrost-ai-gateway-product-analysis-2026-08-04.md`
> Bifrost AI Gateway 项目分析（2026-08-04 query）：Bifrost 是部署在 AI 应用与 OpenAI、Anthropic、Bedrock、Vertex/Gemini、Azure、Ollama/vLLM 等上游之间的 Go 高性能 AI Gateway；它把 OpenAI/native 请求翻成内部 schema，执行 provider/model/key 路由、retry/fallback、cache、Virtual Key、预算/限流、日志/OTel 与 MCP，再转回调用方协议。OSS 为 Apache-2.0，高可用 clustering、adaptive load balancing、Guardrails、OIDC/RBAC、审计导出和私有部署为 Enterprise 增量。它不是模型或拥有 durable task/memory/业务状态的完整 Agent Runtime；“50x LiteLLM”主要是 vendor 在 500 RPS 下的 P99 对比，不代表模型推理快 50 倍。最强反方是协议翻译静默失真，公开 issue 已出现 token 上限、prompt cache、重复请求和 container reuse 字段问题，生产替换前应做 wire-level 直连对照 PoC。
- 关键概念：[model-supply-entitlements](/wiki/concepts/model-supply-entitlements/), [agent-runtime](/wiki/concepts/agent-runtime/), [tool-routing](/wiki/concepts/tool-routing/)
- 约 149 行

### `output/reports/ssi-ttt-fact-check-and-learning-guide-2026-08-14.md`
> SSI × TTT 归属核验与学习指南（2026-08-14 query）：截至查询日，SSI 官方 Updates 与 NVIDIA 联合公告都没有 TTT 模型、论文、代码或 checkpoint，且称 SSI 研究仍属 closely guarded；Ilya 对 continual learning 的公开兴趣不能证明 SSI 使用或发布 TTT。最可能的混淆对象是 NVIDIA / Stanford / Astera 等团队的 TTT-E2E，或机构缩写 SII 参与的 Modular TTT。报告从 fast weights、inner loop 与 outer meta-learning 解释 TTT，区分 2020 test-time adaptation、2024 TTT layers、TTT-E2E、TTT-Discover、In-Place 与 Modular 六条路线，并给出公式、代码入口、90 分钟 / 半天学习路径，以及精确召回、二阶梯度成本、reset / persistence、污染和 guardrail 风险。
- 关键概念：[context-engineering](/wiki/concepts/context-engineering/), [agent-memory](/wiki/concepts/agent-memory/), [memory-to-context](/wiki/connections/memory-to-context/)
- 约 290 行
