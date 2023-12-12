import {
  CutsceneProgression,
  DestroyCutscene,
  NextCutscene,
} from "../../utilities/scene/CutsceneProgression";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene7 extends Phaser.Scene {
  constructor() {
    super("Cutscene7");
  }
  preload() {
    this.load.image("B36", "/scene2/B36.png");
    this.load.image("B37", "/scene2/B37.png");
  }
  create() {
    LoadingScreen(this);
    let Dialogs = [
      "— Bun întâlnișul, voinice! Nu ai trebuință de slugă la drum? Prin locurile iestea e cam greu de călătorit singur; nu cumva să-ți iasă vro dihanie ceva înainte și să-ți scurteze cărările. Eu cunosc bine pe-aici, și poate mai încolo să ai nevoie de unul ca mine.",
      "— Poate să am, poate să n-am, zise fiul craiului, dar acum deodată mă las în voia întâmplării.",
    ];
    let Backgrounds = ["B36", "B37"];

    let currentDialog = 0;

    CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);

    this.input.keyboard.on("keydown-SPACE", () => {
      currentDialog = DestroyCutscene(this, currentDialog);

      if (currentDialog >= Dialogs.length) {
        this.scene.wake("Scene2Forest");
      }

      NextCutscene(this, currentDialog, Dialogs, Backgrounds);
    });
  }
  update() {}
}
