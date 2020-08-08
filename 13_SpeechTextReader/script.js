const main = document.querySelector('main');
const selectVoices = document.getElementById('voices');
const textarea = document.getElementById('text');
const btnRead = document.getElementById('read');
const btnToggle = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const btnClose = document.getElementById('close');

const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
];

data.forEach(createBox);


/**
 * Create speech boxes
 * @param {Object} item 
 */
function createBox(item) {
    const { image, text } = item;

    const box = document.createElement('div');
    box.classList.add('box');

    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;
    box.addEventListener('click', _ => {
        setMessage(text);
        talkToMe(text);
        box.classList.add('active');
        setTimeout(_ => box.classList.remove('active'), 800); // TODO: on utterance end instead of timeout
    });
    main.appendChild(box);   
}

// Init speech synth
const utterance = new SpeechSynthesisUtterance();

/**
 * Sets the text for the utterance
 * @param {string} text 
 */
function setMessage(text) {
    utterance.text = text;
}

function setVoice(e) {
    utterance.voice = voices.find(voice => e.target.value === voice.name);
}

/**
 * Function that allows the computer to talk :-)
 */
function talkToMe() {
    window.speechSynthesis.speak(utterance);
}


// Store voices
let voices = [];

function populateVoices() {
    return new Promise( (resolve, reject) => {
        try {
            const interval = window.setInterval( _ => {
                const voices = speechSynthesis.getVoices();
                if(voices.length > 0) {
                    window.clearInterval(interval);
                    resolve(voices);
                }
            }, 10)
        } catch (e) {
            reject(e);
        }
    })
}


async function getVoices() {
    voices = await populateVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        selectVoices.appendChild(option);
    })
}

getVoices();

// Event Listeners

// Toggle Text Box
btnToggle.addEventListener('click', _ => {
    textBox.classList.toggle('show');
})

// Close Text Box
btnClose.addEventListener('click', _ => {
    textBox.classList.remove('show');
})

btnRead.addEventListener('click', _ => {
    setMessage(textarea.value)
    talkToMe();
})

selectVoices.addEventListener('change', setVoice);