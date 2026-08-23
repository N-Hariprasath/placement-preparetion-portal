/* ApexHire AI - AI Mock Interview Module */

const InterviewModule = {
  currentDomain: 'frontend',
  questionIndex: 0,
  isRecording: false,
  speechSynth: window.speechSynthesis || null,
  recognition: null,
  transcriptHistory: [],

  render(container) {
    const questions = AppData.interviewScenarios[this.currentDomain];
    const currentQ = questions[this.questionIndex] || questions[0];

    container.innerHTML = `
      <div class="interview-layout">
        <!-- Main Interview Stage -->
        <div class="glass-panel" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
          <!-- Stage Top Controls -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <div>
              <span class="badge badge-indigo" id="domainBadge">Domain: ${this.currentDomain.toUpperCase()}</span>
              <span class="badge badge-cyan" style="margin-left: 8px;">Question ${this.questionIndex + 1} of ${questions.length}</span>
            </div>
            
            <div style="display: flex; gap: 10px;">
              <select id="domainSelect" class="form-control" style="padding: 6px 12px; font-size: 0.85rem;" onchange="InterviewModule.changeDomain(this.value)">
                <option value="frontend" ${this.currentDomain === 'frontend' ? 'selected' : ''}>Frontend Engineering</option>
                <option value="backend" ${this.currentDomain === 'backend' ? 'selected' : ''}>Backend Engineering</option>
                <option value="behavioral" ${this.currentDomain === 'behavioral' ? 'selected' : ''}>HR / Behavioral</option>
              </select>
              <button class="btn btn-sm btn-danger" onclick="InterviewModule.endSession()">End & Evaluate</button>
            </div>
          </div>

          <!-- AI Avatar & Speech Visualizer -->
          <div class="avatar-stage">
            <div class="ai-avatar-orb" id="aiOrb">
              <i class="fa-solid fa-robot"></i>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 6px;" id="aiSpeakerName">Apex AI Technical Interviewer</h3>
            <div id="aiQuestionText" style="font-size: 1.1rem; color: var(--secondary); max-width: 650px; line-height: 1.6; min-height: 50px;">
              "${currentQ}"
            </div>

            <!-- Waveform Animation -->
            <div class="waveform" id="waveformContainer">
              <div class="waveform-bar"></div>
              <div class="waveform-bar"></div>
              <div class="waveform-bar"></div>
              <div class="waveform-bar"></div>
              <div class="waveform-bar"></div>
            </div>
          </div>

          <!-- User Response Input Toolbar -->
          <div style="margin-top: 24px;">
            <div style="display: flex; gap: 12px; align-items: center;">
              <button id="micBtn" class="btn btn-secondary btn-icon" style="width: 50px; height: 50px; border-radius: 50%; font-size: 1.2rem;" onclick="InterviewModule.toggleMic()">
                <i class="fa-solid fa-microphone"></i>
              </button>
              
              <input type="text" id="userInputMsg" class="form-control" style="height: 50px; font-size: 0.95rem;" placeholder="Type your answer or speak into microphone..." onkeypress="if(event.key==='Enter') InterviewModule.sendResponse()">
              
              <button class="btn btn-primary btn-lg" onclick="InterviewModule.sendResponse()">
                <i class="fa-solid fa-paper-plane"></i> Send
              </button>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 8px; text-align: center;">
              💡 Tip: Speak clearly. Use the STAR method (Situation, Task, Action, Result) for structured answers.
            </div>
          </div>
        </div>

        <!-- Sidebar Conversation Log & Metrics -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="glass-panel" style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
            <h4 style="font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-comments"></i> Transcript & Real-Time Notes</h4>
            <div class="chat-history" id="chatHistory">
              <div class="chat-msg chat-msg-ai">
                Hello! I am your AI Technical Interviewer. I'll ask you a series of core technical and behavioral questions. Let's begin!
              </div>
              <div class="chat-msg chat-msg-ai">
                <strong>Question 1:</strong> ${currentQ}
              </div>
            </div>
          </div>

          <!-- Live Score Radar Widget -->
          <div class="glass-panel" style="padding: 20px;">
            <h4 style="font-size: 0.95rem; margin-bottom: 12px;"><i class="fa-solid fa-chart-line"></i> Speech Quality Indicators</h4>
            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>Confidence Metric</span>
                  <span style="color: var(--success); font-weight: 700;">88%</span>
                </div>
                <div style="height: 6px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                  <div style="width: 88%; height: 100%; background: var(--success);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>Technical Vocabulary</span>
                  <span style="color: var(--secondary); font-weight: 700;">92%</span>
                </div>
                <div style="height: 6px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                  <div style="width: 92%; height: 100%; background: var(--secondary);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.speakAI(currentQ);
    this.initSpeechRecognition();
  },

  changeDomain(domain) {
    this.currentDomain = domain;
    this.questionIndex = 0;
    this.render(document.getElementById('pageContent'));
  },

  speakAI(text) {
    if (!this.speechSynth) return;
    this.speechSynth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const orb = document.getElementById('aiOrb');
    const wave = document.getElementById('waveformContainer');

    utterance.onstart = () => {
      if (orb) orb.classList.add('speaking');
      if (wave) wave.classList.add('speaking');
    };

    utterance.onend = () => {
      if (orb) orb.classList.remove('speaking');
      if (wave) wave.classList.remove('speaking');
    };

    this.speechSynth.speak(utterance);
  },

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('userInputMsg');
        if (input) input.value = transcript;
        this.sendResponse();
      };

      this.recognition.onend = () => {
        this.isRecording = false;
        const btn = document.getElementById('micBtn');
        if (btn) btn.className = 'btn btn-secondary btn-icon';
      };
    }
  },

  toggleMic() {
    if (!this.recognition) {
      AppToast.show('Speech recognition is not supported in this browser. Please type your answer.', 'warning');
      return;
    }

    const btn = document.getElementById('micBtn');
    if (!this.isRecording) {
      this.recognition.start();
      this.isRecording = true;
      if (btn) btn.className = 'btn btn-danger btn-icon fa-beat';
      AppToast.show('Listening... Speak now.', 'info');
    } else {
      this.recognition.stop();
      this.isRecording = false;
      if (btn) btn.className = 'btn btn-secondary btn-icon';
    }
  },

  sendResponse() {
    const input = document.getElementById('userInputMsg');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    const chatHistory = document.getElementById('chatHistory');
    if (chatHistory) {
      chatHistory.innerHTML += `<div class="chat-msg chat-msg-user">${userText}</div>`;
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Move to next question or evaluate
    const questions = AppData.interviewScenarios[this.currentDomain];
    this.questionIndex++;

    if (this.questionIndex < questions.length) {
      const nextQ = questions[this.questionIndex];
      setTimeout(() => {
        if (chatHistory) {
          chatHistory.innerHTML += `<div class="chat-msg chat-msg-ai"><strong>Question ${this.questionIndex + 1}:</strong> ${nextQ}</div>`;
          chatHistory.scrollTop = chatHistory.scrollHeight;
        }
        document.getElementById('aiQuestionText').innerText = `"${nextQ}"`;
        this.speakAI(nextQ);
      }, 1000);
    } else {
      setTimeout(() => {
        this.endSession();
      }, 1000);
    }
  },

  endSession() {
    const score = Math.floor(Math.random() * 15) + 82;
    const sessionData = {
      role: this.currentDomain.toUpperCase(),
      score: score,
      feedback: "Strong technical vocabulary and clear articulation. Recommended to elaborate more on real-world edge cases."
    };

    AppStore.saveInterviewSession(sessionData);

    const container = document.getElementById('pageContent');
    container.innerHTML = `
      <div class="glass-panel gradient-border" style="padding: 40px; max-width: 800px; margin: 0 auto; text-align: center;">
        <div style="width: 90px; height: 90px; border-radius: 50%; background: var(--grad-success); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: #fff; margin: 0 auto 20px; box-shadow: var(--shadow-glow);">
          <i class="fa-solid fa-award"></i>
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 8px;">AI Interview Completed!</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Evaluation Scorecard generated based on articulation, relevance, and keyword depth.</p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px;">
          <div style="background: var(--bg-input); padding: 18px; border-radius: var(--radius-md);">
            <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">${score}/100</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Overall Rating</div>
          </div>

          <div style="background: var(--bg-input); padding: 18px; border-radius: var(--radius-md);">
            <div style="font-size: 2rem; font-weight: 800; color: var(--secondary);">90%</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Technical Accuracy</div>
          </div>

          <div style="background: var(--bg-input); padding: 18px; border-radius: var(--radius-md);">
            <div style="font-size: 2rem; font-weight: 800; color: var(--success);">85%</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">STAR Format Structure</div>
          </div>
        </div>

        <div style="background: var(--bg-input); padding: 20px; border-radius: var(--radius-md); text-align: left; margin-bottom: 28px;">
          <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: var(--secondary);"><i class="fa-solid fa-lightbulb"></i> AI Key Feedback & Recommendations</h4>
          <ul style="color: var(--text-main); font-size: 0.9rem; padding-left: 20px; line-height: 1.7;">
            <li>Excellent usage of core computer science terminology.</li>
            <li>Demonstrated great confidence when describing system design patterns.</li>
            <li><strong>Action Area:</strong> Provide numerical metrics when detailing project outcomes (e.g. "Improved latency by 25%").</li>
          </ul>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-primary" onclick="AppRouter.navigate('dashboard')">Back to Dashboard</button>
          <button class="btn btn-secondary" onclick="InterviewModule.render(document.getElementById('pageContent'))">Retake Interview</button>
        </div>
      </div>
    `;
  }
};
