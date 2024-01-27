import Align from "./Align";
import chooseDialogComponent from "./DialogLength";

export const CutsceneProgression = (
  scene,
  currentDialog,
  Dialogs,
  Backgrounds
) => {
  scene.Background = scene.add.image(10, 10, Backgrounds[currentDialog]);

  chooseDialogComponent(scene, Dialogs[currentDialog]).setText(
    Dialogs[currentDialog]
  );

  Align.ScaleToGameW(scene.game, scene.Background, 1.1);
  Align.center(scene.game, scene.Background);
};

export const DestroyCutscene = (scene, currentDialog) => {
  scene.Background.destroy();
  scene.Dialog.display(false);
  scene.shortDialog.display(false);

  return currentDialog + 1;
};

export const NextCutscene = (scene, currentDialog, Dialogs, Backgrounds) => {
  scene.Background = scene.add.image(10, 10, Backgrounds[currentDialog]);
  chooseDialogComponent(scene, Dialogs[currentDialog]).setText(
    Dialogs[currentDialog]
  );

  Align.ScaleToGameW(scene.game, scene.Background, 1.1);
  Align.center(scene.game, scene.Background);
};
