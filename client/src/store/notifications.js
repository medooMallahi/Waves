import { createSlice } from "@reduxjs/toolkit";

const initialState = () => ({});

const slice = createSlice({
  name: "notifications",

  initialState: initialState(),

  reducers: {
    errorAdded: (state, action) => {
      const { error, msg } = action.payload;
      state.error = error;
      state.msg = msg;
    },
    successAdded: (state, action) => {
      const { success, msg } = action.payload;
      state.success = success;
      state.msg = msg;
    },
    notificationsCleared: (state, action) => initialState(),
  },
});

const { errorAdded, successAdded, notificationsCleared } = slice.actions;

export const addError = (msg) => errorAdded({ error: true, msg });

export const addSuccess = (msg) => successAdded({ success: true, msg });

export const clearNotification = () => notificationsCleared();

export default slice.reducer;
