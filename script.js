"use strict";

let body = document.querySelector("body");
let listItems = document.querySelectorAll(".card");
let newDeck = [];
let deck = document.querySelector(".deck");
let resetButton = document.querySelector(".reset-button");
let deckArr = document.querySelector(".deckArr");
let openedCards = [];
let seconds;
let timer = document.querySelector(".timer");
let score = document.querySelector(".score");
let myTimer;
let startButton = document.querySelector(".start-button");
let startModal = document.querySelector(".start");
let failModal = document.querySelector(".fail");
let winModal = document.querySelector(".win");
let endModals = document.querySelectorAll(".end");
let matchCounter = 0;
let winTime = document.querySelector(".win-time");
let winScore = document.querySelector(".win-score");
let scoreCounter = 0;
let secondsTaken;
// let deckBackground = document.querySelector(".deck-background");

listItems.forEach((item) => {
  newDeck.push(item);
});

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const shuffleDeck = () => {
  shuffle(newDeck);
  deck.innerHTML = "";
  newDeck.forEach((item) => {
    deck.append(item);
  });
};

const start = () => {
  startModal.style.display = "none";
  resetButton.style.display = "block";
  deck.style.display = "flex";
  reset();
};

startButton.addEventListener("click", start);

const reset = () => {
  shuffleDeck();
  newDeck.forEach((item) => {
    if (
      item.classList.contains("match") ||
      item.classList.contains("flipCard")
    ) {
      item.classList.remove("match", "flipCard");
    }
  });
  clearInterval(myTimer);
  timer.innerText = "countdown: 45s";
  scoreCounter = 0;
  score.innerText = "score: 0 big ones";
  openedCards = [];
  startTimer();
  seconds = 45;
  enable();
};

resetButton.addEventListener("click", reset);

const flipCard = (e) => {
  if (
    e.target.classList.contains("card") &&
    !e.target.classList.contains("match")
  ) {
    e.target.classList.toggle("flipCard");
    openedCards.push(e.target);
    let length = openedCards.length;
    if (length === 2) {
      disable();
      if (openedCards[0].type === openedCards[1].type) {
        matched();
      } else {
        unmatched();
      }
    }
  }
};

deck.addEventListener("click", flipCard);

const matched = () => {
  disable();
  let newScore = 1000 * seconds + Math.floor(Math.random() * 1000);
  scoreCounter += newScore;
  setTimeout(function () {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards = [];
    score.innerText = `score: ${scoreCounter} big ones`;
    enable();
  }, 1000);
  if (matchCounter !== 6) {
    matchCounter++;
    console.log(matchCounter);
    if (matchCounter === 6) {
      setTimeout(function () {
        winFunction();
        matchCounter = 0;
      }, 1000);
      console.log(matchCounter);
    }
  }
};

const winFunction = () => {
  disable();
  setTimeout(function () {
    winModal.style.display = "flex";
  }, 1000);
  secondsTaken = 45 - seconds;
  winTime.innerText = `all matches were found in ${secondsTaken} seconds`;
  winScore.innerText = `you earned a score of ${scoreCounter} big ones`;
  clearInterval(myTimer);
};

const unmatched = () => {
  setTimeout(function () {
    openedCards[0].classList.remove("flipCard");
    openedCards[1].classList.remove("flipCard");
    enable();
    openedCards = [];
  }, 1000);
};

const disable = () => {
  deck.removeEventListener("click", flipCard);
};

const enable = () => {
  deck.addEventListener("click", flipCard);
};

const startTimer = () => {
  myTimer = setInterval(() => {
    if (seconds === 0) {
      failModal.style.display = "flex";
      clearInterval(myTimer);
      matchCounter = 0;
    } else {
      seconds--;
      timer.innerText = `countdown: ${seconds}s`;
    }
  }, 1000);
};

const endReset = () => {
  endModals.forEach((item) => {
    item.style.display = "none";
  });
  reset();
};

body.addEventListener("click", (e) => {
  if (e.target.classList.contains("end-button")) {
    endReset();
  }
});
