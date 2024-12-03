class Pretext extends Phaser.Scene {
    constructor() {
        super({
            key: "Pretext"
        });
    }

    preload() { }

    create() {
        this.add.text(100, 100, "Vous êtes Vincent, aventurier qui voyage avec votre partenaire, Jean.");
        this.add.text(100, 150, "Vous explorez le château abandonné ensemble et arrivé au sommet, vous trouvez un coffre.")
        this.add.text(100, 200, "Jean ouvre le coffre et trouve des artefacts sacrés qui lui remplit de puissance.")
        this.add.text(100, 250, "Vous l'approchez pour voir ce qu'il a trouvé,")
        this.add.text(100, 300, "mais il te pousse par la fenêtre en déclarant qu'il ne partagerais pas son trésor.")
        this.add.text(100, 350, "Par un pur miracle, vous atterrissez dans un buisson, sauvant votre vie.")
        this.add.text(100, 400, "Porté par une vengeance sanglante, vous décidez de remonter le chateau pour punir Jean.")

        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0.5, 0.5)
            .setPosition(1070, 650)
            .setInteractive();
        this.boutonScene(this.menuPrincipal, "Accueil")


        // Sons
        this.buttonSound = this.sound.add("buttonSound", {
            volume: 0.4
        });
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