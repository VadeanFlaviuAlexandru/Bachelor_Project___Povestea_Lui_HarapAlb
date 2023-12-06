import B22 from "../../assets/scene1/B22.png";
import B23 from "../../assets/scene1/B23.png";
import B7 from "../../assets/scene1/B27.png";
import Align from "../../utilities/scene/Align";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene2 extends Phaser.Scene {
  constructor() {
    super("Cutscene2");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B22", B22);
    this.load.image("B23", B23);
    this.load.image("B7", B7);
  }
  create() {
    let Dialogs = [
      "— Dă-mi voie ca să mă duc și eu pe urma fraților mei, nu de alta, dar ca să-mi încerc norocul. Și ori oi putea izbuti, ori nu, dar îți făgăduiesc dinainte că, odată pornit din casa d-tale, înapoi nu m-oi mai întoarce, să știu bine că m-oi întâlni și cu moartea în cale. ",
      "— Lucru negândit, dragul tatei, să aud așa vorbe tocmai din gura ta, zise craiul. Frații tăi au dovedit că nu au inimă într-înșii, și din partea lor mi-am luat toată nădejdea. Doar tu să fii mai viteaz, dar parcă tot nu-mi vine a crede. Însă, dacă vrei și vrei numaidecât să te duci, eu nu te opresc, dar mi-i nu cumva să te întâlnești cu scârba în drum și să dai și tu cinstea pe rușine, c-apoi atunci curat îți spun că nu mai ai ce căuta la casa mea. ",
      "— Apoi dă, tată, omul e dator să se încerce. Am să pornesc și eu într-un noroc și cum a da Dumnezeu! Numai, te rog, dă-mi calul, armele și hainele cu care ai fost d-ta mire, ca să mă pot duce. ",
      "— Hei, hei! dragul tatei, cu vorba aceasta mi-ai adus aminte de cântecul cela: \n\nVoinic tânăr, cal bătrân,\nGreu se-ngăduie la drum!",
      "D-apoi calul meu de pe atunci cine mai știe unde i-or fi putrezind ciolanele! Că doar nu era să trăiască un veac de om! Cine ți-a vârât în cap și una ca aceasta, acela încă-i unul... Ori vorba ceea: Pesemne umbli după cai morți să le iei potcoavele. ",
      "— Tată, atâta cer și eu de la d-ta. Acum, ori c-a fi trăind calul, ori că n-a fi trăind, aceasta mă privește pe mine; numai vreau să știu dacă mi-l dai ori ba. ",
      "— Din partea mea, dat să-ți fie, dragul tatei, dar mi-i de-a mirarea de unde ai să-l iei, dacă n-are ființă pe lume. ",
      "— Despre aceasta nu mă plâng eu, tată, bine că mi l-ai dat; de unde-a fi, de unde n-a fi, dacă l-oi găsi, al meu să fie. ",
    ];
    let Backgrounds = ["B22", "B7", "B23", "B7", "B7", "B23", "B7", "B23"];
    let currentDialog = 0;
    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
    this.Dialog.setText(Dialogs[currentDialog]);
    Align.ScaleToGameW(this.game, this.Background, 0.8);
    Align.center(this.game, this.Background);
    this.input.keyboard.on("keydown-SPACE", () => {
      this.Background.destroy();
      currentDialog++;
      if (currentDialog >= Dialogs.length) {
        this.scene.wake("Scene1");
      }
      this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
      this.Dialog.setText(Dialogs[currentDialog]);
      Align.ScaleToGameW(this.game, this.Background, 0.8);
      Align.center(this.game, this.Background);
    });
  }
  update() {}
}
