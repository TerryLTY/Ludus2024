const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 800,
  height: 600,
  scene: [Accueil, Jeu, CommentJouer, Credits, PartieTerminee, Victoire]
};
const game = new Phaser.Game(config);
