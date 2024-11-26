class Victoire extends Phaser.Scene {
    constructor() {
        super({
            key: "Victoire"
        });
    }

    preload() {}

    create() {
        this.felicitations = this.add.image(0, 0, "felicitations").setOrigin(0, 0);
        this.felicitations.setPosition(350, 200);
        this.felicitations.setAlpha(0.6);

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


        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0, 0);
        this.menuPrincipal.setPosition(910, 590);
        this.menuPrincipal.setInteractive();
        this.menuPrincipal.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
                this.buttonSound.play();
                this.winSound.stop()
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
        this.winSound = this.sound.add("winSound", {
            volume: 0.8
        });
        this.winSound.play()
    }

    update() {}
}