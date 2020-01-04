
const cells = document.querySelectorAll(".cell");

const resetContainer = document.querySelector("#reset");
const resetButton = document.createElement("button");
resetButton.classList.add("resetButton");
resetButton.textContent = "Reset";
resetContainer.appendChild(resetButton);

const playerContainer = document.querySelector("#players");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");



let board = [];
for(let i=0; i<9; i++) board.push("");

let isWinner = false, isTie = false;
let moveCount = Math.round(Math.random());
displayNextTurn();



let gameOver = false;
let currMove = "";
let message = "Get 3 in a Row!";

const messageContainer = document.querySelector("#message");
const msg = document.createElement("p");
msg.textContent = message;
msg.classList.add("msg");
messageContainer.appendChild(msg);


createGame();

resetButton.addEventListener("click", function(){ location.reload(); });

function createGame(){
for(let i=0; i<9; i++){

    let playerMove = document.createElement("p");
    playerMove.classList.add("playerMove");
    cells[i].appendChild(playerMove);

    cells[i].addEventListener("click", function(){
        
        if(!gameOver && board[i] == ""){
            currMove = (moveCount%2==0) ? "X" : "O";
            playerMove.textContent = currMove;

            playGame(i);

            if(!gameOver) displayNextTurn();


           
            
        }
        });
 
    }
}

function playGame(pos){

    if(board[pos] != "") return;
    moveCount++;
    board[pos] = currMove;
    isWinner = checkWin(currMove);
    isTie = checkTie();
    if(isWinner || isTie) gameOver = true;
    
}

function checkWin(str){
    let winner = false;
    // check Horizontal Win
    let win = [];
    if(board[0] == board[1] && board[0] == board[2] && board[1] == board[2] && board[0] == str) {
        winner = true;
        displayWin(0, 1, 2);
    }
     if(board[3] == board[4] && board[3] == board[5] && board[4] == board[5] && board[3] == str) {
        winner = true;
        displayWin(3, 4, 5);
    }
     if(board[6] == board[7] && board[6] == board[8] && board[7] == board[8] && board[6] == str){
        winner = true;
        displayWin(6, 7, 8);
    }

    //Check Vertcal Win
     if(board[0] == board[3] && board[0] == board[6] && board[3] == board[6] && board[0] == str) {
        winner = true;
        displayWin(0, 3, 6);
    }
     if(board[1] == board[4] && board[1] == board[7] && board[4] == board[7] && board[1] == str)  {
        winner = true;
        displayWin(1, 4, 7);
     }
     if (board[2] == board[5] && board[2] == board[8] && board[5] == board[8] && board[2] == str){
        winner = true;
        displayWin(2, 5, 8);
    }

     //Check Diagonal
     if(board[0] == board[4] && board[0] == board[8] && board[4] == board[8] && board[0] == str) {
        winner = true;
        displayWin(0, 4, 8);
    }
     if(board[2] == board[4] && board[2] == board[6] && board[4] == board[6] && board[2] == str) {
        winner = true;
        displayWin(2, 4, 6);
    }

    return winner;
}

function displayWin(a, b, c){
    
    let wins = [a, b, c];
    let player1 = (moveCount%2 == 1) ? true : false;

    if(player1) message = "Player 1 Wins!";
    else message = "Player 2 Wins!";
    msg.textContent = message;


    //let color1 = "navy";
    let color2 = "maroon";

    // let color2 = "#E40C2B"
     let color1 = "#3CBCC3"

    for(let i=0; i<wins.length; i++){
        if(player1){
            cells[wins[i]].style.color = color1;
            cells[wins[i]].style.borderColor = "blue";
        }
        else{
            cells[wins[i]].style.color = color2;
            cells[wins[i]].style.borderColor = "red";
        }
    }

    
    
}

function checkTie(){

    if(isWinner) return false;

    for(let i=0; i<board.length; i++){
        if(board[i] == "") return false;
    }

    msg.textContent = "It's a Tie!"
    return true;
}

function displayNextTurn(){
    if(moveCount%2==0){
        player1.style.borderColor = "blue";
        player2.style.borderColor = "#272727";
        
    } 
    else{
        player2.style.borderColor = "red";
        player1.style.borderColor = "#272727";
    } 
}
