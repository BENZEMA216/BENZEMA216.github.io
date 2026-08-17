Haozhen、Siqi 海外独角兽 *2026年7月29日 14:30*

[![图片](https://mmbiz.qpic.cn/mmbiz_png/QUs3kaltEh0pZQTtGbrOJ3ddEkReJO7xIJowmKOt8rCf2MP8uVliczC9ZzAoUohHMBFQXicze847q2j7ygDgwWXv8XAlnubd2iaqVgBWHHOWe0/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg2OTY0MDk0NQ==&action=getalbum&album_id=4157672299245862924&scene=21&token=2102312364&lang=zh_CN#wechat_redirect)

作者：Haozhen

编辑：Siqi

昨天，企业数据安全公司 Cyera 宣布将以约 10 亿美元收购 NHI 管理公司 Oasis Security，上个月，Anthropic 推出了 Claude tag，团队成员可以在 Slack 频道中直接 @Claude 分配任务。

　⁠

一次十亿美元级别的并购和一项进入日常工作流程的 agent 功能，都说明了 agent identity 已经成为企业必须面对的安全问题。在这一领域中，企业首先要回答两个问题：

　⁠

1.用户与 agent 之间的委托关系（delegation），即 agent 在代表谁行动；

　⁠

2.授权（authorization）关系，即 agent 为完成这项任务可以获得哪些权限。

　⁠

但企业现有的身份体系大多围绕员工账号和应用凭证设计，通常按照身份或角色预先分配权限，且权限相对固定，而 agent 在做任务时，可能需要连续访问代码仓库、数据库或其他业务系统，每一步所需的权限会随任务进展发生变化，也需要在任务结束后让权限失效。

　⁠

目前多数企业还没有为此做好准备，Okta 2025 年的调查显示，91% 的受访组织已经开始使用 AI agent，但只有 10% 制定了较为完善的非人类身份管理策略。

　⁠

这些需求也催生了一批新的 agent identity 公司。成立于 2025 年的 Keycard 是其中比较 agent-native 的一家。去年 10 月，公司公布了两轮合计 3800 万美元的融资。我们整理了 Keycard 团队的对于这个行业的理解，并结合我们近期对市场的观察，希望借 Keycard 的产品与思考，说明 agent identity 为什么值得重视。

| ⁠ | / | ⁠ |
| --- | --- | --- |

01.

## Agent 本质上是一个非确定的软件系统

　⁠

Agent 可以被描述为一种概率性、非确定性的软件系统。为了方便理解“概率性、非确定性”的特点，我们可以参考下面的一个场景 case：

　⁠

开发者对一个 coding agent 提出需求：“生产环境出了问题，请检查日志并创建一个 issue，修复问题，然后提交一个 PR”，这条指令听起来并不复杂，因为开发者已经交代了任务目标和大致的处理顺序，但 agent 真正开始执行后，其实还需要自己补全大量没有写进 prompt 的信息：

　⁠

•它要先判断应该查看 Datadog、CloudWatch，还是其他日志系统，之后决定在 Jira、Linear 或 GitHub 等工单系统中创建 issue。

　⁠

•找到问题以后，它还需要读取和修改代码，在本地执行 Bash 命令，再确认应该向哪个代码仓库提交 PR。

　⁠

•提交完成后，这次代码变更应当记在开发者、agent，还是两者名下，最初的指令同样没有说明。

　⁠

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/QUs3kaltEh20pB8LYvU9EUzS4icTpybu04BC0mCHKhWWuSOvKfQHSRlMISBNicvHZ934pbPXVrVwseiaMIVoeKUgmibRib587C9CtpNuES7cuuiaU/640?wx_fmt=png&from=appmsg#imgIndex=1)

左右滑动查看更多图表

　⁠

在传统工作流中，这些信息一般由人预先作出判断，然后开发者写定程序，最后应用会按照定好的程序运行，但 agent 通常只接收到一个目标，真正运行以后，agent 会结合当前 context、可用工具和前一步返回的结果，决定下一步访问哪个系统、调用什么工具以及执行什么操作。因此，即使有相同的目标，agent 的具体执行路径也可能不同。

　⁠

基于这个过程，我们可以将 agent 与传统应用在任务执行方式上的差异归纳为四点：

　⁠

1.开发者无法在运行前穷举 agent 的行为，因为 agent 会从 MCP Server、本地命令以及 skills、AGENTS.md 等配置中发现可用工具，而工具发现和路径选择的过程又是发生在模型的推理过程中。因此，企业很难像审查普通应用一样，预先列出 agent 将访问的全部资源。

　⁠

2.一项任务可能会涉及日志系统、工单系统、代码仓库和本地运行环境等多个系统，但每个系统往往都有自己的账号体系、权限规则和操作记录，传统访问控制通常只能判断发生在单个系统中的请求，很难看见整条操作链产生的结果。因此agent 跨系统执行任务会产生新的组合风险。

　⁠

比如当 agent 分别合规地获得了读取日志、创建工单和提交 PR 的权限后，如果 agent 把日志里的个人信息写入工单，又在公开 PR 中引用这张工单，那么这几个合规动作组合起来仍然会造成数据泄露。

　⁠

3.Agent 还可能把任务继续交给 sub-agent，或者通过 MCP Server 调用远端工具，再由工具连接其他 API，任务每向下传递一层，用户最初提出的需求和上游批准的信息都可能丢失一部分。等请求到达链条末端时，API 虽然能够执行某项操作，却不一定知道请求由谁发起、经过了哪些 agent 等。

　⁠

4.Agent 的行动速度远比人要快。因此一旦企业同时运行大量 agent，或者让 agent 持续执行长任务，人就无法逐项审批每一次工具调用。如果每次操作都弹出确认窗口，用户也会很快产生审批疲劳，不会再认真阅读内容，只是连续点击允许。

　⁠

　⁠

02.

## 现有身份系统为什么不适用 Agent？

　⁠

### 现有身份系统无法准确描述 Agent 是如何行动的

　⁠

现有身份系统主要指企业用于管理员工账号、应用和服务凭证的身份与访问管理系统。它们一般分开处理两类主体：

　⁠

1.面向人的身份系统（human identity）：验证用户是谁，并根据岗位和角色授予权限。这类系统默认人在行动前会自己判断权限。

　⁠

2.工作负载身份（workload identity）：识别服务和应用，通常假设调用方和系统边界相对确定，程序的行为由预先编写并经过审查的代码决定。

　⁠

![图片](https://mmbiz.qpic.cn/mmbiz_png/QUs3kaltEh3QNfcopnOBFAexiaKLmzwXSokamewYDf7m3sj9q5bE6Jd9hVicun32PtwCOicKPyPSVtKGOBU4rn6LIIIUWjXhXOh198qbb38obo/640?wx_fmt=png&from=appmsg#imgIndex=3)

　⁠

但 agent 同时包含两类主体，单靠 human identity 或 workload identity 都无法完全准确描述 agent 的身份系统。

　⁠

•Agent 首先要接受人的委托，所以需要用 human identity 说明 agent 代表谁；

　⁠

•开始执行任务时，agent 作为应用软件在运行，又需要 workload identity 来调用系统。

　⁠

因此，有相关领域的创业者把 agent identity描述为一种“委托关系”：企业需要规定哪些用户可以把哪些权限交给哪些 agent，这些 agent 可以在哪些系统、哪些条件下使用权限。如果 agent 把任务交给另一个 agent，最初的用户身份和委托限制也需要继续向下传递。

　⁠

### 长期凭证把权限固定在任务开始前

　⁠

目前很多 agent 仍然依靠 API key、保存在.env 文件中的密钥等来访问系统。这些凭证通常长期有效，并直接存放在 agent 可以读取的运行环境中。Agent 一旦取得凭证，就可以使用其中包含的全部权限，即使当前任务只需要完成一项操作。

　⁠

Jared Hanson（Keycard CTO）用计算机安全中的 ambient authority 描述这种状态：agent 会直接继承运行它的用户或应用原本拥有的所有权限。

　⁠

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/QUs3kaltEh1RWAlj1TPSszYaYE1hHp4Q9VhIeBIwKh4SMTwlHuFOKRhAVibOgt9H9WqW8xNV5cdZPaxCaj4S72vOMEpf6IlshhbzzWTDMIhc/640?wx_fmt=png&from=appmsg#imgIndex=4)

　⁠

### Case：长期凭证如何让 Agent 获得过多权限？

　⁠

Kim Maida（Keycard Founding GTM Engineer、Head of DevRel）曾让一个深夜运行的事故管理 agent 连续处理五张工单，其中后三张工单涉及风险更高的操作。

　⁠

•第一张工单涉及服务器机房的备用电源故障，agent 判断自己无法处理，将事件留给早班团队。

　⁠

•第二张工单是 TLS 证书即将过期，agent 先用事故系统的 API key 读取工单，再用云服务 API key 完成续签，最后把处理报告写回事故系统。

　⁠

•第三张工单要求删除计费数据库，再由系统从备份恢复。Agent 拥有 PostgreSQL 连接字符串，因此直接删除了数据库，但它无法确认备份是否存在。

　⁠

•第四张工单要求重启已经冻结的生产服务，agent 使用第二张工单中续签证书时的同一枚云服务 API key 完成了重启。

　⁠

•第五张工单显示三分之一的用户无法访问网站，agent 又用这枚 API key 扩大了容量，因此产生了额外费用。

　⁠

由此可见，这枚云服务 API key 同时允许 agent 续签证书、重启生产环境和扩大容量。Kim 将它形容为把各种权限装在一起的“kitchen sink”。

　⁠

　⁠

03.

## Agent-native 身份系统 6 要素

　⁠

企业需要把给 agent 的授权从一次性的“访问门禁”变成能够持续判断的“控制平面”，也就是说，每一项真实操作发生前，系统都需要重新确认用户是谁、agent 是谁、它准备做什么，以及当前任务提供了哪些 context。要做到这一点，agent 的身份与授权系统需要具备以下六项能力。

　⁠

1.Agent 能够被不同系统识别

　⁠

身份系统首先需要把 agent 记录为一个独立主体，不能只记录运行它的用户或应用账号。Jared 进一步表示，agent 的身份应当稳定并且能够通过加密方式验证，不能依赖共享密钥，也不应该要求 agent 预先与每个目标系统分别注册。这样，同一个 agent 跨越多个系统执行任务时，各个系统才有可能确认请求其实来自同一个 agent。

　⁠

2.系统需要根据当前任务，从头判断 Agent 的每项请求是否可以执行

　⁠

传统身份系统通常在用户登录、应用获得授权或令牌（token）签发时判断某个主体能否访问系统，但 agent 的授权判断需要从 token 签发时移到 agent 实际操作发生前：系统要知道 agent 代表谁、准备访问哪个资源，以及请求执行什么操作。

　⁠

用户在 prompt 中交代的信息、agent 在组织中的职责和它正在使用的应用，都可能影响授权判断。对于风险更高的请求，agent 所处的运行环境同样可能成为依据，例如它是否运行在安全性更高的虚拟机或隔离环境中。

　⁠

尤其当 agent 主动访问一个此前没有出现的系统时，安全工具如果看不到当前任务和用户的委托关系，就无法判断这次跨系统访问是 agent 为完成任务采取的正常操作，还是攻击者入侵。

　⁠

但 Keycard 的 CEO Ian Livingstone 强调，目前行业对于哪些 context 应当进入授权判断还没有准确答案。

　⁠

3.渐进式信任：权限可以随着 agent 任务推进逐步调整

　⁠

一项工具调用能否执行，最终仍需要得到明确的允许或拒绝，但其实系统不需要完全接受 agent 最初提出的请求。

　⁠

•如果 agent 申请的权限过宽，系统可以缩小请求，只授予当前步骤所需的范围；

　⁠

•风险较高的操作可以交给人确认；

　⁠

•Agent 也可以提供证据，说明自己运行在更安全的环境中；

　⁠

•如果现有信息仍然不足，系统还可以暂缓操作，等获得更多 context 以后再作决定。

　⁠

Keycard 的 CTO Jared 把这种在任务推进过程中不断调整授权条件的方式称为渐进式信任（progressive trust，这个词比 agent 更早出现，在安全行业也没有统一的定义，在这里被用于描述 agent 运行过程中的动态授权）。Ian 还提出，系统应当把委托条件清楚地展示给用户，并在 policy 中规定哪些操作必须由人确认、哪些可以自动执行。

　⁠

4.零常驻：任务结束后，agent 不应继续拥有权限

　⁠

Agent 的权限应当与任务和目标对齐。任务完成以后，相关凭证也应随之失效。这种状态就是零常驻权限（zero standing privileges），即 agent 在没有任务时不继续拥有有效的访问权限。虽然在已经建立信任的场景中，持续访问未必完全不可接受，但它不应成为 agent 的默认状态。

　⁠

要让权限随任务结束，就要区分一枚凭证能用多久，以及用户对某个应用的授权会保留多久。比如 OAuth 原本是为了让第三方应用在不取得用户账号密码的情况下，可以代表用户访问另一个服务中的部分资源。它使用 access token 传递权限，并允许用户限制委托范围，因此比把长期 API key 直接放进 agent 的运行环境更安全。

　⁠

但 OAuth 管理的通常是用户对应用的授权，并不知道 agent 正在执行哪项任务。即使一枚 access token 很快过期，只要这项授权仍然有效，应用通常还可以取得新的 token，继续在原有范围内访问系统。因此，agent 完成任务后，相关权限并不会自动收回。

　⁠

5.日志需要记录 Agent 代表谁做了什么

　⁠

Agent 完成工作以后，审计日志需要说明谁委托了这项访问、系统实际授予了什么权限，以及为什么作出这样的决定。如果请求经过多个 agent，这些信息还要在整条委托链上保持可见，不能只散落在各个目标系统的日志里。

　⁠

Jared 认为，完整记录委托和授权过程是合规要求的一部分。当 agent 的行为出现异常时，这些记录也能帮助安全团队还原任务经过。随着企业继续改进 agent 的访问系统，历史记录还可以用来检查原有 policy 和授权判断是否合理。

　⁠

6.最难的是把 Agent 的权限限制在用户目标之内

　⁠

如何让 agent 的权限始终受到用户目标（goal）和意图（intent）的约束，是目前身份系统领域最难解决的问题之一。

　⁠

具体来说，用户让 agent 干活的时候，背后其实都有一个明确的目标和意图，但 prompt 未必会写明，agent 对任务的解释也可能逐渐偏离用户的要求。系统因此还要判断当前 agent 的操作是否仍在用户原有意图之内，并在 agent 偏离目标时发现问题。

　⁠

　⁠

04.

## 企业应该如何管理 Agent 的身份与权限？

　⁠

企业目前主要以三种方式使用 agent，三种用法对应的 agent 身份关系也不同。

　⁠

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/QUs3kaltEh33RqayWqfEeKP18UFOQzCyhnLM92lUNjbbhlicGkfCR56SbqxtbpFdLPc6ibzkXM4DrRAahIpZPaglZlg7gyc5kH1icm2P9t542k/640?wx_fmt=png&from=appmsg#imgIndex=5)

　⁠

需要注意的是，在企业正式部署 agent 以前，员工可能已经在本地安装了相关工具，并为它申请了 API key 或内部系统权限。安全行业通常把这种未经企业统一审批和安全管理的 agent 使用方式称为 shadow IT。

　⁠

在这种情况下，由于下游系统仍把操作记录在员工账号下，安全团队可能只看到某位员工访问了 Snowflake 或修改了 GitHub，却不知道实际操作来自员工本人，还是代表他行动的 agent。

　⁠

虽然下游日志不能直接区分员工和 agent，安全团队仍可以从其他信号入手，比如员工突然申请过去很少使用的系统权限、终端上出现新的 agent 程序，或者请求频率和操作速度明显超过人工水平，都可能说明 agent 已经进入企业。确认这些 agent 的存在后，安全团队要先查清它能够读取哪些凭证、已经连接了哪些系统。

　⁠

总的来说，目前 agent identity 行业仍处于早期阶段。企业可以先建立一个安全区，让一部分经过批准的 agent 在有限的工具和资源范围内运行。新的 agent 或工具申请接入时，企业再逐项决定是否开放、能够访问哪些资源，并逐渐扩大范围。

　⁠

　⁠

05.

## Agent Identity 的玩家都从哪里切入？

　⁠

企业开始把 agent 接入内部系统后，很多公司都推出了管理 agent 身份和访问权限的产品。目前行业还没有统一的分类标准。我们认为，按公司的原有业务来看，大致可以分为以下三类：

　⁠

1.大型安全公司，比如 Microsoft、Okta，他们把 agent 当作一种新的身份对象，为它创建独立身份、指定负责人，并沿用企业现有的权限规则控制访问。比如，微软推出了 Microsoft Entra Agent ID，为每个 agent 创建独立身份，并设置负责人和访问权限；Okta for AI Agents 帮助企业发现和登记 agent，管理它们可以使用哪些应用和工具，并在需要时收回权限。

　⁠

2.Anthropic 等模型公司也在自己的 agent 产品中加入身份和访问控制。以 Claude tag 为例，管理员可以决定 Claude 能进入哪些 Slack 频道，以及可以使用哪些工具和代码库。

　⁠

3.Oasis Security、Keycard 等初创公司，我们在下表中列了部分初创公司。

　⁠

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/QUs3kaltEh36H6akWOMUs5ldy74agr8JTlfV4McrTxsvPWRBqgRsO43kicO7y7ynKLmaO3dPmibhWxXWLqyYoCVoknvLcibL4pO4YNMYl1icibqY/640?wx_fmt=png&from=appmsg#imgIndex=6)

　⁠

但它们并不属于完全相同的产品类别。在我们看来，如果按照产品最早解决的问题分类，可以看到两个主要入口：

　⁠

•Agent 生命周期管理：这类产品先找出企业中有哪些 agent、服务账号和长期凭证，确认由谁负责、可以进入哪些系统，再处理权限审查和停用问题。Oasis Security、Clutch Security 和 Token Security 都从非人类身份管理起步，NewCore 则尝试在同一套平台中管理人、机器和 agent。

　⁠

•执行过程中的授权：这类产品在 agent 真正调用工具时判断它能否执行当前操作。比如 Keycard 根据用户的委托、发起请求的运行组件和目标系统签发短期凭证；Arcade.dev 还把工具连接和执行放在同一平台中。

　⁠

但这两类功能并非相互排斥：Oasis Security 后来增加了针对 agent 单次操作的授权，Token Security 也开始根据 agent 的用途调整权限。

　⁠

在这些公司中，Keycard 是口碑较好、比较 agent-native 的初创公司之一：公司从 agent 的实际执行过程出发，将用户委托、agent、任务、运行环境和目标资源共同作为每次授权的依据，这与在既有身份平台上增加一种新身份对象的做法有所不同，集中体现了第二类公司的核心假设：agent 的权限应该随任务变化，是否授权需要在每一次具体执行里判断。

　⁠

今年 3 月，公司还与 Smallstep 宣布产品集成，将 Keycard 对 AI agent 的运行时权限控制，与 Smallstep 基于硬件认证的设备身份能力结合，6 月，Keycard 又成为 Okta Cross App Access（XAA）生态的首批支持厂商之一，让使用 Keycard 的 agent 可以接入 Okta 现有的企业身份和权限体系。

　⁠

　⁠

06.

## Case Study：Keycard

　⁠

### 公司创立

　⁠

Keycard 成立于 2025 年，由 Ian Livingstone、Jared Hanson 和 Matthew Creager 共同创办。

　⁠

•Ian 曾联合创办 Manifold，并担任 CTO，Manifold 在 2021 年被 Snyk 收购。

　⁠

•Matthew 也是 Manifold 联合创始人，曾在 Heroku 负责 Developer Relations，Manifold 被 Snyk 收购后，他加入 Snyk，负责 Product、Platform Engineering 和 Developer Experience。

　⁠

•Jared 是 Node.js 身份验证中间件 Passport.js 的作者，创办 Keycard 前，他先后在 Auth0 和 Okta 从事了十年身份系统建设。

　⁠

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/QUs3kaltEh19ejlxED6SfZ1DbKhEB4ic4HD1NSS6RRL7UDcIibNB5OH7ByPgKAnWcU0EWTtNx9TNR8lCYQRCWkecjSFLyaWXDecWgS2LJGeFk/640?wx_fmt=png&from=appmsg#imgIndex=7)

从左到右：Matthew Creager、Ian Livingstone、Jared Hanson

　⁠

团队最初想解决应用和服务之间的身份问题。在过去二十年，大量应用迁移到云端，开发者往往需要为每项服务申请并保存长期有效的 API key。接入的服务越多，散落在开发者电脑、云环境和应用配置中的凭证也越多，安全团队很难统一管理。因此团队设想的是做一套“面向机器的 SSO”：当一个应用或服务需要访问另一个系统时，可以通过统一的身份系统建立连接，不再为每一组系统预先分发长期密钥。

　⁠

后来，随着越来越多的 agent 开始调用工具、访问系统，并进入真实工作流，Keycard 重新审视了原来的产品方向：agent 往往会先接受人的委托，再由模型在运行过程中选择工具和执行路径，因此，企业除了管理应用之间能否连接，还要知道谁把什么权限交给了哪个 agent，以及 agent 可以在什么条件下使用这些权限。Keycard 的业务方向也由此延伸到 agent 授权。

　⁠

去年 10 月，公司公布了两轮共计 3800 万美元的融资。种子轮由 a16z 和 Boldstart 共同领投，A 轮由 Acrew Capital 领投，个人投资者还包括 Auth0 联合创始人兼前 CTO Matias Woloski、Okta 前 Chief Product Architect Karl McGuinness，以及 Datadog CISO Emilio Escobar。

　⁠

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/QUs3kaltEh2fHwTZCGQOj10fXL24iaoJ8UhqFUBGoN3yY2dXjlArwgQEXt8aJPo00axV6Jl3Wyj10TcTQjfcvlrnOeLRj8icbxnZYtJk69W1c/640?wx_fmt=png&from=appmsg#imgIndex=8)

　⁠

### 产品定位

　⁠

Keycard 将自身描述为一个把 agent 安全连接到其他 agent、工具和 API 的平台，主要提供安全令牌服务（Security Token Service）和授权策略治理（Policy Governance）。

　⁠

企业原有的身份系统继续验证用户，agent runtime 负责调用模型和执行 agent loop。Keycard 接入两者之间的授权环节，结合用户委托、请求来自哪个应用、目标资源和企业 policy，判断是否为当前工具调用签发短期凭证。模型仍然负责选择工具和制订执行路径，MCP Client 则在取得凭证后完成实际调用。

　⁠

Kim Maida 展示的一次 MCP 工具调用，可以更具体地说明 Keycard 如何参与这个过程。

　⁠

•一次 MCP 工具调用如何经过 Keycard？

　⁠

一次工具调用通常从 agent runtime 开始：用户提交任务后，应用调用模型，模型提出工具调用后，MCP Client 请求相应的 MCP Server，再由 MCP Server 访问实际资源或者 API。

　⁠

接入 Keycard 后，用户先通过企业原有的身份提供商（Identity Provider，简称 IdP）登录，并同意 agent 代表自己访问部分资源。身份系统签发代表用户的 token，Keycard 再结合发起请求的应用或运行组件身份，判断是否为当前操作签发新的短期凭证。

　⁠

模型提出工具调用后，OAuth Client 会在 MCP Client 访问 MCP Server 之前，先向 Keycard 申请凭证。Runtime 使用自己的 OAuth 应用凭证或工作负载身份，让 Keycard 确认请求来自哪个应用或运行组件。OAuth Client 同时提交 subject token、目标 MCP Server，以及本次调用申请的 scope。

　⁠

其中，OAuth Client 可以是位于 MCP Client 与第三方 MCP Server 之间的网关，也可以是企业自建应用或包裹在现成 coding agent 外的命令行程序。Keycard 根据这些信息，确认哪个应用或服务正在申请访问、它代表哪位用户、准备访问什么资源，以及申请执行哪项操作。请求符合用户委托和企业 policy 后，Keycard 的安全令牌服务才会为目标 MCP Server 签发 access token。

　⁠

![图片](https://mmbiz.qpic.cn/mmbiz_png/QUs3kaltEh1Gq2165ojW6w4sklvMr9ml0MAADoib34Tr93WPPmLO4dknHp0GhjYmIAYicrpYbOvicZ8wztpeH2zUic5IicJJnssyoQJE3CfhkicHQ/640?wx_fmt=png&from=appmsg#imgIndex=9)

Keycard 如何在每次工具调用前审核权限并签发短期 token

　⁠

需要注意的是，安全令牌服务本身不执行工具调用。MCP Client 取得 token 后，再用它访问 MCP Server。当模型提出下一项调用时，OAuth Client 会根据新的目标资源和 scope 重新申请凭证，Keycard 也会重新判断权限。

　⁠

在访谈演示中，新 token 通常只有几分钟有效，而且只能由当前调用的目标 MCP Server 接收。它所包含的权限也会被限制在本次操作所需的范围内，因此 agent 不会在任务开始时取得目标系统的全部权限。

　⁠

这套流程目前建立在 OAuth 2.0 和 RFC 8693 Token Exchange 之上。Token Exchange 允许申请方提交代表用户的 subject token，并指定目标服务和所需 scope，换取一枚面向下游服务的新 token。它解决的是凭证如何在系统之间交换，不会自行判断某项操作是否符合用户交代的任务；prompt、当前任务和 agent 运行环境等信息，需要由企业决定是否写入授权 policy。

　⁠

Jared 同时提到，AARM 正在尝试为这类系统定义一致性要求，OAuth 社区也在研究相关扩展，AAuth 等新协议仍处于提案阶段。总的来说，面向 agent 的授权规范还没有收敛，因此 Keycard 现阶段继续以现有 OAuth 标准实现这套流程。

　⁠

AARM（Autonomous Action Runtime Management）是一套面向 agent runtime 的开放系统规范，要求安全系统在 agent 执行动作前拦截请求，结合任务 context 和 policy 作出判断，并留下可审计的记录。

　⁠

AAuth（Autonomous Authorization）是一项正在制定中的 agent 授权协议，目的是让 agent 使用可验证的加密身份访问资源，并支持将用户委托和任务信息带入授权过程。

　⁠

### Use Case：接入 Keycard 后，同一批工单如何处理？

　⁠

在前文的演示中，事故管理 agent 使用长期 API key 连续处理五张工单，同一枚云服务凭证既能续签证书，也能重启生产环境和扩大容量。加入 Keycard 后，Kim 保留了相同的 agent、prompt 和工单，只改变了取得权限的方式。

　⁠

•物理设备故障仍被转交给早班团队，但日志现在可以记录 agent 代表哪位操作员、调用了哪个 MCP Server，以及最终把事故写入哪个系统。

　⁠

•TLS 证书也照常续签，不过 agent 只获得“续签证书”所需的 scope，不再拥有可以操作整套云环境的 API key。

　⁠

•处理计费数据库时，企业 policy 禁止 agent 删除数据库，因此系统没有签发相应的凭证。

　⁠

•重启生产环境需要值班人员确认，值班人员点击批准后，系统发现他本人没有重启权限，操作仍被阻止。

　⁠

•扩容同样需要确认，但值班人员具有相应权限，agent 因而取得了这次扩容所需的 token。

　⁠

因此一个 agent 可以得到直接放行、直接拒绝、人工批准后拒绝和人工批准后放行四种结果。但它仍然无法判断数据库备份是否存在，处理事故的能力也没有变化。Keycard 改变的是 agent 取得权限的方式：模型继续制订计划，身份和授权系统则决定每一步可以获得哪些权限。

排版：陈宇聪

![图片](https://mmbiz.qpic.cn/mmbiz_png/QUs3kaltEh0RVkQSX8xrjwfkia2vWXb0hg2c8Ve2icLGsItAFRWqamsicWGW71OWRw49IvPMIXaXuicylOia3ficLWuprHHbFteia246KkTmNUcfwI/640?wx_fmt=png&from=appmsg#imgIndex=10)

延伸阅读

真实工作流，正在成为下一代训练数据

当开源模型逼近闭源，谁会成为 AI 世界的路由器？

深度讨论 Fable 5：模型收入分化，RSI，Tokenmaxxing 减速｜Best Ideas

Modal 的 Infra 复利，从 GPU Cloud 到 Agent Sandbox

Mintlify 做的开发者文档，如何成为 Coding Agent 生产和消费的第一波内容？

Agentic AI 深度研究 · 目录