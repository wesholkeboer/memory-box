"use strict";

let listItems = document.querySelectorAll(".card");
let newDeck = [];
let deck = document.querySelector(".deck");
let resetButton = document.querySelector(".reset-button");
let deckArr = document.querySelector(".deckArr");
let openedCards = [];
let second = 45;
let timer = document.querySelector(".timer");
let myTimer;
let interval;
let startButton = document.querySelector(".start-button");
let startModal = document.querySelector(".start-modal");

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
  second = 45;
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

// console.dir(thisCard);

// const cardOpen = () => {
//   openedCards.push(thisCard);
//   let length = openedCards.length;
//   if (length === 2) {
//     if (openedCards[0].type === openedCards[1].type) {
//       matched();
//     } else {
//       unmatched();
//     }
//   }
// };

const matched = () => {
  setTimeout(function () {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards = [];
  }, 1500);
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

// cardOpen();

//timer
const startTimer = () => {
  myTimer = setInterval(() => {
    if (second === 0) {
      clearInterval(myTimer);
    } else {
      console.log(second);
      second--;
      timer.innerText = `Countdown: ${second}s`;
    }
  }, 1000);
};
