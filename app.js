/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls  dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls double 1, all his scores gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the point that they write wins the game

  */
var scores;
var roundScore;
var activePlayer;
var gamePlaying;
var val;

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // how to make random number
        var dice = Math.floor(Math.random() * 6) + 1;
        // display dice.png
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        console.log(dice);
        // Make Second random number( without function both random number looks like the same)
        function diceSecond() {
            dice1 = Math.floor(Math.random() * 6) + 1;
            // display Second dice.png
            var dice1DOM = document.querySelector('.dice1');
            dice1DOM.style.display = 'block';
            dice1DOM.src = 'dice-' + dice1 + '.png';
            console.log(dice1);
        }
        diceSecond();
        //double 6
        if (dice === 1 && dice1 === 1) {
            zero();
        } else {
            //ad score
            roundScore = dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add Current Score to global Score
        scores[activePlayer] += roundScore;
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= val) {
            document.querySelector('#name-' + activePlayer).textContent = 'winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});

function zero() {
    scores = [0, 0];
    roundScore = 0;
    if (activePlayer == 1) {
        activePlayer = 0;
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');

    } else {
        activePlayer = 1;
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.remove('active');

    }
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#score-' + activePlayer).textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    console.log(activePlayer);
}

function nextPlayer() {
    //nextplayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function handleForm() {
    //e.preventDefault();
    var _val = document.getElementById('number').value
    console.log('result', _val);
    val = _val;
    init();
    return false

}

console.log(activePlayer);