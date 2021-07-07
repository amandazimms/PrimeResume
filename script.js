'use script'


//BEE & FLOWER SETUP
const bee = document.querySelector('.bee');
const speed = 60;

const cosmos = document.querySelector('.cosmos');
const pansy = document.querySelector('.pansy');
const poppy = document.querySelector('.poppy');

const hive = document.querySelector('.beehive-img');

const honeycombDisplay = document.querySelector('.honeycomb-display');

let inviteTimer = setInterval(BeeInvite, 3000);

function BeeInvite() {

    bee.style.animationPlayState = 'running';
        setTimeout(() => { 
            bee.style.animationPlayState = 'paused';
        ; }, 800);

    console.log("bee has not been clicked");
}

function ClickBee() {
    //When the bee is clicked, the game begins!
    console.log("beeclick!!");
    clearInterval(inviteTimer);

    //all devices: display the nav bar
    const navBar = document.querySelector('.nav-bar');
    navBar.style.display = "flex";
    
    //if it's a touchscreen, also display the touch instructions content, and game-bar (which contains the arrow-button controls)
    let x = window.matchMedia("(hover: none)")
    if (x.matches) {
        const gameBar = document.querySelector('.game-bar');
        gameBar.style.display = "block";

        const instructionsTouch = document.querySelector('.content-game-touch')
        instructionsTouch.style.display = "inline-block";
    }

    //if it's keyboard, also display the keyboard instructions content
    else {
        const instructionsKeyboard = document.querySelector('.content-game-keyboard')
        instructionsKeyboard.style.display = "inline-block";
    }

}


//TIMER
function startTimer(duration, display) {
    var timer = duration, seconds;
    
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
    //todo: understand this function better - why does it start at 60, then 00, then back to 60 before the countdown begins?
};

window.onload = function () {
    var sixtySeconds = 60;
    display = document.querySelector('#time');
    startTimer(sixtySeconds, display);

    BeeInvite();
};


//HONEY COUNT & POLLEN TRACKING
let honeyCount = 0;
let beeHasPollen = false;

let cosmosHasPollen = true;
let pansyHasPollen = true;
let poppyHasPollen = true;

function IncrementHoneyCount() {
    honeyCount++
    if (honeyCount == 1){
        honeycombDisplay.src="Honey1.png";
    }
    else if (honeyCount == 2){
        honeycombDisplay.src="Honey2.png";
    }
    else if (honeyCount == 3){
        honeycombDisplay.src="Honey3.png";
        //todo add win condition
    }
}


//BEE COLLISION WITH FLOWERS
function CheckDistance(destination) {
    let beeRect = bee.getBoundingClientRect();
    let beeHeight = (beeRect.bottom - beeRect.top) /2;
    let beeWidth = (beeRect.right - beeRect.left) /2;

    let beeX = beeRect.bottom - beeHeight;
    let beeY = beeRect.right - beeWidth;

    let destRect = destination.getBoundingClientRect();
    let destHeight = (destRect.bottom - destRect.top) /2;
    let flowerWidth = (destRect.right - destRect.left) /2;

    let destX = destRect.bottom - destHeight;
    let destY = destRect.right - flowerWidth;

    let distToDest = GetDistance(beeX, beeY, destX, destY);

    if (distToDest < 50) {
        if (destination == cosmos && cosmosHasPollen){
            cosmosHasPollen = false;
            beeHasPollen = true;
        } 
        else if (destination == pansy && pansyHasPollen){
            pansyHasPollen = false;
            beeHasPollen = true;
        } 
        else if (destination == poppy && poppyHasPollen) {       
            poppyHasPollen = false;
            beeHasPollen = true;
        }
        else if (destination == hive && beeHasPollen) {
            beeHasPollen = false;
            IncrementHoneyCount();
            console.log("honeycount is " + honeyCount);
        }
    }
}

function GetDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}



//BEE MOVEMENT, WASD version (keyboard)
window.addEventListener('load', () => {
    bee.style.position = 'absolute'; 
    bee.style.left = "10px";
    bee.style.top = "86px";
});

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'a':
            bee.style.left = parseInt(bee.style.left) - speed + 'px';
            bee.style.transform = "rotate(-90deg)";
            break;
        case 'd':
            bee.style.left = parseInt(bee.style.left) + speed + 'px';
            bee.style.transform = "rotate(90deg)";
            break;
        case 'w':
            bee.style.top = parseInt(bee.style.top) - speed + 'px';
            bee.style.transform = "rotate(0deg)";
            break;
        case 's':
            bee.style.top = parseInt(bee.style.top) + speed + 'px';
            bee.style.transform = "rotate(180deg)";
            break;
    }
    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    
    CheckDistance(cosmos);
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);


});

//BEE MOVEMENT, tap arrow keys version (touchscreen)
function Move()
{
    CheckDistance(cosmos);
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);
    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
}
function MoveLeft(){
    bee.style.left = parseInt(bee.style.left) - speed + 'px';
    bee.style.transform = "rotate(-90deg)";
}

function MoveRight(){
    bee.style.left = parseInt(bee.style.left) + speed + 'px';
    bee.style.transform = "rotate(90deg)";
}

function MoveUp(){
    bee.style.top = parseInt(bee.style.top) - speed + 'px';
    bee.style.transform = "rotate(0deg)";
}

function MoveDown(){
    bee.style.top = parseInt(bee.style.top) + speed + 'px';
    bee.style.transform = "rotate(180deg)";
}
