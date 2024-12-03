class FinBonne extends Phaser.Scene {
    constructor() {
        super({
            key: "FinBonne"
        });
    }

    preload() {}

    create() {
        this.add.text(100, 100, "Vous entrez dans la chambre de Jean, renforcé par tout les fruits que vous avez consommé. ");
        this.add.text(100,150, "Jean tire des boules de feux, mais cela prouve futile, car vous les esquivez tous.")
        this.add.text(100,200, "Pris au depourvu, Jean tombe à terre, te laissant la chance de le finir.")
        this.add.text(100,250, "Vous le fixez avec de la haine et lui, vous fixe avec un un regard d'effrois")
        this.add.text(100, 300, "En vous souvenant de sa trahison, vous le poussez par la fenêtre qui lui mène vers une grande chûte vers sa fin.")

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