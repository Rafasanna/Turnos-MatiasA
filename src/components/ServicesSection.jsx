import { activities, whatsappUrl } from "../data/site";
import SectionTitle from "./SectionTitle";

const activityIcons = {
  "Entrenamiento de fuerza consciente": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9v6" />
      <path d="M9 7v10" />
      <path d="M15 7v10" />
      <path d="M19 9v6" />
      <path d="M9 12h6" />
    </svg>
  ),
  "Postura y flexibilidad global / K-Stretch": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5a2 2 0 1 0 0.01 0" />
      <path d="M12 8v5" />
      <path d="M8 12h8" />
      <path d="M10 13l-3 5" />
      <path d="M14 13l3 5" />
    </svg>
  )
};

export default function ServicesSection() {
  return (
    <section className="section activities-section" id="propuesta">
      <SectionTitle
        eyebrow="Qué ofrecemos"
        title="Dos pilares de trabajo"
        text="La propuesta se organiza en fuerza consciente y trabajo postural, con orientación previa por WhatsApp."
      />
      <div className="activities-grid">
        {activities.map((activity) => (
          <article className="activity-card" key={activity.title}>
            <div className="activity-card-content">
              <div className="activity-card-head">
                <span className="activity-icon" aria-hidden="true">
                  {activityIcons[activity.title]}
                </span>
              </div>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <a className="btn-primary-with-arrow activity-booking" href={whatsappUrl(activity.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                <span>{activity.ctaLabel}</span>
                <span className="button-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
