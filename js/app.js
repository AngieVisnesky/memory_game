// variable for master deck array
let initialDeck = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"];

// variable for choosing two cards to evaluate a match
let clickArray = [];

// variable for a shuffled deck array for a new game
let shuffledDeck = [];

// variable for counting number of moves
let moves = 0;


// creates initial deck dynamically on the screen
function createDeck (array) {
    let deckLayout = document.getElementById('deckLayout');

    for (let i = 0; i < array.length; i++ ) {
        let cardBox = document.createElement('li');
        cardBox.className = 'card open show';
        deckLayout.appendChild(cardBox);
        let cardImage = document.createElement('i');
        cardImage.className = array[i];
        cardBox.appendChild(cardImage);
    }
}

createDeck(initialDeck);

// function that: hides cards, builds deck, adds event listeners to cards
function newGame() {
    hideAllCards();
    shuffledDeck = shuffle(initialDeck);
    buildDeck(shuffledDeck);
    //reset counter
    incrementMoves('reset');

    // set up the event listener for a card. If a card is clicked:
    document.getElementById("deckLayout").addEventListener("click", evaluateMatch);
}

// Set event listener for new game
document.getElementById("refresh").addEventListener("click", newGame);


//removes open and show classes to hide the cards when starting a new game
function hideAllCards() {
    let cardList = document.getElementsByClassName("card");
    for (let i = 0; i < cardList.length; i++) {
        cardList[i].classList.remove("open", "show", "match");
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
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
    return array;
}


// show the cards selected
function showCard(event) {
    let target = event.target; // where was the click?

    if ((target.className = 'card')) target.className = ('card open show');
    return target;
}

function incrementMoves(word) {
    if (word === 'move') {
        moves++;
    }else if(word === 'reset') {
        moves = 0;
    }
    document.getElementsByClassName('moves')[0].innerHTML = moves;
}

// pushes the turned cards to an array
function isThereTwo(target) {
    let click = target.firstElementChild.className;

    clickArray.push(click);
}

//evaluates for the match
function doCardsMatch () {
    if ((clickArray[0]) !== (clickArray[1])) {
        alert("Bummer. Not a match.");
        hideNotMatched();
    } else {
        alert("You have a match!");
        lockMatched();
        gameOver();
    }
    // empty clickArray
    clickArray = [];
}

//locks a matched pair
function lockMatched() {
    // select elements with the 'open' class name - set to variable
    let openCards = document.getElementsByClassName('open');

    // iterate over elements and change className to 'card match' to hide cards
    for (let i = 0; i < 2; i++){
        openCards[0].className = 'card match';
    }
}


//hides the two cards
function hideNotMatched() {
    // select elements with the 'open' class name - set to variable
   let openCards = document.getElementsByClassName('open');

    // iterate over elements and change className to 'card' to hide cards
    for (let i = 0; i < 2; i++){
        openCards[0].className = 'card';
    }
}


//evaluates number of cards
function evaluateMatch(event) {
    //if block to make sure that code only runs if card is not shown or matched
    if ( event.target.className === 'card' ) {
        let target = showCard(event);
        // add moves to counter
        incrementMoves('move');
        starRating();
        isThereTwo(target);
        if (clickArray.length === 2) {
            doCardsMatch();
        }
    }
}

function gameOver() {
    let matchedCards = document.getElementsByClassName('match');
    if (matchedCards.length === 16) {
        alert ("Game Over");
    }
}

function starRating() {

    if (moves === 27 || moves === 33 || moves === 39 || moves === 45) {
        let rating = document.getElementById('list');
        rating.removeChild(rating.firstElementChild);
    }
}
