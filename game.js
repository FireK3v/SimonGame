// alert("file is linked");

//Arrays
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//Variables
var level = 0;
var started = false;

//Initialize h1
$("h1").text("Press A Key to Start or Click Game Start");

//Function to start game
function startGame(){
  //$("#level-title").text("Level " + level);
  $("h1").text("Level " + level);
  nextSequence();
  started = true;
  $("#btnStart").hide();
}
//Start game when pressing any key
$(document).keydown(function () {
  if (!started) {
    setTimeout(function () {
      startGame();
    }, 500);
  }
});

$("#btnStart").click(function () {
  if (!started) {
    setTimeout(function () {
      startGame();
    }, 500);
  }
});

//Function to randomly select a button and play its sound and increase level
function nextSequence(){
  //Increase level and update h1 accordingly
  level++;
  $("h1").text("Level " + level);

  //Reset user array
  userClickedPattern = [];

  //Generate random numbers between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  //Pick color with random number
  var randomChosenColour = buttonColours[randomNumber];

  //Store color in array
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern);

  //Select button or div with random color chosen and make it flash
  //$("div #" + randomChosenColour).css({opacity: 0}).animate({opacity: 1}, 700 );
  $("div #" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play sound of corresponding random number
  playSound(randomChosenColour);

}

//Function to check user answer
function checkAnswer(currentLevel){
  //Check last user click matches game pattern (every time the user clicks it will check)
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //console.log("success");

    //The code can only know that the user finished clicking when both arrays have the same length
    //At this point, call the next sequence
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //When the user fails, play the wrong sound and apply game-over class
    //console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key to Restart or Click Game Start");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //Start over
    startOver();

  }
}

//Function to start over, it resets level and started variables,
// it also reset game pattern array only. Because the user array is
// reset when nextSequence is called
function startOver(){
  //Reset variables
  level = 0;
  started = false;

  //Reset array
  gamePattern = [];

  //Show Game Start button
  $("#btnStart").show();
}

//Detect when any button is clicked, populate array and
// play corresponding sound and add temporarily class pressed
$("div .btn").click(function () {
  if (started) {
    var userChosenColour = this.id; //Or in pure jQuery --> var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //check answer passing last index
    checkAnswer(userClickedPattern.length-1);
  }
});

//Function to play sounds base on colors
function playSound(color){

  var audio = new Audio ("sounds/" + color + ".mp3");
  audio.play();

  // switch (color) {
  //   case "blue":
  //     var blueSound = new Audio("sounds/blue.mp3");
  //     blueSound.play();
  //     break;
  //
  //   case "green":
  //     var greenSound = new Audio("sounds/green.mp3");
  //     greenSound.play();
  //     break;
  //
  //   case "red":
  //     var redSound = new Audio("sounds/red.mp3");
  //     redSound.play();
  //     break;
  //
  //   case "yellow":
  //     var yellowSound = new Audio("sounds/yellow.mp3");
  //     yellowSound.play();
  //     break;
  //
  //   default: console.log(color);
  //
  // }

}

//Function to animate button on clicked and remove animation 100 ms later
//Cant't use jQuery delay() method for classes, just for animations
function animatePress(currentColour){
  $("div #" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("div #" + currentColour).removeClass("pressed");
  }, 100);

}
