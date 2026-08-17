<!--
date: 2026-05-25
tags: [frontend, vibe-coding, ai-coding, agentic-coding, genui, harness-engineering, ui-qa]
status: active
trigger: 用户要求深度搜索前端 vibe coding 的实践技巧
related:
  - "[genui](/wiki/concepts/genui/)"
  - "[harness-engineering](/wiki/concepts/harness-engineering/)"
  - "[context-engineering](/wiki/concepts/context-engineering/)"
  - "[spec-driven-development](/wiki/concepts/spec-driven-development/)"
  - "[self-verification](/wiki/concepts/self-verification/)"
  - "[llm-early-website-builder-hype-faded-2026-05](/output/reports/agora/market-competition/llm-early-website-builder-hype-faded-2026-05/)"
  - "[agent-artifact-community-products-2026-05](/output/reports/agora/market-competition/agent-artifact-community-products-2026-05/)"
-->

# 前端 Vibe Coding 实践技巧深搜

> Query：帮忙深度搜索一下前端 vibe coding 的实践技巧  
> 日期：2026-05-25  
> 范围：v0 / Lovable / Bolt / Replit Agent / Figma Make / Claude Code / Codex / Cursor 等官方文档、产品实践与前端 UI 生成研究。

---

## 一句话结论

**前端 vibe coding 的核心不是“把一句话变成页面”，而是把人类的产品判断、设计 taste、验收标准和安全边界编译成 AI 能稳定执行的工作流。**

真正有效的前端 vibe coding 有 5 个固定动作：

1. **先定义使用场景，而不是先描述页面**：谁用、什么时候用、要完成什么关键动作。
2. **给视觉锚点**：截图、Figma frame、设计系统、竞品 reference、真实文案和真实数据。
3. **按组件/流程小步迭代**：一次只改一个屏幕、一个组件或一个状态，明确哪些文件/区域不能动。
4. **让 agent 自验证**：本地运行、浏览器截图、移动端检查、console、Playwright/Storybook visual test。
5. **生产化前加护栏**：auth、权限、XSS、secrets、依赖、CI/CD、部署配置必须人工或独立 reviewer 复核。

换句话说，前端 vibe coding 的最佳形态是：

> Human = product director + design reviewer + risk owner  
> Agent = fast UI engineer + implementation worker + regression fixer

---

## 1. “Vibe coding” 在前端里的真实含义

Karpathy 最初说的 vibe coding 带有“放手让模型写代码，自己只看效果、说效果、跑效果”的意味。到 2026 年，前端领域已经把这个词产品化：v0、Lovable、Bolt、Replit、Figma Make 都在把自然语言、视觉输入、实时 preview、代码编辑和部署连接成一个连续界面。

但从实践看，前端 vibe coding 有两个层次：

### 1.1 低阶：Prompt-to-page

输入：

> 做一个 SaaS landing page，现代感，科技感，有 pricing。

输出通常可以看，但问题也明显：

- 内容空泛，像模板；
- 信息架构不贴具体业务；
- 交互是假按钮；
- mobile 看起来只是“能缩小”，不是 mobile-first；
- 生成代码会堆在大文件里；
- 改几轮以后结构漂移。

这适合 demo，不适合持续产品。

### 1.2 高阶：Prompt-to-product-surface

输入应该像一个小型产品 brief：

- 用户是谁；
- 使用时刻是什么；
- 当前页面属于哪个 workflow；
- 主行动是什么；
- 数据来自哪里；
- 有哪些状态：loading / empty / error / permission denied / logged out；
- 视觉风格和约束是什么；
- 不能改哪些已有行为；
- 怎样验证完成。

这时 AI 才不是“生成网页”，而是在补一个具体 product surface。

Vercel 的 v0 prompting 指南里做过对比：具体 prompt 生成的 profile page 反而更快、代码更少、信息架构更准确；模糊 prompt 迫使 v0 猜测，容易产生额外 feature 和缺失字段。这个结论和 Bolt、Lovable、Replit 的官方实践完全一致：**清晰上下文比长 prompt 更重要，明确约束比“更好看”更重要。**

---

## 2. 工具分工：不要用一个工具做所有事

### 2.1 v0：最适合 React / shadcn / Next.js UI surface

适合：

- landing page、dashboard、settings、onboarding、pricing、forms；
- 从截图/Figma/mockup 还原 UI；
- 生成 shadcn/ui + Tailwind 风格的前端代码；
- 通过 Design Mode 做可视化微调；
- 接 Vercel / Supabase / Neon / Upstash 这类 Web app infrastructure。

实践要点：

- prompt 里写清 **context of use** 和 **constraints & taste**；
- 上传高分辨率截图或完整界面，缺行为说明时补文字；
- 用 mobile preview 检查每次改动；
- 用 Design Mode 选中具体元素，让 agent 带截图改代码；
- 不要只说“make it better”，要说“hero headline 缩短，subheading 更 playful，CTA 与导航对齐”。

### 2.2 Lovable / Bolt / Replit Agent：适合 0->1 full-stack prototype

适合：

- 非工程用户或 PM 快速做可跑 app；
- 从产品想法走到 auth、database、deployment；
- 需要平台内置环境、预览、部署、数据库时。

实践要点：

- 先让它提问或 plan，不要直接开写；
- 一次只加一个 feature；
- 用真实数据结构和状态描述 UI；
- 经常 checkpoint / version；
- 如果 bug 修两轮还没好，停止对话，让 agent 总结现状，开新 session 从事实重新修。

Bolt 官方文档的快速建议很直接：从架构开始，定期清上下文，逐个添加组件和功能，用小而具体的 prompt，明确什么该变、什么不该变，不要期待 LLM 有“常识”。这基本就是所有 prompt-to-app 工具的共性。

### 2.3 Figma Make / Figma MCP：适合 design-to-code 和设计系统约束

适合：

- 已有 Figma frame，要变成交互原型或代码；
- 设计师想把 static mockup 变成可点击、可动、可试用的 prototype；
- 工程 agent 需要读取 Figma variables、components、layout data、Code Connect。

实践要点：

- Figma 文件先清理：Auto Layout、constraints、layer naming、component hygiene；
- 复杂项目拆成多个 code file / component；
- 复用已有 components，让 AI 不必猜 spacing、tokens、variants；
- 通过 Figma MCP 把 design context 接入 Cursor / Claude Code / VS Code，而不是人工复制像素值。

Figma 官方强调：干净的 frame、Auto Layout、constraints 和 layer naming 会显著影响 Make 的输出；MCP server 的价值则是把 variables、components、layout data 和 Code Connect 带给 coding agent。

### 2.4 Claude Code / Codex / Cursor：适合 existing codebase 内的真实工程改动

适合：

- 在已有项目里改组件、重构、接 API、修 bug；
- 需要跑测试、看 diff、改多文件；
- 需要遵守 repo 规范、CI、lint、storybook、design system。

实践要点：

- 先 Ask / Plan，再 Code；
- repo 里维护 `AGENTS.md` / `CLAUDE.md` / `.cursor/rules`；
- 给 agent 可运行验证命令；
- 让它读现有 design system、component examples、storybook stories；
- UI 改动必须让它启动 dev server、截图、对比。

Anthropic 的 Claude Code 文档把“verification”列为最高杠杆动作：给 tests、screenshots、expected outputs，让 Claude 能检查自己的结果。OpenAI Codex 文档也强调 Codex 能在 sandbox 里读写运行代码、并行做任务，但涉及 UI 时仍需要截图/图片或人类视觉反馈补足浏览器观察能力。

---

## 3. 前端 vibe coding 的标准工作流

### Step 0：准备 Agent Brief，而不是裸 prompt

建议为每个小需求先写 10 行以内 brief：

```markdown
目标：给账单 SaaS 增加 mobile-first invoice list 页面。
用户：财务运营，每天早上用手机快速看逾期发票。
主行动：筛选 overdue，并点进 invoice detail。
数据：invoice number, customer, amount, due date, status。
状态：loading / empty / error / no permission。
视觉：B2B 工具，紧凑、浅色、高对比，最多 1 个强调色。
约束：不要改 auth，不要改 API schema，不要新增 UI library。
验证：mobile 390px、tablet 768px、desktop 1440px；npm test；Playwright smoke。
```

这个 brief 的价值是降低 AI 的猜测空间。v0、Lovable、Bolt、Replit 都在文档中反复强调：用户、使用时刻、约束、状态、上下文越清楚，后续返工越少。

### Step 1：先问问题或生成 plan

推荐 prompt：

```text
Before editing code, ask up to 5 clarifying questions about UX, data states, edge cases, and constraints.
If there are no blockers, write a concise implementation plan and list what files you expect to touch.
Do not modify files yet.
```

适用场景：

- 新 feature；
- 涉及多个状态；
- 会动 layout 或设计系统；
- 需求里有“好看一点”“现代一点”“更专业”等主观词。

Lovable 官方建议在 feature prompt 末尾要求 AI 先提问；Replit 也建议有不确定性、多步骤或需要审批时开启 Plan mode。

### Step 2：让 AI 先建骨架，再填细节

错误方式：

```text
Build the whole admin dashboard with login, billing, team, analytics, settings, reports, CSV export, Stripe, dark mode, mobile support.
```

正确拆法：

```text
First implement only the dashboard shell:
- sidebar
- top bar
- responsive content area
- empty route placeholder
No charts, no billing, no settings yet.
Use existing components under src/components/ui.
```

然后一轮一轮加：

- stats cards；
- table；
- filters；
- detail drawer；
- loading/empty/error；
- mobile layout；
- keyboard/a11y；
- backend integration；
- tests。

Figma Make、Bolt、Lovable 都明确推荐 bite-sized / component-by-component 的方式；原因很简单：上下文越大，agent 越容易“顺手重写”不该动的部分。

### Step 3：给视觉 reference，而不是形容词堆叠

前端 prompt 里最弱的词：

- modern
- clean
- beautiful
- premium
- Apple-like
- sleek
- professional

更好的输入：

- 截图；
- Figma frame；
- 设计系统 token；
- 竞品页面 URL 或截图；
- 明确 typography / spacing / density；
- “像 Linear 的密度，但不要暗色；像 Stripe 的信息层级，但不要渐变 hero”。

v0 的 screenshot docs 写得很实用：高分辨率截图、完整界面或聚焦裁剪、补充行为/edge case 指令，会比纯文本更可靠。Figma Make 也强调已有 component / frame 可以作为 visual reference，让 Make 继承风格和 spacing。

### Step 4：每轮只给一个可观察反馈

低质量反馈：

```text
不对，再高级一点。
```

高质量反馈：

```text
The page is too spacious for an operations dashboard.
Reduce vertical padding in table rows from roughly 20px to 12px.
Keep the header height unchanged.
Do not change colors or data columns.
```

或者：

```text
On 390px mobile, the primary CTA wraps to two lines and pushes the filter chips below the fold.
Make the CTA icon-only on mobile, keep full text on >=768px, and preserve the current desktop layout.
```

前端 vibe coding 的关键是把“审美不满意”翻译成 **可定位的视觉差异**：

- 哪个 breakpoint；
- 哪个区域；
- 哪个状态；
- 具体尺寸/层级/行为；
- 哪些不能动。

### Step 5：建立浏览器验证 loop

最低限度：

```text
Run the app locally, open the affected page, check browser console errors,
capture screenshots at 390px, 768px, and 1440px, then list visual or functional issues before making another edit.
```

工程化一点：

- Playwright smoke test 覆盖主流程；
- Playwright screenshots 覆盖关键页面；
- Storybook stories 覆盖组件状态；
- Chromatic / Storybook visual tests 做视觉回归；
- axe / Lighthouse / manual a11y checklist 做可访问性；
- console/network errors 必须为 0 或有解释。

Playwright 官方支持 `toHaveScreenshot()` 做视觉比较；Storybook visual tests 会把每个 story 变成视觉测试。对 AI 生成 UI 来说，这类工具非常关键，因为 agent 很容易让“能跑”掩盖“看起来坏了”。

### Step 6：完成后让 agent 写“交接摘要”

每个 session 结束前要求：

```text
Summarize:
1. files changed
2. UX behavior implemented
3. known limitations
4. test commands run and results
5. what to verify manually
6. suggested next small task
```

这个摘要可以放进 PR description、Obsidian、Linear ticket、或下一轮 prompt。它解决 vibe coding 最大的问题之一：做得快，但上下文散、决策丢。

---

## 4. Prompt 模板

### 4.1 0->1 页面生成

```text
Build a [page/screen] for [product].

Context of use:
- User: [role/persona]
- Moment: [when/where they use it]
- Main decision/action: [what they must do]

Product surface:
- Include: [sections/components]
- Data fields: [real fields]
- States: loading, empty, error, logged out, permission denied
- Interactions: [filters, modals, drawer, inline edit, etc.]

Design constraints:
- [mobile-first/desktop-first]
- [visual density]
- [brand/design system/tokens]
- [component library]
- Accessibility: keyboard-friendly, visible focus, sufficient contrast

Do not:
- [files/features/routes not to touch]
- [libraries not to add]

Verification:
- Run [test command]
- Check [routes/breakpoints]
- Report screenshots or visual differences before finalizing.
```

### 4.2 截图/Figma 还原

```text
Use the attached screenshot/Figma frame as the visual source of truth.

Recreate the layout in [React/Next/Tailwind/shadcn].
Prioritize:
1. spacing and hierarchy
2. typography scale
3. component structure
4. responsive behavior

Do not hardcode image dimensions unless needed.
Use existing design tokens/components where possible.
If any part of the screenshot is ambiguous, ask before implementing.
After implementation, run the app and compare a screenshot against the reference. List differences.
```

### 4.3 修改现有组件

```text
Change only [component/file/section].

Goal:
- [specific behavior or visual result]

Keep unchanged:
- existing API props
- existing tests
- desktop layout
- colors
- route behavior

Implementation constraints:
- use existing components from [path]
- no new dependencies
- preserve accessibility attributes

Before editing, inspect current component usage and summarize risks.
After editing, run [unit/storybook/playwright command].
```

### 4.4 Debug UI bug

```text
Investigate this UI bug before fixing:
- Expected: [what should happen]
- Actual: [what happens]
- Route/breakpoint/browser: [details]
- Screenshot/console error: [attach]

First:
1. identify likely files
2. list 2-3 hypotheses
3. choose the smallest fix

Then implement only the fix.
Do not refactor unrelated code.
Verify by reproducing the issue and confirming it no longer happens.
```

### 4.5 Design QA reviewer

```text
Act as a senior product designer reviewing this frontend implementation.

Check:
- visual hierarchy
- spacing consistency
- mobile layout
- text overflow
- empty/loading/error states
- keyboard/focus behavior
- color contrast
- component consistency with the existing design system

Return prioritized issues with file/section references.
Do not edit code yet.
```

---

## 5. 前端专属检查清单

### 5.1 UI 状态完整性

每个生成页面至少要有：

- loading；
- empty；
- error；
- success；
- disabled；
- logged out；
- permission denied；
- long text；
- many items；
- zero items；
- slow network；
- mobile overflow。

AI 很擅长生成“happy path screenshot”，但真实前端坏在状态组合。

### 5.2 Responsive 不是“能缩放”

检查：

- 320/390/430 mobile；
- 768 tablet；
- 1024 laptop；
- 1440 desktop；
- 长标题、长按钮、长表格列；
- sticky header / bottom nav 是否遮挡内容；
- modal / drawer 在 mobile 是否可滚动；
- hover-only 功能是否有 touch 替代。

### 5.3 组件一致性

要求 agent：

- 先搜索已有组件；
- 复用 Button、Input、Dialog、Table、Toast；
- 不要另造一套颜色/spacing；
- 不要把 one-off style 写得到处都是；
- 新组件要补 story 或 example。

### 5.4 Copy 和真实数据

不要让 AI 用 Lorem Ipsum。给它：

- 真实字段；
- 真实 item count；
- 极端数据；
- 错误文案语气；
- CTA 文案；
- legal / pricing / tooltip 文案。

前端 quality 很大一部分来自 content realism。

### 5.5 可访问性

最低要求：

- button/link 语义正确；
- 表单 label 正确；
- focus ring 可见；
- modal focus trap；
- keyboard 可完成主流程；
- 文本对比度达 WCAG AA；
- 图标按钮有 accessible name；
- 不只用颜色表达状态。

MDN mobile accessibility checklist 和 WCAG contrast 要求可以作为验收标准。

---

## 6. 安全与生产化护栏

前端 vibe coding 最大风险不是“页面丑”，而是“能跑但不安全”。

高风险点：

- 把 API key 放到 client-side code；
- auth 只做前端隐藏，没有后端授权；
- `innerHTML` / markdown 渲染导致 XSS；
- CORS / CSRF / cookie security attributes 错误；
- AI 新增不必要依赖；
- `package.json` scripts 被改；
- GitHub Actions / Dockerfile / deploy config 被改；
- 测试由同一个 agent 写，且只验证它自己实现的错误逻辑；
- 从 issue、网页、README 读取了 prompt injection。

建议硬规则：

1. secrets 永远不进浏览器，不进 prompt，不进截图；
2. auth/permission 必须后端验证；
3. AI 新增依赖必须 `npm audit` / lockfile review；
4. CI/CD、Dockerfile、package scripts 改动必须人工 review；
5. 让独立 agent 或安全 reviewer 检查 XSS/auth/data handling；
6. 生产部署前跑 security checklist。

Replit 的 vibe-coded app security checklist 明确提到前端 XSS、secrets 不进浏览器、CSRF、auth、authorization、API endpoint protection、SQL injection、security headers。OWASP 的 Secure Coding with AI Cheat Sheet 进一步强调：不要接受未经审计的 AI dependency suggestion，不要把 test pass rate 当安全证据，AI 改 build/deploy 文件要高危复核。

OpenAI Codex 的 agent internet access 文档也提醒：让 agent 访问不可信网页、issue 或 dependency README 会引入 prompt injection、secret exfiltration、恶意依赖和 license 风险；网络权限应该按环境最小化。

---

## 7. 常见失败模式与修法

### 7.1 “越改越乱”

原因：

- session 太长；
- 没有固定 spec；
- 每轮反馈太主观；
- agent 开始重写无关区域。

修法：

- 让 agent 总结当前状态；
- 开新 session；
- 只给目标文件和验收标准；
- 明确 “do not refactor unrelated code”；
- 用 diff review 拦截大范围改动。

### 7.2 “页面看起来像 AI 模板”

原因：

- prompt 只有行业和形容词；
- 没有真实内容；
- 没有使用场景；
- 没有视觉 reference。

修法：

- 给真实文案和数据；
- 加用户使用时刻；
- 指定 density / hierarchy / interaction；
- 贴竞品截图并指出“借鉴什么，不借鉴什么”；
- 让 agent 先做 design critique，再改。

### 7.3 “功能按钮都是假的”

原因：

- prompt 只描述 UI，没有描述 state/data/action；
- agent 默认做静态 mock。

修法：

- 每个按钮写清 action；
- 每个表单写清 validation；
- 每个列表写清 data source；
- 每个状态写清 empty/error/loading；
- prompt 里写 “no placeholder-only interactions”。

### 7.4 “移动端崩了”

原因：

- desktop-first prompt；
- 没有 breakpoint 验收；
- 表格、modal、长文本没有极端数据。

修法：

- prompt 明确 mobile-first 或 desktop-first；
- 指定 390/768/1440 截图；
- 要求长文本和多数据测试；
- table 在 mobile 改 card/list；
- modal 在 mobile 改 full-screen sheet。

### 7.5 “代码不可维护”

原因：

- 一次生成太大；
- 组件没有拆；
- inline style / magic number 太多；
- 没有复用设计系统。

修法：

- 第一轮只搭 shell；
- 每个复杂区域拆组件；
- 要求引用 existing components；
- 让 agent 运行 lint/typecheck；
- 让 agent 写 story 和 props contract。

---

## 8. 推荐工作台配置

### 8.1 Solo builder / PM

推荐：

- Lovable / Replit / Bolt 做 0->1；
- v0 做高质量 UI surface；
- Supabase / Neon 做持久化；
- 每轮截图 + checkpoint；
- 上线前找工程 agent 做安全/代码 review。

不要：

- 在无代码背景下直接上支付、权限、敏感数据；
- 把 demo 当 production；
- 让 agent 自己设计 auth。

### 8.2 前端工程师

推荐：

- Claude Code / Codex / Cursor 接现有 repo；
- v0 / Figma Make 只负责 visual exploration 或局部 UI；
- repo 维护 `AGENTS.md`、design-system docs、storybook；
- 每个 PR 跑 typecheck、lint、unit、Playwright smoke；
- UI diff 必须截图。

不要：

- 让外部 app builder 重写生产 repo 大片代码；
- 让 AI 随便引入 UI library；
- 不看 diff 直接 accept。

### 8.3 设计师

推荐：

- Figma Make 做 interactive prototype；
- Figma frame 要 Auto Layout、constraints、layer naming；
- 给 agent 真实 copy、flow、edge state；
- 用 Figma MCP / Code Connect 把设计系统带给 coding agent。

不要：

- 用静态 mockup 期待 AI 自动理解所有 interaction；
- 只给“高级、现代、年轻化”等词；
- 不提供 component variants。

---

## 9. 对 BENZEMA 的产品启发

结合 vault 里已有的 [genui](/wiki/concepts/genui/)、[harness-engineering](/wiki/concepts/harness-engineering/)、[agent-artifact-community-products-2026-05](/output/reports/agora/market-competition/agent-artifact-community-products-2026-05/)，前端 vibe coding 对 BENZEMA 的启发不是再做一个“AI 建站器”，而是：

### 9.1 机会在 Workflow Compiler，不在页面生成

页面生成已商品化。更有价值的是把优秀前端 builder 的流程产品化：

- brief 模板；
- design token / component context；
- screenshot QA；
- mobile breakpoint checklist；
- security checklist；
- prompt library；
- visual diff；
- session handoff；
- deploy readiness。

### 9.2 可以做 “Frontend Skill Pack”

一个可分发的 capability package 可以包括：

- `frontend-brief-writer`：把模糊需求转成 UI brief；
- `design-reviewer`：截图审美 QA；
- `responsive-auditor`：多 breakpoint 检查；
- `component-refactorer`：把 AI 生成大文件拆成组件；
- `a11y-checker`：键盘、label、focus、contrast；
- `security-reviewer`：XSS/secrets/auth/dependency；
- `ship-readiness`：lint/test/playwright/deploy checklist。

这比卖“prompt”更强，因为它包含流程、验收和工具调用。

### 9.3 关键指标应是“返工率”和“可继续维护率”

前端 vibe coding 的评价不该只看第一张截图，而要看：

- 首轮可用率；
- 改 5 轮后结构是否稳定；
- mobile bug 数；
- console error 数；
- 组件复用率；
- 新依赖数量；
- PR diff 可读性；
- 是否有 tests/stories；
- 是否能被另一个 agent 接手。

这和本 vault 一贯的判断一致：AI coding 的竞争点会从模型输出迁移到 harness、context、eval、observability 和 distribution。

---

## 10. 压缩版实践卡片

### 开始前

- 写 10 行 Agent Brief。
- 明确用户、主行动、状态、数据、限制。
- 提供截图/Figma/竞品 reference。
- 让 agent 先问问题或出 plan。

### 生成时

- 一次只做一个页面/组件/状态。
- 指定使用已有组件和 design tokens。
- 明确哪些文件和行为不能改。
- 用真实文案和真实数据。

### 反馈时

- 不说“更好看”，说具体 visual diff。
- 指定 breakpoint、区域、状态。
- 让 agent 截图对比。
- 两轮修不好就开新 session。

### 合并前

- lint/typecheck/test。
- Playwright smoke + screenshot。
- mobile 390/768/1440。
- console/network error check。
- a11y + security checklist。
- review dependencies、secrets、auth、CI/CD。

---

## 参考来源

- Anthropic, [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — context window、verification、screenshots、Claude interview、session 管理。
- Anthropic, [Claude Code power user tips](https://support.claude.com/en/articles/14554000-claude-code-power-user-tips) — planning、parallel execution、automation、verification、customization。
- Anthropic, [Claude Code Security](https://code.claude.com/docs/en/security) 与 [Automated Security Reviews](https://support.anthropic.com/en/articles/11932705-automated-security-reviews-in-claude-code/) — permission、sandbox、prompt injection、安全 review。
- OpenAI, [Codex cloud](https://platform.openai.com/docs/codex) 与 [Agent internet access](https://platform.openai.com/docs/codex/agent-network) — Codex sandbox、parallel background tasks、网络权限和 prompt injection 风险。
- Cursor, [Rules](https://docs.cursor.com/context/rules-for-ai), [Modes](https://docs.cursor.com/agent), [Bugbot](https://docs.cursor.com/en/bugbot) — reusable scoped instructions、Ask/Agent/Manual mode、AI PR review。
- Vercel, [How to prompt v0](https://vercel.com/blog/how-to-prompt-v0), [v0 Text Prompting](https://v0.app/docs/text-prompting), [Screenshots and Files](https://v0.app/docs/screenshots), [Design Mode](https://v0.app/docs/design-mode), [Customize with Prompts](https://vercel.com/academy/v0-foundations/customize-with-prompts) — context of use、constraints、截图输入、移动端检查、可视化编辑。
- Lovable, [Prompting best practices](https://docs.lovable.dev/prompting) — 先提问、先规划、用户旅程、真实状态、版本化迭代。
- Bolt, [Prompt effectively](https://support.bolt.new/best-practices/prompting-effectively) — 架构优先、小步 prompt、target file、lock file、清上下文。
- Replit, [Build with Agent](https://docs.replit.com/learn/build-with-agent) 与 [Security checklist](https://docs.replit.com/learn/security-checklist) — plan、context、review/test、checkpoint、vibe-coded app 安全项。
- Figma, [Intro to Figma Make](https://developers.figma.com/docs/code/intro-to-figma-make/), [8 essential tips for using Figma Make](https://www.figma.com/blog/8-ways-to-build-with-figma-make/), [Figma MCP Server](https://developers.figma.com/docs/figma-mcp-server/), [Dev Mode](https://www.figma.com/dev-mode/) — prompt-to-code、Figma frame hygiene、design system context、MCP。
- Playwright, [Visual comparisons](https://playwright.dev/docs/test-snapshots) 与 [Screenshots](https://playwright.dev/docs/screenshots) — screenshot regression 和浏览器验证。
- Storybook, [Visual tests](https://storybook.js.org/docs/8/writing-tests/visual-testing) — component-level visual regression。
- OWASP, [Secure Coding with AI Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html) — AI dependency、prompt injection、test overtrust、context leakage、build/deploy supply chain。
- Design2Code, [How Far Are We From Automating Front-End Engineering?](https://arxiv.org/abs/2403.03163); VisRefiner, [Learning from Visual Differences for Screenshot-to-Code Generation](https://arxiv.org/abs/2602.05998) — design-to-code benchmark 与视觉差异迭代的重要性。
