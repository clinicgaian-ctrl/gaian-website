/*
  FUTURE HEALTH 頁動畫（2026-10-17）
  只在 future-health.html 載入，純原生 JavaScript。
  - .fh-sweep：「從生活出發⋯」底線半箭頭，進入畫面時劃過
  - [data-animate]：健康評估曲線流程、健康方案插圖，進入畫面時加上 .in-view 播放
  （.reveal／.reveal-photo 的淡入由共用的 js/reveal.js 處理）
*/
(function () {
  var els = document.querySelectorAll('.fh-sweep, [data-animate]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });

  // 健康方案插圖：同一張圖裡的線條依序畫出（第二筆接在第一筆後面）
  document.querySelectorAll('.fh-prog li').forEach(function (li, i) {
    li.querySelectorAll('.fh-prog-icon svg *').forEach(function (p, j) {
      p.style.setProperty('--d', (i * 0.16 + j * 0.35).toFixed(2));
    });
  });
})();
