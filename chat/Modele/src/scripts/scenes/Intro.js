class Example extends Phaser.Scene {
  constructor() {
    super({ key: "Example" });
  }

  // Sources : https://miguelsgp.itch.io/free-tileset-dungeon,
  // https://bowpixel.itch.io/cat-50-animations
  preload() {
    this.load.image("bg", "https://assets.codepen.io/9367036/Yellow.png");
    this.load.image(
      "ground",
      "https://assets.codepen.io/9367036/Platform%2848x48%29.png"
    );
    this.load.spritesheet(
      "cat",
      "https://assets.codepen.io/9367036/Cat-Sheet.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );
  }

  create() {
    // Background
    this.bg = this.add.tileSprite(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      "bg"
    );
    this.bg.setOrigin(0, 0);

    // Plateformes
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(100, config.height - 10, "ground")
      .setOrigin(0.5, 1)
      .setScale(2)
      .refreshBody();
    this.platforms
      .create(250, config.height - 100, "ground")
      .setOrigin(0, 1)
      .setScale(2)
      .refreshBody();
    this.platforms
      .create(450, config.height - 200, "ground")
      .setOrigin(0, 1)
      .setScale(2)
      .refreshBody();
    this.platforms
      .create(700, config.height - 10, "ground")
      .setOrigin(1, 1)
      .setScale(2)
      .refreshBody();

    // Monde
    this.physics.world.setBounds(
      0,
      config.height / -2,
      config.width,
      config.height * 2
    );

    // Joueur
    this.player = this.physics.add.sprite(100, 0, "cat");
    this.player
      .setScale(2)
      .setCollideWorldBounds()
      .setSize(16, 16)
      .setOffset(9, 16);
    this.player.body.setGravityY(1000);
    this.physics.add.collider(this.player, this.platforms);

    // Animations
    let walkStart = 8 * 5;
    let walkEnd = 8 * 5 + 8;
    let jumpStart = 19 * 8;
    let jumpEnd = 19 * 8 + 3;
    let fallStart = 20 * 8;
    let fallEnd = 20 * 8 + 3;
    this.isFalling = false;
    this.isJumping = false;
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("cat", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("cat", {
        start: walkStart,
        end: walkEnd
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("cat", {
        start: jumpStart,
        end: jumpEnd
      }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("cat", {
        start: fallStart,
        end: fallEnd
      }),
      frameRate: 10,
      repeat: 0
    });
    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "fall") {
        // this.player.setFrame(fallEnd); // Pas nécessaire
        this.isFalling = true;
      }
      if (animation.key === "jump") {
        // this.player.setFrame(jumpEnd); // Pas nécessaire
        this.isJumping = true;
      }
    });

    // Touches
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.SPACE,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() {
    this.handleMovement();
    this.handleAnimations();
    this.handleDeath();
  }

  handleMovement() {
    // Mouvements horizontaux
    if (this.keys.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.flipX = true;
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(160);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }

    // Saut
    if (this.keys.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
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
    // Tombe dans le trou
    if (this.player.y > config.height + this.player.height) {
      this.player.setPosition(100, 0);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: Example,
  pixelArt: true,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
};

const game = new Phaser.Game(config);

activateControls(["space", "A", "D"]);