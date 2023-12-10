import B25 from "../../assets/scene1/B25.png";
import Align from "../../utilities/scene/Align";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene3 extends Phaser.Scene {
  constructor() {
    super("Cutscene3");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B25", B25);
  }
  create() {
    const Dialog =
      "Niște straie foarte vechi, un arc, niște săgeți, un paloș și un buzdugan, toate pline de rugină... Dacă mă uit bine, văd și un căpăstru, un frâu, un bici și o șa, toate colbăite, sfarogite și vechi ca pământul. ";

    this.Background = this.add.image(10, 10, "B25");

    this.shortDialog.setText(Dialog);

    Align.ScaleToGameW(this.game, this.Background, 1.1);
    Align.center(this.game, this.Background);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.shortDialog.display(false);
      this.Background.destroy();
      this.scene.transition({
        target: "Scene1",
        remove: true,
      });
    });
  }
  update() {}
}
