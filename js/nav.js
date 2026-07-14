(function () {
  var data = window.GAIAN_NAV;
  var nav = document.getElementById('mainNav');
  if (!data || !nav) return;

  var activeKey = nav.getAttribute('data-active') || '';
  var isSolid = nav.getAttribute('data-solid') === 'true';
  if (isSolid) nav.classList.add('solid');

  function esc(s) { return (s || '').toString(); }

  var itemsHtml = data.items.map(function (item, idx) {
    var isCurrent = item.key === activeKey;
    var liClass = (item.items ? 'has-mega' : '') + (isCurrent ? ' current' : '');
    var linkInner = item.zh
      ? '<span class="en">' + esc(item.en) + '</span><span class="zh">' + esc(item.zh) + '</span>'
      : esc(item.en);

    if (!item.items) {
      return '<li class="' + liClass.trim() + '"><a href="' + item.href + '">' + linkInner + '</a></li>';
    }

    var listHtml = item.items.map(function (sub, i) {
      return '<a href="' + sub.href + '" data-target="mega-' + idx + '-' + i + '" class="' + (i === 0 ? 'active' : '') + '">' +
        '<span class="en">' + esc(sub.en) + '</span><span class="zh">' + esc(sub.zh) + '</span></a>';
    }).join('');

    var detailHtml = item.items.map(function (sub, i) {
      return '<div class="mega-detail-item' + (i === 0 ? ' active' : '') + '" id="mega-' + idx + '-' + i + '">' +
        '<p class="eyebrow en">' + esc(sub.en) + '</p>' +
        '<h4>' + esc(sub.zh) + '</h4>' +
        '<p class="mega-tagline">' + esc(sub.tagline) + '</p>' +
        '<p class="mega-desc">' + esc(sub.desc) + '</p>' +
        '<a class="mega-link" href="' + sub.href + '">探索更多' + esc(sub.zh) + ' →</a>' +
        '</div>';
    }).join('');

    return '<li class="' + liClass.trim() + '">' +
      '<a href="' + item.href + '">' + linkInner + '</a>' +
      '<div class="mega-panel"><div class="mega-inner">' +
        '<div class="mega-list">' + listHtml + '</div>' +
        '<div class="mega-detail">' + detailHtml + '</div>' +
        '<div class="mega-visual"><img src="' + item.image + '" alt="' + esc(item.zh) + '">' +
          '<blockquote class="mega-quote">' + item.quote + '<span>— ' + esc(item.quoteSource) + '</span></blockquote>' +
        '</div>' +
      '</div></div>' +
    '</li>';
  }).join('');

  var utilityHtml = (data.utility || []).map(function (u) {
    return '<a href="' + u.href + '"' + (u.lang ? ' class="lang"' : '') + '>' + esc(u.label) + '</a>';
  }).join('');

  nav.innerHTML =
    '<a href="index.html" class="nav-logo"><img src="images/logo.png" alt="GAIAN">' +
      (data.logoTagline ? '<span class="tagline">' + esc(data.logoTagline) + '</span>' : '') +
    '</a>' +
    '<ul class="nav-links">' + itemsHtml + '</ul>' +
    '<div class="nav-cta">' +
      '<div class="nav-utility">' + utilityHtml + '</div>' +
      '<a class="reserve" href="' + data.reserve.href + '">' + esc(data.reserve.label) + '</a>' +
    '</div>';

  if (!isSolid) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  nav.querySelectorAll('.mega-list a').forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      var panel = link.closest('.mega-panel');
      panel.querySelectorAll('.mega-list a').forEach(function (a) { a.classList.remove('active'); });
      panel.querySelectorAll('.mega-detail-item').forEach(function (d) { d.classList.remove('active'); });
      link.classList.add('active');
      var target = link.getAttribute('data-target');
      var detail = panel.querySelector('#' + target);
      if (detail) detail.classList.add('active');
    });
  });
})();
