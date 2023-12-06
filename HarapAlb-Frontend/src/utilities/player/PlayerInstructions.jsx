export const PlayerInstructions = (scene) => {
  if (scene.cursors.left.isDown)
    scene.player.SetInstruction({ action: "walk", option: "left" });
  else if (scene.cursors.right.isDown)
    scene.player.SetInstruction({ action: "walk", option: "right" });
  if (scene.cursors.up.isDown)
    scene.player.SetInstruction({ action: "walk", option: "back" });
  else if (scene.cursors.down.isDown)
    scene.player.SetInstruction({ action: "walk", option: "front" });
  scene.player.update();
};
