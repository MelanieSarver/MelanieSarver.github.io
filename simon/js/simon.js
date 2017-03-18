/**
 * @author Created by mel on 12/12/16
 */
$(document).ready(function(){
    "use strict";
    var shapes = ['white', 'blue', 'cyan', 'teal'];
    var counter = 0;
    var level = 0;
    var simon = [];
    var player = [];
    var enableClicks = true;

    function setClick (bool) {
        enableClicks = bool;
    }

    //modal initialization and options
    $('.modal').modal({
        dismissible: true,
        opacity: .5,
        inDuration: 300,
        outDuration: 200,
        startingTop: '4%',
        endingTop: '10%'

    });

    //Draws game paddles in html document
    var quarter = "";
    shapes.forEach(function(object){
        quarter += '<a id="' + object + '" class="quarter"></a>';
    });
    $('#game').html(quarter);


    //Handles the animation function for Simon
    var timer = 500;
    var illuminate = function () {
        simon.forEach(function(object, i){
            setTimeout(function() {
                $('#' + object).fadeOut(timer).fadeIn(timer);
            }, 1500 * i);
        });
    };

    //begins a new turn for simon, clears the player's moves from the last turn, adds a new move to simon's turn
    var newLevel = function() {
        setClick(false);
        var randomPaddle = shapes[Math.floor(Math.random() * shapes.length)];
        player = [];
        level ++;
        $('#level').html(level);
        simon.push(randomPaddle);
        illuminate();
    };

    //Start a new turn
    $('.btn-large').click(function() {
        newLevel();
    });

    //Handles the user's turn and compares it to simon's moves
    $('.quarter').click(function() {
        setClick(true);
        $(this).fadeOut(timer).promise().done(function() {
            $(this).fadeIn(timer);
            player.push($(this).attr('id'));
            if (simon[counter] == player[counter]) {
                counter ++;
                if (simon.length == player.length){
                    counter = 0;
                    newLevel();
                }
            } else {
                $('#modal1').modal('open');
                simon = [];
                player = [];
                level = 0;
            }
        });
    });

});

