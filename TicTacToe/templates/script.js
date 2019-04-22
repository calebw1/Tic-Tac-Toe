//JS

var players=[];
var markers=[];
var points=[];
var toggleTurn = 1;
var winInts = [7,56,73,84,146,273,292,448];
var gameOver = false;
var score = [0,0];

players[0] = "Player 1";
players[1] = "Player 2";

markers[0] = "X";
markers[1] = "O";



function play(clickedDiv, divValue){
    
    if(!gameOver){
        points[toggleTurn] += divValue;
        clickedDiv.onclick = "";
        clickedDiv.innerHTML = "<span>" + markers[toggleTurn] + "</span>";
        win();
        if (!gameOver){
            toggle();
        } else {
            document.getElementById("play-again").className = "btn";
        }
    }
}

function toggle(){
    if (toggleTurn == 0)
        toggleTurn = 1;
    else
        toggleTurn = 0;
    
    document.getElementById("game-message").innerText = players[toggleTurn] + "'s Turn";
}

function win() {
    for (var i = 0; i < winInts.length; i++) {
        if ((points[toggleTurn] & winInts[i]) == winInts[i]){
            document.getElementById("game-message").innerText = players[toggleTurn] + " Wins!";
            score[toggleTurn] += 1;
            gameOver = true;
        }
    }
    
    if (((points[0] + points[1]) == 511) && !gameOver){
        document.getElementById("game-message").innerText = "Tie Game!";
        gameOver = true;
    }
    
}

function reset() {    
    gameOver = false;
    points = [0,0];
    toggle();
    drawBoard();
}

function drawBoard() {
    var display="";
    var count = 1;
    
    for (var i = 1; i <= 3; i++){
        display += '<div id="row'+i+'">';
        for (var j = 0; j < 3; j++){
            display += '<div onclick="play(this,'+count+');"></div>';
            count *=2;
        }
        display +='</div>';
    }
    display += '<button id="play-again" class="btn hide" onclick="reset();">Play Again?</button>';
    document.getElementById("game-board").innerHTML = display;
}