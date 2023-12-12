import AnimsOnHorse from "../../utilities/player/AnimsOnHorse";
import { ObjectHitScript } from "../../utilities/player/HitScript";
import PlayerCreation from "../../utilities/player/PlayerCreation";
import { PlayerStopOnDialog } from "../../utilities/player/PlayerStopOnDialog";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Scene2Forest extends Phaser.Scene {
  constructor() {
    super("Scene2Forest");
    this.cursors = null;
    this.player = null;
    this.animsManager = new AnimsOnHorse(this);
    this.script = null;
  }
  preload() {
    LoadingScreen(this);
    this.load.image("tilesCodru", "/world/SimpleGrassTiles.png");
    this.load.image("tiles2Codru", "/world/PlantTiles.png");
    this.load.image("tiles6Codru", "/world/PropsTiles.png");
    this.load.image("spanT", "/player/span.png");
    this.load.tilemapTiledJSON("mapCodru", "/scene2/Scene2Forest.json");
    this.animsManager.preload();
    this.load.json("scriptDataHorse", "/interactions/scriptOnHorse.json");
  }
  init(data) {
    this.spawnX = data.x;
    this.spawnY = data.y;
  }
  create() {
    this.events.on("wake", () => this.movePlayerAfterCutscene7());
    this.events.on("transitionwake", () => this.movePlayerAfterCutscene8());
    PlayerCreation(
      this,
      this.spawnX,
      this.spawnY,
      270,
      "horse",
      "horse-front",
      "horse",
      "horse"
    );
    const mapCodru = this.make.tilemap({ key: "mapCodru" });
    const tilesetCodru = mapCodru.addTilesetImage(
      "SimpleGrassTiles",
      "tilesCodru"
    );
    const tileset6Codru = mapCodru.addTilesetImage("PropsTiles", "tiles6Codru");
    const tileset2Codru = mapCodru.addTilesetImage("PlantTiles", "tiles2Codru");
    const tileset3Codru = mapCodru.addTilesetImage("span", "spanT");
    mapCodru.createLayer("GrassLayer", tilesetCodru);
    mapCodru.createLayer("SpanLayer", tileset3Codru);
    const layer2Codru = mapCodru.createLayer("PropsLayer", tileset6Codru);
    const layer9Codru = mapCodru.createLayer("BushesLayer", tileset2Codru);
    const layer3Codru = mapCodru.createLayer("PlantLayer", tileset2Codru);
    const layer4Codru = mapCodru.createLayer("Plant2Layer", tileset2Codru);
    const layer5Codru = mapCodru.createLayer("Plant3Layer", tileset2Codru);
    const layer6Codru = mapCodru.createLayer("Plant4Layer", tileset2Codru);
    const layer7Codru = mapCodru.createLayer("Plant5Layer", tileset2Codru);
    const layer8Codru = mapCodru.createLayer("Plant6Layer", tileset2Codru);
    layer2Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer2Codru,
      this.HitLayer.bind(this)
    );
    layer3Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer3Codru,
      this.HitLayer.bind(this)
    );
    layer4Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer4Codru,
      this.HitLayer.bind(this)
    );
    layer5Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer5Codru,
      this.HitLayer.bind(this)
    );
    layer6Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer6Codru,
      this.HitLayer.bind(this)
    );
    layer7Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer7Codru,
      this.HitLayer.bind(this)
    );
    layer8Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer8Codru,
      this.HitLayer.bind(this)
    );
    layer9Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer9Codru,
      this.HitLayer.bind(this)
    );
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, mapCodru.widthInPixels, mapCodru.heightInPixels);
    camera.setBounds(0, 0, mapCodru.widthInPixels, mapCodru.heightInPixels);
    this.animsManager.create();
    this.player.setDepth(10);
    layer2Codru.setDepth(11);
    layer9Codru.setDepth(12);
    layer3Codru.setDepth(13);
    layer4Codru.setDepth(14);
    layer5Codru.setDepth(15);
    layer6Codru.setDepth(16);
    layer7Codru.setDepth(17);
    layer8Codru.setDepth(18);
    this.script = this.cache.json.get("scriptDataHorse");
    const objectLayer = mapCodru.getObjectLayer("ScriptLayer");
    ObjectHitScript(objectLayer, this);
  }
  update() {
    PlayerStopOnDialog(this);
  }
  HitLayer(player, target) {
    if (target.properties.portal && !this.Dialog.visible) {
      this.scene.switch(target.properties.portal);
    }
  }
  movePlayerAfterCutscene7() {
    this.scene.remove("Cutscene7");
    this.player.x = 3400;
    this.player.y = 830;
  }
  movePlayerAfterCutscene8() {
    this.player.x = 90;
    this.player.y = 600;
  }
}
