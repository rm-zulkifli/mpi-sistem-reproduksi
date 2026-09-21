/**
 * CONFIG.GS - KONFIGURASI APLIKASI GOOGLE APPS SCRIPT
 * Media Pembelajaran Interaktif (MPI) Sistem Reproduksi Manusia SMP/MTs
 */

const CONFIG = {
  APP_NAME: "MPI Sistem Reproduksi Manusia - SMP Fase D",
  VERSION: "1.0.0",
  KKM_SCORE: 75,
  
  // Nama-nama Sheet Database
  SHEETS: {
    STUDENTS: "Students",
    TEACHERS: "Teachers",
    CLASSES: "Classes",
    QUESTIONS: "Questions",
    ATTEMPTS: "Attempts",
    ANSWERS: "Answers",
    PROGRESS: "Progress",
    REFLECTIONS: "Reflections"
  },

  // Response Builder Standar
  buildResponse(success, message, data = {}) {
    const output = {
      success: success,
      message: message,
      timestamp: new Date().toISOString(),
      data: data
    };
    return ContentService.createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);
  }
};
