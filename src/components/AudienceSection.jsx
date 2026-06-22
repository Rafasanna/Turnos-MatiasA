"use client";

import { useEffect, useRef, useState } from "react";
import { audienceItems } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function AudienceSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const interactionRef = useRef(0);
  const isCarouselVisibleRef = useRef(false);

  const scrollTrackToSlide = (index, behavior = "smooth") => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];

    if (!track || !slide) {
      return;
    }

    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior
    });
  };

  const goToSlide = (index, isManual = false) => {
    const nextIndex = (index + audienceItems.length) % audienceItems.length;
    setCurrentSlide(nextIndex);

    if (isManual) {
      interactionRef.current = Date.now();
    }

    scrollTrackToSlide(nextIndex);
  };

  useEffect(() => {
    if (!window.matchMedia("(max-width: 560px)").matches) {
      return undefined;
    }

    const timer = setInterval(() => {
      if (!isCarouselVisibleRef.current || Date.now() - interactionRef.current < 4500) {
        return;
      }

      goToSlide(currentSlide + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      isCarouselVisibleRef.current = true;
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isCarouselVisibleRef.current = entry.isIntersecting;
      },
      {
        threshold: 0.42
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const markInteraction = () => {
      interactionRef.current = Date.now();
    };

    window.addEventListener("scroll", markInteraction, { passive: true });
    window.addEventListener("wheel", markInteraction, { passive: true });
    window.addEventListener("touchstart", markInteraction, { passive: true });
    window.addEventListener("keydown", markInteraction);

    return () => {
      window.removeEventListener("scroll", markInteraction);
      window.removeEventListener("wheel", markInteraction);
      window.removeEventListener("touchstart", markInteraction);
      window.removeEventListener("keydown", markInteraction);
    };
  }, []);

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const trackLeft = track.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentSlide(closestIndex);
  };

  return (
    <section className="section audience-section" ref={sectionRef}>
      <SectionTitle
        eyebrow="Para quién es KATENA"
        title="Entrenamiento guiado para objetivos reales"
      />
      <div
        className="audience-grid"
        ref={trackRef}
        onPointerDown={() => {
          interactionRef.current = Date.now();
        }}
        onTouchStart={() => {
          interactionRef.current = Date.now();
        }}
        onScroll={handleScroll}
      >
        {audienceItems.map((item, index) => (
          <article
            className="audience-card"
            key={item}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
          >
            <span aria-hidden="true">✓</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
      <div className="audience-carousel-controls" aria-label="Controles del carrusel">
        <button type="button" onClick={() => goToSlide(currentSlide - 1, true)} aria-label="Ver tarjeta anterior">
          ‹
        </button>
        <div className="audience-dots" aria-label="Indicadores del carrusel">
          {audienceItems.map((item, index) => (
            <button
              type="button"
              key={item}
              className={index === currentSlide ? "active" : ""}
              onClick={() => goToSlide(index, true)}
              aria-label={`Ver tarjeta ${index + 1}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => goToSlide(currentSlide + 1, true)} aria-label="Ver tarjeta siguiente">
          ›
        </button>
      </div>
    </section>
  );
}
