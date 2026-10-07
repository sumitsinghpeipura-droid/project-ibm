/* ════════════════════════════════════════════════════════
   APP.JS — Main Controller
   IBM Social Media Agent
════════════════════════════════════════════════════════ */

const App = {
  currentView: 'dashboard',
  charts: {},

  init() {
    App.setupNav();
    App.setupPlatformFilter();
    App.setupHamburger();
    App.setupRefresh();
    Chat.init();
    ContentStudio.init();
    App.renderView('dashboard');
    App.startLiveTicker();
  },

  /* ── Navigation ── */
  setupNav() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        App.switchView(view);

        // Close sidebar on mobile
        if (window.innerWidth < 820) {
          document.getElementById('sidebar').classList.remove('open');
        }
      });
    });
  },

  switchView(view) {
    if (App.currentView === view) return;

    // Update nav
    document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));

    // Update sections
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `view-${view}`));

    // Update title
    const titles = {
      dashboard:   'Dashboard Overview',
      analytics:   'Analytics',
      'ai-insights':'AI Insights',
      content:     'Content Studio',
      competitors: 'Competitor Analysis',
      campaigns:   'Campaign Manager',
    };
    document.getElementById('topbar-title').textContent = titles[view] || view;

    App.currentView = view;
    App.renderView(view);
  },

  renderView(view) {
    if (view === 'dashboard') {
      renderKpiGrid('kpi-grid', window.activePlatform);
      initChartsForView('dashboard');
    } else if (view === 'analytics') {
      ContentStudio.renderAnalyticsKpis();
      initChartsForView('analytics');
    } else if (view === 'ai-insights') {
      ContentStudio.renderInsightsGrid();
      initChartsForView('ai-insights');
    } else if (view === 'competitors') {
      ContentStudio.renderCompetitors();
      ContentStudio.renderIntelligence();
      initChartsForView('competitors');
    } else if (view === 'campaigns') {
      ContentStudio.renderActiveCampaigns();
    } else if (view === 'content') {
      ContentStudio.renderCalendar();
      ContentStudio.renderSchedule();
    }
  },

  /* ── Platform Filter ── */
  setupPlatformFilter() {
    document.querySelectorAll('.pill[data-platform]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.activePlatform = btn.dataset.platform;

        if (App.currentView === 'dashboard') {
          renderKpiGrid('kpi-grid', window.activePlatform);
          initEngagementChart(window.activePlatform);
          initSentimentChart(window.activePlatform);
        }
      });
    });
  },

  /* ── Hamburger ── */
  setupHamburger() {
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });
  },

  /* ── Refresh Button ── */
  setupRefresh() {
    document.getElementById('btn-refresh').addEventListener('click', () => {
      const btn = document.getElementById('btn-refresh');
      btn.style.pointerEvents = 'none';
      btn.textContent = '⏳';
      showToast('↻ Refreshing data from IBM Cloud…');

      setTimeout(() => {
        // Slightly randomise engagement data to simulate live refresh
        MOCK_DATA.engagement.datasets.all = MOCK_DATA.engagement.datasets.all.map(v => v + Math.round((Math.random() - 0.3) * 4));
        App.renderView(App.currentView);
        btn.style.pointerEvents = '';
        btn.textContent = '↻';
        showToast('✓ Data refreshed');
      }, 1400);
    });
  },

  /* ── Live Ticker (simulates real-time data) ── */
  startLiveTicker() {
    setInterval(() => {
      // Randomly bump a KPI to simulate live updates
      const kpis = document.querySelectorAll('.kpi-value');
      if (!kpis.length) return;
      const el = kpis[Math.floor(Math.random() * kpis.length)];
      el.style.color = 'var(--green)';
      setTimeout(() => el.style.color = '', 800);
    }, 6000);
  },
};

/* ── Bootstrap on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
