class Jeu extends Phaser.Scene {
    constructor()  {
        super({ key:"Jeu" });
    }

    preload() {
        this.load.tilemapTiledJSON("tilemap01", "./tiled/tilemap01.json");
        this.load.image("imageTilemap01", "./tiled/tilemap01.png");

        this.load.image("quitter", "./assets/images/ui/Quitter.png");
    }
  
    create() {
        const maCarte = this.make.tilemap({ key: "tilemap01" });

        // Tileset
        const tileset1 = maCarte.addTilesetImage("01 background", "imageTilemap01");
        const tileset2 = maCarte.addTilesetImage("main_lev_build", "imageTilemap01");

        // Calques
        const bgLayer = maCarte.createLayer("bg1", [tileset1], 0, 0);
        const collisionLayer = maCarte.createLayer("platforms", [tileset2], 0, 0);
        // Si un calque contien des zones de collision (variable custom dans Tiled)
        collisionLayer.setCollisionByProperty({ collision: true });

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
  
    update() {}
}
  