// ---- Year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Mobile menu ----
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('active');
  })
);

// ---- House galleries ----
const galleries = {
  '75':  Array.from({length:10}, (_,i)=>`assets/img/h75-${i+1}.jpg`),
  '100': Array.from({length:9},  (_,i)=>`assets/img/h100-${i+1}.jpg`),
  '200': Array.from({length:10}, (_,i)=>`assets/img/h200-${i+1}.jpg`),
};

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
let currentSet = [];
let currentIndex = 0;

function showImage(i){
  currentIndex = (i + currentSet.length) % currentSet.length;
  lbImg.src = currentSet[currentIndex];
  lbCounter.textContent = `${currentIndex + 1} / ${currentSet.length}`;
}
function openLightbox(key){
  currentSet = galleries[key] || [];
  if(!currentSet.length) return;
  showImage(0);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-gallery]').forEach(g =>
  g.addEventListener('click', () => openLightbox(g.dataset.gallery))
);

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', () => showImage(currentIndex + 1));
document.getElementById('lbPrev').addEventListener('click', () => showImage(currentIndex - 1));
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowRight') showImage(currentIndex + 1);
  if(e.key === 'ArrowLeft') showImage(currentIndex - 1);
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll(
  '.section__head, .about__text, .about__media, .house, .amenity, .location__card, .location__map, .cta__inner'
);
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('in'), (i % 4) * 80);
      io.unobserve(entry.target);
    }
  });
}, { threshold:0.12 });
revealEls.forEach(el => io.observe(el));
