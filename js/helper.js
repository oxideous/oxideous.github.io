$(document).ready(function () {
    startModal();
});

var bankroll = 1000,
    totalBet = 0,
    winnings = 0,
    dealRoundCounter = 0,
    dealTimeDelay = 50000,
    $currentBet = $("#current-bet p"),
    $bankrollDisplay = $("#bankroll-display p"),
    $commonDisplay = $("#common-area h3"),
    faceDownUrl = "img/cards/fd03.png",
    discardPile = [],
    player = [],
    playerTotal = 0,
    dealer = [],
    dealerTotal = 0;


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
            $("#dealer-actions #deal").addClass("active");

            $("#dealer-actions #deal").on("click", function () {
                $("#dealer-actions li button").addClass("disabled");
                $("#dealer-actions #deal").removeClass("active");
                $("#dealer-actions #deal").off("click");
                $(".bet").off("click");
                setStatus("dealCards");
            });
            break;

        case "dealCards":

            //Clears Player & Dealer Array
            if (player.length > 0 && dealer.length > 0) {
                player = [];
                dealer = [];
            }

            //Initiates dealRound Switch
            dealRoundCounter = 1;
            dealRound();

            //Displays Current Score
            if (playerTotal === 21) {
                $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br />You have blackjack!");
            } else if (playerTotal < 16) {
                $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br />You should hit!");
                $("#dealer-actions #hit").addClass("active");
                $("#dealer-actions #stay").addClass("active");
            } else if (playerTotal > 17) {
                $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br />You should stay!");
                $("#dealer-actions #hit").addClass("active");
                $("#dealer-actions #stay").addClass("active");
            }

            //Makes Hit & Stay Buttons Active
            $("#dealer-actions #hit").removeClass("disabled");
            $("#dealer-actions #stay").removeClass("disabled");

            //Sets variable with current length of Player/Dealer Array
            var pCardCount = player.length - 1;
            var dCardCount = dealer.length - 1;

            //Adds Click Event To #hit
            $("#dealer-actions #hit").on("click", function () {
                pCardCount++;
                stackAddCard(stackDeal(), player);
                console.log("Player Card " + pCardCount + ": " + player[pCardCount].toString());
                var pCardHit = $('<div id="p-card-' + pCardCount + '" class="card">');
                pCardHit.css('background-image', 'url(' + '"' + player[pCardCount].image + '"' + ')');
                pCardHit.appendTo('#player-area');
                playerTotal += player[pCardCount].value;
                $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal);

                //Check if playerTotal is over 21.  If it is search for aces by their value.
                if (playerTotal > 21) {
                    $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br/> YOU BUSTED!");
                    console.log("You're over 21!  Searching for Aces!");
                    for (var i = 0; i < player.length; i++) {
                        if (player[i].value === 11) {
                            console.log("Converting Aces!");
                            player[i].value = 1;
                            playerTotal -= 10;
                            $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br/> CONVERTED ACES!");
                        } 
                    }
                }

                //                if (playerTotal > 21 && dealerTotal > 21) {
                //                    $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br/> ROUND IS A TIE.");
                //                } else if (playerTotal > 21) {
                //                    $("#dealer-actions #hit").addClass("disabled");
                //                    $("#dealer-actions #stay").addClass("disabled");
                //                    $("#dealer-actions #hit").off("click");
                //                    $("#dealer-actions #stay").off("click");
                //                    $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br/> YOU BUSTED!");
                //                    totalBet -= totalBet;
                //                    bankroll += totalBet;
                //                    $currentBet.html("$" + totalBet);
                //                    $bankrollDisplay.html("$" + bankroll);
                //                    nextRound();
                //                } else if (dealerTotal > 21) {
                //                    $("#dealer-actions #hit").addClass("disabled");
                //                    $("#dealer-actions #stay").addClass("disabled");
                //                    $("#dealer-actions #hit").off("click");
                //                    $("#dealer-actions #stay").off("click");
                //                    $commonDisplay.html("Dealer Score: " + dealerTotal + "<br />Player Score: " + playerTotal + "<br/> YOU BUSTED!");
                //                    totalBet -= totalBet;
                //                    bankroll += totalBet;
                //                    $currentBet.html("$" + totalBet);
                //                    $bankrollDisplay.html("$" + bankroll);
                //                    nextRound();
                //                }
            });


            //Adds Click Event To #stay
            $("#dealer-actions #stay").on("click", function () {
                dCardCount++;
                if (dealerTotal < 16) {
                    stackAddCard(stackDeal(), dealer);
                    console.log("Dealer Card " + dCardCount + ": " + dealer[dCardCount].toString());
                    var dCardHit = $('<div id="d-card-' + cardCount + '" class="card">');
                    dCardHit.css('background-image', 'url(' + '"' + dealer[dCardCount].image + '"' + ')');
                    dCardHit.appendTo('#dealer-area');
                    dealerTotal += dealer[dCardCount].value;
                }
            });
            break;
    }
}

function nextRound() {
    console.log("Next Round");

    $("#dealer-actions #deal").removeClass("disabled");
    $("#dealer-actions #deal").addClass("active");
    $("#dealer-actions #deal").on("click", function () {
        $(".card").remove(".card");
        playerTotal = 0;
        dealerTotal = 0;
        dealRoundCounter = 1;
        $("#dealer-actions li button").addClass("disabled");
        $("#dealer-actions #deal").removeClass("active");
        $("#dealer-actions #deal").off("click");
        $(".bet").off("click");
        setStatus("dealCards");
    });
}


function dealRound() {
    // Deal a card to the player or the dealer based on the counter.
    while (dealRoundCounter < 5) {
        switch (dealRoundCounter) {
            case 1:
                stackAddCard(stackDeal(), player);
                console.log("Player Card 0: " + player[0].toString());
                var pCard0 = $('<div id="p-card-0" class="card">');
                pCard0.css('background-image', 'url(' + '"' + player[0].image + '"' + ')');
                pCard0.appendTo('#player-area');
                playerTotal += player[0].value;
                break;
            case 2:
                stackAddCard(stackDeal(), dealer);
                console.log("Dealer Card 0: " + dealer[0].toString());
                var dCard0 = $('<div id="d-card-0" class="card">');
                dCard0.css('background-image', 'url(' + '"' + faceDownUrl + '"' + ')');
                dCard0.appendTo('#dealer-area');
                dealerTotal += dealer[0].value;
                break;
            case 3:
                stackAddCard(stackDeal(), player);
                console.log("Player Card 1: " + player[1].toString());
                var pCard1 = $('<div id="p-card-1" class="card">');
                pCard1.css('background-image', 'url(' + '"' + player[1].image + '"' + ')');
                pCard1.appendTo('#player-area');
                playerTotal += player[1].value;
                break;
            case 4:
                stackAddCard(stackDeal(), dealer);
                console.log("Dealer Card 1: " + dealer[1].toString());
                var dCard1 = $('<div id="d-card-1" class="card">');
                dCard1.css('background-image', 'url(' + '"' + dealer[1].image + '"' + ')');
                dCard1.appendTo('#dealer-area');
                dealerTotal += dealer[1].value;
                break;

            default:
                console.log("No more cards to deal, play the round.")
                playRound();
                return;
                break;
        }
        // Set a timer for the next call.
        dealRoundCounter++;
        setTimeout(dealRound(), dealTimeDelay);
    }
}

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
    $("#bet-selector").addClass("active");
    $(".bet").on("click", function () {
        $("#bet-selector").removeClass("active");
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
            $commonDisplay.html("You do not have enough money!");
        }
    });
}

//-----------------------------------------------------------------------------
// Card constructor function.
//-----------------------------------------------------------------------------

function Card(rank, suit, image, value) {

    this.rank = rank;
    this.suit = suit;
    this.image = image;
    this.value = value;

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
    var values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    var i, j, k;
    var m;
    m = ranks.length * suits.length;

    // Set array of cards.

    this.cards = new Array(n * m);

    // Fill the array with 'n' packs of cards.

    for (i = 0; i < n; i++) {
        for (j = 0; j < suits.length; j++) {
            for (k = 0; k < ranks.length; k++) {
                this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j], imgUrls[j * ranks.length + k], values[k]);
            }
        }
    }
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
