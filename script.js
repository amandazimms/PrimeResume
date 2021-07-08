'use script'

//GAME SETUP
let beeIsLocked = true; //start page with bee unable to move, so user doesn't accidentally start the game before they know what it is
const bee = document.querySelector('.bee');
const beeImg = document.querySelector('.bee-img');

const notice = document.querySelector('.notice');
let gameHasStarted = false;

const speed = 40; //how many pixels the bee moves per tap/keypress

const cosmos = document.querySelector('.cosmos');
const pansy = document.querySelector('.pansy');
const poppy = document.querySelector('.poppy'); //todo: if adding more flowers, make this more general

const hive = document.querySelector('.beehive-img');

const honeycombDisplay = document.querySelector('.honeycomb-display');

let inviteTimer = setInterval(BeeInvite, 5000);


window.onload = function () { //runs when page loads
    BeeInvite();
};

window.addEventListener('load', () => {
    bee.style.position = 'absolute'; 
    bee.style.left = "10px";
    bee.style.top = "86px";
});


function BeeInvite() {
    //"invite" the user to click the bee with various pokes n prods. Runs every 5s

    //play buzz sound
    let buzzSound = new sound("Buzz3.mp3");
    buzzSound.play(); 

    //show speech bubble 'click me'
    if(window.scrollY <= 150){ //if we are scrolled near the top
        notice.src = "NoticeDn.png";
    }
    else {
        notice.src = "Notice.png";
    }
    notice.style.display = "inline";

    //wiggle bee back and forth (then stop doing this)
    bee.style.animationPlayState = 'running';
        setTimeout(() => { 
            bee.style.animationPlayState = 'paused';
            notice.style.display = "none";
        ; }, 1500);
}

//sound setup - borrowed from google
function sound(src) {
    //note: console does not like that this doesn't contain a mute function. todo: learn about this! 
    this.sound = document.createElement("audio");
    this.sound.src = src;
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


function ClickBee() { //When the bee is clicked, the game begins!
    if (gameHasStarted == false) { //prevent game from restarting if user clicks bee during game

        //stop doing bee wiggle and try to reset rotation, though that didn't seem to work reliably
        bee.style.animationPlayState = 'paused';
        bee.style.transform = "rotate(0deg)";

        //stop bee invite antics
        clearInterval(inviteTimer);
    
        //game start sound
        let gameStart = new sound("GameStart.mp3");
        gameStart.play();

        //unlock movement of bee
        beeIsLocked = false;

        //start the game timer
        var oneHundredSeconds = 100;
        display = document.querySelector('#time');
        Countdown(oneHundredSeconds, display);

        //all devices: display the nav bar
        const navBar = document.querySelector('.nav-bar');
        navBar.style.display = "flex";
    
        //if it's a touchscreen, also display the touch instructions content, and game-bar (which contains the arrow-button controls)
        let x = window.matchMedia("(hover: none)")
        if (x.matches) {
            const gameBar = document.querySelector('.game-bar');
            gameBar.style.display = "block";

            const gameBarBottom = document.querySelector('.game-bar-bottom');
            gameBarBottom.style.display = "block";

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


//COUNTDOWN
function Countdown(startingInt) {
    
    let countingDown = setInterval(function () {
        
        startingInt--;
        display.textContent = startingInt;

        if (startingInt == 0 && honeyCount < 3) {
            //lose :(
              
            let loseGame = new sound("Lose.mp3"); //play sfx
            loseGame.play();

            //hide game instructions (keyboard)
            const instructionsKeyboard = document.querySelector('.content-game-keyboard')
            instructionsKeyboard.style.display = "none";
      
            //hide game instructions (mobile)
            const instructionsTouch = document.querySelector('.content-game-touch')
            instructionsTouch.style.display = "none";
     
            //display lose message
            const winText = document.querySelector('.content-game-lose')
            winText.style.display = "block";

            //scroll to lose message so user knows they lost :(
            var element_to_scroll_to = document.getElementById('GameInstructions');
            element_to_scroll_to.scrollIntoView();
           
            clearInterval(countingDown); //todo need to wrap my head around how we can use a var within its own definition. seems neater to pull the previous several lines of 'lose' conditions into their own function, but then would need a global variable for the timer. 
        }
        else if (startingInt == 0) {
            clearInterval(countingDown);
        }
        
    }, 1000); //< 1000ms = 1 second
};




//HONEY COUNT & POLLEN TRACKING
let honeyCount = 0; //how much honey has bee saved (converted from pollen trips back to hive)
let pollenCount = 0; //how much pollen has bee collected (flowers visited)

let cosmosHasPollen = true;
let pansyHasPollen = true;
let poppyHasPollen = true; //todo: if adding more flowers, need to make this more general

function IncrementHoneyCount(numberOfIncrements) { //update game's knowledge of how much honey the bee has saved. Need numberOfIncrements because I decided we can visit 2+ flowers in one trip and bring multiple pollens back for multiple honeys.
    for (i = 0; i < numberOfIncrements; i++){
        honeyCount++;
    }
    pollenCount = 0; //since all pollen turned into honey or however that works exactly for bees :)

    if (honeyCount == 1){
        honeycombDisplay.src="Honey1.png"; //update graphic on nav bar

        let addHoney = new sound("Honey1.mp3"); //play sfx
        addHoney.play();
    }
    else if (honeyCount == 2){
        honeycombDisplay.src="Honey2.png"; //update graphic on nav bar

        let addHoney = new sound("Honey2.mp3"); //play sfx
        addHoney.play();
    }
    else if (honeyCount == 3){
        //win!
        honeycombDisplay.src="Honey3.png"; //update graphic on nav bar
        
        let addHoney = new sound("HoneyWin.mp3"); //play sfx
        addHoney.play();

        Win();
    }
    else {
        //pollen count was 0, so honey count 0, so do nothing
    }
}

function Win() 
{
    //hide the game instructions (keyboard)
    const instructionsKeyboard = document.querySelector('.content-game-keyboard')
    instructionsKeyboard.style.display = "none";

    //hide the game instructions (mobile)
    const instructionsTouch = document.querySelector('.content-game-touch')
    instructionsTouch.style.display = "none";

    //display win message (note we don't need to scroll to it since you need to be at hive to win, which is next to the message already)
    const winText = document.querySelector('.content-game-win')
    winText.style.display = "block";
}

//BEE COLLISION WITH FLOWERS/HIVE
function CheckDistance(destination) { //checks if bee is 'touching' flower or hive (or could use for any other destination)
    //get bee data
    let beeRect = bee.getBoundingClientRect();
    let beeHeight = (beeRect.bottom - beeRect.top) /2;
    let beeWidth = (beeRect.right - beeRect.left) /2;

    let beeX = beeRect.bottom - beeHeight;
    let beeY = beeRect.right - beeWidth;

    //get data for the object we're checking
    let destRect = destination.getBoundingClientRect();
    let destHeight = (destRect.bottom - destRect.top) /2;
    let destWidth = (destRect.right - destRect.left) /2;

    let destX = destRect.bottom - destHeight;
    let destY = destRect.right - destWidth;

    //distance between the two
    let distToDest = GetDistance(beeX, beeY, destX, destY);

    //if we're "close enough" - looks like we're touching
    if (distToDest < 50) {
        if (destination == cosmos && cosmosHasPollen){ //if it's a flower ready to be pollinated
            let pollenCollect = new sound("Pollen.mp3"); //play sfx
            pollenCollect.play();

            cosmosHasPollen = false; //can't double pollinate
            pollenCount++; //increase count so game knows how much pollen bee has
        } 
        else if (destination == pansy && pansyHasPollen){ //if it's a flower ready to be pollinated
            let pollenCollect = new sound("Pollen.mp3");
            pollenCollect.play();

            pansyHasPollen = false; //can't double pollinate
            pollenCount++; //increase count so game knows how much pollen bee has
        } 
        else if (destination == poppy && poppyHasPollen) { //if it's a flower ready to be pollinated
            let pollenCollect = new sound("Pollen.mp3");
            pollenCollect.play(); //increase count so game knows how much pollen bee has

            poppyHasPollen = false; //can't double pollinate
            pollenCount++; //increase count so game knows how much pollen bee has
        }
        else if (destination == hive && pollenCount > 0) { //if we touched the HIVE rather than a flower...
            IncrementHoneyCount(pollenCount); //turn the pollen into honey
        }
    }
}

var isInViewport = function (elem) { //check to see if an item (we will use it for bee) is within view
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= -50 && //this allows the edge of the bee to be slightly out of view where it mattered most: when touching hive and leftmost flowers. 
		distance.left >= -50 && //...which worked well because the issues if we didn't use this function all involved right side and bottom.
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth )
	);
};


function GetDistance(x1, y1, x2, y2){ //distance between two points. Thanks Pythagoras
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}



//BEE MOVEMENT, WASD version (keyboard)
window.addEventListener('keydown', (e) => { //if a key is pressed
    if (!beeIsLocked) //if bee is 'allowed' to move (user has clicked it, so instructions have displayed)
    {
    let left = bee.style.left; //record the current positions, we might need them later
    let top = bee.style.top; //record the current positions, we might need them later

    switch(e.key) { 
        case 'a': //if A (= left)
            bee.style.left = parseInt(bee.style.left) - speed + 'px'; //move left
            bee.style.transform = "rotate(-90deg)"; //make bee face left
            break;
        case 'd': //if D (= right)
            bee.style.left = parseInt(bee.style.left) + speed + 'px'; //move right
            bee.style.transform = "rotate(90deg)"; //make bee face right
            break;
        case 'w': //if W (= up)
            bee.style.top = parseInt(bee.style.top) - speed + 'px'; //move up
            bee.style.transform = "rotate(0deg)"; //make bee face up
            break;
        case 's': //if S (= down)
            bee.style.top = parseInt(bee.style.top) + speed + 'px'; //move down
            bee.style.transform = "rotate(180deg)"; //make bee face down
            break;
    }

    if (isInViewport(bee) == false) { //at this point bee is already in new position, which might be 'illegal' (outside the bounds of view). We use this function to check if it is...
        bee.style.left = left; //if it was outside, reset to earlier position
        bee.style.top = top; //if it was outside, reset to earlier position
    }

    SwitchBeeImage(); //with every move, we make the image alternate sorta like an animation

    bee.scrollIntoView({behavior: "smooth", block: "center", inline: "center"}); //make the view scroll to the bee's new position
    
    CheckDistance(cosmos); //check distance to all these things. todo: if adding more flowers, make this more general
    CheckDistance(poppy);
    CheckDistance(pansy);
    CheckDistance(hive);
    }
});

//BEE MOVEMENT, tap arrow keys version (touchscreen)
//note that we shouldn't need to check for isBeeLocked for touchscreen as the only way to move only appears after she's unlocked
function MoveLeft(){ //this works the same* as keyboard movement except that it gets called from the arrow images being tapped rather than keyboard.
    
    //*todo the biggest thing to fix with this is the mobile 'game' experience, which is currently torturous and buggy. I spent too long tweaking it with dev tools and realized too late it performs 
    //... much differently on an actual phone. The main issue seems to be that it wants to zoom in on some taps, seems like particularly taps near the edge of the viewport, so would start there with debugging.

    SwitchBeeImage();

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
    SwitchBeeImage();

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
    SwitchBeeImage();

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
    SwitchBeeImage();

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

let beeImageCounter = 0;

function SwitchBeeImage(){ //pseudo animation that switches the bee's image to wings up or down with each press. If you move fast enough it looks p cool.
    //note that this gets called with every movement click/press

    beeImageCounter++;

    if (beeImageCounter == 0){
        beeImg.src="BeeUp.png";
    } 
    else if (beeImageCounter == 1){
        beeImg.src="BeeDown.png"
    }
    else if (beeImageCounter == 2) { //we only want it to use 0 or 1, so if we reach 2, reset to 0. 
        beeImg.src="BeeUp.png";
        beeImageCounter = 0;
    }
    beeImg.style.width = "170px"; //the BeeUp and BeeDown images turned out to be wider than the normal resting bee that loads with the page, so this makes them more similar looking

}