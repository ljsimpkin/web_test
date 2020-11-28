/*
Javascript timer
*/

function startTimer(){

  var timer = timeText.value;

  function myTimer()
  {
    //set minutes and seconds variables based on timer input
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;

    //add 0 to always show 2 digits, need to convert to string
    if (minutes < 10){
      minutes = "0".concat(String(minutes));
    }
    if (seconds < 10) {
      seconds = "0".concat(String(seconds));
    }

    document.getElementById("minutesDisplay").innerHTML = minutes;
    document.getElementById("secondsDisplay").innerHTML = seconds;
    timer -= 1;

    if (timer < 0){
      clearInterval(stopTimer);
      document.getElementById("startButton").innerHTML = "Start";
    }

    if( window.innerHeight != screen.height) {
      clearInterval(stopTimer);
      document.getElementById("minutesDisplay").innerHTML = "00";
      document.getElementById("secondsDisplay").innerHTML = "00";
      document.getElementById("startButton").innerHTML = "Start";
    }
  }
  var stopTimer = setInterval(myTimer, 1000);

}

var elem = document.documentElement;

//opens full screen and other functions
function startMotivation() {
  startTimer();
  document.getElementById("startButton").innerHTML = "Processing...";
  if (elem.requestFullscreen) {
    elem.requestFullscreen().then(deposit());
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen().then(deposit());
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }

  withdraw();
}
