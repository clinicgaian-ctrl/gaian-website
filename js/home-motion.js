/* 首頁串場（2026-10-18）：區塊進入視野時加上 .hm-in
   - 區塊之間的金線往下垂落
   - 各區英文小標字距展開
   - 結尾照片緩慢推近 */
(function () {
  var els = document.querySelectorAll('.hm-thread, .section-head, .people-intro');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('hm-in'); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('hm-in'); io.unobserve(e.target); } });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (e) { io.observe(e); });
})();

/* 首屏與結尾影片：減少動態偏好時停在第一格（顯示封面）；結尾影片進入畫面才播放 */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function play(v) { var p = v.play && v.play(); if (p && p.catch) p.catch(function () {}); }
  document.querySelectorAll('.hero-video, .hm-cta-video').forEach(function (v) {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    if (v.classList.contains('hm-cta-video') && 'IntersectionObserver' in window) {
      v.removeAttribute('autoplay'); v.pause();
      new IntersectionObserver(function (en) {
        en.forEach(function (e) { e.isIntersecting ? play(v) : v.pause(); });
      }, { threshold: 0.1 }).observe(v);
    } else play(v);
  });
})();
