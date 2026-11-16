/* Shared by every inner page: the phone menu, the header background and the
   blocks that ease in as they arrive. Each page works without this script;
   it only adds polish. */
(function () {
  window.__siteJs = true;
  var header = document.getElementById('main-nav');
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('mobile-menu');

  /* Phone menu. Closed means hidden, so the keyboard can't land on links nobody can see. */
  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    header.classList.toggle('menu-open', open);
  }
  if (header && toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) { if (!menu.hidden && !header.contains(e.target)) setMenu(false); });
    var wide = window.matchMedia('(min-width: 768px)');
    var onWide = function (e) { if (e.matches && !menu.hidden) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* Header: clear at the top of the page, solid once the page moves. */
  if (header) {
    var queued = false;
    var paint = function () { queued = false; header.classList.toggle('nav-scroll', window.scrollY > 24); };
    window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(paint); } }, { passive: true });
    paint();
  }

  /* Reveals: each block eases in once, the first time it comes into view. */
  var blocks = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still || !('IntersectionObserver' in window)) {
    blocks.forEach(function (el) { el.classList.add('active'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('active'); io.unobserve(entry.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -4% 0px' });
  blocks.forEach(function (el) { io.observe(el); });
})();
