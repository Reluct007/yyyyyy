// 共享社交媒体 metadata 片段：避免页面覆盖导致字段丢失
// 参考 Next.js Metadata API 的推荐用法（共享 nested 字段并在页面内 spread）

export const openGraphImage = {
  images: [
    {
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Poker Kit",
    },
  ],
};

export const twitterMetadata = {
  card: "summary_large_image",
  images: ["/opengraph-image.png"],
};
