import {
  CutsceneProgression,
  DestroyCutscene,
  NextCutscene,
} from "../../utilities/scene/CutsceneProgression";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene8 extends Phaser.Scene {
  constructor() {
    super("Cutscene8");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B36", "/scene2/B36.png");
    this.load.image("B37", "/scene2/B37.png");
  }
  create() {
    let Dialogs = [
      "— Bună calea, drumețule!",
      "— Bună să-ți fie inima, cum ți-i căutătura.",
      "— Cât despre inima mea, s-o dea Dumnezeu oricui, zise Spânul oftând... Numai ce folos? Omul bun n-are noroc; asta-i știută; rogu-te, să nu-ți fie cu supărare, drumețule, dar fiindcă a venit vorba de-așa, îți spun, ca la un frate, că din cruda copilărie slujesc prin străini, și încaltea nu mi-ar fi ciudă, când n-aș vra să mă dau la treabă,",
      "căci cu munca m-am trezit. Dar așa, muncesc, muncesc, și nu s-alege nimica de mine; pentru că tot de stăpâni calici mi-am avut parte. ",
      "Și vorba ceea: La calic slujești, calic rămâi. Când aș da odată peste un stăpân cum gândesc eu, n-aș ști ce să fac să nu-l smintesc. Nu cumva ai trebuință de slugă, voinice? Cum te văd, sameni a avea seu la rărunchi. De ce te scumpești pentru nimica toată și nu-ți iei o slugă vrednică, ca să-ți fie mână de ajutor la drum? Locurile aiestea sunt șugubețe;",
      "de unde știi cum vine întâmplarea, și, Doamne ferește, să nu-ți cadă greu singur. ",
      "— Acum deodată încă tot nu, zise fiul craiului cu mâna pe buzdugan; m-oi mai sluji și eu singur, cum oi putea, și dând iar pinteni calului, pornește mai repede. ",
    ];
    let Backgrounds = ["B36", "B37", "B36", "B36", "B36", "B36", "B37"];

    let currentDialog = 0;

    CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);

    this.input.keyboard.on("keydown-SPACE", () => {
      currentDialog = DestroyCutscene(this, currentDialog);

      if (currentDialog >= Dialogs.length) {
        this.scene.start("Scene2Forest3", { x: 80, y: 500 });
      }

      NextCutscene(this, currentDialog, Dialogs, Backgrounds);
    });
  }
}
