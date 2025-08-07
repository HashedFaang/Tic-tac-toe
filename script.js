const board = document.getElementById('board');
const message = document.getElementById('message');

let currentPlayer = 'X';
let cells = [];
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = '';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(event) {
  const index = event.target.dataset.index;

  if (!gameActive || cells[index] !== '') return;

  cells[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!cells.includes('')) {
    message.textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === currentPlayer)
  );
}

function resetGame() {
  createBoard();
}

// Initialize game
createBoard();
