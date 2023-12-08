export const LoadingScreen = (scene) => {
  var width = scene.cameras.main.width;
  var height = scene.cameras.main.height;
  var loadingText = scene.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: "Se incarca...",
    style: {
      fontFamily: 'GraphicPixel, sans-serif',
      fontSize: "20px",
      fill: "#ffffff",
    },
  });
  loadingText.setOrigin(0.5, 0.5);
  var percentText = scene.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: "0%",
    style: {
      font: "18px monospace",
      fill: "#ffffff",
    },
  });
  percentText.setOrigin(0.5, 0.5);
  var assetText = scene.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: "",
    style: {
      fontFamily: '"GraphicPixel", sans-serif',
      fontSize: "20px",
      fill: "#ffffff",
    },
  });
  assetText.setOrigin(0.5, 0.5);
  scene.load.on("progress", function (value) {
    percentText.setText(parseInt(value * 100) + "%");
  });
  scene.load.on("complete", function () {
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
  });
};
