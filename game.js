var isGameStarted = false;

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


$("body").keydown(function() {
  if (!isGameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    isGameStarted = true;
  }
});


$(".btn").click(function() {
  if (isGameStarted === true) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
}
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
}

function makeSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var button = $("#" + currentColour);
  console.log(button);
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 250);

    $("#level-title").html("Game over. Score: " + (gamePattern.length - 1) + "<br>Press any key to restart.");

    startOver();
  }


}

function startOver() {
  level = 0;
  gamePattern = [];
  isGameStarted = false;
}
