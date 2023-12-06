export const Music = (scene, music, turnedOff) => {
  let globalMusic = music;
  if (turnedOff) {
    globalMusic.stop();
    scene.registry.set("HarapAlbMusicOption", 0);
  } else {
    scene.registry.set("HarapAlbMusicOption", 1);
    if (!scene.sound.locked) {
      globalMusic.play();
    } else {
      scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        globalMusic.play();
      });
    }
  }
};