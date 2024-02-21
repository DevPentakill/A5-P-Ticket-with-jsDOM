const category = "Economy";
const priceTckt = 550;
const seats = document.getElementsByClassName("bus-seat");
// console.log(seats);
//it shows me html collection
for (const seat of seats) {
    seat.addEventListener("click", function (event) {
        // console.log(event.target);
        // it shows me the whole tag of button i pressed
        const seatNum = event.target.textContent;
        // console.log(typeof seatNum);
        //give me the seat number as a string



        event.target.setAttribute("disabled", false);

        if (
            getValueById("seats-added") >= 4) {
            alert("You have reached seat booking Limit");
            return;
        }


        event.target.style.backgroundColor = 'rgb(29, 209, 0)';
        event.target.style.color = "white";

        const tableHolder = document.getElementById("selected-seat-list");
        const newRow = createTableRows(seatNum, category, priceTckt);
        tableHolder.innerHTML += newRow;
        updateSeatsLeft();
        updateSeatsAdded();
        updateTotalCost(priceTckt);
        updateGrandTotal();

        // const phNo = document.getElementById('user-phone').value;
        // const convPHno = phNo.length;
        // if (getValueById("seats-added")>0 && convPHno>0 ){
        if (getValueById("seats-added") == 4) {
            document.getElementById('apply-cupn').removeAttribute('disabled');
        }
        if (getValueById("seats-added") > 0) {
            document.getElementById('next-button').removeAttribute('disabled');
        }
    });
}


function createTableRows(num, cata, cost) {
    const newRow = "<tr> <td>" + num + "</td> <td>" + cata + "</td> <td>" + cost + "</td> </tr>";
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

function updateTotalCost(price) {
    const previousTotal = document.getElementById("total-price").innerText;
    const convertedTotal = parseInt(previousTotal);
    const convertedPrice = parseInt(price);
    document.getElementById("total-price").innerText = convertedTotal + convertedPrice;
}

function updateGrandTotal(control) {
    const previousTotal = document.getElementById("total-price").innerText;
    const convertedTotal = parseInt(previousTotal);
    const couponCode = document.getElementById("coupon-code").value;



    if (control) {
        if (couponCode == "Couple 20") {
            const discount = convertedTotal * 0.2;
            document.getElementById("grand-price").innerText =
                convertedTotal - discount;
            document.getElementById('cupn-div').classList.add('hidden');

        } else if (couponCode == "NEW15") {
            const discount = convertedTotal * 0.15;
            document.getElementById("grand-price").innerText =
                convertedTotal - discount;
            document.getElementById('cupn-div').classList.add('hidden');
        } else {
            alert("Invalid Coupon Code");
            return;
        }
    } else {
        document.getElementById("grand-price").innerText = convertedTotal;
    }
}