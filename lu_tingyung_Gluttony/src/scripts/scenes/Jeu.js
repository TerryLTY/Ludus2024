class Jeu extends Phaser.Scene {
    constructor() {
        super({
            key: "Jeu"
        });
    }

    preload() {}

    create() {
        // Créer sauvegarde
        const sauvegarde = JSON.parse(localStorage.getItem('sauvegardeJeu'));

        niveauActuel = "Jeu"

        this.physics.world.TILE_BIAS = 18;

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

        this.isFalling = false;
        this.isJumping = false;

        // Musique
        this.jeuMusic1 = this.sound.add("jeuMusic1");
        this.jeuMusic1.play();

        // Sons
        this.jumpSound = this.sound.add("jumpSound");
        this.dashSound = this.sound.add("dashSound");
        this.heartbeatSound = this.sound.add("heartbeatSound", {
            rate: 0.6,
            volume: 0.5,
            loop: true
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
        this.coeur = this.physics.add.image(950, 625, "coeur");

        // Collision
        this.physics.add.collider(this.player, collisionLayer, () => {
            this.jumpCount = 0;
            this.jumpKeyReleased = true;
        });

        this.physics.add.collider(this.player, collisionLayer2);

        this.physics.add.collider(this.player, goalLayer, () => {
            // Sauvegarde le jeu à l'objectif
            const sauvegarde = {
                vies: this.player.hp
            };
            localStorage.setItem('sauvegardeJeu', JSON.stringify(sauvegarde));

            this.doorSound.play();
            this.scene.start("Jeu2");
            this.heartbeatSound.stop();
            this.jeuMusic1.stop();

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
        this.quitter = this.add.image(0, 0, "quitter")
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0)
            .setScale(0.3)
            .setInteractive()
            .setPosition(970, 545);
        this.quitter.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
                this.buttonSound.play();
                this.heartbeatSound.stop();
                this.jeuMusic1.stop();
            }
        });
        this.boutonHover(this.quitter)

        // Vies
        this.vie1 = this.add.image(0, 0, "coeur")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(0.8)
            .setInteractive()
            .setPosition(305, 175);

        this.vie2 = this.add.image(0, 0, "coeur")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(0.8)
            .setInteractive()
            .setPosition(340, 175);

        this.vie3 = this.add.image(0, 0, "coeur")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(0.8)
            .setInteractive()
            .setPosition(375, 175);
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
                    this.heartbeatSound.stop();
                    this.dashItemSound.play()
                } else {
                    this.denySound.play();
                    this.tweens.add({
                        targets: this.coeur,
                        alpha: {
                            from: 0,
                            to: 0.5
                        },
                        repeat: 1,
                        yoyo: true,
                        duration: 500,
                        onComplete: () => {
                            this.coeur.setAlpha(1);
                        }
                    })
                }
            }
        );

        // Dash items
        this.physics.add.overlap(
            this.player,
            this.item,
            () => {
                // Restaure dash
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
        // Change couleur durant dash
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
        // Tombe dans le vide - Game Over
        if (this.player.y > (config.height) + this.player.height && this.player.hp == 1) {
            this.scene.start("PartieTerminee");
            this.heartbeatSound.stop();
            this.jeuMusic1.stop()
            // Tombe dans le vide - respawn
        } else if (this.player.y > (config.height) + this.player.height) {
            this.criSound.play();
            this.player.hp--;
            this.dash();
            this.dashSound.stop();
            this.player.setVelocity(0)
            this.player.setPosition(50, 250);
            this.vie();
        }
    }

    vie() {
        // HUD perdre vie
        if (this.player.hp == 2) {
            this.vie3.setAlpha(0)
        } else if (this.player.hp == 1) {
            this.vie3.setAlpha(0);
            this.vie2.setAlpha(0);
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

    boutonHover(bouton) {
        bouton.on("pointerover", () => {
            this.tweens.add({
                targets: bouton,
                scale: 0.32,
                duration: 100
            });
        });
        bouton.on("pointerout", () => {
            this.tweens.add({
                targets: bouton,
                scale: 0.3,
                duration: 100
            });
        });
    }

    creerCoeur() {

    }
}