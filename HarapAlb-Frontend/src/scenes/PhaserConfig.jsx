import { Button } from "@mui/material";
import Phaser from "phaser";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeaderboardScore,
  updateLeaderboardScore,
} from "../api/leaderboard/leaderboardApi";
import { ControlsModal } from "../components/modal/ControlsModal";
import Sidebar from "../components/sidebar/Sidebar";
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
import { addMiniGame, updateMiniGame } from "../store/user/UserSlice";
import miniGames from "../utilities/miscellaneous/minigameData";
import { CharacterPlugin } from "../utilities/player/Character";
import { Cutscene } from "../utilities/scene/Cutscene";
import { ShortCutscene } from "../utilities/scene/ShortCutscene";
import { MainMenu } from "./MainMenu";
import "./PhaserConfig.scss";

export default function PhaserConfig() {
  const gameRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const [ready, setReady] = useState(false);
  const [controlsModal, setControlsModal] = useState(false);

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
          { key: "shortDialog", plugin: ShortCutscene, mapping: "shortDialog" },
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
        BearsMaze,
      ],
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    setTimeout(() => {
      setReady(true);
      setControlsModal(true);
    }, 4500);

    return () => {
      game.scene.stop("Cutscene1");
      game.scene.remove("Cutscene1");
      game.plugins.removeScenePlugin("CharacterPlugin");
      game.plugins.removeScenePlugin("Dialog");
      game.plugins.removeScenePlugin("shortDialog");
      game.destroy(true);
    };
  }, []);

  const changeScene = () => {
    if (gameRef.current) {
      setPlay(true);
      const mainMenuScene = gameRef.current.scene.getScene("MainMenu");
      mainMenuScene.cameras.main.fadeOut(1500, 0, 0, 0);
      mainMenuScene.cameras.main.once("camerafadeoutcomplete", () => {
        gameRef.current.scene.remove("MainMenu");
        gameRef.current.sound.removeByKey("music1");
        if (user != undefined) {
          mainMenuScene.registry.set("LoggedIn", true);
          miniGames.forEach((game) => {
            mainMenuScene.registry.set(game, 0);
          });
          user.miniGamesScore.forEach((game) => {
            if (game != null) {
              const { name, score } = game;
              mainMenuScene.registry.set(name, score);
            }
          });
        }
        gameRef.current.scene
          .getScene("Board")
          .events.on("BoardScore", (minigameData) => {
            dispatchScore(minigameData);
          });
        gameRef.current.scene
          .getScene("QuickMath")
          .events.on("QuickMathScore", (minigameData) => {
            dispatchScore(minigameData);
          });
        gameRef.current.scene
          .getScene("BearsMaze")
          .events.on("BearsMazeScore", (minigameData) => {
            dispatchScore(minigameData);
          });
        gameRef.current.scene
          .getScene("Board")
          .events.on("BoardScoreUpdate", (minigameData) => {
            dispatchScoreUpdate(minigameData);
          });
        gameRef.current.scene
          .getScene("QuickMath")
          .events.on("QuickMathScoreUpdate", (minigameData) => {
            dispatchScoreUpdate(minigameData);
          });
        gameRef.current.scene
          .getScene("BearsMaze")
          .events.on("BearsMazeScoreUpdate", (minigameData) => {
            dispatchScoreUpdate(minigameData);
          });
        gameRef.current.scene.start("Cutscene1");
      });
    }
  };

  const dispatchScoreUpdate = (minigameData) => {
    updateLeaderboardScore({
      score: minigameData.score,
      id: user.miniGamesScore.find((game) => game.name === minigameData.name)
        ?.id,
    }).then((response) => {
      dispatch(updateMiniGame(response));
    });
  };

  const dispatchScore = (minigameData) => {
    addLeaderboardScore(minigameData, user.user.id).then((response) => {
      dispatch(addMiniGame(response));
    });
  };

  const stopAllMusic = () => {
    if (gameRef.current) {
      gameRef.current.sound.stopAll();
    }
  };

  const handleKeyDown = (event) => {
    const isSpaceBarPressed = event.key === " ";
    const isInsideButton = event.target.closest(".playButton");

    if (isSpaceBarPressed && isInsideButton) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="phaserContainer">
      <div className="phaser" id="phaser" />
      <div className="gameButtons">
        {!play && (
          <Button
            disabled={!ready}
            className="playButton"
            variant="contained"
            onClick={changeScene}
          >
            Start
          </Button>
        )}
        <Sidebar play={play} ready={ready} stopMusic={stopAllMusic} />
        <ControlsModal open={controlsModal} setOpen={setControlsModal} />
      </div>
    </div>
  );
}
