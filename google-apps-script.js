const SHEET_NAMES = {
  slots: "Horarios",
  bookings: "Reservas"
};

const PROFESSIONAL_EMAIL = "katenapostural@gmail.com";

function doGet(event) {
  const action = event.parameter.action || "slots";

  if (action === "slots") {
    return jsonp(event, { ok: true, slots: getSlots() });
  }

  if (action === "reserve") {
    return createBooking(event);
  }

  return jsonp(event, { ok: false, message: "Accion no valida." });
}

function doPost(event) {
  return createBooking(event);
}

function createBooking(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const params = event.parameter;
    const slotId = params.slotId;
    const name = params.name;
    const phone = params.phone;

    if (!slotId || !name || !phone) {
      return jsonp(event, { ok: false, message: "Faltan datos obligatorios." });
    }

    const slot = getSlots().find((item) => item.id === slotId);
    if (!slot || !slot.active || slot.capacity - slot.reserved <= 0) {
      return jsonp(event, { ok: false, message: "Ese horario ya no esta disponible." });
    }

    const sheet = getSheet(SHEET_NAMES.bookings);
    sheet.appendRow([
      new Date(),
      slotId,
      slot.date,
      slot.day,
      slot.time,
      slot.service,
      name,
      phone,
      params.email || "",
      params.notes || "",
      "CONFIRMADO"
    ]);

    notifyProfessional(slot, params);

    return jsonp(event, { ok: true, message: "Reserva confirmada." });
  } finally {
    lock.releaseLock();
  }
}

function getSlots() {
  const slotsSheet = getSheet(SHEET_NAMES.slots);
  const bookingsSheet = getSheet(SHEET_NAMES.bookings);
  const slotRows = rowsToObjects(slotsSheet.getDataRange().getValues());
  const bookingRows = rowsToObjects(bookingsSheet.getDataRange().getValues());

  return slotRows.map((row) => {
    const id = String(row.ID || "").trim();
    const capacity = Number(row.Capacidad || 0);
    const reserved = bookingRows.filter((booking) => {
      return String(booking.SlotID).trim() === id && String(booking.Estado).toUpperCase() === "CONFIRMADO";
    }).length;

    return {
      id,
      date: formatDate(row.Fecha),
      day: String(row.Dia || "").trim(),
      time: formatTime(row.Hora),
      service: String(row.Servicio || "").trim(),
      capacity,
      reserved,
      active: String(row.Activo).toUpperCase() !== "FALSE"
    };
  });
}

function notifyProfessional(slot, params) {
  const subject = `Nueva reserva Katena - ${slot.day} ${slot.date} ${slot.time}`;
  const body = [
    "Nueva reserva desde la web:",
    "",
    `Fecha: ${slot.day} ${slot.date}`,
    `Horario: ${slot.time}`,
    `Servicio: ${slot.service}`,
    `Nombre: ${params.name}`,
    `WhatsApp: ${params.phone}`,
    `Email: ${params.email || "-"}`,
    `Comentario: ${params.notes || "-"}`
  ].join("\n");

  MailApp.sendEmail(PROFESSIONAL_EMAIL, subject, body);
}

function formatDate(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(value || "").trim();
}

function rowsToObjects(values) {
  const headers = values.shift().map((header) => String(header).trim());
  return values
    .filter((row) => row.some((cell) => cell !== ""))
    .map((row) => {
      return headers.reduce((object, header, index) => {
        object[header] = row[index];
        return object;
      }, {});
    });
}

function formatTime(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "HH:mm");
  }
  return String(value || "").trim();
}

function getSheet(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) {
    throw new Error(`No existe la hoja ${name}.`);
  }
  return sheet;
}

function jsonp(event, payload) {
  const callback = event.parameter.callback;
  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(payload)});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json(payload);
}

function json(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
