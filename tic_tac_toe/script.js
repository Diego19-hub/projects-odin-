const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status")
const restart_one = document.querySelector(".button--primary")
const restart_two = document.querySelector(".button--secondary")
const marcadoresX = document.getElementById("score-x")
const marcadoresO = document.getElementById("score-o")
const marcadoresDraw = document.getElementById("score-draw")

const board = ["", "", "", "", "", "", "", "", ""];
let playerO = "O";
let playerX = "X";
let round_finished = false;

let pointX = 0;
let pointO = 0;
let point_draw = 0;

let currentPlayer = playerX

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resetBoard(){
    board.fill("");
    round_finished = false;
    currentPlayer = playerX;

    cells.forEach((cell)=>{
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
    status.textContent = `Turno del jugador ${currentPlayer}`
}

function resetGame(){
    resetBoard()

    pointX = 0;
    pointO = 0;
    point_draw = 0;

  marcadoresX.textContent = pointX;
  marcadoresO.textContent = pointO;
  marcadoresDraw.textContent = point_draw;
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (round_finished === false && cell.textContent.trim() === "") {
        cell.textContent = currentPlayer;
        board[index] = currentPlayer
        cell.classList.add(currentPlayer.toLowerCase());

        const winner = winningCombinations.some((combination) =>{
            const [a,b,c] = combination;

            return(
                board[a] !== "" &&
                board[a] === board[b]&&
                board[a] === board[c]
            );
        });
        if(winner){
            round_finished = true;
            status.textContent = `¡Ganó el jugador ${currentPlayer}!`;

            if(currentPlayer === playerX){
                pointX++;
                marcadoresX.textContent = pointX;
            }else{
                pointO++;
                marcadoresO.textContent = pointO
            }
            return
        }
        
        const draw = board.every((cell) => cell !== "");
        if(draw){
            round_finished = true;
            point_draw++;
            marcadoresDraw.textContent = point_draw;
            status.textContent = `¡Empate!`
            return
        }
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        status.textContent = `Turno del jugador ${currentPlayer}`;
    }
  });
});

restart_one.addEventListener("click", ()=>{
    resetBoard()
})

restart_two.addEventListener("click", ()=>{
    resetGame()
})

