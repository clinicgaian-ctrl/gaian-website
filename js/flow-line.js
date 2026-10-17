/* 健康管理流程線：進入視野時緩緩畫出四個節點的連線，畫完後保留呼吸感（僅桌機，手機版改用 Scroll Journey 純 CSS 呈現） */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isNarrow = window.matchMedia && window.matchMedia('(max-width:760px)').matches;
  var hasGsap = typeof gsap !== 'undefined';

  function breathe(path, duration) {
    gsap.to(path, {
      opacity: 0.25,
      duration: duration,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }

  (function initProcessLine() {
    var path = document.getElementById('processPath');
    if (!path) return;

    if (!hasGsap || reduceMotion || isNarrow) {
      if (path.style) path.style.strokeDasharray = 'none';
      return;
    }

    var len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.42 });

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.process-diagram',
          start: 'top 78%',
          toggleActions: 'play none none none'
        },
        onComplete: function () { breathe(path, 9); }
      });
    } else {
      gsap.set(path, { strokeDashoffset: 0 });
      breathe(path, 9);
    }
  })();
})();
