import {
  CutsceneProgression,
  DestroyCutscene,
  NextCutscene,
} from "../../utilities/scene/CutsceneProgression";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene5 extends Phaser.Scene {
  constructor() {
    super("Cutscene5");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B31", "/scene2/B31.png");
    this.load.image("B32", "/scene2/B32.png");
  }
  create(data) {
    let Dialogs = [
      "Și, prin dreptul podului, numai iaca îi iese și lui ursul înainte, mornăind înfricoșat.",
      "Calul atunci dă năvală asupra ursului, și fiul craiului, ridică buzduganul să dea.",
    ];
    let Backgrounds = ["B31", "B32"];

    let currentDialog = 0;

    CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);

    this.input.keyboard.on("keydown-SPACE", () => {
      currentDialog = DestroyCutscene(this, currentDialog);

      if (currentDialog >= Dialogs.length) {
        this.sound.removeByKey("music3");
        this.scene.start("Board");
      }
      NextCutscene(this, currentDialog, Dialogs, Backgrounds);
    });
  }
  update() {}
}
