const Tile_Mapping = {
  BLANK: 0,
  WALL: {
    TOP_LEFT: 93,
    TOP_RIGHT: 93,
    BOTTOM_RIGHT: 93,
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
    { index: [3, 4, 5, 6, 7, 8, 245, 200, 183, 182], weight: 2 },
  ],
  DOOR: {
    TOP: [2, 244],
    LEFT: [[244], [2], [2]],
    BOTTOM: [2, 2, 244],
    RIGHT: [[2], [2], [244]],
  },
  CABBAGE: 246,
  UPPER_TOWER: [[121]],
  LOWER_TOWER: [[140]],
  UPPER_TOWER_DESTROYED: [[122]],
  LOWER_TOWER_DESTROYED: [[141]],
  POT: 175,
};

export default Tile_Mapping;
