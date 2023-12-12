import {
  CutsceneProgression,
  DestroyCutscene,
  NextCutscene,
} from "../../utilities/scene/CutsceneProgression";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene11 extends Phaser.Scene {
  constructor() {
    super("Cutscene11");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B1", "/scene3/B1.png");
    this.load.image("B11", "/scene3/B11.png");
    this.load.image("B2", "/scene3/B2.png");
    this.load.image("B3", "/scene3/B3.png");
    this.load.image("B4", "/scene3/B4.png");
    this.load.image("B5", "/scene3/B5.png");
    this.load.image("B6", "/scene3/B6.png");
  }
  create() {
    let Dialogs = [
      "Şi merg ei, şi merg, cale lungă să le-ajungă, trecând peste nouă mări, peste nouă ţări şi peste nouă ape mari, şi într-o târzie vreme ajung la împărăţie.",
      "Şi cum ajung, Spânul se înfăţişază înaintea împăratului cu carte din partea craiului. ",
      "Şi împăratul Verde, citind cartea, arde de bucurie că i-a venit nepotul, şi pe dată îl şi face cunoscut curţii şi fetelor sale, care îl primesc cu toată cinstea cuvenită unui fiu de crai şi moştenitor al împăratului.",
      "Atunci Spânul, văzând că i s-au prins minciunile de bine, cheamă la sine pe Harap-Alb şi-i zice cu asprime:\n– Tu să şezi la grajd nedezlipit şi să îngrijeşti de calul meu ca de ochii din cap, că de - oi veni pe - acolo şi n - oi găsi trebile făcute după plac, vai de pielea ta are să fie.Dar până atunci, na - ţi o palmă, ca să ţii minte ce ţi - am spus.Bagat - ai în cap vorbele mele ?",
      "– Da, stăpâne, zise Harap-Alb, lăsând ochii în jos. Şi, ieşind, porneşte la grajd. Cu asta a voit Spânul să-şi arate arama şi să facă pe HarapAlb ca să-i ia şi mai mult frica.",
      "Amu, cum şedea Spânul la ospăţ împreună cu moşu-său, cu verele sale şi cu alţii, câţi se întâmplase, li s-au adus mai la urmă în masă şi nişte sălăţi foarte minunate. Atunci împăratul zice Spânului:",
      "– Nepoate, mai mâncat-ai sălăţi de aceste de când eşti?",
      "- Ba nu, tocmai eram să vă întreb de unde le aveţi, că tare-s bune! O haraba întreagă aş fi în stare să mănânc, şi parcă tot nu m-aş sătura.",
      "– Te crede moşul, nepoate, dar când ai şti cu ce greutate se capătă! pentru că numai în Grădina Ursului, dacă-i fi auzit de dânsa, se află sălăţi de aceste, şi mai rar om care să poată lua dintr-însele şi să scape cu viaţă. Între toţi oamenii din împărăţia mea, numai un pădurar se bizuieşte la treaba asta. Şi acela, el ştie ce face, ce drege, de-mi aduce din când în când aşa, câte puţine, de poftă.",
      "Spânul, voind să piardă acum pe Harap-Alb cu orice preţ, zise împăratului: \n\n– Doamne, moşule, de nu mi-a aduce sluga mea sălăţi de aceste şi din piatra seacă, mare lucru să fie!",
      "– Ce vorbeşti, nepoate! unul ca dânsul, şi încă necunoscător de locurile acestea, cum crezi că ar putea face această slujbă? Doar de ţi-i greu de viaţa lui.",
      "– Ia las’, moşule, nu-i duce grija; pun rămăşag că are să-mi aducă, şi încă multe, că ştiu eu ce poate el. \nŞ-odată cheamă Spânul pe Harap-Alb şi-i zice răstit:, Acum degrabă să te duci cum îi şti tu şi să-mi aduci sălăţi de aceste din Grădina Ursului. Hai, ieşi repede şi porneşte, că nu-i vreme de pierdut. Dar nu cumva să faci de altfel, că nici în borta şoarecului nu eşti scăpat de mine!",
      "Harap-Alb iese mâhnit, se duce în grajd şi porneşte la pas",
    ];
    let Backgrounds = [
      "B1",
      "B11",
      "B2",
      "B4",
      "B6",
      "B2",
      "B3",
      "B4",
      "B3",
      "B4",
      "B3",
      "B4",
      "B6",
    ];

    let currentDialog = 0;

    CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);

    this.input.keyboard.on("keydown-SPACE", () => {
      currentDialog = DestroyCutscene(this, currentDialog);

      if (currentDialog >= Dialogs.length) {
        this.scene.start("Cutscene12");
      }

      NextCutscene(this, currentDialog, Dialogs, Backgrounds);
    });
  }
  update() {}
}
