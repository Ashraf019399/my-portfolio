// Modern Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider();
  initPortfolioFilter();
  initLightbox();
  initCounters();
  initMobileMenu();
  initContactForm();
  initLiquidPortrait();
  initBackToTop();
  initSmartHeader();
  initPricingSpotlight();
  initPricingSwitcher();
  initFaqAccordion();
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

  // Active floating pill highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navPills = document.querySelectorAll('.vyro-nav-item, .nav-pill-item');
  if (navPills.length > 0 && sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      if (current) {
        navPills.forEach(pill => {
          pill.classList.remove('active');
          if (pill.getAttribute('href') === `#${current}`) {
            pill.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }
}

/* ==========================================================
   6. Smart Contact Form with Instant WhatsApp Sync & Email
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const btnWhatsApp = document.getElementById('btnSendWhatsApp');
  const nameInput = document.getElementById('formName');
  const serviceInput = document.getElementById('formService');
  const budgetInput = document.getElementById('formBudget');
  const messageInput = document.getElementById('formMessage');

  if (!form) return;

  function validateInputs() {
    let isValid = true;
    [nameInput, messageInput].forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('!border-red-500', 'animate-pulse');
        setTimeout(() => input.classList.remove('animate-pulse'), 1000);
        isValid = false;
      } else {
        input.classList.remove('!border-red-500');
      }
    });
    return isValid;
  }

  // 1. Instant WhatsApp Direct Dispatch
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validateInputs()) {
        nameInput.focus();
        return;
      }

      const name = nameInput.value.trim();
      const service = serviceInput ? serviceInput.value : 'Graphic Design';
      const budget = budgetInput ? budgetInput.value : 'Flexible';
      const message = messageInput.value.trim();

      const text = `👋 Hello Muhammad Ashraf!%0A%0A` +
        `👤 *Name:* ${encodeURIComponent(name)}%0A` +
        `🎨 *Service Needed:* ${encodeURIComponent(service)}%0A` +
        `💰 *Estimated Budget:* ${encodeURIComponent(budget)}%0A%0A` +
        `📝 *Project Brief:*%0A${encodeURIComponent(message)}%0A%0A` +
        `Looking forward to collaborating with you!`;

      const whatsappUrl = `https://wa.me/8801939981392?text=${text}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 2. Direct Email Submission Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      nameInput.focus();
      return;
    }

    const name = nameInput.value.trim();
    const service = serviceInput ? serviceInput.value : 'Graphic Design';
    const budget = budgetInput ? budgetInput.value : 'Flexible';
    const message = messageInput.value.trim();

    const email = "Maashraf221@gmail.com";
    const subject = encodeURIComponent(`Project Inquiry: ${service} [${budget}] - from ${name}`);
    const body = encodeURIComponent(
      `Hello Muhammad Ashraf,\n\n` +
      `My name is ${name}.\n` +
      `I would like to inquire about your ${service} services.\n` +
      `Estimated Budget: ${budget}\n\n` +
      `Project Brief:\n${message}\n\n` +
      `Best regards,\n${name}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}

/* ==========================================================
   7. Interactive Liquid Portrait Distortion & Water Ripple
   ========================================================== */
function initLiquidPortrait() {
  const wrapper = document.getElementById('portraitLiquidWrapper');
  const turb = document.getElementById('liquidTurbulence');
  const disp = document.getElementById('liquidDisplacement');
  if (!wrapper || !turb || !disp) return;

  let animationFrame = null;
  let intensity = 0;
  let targetIntensity = 0;
  let phase = 0;

  function updateLiquid() {
    // Damped fluid wave physics
    intensity += (targetIntensity - intensity) * 0.14;
    targetIntensity *= 0.93; // liquid calming decay

    if (intensity > 0.01) {
      phase += 0.08;
      const currentScale = intensity * 42; // maximum displacement scale
      const freqX = 0.018 + Math.sin(phase) * 0.01;
      const freqY = 0.022 + Math.cos(phase * 1.3) * 0.012;

      disp.setAttribute('scale', currentScale.toFixed(2));
      turb.setAttribute('baseFrequency', `${freqX.toFixed(4)} ${freqY.toFixed(4)}`);
      animationFrame = requestAnimationFrame(updateLiquid);
    } else {
      disp.setAttribute('scale', '0');
      animationFrame = null;
    }
  }

  function triggerRipple(x, y, power = 1.0) {
    targetIntensity = Math.min(targetIntensity + power, 2.0);
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(updateLiquid);
    }

    // Spawn expanding water ripple shockwave ring at exact touch/click point
    const rect = wrapper.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = 'liquid-ripple-ring';
    ripple.style.left = `${x - rect.left}px`;
    ripple.style.top = `${y - rect.top}px`;
    wrapper.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 900);
  }

  // Pointerdown captures both mobile tap and mouse click
  wrapper.addEventListener('pointerdown', (e) => {
    triggerRipple(e.clientX, e.clientY, 1.3);
  });

  // Pointermove creates a subtle fluid wake as finger or cursor glides over
  wrapper.addEventListener('pointermove', (e) => {
    if (e.buttons === 1 || e.pointerType === 'touch') {
      targetIntensity = Math.max(targetIntensity, 0.9);
    } else {
      targetIntensity = Math.max(targetIntensity, 0.35);
    }
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(updateLiquid);
    }
  });
}

/* ==========================================================
   8. Bring To Top Floating Action Button
   ========================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  // Show button when scrolled down > 400px, smoothly hide at top
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('back-to-top-visible');
    } else {
      backToTopBtn.classList.remove('back-to-top-visible');
    }
  }, { passive: true });

  // Smooth scroll back to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================
   9. Smart Auto-Hide Floating Header
   Scroll down -> Hide smoothly (Full clean screen for artwork)
   Scroll up   -> Reveal instantly (Effortless navigation & CTA)
   ========================================================== */
function initSmartHeader() {
  const header = document.getElementById('mainHeader') || document.querySelector('header');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!header) return;

  let lastScrollY = window.scrollY;
  const scrollThreshold = 10; // minimum scroll delta

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Toggle frosted backdrop shield when scrolled down (> 40px) to prevent text bleed
    if (currentScrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Do not hide if mobile menu is currently open
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      lastScrollY = currentScrollY;
      return;
    }

    // Always show header near the top of the page (< 80px)
    if (currentScrollY < 80) {
      header.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    // Scroll Down -> Hide Header
    if (currentScrollY > lastScrollY + scrollThreshold) {
      header.classList.add('header-hidden');
    } 
    // Scroll Up -> Show Header
    else if (currentScrollY < lastScrollY - scrollThreshold) {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ==========================================================
   10. DesignMonks-Grade Pricing Card Mouse Spotlight Glow
   Tracks cursor coordinates across pricing cards and feeds
   --mouse-x and --mouse-y CSS variables for reactive illumination
   ========================================================== */
function initPricingSpotlight() {
  const cards = document.querySelectorAll('.pricing-spotlight-card, .bento-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      // Return smoothly to center when mouse leaves
      card.style.setProperty('--mouse-x', `50%`);
      card.style.setProperty('--mouse-y', `50%`);
    });
  });
}

/* ==========================================================
   11. DesignMonks Plan Switcher (One-Off vs Monthly Retainer)
   ========================================================== */
function initPricingSwitcher() {
  const btnOneOff = document.getElementById('btnPlanOneOff');
  const btnRetainer = document.getElementById('btnPlanRetainer');
  const gridOneOff = document.getElementById('pricingGridOneOff');
  const gridRetainer = document.getElementById('pricingGridRetainer');

  if (!btnOneOff || !btnRetainer || !gridOneOff || !gridRetainer) return;

  btnOneOff.addEventListener('click', () => {
    if (btnOneOff.classList.contains('active')) return;
    btnOneOff.classList.add('active');
    btnRetainer.classList.remove('active');

    gridRetainer.classList.add('hidden-pane');
    gridOneOff.classList.remove('hidden-pane');

    initPricingSpotlight();
  });

  btnRetainer.addEventListener('click', () => {
    if (btnRetainer.classList.contains('active')) return;
    btnRetainer.classList.add('active');
    btnOneOff.classList.remove('active');

    gridOneOff.classList.add('hidden-pane');
    gridRetainer.classList.remove('hidden-pane');

    initPricingSpotlight();
  });
}

/* ==========================================================
   12. DesignMonks-Style Pricing FAQ Accordion
   ========================================================== */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const currentItem = trigger.closest('.faq-item');
      if (!currentItem) return;

      const isOpen = currentItem.classList.contains('active');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isOpen) {
        currentItem.classList.add('active');
      }
    });
  });
}
