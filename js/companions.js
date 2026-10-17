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

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  goTo(current);
})();
