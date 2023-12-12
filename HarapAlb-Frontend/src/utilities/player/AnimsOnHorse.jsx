export default class AnimsOnHorse {
  constructor(scene) {
    if (!scene) return;
    this.scene = scene;
  }
  preload() {
    this.scene.load.atlas("horse", "/player/horse.png", "/player/horse.json");
  }
  create() {
    const anims = this.scene.anims;
    anims.create({
      key: "horse-walk-left",
      frames: anims.generateFrameNames("horse", {
        prefix: "horse-walk-left.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    anims.create({
      key: "horse-walk-right",
      frames: anims.generateFrameNames("horse", {
        prefix: "horse-walk-right.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    anims.create({
      key: "horse-walk-front",
      frames: anims.generateFrameNames("horse", {
        prefix: "horse-walk-front.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    anims.create({
      key: "horse-walk-back",
      frames: anims.generateFrameNames("horse", {
        prefix: "horse-walk-back.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }
}
