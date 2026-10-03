// 문결 정신건강의학과 — site interactions

document.getElementById('year').textContent = new Date().getFullYear();

// staggered variable-font weight hover on nav links
document.querySelectorAll('.main-nav a').forEach((link) => {
  const label = link.textContent;
  const chars = Array.from(label);
  link.setAttribute('aria-label', label);
  link.innerHTML = '';
  const center = (chars.length - 1) / 2;
  chars.forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'nav-char';
    span.textContent = ch === ' ' ? ' ' : ch;
    span.style.transitionDelay = `${Math.abs(i - center) * 0.03}s`;
    link.appendChild(span);
  });
});

// header shadow on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// space gallery: collapse same-space photos into one stacked card, open lightbox on click
const spaceItems = document.querySelectorAll('.space-item[data-group]');
if (spaceItems.length) {
  const isEnglish = document.documentElement.lang === 'en';
  const groups = {};
  spaceItems.forEach((item) => {
    const key = item.dataset.group;
    (groups[key] = groups[key] || []).push(item);
  });

  const lightbox = document.createElement('div');
  lightbox.className = 'space-lightbox';
  lightbox.innerHTML = `
    <button class="space-lightbox-close" aria-label="Close">&times;</button>
    <button class="space-lightbox-prev" aria-label="Previous">&#8249;</button>
    <img class="space-lightbox-img" src="" alt="">
    <button class="space-lightbox-next" aria-label="Next">&#8250;</button>
    <div class="space-lightbox-info">
      <p class="space-lightbox-caption"></p>
      <span class="space-lightbox-count"></span>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('.space-lightbox-img');
  const lbCaption = lightbox.querySelector('.space-lightbox-caption');
  const lbCount = lightbox.querySelector('.space-lightbox-count');
  const lbPrev = lightbox.querySelector('.space-lightbox-prev');
  const lbNext = lightbox.querySelector('.space-lightbox-next');
  const lbClose = lightbox.querySelector('.space-lightbox-close');

  let currentPhotos = [];
  let currentIndex = 0;

  function renderLightbox() {
    const photo = currentPhotos[currentIndex];
    lbImg.src = photo.src;
    lbImg.alt = photo.alt;
    lbCaption.textContent = photo.caption;
    const multi = currentPhotos.length > 1;
    lbCount.textContent = multi ? `${currentIndex + 1} / ${currentPhotos.length}` : '';
    lbPrev.style.display = multi ? 'flex' : 'none';
    lbNext.style.display = multi ? 'flex' : 'none';
  }

  function openLightbox(photos, index) {
    currentPhotos = photos;
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  lbPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
    renderLightbox();
  });
  lbNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentPhotos.length;
    renderLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

  Object.keys(groups).forEach((key) => {
    const items = groups[key];
    const photos = items.map((item) => {
      const img = item.querySelector('.space-photo');
      const caption = item.querySelector('.space-photo-overlay p');
      return { src: img.src, alt: img.alt, caption: caption ? caption.textContent : '' };
    });

    const wrap = items[0].querySelector('.space-photo-wrap');
    wrap.addEventListener('click', () => openLightbox(photos, 0));
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(photos, 0);
      }
    });

    if (items.length > 1) {
      wrap.classList.add('has-stack');
      const badge = document.createElement('span');
      badge.className = 'space-stack-badge';
      badge.textContent = isEnglish ? `${items.length} photos` : `${items.length}장`;
      wrap.appendChild(badge);
      items.slice(1).forEach((item) => { item.style.display = 'none'; });
    }
  });
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));
