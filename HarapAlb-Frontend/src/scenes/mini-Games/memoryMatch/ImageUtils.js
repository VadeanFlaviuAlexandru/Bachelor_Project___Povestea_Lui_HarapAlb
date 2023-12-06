// function importAll(r) {
//   let images = {};
//   r.keys().map((item) => {
//     images[item.replace("./", "")] = r(item);
//   });
//   return images;
// }
// export const images = importAll(
//   require.context("../../../assets/MemoryMatch", false, /\.(png|jpe?g|svg)$/)
// );

export const images = {
  "back.png": "../../../assets/mini-games/memoryMatch/back.png",
  "Background.jpg": "../../../assets/mini-games/memoryMatch/Background.jpg",
  "card1.png": "../../../assets/mini-games/memoryMatch/card1.png",
  "card2.png": "../../../assets/mini-games/memoryMatch/card2.png",
  "card3.png": "../../../assets/mini-games/memoryMatch/card3.png",
  "card4.png": "../../../assets/mini-games/memoryMatch/card4.png",
  "front.png": "../../../assets/mini-games/memoryMatch/front.png",
};
