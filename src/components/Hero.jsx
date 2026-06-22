"use client";

import { useEffect, useState } from "react";
import { siteInfo, whatsappUrl } from "../data/site";

export default function Hero() {
  const [failedImages, setFailedImages] = useState([]);

  const markImageFailed = (src) => {
    setFailedImages((current) => (
      current.includes(src) ? current : [...current, src]
    ));
  };

  const heroImages = {
    logo: "/images/katena-logo-card.png",
    kstrech: "/images/katena-hero-kstrech.png",
    ambiente1: "/images/katena-hero-ambiente-1.jpg",
    ambiente2: "/images/katena-hero-ambiente-2.jpg"
  };

  const slides = [
    {
      src: heroImages.logo,
      alt: "KATENA entrenamiento postural y fuerza",
      fit: "contain",
      variant: "brand"
    },
    {
      src: heroImages.kstrech,
      alt: "Entrenamiento K-Stretch en KATENA",
      fit: "cover"
    },
    {
      src: heroImages.ambiente1,
      alt: "Espacio de entrenamiento de KATENA",
      fit: "cover"
    },
    {
      src: heroImages.ambiente2,
      alt: "Sala de trabajo postural en KATENA",
      fit: "cover"
    }
  ];

  const visibleSlides = slides.filter((slide) => !failedImages.includes(slide.src));
  const [currentSlide, setCurrentSlide] = useState(0);
  const isBrandSlide = visibleSlides[currentSlide]?.variant === "brand";

  useEffect(() => {
    if (visibleSlides.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % visibleSlides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [visibleSlides.length]);

  useEffect(() => {
    if (currentSlide >= visibleSlides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, visibleSlides.length]);

  return (
    <section className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-content">
          <p className="eyebrow">{siteInfo.heroEyebrow}</p>
          <h1>{siteInfo.heroTitle}</h1>
          <p className="hero-lead">{siteInfo.heroText}</p>
          
          <div className="hero-actions" aria-label="Acciones principales">
            <a className="button primary hero-cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Consultar
            </a>
            <a className="button ghost" href="#katena">
              Sobre KATENA
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="KATENA - Entrenamiento postural y fuerza">
          <div className="hero-image-composition">
            <div className={`hero-photo-card ${isBrandSlide ? "hero-photo-card-brand" : ""}`}>
              {visibleSlides.length > 0 ? (
                visibleSlides.map((slide, index) => (
                  <div
                    className={`hero-carousel-slide ${slide.variant === "brand" ? "hero-carousel-slide-brand" : ""} ${index === currentSlide ? "active" : ""}`}
                    key={slide.src}
                  >
                    {slide.variant === "brand" ? (
                      <div className="hero-brand-slide">
                        <div className="hero-brand-image-frame">
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className="hero-brand-image"
                            onError={() => markImageFailed(slide.src)}
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className={`hero-photo hero-photo-${slide.fit}`}
                        onError={() => markImageFailed(slide.src)}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="hero-photo-placeholder">
                  <span aria-hidden="true">K</span>
                  <strong>KATENA</strong>
                  <p>Entrenamiento postural y fuerza</p>
                </div>
              )}
            </div>

            {visibleSlides.length > 1 ? (
              <div className="hero-carousel-indicators" aria-label="Indicadores del carrusel principal">
                {visibleSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    className={`hero-carousel-dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Ver imagen ${index + 1} del hero`}
                    type="button"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
