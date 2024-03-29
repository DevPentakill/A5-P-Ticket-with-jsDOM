
//Setting some common constants
//these are unchangeable
const category = "Economy";
const priceTckt = 550;
const seats = document.getElementsByClassName("bus-seat");

// First event listener which will trigger after clicking the SEATS
for (const seat of seats) {
    seat.addEventListener("click", function (event) {
        const seatNum = event.target.textContent;
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

        //Checking If I can Enable the Phone number Input section for Passenger
        if (getValueById("seats-added")>0) {
            document.getElementById('user-phone').removeAttribute('disabled');
        }
        //Checking If I can enable the Coupon apply INPUT+Button
        if (getValueById("seats-added") == 4) {

            document.getElementById('coupon-code').removeAttribute('disabled');
            document.getElementById('apply-cupn').removeAttribute('disabled');
        }
    });
}


//2nd eventlistener whcih will trigger only if passenger type in phone number input field
const passengerTel = document.getElementById("user-phone");

passengerTel.addEventListener('keyup', function (elem) {
    // console.log(elem.target.value);
    let acheNaki = elem.target.value.length;

    if (getValueById("seats-added") > 0 && acheNaki > 0) {
        document.getElementById('next-button').removeAttribute('disabled');
    } else {
        alert('Please input Numeric Value');
    }

})




//Magical Functions to help me
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

function updateGrandTotal(elem) {
    const previousTotal = document.getElementById("total-price").innerText;
    const convertedTotal = parseInt(previousTotal);
    const couponCode = document.getElementById("coupon-code").value;
   

    if (elem) {
        if (couponCode == "Couple 20") {
            const discount = convertedTotal * 0.2;
            document.getElementById("grand-price").innerText = convertedTotal - discount;
            document.getElementById('cupn-div').classList.add('hidden');

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            const discountInfo = "Congratulations, Mate! You've just earned a " + discount + " BDT discount <3";
            const discountDiv = document.createElement('p');
            discountDiv.innerText = discountInfo;
            document.getElementById('disco-info').appendChild(discountDiv); 

        } else if (couponCode == "NEW15") {
            const discount = convertedTotal * 0.15;
            document.getElementById("grand-price").innerText = convertedTotal - discount;
            document.getElementById('cupn-div').classList.add('hidden');
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            const discountInfo = "Congratulations, Mate! You've just earned a " + discount + " BDT discount <3";
            const discountDiv = document.createElement('p');
            discountDiv.innerText = discountInfo;
            document.getElementById('disco-info').appendChild(discountDiv);
        } else {
            alert("Invalid Coupon Code Mate!");
            return;
        }
    } else {
        document.getElementById("grand-price").innerText = convertedTotal;
    }
}