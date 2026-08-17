# GUI → Agent Context：把屏幕转成 LLM 能用的上下文

> 技术研究笔记：NightShift Harness 的核心组件设计参考
>
> 日期：2026-04-11

---

## 核心矛盾

把 GUI 转成 Agent context 要平衡 5 个维度：

```
精度     — 能不能定位到像素级坐标
成本     — 每帧的 token / 算力
速度     — 延迟
鲁棒性   — 跨 App、跨语言、跨布局
平台覆盖 — iOS / Android / Web
```

**没有方法能 5 个维度都满分**。不同方法是不同的取舍。

---

## 方法 1: 纯视觉（Raw Screenshot + VLM）

**做法**：直接把截图扔给 GPT-4V / Claude / Gemini。

```python
response = llm.chat([
    {"type": "image", "image": screenshot},
    {"type": "text", "text": "Click the 'Login' button. Output: {'x': int, 'y': int}"}
])
```

| 维度 | 评估 |
|------|------|
| 精度 | ❌ 坐标经常偏 20-50px |
| 成本 | ❌ 每张图 1500+ tokens |
| 速度 | ⚠️ API 调用延迟 |
| 鲁棒性 | ✅ 任何平台都能用 |
| 平台 | ✅ 全平台 |

**适用**：原型阶段、快速验证。**不适合生产**。

---

## 方法 2: 结构化表示（Accessibility Tree）

**做法**：从系统拿 UI 树，转成文本。

**Android**（最简单）：
```bash
adb shell uiautomator dump
```

**Web**（次简单）：
```javascript
document.querySelectorAll('[role], button, a, input').map(e => ({
  role: e.role,
  text: e.innerText,
  bounds: e.getBoundingClientRect()
}))
```

**iOS**（最难）：
- 外部进程几乎拿不到
- 只能通过 XCUITest / WebDriverAgent 间接拿到
- Ferret-UI 论文承认 iOS AX tree 不完整

**输出示例**：
```
[button "Login" @(100,200) size=80x40]
[input "Email" @(100,250) size=300x40]
[button "Forgot Password?" @(200,300) size=120x20]
```

| 维度 | 评估 |
|------|------|
| 精度 | ✅ 像素级 |
| 成本 | ✅ 纯文本 500 tokens 能表示一屏 |
| 速度 | ✅ 本地提取，ms 级 |
| 鲁棒性 | ⚠️ 中国 App 故意不标准化 AX（反爬虫） |
| 平台 | ❌ **iOS 几乎不可用** |

**适用**：Android / Web。iOS 只能作为辅助信号。

---

## 方法 3: Set-of-Marks（SoM）— 当前最平衡的方案 ⭐️

**做法**：在截图上画编号框，LLM 输出"点第几个框"。

```
截图 → 检测 UI 元素 → 画上 [1][2][3]... 编号框
       ↓
LLM: "要点登录按钮，它是 [3]"
       ↓
Harness: element_3.click()
```

**来源**：Yang et al. "Set-of-Mark Prompting" (2023)

**实现路径**：

**A. 用 Accessibility Tree 画 marks**（Android 可行）
```python
elements = get_a11y_tree()
for i, e in enumerate(elements):
    draw_box(screenshot, e.bounds, label=f"[{i}]")
```

**B. 用视觉模型检测**（iOS 必须走这条）
- **OmniParser v2**（Microsoft，开源）— YOLOv8 + BLIP2 caption
- **OS-Atlas**（字节，开源）— 专门的 GUI 元素 grounding 模型
- **SeeClick**（NUS）— 学术标杆

| 维度 | 评估 |
|------|------|
| 精度 | ✅✅ **目前最高**，LLM 只需选择题 |
| 成本 | ✅ 中等 |
| 速度 | ⚠️ 多一步 detection，+200-500ms |
| 鲁棒性 | ✅ 跨平台 |
| 平台 | ✅ 全平台 |

**适用**：**NightShift 主方案**。

---

## 方法 4: 端到端 GUI 专用模型

**做法**：用专门在 GUI 数据上预训练的模型，直接输出坐标或动作。

**主流开源模型**：

| 模型 | 来源 | 参数量 | 特点 |
|------|------|--------|------|
| **UI-TARS-1.5** | 字节 | 7B/72B | 端到端动作输出，开源 |
| **GUI-Owl / Mobile-Agent-v3** | 阿里通义 | 7B | 中文友好，Android SOTA |
| **OS-Atlas** | 字节 | 4B/7B | Grounding 专用 |
| **Ferret-UI 2** | Apple | 8B | iOS 专用，多分辨率 |
| **ShowUI** | Meta | 2B | 小而快 |
| **CogAgent** | 智谱 | 18B | 中文 |
| **SeeClick** | NUS | 9B | 早期工作 |

**输入**：截图 + 任务描述
**输出**：`click(x=234, y=512)` 或 `type("hello")`

**关键特点**：**中文 App 识别准确率 > GPT-4V**（中文预训练数据）。

**实际用法：Hybrid Architecture**
```
GPT-4V / Claude (Brain)     →  planning / reasoning
UI-TARS / OS-Atlas (Hand)   →  grounding / execution
```

---

## 长任务专用优化技巧

NightShift 场景是 50+ step 的长任务，context 优化特别重要。

### A. Delta Screenshot（增量截图）

每步不发完整截图，只发"和上一步的差异"：

```python
diff_region = compute_screen_diff(prev_screenshot, curr_screenshot)
# 只发生变化的区域送 VLM
```

参考：gstack 的 `snapshot -D` 就是这个思路。
**效果**：token 开销降 5-10 倍。

### B. 记忆压缩

历史屏幕不保留像素，只保留 AX 树的文本摘要：

```
Step 1: [home screen] → clicked "Xiaohongshu"
Step 2: [Xiaohongshu home] → searched "旅游"
Step 3: [search results] → clicked first note
Step 4: [current] <image attached>  ← 只有当前这一步带图
```

**效果**：长任务下 context 从 75k tokens → 10k tokens。

### C. Zoom-In Crop

遇到密集 UI（键盘、小图标），裁剪局部放大送 VLM：

```python
if task_type == "click_small_icon":
    cropped = crop_around(screenshot, approx_region, padding=50)
    cropped = resize(cropped, scale=2)
```

**来源**：Ferret-UI 的核心技巧。
**效果**：小元素识别率 +30%。

### D. Multi-Resolution 并行

同时送两个 resolution：
- 缩略图 → 理解整体布局
- 原图 → 识别细节

GPT-4V 原生支持 `detail: "high" / "low"`，手动两次 API 效果更好。

### E. Hierarchical Planning + Grounding

分离"想做什么"和"在哪点击"：

```
GPT-4V (大脑):  "我应该点击搜索框，输入旅游"
UI-TARS (手):   click(x=234, y=89)
GPT-4V:        "现在应该点击第一个结果"
UI-TARS:       click(x=100, y=400)
```

大脑成本高但 reasoning 强，手成本低但动作准。

---

## OmniParser Pipeline 详解

Microsoft 开源的 OmniParser 是目前最完整的 pipeline，**推荐 NightShift Harness 直接参考**。

```
输入截图
  ↓
[1] YOLOv8 (UI element detection)
  ↓  得到所有可交互元素的 bounding boxes
[2] OCR (PaddleOCR / Tesseract)
  ↓  得到所有文本的位置和内容
[3] BLIP2 (icon description)
  ↓  给每个图标生成语义描述 "a red heart icon"
[4] 合并成结构化表示
  ↓
[{
  "id": 1,
  "type": "button",
  "bbox": [100, 200, 180, 240],
  "text": "Login",
  "icon_desc": null
}, ...]
  ↓
[5] 在截图上画编号框（Set-of-Marks）
  ↓
[6] 发给 GPT-4V / Claude 做决策
  ↓
返回 {"action": "click", "element_id": 3}
```

**Repo**: https://github.com/microsoft/OmniParser

**关键优势**：
- 不依赖平台 AX 接口 → **对 iOS 极其友好**
- Mobile / Desktop / Web 都能用
- 完全开源，可自行微调

---

## NightShift Harness v0.1 架构建议

综合所有方法，建议这样分层：

```
┌─────────────────────────────────────────┐
│  Screenshot (from Android/iOS device)   │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Layer 1: Element Detection             │
│  - Android: uiautomator dump (精确)     │
│  - iOS: OmniParser pipeline (视觉)      │
│  → 统一输出 element list                 │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Layer 2: Set-of-Marks Annotation       │
│  - 在截图上画编号框                      │
│  - 生成 text index: "[1] button 登录"   │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Layer 3: Dual Model Inference          │
│  - Brain: Claude/GPT-4V (planning)      │
│  - Hand:  UI-TARS 7B (grounding 备选)   │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Layer 4: Long-Task Optimization        │
│  - Memory compression (历史文本化)       │
│  - Delta screenshots (只发变化)          │
│  - Hierarchical context                 │
└─────────────────────────────────────────┘
```

**关键 trade-off**：

| 版本 | 方案 | 原因 |
|------|------|------|
| v0.1 Android | uiautomator + SoM | 精度最高，成本最低 |
| v1.0 iOS | OmniParser + SoM | 唯一 iOS 可行路径 |

**统一接口**：不管底层是 uiautomator 还是 OmniParser，对上层 LLM 暴露**相同的 "element list + annotated screenshot"** 格式。上层代码不需要关心平台。

---

## 开源资源清单

**可直接使用的库**：
- [OmniParser](https://github.com/microsoft/OmniParser) — Microsoft 的完整 pipeline
- [UI-TARS](https://github.com/bytedance/UI-TARS) — 字节端到端模型
- [OS-Atlas](https://github.com/OS-Copilot/OS-Atlas) — GUI grounding foundation
- [GUI-Owl / Mobile-Agent-v3](https://github.com/X-PLUG/MobileAgent) — 阿里通义
- [Ferret-UI 2](https://github.com/apple/ml-ferret) — Apple 的 iOS 专用
- [AppAgent (Tencent)](https://github.com/TencentQQGYLab/AppAgent)

**学术参考**：
- "Set-of-Mark Prompting" (Yang et al. 2023) — SoM 原始 paper
- "OmniParser for Pure Vision Based GUI Agent" (Microsoft 2024)
- "SeeClick: Harnessing GUI Grounding for Advanced Visual GUI Agents" (2024)
- "CogAgent: A Visual Language Model for GUI Agents" (2023)
- "Ferret-UI 2: Mastering Universal User Interface Understanding" (Apple 2024)

---

## 最重要的洞察：感知不是瓶颈，记忆才是

所有这些方法解决的是 **"把 GUI 给 LLM 看懂"**，但真正的瓶颈可能是：

> **"让 LLM 记得自己在一个 50 步任务的第 37 步"**

这是 memory 问题，不是 perception 问题。

SoM / OmniParser 把**单帧**的感知做到了 95%，但长任务失败率还是 60%，主要原因：

- Agent 忘了自己刚才做过什么
- 进入循环（反复点同一个按钮）
- 迷失任务目标
- 无法从错误中恢复

所以 Harness 除了"GUI → context"之外，还必须有一个 **Task Memory 模块**：

```python
class TaskMemory:
    goal: str                    # 原始任务
    plan: list[str]              # 高层计划
    completed: list[Action]      # 已完成动作
    current_step: int            # 当前步骤
    sub_context: str             # 子任务上下文
    guardrails: list[str]        # "不要再点 X"
    screenshots_history: list[CompressedScreen]  # 压缩历史
```

每次调 LLM 时，把这个 memory 序列化进 prompt。**这比任何感知技巧都重要**。

---

## Action Items

- [ ] 跑通 OmniParser，测一下在中文 App（微信/小红书）上的元素识别率
- [ ] 对比 UI-TARS vs GPT-4V 在 Android real device 上的 grounding 精度
- [ ] 设计 Task Memory 的序列化格式
- [ ] 确定 v0.1 用哪个 VLM 做 Brain（Claude 4.6 / GPT-4o / Gemini 3）
- [ ] 实现 Delta Screenshot 的差分算法
- [ ] 写一个统一的 `ElementList` 数据结构，屏蔽平台差异

---

## End

> 核心结论：NightShift v0.1 走 **Set-of-Marks + Hybrid (VLM Brain + GUI Model Hand)** 路线。
> 上层不关心平台，下层通过 uiautomator（Android）或 OmniParser（iOS）提供统一的 element list。
> 长任务的真正瓶颈是 Memory 而不是 Perception。
