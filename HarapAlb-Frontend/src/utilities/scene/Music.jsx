export const Music = (scene, music, turnedOff) => {
  let globalMusic = music;

  if (turnedOff) {
    globalMusic.stop();
    return;
  }

  if (!scene.sound.locked) {
    globalMusic.play();
  } else {
    scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
      globalMusic.play();
    });
  }
};
