/* ============================================================
   main.js — Shared JS (loaded on every page)
   ============================================================ */

// ── CURSOR ────────────────────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .word-hover, .tech-chip, .interest-tag, .project-card, input, textarea')
  .forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });


// ── ACTIVE NAV LINK ───────────────────────────────────────────
(function setActiveNav() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const isIndex = ['index.html', ''].includes(window.location.pathname.split('/').pop());
  const anchorLinks = Array.from(navLinks).filter(a => a.getAttribute('href').startsWith('#'));

  if (isIndex && anchorLinks.length) {
    const sections = anchorLinks
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    anchorLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(a => a.classList.toggle('active', a === link));
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
        }
      });
    }, { rootMargin: '-35% 0px -45% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
    return;
  }

  navLinks.forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === window.location.pathname.split('/').pop()) a.classList.add('active');
  });
})();

function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageBox = document.getElementById('form-message-box');
  if (!form || !messageBox) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    const button = form.querySelector('.form-button');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending...';

    try {
      const response = await fetch('https://formsubmit.co/aditya.swaroop@avantika.edu.in', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name,
          email,
          message,
          _captcha: 'false',
          _next: window.location.href,
        }),
      });

      if (response.ok) {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
      } else {
        showFormMessage('Something went wrong. Please try again later.', 'error');
      }
    } catch (error) {
      showFormMessage('Unable to send message. Please try again later.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  function showFormMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `form-message ${type}`;
  }
}

initContactForm();


// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


// ── CONSTELLATION CANVAS ──────────────────────────────────────
const canvas = document.getElementById('constellation');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  const mouse = { x: -9999, y: -9999 };

  function resizeCanvas() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Build stars
  const STAR_COUNT = 90;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:  Math.random(),
    y:  Math.random(),
    vx: (Math.random() - 0.5) * 0.00018,
    vy: (Math.random() - 0.5) * 0.00018,
    r:  Math.random() * 1.5 + 0.4,
    a:  Math.random() * 0.55 + 0.2,
  }));

  document.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / W;
    mouse.y = (e.clientY - r.top)  / H;
  });

  function drawConstellation() {
    ctx.clearRect(0, 0, W, H);

    // Move & draw stars
    stars.forEach(s => {
      s.x = (s.x + s.vx + 1) % 1;
      s.y = (s.y + s.vy + 1) % 1;

      // Slight attraction to mouse
      const dx = mouse.x - s.x, dy = mouse.y - s.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.15) { s.x += dx * 0.002; s.y += dy * 0.002; }

      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(142,207,184,${s.a})`;
      ctx.fill();
    });

    // Draw lines between close stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = (stars[i].x - stars[j].x) * W;
        const dy = (stars[i].y - stars[j].y) * H;
        const d  = Math.hypot(dx, dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x * W, stars[i].y * H);
          ctx.lineTo(stars[j].x * W, stars[j].y * H);
          ctx.strokeStyle = `rgba(142,207,184,${0.13 * (1 - d / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawConstellation);
  }
  drawConstellation();
}


// ── HOVER CARDS (hero page only) ──────────────────────────────
const photoCard = document.getElementById('photo-card');
const infoCard  = document.getElementById('info-card');
const infoCardContent = infoCard ? infoCard.querySelector('.hc-info') : null;

if (photoCard || infoCard) {
  document.querySelectorAll('.word-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (el.dataset.card === 'info' && infoCardContent) {
        const { title, description } = el.dataset;
        if (title && description) {
          infoCardContent.innerHTML = `
            <p><strong>${title}:</strong></p>
            <p>${description}</p>
          `;
        }
      }
    });

    el.addEventListener('mousemove', e => {
      const card = el.dataset.card === 'photo' ? photoCard : infoCard;
      if (!card) return;
      card.style.left = (e.clientX + 24) + 'px';
      card.style.top  = (e.clientY - 70) + 'px';
      card.classList.add('visible');
    });

    el.addEventListener('mouseleave', () => {
      const card = el.dataset.card === 'photo' ? photoCard : infoCard;
      if (card) card.classList.remove('visible');
    });
  });
}