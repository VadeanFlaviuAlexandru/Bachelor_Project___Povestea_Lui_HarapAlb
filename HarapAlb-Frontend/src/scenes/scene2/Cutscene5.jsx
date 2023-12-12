import Align from "../../utilities/scene/Align";
import chooseDialogComponent from "../../utilities/scene/DialogLength";
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
  create() {
    let Dialogs = [
      "Și, prin dreptul podului, numai iaca îi iese și lui ursul înainte, mornăind înfricoșat.",
      "Calul atunci dă năvală asupra ursului, și fiul craiului, ridică buzduganul să dea. ",
    ];
    let Backgrounds = ["B31", "B32"];

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
        this.scene.start("Board");
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
