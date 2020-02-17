"use strict";
// First select the elements from the DOM
const container = document.querySelector(".container");
// Sets the seats to a node list similiar to an array -> run methods on it like an array
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

// You called also use parseInt(movieSelect.value)
// Make sure to not use const or you will get an error since you are wanting
// to change the count based on movie selected and const won't allow you to do so
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected ");
  // Copy selected seats into an array - map through the array - return new array of indexes
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // Store to local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  console.log(seatsIndex);

  // Get the length of the nodelist *****************************************************
  const selectedSeatsCount = selectedSeats.length;

  // console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate the UI
function populateUI() {
  // pull out the selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  // We want to see if there any selected seats in local storage, then we want to loop through
  // to display the results to the UI with the added selected class
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  console.log(selectedSeats);
}

// Add our event listeners **************************************************************
// Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// When we click on a seat we want it to change to selected (Seat Click)
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
