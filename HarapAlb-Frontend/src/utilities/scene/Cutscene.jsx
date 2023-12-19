import Phaser from "phaser";

export class Cutscene extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
    this.scene = scene;
    this.systems = scene.sys;
    this.borderThickness = 3;
    this.borderColor = 0xffffff;
    this.borderAlpha = 0.5;
    this.windowAlpha = 0.85;
    this.windowColor = 0x000000;
    this.windowHeight = 200;
    this.padding = 10;
    this.dialogSpeed = 0.7;
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
    console.log("Original text:", text);
    if (!text || !text.split) return;
  
    if (this.tween) this.tween.stop();
    this.display(true);
  
    const charArray = text.split("");
    console.log("Char array:", charArray);
  
    let charIndex = 0;
  
    this.tween = this.scene.tweens.addCounter({
      from: 0,
      to: charArray.length - 1,
      duration: charArray.length * this.dialogSpeed * 30,
      onUpdate: () => {
        const index = Math.floor(this.tween.getValue());
        this.graphics.text.setText(charArray.slice(0, index + 1).join(""));
      },
      onComplete: () => {
        // Additional cleanup or callback after the animation is complete
      },
      callbackScope: this,
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
          lineSpacing: "0",
        },
      })
      .setScrollFactor(this.scrollFactor);
    this.graphics.text.setDepth(1010);
  }
}
