import Phaser from "phaser";

export class Character extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y, image, name, path, speed }) {
    super(scene, x, y, image);
    this.name = name || "anonymous";
    this.speed = speed;
    this.image = image;
    this.instructions = [];
    scene.physics.world.enable(this, 0);
    scene.add.existing(this);
  }
  update() {
    this.body.setVelocity(0);
    this.DoInstructions();
    if (this.body && this.body.velocity.x == 0 && this.body.velocity.y == 0) {
      this.anims.stop();
    }
  }
  ForceStop() {
    this.body.setVelocity(0);
    this.anims.stop()
  }
  SetInstruction(instruction) {
    if (!instruction.action) return;
    if (instruction.action == "walk" && !instruction.option) return;

    this.instructions.push(instruction);
  }
  DoInstructions() {
    while (this.instructions.length > 0) {
      let instruction = this.instructions.pop();
      switch (instruction.action) {
        case "walk":
          this.DoWalk(instruction.option);
          break;
      }
    }
  }
  DoWalk(direction) {
    switch (direction) {
      case "left":
        this.body.setVelocityX(-this.speed);
        break;
      case "right":
        this.body.setVelocityX(this.speed);
        break;
      case "back":
        this.body.setVelocityY(-this.speed);
        break;
      case "front":
        this.body.setVelocityY(this.speed);
        break;
    }
    this.body.velocity.normalize().scale(this.speed);
    if (this.body.velocity.y < 0)
      this.anims.play(this.image + "-walk-back", true);
    else if (this.body.velocity.y > 0)
      this.anims.play(this.image + "-walk-front", true);
    else if (this.body.velocity.x < 0)
      this.anims.play(this.image + "-walk-left", true);
    else if (this.body.velocity.x > 0)
      this.anims.play(this.image + "-walk-right", true);
  }
}
export class CharacterPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    pluginManager.registerGameObject("character", this.createCharacter);
  }
  createCharacter(params) {
    return new Character({ scene: this.scene, ...params });
  }
}
