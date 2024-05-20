const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
let isPlayerTurn = true;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isPlayerTurn = true;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.innerText = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  if (isPlayerTurn) {
    placeMark(cell, X_CLASS);
    if (checkWin(X_CLASS)) {
      endGame(false);
      return;
    } else if (isDraw()) {
      endGame(true);
      return;
    }
    isPlayerTurn = false;
    setTimeout(makeComputerMove, 500);
  }
}

function makeComputerMove() {
  const availableCells = [...cellElements].filter(cell => {
    return !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS);
  });
  if (availableCells.length > 0) {
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(randomCell, O_CLASS);
    if (checkWin(O_CLASS)) {
      endGame(false);
      return;
    } else if (isDraw()) {
      endGame(true);
      return;
    }
    isPlayerTurn = true;
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${isPlayerTurn ? "You" : "Computer"} Won!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass === X_CLASS ? 'X' : 'O';
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
