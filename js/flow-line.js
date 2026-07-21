/* 金色生命流動線：隨滾動緩慢展開，停止時仍有極輕微呼吸感 */
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

  // --- 主線：貫穿 Hero + About，隨整體滾動進度展開 ---
  (function initFlowLine() {
    var path = document.getElementById('flowPath');
    if (!path) return;

    if (!hasGsap || reduceMotion) {
      path.style.strokeDasharray = 'none';
      return;
    }

    var len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    if (window.ScrollTrigger && !isNarrow) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.flow-zone',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8
        }
      });
    } else {
      gsap.set(path, { strokeDashoffset: 0 });
    }

    breathe(path, isNarrow ? 11 : 9);
  })();

  // --- 健康管理流程線：進入視野時緩緩畫出四個節點的連線，畫完後保留呼吸感 ---
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
