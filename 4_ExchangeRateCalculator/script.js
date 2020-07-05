/* DOM Elements */
const currencyFrom = document.getElementById('currency-one');
const currencyTo = document.getElementById('currency-two');

const amountFrom = document.getElementById('amount-one');
const amountTo = document.getElementById('amount-two');

const btnSwap = document.getElementById('swap');
const rateText = document.getElementById('rate');

function calculate() {
    fetch('https://api.exchangerate-api.com/v4/latest/' + currencyFrom.value)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currencyTo.value];
            const exchangedValue = (parseFloat(amountFrom.value) * rate).toFixed(4);
            amountTo.value = exchangedValue;
            rateText.innerText = `1 ${currencyFrom.value} = ${rate} ${currencyTo.value}.`;
        })
        .catch(e => {
            console.log(e);
        })
}


btnSwap.addEventListener('click', _ => {
    const temp = currencyFrom.value;
    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;
    calculate();
});

amountFrom.addEventListener('input', calculate);
amountTo.addEventListener('input', calculate);
currencyFrom.addEventListener('change', calculate);
currencyTo.addEventListener('change', calculate);

calculate();