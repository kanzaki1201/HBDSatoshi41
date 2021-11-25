const GameStatus = Object.freeze({
    'justLoaded': 1,
    'startTitle': 2,
    'idle':3,
    'caught': 4,
    'battle': 5,
    'upSucess': 6,
    'upFail': 7,
    'gameover': 8
})

class Sprite {
    constructor(sprite){
       this.sprite = sprite; 
    }
    setEnable(value){
        this.sprite.style.display = value ? 'block' : 'none';
    }
}
class Satoshi {
    constructor(){
        this.idle_sprite = new Sprite(document.querySelector('#satoshi-idle'));
        this.up_sprite = new Sprite(document.querySelector('#satoshi-up'));
        this.exclamation = new Sprite(document.querySelector('#exclamation'));
        this.status = 0;
    }

    setSpriteStatus(value){
        value %= 3;
        switch(value){
            case 0:
                this.setSprite(true, false, false);
                break;
            case 1: 
                this.setSprite(true, false, true);
                break;
            case 2:
                this.setSprite(false, true, false);
                break;
        }
    }

    setSprite(idle, up, exclamation){
        this.idle_sprite.setEnable(idle);
        this.up_sprite.setEnable(up);
        this.exclamation.setEnable(exclamation);
    }

}


class Fishable extends Sprite{
    constructor(name, sprite){
        super(sprite);
        this.name = name;
        this.count = 0;
        this.setEnable(false);
    }

    // setEnable(value) {
    //     this.sprite.style.display = value ? 'block' : 'none';
    // }
}
class Member extends Fishable {
    constructor(name) {
        let sprite = document.querySelector('#'+name);
        super(name, sprite);
        this.countText = document.querySelector('#'+name+'-count');
        this.countText.innerHTML = "X0";
    }
}

class Fish extends Fishable {
    constructor(){
        let sprite = document.querySelector('.fish');
        super('fish', sprite);
    }
}

class Ripple extends Sprite {
    constructor(speed){
        let sprite = document.querySelector('.ripple');
        super(sprite);
        this.speed = speed;
        this.setEnable(false);
        this.initX();
    }

    initX(){
        let rect = this.sprite.getBoundingClientRect();
        this.sprite.style.left = -1 * rect.width + 'px';
    }

    moveX(){
        let rect = this.sprite.getBoundingClientRect();
        let gameRect = gameArea.getBoundingClientRect();
        let newLeft = (rect.left + this.speed * (1000/60));
        if(newLeft > gameRect.right) newLeft = -1 * rect.width;
        
        this.sprite.style.left = newLeft + 'px';
        return;
    }
}

const satoshi = new Satoshi();
const sho = new Member('sho');
const aiba = new Member('aiba');
const nino = new Member('nino');
const jun = new Member('jun');

const lives = document.querySelectorAll(".life");
const fish = new Fish();
const ripple = new Ripple(.1);
const scoreText = document.querySelector('.score');
const gameArea = document.querySelector('#game');

const title = document.querySelector('.title');
const title_start = document.querySelector(".start");
const title_gameover = document.querySelector(".gameover");

let isIdle = true;
let lifeCount = 3;
let fishCount = 0;
let members = [sho, aiba, nino, jun];

function setLife(value){
    for (let i = 0; i < lives.length; i++) {
       if(i+1 <= value){
           lives[i].style.display = 'block';
       } 
       else{
           lives[i].style.display = 'none';
       }
    }
}

function setIdle(value) {
    isIdle = value;
    if(isIdle){
        satoshi_idle.style.display = 'block';
        satoshi_up.style.display = 'none';
    }
    else{
        satoshi_up.style.display = 'block';
        satoshi_idle.style.display = 'none';
    }
}

function resetGameValues(){
    lifeCount = 3;
    fishCount = 0;
    scoreText.innerHTML = "0";
    satoshi.setSpriteStatus(0);
}

function startGame(){
    if (gameStatus != GameStatus.startTitle) return;
    setTitle(false, false, false);
    gameStatus = GameStatus.idle;
}

function restartGame(){
    setTitle(false, false, false);
    resetGameValues();
    gameStatus = GameStatus.idle;
}

function setTitle(enabled, isStart, isGameover){
    title.style.display = enabled ? 'block' : 'none';
    title_start.style.display = isStart ? 'block' : 'none';
    title_gameover.style.display = isGameover? 'block' : 'none';
}


function onHitboxClick(){
    if(gameStatus != GameStatus.battle) return;
    satoshi.nextStatus();
}

function doIdle(){
    ripple.setEnable(true);
    ripple.moveX();

}

function mainLoop(){
    switch(gameStatus){
        case GameStatus.justLoaded:
            resetGameValues();
            setTitle(true, true, false);
            gameStatus = GameStatus.startTitle;
            break;
        case GameStatus.startTitle:
            setTitle(true, true, false);
            break;
        case GameStatus.idle:
            doIdle();
            break;
        case GameStatus.caught:
            break;
        case GameStatus.battle:
            break;
        case GameStatus.upSucess:
            break;
        case GameStatus.upFail:
            break;
        case GameStatus.gameover:
            setTitle(true, false, true);
            break;
    }
}

let gameStatus = GameStatus.justLoaded;
document.addEventListener('DOMContentLoaded', () => {
    setInterval(mainLoop, 1000/60);
});

