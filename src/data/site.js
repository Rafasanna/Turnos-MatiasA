export const contact = {
  whatsappNumber: "5491133607786",
  instagramUrl: "https://www.instagram.com/katenapostural",
  email: "katenapostural@gmail.com",
  location: "Katena, Córdoba",
  mapsUrl: "https://maps.app.goo.gl/ozgapkPzz2RAR6ME9",
  crossfyUrl: "https://crossfyapp.com/"
};

export const whatsappMessage =
  "Hola Matías, quiero consultar por Katena y reservar una clase.";

export const siteInfo = {
  brandName: "Katena",
  professionalName: "Prof. Matías Aramburu",
  heroEyebrow: "Katena entrenamiento postural y fuerza",
  heroTitle: "Katena",
  heroText:
    "Entrenamiento postural, fuerza y movilidad con acompañamiento profesional del Prof. Matías Aramburu."
};

export const professionalSummary = {
  title: "Prof. Matías Aramburu",
  role: "Profesional a cargo de Katena",
  description: "Acompañamiento técnico, progresivo y cercano.",
  points: [
    "Evaluación y seguimiento",
    "Adaptación según objetivos y experiencia",
    "Técnica, progresión y continuidad"
  ]
};

export const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre Katena", href: "#sobre-katena" },
  { label: "FAQ", href: "#faq" },
  { label: "Actividades", href: "#actividades" },
  { label: "K-Stretch®", href: "#kstretch" },
  { label: "Contacto", href: "#contacto" }
];

export const headerCta = { label: "Reservar", href: "#actividades" };

export const proposalHighlights = [
  {
    title: "Técnica y progresión",
    description: "Consignas claras para avanzar de forma ordenada, sin apurar procesos."
  },
  {
    title: "Movimiento consciente",
    description: "Trabajo orientado a reconocer el cuerpo, mejorar control y sostener calidad de movimiento."
  },
  {
    title: "Seguimiento cercano",
    description: "Correcciones e indicaciones durante la clase para entrenar con más criterio."
  },
  {
    title: "Entrenamiento adaptado",
    description: "La propuesta se ajusta al punto de partida, objetivos y experiencia de cada persona."
  }
];

export const activities = [
  {
    title: "K-Stretch® Postural",
    description:
      "Trabajo corporal orientado a movilidad, control, postura y conciencia del movimiento.",
    bookingUrl: contact.crossfyUrl,
    status: "available"
  },
  {
    title: "Entrenamiento fuerza",
    description:
      "Clases enfocadas en fuerza, técnica y progresión, adaptadas al punto de partida de cada persona.",
    bookingUrl: contact.crossfyUrl,
    status: "available"
  },
  {
    title: "Entrenamiento Fuerza",
    description:
      "Espacio de entrenamiento de fuerza sujeto a disponibilidad. Consultar horarios desde la app.",
    bookingUrl: contact.crossfyUrl,
    status: "standby",
    badge: "Consultar disponibilidad"
  },
  {
    title: "K-Stretch®",
    description:
      "Espacio de K-Stretch® sujeto a disponibilidad. Consultar horarios desde la app.",
    bookingUrl: contact.crossfyUrl,
    status: "standby",
    badge: "Consultar disponibilidad"
  },
  {
    title: "Fuerza",
    description:
      "Clase de fuerza a cargo del Prof. Martín, orientada a técnica, progresión y continuidad.",
    bookingUrl: contact.crossfyUrl,
    status: "available",
    badge: "Prof. Martín"
  }
];

export const testimonials = [
  {
    quote:
      "Testimonio a completar con una experiencia real de una persona que entrena en Katena.",
    author: "Alumno/a de Katena"
  },
  {
    quote:
      "Espacio reservado para una opinión breve sobre el acompañamiento y la propuesta de trabajo.",
    author: "Testimonio pendiente"
  },
  {
    quote:
      "Más adelante se puede reemplazar este texto por una reseña real del cliente.",
    author: "Experiencia a completar"
  }
];

export const faqs = [
  {
    question: "¿Necesito experiencia previa?",
    answer:
      "No. La propuesta se adapta al punto de partida, condición física y objetivos de cada persona."
  },
  {
    question: "¿Cómo reservo una clase?",
    answer:
      "Las reservas se gestionan desde CrossfyApp. Desde ahí podés ver horarios disponibles y confirmar tu lugar."
  },
  {
    question: "¿Qué debo llevar a la primera sesión?",
    answer:
      "Ropa cómoda, agua y cualquier información relevante sobre molestias, lesiones o restricciones de movimiento."
  },
  {
    question: "¿Las clases son grupales o personalizadas?",
    answer:
      "Katena trabaja con seguimiento cercano. La modalidad puntual puede variar según el servicio y la disponibilidad."
  },
  {
    question: "¿Cómo funciona K-Stretch®?",
    answer:
      "Es una propuesta de trabajo corporal y postural orientada a movilidad, control, fuerza y conciencia corporal."
  },
  {
    question: "¿Dónde está ubicado el espacio?",
    answer:
      "Podés ver la ubicación desde el enlace de Google Maps en la sección de contacto."
  }
];

export function whatsappUrl() {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}
