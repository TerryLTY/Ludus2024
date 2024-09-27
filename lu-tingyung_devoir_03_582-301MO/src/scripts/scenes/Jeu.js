class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: "Jeu" });
    }

    preload() {
        // Tiled
        this.load.tilemapTiledJSON("carte_json", "./assets/images/tiled_images/carte.json");
        this.load.image("01background", "./assets/images/tiled_images/01 background.png");
        this.load.image("mainLevBuild", "./assets/images/tiled_images/main_lev_build.png");

        this.load.image("player", "./assets/images/characters/attack-01.png")
        this.load.image("quitter", "./assets/images/ui/Quitter.png");
    }

    create() {
        // Tilemap
        const maCarte = this.make.tilemap({ key: "carte_json" });

        // Tileset
        const tileset01Background = maCarte.addTilesetImage("01 background", "01background");
        const tilesetMainLevBuild = maCarte.addTilesetImage("main_lev_build", "mainLevBuild");

        // Calques
        const bgLayer = maCarte.createLayer("fond", [tileset01Background], 0, 0);
        const collisionLayer = maCarte.createLayer("sol", [tilesetMainLevBuild], 0, 0);
        // Si un calque contien des zones de collision (variable custom dans Tiled)
        collisionLayer.setCollisionByProperty({ collision: true });

        // Joueur
        this.player = this.physics.add.sprite(300, 150, "player");
        this.player.setOffset(0, -5);
        this.player.setBounce(0);
        this.player.body.setGravityY(1000);
        this.jumpCount = 0;
        this.jumpKeyReleased = true;

        // Collision
        this.physics.add.collider(this.player, collisionLayer, () => {
            this.jumpCount = 0;
            this.jumpKeyReleased = true;
        });

        // Touches
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.SPACE,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });

        // Bouton
        this.quitter = this.add.image(0, 0, "quitter").setOrigin(0, 0);
        this.quitter.setPosition(25, 500);
        this.quitter.setInteractive();
        this.quitter.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
            }
        });
    }

    update() {
        // Vitesse de marche et de course
        const walkSpeed = 150;
        const runSpeed = 300;
        let velocity = walkSpeed;

        // Si Shift est pressé, on court
        if (this.keys.shift.isDown) {
            velocity = runSpeed;
        }

        // Déplacements
        if (this.keys.left.isDown) {
            this.player.setVelocityX(-velocity);
            this.player.flipX = true;
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(velocity);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
        }

        // Saut
        if (this.keys.up.isUp) {
            this.jumpKeyReleased = true; // La touche est relâchée
        }
        if (
            this.keys.up.isDown &&
            this.jumpKeyReleased &&
            (this.player.body.touching.down || this.jumpCount < 2)
        ) {
            this.player.setVelocityY(-500);
            this.jumpCount++;
            this.jumpKeyReleased = false;
        }
        // Mort
        if (this.player.y > config.height + this.player.height) {
            this.player.setPosition(300, 150);
        }
    }
}