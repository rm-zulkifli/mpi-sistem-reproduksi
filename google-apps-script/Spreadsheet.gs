/**
 * SPREADSHEET.GS - INISIALISASI & MANAJEMEN DATABASE GOOGLE SPREADSHEET
 * Membuat 8 sheet otomatis sesuai arsitektur database aplikasi
 */

function setupDatabaseSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Skema Kolom untuk ke-8 Sheet
  const schemas = [
    {
      name: CONFIG.SHEETS.STUDENTS,
      color: "#2563eb",
      headers: ["student_id", "nisn_or_code", "name", "class_code", "status", "created_at"]
    },
    {
      name: CONFIG.SHEETS.TEACHERS,
      color: "#059669",
      headers: ["teacher_id", "name", "email", "status"]
    },
    {
      name: CONFIG.SHEETS.CLASSES,
      color: "#0891b2",
      headers: ["class_id", "class_name", "teacher_id", "status"]
    },
    {
      name: CONFIG.SHEETS.QUESTIONS,
      color: "#d97706",
      headers: ["question_id", "section", "question", "option_a", "option_b", "option_c", "option_d", "correct_answer", "explanation", "difficulty"]
    },
    {
      name: CONFIG.SHEETS.ATTEMPTS,
      color: "#7c3aed",
      headers: ["attempt_id", "student_id", "student_name", "class_code", "section", "score", "total_questions", "started_at", "submitted_at"]
    },
    {
      name: CONFIG.SHEETS.ANSWERS,
      color: "#475569",
      headers: ["answer_id", "attempt_id", "question_id", "selected_answer", "is_correct"]
    },
    {
      name: CONFIG.SHEETS.PROGRESS,
      color: "#0d9488",
      headers: ["student_id", "section", "completion", "last_activity", "updated_at"]
    },
    {
      name: CONFIG.SHEETS.REFLECTIONS,
      color: "#be185d",
      headers: ["reflection_id", "student_id", "section", "response", "submitted_at"]
    }
  ];

  schemas.forEach(schema => {
    let sheet = ss.getSheetByName(schema.name);
    if (!sheet) {
      sheet = ss.insertSheet(schema.name);
    }

    // Cek apakah header sudah ada
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(schema.headers);
      
      // Styling Baris Header
      const headerRange = sheet.getRange(1, 1, 1, schema.headers.length);
      headerRange.setBackground(schema.color);
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);

      // Auto-resize kolom
      for (let c = 1; c <= schema.headers.length; c++) {
        sheet.setColumnWidth(c, 150);
      }
    }
  });

  // Hapus "Sheet1" default jika ada dan kosong
  const defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
    ss.deleteSheet(defaultSheet);
  }

  Logger.log("Inisialisasi 8 sheet database Google Spreadsheet berhasil diselesaikan!");
}

function getSheetSafe(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    setupDatabaseSheets();
    sheet = ss.getSheetByName(sheetName);
  }
  return sheet;
}
