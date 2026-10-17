/*
  JOURNAL 頁動畫（2026-10-18）
  [data-animate]（編輯準則、五個分類、結尾書寫）進入畫面時加上 .in-view，由 css/journal.css 播放。
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
