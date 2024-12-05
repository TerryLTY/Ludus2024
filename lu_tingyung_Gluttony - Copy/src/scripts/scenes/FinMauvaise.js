class FinMauvaise extends Phaser.Scene {
    constructor() {
        super({
            key: "FinMauvaise"
        });
    }

    preload() { }

    create() {
        this.fin = this.add.image(0, 0, "fin")
            .setOrigin(0.5, 0.5)
            .setPosition(600, 150)
        
        this.add.text(100, 250, "Vous entrez dans la chambre de Jean, mais vous sentez un grondement dans votre ventre.");
        this.add.text(100, 300, "Jean tire des boules de feux et vous les evitez à peine.")
        this.add.text(100, 350, "En confirmant son avantage, Jean avance pour porter le coup de grace.")
        this.add.text(100, 400, "Empalé par sa lame robuste, vous tombez sur vos genoux.")
        this.add.text(100, 450, "Avant que votre vision se dissipe complètement, vous entendez le rire d'arrogance de votre ennemie juré.")

        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0.5, 0.5)
            .setPosition(1070, 650)
            .setInteractive();
        this.boutonScene(this.menuPrincipal, "Accueil")


        // Sons
        this.buttonSound = this.sound.add("buttonSound", {
            volume: 0.4
        });

        this.deathSound = this.sound.add("deathSound", {
            volume: 0.2
        });
        this.deathSound.play()
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