document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const statusText = document.getElementById("status");
  const restartBtn = document.getElementById("restart");
  const darkToggle = document.getElementById("themeToggle");

  let currentPlayer = "X";
  let cells = Array(9).fill(null);
  let gameActive = true;
  let scores = { X: 0, O: 0 };
  let vsAI = false;

  const clickSound = new Audio("https://cdn.jsdelivr.net/gh/harshitsrepo/tic-sounds/click.mp3");
  const winSound = new Audio("https://cdn.jsdelivr.net/gh/harshitsrepo/tic-sounds/win.mp3");
  const tieSound = new Audio("https://cdn.jsdelivr.net/gh/harshitsrepo/tic-sounds/tie.mp3");

  const scoreDisplay = document.createElement("div");
  scoreDisplay.id = "scoreboard";
  scoreDisplay.innerHTML = `
    <p>Score - X: <span id="scoreX">0</span> | O: <span id="scoreO">0</span></p>
    <label style="display:inline-flex;align-items:center;gap:5px;margin-top:10px;">
      <input type="checkbox" id="aiToggle"> vs Computer
    </label>
  `;
  document.querySelector(".container").insertBefore(scoreDisplay, board);

  const aiToggle = document.getElementById("aiToggle");
  aiToggle.addEventListener("change", () => {
    vsAI = aiToggle.checked;
    restartGame();
  });

  function checkWinner() {
    const winCombos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let combo of winCombos) {
      const [a,b,c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
        highlightWinner([a, b, c]);
        return true;
      }
    }
    return false;
  }

  function highlightWinner(indices) {
    indices.forEach(index => {
      const cell = board.children[index];
      cell.classList.add("winner");
    });
  }

  function updateScore(player) {
    scores[player]++;
    document.getElementById("scoreX").textContent = scores["X"];
    document.getElementById("scoreO").textContent = scores["O"];
  }

  function isDraw() {
    return cells.every(cell => cell);
  }

  function handleClick(e) {
    const index = e.target.dataset.index;
    if (!gameActive || cells[index]) return;
    makeMove(index, currentPlayer);
    if (gameActive && vsAI && currentPlayer === "O") {
      setTimeout(computerMove, 400);
    }
  }

  function makeMove(index, player) {
    if (!gameActive || cells[index]) return;
    cells[index] = player;
    board.children[index].textContent = player;
    clickSound.play();

    if (checkWinner()) {
      winSound.play();
      statusText.textContent = `🎉 Player ${player} Wins! 🏆`;
      updateScore(player);
      gameActive = false;
      setTimeout(() => alert(`🎉 Player ${player} wins the game!`), 300);
    } else if (isDraw()) {
      tieSound.play();
      statusText.textContent = "😐 It's a Tie! 🤝";
      gameActive = false;
      setTimeout(() => alert("😐 It's a tie!"), 300);
    } else {
      currentPlayer = player === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }

  function computerMove() {
    if (!gameActive) return;
    let emptyIndices = cells.map((val, idx) => val === null ? idx : null).filter(idx => idx !== null);
    if (emptyIndices.length === 0) return;
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex, "O");
  }

  function restartGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    gameActive = true;
    board.innerHTML = "";
    initBoard();
  }

  function initBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }
  }

  restartBtn.addEventListener("click", restartGame);
  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });

  initBoard();
});
