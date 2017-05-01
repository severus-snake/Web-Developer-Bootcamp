var project1Button = $('.project1 button');
var project2Button = $('.project2 button');
var project1FinishedButton = $('.escape button');

var timesProject1ButtonClicked = 0;


// logic to make portfolio templates disappear and load projects

$('.thumbnail').click(function() {
    var objClicked = $(this);
    console.log(objClicked);
    $('.thumbnail').hide();

    if(objClicked.hasClass('project1') === true){
        //tests that this works with thumbnail
        console.log('This is project 1');

        //hides the anchor tag so you can't reactivate this code
        //$('#Project1').hide();

        // insert project into the div here
        $('#board').css('visibility', 'visible');
        $('.moleProject').show();

        // Make button visible
        if (timesProject1ButtonClicked === 0){
            project1Button.show();
            project1Button.css('visibility', 'visible');
            timesProject1ButtonClicked++;
        }

        project1FinishedButton.show();
        project1FinishedButton.css('visibility', 'visible');

    }   else if(objClicked.hasClass('project2') === true){
            console.log('This is project 2'); //tests that this works with thumbnail
    }
});

//Whack-a-Mole Script

var board = $('#board');

$(window).click(function () {
    console.log('board width = ' + board.width());
    console.log('board height = ' + board.height());
});

function randomPosition () {

    //randomize where the mole where show up and make sure it doesn't leave the board
    var molePxSize = 50;
    var widthValue = Math.floor(board.width());
    var heightValue = Math.floor(board.height());


    var randomResultWidth = Math.floor(Math.random() * widthValue);
    var randomResultHeight = Math.floor(Math.random() * heightValue);

    console.log('Result Width = ' + randomResultWidth);
    console.log('Result Height = ' + randomResultHeight);

    checkWidthResult();
    checkHeightResult();

    //return the randomized result object that moves the mole
    function checkWidthResult(){
        if (randomResultWidth <= widthValue-molePxSize){
            return $('#mole').css('left', randomResultWidth + "px");
        } else if (widthValue === 0){
            return 0;
        } else if (randomResultWidth > widthValue || randomResultWidth < molePxSize) {
            randomResultWidth = Math.floor(Math.random() * widthValue);
            console.log("random width revised to " + randomResultWidth);
            return checkWidthResult();
        }
    }

    function checkHeightResult(){
        if (randomResultHeight <= heightValue-molePxSize && randomResultHeight >= molePxSize){
            return $('#mole').css('top', randomResultHeight + "px");
        } else if (randomResultHeight === 0) {
            return 0;
        } else if (randomResultHeight > heightValue || randomResultHeight < molePxSize) {
            randomResultHeight = Math.floor(Math.random() * heightValue);
            console.log("random height revised to " + randomResultHeight);
            return checkHeightResult();
        }
    }
}

function randomBodyColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// clicking changes the mole to a random color
$('#mole').click(function() {
    $('#mole').css('background-color', randomBodyColor());
});

function dig() {
    $('#mole').animate({
        top: '+=' + 50 + 'px',
        height: 'toggle'
    },500);
    window.setTimeout(function(){
        resurface();
    }, 1000);
}

function resurface () {
    randomPosition();
    $('#mole').animate({
        top: '-=' + 50 + 'px',
        height: 'toggle'
    },500);
    window.setTimeout(function(){
        dig();
    }, 1000);
}
