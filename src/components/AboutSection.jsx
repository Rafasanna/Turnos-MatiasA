"use client";

import { useState, useEffect } from "react";
import { proposalHighlights } from "../data/site";
import SectionTitle from "./SectionTitle";

function getHighlightIcon(index) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20h16M4 20v-3h4v-4h4v-4h4v-4h4v15" />
          <path d="M4 15l4-3 4-3 4-4 4 1" stroke="var(--blue)" strokeWidth="2.5" />
          <path d="M16 5h4v4" stroke="var(--blue)" strokeWidth="2.5" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <circle cx="4" cy="12" r="2" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <circle cx="12" cy="10" r="2" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <circle cx="20" cy="14" r="2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: "/images/carrusel-1.jpg",
      alt: "Espacio de entrenamiento Katena"
    },
    {
      src: "/images/carrusel-2.jpg",
      alt: "Equipamiento de entrenamiento postural"
    },
    {
      src: "/images/katena-banner.jpg",
      alt: "Clase de entrenamiento postural y fuerza en Katena"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="section split-section" id="sobre-katena">
      <SectionTitle
        eyebrow="Sobre Katena"
        title="Entrenar mejor, con criterio y continuidad"
        text="Katena combina entrenamiento postural, fuerza y movilidad para construir una experiencia clara, cercana y sostenible."
      />
      <div className="text-panel">
        <p>
          La propuesta prioriza la <strong>técnica</strong>, la <strong>progresión</strong> y la <strong>escucha del cuerpo</strong>. Cada clase busca que entiendas qué estás trabajando y cómo avanzar con seguridad.
        </p>
        <p>
          El espacio está pensado para una <strong>experiencia cercana y profesional</strong>, con indicaciones claras, correcciones y seguimiento constante.
        </p>
      </div>
      <div className="proposal-grid" aria-label="Puntos destacados de la propuesta">
        {proposalHighlights.map((item, index) => (
          <article className="proposal-card" key={item.title}>
            <div className="proposal-icon-container">
              {getHighlightIcon(index)}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      
      {/* Carrusel de fotos interactivo (Auto-play) */}
      <div className="wide-image carrusel-container">
        <div className="carrusel-track">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`carrusel-slide ${index === currentSlide ? "active" : ""}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="carrusel-image"
              />
            </div>
          ))}
        </div>

        {/* Indicadores (dots) */}
        <div className="carrusel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carrusel-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a la imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
