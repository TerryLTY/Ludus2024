class Accueil extends Phaser.Scene {
    constructor() {
        super({
            key: "Accueil"
        });
    }

    preload() {
        this.load.image("logo", "./assets/images/ui/Gluttony.png");
        this.load.image("bgAccueil", "./assets/images/backgrounds/bg_accueil.png");
        this.load.image("commencer", "./assets/images/ui/Commencer.png");
        this.load.image("credits", "./assets/images/ui/Credits.png");
        this.load.image("commentJouer", "./assets/images/ui/Comment jouer.png");
        this.load.image("sons", "./assets/images/ui/Sons.png");

        this.load.audio('buttonSound', './assets/audio/sfx/button-click.mp3');

        this.load.audio('accueilMusic', './assets/audio/musique/shadowsofthenight.wav');
    }

    create() {
        this.bgAccueil = this.add.image(0, 0, "bgAccueil").setOrigin(0, 0);
        this.bgAccueil.setPosition(-525, -250);

        this.logo = this.add.image(188, 80, "logo").setOrigin(0, 0);
        this.logo.setPosition(465, 150);

        /*
        this.sons = this.add.image(0, 0, "sons").setOrigin(0, 0);
        this.sons.setPosition(1125, 25);
        */

        this.commencer = this.add.image(0, 0, "commencer").setOrigin(0, 0);
        this.commencer.setPosition(535, 300);
        this.commencer.setInteractive();
        this.commencer.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Jeu");
                this.buttonSound.play();
                this.accueilMusic.stop()
            }
        });

        this.credits = this.add.image(0, 0, "credits").setOrigin(0, 0);
        this.credits.setPosition(50, 600);
        this.credits.setInteractive();
        this.credits.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Credits");
                this.buttonSound.play();
                this.accueilMusic.stop();
            }
        });

        this.commentJouer = this.add.image(0, 0, "commentJouer").setOrigin(0, 0);
        this.commentJouer.setPosition(890, 600);
        this.commentJouer.setInteractive();
        this.commentJouer.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("CommentJouer");
                this.buttonSound.play();
                this.accueilMusic.stop();
            }
        });

        // Sons
        this.buttonSound = this.sound.add("buttonSound", { volume: 0.4 });

        // Musique
        this.accueilMusic = this.sound.add("accueilMusic", { volume: 0.4 });
        this.accueilMusic.play();

        // animation titre
        this.tweens.add({
            targets: this.logo,
            scale: 1.1,
            duration: 3000,
            repeat: -1,
            yoyo: true
        });
    }

    update() { }
}