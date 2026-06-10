"use client";

import { useState, useEffect } from "react";
import { testimonials } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section testimonials-section" id="testimonios">
      <SectionTitle eyebrow="Experiencias" title="Opiniones de alumnos" />
      
      <div className="testimonials-carrusel-container">
        <div className="testimonials-track">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className={`testimonial-slide ${index === currentSlide ? "active" : ""}`}
            >
              <div className="testimonial-header">
                <div className="testimonial-user">
                  {/* Avatar anónimo circular en SVG */}
                  <div className="testimonial-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="testimonial-user-info">
                    <strong>{item.author}</strong>
                    <span className="testimonial-time">{item.time}</span>
                  </div>
                </div>

                {/* Estrellas */}
                <div className="testimonial-stars" aria-label={`Puntuación: ${item.rating} de 5 estrellas`}>
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="star-icon">★</span>
                  ))}
                </div>
              </div>

              <blockquote className="testimonial-quote">
                “{item.quote}”
              </blockquote>
            </div>
          ))}
        </div>

        {/* Indicadores (dots) */}
        <div className="testimonials-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
