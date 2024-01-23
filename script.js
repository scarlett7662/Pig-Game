'use strict';
let activePlayer = 0;
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
const min = 10;
const max = 13;
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Keep this method to use when press new game
const resetGame = function () {
  //hide the dice
  document.querySelector('.dice').classList.add('hidden');
  //score = 0
  const elements = document.querySelectorAll('.score');
  elements.forEach(function (element) {
    element.textContent = '0';
  });
  // current score = 0
  const cur_elements = document.querySelectorAll('.current-score');
  cur_elements.forEach(function (cur_element) {
    cur_element.textContent = '0';
  });
  activePlayer = 0;
  switchPlayer();
};

resetGame();
const startRoll = function () {
  //roll a random num
  let curDiceNum = Math.floor(Math.random() * 6) + 1;
  //show the dice pic of the num
  const curDicePicName = 'dice-' + curDiceNum + '.png';
  const curDicePic = document.querySelector('.dice');
  curDicePic.src = curDicePicName;
  curDicePic.classList.remove('hidden');
  return curDiceNum;
};

const updateScore = function (curActive, curDiceNum) {
  console.log(curActive);
  let curActiveID = '#current--' + curActive;
  //calcu current score + dice.
  const tempScore =
    Number(document.querySelector(curActiveID).textContent) +
    Number(curDiceNum);
  //update score: check if the dice is 1!
  if (curDiceNum == 1) {
    document.querySelector(curActiveID).textContent = 0;
    activePlayer = curActive == 1 ? 0 : 1;
  } else {
    setTimeout(function () {
      document.querySelector(curActiveID).textContent = tempScore;
    }, 500);
    //check if win:

    setTimeout(function () {
      if (tempScore >= min && tempScore < max) {
        let winner = `Player${curActive + 1}`;
        alert(winner + ' win!');
      } else if (tempScore >= max) {
        let loser = `Player${curActive + 1}`;
        alert(loser + ' lose!');
      }
    }, 800);
  }
};
//when press roll:
rollBtn.addEventListener('click', function () {
  let curDiceNum = startRoll();
  updateScore(activePlayer, curDiceNum);
});

// when press hold:
holdBtn.addEventListener('click', function () {
  activePlayer = activePlayer == 1 ? 0 : 1;
  updateScore(activePlayer, 0);
  switchPlayer();
});

// when press new game
newBtn.addEventListener('click', function () {
  resetGame();
});
