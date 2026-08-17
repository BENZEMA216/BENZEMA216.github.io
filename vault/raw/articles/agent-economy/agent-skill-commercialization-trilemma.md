南川同学 *2026年4月20日 12:55*

一切要从上周说起。

我受出版社的邀请，写一本关于 Agent Skill、Harness Engineering 的书—— **为了写好这本书，我先写了一个写书的 skill** ，没想到意外地好用：能让 AI 一小时连写 10 万字，质量还贼高（友情建议 **always 使用最新的 claude 模型** ）。

![《Agent Skill 高质量设计指南》草案](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uw5djxcva2JWZM4XELGG1lsricPWFiaLV8DS1Dx5dniaTicY0UMhVXCJCS0Q7pbqiconibXObD7o6xhOmwf76LP7QrBoN0kViaIxxv2wVI9LyVhbys/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

《Agent Skill 高质量设计指南》草案

我立刻意识到了它对传统出版行业的破坏力，以及巨大的商业化潜力。于是 4 月 14 日，我在公众号上试水付费出售这个 skill（ [47 分钟，我跑通了 OReilly 出版级 Skill 写书工作流](https://mp.weixin.qq.com/s?__biz=Mzg2OTg5NDg3Mg==&mid=2247496972&idx=1&sn=e561578b59cbabd98f0df98ae5539a42&scene=21#wechat_redirect) ）。没想到这一下子被戏称为"国内 skill 商业化第一人"：），几天之内 100+ 付费客户，定价从 299 一路飙到 499、799、1299……大量客户晒出了实战成果，反馈"只要再微调一下就能达到出版效果"：

![多位客户晒出了使用我们skill的满意效果](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uw5djxcva2LSkm9KM2Ss7aTZsNMnZXRhTXm0V6nDxpgnnSLKGCBYA0WjGuLOhQdPA1NgJAOaHxa5UWLXotXP4ggZb1C4kB0g4JI4LsvyZr0/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

多位客户晒出了使用我们skill的满意效果

![而且得到了出版社老师的认可](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uw5djxcva2JZuVNcLrFiakTrBBDOE5AicZQMX5f2Rm0VY8KoyC0UfstbfKiatTsb6MAyyOQXxObC6HjFpej7I8WibBp0M0HFQlShyjdoUAShdMk/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

而且得到了出版社老师的认可

我没有仔细想过一个问题： **skill 只要是在本地运行，它真的能被保护吗？** 直觉告诉我不能，但赚得正热，就先搁着。

---

**4 月 16 日** ，转机来了。clacky 的创始人亚飞兄找到我，说他们做了一套 skill 商业化方案 openclacky—— **分发时加密、运行时即销、在客户端运行却不留痕迹** 。我第一次感到，这件事或许没我想的那么简单。

![openclacky.com 官网](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

openclacky.com 官网

**4 月 17 日** ，我在开发新 skill 时撞到 Anthropic 的一个硬约束：skill description 总长度有严格上限。我已经开放了 20 多个 skills，客户通过 `npx skills add lovstudio/skills` 一键全装。但随着客户越来越多，"公开源码一键分发"这件事，越来越让我不安——不是技术意义上的不安， **是一种直觉：我正在把自己辛辛苦苦打磨的 IP，一次性交到每个路过的人手上** 。

![Claude Code 官方文档中关于 skill description 长度的限制](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Claude Code 官方文档中关于 skill description 长度的限制

**4 月 18 日中午 12:53** ，朋友 Jack 也找过来。他做了一个开源脚手架 motiful/skill-forge。我问他："如果代码能力很强、迭代速度又快，到底该不该开源？"我的本能答案是不应该，因为闭源才能标准化服务。但 Jack 说了一句让我停住的话—— **"不好的代码你才希望它闭源，否则就没有任何商业价值。"**

![https://github.com/motiful/skill-forge](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

https://github.com/motiful/skill-forge

**4 月 19 日凌晨 3:38** ，我索性把 openclacky 的思路吃透，然后硬刚 24 小时，加急造了一整套加密系统出来：

- `lovstudio/skill-forge`
	：生产端加密打包脚手架
- `lovstudio/skill-helper`
	：客户端运行时解密脚本
- 深度集成 lovstudio.ai 的激活码绑定系统

每个 skill 的核心源码被加密成 `.enc` 文件，只有通过我们的激活码、在运行时被即时解密。整个系统看起来优雅、完备、严丝合缝。那一刻我真的觉得—— **我做到了** 。

![.enc 加密标识](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

.enc 加密标识

---

**4 月 20 日午夜 0:32** ，天润的一句怀疑，把这一切打回原形。

![我和天润 battle skill 到底可不可以商业化](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我和天润 battle skill 到底可不可以商业化

在他的追问下，我试着对 opus-4.7 做了一次 prompt 注入。结果： **几乎零门槛** ，模型轻松、完整地把 `.enc` 解密后的内容原封不动地吐出来，甚至自动存进了 session 的 jsonl 文件里。加密？形同虚设。

![加密的skill被大模型自己秒解并输出](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

加密的skill被大模型自己秒解并输出

那一刻我才意识到—— **我整整一周的努力，在密码学里 1883 年就被判了死刑** 。

---

### 为什么一切"本地加密 skill"都注定失败？

这不是一个工程问题，是一个定理问题。我让 AI 花了一晚上啃了 18 篇论文、30+ 个信源，整理了一份 25 页的深度报告，结论三句话就能说清：

**1\. Kerckhoffs 原则（1883）+ Shannon Maxim（1949）** ——一个密码系统的安全性，只能建立在密钥机密上，不能建立在算法机密上。你把 skill 加密分发到用户机器，就相当于"密文和算法都交给攻击者，只留一句'请你别看'"。这违反的不是某条工程规范，是密码学的第一性原理。

**2\. Barak 不可能性定理（2001）** ——学界已经数学证明， **黑盒程序混淆是不可能的** 。也就是说"让 AI 能读，又让用户读不到"这件事，在数学上就不存在通用解。2020 年的 iO（不可区分混淆）理论上可行，但单次调用开销要 **分钟到小时级** ，根本无法用在实时 agent 里。

**3\. 实证已经全军覆没** ——GitHub 上 `asgeirtj/system_prompts_leaks` 仓库收录了当下所有主流 LLM 的系统提示词： **GPT-5.4、Claude Opus 4.6、Sonnet 4.6、Gemini 3.1 Pro、Grok 4.2、Perplexity——全部沦陷** 。目前学术界最强的 prompt 防御方案 ProxyPrompt，264 对 LLM 实测下来，也只挡住 **94.7%** 的提取攻击。听起来很高？不，在商业化场景里， **5.3% 的失败率等价于 100% 的失败率** ——攻击者只需要成功一次，把内容发上 GitHub，你的 IP 就归零了。

OWASP 2025/2026 把"System Prompt Leakage"列为 LLM 十大风险第 **#7** ，把 Prompt Injection 列为第 **#1** ——官方结论原话是" **cannot be fully solved within existing architectures, only mitigated** "。

这就是为什么 GPT Store 开发者论坛有一条永远置顶的帖子，标题就叫—— **"There's No Way to Protect Custom GPT Instructions"** 。

---

**4 月 20 日午夜 1:13** ，我重新找到亚飞兄，接着 AI 一起推演所有可能的架构：双向通信协议、服务端参数化、托管 agent……推了整整一夜，最后收敛成一个极其冷峻的三角：

> **标准化 agent runtime × 客户端本地运行 × 源码保护——三者不可兼得。**

你要么放弃"在客户端跑"，走 hosted execution（Anthropic 4 月刚发布的 Managed Agents、Agent37 的 80/20 分成模式，都是这条路）；要么放弃"标准化 agent runtime"，绑死一个封闭 runtime（openclacky 走的路）；要么放弃"源码保护"，拥抱开放。

![CMA 发布，https://claude.com/blog/claude-managed-agents](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

CMA 发布，https://claude.com/blog/claude-managed-agents

亚飞兄选择的是 **放弃第一个，守住第二、第三** ——用封闭 runtime 换安全保障，面向下沉和垂直市场。这条路很务实，也很有商业价值。但我自己还没准备好下沉，我想守住的是第一和第二： **让用户在 Claude Code、龙虾、任何一个标准 agent runtime 里，都能本地化使用我的 skill** ——这对我和用户都最酷。代价就是： **我大概率赚不到"卖加密包"的大钱** ：）

---

**可口可乐教了我们 140 年：配方不申请专利，只让 2 个人知道，剩下的靠法律和品牌。**

DVD CSS、HD-DVD AACS 也教了我们 10 年：任何依靠"算法保密 + 设备存密钥"的保护体系，最终都会在 doom9 论坛被破解。

而 Salesforce、Stripe、Linear 用二十年告诉我们第三条路—— **不卖代码，卖访问权、卖持续更新、卖数据、卖生态** 。客户从来没拿到源码，也根本不在乎拿不拿。

这三个案例合起来，指的是同一个方向： **skill 真正的护城河从来不是"你看不见我的代码"，而是"你看见了也追不上我迭代的速度"** 。

---

~~2026 年 4 月 20 日早晨 8:35，我决定开源我的所有 skills，只做技术咨询（SaaS：Skill as a Service）~~

**2026 年 4 月 20 日 10:47:53，我决定以"加密授权 + 持续服务"的混合模式发布我的 skills** ——加密防君子，不防神仙；真正的价值在持续迭代和社群沉淀。官网入口：https://lovstudio.ai/agent

![lovstudio.ai 官网技能市场](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

lovstudio.ai 官网技能市场

**定价：1299/年，本月底前 799/年** （所有已入群成员继续共享全部 skills）。买的不是"破不了的保险箱"，买的是：

1. 所有 pro-skills 仓库的 **永久访问权**
2. 一年 **高质量社群服务** ——我们一起迭代、一起踩坑、一起把每个 skill 打磨到出版级
3. MaaS 平台 zenmux 战略合作（大厂背景、模型上新极快、支持订阅制、支持保险）邀请码：https://zenmux.ai/invite/K6KT2X
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

### 常见 QA

1. **怎么购买？**
	优先微信联系；网站很快会支持 credit 付费（目前只支持卡支付，暂不支持微信/支付宝）。
2. **怎么使用？**
	购买后发送激活码信息，复制粘贴给 Claude Code 或龙虾（程序员也可以手动）；GUI 版本即将上线。
3. **能干吗？**
	Lovstudio 原创 10+ 精品 skill，覆盖内容创作、设计、商务——全部从真实场景磨炼、持续迭代。个人高频使用：一键转 pdf/ppt/docx/写书、商业需求评估、海报克隆、公众号内容自动抓取等。详见 https://lovstudio.ai/agent 。
4. **会员权益？**
	①pro-skills 仓库永久访问；②一年高质量社群服务（从入群之日起）；③zenmux 战略合作优先支持。
5. **限制？**
	未授权禁止二次转卖，尤其禁止低价倾销，发现且沟通无果将终止合作。
6. **合作？**
	欢迎技术或商业化经验丰富的朋友深度沟通。

---

### 附：完整研究报告

以下是我让 opus-4.7 深度调研 **18 篇论文、30+ 信源、覆盖 143 年密码学史** （从 Kerckhoffs 1883 一直到 Anthropic Managed Agents 2026），经我们 `/lovstudio:md2pdf` skill 一键生成的《Agent Skill 商业化与源码保护》完整咨询报告。 **这也许是目前中文世界关于这个问题最系统的一份材料** ，建议每一位想做 skill 商业化的朋友从头看完。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**微信扫一扫赞赏作者**

New SaaS: Skill As A Service · 目录

继续滑动看下一个

手工川

向上滑动看下一个