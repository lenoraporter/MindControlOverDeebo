
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
}