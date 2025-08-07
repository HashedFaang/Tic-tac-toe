/* === script.js === */
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const restartBtn = document.getElementById("restart");
  const themeToggle = document.getElementById("theme-toggle");

  let currentPlayer = "X";
  let gameActive = true;
  const gameState = Array(9).fill("");

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }
  }

  function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
      status.textContent = `🎉 Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    if (!gameState.includes("")) {
      status.textContent = "It's a tie!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }

  function checkWinner() {
    return winConditions.some(cond => {
      const [a, b, c] = cond;
      return gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c];
    });
  }

  function restartGame() {
    gameState.fill("");
    board.innerHTML = "";
    currentPlayer = "X";
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s Turn`;
    createBoard();
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });

  restartBtn.addEventListener("click", restartGame);

  createBoard();
});
