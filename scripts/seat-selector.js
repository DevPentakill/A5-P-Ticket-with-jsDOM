const seats = document.getElementsByClassName("bus-seat");
// console.log(seats);
//it shows me html collection
for (const seat of seats){
seat.addEventListener("click", function(event){
// console.log(event.target);
// it shows me the whole tag of button i pressed
const seatNum= event.target.textContent;
// console.log(typeof seatNum);
//give me the seat number as a string
const category = "Economy";
const priceTckt = 550;

const tableHolder = document.getElementById("selected-seat-list");

const newRow= createTableRows(seatNum,category,priceTckt);

tableHolder.innerHTML += newRow;
updateSeatsLeft();
updateSeatsAdded();

});




}


function createTableRows (num,cata,cost){
    const newRow = "<tr> <td>"+num+"</td> <td>"+cata+"</td> <td>"+cost+"</td> </tr>";
    return newRow;
}

function getValueById(id) {
    const targetElement = document.getElementById(id).innerText;
    return parseInt(targetElement);
  }

  function updateSeatsLeft() {
    const defaultLeft = document.getElementById("seats-left").innerText;
    const convertDefaultLeft = parseInt(defaultLeft);
    document.getElementById("seats-left").innerText = convertDefaultLeft - 1;
  }

  function updateSeatsAdded() {
    const defaultSeatCount = document.getElementById("seats-added").innerText;
    const convertDefaultSeatCount = parseInt(defaultSeatCount);
    document.getElementById("seats-added").innerText = convertDefaultSeatCount + 1;
  }
  