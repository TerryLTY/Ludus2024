const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 1280,
  height: 720,
  scene: [Loading, Accueil, Pretext, Jeu, Jeu2, CommentJouer, Credits, PartieTerminee, Victoire, FinBonne, FinMauvaise],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};
const game = new Phaser.Game(config);

let niveauActuel = "Jeu"