/**
 * 主题配置
 * 切换主题只需修改 activeTheme
 */

export const themeConfig = {
  // 当前激活的主题
  activeTheme: 'labubu',
  
  // 可用主题列表
  themes: {
    labubu: {
      name: 'Labubu Wholesale',
      description: 'Labubu 批发主题',
      // 主题图片路径前缀
      assetsPath: '/themes/labubu',
    },
    // 添加更多主题...
    // another: {
    //   name: 'Another Theme',
    //   description: '另一个主题',
    //   assetsPath: '/themes/another',
    // },
  },
};

// 获取当前主题配置
export function getTheme() {
  return themeConfig.themes[themeConfig.activeTheme];
}

// 获取主题资源路径
export function getThemeAsset(path) {
  const theme = getTheme();
  return `${theme.assetsPath}${path}`;
}
