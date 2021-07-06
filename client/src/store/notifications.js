import { createSlice } from "@reduxjs/toolkit";

const initialState = () => ({});

const slice = createSlice({
  name: "notifications",

  initialState: initialState(),

  reducers: {
    errorAdded: (state, action) => {
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    },
    successAdded: (state, action) => {
      state.success = action.payload.success;
      state.msg = action.payload.msg;
    },
    articleRemoved: (state, action) => {
      state.removeArticle = true;
    },
    notificationsSuccessErrorCleared: (state, action) => {
      if (state.error) {
        state.error = null;
        state.msg = null;
      }
      if (state.success) {
        state.success = null;
        state.msg = null;
      }
    },
  },
});

const {
  errorAdded,
  successAdded,
  articleRemoved,
  notificationsSuccessErrorCleared,
  notificationsremoveArticleCleared,
} = slice.actions;

export const addError = (msg) => errorAdded({ error: true, msg });

export const addSuccess = (msg) => successAdded({ success: true, msg });

export const removeArticle = () => articleRemoved({});

export const clearSuccessErrorNotification = () =>
  notificationsSuccessErrorCleared();

export const clearRemoveArticleNotification = () =>
  notificationsremoveArticleCleared({});

export default slice.reducer;
