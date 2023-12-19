import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  miniGamesScore: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSetter: (state, action) => {
      state.user = action.payload.user;
      state.miniGamesScore = action.payload.miniGamesScore;
    },
    resetUserSetter: () => {
      return initialState;
    },
    addMiniGame: (state, action) => {
      state.miniGamesScore = [...state.miniGamesScore, action.payload];
    },
    updateMiniGame: (state, action) => {
      state.miniGamesScore = state.miniGamesScore.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { userSetter, resetUserSetter, addMiniGame, updateMiniGame } =
  userSlice.actions;
export default userSlice.reducer;
