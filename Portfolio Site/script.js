'use strict';

var project1StartButton = $('.project1.button');
var project1FinishedButton = $('.escape.button');
var mole = $('#mole');
var moleProject = $('.moleProject');
var thumbnail = $('.thumbnail');
var board = $('#board');
var score = $('#score');
var playerScore = 0;

var project1Started = true;
var project1ButtonIsVisible = false;
var project2ButtonIsVisible = false;


var learnItNowProj = $('.learnitnow');
var project2Submit = $('#submit');
var firepad = $('#firepad');
var project2ElH2 = $('h2');
var project2Form = $('form');
var project2ElPText = $('.learnitnow p');
var project2FinishedButton = $('.escape2.button');


// logic to make portfolio thumbnails disappear and load projects in DOM space

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
        score.css('display', 'block');
        score.html('Player Score: ' + playerScore);


        // Make start and escape button visible
        project1StartButton.css('display', 'block');
        project1ButtonIsVisible = true;
        project1FinishedButton.css('display', 'block');

    }   else if(objClicked.hasClass('project2') === true){

        learnItNowProj.css('display', 'block');
        project2FinishedButton.css('display', 'block');
        project2ButtonIsVisible = true;
    }
});

//Whack-a-Mole Project 1 Script


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

    //This shows the results of the randomization in the console
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

// clicking changes the mole to a random color
mole.click(function() {
    if(mole.css('top') === '0px' && mole.css('left') === '0px'){
        alert('Please start the game first.')
    } else {
        mole.css('background-color', randomBodyColor());
        addPoint();
    }
});

//Returns a random hexadecimal calculation and concatenates it to an octothorp
function randomBodyColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

//Defines project 1 escape button
function myProject1Escape(){
    if (project1ButtonIsVisible === true){
        project1StartButton.css('display', 'none');
    }
    project1Started = false;
    project1FinishedButton.css('display', 'none');
    moleProject.css('display', 'none');
    score.html('');
    score.css('display', 'none');
    playerScore = 0;
    thumbnail.css('display', 'block');
}

//The endless randomization loop of the mole
function dig() {
    project1StartButton.css('display', 'none');
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

//This function adds the score to the game
function addPoint() {
    playerScore++;
    score.html('');
    score.html('Player Score: ' + playerScore);
}

//Project 2 Firebase Collaboration Chat Room

// Initialize Firebase.
var config = {
    apiKey: "AIzaSyC-UmzZh1QBe61yc9cdAoEITJfN3v_P0ZQ",
    authDomain: "fir-firsttest-5635d.firebaseapp.com",
    databaseURL: "https://fir-firsttest-5635d.firebaseio.com",
    storageBucket: "fir-firsttest-5635d.appspot.com",
    messagingSenderId: "931278023084"
};

firebase.initializeApp(config);
var firebaseDb = firebase.database();


function setup(roomName) {
    // Set Firebase Database reference.
    var fireOb = firebaseDb.ref(roomName);
    firepadInit('firepad', fireOb);
}

function firepadInit(ACEdom, fireOb) {
    // Create Ace editor.
    var aceEditor = ace.edit(ACEdom);

    // Create Firepad.
    Firepad.fromACE(fireOb, aceEditor);
}

project2Submit.click(function () {
    var roomName = $('input').val();

    // TODO: Find a way to prevent the user from abusing spacing and using symbols

    if (roomName === '' || roomName === ' ') {
        alert("Please do not enter a blank name");
    } else if (roomName.includes('.', '>', '<', ',' ,'/', '?', '"', "'", '[', ']', '{', '}', '|' ,';' ,
            ':', '=', '+', '-', '_', ')', '(', '*', '&', '^', '%', '$', '#', '@', '!', '`', '~', ' ')){
        alert('Please do not include symbols or spaces in the room name');
    } else {
        project2Submit.css('display', 'none');
        project2Form.css('display', 'none');
        project2ElPText.css('display', 'none');
        project2ElH2.append("Your Room Topic Is:" + " " + '<span>'+roomName+'</span>');
        firepad.css('display', 'block');
        setup(roomName);

    }
});

//Defines project 2 escape button
function myProject2Escape(){
    if (project2ButtonIsVisible === true){
        project2FinishedButton.css('display', 'none');
    }
    learnItNowProj.css('display', 'none');
    thumbnail.css('display', 'block');
}