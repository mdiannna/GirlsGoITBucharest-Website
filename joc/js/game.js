function moveButterfly() {
	document.getElementById("sprite").style.left = "100px";
	document.getElementById("sprite").style.top = "100px";
}

var butterflyPositionTop;
var butterflyPositionLeft;
var STEP = 10;

function init() {
	butterflyPositionTop = 0;
	butterflyPositionLeft = 0;
}
init();

document.onkeydown = checkKey;


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        butterflyPositionTop -= STEP;
    }
    else if (e.keyCode == '40') {
        // down arrow
        butterflyPositionTop += STEP;
    }
    else if (e.keyCode == '37') {
       // left arrow
       butterflyPositionLeft -= STEP;
    }
    else if (e.keyCode == '39') {
       // right arrow
       butterflyPositionLeft += STEP;
    }

    document.getElementById("sprite").style.top = butterflyPositionTop + "px";
    document.getElementById("sprite").style.left = butterflyPositionLeft + "px";
    // document.getElementById("sprite").style.right = butterflyPositionright + "px";
    // document.getElementById("sprite").style.top = butterflyPositionTop + "px";
    fallCodeBlock();
}


function startFalling(myObject) {
	// 	myObject.style.top +=  i*10 + "px";
	// 	myObject.style.left +=  i*10 + "px";

}
function fallCodeBlock() {
	var codeBlocks = document.querySelectorAll(".codeBlock");
	for (var i=0; i<codeBlocks.length; i++) {
		// startFalling(codeBlocks[i]);
		codeBlocks[i].style.top += 150 * i + "px";
		codeBlocks[i].style.left += 200 * i + "px";
	}
}