<!--
date: 2026-07-17
tags: [pi, agent-ecosystem, packages, npm, user-behavior, marketplace]
status: complete
related:
  - "[pi-agent-ecosystem-deep-research-2026-06-08](/output/reports/pi-agent-ecosystem-deep-research-2026-06-08/)"
  - "[agent-distribution-atomic-units](/output/reports/agora/market-competition/agent-distribution-atomic-units/)"
  - "[vercel-skills-sh-commercialization-2026-05-15](/output/reports/agora/market-competition/vercel-skills-sh-commercialization-2026-05-15/)"
-->

# Pi Package 生态实况与用户行为代理统计

> 生成时间：2026-07-17
> 查询：针对 `pi.dev/packages` 的 package 生态做分析和统计，概括生态实际情况与用户行为
> 数据快照：2026-07-17 15:43（Asia/Shanghai）

## 摘要

一句话判断：

> **Pi 已经形成一个真实、快速迭代、以 Extension 为绝对主体的 npm 生态；用户行为的主线是给极简 Pi 补回 MCP、Web、subagents、context/memory、权限和代码质量等“缺失电池”。但它目前更像一个开放目录，不是可信 marketplace：下载量不是用户数，类型筛选近半错漏，缺少真实安装、启用、留存、兼容性和任务结果数据。**

最重要的数字：

- 官方目录快照 **5,305 个 package**；其中 **5,166（97.4%）**有显式 `package.json.pi` manifest。
- **5,051（95.2%）**按当前官方 schema 声明了至少一种可加载资源；因此它不是被无关 npm 包污染出来的空壳目录。
- 真实 manifest 类型中，**Extension 4,718（88.9%）**、Skill 1,004（18.9%）、Prompt 220（4.1%）、Theme 144（2.7%）。类型可重叠。
- **3,900 个（73.5%）是纯 Extension**。Pi package 生态本质上是 executable extension ecosystem，不是 prompt/skill 内容市场。
- 最近 7 天有新版本的包 **990（18.7%）**；最近 30 天 **2,351（44.3%）**。这说明维护/发布活跃，但不等于新增 package。
- npm 最近 7 个可用日合计约 **971,323 次 tarball 下载请求**；中位数只有 **24 次/包**，Gini **0.821**，Top 100 吃掉 **41.2%** 流量。
- **3,566 个包（67.2%）周下载低于 50**；只有 **582 个（11.0%）达到 350+/周**。按 npm 历史口径，后者才更可能明显超过镜像、机器人和 CI 噪声。
- 官方目录的 type badge 与真实 manifest **只有 52.4% 完全一致**；**47.6% 存在错漏**，所以不能直接用页面 type filter 统计生态结构。
- **115 个（2.2%）显式 manifest 按当前 schema 没有可加载资源**；其中 106 个集中在两个发布者，反映的是批量发布/旧 schema 问题，不是全生态普遍失效。

![overview.png](/output/reports/pi-package-ecosystem-analysis-2026-07-17/overview.png)

---

## 一、先区分：什么是事实，什么只是用户行为代理

| 层级 | 本报告能看到什么 | 能否解释为用户行为 |
|---|---|---|
| **直接观察** | package 数、manifest、资源类型、作者、repo、license、依赖、版本发布时间、npm 下载请求 | 可以直接陈述生态供给 |
| **行为代理** | 7 日/30 日 npm downloads、排名、作者多包发布、版本更新频率、语义类别 | 只能推断关注方向和相对热度 |
| **公开不可得** | 独立安装用户、启用率、重复使用、留存、共装关系、任务成功率、付费、收入 | **不能由 downloads 替代** |

Pi 官方自己也明确写过：**npm download counts 不是 Pi 真实使用的可靠代理**。Pi 的匿名 telemetry 只在 core 首装/版本更新时增加一个版本计数，不包含 package name，也没有公开 package 级聚合。[Pi Changelog 0.67.1](https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/CHANGELOG.md)

npm 对 downloads 的定义是 tarball HTTP 200：包含 CI、镜像和机器人；本地缓存命中反而不计；发新版还会产生镜像下载 burst。因此 downloads 只能作为 directional popularity，而非用户数。[npm 下载计数说明](https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts-work.html)

另外，Pi 支持 npm、git 和 local path 三种 package source。`pi.dev/packages` 只收录 npm 上带 `pi-package` keyword 的包，因此 git-only、private 和 local package 完全不可见。[Pi Packages 文档](https://pi.dev/docs/latest/packages)

---

## 二、研究方法与数据口径

本次不是抽样首页，而是完整抓取：

1. 按 A-Z 抓取 `pi.dev/packages` 全部 **107 页、5,305 条**目录记录。
2. 连接 npm search metadata，获得 7 日/30 日 downloads、keywords、作者、版本和 repo。
3. 对全部 **5,305 个 package**逐一读取 npm latest `package.json`，**5,305/5,305 成功**。
4. 直接解析真实 `pi.extensions / skills / prompts / themes`，不采用页面 type badge 作为真值。
5. 对头部 package 补抓 npm 30 日 daily range，识别一次性下载 spike。
6. 用 name、description、keywords 做多标签语义分类；该分类只用于观察方向，不能当作人工审核后的 taxonomy。

关键口径：

- 页面上的 `Published` 和 `Recently published` 实际是**最新版本发布时间**，不是 package 首次创建时间。
- 本报告的“最近 30 天活跃”指**最近 30 天发布过新版本**，不代表新建 package。
- npm search 当时报告 5,483 个 keyword 命中，而官方目录展示 5,305 个，相差 178。可能来自同步延迟、过滤或 search index 口径；本报告以官方产品表面 5,305 为主。
- npm search result window 只返回 5,250 个唯一结果；对目录中缺失的 55 个包另行请求 weekly downloads，43 个有数据，12 个无公开数据并按 0 计。因此总 weekly traffic 是保守下限。

---

## 三、供给侧：这不是“5,305 个同质插件”

### 3.1 目录完整性：绝大多数是可识别的 Pi package

| 层级 | 数量 | 占目录 |
|---|---:|---:|
| 官方目录条目 | 5,305 | 100% |
| 有显式 `pi` manifest | 5,166 | 97.4% |
| manifest 有当前 schema 的非空资源数组 | 5,051 | 95.2% |
| 无 manifest、但名称/描述明确指向 Pi 或可能走 convention directories | 118 | 2.2% |
| 只有 `pi-package` tag、无 manifest、无明确 Pi 信号 | 21 | 0.4% |

这修正了两个极端说法：

- 说它只是一个被关键词污染的 npm 搜索页，不准确。至少 **95.2%** 具备可验证的 Pi 资源声明。
- 说 5,305 就等于 5,305 个高质量、可用能力，也不准确。进入目录只需要 `pi-package` keyword，并无 publish review、兼容性验证或运行测试。

### 3.2 真实资源类型：Extension 占绝对主导

| Manifest 资源 | Package 数 | 占全部目录 | 解释 |
|---|---:|---:|---|
| Extension | 4,718 | 88.9% | TypeScript/JavaScript 运行时代码、工具、事件、UI |
| Skill | 1,004 | 18.9% | 指令、流程、脚本和资产 |
| Prompt | 220 | 4.1% | Prompt template |
| Theme | 144 | 2.7% | TUI theme |

类型是多标签，因此总和超过 100%。最常见组合：

| 组合 | 数量 | 占目录 |
|---|---:|---:|
| Extension only | 3,900 | 73.5% |
| Extension + Skill | 581 | 11.0% |
| Skill only | 248 | 4.7% |
| Extension + Prompt + Skill | 101 | 1.9% |
| 四种资源全有 | 42 | 0.8% |
| 显式 manifest 但无当前 schema 可加载资源 | 115 | 2.2% |
| 其他组合 | 179 | 3.4% |

结论：**Pi package 的核心商品不是 prompt，而是能改变 agent runtime 的 Extension。** Skill 更多是与 Extension 组合，作为使用说明、工作流或 progressive disclosure 层存在。

### 3.3 版本活跃度很高，但不能误读为新包增长

| 最新版本距快照 | Package 数 | 占比 |
|---|---:|---:|
| 0–1 天 | 247 | 4.7% |
| 2–7 天 | 743 | 14.0% |
| 8–30 天 | 1,361 | 25.7% |
| 31–90 天 | 2,214 | 41.7% |
| 90 天以上 | 740 | 13.9% |

**44.3% 的包在最近 30 天发布过版本**，说明生态处于高频试验期。采集的约 46 分钟内，官方目录也从 5,303 增到 5,305。

但这不能直接证明“每月新增 2,351 个 package”。要做真实 growth cohort，必须保存每日 catalog snapshot，或逐包读取 npm `time.created`。

### 3.4 创作者结构：长尾分散，同时出现“微包工厂”

- 目录共有 **2,176 个作者**。
- **1,364 个作者（62.7%）只发布了 1 个包**。
- Top 10 作者合计约 485 个包，占目录约 **9.1%**，供给没有被少数作者完全垄断。
- 最大发布者 `artale` 有 **166 个包**；但其中至少 89 个使用 `commands/tools` 等非当前官方资源 key，体现了批量生成、旧 schema 或自定义 schema 风险。
- 有 repo 链接的 4,499 个包映射到 **3,428 个唯一 repo**；189 个 repo 发布多个 package。头部 monorepo 一次发布 20–66 个微包。

这意味着创作者的真实发布行为是两种模式并存：

1. 独立作者发布一个完整 package。
2. 一个 monorepo 拆成很多小 Extension，形成可组合能力套件。

后者有利于组合，但也会膨胀目录数量，使“package 数”高估独立产品数量。

---

## 四、需求侧：下载流量高度长尾，只有少数包出现强信号

### 4.1 7 日 npm 流量分布

| 最近 7 个可用日下载 | Package 数 | 占比 | 解释 |
|---|---:|---:|---|
| 0 | 97 | 1.8% | 含 12 个无公开 weekly 数据的包 |
| 1–9 | 971 | 18.3% | 接近纯噪声/新包区 |
| 10–49 | 2,498 | 47.1% | 有流量，但很难证明有人实际使用 |
| 50–349 | 1,157 | 21.8% | 中等可见度 |
| 350+ | 582 | 11.0% | 约等于 50+/日，更可能出现真实信号 |

整体分布：

- 合计 weekly traffic：**971,323**
- 中位数：**24/包**
- P90：**390**
- P95：**728**
- P99：**2,205**
- Gini：**0.821**
- Top 10 占 weekly traffic：**16.7%**
- Top 50：**32.0%**
- Top 100：**41.2%**

因此，Pi package 生态不是“一个超级赢家吃掉一切”，而是典型幂律：少数头部强、相当大的中腰部存在，但绝大多数单包信号很弱。

### 4.2 当前 weekly 头部：用户在给极简内核补“缺失电池”

下表只列真实 manifest 有当前 schema 可加载资源的 package：

| Package | 7 日下载 | 30 日下载 | Manifest 类型 | 用户在补什么 |
|---|---:|---:|---|---|
| `pi-mcp-adapter` | 37,872 | 129,186 | Extension | MCP 接入 |
| `pi-web-access` | 27,275 | 139,172 | Extension + Skill | Web/search/fetch/research |
| `pi-subagents` | 19,998 | 112,546 | Extension + Prompt + Skill | Subagent、并行和 delegation |
| `context-mode` | 16,174 | 113,882 | Extension + Skill | Context 压缩与检索；跨多个 harness |
| `bigpowers` | 13,384 | 35,832 | Prompt + Skill | 工程方法论和大量 Skills |
| `@remnic/plugin-pi` | 9,048 | 30,324 | Extension | Memory |
| `@tintinweb/pi-subagents` | 8,728 | 39,580 | Extension | Subagent |
| `@gotgenes/pi-permission-system` | 8,124 | 24,561 | Extension | Permission enforcement |
| `pi-lens` | 8,045 | 31,637 | Extension + Skill | LSP、lint、format、type check |
| `@quintinshaw/pi-dynamic-workflows` | 7,781 | 24,815 | Extension | 动态 workflow、大规模 subagents |

这个榜单比抽象分类更能说明用户行为：

> **Pi 用户并不是主要在换皮或收集 prompt，而是在把一个极简 harness 重新组装成 batteries-included agent。**

需求集中在六个缺口：

1. Tool protocol：MCP。
2. External information：Web/search/research。
3. Orchestration：subagents、parallel、workflow。
4. Context/state：memory、compression、session。
5. Trust/control：permission、security。
6. Developer ergonomics：LSP、lint、plan review、code quality。

这与 Pi 的产品哲学完全一致：core 故意不内置 subagents、plan mode 等功能，让用户通过 package 选择复杂度。[Pi README](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md)

### 4.3 语义需求面：Context、Provider、Orchestration 是最大簇

以下为 name/description/keywords 多标签分类，类别会重叠：

| 语义类别 | Package 数 | 占可信核心 | Weekly traffic |
|---|---:|---:|---:|
| Context / Memory | 1,362 | 25.8% | 266,726 |
| Skill / Prompt / Rules | 948 | 17.9% | 174,507 |
| Model / Provider / Usage | 934 | 17.7% | 251,243 |
| Orchestration / Tasks | 922 | 17.4% | 213,752 |
| UI / Experience | 794 | 15.0% | 133,520 |
| Web / Research | 668 | 12.6% | 168,948 |
| Integrations / Runtime | 583 | 11.0% | 153,686 |
| Developer Quality | 526 | 10.0% | 148,669 |
| Security / Permissions | 416 | 7.9% | 104,660 |
| Observability / Cost | 343 | 6.5% | 54,523 |

供给量和流量共同指向：**Context + Model/Provider + Orchestration** 是当前最核心的三条生态主线。

### 4.4 默认 monthly 排名会被下载 spike 扭曲

目录默认按 `Most downloads`，展示 npm 30 日下载。这个排序存在明显 popularity feedback loop，而且很容易被一次性镜像/机器人流量放大。

| Package | 30 日下载 | 7 日下载 | 30 日最高单日 | 单日占 30 日 |
|---|---:|---:|---:|---:|
| `@vigolium/piolium` | 约 250.5K | 157 | 248,969 | **99.4%** |
| `@hypabolic/pi-hypa` | 约 200K | 5,055 | 92,925 | **46.0%** |
| `pi-mcp-adapter` | 129.2K | 37,872 | 7,920 | 6.1% |
| `pi-web-access` | 139.2K | 27,275 | 7,862 | 5.7% |

默认 monthly 榜第一的 `piolium`，**99.4% 流量发生在一天**；它当前 weekly 只有 157。相比之下 `pi-mcp-adapter` 和 `pi-web-access` 的 daily traffic 更连续。

因此：

- Monthly ranking 适合“曝光”，不适合直接判断当前 adoption。
- 更合理的排序应结合 7 日趋势、去除 publish spike、active-install telemetry、兼容性和任务结果。
- `@nitra/cursor` weekly 13.2K，但它是 Cursor rules CLI，且 `pi.skills/extensions` 使用 string 而非当前文档要求的 array；其流量不能直接归因于 Pi 用户。这是跨产品 npm traffic 污染的典型样本。

---

## 五、目录质量与信任：供给丰富，治理明显滞后

### 5.1 官方 type filter 不能当统计真值

对 5,166 个显式 manifest 做逐包核对：

- 页面 badge 与 manifest 完全一致：**2,705（52.4%）**
- 页面漏掉至少一种 manifest 类型：**2,305（44.6%）**
- 页面多标或错标类型：**197（3.8%）**
- 总错漏率：**47.6%**

典型例子：

- `pi-subagents`：页面无 type，manifest 实为 Extension + Prompt + Skill。
- `context-mode`：页面无 type，manifest 实为 Extension + Skill。
- `pi-web-access`：页面只标 Extension，manifest 还有 Skill。
- `glimpseui`：页面按 keyword 标 Prompt，manifest 实为 Skill。

推断：目录 badge 很可能主要来自 npm keywords，而不是 authoritative `pi` manifest。页面筛选适合浏览，不适合生态统计或推荐系统。

### 5.2 至少 115 个显式 manifest 按当前 schema 不会加载资源

官方文档要求 `extensions / skills / prompts / themes` 为 path arrays；只有**没有 `pi` manifest 时**才走 convention directories 自动发现。[Pi Packages 文档](https://pi.dev/docs/latest/packages)

本次发现：

| Manifest 问题 | 数量 |
|---|---:|
| 有非空、合法资源数组 | 5,051 |
| 没有当前 schema 的可加载资源 | 115 |
| 完全没有当前四类 resource key | 93 |
| 四类 resource array 全为空 | 19 |
| resource value 是 string 而不是 array | 3 |

其中 **89 个来自 `artale`，17 个来自 `neuron-mr-white`**，两者合计占问题包的 92.2%。这说明自动 manifest lint 可以用很低成本消除大部分目录失真。

### 5.3 可观测的质量/风险信号

| 信号 | 数量 | 占目录 | 判断 |
|---|---:|---:|---|
| 有 repo 链接 | 4,499 | 84.8% | 尚可，但 806 个无法直接审代码 |
| 有 image/video preview | 737 | 13.9% | 展示质量普遍较弱 |
| 缺 license | 372 | 7.0% | 企业采用风险 |
| 有 `preinstall/install/postinstall` | 117 | 2.2% | 安装阶段额外供应链风险 |
| 有任意 lifecycle script | 840 | 15.8% | 主要为 publish/prepare，也需审查 |
| Deprecated | 2 | <0.1% | npm deprecated 标记很少，不代表仍兼容 |

Pi 官方明确警告：Extension 运行任意代码，Skill 也可以指示模型执行任意动作；第三方 package 运行在完整系统权限下，安装前应审源代码。[Pi Packages 安全说明](https://pi.dev/docs/latest/packages)

当前目录能看到 npm/repo/report，但没有：

- verified publisher
- rating / review
- install success rate
- smoke test / canonical test
- Pi version / Node / OS compatibility matrix
- enable/disable 与 active use
- repeat usage / retention
- task outcome / failure rate
- security scan result
- signed package / provenance

所以它现在是 **directory + installer entry point**，还不是一个 outcome-backed marketplace。

---

## 六、可以合理推断出的用户行为

### 行为 1：用户选择 Pi，是为了自己组装 agent，而不是接受统一工作流

Extension 88.9% 的供给结构和头部下载共同表明：用户对 Pi 的核心诉求是改变 runtime、工具和 UI，而不是只追加 instruction。

### 行为 2：用户正在把极简 Pi 重建成“可选的 batteries-included”

MCP、Web、subagents、memory/context、permission、LSP/code quality 同时进入头部。不是某一个 feature 爆火，而是一整套传统 coding-agent 能力被社区模块化重建。

### 行为 3：Context 管理已经成为最普遍的二次开发主题

Context/Memory 是最大语义簇：1,362 个包、约 266.7K weekly traffic。压缩工具输出、长期记忆、session resume、RAG 和 token 管理反复出现，说明 context budget 是 Pi 用户最稳定的痛点之一。

### 行为 4：高级用户明显偏好 orchestration 和 subagents

Subagent 相关 package 不仅多，而且多个同时进入 weekly Top 10。这不是一个赢家通吃的功能，而是用户在 chains、parallelism、TUI clarification、dynamic workflow 等不同哲学间做选择。

### 行为 5：创作者倾向把一个系统拆成多个可组合微包

多个 repo 一次发布 20–66 个 package，说明创作者在使用 npm package boundary 做模块化和独立升级。但 package count 会因此高估“独立产品”数量。

### 行为 6：发现机制强烈受 npm 流量影响，而流量并不等于 Pi adoption

默认 monthly 排序、跨 harness package 和单日下载 spike 共同造成选择偏差。用户越依赖首页排序，目录越可能强化“机器下载最多”的包，而非“任务结果最好”的包。

---

## 七、公开数据仍然回答不了什么

以下问题当前不能诚实回答：

1. Pi package 有多少独立安装用户？
2. 安装后有多少被 `pi config` 启用？
3. 用户是否重复使用，D7/D30 留存如何？
4. 哪些 package 经常被一起安装？
5. 哪些 package 真正提升任务成功率或降低 token/cost？
6. 哪个 package 在哪个 Pi version / OS / Node version 上最稳定？
7. git/local/private package 的实际规模有多大？
8. 创作者是否获得收入？是否存在付费转化？

原因不是分析不够，而是数据链路不存在：

- Pi core telemetry 只有匿名版本计数，不含 package。
- npm downloads 是 tarball traffic，不含 enable、use 或 outcome。
- git/local 安装绕过 npm。
- 目录没有 account、rating、runtime event 或 transaction layer。

因此，对外表达应使用：

> “weekly npm traffic / catalog popularity proxy”

而不是：

> “周活用户 / 实际安装用户 / 活跃使用者”。

---

## 八、产品与生态含义

### 8.1 Pi 已经有中心化目录，机会不再是“做一个 package 列表”

旧研究中“缺少中心化发现 registry”的表述需要更新。当前 Pi 已经具备：

- npm publish contract：`pi-package` keyword
- 中心化 catalog
- 搜索、类型筛选、下载/时间排序
- package detail、manifest、README、repo、media、report
- `pi install npm:<package>` 一键安装

真正缺的是目录上层的**可信选择与结果数据**。

### 8.2 最有价值的下一层不是更多供给，而是四个治理模块

1. **Manifest Validator**
   - current schema lint
   - resource path existence
   - package load smoke test
   - Pi/Node/OS compatibility

2. **Privacy-preserving package telemetry**
   - install、enable、disable、update
   - anonymous dedupe
   - 不收 prompt/session
   - git/local source 也可计数

3. **Outcome-backed ranking**
   - install success
   - smoke-test pass
   - runtime error rate
   - repeat use
   - task-specific eval
   - 去 publish spike

4. **Stack / co-install recommendation**
   - MCP + Web + Subagent + Memory + Permission 的兼容 bundle
   - 冲突检测和 version pinning
   - 从“找一个包”升级到“组装一套可靠 Pi”

### 8.3 对 Agent capability marketplace 的启发

Pi 验证了三件事：

- 能力可以用 npm package 作为原子分发单元。
- 极简 core 会自然催生丰富的可组合生态。
- 供给规模和下载榜不能自动生成信任；真正的 marketplace moat 在 compatibility、identity、telemetry、evaluation、reputation 和 outcome routing。

这与 [agent-distribution-atomic-units](/output/reports/agora/market-competition/agent-distribution-atomic-units/) 的判断一致：有商业价值的不是裸 prompt，而是 `Skill + Tool + Context + Permission + Eval + Install` 的 capability bundle。

---

## 九、建议持续跟踪的周度指标

如果要把这次研究变成长期生态雷达，建议每周保存同一口径快照：

| 维度 | 指标 |
|---|---|
| Supply | catalog total、首次创建数、最新版本数、作者数、repo 数 |
| Structure | manifest 类型、组合类型、依赖数、包大小、monorepo 密度 |
| Demand proxy | 7d downloads、30d downloads、去 spike 流量、Top 10/50/100 share、Gini |
| Quality | manifest valid rate、repo/license/preview coverage、install scripts、deprecated |
| Governance | report issue 数、修复时间、安全事件、兼容性失败 |
| Real behavior（若未来可得） | unique install、enable rate、repeat use、co-install、task success |

第一次快照只能描述横截面；连续 8–12 周后，才能可靠回答：

- 生态是在持续增长，还是短期 package 爆发？
- 哪些类别供给过剩、哪些需求缺口仍大？
- 头部是在固化，还是新包能持续上位？
- creator 是否从单包转向套件/monorepo？

---

## 数据与复现文件

- [catalog.csv](/output/reports/pi-package-ecosystem-analysis-2026-07-17/catalog.csv) — 5,305 行完整目录、npm metadata、真实 manifest、分类与质量字段
- [metrics.json](/output/reports/pi-package-ecosystem-analysis-2026-07-17/metrics.json) — 汇总统计、分布、头部榜单、type audit
- [daily-download-sample.json](/output/reports/pi-package-ecosystem-analysis-2026-07-17/daily-download-sample.json) — 8 个头部 package 的 30 日 daily 下载样本
- [collect_pi_packages.py](/output/reports/pi-package-ecosystem-analysis-2026-07-17/collect_pi_packages.py) — 完整采集与统计脚本
- [collect_daily_sample.py](/output/reports/pi-package-ecosystem-analysis-2026-07-17/collect_daily_sample.py) — daily range 复现脚本
- [overview.png](/output/reports/pi-package-ecosystem-analysis-2026-07-17/overview.png) — 概览图

## 主要来源

- [Pi Package Catalog](https://pi.dev/packages)
- [Pi Packages 官方文档](https://pi.dev/docs/latest/packages)
- [Pi README](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md)
- [Pi Changelog：telemetry 与 npm downloads 限制](https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/CHANGELOG.md)
- [npm Registry Search API](https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md)
- [npm Download Counts API](https://github.com/npm/registry/blob/main/docs/download-counts.md)
- [npm：downloads 如何计数](https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts-work.html)
- [pi-agent-ecosystem-deep-research-2026-06-08](/output/reports/pi-agent-ecosystem-deep-research-2026-06-08/)
- [vercel-skills-sh-commercialization-2026-05-15](/output/reports/agora/market-competition/vercel-skills-sh-commercialization-2026-05-15/)

---
*由 LLM 从知识库与公开数据查询生成*
