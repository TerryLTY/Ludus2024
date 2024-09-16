class Accueil extends Phaser.Scene {
    constructor()  {
        super({ key:"Accueil" });
    }

    preload() { 
        this.load.image("logo", "./assets/images/ui/Gluttony.png");
        this.load.image("bgAccueil", "./assets/images/backgrounds/Village_1.png");
        this.load.image("commencer", "./assets/images/ui/Commencer.png");
        this.load.image("credits", "./assets/images/ui/Credits.png");
        this.load.image("commentJouer", "./assets/images/ui/Comment jouer.png");
        this.load.image("sons", "./assets/images/ui/Sons.png");
    }
  
    create() {
        this.bgAccueil = this.add.image(0, 0, "bgAccueil").setOrigin(0,0);
        this.bgAccueil.setPosition(0, -150);

        this.logo = this.add.image(0, 0, "logo").setOrigin(0, 0);
        this.logo.setPosition(225, 150);

        this.commencer = this.add.image(0, 0, "commencer").setOrigin(0, 0);
        this.commencer.setPosition(290, 300);
        this.commencer.setInteractive();
        this.commencer.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Jeu");
            }
        });

        this.credits = this.add.image(0, 0, "credits").setOrigin(0, 0);
        this.credits.setPosition(25, 500);
        this.credits.setInteractive();
        this.credits.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("Credits");
            }
        });

        this.commentJouer = this.add.image(0, 0, "commentJouer").setOrigin(0, 0);
        this.commentJouer.setPosition(425, 500);
        this.commentJouer.setInteractive();
        this.commentJouer.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("CommentJouer");
            }
        });

        this.sons = this.add.image(0, 0, "sons").setOrigin(0, 0);
        this.sons.setPosition(655, 25);
    }
  
    update() {}
  }
  