/* Portfolio behaviour. Every link works without this file: film links go to
   YouTube or Vimeo, photo links open the full-size image. With it, both open
   in a viewer on the page. */
(function () {
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero clips: autoplay muted, with a pause button. Visitors who ask for
     reduced motion get the still frame until they press play. */
  var clip = document.getElementById('clip');
  var clipBtn = document.getElementById('clip-toggle');
  if (clip && clipBtn) {
    var label = clipBtn.querySelector('span');
    var setLabel = function () { label.textContent = clip.paused ? 'Play clips' : 'Pause clips'; };
    if (still) { clip.removeAttribute('autoplay'); clip.pause(); }
    clip.addEventListener('play', setLabel);
    clip.addEventListener('pause', setLabel);
    clipBtn.addEventListener('click', function () {
      if (clip.paused) { clip.play().catch(function () {}); } else { clip.pause(); }
    });
    if (!still) {
      var p = clip.play();
      if (p && p.catch) p.catch(setLabel);
    }
    setLabel();
  }

  /* One viewer dialog, used for films and photos */
  var dlg = document.createElement('dialog');
  dlg.className = 'viewer';
  dlg.setAttribute('aria-labelledby', 'viewer-title');
  dlg.innerHTML =
    '<div class="bar"><p class="title" id="viewer-title"></p>' +
    '<button type="button" class="close">Close</button></div>' +
    '<div class="stage"></div>' +
    '<div class="nav2" hidden><button type="button" class="prev" aria-label="Previous photo">Previous</button>' +
    '<span class="count" aria-live="polite"></span>' +
    '<button type="button" class="next" aria-label="Next photo">Next</button></div>';
  document.body.appendChild(dlg);
  var stage = dlg.querySelector('.stage');
  var titleEl = dlg.querySelector('.title');
  var nav2 = dlg.querySelector('.nav2');
  var countEl = dlg.querySelector('.count');
  var opener = null;
  var photos = null, index = 0;

  function open(title) {
    titleEl.textContent = title;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  }
  function close() {
    stage.innerHTML = '';
    photos = null;
    if (dlg.open) dlg.close();
  }
  dlg.addEventListener('close', function () {
    stage.innerHTML = '';
    document.documentElement.style.overflow = '';
    if (opener) opener.focus();
  });
  dlg.querySelector('.close').addEventListener('click', close);
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === stage) close(); });

  /* Films */
  function embed(spec) {
    var parts = spec.split(':'), host = parts[0], id = parts[1];
    if (host === 'youtube') return 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
    return 'https://player.vimeo.com/video/' + id + '?autoplay=1&dnt=1&title=0&byline=0&portrait=0';
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-video]');
    if (!a) return;
    e.preventDefault();
    opener = a;
    nav2.hidden = true;
    var title = a.getAttribute('data-title') || 'Video';
    stage.innerHTML = '<div class="frame"><iframe title="' + title.replace(/"/g, '&quot;') + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen src="' + embed(a.getAttribute('data-video')) + '"></iframe></div>';
    open(title);
  });

  /* Photos on the series pages */
  var grid = document.querySelector('[data-gallery]');
  if (grid) {
    var links = Array.prototype.slice.call(grid.querySelectorAll('a'));
    var show = function (i) {
      index = (i + links.length) % links.length;
      var a = links[index], img = a.querySelector('img');
      stage.innerHTML = '';
      var big = document.createElement('img');
      big.className = 'photo';
      big.src = a.getAttribute('href');
      big.alt = img ? img.alt : '';
      stage.appendChild(big);
      countEl.textContent = (index + 1) + ' / ' + links.length;
    };
    grid.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      opener = a;
      photos = links;
      nav2.hidden = false;
      show(links.indexOf(a));
      open(grid.getAttribute('data-gallery'));
    });
    dlg.querySelector('.prev').addEventListener('click', function () { show(index - 1); });
    dlg.querySelector('.next').addEventListener('click', function () { show(index + 1); });
    dlg.addEventListener('keydown', function (e) {
      if (!photos) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });
  }

  /* Contact form: sends through Web3Forms to Juan's inbox. Bots that tick the
     hidden box or submit within 3 seconds are dropped. */
  var form = document.getElementById('contact-form');
  if (form) {
    var btn = form.querySelector('button[type="submit"]');
    var status = document.getElementById('form-status');
    var loadedAt = Date.now();
    var say = function (text, ok) { status.textContent = text; status.className = 'status ' + (ok ? 'ok' : 'err'); };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (form.botcheck.checked || Date.now() - loadedAt < 3000) { form.reset(); say('Sent. I’ll reply within a day.', true); return; }
      var data = new FormData(form);
      var who = (data.get('name') || '') + (data.get('company') ? ', ' + data.get('company') : '');
      data.set('subject', 'Portfolio message from ' + who);
      btn.disabled = true; btn.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (!json.success) throw new Error(json.message || 'failed');
          form.reset(); say('Sent. I’ll reply within a day.', true);
        })
        .catch(function () { say('That didn’t send. Check your connection and try again.', false); })
        .then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
    });
  }
})();
