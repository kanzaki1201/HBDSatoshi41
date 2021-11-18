const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000; //ms
let score = 0;
let countdown;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time)
}

function startGame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeOut = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            countdownBoard.textContent = 'Times up!';
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

function whack(e){
    score++;
    this.style.backgroundImage = "url('assets/yoda2.png')";
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = "url('assets/yoda1.png')";
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));

