/* ════════════════════════════════════
   CHARTS — All Chart.js Instances
════════════════════════════════════ */

const Charts = {};

/* ── Engagement Line Chart ── */
function initEngagementChart(platform = 'all') {
  const ctx = document.getElementById('chart-engagement');
  if (!ctx) return;

  if (Charts.engagement) Charts.engagement.destroy();

  const data = MOCK_DATA.engagement;
  const labels = data.labels;

  let datasets;
  if (platform === 'all') {
    datasets = [
      { label: '𝕏 Twitter',  data: data.datasets.x,         borderColor: '#e7e9ea', backgroundColor: hexAlpha('#e7e9ea',0.05), tension: 0.4, pointRadius: 0, borderWidth: 1.5 },
      { label: 'LinkedIn',   data: data.datasets.linkedin,   borderColor: '#0a66c2', backgroundColor: hexAlpha('#0a66c2',0.06), tension: 0.4, pointRadius: 0, borderWidth: 1.5 },
      { label: 'Instagram',  data: data.datasets.instagram,  borderColor: '#e1306c', backgroundColor: hexAlpha('#e1306c',0.06), tension: 0.4, pointRadius: 0, borderWidth: 1.5 },
      { label: 'Facebook',   data: data.datasets.facebook,   borderColor: '#1877f2', backgroundColor: hexAlpha('#1877f2',0.06), tension: 0.4, pointRadius: 0, borderWidth: 1.5 },
      {
        label: 'Combined',
        data: data.datasets.all,
        borderColor: '#4f8ef7',
        backgroundColor: hexAlpha('#4f8ef7', 0.12),
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2.5,
      },
    ];
  } else {
    const map = { x: ['𝕏 Twitter','#e7e9ea'], linkedin: ['LinkedIn','#0a66c2'], instagram: ['Instagram','#e1306c'], facebook: ['Facebook','#1877f2'] };
    const [label, color] = map[platform] || ['Combined','#4f8ef7'];
    const key = platform === 'x' ? 'x' : platform;
    datasets = [{
      label,
      data: data.datasets[key] || data.datasets.all,
      borderColor: color,
      backgroundColor: hexAlpha(color.replace(/[a-f0-9]{6}/i, m => m), 0.12),
      fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2.5,
    }];
  }

  const cfg = chartDefaults();
  Charts.engagement = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      ...cfg,
      plugins: { ...cfg.plugins, legend: { ...cfg.plugins.legend, display: platform === 'all' } },
    }
  });
}

/* ── Platform Doughnut ── */
function initPlatformChart() {
  const ctx = document.getElementById('chart-platform');
  if (!ctx) return;
  if (Charts.platform) Charts.platform.destroy();

  const d = MOCK_DATA.platformBreakdown;
  Charts.platform = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.followers,
        backgroundColor: d.colors.map(c => hexAlpha(c, 0.85)),
        borderColor: d.colors,
        borderWidth: 1.5,
        hoverOffset: 6,
      }],
    },
    options: {
      ...chartDefaults(),
      cutout: '62%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#8a94a8', font: { size: 11 }, boxWidth: 10, padding: 12 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${fmtNum(ctx.raw)} followers` } }
      }
    }
  });
}

/* ── Sentiment Doughnut ── */
function initSentimentChart(platform = 'all') {
  const ctx = document.getElementById('chart-sentiment');
  if (!ctx) return;
  if (Charts.sentiment) Charts.sentiment.destroy();

  const s = platform === 'all' ? MOCK_DATA.sentiment.overall : MOCK_DATA.sentiment.byPlatform[platform] || MOCK_DATA.sentiment.overall;

  Charts.sentiment = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Positive','Neutral','Negative'],
      datasets: [{
        data: [s.positive, s.neutral, s.negative],
        backgroundColor: ['rgba(34,197,94,0.75)','rgba(245,158,11,0.6)','rgba(239,68,68,0.7)'],
        borderColor: ['#22c55e','#f59e0b','#ef4444'],
        borderWidth: 1.5,
        hoverOffset: 5,
      }],
    },
    options: {
      ...chartDefaults(),
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` } }
      }
    }
  });

  const legend = document.getElementById('sentiment-legend');
  if (legend) {
    legend.innerHTML = [
      { label: 'Positive', val: s.positive, color: '#22c55e' },
      { label: 'Neutral',  val: s.neutral,  color: '#f59e0b' },
      { label: 'Negative', val: s.negative, color: '#ef4444' },
    ].map(i => `
      <div class="legend-item">
        <div class="legend-dot" style="background:${i.color}"></div>
        <span>${i.label} <strong style="color:${i.color}">${i.val}%</strong></span>
      </div>`).join('');
  }
}

/* ── Reach vs Impressions ── */
function initReachChart() {
  const ctx = document.getElementById('chart-reach');
  if (!ctx) return;
  if (Charts.reach) Charts.reach.destroy();

  const d = MOCK_DATA.reachImpressions;
  const cfg = chartDefaults();
  Charts.reach = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [
        { label: 'Impressions', data: d.impressions, backgroundColor: hexAlpha('#4f8ef7',0.6), borderColor: '#4f8ef7', borderWidth: 1, borderRadius: 4 },
        { label: 'Reach',       data: d.reach,       backgroundColor: hexAlpha('#2dd4bf',0.6), borderColor: '#2dd4bf', borderWidth: 1, borderRadius: 4 },
      ],
    },
    options: { ...cfg, plugins: { ...cfg.plugins } }
  });
}

/* ── Follower Growth ── */
function initFollowerChart() {
  const ctx = document.getElementById('chart-followers');
  if (!ctx) return;
  if (Charts.followers) Charts.followers.destroy();

  const d = MOCK_DATA.followerGrowth;
  const cfg = chartDefaults();
  Charts.followers = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        { label: '𝕏',        data: d.x,         borderColor: '#e7e9ea', backgroundColor: 'transparent', tension: 0.4, pointRadius: 3, borderWidth: 1.5 },
        { label: 'LinkedIn',  data: d.linkedin,  borderColor: '#0a66c2', backgroundColor: 'transparent', tension: 0.4, pointRadius: 3, borderWidth: 1.5 },
        { label: 'Instagram', data: d.instagram, borderColor: '#e1306c', backgroundColor: hexAlpha('#e1306c',0.08), fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2 },
        { label: 'Facebook',  data: d.facebook,  borderColor: '#1877f2', backgroundColor: 'transparent', tension: 0.4, pointRadius: 3, borderWidth: 1.5 },
      ],
    },
    options: { ...cfg }
  });
}

/* ── Share of Voice ── */
function initSovChart() {
  const ctx = document.getElementById('chart-sov');
  if (!ctx) return;
  if (Charts.sov) Charts.sov.destroy();

  const d = MOCK_DATA.competitors;
  Charts.sov = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.map(c => c.name),
      datasets: [{
        data: d.map(c => c.sov),
        backgroundColor: d.map(c => hexAlpha(c.color, 0.8)),
        borderColor: d.map(c => c.color),
        borderWidth: 1.5,
        hoverOffset: 6,
      }]
    },
    options: {
      ...chartDefaults(),
      cutout: '55%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#8a94a8', font: { size: 11 }, boxWidth: 10, padding: 10 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` } }
      }
    }
  });
}

/* ── Competitor Sentiment Radar ── */
function initCompSentimentChart() {
  const ctx = document.getElementById('chart-comp-sentiment');
  if (!ctx) return;
  if (Charts.compSentiment) Charts.compSentiment.destroy();

  const d = MOCK_DATA.competitors;
  Charts.compSentiment = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Sentiment', 'Engagement', 'Reach', 'Growth', 'Content Quality', 'Brand Loyalty'],
      datasets: d.map(c => ({
        label: c.name,
        data: [
          c.sentiment,
          c.engBar,
          Math.round(c.sov * 2.5),
          c.growthBar,
          Math.round(55 + Math.random() * 35),
          Math.round(50 + Math.random() * 40),
        ],
        borderColor: c.color,
        backgroundColor: hexAlpha(c.color, 0.08),
        borderWidth: 1.5,
        pointRadius: 3,
      })),
    },
    options: {
      ...chartDefaults(),
      scales: {
        r: {
          ticks: { color: '#5a6478', backdropColor: 'transparent', font: { size: 9 } },
          grid: { color: 'rgba(42,51,72,0.6)' },
          pointLabels: { color: '#8a94a8', font: { size: 10 } },
          min: 0, max: 100,
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { color: '#8a94a8', font: { size: 11 }, boxWidth: 10, padding: 10 } }
      }
    }
  });
}

/* ── Trend Predictions ── */
function initPredictionsChart() {
  const ctx = document.getElementById('chart-predictions');
  if (!ctx) return;
  if (Charts.predictions) Charts.predictions.destroy();

  const d = MOCK_DATA.predictions;
  Charts.predictions = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Actual',
          data: d.actual,
          borderColor: '#4f8ef7',
          backgroundColor: hexAlpha('#4f8ef7', 0.1),
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          spanGaps: false,
        },
        {
          label: 'AI Prediction',
          data: d.predicted,
          borderColor: '#7c5cd8',
          backgroundColor: 'transparent',
          borderDash: [5, 4],
          tension: 0.4,
          pointRadius: 3,
          borderWidth: 2,
        },
        {
          label: 'Upper Bound',
          data: d.upper,
          borderColor: 'rgba(124,92,216,0.2)',
          backgroundColor: hexAlpha('#7c5cd8', 0.07),
          fill: '+1',
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 1,
        },
        {
          label: 'Lower Bound',
          data: d.lower,
          borderColor: 'rgba(124,92,216,0.2)',
          backgroundColor: 'transparent',
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 1,
        },
      ],
    },
    options: { ...chartDefaults() }
  });
}

/* ── Posting Heatmap ── */
function renderHeatmap() {
  const container = document.getElementById('posting-heatmap');
  if (!container) return;

  const { days, data } = MOCK_DATA.heatmap;
  const maxVal = Math.max(...data.flat());

  let html = '<div style="display:contents">';
  // Header row
  html += '<div></div>'; // empty corner
  for (let h = 0; h < 24; h++) {
    html += `<div class="hour-label">${h % 3 === 0 ? h + 'h' : ''}</div>`;
  }
  html += '</div>';

  days.forEach((day, di) => {
    html += `<div class="heatmap-day">${day}</div>`;
    for (let h = 0; h < 24; h++) {
      const val = data[di][h];
      const intensity = val / maxVal;
      const alpha = 0.08 + intensity * 0.85;
      const tooltip = `${day} ${h}:00 — Score: ${val}`;
      html += `<div class="heat-cell" title="${tooltip}" style="background:rgba(79,142,247,${alpha.toFixed(2)})"></div>`;
    }
  });

  container.innerHTML = html;
}

/* ── Init all charts for a given view ── */
function initChartsForView(view) {
  requestAnimationFrame(() => {
    if (view === 'dashboard') {
      initEngagementChart(window.activePlatform);
      initPlatformChart();
      initSentimentChart(window.activePlatform);
      renderHeatmap();
      renderPostsTable();
    } else if (view === 'analytics') {
      initReachChart();
      initFollowerChart();
      renderHashtagGrid();
    } else if (view === 'ai-insights') {
      initPredictionsChart();
      renderTopicBubbles();
    } else if (view === 'competitors') {
      initSovChart();
      initCompSentimentChart();
    }
  });
}

/* ── Posts Table ── */
function renderPostsTable() {
  const el = document.getElementById('posts-table');
  if (!el) return;

  const rows = MOCK_DATA.topPosts.map(p => `
    <tr>
      <td><span class="platform-tag ${p.platform}">${{ig:'📷 Instagram',li:'in LinkedIn',x:'𝕏 Twitter',fb:'f Facebook'}[p.platform]}</span></td>
      <td style="max-width:280px;font-size:12.5px;color:var(--text-2)">${p.content}</td>
      <td><strong>${fmtNum(p.likes)}</strong></td>
      <td>${fmtNum(p.shares)}</td>
      <td>${fmtNum(p.comments)}</td>
      <td>${p.reach}</td>
      <td><span class="sentiment-chip ${p.sentiment}">${p.sentiment}</span></td>
      <td style="color:var(--text-3);font-size:12px">${p.date}</td>
    </tr>`).join('');

  el.innerHTML = `<table>
    <thead><tr>
      <th>Platform</th><th>Post</th><th>Likes</th><th>Shares</th><th>Comments</th><th>Reach</th><th>Sentiment</th><th>Date</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

/* ── Hashtag Grid ── */
function renderHashtagGrid() {
  const el = document.getElementById('hashtag-grid');
  if (!el) return;
  el.innerHTML = MOCK_DATA.hashtags.map(h => `
    <div class="hashtag-item" onclick="copyText('${h.tag}')">
      <div class="ht-tag">${h.tag}</div>
      <div class="ht-uses">${h.uses} posts</div>
      <div class="ht-trend" style="color:var(--green)">${h.trend}</div>
    </div>`).join('');
}

/* ── Topic Bubbles ── */
function renderTopicBubbles() {
  const el = document.getElementById('topic-bubbles');
  if (!el) return;
  el.innerHTML = MOCK_DATA.topics.map(t => `
    <div class="topic-bubble" style="
      background: ${hexAlpha(t.color, 0.15)};
      border: 1px solid ${hexAlpha(t.color, 0.4)};
      color: ${t.color};
      font-size: ${Math.round(11 + t.size * 3)}px;
    " title="Trending score: ${t.score}">${t.label}</div>`).join('');
}

/* ── KPI Grid ── */
function renderKpiGrid(containerId, platform) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const data = MOCK_DATA.kpis[platform] || MOCK_DATA.kpis.all;
  el.innerHTML = data.map(k => `
    <div class="kpi-card ${k.color}">
      <div class="kpi-icon">${k.icon}</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value" data-raw="${k.value}" data-fmt="${k.formatted}">${k.formatted}</div>
      <div class="kpi-delta ${k.dir}">${k.dir === 'up' ? '▲' : '▼'} ${k.delta.replace(/[▲▼]/,'')} this week</div>
    </div>`).join('');
}
