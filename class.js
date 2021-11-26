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
        this.fail = new Sprite(document.querySelector('#satoshi-fail'));
    }

    setSprite(idle, up, exclamation, fail){
        this.idle_sprite.setEnable(idle);
        this.up_sprite.setEnable(up);
        this.exclamation.setEnable(exclamation);
        this.fail.setEnable(fail);
    }

    rippleAABB(ripple){
        let rippleRect = ripple.getRect();
        let satoshiRect = satoshi.idle_sprite.getRect();
        let rippleCenter = (rippleRect.left + rippleRect.right) * 0.5;
        let satoshiCenter = (satoshiRect.left + satoshiRect.right) * 0.5;
        if(rippleRect.left > satoshiRect.right 
            || rippleRect.right < satoshiCenter) return false;
        return true;
    }

    idle(){
        this.setSprite(true, false, this.rippleAABB(ripple), false);
    }

    battle(){
        this.setSprite(true, false, true, false);
    }

    missed(){
        this.setSprite(false, false, false, true);
    }

    upFail(){
        this.setSprite(false, false, false, true);
    }

    upSucess(){
        this.setSprite(false, true, false, false);
    }

}


class Fishable extends Sprite{
    constructor(name, sprite){
        super(sprite);
        this.name = name;
        this.count = 0;
        this.setEnable(false);
    }

    setCount(val){
        this.count = val;
    }

    incrementCount(){
        this.setCount(this.count+1);
    }
}
class Member extends Fishable {
    constructor(name) {
        let sprite = document.querySelector('#'+name);
        super(name, sprite);
        this.name = name;
        this.icon = document.querySelector('#'+name+'-icon');
        this.countText = document.querySelector('#'+name+'-count');
        this.countText.innerHTML = "x0";
    }

    setCount(val){
        super.setCount(val);
        this.countText.innerHTML = 'x' + this.count;
        if(val > 0) {
            this.icon.style.backgroundImage = "url('assets/" + this.name + "-icon.png')"; 
        }
        else{
            this.icon.style.backgroundImage = "url('assets/hidden-icon.png')";
        }
    }

    incrementCount(){
        this.setCount(this.count+1);
    }
}

class Fish extends Fishable {
    constructor(){
        let sprite = document.querySelector('.fish');
        super('fish', sprite);
    }
}

class Ripple extends Sprite {
    constructor(){
        let sprite = document.querySelector('.ripple');
        super(sprite);
        this.setEnable(false);
        let rect = this.getRect();
        this.sprite.style.left = -1 * rect.width + 'px';
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
        this.startCooldown();
    }

    startCooldown(){
        this.setEnable(false);
        this.onCooldown = true;
        this.timer = 0;
        this.cooldown = Math.random() * (maxCooldown - minCooldown) + minCooldown;
        this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    }
    
    moveX(){
        let rect = this.getRect();
        let gameRect = gameArea.getBoundingClientRect();
        let newLeft = (rect.left + this.speed * (1000/60.0));
        let hasWrapped = false;
        if(newLeft > gameRect.right) {
            newLeft = -1 * rect.width;
            hasWrapped = true;
        }
        
        this.sprite.style.left = newLeft + 'px';
        return hasWrapped;
    }

    update(){
        if(this.onCooldown) {
            this.timer += 1000/60.0;
            if(this.timer > this.cooldown){
                this.onCooldown = false;
                this.setEnable(true);
                return false;
            }
            return false;
        }
        return this.moveX();
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