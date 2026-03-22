// CMS Data Schema — Projects
// Cada proyecto puede tener una imageUrl (requerida) y un videoUrl opcional (YouTube o Vimeo).
// Para añadir un video, usa el link de YouTube/Vimeo normal (no embed).

export const projects = [
  {
    id: 1,
    title: "Casa Moderna Las Condes",
    description:
      "Construcción completa de residencia de dos pisos con diseño contemporáneo, fachada ventilada y amplios ventanales.",
    category: "Construcción",
    imageUrl: "/images/house_modern.png",
    videoUrl: "https://www.instagram.com/p/C8dbS5Xt6pO/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==", // Reemplaza con URL real
    location: "Las Condes, Santiago",
    year: 2024,
    featured: true,
  },
  {
    id: 2,
    title: "Remodelación Integral Ñuñoa",
    description:
      "Remodelación completa de cocina y living-comedor, planta abierta, pisos de madera y terminaciones premium.",
    category: "Remodelación",
    imageUrl: "/images/home_remodel.png",
    videoUrl: null, // Sin video — solo imagen
    location: "Ñuñoa, Santiago",
    year: 2024,
    featured: false,
  },
  {
    id: 3,
    title: "Quincho Premium La Florida",
    description:
      "Diseño y construcción de quincho con parrilla empotrada, pérgola de madera y área de lounge exterior.",
    category: "Quincho",
    imageUrl: "/images/quincho.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Reemplaza con URL real
    location: "La Florida, Santiago",
    year: 2023,
    featured: true,
  },
  {
    id: 4,
    title: "Ampliación Pudahuel",
    description:
      "Ampliación de segundo piso de 65 m², incluyendo dos habitaciones, baño completo y estudio con vista al jardín.",
    category: "Ampliación",
    imageUrl: "/images/construction_site.png",
    videoUrl: null,
    location: "Pudahuel, Santiago",
    year: 2023,
    featured: false,
  },
  {
    id: 5,
    title: "Cierre Perimetral Lo Barnechea",
    description:
      "Diseño e instalación de cierre perimetral en acero y hormigón para propiedad residencial de alta gama.",
    category: "Cierre Perimetral",
    imageUrl: "/images/fence.png",
    videoUrl: null,
    location: "Lo Barnechea, Santiago",
    year: 2024,
    featured: false,
  },
  {
    id: 6,
    title: "Construcción Residencial Maipú",
    description:
      "Proyecto de construcción completa: fundaciones, estructura, albañilería, terminaciones y pintura exterior.",
    category: "Construcción",
    imageUrl: "/images/construction_site.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Reemplaza con URL real
    location: "Maipú, Santiago",
    year: 2025,
    featured: true,
  },
];

export const categories = ["Todos", "Construcción", "Remodelación", "Quincho", "Ampliación", "Cierre Perimetral"];
