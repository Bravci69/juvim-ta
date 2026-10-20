/**
 * Anniversary Web Application for Jasi
 * "všetko najlepšie k výročiu jasi"
 * Handles intro sequence, interactive purple flower garden, lightbox modal, canvas particles, and ambient music
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
  let slideshowInterval = null;
  let isAudioPlaying = false;
  let audioContext = null;
  let musicTimeout = null;

  // DOM Elements
  const introScreen = document.getElementById('intro-screen');
  const skipIntroBtn = document.getElementById('skip-intro-btn');
  const replayIntroBtn = document.getElementById('replay-intro-btn');
  const gardenContainer = document.getElementById('garden-container');
  const monthTabsScroll = document.getElementById('month-tabs-scroll');
  const searchInput = document.getElementById('search-input');
  const renderedCountText = document.getElementById('rendered-count-text');
  const introCountText = document.getElementById('intro-count-text');
  
  // Lightbox DOM Elements
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
  const slideshowBtn = document.getElementById('slideshow-btn');
  const slideshowBtnLabel = document.getElementById('slideshow-btn-label');
  const brandHomeBtn = document.getElementById('brand-home-btn');
  const musicBtn = document.getElementById('music-btn');
  const soundWaves = document.getElementById('sound-waves');

  // ==========================================================================
  // 1. INITIALIZATION & DATA LOADING
  // ==========================================================================
  async function init() {
    initPetalsCanvas();
    initIntro();

    // Load data from window.PHOTOS_DATA or fetch fallback
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

    if (introCountText) {
      introCountText.textContent = `${memories.length} kvetov pre ${memories.length} krásnych chvíľ`;
    }

    setupMonthTabs();
    applyFilters();
    setupEventListeners();
  }

  // ==========================================================================
  // 2. INTRO SEQUENCE: "všetko najlepšie k výročiu jasi"
  // ==========================================================================
  function initIntro() {
    // Automatically fade out after 3.8s
    const introTimer = setTimeout(() => {
      dismissIntro();
    }, 3800);

    if (skipIntroBtn) {
      skipIntroBtn.addEventListener('click', () => {
        clearTimeout(introTimer);
        dismissIntro();
      });
    }

    introScreen.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        clearTimeout(introTimer);
        dismissIntro();
      }
    });
  }

  function dismissIntro() {
    introScreen.classList.add('fade-out');
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 1800);
  }

  function replayIntro() {
    introScreen.style.display = 'flex';
    // Force reflow
    void introScreen.offsetWidth;
    introScreen.classList.remove('fade-out');
    setTimeout(() => {
      dismissIntro();
    }, 4500);
  }

  // ==========================================================================
  // 3. MONTH TABS & TIMELINE
  // ==========================================================================
  function setupMonthTabs() {
    // Extract unique months in chronological order
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

    let html = `<button class="month-tab active" data-month="all">🌸 Všetky spomienky (${memories.length})</button>`;
    monthsMap.forEach(m => {
      html += `<button class="month-tab" data-month="${m.key}">${m.label} (${m.count})</button>`;
    });

    monthTabsScroll.innerHTML = html;

    monthTabsScroll.querySelectorAll('.month-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        monthTabsScroll.querySelectorAll('.month-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeMonthKey = tab.getAttribute('data-month');
        applyFilters();
        // Smooth scroll tab into view
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
      renderedCountText.innerHTML = `<strong>${filteredMemories.length}</strong> kvetín`;
    }

    if (filteredMemories.length === 0) {
      gardenContainer.innerHTML = `
        <div class="no-results">
          <p style="font-size: 2rem; margin-bottom: 12px;">🌿</p>
          <p>Nenašli sa žiadne kvety pre zadané hľadanie.</p>
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
            <h2 class="month-section-title">
              <span>🌸</span>
              <span>${group.label}</span>
            </h2>
            <span class="month-section-count">${group.items.length} ${group.items.length === 1 ? 'kvet' : (group.items.length < 5 ? 'kvety' : 'kvetov')}</span>
          </div>
          <div class="flowers-grid">
      `;

      group.items.forEach(item => {
        const flowerRenderer = window.FlowerSVGs[item.flower_type] || window.FlowerSVGs.violet;
        const svgContent = flowerRenderer(item.id);
        
        // Random slight height variation for meadow look (110px to 132px)
        const itemHeight = 110 + ((item.id * 17) % 24);
        const timeDisplay = item.has_exact_time ? `<div class="tooltip-day">${item.day_name} · ⏰ ${item.time}</div>` : `<div class="tooltip-day">${item.day_name}</div>`;

        mainHtml += `
          <div class="flower-item" 
               id="flower-${item.id}"
               data-id="${item.id}"
               style="height: ${itemHeight}px;"
               role="button"
               tabindex="0"
               aria-label="Fotka zo dňa ${item.formatted_date}">
            
            <div class="flower-glow-spot"></div>

            <div class="flower-svg-wrapper">
              ${svgContent}
            </div>

            <div class="flower-tooltip">
              <div class="tooltip-date">
                <span>📅</span>
                <span>${item.short_date}</span>
              </div>
              ${timeDisplay}
              <div class="tooltip-hint">✨ Klikni pre fotku 💜</div>
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
    lightboxDayText.textContent = item.day_name + (item.has_exact_time ? ` · ⏰ ${item.time}` : '');
    lightboxCounterText.textContent = `Spomienka ${item.memory_number} z ${memories.length}`;
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

    // Preload next image
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
    stopSlideshow();
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
  // 6. RANDOM MEMORY & SLIDESHOW
  // ==========================================================================
  function pickRandomMemory() {
    if (filteredMemories.length === 0) return;
    const randIdx = Math.floor(Math.random() * filteredMemories.length);
    const item = filteredMemories[randIdx];

    // Highlight and scroll to flower
    const flowerEl = document.getElementById(`flower-${item.id}`);
    if (flowerEl) {
      flowerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      flowerEl.style.transition = 'all 0.5s ease';
      flowerEl.style.filter = 'drop-shadow(0 0 35px #ffd166)';
      setTimeout(() => {
        flowerEl.style.filter = '';
        openLightboxByIndex(randIdx);
      }, 700);
    } else {
      openLightboxByIndex(randIdx);
    }
  }

  function toggleSlideshow() {
    if (slideshowInterval) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  function startSlideshow() {
    if (filteredMemories.length === 0) return;
    if (!lightboxModal.classList.contains('active')) {
      openLightboxByIndex(0);
    }
    slideshowBtn.classList.add('active');
    slideshowBtnLabel.textContent = 'Pauza';
    slideshowInterval = setInterval(() => {
      showNextMemory();
    }, 4200);
  }

  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      slideshowBtn.classList.remove('active');
      slideshowBtnLabel.textContent = 'Príbeh';
    }
  }

  // ==========================================================================
  // 7. ROMANTIC AMBIENT AUDIO SYNTH (Web Audio API)
  // Pure Web Audio music box / celesta pentatonic chords
  // ==========================================================================
  function toggleMusic() {
    if (isAudioPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function startMusic() {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      isAudioPlaying = true;
      musicBtn.classList.add('active');
      soundWaves.classList.remove('paused');

      playChordProgression();
    } catch (e) {
      console.warn('Audio could not be initialized:', e);
    }
  }

  function stopMusic() {
    isAudioPlaying = false;
    musicBtn.classList.remove('active');
    soundWaves.classList.add('paused');
    if (musicTimeout) {
      clearTimeout(musicTimeout);
      musicTimeout = null;
    }
  }

  function playTone(freq, time, duration, gainVal = 0.15) {
    if (!audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    // Gentle sine/triangle chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(gainVal, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Romantic Eb Major / C Minor dreamy pentatonic arpeggio
  const CHORD_PROGRESSIONS = [
    // Eb Major (Eb, G, Bb, Eb, G)
    [311.13, 392.00, 466.16, 622.25, 783.99],
    // C Minor (C, Eb, G, C, Eb)
    [261.63, 311.13, 392.00, 523.25, 622.25],
    // Ab Major (Ab, C, Eb, Ab, C)
    [207.65, 261.63, 311.13, 415.30, 523.25],
    // Bb Major (Bb, D, F, Bb, D)
    [233.08, 293.66, 349.23, 466.16, 587.33]
  ];

  let chordIndex = 0;

  function playChordProgression() {
    if (!isAudioPlaying || !audioContext) return;

    const now = audioContext.currentTime;
    const chord = CHORD_PROGRESSIONS[chordIndex % CHORD_PROGRESSIONS.length];
    chordIndex++;

    // Play gentle arpeggiated chime
    chord.forEach((noteFreq, i) => {
      playTone(noteFreq, now + (i * 0.38), 2.2, 0.08 - (i * 0.01));
    });

    // Soft bass foundation
    playTone(chord[0] / 2, now, 3.5, 0.12);

    musicTimeout = setTimeout(playChordProgression, 3200);
  }

  // ==========================================================================
  // 8. PETALS & PARTICLES CANVAS (Floating in wind)
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
      'rgba(224, 170, 255, 0.65)',
      'rgba(199, 125, 255, 0.55)',
      'rgba(157, 78, 221, 0.45)',
      'rgba(247, 37, 133, 0.4)',
      'rgba(255, 209, 102, 0.35)'
    ];

    // Create 45 petals
    for (let i = 0; i < 45; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 4 + Math.random() * 7,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        vx: -0.8 + Math.random() * 1.6,
        vy: 0.6 + Math.random() * 1.2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: -0.02 + Math.random() * 0.04,
        swayAmp: 0.8 + Math.random() * 1.8,
        swayFreq: 0.01 + Math.random() * 0.02,
        step: Math.random() * 100
      });
    }

    // Fireflies / starlight sparkles
    const stars = [];
    for (let i = 0; i < 28; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2,
        opacity: Math.random(),
        fadeSpeed: 0.005 + Math.random() * 0.015,
        fadeDir: 1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw twinkles
      stars.forEach(s => {
        s.opacity += s.fadeSpeed * s.fadeDir;
        if (s.opacity > 1) { s.opacity = 1; s.fadeDir = -1; }
        if (s.opacity < 0.1) { s.opacity = 0.1; s.fadeDir = 1; }

        ctx.fillStyle = `rgba(255, 235, 180, ${s.opacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Petals
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
        ctx.ellipse(0, 0, p.r, p.r * 1.8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ==========================================================================
  // 9. EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    // Search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = e.target.value;
        applyFilters();
      }, 200);
    });

    // Brand Home button scrolls smoothly to top
    if (brandHomeBtn) {
      brandHomeBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Lightbox Controls
    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxPrevBtn.addEventListener('click', showPrevMemory);
    lightboxNextBtn.addEventListener('click', showNextMemory);
    lightboxZoomBtn.addEventListener('click', toggleZoom);
    lightboxImg.addEventListener('click', toggleZoom);

    // Lightbox Backdrop Click to Close
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (lightboxModal.classList.contains('active')) {
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

    // Touch Swipe Support for Mobile Lightbox
    let touchStartX = 0;
    let touchStartY = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      // Horizontal swipe (dominant over vertical)
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          showNextMemory(); // Swipe Left -> Next
        } else {
          showPrevMemory(); // Swipe Right -> Prev
        }
      }
    }, { passive: true });

    // Buttons
    replayIntroBtn.addEventListener('click', replayIntro);
    randomMemoryBtn.addEventListener('click', pickRandomMemory);
    slideshowBtn.addEventListener('click', toggleSlideshow);
    musicBtn.addEventListener('click', toggleMusic);
  }

  // Start app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
