//prompt user for max number
let numMax = Math.round(parseFloat(prompt("Enter maximum number:")));

//generate random number one to max
let numCorrect = Math.floor(Math.random() * numMax) + 1;

console.log("numCorrect equals", numCorrect);

const guesses = [];
const submitGuessBtn = document.getElementById("submitGuess");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");

//function to check guess
function guessNumber() {
    let guess = parseInt(guessInput.value);

    const highMessages = [
      "Too HiGH!",
      "Guess lower...",
      "Needs to be lower",
      "Your guess is high!"
    ];

    const lowMessages = [
      "Too LOW!",
      "Guess higher...",
      "Higher, please!",
      "Low low low low low...!"
    ];

    if (isNaN(guess)) {
      message.innerHTML = "That is not a number!";
    } else if (guess <= 0 || guess > numMax) {
      message.innerHTML = "That number is not in range, try again.";
    } else if (guesses.includes(guess)) {
      message.innerHTML = "You already guessed that number!";
    } else {
      guesses.push(guess);
      if (guess === numCorrect) {
        let numGuesses = guesses.length;
        let guessList = guesses.join(", ");
        message.innerHTML = `You got it! It took you ${numGuesses} tries and your guesses were ${guessList}.`;
      }  else if (guess > numCorrect) {
        let randomIndex = Math.floor(Math.random() * highMessages.length);
        message.innerHTML = highMessages[randomIndex];
      } else if (guess < numCorrect) {
        let randomIndex = Math.floor(Math.random() * lowMessages.length);
        message.innerHTML = lowMessages[randomIndex];
      }
    }

  };

