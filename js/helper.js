//    var $dealerImg = $("<img>");
//    $dealerImg.attr("src", cards[93].image);
//    $dealerImg.attr("style", "max-height: 200px;");
//    $('#dealer-area').append($dealerImg);
//
//    var $playerImg = $("<img>");
//    $playerImg.attr("src", cards[25].image);
//    $playerImg.attr("style", "max-height: 200px;");
//    $('#player-area').append($playerImg);

//placebets
//initaldealcards
//roundfinished

$(document).ready(function () {
    startModal();
});

var bankroll = 1000,
    totalBet = 0,
    winnings = 0,
    dealRoundCounter = 0,
    dealTimeDelay = 10000,
    $currentBet = $("#current-bet p"),
    $bankrollDisplay = $("#bankroll-display p"),
    $commonDisplay = $("#common-area h3"),
    discardPile = [],
    player = [],
    dealer = [];

function setStatus(currentStatus) {
    console.log(currentStatus);
    switch (currentStatus) {
        case "roundInit":
            stackShuffle(cards.length);
            $("#dealer-actions li button").addClass("disabled");
            placeBets();
            break;
        case "roundStart":
            $("#dealer-actions #deal").removeClass("disabled");
            $("#dealer-actions #deal").on("click", function () {
                dealRoundCounter = 1;
                $("#dealer-actions li button").addClass("disabled");
                //stackAddCard(stackDeal());
                $("#dealer-actions #deal").off("click");
                $(".bet").off("click");
                setStatus("dealCards");
            });
            break;
        case "dealCards":
            dealRound()
            break;
    }
}


function dealRound() {

    // Deal a card to the player or the dealer based on the counter.
    while (dealRoundCounter < 5) {
        switch (dealRoundCounter) {
            case 1:
                stackAddCard(stackDeal(), player);
                var pCard1 = $('<img id="p-card-1" class="card">');
                pCard1.attr('src', player[0].image);
                pCard1.appendTo('#player-area');
                break;
            case 2:
                stackAddCard(stackDeal(), dealer);
                var dCard1 = $('<img id="d-card-1" class="card">');
                dCard1.attr('src', dealer[0].image);
                dCard1.appendTo('#dealer-area');
                break;
            case 3:
                stackAddCard(stackDeal(), player);
                var pCard2 = $('<img id="p-card-2" class="card">');
                pCard2.attr('src', player[1].image);
                pCard2.appendTo('#player-area');
                break;

            case 4:
                stackAddCard(stackDeal(), dealer);
                var dCard2 = $('<img id="d-card-2" class="card">');
                dCard2.attr('src', dealer[1].image);
                dCard2.appendTo('#dealer-area');
                break;

                //        default:

                // No more cards to deal, play the round.

                //            playRound();
                //            return;
                //            break;
        }

        // Update the player's score.

        //        if (player[0].getScore() == 21) {
        ////            player[0].blackjack = true;
        //            player[0].scoreTextNode.nodeValue = "Blackjack";
        //        } else
        //            player[0].scoreTextNode.nodeValue = player[0].getScore();

        // Set a timer for the next call.

        dealRoundCounter++;
        setTimeout(dealRound, dealTimeDelay);


    }
}



//function dealRound() {
//    // Deal a card to the player or the dealer based on the counter.
//    switch (dealRoundCounter) {
//        case 1:
//            player[0].stackAddCard(getNextCard(), false);
//            break;
//        case 2:
//            dealer.stackAddCard(getNextCard(), true);
//            break;
//        case 3:
//            player[0].stackAddCard(getNextCard(), false);
//            break;
//        case 4:
//            dealer.stackAddCard(getNextCard(), false);
//            break;
//            //default:
//            // No more cards to deal, play the round.
//            //playRound();
//            //return;
//            //break;
//    }
//
//    // Update the player's score.
//    //    if (player[0].getScore() == 21) {
//    //        player[0].blackjack = true;
//    //        player[0].scoreTextNode.nodeValue = "Blackjack";
//    //    }
//    //    else
//    //        player[0].scoreTextNode.nodeValue = player[0].getScore();
//    //
//    //    // Set a timer for the next call.
//    //
//    dealRoundCounter++;
//    setTimeout(dealRound, dealTimeDelay);
//}

function startModal() {
    $('#start-modal').foundation('reveal', 'open');
    $("#start-modal .button").on('click', function () {
        var numberOfDecks = $("#number-of-decks").val();
        $('#start-modal').foundation('reveal', 'close');
        $bankrollDisplay.html("$" + bankroll);
        stackMakeDeck(numberOfDecks);
        setStatus("roundInit");
        return cards
    });
}

function placeBets() {
    var counter = 0;
    $commonDisplay.html("Place your bets<br/>and click deal!");
    $(".bet").on("click", function () {
        var amount = $(this).val();
        if (bankroll >= amount) {
            totalBet += amount;
            bankroll -= amount;
            $currentBet.html("$" + totalBet);
            $bankrollDisplay.html("$" + bankroll);
            //return totalBet;
            if (counter === 0) {
                setStatus("roundStart");
                counter += 1;
            } else {
                counter += 1;
            }
        } else {
            alert("You do not have enough money!");
        }
    });
}

//-----------------------------------------------------------------------------
// Card constructor function.
//-----------------------------------------------------------------------------

function Card(rank, suit, image) {

    this.rank = rank;
    this.suit = suit;
    this.image = image;

    this.toString = cardToString;
    //this.createNode = cardCreateNode;
}

//-----------------------------------------------------------------------------
// cardToString(): Returns the name of a card (including rank and suit) as a
// text string.
//-----------------------------------------------------------------------------

function cardToString() {

    var rank, suit;

    switch (this.rank) {
        case "A":
            rank = "Ace";
            break;
        case "2":
            rank = "Two";
            break;
        case "3":
            rank = "Three";
            break;
        case "4":
            rank = "Four";
            break;
        case "5":
            rank = "Five";
            break;
        case "6":
            rank = "Six";
            break;
        case "7":
            rank = "Seven";
            break;
        case "8":
            rank = "Eight";
            break;
        case "9":
            rank = "Nine";
            break;
        case "10":
            rank = "Ten";
            break;
        case "J":
            rank = "Jack"
            break;
        case "Q":
            rank = "Queen"
            break;
        case "K":
            rank = "King"
            break;
        default:
            rank = null;
            break;
    }

    switch (this.suit) {
        case "C":
            suit = "Clubs";
            break;
        case "D":
            suit = "Diamonds"
            break;
        case "H":
            suit = "Hearts"
            break;
        case "S":
            suit = "Spades"
            break;
        default:
            suit = null;
            break;
    }

    if (rank == null || suit == null)
        return "";

    return rank + " of " + suit;
}

//-----------------------------------------------------------------------------
// cardCreateNode(): Returns a DIV node which can be used to display the card 
// on a page.
//-----------------------------------------------------------------------------

//var cardImg0 = new Image();
//cardImg0.src = "img/cards/c01.png";
//var cardImg1 = new Image();
//cardImg1.src = "img/cards/c01.png";
//var cardImg2 = new Image();
//cardImg2.src = "img/cards/c01.png";
//var cardImg3 = new Image();
//cardImg3.src = "img/cards/c01.png";

//function cardCreateNode() {
//
//    var cardNode, frontNode, indexNode, spotNode, tempNode, textNode;
//    var indexStr, spotChar;
//
//    // This is the main node, a DIV tag.
//
//    cardNode = document.createElement("DIV");
//    cardNode.className = "card";
//
//    // Build the front of card.
//
//    frontNode = document.createElement("DIV");
//    frontNode.className = "front";
//
//    // Get proper character for card suit and change font color if necessary.
//
//    spotChar = "\u00a0";
//    switch (this.suit) {
//        case "C":
//            spotChar = "\u2663";
//            break;
//        case "D":
//            frontNode.className += " red";
//            spotChar = "\u2666";
//            break;
//        case "H":
//            frontNode.className += " red";
//            spotChar = "\u2665";
//            break;
//        case "S":
//            spotChar = "\u2660";
//            break;
//    }
//
//    // Create and add the index (rank) to the upper-left corner of the card.
//
//    indexStr = this.rank;
//    if (this.toString() == "")
//        indexStr = "\u00a0";
//    spotNode = document.createElement("DIV");
//    spotNode.className = "index";
//    textNode = document.createTextNode(indexStr);
//    spotNode.appendChild(textNode);
//    spotNode.appendChild(document.createElement("BR"));
//    textNode = document.createTextNode(spotChar);
//    spotNode.appendChild(textNode);
//    frontNode.appendChild(spotNode);
//
//    // Create and add spots based on card rank (Ace thru 10).
//
//    spotNode = document.createElement("DIV");
//    textNode = document.createTextNode(spotChar);
//    spotNode.appendChild(textNode);
//    if (this.rank == "A") {
//        spotNode.className = "ace";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "3" || this.rank == "5" || this.rank == "9") {
//        spotNode.className = "spotB3";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "2" || this.rank == "3") {
//        spotNode.className = "spotB1";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "2" || this.rank == "3") {
//        spotNode.className = "spotB5";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "4" || this.rank == "5" || this.rank == "6" ||
//        this.rank == "7" || this.rank == "8" || this.rank == "9" ||
//        this.rank == "10") {
//        spotNode.className = "spotA1";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotA5";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotC1";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotC5";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "6" || this.rank == "7" || this.rank == "8") {
//        spotNode.className = "spotA3";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotC3";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "7" || this.rank == "8" || this.rank == "10") {
//        spotNode.className = "spotB2";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "8" || this.rank == "10") {
//        spotNode.className = "spotB4";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//    if (this.rank == "9" || this.rank == "10") {
//        spotNode.className = "spotA2";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotA4";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotC2";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotC4";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//
//    // For face cards (Jack, Queen or King), create and add the proper image.
//
//    tempNode = document.createElement("IMG");
//    tempNode.className = "face";
//    if (this.rank == "J")
//        tempNode.src = "graphics/jack.gif";
//    if (this.rank == "Q")
//        tempNode.src = "graphics/queen.gif";
//    if (this.rank == "K")
//        tempNode.src = "graphics/king.gif";
//
//    // For face cards, add suit characters to the upper-left and lower-right
//    // corners.
//
//    if (this.rank == "J" || this.rank == "Q" || this.rank == "K") {
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotA1";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//        spotNode.className = "spotC5";
//        tempNode = spotNode.cloneNode(true);
//        frontNode.appendChild(tempNode);
//    }
//
//    // Add front node to the card node.
//
//    cardNode.appendChild(frontNode);
//
//    // Return the card node.
//
//    return cardNode;
//}

//=============================================================================
// Stack Object
//=============================================================================

//-----------------------------------------------------------------------------
// Stack constructor function.
//-----------------------------------------------------------------------------

function Stack() {

    // Create an empty array of cards.

    this.cards = new Array();

    this.makeDeck = stackMakeDeck;
    this.shuffle = stackShuffle;
    this.deal = stackDeal;
    this.draw = stackDraw;
    this.addCard = stackAddCard;
    this.combine = stackCombine;
    this.cardCount = stackCardCount;
}

//-----------------------------------------------------------------------------
// stackMakeDeck(n): Initializes a stack using 'n' packs of cards.
//-----------------------------------------------------------------------------

function stackMakeDeck(n) {

    var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
    var suits = new Array("C", "D", "H", "S");
    var imgUrls = ["img/cards/c01.png", "img/cards/c02.png", "img/cards/c03.png", "img/cards/c04.png", "img/cards/c05.png", "img/cards/c06.png", "img/cards/c07.png", "img/cards/c08.png", "img/cards/c09.png", "img/cards/c10.png", "img/cards/c11.png", "img/cards/c12.png", "img/cards/c13.png", "img/cards/d01.png", "img/cards/d02.png", "img/cards/d03.png", "img/cards/d04.png", "img/cards/d05.png", "img/cards/d06.png", "img/cards/d07.png", "img/cards/d08.png", "img/cards/d09.png", "img/cards/d10.png", "img/cards/d11.png", "img/cards/d12.png", "img/cards/d13.png", "img/cards/h01.png", "img/cards/h02.png", "img/cards/h03.png", "img/cards/h04.png", "img/cards/h05.png", "img/cards/h06.png", "img/cards/h07.png", "img/cards/h08.png", "img/cards/h09.png", "img/cards/h10.png", "img/cards/h11.png", "img/cards/h12.png", "img/cards/h13.png", "img/cards/s01.png", "img/cards/s02.png", "img/cards/s03.png", "img/cards/s04.png", "img/cards/s05.png", "img/cards/s06.png", "img/cards/s07.png", "img/cards/s08.png", "img/cards/s09.png", "img/cards/s10.png", "img/cards/s11.png", "img/cards/s12.png", "img/cards/s13.png"];
    var i, j, k;
    var m;
    m = ranks.length * suits.length;

    // Set array of cards.

    this.cards = new Array(n * m);

    // Fill the array with 'n' packs of cards.

    for (i = 0; i < n; i++)
        for (j = 0; j < suits.length; j++)
            for (k = 0; k < ranks.length; k++)

    this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j], imgUrls[j * ranks.length + k]);
}

//-----------------------------------------------------------------------------
// stackShuffle(n): Shuffles a stack of cards 'n' times. 
//-----------------------------------------------------------------------------

function stackShuffle(n) {

    var i, j, k;
    var temp;

    // Shuffle the stack 'n' times.

    for (i = 0; i < n; i++)
        for (j = 0; j < this.cards.length; j++) {
            k = Math.floor(Math.random() * this.cards.length);
            temp = this.cards[j];
            this.cards[j] = this.cards[k];
            this.cards[k] = temp;
        }
}

//-----------------------------------------------------------------------------
// stackDeal(): Removes the first card in the stack and returns it.
//-----------------------------------------------------------------------------

function stackDeal() {

    if (this.cards.length > 0)
        return this.cards.shift();
    else
        return null;
}

//-----------------------------------------------------------------------------
// stackDraw(n): Removes the indicated card from the stack and returns it.
//-----------------------------------------------------------------------------

function stackDraw(n) {

    var card;

    if (n >= 0 && n < this.cards.length) {
        card = this.cards[n];
        this.cards.splice(n, 1);
    } else
        card = null;

    return card;
}

//-----------------------------------------------------------------------------
// stackAdd(card): Adds the given card to the stack.
//-----------------------------------------------------------------------------

function stackAddCard(card, array) {
    array.push(card);
    //this.cards.push(card);
    //added second argument array
}

//-----------------------------------------------------------------------------
// stackCombine(stack): Adds the cards in the given stack to the current one.
// The given stack is emptied.
//-----------------------------------------------------------------------------

function stackCombine(stack) {

    this.cards = this.cards.concat(stack.cards);
    stack.cards = new Array();
}

//-----------------------------------------------------------------------------
// stackCardCount(): Returns the number of cards currently in the stack.
//-----------------------------------------------------------------------------

function stackCardCount() {

    return this.cards.length;
}
