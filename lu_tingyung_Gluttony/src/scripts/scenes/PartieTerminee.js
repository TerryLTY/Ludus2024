class PartieTerminee extends Phaser.Scene {
    constructor() {
        super({
            key: "PartieTerminee"
        });
    }

    preload() {}

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
                this.buttonSound.play();
                this.deathSound.stop()
            }
        });
        this.recommencer.on("pointerover", () => {
            this.tweens.add({
                targets: this.recommencer,
                scale: 1.1,
                duration: 100
            });
        });
        this.recommencer.on("pointerout", () => {
            this.tweens.add({
                targets: this.recommencer,
                scale: 1,
                duration: 100
            });
        });


        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0, 0);
        this.menuPrincipal.setPosition(910, 590);
        this.menuPrincipal.setInteractive();
        this.menuPrincipal.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
                this.buttonSound.play();
                this.deathSound.stop()
            }
        });
        this.menuPrincipal.on("pointerover", () => {
            this.tweens.add({
                targets: this.menuPrincipal,
                scale: 1.1,
                duration: 100
            });
        });
        this.menuPrincipal.on("pointerout", () => {
            this.tweens.add({
                targets: this.menuPrincipal,
                scale: 1,
                duration: 100
            });
        });


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
}