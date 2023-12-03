import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import playGame from "./scene";
import playGame2 from "./scene2";
import { Button } from "@mui/material";

export default function Test() {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser",
      width: 700,
      height: 500,
      scene: [playGame, playGame2],
    };

    const game = new Phaser.Game(config);

    // Set the game instance to the ref
    gameRef.current = game;

    return () => {
      game.destroy(true);
    };
  }, []);

  const changeScene = () => {
    // Access the game instance from the ref and call the changeScene method
    if (gameRef.current) {
      gameRef.current.scene.scenes[0].changeScene();
    }
  };

  return (
    <div>
      <div id="phaser" />
      <Button variant="outlined" onClick={changeScene}>
        Change Scene
      </Button>
    </div>
  );
}
