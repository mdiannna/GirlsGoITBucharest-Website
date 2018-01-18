// TODO: constants file separately

var spritePositionTop = 0;
var spritePositionLeft = 0;
var codeBlocksTop = [];
var codeBlocksLeft = [];

    
var SPRITE_HEIGHT;
var SPRITE_WIDTH;
var OBSTACLE_HEIGHT = 70;
var OBSTACLE_WIDTH = 100;
var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var OBSTACLE_FREQUENCY= 120;
var OBSTACLE_SPEED_INTERVAL =100;

var obstacles = [];

var sprite;

var STEP = 20;
var OBSTACLE_STEP = 10;


    var colision = {
        detectColision: function(object, sprite) {
            var objLeft = parseInt(object.style.left.replace("px", ""));
            var objTop = parseInt(object.style.top.replace("px", ""));
            var objWidth = OBSTACLE_WIDTH;
            var objHeight =OBSTACLE_HEIGHT;
            var spriteLeft = parseInt(sprite.style.left.replace("px", ""));
            var spriteTop = parseInt(sprite.style.top.replace("px", ""));
            var spriteWidth = SPRITE_WIDTH;
            var spriteHeight = SPRITE_HEIGHT;

            if ( objLeft< spriteLeft + spriteWidth &&
                objLeft + objWidth > spriteLeft &&
                objTop < spriteTop + spriteHeight &&
                objHeight + objTop > spriteTop) {
                return true;
            }
            return false;
        }
    }

window.onload = function() 
{
    WINDOW_WIDTH = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

     WINDOW_HEIGHT = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;



    var game = {

        createSprite: function() 
        {
            sprite = document.createElement("div");
            sprite.id = "sprite";
            spriteImage = document.createElement("img");
            spriteImage.setAttribute("src", "img/ninjagirl/Idle__004.png");
            sprite.appendChild(spriteImage);
        },

        showSprite: function() 
        {
            document.body.appendChild(sprite);
        },
     
        createObstacle: function() {
            var obstacle = document.createElement("div");
            obstacle.classList.add("obstacle");
            obstacle.style.position = "absolute";
            obstacle.style.top = Math.floor(Math.random() * WINDOW_HEIGHT) + "px";
            obstacle.style.left = Math.floor(Math.random() * WINDOW_WIDTH) + "px";
            obstacle.style.width = OBSTACLE_WIDTH + "px";
            obstacleImage = document.createElement("img");
            obstacleImage.setAttribute("src", "img/obstacles/obstacle1.png");
            obstacle.appendChild(obstacleImage);   
            obstacle.lastColisioned = false;

            return obstacle;
        },

        showObject: function(obj) {
            document.body.appendChild(obj);   
        },

        showSprite:function() 
        {
            document.body.appendChild(sprite);
        },

        createObstacle: function() {
            var obstacle = document.createElement("div");
            obstacle.classList.add("obstacle");
            obstacle.style.position = "absolute";

            var obstacleTopValue = -100;
            var obstacleLeftValue = Math.floor(Math.random() * WINDOW_WIDTH)

            obstacle.style.top = obstacleTopValue + "px";
            obstacle.style.left = obstacleLeftValue + "px";
            obstacle.top = obstacleTopValue;
            obstacle.left = obstacleLeftValue;

            obstacleImage = document.createElement("img");
            obstacleImage.setAttribute("src", "img/obstacles/obstacle1.png");
            obstacle.appendChild(obstacleImage);   

            obstacles.push(obstacle);

            return obstacle;
        },

        showObject: function(obj) {
            document.body.appendChild(obj);   
        },

       

    };


     function moveObstacle(obj, interval) {
            if(colision.detectColision(obj, sprite) == true) {
                if(obj.lastColisioned==false) {
                    alert("Colision detected!");    
                    obj.lastColisioned = true;
                }
            } else {
                obj.lastColisioned = false;
            }

            if(obj.top == WINDOW_HEIGHT) {
                clearInterval(interval);
            }
            // else
            obj.top += OBSTACLE_STEP;
            obj.style.top = obj.top + "px";

        }


    game.createSprite();
    // setTimeout(showSprite, 2000);
    game.showSprite();


    SPRITE_HEIGHT = parseInt(window.getComputedStyle(sprite).height.replace("px", ""));
    SPRITE_WIDTH = parseInt(window.getComputedStyle(sprite).width.replace("px", ""));
    
    // var obstacle1 = game.createObstacle();
    // game.showObject(obstacle1);
    // setInterval(moveObstacle, 100, obstacle1, this);
    
    // var obstacle2 = game.createObstacle();
    // game.showObject(obstacle2);
    // // moveObstacle(obstacle);
    // setInterval(moveObstacle, 100, obstacle2, this);

    var obstacle = game.createObstacle();
    game.showObject(obstacle);
    setInterval(moveObstacle, 100, obstacle, this);

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
    
        
        if (e.keyCode == '119' && spritePositionTop-STEP >0) {
            // up arrow
            spritePositionTop -= STEP;
        }
        // else if (e.keyCode == '40'  && spritePositionTop < WINDOW_HEIGHT) {
        else if (e.keyCode == '115'  && spritePositionTop+SPRITE_HEIGHT < WINDOW_HEIGHT) {
            // down arrow
            spritePositionTop += STEP;
        }
        // else if (e.keyCode == '37' && spritePositionLeft-STEP > 0) {
        else if (e.keyCode == '97' && spritePositionLeft-STEP > 0) {
           // left arrow
           spritePositionLeft -= STEP;
        }
        // else if (e.keyCode == '39' && spritePositionLeft < WINDOW_WIDTH) {
        else if (e.keyCode == '100' && spritePositionLeft+SPRITE_WIDTH < WINDOW_WIDTH) {
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

        var generateObstacle = Math.floor(Math.random()*OBSTACLE_FREQUENCY);
        if (generateObstacle == 2) {
            var obstacle = game.createObstacle();
            game.showObject(obstacle);
            setInterval(moveObstacle, OBSTACLE_SPEED_INTERVAL, obstacle, this);
        }  
        
    }               


    setInterval(update, 10);
}