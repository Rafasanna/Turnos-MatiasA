import { professionalSummary, siteInfo, whatsappUrl } from "../data/site";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <p className="eyebrow">{siteInfo.heroEyebrow}</p>
        <h1>{siteInfo.heroTitle}</h1>
        <p className="hero-lead">{siteInfo.heroText}</p>
        <div className="hero-professional-card" aria-label="Profesional a cargo">
          <strong>{professionalSummary.title}</strong>
          <span>{professionalSummary.role}</span>
          <p>{professionalSummary.description}</p>
        </div>
        <div className="hero-actions" aria-label="Acciones principales">
          <a className="button primary hero-cta" href="#actividades">
            Reservar clase
          </a>
          <a className="button ghost" href="#sobre-katena">Sobre Katena</a>
          <a className="button text-button" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="hero-visual" aria-label="Imagen principal pendiente para Katena">
        <ImagePlaceholder
          label="Carrusel principal pendiente"
          note="Fotos de Katena y Prof. Matías Aramburu."
          variant="hero-placeholder"
        />
        <div className="hero-chips" aria-label="Contenido visual pendiente">
          <span>Espacio Katena</span>
          <span>Prof. Matías Aramburu</span>
          <span>Actividades</span>
        </div>
      </div>
    </section>
  );
}
