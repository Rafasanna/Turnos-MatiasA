import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://turnos-matias-a.vercel.app"),
  title: {
    default: "KATENA | Entrenamiento postural y fuerza",
    template: "%s | KATENA"
  },
  description:
    "KATENA es un centro de entrenamiento postural y fuerza con guía profesional, técnica cuidada, K-Stretch, movilidad y acompañamiento personalizado.",
  openGraph: {
    title: "KATENA | Entrenamiento postural y fuerza",
    description:
      "Conocé KATENA: entrenamiento postural y fuerza, K-Stretch, movilidad, técnica y acompañamiento profesional.",
    url: "https://turnos-matias-a.vercel.app",
    siteName: "KATENA",
    images: [
      {
        url: "/assets/profesor.jpg",
        width: 1200,
        height: 900,
        alt: "KATENA entrenamiento postural y fuerza"
      }
    ],
    locale: "es_AR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "KATENA | Entrenamiento postural y fuerza",
    description:
      "Entrenamiento postural, K-Stretch, fuerza consciente y movilidad con seguimiento profesional."
  },
  icons: {
    icon: "/assets/logo-katena.jpg",
    apple: "/assets/logo-katena.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
