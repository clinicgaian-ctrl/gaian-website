/*
  WALKING TOGETHER 頁動畫（2026-10-17）
  [data-animate]（專屬顧問三段）進入畫面時加上 .in-view，由 css/walking-together.css 播放。
  系統設定「減少動態」時直接顯示最終狀態。
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
  }, { threshold: 0.25 });
  els.forEach(function (el) { io.observe(el); });
})();

/* 專屬顧問四段：串連金線（2026-10-18）
   一條金線從大標下方出發，依序穿過 01→02→03→04 的照片（左右交錯形成 S 形），
   隨捲動往下畫出；線頭有一顆發光金點，經過每段照片時，該段的節點亮起。
   路徑依實際版面位置計算，視窗縮放時會重算；手機版照片置中，線條自動變成直線往下。 */
(function () {
  var list = document.querySelector('.wt-list');
  if (!list) return;
  var cards = list.querySelectorAll('.wt-card');
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'wt-thread');
  svg.setAttribute('aria-hidden', 'true');
  var base = document.createElementNS(NS, 'path'); base.setAttribute('class', 'wt-thread-base');
  var line = document.createElementNS(NS, 'path'); line.setAttribute('class', 'wt-thread-line');
  var dot = document.createElementNS(NS, 'circle'); dot.setAttribute('class', 'wt-thread-dot'); dot.setAttribute('r', '4');
  svg.appendChild(base); svg.appendChild(line);
  var nodes = [];
  svg.appendChild(dot);
  list.appendChild(svg);  // 放在最後，避免影響卡片的 nth-child 左右交錯
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var total = 0, stops = [];

  function build() {
    var lr = list.getBoundingClientRect();
    var W = lr.width, H = lr.height;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    var pts = [];
    cards.forEach(function (c) {
      var r = c.querySelector('.wt-arch').getBoundingClientRect();
      var cx = r.left + r.width / 2 - lr.left;
      pts.push({ x: cx, top: r.top - lr.top, bot: r.bottom - lr.top });
    });
    var d = 'M ' + pts[0].x + ' ' + Math.max(0, pts[0].top - 90) + ' L ' + pts[0].x + ' ' + (pts[0].top - 18);
    var marks = [{ x: pts[0].x, y: pts[0].top - 18 }];
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var y1 = a.bot + 18, y2 = b.top - 18, mid = (y1 + y2) / 2;
      d += ' M ' + a.x + ' ' + y1 + ' C ' + a.x + ' ' + mid + ', ' + b.x + ' ' + mid + ', ' + b.x + ' ' + y2;
      marks.push({ x: b.x, y: y2 });
    }
    var last = pts[pts.length - 1];
    d += ' M ' + last.x + ' ' + (last.bot + 18) + ' L ' + last.x + ' ' + Math.min(H, last.bot + 80);
    base.setAttribute('d', d); line.setAttribute('d', d);
    total = line.getTotalLength();
    line.style.strokeDasharray = total; line.style.strokeDashoffset = total;
    // 節點：每段照片上方一顆
    nodes.forEach(function (n) { n.remove(); }); nodes = [];
    stops = [];
    marks.forEach(function (m) {
      var n = document.createElementNS(NS, 'circle'); n.setAttribute('class', 'wt-thread-node');
      n.setAttribute('cx', m.x); n.setAttribute('cy', m.y); n.setAttribute('r', '5');
      svg.insertBefore(n, dot); nodes.push(n);
      // 找出這個節點在整條線上的長度位置
      var best = 0, bd = 1e9;
      for (var L = 0; L <= total; L += 6) {
        var p = line.getPointAtLength(L), dd = Math.abs(p.x - m.x) + Math.abs(p.y - m.y);
        if (dd < bd) { bd = dd; best = L; }
      }
      stops.push(best);
    });
    update();
  }
  function update() {
    if (!total) return;
    var lr = list.getBoundingClientRect(), vh = window.innerHeight;
    var p = reduce ? 1 : (vh * 0.62 - lr.top) / lr.height;
    p = Math.max(0, Math.min(1, p));
    var L = total * p;
    line.style.strokeDashoffset = total - L;
    var pt = line.getPointAtLength(Math.max(0.1, L));
    dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
    dot.style.opacity = (p > 0.002 && p < 0.998) ? 1 : 0;
    nodes.forEach(function (n, i) {
      var on = L >= stops[i] - 2;
      n.classList.toggle('is-on', on);
      if (cards[i]) cards[i].classList.toggle('is-reached', on);
    });
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); } }, { passive: true });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
  window.addEventListener('load', build);
  if (document.readyState === 'complete') build(); else setTimeout(build, 300);
})();
