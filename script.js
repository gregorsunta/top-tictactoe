const Gameboard = (function () {
  let gameboard = new Array(9);
  const player1 = {
    symbol: "x",
  };
  const player2 = {
    symbol: "o",
  };
  return { gameboard, player1, player2 };
})();

const DisplayController = (function () {
  const squareDiv = document.createElement("div");
  10;
  squareDiv.classList.add("gameboard-div");

  const displaySymbols = function () {
    Gameboard.gameboard.forEach((element, index) => {
      if (element === "x") {
        document.querySelectorAll(`[data-square-number]`)[index].textContent =
          "X";
      } else if (element === "o") {
        document.querySelectorAll(`[data-square-number]`)[index].textContent =
          "O";
      }
    });
  };
  const displayWin = function (curPlayer) {};
  const displayDraw = function () {};
  const displayNewTurn = function (nextPlayer) {};

  return { displaySymbols, displayDraw, displayWin, displayNewTurn };
})();

const GameController = (function () {
  const determineFirst = function () {
    return;
  };
  const setSquareSymbol = function (target) {
    if (Gameboard.gameboard[target.dataset.squareNumber] === undefined) {
      Gameboard.gameboard[target.dataset.squareNumber] =
        Gameboard.curPlayer.symbol;
    }
  };
  const exchangeSymbol = function () {
    //some code
  };

  const checkHorizontal = function (board) {
    const _board = board;
    for (let i = 0; i < 3; i++) {
      const _arr = [];
      for (let j = i * 3; j < i * 3 + 3; j++) {
        _arr.push(_board[j]);
      }
      if (_arr.every((el) => el === _arr[0])) {
        return true;
      }
    }
    return false;
  };

  const checkVertical = function (board) {
    const _board = board;
    for (let i = 0; i < 3; i++) {
      const _arr = [];
      // for (let j = i; j < i + 6; j + 3) {
      for (let j = i; j < i + 7; j += 3) {
        _arr.push(_board[j]);
      }
      console.log(_arr);
      if (_arr.every((el) => el === _arr[0])) {
        return true;
      }
    }
    return false;
  };

  const checkInverseDiagonal = function (board) {
    const _board = board;
    const _arr = [];
    for (let i = 2; i < 7; i += 2) {
      _arr.push(_board[i]);
    }
    if (_arr.every((el) => el === _arr[0])) {
      return true;
    }
    return false;
  };

  const checkDiagonal = function (board) {
    const _board = board;
    const _arr = [];
    for (let i = 0; i < 9; i += 4) {
      _arr.push(_board[i]);
    }
    if (_arr.every((el) => el === _arr[0])) {
      return true;
    }
    return false;
  };

  const checkForWin = function () {};
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("gameboard-square")) {
      setSquareSymbol(target);
    }
  });
  return {
    curRound,
    curPlayer,
    playerOnTurn: determineFirst,
    setSquareSymbol,
    exchangeSymbol,
    checkForWin,
    checkHorizontal,
    checkVertical,
    checkDiagonal,
    checkInverseDiagonal,
  };
})();

//before AI useless
/* const shapeChoice = function () {
  const choiceOButton = document.querySelector("choice-o-btn");
  const choiceXButton = document.querySelector("choice-x-btn");

  choiceOButton.addEventListener("click", function (e) {
    selectShape();
  });
  choiceXButton.addEventListener("click", function (e) {});

  const selectShape = function () {
    //Choose if player 1 (X) or player 2 (O)
  };
}; */
//DISABLED ATTRIBUTE FOR YOU WHEN PLAYING AI
