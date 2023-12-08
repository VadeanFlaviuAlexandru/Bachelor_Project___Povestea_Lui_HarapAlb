import BackGround from "../../../assets/mini-games/memoryMatch/Background.jpg";
import Align from "../../../utilities/scene/Align";
import { getRandomInt } from "../../../utilities/scene/Random";
import { Music } from "../../../utilities/scene/music";
import { LoadingScreen } from "../../../utilities/scene/LoadingScreen";
import Card from "./Card";
// import { images } from "./ImageUtils";
import back from "../../../assets/mini-games/memoryMatch/back.png";
import card1 from "../../../assets/mini-games/memoryMatch/card1.png";
import card2 from "../../../assets/mini-games/memoryMatch/card2.png";
import card3 from "../../../assets/mini-games/memoryMatch/card3.png";
import card4 from "../../../assets/mini-games/memoryMatch/card4.png";
import front from "../../../assets/mini-games/memoryMatch/front.png";

export class Board extends Phaser.Scene {
  constructor() {
    super("Board");
    this.Cards = [];
    this.selectedCards = [];
    this.attempts = 0;
    this.waitForNewRound = false;
    this.score;
    this.cursors = null;
    this.timedEvent;
    this.text;
    this.music = null;
  }
  preload() {
    LoadingScreen(this);
    this.load.image("background", BackGround);
    this.loadCards();
    this.shortDialog.setText(
      'Pentru ca fiul craiului să învingă acest urs, trebuie completat "Jocul de memorie". Trebuie să găsești perechi de cărți cu aceeași imagine în cel mult 15 de secunde! Apasă mouse-ul pentru a alege cartea.'
    );
    this.load.audio("music4", "src/assets/music/TurningDance.mp3");
  }
  create() {
    this.music = this.sound.add("music4", {
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
    this.background = this.add.image(10, 10, "background");
    Align.ScaleToGameW(this.game, this.background, 1);
    Align.center(this.game, this.background);
    this.text = this.add.text(32, 32, "", {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    });
    this.text.setDepth(100);
    this.text.setScrollFactor(0);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shuffle();
  }
  update() {
    if (this.shortDialog.visible) {
      //dialog
      if (this.cursors.space.isDown) {
        this.restartGame();
        this.timedEvent = this.time.delayedCall(15500, this.onEvent, [], this);
        this.shortDialog.display(false);
        this.background.clearTint();
      }
      return false;
    }
    this.time.addEvent({
      delay: 1000, // Update every 1 second
      callback: function () {
        var remainingTime = Math.ceil(
          (this.timedEvent.delay - this.timedEvent.elapsed) / 1000
        );
        this.text.setText(
          "Timp rămas: " + remainingTime.toString() + " secunde"
        );
      },
      callbackScope: this,
      loop: true,
    });
  }
  loadCards() {
    // const imagesArray = Object.keys(images).map((name) => ({
    //   key: name,
    //   url: images[name].default,
    // }));
    // this.load.image(imagesArray);
    this.load.image("back", back);
    this.load.image("card1", card1);
    this.load.image("card2", card2);
    this.load.image("card3", card3);
    this.load.image("card4", card4);
    this.load.image("front", front);
  }
  cardClickHandler(card) {
    if (!this.shortDialog.visible) {
      if (
        this.waitForNewRound ||
        card.out ||
        this.selectedCards.includes(card)
      ) {
        return;
      }
      card.faceUp();
      this.selectedCards.push(card);
      if (this.selectedCards.length === 2) {
        this.newRound();
      }
    }
  }
  newRound() {
    this.waitForNewRound = true;
    setTimeout(() => {
      if (this.matchCards()) {
        this.setAsReadOnly();
      } else {
        this.faceCardsDown();
      }
      this.updateScore();
      this.selectedCards.length = 0;
      this.waitForNewRound = false;
      this.attempts++;
    }, 1000);
  }
  matchedCards() {
    return this.Cards.filter((card) => card.outOfTheGame).length / 2;
  }
  updateScore() {
    var style = {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    };
    if (!this.score) {
      this.score = this.add.text(0, 400, "", style);
    }
    const efficiency = this.attempts
      ? ((this.matchedCards() / this.attempts) * 100).toFixed(0)
      : 0;
    if (this.matchedCards() === 4) {
      setTimeout(() => {
        Music(this, this.music, true);
        this.scene.start("Cutscene6");
      }, 125);
    }
  }
  setAsReadOnly() {
    this.selectedCards.forEach((card) => card.readOnly());
  }
  faceCardsDown() {
    this.selectedCards.forEach((card) => card.faceDown());
  }
  matchCards() {
    if (!this.selectedCards.length) {
      return;
    }
    const cardA = this.selectedCards[0];
    const cardB = this.selectedCards[1];
    return cardA.key === cardB.key;
  }
  onEvent() {
    this.restartGame();
    this.background.setTint(0xff0000);
    this.shortDialog.setText(
      "Din păcate, fiul craiului nu a putut rămane concentrat... Hai să încercăm din nou!"
    );
  }
  restartGame() {
    this.selectedCards.length = 0;
    this.Cards.forEach((card) => {
      card.faceDown();
      card.outOfTheGame = false;
    });
    this.shuffle();
  }
  shuffle() {
    const MAX_CARD_PER_LINE = 4;
    const PAIRS = 4;
    const H_OFFSET = 200;
    const V_OFFSET = 200;
    const INITIAL_X = this.game.config.width / 3.5;
    const INITIAL_Y = this.game.config.height / 4;
    const lines =
      parseInt((PAIRS * 2) / MAX_CARD_PER_LINE) +
      (((PAIRS * 2) / MAX_CARD_PER_LINE) % MAX_CARD_PER_LINE ? 1 : 0);
    const numberOfCards = PAIRS * 2;
    const positions = [];
    const imageNames = ["card1", "card2", "card3", "card4"].slice(0, PAIRS);
    let total = numberOfCards;
    for (let line = 0; line < lines; line++) {
      for (let pos = 0; pos < MAX_CARD_PER_LINE; pos++) {
        if (total > 0) {
          positions.push({
            x: INITIAL_X + H_OFFSET * pos,
            y: INITIAL_Y + V_OFFSET * line,
          });
        }
        total--;
      }
    }
    while (positions.length) {
      const posA = positions.splice(getRandomInt(positions.length), 1)[0];
      const posB = positions.splice(getRandomInt(positions.length), 1)[0];
      const key = imageNames.splice(getRandomInt(imageNames.length), 1)[0];
      this.Cards.push(
        new Card({
          key,
          gameScene: this,
          ...posA,
          handler: this.cardClickHandler.bind(this),
        })
      );
      this.Cards.push(
        new Card({
          key,
          gameScene: this,
          ...posB,
          handler: this.cardClickHandler.bind(this),
        })
      );
    }
  }
}
