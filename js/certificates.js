const CERTIFICATES = [
  {
    title:   "MSME Participation",
    issuer:  "MSME",
    date:    "2024 – 2025",
    image:   "assets/images/msme.jpg",
    emoji:   "🏅",
  },
  {
    title:   "ICACTMMS 2024 Research Paper Publication",
    issuer:  "ICACTMMS",
    date:    "2024",
    image:   "assets/images/research.jpg",
    emoji:   "📄",
  },
  {
    title:   "Hackathon Participation Certificate",
    issuer:  "Competition / Event",
    date:    "Completed",
    image:   "assets/images/hackathon.png",
    emoji:   "🏆",
  },
  {
    title:   "Tech Quiz Certificate",
    issuer:  "Competition / Event",
    date:    "Completed",
    image:   "assets/images/techquiz.jpg",
    emoji:   "🏆",
  },
  {
    title:   "Cloud Computing Certificate",
    issuer:  "Cisco",
    date:    "Completed",
    image:   "assets/images/cloud.png",
    emoji:   "☁️",
  },
  {
    title:   "Computer Networks Certificate",
    issuer:  "Cisco",
    date:    "Completed",
    image:   "assets/images/cn.png",
    emoji:   "🌐",
  },
  {
    title:   "Data Science Certificate",
    issuer:  "Cisco",
    date:    "Completed",
    image:   "assets/images/data.png",
    emoji:   "📊",
  },
  {
    title:   "Internet of Things Certificate",
    issuer:  "Cisco",
    date:    "Completed",
    image:   "assets/images/iot.png",
    emoji:   "🔌",
  },
  {
    title:   "MongoDB Certificate",
    issuer:  "Infosys",
    date:    "Completed",
    image:   "assets/images/mongodb.png",
    emoji:   "🍃",
  },
  {
    title:   "Operating Systems Certificate",
    issuer:  "Infosys",
    date:    "Completed",
    image:   "assets/images/os.png",
    emoji:   "💿",
  },
  {
    title:   "OS Support Certificate",
    issuer:  "Infosys",
    date:    "Completed",
    image:   "assets/images/os_support.png",
    emoji:   "🛠️",
  },
  {
    title:   "Reverse Engineering Certificate",
    issuer:  "Workshop / Event",
    date:    "Completed",
    image:   "assets/images/reverse.jpg",
    emoji:   "🛠️",
  },
];

// ── RENDER GRID ───────────────────────────────────────────────
function renderCertificates() {
  const grid = document.getElementById('cert-grid');
  if (!grid) return;

  grid.innerHTML = '';

  CERTIFICATES.forEach((cert, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card reveal';
    card.style.transitionDelay = `${i * 0.07}s`;

    const thumbContent = cert.image
      ? `<img src="${cert.image}" alt="${cert.title}" />`
      : `<span>${cert.emoji}</span>`;

    card.innerHTML = `
      <div class="cert-thumb">
        ${thumbContent}
        <div class="cert-overlay">CLICK TO VIEW</div>
      </div>
      <div class="cert-info">
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-title">${cert.title}</div>
        <div class="cert-date">${cert.date}</div>
      </div>`;

    card.addEventListener('click', () => openLightbox(cert));
    grid.appendChild(card);
  });

  // Re-run reveal observer for dynamically added cards
  document.querySelectorAll('.cert-card').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        entries[0].target.classList.add('visible');
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}

// ── LIGHTBOX ─────────────────────────────────────────────────
function openLightbox(cert) {
  const lb     = document.getElementById('lightbox');
  const img    = document.getElementById('lightbox-img');
  const title  = document.getElementById('lb-title');
  const issuer = document.getElementById('lb-issuer');

  img.src = cert.image || '';
  img.alt = `${cert.title} preview`;
  img.style.display = cert.image ? 'block' : 'none';
  title.textContent = cert.title;
  issuer.textContent = cert.issuer + ' — ' + cert.date;
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCertificates();
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-bg')?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
});