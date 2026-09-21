/**
 * AUTH.GS - MANAJEMEN PENGGUNA, PROGRES, DAN REFLEKSI
 */

function handleCreateStudent(payload) {
  const sheet = getSheetSafe(CONFIG.SHEETS.STUDENTS);
  const data = sheet.getDataRange().getValues();

  const studentId = payload.student_id || ("STD_" + Date.now());
  const nisn = payload.nisn_or_code || "-";
  const name = payload.name || "Tanpa Nama";
  const classCode = payload.class_code || "9-A";
  const status = payload.status || "Aktif";
  const createdAt = payload.timestamp || new Date().toISOString();

  // Cari apakah student_id sudah ada (update atau buat baru)
  let foundRow = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == studentId || (nisn !== "-" && data[i][1] == nisn)) {
      foundRow = i + 1;
      break;
    }
  }

  if (foundRow > 0) {
    sheet.getRange(foundRow, 3).setValue(name);
    sheet.getRange(foundRow, 4).setValue(classCode);
    sheet.getRange(foundRow, 5).setValue(status);
  } else {
    sheet.appendRow([studentId, nisn, name, classCode, status, createdAt]);
  }

  return CONFIG.buildResponse(true, "Data siswa berhasil dicatat ke spreadsheet", { student_id: studentId });
}

function handleSaveProgress(payload) {
  const sheet = getSheetSafe(CONFIG.SHEETS.PROGRESS);
  const studentId = payload.student_id || "ANON";
  const section = payload.section || "-";
  const completion = payload.completion || 0;
  const lastActivity = payload.last_activity || "Membaca modul";
  const updatedAt = payload.timestamp || new Date().toISOString();

  sheet.appendRow([studentId, section, completion, lastActivity, updatedAt]);
  return CONFIG.buildResponse(true, "Progres belajar berhasil disimpan");
}

function handleSaveReflection(payload) {
  const sheet = getSheetSafe(CONFIG.SHEETS.REFLECTIONS);
  const reflectionId = "REF_" + Date.now();
  const studentId = payload.student_id || "ANON";
  const section = payload.section || "Refleksi Akhir";
  const response = payload.response || "";
  const submittedAt = payload.timestamp || new Date().toISOString();

  sheet.appendRow([reflectionId, studentId, section, response, submittedAt]);
  return CONFIG.buildResponse(true, "Refleksi pembelajaran berhasil disimpan");
}

function handleGetTeacherDashboard() {
  const attemptsSheet = getSheetSafe(CONFIG.SHEETS.ATTEMPTS);
  const data = attemptsSheet.getDataRange().getValues();

  const attemptsList = [];
  for (let i = 1; i < data.length; i++) {
    attemptsList.push({
      attempt_id: data[i][0],
      student_id: data[i][1],
      student_name: data[i][2],
      class_code: data[i][3],
      section: data[i][4],
      score: data[i][5],
      total_questions: data[i][6],
      submitted_at: data[i][8]
    });
  }

  return CONFIG.buildResponse(true, "Data dashboard guru berhasil diambil", {
    total_attempts: attemptsList.length,
    attempts: attemptsList
  });
}

function handleUpdateClasses(payload) {
  const sheet = getSheetSafe(CONFIG.SHEETS.CLASSES);
  const classes = payload.classes || [];

  // Kosongkan baris setelah header
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 4).clearContent();
  }

  // Isi baris baru: ["class_id", "class_name", "teacher_id", "status"]
  if (classes.length > 0) {
    const rows = classes.map(c => [c.id, c.name, "TEACHER_1", "Aktif"]);
    sheet.getRange(2, 1, rows.length, 4).setValues(rows);
  }

  return CONFIG.buildResponse(true, "Daftar kelas berhasil disinkronisasi ke spreadsheet!", {
    count: classes.length
  });
}

