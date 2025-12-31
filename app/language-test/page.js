'use client';

import { useLanguage } from '@/lib/language-context';
import LanguageSwitcher from '@/components/themes/labubu/language-switcher';
import LanguageDemo from '@/components/themes/labubu/language-demo';

export default function LanguageTestPage() {
  const { translations, locale } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            小语种功能测试 / Language Test
          </h1>
          
          {/* 语言切换器 */}
          <div className="mb-8 p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-4">语言切换器 / Language Switcher</h2>
            <LanguageSwitcher />
            <p className="mt-2 text-sm text-muted-foreground">
              当前语言: {locale} / Current Language: {locale}
            </p>
          </div>

          {/* 语言演示组件 */}
          <div className="mb-8">
            <LanguageDemo />
          </div>

          {/* 完整翻译测试 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 导航测试 */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-4">导航 / Navigation</h3>
              <div className="space-y-2">
                <p><strong>首页:</strong> {translations.nav?.home || 'Home'}</p>
                <p><strong>关于:</strong> {translations.nav?.about || 'About'}</p>
                <p><strong>产品:</strong> {translations.nav?.products || 'Products'}</p>
                <p><strong>联系:</strong> {translations.nav?.contact || 'Contact'}</p>
                <p><strong>获取报价:</strong> {translations.nav?.getQuote || 'Get Quote'}</p>
              </div>
            </div>

            {/* 首页内容测试 */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-4">首页内容 / Home Content</h3>
              <div className="space-y-2">
                <p><strong>徽章:</strong> {translations.home?.hero?.badge || 'Premium Designer Collectibles'}</p>
                <p><strong>标题:</strong> {translations.home?.hero?.title || 'Welcome to Labubu Wholesale'}</p>
                <p><strong>描述:</strong> {translations.home?.hero?.description || 'Discover exclusive designer collectibles...'}</p>
              </div>
            </div>

            {/* 产品页面测试 */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-4">产品页面 / Product Page</h3>
              <div className="space-y-2">
                <p><strong>标题:</strong> {translations.product?.title || 'Product Details'}</p>
                <p><strong>描述:</strong> {translations.product?.description || 'Premium designer collectible'}</p>
                <p><strong>特征:</strong> {translations.product?.features || 'Key Features'}</p>
                <p><strong>推荐:</strong> {translations.product?.recommended || 'Recommended Products'}</p>
              </div>
            </div>

            {/* 联系页面测试 */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-4">联系页面 / Contact Page</h3>
              <div className="space-y-2">
                <p><strong>标题:</strong> {translations.contact?.title || 'Contact Us'}</p>
                <p><strong>描述:</strong> {translations.contact?.description || 'Get in touch with our team'}</p>
                <p><strong>姓名:</strong> {translations.contact?.form?.name || 'Name'}</p>
                <p><strong>邮箱:</strong> {translations.contact?.form?.email || 'Email'}</p>
                <p><strong>消息:</strong> {translations.contact?.form?.message || 'Message'}</p>
              </div>
            </div>
          </div>

          {/* 小语种特殊测试 */}
          <div className="mt-8 p-6 border rounded-lg bg-accent/20">
            <h3 className="text-lg font-semibold mb-4">小语种特殊字符测试 / Special Character Test</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">日语 / Japanese</h4>
                <p>ひらがな: こんにちは</p>
                <p>カタカナ: コンニチハ</p>
                <p>漢字: 日本語</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">韩语 / Korean</h4>
                <p>한글: 안녕하세요</p>
                <p>한국어: 한국어</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">德语 / German</h4>
                <p>特殊字符: äöüß</p>
                <p>德语: Deutsch</p>
              </div>
            </div>
          </div>

          {/* 测试说明 */}
          <div className="mt-8 p-6 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <h3 className="text-lg font-semibold mb-4">测试说明 / Test Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>点击右上角的语言切换器 / Click the language switcher in the top right</li>
              <li>选择不同语言测试翻译是否正确 / Select different languages to test translations</li>
              <li>检查特殊字符是否正确显示 / Check if special characters display correctly</li>
              <li>验证页面刷新后语言设置是否保持 / Verify language setting persists after page refresh</li>
              <li>测试移动端语言切换功能 / Test mobile language switching functionality</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
