import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const artifactToolModulePath = require.resolve("@oai/artifact-tool");
const { SpreadsheetFile, Workbook } = await import(artifactToolModulePath);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const snapshotDate = "2026-07-18";
const officialDirectoryUrl = "https://www.worldaic.com.cn/exhibitors";
const apiUrl = "https://servicer.worldaic.com.cn/waic/show/info/page";
const productApiUrl =
  "https://servicer.worldaic.com.cn/waic/show/product/published-page";
const productIndustryApiUrl =
  "https://servicer.worldaic.com.cn/waic/show/product/published-industry-list";
const governmentBriefingUrl =
  "https://www.shanghai.gov.cn/nw12344/20260707/deee99228f02433e9b0fb8f9447e8b34.html";
const rawDir = path.join(repoRoot, "raw/articles/waic-2026");
const rawSnapshotPath = path.join(
  rawDir,
  "official-exhibitors-api-snapshot-2026-07-18.json",
);
const rawProductSnapshotPath = path.join(
  rawDir,
  "official-products-api-snapshot-2026-07-18.json",
);
const normalizedJsonPath = path.join(scriptDir, "exhibitors-normalized.json");
const enterpriseCsvPath = path.join(scriptDir, "exhibitors.csv");
const boothCsvPath = path.join(scriptDir, "booths.csv");
const normalizedProductJsonPath = path.join(scriptDir, "products-normalized.json");
const productCsvPath = path.join(scriptDir, "products.csv");
const verifiedProductLinksPath = path.join(scriptDir, "verified-product-links.json");
const priorityProductLinksCsvPath = path.join(scriptDir, "priority-product-links.csv");
const supplementalJsonPath = path.join(scriptDir, "supplemental-participants.json");
const supplementalCsvPath = path.join(scriptDir, "supplemental-participants.csv");
const metricsPath = path.join(scriptDir, "metrics.json");
const readmePath = path.join(scriptDir, "README.md");
const workbookOutputDir = path.join(repoRoot, "outputs/waic-2026-20260718");
const workbookPath = path.join(
  workbookOutputDir,
  "WAIC-2026参展企业全量资料.xlsx",
);

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchPage(pageNo, pageSize = 100) {
  const requestBody = { pageNo, pageSize, exhibitionYear: 2026 };
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "zh-CN",
          Origin: "https://www.worldaic.com.cn",
          Referer: officialDirectoryUrl,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for page ${pageNo}`);
      }
      const payload = await response.json();
      if (payload.code !== 0 || !payload.data || !Array.isArray(payload.data.list)) {
        throw new Error(
          `Unexpected API payload for page ${pageNo}: ${JSON.stringify(payload).slice(0, 240)}`,
        );
      }
      return { pageNo, requestBody, response: payload };
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await sleep(attempt * 750);
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
}

async function loadOrFetchRawSnapshot() {
  try {
    const existing = await fs.readFile(rawSnapshotPath, "utf8");
    return JSON.parse(existing);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const firstPage = await fetchPage(1);
  const reportedTotal = firstPage.response.data.total;
  const pageSize = firstPage.requestBody.pageSize;
  const pageCount = Math.ceil(reportedTotal / pageSize);
  const remainingPages = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) => fetchPage(index + 2, pageSize)),
  );
  const pages = [firstPage, ...remainingPages].sort((a, b) => a.pageNo - b.pageNo);
  const snapshot = {
    metadata: {
      title: "WAIC 2026 官方公开展商目录 API 快照",
      retrievedAtUtc: new Date().toISOString(),
      snapshotDate,
      officialDirectoryUrl,
      apiUrl,
      requestMethod: "POST",
      requestHeaders: {
        "Content-Type": "application/json",
        "Accept-Language": "zh-CN",
        Origin: "https://www.worldaic.com.cn",
        Referer: officialDirectoryUrl,
      },
      requestTemplate: {
        pageNo: "1..N",
        pageSize,
        exhibitionYear: 2026,
      },
      reportedTotal,
      pageCount,
      note: "raw/ 为不可变外部来源层；本文件保留每页官方 API 原始响应及请求参数。",
    },
    pages,
  };

  await fs.mkdir(rawDir, { recursive: true });
  await fs.writeFile(rawSnapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  return snapshot;
}

async function fetchProductPage(pageNo, pageSize = 100) {
  const requestBody = { pageNo, pageSize };
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch(productApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "zh-CN",
          Origin: "https://www.worldaic.com.cn",
          Referer: officialDirectoryUrl,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for product page ${pageNo}`);
      }
      const payload = await response.json();
      if (payload.code !== 0 || !payload.data || !Array.isArray(payload.data.list)) {
        throw new Error(
          `Unexpected product payload for page ${pageNo}: ${JSON.stringify(payload).slice(0, 240)}`,
        );
      }
      return { pageNo, requestBody, response: payload };
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await sleep(attempt * 750);
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
}

async function fetchProductIndustryDictionary() {
  const response = await fetch(productIndustryApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "zh-CN",
      Origin: "https://www.worldaic.com.cn",
      Referer: officialDirectoryUrl,
    },
    body: "{}",
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for product industry dictionary`);
  }
  const payload = await response.json();
  if (payload.code !== 0 || !Array.isArray(payload.data)) {
    throw new Error(`Unexpected product industry payload: ${JSON.stringify(payload).slice(0, 240)}`);
  }
  return payload;
}

async function loadOrFetchRawProductSnapshot() {
  try {
    const existing = await fs.readFile(rawProductSnapshotPath, "utf8");
    return JSON.parse(existing);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const firstPage = await fetchProductPage(1);
  const reportedTotal = firstPage.response.data.total;
  const pageSize = firstPage.requestBody.pageSize;
  const pageCount = Math.ceil(reportedTotal / pageSize);
  const remainingPages = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) =>
      fetchProductPage(index + 2, pageSize),
    ),
  );
  const pages = [firstPage, ...remainingPages].sort((a, b) => a.pageNo - b.pageNo);
  const rawRows = pages.flatMap((page) => page.response.data.list);
  const productCodeCounts = new Map();
  for (const row of rawRows) {
    productCodeCounts.set(row.productCode, (productCodeCounts.get(row.productCode) ?? 0) + 1);
  }
  const duplicateProductCodes = Object.fromEntries(
    [...productCodeCounts.entries()].filter(([, count]) => count > 1),
  );
  const industryDictionary = await fetchProductIndustryDictionary();
  const snapshot = {
    metadata: {
      title: "WAIC 2026 官方公开展品目录 API 快照",
      retrievedAtUtc: new Date().toISOString(),
      snapshotDate,
      officialDirectoryUrl,
      productApiUrl,
      productIndustryApiUrl,
      requestMethod: "POST",
      requestTemplate: { pageNo: "1..N", pageSize },
      reportedTotal,
      downloadedRows: rawRows.length,
      uniqueProductCodes: productCodeCounts.size,
      duplicateProductCodes,
      pageCount,
      note: "官方 total 统计分页行数；本快照存在 5 个完全重复 productCode，归一化层按 productCode 去重。",
    },
    industryDictionary,
    pages,
  };

  await fs.mkdir(rawDir, { recursive: true });
  await fs.writeFile(
    rawProductSnapshotPath,
    `${JSON.stringify(snapshot, null, 2)}\n`,
    "utf8",
  );
  return snapshot;
}

const splitCommaValues = (value) =>
  String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const unique = (values) => [...new Set(values.filter(Boolean))];

const containsRole = (record, roleCode) =>
  splitCommaValues(record.roleCode).includes(roleCode);

function scopeLabel(record) {
  if (containsRole(record, "WAIC_EXHIBITOR_ACCOUNT_DEFAULT")) {
    return "参展企业";
  }
  if (containsRole(record, "WAIC_FORUM_ACCOUNT_DEFAULT")) {
    return "论坛主办方（非展商）";
  }
  return "身份未标注";
}

function normalizeRecord(record, index) {
  const booths = (record.booths ?? []).map((booth) => ({
    boothNumber: booth.boothNumber ?? "",
    boothLocationCode: booth.boothLocationCode ?? "",
    boothLocationName: booth.boothLocationName ?? "",
    boothLocationNameEn: booth.boothLocationNameEn ?? "",
    boothVenueCode: booth.boothVenueCode ?? "",
    boothVenueName: booth.boothVenueName ?? "",
    boothVenueNameEn: booth.boothVenueNameEn ?? "",
  }));
  return {
    index: index + 1,
    inclusionScope: scopeLabel(record),
    enterpriseCode: record.enterpriseCode ?? "",
    enterpriseName: record.enterpriseName ?? "",
    enterpriseNameEn: record.enterpriseNameEn ?? "",
    roleCode: record.roleCode ?? "",
    roleName: record.roleName ?? "",
    partnerLevelCode: record.partnerLevelCode ?? "",
    partnerLevelName: record.partnerLevelName ?? "",
    partnerLevelNameEn: record.partnerLevelNameEn ?? "",
    businessScopeCode: record.businessScopeCode ?? "",
    businessScope: record.businessScope ?? "",
    businessScopeEn: record.businessScopeEn ?? "",
    industryLevelOneCode: record.industryLevelOneCode ?? "",
    industryLevelOneName: record.industryLevelOneName ?? "",
    industryLevelOneNameEn: record.industryLevelOneNameEn ?? "",
    enterpriseIntroductionCn: record.enterpriseIntroductionCn ?? "",
    enterpriseIntroductionEn: record.enterpriseIntroductionEn ?? "",
    logoUrls: (record.enterpriseLogos ?? [])
      .map((logo) => logo.attachmentPath)
      .filter(Boolean),
    exhibitionId: record.exhibitionId ?? null,
    exhibitionYear: record.exhibitionYear ?? null,
    exhibitionSession: record.exhibitionSession ?? null,
    booths,
    boothNumbers: unique(booths.map((booth) => booth.boothNumber)),
    boothVenues: unique(booths.map((booth) => booth.boothVenueName)),
    boothLocations: unique(booths.map((booth) => booth.boothLocationName)),
    officialDirectoryUrl,
    apiUrl,
    snapshotDate,
  };
}

function normalizeProducts(rawRows, enterpriseCodeSet, verifiedProductLinkMap) {
  const seen = new Set();
  const products = [];
  const duplicateRows = [];

  for (const row of rawRows) {
    if (seen.has(row.productCode)) {
      duplicateRows.push(row);
      continue;
    }
    seen.add(row.productCode);
    const industries = (row.industries ?? []).map((industry) => ({
      code: industry.industryPrimaryCode ?? "",
      name: industry.industryPrimaryName ?? "",
      nameEn: industry.industryPrimaryNameEn ?? "",
    }));
    const verifiedLink = verifiedProductLinkMap.get(row.productCode) ?? null;
    const productImageUrl = row.productImageFilePath ?? "";
    const productVideoUrl = row.productVideoFilePath ?? "";
    const resolvedProductUrl =
      verifiedLink?.officialProductUrl || productVideoUrl || productImageUrl;
    const resolvedProductUrlType = verifiedLink?.officialProductUrl
      ? verifiedLink.officialProductUrlType
      : productVideoUrl
        ? "WAIC 官方展品视频"
        : productImageUrl
          ? "WAIC 官方展品图片"
          : "";
    products.push({
      index: products.length + 1,
      productCode: row.productCode ?? "",
      productName: row.productName ?? "",
      productNameEn: row.productNameEn ?? "",
      enterpriseCode: row.enterpriseCode ?? "",
      enterpriseName: row.enterpriseName ?? "",
      enterpriseNameEn: row.enterpriseNameEn ?? "",
      enterpriseLogoUrl: row.enterpriseLogoPath ?? "",
      industries,
      industryCodes: unique(industries.map((industry) => industry.code)),
      industryNames: unique(industries.map((industry) => industry.name)),
      boothCode: row.boothCode ?? "",
      boothNumber: row.boothNumber ?? "",
      domesticStatusName: row.domesticStatusName ?? "",
      domesticStatusNameEn: row.domesticStatusNameEn ?? "",
      globalStatusName: row.globalStatusName ?? "",
      globalStatusNameEn: row.globalStatusNameEn ?? "",
      isNewProduct: Boolean(row.isNewProduct),
      isBrochureApproved: Boolean(row.isBrochureApproved),
      isBrochureParticipant: Boolean(row.isBrochureParticipant),
      isShowInBulletin: Boolean(row.isShowInBulletin),
      productDescriptionCn: row.productDescriptionCn ?? "",
      productDescriptionEn: row.productDescriptionEn ?? "",
      productImageUrl,
      productVideoUrl,
      enterpriseDirectoryMatch: enterpriseCodeSet.has(row.enterpriseCode)
        ? "已匹配企业目录"
        : "未匹配企业目录",
      productApiUrl,
      waicCatalogUrl: officialDirectoryUrl,
      waicProductPermalinkUrl: "",
      waicLinkStatus: "仅目录弹窗，无单品永久链接",
      officialProductUrl: verifiedLink?.officialProductUrl ?? "",
      officialProductUrlType: verifiedLink?.officialProductUrlType ?? "",
      officialProductLinkStatus:
        verifiedLink?.verificationStatus ??
        (resolvedProductUrl ? "WAIC 官方媒体可用；外部产品页未逐一核验" : "未提供可用链接"),
      officialProductUrlSource: verifiedLink?.evidenceSourceUrl ?? "",
      resolvedProductUrl,
      resolvedProductUrlType,
      productLinkVerifiedAt: verifiedLink?.verifiedAt ?? (resolvedProductUrl ? snapshotDate : ""),
      snapshotDate,
    });
  }

  return { products, duplicateRows };
}

function enrichPriorityProductLinks(records, products) {
  const productsByCode = new Map(
    products.filter((product) => product.productCode).map((product) => [product.productCode, product]),
  );

  return records.map((record) => {
    const waicProduct = productsByCode.get(record.productCode) ?? null;
    const finalUrl =
      record.officialProductUrl ||
      waicProduct?.productVideoUrl ||
      waicProduct?.productImageUrl ||
      record.secondaryOfficialUrl ||
      "";
    const finalUrlType = record.officialProductUrl
      ? record.officialProductUrlType
      : waicProduct?.productVideoUrl
        ? "WAIC 官方展品视频"
        : waicProduct?.productImageUrl
          ? "WAIC 官方展品图片"
          : record.secondaryOfficialUrl
            ? record.secondaryUrlType
            : "";

    return {
      ...record,
      waicProductImageUrl: waicProduct?.productImageUrl ?? "",
      waicProductVideoUrl: waicProduct?.productVideoUrl ?? "",
      waicProductDirectoryMatch: waicProduct ? "已匹配 WAIC 展品 API" : "未出现在公开展品 API",
      finalUrl,
      finalUrlType,
    };
  });
}

function countValues(records, selector, { split = false } = {}) {
  const counts = new Map();
  for (const record of records) {
    const rawValue = selector(record);
    const values = split ? splitCommaValues(rawValue) : [String(rawValue ?? "").trim()];
    const populatedValues = values.length > 0 ? values : ["未标注"];
    for (const value of populatedValues) {
      const key = value || "未标注";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return Object.fromEntries(
    [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN")),
  );
}

function buildMetrics(records, reportedTotal, products, rawProductTotal, duplicateProductRows) {
  const exhibitorRecords = records.filter(
    (record) => record.inclusionScope === "参展企业",
  );
  const boothAssignments = records.flatMap((record) => record.booths);
  const exhibitorBoothAssignments = exhibitorRecords.flatMap((record) => record.booths);
  const nonBlankNames = records
    .map((record) => record.enterpriseName.trim())
    .filter(Boolean);
  const nameCounts = countValues(
    records.filter((record) => record.enterpriseName.trim()),
    (record) => record.enterpriseName,
  );
  const duplicateNonBlankNames = Object.fromEntries(
    Object.entries(nameCounts).filter(([, count]) => count > 1),
  );

  return {
    snapshotDate,
    sources: {
      officialDirectoryUrl,
      apiUrl,
      productApiUrl,
      productIndustryApiUrl,
      governmentBriefingUrl,
    },
    totals: {
      apiReportedDirectoryRecords: reportedTotal,
      downloadedDirectoryRecords: records.length,
      exhibitorRoleRecords: exhibitorRecords.length,
      forumOrganizerOnlyRecords: records.filter(
        (record) => record.inclusionScope === "论坛主办方（非展商）",
      ).length,
      unclassifiedRoleRecords: records.filter(
        (record) => record.inclusionScope === "身份未标注",
      ).length,
      namedRecords: nonBlankNames.length,
      blankNameRecords: records.length - nonBlankNames.length,
      uniqueEnterpriseCodes: new Set(records.map((record) => record.enterpriseCode)).size,
      uniqueNonBlankNames: new Set(nonBlankNames).size,
      duplicateNonBlankNames,
      boothAssignments: boothAssignments.length,
      recordsWithBooths: records.filter((record) => record.booths.length > 0).length,
      recordsWithoutBooths: records.filter((record) => record.booths.length === 0).length,
      multiBoothRecords: records.filter((record) => record.booths.length > 1).length,
    },
    products: {
      apiReportedRows: rawProductTotal,
      normalizedUniqueProducts: products.length,
      exactDuplicateRowsRemoved: duplicateProductRows.length,
      uniqueEnterpriseCodes: new Set(
        products.map((product) => product.enterpriseCode).filter(Boolean),
      ).size,
      matchedEnterpriseCodes: new Set(
        products
          .filter((product) => product.enterpriseDirectoryMatch === "已匹配企业目录")
          .map((product) => product.enterpriseCode),
      ).size,
      unmatchedEnterpriseCodes: unique(
        products
          .filter((product) => product.enterpriseDirectoryMatch === "未匹配企业目录")
          .map((product) => product.enterpriseCode),
      ),
      withChineseName: products.filter((product) => product.productName.trim()).length,
      withChineseDescription: products.filter((product) =>
        product.productDescriptionCn.trim(),
      ).length,
      withBoothNumber: products.filter((product) => product.boothNumber.trim()).length,
      withProductImage: products.filter((product) => product.productImageUrl.trim()).length,
      withProductVideo: products.filter((product) => product.productVideoUrl.trim()).length,
      withVerifiedExternalProductUrl: products.filter((product) =>
        product.officialProductUrl.trim(),
      ).length,
      withResolvedProductUrl: products.filter((product) =>
        product.resolvedProductUrl.trim(),
      ).length,
      markedNewProduct: products.filter((product) => product.isNewProduct).length,
      markedGlobalLaunch: products.filter((product) => product.globalStatusName.trim())
        .length,
      markedDomesticLaunch: products.filter((product) => product.domesticStatusName.trim())
        .length,
      industryTags: countValues(products, (product) => product.industryNames.join(","), {
        split: true,
      }),
    },
    fieldCoverage: {
      chineseName: records.filter((record) => record.enterpriseName.trim()).length,
      englishName: records.filter((record) => record.enterpriseNameEn.trim()).length,
      chineseIntroduction: records.filter((record) =>
        record.enterpriseIntroductionCn.trim(),
      ).length,
      englishIntroduction: records.filter((record) =>
        record.enterpriseIntroductionEn.trim(),
      ).length,
      logo: records.filter((record) => record.logoUrls.length > 0).length,
      booth: records.filter((record) => record.booths.length > 0).length,
      industryLevelOne: records.filter((record) =>
        record.industryLevelOneName.trim(),
      ).length,
      businessScope: records.filter((record) => record.businessScope.trim()).length,
      partnerLevel: records.filter((record) => record.partnerLevelName.trim()).length,
      role: records.filter((record) => record.roleName.trim()).length,
    },
    distributions: {
      rolesAllDirectory: countValues(records, (record) => record.roleName),
      partnerLevelsAllDirectory: countValues(records, (record) => record.partnerLevelName),
      partnerLevelsExhibitors: countValues(
        exhibitorRecords,
        (record) => record.partnerLevelName,
      ),
      industryTagsAllDirectory: countValues(
        records,
        (record) => record.industryLevelOneName,
        { split: true },
      ),
      industryTagsExhibitors: countValues(
        exhibitorRecords,
        (record) => record.industryLevelOneName,
        { split: true },
      ),
      businessScopeTagsAllDirectory: countValues(
        records,
        (record) => record.businessScope,
        { split: true },
      ),
      businessScopeTagsExhibitors: countValues(
        exhibitorRecords,
        (record) => record.businessScope,
        { split: true },
      ),
      venueAssignments: countValues(
        boothAssignments,
        (booth) => booth.boothVenueName,
      ),
      venueAssignmentsExhibitors: countValues(
        exhibitorBoothAssignments,
        (booth) => booth.boothVenueName,
      ),
      hallAssignments: countValues(
        boothAssignments,
        (booth) => booth.boothLocationName,
      ),
    },
  };
}

function validateSnapshot(rawSnapshot, records, rawProductSnapshot, products, metrics) {
  const expectedTotal = rawSnapshot.metadata.reportedTotal;
  if (records.length !== expectedTotal) {
    throw new Error(
      `Record count mismatch: expected ${expectedTotal}, received ${records.length}`,
    );
  }
  if (metrics.totals.uniqueEnterpriseCodes !== records.length) {
    throw new Error(
      `Enterprise-code uniqueness failed: ${metrics.totals.uniqueEnterpriseCodes} unique codes for ${records.length} records`,
    );
  }
  const pageNumbers = rawSnapshot.pages.map((page) => page.pageNo);
  const expectedPageNumbers = Array.from(
    { length: rawSnapshot.metadata.pageCount },
    (_, index) => index + 1,
  );
  if (JSON.stringify(pageNumbers) !== JSON.stringify(expectedPageNumbers)) {
    throw new Error(`Page sequence mismatch: ${JSON.stringify(pageNumbers)}`);
  }
  const rawProductRows = rawProductSnapshot.pages.flatMap(
    (page) => page.response.data.list,
  );
  if (rawProductRows.length !== rawProductSnapshot.metadata.reportedTotal) {
    throw new Error(
      `Product row count mismatch: expected ${rawProductSnapshot.metadata.reportedTotal}, received ${rawProductRows.length}`,
    );
  }
  if (products.length !== rawProductSnapshot.metadata.uniqueProductCodes) {
    throw new Error(
      `Unique product count mismatch: expected ${rawProductSnapshot.metadata.uniqueProductCodes}, received ${products.length}`,
    );
  }
  if (metrics.products.apiReportedRows !== rawProductRows.length) {
    throw new Error("Product metrics do not reconcile to the raw snapshot");
  }
}

const csvEscape = (value) => {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const sanitizeWorkbookValue = (value) => {
  if (typeof value !== "string") {
    return value;
  }
  return value
    .toWellFormed()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "");
};

const sanitizeWorkbookRow = (row) => row.map(sanitizeWorkbookValue);

function toCsv(headers, rows) {
  return `${[headers, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n")}\n`;
}

function buildEnterpriseCsv(records) {
  const headers = [
    "序号",
    "纳入口径",
    "企业代码",
    "企业中文名",
    "企业英文名",
    "身份",
    "身份代码",
    "合作伙伴等级",
    "合作伙伴代码",
    "服务领域",
    "服务领域代码",
    "行业一级分类",
    "行业一级代码",
    "展位号",
    "展馆",
    "展厅或区域",
    "展位数量",
    "企业中文简介",
    "企业英文简介",
    "Logo URL",
    "展览年份",
    "官方目录 URL",
    "官方 API URL",
    "快照日期",
  ];
  const rows = records.map((record) => [
    record.index,
    record.inclusionScope,
    record.enterpriseCode,
    record.enterpriseName,
    record.enterpriseNameEn,
    record.roleName,
    record.roleCode,
    record.partnerLevelName,
    record.partnerLevelCode,
    record.businessScope,
    record.businessScopeCode,
    record.industryLevelOneName,
    record.industryLevelOneCode,
    record.boothNumbers.join(" | "),
    record.boothVenues.join(" | "),
    record.boothLocations.join(" | "),
    record.booths.length,
    record.enterpriseIntroductionCn,
    record.enterpriseIntroductionEn,
    record.logoUrls.join(" | "),
    record.exhibitionYear,
    officialDirectoryUrl,
    apiUrl,
    snapshotDate,
  ]);
  return toCsv(headers, rows);
}

function buildBoothRows(records) {
  const rows = [];
  for (const record of records) {
    for (const booth of record.booths) {
      rows.push([
        rows.length + 1,
        record.inclusionScope,
        record.enterpriseCode,
        record.enterpriseName,
        record.enterpriseNameEn,
        record.roleName,
        record.partnerLevelName,
        record.industryLevelOneName,
        booth.boothNumber,
        booth.boothVenueName,
        booth.boothLocationName,
        booth.boothVenueCode,
        booth.boothLocationCode,
        officialDirectoryUrl,
        snapshotDate,
      ]);
    }
  }
  return rows;
}

function buildBoothCsv(records) {
  const headers = [
    "序号",
    "纳入口径",
    "企业代码",
    "企业中文名",
    "企业英文名",
    "身份",
    "合作伙伴等级",
    "行业一级分类",
    "展位号",
    "展馆",
    "展厅或区域",
    "展馆代码",
    "展厅或区域代码",
    "官方目录 URL",
    "快照日期",
  ];
  return toCsv(headers, buildBoothRows(records));
}

function buildProductCsv(products) {
  const headers = [
    "序号",
    "产品代码",
    "企业代码",
    "企业目录匹配",
    "企业中文名",
    "企业英文名",
    "产品中文名",
    "产品英文名",
    "行业分类",
    "行业代码",
    "展位号",
    "是否新品",
    "国内首发状态",
    "全球首发状态",
    "产品中文描述",
    "产品英文描述",
    "产品图片 URL",
    "产品视频 URL",
    "企业 Logo URL",
    "官方产品 API URL",
    "快照日期",
    "WAIC 单品永久链接",
    "WAIC 链接状态",
    "产品官方 URL",
    "产品链接类型",
    "链接验证状态",
    "最终可用 URL",
    "最终链接类型",
    "链接核验日期",
  ];
  const rows = products.map((product) => [
    product.index,
    product.productCode,
    product.enterpriseCode,
    product.enterpriseDirectoryMatch,
    product.enterpriseName,
    product.enterpriseNameEn,
    product.productName,
    product.productNameEn,
    product.industryNames.join(" | "),
    product.industryCodes.join(" | "),
    product.boothNumber,
    product.isNewProduct ? "是" : "否",
    product.domesticStatusName,
    product.globalStatusName,
    product.productDescriptionCn,
    product.productDescriptionEn,
    product.productImageUrl,
    product.productVideoUrl,
    product.enterpriseLogoUrl,
    productApiUrl,
    snapshotDate,
    product.waicProductPermalinkUrl,
    product.waicLinkStatus,
    product.officialProductUrl,
    product.officialProductUrlType,
    product.officialProductLinkStatus,
    product.resolvedProductUrl,
    product.resolvedProductUrlType,
    product.productLinkVerifiedAt,
  ]);
  return toCsv(headers, rows);
}

function buildPriorityProductLinksCsv(records) {
  const headers = [
    "优先级",
    "参展企业",
    "产品或平台",
    "企业代码",
    "产品代码",
    "展位",
    "Combo 关注角色",
    "产品官方 URL",
    "链接类型",
    "备用官方 URL",
    "备用链接类型",
    "核验状态",
    "最终可用 URL",
    "最终链接类型",
    "WAIC 展品图片 URL",
    "WAIC 展品视频 URL",
    "WAIC 展品 API 匹配",
    "核验日期",
    "说明",
  ];
  const rows = records.map((record) => [
    record.priority,
    record.enterpriseName,
    record.productName,
    record.enterpriseCode,
    record.productCode,
    record.boothNumber,
    record.comboRole,
    record.officialProductUrl,
    record.officialProductUrlType,
    record.secondaryOfficialUrl,
    record.secondaryUrlType,
    record.verificationStatus,
    record.finalUrl,
    record.finalUrlType,
    record.waicProductImageUrl,
    record.waicProductVideoUrl,
    record.waicProductDirectoryMatch,
    record.verifiedAt,
    record.note,
  ]);
  return toCsv(headers, rows);
}

function buildSupplementalCsv(records) {
  const headers = [
    "序号",
    "来源展示名",
    "展位",
    "证据等级",
    "来源类型",
    "参展上下文",
    "实体归一状态",
    "目录状态",
    "来源 URL",
    "备注",
    "快照日期",
  ];
  const rows = records.map((record, index) => [
    index + 1,
    record.name,
    record.booth,
    record.evidenceLayer,
    record.sourceType,
    record.context,
    record.entityResolution,
    record.directoryStatus,
    record.sourceUrl,
    record.note,
    snapshotDate,
  ]);
  return toCsv(headers, rows);
}

function styleTitle(sheet, rangeAddress, text) {
  const range = sheet.getRange(rangeAddress);
  range.merge();
  range.values = [[text]];
  range.format = {
    fill: "#0B1020",
    font: { bold: true, color: "#FFFFFF", size: 20 },
    verticalAlignment: "center",
    horizontalAlignment: "left",
  };
  range.format.rowHeight = 34;
}

function styleSectionHeader(range) {
  range.format = {
    fill: "#DDF6FB",
    font: { bold: true, color: "#0B4454" },
    borders: { preset: "bottom", style: "medium", color: "#18A8C8" },
  };
}

function styleTableHeader(range) {
  range.format = {
    fill: "#17324D",
    font: { bold: true, color: "#FFFFFF" },
    verticalAlignment: "center",
    horizontalAlignment: "left",
    wrapText: true,
    borders: { preset: "bottom", style: "medium", color: "#18C4E8" },
  };
  range.format.rowHeight = 30;
}

function writeKpi(sheet, labelCell, valueCell, label, formula, numberFormat = "#,##0") {
  const labelRange = sheet.getRange(labelCell);
  const valueRange = sheet.getRange(valueCell);
  labelRange.merge();
  valueRange.merge();
  labelRange.values = [[label]];
  labelRange.format = {
    fill: "#EAF7FB",
    font: { bold: true, color: "#30566B" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
  };
  if (typeof formula === "number") {
    valueRange.values = [[formula]];
  } else {
    valueRange.formulas = [[formula]];
  }
  valueRange.format = {
    fill: "#FFFFFF",
    font: { bold: true, color: "#0B1020", size: 18 },
    numberFormat,
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: "#B8D9E2" },
  };
  labelRange.format.rowHeight = 24;
  valueRange.format.rowHeight = 34;
}

function writeDistributionTable({
  sheet,
  startRow,
  startCol,
  title,
  labels,
  allCounts,
  exhibitorCounts,
  includeExhibitorCount = true,
}) {
  const sectionWidth = includeExhibitorCount ? 3 : 2;
  const titleRange = sheet.getRangeByIndexes(startRow, startCol, 1, sectionWidth);
  titleRange.merge();
  titleRange.values = [[title]];
  styleSectionHeader(titleRange);

  const headers = includeExhibitorCount
    ? [["分类", "目录记录", "参展企业"]]
    : [["分类", "记录数"]];
  const headerRange = sheet.getRangeByIndexes(startRow + 1, startCol, 1, sectionWidth);
  headerRange.values = headers;
  styleTableHeader(headerRange);

  const labelRange = sheet.getRangeByIndexes(startRow + 2, startCol, labels.length, 1);
  labelRange.values = labels.map((label) => [label]);
  const allCountRange = sheet.getRangeByIndexes(
    startRow + 2,
    startCol + 1,
    labels.length,
    1,
  );
  allCountRange.values = labels.map((label) => [allCounts[label] ?? 0]);
  allCountRange.format.numberFormat = "#,##0";

  if (includeExhibitorCount) {
    const exhibitorRange = sheet.getRangeByIndexes(
      startRow + 2,
      startCol + 2,
      labels.length,
      1,
    );
    exhibitorRange.values = labels.map((label) => [exhibitorCounts[label] ?? 0]);
    exhibitorRange.format.numberFormat = "#,##0";
  }

  const dataRange = sheet.getRangeByIndexes(startRow + 2, startCol, labels.length, sectionWidth);
  dataRange.format.borders = {
    insideHorizontal: { style: "thin", color: "#DCE9ED" },
    bottom: { style: "thin", color: "#B8D9E2" },
  };
}

function columnName(oneBasedIndex) {
  let number = oneBasedIndex;
  let name = "";
  while (number > 0) {
    const remainder = (number - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    number = Math.floor((number - 1) / 26);
  }
  return name;
}

function setColumnWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRange(`${columnName(index + 1)}:${columnName(index + 1)}`).format.columnWidth =
      width;
  });
}

async function buildWorkbook(
  records,
  products,
  priorityProductLinks,
  supplementalParticipants,
  metrics,
) {
  const workbook = Workbook.create();
  const overview = workbook.worksheets.add("概览");
  const enterpriseSheet = workbook.worksheets.add("企业名录");
  const boothSheet = workbook.worksheets.add("展位明细");
  const productSheet = workbook.worksheets.add("展品明细");
  const productLinksSheet = workbook.worksheets.add("重点产品链接");
  const supplementalSheet = workbook.worksheets.add("补充参展单位");
  const statsSheet = workbook.worksheets.add("分类统计");
  const dictionarySheet = workbook.worksheets.add("数据字典");

  const enterpriseHeaders = [
    "序号",
    "纳入口径",
    "企业代码",
    "企业中文名",
    "企业英文名",
    "身份",
    "合作伙伴等级",
    "服务领域",
    "行业一级分类",
    "展位号",
    "展馆",
    "展厅或区域",
    "展位数",
    "企业中文简介",
    "企业英文简介",
    "Logo URL",
    "身份代码",
    "合作伙伴代码",
    "服务领域代码",
    "行业一级代码",
    "官方目录 URL",
    "官方 API URL",
    "快照日期",
  ];
  const enterpriseRows = records.map((record) => sanitizeWorkbookRow([
    record.index,
    record.inclusionScope,
    record.enterpriseCode,
    record.enterpriseName,
    record.enterpriseNameEn,
    record.roleName,
    record.partnerLevelName,
    record.businessScope,
    record.industryLevelOneName,
    record.boothNumbers.join(" | "),
    record.boothVenues.join(" | "),
    record.boothLocations.join(" | "),
    record.booths.length,
    record.enterpriseIntroductionCn,
    record.enterpriseIntroductionEn,
    record.logoUrls.join(" | "),
    record.roleCode,
    record.partnerLevelCode,
    record.businessScopeCode,
    record.industryLevelOneCode,
    officialDirectoryUrl,
    apiUrl,
    snapshotDate,
  ]));
  const enterpriseEndRow = enterpriseRows.length + 1;
  const enterpriseEndColumn = columnName(enterpriseHeaders.length);
  enterpriseSheet.getRange(`A1:${enterpriseEndColumn}${enterpriseEndRow}`).values = [
    enterpriseHeaders,
    ...enterpriseRows,
  ];
  styleTableHeader(enterpriseSheet.getRange(`A1:${enterpriseEndColumn}1`));
  enterpriseSheet.tables.add(
    `A1:${enterpriseEndColumn}${enterpriseEndRow}`,
    true,
    "WaicEnterpriseDirectory",
  );
  enterpriseSheet.freezePanes.freezeRows(1);
  enterpriseSheet.freezePanes.freezeColumns(4);
  enterpriseSheet.showGridLines = false;
  enterpriseSheet.getRange(`A2:A${enterpriseEndRow}`).format.numberFormat = "#,##0";
  enterpriseSheet.getRange(`M2:M${enterpriseEndRow}`).format.numberFormat = "#,##0";
  enterpriseSheet.getRange(`W2:W${enterpriseEndRow}`).format.numberFormat = "yyyy-mm-dd";
  enterpriseSheet.getRange(`A2:M${enterpriseEndRow}`).format.verticalAlignment = "top";
  enterpriseSheet.getRange(`N2:V${enterpriseEndRow}`).format.verticalAlignment = "top";
  enterpriseSheet.getRange(`D2:P${enterpriseEndRow}`).format.wrapText = true;
  enterpriseSheet.getRange(`A2:W${enterpriseEndRow}`).format.rowHeight = 42;
  enterpriseSheet.getRange(`B2:B${enterpriseEndRow}`).conditionalFormats.add(
    "containsText",
    {
      text: "参展企业",
      format: { fill: "#E4F7EE", font: { color: "#176B43" } },
    },
  );
  enterpriseSheet.getRange(`B2:B${enterpriseEndRow}`).conditionalFormats.add(
    "containsText",
    {
      text: "非展商",
      format: { fill: "#FFF1D9", font: { color: "#8A5200" } },
    },
  );
  setColumnWidths(enterpriseSheet, [
    8, 20, 36, 32, 38, 22, 20, 38, 32, 24, 24, 32, 10, 68, 68, 48, 38, 34, 38, 34,
    48, 48, 14,
  ]);

  const boothHeaders = [
    "序号",
    "纳入口径",
    "企业代码",
    "企业中文名",
    "企业英文名",
    "身份",
    "合作伙伴等级",
    "行业一级分类",
    "展位号",
    "展馆",
    "展厅或区域",
    "展馆代码",
    "展厅或区域代码",
    "官方目录 URL",
    "快照日期",
  ];
  const boothRows = buildBoothRows(records).map(sanitizeWorkbookRow);
  const boothEndRow = boothRows.length + 1;
  const boothEndColumn = columnName(boothHeaders.length);
  boothSheet.getRange(`A1:${boothEndColumn}${boothEndRow}`).values = [
    boothHeaders,
    ...boothRows,
  ];
  styleTableHeader(boothSheet.getRange(`A1:${boothEndColumn}1`));
  boothSheet.tables.add(
    `A1:${boothEndColumn}${boothEndRow}`,
    true,
    "WaicBoothAssignments",
  );
  boothSheet.freezePanes.freezeRows(1);
  boothSheet.freezePanes.freezeColumns(4);
  boothSheet.showGridLines = false;
  boothSheet.getRange(`A2:A${boothEndRow}`).format.numberFormat = "#,##0";
  boothSheet.getRange(`O2:O${boothEndRow}`).format.numberFormat = "yyyy-mm-dd";
  boothSheet.getRange(`A2:O${boothEndRow}`).format.rowHeight = 28;
  setColumnWidths(boothSheet, [
    8, 20, 36, 32, 38, 22, 20, 32, 18, 26, 34, 28, 32, 48, 14,
  ]);

  const productHeaders = [
    "序号",
    "产品代码",
    "企业代码",
    "企业目录匹配",
    "企业中文名",
    "企业英文名",
    "产品中文名",
    "产品英文名",
    "行业分类",
    "行业代码",
    "展位号",
    "是否新品",
    "国内首发状态",
    "全球首发状态",
    "产品中文描述",
    "产品英文描述",
    "产品图片 URL",
    "产品视频 URL",
    "企业 Logo URL",
    "官方产品 API URL",
    "快照日期",
    "WAIC 单品永久链接",
    "WAIC 链接状态",
    "产品官方 URL",
    "产品链接类型",
    "链接验证状态",
    "最终可用 URL",
    "最终链接类型",
    "链接核验日期",
  ];
  const productRows = products.map((product) => sanitizeWorkbookRow([
    product.index,
    product.productCode,
    product.enterpriseCode,
    product.enterpriseDirectoryMatch,
    product.enterpriseName,
    product.enterpriseNameEn,
    product.productName,
    product.productNameEn,
    product.industryNames.join(" | "),
    product.industryCodes.join(" | "),
    product.boothNumber,
    product.isNewProduct ? "是" : "否",
    product.domesticStatusName,
    product.globalStatusName,
    product.productDescriptionCn,
    product.productDescriptionEn,
    product.productImageUrl,
    product.productVideoUrl,
    product.enterpriseLogoUrl,
    productApiUrl,
    snapshotDate,
    product.waicProductPermalinkUrl,
    product.waicLinkStatus,
    product.officialProductUrl,
    product.officialProductUrlType,
    product.officialProductLinkStatus,
    product.resolvedProductUrl,
    product.resolvedProductUrlType,
    product.productLinkVerifiedAt,
  ]));
  const productEndRow = productRows.length + 1;
  const productEndColumn = columnName(productHeaders.length);
  productSheet.getRange(`A1:${productEndColumn}${productEndRow}`).values = [
    productHeaders,
    ...productRows,
  ];
  styleTableHeader(productSheet.getRange(`A1:${productEndColumn}1`));
  productSheet.tables.add(
    `A1:${productEndColumn}${productEndRow}`,
    true,
    "WaicPublishedProducts",
  );
  productSheet.freezePanes.freezeRows(1);
  productSheet.freezePanes.freezeColumns(5);
  productSheet.showGridLines = false;
  productSheet.getRange(`A2:A${productEndRow}`).format.numberFormat = "#,##0";
  productSheet.getRange(`U2:U${productEndRow}`).format.numberFormat = "yyyy-mm-dd";
  productSheet.getRange(`AC2:AC${productEndRow}`).format.numberFormat = "yyyy-mm-dd";
  productSheet.getRange(`E2:AB${productEndRow}`).format.wrapText = true;
  productSheet.getRange(`A2:AC${productEndRow}`).format.verticalAlignment = "top";
  productSheet.getRange(`A2:AC${productEndRow}`).format.rowHeight = 42;
  productSheet.getRange(`D2:D${productEndRow}`).conditionalFormats.add(
    "containsText",
    {
      text: "未匹配",
      format: { fill: "#FFE4E1", font: { color: "#9A2C23", bold: true } },
    },
  );
  setColumnWidths(productSheet, [
    8, 36, 36, 20, 32, 38, 36, 40, 30, 32, 18, 12, 18, 18, 68, 68, 48, 48, 48,
    48, 14, 24, 30, 48, 26, 42, 48, 28, 16,
  ]);

  productLinksSheet.showGridLines = false;
  styleTitle(productLinksSheet, "A1:S2", "Combo 重点关注参展方：已核验产品链接");
  productLinksSheet.getRange("A3:S3").merge();
  productLinksSheet.getRange("A3:S3").values = [[
    "WAIC 官网展品只在目录页弹窗展示，没有稳定单品永久链接。本表优先提供已核验的官方产品入口；无独立产品页时保留 WAIC 官方媒体或明确标注的企业官网，不猜测域名。",
  ]];
  productLinksSheet.getRange("A3:S3").format = {
    fill: "#17324D",
    font: { color: "#DDF6FB" },
    wrapText: true,
    verticalAlignment: "center",
  };
  productLinksSheet.getRange("A3:S3").format.rowHeight = 42;
  const productLinkHeaders = [
    "优先级",
    "参展企业",
    "产品或平台",
    "企业代码",
    "产品代码",
    "展位",
    "Combo 关注角色",
    "产品官方 URL",
    "链接类型",
    "备用官方 URL",
    "备用链接类型",
    "核验状态",
    "最终可用 URL",
    "最终链接类型",
    "WAIC 展品图片 URL",
    "WAIC 展品视频 URL",
    "WAIC 展品 API 匹配",
    "核验日期",
    "说明",
  ];
  const productLinkRows = priorityProductLinks.map((record) => sanitizeWorkbookRow([
    record.priority,
    record.enterpriseName,
    record.productName,
    record.enterpriseCode,
    record.productCode,
    record.boothNumber,
    record.comboRole,
    record.officialProductUrl,
    record.officialProductUrlType,
    record.secondaryOfficialUrl,
    record.secondaryUrlType,
    record.verificationStatus,
    record.finalUrl,
    record.finalUrlType,
    record.waicProductImageUrl,
    record.waicProductVideoUrl,
    record.waicProductDirectoryMatch,
    record.verifiedAt,
    record.note,
  ]));
  const productLinksEndRow = productLinkRows.length + 5;
  productLinksSheet.getRange(`A5:S${productLinksEndRow}`).values = [
    productLinkHeaders,
    ...productLinkRows,
  ];
  styleTableHeader(productLinksSheet.getRange("A5:S5"));
  productLinksSheet.tables.add(
    `A5:S${productLinksEndRow}`,
    true,
    "WaicPriorityProductLinks",
  );
  productLinksSheet.freezePanes.freezeRows(5);
  productLinksSheet.freezePanes.freezeColumns(3);
  productLinksSheet.getRange(`A6:A${productLinksEndRow}`).format.numberFormat = "#,##0";
  productLinksSheet.getRange(`R6:R${productLinksEndRow}`).format.numberFormat = "yyyy-mm-dd";
  productLinksSheet.getRange(`A6:S${productLinksEndRow}`).format.verticalAlignment = "top";
  productLinksSheet.getRange(`B6:S${productLinksEndRow}`).format.wrapText = true;
  productLinksSheet.getRange(`A6:S${productLinksEndRow}`).format.rowHeight = 54;
  productLinksSheet.getRange(`H6:H${productLinksEndRow}`).format.font = {
    color: "#006F8B",
  };
  productLinksSheet.getRange(`J6:J${productLinksEndRow}`).format.font = {
    color: "#006F8B",
  };
  productLinksSheet.getRange(`M6:M${productLinksEndRow}`).format.font = {
    color: "#006F8B",
    bold: true,
  };
  productLinksSheet.getRange(`L6:L${productLinksEndRow}`).conditionalFormats.add(
    "containsText",
    {
      text: "未找到",
      format: { fill: "#FFF1D9", font: { color: "#8A5200", bold: true } },
    },
  );
  setColumnWidths(productLinksSheet, [
    9, 34, 28, 34, 34, 22, 36, 48, 28, 48, 30, 34, 48, 28, 48, 48, 28, 16, 62,
  ]);

  supplementalSheet.showGridLines = false;
  styleTitle(
    supplementalSheet,
    "A1:K2",
    "官网企业目录外的补充参展单位与品牌线索",
  );
  supplementalSheet.getRange("A3:K3").merge();
  supplementalSheet.getRange("A3:K3").values = [[
    "67 条补充记录来自 WAIC 展品 API、WAIC 官方展商长图及上海区政府/园区发布；短名、品牌名和 OCR 名称按来源保留，不自动等同于法人主体。",
  ]];
  supplementalSheet.getRange("A3:K3").format = {
    fill: "#17324D",
    font: { color: "#DDF6FB" },
    wrapText: true,
    verticalAlignment: "center",
  };
  supplementalSheet.getRange("A3:K3").format.rowHeight = 34;
  const supplementalHeaders = [
    "序号",
    "来源展示名",
    "展位",
    "证据等级",
    "来源类型",
    "参展上下文",
    "实体归一状态",
    "目录状态",
    "来源 URL",
    "备注",
    "快照日期",
  ];
  const supplementalRows = supplementalParticipants.map((record, index) =>
    sanitizeWorkbookRow([
      index + 1,
      record.name,
      record.booth,
      record.evidenceLayer,
      record.sourceType,
      record.context,
      record.entityResolution,
      record.directoryStatus,
      record.sourceUrl,
      record.note,
      snapshotDate,
    ]),
  );
  const supplementalEndRow = supplementalRows.length + 4;
  supplementalSheet.getRange(`A4:K${supplementalEndRow}`).values = [
    supplementalHeaders,
    ...supplementalRows,
  ];
  styleTableHeader(supplementalSheet.getRange("A4:K4"));
  supplementalSheet.tables.add(
    `A4:K${supplementalEndRow}`,
    true,
    "WaicSupplementalParticipants",
  );
  supplementalSheet.freezePanes.freezeRows(4);
  supplementalSheet.freezePanes.freezeColumns(2);
  supplementalSheet.getRange(`A5:K${supplementalEndRow}`).format = {
    wrapText: true,
    verticalAlignment: "top",
    rowHeight: 42,
  };
  supplementalSheet.getRange(`K5:K${supplementalEndRow}`).format.numberFormat =
    "yyyy-mm-dd";
  supplementalSheet.getRange(`D5:D${supplementalEndRow}`).conditionalFormats.add(
    "containsText",
    {
      text: "A0",
      format: { fill: "#E4F7EE", font: { color: "#176B43", bold: true } },
    },
  );
  setColumnWidths(supplementalSheet, [
    8, 34, 20, 12, 42, 38, 34, 38, 58, 54, 14,
  ]);

  overview.showGridLines = false;
  styleTitle(overview, "A1:H2", "WAIC 2026 上海参展企业全量资料");
  overview.getRange("A3:H3").merge();
  overview.getRange("A3:H3").values = [[
    `官方公开 API 快照：${snapshotDate}｜企业目录 1,020 条｜身份展商 ${metrics.totals.exhibitorRoleRecords.toLocaleString("zh-CN")} 条（实体去重 ${metrics.supplemental.directoryDeduplicatedExhibitors}）｜多源可确认单位/品牌 ${metrics.supplemental.multiSourceConfirmedTotal} 个｜去重展品 ${metrics.products.normalizedUniqueProducts.toLocaleString("zh-CN")} 条`,
  ]];
  overview.getRange("A3:H3").format = {
    fill: "#17324D",
    font: { color: "#DDF6FB" },
    verticalAlignment: "center",
  };
  overview.getRange("A3:H3").format.rowHeight = 24;
  writeKpi(
    overview,
    "A5:B5",
    "A6:B7",
    "官方目录记录",
    `=COUNTA('企业名录'!$C$2:$C$${enterpriseEndRow})`,
  );
  writeKpi(
    overview,
    "C5:D5",
    "C6:D7",
    "参展企业身份",
    `=COUNTIF('企业名录'!$B$2:$B$${enterpriseEndRow},"参展企业")`,
  );
  writeKpi(
    overview,
    "E5:F5",
    "E6:F7",
    "论坛主办方（非展商）",
    `=COUNTIF('企业名录'!$B$2:$B$${enterpriseEndRow},"论坛主办方（非展商）")`,
  );
  writeKpi(
    overview,
    "G5:H5",
    "G6:H7",
    "展位记录",
    `=SUM('企业名录'!$M$2:$M$${enterpriseEndRow})`,
  );
  writeKpi(
    overview,
    "A9:B9",
    "A10:B11",
    "有中文名称",
    metrics.fieldCoverage.chineseName,
  );
  writeKpi(
    overview,
    "C9:D9",
    "C10:D11",
    "有中文简介",
    metrics.fieldCoverage.chineseIntroduction,
  );
  writeKpi(
    overview,
    "E9:F9",
    "E10:F11",
    "有 Logo",
    metrics.fieldCoverage.logo,
  );
  writeKpi(
    overview,
    "G9:H9",
    "G10:H11",
    "未公开展位",
    `=COUNTIF('企业名录'!$M$2:$M$${enterpriseEndRow},0)`,
  );
  overview.getRange("A13:H13").merge();
  overview.getRange("A13:H13").values = [["关键口径与使用说明"]];
  styleSectionHeader(overview.getRange("A13:H13"));
  overview.getRange("A14:H20").values = [
    [
      "1",
      "官方总体口径",
      "上海市政府新闻发布会称 1,100 余家企业参展；公开目录 API 在快照日返回 1,020 条记录。两者不是同一统计面，不能把 1,020 直接称为全部参展主体。",
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "2",
      "参展企业口径",
      `按 roleCode 识别出 ${metrics.totals.exhibitorRoleRecords} 条展商记录；合并 ApartX 与 Oxtak 两对明显重复档案后为 ${metrics.supplemental.directoryDeduplicatedExhibitors} 家。再补 WAIC 其他官方资产 ${metrics.supplemental.officialAssetAdditional} 个单位、区政府/园区发布 ${metrics.supplemental.districtAndParkAdditional} 个单位或品牌，当前多源可确认口径为 ${metrics.supplemental.multiSourceConfirmedTotal}。`,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "3",
      "资料完整度",
      "企业目录包含中英文名、官方简介、行业、服务领域、展位、合作伙伴等级、身份与 Logo；展品接口另补产品资料；“补充参展单位”保留共享展位、轮换项目和品牌短名及各自来源。",
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "4",
      "展品口径",
      `官方展品 API 报告 ${metrics.products.apiReportedRows.toLocaleString("zh-CN")} 行，含 ${metrics.products.exactDuplicateRowsRemoved} 条完全重复 productCode；归一化后为 ${metrics.products.normalizedUniqueProducts.toLocaleString("zh-CN")} 件，关联 ${metrics.products.uniqueEnterpriseCodes} 个企业代码，仍不是官方“3,000+ 展品”总体全集。`,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "5",
      "数据质量",
      `企业 API 有 ${metrics.totals.blankNameRecords} 条记录缺中文名、${metrics.totals.recordsWithoutBooths} 条没有公开展位；产品 API 有 ${metrics.products.unmatchedEnterpriseCodes.length} 个企业代码未匹配当前企业目录，均保留原值，不做主观补写。`,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "6",
      "关系结构",
      "企业名录是一企一行；展位明细是一展位一行；展品明细是一件展品一行。28 条企业记录有多个展位，不能用展位数或展品数代替企业数。",
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "7",
      "来源",
      `${officialDirectoryUrl}｜${apiUrl}｜${productApiUrl}｜${governmentBriefingUrl}`,
      null,
      null,
      null,
      null,
      null,
    ],
  ];
  overview.getRange("C14:H20").merge(true);
  overview.getRange("A14:H20").format = {
    wrapText: true,
    verticalAlignment: "top",
    borders: {
      insideHorizontal: { style: "thin", color: "#DCE9ED" },
      bottom: { style: "thin", color: "#B8D9E2" },
    },
  };
  overview.getRange("A14:A20").format = {
    fill: "#EAF7FB",
    font: { bold: true, color: "#0B4454" },
    horizontalAlignment: "center",
  };
  overview.getRange("B14:B20").format.font = { bold: true, color: "#17324D" };
  overview.getRange("A14:H20").format.rowHeight = 54;
  setColumnWidths(overview, [8, 22, 22, 22, 22, 22, 22, 22]);
  overview.freezePanes.freezeRows(3);

  statsSheet.showGridLines = false;
  styleTitle(statsSheet, "A1:P2", "WAIC 2026 分类统计（快照统计）");
  statsSheet.getRange("A3:P3").merge();
  statsSheet.getRange("A3:P3").values = [[
    "统计由同一官方 API 快照生成；目录记录与参展企业两列用于区分官网默认目录和严格展商身份口径。",
  ]];
  statsSheet.getRange("A3:P3").format = {
    fill: "#17324D",
    font: { color: "#DDF6FB" },
  };

  const industryLabels = Object.keys(metrics.distributions.industryTagsAllDirectory);
  const businessLabels = Object.keys(metrics.distributions.businessScopeTagsAllDirectory);
  const partnerLabels = Object.keys(metrics.distributions.partnerLevelsAllDirectory);
  const venueLabels = Object.keys(metrics.distributions.venueAssignments);
  writeDistributionTable({
    sheet: statsSheet,
    startRow: 4,
    startCol: 0,
    title: "行业一级分类标签",
    labels: industryLabels,
    allCounts: metrics.distributions.industryTagsAllDirectory,
    exhibitorCounts: metrics.distributions.industryTagsExhibitors,
  });
  writeDistributionTable({
    sheet: statsSheet,
    startRow: 4,
    startCol: 4,
    title: "服务领域标签",
    labels: businessLabels,
    allCounts: metrics.distributions.businessScopeTagsAllDirectory,
    exhibitorCounts: metrics.distributions.businessScopeTagsExhibitors,
  });
  writeDistributionTable({
    sheet: statsSheet,
    startRow: 4,
    startCol: 8,
    title: "合作伙伴等级",
    labels: partnerLabels,
    allCounts: metrics.distributions.partnerLevelsAllDirectory,
    exhibitorCounts: metrics.distributions.partnerLevelsExhibitors,
  });
  writeDistributionTable({
    sheet: statsSheet,
    startRow: 4,
    startCol: 12,
    title: "展馆（企业关系计数）",
    labels: venueLabels,
    allCounts: metrics.distributions.venueAssignments,
    exhibitorCounts: metrics.distributions.venueAssignmentsExhibitors,
  });
  setColumnWidths(statsSheet, [26, 14, 14, 3, 36, 14, 14, 3, 26, 14, 14, 3, 30, 14, 14, 3]);
  statsSheet.freezePanes.freezeRows(4);

  dictionarySheet.showGridLines = false;
  styleTitle(dictionarySheet, "A1:H2", "数据字典、来源与覆盖边界");
  dictionarySheet.getRange("A4:H4").merge();
  dictionarySheet.getRange("A4:H4").values = [["文件与来源"]];
  styleSectionHeader(dictionarySheet.getRange("A4:H4"));
  dictionarySheet.getRange("A5:H11").values = [
    ["项目", "值", null, null, null, null, null, null],
    ["快照日期", snapshotDate, null, null, null, null, null, null],
    ["官方展商目录", officialDirectoryUrl, null, null, null, null, null, null],
    ["企业目录 API", apiUrl, null, null, null, null, null, null],
    ["展品目录 API", productApiUrl, null, null, null, null, null, null],
    ["上海市政府发布会", governmentBriefingUrl, null, null, null, null, null, null],
    [
      "raw 快照",
      `${path.relative(repoRoot, rawSnapshotPath)}｜${path.relative(repoRoot, rawProductSnapshotPath)}`,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  ];
  dictionarySheet.getRange("B5:H11").merge(true);
  styleTableHeader(dictionarySheet.getRange("A5:H5"));
  dictionarySheet.getRange("A6:H11").format.borders = {
    insideHorizontal: { style: "thin", color: "#DCE9ED" },
    bottom: { style: "thin", color: "#B8D9E2" },
  };

  dictionarySheet.getRange("A12:B12").merge();
  dictionarySheet.getRange("A12:B12").values = [["企业与展品字段"]];
  styleSectionHeader(dictionarySheet.getRange("A12:B12"));
  const dictionaryRows = [
    ["纳入口径", "依据 roleCode 分成参展企业、论坛主办方（非展商）、身份未标注"],
    ["企业代码", "官方 API 的 enterpriseCode；本快照 1,020 条均唯一"],
    ["企业中英文名", "官方自报或大会侧录入；9 条记录没有中文名"],
    ["身份", "展商、论坛主办方，或二者兼有"],
    ["合作伙伴等级", "战略、卓越、精英、FT 初创、OPC 创业项目等；未标注不等于普通展商"],
    ["服务领域", "国民经济行业式服务领域；单条记录可能有多个逗号分隔标签"],
    ["行业一级分类", "大会展览业务分类；单条记录可能有多个逗号分隔标签"],
    ["展位号", "多个展位用竖线分隔；完整一企多展位关系见“展位明细”"],
    ["企业简介", "官方目录中提供的中英文介绍，未额外改写或事实校正"],
    ["Logo URL", "大会静态资源地址；可能为空或未来失效"],
    ["官方目录/API", "每行都保留可追溯来源；展品 API 是通用 POST 列表接口，不是单品详情链接"],
    ["产品代码", "官方 productCode；原始 1,394 行含 5 个完全重复代码，展品明细按代码去重"],
    ["企业目录匹配", "用 enterpriseCode 连接展品与企业；2 个展品企业代码不在当前企业目录"],
    ["新品/首发状态", "直接保留 isNewProduct、domesticStatusName、globalStatusName，不从名称推断"],
    ["产品媒体", "保留 WAIC 官方图片与视频 URL；1,389 件去重展品都有图片，视频按接口实际覆盖"],
    ["产品官方 URL", "仅写入已核验且主体、产品一致的外部入口；没有独立产品页时留空，不猜测域名"],
    ["最终可用 URL", "优先产品官方入口，其次 WAIC 官方视频、WAIC 官方图片；链接类型单列，避免混淆"],
    ["补充参展单位", "67 条目录外线索单列，不与主目录静默合并；保留来源展示名、共享/轮换上下文和实体归一状态"],
  ];
  dictionarySheet.getRange("A13:B13").values = [["字段", "说明"]];
  dictionarySheet.getRange(`A14:B${13 + dictionaryRows.length}`).values = dictionaryRows;
  styleTableHeader(dictionarySheet.getRange("A13:B13"));
  dictionarySheet.getRange(`A14:B${13 + dictionaryRows.length}`).format = {
    wrapText: true,
    verticalAlignment: "top",
    borders: {
      insideHorizontal: { style: "thin", color: "#DCE9ED" },
      bottom: { style: "thin", color: "#B8D9E2" },
    },
  };
  dictionarySheet.getRange(`A14:A${13 + dictionaryRows.length}`).format.font = {
    bold: true,
    color: "#17324D",
  };

  dictionarySheet.getRange("D12:H12").merge();
  dictionarySheet.getRange("D12:H12").values = [["公开目录不包含的字段"]];
  styleSectionHeader(dictionarySheet.getRange("D12:H12"));
  dictionarySheet.getRange("D13:H20").values = [
    ["缺失字段", "处理方式", null, null, null],
    ["成立时间", "不推断；需从企业官网或工商登记逐家补齐", null, null, null],
    ["总部/国家地区", "不依据公司名称猜测", null, null, null],
    ["官网", "不自动把搜索结果当作官方域名", null, null, null],
    ["融资轮次/金额", "不在官方展商目录；动态信息需单独核验", null, null, null],
    ["上市状态/代码", "不在官方展商目录；需交易所或公司 IR 来源", null, null, null],
    ["完整现场展品全集", "公开产品 API 仅 1,394 行，低于官方 3,000+ 总体口径", null, null, null],
    ["联系人/联系方式", "公开 API 未提供，未从第三方会刊购买页抓取", null, null, null],
  ];
  dictionarySheet.getRange("E13:H20").merge(true);
  styleTableHeader(dictionarySheet.getRange("D13:H13"));
  dictionarySheet.getRange("D14:H20").format = {
    wrapText: true,
    verticalAlignment: "top",
    borders: {
      insideHorizontal: { style: "thin", color: "#DCE9ED" },
      bottom: { style: "thin", color: "#B8D9E2" },
    },
  };
  dictionarySheet.getRange("D14:D20").format.font = { bold: true, color: "#17324D" };
  setColumnWidths(dictionarySheet, [24, 30, 4, 26, 24, 24, 24, 24]);
  dictionarySheet.getRange("A5:H13").format.rowHeight = 34;
  dictionarySheet.getRange("A14:B31").format.rowHeight = 50;
  dictionarySheet.getRange("D14:H20").format.rowHeight = 44;
  dictionarySheet.freezePanes.freezeRows(2);

  const overviewInspect = await workbook.inspect({
    kind: "table",
    range: "概览!A1:H20",
    include: "values,formulas",
    tableMaxRows: 20,
    tableMaxCols: 8,
    maxChars: 12_000,
  });
  const statsInspect = await workbook.inspect({
    kind: "table",
    range: "分类统计!A1:P20",
    include: "values,formulas",
    tableMaxRows: 20,
    tableMaxCols: 16,
    maxChars: 14_000,
  });
  const priorityLinksInspect = await workbook.inspect({
    kind: "table",
    range: "重点产品链接!A1:S22",
    include: "values,formulas",
    tableMaxRows: 22,
    tableMaxCols: 19,
    maxChars: 24_000,
  });
  const formulaErrors = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 300 },
    summary: "final formula error scan",
  });

  const previewDir = await fs.mkdtemp(path.join(os.tmpdir(), "waic-2026-workbook-"));
  const previewSpecs = [
    ["概览", "A1:H20"],
    ["企业名录", "A1:M12"],
    ["展位明细", "A1:O12"],
    ["展品明细", "A1:AC12"],
    ["重点产品链接", "A1:M16"],
    ["补充参展单位", "A1:K16"],
    ["分类统计", "A1:P35"],
    ["数据字典", "A1:H31"],
  ];
  const previewPaths = [];
  for (const [sheetName, range] of previewSpecs) {
    const preview = await workbook.render({
      sheetName,
      range,
      scale: 1,
      format: "png",
    });
    const previewPath = path.join(previewDir, `${sheetName}.png`);
    await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
    previewPaths.push(previewPath);
  }

  await fs.mkdir(workbookOutputDir, { recursive: true });
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(workbookPath);

  return {
    workbookPath,
    previewPaths,
    overviewInspect: overviewInspect.ndjson,
    statsInspect: statsInspect.ndjson,
    priorityLinksInspect: priorityLinksInspect.ndjson,
    formulaErrors: formulaErrors.ndjson,
  };
}

async function writeReadme(metrics) {
  const lines = [
    "# WAIC 2026 参展企业数据包",
    "",
    `> 快照日期：${snapshotDate}`,
    `> 官方公开目录记录：${metrics.totals.downloadedDirectoryRecords}`,
    `> 严格参展企业身份：${metrics.totals.exhibitorRoleRecords}`,
    `> 官方公开展品：${metrics.products.apiReportedRows} 行，按 productCode 去重后 ${metrics.products.normalizedUniqueProducts} 件`,
    "",
    "## 文件",
    "",
    "- `exhibitors.csv`：一企一行的完整可筛选目录。",
    "- `exhibitors-normalized.json`：保留多展位、多 Logo 等数组结构。",
    "- `booths.csv`：一展位一行，用于现场路线和展馆分析。",
    "- `products.csv`：一件公开展品一行，含企业、展位、行业、首发标记、描述、WAIC 媒体和已核验产品链接。",
    "- `products-normalized.json`：去重后的完整展品数组、重复行审计、链接类型与媒体兜底。",
    "- `verified-product-links.json`：结合 Combo 优先级人工核验的 17 条重点产品入口与证据。",
    "- `priority-product-links.csv`：重点产品链接的可筛选表；明确区分官方产品页、WAIC 媒体和企业官网。",
    "- `supplemental-participants.csv/json`：官网企业目录外，由展品 API、WAIC 官方资产及区政府/园区发布补充的 67 条参展单位或品牌线索。",
    "- `metrics.json`：覆盖率、行业、服务领域、合作伙伴、展馆和数据质量统计。",
    "- `build-waic-2026-exhibitors.mjs`：官方 API 抓取、校验、归一化与工作簿生成脚本。",
    "",
    "## 口径",
    "",
    `官方页面默认目录同时收录展商与论坛主办方。本数据包用 \`roleCode\` 识别 ${metrics.totals.exhibitorRoleRecords} 条展商记录；合并两个明显重复名称对后为 ${metrics.supplemental.directoryDeduplicatedExhibitors} 家。再纳入官网目录外的 67 条官方或政府/园区来源线索，当前多源可确认口径为 ${metrics.supplemental.multiSourceConfirmedTotal} 个参展单位或品牌。上海市政府发布会的总体口径是 1,100 余家企业、3,000 余项展品，因此仍不能声称覆盖全部线下主体或展品。`,
    "",
    "WAIC 官网展品采用目录页弹窗，没有稳定单品永久链接。产品链接列优先使用已核验的外部官方入口；其余展品保留 WAIC 官方视频或图片作为产品级材料，不把通用 POST API 或猜测域名伪装成产品页。",
    "",
    "## 来源",
    "",
    `- ${officialDirectoryUrl}`,
    `- ${apiUrl}`,
    `- ${productApiUrl}`,
    `- ${governmentBriefingUrl}`,
    "",
  ];
  await fs.writeFile(readmePath, lines.join("\n"), "utf8");
}

async function main() {
  const rawSnapshot = await loadOrFetchRawSnapshot();
  const rawProductSnapshot = await loadOrFetchRawProductSnapshot();
  const verifiedProductLinksPayload = JSON.parse(
    await fs.readFile(verifiedProductLinksPath, "utf8"),
  );
  const verifiedProductLinks = verifiedProductLinksPayload.records;
  if (!Array.isArray(verifiedProductLinks) || verifiedProductLinks.length !== 17) {
    throw new Error("Verified priority product-link dataset must contain exactly 17 records");
  }
  const verifiedProductCodes = verifiedProductLinks
    .map((record) => record.productCode)
    .filter(Boolean);
  if (new Set(verifiedProductCodes).size !== verifiedProductCodes.length) {
    throw new Error("Verified priority product-link dataset contains duplicate product codes");
  }
  const verifiedProductLinkMap = new Map(
    verifiedProductLinks
      .filter((record) => record.productCode)
      .map((record) => [record.productCode, record]),
  );
  const supplementalPayload = JSON.parse(
    await fs.readFile(supplementalJsonPath, "utf8"),
  );
  const supplementalParticipants = supplementalPayload.records;
  if (!Array.isArray(supplementalParticipants) || supplementalParticipants.length !== 67) {
    throw new Error("Supplemental participant dataset must contain exactly 67 records");
  }
  const rawRecords = rawSnapshot.pages.flatMap((page) => page.response.data.list);
  const records = rawRecords.map(normalizeRecord);
  const rawProductRows = rawProductSnapshot.pages.flatMap(
    (page) => page.response.data.list,
  );
  const { products, duplicateRows: duplicateProductRows } = normalizeProducts(
    rawProductRows,
    new Set(records.map((record) => record.enterpriseCode)),
    verifiedProductLinkMap,
  );
  const priorityProductLinks = enrichPriorityProductLinks(
    verifiedProductLinks,
    products,
  );
  const missingVerifiedProductCodes = priorityProductLinks
    .filter((record) => record.productCode && record.waicProductDirectoryMatch !== "已匹配 WAIC 展品 API")
    .map((record) => record.productCode);
  if (missingVerifiedProductCodes.length > 0) {
    throw new Error(
      `Verified product codes missing from WAIC product API: ${missingVerifiedProductCodes.join(", ")}`,
    );
  }
  const metrics = buildMetrics(
    records,
    rawSnapshot.metadata.reportedTotal,
    products,
    rawProductSnapshot.metadata.reportedTotal,
    duplicateProductRows,
  );
  metrics.supplemental = {
    directoryDuplicateCandidatePairs: [
      ["ApartX Ltd", "ApartX ltd"],
      ["Oxtak", "Oxtak Limited"],
    ],
    directoryDeduplicatedExhibitors: 916,
    supplementalRows: supplementalParticipants.length,
    officialAssetAdditional: 26,
    districtAndParkAdditional: 41,
    officialAssetConfirmedTotal: 942,
    multiSourceConfirmedTotal: 983,
    officialHeadlineLowerBound: "1100+",
  };
  metrics.priorityProductLinks = {
    verifiedRecords: priorityProductLinks.length,
    withOfficialProductUrl: priorityProductLinks.filter((record) =>
      record.officialProductUrl.trim(),
    ).length,
    withoutIndependentOfficialProductUrl: priorityProductLinks.filter(
      (record) => !record.officialProductUrl.trim(),
    ).length,
    matchedWaicProductApi: priorityProductLinks.filter(
      (record) => record.waicProductDirectoryMatch === "已匹配 WAIC 展品 API",
    ).length,
    withFinalAvailableUrl: priorityProductLinks.filter((record) =>
      record.finalUrl.trim(),
    ).length,
    waicPermalinkStatus: verifiedProductLinksPayload.metadata.waicPermalinkStatus,
  };
  validateSnapshot(rawSnapshot, records, rawProductSnapshot, products, metrics);

  await fs.writeFile(
    normalizedJsonPath,
    `${JSON.stringify(
      {
        metadata: {
          snapshotDate,
          recordCount: records.length,
          officialDirectoryUrl,
          apiUrl,
          rawSnapshotPath: path.relative(repoRoot, rawSnapshotPath),
        },
        records,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await fs.writeFile(enterpriseCsvPath, buildEnterpriseCsv(records), "utf8");
  await fs.writeFile(boothCsvPath, buildBoothCsv(records), "utf8");
  await fs.writeFile(
    normalizedProductJsonPath,
    `${JSON.stringify(
      {
        metadata: {
          snapshotDate,
          apiReportedRows: rawProductSnapshot.metadata.reportedTotal,
          uniqueProductCount: products.length,
          duplicateRowsRemoved: duplicateProductRows.length,
          productApiUrl,
          productIndustryApiUrl,
          verifiedProductLinksPath: path.relative(repoRoot, verifiedProductLinksPath),
          waicProductPermalinkStatus:
            verifiedProductLinksPayload.metadata.waicPermalinkStatus,
          rawSnapshotPath: path.relative(repoRoot, rawProductSnapshotPath),
        },
        duplicateRows: duplicateProductRows,
        records: products,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await fs.writeFile(productCsvPath, buildProductCsv(products), "utf8");
  await fs.writeFile(
    priorityProductLinksCsvPath,
    buildPriorityProductLinksCsv(priorityProductLinks),
    "utf8",
  );
  await fs.writeFile(
    supplementalCsvPath,
    buildSupplementalCsv(supplementalParticipants),
    "utf8",
  );
  await fs.writeFile(metricsPath, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");
  await writeReadme(metrics);
  const workbookResult = await buildWorkbook(
    records,
    products,
    priorityProductLinks,
    supplementalParticipants,
    metrics,
  );

  process.stdout.write(
    `${JSON.stringify(
      {
        rawSnapshotPath,
        rawProductSnapshotPath,
        normalizedJsonPath,
        enterpriseCsvPath,
        boothCsvPath,
        normalizedProductJsonPath,
        productCsvPath,
        verifiedProductLinksPath,
        priorityProductLinksCsvPath,
        supplementalJsonPath,
        supplementalCsvPath,
        metricsPath,
        workbookPath: workbookResult.workbookPath,
        previewPaths: workbookResult.previewPaths,
        totals: metrics.totals,
        products: metrics.products,
        priorityProductLinks: metrics.priorityProductLinks,
        supplemental: metrics.supplemental,
        fieldCoverage: metrics.fieldCoverage,
        formulaErrors: workbookResult.formulaErrors,
        overviewInspect: workbookResult.overviewInspect,
        statsInspect: workbookResult.statsInspect,
        priorityLinksInspect: workbookResult.priorityLinksInspect,
      },
      null,
      2,
    )}\n`,
  );
}

await main();
