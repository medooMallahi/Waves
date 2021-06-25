import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import toast from "./middleware/toaste";
import api from "./middleware/api";

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), toast, api],
});

export default store;
