import Anims from "../../utilities/player/Anims";
import HitScript from "../../utilities/player/HitScript";
import PlayerCreation from "../../utilities/player/PlayerCreation";
import { PlayerInstructions } from "../../utilities/player/PlayerInstructions";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Scene1Attic extends Phaser.Scene {
  constructor() {
    super("Scene1Attic");
    this.cursors = null;
    this.player = null;
    this.animsManager = new Anims(this);
    this.vision = null;
  }
  preload() {
    LoadingScreen(this);
    this.load.image("tilesAttic", "src/assets/world/InteriorTiles.png");
    this.load.image("tiles2Attic", "src/assets/world/PropsTiles.png");
    this.load.tilemapTiledJSON("mapAttic", "src/assets/scene1/attic.json");
    this.animsManager.preload();
    this.load.json("scriptData", "src/assets/interactions/script.json");
    this.load.image("vision", "src/assets/world/Vision.png");
  }
  create() {
    this.registry.set("ExitAttic", 1);
    PlayerCreation(this, 560, 550, 200);
    const mapAttic = this.make.tilemap({ key: "mapAttic" });
    const tilesetAttic = mapAttic.addTilesetImage(
      "InteriorTiles",
      "tilesAttic"
    );
    const tileset2Attic = mapAttic.addTilesetImage("PropsTiles", "tiles2Attic");
    const portallayerAttic = mapAttic.createLayer("PortalLayer", tileset2Attic);
    const layer1Attic = mapAttic.createLayer("InteriorLayer", tilesetAttic);
    const layer2Attic = mapAttic.createLayer("Interior2Layer", tilesetAttic);
    const layer3Attic = mapAttic.createLayer("FamiliarLayer", tileset2Attic);
    const layer4Attic = mapAttic.createLayer("Familiar2Layer", tileset2Attic);
    const layer5Attic = mapAttic.createLayer("Interior3Layer", tilesetAttic);
    layer1Attic.setCollisionByProperty({ collide: true });
    layer2Attic.setCollisionByProperty({ collide: true });
    portallayerAttic.setCollisionByProperty({ collide: true });
    layer3Attic.setCollisionByProperty({ collide: true });
    layer4Attic.setCollisionByProperty({ collide: true });
    layer5Attic.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      portallayerAttic,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer1Attic,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer2Attic,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer3Attic,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer4Attic,
      this.HitLayer.bind(this)
    );
    this.physics.add.collider(
      this.player,
      layer5Attic,
      this.HitLayer.bind(this)
    );
    const width = this.scale.width;
    const height = this.scale.height;
    const rt = this.make.renderTexture(
      {
        width,
        height,
      },
      true
    );
    rt.fill(0x000000, 1);
    rt.draw(layer1Attic);
    rt.setTint(0x0a2948);
    const vision = (this.vision = this.make.image({
      x: this.player.x,
      y: this.player.y,
      key: "vision",
      add: false,
    }));
    vision.scale = 1.15;
    rt.mask = new Phaser.Display.Masks.BitmapMask(this, vision);
    rt.mask.invertAlpha = true;
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, mapAttic.widthInPixels, mapAttic.heightInPixels);
    camera.setBounds(0, 0, mapAttic.widthInPixels, mapAttic.heightInPixels);
    this.animsManager.create();
    this.player.setDepth(10);
    layer2Attic.setDepth(11);
    layer3Attic.setDepth(12);
    layer4Attic.setDepth(13);
    layer5Attic.setDepth(14);
    rt.setDepth(15);
    this.script = this.cache.json.get("scriptData");
    const objectLayer = mapAttic.getObjectLayer("ScriptLayer");
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
        this.physics.add.collider(
          this.player,
          tmp,
          (player, target) => HitScript(player, target, this),
          null,
          this
        );
      });
    }
  }
  update() {
    if (!this.shortDialog.visible) {
      PlayerInstructions(this);
    } else if (this.shortDialog.visible) {
      if (this.cursors.space.isDown) {
        this.shortDialog.display(false);
      }
      return false;
    }
    if (this.vision) {
      this.vision.x = this.player.x;
      this.vision.y = this.player.y;
    }
  }
  HitLayer(player, target) {
    if (target.properties.portal && !this.shortDialog.visible) {
      this.scene.start(target.properties.portal);
    }
  }

  HitScript = HitScript;
}
