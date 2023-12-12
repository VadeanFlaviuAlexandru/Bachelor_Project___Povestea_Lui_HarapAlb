import {
  CutsceneProgression,
  DestroyCutscene,
  NextCutscene,
} from "../../utilities/scene/CutsceneProgression";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene9 extends Phaser.Scene {
  constructor() {
    super("Cutscene9");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B36", "/scene2/B36.png");
    this.load.image("B37", "/scene2/B37.png");
    this.load.image("B38", "/scene2/B38.png");
    this.load.image("B39", "/scene2/B39.png");
    this.load.image("B40", "/scene2/B40.png");
    this.load.image("B41", "/scene2/B41.png");
    this.load.image("B42", "/scene2/B42.png");
    this.load.image("B43", "/scene2/B43.png");
    this.load.image("B44", "/scene2/B44.png");
    this.load.image("B45", "/scene2/B45.png");
    this.load.image("B46", "/scene2/B46.png");
    this.load.image("B47", "/scene2/B47.png");
    this.load.image("B48", "/scene2/B48.png");
    this.load.image("B49", "/scene2/B49.png");
    this.load.image("B50", "/scene2/B50.png");
    this.load.image("B51", "/scene2/B51.png");
    this.load.image("B52", "/scene2/B52.png");
  }
  create() {
    let Dialogs = [
      "— Ptiu, drace! iaca în ce încurcătură am intrat! Asta-i mai rău decât poftim la masă, zise el. Nici tu sat, nici tu târg, nici tu nimica. De ce mergi înainte, numai peste pustietăți dai; parcă a pierit sămânța omenească de pe fața pământului. Îmi pare rău că n-am luat măcar spânul cel de-al doilea cu mine. Dacă s-a aruncat în partea mâne-sa, ce-i vinovat el?",
      "Tata așa a zis, însă la mare nevoie ce-i de făcut? vorba ceea: Rău-i cu rău, dar e mai rău făr’ de rău. Și tot horhăind el când pe o cărare, când pe un drum părăsit, numai iaca ce iar îi iese Spânul înainte, îmbrăcat altfel și călare pe un cal frumos, și, prefăcându-și glasul, începe a căina pe fiul craiului, zicând:",
      "— Sărmane omule, rău drum ai apucat! Se vede că ești străin și nu cunoști locurile pe aici. Ai avut mare noroc de mine, de n-ai apucat a coborî priporul ista, că erai prăpădit. Ia, colo devale, în înfundătura ceea, un taur grozav la mulți bezmetici le-a curmat zilele. Și eu, mai deunăzi, cât mă vezi de voinic, de-abia am scăpat de dânsul, ca prin urechile acului.",
      "Întoarce-te înapoi, ori, dacă ai de dus înainte, ia-ți un ajutor pe cineva. Chiar și eu m-aș tocmi la d-ta, dacă ți-a fi cu plăcere.",
      "— Așa ar trebui să urmez, om bun, zise fiul craiului, dar ți-oi spune drept: tata mi-a dat în grijă, când am pornit de-acasă, ca să mă feresc de omul roș, iară mai ales de cel spân, cât oi putea; să n-am de a face cu dânșii nici în clin, nici în mânecă; și dacă n-ai fi spân, bucuros te-aș tocmi.",
      "— Hei, hei! călătorule. Dacă ți-i vorba de-așa, ai să-ți rupi ciochinele umblând și tot n-ai să găsești slugă cum cauți d-ta, că pe-aici sunt numai oameni spâni. Ș-apoi, când este la adicălea, te-aș întreba: ca' ce fel de zăticneală ai putea să întâmpini din pricina asta? Pesemne n-ai auzit vorba ceea: că de păr și de coate-goale nu se plânge nimene. Și când nu sunt ochi negri, săruți și albaștri!",
      "Așa și d-ta: mulțumește lui Dumnezeu că m-ai găsit și tocmește-mă. Și dacă-i apuca odată a te deprinde cu mine, știu bine că n-am să pot scăpa ușor de d-ta, căci așa sunt eu în felul meu, știu una și bună: să-mi slujesc stăpânul cu dreptate. Hai, nu mai sta la îndoială, că mă tem să nu ne-apuce noaptea pe aici. Și când ai avea încaltea un cal bun, calea-valea, dar cu smârțogul ista îți duc vergile.",
      "— Apoi dă, Spânule, nu știu cum să fac, zise fiul craiului. Din copilăria mea sunt deprins a asculta de tată și, tocmindu-te pe tine, parcă-mi vine nu știu cum. Dar, fiindcă mi-au mai ieșit până acum înainte încă doi spâni, și cu tine al treilea, apoi mai-mi vine a crede că asta-i țara spânilor și n-am încotro; mort-copt, trebuie să te iau cu mine, dacă zici că știi bine locurile pe aici.",
      "Și, din două vorbe, fiul craiului îl tocmește și după aceea pornesc împreună să iasă la drum, pe unde arată Spânul.",
      "Și mergând ei o bucată bună, Spânul se preface că-i e sete și cere plosca cu apă de la stăpânu-său. Fiul craiului i-o dă, și Spânul, cum o pune la gură, pe loc o și ia, oțărându-se, și varsă toată apa dintr-însa. Fiul craiului zice atunci supărat:",
      "— Dar bine, Spânule, de ce te apuci? Nu vezi că pe aici e mare lipsă de apă? Și pe arșița asta o să ne uscăm de sete.",
      "— Să avem iertare, stăpâne! Apa era bâhlită și ne-am fi putut bolnăvi. Cât despre apa bună, nu vă îngrijiți; acuș avem să dăm peste o fântână cu apă dulce și rece ca gheața. Acolo vom poposi puțin, oi clătări plosca bine ș-oi umple-o cu apă proaspătă, ca să avem la drum, căci mai încolo nu prea sunt fântâni, și, din partea apei, mi se pare că i-om duce dorul.",
      "Și cârnind pe o cărare, mai merg ei oleacă înainte, până ce ajung într-o poiană și numai iaca ce dau de o fântână cu ghizdele de stejar și cu un capac deschis în lături. Fântâna era adâncă și nu avea nici roată, nici cumpână, ci numai o scară de coborât până la apă.",
      "— Ei, ei! Spânule, acum să te văd cât ești de vrednic, zise fiul craiului.",
      "Spânul atunci zâmbește puțin și, coborându-se în fântână, umple întâi plosca și o pune la șold.",
      "Apoi, mai stând acolo în fund pe scară, aproape de fața apei, zice: ",
      '— Ei, da\' ce răcoare-i aici! "Chima răului pe malul pârăului!" Îmi vine să nu mai ies afară. Dumnezeu să ușureze păcatele celui cu fântâna, că bun lucru a mai făcut. Pe arșițele ieste, o răcoreală ca asta mult plătește!',
      "Mai șede el acolo puțin și apoi iese afară, zicând: ",
      "— Doamne, stăpâne, nu știi cât mă simțesc de ușor; parcă îmi vine să zbor, nu altăceva! Ia vâră-te și d-ta oleacă, să vezi cum ai să te răcorești; așa are să-ți vină de îndemână după asta, de are să ți se pară că ești ușor cum îi pana... ",
      "Fiul craiului, boboc în felul său la trebi de aieste, se potrivește Spânului",
      "și se bagă în fântână, fără să-i trăsnească prin minte ce i se poate întâmpla.",
      "Și cum sta și el acolo de se răcorea, Spânul face tranc!",
      "capacul pe gura fântânii, apoi se suie deasupra lui și zice cu glas răutăcios: ",
      "— Alelei! fecior de om viclean ce te găsești; tocmai de ceea ce te-ai păzit n-ai scăpat. Ei, că bine mi te-am căptușit! Acum să-mi spui tu cine ești, de unde vii și încotro te duci, că, de nu, acolo îți putrezesc ciolanele!",
    ];
    let Backgrounds = [
      "B37",
      "B37",
      "B36",
      "B36",
      "B37",
      "B36",
      "B36",
      "B37",
      "B38",
      "B38",
      "B37",
      "B36",
      "B39",
      "B40",
      "B42",
      "B42",
      "B42",
      "B42",
      "B41",
      "B44",
      "B45",
      "B46",
      "B47",
      "B48",
    ];

    let currentDialog = 0;

    CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);

    this.input.keyboard.on("keydown-SPACE", () => {
      currentDialog = DestroyCutscene(this, currentDialog);

      if (currentDialog >= Dialogs.length) {
        this.scene.start("QuickMath", { x: 80, y: 500 });
      }

      NextCutscene(this, currentDialog, Dialogs, Backgrounds);
    });
  }
  update() {}
}
