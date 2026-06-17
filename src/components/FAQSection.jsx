import { contact, faqs, whatsappUrl } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <SectionTitle eyebrow="Preguntas frecuentes" title="Antes de empezar" />
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            {item.question === "¿Qué es K-Stretch?" ? (
              <p>
                <a className="faq-inline-link" href="#kstretch">
                  K-Stretch
                </a>{" "}
                es un trabajo postural y de flexibilidad global orientado a reequilibrar cadenas musculares y miofasciales, mejorar movilidad y reducir compensaciones.
              </p>
            ) : (
              <p>{item.answer}</p>
            )}
            {item.question === "¿Cómo consulto horarios disponibles?" ? (
              <div className="faq-actions">
                <a className="button primary faq-button" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  Consultar por WhatsApp
                </a>
              </div>
            ) : null}
            {item.question === "¿Dónde está ubicado Katena?" ? (
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
