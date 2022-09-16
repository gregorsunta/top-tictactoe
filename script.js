const Gameboard = (function () {
  let gameboard = new Array(9);
  return { gameboard };
})();

const createPLayer = function (symbol) {
  this.symbol = symbol;
  return { symbol };
};

const player1 = createPLayer("X");
const player2 = createPLayer("O");

const flowController = function (squareIndex) {
  let round = 1;
  if (round % 2 !== 0) {
    //squareNum.set symbol to player1.symbol
  } else if (round % 2 === 0 && round !== 0) {
    0;
    //squareNum.set symbol to player2.symbol
  }
  round++;
};
