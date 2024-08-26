const boxes = document.querySelectorAll('.box');
const msg = document.getElementById('msg');
const newBtn = document.getElementById('new-btn');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0 }; // Score tracking

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Add click event listeners to boxes
boxes.forEach((box, index) => {
    box.addEventListener('click', () => userAction(box, index));
});

// Handle user action
function userAction(box, index) {
    if (gameState[index] !== '' || !gameActive) {
        return;
    }
    gameState[index] = currentPlayer;
    box.textContent = currentPlayer;

    if (checkWinner()) {
        msg.textContent = `Player ${currentPlayer} Wins!`;
        scores[currentPlayer] += 1;
        gameActive = false;
        updateScore();
    } else if (gameState.every(cell => cell !== '')) {
        msg.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        msg.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check for a winner
function checkWinner() {
    return winningConditions.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// Reset the game
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    msg.textContent = `Player ${currentPlayer}'s Turn`;
    boxes.forEach(box => (box.textContent = ''));
}

// Start a new game (reset scores)
function newGame() {
    resetGame();
    scores = { X: 0, O: 0 };
    updateScore();
}

// Update the score display
function updateScore() {
    msg.textContent = `Score - X: ${scores.X}, O: ${scores.O}`;
}

// Event listeners for buttons
newBtn.addEventListener('click', newGame);
resetBtn.addEventListener('click', resetGame);

// Initialize the game with the correct message
msg.textContent = `Player ${currentPlayer}'s Turn`;
