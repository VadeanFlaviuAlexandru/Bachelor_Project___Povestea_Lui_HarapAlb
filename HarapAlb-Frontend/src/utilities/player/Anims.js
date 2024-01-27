export default class Anims {
  constructor(scene) {
    if (!scene) return;
    this.scene = scene;
  }
  preload() {
    this.scene.load.atlas(
      "HarapAlb",
      "/player/HarapAlb.png",
      "/player/HarapAlb.json"
    );
  }
  create() {
    const anims = this.scene.anims;
    anims.create({
      key: "HarapAlb-walk-left",
      frames: anims.generateFrameNames("HarapAlb", {
        prefix: "HarapAlb-walk-left.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    anims.create({
      key: "HarapAlb-walk-right",
      frames: anims.generateFrameNames("HarapAlb", {
        prefix: "HarapAlb-walk-right.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    anims.create({
      key: "HarapAlb-walk-front",
      frames: anims.generateFrameNames("HarapAlb", {
        prefix: "HarapAlb-walk-front.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    anims.create({
      key: "HarapAlb-walk-back",
      frames: anims.generateFrameNames("HarapAlb", {
        prefix: "HarapAlb-walk-back.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }
  destroy() {
    this.scene.anims.remove("HarapAlb-walk-left");
    this.scene.anims.remove("HarapAlb-walk-right");
    this.scene.anims.remove("HarapAlb-walk-front");
    this.scene.anims.remove("HarapAlb-walk-back");
  }
}
