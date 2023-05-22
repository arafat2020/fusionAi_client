const { createSlice } = require("@reduxjs/toolkit");

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    msg: "",
    icon: null,
    open: false,
  },
  reducers: {
    setNotification: (state, action) => {
      state.msg = action.payload.msg;
      state.icon = action.payload.icon;
      state.open = action.payload.open;
    },
    clearNotification: (state) => {
      state.msg = "";
      state.icon = null;
      state.open = false
    },
  },
});

export const { setNotification, clearNotification } = notifySlice.actions;
export const notifyReducer = notifySlice.reducer;
export const notify = (state) => state.notify;
