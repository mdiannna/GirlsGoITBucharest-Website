// TODO: constants file separately

var spritePositionTop = 0;
var spritePositionLeft = 0;
var codeBlocksTop = [];
var codeBlocksLeft = [];

    
var SPRITE_HEIGHT = 200;
var SPRITE_WIDTH = 100;
var OBSTACLE_HEIGHT = 70;
var OBSTACLE_WIDTH = 100;
var CODE_BLOCK_HEIGHT = 150;
var CODE_BLOCK_WIDTH = 300;
var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var OBSTACLE_INVERSE_FREQUENCY= 220;
var CODE_BLOCK_INVERSE_FREQUENCY= 300;
var OBSTACLE_SPEED_INTERVAL =100;
var CODE_BLOCK_SPEED_INTERVAL =100;

var obstacles = [];
var codeBlocks = [];

var sprite;

var STEP = 20;
var OBSTACLE_STEP = 10;


    var colision = {
        detectColision: function(object, sprite, objType) {
            var spriteLeft = parseInt(sprite.style.left.replace("px", ""));
            var spriteTop = parseInt(sprite.style.top.replace("px", ""));
            var spriteWidth = SPRITE_WIDTH;
            var spriteHeight = SPRITE_HEIGHT;

            // defautls are for type "obstacle"
            var objHeight = OBSTACLE_HEIGHT;
            var objWidth = OBSTACLE_WIDTH;
            var objLeft = parseInt(object.style.left.replace("px", ""));
            var objTop = parseInt(object.style.top.replace("px", ""));

            
            if(objType == "codeBlock") {
                objWidth = CODE_BLOCK_WIDTH;
                objHeight= CODE_BLOCK_HEIGHT;
            }
            

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
    function clearScreen() {
        document.body.innerHTML = "";
    }


    function setGame() {
        var settingsContainer;
        var pageTitle;
        var nameText;
        var nameTextLabel;
        var nrOfLivesNumber;
        var nrOfLivesNumberLabel;
        var speedRange;
        var speedRangeLabel;
        var obstacleTypeRadio;
        var obstacleTypeRadioLabel;
        var loadSettingsCheckbox;
        var loadSettingsCheckboxLabel;
        var startGameButton;

        settings = {
            createSettingsContainer:function() {
                settingsContainer = document.createElement("div");
                settingsContainer.id = "settingsContainer";
                settingsContainer.style.backgroundColor = "white";
                settingsContainer.style.marginLeft = "10vw";
                settingsContainer.style.marginRight = "10vw";
                settingsContainer.style.marginTop = "10vw";
                settingsContainer.style.marginBottom = "10vw";  
                settingsContainer.style.paddingLeft = "10vw";
                settingsContainer.style.paddingRight = "10vw";
                settingsContainer.style.paddingTop = "1vw";
                settingsContainer.style.paddingBottom = "5vw";  
                settingsContainer.style.display = "block";  
            },

            createSettingsPage:function() {
                this.createSettingsContainer();
                pageTitle = document.createElement("p");
                pageTitle.style.fontSize = "3em";
                pageTitle.style.textAlign = "center";
                pageTitle.innerHTML = "Settings";
              
                nameTextLabel = document.createElement("label");
                nameTextLabel.innerHTML = "Sprite name: ";
                // nameTextLabel.style.display = "block";
                nameTextLabel.style.color = "black";
                // nameTextLabel.style.textAlign = "center";

                nameText = document.createElement("input");
                nameText.type = "text";
                nameText.id = "spriteName"; 
                nameText.placeholder = "Sprite name...";
                // nameText.style.textAlign = "center";
                // 
                // 
                // 
                

                startGameButton = document.createElement("button");
                startGameButton.id = "startGameButton";
                startGameButton.innerHTML = "Start game";
                startGameButton.textAlign = "center";
                startGameButton.style.display = "block";
                startGameButton.style.marginTop = "2vw";
                // startGameButton.style.float="center";
                // startGameButton.style.float="right";
                startGameButton.addEventListener("click", function(event) {
                    clearScreen();
                    playGame();                    
                });


            },

            showSettingsPage:function() {
                clearScreen();
                settingsContainer.appendChild(pageTitle);
                settingsContainer.appendChild(nameTextLabel);
                settingsContainer.appendChild(nameText);
                settingsContainer.appendChild(startGameButton);
                document.body.appendChild(settingsContainer);

            }
        }

        settings.createSettingsPage();
        settings.showSettingsPage();

    }

    function completeFeedback() {
        // select2 - overall impression bine/rau etc
        // select multiple - ce ti-a placut la joc
        // select multiple - ce nu ti-a placut la joc
        //textarea alte comentarii
    }

    function playGame() {
        function init() {
            WINDOW_WIDTH = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

             WINDOW_HEIGHT = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
            
            spritePositionLeft = Math.floor(WINDOW_WIDTH/2 - SPRITE_WIDTH/2);   
            spritePositionTop = Math.floor(WINDOW_HEIGHT/2);   
        }
        
        init();


        var game = {

            createSprite: function() 
            {
                sprite = document.createElement("div");
                sprite.id = "sprite";
                sprite.style.position = "absolute";
                sprite.style.top = "400px";
                sprite.style.left = "300px";
                // sprite.style.top = height - SPRITE_HEIGHT;
                
                spriteImage = document.createElement("img");
                spriteImage.width = SPRITE_WIDTH;
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
                var obstacleTop = -200;
                var obstacleLeft = Math.floor(Math.random() * WINDOW_WIDTH);
                obstacle.style.top = obstacleTop + "px";
                obstacle.style.left =  obstacleLeft + "px";
                obstacle.top = obstacleTop;
                obstacle.left = obstacleLeft;
                obstacle.style.width = OBSTACLE_WIDTH + "px";
                obstacleImage = document.createElement("img");
                obstacleImage.setAttribute("src", "img/obstacles/obstacle1.png");
                // obstacleImage.setAttribute("src", "img/assets/asset1.svg");
                obstacle.appendChild(obstacleImage);   
                obstacle.lastColisioned = false;

                return obstacle;
            },

            showObject: function(obj) {
                document.body.appendChild(obj);   
            },

           createCodeBLock: function() {
                var codeBlock = document.createElement("div");
                codeBlock.classList.add("codeBlock");
                codeBlock.style.position = "absolute";

                var codeBlockTopValue = -100;
                var codeBlockLeftValue = Math.floor(Math.random() * WINDOW_WIDTH)

                codeBlock.style.top = codeBlockTopValue + "px";
                codeBlock.style.left = codeBlockLeftValue + "px";
                codeBlock.top = codeBlockTopValue;
                codeBlock.left = codeBlockLeftValue;

                codeBlockImage = document.createElement("img");
                codeBlockImage.setAttribute("src", "img/tablet1.png");
                codeBlock.appendChild(codeBlockImage);   

                // codeBlocks.push(codeBlock);

                return codeBlock;
            },

            showObject: function(obj) {
                document.body.appendChild(obj);   
            },

        };


         function moveObstacle(obj) {
                if(colision.detectColision(obj, sprite, "obstacle") == true) {
                    if(obj.lastColisioned==false) {
                        alert("Colision with obstacle detected! -1 life");    
                        obj.lastColisioned = true;
                    }
                } else {
                    obj.lastColisioned = false;
                }

                if(obj.top == WINDOW_HEIGHT) {
                    if(document.body.contains(obj)) {
                        clearInterval(obj.interval);
                        document.body.removeChild(obj);
                    }
                }
                else {
                    obj.top += OBSTACLE_STEP;
                    obj.style.top = obj.top + "px";
                }
            }

        function moveCodeBlock(obj) {
                if(colision.detectColision(obj, sprite, "codeBlock") == true) {
                    if(obj.lastColisioned==false) {
                        // alert("Colisionwith code block detected!");    
                        obj.lastColisioned = true;
                        if(document.body.contains(obj)) {
                        clearInterval(obj.interval);
                        document.body.removeChild(obj);
                    }
                    }
                } else {
                    obj.lastColisioned = false;
                }

                if(obj && obj.top >= WINDOW_HEIGHT) {
                    if(document.body.contains(obj)) {
                        clearInterval(obj.interval);
                        document.body.removeChild(obj);
                    }
                    delete obj;
                }
                else {
                    // alert(obj.top);
                    obj.top += OBSTACLE_STEP;
                    // alert(obj.top);

                    obj.style.top = obj.top + "px";
                }
               
            }


        game.createSprite();
        game.showObject(sprite);

        // SPRITE_HEIGHT = parseInt(window.getComputedStyle(sprite).height.replace("px", ""));
        // SPRITE_WIDTH = parseInt(window.getComputedStyle(sprite).width.replace("px", ""));
      
        
        // function init() {
        // 	spritePositionTop = 0;
        // 	spritePositionLeft = 0;

        // }

        function moveSprite() {
        	document.getElementById("sprite").style.left = "100px";
        	document.getElementById("sprite").style.top = "100px";
        }

       
        document.onkeypress=function(e){
        
            
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


        // function fallCodeBlock() {
        // 	var codeBlocks = document.querySelectorAll(".codeBlock");
        // 	for (var i=0; i<codeBlocks.length; i++) {
        // 		codeBlocksTop[i] += 150 * i;
        // 		codeBlocksLeft[i] += 200 * i;
        // 	}
        // }


        // init();
        // fallCodeBlock();

        function update() {
            // var codeBlocks = document.querySelectorAll(".codeBlock");
            
            document.getElementById("sprite").style.top = spritePositionTop + "px";
            document.getElementById("sprite").style.left = spritePositionLeft + "px";
            
            console.log(spritePositionTop + " , ");
            console.log(spritePositionLeft);

            var generateObstacle = Math.floor(Math.random()*OBSTACLE_INVERSE_FREQUENCY);
            if (generateObstacle == 2) {
                var obstacle = game.createObstacle();
                game.showObject(obstacle);
                obstacle.interval = setInterval(moveObstacle, OBSTACLE_SPEED_INTERVAL, obstacle);
            }  
            
            var generatecodeBlock = Math.floor(Math.random()*CODE_BLOCK_INVERSE_FREQUENCY);
            if (generatecodeBlock == 6) {
                var codeBlock = game.createCodeBLock();
                game.showObject(codeBlock);
                codeBlock.interval = setInterval(moveCodeBlock, CODE_BLOCK_SPEED_INTERVAL, codeBlock);
            }
        }               


        setInterval(update, 10);
    }



    function main() {
        setGame();
        // playGame();
    }

    main();
}