const container = document.querySelector('.container');

const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// if you do typeof for ticketPrice, it will give "String", so convert it to number
// 1) parseInt() or add + infront
// const ticketPrice = +movieSelect.value;

function movieSelectAndIndex(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// calculate price and no. of seats
function updatePriceAndSeats() {
  const ticketPrice = +movieSelect.value;
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // to store the index of the selected seats to local storage

  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });

// console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedNos = selectedSeats.length;
  // console.log(selectedNos);
  count.innerText = selectedNos;
  total.innerText = selectedNos * ticketPrice;
}

// event listener for movie selection from dropdown
movieSelect.addEventListener('change', e => {
  // console.log(e.target.selectedIndex);

  movieSelectAndIndex(e.target.selectedIndex, e.target.value);
  
  updatePriceAndSeats();
})

// event listener for seat selection
container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
   e.target.classList.toggle('selected');

   updatePriceAndSeats();    
  }
});

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // console.log(selectedSeats);

  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  
}

updatePriceAndSeats();
