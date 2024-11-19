class Loading extends Phaser.Scene {
    constructor() {
        super({
            key: "Loading"
        });
    }

    preload() {
        //                               MENU

        // Menu
        this.load.image("logo", "./assets/images/ui/Gluttony.png");
        this.load.image("bgAccueil", "./assets/images/backgrounds/bg_accueil.png");
        this.load.image("faitPar", "./assets/images/ui/Fait par.png");
        this.load.image("menuPrincipal", "./assets/images/ui/Menu principal.png");
        this.load.image("RIP", "./assets/images/ui/Vous êtes mort.png");
        this.load.image("recommencer", "./assets/images/ui/Recommencer.png");
        this.load.image("felicitations", "./assets/images/ui/Felicitations.png");

        // Boutons
        this.load.image("commencer", "./assets/images/ui/Commencer.png");
        this.load.image("credits", "./assets/images/ui/Credits.png");
        this.load.image("commentJouer", "./assets/images/ui/Comment jouer.png");
        this.load.image("sons", "./assets/images/ui/Sons.png");
        this.load.image("tutoriel", "./assets/images/ui/Tutoriel.png");
        this.load.image("retour", "./assets/images/ui/Retour.png");

        // Sons
        this.load.audio('buttonSound', './assets/audio/sfx/button-click.mp3');
        this.load.audio('winSound', './assets/audio/sfx/win.mp3');
        this.load.audio('deathSound', './assets/audio/sfx/gameover.mp3');

        // Musiques
        this.load.audio('accueilMusic', './assets/audio/musique/shadowsofthenight.wav');



        //                               JEU

        // Tiled
        this.load.tilemapTiledJSON("carte1_json", "./assets/images/tiled_images/carte1.json");
        this.load.image("mainLevBuild", "./assets/images/tiled_images/main_lev_build.png");

        // Boutons
        this.load.image("quitter", "./assets/images/ui/Quitter.png");

        // Items
        this.load.image("item", "./assets/images/items/item_dash.png");
        this.load.image("coeur", "./assets/images/ui/pixel-heart.png");

        // Player
        this.load.spritesheet(
            "player",
            "./assets/images/characters/player_spritesheet.png", {
                frameWidth: 32,
                frameHeight: 32
            }
        );

        // Sons
        this.load.audio('jumpSound', './assets/audio/sfx/jump.wav');
        this.load.audio('dashSound', './assets/audio/sfx/dash.wav');
        this.load.audio('heartbeatSound', './assets/audio/sfx/heartbeat-loop.mp3');
        this.load.audio('dashItemSound', './assets/audio/sfx/retro-coin.mp3');
        this.load.audio('cri', './assets/audio/sfx/willhelm-scream.wav');
        this.load.audio('deny', './assets/audio/sfx/wrong.mp3');
        this.load.audio('doorSound', './assets/audio/sfx/door.wav');

        // Musiques
        this.load.audio('jeuMusic1', './assets/audio/musique/danceofthedeaddark.wav');
    }

    create() {
        this.logo = this.add.image(188, 80, "logo").setOrigin(0, 0);
        this.logo.setPosition(465, 150);

        this.tweens.add({
            targets: this.logo,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            onComplete: () => {
                this.scene.start("Accueil")
            }
        })
    }

    update() {}
}