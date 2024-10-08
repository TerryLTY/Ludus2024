class Victoire extends Phaser.Scene {
    constructor()  {
        super({ key:"Victoire" });
    }

    preload() {
        this.load.image("menuPrincipal", "./assets/images/ui/Menu principal.png");
    }
  
    create() {
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