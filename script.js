"use strict";

let listItems = document.querySelectorAll(".card");
let newDeck = [];
let deck = document.querySelector(".deck");
let resetButton = document.querySelector(".reset-button");

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
