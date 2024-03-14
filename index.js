var userClickedPattern = [];

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").click(function (event){
    
    var userChosenColour = event.target.id;
    console.log(event.target.id);//to show which colour needs to be sent
    
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playsound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern.length - 1);
})

var gameStart = 0;
var level = 0;
$(document).keypress(function () {
    if (!gameStart) {
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStart = 1;
        
    } 
});



function nextSequence() {
    userClickedPattern = [];
    level++; //whenever nextSequence is called
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour); 
    
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
              nextSequence();
            }, 1000);
        }
    } 

    else{
        console.log("wrong");

        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function playsound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
}, 100);

}
function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = 0;
  }
// CTRL + SHIFT + P = OPEN COMMAND PALETTE
// CTRL + R = OPEN FOLDER DIRECTLY
// CTRL + SHIFT + T = TO OPEN LAST CLOSED TAB 
// LEARN ABOUT REGULAR EXPRESSIONS and ALSO PRETTIER WORKING use CTRL + S