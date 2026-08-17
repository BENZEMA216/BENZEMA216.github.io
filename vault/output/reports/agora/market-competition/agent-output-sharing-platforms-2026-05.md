<!--
date: 2026-05-13
tags: [agent-artifacts, ai-output-sharing, ai-app-builder, vibe-coding, product-landscape, genui]
status: supporting
related:
  - "[agent-artifact-community-products-2026-05](/output/reports/agora/market-competition/agent-artifact-community-products-2026-05/)"
  - "[llm-early-website-builder-hype-faded-2026-05](/output/reports/agora/market-competition/llm-early-website-builder-hype-faded-2026-05/)"
  - "[genui](/wiki/concepts/genui/)"
  - "[skills-system](/wiki/concepts/skills-system/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
-->

# Agent 产物分享平台产品图谱

> Query：有没有类似于用户基于 Agent 拿到产物之后的产物分享平台？
> 日期：2026-05-13

---

## 一句话结论

**有，但还没有出现一个跨 Agent / 跨工具的默认 "YouTube for Agent Artifacts"。**

现在市场是碎片化的：

1. Claude 有官方 Artifacts publish / Inspiration / customize / embed，但主要在 Claude 内生态。
2. Websim、YouWare 更像原生 "prompt -> interactive artifact -> feed/remix" 社区。
3. Promptarium、Artifactory、ArtifactHub 更像跨工具或 Claude artifact gallery。
4. v0、Lovable、Bolt、Replit、Spawned、MakerPad 更像 AI-built app / template showcase。
5. Hugging Face Spaces 是成熟的 runnable demo host，但不是 "agent conversation artifact" native。

真正空白不是 "展示 AI 生成结果"，而是：

> **跨 Claude / ChatGPT / Codex / v0 / Bolt / Lovable / Replit / Websim 的 interactive artifact registry：能导入产物、运行预览、记录 prompt/source/model/tool provenance、版本血缘、remix、授权、safety scan、部署和商业化。**

---

## 1. 最贴近的产品形态

### Claude Artifacts：官方 artifact 发布与发现

Claude 已经支持 artifact 的 public publishing、组织内 sharing、Inspiration 浏览、customize、embed。

适合：

- 从对话中自然产生 document、code、diagram、interactive app、HTML。
- 发布一个 public artifact link。
- 让别人打开后 customize，进入自己的 Claude conversation 修改。
- embed 到外部网站。

限制：

- 主要服务 Claude 用户和 Claude 内部 artifact。
- 更像 artifact space + curated inspiration，不是完整开放社区。
- 对跨工具导入、源码搜索、版本 lineage、排行榜、creator economy 支持有限。

参考：

- https://support.claude.com/en/articles/9547008-discovering-publishing-customizing-and-sharing-artifacts
- https://www.claude.com/blog/build-artifacts

### Websim：最像原生 interactive artifact 社区

Websim 是当前最贴近 "Agent 产物分享平台" 的产品之一。

它的逻辑是：

- 用户用自然语言生成网页、游戏、工具、实验、AI app。
- 生成后可以 post 到 feed。
- 别人可以 like、comment、remix，甚至 gift credits。
- 首页有 Hot / New / For You / Top 等 feed。

适合：

- 互动小游戏
- 可视化实验
- 网页玩具
- AI 工具原型
- multiplayer / social experiments

限制：

- 主要是在 Websim 内生成和分发，不是外部 Claude/ChatGPT/Codex 产物导入。
- 更偏 consumer creative playground，不是严肃 artifact registry。

参考：

- https://websim.com/
- https://websim.com/blog/what-is-websim

### YouWare：Vibe Coding 创作工具 + 社区

YouWare 把自己定义为 "one part vibe coding creation tool and one part creative community"。它支持：

- prompt 生成应用和网站。
- 从社区项目 remix。
- 视觉编辑、代码查看、AI 继续修改。
- 一键 publish，生成 shareable URL。
- 社区成员互相构建、支持、分享。

它比 Websim 更偏 "AI coding community / app publishing"，更像 "Vibe Coding 产物社区"。

限制：

- 仍然是平台内创作 + 平台内发布。
- 对跨 agent provenance、导入外部产物、运行安全、商业授权的完整 registry 能力还不明显。

参考：

- https://www.youware.com/about
- https://docs.youware.com/introduction/quickstartguide

### Promptarium：跨工具 self-contained HTML artifact gallery

Promptarium 的定位非常关键：它不是自己生成，而是让用户上传 prompt 和单文件 `index.html`，并可以比较同一 brief 下不同工具的多个 variants。

适合：

- Claude / GPT / Gemini / Grok / v0 / Bolt / Lovable / Replit Agent / Cursor 生成的 HTML 作品。
- live preview。
- 看 source。
- 投票比较哪个 variant 更好。

这是最接近 "跨工具产物收录" 的雏形。

限制：

- 主要支持轻量 self-contained HTML。
- 不适合多文件项目、后端服务、长期运行 app、agent workflow、复杂依赖。

参考：

- https://promptarium.dev/

---

## 2. 相邻但不是完整答案的产品

### Claude artifact curator / directory

ArtifactHub、Claude Artifacts Hub、ClaudeFinds、Artifactory 这类站点在做 artifact directory / gallery：

- 收集 Claude public artifacts。
- 分类 apps、tools、creative projects、games、data visualization、HTML apps。
- 支持提交自己的 artifact。
- 有的站点覆盖更宽泛的 AI artifacts。

代表：

- https://www.artifacthub.org/
- https://artifactory.cc/
- https://claudeartifacts.club/
- https://www.claudefinds.com/

它们说明需求存在，但大多还停在 curator / directory，而不是 full community + runtime registry。

### v0 Templates：AI UI / app template gallery

v0 支持把 v0 chat publish 成 template，其他用户可以 fork。官方文档明确：template 会出现在 v0 Templates gallery，也会出现在用户 public profile 的 Showcase；平台支持 category、tags、visibility、fork、likes，并做 quality / safety review。

适合：

- UI components
- landing pages
- dashboards
- apps & games
- AI / agents templates

限制：

- 偏 v0 内部 template marketplace。
- 更像前端模板复用，不是任意 agent 产物 registry。

参考：

- https://v0.app/docs/templates
- https://v0.app/templates

### Lovable / Bolt / Replit / Spawned / MakerPad

这些平台更像 AI-built app showcase：

- Lovable Templates：展示 Lovable community 生成的 production-ready apps / websites / SaaS / internal tools。
- Bolt Gallery：展示 Bolt 项目。
- Replit Community / Remix：从社区 app remix，使用 Agent 继续修改，并发布给别人 remix。
- Spawned Showcase：展示 AI-built apps，强调 try live / templates / community projects。
- MakerPad：面向 vibe coders 的 ship/share/get feedback。

它们解决的是 "AI 生成 app 的展示和复用"，但通常不解决跨工具导入、artifact provenance、模型记录、prompt lineage、安全审计和 creator settlement。

参考：

- https://lovable.dev/templates
- https://bolt.new/gallery
- https://docs.replit.com/getting-started/quickstarts/remix-an-app
- https://spawned.com/showcase
- https://www.makerpad.co/apps

### Hugging Face Spaces：成熟 runnable demo host

HF Spaces 是更成熟的可运行 demo 托管平台：

- 支持 Gradio、Docker、static HTML。
- Public Spaces 源码可见、app 可访问、可 clone。
- 支持 protected/private visibility、硬件资源、secrets、embed、custom domain。

它不是 agent 产物社区，但在 "可运行对象 + source + clone + hardware + visibility" 上非常成熟，是 artifact registry 必须研究的基础设施样板。

参考：

- https://huggingface.co/docs/hub/spaces-overview

---

## 3. 为什么还没有默认平台

### 3.1 产物类型太杂

Agent 产物不是一种格式：

- HTML / React / Three.js / Canvas
- 数据可视化
- notebook
- PDF / deck / report
- workflow
- agent skill / MCP server
- prompt package
- video / image / audio
- full-stack app

一个平台要支持这些，就必须先定义 artifact object model。

### 3.2 运行安全比图片社区难很多

图片社区只需要展示图片。Agent artifact 往往要运行代码。

难点包括：

- XSS / phishing / malicious scripts
- API key / secret 泄露
- 后端权限和数据库访问
- 第三方依赖供应链
- persistent storage 的数据归属
- iframe sandbox / CSP / network egress control

近期 vibe coding 安全事件也证明：用户用 AI coding tools 发布 app 时，很容易把敏感数据和内部工具暴露到公网。

### 3.3 Prompt / source / model provenance 复杂

一个 artifact 的价值不只是结果，还包括：

- 原 prompt
- conversation trace
- 使用的模型
- 使用的工具
- source code
- 修改版本
- remix lineage
- 人类编辑比例
- license / attribution

现有平台多数只展示结果或模板，没有把 provenance 做成核心资产。

### 3.4 First-party 平台都有锁定动机

Claude、v0、Lovable、Replit、Websim 都希望 artifact 留在自己的生态里。

这导致市场分裂：

- Claude artifact 在 Claude 内 publish/customize。
- v0 template 在 v0 内 fork。
- Replit app 在 Replit 内 remix。
- Websim project 在 Websim feed 内分发。
- Lovable app 在 Lovable templates/discover 内展示。

跨工具平台反而最中立，但冷启动最难。

### 3.5 低质量产物太多，ranking 很难

AI 生成降低供给门槛，结果是大量 demo、clone、半成品、重复模板。

平台必须解决：

- 怎么判定 artifact 有用？
- 怎么防止低质量 flooding？
- 怎么识别原创和 fork？
- 怎么做安全审核？
- 怎么让好作品被发现？

这比普通 "prompt gallery" 难。

---

## 4. 产品机会判断

如果做这类产品，不应叫 "AI 产物分享平台" 这么泛。更好的 wedge 是：

> **Interactive Agent Artifact Registry**

MVP 可以从最轻的 HTML artifact 开始：

1. 上传或导入一个 self-contained HTML / React artifact。
2. 自动 sandbox 运行，生成截图和 live preview。
3. 保存 prompt、source、模型、工具来源。
4. 支持 fork / remix / compare variants。
5. 支持 tags、collections、creator profile。
6. 做 secret scan、dependency scan、phishing scan。
7. 一键导出到 Claude / ChatGPT / Codex / v0 / Replit / Vercel / HF Spaces。

更长期的形态：

- Artifact object model：定义 `artifact.json`
- Runtime adapters：HTML / React / notebook / Marp / workflow / MCP / skill
- Provenance ledger：prompt、model、tool、source、versions、remix lineage
- Safety layer：sandbox、CSP、secrets、dependency、phishing scan
- Discovery layer：feed、search、collections、leaderboard、curation
- Creator economy：paid templates、hosted artifacts、tips、license、payout
- Agent-readable registry：让 Agent 在执行任务时检索、引用、安装、remix artifact

---

## 5. P0 观察清单

| 产品 | 最贴近点 | 主要限制 |
|---|---|---|
| Claude Artifacts | 对话产物 publish / customize / embed | Claude 内生态，跨工具弱 |
| Websim | prompt-to-interactive-project + feed/remix | 平台内生成，不是外部导入为主 |
| YouWare | vibe coding creation + community + publish/remix | 平台内闭环，registry 能力不完整 |
| Promptarium | 跨工具 HTML artifact upload/preview/source/compare | 单文件 HTML 为主 |
| ArtifactHub / Artifactory | AI artifact / Claude artifact directory | curator/gallery，多数社区和运行能力弱 |
| v0 Templates | v0 chat 发布为可 fork template | v0 内生态，偏前端 template |
| Lovable Templates | Lovable community app/templates | 偏 app showcase，不保留完整 provenance |
| Replit Community | app remix + Agent 继续修改 + publish | Replit 内生态 |
| Hugging Face Spaces | runnable demo + source + clone + hardware | 非 agent artifact native |
| MakerPad / Spawned | AI-built app showcase / ship feedback | 更像 launch/showcase，不是 registry |

---

## 压缩结论

这类产品已经出现，但没有统一成一个大品类。最接近的是 Websim 和 YouWare；最接近跨工具导入的是 Promptarium；最正统的对话 artifact 是 Claude Artifacts；最成熟的可运行 demo infrastructure 是 Hugging Face Spaces；v0/Lovable/Replit 则在各自生态内做 template/app gallery。

所以答案不是 "没有"，而是：

**有很多局部形态，但还没有一个跨 Agent、跨工具、跨 runtime 的产物 registry。**

这个机会如果成立，核心壁垒不在 gallery UI，而在五件事：

1. Artifact object model
2. Secure runnable preview
3. Prompt/source/model provenance
4. Remix/version lineage
5. Distribution + creator economy
