class Loading extends Phaser.Scene {
    constructor() {
        super({
            key: "Loading"
        });
    }

    preload() {
        //                               MENU

        // Menu
        this.load.image("logo", "./assets/images/ui/gluttony.png");
        this.load.image("bgAccueil", "./assets/images/backgrounds/bg_accueil.png");
        this.load.image("faitPar", "./assets/images/ui/fait_par.png");
        this.load.image("menuPrincipal", "./assets/images/ui/menu_principal.png");
        this.load.image("RIP", "./assets/images/ui/vous_etes_mort.png");
        this.load.image("recommencer", "./assets/images/ui/recommencer.png");
        this.load.image("felicitations", "./assets/images/ui/felicitations.png");

        // Boutons
        this.load.image("commencer", "./assets/images/ui/commencer.png");
        this.load.image("credits", "./assets/images/ui/credits.png");
        this.load.image("commentJouer", "./assets/images/ui/comment_jouer.png");
        this.load.image("sons", "./assets/images/ui/sons.png");
        this.load.image("tutoriel", "./assets/images/ui/tutoriel.png");
        this.load.image("retour", "./assets/images/ui/retour.png");

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

        this.load.tilemapTiledJSON("carte2_json", "./assets/images/tiled_images/carte2.json");
        this.load.image("background01", "./assets/images/tiled_images/01 background.png");
        this.load.image("otherAndDecorative", "./assets/images/tiled_images/other_and_decorative.png");

        // Boutons
        this.load.image("quitter", "./assets/images/ui/quitter.png");

        // Items
        this.load.image("item", "./assets/images/items/item_dash.png");
        this.load.image("coeur", "./assets/images/ui/pixel-heart.png");
        this.load.image("fruit", "./assets/images/items/fruit.png");

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
        this.logo = this.add.image(188, 80, "logo")
            .setOrigin(0.5, 0.5)
            .setPosition(650, 220);

        this.tweens.add({
            targets: this.logo,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            onComplete: () => {
                this.scene.start("Accueil")
            }
        })

        // Animations
        this.createAnimation("idle", "player", 12, 16);
        this.createAnimation("walk", "player", 23, 29);
        this.createAnimation("jump", "player", 18, 19);
        this.createAnimation("fall", "player", 20, 22);
        this.createAnimation("die", "player", 8, 11);
    }

    update() {}

    createAnimation(key, spritesheet, firstFrame, lastFrame) {
        this.anims.create({
            key: key,
            frames: this.anims.generateFrameNumbers(spritesheet, {
                start: firstFrame,
                end: lastFrame
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}