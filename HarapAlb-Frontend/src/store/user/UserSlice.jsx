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
  },
});

export const { userSetter, resetUserSetter } = userSlice.actions;
export default userSlice.reducer;
