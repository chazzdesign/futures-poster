let futures = ["bright", "hectic", "female", "dark"];
let pos = 0;

function init() {
	window.setInterval(function() {
		changeText()
	}, 1000);
}

function changeText() {
	pos++;
	if (pos == futures.length) pos = 0;
	document.getElementById("future").innerHTML = futures[pos];
}