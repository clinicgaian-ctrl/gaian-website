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
        '<div class="mega-visual"><img src="' + item.image + '"' + (item.imagePos ? ' style="object-position:' + item.imagePos + '"' : '') + ' loading="lazy" decoding="async" alt="' + esc(item.zh) + '">' +
          '<blockquote class="mega-quote">' + item.quote + '<span>— ' + esc(item.quoteSource) + '</span></blockquote>' +
        '</div>' +
      '</div></div>' +
    '</li>';
  }).join('');

  var utilityHtml = (data.utility || []).map(function (u) {
    return '<a href="' + u.href + '"' + (u.lang ? ' class="lang"' : '') + '>' + esc(u.label) + '</a>';
  }).join('');

  /* 手機版選單：有子目錄的項目可展開（配圖＋引言＋子目錄），與桌機版下拉內容相同 */
  var mobileLinksHtml = data.items.map(function (item, idx) {
    var isCurrent = item.key === activeKey;
    var label = '<span class="en">' + esc(item.en) + '</span>' + (item.zh ? '<span class="zh">' + esc(item.zh) + '</span>' : '');
    if (!item.items) {
      return '<li class="m-item' + (isCurrent ? ' current' : '') + '"><a class="m-top" href="' + item.href + '">' + label + '</a></li>';
    }
    var subs = item.items.map(function (sub) {
      return '<a class="m-sub" href="' + sub.href + '"><span class="en">' + esc(sub.en) + '</span><span class="zh">' + esc(sub.zh) + '</span>' +
        '<span class="m-sub-tag">' + esc(sub.tagline) + '</span></a>';
    }).join('');
    return '<li class="m-item has-sub' + (isCurrent ? ' current' : '') + '">' +
      '<div class="m-top m-row"><a class="m-link" href="' + item.href + '">' + label + '</a>' +
        '<button class="m-toggle" type="button" aria-expanded="false" aria-controls="m-panel-' + idx + '" aria-label="展開' + esc(item.zh) + '子目錄"><i class="m-plus" aria-hidden="true"></i></button></div>' +
      '<div class="m-panel" id="m-panel-' + idx + '"><div class="m-panel-inner">' +
        '<div class="m-visual"><img src="' + item.image + '"' + (item.imagePos ? ' style="object-position:' + item.imagePos + '"' : '') + ' loading="lazy" alt="">' +
          '<p class="m-quote">' + item.quote + '<span>— ' + esc(item.quoteSource) + '</span></p></div>' +
        '<div class="m-subs">' + subs + '</div>' +
        '<a class="m-go" href="' + item.href + '">前往' + esc(item.zh) + ' →</a>' +
      '</div></div>' +
    '</li>';
  }).join('');

  nav.innerHTML =
    '<a href="index.html" class="nav-logo"><img src="images/shared/logo-icon.png" alt="GAIAN"></a>' +
    '<ul class="nav-links">' + itemsHtml + '</ul>' +
    '<div class="nav-cta">' +
      '<div class="nav-utility">' + utilityHtml + '</div>' +
      '<a class="reserve" href="' + data.reserve.href + '">' + esc(data.reserve.label) + '</a>' +
      '<button class="nav-burger" id="navBurger" aria-label="開啟選單"><span></span><span></span><span></span></button>' +
    '</div>' +
    '';
  /* 手機選單放在 body 底下（不放在 nav 裡），避免 nav 捲動後的毛玻璃效果讓選單失去深色底 */
  var drawerEl = document.createElement('div');
  drawerEl.className = 'mobile-drawer'; drawerEl.id = 'mobileDrawer';
  drawerEl.setAttribute('role', 'dialog'); drawerEl.setAttribute('aria-modal', 'true'); drawerEl.setAttribute('aria-label', '網站選單');
  drawerEl.innerHTML =
      '<div class="m-head"><a href="index.html" class="m-logo"><img src="images/shared/logo-icon.png" alt="GAIAN"></a>' +
        '<button class="m-close" id="mClose" type="button" aria-label="關閉選單"><span></span><span></span></button></div>' +
      '<div class="mobile-drawer-inner">' +
        '<ul class="mobile-links">' + mobileLinksHtml + '</ul>' +
        '<div class="mobile-utility">' + utilityHtml + '</div>' +
        '<a class="reserve mobile-reserve" href="' + data.reserve.href + '">' + esc(data.reserve.label) + '</a>' +
      '</div>';
  document.body.appendChild(drawerEl);

  var burger = document.getElementById('navBurger');
  var drawer = document.getElementById('mobileDrawer');
  var closeBtn = document.getElementById('mClose');
  function setOpen(open) {
    drawer.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', open);
    if (open) drawer.scrollTop = 0;
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () { setOpen(!drawer.classList.contains('open')); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    drawer.querySelectorAll('.m-item.has-sub .m-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var li = btn.closest('.m-item'), open = !li.classList.contains('open');
        drawer.querySelectorAll('.m-item.open').forEach(function (o) { if (o !== li) { o.classList.remove('open'); o.querySelector('.m-toggle').setAttribute('aria-expanded', 'false'); } });
        li.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

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
