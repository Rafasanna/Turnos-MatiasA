"use client";

import { useEffect, useState } from "react";

const demoReservations = [];

function readReservations() {
  if (typeof window === "undefined") {
    return demoReservations;
  }
  const saved = window.localStorage.getItem("katena-demo-reservations");
  return saved ? JSON.parse(saved) : demoReservations;
}

function saveReservations(reservations) {
  window.localStorage.setItem("katena-demo-reservations", JSON.stringify(reservations));
}

export default function AdminPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setReservations(readReservations());
  }, []);

  function updateStatus(id, estado) {
    const nextReservations = reservations.map((reservation) =>
      reservation.id === id ? { ...reservation, estado } : reservation
    );
    setReservations(nextReservations);
    saveReservations(nextReservations);
  }

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <div className="admin-heading">
          <p className="eyebrow">Panel simple</p>
          <h1>Reservas Katena</h1>
          <p>Vista básica para revisar reservas y cambiar estado en modo demo local.</p>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Día</th>
                <th>Horario</th>
                <th>Nombre</th>
                <th>WhatsApp</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length ? (
                reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.fecha}</td>
                    <td>{reservation.horario}</td>
                    <td>{reservation.nombre}</td>
                    <td>{reservation.whatsapp}</td>
                    <td><span className={`status-pill ${reservation.estado}`}>{reservation.estado}</span></td>
                    <td>
                      <div className="admin-actions">
                        <button type="button" onClick={() => updateStatus(reservation.id, "confirmado")}>
                          Confirmar
                        </button>
                        <button type="button" onClick={() => updateStatus(reservation.id, "cancelado")}>
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Todavía no hay reservas registradas en este navegador.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
