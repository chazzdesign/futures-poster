let futures = ["bright", "hectic", "female", "dark"];
let backgrounds = ["#1A8CDE", "#73D16F", "#F46F44"];
let pos = 0;
let background = 0;

function init() {
	window.setInterval(function() {
		changeText()
	}, 5000);
}

function changeText() {
	pos++;
	background++;
	if (pos == futures.length) pos = 0;
	if (background == backgrounds.length) background = 0;
	document.getElementById("future").innerHTML = futures[pos];
	document.getElementById("body").style.backgroundColor = backgrounds[background];

}
