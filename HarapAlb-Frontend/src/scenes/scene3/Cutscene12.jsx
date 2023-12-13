// import {
//   CutsceneProgression,
//   DestroyCutscene,
//   NextCutscene,
// } from "../../utilities/scene/CutsceneProgression";
// import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene12 extends Phaser.Scene {
  constructor() {
    super("Cutscene12");
  }
  preload() {
    // LoadingScreen(this);
  }
  create() {
    // let Dialogs = [];
    // let Backgrounds = [];
    // let currentDialog = 0;
    // CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);
    // this.input.keyboard.on("keydown-SPACE", () => {
    //   currentDialog = DestroyCutscene(this, currentDialog);
    //   if (currentDialog >= Dialogs.length) {
    //     this.scene.start("BearsMaze");
    //   }
    //   NextCutscene(this, currentDialog, Dialogs, Backgrounds);
    // });
  }
  update() {}
}
