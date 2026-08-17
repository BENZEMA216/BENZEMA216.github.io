<!--
date: 2026-05-25
tags: [frontend, ai-coding, agentic-coding, react, ui-freeze, visual-regression, storybook, playwright, spec-driven-development]
status: active
trigger: 用户询问 UI 先完成、再让 AI 实现互动逻辑时，如何避免 Agent 改坏已有前端代码
related:
  - "[frontend-vibe-coding-practices-2026-05](/output/reports/frontend-vibe-coding-practices-2026-05/)"
  - "[harness-engineering](/wiki/concepts/harness-engineering/)"
  - "[spec-driven-development](/wiki/concepts/spec-driven-development/)"
  - "[self-verification](/wiki/concepts/self-verification/)"
  - "[context-engineering](/wiki/concepts/context-engineering/)"
  - "[genui](/wiki/concepts/genui/)"
-->

# UI 已完成时如何让 Agent 只补互动逻辑

> Query：前端项目中先把 UI 做完，再让 AI 实现互动逻辑；但 Agent 经常改动已有前端代码，导致整体逻辑出问题。想找研究或 Blog，尤其是前端大佬关于工具/流程、前端开发者如何检查并纠正 Agent 行为的建议。  
> 日期：2026-05-25

---

## 一句话结论

**你遇到的不是单纯 prompt 写得不够清楚，而是 Agent 没有被放进一个“UI 冻结、逻辑可变、视觉可验证、改动可审计”的工程边界里。**

“UI 已完成，再让 AI 补交互逻辑”的正确工作流应该是：

1. **把 UI 变成冻结契约**：Storybook stories、Playwright screenshots、Chromatic/visual snapshots、props contract。
2. **把交互逻辑移到可编辑边界**：custom hooks / controller / container / state machine / API adapter。
3. **让 Agent 先读后写**：先输出计划、受影响文件、风险、验证方式；不允许直接改。
4. **限制 Agent 可动文件**：只允许改 logic/test/adapter；UI 文件默认只读。
5. **用视觉回归和行为测试抓它**：视觉不变、行为新增，这是验收核心。
6. **前端开发者从 author 变成 reviewer/operator**：看 touched files、diff shape、视觉快照、测试真实性、是否越权改架构。

一句话：

> 不要让 Agent 在“完整前端代码”里自由找路。给它一条窄路：只接线，不重画。

---

## 1. 为什么 Agent 会改坏已有 UI

### 1.1 Agent 有 action bias：它倾向于“做点什么”

2026 年论文 **Coding Agents Don’t Know When to Act** 专门测了这个问题：在 200 个“其实不需要改代码”的已修复任务里，当前顶级模型仍会在 35%-65% 的 case 里提出不必要的代码改动。论文结论是：coding agents 有 action bias，即使“不改”才是正确答案，它也会倾向于动代码。

这解释了你看到的现象：你说“只实现交互逻辑”，它可能理解成“为了交互能跑，我可以顺手重构 UI、改 props、换组件、调整状态结构”。如果没有强边界，Agent 会把“完成任务”置于“保护既有 UI”之前。

### 1.2 Agent 缺少 runtime UI context

Frontman 的博客把这个问题说得很准：多数 coding agent 只看 source files 和 terminal output，看不到真实浏览器里哪个元素是哪一个、computed spacing 是什么、组件如何映射到源码。前端问题的关键信息常常只存在于运行中的浏览器里。

所以当你让它给一个已有 UI 补交互，它会根据源码猜测：

- 哪个按钮对应哪个 handler；
- 哪个 state 应该放在哪层；
- 哪个组件可以被拆；
- 哪个样式可以被顺手改；
- 哪个 file 是“实现逻辑”的合理位置。

猜测一多，UI 就漂移。

### 1.3 Agent 缺少 design system / component context

Storybook MCP 的定位正是解决这个问题：让 Agent 能读取真实组件、stories、docs 和 tests，复用已有组件，而不是 hallucinate 一套新 UI。Storybook 团队明确说，Agent 如果不知道你的组件，就会生成不符合标准的代码；MCP 给它组件元数据、story preview、测试工具，才能让它“在轨道上”。

如果项目里没有给 Agent 结构化组件上下文，它通常会：

- 新增相似但不一致的组件；
- 改已有组件 props；
- 把交互逻辑塞进 presentational component；
- 为了实现行为而改 markup；
- 引入新的 className / layout / wrapper。

### 1.4 “不要改 UI”不是可验证约束

对 Agent 来说，“不要改 UI”太抽象。它需要知道：

- 哪些文件禁止改；
- 哪些 DOM 结构禁止改；
- 哪些 className / token / layout 禁止改；
- 哪些 screenshot baseline 不能变；
- 哪些 visual diff 是允许的；
- 改 UI 是否算失败。

如果没有自动化校验，“不要改 UI”只是建议，不是闸门。

---

## 2. 相关研究和博客要点

### 2.1 Addy Osmani：spec 要控制上下文、边界和测试

Addy Osmani 在 **How to Write a Good Spec for AI Agents** 里的核心观点是：不要把一份巨大 spec 直接扔给 Agent，context window 和 attention budget 会让它失焦；应该写“smart spec”，足够明确地覆盖结构、风格、测试、边界，同时保持可执行、可演化。

映射到你的场景：

- spec 里必须写“UI frozen surface”；
- 必须列出 “editable files” 和 “forbidden files”；
- 必须写“视觉不变是成功条件”；
- 必须要求 Agent 先 plan / read-only probing，再 implement。

Addy 在 2026 O’Reilly CodeCon 的 agent orchestration talk 里还强调了 **plan approval for risky tasks**：高风险任务要先 plan，由 lead 审批后再实现。对前端来说，任何会动 UI 文件、组件 API、route layout 的任务都应算高风险。

### 2.2 Simon Willison：first run tests、red/green TDD、agentic manual testing

Simon Willison 的 **Agentic Engineering Patterns** 给了很实用的纪律：

- 每次进入 existing project，先让 agent 跑测试；
- 新行为用 red/green TDD：先写失败测试，再实现到通过；
- 不要相信没执行过的代码；
- Web UI 要让 agent 用浏览器自动化“手动测试”。

对你的场景，最重要的转译是：

> 让 Agent 先证明旧 UI 没坏，再证明新交互能用。

这不是单一测试命令，而是一组证据：

- baseline screenshot 没变；
- Storybook visual diff 没变；
- user interaction test 新增并通过；
- console/network 没错误；
- touched files 在允许范围内。

### 2.3 Matt Pocock：alignment before code + vertical slices + fresh review context

Matt Pocock 在 2026 AI coding workflow talk 里展示的流程是：

1. 用 `/grill-me` 先让模型追问，达成共同设计概念；
2. 生成 PRD；
3. 拆成 vertical-slice kanban issues；
4. 交给 agent loop 用 TDD 做；
5. 用 fresh context review 输出。

对你的场景，关键不是“多 agent”，而是：

- 先对齐，不要直接编码；
- 切 vertical slice，不要一次接完所有交互；
- 每个 slice 都有验收；
- review 用新上下文，避免实现 agent 自我辩护。

### 2.4 Storybook MCP：给 Agent 组件上下文和自验证工具

Storybook MCP for React 的价值非常贴前端：

- Agent 能发现现有组件；
- 能读 stories / API / docs；
- 能预览自己的 UI；
- 能跑组件测试和 accessibility tests；
- 能在 chat 里展示 live story preview。

这对“UI 已经完成，只补逻辑”的工作流很关键：你可以把每个完成 UI 的 state 写成 Storybook story，Agent 实现逻辑时必须保持这些 stories 视觉不变。

### 2.5 Frontman：Agent 需要浏览器和源码映射，不只是文件

Frontman 的论点是“AI coding agents are blind to UI”。它把运行中的元素映射回源码，编辑现有组件而不是重新生成代码，并通过 hot reload 验证。

即使不用 Frontman，这个观点也应该进入流程：

- Agent 改前端时必须打开真实页面；
- 用元素/截图/DOM 指向具体问题；
- 不要只给文件名和抽象描述；
- 视觉反馈要进入 agent loop。

### 2.6 WyeWorks：不要追求通用 agent workflow，要做任务专用 pipeline

WyeWorks 用 Claude Code + Figma MCP 实现公司官网时发现：即使有完整 Figma design system、desktop/mobile layout、Astro/Tailwind 栈，生成结果也“接近但不足以信任”。最后真正提升可靠性的不是更强 prompt，而是针对任务设计 pipeline：planning → component analysis → asset extraction → implementation → validation → visual QA → review。

这正好回答你的问题：你需要的不是“一个更会写前端的 Agent”，而是“UI-freeze + interaction-binding”这条专用 pipeline。

### 2.7 论文：测试和回归也要防 Agent 自欺

几篇 2026 论文给了硬证据：

- **Where Do AI Coding Agents Fail?**：未合并的 agent PR 往往更大、改更多文件、CI 更容易失败；失败原因包括 duplicate PR、unwanted feature implementation、agent misalignment。
- **Are Coding Agents Generating Over-Mocked Tests?**：Agent 更倾向于改测试、加 mock；过度 mock 会让测试更容易生成，但更不验证真实交互。
- **TDAD**：仅给 TDD 流程指令不够，针对性 test context 更重要；用 source-test dependency map 告诉 agent 应该跑哪些测试，可减少 regression。
- **ABTest**：从真实用户失败报告抽象出的行为测试能发现大量 agent anomalous behavior。

结论：让 Agent 写测试是必要的，但不能让它随便 mock 掉真实 UI/网络/状态；前端交互尤其要用接近真实用户行为的测试。

---

## 3. 推荐工具组合

### 3.1 最小可行组合

如果你们现在只想快速止血：

1. **Git branch/worktree per task**
   - 每个交互任务独立分支；
   - 完成 UI 后先 commit；
   - Agent 所有改动都在 UI baseline 之后。

2. **Cursor / Claude Code / Codex 的 plan-first**
   - 先 Ask / Plan / read-only；
   - 让它列出要改的文件；
   - 你批准后再 implement。

3. **文件级边界**
   - UI 文件默认冻结；
   - 只允许改 `hooks/`、`controllers/`、`services/`、`*.test.ts(x)`；
   - 必须改 UI 文件时，先单独申请。

4. **Playwright smoke**
   - 覆盖关键用户路径；
   - 加 screenshots 或至少 console error 检查。

5. **Diff review checklist**
   - touched files；
   - 是否改了 UI；
   - 是否新依赖；
   - 是否改组件 API；
   - 是否 over-mock；
   - 是否跑过旧测试和新测试。

### 3.2 稳定生产组合

更推荐：

- Storybook：每个完成 UI 写 stories；
- Storybook visual tests / Chromatic：冻结视觉；
- Storybook MCP：给 agent 组件、stories、docs、tests 上下文；
- Playwright：页面级行为和截图；
- Testing Library：组件交互按用户行为测；
- ESLint / TypeScript / dependency audit：基础质量闸门；
- Claude Code / Cursor / Codex：只作为 implementation worker，不做无限自由探索。

### 3.3 不推荐的组合

- 只在 chat 里说“不要改 UI”；
- 让 Agent 一次接完整页面所有交互；
- 让 Agent 既改 UI 又设计状态又写 API 又写测试；
- 没有 baseline commit；
- 没有 visual regression；
- 审查时只看最终页面，不看 diff；
- 让 Agent 自己决定哪些文件可以动。

---

## 4. 推荐代码结构：UI 冻结，逻辑外挂

你现在的“UI 先完成，AI 后补互动”流程，本质上要求代码天然支持 **presentation / behavior separation**。

### 4.1 Presentational component 保持纯 UI

```tsx
type CheckoutPanelProps = {
  planName: string
  price: string
  isSubmitting: boolean
  error?: string
  onSubmit: () => void
}

export function CheckoutPanel({
  planName,
  price,
  isSubmitting,
  error,
  onSubmit,
}: CheckoutPanelProps) {
  return (
    <section className="...">
      {/* 已完成 UI：Agent 默认不许改这里 */}
      <button disabled={isSubmitting} onClick={onSubmit}>
        {isSubmitting ? "Processing" : "Continue"}
      </button>
      {error ? <p role="alert">{error}</p> : null}
    </section>
  )
}
```

### 4.2 逻辑放到 hook / controller

```tsx
export function useCheckoutController() {
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function submit() {
    setSubmitting(true)
    setError(undefined)
    try {
      await createCheckoutSession()
    } catch {
      setError("Unable to start checkout. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return { isSubmitting, error, submit }
}
```

### 4.3 Page 只负责接线

```tsx
export function CheckoutPage() {
  const checkout = useCheckoutController()

  return (
    <CheckoutPanel
      planName="Pro"
      price="$19/mo"
      isSubmitting={checkout.isSubmitting}
      error={checkout.error}
      onSubmit={checkout.submit}
    />
  )
}
```

这种结构对 Agent 友好，因为你可以明确说：

> `CheckoutPanel.tsx` 是 frozen UI。不要改 JSX、className、layout、copy。只允许在 `useCheckoutController.ts` 实现逻辑；如果 props contract 不够，先提出最小 props change，不要直接改。

Patterns.dev 对 Container/Presentational pattern 的总结正是：presentational component 负责 view，container / hooks 负责 application logic。现代 React 可以用 custom hooks 取代传统 container，但 separation of concerns 仍然成立。Kent C. Dodds 也长期强调，组件拆分应该解决真实问题：state、event handlers、testing、merge conflicts、imperative APIs 变难时，就需要拆。

---

## 5. 给 Agent 的工作流模板

### 5.1 Read-only planning prompt

```text
We already finished the UI. Your task is to implement interaction logic without changing the visual UI.

Rules:
- Do not modify JSX structure, className, CSS, layout, copy, or design tokens in UI components.
- Do not replace existing components.
- Do not introduce a new UI library.
- Prefer adding logic in hooks/controllers/services/tests.
- If a UI component needs a new prop, stop and propose the minimal props contract first.

Before editing:
1. Inspect the relevant components and tests.
2. Identify frozen UI files and editable logic files.
3. Propose a plan with exact files to touch.
4. Explain how you will verify that UI did not change.

Do not edit files yet.
```

### 5.2 Implementation prompt after approval

```text
Approved plan:
- Frozen UI files: [list]
- Editable files: [list]
- New tests: [list]

Implement only the approved interaction logic.
Keep the diff minimal.
After implementation:
1. Run existing tests first.
2. Run the new interaction tests.
3. Run the visual/screenshot checks.
4. Report touched files and any visual diffs.

If you need to touch a frozen UI file, stop and ask.
```

### 5.3 Correction prompt when Agent goes off-track

```text
Stop. You changed frozen UI files:
- [file paths]

This violates the task boundary. Revert only the UI/layout/style changes you made.
Keep only the interaction logic changes in approved files.

Then summarize:
1. which UI changes were reverted
2. which behavior changes remain
3. which tests prove the behavior
4. which visual checks prove the UI is unchanged
```

### 5.4 Review prompt for a separate Agent

```text
Review this diff as a frontend lead.

Goal:
- New interaction logic is implemented.
- Existing UI must remain visually unchanged.

Check:
- Did the diff touch frozen UI files?
- Did JSX/className/CSS/copy/design tokens change?
- Did component public props change unnecessarily?
- Did the implementation add logic in the correct hook/controller/service layer?
- Are tests user-behavior oriented, or over-mocked?
- Were existing tests run before and after?
- Are visual snapshots/screenshots unchanged?

Return blockers first. Do not modify code.
```

---

## 6. 前端开发者如何检查 Agent 的行为

### 6.1 先看 touched files，不先看代码细节

第一步只看文件列表：

- 有没有改 `components/ui/`？
- 有没有改 CSS / Tailwind config / theme tokens？
- 有没有改 route layout？
- 有没有改 shared component？
- 有没有改 package / lockfile？
- 有没有改测试 snapshot？
- 有没有改 Storybook stories？

如果任务是“只补交互逻辑”，但 diff 改了很多 UI 文件，先打回，不要进入逐行 review。

### 6.2 看 diff shape

健康 diff：

- 新增 hook/controller/service；
- 少量 page wiring；
- 新增行为测试；
- 少量 props contract；
- 没有视觉变动。

危险 diff：

- 大量 JSX 重排；
- className 批量变化；
- 提取/重命名一堆组件；
- 替换组件库；
- 删除原有 story/test；
- snapshot 被整批更新；
- mock 大量增加但真实路径没测；
- 为了修一个按钮改了全局 state。

### 6.3 视觉证据比文字总结更可靠

要求 Agent 提交：

- before/after screenshot；
- Storybook visual diff；
- Playwright trace；
- console error 截图或日志；
- 390 / 768 / 1440 breakpoint；
- hover / focus / disabled / error state。

如果没有视觉证据，不要相信“UI unchanged”。

### 6.4 检查测试是不是验证真实交互

Testing Library 的原则是：测试越像用户使用方式，信心越高。对 Agent 写的测试尤其要防：

- mock 掉关键 hook；
- mock 掉 API 后只验证函数被调用；
- 测 implementation detail；
- 只测 loading，不测 success/error；
- 没测 keyboard/focus；
- 没测权限/空态/错误态。

Agent 容易写“能通过但没意义”的测试。论文 **Are Coding Agents Generating Over-Mocked Tests?** 也指出，agent 更倾向于添加 mock，而 mock 可能让测试更易生成但更不验证真实交互。

### 6.5 把失败沉淀成规则

Simon Willison 有个重要提醒：LLM 本身不会从上一次失败中自动学习，但 coding agent 的 instructions 和 harness 可以被你更新。

所以每次 Agent 改坏 UI 后，不要只骂它；要把失败固化为：

- `AGENTS.md` 规则；
- Cursor rule；
- Claude Code skill；
- Storybook story；
- Playwright regression；
- lint rule；
- frozen file allowlist。

---

## 7. 针对你们当前流程的建议

你现在的流程是：

> 人先做完 UI → AI 实现互动逻辑

我建议改成：

> 人做完 UI → commit baseline → 为 UI 写 stories/screenshot → 冻结 UI 文件 → Agent 先 plan → 人批准 editable files → Agent 写 hook/controller/tests → visual + behavior proof → 人 review diff

### 7.1 具体目录建议

```text
src/
  components/
    checkout/
      CheckoutPanel.tsx              # frozen UI
      CheckoutPanel.stories.tsx      # frozen visual states
      CheckoutPanel.test.tsx         # behavior at component boundary
      useCheckoutController.ts       # editable logic
      checkout.service.ts            # editable API adapter
```

### 7.2 `AGENTS.md` 可加规则

```markdown
## Frontend UI Freeze Rules

- UI components under `src/components/**` are frozen after visual approval.
- Do not change JSX structure, className, CSS modules, Tailwind classes, copy, or design tokens unless explicitly approved.
- Implement interaction logic in `use*.ts`, `*.controller.ts`, `*.service.ts`, or page wiring files.
- If a frozen component needs new props, propose the props contract before editing.
- Run existing tests before editing and after editing.
- UI tasks require Storybook or Playwright screenshots proving visual output did not change.
- Do not update visual snapshots unless the user explicitly approves the visual change.
- Do not add new UI libraries without approval.
```

### 7.3 PR 模板可加 Agent evidence

```markdown
## Agent Change Evidence

- Goal:
- Frozen UI files:
- Editable files:
- Files touched:
- Existing tests run before change:
- Tests run after change:
- New behavior tests:
- Visual checks:
- Screenshot / Storybook / Playwright trace:
- UI files changed? yes/no
- Snapshot updated? yes/no, why:
- Known risks:
```

### 7.4 Stop rule

只要出现下面任一情况，立即停止 Agent：

- 开始大规模重构；
- 改了 UI frozen 文件；
- 删除/更新 snapshots 但没解释；
- 修改 package / lockfile；
- 引入新状态库；
- “顺手优化”布局；
- 两轮修复仍在扩大 diff。

停止后让它总结当前 diff，然后你决定 revert 或开新 session。

---

## 8. 高价值阅读清单

### 优先读

1. Addy Osmani — **How to Write a Good Spec for AI Agents**  
   关键词：smart spec、attention budget、boundary、testing、plan-first。

2. Simon Willison — **Agentic Engineering Patterns**  
   重点读：First run the tests、Red/green TDD、Agentic manual testing。

3. Storybook — **Storybook MCP for React**  
   关键词：真实组件上下文、stories、live preview、component/a11y tests。

4. WyeWorks — **The Workflow Is the Product**  
   关键词：Figma design system + Claude Code 不会自动 production；需要 task-specific pipeline。

5. Frontman — **AI Coding Agents Are Blind to UI**  
   关键词：runtime context gap、browser-to-source mapping、existing codebase editing。

### 研究支撑

1. **Coding Agents Don’t Know When to Act**  
   支撑“Agent 会不必要改代码”的 action bias。

2. **TDAD: Test-Driven Agentic Development**  
   支撑“需要 targeted test context，而不是只写 TDD 指令”。

3. **Are Coding Agents Generating Over-Mocked Tests?**  
   支撑“Agent 写测试也要审，尤其要防过度 mock”。

4. **ABTest: Behavior-Driven Testing for AI Coding Agents**  
   支撑“从真实失败报告抽象行为测试”。

---

## 9. 最终建议

你们的问题可以用一句工程原则处理：

> UI 完成后，不要再把 UI 当作 Agent 的工作区；把它变成 Agent 必须保护的测试夹具。

前端开发者的角色不是退到旁边看 AI 写代码，而是设计边界：

- 哪些是 frozen surface；
- 哪些是 editable logic；
- 哪些视觉快照不能变；
- 哪些用户行为必须新增；
- 哪些 diff 形状必须打回；
- 哪些失败要沉淀成规则。

这会把流程从“AI 在前端代码里自由发挥”变成“AI 在受控边界里接线”。对你描述的场景，这是最关键的转变。

---

## 参考来源

- Addy Osmani, [How to Write a Good Spec for AI Agents](https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/) — smart spec、context/attention budget、边界和测试。
- Addy Osmani, [Orchestrating Coding Agents](https://talks.addy.ie/oreilly-codecon-march-2026/) — agent team、plan approval、frontend/backend API contract。
- Simon Willison, [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/) — agentic engineering 与 vibe coding 边界。
- Simon Willison, [First run the tests](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/), [Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/), [Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/) — 测试优先、真实执行、浏览器自动化。
- Matt Pocock, [Full Walkthrough: Workflow for AI Coding](https://talksintel.ai/ai-ml/conferences/aie-eu-2026/full-walkthrough-workflow-for-ai-coding-matt-pocock/) — alignment before code、PRD、vertical slices、TDD、fresh review context。
- Storybook, [Storybook MCP for React](https://storybook.js.org/blog/storybook-mcp-for-react/) 与 [Storybook 10.3](https://storybook.js.org/blog/storybook-10-3/) — component context、stories、live preview、a11y/component tests。
- Frontman, [AI Coding Agents Are Blind to UI](https://frontman.sh/blog/ai-coding-agents-blind-to-ui/) — runtime UI context gap、browser-to-source mapping、existing codebase editing。
- Vercel, [How we made v0 an effective coding agent](https://vercel.com/blog/how-we-made-v0-an-effective-coding-agent) 与 [Use v0 to Prompt and Build Against Production Apps](https://vercel.com/go/introducing-v0-production) — dynamic prompts、deterministic autofixers、production branch/preview/PR workflows。
- Anthropic, [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills) 与 [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) — frontend skills、generator/evaluator、structured artifacts。
- WyeWorks, [The Workflow Is the Product](https://www.wyeworks.com/blog/2026/05/13/custom-agentic-workflows-for-coding-agents/) — task-specific frontend pipeline、Figma MCP、visual QA。
- Patterns.dev, [Container/Presentational Pattern](https://www.patterns.dev/react/presentational-container-pattern/) — view 与 application logic 分离，hooks 版逻辑分离。
- Kent C. Dodds, [When to break up a component into multiple components](https://kentcdodds.com/blog/when-to-break-up-a-component-into-multiple-components), [Avoid soul-crushing components](https://www.epicreact.dev/soul-crushing-components) — 组件边界、维护性、组合 API。
- Testing Library, [Guiding Principles](https://testing-library.com/docs/guiding-principles/) — 测试应贴近用户使用方式。
- Playwright, [Visual comparisons](https://playwright.dev/docs/test-snapshots) — `toHaveScreenshot()` 视觉回归。
- Storybook Docs, [Visual tests](https://storybook.js.org/docs/writing-tests/visual-testing) — stories 自动变成 visual tests。
- Gloaguen et al., [Coding Agents Don’t Know When to Act](https://arxiv.org/abs/2605.07769) — FixedBench、action bias、不必要改动。
- Ehsani et al., [Where Do AI Coding Agents Fail?](https://arxiv.org/abs/2601.15195) — agent PR 失败模式：大 diff、CI 失败、misalignment。
- Hora et al., [Are Coding Agents Generating Over-Mocked Tests?](https://arxiv.org/abs/2602.00409) — agent-generated tests 的过度 mock 风险。
- Alonso et al., [TDAD](https://arxiv.org/abs/2603.17973) — targeted test context 降低 regression。
- Dai et al., [ABTest](https://arxiv.org/abs/2604.03362) — behavior-driven fuzzing 发现 agent anomalous behavior。
