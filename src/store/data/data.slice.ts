import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface ISession {
  email: string;
  password: string;
}

interface IDataState {
  createdUser: IUser | {};
  session: ISession | {};
  isAuthedUser: boolean;
  isAuthedSession: boolean;
  token: string;
}

const initialState: IDataState = {
  createdUser: {},
  session: {},
  isAuthedUser: false,
  isAuthedSession: false,
  token: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuthedUser = true;
    },
    setSession(state) {
      state.isAuthedSession = true;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
