// TODO: constants file separately
var STEP = 10;


var butterflyPositionTop;
var butterflyPositionLeft;


function init() {
	butterflyPositionTop = 0;
	butterflyPositionLeft = 0;
}

function moveSprite() {
	document.getElementById("sprite").style.left = "100px";
	document.getElementById("sprite").style.top = "100px";
}


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
    fallCodeBlock();
}


function fallCodeBlock() {
	var codeBlocks = document.querySelectorAll(".codeBlock");
	for (var i=0; i<codeBlocks.length; i++) {
		codeBlocks[i].style.top += 150 * i + "px";
		codeBlocks[i].style.left += 200 * i + "px";
	}
}


init();
document.onkeydown = checkKey;
