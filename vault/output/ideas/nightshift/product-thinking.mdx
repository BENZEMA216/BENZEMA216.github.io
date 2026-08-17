# NightShift — 中国 iOS GUI Agent 的产品思考

> 一次完整的产品思考记录：从"OpenClaw 中国版"出发，最终收敛到"做一个开源 benchmark 作为 MVP"
>
> 日期：2026-04-10 / 2026-04-11

---

## 0. 起点：OpenClaw 中国版的可能性

最初的问题：能不能做一个中国版的 OpenClaw（AI agent orchestrator）？

**第一个真正的洞察**（来自用户）：

> "大厂的问题是，大厂没有办法把中国离散的各个登录态都汇聚起来，我们创业有可能能做到吗？"

这句话直接定义了产品的护城河方向：

| | 大厂的限制 |
|--|----------|
| **阿里** | 不能持有微信/抖音的 session（竞品 + 反垄断风险） |
| **腾讯** | 不能持有淘宝/拼多多的 session |
| **字节** | 不能持有阿里系产品的 session |
| **共同问题** | 平台之间互相封杀，信任成本极高 |

→ **创业公司的真正机会：作为中立的"瑞士"，把所有平台的登录态聚合在用户自己的设备上。**

**关键策略：Local-first 架构**

```
用户设备本地
├── 所有平台的 Cookie/Session（加密存储）
├── Headless browser（在本地跑）
└── Agent 逻辑（本地执行，可云端协调）

数据永不出设备 → 平台无法指责"窃取用户数据"
```

---

## 1. 产品定位演化

### 1.1 第一版定位：开源工具

> "我比较想做开源工具，核心是帮用户处理国内常用平台的工具、API、授权、常用的验证码规避"

**类比**：中国版的 Playwright + LangChain tools + Browserbase，开源，agent-first。

**核心价值**：
- 平台适配（微信/淘宝/抖音/小红书...）
- Auth 层（Cookie/QR/SMS）
- 验证码处理层
- MCP 接口暴露给 agent

### 1.2 第二个洞察：不要走接口，要走 GUI

走接口 = 每个平台单独逆向，更新就废，维护成本极高
**模拟操作 = 跟用户手动操作一样，平台升级 UI 不影响核心逻辑**

→ 产品形态从"API 工具集"转向"GUI Agent"。

### 1.3 第三个洞察：iPhone 真机方案

用户提出：

> "我在 mac 上，使用 iPhone 做同步，然后 iPhone 上登了我的账号，那不就可以通过 GUI 操作的方式来用了嘛？"

**为什么这个思路比浏览器方案好**：

| | 浏览器方案 | iPhone 真机方案 |
|--|-----------|----------------|
| 设备指纹 | 假的，要伪装 | 真的，平台信任 |
| 登录态 | 要手动导入/刷新 cookie | App 自己管理 |
| 验证码 | 要对抗滑块/图形 | 几乎不触发 |
| 微信小程序 | 没有 web 版，做不了 | 直接操作 |
| 抖音/快手 | web 版功能阉割 | App 全功能 |
| 风控 | 持续对抗 | 几乎没有 |

---

## 2. 技术验证：iPhone Mirroring 走得通吗？

写了 4 个 Python 脚本验证，全部位于 `/Users/benzema/code/iphone-mirror-demo/`：

1. `1_find_window.py` — 找到 iPhone Mirroring 窗口 ✅
2. `2_screenshot_window.py` — 截取窗口内容 ❌（Apple 屏蔽）
3. `3_click_test.py` — 三种方式发送点击事件 ❌
4. `4_aggressive_click.py` — 5 个位置 + AppleScript + cliclick ❌

**结论：iPhone Mirroring 这条路是死的**

| 方案 | 结果 |
|------|------|
| **CGEvent** | 事件被 iPhone Mirroring 窗口吞掉 |
| **Accessibility API** | AXUIElementCreateApplication 失败 |
| **AppleScript** | 需要辅助功能权限，且即使有权限事件也到不了 iPhone |
| **screencapture** | Apple 故意阻止截取镜像窗口 |

Apple 在 iPhone Mirroring 上做了**完整的事件隔离 + 内容隔离**。这不是 bug，是产品决策。

---

## 3. 关键的产品级 Reframe

### 3.1 用户的核心洞察

> "用户只有一台手机，只有半夜能自动运行的长任务，才对用户有深远的意义"

这个洞察彻底重构了产品定位：

```
❌ 旧定位："AI 帮你日常操作手机" — 跟用户抢手机
✅ 新定位："AI 在你睡觉的 8 小时里帮你做完一周才能做完的事"
```

→ **产品名/隐喻：NightShift — 夜班智能体**

### 3.2 为什么这个定位更对

1. **不抢资源** — 用户睡觉，手机闲置在床头充电
2. **任务密度高** — 8 小时连续运行，能跑深度任务
3. **价值显性** — 早上起床看到结果，仪式感拉满
4. **没有竞品** — Siri/豆包/Manus 都做不到这件事

### 3.3 适合夜间运行的 4 类长任务

**A. Deep Research（基于真实账号）**
- "今晚把我所有微信群里这周的消息整理一下，挑出 5 条我最该回的"
- "今晚研究我想买的某相机，把 B 站测评、小红书评论、京东问答都看一遍"

**B. 跨平台监控 / 抢任务**
- "今晚监控某演唱会的票，有票立刻买"
- "今晚监控这个闲鱼商品，降到 X 价格立刻拍下"

**C. 个人数据画像**
- "今晚拉一下我所有 App 的订阅，告诉我每个月花在哪"
- "今晚分析我这一年在淘宝/京东/拼多多 买了什么"

**D. 内容批处理**
- "今晚把我手机里所有相册的截图分类整理"
- "今晚把我微信收藏的链接全部读一遍，按主题归档"

### 3.4 一个更深的隐喻

> **AI 真正的价值不是「让人快」，而是「让人睡得着」**
>
> 今天 AI 卖的故事都是"提效""更快""更聪明"。但用户的真实痛点是
> "该做的事太多，永远做不完"。能在用户睡觉时把事做完的 AI，
> 价值远高于让用户白天少花 5 分钟的 AI。
>
> Slogan：「你睡觉的 8 小时，我们替你活着」

---

## 4. Capability-First 的产品哲学

### 4.1 用户的关键问题

> "我们可以假定夜间总有一些复杂的任务值得被解决？可以这么定义吗？
>  一个优秀的能力总是有场景的？"

### 4.2 「能力先行」成立的 4 个条件

不是所有"capability-first"产品都成功（Google Glass、Segway、Magic Leap 都失败）。它需要满足：

| 条件 | 说明 | 这个产品 |
|------|------|---------|
| **质的飞跃** | 不是优化，是从无到有 | ✅ AI 第一次能用真实手机 |
| **应用空间广阔** | 平台型能力，不是单点 | ✅ 操作所有 App = 释放所有场景 |
| **单位成本快速下降** | 边际场景从"不值得"变"值得" | ✅ Vision Model 每年成本 -10x |
| **新的原语** | 不是改进，是新的最小操作单元 | ✅ "AI 在睡觉时操作真实手机" |

### 4.3 策略选择

**❌ 策略 A：场景驱动**
1. 选定一个场景
2. 把产品做成只能做这件事的工具
3. 卖给需要这个场景的人

**✅ 策略 B：能力驱动**
1. 构建底层能力："夜间在 iPhone 上自主跑长任务"
2. 提供"任务输入框"和"报告输出"
3. 让用户自己用自然语言定义任务
4. 观察用户实际用它做什么
5. 涌现的高频场景 → 内置成模板

**类比**：ChatGPT 没有任何"场景"，它只有一个对话框。但比所有"场景化 AI 工具"加起来都成功。

---

## 5. iOS 难点深度分析

### 5.1 四层叠加的难度

iOS 的难不是单一技术问题，而是 **四层叠加的、Apple 故意设计的封锁**：

#### 第一层：表面技术障碍
- 没有 ADB 等价物
- 没有"外部 accessibility"
- iPhone Mirroring 是 Apple 的"假门"（事件 + 内容双重隔离）

#### 第二层：系统架构障碍
- 沙盒隔离的彻底性（没有逃生通道）
- 没有 emulator 路径（Simulator 跑不了 App Store 的 App）
- Face ID 是死结（无法程序触发）
- 登录态比 Android 更脆弱

#### 第三层：Apple 的对抗性
- Apple 不断关闭"漏洞"（每个 iOS 版本都在加码）
- iOS 升级会打破 WebDriverAgent
- App Store 政策禁止此类产品上架
- 开发者证书可以被随时吊销

#### 第四层：哲学层面
- iOS 是为人设计的，不是为 Agent 设计的
- 这是一个 category error：iOS 的世界观里没有"Agent"
- Apple 的最终方案：他们自己做（Apple Intelligence）

### 5.2 真正的难点

> **iOS 上做 GUI Agent，技术不是难点，"持续可用性"才是。**
>
> WebDriverAgent 半天就能跑通。但要让它在 100 个用户的设备上稳定跑半年，
> 你需要应付 100 个开发者证书签名、每年至少 4 次 iOS 升级带来的破坏、
> Apple 可能在任何时候 revoke 你的证书。
>
> 真正的护城河不是"我能做出来"，而是"我能持续维护它 5 年"。

### 5.3 反直觉的结论

正因为这么难，所以**没人做** → **iOS 反而是更好的方向**：
- 反向护城河：没竞争
- 用户群更值钱：iPhone 用户 = 高 ARPU
- 红利独占：在 Apple Intelligence 成熟前的 2-3 年窗口期

---

## 6. Benchmark 调研结论

### 6.1 三个关键发现

**发现 1：iOS benchmark 几乎是空白**

整个领域几乎全是 Android。唯一的 iOS 覆盖：
- **GAMBIT/AWARE** (OpenReview 2025) — 唯一真正的 iOS 长任务 benchmark
- **MMBench-GUI** — 多 OS 但偏 grounding

**发现 2：长任务（50+ steps）也是空白**

| Benchmark | 平均步数 |
|-----------|---------|
| AndroidWorld | 14.3 |
| MobileWorld（最新长任务定位） | 27.8 |
| ColorBench | >13 |
| GAMBIT | 13.3 |

**没有任何公开 benchmark 平均步数 ≥ 50**。

**发现 3：中国 App benchmark 都是 Android**

最有价值的两个：

- **MobileBench-OL**（小米 + 北大 + 港中文，2026.01）
  - 1,080 个任务，**80 个中国 App**
  - 真机在线评测
  - 5 个评测维度
  - arXiv: 2601.20335

- **ColorBench**（MadeAgents，2025.10）
  - 175 任务，21 个 App，**包含微信/美团/京东/小红书**
  - graph-structured simulator（不是真机）

### 6.2 当前 SOTA

**AndroidWorld（已饱和）**：
- AGI-0 97.4% / AskUI 94.8% / DroidRun 91.4%
- 纯 VLM 最强：MAI-UI-235B（阿里通义） 76.7%

**MobileWorld（更难、更新）**：
- Seed-2.0-Pro（字节）63.2% GUI-Only
- MAI-UI 41.7% Overall

**41.7% = 真正的长任务在 SOTA 模型上还有 60% 失败率**。

### 6.3 战略含义

> **你要做的"长任务 + iPhone + 中国 App"三个维度的交集，
>  在公开 benchmark 上完全是空白。**

这个空白是两件事：
1. **测量问题** — 没有现成的尺子证明你的产品好
2. **产品护城河** — 没人能用现有 benchmark 证明他比你好

---

## 7. MVP 决策：先做开源 Benchmark

### 7.1 为什么这是绝佳战术

**1. 资源 leverage 最大化**

| 选项 | 投入 | 风险 | 时间到价值 |
|------|------|------|----------|
| 先做 Agent | 高 | 高（iOS 政策） | 6-12 个月 |
| 先做 Benchmark | 低 | 低 | **6-8 周** |

**2. OpenAI 玩过的剧本**

```
HumanEval (2021) → Codex (2021) → Copilot (2021)
```

先定义"代码生成怎么算好"，再说"我们最好"。评测发布时 OpenAI 自己已经是 SOTA，整个行业被迫用 OpenAI 的尺子量自己。

**3. 自带 marketing**

> "NightShift Agent 在 NightShift Bench 上以 X% 成绩超越 GPT-4V / Gemini 3 / Claude Sonnet 4.6"

**自己定规则、自己拿冠军**。

### 7.2 NightShift Bench v0.1 设计

**命名**：
- 正式名：**CN-MobileAgent-Bench**
- 项目名：**NightShift**
- 一语双关：夜班 + 测试长任务能力

**5 个评测维度**：

| 维度 | 说明 | 创新点 |
|------|------|--------|
| L1 — 单 App 操作 | 单个中国 App 内的标准任务 | 标准 |
| L2 — 跨 App 任务 | 2-3 个 App 之间的数据流转 | 标准 |
| L3 — 信息聚合 | 跨 5+ App 的信息整理 | 较少见 |
| **L4 — 长时序任务** | **50+ 步骤** | **没人做过** |
| **L5 — 夜间研究** | **多小时、多次决策** | **没人做过** |

**App 覆盖**：
- **Tier 1 (v0.1)**：微信 / 淘宝 / 小红书 / 抖音 / 美团
- **Tier 2 (v0.2)**：京东 / 拼多多 / 支付宝 / 闲鱼 / 12306 / 高德
- **Tier 3 (v0.3)**：政务 / 银行 / 滴滴 / 大众点评 / 钉钉

**任务集 v0.1**：30 个任务（10 + 8 + 6 + 4 + 2）

**评测指标**：
1. 成功率（Strict / Partial / Failed）
2. 步数（Step Count vs Human Baseline）
3. Token 成本（Input / Output / Total $）
4. 完成时间（Wall-clock Time）

### 7.3 评测环境

```
NightShift Harness (Python)
  ├── 任务定义 (YAML)
  ├── Agent 适配层 (统一接口)
  ├── 评测器 (执行 + 判断)
  └── 报告生成器 (HTML / JSON)

底层执行：
  ├── Android 真机 (v0.1) ← ADB / scrcpy
  ├── Android 模拟器 (v0.2)
  └── iOS 真机 (v1.0)
```

**v0.1 用 Android 真机最现实**，iOS 是 v1.0 的事。

### 7.4 6 周 Timeline

| Week | 任务 |
|------|------|
| 1-2 | 设计 + 任务定义（YAML schema + 30 个任务 spec） |
| 3-4 | Harness 开发（ADB 引擎 + Adapter 层 + 状态判断） |
| 5 | 跑 baseline（GPT-4V / Claude / Gemini / Qwen-VL / GUI-Owl） |
| 6 | 发布（Tech Report + GitHub + Leaderboard 网站 + 推广） |

### 7.5 Credibility 的 5 个要素

1. **可复现性** — `git clone && docker compose up && nightshift run`
2. **严格的成功判定** — 机器可验证的最终状态 + 第二个 LLM 做 judge
3. **强 baseline** — 至少 6 个主流模型
4. **透明的方法论** — 为什么选这些任务、指标、方法
5. **学术严谨度** — arXiv tech report + 引用前作 + 邀请 reviewer

### 7.6 发布后的资产

| 资产 | 价值 |
|------|------|
| 30+ 标准化任务 | 你定义了"中国 GUI Agent 该会做什么" |
| 评测 harness | 任何人做 Agent 都得用你的工具 |
| baseline 报告 | "所有现有模型在 L5 都失败" → 行业共识 |
| GitHub Star | 开发者社区认知 |
| 研究方向 | "如何把 L5 从 0% 推到 50%" |

---

## 8. 下一步行动项

### 立即决策（今天 / 明天）

- [ ] **最终命名**：NightShift？还是别的？
- [ ] **GitHub 组织名**：个人 repo 还是组织 repo？
- [ ] **域名**：是否申请 .ai / .dev 域名？
- [ ] **协作者**：自己做还是找 1-2 个人？
- [ ] **发布目标日期**：6 周还是 8 周？

### 本周

- [ ] 写出 v0.1 的 30 个任务 detailed spec（YAML）
- [ ] 设计 task definition schema
- [ ] 设计 evaluation harness 架构
- [ ] 选定第一批要支持的模型 adapter

### Week 1-2 完成

- [ ] 30 个任务的完整 spec
- [ ] Harness skeleton
- [ ] 至少 1 个 baseline 模型能跑通

---

## 9. 核心洞察归档

按出现顺序：

1. **大厂做不到聚合登录态** — 这是创业的天然机会
2. **Local-first 是合规和信任的基础** — 数据永不出设备
3. **真机优于浏览器** — 设备指纹真实，平台信任
4. **iPhone Mirroring 是死路** — Apple 故意封锁
5. **夜间长任务才有深远意义** — 用户只有一台手机
6. **AI 的价值是"让人睡得着"** — 不是"让人快"
7. **能力先行 > 场景先行** — 在 4 个条件满足时
8. **iOS 难度是动态对抗** — 真正的成本是持续维护
9. **iOS 难是反向护城河** — 因为没人做，所以你独占
10. **Benchmark 优先于产品** — 自己定规则，自己拿冠军

---

## 10. 已存在的工程产物

`/Users/benzema/code/iphone-mirror-demo/`
├── `1_find_window.py` — 找 iPhone Mirroring 窗口（成功）
├── `2_screenshot_window.py` — 截屏（失败，Apple 阻止）
├── `3_click_test.py` — 三种点击方式（失败，事件被吞）
├── `4_aggressive_click.py` — 多位置点击 + AppleScript（失败）
└── `output/ideas/nightshift-product-thinking.md` — 本文

**结论**：iPhone Mirroring 路线已彻底验证为不可行。iOS 方向需要走 WebDriverAgent + USB 路线（v1.0 的事）。v0.1 全力做 Android benchmark。

---

## End

> 写于 2026-04-11
> 状态：MVP 决策已 lock，等待开始执行
