function showToast(message, color = 'var(--neon-emerald)') {
  const toast = document.getElementById('toast');
  toast.innerHTML = message; 
  toast.style.borderColor = color;
  toast.style.boxShadow = `0 10px 30px rgba(0,0,0,0.9), 0 0 20px ${color}60`;
  toast.classList.add('show'); 
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function createAstroIcon(emoji, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#020617" rx="20" stroke="rgba(255,255,255,0.1)"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="6 4" opacity="0.4"/>
      <text x="50" y="62" font-family="sans-serif" font-size="40" fill="${color}" text-anchor="middle">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// --- STRIPS DATA & SYNC ARRAY GENERATOR ---
function populateStrips() {
  const year = new Date().getFullYear();
  const now = new Date(); now.setHours(0,0,0,0);

  const makeArray = (arr) => {
      let fullList = [];
      [year, year + 1].forEach(y => { arr.forEach(item => { fullList.push({ ...item, dateObj: new Date(`${y}-${item.md}`) }); }); });
      fullList.sort((a,b) => a.dateObj - b.dateObj);
      return fullList.filter(x => x.dateObj >= now).slice(0, 7);
  };

  const hBase = [
      { md: "01-26", n: "REPUBLIC DAY", i: "🇮🇳", bg: "rgba(255,153,51,0.2)" },
      { md: "03-04", n: "HOLI FESTIVAL", i: "🎨", bg: "rgba(236,72,153,0.2)" },
      { md: "03-31", n: "EID AL-FITR", i: "🌙", bg: "rgba(16,185,129,0.2)" },
      { md: "04-14", n: "AMBEDKAR JAY", i: "📘", bg: "rgba(14,165,233,0.2)" },
      { md: "06-26", n: "MUHARRAM", i: "🕌", bg: "rgba(239,68,68,0.2)" },
      { md: "08-15", n: "INDEPENDENCE", i: "🇮🇳", bg: "rgba(255,153,51,0.2)" },
      { md: "08-26", n: "ID-E-MILAD", i: "🌙", bg: "rgba(14,165,233,0.2)" },
      { md: "10-02", n: "GANDHI JAYANTI", i: "🕊️", bg: "rgba(255,255,255,0.08)" },
      { md: "11-08", n: "DIWALI LUX", i: "🪔", bg: "rgba(245,158,11,0.2)" },
      { md: "12-25", n: "CHRISTMAS", i: "🎄", bg: "rgba(220,38,38,0.2)" }
  ];

  const fBase = [
      { md: "01-14", n: "KITE FESTIVAL", i: "🪁", bg: "rgba(234,179,8,0.2)" },
      { md: "02-14", n: "VASANT PANCH", i: "🌼", bg: "rgba(250,204,21,0.2)" },
      { md: "02-15", n: "MAHA SHIVRATRI", i: "🔱", bg: "rgba(147,197,253,0.2)" },
      { md: "03-27", n: "RAM NAVAMI", i: "🏹", bg: "rgba(249,115,22,0.2)" },
      { md: "07-15", n: "ASHADHI BIJ", i: "🕉️", bg: "rgba(245,158,11,0.2)" },
      { md: "08-09", n: "NAG PANCHAMI", i: "🐍", bg: "rgba(132,204,22,0.2)" },
      { md: "08-28", n: "RAKSHA BANDHAN", i: "🎗️", bg: "rgba(236,72,153,0.2)" },
      { md: "09-04", n: "JANMASHTAMI", i: "🏺", bg: "rgba(234,179,8,0.2)" },
      { md: "09-14", n: "GANESH CHATUR", i: "🐘", bg: "rgba(239,68,68,0.2)" },
      { md: "10-18", n: "DUSSEHRA HUD", i: "🏹", bg: "rgba(185,28,28,0.2)" },
      { md: "11-06", n: "DHANTERAS MET", i: "🪙", bg: "rgba(234,179,8,0.2)" }
  ];

  const renderItem = (item) => {
      const dateStr = `${item.dateObj.toLocaleDateString('en-IN', {weekday:'short'}).toUpperCase()} ${String(item.dateObj.getDate()).padStart(2,'0')}-${String(item.dateObj.getMonth()+1).padStart(2,'0')}`;
      const diff = item.dateObj.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 3600 * 24));
      
      let countText = days === 0 ? "TODAY" : `${days}d`;
      let countColor = days === 0 ? "var(--neon-ruby)" : (days <= 5 ? "var(--neon-gold)" : "var(--neon-blue)");

      return `<div class="s-item" style="background: linear-gradient(135deg, ${item.bg}, rgba(0,0,0,0.4)); border-color: ${item.bg.replace('0.2', '0.4')}; color: #fff;">
                 <span>${item.i} ${item.n}</span>
                 <span class="s-date">${dateStr} <b style="color:${countColor}; margin-left: 2px;">(${countText})</b></span>
              </div>`;
  };

  document.getElementById('strip-holidays').querySelector('.strip-items').innerHTML = makeArray(hBase).map(renderItem).join('');
  document.getElementById('strip-hindu').querySelector('.strip-items').innerHTML = makeArray(fBase).map(renderItem).join('');
}
document.addEventListener('DOMContentLoaded', populateStrips);

// --- DUAL DIWALI TIMER CALCULATOR ---
function updateDiwaliDualTimer() {
  const now = new Date().getTime();
  const prevDiwaliDate = new Date("2025-10-20T00:00:00").getTime();
  const prevDiff = now - prevDiwaliDate;
  if(prevDiff > 0) {
      const daysPassed = Math.floor(prevDiff / (1000 * 60 * 60 * 24));
      document.getElementById('prev-diwali-timer').innerText = `${daysPassed} DAYS AGO`;
  }

  const nextDiwaliDate = new Date("2026-11-08T00:00:00").getTime();
  const nextDiff = nextDiwaliDate - now;

  if (nextDiff < 0) {
      document.getElementById('next-diwali-timer').innerText = "HAPPY DIWALI!";
  } else {
      const days = Math.floor(nextDiff / (1000 * 60 * 60 * 24));
      const hours = String(Math.floor((nextDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((nextDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((nextDiff % (1000 * 60)) / 1000)).padStart(2, '0');
      document.getElementById('next-diwali-timer').innerText = `${days}D ${hours}:${minutes}:${seconds}`;
  }
}
setInterval(updateDiwaliDualTimer, 1000); updateDiwaliDualTimer();

// --- FOREX EXCHANGE SYNC ENGINE ---
async function fetchForex() {
try {
  const res = await fetch('https://open.er-api.com/v6/latest/USD');
  const data = await res.json();
  const rates = data.rates;
  const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];
  const flagMap = { USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca', CHF: 'ch' };

  let html = '';
  majorCurrencies.forEach(code => {
      if(rates[code] && rates.INR) {
          let flagUrl = `https://flagcdn.com/24x18/${flagMap[code]}.png`;
          let oneForeignInInr = (rates.INR / rates[code]);
          let isStronger = oneForeignInInr > 60; 
          let strengthClass = isStronger ? 'curr-strong' : 'curr-weak';
          let arrow = isStronger ? '🔼' : '🔽';
          
          html += `
            <div class="s-item ${strengthClass}">
               <img src="${flagUrl}" class="ticker-flag"> 
               <span class="base-cur">1 ${code}</span> = <span class="val">₹${oneForeignInInr.toFixed(2)}</span> <span class="arrow">${arrow}</span>
            </div>`;
      }
  });
  document.getElementById('forex-track').innerHTML = html; 
} catch(e) {}
}
fetchForex();

// --- HIGH-TECH LOCAL & GLOBAL TIME HUDS ---
function formatTime12(date, zone) {
  let parts = new Intl.DateTimeFormat('en-IN', { timeZone: zone, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true }).formatToParts(date);
  let wk = parts.find(p => p.type === 'weekday').value;
  let h = parts.find(p => p.type === 'hour').value;
  let m = parts.find(p => p.type === 'minute').value;
  let ampm = parts.find(p => p.type === 'dayPeriod').value;
  return `${wk.toUpperCase()} ${h}:${m} ${ampm.toUpperCase()}`;
}

function updateClocks() {
const now = new Date();
let localParts = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(now);
let h = localParts.find(p=>p.type==='hour').value; 
let m = localParts.find(p=>p.type==='minute').value; 
let s = localParts.find(p=>p.type==='second').value; 
let ampm = localParts.find(p=>p.type==='dayPeriod').value;

document.getElementById('clock-hours-mins').innerText = `${h}:${m}`;
document.getElementById('clock-seconds').innerText = s;
document.getElementById('clock-period').innerText = ampm.toUpperCase();

document.getElementById('live-date').innerText = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(now);

const hour = now.getHours();
let todInfo = { text: "NIGHT", class: "tod-night" };
if (hour >= 5 && hour < 12) todInfo = { text: "MORNING", class: "tod-morning" };
else if (hour >= 12 && hour < 17) todInfo = { text: "AFTERNOON", class: "tod-afternoon" };
else if (hour >= 17 && hour < 21) todInfo = { text: "EVENING", class: "tod-evening" };

const localBadge = document.getElementById('local-tod');
localBadge.className = `tod-badge ${todInfo.class}`; localBadge.innerText = todInfo.text;

const zones = { 'ny': 'America/New_York', 'lon': 'Europe/London', 'dxb': 'Asia/Dubai', 'tyo': 'Asia/Tokyo', 'sgp': 'Asia/Singapore', 'syd': 'Australia/Sydney', 'sf': 'America/Los_Angeles'};
for (let [id, zone] of Object.entries(zones)) {
    const elTime = document.getElementById(`time-${id}`);
    const elFill = document.getElementById(`fill-${id}`);
    const elNeedle = document.getElementById(`needle-${id}`);
    if (elTime && elFill && elNeedle) {
      elTime.innerText = formatTime12(now, zone);
      let zoneTimeStr = new Date(now.toLocaleString("en-US", {timeZone: zone}));
      let percentage = (((zoneTimeStr.getHours() * 60) + zoneTimeStr.getMinutes()) / 1440) * 100;
      elFill.style.width = `${percentage}%`;
      elNeedle.style.left = `${percentage}%`;
    }
}
}
setInterval(updateClocks, 1000); updateClocks();

function renderRing() {
const now = new Date();
const offset = 100.5 - ((now.getSeconds() + (now.getMilliseconds() / 1000)) / 60) * 100.5;
const ring = document.getElementById('sec-ring');
if(ring) ring.style.strokeDashoffset = offset;
requestAnimationFrame(renderRing);
}
requestAnimationFrame(renderRing);

let globalSunrise = null; let globalSunset = null;

function updateWeatherMetricsBackdrops(humidity, feelsLike, windSpeed, cloudCover) {
const humCard = document.getElementById('humidity-card');
if (humCard) humCard.style.background = humidity > 70 ? 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(0,0,0,0.75))' : 'rgba(0,0,0,0.65)';
const feelsCard = document.getElementById('feels-card');
if (feelsCard) feelsCard.style.background = feelsLike > 35 ? 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(0,0,0,0.75))' : 'rgba(0,0,0,0.65)';
}

// --- HIGH RESOLUTION ADVANCED MOON RENDERING SYSTEM ---
function getMoonPhaseSVG(phaseRatio) {
  let rx = Math.abs(Math.cos(phaseRatio * 2 * Math.PI)) * 50;
  let path = "";
  if (phaseRatio <= 0.25) { path = `M 50 0 A 50 50 0 0 0 50 100 A ${rx} 50 0 0 0 50 0`; } 
  else if (phaseRatio <= 0.5) { path = `M 50 0 A 50 50 0 0 0 50 100 A ${rx} 50 0 0 1 50 0`; } 
  else if (phaseRatio <= 0.75) { path = `M 50 0 A 50 50 0 0 1 50 100 A ${rx} 50 0 0 0 50 0`; } 
  else { path = `M 50 0 A 50 50 0 0 1 50 100 A ${rx} 50 0 0 1 50 0`; }
  
  return `<svg viewBox="0 0 100 100" style="width:100%; height:100%; border-radius:50%; filter: drop-shadow(0 0 8px rgba(254,240,138,0.3));">
      <defs>
        <radialGradient id="lunarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fffef2" stop-opacity="1"/>
          <stop offset="70%" stop-color="#fef08a" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#ca8a04" stop-opacity="0.3"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#lunarGlow)"/>
      <path d="${path}" fill="#030712" opacity="0.95" />
  </svg>`;
}

// --- SCIENTIFIC VEDIC PANCHANG CALCULATION ENGINE ---
function updatePanchangCore() {
const now = new Date();
const JD = now.getTime() / 86400000 + 2440587.5; const d = JD - 2451545.0; const rad = Math.PI / 180;

const q = (280.459 + 0.98564736 * d) % 360; const g = (357.529 + 0.98560028 * d) % 360;
let sunLong = (q + 1.915 * Math.sin(g * rad) + 0.020 * Math.sin(2 * g * rad)) % 360; if (sunLong < 0) sunLong += 360;

const L_moon = (218.316 + 13.176396 * d) % 360; const M_moon = (134.963 + 13.064993 * d) % 360; const D_moon = (297.850 + 12.190749 * d) % 360;
let moonLong = (L_moon + 6.289 * Math.sin(M_moon * rad) - 1.274 * Math.sin((M_moon - 2*D_moon) * rad) + 0.658 * Math.sin(2*D_moon * rad)) % 360; if (moonLong < 0) moonLong += 360;

const ayanamsa = 24.1 + ((now.getFullYear() + (now.getMonth() / 12)) - 2000) * 0.01396;
let vedicSun = sunLong - ayanamsa; if (vedicSun < 0) vedicSun += 360;
let vedicMoon = moonLong - ayanamsa; if (vedicMoon < 0) vedicMoon += 360;

let tithiLong = vedicMoon - vedicSun; if (tithiLong < 0) tithiLong += 360;
const tithiIndex = Math.floor(tithiLong / 12); const nakshatraIndex = Math.floor(vedicMoon / (360/27)); const rashiIndex = Math.floor(vedicMoon / 30); 

const rashis = ["MESHA", "VRISHABHA", "MITHUNA", "KARKA", "SIMHA", "KANYA", "TULA", "VRISHCHIKA", "DHANU", "MAKARA", "KUMBHA", "MEENA"];
const rashiSymbols = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

const nakshatras = ["ASHVINI", "BHARANI", "KRITTIKA", "ROHINI", "MRIGASHIRSHA", "ARDRA", "PUNARVASU", "PUSHYA", "ASHLESHA", "MAGHA", "PURVA PHALGUNI", "UTTARA PHALGUNI", "HASTA", "CHITRA", "SVATI", "VISHAKHA", "ANURADHA", "JYESHTHA", "MULA", "PURVA ASHADHA", "UTTARA ASHADHA", "SHRAVANA", "DHANISHTHA", "SHATABHISHA", "PURVA BHADRAPADA", "UTTARA BHADRAPADA", "REVATI"];
const tithisGu = ["સુદ એકમ", "સુદ બીજ", "સુદ ત્રીજ", "સુદ ચોથ", "સુદ પાંચમ", "સુદ છઠ", "સુદ સાતમ", "સુદ આઠમ", "સુદ નોમ", "સુદ દશમ", "સુદ એકાદશી", "સુદ બારસ", "સુદ તેરસ", "સુદ ચૌદશ", "પૂનમ", "વદ એકમ", "વદ બીજ", "વદ ત્રીજ", "વદ ચોથ", "વદ પાંચમ", "વદ છઠ", "વદ સાતમ", "વદ આઠમ", "વદ નોમ", "વદ દશમ", "વદ એકાદશી", "વદ બારસ", "વદ તેરસ", "વદ ચૌદશ", "અમાસ"];
const gujMonths = ["વૈશાખ", "જેઠ", "અષાઢ", "શ્રાવણ", "ભાદરવો", "આસો", "કારતક", "માગશર", "પોષ", "મહા", "ફાગણ", "ચૈત્ર"];

let nextEkaDays = tithiIndex <= 10 ? 10 - tithiIndex : (tithiIndex <= 25 ? 25 - tithiIndex : (30 - tithiIndex) + 10);
let isShukla = tithiIndex < 15;

// INJECT STRUCTURED SPACE BETWEEN MONTH NAME AND DATE STRINGS
document.getElementById('panchang-month').innerText = `${gujMonths[Math.floor(vedicSun / 30)]} માસ  •  ${isShukla ? 'શુક્લ' : 'કૃષ્ણ'} પક્ષ`;
document.getElementById('panchang-tithi').innerText = `${gujMonths[Math.floor(vedicSun / 30)]} ${tithisGu[tithiIndex]}`;

document.getElementById('rashi-img').src = createAstroIcon(rashiSymbols[rashiIndex], '#06b6d4');
document.getElementById('panchang-rashi').innerText = rashis[rashiIndex];

document.getElementById('nak-img').src = createAstroIcon('✨', '#a855f7');
document.getElementById('panchang-nak').innerText = nakshatras[nakshatraIndex];

document.getElementById('eka-img').src = createAstroIcon('🕉️', '#f59e0b');
document.getElementById('panchang-eka-val').innerText = nextEkaDays === 0 ? "TODAY ACTIVE" : `IN ${nextEkaDays} DAYS`;

let phaseRatio = tithiLong / 360; 
let illumination = (1 - Math.cos(tithiLong * Math.PI / 180)) / 2 * 100;
let phaseName = ""; 

if (phaseRatio < 0.05 || phaseRatio > 0.95) phaseName = "NEW MOON";
else if (phaseRatio < 0.22) phaseName = "WAXING CRESCENT";
else if (phaseRatio < 0.28) phaseName = "FIRST QUARTER";
else if (phaseRatio < 0.47) phaseName = "WAXING GIBBOUS";
else if (phaseRatio < 0.53) phaseName = "FULL MOON";
else if (phaseRatio < 0.72) phaseName = "WANING GIBBOUS";
else if (phaseRatio < 0.78) phaseName = "LAST QUARTER";
else phaseName = "WANING CRESCENT";

document.getElementById('moon-phase-name').innerText = `${phaseName} (${illumination.toFixed(1)}%)`;
document.getElementById('moon-badge-img').src = createAstroIcon('🌕', '#10b981');
document.getElementById('dynamic-moon').innerHTML = getMoonPhaseSVG(phaseRatio);
}
updatePanchangCore(); setInterval(updatePanchangCore, 60000); 

function updateSkyArch() {
if (!globalSunrise || !globalSunset) return;
const now = new Date(); const body = document.getElementById('astro-body'); let percent = 0;

if (now >= globalSunrise && now <= globalSunset) {
    percent = (now - globalSunrise) / (globalSunset - globalSunrise);
    body.style.background = '#f59e0b'; body.style.boxShadow = '0 0 12px #f59e0b';
} else {
    let prevSet = new Date(globalSunset); if(now < prevSet) prevSet.setDate(prevSet.getDate()-1);
    let nextRise = new Date(globalSunrise); if(now > nextRise) nextRise.setDate(nextRise.getDate()+1);
    percent = (now - prevSet) / (nextRise - prevSet);
    body.style.background = '#a855f7'; body.style.boxShadow = '0 0 12px #a855f7';
}
percent = Math.max(0, Math.min(1, percent));
body.style.left = `${percent * 100}%`; body.style.top = `${100 - (Math.sin(percent * Math.PI) * 100)}%`;
}

function updateAstrologyTracking() {
if (!globalSunrise || !globalSunset) return; 
updateSkyArch(); const now = new Date();

const daySeq = [[{n:"UDVEG",c:"var(--neon-ruby)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"UDVEG",c:"var(--neon-ruby)"}],[{n:"AMRUT",c:"var(--neon-gold)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"}],[{n:"ROG",c:"var(--neon-ruby)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"ROG",c:"var(--neon-ruby)"}],[{n:"LABH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"LABH",c:"var(--neon-emerald)"}],[{n:"SHUBH",c:"var(--neon-emerald)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"}],[{n:"CHAL",c:"var(--neon-blue)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"CHAL",c:"var(--neon-blue)"}],[{n:"KAAL",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"KAAL",c:"var(--neon-ruby)"}]];
const nightSeq = [[{n:"SHUBH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"}],[{n:"CHAL",c:"var(--neon-blue)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"CHAL",c:"var(--neon-blue)"}],[{n:"KAAL",c:"var(--neon-ruby)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"KAAL",c:"var(--neon-ruby)"}],[{n:"UDVEG",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"UDVEG",c:"var(--neon-ruby)"}],[{n:"AMRUT",c:"var(--neon-gold)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"}],[{n:"ROG",c:"var(--neon-ruby)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"LABH",c:"var(--neon-emerald)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"ROG",c:"var(--neon-ruby)"}],[{n:"LABH",c:"var(--neon-emerald)"},{n:"UDVEG",c:"var(--neon-ruby)"},{n:"SHUBH",c:"var(--neon-emerald)"},{n:"AMRUT",c:"var(--neon-gold)"},{n:"CHAL",c:"var(--neon-blue)"},{n:"ROG",c:"var(--neon-ruby)"},{n:"KAAL",c:"var(--neon-ruby)"},{n:"LABH",c:"var(--neon-emerald)"}]];

let isDay = (now >= globalSunrise && now < globalSunset); let dayOfWeek = now.getDay();
let totalMins, passedMins, activeSeq;

if (isDay) {
    totalMins = (globalSunset - globalSunrise) / 60000; passedMins = (now - globalSunrise) / 60000; activeSeq = daySeq[dayOfWeek];
} else {
    let nextSunrise = new Date(globalSunrise); if (now >= globalSunset) nextSunrise.setDate(nextSunrise.getDate() + 1);
    let prevSunset = new Date(globalSunset); if (now < globalSunrise) prevSunset.setDate(prevSunset.getDate() - 1);
    totalMins = (nextSunrise - prevSunset) / 60000; passedMins = (now - prevSunset) / 60000;
    activeSeq = nightSeq[now >= globalSunset ? dayOfWeek : (dayOfWeek - 1 + 7) % 7];
}

let currentIndex = Math.min(7, Math.floor(passedMins / (totalMins / 8)));
document.getElementById('ch-prev').innerText = activeSeq[Math.max(0, currentIndex - 1)].n; document.getElementById('ch-prev').style.color = activeSeq[Math.max(0, currentIndex - 1)].c;
document.getElementById('ch-live').innerText = activeSeq[currentIndex].n; document.getElementById('ch-live').style.color = activeSeq[currentIndex].c;
document.getElementById('ch-next').innerText = activeSeq[Math.min(7, currentIndex + 1)].n; document.getElementById('ch-next').style.color = activeSeq[Math.min(7, currentIndex + 1)].c;

const rahuSegments = [8, 2, 7, 5, 6, 4, 3]; const yamaSegments = [5, 4, 3, 2, 1, 7, 6];
let segmentMins = ((globalSunset - globalSunrise) / 60000) / 8;

let rBar = document.getElementById('rahu-bar'); let yBar = document.getElementById('yama-bar');
rBar.style.width = '12.5%'; rBar.style.left = `${((rahuSegments[dayOfWeek] - 1) * segmentMins / (segmentMins * 8)) * 100}%`;
yBar.style.width = '12.5%'; yBar.style.left = `${((yamaSegments[dayOfWeek] - 1) * segmentMins / (segmentMins * 8)) * 100}%`;

if (isDay && passedMins >= (rahuSegments[dayOfWeek] - 1)*segmentMins && passedMins < (rahuSegments[dayOfWeek])*segmentMins) rBar.classList.add('pulse-alert'); else rBar.classList.remove('pulse-alert');
if (isDay && passedMins >= (yamaSegments[dayOfWeek] - 1)*segmentMins && passedMins < (yamaSegments[dayOfWeek])*segmentMins) yBar.classList.add('pulse-alert'); else yBar.classList.remove('pulse-alert');
}
setInterval(updateAstrologyTracking, 60000);

// --- WEATHER ALL DISPATCH FORECAST ---
const weatherEmojis = { 0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️', 61: '🌧️', 63: '🌧️', 65: '🌧️', 82: '⛈️', 95: '⛈️' };
const getColorHigh = (t) => t >= 35 ? '#ef4444' : '#f59e0b';
const getColorLow = (t) => t <= 23 ? '#38bdf8' : '#cbd5e1';

async function fetchWeatherAll() {
try {
  const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=21.1702&longitude=72.8311&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=Asia%2FKolkata&forecast_days=7');
  const data = await res.json();

  document.getElementById('weather-temp').innerText = `${Math.round(data.current.temperature_2m)}°C`;
  document.getElementById('weather-icon').innerText = weatherEmojis[data.current.weather_code] || '☀️';
  document.getElementById('weather-desc').innerText = data.current.weather_code <= 3 ? "Clear Operational" : "Overcast Matrix";

  document.getElementById('wl-hum').innerText = `${data.current.relative_humidity_2m}%`;
  document.getElementById('wl-feel').innerText = `${Math.round(data.current.apparent_temperature)}°C`;
  document.getElementById('wl-wind').innerText = `${data.current.wind_speed_10m} km/h`;
  document.getElementById('wl-cloud').innerText = `${data.current.cloud_cover}%`;

  updateWeatherMetricsBackdrops(data.current.relative_humidity_2m, data.current.apparent_temperature);

  globalSunrise = new Date(data.daily.sunrise[0]); globalSunset = new Date(data.daily.sunset[0]);
  document.getElementById('api-sunrise').innerText = globalSunrise.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });
  document.getElementById('api-sunset').innerText = globalSunset.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });

  updateAstrologyTracking();

  const container = document.getElementById('forecast-table');
  container.innerHTML = `<div class="ft-header"><span>DAYS GRID</span><span>STATUS</span><span>TEMPERATURE</span><span>WINDS</span><span>PRECIP</span><span>UV INDEX</span></div>`;

  for (let i = 0; i < 7; i++) {
    const dateObj = new Date(data.daily.time[i]);
    const dayName = i === 0 ? `TODAY ${String(dateObj.getDate()).padStart(2,'0')}` : `${dateObj.toLocaleDateString('en-IN', { weekday:'short' }).toUpperCase()} ${String(dateObj.getDate()).padStart(2,'0')}`;
    const max = Math.round(data.daily.temperature_2m_max[i]); const min = Math.round(data.daily.temperature_2m_min[i]);
    const uv = Math.round(data.daily.uv_index_max[i]); const rain = data.daily.precipitation_probability_max[i] || 0;

    container.innerHTML += `
      <div class="ft-row">
        <span class="ft-day">${dayName}</span><span class="ft-icon">${weatherEmojis[data.daily.weather_code[i]] || '⛅'}</span>
        <div class="ft-temp"><span style="color:${getColorHigh(max)}; font-weight:900;">${max}°</span><span style="color:${getColorLow(min)};">${min}°</span></div>
        <span>${Math.round(data.current.wind_speed_10m)} km/h</span><span style="color:${rain>20?'#38bdf8':'rgba(255,255,255,0.3)'};">${rain}%</span>
        <span style="color:${uv<=5?'#10b981':'#ef4444'}; font-weight:900;">${uv}</span>
      </div>`;
  }
} catch (e) {}
}
fetchWeatherAll();

// --- RSS STREAM SEGMENTATION FEEDERS ---
async function fetchSplitNews() {
try {
  const fetchFeed = async (url, id) => {
     const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
     const data = await res.json();
     const container = document.getElementById(id); container.innerHTML = '';
     if(data.items) {
       data.items.sort((a,b)=>new Date(b.pubDate)-new Date(a.pubDate)).slice(0, 8).forEach(news => {
          const d = new Date(news.pubDate);
          const timeStr = `${d.toLocaleString('en-IN',{weekday:'short'}).toUpperCase()}, ${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')} ${d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true}).toUpperCase()}`;
          container.innerHTML += `<a href="${news.link}" target="_blank" class="news-item"><div class="news-title">${news.title.split(' - ')[0]}</div><div class="news-meta">${timeStr}</div></a>`;
       });
     }
  };
  fetchFeed('https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en', 'india-feed');
  fetchFeed('https://www.espncricinfo.com/rss/content/story/feeds/0.xml', 'cricket-feed');
  fetchFeed('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-IN&gl=IN&ceid=IN:en', 'world-feed');
  fetchFeed('https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN:en', 'sports-feed');
} catch(e) {}
}
fetchSplitNews(); setInterval(fetchSplitNews, 300000);


// ============================================================================
// 📦 AUTONOMOUS FILE SYSTEM ACCESS & IMAGE CROPPER LOGIC (Restored Engine)
// ============================================================================

let images = []; 
let currentIndex = 0; 
let renameMap = []; 
let directoryHandle = null; 
let cropper = null; 
let baseCanvas = document.createElement('canvas');

async function selectFolder() {
  try {
    directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    images = []; 
    renameMap = []; 
    currentIndex = 0;
    
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'file') {
        const ext = entry.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) { 
          images.push(await entry.getFile()); 
        }
      }
    }
    
    if (images.length === 0) {
      return alert("⚠️ No images found in the selected folder.");
    }
    
    document.getElementById('totalImages').innerText = images.length;
    document.getElementById('setupScreen').style.display = 'none'; 
    document.getElementById('workspace').style.display = 'flex';   
    loadNextImage(); 
    showToast("📁 Focus Mode Initiated", "var(--neon-emerald)");
    
  } catch (error) { 
    if (error.name !== 'AbortError') alert("❌ Could not access folder."); 
  }
}

    function initCropper() {
      const imgElement = document.getElementById('slipImage');
      if (cropper) { cropper.destroy(); } 
      
      cropper = new Cropper(imgElement, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        center: true,
        guides: false,
        highlight: false,
        background: false,
        toggleDragModeOnDblclick: false,
        ready: function () {
          const containerData = cropper.getContainerData();
          const cropBoxData = cropper.getCropBoxData();
          // Move crop box 20% to the right
          cropBoxData.left = containerData.width * 0.35;
          cropper.setCropBoxData(cropBoxData);
        }
      });
    }

function manualRotate() {
  if(!cropper) return;
  let newCanvas = document.createElement('canvas');
  newCanvas.width = baseCanvas.height; 
  newCanvas.height = baseCanvas.width;
  let ctx = newCanvas.getContext('2d');
  
  ctx.translate(newCanvas.width / 2, newCanvas.height / 2); 
  ctx.rotate(90 * Math.PI / 180);
  ctx.drawImage(baseCanvas, -baseCanvas.width / 2, -baseCanvas.height / 2);
  
  baseCanvas = newCanvas; 
  cropper.destroy();
  
  const imgElement = document.getElementById('slipImage');
  imgElement.src = baseCanvas.toDataURL('image/jpeg', 1);
  imgElement.onload = function() { initCropper(); };
  
  showToast("🔄 Rotated & Auto-Fitted", "var(--neon-blue)");
}

function resetZoom() { 
  if(cropper) { 
    cropper.reset(); 
    showToast("🔍 View Reset", "var(--neon-blue)"); 
  } 
}

function loadNextImage() {
  if (currentIndex >= images.length) {
    return finishAndExport();
  }
  
  const imgUrl = URL.createObjectURL(images[currentIndex]);
  let currentImgObj = new Image();
  
  currentImgObj.onload = function() {
    let isPortrait = currentImgObj.naturalHeight > currentImgObj.naturalWidth;
    const ctx = baseCanvas.getContext('2d');
    
    if (isPortrait) {
      baseCanvas.width = currentImgObj.naturalHeight; 
      baseCanvas.height = currentImgObj.naturalWidth;
      ctx.translate(baseCanvas.width / 2, baseCanvas.height / 2);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.drawImage(currentImgObj, -currentImgObj.naturalWidth / 2, -currentImgObj.naturalHeight / 2);
    } else {
      baseCanvas.width = currentImgObj.naturalWidth; 
      baseCanvas.height = currentImgObj.naturalHeight;
      ctx.drawImage(currentImgObj, 0, 0);
    }
    
    const imgElement = document.getElementById('slipImage');
    imgElement.src = baseCanvas.toDataURL('image/jpeg', 1);
    imgElement.onload = function() { initCropper(); };
  };
  
  currentImgObj.src = imgUrl;

  document.getElementById('currentIndex').innerText = currentIndex + 1;
  document.getElementById('progressBar').style.width = `${((currentIndex) / images.length) * 100}%`;
  
  const input = document.getElementById('renameInput'); 
  input.value = ''; 
  input.focus();
}

function undoLastAction() {
  if (renameMap.length === 0 || currentIndex === 0) {
    return showToast("⚠️ Nothing to Undo", "var(--neon-ruby)");
  }
  renameMap.pop(); 
  currentIndex--; 
  loadNextImage(); 
  showToast("⏪ Undid Last Order", "var(--neon-gold)");
}

document.addEventListener('keydown', function(e) {
  if (document.getElementById('workspace').style.display === 'flex') {
    
    if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) { 
      e.preventDefault(); 
      undoLastAction(); 
    }
    
    if (e.key === 'Enter') {
      const input = document.getElementById('renameInput');
      if (document.activeElement !== input) input.focus();
      
      const orderNum = input.value.trim().toUpperCase();
      if (orderNum === '') return;
      
      let finalBlobPromise;
      if (e.shiftKey) {
        finalBlobPromise = new Promise(resolve => { 
          cropper.clear(); 
          cropper.getCroppedCanvas().toBlob(blob => { resolve(blob); }, 'image/jpeg', 0.9); 
          showToast("⚡ Full Image Saved", "var(--neon-gold)"); 
        });
      } else {
        finalBlobPromise = new Promise(resolve => { 
          cropper.getCroppedCanvas({}).toBlob(blob => { resolve(blob); }, 'image/jpeg', 0.9); 
          showToast("✂️ Custom Crop Saved", "var(--neon-emerald)"); 
        });
      }
      
      let newName = `${orderNum}.jpeg`; 
      let counter = 1;
      while (renameMap.some(item => item.newName === newName)) { 
        newName = `${orderNum}_${counter}.jpeg`; 
        counter++; 
      }
      
      renameMap.push({ 
        originalName: images[currentIndex].name, 
        newName: newName, 
        blobPromise: finalBlobPromise 
      });
      
      currentIndex++; 
      loadNextImage();
    }
  }
});

async function finishAndExport() {
  if (renameMap.length === 0) return showToast("⚠️ No files were processed.", "var(--neon-ruby)");
  
  document.getElementById('progressBar').style.width = `100%`;
  const btnFinish = document.getElementById('btnFinish');
  btnFinish.style.pointerEvents = "none"; 
  btnFinish.style.background = "linear-gradient(135deg, #1e293b, #334155)";

  for (let i = 0; i < renameMap.length; i++) {
    btnFinish.innerHTML = `⏳ SAVING ${i + 1} / ${renameMap.length}...`;
    const fileData = renameMap[i];
    try {
        const finalBlob = await fileData.blobPromise;
        const fileHandle = await directoryHandle.getFileHandle(fileData.newName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(finalBlob); 
        await writable.close();
        if (fileData.originalName !== fileData.newName) { 
          await directoryHandle.removeEntry(fileData.originalName); 
        }
    } catch (e) { console.error("Error writing file:", e); }
  }

  document.getElementById('workspace').innerHTML = `
    <div style="width: 100%; text-align: center; margin-top: 10px; background: rgba(0,0,0,0.5); padding: 50px 40px; border-radius: 24px; border: 1px solid var(--glass-border); box-shadow: inset 0 10px 40px rgba(0,0,0,0.8);">
      <div style="font-size: 70px; margin-bottom: 20px; filter: drop-shadow(0 5px 20px rgba(16, 185, 129, 0.6));">✅</div>
      <h1 style="color: var(--neon-emerald); font-size: 34pt; margin: 0 0 15px 0; text-shadow: 0 2px 20px rgba(16, 185, 129, 0.4);">Batch Successfully Rendered!</h1>
      <p style="font-size: 13.5pt; color: var(--text-main); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">All <b style="color: var(--neon-gold);">${renameMap.length}</b> slips have been <span style="color:var(--neon-blue);">cropped, rotated, renamed, and saved</span>.</p>
      <p style="font-size: 11pt; color: var(--text-muted); margin-bottom: 45px; font-weight: 600;">The original messy files have been successfully deleted from your local folder.</p>
      <button class="btn-pro blue-btn" style="margin: 0 auto; height: 60px; font-size: 12pt;" onclick="location.reload()">🔄 Initialize New Session</button>
    </div>
  `;
  showToast("✅ All Files Permanently Saved!", "var(--neon-emerald)");
}
