'use script'

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
}

window.onload = function () {
    var thirtySeconds = 30;
    display = document.querySelector('#time');
    startTimer(thirtySeconds, display);
};


//BEE & FLOWER SETUP
const bee = document.querySelector('.bee');
const speed = 60;

const cosmos = document.querySelector('.cosmos');
const pansy = document.querySelector('.pansy');
const poppy = document.querySelector('.poppy');

const hive = document.querySelector('.beehive-img');

const honeycombDisplay = document.querySelector('.honeycomb-display');



//HONEY COUNT & POLLEN TRACKING
let honeyCount = 0;
let beeHasPollen = false;

let cosmosHasPollen = true;
let pansyHasPollen = true;
let poppyHasPollen = true;


function ClickFlower() {
    honeyCount++;
    console.log("honey count is " + honeyCount);
  }

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
        //todo win condition
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
    bee.style.left = "15px";
    bee.style.top = "115px";
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
