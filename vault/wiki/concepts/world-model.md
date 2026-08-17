# World Model（世界模型）

> AI 系统学习的世界内部表征，用于预测环境变化、模拟未来状态、规划行动序列

## 核心要点

- World Model 的本质是 AI 对世界的**内部模拟器**——给定当前状态和行动，预测下一个状态会是什么
- 2018 年 Ha & Schmidhuber 正式提出 "World Models" 概念（NeurIPS），用 VAE + MDN-RNN 让 Agent 在"梦境"中学习
- 2026 年已形成**五大技术路线**：Autoregressive (Dreamer/MuZero)、Diffusion (Sora/DIAMOND)、JEPA (LeCun/V-JEPA 2)、SSM/Mamba（探索中）、3D Spatial (World Labs)
- **"LLM 是否拥有 World Model" 是当前最核心的学术辩论**——Othello-GPT 证明 LLM 涌现棋盘表征（正方），LeCun 主张自回归路线注定失败（反方），共识趋向"domain-specific approximate world model"
- LeCun JEPA Vision 提出六模块认知架构，核心创新是**在表征空间而非像素空间预测**，避免误差累积
- LeWM (2026.3) 是 JEPA World Model 首个里程碑：1500 万参数，48x 更快，解决了 representation collapse
- V-JEPA 2 用 100 万小时视频训练，实现 **zero-shot robot planning** — 无需机器人数据即可控制机器人
- World Model 相关创业累计融资 **$80 亿+**，代表公司：World Labs ($1.23B)、AMI Labs ($1.03B)、Wayve ($1.05B)
- World Model 与 Agent 的关系：为 Agent 提供"**预测行动后果**"的能力，Dreamer 系列 = Agent 在想象中训练
- **最大产品空白**: "World Model as a Service" — 目前没有通用的 World Model API 服务
- **路线仍有争议**：World Model 可作为想象训练与规划内核，但并非所有模型公司都把它视为通往 AGI 的主线

## 五大技术路线

| 路线 | 代表作 | 核心原理 | 优势 | 劣势 |
|------|--------|----------|------|------|
| **Autoregressive** | Dreamer 系列, MuZero, IRIS, Genie | Next-state prediction in latent/token space | 与 LLM 技术栈兼容，通用性强 | 误差累积，长期预测退化 |
| **Diffusion** | Sora, DIAMOND, GameNGen, UniSim | 去噪过程生成未来帧 | 视觉质量极高，支持多模态 | 推理慢，物理一致性差 |
| **JEPA** | I-JEPA, V-JEPA 2, LeWM | 表征空间预测，丢弃不可预测信息 | 样本效率极高，计算高效 | 无法生成像素，可解释性差 |
| **SSM/Mamba** | 探索中 | 线性复杂度序列建模 | 超长序列，推理高效 | 缺乏标志性成果 |
| **3D Spatial** | World Labs, OccWorld | 3D 空间中直接建模 | 物理一致性最好 | 计算成本高，3D 数据稀缺 |

## 产品格局

### 五大赛道

1. **视频/游戏**: Sora 2, Genie 3 (24fps/720p 实时), Runway GWM-1, GameNGen
2. **自动驾驶**: Wayve GAIA-3, NVIDIA Cosmos, DriveDreamer, 商汤绝影
3. **机器人**: V-JEPA 2-AC (zero-shot planning), RT-2, NVIDIA Isaac
4. **3D 空间**: World Labs Marble (单图→3D 世界), Runway Worlds
5. **工业数字孪生**: NVIDIA Omniverse + Cosmos, Siemens

### 投资热度

- World Labs: **$1.23B** (Fei-Fei Li)
- Wayve: **$1.05B** (自动驾驶)
- AMI Labs: **$1.03B** (通用 world model)

## 与 [Agent](/wiki/concepts/agent-loop/) 的关系

World Model 是 Agent 架构中**规划和预测**的核心组件：

- **Dreamer 系列**: Agent 在 world model 生成的"想象"中训练，无需真实环境交互
- **RAP / LATS**: LLM 同时充当 world model（状态转移预测）和 agent（策略选择）
- **Genie 3 → SIMA 2**: DeepMind 用 world model 训练具身 Agent
- **V-JEPA 2-AC**: 从视频学习物理规律，zero-shot 迁移到机器人 Agent
- **产品空白**: "World Model as Agent Service"——没有人将 world model 包装成 Agent 可调用的预测 API

World Model 还可用于扩展稀缺的真实工作经历：模型基于少量 trajectory 建立内部模拟，在 imagined rollouts 中探索替代行动，再将经验用于 policy update。这条 Dreaming 路线试图缓解现实环境不可复制、反馈稀疏的问题，但模拟误差、reward 可靠性与迁移效果仍需实证。

### 产业界分歧

2026-07 的一篇媒体汇编称，梁文锋将 DeepSeek 路线概括为 `CoT → Agent → 持续学习 → AI 自迭代 → 具身`，并把 3D、视频生成和 World Model 排除在当前主线之外。这只能作为低证据等级的产业观点：原文明确说明语录来自多方收集、部分措辞可能与原话有出入。它说明“World Model 是否是智能主线”存在真实分歧，但不足以推翻 World Model 在规划、机器人和训练环境中的已证实用途。

## 在知识库中的出现

| 来源 | 上下文 |
|------|--------|
| [paper-index](/output/reports/world-model/paper-index/) | 49 篇论文完整索引，按引用量和领域分类 |
| [deep-research](/output/reports/world-model/deep-research/) | 技术路线、LLM 辩论、JEPA Vision、产品格局、Scaling Laws 深度研究 |
| [world-model](/wiki/maps/world-model/) | World Model 全景地图：技术演进、产品三层、投资格局 |
| [world-model-to-agent](/wiki/connections/world-model-to-agent/) | World Model 与 Agent 系统的交叉分析 |
| [functional-taxonomy-of-world-models](/raw/articles/world-model/functional-taxonomy-of-world-models/) | Fei-Fei Li / World Labs：功能三分法 Renderer（输出 observation/像素）/ Simulator（输出 state，几何+物理+动力学，是 linchpin）/ Planner（输出 action，渲染器的逆），同为 POMDP 循环投影，趋向统一世界模型 |
| [real-world-workflow-data-rlaas-2026-07-22](/raw/articles/agent-economy/real-world-workflow-data-rlaas-2026-07-22/) | Dreaming：用内部 world model 扩展稀缺真实经历并提高 sample efficiency |
| [deepseek-liang-wenfeng-investor-meeting-quotes-2026-07-22](/raw/articles/startup/deepseek-liang-wenfeng-investor-meeting-quotes-2026-07-22/) | 媒体二手汇编的 DeepSeek 反方路线观点，保留非官方逐字稿证据边界 |

## 关联概念

- [agent-loop](/wiki/concepts/agent-loop/) — Agent 循环中的规划模块依赖 world model
- [context-engineering](/wiki/concepts/context-engineering/) — World model 的上下文管理需求
- [harness-engineering](/wiki/concepts/harness-engineering/) — World model 作为 Agent 测试环境
- [agent-runtime](/wiki/concepts/agent-runtime/) — World model 推理的运行时基础设施
- [video-agent-workflow](/wiki/concepts/video-agent-workflow/) — 视频 Agent 需要 world model 做质量预测
- [agentic-trajectory-data](/wiki/concepts/agentic-trajectory-data/) — 真实轨迹为 World Model 的模拟和 policy update 提供起点

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
