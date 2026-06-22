import Image from "next/image";
import { contact, developerWhatsappUrl, whatsappUrl, navItems } from "../data/site";

export default function ContactSection() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Columna 1: Brand */}
          <div className="footer-column brand-column">
            <div className="footer-brand">
              <Image 
                src="/assets/logo-katena.jpg" 
                alt="Logo KATENA" 
                width={48} 
                height={48} 
              />
              <span>KATENA</span>
            </div>
            <p className="footer-tagline">
              Acompañamiento personalizado • CABA
            </p>
          </div>

          {/* Columna 2: Navegación rápida */}
          <div className="footer-column">
            <h4>Navegación</h4>
            <nav className="footer-nav" aria-label="Navegación del pie de página">
              {navItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Columna 3: Contacto */}
          <div className="footer-column">
            <h4>Contacto</h4>
            <ul className="footer-contact-list">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="footer-link">
                  <svg className="footer-link-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                  <svg className="footer-link-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>{contact.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="footer-link">
                  <svg className="footer-link-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>{contact.email}</span>
                </a>
              </li>
              <li>
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                  <svg className="footer-link-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Cómo llegar / Ubicación</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Consulta */}
          <div className="footer-column cta-column">
            <h4>Consulta inicial</h4>
            <p className="footer-cta-text">
              Escribinos y te orientamos según tu objetivo.
            </p>
            
            <a className="button primary footer-cta-btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} KATENA. Todos los derechos reservados.</p>
          <a className="footer-credit" href={developerWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            Diseño &amp; desarrollo web · Rafaela Sanna
          </a>
        </div>

        <div className="footer-legal">
          <details>
            <summary>Términos y condiciones</summary>
            <p>
              La web es informativa y permite solicitar orientación sobre las propuestas de KATENA. Horarios, cupos y actividades pueden modificarse. La coordinación inicial se realiza por WhatsApp y la gestión de clases puede organizarse mediante Crossfy. Las clases no reemplazan una consulta médica. Ante lesiones, dolor o condiciones particulares, la persona debe consultar con un profesional de salud.
            </p>
          </details>
          <details>
            <summary>Política de Privacidad</summary>
            <p>
              En KATENA cuidamos la privacidad de quienes visitan este sitio y se comunican para consultar por las actividades.
            </p>
            <p>
              Podemos solicitar datos básicos como nombre, teléfono, actividad de interés y mensaje, únicamente para responder consultas y brindar información sobre las actividades disponibles.
            </p>
            <p>
              Los datos recibidos no se venden ni se comparten con terceros con fines comerciales.
            </p>
            <p>
              Al comunicarse por WhatsApp desde este sitio, la persona acepta que sus datos sean utilizados para gestionar su consulta.
            </p>
            <p>
              En cualquier momento se puede solicitar la modificación o eliminación de los datos personales escribiendo al canal de contacto informado en la web.
            </p>
            <p>
              Este sitio puede incluir enlaces a plataformas externas como WhatsApp, Instagram o Google Maps, que cuentan con sus propias políticas de privacidad.
            </p>
            <p>
              KATENA podrá actualizar esta política cuando sea necesario.
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}
