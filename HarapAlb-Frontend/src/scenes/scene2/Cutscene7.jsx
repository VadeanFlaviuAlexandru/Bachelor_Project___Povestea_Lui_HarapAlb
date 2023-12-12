import Align from "../../utilities/scene/Align";
import chooseDialogComponent from "../../utilities/scene/DialogLength";
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

    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);

    chooseDialogComponent(this, Dialogs[currentDialog]).setText(
      Dialogs[currentDialog]
    );

    Align.ScaleToGameW(this.game, this.Background, 1.1);
    Align.center(this.game, this.Background);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.Background.destroy();
      this.Dialog.display(false);
      this.shortDialog.display(false);

      currentDialog++;
      if (currentDialog >= Dialogs.length) {
        this.scene.wake("Scene2Forest");
      }

      this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
      chooseDialogComponent(this, Dialogs[currentDialog]).setText(
        Dialogs[currentDialog]
      );

      Align.ScaleToGameW(this.game, this.Background, 1.1);
      Align.center(this.game, this.Background);
    });
  }
  update() {}
}
