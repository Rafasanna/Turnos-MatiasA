"use client";

import { useEffect, useMemo, useState } from "react";

const SHEET_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL || "";

const demoSlots = [
  {
    id: "2026-06-16-1600",
    date: "2026-06-16",
    day: "Martes",
    time: "16:00",
    service: "K-Stretch postural",
    capacity: 5,
    reserved: 1,
    active: true
  },
  {
    id: "2026-06-16-1700",
    date: "2026-06-16",
    day: "Martes",
    time: "17:00",
    service: "Fuerza funcional",
    capacity: 5,
    reserved: 2,
    active: true
  },
  {
    id: "2026-06-16-1800",
    date: "2026-06-16",
    day: "Martes",
    time: "18:00",
    service: "K-Stretch postural",
    capacity: 5,
    reserved: 5,
    active: true
  },
  {
    id: "2026-06-16-1900",
    date: "2026-06-16",
    day: "Martes",
    time: "19:00",
    service: "Fuerza funcional",
    capacity: 5,
    reserved: 0,
    active: true
  },
  {
    id: "2026-06-18-1600",
    date: "2026-06-18",
    day: "Jueves",
    time: "16:00",
    service: "K-Stretch postural",
    capacity: 5,
    reserved: 3,
    active: true
  },
  {
    id: "2026-06-18-1800",
    date: "2026-06-18",
    day: "Jueves",
    time: "18:00",
    service: "Fuerza funcional",
    capacity: 5,
    reserved: 0,
    active: true
  },
  {
    id: "2026-06-23-1700",
    date: "2026-06-23",
    day: "Martes",
    time: "17:00",
    service: "Fuerza funcional",
    capacity: 5,
    reserved: 0,
    active: true
  },
  {
    id: "2026-06-25-1900",
    date: "2026-06-25",
    day: "Jueves",
    time: "19:00",
    service: "K-Stretch postural",
    capacity: 5,
    reserved: 0,
    active: true
  }
];

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long"
});

const monthFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  year: "numeric"
});

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

function readDemoSlots() {
  if (typeof window === "undefined") {
    return demoSlots.map((slot) => ({ ...slot }));
  }

  const saved = window.localStorage.getItem("katena-demo-slots");
  if (!saved) {
    return demoSlots.map((slot) => ({ ...slot }));
  }

  const slots = JSON.parse(saved);
  return slots.every((slot) => slot.date) ? slots : demoSlots.map((slot) => ({ ...slot }));
}

function saveDemoSlots(slots) {
  window.localStorage.setItem("katena-demo-slots", JSON.stringify(slots));
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

function getAvailableSlots(slots) {
  return slots.filter((slot) => slot.active && Number(slot.capacity) - Number(slot.reserved) > 0);
}

function Calendar({ availableDates, selectedDate, onSelectDate }) {
  if (!availableDates.length) {
    return <div className="empty-slots">No hay fechas disponibles.</div>;
  }

  const monthDate = createLocalDate(selectedDate);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const availableSet = new Set(availableDates);
  const cells = [];

  for (let index = 0; index < startOffset; index += 1) {
    cells.push(<span className="calendar-empty" key={`empty-${index}`} />);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const isoDate = formatIsoDate(date);
    const isAvailable = availableSet.has(isoDate);
    const isSelected = isoDate === selectedDate;

    cells.push(
      <button
        aria-label={dateFormatter.format(date)}
        className={`calendar-day ${isSelected ? "selected" : ""}`}
        data-date={isoDate}
        disabled={!isAvailable}
        key={isoDate}
        onClick={() => onSelectDate(isoDate)}
        type="button"
      >
        {day}
      </button>
    );
  }

  return (
    <>
      <div className="field-heading">
        <span>Fecha</span>
        <strong>{monthFormatter.format(monthDate)}</strong>
      </div>
      <div className="calendar-weekdays" aria-hidden="true">
        <span>Lun</span>
        <span>Mar</span>
        <span>Mie</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sab</span>
        <span>Dom</span>
      </div>
      <div className="calendar-grid" aria-label="Fechas disponibles">
        {cells}
      </div>
    </>
  );
}

export default function Home() {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const availableSlots = useMemo(() => getAvailableSlots(slots), [slots]);
  const availableDates = useMemo(
    () => [...new Set(availableSlots.map((slot) => slot.date))].sort(),
    [availableSlots]
  );
  const slotsForDate = useMemo(
    () => availableSlots.filter((slot) => slot.date === selectedDate),
    [availableSlots, selectedDate]
  );

  async function loadSlots() {
    try {
      setMessage("Cargando turnos...");
      setIsError(false);
      const nextSlots = SHEET_API_URL ? (await requestSheet({ action: "slots" })).slots : readDemoSlots();
      setSlots(nextSlots);
      setMessage("");
    } catch {
      setSlots(readDemoSlots());
      setMessage("Se muestran turnos demo porque no se pudo conectar con la planilla.");
      setIsError(true);
    }
  }

  useEffect(() => {
    loadSlots();
  }, []);

  useEffect(() => {
    if (!availableDates.length) {
      setSelectedDate("");
      return;
    }

    setSelectedDate((current) => (availableDates.includes(current) ? current : availableDates[0]));
  }, [availableDates]);

  useEffect(() => {
    if (!slotsForDate.length) {
      setSelectedSlotId("");
      return;
    }

    setSelectedSlotId((current) =>
      slotsForDate.some((slot) => slot.id === current) ? current : slotsForDate[0].id
    );
  }, [slotsForDate]);

  async function reserveDemo(slotId) {
    const currentSlots = readDemoSlots();
    const slot = currentSlots.find((item) => item.id === slotId);
    if (!slot || Number(slot.capacity) - Number(slot.reserved) <= 0) {
      throw new Error("Ese horario ya no tiene cupo.");
    }
    slot.reserved = Number(slot.reserved) + 1;
    saveDemoSlots(currentSlots);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const slot = slots.find((item) => item.id === payload.slotId);

    if (!slot) {
      setMessage("Elegí un horario disponible.");
      setIsError(true);
      return;
    }

    try {
      setMessage("Confirmando reserva...");
      setIsError(false);
      if (SHEET_API_URL) {
        await requestSheet({ action: "reserve", ...payload });
      } else {
        await reserveDemo(payload.slotId);
      }
      event.currentTarget.reset();
      setSelectedDate(slot.date);
      await loadSlots();
      setMessage(`Reserva confirmada para ${dateFormatter.format(createLocalDate(slot.date))} a las ${slot.time}.`);
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Inicio Katena">
          <img src="/assets/logo-katena.jpg" alt="Katena" />
          <span>Katena</span>
        </a>
        <nav aria-label="Principal">
          <a href="#propuesta">Propuesta</a>
          <a href="#turnos">Turnos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Katena entrenamiento postural y fuerza</p>
            <h1>Prof. Matias Aramburu</h1>
            <p>
              Un espacio para recuperar movilidad, flexibilidad y confianza corporal con grupos reducidos y
              acompañamiento profesional.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#turnos">
                Reservar turno
              </a>
              <a className="button ghost" href="#propuesta">
                Ver propuesta
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Prof. Matias Aramburu">
            <img className="hero-logo-watermark" src="/assets/logo-katena.jpg" alt="" />
            <img className="hero-portrait" src="/assets/profesor.jpg" alt="Prof. Matias Aramburu" />
            <div className="hero-stat hero-stat-top">
              <strong>K-Stretch</strong>
              <span>Entrenamiento postural</span>
            </div>
            <div className="hero-stat hero-stat-bottom">
              <strong>Fuerza</strong>
              <span>Grupos reducidos</span>
            </div>
          </div>
        </section>

        <section id="propuesta" className="section intro">
          <div>
            <p className="eyebrow">Katena</p>
            <h2>Entrenamiento funcional en grupos reducidos</h2>
          </div>
          <p>
            Especializado en entrenamiento postural K-Stretch y entrenamiento funcional de fuerza. Las clases
            combinan trabajo corporal, movilidad y fuerza para mejorar molestias, dolores y rendimiento cotidiano.
          </p>
        </section>

        <section className="feature-grid" aria-label="Servicios">
          <article className="feature">
            <span className="feature-icon">01</span>
            <h3>K-Stretch postural</h3>
            <p>Trabajo guiado para movilidad, flexibilidad, eje corporal y descarga de tensiones.</p>
          </article>
          <article className="feature">
            <span className="feature-icon">02</span>
            <h3>Fuerza funcional</h3>
            <p>Entrenamientos dinamicos y semi personalizados para fortalecer el cuerpo.</p>
          </article>
          <article className="feature">
            <span className="feature-icon">03</span>
            <h3>Grupos reducidos</h3>
            <p>Clases con seguimiento cercano para conservar tecnica, calidad y atencion.</p>
          </article>
        </section>

        <section className="gallery">
          <img src="/assets/studio-reformer.jpg" alt="Sala equipada para entrenamiento postural" />
          <img src="/assets/fuerza.jpg" alt="Elementos para entrenamiento de fuerza" />
        </section>

        <section id="turnos" className="section booking-section">
          <div className="booking-copy">
            <p className="eyebrow">Reserva online</p>
            <h2>Elegir dia y horario</h2>
            <p>
              Reservá tu clase en pocos pasos. Elegí un horario disponible, dejá tus datos y recibí la confirmacion
              para coordinar tu entrenamiento.
            </p>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="calendar-field">
              <Calendar availableDates={availableDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              <input name="date" type="hidden" value={selectedDate} readOnly required />
            </div>

            <fieldset>
              <legend>Horarios disponibles</legend>
              <div className="slot-list" aria-live="polite">
                {slotsForDate.length ? (
                  slotsForDate.map((slot) => (
                    <label className="slot-option" key={slot.id}>
                      <input
                        type="radio"
                        name="slotId"
                        value={slot.id}
                        checked={selectedSlotId === slot.id}
                        onChange={() => setSelectedSlotId(slot.id)}
                        required
                      />
                      <span>{slot.time}</span>
                    </label>
                  ))
                ) : (
                  <div className="empty-slots">No quedan turnos disponibles para esta fecha.</div>
                )}
              </div>
            </fieldset>

            <div className="form-grid">
              <label>
                Nombre y apellido
                <input name="name" autoComplete="name" required placeholder="Ej: Maria Perez" />
              </label>
              <label>
                WhatsApp
                <input name="phone" autoComplete="tel" required placeholder="Ej: 351 555 1234" />
              </label>
            </div>

            <label>
              Email
              <input name="email" type="email" autoComplete="email" placeholder="opcional" />
            </label>

            <label>
              Comentario
              <textarea name="notes" rows={3} placeholder="Dolor, objetivo o consulta previa" />
            </label>

            <button className="button primary submit" type="submit">
              Confirmar reserva
            </button>
            <p className={`form-message ${isError ? "error" : ""}`} role="status">
              {message}
            </p>
          </form>
        </section>

        <footer id="contacto" className="site-footer">
          <div className="footer-main">
            <div className="footer-brand">
              <img src="/assets/logo-katena.jpg" alt="Katena" />
              <div>
                <p className="eyebrow">Contacto</p>
                <h2>Katena Entrenamiento Postural y Fuerza</h2>
              </div>
            </div>
            <p>
              Reservas y consultas para entrenamiento postural K-Stretch y fuerza funcional en grupos reducidos.
            </p>
          </div>
          <div className="footer-actions">
            <a href="mailto:katenapostural@gmail.com">katenapostural@gmail.com</a>
            <a href="https://www.instagram.com/katenapostural" target="_blank" rel="noreferrer">
              Instagram @katenapostural
            </a>
            <a className="footer-whatsapp" href="https://wa.me/5491133607786" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
