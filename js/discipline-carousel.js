/* 首頁「每一項專業」六大醫療領域（2026-10-19 改版）
   不再用按鈕切換，改為自動往左緩緩流動、無縫循環的跑馬燈（參考 esenmedical.com「更多真實照護」）。
   做法：複製一份卡片接在後面，整條往左移動一半距離後瞬間回到起點，視覺上永不中斷。
   滑鼠停在卡片上或手指按住時暫停；系統設定「減少動態」時不自動流動，改為可左右滑動。 */
(function () {
  var track = document.getElementById('disciplineTrack');
  if (!track) return;
  var wrap = track.parentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { wrap.classList.add('is-static'); return; }

  var cards = Array.prototype.slice.call(track.children);
  cards.forEach(function (c) {
    var k = c.cloneNode(true);
    k.setAttribute('aria-hidden', 'true');
    k.setAttribute('tabindex', '-1');
    k.querySelectorAll('img').forEach(function (im) { im.alt = ''; });
    track.appendChild(k);
  });

  var SPEED = 80; // 每秒移動的像素
  function setDuration() {
    var half = track.scrollWidth / 2;
    track.style.setProperty('--disc-dur', Math.max(12, half / SPEED).toFixed(1) + 's');
  }
  wrap.classList.add('is-marquee');
  setDuration();
  window.addEventListener('load', setDuration);
  window.addEventListener('resize', setDuration);

  wrap.addEventListener('touchstart', function () { wrap.classList.add('is-paused'); }, { passive: true });
  wrap.addEventListener('touchend', function () { setTimeout(function () { wrap.classList.remove('is-paused'); }, 1200); }, { passive: true });
})();
