/* =============================================
   Mente Tecno — Abacus.AI Report
   Interactive layer
   ============================================= */

// ── Tab switching ──────────────────────────────
const tabBtns  = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');

    // Smooth scroll to top of content on mobile
    if (window.innerWidth < 640) {
      document.getElementById('tab-nav').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Animated background canvas ────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H, nodes, animId;

  const NODE_COUNT = 60;
  const CONNECT_DIST = 140;
  const SPEED = 0.35;

  const COLORS = ['#7B5EEA', '#00C2FF', '#E040FB'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function createNode() {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 0.5 + 0.2) * SPEED;
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   Math.cos(angle) * speed,
      vy:   Math.sin(angle) * speed,
      r:    Math.random() * 2 + 1,
      color: randomColor(),
      alpha: Math.random() * 0.5 + 0.3,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, createNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(123, 94, 234, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color + Math.round(n.alpha * 255).toString(16).padStart(2, '0');
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    draw();
  });
})();

// ── Sticky nav shadow on scroll ───────────────
const siteHeader = document.querySelector('.site-header');
const tabNav     = document.querySelector('.tab-nav');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 10;
  siteHeader.style.boxShadow = scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none';
}, { passive: true });

// ── Intersection observer: animate cards on entry ──
const observerOpts = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      cardObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

function observeCards() {
  document.querySelectorAll('.issue-card, .rec-card, .metric-card, .card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    cardObserver.observe(el);
  });
}

observeCards();

// Re-observe when tabs switch
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(observeCards, 50);
  });
});
