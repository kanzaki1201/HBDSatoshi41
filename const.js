const easyMinSpeed = 0.3;
const easyMaxSpeed = 0.3;
const easyMinCooldown = 2000; //should greater than missed/success/fail duraion
const easyMaxCooldown = 5000; //ms

const normalMinSpeed = 0.5;
const normalMaxSpeed = 0.9;
const normalMinCooldown = 3500; //should greater than missed/success/fail duraion
const normalMaxCooldown = 4500; //ms

const hardMinSpeed = 0.7;
const hardMaxSpeed = 0.9;
const hardMinCooldown = 3100; //should greater than missed/success/fail duraion
const hardMaxCooldown = 4000; //ms

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
