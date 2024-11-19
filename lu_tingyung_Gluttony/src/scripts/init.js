const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 1280,
  height: 720,
  scene: [Loading, Accueil, Jeu, Jeu2, CommentJouer, Credits, PartieTerminee, Victoire],
  pixelArt: true,
  debug: true,
  physics: {
    default: "arcade"
  }
};
const game = new Phaser.Game(config);

const sauvegarde = {
  niveau: niveauActuel,
  vies: viesActuel,
  objets: objetsCollectes
};

viesActuel = 1

localStorage.setItem('sauvegardeJeu', JSON.stringify(sauvegarde));