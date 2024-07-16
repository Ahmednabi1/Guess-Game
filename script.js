document.addEventListener('DOMContentLoaded', () => {
    const words = [
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
    let remainingChances = 4; 

    const statusElement = document.getElementById('status');
    const hintElement = document.getElementById('hint');
    const wordDisplayElement = document.getElementById('wordDisplay');
    const wrongGuessesElement = document.getElementById('wrongGuesses');
    const remainingChancesElement = document.getElementById('remainingChances');
    const guessInputElement = document.getElementById('guessInput');
    const resetButton = document.getElementById('resetButton');

    function initGame() {
        // randomly select word from wordsArray
        const randIndx = Math.floor(Math.random() * words.length);
        currentWord = words[randIndx].word;
        hint = words[randIndx].hint;

        // initial states
        guessedWord = Array(currentWord.length).fill('_');
        wrongGuesses = [];
        remainingChances = 4;

        statusElement.textContent = '';
        hintElement.textContent = hint;
        updateWordDisplay();
        wrongGuessesElement.textContent = 'Wrong Guess Letters: ';
        remainingChancesElement.textContent = `Remaining chances: ${remainingChances}`;
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
    

    // Handle a guess input
    function processGuess() {
        const guess = guessInputElement.value.toUpperCase(); // Unify input
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
        } 
        else {
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
        } 
        else if (remainingChances === 0) {
            statusElement.textContent = `Game over! The word was ${currentWord}`;
            guessInputElement.disabled = true;
        }
    }


    // additional
    guessInputElement.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            processGuess();
        }
    });

    resetButton.addEventListener('click', () => {
        initGame();
        guessInputElement.disabled = false;
        // submitGuessButton.disabled = false;
    });

    initGame();
});
