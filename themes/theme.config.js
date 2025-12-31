/**
 * 主题配置文件
 * 
 * 使用方法:
 * 1. 修改 activeTheme 为你想使用的主题名称
 * 2. 主题文件夹必须存在于 themes/ 目录下
 */

module.exports = {
  // 当前激活的主题 (对应 themes/ 下的文件夹名)
  activeTheme: 'labubu',
  
  // 可用主题列表
  availableThemes: [
    {
      name: 'labubu',
      displayName: 'Labubu Wholesale',
      description: 'Premium designer collectibles wholesale platform',
      version: '1.0.0',
    },
  ],
};
