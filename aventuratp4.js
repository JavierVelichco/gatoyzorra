let numPantalla;
let alphaTexto = 0; // opacidad para el fade-in
let imagenes = {};

function preload() {
  imagenes = {};

  // Carga todas las imágenes numeradas del 1 al 22
  for (let i = 1; i <= 25; i++) {
    imagenes[i.toString()] = loadImage(`assets/${i}.png`);
  }

  // Carga la imagen "trampa.png" con la clave "trampa"
  imagenes["trampa"] = loadImage("assets/trampa.png");
  imagenes["campesino"] = loadImage("assets/campesino.png");
  imagenes["zorra"] = loadImage("assets/zorra.png");
  imagenes["gato"] = loadImage("assets/gato.png");
  imagenes["llevar"] = loadImage("assets/llevar.png");
  imagenes["ignorar"] = loadImage("assets/ignorar.png");
  imagenes["comida"] = loadImage("assets/comida.png");
  imagenes["boton"] = loadImage("assets/boton.png");
}


let pantallas = {

  0: {
    imagen: "1",
    textoBox: { w: 400, h: 300 },
    posTexto: { x: 300, y: 300 },
    texto: "Camila Barbón\n\nJavier Velichco",
    opciones: [{
      texto: "Comienza la aventura",
      destino: 1,
      pos: { x: 300, y: 450 },  // ← posición personalizada
      estilo: {
        ancho: 250,
        alto: 50,
        fondo: [200, 255, 200],
        hover: [80, 240, 180],  // ← color al pasar el mouse
        texto: [0],
        borde: [50, 150, 50]
      }
    }]
  },
  // --- INTRO ---
  1: {
    textoBox: { w: 550, h: 400 },
    posTexto: { x: 300, y: 230 },
    texto: "Había una vez en un bosque lejano...\n\nUn campesino, un gato travieso y una zorra astuta.\n\nUna historia de decisiones está por comenzar.",
    imagen: "22",
    opciones: [{
      texto: "Continuar", destino: 2, pos: { x: 300, y: 450 },  // ← posición personalizada
      estilo: {
        ancho: 180,
        alto: 40,
        fondo: [200, 255, 200],
        hover: [80, 240, 180],  // ← color al pasar el mouse
        texto: [0],
        borde: [50, 150, 50]
      }
    }]
  },

  // --- HISTORIA PREVIA ---
  2: {
    texto: "Un campesino tenía un gato travieso y glotón.",
    imagen: "2",
    opciones: [{
      texto: "Continuar", destino: 3, pos: { x: 530, y: 480 },
      estilo: {
        imagen: "trampa",
        ancho: 150,          // tamaño del botón-imagen
        alto: 150
      }
    }]

  },

  3: {
    texto: "Cansado de sus travesuras, lo llevó al bosque en una bolsa.",
    imagen: "3",
    opciones: [{
      texto: "Continuar", destino: 4, pos: { x: 330, y: 415 },
      estilo: {
        imagen: "campesino",
        ancho: 260,          // tamaño del botón-imagen
        alto: 260
      }
    }]
  },
  4: {
    texto: "Es momento de elegir a quién acompañarás en esta historia.",
    imagen: "4",
    opciones: [
      {
        texto: "Ser el Gato",
        destino: 5,
        pos: { x: 460, y: 470 },
        estilo: {
          imagen: "gato",
          ancho: 300,
          alto: 300
        }
      },
      {
        texto: "Ser la Zorra",
        destino: 13,
        pos: { x: 180, y: 425 },
        estilo: {
          imagen: "zorra",
          ancho: 400,
          alto: 400
        }
      }
    ]
  },

  // --- RAMA GATO ---
  5: {
    texto: "El campesino te abandona en el bosque. ¿Escapás de la bolsa?",
    imagen: "5",
    opciones: [
      { texto: "Sí", destino: 6 },
      { texto: "No", destino: 7 }
    ]
  },
  6: {
    texto: "Escapaste. Te encontrás con una zorra.\n¿Qué hacés?",
    imagen: "6",
    opciones: [
      { texto: "Atacarla", destino: 8 },
      { texto: "Decir que sos Rey", destino: 9 }
    ]
  },
  7: {
    texto: "No escapaste...\nFINAL (Gato atrapado en el bosque).",
    imagen: "7",
    opciones: [{ texto: "FIN", destino: 21 }]
  },
  8: {
    texto: "La atacaste, pero ella te vence.\nFINAL (Gato rechazado).",
    imagen: "8",
    opciones: [{ texto: "FIN", destino: 21 }]
  },
  9: {
    texto: "La zorra propone vivir juntos. ¿Aceptás?",
    imagen: "9",
    opciones: [
      { texto: "Sí", destino: 10 },
      { texto: "No", destino: 8 }
    ]
  },
  10: {
    texto: "La zorra convence a los animales del bosque de traerte comida.\nPero sos glotón...",
    imagen: "10",
    opciones: [
      { texto: "Comés todo", destino: 21 },
      { texto: "Te escondés con miedo", destino: 22 }
    ]
  },
  11: {
    texto: "Todos se asombran de tu voracidad.\nFINAL (Gato Rey alimentado por los animales).",
    imagen: "11",
    opciones: [{ texto: "FIN", destino: 21 }]
  },
  12: {
    texto: "No salís y los animales te desprecian.\nFINAL (Gato solo y olvidado).",
    imagen: "12",
    opciones: [{ texto: "FIN", destino: 21 }]
  },

  // --- RAMA ZORRA ---
  13: {
    texto: "Salís a pasear por el bosque.\nEncontrás una bolsa misteriosa...\n ¿La llevás o la ignorás?",
    imagen: "13",
    opciones: [
      {
        texto: "Llevar la bolsa",
        destino: 14,
        pos: { x: 150, y: 540 },
        estilo: {
          imagen: "llevar",
          ancho: 150,
          alto: 100
        }
      },
      {
        texto: "Ignorar la bolsa",
        destino: 20,
        pos: { x: 450, y: 540 },
        estilo: {
          imagen: "ignorar",
          ancho: 100,
          alto: 100
        }
      }
    ]

  },
  14: {
    textoBox: { w: 400, h: 300 },
    posTexto: { x: 300, y: 350 },
    texto: "Al abrir la bolsa un gato salta diciendo ser el Rey.\n\n¿Le creés?",
    imagen: "14",

    opciones: [
      {
        texto: "Sí", destino: 15,
        estilo: {
          ancho: 60,
          alto: 60
        }
      },
      {
        texto: "No", destino: 19,
        estilo: {
          ancho: 60,
          alto: 60
        }
      }
    ]



  },
  15: {
    texto: "Le proponés vivir juntos en tu casa del bosque.",
    imagen: "15",
    opciones: [{ texto: "Continuar", destino: 16 }]
  },
  16: {
    texto: "Después de varios días, ambos se quedan sin comida.\nEl gato pide ayuda a otros animales...",
    imagen: "16",
    opciones: [
      { texto: "Aceptar la ayuda", destino: 17 },
      { texto: "Buscar comida sola", destino: 18 }
    ]
  },
  17: {
    texto: "Los animales traen comida para el Rey y la zorra.",
    imagen: "17",
    opciones: [{ texto: "FIN", destino: 21 }]
  },
  18: {
    texto: "No alcanzás la comida, el gato se enoja y se va.",
    imagen: "18",
    opciones: [{
      texto: "Continuar", destino: 21, pos: { x: 320, y: 375 },
      estilo: {
        imagen: "boton",
        ancho: 100,
        alto: 100
      }
    }]
  },


  19: {
    textoBox: { w: 300, h: 300 },
    posTexto: { x: 400, y: 150 },
    texto: "El gato estaba loco...\npero fue un buen almuerzo.",
    imagen: "19",
    opciones: [{
      texto: "FIN", destino: 21,
      pos: { x: 485, y: 455 },
      estilo: {
        imagen: "comida",
        ancho: 230,
        alto: 230

      },
    }]
  },
  20: {
    texto: "Ignoraste la bolsa, decides volver a tu casa tranquila.",
    imagen: "24",
    opciones: [{ texto: "FIN", destino: 21 }]
  },
  21: {
    texto: "Creditos.",
    imagen: "25",
    opciones: [{ texto: "volver al inicio", destino: 0 }]
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
  let numOpciones = pantalla.opciones.length;
  let espacioEntre = 300;
  let yBase = height * 0.85;

  // Mostrar imagen si la pantalla tiene una
  if (pantalla.imagen && imagenes[pantalla.imagen]) {
    imageMode(CENTER);
    image(imagenes[pantalla.imagen], width / 2, height / 2, width, height);
  }



  alphaTexto = lerp(alphaTexto, 255, 0.05);

  let cajaX = pantalla.posTexto?.x || width / 2;
  let cajaY = pantalla.posTexto?.y || height * 0.2;
  let cajaW = pantalla.textoBox?.w || width * 0.9;
  let cajaH = pantalla.textoBox?.h || height * 0.25;


  push();
  rectMode(CENTER);
  // fill(0, alphaTexto * 0.6);
  // rect(cajaX, cajaY, cajaW, cajaH, 12);

  fill(255, alphaTexto);
  textAlign(CENTER, CENTER);
  textSize(22);
  textLeading(28);
  text(pantalla.texto, cajaX, cajaY, cajaW * 0.9, cajaH * 0.9);
  pop();

  // loop para dibujar los botones
  for (let i = 0; i < numOpciones; i++) {
    let opcion = pantalla.opciones[i];
    let x = opcion.pos?.x;
    let y = opcion.pos?.y;

    if (x === undefined || y === undefined) {
      if (numOpciones === 1) {
        x = width / 2;
        y = yBase;
      } else if (numOpciones === 2) {
        x = width / 2 + (i === 0 ? -espacioEntre / 2 : espacioEntre / 2);
        y = yBase;
      } else {
        x = width / 2;
        y = yBase + i * 100;
      }
    }

    dibujarBoton(opcion.texto, x, y, opcion.estilo);
  }
}


function dibujarBoton(txt, x, y, estilo = {}) {
  push();
  rectMode(CENTER);
  imageMode(CENTER);

  // efecto de latido
  let escala = 1 + sin(frameCount * 0.05) * 0.1;
  translate(x, y);
  scale(escala);

  // tamaño personalizado o por defecto
  let w = estilo.ancho || 200;
  let h = estilo.alto || 40;

  // detectar hover (sin escala)
  let hovering = mouseX > x - w / 2 && mouseX < x + w / 2 &&
    mouseY > y - h / 2 && mouseY < y + h / 2;

  // 🖼️ Si tiene imagen, usarla como botón
  if (estilo.imagen && imagenes[estilo.imagen]) {
    if (hovering) {
      tint(255, 200); // efecto visual al pasar el mouse
    } else {
      noTint();
    }
    image(imagenes[estilo.imagen], 0, 0, w, h);
  } else {
    // Botón tradicional
    let colorFondo = hovering ? (estilo.hover || [80, 240, 180]) : (estilo.fondo || [200, 255, 200]);
    let colorTexto = estilo.texto || [0];
    let colorBorde = estilo.borde || null;


    // aplicar fondo
    fill(...colorFondo);
    if (colorBorde) {
      stroke(...colorBorde);
      strokeWeight(2);
    } else {
      noStroke();
    }

    rect(0, 0, w, h, 12);  // usa los valores personalizados


    // texto
    fill(...colorTexto);
    noStroke();
    text(txt, 0, 0);
  }
  pop();
}


function mousePressed() {
  let pantalla = pantallas[numPantalla];
  let numOpciones = pantalla.opciones.length;
  let espacioEntre = 300;
  let yBase = height * 0.85;
  let x, y;

  for (let i = 0; i < numOpciones; i++) {
    let opcion = pantalla.opciones[i];
    let estilo = opcion.estilo || {};
    let w = estilo.ancho || 260;
    let h = estilo.alto || 60;

    let x = opcion.pos?.x;
    let y = opcion.pos?.y;

    if (x === undefined || y === undefined) {
      if (numOpciones === 1) {
        x = width / 2;
        y = yBase;
      } else if (numOpciones === 2) {
        x = width / 2 + (i === 0 ? -espacioEntre / 2 : espacioEntre / 2);
        y = yBase;
      } else {
        x = width / 2;
        y = yBase + i * 100;
      }
    }

    if (mouseX > x - w / 2 && mouseX < x + w / 2 &&
      mouseY > y - h / 2 && mouseY < y + h / 2) {
      numPantalla = opcion.destino;
      alphaTexto = 0;
    }
  }

}

