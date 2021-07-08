'use script'


//GAME SETUP
let beeIsLocked = true; //start page with bee unable to move, so user doesn't accidentally start the game before they know what it is
const bee = document.querySelector('.bee');
const notice = document.querySelector('.notice');
let gameHasStarted = false;

const speed = 40;

const cosmos = document.querySelector('.cosmos');
const pansy = document.querySelector('.pansy');
const poppy = document.querySelector('.poppy');

const hive = document.querySelector('.beehive-img');

const honeycombDisplay = document.querySelector('.honeycomb-display');

let inviteTimer = setInterval(BeeInvite, 5000);

function BeeInvite() {
    //"invite" the user to click the bee

    let buzzSound = new sound("Buzz3.mp3");
    buzzSound.play();

    if(window.scrollY <= 150){ //if we are scrolled near the top
        notice.src = "NoticeDn.png";
    }
    else {
        notice.src = "Notice.png";
    }

    notice.style.display = "inline";

    bee.style.animationPlayState = 'running';
        setTimeout(() => { 
            bee.style.animationPlayState = 'paused';
            notice.style.display = "none";
        ; }, 1500);

    console.log("bee has not been clicked");
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
   // this.sound.muted = "muted";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

function ClickBee() {
    //When the bee is clicked, the game begins!
    if (gameHasStarted == false) {
        console.log("beeclick!!");

        bee.style.animationPlayState = 'paused';
        bee.style.transform = "rotate(0deg)";
    
        let gameStart = new sound("GameStart.mp3");
        gameStart.play();

        beeIsLocked = false;

        //stop bee invite antics
        clearInterval(inviteTimer);

        //start the timer
        var sixtySeconds = 60;
        display = document.querySelector('#time');
        startTimer(sixtySeconds, display);


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
    gameHasStarted = true;
}


//TIMER
function startTimer(duration, display) {
    var timer = duration, seconds;
    
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0 && honeyCount < 3) {
            //lose :(
              
            let loseGame = new sound("Lose.mp3");
            loseGame.play();

            const instructionsKeyboard = document.querySelector('.content-game-keyboard')
            instructionsKeyboard.style.display = "none";
      
            const instructionsTouch = document.querySelector('.content-game-touch')
            instructionsTouch.style.display = "none";
     
            const winText = document.querySelector('.content-game-lose')
            winText.style.display = "block";

            timer = duration;
        }
        else if (--timer < 0) {
            timer = duration;
        }
        
    }, 1000);
    //todo: understand this function better - why does it start at 60, then 00, then back to 60 before the countdown begins?
};

window.onload = function () {
    BeeInvite();
};


//HONEY COUNT & POLLEN TRACKING
let honeyCount = 0;
let pollenCount = 0;

let cosmosHasPollen = true;
let pansyHasPollen = true;
let poppyHasPollen = true;

function IncrementHoneyCount(numberOfIncrements) {
    for (i = 0; i < numberOfIncrements; i++){
        honeyCount++;
    }
    pollenCount = 0;

    console.log("honeycount is " + honeyCount);

    if (honeyCount == 1){
        honeycombDisplay.src="Honey1.png";

        let addHoney = new sound("Honey1.mp3");
        addHoney.play();
    }
    else if (honeyCount == 2){
        honeycombDisplay.src="Honey2.png";

        let addHoney = new sound("Honey2.mp3");
        addHoney.play();
    }
    else if (honeyCount == 3){
        //win!
        honeycombDisplay.src="Honey3.png";
        
        let addHoney = new sound("HoneyWin.mp3");
        addHoney.play();
        const instructionsKeyboard = document.querySelector('.content-game-keyboard')
        instructionsKeyboard.style.display = "none";
  
        const instructionsTouch = document.querySelector('.content-game-touch')
        instructionsTouch.style.display = "none";
 
        const winText = document.querySelector('.content-game-win')
        winText.style.display = "block";
   
    }
}


//BEE COLLISION WITH FLOWERS/HIVE
function CheckDistance(destination) {
    let beeRect = bee.getBoundingClientRect();
    let beeHeight = (beeRect.bottom - beeRect.top) /2;
    let beeWidth = (beeRect.right - beeRect.left) /2;

    let beeX = beeRect.bottom - beeHeight;
    let beeY = beeRect.right - beeWidth;

    let destRect = destination.getBoundingClientRect();
    let destHeight = (destRect.bottom - destRect.top) /2;
    let destWidth = (destRect.right - destRect.left) /2;

    let destX = destRect.bottom - destHeight;
    let destY = destRect.right - destWidth;

    let distToDest = GetDistance(beeX, beeY, destX, destY);

    if (distToDest < 50) {
        if (destination == cosmos && cosmosHasPollen){
            let pollenCollect = new sound("Pollen.mp3");
            pollenCollect.play();

            cosmosHasPollen = false;
            pollenCount++;
        } 
        else if (destination == pansy && pansyHasPollen){
            let pollenCollect = new sound("Pollen.mp3");
            pollenCollect.play();

            pansyHasPollen = false;
            pollenCount++;
        } 
        else if (destination == poppy && poppyHasPollen) { 
            let pollenCollect = new sound("Pollen.mp3");
            pollenCollect.play();

            poppyHasPollen = false;
            pollenCount++;
        }
        else if (destination == hive && pollenCount > 0) {
            IncrementHoneyCount(pollenCount);
        }
    }
}

var isInViewport = function (elem) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= -50 &&
		distance.left >= -50 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth )
	);
};


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
    if (!beeIsLocked)
    {
    let left = bee.style.left;
    let top = bee.style.top;

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

    if (isInViewport(bee) == false) {
        bee.style.left = left;
        bee.style.top = top;
    }
    
    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    
    CheckDistance(cosmos);
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);
    }
});

//BEE MOVEMENT, tap arrow keys version (touchscreen)
function MoveLeft(){
    let left = bee.style.left;
    let top = bee.style.top;

    bee.style.left = parseInt(bee.style.left) - speed + 'px';
    bee.style.transform = "rotate(-90deg)";


    CheckDistance(cosmos);
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);

    if (isInViewport(bee) == false) {
        bee.style.left = left;
        bee.style.top = top;
    }

    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
}

function MoveRight(){
    let left = bee.style.left;
    let top = bee.style.top;

    bee.style.left = parseInt(bee.style.left) + speed + 'px';
    bee.style.transform = "rotate(90deg)";

    CheckDistance(cosmos);
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);

    if (isInViewport(bee) == false) {
        bee.style.left = left;
        bee.style.top = top;
    }

    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
}

function MoveUp(){
    let left = bee.style.left;
    let top = bee.style.top;

    bee.style.top = parseInt(bee.style.top) - speed + 'px';
    bee.style.transform = "rotate(0deg)";

    CheckDistance(cosmos);
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);

    if (isInViewport(bee) == false) {
        bee.style.left = left;
        bee.style.top = top;
    }

    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
}

function MoveDown(){
    let left = bee.style.left;
    let top = bee.style.top;

    bee.style.top = parseInt(bee.style.top) + speed + 'px';
    bee.style.transform = "rotate(180deg)";

    CheckDistance(cosmos);
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);

    if (isInViewport(bee) == false) {
        bee.style.left = left;
        bee.style.top = top;
    }

    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
}