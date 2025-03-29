import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

const allQuestions = [
  // Pregunta 1-10 ya incluidas anteriormente
  {
    question: '¿Cuál es la luz reglamentaria de tope?',
    options: ['Luz roja', 'Luz verde', 'Luz blanca', 'Luz azul'],
    answer: 'Luz blanca',
  },
  {
    question: '¿Qué significa una pitada corta?',
    options: [
      'Caigo a estribor',
      'Caigo a babor',
      'Estoy dando atrás',
      'Estoy fondeado',
    ],
    answer: 'Caigo a estribor',
  },
  {
    question: '¿Qué luz debe llevar una embarcación en la banda de estribor?',
    options: ['Luz blanca', 'Luz verde', 'Luz roja', 'Luz amarilla'],
    answer: 'Luz verde',
  },
  {
    question:
      '¿Qué señal se realiza si no se entiende la intención de otro buque?',
    options: [
      'Una pitada larga',
      'Tres pitadas cortas',
      'Cinco pitadas cortas y rápidas',
      'Una pitada corta seguida de una larga',
    ],
    answer: 'Cinco pitadas cortas y rápidas',
  },
  {
    question: '¿Qué boya se debe dejar a estribor al entrar a un canal?',
    options: ['Verde', 'Roja', 'Amarilla', 'Negra con franjas rojas'],
    answer: 'Roja',
  },
  {
    question: '¿Qué debe hacer un buque de motor al encontrarse con un velero?',
    options: [
      'Nada, tiene prioridad',
      'Pasar por babor del velero',
      'Apartarse del velero',
      'Emitir dos pitadas cortas',
    ],
    answer: 'Apartarse del velero',
  },
  {
    question:
      '¿Qué hacer si se duda sobre si hay una situación de vuelta encontrada?',
    options: [
      'Esperar y observar',
      'Pedir indicaciones por radio',
      'Proceder como si fuera vuelta encontrada',
      'Emitir una pitada larga',
    ],
    answer: 'Proceder como si fuera vuelta encontrada',
  },
  {
    question: '¿Qué indica una boya blanca con ritmo Morse A?',
    options: [
      'Aguas seguras',
      'Casco a pique',
      'Zona de fondeo',
      'Aguas peligrosas',
    ],
    answer: 'Aguas seguras',
  },
  {
    question: '¿Cuál es la presión atmosférica media a nivel del mar?',
    options: ['1013 hPa', '760 mm', '1000 mm', '980 mb'],
    answer: '760 mm',
  },
  {
    question: '¿Qué tipo de extintor debe usarse en un incendio eléctrico?',
    options: ['Agua', 'Espuma', 'CO2', 'Polvo químico seco'],
    answer: 'CO2',
  },
  // Pregunta 11
  {
    question: '¿Qué luces debe llevar una embarcación en la banda de babor?',
    options: ['Luz blanca', 'Luz verde', 'Luz roja', 'Luz azul'],
    answer: 'Luz roja',
  },
  {
    question: '¿Qué arco de horizonte visible debe tener la luz de tope?',
    options: ['180°', '225°', '112,5°', '360°'],
    answer: '225°',
  },
  {
    question: '¿Qué luces debe mostrar un velero de noche?',
    options: [
      'Luz blanca a popa',
      'Luces de banda',
      'Luz tricolor en el tope (opcional si <20m)',
      'Luz roja intermitente',
    ],
    answer: 'Luces de banda',
  },
  {
    question: '¿Qué significa barlovento?',
    options: [
      'Donde hay más olas',
      'Zona más profunda',
      'Banda de donde viene el viento',
      'Contrario a la corriente',
    ],
    answer: 'Banda de donde viene el viento',
  },
  {
    question: '¿Qué hacer cuando un buque tiene dudas si alcanza a otro?',
    options: [
      'Continuar sin cambios',
      'Considerarse alcanzado',
      'Considerarse como alcanzante',
      'Hacer señales acústicas',
    ],
    answer: 'Considerarse como alcanzante',
  },
  {
    question: '¿Qué luces indica un buque sin gobierno sin arrancada?',
    options: [
      '2 luces rojas todo horizonte en línea vertical',
      '2 luces verdes',
      '1 luz blanca',
      '3 luces blancas',
    ],
    answer: '2 luces rojas todo horizonte en línea vertical',
  },
  {
    question: '¿Qué indica una boya blanca con dos destellos?',
    options: [
      'Zona de fondeo',
      'Casco a pique',
      'Aguas profundas',
      'Zona peligrosa',
    ],
    answer: 'Casco a pique',
  },
  {
    question: '¿Cuántos metros tiene una milla náutica?',
    options: ['1000 m', '1852 m', '1500 m', '2000 m'],
    answer: '1852 m',
  },
  {
    question: '¿Qué elementos se necesitan para un incendio?',
    options: [
      'Agua, fuego y aire',
      'Fósforo, chispa y madera',
      'Combustible, aire y calor',
      'Fuego, humo y calor',
    ],
    answer: 'Combustible, aire y calor',
  },
  {
    question: '¿Qué se debe hacer si hay mal tiempo y estás fondeado?',
    options: [
      'Levantar el ancla',
      'Aumentar cadena a 5 veces el fondo y controlar el garreo',
      'Reducir la cadena',
      'No hacer nada',
    ],
    answer: 'Aumentar cadena a 5 veces el fondo',
  },
  {
    question: '¿Qué norma debe seguirse para estudiar una derrota?',
    options: [
      'Evitar boyas',
      'No seguir rutas en carta',
      'Evitar peligros en carta',
      'Tomar rumbo libremente',
    ],
    answer: 'Evitar peligros en carta',
  },
  {
    question:
      '¿Qué viento suele soplar en la madrugada en verano en el Río de la Plata?',
    options: ['Este', 'Norte', 'Sur', 'Oeste'],
    answer: 'Norte',
  },
  {
    question: '¿Cuál es la clase de incendio de líquidos inflamables?',
    options: ['A', 'B', 'C', 'D'],
    answer: 'B',
  },
  {
    question: '¿Qué extintor usar para combustibles sólidos?',
    options: ['Espuma', 'CO2', 'Polvo químico', 'Agua'],
    answer: 'Agua',
  },
  {
    question: '¿Dónde se despacha una embarcación deportiva?',
    options: [
      'Ministerio de Turismo',
      'Club Náutico',
      'Prefectura Nacional Naval',
      'Municipio',
    ],
    answer: 'Prefectura Nacional Naval',
  },
  {
    question: '¿Qué documento se requiere para despacho?',
    options: [
      'Pasaporte',
      'Título de propiedad',
      'Certificado de navegabilidad',
      'Factura de compra',
    ],
    answer: 'Certificado de navegabilidad',
  },
  {
    question: '¿Zona autorizada para la categoría B?',
    options: [
      '15 millas desde Montevideo',
      'Río de la Plata y 15 millas desde Punta del Este a La Paloma',
      'Mar territorial hasta 100 millas',
      'Solo ríos internos',
    ],
    answer: 'Río de la Plata y 15 millas desde Punta del Este a La Paloma',
  },
  {
    question: '¿Qué hacer si un buque garrea?',
    options: [
      'Levantar ancla',
      'Aumentar cadena',
      'Emitir señales',
      'Cambiar rumbo',
    ],
    answer: 'Aumentar cadena',
  },
  {
    question:
      '¿Qué fenómeno meteorológico indica un descenso rápido de presión?',
    options: ['Buen tiempo', 'Niebla', 'Lluvia ligera', 'Viento fuerte'],
    answer: 'Viento fuerte',
  },
  {
    question: '¿Qué nube indica mal tiempo inminente?',
    options: ['Stratus', 'Cirrus', 'Cumulus-nimbus', 'Altocumulus'],
    answer: 'Cumulus-nimbus',
  },
  {
    question:
      '¿Qué instrumento se usa para reflejar el sol en señales de auxilio?',
    options: ['Teléfono', 'Linterna', 'Espejo', 'Cacerola'],
    answer: 'Espejo',
  },
  {
    question: '¿Qué se hace con las tiras de tela naranja a bordo?',
    options: [
      'Cubrir velas',
      'Tapar ventanas',
      'Formar una cruz',
      'Pedir ayuda',
    ],
    answer: 'Formar una cruz',
  },
  {
    question: '¿Qué significa garrear?',
    options: [
      'Remolcar a otro buque',
      'Moverse sin control',
      'Arrastrar el ancla sin sujetarse',
      'Perder propulsión',
    ],
    answer: 'Arrastrar el ancla sin sujetarse',
  },
  {
    question: '¿Qué se usa para detectar si una embarcación garrea?',
    options: ['Compás', 'GPS', 'Marcaciones y cadena', 'Velocidad del viento'],
    answer: 'Marcaciones y cadena',
  },
  {
    question: '¿Qué viento anuncia la llegada de un frente frío en verano?',
    options: ['Norte', 'Este', 'Sur', 'Oeste'],
    answer: 'Sur',
  },
  {
    question: '¿Qué luces debe llevar un buque remolcado?',
    options: [
      'Luz blanca todo horizonte a popa (si <50m)',
      'Luces de banda y coronamiento',
      'Luces rojas',
      'Luces verdes',
    ],
    answer: 'Luces de banda y coronamiento',
  },
  {
    question: '¿Qué extintor se recomienda para líquidos inflamables?',
    options: ['Agua', 'Espuma mecánica', 'CO2', 'Arena'],
    answer: 'Espuma mecánica',
  },
  {
    question:
      '¿Qué luz se debe exhibir al fondear de noche (menos de 45,75 m)?',
    options: [
      'Luz roja a popa',
      'Dos luces blancas',
      'Luz blanca todo horizonte proa',
      'Luz azul todo horizonte',
    ],
    answer: 'Luz blanca todo horizonte proa',
  },
  {
    question: '¿Qué luz debe llevar un buque varado de noche?',
    options: [
      'Una blanca y una roja',
      'Tres rojas',
      'Una blanca proa + dos rojas en línea vertical',
      'Solo luz blanca en proa',
    ],
    answer: 'Una blanca proa + dos rojas en línea vertical',
  },
  {
    question: '¿Qué señal diurna debe llevar un buque varado?',
    options: [
      'Un balón negro',
      'Tres balones negros',
      'Dos conos negros',
      'Una esfera y un cono',
    ],
    answer: 'Tres balones negros',
  },
  {
    question: '¿Qué luz se debe mostrar en la banda de estribor?',
    options: ['Roja', 'Blanca', 'Verde', 'Azul'],
    answer: 'Verde',
  },
  {
    question: '¿Qué indica una boya con franjas verticales rojas y blancas?',
    options: [
      'Zona peligrosa',
      'Aguas seguras',
      'Casco a pique',
      'Zona de exclusión',
    ],
    answer: 'Aguas seguras',
  },
  {
    question: '¿Qué indica una boya con conos negros vértices arriba?',
    options: ['Sur', 'Este', 'Norte', 'Oeste'],
    answer: 'Norte',
  },
  {
    question: '¿Qué se entiende por pitada larga?',
    options: ['1 segundo', '2 segundos', 'Entre 4 y 6 segundos', '10 segundos'],
    answer: 'Entre 4 y 6 segundos',
  },
  {
    question: '¿Qué tipo de incendio es el eléctrico?',
    options: ['A', 'B', 'C', 'D'],
    answer: 'C',
  },
  {
    question: '¿Qué tipo de extintor se usa en incendios clase C?',
    options: ['Agua', 'Espuma', 'CO2', 'Tierra'],
    answer: 'CO2',
  },
  {
    question:
      '¿Qué debe hacer un buque que no entiende las intenciones del otro?',
    options: [
      '1 pitada larga',
      '3 pitadas cortas',
      '5 pitadas cortas y rápidas',
      '2 pitadas largas',
    ],
    answer: '5 pitadas cortas y rápidas',
  },
  {
    question: '¿Qué luces lleva un pesquero de arrastre de noche?',
    options: [
      '2 luces blancas',
      'Verde sobre blanca (todo horizonte, en línea vertical)',
      'Roja sobre blanca',
      'Blanca sobre verde',
    ],
    answer: 'Verde sobre blanca (todo horizonte, en línea vertical)',
  },
  {
    question: '¿Qué señal diurna lleva un pesquero de arrastre >20m?',
    options: [
      'Un balón negro',
      'Dos conos negros unidos por sus puntas en línea vertical',
      'Canasto de pesca',
      'Un cono y una esfera',
    ],
    answer: 'Dos conos negros unidos por sus puntas en línea vertical',
  },
  {
    question: '¿Qué luces debe llevar un buque sin gobierno?',
    options: [
      '2 luces rojas en línea vertical todo horizonte en el lugar más visible',
      'Una verde',
      'Una blanca',
      'Roja y blanca',
    ],
    answer:
      '2 luces rojas en línea vertical todo horizonte en el lugar más visible',
  },
  {
    question: '¿Qué significa sotavento?',
    options: [
      'Donde viene el viento',
      'Zona alta',
      'Banda opuesta al viento',
      'Zona con olas',
    ],
    answer: 'Banda opuesta al viento',
  },
  {
    question: '¿Qué luz lleva un buque de vela y motor (día)?',
    options: [
      'Cónica vértice abajo',
      'Balón negro',
      'Bandera roja',
      'Dos conos',
    ],
    answer: 'Cónica vértice abajo',
  },
  {
    question: '¿Qué significa tres pitadas cortas?',
    options: [
      'Caigo a babor',
      'Caigo a estribor',
      'Estoy dando atrás',
      'Parado',
    ],
    answer: 'Estoy dando atrás',
  },
  {
    question: '¿Qué hacer al cruzarse dos buques con riesgo de colisión?',
    options: [
      'Ambos maniobran',
      'El que tiene al otro por estribor cede',
      'El más grande tiene prioridad',
      'Esperar señal acústica',
    ],
    answer: 'El que tiene al otro por estribor cede',
  },
  {
    question: '¿Qué debe hacer el buque que alcanza a otro?',
    options: [
      'Seguir igual',
      'Pedir permiso',
      'Apartarse y evitar riesgo de colisión',
      'Pasar por babor',
    ],
    answer: 'Apartarse',
  },
  {
    question: '¿Qué se debe hacer al entrar a puerto?',
    options: [
      'Aumentar velocidad',
      'Dar pitadas',
      'Verificar entrada libre y navegar con velocidad de seguridad',
      'Usar luces blancas',
    ],
    answer: 'Verificar entrada libre y navegar con velocidad de seguridad',
  },
  {
    question: '¿Qué instrumento indica presión atmosférica?',
    options: ['Anemómetro', 'Higrómetro', 'Barómetro', 'Termómetro'],
    answer: 'Barómetro',
  },
  {
    question: '¿Qué indica presión <760 mm?',
    options: [
      'Buen tiempo',
      'Cambio sensible en condiciones',
      'Aumento de temperatura',
      'Mar en calma',
    ],
    answer: 'Cambio sensible en condiciones',
  },
  {
    question: '¿Qué tipo de nubes pueden producir tornados?',
    options: ['Cumulus', 'Stratus', 'Cumulus-nimbus', 'Cirrus'],
    answer: 'Cumulus-nimbus',
  },
  {
    question: '¿Qué hacer si el canal es angosto?',
    options: [
      'Fondear en el medio',
      'Arrimarse a estribor (para facilitar el paso seguro en canales angostos)',
      'Pasar por babor',
      'Salir del canal',
    ],
    answer: 'Arrimarse a estribor',
  },
  {
    question: '¿Qué significa una pitada corta?',
    options: [
      'Estoy fondeado',
      'Caigo a estribor',
      'Cambio de rumbo a babor',
      'Estoy detenido',
    ],
    answer: 'Caigo a estribor',
  },
  {
    question: '¿Qué indica una boya blanca con grupo de dos destellos?',
    options: [
      'Casco a pique',
      'Zona de fondeo',
      'Aguas profundas',
      'Obstáculo sumergido',
    ],
    answer: 'Casco a pique',
  },
  {
    question: '¿Qué debe hacer un buque navegando en visibilidad reducida?',
    options: [
      'Aumentar velocidad',
      'Parar máquinas',
      'Reducir velocidad y emitir señales',
      'Navegar en zigzag',
    ],
    answer: 'Reducir velocidad y emitir señales',
  },
  {
    question:
      '¿Qué tipo de viento predomina en el Río de la Plata por la tarde en verano?',
    options: ['Norte', 'Oeste', 'Este-sureste', 'Sur'],
    answer: 'Este-sureste',
  },
  {
    question:
      '¿Qué señal sónica realiza un buque fondeado en visibilidad reducida?',
    options: [
      'Una pitada cada minuto',
      'Campana 5 seg cada minuto',
      'Tres pitadas cortas',
      'Una larga y una corta',
    ],
    answer: 'Campana 5 seg cada minuto',
  },
  {
    question: '¿Qué extintor no debe usarse en materiales eléctricos?',
    options: ['CO2', 'Espuma', 'Polvo químico', 'Agente limpio'],
    answer: 'Espuma',
  },
  {
    question: '¿Qué buques tienen prioridad sobre uno a motor?',
    options: [
      'Buque sin gobierno, pesca, vela, maniobra limitada',
      'Solo pesqueros',
      'Solo veleros',
      'Ninguno',
    ],
    answer: 'Buque sin gobierno, pesca, vela, maniobra limitada',
  },
  {
    question: '¿Qué luz tiene alcance de 225° desde proa?',
    options: ['Babor', 'Estribor', 'Tope', 'Fondeo'],
    answer: 'Tope',
  },
  {
    question:
      '¿Qué tipo de luz lleva una embarcación de menos de 7m fuera de canales?',
    options: [
      'Todas las reglamentarias',
      'Luz blanca opcional',
      'Ninguna obligatoria',
      'Luz verde intermitente',
    ],
    answer: 'Ninguna obligatoria',
  },
  {
    question: '¿Qué distancia debe tener la cadena al fondear?',
    options: ['2x fondo', '3x fondo', '5x fondo', '10x fondo'],
    answer: '3x fondo',
  },
  {
    question: '¿Qué hacer si se quiere adelantar en canal angosto?',
    options: [
      'Emitir dos pitadas largas y una corta o dos cortas',
      'Pedir permiso por radio',
      'Hacer señales luminosas',
      'No se puede adelantar',
    ],
    answer: 'Emitir dos pitadas largas y una corta o dos cortas',
  },
  {
    question: '¿Qué indica una señal bicónica durante el día?',
    options: [
      'Buque fondeado',
      'Buque sin gobierno',
      'Buque remolcando >183m',
      'Pesquero',
    ],
    answer: 'Buque remolcando >183m',
  },
  {
    question: '¿Cuántas luces blancas lleva un remolcador de >183m?',
    options: ['1', '2', '3', '4'],
    answer: '3',
  },
  {
    question: '¿Qué se considera un destello?',
    options: ['0.5 seg', '1 seg', '2 seg', '5 seg'],
    answer: '1 seg',
  },
  {
    question: '¿Qué intervalo hay entre destellos?',
    options: ['0.5 seg', '1 seg', '2 seg', '5 seg'],
    answer: '1 seg',
  },
  {
    question: '¿Cuál debe ser el intervalo entre señales sucesivas?',
    options: ['5 seg', '10 seg mínimo', '15 seg', '20 seg'],
    answer: '10 seg mínimo',
  },
  {
    question: '¿Qué indica una boya negra con franjas rojas?',
    options: [
      'Aguas seguras',
      'Casco a pique',
      'Peligro al norte',
      'Zona de fondeo',
    ],
    answer: 'Casco a pique',
  },
  {
    question: '¿Qué marca de tope tiene una boya de aguas seguras?',
    options: [
      'Dos conos negros',
      'Una esfera roja',
      'Un cono y esfera',
      'Cruz negra',
    ],
    answer: 'Una esfera roja',
  },
  {
    question: '¿Qué señal acústica da un buque sin gobierno en niebla?',
    options: [
      'Una larga cada 2 min',
      'Una larga + dos cortas cada 2 min',
      'Tres cortas',
      'Campana continua',
    ],
    answer: 'Una larga + dos cortas cada 2 min',
  },
  {
    question: '¿Qué luces usa un pesquero no de arrastre?',
    options: [
      'Roja sobre verde',
      'Verde sobre blanca (todo horizonte, en línea vertical)',
      'Roja sobre blanca',
      'Dos blancas',
    ],
    answer: 'Roja sobre blanca',
  },
  {
    question: '¿Qué luz indica un buque de menos de 12m remolcado?',
    options: [
      'Luz de tope',
      'Luz verde',
      'Luz blanca todo horizonte a popa',
      'Luz roja',
    ],
    answer: 'Luz blanca todo horizonte a popa',
  },
  {
    question: '¿Cuántas pitadas indica que voy a babor?',
    options: ['1', '2', '3', '5'],
    answer: '2',
  },
  {
    question: '¿Qué luz indica el fondeo durante el día?',
    options: ['Ninguna', 'Luz verde', 'Balón negro', 'Cruz roja'],
    answer: 'Balón negro',
  },
  {
    question: '¿Qué señal diurna lleva un buque sin gobierno?',
    options: [
      'Bandera amarilla',
      'Cruz roja',
      'Dos balones negros',
      'Una esfera negra',
    ],
    answer: 'Dos balones negros',
  },
  {
    question: '¿Qué significa una luz blanca todo horizonte?',
    options: ['Fondeado', 'Varado', 'En movimiento', 'Emergencia'],
    answer: 'Fondeado',
  },
  {
    question: '¿Qué se usa para reconocer un fondeadero?',
    options: [
      'Corriente intensa',
      'Fondo rocoso',
      'Buen tenedero y abrigo',
      'Altura de olas',
    ],
    answer: 'Buen tenedero y abrigo',
  },
  {
    question: '¿Qué nubes anuncian vientos fuertes?',
    options: ['Cirros', 'Stratus', 'Cumulus-nimbus', 'Altostratus'],
    answer: 'Cumulus-nimbus',
  },
  {
    question: '¿Cuál es la señal acústica universal de peligro?',
    options: [
      'Una larga',
      'Dos cortas',
      'Cinco cortas y rápidas',
      'Tres largas',
    ],
    answer: 'Cinco cortas y rápidas',
  },
  {
    question: '¿Qué debe mostrar un velero y motor navegando de día?',
    options: [
      'Un cono vértice abajo',
      'Una esfera roja',
      'Dos conos',
      'Ninguna señal',
    ],
    answer: 'Un cono vértice abajo',
  },
  {
    question: '¿Qué embarcaciones no deben entorpecer buques en canales?',
    options: [
      'Mayores a 20m',
      'Veleros y menores a 20m',
      'Remolcadores',
      'Todas las embarcaciones',
    ],
    answer: 'Veleros y menores a 20m',
  },
  {
    question: '¿Qué tipo de boya indica aguas más profundas al norte?',
    options: [
      'Negro sobre amarillo con conos hacia arriba',
      'Rojo sólido',
      'Amarilla con esfera',
      'Blanco intermitente',
    ],
    answer: 'Negro sobre amarillo con conos hacia arriba',
  },
  {
    question: '¿Qué significa zona C?',
    options: [
      'Aguas abiertas',
      '15 millas del puerto de despacho',
      'Frontera marítima',
      'Zona exclusiva',
    ],
    answer: '15 millas del puerto de despacho',
  },
  {
    question: '¿Cuál es el tipo de extintor universal?',
    options: ['CO2', 'Espuma', 'Polvo químico seco', 'Agua'],
    answer: 'Polvo químico seco',
  },
  {
    question: '¿Qué extintor no conduce electricidad?',
    options: ['Agua', 'CO2', 'Espuma', 'Tierra'],
    answer: 'CO2',
  },
  {
    question:
      '¿Cuál es la mejor forma de entrar sin arrancada a un fondeadero?',
    options: [
      'Proando al viento o corriente',
      'Popa al viento',
      'Lado a la corriente',
      'Velocidad constante',
    ],
    answer: 'Proando al viento o corriente',
  },
  {
    question: '¿Qué se debe hacer en visibilidad reducida?',
    options: [
      'Apagar luces',
      'Emitir señales y reducir velocidad',
      'Aumentar velocidad',
      'Navegar sin luces',
    ],
    answer: 'Emitir señales y reducir velocidad',
  },
  {
    question: '¿Qué elemento se usa para medir presión?',
    options: ['Termómetro', 'Barómetro', 'Anemómetro', 'Veleta'],
    answer: 'Barómetro',
  },
  {
    question: '¿Cuál es la forma de indicar socorro desde el aire?',
    options: [
      'Tirar bengalas',
      'Cruz con tela naranja',
      'Bandera negra',
      'Reflejo con espejo',
    ],
    answer: 'Cruz con tela naranja',
  },
  {
    question: '¿Qué se hace al detectar que se garrea?',
    options: [
      'Esperar',
      'Aumentar cadena y verificar marcaciones',
      'Levantar ancla de inmediato',
      'Cambiar dirección',
    ],
    answer: 'Aumentar cadena y verificar marcaciones',
  },
  {
    question: '¿Cuál es el número de salvavidas obligatorio?',
    options: [
      'Uno por pasajero',
      'Uno por cada dos personas',
      'Cinco por embarcación',
      'Solo para tripulación',
    ],
    answer: 'Uno por pasajero',
  },
];

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
}

export default function PreguntadosApp() {
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  const shuffleArray = <T extends unknown>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffleQuestions = () => {
    const shuffledQuestions = shuffleArray(allQuestions).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options),
    }));
    setQuestions(shuffledQuestions);
  };

  useEffect(() => {
    shuffleQuestions();
  }, []);

  // Efecto para el temporizador
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timerActive && !showAnswer && !gameFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showAnswer) {
      handleTimeOut();
    }

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, gameFinished, timerActive]);

  const handleTimeOut = () => {
    setTimerActive(false);
    setShowAnswer(true);
    // Mostrar la respuesta correcta cuando se acaba el tiempo
    setSelected(null);
  };

  const handleAnswer = (option: string) => {
    if (showAnswer) return;
    setTimerActive(false);
    setSelected(option);
    setShowAnswer(true);

    // Usamos currentQuestion en lugar de questions[current] para evitar problemas de sincronización
    const currentQuestion = questions[current];
    if (currentQuestion && option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
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
      setCurrent((prev) => prev + 1);
    }
  };

  if (questions.length === 0) {
    return <div className="text-gray-900">Cargando preguntas...</div>;
  }

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardContent className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                ¡Juego terminado!
              </h2>
              <p className="text-lg mb-4 text-gray-900">
                Tu puntaje final: {score} de {questions.length}
              </p>
              <Button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Jugar de nuevo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[current];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Proapp al Brevet
            </h1>
            <p className="text-sm text-gray-700 italic">
              Tu compañero para aprobar el examen náutico PRENA
            </p>
          </div>
          <Button
            variant="outline"
            onClick={resetGame}
            className="text-gray-900 border-gray-300"
          >
            Reiniciar
          </Button>
        </div>

        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-900">
                Pregunta {current + 1} de {questions.length}
              </span>
              <span
                className={`text-sm font-medium ${
                  timeLeft <= 10 ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                Tiempo: {timeLeft}s
              </span>
            </div>
            <p className="text-lg font-medium mb-4 text-gray-900">
              {currentQuestion.question}
            </p>
            <div className="grid gap-2">
              {currentQuestion.shuffledOptions.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  variant={
                    showAnswer
                      ? option === currentQuestion.answer
                        ? 'default'
                        : option === selected
                        ? 'destructive'
                        : 'outline'
                      : 'outline'
                  }
                  disabled={showAnswer || timeLeft === 0}
                  className={`
                    ${
                      showAnswer && option === currentQuestion.answer
                        ? 'bg-green-500 hover:bg-green-500 text-white'
                        : ''
                    }
                    ${
                      showAnswer &&
                      option === selected &&
                      option !== currentQuestion.answer
                        ? 'bg-red-500 hover:bg-red-500 text-white'
                        : ''
                    }
                    ${!showAnswer ? 'text-gray-900 hover:bg-gray-200' : ''}
                  `}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showAnswer && (
              <div className="mt-4">
                <p className="text-gray-900">
                  {selected === currentQuestion.answer
                    ? '✅ ¡Correcto!'
                    : selected
                    ? `❌ Incorrecto. Respuesta correcta: ${currentQuestion.answer}`
                    : `⏱️ Tiempo agotado! La respuesta correcta era: ${currentQuestion.answer}`}
                </p>
                <Button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={nextQuestion}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-900">Puntaje: {score}</p>
          <div className="flex items-center">
            <span
              className={`text-sm font-medium mr-2 ${
                timeLeft <= 10 ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              Tiempo restante: {timeLeft}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
