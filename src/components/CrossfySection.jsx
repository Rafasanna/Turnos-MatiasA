"use client";

import { useState } from "react";
import { CROSSFY_VIDEO_URL, whatsappUrl } from "../data/site";
import SectionTitle from "./SectionTitle";

const hasVideoUrl = CROSSFY_VIDEO_URL && !CROSSFY_VIDEO_URL.includes("PEGAR_LINK");

export default function CrossfySection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="section crossfy-section" id="crossfy">
      <div className="crossfy-content">
        <SectionTitle
          eyebrow="Cómo gestionamos las clases"
          title="Primero conversamos con vos"
          text="En KATENA utilizamos Crossfy para organizar horarios, reservas y asistencia. Antes de empezar, te pedimos que nos escribas por WhatsApp para orientarte, contarte qué propuesta se adapta mejor a vos y acompañarte en el primer paso dentro de la app."
        />
        <p className="crossfy-note">
          Primero te orientamos por WhatsApp; después te guiamos con Crossfy.
        </p>
        <div className="inline-actions">
          <a className="button primary btn-primary-with-arrow" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <span>Hablar con Matías</span>
            <span className="button-arrow" aria-hidden="true">→</span>
          </a>
          <a
            className={`button ghost${hasVideoUrl ? "" : " is-disabled"}`}
            href={hasVideoUrl ? CROSSFY_VIDEO_URL : undefined}
            target={hasVideoUrl ? "_blank" : undefined}
            rel={hasVideoUrl ? "noopener noreferrer" : undefined}
            aria-disabled={hasVideoUrl ? undefined : "true"}
          >
            Ver video explicativo
          </a>
        </div>
      </div>

      <div className="crossfy-visual">
        {!imgFailed ? (
          <img
            src="/images/katena/crossfy-katena.jpg"
            alt="Crossfy y KATENA"
            className="crossfy-image"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="crossfy-placeholder">
            <span aria-hidden="true">+</span>
            <strong>Imagen Crossfy + KATENA</strong>
            <p>
              Ubicación preparada: <code>public/images/katena/crossfy-katena.jpg</code>.
            </p>
            <p>
              Link del video: <code>CROSSFY_VIDEO_URL</code> en <code>src/data/site.js</code>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
