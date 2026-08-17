<!--
date: 2026-07-03
tags: [context-engineering, openai, anthropic, claude, manus, agent-marketplace, positioning]
status: supporting
status_reviewed: 2026-07-17
evidence_level: positioning-research
related:
  - "[context-network-loop-against-general-agent-2026-07](/output/reports/agora/product/context-network-loop-against-general-agent-2026-07/)"
  - "[consumer-user-context-taxonomy-2026-07](/output/reports/consumer-user-context-taxonomy-2026-07/)"
  - "[context-engineering](/wiki/concepts/context-engineering/)"
  - "[memory-to-context](/wiki/connections/memory-to-context/)"
-->

# OpenAI / Claude / Manus 对 Context 的表达

> [!note] 状态说明（2026-07-17）
> 本文是 Context 话术研究，不是 Combo 当前产品事实或已验证护城河。

> Query：OpenAI、Manus、Claude 对 Context 的解释是怎么样的？有哪些表达？

## 结论

三家的共同点是：**Context 不再只是 prompt 里的背景资料，而是 Agent 系统能否持续工作、正确调用工具、避免幻觉、保持个性化和完成长任务的核心运行层。**

但表达重心不同：

| 公司 / 产品 | 核心表达 | 他们把 Context 看成什么 |
|---|---|---|
| OpenAI | state / memory / context personalization / session memory | 让 agent 从 stateless chatbot 变成 persistent collaborator 的结构化状态 |
| Anthropic / Claude | just-in-time context / progressive disclosure / filesystem navigation / Skills | Agent 运行时按需发现、加载、组织的信息环境 |
| Manus | context engineering / file system as context / context-aware state machine / fresh context windows | 长任务执行中的系统资源，需要靠状态机、文件系统和多 agent 隔离管理 |

## OpenAI：Context = 结构化状态 + 被注入的工作记忆

OpenAI 在 Agents SDK / cookbook 里的表达比较产品工程化：

- agents 要能 plan、call tools，并且 **keep enough state** 来完成多步任务；
- context engineering 是管理模型在任意时刻「知道什么」；
- 用 `RunContextWrapper` / structured state / hooks / context injection 来实现个性化；
- session memory 负责短期上下文，trimming / compression 负责保持连贯、降低成本、减少错误传播；
- 好的 context personalization 会让 agent 从 generic 变成 personal。

可借用的表达：

```text
Context is structured state that is stored, recalled, and injected into the model's working memory at the right moment.
```

中文转写：

```text
Context 是被结构化保存、按需召回、并在正确时刻注入模型工作记忆的用户状态。
```

适合 Agora 用的版本：

```text
用户每次任务都会沉淀成结构化状态；平台在下一次 Agent 群执行时，只注入与当前任务相关的 Context，而不是把聊天历史整段塞回模型。
```

## Anthropic / Claude：Context = 运行时按需发现的信息环境

Anthropic 的表达更偏 agent 工程：

- 随着 agent 更自主，工程重点从 prompt 转向 context design；
- 不要预先把所有数据塞进模型，而是用 lightweight identifiers，例如 file paths、stored queries、web links；
- agent 运行时通过工具 just-in-time 加载相关数据；
- 文件名、目录、时间戳等 metadata 本身也是 context；
- progressive disclosure 让 agent 一层层发现相关 context；
- Claude Code 的典型模式是：`CLAUDE.md` 提前进入 context，glob / grep / Bash 等工具按需检索环境；
- Skills 进一步把 procedural knowledge 和 organizational context 打包成可发现、可动态加载的资源。

可借用的表达：

```text
Context is not everything the agent might need; it is what the agent can discover and load just in time.
```

中文转写：

```text
Context 不是把所有信息提前塞给 Agent，而是让 Agent 能在运行时按需发现、加载和使用的信息环境。
```

适合 Agora 用的版本：

```text
Agent 群不需要一次性读取用户全部资料；平台应该提供 Context 索引、资源句柄和权限边界，让 Agent 在任务推进中逐层取用。
```

## Manus：Context = 稀缺运行资源，需要工程化调度

Manus 的表达最系统工程化：

- 长 context window 在真实 agent 场景里仍然不够，甚至可能成为负担；
- 频繁动态增删工具会破坏 KV-cache，并让历史 action/observation 和当前工具定义不一致；
- Manus 用 context-aware state machine 管理工具可用性，而不是频繁改工具定义；
- file system 被当作 context，用文件组织和持久化承载长期任务信息；
- Wide Research 通过多个 sub-agent，各自拥有 fresh / empty context window，避免 context pollution；
- 主 agent 负责 synthesis，子 agent 独立执行，减少幻觉传播和系统性风险。

可借用的表达：

```text
Context is a constrained runtime resource; the system must decide what to keep in memory, what to externalize into files, and what to isolate into sub-agents.
```

中文转写：

```text
Context 是一种稀缺运行资源，系统必须决定哪些留在工作记忆里，哪些外置到文件系统，哪些隔离给子 Agent。
```

适合 Agora 用的版本：

```text
Agent 群不是简单堆更多 Agent，而是把不同任务切到不同 Context 空间里执行，避免一个 Agent 的噪音污染整个任务。
```

## 可直接放进 Agora 叙事的表达

### 1. 对抗通用模型

```text
通用模型越来越强，但它默认只拥有通用世界知识。真正决定 Agent 能否完成用户任务的，是模型运行时能拿到什么 Context：用户目标、任务状态、资源权限、历史失败、成功标准和相似场景证据。
```

### 2. 对抗通用 Agent

```text
通用 Agent 解决的是“我能不能调用工具”。Context Network 解决的是“在这个用户的真实处境里，应该调用哪组 Agent、读取哪些资源、遵守什么边界、怎么证明做对”。
```

### 3. Agent 平台优势

```text
大模型需要用户手动提供 Context；Agent 平台可以在任务执行过程中自然捕捉 Context。每次授权、调用、失败、修正、成功和复购，都会沉淀成下一次可消费的任务状态和验证证据。
```

### 4. 用户粘性

```text
用户留下来的不是聊天记录，而是自己的任务现场：目标、资源、偏好、历史路径、Agent 群组合和验证结果。平台越能消费这些 Context，用户越不需要重新解释，也越难迁移。
```

### 5. 一句话版本

```text
Context 是 Agent 的运行现场；Agent 平台的护城河，是持续把用户任务现场编译成可推理、可执行、可验证、可复用的 Context Network。
```

## 来源

- OpenAI Agents SDK: https://developers.openai.com/api/docs/guides/agents
- OpenAI context personalization cookbook: https://developers.openai.com/cookbook/examples/agents_sdk/context_personalization
- OpenAI session memory cookbook: https://developers.openai.com/cookbook/examples/agents_sdk/session_memory
- Anthropic effective context engineering: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic Agent Skills: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Manus context engineering: https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
- Manus Wide Research: https://manus.im/blog/manus-wide-research-solve-context-problem
