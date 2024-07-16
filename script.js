document.addEventListener('DOMContentLoaded', () => {
    const words = [
        { word: "MOUNTAIN", hint: "A large natural elevation of the earth's surface" },
        { word: "OCEAN", hint: "A large body of salt water" },
        { word: "COMPUTER", hint: "An electronic device for storing and processing data" },
        { word: "PIZZA", hint: "A popular Italian dish with toppings" },
        { word: "GUITAR", hint: "A musical instrument with strings" },
        { word: "RAINBOW", hint: "An arc of colors visible in the sky" },
        { word: "SPACE", hint: "The vast, seemingly infinite expanse beyond Earth" },
        { word: "DOLPHIN", hint: "A highly intelligent marine mammal" },
        { word: "PYRAMID", hint: "A monumental structure with a square or triangular base and sloping sides" },
        { word: "VOLCANO", hint: "A mountain that can erupt with lava" },
        { word: "BUTTERFLY", hint: "An insect with large, often colorful wings" },
        { word: "JUNGLE", hint: "A dense forest in a tropical area" },
        { word: "CASTLE", hint: "A large building fortified against attack" },
        { word: "BALLOON", hint: "A flexible bag filled with gas" },
        { word: "ASTEROID", hint: "A small rocky body orbiting the sun" },
        { word: "FOREST", hint: "A large area covered chiefly with trees and undergrowth" },
        { word: "HTML", hint: "HyperText Markup Language" },
        { word: "CSS", hint: "Cascading Style Sheets" },
        { word: "JS", hint: "JavaScript" },
        { word: "PHP", hint: "Hypertext Preprocessor" },
        { word: "SQL", hint: "Structured Query Language" }
    ];

    let currentWord = '';      // The phrase to be guessed
    let hint = '';              
    let guessedWord = [];       
    let wrongGuesses = [];      
    let remainingChances = 6;   

    const statusElement = document.getElementById('status');
    const hintElement = document.getElementById('hint');
    const wordDisplayElement = document.getElementById('wordDisplay');
    const wrongGuessesElement = document.getElementById('wrongGuesses');
    const remainingChancesElement = document.getElementById('remainingChances');
    const guessInputElement = document.getElementById('guessInput');
    const resetButton = document.getElementById('resetButton');
    const gameContainer = document.querySelector('.game-container');

    function initGame() {
        // randomly select word from wordsArray
        const randIndx = Math.floor(Math.random() * words.length);
        currentWord = words[randIndx].word;
        hint = words[randIndx].hint;

        // initial states
        guessedWord = Array(currentWord.length).fill('_');
        wrongGuesses = [];
        remainingChances = 6;

        statusElement.textContent = '';
        hintElement.textContent = hint;
        updateWordDisplay();
        wrongGuessesElement.textContent = 'Wrong Guess Letters: ';
        remainingChancesElement.textContent = `Remaining chances: ${remainingChances}`;
        gameContainer.classList.remove('win', 'lose'); // Reset animations
    }

    function updateWordDisplay() {
        wordDisplayElement.innerHTML = '';// Clear previous display
        guessedWord.forEach(letter => {
            const letterElement = document.createElement('span');
            
            if (letter !== '_') {
                letterElement.textContent = letter; // guessed
            } 
            else {
                letterElement.textContent = '';
            }
    
            letterElement.classList.add('letter'); //reasure styling
            wordDisplayElement.appendChild(letterElement);
        });
    }

    function processGuess() {
        const guess = guessInputElement.value.toUpperCase();// Unify input
        guessInputElement.value = '';

        if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
            statusElement.textContent = 'Please enter a valid letter!';
            return;
        }

        if (currentWord.includes(guess)) {
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === guess) {
                    guessedWord[i] = guess;
                }
            }
            statusElement.textContent = 'Correct Guess!';
        } else {
            if (!wrongGuesses.includes(guess)) {
                wrongGuesses.push(guess);
                remainingChances--;
            }
            statusElement.textContent = 'Wrong Guess!';
        }

        updateWordDisplay();
        wrongGuessesElement.textContent = `Wrong Guess Letters: ${wrongGuesses.join(', ')}`;
        remainingChancesElement.textContent = `Remaining chances: ${remainingChances}`;

        checkGameStatus();
    }

    function checkGameStatus() {
        if (!guessedWord.includes('_')) {
            statusElement.textContent = 'You Won!';
            guessInputElement.disabled = true;
            gameContainer.classList.add('win'); 
        } else if (remainingChances === 0) {
            statusElement.textContent = `Game over! The word was ${currentWord}`;
            guessInputElement.disabled = true;
            gameContainer.classList.add('lose');
        }
    }

    guessInputElement.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            processGuess();
        }
    });

    resetButton.addEventListener('click', () => {
        initGame();
        guessInputElement.disabled = false;
    });

    initGame();
});
