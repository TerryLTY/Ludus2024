class PartieTerminee extends Phaser.Scene {
    constructor() {
        super({
            key: "PartieTerminee"
        });
    }

    preload() {}

    create() {
        this.rip = this.add.image(0, 0, "RIP")
            .setOrigin(0, 0)
            .setPosition(325, 200)
            .setAlpha(0);

        this.tweens.add({
            targets: this.rip,
            alpha: 1,
            duration: 2000
        });

        this.recommencer = this.add.image(0, 0, "recommencer")
            .setOrigin(0.5, 0.5)
            .setPosition(230, 645)
            .setInteractive();
        this.recommencer.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                if (niveauActuel == "Jeu2") {
                    this.scene.start("Jeu2");
                    this.buttonSound.play();
                    this.deathSound.stop()
                } else {
                    this.scene.start("Jeu");
                    this.buttonSound.play();
                    this.deathSound.stop()
                }
            }
        });
        this.boutonHover(this.recommencer)


        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0.5, 0.5)
            .setPosition(1070, 650)
            .setInteractive();
        this.menuPrincipal.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
                this.buttonSound.play();
                this.deathSound.stop()
            }
        });
        this.boutonHover(this.menuPrincipal)


        // Sons
        this.buttonSound = this.sound.add("buttonSound", {
            volume: 0.4
        });
        this.deathSound = this.sound.add("deathSound", {
            volume: 0.2
        });
        this.deathSound.play()
    }

    update() {}

    boutonHover(bouton) {
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