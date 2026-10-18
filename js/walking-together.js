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
  var total = 0, stops = [], samples = [];

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
    var mobile = window.innerWidth <= 760;
    if (mobile) {
      /* 手機（2026-10-19）：照片在上、文字在下，直線會穿過文字。
         改成從照片下方彎到左側留白處，沿著文字左緣往下，再彎回下一張照片上方，線不壓字。 */
      /* 金線左右交替：01 走左側、02 走右側⋯，文字往金線的反方向讓出空間 */
      var c0 = cards[0].getBoundingClientRect();
      var gL = Math.max(4, (c0.left - lr.left) - 14), gR = Math.min(W - 4, (c0.right - lr.left) + 14);
      for (var j = 0; j < pts.length; j++) {
        var A = pts[j], B = pts[j + 1], g = j % 2 ? gR : gL;
        if (!B) break;  // 最後一段（健康紀錄）下方不再延伸，避免壓到文字
        var s1 = A.bot + 14, s2 = A.bot + 40;
        // 用 L 穿過照片（照片蓋在線上方看不到），整條線保持連續，動畫才會依序往下畫
        d += ' L ' + A.x + ' ' + s1 + ' C ' + A.x + ' ' + (s1 + 16) + ', ' + g + ' ' + (s2 - 18) + ', ' + g + ' ' + (s2 + 8);
        var e2 = B.top - 18, e1 = e2 - 46;
        d += ' L ' + g + ' ' + e1 + ' C ' + g + ' ' + (e1 + 26) + ', ' + B.x + ' ' + (e2 - 22) + ', ' + B.x + ' ' + e2;
        marks.push({ x: B.x, y: e2 });
      }
    } else {
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var y1 = a.bot + 18, y2 = b.top - 18, mid = (y1 + y2) / 2;
      d += ' L ' + a.x + ' ' + y1 + ' C ' + a.x + ' ' + mid + ', ' + b.x + ' ' + mid + ', ' + b.x + ' ' + y2;
      marks.push({ x: b.x, y: y2 });
    }
    var last = pts[pts.length - 1];
    d += ' L ' + last.x + ' ' + (last.bot + 18) + ' L ' + last.x + ' ' + Math.min(H, last.bot + 80);
    }
    base.setAttribute('d', d); line.setAttribute('d', d);
    // 遮罩：照片範圍內不畫線（照片還在淡入時，線也不會露在照片上）
    var mid = 'wtThreadMask';
    var old = svg.querySelector('mask'); if (old) old.remove();
    var mk = document.createElementNS(NS, 'mask'); mk.setAttribute('id', mid); mk.setAttribute('maskUnits', 'userSpaceOnUse');
    mk.setAttribute('x', 0); mk.setAttribute('y', 0); mk.setAttribute('width', W); mk.setAttribute('height', H);
    var bg = document.createElementNS(NS, 'rect'); bg.setAttribute('width', W); bg.setAttribute('height', H); bg.setAttribute('fill', '#fff'); mk.appendChild(bg);
    cards.forEach(function (c) {
      var r = c.querySelector('.wt-arch').getBoundingClientRect();
      var m = getComputedStyle(c.querySelector('.wt-arch')).transform, off = 0;
      if (m && m !== 'none') { var v = m.match(/-?[\d.]+/g); off = parseFloat(v[v.length - 1]) || 0; }
      var k = document.createElementNS(NS, 'rect');
      k.setAttribute('x', r.left - lr.left); k.setAttribute('y', r.top - lr.top - off);
      k.setAttribute('width', r.width); k.setAttribute('height', r.height); k.setAttribute('fill', '#000');
      mk.appendChild(k);
    });
    svg.insertBefore(mk, svg.firstChild);
    base.setAttribute('mask', 'url(#' + mid + ')'); line.setAttribute('mask', 'url(#' + mid + ')');
    total = line.getTotalLength();
    line.style.strokeDasharray = total; line.style.strokeDashoffset = total;
    // 取樣：線上每一點的高度，捲動時讓線頭剛好停在畫面同一個高度（不會上段還沒到、下段先出現）
    samples = [];
    for (var sL = 0; sL <= total; sL += 4) samples.push([sL, line.getPointAtLength(sL).y]);
    samples.push([total, line.getPointAtLength(total).y]);
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
    var L;
    if (reduce) L = total;
    else {
      var ty = vh * 0.62 - lr.top, hi = 0;
      while (hi < samples.length && samples[hi][1] <= ty) hi++;  // 線上高度已經捲過的部分
      L = hi === 0 ? 0 : samples[hi - 1][0];
    }
    // 照片還沒出現前，線停在該張照片上方的節點等待
    for (var ci = 0; ci < cards.length; ci++) {
      if (!cards[ci].classList.contains('in-view') && stops[ci] != null) { L = Math.min(L, stops[ci]); break; }
    }
    var p = L / total;
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
  // 卡片淡入（加上 .in-view）時立即更新，讓線接著往下走
  if (window.MutationObserver) {
    var mo = new MutationObserver(function () { update(); });
    cards.forEach(function (c) { mo.observe(c, { attributes: true, attributeFilter: ['class'] }); });
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); } }, { passive: true });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
  window.addEventListener('load', build);
  if (document.readyState === 'complete') build(); else setTimeout(build, 300);
})();
