import {
  CutsceneProgression,
  DestroyCutscene,
  NextCutscene,
} from "../../utilities/scene/CutsceneProgression";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene4 extends Phaser.Scene {
  constructor() {
    super("Cutscene4");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B21", "/scene1/B1.png");
    this.load.image("B27", "/scene1/B27.png");
    this.load.image("B28", "/scene1/B28.png");
    this.load.image("B29", "/scene1/B29.png");
    this.load.image("B30", "/scene1/B30.png");
  }
  create() {
    let Dialogs = [
      "Pe urmă umple o tavă cu jăratic, se duce la herghelie ",
      "și o pune jos între cai.",
      "Și atunci, numai iaca ce iese din mijlocul hergheliei o răpciugă de cal, grebănos, dupuros și slab, de-i numărai coastele; și venind de-a dreptul la tava, apucă o gură de jăratic. Fiul craiului îi și trage atunci cu frâul în cap, zicând :",
      "— Ghijoagă urâcioasă ce ești! din toți caii, tocmai tu te-ai găsit să mănânci jăratic? De te-a împinge păcatul să mai vii o dată, vai de steaua ta are să fie!",
      "Pune tarnița pe cal, anină armele la oblânc, își ia merinde și bani de ajuns, schimburi în desagi și o ploscă plină cu apă.",
      "Apoi sărută mâna tată-său, primind carte de la dânsul către împăratul, zice rămas bun fraților săi și a treia zi către seară pornește și el, mergând din pasul calului.",
    ];
    let Backgrounds = ["B27", "B28", "B29", "B29", "B29", "B21"];

    let currentDialog = 0;

    CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);

    this.input.keyboard.on("keydown-SPACE", () => {
      currentDialog = DestroyCutscene(this, currentDialog);

      if (currentDialog >= Dialogs.length) {
        this.sound.removeByKey("music2");
        this.scene.start("Scene2", { x: 161, y: 391 });
      }

      NextCutscene(this, currentDialog, Dialogs, Backgrounds);

      this.registry.destroy("ExitAttic");
    });
  }
  update() {}
}
