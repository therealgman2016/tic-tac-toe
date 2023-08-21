
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;
    
    cell.textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  });
});

playAgainButton.addEventListener('click', () => {
  resetGame();
});

const checkWin = () => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      gameActive = false;
      message.textContent = `${currentPlayer} wins!`;
      message.style.color = 'green';
      endGame(`${currentPlayer} wins!`); // Pass the result to endGame
    }
  }
  
  if (![...cells].some(cell => cell.textContent === '')) {
    gameActive = false;
    message.textContent = "It's a draw!";
    message.style.color = 'red';
  }
};


const resetGame = () => {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  message.textContent = '';
  message.style.color = 'black';
  currentPlayer = 'X';
  gameActive = true;
  playAgainButton.style.display = 'none'; // Hide the button again
};

const endGame = (result) => {
  gameActive = false;
  message.textContent = result;
  message.style.color = result === "It's a draw!" ? 'red' : 'green';
  playAgainButton.style.display = 'block'; // Show the button when the game ends
};

