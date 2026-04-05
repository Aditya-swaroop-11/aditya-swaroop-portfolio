document.addEventListener('DOMContentLoaded', () => {

  // Staggered interest tag animation
  const tags = document.querySelectorAll('.interest-tag');
  tags.forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(12px)';
    tag.style.transition = `opacity .4s ease ${i * 0.06}s, transform .4s ease ${i * 0.06}s`;
  });

  const cloudObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      tags.forEach(tag => {
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0)';
      });
      cloudObs.disconnect();
    }
  }, { threshold: 0.2 });

  const cloud = document.querySelector('.interests-cloud');
  if (cloud) cloudObs.observe(cloud);

  // Timeline items stagger
  const tlItems = document.querySelectorAll('.tl-item');
  tlItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-16px)';
    item.style.transition = `opacity .5s ease ${i * 0.12}s, transform .5s ease ${i * 0.12}s`;
  });

  const tlObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      tlItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
      tlObs.disconnect();
    }
  }, { threshold: 0.1 });

  const tl = document.querySelector('.timeline');
  if (tl) tlObs.observe(tl);

});