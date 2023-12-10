import AnimsOnHorse from "../../utilities/player/AnimsOnHorse";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";
import { PlayerInstructions } from "../../utilities/player/PlayerInstructions";
import { Music } from "../../utilities/scene/Music";
import PlayerCreation from "../../utilities/player/PlayerCreation";
import { ObjectHitScript } from "../../utilities/player/HitScript";

export class Scene2 extends Phaser.Scene {
  constructor() {
    super("Scene2");
    this.music = null;
    this.cursors = null;
    this.player = null;
    this.animsManagerOnHorse = new AnimsOnHorse(this);
  }
  preload() {
    LoadingScreen(this);
    this.load.image(
      "tilesOutsideCastle",
      "src/assets/world/SimpleGrassTiles.png"
    );
    this.load.image("tiles1OutsideCastle", "src/assets/world/BridgeTiles.png");
    this.load.image("tiles2OutsideCastle", "src/assets/world/PlantTiles.png");
    this.load.image("tiles3OutsideCastle", "src/assets/world/FenceTiles.png");
    this.load.image("tiles5OutsideCastle", "src/assets/world/StoneTiles.png");
    this.load.image("tiles6OutsideCastle", "src/assets/world/PropsTiles.png");
    this.load.image(
      "tiles7OutsideCastle",
      "src/assets/world/StructureTiles.png"
    );
    this.load.image("tiles8OutsideCastle", "src/assets/world/WallsTiles2.png");
    this.load.image("tiles9OutsideCastle", "src/assets/world/WaterTiles.png");
    this.load.tilemapTiledJSON(
      "mapOutsideCastle",
      "src/assets/scene2/Scene2.json"
    );
    this.animsManagerOnHorse.preload();
    this.load.json(
      "scriptDataHorse",
      "src/assets/interactions/scriptOnHorse.json"
    );
    this.load.audio("music3", "src/assets/music/OmuleCatAiTrai.mp3");
  }
  init(data) {
    this.spawnX = data.x;
    this.spawnY = data.y;
  }
  create() {
    this.events.on("wake", () => this.movePlayerAfterCutscene6());
    this.animsManagerOnHorse.create();
    this.music = this.sound.add("music3", {
      volume: 0.2,
      loop: true,
    });
    if (
      this.registry.get("HarapAlbMusicOption") === 0 ||
      localStorage.getItem("HarapAlb-musicOff") === "true"
    ) {
      Music(this, this.music, true);
    } else {
      Music(this, this.music, false);
    }
    PlayerCreation(this, this.spawnX, this.spawnY, 270, "horse", "horse-front");
    const mapOutsideCastle = this.make.tilemap({ key: "mapOutsideCastle" });
    const tilesetOutsideCastle = mapOutsideCastle.addTilesetImage(
      "SimpleGrassTiles",
      "tilesOutsideCastle"
    );
    const tileset5OutsideCastle = mapOutsideCastle.addTilesetImage(
      "StoneTiles",
      "tiles5OutsideCastle"
    );
    const tileset6OutsideCastle = mapOutsideCastle.addTilesetImage(
      "PropsTiles",
      "tiles6OutsideCastle"
    );
    const tileset2OutsideCastle = mapOutsideCastle.addTilesetImage(
      "PlantTiles",
      "tiles2OutsideCastle"
    );
    const tileset8OutsideCastle = mapOutsideCastle.addTilesetImage(
      "WallsTiles2",
      "tiles8OutsideCastle"
    );
    const tileset10OutsideCastle = mapOutsideCastle.addTilesetImage(
      "StructureTiles",
      "tiles7OutsideCastle"
    );
    const tileset9OutsideCastle = mapOutsideCastle.addTilesetImage(
      "NearWaterTiles",
      "tiles9OutsideCastle"
    );
    const tileset1OutsideCastle = mapOutsideCastle.addTilesetImage(
      "BridgeTiles",
      "tiles1OutsideCastle"
    );
    mapOutsideCastle.createLayer("GrassLayer", tilesetOutsideCastle);
    mapOutsideCastle.createLayer("OuterWallsLayer", tileset5OutsideCastle);
    mapOutsideCastle.createLayer("OuterGrassLayer", tileset2OutsideCastle);
    const layer3OutsideCastle = mapOutsideCastle.createLayer(
      "WallsLayer",
      tileset8OutsideCastle
    );
    const layer11OutsideCastle = mapOutsideCastle.createLayer(
      "GateLayer",
      tileset10OutsideCastle
    );
    const layer6OutsideCastle = mapOutsideCastle.createLayer(
      "PlantLayer",
      tileset2OutsideCastle
    );
    const layer9OutsideCastle = mapOutsideCastle.createLayer(
      "PlantTreeLayer",
      tileset2OutsideCastle
    );
    const layer10OutsideCastle = mapOutsideCastle.createLayer(
      "WaterLayer",
      tileset9OutsideCastle
    );
    const layer4OutsideCastle = mapOutsideCastle.createLayer(
      "BridgeLayer",
      tileset1OutsideCastle
    );
    const layer5OutsideCastle = mapOutsideCastle.createLayer(
      "OuterBridgeLayer",
      tileset1OutsideCastle
    );
    const layer7OutsideCastle = mapOutsideCastle.createLayer(
      "PropsLayer",
      tileset6OutsideCastle
    );
    layer11OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer11OutsideCastle,
      this.HitLayer.bind(this)
    );
    layer3OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer3OutsideCastle,
      this.HitLayer.bind(this)
    );
    layer6OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer6OutsideCastle,
      this.HitLayer.bind(this)
    );
    layer9OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer9OutsideCastle,
      this.HitLayer.bind(this)
    );
    layer10OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer10OutsideCastle,
      this.HitLayer.bind(this)
    );
    layer4OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer4OutsideCastle,
      this.HitLayer.bind(this)
    );
    layer7OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer7OutsideCastle,
      this.HitLayer.bind(this)
    );
    layer5OutsideCastle.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer5OutsideCastle,
      this.HitLayer.bind(this)
    );
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(
      0,
      0,
      mapOutsideCastle.widthInPixels,
      mapOutsideCastle.heightInPixels
    );
    camera.setBounds(
      0,
      0,
      mapOutsideCastle.widthInPixels,
      mapOutsideCastle.heightInPixels
    );
    this.player.setDepth(10);
    layer6OutsideCastle.setDepth(11);
    layer9OutsideCastle.setDepth(12);
    this.script = this.cache.json.get("scriptDataHorse");
    const objectLayer = mapOutsideCastle.getObjectLayer("ScriptLayer");
    ObjectHitScript(objectLayer, this);
  }
  update() {
    PlayerInstructions(this);
    if (this.Dialog.visible) {
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
      if (this.cursors.space.isDown) {
        this.Dialog.display(false);
      }
      return false;
    }
  }
  
  HitLayer(player, target) {
    if (target.properties.portal && !this.Dialog.visible) {
      Music(this, this.music, true);
      if (target.properties.portal === "Scene2Forest") {
        this.scene.start(target.properties.portal, { x: 100, y: 500 });
      } else {
        this.scene.switch(target.properties.portal);
      }
    }
  }

  movePlayerAfterCutscene6() {
    this.scene.remove("Cutscene6");
    this.player.x = 3220;
    this.player.y = 1444;
  }
}
