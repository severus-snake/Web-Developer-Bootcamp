'use strict';

var project1Button = $('.project1.button');
//var project2Button = $('.project2 .button');
var project1FinishedButton = $('.escape.button');
var mole = $('#mole');
var moleProject = $('.moleProject');
var thumbnail = $('.thumbnail');
var board = $('#board');


var project1Started = true;
var project1ButtonIsVisible = false;


// logic to make portfolio templates disappear and load projects

thumbnail.click(function() {
    var objClicked = $(this);
    console.log(objClicked);
    thumbnail.css('display', 'none');

    if(objClicked.hasClass('project1') === true){
        //resets the global variable
        if(project1Started === false) {
            project1Started = true;
        }

        //set location of mole
        mole.css('top', '0px');
        mole.css('left', '0px');

        // make board project visible
        moleProject.css('display', 'block');


        // Make start and escape button visible
        project1Button.css('display', 'block');
        project1ButtonIsVisible = true;
        project1FinishedButton.css('display', 'block');

    }   else if(objClicked.hasClass('project2') === true){
            console.log('This is project 2'); //tests that this works with thumbnail
    }
});

//Whack-a-Mole Script


//This tests the board size at different window sizes
/*$(window).click(function () {
    console.log('board width = ' + board.width());
    console.log('board height = ' + board.height());
});*/

function randomPosition() {

    //randomize where the mole where show up and make sure it doesn't leave the board
    var molePxSize = 50;

    var widthValue = Math.floor(board.width());
    var heightValue = Math.floor(board.height());

    var randomResultWidth = Math.floor(Math.random() * widthValue);
    var randomResultHeight = Math.floor(Math.random() * heightValue);

    //console.log('Result Width = ' + randomResultWidth);
    //console.log('Result Height = ' + randomResultHeight);

    checkWidthResult();
    checkHeightResult();

    //return the randomized result object that moves the mole
    function checkWidthResult(){
        if (randomResultWidth <= widthValue-molePxSize){
            return mole.css('left', randomResultWidth + "px");
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
            return mole.css('top', randomResultHeight + "px");
        } else if (heightValue === 0) {
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
mole.click(function() {
    mole.css('background-color', randomBodyColor());
});

function myEscape(){
    if (project1ButtonIsVisible === true){
        project1Button.css('display', 'none');
    }
    project1Started = false;
    project1FinishedButton.css('display', 'none');
    moleProject.css('display', 'none');
    thumbnail.css('display', 'block');
}

function dig() {
    project1Button.css('display', 'none');
    if (project1Started === true) {
        mole.animate({
            top: '+=' + 50 + 'px',
            height: 'toggle'
        }, 250);
        window.setTimeout(function () {
            resurface();
        }, 500);
    }
}

function resurface () {
    // add some logic here to stop randomPosition from continuing
    if (project1Started === true) {
        randomPosition();
        mole.animate({
            top: '-=' + 50 + 'px',
            height: 'toggle'
        },250);
        window.setTimeout(function(){
            dig();
        }, 500);
    } else {
        mole.animate({
            top: '-=' + 50 + 'px',
            height: 'toggle'
        },250);
    }
}
