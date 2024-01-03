import {
  longTip,
  veryLongTip,
} from "../../../utilities/notifications/Notifications";
import Align from "../../../utilities/scene/Align";
import { LoadingScreen } from "../../../utilities/scene/LoadingScreen";
import MiniGameCounter from "../../../utilities/scene/MiniGameCounter";
import { Music } from "../../../utilities/scene/Music";

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
    this.tipCounter = 0;
  }
  preload() {
    LoadingScreen(this);
    this.load.image("background", "/mini-games/quickMath/background.jpg");
    this.load.image("timebar", "/mini-games/quickMath/timebar.png");
    this.load.spritesheet("buttons", "/mini-games/quickMath/buttons.png", {
      frameWidth: 400,
      frameHeight: 50,
    });
    this.load.audio("music6", "/music/TheCask.mp3");
  }
  create() {
    this.music = this.sound.add("music6", {
      volume: 0.2,
      loop: true,
    });
    if (localStorage.getItem("PovesteaLuiHarapAlb-music") === "true") {
      Music(this, this.music, false);
    } else {
      Music(this, this.music, true);
    }

    this.background = this.add.image(10, 10, "background");

    Align.ScaleToGameW(this.game, this.background, 1);
    Align.center(this.game, this.background);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.shortDialog.setText(
      "Pentru ca fiul craiului să scape, obține un scor de peste două mii în acest joc de aritmetică! Alege răspunsul corect înainte ca timpul să expire! Apasă mouse-ul pentru a selecta cartea."
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
    this.background.clearTint();
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

    this.scoreText = MiniGameCounter(20, 20, this);

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
      if (this.timeTween) {
        this.timeTween.stop();
      }
      this.timeTween = this.tweens.add({
        targets: this.buttonMask,
        x: 180,
        duration: this.gameOptions.timeToAnswer,
        callbackScope: this,
        onComplete: function () {
          this.gameOver("...");
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
        this.scene.gameOver(this.frame.name + 1 + " ... dar ai greșit");
      }
    }
  }
  gameOver(gameOverString) {
    if (this.score > 2000) {
      if (this.registry.get("LoggedIn") == true) {
        this.events.emit("QuickMathScore", {
          name: "Jocul de aritmetcă",
          score: this.score,
        });
      }

      if (this.registry.get("LoggedIn") == true) {
        if (this.registry.get("Jocul de aritmetcă") == 0) {
          this.events.emit("QuickMathScore", {
            name: "Jocul de aritmetcă",
            score: this.score,
          });
        } else if (this.registry.get("Jocul de aritmetcă") > this.timer) {
          this.events.emit("QuickMathScoreUpdate", {
            name: "Jocul de aritmetcă",
            score: this.score,
          });
        }
      }

      this.scene.start("Cutscene10");
    } else {
      this.tipCounter += 1;
      switch (this.tipCounter) {
        case 1:
          veryLongTip(
            "⭐Ai mereu mai mult timp decât îți închipui pentru a oferi un răspuns! Dacă simți presiunea timpului, este mai bine să ignori cronometrul și să te concentrezi pe rezolvarea problemei.⭐"
          );
          break;
        case 3:
          longTip(
            "⭐Dacă întrebarea pare dificilă, descompune-o în părți mai mici. Rezolvarea pas cu pas face matematica mai ușoară!⭐"
          );
          break;
        case 5:
          longTip(
            "⭐Dacă simți presiune, ia o respirație adâncă. Ești mai capabil decât crezi! Concentrează-te și rezolvă fiecare întrebare pe rând.⭐"
          );
          break;
      }
      this.background.setTint(0xff0000);
      this.questionText.setText(
        this.questionText.text + " = " + gameOverString
      );
      this.isGameOver = true;
      this.shortDialog.setText(
        "Din păcate, fiul craiului nu a reușit... Hai să încercăm din nou!"
      );
    }
  }
}
