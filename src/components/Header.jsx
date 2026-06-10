import Image from "next/image";
import { headerCta, navItems } from "../data/site";

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio de Katena">
        <Image src="/assets/logo-katena.jpg" alt="" width={44} height={44} priority />
        <span>Katena</span>
      </a>
      <div className="header-navigation">
        <nav className="desktop-nav" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="header-cta" href={headerCta.href}>
          <span className="header-cta-desktop">{headerCta.label}</span>
          <span className="header-cta-mobile">Reservar clase</span>
        </a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu de navegacion">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </summary>
          <nav aria-label="Navegacion mobile">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
