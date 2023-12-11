import background from "../../../assets/mini-games/quickMath/BackGround.jpg";
import spritesheet from "../../../assets/mini-games/quickMath/buttons.png";
import timebar from "../../../assets/mini-games/quickMath/timebar.png";
import Align from "../../../utilities/scene/Align";
import { LoadingScreen } from "../../../utilities/scene/LoadingScreen";
import { Music } from "../../../utilities/scene/Music";
import music6 from "/src/assets/music/TheCask.mp3";

export class QuickMath extends Phaser.Scene {
  constructor() {
    super("QuickMath");
    this.cursors = null;
    this.gameOptions = {
      maxSumLen: 5,
      timeToAnswer: 6500,
      nextLevel: 500,
    };
    this.music = null;
  }
  preload() {
    LoadingScreen(this);
    this.load.image("Background", background);
    this.load.image("timebar", timebar);
    this.load.spritesheet("buttons", spritesheet, {
      frameWidth: 400,
      frameHeight: 50,
    });
    this.load.audio("music6", music6);
  }
  create() {
    this.music = this.sound.add("music6", {
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
    this.Background = this.add.image(10, 10, "Background");
    Align.ScaleToGameW(this.game, this.Background, 1);
    Align.center(this.game, this.Background);
    this.shortDialog = this.input.keyboard.createCursorKeys();
    this.shortDialog.setText(
      "Pentru ca fiul craiului să scape, obține un scor de peste 2000 în acest joc de aritmetică! Alege răspunsul corect înainte ca timpul să expire! Ai întotdeauna mai mult timp decât crezi! Apasă mouse-ul pentru a selecta cartea."
    );
  }
  update() {
    if (this.shortDialog.visible) {
      if (this.cursors.space.isDown) {
        this.shortDialog.display(false);
        this.restartGame();
      }
      return false;
    }
  }
  restartGame() {
    this.Background.clearTint();
    if (this.questionText) {
      this.questionText.destroy();
    }
    if (this.scoreText) {
      this.scoreText.destroy();
    }
    this.isGameOver = false;
    this.score = 0;
    this.correctAnswers = 0;
    this.sumsArray = [];
    for (var i = 1; i < this.gameOptions.maxSumLen; i++) {
      this.sumsArray[i] = [[], [], []];
      for (var j = 1; j <= 3; j++) {
        this.buildThrees(j, 1, i, j);
      }
    }
    this.questionText = this.add.text(250, 160, "-", {
      font: "bold 72px Arial",
    });
    this.questionText.setOrigin(0.5);
    this.questionText.setPosition(
      this.game.config.width / 2,
      this.game.config.height / 3.7
    );
    this.scoreText = this.add.text(10, 10, "-", {
      font: "bold 24px Arial",
    });
    for (i = 0; i < 3; i++) {
      var numberButton = this.add.sprite(
        this.game.config.width / 2,
        250 + i * 75,
        "buttons"
      );
      numberButton.setFrame(i);
      numberButton.setInteractive();
      numberButton.on("pointerdown", this.checkAnswer);
    }
    var numberTimer = this.add.sprite(
      this.game.config.width / 2,
      325,
      "timebar"
    );
    this.buttonMask = this.add.sprite(
      this.game.config.width / 2,
      numberTimer.y,
      "timebar"
    );
    this.buttonMask.setVisible(false);
    var mask = this.buttonMask.createBitmapMask();
    numberTimer.setMask(mask);
    this.nextNumber();
  }
  buildThrees(initialNummber, currentIndex, limit, currentString) {
    var numbersArray = [-3, -2, -1, 1, 2, 3];
    for (var i = 0; i < numbersArray.length; i++) {
      var sum = initialNummber + numbersArray[i];
      var outputString =
        currentString + (numbersArray[i] < 0 ? "" : "+") + numbersArray[i];
      if (sum > 0 && sum < 4 && currentIndex == limit) {
        this.sumsArray[limit][sum - 1].push(outputString);
      }
      if (currentIndex < limit) {
        this.buildThrees(sum, currentIndex + 1, limit, outputString);
      }
    }
  }
  nextNumber() {
    this.scoreText.setText("Score: " + this.score.toString());
    if (this.correctAnswers > 1) {
      this.timeTween.stop();
      this.buttonMask.x = this.game.config.width / 2;
    }
    if (this.correctAnswers > 0) {
      this.timeTween = this.tweens.add({
        targets: this.buttonMask,
        x: -150,
        duration: this.gameOptions.timeToAnswer,
        callbackScope: this,
        onComplete: function () {
          this.gameOver("?");
        },
      });
    }
    this.randomSum = Phaser.Math.Between(0, 2);
    var questionLength = Math.min(
      Math.floor(this.score / this.gameOptions.nextLevel) + 1,
      4
    );
    this.questionText.setText(
      this.sumsArray[questionLength][this.randomSum][
        Phaser.Math.Between(
          0,
          this.sumsArray[questionLength][this.randomSum].length - 1
        )
      ]
    );
  }
  checkAnswer() {
    if (!this.scene.isGameOver) {
      if (this.frame.name == this.scene.randomSum) {
        this.scene.score += Math.floor((this.scene.buttonMask.x + 350) / 4);
        this.scene.correctAnswers++;
        this.scene.nextNumber();
      } else {
        if (this.scene.correctAnswers > 1) {
          this.scene.timeTween.stop();
        }
        this.scene.gameOver(this.frame.name + 1);
      }
    }
  }
  gameOver(gameOverString) {
    this.Background.setTint(0xff0000);
    this.questionText.setText(this.questionText.text + " = " + gameOverString);
    this.isGameOver = true;
    if (this.score > 2000) {
      Music(this, this.music, true);
      this.scene.start("Cutscene10");
    }
    this.shortDialog.setText(
      "Din păcate, fiul craiului nu a reușit... Hai să încercăm din nou!"
    );
  }
}
