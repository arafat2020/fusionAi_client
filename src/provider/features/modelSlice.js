import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
  name: "model",
  initialState: {
    open: false,
    component: null,
    title: null,
  },
  reducers: {
    setModel: (state, action) => {
      state.open = true;
      state.component = action.payload.component;
      state.title = action.payload.title;
    },
    clearModel: (state) => {
      state.open = false;
      state.component = null;
      state.title = null
    },
  },
});

export const { setModel, clearModel } = modelSlice.actions;
export const modelReducer = modelSlice.reducer;
export const openModel = (state) => state.model.open;
export const title = (state) => state.model.title;
export const modelComponent = (state) => state.model.component;
