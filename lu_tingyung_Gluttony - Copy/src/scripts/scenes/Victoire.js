class Victoire extends Phaser.Scene {
    constructor() {
        super({
            key: "Victoire"
        });
    }

    preload() {}

    create() {
        this.felicitations = this.add.image(0, 0, "felicitations")
            .setOrigin(0.5, 0.5)
            .setPosition(650, 250)
            .setAlpha(0.6);

        // Animation felicitations
        this.tweens.add({
            targets: this.felicitations,
            alpha: 1,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.felicitations,
            scale: 1.05,
            duration: 700,
            yoyo: true,
            repeat: -1
        });


        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0.5, 0.5)
            .setPosition(1070, 650)
            .setInteractive();
        this.boutonScene(this.menuPrincipal, "Accueil")


        // Sons
        this.buttonSound = this.sound.add("buttonSound", {
            volume: 0.4
        });
        this.winSound = this.sound.add("winSound", {
            volume: 0.8
        });
        this.winSound.play()
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