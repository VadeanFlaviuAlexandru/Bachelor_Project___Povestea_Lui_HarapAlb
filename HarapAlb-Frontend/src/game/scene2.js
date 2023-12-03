import Phaser from "phaser";

class playGame2 extends Phaser.Scene {
  constructor() {
    super("PlayGame2");
  }
  preload() {}
  create() {
    console.log("SCENE2");
    this.add.text(20, 40, "WELCOME");
  }
}

export default playGame2;
