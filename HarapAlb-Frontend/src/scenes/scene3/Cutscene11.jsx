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
    this.load.image("B7", "/scene3/B7.png");
    this.load.image("B8", "/scene3/B8.png");
    this.load.image("B37", "/scene3/B37.png");
    this.load.image("B9", "/scene3/B9.png");
  }
  create() {
    let Dialogs = [
      "Şi merg ei, şi merg, cale lungă să le-ajungă, trecând peste nouă mări, peste nouă ţări şi peste nouă ape mari, şi într-o târzie vreme ajung la împărăţie.",
      "Şi cum ajung, Spânul se înfăţişază înaintea împăratului cu carte din partea craiului. ",
      "Şi împăratul Verde, citind cartea, arde de bucurie că i-a venit nepotul, şi pe dată îl şi face cunoscut curţii şi fetelor sale, care îl primesc cu toată cinstea cuvenită unui fiu de crai şi moştenitor al împăratului.",
      "Atunci Spânul, văzând că i s-au prins minciunile de bine, cheamă la sine pe Harap-Alb şi-i zice cu asprime :    – Tu să şezi la grajd nedezlipit şi să îngrijeşti de calul meu ca de ochii din cap, că de - oi veni pe - acolo şi n - oi găsi trebile făcute după plac, vai de pielea ta are să fie.",
      "Dar până atunci, na - ţi o palmă, ca să ţii minte ce ţi - am spus.Bagat - ai în cap vorbele mele ?",
      "– Da, stăpâne, zise Harap-Alb, lăsând ochii în jos. Şi, ieşind, porneşte la grajd. Cu asta a voit Spânul să-şi arate arama şi să facă pe HarapAlb ca să-i ia şi mai mult frica.",
      "Amu, cum şedea Spânul la ospăţ împreună cu moşu-său, cu verele sale şi cu alţii, câţi se întâmplase, li s-au adus mai la urmă în masă şi nişte sălăţi foarte minunate. Atunci împăratul zice Spânului :",
      "– Nepoate, mai mâncat-ai sălăţi de aceste de când eşti?",
      "- Ba nu, tocmai eram să vă întreb de unde le aveţi, că tare-s bune! O haraba întreagă aş fi în stare să mănânc, şi parcă tot nu m-aş sătura.",
      "– Te crede moşul, nepoate, dar când ai şti cu ce greutate se capătă! pentru că numai în Grădina Ursului, dacă-i fi auzit de dânsa, se află sălăţi de aceste, şi mai rar om care să poată lua dintr-însele şi să scape cu viaţă.",
      "Între toţi oamenii din împărăţia mea, numai un pădurar se bizuieşte la treaba asta. Şi acela, el ştie ce face, ce drege, de-mi aduce din când în când aşa, câte puţine, de poftă.",
      "Spânul, voind să piardă acum pe Harap-Alb cu orice preţ, zise împăratului :    – Doamne, moşule, de nu mi-a aduce sluga mea sălăţi de aceste şi din piatra seacă, mare lucru să fie!",
      "– Ce vorbeşti, nepoate! unul ca dânsul, şi încă necunoscător de locurile acestea, cum crezi că ar putea face această slujbă? Doar de ţi-i greu de viaţa lui.",
      "– Ia las’, moşule, nu-i duce grija; pun rămăşag că are să-mi aducă, şi încă multe, că ştiu eu ce poate el.",
      "Ş-odată cheamă Spânul pe Harap-Alb şi-i zice răstit :, Acum degrabă să te duci cum îi şti tu şi să-mi aduci sălăţi de aceste din Grădina Ursului. Hai, ieşi repede şi porneşte, că nu-i vreme de pierdut. Dar nu cumva să faci de altfel, că nici în borta şoarecului nu eşti scăpat de mine!",
      "Harap-Alb iese mâhnit, se duce în grajd şi porneşte la pas",
      "Mergând să aducă salata, se opreşte lângă o căsuţă mare singuratică, pe care era crescut nişte muşchi pletos de o podină de gros, moale ca mătasa şi verde ca buraticul. Atunci Harap-Alb descalecă, şi spre mai mare mirarea lui, numai iaca îl întâmpină în pragul uşii cerşetoarea căreia îi dăduse el un ban de pomană, înainte de pornirea lui de acasă.",
      "– Ei, Harap-Alb, aşa-i că ai venit la vorbele mele, că deal cu deal se ajunge, dar încă om cu om? Află acum că eu sunt Sfânta Duminică şi ştiu ce nevoie te-a adus pe la mine. Spânul vrea să-ţi răpună capul cu orice chip şi de-aceea te-a trimis să-i aduci sălăţi din Grădina Ursului, dar i-or da ele odată pe nas… Rămâi aici în astă-noapte, ca să văd ce-i de făcut.",
      "Harap-Alb rămâne bucuros, mulţumind Sfintei Duminici pentru buna găzduire şi îngrijirea ce are de el.",
      "– Fii încredinţat că nu eu, ci puterea milosteniei şi inima ta cea bună te ajută, Harap-Alb, zice Sfânta Duminică ieşind şi lăsându-l în pace să se liniştească.",
      "Şi cum iese Sfânta Duminică afară, odată şi porneşte desculţă prin rouă, de culege o poală de somnoroasă, pe care o fierbe la un loc cu o vadră de lapte dulce şi cu una de miere şi apoi ia mursa aceea şi iute se duce de o toarnă în fântâna din Grădina Ursului, care fântână era plină cu apă până la gură. Şi mai stând Sfânta Duminică oleacă în preajma fântânii, numai iaca ce vede.",
      "că vine ursul cu o falcă în cer şi cu una în pământ, mornăind înfricoşat. Şi cum ajunge la fântână, cum începe a bea lacom la apă şi a-şi linge buzele de dulceaţa şi bunătatea ei. Şi mai stă din băut, şi iar începe a mornăi;",
      "şi iar mai bea câte un răstimp, şi iar mornăieşte, până ce, de la o vreme, încep a-i slăbi puterile şi, cuprins de ameţeală, pe loc cade jos şi adoarme mort, de puteai să tai lemne pe dânsul.",
      "Atunci Sfânta Duminică, văzându-l aşa, într-o clipă se duce şi, deşteptând pe Harap-Alb chiar în miezul nopţii, îi zice :",
      "– Îmbracă-te iute în pielea cea de urs, care o ai de la tată- tău, apucă pe ici tot înainte, şi cum îi ajunge în răscrucile drumului, ai să dai de Grădina Ursului. Atunci sai repede înlăuntru de-ţi ia sălăţi într-ales, şi câte-i vrea de multe, căci pe urs l-am pus eu la cale.",
    ];
    let Backgrounds = [
      "B1",
      "B11",
      "B2",
      "B4",
      "B4",
      "B6",
      "B2",
      "B3",
      "B4",
      "B3",
      "B3",
      "B4",
      "B3",
      "B4",
      "B4",
      "B6",
      "B7",
      "B8",
      "B37",
      "B8",
      "B9",
      "B9",
      "B9",
      "B9",
      "B9",
    ];

    let currentDialog = 0;

    CutsceneProgression(this, currentDialog, Dialogs, Backgrounds);

    this.input.keyboard.on("keydown-SPACE", () => {
      currentDialog = DestroyCutscene(this, currentDialog);

      if (currentDialog >= Dialogs.length) {
        this.sound.removeByKey("music8");
        this.scene.start("BearsMaze");
      }

      NextCutscene(this, currentDialog, Dialogs, Backgrounds);
    });
  }
  update() {}
}
