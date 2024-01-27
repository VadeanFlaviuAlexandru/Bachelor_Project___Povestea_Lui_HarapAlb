export default function chooseDialogComponent(scene, text) {
  if (text !== undefined) {
    return text.length > 200 ? scene.Dialog : scene.shortDialog;
  } else {
    return scene.shortDialog;
  }
}
