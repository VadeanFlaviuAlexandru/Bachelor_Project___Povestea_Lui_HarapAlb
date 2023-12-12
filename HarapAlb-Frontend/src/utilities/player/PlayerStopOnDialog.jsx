import { PlayerInstructions } from "./PlayerInstructions";

export function PlayerStopOnDialog(scene) {
  if (!scene.Dialog.visible && !scene.shortDialog.visible) {
    PlayerInstructions(scene);
  } else if (scene.Dialog.visible || scene.shortDialog.visible) {
    if (scene.cursors.space.isDown) {
      scene.Dialog.display(false);
      scene.shortDialog.display(false);
    }
    return false;
  }
}
