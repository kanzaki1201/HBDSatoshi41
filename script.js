const members = document.querySelectorAll('.member');
const satoshi_idle = document.querySelector('#satoshi-idle')
const satoshi_up = document.querySelector('#satoshi-up')
const sho = document.querySelector("#sho");
const aiba = document.querySelector("#aiba");
const nino = document.querySelector("#nino");
const jun = document.querySelector("#jun");
const lives = document.querySelectorAll(".life");

let isIdle = true;
let lifeCount = 3;

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

function setMember(member_name, enable){
    let display_mode = enable ? 'block' : 'none';
    switch(member_name){
        case "sho":
            sho.style.display = display_mode;
            break;

        case "aiba":
            aiba.style.display = display_mode;
            break;

        case "nino":
            nino.style.display = display_mode;
            break;

        case "jun":
            jun.style.display = display_mode;
            break;

    }
}

function init(){

}

setIdle(true);