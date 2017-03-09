/**
 * Created by mel on 12/12/16.
 */
$(document).ready(function(){
    "use strict";
    var shapes = [
        {
            color:'orange',
            css: { "box-shadow" : "0 0 60px 30px #ffc750, 0 0 100px 60px #fff88d" }
        },
        {
            color: 'blue',
            css: { "box-shadow": "0 0 60px 30px #645fff, 0 0 100px 60px #A679ff" }
        },
        {
            color:'green',
            css: { "box-shadow" : "0 0 60px 30px #4dff64, 0 0 100px 60px #fff88d"}
        },
        {
            color:'red',
            css:  { "box-shadow" : "0 0 60px 30px #ff5646, 0 0 100px 60px #ff9653"}
        }];
    var counter = 0;
    var level = 0;
    var simon = [];
    var player = [];
    var timer = 500;

//Draws game paddles in html document
    var quarter = "";
    shapes.forEach(function(shape){
        quarter += '<a id="' + shape.color + '" class="quarter"></a>';
    });
    $('#game').html(quarter);

//Handles the animation function for Simon
    var illuminate = function (object) {
        console.log(shapes[i].css);
        $('#' + object.color).css(shapes.css);
        setTimeout(function(){
            $('#' + object.color).css({"box-shadow" : "none"});
        }, 250);
    };

//begins a new level, clears the player's moves from the last turn, adds a new move to simon's turn
    var newLevel = function() {
        var randomPaddle = shapes[Math.floor(Math.random() * shapes.length)];
        player = [];
        level ++;
        simon.push(randomPaddle.color);
        simon.forEach(function(object, i){
            setTimeout(function () {
                illuminate(object);
            }, timer * i);
        });
    };

//Increment timer so that every third level gets faster
    var speed = function(){
        if (level % 3 == 0 ) {
            timer = timer - 50;
        }
    };

//Start button
    $('.btn').click(function() {
        newLevel();
    });

//Handles the user's turn and compares it to simon's moves
    $('.quarter').click(function() {
        $(this).fadeOut(timer).promise().done(function() {
            $(this).fadeIn(timer);
            player.push($(this).attr('id'));
            console.log(simon);
            console.log(player);
            if (simon[counter] == player[counter]) {
                counter++;
                if (simon.length == player.length) {
                    counter = 0;
                    speed();
                    newLevel();
                }
            } else {
                alert('you lose');
                simon = [];
                level = [];
            }
        });
    });
});

