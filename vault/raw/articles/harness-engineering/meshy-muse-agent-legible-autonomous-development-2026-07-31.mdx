Andrew Meshy AI *2026年7月31日 11:51*

Muse (Meshy Universal System for Evaluation) 是 Meshy 内部的模型评测平台。Meshy 各个团队每天都在用它判断新的模型 checkpoint 到底有没有比旧的更好。

有一天，一个新 checkpoint 刚刚训出来。我们得先让它过一次投票评测，才能决定下一步怎么训。团队发现，Muse 得加个新功能才能支持这次评测。

于是产品经理在 Slack 里说：

> **@Linear 给这个需求开个 Muse issue**

一分钟后，Linear issue `MES-12345` 建好了。

我是 Muse 的平台负责人，看到了这条 issue。这个功能得尽快上线，不然评测就会卡住。于是我给 Claude 发了一句话：

> Investigate and fix MES-12345

Claude 看完 issue，提了两个需要拍板的设计问题。做完决定后，我就关掉了 Claude 窗口去忙别的了。

一个半小时后，新版 Muse 部署完成。

搞定。

**要让软件开发自己跑起来，不一定非得上花哨的 Agent 编排控制台或者 dashboard** 。本文我们会来讲一下我们是怎么做到的。

## 为 AI 建模投出你的一票

Muse 要回答的问题，看起来简单实际很难： **新的模型 checkpoint 真的改进了吗** ？

当然，每轮训练都有各种量化指标可以看，但这些指标离准确表达 3D 生成的质量还差得很远。所以 Muse 选了一个简单而有效的办法：双盲测试。

同一张输入图，并排展示两个模型结果，左右顺序随机，投票的人不知道哪边是谁。每次评测都由一批这样的双盲投票组成。用户只要把两组生成结果和一组参考图交给 Muse，后面的事就都在 Muse 上了：配对生成结果，随机打乱，收集投票。

大家有空时就顺手投几票，这样票数每天就能累积起来。Muse 的整个界面都按 “随手就能用” 的标准来设计，几乎所有操作都能用快捷键完成。毕竟，投票还得伸手拿鼠标，大家自然会少投几票。

![Image](https://mmbiz.qpic.cn/mmbiz_png/vZDBYPtROnnsZTWicjSYdVg4ptoAknKlxBk64nPyQuSqRiclhgXB1K2IFxEJOzFdWpN69ExGZG5HEbicbQjNFbXibZFEIDUy5oibqicEWicOCXt0y8/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

整个产品就这么简单：看输入图，看生成结果，投票。 **Muse 的功能并不复杂，而真正特殊的，是它的开发方式。**

## 架构让 Agent 看得懂

Muse 项目是在 2025 年下半年开始的，当时 “vibe coding” 刚刚在 AI 行业里流行起来。除了支持 Meshy 在模型训练和发布过程中不断增长的评测需求，Muse 从一开始还有个雄心满满的目标：

**不靠人类写一行代码，做一套全公司都能用的软件。**

今天，我们已经有了非常漂亮的结果：

- **Muse 首次交付以来，累计收集超过 4 万票，每月有 30 多个评测项目**
- **Muse 成为 4 个以上团队日常工作的一部分**
- **公司第一个至少 1 位非技术同事持续贡献代码的内部代码库**
- **公司第一个实现全自主开发的内部代码库**

我们估算， **Muse 至少把基础模型评测提速了 80% **，** 每次模型发布省下至少 10 个人日** 。没有 Muse，Meshy 的几何、贴图、智能拓扑等大模型，很难维持现在的开发和发布节奏。

**从第一天起，Muse 就尽量按 “Agent 容易读懂” 的方式来设计。** 早在 2025 年我们就发现，同一个需求，换一种实现方式，Agent 可能从举步维艰变成一遍做对。经过很多轮迭代， **我们最后得到了一套故意设计得很 “无聊” 的技术栈。** 后端是 Python：FastAPI，Postgres 存记录，S3 存 3D 模型和图片。前端走服务端渲染 (Server-side rendering)：Jinja2 模板，HTMX 负责局部页面更新，Tailwind 负责样式。真正跑在客户端的组件只有一个：用来渲染网格的 WebGL 3D 查看器。没有 SPA (single-page app)，也没有单独的前端模块。前后端用的是 Web 最 old school 的那套连接方式：后端生成 HTML，浏览器负责显示。页面要更新时，HTMX 请求一段 HTML，服务器再把它渲染出来。

下面是 Muse 核心投票功能的架构：

![Image](https://mmbiz.qpic.cn/mmbiz_png/vZDBYPtROnnibx4WmsC1DF7anqdtufVo7NLkvBcbfTPxwvQdyLUDHM61cKfuOxs9Tm2yukOBJg1qoiaWDIERWdErwDrfN4PESRsCF4trYU8QM/640?wx_fmt=png&from=appmsg#imgIndex=1)

这种结构有两个特点，对 Agent 尤其重要。

第一，前端状态都在服务器上。用户看到的 HTML，就是后端直接生成的 HTML，所以不论是单元测试还是 Agent，可以直接检查渲染的 HTML，而不需要先起客户端来还原用户看到了什么。

第二，所有依赖都由机器强制检查，而且只能向下依赖。一个 feature 目录不能 import 同级 feature；如果两个 feature 确实需要配合，就需要从 main 对接，把一边的能力注入另一边。这样，依赖关系只会明确地出现在一个文件里。每一层只做一件事，而且每层的职责都写在 Agent 一定会看到的地方。

| 层级 | 职责 | 为什么 Agent 可以放心修改 |
| --- | --- | --- |
| `main/` | 只做功能对接，注册每个功能模块的 URL 路由。 | 新增功能就是加一个目录，再加一行 include，没什么容易产生幻觉的。 |
| `apps/<feature>/` | 每个 feature 一个目录，里面放全套功能： routes、pages、service、store、tests。 | 改动的爆破范围仅限于这个目录。import 同级 feature 会直接 build 失败，而不是等人留 review comment。 |
| `adapters/` | 对接外部世界：Web 渲染、数据库、对象存储。 | 每套系统的 I/O 都只走一个接口，每个接口都有对应的 fake。 |
| `libs/` | 可独立安装的共享库。 | 像第三方依赖一样做版本管理，任何修改都会很显眼。 |

依赖只能沿着这张表往下走。我们不靠代码的 best practice 维持这个约定，而是由 build 检查强制执行。

另外还有三个设计，也是专门为了让 Agent 看得懂：

1. **每个目录都有自己的文档和说明** ，写清楚这个 service 做什么、分层规则是什么、合并前必须跑哪些命令。Agent 就算第一次空降进来，也能自己找到方向，不需要问人或者自己瞎编。
2. **稍复杂一点的模块，docstring 里都会放设计文档的反向链接** 。这样，代码旁边不只有“做了什么”，也能保留“为什么这么做”。
3. **任何文件都不能超过 500 行** ，个别例外文件的代码行数只许减小，不许增加。大语言模型的上下文窗口是有限的，软件架构得考虑这一点。

## 全自动开发不用关起门

现在的 LLM Agent 已经比 2025 年强大得多， **所以我们希望 Muse 的开发可以完全自己跑起来。**

也就是说，人只负责把任务交给 Agent。Agent 自己探索代码库和任务上下文，一路完成实现、CI、代码 review，最后自己合并 PR 。人只需要排 issue 的优先级，并在关键设计问题上做决定。

一提到全自主开发，大家往往先想到新产品或者定制化平台，比如多 Agent 的工作区，Agent 和人类的共享任务管理或者聊天 App 等等。这些产品我们都看过，但最后也都没有采用。不是因为它们不好，而是因为：“看得懂”。

**我们希望像 Agent 能一下子看得懂代码库一样，人也能一下子看得懂 Agent 的工作。** 我们公司已经有一定规模了，如果把全自主开发塞进一个专用 App，开发进展就只有那几个天天登录这个 App 的人才看得见。所以，我们的协作和开发工具栈也故意选得很普通。整个流程只用了四个几乎每家 AI 软件公司本来就开着的工具：Slack、Linear、GitHub、Claude Code。

这样， **Agent 做到哪一步，就和任何团队成员的工作一样，看得见，摸得着。** 产品经理还是照常开 Linear issue、看功能进展。GitHub 的 bug bot 和安全审查还是照常在分支上运行。谁发现 bug，也还是往原来的 Slack 频道里贴截图；Bug 修复也就是普通的 PR。没人需要为了监督这台 “机器” 重新学一套东西。

下面是一条自主 issue 从头到尾的完整流程：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/vZDBYPtROnmCZoLRIibVtrzDGMuyPjNtq3TYTnh9acHPExX5Kia7PCEicHTxCjCqtushVyw4vvBIib9YJVIHZZU7MnMuYvDAAUJI2fyIVH5ibib8A/640?wx_fmt=png&from=appmsg#imgIndex=2)

整个流程里，人只需要碰两个地方：让 Agent 去看 Linear issue，以及回答 Agent 在写代码前抛出来的几个设计问题。

中间的代码实现、CI 检查、code review 意见、合并和部署，全程无人值守。CI 检查失败了，或者 reviewer 提了修改建议，Agent 就读信息、修复、重新 push，不断循环。只有 CI 全部变绿、所有 code review 问题都解决、 merge queue 也完成合并，循环才会退出。

这个流程得以实现，并不是因为我们在现有工具之上做了定制的开发和集成，而是因为这三个工具本来就提供了 Agent 可以直接操作的命令行入口，而且和人平时用的是同一套：

- **GitHub CLI。** Agent 用普通的 `gh` 命令创建 PR，读取每个 CI job 的状态和日志，在 review thread 里回复并标记 resolved，再把分支送进 merge queue。
- **Linear MCP。** Agent 读取指定的 issue，顺着链接查看相关 issue 和上下文，更新状态，并把过程中发现的后续工作另开成 issue。所有操作都是 MCP 内置的 tool call。
- **Claude Code 自己的 monitor loop。** CI 要跑几分钟，AI code review 通常更久，但没有人会一直盯着。这个工作由 Agent 来做。Monitor 使得 agent 的无人值守长期运行足够实用，不会乱烧 token。

Agent 创建 PR 后，不会不停地刷新状态。它会记录自己在等哪些消息，比如 CI、review thread、merge queue，然后结束这一轮对话。这些状态发生变化时，Claude Code 的 Monitor 功能才会重新唤起它：某个 CI job 失败了，review 提了问题，或者 merge queue 完成合并。因为 Agent 唤醒时，收到的是 Monitor 对应的状态消息，所以它会根据这个消息完成下一步：拉失败 CI 的日志并修复；处理 code review 修改意见；或者等所有检查通过后，开始合并 PR。

这都不是 Muse 专属的能力。只要代码库能被这三个工具访问，就可以用同样的方法自动化。这正是我们选择这套工具的原因。

## 信任是 CI 管出来的

我们不信任大语言模型本身。我们信任的是 harness 里的大语言模型 Agent，而 harness 工程可以为 agent 的可靠性提供守护。具体来说，harness 就是我们的 CI/CD 管线，再加上上面的 AI code review。每个 PR 都必须走完下面这套流程，没有例外：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/vZDBYPtROnnCZw7S7e1BklgzVmUF71Crcwic3ZdIg7cVyOibkI64GfAWY1dxeWbpMkrxiapZGAXbTictcKFJR03K6BTiaMibJia1QCTUJncsicIjA44/640?wx_fmt=png&from=appmsg#imgIndex=3)

下面是各个 CI job，以及我们根据近期真实 PR 统计出来的典型耗时：

| CI Job | 检查什么 | 典型耗时 |
| --- | --- | --- |
| Guardrails | 分层规则（禁止同级 import）、目录结构、文件行数上限、命名 | 约 60 秒 |
| Lint | `ruff format`  和 lint 规则 | 约 30 秒 |
| Type check | 用 `pyrefly` 检查整个项目 | 约 20 秒 |
| Unit + integration tests | 用按 schema 建出的真实 Postgres 跑 `pytest` | 约 90 秒 |
| Visual tests | 在 CI 自己的渲染环境里跑 Playwright 截图，并和代码库里的基准图做 diff | 约 140 秒 |
| Security | `semgrep`  静态分析和 secret scan | 约 40 秒 |
| Container boot test | 应用必须能启动；只要有一条 route 没声明谁可以调用，应用就拒绝启动 | 约 215 秒 |

Guardrails 是把前面讲的架构变成机器能执行的规则。在这里，同级 import 不会变成一条 review comment，而会直接让 CI 失败。前端渲染基准图也在 CI 自己的渲染环境里生成，以免 “在我的机器上能跑” 成为合并 bug 的理由。

真正有意思的是 AI review 层。每个 PR 都会交给由 3 位 Agent 组成的 “评审委员会”。它们看的是同一份代码变更，也都会参考整个代码库的设计规范，但每个 reviewer 扮演的角色不同。

下面是我们给每个 reviewer 的 prompt 大纲：

**The Principal Engineer:**

> **Persona: Principal Engineer — design review, big scope**
> 
> You review at **system scope**: does this change belong, fit the architecture, reuse what already exists, and stay additive — not whether a line is tidy.
> 
> **You see the diff + the Guides, not the whole repo.** Judge reuse and pattern-consistency...; don't claim a repo-wide search you can't perform.
> 
> Your lens: Judge the diff against these parts of the provided Guides...

**Litmus: "If I were the principal eng for this codebase, would I send this back for living in the wrong place, duplicating an existing capability, or adding a second way to do a solved thing?" If no — return \`\[\]\`.**

**The Senior Engineer:**

> **Persona: Senior Engineer — logic / implementation / quality**
> 
> You review **within the change**: is the logic correct, clean, testable, and secure. This is the most thoughtful review — trace the code paths, don't skim. Focus on the diff and the files it touches (read them in full).
> 
> **Your lens**: Judge the diff against these parts of the provided Guides...
> 
> Litmus: "Would I approve this logic, or would I find a bug, an untestable seam, or a security mistake on a careful read?" Be specific about the failing input or code path. If the logic is sound — return \`\[\]\`.

**The QA Engineer:**

> **Persona: QA Engineer — does it work, is it tested, will it break**
> 
> You review **behavior and risk**: will this change do what it claims, is it covered by tests, and could it break something live or in production? Read the PR title and description, then check the diff delivers it.
> 
> Your lens: Intent-match -...; Test coverage -...;Regression risk -...; Production traps:...
> 
> Litmus: "If I were QA signing off, would I block this for not doing what it claims, for shipping untested behavior, or for a change that breaks prod?" If it's safe and covered — return \`\[\]\`.

除了三个 reviewer 从不同角度看同一个 PR 之外，它们也都会看同一份设计规范，这套规范约束着整个代码库的开发方式 (以下为概括描述，实际 prompt 为英文)：

- **以模块内聚为荣，以无关耦合为耻。** 会一起变化的东西放在一起，无关的东西保持可分离。修改或删除一个关注点，只应该动一个地方。
- **以层次分明为荣，以依赖混乱为耻。** 业务逻辑不应直接依赖真实 I/O，用假数据在测试里也应该能跑。更换 backend 不能影响业务逻辑，每个 app 也绝不能调用自己的 HTTP endpoint。
- **以能力复用为荣，以复制重造为耻。** 每种能力只保留一个实现；新调用方应该接入已有接口，而不是复制一份。
- **以单元扩展为荣，以功能膨胀为耻。** 新增一个 feature 应该只是“加几个文件，再加一行注册”；删除它也不该碰到其他 feature。
- **以范式统一为荣，以各自为政为耻。** 每件事只有一种既定做法。新人照着已有模式写就行，不需要重新选方案；测试也不需要 server 或 DB。
- **以及时删码为荣，以留存旧账为耻。** 代码一旦没人用了，马上删。没有调用方的代码不能上线；“以后也许有用”不算理由，Git 会替你记住。
- **以简单够用为荣，以过度设计为耻。** 只有真的被逼到那一步才增加复杂度。每个抽象都要有眼前的具体需求来证明自己值得存在；改动应该尽可能小，只解决当前问题。

Review panel 会把每一个问题都写成 review comment，挂在对应代码行上。问题不解决，PR 就不能合并。

下面是最近一个 feature PR 里的 review：

> 🔴 \[medium\] Regression risk. *This function is the shared create-and-sync chokepoint; it now collapses view-suffixed files into one grouped row. Any pre-existing dataset ingested under the old scheme will, on its next sync, be silently regrouped, deleting the old sample identities that live evaluations still reference. No test covers re-syncing an existing dataset through the new grouping.*

意见正确。代码已经通过完整测试，也通过了所有 CI。测试对于 “这份代码实际做了什么” 并没有错。Reviewer 看到的是：代码虽然符合测试，却不适用于我们手里的真实数据。

Claude 修了问题，补上缺失的回归测试，在 thread 里回复，并把 comment 标记 resolved。整个过程都公开留在 PR 里，和你通过 code review 指导一个初级工程师开发一样。

上面只是一个例子。Agent 跑得久了以后，我们还看到了另外几类典型情况：

- **修一个问题，又带出一个新问题。** 我们做过一个测下载速度的诊断工具。Code review 发现，计算里用的是 MB（1百万字节），服务器发的却是 MiB（1,048,576 字节），所以所有速度都会低 5%。几次 push 之后，review 又指出，修复后的代码仍然要靠人手动保证两个常量同步。于是它要求直接用实际收到的字节数算速度。Reviewer 抓到了一个由前一次修复新引入的 bug。
- **功能实现正常，用户却走不通。** 某一个页面的链接会对所有已登录用户显示，但页面本身需要特定权限。没有权限的人点进去，只会看到报错。测试都能通过，因为链接确实显示了，权限检查也确实生效了。QA reviewer 把这两件事放在一起看，直到链接只对真正能打开页面的人显示，才允许合并。
- **为了过测试硬 hack。** 有个 bug 修复的测试，直接伪造了它本来应该捕获的那个异常。这样一来，不管真实错误处理有没有坏，测试都会通过，因为测试收到的异常信息是正确的。Review 把它指出来后，重写的测试会让真实错误走过真实代码。同一个 PR 里还有一个测试，在开发者机器上能过，在 CI 里却失败，因为它暗中依赖了一个只有开发机上才有的凭据文件。两处都是测试本身的 bug，最后都被测试上面的那一层抓了出来。

我们的合并标准是： **AI review 问题必须为 0。**

每一条问题，要么修掉，要么拿证据反驳，之后 PR 才能进入 merge queue。我们允许反驳，是因为 review panel 会在可接受范围内误报。把“为什么这条意见不成立”写清楚，有时反而还能发现 review agent 自己的推理错误。

所有检查通过后，merge queue 会基于 main 的最新版本，重新验证每个分支。合并完成后，系统自动部署到生产环境，全程无人介入。

![Image](https://mmbiz.qpic.cn/mmbiz_png/vZDBYPtROnklIphJQLYfkuWXReImVQgFAibuU0wiaqtZTEBUaHCEtjp6oSW61qkv9UgpRlJDOtIibEydItSVLvOic4icZ5VicOTftD4IFSfJoc51A/640?wx_fmt=png&from=appmsg#imgIndex=4)

## 代码行数不代表工作量

跑过很多自动推进的 PR 之后，我们发现了一个很明显、但也在情理之中的规律： **反复处理检查和 review 花的时间，远比写出第一版实现更长，而且不同任务之间的比例差异很大。** 下面我们拿一个星期内的两种开发任务举例。

### 案例 A：下线旧功能

一个旧功能已经停用了。它的链接、确认弹窗、翻译、测试和基准截图都得一起删掉。从 Linear issue 创建，到 PR 合并进 main，总共只用了 16 分钟，其中前 2 分钟在写代码。Review 只给了一些建议，没有不允许合并的问题。

### 案例 B：大幅改进网络诊断功能

按代码行数看，这次改动并没有超过案例 A 很多。第一版 5 分钟就写完了，但从开始到合并一共用了大约 3 小时。这期间，Agent 处理了 5 轮 review、7 条不允许合并的问题。

两边的时间线也很不一样：

|  | 案例 A：下线废弃功能 | 案例 B：改进诊断工具 |
| --- | --- | --- |
| 改动规模 | +10 / −125，8 个文件 | +439 / -19, 9 个文件 |
| 第一版可用实现 | 2 分钟 | 5 分钟 |
| 从 issue 到合并 | 16 分钟 | 3 小时 |
| 合并耗时是第一版的多少倍 | 8× | 36× |
| Review 修改意见 | 无，仅一般建议 | 7 条，共 5 轮 |
| 代码出错时的最坏结果 | 一个本来就没人该点的链接 | 每个工程师都相信一个错误数字 |

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/vZDBYPtROnnY2aUamHxQ1mtCU6TgNGQcrfZibvdlETSvScqDIJowXtdxkNjrJLQ81muW2llWXApIa4L2ibnew5mvVkHyvrsWdkapG4GW2J9hA/640?wx_fmt=png&from=appmsg#imgIndex=5)

案例 B 花了案例 A 11 倍的时间。代码没有更难写很多，而是因为风险不同，用来验证代码的工作量也因此有很大区别。案例 A 是删东西。最坏的结果，不过是一个本来就不该访问的链接坏了。案例 B 是测量工具。最坏的结果，是所有人看到的数据都不对。AI code review 先找出了错误，之后又连续三轮拒绝半吊子修复，直到错误处理类型明确、逻辑完整、测试充分。每一轮都让实现更严密。这些缺陷没有一个会让测试失败，但它们全都会被带进生产环境。

这正是单次代码生成天生看不到的部分。单次生成优化的是最容易看见的指标：从 prompt 发出，到代码能编译、能运行，一共花多久。我们的两个案例都在几分钟内达到了这个指标。如果代码写完一次就合进去，案例 B 会在几分钟内就 “做完”，然后带着错误运行几个月。

同一条管线，16 分钟就完成了一个以删代码为主的改动，却把一个下载速度测量工具卡了 3 个小时。没有任何人来决定两者分别要花多久。当有人问，AI 写的代码能不能放心放进生产环境，答案是： **代码有多可信，取决于外面包了多强的验证。** 而现在，验证深度可以用 agent 运行几个小时换来，不需要工程师的几人天时间。一旦有人根据错误的测速去排查网络问题，代价就不止三个小时了。

## 我们的经验与展望

**今天，开发能不能自己跑起来，更多取决于 harness，而不是模型。** 每次模型升级都会让 Agent 变强。但模型能力本身，不能打包票让你放心 Agent 可以直接合自己的 PR。我们没有选择投入更多人力盯着，也没有盲目换上最贵的前沿模型，而是给 Agent 造“手”和“眼睛”，让它拥有写出正确生产代码所需要的一切。这样一来，模型继续升级时，我们可以顺势而为，不用为了补模型短板一遍遍返工。而人的角色没有消失，而是收缩到更核心，更重要的地方。在人不再写代码，评审代码之后，最后留下的是无法替代的部分：判断什么值得做，把需求写得足够清楚，以及在 AI 不确定的时候拍板。在这个 “开发团队” 里，设计品味和需求质量，已经成了最重要的工程能力。

关于 Agent 团队，还有一个很有意思的结论： **团队的价值来自冲突，而不是协作。**

把全栈开发拆给前端 Agent 和后端 Agent，也许有道理。但让前端 Agent 和后端 Agent 为了更快完成开发任务来回沟通，就没那么有道理了。真正的团队收益，出现在成员目标互相冲突的时候。Muse 的开发 Agent 想把代码发出去。AI reviewer 想找出代码哪里错了、哪里设计得不好。正是这种张力，让代码生成结果变得可信，也如实暴露出除了代码行数之外，一个开发任务的真正工作量。

更重要的是，这些探索正在把我们带向一种正在成形的软件开发方式： **自主化工程组织** 。

我们已经证明，Agent 可以用现有工具自主完成单个任务。但还有一些缺失的环节和开放问题，有待继续探索：

- 这类系统到底能 scale 到多大？当自驱组织用更多并行 Agent，去做越来越大的任务和项目时，会冒出哪些新问题？
- Harness 自己产生的数据，比如首次 CI 通过率、AI review 问题，能不能变成评测信号？怎么衡量一个 Agent 在组织里的表现，又怎么让它自我演化？
- 怎么把人的设计品味和产品品味写进这类系统？如果只靠少量人的判断，就能让工程实现自主化，那我们还能把这件事推多远，去回答“软件应该为谁做”和“软件应该长什么样”？

最后，感谢你一直读到这里。寻找这些答案的行动点已经都躺在 Linear Issue 里了。下一个 Agent，或者你，都可以来领走其中一条。