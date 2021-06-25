import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "products",

  initialState: {
    productsBySold: [],
    productsByDate: [],
  },

  reducers: {
    productsBySoldReceived: (products, action) => {
      products.productsBySold = action.payload;
    },
  },
});

const { productsBySoldReceived } = slice.actions;

export const loadProductsBySold = () =>
  apiCallBegan({
    url: "/products/all",
    method: "get",
    params: {
      limit: 2,
      sortBy: "itemSold",
      order: "asc",
    },
    onSuccess: productsBySoldReceived.type,
    msgOnSuccess: "products loaded Successfully",
  });

export default slice.reducer;

export const getProducts = createSelector(
  (state) => state.entities.products,
  (listOfProducts) => listOfProducts
);
