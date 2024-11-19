class Jeu extends Phaser.Scene {
    constructor() {
        super({
            key: "Jeu"
        });
    }

    preload() {}

    create() {
        // Tilemap
        const maCarte = this.make.tilemap({
            key: "carte1_json"
        });

        // Tileset
        const tilesetMainLevBuild = maCarte.addTilesetImage("main_lev_build", "mainLevBuild");

        // Calques
        const bgLayer = maCarte.createLayer("fond", [tilesetMainLevBuild], 0, 0);
        const collisionLayer = maCarte.createLayer("sol", [tilesetMainLevBuild], 0, 0);
        const collisionLayer2 = maCarte.createLayer("sol2", [tilesetMainLevBuild], 0, 0);
        const goalLayer = maCarte.createLayer("objectif", [tilesetMainLevBuild], 0, 0);

        collisionLayer.setCollisionByProperty({
            collision: true
        });

        collisionLayer2.setCollisionByProperty({
            collision: true
        });

        goalLayer.setCollisionByProperty({
            collision: true
        });


        // Joueur
        this.player = this.physics.add.sprite(50, 250, "player");
        this.player
            .setScale(1)
            .setSize(16, 16)
            .setOffset(9, 16);
        this.player.body.setGravityY(1000);
        this.player.hp = 3;
        this.jumpCount = 0;
        this.jumpKeyReleased = true;
        this.dashCount = 2;

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

        // Musique
        this.jeuMusic1 = this.sound.add("jeuMusic1");
        this.jeuMusic1.play();

        // Sons
        this.jumpSound = this.sound.add("jumpSound");
        this.dashSound = this.sound.add("dashSound");
        this.heartbeatSound = this.sound.add("heartbeatSound", {
            loop: true,
            rate: 0.6,
            volume: 0.5
        });
        this.dashItemSound = this.sound.add("dashItemSound", {
            volume: 0.4
        });
        this.criSound = this.sound.add("cri", {
            volume: 0.4
        });
        this.denySound = this.sound.add("deny", {
            volume: 0.2
        });
        this.doorSound = this.sound.add("doorSound", {
            volume: 0.5
        });
        this.buttonSound = this.sound.add("buttonSound", {
            volume: 0.4
        });

        // Item
        this.item = this.physics.add.image(675, 550, "item").setScale(2);
        this.coeur = this.physics.add.image(950, 625, "coeur").setScale(0.04);

        // Collision
        this.physics.add.collider(this.player, collisionLayer, () => {
            this.jumpCount = 0;
            this.jumpKeyReleased = true;
        });

        this.physics.add.collider(this.player, collisionLayer2);

        this.physics.add.collider(this.player, goalLayer, () => {
            this.doorSound.play();
            this.scene.start("Jeu2");
            this.heartbeatSound.stop();
            this.jeuMusic1.stop();
            const sauvegarde = {
                vies: this.player.hp
            };
            localStorage.setItem('sauvegardeJeu', JSON.stringify(sauvegarde));
        });

        // Touches
        this.keys = this.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
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
        this.cameras.main.setZoom(1.75);

        // Bouton
        this.quitter = this.add.image(0, 0, "quitter").setOrigin(0, 0).setScrollFactor(0).setScale(0.3);
        this.quitter.setPosition(945, 535);
        this.quitter.setInteractive();
        this.quitter.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
                this.buttonSound.play();
                this.heartbeatSound.stop();
                this.jeuMusic1.stop();
            }
        });
        this.quitter.on("pointerover", () => {
            this.tweens.add({
                targets: this.quitter,
                scale: 0.32,
                duration: 100
            });
        });
        this.quitter.on("pointerout", () => {
            this.tweens.add({
                targets: this.quitter,
                scale: 0.3,
                duration: 100
            });
        });

        // Vies
        this.vie1 = this.add.image(0, 0, "coeur").setOrigin(0, 0).setScrollFactor(0).setScale(0.05);
        this.vie1.setPosition(295, 175);
        this.vie1.setInteractive();

        this.vie2 = this.add.image(0, 0, "coeur").setOrigin(0, 0).setScrollFactor(0).setScale(0.05);
        this.vie2.setPosition(330, 175);
        this.vie2.setInteractive();

        this.vie3 = this.add.image(0, 0, "coeur").setOrigin(0, 0).setScrollFactor(0).setScale(0.05);
        this.vie3.setPosition(365, 175);
        this.vie3.setInteractive();
    }

    update() {
        this.handleMovement();
        this.handleItems();
        this.handleDeath();
        this.handleAnimations();
    }

    handleMovement() {
        const walkSpeed = 125;
        const runSpeed = 225;
        let velocity = walkSpeed;

        // Run
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
        if (this.keys.jump.isUp) {
            this.jumpKeyReleased = true; // La touche est relâchée
        }
        if (
            this.keys.jump.isDown &&
            this.jumpKeyReleased &&
            (this.player.body.touching.down || this.jumpCount < 2)
        ) {
            this.player.setVelocityY(-400);
            this.jumpCount++;
            this.jumpKeyReleased = false;
            this.jumpSound.play()
        }

        // Dash
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown() && this.keys.up.isDown && this.keys.left.isDown && this.player.alpha == 1) {
                this.tweens.add({
                    targets: this.player,
                    x: this.player.x - 80,
                    y: this.player.y - 80,
                    duration: 100
                })
                this.dash()
                this.player.setVelocityY(-100);
            } else if (pointer.leftButtonDown() && this.keys.up.isDown && this.keys.right.isDown & this.player.alpha == 1) {
                this.tweens.add({
                    targets: this.player,
                    x: this.player.x + 80,
                    y: this.player.y - 80,
                    duration: 100
                })
                this.dash()
                this.player.setVelocityY(-100);
            } else if (pointer.leftButtonDown() && this.keys.up.isDown && this.player.alpha == 1) {
                this.tweens.add({
                    targets: this.player,
                    y: this.player.y - 80,
                    duration: 100
                })
                this.dash()
                this.player.setVelocityY(-100)
            } else if (pointer.leftButtonDown() && this.player.flipX && this.player.alpha == 1) {
                this.tweens.add({
                    targets: this.player,
                    x: this.player.x - 80,
                    duration: 100
                })
                this.dash()
            } else if (pointer.leftButtonDown() && this.player.alpha == 1) {
                this.tweens.add({
                    targets: this.player,
                    x: this.player.x + 80,
                    duration: 100
                })
                this.dash()
            }
        })
    }

    handleItems() {
        // Coeurs
        this.physics.add.overlap(
            this.player,
            this.coeur,
            () => {
                if (this.player.hp == 2 && this.coeur.alpha == 1) {
                    this.coeur.destroy();
                    this.player.hp++;
                    this.vie3.setAlpha(1);
                    this.dashItemSound.play()
                } else if (this.player.hp == 1 && this.coeur.alpha == 1) {
                    this.coeur.destroy();
                    this.player.hp++;
                    this.vie2.setAlpha(1);
                    this.vieTween.stop();
                    this.heartbeatSound.stop();
                    this.dashItemSound.play()
                } else {
                    this.coeur.destroy();
                    this.denySound.play();

                }
            }
        );

        // Dash items
        this.physics.add.overlap(
            this.player,
            this.item,
            () => {
                if (this.item.alpha == 1) {
                    this.dashItemSound.play()
                    this.player.setAlpha(1);
                    this.player.clearTint();
                    this.tweens.add({
                        targets: this.item,
                        alpha: {
                            from: 0,
                            to: 0.3
                        },
                        duration: 500,
                        repeat: 2,
                        yoyo: true,
                        onComplete: () => {
                            this.item.setAlpha(1);
                        }
                    })
                    if (this.flashTween) {
                        this.flashTween.stop()
                    }
                } else {

                }

            }
        );

        this.spinTween = this.tweens.add({
            targets: this.item,
            rotation: 30,
            duration: 5000,
            repeat: -1
        })
    }

    dash() {
        this.dashSound.play();
        this.player.setTint(0x7fdcff);
        this.player.setAlpha(0.8)
        this.flashTween = this.tweens.add({
            targets: this.player,
            alpha: {
                from: 0.8,
                to: 0.9
            },
            duration: 100,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
                this.player.clearTint();
                this.player.setAlpha(1);
            }
        })
    }

    handleDeath() {
        // Tombe dans le vide
        if (this.player.y > config.height + this.player.height && this.player.hp == 1) {
            this.scene.start("PartieTerminee");
            this.heartbeatSound.stop();
            this.jeuMusic1.stop()
        } else if (this.player.y > config.height + this.player.height) {
            this.criSound.play();
            this.player.hp--;
            this.dash();
            this.dashSound.stop();
            this.player.setPosition(50, 100);
            this.vie()
        }
    }

    vie() {
        if (this.player.hp == 2) {
            this.vie3.setAlpha(0)
        } else if (this.player.hp == 1) {
            this.vie2.setAlpha(0);
            this.vieTween = this.tweens.add({
                targets: this.vie1,
                scale: 0.06,
                duration: 580,
                repeat: -1,
                yoyo: true
            });
            this.heartbeatSound.play()
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

    sauvegarde() {

    }

}