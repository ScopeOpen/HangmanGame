const readline = require('readline');
const jsonwords = require('./words.json');

const words = jsonwords.words;
const selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Hangman stages
const stages = [
    `\n   -----\n   |   |\n   |   O\n   |  /|\\\n   |  / \\\n   |\n`,
    `\n   -----\n   |   |\n   |   O\n   |  /|\\\n   |  /\n   |\n`,
    `\n   -----\n   |   |\n   |   O\n   |  /|\\\n   |\n   |\n`,
    `\n   -----\n   |   |\n   |   O\n   |  /|\n   |\n   |\n`,
    `\n   -----\n   |   |\n   |   O\n   |   |\n   |\n   |\n`,
    `\n   -----\n   |   |\n   |   O\n   |\n   |\n   |\n`,
    `\n   -----\n   |   |\n   |   \n   |\n   |\n   |\n`
];

// Function to ask the player for a letter and handle the game logic
const askForLetter = () => {
    // Draw the current state of the hangman
    console.log(stages[incorrectGuesses]);

    // Display the current state of the word
    const display = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    console.log(`Current word: ${display}`);

    // Check for winning condition
    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        console.log("Congratulations! You've guessed the word: " + selectedWord);
        rl.close();
        return;
    }

    // Check for losing condition
    if (incorrectGuesses === maxIncorrectGuesses) {
        console.log("You've been hanged! The word was: " + selectedWord);
        rl.close();
        return;
    }

    // Prompt for a letter
    rl.question('Guess a letter: ', (input) => {
        const letter = input.toLowerCase();

        if (guessedLetters.includes(letter)) {
            console.log("You've already guessed that letter.");
        } else {
            guessedLetters.push(letter);
            if (selectedWord.includes(letter)) {
                console.log("Good guess!");
            } else {
                incorrectGuesses++;
                console.log("Wrong guess!");
            }
        }
        askForLetter(); // Continue game 
    });
};

// Start game
console.log("Welcome to Hangman!");
askForLetter();
