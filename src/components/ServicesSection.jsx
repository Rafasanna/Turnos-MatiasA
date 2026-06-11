import { activities } from "../data/site";
import SectionTitle from "./SectionTitle";

const activityIcons = {
  "Entrenamiento fuerza": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9v6" />
      <path d="M9 7v10" />
      <path d="M15 7v10" />
      <path d="M19 9v6" />
      <path d="M9 12h6" />
    </svg>
  ),
  Fuerza: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 20V10" />
      <path d="M17 20V10" />
      <path d="M5 20h14" />
      <path d="M8 10c0-2.2 1.6-4 4-4s4 1.8 4 4" />
      <path d="M10 6V4" />
      <path d="M14 6V4" />
    </svg>
  ),
  "K-Stretch®": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5a2 2 0 1 0 0.01 0" />
      <path d="M12 8v5" />
      <path d="M8 12h8" />
      <path d="M10 13l-3 5" />
      <path d="M14 13l3 5" />
    </svg>
  ),
  "K-Stretch® Postural": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16" />
      <path d="M8 8c1.1-1.2 2.4-1.8 4-1.8s2.9 0.6 4 1.8" />
      <path d="M8 16c1.1 1.2 2.4 1.8 4 1.8s2.9-0.6 4-1.8" />
      <path d="M6 12h12" />
    </svg>
  )
};

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
              <span className="activity-icon" aria-hidden="true">
                {activityIcons[activity.title]}
              </span>
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
