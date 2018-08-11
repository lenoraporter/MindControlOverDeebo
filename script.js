
window.onload = function() {
    //Part 1. Initializing States
    var num;
    var box;
    var ctx;
    var turn = 1;
    var filled;
    var symbol;
    var winner;
    var gameOver = false;
    var human = 'X';
    var aiDeebo = 'O';
    var result = {};

    filled = new Array();
    symbol = new Array();

    winner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    for(var i=0; i<9; i++) {
        filled[i] = false;
        symbol[i] = '';
    }

    // Create NewGame Button = Reloading the page
    var n = document.getElementById("new-game");
    n.addEventListener("click", newGame);

    //Reload Page
    function newGame() {
        document.location.reload();
    }

    //Setting Canvas Number
    //Canvas Click Event
    document.getElementById("tic-tac-toe").addEventListener("click", function(e) {
        boxClick(e.target.id);
    });

    //Part 2: Draw X and O
    function drawX() {
        box.style.backgroundColor = "#fb5181";
        ctx.beginPath();
        ctx.moveTo(15, 15);
        ctx.lineTo(85, 85);
        ctx.moveTo(85, 15);
        ctx.lineTo(15, 85);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();

        symbol[num-1] = human;
    }
    
    //Drawing O
    function drawO(next) {
        box.style.backgroundColor = "#93f273";
        ctx.beginPath();
        ctx.arc(50,50,35,0,2*Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
       
        symbol[next] = aiDeebo;
    }

    //Part 3. Check for the winner
    function winnerCheck(symbol, player) {
        for(var j=0; j<winner.length; j++) {
            if((symbol[winner[j][0]] == player) && 
            (symbol[winner[j][1]] == player ) &&
            (symbol[winner[j][2]] == player )) {
                return true;
            }
        }
        return false;
    }

    //Part 4. Create a box click function for the human player
    function boxClick(numId) {
        box = document.getElementById(numId);
        ctx = box.getContext("2d");
        num = parseInt(numId.charAt(numId.length - 1 ));
     

        if(filled[num-1] === false) {
            if(gameOver === false) {
                if(turn%2 !== 0) {
                    drawX();
                    turn++;
                    filled[num-1] = true;

                    if(winnerCheck(symbol,symbol[num -1]) === true) {
                        document.getElementById("result").innerText = "I don't care if you won! I'm still taking your chain!";
                        gameOver = true;
                    }

                    if(turn > 9 && gameOver !== true) {
                        document.getElementById("result").innerText = "Ain't nobody win Young Blood. That chain still mine though!";
                        return;
                    }

                    if(turn%2 == 0) {
                        playAIDeebo();
                    }
                }
            }
            else {
                alert("You trying to get that chain taken again? Click the Play Again button Young Blood.");
            }
        }
        else {
            alert("Don't try to cheat. I'll take more than your chain! Click another box."); 
        }
    }
};