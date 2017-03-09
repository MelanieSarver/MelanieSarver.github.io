/**
 * @author Created by mel on 12/15/16.
 */
$(document).ready(function() {
//constructor for Card object. Assigns value and suit to each dealt card
    var Card = function (number, suit) {
        this.getValue = function () {
            if (number >= 11) {
                return 10;
            } else if (number == 1) {
                return 11;
            } else {
                return number;
            }
        };
        this.getSuit = function () {
            return suit;
        }
    };

//chooses a random card with a random suit and creates a new Card object
    var deal = function () {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return new Card(getRandomInt(1, 13), getRandomInt(1, 4));
    };

//constructor for each player's hand. Deals 2 cards and adds them together for a score
//enables hit me to add new cards to hand.
    var Hand = function () {
        var cards = [deal().getValue(), deal().getValue()];
        this.getHand = function () {
            return cards;
        };
        this.score = function () {
            return this.getHand().reduce(function (a, b) {
                return a + b;
            }, 0);
        };
        this.hitMe = function () {
            cards.push(deal().getValue());
            return this.score();
        }
    };

    //------------in game button functionality----------------

    var player;
    var dealer;
    var enableClicks = true;

    function setClick (bool) {
        enableClicks = bool;
    }

    $('#deal').click(function() {
        if (enableClicks) {
            player = new Hand();
            dealer = new Hand();
            console.log("Player: " + player.score());
            console.log("Dealer: " + dealer.score());
            if (player.score() == 21) {
                console.log("Blackjack! You win!");
                setClick(true)
            }
            setClick(false);
        }
    });

    $('#hit').click(function() {
        if (!enableClicks) {
            player.hitMe();
            if (player.score() == 21) {
                console.log("Blackjack! You win!");
                setClick(true);
            } else if (player.score() > 21) {
                console.log(player.score() + " : Player busts, House wins.");
                setClick(true);
            } else {
                console.log(player.score());
            }
        }
    });

    $('#stay').click(function () {
        if (!enableClicks) {
            while (dealer.score() < 17) {
                dealer.hitMe();
                console.log(dealer.score());
            }
            if (dealer.score() == 21) {
                console.log("Blackjack! House Wins!");
                setClick(true);
            } else if (dealer.score() > 21) {
                console.log(dealer.score() + " : Dealer busts, You win.");
                setClick(true);
            } else {
                console.log(dealer.score());
                setClick(true);
            }
        }
    });

});