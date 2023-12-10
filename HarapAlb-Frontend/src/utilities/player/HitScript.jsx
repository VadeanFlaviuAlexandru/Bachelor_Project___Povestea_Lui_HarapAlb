import chooseDialogComponent from "../scene/DialogLength";

export default function HitScript(player, target, scene) {
  if (target.properties.name && !scene.Dialog.visible) {
    player.anims.stopAfterRepeat(0);
    chooseDialogComponent(
      scene,
      scene.script[player.name][target.properties.name]
    ).setText(scene.script[player.name][target.properties.name]);
  }
}
