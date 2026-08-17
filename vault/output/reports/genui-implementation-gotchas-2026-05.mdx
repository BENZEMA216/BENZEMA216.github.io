<!--
date: 2026-05-29
tags: [genui, implementation, gotchas, vercel-ai-sdk, iframe-sandbox, streaming, zod, prompt-caching, accessibility, security, verified]
status: active
trigger: 用户在动手建 GenUI Lab 前，想知道实现时会咬人的细节；用 8 维并行研究 + 对抗性验证产出
related:
  - "[genui-mvp-spec-2026-05](/output/reports/genui-mvp-spec-2026-05/)"
  - "[generative-ui-landscape-2026-05](/output/reports/generative-ui-landscape-2026-05/)"
  - "[genui](/wiki/concepts/genui/)"
-->

# GenUI 实现级 Gotcha 清单（已对抗性验证）

> 方法：8 维度并行深挖实现级 gotcha（16 agent）→ 每维高风险 claim 再对抗性验证一遍。
> 验证结果：65 findings，**51 confirmed / 13 partially-correct / 1 refuted**。
> 下文已把 13 处修正和 1 处驳斥并入。日期：2026-05-29。
> 场景：Next.js + Vercel AI SDK + Claude Sonnet 4.6，四轨（Registry tool-call / Declarative streamObject / iframe artifact / 流式对比）。

---

## ⚠️ 先看：3 处验证纠正了之前 spec / 常见说法的错

1. **`parameters` → `inputSchema` 是 v4→v5 的改动，不是 v5→v6**（验证纠正）。AI SDK 6（~2026-05 中旬稳定，非确切 05-15）真正的破坏性改动是：**弃用 `generateObject`/`streamObject`**，改用 `streamText` + `Output.object({schema})`，返回字段 `partialObjectStream`→`partialOutputStream`、`object`→`output`。5→6 迁移**不需要**再改 parameters。

2. **Anthropic 的 frontend-design Skill 是"最大化多样性"设计的，且那个"修复 PR"并没有合并**（验证驳斥）。线上 SKILL.md 至今仍含 `NEVER converge on common choices across generations` / `No design should be the same`。社区 PR #210（justinwetch，盲评 21/28 胜、p=0.0125）至今 **state=OPEN、未合并**。所以：**直接拿它做"风格一致"的 Lab 会跟你对着干**——它天生求异不求同。

3. **`json-render` 是 2026-01 开源**（不是 3 月，3 月是媒体报道）；**streamObject 的 JSON-patch 流式模式（#2036）已被 maintainer 关闭为 not-planned**，不是"待开发"。

---

## 🔴 三个跨维度反复出现的"头号 footgun"（最该刻进脑子）

### F1. iframe 沙盒：`allow-scripts` + `allow-same-origin` 同开 = 等于没沙盒（出现在 4 个维度）
内容若与你同源（srcdoc / blob: / 同源路由），这两个 flag 一起开，AI 生成的 JS **能删掉自己的 sandbox 属性**完成逃逸、读你的 cookie/localStorage。
- **默认只给 `sandbox="allow-scripts"`**。
- 真需要存储 → 把 AI 内容放到**独立 credential-less origin**（如 `sandbox.yourdomain.com`，仿 Google 的 `*.googleusercontent.com` / GitHub 的 `*.githubusercontent.com`），让 `allow-same-origin` 只对那个一次性 origin 生效。

### F2. `partialObjectStream`/DeepPartial 流式途中**不做 schema 校验**（出现在 5 个维度）
你的真实崩溃点不是"schema 错误"，而是**渲染时 `undefined`**：流到一半每个字段都可能是 undefined、半截字符串、未知节点类型 → 递归 renderer 白屏。
- 渲染前**逐字段 guard**；未知 `type` 走 fallback 节点而不是抛错。
- 用 error boundary 兜底（但注意 F3）。

### F3. `streamObject` 每个 chunk **重发整个对象**（出现在 3 个维度）
不是发 delta。两个连锁后果：
- **key 不稳 → remount → flicker + 丢状态**：用数组 index / 内容派生值 / `message.id` 当 React key，组件会在流式途中重挂载，**用户在受控 input 里输入的内容被清空**。→ 用**稳定 ID**当 key。
- **每 token 一次 full reconciliation → UI 卡死**：上 `experimental_throttle` + `memo`。
- iframe 轨更狠：**每 chunk 重绑 `srcDoc` = 整个 document 重载**，DOM/滚动/JS 状态全没 → 别在流式中途反复写 srcdoc，等完成再写一次，或走 postMessage 增量更新。

---

## 按维度（critical / high，已验证）

### 1. Tool-call / Zod schema / 选组件
- **[crit] v5/v6 版本漂移静默失败**：`ai`(server) 和 `@ai-sdk/react`(client) 跨 v5/v6 边界 → UI message 流 wire format 不匹配，**tool part 直接不渲染且不报错**。→ 三件套 `ai@^6` + `@ai-sdk/react@^6` + `@ai-sdk/anthropic@^3` 锁同一大版本；tool part 不渲染时**先查版本漂移**再 debug renderer。
- **[high] Claude 结构化对象一次性返回（非逐 token）**：因为 AI SDK 对 Anthropic 走 tool-call 实现 object 生成（issue #3422）。**你的"看 UI 树逐步长出来"demo 在 OpenAI 漂亮、在 Sonnet 死**。→ 早测 Claude；要 Sonnet 上有进度感就用 `output:'array'` 的 `elementStream`（顶层子节点逐个完整出）。
- **[high] Claude strict 模式拒收普通 Zod**：`z.number().int()` 会发出 `minimum`/`maximum`，Anthropic 禁止；**Anthropic 自家 SDK 会自动 strip，Vercel adapter 不会**（#13355）。→ tool schema 里避开 `.int()/.min()/.max()/.length()/.regex()`，用数字 enum 表达有界整数；`additionalProperties:false` 必须，别用 `.passthrough()`。
- **[high] 递归 UI 树 `z.lazy` 需 `useReferences:true`**；递归节点上加 `.default()`/`.meta()` 会直接让生成失败。
- **[part] `experimental_repairToolCall` 不在 Zod 校验失败时触发**（#8240 confirmed 它没触发；但"其他错误会触发"是推断非实证）。

### 2. 流式 UX
- 见 F2 / F3。
- **[high] RSC `streamUI`/`createStreamableUI` 在 `.done()` 时 remount 且有二次方传输**；**Vercel 现在官方建议用 AI SDK UI（client `useChat`）而非 RSC**。→ 摸机制别从 RSC 入。
- **[part] 中途取消**：`useChat` 的 `stop()` 会 abort in-flight fetch，`onFinish` 收到 `isAbort`；v5 起 `useChat` 转 transport 架构、不再管 input 状态（`append`→`sendMessage`）。"reconciliation tearing"不是官方术语——真实问题是 overlapping 请求的 **stale-response 竞态**，用 AbortController + request-id 守卫解决。

### 3. iframe 安全（最该认真的一维）
- 见 F1。
- **[crit] 锁死的 null-origin 沙盒仍能往外 exfil**：sandbox flag **不拦出站网络**。→ 配 CSP：`connect-src 'none'; form-action 'none'; base-uri 'none'; img-src data:`。注意 `<meta>` CSP **不能**带 `sandbox`/`frame-ancestors`/`report` 指令（这些只能走 HTTP header）→ 用独立 sandbox 路由发 header。
- **[high] srcdoc 继承宿主页 CSP，且相对 URL 解析到宿主 origin**。→ srcdoc 里塞 `<base href="about:srcdoc">`；别依赖非标准的 iframe `csp` 属性；要强隔离就用独立 origin + 自己的 HTTP CSP header。
- **[high] postMessage**：收时校验 **`event.origin` + `event.source === iframe.contentWindow`**；沙盒的 origin 是字符串 `"null"`（不唯一）→ 靠 `event.source` 身份 + 启动时 `MessageChannel`/port 握手，别广播 `targetOrigin:'*'`；用 Zod 校验 `event.data` 形状，别当命令 eval。
- **[crit] Prompt injection 把 AI 生成 UI 变成钓鱼/exfil 面，即使没沙盒逃逸**：tool/RAG 输出可能是攻击者可控。→ 纵深防御：CSP + sanitize 掉 `on*`/`javascript:`/`data:` URL（把模型输出当不可信 HTML 过 sanitizer）+ credential-less origin + 外层标注"AI 生成、不可信" + 出站导航要用户手势。
- **[high] top-navigation / popup**：别随手加回 `allow-top-navigation`（用 `allow-top-navigation-by-user-activation`）、别给不可信内容加 `allow-popups-to-escape-sandbox`。sandbox 串里**每多一个 token 就是给注入内容多一份攻击面**。

### 4. 状态 / 持久化 / 跨轮身份
- 见 F1（沙盒存储的双重约束：要 localStorage 必须 same-origin，但 same-origin+scripts 又破沙盒）/ F2 / F3。
- **[high] 两套 message-ID 生成器（client + server）**对不齐 → 持久化/reload 后重复或孤儿消息。
- **[high] source of truth 放哪是 THE 设计决策**：OpenAI Apps SDK 模型是验证过的拆分——**server data（事实） vs ephemeral widget state（~4k token 上限，且会喂给模型）**。
- **[part] streamObject 不发 patch、流式不校验**；patch 模式 #2036 已 closed not-planned。
- **[part] `vercel-labs/json-render`**（2026-01 开源，Apache-2.0）：catalog 约束的可渲染 JSON，`$state`/`$bindState`，能导出 React 代码——可作 Track 2 的成熟参考。

### 5. 设计 / slop / 一致性
- 见纠正 #2（Anthropic skill 求异不求同）。
- **[crit] 描述不约束，只有字面值约束**："dark blue"/"minimal" 只会重新激活模型的 SaaS prior（slop）。→ 给**具体 token 值**（hex、字号、间距），不要形容词。
- **[crit] `allow-scripts allow-same-origin` 正是让"宿主 token CSS 直接生效"的诱人陷阱**——它好用恰恰因为它破了沙盒。别为了换肤方便开它。
- **[high] 沙盒/srcdoc iframe 里 web font 静默 fallback**：你指定的唯一 anti-slop 字体变回系统字体，slop 回归。→ 在 iframe 内显式 `@font-face` + 允许字体源。
- **[high] Claude Artifacts 不是跨源沙盒**那套"宿主 token CSS 直接生效"的把戏（那是 Claude 的 generative-UI 功能用 Shadow DOM + 共享 cascade + CDN allowlist 实现，**Artifacts 本体反而是沙盒 iframe**）——**真沙盒 iframe 复制不了这个一致性技巧**。
- **[high] 一个怀疑型 evaluator pass 胜过任何 system-prompt 调参**：generator 改不了自己的输出，要独立的 critic 抓 slop。

### 6. 成本 / 延迟 / 缓存
- **[crit] 主导成本是 output token 不是 input；Track 3（raw HTML）是吞金兽**。→ Track 3 当稀有/premium，不当默认；重复 UI 用 Track 1（只发 props）或 Track 2（紧凑 JSON）；要 code-gen 就**生成一次→持久化→后续只发 diff 或 data**；用 `onFinish` 的 `usage.outputTokens` 给 Track 3 设硬上限。
- **[high] 缓存 registry/system/tool 定义**：写 1.25x、读 **0.1x（省 90%）**。→ `cache_control:{type:'ephemeral'}` 放在 tools 数组**最后一个 tool** + system prompt 静态尾部；内容按**稳定→易变**排序（tools→system→dynamic messages）；用 `usage.cachedInputTokens` 确认命中（miss 不报错）。
- **[high] 改任一组件 schema 会让整个 tool/system/message 缓存失效**。→ registry 稳定后冻结、版本化，只在 deploy 时 bump；热迭代期别指望缓存收益。
- **[high] generateObject/streamObject 内部用隐藏 forced-tool**：会悄悄破坏缓存并加 schema-as-tool 开销。→ Track 2 用**固定的一套 UI-tree schema**（不要 per-intent schema）保持可缓存；或用 Anthropic 原生 Structured Outputs 避开合成 tool。
- **[high] "每轮重新生成"是默认陷阱**：拆 "UI structure" vs "UI data"，结构生成一次缓存在你这边、按 intent 为 key，后续只问 data。
- **[part] 流式不改计费**（与非流式 token 数相同），只改感知延迟；usage 只在 `onFinish` 拿得到。

### 7. a11y / 运行时正确性
- **[high] axe-core/Lighthouse 只覆盖约 57%（按问题数量）的真实 WCAG 问题**；约 30% 的 WCAG 准则机器可测（两个不同分母）→ a11y CI 门是"假信心机器"，键盘/焦点/对比要人查。
- **[high] 前沿模型（含 Claude Sonnet 4）默认产出不可访问 markup** → system prompt 里的 a11y 指引**非可选**。
- **[crit] React error boundary 抓不到真正让 Track 2/3 崩的错**：事件处理器内、async、iframe 内部的错误都不在 boundary 覆盖范围。→ 事件/async 手动 try-catch；iframe 内错误靠 postMessage 把 error 报出来 + 外层超时检测白屏。
- **[crit] Track 2 白屏来自未知节点类型 + 未校验 DeepPartial**（见 F2）；**Track 3 逃逸来自 F1**；**Track 3 的 postMessage origin 是 `"null"`**，幼稚的 `event.origin` 检查要么全丢要么可绕过（见 F1/iframe）。

### 8. agent-intent 对齐 / 信任 / 小项目怎么评
- **[crit] UI 说 X / tool 做 Y**：渲染确认卡时**从真实 tool call 的参数渲染意图，绝不让模型再描述一遍**。
- **[crit] 生成 UI 里的破坏性按钮**：在**服务端**用 `needsApproval` 把关，绝不信客户端 confirm。AI SDK 流程：tool part 进 `approval-requested` 态，`part.input` 是模型参数，客户端 `addToolApprovalResponse({ id: part.approval.id, approved: true })`（id 是 **approval id**，不是 part id），**批准后还要触发续跑**（`sendMessage` 或 `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses`）。
- **[high] streamObject/streamText 吞错误**："冻住的半截 UI"其实是一次你没看见的失败生成 → 显式查 `onError`/finish reason。
- **[high] 你给"流式对比"用的 LLM judge 有偏**：位置偏置翻转 10-30%、verbosity 偏置、self-preference。→ 交换 A/B 位置取一致、分解 rubric、用不同模型族当 judge。
- **postMessage 安全引用**：别引 CVE-2024-49038（它是 XSS / CWE-79，不是 origin 校验问题）；引 **CWE-346 / OWASP** 说"永远校验 postMessage origin"。

---

## 一句话给 Lab 的优先级

按"会不会让你白干 / 出安全事故"排，**先把 F1（沙盒）、F2（DeepPartial guard）、F3（key 稳定 + 不每 chunk 重绘）三个跨维度 footgun 处理掉**，再按轨道补 schema（Claude strict 限制）、缓存（registry 冻结 + cache_control）、a11y（system prompt 非可选 + 别信 axe 绿灯）、审批（服务端 needsApproval）。Track 3 当"稀有 premium"而不是默认。

---

*由 8 维并行研究 + 对抗性验证产出（51 confirmed / 13 partially-correct / 1 refuted）。具体 API 以 ai-sdk.dev 官方文档为准；安全实现以 MDN iframe sandbox / Window.postMessage + OWASP 为准。*
