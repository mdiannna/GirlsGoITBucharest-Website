function Const() {

    var SPRITE_HEIGHT = 200;
    var SPRITE_WIDTH = 100;
    var BACKPACK_HEIGHT = 150;
    var BACKPACK_WIDTH = 150;
    var OBSTACLE_HEIGHT = 70;
    var OBSTACLE_WIDTH = 100;
    var CODE_BLOCK_HEIGHT = 150;
    var CODE_BLOCK_WIDTH = 300;
    var OBSTACLE_INVERSE_FREQUENCY= 520;
    var CODE_BLOCK_INVERSE_FREQUENCY= 400;
    var OBSTACLE_SPEED_INTERVAL =100;
    var CODE_BLOCK_SPEED_INTERVAL =200;
    var STEP_CONSTANT = 10;
    var OBSTACLE_STEP = 10;
    var GAME_DURATION = 50000;
    var SCORE_ADD = 10;

    this.getSpriteHeight = function() {
        return SPRITE_HEIGHT;
    }

    this.getSpriteWidth = function() {
        return SPRITE_WIDTH;
    }

    this.getBackpackHeight = function() {
        return BACKPACK_HEIGHT;
    }

    this.getBackpackWidth = function() {
        return BACKPACK_WIDTH;
    }

    this.getObstacleHeight = function() {
        return OBSTACLE_HEIGHT;
    }

    this.getObstacleWidth = function() {
        return OBSTACLE_WIDTH;
    }
    this.getCodeBlockHeight = function() {
        return CODE_BLOCK_HEIGHT;
    }

    this.getCodeBlockWidth = function() {
        return CODE_BLOCK_WIDTH;
    }

    this.getObstacleInverseFrequency = function() {
        return OBSTACLE_INVERSE_FREQUENCY;
    }

    this.getCodeBlockInverseFrequency = function() {
        return CODE_BLOCK_INVERSE_FREQUENCY;
    }

    this.getObstacleSpeedInterval = function() {
        return OBSTACLE_SPEED_INTERVAL;
    }

    this.getCodeBlockSpeedInterval = function() {
        return CODE_BLOCK_SPEED_INTERVAL;
    }

    this.getStepConstant = function() {
        return STEP_CONSTANT;
    }

    this.getObstacleStep = function() {
        return OBSTACLE_STEP;
    }

    this.getGameDuration = function() {
        return GAME_DURATION;
    }

    this.getScoreAdd = function() {
        return SCORE_ADD;
    }


}
