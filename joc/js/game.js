// TODO: constants file separately

var spritePositionTop = 0;
var spritePositionLeft = 0;
var codeBlocksTop = [];
var codeBlocksLeft = [];

    

var sprite;

var STEP = 20;




window.onload = function() 
{
     var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;



function createSprite() 
{
    sprite = document.createElement("div");
    sprite.id = "sprite";
    spriteImage = document.createElement("img");
    spriteImage.setAttribute("src", "img/ninjagirl/Idle__004.png");
    sprite.appendChild(spriteImage);
}

function showSprite() 
{
    document.body.appendChild(sprite);
}

function createObstacle() {
    var obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.position = "absolute";
    obstacle.style.top = Math.floor(Math.random() * height) + "px";
    obstacle.style.left = Math.floor(Math.random() * width) + "px";

    obstacleImage = document.createElement("img");
    obstacleImage.setAttribute("src", "img/obstacles/obstacle1.png");
    obstacle.appendChild(obstacleImage);   

    return obstacle;
}

function showObject(obj) {
    document.body.appendChild(obj);   
}







    createSprite();

    // setTimeout(showSprite, 2000);
    showSprite();
    obstacle = createObstacle();
    showObject(obstacle);
    
    obstacle = createObstacle();
    showObject(obstacle);

    obstacle = createObstacle();
    showObject(obstacle);

    function init() {
    	spritePositionTop = 0;
    	spritePositionLeft = 0;

        var codeBlocks = document.querySelectorAll(".codeBlock");
        for (var i=0; i<codeBlocks.length; i++) {
            codeBlocksTop[i] = 0;
            codeBlocksTop[i] = 0;
        }
        
    }

    function moveSprite() {
    	document.getElementById("sprite").style.left = "100px";
    	document.getElementById("sprite").style.top = "100px";
    }

   
    window.onkeypress=function(e){
   
        // e = e || window.event;

        // if (e.keyCode == '38' && spritePositionTop-STEP >0) {
        if (e.keyCode == '119' && spritePositionTop-STEP >0) {
            // up arrow
            spritePositionTop -= STEP;
        }
        // else if (e.keyCode == '40'  && spritePositionTop < height) {
        else if (e.keyCode == '115'  && spritePositionTop < height) {
            // down arrow
            spritePositionTop += STEP;
        }
        // else if (e.keyCode == '37' && spritePositionLeft-STEP > 0) {
        else if (e.keyCode == '97' && spritePositionLeft-STEP > 0) {
           // left arrow
           spritePositionLeft -= STEP;
        }
        // else if (e.keyCode == '39' && spritePositionLeft < width) {
        else if (e.keyCode == '100' && spritePositionLeft < width) {
           // right arrow
           spritePositionLeft += STEP;
        }
    }


    function fallCodeBlock() {
    	var codeBlocks = document.querySelectorAll(".codeBlock");
    	for (var i=0; i<codeBlocks.length; i++) {
    		codeBlocksTop[i] += 150 * i;
    		codeBlocksLeft[i] += 200 * i;
    	}
    }


    init();
    fallCodeBlock();

    function update() {
         var codeBlocks = document.querySelectorAll(".codeBlock");
        
        document.getElementById("sprite").style.top = spritePositionTop + "px";
        document.getElementById("sprite").style.left = spritePositionLeft + "px";
        
        console.log(spritePositionTop + " , ");
        console.log(spritePositionLeft);
      
    }               


    setInterval(update, 10);
}