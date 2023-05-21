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

// Función para comenzar el juego
function startGame() {
  if (!started) {
    gamePattern = [];
    userPattern = [];
    level = 0;
    started = true;
    playerTurn = false;
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
    }
  }, 1000);
}

// Función para reproducir el sonido del color
function playSound(color) {
  const audio = new Audio(`${color}.mp3`); // Archivo de sonido correspondiente a cada color
  audio.play();
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
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// Función para finalizar el juego
function gameOver() {
  const gameContainer = document.getElementById('game');
  gameContainer.innerHTML = '<h2>¡Perdiste!</h2><button onclick="startGame()">Volver a jugar</button>';
  started = false;
  playerTurn = false;
}
