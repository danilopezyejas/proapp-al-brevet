import { useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import { SpeedInsights } from '@vercel/speed-insights/react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | "luces"
  | "senales_diurnas"
  | "senales_sonoras"
  | "senales_luminosas"
  | "maniobras"
  | "vela"
  | "visibilidad_reducida"
  | "balizamiento"
  | "fondeo"
  | "planificacion_navegacion"
  | "maniobras_puerto"
  | "meteorologia"
  | "incendios"
  | "despacho"
  | "angulos"
  | "medidas";

interface BaseQuestion {
  id: number;
  category: Category;
  question: string;
  answer: string;
}

interface Question extends BaseQuestion {
  options: string[];
}

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

// FIX 1: Explicit BaseQuestion[] type so `category` is narrowed to Category,
//         not widened to string.

export const baseQuestions: BaseQuestion[] = [
  { id: 1, category: "luces", question: "¿Cuál es la luz reglamentaria de tope?", answer: "La luz blanca." },
  { id: 2, category: "luces", question: "¿Qué luz debe llevar una embarcación en la banda de estribor?", answer: "Una luz verde." },
  { id: 3, category: "luces", question: "¿Qué luz debe llevar una embarcación en la banda de babor?", answer: "Una luz roja." },
  { id: 4, category: "angulos", question: "¿Qué arco de horizonte visible debe tener la luz de tope?", answer: "225° repartidos desde la proa, 112° 5' a cada banda." },
  { id: 5, category: "angulos", question: "¿Qué arco de horizonte visible deben tener las luces de banda?", answer: "112° 5' desde la proa." },
  { id: 6, category: "luces", question: "¿Qué alcance lumínico deben tener la luz de tope en buques de?", answer: "50 o más metros de eslora: 6 millas; entre 20 y 50 metros de eslora: 5 millas; entre 12 y 20 metros de eslora: 3 millas; menos de 12 metros de eslora: 2 millas." },
  { id: 7, category: "luces", question: "¿Qué alcance lumínico deben tener las luces de banda de un buque de?", answer: "50 o más metros de eslora: 5 millas; entre 12 y 50 metros de eslora: 3 millas; menos de 12 metros de eslora: 1 milla." },
  { id: 8, category: "luces", question: "¿Qué luces adicionales deberá llevar un buque que realice tareas de remolque, siendo la longitud de éste menor a 183 mts.?", answer: "Dos luces blancas verticales." },
  { id: 9, category: "luces", question: "¿Qué luces adicionales deberá llevar un buque que realiza tareas de remolque, siendo la longitud de éste superior a 183 mts.?", answer: "3 luces blancas verticales." },
  { id: 10, category: "angulos", question: "¿Qué arco de horizonte deben tener las luces que indican buque en tarea de remolque?", answer: "Iguales a las luces de tope, 225°." },
  { id: 11, category: "senales_diurnas", question: "¿Qué señal exhibirá todo buque en tarea de remolque siendo éste superior a 183 mts., en horas del día?", answer: "Una señal bicónica." },
  { id: 12, category: "luces", question: "¿Qué luces exhibirá todo buque remolcado durante la noche?", answer: "Luces de banda y de coronamiento." },
  { id: 13, category: "luces", question: "¿Qué luces debe exhibir durante la noche una embarcación navegando a vela?", answer: "Luces de banda." },
  { id: 14, category: "senales_diurnas", question: "¿Qué señal exhibirá un buque que navegue a vela y también mecánicamente durante el día?", answer: "Una señal cónica con el vértice hacia abajo." },
  { id: 15, category: "luces", question: "¿Qué luces adicionales exhibirán durante la noche los buques pesqueros dedicados a la pesca de arrastre?", answer: "Dos luces en línea vertical todo horizonte, verde la superior y blanca la inferior." },
  { id: 16, category: "senales_diurnas", question: "¿Qué señal deberá mostrar un pesquero de arrastre de 20 o más metros de eslora durante el día?", answer: "Dos conos negros unidos por sus puntas en línea vertical." },
  { id: 17, category: "senales_diurnas", question: "¿Qué señal deberá tener izada un pesquero de arrastre de menos de 20 metros de eslora durante el día?", answer: "Dos conos negros unidos por sus puntas o un canasto de pesca." },
  { id: 18, category: "luces", question: "¿Qué luces exhibirán además de la reglamentaria, los buques pesqueros que no sean de arrastre?", answer: "2 luces todo horizonte en línea vertical, roja la superior y blanca la inferior." },
  { id: 19, category: "luces", question: "¿Qué luces deberá exhibir un buque sin gobierno que no tenga arrancada?", answer: "2 luces rojas visibles en todo el horizonte en línea vertical en el lugar más visible." },
  { id: 20, category: "senales_diurnas", question: "¿Qué señal deberá exhibir todo buque sin gobierno en horas del día?", answer: "2 balones negros." },
  { id: 21, category: "senales_diurnas", question: "¿Qué señal deberá tener izada durante el día toda embarcación que se encuentre fondeada?", answer: "Un balón negro." },
  { id: 22, category: "luces", question: "¿Qué luz deberá tener durante la noche todo buque fondeado de menos de 45,75 mts. de eslora?", answer: "Una luz blanca todo horizonte en proa en el lugar más visible." },
  { id: 23, category: "senales_diurnas", question: "¿Qué señal deberá exhibir todo buque varado durante el día?", answer: "Tres balones negros en línea vertical." },
  { id: 24, category: "luces", question: "¿Qué luces deberá mostrar todo buque de menos de 45,75 mts. de eslora varado durante la noche?", answer: "Una luz blanca a proa todo horizonte y dos luces rojas en línea vertical todo horizonte." },
  { id: 25, category: "luces", question: "Las embarcaciones de menos de 7 mts. de eslora cuando están fondeadas o varadas fuera de la zona de navegación, paso o canales, ¿deberán llevar las luces o señales de un buque varado o fondeado?", answer: "No." },
  { id: 26, category: "senales_sonoras", question: "¿Qué se entiende por pitada corta?", answer: "Un sonido de aproximadamente un segundo de duración." },
  { id: 27, category: "senales_sonoras", question: "¿Qué se entiende por pitada larga?", answer: "Un sonido de aproximadamente 4 a 6 segundos de duración." },
  { id: 28, category: "maniobras", question: "¿Qué significa una pitada corta?", answer: "Caigo a estribor." },
  { id: 29, category: "maniobras", question: "¿Qué significan dos pitadas cortas?", answer: "Caigo a babor." },
  { id: 30, category: "maniobras", question: "¿Qué significan tres pitadas cortas?", answer: "Estoy dando atrás." },
  { id: 31, category: "senales_luminosas", question: "¿Cómo indica por medio de destellos que caerá a estribor?", answer: "Un destello." },
  { id: 32, category: "senales_luminosas", question: "¿Cómo indica por medio de destellos que caerá a babor?", answer: "Dos destellos." },
  { id: 33, category: "senales_luminosas", question: "¿Cómo indica por medio de destellos que está dando máquinas atrás?", answer: "Tres destellos." },
  { id: 34, category: "senales_luminosas", question: "¿Cuál es la duración aproximada de un destello?", answer: "1 segundo." },
  { id: 35, category: "senales_luminosas", question: "¿Cuál es el intervalo entre destello y destello?", answer: "1 segundo." },
  { id: 36, category: "senales_luminosas", question: "¿Cuál es el intervalo entre señales sucesivas?", answer: "No menor de 10 segundos." },
  { id: 37, category: "senales_sonoras", question: "Cuando dos embarcaciones se encuentran a la vista en un paso o canal angosto, ¿qué señales deberá realizar el buque que pretende alcanzar a otro?", answer: "Dos pitadas largas seguidas de una corta significa: pretendo alcanzarle por su banda de estribor. Dos pitadas largas seguidas de dos cortas significa: pretendo alcanzarle por su babor." },
  { id: 38, category: "senales_sonoras", question: "¿Qué señal deberá realizar todo buque que no entiende las intenciones del otro?", answer: "5 pitadas cortas y rápidas." },
  { id: 39, category: "visibilidad_reducida", question: "¿Qué señal deberá realizar un buque navegando en zonas de visibilidad reducida?", answer: "Una pitada larga cada dos minutos." },
  { id: 40, category: "visibilidad_reducida", question: "¿Qué señal sónica deberán realizar los buques sin gobierno, pesqueros, veleros con capacidad de maniobra reducida o todo buque remolcado cuando navega en zonas de visibilidad reducida?", answer: "1 pitada larga seguida de dos cortas con un intervalo de 2 minutos." },
  { id: 41, category: "visibilidad_reducida", question: "¿Qué señal sónica deberá realizar todo buque fondeado en zona de visibilidad reducida?", answer: "Repiques de campana con una duración de 5 segundos con un intervalo de más de un minuto." },
  { id: 42, category: "maniobras", question: "¿Qué es la velocidad de seguridad?", answer: "Es la que permite efectuar la maniobra adecuada y eficaz para evitar un abordaje." },
  { id: 43, category: "maniobras", question: "¿Qué elementos se deberán tener en cuenta para determinar la velocidad de seguridad?", answer: "Visibilidad; densidad del tráfico; maniobrabilidad del buque; estado del mar, viento y corriente; calado con relación a la profundidad." },
  { id: 44, category: "maniobras", question: "¿Cómo determina que existe riesgo de colisión cuando dos buques navegan en rumbos encontrados?", answer: "Si la demora al buque que se aproxima es constante o sin variación apreciable." },
  { id: 45, category: "maniobras", question: "¿Cómo debe ser realizada una buena maniobra para evitar un abordaje?", answer: "Debe ser realizada de tal forma que los buques pasen en distancia segura." },
  { id: 46, category: "maniobras", question: "Si navegando por un canal se encuentran dos embarcaciones con rumbos encontrados, ¿qué maniobra deberán realizar?", answer: "Se arrimarán lo más posible al límite exterior del canal que quede por su banda de estribor." },
  { id: 47, category: "maniobras", question: "Cuando un buque de fuerza motriz y un velero estén avanzando en direcciones que involucren riesgo de colisión, en aguas libres, ¿quién deberá mantenerse apartado de la ruta del otro?", answer: "El buque de fuerza motriz." },
  { id: 48, category: "maniobras", question: "¿Puede un buque cruzar un paso o canal, si al hacerlo interfiere el tránsito de otro buque?", answer: "No." },
  { id: 49, category: "maniobras", question: "¿Pueden las embarcaciones de eslora inferior a los 20 mts o los veleros entorpecer el tránsito seguro de buques de propulsión mecánica que naveguen en canales?", answer: "No." },
  { id: 50, category: "vela", question: "Cuando dos veleros se aproximan uno al otro y reciben el viento por bandas contrarias, ¿cuál de ellos debe mantenerse apartado de la derrota del otro?", answer: "El que reciba el viento por babor." },
  { id: 51, category: "maniobras", question: "¿Puede una embarcación fondear en un canal angosto?", answer: "No; deberá, si es posible, salir del canal para no estorbar la navegación." },
  { id: 52, category: "vela", question: "Cuando dos veleros que naveguen con rumbos cruzados y pudiera existir riesgo de abordaje, y ambos reciban el viento por la misma banda, ¿cuál de ellos se mantendrá apartado de la derrota del otro?", answer: "El buque que esté a barlovento se mantendrá apartado del que esté a sotavento." },
  { id: 53, category: "vela", question: "¿Qué significa barlovento?", answer: "Banda de donde viene el viento." },
  { id: 54, category: "vela", question: "¿Qué significa sotavento?", answer: "Banda opuesta a la que viene el viento." },
  { id: 55, category: "maniobras", question: "¿Qué se considera por buque que alcanza?", answer: "A todo buque que se aproxima a otro viniendo desde una marcación mayor de 22° 5' a popa del través del buque alcanzado, de tal forma que de noche solo sea visible la luz de coronamiento y ninguna de sus luces de costado." },
  { id: 56, category: "maniobras", question: "Entre un buque que alcanza y el alcanzado, ¿cuál de los dos tiene que mantenerse apartado de la derrota del otro?", answer: "El buque que alcanza." },
  { id: 57, category: "maniobras", question: "Cuando un buque tenga dudas de si es alcanzante o no, ¿cómo se considerará?", answer: "Como buque que alcanza." },
  { id: 58, category: "maniobras", question: "Cuando dos buques naveguen de vuelta encontrada, a rumbos opuestos o casi opuestos con riesgo de colisión, ¿qué maniobra deberán realizar?", answer: "Cada uno de ellos deberá caer a estribor." },
  { id: 59, category: "maniobras", question: "¿Cómo determina en horas de la noche cuando dos buques vienen de vuelta encontrada?", answer: "Cuando se ven por la proa las dos luces de banda y la luz de tope." },
  { id: 60, category: "maniobras", question: "¿Cómo determina en horas del día que dos buques están en situación de vuelta encontrada?", answer: "Cuando por la proa se ven enfilados los palos del otro buque." },
  { id: 61, category: "maniobras", question: "¿Qué deberá hacer si tiene dudas de que existe una situación de vuelta encontrada?", answer: "Procederá como si fuera una situación de vuelta encontrada." },
  { id: 62, category: "maniobras", question: "Cuando dos buques se crucen con riesgo de colisión, ¿cuál de los dos deberá mantenerse apartado de la derrota del otro?", answer: "El buque que tenga el otro por su banda de estribor deberá gobernar para mantenerse apartado de la derrota del otro." },
  { id: 63, category: "maniobras", question: "¿De qué buques se mantendrán apartadas las embarcaciones en navegación libre con propulsión mecánica?", answer: "De un buque sin gobierno; de un buque con capacidad de maniobra limitada; de un buque dedicado a la pesca; de un buque a vela." },
  { id: 64, category: "visibilidad_reducida", question: "¿Qué precauciones deberá tomar toda embarcación que se encuentre navegando en una zona de visibilidad reducida?", answer: "Reducir la velocidad a la de seguridad y realizar las señales correspondientes." },
  { id: 65, category: "balizamiento", question: "¿Qué indica una boya de luz blanca con grupo de dos destellos, y cómo están pintadas para su reconocimiento diurno?", answer: "Indica casco a pique y está pintada de color negro con una o más franjas rojas, siendo su marca de tope dos esferas negras superpuestas." },
  { id: 66, category: "balizamiento", question: "¿Qué indica una boya de luz blanca con un ritmo isofásico, de ocultación o Morse \"A\", y cómo están pintadas para su reconocimiento diurno?", answer: "Indican aguas seguras y están pintadas con franjas verticales blancas y rojas, con una esfera roja como marca de tope." },
  { id: 67, category: "balizamiento", question: "¿Qué indica una boya de luz blanca con un ritmo Q o VQ, y cómo están pintadas para su reconocimiento diurno?", answer: "Indican que las aguas más profundas en la zona se encuentran en el cuadrante Norte tomando como centro la boya, y están pintadas de negro sobre amarillo con dos conos negros superpuestos con las puntas hacia arriba." },
  { id: 68, category: "balizamiento", question: "¿Qué boya se debe dejar a estribor al entrar en un canal de acceso a un puerto o al remontar un río balizado?", answer: "Las boyas rojas." },
  { id: 69, category: "balizamiento", question: "¿Cómo pueden ser las boyas por sus características luminosas?", answer: "Destellos, ocultación, fijas, isofásicas y centelleantes." },
  { id: 70, category: "balizamiento", question: "¿De dónde se pueden extraer las características de los faros?", answer: "De las cartas náuticas, los derroteros y las listas de faros." },
  { id: 71, category: "planificacion_navegacion", question: "¿Qué normas deben seguirse para el estudio de una derrota?", answer: "Estudiar la derrota en la carta poniendo especial atención en que ésta no pase sobre peligros a la navegación." },
  { id: 72, category: "maniobras_puerto", question: "¿Qué precauciones deberá tomar para realizar una entrada o salida a puerto?", answer: "Para salir de puerto, deberá observar si éste está abierto o cerrado; si tiene salida libre, hacerlo con velocidad de seguridad. Para entrar, si tiene entrada libre, hacerlo con velocidad de seguridad." },
  { id: 73, category: "fondeo", question: "¿Qué es un fondeadero?", answer: "Es aquel que asegura una buena protección para los vientos predominantes y además su fondo es un buen tenedero." },
  { id: 74, category: "fondeo", question: "¿Cuántas veces el fondo es conveniente fondear de cadena?", answer: "Por lo menos 3 veces el fondo determinado." },
  { id: 75, category: "fondeo", question: "¿Cómo se debe tomar un fondeadero?", answer: "Se deberá aproar la embarcación a la corriente o al viento, llegando al punto elegido sin arrancada o con arrancada atrás, fondear el ancla y dar cadena a medida que vaya pidiendo." },
  { id: 76, category: "fondeo", question: "¿Qué significa garrear?", answer: "Cuando una embarcación fondeada no se aguanta produciendo un arrastre del ancla por el fondo." },
  { id: 77, category: "fondeo", question: "¿Cómo determina que una embarcación garrea?", answer: "Cuando las marcaciones a dos puntos notables en tierra por lo menos varían en forma apreciable; tocando la cadena se notan sacudones." },
  { id: 78, category: "fondeo", question: "¿Cuando estando fondeado se levante mal tiempo, qué precauciones deberá tomar?", answer: "Cuidar que la embarcación no garree; para ello es aconsejable aumentar la cantidad de cadena fondeada hasta por lo menos cinco veces el fondo." },
  { id: 79, category: "meteorologia", question: "¿Qué indica un descenso rápido en la presión atmosférica?", answer: "Un cambio en las condiciones del tiempo generalmente con aportes de vientos fuertes." },
  { id: 80, category: "meteorologia", question: "¿Qué aspecto presentan los cumulus-nimbus?", answer: "Grandes masas nubosas que se alzan como montañas en el horizonte con tonalidades oscuras casi negras." },
  { id: 81, category: "meteorologia", question: "¿Qué fenómenos meteorológicos acompañan la presencia de cumulus-nimbus?", answer: "Vientos fuertes, turbonados y en casos excepcionales tornados." },
  { id: 82, category: "meteorologia", question: "¿Cuál es la presión atmosférica media a nivel del mar?", answer: "760 mm." },
  { id: 83, category: "meteorologia", question: "En épocas de verano y en situaciones normales, ¿cuál es el régimen de rotación de los vientos en el Río de la Plata?", answer: "Durante la noche sopla del Norte, por la mañana rota por el Oeste y se coloca del Este-Sureste." },
  { id: 84, category: "meteorologia", question: "¿Por debajo de qué valores la presión atmosférica puede indicar un cambio sensible en las condiciones meteorológicas?", answer: "Cuando la presión desciende por debajo de los 760 mm." },
  { id: 85, category: "meteorologia", question: "La persistencia de un viento dirección norte, ¿qué trae generalmente aparejado?", answer: "La entrada de un frente frío con aporte de vientos fuertes del sector Sur." },
  { id: 86, category: "incendios", question: "¿Cuáles son los tres elementos que determinan un incendio?", answer: "Combustible, aire y calor." },
  { id: 87, category: "incendios", question: "¿Cuáles son las tres clases de incendios?", answer: "Clase A: combustibles sólidos. Clase B: combustibles líquidos. Clase C: materiales eléctricos." },
  { id: 88, category: "incendios", question: "¿Qué tipo de extintor debe usarse preferentemente en un incendio de combustibles sólidos?", answer: "Chorro de agua." },
  { id: 89, category: "incendios", question: "¿Qué tipo de extintor debe usarse preferentemente en un incendio de combustibles líquidos?", answer: "Espuma mecánica." },
  { id: 90, category: "incendios", question: "¿Qué tipo de extintor debe usarse preferentemente en un incendio de materiales eléctricos?", answer: "Anhídrido carbónico (CO2)." },
  { id: 91, category: "incendios", question: "¿Cuál es la primer medida a tomar al producirse un incendio de materiales eléctricos?", answer: "Desenergizar el sistema." },
  { id: 92, category: "despacho", question: "¿Dónde se solicita el despacho de las embarcaciones deportivas?", answer: "Ante la repartición de la Prefectura Nacional Naval correspondiente al puerto donde se halla surta la embarcación; en caso de no existir dependencia, en la más próxima." },
  { id: 93, category: "despacho", question: "¿Qué documentación se deberá exhibir para solicitar despacho?", answer: "Certificado de navegabilidad, de seguridad y brevet para patronear embarcaciones deportivas y documento de identidad." },
  { id: 94, category: "despacho", question: "¿Dentro de qué zona está autorizada zona \"B\"?", answer: "En todo el Río de la Plata y una faja costera de 15 millas desde Punta del Este a La Paloma." },
  { id: 95, category: "despacho", question: "¿Dentro de qué radio está autorizada a navegar una embarcación habilitada para hacerlo en la zona \"C\"?", answer: "Dentro de un radio de 15 millas del puerto de despacho." },
  { id: 96, category: "medidas", question: "¿Cuántos metros tiene una milla marina?", answer: "Tiene 1.852 metros." },
  { id: 97, category: "medidas", question: "¿Cuántos salvavidas deberá llevar una embarcación?", answer: "Tantos como número de tripulantes lleve." },
  { id: 98, category: "medidas", question: "¿Cuál es la aplicación a dar a las tiras de tela color naranja que deben llevar las embarcaciones?", answer: "Colocarlas formando cruz sobre cubierta en caso de solicitar auxilio." },
  { id: 99, category: "medidas", question: "¿Cuál es la aplicación a dar al espejo que deben llevar las embarcaciones?", answer: "Llamar la atención reflejando en éste los rayos solares." },
  { id: 100, category: "medidas", question: "¿A cuánto equivale en metros una braza (Fathom)?", answer: "Equivale a 1.83 metros." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const normalizeText = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const pickDistractors = (current: BaseQuestion, all: BaseQuestion[], count = 3): string[] => {
  const sameCategory = [
    ...new Set(
      all
        .filter(
          (q) =>
            q.id !== current.id &&
            q.category === current.category &&
            normalizeText(q.answer) !== normalizeText(current.answer)
        )
        .map((q) => q.answer)
    ),
  ];

  if (sameCategory.length >= count) {
    return shuffleArray(sameCategory).slice(0, count);
  }

  const fallback = [
    ...new Set(
      all
        .filter(
          (q) =>
            q.id !== current.id &&
            normalizeText(q.answer) !== normalizeText(current.answer) &&
            !sameCategory.some((a) => normalizeText(a) === normalizeText(q.answer))
        )
        .map((q) => q.answer)
    ),
  ];

  return [
    ...sameCategory,
    ...shuffleArray(fallback).slice(0, count - sameCategory.length),
  ];
};

const buildQuestions = (base: BaseQuestion[]): Question[] =>
  base.map((q) => ({
    ...q,
    options: shuffleArray([q.answer, ...pickDistractors(q, base, 3)]),
  }));

// ─── Component ────────────────────────────────────────────────────────────────

export default function PreguntadosApp() {
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  const shuffleQuestions = () => {
    const built = buildQuestions(baseQuestions);
    setQuestions(
      shuffleArray(built).map((q) => ({
        ...q,
        shuffledOptions: shuffleArray(q.options),
      }))
    );
  };

  useEffect(() => {
    shuffleQuestions();
  }, []);

  // FIX 4: handleTimeOut wrapped in useCallback so it's stable and can be
  //         safely listed as a dependency of the timer useEffect.
  const handleTimeOut = useCallback(() => {
    setTimerActive(false);
    setShowAnswer(true);
    setSelected(null);
  }, []);

  // Timer — handleTimeOut is now a stable reference via useCallback.
  useEffect(() => {
    if (!timerActive || showAnswer || gameFinished || timeLeft <= 0) {
      if (timeLeft === 0 && !showAnswer) handleTimeOut();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showAnswer, gameFinished, timerActive, handleTimeOut]);

  // FIX 2: Explicit string type for `option` parameter.
  const handleAnswer = (option: string) => {
    if (showAnswer) return;
    setTimerActive(false);
    setSelected(option);
    setShowAnswer(true);
    if (option === questions[current]?.answer) {
      setScore((s) => s + 1);
    }
  };

  const resetGame = () => {
    shuffleQuestions();
    setCurrent(0);
    setScore(0);
    setShowAnswer(false);
    setSelected(null);
    setGameFinished(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowAnswer(false);
    setTimeLeft(30);
    setTimerActive(true);
    if (current === questions.length - 1) {
      setGameFinished(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  if (questions.length === 0) {
    return <div style={{ padding: 16 }}>Cargando preguntas...</div>;
  }

  if (gameFinished) {
    return (
      <div style={styles.screen}>
        <div style={styles.card}>
          <h2 style={styles.title}>¡Juego terminado!</h2>
          <p style={styles.body}>
            Tu puntaje final: {score} de {questions.length}
          </p>
          <button style={styles.btnPrimary} onClick={resetGame}>
            Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[current];

  return (
    <>
      <SpeedInsights />
      <div style={styles.screen}>
        <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Proapp al Brevet</h1>
            <p style={styles.subtitle}>
              Tu compañero para aprobar el examen náutico PRENA
            </p>
          </div>
          <button style={styles.btnOutline} onClick={resetGame}>
            Reiniciar
          </button>
        </div>

        {/* Card */}
        <div style={styles.card}>
          {/* Progress & timer */}
          <div style={styles.row}>
            <span style={styles.small}>
              Pregunta {current + 1} de {questions.length}
            </span>
            <span style={{ ...styles.small, color: timeLeft <= 10 ? "#dc2626" : "#111" }}>
              Tiempo: {timeLeft}s
            </span>
          </div>

          {/* Question */}
          <p style={styles.question}>{currentQuestion.question}</p>

          {/* Options */}
          <div style={styles.optionsGrid}>
            {currentQuestion.shuffledOptions.map((option, idx) => {
              let bg = "#fff";
              let color = "#111";
              let border = "1px solid #d1d5db";

              if (showAnswer) {
                if (option === currentQuestion.answer) {
                  bg = "#22c55e"; color = "#fff"; border = "1px solid #16a34a";
                } else if (option === selected) {
                  bg = "#ef4444"; color = "#fff"; border = "1px solid #dc2626";
                } else {
                  bg = "#f3f4f6"; color = "#6b7280";
                }
              }

              return (
                <button
                  key={idx}
                  style={{ ...styles.optionBtn, background: bg, color, border }}
                  onClick={() => handleAnswer(option)}
                  disabled={showAnswer || timeLeft === 0}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showAnswer && (
            <div style={styles.feedback}>
              <p style={{ marginBottom: 8 }}>
                {selected === currentQuestion.answer
                  ? "✅ ¡Correcto!"
                  : selected
                    ? `❌ Incorrecto. Respuesta correcta: ${currentQuestion.answer}`
                    : `⏱️ Tiempo agotado! La respuesta correcta era: ${currentQuestion.answer}`}
              </p>
              <button style={styles.btnPrimary} onClick={nextQuestion}>
                Siguiente
              </button>
            </div>
          )}
        </div>

        {/* Score */}
        <div style={styles.row}>
          <span style={styles.small}>Puntaje: {score}</span>
          <span style={{ ...styles.small, color: timeLeft <= 10 ? "#dc2626" : "#111" }}>
            Tiempo restante: {timeLeft}s
          </span>
        </div>
      </div>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// FIX 3: Typed as Record<string, CSSProperties> so TypeScript validates every
//         property (including textAlign: "left") against CSSProperties,
//         preventing the "string not assignable" error on spread.
const styles: Record<string, CSSProperties> = {
  screen: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: 16,
    fontFamily: "system-ui, sans-serif",
  },
  container: { maxWidth: 560, margin: "0 auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,.1)",
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "#111" },
  subtitle: { fontSize: 13, color: "#6b7280", margin: 0, fontStyle: "italic" },
  body: { fontSize: 16, marginBottom: 16, color: "#111" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  small: { fontSize: 13, fontWeight: 600, color: "#111" },
  question: { fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#111" },
  optionsGrid: { display: "grid", gap: 8 },
  optionBtn: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    textAlign: "left",   // ✅ valid because styles is typed as CSSProperties
    fontSize: 14,
    transition: "background .15s",
  },
  feedback: { marginTop: 16 },
  btnPrimary: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  btnOutline: {
    background: "#fff",
    color: "#111",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
  },
};
