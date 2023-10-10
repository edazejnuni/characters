import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { charactersApi } from '../redux/api/charactersApi' 
const reducer = combineReducers({
  [charactersApi.reducerPath]: charactersApi.reducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware)
});

setupListeners(store.dispatch);
