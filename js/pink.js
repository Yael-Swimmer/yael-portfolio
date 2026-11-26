(function () {
  var nav = document.getElementById('pnav');
  var bar = document.getElementById('pprogress');
  var hero = document.querySelector('.phero');
  var heroInner = hero ? hero.querySelector('.hero') : null;
  var foot = document.querySelector('.pfoot');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };

  function frame() {
    var y = window.scrollY, vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max) : 0) + ')';
    if (hero) {
      var r = hero.getBoundingClientRect();
      if (nav) nav.classList.toggle('on-light', r.bottom < 44);
      if (heroInner && !reduce && r.bottom > 0) {
        var p = clamp(-r.top / Math.max(r.height, 1));
        heroInner.style.transform = 'translate3d(0,' + (p * 70).toFixed(1) + 'px,0)';
        heroInner.style.opacity = (1 - p * 0.75).toFixed(3);
      }
    } else if (nav) {
      nav.classList.add('on-light');
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  if (foot) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { foot.classList.add('in'); io.disconnect(); } });
      }, { threshold: 0.2 });
      io.observe(foot);
    } else {
      foot.classList.add('in');
    }
  }
})();
