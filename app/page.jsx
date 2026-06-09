"use client";

import { useEffect, useMemo, useState } from "react";

const SHEET_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL || "";
const MATIAS_WHATSAPP = "5491133607786";
const MAX_CAPACITY = 4;

const demoSlots = [
  { id: "2026-06-16-1600", date: "2026-06-16", day: "Martes", time: "16:00", service: "K-Stretch postural", capacity: 4, active: true },
  { id: "2026-06-16-1700", date: "2026-06-16", day: "Martes", time: "17:00", service: "Fuerza funcional", capacity: 4, active: true },
  { id: "2026-06-16-1800", date: "2026-06-16", day: "Martes", time: "18:00", service: "K-Stretch postural", capacity: 4, active: true },
  { id: "2026-06-16-1900", date: "2026-06-16", day: "Martes", time: "19:00", service: "Fuerza funcional", capacity: 4, active: true },
  { id: "2026-06-18-1600", date: "2026-06-18", day: "Jueves", time: "16:00", service: "K-Stretch postural", capacity: 4, active: true },
  { id: "2026-06-18-1800", date: "2026-06-18", day: "Jueves", time: "18:00", service: "Fuerza funcional", capacity: 4, active: true },
  { id: "2026-06-23-1700", date: "2026-06-23", day: "Martes", time: "17:00", service: "Fuerza funcional", capacity: 4, active: true },
  { id: "2026-06-25-1900", date: "2026-06-25", day: "Jueves", time: "19:00", service: "K-Stretch postural", capacity: 4, active: true }
];

const demoReservations = [
  {
    id: "demo-1",
    nombre: "Paciente demo",
    whatsapp: "3515550000",
    email: "paciente@example.com",
    comentario: "Primera clase",
    fecha: "2026-06-16",
    horario: "16:00",
    slotId: "2026-06-16-1600",
    estado: "pendiente",
    createdAt: "2026-06-09T10:00:00.000Z"
  },
  {
    id: "demo-2",
    nombre: "Paciente demo 2",
    whatsapp: "3515551111",
    email: "",
    comentario: "",
    fecha: "2026-06-18",
    horario: "16:00",
    slotId: "2026-06-18-1600",
    estado: "confirmado",
    createdAt: "2026-06-09T11:00:00.000Z"
  },
  {
    id: "demo-3",
    nombre: "Paciente demo 3",
    whatsapp: "3515552222",
    email: "",
    comentario: "",
    fecha: "2026-06-18",
    horario: "16:00",
    slotId: "2026-06-18-1600",
    estado: "pendiente",
    createdAt: "2026-06-09T11:20:00.000Z"
  }
];

const services = [
  {
    icon: "↕",
    title: "K-Stretch postural",
    text: "Sesiones guiadas para mejorar movilidad, postura y flexibilidad sin forzar el cuerpo.",
    result: "Ideal para aliviar tensiones y recuperar eje corporal."
  },
  {
    icon: "↗",
    title: "Fuerza funcional",
    text: "Entrenamientos dinámicos, progresivos y adaptados para fortalecer con buena técnica.",
    result: "Ganás fuerza útil para moverte mejor en tu día a día."
  },
  {
    icon: "✓",
    title: "Reserva simple",
    text: "Elegís fecha y horario desde la web y dejás tus datos para coordinar la clase.",
    result: "Matías te confirma el turno por WhatsApp."
  }
];

const audience = [
  "Personas con molestias posturales o tensión recurrente.",
  "Quienes quieren mejorar movilidad y flexibilidad.",
  "Personas que buscan entrenar fuerza de forma segura.",
  "Quienes quieren reservar un horario concreto sin ida y vuelta innecesaria."
];

const faqs = [
  ["¿Necesito experiencia previa?", "No. Las clases se adaptan al punto de partida de cada persona."],
  ["¿Cuánto dura una clase?", "La duración se coordina con Matías según el tipo de entrenamiento y el grupo."],
  ["¿Cómo elijo mi horario?", "Seleccionás una fecha disponible, elegís el horario y completás tus datos."],
  ["¿Cómo se confirma el turno?", "La reserva queda registrada y Matías te confirma por WhatsApp."],
  ["¿Puedo cancelar o cambiar mi horario?", "Sí. Si no podés asistir, avisá con anticipación para liberar el cupo."]
];

const dateFormatter = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" });
const monthFormatter = new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" });

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

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+]/g, "");
}

function isReasonablePhone(value) {
  const normalized = normalizePhone(value).replace(/^\+/, "");
  return normalized.length >= 8 && normalized.length <= 15;
}

function activeReservation(reservation) {
  return ["pendiente", "confirmado"].includes(reservation.estado);
}

function readStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }
  const saved = window.localStorage.getItem(key);
  if (!saved) {
    return fallback;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
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
      reject(new Error("La agenda no respondió a tiempo."));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timer);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      if (data.ok) resolve(data);
      else reject(new Error(data.message || "No se pudo completar la operación."));
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo conectar con la agenda."));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

function calculateSlot(slot, reservations) {
  const used = reservations.filter((reservation) => reservation.slotId === slot.id && activeReservation(reservation)).length;
  const capacity = Number(slot.capacity || MAX_CAPACITY);
  const remaining = Math.max(capacity - used, 0);
  return { ...slot, capacity, used, remaining, isFull: remaining === 0 };
}

function slotLabel(slot) {
  if (slot.isFull) return "Completo";
  if (slot.remaining === 1) return "Último cupo";
  return "Disponible";
}

function Calendar({ availableDates, selectedDate, onSelectDate }) {
  if (!availableDates.length || !selectedDate) {
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
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
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
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [formValues, setFormValues] = useState({ nombre: "", whatsapp: "", email: "", comentario: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");

  const hydratedSlots = useMemo(
    () => slots.filter((slot) => slot.active).map((slot) => calculateSlot(slot, reservations)),
    [slots, reservations]
  );
  const availableDates = useMemo(() => [...new Set(hydratedSlots.map((slot) => slot.date))].sort(), [hydratedSlots]);
  const slotsForDate = useMemo(
    () => hydratedSlots.filter((slot) => slot.date === selectedDate),
    [hydratedSlots, selectedDate]
  );
  const selectedSlot = useMemo(
    () => hydratedSlots.find((slot) => slot.id === selectedSlotId),
    [hydratedSlots, selectedSlotId]
  );

  async function loadData() {
    try {
      setMessage("Cargando turnos...");
      setIsError(false);
      if (SHEET_API_URL) {
        const data = await requestSheet({ action: "slots" });
        setSlots(data.slots || []);
        setReservations(data.reservations || []);
      } else {
        setSlots(readStorage("katena-demo-slots", demoSlots));
        setReservations(readStorage("katena-demo-reservations", demoReservations));
      }
      setMessage("");
    } catch {
      setSlots(readStorage("katena-demo-slots", demoSlots));
      setReservations(readStorage("katena-demo-reservations", demoReservations));
      setMessage("Se muestran turnos demo porque no se pudo conectar con la agenda.");
      setIsError(true);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!availableDates.length) {
      setSelectedDate("");
      return;
    }
    setSelectedDate((current) => (availableDates.includes(current) ? current : availableDates[0]));
  }, [availableDates]);

  useEffect(() => {
    const selectable = slotsForDate.filter((slot) => !slot.isFull);
    if (!selectable.length) {
      setSelectedSlotId("");
      return;
    }
    setSelectedSlotId((current) => (selectable.some((slot) => slot.id === current) ? current : selectable[0].id));
  }, [slotsForDate]);

  function updateField(event) {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};
    const normalizedPhone = normalizePhone(formValues.whatsapp);
    if (!selectedDate) nextErrors.date = "Elegí una fecha disponible.";
    if (!selectedSlotId || !selectedSlot || selectedSlot.isFull) nextErrors.slot = "Elegí un horario con cupo.";
    if (!formValues.nombre.trim()) nextErrors.nombre = "Ingresá tu nombre y apellido.";
    if (!formValues.whatsapp.trim()) nextErrors.whatsapp = "Ingresá tu WhatsApp.";
    else if (!isReasonablePhone(formValues.whatsapp)) nextErrors.whatsapp = "Ingresá un WhatsApp válido.";

    const duplicated = reservations.some((reservation) => {
      return (
        reservation.slotId === selectedSlotId &&
        activeReservation(reservation) &&
        normalizePhone(reservation.whatsapp) === normalizedPhone
      );
    });
    if (duplicated) nextErrors.whatsapp = "Ese WhatsApp ya tiene una reserva para este horario.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function buildReservation(slot) {
    return {
      id: `res-${Date.now()}`,
      nombre: formValues.nombre.trim(),
      whatsapp: normalizePhone(formValues.whatsapp),
      email: formValues.email.trim(),
      comentario: formValues.comentario.trim(),
      fecha: slot.date,
      horario: slot.time,
      slotId: slot.id,
      estado: "pendiente",
      createdAt: new Date().toISOString()
    };
  }

  function buildWhatsappLink(reservation) {
    const text = [
      "Hola Matías, quiero reservar un turno:",
      `Nombre: ${reservation.nombre}`,
      `WhatsApp: ${reservation.whatsapp}`,
      `Fecha: ${dateFormatter.format(createLocalDate(reservation.fecha))}`,
      `Horario: ${reservation.horario}`,
      `Comentario: ${reservation.comentario || "-"}`
    ].join("\n");
    return `https://wa.me/${MATIAS_WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setWhatsappLink("");
    if (!validate()) {
      setMessage("Revisá los campos marcados antes de confirmar.");
      setIsError(true);
      return;
    }

    const reservation = buildReservation(selectedSlot);

    try {
      setMessage("Registrando reserva...");
      setIsError(false);
      if (SHEET_API_URL) {
        await requestSheet({ action: "reserve", ...reservation });
        await loadData();
      } else {
        const nextReservations = [...reservations, reservation];
        setReservations(nextReservations);
        saveStorage("katena-demo-reservations", nextReservations);
      }
      setWhatsappLink(buildWhatsappLink(reservation));
      setFormValues({ nombre: "", whatsapp: "", email: "", comentario: "" });
      setMessage("Tu reserva fue registrada. Matías te va a confirmar por WhatsApp.");
      setIsError(false);
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    }
  }

  const selectedDateText = selectedDate ? dateFormatter.format(createLocalDate(selectedDate)) : "Sin fecha";

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
            <h1>Prof. Matías Aramburu</h1>
            <p className="hero-lead">
              Elegí día y horario para reservar tu turno online.
            </p>
            <div className="hero-actions">
              <a className="button primary hero-cta" href="#turnos">Reservar turno</a>
              <a className="button ghost" href="#propuesta">Ver propuesta</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Prof. Matías Aramburu">
            <img className="hero-logo-watermark" src="/assets/logo-katena.jpg" alt="" />
            <img className="hero-portrait" src="/assets/profesor.jpg" alt="Prof. Matías Aramburu" />
            <div className="hero-stat hero-stat-top">
              <strong>K-Stretch</strong>
              <span>Entrenamiento postural</span>
            </div>
            <div className="hero-stat hero-stat-bottom">
              <strong>Reserva online</strong>
              <span>Fecha y horario</span>
            </div>
          </div>
        </section>

        <section id="propuesta" className="section intro">
          <div>
            <p className="eyebrow">Propuesta</p>
            <h2>Entrená con técnica, cuidado y seguimiento real</h2>
          </div>
          <p>
            Katena combina entrenamiento postural K-Stretch y fuerza funcional para ayudarte a moverte mejor,
            aliviar tensiones y ganar confianza corporal en un entorno cercano, claro y profesional.
          </p>
        </section>

        <section className="feature-grid" aria-label="Servicios">
          {services.map((service) => (
            <article className="feature" key={service.title}>
              <span className="feature-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <strong>{service.result}</strong>
            </article>
          ))}
        </section>

        <section className="section audience-section">
          <div>
            <p className="eyebrow">¿Para quién es?</p>
            <h2>Para personas que quieren entrenar mejor, no solo entrenar más</h2>
          </div>
          <ul className="audience-list">
            {audience.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="gallery">
          <img src="/assets/studio-reformer.jpg" alt="Sala equipada para entrenamiento postural" />
          <img src="/assets/fuerza.jpg" alt="Elementos para entrenamiento de fuerza" />
        </section>

        <section id="turnos" className="section booking-section">
          <div className="booking-copy">
            <p className="eyebrow">Reserva online</p>
            <h2>Elegí fecha y horario</h2>
            <p>
              Los turnos quedan sujetos a confirmación por WhatsApp. Si no podés asistir, avisá con anticipación
              para liberar el cupo.
            </p>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="calendar-field">
              <Calendar availableDates={availableDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              {errors.date ? <small className="field-error">{errors.date}</small> : null}
            </div>

            <fieldset>
              <legend>Horarios disponibles</legend>
              <div className="slot-list" aria-live="polite">
                {slotsForDate.length ? (
                  slotsForDate.map((slot) => (
                    <label className={`slot-option ${slot.remaining <= 2 && !slot.isFull ? "low-stock" : ""} ${slot.isFull ? "full" : ""}`} key={slot.id}>
                      <input
                        type="radio"
                        name="slotId"
                        value={slot.id}
                        checked={selectedSlotId === slot.id}
                        disabled={slot.isFull}
                        onChange={() => setSelectedSlotId(slot.id)}
                      />
                      <span>
                        <strong>{slot.time}</strong>
                        <em>{slotLabel(slot)}</em>
                      </span>
                    </label>
                  ))
                ) : (
                  <div className="empty-slots">No quedan turnos disponibles para esta fecha.</div>
                )}
              </div>
              {errors.slot ? <small className="field-error">{errors.slot}</small> : null}
            </fieldset>

            <div className="form-grid">
              <label>
                Nombre y apellido
                <input name="nombre" value={formValues.nombre} onChange={updateField} autoComplete="name" placeholder="Ej: María Pérez" />
                {errors.nombre ? <small className="field-error">{errors.nombre}</small> : null}
              </label>
              <label>
                WhatsApp
                <input name="whatsapp" value={formValues.whatsapp} onChange={updateField} autoComplete="tel" placeholder="Ej: 351 555 1234" />
                {errors.whatsapp ? <small className="field-error">{errors.whatsapp}</small> : null}
              </label>
            </div>

            <label>
              Email
              <input name="email" value={formValues.email} onChange={updateField} type="email" autoComplete="email" placeholder="opcional" />
            </label>

            <label>
              Comentario
              <textarea name="comentario" value={formValues.comentario} onChange={updateField} rows={3} placeholder="Dolor, objetivo o consulta previa" />
            </label>

            <div className="booking-summary">
              <strong>Resumen de reserva</strong>
              <dl>
                <div><dt>Fecha</dt><dd>{selectedDateText}</dd></div>
                <div><dt>Horario</dt><dd>{selectedSlot?.time || "Sin horario"}</dd></div>
                <div><dt>Nombre</dt><dd>{formValues.nombre || "Pendiente"}</dd></div>
                <div><dt>WhatsApp</dt><dd>{formValues.whatsapp || "Pendiente"}</dd></div>
                {formValues.comentario ? <div><dt>Comentario</dt><dd>{formValues.comentario}</dd></div> : null}
              </dl>
            </div>

            <button className="button primary submit" type="submit">Confirmar reserva</button>
            <p className={`form-message ${isError ? "error" : ""}`} role="status">{message}</p>
            {whatsappLink ? <a className="whatsapp-after" href={whatsappLink} target="_blank" rel="noreferrer">Enviar mensaje a Matías por WhatsApp</a> : null}
          </form>
        </section>

        <section className="section faq-section">
          <div>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Antes de reservar</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
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
              También podés consultar disponibilidad por WhatsApp. Reservas y consultas para K-Stretch y fuerza
              funcional.
            </p>
          </div>
          <div className="footer-actions">
            <a href="mailto:katenapostural@gmail.com">katenapostural@gmail.com</a>
            <a href="https://www.instagram.com/katenapostural" target="_blank" rel="noreferrer">Instagram @katenapostural</a>
            <a className="footer-whatsapp" href={`https://wa.me/${MATIAS_WHATSAPP}`} target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
          </div>
        </footer>
      </main>
    </>
  );
}
