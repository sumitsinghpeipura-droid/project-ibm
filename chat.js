/* ════════════════════════════════════
   AI CHAT ASSISTANT — Granite Powered
════════════════════════════════════ */

const Chat = {
  isOpen: false,
  history: [],

  suggestions: [
    'What are my best performing posts?',
    'Predict engagement for next week',
    'Best time to post on LinkedIn?',
    'Analyze my competitor landscape',
    'Generate a campaign idea',
    'Why is my Instagram engagement dropping?',
    'What hashtags should I use?',
    'How can I grow my X followers?',
  ],

  init() {
    document.getElementById('btn-chat-toggle').addEventListener('click', () => Chat.open());
    document.getElementById('chat-close').addEventListener('click', () => Chat.close());
    document.getElementById('chat-overlay').addEventListener('click', () => Chat.close());
    document.getElementById('chat-send').addEventListener('click', () => Chat.send());
    document.getElementById('chat-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); Chat.send(); }
    });

    Chat.renderSuggestions();
    Chat.addMessage('assistant', Chat._welcomeMessage());
  },

  open() {
    Chat.isOpen = true;
    document.getElementById('chat-panel').classList.add('open');
    document.getElementById('chat-overlay').classList.add('visible');
    document.getElementById('chat-input').focus();
  },

  close() {
    Chat.isOpen = false;
    document.getElementById('chat-panel').classList.remove('open');
    document.getElementById('chat-overlay').classList.remove('visible');
  },

  async send() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    Chat.addMessage('user', text);
    Chat.history.push({ role: 'user', content: text });

    // Show typing indicator
    Chat.showTyping();

    try {
      const prompt = Chat._buildPrompt(text);
      const response = await GraniteAI.generate(prompt, { temperature: 0.75, maxTokens: 350 });
      Chat.removeTyping();
      Chat.addMessage('assistant', response);
      Chat.history.push({ role: 'assistant', content: response });
      Chat.renderSuggestions(text);
    } catch (err) {
      Chat.removeTyping();
      Chat.addMessage('assistant', 'I encountered an issue processing your request. Please try again.');
    }
  },

  _buildPrompt(userMsg) {
    // Context injection for demo — would be replaced with real system prompt for live Granite
    return `You are an expert IBM Granite-powered social media AI agent analyzing data for a brand with the following stats:
- 284,750 total followers across 𝕏, LinkedIn, Instagram, Facebook
- 6.8% average engagement rate (above industry average)
- Sentiment score: 78/100 (mostly positive)
- Top platform: Instagram (9.1% engagement), LinkedIn (8.6%)
- Current campaigns: Summer AI Launch, IBM Granite Showcase
User question: ${userMsg}`;
  },

  addMessage(role, text) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `msg ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = role === 'assistant' ? '◈' : 'U';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    // Format bold text and newlines
    bubble.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    div.appendChild(avatar);
    div.appendChild(bubble);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  },

  showTyping() {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'msg msg-typing';
    div.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = '◈';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    div.appendChild(avatar);
    div.appendChild(bubble);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  },

  removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  },

  renderSuggestions(lastMsg = '') {
    const container = document.getElementById('chat-suggestions');
    if (!container) return;

    // Contextual suggestions based on last message
    let suggestions = Chat.suggestions;
    if (lastMsg.toLowerCase().includes('instagram')) {
      suggestions = ['How to improve Instagram Reels?', 'Best Instagram posting time?', 'Instagram hashtag strategy', 'Compare Instagram vs LinkedIn'];
    } else if (lastMsg.toLowerCase().includes('linkedin')) {
      suggestions = ['LinkedIn carousel tips', 'Best LinkedIn post length?', 'LinkedIn B2B strategy', 'LinkedIn newsletter ideas'];
    } else if (lastMsg.toLowerCase().includes('campaign')) {
      suggestions = ['Show campaign metrics', 'Generate Instagram campaign', 'LinkedIn campaign ideas', 'Campaign budget allocation'];
    }

    container.innerHTML = suggestions.slice(0, 4).map(s => `
      <button class="suggestion-chip" onclick="Chat.sendSuggestion('${s.replace(/'/g, '&#39;')}')">${s}</button>
    `).join('');
  },

  sendSuggestion(text) {
    document.getElementById('chat-input').value = text;
    Chat.send();
  },

  _welcomeMessage() {
    return `Hello! I'm your **IBM Granite AI** Social Media Agent.\n\nI can help you with:\n• Trend analysis & 7-day predictions\n• Content strategy & caption generation\n• Competitor analysis & benchmarking\n• Hashtag & posting time optimization\n• Campaign ideation & planning\n• Sentiment analysis across platforms\n\nYour brand currently has **284.7K followers** with a **6.8% engagement rate** — above industry average! What would you like to explore?`;
  },
};
