import { configureStore } from "@reduxjs/toolkit";
import { dataApi } from "./data/data.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dataReducer } from "./data/data.slice";

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
