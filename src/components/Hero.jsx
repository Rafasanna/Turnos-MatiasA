"use client";

import { useState } from "react";
import { siteInfo, whatsappUrl } from "../data/site";

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-content">
          <p className="eyebrow">{siteInfo.heroEyebrow}</p>
          <h1>{siteInfo.heroTitle}</h1>
          <p className="hero-lead">{siteInfo.heroText}</p>
          
          <div className="hero-actions" aria-label="Acciones principales">
            <a className="button primary hero-cta" href="#actividades">
              Reservar clase
            </a>
            <a className="button ghost" href="#sobre-katena">
              Sobre Katena
            </a>
            <a className="button text-button" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Prof. Matías Aramburu - Profesional a cargo de Katena">
          <div className="hero-photo-card">
            {!imgFailed ? (
              <img
                src="/images/matias-aramburu.jpg"
                alt="Prof. Matías Aramburu"
                className="hero-photo"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="hero-photo-placeholder">
                <span aria-hidden="true">👤</span>
                <strong>Prof. Matías Aramburu</strong>
                <p>Profesional a cargo</p>
              </div>
            )}
            
            <div className="hero-photo-badge">
              <strong>Prof. Matías Aramburu</strong>
              <span>Profesional a cargo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
