/*
Javascript timer
*/


// function startTimer2(){
//   time = parseInt(document.getElementById("timeText").value)
//   // unlockTime = time + (getTime()/1000)

//   var d1 = new Date();
//   var d1t0 = d1.getTime()/1000;
//   d1t0 = parseInt(d1t0);

//   var unlockDate = d1t0 + time;

//   function printCountDown(unlockDate){

//     var d1 = new Date();
//     var d1t0 = d1.getTime()/1000;
//     d1t0 = parseInt(d1t0);

//     // if (unlockDate - d1t0 < 0 ){
//     //   clearInterval(stopTimer);
//     // }

//     console.log(unlockDate - d1t0)
//   }


//   var stopTimer = setInterval(printCountDown(unlockDate), 1000);

//   console.log(d1t0)
// }

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

function openFullScreen(){
  // document.getElementById("startButton").innerHTML = "Processing...";
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
// .then(deposit());

function closeFullScreen() {
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