import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderboard: [],
};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    leaderboardSetter: (state, action) => {
      state.leaderboard = action.payload;
    },
    resetLeaderboardSetter: () => {
      return initialState;
    },
  },
});

export const { leaderboardSetter, resetLeaderboardSetter } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;
