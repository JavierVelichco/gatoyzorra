let numPantalla;
let alphaTexto = 0; // opacidad para el fade-in
let imagenes = {};

function preload() {
  for (let i = 1; i <= 19; i++) {
    imagenes[i.toString()] = loadImage(`assets/${i}.png`);
  }
}

let pantallas = {
  // --- INTRO ---
  0: {
    texto: "Había una vez en un bosque lejano...\nUn campesino, un gato travieso y una zorra astuta.\nUna historia de decisiones está por comenzar.",
    imagen: "1",
    opciones: [{ texto: "Continuar", destino: 1 }]
  },

  // --- HISTORIA PREVIA ---
  1: {
    texto: "Un campesino tenía un gato travieso y glotón.",
    imagen: "2",
    opciones: [{ texto: "Continuar", destino: 2 }]
  },
  2: {
    texto: "Cansado de sus problemas, lo llevó al bosque en una bolsa.",
    imagen: "3",
    opciones: [{ texto: "Continuar", destino: 3 }]
  },
  3: {
    texto: "Es momento de elegir a quién acompañarás en esta historia.",
    imagen: "4",
    opciones: [
      { texto: "🐱 Ser el Gato", destino: 4 },
      { texto: "🦊 Ser la Zorra", destino: 10 }
    ]
  },

  // --- RAMA GATO ---
  4: {
    texto: "El campesino te abandona en el bosque. ¿Escapás de la bolsa?",
    imagen: "5",
    opciones: [
      { texto: "Sí", destino: 5 },
      { texto: "No", destino: 6 }
    ]
  },
  5: {
    texto: "Escapaste. Te encontrás con una zorra.\n¿Qué hacés?",
    imagen: "6",
    opciones: [
      { texto: "Atacarla", destino: 7 },
      { texto: "Decir que sos Rey", destino: 8 }
    ]
  },
  6: {
    texto: "No escapaste...\nFINAL (Gato atrapado en el bosque).",
    imagen: "7",
    opciones: [{ texto: "Volver al inicio", destino: 0 }]
  },
  7: {
    texto: "La atacaste, pero ella te vence.\nFINAL (Gato rechazado).",
    imagen: "8",
    opciones: [{ texto: "Volver al inicio", destino: 0 }]
  },
  8: {
    texto: "La zorra propone vivir juntos. ¿Aceptás?",
    imagen: "9",
    opciones: [
      { texto: "Sí", destino: 9 },
      { texto: "No", destino: 7 }
    ]
  },
  9: {
    texto: "La zorra convence a los animales del bosque de traerte comida.\nPero sos glotón...",
    imagen: "10",
    opciones: [
      { texto: "Comés todo", destino: 20 },
      { texto: "Te escondés con miedo", destino: 21 }
    ]
  },
  20: {
    texto: "Todos se asombran de tu voracidad.\nFINAL (Gato Rey alimentado por los animales).",
    imagen: "11",
    opciones: [{ texto: "Volver al inicio", destino: 0 }]
  },
  21: {
    texto: "No salís y los animales te desprecian.\nFINAL (Gato solo y olvidado).",
    imagen: "12",
    opciones: [{ texto: "Volver al inicio", destino: 0 }]
  },

  // --- RAMA ZORRA ---
  10: {
    texto: "Salís a pasear por el bosque.\nEncontrás una bolsa misteriosa...",
    imagen: "13",
    opciones: [
      { texto: "Abrir la bolsa", destino: 11 },
      { texto: "Ignorarla", destino: 16 }
    ]
  },
  11: {
    texto: "Un gato salta afuera diciendo que es un Rey.\n¿Le creés?",
    imagen: "14",
    opciones: [
      { texto: "Sí", destino: 12 },
      { texto: "No", destino: 16 }
    ]
  },
  12: {
    texto: "Proponés vivir juntos en tu casa del bosque.",
    imagen: "15",
    opciones: [{ texto: "Continuar", destino: 13 }]
  },
  13: {
    texto: "Después de varios días, ambos se quedan sin comida.\nEl gato pide ayuda a otros animales...",
    imagen: "16",
    opciones: [
      { texto: "Aceptar la ayuda", destino: 14 },
      { texto: "Buscar comida sola", destino: 15 }
    ]
  },
  14: {
    texto: "Los animales traen comida para el Rey y la zorra.\nFINAL (Reinado compartido).",
    imagen: "17",
    opciones: [{ texto: "Volver al inicio", destino: 0 }]
  },
  15: {
    texto: "No alcanzás la comida, el gato se enoja y se va.\nFINAL (Zorra abandonada).",
    imagen: "18",
    opciones: [{ texto: "Volver al inicio", destino: 0 }]
  },
  16: {
    texto: "Ignoraste al gato o lo devoraste.",
    imagen: "19",
    opciones: [{ texto: "Volver al inicio", destino: 0 }]
  }
};

function setup() {
  createCanvas(600, 600);
  numPantalla = 0; // arranca en la intro
  textAlign(CENTER, CENTER);
  textSize(22);
}

function draw() {
  background(50, 100, 150);

  let pantalla = pantallas[numPantalla];

  // --- Mostrar imagen si la pantalla tiene una ---
  if (pantalla.imagen && imagenes[pantalla.imagen]) {
    imageMode(CENTER);
    image(imagenes[pantalla.imagen], width / 2, height / 2, width, height);
  }

  // --- Fade-in del subtítulo ---
  alphaTexto = lerp(alphaTexto, 255, 0.05);

  // --- Caja para texto + fondo ---
  let cajaX = width / 2;
  let cajaY = height * 0.8;
  let cajaW = width * 0.9;
  let cajaH = height * 0.25;

  push();
  rectMode(CENTER);

  // Fondo negro translúcido
  fill(0, alphaTexto * 0.6);
  rect(cajaX, cajaY, cajaW, cajaH, 12);

  // Texto en blanco dentro de esa caja
  fill(255, alphaTexto);
  textAlign(CENTER, CENTER);
  textSize(22);
  textLeading(28);
  text(pantalla.texto, cajaX, cajaY, cajaW * 0.9, cajaH * 0.9);
  pop();

  // --- Botones ---
  for (let i = 0; i < pantalla.opciones.length; i++) {
    let x = width / 2;
    let y = height / 2 + i * 100;
    dibujarBoton(pantalla.opciones[i].texto, x, y);
  }
}

function dibujarBoton(txt, x, y) {
  push();
  rectMode(CENTER);

  // efecto de latido
  let escala = 1 + sin(frameCount * 0.1) * 0.1;
  translate(x, y);
  scale(escala);

  // efecto hover
  if (mouseX > -130 + x && mouseX < 130 + x &&
    mouseY > -30 + y && mouseY < 30 + y) {
    fill(255, 220, 180);
  } else {
    fill(230);
  }

  rect(0, 0, 260, 60, 12);
  fill(0);
  text(txt, 0, 0);
  pop();
}

function mousePressed() {
  let pantalla = pantallas[numPantalla];
  for (let i = 0; i < pantalla.opciones.length; i++) {
    let x = width / 2;
    let y = height / 2 + i * 100;

    if (mouseX > x - 130 && mouseX < x + 130 &&
      mouseY > y - 30 && mouseY < y + 30) {
      numPantalla = pantalla.opciones[i].destino;
      alphaTexto = 0; // reinicia fade-in
    }
  }
}
