import { activities } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function ServicesSection() {
  return (
    <section className="section activities-section" id="actividades">
      <SectionTitle
        eyebrow="Actividades"
        title="Actividades disponibles"
        text="Clases y espacios de entrenamiento que podés consultar o reservar."
      />
      <div className="activities-grid">
        {activities.map((activity) => (
          <article className="activity-card" key={`${activity.title}-${activity.badge || activity.status}`}>
            <div className="activity-card-head">
              <span aria-hidden="true">+</span>
              {activity.badge ? <strong>{activity.badge}</strong> : null}
            </div>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <a className="activity-booking" href={activity.bookingUrl} target="_blank" rel="noopener noreferrer">
              Reservar clase
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
