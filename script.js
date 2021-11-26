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

let minSpeed = easyMinSpeed;
let maxSpeed = easyMaxSpeed;
let minCooldown = easyMinCooldown;
let maxCooldown = easyMaxCooldown;

let fishCount = 0;
let tapCount = 0;
let battleTimer = 0;
let fishedItem = fish;

function resetGameValues(){
    scoreText.innerHTML = "0";
    satoshi.idle();
    ripple.resetX();
    lifeCounter.setLife(3);
    fish.setCount(0);
    members.forEach(member => {
        member.setCount(0);
    })
}

function setDifficulty(difficulty){
    switch (difficulty){
        case 0:
            minSpeed = easyMinSpeed;
            maxSpeed = easyMaxSpeed;
            minCooldown = easyMinCooldown;
            maxCooldown = easyMaxCooldown;
            break;
        case 1:
            minSpeed = normalMinSpeed;
            maxSpeed = normalMaxSpeed;
            minCooldown = normalMinCooldown;
            maxCooldown = normalMaxCooldown;
            break;
        case 2:
            minSpeed = hardMinSpeed;
            maxSpeed = hardMaxSpeed;
            minCooldown = hardMinCooldown;
            maxCooldown = hardMaxCooldown;
            break;
    }

}

function startGame(difficulty){
    if (gameStatus != GameStatus.startTitle) return;
    setTitle(false, false, false);
    gameStatus = GameStatus.idle;
    ripple.resetX(); 
    setDifficulty(difficulty);
    title.style.zIndex = 99; 
}

function restartGame(difficulty){
    setTitle(false, false, false);
    resetGameValues();
    gameStatus = GameStatus.idle;
    setDifficulty(difficulty);
}

function setTitle(enabled, isStart, isGameover){
    title.style.display = enabled ? 'block' : 'none';
    title_start.style.display = isStart ? 'grid' : 'none';
    title_gameover.style.display = isGameover? 'grid' : 'none';
}


function onHitboxClick(){
    switch(gameStatus){
        case GameStatus.idle:
            if(ripple.isOutOfScreen()) return;
            if(!satoshi.rippleAABB(ripple)){
                doUpFail();
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

function doMissed(){
    lifeCounter.decrementLife();
    gameStatus = GameStatus.missed;
    ripple.resetX();
    console.log('missed');
    setTimeout( () => {
        if(lifeCounter.lifeCount <= 0){
            console.log('gameover');
            gameStatus = GameStatus.gameover;
            return;
        }
        gameStatus = GameStatus.idle;
    }, missedDuration);
}

function doUpFail(){
    lifeCounter.decrementLife();
    gameStatus = GameStatus.upFail;
    ripple.resetX();
    console.log('fail');
    setTimeout( () => {
        if(lifeCounter.lifeCount <= 0){
            console.log('gameover');
            gameStatus = GameStatus.gameover;
            return;
        }
        gameStatus = GameStatus.idle;
    }, upFailDuration);
}

function doUpSuccess(){
    console.log('success');
    gameStatus = GameStatus.upSucess;
    ripple.resetX();
    pickFishedItem();
    fishedItem.incrementCount();
    showFishedItemOnly();
    calculateScore();
    setTimeout( () => {
        gameStatus = GameStatus.idle;
        fishedItem.setEnable(false);
        // ripple.setEnable(true);
    }, upSuccessDuration);
}

function calculateScore(){
    let score = 0;
    members.forEach(member => {
        score += member.count * memberScoreMultiplier;
    })
    score += fish.count * fishScoreMultiplier;
    scoreText.innerHTML = score;
}

function pickFishedItem(){
    let rnd = Math.random();
    if(rnd < fishChance){
        fishedItem = fish;
    }
    else{
        rnd = Math.floor(Math.random() * 3);
        fishedItem = members[rnd];
    }
    console.log('picked ' + fishedItem.name);
}

function showFishedItemOnly(){
    fish.setEnable(false);
    members.forEach(member => member.setEnable(false));
    fishedItem.setEnable(true);
}

function updateIdle(){
    satoshi.idle();
    if(ripple.update()){
        doMissed();
    }
}

function updateBattle(){
    satoshi.battle();
    battleTimer += 1000/60.0;
    if(battleTimer < battleDuration && tapCount >= successTap){
        doUpSuccess();
        return;
    }
    if(battleTimer > battleDuration){
        battleTimer = 0;
        doUpFail();
    }
    
}

function updateMissed(){
    satoshi.missed();
}

function updateUpFail(){
    satoshi.upFail();
}

function updateUpSucess(){
    satoshi.upSucess();
    fishedItem.setEnable(true);
}

function mainLoop(){
    switch(gameStatus){
        case GameStatus.justLoaded:
            console.log('loaded');
            resetGameValues();
            setTitle(true, true, false);
            title.style.zIndex = 999;
            gameStatus = GameStatus.startTitle;
            break;
        case GameStatus.startTitle:
            setTitle(true, true, false);
            break;
        case GameStatus.idle:
            updateIdle();
            break;
        case GameStatus.missed:
            updateMissed();
            break;
        case GameStatus.battle:
            updateBattle();
            break;
        case GameStatus.upSucess:
            updateUpSucess();
            break;
        case GameStatus.upFail:
            updateUpFail();
            break;
        case GameStatus.gameover:
            setTitle(true, false, true);
            break;
    }
}

let gameStatus = GameStatus.justLoaded;
setInterval(mainLoop, 1000/60.0); //1000ms/60 = 60fps

