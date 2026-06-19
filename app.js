/**
 * Abacus.AI Security Report — App JS
 * Tab navigation · Accordion cards · Animated counters · Scroll effects
 */

'use strict';

/* ─── DOM READY ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordion();
  initCounters();
  initProgressBars();
  initKeyboard();
  initTerminalClock();
});

/* ─── TAB NAVIGATION ────────────────────────────── */
function initTabs() {
  const tabs    = document.querySelectorAll('.tab-btn');
  const pages   = document.querySelectorAll('.page');

  function activateTab(id) {
    tabs.forEach(t  => t.classList.toggle('active', t.dataset.tab === id));
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    // Re-trigger progress bars when switching tabs
    initProgressBars();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  // Hash-based routing
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    activateTab(hash);
  } else {
    // activate first
    const firstTab = tabs[0];
    if (firstTab) activateTab(firstTab.dataset.tab);
  }
}

/* ─── ACCORDION ISSUE CARDS ─────────────────────── */
function initAccordion() {
  const cards = document.querySelectorAll('.issue-card');

  cards.forEach(card => {
    const header = card.querySelector('.issue-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      // Close all others
      cards.forEach(c => c.classList.remove('expanded'));
      // Toggle clicked
      if (!isExpanded) {
        card.classList.add('expanded');
        // Smooth scroll into view
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
      }
    });
  });
}

/* ─── ANIMATED COUNTERS ─────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const start    = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ─── PROGRESS BARS ─────────────────────────────── */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, 100);
      observer.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0%'; // reset on tab switch
    observer.observe(bar);
  });
}

/* ─── KEYBOARD NAVIGATION ───────────────────────── */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    const tabs = [...document.querySelectorAll('.tab-btn')];
    const active = tabs.findIndex(t => t.classList.contains('active'));

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = e.key === 'ArrowRight'
        ? (active + 1) % tabs.length
        : (active - 1 + tabs.length) % tabs.length;
      tabs[next].click();
      tabs[next].focus();
    }
  });

  // ARIA roles for tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active'));
  });
}

/* ─── TERMINAL CLOCK ────────────────────────────── */
function initTerminalClock() {
  const el = document.getElementById('terminal-clock');
  if (!el) return;

  function update() {
    const now  = new Date();
    const pad  = n => String(n).padStart(2, '0');
    const date = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    el.textContent = `${date} ${time}`;
  }

  update();
  setInterval(update, 1000);
}

/* ─── COPY TO CLIPBOARD UTILITY ─────────────────── */
window.copyToClipboard = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = '✓ Copiado';
    btn.style.color = 'var(--green-glow)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.color = '';
    }, 2000);
  });
};

/* ─── EXPORT TO MARKDOWN ────────────────────────── */
window.exportReport = function() {
  const content = document.title + '\n\nVer: https://github.com\nFecha: ' + new Date().toLocaleDateString('es-AR');
  const blob = new Blob([content], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'abacus-security-report.txt';
  a.click();
  URL.revokeObjectURL(url);
};
