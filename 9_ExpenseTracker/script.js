/* DOM Elements */
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

/**
 * Add transaction
 * @param {Event} e 
 */
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and an amount!')
    } else {
        const transaction = {
            id: transactions.length === 0 ? 1 : transactions[transactions.length - 1].id + 1,
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value ='';
    }
}

// // Generate random ID - Solution from the video
// function generateID() {
//     return Math.floor(Math.random() * 100000000);
// }

/**
 * Add transactions to DOM List
 * @param {Object} transaction 
 */
function addTransactionDOM(transaction) {
    // Add transactions to DOM List
    const sign = transaction.amount > 0 ? '+' : '-';

    const item = document.createElement('li');
    item.setAttribute('data-transactionID', transaction.id);
    //Add class based on value
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        <button class="edit-btn" onclick="editTransaction(event)">e</button>
    `;

    list.appendChild(item);
}

/**
 * Update the balance, income and expense
 */
function updateValues() {
    const amounts = transactions.map( transaction => transaction.amount);
    const total = amounts.reduce( (acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce( (acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce( (acc, item) => (acc += item), 0) * -1).toFixed(2);
    
    
    balance.innerText = `${total >= 0 ? '' : '-'}$${Math.abs(total).toFixed(2)}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;


}

/**
 * Remove transaction by ID
 * @param {String} id 
 */
function removeTransaction(id) {
    transactions = transactions.filter(tx => tx.id !== id);
    updateLocalStorage();
    init();
}

function editTransaction(e) {
    for(let i = 0; i < e.path.length; i++) {
        const el = e.path[i];
        if(el.nodeName === 'LI') {
            const span = el.querySelector('span');
            const input = document.createElement('input');
            el.classList.add('editable');
            
            input.value = +span.innerText;
            span.parentNode.replaceChild(input, span);

            const editBtn = el.querySelector('.edit-btn');
            const saveBtn = document.createElement('button');
            saveBtn.innerText = 's';
            saveBtn.classList.add('save-btn');
            saveBtn.addEventListener('click', saveChanges);
            editBtn.parentNode.replaceChild(saveBtn, editBtn);
            break;
        }
    }
}

function saveChanges(e) {
    for(let i = 0; i < e.path.length; i++) {
        const el = e.path[i];
        if(el.nodeName === 'LI') {
            const transactionID = parseInt(el.getAttribute('data-transactionID'));
            const input = el.querySelector('input');
            const span = document.createElement('span');

            for(let j = 0; j < transactions.length; j++) {
                if(transactionID === transactions[j].id) {
                    transactions[j].amount = +input.value;
                }
            }

            el.classList.remove('editable');

            span.innerText = +input.value;
            input.parentNode.replaceChild(span, input);

            const saveBtn = el.querySelector('.save-btn');
            const editBtn = document.createElement('button');
            editBtn.innerText = 'e';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', editTransaction);
            saveBtn.parentNode.replaceChild(editBtn, saveBtn);
            break;
        }
    }
    updateLocalStorage();
    init();
}

/**
 * Update local storage transactions
 */
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Event Listeners
form.addEventListener('submit', addTransaction);