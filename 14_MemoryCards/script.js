const btnClear = document.getElementById('clear');
const btnShowNewCard = document.getElementById('show');
const containerCards = document.getElementById('cards-container');
const containerNewCard = document.getElementById('add-container');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const currentCardIndicator = document.getElementById('current');
const btnHideNewCard = document.getElementById('hide');
const textareaQuestion = document.getElementById('question');
const textareaAnswer = document.getElementById('answer');
const btnAddCard = document.getElementById('add-card');

// Keep track of the current card
let currentCardNumber = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = [
    {
        question: 'What must a variable begin with?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'What is a variable?',
        answer: 'Container for a piece of data'
    },
    {
        question: 'Example of Case SensitiveVariable',
        answer: 'thisIsAVariable'
    }
];

// Create all cards
const createCards = () => {
    cardsData.forEach( (data, index) => createCard(data, index));
}

const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if(index === 0) card.classList.add('active');
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', _ => {
        card.classList.toggle('show-answer');
    })
    cardsEl.push(card);
    containerCards.appendChild(card);

    updateCurrentText();

}

function updateCurrentText() {
    currentCardIndicator.innerText = `${ currentCardNumber + 1 } / ${ cardsEl.length }`
}

createCards();

// Event Listeners
btnNext.addEventListener('click', _ => {
    cardsEl[currentCardNumber].className = 'card left';
    currentCardNumber = currentCardNumber === (cardsEl.length - 1) ? currentCardNumber : currentCardNumber + 1;
    cardsEl[currentCardNumber].className = 'card active';
    updateCurrentText();
})

btnPrev.addEventListener('click', _ => {
    cardsEl[currentCardNumber].className = 'card right';
    currentCardNumber = currentCardNumber === 0 ? 0 : currentCardNumber - 1;
    cardsEl[currentCardNumber].className = 'card active';
    updateCurrentText();
})