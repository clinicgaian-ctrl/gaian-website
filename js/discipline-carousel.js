(function () {
  var track = document.getElementById('disciplineTrack');
  if (!track) return;

  var cards = Array.prototype.slice.call(track.children);
  var prevBtn = document.getElementById('disciplinePrev');
  var nextBtn = document.getElementById('disciplineNext');
  var dotsWrap = document.getElementById('disciplineDots');
  if (!cards.length) return;

  var dots = cards.map(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'disc-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 項');
    dot.addEventListener('click', function () { scrollToCard(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function scrollToCard(i) {
    var card = cards[i];
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }

  function updateActive() {
    var trackCenter = track.scrollLeft + track.clientWidth / 2;
    var closest = 0, closestDist = Infinity;
    cards.forEach(function (card, i) {
      var center = card.offsetLeft + card.offsetWidth / 2;
      var dist = Math.abs(center - trackCenter);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === closest); });
  }

  var raf = null;
  track.addEventListener('scroll', function () {
    if (raf) window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(updateActive);
  }, { passive: true });

  if (prevBtn) prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -(cards[0].offsetWidth + 26), behavior: 'smooth' });
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: cards[0].offsetWidth + 26, behavior: 'smooth' });
  });

  updateActive();
})();
