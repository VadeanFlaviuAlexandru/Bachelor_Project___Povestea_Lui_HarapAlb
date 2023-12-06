export default class Align {
  static ScaleToGameW(game, obj, per) {
    obj.displayWidth = game.config.width * per;
    obj.scaleY = obj.scaleX;
  }
  static center(game, obj) {
    obj.x = game.config.width / 2;
    obj.y = game.config.height / 2;
  }
}
