import { axiosInstance } from "../../lib/deplument";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchPost = createAsyncThunk("post/fetch", async () => {
  const res = await axiosInstance.get("/getPost");
  return res.data;
});
export const searchPost = createAsyncThunk("post/search", async ({term}) => {
  const res = await axiosInstance.get(`/search?term=${term}&nsfw=true`)
  return res.data
});
const termslice = createSlice({
  name: "term",
  initialState: {
    term: null,
    reasult: [],
    loading: false,
    status: "idle",
    err: null,
  },
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    clearTerm: (state) => {
      state.term = null;
    },
    clearErr: (state) => {
      state.err = null;
    },
    findAndReplace: (state, action) => {
      const index = state.reasult.findIndex(
        (el) => el.id === action.payload.id
      );
      state.reasult[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    //---------------- fetch post start ---------------------
    builder.addCase(fetchPost.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.reasult = action.payload;
      state.loading = false;
      state.status = "ok";
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.err = action.error.message;
      state.loading = false;
      state.status = "failed";
    });
    //---------------- fetch post end ---------------------
    //---------------- search post start ---------------------
    builder.addCase(searchPost.pending,(state) => {
      state.status = "searching";
    })
    builder.addCase(searchPost.fulfilled, (state, action) => {
      state.reasult = action.payload;
      state.status = "ok";
    });
    builder.addCase(searchPost.rejected, (state, action) => {
      state.err = action.error.message;
      state.status = "failed";
    });
    //---------------- search post end ---------------------
  },
});

export const { setTerm, clearTerm, clearErr, findAndReplace } =
  termslice.actions;
export const termReducer = termslice.reducer;
export const term = (state) => state.term.term;
export const loading = (state) => state.term.loading;
export const err = (state) => state.term.err;
export const status = (state) => state?.term?.status;
export const reasult = (state) => state?.term?.reasult;
