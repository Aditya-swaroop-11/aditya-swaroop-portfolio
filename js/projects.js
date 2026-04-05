const projectsData = {
  'clinic': {
    name: 'Clinic Management System',
    folder: 'assets/images/clinic',
    images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png', 'img10.png', 'img11.png', 'img12.png']
  },
  'computer-networks': {
    name: 'Network Routing Protocol',
    folder: 'assets/images/computer networks',
    images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png', 'img10.png', 'img11.png']
  },
  'digital': {
    name: 'Digital Electronics Design',
    folder: 'assets/images/digital',
    images: ['digital.png', 'Screenshot 2024-09-09 220849.png', 'Screenshot 2024-09-09 221013.png', 'Screenshot 2024-10-10 095659.png']
  },
  'iot': {
    name: 'IoT Smart Home System',
    folder: 'assets/images/iot',
    images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img6.png', 'img7.png', 'img8.png', 'imh5.png']
  },
  'shm': {
    name: 'Simple Harmonic Motion Analyzer',
    folder: 'assets/images/shm',
    images: ['img1.jpg', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png']
  },
  'sql': {
    name: 'Database Management System',
    folder: 'assets/images/sql',
    images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png', 'img10.png', 'ER _diagram.png', 'tax.png']
  },
  'web': {
    name: 'Full-Stack Web Application',
    folder: 'assets/images/web',
    images: ['front.png', 'code.png', 'analog.png', 'automatic.png', 'digital.png', 'hybrid.png', 'mechanical.png', 'smart.png']
  },
  'helmet': {
    name: 'Smart Helmet UI Design',
    folder: 'assets/images/helmet design',
    images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png']
  },
  'accident': {
    name: 'Accident Detection Dashboard',
    folder: 'assets/images/Road accident pridiction',
    images: ['Screenshot 2026-04-01 114723.png', 'Screenshot 2026-04-01 114734.png', 'Screenshot 2026-04-01 114753.png', 'Screenshot 2026-04-01 114823.png', 'Screenshot 2026-04-01 115025.png', 'Screenshot 2026-04-01 115034.png', 'Screenshot 2026-04-01 115052.png']
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // ── FILTER TABS ─────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-modern');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── CUSTOM MODAL GALLERY FUNCTIONALITY ─────────────
  const projectModal = document.getElementById('projectModal');
  const projectModalOverlay = document.getElementById('projectModalOverlay');
  const modalClose = document.getElementById('projectModalClose');
  const modalHeading = document.getElementById('projectModalLabel');
  const modalImage = document.getElementById('projectModalImage');
  const modalCaption = document.getElementById('projectModalCaption');
  const carouselIndicators = document.getElementById('carouselIndicators');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');

  const projectThumbnails = document.querySelectorAll('.project-thumbnail');
  let currentProject = null;
  let currentIndex = 0;
  let autoSlideTimer = null;

  projectThumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const projectKey = thumb.dataset.project;
      const project = projectsData[projectKey];
      if (project) {
        openProjectModal(project);
      }
    });
  });

  function openProjectModal(project) {
    currentProject = project;
    currentIndex = 0;

    modalHeading.textContent = project.name;
    buildCarouselIndicators(project.images);
    updateModalSlide();

    projectModal.classList.add('active');

    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
    autoSlideTimer = setInterval(() => moveSlide(1), 3000);
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    currentProject = null;
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function buildCarouselIndicators(images) {
    carouselIndicators.innerHTML = '';
    images.forEach((image, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'carousel-thumb';
      thumb.innerHTML = `<img src="${encodeURI(`${currentProject.folder}/${image}`)}" alt="Thumbnail ${index + 1}" />`;
      thumb.addEventListener('click', () => {
        currentIndex = index;
        updateModalSlide();
        restartAutoSlide();
      });
      carouselIndicators.appendChild(thumb);
    });
  }

  function updateModalSlide() {
    if (!currentProject) return;

    const imageFile = currentProject.images[currentIndex];
    const imagePath = `${currentProject.folder}/${imageFile}`;
    modalImage.src = encodeURI(imagePath);
    modalCaption.textContent = `${currentProject.name} — (${currentIndex + 1} / ${currentProject.images.length})`;

    carouselIndicators.querySelectorAll('.carousel-thumb').forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === currentIndex);
    });
  }

  function moveSlide(direction) {
    if (!currentProject) return;

    currentIndex += direction;
    if (currentIndex >= currentProject.images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentProject.images.length - 1;

    updateModalSlide();
  }

  function restartAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(() => moveSlide(1), 3000);
    }
  }

  carouselPrev.addEventListener('click', () => {
    moveSlide(-1);
    restartAutoSlide();
  });

  carouselNext.addEventListener('click', () => {
    moveSlide(1);
    restartAutoSlide();
  });

  modalClose.addEventListener('click', closeProjectModal);
  projectModalOverlay.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', (event) => {
    if (!projectModal.classList.contains('active')) return;

    if (event.key === 'Escape') {
      closeProjectModal();
    } else if (event.key === 'ArrowRight') {
      moveSlide(1);
      restartAutoSlide();
    } else if (event.key === 'ArrowLeft') {
      moveSlide(-1);
      restartAutoSlide();
    }
  });

  // Remove old bootstrap carousel code if exists
  const oldCarousel = document.getElementById('projectCarousel');
  if (oldCarousel) {
    oldCarousel.remove();
  }

});