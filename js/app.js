// Cards are shown by default. This function removes the classes and hides them

function hideCards() {
    let cardList = document.getElementsByClassName("card");
    for (let i = 0; i < cardList.length; i++) {
        cardList[i].classList.remove("open");
        cardList[i].classList.remove("show");
    }
    let newDeck = shuffle(deck);
    buildDeck(newDeck);
}

document.getElementById("refresh").addEventListener("click", hideCards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

let deck = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                "fa fa-anchor", "fa fa-anchor", "fa fa-bolt","fa fa-bolt",
                "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
                 "fa fa-bicycle","fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

function shuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function buildDeck(array) {
// get all li from deck ul
    let newImage = document.getElementsByClassName('card');
// iterate through html collection and change classname
    for (let i = 0; i < newImage.length; i++) {
        newImage[i].children[0].className = array[i];
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
