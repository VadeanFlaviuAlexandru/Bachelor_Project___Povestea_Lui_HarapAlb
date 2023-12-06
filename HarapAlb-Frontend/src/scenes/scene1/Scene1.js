import Anims from "../../utilities/player/Anims";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";
import { PlayerInstructions } from "../../utilities/player/PlayerInstructions";

export class Scene1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
    this.cursors = null;
    this.player = null;
    this.animsManager = new Anims(this);
  }
  preload() {
    LoadingScreen(this);
    this.load.image("tilesCastle", "src/assets/world/SimpleGrassTiles.png");
    this.load.image("tiles2Castle", "src/assets/world/PlantTiles.png");
    this.load.image("tiles3Castle", "src/assets/world/FenceTiles.png");
    this.load.image("tiles5Castle", "src/assets/world/StoneTiles.png");
    this.load.image("tiles6Castle", "src/assets/world/PropsTiles.png");
    this.load.image("tiles7Castle", "src/assets/world/StructureTiles.png");
    this.load.image("tiles8Castle", "src/assets/world/WallsTiles2.png");
    this.load.tilemapTiledJSON("mapCastle", "src/assets/scene1/Scene1.json");
    this.animsManager.preload();
    this.load.json("scriptData", "src/assets/interactions/script.json");
  }
  init(data) {
    this.spawnX = data.x;
    this.spawnY = data.y;
  }
  create() {
    this.events.on("wake", () => this.movePlayerAfterCutscene1());
    this.events.on("transitionwake", () => this.movePlayerAfterCutscene3());
    this.cursors = this.input.keyboard.createCursorKeys();
    window.player = this.player = this.add.character({
      x: this.spawnX,
      y: this.spawnY,
      name: "HarapAlb",
      image: "HarapAlb",
      speed: 200,
    });
    this.player.setTexture("HarapAlb", "HarapAlb-front");
    const mapCastle = this.make.tilemap({ key: "mapCastle" });
    const tilesetCastle = mapCastle.addTilesetImage(
      "SimpleGrassTiles",
      "tilesCastle"
    );
    const tileset5Castle = mapCastle.addTilesetImage(
      "StoneTiles",
      "tiles5Castle"
    );
    const tileset7Castle = mapCastle.addTilesetImage(
      "StructureTiles",
      "tiles7Castle"
    );
    const tileset3Castle = mapCastle.addTilesetImage(
      "FenceTiles",
      "tiles3Castle"
    );
    const tileset6Castle = mapCastle.addTilesetImage(
      "PropsTiles",
      "tiles6Castle"
    );
    const tileset2Castle = mapCastle.addTilesetImage(
      "PlantTiles",
      "tiles2Castle"
    );
    const tileset8Castle = mapCastle.addTilesetImage(
      "WallsTiles2",
      "tiles8Castle"
    );
    const portallayerCastle = mapCastle.createLayer(
      "PortalLayer",
      tileset6Castle
    );
    const layer1Castle = mapCastle.createLayer("GrassLayer", tilesetCastle);
    const layer2Castle = mapCastle.createLayer(
      "OuterWallsLayer",
      tileset5Castle
    );
    const layer3Castle = mapCastle.createLayer("WallsLayer", tileset8Castle);
    const layer5Castle = mapCastle.createLayer("PropLayer", tileset6Castle);
    const layer4Castle = mapCastle.createLayer("FenceLayer", tileset3Castle);
    const layer11Castle = mapCastle.createLayer("GateLayer", tileset6Castle);
    const layer7Castle = mapCastle.createLayer(
      "UpperTilesLayer",
      tileset5Castle
    );
    const layer8Castle = mapCastle.createLayer(
      "UpperWallsLayer",
      tileset8Castle
    );
    const layer6Castle = mapCastle.createLayer("PlantLayer", tileset2Castle);
    const layer9Castle = mapCastle.createLayer(
      "PlantTreeLayer",
      tileset2Castle
    );
    const layer10Castle = mapCastle.createLayer("StairsLayer", tileset7Castle);
    portallayerCastle.setCollisionByProperty({ collide: true });
    layer3Castle.setCollisionByProperty({ collide: true });
    layer4Castle.setCollisionByProperty({ collide: true });
    layer5Castle.setCollisionByProperty({ collide: true });
    layer6Castle.setCollisionByProperty({ collide: true });
    layer9Castle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      portallayerCastle,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer3Castle,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer4Castle,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer5Castle,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer6Castle,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer9Castle,
      this.HitLayer.bind(this)
    );
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, mapCastle.widthInPixels, mapCastle.heightInPixels);
    camera.setBounds(0, 0, mapCastle.widthInPixels, mapCastle.heightInPixels);
    this.animsManager.create();
    this.player.setDepth(10);
    layer6Castle.setDepth(11);
    layer9Castle.setDepth(12);
    layer11Castle.setDepth(13);
    layer7Castle.setDepth(14);
    layer8Castle.setDepth(15);
    this.script = this.cache.json.get("scriptData");
    const objectLayer = mapCastle.getObjectLayer("ScriptLayer");
    if (objectLayer && objectLayer.objects) {
      objectLayer.objects.forEach((object) => {
        let tmp = this.add.rectangle(
          object.x + object.width / 2,
          object.y + object.height / 2,
          object.width,
          object.height
        );
        tmp.properties = object.properties.reduce(
          (obj, item) => Object.assign(obj, { [item.name]: item.value }),
          {}
        );
        this.physics.world.enable(tmp, 1);
        this.physics.add.collider(this.player, tmp, this.HitScript, null, this);
      });
    }
  }
  update() {
    if (!this.Dialog.visible) {
      PlayerInstructions(this);
    } else if (this.Dialog.visible) {
      if (this.cursors.space.isDown) {
        this.Dialog.display(false);
      }
      return false;
    }
  }
  HitLayer(player, target) {
    if (target.properties.portal && !this.Dialog.visible) {
      if (
        this.registry.get("ExitAttic") !== 1 &&
        !(target.properties.portal == "Cutscene4")
      ) {
        this.scene.switch(target.properties.portal);
      } else if (
        this.registry.get("ExitAttic") == 1 &&
        target.properties.portal == "Cutscene4"
      ) {
        this.scene.switch(target.properties.portal);
      }
    }
  }
  HitScript(player, target) {
    if (target.properties.name && !this.Dialog.visible) {
      player.anims.stopAfterRepeat(0);
      this.Dialog.setText(this.script[player.name][target.properties.name]);
    }
  }
  movePlayerAfterCutscene1() {
    this.scene.remove("Cutscene2");
    this.player.x = 1272;
    this.player.y = 510;
  }
  movePlayerAfterCutscene3() {
    this.player.x = 876;
    this.player.y = 300;
  }
}
