class Accueil extends Phaser.Scene {
    constructor() {
        super({
            key: "Accueil"
        });
    }

    preload() {}

    create() {
        niveauActuel = "jeu"

        this.bgAccueil = this.add.image(0, 0, "bgAccueil")
            .setOrigin(0, 0)
            .setPosition(-525, -250);

        this.logo = this.add.image(188, 80, "logo")
            .setOrigin(0.5, 0.5)
            .setPosition(650, 220)
        this.logo.postFX.addShadow(0.8, 1.3, 0.1, 1.5, 0x000000, 2, 2)

        // Boutons
        this.sons = this.add.image(0, 0, "sons")
            .setOrigin(0.5, 0.5)
            .setPosition(1180, 50)
            .setInteractive();
        this.sons.on("pointerdown", (pointer) => {
            // fermer sons et le mettre en gris
            if (pointer.leftButtonDown()) {
                if (!game.sound.mute) {
                    game.sound.mute = true;
                    this.sons.setTint(0x333333)
                } else {
                    game.sound.mute = false;
                    this.sons.clearTint()
                }
            }
        });
        this.boutonHover(this.sons)

        this.commencer = this.add.image(0, 0, "commencer")
            .setOrigin(0.5, 0.5)
            .setPosition(650, 350)
            .setInteractive();
        this.boutonHover(this.commencer)

        this.commencer.once("pointerdown", () => {
            this.accueilMusic.stop();
            const fx = this.cameras.main.postFX.addWipe();
            this.scene.transition({
                target: "Jeu",
                duration: 1000,
                moveBelow: true,
                onUpdate: (progress) => {
                    fx.progress = progress;
                }
            });
        });

        this.credits = this.add.image(0, 0, "credits")
            .setOrigin(0.5, 0.5)
            .setPosition(150, 650)
            .setInteractive();
        this.boutonScene(this.credits, "Credits")

        this.commentJouer = this.add.image(0, 0, "commentJouer")
            .setOrigin(0.5, 0.5)
            .setPosition(1070, 650)
            .setInteractive();
        this.boutonScene(this.commentJouer, "CommentJouer")


        // Sons
        this.buttonSound = this.sound.add("buttonSound", {
            volume: 0.4
        });

        // Musique
        this.accueilMusic = this.sound.add("accueilMusic", {
            volume: 0.4
        });
        this.accueilMusic.play();

        // Animation titre
        this.tweens.add({
            targets: this.logo,
            scale: 1.1,
            duration: 3000,
            repeat: -1,
            yoyo: true
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