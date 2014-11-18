function Config() {
    this.lblStart = "START";
    this.lblStop = "PAUSE";
    this.lblRestart = "RESTART";

    this.canvasWidth = 300;
    this.canvasHeight = 400;

    this.palyerWidth = 20;
    this.playerHeight = 20;
    this.playerSpeed = 3;
    this.playerColor = "#FFFFFF";
    this.playerJumpSpeed = 4;

    this.tileMaxWidth = 100;
    //this.tileMinWidth = 30;
    this.tileHeight = 15;
    this.tileColor = "#FFFFFF";
    this.tileStartVel = 1;
    this.tileLevelUpRatio = 0.05;

    this.tilesTimeInterval = 70;
    this.tilesLevelUpRatio = 20;

    this.friction = 0.9;
    this.gravity = 0.5;

    this.levelUpScore = 1000;
    this.levelUpMessage = "Level: ";
}
