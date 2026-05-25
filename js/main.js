(function () {
  const nav = document.querySelector('nav');
  const hero = document.querySelector('.hero');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const current = window.pageYOffset;
    if (current > 100) {
      if (current > lastScroll) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
    } else {
      nav.style.transform = 'translateY(0)';
      nav.style.background = 'rgba(255,255,255,0.95)';
    }
    lastScroll = current;
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
