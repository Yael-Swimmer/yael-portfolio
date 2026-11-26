(function () {
  var nav = document.getElementById('pnav');
  var bar = document.getElementById('pprogress');
  var foot = document.querySelector('.pfoot');
  var zones = [].slice.call(document.querySelectorAll('.phero, .pfoot, [data-nav]'));
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };

  function zoneMode(el) {
    var d = el.getAttribute('data-nav');
    if (d) return d;
    return el.classList.contains('phero--soft') ? 'light' : 'dark';
  }

  function frame() {
    var vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? clamp(window.scrollY / max) : 0) + ')';
    if (nav) {
      var mode = 'light';
      zones.forEach(function (z) {
        var r = z.getBoundingClientRect();
        if (r.top <= 44 && r.bottom > 44) mode = zoneMode(z);
      });
      nav.classList.toggle('on-light', mode === 'light');
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
