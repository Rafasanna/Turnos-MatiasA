"use client";

import { useState } from "react";
import SectionTitle from "./SectionTitle";

export default function ProfessionalSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="section professional-section" id="quien-esta-detras">
      <div className="professional-content">
        <SectionTitle
          eyebrow="Profesional a cargo"
          title="Quién está detrás de KATENA"
          text="Soy Matías Aramburu, profesor y fundador de KATENA. Acompaño a cada persona a mejorar su postura, ganar fuerza y moverse con más confianza, respetando sus tiempos, objetivos y necesidades."
        />
      </div>

      <div className="professional-visual">
        {!imgFailed ? (
          <img
            src="/images/matias-quien-soy.png"
            alt="Matías Aramburu, profesor y fundador de KATENA"
            className="professional-image"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="portrait-placeholder">
            <span aria-hidden="true">MA</span>
            <strong>Matías Aramburu</strong>
            <p>Profesor y fundador de KATENA</p>
          </div>
        )}
      </div>
    </section>
  );
}
