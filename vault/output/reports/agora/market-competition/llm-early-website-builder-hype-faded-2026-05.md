<!--
date: 2026-05-13
tags: [ai-app-builder, website-builder, agent-artifacts, genui, product-strategy]
status: supporting
related:
  - "[agent-artifact-community-products-2026-05](/output/reports/agora/market-competition/agent-artifact-community-products-2026-05/)"
  - "[conversation-to-content-consumer-products-2026-05](/output/reports/agora/market-competition/conversation-to-content-consumer-products-2026-05/)"
  - "[recent-clippings-2026-04-27](/output/reports/recent-clippings-2026-04-27/)"
  - "[genui](/wiki/concepts/genui/)"
  - "[harness-engineering](/wiki/concepts/harness-engineering/)"
-->

# LLM 初期建站热为什么退潮

> Query：为什么 LLM 初期的建站热，后面没有了？
> 日期：2026-05-13

---

## 一句话结论

**建站热不是消失了，而是从 "一句话生成网站" 这个 demo 品类，分裂成了 AI app builder、interactive artifact、internal tool builder、research-to-page / conversation-to-content 四条更具体的线。**

早期的 "AI 建站" 很适合展示 LLM 的魔法：输入一句话，马上看到网页。但网页生成本身很快商品化，真正难的部分转移到了数据、工作流、权限、部署、维护、分发、转化和长期更新。所以市场不再围绕 "生成一个网站" 叙事，而是围绕 "生成一个可运行、可迭代、可分发、能接入业务的 artifact / app" 叙事。

---

## 1. 初期建站热解决的是 demo 问题，不是长期业务问题

LLM 刚出现时，"建站" 是最容易被普通人理解的能力展示：

- 输入自然语言就能看到可视化结果。
- HTML/CSS/landing page 是模型最容易生成的结构之一。
- 截图传播效果强，适合 Product Hunt / Twitter / 小红书式传播。
- 对非技术用户来说，"我不会写代码也能做一个网站" 足够震撼。

但这个需求的生命周期很短。多数人不是每天都要建新网站；建完以后真正的问题变成：

- 怎么让网站有真实内容和更新节奏？
- 怎么接表单、CRM、支付、预约、会员、邮件、数据分析？
- 怎么做 SEO、投放、转化、A/B test？
- 怎么维护品牌一致性、性能、合规、可访问性？
- 怎么把页面变成业务系统，而不是漂亮壳子？

也就是说，**网页 scaffold 是最容易的一层，业务闭环才是价值层**。

---

## 2. "网站" 本身被商品化，差异化转向 app / workflow

LLM 生成 landing page 很快变成基础能力：Wix、Webflow、Framer、Softr、Notion、Canva、v0、Lovable、Bolt、Replit 这类产品都能做一部分。单独说 "我能生成网站" 很难再形成壁垒。

现在更有价值的表达变成：

- **v0**：生成 UI / components / templates。
- **Lovable / Bolt / Replit Agent**：生成完整 web app，而不是单页网站。
- **Softr / Notion Custom Agents**：把已有数据、数据库、工作区变成业务应用。
- **Claude Artifacts / Websim / Promptarium**：把对话结果变成可运行、可分享、可 remix 的 interactive artifact。
- **Perplexity Pages / Genspark / NotebookLM / Claude Artifacts**：把 research/chat 结果变成可分享知识页面。

这说明用户要的不是 "网站"，而是某种更具体的产物：

- 展示型页面
- 可交互 demo
- 内部工具
- 小型 SaaS
- 研究报告页面
- 可分享知识 artifact
- 可 remix 的 app/template

**建站这个大词被拆成了很多更明确的 job-to-be-done。**

---

## 3. 生成不是瓶颈，维护和可信运行才是瓶颈

早期 LLM 建站产品的核心叙事是 "prompt -> page"。但一旦用户真的想上线使用，问题会变成工程问题：

- 代码质量是否稳定？
- 移动端是否适配？
- 表单是否真的能收数据？
- 登录、权限、支付是否安全？
- 用户改了三轮之后，结构会不会崩？
- 生成的代码能不能继续维护？
- 部署、域名、环境变量、数据库迁移谁负责？
- 出 bug 后能不能定位、回滚、修复？

这和 vault 中 `recent-clippings-2026-04-27` 的判断一致：模型能力本身不再是产品落地的充分条件，竞争转向模型周围的 harness、sandbox、filesystem、tool routing、eval、spec 和 observability。

所以 "建站热退潮" 的核心原因之一是：**用户从惊叹生成，转向要求稳定交付**。而稳定交付需要的不只是更会写 HTML 的模型，而是完整 harness。

---

## 4. Landing page 没有强复用频率，app builder 才有持续使用

建站工具有一个天然问题：很多用户只在项目开始时高频使用，网站上线后频率下降。除非产品继续承接 CMS、营销、数据分析、电商、CRM、内容运营，否则用户会流失。

相比之下，AI app builder / agent workspace 有更高频的使用理由：

- 每次业务变化都要改 app。
- 每个团队都可能要临时做内部工具。
- 每个研究问题都可能生成一个新的 artifact。
- 每次对话都可能产出一个可分享对象。
- 每个 workflow 都可能被自动化、模板化、能力包化。

因此市场注意力自然从 "build me a website" 转向 "build me a working app / workflow / artifact"。

---

## 5. 视觉新鲜感衰减，分发问题没有被解决

早期 AI 生成网站的传播靠视觉 novelty。但当大家都能生成类似的玻璃拟态、渐变背景、SaaS landing page、portfolio page 后，视觉不再稀缺。

真正稀缺的是分发：

- 谁会访问这个网站？
- 网站如何被搜索、推荐、引用？
- 内容如何持续产生？
- 访客如何变成 lead / 用户 / 购买？
- AI search 和 agent answer 时代，独立网站是否还是默认入口？

这也是为什么 conversation-to-content、research-to-page、artifact community 变重要：它们不是单纯帮你 "有一个页面"，而是把一次对话、一次研究、一个交互结果变成可传播对象。

---

## 6. "建站" 迁移到了 artifact 和社区，而不是消失

从 `agent-artifact-community-products-2026-05` 的产品图谱看，AI 生成 web 产物仍然活跃，只是叙事变了：

- **Websim**：prompt 生成 interactive web project，然后进入社区 feed，被 like/comment/remix。
- **Claude Artifacts**：对话里生成 document、code、diagram、interactive app、HTML，并可 publish / customize / embed。
- **Promptarium**：上传 prompt 和 self-contained HTML，比较不同 AI 工具输出。
- **v0 / Lovable / Bolt / Replit Gallery**：展示 AI-built apps/templates，强调 duplicate、remix、template 化。

这条线比早期 "AI website builder" 更像：

> 生成可运行对象 -> 展示 -> 互动 -> remix -> 再分发

它不是传统建站市场，而是 **interactive artifact 市场**。

---

## 7. 对产品判断的启发

如果今天还用 "AI 建站" 做定位，容易显得过时，因为用户默认模型已经会生成页面。

更好的切法是把价值上移：

1. **从网站到业务对象**：不是生成页面，而是生成带数据、权限、支付、表单、CRM 的业务工作流。
2. **从一次生成到生命周期**：支持修改、版本、监控、回滚、A/B test、SEO、内容更新。
3. **从页面到 artifact registry**：保留 prompt、源码、运行截图、版本血缘、remix lineage、版权/安全扫描。
4. **从 builder 到 distribution**：让生成结果能被发现、复用、嵌入、部署、计费。
5. **从视觉 demo 到 trust layer**：证明它能稳定运行，而不只是第一眼好看。

---

## 压缩判断

LLM 初期的建站热退潮，是因为它完成了历史任务：证明自然语言可以生成可视化软件。但 "生成一个网站" 太浅、太容易商品化、使用频率低，也没有解决真实业务的分发和维护。

热度没有消失，而是升级成了四个方向：

- AI app builder：Lovable / Bolt / Replit / v0
- Interactive artifact：Claude Artifacts / Websim / Promptarium
- Business workflow builder：Softr / Notion / internal tools
- Conversation-to-content / research-to-page：Perplexity Pages / Genspark / NotebookLM

**一句话：早期是 "LLM 会建网页" 的惊喜；后面市场要的是 "LLM 能持续交付一个有用、可信、可分发的软件对象"。**
