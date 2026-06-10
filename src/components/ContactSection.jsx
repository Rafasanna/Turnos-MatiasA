import Image from "next/image";
import { contact, whatsappUrl } from "../data/site";

export default function ContactSection() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="footer-main">
        <div className="footer-brand">
          <Image src="/assets/logo-katena.jpg" alt="" width={76} height={76} />
          <div>
            <p className="eyebrow">Contacto</p>
            <h2>Katena Entrenamiento Postural y Fuerza</h2>
          </div>
        </div>
        <p>
          Escribí para consultar por actividades, disponibilidad o para coordinar tu primera clase.
        </p>
        <p className="footer-note">
          Las reservas se gestionan desde CrossfyApp. Si tenés dudas antes de reservar, podés escribir por WhatsApp.
        </p>
      </div>
      <div className="footer-contact-panel" aria-label="Canales de contacto">
        <div className="footer-primary-actions">
          <a className="footer-primary-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <span>Consultar por WhatsApp</span>
            <small>Responder consultas antes de reservar</small>
          </a>
          <a className="footer-primary-link secondary" href={contact.crossfyUrl} target="_blank" rel="noopener noreferrer">
            <span>Reservar por CrossfyApp</span>
            <small>Ver horarios y confirmar tu lugar</small>
          </a>
        </div>
        <div className="footer-secondary-links">
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">{contact.email}</a>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
        </div>
      </div>
    </footer>
  );
}
