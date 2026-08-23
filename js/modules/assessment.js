/* ApexHire AI - Timed Assessment Module */

const AssessmentModule = {
  currentTest: AppData.assessments[0],
  currentQIndex: 0,
  userAnswers: {},
  timerInterval: null,
  timeLeftSeconds: 900,

  render(container) {
    this.currentQIndex = 0;
    this.userAnswers = {};
    this.timeLeftSeconds = this.currentTest.durationMins * 60;

    const questions = this.currentTest.questions;
    const currentQ = questions[this.currentQIndex];

    container.innerHTML = `
      <div>
        <!-- Top Test Bar -->
        <div class="quiz-header-bar">
          <div>
            <h2 style="font-size: 1.2rem;">${this.currentTest.title}</h2>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Category: ${this.currentTest.category} • Total Questions: ${questions.length}</div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="timer-pill" id="timerDisplay">
              <i class="fa-solid fa-clock"></i> 15:00
            </div>
            <button class="btn btn-emerald btn-sm" onclick="AssessmentModule.submitTest()">
              <i class="fa-solid fa-check"></i> Submit Test
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px;">
          <!-- Main Question Container -->
          <div class="glass-panel" style="padding: 28px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <span class="badge badge-indigo">Question ${this.currentQIndex + 1} of ${questions.length}</span>
              <span style="font-size: 0.85rem; color: var(--text-muted);">Single Choice</span>
            </div>

            <h3 style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 24px;" id="questionText">
              ${currentQ.question}
            </h3>

            <!-- MCQ Options -->
            <div id="optionsContainer">
              ${currentQ.options.map((opt, idx) => {
                const isSelected = this.userAnswers[this.currentQIndex] === idx;
                const letter = String.fromCharCode(65 + idx);
                return `
                  <div class="mcq-option ${isSelected ? 'selected' : ''}" onclick="AssessmentModule.selectOption(${idx})">
                    <div class="opt-prefix">${letter}</div>
                    <div style="font-weight: 500;">${opt}</div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Navigation Buttons -->
            <div style="display: flex; justify-content: space-between; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--border-color);">
              <button class="btn btn-secondary" onclick="AssessmentModule.prevQuestion()" ${this.currentQIndex === 0 ? 'disabled' : ''}>
                <i class="fa-solid fa-arrow-left"></i> Previous
              </button>

              <button class="btn btn-primary" onclick="AssessmentModule.nextQuestion()">
                ${this.currentQIndex === questions.length - 1 ? 'Finish & Submit' : 'Next Question <i class="fa-solid fa-arrow-right"></i>'}
              </button>
            </div>
          </div>

          <!-- Question Palette Navigation Sidebar -->
          <div class="glass-panel" style="padding: 20px;">
            <h4 style="font-size: 0.95rem; margin-bottom: 14px;">Question Navigator</h4>
            <div class="question-palette">
              ${questions.map((q, idx) => {
                const isAnswered = this.userAnswers[idx] !== undefined;
                const isCurrent = idx === this.currentQIndex;
                return `
                  <button class="q-btn ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" onclick="AssessmentModule.jumpToQuestion(${idx})">
                    ${idx + 1}
                  </button>
                `;
              }).join('')}
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); font-size: 0.8rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 12px; height: 12px; background: var(--success); border-radius: 3px;"></div> Answered
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 12px; height: 12px; background: var(--bg-input); border: 1px solid var(--primary); border-radius: 3px;"></div> Current
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.startTimer();
  },

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      this.timeLeftSeconds--;
      const display = document.getElementById('timerDisplay');
      if (display) {
        const mins = Math.floor(this.timeLeftSeconds / 60);
        const secs = this.timeLeftSeconds % 60;
        display.innerHTML = `<i class="fa-solid fa-clock"></i> ${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }

      if (this.timeLeftSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.submitTest();
      }
    }, 1000);
  },

  selectOption(optIdx) {
    this.userAnswers[this.currentQIndex] = optIdx;
    this.renderQuestion();
  },

  jumpToQuestion(idx) {
    this.currentQIndex = idx;
    this.renderQuestion();
  },

  prevQuestion() {
    if (this.currentQIndex > 0) {
      this.currentQIndex--;
      this.renderQuestion();
    }
  },

  nextQuestion() {
    const questions = this.currentTest.questions;
    if (this.currentQIndex < questions.length - 1) {
      this.currentQIndex++;
      this.renderQuestion();
    } else {
      this.submitTest();
    }
  },

  renderQuestion() {
    const questions = this.currentTest.questions;
    const currentQ = questions[this.currentQIndex];
    const qText = document.getElementById('questionText');
    const optContainer = document.getElementById('optionsContainer');

    if (qText && optContainer) {
      qText.innerText = currentQ.question;
      optContainer.innerHTML = currentQ.options.map((opt, idx) => {
        const isSelected = this.userAnswers[this.currentQIndex] === idx;
        const letter = String.fromCharCode(65 + idx);
        return `
          <div class="mcq-option ${isSelected ? 'selected' : ''}" onclick="AssessmentModule.selectOption(${idx})">
            <div class="opt-prefix">${letter}</div>
            <div style="font-weight: 500;">${opt}</div>
          </div>
        `;
      }).join('');
    }
  },

  submitTest() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const questions = this.currentTest.questions;
    let correctCount = 0;

    questions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    // Save result to store
    AppStore.saveAssessmentResult({
      id: this.currentTest.id,
      score: correctCount,
      total: questions.length,
      percentage: percentage,
      date: new Date().toLocaleDateString()
    });

    const container = document.getElementById('pageContent');
    container.innerHTML = `
      <div class="glass-panel gradient-border" style="padding: 36px; max-width: 850px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 28px;">
          <h2 style="font-size: 2rem; margin-bottom: 8px;">Assessment Results Summary</h2>
          <p style="color: var(--text-muted);">Detailed question analysis and step-by-step solutions</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
          <div style="background: var(--bg-input); padding: 20px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">${percentage}%</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Overall Score</div>
          </div>

          <div style="background: var(--bg-input); padding: 20px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 2.2rem; font-weight: 800; color: var(--success);">${correctCount} / ${questions.length}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Correct Answers</div>
          </div>

          <div style="background: var(--bg-input); padding: 20px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 2.2rem; font-weight: 800; color: var(--secondary);">88th</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Estimated Percentile</div>
          </div>
        </div>

        <!-- Detailed Answers Review -->
        <h3 style="font-size: 1.1rem; margin-bottom: 16px;">Question Breakdown & Solutions</h3>
        <div style="display: flex; flex-direction: column; gap: 18px;">
          ${questions.map((q, idx) => {
            const userAns = this.userAnswers[idx];
            const isCorrect = userAns === q.answer;
            return `
              <div style="padding: 18px; background: var(--bg-input); border-radius: var(--radius-md); border-left: 4px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
                <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 8px;">
                  <span>Question ${idx + 1}</span>
                  <span style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">${isCorrect ? 'Correct ✓' : 'Incorrect ✗'}</span>
                </div>
                <div style="font-size: 0.95rem; margin-bottom: 12px;">${q.question}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">
                  Your Answer: <strong>${userAns !== undefined ? q.options[userAns] : 'Not Answered'}</strong>
                </div>
                <div style="font-size: 0.85rem; color: var(--success); margin-bottom: 8px;">
                  Correct Option: <strong>${q.options[q.answer]}</strong>
                </div>
                <div style="font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--text-main); margin-top: 8px;">
                  💡 <strong>Explanation:</strong> ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display: flex; justify-content: center; gap: 12px; margin-top: 32px;">
          <button class="btn btn-primary" onclick="AppRouter.navigate('dashboard')">Return to Dashboard</button>
        </div>
      </div>
    `;

    AppToast.show(`Test Submitted! Score: ${percentage}%`, 'success');
  }
};
