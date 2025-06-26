var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern =[];
var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});




function nextSequence(){
    userClickedPattern=[];
    level++;
    if(level%10===0){$("#level-title").text("Level 🤩 "+level);}
    else if(level%100===0){$("#level-title").text("Level 😍 "+level);}
    else{$("#level-title").text("Level "+level);}

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            console.log("true");
        }
    }
    else{
        console.log("false");
        playSound("wrong");
        $("body").addClass("game-over");          
        $("#level-title").text(" GAME OVER 😒 {Press Any Key to Restart}");
        setTimeout(function (){
            $("body").removeClass("game-over");            
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}