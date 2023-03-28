import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  email: string
  name: string
  password: string
  confirmPassword: string
}

interface ISession {
  email: string
  password: string
}

interface IDataState {
  createdUser: IUser | {}
  session: ISession | {}
  isAuthedUser: boolean
  isAuthedSession: boolean
}

const initialState: IDataState = {
  createdUser: {},
  session: {},
  isAuthedUser: false,
  isAuthedSession: false
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuthedUser = true
    },
    setSession(state) {
      state.isAuthedSession = true
    }
  },
});

export const dataActions = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
