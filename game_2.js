var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var buttonColors = ['red', 'blue', 'green', 'yellow'];



function nextSequence() {

  level++;
  // Increase Level number
  $("#level-title").text("Level " + level);



  var randomNumber = Math.floor(Math.random() * 4);
  // Random color
  var randomChosenColor = buttonColors[randomNumber];



  // Game pattern list 1st question all next are also random (Game Array)
  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);




  // Button with random color flash ANIMATION
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // SOUND for Random chosen color (Game Pattern) questions for player
  playSound(randomChosenColor);
}


// nextSequence()





// Click event for any 4 button pressed 
$(".btn").click(function () {
  // Id of a button clicked by user which is color name
  var userChosenColor = this.id;


  // Registered user's click and added to the (User's Pattern array).
  // So we got all user's input as an array. f.e ["blue", "yellow, "red"] 1st move, 2nd move, and 3rd respectevely
  userClickedPattern.push(userChosenColor);


  // Index of the last user's input (simply index of last arry item)
  checkAnswer(userClickedPattern.length - 1);


  // Plays the same SOUND as (Game Pattern's) but only when clicked, confirming that button pressed was the right one 
  playSound(userChosenColor);


  // Animation for any 4 color was clicked
  animatePress(userChosenColor);
})







// Sound function
function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}


// Animate function for pressed button
function animatePress(currentColor) {
  // Our currenColor from click event is userChosenColor which is id of a button. Here instead of an attribute og a buttom we are refering to the button itself. Cause you can't add a class to the attribute, but for an element;
  currentColor = $('#' + currentColor);


  currentColor.addClass('pressed');

  setTimeout(function () {
    currentColor.removeClass('pressed');
  }, 100)
}


// First time click starts the Game
var gameStart = false;

$(document).keypress(function(){
  if (!gameStart) {
    nextSequence();
    gameStart = true;

    // Change title text to level 0
    $("#level-title").text("Level " + level);
  }
})


// Checking User's Inputs and Game Pattern so far
function checkAnswer(elementIndex) {
  if(userClickedPattern[elementIndex] === gamePattern[elementIndex]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    // PLayer's mistake sound
    playSound("wrong");

    
    // Game over animation
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)

    // Game over text
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Restart the game
    gameRestart();
  }
}




// Restart the game
function gameRestart() {
  level = 0;

  gamePattern = [];

  gameStart = false;
}