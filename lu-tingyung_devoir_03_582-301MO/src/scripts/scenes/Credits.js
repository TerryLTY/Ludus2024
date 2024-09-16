class Credits extends Phaser.Scene {
    constructor()  {
        super({ key:"Credits" });
    }

    preload() {
        this.load.image("retour", "./assets/images/ui/Retour.png");
    }
  
    create() {
        this.retour = this.add.image(0, 0, "retour").setOrigin(0, 0);
        this.retour.setPosition(25, 500);
        this.retour.setInteractive();
        this.retour.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
            }
        });
    }
  
    update() {}
}