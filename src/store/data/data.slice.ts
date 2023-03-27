// import { IPost, IPostWithComments } from "./../../models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDataState {
  // posts: IPost[];
  // openedPost: IPostWithComments | null;
  openingPostId: number;
}

const initialState: IDataState = {
  // posts: [],
  // openedPost: null,
  openingPostId: 2,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setOpeningPostId(state, action: PayloadAction<number>) {
      state.openingPostId = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
