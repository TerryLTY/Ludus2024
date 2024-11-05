class CommentJouer extends Phaser.Scene {
    constructor() {
        super({
            key: "CommentJouer"
        });
    }

    preload() {
        this.load.image("retour", "./assets/images/ui/Retour.png");
        this.load.image("bgAccueil", "./assets/images/backgrounds/bg_accueil.png");
    }

    create() {
        this.bgAccueil = this.add.image(0, 0, "bgAccueil").setOrigin(0, 0);
        this.bgAccueil.setPosition(-525, -250);

        this.retour = this.add.image(0, 0, "retour").setOrigin(0, 0);
        this.retour.setPosition(1050, 600);
        this.retour.setInteractive();
        this.retour.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
            }
        });
    }

    update() {}
}