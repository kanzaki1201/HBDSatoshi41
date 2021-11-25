const satoshi_idle = document.querySelector('#satoshi-idle')
const satoshi_up = document.querySelector('#satoshi-up')
const lives = document.querySelectorAll(".life");

class Member {
    constructor(name) {
        this.name = name;
        this.count = 0;
        this.sprite = document.querySelector('#'+name);
        this.countText = document.querySelectorAll('#'+name+'-count');
    }

    setEnable(value) {
        this.sprite.style.display = value ? 'block' : 'none';
    }
}

const sho = new Member('sho');
const aiba = new Member('aiba');
const nino = new Member('nino');
const jun = new Member('jun');

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

function init(){

}

setIdle(true);
members.forEach(member => {
    member.setEnable(false);
})