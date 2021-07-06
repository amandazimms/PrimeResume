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