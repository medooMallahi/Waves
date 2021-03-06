import { combineReducers } from "redux";

import userReducer from "./user";
import productsReducer from "./products";
import notificationsReducer from "./notifications";
import brandReducer from "./brand";

export default combineReducers({
  user: userReducer,
  products: productsReducer,
  notifications: notificationsReducer,
  brands: brandReducer,
});
