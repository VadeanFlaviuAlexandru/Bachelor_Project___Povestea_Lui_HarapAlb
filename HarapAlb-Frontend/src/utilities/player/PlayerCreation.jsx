export default function PlayerCreation(scene, x, y, speed) {
  scene.cursors = scene.input.keyboard.createCursorKeys();

  window.player = scene.player = scene.add.character({
    x: x,
    y: y,
    name: "HarapAlb",
    image: "HarapAlb",
    speed: speed,
  });
  scene.player.setTexture("HarapAlb", "HarapAlb-front");
}
