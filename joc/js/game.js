// TODO: constants file separately

var spritePositionTop;
var spritePositionLeft;
var codeBlocksTop = [];
var codeBlocksLeft = [];

    
var SPRITE_HEIGHT;
var SPRITE_WIDTH;
var BACKPACK_HEIGHT;
var BACKPACK_WIDTH;
var OBSTACLE_HEIGHT;
var OBSTACLE_WIDTH;
var CODE_BLOCK_HEIGHT;
var CODE_BLOCK_WIDTH;
var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var OBSTACLE_INVERSE_FREQUENCY;
var CODE_BLOCK_INVERSE_FREQUENCY;
var OBSTACLE_SPEED_INTERVAL;
var CODE_BLOCK_SPEED_INTERVAL;
// settings parameters
var FUNCTION;
var LANGUAGES;
var WIN_MESSAGE;


var obstacles = [];
var codeBlocks = [];

var sprite;
var backpack;

var STEP;
var OBSTACLE_STEP;

var spriteName;
var nrOfLivesTotal;
var nrOfLivesCurrent;



function initValues() {
    spritePositionTop = 0;
    spritePositionLeft = 0;
    codeBlocksTop = [];
    codeBlocksLeft = [];

    SPRITE_HEIGHT = 200;
    SPRITE_WIDTH = 100;
    BACKPACK_HEIGHT = 150;
    BACKPACK_WIDTH = 150;
    OBSTACLE_HEIGHT = 70;
    OBSTACLE_WIDTH = 100;
    CODE_BLOCK_HEIGHT = 150;
    CODE_BLOCK_WIDTH = 300;
    WINDOW_WIDTH = 0;
    WINDOW_HEIGHT = 0;
    OBSTACLE_INVERSE_FREQUENCY= 220;
    CODE_BLOCK_INVERSE_FREQUENCY= 300;
    OBSTACLE_SPEED_INTERVAL =100;
    CODE_BLOCK_SPEED_INTERVAL =100;
    // settings parameters
    FUNCTION = "";
    LANGUAGES = [];
    WIN_MESSAGE = "Congratulations! You won!";

    obstacles = [];
    codeBlocks = [];

    sprite = undefined;
    backpack = undefined;

    STEP = 10;
    OBSTACLE_STEP = 10;

    // Default values
    spriteName = "Player1";
    nrOfLivesTotal = 3;
    nrOfLivesCurrent = 3;
}



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
        while(document.body.children.length > 0) {
            document.body.removeChild(children[0]);
        }
    }

    function setGame() {
        var settingsContainer;
        var pageTitle;
        var greeting;
        var nameText;
        var nameTextLabel;
        var nrOfLivesRadio1;
        var nrOfLivesRadioLabel1;
        var nrOfLivesRadio2;
        var nrOfLivesRadioLabel2;
        var nrOfLivesNumber;
        var nrOfLivesNumberLabel;
        var speedRange;
        var speedRangeLabel;
        var functionSelect;
        var functionSelectLabel;
        var languageMultipleSelect
        var languageMultipleSelectLabel
        var winMessageTextArea;
        var winMessageTextAreaLabel;
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
                settingsContainer.style.marginTop = "1vw";
                settingsContainer.style.marginBottom = "10vw";  
                settingsContainer.style.paddingLeft = "10vw";
                settingsContainer.style.paddingRight = "10vw";
                settingsContainer.style.paddingTop = "0.4vw";
                settingsContainer.style.paddingBottom = "5vw";  
                settingsContainer.style.display = "block";  
            },

            createSettingsPage:function() {
                this.createSettingsContainer();


                var today, someday;
                today = new Date();
                someday = new Date();
                someday.setHours(18);

                if (today.getHours() < someday.getHours()) {
                    text = "Hello! Welcome in the game!";
                } else {
                    text = "Good evening! Nice to have you here";
                }

                greeting = document.createElement("p");
                greeting.style.fontSize = "2em";
                greeting.style.textAlign = "center";
                greeting.innerHTML = text;


                pageTitle = document.createElement("p");
                pageTitle.style.fontSize = "2.3em";
                pageTitle.style.textAlign = "center";
                pageTitle.innerHTML = "Settings";


                loadSettingsCheckboxLabel = document.createElement("label");
                loadSettingsCheckboxLabel.innerHTML = "Load previous settings";
                loadSettingsCheckboxLabel.style.color = "black";
                loadSettingsCheckbox = document.createElement("input");
                loadSettingsCheckbox.type = "checkbox";
                loadSettingsCheckbox.name = "loadSettingsCheckbox";
                loadSettingsCheckbox.id = "loadSettingsCheckbox"; 

              
                nameTextLabel = document.createElement("label");
                nameTextLabel.innerHTML = "Your name: ";
                nameTextLabel.style.color = "black";
                nameTextLabel.style.display = "block";  

                nameText = document.createElement("input");
                nameText.type = "text";
                nameText.id = "nameText"; 
                nameText.placeholder = "Your name...";
                nameText.style.display = "block";  
                // nameText.style.textAlign = "center";
                
                // Nr of lives radio
                nrOfLivesRadioLabel1 = document.createElement("label");
                nrOfLivesRadioLabel1.innerHTML = "1 life";
                nrOfLivesRadioLabel1.style.color = "black";
                // nrOfLivesRadioLabel1.style.display = "block";  
                nrOfLivesRadio1 = document.createElement("input");
                nrOfLivesRadio1.type = "radio";
                nrOfLivesRadio1.name = "nrOfLivesRadio";
                nrOfLivesRadio1.id = "nrOfLivesRadio1"; 
                // nrOfLivesRadio1.id = "nrOfLivesRadio1"; 

                nrOfLivesRadioLabel2 = document.createElement("label");
                nrOfLivesRadioLabel2.innerHTML = "multiple lifes";
                nrOfLivesRadioLabel2.style.color = "black";
                nrOfLivesRadio2 = document.createElement("input");
                nrOfLivesRadio2.name = "nrOfLivesRadio";
                nrOfLivesRadio2.type = "radio";
                nrOfLivesRadio2.id = "nrOfLivesRadio2"; 




                nrOfLivesNumberLabel = document.createElement("label");
                nrOfLivesNumberLabel.innerHTML = "Nr of lives: ";
                nrOfLivesNumberLabel.style.color = "black";
                nrOfLivesNumberLabel.style.display = "block";  

                nrOfLivesNumber = document.createElement("input");
                nrOfLivesNumber.type = "number";
                nrOfLivesNumber.id = "nrOfLivesNumber"; 


                speedRangeLabel = document.createElement("label");
                speedRangeLabel.innerHTML = "Speed: ";
                speedRangeLabel.style.color = "black";
                speedRangeLabel.style.display = "block";  

                speedRange = document.createElement("input");
                speedRange.type = "range";
                speedRange.min = 1;
                speedRange.max = 5;
                speedRange.id = "speedRange"; 


                functionSelectLabel = document.createElement("label");
                functionSelectLabel.innerHTML = "Function";
                functionSelectLabel.style.color = "black";
                functionSelectLabel.style.display = "block";  

                functionSelect = document.createElement("select");
                // functionSelect.type = "select";
                functionSelect.id = "functionSelect"; 

                var functionSelectOption1 = document.createElement("option");
                functionSelectOption1.value = "1";
                functionSelectOption1.name = "Test1";
                functionSelectOption1.innerHTML = "Test1";
                functionSelect.appendChild(functionSelectOption1);



                languageMultipleSelectLabel = document.createElement("label");
                languageMultipleSelectLabel.innerHTML = "Languages:";
                languageMultipleSelectLabel.style.color = "black";
                languageMultipleSelectLabel.style.display = "block";  

                languageMultipleSelect = document.createElement("select");
                // languageMultipleSelect.type = "select";
                languageMultipleSelect.multiple = "multiple";
                languageMultipleSelect.id = "languageMultipleSelect"; 

                var languageMultipleSelectOption1 = document.createElement("option");
                languageMultipleSelectOption1.value = "1";
                languageMultipleSelectOption1.name = "Test1";
                languageMultipleSelectOption1.innerHTML = "Test1";
                languageMultipleSelect.appendChild(languageMultipleSelectOption1);


                winMessageTextAreaLabel = document.createElement("label");
                winMessageTextAreaLabel.innerHTML = "Win message:";
                winMessageTextAreaLabel.style.color = "black";
                winMessageTextAreaLabel.style.display = "block";  

                winMessageTextArea = document.createElement("textarea");
                winMessageTextArea.id = "winMessageTextArea"; 
                winMessageTextArea.innerHTML = WIN_MESSAGE; 


                startGameButton = document.createElement("button");
                startGameButton.id = "startGameButton";
                startGameButton.innerHTML = "Start game";
                startGameButton.textAlign = "center";
                startGameButton.style.display = "block";
                startGameButton.style.marginTop = "2vw";
                
                
                loadSettingsCheckbox.onchange = function() {
                    if(this.checked) {
                        settingsContainer.removeChild(nameTextLabel);
                        settingsContainer.removeChild(nameText);
                        settingsContainer.removeChild(nrOfLivesRadio1);
                        settingsContainer.removeChild(nrOfLivesRadioLabel1);
                        settingsContainer.removeChild(nrOfLivesRadio2);
                        settingsContainer.removeChild(nrOfLivesRadioLabel2);
                        settingsContainer.removeChild(speedRangeLabel);
                        settingsContainer.removeChild(speedRange);
                        settingsContainer.removeChild(functionSelectLabel);
                        settingsContainer.removeChild(functionSelect);
                        settingsContainer.removeChild(languageMultipleSelectLabel);
                        settingsContainer.removeChild(languageMultipleSelect);
                        settingsContainer.removeChild(winMessageTextAreaLabel);
                        settingsContainer.removeChild(winMessageTextArea);                        

                    } else {
                        settingsContainer.insertBefore(nameTextLabel, startGameButton);
                        settingsContainer.insertBefore(nameText, startGameButton);
                        settingsContainer.insertBefore(nrOfLivesRadio1, startGameButton);
                        settingsContainer.insertBefore(nrOfLivesRadioLabel1, startGameButton);
                        settingsContainer.insertBefore(nrOfLivesRadio2, startGameButton);
                        settingsContainer.insertBefore(nrOfLivesRadioLabel2, startGameButton);
                        settingsContainer.insertBefore(speedRangeLabel, startGameButton);
                        settingsContainer.insertBefore(speedRange, startGameButton);
                        settingsContainer.insertBefore(functionSelectLabel, startGameButton);
                        settingsContainer.insertBefore(functionSelect, startGameButton);
                        settingsContainer.insertBefore(languageMultipleSelectLabel, startGameButton);
                        settingsContainer.insertBefore(languageMultipleSelect, startGameButton);
                        settingsContainer.insertBefore(winMessageTextAreaLabel, startGameButton);
                        settingsContainer.insertBefore(winMessageTextArea, startGameButton);


        
                    }
                }

                


            },

            showSettingsPage:function() {
                clearScreen();
                
                settingsContainer.appendChild(greeting);
                settingsContainer.appendChild(pageTitle);
                settingsContainer.appendChild(loadSettingsCheckbox);
                settingsContainer.appendChild(loadSettingsCheckboxLabel);
                settingsContainer.appendChild(nameTextLabel);
                settingsContainer.appendChild(nameText);
                settingsContainer.appendChild(nrOfLivesRadio1);
                settingsContainer.appendChild(nrOfLivesRadioLabel1);
                settingsContainer.appendChild(nrOfLivesRadio2);
                settingsContainer.appendChild(nrOfLivesRadioLabel2);
                settingsContainer.appendChild(speedRangeLabel);
                settingsContainer.appendChild(speedRange);
                
                settingsContainer.appendChild(functionSelectLabel);
                settingsContainer.appendChild(functionSelect);
                settingsContainer.appendChild(languageMultipleSelectLabel);
                settingsContainer.appendChild(languageMultipleSelect);
                settingsContainer.appendChild(winMessageTextAreaLabel);
                settingsContainer.appendChild(winMessageTextArea);

                settingsContainer.appendChild(startGameButton);

                nrOfLivesRadio2.onchange = function() {
                    if(this.checked) {
                        settingsContainer.insertBefore(nrOfLivesNumberLabel, speedRangeLabel);
                        settingsContainer.insertBefore(nrOfLivesNumber, speedRangeLabel);
                    } 
                }

                nrOfLivesRadio1.onchange = function() {
                    if(this.checked) {
                        if(settingsContainer.contains(nrOfLivesNumberLabel)) {
                            settingsContainer.removeChild(nrOfLivesNumberLabel);
                        }
                        if(settingsContainer.contains(nrOfLivesNumber)) {
                            settingsContainer.removeChild(nrOfLivesNumber);
                        }
                    }
                }
                

                document.body.appendChild(settingsContainer);

            },
            attachSettingsListener:function() {

                startGameButton.addEventListener("click", function(event) {
                    var validateData = true;

                    var spriteNameNew;
                    var nrOfLivesTotalNew;
                    var nrOfLivesCurrentNew;
                    var WIN_MESSAGE_New;
                    var STEP_New;
                    var FUNCTION_New;

                    // TODO: RegExp numai caractere, minim 3, validare
                    if(nameText.value && nameText.value!= undefined && nameText.value != "") {
                        spriteNameNew = nameText.value;
                    } else {
                        validateData = false;
                        // alert("name");
                    }

                    if(nrOfLivesRadio1.checked) {
                        nrOfLivesTotalNew = 1;
                        nrOfLivesCurrentNew = 1;
                    } else if(nrOfLivesRadio2.checked && nrOfLivesNumber.value != undefined) {
                        nrOfLivesTotalNew = nrOfLivesNumber.value;
                        nrOfLivesCurrentNew = nrOfLivesNumber.value;
                    }else {
                        validateData = false;
                        // alert("nr of lives");

                    }

                    if(winMessageTextArea.value != "" && winMessageTextArea.value != undefined) {
                        WIN_MESSAGE_New = winMessageTextArea.value;
                    } else {
                        validateData = false;
                        alert(WIN_MESSAGE);

                    }
                    // alert(speedRange.value);
                    STEP_New = STEP * speedRange.value;

                    var functionSelectOptions = functionSelect.children;
                    for(var i=0; i<functionSelectOptions.length; i++) {
                        if(functionSelectOptions[i].selected) {
                            FUNCTION_New = functionSelectOptions[i];
                        }
                    }

                    // Reset languages
                    LANGUAGES = [];
                    var languageMultipleOptions = languageMultipleSelect.children;
                    for(var i=0; i<languageMultipleOptions.length; i++) {
                        if(languageMultipleOptions[i].selected) {
                            LANGUAGES.push(languageMultipleOptions[i].value);
                        }
                    }

                    if(LANGUAGES.length == 0) {
                        validateData = false;
                        // alert("languages");

                    }


                    if(validateData == true) {
                        spriteName = spriteNameNew;
                        nrOfLivesTotal = nrOfLivesTotalNew;
                        nrOfLivesCurrent = nrOfLivesCurrentNew;
                        WIN_MESSAGE = WIN_MESSAGE_New;
                        STEP = STEP_New;
                        FUNCTION = FUNCTION_New;

                        clearScreen();
                        playGame();                        
                    } else {
                        alert("Input data incorrect or missing! Please check and try again!");
                    }
                    
                });

            }
        }

        settings.createSettingsPage();
        settings.showSettingsPage();
        settings.attachSettingsListener();

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
                obstacle.style.zIndex = "4";
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

            createBackpack: function() {
                backpack  = document.createElement("div");
                backpack.style.position = "absolute";
                backpack.style.bottom =  "30px";
                backpack.style.zIndex =  "6";
                backpack.style.left =  "30px";
                backpack.style.width = BACKPACK_WIDTH + "px";
                backpack.style.height = BACKPACK_HEIGHT + "px";
                backpackImage = document.createElement("img");
                backpackImage.setAttribute("src", "img/backpack.png");
                 backpackImage.style.width = BACKPACK_WIDTH + "px";
                backpackImage.style.height = BACKPACK_HEIGHT + "px";
                backpack.appendChild(backpackImage);   
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

            createStatusBar:function() {
                var gameStatus = document.createElement("div");
                gameStatus.id = "gameStatus";
                gameStatus.style.position = "fixed";
                gameStatus.style.top = "0";
                gameStatus.style.width = "100%";
                gameStatus.style.backgroundColor = "black";
                gameStatus.style.height = "30px;";
                gameStatus.style.left = "0";
                gameStatus.style.zIndex = "1000";
                // gameStatus.style.color = "red";

                var lives = document.createElement("span");
                lives.id = "lives";
                lives.style.float = "left";
                // lives.style.paddingTop = "30px";
                
                for(var i=0; i<nrOfLivesTotal; i++) {
                    var heart = document.createElement("i");
                    heart.classList.add("fa");
                    heart.classList.add("fa-heart");
                    heart.setAttribute("aria-hidden", true);
                    heart.style.marginTop = "5px";
                    heart.style.color = "red";
                    heart.style.marginRight = "5px";
                    lives.appendChild(heart);
                }

                var playerInfo = document.createElement("playerInfo");
                playerInfo.id = "playerInfo";
                playerInfo.style.padding = "0";
                playerInfo.style.paddingRight = "10px";
                playerInfo.style.margin = "0";
                playerInfo.style.float = "right";
                playerInfo.style.lineHeight = "0";
                playerInfo.style.color = "white";
                playerInfo.innerHTML = "<span><p>Player: " + spriteName + "</p></span>";

                gameStatus.appendChild(lives);
                gameStatus.appendChild(playerInfo);

                document.body.appendChild(gameStatus);
            },
            gameOver:function() {
                clearScreen();
                var gameOverP = document.createElement("p");
                gameOverP.innerHTML = "GAME OVER!!!";
                gameOverP.style.fontSize = "60px";
                gameOverP.style.color = "red";
                gameOverP.style.textAlign = "center";

                document.body.appendChild(gameOverP);

                var startAgainBtn = document.createElement("button");
                startAgainBtn.innerHTML = "Start again";
                startAgainBtn.style.position = "absolute";
                startAgainBtn.style.left = Math.floor(0.5 * WINDOW_WIDTH - 30) + "px";
                // startAgainBtn.style.left = "50%";

                startAgainBtn.addEventListener("click", function(event){
                    // location.href = "#";
                    // Location.reload();
                    initValues();
                    document.location.reload();
                });

                document.body.appendChild(startAgainBtn);


            },

            decreaseLives: function() {
                nrOfLivesCurrent--;
                if (nrOfLivesCurrent > 0) {
                    var lives = document.getElementById("lives");
                    if (lives.children.length > 0) {
                        lives.removeChild(lives.children[0]);
                    }
                } else{
                    game.gameOver();
                }
            }


        };


         function moveObstacle(obj) {
                if(colision.detectColision(obj, sprite, "obstacle") == true) {
                    if(obj.lastColisioned==false) {
                        alert("Colision with obstacle detected! -1 life");
                        
                        obj.lastColisioned = true;
                        game.decreaseLives();    
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

        game.createStatusBar();
        game.createSprite();
        game.showObject(sprite);
        game.createBackpack();
        game.showObject(backpack);

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

    initValues();
    main();
}