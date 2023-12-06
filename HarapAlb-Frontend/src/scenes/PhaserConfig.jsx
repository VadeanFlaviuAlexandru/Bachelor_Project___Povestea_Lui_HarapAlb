import { Button } from "@mui/material";
import Phaser from "phaser";
import React, { useEffect, useRef } from "react";
import { CharacterPlugin } from "../utilities/player/Character";
import { Cutscene } from "../utilities/scene/Cutscene";
import { GameInfo } from "../utilities/scene/GameInfo";
import { MainMenu } from "./MainMenu";
import "./PhaserConfig.scss";
import { BearsMaze } from "../scenes/mini-Games/bearsMaze/BearsMaze";
import { Board } from "../scenes/mini-Games/memoryMatch/Board";
import { QuickMath } from "../scenes/mini-Games/quickMath/QuickMath";
import { Cutscene1 } from "../scenes/scene1/Cutscene1";
import { Cutscene2 } from "../scenes/scene1/Cutscene2";
import { Cutscene3 } from "../scenes/scene1/Cutscene3";
import { Cutscene4 } from "../scenes/scene1/Cutscene4";
import { Scene1 } from "../scenes/scene1/Scene1";
import { Scene1Attic } from "../scenes/scene1/Scene1Attic";
import { Cutscene10 } from "../scenes/scene2/Cutscene10";
import { Cutscene5 } from "../scenes/scene2/Cutscene5";
import { Cutscene6 } from "../scenes/scene2/Cutscene6";
import { Cutscene7 } from "../scenes/scene2/Cutscene7";
import { Cutscene8 } from "../scenes/scene2/Cutscene8";
import { Cutscene9 } from "../scenes/scene2/Cutscene9";
import { Scene2 } from "../scenes/scene2/Scene2";
import { Scene2Forest } from "../scenes/scene2/Scene2Forest";
import { Scene2Forest3 } from "../scenes/scene2/Scene2Forestp3";
import { Cutscene11 } from "../scenes/scene3/Cutscene11";
import { Cutscene12 } from "../scenes/scene3/Cutscene12";

export default function PhaserConfig() {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser",
      width: 1166,
      height: 630,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      plugins: {
        global: [
          { key: "CharacterPlugin", plugin: CharacterPlugin, start: true },
        ],
        scene: [
          { key: "Dialog", plugin: Cutscene, mapping: "Dialog" },
          { key: "GameInfo", plugin: GameInfo, mapping: "GameInfo" },
        ],
      },
      scene: [
        MainMenu,
        Cutscene1,
        Scene1,
        Cutscene2,
        Scene1Attic,
        Cutscene3,
        Cutscene4,
        Board,
        Scene2,
        Cutscene5,
        Cutscene6,
        Scene2Forest,
        Cutscene7,
        Cutscene8,
        Scene2Forest3,
        Cutscene9,
        QuickMath,
        Cutscene10,
        Cutscene11,
        Cutscene12,
        BearsMaze,
      ],
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      game.scene.stop("Cutscene1");
      game.scene.remove("Cutscene1");
      game.plugins.removeScenePlugin("CharacterPlugin");
      game.plugins.removeScenePlugin("Dialog");
      game.plugins.removeScenePlugin("GameInfo");
      game.destroy(true);
    };
  }, []);

  const changeScene = () => {
    if (gameRef.current) {
      gameRef.current.scene.start("Cutscene1");
    }
  };

  return (
    <div className="phaserContainer">
      <div className="phaser" id="phaser" />
      <Button className="playButton" variant="contained" onClick={changeScene}>
        Start
      </Button>
    </div>
  );
}
