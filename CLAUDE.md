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

## 2026-07-21 首頁動態與導覽修正紀錄

- **Hero＋About 線條拿掉**：原本貫穿 Hero/About 的金色 SVG 線條視覺太生硬，已移除，改成 `js/flow-line.js` 不再處理（該檔現在只管 Process 區塊的節點連線），首頁改用 `.shimmer-layer`（`css/style.css`）三顆柔光光暈做氛圍點綴。
- **Hero→About 接縫**：新增 `.about-mist` 霧感圖層（模糊漸層），柔化原本過硬的色塊切線。
- **四大核心手機版**：改成可橫向滑動＋高低錯落的雜誌式卡片（`.core-grid` 在 ≤960px 走 `scroll-snap-type:x`），不再是四個等高方塊。
- **健康管理方式手機版**：改成 Scroll Journey（`.scroll-journey`／`.sj-step`），每滑一屏對應一個步驟，背景依序為光／水波／大理石／夕陽（對應 `core-integrative.png`／`core-management.png`／`core-gallery.png`／`home-hero.png`），純 CSS `scroll-snap` 實作，不依賴 GSAP。桌機版維持原本白底＋四節點金線圖不變。
- **重要 bugfix**：`js/nav.js` 的 logo 路徑在圖片資料夾整理後沒有同步更新，導致全站 Logo 破圖，已修正為 `images/shared/logo-icon.png`；同時拿掉 Logo 旁的英文標語文字（改成純圖示）。
- **導覽移除「會員登入」**：`js/nav-data.js` 的 utility 只保留語言切換，不再顯示會員登入連結。

---

## 2026-07-21（下午）霧感過渡／連續背景渲染／全站按鈕統一

- **強化 Hero→About 霧感**：`.about-mist` 改寫成從透明→Hero 底色（暗調）→過渡色→About 米色（`--cream`）的多階漸層，並加大範圍（`top:-260px;height:520px`）與模糊半徑（`blur(34px)`），讓交界處是真正的顏色暈染過渡，而不是變暗後留下的硬線。手機版同步等比例調整。
- **連續渲染背景（About→四大核心→健康管理→美的概念館）**：`#core-values`、`#process`、`#gallery` 三個區塊統一加上 `.texture-bg`（金色點狀紋理，原本只有 `#about` 有），並在三處區塊交界新增 `.zone-blend`（柔和金色暈染，`radial-gradient` + `blur(38px)`）作為過渡層，讓四塊視覺上讀起來像同一個連續區域，直到醫療團隊 `#team`（維持深色對比作為刻意的段落轉換，不在此次調整範圍）。
- **全站按鈕統一為 `.btn-star`**：移除舊版方框按鈕 `.btn`／`.btn.dark`／`.btn.solid`，全站（`index.html`／`contact.html`／`future-health.html`／`walking-together.html`）改用星芒＋底線的 `.btn-star`（深色底用預設淺色字，淺色底加 `.dark`）。並新增 `.btn-star.primary` 圓框星芒變體，用於每個區塊最主要的行動呼籲（首頁「立即預約」、Process CTA、Contact 頁「預約健康諮詢」等），與次要連結做出風格區隔，達到「有變化但不失統一」。`gallery.html`／`journal.html`／`about.html` 原本就沒有 `.btn` 按鈕，不需調整。

---

## 2026-07-22 Hero→About 過渡最終定案＋About 進場特效

- 嘗試多輪霧化／模糊過渡效果後，董事長最終決定 **Hero 與 About 之間不做任何漸層或霧化，改回乾淨的硬切**（`.about-mist` 已整個移除，Hero 圖片改用 `--hero-img` 變數的架構保留，供之後其他用途）。
- About 區塊是重要品牌溝通區塊，改用「先神秘、往下滑再展示照片」的進場動畫：新增 `js/reveal.js`（IntersectionObserver，滾動進入視野時加上 `.in-view`），文字用既有的 `.reveal` 淡入上移，照片用新增的 `.reveal-photo`（模糊＋變暗＋輕微放大 → 清晰＋正常亮度＋原尺寸）。

---

## 2026-07-22（晚）首頁醫師區塊全面改版：品牌定位對齊國際高端醫療品牌

董事長參考 Aman／Mayo Clinic／Cleveland Clinic／SHA Wellness／Lanserhof／Four Seasons Health 等國際高端醫療與生活方式品牌後，指出首頁不應該一開始就是「醫師大頭照網格」（顯得像一般診所），應該先建立「GAIAN 有什麼樣的醫療能力」，醫師是最後才認識的角色。

**首頁 `index.html`（原 `#team` 醫師大頭照網格，已整個拆解重建為三段）：**
- **`#team`（The People of GAIAN）**：品牌理念引言，純文字置中，不放人物照片。
- **`#disciplines`（Our Medical Disciplines）**：六大醫療領域卡片取代醫師照片，作為首頁主要內容——整合醫學／神經醫學／皮膚健康／再生醫學／女性健康／男性健康，每張卡連結到 `future-health.html` 對應錨點（整合醫學→`#integrative`，其餘→`#team`，因為那裡就能看到對應領域的醫師）。新增 `.discipline-grid`／`.discipline-card` 樣式。
- **`#companions`（The Companions）**：一次只展示一位醫師的輪播（不是四張一起），新增 `js/companions.js`（vanilla JS，上一位／下一位按鈕＋圓點導覽）與對應 CSS（`.companion-slider` 等）。內容為董事長提供、已符合醫療廣告規範（避免療效保證、避免誇大）的 6 位醫師簡介。

**`future-health.html` 的 `#team`（醫療團隊完整頁）同步更新**：原本也是假的 Dr. 陳／林／王／營養團隊佔位資料，已換成同一批 6 位真實醫師（含理念金句與簡介），`.team-grid` 改為 3 欄排列。醫師排列順序依「健康旅程」而非字母/職稱：整合醫學（陳仁浩）→神經醫學（謝元貴）→皮膚健康（唐豪悅、黃詩婷）→女性健康／再生醫學（李伯寧）→男性健康（黃柏仁）。

**待補事項**：
- 6 位醫師目前都用金色調文字佔位卡（`.team-photo`／`.companion-photo`），尚無正式照片，**不要生成假的人物照片**。
- 醫師個人介紹頁（點進去看學歷／經歷／證照／專長）尚未建立，目前「閱讀介紹」動作先省略；待董事長提供完整 CV 內容後再規劃獨立頁面或彈窗。
- 六大醫療領域卡片目前多數連到 `future-health.html#team`（籠統指向醫師團隊區），未來若各領域有獨立內容區塊，應改為各自的錨點。

**2026-07-22（晚，追加）**：六大醫療領域卡片第一版是死板的 3×2 方格網格，董事長回饋「跟別人一樣，絕對不可以」。改成拱門造型卡片（`border-radius:130px 130px 14px 14px`，頂部一個放射狀金色暈染的拱窗區塊）＋左右滑動輪播（`.discipline-track` 原生 `scroll-snap-type:x`，新增 `js/discipline-carousel.js` 處理箭頭/圓點導覽與捲動同步），偶數卡片上下錯落，不再對齊。

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
| 3 四大核心 | 4 張正式攝影＋一句話，雜誌式錯落高度排版（650/520/760/580px），hover 微放大 | `#core-values` | ✅ 完成，已換上正式攝影（`images/home/core-integrative.png`／`core-management.png`／`core-gallery.png`／`core-culture.png`） |
| 4 健康管理方式 | 4 節點（理解/評估/規劃/陪伴）＋金色線 scroll 逐步展開 | `#process` | ✅ 白底＋金線節點圖完成（`js/flow-line.js` 的 `initProcessLine`） |
| 5 美的概念館 | 3 張大圖，延續背景不切割 | `#gallery` | ✅ 完成，圖片為暫代素材 |
| 6 醫療能力先於醫師 | The People of GAIAN 理念引言 → 六大醫療領域卡片 → The Companions 醫師輪播（一次一位） | `#team`／`#disciplines`／`#companions` | ✅ 2026-07-22 改版完成，內容為真實 6 位醫師（合規簡介）；⏳ 待補正式照片與個人介紹頁 |
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

## 圖片資料夾結構（2026-07-21 整理）

`gaian-site/images/` 依「是否跨頁共用」分子資料夾，而非強制每頁一個資料夾（因為多數圖片被 2–3 個頁面共用，硬分頁面會造成重複檔案）：

| 資料夾 | 內容 | 使用頁面 |
|---|---|---|
| `images/shared/` | `about-corridor.png`／`hero-arch.png`／`gallery-tunnel.png`／`gallery-constellation.png`／`logo.png`／`logo-icon.png` | 2 個頁面以上共用（含 nav Mega Menu 圖） |
| `images/home/` | `home-hero.png`（首頁 Hero）／`journey-bg.png`（四大核心「健康管理」卡片圖） | 僅 `index.html` |
| `images/future-health/` | `journey-steps.png`（5 步驟圖，用於 #assessment） | 僅 `future-health.html` |
| `images/unused/` | `logo.jpg`（Logo 原始來源檔，僅供未來重新裁切用，網站未直接引用） | 無 |

新增圖片時，若確定只有單一頁面使用就放對應頁面資料夾；被 2 頁以上使用就放 `shared/`；找不到使用位置或先留著备用的，放 `unused/`，不要留在 `images/` 根目錄，避免命名衝突（例如同一批對話中出現過兩個不同的 `首頁2.png`，就是根目錄散放檔案造成的混淆）。

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
