function Const() {

    var SPRITE_HEIGHT = 200;
    var SPRITE_WIDTH = 100;
    var BACKPACK_HEIGHT = 150;
    var BACKPACK_WIDTH = 150;
    var OBSTACLE_HEIGHT = 70;
    var OBSTACLE_WIDTH = 100;
    var CODE_BLOCK_HEIGHT = 150;
    var CODE_BLOCK_WIDTH = 300;
    var OBSTACLE_INVERSE_FREQUENCY= 220;
    var CODE_BLOCK_INVERSE_FREQUENCY= 300;
    var OBSTACLE_SPEED_INTERVAL =100;
    var CODE_BLOCK_SPEED_INTERVAL =100;
    var STEP = 10;
    var OBSTACLE_STEP = 10;


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

    this.getStep = function() {
        return STEP;
    }

    this.getObstacleStep = function() {
        return OBSTACLE_STEP;
    }
}
