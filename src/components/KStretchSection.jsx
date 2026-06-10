"use client";

import { useState } from "react";
import { contact, kstretchWhatsappUrl } from "../data/site";
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
          text={
            <>
              <strong>K-Stretch®</strong> es una propuesta de trabajo corporal y postural orientada a mejorar la <strong>movilidad</strong>, el <strong>control del movimiento</strong>, la <strong>fuerza</strong> y la <strong>conciencia corporal</strong>, mediante sesiones guiadas y progresivas.
            </>
          }
        />

        <p className="kstretch-description">
          En Katena, las sesiones de K-Stretch® se desarrollan con <strong>consignas claras</strong>, <strong>acompañamiento profesional personalizado</strong> y progresiones adaptadas al punto de partida de cada persona. Nuestra propuesta busca que la práctica no sea simplemente moverse, sino <strong>comprender cómo responde el cuerpo</strong>, mejorar la calidad de cada movimiento y consolidar un <strong>entrenamiento consciente, seguro y sostenible</strong> en el tiempo.
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
          <a className="button primary" href={contact.crossfyUrl} target="_blank" rel="noopener noreferrer">
            Reservar clase
          </a>
          <a className="button ghost" href={kstretchWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            Consultar por K-Stretch®
          </a>
        </div>
      </div>

      <div className="kstretch-visual">
        {!imgFailed ? (
          <img
            src="/images/kstretch-equipo.jpg"
            alt="Equipo de K-Stretch® en un espacio de entrenamiento"
            className="kstretch-image"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="kstretch-placeholder">
            <span aria-hidden="true">+</span>
            <strong>Foto de K-Stretch®</strong>
            <p>
              Ubicación esperada: <code>public/images/kstretch-equipo.jpg</code>.
              Se mostrará aquí automáticamente cuando agregues el archivo.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
