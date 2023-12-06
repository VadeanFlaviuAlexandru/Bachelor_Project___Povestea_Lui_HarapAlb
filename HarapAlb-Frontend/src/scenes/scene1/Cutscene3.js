import B25 from "../../assets/Scene1/B25.png";
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
    let Dialogs = [
      "Niște straie foarte vechi, un arc, niște săgeți, un paloș și un buzdugan, toate pline de rugină... Dacă mă uit bine, văd și un căpăstru, un frâu, un bici și o șa, toate colbăite, sfarogite și vechi ca pământul. ",
    ];
    let Backgrounds = ["B25"];
    let currentDialog = 0;
    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
    this.Dialog.setText(Dialogs[currentDialog]);
    Align.ScaleToGameW(this.game, this.Background, 0.8);
    Align.center(this.game, this.Background);
    this.input.keyboard.on("keydown-SPACE", () => {
      this.Background.destroy();
      currentDialog++;
      if (currentDialog >= Dialogs.length) {
        this.Dialog.display(false);
        this.scene.transition({
          target: "Scene1",
          remove: true,
        });
      }
      this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
      this.Dialog.setText(Dialogs[currentDialog]);
      Align.ScaleToGameW(this.game, this.Background, 0.8);
      Align.center(this.game, this.Background);
    });
  }
  update() {}
}
