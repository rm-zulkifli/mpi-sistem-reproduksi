/**
 * KOMPONEN AKTIVITAS PEMBELAJARAN INTERAKTIF (LAB MINI & FLASHCARD)
 * 1. Urutkan Alur Spermatogenesis & Perjalanan Sperma
 * 2. Flashcard Flip Card Player (Front/Back)
 * 3. Kuis Cepat Mencocokkan Organ & Fungsi
 * 4. Skenario Studi Kasus Pubertas & Privasi Tubuh
 */

const InteractiveActivities = {
  // Flashcard Player State
  flashcardState: {
    cards: [],
    currentIndex: 0,
    isFlipped: false
  },

  initFlashcards(containerId, cardsList) {
    const container = document.getElementById(containerId);
    if (!container || !cardsList || cardsList.length === 0) return;

    this.flashcardState.cards = [...cardsList];
    this.flashcardState.currentIndex = 0;
    this.flashcardState.isFlipped = false;

    this.renderFlashcardUI(container);
  },

  renderFlashcardUI(container) {
    const s = this.flashcardState;
    const card = s.cards[s.currentIndex];

    container.innerHTML = `
      <div class="card" style="margin-top: 1.5rem; text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span style="font-weight: 700; color: var(--text-primary); font-size: 1.1rem;">🗂️ Flashcard Pembelajaran</span>
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary);">Kartu ${s.currentIndex + 1} dari ${s.cards.length}</span>
        </div>

        <div class="flashcard-wrapper" id="fc-click-target" tabindex="0" role="button" aria-label="Klik untuk membalik kartu">
          <div class="flashcard ${s.isFlipped ? 'flipped' : ''}" id="flashcard-element">
            <div class="flashcard-face flashcard-front">
              <span class="info-badge" style="margin-bottom: 1rem;">${card.category || 'Istilah Biologi'}</span>
              <h2 style="font-size: 1.6rem; color: var(--primary-dark); font-weight: 800;">${card.front}</h2>
              <div class="flashcard-hint">👆 Klik atau tekan spasi untuk membalik kartu</div>
            </div>
            <div class="flashcard-face flashcard-back">
              <span class="info-badge" style="background: var(--success-light); color: var(--success-dark); margin-bottom: 1rem;">Penjelasan / Fungsi</span>
              <p style="font-size: 1.1rem; color: var(--text-primary); line-height: 1.6;">${card.back}</p>
              <div class="flashcard-hint">🔄 Klik lagi untuk kembali</div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 1.25rem;">
          <button class="btn btn-secondary btn-sm" id="btn-fc-prev" ${s.currentIndex === 0 ? 'disabled' : ''}>◀ Sebelumnya</button>
          <button class="btn btn-primary btn-sm" id="btn-fc-flip">🔄 Balik Kartu</button>
          <button class="btn btn-secondary btn-sm" id="btn-fc-next" ${s.currentIndex === s.cards.length - 1 ? 'disabled' : ''}>Selanjutnya ▶</button>
          <button class="btn btn-sm" id="btn-fc-shuffle" style="background: #f1f5f9; color: var(--text-secondary);">🔀 Acak</button>
        </div>
      </div>
    `;

    const cardEl = container.querySelector('#flashcard-element');
    const targetEl = container.querySelector('#fc-click-target');
    const flipBtn = container.querySelector('#btn-fc-flip');
    const prevBtn = container.querySelector('#btn-fc-prev');
    const nextBtn = container.querySelector('#btn-fc-next');
    const shuffleBtn = container.querySelector('#btn-fc-shuffle');

    const toggleFlip = () => {
      s.isFlipped = !s.isFlipped;
      cardEl.classList.toggle('flipped', s.isFlipped);
      if (window.Utils) window.Utils.playFlip();
    };

    targetEl.addEventListener('click', toggleFlip);
    targetEl.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleFlip();
      }
    });
    flipBtn.addEventListener('click', toggleFlip);

    prevBtn.addEventListener('click', () => {
      if (s.currentIndex > 0) {
        s.currentIndex--;
        s.isFlipped = false;
        this.renderFlashcardUI(container);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (s.currentIndex < s.cards.length - 1) {
        s.currentIndex++;
        s.isFlipped = false;
        this.renderFlashcardUI(container);
      }
    });

    shuffleBtn.addEventListener('click', () => {
      s.cards.sort(() => Math.random() - 0.5);
      s.currentIndex = 0;
      s.isFlipped = false;
      this.renderFlashcardUI(container);
      if (window.Utils) window.Utils.showToast("Kartu berhasil diacak!");
    });
  },

  // Aktivitas Menyusun Alur Perjalanan Sperma
  initSpermFlowActivity(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const correctOrder = [
      { id: "testis", label: "Testis (Tubulus Seminiferus - Pembentukan sperma)" },
      { id: "epididimis", label: "Epididimis (Pematangan & penyimpanan sperma)" },
      { id: "vas_deferens", label: "Vas Deferens (Saluran pengangkutan)" },
      { id: "kelenjar", label: "Kelenjar Aksesori (+ Cairan semen dari vesikula seminalis & prostat)" },
      { id: "uretra", label: "Uretra Penis (Pengeluaran ejakulasi)" }
    ];

    // Acak urutan awal
    let currentItems = [...correctOrder].sort(() => Math.random() - 0.5);

    const render = () => {
      container.innerHTML = `
        <div class="card" style="border-left: 4px solid var(--accent);">
          <div class="card-title">🧩 Aktivitas: Susun Alur Perjalanan Sel Sperma</div>
          <p class="card-desc">Gunakan tombol panah ⬆️ dan ⬇️ untuk mengurutkan rute keluarnya sperma sejak pertama kali dibentuk hingga dikeluarkan dari tubuh!</p>

          <div style="display: flex; flex-direction: column; gap: 0.6rem; margin: 1.25rem 0;">
            ${currentItems.map((item, index) => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span style="width: 28px; height: 28px; border-radius: 50%; background: var(--primary-light); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; font-weight: 700;">${index + 1}</span>
                  <span style="font-weight: 600; color: var(--text-primary); font-size: 0.92rem;">${item.label}</span>
                </div>
                <div style="display: flex; gap: 0.35rem;">
                  <button class="btn btn-sm btn-secondary btn-arrow-up" data-idx="${index}" ${index === 0 ? 'disabled' : ''} aria-label="Geser ke atas">⬆️</button>
                  <button class="btn btn-sm btn-secondary btn-arrow-down" data-idx="${index}" ${index === currentItems.length - 1 ? 'disabled' : ''} aria-label="Geser ke bawah">⬇️</button>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <button class="btn btn-primary" id="btn-check-sperm-flow">Periksa Urutan Saya ✓</button>
            <div id="sperm-flow-result"></div>
          </div>
        </div>
      `;

      container.querySelectorAll('.btn-arrow-up').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          if (idx > 0) {
            const temp = currentItems[idx];
            currentItems[idx] = currentItems[idx - 1];
            currentItems[idx - 1] = temp;
            render();
          }
        });
      });

      container.querySelectorAll('.btn-arrow-down').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          if (idx < currentItems.length - 1) {
            const temp = currentItems[idx];
            currentItems[idx] = currentItems[idx + 1];
            currentItems[idx + 1] = temp;
            render();
          }
        });
      });

      const checkBtn = container.querySelector('#btn-check-sperm-flow');
      const resBox = container.querySelector('#sperm-flow-result');

      checkBtn.addEventListener('click', () => {
        let isAllCorrect = true;
        for (let i = 0; i < correctOrder.length; i++) {
          if (currentItems[i].id !== correctOrder[i].id) {
            isAllCorrect = false;
            break;
          }
        }

        if (isAllCorrect) {
          if (window.Utils) {
            window.Utils.playCorrect();
            window.Utils.triggerConfetti();
          }
          resBox.innerHTML = `
            <div style="background: #ecfdf5; color: #065f46; padding: 0.6rem 1rem; border-radius: var(--radius-md); font-weight: 700; border: 1px solid #a7f3d0;">
              🎉 Luar biasa! Seluruh urutan alur sperma sudah tepat 100%!
            </div>
          `;
        } else {
          if (window.Utils) window.Utils.playWrong();
          resBox.innerHTML = `
            <div style="background: #fef2f2; color: #991b1b; padding: 0.6rem 1rem; border-radius: var(--radius-md); font-weight: 600; border: 1px solid #fecaca;">
              ⚠️ Masih ada posisi yang belum pas. Ingat: sperma dibuat di testis, lalu dimatangkan di epididimis! Coba lagi.
            </div>
          `;
        }
      });
    };

    render();
  },

  // Skenario Studi Kasus Edukatif (Pubertas & Batasan Tubuh)
  initCaseStudyActivity(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cases = [
      {
        title: "Kasus 1: Perubahan Suara & Emosi",
        scenario: "Rian (13 tahun) menyadari suaranya sering terdengar serak dan mendadak membesar. Teman-temannya terkadang menertawakannya, sehingga Rian merasa minder dan cemas apakah tenggorokannya sakit.",
        question: "Berdasarkan ilmu biologi, apa penjelasan ilmiah terbaik yang dapat menenangkan Rian?",
        options: [
          { text: "Rian terkena radang tenggorokan parah dan harus berhenti berbicara selama setahun.", isCorrect: false },
          { text: "Perubahan suara adalah hal alami saat pubertas karena jakun dan pita suara membesar di bawah pengaruh hormon testosteron.", isCorrect: true, feedback: "Tepat sekali! Membesarnya pita suara dan jakun adalah tanda kelamin sekunder alami pada laki-laki." },
          { text: "Suara Rian rusak permanen karena terlalu banyak minum es.", isCorrect: false }
        ]
      },
      {
        title: "Kasus 2: Menjaga Batasan Tubuh (Body Boundary)",
        scenario: "Ketika berada di tempat umum, ada orang asing yang berusaha menyentuh bagian tubuh pribadi Dina yang tertutup pakaian dengan dalih bersikap ramah.",
        question: "Tindakan apa yang paling tepat, tegas, dan aman dilakukan oleh Dina?",
        options: [
          { text: "Diam saja karena takut orang tersebut tersinggung.", isCorrect: false },
          { text: "Berani berkata 'TIDAK / JANGAN SENTUH SAYA!', menjauh segera ke tempat ramai, dan melapor kepada orang tua atau guru.", isCorrect: true, feedback: "Benar sekali! Prinsip perlindungan diri: Tegas berkata TIDAK, Menjauh (Lari), dan Melapor ke orang dewasa terpercaya." },
          { text: "Menyimpan kejadian tersebut sendirian sebagai rahasia pribadi.", isCorrect: false }
        ]
      }
    ];

    container.innerHTML = `
      <div class="card" style="border-left: 4px solid var(--primary);">
        <div class="card-title">🔍 Detektif Kasus Pubertas & Kesehatan Remaja</div>
        <p class="card-desc">Pilihlah solusi ilmiah dan bijak untuk setiap skenario kehidupan nyata di bawah ini:</p>

        <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
          ${cases.map((c, cIdx) => `
            <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: var(--primary-dark); margin-bottom: 0.5rem; font-weight: 700;">${c.title}</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.85rem; font-style: italic; background: white; padding: 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid #cbd5e1;">"${c.scenario}"</p>
              <div style="font-weight: 600; font-size: 0.92rem; color: var(--text-primary); margin-bottom: 0.75rem;">${c.question}</div>
              
              <div class="case-options" data-case="${cIdx}" style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${c.options.map((opt, oIdx) => `
                  <button class="quiz-option-btn btn-case-opt" data-case="${cIdx}" data-opt="${oIdx}">
                    <span class="option-badge">${String.fromCharCode(65 + oIdx)}</span>
                    <span>${opt.text}</span>
                  </button>
                `).join('')}
              </div>
              <div id="case-feedback-${cIdx}" style="margin-top: 0.85rem;"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Pasang listener
    container.querySelectorAll('.btn-case-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const cIdx = parseInt(btn.getAttribute('data-case'));
        const oIdx = parseInt(btn.getAttribute('data-opt'));
        const currentCase = cases[cIdx];
        const selectedOpt = currentCase.options[oIdx];
        const feedbackBox = container.querySelector(`#case-feedback-${cIdx}`);

        // Reset highlight opsi
        container.querySelectorAll(`.btn-case-opt[data-case="${cIdx}"]`).forEach(b => {
          b.classList.remove('selected', 'correct', 'wrong');
        });

        if (selectedOpt.isCorrect) {
          btn.classList.add('correct');
          if (window.Utils) window.Utils.playCorrect();
          feedbackBox.innerHTML = `
            <div class="quiz-feedback-box correct">
              <strong>Jawaban Tepat!</strong> ${selectedOpt.feedback}
            </div>
          `;
        } else {
          btn.classList.add('wrong');
          if (window.Utils) window.Utils.playWrong();
          feedbackBox.innerHTML = `
            <div class="quiz-feedback-box wrong">
              <strong>Kurang Tepat.</strong> Solusi ini kurang sesuai dengan kaidah ilmiah dan keamanan diri. Coba telaah opsi lainnya!
            </div>
          `;
        }
      });
    });
  }
};

if (typeof window !== "undefined") {
  window.InteractiveActivities = InteractiveActivities;
}
