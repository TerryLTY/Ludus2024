class Jeu extends Phaser.Scene {
    constructor() {
        super({
            key: "Jeu"
        });
    }

    preload() {
        // Tiled
        this.load.tilemapTiledJSON("carte_json", "./assets/images/tiled_images/carte.json");
        this.load.image("01background", "./assets/images/tiled_images/01 background.png");
        this.load.image("mainLevBuild", "./assets/images/tiled_images/main_lev_build.png");

        this.load.image("quitter", "./assets/images/ui/Quitter.png");

        this.load.spritesheet(
            "player",
            "./assets/images/characters/player_spritesheet.png", {
                frameWidth: 32,
                frameHeight: 32
            }
        );
    }

    create() {
        // Tilemap
        const maCarte = this.make.tilemap({
            key: "carte_json"
        });

        // Tileset
        const tileset01Background = maCarte.addTilesetImage("01 background", "01background");
        const tilesetMainLevBuild = maCarte.addTilesetImage("main_lev_build", "mainLevBuild");

        // Calques
        const bgLayer = maCarte.createLayer("fond", [tileset01Background], 0, 0);
        const collisionLayer = maCarte.createLayer("sol", [tilesetMainLevBuild], 0, 0);

        collisionLayer.setCollisionByProperty({
            collision: true
        });

        // Joueur
        this.player = this.physics.add.sprite(300, 450, "player");
        this.player
            .setScale(1.3)
            .setSize(16, 16)
            .setOffset(9, 16);
        this.player.body.setGravityY(1000);
        this.player.setBounce(0);
        this.jumpCount = 0;
        this.jumpKeyReleased = true;

        // Animations
        this.isFalling = false;
        this.isJumping = false;
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", {
                start: 12,
                end: 16
            }),
            frameRate: 10,
            repeat: -1
        });
        this.player.anims.play("idle");
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("player", {
                start: 23,
                end: 29
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("player", {
                start: 18,
                end: 19
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "fall",
            frames: this.anims.generateFrameNumbers("player", {
                start: 20,
                end: 22
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "die",
            frames: this.anims.generateFrameNumbers("player", {
                start: 8,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: 0
        });

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

        // Caméra
        this.cameras.main.setBounds(
            0,
            0,
            config.width,
            config.height
        );
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.25);

        // Bouton
        this.quitter = this.add.image(0, 0, "quitter").setOrigin(0, 0).setScrollFactor(0).setScale(0.8);
        this.quitter.setPosition(970, 550);
        this.quitter.setInteractive();
        this.quitter.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
            }
        });
    }

    update() {
        this.handleMovement();
        this.handleAnimations();
        this.handleDeath();
        this.nextLevel()
    }

    handleMovement() {
        const walkSpeed = 150;
        const runSpeed = 300;
        let velocity = walkSpeed;

        // Courir
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
    }

    handleAnimations() {
        // Touche au sol
        if (!this.player.body.blocked.down) {
            if (this.player.body.velocity.y < 0 && !this.isJumping) {
                this.player.anims.play("jump", true);
                this.isFalling = false;
            } else if (!this.isFalling) {
                this.player.anims.play("fall", true);
            }
        } else {
            this.isFalling = false;
            this.isJumping = false;
            if (this.player.body.velocity.x !== 0) {
                this.player.anims.play("walk", true);
            } else {
                this.player.anims.play("idle", true);
            }
        }
    }

    handleDeath() {
        // Tombe dans vide
        if (this.player.y > config.height + this.player.height) {
            this.scene.start("PartieTerminee");
        }
    }

    nextLevel() {
        // Tombe dans vide
        if (this.player.x > config.width + this.player.width) {
            this.scene.start("Victoire");
        }
    }
}