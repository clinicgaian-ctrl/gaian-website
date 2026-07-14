/*
  GAIAN 全站導覽資料（單一資料來源）
  修改這個檔案，所有頁面的導覽與 Mega Menu 會一併更新（由 js/nav.js 讀取渲染）。
  About / Journal / Walking Together 的 5 項內容為草稿，待品牌方確認定稿。
*/
window.GAIAN_NAV = {
  logoTagline: "FUTURE HEALTH & ELEVATED LIVING",
  utility: [
    { label: "會員登入｜VIC", href: "walking-together.html" },
    { label: "中 / EN", href: "#", lang: true }
  ],
  reserve: { label: "RESERVATION 開始旅程", href: "contact.html" },
  items: [
    { key: "home", en: "HOME", zh: "首頁", href: "index.html" },
    {
      key: "about", en: "ABOUT GAIAN", zh: "關於 GAIAN", href: "about.html",
      quote: "不只是一個品牌，<br>而是一種重新理解健康的信念。",
      quoteSource: "GAIAN Philosophy",
      image: "images/about-corridor.png",
      items: [
        { en: "Brand Story", zh: "品牌故事", tagline: "從 GAIA 到 GAIAN", desc: "一段關於重新理解健康的品牌起源。", href: "about.html#story" },
        { en: "GAIA × GAIAN", zh: "品牌血緣", tagline: "品牌宇宙中的實踐場域", desc: "GAIAN 是 GAIA 品牌宇宙中，專注於未來健康的一個章節。", href: "about.html#gaia" },
        { en: "Philosophy", zh: "品牌理念", tagline: "健康，不是美的附屬", desc: "身體、情緒、環境與生活共同達成的平衡，才是真正的健康。", href: "about.html#philosophy" },
        { en: "Worldview", zh: "品牌世界觀", tagline: "重新思考健康擁有的樣貌", desc: "整合醫學、美學、藝術與生活方式的交會。", href: "about.html#worldview" },
        { en: "Vision", zh: "未來願景", tagline: "為未來，建立更穩定的自己", desc: "陪伴每一位訪者，建立屬於自己的健康場域。", href: "about.html#vision" }
      ]
    },
    {
      key: "future-health", en: "FUTURE HEALTH", zh: "未來健康", href: "future-health.html",
      quote: "醫學，不只是治療，<br>更是重新理解生命。",
      quoteSource: "GAIAN Philosophy",
      image: "images/hero-arch.png",
      items: [
        { en: "Integrative Medicine", zh: "整合醫學", tagline: "重新理解醫學，從整體出發", desc: "GAIAN 整合中西醫學、功能醫學與生活醫學，從根本理解身體的需求，不只治療疾病，而是陪伴每一個人走向真正的健康與平衡。", href: "future-health.html#integrative" },
        { en: "Health Management", zh: "健康管理", tagline: "讓健康，成為可以被管理的日常", desc: "從睡眠、壓力、疼痛到營養，建立長期追蹤與調整的健康管理機制，而不是等問題發生才處理。", href: "future-health.html#management" },
        { en: "Health Assessment", zh: "健康評估", tagline: "建立完整、可追蹤的健康輪廓", desc: "透過系統化評估，找出身體真正需要被理解的訊號，作為個人化健康計畫的起點。", href: "future-health.html#assessment" },
        { en: "Medical Team", zh: "醫療團隊", tagline: "每一次理解身體，都需要專業同行", desc: "中西醫整合、跨專科合作，陪伴每一位訪者，看見更完整的自己。", href: "future-health.html#team" },
        { en: "Programs", zh: "健康方案", tagline: "從睡眠到女性健康，打造個人化方案", desc: "涵蓋睡眠、壓力、疼痛、落髮、女性健康、靜脈營養等專項方案，依個人需求量身規劃。", href: "future-health.html#programs" }
      ]
    },
    {
      key: "gallery", en: "BEAUTY CONCEPT GALLERY", zh: "美的概念館", href: "gallery.html",
      quote: "真正的美，<br>是每天都能被感受的生活。",
      quoteSource: "GAIAN Philosophy",
      image: "images/gallery-constellation.png",
      items: [
        { en: "Beauty Philosophy", zh: "美的理念", tagline: "美，是健康最深的根基", desc: "由內而外，重新定義美的樣貌——不是修飾，而是身體與生活重新回到平衡後，自然展現的狀態。", href: "gallery.html#philosophy" },
        { en: "Art & Life", zh: "藝術與生活", tagline: "藝術不是展示，而是每天共處的存在", desc: "當生活開始被美好的事物包圍，感受隨之改變，身心也逐漸回到平衡。", href: "gallery.html#art-life" },
        { en: "Brand Collection", zh: "品牌典藏", tagline: "不是商品，是品牌合作的選物", desc: "珠寶、王俠軍瓷器、家具與藝術收藏，每一件都承載記憶與時間的累積。", href: "gallery.html#collection" },
        { en: "Furniture & Space", zh: "家具與空間", tagline: "一件器物，也能改變一天的感受", desc: "從空間到家具，讓場域本身成為美感體驗的一部分。", href: "gallery.html#furniture" },
        { en: "Art Curation", zh: "藝術策展", tagline: "持續策展，讓美成為日常", desc: "不定期的藝術策展與生活選品更新，讓美的體驗持續發生。", href: "gallery.html#curation" }
      ]
    },
    {
      key: "journal", en: "JOURNAL", zh: "品牌觀點", href: "journal.html",
      quote: "每一次閱讀，<br>都是理解自己的開始。",
      quoteSource: "GAIAN Journal",
      image: "images/gallery-tunnel.png",
      items: [
        { en: "Future Health", zh: "未來健康觀點", tagline: "重新定義健康的核心價值", desc: "分享整合醫學與預防醫學的未來趨勢與觀點。", href: "journal.html#future-health" },
        { en: "Lifestyle", zh: "生活方式", tagline: "讓健康自然融入每一天", desc: "從日常習慣出發，探討生活方式如何形塑長期健康。", href: "journal.html#lifestyle" },
        { en: "Medical", zh: "醫療科普", tagline: "專業內容，用理解取代恐懼", desc: "用淺顯易懂的方式，分享醫療與身體的知識。", href: "journal.html#medical" },
        { en: "Beauty", zh: "健康美學", tagline: "美，是健康的自然結果", desc: "從美學角度重新理解健康與身體的關係。", href: "journal.html#beauty" },
        { en: "Story", zh: "訪者故事", tagline: "每一段旅程，都值得被記錄", desc: "分享訪者與品牌的真實故事與訪談。", href: "journal.html#story" }
      ]
    },
    {
      key: "walking-together", en: "WALKING TOGETHER", zh: "同行者", href: "walking-together.html",
      quote: "我們尋找的，從來不是顧客，<br>而是願意同行的人。",
      quoteSource: "GAIAN Philosophy",
      image: "images/about-corridor.png",
      items: [
        { en: "Our Belief", zh: "同行理念", tagline: "我們尋找的，不是顧客", desc: "而是願意與 GAIAN 一起，走一段重新理解健康旅程的人。", href: "walking-together.html#belief" },
        { en: "The Journey", zh: "健康旅程", tagline: "陪伴，是最長期的承諾", desc: "從第一次理解開始，到建立屬於自己的健康節奏。", href: "walking-together.html#journey" },
        { en: "Dedicated Advisor", zh: "專屬顧問", tagline: "一對一的陪伴與規劃", desc: "為每一位同行者，提供量身訂製的健康顧問服務。", href: "walking-together.html#advisor" },
        { en: "Corporate", zh: "企業同行", tagline: "讓健康，成為團隊文化的一部分", desc: "提供企業健康福利與團隊合作方案。", href: "walking-together.html#corporate" },
        { en: "Private Events", zh: "私享活動", tagline: "不定期的專屬體驗與聚會", desc: "藝術、健康與生活方式交會的私享時刻。", href: "walking-together.html#events" }
      ]
    }
  ]
};
