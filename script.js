const Gameboard = (function () {
  let gameboard = new Array(9);
  const player1 = {
    symbol: "x",
  };
  const player2 = {
    symbol: "o",
  };
  const players = [player1, player2];
  return { gameboard, player1, player2, players };
})();

const DisplayController = (function () {
  const squareDiv = document.createElement("div");
  10;
  squareDiv.classList.add("gameboard-div");

  const toggleBoard = function () {
    if (
      document.querySelector(".board-container").getAttribute("hidden") === ""
    ) {
      document.querySelector(".board-container").removeAttribute("hidden");
    } else {
      document.querySelector(".board-container").setAttribute("hidden", "");
    }
  };
  const toggleNameInput = function () {
    if (
      document.querySelector(".nameinput-container").getAttribute("hidden") ===
      ""
    ) {
      document.querySelector(".nameinput-container").removeAttribute("hidden");
    } else {
      document.querySelector(".nameinput-container").setAttribute("hidden", "");
    }
  };
  const toggleGameButtons = function () {
    if (
      document.querySelector(".btns-container").getAttribute("hidden") === ""
    ) {
      document.querySelector(".btns-container").removeAttribute("hidden");
    } else {
      document.querySelector(".btns-container").setAttribute("hidden", "");
    }
  };
  const displaySymbols = function (board) {
    board.forEach((element, index) => {
      document.querySelectorAll(`[data-square-number]`)[index].textContent =
        element;
    });
  };
  const displayWinner = function (winner) {
    Gameboard.players.forEach((el, index) => {
      if (el.symbol === winner) {
        document.querySelector(".popup").textContent =
          Gameboard.players[index].name;
      }
    });
  };
  const displayDraw = function () {};

  const displayNewTurn = function (nextPlayer) {};

  return {
    toggleBoard,
    toggleNameInput,
    toggleGameButtons,
    displaySymbols,
    displayDraw,
    displayWin: displayWinner,
    displayNewTurn,
  };
})();

const GameController = (function () {
  let boardIsActive = true;
  let _winner = null;
  let _curPlayer = Gameboard.player1; //I should look into _variables
  let _board = Gameboard.gameboard;

  document.addEventListener("click", function (e) {
    const _target = e.target;
    e.preventDefault();
    if (_target.classList.contains("gameboard-square") && boardIsActive) {
      console.log("clicked");
      onTurn(_target);
    } else if (_target.classList.contains("btn-restart")) {
      resetGame();
      DisplayController.displaySymbols(_board);
    } else if (_target.classList.contains("blur")) {
      togglePopup();
    } else if (_target.classList.contains("player-getnames-btn")) {
      getNames();
      DisplayController.toggleNameInput();
      DisplayController.toggleBoard();
      DisplayController.toggleGameButtons();
    }
  });

  const getNames = function () {
    //I should get this looped - two or more elements with same class and do this thing automated
    const playerOneName = document.querySelector("#player-one-name").value;
    const playerTwoName = document.querySelector("#player-two-name").value;
    Gameboard.player1.name = playerOneName;
    Gameboard.player2.name = playerTwoName;
  };

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
    const gameboard = document.querySelectorAll(`[data-square-number]`);
    gameboard.forEach((element) => (element.textContent = ""));
    boardIsActive = true;
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
        boardIsActive = false;
        togglePopup();
        DisplayController.displayWin(_winner);
      } else if (checkForDraw(_board)) {
        boardIsActive = false;
        togglePopup();
        DisplayController.displayDraw();
      } else {
        changeTurn();
      }
    }
  };

  return {
    boardIsActive,
    changeTurn,
    onTurn,
    setSquareSymbol,
    exchangeSymbol,
    checkForWin,
    checkHorizontal,
    checkVertical,
    checkDiagonal,
    checkInverseDiagonal,
    togglePopup,
  };
})();
