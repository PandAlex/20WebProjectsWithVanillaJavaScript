/* DOM Elements */
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

/**
 * Save selected movie index and price
 */
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

/**
 * Update total and count
 */
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

/**
 * Get data from localStorage and populate UI
 */
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        selectedSeats.forEach(index => {
            seats[index].classList.add('selected');
        });
    }

    const lsIndex = localStorage.getItem('selectedMovieIndex');
    const lsPrice = localStorage.getItem('selectedMoviePrice');

    movieSelect.selectedIndex = lsIndex ? lsIndex : 0;
    ticketPrice = lsPrice ? lsPrice : movieSelect.value;
    updateSelectedCount();
}

/**
 * Movie select event
 */
movieSelect.addEventListener('change', event => {
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount();
})


/**
 * Seat click event
 */
container.addEventListener('click', event => {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
})