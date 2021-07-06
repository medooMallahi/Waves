import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import {
  getAuthHeader,
  getTokenCookie,
  removeTokenCookie,
} from "../utils/tools";

const initialState = () => ({
  data: {},
  auth: null,
  cart: [],
});

const slice = createSlice({
  name: "user",

  initialState: initialState(),

  reducers: {
    userAuthenticated: (state, action) => {
      state.data = action.payload.user;
      state.auth = true;
    },
    userAuthenticatedFailed: (state, action) => {
      state.data = {};
      state.auth = false;
    },
    userprofileeUpdated: (state, action) => {
      state.data = action.payload;
    },
    userAddedToCart: (state, action) => {
      state.cart.push(action.payload.item);
    },
    purchaseSucceded: (state, action) => {
      console.log(action.payload, "Payload");
      state.cart = [];
      state.data.history = action.payload;
    },
    userCleared: (state, action) => initialState(),
  },
});

const {
  userAuthenticated,
  userCleared,
  userAuthenticatedFailed,
  userprofileeUpdated,
  userAddedToCart,
  purchaseSucceded,
} = slice.actions;

export const registerUser = (data) =>
  apiCallBegan({
    url: "/auth/register",
    method: "post",
    data,
    onSuccess: userAuthenticated.type,
  });

export const loginUser = (data) =>
  apiCallBegan({
    url: "/auth/signin",
    method: "post",
    data,
    onSuccess: userAuthenticated.type,
  });

export const userIsAuth = () => (dispatch) => {
  try {
    if (!getTokenCookie()) {
      throw Error();
    }
  } catch (err) {
    userCleared();
  }

  dispatch(
    apiCallBegan({
      url: "/auth/isauth",
      headers: getAuthHeader(),
      onSuccess: userAuthenticated.type,
      onError: userAuthenticatedFailed.type,
    })
  );
};

export const updateUserProofile = (data) =>
  apiCallBegan({
    url: "/users/profile",
    method: "patch",
    data,
    headers: getAuthHeader(),
    onSuccess: userprofileeUpdated.type,
  });

export const updateEmail = (data) =>
  apiCallBegan({
    url: "/users/email",
    method: "patch",
    data,
    headers: getAuthHeader(),
    onSuccess: userAuthenticated.type,
  });

export const userSignOut = () => {
  removeTokenCookie();
  return userCleared();
};

export const addToCart = (item) => userAddedToCart({ item });

export const PurchaseSuccess = (data) => {
  return apiCallBegan({
    url: "/transaction/",
    method: "post",
    data,
    headers: getAuthHeader(),
    msgOnSuccess: "Thank you for your purchase",
    onSuccess: purchaseSucceded.type,
  });
};
export default slice.reducer;
