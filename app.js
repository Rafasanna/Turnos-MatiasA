const SHEET_API_URL = "";

const demoSlots = [
  { id: "2026-06-16-1600", date: "2026-06-16", day: "Martes", time: "16:00", service: "K-Stretch postural", capacity: 5, reserved: 1, active: true },
  { id: "2026-06-16-1700", date: "2026-06-16", day: "Martes", time: "17:00", service: "Fuerza funcional", capacity: 5, reserved: 2, active: true },
  { id: "2026-06-16-1800", date: "2026-06-16", day: "Martes", time: "18:00", service: "K-Stretch postural", capacity: 5, reserved: 5, active: true },
  { id: "2026-06-16-1900", date: "2026-06-16", day: "Martes", time: "19:00", service: "Fuerza funcional", capacity: 5, reserved: 0, active: true },
  { id: "2026-06-18-1600", date: "2026-06-18", day: "Jueves", time: "16:00", service: "K-Stretch postural", capacity: 5, reserved: 3, active: true },
  { id: "2026-06-18-1800", date: "2026-06-18", day: "Jueves", time: "18:00", service: "Fuerza funcional", capacity: 5, reserved: 0, active: true },
  { id: "2026-06-23-1700", date: "2026-06-23", day: "Martes", time: "17:00", service: "Fuerza funcional", capacity: 5, reserved: 0, active: true },
  { id: "2026-06-25-1900", date: "2026-06-25", day: "Jueves", time: "19:00", service: "K-Stretch postural", capacity: 5, reserved: 0, active: true }
];

const state = {
  slots: [],
  selectedDate: ""
};

const calendarTitle = document.querySelector("#calendarTitle");
const calendarGrid = document.querySelector("#calendarGrid");
const dateInput = document.querySelector("#dateInput");
const slotList = document.querySelector("#slotList");
const bookingForm = document.querySelector("#bookingForm");
const formMessage = document.querySelector("#formMessage");
const dateFormatter = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" });
const monthFormatter = new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" });

function readDemoSlots() {
  const saved = localStorage.getItem("katena-demo-slots");
  if (!saved) {
    return demoSlots.map((slot) => ({ ...slot }));
  }

  const slots = JSON.parse(saved);
  return slots.every((slot) => slot.date) ? slots : demoSlots.map((slot) => ({ ...slot }));
}

function saveDemoSlots(slots) {
  localStorage.setItem("katena-demo-slots", JSON.stringify(slots));
}

async function fetchSlots() {
  if (!SHEET_API_URL) {
    return readDemoSlots();
  }

  const data = await requestSheet({ action: "slots" });
  return data.slots;
}

function getAvailableSlots() {
  return state.slots.filter((slot) => slot.active && Number(slot.capacity) - Number(slot.reserved) > 0);
}

function getAvailableDates() {
  return [...new Set(getAvailableSlots().map((slot) => slot.date))].sort();
}

function createLocalDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderCalendar() {
  const availableDates = getAvailableDates();
  state.selectedDate = availableDates.includes(state.selectedDate) ? state.selectedDate : availableDates[0] || "";
  dateInput.value = state.selectedDate;

  if (!availableDates.length) {
    calendarTitle.textContent = "";
    calendarGrid.innerHTML = '<div class="empty-slots">No hay fechas disponibles.</div>';
    return;
  }

  const monthDate = createLocalDate(state.selectedDate);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const availableSet = new Set(availableDates);
  const cells = [];

  calendarTitle.textContent = monthFormatter.format(monthDate);

  for (let index = 0; index < startOffset; index += 1) {
    cells.push('<span class="calendar-empty"></span>');
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const isoDate = formatIsoDate(date);
    const isAvailable = availableSet.has(isoDate);
    const isSelected = isoDate === state.selectedDate;
    cells.push(`
      <button
        class="calendar-day ${isSelected ? "selected" : ""}"
        type="button"
        data-date="${isoDate}"
        ${isAvailable ? "" : "disabled"}
        aria-label="${dateFormatter.format(date)}"
      >
        ${day}
      </button>
    `);
  }

  calendarGrid.innerHTML = cells.join("");
}

function renderSlots() {
  const slots = getAvailableSlots().filter((slot) => slot.date === state.selectedDate);

  if (!slots.length) {
    slotList.innerHTML = '<div class="empty-slots">No quedan turnos disponibles para esta fecha.</div>';
    return;
  }

  slotList.innerHTML = slots
    .map(
      (slot, index) => `
        <label class="slot-option">
          <input type="radio" name="slotId" value="${slot.id}" ${index === 0 ? "checked" : ""} required />
          <span>${slot.time}</span>
        </label>
      `
    )
    .join("");
}

function render() {
  renderCalendar();
  renderSlots();
}

function setMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("error", isError);
}

function requestSheet(params) {
  return new Promise((resolve, reject) => {
    const callbackName = `katenaCallback_${Date.now()}_${Math.round(Math.random() * 100000)}`;
    const script = document.createElement("script");
    const url = new URL(SHEET_API_URL);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    url.searchParams.set("callback", callbackName);

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("La planilla no respondio a tiempo."));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timer);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      if (data.ok) {
        resolve(data);
      } else {
        reject(new Error(data.message || "No se pudo completar la operacion."));
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo conectar con la planilla."));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

async function reserveWithSheet(payload) {
  const data = await requestSheet({ action: "reserve", ...payload });
  if (!data.ok) {
    throw new Error(data.message || "No se pudo confirmar la reserva.");
  }
  return data;
}

function reserveDemo(slotId) {
  const slots = readDemoSlots();
  const slot = slots.find((item) => item.id === slotId);
  if (!slot || Number(slot.capacity) - Number(slot.reserved) <= 0) {
    throw new Error("Ese horario ya no tiene cupo.");
  }
  slot.reserved = Number(slot.reserved) + 1;
  saveDemoSlots(slots);
}

async function loadSlots() {
  try {
    setMessage("Cargando turnos...");
    state.slots = await fetchSlots();
    render();
    setMessage("");
  } catch (error) {
    state.slots = readDemoSlots();
    render();
    setMessage("Se muestran turnos demo porque no se pudo conectar con la planilla.", true);
  }
}

calendarGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-date]");
  if (!button || button.disabled) {
    return;
  }
  state.selectedDate = button.dataset.date;
  dateInput.value = state.selectedDate;
  renderCalendar();
  renderSlots();
});

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const payload = Object.fromEntries(formData.entries());
  const slot = state.slots.find((item) => item.id === payload.slotId);

  if (!slot) {
    setMessage("Elegí un horario disponible.", true);
    return;
  }

  try {
    setMessage("Confirmando reserva...");
    if (SHEET_API_URL) {
      await reserveWithSheet(payload);
    } else {
      reserveDemo(payload.slotId);
    }
    bookingForm.reset();
    state.selectedDate = slot.date;
    await loadSlots();
    setMessage(`Reserva confirmada para ${dateFormatter.format(createLocalDate(slot.date))} a las ${slot.time}.`);
  } catch (error) {
    setMessage(error.message, true);
  }
});

loadSlots();
