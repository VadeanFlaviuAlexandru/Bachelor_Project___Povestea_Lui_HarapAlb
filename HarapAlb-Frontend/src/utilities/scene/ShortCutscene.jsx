import Phaser from "phaser";

export class ShortCutscene extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
    this.scene = scene;
    this.systems = scene.sys;
    this.borderThickness = 3;
    this.borderColor = 0xffffff;
    this.borderAlpha = 0.5;
    this.windowAlpha = 0.85;
    this.windowColor = 0x000000;
    this.windowHeight = 100;
    this.padding = 10;
    this.dialogSpeed = 20;
    this.scrollFactor = 0;
    this.visible = false;
    this.graphics = {
      background: null,
      text: null,
    };
  }
  boot() {
    this._drawBackground();
    this._drawText();
    this.display(false);
    let eventEmitter = this.systems.events;
    eventEmitter.on("shutdown", this.shutdown, this);
  }
  shutdown() {
    if (this.timedEvent) this.timedEvent.remove();
    if (this.graphics.text) this.graphics.text.destroy();
  }
  destroy() {
    this.shutdown();
    this.scene = undefined;
  }
  display(showMe) {
    if (typeof showMe === "undefined") this.visible = !this.visible;
    else this.visible = showMe;
    if (this.graphics.text) this.graphics.text.visible = this.visible;
    if (this.graphics.background)
      this.graphics.background.visible = this.visible;
  }
  setText(text) {
    if (!text || !text.split) return;
    if (this.timedEvent) this.timedEvent.remove();
    this.display(true);
    const charArray = text.split("");
    this.graphics.text.setText("");
    this.timedEvent = this.scene.time.addEvent({
      delay: 150 - this.dialogSpeed * 30,
      callback: (charArray) => {
        this.graphics.text.setText(
          this.graphics.text.text + charArray[this.graphics.text.text.length]
        );
        if (this.graphics.text.text.length === charArray.length) {
          this.timedEvent.remove();
        }
      },
      args: [charArray],
      callbackScope: this,
      loop: true,
    });
  }
  _calculateWindowDimensions() {
    var gameHeight = this.scene.sys.game.config.height;
    var gameWidth = this.scene.sys.game.config.width;
    var x = this.padding;
    var y = gameHeight - this.windowHeight - this.padding;
    var width = gameWidth - this.padding * 2;
    var height = this.windowHeight;
    return {
      x,
      y,
      width,
      height,
    };
  }
  _drawBackground() {
    let dimensions = this._calculateWindowDimensions();
    this.graphics.background = this.scene.add
      .graphics()
      .setScrollFactor(this.scrollFactor);
    this.graphics.background.lineStyle(
      this.borderThickness,
      this.borderColor,
      this.borderAlpha
    );
    this.graphics.background.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.background.strokeRoundedRect(
      dimensions.x,
      dimensions.y,
      dimensions.width,
      dimensions.height,
      5
    );
    this.graphics.background.fillRoundedRect(
      dimensions.x,
      dimensions.y,
      dimensions.width,
      dimensions.height,
      5
    );
    this.graphics.background.setDepth(1000);
  }
  _drawText() {
    let dimensions = this._calculateWindowDimensions();
    let x = dimensions.x + this.padding;
    let y = dimensions.y + this.padding * 0.5;
    let text = "";

    this.graphics.text = this.scene.make
      .text({
        x,
        y,
        text,
        style: {
          wordWrap: { width: dimensions.width - this.padding },
          fontFamily: "feelFree",
          fontSize: "45px",
          lineSpacing: "3",
        },
      })
      .setScrollFactor(this.scrollFactor);
    this.graphics.text.setDepth(1010);
  }
}
