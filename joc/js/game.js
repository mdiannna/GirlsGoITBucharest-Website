// TODO: constants file separately

var spritePositionTop;
var spritePositionLeft;
var codeBlocksTop = [];
var codeBlocksLeft = [];
var updateInterval;
var music = true;

    
var SPRITE_HEIGHT;
var SPRITE_WIDTH;
var BACKPACK_HEIGHT;
var BACKPACK_WIDTH;
var OBSTACLE_HEIGHT;
var OBSTACLE_WIDTH;
var CODE_BLOCK_HEIGHT;
var CODE_BLOCK_WIDTH;
var windowWidth;
var windowHeight;
var OBSTACLE_INVERSE_FREQUENCY;
var CODE_BLOCK_INVERSE_FREQUENCY;
var OBSTACLE_SPEED_INTERVAL;
var CODE_BLOCK_SPEED_INTERVAL;
var GAME_DURATION;
// settings parameters
var FUNCTION;
var gameStatus;
var languages;
var winMessage;
var winGameFunction;
var playerScore;
var SCORE_ADD;


var obstacles = [];
var codeBlocks = [];

var sprite;
var backpack;

var spriteStep;
var STEP_CONSTANT;
var OBSTACLE_STEP;

var spriteName;
var nrOfLivesTotal;
var nrOfLivesCurrent;

var currentMouseX;
var currentMouseY;

var lifeCheatCode;



var languagesData = ["Javascript", "C++"];
var functionsNamesData = ["sum", "alert", "console log", "print", "read"];
var codeBlocksData = ["function sum(){", "}", 'alert("something")', 
        'printf("something");', "cin>>word;", 'console.log("something")',
        'function initValues() {', 'var P = new Point();', 'P.showValues();',
        'vectorPuncte.push(P);', '#include <iostream>', 'using namespace std',
        ];



function initValues() {
    lifeCheatCode = [];
    playerScore = 0;
    spritePositionTop = 0;
    spritePositionLeft = 0;
    codeBlocksTop = [];
    codeBlocksLeft = [];
    windowWidth = 0;
    windowHeight = 0;
    clearInterval(updateInterval);
     // settings parameters
    FUNCTION = "";
    languages = [];
    winMessage = "Congratulations! You won!";

    obstacles = [];
    codeBlocks = [];

    sprite = undefined;
    backpack = undefined;

    spriteStep = 10;
    OBSTACLE_STEP = 10;

    // Default values
    spriteName = "Player1";
    nrOfLivesTotal = 3;
    nrOfLivesCurrent = 3;

    gameStatus = "win";


    // get constants
    constants = new Const();
    SPRITE_HEIGHT = constants.getSpriteHeight();
    SPRITE_WIDTH = constants.getSpriteWidth();
    BACKPACK_HEIGHT = constants.getBackpackHeight();
    BACKPACK_WIDTH = constants.getBackpackWidth();
    OBSTACLE_HEIGHT = constants.getObstacleHeight();
    OBSTACLE_WIDTH = constants.getObstacleWidth();
    CODE_BLOCK_HEIGHT = constants.getCodeBlockHeight();
    CODE_BLOCK_WIDTH = constants.getCodeBlockWidth();
    
    OBSTACLE_INVERSE_FREQUENCY= constants.getObstacleInverseFrequency();
    CODE_BLOCK_INVERSE_FREQUENCY= constants.getCodeBlockInverseFrequency();
    OBSTACLE_SPEED_INTERVAL = constants.getObstacleSpeedInterval();
    CODE_BLOCK_SPEED_INTERVAL = constants.getCodeBlockSpeedInterval();
    STEP_CONSTANT = constants.getStepConstant();
    GAME_DURATION = constants.getGameDuration();
    SCORE_ADD = constants.getScoreAdd();
    
    game_audio=document.createElement("audio");
    game_audio.classList.add("audio");
    game_audio.setAttribute("src","media/game_music.mp3");
    music = true;
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
    },
     detectColisionBackpack: function(object, objType) {
        var backpackLeft = parseInt(backpack.style.left.replace("px", ""));

        var backpackTop = parseInt(window.getComputedStyle(backpack).top.replace("px", ""));
        // alert(backpackLeft);
        // alert(backpackTop);
        var backpackWidth = BACKPACK_WIDTH;
        var backpackHeight = BACKPACK_HEIGHT;

        // defautls are for type "obstacle"
        var objHeight = OBSTACLE_HEIGHT;
        var objWidth = OBSTACLE_WIDTH;
        var objLeft = parseInt(object.style.left.replace("px", ""));
        var objTop = parseInt(object.style.top.replace("px", ""));

        
        if(objType == "codeBlock") {
            objWidth = CODE_BLOCK_WIDTH;
            objHeight= CODE_BLOCK_HEIGHT;
        }
        

        if ( objLeft< backpackLeft + backpackWidth &&
            objLeft + objWidth > backpackLeft &&
            objTop < backpackTop + backpackHeight &&
            objHeight + objTop > backpackTop) {
            return true;
        }
        return false;
    }
}



window.onload = function() 
{

    document.onmousemove = function(event) {
    currentMouseX = event.pageX;
    currentMouseY = event.pageY;
    // console.log(currentMouseX);
    // console.log(currentMouseY);
    // alert(currentMouseX);
    // alert(currentMouseY);
}


    function clearScreen() {
        document.body.innerHTML = "";
        while(document.body.children.length > 0) {
            document.body.removeChild(children[0]);
        }
    }


    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        if (i == 0 || i == 1) {
            color += letters[Math.floor(Math.random() * 7)];    

        }
        else {
            color += letters[Math.floor(Math.random() * 16)];    
        }
        
      }

      return color;
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

        message = {
            showInfo:function(mymessage) {
                var messageDiv = document.createElement("div");
                messageDiv.style.position = "absolute";
                messageDiv.style.backgroundColor = getRandomColor();
                messageDiv.style.opacity = "0.9";
                messageDiv.style.top = "100px";
                messageDiv.style.left = Math.floor(Math.random() * windowWidth + 100) - 200 + "px";
                messageDiv.style.width = "100px";
                // messageDiv.style.height = "50px";
                messageDiv.style.zIndex = "120";
                // messageDiv.style.border = "1px solid #ff00ff";
                messageDiv.innerHTML = mymessage;
                document.body.appendChild(messageDiv);
                setTimeout(function() {
                    document.body.removeChild(messageDiv);
                }, 2000);
            },

            showError:function(mymessage) {
                var messageDiv = document.createElement("div");
                messageDiv.style.position = "absolute";
                messageDiv.style.backgroundColor = "red";
                messageDiv.style.opacity = "0.9";
                messageDiv.style.top = "100px";
                messageDiv.style.left = Math.floor(Math.random() * windowWidth + 100) - 200 + "px";
                messageDiv.style.width = "100px";
                // messageDiv.style.height = "50px";
                messageDiv.style.zIndex = "120";
                messageDiv.style.border = "1px solid #ff0000";
                messageDiv.innerHTML = mymessage;
                document.body.appendChild(messageDiv);
                setTimeout(function() {
                    document.body.removeChild(messageDiv);
                }, 2000);
            },
            showWinMessage:function(mymessage) {
                  var messageDiv = document.createElement("div");
                messageDiv.style.position = "absolute";
                messageDiv.style.backgroundColor = "white";
                messageDiv.style.color = "magenta";
                messageDiv.style.opacity = "0.9";
                messageDiv.style.top = "100px";
                messageDiv.style.paddingTop = "100px";
                messageDiv.style.fontSize = "100px";
                messageDiv.style.textAlign = "center";
                messageDiv.style.left = 0;
                messageDiv.style.width = Math.floor(windowWidth) + "px";
                messageDiv.style.height = Math.floor(windowHeight * 0.8) + "px";
                // messageDiv.style.height = "50px";
                messageDiv.style.zIndex = "120";
                messageDiv.style.border = "1px solid #ff0000";
                messageDiv.innerHTML = mymessage+ "<br>Your score is: " +playerScore;
                document.body.appendChild(messageDiv);
            }

        }
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
                // pageTitle.innerHTML = "Settings";
                pageTitleText = document.createTextNode("Settings");
                pageTitle.appendChild(pageTitleText);


                loadSettingsCheckboxLabel = document.createElement("label");
                loadSettingsCheckboxLabel.innerHTML = "Load previous settings";
                loadSettingsCheckboxLabel.style.color = "black";
                loadSettingsCheckbox = document.createElement("input");
                loadSettingsCheckbox.type = "checkbox";
                loadSettingsCheckbox.name = "loadSettingsCheckbox";
                loadSettingsCheckbox.id = "loadSettingsCheckbox"; 

              
                nameTextLabel = document.createElement("label");
                nameTextLabel.innerHTML = "Your name: (min 3 letters) ";
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
                nrOfLivesRadioLabel2.innerHTML = "multiple lives";
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
                
                for(var i=0; i<functionsNamesData.length; i++) {
                    var functionSelectOption1 = document.createElement("option");
                    // functionSelectOption1.value = i;
                    functionSelectOption1.value = functionsNamesData[i];
                    // alert(functionSelectOption1.value);
                    functionSelectOption1.name = functionsNamesData[i];
                    functionSelectOption1.innerHTML = functionsNamesData[i];
                    functionSelect.appendChild(functionSelectOption1);
                }



                languageMultipleSelectLabel = document.createElement("label");
                languageMultipleSelectLabel.innerHTML = "Languages:";
                languageMultipleSelectLabel.style.color = "black";
                languageMultipleSelectLabel.style.display = "block";  

                languageMultipleSelect = document.createElement("select");
                // languageMultipleSelect.type = "select";
                languageMultipleSelect.multiple = "multiple";
                languageMultipleSelect.id = "languageMultipleSelect"; 

                for(var i=0; i<languagesData.length; i++) {
                    var languageMultipleSelectOption1 = document.createElement("option");
                    languageMultipleSelectOption1.value = languagesData[i];
                    languageMultipleSelectOption1.name = languagesData[i];
                    languageMultipleSelectOption1.innerHTML = languagesData[i];
                    languageMultipleSelect.appendChild(languageMultipleSelectOption1);    
                }
                


                winMessageTextAreaLabel = document.createElement("label");
                winMessageTextAreaLabel.innerHTML = "Win message:";
                winMessageTextAreaLabel.style.color = "black";
                winMessageTextAreaLabel.style.display = "block";  

                winMessageTextArea = document.createElement("textarea");
                winMessageTextArea.id = "winMessageTextArea"; 
                winMessageTextArea.innerHTML = winMessage; 


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
                        settingsContainer.removeChild(nrOfLivesNumberLabel);                        
                        settingsContainer.removeChild(nrOfLivesNumber);                        

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
                        settingsContainer.insertBefore(nrOfLivesNumberLabel, speedRangeLabel);
                        settingsContainer.insertBefore(nrOfLivesNumber, speedRangeLabel);


        
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
                settingsContainer.insertBefore(nrOfLivesNumberLabel, speedRangeLabel);
                settingsContainer.insertBefore(nrOfLivesNumber, speedRangeLabel);
                nrOfLivesNumber.disabled = true;


                nrOfLivesRadio2.onchange = function() {
                    if(this.checked) {
                        nrOfLivesNumber.disabled = false;
                        // settingsContainer.insertBefore(nrOfLivesNumberLabel, speedRangeLabel);
                        // settingsContainer.insertBefore(nrOfLivesNumber, speedRangeLabel);
                    } 
                }

                nrOfLivesRadio1.onchange = function() {
                    if(this.checked) {
                        if(settingsContainer.contains(nrOfLivesNumberLabel)) {
                            // nrOfLivesNumber.disabled = "disabled";
                            // settingsContainer.removeChild(nrOfLivesNumberLabel);
                        }
                        if(settingsContainer.contains(nrOfLivesNumber)) {
                            nrOfLivesNumber.disabled = true;
                            // settingsContainer.removeChild(nrOfLivesNumber);
                        }
                    }
                }
                

                document.body.appendChild(settingsContainer);

            },
            attachSettingsListener:function() {

                startGameButton.addEventListener("click", function(event) {
                    var validateData = true;
                    var loadFromStorage = false;

                    var spriteNameNew;
                    var nrOfLivesTotalNew;
                    var WIN_MESSAGE_New;
                    var spriteStepNew;
                    var FUNCTION_New;

                        // Reset languages
                        languages = [];
                            
                    if(loadSettingsCheckbox.checked) {

                        if(parseInt(localStorage.getItem("hasData")) == 1) {
                            loadFromStorage = true;
                            spriteName = localStorage.getItem("spriteName");
                            nrOfLivesTotal = parseInt(localStorage.getItem("nrOfLivesTotal"));
                            nrOfLivesCurrent = nrOfLivesTotal;
                            winMessage = localStorage.getItem("winMessage");
                            spriteStep = parseInt(localStorage.getItem("spriteStep"));
                            // alert("spriteStep:" + spriteStep);
                            FUNCTION = localStorage.getItem("function");
                            // alert(FUNCTION);
                            var nrLanguages = parseInt(localStorage.getItem("nrLanguages"));
                            
                            for(var i=1; i<=nrLanguages; i++) {
                                languages.push(localStorage.getItem(toString("language" + i)));
                            }
                           

                        } else {
                            // message.showInfo("Can't load previous data");
                            alert("Can't load previous data");
                            validateData = false;
                        }    
                    } else {    
                        
                        if(nameText.value && nameText.value!= undefined && nameText.value != "") {
                            spriteNameNew = nameText.value;
                            var re = new RegExp('^[a-zA-Z]{3,}$');
                            // var re = new RegExp('^[a-zA-Z]+$');
                            if(re.test(spriteNameNew)== false) {
                                validateData = false;
                            }

                        } else {
                            validateData = false;
                            // alert("name");
                        }

                        if(nrOfLivesRadio1.checked) {
                            nrOfLivesTotalNew = 1;
                        } else if(nrOfLivesRadio2.checked && nrOfLivesNumber.value != undefined) {
                            nrOfLivesTotalNew = nrOfLivesNumber.value;
                        }else {
                            validateData = false;
                            // alert("nr of lives");

                        }

                        if(winMessageTextArea.value != "" && winMessageTextArea.value != undefined) {
                            WIN_MESSAGE_New = winMessageTextArea.value;
                        } else {
                            validateData = false;
                            // alert(winMessage);

                        }
                        // alert(speedRange.value);
                        spriteStepNew = STEP_CONSTANT * speedRange.value;

                        var functionSelectOptions = functionSelect.children;
                        for(var i=0; i<functionSelectOptions.length; i++) {
                            if(functionSelectOptions[i].selected) {
                                FUNCTION_New = functionSelectOptions[i].value;
                            }
                        }

                        var languageMultipleOptions = languageMultipleSelect.children;
                        for(var i=0; i<languageMultipleOptions.length; i++) {
                            if(languageMultipleOptions[i].selected) {
                                languages.push(languageMultipleOptions[i].value);
                            }
                        }

                        if(languages.length == 0) {
                            validateData = false;
                            // alert("languages");

                        }
                    }


                    if(validateData == true) {
                        if(loadFromStorage == false) {
                            spriteName = spriteNameNew;
                            nrOfLivesTotal = nrOfLivesTotalNew;
                            nrOfLivesCurrent = nrOfLivesTotalNew;
                            winMessage = WIN_MESSAGE_New;
                            spriteStep = spriteStepNew;
                            FUNCTION = FUNCTION_New;     
                        }
                       

                        localStorage.setItem("hasData","1");
                        localStorage.setItem("spriteName", spriteName);
                        localStorage.setItem("nrOfLivesTotal", nrOfLivesTotal);
                        localStorage.setItem("winMessage", winMessage);
                        localStorage.setItem("spriteStep", spriteStep);
                        localStorage.setItem("function", FUNCTION);
                        // alert(FUNCTION);
                        localStorage.setItem("nrLanguages", languages.length);
                        
                        for(var i=1; i<=languages.length; i++) {
                            // var key = "language" + i;
                            localStorage.setItem(toString("language" + i), languages[i]);
                        }
                        

                        clearScreen();
                        // alert("sprite step:" + spriteStep);                  
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

    // function startTimer() {
    //     setInterval(function() {
    //         timers = document.getElementsByClassName("timer");
    //         // timers[
    //     }, 1000);
    // }

    window.onresize = function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    }
    
    function playGame() {
        function init() {
            game_audio.play();

            windowWidth = window.innerWidth;

             windowHeight = window.innerHeight;
            
            spritePositionLeft = Math.floor(windowWidth/2 - SPRITE_WIDTH/2);   
            spritePositionTop = Math.floor(windowHeight/2);   
        }
        
        init();
        // startTimer();


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
                var obstacleLeft = Math.floor(Math.random() * windowWidth);
                obstacle.style.top = obstacleTop + "px";
                obstacle.style.left =  obstacleLeft + "px";
                obstacle.top = obstacleTop;
                obstacle.left = obstacleLeft;
                obstacle.style.width = OBSTACLE_WIDTH + "px";
                obstacleImage = document.createElement("img");
                obstacleImage.setAttribute("src", "img/obstacles/obstacle1.png");
                obstacleImage.style.width = OBSTACLE_WIDTH + "px";
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
                var codeBlockLeftValue = Math.floor(Math.random() * windowWidth)

                codeBlock.style.top = codeBlockTopValue + "px";
                codeBlock.style.left = codeBlockLeftValue + "px";
                codeBlock.top = codeBlockTopValue;
                codeBlock.left = codeBlockLeftValue;

                codeBlockImage = document.createElement("img");
                codeBlockImage.setAttribute("src", "img/tablet1.png");
                codeBlock.appendChild(codeBlockImage);   

                codeBlockP = document.createElement("p");
                codeBlockP.innerHTML = codeBlocksData[Math.floor(Math.random() * (codeBlocksData.length-1))];
                codeBlock.appendChild(codeBlockP);   


                // codeBlocks.push(codeBlock);
                
                


                codeBlock.ondragstart = function() {
                  return false;
                };

               
                codeBlock.onmousemove = function(event) {
                    codeBlock.top = currentMouseY - 100;
                    codeBlock.left= currentMouseX - 200;
                    codeBlock.style.top = codeBlock.top + "px";
                    codeBlock.style.left =  codeBlock.left + "px";
                }


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


                // var timer = document.createElement("span");
                // timer.id = "timer";
                // timer.style.float = "left";
                // timer.classList.add("timer");
                // 

                var stopBtn = document.createElement("button");
                stopBtn.innerHTML = "stop music";
                stopBtn.style.bottom = "50px";
                stopBtn.style.right = "20px";
                stopBtn.style.position = "absolute";

                var musicIcon = document.createElement("i");
                musicIcon.classList.add("fa");
                musicIcon.classList.add("fa-pause");
                musicIcon.setAttribute("aria-hidden", true);
                // musicIcon.style.marginTop = "5px";
                // musicIcon.style.color = "red";
                // musicIcon.style.marginRight = "5px";
                stopBtn.appendChild(musicIcon);

                stopBtn.addEventListener("click", function(event) {
                    // game_audio 
                    this.style.visibility = "hidden";
                    // if(music == true) {
                        game_audio.pause();
                        game_audio.currentTime = 0;
                        // music == false;
                    // } else {
                    //     music = true;
                    //     game_audio.play();
                    // }
                    
                    // game_audio.src="";
                });

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
                lives.firstChild.style.fontSize = "1.2em";

                var playerInfo = document.createElement("playerInfo");
                playerInfo.id = "playerInfo";
                playerInfo.style.padding = "0";
                playerInfo.style.paddingRight = "10px";
                playerInfo.style.margin = "0";
                playerInfo.style.float = "right";
                playerInfo.style.lineHeight = "0";
                playerInfo.style.color = "white";
                
                playerInfo.innerHTML ="<span><p>Score:" + playerScore + "&nbsp; | &nbsp;Function: " + FUNCTION 
                + "  &nbsp; | &nbsp;Player: " + spriteName + "</span>";


                document.body.appendChild(stopBtn);
                gameStatus.appendChild(lives);
                gameStatus.appendChild(playerInfo);

                document.body.appendChild(gameStatus);

            },
            gameOver:function() {
                game_audio.pause();
                gameStatus = "lost";
                clearInterval(updateInterval);
                clearTimeout(winGameFunction);
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
                startAgainBtn.style.left = Math.floor(Math.random() * 0.5 * windowWidth - 30) + "px";
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
            },
            showWinGame:function() {
                if(gameStatus == "win") {
                    clearScreen();
                    // alert(winMessage);
                    message.showWinMessage(winMessage);
                    var restartBtn = document.createElement("button");
                    restartBtn.innerHTML = "Restart game";
                    restartBtn.onclick = function(event) {
                        document.location.reload();
                    }
                    document.body.append(restartBtn);
                }

            },
            addRestartBtn:function() {
                var restartBtn = document.createElement("button");
                restartBtn.innerHTML = "Restart game";
                restartBtn.style.bottom = "20px";
                restartBtn.style.right = "20px";
                restartBtn.style.position = "absolute";

                restartBtn.onclick = function(event) {
                    document.location.reload();
                }
                document.body.append(restartBtn);
            }


        };


         function moveObstacle(obj) {
                if(colision.detectColision(obj, sprite, "obstacle") == true) {
                    if(obj.lastColisioned==false) {
                        // alert("Colision winth obstacle detected! -1 life");
                        message.showError("Colision winth obstacle detected! -1 life");
                        obj.lastColisioned = true;
                        obj.firstChild.setAttribute("src", "img/obstacles/obstacle1_broken.png");
                        game.decreaseLives();    
                    }
                } else {
                    obj.lastColisioned = false;
                }

                if(obj.top == windowHeight) {
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
                        message.showInfo("+1 code block +10 points");
                        playerScore += SCORE_ADD;
                        obj.lastColisioned = true;
                        if(document.body.contains(obj)) {
                        clearInterval(obj.interval);
                        document.body.removeChild(obj);
                    }
                    }
                } else {
                    obj.lastColisioned = false;
                }

                 if(colision.detectColisionBackpack(obj, "codeBlock") == true) {
                        if(document.body.contains(obj)) {
                        clearInterval(obj.interval);
                        document.body.removeChild(obj);
                        // alert("+1 in backpack");
                        playerScore += SCORE_ADD*3;
                        message.showInfo("+1 in backpack +30points");
                    }
                } 

                if(obj && obj.top >= windowHeight) {
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
        game.addRestartBtn();
        winGameFunction = setTimeout(game.showWinGame, GAME_DURATION);
    

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
            // alert(e.keyCode);
            
            if (e.keyCode == '119' && spritePositionTop-spriteStep >0) {
                // up arrow
                spritePositionTop -= spriteStep;
            }
            // else if (e.keyCode == '40'  && spritePositionTop < windowHeight) {
            else if (e.keyCode == '115'  && spritePositionTop+SPRITE_HEIGHT < windowHeight) {
                // down arrow
                spritePositionTop += spriteStep;
            }
            // else if (e.keyCode == '37' && spritePositionLeft-spriteStep > 0) {
            else if (e.keyCode == '97' && spritePositionLeft-spriteStep > 0) {
               // left arrow
               spritePositionLeft -= spriteStep;
            }
            // else if (e.keyCode == '39' && spritePositionLeft < windowWidth) {
            else if (e.keyCode == '100' && spritePositionLeft+SPRITE_WIDTH < windowWidth) {
               // right arrow
               spritePositionLeft += spriteStep;
            }

            // l
            if(e.keyCode == '108') {
                lifeCheatCode = [];
                lifeCheatCode.push(1);
            }
            // i
            if(e.keyCode == '105' && lifeCheatCode[0] == 1) {
                lifeCheatCode.push(1);
            }
            // f
            if(e.keyCode == '102' && lifeCheatCode[0] == 1 && lifeCheatCode[1] == 1) {
                lifeCheatCode.push(1);
                // console.log(lifeCheatCode);


            }
            // e
            if(e.keyCode == '101' && lifeCheatCode[0] == 1 && lifeCheatCode[1] == 1&& lifeCheatCode[2] == 1) {
                lifeCheatCode = [];

                // lifeCheatCode = [0,0,0,0];
                // code accepted
                // alert('+1 life!');
                nrOfLivesTotal++;
                nrOfLivesCurrent++;
                var heart = document.createElement("i");
                heart.classList.add("fa");
                heart.classList.add("fa-heart");
                heart.setAttribute("aria-hidden", true);
                heart.style.marginTop = "5px";
                heart.style.color = "red";
                heart.style.marginRight = "5px";
                document.getElementById('lives').appendChild(heart);
            }
             document.getElementById('lives').firstChild.style.fontSize = "1.2em";

            // console.log(lifeCheatCode);
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
            if(document.body.contains(document.getElementById("playerInfo"))) {
                document.getElementById("playerInfo").innerHTML ="<span><p>Score:" + playerScore + "&nbsp; | &nbsp;Function: " + FUNCTION 
                + "  &nbsp; | &nbsp;Player: " + spriteName + "</span>";
    
            }
            
            document.getElementById("sprite").style.top = spritePositionTop + "px";
            document.getElementById("sprite").style.left = spritePositionLeft + "px";
            
            // console.log(spritePositionTop + " , ");
            // console.log(spritePositionLeft);

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


        updateInterval = setInterval(update, 10);
    }



    function main() {
        setGame();
        // playGame();
    }

    initValues();
    main();
}