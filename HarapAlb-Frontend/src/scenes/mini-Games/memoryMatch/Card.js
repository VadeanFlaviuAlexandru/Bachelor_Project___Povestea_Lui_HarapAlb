export default class Card {
  constructor({ key, gameScene, x, y, handler }) {
    this.key = key;
    this.gameScene = gameScene;
    this.handler = handler;
    this.outOfTheGame = false;
    this.draw(x, y);
  }
  draw(x, y) {
    this.frontbg = this.gameScene.add
      .sprite(x, y, "front")
      .setInteractive();
    this.cover = this.gameScene.add.sprite(x, y, "back").setInteractive();
    this.front = this.gameScene.add.sprite(x, y, this.key).setInteractive();
    this.cover.on("pointerdown", this.onClickHandler.bind(this));
    this.front.on("pointerdown", this.onClickHandler.bind(this));
    this.faceDown();
  }
  readOnly() {
    this.outOfTheGame = true;
  }
  isVisible() {
    return this.front.visible;
  }
  faceDown() {
    if (!this.outOfTheGame) {
      this.frontbg.visible = false;
      this.front.visible = false;
      this.cover.visible = true;
    }
  }
  faceUp() {
    if (!this.outOfTheGame) {
      this.frontbg.visible = true;
      this.front.visible = true;
      this.cover.visible = false;
    }
  }
  onClickHandler() {
    this.handler(this);
  }
}
