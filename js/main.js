const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board;
let turn = 'X';
let win;

const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');

document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    win = null;
    render();
}

function render() {
    board.forEach(function(val, idx) {
        squares[idx].textContent = val;
    });
    messages.textContent = win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
}

function handleTurn(event) {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });

    if (board[idx] || win) return; 
    
    board[idx] = turn;
    win = getWinner();
    turn = turn === 'X' ? 'O' : 'X'; 
    render();
}

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    return winner ? winner : board.includes('') ? null : 'T';
}

init();

