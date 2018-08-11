
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
        ctx.moveTo(85, 15);
        ctx.lineTo(15, 85);
        ctx.lineCap = "round";
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
     //Part 4. Create a box click function for the human player
     function boxClick(numId) {
        box = document.getElementById(numId);
        ctx = box.getContext("2d");
        // num = parseInt(numId.charAt(numId.length - 1 ));
        switch(numId) {
			case "canvas1": num = 1;
							break;
			case "canvas2": num = 2;
							break;
			case "canvas3": num = 3;
							break;
			case "canvas4": num = 4;
							break;
			case "canvas5": num = 5;
							break;
			case "canvas6": num = 6;
							break;
			case "canvas7": num = 7;
							break;
			case "canvas8": num = 8;
							break;
			case "canvas9": num = 9;
							break;
		}
     

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
    //Part 5. Find empty boxes for Deebo to use
    function emptyBoxes(newSymbol) {
        var j = 0;
        var empty = [];
        for(var i=0; i<newSymbol.length; i++) {
            if(newSymbol[i] !== 'X' && newSymbol[i] !== 'O') {
                empty[j] = i;
                j++;
            }
        }
        return empty;
    }

    //Part 6. Deebo plays - Minimax Algorithm
    function playAIDeebo() {
        var nextMove = miniMax(symbol,aiDeebo);
        var nextId = "canvas" + (nextMove.id + 1);
        box = document.getElementById(nextId);
        ctx = box.getContext("2d");
        if(gameOver === false) {
            if(turn%2 === 0) {
                drawO(nextMove.id);
                turn++
                filled[nextMove.id] = true;

                if(winnerCheck(symbol, symbol[nextMove.id]) === true) {
                    document.getElementById("result").innerText = "Gimme your chain!";
                    gameOver = true;
                }
                if(turn > 9 && gameOver !== true) {
                    document.getElementById("result").innerText = "I don't care if you won! I'm still taking your chain!";

                }
            }
        }
        else {
            alert("You trying to get that chain taken again? Click the Play Again button Young Blood.");
        }
    }

    //Minimax function 
	//For this example/explanation, AI - X, human - O
	//symbol = ['X','','O','X','','O','','X','X'], 'O' -> human
	function miniMax(newSymbol, player) {
		var empty = [];
		empty = emptyBoxes(newSymbol); //[]
		
		if(winnerCheck(newSymbol,human)) {
			return { score: -10 }; //human wins
		}
		else if(winnerCheck(newSymbol,aiDeebo)) {
			return { score: 10 }; //AI wins
		}
		else if(empty.length === 0) {
			if(winnerCheck(newSymbol,human)) {
				return { score: -10 };
			}
			else if(winnerCheck(newSymbol,aiDeebo)) {
				return { score : 10 };
			}
			return { score: 0 }; //game is draw
		}

//if its not a terminal state
		//possible moves- their indices and score values
		var posMoves = []; 
		//[4] - Example
		for(var i=0; i<empty.length; i++) {
			//current move - index of current move,score
			var curMove = {};
			//generate the new board with the current move
			curMove.id = empty[i]; //4
			newSymbol[empty[i]] = player; //AI
			
			if(player === aiDeebo) {
				//result = [{id:4,score:-10}], 
				//curMove = {id:1,score:-10}
				result = miniMax(newSymbol, human); //index and score
				curMove.score = result.score; //10
			}
			else {
				//result = [{id:6, score:10}]
				//curMove = {id:6, score:10}
				result = miniMax(newSymbol, aiDeebo);
				curMove.score = result.score; //-10
				//level 2 move 1 curMove = {id: 6, score: 10}
				//level 3 move 1 -> posMoves = [{id:4,score:10}]
				//level 2 move 1 -> posMoves = [{id:6, score:10}]
			}
			
			//level 1 move 1 -> posMoves = [{id:4,score:-10},{id:6, score:10}]
			//level 0 -> posMoves = [{id:4,score:10},{id:6,score:10},{id:1,score:-10}]
			//empty:[1,4,6]
			newSymbol[empty[i]] = '';
			
			posMoves.push(curMove); //[{id: 1, score: -10}]
			
		}
		
		//Calculate score of intermediate states - best move + score with respect to that player + return statement 
		var bestMove;
		//AI - max player (always) -> choose maximum value, human - min player -> choose minimum value
		
		if(player === aiDeebo) {
			//posMoves = [{id:4,score:10},{id:6,score:10},{id:1,score:-10}]
			var highestScore = -1000;
			for(var j=0; j<posMoves.length;j++) {
				if(posMoves[j].score > highestScore) {
					highestScore = posMoves[j].score;
					bestMove = j; //0
				}
			}
		}
		//posMoves = [{id:4,score:-10},{id:6, score:10}]
		else {
			var lowestScore = 1000;
			for(var j=0; j<posMoves.length;j++) {
				if(posMoves[j].score < lowestScore) {
					lowestScore = posMoves[j].score;
					bestMove = j;
				}
			}
		}
		return posMoves[bestMove]; 
        //posMoves[0] = {id:4,score:10}
    }
};