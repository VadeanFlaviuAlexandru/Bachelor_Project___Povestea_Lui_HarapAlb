import Anims from "../../../utilities/player/Anims.jsx";
import TILES from "./Tile-Mapping";
import Dungeon from "@mikewesthad/dungeon";
import TilemapVisibility from "./Tile-Visibility.js";
import { LoadingScreen } from "../../../utilities/scene/LoadingScreen";

export class BearsMaze extends Phaser.Scene {
  constructor() {
    super("BearsMaze");
    this.cursors = null;
    this.player = null;
    this.animsManager = new Anims(this);
    this.level = 0;
    this.timedEvent;
    this.TextSalateRamase;
    this.SalateRamase = 3;
    this.durationInSeconds = 180;
    this.durationInMilliseconds = this.durationInSeconds * 1000;
    this.TimerIsDone = false;
  }
  preload() {
    LoadingScreen(this);
    this.animsManager.preload();
    this.load.image("tiles", "/mini-games/bearsMaze/sheet.jpg");
    this.shortDialog.setText(
      "Trebuie sa te grabesti! Culege cele 3 salate inainte sa se trezeasca ursul!"
    );
  }
  create() {
    this.RestartGame();

    // Create the timer

    // Create the text object
    this.textTimpRamas = this.add.text(32, 32, "", {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    });
    // Set depth and scroll factor
    this.textTimpRamas.setDepth(100);
    this.textTimpRamas.setScrollFactor(0);
    this.TextSalateRamase = this.add.text(32, 62, ``, {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    });
    this.TextSalateRamase.setDepth(100);
    this.TextSalateRamase.setScrollFactor(0);
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
          delay: 1000, // 1 second
          repeat: this.durationInSeconds - 1, // Repeat for the specified duration
          callback: this.updateTimer,
          callbackScope: this,
          loop: false, // Set to false to stop the timer after the specified duration
        });
        this.updateTimer();
        this.TimerIsDone = false;
      }
      return false;
    }
    if (this.hasPlayerReachedStairs) {
      this.player.destroy();
      this.RestartGame();
      this.SalateRamase -= 1;
      this.TextSalateRamase.setText("Salate Rămase: " + this.SalateRamase);
    }
    if (this.cursors.left.isDown)
      this.player.SetInstruction({ action: "walk", option: "left" });
    else if (this.cursors.right.isDown)
      this.player.SetInstruction({ action: "walk", option: "right" });
    if (this.cursors.up.isDown)
      this.player.SetInstruction({ action: "walk", option: "back" });
    else if (this.cursors.down.isDown)
      this.player.SetInstruction({ action: "walk", option: "front" });
    this.player.update();
    if (this.TimerIsDone) {
      this.shortDialog.setText(
        "Din pacate Harap-Alb nu a reusit sa culeaga salatele si ursul s-a trezit. Hai sa incercam din nou!"
      );
      this.player.ForceStop();
      this.RestartGame();
      this.resetUI();
    }
    if (this.SalateRamase == 0) {
      alert("done!");
    }
  }
  resetUI() {
    this.textTimpRamas.setText("Timp rămas: 03:00");
    this.SalateRamase = 3;
    this.TextSalateRamase.setText("Salate Rămase: " + this.SalateRamase);
  }
  RestartGame() {
    const cam = this.cameras.main;
    cam.fadeOut(250, 0, 0, 0);
    this.level++;
    this.hasPlayerReachedStairs = false;

    // Generate a random world with a few extra options:
    //  - Rooms should only have odd number dimensions so that they have a center tile.
    //  - Doors should be at least 2 tiles away from corners, so that we can place a corner tile on
    //    either side of the door location
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 2,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true },
      },
    });

    // Creating a blank tilemap with dimensions matching the dungeon
    const map = this.make.tilemap({
      tileWidth: 48,
      tileHeight: 48,
      width: this.dungeon.width,
      height: this.dungeon.height,
    });
    const tileset = map.addTilesetImage("tiles", null, 48, 48, 1, 2); // 1px margin, 2px spacing
    this.groundLayer = map
      .createBlankLayer("Ground", tileset)
      .fill(TILES.BLANK);
    this.stuffLayer = map.createBlankLayer("Stuff", tileset);
    const shadowLayer = map
      .createBlankLayer("Shadow", tileset)
      .fill(TILES.BLANK);

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);

    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach((room) => {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the floor with mostly clean tiles
      this.groundLayer.weightedRandomize(
        TILES.FLOOR,
        x + 1,
        y + 1,
        width - 2,
        height - 2
      );

      // Place the room corners tiles
      this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
      this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

      // Fill the walls with mostly clean tiles
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

      // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
      // room's location
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
    // Separate out the rooms into:
    //  - The starting room (index = 0)
    //  - A random room to be designated as the end room (with stairs and nothing else)
    //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(
      0,
      rooms.length * 0.9
    );
    // Place the stairs
    this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);
    // Place stuff in the 90% "otherRooms"
    otherRooms.forEach((room) => {
      const rand = Math.random();
      if (rand <= 0.25) {
        // 25% chance of chest
        this.stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
      } else if (rand <= 0.5) {
        // 50% chance of a pot anywhere in the room... except don't block a door!
        const x = Phaser.Math.Between(room.left + 2, room.right - 2);
        const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        this.stuffLayer.weightedRandomize(x, y, 1, 1, TILES.POT);
      } else {
        // 25% of either 2 or 4 towers, depending on the room size
        if (room.height >= 9) {
          this.stuffLayer.putTilesAt(
            TILES.TOWER,
            room.centerX - 1,
            room.centerY + 1
          );
          this.stuffLayer.putTilesAt(
            TILES.TOWER,
            room.centerX + 1,
            room.centerY + 1
          );
          this.stuffLayer.putTilesAt(
            TILES.TOWER,
            room.centerX - 1,
            room.centerY - 2
          );
          this.stuffLayer.putTilesAt(
            TILES.TOWER,
            room.centerX + 1,
            room.centerY - 2
          );
        } else {
          this.stuffLayer.putTilesAt(
            TILES.TOWER,
            room.centerX - 1,
            room.centerY - 1
          );
          this.stuffLayer.putTilesAt(
            TILES.TOWER,
            room.centerX + 1,
            room.centerY - 1
          );
        }
      }
    });
    // Not exactly correct for the tileset since there are more possible floor tiles, but this will
    // do for the example.
    this.groundLayer.setCollisionByExclusion([
      3, 4, 5, 7, 8, 13, 32, 51, 6, 2, 40, 38, 0, 166, 81, 245, 244, 246,
    ]);
    this.stuffLayer.setTileIndexCallback(TILES.STAIRS, () => {
      this.stuffLayer.setTileIndexCallback(TILES.STAIRS, null);
      this.hasPlayerReachedStairs = true;
    });
    // Place the player in the center of the map
    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    window.player = this.player = this.add.character({
      x: x,
      y: y,
      name: "HarapAlb",
      image: "HarapAlb",
      speed: 500,
    });
    // Watch the player and tilemap layers for collisions, for the duration of the scene:
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.stuffLayer);
    this.player.setTexture("HarapAlb", "HarapAlb-front");
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
    this.textTimpRamas.setText("Timp rămas: " + formattedTime);
    if (remainingTime <= 0) {
      this.TimerIsDone = true;
    }
  }
}
