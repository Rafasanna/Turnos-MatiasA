import { testimonials } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonios">
      <SectionTitle eyebrow="Experiencias" title="Personas que entrenan en Katena" />
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <figure className="testimonial-card" key={testimonial.quote}>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>{testimonial.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
