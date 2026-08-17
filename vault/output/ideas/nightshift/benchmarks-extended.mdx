# Mobile GUI Benchmark 扩展清单

> 在 product-thinking.md 第 6 节基础上的补充调研
>
> 日期：2026-04-11
> 焦点：长任务 / 中国 App / 真机 / iOS 相关 benchmark

---

## TL;DR 核心发现

调研了截至 2026 年 4 月的最新 mobile GUI benchmark，找到 **19 个额外的**（在第一轮调研之外）。其中有 5 个特别相关，应该加入 NightShift 的评测矩阵。

**5 个关键洞察**：

1. **iOS 仍然是沙漠** — 过去 6 个月**零**个新 iOS benchmark
2. **真机 benchmark 极少** — 只有 PSPA-Bench（物理手机）+ GUI-CEval（4 种设备）
3. **500+ 步的夜间长任务是空白** — 目前最长 AndroTMem 平均 32 步，最大 65 步
4. **中国实验室主导 2025 年底 / 2026 年** — 小米、蚂蚁、vivo、字节都在发
5. **安全/隐私维度被低估** — SAPA-Bench 显示所有 agent 的隐私合规率 < 60%

---

## Top 6 — 必须加入 NightShift 评测矩阵

### 1. AndroTMem-Bench（2026.03）⭐️⭐️⭐️

- **arXiv**: 2603.18429
- **专为「跨 session 记忆」设计**
- 1,069 个任务，12 个 agent 被评测
- 平均步数 **32.1**，最大 **65 步**
- 引入 "Anchored State Memory" 概念
- **为什么关键**：直接对应夜间任务的状态保持能力。这是 NightShift 的核心能力。

### 2. AndroidLens（2025.12）⭐️⭐️⭐️

- 南大 + 阿里 + 复旦 + 浙大
- 571 个任务，**中英双语**，38 个 domain
- "Long-latency" 嵌套子目标
- **Milestone-based scoring**（适合夜间进度报告）
- **为什么关键**：milestone 评分方式完美契合"早晨汇报"的产品形态

### 3. PSPA-Bench（2026.03）⭐️⭐️⭐️

- **arXiv**: 2603.29318
- **物理智能手机**（不是模拟器）
- 12,855 条指令，22 个 App，10 个日常场景，**100 个 persona**
- 11 个 agent 评测，SOTA 分数很差 → 有巨大 headroom
- **为什么关键**：真机 + 个性化 = 唯一接近 NightShift 真实场景的 benchmark

### 4. GUI-CEval（CVPR 2026）⭐️⭐️⭐️

- **小米 + HyperAI**
- **201 个主流中国 App**
- 4 种不同设备类型
- 5 维层次化评测：perception / planning / **reflection** / execution / evaluation
- **为什么关键**：**reflection 维度是夜间 agent 最容易失败的地方**。长任务必须能自我纠错。

### 5. CAGUI / AgentCPM-GUI（EMNLP 2025 Demo）⭐️⭐️

- **清华 + 人大 + ModelBest**
- 1,500 个子任务/类别
- **30+ 中国 App**：高德、大众点评、B站、小红书等
- 配套 **AgentCPM-GUI 8B** 基线模型
- **arXiv**: 2506.01391
- **HuggingFace**: `openbmb/CAGUI`
- **为什么关键**：第一个开源的中文 App grounding + agent benchmark。AgentCPM-GUI 将是你的竞争基线。

### 6. SAPA-Bench（AAAI 2026）⭐️⭐️⭐️

- **arXiv**: 2508.19493
- **7,138 个隐私场景**
- **所有 agent 得分 < 60%**
- **为什么关键**：夜间 agent 跑 8 小时，最怕泄露微信私信、银行余额、地址。**这是 NightShift 必须的护栏评测**。如果夜间 agent 把用户隐私信息发出去，产品一夜完蛋。

---

## 第二梯队：值得了解

### 安全 / 歧义相关

| Benchmark | 时间 | 机构 | 亮点 |
|-----------|------|------|------|
| **SMAN-Bench** | ICLR 2026 | 小米+NTU+UESTC+人大+清华 | 有**噪声 + 歧义**任务场景（测试微信通知打断夜间任务） |
| **MVISU-Bench** | ACM MM 2025 | — | 包含**"应该拒绝"**的不道德指令子集 |
| **AmbiBench** | 2026 | 复旦+吉大 | 4 个歧义等级 + User Simulator，电商 91 任务 |

### 记忆 / 长任务相关

| Benchmark | 时间 | 机构 | 亮点 |
|-----------|------|------|------|
| **MemGUI-Bench** | 2026.02 | 浙大+南开+港中大+交大+**vivo AI Lab** | 动态环境下的记忆评测 |
| **AgentProg** | 2025.12 | arXiv 2512.10371 | 长任务的 program-guided context 管理 |
| **ProBench** | 2025.11 | arXiv 2511.09157 | **过程级评测**（不只是最终成败），能看到 agent 为什么失败 |
| **AndroidIntent** | 2026.01 | 哈工深 | 20k 记录里的 775 个偏好，主动性意图识别 |

### 垂直场景相关

| Benchmark | 时间 | 机构 | 亮点 |
|-----------|------|------|------|
| **ShoppingBench** | 2025 | arXiv 2508.04266 | 真实购物意图，可泛化到淘宝/京东 |
| **SwipeBench** | 2026.01 | 复旦 | 专门测**滑动手势** — 小红书/抖音 feed 主要靠滑动 |
| **MAS-Bench** | 2025.09 | arXiv 2509.06477 | **Shortcut + GUI 混合** — 如果 NightShift 结合 iOS Shortcuts 或 Android Intents |

### 蚂蚁生态

| Benchmark | 时间 | 机构 | 亮点 |
|-----------|------|------|------|
| **E-ANT** | 2024→2025 | **蚂蚁 + 清华** | 支付宝小程序生态，49k trace，20k+ tinyApps |
| **MUI-zh** | 2025 | **蚂蚁** | 中文 UI 理解数据集，GitHub `antmachineintelligence/mui-zh` |

**关键点**：如果 NightShift 要操作支付宝小程序，E-ANT 是**唯一的数据源**。

---

## 关键观察

### 观察 1：iOS 真的没人做

**过去 6 个月，零个新 iOS benchmark**。所有严肃评测都是 Android 模拟器，因为 iOS accessibility API 封死了自动化。

**战略含义**：
- NightShift 跑真 iPhone = **结构性差异化**
- 建议：发布一个 iOS 版本的 benchmark 作为护城河

### 观察 2：真机 benchmark 极少

只有 **PSPA-Bench**（物理机）+ **GUI-CEval**（4 种设备）用真机。其他全是模拟器。

**战略含义**：如果 NightShift 要做可信的 SOTA 声明，**PSPA-Bench 是必须打的一个**。

### 观察 3：500+ 步夜间任务是空白

当前 benchmark 的步数上限：
- AndroidWorld: 14.3
- MobileWorld: 27.8
- AndroTMem: 32.1 (max 65)
- AndroidLens: "long-latency" 但没具体数字

**NightShift 跑 8 小时 = 500+ 步**。**没有任何公开 benchmark 测量这个区间**。

**战略含义**：NightShift-Bench 填这个空白，2026 年必然被引用。

### 观察 4：中国实验室的垄断

**过去 6 个月发布 mobile GUI benchmark 的机构**：
- **小米**：GUI-CEval + SMAN-Bench + MobileBench-OL（3 个）
- **蚂蚁**：E-ANT + MUI-zh
- **vivo AI Lab**：MemGUI-Bench
- **阿里**（通义）：MobileWorld + Mobile-Agent 系列
- **字节**：UI-TARS / OS-Atlas（偏模型）
- **Doubao Phone Assistant**（2025.12 发布，**无公开 benchmark**，猜测内部）

这是一个 **100% 中文主导的赛道**。Google DeepMind 的 AndroidWorld 已经是 2024 年的事。

### 观察 5：安全维度被严重低估

SAPA-Bench 显示：**所有 agent 的隐私合规率 < 60%**。

对夜间 agent 来说这是致命的。想象一个场景：
- 用户让 agent 整理微信消息
- Agent "顺手"把 DM 内容发到另一个 App 的表单里
- 早上用户发现一个重大事故

**NightShift 必须有 guardrail 评测**。SAPA-Bench + MVISU-Bench 是必须的。

---

## 对 NightShift 评测矩阵的更新建议

原来的第一轮建议是用 **MobileBench-OL + MobileWorld** 两个。

**更新后的建议**（从 NightShift 第一版开始就用）：

| Benchmark | 维度 | 必要性 |
|-----------|------|--------|
| **MobileBench-OL** | 中国 App 广度 | ⭐️⭐️⭐️ 必须 |
| **MobileWorld** | 长任务（27.8 步） | ⭐️⭐️⭐️ 必须 |
| **AndroTMem-Bench** | 跨 session 记忆 | ⭐️⭐️⭐️ 必须 |
| **AndroidLens** | Milestone-based 评分 | ⭐️⭐️ 强烈推荐 |
| **PSPA-Bench** | 真机 + 个性化 | ⭐️⭐️⭐️ 必须 |
| **GUI-CEval** | Reflection 维度 | ⭐️⭐️ 强烈推荐 |
| **SAPA-Bench** | 隐私护栏 | ⭐️⭐️⭐️ **必须**（最被低估） |
| **SMAN-Bench** | 噪声/歧义鲁棒性 | ⭐️ 加分项 |
| **CAGUI** | 中文 grounding 基线 | ⭐️⭐️ 对标 AgentCPM-GUI |

**5 维 NightShift 覆盖**：
- **长任务记忆**: AndroTMem
- **嵌套子目标**: AndroidLens
- **真机 + persona**: PSPA-Bench
- **中文 App**: GUI-CEval + MobileBench-OL
- **安全护栏**: SAPA-Bench

---

## 别的值得订阅的资源

**持续追踪工具**：

1. **OSU-NLP-Group/GUI-Agents-Paper-List**
   - GitHub: https://github.com/OSU-NLP-Group/GUI-Agents-Paper-List
   - 每周更新
   - 重点看 `paper_by_env/paper_mobile.md`

2. **awesome-gui-agent**
   - 多个 fork，质量不一
   - showlab 的 https://github.com/showlab/Awesome-GUI-Agent 还行

3. **PapersWithCode - GUI Agent**
   - 有 leaderboard tracking

4. **arXiv 每日**
   - cs.HC + cs.AI 关键词 "mobile agent" / "GUI agent"
   - 最近 3 个月平均每周 2-3 篇

---

## Action Items

- [ ] 下载 AndroTMem-Bench 的 task 定义，看跨 session 记忆怎么定义
- [ ] 下载 AndroidLens，学习 milestone-based scoring 怎么实现
- [ ] 跑 PSPA-Bench 的 baseline，看当前 SOTA 在真机上实际多差
- [ ] 深入 SAPA-Bench 的 7k 隐私场景，把其中相关的 30 个提炼成 NightShift 的 guardrail test
- [ ] 跟 AgentCPM-GUI 8B 作为 benchmark 的基线模型
- [ ] 订阅 OSU-NLP-Group/GUI-Agents-Paper-List 的 weekly digest

---

## End

> 核心结论：**Mobile GUI benchmark 的爆发期就在过去 6 个月**，未来一年会有更多。NightShift 的评测矩阵应该覆盖 5 个维度（长任务记忆 / 嵌套目标 / 真机 persona / 中文 App / 安全护栏），而不是简单跑 MobileBench-OL 一个。
>
> iOS + 500+ 步 + 中国 App 三维交集**仍然是空白**，NightShift-Bench 值得作为填空之作发布。
