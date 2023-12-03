import React from "react";
import { Button, Stack } from "@mui/material";
import Phaser from "phaser";

class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {}

  create() {
    console.log("scene1");

    this.add.text(20, 40, "Hello World", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    this.input.keyboard.on("keydown-SPACE", this.changeScene, this);
  }

  changeScene() {
    this.scene.start("PlayGame2");
  }
}

export default PlayGame;
