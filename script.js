
window.onload = function() {
    //1. Initializing States
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
        ctx.moveTo(15, 85);
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
    };

}