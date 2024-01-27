import chooseDialogComponent from "../scene/DialogLength";

export function ObjectHitScript(objectLayer, scene) {
  if (objectLayer && objectLayer.objects) {
    objectLayer.objects.forEach((object) => {
      let tmp = scene.add.rectangle(
        object.x + object.width / 2,
        object.y + object.height / 2,
        object.width,
        object.height
      );
      tmp.properties = object.properties.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.value }),
        {}
      );
      scene.physics.world.enable(tmp, 1);
      scene.physics.add.collider(
        scene.player,
        tmp,
        (player, target) => HitScript(player, target, scene),
        null,
        scene
      );
    });
  }
}

export function HitScript(player, target, scene) {
  if (target.properties.name && !scene.Dialog.visible) {
    player.anims.stopAfterRepeat(0);
    chooseDialogComponent(
      scene,
      scene.script[player.name][target.properties.name]
    ).setText(scene.script[player.name][target.properties.name]);
  }
}
