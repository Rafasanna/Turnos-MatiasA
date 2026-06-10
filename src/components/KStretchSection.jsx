import { contact, whatsappUrl } from "../data/site";
import ImagePlaceholder from "./ImagePlaceholder";
import SectionTitle from "./SectionTitle";

export default function KStretchSection() {
  return (
    <section className="section kstretch-section" id="kstretch">
      <div>
        <SectionTitle
          eyebrow="Bloque destacado"
          title="K-Stretch®"
          text="Una propuesta de trabajo corporal y postural orientada a movilidad, control, fuerza y conciencia corporal."
        />
        <p>
          Las sesiones se desarrollan con una progresión cuidada y consignas claras. El objetivo es mejorar la
          calidad del movimiento y acompañar el entrenamiento con criterio profesional, sin promesas médicas ni
          soluciones mágicas.
        </p>
        <div className="inline-actions">
          <a className="button primary" href={contact.crossfyUrl} target="_blank" rel="noopener noreferrer">
            Reservar clase
          </a>
          <a className="button ghost" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Consultar por K-Stretch®
          </a>
        </div>
      </div>
      <ImagePlaceholder
        label="Imagen de K-Stretch®"
        note="Bloque preparado para foto o carrusel específico de esta propuesta."
        variant="soft-placeholder"
      />
    </section>
  );
}
