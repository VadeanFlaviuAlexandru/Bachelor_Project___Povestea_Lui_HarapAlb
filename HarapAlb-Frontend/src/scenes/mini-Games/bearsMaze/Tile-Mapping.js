// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const Tile_Mapping = {
  BLANK: 0,
  WALL: {
    TOP_LEFT: 93,
    TOP_RIGHT: 93,
    BOTTOM_RIGHT: 93, //66, //85
    BOTTOM_LEFT: 93,
    TOP: [
      { index: 93, weight: 6 },
      { index: 93, weight: 2 },
    ],
    LEFT: [
      { index: 93, weight: 6 },
      { index: 93, weight: 2 },
    ],
    RIGHT: [
      { index: 93, weight: 6 },
      { index: 93, weight: 2 },
    ],
    BOTTOM: [
      { index: 93, weight: 6 },
      { index: 93, weight: 2 },
    ],
  },
  FLOOR: [
    { index: 2, weight: 7 },
    { index: [3, 4, 5, 6, 7, 8, 245], weight: 3 },
  ],
  POT: [
    { index: 13, weight: 1 },
    { index: 32, weight: 1 },
    { index: 51, weight: 1 },
  ],
  DOOR: {
    TOP: [2, 244],
    // prettier-ignore
    LEFT: [
      [244],
      [2],
      [2]
    ],
    BOTTOM: [2, 2, 244],
    // prettier-ignore
    RIGHT: [
      [2],
      [2],
      [244]
    ],
  },
  CHEST: 93,
  STAIRS: 246,
  // prettier-ignore
  TOWER: [
    [93],
    [93]
  ],
};

export default Tile_Mapping;
