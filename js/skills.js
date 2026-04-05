/* skills.js
   ──────────────────────────────────────────────────────────
   EDIT YOUR SKILLS HERE — just change the arrays below.
   Each object: { name: "Skill Name", icon: "..." }
   ──────────────────────────────────────────────────────────
*/

const DEV_SKILLS = [
  { name: "HTML",          icon: "https://img.icons8.com/color/96/000000/html-5.png" },
  { name: "CSS",           icon: "https://img.icons8.com/color/96/000000/css3.png" },
  { name: "JavaScript",    icon: "https://img.icons8.com/color/96/000000/javascript.png" },
  { name: "Python",        icon: "https://img.icons8.com/color/96/000000/python.png" },
  { name: "C / C++",       icon: "https://img.icons8.com/color/96/000000/c-plus-plus-logo.png" },
  { name: "SQL / MySQL",   icon: "https://img.icons8.com/color/96/000000/sql.png" },
];

const DESIGN_SKILLS = [
  { name: "Figma",               icon: "https://img.icons8.com/color/96/000000/figma--v1.png" },
  { name: "Canva",               icon: "https://img.icons8.com/color/96/000000/canva.png" },
  { name: "Leadership",          icon: "https://img.icons8.com/color/96/000000/leadership.png" },
  { name: "Time Management",     icon: "https://img.icons8.com/color/96/000000/clock.png" },
  { name: "Critical Thinking",   icon: "https://img.icons8.com/color/96/000000/brain.png" },
  { name: "Problem Solving",     icon: "https://img.icons8.com/color/96/000000/puzzle.png" },
];

const TECH_STACK = [
  { icon: "https://img.icons8.com/color/96/000000/html-5.png",                name: "HTML5" },
  { icon: "https://img.icons8.com/color/96/000000/css3.png",                  name: "CSS3" },
  { icon: "https://img.icons8.com/color/96/000000/javascript.png",           name: "JavaScript" },
  { icon: "https://img.icons8.com/color/96/000000/python.png",               name: "Python" },
  { icon: "https://img.icons8.com/color/96/000000/java-coffee-cup-logo.png", name: "Java" },
  { icon: "https://img.icons8.com/color/96/000000/c-plus-plus-logo.png",      name: "C++" },
  { icon: "https://img.icons8.com/color/96/000000/sql.png",                  name: "SQL" },
  { icon: "https://img.icons8.com/color/96/000000/github.png",               name: "GitHub" },
  { icon: "https://img.icons8.com/color/96/000000/figma--v1.png",            name: "Figma" },
  { icon: "https://img.icons8.com/color/96/000000/docker.png",               name: "Docker" },
  { icon: "https://img.icons8.com/color/96/000000/react-native.png",         name: "React" },
  { icon: "https://img.icons8.com/color/96/000000/cloud.png",                name: "Cloud" },
];

// ── RENDER ────────────────────────────────────────────────────
function renderSkills(skills, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  skills.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'skill-item';

    const isImage = /^(assets\/|https?:\/\/).+\.(svg|png|jpe?g|webp)$/i.test(skill.icon);
    const iconMarkup = isImage
      ? `<img class="skill-icon-img" src="${skill.icon}" alt="${skill.name} logo" loading="lazy" />`
      : `<span class="skill-icon">${skill.icon || ''}</span>`;

    item.innerHTML = `
      <div class="skill-top">
        <div class="skill-left">${iconMarkup}<span class="skill-name">${skill.name}</span></div>
      </div>`;
    container.appendChild(item);
  });
}

function renderTechStack() {
  const grid = document.getElementById('tech-grid');
  if (!grid) return;

  TECH_STACK.forEach(tech => {
    const chip = document.createElement('div');
    chip.className = 'tech-chip';

    const isImage = /^(assets\/|https?:\/\/).+\.(svg|png|jpe?g|webp)$/i.test(tech.icon);
    const iconMarkup = isImage
      ? `<img class="tech-icon tech-icon-img" src="${tech.icon}" alt="${tech.name} logo" loading="lazy" />`
      : `<span class="tech-icon">${tech.icon}</span>`;

    chip.innerHTML = `${iconMarkup}<span class="tech-label">${tech.name}</span>`;
    grid.appendChild(chip);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSkills(DEV_SKILLS,    'dev-skills');
  renderSkills(DESIGN_SKILLS, 'design-skills');
  renderTechStack();
});