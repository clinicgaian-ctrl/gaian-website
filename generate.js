const fs = require('fs');
const path = require('path');

function headTags(title) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | GAIAN</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Noto+Serif+TC:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">`;
}

function nav(activeKey, solid) {
  return `<nav class="nav" id="mainNav" data-active="${activeKey}"${solid ? ' data-solid="true"' : ''}></nav>`;
}

function footer() {
  return `<footer>
  <div class="footer-top">
    <div class="logo-row">
      <img src="images/logo.png" alt="GAIAN">
      <p>GAIAN 融合整合醫學、美學、藝術與生活方式，打造一座重新理解健康的場域。</p>
    </div>
    <div class="footer-links">
      <div class="footer-col"><b>Explore</b><a href="about.html">關於 GAIAN</a><a href="future-health.html">未來健康</a><a href="gallery.html">美的概念館</a><a href="journal.html">品牌觀點</a></div>
      <div class="footer-col"><b>Visit</b><a href="walking-together.html">同行者</a><a href="contact.html">開始旅程</a><a href="contact.html">門市資訊</a></div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 GAIAN. Future Integrative Health.</p>
    <div class="footer-social"><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">Line</a></div>
  </div>
</footer>
<script src="js/nav-data.js"></script>
<script src="js/nav.js"></script>`;
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
  active: 'about',
  solid: true,
  body: `
${pageHero('About GAIAN', '不只是一間診所，更是一座重新理解健康的場域。', 'GAIAN 承接 GAIA 的品牌理念，融合整合醫學、美學、藝術與生活方式，重新思考健康擁有的樣貌。')}

<section class="section" id="story">
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

// ---- journal.html ----
fs.writeFileSync(path.join(OUT, 'journal.html'), page({
  title: '品牌觀點',
  active: 'journal',
  solid: true,
  body: `
${pageHero('Journal', '持續理解，才能持續健康。', '定位為品牌觀點（Insights）而非新聞稿，也是全站 SEO 內容主力。')}

<section class="section" id="future-health">
  <div class="section-head">
    <p class="eyebrow en">Categories</p>
    <h2>分類</h2>
  </div>
  ${blockGrid([
    { title: 'Future Health 未來健康觀點', desc: '重新定義健康的核心價值。' },
    { title: 'Lifestyle 生活方式', desc: '讓健康自然融入每一天。' },
    { title: 'Medical 醫療科普', desc: '專業內容，用理解取代恐懼。' },
    { title: 'Beauty 健康美學', desc: '美，是健康的自然結果。' },
    { title: 'Story 訪者故事', desc: '每一段旅程，都值得被記錄。' },
  ])}
  <p class="art-note" style="margin-top:50px;">文章列表與內容待撰寫，此頁完成後可接後台 CMS 直接發布更新。</p>
</section>
`
}));

// ---- contact.html ----
fs.writeFileSync(path.join(OUT, 'contact.html'), page({
  title: '開始旅程',
  active: 'contact',
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

console.log('about / journal / contact 三頁已產生（首頁、美的概念館、未來健康、同行者為手工精修頁面，不由此腳本產生）');
