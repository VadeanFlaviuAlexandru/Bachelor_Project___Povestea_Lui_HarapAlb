import Dungeon from "@mikewesthad/dungeon";
import Anims from "../../../utilities/player/Anims.js";
import PlayerCreation from "../../../utilities/player/PlayerCreation.js";
import { PlayerInstructions } from "../../../utilities/player/PlayerInstructions.js";
import { LoadingScreen } from "../../../utilities/scene/LoadingScreen.js";
import { Music } from "../../../utilities/scene/Music.js";
import TILES from "./Tile-Mapping";
import TilemapVisibility from "./Tile-Visibility";

export class BearsMaze extends Phaser.Scene {
  constructor() {
    super("BearsMaze");
    this.cursors = null;
    this.player = null;
    this.animsManager = new Anims(this);
    this.level = 0;
    this.timedEvent;
    this.TextSalateRamase;
    this.SalateRamase = 4;
    this.durationInSeconds = 180;
    this.durationInMilliseconds = this.durationInSeconds * 1000;
    this.TimerIsDone = false;
    this.timer = 0;
  }
  preload() {
    LoadingScreen(this);
    this.animsManager.preload();
    this.load.image("tiles", "/mini-games/bearsMaze/sheet.png");
    this.shortDialog.setText(
      "Să nu pierzi timpul! Strânge cele patru salate înainte să se trezească ursul!"
    );
    this.load.audio("music7", "/music/CoupleDance.mp3");
  }
  create() {
    this.music = this.sound.add("music7", {
      volume: 0.2,
      loop: true,
    });
    if (localStorage.getItem("PovesteaLuiHarapAlb-music") === "true") {
      Music(this, this.music, false);
    } else {
      Music(this, this.music, true);
    }
    this.RestartGame();

    var container = this.add.container(30, 30);

    var textBackground = this.add.graphics();
    textBackground.fillStyle(0x000000, 0.7);
    textBackground.fillRoundedRect(0, 0, 250, 70, 10);

    var borderGraphics = this.add.graphics();
    borderGraphics.lineStyle(1, 0xffffff);
    borderGraphics.strokeRoundedRect(0, 0, 250, 70, 10);
    this.textTimpRamas = this.add.text(20, 7, "", {
      align: "center",
      fontFamily: "GraphicPixel, sans-serif",
      fontSize: 25,
      color: "#ffffff",
      wordWrap: { width: 250 },
    });
    this.TextSalateRamase = this.add.text(20, 35, "", {
      align: "center",
      fontFamily: "GraphicPixel, sans-serif",
      fontSize: 25,
      color: "#ffffff",
      wordWrap: { width: 250 },
    });

    container.add(textBackground);
    container.add(borderGraphics);

    container.add(this.textTimpRamas);
    container.add(this.TextSalateRamase);

    container.setDepth(100);
    container.setScrollFactor(0);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    const playerTileX = this.groundLayer.worldToTileX(this.player.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);
    this.tilemapVisibility.setActiveRoom(playerRoom);
    if (this.shortDialog.visible) {
      if (this.cursors.space.isDown) {
        this.resetUI();
        this.shortDialog.display(false);
        this.timer = this.time.addEvent({
          delay: 1000,
          repeat: this.durationInSeconds - 1,
          callback: this.updateTimer,
          callbackScope: this,
          loop: false,
        });
        this.updateTimer();
        this.TimerIsDone = false;
      }
      return false;
    }
    if (this.hasPlayerReachedCabbage) {
      this.player.destroy();
      this.RestartGame();
      this.SalateRamase -= 1;
      this.TextSalateRamase.setText("Salate Rămase: " + this.SalateRamase);
    }
    PlayerInstructions(this);
    if (this.TimerIsDone) {
      this.shortDialog.setText(
        "Din păcate, Harap-Alb nu a reușit să adune salatele și ursul s-a trezit. Haide să încercăm din nou!"
      );
      this.player.ForceStop();
      this.RestartGame();
      this.resetUI();
    }
    if (this.SalateRamase == 0) {
      this.sound.removeByKey("music7");

      if (this.registry.get("LoggedIn") == true) {
        if (this.registry.get("Grădina Ursului") == 0) {
          this.events.emit("BearsMazeScore", {
            name: "Grădina Ursului",
            score: this.timer,
          });
        } else if (this.registry.get("Grădina Ursului") < this.timer) {
          this.events.emit("BearsMazeScoreUpdate", {
            name: "Grădina Ursului",
            score: this.timer,
          });
        }
      }

      alert(
        "Ai reușit! Din păcate, acesta este sfârșitul demoului. Ce se va întâmpla cu Harap-Alb și prin ce încercări va trece mai departe? Va deveni spanul împărat? Rămân multe întrebări fără răspuns în acest basm fantastic, pe care îți recomand să-l citești."
      );
      this.scene.start("GameOver");
    }
  }

  resetUI() {
    this.textTimpRamas.setText("Timp rămas: 03:00");
    this.SalateRamase = 4;
    this.TextSalateRamase.setText("Salate Rămase: " + this.SalateRamase);
  }

  RestartGame() {
    const cam = this.cameras.main;
    cam.fadeOut(250, 0, 0, 0);
    this.level++;
    this.hasPlayerReachedCabbage = false;

    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 2,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true },
      },
    });

    const map = this.make.tilemap({
      tileWidth: 48,
      tileHeight: 48,
      width: this.dungeon.width,
      height: this.dungeon.height,
    });

    const tileset = map.addTilesetImage("tiles", null, 48, 48, 1, 2);

    this.groundLayer = map
      .createBlankLayer("Ground", tileset)
      .fill(TILES.BLANK);

    const shadowLayer = map
      .createBlankLayer("Shadow", tileset)
      .fill(TILES.BLANK);

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);

    this.dungeon.rooms.forEach((room) => {
      const { x, y, width, height, left, right, top, bottom } = room;

      this.groundLayer.weightedRandomize(
        TILES.FLOOR,
        x + 1,
        y + 1,
        width - 2,
        height - 2
      );

      this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
      this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

      this.groundLayer.weightedRandomize(
        TILES.WALL.TOP,
        left + 1,
        top,
        width - 2,
        1
      );
      this.groundLayer.weightedRandomize(
        TILES.WALL.BOTTOM,
        left + 1,
        bottom,
        width - 2,
        1
      );
      this.groundLayer.weightedRandomize(
        TILES.WALL.LEFT,
        left,
        top + 1,
        1,
        height - 2
      );
      this.groundLayer.weightedRandomize(
        TILES.WALL.RIGHT,
        right,
        top + 1,
        1,
        height - 2
      );

      const doors = room.getDoorLocations();
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.TOP,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].y === room.height - 1) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.BOTTOM,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].x === 0) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.LEFT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        } else if (doors[i].x === room.width - 1) {
          this.groundLayer.putTilesAt(
            TILES.DOOR.RIGHT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        }
      }
    });

    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(
      0,
      rooms.length * 0.9
    );

    this.groundLayer.putTileAt(TILES.CABBAGE, endRoom.centerX, endRoom.centerY);

    otherRooms.forEach((room) => {
      const rand = Math.random();
      if (rand <= 0.25) {
        this.groundLayer.putTileAt(TILES.POT, room.centerX, room.centerY);
      } else if (rand <= 0.35) {
        this.groundLayer.putTilesAt(
          TILES.LOWER_TOWER,
          room.centerX,
          room.centerY
        );
        this.groundLayer.putTilesAt(
          TILES.UPPER_TOWER,
          room.centerX,
          room.centerY - 1
        );
      } else if (rand <= 0.45) {
        this.groundLayer.putTilesAt(
          TILES.LOWER_TOWER_DESTROYED,
          room.centerX,
          room.centerY
        );
        this.groundLayer.putTilesAt(
          TILES.UPPER_TOWER_DESTROYED,
          room.centerX,
          room.centerY - 1
        );
      } else {
        if (room.height >= 9 && rand <= 0.45) {
          this.groundLayer.putTilesAt(
            TILES.LOWER_TOWER,
            room.centerX - 1,
            room.centerY
          );
          this.groundLayer.putTilesAt(
            TILES.UPPER_TOWER,
            room.centerX - 1,
            room.centerY - 1
          );
          this.groundLayer.putTilesAt(
            TILES.LOWER_TOWER_DESTROYED,
            room.centerX + 1,
            room.centerY
          );
          this.groundLayer.putTilesAt(
            TILES.UPPER_TOWER_DESTROYED,
            room.centerX + 1,
            room.centerY - 1
          );
        }
      }
    });
    this.groundLayer.setCollisionByExclusion([
      3, 4, 5, 7, 200, 183, 8, 13, 32, 51, 6, 2, 40, 38, 0, 166, 81, 245, 244,
      182,
    ]);
    this.groundLayer.setTileIndexCallback(TILES.CABBAGE, () => {
      this.groundLayer.setTileIndexCallback(TILES.CABBAGE, null);
      this.hasPlayerReachedCabbage = true;
    });
    const playerRoom = startRoom;

    let x = map.tileToWorldX(playerRoom.centerX);
    let y = map.tileToWorldY(playerRoom.centerY);

    PlayerCreation(
      this,
      x,
      y,
      250,
      "HarapAlb",
      "HarapAlb-front",
      "HarapAlb",
      "HarapAlb"
    );
    this.physics.add.collider(this.player, this.groundLayer);

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    this.animsManager.create();
    cam.fadeIn(250, 0, 0, 0);
  }

  updateTimer() {
    const remainingTime = this.timer.repeatCount;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    // this.timer = formattedTime;
    this.textTimpRamas.setText("Timp rămas: " + formattedTime);
    if (remainingTime <= 0) {
      this.TimerIsDone = true;
    }
  }
}
