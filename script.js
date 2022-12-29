let op = ["+", "-", "*", "/"];
let points = 0;
let num1;
let num2;
let index;
let isActive = false;
let lvlNum = 1;
let lvlUpNum = 5;
let max;

// EVENT LISTENERS

// Dark mode
const container = document.querySelector(".container");
const toggle = document.querySelector(".toggle");

container.className = localStorage.getItem("theme");
if (container.className == "null") {
  container.className = "container";
}

toggle.firstElementChild.className = localStorage.getItem("icon");
if (toggle.firstElementChild.className == "null") {
  toggle.firstElementChild.className = "far fa-sun";
}

toggle.addEventListener("click", () => {
  container.classList.toggle("dark")
    ? (toggle.firstElementChild.className = "far fa-moon")
    : (toggle.firstElementChild.className = "far fa-sun");
  localStorage.setItem("theme", container.className);
  localStorage.setItem("icon", toggle.firstElementChild.className);
});

// Keyboard controls
const input = document.getElementById("answer-el");
input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    next();
  } else if (e.key == "Escape") {
    skip();
  }
});

// Highscore local storage
let hsPoints = localStorage.getItem("hsPoints");
if (hsPoints == null) {
  hsPoints = 0;
} else {
  document.getElementById("highscore-el").textContent =
    "High Score: " + hsPoints + " pts";
}

// Hide/show start/stop button
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
});
stopBtn.addEventListener("click", () => {
  stopBtn.style.display = "none";
  startBtn.style.display = "block";
});

// FUNCTIONS
function numGen() {
  num1 = Math.floor(Math.random() * (max - 2 + 1)) + 2;
  num2 = Math.floor(Math.random() * (max - 2 + 1)) + 2;
  if (num1 % num2 != 0) {
    numGen();
  }
}
// Random operator and operand generation and assignment
function gen() {
  numGen();
  index = Math.floor(Math.random() * 4);
  // Assignment of generated operands and operator
  document.getElementById("num1").textContent = num1;
  document.getElementById("op").textContent = op[index];
  document.getElementById("num2").textContent = num2;
  // Deletion of errorMsg and text input content
  document.getElementById("error-el").textContent = "";
  document.getElementById("answer-el").value = "";
}
// Increments current point count
function getPoint() {
  sfxSelect();
  document.getElementById("point-el").textContent =
    "Current: " + ++points + " pts";

  if ((points == lvlUpNum)) {
    lvlUp();
  }
}

// Wrong answer message
function wrongAns() {
  sfxError();
  let wrongAns = "Answer is not correct";
  document.getElementById("error-el").textContent = wrongAns;
}

// Checks if game is started, then gets generated numbers of expression
// and compares it with the answer from text input
function next() {
  if (isActive == false) {
    sfxError();
    document.getElementById("error-el").textContent =
      "Please start the game first!";
  } else {
    num1 = parseInt(document.getElementById("num1").textContent);
    num2 = parseInt(document.getElementById("num2").textContent);
    index = document.getElementById("op").textContent;
    let answer = parseInt(document.getElementById("answer-el").value);
    let result;

    switch (index) {
      case "+":
        result = num1 + num2;
        if (result == answer) {
          getPoint();
          gen();
        } else wrongAns();
        break;
      case "-":
        result = num1 - num2;
        if (result == answer) {
          getPoint();
          gen();
        } else wrongAns();
        break;
      case "*":
        result = num1 * num2;
        if (result == answer) {
          getPoint();
          gen();
        } else wrongAns();
        break;
      case "/":
        result = num1 / num2;
        if (result == answer) {
          getPoint();
          gen();
        } else wrongAns();
        break;
    }
  }
}
// Generates expression again and decrements the point count
function skip() {
  if (isActive == false) {
    sfxError();
    document.getElementById("error-el").textContent =
      "Please start the game first!";
  } else {
    sfxClick();
    if (points > 0) {
      document.getElementById("point-el").textContent =
        "Current: " + --points + " pts";
    } else {
      document.getElementById("point-el").textContent = "Current: 0 pts";
    }
    gen();
  }
}

// Start
function start() {
  max = 5;
  sfxStart();
  document.getElementById("title-text").textContent = "Level 1";
  isActive = true;
  gen();
}
// Stop
function stop() {
  isActive = false;
  setHs();
  points = 0;
  lvlUpNum = 5;
  lvlNum = 1;
  document.getElementById("point-el").textContent = "Current: 0 pts";
  document.getElementById("num1").textContent = "?";
  document.getElementById("num2").textContent = "?";
  document.getElementById("title-text").textContent = "Math Quiz";
}
// High Score
function setHs() {
  if (points > hsPoints) {
    newHs();
    hsPoints = points;
    document.getElementById("highscore-el").textContent =
      "High Score: " + hsPoints + " pts";
    localStorage.setItem("hsPoints", hsPoints);
  } else {
    sfxStop();
    document.getElementById("highscore-el").textContent =
      "High Score: " + hsPoints + " pts";
  }
}
// Level up
function lvlUp() {
  sfxLvlUp();
  lvlUpNum += 5;
  let lvlTitle = "Level " + (++lvlNum);
  document.getElementById("title-text").textContent = lvlTitle;
  max += 3;
}

// SFX
function sfxStart() {
  var click = new Audio("sfx/start.ogg");
  click.play();
}
function sfxStop() {
  var click = new Audio("sfx/stop.ogg");
  click.play();
}
function sfxClick() {
  var click = new Audio("sfx/click.ogg");
  click.play();
}
function sfxSelect() {
  var click = new Audio("sfx/select.ogg");
  click.play();
}
function sfxError() {
  var click = new Audio("sfx/error.ogg");
  click.play();
}
function newHs() {
  var click = new Audio("sfx/new-hs.ogg");
  click.play();
}
function sfxLvlUp() {
  var click = new Audio("sfx/lvlup.ogg");
  click.play();
}
