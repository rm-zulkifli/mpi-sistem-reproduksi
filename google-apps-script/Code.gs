/**
 * CODE.GS - MAIN WEB APP ROUTER & ENTRYPOINT
 * Google Apps Script Web App untuk Media Pembelajaran Interaktif (MPI)
 */

function doGet(e) {
  try {
    const action = e.parameter.action || "ping";

    if (action === "ping") {
      return CONFIG.buildResponse(true, "Layanan Google Apps Script aktif dan siap menerima data", {
        app: CONFIG.APP_NAME,
        version: CONFIG.VERSION
      });
    }

    if (action === "initDatabase") {
      setupDatabaseSheets();
      return CONFIG.buildResponse(true, "Seluruh tabel database Google Spreadsheet berhasil diinisialisasi!");
    }

    if (action === "getTeacherDashboard") {
      return handleGetTeacherDashboard();
    }

    if (action === "getClasses") {
      return handleGetClasses();
    }

    if (action === "verifyTeacherPin") {
      return handleVerifyTeacherPin(e.parameter.pin);
    }

    return CONFIG.buildResponse(false, "Aksi GET tidak dikenali: " + action);
  } catch (err) {
    return CONFIG.buildResponse(false, "Terjadi kesalahan pada server: " + err.message);
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return CONFIG.buildResponse(false, "Payload data POST kosong.");
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return CONFIG.buildResponse(false, "Format JSON tidak valid: " + parseErr.message);
    }

    const action = payload.action;

    switch (action) {
      case "createStudent":
      case "loginStudent":
        return handleCreateStudent(payload);

      case "submitQuiz":
        return handleSubmitQuiz(payload);

      case "saveProgress":
        return handleSaveProgress(payload);

      case "saveReflection":
        return handleSaveReflection(payload);

      case "updateClasses":
        return handleUpdateClasses(payload);

      case "changeTeacherPin":
        return handleChangeTeacherPin(payload);

      case "getClasses":
        return handleGetClasses();

      case "verifyTeacherPin":
        return handleVerifyTeacherPin(payload.pin);

      default:
        return CONFIG.buildResponse(false, "Aksi POST tidak didukung: " + action);
    }
  } catch (err) {
    return CONFIG.buildResponse(false, "Terjadi galat pemrosesan POST: " + err.message);
  }
}
