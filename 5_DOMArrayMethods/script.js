/* DOM Elements */
const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double');
const btnShowMillionaires = document.getElementById('show-millionaires');
const btnSort = document.getElementById('sort');
const btnCalculateWealth = document.getElementById('calculate-wealth');

let data = [];

getRandomuser();
getRandomuser();
getRandomuser();

/**
 * Fetch random user and add money
 */
async function getRandomuser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

/**
 * Add new object to data array
 * @param {Object} obj 
 */
function addData(obj) {
    data.push(obj);
    updateDOM();
}

/**
 * 
 * @param {Array<Object>} providedData 
 */
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    
    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    })
}


/**
 * Format number as money
 * @param {Number} number 
 */
function formatMoney(number) {
    return '€' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

/**
 * Double everyone's money
 */
function doubleMoney() {
    data = data.map(person => {
        return {...person, money: person.money * 2};
    });
    updateDOM();
}

/**
 * Sort users by richest
 */
function sortPersons() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}


/**
 * Filter only millionaires
 */
function showMillionaires() {
    data = data.filter(person => person.money >= 1000000);
    updateDOM();
}

/**
 * Calculate the total wealth
 */
function calculateWealth() {
    const wealth = data.reduce( (accumulator, person) => accumulator + person.money, 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Event Listeners
btnAddUser.addEventListener('click', getRandomuser);
btnDouble.addEventListener('click', doubleMoney);
btnSort.addEventListener('click', sortPersons);
btnShowMillionaires.addEventListener('click', showMillionaires);
btnCalculateWealth.addEventListener('click', calculateWealth);