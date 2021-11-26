const easyMinSpeed = 0.3;
const easyMaxSpeed = 0.9;
const easyMinCooldown = 4000; //should greater than missed/success/fail duraion
const easyMaxCooldown = 5000; //ms

const nomralMinSpeed = 0.5;
const nomralMaxSpeed = 0.9;
const nomralMinCooldown = 3500; //should greater than missed/success/fail duraion
const nomralMaxCooldown = 5000; //ms

const hardMinSpeed = 0.7;
const hardMaxSpeed = 0.9;
const hardMinCooldown = 3100; //should greater than missed/success/fail duraion
const hardMaxCooldown = 5000; //ms

const missedDuration = 2000; 
const upFailDuration = 2000;
const upSuccessDuration = 2000;
const battleDuration = 1000;
const successTap = 5;
const fishChance = 0.5;
const fishScoreMultiplier = 10;
const memberScoreMultiplier = 100;

const GameStatus = Object.freeze({
    'justLoaded': 1,
    'startTitle': 2,
    'idle':3,
    'missed': 4,
    'battle': 5,
    'upSucess': 6,
    'upFail': 7,
    'gameover': 8
})
