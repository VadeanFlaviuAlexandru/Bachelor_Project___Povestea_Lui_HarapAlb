import { Button } from "@mui/material";
import Phaser from "phaser";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { BearsMaze } from "../scenes/mini-Games/bearsMaze/BearsMaze.jsx";
import { Board } from "../scenes/mini-Games/memoryMatch/Board.jsx";
import { QuickMath } from "../scenes/mini-Games/quickMath/QuickMath.jsx";
import { Cutscene1 } from "../scenes/scene1/Cutscene1.jsx";
import { Cutscene2 } from "../scenes/scene1/Cutscene2.jsx";
import { Cutscene3 } from "../scenes/scene1/Cutscene3.jsx";
import { Cutscene4 } from "../scenes/scene1/Cutscene4.jsx";
import { Scene1 } from "../scenes/scene1/Scene1.jsx";
import { Scene1Attic } from "../scenes/scene1/Scene1Attic.jsx";
import { Cutscene10 } from "../scenes/scene2/Cutscene10.jsx";
import { Cutscene5 } from "../scenes/scene2/Cutscene5.jsx";
import { Cutscene6 } from "../scenes/scene2/Cutscene6.jsx";
import { Cutscene7 } from "../scenes/scene2/Cutscene7.jsx";
import { Cutscene8 } from "../scenes/scene2/Cutscene8.jsx";
import { Cutscene9 } from "../scenes/scene2/Cutscene9.jsx";
import { Scene2 } from "../scenes/scene2/Scene2.jsx";
import { Scene2Forest } from "../scenes/scene2/Scene2Forest.jsx";
import { Scene2Forest3 } from "../scenes/scene2/Scene2Forestp3.jsx";
import { Cutscene11 } from "../scenes/scene3/Cutscene11.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeaderboardScore,
  updateLeaderboardScore,
} from "../api/leaderboard/LeaderboardApi.jsx";
import { ControlsModal } from "../components/modal/ControlsModal.jsx";
import { addMiniGame, updateMiniGame } from "../store/user/UserSlice.jsx";
import { CharacterPlugin } from "../utilities/player/Character.jsx";
import { Cutscene } from "../utilities/scene/Cutscene.jsx";
import { ShortCutscene } from "../utilities/scene/ShortCutscene.jsx";
import { MainMenu } from "./MainMenu.jsx";
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

  const miniGames = [
    "Jocul de memorie",
    "Jocul de aritmetică",
    "Grădina Ursului",
  ];

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
