const SHEET_NAMES = {
  slots: "Horarios",
  bookings: "Reservas"
};

const PROFESSIONAL_EMAIL = "katenapostural@gmail.com";

function doGet(event) {
  const action = event.parameter.action || "slots";

  if (action === "slots") {
    return jsonp(event, getAgendaPayload());
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
    const name = params.nombre || params.name;
    const phone = params.whatsapp || params.phone;

    if (!slotId || !name || !phone) {
      return jsonp(event, { ok: false, message: "Faltan datos obligatorios." });
    }

    const payload = getAgendaPayload();
    const slot = payload.slots.find((item) => item.id === slotId);
    if (!slot || !slot.active) {
      return jsonp(event, { ok: false, message: "Ese horario no esta disponible." });
    }

    const occupied = payload.reservations.filter((reservation) => {
      return reservation.slotId === slotId && isActiveReservation(reservation.estado);
    }).length;

    if (slot.capacity - occupied <= 0) {
      return jsonp(event, { ok: false, message: "Ese horario ya no tiene cupo." });
    }

    const duplicated = payload.reservations.some((reservation) => {
      return (
        reservation.slotId === slotId &&
        isActiveReservation(reservation.estado) &&
        normalizePhone(reservation.whatsapp) === normalizePhone(phone)
      );
    });

    if (duplicated) {
      return jsonp(event, { ok: false, message: "Ese WhatsApp ya tiene una reserva para este horario." });
    }

    const sheet = getSheet(SHEET_NAMES.bookings);
    const reservationId = `res-${Date.now()}`;
    sheet.appendRow([
      reservationId,
      new Date(),
      slotId,
      slot.date,
      slot.day,
      slot.time,
      slot.service,
      name,
      phone,
      params.email || "",
      params.comentario || params.notes || "",
      "pendiente"
    ]);

    notifyProfessional(slot, { name, phone, email: params.email, notes: params.comentario || params.notes });

    return jsonp(event, { ok: true, message: "Reserva registrada." });
  } finally {
    lock.releaseLock();
  }
}

function getAgendaPayload() {
  return { ok: true, slots: getSlots(), reservations: getReservations() };
}

function getSlots() {
  const slotsSheet = getSheet(SHEET_NAMES.slots);
  const slotRows = rowsToObjects(slotsSheet.getDataRange().getValues());

  return slotRows.map((row) => {
    const id = String(row.ID || "").trim();
    const capacity = Number(row.Capacidad || 4);

    return {
      id,
      date: formatDate(row.Fecha),
      day: String(row.Dia || "").trim(),
      time: formatTime(row.Hora),
      service: String(row.Servicio || "").trim(),
      capacity,
      active: String(row.Activo).toUpperCase() !== "FALSE"
    };
  });
}

function getReservations() {
  const bookingsSheet = getSheet(SHEET_NAMES.bookings);
  const bookingRows = rowsToObjects(bookingsSheet.getDataRange().getValues());

  return bookingRows.map((row, index) => {
    return {
      id: String(row.ID || row.Id || `sheet-${index + 1}`).trim(),
      slotId: String(row.SlotID || "").trim(),
      fecha: formatDate(row.Fecha),
      horario: formatTime(row.Hora),
      nombre: String(row.Nombre || "").trim(),
      whatsapp: String(row.WhatsApp || "").trim(),
      email: String(row.Email || "").trim(),
      comentario: String(row.Comentario || "").trim(),
      estado: String(row.Estado || "pendiente").trim().toLowerCase(),
      createdAt: formatDateTime(row.Creada)
    };
  });
}

function isActiveReservation(status) {
  return ["pendiente", "confirmado"].includes(String(status || "").toLowerCase());
}

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+]/g, "");
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

function formatDateTime(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss");
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
