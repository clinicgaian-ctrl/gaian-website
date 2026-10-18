(function () {
  var slider = document.getElementById('companionSlider');
  if (!slider) return;

  var track = slider.querySelector('.companion-track');
  var slides = Array.prototype.slice.call(slider.querySelectorAll('.companion-slide'));
  var prevBtn = document.getElementById('companionPrev');
  var nextBtn = document.getElementById('companionNext');
  var dotsWrap = document.getElementById('companionDots');
  if (!slides.length) return;

  var current = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
  if (current < 0) current = 0;

  var dots = slides.map(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'companion-dot' + (i === current ? ' is-active' : '');
    dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 位');
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === current);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
    });
    if (track) {
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
    }
  }

  /* 自動輪播（2026-10-19）：每 3 秒換下一位；手動切換後重新計時；
     滑鼠停在醫師上、手指按住、區塊不在畫面中或分頁在背景時暫停 */
  var DELAY = 3000, timer = null, hover = false, visible = true;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() {
    stop();
    if (reduce || hover || !visible || document.hidden) return;
    timer = setInterval(function () { goTo(current + 1); }, DELAY);
  }
  function manual(i) { goTo(i); start(); }

  if (prevBtn) prevBtn.addEventListener('click', function () { manual(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { manual(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { start(); }); });
  slider.addEventListener('mouseenter', function () { hover = true; stop(); });
  slider.addEventListener('mouseleave', function () { hover = false; start(); });
  slider.addEventListener('touchstart', function () { hover = true; stop(); }, { passive: true });
  slider.addEventListener('touchend', function () { hover = false; start(); }, { passive: true });
  document.addEventListener('visibilitychange', start);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; start(); }, { threshold: 0.25 }).observe(slider);
  }

  goTo(current);
  start();
})();
