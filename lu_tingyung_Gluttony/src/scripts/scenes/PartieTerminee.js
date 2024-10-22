class PartieTerminee extends Phaser.Scene {
    constructor()  {
        super({ key:"PartieTerminee" });
    }

    preload() {
        this.load.image("recommencer", "./assets/images/ui/Recommencer.png");
        this.load.image("menuPrincipal", "./assets/images/ui/Menu principal.png");
        this.load.image("RIP", "./assets/images/ui/Vous êtes mort.png");
    }
  
    create() {
        this.rip = this.add.image(0, 0, "RIP").setOrigin(0, 0);
        this.rip.setPosition(325, 200);
        this.rip.setAlpha(0);

        this.tweens.add({
            targets: this.rip,
            alpha: 1,
            duration: 2000
        });

        this.recommencer = this.add.image(0, 0, "recommencer").setOrigin(0, 0);
        this.recommencer.setPosition(50, 590);
        this.recommencer.setInteractive();
        this.recommencer.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Jeu");
            }
        });

        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0, 0);
        this.menuPrincipal.setPosition(910, 600);
        this.menuPrincipal.setInteractive();
        this.menuPrincipal.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
            }
        });
    }
  
    update() {}
}