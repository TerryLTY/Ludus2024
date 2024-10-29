const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, CommentJouer, Credits, PartieTerminee, Victoire],
  pixelArt: true,
  debug: true,
  physics: {
    default: "arcade"
  }
};
const game = new Phaser.Game(config);
