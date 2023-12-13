import Align from "../utilities/scene/Align";
import { Music } from "../utilities/scene/Music";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {
    this.load.image("Background", "/background/MainMenu.png");
    this.load.image("Smoke", "/background/smoke.png");
    this.load.audio("music1", "/music/JocDeInceput.mp3");
  }

  create() {
    if (!localStorage.getItem("PovesteaLuiHarapAlb-music")) {
      localStorage.setItem("PovesteaLuiHarapAlb-music", true);
    }
    this.music = this.sound.add("music1", {
      volume: 0.2,
      loop: true,
    });
    if (localStorage.getItem("PovesteaLuiHarapAlb-music") === "true") {
      Music(this, this.music, false);
    } else {
      Music(this, this.music, true);
    }
    this.cameras.main.fadeIn(2000, 0, 0, 0);
    this.background = this.add.image(10, 10, "Background");
    var particles = this.add.particles("Smoke");

    Align.ScaleToGameW(this.game, this.background, 1);
    Align.center(this.game, this.background);

    this.add.text(550, 50, "Povestea lui Harap-Alb", {
      fontFamily: "GraphicPixel, sans-serif",
      fontSize: 50,
    });
    this.add.text(950, 110, "- Ion Creanga", {
      fontFamily: "GraphicPixel, sans-serif",
      fontSize: 25,
    });

    particles.createEmitter({
      x: 795,
      y: 530,
      speed: { min: -100, max: 20 },
      scale: { start: 0.04, end: 0.04 },
      blendMode: "ADD",
      lifespan: 1500,
      frequency: 900,
      alpha: { start: 0.2, end: 0 },
      angle: { min: -90, max: -90 },
    });
  }
  update() {}
}
