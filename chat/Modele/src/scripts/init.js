const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  // transparent: true,
  width: 800,
  height: 600,
  scene: Intro,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
};
const game = new Phaser.Game(config);
