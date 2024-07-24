//Assegnazione degli elementi
let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

//Implementazione inizializzazione
const init = () => {
  let gradientColor = context.createLinearGradient(0, 0, 135, 135);
  gradientColor.addColorStop(0, "#c3a3f1");
  gradientColor.addColorStop(1, "#6414e9");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, 200, 200);
};

//La posizione iniziale del mouse x e y è zero
let mouseX = 0;
let mouseY = 0;
let isDragged = false;

//Eventi per il tocco e il mouse
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Prova a vedere se il dispositivo è touch
const isTouchDevice = () => {
  try {
    //Prova a creare il TouchEvent. Darà errore per desktop
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Prendi la posizione del mouse
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//Posizione esatta x e y del mouse
const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

isTouchDevice();
//Inizia a grattare
canvas.addEventListener(events[deviceType].down, (event) => {
  isDragged = true;
  //Prendi posizione x e y
  getXY(event);
  scratch(mouseX, mouseY);
});

//Mousemove e Touchmove
canvas.addEventListener(events[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

//Stop
canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
});

//Se il mouse esce dal quadrato
canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  //destination-out disegna nuove forme dietro il contenuto esistente del canvas
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  //arc disegna un cerchio - x,y,raggio,angolo di inizio,angolo di fine
  context.arc(x, y, 12, 0, 2 * Math.PI);
  context.fill();
};

window.onload = init();
