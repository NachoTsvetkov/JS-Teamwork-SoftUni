function Config() {
    this.lblStart = "START";
    this.lblStop = "PAUSE";
    this.lblRestart = "RESTART";

    this.canvasWidth = 400;
    this.canvasHeight = 570;

    this.palyerWidth = 20;
    this.playerHeight = 75;
    this.playerSpeed = 3;
    this.playerColor = "#FFFFFF";
    this.playerJumpSpeed = 4;

    this.tileMaxWidth = 150;
    //this.tileMinWidth = 30;
    this.tileHeight = 15;
    this.tileColor = "#FFFFFF";
    this.tileStartVel = 1;
    this.tileLevelUpRatio = 0.05;

    this.tilesTimeInterval = 140;
    this.tilesLevelUpRatio = 20;

    this.friction = 0.9;
    this.gravity = 0.5;

    this.levelUpScore = 1000;
    this.levelUpMessage = "Level: ";
}
