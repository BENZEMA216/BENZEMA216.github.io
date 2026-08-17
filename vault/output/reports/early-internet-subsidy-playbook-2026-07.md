<!--
date: 2026-07-01
tags: [internet-history, subsidy, growth, marketplace, network-effects, product-strategy]
status: active
related:
  - "[internet-content-capability-distribution-playbook-2026-06](/output/reports/agora/market-competition/internet-content-capability-distribution-playbook-2026-06/)"
  - "[agent-distribution-atomic-units](/output/reports/agora/market-competition/agent-distribution-atomic-units/)"
  - "[communication-to-economy](/wiki/connections/communication-to-economy/)"
-->

# 早期互联网补贴形式与打法：补贴买的不是用户，而是缺失的市场条件

> Query：早期互联网有哪些补贴形式，有哪些补贴打法，它们的思路和核心目标一般是什么？
> 日期：2026-07-01
> 方法：复用本库互联网分发史报告，补充 PayPal / Dropbox / Amazon Associates / Hotmail / AOL / Taobao / Didi-Kuaidi 等公开案例核验，合成补贴分类与打法框架。

## TL;DR

早期互联网的补贴不只是“烧钱买用户”。更准确的说法是：**平台用钱、免费额度、佣金、流量位、风险兜底等手段，临时购买一个市场尚未自然具备的条件**。这个条件可能是用户习惯、供给密度、双边流动性、支付信任、渠道覆盖、开发者生态，或者竞品退出后的市场集中度。

所以判断一个补贴是否聪明，不看它花了多少钱，而看它是否买到了可沉淀的资产：网络效应、默认入口、交易习惯、供给库存、数据、信任、开发者依赖、支付关系、品牌心智。买不到这些，补贴停了用户就走。

## 一、补贴形式：钱补给谁

| 补贴对象 | 常见形式 | 代表打法 | 本质买的是什么 |
|---|---|---|---|
| 需求侧用户 | 注册奖励、首单红包、免运费、折扣券、免费试用、积分 | PayPal 注册/推荐现金，团购券，打车乘客红包 | 降低第一次尝试成本，制造初始交易量 |
| 供给侧商家/劳动者 | 免佣金、保证收入、订单补贴、广告券、流量扶持、工具免费 | Taobao 对卖家免费，司机/骑手补贴，开发者 0 抽成 | 让供给先进场，填满货架或服务密度 |
| 渠道节点 | CPS/CPA 佣金、联盟返利、站长分成、KOL 返佣 | Amazon Associates、淘宝客、AdSense | 借别人已有流量，把获客风险转成效果付费 |
| 基础设施/互补品 | 免费邮箱、免费上网时长、免费 CDN/DNS/API quota、免费存储 | Hotmail 免费邮箱，AOL 免费试用光盘，Dropbox 推荐送空间，Cloudflare 免费层 | 扩大可触达人群，让用户或开发者形成依赖 |
| 信任/风险 | 退款保障、买家保护、担保交易、假一赔三、免押金 | 电商担保交易，本地生活退款，早期支付风控兜底 | 把“不敢试”的心理风险转移给平台 |

一个关键区分：**现金补贴最短，能力补贴更长**。现金能快速拉新，但最容易吸引羊毛党；免费额度、工具、交易保障、渠道分成更容易沉淀使用习惯、集成关系和生态依赖。

## 二、典型打法：补贴怎么打

### 1. 现金裂变：直接买临界规模

PayPal 早期给新用户和推荐人现金奖励。公开复盘常引用 Peter Thiel 的说法：新用户加入和成功推荐朋友都给钱；第三方增长案例称早期日增长一度达到 7%-10%，总激励支出约 6000 万美元。

这类打法适合金融账户、支付、钱包、社交工具等“账号数本身就是网络价值”的产品。它的目标不是低价成交，而是迅速跨过临界规模，让用户觉得“我身边也有人在用”。

风险是显而易见的：如果账号没有后续交易、余额、商户网络或支付关系沉淀，现金奖励只是买了一堆空账户。

### 2. 双向推荐：让用户把补贴变成分发动作

Dropbox 的经典打法不是返钱，而是给邀请双方存储空间。官方当前 referral 机制仍是 Basic 用户每成功邀请一人双方得 500MB，最高 16GB；增长复盘普遍引用 Drew Houston 的分享：推荐机制使注册量永久提升约 60%，15 个月从 10 万到 400 万用户。

这类打法的关键不是“送东西”，而是送的东西必须和产品核心价值一致。Dropbox 送空间，所以被邀请的人不是冲优惠券来，而是在进入同步文件的使用场景。

### 3. 免费对抗收费：用免费摧毁既有收费模型

Taobao 对 eBay EachNet 的核心打法之一是 C2C 交易免费。eBay 的收费逻辑在成熟市场成立，但在中国早期电商阶段，供给和信任都还稀薄，先收费会压制卖家入场。Taobao 用免费 listings、旺旺沟通、支付宝担保交易组合，优先买供给密度和交易信任。

这种打法的目标是改变竞争维度：不是在同一收费结构下比效率，而是把对手的收入模型变成包袱。缺点是平台必须另找变现层，如广告、增值服务、支付、商家工具。

### 4. 双边市场补贴：先补短边，再补流动性

打车、外卖、本地生活的早期补贴通常同时补两边：用户侧用红包拉需求，供给侧用保底收入和订单奖励拉司机、骑手、商家。滴滴/快的补贴战是典型，Forbes 报道两家公司在 2014 年上半年消耗约 24 亿元人民币补贴；CKGSB 复盘称 2013-2014 年预合并补贴合计约 7 亿美元。

这类打法的真实目标是“流动性”：用户打开 App 能叫到车，司机上线能接到单，商家接入能获得订单。补贴买的是市场厚度，不是单笔 GMV。

关键难点是退出路径：当等待时间、履约密度、供需匹配已经足够好，平台才有资格逐步降低补贴。否则补贴一停，双边同时流失。

### 5. 联盟分销：把补贴从“曝光”改成“结果”

Amazon Associates 1996 年上线，是早期互联网最重要的联盟分销样本之一。它不是补贴终端消费者，而是补贴站长、博客、媒体，让他们用自己的内容和受众给 Amazon 引流，并按成交拿佣金。

这种打法的本质是把广告费变成效果费：平台不预付曝光，只在成交后分成。它适合标品、高毛利、可归因、可在线成交的品类。它也会带来副作用：返利站、SEO 套利、低质内容农场、垃圾邮件和归因作弊。

### 6. 免费试用和免费额度：先让集成发生，再收费

AOL 在拨号上网时代用免费试用光盘和免费上网时长降低入门门槛；后来云服务、开发者 API、CDN、SaaS 普遍采用 free tier / credits。它们共同点是：先让用户或开发者完成一次真实接入，然后在使用量、团队协作、可靠性、安全、企业功能上收费。

这类补贴适合边际成本可控、使用深度会带来迁移成本的产品。免费额度不是慈善，而是在买“安装、集成、默认选择、历史数据、团队工作流”。

### 7. 低价券和团购：把新客曝光包装成一次交易

Groupon 和中国千团大战的逻辑是：平台用大额折扣帮本地商家获新客，消费者为低价预付，平台抽取佣金。它解决的是本地商家没有互联网获客能力的问题。

但这个打法很容易劣化：消费者只为折扣来，商家毛利被打穿，复购不足，平台获客成本越来越高。它说明补贴必须绑定复购机制，否则只是把线下商家的利润转移给一次性薅羊毛用户。

## 三、补贴背后的思路

### 1. 用钱压缩时间

自然增长可能也能达到网络效应，但时间太长。补贴的第一作用是压缩从“没人用”到“看起来大家都在用”的时间。PayPal 买账号密度，滴滴买城市供需密度，Taobao 买卖家库存，AOL 买家庭上网入口。

### 2. 先补最稀缺的一边

双边市场里，补贴不应平均撒。哪一边更稀缺、更决定体验，就先补哪一边。打车早期常常司机供给不足，本地生活常常优质商家不足，开发者平台常常优质插件不足，内容平台常常头部创作者不足。

### 3. 把一次性补贴变成可复利资产

聪明补贴会留下资产：通讯录、支付账户、商户库存、评价体系、地址簿、历史订单、开发者集成、数据模型、默认入口。笨补贴只留下“用户领过一张券”。

### 4. 用补贴改变价格锚点或商业模型

Taobao 免费不是单纯便宜，而是把 C2C 平台从“收 listing fee”改成“先做交易网络，后做广告/服务”。App Store 小企业 15% 或 Shopify 早期 0 抽成政策也是类似思路：短期少收钱，长期做大生态。

### 5. 把固定成本和信任成本平台化

早期互联网用户不敢付钱、不敢装软件、不敢和陌生人交易。退款、担保、支付保护、免费试用，都是平台把用户的信任成本先扛下来。信任建立后，平台才有抽成权。

## 四、核心目标：补贴最终要买到什么

| 目标 | 判断指标 | 说明 |
|---|---|---|
| 冷启动 | 激活用户、首单、首个供给、首个集成 | 让市场从 0 到 1，不再空转 |
| 流动性 | 搜索有结果、叫车有司机、货架有商品、插件有人维护 | 平台体验从“试试看”变成“能依赖” |
| 习惯形成 | 次日/7日/30日留存，复购，默认入口 | 用户因为价值回来，而不是因为还有券 |
| 网络效应 | 邀请率、供需匹配效率、评价积累、生态应用数 | 新用户让旧用户体验变好 |
| 数据与排序 | 更好的匹配、风控、推荐、定价 | 补贴买来的交互数据反过来改善系统 |
| 变现权 | take rate、广告加载、订阅转化、增值服务 attach rate | 补贴结束后平台能收钱且用户不逃 |
| 竞争出清 | 对手退出、合并、供应侧独占、入口固化 | 高风险打法，容易换来监管和恶性内卷 |

最重要的一条：**补贴的终点不是规模，而是无补贴状态下的单位经济成立**。如果补贴停掉后，留存、复购、供给、毛利都掉回原点，那前面的增长只是借来的幻觉。

## 五、可迁移结论

1. 先定义要买的瓶颈，再决定补贴形式。买“尝试”用券，买“供给”用保底/免佣，买“分发”用 CPS，买“集成”用 free tier，买“信任”用担保。
2. 补贴必须绑定一个 activation event，而不是泛泛注册。支付产品看首笔支付，打车看完成订单，开发者平台看首次成功调用，内容平台看首次发布或订阅。
3. 只补贴能沉淀资产的行为。能留下关系链、支付关系、供给库存、评价、数据、集成、工作流的补贴，才有复利。
4. 防羊毛党要从机制设计开始。现金奖励最脆弱，产品内奖励、延迟发放、按留存/成交结算、KYC、风控、分层补贴更稳。
5. 退出机制要在补贴开始前设计。没有从 subsidy CAC 过渡到 organic / referral / retention / monetization 的路径，就不要启动大规模补贴战。
6. 高信任、低频、复杂能力不适合病毒式补贴。越像“能力”而非“内容/优惠”，越应该补验证、安装、服务和结算，而不是补流量。

## 参考来源

- 本库基础报告：[internet-content-capability-distribution-playbook-2026-06](/output/reports/agora/market-competition/internet-content-capability-distribution-playbook-2026-06/)
- PayPal referral：Peter Thiel 在《Zero to One》相关摘录与增长复盘；参见 [Yahoo Finance](https://finance.yahoo.com/news/peter-thiel-explains-why-paypal-204926799.html) 对 $10 注册/推荐机制的转述，以及 [ReferralCandy](https://www.referralcandy.com/blog/paypal-referrals) / [Viral Loops](https://viral-loops.com/blog/paypal-referral-program-case-study/) 对 $60M 与 7%-10% 日增长的整理。
- Dropbox referral：[Dropbox 官方帮助页](https://help.dropbox.com/storage-space/how-much-free-space)说明当前 Basic 用户每次 referral 双方 500MB、最高 16GB；增长复盘见 [ReferralCandy Dropbox case](https://www.referralcandy.com/blog/dropbox-referral-program) 对 Drew Houston 60% 注册提升与 15 个月 10 万到 400 万用户的整理。
- Amazon Associates：[Amazon Seller Central](https://sellercentral.amazon.com/help/hub/reference/external/G28591?locale=en-US)称 Associates 自 1996 年开始，是同类早期联盟计划；[ClickZ](https://clickz.com/history-of-affiliate-marketing/76414/) 与 [Wired 1998 报道](https://www.wired.com/1998/11/the-affiliate-network-lowdown/)记录 affiliate program 的站长佣金逻辑。
- Didi/Kuaidi：[Forbes](https://www.forbes.com/sites/ellenhuet/2015/03/19/kuaidi-didi-merger-uber-in-china/)报道两家公司 2014 年上半年消耗约 24 亿元人民币补贴；[CKGSB](https://english.ckgsb.edu.cn/knowledge/article/uber-didi-merger-ends-a-fierce-rivalry-for-market-share/)复盘称 2013-2014 年预合并补贴合计约 7 亿美元。
- Hotmail / AOL / Taobao：Hotmail 18 个月 1200 万用户见 [Strategy Breakdowns](https://strategybreakdowns.com/p/hotmails-viral-growth-loop)；AOL 免费试用光盘见 [Vox](https://www.vox.com/2015/5/12/8594049/aol-free-trial-cds) / [Mental Floss](https://www.mentalfloss.com/culture/internet/youve-got-mail-history-aols-free-trial-cds)；Taobao 免费对抗 eBay EachNet 见 [Forbes](https://www.forbes.com/sites/helenwang/2010/09/12/how-ebay-failed-in-china/) / [CACM](https://cacm.acm.org/opinion/why-ebay-lost-to-taobao-in-china/)。
