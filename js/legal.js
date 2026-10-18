/* 法遵頁面：英文大標拆字逐字浮現、各節與分隔線進入視野時浮現、左側目錄標示目前段落（2026-10-18） */
(function () {
  var c = 0;
  document.querySelectorAll('.lg-en span').forEach(function (word) {
    var t = word.textContent; word.textContent = '';
    t.split('').forEach(function (ch) {
      var s = document.createElement('i'); s.className = 'ch'; s.style.setProperty('--c', c++); s.textContent = ch; s.style.fontStyle = 'normal';
      word.appendChild(s);
    });
  });
  document.querySelectorAll('.lg-list').forEach(function (l) { l.querySelectorAll('li').forEach(function (li, i) { li.style.setProperty('--i', i); }); });
  var targets = document.querySelectorAll('.lg-sec, .lg-rule, .lg-end');
  if (!('IntersectionObserver' in window)) { targets.forEach(function (e) { e.classList.add('in-view'); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(function (e) { io.observe(e); });
  var links = document.querySelectorAll('.lg-toc a');
  if (!links.length) return;
  var map = {}; links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (e.isIntersecting) { links.forEach(function (a) { a.classList.remove('is-active'); }); var a = map[e.target.id]; if (a) a.classList.add('is-active'); }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('.lg-sec').forEach(function (s) { spy.observe(s); });
})();

/* 左下角點綴：過了首段才出現、接近頁尾淡出 */
(function () {
  var f = document.querySelector('.lg-float'); if (!f) return;
  var main = document.querySelector('.lg-main'), foot = document.querySelector('footer'), ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    f.classList.toggle('show', main.getBoundingClientRect().top < vh * .6 && foot.getBoundingClientRect().top > vh * .9);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); update();
})();
