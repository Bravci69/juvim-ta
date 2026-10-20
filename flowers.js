/**
 * Flower SVG Generators for the Anniversary Web App
 * 8 distinct purple flower types with rich gradients, organic stems, and glowing details
 */

const FlowerSVGs = {
  // 1. Fialka lesná (Wild Violet)
  violet: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="stem-grad-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38b000"/>
          <stop offset="100%" stop-color="#1b4332"/>
        </linearGradient>
        <radialGradient id="violet-petal-${id}" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#e0aaff"/>
          <stop offset="40%" stop-color="#c77dff"/>
          <stop offset="85%" stop-color="#7b2cbf"/>
          <stop offset="100%" stop-color="#3c096c"/>
        </radialGradient>
        <radialGradient id="violet-center-${id}">
          <stop offset="0%" stop-color="#fff3b0"/>
          <stop offset="60%" stop-color="#ffb703"/>
          <stop offset="100%" stop-color="#fb8500"/>
        </radialGradient>
        <filter id="glow-${id}" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Stem and leaves -->
      <path d="M50 65 Q45 95 50 128" stroke="url(#stem-grad-${id})" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M48 85 Q30 80 34 70 Q45 76 48 85" fill="#2d6a4f" opacity="0.9"/>
      <path d="M51 98 Q70 94 65 83 Q55 88 51 98" fill="#40916c" opacity="0.85"/>
      <!-- Flower Head -->
      <g class="flower-head" transform-origin="50 48">
        <!-- Back petals -->
        <ellipse cx="36" cy="34" rx="14" ry="17" transform="rotate(-30 36 34)" fill="url(#violet-petal-${id})"/>
        <ellipse cx="64" cy="34" rx="14" ry="17" transform="rotate(30 64 34)" fill="url(#violet-petal-${id})"/>
        <!-- Side petals -->
        <ellipse cx="28" cy="52" rx="15" ry="14" transform="rotate(-65 28 52)" fill="url(#violet-petal-${id})"/>
        <ellipse cx="72" cy="52" rx="15" ry="14" transform="rotate(65 72 52)" fill="url(#violet-petal-${id})"/>
        <!-- Bottom main petal -->
        <path d="M50 46 C35 52 35 68 50 72 C65 68 65 52 50 46 Z" fill="url(#violet-petal-${id})"/>
        <!-- Center glowing eye -->
        <circle cx="50" cy="48" r="4.5" fill="url(#violet-center-${id})" filter="url(#glow-${id})"/>
        <path d="M50 45 L50 42 M47 48 L44 48 M53 48 L56 48" stroke="#ffe49e" stroke-width="1.2" stroke-linecap="round"/>
      </g>
    </svg>
  `,

  // 2. Levanduľa (Lavender)
  lavender: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lav-stem-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#40916c"/>
          <stop offset="100%" stop-color="#1b4332"/>
        </linearGradient>
        <linearGradient id="lav-bud-${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e0aaff"/>
          <stop offset="50%" stop-color="#9d4edd"/>
          <stop offset="100%" stop-color="#5a189a"/>
        </linearGradient>
      </defs>
      <!-- Slender Stem -->
      <path d="M50 20 Q52 75 49 128" stroke="url(#lav-stem-${id})" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Slender leaves -->
      <path d="M49 90 Q30 82 25 70 Q38 82 49 90" fill="#40916c" opacity="0.8"/>
      <path d="M50 102 Q70 96 76 82 Q62 94 50 102" fill="#2d6a4f" opacity="0.8"/>
      <!-- Stacked Lavender florets -->
      <g class="flower-head" transform-origin="50 50">
        <!-- Top tip -->
        <circle cx="50" cy="18" r="4" fill="url(#lav-bud-${id})"/>
        <circle cx="48" cy="24" r="5" fill="url(#lav-bud-${id})"/>
        <circle cx="53" cy="25" r="4.8" fill="url(#lav-bud-${id})"/>
        <!-- Tier 2 -->
        <ellipse cx="44" cy="32" rx="6" ry="4.5" transform="rotate(-15 44 32)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="56" cy="33" rx="6" ry="4.5" transform="rotate(15 56 33)" fill="url(#lav-bud-${id})"/>
        <circle cx="50" cy="31" r="3.5" fill="#e0aaff"/>
        <!-- Tier 3 -->
        <ellipse cx="42" cy="42" rx="7" ry="5" transform="rotate(-20 42 42)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="58" cy="43" rx="7" ry="5" transform="rotate(20 58 43)" fill="url(#lav-bud-${id})"/>
        <circle cx="50" cy="41" r="4" fill="#c77dff"/>
        <!-- Tier 4 -->
        <ellipse cx="41" cy="53" rx="7.5" ry="5.5" transform="rotate(-25 41 53)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="59" cy="54" rx="7.5" ry="5.5" transform="rotate(25 59 54)" fill="url(#lav-bud-${id})"/>
        <circle cx="50" cy="52" r="4" fill="#9d4edd"/>
        <!-- Tier 5 -->
        <ellipse cx="43" cy="65" rx="7" ry="5" transform="rotate(-18 43 65)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="57" cy="66" rx="7" ry="5" transform="rotate(18 57 66)" fill="url(#lav-bud-${id})"/>
      </g>
    </svg>
  `,

  // 3. Kráľovská orchidea (Royal Purple Orchid)
  orchid: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="orchid-grad-${id}" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#f72585"/>
          <stop offset="35%" stop-color="#b5179e"/>
          <stop offset="75%" stop-color="#7209b7"/>
          <stop offset="100%" stop-color="#3f37c9"/>
        </radialGradient>
        <radialGradient id="orchid-lip-${id}" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ffbe0b"/>
          <stop offset="40%" stop-color="#f72585"/>
          <stop offset="100%" stop-color="#560bad"/>
        </radialGradient>
      </defs>
      <path d="M50 70 Q46 98 50 128" stroke="#2d6a4f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M48 95 Q28 90 22 78 Q36 86 48 95" fill="#40916c"/>
      <g class="flower-head" transform-origin="50 48">
        <!-- Outer dorsal sepal -->
        <ellipse cx="50" cy="24" rx="11" ry="18" fill="url(#orchid-grad-${id})" opacity="0.95"/>
        <!-- Lateral sepals -->
        <ellipse cx="32" cy="60" rx="12" ry="18" transform="rotate(35 32 60)" fill="url(#orchid-grad-${id})" opacity="0.9"/>
        <ellipse cx="68" cy="60" rx="12" ry="18" transform="rotate(-35 68 60)" fill="url(#orchid-grad-${id})" opacity="0.9"/>
        <!-- Large wavy petals -->
        <ellipse cx="26" cy="42" rx="17" ry="14" transform="rotate(-15 26 42)" fill="url(#orchid-grad-${id})"/>
        <ellipse cx="74" cy="42" rx="17" ry="14" transform="rotate(15 74 42)" fill="url(#orchid-grad-${id})"/>
        <!-- Orchid Lip (Labellum) -->
        <path d="M44 48 C38 64 62 64 56 48 C60 52 58 60 50 63 C42 60 40 52 44 48 Z" fill="url(#orchid-lip-${id})"/>
        <circle cx="50" cy="46" r="3.5" fill="#ffd166"/>
      </g>
    </svg>
  `,

  // 4. Fialová ruža (Purple Rose)
  rose: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="rose-grad-${id}" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#e0aaff"/>
          <stop offset="30%" stop-color="#c77dff"/>
          <stop offset="65%" stop-color="#9d4edd"/>
          <stop offset="100%" stop-color="#5a189a"/>
        </radialGradient>
      </defs>
      <!-- Thorny stem -->
      <path d="M50 65 Q54 95 49 128" stroke="#1b4332" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M52 82 L56 79 L53 85 Z" fill="#1b4332"/>
      <path d="M50 90 Q70 85 75 72 Q60 78 50 90" fill="#2d6a4f"/>
      <path d="M48 102 Q28 98 22 86 Q38 92 48 102" fill="#40916c"/>
      <!-- Blooming Rose Head -->
      <g class="flower-head" transform-origin="50 48">
        <!-- Outer petals -->
        <circle cx="50" cy="48" r="28" fill="#5a189a" opacity="0.4"/>
        <path d="M24 45 C20 28 42 22 50 30 C58 22 80 28 76 45 C82 62 60 72 50 68 C40 72 18 62 24 45 Z" fill="url(#rose-grad-${id})"/>
        <!-- Layer 2 petals -->
        <path d="M30 46 C32 34 46 32 50 36 C54 32 68 34 70 46 C68 58 56 62 50 60 C44 62 32 58 30 46 Z" fill="#7b2cbf"/>
        <!-- Center swirl -->
        <path d="M38 46 C40 38 48 38 50 42 C52 38 60 38 62 46 C60 52 52 54 50 51 C48 54 40 52 38 46 Z" fill="#9d4edd"/>
        <ellipse cx="50" cy="46" rx="5" ry="4" fill="#c77dff"/>
        <circle cx="50" cy="45" r="2" fill="#ffd166"/>
      </g>
    </svg>
  `,

  // 5. Zvonček fialový (Bellflower / Campanula)
  bellflower: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bell-grad-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5a189a"/>
          <stop offset="50%" stop-color="#9d4edd"/>
          <stop offset="100%" stop-color="#e0aaff"/>
        </linearGradient>
      </defs>
      <path d="M50 55 Q40 85 50 128" stroke="#40916c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M47 88 Q28 85 24 75 Q38 82 47 88" fill="#2d6a4f"/>
      <g class="flower-head" transform-origin="50 42">
        <!-- Bell shape -->
        <path d="M50 20 C42 20 32 30 25 45 C35 48 42 42 50 54 C58 42 65 48 75 45 C68 30 58 20 50 20 Z" fill="url(#bell-grad-${id})"/>
        <!-- Inner petal flairs -->
        <path d="M25 45 C32 52 40 50 45 53 C40 45 32 46 25 45 Z" fill="#7b2cbf"/>
        <path d="M75 45 C68 52 60 50 55 53 C60 45 68 46 75 45 Z" fill="#7b2cbf"/>
        <path d="M45 53 C48 58 52 58 55 53 C52 50 48 50 45 53 Z" fill="#c77dff"/>
        <!-- Golden stamen hanging out -->
        <path d="M50 35 L50 62" stroke="#ffd166" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="50" cy="62" r="2.5" fill="#ffb703"/>
      </g>
    </svg>
  `,

  // 6. Šafran / Krokus (Spring Crocus)
  crocus: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="crocus-grad-${id}" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#3c096c"/>
          <stop offset="60%" stop-color="#7b2cbf"/>
          <stop offset="100%" stop-color="#c77dff"/>
        </linearGradient>
      </defs>
      <path d="M50 65 Q52 95 50 128" stroke="#2d6a4f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Slender crocus leaves with central stripe -->
      <path d="M49 85 Q32 75 28 55 Q38 72 49 85" fill="#40916c"/>
      <path d="M51 92 Q68 80 72 60 Q62 78 51 92" fill="#40916c"/>
      <g class="flower-head" transform-origin="50 45">
        <!-- Cup petals -->
        <ellipse cx="38" cy="42" rx="12" ry="22" transform="rotate(-15 38 42)" fill="url(#crocus-grad-${id})"/>
        <ellipse cx="62" cy="42" rx="12" ry="22" transform="rotate(15 62 42)" fill="url(#crocus-grad-${id})"/>
        <ellipse cx="50" cy="40" rx="13" ry="24" fill="url(#crocus-grad-${id})"/>
        <!-- Bright orange saffron pistils -->
        <path d="M47 38 L45 25 M50 38 L50 22 M53 38 L55 25" stroke="#ff8500" stroke-width="2" stroke-linecap="round"/>
        <circle cx="45" cy="24" r="2" fill="#ffb703"/>
        <circle cx="50" cy="21" r="2.2" fill="#ffb703"/>
        <circle cx="55" cy="24" r="2" fill="#ffb703"/>
      </g>
    </svg>
  `,

  // 7. Kúzelný lotos (Mystical Lotus)
  lotus: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="lotus-grad-${id}" cx="50%" cy="60%" r="65%">
          <stop offset="0%" stop-color="#ffb703"/>
          <stop offset="25%" stop-color="#f72585"/>
          <stop offset="70%" stop-color="#7209b7"/>
          <stop offset="100%" stop-color="#3a0ca3"/>
        </radialGradient>
      </defs>
      <path d="M50 70 Q46 98 50 128" stroke="#1b4332" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g class="flower-head" transform-origin="50 50">
        <!-- Base wide petals -->
        <path d="M50 55 C20 62 15 45 22 36 C32 46 42 50 50 55 Z" fill="url(#lotus-grad-${id})" opacity="0.85"/>
        <path d="M50 55 C80 62 85 45 78 36 C68 46 58 50 50 55 Z" fill="url(#lotus-grad-${id})" opacity="0.85"/>
        <!-- Mid petals -->
        <path d="M50 55 C28 55 26 32 35 24 C42 36 46 46 50 55 Z" fill="url(#lotus-grad-${id})"/>
        <path d="M50 55 C72 55 74 32 65 24 C58 36 54 46 50 55 Z" fill="url(#lotus-grad-${id})"/>
        <!-- Center pointed petal -->
        <path d="M50 55 C42 42 42 25 50 15 C58 25 58 42 50 55 Z" fill="url(#lotus-grad-${id})"/>
        <!-- Glowing Core -->
        <circle cx="50" cy="46" r="4.5" fill="#ffd166"/>
      </g>
    </svg>
  `,

  // 8. Fialová pivónia (Purple Peony)
  peony: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="peony-grad-${id}" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#f72585"/>
          <stop offset="40%" stop-color="#b5179e"/>
          <stop offset="80%" stop-color="#7209b7"/>
          <stop offset="100%" stop-color="#480ca8"/>
        </radialGradient>
      </defs>
      <path d="M50 68 Q53 96 50 128" stroke="#2d6a4f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M51 90 Q72 84 76 70 Q62 76 51 90" fill="#40916c"/>
      <path d="M49 104 Q26 100 20 86 Q36 92 49 104" fill="#2d6a4f"/>
      <g class="flower-head" transform-origin="50 46">
        <!-- Ruffled outer petals -->
        <circle cx="50" cy="46" r="26" fill="#480ca8" opacity="0.3"/>
        <ellipse cx="36" cy="38" rx="14" ry="12" fill="url(#peony-grad-${id})"/>
        <ellipse cx="64" cy="38" rx="14" ry="12" fill="url(#peony-grad-${id})"/>
        <ellipse cx="34" cy="52" rx="14" ry="12" fill="url(#peony-grad-${id})"/>
        <ellipse cx="66" cy="52" rx="14" ry="12" fill="url(#peony-grad-${id})"/>
        <ellipse cx="50" cy="56" rx="16" ry="12" fill="url(#peony-grad-${id})"/>
        <!-- Inner ruffled petals -->
        <ellipse cx="44" cy="44" rx="10" ry="9" fill="#c77dff"/>
        <ellipse cx="56" cy="44" rx="10" ry="9" fill="#c77dff"/>
        <circle cx="50" cy="44" r="7" fill="#e0aaff"/>
        <circle cx="50" cy="44" r="3" fill="#ffb703"/>
      </g>
    </svg>
  `
};

window.FlowerSVGs = FlowerSVGs;
