import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const APP_DIR = path.join(ROOT_DIR, "app");
const OUT_DIR = path.join(ROOT_DIR, "out");
const PUBLIC_REDIRECTS_FILE = path.join(ROOT_DIR, "public", "_redirects");

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizeBaseUrl(url) {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.replace(/\/+$/, "");
}

function parseAttributes(tag) {
  const attrs = {};
  const re = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s">]+))/g;
  let match;
  while ((match = re.exec(tag))) {
    const rawKey = match[1] || "";
    const key = rawKey.toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    attrs[key] = value;
  }
  return attrs;
}

function extractTags(html, tagName) {
  const re = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return html.match(re) ?? [];
}

function extractTitle(html) {
  const match = html.match(/<title\b[^>]*>(.*?)<\/title>/i);
  return (match?.[1] ?? "").trim();
}

function extractRobotsContent(html) {
  const metaTags = extractTags(html, "meta");
  for (const tag of metaTags) {
    const attrs = parseAttributes(tag);
    if ((attrs.name || "").toLowerCase() === "robots") {
      return (attrs.content || "").trim();
    }
  }
  return "";
}

function extractMetaDescription(html) {
  const metaTags = extractTags(html, "meta");
  for (const tag of metaTags) {
    const attrs = parseAttributes(tag);
    if ((attrs.name || "").toLowerCase() === "description") {
      return (attrs.content || "").trim();
    }
  }
  return "";
}

function extractCanonical(html) {
  const linkTags = extractTags(html, "link");
  for (const tag of linkTags) {
    const attrs = parseAttributes(tag);
    if ((attrs.rel || "").toLowerCase() === "canonical") {
      return (attrs.href || "").trim();
    }
  }
  return "";
}

function extractAlternates(html) {
  const alternates = new Map();
  const linkTags = extractTags(html, "link");
  for (const tag of linkTags) {
    const attrs = parseAttributes(tag);
    if ((attrs.rel || "").toLowerCase() !== "alternate") continue;
    const hreflang = (attrs.hreflang || "").trim().toLowerCase();
    const href = (attrs.href || "").trim();
    if (!hreflang || !href) continue;
    alternates.set(hreflang, href);
  }
  return alternates;
}

function extractMainInnerHtml(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return match?.[1] ?? "";
}

function extractJsonLdObjects(html) {
  const results = [];
  const re =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    const raw = (match[1] ?? "").trim();
    if (!raw) continue;
    try {
      results.push(JSON.parse(raw));
    } catch {
      results.push({ __parseError: true, __raw: raw });
    }
  }
  return results;
}

function flattenJsonLdTypes(jsonLdObjects) {
  const types = [];
  for (const obj of jsonLdObjects) {
    if (!obj || typeof obj !== "object") continue;
    if (obj.__parseError) continue;
    const value = obj["@type"];
    if (typeof value === "string") types.push(value);
    if (Array.isArray(value)) {
      value.forEach((t) => {
        if (typeof t === "string") types.push(t);
      });
    }
  }
  return types;
}

function computeExpectedUrl({ baseUrl, locale, logicalPath }) {
  const normalizedLogicalPath =
    logicalPath === "/" ? "/" : `/${logicalPath.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
  const pathname = `/${locale}${normalizedLogicalPath}`;
  return new URL(pathname, `${baseUrl}/`).toString();
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath)));
      continue;
    }
    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }
  return files;
}

async function checkNoUseClientInAppPages({ failures }) {
  if (!(await pathExists(APP_DIR))) return;
  const files = await walkFiles(APP_DIR);
  const targets = files.filter((filePath) => {
    const name = path.basename(filePath).toLowerCase();
    const isPageOrLayout = name.startsWith("page.") || name.startsWith("layout.");
    if (!isPageOrLayout) return false;
    return [".js", ".jsx", ".ts", ".tsx"].includes(path.extname(name));
  });

  await Promise.all(
    targets.map(async (filePath) => {
      const content = await fs.readFile(filePath, "utf8");
      const head = content.split("\n").slice(0, 10).join("\n");
      if (/^\s*(['"])use client\1;?/m.test(head)) {
        failures.push(`[app] page/layout 禁止使用 "use client": ${toPosixPath(filePath)}`);
      }
    }),
  );
}

async function checkRedirects({ failures, defaultLocale }) {
  if (!(await pathExists(PUBLIC_REDIRECTS_FILE))) {
    failures.push(`[redirects] 缺少 public/_redirects: ${toPosixPath(PUBLIC_REDIRECTS_FILE)}`);
    return;
  }

  const content = await fs.readFile(PUBLIC_REDIRECTS_FILE, "utf8");
  const re = new RegExp(`^/\\s+/${defaultLocale}/\\s+301\\s*$`, "m");
  if (!re.test(content)) {
    failures.push(`[redirects] 缺少根路径 301 到 /${defaultLocale}/ 的规则: public/_redirects`);
  }
}

async function checkRobotsAndSitemap({ failures, baseUrl, supportedLocales }) {
  const robotsFile = path.join(OUT_DIR, "robots.txt");
  const sitemapFile = path.join(OUT_DIR, "sitemap.xml");

  if (!(await pathExists(robotsFile))) {
    failures.push(`[out] 缺少 robots.txt（请先运行 pnpm build）: ${toPosixPath(robotsFile)}`);
    return;
  }

  if (!(await pathExists(sitemapFile))) {
    failures.push(`[out] 缺少 sitemap.xml（请先运行 pnpm build）: ${toPosixPath(sitemapFile)}`);
    return;
  }

  const robots = await fs.readFile(robotsFile, "utf8");
  const expectedSitemapLine = `Sitemap: ${baseUrl}/sitemap.xml`;
  if (!robots.includes(expectedSitemapLine)) {
    failures.push(
      `[robots] robots.txt 未包含正确的 Sitemap 行（期望：${expectedSitemapLine}）: out/robots.txt`,
    );
  }

  const sitemap = await fs.readFile(sitemapFile, "utf8");
  if (!sitemap.includes("<urlset")) {
    failures.push(`[sitemap] sitemap.xml 缺少 <urlset>: out/sitemap.xml`);
  }

  supportedLocales.forEach((locale) => {
    const homeLoc = `<loc>${baseUrl}/${locale}/</loc>`;
    const collectionLoc = `<loc>${baseUrl}/${locale}/collection/</loc>`;
    if (!sitemap.includes(homeLoc)) {
      failures.push(`[sitemap] 缺少首页 URL: ${homeLoc}`);
    }
    if (!sitemap.includes(collectionLoc)) {
      failures.push(`[sitemap] 缺少 collection URL: ${collectionLoc}`);
    }
  });
}

function isNoindex(robotsContent) {
  return /(^|[,\s])noindex([,\s]|$)/i.test(robotsContent || "");
}

async function checkLocaleHtmlPages({ failures, baseUrl, defaultLocale, supportedLocales }) {
  if (!(await pathExists(OUT_DIR))) {
    failures.push(`[out] 缺少 out/（请先运行 pnpm build）: ${toPosixPath(OUT_DIR)}`);
    return;
  }

  const files = await walkFiles(OUT_DIR);
  const htmlFiles = files.filter((filePath) => filePath.toLowerCase().endsWith(".html"));

  const localeSet = new Set(supportedLocales);
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  for (const filePath of htmlFiles) {
    const rel = toPosixPath(path.relative(OUT_DIR, filePath));
    if (rel.startsWith("_next/")) continue;

    if (!rel.endsWith("index.html")) continue;

    const urlPath = `/${rel.slice(0, -"index.html".length)}`;
    if (urlPath === "/404/") continue;

    const firstSegment = urlPath.split("/").filter(Boolean)[0] || "";
    const isLocaleRoute = localeSet.has(firstSegment);
    const routeLocale = isLocaleRoute ? firstSegment : defaultLocale;

    const html = await fs.readFile(filePath, "utf8");

    const htmlLangMatch = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i);
    const htmlLang = (htmlLangMatch?.[1] ?? "").trim().toLowerCase();
    if (htmlLang && htmlLang !== routeLocale) {
      failures.push(`[html] lang 与路由不一致: ${urlPath}（lang=${htmlLang}；期望=${routeLocale}）`);
    }

    const title = extractTitle(html);
    if (!title) {
      failures.push(`[html] 缺少 <title>: ${urlPath}`);
    }

    const description = extractMetaDescription(html);
    if (!description) {
      failures.push(`[html] 缺少 meta description: ${urlPath}`);
    }

    const robots = extractRobotsContent(html);
    const noindex = isNoindex(robots);
    const indexable = !noindex;

    const canonical = extractCanonical(html);
    const logicalPath = isLocaleRoute
      ? urlPath.replace(new RegExp(`^/${routeLocale}`), "") || "/"
      : urlPath;
    const expectedCanonical = computeExpectedUrl({
      baseUrl: normalizedBaseUrl,
      locale: routeLocale,
      logicalPath,
    });

    if (!canonical) {
      failures.push(`[html] 缺少 canonical: ${urlPath}`);
    } else if (!canonical.startsWith(`${normalizedBaseUrl}/`)) {
      failures.push(`[html] canonical 必须为绝对 URL 且指向站点域名: ${urlPath}（实际：${canonical}）`);
    } else if (indexable && canonical !== expectedCanonical) {
      failures.push(
        `[html] canonical 不匹配: ${urlPath}（实际：${canonical}；期望：${expectedCanonical}）`,
      );
    }

    if (urlPath.includes("/page/") && !noindex) {
      failures.push(`[html] 分页页必须 noindex: ${urlPath}`);
    }

    const mainHtml = extractMainInnerHtml(html);
    if (indexable) {
      if (!mainHtml) {
        failures.push(`[html] 缺少 <main>（或无法解析）: ${urlPath}`);
      } else {
        if (!/<h1\b/i.test(mainHtml)) {
          failures.push(`[html] <main> 缺少 <h1>（疑似首屏内容不足）: ${urlPath}`);
        }
        if (/>\s*Loading\.\.\.\s*</i.test(mainHtml)) {
          failures.push(`[html] <main> 出现 Loading...（疑似 client-only 渲染）: ${urlPath}`);
        }
      }
    }

    const alternates = extractAlternates(html);
    if (indexable) {
      supportedLocales.forEach((locale) => {
        const expected = computeExpectedUrl({
          baseUrl: normalizedBaseUrl,
          locale,
          logicalPath,
        });
        const actual = alternates.get(locale);
        if (!actual) {
          failures.push(`[html] 缺少 hreflang alternate: ${urlPath}（hreflang=${locale}）`);
        } else if (actual !== expected) {
          failures.push(
            `[html] hreflang 不匹配: ${urlPath}（hreflang=${locale}；实际：${actual}；期望：${expected}）`,
          );
        }
      });

      const expectedXDefault = computeExpectedUrl({
        baseUrl: normalizedBaseUrl,
        locale: defaultLocale,
        logicalPath,
      });
      const actualXDefault = alternates.get("x-default");
      if (!actualXDefault) {
        failures.push(`[html] 缺少 hreflang alternate: ${urlPath}（hreflang=x-default）`);
      } else if (actualXDefault !== expectedXDefault) {
        failures.push(
          `[html] hreflang 不匹配: ${urlPath}（hreflang=x-default；实际：${actualXDefault}；期望：${expectedXDefault}）`,
        );
      }
    }

    const jsonLdObjects = extractJsonLdObjects(html);
    const jsonLdParseErrors = jsonLdObjects.filter((item) => item?.__parseError);
    if (indexable && jsonLdParseErrors.length > 0) {
      failures.push(`[schema] JSON-LD 无法解析（${jsonLdParseErrors.length} 个）: ${urlPath}`);
    }
    const jsonLdTypes = flattenJsonLdTypes(jsonLdObjects);
    if (indexable && jsonLdObjects.length === 0) {
      failures.push(`[html] 缺少 JSON-LD: ${urlPath}`);
    }

    if (urlPath.includes("/product/") && indexable && !jsonLdTypes.includes("Product")) {
      failures.push(`[schema] 产品页缺少 Product JSON-LD: ${urlPath}`);
    }

    if (urlPath.includes("/collection/") && indexable && !jsonLdTypes.includes("ItemList")) {
      failures.push(`[schema] 列表页缺少 ItemList JSON-LD: ${urlPath}`);
    }
  }
}

async function main() {
  const failures = [];

  const [{ basic }, { DEFAULT_LOCALE, SUPPORTED_LOCALES }] = await Promise.all([
    import("../data/basic.js"),
    import("../data/i18n.js"),
  ]);

  const baseUrl = normalizeBaseUrl(basic?.seo?.url || basic?.info?.link);
  if (!baseUrl) {
    failures.push(`[config] 缺少站点根 URL：请设置 data/basic.js 的 basic.seo.url`);
  }

  const defaultLocale = DEFAULT_LOCALE || "en";
  const supportedLocales = Array.isArray(SUPPORTED_LOCALES) ? SUPPORTED_LOCALES : [];
  if (supportedLocales.length === 0) {
    failures.push(`[config] 缺少 SUPPORTED_LOCALES：请检查 data/i18n.js`);
  }

  await checkNoUseClientInAppPages({ failures });
  await checkRedirects({ failures, defaultLocale });

  if (baseUrl && supportedLocales.length > 0) {
    await checkRobotsAndSitemap({ failures, baseUrl, supportedLocales });
    await checkLocaleHtmlPages({
      failures,
      baseUrl,
      defaultLocale,
      supportedLocales,
    });
  }

  if (failures.length > 0) {
    console.error(`SEO 扫描未通过（${failures.length} 项）：`);
    failures.forEach((item) => console.error(`- ${item}`));
    process.exit(1);
  }

  console.log("SEO 扫描通过");
}

main().catch((error) => {
  console.error("SEO 扫描异常：", error);
  process.exit(1);
});
