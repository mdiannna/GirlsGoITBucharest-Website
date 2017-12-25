function moveButterfly() {
	document.getElementById("butterfly").style.left = "100px";
	document.getElementById("butterfly").style.top = "100px";
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

    document.getElementById("butterfly").style.top = butterflyPositionTop + "px";
    document.getElementById("butterfly").style.left = butterflyPositionLeft + "px";
    // document.getElementById("butterfly").style.right = butterflyPositionright + "px";
    // document.getElementById("butterfly").style.top = butterflyPositionTop + "px";
    fallCodeBlock();
}


function fallCodeBlock() {
	var codeBlocks = document.querySelectorAll(".codeBlock");
	for (var i=0; i<codeBlocks.length; i++) {
		codeBlocks[i].style.top += 150 * i + "px";
		codeBlocks[i].style.left += 200 * i + "px";
	}
}