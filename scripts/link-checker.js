const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.labubuwholesale.com';
const LANGUAGES = ['en', 'es', 'fr', 'de', 'ja', 'ko'];
const PATHS_TO_CHECK = [
  '',
  '/about',
  '/products',
  '/contact',
  '/blog',
  '/faq',
  '/privacy-policy',
  '/terms-of-service',
  '/shipping-policy',
  '/return-policy'
];

const results = {
  brokenLinks: [],
  timeoutLinks: [],
  otherErrors: [],
  checkedUrls: new Set()
};

function checkUrl(url) {
  if (results.checkedUrls.has(url)) return;
  results.checkedUrls.add(url);

  try {
    console.log(`Checking: ${url}`);
    const status = execSync(`curl -I -s -o /dev/null -w "%{http_code}" "${url}"`, { timeout: 10000 }).toString().trim();
    
    if (status === '404') {
      results.brokenLinks.push(url);
      console.log(`❌ Broken link: ${url}`);
    } else if (status === '000') {
      results.timeoutLinks.push(url);
      console.log(`⏳ Timeout: ${url}`);
    } else if (status >= 400) {
      results.otherErrors.push({ url, status });
      console.log(`⚠️  Error ${status}: ${url}`);
    } else {
      console.log(`✅ OK: ${url} (${status})`);
    }
  } catch (error) {
    if (error.message.includes('timeout')) {
      results.timeoutLinks.push(url);
      console.log(`⏳ Timeout: ${url}`);
    } else {
      console.error(`Error checking ${url}:`, error.message);
      results.otherErrors.push({ url, error: error.message });
    }
  }
}

async function checkAllUrls() {
  console.log('Starting comprehensive link checker...');
  
  // Check base paths
  for (const path of PATHS_TO_CHECK) {
    checkUrl(`${BASE_URL}${path}`);
  }
  
  // Check localized paths
  for (const lang of LANGUAGES) {
    for (const path of PATHS_TO_CHECK) {
      const url = lang === 'en' 
        ? `${BASE_URL}${path}` 
        : `${BASE_URL}/${lang}${path}`;
      checkUrl(url);
    }
  }
  
  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsPath = path.join(__dirname, 'link-check-results', `link-check-${timestamp}.json`);
  
  fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
  fs.writeFileSync(
    resultsPath,
    JSON.stringify({
      ...results,
      checkedUrls: Array.from(results.checkedUrls)
    }, null, 2)
  );
  
  console.log('\n--- 扫描完成 ---');
  console.log(`✅ 总检查链接数: ${results.checkedUrls.size}`);
  console.log(`✅ 正常链接: ${results.checkedUrls.size - results.brokenLinks.length - results.timeoutLinks.length - results.otherErrors.length}`);
  console.log(`❌ 损坏链接 (404): ${results.brokenLinks.length}`);
  console.log(`⏳ 超时链接: ${results.timeoutLinks.length}`);
  console.log(`⚠️  其他错误: ${results.otherErrors.length}`);
  console.log(`📊 结果已保存至: ${resultsPath}`);
  
  if (results.brokenLinks.length > 0) {
    console.log('\n损坏的链接:');
    results.brokenLinks.forEach(link => console.log(`- ${link}`));
  }
}

checkAllUrls().catch(console.error);
