const easyMinSpeed = 0.15;
const easyMaxSpeed = 0.35;
const easyMinCooldown = 2000; //should greater than missed/success/fail duraion
const easyMaxCooldown = 3000; //ms

const normalMinSpeed = 0.2;
const normalMaxSpeed = 0.77;
const normalMinCooldown = 2000; //should greater than missed/success/fail duraion
const normalMaxCooldown = 3000; //ms

const hardMinSpeed = 0.4;
const hardMaxSpeed = 0.9;
const hardMinCooldown = 2000; //should greater than missed/success/fail duraion
const hardMaxCooldown = 3000; //ms

const missedDuration = 1500; 
const upFailDuration = 1500;
const upSuccessDuration = 1500;
const battleDuration = 1;
const successTap = 0;
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
