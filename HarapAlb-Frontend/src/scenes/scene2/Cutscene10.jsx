import Align from "../../utilities/scene/Align";
import chooseDialogComponent from "../../utilities/scene/DialogLength";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene10 extends Phaser.Scene {
  constructor() {
    super("Cutscene10");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B48", "/scene2/B48.png");
    this.load.image("B49", "/scene2/B49.png");
    this.load.image("B50", "/scene2/B50.png");
    this.load.image("B51", "/scene2/B51.png");
    this.load.image("B52", "/scene2/B52.png");
  }
  create() {
    let Dialogs = [
      "Fiul craiului ce era să facă? Îi spune cu de-amănuntul, căci, dă, care om nu ține la viață înainte de toate?",
      "— Bine, atâta am vrut să aflu din gura ta, pui de viperă ce mi-ai fost, zice atunci Spânul: numai cată să fie așa, că, de te-oi prinde cu oca mică, greu are să-ți cadă. Chiar acum aș putea să te omor, în voia cea bună, dar mi-i milă de tinerețile tale... Dacă vrei să mai vezi soarele cu ochii și să mai calci pe iarbă verde, atunci jură-mi-te pe ascuțișul paloșului tău că mi-i da ascultare și supunere întru toate, chiar și-n foc de ți-aș zice să te arunci.",
      "Și, de azi înainte, eu o să fiu în locul tău nepotul împăratului, despre care mi-ai vorbit, iară tu — sluga mea; și atâta vreme să ai a mă sluji, până când îi muri și iar îi învia. Și oriunde vei merge cu mine, nu care cumva să bleștești din gură către cineva despre ceea ce a urmat între noi, că te-am șters de pe fața pământului. Îți place așa să mai trăiești, bine-de-bine; iară de nu, spune-mi verde în ochi, ca să știu ce leac trebuie să-ți fac...",
      "Fiul craiului, văzându-se prins în clește și fără nici o putere, îi jură credință și supunere întru toate, lăsându-se în știrea lui Dumnezeu, cum a vrea el să facă. Atunci Spânul pune mâna pe cartea, pe banii și pe armele fiului de crai și le ia la sine; apoi îl scoate din fântână și-i dă paloșul să-l sărute, ca semn de pecetluire a jurământului, zicând: ",
      "— De-acum înainte să știi că te cheamă Harap-Alb; aista ți-i numele, și altul nu.",
      "După aceasta încalecă, fiecare pe calul său, și pornesc, Spânul înainte, ca stăpân, Harap-Alb în urmă, ca slugă, mergând spre împărăție, Dumnezeu să ne ție, că cuvântul din poveste, înainte mult mai este.",
    ];
    let Backgrounds = ["B49", "B48", "B48", "B50", "B51", "B52"];

    let currentDialog = 0;

    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);

    chooseDialogComponent(this, Dialogs[currentDialog]).setText(
      Dialogs[currentDialog]
    );

    Align.ScaleToGameW(this.game, this.Background, 1.1);
    Align.center(this.game, this.Background);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.Background.destroy();
      this.Dialog.display(false);
      this.shortDialog.display(false);

      currentDialog++;

      if (currentDialog >= Dialogs.length) {
        window.alert("End Of Demo!");
        this.scene.start("Main");
      }

      this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
      chooseDialogComponent(this, Dialogs[currentDialog]).setText(
        Dialogs[currentDialog]
      );

      Align.ScaleToGameW(this.game, this.Background, 1.1);
      Align.center(this.game, this.Background);
    });
  }
  update() {}
}
