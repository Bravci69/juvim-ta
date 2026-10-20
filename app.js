/**
 * Anniversary Web Application for Jasi
 * "všetko najlepšie k výročiu jasi"
 * Minimalist, elegant, authentic presentation of 824 memories
 */

(function () {
  'use strict';

  // State
  let memories = [];
  let filteredMemories = [];
  let activeMonthKey = 'all';
  let searchQuery = '';
  let currentLightboxIndex = -1;
  let isZoomed = false;

  // DOM Elements
  const introScreen = document.getElementById('intro-screen');
  const gardenContainer = document.getElementById('garden-container');
  const monthTabsScroll = document.getElementById('month-tabs-scroll');
  const searchInput = document.getElementById('search-input');
  const renderedCountText = document.getElementById('rendered-count-text');
  
  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxContainer = document.getElementById('lightbox-container');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxLoader = document.getElementById('lightbox-loader');
  const lightboxDateText = document.getElementById('lightbox-date-text');
  const lightboxDayText = document.getElementById('lightbox-day-text');
  const lightboxCounterText = document.getElementById('lightbox-counter-text');
  const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
  const lightboxZoomBtn = document.getElementById('lightbox-zoom-btn');
  const randomMemoryBtn = document.getElementById('random-memory-btn');
  const brandHomeBtn = document.getElementById('brand-home-btn');

  // ==========================================================================
  // 1. INITIALIZATION & DATA LOADING
  // ==========================================================================
  async function init() {
    initPetalsCanvas();
    initIntro();

    if (window.PHOTOS_DATA && Array.isArray(window.PHOTOS_DATA)) {
      memories = window.PHOTOS_DATA;
    } else {
      try {
        const res = await fetch('photos_data.json');
        memories = await res.json();
      } catch (err) {
        console.error('Failed to load photos data:', err);
        gardenContainer.innerHTML = '<div class="no-results">Nepodarilo sa načítať spomienky.</div>';
        return;
      }
    }

    setupMonthTabs();
    applyFilters();
    setupEventListeners();
  }

  // ==========================================================================
  // 2. INTRO SEQUENCE: "všetko najlepšie k výročiu jasi"
  // ==========================================================================
  function initIntro() {
    // Automatically fades after 3.8s
    const introTimer = setTimeout(() => {
      dismissIntro();
    }, 3800);

    introScreen.addEventListener('click', () => {
      clearTimeout(introTimer);
      dismissIntro();
    });
  }

  function dismissIntro() {
    introScreen.classList.add('fade-out');
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 1800);
  }

  // ==========================================================================
  // 3. MONTH TABS & TIMELINE
  // ==========================================================================
  function setupMonthTabs() {
    const monthsMap = new Map();
    memories.forEach(m => {
      if (!monthsMap.has(m.month_year_key)) {
        monthsMap.set(m.month_year_key, {
          key: m.month_year_key,
          label: m.month_year_label,
          count: 0
        });
      }
      monthsMap.get(m.month_year_key).count++;
    });

    let html = `<button class="month-tab active" data-month="all">Všetky (${memories.length})</button>`;
    monthsMap.forEach(m => {
      html += `<button class="month-tab" data-month="${m.key}">${m.label}</button>`;
    });

    monthTabsScroll.innerHTML = html;

    monthTabsScroll.querySelectorAll('.month-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        monthTabsScroll.querySelectorAll('.month-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeMonthKey = tab.getAttribute('data-month');
        applyFilters();
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }

  // ==========================================================================
  // 4. FILTERING & RENDERING FLOWERS
  // ==========================================================================
  function applyFilters() {
    const q = searchQuery.toLowerCase().trim();

    filteredMemories = memories.filter(m => {
      const matchesMonth = (activeMonthKey === 'all') || (m.month_year_key === activeMonthKey);
      if (!matchesMonth) return false;

      if (!q) return true;
      return (
        m.formatted_date.toLowerCase().includes(q) ||
        m.short_date.toLowerCase().includes(q) ||
        m.day_name.toLowerCase().includes(q) ||
        m.month_year_label.toLowerCase().includes(q) ||
        String(m.memory_number).includes(q)
      );
    });

    renderGarden();
  }

  function renderGarden() {
    if (renderedCountText) {
      renderedCountText.textContent = `${filteredMemories.length} spomienok`;
    }

    if (filteredMemories.length === 0) {
      gardenContainer.innerHTML = `
        <div class="no-results">
          <p>Nenašli sa žiadne fotografie pre zadané vyhľadávanie.</p>
        </div>
      `;
      return;
    }

    // Group by month
    const groups = new Map();
    filteredMemories.forEach(m => {
      if (!groups.has(m.month_year_key)) {
        groups.set(m.month_year_key, {
          label: m.month_year_label,
          items: []
        });
      }
      groups.get(m.month_year_key).items.push(m);
    });

    let mainHtml = '';

    groups.forEach((group, key) => {
      mainHtml += `
        <section class="month-section" id="section-${key}">
          <div class="month-section-header">
            <h2 class="month-section-title">${group.label}</h2>
            <span class="month-section-count">${group.items.length}</span>
          </div>
          <div class="flowers-grid">
      `;

      group.items.forEach(item => {
        const flowerRenderer = window.FlowerSVGs[item.flower_type] || window.FlowerSVGs.violet;
        const svgContent = flowerRenderer(item.id);
        
        // Random slight height variation for natural meadow look (110px to 132px)
        const itemHeight = 110 + ((item.id * 17) % 24);
        const timeDisplay = item.has_exact_time 
          ? `<div class="tooltip-day">${item.day_name}, ${item.time}</div>` 
          : `<div class="tooltip-day">${item.day_name}</div>`;

        mainHtml += `
          <div class="flower-item" 
               id="flower-${item.id}"
               data-id="${item.id}"
               style="height: ${itemHeight}px;"
               role="button"
               tabindex="0"
               aria-label="${item.formatted_date}">
            
            <div class="flower-glow-spot"></div>

            <div class="flower-svg-wrapper">
              ${svgContent}
            </div>

            <div class="flower-tooltip">
              <div class="tooltip-date">${item.short_date}</div>
              ${timeDisplay}
            </div>

          </div>
        `;
      });

      mainHtml += `
          </div>
        </section>
      `;
    });

    gardenContainer.innerHTML = mainHtml;

    // Attach click events
    gardenContainer.querySelectorAll('.flower-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = parseInt(el.getAttribute('data-id'), 10);
        openLightboxById(id);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = parseInt(el.getAttribute('data-id'), 10);
          openLightboxById(id);
        }
      });
    });
  }

  // ==========================================================================
  // 5. LIGHTBOX MODAL (PHOTO VIEWER)
  // ==========================================================================
  function openLightboxById(id) {
    const idx = filteredMemories.findIndex(m => m.id === id);
    if (idx !== -1) {
      openLightboxByIndex(idx);
    }
  }

  function openLightboxByIndex(index) {
    if (index < 0 || index >= filteredMemories.length) return;
    currentLightboxIndex = index;
    const item = filteredMemories[index];

    isZoomed = false;
    lightboxImg.style.transform = 'scale(1)';

    // Update Text Details
    lightboxDateText.textContent = item.formatted_date;
    lightboxDayText.textContent = item.day_name + (item.has_exact_time ? `, ${item.time}` : '');
    lightboxCounterText.textContent = `${item.memory_number} / ${memories.length}`;
    lightboxDownloadBtn.href = item.path;
    lightboxDownloadBtn.download = item.filename;

    // Show Loader
    lightboxLoader.classList.add('active');

    if (item.is_video) {
      lightboxImg.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = item.path;
      lightboxVideo.onloadeddata = () => {
        lightboxLoader.classList.remove('active');
      };
      lightboxVideo.play().catch(() => {});
    } else {
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxImg.style.display = 'block';
      
      const tempImg = new Image();
      tempImg.onload = () => {
        lightboxImg.src = item.path;
        lightboxLoader.classList.remove('active');
      };
      tempImg.onerror = () => {
        lightboxImg.src = item.path;
        lightboxLoader.classList.remove('active');
      };
      tempImg.src = item.path;
    }

    // Preload adjacent images
    if (index + 1 < filteredMemories.length && !filteredMemories[index + 1].is_video) {
      const nextPreload = new Image();
      nextPreload.src = filteredMemories[index + 1].path;
    }

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxVideo.pause();
    document.body.style.overflow = '';
  }

  function showNextMemory() {
    if (filteredMemories.length === 0) return;
    const nextIdx = (currentLightboxIndex + 1) % filteredMemories.length;
    openLightboxByIndex(nextIdx);
  }

  function showPrevMemory() {
    if (filteredMemories.length === 0) return;
    const prevIdx = (currentLightboxIndex - 1 + filteredMemories.length) % filteredMemories.length;
    openLightboxByIndex(prevIdx);
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    if (isZoomed) {
      lightboxImg.style.transform = 'scale(1.75)';
      lightboxImg.style.cursor = 'zoom-out';
    } else {
      lightboxImg.style.transform = 'scale(1)';
      lightboxImg.style.cursor = 'zoom-in';
    }
  }

  // ==========================================================================
  // 6. RANDOM MEMORY
  // ==========================================================================
  function pickRandomMemory() {
    if (filteredMemories.length === 0) return;
    const randIdx = Math.floor(Math.random() * filteredMemories.length);
    const item = filteredMemories[randIdx];

    const flowerEl = document.getElementById(`flower-${item.id}`);
    if (flowerEl) {
      flowerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      flowerEl.style.transition = 'all 0.4s ease';
      flowerEl.style.filter = 'drop-shadow(0 0 20px rgba(203, 186, 217, 0.8))';
      setTimeout(() => {
        flowerEl.style.filter = '';
        openLightboxByIndex(randIdx);
      }, 500);
    } else {
      openLightboxByIndex(randIdx);
    }
  }

  // ==========================================================================
  // 7. PETALS & PARTICLES CANVAS (Gentle subtle drift)
  // ==========================================================================
  function initPetalsCanvas() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalColors = [
      'rgba(203, 186, 217, 0.45)',
      'rgba(180, 160, 200, 0.35)',
      'rgba(141, 119, 160, 0.3)',
      'rgba(225, 215, 235, 0.35)'
    ];

    for (let i = 0; i < 35; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 3 + Math.random() * 5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        vx: -0.5 + Math.random() * 1.0,
        vy: 0.4 + Math.random() * 0.8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: -0.015 + Math.random() * 0.03,
        swayAmp: 0.5 + Math.random() * 1.2,
        swayFreq: 0.008 + Math.random() * 0.015,
        step: Math.random() * 100
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.step += p.swayFreq;
        p.x += p.vx + Math.sin(p.step) * p.swayAmp;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 1.7, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ==========================================================================
  // 8. EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          searchQuery = e.target.value;
          applyFilters();
        }, 200);
      });
    }

    if (brandHomeBtn) {
      brandHomeBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevMemory);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextMemory);
    if (lightboxZoomBtn) lightboxZoomBtn.addEventListener('click', toggleZoom);
    if (lightboxImg) lightboxImg.addEventListener('click', toggleZoom);

    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          showPrevMemory();
        } else if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          showNextMemory();
        }
      }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    if (lightboxModal) {
      lightboxModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      lightboxModal.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            showNextMemory();
          } else {
            showPrevMemory();
          }
        }
      }, { passive: true });
    }

    if (randomMemoryBtn) {
      randomMemoryBtn.addEventListener('click', pickRandomMemory);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
