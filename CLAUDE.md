# GAIAN 官網 — 專案規則文件（CLAUDE.md）

> 本檔案依「靜態網站建置 SOP 範本」（COREON 官網專案抽象化而來）填空，作為 GAIAN 官網這個專案的規則與進度記錄。之後每完成一步，回來更新對應區塊。

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
| 首頁參考圖 | ✅ 5 張 AI 參考圖已套用（hero-arch／about-corridor／journey-steps／gallery-tunnel／gallery-constellation） |

⚠️ 尚未有真實醫療團隊照片、Journal 縮圖、其餘六頁的攝影素材 —— 目前用金色調文字佔位卡，**不要生成假的人物照片**，等真實素材到位再替換。

---

## 視覺 Design Token（取自 `css/style.css`）

- 色票：`--gold #B8934A`／`--gold-light #D9BC81`／`--gold-pale #F3E9D6`／`--ink #2A2620`／`--ink-soft #5C564B`／`--cream #FAF6EF`／`--mist #EDE6D6`
- 字體：中文內文 `Noto Serif TC`；英文/標語 `Cormorant Garamond`（襯線，用於大標）；導覽/按鈕/小標 `Jost`（無襯線，letter-spacing 寬）
- 風格：金色系＋大理石神殿意象、細線分隔、大量留白、按鈕為描邊風格

---

## 頁面架構（依 `GAIAN_官網資訊架構_v1.docx`）

品牌宇宙導覽（頁首常駐、低調）：GAIA TORAH｜**GAIAN**（高亮）｜Journal｜VIC

GAIAN 主導覽：ABOUT 關於｜HEALTH 健康｜GALLERY 美學｜JOURNAL 健康誌｜VIC 尊榮｜RESERVATION 預約

| 檔名 | 頁面 | 狀態 |
|---|---|---|
| `index.html` | 01 Home 首頁 | ✅ 版型＋真實圖片＋首頁文案完成 |
| `about.html` | 02 About GAIAN｜關於 GAIAN | ⏳ 骨架＋佔位內容 |
| `health.html` | 03 Integrative Health｜整合健康 | ⏳ 骨架＋佔位內容（12 項細節待補） |
| `gallery.html` | 04 Beauty Concept Gallery｜美的概念館 | ⏳ 骨架＋2 張真實圖 |
| `journal.html` | 05 Journal｜健康誌 | ⏳ 骨架＋佔位內容 |
| `vic.html` | 06 VIC Experience｜尊榮體驗 | ⏳ 骨架＋佔位內容 |
| `contact.html` | 07 Contact｜聯絡預約 | ⏳ 骨架＋佔位內容 |

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
