export default function chooseDialogComponent(scene, text) {
  return text.length > 200 ? scene.Dialog : scene.shortDialog;
}
