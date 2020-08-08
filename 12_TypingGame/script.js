// DOM Elements
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const selectDifficulty = document.getElementById('difficulty');
const word = document.getElementById('word');
const inputText = document.getElementById('text');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const endGameContainer = document.getElementById('end-game-container');
const btnSettings = document.getElementById('settings-btn');

//List of Words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

const gameSettings = {
    easy : {
        scoreUp : 1,
        timeUp: 5
    },
    medium : {
        scoreUp : 2,
        timeUp: 3
    },
    hard : {
        scoreUp : 3,
        timeUp: 2
    }
}

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Focus on text on start
text.focus();

// Set difficulty to value in LS or medium
let difficulty = localStorage.getItem('gameDifficulty');
difficulty = difficulty !== null ? difficulty : 'medium';
selectDifficulty.value = difficulty;

// Start counting down
const timeInterval = setInterval(_ => {
    time--;
    updateTime();
}, 1000);

/**
 * Select a random word from the words array
 */
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

/**
 * Add a word to the DOM
 */
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

/**
 * Update the score
 */
function updateScore() {
    score += gameSettings[difficulty].scoreUp;
    scoreEl.innerText = score;
}

/**
 * Update the time
 */
function updateTime() {
    timeEl.innerText = `${time}s`;
    if(time <= 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

/**
 * Game over, show end screen
 */
function gameOver() {
    endGameContainer.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play Again!</button>
    `;
    endGameContainer.style.display = 'flex';
}


addWordToDOM();

// Event Listeners
btnSettings.addEventListener('click', _ => {
    settings.classList.toggle('hide');
});

inputText.addEventListener('input', event => {
    if(event.target.value === randomWord) {
        // Clear input
        event.target.value = '';
        time += gameSettings[difficulty].timeUp;
        updateTime();
        addWordToDOM();
        updateScore();
    };
});

selectDifficulty.addEventListener('change', event => {
    difficulty = event.target.value;
    localStorage.setItem('gameDifficulty', event.target.value);
});

// window.addEventListener('contextmenu', event => {
//     console.log('now');
//     event.preventDefault();
// })