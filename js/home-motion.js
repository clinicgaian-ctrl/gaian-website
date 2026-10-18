/* 首頁串場（2026-10-18）：區塊進入視野時加上 .hm-in
   - 區塊之間的金線往下垂落
   - 各區英文小標字距展開
   - 結尾照片緩慢推近 */
(function () {
  var els = document.querySelectorAll('.hm-thread, .section-head, .people-intro, .core-card');
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
    if (v.classList.contains('hero-video')) { v.playbackRate = 1.25; v.addEventListener('loadedmetadata', function () { v.playbackRate = 1.25; }); }  // 首圖窗簾飄動稍快一點
    if (v.classList.contains('hm-cta-video') && 'IntersectionObserver' in window) {
      v.removeAttribute('autoplay'); v.pause();
      new IntersectionObserver(function (en) {
        en.forEach(function (e) { e.isIntersecting ? play(v) : v.pause(); });
      }, { threshold: 0.1 }).observe(v);
    } else play(v);
  });
})();

/* 手機版疊卡轉場（2026-10-19）：理念引言（#team）停住，醫療領域（#disciplines）從下方滑上覆蓋；被蓋住的一層同時微縮、變暗 */
(function () {
  var pair = document.querySelector('.stack-pair'); if (!pair) return;
  var back = document.getElementById('team'), front = document.getElementById('disciplines');
  if (!back || !front) return;
  var mq = window.matchMedia('(max-width:760px)');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size() {
    // 被覆蓋的區塊比畫面高時，讓它在「底部對齊畫面」時才停住，內容不會被切掉
    back.style.setProperty('--stk-top', Math.min(0, window.innerHeight - back.offsetHeight) + 'px');
    tick();
  }
  function tick() {
    if (!mq.matches || reduce) { back.style.setProperty('--stk-p', 0); return; }
    var vh = window.innerHeight, t = front.getBoundingClientRect().top;
    var p = Math.max(0, Math.min(1, (vh - t) / vh));
    back.style.setProperty('--stk-p', p.toFixed(3));
  }
  var raf = 0;
  window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; tick(); }); }, { passive: true });
  window.addEventListener('resize', size);
  window.addEventListener('load', size);
  size();
})();
