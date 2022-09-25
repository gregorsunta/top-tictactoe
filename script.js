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

  const displaySymbols = function (board) {
    board.forEach((element, index) => {
      document.querySelectorAll(`[data-square-number]`)[index].textContent =
        element;
    });
  };
  const displayWin = function (winner) {
    console.log("THe winner is: " + winner);
  };
  const displayDraw = function () {};
  const displayNewTurn = function (nextPlayer) {};

  return { displaySymbols, displayDraw, displayWin, displayNewTurn };
})();

const GameController = (function () {
  let _boardIsActive = true;
  let _winner = null;
  let _curPlayer = Gameboard.player1; //I should look into _variables
  let _board = Gameboard.gameboard;

  const determineFirst = function () {
    _curPlayer = Gameboard.player1;
  };

  document.addEventListener("click", function (e) {
    const _target = e.target;

    if (_target.classList.contains("gameboard-square") && _boardIsActive) {
      GameController.onTurn(_target);
    } else if (_target.classList.contains("btn-restart")) {
      resetGame();
      DisplayController.displaySymbols(_board);
    } else if (_target.classList.contains("blur")) {
      togglePopup();
    } else {
    }
  });

  const changeTurn = function () {
    if (_curPlayer === Gameboard.player1) {
      _curPlayer = Gameboard.player2;
    } else if (_curPlayer === Gameboard.player2) {
      _curPlayer = Gameboard.player1;
    } else {
      console.log("There is a problem at changeTurn!");
    }
  };

  const setSquareSymbol = function (board, curPlayer, target) {
    if (board[target.dataset.squareNumber] === undefined) {
      board[target.dataset.squareNumber] = curPlayer.symbol;
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
      if (_arr.every((el) => el === _arr[0] && el !== undefined)) {
        _winner = _arr[0];

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
        _winner = _arr[0];

        _arr.push(_board[j]);
      }
      if (_arr.every((el) => el === _arr[0] && el !== undefined)) {
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
    if (_arr.every((el) => el === _arr[0] && el !== undefined)) {
      _winner = _arr[0];

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
    if (_arr.every((el) => el === _arr[0] && el !== undefined)) {
      _winner = _arr[0];

      return true;
    }
    return false;
  };

  const checkForWin = function (board) {
    if (
      checkDiagonal(board) ||
      checkHorizontal(board) ||
      checkVertical(board) ||
      checkInverseDiagonal(board)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkForDraw = function (board) {
    if (!board.includes(undefined)) {
      return true;
    }
    return false;
  };

  const resetGame = function () {
    _board = new Array(9);
    _boardIsActive = true;
    const gameboard = document.querySelectorAll(`[data-square-number]`);
    gameboard.forEach((element, index) => (element.textContent = ""));
  };

  const togglePopup = function (msg) {
    const popupContainer = document.querySelector(".popup-container");
    if (popupContainer.getAttribute("hidden") === "") {
      popupContainer.removeAttribute("hidden");
    } else {
      popupContainer.setAttribute("hidden", "");
    }
  };

  const onTurn = function (target) {
    const _target = target;
    if (_target.textContent === "") {
      setSquareSymbol(_board, _curPlayer, _target);
      DisplayController.displaySymbols(_board);
      if (checkForWin(_board)) {
        _boardIsActive = false;
        togglePopup();
        DisplayController.displayWin(_winner);
      } else if (checkForDraw(_board)) {
        _boardIsActive = false;
        togglePopup();
        DisplayController.displayDraw();
      } else {
        GameController.changeTurn();
      }
    }
  };

  return {
    changeTurn,
    onTurn,
    setSquareSymbol,
    exchangeSymbol,
    checkForWin,
    checkHorizontal,
    checkVertical,
    checkDiagonal,
    checkInverseDiagonal,
  };
})();
