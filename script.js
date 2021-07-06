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

function clickFlower() {
    honeyCount++;
    console.log("honey count is " + honeyCount);
  }


//BEE MOVEMENT
let bee = document.querySelector('.bee');
let speed = 10;

window.addEventListener('load', () => {
    bee.style.position = 'absolute'; 
    bee.style.left = 0;
    bee.style.top = 0;
});

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            bee.style.left = parseInt(bee.style.left) - speed + 'px';
            break;
        case 'ArrowRight':
            bee.style.left = parseInt(bee.style.left) + speed + 'px';
            break;
        case 'ArrowUp':
            bee.style.top = parseInt(bee.style.top) - speed + 'px';
            break;
        case 'ArrowDown':
            bee.style.top = parseInt(bee.style.top) + speed + 'px';
            break;
    }
});