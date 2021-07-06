import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import {
  getAuthHeader,
  getTokenCookie,
  removeTokenCookie,
} from "../utils/tools";

const initialState = () => ({
  all: [],
});

const slice = createSlice({
  name: "brand",

  initialState: initialState(),

  reducers: {
    brandsRecieved: (state, action) => {
      console.log(action.payload);
      state.all = action.payload;
    },
  },
});

const { brandsRecieved } = slice.actions;

export const getAllBrands = () =>
  apiCallBegan({
    url: "/brands/all",
    headers: getAuthHeader(),
    onSuccess: brandsRecieved.type,
  });

export default slice.reducer;
