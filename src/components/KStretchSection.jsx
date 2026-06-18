"use client";

import { useState } from "react";
import { kstretchWhatsappUrl } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function KStretchSection() {
  const [imgFailed, setImgFailed] = useState(false);

  const benefits = [
    "Mejorar la movilidad.",
    "Desarrollar mayor control corporal.",
    "Trabajar la postura de forma consciente.",
    "Acompañar el entrenamiento con progresiones claras.",
    "Favorecer una práctica más cuidada y sostenible."
  ];

  return (
    <section className="section kstretch-section" id="kstretch">
      <div className="kstretch-content">
        <SectionTitle
          eyebrow="Propuesta postural"
          title="¿Qué es K-Stretch®?"
          text="K-Stretch® es una propuesta de trabajo corporal y postural orientada a mejorar la movilidad, el control del movimiento, la fuerza y la conciencia corporal mediante sesiones guiadas y progresivas."
        />

        <p className="kstretch-description">
          En Katena, cada clase se realiza con consignas claras, acompañamiento profesional y progresiones adaptadas al punto de partida de cada persona.
        </p>

        <div className="kstretch-benefits-wrapper">
          <h3>Qué se trabaja en K-Stretch®</h3>
          <ul className="kstretch-benefits-list">
            {benefits.map((benefit, index) => (
              <li key={index} className="kstretch-benefit-item">
                <span className="kstretch-icon" aria-hidden="true">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="inline-actions">
          <a className="button primary" href={kstretchWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            Consultar por K-Stretch®
          </a>
          <a className="button ghost" href="#crossfy">
            Cómo reservar
          </a>
        </div>
      </div>

      <div className="kstretch-visual">
        {!imgFailed ? (
          <img
            src="/images/k-stretch-sala.png"
            alt="Sala de K-Stretch® en Katena"
            className="kstretch-image"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="kstretch-placeholder">
            <span aria-hidden="true">+</span>
            <strong>Foto de K-Stretch®</strong>
            <p>
              Ubicación esperada: <code>public/images/k-stretch-sala.png</code>.
              Se mostrará aquí automáticamente cuando agregues el archivo.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
