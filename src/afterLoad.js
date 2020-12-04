function tabToggle(buttonName) {
	otherButton = buttonName == "about" ? "help" : "about"
	var button = document.getElementById(buttonName);
	var other = document.getElementById(otherButton);

	if (other.classList.contains("toggle"))
		other.classList.toggle("toggle")
	button.classList.toggle("toggle")
}

function walletCheck() {
	var x = document.getElementById("ether");
	x.classList.toggle("toggle");
}
walletCheck()

//opens full screen and other functions
async function startMotivation() {
	console.log("inside start motivation")

	openFullScreen();
	console.log("after full screen")
	deposit();
	console.log("after deposit")
	startTimer();
	console.log("after timer start")
}
