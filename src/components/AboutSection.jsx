import { proposalHighlights } from "../data/site";
import ImagePlaceholder from "./ImagePlaceholder";
import SectionTitle from "./SectionTitle";

export default function AboutSection() {
  return (
    <section className="section split-section" id="sobre-katena">
      <SectionTitle
        eyebrow="Sobre Katena"
        title="Entrenar mejor, con criterio y continuidad"
        text="Katena combina entrenamiento postural, fuerza y movilidad para construir una experiencia clara, cercana y sostenible."
      />
      <div className="text-panel">
        <p>
          La propuesta prioriza la técnica, la progresión y la escucha del cuerpo. Cada clase busca que entiendas
          qué estás trabajando y cómo avanzar con seguridad.
        </p>
        <p>
          El espacio está pensado para una experiencia cercana y profesional, con indicaciones claras,
          correcciones y seguimiento.
        </p>
      </div>
      <div className="proposal-grid" aria-label="Puntos destacados de la propuesta">
        {proposalHighlights.map((item) => (
          <article className="proposal-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <div className="wide-image">
        <ImagePlaceholder
          label="Acá irá un carrusel de fotos"
          note="Espacio reservado para imágenes del lugar, clases y detalles de Katena."
          variant="gallery-placeholder"
        />
      </div>
    </section>
  );
}
