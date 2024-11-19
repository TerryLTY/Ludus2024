class Jeu2 extends Phaser.Scene {
    constructor() {
        super({
            key: "Jeu2"
        });
    }

    preload() {}

    create() {

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
        this.handleItems()
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
                this.dashItemSound.play()
                this.player.setAlpha(1);
                this.player.clearTint();
                this.item.destroy();
                if (this.flashTween) {
                    this.flashTween.stop()
                }
            }
        );

        this.spinTween = this.tweens.add({
            targets: this.item,
            rotation: 30,
            duration: 5000,
            repeat: -1
        })

        this.menuPrincipal = this.add.image(0, 0, "menuPrincipal").setOrigin(0, 0);
        this.menuPrincipal.setPosition(910, 590);
        this.menuPrincipal.setInteractive();
        this.menuPrincipal.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Accueil");
                this.buttonSound.play();
                this.winSound.stop()
            }
        });
        this.menuPrincipal.on("pointerover", () => {
            this.tweens.add({
                targets: this.menuPrincipal,
                scale: 1.1,
                duration: 100
            });
        });
        this.menuPrincipal.on("pointerout", () => {
            this.tweens.add({
                targets: this.menuPrincipal,
                scale: 1,
                duration: 100
            });
        });
    }
}