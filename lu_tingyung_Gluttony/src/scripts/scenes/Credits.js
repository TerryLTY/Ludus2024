class Credits extends Phaser.Scene {
    constructor() {
        super({
            key: "Credits"
        });
    }

    preload() {
        this.load.image("faitPar", "./assets/images/ui/Fait par.png");
        this.load.image("retour", "./assets/images/ui/Retour.png");
        this.load.image("bgAccueil", "./assets/images/backgrounds/bg_accueil.png");
    }

    create() {
        this.bgAccueil = this.add.image(0, 0, "bgAccueil").setOrigin(0, 0);
        this.bgAccueil.setPosition(-525, -250);

        this.faitPar = this.add.image(0, 0, "faitPar").setOrigin(0, 0);

        this.retour = this.add.image(0, 0, "retour").setOrigin(0, 0);
        this.retour.setPosition(1050, 600);
        this.retour.setInteractive();
        this.retour.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
                this.buttonSound.play();
            }
        });

        // Sons
        this.buttonSound = this.sound.add("buttonSound", { volume: 0.4 });
    }

    update() {}
}