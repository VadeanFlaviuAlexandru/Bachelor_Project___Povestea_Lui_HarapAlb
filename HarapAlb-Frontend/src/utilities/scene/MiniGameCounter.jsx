export default function MiniGameCounter(x, y, scene) {
  scene.scoreText = scene.add.text(x, y, "", {
    align: "center",
    fontFamily: "GraphicPixel, sans-serif",
    fontSize: 25,
    color: "#ffffff",
    wordWrap: { width: 150 },
  });

  var container = scene.add.container(30, 30);

  var textBackground = scene.add.graphics();
  textBackground.fillStyle(0x000000, 0.7);
  textBackground.fillRoundedRect(0, 0, 170, 70, 10);

  var borderGraphics = scene.add.graphics();
  borderGraphics.lineStyle(1, 0xffffff);
  borderGraphics.strokeRoundedRect(0, 0, 170, 70, 10);

  container.add(textBackground);
  container.add(borderGraphics);

  container.add(scene.scoreText);
  return scene.scoreText;
}
