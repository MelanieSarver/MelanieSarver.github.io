/**
 * @author Created by mel on 2/4/17.
 */

$(document).ready(function() {
    var num1 = "";
    var num2 = "";
    var doThings = "";
    var screen = $('#input');
    screen.text("0");

    //limits the total number of digits entered to 15.
    var testNumLength = function(number) {
        if (number.length > 9) {
            screen.text(number.substr(number.length-9,9));
            if (number.length > 15) {
                num1 = "";
                screen.text("Err");
            }
        }
    };

    //gets the numbers selected by the user, appends them to the num1 variable and writes them to the user display.
    $('#numbers > a').not('#clear, #clearall').click(function() {
        num1 += $(this).text();
        screen.text(num1);
        testNumLength(num1);
    });

    //gets the operand
    $('#operators > a').not('#equals').click(function() {
        doThings = $(this).text();
        num2 = num1;
        num1 = "";
    });

    //handles the function of the C/CE buttons
    $("#clear, #clearall").click(function() {
        num1 = "";
        screen.text("0");
        if ($(this).attr("id") == "clearall") {
            num2 = "";
        }
    });

    //This is the math stuff
    $("#equals").click(function() {
        num1 = parseInt(num1);
        num2 = parseInt(num2);
        screen.text(total(num2, num1));
        num1 = "";
        num2 = "";
    });

    function total(num2, num1) {
        switch (doThings) {
            case "+":
                return num2 + num1;
                break;

            case "-":
                return num2 - num1;
                break;

            case "/":
                return num2 / num1;
                break;

            case "x":
                return num2 * num1;
                break;
            default:
                console.log("error");
        }
    }

});