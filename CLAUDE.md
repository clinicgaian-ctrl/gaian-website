# GAIAN 官網 — 專案規則文件（CLAUDE.md）

> 本檔案依「靜態網站建置 SOP 範本」（COREON 官網專案抽象化而來）填空，作為 GAIAN 官網這個專案的規則與進度記錄。之後每完成一步，回來更新對應區塊。

---

## 最新資料優先規則

本文件主要記錄網站技術架構、進度與部署方式。

品牌定位、名詞、網站架構與品牌語言，
以以下資料夾中的最新核准文件為最高依據：

`knowledge/GAIAN_AI_Operating_System/`

若本文件與 knowledge 內的文件衝突，
以 knowledge 最新版本為準。

不得使用 CLAUDE.md 中的舊版名稱，
覆蓋董事長最新核准內容。

---

## 前置準備：素材盤點

| 項目 | 狀態 |
|---|---|
| 設計稿 | 無 Figma，直接以 `index.html`（金色調／神殿意象）為視覺基準 |
| 品牌名稱 | GAIAN |
| 一句話定位 | Future Integrative Health（融合整合醫學、預防醫學、美學、藝術與生活方式） |
| 目標客群／服務地區／SEO 關鍵字 3–5 組／聯絡方式 | ⏳ 待與董事長確認，目前為空 |
| 各頁面文案 | 只有首頁（`官網文案/1.首頁.rtf`）完成，其餘六頁尚未撰寫，目前用佔位文字 |
| 真實 Logo | ✅ 已有（`images/logo.jpg`） |
| 首頁參考圖 | ✅ 5 張 AI 參考圖已套用（hero-arch／about-corridor／journey-steps／gallery-tunnel／gallery-constellation）；2026-07-21 首頁主視覺換新為 `home-hero.png`（原 `claude/圖片/1.首頁圖片/首頁1.png`），`hero-arch.png` 保留供 Future Health 頁與 Journal 縮圖使用 |

⚠️ 尚未有真實醫療團隊照片、Journal 縮圖、其餘六頁的攝影素材 —— 目前用金色調文字佔位卡，**不要生成假的人物照片**，等真實素材到位再替換。

---

## 視覺 Design Token（取自 `css/style.css`）

- 色票：`--gold #B8934A`／`--gold-light #D9BC81`／`--gold-pale #F3E9D6`／`--ink #2A2620`／`--ink-soft #5C564B`／`--cream #FAF6EF`／`--mist #EDE6D6`
- 字體：中文內文 `Noto Serif TC`；英文/標語 `Cormorant Garamond`（襯線，用於大標）；導覽/按鈕/小標 `Jost`（無襯線，letter-spacing 寬）
- 風格：金色系＋大理石神殿意象、細線分隔、大量留白、按鈕為描邊風格

---

## 首頁（index.html）8 大區塊（2026-07-21 董事長新版內容規劃）

首頁已依董事長提供的定位／文案／圖像規劃全面重寫，區塊順序與對應 class/id：

| Part | 內容 | class/id | 狀態 |
|---|---|---|---|
| 1 Hero 主視覺 | 單一 CTA「探索 GAIAN」 | `.hero` | ✅ 文案完成；⚠️ 8–10 秒循環影片素材尚未提供，先用靜態圖代替（見 index.html 內 TODO 註解） |
| 2 GAIAN 是什麼 | 左文右圖 | `#about` | ✅ 完成，圖片為暫代素材 |
| 3 四大核心 | 4 張全版影像＋一句話，hover 微放大 | `#core-values` | ✅ 版型完成；待補①醫療討論②健康生活③藝術空間④品牌文化交流 正式攝影 |
| 4 健康管理方式 | 4 節點（理解/評估/規劃/陪伴）＋金色線 scroll 逐步展開 | `#process` | ✅ 白底＋金線節點圖完成（`js/flow-line.js` 的 `initProcessLine`） |
| 5 美的概念館 | 3 張大圖，延續背景不切割 | `#gallery` | ✅ 完成，圖片為暫代素材 |
| 6 醫療團隊 | 佔位卡＋新文案 | `#team` | ⏳ 待補正式團隊照片（醫師閱讀/討論/互動，避免排排站） |
| 7 品牌觀點 Featured Story | 單篇精選，非列表 | `#journal` | ✅ 完成，圖片為暫代素材 |
| 8 開始旅程 CTA | 雙 CTA「探索 GAIAN／立即預約」 | `#contact` | ✅ 完成 |

金色流動線分兩段實作：主線（`#flowPath`）貫穿 Hero＋About，隨整頁滾動展開；健康管理流程線（`#processPath`）是獨立小型 SVG，進入視野時播放一次繪製動畫。兩者共用 `js/flow-line.js`，透過 GSAP + ScrollTrigger（CDN 載入）驅動。

---

## 頁面架構與導覽（v2，取代 `GAIAN_官網資訊架構_v1.docx` 的舊命名）

⚠️ **2026-07-12 全站改版**：導覽改用 Mega Menu（滑鼠移上顯示：5 個子項目＋內容預覽＋代表圖片＋品牌哲學語句），且頂層命名正式變更如下，取代 v1 文件的舊名稱：

| 舊命名（v1 文件） | 新命名（v2，現行） | 檔名 |
|---|---|---|
| HEALTH 整合健康 | **FUTURE HEALTH 未來健康** | `future-health.html`（原 `health.html`） |
| VIC 尊榮體驗 | **WALKING TOGETHER 同行者** | `walking-together.html`（原 `vic.html`） |
| JOURNAL 健康誌 | **JOURNAL 品牌觀點** | `journal.html`（檔名不變，label 改） |

另新增頂部工具列：「會員登入｜VIC」＋語言切換「中/EN」（語言切換目前僅為 UI 佔位，尚未做多語系）。

Mega Menu 的內容資料集中在 `js/nav-data.js`（單一資料來源，改這裡全站導覽會一起更新），渲染邏輯在 `js/nav.js`。**About GAIAN 與 Journal 品牌觀點的 5 項子分類與品牌哲學語句為草稿**，其餘（Future Health／Beauty Gallery／Walking Together）依董事長提供的原文撰寫。

| 檔名 | 頁面 | 狀態 |
|---|---|---|
| `index.html` | Home 首頁 | ✅ 版型＋真實圖片＋首頁文案完成，導覽已套用 Mega Menu |
| `about.html` | About GAIAN｜關於 GAIAN | ⏳ 骨架＋佔位內容，Mega Menu 5 項為草稿 |
| `future-health.html` | Future Health｜未來健康 | ✅ 依 Mega Menu 新 5 分類重建（整合醫學/健康管理/健康評估/醫療團隊/健康方案），原 12 項細節併入對應分類 |
| `gallery.html` | Beauty Concept Gallery｜美的概念館 | ✅ 七屏完整切版＋滾動動態（依 `官網文案/2.藝術.rtf`），並加上錨點對應 Mega Menu 新 5 分類（美的理念/藝術與生活/品牌典藏/家具與空間/藝術策展）；Jewelry/Wang Xia Jun/Furniture/Art Collection 與 Curated Living 5 項待補真實素材與定稿文案 |
| `journal.html` | Journal｜品牌觀點 | ⏳ 骨架＋佔位內容，Mega Menu 5 項為草稿 |
| `walking-together.html` | Walking Together｜同行者 | ✅ 依「同行者」定位重新框架（不是會員制度，而是同行關係），5 個子區塊對應 Mega Menu |
| `contact.html` | Contact｜開始旅程 | ⏳ 骨架＋佔位內容 |

頁面清單如需變動，先提案給客戶（董事長）確認，不要自己直接改架構。

---

## SEO 規則（尚未實作，列為 TODO）

- [ ] 每頁 `<title>`（30 字內）／`meta description`（80–110 字）
- [ ] OG tags（og:title / og:description / og:image / og:url）
- [ ] JSON-LD（MedicalOrganization 或 LocalBusiness schema）
- [ ] `sitemap.xml`
- [ ] `robots.txt`

## 圖片規範（尚未實作，列為 TODO）

- [ ] 目前圖片為 PNG 原始輸出（每張約 1.8–2.1MB），需轉 WebP＋壓縮
- [ ] 響應式尺寸（srcset）＋ lazy loading（`loading="lazy"`）
- [ ] 檔名已是語意化英文（hero-arch / about-corridor 等）✅
- [ ] alt 已用中文在地語言 ✅
- [ ] 待未來圖片變多，依頁面 slug 分資料夾（`images/home/`、`images/gallery/`…）

## 技術規範

- 純靜態 HTML/CSS，無框架、無建置步驟（因執行環境無法連外安裝 npm 套件，故不採 Next.js／Astro）
- RWD：已有基本 breakpoint（≤960px 導覽收合、≤860px 版面單欄化）
- Core Web Vitals／Lighthouse 檢查：尚未執行
- 部署目標：Cloudflare Workers（static assets 模式，見 `wrangler.jsonc`）

---

## 部署狀態

- **GitHub**：`clinicgaian-ctrl/gaian-website`，已建立並上傳首批檔案；`css/`、`images/` 資料夾是否完整上傳需再次確認（網頁版「choose files」對話框不支援選資料夾，需改用 Finder 拖整個資料夾）
- **Cloudflare**：Workers & Pages 專案已連接此 GitHub repo，`wrangler.jsonc`（`assets.directory: "./"`）已加入，等待重新部署驗證
- **自訂網域**：已購買，尚未進入 5.3 綁定步驟

---

## 發佈方式：iCloud 同步地雷與解法

⚠️ **重要**：這個專案的工作資料夾在 `~/Desktop/檔案整理/👑GAIAN官網_cowork/`，屬於 iCloud Drive 同步範圍。實際踩過的坑：Claude 執行環境對這個資料夾做 `git commit` 時，多次出現：

```
warning: unable to unlink '.git/objects/xx/tmp_obj_xxxx': Operation not permitted
fatal: cannot lock ref 'HEAD': Unable to create '.../HEAD.lock': File exists.
```

這正是 SOP 描述的 iCloud 同步鎖檔問題。**解法：** git 操作一律不要直接在 iCloud 同步的資料夾裡做，改用下方發佈腳本，把檔案 rsync 到 `~/gaian-site-git`（不受 iCloud 同步）再執行 git。

見同資料夾內 `發佈上線.command`，雙擊即可自動同步＋發佈。

**GitHub 認證**：用 Personal Access Token（classic，勾選 `repo` 權限），搭配 `git config --global credential.helper osxkeychain`，macOS 鑰匙圈會記住 token，之後不用每次輸入。

---

## 常見地雷速查表

| 問題 | 原因 | 解法 |
|---|---|---|
| Git 卡在 "another git process" / "unable to delete lock" | 專案資料夾被 iCloud 同步 | Git 操作搬到 `~/gaian-site-git`，用 rsync 中介（見 `發佈上線.command`） |
| Push 時 "Password authentication is not supported" | GitHub 已停用帳密登入 | 改用 Personal Access Token 當密碼 |
| Push 時 "Permission ... denied to 別的帳號" | 電腦上同時有多個 GitHub 帳號，remote URL 沒指定帳號，鑰匙圈抓錯憑證 | remote URL 明確帶帳號：`https://<帳號>@github.com/<帳號>/<repo>.git`，鑰匙圈會依「網站＋帳號」分開存，不用刪除其他帳號的憑證 |
| Cloudflare 部署失敗，log 出現 `npx wrangler deploy` 找不到入口 | 新版 Workers & Pages 預設走 Workers 部署流程，需要 `wrangler.jsonc` 指定 `assets.directory` | 已加入 `wrangler.jsonc`，確認重新部署 |
| GitHub 網頁「choose files」選不到資料夾 | 瀏覽器原生檔案選擇視窗只能選檔案 | 改成直接把 Finder 裡的資料夾圖示拖進上傳虛線框 |
| 加 www 網域出現 "No zones match" | www 不該當獨立 Custom Domain 加 | 改用 CNAME + Redirect Rule |
| 想買 .tw/.com.tw 卻在 Cloudflare Registrar 找不到 | Cloudflare 未支援該 TLD | 去 TWNIC 認證註冊商買，再把 DNS 轉到 Cloudflare |
| 區塊間漸層過渡蓋住按鈕文字 | 用負 margin 疊到前一區塊 | 漸層畫在自己區塊內側（`position:absolute;bottom:0`）+ z-index 排序 |

⚠️ 不要用真實公司名稱當「客戶案例／合作夥伴」標誌，除非對方明確確認是真實客戶；沒把握就用產業類別取代真實 logo。
