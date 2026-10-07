/* ════════════════════════════════════════════════════════════
   IBM GRANITE AI ENGINE
   Mock AI inference layer — ready for watsonx.ai integration

   To connect to live IBM Granite:
   1. Get API key from cloud.ibm.com/iam
   2. Create a watsonx.ai project and note your project_id
   3. Replace the simulateGranite() body with a real fetch to:
      https://us-south.ml.cloud.ibm.com/ml/v1/text/generation
   4. Pass your IAM token in the Authorization header
════════════════════════════════════════════════════════════ */

const GraniteAI = {

  /* ── Simulated Granite inference ── */
  async generate(prompt, options = {}) {
    /* === LIVE INTEGRATION POINT ===
    const response = await fetch('https://us-south.ml.cloud.ibm.com/ml/v1/text/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${IBM_IAM_TOKEN}`,
      },
      body: JSON.stringify({
        model_id: 'ibm/granite-3-3-8b-instruct',
        input: prompt,
        parameters: {
          max_new_tokens: options.maxTokens || 400,
          temperature: options.temperature || 0.7,
          top_p: 0.9,
          repetition_penalty: 1.1,
        },
        project_id: IBM_PROJECT_ID,
      }),
    });
    const data = await response.json();
    return data.results[0].generated_text;
    ================================ */

    // DEMO: Return mock responses based on prompt context
    await aiDelay(900, 1800);
    return GraniteAI._mockResponse(prompt, options);
  },

  _mockResponse(prompt, options = {}) {
    const p = prompt.toLowerCase();

    // Caption generation
    if (p.includes('caption') || p.includes('post for') || p.includes('write a')) {
      return GraniteAI._generateCaption(prompt, options);
    }
    // Hashtags
    if (p.includes('hashtag')) {
      return GraniteAI._generateHashtags(prompt, options);
    }
    // Campaign ideas
    if (p.includes('campaign')) {
      return GraniteAI._generateCampaign(prompt, options);
    }
    // Sentiment analysis
    if (p.includes('sentiment') || p.includes('feeling') || p.includes('emotion')) {
      return GraniteAI._analyzeSentiment(prompt);
    }
    // Trends
    if (p.includes('trend') || p.includes('predict')) {
      return GraniteAI._predictTrends(prompt);
    }
    // Competitors
    if (p.includes('competitor') || p.includes('competition') || p.includes('rival')) {
      return GraniteAI._competitorInsight(prompt);
    }
    // Best time
    if (p.includes('time') || p.includes('post when') || p.includes('schedule')) {
      return GraniteAI._postingTime(prompt);
    }
    // Strategy
    if (p.includes('strategy') || p.includes('grow') || p.includes('improve')) {
      return GraniteAI._strategyAdvice(prompt);
    }

    return GraniteAI._generalResponse(prompt);
  },

  _generateCaption(prompt, opts = {}) {
    const tones = {
      professional: [
        'Empowering enterprises with the next frontier of AI-driven intelligence. Our platform doesn\'t just adapt to your needs — it anticipates them. Discover what\'s possible when innovation meets purpose.',
        'Precision meets performance. We\'re redefining what it means to work smarter in a data-first world. The future of enterprise AI is here, and it\'s built for teams like yours.',
      ],
      casual: [
        'Okay, we\'re kind of obsessed with what we just built 🙈 Drop a 🔥 if you want to see it in action!',
        'Plot twist: AI doesn\'t have to be complicated. We made it ridiculously simple. Come take a look 👀✨',
      ],
      inspiring: [
        'Every great innovation starts with a single decision: to do things differently. Today, we\'re sharing the story behind ours. What will your story be?',
        'The most powerful tools don\'t just change what you do — they change how you think. We built this for the bold, the curious, and the relentlessly ambitious.',
      ],
      humorous: [
        'Our AI is so smart it already knows you\'re going to like this post 😂 (It\'s not wrong though.) Come see what the fuss is about!',
        'Breaking: local AI product disrupts industry, also helps you find your keys (probably) 🔑🤖 Learn more below 👇',
      ],
      urgent: [
        '⚡ Last chance to transform your social strategy before your competitors do. This is the edge you\'ve been waiting for. Act now — the window is closing.',
        '🚨 The brands winning online in 2025 all have one thing in common. Don\'t be the one still figuring it out in Q4.',
      ],
    };

    // Extract tone from prompt
    const toneLower = prompt.toLowerCase();
    let toneKey = 'professional';
    for (const t of Object.keys(tones)) {
      if (toneLower.includes(t)) { toneKey = t; break; }
    }
    const arr = tones[toneKey];
    return arr[Math.floor(Math.random() * arr.length)];
  },

  _generateHashtags(prompt) {
    const banks = [
      ['#AIMarketing','#ContentStrategy','#SocialMediaTips','#BrandGrowth','#DigitalMarketing','#GrowthHacking','#MarketingAI','#SocialFirst'],
      ['#IBMGranite','#WatsonX','#IBMCloud','#EnterpriseAI','#AIForBusiness','#TechInnovation','#CloudAI','#GraniteAI'],
      ['#Trending2025','#FutureOfWork','#DigitalTransformation','#AIRevolution','#TechTrends','#Innovation','#SmartBusiness'],
      ['#Entrepreneurship','#StartupLife','#BusinessGrowth','#Marketing101','#B2BMarketing','#LeadGeneration','#ContentMarketing'],
    ];
    const set = new Set();
    while (set.size < 10) {
      const bank = banks[Math.floor(Math.random() * banks.length)];
      set.add(bank[Math.floor(Math.random() * bank.length)]);
    }
    return [...set].join(' ');
  },

  _generateCampaign(prompt) {
    const ideas = [
      {
        title: '🎯 "AI Unleashed" Thought Leadership Series',
        body: 'A 4-week multi-platform series where you post one AI insight per day across LinkedIn and X. Each post ends with a question to drive comments. Week 4 culminates in a live LinkedIn Audio event. Pair with #IBMGranite and #AIMarketing.',
        platforms: ['li', 'x'],
        budget: 'Low',
      },
      {
        title: '🚀 Product Launch Countdown Campaign',
        body: '7-day countdown on Instagram Stories with sneak-peek visuals, a "Guess the Feature" poll, and a 24-hour live Q&A on launch day. Repurpose highlights as Facebook Reels. Target: 50K reach, 8% engagement.',
        platforms: ['ig', 'fb'],
        budget: 'Medium',
      },
      {
        title: '🤝 "Built With You" UGC Campaign',
        body: 'Invite your community to share how they use your product with a branded hashtag. Feature top submissions weekly. Offer a $200 gift card for the best post each month. Builds social proof and fills your content calendar automatically.',
        platforms: ['ig', 'x', 'fb'],
        budget: 'Low',
      },
      {
        title: '🏆 Competitor Conquest: "Why Switch" Campaign',
        body: 'Create a 3-part LinkedIn carousel series comparing your platform to market alternatives (without naming names). Focus on capability gaps, ROI stats, and migration ease. Use retargeting ads to reach visitors who viewed competitor pages.',
        platforms: ['li'],
        budget: 'Medium',
      },
      {
        title: '📊 "Data Doesn\'t Lie" Performance Campaign',
        body: 'Share real customer results as infographic carousels every Tuesday. Back each post with a detailed case study linked in bio. Use IBM Granite to auto-generate weekly performance summaries for consistent publishing.',
        platforms: ['li', 'ig'],
        budget: 'Low',
      },
    ];
    return ideas;
  },

  _analyzeSentiment(prompt) {
    const score = Math.round(55 + Math.random() * 35);
    const label = score > 70 ? 'Positive' : score > 50 ? 'Neutral' : 'Negative';
    return `**Sentiment Analysis Result**\n\nSentiment: **${label}** (${score}/100)\n\nGranite AI detected predominantly ${label.toLowerCase()} signals in your brand mentions over the past 7 days. Key positive drivers include product quality mentions (+34%) and customer success stories (+28%). Watch for slight negativity around response time — 12% of negative mentions cite slow support replies.`;
  },

  _predictTrends(prompt) {
    return `**7-Day Trend Forecast**\n\nIBM Granite predicts your combined engagement will grow ~${Math.round(8 + Math.random() * 12)}% over the next week, driven by:\n\n• The #AIMarketing topic cycle is approaching its weekly peak (expected Wednesday–Thursday)\n• Your Tuesday LinkedIn post historically outperforms by 2.4×\n• Instagram Reel algorithm is favouring short educational content right now — post 1 this week\n\n**Recommended action:** Schedule 2 LinkedIn posts for Tuesday 9am and Thursday 8:30am, plus 1 Instagram Reel for Friday 6pm.`;
  },

  _competitorInsight(prompt) {
    return `**Competitive Intelligence Update**\n\nMediaPro continues to lead in raw follower count but your engagement quality significantly outpaces them (6.8% vs 4.1%). Key observations:\n\n• **BrandAlpha** is experimenting with LinkedIn newsletters — early traction shows 3.2K subscribers in 6 weeks\n• **CompeteX** reduced posting frequency by 20% — an opportunity window to capture their disengaged audience\n• **Your edge:** Authentic behind-the-scenes content and direct responses are building a more loyal, commentative audience\n\n**Recommended action:** Launch a weekly LinkedIn newsletter to match BrandAlpha's momentum while CompeteX is slowing.`;
  },

  _postingTime(prompt) {
    const times = [
      'Based on your audience\'s behaviour patterns, **Tuesday 9:00–10:30 AM** is your highest-engagement window on LinkedIn. For Instagram, **Friday 6–8 PM** captures peak scrolling time. X performs best at **weekday lunchtimes (12–1 PM)**.',
      'Granite AI analysed 90 days of your engagement data. Your **top 3 posting windows**: ① LinkedIn: Wed 8–9 AM ② Instagram: Fri 5–7 PM ③ X: Tue & Thu 12–1 PM. Scheduling to these windows could lift weekly reach by ~22%.',
    ];
    return times[Math.floor(Math.random() * times.length)];
  },

  _strategyAdvice(prompt) {
    const tips = [
      'Your fastest growth lever right now is **LinkedIn carousel posts**. Your last 3 carousels averaged 3.1× more saves and 2.4× more comments than single-image posts. Aim for 2 carousels per week on LinkedIn.',
      'To grow your Instagram engagement, **increase Reel output to 3 per week**. Reels currently account for 78% of new follower acquisition on Instagram — yet you\'re only posting 1–2 per week.',
      'Your brand\'s **comment-to-like ratio (1:14) is exceptional** — much better than industry average (1:30+). This signals a highly engaged community. Capitalise by asking more questions in your captions to deepen that engagement further.',
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  },

  _generalResponse(prompt) {
    const responses = [
      'Based on your social media performance data, I can see several strong opportunities ahead. Your overall engagement rate of 6.8% is above industry average (2–3%), which is a great foundation to build on. Would you like me to dive deeper into any specific platform or metric?',
      'Great question! Your IBM Granite-powered social dashboard shows impressive momentum. Your Instagram and LinkedIn channels are your strongest performers. For maximum impact, I\'d recommend focusing your next campaign on LinkedIn thought leadership content combined with Instagram visual storytelling.',
      'Looking at your 30-day data, your audience is most responsive to educational content and behind-the-scenes posts. Your post timing is solid on LinkedIn but there\'s untapped potential on Instagram and X. Want me to generate a weekly content plan based on your best-performing formats?',
      'Your brand sentiment score of 78/100 puts you well above the industry median of 61. The main driver is your consistent professional tone and quick response to comments. To push beyond 85, consider proactively asking for feedback from your happiest customers and sharing their success stories.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  },

  /* ── Sentiment analysis for individual text ── */
  async analyseSentiment(text) {
    await aiDelay(400, 800);
    const words = text.toLowerCase();
    const posWords = ['great','amazing','love','excellent','fantastic','good','best','awesome','brilliant','outstanding'];
    const negWords = ['bad','poor','terrible','awful','hate','worst','disappointing','frustrating','useless'];
    let score = 50;
    posWords.forEach(w => { if (words.includes(w)) score += 8; });
    negWords.forEach(w => { if (words.includes(w)) score -= 10; });
    score = Math.max(0, Math.min(100, score));
    return {
      score,
      label: score > 65 ? 'positive' : score > 40 ? 'neutral' : 'negative',
      confidence: Math.round(72 + Math.random() * 22),
    };
  },
};
