import { contact, faqs, headerCta } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <SectionTitle eyebrow="Preguntas frecuentes" title="Antes de empezar" />
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            {item.question === "¿Cómo funciona K-Stretch®?" ? (
              <p>
                <a className="faq-inline-link" href="#kstretch">
                  K-Stretch®
                </a>{" "}
                es una propuesta de trabajo corporal y postural orientada a movilidad, control, fuerza y conciencia corporal.
              </p>
            ) : (
              <p>{item.answer}</p>
            )}
            {item.question === "¿Cómo reservo una clase?" ? (
              <div className="faq-actions">
                <a className="button primary faq-button" href={headerCta.href}>
                  Reservar clase
                </a>
              </div>
            ) : null}
            {item.question === "¿Dónde está ubicado el espacio?" ? (
              <div className="faq-actions">
                <a className="button primary faq-button" href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Ver ubicación
                </a>
              </div>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  );
}
