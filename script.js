class Satoshi {
    constructor(){
        this.idle_sprite = document.querySelector('#satoshi-idle');
        this.up_sprite = document.querySelector('#satoshi-up');
        this.exclamation = document.querySelector('#exclamation');
        this.status = 0;
    }

    nextStatus(){
        this.status++;
        this.status %= 3;
        this.setStatus(this.status);
    }

    setStatus(value){
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
        this.idle_sprite.style.display = idle ? 'block' : 'none';
        this.up_sprite.style.display = up ? 'block' : 'none';
        this.exclamation.style.display = exclamation ? 'block' : 'none';
    }

}

const satoshi = new Satoshi();

class Fishable {
    constructor(name, sprite){
        this.name = name;
        this.count = 0;
        this.sprite = sprite;
        this.setEnable(false);
    }

    setEnable(value) {
        this.sprite.style.display = value ? 'block' : 'none';
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

const sho = new Member('sho');
const aiba = new Member('aiba');
const nino = new Member('nino');
const jun = new Member('jun');

const lives = document.querySelectorAll(".life");
const fish = new Fish();
const scoreText = document.querySelector('.score');

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

function initGame(){
    title_start.style.display = 'block';
    lifeCount = 3;
    fishCount = 0;
    scoreText.innerHTML = "0";
    satoshi.setStatus(0);
}

function startGame(){
    setTitle(false, false, false);
}

function restartGame(){
    setTitle(false, false, false);
    initGame();
}

function setTitle(enabled, isStart, isGameover){
    title.style.display = enabled ? 'block' : 'none';
    title_start.style.display = isStart ? 'block' : 'none';
    title_gameover.style.display = isGameover? 'block' : 'none';
}

function onHitboxClick(){
    satoshi.nextStatus();
}

function onPageLoaded(){
    initGame();
    setTitle(true, true, false);
}

onPageLoaded();


