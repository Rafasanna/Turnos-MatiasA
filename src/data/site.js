export const contact = {
  whatsappNumber: "5491133607786",
  instagramUrl: "https://www.instagram.com/katenapostural",
  instagramHandle: "@katenapostural",
  email: "katenapostural@gmail.com",
  location: "Buenos Aires",
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
  "Clases pensadas para mejorar tu postura, movilidad y bienestar, con acompañamiento profesional en cada proceso."
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
    title: "K-Stretch®",
    description:
      "Espacio de K-Stretch® sujeto a disponibilidad. Consultar horarios desde la app.",
    bookingUrl: contact.crossfyUrl,
    status: "standby",
    badge: "Sujeto a disponibilidad"
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
      "Excelente lugar e impecable la atención. Matías está pendiente para que puedas hacer los ejercicios con la técnica correcta. Una clase dinámica que se adapta al nivel de cada persona y salís renovado. ¡100% recomendado!",
    author: "Alumno/a de Katena",
    rating: 5,
    time: "Hace 3 meses"
  },
  {
    quote:
      "Excelente profesional Matías A. Talleres de fuerza y postura, atención personalizada, dedicación y cuidado responsable. Recomiendo para quienes estamos cruzando los 50 y tenemos actividades sedentarias o problemas posturales.",
    author: "Alumno/a de Katena",
    rating: 5,
    time: "Hace 3 meses"
  },
  {
    quote:
      "Arranqué esta última semana y ya noté mejoras en mi postura. El profesor Matias siempre muy atento, escucha y se toma el tiempo para explicar cada ejercicio. Espacio cómodo y bien iluminado. Recomendadísimo.",
    author: "Alumno/a de Katena",
    rating: 5,
    time: "Hace 3 meses"
  },
  {
    quote:
      "Mati, un excelente profesional. Empático, dedicado, creativo, ameno.. Cuida a cada uno de sus alumnos y verifica que hagan los ejercicios correctamente. Acercate y comprobalo por ti mismo: súper recomendable.",
    author: "Alumno/a de Katena",
    rating: 5,
    time: "Hace 3 meses"
  },
  {
    quote:
      "Las clases de Matias 10/10! El lugar también me encanta que tenga luz natural. Recomiendo la clase de K-Stretch® sea por algún dolor o para tener mayor bienestar. La clase de fuerza también la recomiendo, mati tiene mucha claridad para explicar y acompañar los ejercicios escuchando a tu cuerpo.",
    author: "Alumno/a de Katena",
    rating: 5,
    time: "Hace 4 meses"
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

export const kstretchWhatsappMessage =
  "Hola Matías, vi la página de Katena y quería consultar por K-Stretch®.";

export function whatsappUrl() {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}

export function kstretchWhatsappUrl() {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(kstretchWhatsappMessage)}`;
} 