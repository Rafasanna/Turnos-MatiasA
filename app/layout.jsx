import "./globals.css";

export const metadata = {
  title: "Katena | Entrenamiento postural y fuerza",
  description:
    "Katena, espacio de entrenamiento postural K-Stretch y fuerza a cargo del Prof. Matias Aramburu. Reserva de turnos online."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
