/*
  ABOUT GAIAN 頁專屬動畫（2026-10-14）
  只在 about.html 載入。純原生 JavaScript，不依賴 GSAP。

  1. [data-animate] 區塊（品牌血緣、信念如何落地、品牌世界觀）：進入視野時加上 .in-view，
     由 css/about.css 依序播放金線與節點動畫。
  2. [data-parallax] 照片：捲動時以極小幅度上下位移，製造景深（品牌故事拱門、金句水面帶）。
  3. 品牌理念：捲到哪一條，左側畫框就切換到對應的圖，並點亮該條理念。

  系統設定「減少動態」時：1 直接顯示最終狀態、2 不執行、3 仍會切換圖片但不做過場。
*/
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- 1. 區塊進場 ---------- */
  var blocks = document.querySelectorAll('[data-animate]');
  if (!hasIO || reduceMotion) {
    blocks.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
    blocks.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. 照片視差 ---------- */
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (layers.length && !reduceMotion) {
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var host = el.parentElement;
        var r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        // 區塊中心對齊畫面中心時位移為 0，往上下各自偏移
        var offset = (r.top + r.height / 2 - vh / 2) * speed * -1;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- 3. 品牌理念：畫框跟著閱讀位置切換 ---------- */
  var layout = document.querySelector('.ph-layout');
  if (layout && hasIO) {
    var items = layout.querySelectorAll('.ph-item');
    var imgs = layout.querySelectorAll('.ph-img');
    var counter = document.getElementById('phCurrent');

    function activate(idx) {
      items.forEach(function (it) { it.classList.toggle('is-active', it.getAttribute('data-ph') === idx); });
      imgs.forEach(function (im) { im.classList.toggle('is-active', im.getAttribute('data-ph') === idx); });
      if (counter) counter.textContent = '0' + (parseInt(idx, 10) + 1);
    }

    // 以畫面中央一條細帶作為「正在讀」的判定位置
    var phIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target.getAttribute('data-ph'));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    items.forEach(function (it) { phIO.observe(it); });

    // 只有當理念區塊在畫面中時，才把其他條目調淡（避免一進頁面就有半透明文字）
    var zoneIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        layout.classList.toggle('is-tracking', entry.isIntersecting && entry.intersectionRatio > 0.35);
      });
    }, { threshold: [0, 0.35, 0.6] });
    zoneIO.observe(layout);

    activate('0');
  }
})();

/* ---------- 4. 結尾的門：隨捲動打開（2026-10-17 深夜） ----------
   區塊頂端進入畫面下緣時 --open = 0（門縫），捲到區塊佔滿畫面時 --open = 1（門開）。
   打開超過 55% 時加上 .is-open，文字依序浮現。 */
(function () {
  var door = document.querySelector('.ab-door');
  if (!door) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { door.style.setProperty('--open', 1); door.classList.add('is-open'); return; }
  var ticking = false;
  function update() {
    var vh = window.innerHeight, r = door.getBoundingClientRect();
    var p = (vh * 0.9 - r.top) / (vh * 0.9);
    p = Math.max(0, Math.min(1, p));
    var e = p * p * (3 - 2 * p); // 平滑：一開始慢慢推開、接近全開時放慢
    door.style.setProperty('--open', e.toFixed(3));
    if (e > 0.6) door.classList.add('is-open');
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* ---------- 5. 金句水景：有影片就播放影片 ---------- */
(function () {
  var media = document.querySelector('.quote-band-media');
  var v = media && media.querySelector('.qb-video');
  if (!v) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
  function ok() { media.classList.add('has-video'); }
  v.addEventListener('loadeddata', ok);
  if (v.readyState >= 2) ok();
})();
