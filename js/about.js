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

  /* ---------- 2b. 品牌血緣（手機）：依卡片實際位置畫出「一分為二」的連接線 ---------- */
  (function () {
    var tree = document.querySelector('.brand-tree');
    if (!tree) return;
    var root = tree.querySelector('.bt-root'), cards = tree.querySelectorAll('.bt-card');
    if (cards.length < 2) return;  // 2026-11-18：上方 GAIA 根節點已拿掉時，金線從區塊頂端（標題下方）開始
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'bt-mlines'); svg.setAttribute('aria-hidden', 'true');
    tree.appendChild(svg);
    var mq = window.matchMedia('(max-width:860px)');
    function el(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); svg.appendChild(e); return e; }
    function draw() {
      svg.innerHTML = '';
      if (!mq.matches) return;
      var t = tree.getBoundingClientRect(), r = root ? root.getBoundingClientRect() : null;
      function box(c) {  // 扣掉進場動畫的位移，取卡片最終位置
        var b = c.getBoundingClientRect(), m = getComputedStyle(c).transform, dy = 0;
        if (m && m !== 'none') { var v = m.match(/-?[\d.]+/g); dy = parseFloat(v[v.length - 1]) || 0; }
        return { top: b.top - dy, left: b.left, right: b.right };
      }
      var c1 = box(cards[0]), c2 = box(cards[1]);
      var W = t.width, H = t.height, cx = W / 2;
      var y0 = r ? r.bottom - t.top + 14 : 0, ys = c1.top - t.top - 30, k = 16;
      var gl = Math.max(6, (c1.left - t.left) - 12), gr = Math.min(W - 6, (c1.right - t.left) + 12);
      var m1 = c1.top - t.top + 96, m2 = c2.top - t.top + 96;
      var x1 = c1.left - t.left + 1, x2 = c2.right - t.left - 1;
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.style.height = H + 'px';
      el('path', { 'class': 'ml-trunk', pathLength: 1, d: 'M' + cx + ' ' + y0 + ' V' + ys });
      el('path', { 'class': 'ml-l', pathLength: 1, d: 'M' + cx + ' ' + ys + ' Q' + cx + ' ' + (ys + k) + ' ' + (cx - k) + ' ' + (ys + k) +
        ' H' + (gl + k) + ' Q' + gl + ' ' + (ys + k) + ' ' + gl + ' ' + (ys + 2 * k) + ' V' + m1 + ' H' + x1 });
      el('path', { 'class': 'ml-r', pathLength: 1, d: 'M' + cx + ' ' + ys + ' Q' + cx + ' ' + (ys + k) + ' ' + (cx + k) + ' ' + (ys + k) +
        ' H' + (gr - k) + ' Q' + gr + ' ' + (ys + k) + ' ' + gr + ' ' + (ys + 2 * k) + ' V' + m2 + ' H' + x2 });
      el('rect', { 'class': 'ml-n0', x: cx - 4, y: ys - 4, width: 8, height: 8 });
      el('rect', { 'class': 'ml-n1', x: x1 - 4, y: m1 - 4, width: 8, height: 8 });
      el('rect', { 'class': 'ml-n2', x: x2 - 4, y: m2 - 4, width: 8, height: 8 });
    }
    draw();
    window.addEventListener('resize', draw);
    window.addEventListener('load', draw);
    tree.querySelectorAll('img').forEach(function (im) { if (!im.complete) im.addEventListener('load', draw); });
  })();

  /* ---------- 3a. 品牌理念（手機）：每一條理念上方複製一張對應的圖，畫框在手機不顯示 ---------- */
  document.querySelectorAll('.ph-layout .ph-item').forEach(function (it) {
    var src = document.querySelector('.ph-img[data-ph="' + it.getAttribute('data-ph') + '"]');
    if (!src || it.querySelector('.ph-m-img')) return;
    var fig = document.createElement('figure');
    fig.className = 'ph-m-img';
    fig.setAttribute('aria-hidden', 'true');
    var im = document.createElement('img');
    im.src = src.getAttribute('src'); im.alt = ''; im.loading = 'lazy';
    fig.appendChild(im);
    it.insertBefore(fig, it.firstChild);
  });

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
