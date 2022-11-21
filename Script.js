const container = document.querySelector ('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');




let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
 localStorage.setitem('selectedMovieIndex', movieIndex);
 localStorage.setItem('selectedMoviePrice', moviePrice);
}
//Update the total amount spent and the total count

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat .selected');

const seatsIndex = [...selectedSeats]
.map(seat => [...seats].indexOf(seat)
);

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//This function will obtain data from the local storage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));


if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
        }
    });
}
const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
}
}

//Movie select event
movieSelect.addEventListener('change', e => {
ticketPrice = +e.target.value;
SetMovieData(e.target.selectedIndex, e.target.value);
updateSelectedCount();

});

container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
     )  {
        
        e.target.classList.toggle('selected');


        updateSelectedCount();
        }

});
