class PartieTerminee extends Phaser.Scene {
    constructor()  {
        super({ key:"PartieTerminee" });
    }

    preload() {
        this.load.image("recommencer", "./assets/images/ui/Recommencer.png");
        this.load.image("menuPrincipal", "./assets/images/ui/Menu principal.png");
    }
  
    create() {
        this.recommencer = this.add.image(0, 0, "recommencer").setOrigin(0, 0);
        this.recommencer.setPosition(25, 500);
        this.recommencer.setInteractive();
        this.recommencer.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Jeu");
            }
        });

        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0, 0);
        this.menuPrincipal.setPosition(500, 500);
        this.menuPrincipal.setInteractive();
        this.menuPrincipal.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
            }
        });
    }
  
    update() {}
}