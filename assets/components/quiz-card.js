/**
 * KOMPONEN ENGINE KUIS INTERAKTIF (quiz-card.js)
 * Mengatur siklus pengerjaan kuis: Timer, Acak Soal & Opsi, Status Ragu-ragu,
 * Penilaian Otomatis, Rekap Nilai, Pembahasan Lengkap, dan Trigger Kirim ke Backend.
 */

const QuizEngine = {
  currentQuiz: null,
  currentIndex: 0,
  userAnswers: {}, // { questionId: selectedIndex }
  flaggedQuestions: new Set(),
  timerInterval: null,
  timeLeft: 0, // detik
  startTime: null,

  startQuiz(containerId, sectionCode, questionsList, timeLimitMinutes = 20) {
    if (!questionsList || questionsList.length === 0) return;

    // Duplikasi dan acak soal
    const randomizedQuestions = questionsList.map(q => {
      // Acak urutan opsi jawaban tetapi pertahankan indeks jawaban benar
      const originalOptions = [...q.options];
      const correctText = originalOptions[q.correctAnswer];
      
      const shuffledOptions = [...originalOptions].sort(() => Math.random() - 0.5);
      const newCorrectIndex = shuffledOptions.indexOf(correctText);

      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectIndex
      };
    }).sort(() => Math.random() - 0.5);

    this.currentQuiz = {
      section: sectionCode,
      questions: randomizedQuestions,
      timeLimit: timeLimitMinutes * 60,
      totalQuestions: randomizedQuestions.length
    };

    this.currentIndex = 0;
    this.userAnswers = {};
    this.flaggedQuestions = new Set();
    this.timeLeft = this.currentQuiz.timeLimit;
    this.startTime = new Date().toISOString();

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.submitQuiz(containerId, true);
      }
    }, 1000);

    this.renderQuestion(containerId);
  },

  updateTimerDisplay() {
    const timerEl = document.getElementById('quiz-timer-text');
    if (timerEl) {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      if (this.timeLeft < 180) {
        timerEl.parentElement.style.background = '#fee2e2';
        timerEl.parentElement.style.color = '#dc2626';
      }
    }
  },

  renderQuestion(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !this.currentQuiz) return;

    const q = this.currentQuiz.questions[this.currentIndex];
    const isAnswered = this.userAnswers.hasOwnProperty(q.id);
    const selectedOpt = this.userAnswers[q.id];
    const isFlagged = this.flaggedQuestions.has(q.id);

    container.innerHTML = `
      <div class="quiz-container animate-fade-in">
        <div class="quiz-header-bar">
          <div>
            <span class="info-badge" style="margin-bottom: 0.35rem;">Ayo Uji Kemampuan Bagian ${this.currentQuiz.section}</span>
            <div class="quiz-question-number">Nomor ${this.currentIndex + 1} dari ${this.currentQuiz.totalQuestions}</div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn btn-sm btn-secondary" id="btn-flag-toggle" style="background: ${isFlagged ? '#fef3c7' : 'white'}; border-color: ${isFlagged ? '#f59e0b' : '#cbd5e1'};">
              ${isFlagged ? '🚩 Ragu-ragu (Ditandai)' : '🏳️ Tandai Ragu-ragu'}
            </button>
            <div class="quiz-timer">
              <span>⏱️</span>
              <span id="quiz-timer-text">${Math.floor(this.timeLeft / 60).toString().padStart(2, '0')}:${(this.timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div class="quiz-question-text">${q.question}</div>

        <div class="quiz-options-list">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option-btn ${selectedOpt === idx ? 'selected' : ''}" data-idx="${idx}">
              <span class="option-badge">${String.fromCharCode(65 + idx)}</span>
              <span style="flex: 1;">${opt}</span>
            </button>
          `).join('')}
        </div>

        <!-- Palet Nomor Navigasi Soal -->
        <div style="margin: 1.5rem 0; padding-top: 1rem; border-top: 1px solid var(--border-color);">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem;">NAVIGASI SOAL:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${this.currentQuiz.questions.map((ques, idx) => {
              const answered = this.userAnswers.hasOwnProperty(ques.id);
              const flagged = this.flaggedQuestions.has(ques.id);
              let bg = '#f1f5f9';
              let color = 'var(--text-secondary)';
              let border = '1px solid var(--border-color)';
              if (answered) { bg = '#dbeafe'; color = '#1e40af'; border = '1px solid #93c5fd'; }
              if (flagged) { bg = '#fef3c7'; color = '#d97706'; border = '1px solid #f59e0b'; }
              if (idx === this.currentIndex) { border = '2px solid #2563eb'; font_weight = '800'; }

              return `
                <button class="btn-goto-q" data-qidx="${idx}" style="width: 32px; height: 32px; border-radius: var(--radius-sm); border: ${border}; background: ${bg}; color: ${color}; font-size: 0.82rem; font-weight: 700; cursor: pointer;">
                  ${idx + 1}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="quiz-nav-footer">
          <button class="btn btn-secondary" id="btn-quiz-prev" ${this.currentIndex === 0 ? 'disabled' : ''}>
            ◀ Soal Sebelumnya
          </button>

          ${this.currentIndex === this.currentQuiz.totalQuestions - 1 ? `
            <button class="btn btn-hero" id="btn-quiz-submit">
              Selesai & Kumpulkan Nilai ✓
            </button>
          ` : `
            <button class="btn btn-primary" id="btn-quiz-next">
              Soal Berikutnya ▶
            </button>
          `}
        </div>
      </div>
    `;

    // Event Listeners Opsi
    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'));
        this.userAnswers[q.id] = selectedIdx;
        if (window.Utils) window.Utils.playClick();
        this.renderQuestion(containerId);
      });
    });

    // Flag toggle
    const flagBtn = container.querySelector('#btn-flag-toggle');
    if (flagBtn) {
      flagBtn.addEventListener('click', () => {
        if (this.flaggedQuestions.has(q.id)) {
          this.flaggedQuestions.delete(q.id);
        } else {
          this.flaggedQuestions.add(q.id);
        }
        this.renderQuestion(containerId);
      });
    }

    // Prev / Next Buttons
    const prevBtn = container.querySelector('#btn-quiz-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.renderQuestion(containerId);
        }
      });
    }

    const nextBtn = container.querySelector('#btn-quiz-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.currentQuiz.totalQuestions - 1) {
          this.currentIndex++;
          this.renderQuestion(containerId);
        }
      });
    }

    // Direct goto question
    container.querySelectorAll('.btn-goto-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const qidx = parseInt(btn.getAttribute('data-qidx'));
        this.currentIndex = qidx;
        this.renderQuestion(containerId);
      });
    });

    // Submit button
    const submitBtn = container.querySelector('#btn-quiz-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const answeredCount = Object.keys(this.userAnswers).length;
        const total = this.currentQuiz.totalQuestions;
        if (answeredCount < total) {
          if (!confirm(`Perhatian: Anda baru menjawab ${answeredCount} dari ${total} soal. Yakin ingin mengumpulkan latihan sekarang?`)) {
            return;
          }
        }
        this.submitQuiz(containerId, false);
      });
    }
  },

  submitQuiz(containerId, isAutoTimeout = false) {
    clearInterval(this.timerInterval);
    const container = document.getElementById(containerId);
    if (!container || !this.currentQuiz) return;

    let correctCount = 0;
    const reviewDetails = [];

    this.currentQuiz.questions.forEach((q, idx) => {
      const selected = this.userAnswers[q.id];
      const isCorrect = (selected === q.correctAnswer);
      if (isCorrect) correctCount++;

      reviewDetails.push({
        num: idx + 1,
        question: q.question,
        options: q.options,
        selectedAnswer: selected !== undefined ? selected : -1,
        correctAnswer: q.correctAnswer,
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    });

    const totalQuestions = this.currentQuiz.totalQuestions;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = finalScore >= 75; // KKM 75

    // Feedback deskriptif tanpa pelabelan yang menghakimi
    let feedbackDesc = "";
    if (finalScore >= 90) {
      feedbackDesc = "Luar biasa! Pemahaman konsep Anda sangat matang dan mendalam. Pertahankan prestasi ini!";
    } else if (finalScore >= 75) {
      feedbackDesc = "Pemahaman Anda sudah berkembang dengan sangat baik dan telah mencapai KKM. Silakan pelajari kembali pembahasan beberapa soal yang keliru.";
    } else {
      feedbackDesc = "Pemahaman Anda sedang berproses dan berkembang. Luangkan waktu untuk meninjau kembali bagian materi yang belum dikuasai, lalu coba latihan ini kembali.";
    }

    if (window.Utils) {
      if (isPassed) {
        window.Utils.playComplete();
        window.Utils.triggerConfetti();
      } else {
        window.Utils.playWrong();
      }
    }

    // Ambil identitas siswa yang sedang mengerjakan
    const currentUser = window.StudentAuth ? window.StudentAuth.currentUser : null;
    const studentId = (currentUser && currentUser.studentId) ? currentUser.studentId : "ANON";
    const studentName = (currentUser && currentUser.name && currentUser.name !== "Belum Mengisi Identitas") ? currentUser.name : "Siswa";
    const classCode = (currentUser && currentUser.classCode) ? currentUser.classCode : "-";

    // Simpan riwayat attempt di lokal
    const attemptRecord = {
      attemptId: "ATT_" + Date.now(),
      studentId: studentId,
      studentName: studentName,
      classCode: classCode,
      section: this.currentQuiz.section,
      score: finalScore,
      correctCount: correctCount,
      totalQuestions: totalQuestions,
      submittedAt: new Date().toISOString(),
      details: reviewDetails
    };

    if (window.StudentAuth) {
      window.StudentAuth.recordQuizAttempt(attemptRecord);
    }

    // Trigger kirim ke Google Apps Script backend jika online
    if (window.ApiClient) {
      window.ApiClient.submitQuizToBackend(attemptRecord);
    }

    // Render Hasil & Pembahasan
    container.innerHTML = `
      <div class="quiz-container animate-fade-in">
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">${isPassed ? '🏆' : '🌱'}</div>
          <span class="info-badge" style="background: ${isPassed ? '#d1fae5' : '#fef3c7'}; color: ${isPassed ? '#065f46' : '#b45309'}; font-size: 0.85rem; padding: 0.3rem 0.85rem;">
            ${isPassed ? 'Tuntas (Mencapai KKM 75)' : 'Perlu Penguatan Materi'}
          </span>
          <h2 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 0.75rem 0 0.25rem;">
            Nilai Anda: <span style="color: ${isPassed ? 'var(--success)' : 'var(--accent-dark)'};">${finalScore}</span> / 100
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 580px; margin: 0.5rem auto 1.5rem; line-height: 1.6;">
            ${feedbackDesc}
          </p>

          <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.75rem;">
            <div style="background: #f8fafc; padding: 0.75rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">JAWABAN BENAR</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--success);">${correctCount} Soal</div>
            </div>
            <div style="background: #f8fafc; padding: 0.75rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">JAWABAN SALAH / KOSONG</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--danger);">${totalQuestions - correctCount} Soal</div>
            </div>
            <div style="background: #f8fafc; padding: 0.75rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">STATUS PENYIMPANAN</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--primary);" id="sync-status-badge">Tersimpan di Perangkat</div>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" id="btn-retake-quiz">🔄 Ulangi Latihan</button>
            ${isPassed ? `<button class="btn btn-success" id="btn-print-cert">🖨️ Cetak Sertifikat Digital</button>` : ''}
            <button class="btn btn-primary" id="btn-goto-reflection">📝 Isi Lembar Refleksi Diri</button>
          </div>
        </div>

        <!-- Bagian Pembahasan Lengkap -->
        <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.25rem;">
            📖 Pembahasan Kunci Jawaban Lengkap:
          </h3>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            ${reviewDetails.map(item => `
              <div style="background: #f8fafc; border: 1px solid ${item.isCorrect ? '#a7f3d0' : '#fecaca'}; border-radius: var(--radius-md); padding: 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 700; color: var(--text-primary);">Soal No. ${item.num}</span>
                  <span style="font-size: 0.8rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); background: ${item.isCorrect ? '#d1fae5' : '#fee2e2'}; color: ${item.isCorrect ? '#065f46' : '#991b1b'};">
                    ${item.isCorrect ? '✓ Jawaban Anda Benar' : '✕ Jawaban Anda Kurang Tepat'}
                  </span>
                </div>

                <p style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.75rem; font-weight: 500;">
                  ${item.question}
                </p>

                <div style="font-size: 0.88rem; margin-bottom: 0.5rem;">
                  <div>Jawaban Anda: <strong>${item.selectedAnswer >= 0 ? `${String.fromCharCode(65 + item.selectedAnswer)}. ${item.options[item.selectedAnswer]}` : 'Tidak dijawab'}</strong></div>
                  ${!item.isCorrect ? `<div style="color: var(--success-dark); margin-top: 0.2rem;">Kunci Jawaban Benar: <strong>${String.fromCharCode(65 + item.correctAnswer)}. ${item.options[item.correctAnswer]}</strong></div>` : ''}
                </div>

                <div style="background: white; padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary); font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
                  <strong style="color: var(--primary-dark);">Penjelasan Pembahasan:</strong> ${item.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Pasang tombol ulang & cetak sertifikat
    container.querySelector('#btn-retake-quiz').addEventListener('click', () => {
      this.startQuiz(containerId, this.currentQuiz.section, this.currentQuiz.questions);
    });

    const certBtn = container.querySelector('#btn-print-cert');
    if (certBtn) {
      certBtn.addEventListener('click', () => {
        if (window.Navigation) window.Navigation.showCertificate(attemptRecord);
      });
    }

    const refBtn = container.querySelector('#btn-goto-reflection');
    if (refBtn) {
      refBtn.addEventListener('click', () => {
        if (window.Navigation) window.Navigation.navigateTo('reflection');
      });
    }
  }
};

if (typeof window !== "undefined") {
  window.QuizEngine = QuizEngine;
}
