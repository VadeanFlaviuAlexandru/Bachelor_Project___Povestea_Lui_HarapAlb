import Align from "../../utilities/scene/Align";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen";

export class Cutscene12 extends Phaser.Scene {
  constructor() {
    super("Cutscene12");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B7", "/scene3/B7.png");
    this.load.image("B8", "/scene3/B8.png");
    this.load.image("B37", "/scene3/B37.png");
    this.load.image("B9", "/scene3/B9.png");
  }
  create() {
    let Dialogs = [
      "Mergând să aducă salata, se opreşte lângă o căsuţă mare singuratică, pe care era crescut nişte muşchi pletos de o podină de gros, moale ca mătasa şi verde ca buraticul. Atunci Harap-Alb descalecă, şi spre mai mare mirarea lui, numai iaca îl întâmpină în pragul uşii cerşetoarea căreia îi dăduse el un ban de pomană, înainte de pornirea lui de acasă.",
      "– Ei, Harap-Alb, aşa-i că ai venit la vorbele mele, că deal cu deal se ajunge, dar încă om cu om? Află acum că eu sunt Sfânta Duminică şi ştiu ce nevoie te-a adus pe la mine. Spânul vrea să-ţi răpună capul cu orice chip şi de-aceea te-a trimis să-i aduci sălăţi din Grădina Ursului, dar i-or da ele odată pe nas… Rămâi aici în astă-noapte, ca să văd ce-i de făcut.",
      "Harap-Alb rămâne bucuros, mulţumind Sfintei Duminici pentru buna găzduire şi îngrijirea ce are de el.",
      "– Fii încredinţat că nu eu, ci puterea milosteniei şi inima ta cea bună te ajută, Harap-Alb, zice Sfânta Duminică ieşind şi lăsându-l în pace să se liniştească.",
      "Şi cum iese Sfânta Duminică afară, odată şi porneşte desculţă prin rouă, de culege o poală de somnoroasă, pe care o fierbe la un loc cu o vadră de lapte dulce şi cu una de miere şi apoi ia mursa aceea şi iute se duce de o toarnă în fântâna din Grădina Ursului, care fântână era plină cu apă până la gură. Şi mai stând Sfânta Duminică oleacă în preajma fântânii, numai iaca ce vede ",
      "că vine ursul cu o falcă în cer şi cu una în pământ, mornăind înfricoşat. Şi cum ajunge la fântână, cum începe a bea lacom la apă şi a-şi linge buzele de dulceaţa şi bunătatea ei. Şi mai stă din băut, şi iar începe a mornăi; şi iar mai bea câte un răstimp, şi iar mornăieşte, până ce, de la o vreme, încep a-i slăbi puterile şi, cuprins de ameţeală, pe loc cade jos şi adoarme mort, de puteai să tai lemne pe dânsul.",
      "Atunci Sfânta Duminică, văzându-l aşa, într-o clipă se duce şi, deşteptând pe Harap-Alb chiar în miezul nopţii, îi zice: ",
      "– Îmbracă-te iute în pielea cea de urs, care o ai de la tată- tău, apucă pe ici tot înainte, şi cum îi ajunge în răscrucile drumului, ai să dai de Grădina Ursului. Atunci sai repede înlăuntru de-ţi ia sălăţi într-ales, şi câte-i vrea de multe, căci pe urs l-am pus eu la cale.",
    ];
    let Backgrounds = ["B7", "B8", "B37", "B8", "B9", "B9", "B9", "B9"];
    let currentDialog = 0;
    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
    this.Dialog.setText(Dialogs[currentDialog]);
    Align.ScaleToGameW(this.game, this.Background, 0.8);
    Align.center(this.game, this.Background);
    this.input.keyboard.on("keydown-SPACE", () => {
      this.Background.destroy();
      currentDialog++;
      if (currentDialog >= Dialogs.length) {
        this.scene.start("BearsMaze");
      }
      this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
      this.Dialog.setText(Dialogs[currentDialog]);
      Align.ScaleToGameW(this.game, this.Background, 0.8);
      Align.center(this.game, this.Background);
    });
  }
  update() {}
}
