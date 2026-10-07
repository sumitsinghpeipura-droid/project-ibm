/* ════════════════════════════════════
   CONTENT STUDIO — AI Generator UI
════════════════════════════════════ */

const ContentStudio = {

  init() {
    // Caption Generator
    document.getElementById('btn-generate-caption')?.addEventListener('click', ContentStudio.generateCaption);

    // Hashtag Recommender
    document.getElementById('btn-gen-hashtags')?.addEventListener('click', ContentStudio.generateHashtags);

    // Campaign Generator
    document.getElementById('btn-gen-campaign')?.addEventListener('click', ContentStudio.generateCampaigns);

    // Render static sections
    ContentStudio.renderCalendar();
    ContentStudio.renderSchedule();
    ContentStudio.renderActiveCampaigns();
    ContentStudio.renderInsightsGrid();
    ContentStudio.renderCompetitors();
    ContentStudio.renderIntelligence();
  },

  /* ── Caption Generator ── */
  async generateCaption() {
    const btn = document.getElementById('btn-generate-caption');
    const topic = document.getElementById('caption-topic').value.trim() || 'AI-powered product';
    const tone  = document.getElementById('caption-tone').value;
    const platform = document.getElementById('caption-platform').value;

    btn.textContent = '⏳ Generating…';
    btn.classList.add('loading');

    const prompt = `Write a ${tone.toLowerCase()} social media caption for ${platform} about: "${topic}". tone: ${tone}`;
    const result = await GraniteAI.generate(prompt);

    btn.textContent = '✦ Generate with Granite';
    btn.classList.remove('loading');

    const output = document.getElementById('caption-output');
    output.style.display = 'block';
    output.innerHTML = `
      <div class="output-header">
        <span class="output-label">Generated Caption — ${platform}</span>
        <span class="badge-ai" style="font-size:9px">Granite AI</span>
      </div>
      <div class="output-text" id="cap-text">${result}</div>
      <div class="output-actions" style="margin-top:10px">
        <button class="btn-secondary" onclick="ContentStudio.generateCaption()">↻ Regenerate</button>
        <button class="btn-primary" onclick="copyText(document.getElementById('cap-text').textContent)">Copy</button>
      </div>
    `;
    showToast('✦ Caption generated with Granite AI');
  },

  /* ── Hashtag Generator ── */
  async generateHashtags() {
    const btn  = document.getElementById('btn-gen-hashtags');
    const text = document.getElementById('hashtag-input').value.trim() || 'AI marketing technology';

    btn.textContent = '⏳ Analysing…';
    btn.classList.add('loading');

    const prompt = `Suggest hashtags for: "${text}". hashtag recommendations`;
    const result = await GraniteAI.generate(prompt);
    const tags = result.split(/\s+/).filter(t => t.startsWith('#'));

    btn.textContent = 'Get Hashtags';
    btn.classList.remove('loading');

    const output = document.getElementById('hashtag-output');
    output.innerHTML = tags.length
      ? tags.map(t => `<span class="hashtag-tag" onclick="copyText('${t}')">${t}</span>`).join('')
      : '<span style="color:var(--text-3);font-size:12px">No hashtags found — try a different description.</span>';

    showToast(`✦ ${tags.length} hashtags generated`);
  },

  /* ── Campaign Generator ── */
  async generateCampaigns() {
    const btn      = document.getElementById('btn-gen-campaign');
    const industry = document.getElementById('campaign-industry').value.trim() || 'Technology';
    const goal     = document.getElementById('campaign-goal').value;
    const budget   = document.getElementById('campaign-budget').value;

    btn.textContent = '⏳ Generating Ideas…';
    btn.classList.add('loading');

    const prompt = `Generate campaign ideas for industry: ${industry}, goal: ${goal}, budget: ${budget}. campaign`;
    const ideas  = await GraniteAI.generate(prompt);
    const ideaList = Array.isArray(ideas) ? ideas : GraniteAI._generateCampaign('campaign');

    btn.textContent = '✦ Generate Campaign Ideas';
    btn.classList.remove('loading');

    const output = document.getElementById('campaign-output');
    output.innerHTML = ideaList.map((idea, i) => `
      <div class="campaign-idea" style="border-left-color:${['#4f8ef7','#7c5cd8','#22c55e','#f59e0b','#e1306c'][i % 5]}">
        <div class="campaign-idea-title">
          ${idea.title}
          <span class="status-badge active" style="font-size:9px">${idea.budget}</span>
        </div>
        <div class="campaign-idea-body">${idea.body}</div>
        <div class="campaign-platforms">
          ${idea.platforms.map(p => `<span class="platform-tag ${p}">${{ig:'📷 Instagram',li:'in LinkedIn',x:'𝕏 Twitter',fb:'f Facebook'}[p]}</span>`).join('')}
        </div>
      </div>
    `).join('');

    showToast('✦ Campaign ideas generated with Granite AI');
  },

  /* ── Content Calendar ── */
  renderCalendar() {
    const el = document.getElementById('content-calendar');
    if (!el) return;

    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const today = new Date().getDate();
    const firstDay = 1;

    const events = {
      2:  ['ig post'],
      4:  ['li article'],
      6:  ['x thread'],
      9:  ['ig reel'],
      11: ['li carousel'],
      13: ['ig post','fb post'],
      15: ['x thread'],
      18: ['li post'],
      20: ['ig reel','x thread'],
      22: ['fb post'],
      25: ['ig post'],
      27: ['li article','x thread'],
    };

    let html = days.map(d => `<div class="cal-day-header">${d}</div>`).join('');

    // Padding for first day of month (starting Monday)
    const pad = 1; // minimal padding for demo
    for (let i = 0; i < pad; i++) html += '<div></div>';

    for (let d = 1; d <= 28; d++) {
      const evts = events[d] || [];
      const isToday = d === today ? ' today' : '';
      html += `<div class="cal-cell${isToday}">
        <div class="cal-num">${d}</div>
        ${evts.map(e => `<div class="cal-event">${e}</div>`).join('')}
      </div>`;
    }

    el.innerHTML = html;
  },

  /* ── Schedule Table ── */
  renderSchedule() {
    const el = document.getElementById('schedule-table');
    if (!el) return;

    const rows = MOCK_DATA.schedule.map(s => `
      <tr>
        <td><strong>${s.platform}</strong></td>
        <td>${s.day}</td>
        <td>${s.time}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="progress-bar" style="width:80px">
              <div class="progress-fill" style="width:${s.score}%;background:${s.score >= 90 ? '#22c55e' : s.score >= 80 ? '#4f8ef7' : '#f59e0b'}"></div>
            </div>
            <span style="font-size:11px;color:${s.score >= 90 ? 'var(--green)' : 'var(--text-2)'}">${s.score}</span>
          </div>
        </td>
        <td style="color:var(--text-3);font-size:12px">${s.reason}</td>
      </tr>`).join('');

    el.innerHTML = `<table>
      <thead><tr><th>Platform</th><th>Day</th><th>Best Time</th><th>Score</th><th>Why</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  },

  /* ── Active Campaigns ── */
  renderActiveCampaigns() {
    const el = document.getElementById('campaigns-list');
    if (!el) return;

    el.innerHTML = MOCK_DATA.campaigns.map(c => `
      <div class="campaign-row">
        <div class="campaign-row-icon" style="background:${hexAlpha(c.color, 0.15)}">${c.icon}</div>
        <div class="campaign-row-info">
          <div class="campaign-row-name">${c.name}</div>
          <div class="campaign-row-meta">
            ${c.platforms.map(p => `<span class="platform-tag ${p}">${{ig:'📷',li:'in',x:'𝕏',fb:'f'}[p]}</span>`).join(' ')}
            &nbsp;•&nbsp; ${c.days}
          </div>
        </div>
        <div class="campaign-row-stats">
          <div class="crs"><div class="crs-v">${c.reach}</div><div class="crs-l">Reach</div></div>
          <div class="crs"><div class="crs-v">${c.engagement}</div><div class="crs-l">Eng.</div></div>
          <div class="crs"><div class="crs-v">${c.budget}</div><div class="crs-l">Budget</div></div>
        </div>
        <span class="status-badge ${c.status}">${c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span>
      </div>`).join('');
  },

  /* ── AI Insights Grid ── */
  renderInsightsGrid() {
    const el = document.getElementById('insights-grid');
    if (!el) return;

    el.innerHTML = MOCK_DATA.aiInsights.map(ins => `
      <div class="insight-card ${ins.kind}">
        <div class="insight-type">◈ ${ins.type}</div>
        <div class="insight-title">${ins.title}</div>
        <div class="insight-body">${ins.body}</div>
      </div>`).join('');
  },

  /* ── Competitor Table ── */
  renderCompetitors() {
    const el = document.getElementById('comp-table');
    if (!el) return;

    const rows = MOCK_DATA.competitors.map((c, i) => `
      <tr>
        <td>
          <div class="comp-name">
            <div class="comp-avatar" style="background:${c.color}">${c.avatar}</div>
            ${c.name}${i === 0 ? ' <span class="badge-ai" style="font-size:9px">You</span>' : ''}
          </div>
        </td>
        <td>${c.followers}</td>
        <td>
          <div class="bar-cell">
            <div class="bar-bg" style="width:90px">
              <div class="bar-fill" style="width:${c.engBar}%;background:${c.color}"></div>
            </div>
            ${c.engRate}
          </div>
        </td>
        <td>${c.posts}</td>
        <td>
          <div class="bar-cell">
            <span style="font-size:13px;font-weight:600;color:${c.sentiment >= 70 ? 'var(--green)' : c.sentiment >= 55 ? 'var(--yellow)' : 'var(--red)'}">${c.sentiment}</span>
            <span style="color:var(--text-3);font-size:11px">/100</span>
          </div>
        </td>
        <td>
          <div class="bar-cell">
            <div class="bar-bg" style="width:80px">
              <div class="bar-fill" style="width:${c.growthBar}%;background:${c.color}"></div>
            </div>
            ${c.sov}%
          </div>
        </td>
      </tr>`).join('');

    el.innerHTML = `<table>
      <thead><tr>
        <th>Brand</th><th>Followers</th><th>Eng. Rate</th><th>Posts/Mo</th><th>Sentiment</th><th>Share of Voice</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  },

  /* ── Intelligence Cards ── */
  renderIntelligence() {
    const el = document.getElementById('intelligence-grid');
    if (!el) return;

    el.innerHTML = MOCK_DATA.intelligence.map(item => `
      <div class="intel-card">
        <div class="intel-title">◆ ${item.title}</div>
        <div class="intel-body">${item.body}</div>
      </div>`).join('');
  },

  /* ── Analytics KPIs ── */
  renderAnalyticsKpis() {
    const analyticsStats = [
      { label: 'Avg Weekly Reach',    formatted: '272K',  delta: '+14.2%', dir: 'up',   icon: '📡', color: 'all' },
      { label: 'Avg Impressions/Wk',  formatted: '573K',  delta: '+11.8%', dir: 'up',   icon: '👁',  color: 'all' },
      { label: 'Link Clicks (30d)',   formatted: '18.4K', delta: '+22.6%', dir: 'up',   icon: '🔗', color: 'all' },
      { label: 'Saves & Bookmarks',   formatted: '9.2K',  delta: '+38.1%', dir: 'up',   icon: '🔖', color: 'all' },
    ];

    const el = document.getElementById('analytics-kpi');
    if (!el) return;

    el.innerHTML = analyticsStats.map(k => `
      <div class="kpi-card ${k.color}">
        <div class="kpi-icon">${k.icon}</div>
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-value">${k.formatted}</div>
        <div class="kpi-delta up">▲ ${k.delta} this month</div>
      </div>`).join('');
  },
};
