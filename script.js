const GameStatus = Object.freeze({
    'justLoaded': 1,
    'startTitle': 2,
    'idle':3,
    // 'caught': 4,
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
    getRect(){
        return this.sprite.getBoundingClientRect();
    }
}
class Satoshi {
    constructor(){
        this.idle_sprite = new Sprite(document.querySelector('#satoshi-idle'));
        this.up_sprite = new Sprite(document.querySelector('#satoshi-up'));
        this.exclamation = new Sprite(document.querySelector('#exclamation'));
    }

    setSprite(idle, up, exclamation){
        this.idle_sprite.setEnable(idle);
        this.up_sprite.setEnable(up);
        this.exclamation.setEnable(exclamation);
    }

    rippleAABB(ripple){
        let rippleRect = ripple.getRect();
        let satoshiRect = satoshi.idle_sprite.getRect();
        let rippleCenter = (rippleRect.left + rippleRect.right) * 0.5;
        let satoshiCenter = (satoshiRect.left + satoshiRect.right) * 0.5;
        if(rippleRect.left > satoshiRect.right 
            || rippleCenter < satoshiCenter) return false;
        return true;
    }

    idle(){
        this.setSprite(true, false, this.rippleAABB(ripple));
    }

    battle(){
        this.setSprite(true, false, true);
    }

    upFail(){
        this.setSprite(false, true, false);
    }

    upSucess(){
        this.setSprite(false, true, false);
    }

}


class Fishable extends Sprite{
    constructor(name, sprite){
        super(sprite);
        this.name = name;
        this.count = 0;
        this.setEnable(false);
    }
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
        this.resetX();
    }

    isOutOfScreen(){
        let gameRect = gameArea.getBoundingClientRect();
        let rect = this.getRect();
        if(rect.left > gameRect.right || rect.right < gameRect.left) return true;
        return false;
    }

    resetX(){
        let rect = this.getRect();
        this.sprite.style.left = -1 * rect.width + 'px';
    }

    moveX(){
        let rect = this.getRect();
        let gameRect = gameArea.getBoundingClientRect();
        let newLeft = (rect.left + this.speed * (1000/60.0));
        if(newLeft > gameRect.right) {
            newLeft = -1 * rect.width;
        }
        
        this.sprite.style.left = newLeft + 'px';
        return;
    }
}

class LifeCounter {
    constructor(){
        this.lifeCount = 3;
        this.lifeSprites = [
            new Sprite(document.querySelector('#life0')),
            new Sprite(document.querySelector('#life1')),
            new Sprite(document.querySelector('#life2')),
        ];
    }

    setLife(val){
        val %= 4;
        this.lifeCount = val;
        for (let index = 0; index < this.lifeSprites.length; index++) {
            this.lifeSprites[index].setEnable(index + 1 <= val);
        }
    }

    decrementLife(){
        this.lifeCount = Math.max(this.lifeCount-1, 0);
        this.setLife(this.lifeCount);
    }
}

const satoshi = new Satoshi();
const sho = new Member('sho');
const aiba = new Member('aiba');
const nino = new Member('nino');
const jun = new Member('jun');
const members = [sho, aiba, nino, jun];

const fish = new Fish();
const ripple = new Ripple(.1);
const lifeCounter = new LifeCounter();

const scoreText = document.querySelector('.score');
const gameArea = document.querySelector('#game');

const title = document.querySelector('.title');
const title_start = document.querySelector(".start");
const title_gameover = document.querySelector(".gameover");

let fishCount = 0;
let tapCount = 0;
let battleTimer = 0;

const upFailTime = 3000; //ms
const upSucessTime = 3000;
const battleTime = 3000;
const successTap = 3;

function resetGameValues(){
    scoreText.innerHTML = "0";
    satoshi.idle();
    ripple.resetX();
    lifeCounter.setLife(3);
}

function startGame(){
    if (gameStatus != GameStatus.startTitle) return;
    setTitle(false, false, false);
    gameStatus = GameStatus.idle;
    ripple.setEnable(true);
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
    switch(gameStatus){
        case GameStatus.idle:
            if(ripple.isOutOfScreen()) return;
            if(!satoshi.rippleAABB(ripple)){
                doFail();
                return;
            }
            console.log('to battle');
            gameStatus = GameStatus.battle;
            battleTimer = 0;
            tapCount = 0;
            break;
        case GameStatus.battle:
            console.log('battle click');
            tapCount++;
            break;
    }
}

function doFail(){
    lifeCounter.decrementLife();
    if(lifeCounter.lifeCount <= 0){
        console.log('gameover');
        gameStatus = GameStatus.gameover;
        return;
    }
    gameStatus = GameStatus.upFail;
    ripple.resetX();
    ripple.setEnable(false);
    console.log('fail');
    setTimeout( () => {
        gameStatus = GameStatus.idle;
    }, upFailTime);
}

function doSuccess(){
    console.log('success');
    gameStatus = GameStatus.upSucess;
    ripple.resetX();
    ripple.setEnable(false);
    setTimeout( () => {
        gameStatus = GameStatus.idle;
        ripple.setEnable(true);
    }, upSucessTime);
}

function updateIdle(){
    ripple.setEnable(true);
    ripple.moveX();
    satoshi.idle();
}

function updateBattle(){
    satoshi.battle();
    battleTimer += 1000/60.0;
    if(battleTimer < battleTime && tapCount >= successTap){
        doSuccess();
        return;
    }
    if(battleTimer > battleTime){
        battleTimer = 0;
        doFail();
    }
    
}

function mainLoop(){
    switch(gameStatus){
        case GameStatus.justLoaded:
            console.log('loaded');
            resetGameValues();
            setTitle(true, true, false);
            gameStatus = GameStatus.startTitle;
            break;
        case GameStatus.startTitle:
            setTitle(true, true, false);
            break;
        case GameStatus.idle:
            updateIdle();
            break;
        // case GameStatus.caught:
        //     break;
        case GameStatus.battle:
            updateBattle();
            break;
        case GameStatus.upSucess:
            satoshi.upSucess();
            break;
        case GameStatus.upFail:
            satoshi.upFail();
            break;
        case GameStatus.gameover:
            setTitle(true, false, true);
            break;
    }
}

let gameStatus = GameStatus.justLoaded;
setInterval(mainLoop, 1000/60.0); //1000ms/60 = 60fps

