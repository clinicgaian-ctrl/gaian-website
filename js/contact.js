/* 開始旅程頁：區塊進入視野時，上方金線垂落、節點點亮；電話兩側金線展開；三聯屏依序升起（2026-10-18） */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.ct-sec, .ct-node, .ct-triptych, .ct-phone');
  if (!('IntersectionObserver' in window) || reduce) { els.forEach(function (e) { e.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach(function (e) { io.observe(e); });
})();

/* 推門入殿影片：進入畫面才播放一次並停在最後一格；大門一開、鏡頭進入殿堂（約第 4 秒）就讓 Logo 浮現，並放慢後段播放速度，讓畫面與 Logo 停留更久 */
(function () {
  var sec = document.querySelector('.ct-film'); if (!sec) return;
  var v = sec.querySelector('video'), ARRIVE = 4.0, played = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function arrive() {
    if (sec.classList.contains('is-arrived')) return;
    sec.classList.add('is-arrived');
    if (!v.ended) v.playbackRate = 0.55;
  }
  if (reduce) { v.setAttribute('poster', 'images/contact/contact-gate-end.jpg'); arrive(); return; }
  v.addEventListener('timeupdate', function () { if (v.currentTime >= ARRIVE) arrive(); });
  v.addEventListener('ended', arrive);
  if (!('IntersectionObserver' in window)) { var p = v.play(); if (p && p.catch) p.catch(arrive); return; }
  new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (e.isIntersecting && !played) {
        played = true; v.preload = 'auto';
        var p = v.play(); if (p && p.catch) p.catch(function () { v.setAttribute('poster', 'images/contact/contact-gate-end.jpg'); arrive(); });
      }
    });
  }, { threshold: 0.55 }).observe(sec);
})();
