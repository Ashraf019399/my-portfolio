// Modern Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider();
  initPortfolioFilter();
  initLightbox();
  initCounters();
  initMobileMenu();
  initContactForm();
});

/* ==========================================================
   1. Interactive Before / After Manipulation Slider
   ========================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('baSlider');
  if (!container) return;

  const beforeLayer = container.querySelector('.ba-before-layer') || container.querySelector('.ba-slider-before');
  const beforeImg = beforeLayer ? beforeLayer.querySelector('img') : null;
  const handle = container.querySelector('.ba-handle') || container.querySelector('.ba-slider-handle');

  if (!beforeLayer || !beforeImg || !handle) return;

  function updateImageWidth() {
    const width = container.offsetWidth;
    beforeImg.style.width = width + 'px';
  }

  // Update on window resize
  window.addEventListener('resize', updateImageWidth);
  updateImageWidth();

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;

    // Constrain within container
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.classList.add('active');
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      container.classList.remove('active');
    }
  });

  // Touch Events for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    container.classList.add('active');
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      container.classList.remove('active');
    }
  });
}

/* ==========================================================
   2. Portfolio Filter Tabs
   ========================================================== */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterButtons.forEach(b => {
        b.classList.remove('bg-[#ff6b00]', 'text-white', 'shadow-lg', 'shadow-[#ff6b00]/30');
        b.classList.add('bg-white/5', 'text-gray-400', 'hover:bg-white/10');
      });
      btn.classList.add('bg-[#ff6b00]', 'text-white', 'shadow-lg', 'shadow-[#ff6b00]/30');
      btn.classList.remove('bg-white/5', 'text-gray-400', 'hover:bg-white/10');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.classList.add('animate-fadeIn');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================
   3. Lightbox Artwork Modal
   ========================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCategory = document.getElementById('lightboxCategory');
  const modalDesc = document.getElementById('lightboxDesc');
  const modalBehance = document.getElementById('lightboxBehance');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal) return;

  const openButtons = document.querySelectorAll('.open-lightbox');
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.portfolio-item');
      if (!parent) return;

      const img = parent.querySelector('img').src;
      const title = parent.getAttribute('data-title') || 'Creative Artwork';
      const category = parent.getAttribute('data-category-label') || 'Design Project';
      const desc = parent.getAttribute('data-desc') || 'High-impact visual composition created with Adobe Photoshop & Illustrator.';
      const behanceUrl = parent.getAttribute('data-behance') || 'https://behance.net';

      modalImg.src = img;
      modalTitle.textContent = title;
      modalCategory.textContent = category;
      modalDesc.textContent = desc;
      modalBehance.href = behanceUrl;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================
   4. Animated Stat Counters
   ========================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = 2000 / target;

          const updateCount = () => {
            const increment = Math.ceil(target / 40);
            if (count < target) {
              count += increment;
              if (count > target) count = target;
              counter.innerText = count + (counter.getAttribute('data-suffix') || '');
              setTimeout(updateCount, 30);
            } else {
              counter.innerText = target + (counter.getAttribute('data-suffix') || '');
            }
          };

          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================
   5. Mobile Menu Toggle
   ========================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  const links = menu ? menu.querySelectorAll('a') : [];

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================
   6. Contact Form Email Inquiry Handler
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const service = document.getElementById('formService').value;
    const message = document.getElementById('formMessage').value;

    const email = "Maashraf221@gmail.com";
    const subject = encodeURIComponent(`Project Inquiry: ${service} - from ${name}`);
    const body = encodeURIComponent(`Hello Muhammad Ashraf,\n\nMy name is ${name}.\nI am interested in your ${service} service.\n\nProject Brief:\n${message}\n\nBest regards,\n${name}`);

    // Open email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}
