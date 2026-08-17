/**
 * PRODUCTOS DE EJEMPLO
 * ---------------------------------------------------------
 * Reemplaza este arreglo con tu catálogo real.
 *
 * Cada producto necesita:
 *  id        -> único, sin espacios (ej: "ambar-noche")
 *  name      -> nombre del perfume
 *  price     -> número, en pesos dominicanos (sin puntos ni comas)
 *  category  -> una de: "arabe", "nicho", "disenador"
 *  gender    -> una de: "hombre", "mujer", "unisex"
 *  desc      -> descripción corta (1 línea)
 *  image     -> ruta a la foto, ej: "assets/productos/ambar-noche.jpg"
 *               (déjalo como "" para usar el marcador de posición)
 *  notes     -> pirámide olfativa: salida / corazón / fondo
 */

// Nombres visibles de cada categoría (para los botones de filtro)
const CATEGORIES = {
  arabe: "Árabe",
  nicho: "Nicho",
  disenador: "Diseñador"
};

// Nombres visibles de cada género (para los botones de filtro)
const GENDERS = {
  hombre: "Hombre",
  mujer: "Mujer",
  unisex: "Unisex"
};

const PRODUCTS = [
  {
    id: "9pm-rebel",
    name: "9PM Rebel",
    price: 3000,
    category: "arabe",
    gender: "hombre",
    desc: "Envolvente y misterioso, hecho para la noche.",
    image: "assets/productos/9pm-rebel.jpg",
    notes: { salida: "Pimienta negra, bergamota", corazon: "Cuero, especias oscuras", fondo: "Ámbar, madera ahumada" }
  },
  {
    id: "9pm-elixir",
    name: "9PM Elixir",
    price: 2800,
    category: "arabe",
    gender: "unisex",
    desc: "Intenso y concentrado, larga duración.",
    image: "assets/productos/9pm-elixir.jpg",
    notes: { salida: "Canela, cardamomo", corazon: "Rosa oscura, incienso", fondo: "Ámbar, almizcle" }
  },
  {
    id: "9pm-pour-famme",
    name: "9PM Pour Famme",
    price: 2500,
    category: "arabe",
    gender: "mujer",
    desc: "Femenino y elegante, ideal para la noche.",
    image: "assets/productos/9pm-pour-famme.jpg",
    notes: { salida: "Frambuesa, bergamota", corazon: "Jazmín, iris", fondo: "Vainilla, almizcle" }
  },
  {
    id: "9am-pour-famme",
    name: "9AM Pour Famme",
    price: 2500,
    category: "arabe",
    gender: "mujer",
    desc: "Femenino y fresco, perfecto para el día.",
    image: "assets/productos/9am-pour-famme.jpg",
    notes: { salida: "Mandarina, pera", corazon: "Flor de azahar, peonía", fondo: "Almizcle blanco" }
  },
  {
    id: "9pm-night-out",
    name: "9PM Night Out",
    price: 3500,
    category: "arabe",
    gender: "hombre",
    desc: "Audaz e intenso, para destacar de noche.",
    image: "assets/productos/9pm-night-out.jpg",
    notes: { salida: "Pimienta rosa, ron", corazon: "Cuero, tabaco", fondo: "Vainilla, madera de oud" }
  },
  {
    id: "odyssey-home",
    name: "Odyssey Home",
    price: 3000,
    category: "arabe",
    gender: "unisex",
    desc: "Cálido y acogedor, aroma envolvente.",
    image: "",
    notes: { salida: "Cardamomo, naranja", corazon: "Madera de cedro, ámbar", fondo: "Vainilla, almizcle cálido" }
  },
  {
    id: "odyssey-mandarin-sky",
    name: "Odyssey Mandarin Sky",
    price: 2800,
    category: "arabe",
    gender: "mujer",
    desc: "Cítrico y luminoso, fresco todo el día.",
    image: "",
    notes: { salida: "Mandarina, toronja", corazon: "Flor de naranjo, jengibre", fondo: "Almizcle, madera clara" }
  },
  {
    id: "odyssey-mega",
    name: "Odyssey Mega",
    price: 3000,
    category: "arabe",
    gender: "hombre",
    desc: "Potente y con gran proyección, hace notar tu presencia.",
    image: "",
    notes: { salida: "Bergamota, pimienta", corazon: "Especias, cuero", fondo: "Ámbar, madera profunda" }
  }
];
