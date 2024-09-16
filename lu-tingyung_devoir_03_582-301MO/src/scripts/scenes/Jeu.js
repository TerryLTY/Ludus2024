class Jeu extends Phaser.Scene {
    constructor()  {
        super({ key:"Jeu" });
    }

    preload() {
        this.load.image("quitter", "./assets/images/ui/Quitter.png");
    }
  
    create() {
        this.quitter = this.add.image(0, 0, "quitter").setOrigin(0, 0);
        this.quitter.setPosition(25, 500);
        this.quitter.setInteractive();
        this.quitter.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
            }
        });
    }
  
    update() {}
}
  