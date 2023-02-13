let targetWord = "";
let score = 0;
let letters = [];

// choose a new word from the words list
function chooseWord() {
targetWord = words[Math.floor(Math.random() * words.length)];
letters = targetWord.split('');
}

// shuffle the letters array to create a new jumbled word
function shuffleLetters() {
for (let i = letters.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[letters[i], letters[j]] = [letters[j], letters[i]];
}
}

// display the shuffled letters in the letter grid
function displayLetters() {
let letterElements = document.querySelectorAll(".letter");
for (let i = 0; i < letterElements.length; i++) {
letterElements[i].textContent = letters[i];
}
}

// display 'guess', 'clear' and 'give up' buttons and hide 'new word' button on start
function displayButtons() {
  newWordButton.style.display = "none";
  guessButton.style.display = "inline";
  clearButton.style.display = "inline";
  giveUpButton.style.display = "inline";
}

// get the guess input element
const guessInput = document.getElementById('guess-input');

// get all the letter elements
const letterElements = document.querySelectorAll('.letter');

// add a click event listener to each letter element
letterElements.forEach(element => {
element.addEventListener('click', event => {
// change the color of the clicked letter
event.target.style.color = 'white';
// add the letter to the guess-input
guessInput.value += event.target.innerHTML;
});
});

// check if the player's guess is correct when guess button is clicked
const guessButton = document.querySelector("#guess-button");

guessButton.addEventListener("click", function() {
  let guess = document.querySelector("#guess-input").value.toLowerCase();
  if (guess === targetWord.toLowerCase()) {
    // update score and message
    score++;
    document.querySelector("#score").textContent = score;
    document.querySelector("#message").textContent = "Congratulations! " + targetWord + " is correct!";
    newWordButton.style.display = "block";
    guessButton.style.display = "none";
    clearButton.style.display = "none";
    giveUpButton.style.display = "none";
  } else {
    // update message
    document.querySelector("#message").textContent = "Sorry, that is not the correct word. Please try again.";
  }
});

// handle form submit
let form = document.querySelector("form");
form.addEventListener("submit", function(event) {
event.preventDefault();
let guess = document.querySelector("#guess-input").value;
checkGuess(guess.toLowerCase());
});

// Clear button
const clearButton = document.querySelector("#clear-button");

clearButton.addEventListener("click", function() {
guessInput.value = "";
letterElements.forEach(element => {
element.style.color = "black";
});
document.querySelector("#message").textContent = "";
});

// New Word button
const newWordButton = document.getElementById('new-word-button');

newWordButton.addEventListener('click', function() {
chooseWord();
shuffleLetters();
displayLetters();
displayButtons();
document.querySelector("#guess-input").value = "";
document.querySelector("#message").textContent = "";
letterElements.forEach(element => {
element.style.color = "black";
});
});

// Give Up button
const giveUpButton = document.getElementById('give-up-button');

giveUpButton.addEventListener("click", function() {
  guessInput.value = "";
  newWordButton.style.display = "block";
  guessButton.style.display = "none";
  clearButton.style.display = "none";
  giveUpButton.style.display = "none";
  letterElements.forEach(element => {
  element.style.color = "black";
  });
  score = 0;
  document.querySelector("#score").textContent = score;
  document.querySelector("#message").textContent = "The answer is " + targetWord + ". Better luck next time.";
  });

// initial setup
chooseWord();
shuffleLetters();
displayLetters();
displayButtons();
