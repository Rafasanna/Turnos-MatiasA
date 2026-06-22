"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_SRC = "/assets/logo-katena.jpg";
const EXIT_DELAY = 1700;
const UNMOUNT_DELAY = 2200;

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("katena-splash-active");
    document.body.classList.remove("katena-splash-complete");

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, EXIT_DELAY);

    const unmountTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove("katena-splash-active");
      document.body.classList.add("katena-splash-complete");
    }, UNMOUNT_DELAY);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
      document.body.classList.remove("katena-splash-active");
      document.body.classList.add("katena-splash-complete");
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`splash-screen${isExiting ? " is-exiting" : ""}`} aria-label="KATENA">
      <div className="splash-brand">
        <Image
          className="splash-logo"
          src={LOGO_SRC}
          alt=""
          width={104}
          height={104}
          priority
        />
        <span>KATENA</span>
      </div>
    </div>
  );
}
