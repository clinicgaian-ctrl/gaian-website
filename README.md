# GAIAN 官網

靜態多頁網站骨架，對應 GAIAN_官網資訊架構_v1.docx 規劃的七大頁面。

## 結構
- index.html：首頁（一頁式敘事＋各區塊摘要連結）
- about.html：關於 GAIAN
- health.html：整合健康
- gallery.html：美的概念館
- journal.html：健康誌
- vic.html：尊榮體驗
- contact.html：聯絡預約
- css/style.css：共用樣式（金色調／神殿意象）
- images/：目前已有的首頁參考圖與 Logo
- functions/：預留給 Cloudflare Pages Functions（後台 CMS API）

## 產生頁面
`node generate.js` 會重新產生 about/health/gallery/journal/vic/contact 六頁（index.html 另行維護）。

## 部署（Cloudflare Pages）
純靜態網站，無需建置步驟，Cloudflare Pages 設定 Build command 留空、Build output directory 設為根目錄即可。
