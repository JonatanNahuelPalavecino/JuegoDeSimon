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
const toasty = document.getElementById("toasty")

//variables para mensaje cuando pierde el usuario
const start = document.getElementById("start")
const container = document.getElementById('btn-container');
const adviceLose = document.createElement("div")
adviceLose.classList = "game-advice"
adviceLose.innerHTML = 
  `
    <p class ="game-titleAdvice">¡Perdiste!</p>
    <button class="game-btn" onclick="startGame()">Volver a jugar</button>
  `

//variable para aside de info turno + level
const nivel = document.createElement("p")
nivel.classList = "game-detail"
nivel.innerText = "Nivel: 0"

const turno = document.createElement("p")
turno.classList = "game-detail"
turno.innerText = "Selecciona comenzar para jugar"

const aside = document.getElementById("aside")
aside.append(nivel, turno)

//Variable para notificar la superacion de 10 niveles
const textoNot = document.getElementById("title-advice")
const imgNot = document.getElementById("img-advice")

// Función para mostrar mensaje por la superacion de 10 niveles
function levelSuperiorA10() {
  textoNot.classList.add("active")
  imgNot.classList.add("active")
  toasty.play()
  setTimeout(() => {
    textoNot.classList.remove("active")
    imgNot.classList.remove("active")
  }, 2000)
}

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
  level % 11 === 0 ? levelSuperiorA10() : null
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
      turno.innerText = "Espera..."
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
