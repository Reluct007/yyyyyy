// SEO URL 工具：统一站内 canonical/hreflang/OG 的末尾斜杠风格
// 仅用于页面 URL（不要用于图片/静态资源 URL）

export function withTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  const input = url.trim();
  if (!input) return input;

  const hashIndex = input.indexOf('#');
  const queryIndex = input.indexOf('?');
  const endIndex = Math.min(
    hashIndex === -1 ? input.length : hashIndex,
    queryIndex === -1 ? input.length : queryIndex
  );

  const base = input.slice(0, endIndex);
  const suffix = input.slice(endIndex);

  if (base.endsWith('/')) return input;
  return `${base}/${suffix}`;
}

