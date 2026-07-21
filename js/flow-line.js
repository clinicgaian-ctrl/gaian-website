/* 金色生命流動線：隨滾動緩慢展開，停止時仍有極輕微呼吸感 */
(function () {
  var path = document.getElementById('flowPath');
  if (!path) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isNarrow = window.matchMedia && window.matchMedia('(max-width:760px)').matches;

  if (typeof gsap === 'undefined' || reduceMotion) {
    // GSAP 未載入或使用者偏好減少動態：直接顯示完整線條，不做動畫
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
    // 手機版：不做逐步繪製，直接顯示完整線條，動態只保留輕微呼吸
    gsap.set(path, { strokeDashoffset: 0 });
  }

  // 呼吸效果：透明度在 0.25 ~ 0.42 之間緩慢起伏，避免明顯閃爍
  gsap.to(path, {
    opacity: 0.25,
    duration: isNarrow ? 11 : 9,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
})();
