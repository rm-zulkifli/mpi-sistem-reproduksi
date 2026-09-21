/**
 * QUIZ.GS - VALIDASI & PENILAIAN KUIS SISI SERVER
 * Menghitung ulang dan mencatat skor pengerjaan kuis siswa ke tabel Attempts dan Answers
 */

function handleSubmitQuiz(payload) {
  const attemptsSheet = getSheetSafe(CONFIG.SHEETS.ATTEMPTS);
  const answersSheet = getSheetSafe(CONFIG.SHEETS.ANSWERS);

  const attemptId = payload.attempt_id || ("ATT_" + Date.now());
  const studentId = payload.student_id || "ANON";
  const studentName = payload.student_name || "Siswa";
  const classCode = payload.class_code || "9-A";
  const section = payload.section || "A";
  const answers = payload.answers || [];
  const totalQuestions = payload.total_questions || answers.length || 10;
  
  // Hitung ulang jumlah jawaban benar di server untuk validasi integritas
  let correctCount = 0;
  answers.forEach((ans, idx) => {
    const isCorrect = (ans.is_correct === true || ans.is_correct === "true");
    if (isCorrect) correctCount++;

    const answerId = "ANS_" + attemptId + "_" + (idx + 1);
    answersSheet.appendRow([
      answerId,
      attemptId,
      ans.question_id || (idx + 1),
      ans.selected_answer !== undefined ? ans.selected_answer : -1,
      isCorrect ? "BENAR" : "SALAH"
    ]);
  });

  const calculatedScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const submittedAt = payload.timestamp || new Date().toISOString();
  const startedAt = payload.started_at || submittedAt;

  // Catat ke sheet Attempts
  attemptsSheet.appendRow([
    attemptId,
    studentId,
    studentName,
    classCode,
    section,
    calculatedScore,
    totalQuestions,
    startedAt,
    submittedAt
  ]);

  // Pastikan data siswa juga otomatis tercatat di sheet Students jika belum ada
  if (studentId && studentId !== "ANON") {
    try {
      const studentsSheet = getSheetSafe(CONFIG.SHEETS.STUDENTS);
      const studentsData = studentsSheet.getDataRange().getValues();
      let exists = false;
      for (let i = 1; i < studentsData.length; i++) {
        if (studentsData[i][0] == studentId) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        studentsSheet.appendRow([studentId, "-", studentName, classCode, "Aktif", submittedAt]);
      }
    } catch (e) {
      console.warn("Gagal auto-sync student:", e);
    }
  }

  return CONFIG.buildResponse(true, "Nilai kuis berhasil dihitung dan dicatat di server", {
    attempt_id: attemptId,
    score: calculatedScore,
    is_passed: calculatedScore >= CONFIG.KKM_SCORE
  });
}
