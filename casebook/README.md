# Casebook · Muse Spaces 真人场景库

独立精选的 Muse Spaces 使用案例册（非 Meta 官方）。

## 设计参照
- [useofmuse.com](https://useofmuse.com/) — 结果标题 + 原声描述 + @作者 · 来源
- A1 Gallery / Land-book — 现代落地页气质（字体、留白、卡片阴影）

## 本站元素
- **品牌**：Casebook（自定义 mark：列表线 + 橙点）
- **字体**：Fraunces（标题）+ Inter（正文）
- **配色**：暖纸色 `#f4efe6` + 炭黑字 + 焦橙强调 `#c45c26`
- **卡片**：缩略图、类目标签、大标题、用户原声、头像/@handle、查看来源、日期

## 本地打开
```bash
cd muse-space-cases
python3 -m http.server 8765
# 浏览器打开 http://127.0.0.1:8765/
```
或直接双击 `index.html`（部分浏览器对 `file://` 下 fetch JSON 有限制，推荐起本地服务）。

## 数据
`cases.json` — 41 条；其中约 13 条带完整原声，9 条带媒体缩略图。
