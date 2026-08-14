import type { TarotCard } from "@/lib/tarot";

// Contenido local de las cartas. No requiere backend ni cuenta de usuario.
export const TAROT_CARDS: TarotCard[] = [
  {
    "slug": "el-loco",
    "name": "El Loco",
    "number": "0",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Representa el inicio de un camino, la inocencia y la confianza en lo desconocido. Invita a dar el primer paso aunque no tengas todas las respuestas.",
    "element": "Aire",
    "planet_or_sign": "Urano",
    "timing": "Inicios inmediatos, primeros días",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "El hatillo",
        "meaning": "Lo esencial que llevas contigo: tu experiencia previa."
      },
      {
        "symbol": "El acantilado",
        "meaning": "El salto de fe, el riesgo necesario para avanzar."
      },
      {
        "symbol": "El perro blanco",
        "meaning": "Tu instinto que te acompaña y te advierte."
      }
    ],
    "light": "Libertad, espontaneidad, apertura a nuevas experiencias.",
    "shadow": "Imprudencia, falta de plan, evitar responsabilidades.",
    "reversed_meaning": "Miedo a comenzar, decisiones impulsivas o estancamiento por inseguridad.",
    "combinations": [
      {
        "card": "El Mago",
        "meaning": "Una idea nueva lista para materializarse."
      },
      {
        "card": "La Torre",
        "meaning": "Un cambio repentino que obliga a empezar de cero."
      }
    ],
    "advice": "Da el primer paso hoy, aunque sea pequeño. La claridad llega caminando.",
    "sort_order": 0
  },
  {
    "slug": "el-mago",
    "name": "El Mago",
    "number": "I",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Habla del poder personal, la comunicación y la capacidad de convertir una idea en algo real. Tienes las herramientas necesarias.",
    "element": "Aire",
    "planet_or_sign": "Mercurio",
    "timing": "Una semana",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "La mesa con los cuatro palos",
        "meaning": "Todos los recursos disponibles: acción, emoción, mente y materia."
      },
      {
        "symbol": "El infinito",
        "meaning": "Potencial ilimitado y ciclos que se renuevan."
      }
    ],
    "light": "Enfoque, talento, iniciativa creativa.",
    "shadow": "Manipulación, promesas vacías, dispersión.",
    "reversed_meaning": "Falta de confianza en tus capacidades o uso poco honesto de tu influencia.",
    "combinations": [
      {
        "card": "La Estrella",
        "meaning": "Inspiración que se vuelve proyecto concreto."
      }
    ],
    "advice": "Ordena tus recursos y comunica con claridad lo que quieres crear.",
    "sort_order": 1
  },
  {
    "slug": "la-sacerdotisa",
    "name": "La Sacerdotisa",
    "number": "II",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Es la carta de la intuición, el silencio y el conocimiento interno. Aún no es momento de actuar, sino de escuchar.",
    "element": "Agua",
    "planet_or_sign": "Luna",
    "timing": "Un ciclo lunar",
    "yes_no": "Quizá",
    "symbolism": [
      {
        "symbol": "El velo",
        "meaning": "Aquello que todavía no se revela."
      },
      {
        "symbol": "La luna a sus pies",
        "meaning": "Dominio de los ciclos emocionales."
      }
    ],
    "light": "Sabiduría interior, calma, secretos que se comprenden.",
    "shadow": "Autoengaño, guardar demasiado silencio, desconexión.",
    "reversed_meaning": "Ignorar tu intuición o dejarte llevar por rumores externos.",
    "combinations": [
      {
        "card": "La Luna",
        "meaning": "Sueños y mensajes del inconsciente muy activos."
      }
    ],
    "advice": "Antes de decidir, guarda silencio y escucha lo que ya sabes.",
    "sort_order": 2
  },
  {
    "slug": "la-emperatriz",
    "name": "La Emperatriz",
    "number": "III",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Fertilidad, abundancia y cuidado. Algo está creciendo en tu vida y necesita tiempo y ternura.",
    "element": "Tierra",
    "planet_or_sign": "Venus",
    "timing": "Tres meses",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "El trigo",
        "meaning": "Cosecha y frutos de lo sembrado."
      },
      {
        "symbol": "La corona de estrellas",
        "meaning": "Conexión entre lo material y lo espiritual."
      }
    ],
    "light": "Creatividad, disfrute, prosperidad, maternidad.",
    "shadow": "Sobreprotección, comodidad excesiva, dependencia.",
    "reversed_meaning": "Bloqueo creativo o descuido de ti misma por atender a otros.",
    "combinations": [
      {
        "card": "Los Enamorados",
        "meaning": "Una relación que florece y se estabiliza."
      }
    ],
    "advice": "Cuida lo que ya está creciendo en lugar de empezar algo nuevo.",
    "sort_order": 3
  },
  {
    "slug": "los-enamorados",
    "name": "Los Enamorados",
    "number": "VI",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Habla de vínculos, elecciones importantes y de alinear tu decisión con tus valores.",
    "element": "Aire",
    "planet_or_sign": "Géminis",
    "timing": "Dos meses",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "El ángel",
        "meaning": "Guía superior sobre la decisión."
      },
      {
        "symbol": "Las dos figuras",
        "meaning": "Unión, complementariedad, acuerdo."
      }
    ],
    "light": "Amor consciente, alianzas, decisiones desde el corazón.",
    "shadow": "Indecisión, elegir por miedo, relaciones desequilibradas.",
    "reversed_meaning": "Dudas persistentes, falta de compromiso o valores en conflicto.",
    "combinations": [
      {
        "card": "El Carro",
        "meaning": "Una decisión que impulsa un avance firme."
      }
    ],
    "advice": "Elige lo que te haga sentir íntegra, no solo lo que sea cómodo.",
    "sort_order": 5
  },
  {
    "slug": "el-carro",
    "name": "El Carro",
    "number": "VII",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Victoria, avance y determinación. Es momento de tomar el control y dirigir tu energía hacia una meta.",
    "element": "Agua",
    "planet_or_sign": "Cáncer",
    "timing": "Siete semanas",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "Las dos esfinges",
        "meaning": "Fuerzas opuestas que debes conducir."
      },
      {
        "symbol": "La armadura",
        "meaning": "Protección y disciplina."
      }
    ],
    "light": "Triunfo, foco, movimiento, viajes.",
    "shadow": "Prisa, autoritarismo, avanzar sin rumbo.",
    "reversed_meaning": "Pérdida de dirección, obstáculos o falta de voluntad.",
    "combinations": [
      {
        "card": "El Mago",
        "meaning": "Un proyecto que arranca con fuerza."
      }
    ],
    "advice": "Toma las riendas: define una sola meta y avanza sin desviarte.",
    "sort_order": 6
  },
  {
    "slug": "la-estrella",
    "name": "La Estrella",
    "number": "XVII",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Después de la dificultad llega la calma. Es la carta de la esperanza, la inspiración y la sanación suave.",
    "element": "Aire",
    "planet_or_sign": "Acuario",
    "timing": "Tiempo largo pero seguro",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "Las ocho estrellas",
        "meaning": "Guía, propósito y protección espiritual."
      },
      {
        "symbol": "El agua que se vierte",
        "meaning": "Emociones que fluyen y limpian."
      },
      {
        "symbol": "La figura desnuda",
        "meaning": "Autenticidad y vulnerabilidad sanadora."
      }
    ],
    "light": "Esperanza, fe renovada, inspiración creativa, paz interior.",
    "shadow": "Idealizar demasiado, esperar sin actuar, desilusión.",
    "reversed_meaning": "Desesperanza temporal, desconexión de tu propósito, falta de fe.",
    "combinations": [
      {
        "card": "La Luna",
        "meaning": "Un proceso de sanación profunda del inconsciente."
      },
      {
        "card": "El Sol",
        "meaning": "Claridad y éxito después de un tiempo difícil."
      }
    ],
    "advice": "Confía en el proceso y sigue cuidando tu luz: lo peor ya pasó.",
    "sort_order": 16
  },
  {
    "slug": "la-luna",
    "name": "La Luna",
    "number": "XVIII",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Habla de lo que aún no ves con claridad: emociones, miedos y sueños. Invita a caminar despacio.",
    "element": "Agua",
    "planet_or_sign": "Piscis",
    "timing": "Un mes",
    "yes_no": "Quizá",
    "symbolism": [
      {
        "symbol": "El sendero",
        "meaning": "Un camino que se recorre sin verlo completo."
      },
      {
        "symbol": "El cangrejo",
        "meaning": "Contenidos del inconsciente que emergen."
      }
    ],
    "light": "Intuición fuerte, imaginación, mensajes de los sueños.",
    "shadow": "Confusión, ansiedad, autoengaño.",
    "reversed_meaning": "La niebla se disipa y comienzas a ver la verdad.",
    "combinations": [
      {
        "card": "La Sacerdotisa",
        "meaning": "Intuición muy despierta, escucha tus sueños."
      }
    ],
    "advice": "No decidas desde el miedo; espera a que la niebla se aclare.",
    "sort_order": 17
  },
  {
    "slug": "el-sol",
    "name": "El Sol",
    "number": "XIX",
    "category": "Arcano Mayor",
    "suit": null,
    "general_meaning": "Alegría, claridad y éxito. Todo se ilumina y lo que estaba oculto se comprende.",
    "element": "Fuego",
    "planet_or_sign": "Sol",
    "timing": "Verano, pronto",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "El niño",
        "meaning": "Alegría genuina y libertad."
      },
      {
        "symbol": "Los girasoles",
        "meaning": "Vitalidad y crecimiento hacia la luz."
      }
    ],
    "light": "Éxito, vitalidad, verdad, celebración.",
    "shadow": "Ego, exceso de optimismo, presumir.",
    "reversed_meaning": "Alegría contenida, falta de energía o dudas sobre tu valor.",
    "combinations": [
      {
        "card": "La Estrella",
        "meaning": "Sanación seguida de un éxito visible."
      }
    ],
    "advice": "Muéstrate tal como eres: es tu momento de brillar.",
    "sort_order": 18
  },
  {
    "slug": "as-de-copas",
    "name": "As de Copas",
    "number": "As",
    "category": "Arcano Menor",
    "suit": "Copas",
    "general_meaning": "Un nuevo comienzo emocional: amor, amistad o una emoción que se abre.",
    "element": "Agua",
    "planet_or_sign": "Agua",
    "timing": "Semanas",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "La copa desbordante",
        "meaning": "Emociones que abundan y se comparten."
      },
      {
        "symbol": "La paloma",
        "meaning": "Bendición y mensaje amoroso."
      }
    ],
    "light": "Amor nuevo, apertura del corazón, compasión.",
    "shadow": "Sensibilidad excesiva, idealizar un vínculo.",
    "reversed_meaning": "Emociones bloqueadas o un amor que aún no se expresa.",
    "combinations": [
      {
        "card": "Los Enamorados",
        "meaning": "Un vínculo que se profundiza."
      }
    ],
    "advice": "Permítete sentir sin defensas: algo bueno está naciendo.",
    "sort_order": 30
  },
  {
    "slug": "tres-de-bastos",
    "name": "Tres de Bastos",
    "number": "3",
    "category": "Arcano Menor",
    "suit": "Bastos",
    "general_meaning": "Expansión y planes que empiezan a dar resultados. Mirar más lejos.",
    "element": "Fuego",
    "planet_or_sign": "Fuego",
    "timing": "Tres meses",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "Los barcos",
        "meaning": "Proyectos en camino y oportunidades lejanas."
      },
      {
        "symbol": "El horizonte",
        "meaning": "Visión a futuro."
      }
    ],
    "light": "Crecimiento, viajes, colaboración.",
    "shadow": "Impaciencia, expectativas poco realistas.",
    "reversed_meaning": "Retrasos o planes que necesitan revisión.",
    "combinations": [
      {
        "card": "El Carro",
        "meaning": "Avance decidido hacia una meta grande."
      }
    ],
    "advice": "Amplía tu mirada: la oportunidad está fuera de lo conocido.",
    "sort_order": 45
  },
  {
    "slug": "cinco-de-espadas",
    "name": "Cinco de Espadas",
    "number": "5",
    "category": "Arcano Menor",
    "suit": "Espadas",
    "general_meaning": "Conflictos, tensión y victorias que dejan un costo. Invita a elegir tus batallas.",
    "element": "Aire",
    "planet_or_sign": "Aire",
    "timing": "Días",
    "yes_no": "No",
    "symbolism": [
      {
        "symbol": "Las espadas recogidas",
        "meaning": "Ganar a costa de otros."
      },
      {
        "symbol": "El cielo revuelto",
        "meaning": "Ambiente tenso y palabras hirientes."
      }
    ],
    "light": "Aprender a poner límites, reconocer lo que no vale la pena.",
    "shadow": "Discusiones, orgullo, ambiente hostil.",
    "reversed_meaning": "Reconciliación posible o soltar una discusión que ya no sirve.",
    "combinations": [
      {
        "card": "La Torre",
        "meaning": "Un conflicto que provoca una ruptura necesaria."
      }
    ],
    "advice": "Pregúntate si esta batalla merece tu energía.",
    "sort_order": 60
  },
  {
    "slug": "diez-de-oros",
    "name": "Diez de Oros",
    "number": "10",
    "category": "Arcano Menor",
    "suit": "Oros",
    "general_meaning": "Estabilidad material, familia y logros que perduran en el tiempo.",
    "element": "Tierra",
    "planet_or_sign": "Tierra",
    "timing": "Un año",
    "yes_no": "Sí",
    "symbolism": [
      {
        "symbol": "La familia",
        "meaning": "Herencia, raíces y apoyo."
      },
      {
        "symbol": "El arco",
        "meaning": "Estructura sólida ya construida."
      }
    ],
    "light": "Seguridad, prosperidad duradera, legado.",
    "shadow": "Apego al dinero, rutina sin alma.",
    "reversed_meaning": "Inestabilidad económica o tensiones familiares.",
    "combinations": [
      {
        "card": "La Emperatriz",
        "meaning": "Abundancia que se disfruta y se comparte."
      }
    ],
    "advice": "Construye pensando en el largo plazo, no en el impulso.",
    "sort_order": 77
  }
];
