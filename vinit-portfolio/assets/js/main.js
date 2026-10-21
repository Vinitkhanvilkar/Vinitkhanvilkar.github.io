/* Vinit Khanvilkar — portfolio interactions (no dependencies) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });

  /* ---------- live IST clock (header + footer) ---------- */
  var hhEls = document.querySelectorAll('[data-hh]');
  var mmEls = document.querySelectorAll('[data-mm]');
  var ssEls = document.querySelectorAll('[data-ss]');
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  } catch (e) { fmt = null; }

  function tickClock() {
    if (!fmt) return;
    var hh = '--', mm = '--', ss = '--';
    fmt.formatToParts(new Date()).forEach(function (p) {
      if (p.type === 'hour') hh = p.value;
      if (p.type === 'minute') mm = p.value;
      if (p.type === 'second') ss = p.value;
    });
    hhEls.forEach(function (el) { el.textContent = hh; });
    mmEls.forEach(function (el) { el.textContent = mm; });
    ssEls.forEach(function (el) { el.textContent = ss; });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ---------- rotating role in hero ---------- */
  var roles = ['rag pipelines', 'llm integrations', 'ml pipelines', 'frappe apps'];
  var roleEl = document.getElementById('role');
  var roleIdx = 0;
  if (roleEl && !reduceMotion) {
    setInterval(function () {
      roleIdx = (roleIdx + 1) % roles.length;
      roleEl.textContent = roles[roleIdx];
      roleEl.classList.remove('in');
      void roleEl.offsetWidth; // restart the CSS animation
      roleEl.classList.add('in');
    }, 2400);
  }

  /* ---------- SarkarSathi pipeline trace ---------- */
  var steps = Array.prototype.slice.call(document.querySelectorAll('#trace .step'));
  var tick = 0;
  function renderTrace() {
    steps.forEach(function (el, i) {
      el.classList.toggle('on', i === tick);
      el.classList.toggle('done', i < tick);
    });
  }
  if (steps.length) {
    renderTrace();
    if (!reduceMotion) {
      setInterval(function () { tick = (tick + 1) % steps.length; renderTrace(); }, 1400);
    }
  }

  /* ---------- MARSAIX signal layers ---------- */
  var layerBtns = Array.prototype.slice.call(document.querySelectorAll('#layers button.lrow'));
  var layerName = document.getElementById('layer-name');
  var layerText = document.getElementById('layer-text');
  function pickLayer(btn) {
    if (btn.classList.contains('on')) return;
    layerBtns.forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (layerName) layerName.textContent = btn.getAttribute('data-name');
    if (layerText) layerText.textContent = btn.getAttribute('data-desc');
  }
  layerBtns.forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.classList.contains('on') ? 'true' : 'false');
    btn.addEventListener('mouseenter', function () { pickLayer(btn); });
    btn.addEventListener('focus', function () { pickLayer(btn); });
    btn.addEventListener('click', function () { pickLayer(btn); });
  });

  /* ---------- capabilities accordion (one open at a time) ---------- */
  var accHeads = Array.prototype.slice.call(document.querySelectorAll('#acc .acc-h'));
  accHeads.forEach(function (head) {
    head.addEventListener('click', function () {
      var wasOpen = head.getAttribute('aria-expanded') === 'true';
      accHeads.forEach(function (h) {
        h.setAttribute('aria-expanded', 'false');
        var panel = document.getElementById(h.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });
      if (!wasOpen) {
        head.setAttribute('aria-expanded', 'true');
        var panel = document.getElementById(head.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
      }
    });
  });
})();
