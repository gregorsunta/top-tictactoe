const Gameboard = (function () {
  let gameboard = new Array(9);
  const player1 = {
    symbol: "x",
  };
  const player2 = {
    symbol: "o",
  };
  let curRound = 1;
  let curPlayer;
  return { gameboard, player1, player2, curRound, curPlayer };
})();
const DisplayController = (function () {
  const squareDiv = document.createElement("div");
  squareDiv.classList.add("gameboard-div");

  const displaySymbols = function () {
    console.log(Gameboard.gameboard[0]);
    console.log(Gameboard.gameboard);
    console.log("it comes");
    Gameboard.gameboard.forEach((element, index) => {
      console.log(element);
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

document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("gameboard-square")) {
    gameFlow(target);
  }
});

const gameFlow = function (target) {
  if (Gameboard.curRound % 2 === 0) {
    Gameboard.curPlayer = Gameboard.player2;
  } else {
    Gameboard.curPlayer = Gameboard.player1;
  }
  Gameboard.gameboard[target.dataset.squareNumber] = Gameboard.curPlayer.symbol;

  DisplayController.displaySymbols();
  Gameboard.curRound++;
  console.log("after " + Gameboard.curRound);
};

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
