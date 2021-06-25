import axios from "axios";
import * as actions from "../api";
import { addError, addSuccess } from "../notifications";

axios.defaults.headers.post["Content-type"] = "application/json";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, params, headers, onStart, onSuccess, onError } =
      action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.request({
        baseURL: "/api",
        url,
        method,
        data,
        params,
        headers,
      });
      //general
      dispatch(actions.apiCallSuccess(response.data));
      dispatch(addSuccess("Done"));

      //specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      //general
      dispatch(actions.apiCallFailed(error.message));

      dispatch(addError(error.message));

      //specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
