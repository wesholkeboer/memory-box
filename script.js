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
let myTimer;
let startButton = document.querySelector(".start-button");
let startModal = document.querySelector(".start");
let failModal = document.querySelector(".fail");
let winModal = document.querySelector(".win");
let endModals = document.querySelectorAll(".end");
let matchCounter = 0;
let winTime = document.querySelector(".win-time");
let secondsTaken;

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
  startTimer();
  seconds = 45;
};

resetButton.addEventListener("click", reset);

const flipCard = (e) => {
  if (e.target.classList.contains("card")) {
    e.target.classList.toggle("flipCard");
    openedCards.push(e.target);
    let length = openedCards.length;
    if (length === 2) {
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
  setTimeout(function () {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards = [];
  }, 1500);

  if (matchCounter !== 1) {
    matchCounter++;
    if (matchCounter === 1) {
      setTimeout(function () {
        winFunction();
      }, 1500);
    }
  } else {
    winFunction();
  }
};

const winFunction = () => {
  setTimeout(function () {
    winModal.style.display = "flex";
    matchCounter === 0;
  }, 1500);
  secondsTaken = 45 - seconds;
  winTime.innerText = `you completed the space box in ${secondsTaken} seconds`;
  clearInterval(myTimer);
};

const unmatched = () => {
  disable();
  setTimeout(function () {
    openedCards[0].classList.remove("flipCard");
    openedCards[1].classList.remove("flipCard");
    enable();
    openedCards = [];
  }, 1500);
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
    } else {
      seconds--;
      timer.innerText = `Countdown: ${seconds}s`;
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
