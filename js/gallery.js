/*
  BEAUTY CONCEPT GALLERY 頁動畫（2026-10-17）
  [data-animate] 區塊（作品打光、行星軌道、由內而外）進入畫面時加上 .in-view，
  由 css/gallery.css 播放動畫。系統設定「減少動態」時直接顯示最終狀態。
*/
(function () {
  var els = document.querySelectorAll('[data-animate]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  els.forEach(function (el) { io.observe(el); });
})();

/* 捲動視差（2026-10-17 夜）：Hero 背景與結語星空隨捲動緩慢位移，比內容慢一點，製造景深 */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var items = [
    { el: document.querySelector('.gl-hero-bg'), k: 0.25 },
    { el: document.querySelector('.gl-cl-sky'), k: 0.18 }
  ].filter(function (o) { return o.el; });
  var ticking = false;
  function update() {
    var vh = window.innerHeight;
    items.forEach(function (o) {
      var box = o.el.parentNode.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return;
      var offset = (box.top + box.height / 2 - vh / 2) * -o.k;
      o.el.style.setProperty('--py', offset.toFixed(1) + 'px');
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/* 全頁連貫背景（2026-10-17 深夜）
   參考 GAIA Torah 官網「背景一路連貫」的感覺，但改用 GAIAN 的金色語彙：
   三條金色絲帶（每條由多根細金線組成，像 Eternal Zenith 包裝上的金色波紋）＋柔焦金色光暈。
   畫在固定於畫面後方的 canvas 上，捲動時絲帶跟著流動、微塵有前後景深，所以整頁感覺是同一片背景。 */
(function () {
  var cv = document.querySelector('.gl-aura');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W, H, dpr, mobile, dust = [];
  var ribbons = [
    { y: 0.30, amp: 70, f: 0.0032, sp: 0.00022, tilt: 0.16, lines: 16, gap: 5.5, ph: 0.0, a: 0.26 },
    { y: 0.68, amp: 90, f: 0.0024, sp: 0.00017, tilt: -0.12, lines: 13, gap: 6.5, ph: 2.1, a: 0.20 },
    { y: 0.52, amp: 50, f: 0.0042, sp: 0.00028, tilt: 0.05, lines: 9, gap: 4.5, ph: 4.0, a: 0.14 }
  ];
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth; H = window.innerHeight; mobile = W < 700;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = mobile ? 22 : 42; dust = [];
    for (var i = 0; i < n; i++) dust.push({ x: Math.random(), y: Math.random(), z: 0.2 + Math.random() * 0.8,
      r: 0.6 + Math.random() * 1.6, v: 0.004 + Math.random() * 0.01, p: Math.random() * 6.28 });
  }
  function draw(t) {
    var sc = window.scrollY || 0;
    ctx.clearRect(0, 0, W, H);
    var step = mobile ? 26 : 20;
    ribbons.forEach(function (rb, k) {
      var g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, 'rgba(201,164,96,0)');
      g.addColorStop(0.25, 'rgba(201,164,96,1)');
      g.addColorStop(0.75, 'rgba(217,188,129,1)');
      g.addColorStop(1, 'rgba(201,164,96,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 0.8;
      var phase = rb.ph + t * rb.sp + sc * 0.0016 * (k % 2 ? -1 : 1);
      var base = H * rb.y + Math.sin(sc * 0.0009 + k * 1.7) * H * 0.12;
      var nl = mobile ? Math.ceil(rb.lines * 0.6) : rb.lines;
      for (var i = 0; i < nl; i++) {
        var mid = 1 - Math.abs(i - (nl - 1) / 2) / ((nl - 1) / 2 + 0.001);
        ctx.globalAlpha = rb.a * (0.35 + 0.65 * mid);
        ctx.beginPath();
        for (var x = -40; x <= W + 40; x += step) {
          var spread = 1 + 0.6 * Math.sin(x * rb.f * 0.7 + phase * 0.8);
          var y = base + (x - W / 2) * rb.tilt + Math.sin(x * rb.f + phase + i * 0.05) * rb.amp + (i - nl / 2) * rb.gap * spread;
          x === -40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    });
    dust.forEach(function (d) {
      var y = ((d.y * H - sc * d.z * 0.35 - t * d.v * d.z) % (H + 20) + H + 20) % (H + 20) - 10;
      var x = d.x * W + Math.sin(t * 0.0003 + d.p) * 14 * d.z;
      // 柔焦金色光暈（不是銳利的星點）
      var rr = (d.r * 2.2 + 1.5) * d.z + 1.5;
      var gd = ctx.createRadialGradient(x, y, 0, x, y, rr);
      gd.addColorStop(0, 'rgba(232,206,150,0.55)');
      gd.addColorStop(0.45, 'rgba(217,188,129,0.22)');
      gd.addColorStop(1, 'rgba(217,188,129,0)');
      ctx.globalAlpha = (0.35 + 0.45 * d.z) * (0.8 + 0.2 * Math.sin(t * 0.0006 + d.p));
      ctx.fillStyle = gd;
      ctx.beginPath(); ctx.arc(x, y, rr, 0, 6.283); ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  size();
  window.addEventListener('resize', size);
  if (reduce) { draw(0); window.addEventListener('scroll', function () { draw(0); }, { passive: true }); return; }
  var last = 0;
  function loop(t) {
    if (!document.hidden && t - last > 30) { draw(t); last = t; }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
