import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import { getAuthHeader } from "../utils/tools";
import { removeArticle } from "./notifications";

const slice = createSlice({
  name: "products",

  initialState: {
    productsBySold: [],
    productsByDate: [],
    productsById: null,
    productsByPaginate: [],
  },

  reducers: {
    productsBySoldReceived: (products, action) => {
      products.productsBySold = action.payload;
    },
    productsByPaginateReceived: (products, action) => {
      products.productsByPaginate = action.payload;
    },
    productsByIdReceived: (products, action) => {
      products.productsById = action.payload;
    },
  },
});

const {
  productsBySoldReceived,
  productsByPaginateReceived,
  productsByIdReceived,
} = slice.actions;

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

export const productsByPaginate = (data) =>
  apiCallBegan({
    url: "/products/paginate/all",
    method: "post",
    data,
    onSuccess: productsByPaginateReceived.type,
    msgOnSuccess: "products loaded Successfully",
  });

export const removeProduct = (data) =>
  apiCallBegan({
    url: `/products/product/${data}`,
    method: "delete",
    data,
    headers: getAuthHeader(),
    onSuccess: removeArticle().type,
    msgOnSuccess: "products was removed successfully",
  });

export const addProduct = (data) =>
  apiCallBegan({
    url: `/products/`,
    method: "post",
    data,
    headers: getAuthHeader(),
    msgOnSuccess: "products was added successfully",
  });

export const productsById = (data) =>
  apiCallBegan({
    url: `/products/product/${data}`,
    onSuccess: productsByIdReceived.type,
  });

export default slice.reducer;

export const getProducts = createSelector(
  (state) => state.entities.products,
  (listOfProducts) => listOfProducts
);
