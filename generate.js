const fs = require('fs');
const path = require('path');

const NAV_ITEMS = [
  { label: '關於 GAIAN', en: 'ABOUT', href: 'about.html' },
  { label: '整合健康', en: 'HEALTH', href: 'health.html' },
  { label: '美的概念館', en: 'GALLERY', href: 'gallery.html' },
  { label: '健康誌', en: 'JOURNAL', href: 'journal.html' },
  { label: '尊榮體驗', en: 'VIC', href: 'vic.html' },
];

function headTags(title) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | GAIAN</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Noto+Serif+TC:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">`;
}

function nav(active, solid) {
  const links = NAV_ITEMS.map(i =>
    `<li><a href="${i.href}"${i.href === active ? ' style="color:var(--gold);"' : ''}>${i.en} ${i.label}</a></li>`
  ).join('\n    ');
  return `<nav class="nav${solid ? ' solid' : ''}" id="mainNav">
  <a href="index.html" class="nav-logo"><img src="images/logo.png" alt="GAIAN"></a>
  <ul class="nav-links">
    ${links}
  </ul>
  <div class="nav-cta"><a class="reserve" href="contact.html">RESERVATION 預約</a></div>
</nav>`;
}

function footer() {
  return `<footer>
  <div class="footer-top">
    <div class="logo-row">
      <img src="images/logo.png" alt="GAIAN">
      <p>GAIAN 融合整合醫學、美學、藝術與生活方式，打造一座重新理解健康的場域。</p>
    </div>
    <div class="footer-links">
      <div class="footer-col"><b>Explore</b><a href="about.html">關於 GAIAN</a><a href="health.html">整合健康</a><a href="gallery.html">美的概念館</a><a href="journal.html">健康誌</a></div>
      <div class="footer-col"><b>Visit</b><a href="vic.html">尊榮體驗</a><a href="contact.html">預約</a><a href="contact.html">門市資訊</a></div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 GAIAN. Future Integrative Health.</p>
    <div class="footer-social"><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">Line</a></div>
  </div>
</footer>
<script>
  const nav = document.getElementById('mainNav');
  if (!nav.classList.contains('solid')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }
</script>`;
}

function pageHero(crumb, title, tagline) {
  return `<section class="page-hero">
  <div>
    <p class="crumb">${crumb}</p>
    <h1 class="en">${title}</h1>
    <p>${tagline}</p>
  </div>
</section>`;
}

function blockGrid(blocks) {
  return `<div class="block-grid">
  ${blocks.map(b => `<div class="block-card"><b>${b.title}</b><span>${b.desc}</span></div>`).join('\n  ')}
</div>`;
}

function page({ title, active, solid, body }) {
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
${headTags(title)}
</head>
<body>

${nav(active, solid)}

${body}

${footer()}

</body>
</html>
`;
}

const OUT = path.join(__dirname);

// ---- about.html ----
fs.writeFileSync(path.join(OUT, 'about.html'), page({
  title: '關於 GAIAN',
  active: 'about.html',
  solid: true,
  body: `
${pageHero('About GAIAN', '不只是一間診所，更是一座重新理解健康的場域。', 'GAIAN 承接 GAIA 的品牌理念，融合整合醫學、美學、藝術與生活方式，重新思考健康擁有的樣貌。')}

<section class="section">
  <div class="section-head">
    <p class="eyebrow en">Our Story</p>
    <h2>品牌故事</h2>
    <p class="tagline">內容草稿撰寫中，待補上 GAIA × GAIAN 的品牌起源故事。</p>
  </div>
  ${blockGrid([
    { title: 'GAIA × GAIAN', desc: '品牌血緣與命名由來，GAIAN 作為 GAIA 在未來健康領域的實踐場域。' },
    { title: '品牌理念', desc: '整合醫學、預防醫學、健康美學、生活方式四大信念的具體實踐。' },
    { title: '品牌世界觀', desc: '如何看待健康、美、身體與生活之間的關係。' },
    { title: '我們相信', desc: '真正的健康不是改善今天，而是為未來建立更穩定的自己。' },
    { title: '未來願景', desc: 'GAIAN 對未來健康場域的長期規劃與擴張方向。' },
  ])}
  <p class="art-note" style="margin-top:50px;">此頁待補：品牌故事完整文案、創辦理念影像或人物訪談素材。</p>
</section>
`
}));

// ---- health.html ----
fs.writeFileSync(path.join(OUT, 'health.html'), page({
  title: '整合健康',
  active: 'health.html',
  solid: true,
  body: `
${pageHero('Integrative Health', '重新理解身體，是一切健康的起點。', '全站內容最完整的頁面，涵蓋整合醫學、預防醫學到個人化健康評估與管理。')}

<section class="section">
  <div class="section-head">
    <p class="eyebrow en">Programs</p>
    <h2>五大核心分類</h2>
    <p class="tagline">選單僅列五大分類，細項內容以下方錨點呈現。</p>
  </div>
  ${blockGrid([
    { title: 'Integrative Medicine 整合醫學', desc: '以整體理解身體，而非只關注單一症狀。' },
    { title: 'Preventive Medicine 預防醫學', desc: '在問題發生之前，開始經營未來健康。' },
    { title: 'Programs 健康方案', desc: '依個人需求打造的整合式健康計畫。' },
    { title: 'Medical Team 醫療團隊', desc: '中西醫整合、跨專科合作的專業團隊。' },
    { title: 'Health Assessment 健康評估', desc: '建立完整、可追蹤的個人健康輪廓。' },
  ])}
</section>

<section class="section" style="background:var(--mist);">
  <div class="section-head">
    <p class="eyebrow en">Focus Topics</p>
    <h2>專項主題</h2>
    <p class="tagline">以下 7 項以頁內子區塊呈現，文案與內容待補。</p>
  </div>
  ${blockGrid([
    { title: '功能醫學', desc: '待補文案。' },
    { title: '健康管理', desc: '待補文案。' },
    { title: '睡眠', desc: '待補文案。' },
    { title: '壓力', desc: '待補文案。' },
    { title: '疼痛', desc: '待補文案。' },
    { title: '落髮', desc: '待補文案。' },
    { title: '女性健康', desc: '待補文案。' },
    { title: '靜脈營養', desc: '待補文案。' },
    { title: '醫療設備', desc: '待補文案。' },
  ])}
</section>
`
}));

// ---- gallery.html ----
fs.writeFileSync(path.join(OUT, 'gallery.html'), page({
  title: '美的概念館',
  active: 'gallery.html',
  solid: true,
  body: `
${pageHero('Beauty Concept Gallery', '美，也是健康的一部分。', '藝術、光影、空間、材質與文化，共同構成健康體驗的一部分，內容分類可隨時間持續擴充。')}

<section class="section" style="padding-left:0;padding-right:0;">
  <div class="gallery-editorial">
    <div class="gimg"><img src="images/gallery-constellation.png" alt="空間與藝術"><div class="gallery-cap">Space &amp; Ritual</div></div>
    <div class="gimg"><img src="images/gallery-tunnel.png" alt="光影長廊"><div class="gallery-cap">Light</div></div>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <p class="eyebrow en">Collections</p>
    <h2>分類</h2>
  </div>
  ${blockGrid([
    { title: 'Gallery', desc: '策展式空間紀錄，待補圖片與文案。' },
    { title: 'Art', desc: '藝術裝置與品牌合作創作。' },
    { title: 'Space', desc: '場域設計理念與空間敘事。' },
    { title: 'Furniture', desc: '訂製家具與器物選件。' },
    { title: 'Collection', desc: '限定系列與典藏品項。' },
    { title: 'Lifestyle', desc: '生活風格提案。' },
    { title: 'Exhibition', desc: '不定期策展與活動紀錄。' },
  ])}
</section>
`
}));

// ---- journal.html ----
fs.writeFileSync(path.join(OUT, 'journal.html'), page({
  title: '健康誌',
  active: 'journal.html',
  solid: true,
  body: `
${pageHero('Journal', '持續理解，才能持續健康。', '定位為 Insights 而非新聞稿，也是全站 SEO 內容主力。')}

<section class="section">
  <div class="section-head">
    <p class="eyebrow en">Categories</p>
    <h2>分類</h2>
  </div>
  ${blockGrid([
    { title: 'Future Health', desc: '未來健康觀點與趨勢。' },
    { title: 'Lifestyle', desc: '生活方式與日常實踐。' },
    { title: 'Medical', desc: '醫療專業科普內容。' },
    { title: 'Beauty', desc: '健康美學觀點。' },
    { title: 'Story', desc: '訪者與品牌故事。' },
    { title: 'Interview', desc: '專業人士訪談。' },
    { title: 'Media', desc: '媒體報導彙整。' },
    { title: 'Podcast', desc: '音頻內容（如有規劃）。' },
  ])}
  <p class="art-note" style="margin-top:50px;">文章列表與內容待撰寫，此頁完成後可接後台 CMS 直接發布更新。</p>
</section>
`
}));

// ---- vic.html ----
fs.writeFileSync(path.join(OUT, 'vic.html'), page({
  title: '尊榮體驗',
  active: 'vic.html',
  solid: true,
  body: `
${pageHero('VIC Experience', 'Private Health Journey', '不是傳統會員制度，而是一段專屬於你的私人健康旅程。')}

<section class="section">
  <div class="section-head">
    <p class="eyebrow en">Private Journey</p>
    <h2>會員體驗</h2>
  </div>
  ${blockGrid([
    { title: '會員理念', desc: '為何 GAIAN 選擇以「旅程」而非「制度」定義會員關係。' },
    { title: '健康旅程', desc: '個人化的長期健康規劃與陪伴。' },
    { title: '會員權益', desc: '專屬服務與資源清單，待補。' },
    { title: '專屬顧問', desc: '一對一健康顧問服務介紹。' },
    { title: '企業會員', desc: '企業健康福利合作方案。' },
    { title: 'VIP Event', desc: '不定期專屬活動與體驗。' },
  ])}
</section>
`
}));

// ---- contact.html ----
fs.writeFileSync(path.join(OUT, 'contact.html'), page({
  title: '聯絡預約',
  active: 'contact.html',
  solid: true,
  body: `
${pageHero('Contact', '準備開始，重新理解自己的身體了嗎？', '每一段健康旅程，都從一次理解開始。')}

<section class="section">
  <div class="section-head">
    <p class="eyebrow en">Get in Touch</p>
    <h2>預約與門市資訊</h2>
  </div>
  ${blockGrid([
    { title: 'Reservation 預約', desc: '待接線上預約系統或 LINE 官方帳號。' },
    { title: 'Location 地址', desc: '待補正式門市地址。' },
    { title: 'Business Hours 營業時間', desc: '待補營業時間資訊。' },
    { title: 'LINE 官方帳號', desc: '待補 LINE ID／QR Code。' },
    { title: 'Parking 停車資訊', desc: '待補停車場資訊。' },
    { title: 'FAQ 常見問題', desc: '待補常見問題內容。' },
  ])}
  <div style="text-align:center;margin-top:50px;"><a class="btn dark" href="#">預約健康諮詢</a></div>
</section>
`
}));

console.log('7 頁面已產生（含首頁另行維護於 index.html）');
