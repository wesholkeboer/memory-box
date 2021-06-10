"use strict";

let listItems = document.querySelectorAll(".card");
let newDeck = [];
let deck = document.querySelector(".deck");
let resetButton = document.querySelector(".reset-button");
let deckArr = document.querySelector(".deckArr");
let openedCards = [];

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

resetButton.addEventListener("click", shuffleDeck);

const flipCard = (e) => {
  if (e.target.classList.contains("card")) {
    e.target.classList.toggle("flipCard");
  }
};
deck.addEventListener("click", flipCard);

// const unFlipCard = () => {};

const cardOpen = () => {
  openedCards.push(deckArr);
  let length = openedCards.length;
  if (length === 2) {
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};

const matched = () => {
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards = [];
};

const unmatched = () => {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  setTimeout(function () {
    openedCards[0].classList.remove("flipCard", "unmatched");
    openedCards[1].classList.remove("flipCard", "unmatched");
    openedCards = [];
  }, 1500);
};
