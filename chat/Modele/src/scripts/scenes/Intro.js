class Intro extends Phaser.Scene {
  preload() {
    this.load.image(
      "bg",
      "https://assets.codepen.io/9367036/Yellow.png"
    )

    this.load.image(
      "platforms",
      "https://assets.codepen.io/9367036/Platform%2848x48%29.png"
    )

    this.load.spritesheet("player", "./assets/images/characters/Cat-Sheet.webp", {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, "bg");
    this.bg.setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, 540, "platforms").setScale(2).refreshBody();
    this.platforms.create(300, 450, "platforms").setScale(2).refreshBody();
    this.platforms.create(500, 350, "platforms").setScale(2).refreshBody();
    this.platforms.create(650, 540, "platforms").setScale(2).refreshBody();

    this.player = this.physics.add.sprite(100, 400, "player");
    this.player.setSize(16, 16);
    this.player.setOffset(8, 16);
    this.player.setBounce(0);
    this.player.setScale(2).refreshBody();

    this.player.body.setGravityY(1000);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    this.player.anims.play("idle");

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", {
        start: 16,
        end: 51
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", {
        start: 152,
        end: 155
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("player", {
        start: 160,
        end: 163
      }),
      frameRate: 10,
      repeat: -1
    })

    this.physics.add.collider(this.player, this.platforms);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.SPACE,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() {
    this.handleMovement();
    this.handleAnimations();
    this.handleDeath()
  }

  handleMovement() {
    if (this.keys.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.flipX = true;
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(160);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }
  
    if (this.keys.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
    }
  }
  
  handleAnimations() {
    if (this.keys.left.isDown) {
      this.player.anims.play("walk", true);
    } else if (this.keys.right.isDown) {
      this.player.anims.play("walk", true);
    } else {
      this.player.anims.play("idle", true);
    }
  
    if (!this.player.body.touching.down) {
      if (this.player.body.velocity.y < 0) {
        this.player.anims.play("jump", true);
      } else if (this.player.body.velocity.y > 0) {
        this.player.anims.play("fall", true);
      }
    } else {
      if (this.player.body.velocity.x !== 0) {
        this.player.anims.play("walk", true);
      } else {
        this.player.anims.play("idle", true);
      }
    }
  }
  
  handleDeath() {
    if (this.player.y > config.height + this.player.height) {
      this.player.setPosition(100, 200);
    }
  }
}


