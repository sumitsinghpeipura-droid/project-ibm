/* ════════════════════════════════════════
   MOCK SOCIAL MEDIA DATA
   IBM Social Media Agent — Demo Dataset
════════════════════════════════════════ */

const MOCK_DATA = {

  /* ── KPIs ── */
  kpis: {
    all: [
      { label: 'Total Followers',    value: 284750, formatted: '284.7K', delta: '+4.2%', dir: 'up',  icon: '👥', color: 'all' },
      { label: 'Avg Engagement',     value: 6.8,    formatted: '6.8%',   delta: '+1.1%', dir: 'up',  icon: '💬', color: 'all' },
      { label: 'Total Impressions',  value: 1240000,formatted: '1.24M',  delta: '+12.3%',dir: 'up',  icon: '👁', color: 'all' },
      { label: 'Sentiment Score',    value: 78,     formatted: '78/100', delta: '+3 pts', dir: 'up', icon: '✦', color: 'all' },
    ],
    x: [
      { label: 'Followers',      value: 82400,  formatted: '82.4K',  delta: '+3.1%', dir: 'up',  icon: '𝕏', color: 'x' },
      { label: 'Engagement',     value: 4.2,    formatted: '4.2%',   delta: '-0.3%', dir: 'down',icon: '💬',color: 'x' },
      { label: 'Impressions',    value: 390000, formatted: '390K',   delta: '+8.4%', dir: 'up',  icon: '👁', color: 'x' },
      { label: 'Retweets',       value: 3210,   formatted: '3.2K',   delta: '+12%',  dir: 'up',  icon: '↺', color: 'x' },
    ],
    linkedin: [
      { label: 'Connections',    value: 54200,  formatted: '54.2K',  delta: '+5.8%', dir: 'up',  icon: 'in', color: 'li' },
      { label: 'Engagement',     value: 8.6,    formatted: '8.6%',   delta: '+2.1%', dir: 'up',  icon: '💼',color: 'li' },
      { label: 'Impressions',    value: 310000, formatted: '310K',   delta: '+15%',  dir: 'up',  icon: '👁', color: 'li' },
      { label: 'Profile Views',  value: 12800,  formatted: '12.8K',  delta: '+9%',   dir: 'up',  icon: '🔍',color: 'li' },
    ],
    instagram: [
      { label: 'Followers',      value: 98200,  formatted: '98.2K',  delta: '+6.7%', dir: 'up',  icon: '📷', color: 'ig' },
      { label: 'Engagement',     value: 9.1,    formatted: '9.1%',   delta: '+1.8%', dir: 'up',  icon: '❤️', color: 'ig' },
      { label: 'Reach',          value: 380000, formatted: '380K',   delta: '+18%',  dir: 'up',  icon: '📡', color: 'ig' },
      { label: 'Story Views',    value: 24300,  formatted: '24.3K',  delta: '+22%',  dir: 'up',  icon: '⭕', color: 'ig' },
    ],
    facebook: [
      { label: 'Page Likes',     value: 49950,  formatted: '49.9K',  delta: '+1.2%', dir: 'up',  icon: 'f', color: 'fb' },
      { label: 'Engagement',     value: 3.8,    formatted: '3.8%',   delta: '-0.5%', dir: 'down',icon: '👍',color: 'fb' },
      { label: 'Impressions',    value: 160000, formatted: '160K',   delta: '+4%',   dir: 'up',  icon: '👁', color: 'fb' },
      { label: 'Shares',         value: 1840,   formatted: '1.84K',  delta: '+7%',   dir: 'up',  icon: '↗', color: 'fb' },
    ],
  },

  /* ── ENGAGEMENT TIME SERIES (30 days) ── */
  engagement: {
    labels: Array.from({length: 30}, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - 29 + i);
      return d.toLocaleDateString('en', {month:'short', day:'numeric'});
    }),
    datasets: {
      all:       [42,48,45,52,58,55,63,67,71,68,74,79,76,83,88,92,86,91,95,98,103,108,105,112,118,115,121,126,130,135],
      x:         [18,21,19,23,25,22,27,29,31,28,33,35,32,38,41,44,40,43,46,48,52,55,51,57,60,58,64,67,70,73],
      linkedin:  [8,10,9,11,13,12,14,16,17,15,18,20,19,21,23,25,22,24,26,28,30,32,29,34,36,34,38,40,42,44],
      instagram: [12,14,13,15,17,16,18,19,20,21,19,22,23,21,22,20,21,22,21,19,18,18,22,18,19,20,16,17,14,15],
      facebook:  [4,3,4,3,3,5,4,3,3,4,4,2,2,3,2,3,3,2,2,3,1,3,3,3,3,3,3,2,4,3],
    },
  },

  /* ── PLATFORM BREAKDOWN ── */
  platformBreakdown: {
    labels: ['𝕏 Twitter', 'LinkedIn', 'Instagram', 'Facebook'],
    followers: [82400, 54200, 98200, 49950],
    engagement: [4.2, 8.6, 9.1, 3.8],
    colors: ['#e7e9ea', '#0a66c2', '#e1306c', '#1877f2'],
  },

  /* ── SENTIMENT ── */
  sentiment: {
    overall: { positive: 58, neutral: 28, negative: 14 },
    byPlatform: {
      x:         { positive: 52, neutral: 30, negative: 18 },
      linkedin:  { positive: 71, neutral: 22, negative:  7 },
      instagram: { positive: 64, neutral: 26, negative: 10 },
      facebook:  { positive: 49, neutral: 34, negative: 17 },
    },
  },

  /* ── POSTING HEATMAP (day × hour) ── */
  heatmap: {
    days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    data: [
      [2,1,1,1,1,2,3,5,7,8,9,8,9,8,7,9,10,9,8,6,5,3,2,1],
      [1,1,1,1,2,3,4,6,8,9,10,9,8,9,8,9,10,8,7,5,4,3,2,1],
      [2,1,1,1,2,3,4,6,9,10,10,9,8,10,9,9,10,9,7,5,4,3,2,1],
      [1,1,1,1,2,3,5,6,8,9,10,9,9,8,9,10,9,8,7,5,4,2,2,1],
      [2,1,1,1,2,3,4,6,8,8, 9,8,8,8,7,9, 9,8,7,6,5,4,3,2],
      [1,1,2,2,3,5,7,8,7,7, 6,7,8,7,6,6, 5,5,6,7,6,5,4,3],
      [1,1,2,3,4,6,7,7,6,6, 5,6,7,6,5,5, 5,4,5,6,5,4,3,2],
    ],
  },

  /* ── TOP POSTS ── */
  topPosts: [
    { platform:'ig', content:'🚀 Excited to announce our AI-powered product is live!', likes:4820, shares:892,  comments:341, sentiment:'positive', reach:'48.2K', date:'2 days ago' },
    { platform:'li', content:'How IBM Granite is revolutionising enterprise AI workflows', likes:3210, shares:641,  comments:218, sentiment:'positive', reach:'32.1K', date:'4 days ago' },
    { platform:'x',  content:'Thread: 5 ways AI agents are changing social media marketing ↓', likes:2890, shares:1204, comments:187, sentiment:'positive', reach:'88.4K', date:'5 days ago' },
    { platform:'fb', content:'Behind the scenes: building our most ambitious campaign yet!', likes:1840, shares:320,  comments:156, sentiment:'positive', reach:'18.4K', date:'1 week ago' },
    { platform:'ig', content:'The results are in 📊 Our Q3 numbers speak for themselves', likes:1620, shares:210,  comments:130, sentiment:'neutral',  reach:'16.2K', date:'1 week ago' },
    { platform:'li', content:'Proud to share that our team won the IBM Innovation Award 2025', likes:2400, shares:480,  comments:192, sentiment:'positive', reach:'24K',   date:'2 weeks ago' },
  ],

  /* ── HASHTAGS ── */
  hashtags: [
    { tag:'#AIMarketing',   uses:'2.4M', trend: '▲ 34%', score: 94 },
    { tag:'#IBMGranite',    uses:'890K', trend: '▲ 128%',score: 98 },
    { tag:'#SocialAI',      uses:'1.8M', trend: '▲ 22%', score: 91 },
    { tag:'#DigitalFirst',  uses:'3.2M', trend: '▲ 8%',  score: 86 },
    { tag:'#ContentAI',     uses:'1.1M', trend: '▲ 45%', score: 93 },
    { tag:'#BrandGrowth',   uses:'4.5M', trend: '▲ 11%', score: 82 },
    { tag:'#TechTrends',    uses:'6.8M', trend: '▲ 5%',  score: 78 },
    { tag:'#IBMCloud',      uses:'720K', trend: '▲ 62%', score: 97 },
    { tag:'#Automation',    uses:'9.1M', trend: '▲ 3%',  score: 74 },
    { tag:'#GraniteAI',     uses:'420K', trend: '▲ 210%',score: 99 },
    { tag:'#Watsonx',       uses:'540K', trend: '▲ 88%', score: 96 },
    { tag:'#FutureOfWork',  uses:'5.4M', trend: '▲ 18%', score: 85 },
  ],

  /* ── REACH & IMPRESSIONS (weekly, 12 weeks) ── */
  reachImpressions: {
    labels: ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'],
    reach:       [180000,192000,205000,198000,212000,228000,240000,235000,252000,268000,275000,290000],
    impressions: [390000,410000,435000,420000,450000,480000,505000,498000,530000,560000,578000,605000],
  },

  /* ── FOLLOWER GROWTH ── */
  followerGrowth: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    x:         [68000,69200,70100,71500,72800,74200,75900,77200,78800,80100,81500,82400],
    linkedin:  [44000,45100,46300,47800,48900,50200,51400,52100,52900,53400,53800,54200],
    instagram: [72000,74800,77200,80100,83500,86200,88900,91400,93600,95200,97100,98200],
    facebook:  [47200,47600,47900,48200,48500,48800,49100,49300,49500,49650,49800,49950],
  },

  /* ── COMPETITORS ── */
  competitors: [
    { name: 'Your Brand',   avatar: 'YB', color: '#4f8ef7', followers: '284.7K', engRate: '6.8%', posts: 142, sentiment: 78, sov: 28, engBar: 68, growthBar: 72 },
    { name: 'CompeteX',     avatar: 'CX', color: '#ef4444', followers: '320.2K', engRate: '5.2%', posts: 189, sentiment: 62, sov: 22, engBar: 52, growthBar: 44 },
    { name: 'BrandAlpha',   avatar: 'BA', color: '#f59e0b', followers: '198.4K', engRate: '7.9%', posts: 98,  sentiment: 71, sov: 16, engBar: 79, growthBar: 60 },
    { name: 'MediaPro',     avatar: 'MP', color: '#22c55e', followers: '412.8K', engRate: '4.1%', posts: 234, sentiment: 55, sov: 34, engBar: 41, growthBar: 32 },
  ],

  /* ── ACTIVE CAMPAIGNS ── */
  campaigns: [
    { name: 'Summer AI Launch 2025',  icon: '🚀', platforms: ['ig','li','x'], status: 'active',  reach: '284K',  engagement: '8.4%', budget: '$4,200', days: '12 days left', color: '#4f8ef7' },
    { name: 'IBM Granite Showcase',   icon: '◈',  platforms: ['li','x'],     status: 'active',  reach: '182K',  engagement: '11.2%',budget: '$2,800', days: '5 days left',  color: '#7c5cd8' },
    { name: 'Community Takeover',     icon: '🌐', platforms: ['ig','fb'],     status: 'paused',  reach: '96K',   engagement: '7.1%', budget: '$1,500', days: 'Paused',       color: '#f59e0b' },
    { name: 'Q4 Brand Awareness',     icon: '📣', platforms: ['x','fb','li'], status: 'draft',   reach: '—',     engagement: '—',    budget: '$8,000', days: 'Starts Nov 1', color: '#22c55e' },
  ],

  /* ── AI INSIGHTS ── */
  aiInsights: [
    { type: 'Trend Alert',       title: 'AI-Generated Content Rising Fast',           body: 'Topics around AI content tools have seen a 210% spike this week. Brands posting AI-behind-the-scenes content are outperforming by 3.4×.',      kind: '' },
    { type: 'Opportunity',       title: 'LinkedIn B2B Window: Tue–Thu 9–11am',        body: 'Your LinkedIn audience shows 42% higher engagement on Tuesday through Thursday mornings. Scheduling thought leadership posts in this window could add ~1,800 impressions/week.', kind: 'positive' },
    { type: 'Warning',           title: 'Instagram Engagement Slipping',              body: 'Instagram engagement dropped 8% over the past 2 weeks, likely due to reduced Reel output. Competitors posting 4+ Reels/week are maintaining stronger reach.',  kind: 'warning' },
    { type: 'Competitor Alert',  title: 'MediaPro Follower Surge (+22%)',             body: 'MediaPro gained 90K followers in 30 days using a giveaway + UGC strategy. Consider a community engagement campaign to counter their momentum.',   kind: 'alert' },
    { type: 'Content Insight',   title: 'Long-Form LinkedIn Posts Outperforming',     body: 'Posts with 1,200–1,800 characters on LinkedIn are achieving 61% more dwell time. Your last 5 posts averaged only 420 characters — significant room to improve.', kind: 'info' },
    { type: 'Hashtag Insight',   title: '#IBMGranite Trending Globally',              body: 'The #IBMGranite and #Watsonx hashtags are trending in tech circles with 128% and 88% growth. Incorporating these in your next 3 posts could yield 15–20K extra impressions.', kind: 'positive' },
  ],

  /* ── TOPICS ── */
  topics: [
    { label: 'AI & Machine Learning', score: 98, color: '#4f8ef7', size: 1.4 },
    { label: 'IBM Granite',           score: 96, color: '#7c5cd8', size: 1.5 },
    { label: 'Cloud Computing',       score: 88, color: '#2dd4bf', size: 1.2 },
    { label: 'Digital Marketing',     score: 84, color: '#f59e0b', size: 1.1 },
    { label: 'Automation',            score: 79, color: '#22c55e', size: 1.0 },
    { label: 'Data Analytics',        score: 76, color: '#e1306c', size: 0.95 },
    { label: 'Content Strategy',      score: 72, color: '#f97316', size: 0.9 },
    { label: 'Sustainability',         score: 65, color: '#06b6d4', size: 0.85 },
    { label: 'Brand Building',        score: 61, color: '#a78bfa', size: 0.8 },
  ],

  /* ── TREND PREDICTIONS (7-day forecast) ── */
  predictions: {
    labels: ['Today','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7'],
    actual:    [135, null, null, null, null, null, null],
    predicted: [135, 141, 148, 144, 152, 159, 165],
    lower:     [135, 136, 141, 137, 144, 150, 154],
    upper:     [135, 147, 156, 152, 161, 169, 177],
  },

  /* ── INTELLIGENCE CARDS ── */
  intelligence: [
    { title: 'Content Gap Opportunity',     body: 'Your competitors rarely post about watsonx platform tutorials. Creating 2–3 deep-dive pieces could capture ~35K impressions with low competition.' },
    { title: 'Posting Frequency Gap',       body: 'You post 4.7× per week on average; top competitor MediaPro posts 8.2×. Increasing cadence by 2 posts/week could close their impression lead by ~30%.' },
    { title: 'Engagement Quality Edge',     body: 'Despite fewer followers than MediaPro, your comment-to-like ratio (1:14) significantly beats theirs (1:42), indicating a more engaged, loyal audience.' },
    { title: 'Best Performing Format',      body: 'Carousel posts on LinkedIn and Instagram generate 2.8× more saves than single-image posts across all competitors tracked. Shift at least 40% of content to carousels.' },
  ],

  /* ── SCHEDULE RECOMMENDATIONS ── */
  schedule: [
    { platform: '𝕏 Twitter',  day: 'Tuesday',   time: '9:00 – 10:30 AM',  score: 94, reason: 'Peak tech professional activity' },
    { platform: 'LinkedIn',   day: 'Wednesday',  time: '8:00 – 9:30 AM',   score: 97, reason: 'Highest B2B engagement window' },
    { platform: 'Instagram',  day: 'Friday',     time: '6:00 – 8:00 PM',   score: 91, reason: 'End-of-week lifestyle browsing peak' },
    { platform: 'Facebook',   day: 'Saturday',   time: '11:00 AM – 1:00 PM',score: 85, reason: 'Weekend community browsing surge' },
    { platform: '𝕏 Twitter',  day: 'Thursday',   time: '12:00 – 1:00 PM',  score: 88, reason: 'Lunch-hour tech Twitter activity' },
    { platform: 'Instagram',  day: 'Wednesday',  time: '11:00 AM – 12:00 PM',score:89, reason: 'Mid-week visual discovery peak' },
  ],

};
