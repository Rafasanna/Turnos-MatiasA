"use client";

import { useEffect, useRef, useState } from "react";
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
  const [failedSlides, setFailedSlides] = useState([]);
  const sectionRef = useRef(null);

  const futureSpaceSlides = [
    {
      src: "/images/katena/espacio-katena-1.jpg",
      alt: "Espacio de entrenamiento Katena"
    },
    {
      src: "/images/katena/espacio-katena-2.jpg",
      alt: "Equipamiento de entrenamiento postural"
    },
    {
      src: "/images/katena/espacio-katena-3.jpg",
      alt: "Clase de entrenamiento postural y fuerza en Katena"
    }
  ];

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

  const visibleSlides = slides.filter((slide) => !failedSlides.includes(slide.src));

  useEffect(() => {
    if (visibleSlides.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % visibleSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visibleSlides.length]);

  useEffect(() => {
    if (currentSlide >= visibleSlides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, visibleSlides.length]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealItems = section.querySelectorAll(".about-reveal");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    section.classList.add("about-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const markSlideFailed = (src) => {
    setFailedSlides((current) => (
      current.includes(src) ? current : [...current, src]
    ));
  };

  return (
    <section className="section split-section" id="katena" ref={sectionRef}>
      <SectionTitle
        className="about-reveal"
        eyebrow="Qué es Katena"
        title="No somos un gimnasio tradicional."
        text="Katena es un centro especializado en entrenamiento postural y de fuerza."
      />
      <div className="text-panel">
        <p className="about-reveal">
          No alquilamos máquinas ni vendemos horas de gimnasio: ofrecemos un sistema de educación y acondicionamiento corporal guiado por profesionales, pensado para mejorar la postura, la fuerza, la movilidad y la relación de cada persona con su cuerpo.
        </p>
      </div>
      <SectionTitle
        className="about-reveal wide-title"
        eyebrow="Nuestra forma de trabajar"
        title="Técnica, orden y acompañamiento"
        text="Una propuesta seria, prolija y cuidada para entrenar con sentido."
      />
      <div className="proposal-grid" aria-label="Puntos destacados de la propuesta">
        {proposalHighlights.map((item, index) => (
          <article
            className="proposal-card about-reveal"
            key={item.title}
            style={{ "--reveal-delay": `${index * 70}ms` }}
          >
            <div className="proposal-icon-container">
              {getHighlightIcon(index)}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      
      <SectionTitle
        className="about-reveal wide-title"
        eyebrow="El espacio"
        title="Un entorno preparado para entrenar con cuidado"
        text="Katena cuenta con un espacio ordenado, limpio y equipado para clases guiadas, con normas claras de convivencia, higiene y uso del material."
      />
      <div className="wide-image carrusel-container">
        <div className="carrusel-track">
          {visibleSlides.length > 0 ? (
            visibleSlides.map((slide, index) => (
              <div
                key={slide.src}
                className={`carrusel-slide ${index === currentSlide ? "active" : ""}`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="carrusel-image"
                  onError={() => markSlideFailed(slide.src)}
                />
              </div>
            ))
          ) : (
            <div className="carrusel-slide active">
              <div className="space-photo-fallback">
                <span aria-hidden="true">+</span>
                <strong>Imagen próximamente</strong>
                <p>
                  Rutas preparadas: <code>{futureSpaceSlides.map((slide) => slide.src).join(", ")}</code>
                </p>
              </div>
            </div>
          )}
        </div>

        {visibleSlides.length > 1 ? (
          <div className="carrusel-indicators">
            {visibleSlides.map((slide, index) => (
              <button
                key={slide.src}
                className={`carrusel-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
