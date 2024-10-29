const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentTurn = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (cell.innerText !== '' || !isGameActive) {
        return;
    }

    cell.innerText = currentTurn;
    boardState[cellIndex] = currentTurn;

    if (checkWin()) {
        messageElement.innerText = `${currentTurn} Wins!`;
        isGameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
        messageElement.innerText = 'Draw!';
        isGameActive = false;
    } else {
        currentTurn = currentTurn === 'X' ? 'O' : 'X';
    }
};

const checkWin = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentTurn;
        });
    });
};

const restartGame = () => {
    currentTurn = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    messageElement.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);