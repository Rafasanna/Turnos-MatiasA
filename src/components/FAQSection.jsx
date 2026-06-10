import { faqs } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <SectionTitle eyebrow="Preguntas frecuentes" title="Antes de empezar" />
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
