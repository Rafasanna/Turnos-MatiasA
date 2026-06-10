import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://turnos-matias-a.vercel.app"),
  title: {
    default: "Katena | Entrenamiento postural y fuerza",
    template: "%s | Katena"
  },
  description:
    "Katena es el espacio profesional de Matías Aramburu para entrenamiento postural, K-Stretch®, fuerza, movilidad y acompañamiento profesional.",
  openGraph: {
    title: "Katena | Entrenamiento postural y fuerza",
    description:
      "Conocé Katena, las actividades disponibles, K-Stretch® y el acompañamiento profesional del Prof. Matías Aramburu.",
    url: "https://turnos-matias-a.vercel.app",
    siteName: "Katena",
    images: [
      {
        url: "/assets/profesor.jpg",
        width: 1200,
        height: 900,
        alt: "Katena entrenamiento postural y fuerza"
      }
    ],
    locale: "es_AR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Katena | Entrenamiento postural y fuerza",
    description:
      "Entrenamiento postural, K-Stretch®, fuerza funcional y movilidad con seguimiento profesional."
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
