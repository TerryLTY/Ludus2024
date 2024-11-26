class Credits extends Phaser.Scene {
    constructor() {
        super({
            key: "Credits"
        });
    }

    preload() {}

    create() {
        this.bgAccueil = this.add.image(0, 0, "bgAccueil").setOrigin(0, 0);
        this.bgAccueil.setPosition(-525, -250);

        this.faitPar = this.add.image(0, 0, "faitPar").setOrigin(0, 0);

        this.retour = this.add.image(0, 0, "retour")
            .setOrigin(0.5, 0.5)
            .setPosition(1150, 650)
            .setInteractive();
        this.boutonScene(this.retour, "Accueil")

        // Sons
        this.buttonSound = this.sound.add("buttonSound", {
            volume: 0.4
        });
    }

    update() {}

    boutonScene(bouton, scene) {
        bouton.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start(scene);
                this.buttonSound.play();
                this.accueilMusic.stop();
            }
        });

        bouton.on("pointerover", () => {
            this.tweens.add({
                targets: bouton,
                scale: 1.1,
                duration: 100
            });
        });
        bouton.on("pointerout", () => {
            this.tweens.add({
                targets: bouton,
                scale: 1,
                duration: 100
            });
        });
    }
}