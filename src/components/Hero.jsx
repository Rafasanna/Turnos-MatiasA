"use client";

import { siteInfo } from "../data/site";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-decor" aria-hidden="true">
        <span className="hero-decor-circle hero-decor-circle-one" />
        <span className="hero-decor-circle hero-decor-circle-two" />
        <span className="hero-decor-line hero-decor-line-one" />
        <span className="hero-decor-line hero-decor-line-two" />
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <p className="eyebrow">{siteInfo.heroEyebrow}</p>
          <h1>{siteInfo.heroTitle}</h1>
          <p className="hero-lead">{siteInfo.heroText}</p>
        </div>

        <a className="hero-scroll-cue" href="#katena" aria-label="Descubrir KATENA">
          <span>Descubrir</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14m0 0 6-6m-6 6-6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
