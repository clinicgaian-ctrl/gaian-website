/*
  GAIAN 全站導覽資料（單一資料來源）
  修改這個檔案，所有頁面的導覽與 Mega Menu 會一併更新（由 js/nav.js 讀取渲染）。
  2026-11-18：下拉選單的金句、子項目標語與說明，全部改為各頁面現行內文。
*/
window.GAIAN_NAV = {
  utility: [
    /* 語言切換（中 / EN）：英文版完成前先不顯示 */
  ],
  reserve: { label: "RESERVATION 開始旅程", href: "contact.html" },
  items: [
    { key: "home", en: "HOME", zh: "首頁", href: "index.html" },
    {
      key: "about", en: "ABOUT GAIAN", zh: "關於 GAIAN", href: "about.html",
      quote: "以專業守護健康<br>以美學豐富人生",
      quoteSource: "GAIAN Belief",
      image: "images/about/about-01-hero-nav.jpg",
      items: [
        { en: "Brand Story", zh: "品牌故事", tagline: "一份初心的延續", desc: "GAIA 的起點，是對自然、肌膚與生活環境的關心。GAIAN 延續這份初心，匯集中西醫專業，以預防醫學為核心，結合藝術與空間美學。", href: "about.html#story" },
        { en: "GAIA × GAIAN", zh: "品牌連結", tagline: "共同信念，不同實踐", desc: "GAIA 是初心與研發的根基，GAIAN 是健康與美的實踐場域；認識 GAIA 眾神殿、GAIAN 美的概念館與肌齡光域・覺生殿。", href: "about.html#gaia" },
        { en: "Philosophy", zh: "品牌理念", tagline: "我們所重視的五件事", desc: "用心傾聽、及早預防、以您為中心、從整體看待健康，以及健康為本，與美共生。", href: "about.html#philosophy" },
        { en: "Worldview", zh: "品牌世界觀", tagline: "以四項原則，落實每一次選擇", desc: "專業為本・尊重隱私・專屬客製化・空間美學", href: "about.html#worldview" },
        { en: "Vision", zh: "品牌願景", tagline: "立足亞太", desc: "以成為預防醫學、整合醫學、與健康管理的指標品牌為願景。", href: "about.html#vision" }
      ]
    },
    {
      key: "future-health", en: "FUTURE HEALTH", zh: "未來健康", href: "future-health.html",
      quote: "關注當下的身體狀況<br>看見預防醫學的價值",
      quoteSource: "GAIAN Future Health",
      image: "images/future-health/fh-00-hero.jpg",
      items: [
        { en: "Integrative Medicine", zh: "整合醫學", tagline: "不同專業，共同評估", desc: "整合問診、檢測結果與您的實際感受，由相關專業共同討論，說明目前需要關注的重點，安排診療與調理的優先順序。", href: "future-health.html#integrative" },
        { en: "Health Management", zh: "健康管理", tagline: "從您關心的項目著手，持續了解您身體變化", desc: "以預防醫學為出發點，針對您關心的項目進行評估，並透過後續回訪，了解變化與調整需求。", href: "future-health.html#management" },
        { en: "Health Assessment", zh: "健康評估", tagline: "從第一次的諮詢，到後續的每次關心", desc: "清楚說明每一步的目的與安排，讓您了解評估結果，也能參與計畫的討論。", href: "future-health.html#assessment" },
        { en: "Medical Team", zh: "醫療團隊", tagline: "各有所長，彼此協作", desc: "依您的需求，由相關醫師提供評估與診療，必要時安排跨領域討論或轉介。", href: "future-health.html#team" },
        { en: "Personalized Health Plan", zh: "專屬健康計畫", tagline: "將需要關注的事，整理成一份清楚的計畫", desc: "依醫師評估，整合不同專業與服務項目，讓各項安排有所銜接。", href: "future-health.html#programs" }
      ]
    },
    {
      key: "gallery", en: "BEAUTY CONCEPT GALLERY", zh: "美的概念館", href: "gallery.html",
      quote: "讓目光為美停留<br>讓美學走進生活",
      quoteSource: "GAIAN Gallery",
      image: "images/gallery/gallery-hero.jpg",
      items: [
        { en: "Art & Life", zh: "藝術與生活", tagline: "從觀看，到感受", desc: "藝術存在於展出的作品，也藏在家具的線條、瓷器的觸感與珠寶的細節裡。", href: "gallery.html#art-life" },
        { en: "The Idea of Beauty", zh: "美的本質", tagline: "從外在美感，延伸至整體生活", desc: "我們欣賞外表的細緻，也重視身體、心境與文化涵養所展現的氣韻。", href: "gallery.html#philosophy" },
        { en: "Every Object Has A Story", zh: "生活品味", tagline: "作品背後，有值得細讀的故事", desc: "珠寶・瓷藝・家具・藝術收藏", href: "gallery.html#collection" },
        { en: "Beauty, Inside & Out", zh: "由內而外的美", tagline: "關愛內在，也講究生活的每一處細節", desc: "回應身體所需，也珍藏日常所愛。", href: "gallery.html#inside-out" },
        { en: "Curated Living", zh: "生活選品", tagline: "從理念出發，為品味而選", desc: "我們重視設計、材質、工藝與使用感受，選擇值得長久欣賞，也能融入日常的作品與用品。", href: "gallery.html#curation" }
      ]
    },
    {
      key: "journal", en: "JOURNAL", zh: "品牌觀點", href: "journal.html",
      quote: "多一份理解<br>多一份選擇的依據",
      quoteSource: "GAIAN Journal",
      image: "images/journal/jn-00-hero.jpg",
      items: [
        { en: "Future Health", zh: "未來健康", tagline: "認識進展，也看見長遠影響", desc: "關注預防醫學、整合醫學與長壽科學，探討新觀念如何影響健康管理。", href: "journal.html#future-health" },
        { en: "Lifestyle", zh: "生活方式", tagline: "從日常習慣，找到調整的空間", desc: "分享睡眠、飲食、運動與壓力調適知識，讓改變有方法，也能考量個人的生活安排。", href: "journal.html#lifestyle" },
        { en: "Medical Insights", zh: "醫療科普", tagline: "看懂症狀，了解診療選擇", desc: "透過醫師觀點，說明常見症狀、評估方式與診療原則，整理諮詢時值得提出的問題。", href: "journal.html#medical" },
        { en: "Health & Beauty", zh: "健康美學", tagline: "從肌膚到美感，了解選擇背後的知識", desc: "介紹肌膚保養、草本研發與醫學美容，認識不同方式的用途、適用條件與差異。", href: "journal.html#beauty" },
        { en: "People & Place", zh: "場域與人物", tagline: "聽見品牌背後的故事", desc: "透過醫療團隊、藝術創作者與品牌夥伴的分享，記錄作品的誕生、空間的設計與服務中的細心。", href: "journal.html#story" }
      ]
    },
    {
      key: "walking-together", en: "WALKING TOGETHER", zh: "同行者", href: "walking-together.html",
      quote: "與您<br>一路同行",
      quoteSource: "GAIAN Walking Together",
      image: "images/walking-together/wt-00-hero.jpg",
      imagePos: "68% center",
      items: [
        { en: "Our Belief", zh: "同行理念", tagline: "信任，累積在每次回應之中", desc: "同行，是在您提出疑問時有人回應，在需要安排時有人協助，也在計畫調整時，願意再次聆聽您的想法。", href: "walking-together.html#belief" },
        { en: "The Journey", zh: "健康旅程", tagline: "生活有所改變，計畫也應隨之調整", desc: "新的工作安排、不同階段的目標或身體感受，都可能帶來新的需要。", href: "walking-together.html#journey" },
        { en: "Personalized Support", zh: "一對一陪伴與規劃", tagline: "專人協助，每項安排都有回應", desc: "由健康顧問協助聯繫與流程安排，專業醫師提供醫療判斷，讓您清楚知道接下來的安排。", href: "walking-together.html#advisor" },
        { en: "Corporate Partnerships", zh: "企業同行", tagline: "把健康議題，帶進團隊交流", desc: "依企業需求，討論健康教育、專題講座與交流活動。", href: "walking-together.html#corporate" },
        { en: "Private Gatherings", zh: "私享活動", tagline: "在相聚之間，交換觀點與靈感", desc: "以健康、藝術與文化為主題，規劃小型交流與專題活動。", href: "walking-together.html#events" }
      ]
    }
  ]
};
