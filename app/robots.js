import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";

export const dynamic = "force-static";

export default function robots() {
  const siteUrl = withTrailingSlash(basic?.seo?.url || basic?.info?.link);
  if (typeof siteUrl !== "string" || !siteUrl.trim()) {
    throw new Error(
      "Missing site root URL: set `basic.seo.url` (or `basic.info.link`) in data/basic.js",
    );
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}sitemap.xml`,
  };
}
