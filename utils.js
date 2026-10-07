/* ════════════════════════════════════
   UTILS — Helpers & Shared Logic
════════════════════════════════════ */

/* Number formatter */
function fmtNum(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

/* Counter animation */
function animateCounter(el, target, suffix = '') {
  const start = Date.now();
  const dur = 1200;
  const startVal = 0;
  function tick() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / dur, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = fmtNum(current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* Toast notification */
function showToast(msg, duration = 2800) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

/* Copy to clipboard */
function copyText(text) {
  navigator.clipboard?.writeText(text).then(() => showToast('✓ Copied to clipboard'))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('✓ Copied to clipboard');
    });
}

/* Simulate AI delay (returns Promise) */
function aiDelay(minMs = 800, maxMs = 1800) {
  return new Promise(r => setTimeout(r, minMs + Math.random() * (maxMs - minMs)));
}

/* Chart.js default config */
function chartDefaults() {
  return {
    plugins: {
      legend: {
        labels: {
          color: '#8a94a8',
          font: { size: 11 },
          boxWidth: 10,
          padding: 16,
        }
      },
      tooltip: {
        backgroundColor: '#1a2030',
        borderColor: '#2a3348',
        borderWidth: 1,
        titleColor: '#e8ecf4',
        bodyColor: '#8a94a8',
        padding: 10,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        ticks: { color: '#5a6478', font: { size: 10 }, maxRotation: 0 },
        grid: { color: 'rgba(42,51,72,0.6)', drawBorder: false },
      },
      y: {
        ticks: { color: '#5a6478', font: { size: 10 } },
        grid: { color: 'rgba(42,51,72,0.6)', drawBorder: false },
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 800, easing: 'easeOutQuart' },
  };
}

/* Hex → rgba helper */
function hexAlpha(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

/* Current platform filter */
window.activePlatform = 'all';
