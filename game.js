$("h1").css("color", "yellow");

const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;
const playSound = (colour) => {
    $("#" + colour).fadeOut(100).fadeIn(100);
    $("#" + colour + "Sound")[0].play();
}

const animatePress= (colour) => {
    $("#" + colour).addClass('pressed');
    setTimeout(() => {
        $('#' + colour).removeClass('pressed');
    }, 100);
}

const nextSequence = () => {
    currentLevel = 0;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("level " + level);
}

$('.btn').on("click", (e)=>{
    console.log("current level inside click eventListener : ", currentLevel);
    currentLevel++;
    let userChosenColour = $(e.target).attr('id');
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(currentLevel);
})

$(document).on("keypress", (e) => {
    if(level === 0){
        console.log('game has started');
        $("h1").text('level ' + level);
        nextSequence();
    }
    else{
        console.log('Please reload');
    }
})

var checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
        console.log('correct');
        if(userClickedPattern.length < gamePattern.length){
            console.log('carry on')
        }
        else if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        console.log('false! game over!');
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        currentLevel = 0;
        $("#wrong")[0].play();
        $("body").addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200); 
        $("h1").text('Game Over! Press any key to restart');
    }

}