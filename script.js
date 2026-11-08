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
  initScrollReveal();
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

  const portfolioCards = document.querySelectorAll('.portfolio-item');
  portfolioCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicked the Behance link, let external navigation proceed
      if (e.target.closest('a[href*="behance.net"]') || e.target.closest('a[target="_blank"]')) {
        return;
      }

      e.preventDefault();
      const img = card.querySelector('img') ? card.querySelector('img').src : '';
      const title = card.getAttribute('data-title') || 'Creative Artwork';
      const category = card.getAttribute('data-category-label') || 'Design Project';
      const desc = card.getAttribute('data-desc') || 'High-impact visual composition created with Adobe Photoshop & Illustrator.';
      const behanceUrl = card.getAttribute('data-behance') || 'https://www.behance.net/ashraf012';

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
  const dockMoreBtn = document.getElementById('dockMoreToggle');
  const menu = document.getElementById('mobileMenu');
  const links = menu ? menu.querySelectorAll('a') : [];

  if (menu) {
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }

    if (dockMoreBtn) {
      dockMoreBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        if (!menu.classList.contains('hidden')) {
          menu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }

  // Active floating pill & mobile dock item highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navPills = document.querySelectorAll('.vyro-nav-item, .nav-pill-item');
  const dockItems = document.querySelectorAll('.dm-dock-item[data-tab]');

  function updateScrollSpy() {
    let current = '';
    const scrollPos = window.scrollY;

    if (scrollPos < 250) {
      current = 'home';
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        if (scrollPos >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
    }

    if (current) {
      // Desktop nav capsule pills
      navPills.forEach(pill => {
        if (pill.getAttribute('href') === `#${current}`) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // Mobile DesignMonks dock tabs
      dockItems.forEach(item => {
        const tab = item.getAttribute('data-tab');
        if (tab === current) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  if (sections.length > 0) {
    // Immediate evaluation on page load / refresh
    updateScrollSpy();

    // Listen to scroll events
    window.addEventListener('scroll', updateScrollSpy, { passive: true });

    // Catch asynchronous scroll restorations by the browser
    window.addEventListener('load', updateScrollSpy);
    window.addEventListener('pageshow', updateScrollSpy);
    setTimeout(updateScrollSpy, 60);
    setTimeout(updateScrollSpy, 250);
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

      const rawText = `👋 Hello Muhammad Ashraf!\n\n` +
        `👤 Name: ${name}\n` +
        `🎨 Service Needed: ${service}\n` +
        `💰 Estimated Budget: ${budget}\n\n` +
        `📝 Project Brief:\n${message}\n\n` +
        `Looking forward to collaborating with you!`;

      const whatsappUrl = `https://wa.me/8801939981392?text=${encodeURIComponent(rawText)}`;
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

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('back-to-top-visible');
    } else {
      backToTopBtn.classList.remove('back-to-top-visible');
    }
  }

  // Immediate evaluation on load / refresh
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  window.addEventListener('load', updateBackToTop);
  window.addEventListener('pageshow', updateBackToTop);
  setTimeout(updateBackToTop, 60);
  setTimeout(updateBackToTop, 250);

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

  function updateHeaderState() {
    const currentScrollY = window.scrollY;

    // Toggle frosted backdrop shield when scrolled down (> 30px) to prevent text bleed
    if (currentScrollY > 30) {
      header.classList.add('header-scrolled');
      document.documentElement.classList.add('is-scrolled');
    } else {
      header.classList.remove('header-scrolled');
      document.documentElement.classList.remove('is-scrolled');
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
  }

  // Immediate evaluation on load / refresh
  updateHeaderState();

  // Listen to scroll events
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  // Catch delayed browser scroll restoration on refresh
  window.addEventListener('load', updateHeaderState);
  window.addEventListener('pageshow', updateHeaderState);
  setTimeout(updateHeaderState, 60);
  setTimeout(updateHeaderState, 250);
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
    gridOneOff.querySelectorAll('.reveal-init').forEach(el => el.classList.add('reveal-active'));

    initPricingSpotlight();
  });

  btnRetainer.addEventListener('click', () => {
    if (btnRetainer.classList.contains('active')) return;
    btnRetainer.classList.add('active');
    btnOneOff.classList.remove('active');

    gridOneOff.classList.add('hidden-pane');
    gridRetainer.classList.remove('hidden-pane');
    gridRetainer.querySelectorAll('.reveal-init').forEach(el => el.classList.add('reveal-active'));

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

/* ==========================================================
   13. Framer / Apple Luxury Scroll-Reveal Engine
   Progressive optical de-blur and staggered arrival choreography
   ========================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!revealElements.length) return;

  // Fallback for older browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('reveal-active'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('reveal-active');
        observer.unobserve(target); // Reveal smoothly once

        // Clean up reveal classes after transition finishes to free GPU memory & preserve all native hover states
        setTimeout(() => {
          target.classList.remove('reveal-init', 'reveal-active', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4');
        }, 1400);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}
