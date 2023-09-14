'use strict';

//Selecting elements
const player0L = document.querySelector('.player--0');
const player1L = document.querySelector('.player--1');

const score0L = document.querySelector('#score--0');
const score1L = document.querySelector('#score--1');

const current0L = document.querySelector('#current--0');
const current1L = document.querySelector('#current--1');

const diceL = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

//declaring
let scores, currentScore, activePlayer, playing;

//initilization
const init = function () {
  //Giving score 0 to each players
  //Starting conditions
  score0L.textContent = 0;
  score1L.textContent = 0;

  //Big scores are stored as arrays
  scores = [0, 0];

  //current score
  currentScore = 0;
  activePlayer = 0;

  //am i playing
  playing = true;

  //making currentscore 0
  current0L.textContent = 0;
  current1L.textContent = 0;

  //adding hidden class for dice pngs
  diceL.classList.add('hidden');

  //removimg color
  player0L.classList.remove('player--winner');
  player1L.classList.remove('player--winner');

  //activating player 0
  player0L.classList.add('player--active');

  //removing plater 1
  player1L.classList.remove('player--winner');
};

//run the init function for the first time
init();

//function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Make current score also 0
  currentScore = 0;

  //If active player is 0 then switch to 1
  //If active player is 1 then switch to 0
  activePlayer = activePlayer === 0 ? 1 : 0;

  //toggle add the class if its not there
  //removes if it is there
  player0L.classList.toggle('player--active');
  player1L.classList.toggle('player--active');
};

//Roling
btnRoll.addEventListener('click', function () {
  //if playing is false then this will not work
  if (playing) {
    //Roll a dice, creat new veriable which holds 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    diceL.classList.remove('hidden');

    //src is source file of png
    diceL.src = `dice-${dice}.png`;

    //Add current score
    if (dice !== 1) {
      currentScore += dice;

      //Dynamicly selecting the active player ID name
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //if 1 change player
    } else {
      switchPlayer();
    }
  }
});

//to hold the value if player holds it
btnHold.addEventListener('click', function () {
  //if playing do it
  if (playing) {
    //to add score to currentPyayer score
    //Score[1] = score[1]+currentScore [array]
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player score is >=100
    //finish game
    if (scores[activePlayer] >= 100) {
      //game should stop
      playing = false;

      //to hide the dice
      diceL.classList.add('hidden');

      //Add color to winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //toggling should no happen so remove it if the player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      //switch the next player
      switchPlayer();
    }
  }
});

//new game
btnNew.addEventListener('click', init);
