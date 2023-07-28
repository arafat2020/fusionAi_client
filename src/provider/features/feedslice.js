import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/deplument";

export const fetchFeed = createAsyncThunk("feed/fetch", async (id) => {
  const res = await axiosInstance.get(`/feed?artId=${id}`);
  return res.data;
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    loading: false,
    status: "idle",
    post: {},
    cmt: [],
    likeCount: 0,
    loveCount: 0,
    dislikeCount: 0,
    react: [],
    favorite: [],
    err: null,
  },
  reducers: {
    findAndReplaceCmt: (state, action) => {
      const index = state.cmt.findIndex((el) => el.id === action.payload.id);
      state.cmt[index] = action.payload;
    },
    incertCmt: (state, action) => {
      state.cmt.unshift(action.payload);
    },
    removeCmt: (state, action) => {
      const index = state.cmt.findIndex((el) => el.id === action.payload);
      state.cmt.splice(index, 1);
    },
    upDateCount: (state, action) => {
      console.log(action.payload);
      state.likeCount = action.payload[0];
      state.loveCount = action.payload[1];
      state.dislikeCount = action.payload[2];
      state.react = action.payload[3];
    },
    addtofavorite: (state, action) => {
      state.favorite.unshift(action.payload);
    },
    removeFromFavorite: (state, action) => {
      const index = state.favorite.findIndex((el) => el.id === action.payload);
      state.favorite.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
      state.status = "pending";
      state.loading = true;
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.post = action.payload[0];
      state.cmt = action.payload[1];
      state.likeCount = action.payload[2];
      state.loveCount = action.payload[3];
      state.dislikeCount = action.payload[4];
      state.reducer = action.payload[5];
      state.react = action.payload[6];
      state.favorite = action.payload[7];
      state.status = "ok";
      state.err = null;
      state.loading = false;
    });
    builder.addCase(fetchFeed.rejected, (state, action) => {
      state.status = "failed";
      state.err = action.error.message;
      state.loading = false;
    });
  },
});

export const {
  findAndReplaceCmt,
  incertCmt,
  removeCmt,
  upDateCount,
  addtofavorite,
  removeFromFavorite,
} = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
export const feedOverview = (state) => state.feed;
export const feedLoading = (state) => state.feed.loading;
export const fevorite = (state) => state.feed.favorite;
