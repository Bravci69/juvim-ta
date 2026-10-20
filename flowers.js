/**
 * Handcrafted Botanical Purple Flower Illustrations
 * Refined, organic shades: dusty lavender, plum, soft lilac, muted sage & warm honey
 */

const FlowerSVGs = {
  // 1. Fialka lesná (Wild Violet)
  violet: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="stem-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4a5d4e"/>
          <stop offset="100%" stop-color="#2d3b30"/>
        </linearGradient>
        <radialGradient id="violet-${id}" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#c9b8db"/>
          <stop offset="50%" stop-color="#937ba8"/>
          <stop offset="90%" stop-color="#5a4270"/>
          <stop offset="100%" stop-color="#3d2a4e"/>
        </radialGradient>
        <radialGradient id="center-${id}">
          <stop offset="0%" stop-color="#fae596"/>
          <stop offset="100%" stop-color="#c99738"/>
        </radialGradient>
      </defs>
      <!-- Slender organic stem -->
      <path d="M50 62 Q46 95 50 128" stroke="url(#stem-${id})" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M48 85 Q32 80 34 72 Q44 77 48 85" fill="#3d4d3e" opacity="0.8"/>
      <path d="M51 98 Q66 94 63 85 Q54 89 51 98" fill="#4a5d4e" opacity="0.75"/>
      <!-- Petals -->
      <g class="flower-head" transform-origin="50 46">
        <ellipse cx="38" cy="34" rx="13" ry="16" transform="rotate(-28 38 34)" fill="url(#violet-${id})"/>
        <ellipse cx="62" cy="34" rx="13" ry="16" transform="rotate(28 62 34)" fill="url(#violet-${id})"/>
        <ellipse cx="30" cy="50" rx="14" ry="13" transform="rotate(-60 30 50)" fill="url(#violet-${id})"/>
        <ellipse cx="70" cy="50" rx="14" ry="13" transform="rotate(60 70 50)" fill="url(#violet-${id})"/>
        <path d="M50 44 C36 50 36 66 50 70 C64 66 64 50 50 44 Z" fill="url(#violet-${id})"/>
        <!-- Soft golden center -->
        <circle cx="50" cy="47" r="3.8" fill="url(#center-${id})"/>
      </g>
    </svg>
  `,

  // 2. Levanduľa (Lavender)
  lavender: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lav-stem-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4a5d4e"/>
          <stop offset="100%" stop-color="#2d3b30"/>
        </linearGradient>
        <linearGradient id="lav-bud-${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d4c7e3"/>
          <stop offset="55%" stop-color="#8c74a5"/>
          <stop offset="100%" stop-color="#513d69"/>
        </linearGradient>
      </defs>
      <path d="M50 22 Q52 75 49 128" stroke="url(#lav-stem-${id})" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M49 88 Q34 82 30 72 Q40 82 49 88" fill="#4a5d4e" opacity="0.75"/>
      <path d="M50 100 Q66 94 70 84 Q58 93 50 100" fill="#3d4d3e" opacity="0.75"/>
      <g class="flower-head" transform-origin="50 48">
        <circle cx="50" cy="20" r="3.2" fill="url(#lav-bud-${id})"/>
        <circle cx="48" cy="26" r="4.2" fill="url(#lav-bud-${id})"/>
        <circle cx="52" cy="27" r="4" fill="url(#lav-bud-${id})"/>
        <ellipse cx="45" cy="34" rx="5.5" ry="4" transform="rotate(-15 45 34)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="55" cy="35" rx="5.5" ry="4" transform="rotate(15 55 35)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="43" cy="44" rx="6.2" ry="4.5" transform="rotate(-20 43 44)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="57" cy="45" rx="6.2" ry="4.5" transform="rotate(20 57 45)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="43" cy="55" rx="6.5" ry="4.8" transform="rotate(-22 43 55)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="57" cy="56" rx="6.5" ry="4.8" transform="rotate(22 57 56)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="44" cy="66" rx="6" ry="4.2" transform="rotate(-18 44 66)" fill="url(#lav-bud-${id})"/>
        <ellipse cx="56" cy="67" rx="6" ry="4.2" transform="rotate(18 56 67)" fill="url(#lav-bud-${id})"/>
      </g>
    </svg>
  `,

  // 3. Kráľovská orchidea (Orchid)
  orchid: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="orchid-${id}" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#dfd2ec"/>
          <stop offset="40%" stop-color="#9a7fae"/>
          <stop offset="85%" stop-color="#604676"/>
          <stop offset="100%" stop-color="#402b52"/>
        </radialGradient>
        <radialGradient id="orchid-lip-${id}" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#edd59a"/>
          <stop offset="50%" stop-color="#9d5b88"/>
          <stop offset="100%" stop-color="#4e2c4f"/>
        </radialGradient>
      </defs>
      <path d="M50 68 Q47 98 50 128" stroke="#3d4d3e" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M48 94 Q30 90 26 80 Q38 86 48 94" fill="#4a5d4e" opacity="0.8"/>
      <g class="flower-head" transform-origin="50 46">
        <ellipse cx="50" cy="26" rx="10" ry="16" fill="url(#orchid-${id})" opacity="0.95"/>
        <ellipse cx="34" cy="58" rx="11" ry="16" transform="rotate(32 34 58)" fill="url(#orchid-${id})" opacity="0.9"/>
        <ellipse cx="66" cy="58" rx="11" ry="16" transform="rotate(-32 66 58)" fill="url(#orchid-${id})" opacity="0.9"/>
        <ellipse cx="28" cy="42" rx="15" ry="13" transform="rotate(-15 28 42)" fill="url(#orchid-${id})"/>
        <ellipse cx="72" cy="42" rx="15" ry="13" transform="rotate(15 72 42)" fill="url(#orchid-${id})"/>
        <path d="M45 47 C39 61 61 61 55 47 C58 51 56 57 50 60 C44 57 42 51 45 47 Z" fill="url(#orchid-lip-${id})"/>
        <circle cx="50" cy="46" r="2.8" fill="#e8cf8d"/>
      </g>
    </svg>
  `,

  // 4. Fialová ruža (Purple Rose)
  rose: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="rose-${id}" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#dccde8"/>
          <stop offset="35%" stop-color="#a68cb8"/>
          <stop offset="75%" stop-color="#694b7c"/>
          <stop offset="100%" stop-color="#422952"/>
        </radialGradient>
      </defs>
      <path d="M50 64 Q53 95 49 128" stroke="#2d3b30" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M50 88 Q66 84 70 73 Q58 78 50 88" fill="#3d4d3e" opacity="0.85"/>
      <path d="M48 100 Q32 96 28 86 Q40 91 48 100" fill="#4a5d4e" opacity="0.8"/>
      <g class="flower-head" transform-origin="50 46">
        <circle cx="50" cy="46" r="25" fill="#422952" opacity="0.25"/>
        <path d="M26 44 C22 30 42 24 50 30 C58 24 78 30 74 44 C80 58 60 67 50 64 C40 67 20 58 26 44 Z" fill="url(#rose-${id})"/>
        <path d="M32 45 C34 35 46 34 50 37 C54 34 66 35 68 45 C66 54 56 58 50 56 C44 58 34 54 32 45 Z" fill="#694b7c"/>
        <path d="M40 45 C42 39 48 39 50 42 C52 39 58 39 60 45 C58 50 52 51 50 49 C48 51 42 50 40 45 Z" fill="#8c6f9e"/>
        <ellipse cx="50" cy="45" rx="4" ry="3" fill="#bfaacb"/>
      </g>
    </svg>
  `,

  // 5. Zvonček (Bellflower)
  bellflower: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bell-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4d3561"/>
          <stop offset="50%" stop-color="#7b6294"/>
          <stop offset="100%" stop-color="#cfbfdc"/>
        </linearGradient>
      </defs>
      <path d="M50 55 Q42 85 50 128" stroke="#4a5d4e" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M48 86 Q32 83 28 74 Q40 80 48 86" fill="#3d4d3e" opacity="0.8"/>
      <g class="flower-head" transform-origin="50 42">
        <path d="M50 22 C43 22 34 30 28 44 C36 47 43 42 50 52 C57 42 64 47 72 44 C66 30 57 22 50 22 Z" fill="url(#bell-${id})"/>
        <path d="M28 44 C34 50 41 48 46 51 C41 44 34 45 28 44 Z" fill="#604676"/>
        <path d="M72 44 C66 50 59 48 54 51 C59 44 66 45 72 44 Z" fill="#604676"/>
        <path d="M46 51 C48 55 52 55 54 51 C52 48 48 48 46 51 Z" fill="#9e85b4"/>
        <path d="M50 35 L50 58" stroke="#d6bd7f" stroke-width="1.2" stroke-linecap="round"/>
        <circle cx="50" cy="58" r="2" fill="#d6bd7f"/>
      </g>
    </svg>
  `,

  // 6. Šafran (Crocus)
  crocus: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="crocus-${id}" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#3d2a4e"/>
          <stop offset="60%" stop-color="#6e5384"/>
          <stop offset="100%" stop-color="#bda9ce"/>
        </linearGradient>
      </defs>
      <path d="M50 64 Q52 95 50 128" stroke="#3d4d3e" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M49 85 Q35 76 32 58 Q40 73 49 85" fill="#4a5d4e" opacity="0.8"/>
      <path d="M51 92 Q65 82 68 64 Q60 80 51 92" fill="#4a5d4e" opacity="0.8"/>
      <g class="flower-head" transform-origin="50 44">
        <ellipse cx="40" cy="42" rx="11" ry="20" transform="rotate(-15 40 42)" fill="url(#crocus-${id})"/>
        <ellipse cx="60" cy="42" rx="11" ry="20" transform="rotate(15 60 42)" fill="url(#crocus-${id})"/>
        <ellipse cx="50" cy="40" rx="12" ry="22" fill="url(#crocus-${id})"/>
        <path d="M48 37 L46 26 M50 37 L50 23 M52 37 L54 26" stroke="#c99738" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="46" cy="25" r="1.6" fill="#c99738"/>
        <circle cx="50" cy="22" r="1.8" fill="#c99738"/>
        <circle cx="54" cy="25" r="1.6" fill="#c99738"/>
      </g>
    </svg>
  `,

  // 7. Lotos (Lotus)
  lotus: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="lotus-${id}" cx="50%" cy="60%" r="65%">
          <stop offset="0%" stop-color="#eed598"/>
          <stop offset="30%" stop-color="#b07d9c"/>
          <stop offset="75%" stop-color="#6b4c79"/>
          <stop offset="100%" stop-color="#3c264a"/>
        </radialGradient>
      </defs>
      <path d="M50 68 Q47 98 50 128" stroke="#2d3b30" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <g class="flower-head" transform-origin="50 48">
        <path d="M50 54 C24 60 20 45 26 38 C35 46 44 49 50 54 Z" fill="url(#lotus-${id})" opacity="0.85"/>
        <path d="M50 54 C76 60 80 45 74 38 C65 46 56 49 50 54 Z" fill="url(#lotus-${id})" opacity="0.85"/>
        <path d="M50 54 C32 54 30 35 38 27 C44 37 47 46 50 54 Z" fill="url(#lotus-${id})"/>
        <path d="M50 54 C68 54 70 35 62 27 C56 37 53 46 50 54 Z" fill="url(#lotus-${id})"/>
        <path d="M50 54 C43 43 43 28 50 19 C57 28 57 43 50 54 Z" fill="url(#lotus-${id})"/>
        <circle cx="50" cy="46" r="3.6" fill="#d9bd77"/>
      </g>
    </svg>
  `,

  // 8. Fialová pivónia (Peony)
  peony: (id) => `
    <svg viewBox="0 0 100 130" class="flower-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="peony-${id}" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#d9c8e5"/>
          <stop offset="40%" stop-color="#9a7ba8"/>
          <stop offset="80%" stop-color="#604470"/>
          <stop offset="100%" stop-color="#3a2547"/>
        </radialGradient>
      </defs>
      <path d="M50 66 Q52 96 50 128" stroke="#3d4d3e" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M51 88 Q69 82 72 70 Q60 75 51 88" fill="#4a5d4e" opacity="0.8"/>
      <path d="M49 100 Q30 96 25 84 Q38 90 49 100" fill="#3d4d3e" opacity="0.8"/>
      <g class="flower-head" transform-origin="50 46">
        <circle cx="50" cy="46" r="23" fill="#3a2547" opacity="0.25"/>
        <ellipse cx="38" cy="39" rx="12" ry="11" fill="url(#peony-${id})"/>
        <ellipse cx="62" cy="39" rx="12" ry="11" fill="url(#peony-${id})"/>
        <ellipse cx="36" cy="51" rx="12" ry="11" fill="url(#peony-${id})"/>
        <ellipse cx="64" cy="51" rx="12" ry="11" fill="url(#peony-${id})"/>
        <ellipse cx="50" cy="55" rx="14" ry="11" fill="url(#peony-${id})"/>
        <ellipse cx="45" cy="44" rx="8" ry="8" fill="#a48bb4"/>
        <ellipse cx="55" cy="44" rx="8" ry="8" fill="#a48bb4"/>
        <circle cx="50" cy="45" r="3.2" fill="#d9bd77"/>
      </g>
    </svg>
  `
};

window.FlowerSVGs = FlowerSVGs;
