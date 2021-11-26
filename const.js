const easyMinSpeed = 0.25;
const easyMaxSpeed = 0.65;
const easyMinCooldown = 2000; //should greater than missed/success/fail duraion
const easyMaxCooldown = 3500; //ms

const normalMinSpeed = 0.6;
const normalMaxSpeed = 1.1;
const normalMinCooldown = 2000; //should greater than missed/success/fail duraion
const normalMaxCooldown = 3500; //ms

const hardMinSpeed = 0.9;
const hardMaxSpeed = 1.5;
const hardMinCooldown = 2000; //should greater than missed/success/fail duraion
const hardMaxCooldown = 3500; //ms

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
