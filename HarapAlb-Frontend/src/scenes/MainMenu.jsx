import Background from "../assets/main/MainMenu.png";
import Align from "../utilities/scene/Align";
import { LoadingScreen } from "../utilities/scene/LoadingScreen";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {
    LoadingScreen(this);
    this.load.image("Background", Background);
  }

  create() {
    this.background = this.add.image(10, 10, "Background");
    Align.ScaleToGameW(this.game, this.background, 0.8);
    Align.center(this.game, this.background);
  }

  update() {}
}
