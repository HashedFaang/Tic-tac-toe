document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const restartBtn = document.getElementById("restart");
  const toggleBtn = document.querySelector(".toggle-button");
  const body = document.body;

  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        gameActive = false;
        highlightWin(condition);
        statusText.textContent = `🎉 Player ${board[a]} wins!`;
        return;
      }
    }
    if (!board.includes("")) {
      gameActive = false;
      statusText.textContent = "It's a tie! 🤝";
    }
  }

  function highlightWin(condition) {
    condition.forEach(index => {
      cells[index].classList.add("win");
    });
  }

  function handleClick(e) {
    const index = e.target.getAttribute("data-index");
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);
    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
  }

  function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's turn`;
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("X", "O", "win");
    });
  }

  function toggleTheme() {
    body.classList.toggle("dark-mode");
  }

  cells.forEach(cell => cell.addEventListener("click", handleClick));
  restartBtn.addEventListener("click", restartGame);
  toggleBtn.addEventListener("click", toggleTheme);
});
