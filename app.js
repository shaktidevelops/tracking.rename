function showToast(message, color = 'var(--zari-dark)') {
  const toast = document.getElementById('toast');
  toast.innerHTML = message; 
  toast.style.borderColor = color;
  toast.classList.add('show'); 
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function createAstroIcon(emoji, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#fffdf9" rx="20" stroke="rgba(212,175,55,0.4)"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="6 4" opacity="0.4"/>
      <text x="50" y="62" font-family="sans-serif" font-size="40" fill="${color}" text-anchor="middle">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// 🌸 16 ANIMATED FLOATING BACKGROUND ELEMENTS
function initBackgroundAnimation() {
  const bg = document.getElementById('bgAnimation');
  if (!bg) return;
  const emojis = ['🪷', '🌸', '✨', '📦', '🚚', '🏷️', '🧵', '👗', '💎', '🌿', '🕉️', '🪙', '🪔', '🔔', '🌺', '🎯'];
  for (let i = 0; i < 16; i++) {
    let el = document.createElement('div');
    el.className = 'petal';
    el.innerText = emojis[i];
    el.style.left = (i * 6.2 + Math.random() * 3) + 'vw';
    el.style.animationDuration = (12 + Math.random() * 12) + 's';
    el.style.animationDelay = (i * 0.7) + 's';
    bg.appendChild(el);
  }
}

// --- FESTIVALS & HOLIDAYS WITH THEMATIC GRADIENTS ---
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
      { md: "01-26", n: "REPUBLIC DAY", i: "🇮🇳", bg: "linear-gradient(135deg, rgba(255,153,51,0.3), rgba(255,255,255,0.7), rgba(18,136,7,0.3))" },
      { md: "03-04", n: "HOLI FESTIVAL", i: "🎨", bg: "linear-gradient(135deg, rgba(244,63,94,0.3), rgba(168,85,247,0.25), rgba(251,191,36,0.3))" },
      { md: "03-31", n: "EID AL-FITR", i: "🌙", bg: "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(212,175,55,0.25))" },
      { md: "04-14", n: "AMBEDKAR JAY", i: "📘", bg: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(30,64,175,0.25))" },
      { md: "06-26", n: "MUHARRAM", i: "🕌", bg: "linear-gradient(135deg, rgba(239,68,68,0.25), rgba(15,23,42,0.2))" },
      { md: "08-15", n: "INDEPENDENCE", i: "🇮🇳", bg: "linear-gradient(135deg, rgba(255,153,51,0.35), rgba(255,255,255,0.7), rgba(18,136,7,0.35))" },
      { md: "08-26", n: "ID-E-MILAD", i: "🌙", bg: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(5,150,105,0.25))" },
      { md: "10-02", n: "GANDHI JAYANTI", i: "🕊️", bg: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(241,245,249,0.6))" },
      { md: "11-08", n: "DIWALI LUX", i: "🪔", bg: "linear-gradient(135deg, rgba(212,175,55,0.4), rgba(139,0,0,0.35))" },
      { md: "12-25", n: "CHRISTMAS", i: "🎄", bg: "linear-gradient(135deg, rgba(220,38,38,0.35), rgba(22,101,52,0.35))" }
  ];

  const fBase = [
      { md: "01-14", n: "KITE FESTIVAL", i: "🪁", bg: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(250,204,21,0.35))" },
      { md: "02-14", n: "VASANT PANCH", i: "🌼", bg: "linear-gradient(135deg, rgba(254,240,138,0.4), rgba(245,158,11,0.3))" },
      { md: "02-15", n: "MAHA SHIVRATRI", i: "🔱", bg: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(30,27,75,0.35))" },
      { md: "03-27", n: "RAM NAVAMI", i: "🏹", bg: "linear-gradient(135deg, rgba(249,115,22,0.35), rgba(251,191,36,0.3))" },
      { md: "07-15", n: "ASHADHI BIJ", i: "🕉️", bg: "linear-gradient(135deg, rgba(212,175,55,0.35), rgba(2,136,209,0.25))" },
      { md: "08-09", n: "NAG PANCHAMI", i: "🐍", bg: "linear-gradient(135deg, rgba(101,163,13,0.3), rgba(21,128,61,0.25))" },
      { md: "08-28", n: "RAKSHA BANDHAN", i: "🎗️", bg: "linear-gradient(135deg, rgba(244,114,182,0.35), rgba(212,175,55,0.3))" },
      { md: "09-04", n: "JANMASHTAMI", i: "🏺", bg: "linear-gradient(135deg, rgba(14,165,233,0.35), rgba(245,158,11,0.3))" },
      { md: "09-14", n: "GANESH CHATUR", i: "🐘", bg: "linear-gradient(135deg, rgba(220,38,38,0.35), rgba(245,158,11,0.3))" },
      { md: "10-18", n: "DUSSEHRA HUD", i: "🏹", bg: "linear-gradient(135deg, rgba(185,28,28,0.35), rgba(212,175,55,0.3))" },
      { md: "11-06", n: "DHANTERAS MET", i: "🪙", bg: "linear-gradient(135deg, rgba(245,158,11,0.4), rgba(212,175,55,0.35))" }
  ];

  const renderItem = (item) => {
      const dateStr = `${item.dateObj.toLocaleDateString('en-IN', {weekday:'short'}).toUpperCase()} ${String(item.dateObj.getDate()).padStart(2,'0')}-${String(item.dateObj.getMonth()+1).padStart(2,'0')}`;
      const diff = item.dateObj.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 3600 * 24));
      let countText = days === 0 ? "TODAY" : `${days}d`;

      return `<div class="s-item" style="background: ${item.bg}; border-color: rgba(212,175,55,0.5);">
                 <span>${item.i} ${item.n}</span>
                 <span class="s-date">${dateStr} <b style="color:var(--sindoor-red); margin-left: 2px;">(${countText})</b></span>
              </div>`;
  };

  document.getElementById('strip-holidays').querySelector('.strip-items').innerHTML = makeArray(hBase).map(renderItem).join('');
  document.getElementById('strip-hindu').querySelector('.strip-items').innerHTML = makeArray(fBase).map(renderItem).join('');
}

// --- DUAL DIWALI TIMER ---
function updateDiwaliDualTimer() {
  const now = new Date().getTime();
  const prevDiwaliDate = new Date("2025-10-20T00:00:00").getTime();
  const prevDiff = now - prevDiwaliDate;
  if (prevDiff > 0) {
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

// --- FOREX ENGINE (10 CURRENCIES) ---
async function fetchForex() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    const rates = data.rates;
    const majorCurrencies = ['USD', 'EUR', 'GBP', 'AED', 'SAR', 'CAD', 'AUD', 'SGD', 'JPY', 'KWD'];
    const flagMap = { 
      USD: 'us', EUR: 'eu', GBP: 'gb', AED: 'ae', SAR: 'sa', 
      CAD: 'ca', AUD: 'au', SGD: 'sg', JPY: 'jp', KWD: 'kw' 
    };

    let html = '';
    majorCurrencies.forEach(code => {
        if (rates[code] && rates.INR) {
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
  } catch (e) {}
}

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
  const hour = now.getHours();

  const bodyEl = document.body;
  bodyEl.classList.remove('time-morning', 'time-afternoon', 'time-evening', 'time-night');
  if (hour >= 5 && hour < 12) bodyEl.classList.add('time-morning');
  else if (hour >= 12 && hour < 17) bodyEl.classList.add('time-afternoon');
  else if (hour >= 17 && hour < 20) bodyEl.classList.add('time-evening');
  else bodyEl.classList.add('time-night');

  let localParts = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(now);
  let h = localParts.find(p=>p.type==='hour').value; 
  let m = localParts.find(p=>p.type==='minute').value; 
  let s = localParts.find(p=>p.type==='second').value; 
  let ampm = localParts.find(p=>p.type==='dayPeriod').value;

  document.getElementById('clock-hours-mins').innerText = `${h}:${m}`;
  document.getElementById('clock-seconds').innerText = s;
  document.getElementById('clock-period').innerText = ampm.toUpperCase();
  document.getElementById('live-date').innerText = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(now);

  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  const weekNum = Math.ceil(dayOfYear / 7);
  const localMeta = document.getElementById('local-meta');
  if (localMeta) {
    localMeta.innerText = `DAY ${dayOfYear}/365 • WK ${weekNum} • IST (UTC+5:30) • 📍 21.17°N 72.83°E`;
  }

  let todInfo = { text: "NIGHT", class: "tod-night" };
  if (hour >= 5 && hour < 12) todInfo = { text: "MORNING", class: "tod-morning" };
  else if (hour >= 12 && hour < 17) todInfo = { text: "AFTERNOON", class: "tod-afternoon" };
  else if (hour >= 17 && hour < 21) todInfo = { text: "EVENING", class: "tod-evening" };

  const localBadge = document.getElementById('local-tod');
  if (localBadge) {
    localBadge.className = `tod-badge ${todInfo.class}`; 
    localBadge.innerText = todInfo.text;
  }

  // 🌐 GLOBAL CENTERS (10 CITIES INCL. ZURICH)
  const zones = { 
    'ny': 'America/New_York', 
    'lon': 'Europe/London', 
    'par': 'Europe/Paris',
    'zrh': 'Europe/Zurich',
    'dxb': 'Asia/Dubai', 
    'sgp': 'Asia/Singapore',
    'hkg': 'Asia/Hong_Kong',
    'tyo': 'Asia/Tokyo', 
    'syd': 'Australia/Sydney',
    'la': 'America/Los_Angeles'
  };

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

function getMoonPhaseSVG(phaseRatio) {
  let rx = Math.abs(Math.cos(phaseRatio * 2 * Math.PI)) * 50;
  let path = "";
  if (phaseRatio <= 0.25) { path = `M 50 0 A 50 50 0 0 0 50 100 A ${rx} 50 0 0 0 50 0`; } 
  else if (phaseRatio <= 0.5) { path = `M 50 0 A 50 50 0 0 0 50 100 A ${rx} 50 0 0 1 50 0`; } 
  else if (phaseRatio <= 0.75) { path = `M 50 0 A 50 50 0 0 1 50 100 A ${rx} 50 0 0 0 50 0`; } 
  else { path = `M 50 0 A 50 50 0 0 1 50 100 A ${rx} 50 0 0 1 50 0`; }
  
  return `<svg viewBox="0 0 100 100" style="width:100%; height:100%; border-radius:50%; filter: drop-shadow(0 0 6px rgba(212,175,55,0.4));">
      <circle cx="50" cy="50" r="48" fill="#d4af37"/>
      <path d="${path}" fill="#fffdf9" opacity="0.95" />
  </svg>`;
}

// ==========================================
// 🕉️ ACCURATE GUJARATI AMANTA PANCHANG (EXTENDED)
// ==========================================
function updatePanchangCore() {
  const now = new Date();
  const todayIST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  todayIST.setHours(6, 0, 0, 0);

  const JD = todayIST.getTime() / 86400000 + 2440587.5; 
  const d = JD - 2451545.0; 
  const rad = Math.PI / 180;

  const q = (280.459 + 0.98564736 * d) % 360; 
  const g = (357.529 + 0.98560028 * d) % 360;
  let sunLong = (q + 1.915 * Math.sin(g * rad) + 0.020 * Math.sin(2 * g * rad)) % 360; 
  if (sunLong < 0) sunLong += 360;

  const L_moon = (218.316 + 13.176396 * d) % 360; 
  const M_moon = (134.963 + 13.064993 * d) % 360; 
  const D_moon = (297.850 + 12.190749 * d) % 360;
  let moonLong = (L_moon + 6.289 * Math.sin(M_moon * rad) - 1.274 * Math.sin((M_moon - 2*D_moon) * rad) + 0.658 * Math.sin(2*D_moon * rad)) % 360; 
  if (moonLong < 0) moonLong += 360;

  const ayanamsa = 24.1 + ((todayIST.getFullYear() + (todayIST.getMonth() / 12)) - 2000) * 0.01396;
  let vedicSun = (sunLong - ayanamsa + 360) % 360;
  let vedicMoon = (moonLong - ayanamsa + 360) % 360;

  let tithiLong = (vedicMoon - vedicSun + 360) % 360;
  const tithiIndex = Math.floor(tithiLong / 12); 
  const nakshatraIndex = Math.floor(vedicMoon / (360 / 27)); 
  const rashiIndex = Math.floor(vedicMoon / 30); 
  const suryaRashiIndex = Math.floor(vedicSun / 30);

  const yogaIndex = Math.floor(((vedicMoon + vedicSun) % 360) / (360 / 27));
  const karanaIndex = Math.floor(tithiLong / 6);

  const rashis = ["મેષ (♈)", "વૃષભ (♉)", "મિથુન (♊)", "કર્ક (♋)", "સિંહ (♌)", "કન્યા (♍)", "તુલા (♎)", "વૃશ્ચિક (♏)", "ધન (♐)", "મકર (♑)", "કુંભ (♒)", "મીન (♓)"];
  const rashiSymbols = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  const nakshatras = ["અશ્વિની", "ભરણી", "કૃતિકા", "રોહિણી", "મૃગશીર્ષ", "આર્દ્રા", "પુનર્વસુ", "પુષ્ય", "આશ્લેષા", "મઘા", "પૂર્વા ફાલ્ગુની", "ઉત્તરા ફાલ્ગુની", "હસ્ત", "ચિત્રા", "સ્વાતિ", "વિશાખા", "અનુરાધા", "જ્યેષ્ઠા", "મૂળ", "પૂર્વાષાઢા", "ઉત્તરાષાઢા", "શ્રવણ", "ધનિષ્ઠા", "શતભિષા", "પૂર્વ ભાદ્રપદ", "ઉત્તર ભાદ્રપદ", "રેવતી"];
  const tithisGu = ["સુદ એકમ", "સુદ બીજ", "સુદ ત્રીજ", "સુદ ચોથ", "સુદ પાંચમ", "સુદ છઠ", "સુદ સાતમ", "સુદ આઠમ", "સુદ નોમ", "સુદ દશમ", "સુદ અગિયારસ", "સુદ બારસ", "સુદ તેરસ", "સુદ ચૌદશ", "પૂનમ", "વદ એકમ", "વદ બીજ", "વદ ત્રીજ", "વદ ચોથ", "વદ પાંચમ", "વદ છઠ", "વદ સાતમ", "વદ આઠમ", "વદ નોમ", "વદ દશમ", "વદ અગિયારસ", "વદ બારસ", "વદ તેરસ", "વદ ચૌદશ", "અમાસ"];
  
  const yogasGu = ["વિષ્કંભ", "પ્રીતિ", "આયુષ્માન", "સૌભાગ્ય", "શોભન", "અતિગંડ", "સુકર્મા", "ધૃતિ", "શૂલ", "ગંડ", "વૃદ્ધિ", "ધ્રુવ", "વ્યાઘાત", "હર્ષણ", "વજ્ર", "સિદ્ધિ", "વ્યતીપાત", "વરીયાન", "પરિઘ", "શિવ", "સિદ્ધ", "સાધ્ય", "શુભ", "શુક્લ", "બ્રહમ", "ઇન્દ્ર", "વૈધૃતિ"];
  const karanasRepeating = ["બવ", "બાલવ", "કૌલવ", "તૈતિલ", "ગર", "વણિજ", "વિષ્ટિ (ભદ્રા)"];
  let karanaName = "";
  if (karanaIndex === 0) karanaName = "કિંસ્તુઘ્ન";
  else if (karanaIndex >= 57) {
    const fixedK = ["શકુનિ", "ચતુષ્પાદ", "નાગ", "કિંસ્તુઘ્ન"];
    karanaName = fixedK[karanaIndex - 57] || "વિષ્ટિ";
  } else {
    karanaName = karanasRepeating[(karanaIndex - 1) % 7];
  }

  const gujDays = ["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"];
  const currentVaar = gujDays[now.getDay()];

  // Disha Shool (દિશા શૂળ)
  const dishaShoolMap = ["પશ્ચિમ", "પૂર્વ", "ઉત્તર", "ઉત્તર", "દક્ષિણ", "પશ્ચિમ", "પૂર્વ"];
  const currentDishaShool = dishaShoolMap[now.getDay()];

  let sunAtMonthStart = (vedicSun - (tithiLong * (0.9856 / 12.19)) + 360) % 360;
  const amavasyaRashi = Math.floor(sunAtMonthStart / 30);
  
  const gujMonths = ["વૈશાખ", "જેઠ", "અષાઢ", "શ્રાવણ", "ભાદરવો", "આસો", "કારતક", "માગશર", "પોષ", "મહા", "ફાગણ", "ચૈત્ર"];
  const currentGujMonth = gujMonths[amavasyaRashi];

  let vsYear = todayIST.getFullYear() + 56;
  if (amavasyaRashi >= 6 && amavasyaRashi <= 8 && todayIST.getMonth() >= 9) {
    vsYear += 1;
  }

  let isShukla = tithiIndex < 15;
  document.getElementById('panchang-samvat').innerText = `સંવત ${vsYear} • ${currentVaar}`;
  document.getElementById('panchang-month').innerText = `${currentGujMonth} માસ • ${isShukla ? 'શુક્લ (સુદ)' : 'કૃષ્ણ (વદ)'} પક્ષ`;
  document.getElementById('panchang-tithi').innerText = `${currentGujMonth} ${tithisGu[tithiIndex]}`;

  document.getElementById('rashi-img').src = createAstroIcon(rashiSymbols[rashiIndex], '#8b0000');
  document.getElementById('panchang-rashi').innerText = rashis[rashiIndex];

  document.getElementById('nak-img').src = createAstroIcon('✨', '#b89020');
  document.getElementById('panchang-nak').innerText = nakshatras[nakshatraIndex];

  document.getElementById('yoga-img').src = createAstroIcon('💫', '#8e24aa');
  document.getElementById('panchang-yoga').innerText = yogasGu[yogaIndex];

  document.getElementById('karana-img').src = createAstroIcon('📜', '#0288d1');
  document.getElementById('panchang-karana').innerText = karanaName;

  document.getElementById('surya-img').src = createAstroIcon('☀️', '#f59e0b');
  document.getElementById('panchang-surya').innerText = rashis[suryaRashiIndex];

  document.getElementById('disha-img').src = createAstroIcon('🧭', '#dc2626');
  document.getElementById('panchang-disha').innerText = currentDishaShool;

  let phaseRatio = tithiLong / 360;
  document.getElementById('dynamic-moon').innerHTML = getMoonPhaseSVG(phaseRatio);
}

let globalSunrise = null; 
let globalSunset = null;

function updateSkyArch() {
  if (!globalSunrise || !globalSunset) return;
  const now = new Date(); 
  const body = document.getElementById('astro-body'); 
  let percent = 0;

  if (now >= globalSunrise && now <= globalSunset) {
      percent = (now - globalSunrise) / (globalSunset - globalSunrise);
      body.style.background = '#d4af37'; 
      body.style.boxShadow = '0 0 16px #d4af37';
  } else {
      let prevSet = new Date(globalSunset); if (now < prevSet) prevSet.setDate(prevSet.getDate()-1);
      let nextRise = new Date(globalSunrise); if (now > nextRise) nextRise.setDate(nextRise.getDate()+1);
      percent = (now - prevSet) / (nextRise - prevSet);
      body.style.background = '#8b0000'; 
      body.style.boxShadow = '0 0 16px #8b0000';
  }
  percent = Math.max(0, Math.min(1, percent));
  body.style.left = `${percent * 100}%`; 
  body.style.top = `${100 - (Math.sin(percent * Math.PI) * 100)}%`;
}

function updateAstrologyTracking() {
  if (!globalSunrise || !globalSunset) return; 
  updateSkyArch(); 
  const now = new Date();
  const daySeq = [[{n:"ઉદ્વેગ"},{n:"ચલ"},{n:"લાભ"},{n:"અમૃત"},{n:"કાળ"},{n:"શુભ"},{n:"રોગ"},{n:"ઉદ્વેગ"}],[{n:"અમૃત"},{n:"કાળ"},{n:"શુભ"},{n:"રોગ"},{n:"ઉદ્વેગ"},{n:"ચલ"},{n:"લાભ"},{n:"અમૃત"}],[{n:"રોગ"},{n:"ઉદ્વેગ"},{n:"ચલ"},{n:"લાભ"},{n:"અમૃત"},{n:"કાળ"},{n:"શુભ"},{n:"રોગ"}],[{n:"લાભ"},{n:"અમૃત"},{n:"કાળ"},{n:"શુભ"},{n:"રોગ"},{n:"ઉદ્વેગ"},{n:"ચલ"},{n:"લાભ"}],[{n:"શુભ"},{n:"રોગ"},{n:"ઉદ્વેગ"},{n:"ચલ"},{n:"લાભ"},{n:"અમૃત"},{n:"કાળ"},{n:"શુભ"}],[{n:"ચલ"},{n:"લાભ"},{n:"અમૃત"},{n:"કાળ"},{n:"શુભ"},{n:"રોગ"},{n:"ઉદ્વેગ"},{n:"ચલ"}],[{n:"કાળ"},{n:"શુભ"},{n:"રોગ"},{n:"ઉદ્વેગ"},{n:"ચલ"},{n:"લાભ"},{n:"અમૃત"},{n:"કાળ"}]];

  let dayOfWeek = now.getDay();
  let totalMins = (globalSunset - globalSunrise) / 60000; 
  let passedMins = Math.max(0, (now - globalSunrise) / 60000); 
  let activeSeq = daySeq[dayOfWeek];

  let currentIndex = Math.min(7, Math.floor(passedMins / (totalMins / 8)));
  document.getElementById('ch-prev').innerText = activeSeq[Math.max(0, currentIndex - 1)].n; 
  document.getElementById('ch-live').innerText = activeSeq[currentIndex].n; 
  document.getElementById('ch-next').innerText = activeSeq[Math.min(7, currentIndex + 1)].n; 

  const rahuPartMap = [8, 2, 7, 5, 6, 4, 3];
  const partDuration = (globalSunset - globalSunrise) / 8;
  const rahuStart = new Date(globalSunrise.getTime() + (rahuPartMap[dayOfWeek] - 1) * partDuration);
  const rahuEnd = new Date(rahuStart.getTime() + partDuration);
  
  const fTime = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const rahuLabel = document.getElementById('rahu-timing');
  if (rahuLabel) {
    rahuLabel.innerText = `${fTime(rahuStart)} - ${fTime(rahuEnd)}`;
  }
}

// --- WEATHER FORECAST ---
const weatherEmojis = { 0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️', 61: '🌧️', 63: '🌧️', 65: '🌧️', 82: '⛈️', 95: '⛈️' };
async function fetchWeatherAll() {
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=21.1702&longitude=72.8311&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=Asia%2FKolkata&forecast_days=7');
    const data = await res.json();

    document.getElementById('weather-temp').innerText = `${Math.round(data.current.temperature_2m)}°C`;
    document.getElementById('weather-icon').innerText = weatherEmojis[data.current.weather_code] || '☀️';
    document.getElementById('weather-desc').innerText = data.current.weather_code <= 3 ? "Clear Sky" : "Cloudy";

    document.getElementById('wl-hum').innerText = `${data.current.relative_humidity_2m}%`;
    document.getElementById('wl-feel').innerText = `${Math.round(data.current.apparent_temperature)}°C`;
    document.getElementById('wl-wind').innerText = `${data.current.wind_speed_10m} km/h`;
    document.getElementById('wl-cloud').innerText = `${data.current.cloud_cover}%`;

    globalSunrise = new Date(data.daily.sunrise[0]); 
    globalSunset = new Date(data.daily.sunset[0]);
    document.getElementById('api-sunrise').innerText = globalSunrise.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });
    document.getElementById('api-sunset').innerText = globalSunset.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });

    updateAstrologyTracking();

    const container = document.getElementById('forecast-table');
    container.innerHTML = `<div class="ft-header"><span>DAYS</span><span>SKY</span><span>TEMP</span><span>WIND</span><span>RAIN</span><span>UV</span></div>`;

    for (let i = 0; i < 7; i++) {
      const dateObj = new Date(data.daily.time[i]);
      const dayName = i === 0 ? `TODAY` : `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')} | ${dateObj.toLocaleDateString('en-IN', { weekday:'short' }).toUpperCase()}`;
      const max = Math.round(data.daily.temperature_2m_max[i]); 
      const min = Math.round(data.daily.temperature_2m_min[i]);
      const uv = Math.round(data.daily.uv_index_max[i]); 
      const rain = data.daily.precipitation_probability_max[i] || 0;

      container.innerHTML += `
        <div class="ft-row">
          <span class="ft-day">${dayName}</span>
          <span>${weatherEmojis[data.daily.weather_code[i]] || '⛅'}</span>
          <div><b style="color:var(--sindoor-red)">${max}°</b> / ${min}°</div>
          <span>${Math.round(data.current.wind_speed_10m)} km/h</span>
          <span style="color:var(--zari-dark);">${rain}%</span>
          <span style="color:var(--emerald-green); font-weight:900;">${uv}</span>
        </div>`;
    }
  } catch (e) {}
}

// --- BULLETPROOF RSS ENGINE ---
async function fetchSplitNews() {
  try {
    const fetchFeed = async (url, id, fallbackUrl = null) => {
       const container = document.getElementById(id); 
       try {
         const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
         const data = await res.json();
         
         let items = data.items;
         if ((!items || items.length === 0) && fallbackUrl) {
            const fbRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(fallbackUrl)}`);
            const fbData = await fbRes.json();
            items = fbData.items;
         }

         container.innerHTML = '';
         if (items && items.length > 0) {
           items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
           
           items.slice(0, 8).forEach(news => {
              const d = new Date(news.pubDate);
              const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
              const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
              const cleanTitle = news.title.split(' - ')[0];

              container.innerHTML += `
                <a href="${news.link}" target="_blank" class="news-item">
                  <div class="news-title">${cleanTitle}</div>
                  <div class="news-meta">🕒 ${dateStr}, ${timeStr}</div>
                </a>`;
           });
         } else {
           container.innerHTML = `<div style="text-align:center; color: var(--text-muted); font-size: 7.5pt; padding: 10px;">No recent alerts.</div>`;
         }
       } catch (err) {
         container.innerHTML = `<div style="text-align:center; color: var(--text-muted); font-size: 7.5pt; padding: 10px;">Unavailable.</div>`;
       }
    };

    fetchFeed('https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en', 'india-feed');
    fetchFeed('https://www.espncricinfo.com/rss/content/story/feeds/0.xml', 'cricket-feed');
    fetchFeed('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-IN&gl=IN&ceid=IN:en', 'world-feed');
    fetchFeed('https://news.google.com/rss/headlines/section/topic/SPORTS?hl=en-IN&gl=IN&ceid=IN:en', 'sports-feed', 'https://feeds.bbci.co.uk/sport/rss.xml');
  } catch (e) {}
}

// ============================================================================
// 📦 STRICT UNIFIED 7/5 RATIO & 1400x1000 EXPORT ENGINE
// ============================================================================
let images = []; 
let currentIndex = 0; 
let renameMap = []; 
let directoryHandle = null; 
let cropper = null; 
let baseCanvas = document.createElement('canvas');

const EXPORT_WIDTH = 1400;
const EXPORT_HEIGHT = 1000;
const STRICT_FIXED_RATIO = 7 / 5;

let autoRotatePortrait = true;

function initCropper() {
  const imgElement = document.getElementById('slipImage');
  if (cropper) { 
    cropper.destroy(); 
    cropper = null; 
  } 
  
  cropper = new Cropper(imgElement, {
    aspectRatio: STRICT_FIXED_RATIO, // Fixed 7/5 strictly (1.4:1)
    viewMode: 1,
    dragMode: 'move',
    autoCropArea: 1,                 // 100% full area
    center: true,
    guides: false,                   // Clean view without guides
    highlight: false,
    background: false,
    toggleDragModeOnDblclick: false,
    ready: function () {
      cropper.setAspectRatio(STRICT_FIXED_RATIO);
    }
  });
}

function toggleOrientationMode() {
  autoRotatePortrait = !autoRotatePortrait;
  
  const btn = document.getElementById('btnOrientationMode');
  if (btn) {
    btn.innerHTML = autoRotatePortrait ? '📐 AUTO-ROTATE: ON (7/5)' : '📐 AUTO-ROTATE: OFF (7/5)';
  }
  
  showToast(autoRotatePortrait ? "Auto-Rotate Portrait: ON" : "Auto-Rotate Portrait: OFF", 'var(--sindoor-red)');
  
  if (images.length > 0 && currentIndex < images.length) {
    renderImageWithOrientation();
  }
}

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
    showToast("📁 Batch Mounted Successfully", "var(--emerald-green)");
    
  } catch (error) { 
    if (error.name !== 'AbortError') alert("❌ Could not access folder."); 
  }
}

function manualRotate() {
  if (!cropper) return;
  
  let newCanvas = document.createElement('canvas');
  newCanvas.width = baseCanvas.height; 
  newCanvas.height = baseCanvas.width;
  let ctx = newCanvas.getContext('2d');
  
  ctx.translate(newCanvas.width / 2, newCanvas.height / 2); 
  ctx.rotate(90 * Math.PI / 180);
  ctx.drawImage(baseCanvas, -baseCanvas.width / 2, -baseCanvas.height / 2);
  
  baseCanvas = newCanvas; 
  
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  
  const imgElement = document.getElementById('slipImage');
  imgElement.onload = function() { initCropper(); };
  imgElement.src = baseCanvas.toDataURL('image/jpeg', 1);
  
  showToast("🔄 90° Rotated (7/5 Preserved)", "var(--zari-dark)");
}

function resetZoom() { 
  if (cropper) { 
    cropper.reset(); 
    showToast("🔍 View Reset", "var(--zari-dark)"); 
  } 
}

function renderImageWithOrientation() {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }

  const imgUrl = URL.createObjectURL(images[currentIndex]);
  let currentImgObj = new Image();
  
  currentImgObj.onload = function() {
    const ctx = baseCanvas.getContext('2d');
    let naturalIsPortrait = currentImgObj.naturalHeight > currentImgObj.naturalWidth;
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (naturalIsPortrait && autoRotatePortrait) {
      baseCanvas.width = currentImgObj.naturalHeight; 
      baseCanvas.height = currentImgObj.naturalWidth;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(baseCanvas.width / 2, baseCanvas.height / 2);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.drawImage(currentImgObj, -currentImgObj.naturalWidth / 2, -currentImgObj.naturalHeight / 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      baseCanvas.width = currentImgObj.naturalWidth; 
      baseCanvas.height = currentImgObj.naturalHeight;
      ctx.drawImage(currentImgObj, 0, 0);
    }
    
    const imgElement = document.getElementById('slipImage');
    imgElement.onload = function() { initCropper(); };
    imgElement.src = baseCanvas.toDataURL('image/jpeg', 1);
  };
  
  currentImgObj.src = imgUrl;
}

function loadNextImage() {
  if (currentIndex >= images.length) {
    return finishAndExport();
  }
  
  renderImageWithOrientation();

  document.getElementById('currentIndex').innerText = currentIndex + 1;
  document.getElementById('progressBar').style.width = `${((currentIndex) / images.length) * 100}%`;
  
  const input = document.getElementById('renameInput'); 
  input.value = ''; 
  input.focus();
}

function undoLastAction() {
  if (renameMap.length === 0 || currentIndex === 0) {
    return showToast("⚠️ Nothing to Undo", "var(--sindoor-red)");
  }
  renameMap.pop(); 
  currentIndex--; 
  loadNextImage(); 
  showToast("⏪ Undid Last Slip", "var(--zari-gold)");
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
          cropper.getCroppedCanvas({
            width: EXPORT_WIDTH,
            height: EXPORT_HEIGHT,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
          }).toBlob(blob => { resolve(blob); }, 'image/jpeg', 0.92); 
          showToast("⚡ Full Image (1400x1000)", "var(--zari-gold)"); 
        });
      } else {
        finalBlobPromise = new Promise(resolve => { 
          cropper.getCroppedCanvas({
            width: EXPORT_WIDTH,
            height: EXPORT_HEIGHT,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
          }).toBlob(blob => { resolve(blob); }, 'image/jpeg', 0.92); 
          showToast("✂️ Fixed 7/5 Slip Saved", "var(--emerald-green)"); 
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
  if (renameMap.length === 0) return showToast("⚠️ No files processed.", "var(--sindoor-red)");
  
  document.getElementById('progressBar').style.width = `100%`;
  const btnFinish = document.getElementById('btnFinish');
  btnFinish.style.pointerEvents = "none"; 
  btnFinish.style.background = "linear-gradient(135deg, #475569, #334155)";

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
    <div style="width: 100%; text-align: center; margin-top: 20px; background: rgba(255,253,249,0.9); padding: 40px; border-radius: 20px; border: 2px solid var(--panel-border); box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
      <div style="font-size: 60px; margin-bottom: 15px;">📦 ✅</div>
      <h1 style="color: var(--sindoor-red); font-size: 28pt; margin: 0 0 10px 0; font-family:'Amita', serif;">Slips Renamed & Exported!</h1>
      <p style="font-size: 13pt; color: var(--text-main); font-weight: 800; margin-bottom: 30px;">All <b>${renameMap.length}</b> slips have been standardized to <b>1400 × 1000 px (7/5)</b>, renamed, and stored.</p>
      <button class="btn-pro blue-btn" style="margin: 0 auto; height: 50px; font-size: 11pt;" onclick="location.reload()">🔄 Process Another Folder</button>
    </div>
  `;
  showToast("✅ All Files Saved in Fixed 7/5 Dimensions!", "var(--emerald-green)");
}

// --- BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundAnimation();
  populateStrips();
  setInterval(updateDiwaliDualTimer, 1000); updateDiwaliDualTimer();
  fetchForex();
  setInterval(updateClocks, 1000); updateClocks();
  updatePanchangCore(); setInterval(updatePanchangCore, 60000);
  fetchWeatherAll();
  fetchSplitNews(); setInterval(fetchSplitNews, 300000);
});
