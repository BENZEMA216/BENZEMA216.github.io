---
title: "Thread by @zhuokaiz@zhuokaiz @zhuokaiz"
description: "AMI Labs just raised $1.03B. World Labs raised $1B a few weeks earlier. Both are betting on world models. But almost nobody means the same"
---

<!--
source: "https://x.com/zhuokaiz/status/2032201769053212682?s=20"
author:
  - "[[@zhuokaiz@zhuokaiz @zhuokaiz]]"
published: 2026-03-13
created: 2026-04-08
tags:
  - "clippings"
-->

**Zhuokai ZhaoZhuokai Zhao 赵卓凯** @zhuokaiz@zhuokaiz @zhuokaiz [2026-03-12](https://x.com/zhuokaiz/status/2032201769053212682)

AMI Labs just raised $1.03B. World Labs raised $1B a few weeks earlier. Both are betting on world models.

But almost nobody means the same thing by that term.

Here are, in my view, five categories of world models.

\---

1\. Joint Embedding Predictive Architecture (JEPA)

Representatives: AMI Labs (AMI Labs just raised $1.03B. World Labs raised $1B a few weeks earlier. Both are betting on world models.

But almost nobody means the same thing by that term.

Here are, in my view, five categories of world models.

\---

1\. Joint Embedding Predictive Architecture (JEPA)

Representatives: AMI Labs (AMI Labs 刚刚融资 10.3 亿美元。几周前，World Labs 完成了 10 亿美元的融资。两家公司都押注于世界模型，但几乎没有人对这个术语的理解是相同的。在我看来，世界模型主要分为五类。---1. 联合嵌入预测架构（JEPA）代表企业：AMI Labs（@ylecun@ylecun @ylecu), V-JEPA 2

The central bet here is that pixel reconstruction alone is an inefficient objective for learning the abstractions needed for physical understanding. LeCun has been saying this for years — predicting every pixel of the future is intractable in any stochastic environment. JEPA sidesteps this by predicting in a learned latent space instead.

Concretely, JEPA trains an encoder that maps video patches to representations, then a predictor that forecasts masked regions in that representation space — not in pixel space.

This is a crucial design choice.

A generative model that reconstructs pixels is forced to commit to low-level details (exact texture, lighting, leaf position) that are inherently unpredictable. By operating on abstract embeddings, JEPA can capture "the ball will fall off the table" without having to hallucinate every frame of it falling.

V-JEPA 2 is the clearest large-scale proof point so far. It's a 1.2B-parameter model pre-trained on 1M+ hours of video via self-supervised masked prediction — no labels, no text. The second training stage is where it gets interesting: just 62 hours of robot data from the DROID dataset is enough to produce an action-conditioned world model that supports zero-shot planning. The robot generates candidate action sequences, rolls them forward through the world model, and picks the one whose predicted outcome best matches a goal image. This works on objects and environments never seen during training.

The data efficiency is the real technical headline. 62 hours is almost nothing. It suggests that self-supervised pre-training on diverse video can bootstrap enough physical prior knowledge that very little domain-specific data is needed downstream. That's a strong argument for the JEPA design — if your representations are good enough, you don't need to brute-force every task from scratch.

AMI Labs is LeCun's effort to push this beyond research. They're targeting healthcare and robotics first, which makes sense given JEPA's strength in physical reasoning with limited data. But this is a long-horizon bet — their CEO has openly said commercial products could be years away.

\---

2\. Spatial Intelligence (3D World Models)

Representative: World Labs (), V-JEPA 2

The central bet here is that pixel reconstruction alone is an inefficient objective for learning the abstractions needed for physical understanding. LeCun has been saying this for years — predicting every pixel of the future is intractable in any stochastic environment. JEPA sidesteps this by predicting in a learned latent space instead.

Concretely, JEPA trains an encoder that maps video patches to representations, then a predictor that forecasts masked regions in that representation space — not in pixel space.

This is a crucial design choice.

A generative model that reconstructs pixels is forced to commit to low-level details (exact texture, lighting, leaf position) that are inherently unpredictable. By operating on abstract embeddings, JEPA can capture "the ball will fall off the table" without having to hallucinate every frame of it falling.

V-JEPA 2 is the clearest large-scale proof point so far. It's a 1.2B-parameter model pre-trained on 1M+ hours of video via self-supervised masked prediction — no labels, no text. The second training stage is where it gets interesting: just 62 hours of robot data from the DROID dataset is enough to produce an action-conditioned world model that supports zero-shot planning. The robot generates candidate action sequences, rolls them forward through the world model, and picks the one whose predicted outcome best matches a goal image. This works on objects and environments never seen during training.

The data efficiency is the real technical headline. 62 hours is almost nothing. It suggests that self-supervised pre-training on diverse video can bootstrap enough physical prior knowledge that very little domain-specific data is needed downstream. That's a strong argument for the JEPA design — if your representations are good enough, you don't need to brute-force every task from scratch.

AMI Labs is LeCun's effort to push this beyond research. They're targeting healthcare and robotics first, which makes sense given JEPA's strength in physical reasoning with limited data. But this is a long-horizon bet — their CEO has openly said commercial products could be years away.

\---

2\. Spatial Intelligence (3D World Models)

Representative: World Labs (@drfeifei@drfeifei)

Where JEPA asks "what will happen next," Fei-Fei Li's approach asks "what does the world look like in 3D, and how can I build it?"

The thesis is that true understanding requires explicit spatial structure — geometry, depth, persistence, and the ability to re-observe a scene from novel viewpoints — not just temporal prediction.

This is a different bet from JEPA: rather than learning abstract dynamics, you learn a structured 3D representation of the environment that you can manipulate directly.

Their product Marble generates persistent 3D environments from images, text, video, or 3D layouts. "Persistent" is the key word — unlike a video generation model that produces a linear sequence of frames, Marble's outputs are actual 3D scenes with spatial coherence. You can orbit the camera, edit objects, export meshes. This puts it closer to a 3D creation tool than to a predictive model, which is deliberate.

For context, this builds on a lineage of neural 3D representation work (NeRFs, 3D Gaussian Splatting) but pushes toward generation rather than reconstruction. Instead of capturing a real scene from multi-view photos, Marble synthesizes plausible new scenes from sparse inputs. The challenge is maintaining physical plausibility — consistent geometry, reasonable lighting, sensible occlusion — across a generated world that never existed.

\---

3\. Learned Simulation (Generative Video + Latent-Space RL)

Representatives: Google DeepMind (Genie 3, Dreamer V3/V4), Runway GWM-1

This category groups two lineages that are rapidly converging: generative video models that learn to simulate interactive worlds, and RL agents that learn world models to train policies in imagination.

The video generation lineage. DeepMind's Genie 3 is the purest version — text prompt in, navigable environment out, 24 fps at 720p, with consistency for a few minutes. Rather than relying on an explicit hand-built simulator, it learns interactive dynamics from data. The key architectural property is autoregressive generation conditioned on user actions: each frame is generated based on all previous frames plus the current input (move left, look up, etc.). This means the model must maintain an implicit spatial memory — turn away from a tree and turn back, and it needs to still be there. DeepMind reports consistency up to about a minute, which is impressive but still far from what you'd need for sustained agent training.

Runway's GWM-1 takes a similar foundation — autoregressive frame prediction built on Gen-4.5 — but splits into three products: Worlds, Robotics, and Avatars. The split into Worlds / Avatars / Robotics suggests the practical generality problem is still being decomposed by action space and use case.

The RL lineage. The Dreamer series has the longer intellectual history. The core idea is clean: learn a latent dynamics model from observations, then roll out imagined trajectories in latent space and optimize a policy via backpropagation through the model's predictions. The agent never needs to interact with the real environment during policy learning.

Dreamer V3 was the first AI to get diamonds in Minecraft without human data. Dreamer 4 did the same purely offline — no environment interaction at all. Architecturally, Dreamer 4 moves from Dreamer’s earlier recurrent-style lineage to a more scalable transformer-based world-model recipe, and introduced "shortcut forcing" — a training objective that lets the model jump from noisy to clean predictions in just 4 steps instead of the 64 typical in diffusion models. This is what makes real-time inference on a single H100 possible.

These two sub-lineages used to feel distinct: video generation produces visual environments, while RL world models produce trained policies.

But Dreamer 4 blurred the line — humans can now play inside its world model interactively, and Genie 3 is being used to train DeepMind's SIMA agents.

The convergence point is that both need the same thing: a model that can accurately simulate how actions affect environments over extended horizons.

The open question for this whole category is one LeCun keeps raising: does learning to generate pixels that look physically correct actually mean the model understands physics? Or is it pattern-matching appearance? Dreamer 4's ability to get diamonds in Minecraft from pure imagination is a strong empirical counterpoint, but it's also a game with discrete, learnable mechanics — the real world is messier.

\---

4\. Physical AI Infrastructure (Simulation Platform)

Representative: NVIDIA Cosmos

NVIDIA's play is don't build the world model, build the platform everyone else uses to build theirs.

Cosmos launched at CES January 2025 and covers the full stack — data curation pipeline (process 20M hours of video in 14 days on Blackwell, vs. 3+ years on CPU), a visual tokenizer with 8x better compression than prior SOTA, model training via NeMo, and deployment through NIM microservices.

The pre-trained world foundation models are trained on 9,000 trillion tokens from 20M hours of real-world video spanning driving, industrial, robotics, and human activity data.

They come in two architecture families: diffusion-based (operating on continuous latent tokens) and autoregressive transformer-based (next-token prediction on discretized tokens). Both can be fine-tuned for specific domains.

Three model families sit on top of this.

Predict generates future video states from text, image, or video inputs — essentially video forecasting that can be post-trained for specific robot or driving scenarios.

Transfer handles sim-to-real domain adaptation, which is one of the persistent headaches in physical AI — your model works great in simulation but breaks in the real world due to visual and dynamics gaps.

Reason (added at GTC 2025) brings chain-of-thought reasoning over physical scenes — spatiotemporal awareness, causal understanding of interactions, video Q&A.

\---

5\. Active Inference

Representative: VERSES AI (Karl Friston)

This is the outlier on the list — not from the deep learning tradition at all, but from computational neuroscience.

Karl Friston's Free Energy Principle says intelligent systems continuously generate predictions about their environment and act to minimize surprise (technically: variational free energy, an upper bound on surprise).

Where standard RL is usually framed around reward maximization, active inference frames behavior as minimizing variational / expected free energy, which blends goal-directed preferences with epistemic value. This leads to natural exploration behavior: the agent is drawn to situations where it's uncertain, because resolving uncertainty reduces free energy.

VERSES built AXIOM (Active eXpanding Inference with Object-centric Models) on this foundation.

The architecture is fundamentally different from neural network world models. Instead of learning a monolithic function approximator, AXIOM maintains a structured generative model where each entity in the environment is a discrete object with typed attributes and relations.

Inference is Bayesian — beliefs are probability distributions that get updated via message passing, not gradient descent. This makes it interpretable (you can inspect what the agent believes about each object), compositional (add a new object type without retraining), and extremely data-efficient.

In their robotics work, they've shown a hierarchical multi-agent setup where each joint of a robot arm is its own active inference agent. The joint-level agents handle local motor control while higher-level agents handle task planning, all coordinating through shared beliefs in a hierarchy. The whole system adapts in real time to unfamiliar environments without retraining — you move the target object and the agent re-plans immediately, because it's doing online inference, not executing a fixed policy.

They shipped a commercial product (Genius) in April 2025, and the AXIOM benchmarks against RL baselines are competitive on standard control tasks while using orders of magnitude less data.

\---

imo, these five categories aren't really competing — they're solving different sub-problems.

JEPA compresses physical understanding.

Spatial intelligence reconstructs 3D structure.

Learned simulation trains agents through generated experience.

NVIDIA provides the picks and shovels.

Active inference offers a fundamentally different computational theory of intelligence.

My guess is the lines between them blur fast.)

Where JEPA asks "what will happen next," Fei-Fei Li's approach asks "what does the world look like in 3D, and how can I build it?"

The thesis is that true understanding requires explicit spatial structure — geometry, depth, persistence, and the ability to re-observe a scene from novel viewpoints — not just temporal prediction.

This is a different bet from JEPA: rather than learning abstract dynamics, you learn a structured 3D representation of the environment that you can manipulate directly.

Their product Marble generates persistent 3D environments from images, text, video, or 3D layouts. "Persistent" is the key word — unlike a video generation model that produces a linear sequence of frames, Marble's outputs are actual 3D scenes with spatial coherence. You can orbit the camera, edit objects, export meshes. This puts it closer to a 3D creation tool than to a predictive model, which is deliberate.

For context, this builds on a lineage of neural 3D representation work (NeRFs, 3D Gaussian Splatting) but pushes toward generation rather than reconstruction. Instead of capturing a real scene from multi-view photos, Marble synthesizes plausible new scenes from sparse inputs. The challenge is maintaining physical plausibility — consistent geometry, reasonable lighting, sensible occlusion — across a generated world that never existed.

\---

3\. Learned Simulation (Generative Video + Latent-Space RL)

Representatives: Google DeepMind (Genie 3, Dreamer V3/V4), Runway GWM-1

This category groups two lineages that are rapidly converging: generative video models that learn to simulate interactive worlds, and RL agents that learn world models to train policies in imagination.

The video generation lineage. DeepMind's Genie 3 is the purest version — text prompt in, navigable environment out, 24 fps at 720p, with consistency for a few minutes. Rather than relying on an explicit hand-built simulator, it learns interactive dynamics from data. The key architectural property is autoregressive generation conditioned on user actions: each frame is generated based on all previous frames plus the current input (move left, look up, etc.). This means the model must maintain an implicit spatial memory — turn away from a tree and turn back, and it needs to still be there. DeepMind reports consistency up to about a minute, which is impressive but still far from what you'd need for sustained agent training.

Runway's GWM-1 takes a similar foundation — autoregressive frame prediction built on Gen-4.5 — but splits into three products: Worlds, Robotics, and Avatars. The split into Worlds / Avatars / Robotics suggests the practical generality problem is still being decomposed by action space and use case.

The RL lineage. The Dreamer series has the longer intellectual history. The core idea is clean: learn a latent dynamics model from observations, then roll out imagined trajectories in latent space and optimize a policy via backpropagation through the model's predictions. The agent never needs to interact with the real environment during policy learning.

Dreamer V3 was the first AI to get diamonds in Minecraft without human data. Dreamer 4 did the same purely offline — no environment interaction at all. Architecturally, Dreamer 4 moves from Dreamer’s earlier recurrent-style lineage to a more scalable transformer-based world-model recipe, and introduced "shortcut forcing" — a training objective that lets the model jump from noisy to clean predictions in just 4 steps instead of the 64 typical in diffusion models. This is what makes real-time inference on a single H100 possible.

These two sub-lineages used to feel distinct: video generation produces visual environments, while RL world models produce trained policies.

But Dreamer 4 blurred the line — humans can now play inside its world model interactively, and Genie 3 is being used to train DeepMind's SIMA agents.

The convergence point is that both need the same thing: a model that can accurately simulate how actions affect environments over extended horizons.

The open question for this whole category is one LeCun keeps raising: does learning to generate pixels that look physically correct actually mean the model understands physics? Or is it pattern-matching appearance? Dreamer 4's ability to get diamonds in Minecraft from pure imagination is a strong empirical counterpoint, but it's also a game with discrete, learnable mechanics — the real world is messier.

\---

4\. Physical AI Infrastructure (Simulation Platform)

Representative: NVIDIA Cosmos

NVIDIA's play is don't build the world model, build the platform everyone else uses to build theirs.

Cosmos launched at CES January 2025 and covers the full stack — data curation pipeline (process 20M hours of video in 14 days on Blackwell, vs. 3+ years on CPU), a visual tokenizer with 8x better compression than prior SOTA, model training via NeMo, and deployment through NIM microservices.

The pre-trained world foundation models are trained on 9,000 trillion tokens from 20M hours of real-world video spanning driving, industrial, robotics, and human activity data.

They come in two architecture families: diffusion-based (operating on continuous latent tokens) and autoregressive transformer-based (next-token prediction on discretized tokens). Both can be fine-tuned for specific domains.

Three model families sit on top of this.

Predict generates future video states from text, image, or video inputs — essentially video forecasting that can be post-trained for specific robot or driving scenarios.

Transfer handles sim-to-real domain adaptation, which is one of the persistent headaches in physical AI — your model works great in simulation but breaks in the real world due to visual and dynamics gaps.

Reason (added at GTC 2025) brings chain-of-thought reasoning over physical scenes — spatiotemporal awareness, causal understanding of interactions, video Q&A.

\---

5\. Active Inference

Representative: VERSES AI (Karl Friston)

This is the outlier on the list — not from the deep learning tradition at all, but from computational neuroscience.

Karl Friston's Free Energy Principle says intelligent systems continuously generate predictions about their environment and act to minimize surprise (technically: variational free energy, an upper bound on surprise).

Where standard RL is usually framed around reward maximization, active inference frames behavior as minimizing variational / expected free energy, which blends goal-directed preferences with epistemic value. This leads to natural exploration behavior: the agent is drawn to situations where it's uncertain, because resolving uncertainty reduces free energy.

VERSES built AXIOM (Active eXpanding Inference with Object-centric Models) on this foundation.

The architecture is fundamentally different from neural network world models. Instead of learning a monolithic function approximator, AXIOM maintains a structured generative model where each entity in the environment is a discrete object with typed attributes and relations.

Inference is Bayesian — beliefs are probability distributions that get updated via message passing, not gradient descent. This makes it interpretable (you can inspect what the agent believes about each object), compositional (add a new object type without retraining), and extremely data-efficient.

In their robotics work, they've shown a hierarchical multi-agent setup where each joint of a robot arm is its own active inference agent. The joint-level agents handle local motor control while higher-level agents handle task planning, all coordinating through shared beliefs in a hierarchy. The whole system adapts in real time to unfamiliar environments without retraining — you move the target object and the agent re-plans immediately, because it's doing online inference, not executing a fixed policy.

They shipped a commercial product (Genius) in April 2025, and the AXIOM benchmarks against RL baselines are competitive on standard control tasks while using orders of magnitude less data.

\---

imo, these five categories aren't really competing — they're solving different sub-problems.

JEPA compresses physical understanding.

Spatial intelligence reconstructs 3D structure.

Learned simulation trains agents through generated experience.

NVIDIA provides the picks and shovels.

Active inference offers a fundamentally different computational theory of intelligence.

My guess is the lines between them blur fast.

---

# 中文精读（by Claude，2026-04-08）

> 非逐句翻译，按原文五分类结构重写的中文摘译笔记，关键术语保留英文。

## 缘起

AMI Labs 刚融了 10.3 亿美元，几周前 World Labs 融了 10 亿美元，两家都说自己在做 "world model"。但事实上，几乎没有人在用这个词指同一件事。作者把当下所有自称 world model 的玩家归为五类，并解释每一类各自押注的是什么。

---

## 一、JEPA：联合嵌入预测架构

**代表**：AMI Labs（LeCun 创办）、V-JEPA 2

**核心赌注**：像素级重建是低效的目标。LeCun 多年来一直主张：在任何随机环境里，逐像素预测未来都是不可解的。JEPA 绕开这件事——不在像素空间预测，而是在学到的 latent 表征空间预测。

**做法**：encoder 把 video patch 映射成表征，predictor 在表征空间里去预测被 mask 掉的区域。生成式模型被迫记住贴图、光照、叶子位置这种本质上不可预测的低层细节；JEPA 则可以只捕捉"球会从桌子上掉下去"这件事，而不必去幻觉每一帧下落的样子。

**V-JEPA 2 的实证**：
- 1.2B 参数，1M+ 小时视频自监督预训练，无标签、无文本
- 第二阶段只用 DROID 数据集中 **62 小时**机器人数据，就得到一个 action-conditioned world model，能做 zero-shot 规划
- 机器人生成候选动作序列 → 在 world model 里 rollout → 选预测结果最接近目标图像的那条
- 在训练时未见过的物体和环境上也成立

**作者的判断**：62 小时这个数据量"几乎等于零"——说明在大规模视频上自监督预训练能 bootstrap 出足够的物理先验，下游几乎不需要专项数据。这是 JEPA 设计的最强论据。

**商业化**：AMI Labs 是 LeCun 把 JEPA 推出实验室的尝试，方向是医疗和机器人。但 CEO 自己承认这是长周期赌注，离商业产品还有数年。

---

## 二、空间智能 / 3D World Model

**代表**：World Labs（李飞飞）

**核心赌注**：JEPA 问的是"接下来会发生什么"，李飞飞这条线问的是"世界在 3D 空间里长什么样、怎么把它造出来"。她的论点是：真正的理解需要显式的空间结构——几何、深度、持久性、能从新视角再观察一遍——而不是单纯的时序预测。

这是和 JEPA 完全不同的押注：不是学抽象的动力学，而是学一个可以直接操作的 3D 表征。

**产品 Marble**：
- 输入图像 / 文本 / 视频 / 3D 布局，输出**持久的** 3D 环境
- "持久"是关键词：不像视频生成模型只产出一段线性帧序列，Marble 的输出是真正具有空间一致性的 3D 场景
- 可以转镜头、编辑物体、导出 mesh
- 因此它本质上更接近 3D 创作工具而非预测模型，这是有意为之

**技术血脉**：延续 NeRF / 3D Gaussian Splatting 的思路，但从"重建"转向"生成"。挑战在于：从稀疏输入合成出从未存在过的新场景时，要保证几何一致、光照合理、遮挡正确这些物理可信度。

---

## 三、学习式仿真：生成视频 + 隐空间 RL

**代表**：DeepMind（Genie 3、Dreamer V3/V4）、Runway GWM-1

这一类把两条原本独立的支线合在一起：**生成式视频模型**学着模拟可交互世界，**RL agent** 学 world model 来在想象中训练策略。两者正在快速合流。

### 生成视频这一支

**Genie 3**：text prompt → 可导航环境，720p / 24fps，一致性能维持几分钟。不依赖人工写好的模拟器，而是从数据里学交互动力学。关键架构特性是 action-conditioned autoregressive：每一帧都基于之前所有帧 + 当前输入（左移、抬头等）生成。这强制模型维护一个隐式的空间记忆——你转身离开一棵树，再转回来，它得还在原地。DeepMind 报告大约能维持 1 分钟一致性，已经很惊艳，但离持续训练 agent 还差得远。

**Runway GWM-1**：基于 Gen-4.5 的自回归帧预测，分裂为三个产品：Worlds / Robotics / Avatars。这种切分本身说明"通用性"问题还没解决，还在按动作空间和场景拆分。

### RL 这一支

**Dreamer 系列**思路很干净：从观测中学一个 latent dynamics model，在 latent 空间里 rollout 出"想象中的轨迹"，再通过 model 的预测做反向传播来优化策略。Agent 在策略学习阶段完全不需要和真实环境交互。

- **Dreamer V3**：第一个无需人类数据、在 Minecraft 里挖到钻石的 AI
- **Dreamer 4**：纯离线做到同样的事——零环境交互
  - 架构从早期的 recurrent 转向更可扩展的 transformer-based world model
  - 引入 **shortcut forcing** 训练目标：让模型从噪声跳到干净预测只需 4 步，而不是 diffusion 典型的 64 步
  - 这是它能在单卡 H100 上实时推理的关键

### 合流

两条支线过去感觉是分开的：视频生成给视觉环境，RL world model 给训练好的策略。但 Dreamer 4 让人类可以**进到 world model 里交互式地玩**，Genie 3 也开始被用来训 DeepMind 的 SIMA agent。汇合点是：两边都需要同一样东西——一个能在长时间跨度内准确模拟"动作如何影响环境"的模型。

### 这一类的开放问题

LeCun 一直在追问：学着生成"看起来物理上正确"的像素，是不是等于真的理解物理？还是只是在 pattern matching 表象？Dreamer 4 在 Minecraft 里靠纯想象拿到钻石是一个有力的反证，但 Minecraft 是机制离散、可学习的游戏，真实世界要乱得多。

---

## 四、物理 AI 基础设施：仿真平台

**代表**：NVIDIA Cosmos

NVIDIA 的姿势是：**我不做 world model，我做大家做 world model 时都得用的平台。**

Cosmos 在 2025 年 1 月 CES 发布，覆盖全栈：
- **数据 curation 管线**：在 Blackwell 上 14 天处理完 20M 小时视频；在 CPU 上要 3 年以上
- **视觉 tokenizer**：压缩率比此前 SOTA 高 8 倍
- 训练通过 NeMo
- 部署通过 NIM 微服务

预训练 world foundation model 在 9000 万亿 token / 20M 小时真实视频上训练，覆盖驾驶、工业、机器人、人类活动数据。

**两类架构**：
- diffusion-based（在连续 latent token 上工作）
- autoregressive transformer-based（在离散化 token 上做 next-token prediction）

两者都可以为特定领域微调。
hai
**三个模型族**：
- **Predict**：从文本/图像/视频输入预测未来视频状态——本质是视频预测，可针对具体机器人或驾驶场景做 post-train
- **Transfer**：处理 sim-to-real 域适应。这是物理 AI 的老大难：模型在仿真里跑得很好，到真实世界因为视觉和动力学差异就崩
- **Reason**（GTC 2025 新增）：把链式思考引入物理场景——时空感知、交互的因果理解、视频问答

---

## 五、主动推理（Active Inference）

**代表**：VERSES AI（Karl Friston）

这是名单里的异类——根本不来自深度学习传统，而来自计算神经科学。

Karl Friston 的**自由能原理**主张：智能系统持续地对环境做出预测，并通过行动来最小化"惊讶"（技术上是变分自由能，惊讶的上界）。

标准 RL 通常以最大化奖励为目标；主动推理则把行为表述为最小化变分/期望自由能，把目标偏好和认知价值（对不确定性的求知欲）混在一起。这天然导致探索行为：agent 会被自己不确定的情境吸引，因为消解不确定性能减少自由能。

**AXIOM**（Active eXpanding Inference with Object-centric Models）：
- 架构与神经网络 world model 完全不同
- 不学单一的函数近似器，而是维护一个**结构化生成模型**，环境中每个实体都是一个有 typed attribute 和关系的离散对象
- 推理是 Bayesian 的：信念是概率分布，通过消息传递更新，**不走梯度下降**
- 因此可解释（能看到 agent 对每个对象的信念）、可组合（加新对象类型不用重训）、极端 data-efficient

**机器人应用**：层级化多 agent 设置，机械臂的每个关节都是一个独立的主动推理 agent。关节级 agent 处理局部运动控制，更高层 agent 处理任务规划，全部通过共享信念在层级中协调。整个系统能实时适应陌生环境，**不需要重训**——你移动目标物体，agent 立刻 re-plan，因为它在做在线推理而不是执行固定策略。

**商业进度**：商用产品 Genius 已在 2025 年 4 月发布。AXIOM 在标准控制任务上对比 RL baseline 具有竞争力，且数据量少几个数量级。

---

## 作者的总结

这五类其实并不是在直接竞争，而是在解不同的子问题：

- **JEPA**：压缩物理理解
- **空间智能**：重建 3D 结构
- **学习式仿真**：通过生成的经验来训练 agent
- **NVIDIA**：提供卖铲子的基础设施
- **主动推理**：提供一套从根本上不同的智能计算理论

作者的猜测是：这几类之间的边界会很快模糊。

---

## 我的简要观察（笔记，不在原文）

- 这篇是当前 World Model 赛道结构化梳理里写得比较扎实的一篇，五分类的切法比常见的"按公司列名单"更有解释力
- 与 **车 World Model 全栈**方向最相关的是第 3 类（学习式仿真）和第 4 类（NVIDIA 基础设施），如果他们要做"基模 + Harness + Engine"，技术路线大概率落在第 3 类，但要决定的是和 NVIDIA Cosmos 这种平台是合作还是绕过
- LeCun 那条质疑（生成像素 ≠ 理解物理）值得在做技术选型讨论时摆出来——这是 JEPA 派和生成派的根本分歧，影响 World Model 的评估指标怎么定
- 主动推理这一支虽然在主流之外，但 data-efficient + 可解释这两点对机器人 / 具身智能场景很有诱惑力，值得单独看看 AXIOM 论文
