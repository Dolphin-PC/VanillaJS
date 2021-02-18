const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;
populateUI();

//* Movie select Event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    saveMovie(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//* Seat select Event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function saveMovie(movieIndex, moviePrice) {
    localStorage.setItem('seletedMovieIndex', movieIndex);
    localStorage.setItem('seletedMoviePrice', moviePrice);
}

// * Get Data from LocalStorage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const seletedMovieIndex = localStorage.getItem('seletedMovieIndex');
    if (seletedMovieIndex !== null) {
        movieSelect.selectedIndex = seletedMovieIndex;
    }
    updateSelectedCount();
}

// *Initial Count and total set
