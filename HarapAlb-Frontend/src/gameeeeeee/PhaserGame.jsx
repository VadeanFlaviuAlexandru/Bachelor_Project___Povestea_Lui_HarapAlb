import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Button } from "@mui/material";

export default function PhaserGame() {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser",
      width: 700,
      height: 500,
      scene: [,],
    };

    const game = new Phaser.Game(config);

    gameRef.current = game;

    return () => {
      game.destroy(true);
    };
  }, []);

  const changeScene = () => {
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
