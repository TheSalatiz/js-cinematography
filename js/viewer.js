/* Full-screen photo viewer for the gallery pages.
   Every photo is a link to its full-size file, so it still opens without this
   script. With it, photos open on the page with previous / next buttons,
   arrow keys, swipe on phones, and Esc or Close to leave. */
(function () {
  var grid = document.querySelector('[data-gallery]');
  if (!grid || typeof HTMLDialogElement !== 'function') return;
  var links = Array.prototype.slice.call(grid.querySelectorAll('a[href]'));
  if (!links.length) return;

  var dlg = document.createElement('dialog');
  dlg.className = 'viewer';
  dlg.setAttribute('aria-label', grid.getAttribute('data-gallery') || 'Photo viewer');
  dlg.innerHTML =
    '<div class="viewer-bar"><p class="viewer-title"></p>' +
    '<button type="button" class="viewer-close">Close</button></div>' +
    '<div class="viewer-stage"><img class="viewer-photo" alt=""></div>' +
    '<div class="viewer-nav">' +
    '<button type="button" class="viewer-prev" aria-label="Previous photo">&larr;</button>' +
    '<span class="viewer-count" aria-live="polite"></span>' +
    '<button type="button" class="viewer-next" aria-label="Next photo">&rarr;</button></div>';
  document.body.appendChild(dlg);

  var photo = dlg.querySelector('.viewer-photo');
  var stage = dlg.querySelector('.viewer-stage');
  var count = dlg.querySelector('.viewer-count');
  dlg.querySelector('.viewer-title').textContent = grid.getAttribute('data-gallery') || '';
  var index = 0, opener = null;

  function preload(i) {
    var a = links[(i + links.length) % links.length];
    var im = new Image();
    im.src = a.getAttribute('href');
  }
  function show(i) {
    index = (i + links.length) % links.length;
    var a = links[index], thumb = a.querySelector('img');
    photo.src = a.getAttribute('href');
    photo.alt = thumb ? thumb.alt : '';
    count.textContent = (index + 1) + ' / ' + links.length;
    preload(index + 1);
    preload(index - 1);
  }
  function close() { if (dlg.open) dlg.close(); }

  grid.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    opener = a;
    show(links.indexOf(a));
    dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
  });
  dlg.addEventListener('close', function () {
    document.documentElement.style.overflow = '';
    photo.removeAttribute('src');
    if (opener) opener.focus();
  });
  dlg.querySelector('.viewer-close').addEventListener('click', close);
  dlg.querySelector('.viewer-prev').addEventListener('click', function () { show(index - 1); });
  dlg.querySelector('.viewer-next').addEventListener('click', function () { show(index + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === stage) close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });

  var x0 = null, y0 = null;
  stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    x0 = y0 = null;
  });
})();
