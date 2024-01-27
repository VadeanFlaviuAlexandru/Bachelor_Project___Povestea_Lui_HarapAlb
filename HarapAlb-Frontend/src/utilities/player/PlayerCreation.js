export default function PlayerCreation(
  scene,
  x,
  y,
  speed,
  texture,
  texturePos,
  name,
  image
) {
  scene.cursors = scene.input.keyboard.createCursorKeys();

  window.player = scene.player = scene.add.character({
    x: x,
    y: y,
    name: name,
    image: image,
    speed: speed,
  });
  scene.player.setTexture(texture, texturePos);
}
