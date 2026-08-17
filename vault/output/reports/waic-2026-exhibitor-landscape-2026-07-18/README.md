# WAIC 2026 参展企业数据包

> 快照日期：2026-07-18
> 官方公开目录记录：1020
> 严格参展企业身份：918
> 官方公开展品：1394 行，按 productCode 去重后 1389 件

## 文件

- `exhibitors.csv`：一企一行的完整可筛选目录。
- `exhibitors-normalized.json`：保留多展位、多 Logo 等数组结构。
- `booths.csv`：一展位一行，用于现场路线和展馆分析。
- `products.csv`：一件公开展品一行，含企业、展位、行业、首发标记、描述、WAIC 媒体和已核验产品链接。
- `products-normalized.json`：去重后的完整展品数组、重复行审计、链接类型与媒体兜底。
- `verified-product-links.json`：结合 Combo 优先级人工核验的 17 条重点产品入口与证据。
- `priority-product-links.csv`：重点产品链接的可筛选表；明确区分官方产品页、WAIC 媒体和企业官网。
- `supplemental-participants.csv/json`：官网企业目录外，由展品 API、WAIC 官方资产及区政府/园区发布补充的 67 条参展单位或品牌线索。
- `metrics.json`：覆盖率、行业、服务领域、合作伙伴、展馆和数据质量统计。
- `build-waic-2026-exhibitors.mjs`：官方 API 抓取、校验、归一化与工作簿生成脚本。

## 口径

官方页面默认目录同时收录展商与论坛主办方。本数据包用 `roleCode` 识别 918 条展商记录；合并两个明显重复名称对后为 916 家。再纳入官网目录外的 67 条官方或政府/园区来源线索，当前多源可确认口径为 983 个参展单位或品牌。上海市政府发布会的总体口径是 1,100 余家企业、3,000 余项展品，因此仍不能声称覆盖全部线下主体或展品。

WAIC 官网展品采用目录页弹窗，没有稳定单品永久链接。产品链接列优先使用已核验的外部官方入口；其余展品保留 WAIC 官方视频或图片作为产品级材料，不把通用 POST API 或猜测域名伪装成产品页。

## 来源

- https://www.worldaic.com.cn/exhibitors
- https://servicer.worldaic.com.cn/waic/show/info/page
- https://servicer.worldaic.com.cn/waic/show/product/published-page
- https://www.shanghai.gov.cn/nw12344/20260707/deee99228f02433e9b0fb8f9447e8b34.html
