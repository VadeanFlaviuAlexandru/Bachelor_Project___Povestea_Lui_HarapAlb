import music2 from "/src/assets/music/Batraneasca.mp3";
import B1 from "../../assets/scene1/B1.png";
import B10 from "../../assets/scene1/B10.png";
import B11 from "../../assets/scene1/B11.png";
import B12 from "../../assets/scene1/B12.png";
import B13 from "../../assets/scene1/B13.png";
import B14 from "../../assets/scene1/B14.png";
import B15 from "../../assets/scene1/B15.png";
import B16 from "../../assets/scene1/B16.png";
import B17 from "../../assets/scene1/B17.png";
import B18 from "../../assets/scene1/B18.png";
import B19 from "../../assets/scene1/B19.png";
import B2 from "../../assets/scene1/B2.png";
import B20 from "../../assets/scene1/B20.png";
import B3 from "../../assets/scene1/B3.png";
import B4 from "../../assets/scene1/B4.png";
import B5 from "../../assets/scene1/B5.png";
import B6 from "../../assets/scene1/B6.png";
import B7 from "../../assets/scene1/B7.png";
import B8 from "../../assets/scene1/B8.png";
import B9 from "../../assets/scene1/B9.png";
import Align from "../../utilities/scene/Align.jsx";
import chooseDialogComponent from "../../utilities/scene/DialogLength.jsx";
import { LoadingScreen } from "../../utilities/scene/LoadingScreen.jsx";
import { Music } from "../../utilities/scene/Music";

export class Cutscene1 extends Phaser.Scene {
  constructor() {
    super("Cutscene1");
  }
  preload() {
    LoadingScreen(this);
    this.load.image("B1", B1);
    this.load.image("B2", B2);
    this.load.image("B3", B3);
    this.load.image("B4", B4);
    this.load.image("B5", B5);
    this.load.image("B6", B6);
    this.load.image("B7", B7);
    this.load.image("B8", B8);
    this.load.image("B9", B9);
    this.load.image("B10", B10);
    this.load.image("B11", B11);
    this.load.image("B12", B12);
    this.load.image("B13", B13);
    this.load.image("B14", B14);
    this.load.image("B15", B15);
    this.load.image("B16", B16);
    this.load.image("B17", B17);
    this.load.image("B18", B18);
    this.load.image("B19", B19);
    this.load.image("B20", B20);
    this.load.audio("music2", music2);
  }
  create() {
    const music = this.sound.add("music2", {
      volume: 0.2,
      loop: true,
    });
    if (
      this.registry.get("HarapAlbMusicOption") === 0 ||
      localStorage.getItem("HarapAlb-musicOff") === "true"
    ) {
      Music(this, music, true);
    } else {
      Music(this, music, false);
    }

    const Dialogs = [
      "Amu cică era odată într-o țară un crai, care avea trei feciori. Și craiul acela mai avea un frate mai mare, care era împărat într-o altă țară, mai depărtată. Și împăratul, fratele craiului, se numea Verde-împărat ; și împăratul Verde nu avea feciori, ci numai fete. Mulți ani trecură la mijloc de când acești frați mai avură prilej a se întâlni amândoi.",
      "Iară verii, adică feciorii craiului și fetele împăratului, nu se văzuse niciodată de când erau ei. Și așa veni împrejurarea de nici împăratul Verde nu cunoștea nepoții săi, nici craiul nepoatele sale : pentru că țara în care împărățea fratele cel mai mare era tocmai la o margine a pământului, și crăia istuilalt la o altă margine.",
      "Și apoi, pe vremile acelea, mai toate țările erau bântuite de războaie grozave, drumurile pe ape și pe uscat erau puțin cunoscute și foarte încurcate și de aceea nu se putea călători așa de ușor și fără primejdii ca în ziua de astăzi. Și cine apuca a se duce pe atunci într-o parte a lumii adeseori dus rămânea până la moarte.",
      "Dar ia să nu ne depărtăm cu vorba și să încep a depăna firul poveștii.",
      "Amu cică împăratul acela, aproape de bătrânețe, căzând la zăcare, a scris către frăține-său craiului, să-i trimită grabnic pe cel mai vrednic dintre nepoți, ca să-l lase împărat în locul său după moartea sa.",
      "Craiul, primind cartea, îndată chemă tustrei feciorii înaintea sa și le zise:",
      "— Iaca ce-mi scrie frate-meu și moșul vostru. Care dintre voi se simte destoinic a împărăți peste o țară așa de mare și bogată, ca aceea, are voie din partea mea să se ducă, ca să împlinească voința cea mai de pe urmă a moșului vostru.",
      "Atunci feciorul cel mai mare ia îndrăzneală și zice :",
      "— Tată, eu cred că mie mi se cuvine această cinste, pentru că sunt cel mai mare dintre frați; de aceea te rog să-mi dai bani de cheltuială, straie de primeneală, arme și cal de călărie, ca să și pornesc, fără zăbavă.",
      "— Bine, dragul tatei, dacă te bizuiești că-i putea răzbate până acolo și crezi că ești în stare a cârmui și pe alții, alege-ți un cal din herghelie, care-i vrea tu, ia-ți bani cât ți-or trebui, haine care ți-or plăcea, arme care-i crede că-ți vin la socoteală și mergi cu bine, fătul meu.",
      "Atunci feciorul craiului își ia cele trebuitoare, sărută mâna tătâne-său, primind carte de la dânsul către împăratul, zice rămas bun fraților săi și apoi încalecă și pornește cu bucurie spre împărăție. ",
      "Craiul însă, vrând să-l ispitească, tace molcum și, pe înserate, se îmbracă pe ascuns într-o piele de urs, apoi încalecă pe cal, iese înaintea fecioru-său pe altă cale și se bagă sub un pod.",
      "Și când să treacă fiu-său pe acolo, numai iaca la capătul podului îl și întâmpină un urs mormăind.",
      "Atunci calul fiului de crai începe a sări în două picioare, forăind, și cât pe ce să izbească pe stăpânu-său. Și fiul craiului, nemaiputând struni calul și neîndrăznind a mai merge înainte, se întoarnă rușinat înapoi la tatu-său.",
      "— Da' ce-ai uitat, dragul tatei, de te-ai întors înapoi? Aista nu-i semn bun, după cât știu eu.",
      "— De uitat, n-am uitat nimica, tată, dar ia, prin dreptul unui pod, mi-a ieșit înainte un urs grozav, care m-a vârât în toți spărieții. Și cu mare ce scăpând din labele lui, am găsit cu cale să mă întorc la d-ta acasă decât să fiu prada fiarelor sălbatice.",
      "Și de-acum înainte, ducă-se, din partea mea, cine știe, că mie unuia nu-mi trebuie nici împărăție, nici nimica; doar n-am a trăi cât lumea, ca să moștenesc pământul.",
      '— Despre aceasta bine ai chitit-o, dragul tatei. Se vede lucru că nici tu nu ești de împărat, nici împărăția pentru tine; și decât să încurci numai așa lumea, mai bine să șezi departe, cum zici, căci, mila Domnului: "Lac de-ar fi, broaște sunt destule". Numai aș vrea să știu, cum rămâne cu moșu-tău. Așa-i că ne-am încurcat în slăbăciune?',
      "Atunci feciorul cel mijlociu zice:    — Tată, să mă duc eu, dacă vrei.",
      "— Ai toată voia de la mine, fătul meu, dar mare lucru să fie de nu ți s-or tăia și ție cărările. Mai știi păcatul, poate să-ți iasă înainte vreun iepure, ceva... și popâc! m-oi trezi cu tine acasă, ca și cu frate-tău, ș-apoi atunci rușinea ta n-a fi proastă. Dar dă, cearcă și tu, să vezi cum ți-a sluji norocul.",
      'Vorba ceea: "Fiecare pentru sine, croitor de pâine". De-i izbuti, bine-de-bine, iară de nu, au mai pățit și alți voinici ca tine...',
      "Atunci feciorul cel mijlociu, pregătindu-și cele trebuitoare și primind și el carte din mâna tată-său către împăratul, își ia ziua bună de la frați, și a doua zi pornește și el. Și merge, și merge, până se înnoptează bine.",
      "Și când prin dreptul podului, numai iaca și ursul: mor! mor! mor! Calul fiului de crai începe atunci a forăi, a sări în două picioare și a da înapoi. Și fiul craiului, văzând că nu-i lucru de șagă, se lasă și el de împărăție și, cu rușinea lui, se întoarce înapoi la tată-său acasă.",
      '— Ei, dragul tatei, așa-i că s-a împlinit vorba ceea: "Apără-mă de găini, că de câini nu mă tem".',
      "— Ce fel de vorbă-i asta, tată?! la d-ta urșii se cheamă găini? Ba, ia acum cred eu frăține-meu, că așa urs oștirea întreagă este în stare să o zdrumice... Încă mă mir cum am scăpat cu viață; lehamite și de împărăție și de tot, că doar, slavă Domnului, am ce mânca la casa d-tale.",
      "— Ce mânca văd eu bine că ai, despre asta nu e vorbă, fătul meu, dar ia spuneți-mi: rușinea unde o puneți? Din trei feciori câți are tata, nici unul să nu fie bun de nimica?!",
      "Apoi, drept să vă spun, că atunci degeaba mai stricați mâncarea, dragii mei... Să umblați numai așa, frunza frăsinelului, toată viața voastră și să vă lăudați că sunteți feciori de crai, asta nu miroase a nas de om... Cum văd eu, frate-meu se poate culca pe o ureche din partea voastră; la sfântul Așteaptă s-a împlini dorința lui. Halal de nepoți ce are!",
      "Vorba ceea: La plăcinte, înainte     Și la război, înapoi.",
      "Fiul craiului cel mai mic, făcându-se atunci roș cum îi gotca, iese afară în grădină și începe a plânge în inima sa, lovit fiind în adâncul sufletului de apăsătoarele cuvinte ale părintelui său.",
      "Și cum sta el pe gânduri și nu se dumerea ce să facă pentru a scăpa de rușine, numai iaca se trezește dinaintea lui cu o babă gârbovită de bătrânețe, care umbla după milostenie.",
      "— Da’ ce stai așa pe gânduri, luminate crăișor? Alungă mâhnirea din inima ta, căci norocul îți râde din toate părțile și nu ai de ce fi supărat. Ia, mai bine miluiește baba cu ceva.",
      "— Ține, mătușă, de la mine puțin și de la Dumnezeu mult.",
      "— De unde dai, milostivul Dumnezeu să-ți dea și mult să te înzilească, luminate crăișor, că mare norocire te așteaptă. Puțin mai este, și ai să ajungi împărat, care n-a mai stat altul pe fața pământului așa de iubit, de slăvit și de puternic.",
      "Acum, luminate crăișor, ca să vezi cât poate să-ți ajute milostenia, stai liniștit, uită-te drept în ochii mei și ascultă cu luare-aminte ce ți-oi spune:",
      "du-te la tată-tău și cere să-ți dea calul, armele și hainele cu care a fost el mire, și atunci ai să te poți duce unde n-au putut merge frații tăi; pentru că ție a fost scris de sus să-ți fie dată această cinste. Tatu-tău s-a împotrivi și n-a vrea să te lase, dar tu stăruiește pe lângă dânsul cu rugăminte, că ai să-l îndupleci.",
      "Hainele despre care ți-am vorbit sunt vechi și ponosite, și armele ruginite, iară calul ai să-l poți alege punând în mijlocul hergheliei o tavă plină cu jăratic, și care dintre cai a veni la jăratic să mănânce, acela are să te ducă la împărăție și are să te scape din multe primejdii.",
      "Ține minte ce-ți spun eu, că poate să ne mai întâlnim la vrun capăt de lume: căci deal cu deal se ajunge, dar încă om cu om!",
    ];
    const Backgrounds = [
      "B1",
      "B1",
      "B1",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B10",
      "B11",
      "B12",
      "B13",
      "B12",
      "B12",
      "B14",
      "B12",
      "B12",
      "B8",
      "B15",
      "B12",
      "B16",
      "B12",
      "B12",
      "B12",
      "B17",
      "B18",
      "B19",
      "B20",
      "B19",
      "B19",
      "B19",
      "B19",
      "B19",
    ];

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
        this.scene.start("Scene1", { x: 360, y: 1181 });
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
