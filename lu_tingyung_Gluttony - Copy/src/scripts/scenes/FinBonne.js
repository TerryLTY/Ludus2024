class FinBonne extends Phaser.Scene {
    constructor() {
        super({
            key: "FinBonne"
        });
    }

    preload() { }

    create() {
        this.felicitations = this.add.image(0, 0, "felicitations")
            .setOrigin(0.5, 0.5)
            .setPosition(650, 150)
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

        this.add.text(100, 300, "Vous entrez dans la chambre de Jean, renforcé par tous les fruits que vous avez consommé. ");
        this.add.text(100, 350, "Jean tire des boules de feux, mais cela prouve futile, car vous les esquivez tous.")
        this.add.text(100, 400, "Pris au dépourvu, Jean tombe à terre, te laissant la chance de le finir.")
        this.add.text(100, 450, "Vous le fixez avec de la haine et lui, vous fixe avec un un regard d'effrois")
        this.add.text(100, 500, "En vous souvenant de sa trahison, vous le poussez par la fenêtre qui l'enmène au profondeur de l'enfer'")

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

    update() { }

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