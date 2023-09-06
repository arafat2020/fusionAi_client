import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/deplument";

export const fetchMyGroup = createAsyncThunk(
  "fetch/myGroup",
  async ({ tk }) => {
    const res = await axiosInstance.post(
      "/getMyGroup",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${tk}`,
        },
      }
    );
    return res.data;
  }
);

const myGroupSlice = createSlice({
  name: "myGroup",
  initialState: {
    group: [],
    loading: false,
    err: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMyGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.err = null;
      state.group = action.payload;
    });
    builder.addCase(fetchMyGroup.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const myGroupReducer = myGroupSlice.reducer;
export const loading = (state) => state.myGroup.loading;
export const myGroup = (state) => state.myGroup.group;
