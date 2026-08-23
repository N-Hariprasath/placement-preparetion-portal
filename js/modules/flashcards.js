/* ApexHire AI - CS Fundamentals Flashcards Module */

const FlashcardsModule = {
  currentIndex: 0,
  isFlipped: false,

  render(container) {
    const cards = AppData.flashcards;
    const currentCard = cards[this.currentIndex];

    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <h1 style="font-size: 1.8rem; margin-bottom: 6px;">CS Fundamentals Quick Revision</h1>
          <p style="color: var(--text-muted);">Master Operating Systems, DBMS, Computer Networks, and OOPs concepts with interactive flashcards.</p>
        </div>

        <!-- Progress Indicator -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <span class="badge badge-indigo">Subject: ${currentCard.subject}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">Card ${this.currentIndex + 1} of ${cards.length}</span>
        </div>

        <!-- 3D Flip Card Container -->
        <div class="flashcard-container" onclick="FlashcardsModule.flipCard()">
          <div class="flashcard ${this.isFlipped ? 'flipped' : ''}" id="flashcardElement">
            <!-- Front -->
            <div class="card-front">
              <span class="badge badge-cyan" style="position: absolute; top: 20px; left: 20px;">QUESTION</span>
              <h3 style="font-size: 1.35rem; line-height: 1.6; max-width: 600px;">
                ${currentCard.question}
              </h3>
              <div style="font-size: 0.8rem; color: var(--text-muted); position: absolute; bottom: 20px;">
                👆 Click card or press Space to reveal answer
              </div>
            </div>

            <!-- Back -->
            <div class="card-back">
              <span class="badge badge-success" style="position: absolute; top: 20px; left: 20px;">ANSWER</span>
              <div style="font-size: 1rem; line-height: 1.7; color: var(--text-main); white-space: pre-line; max-width: 650px;">
                ${currentCard.answer}
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 24px;">
          <button class="btn btn-secondary" onclick="FlashcardsModule.prevCard()">
            <i class="fa-solid fa-arrow-left"></i> Previous Card
          </button>

          <button class="btn btn-primary" onclick="FlashcardsModule.nextCard()">
            Next Card <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  },

  flipCard() {
    this.isFlipped = !this.isFlipped;
    const card = document.getElementById('flashcardElement');
    if (card) {
      card.classList.toggle('flipped', this.isFlipped);
    }
  },

  nextCard() {
    this.isFlipped = false;
    this.currentIndex = (this.currentIndex + 1) % AppData.flashcards.length;
    this.render(document.getElementById('pageContent'));
  },

  prevCard() {
    this.isFlipped = false;
    this.currentIndex = (this.currentIndex - 1 + AppData.flashcards.length) % AppData.flashcards.length;
    this.render(document.getElementById('pageContent'));
  }
};
