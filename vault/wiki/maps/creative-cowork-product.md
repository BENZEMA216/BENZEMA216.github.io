# Creative CoWork 产品全景

> Creative CoWork — "创作者的 Claude Code"，AI 创作工作台

## 产品定位

Creative CoWork 面向 [super-creators](/wiki/concepts/super-creators/)（超创），提供上下文聚合 + Agent + 可定制 Studio 的 AI 创作工作台。

## 核心架构

[Diagram showing: 上下文容器 → Agent (with Skills) → GENUI → Studio]

核心组件：
1. **[context-container](/wiki/concepts/context-container/)** — 项目级上下文聚合
2. **[agent-loop](/wiki/concepts/agent-loop/)** + **[creative-agent-design](/wiki/concepts/creative-agent-design/)** — 创意Agent循环（发散/收敛模式）
3. **[skills-system](/wiki/concepts/skills-system/)** + **[init-mechanism](/wiki/concepts/init-mechanism/)** — 模块化能力加载
4. **[genui](/wiki/concepts/genui/)** — 动态生成界面
5. **[sub-agent-architecture](/wiki/concepts/sub-agent-architecture/)** — 分层Agent委托

## 产品演进

| 阶段 | 文档 | 要点 |
|------|------|------|
| 愿景 | [01 Creative CoWork - DEMO思路](/raw/projects/creative-cowork/01%20Creative%20CoWork%20-%20DEMO%E6%80%9D%E8%B7%AF/) | 核心架构、定位 |
| 深化 | [02 Creative CoWork - 产品深化](/raw/projects/creative-cowork/02%20Creative%20CoWork%20-%20%E4%BA%A7%E5%93%81%E6%B7%B1%E5%8C%96/) | 9个战略问题、用户定义 |
| 技术 | [0201 - 技术研究](/raw/projects/creative-cowork/0201%20-%20%E6%8A%80%E6%9C%AF%E7%A0%94%E7%A9%B6/) | OpenClaw、Agent Skills标准、上下文策略 |
| 机制 | [0205 - init 机制设计](/raw/projects/creative-cowork/0205%20-%20init%20%E6%9C%BA%E5%88%B6%E8%AE%BE%E8%AE%A1/) | /init 三层推荐、进化机制 |
| 需求 | [04 Creative CoWork - MVP需求](/raw/projects/creative-cowork/04%20Creative%20CoWork%20-%20MVP%E9%9C%80%E6%B1%82/) | 完整功能清单（研发核心文档） |
| 设计 | [06 Creative CoWork - 侧边栏设计方案](/raw/projects/creative-cowork/06%20Creative%20CoWork%20-%20%E4%BE%A7%E8%BE%B9%E6%A0%8F%E8%AE%BE%E8%AE%A1%E6%96%B9%E6%A1%88/) | V6绿色主题、Sandbox架构 |

## 技术参考

- [Claude Code 架构分析](/raw/articles/claude-code-research/Claude%20Code%20%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/) — 架构蓝本
- [Agent System Prompt 研究](/raw/articles/claude-code-research/Agent%20System%20Prompt%20%E7%A0%94%E7%A9%B6/) — Agent SP 对标分析
- [Creative CoWork Skills 架构启发](/raw/articles/claude-code-research/Creative%20CoWork%20Skills%20%E6%9E%B6%E6%9E%84%E5%90%AF%E5%8F%91/) — Skills 适配方案

## 设计参考

- [personal-website-design-inspiration-2026-08-04](/raw/articles/genui/personal-website-design-inspiration-2026-08-04/) — 12 个个人网站如何以世界隐喻、内容架构、交互语法、motion / sound 与个人身份形成完整体验，可作为 GenUI design intent 与浏览器验收参考

## 用户验证

- [漫剧访谈 LSW - 总结](/raw/projects/user-interview/%E6%BC%AB%E5%89%A7%E8%AE%BF%E8%B0%88%20LSW%20-%20%E6%80%BB%E7%BB%93/) — 角色一致性、上下文分散
- [漫剧访谈 三界动画 - 总结](/raw/projects/user-interview/%E6%BC%AB%E5%89%A7%E8%AE%BF%E8%B0%88%20%E4%B8%89%E7%95%8C%E5%8A%A8%E7%94%BB%20-%20%E6%80%BB%E7%BB%93/) — 单人全链路、抽卡效率
- [漫剧访谈 艺柏AILab - 总结](/raw/projects/user-interview/%E6%BC%AB%E5%89%A7%E8%AE%BF%E8%B0%88%20%E8%89%BA%E6%9F%8FAILab%20-%20%E6%80%BB%E7%BB%93/) — 剪辑优先、品牌广告
- [漫剧访谈-福州畅读 - 总结](/raw/projects/user-interview/%E6%BC%AB%E5%89%A7%E8%AE%BF%E8%B0%88-%E7%A6%8F%E5%B7%9E%E7%95%85%E8%AF%BB%20-%20%E6%80%BB%E7%BB%93/) — 出海、赛马策略

## 关联

- [user-research-insights](/wiki/maps/user-research-insights/) — 本产品图谱背后的用户研究洞察全景（4 组漫剧团队访谈提炼的共性痛点）
- [user-pain-to-product](/wiki/connections/user-pain-to-product/) — 用户痛点 → 产品特性的逐条映射
- [harness-to-creative](/wiki/connections/harness-to-creative/) — Harness Engineering 设计模式如何迁移到 Creative CoWork

## 里程碑

- **0215**：可试用版本，3-5 个导演朋友能用它完成真实项目

---
*由 LLM 从 raw/ 数据编译，请勿手动编辑*
