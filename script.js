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
    var thirtySeconds = 30,
        display = document.querySelector('#time');
    startTimer(thirtySeconds, display);
};

//HONEY COUNT
let honeyCount = 0;

function ClickFlower() {
    honeyCount++;
    console.log("honey count is " + honeyCount);
  }



//BEE & FLOWER SETUP
const bee = document.querySelector('.bee');
const speed = 50;
const cosmos = document.querySelector('.cosmos');


//BEE COLLISION WITH FLOWERS
function CheckDistance(flower) {
    let beeRect = bee.getBoundingClientRect();
    let beeHeight = (beeRect.bottom - beeRect.top) /2;
    let beeWidth = (beeRect.right - beeRect.left) /2;

    let beeX = beeRect.bottom - beeHeight;
    let beeY = beeRect.right - beeWidth;

    let flowerRect = flower.getBoundingClientRect();
    let flowerHeight = (flowerRect.bottom - flowerRect.top) /2;
    let flowerWidth = (flowerRect.right - flowerRect.left) /2;

    let flowerX = flowerRect.bottom - flowerHeight;
    let flowerY = flowerRect.right - flowerWidth;

    let distToFlower = GetDistance(beeX, beeY, flowerX, flowerY);

    if (distToFlower < 50) {
        console.log("they are overlapping: " + distToFlower);
    }
    else {
        console.log(distToFlower);
    }
}

function GetDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}



//BEE MOVEMENT, WASD
window.addEventListener('load', () => {
    bee.style.position = 'absolute'; 
    bee.style.left = "15px";
    bee.style.top = "115px";
});

window.addEventListener('keydown', (e) => {
    CheckDistance(cosmos);

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
});

//BEE MOVEMENT, arrow keys
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
