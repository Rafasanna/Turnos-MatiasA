"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { headerCta, navItems, whatsappUrl } from "../data/site";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) {
        return;
      }

      setIsMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      {isMenuOpen ? (
        <button
          type="button"
          className="mobile-menu-overlay"
          aria-label="Cerrar menu de navegacion"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}
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
          <a className="header-cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <span className="header-cta-desktop">{headerCta.label}</span>
            <span className="header-cta-mobile">{headerCta.mobileLabel}</span>
          </a>
          <details
            className="mobile-menu"
            open={isMenuOpen}
            onToggle={(event) => setIsMenuOpen(event.currentTarget.open)}
            ref={menuRef}
          >
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
    </>
  );
}
