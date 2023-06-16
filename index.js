// Arreglo con los colores del juego
const colors = ['green', 'red', 'yellow', 'blue'];

// Arreglo para guardar los movimientos del juego
let gamePattern = [];

// Arreglo para guardar los movimientos del usuario
let userPattern = [];

// Variable para guardar el nivel actual
let level = 0;

// Variable para verificar si el juego ha comenzado
let started = false;

// Variable para verificar si es el turno del jugador
let playerTurn = false;

//variables para sonidos

const green = document.getElementById("greenSound")
const red = document.getElementById("redSound")
const yellow = document.getElementById("yellowSound")
const blue = document.getElementById("blueSound")

//variables para mensaje cuando pierde el usuario
const start = document.getElementById("start")
const container = document.getElementById('btn-container');
const adviceLose = document.createElement("div")
adviceLose.innerHTML = '<h2>¡Perdiste!</h2><button onclick="startGame()">Volver a jugar</button>'

//variable para aside de info turno + level
const aside = document.getElementById("aside")
const info = document.createElement("div")
const nivel = document.createElement("p")
const turno = document.createElement("p")
info.append(nivel, turno)
aside.append(info)

// Función para comenzar el juego
function startGame() {
  if (!started) {
    gamePattern = [];
    userPattern = [];
    level = 0;
    started = true;
    playerTurn = false;
    start.remove(container)
    adviceLose.remove(container)
    nextSequence();
    
  }
}

// Función para generar el próximo movimiento
function nextSequence() {
  level++;
  userPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = colors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSequence(gamePattern);
  nivel.innerText = `Nivel: ${level}`
}

// Función para reproducir la secuencia de colores
function playSequence(sequence) {
  let i = 0;
  const interval = setInterval(() => {
    playSound(sequence[i]);
    animateButton(sequence[i]);
    i++;
    if (i === sequence.length) {
      clearInterval(interval);
      playerTurn = true;
      turno.innerText = "Tu turno"
    }
  }, 1000);
}

// Función para reproducir el sonido del color
function playSound(color) {
  const sound = document.getElementById(`${color}Sound`)
  sound.play()
}

// Función para animar el botón al ser seleccionado
function animateButton(color) {
  const button = document.getElementById(color);
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 500);
}

// Función para manejar el evento de clic en los botones
function handleButtonClick(color) {
  if (started && playerTurn) {
    playSound(color);
    animateButton(color);
    userPattern.push(color);
    checkAnswer(userPattern.length - 1);
  }
}

// Función para verificar la respuesta del usuario
function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userPattern.length === gamePattern.length) {
      playerTurn = false;
      turno.innerText = "Espera"
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    const wrong = document.getElementById("wrongSound")
    wrong.play()
  }
}

// Función para finalizar el juego
function gameOver() {
  container.append(adviceLose)
  started = false;
  playerTurn = false;
}
