import { axiosInstance } from "@/lib/deplument";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const createMyArt = createAsyncThunk(
  "post/myart",
  async ({
    img,
    tag,
    prompt,
    negetivePrompt,
    chackPoint,
    lora,
    CFGscale,
    Clip_skip,
    hide,
    nsfw,
    Seed,
    Sampler,
    Steps,
    token,
  }) => {
    const res = await axiosInstance.post(
      "/create",
      {
        img,
        tag,
        prompt,
        negetivePrompt,
        chackPoint,
        lora,
        CFGscale,
        Clip_skip,
        hide,
        nsfw,
        Seed,
        Sampler,
        Steps,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${token}`,
        },
      }
    );
    console.log(res);
    return res.status === 200 ? res.data : res;
  }
);
export const fetchMyPost = createAsyncThunk(
  "post/getMyPost",
  async ({ token }) => {
    console.log(token);
    const data = await axiosInstance.post(
      "/myart",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${token}`,
        },
      }
    );
    return data.data;
  }
);
export const deleteArt = createAsyncThunk("post/delete", async ({token, img, id}) => {
  const nData = await axiosInstance.post(
    "/delete",
    {
      token,
      img,
      id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearar ${token}`,
      },
    }
  );
  console.log(nData);
  return await nData.data
});
 const myartslice = createSlice({
  name: "myart",
  initialState: {
    myart: [],
    loading: false,
    status: "idle",
    err: null,
  },
  reducers: {
    clearErr: (state) => {
      state.err = null;
    },
    
  },
  extraReducers: (builder) => {
    // --------creare post start------------
    builder.addCase(createMyArt.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createMyArt.fulfilled, (state, action) => {
      state.myart.unshift(action.payload);
      state.status = "ok";
    });
    builder.addCase(createMyArt.rejected, (state, action) => {
      state.status = "failed";
      state.err = action.error.message;
    });
    // --------creare post end------------
    // --------fetch my post end------------
    builder.addCase(fetchMyPost.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(fetchMyPost.fulfilled, (state, action) => {
      state.myart = action.payload;
      state.loading = false;
      state.status = "ok";
    });
    builder.addCase(fetchMyPost.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.err = action.error.message;
    });
    // --------fetch my post end------------
    // --------delete my post start------------
    builder.addCase(deleteArt.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteArt.fulfilled, (state, action) => {
      state.myart = action.payload;
      state.status = "ok";
    });
    builder.addCase(deleteArt.rejected, (state, action) => {
      state.status = "failed";
      state.err = action.error.message;
    });
   // --------delete my post end------------

  },
});

export const myartReducer = myartslice.reducer;
export const loading = (state) => state.myart.loading;
export const err = (state) => state.myart.err;
export const status = (state) => state.myart.status;
export const myart = (state) => state.myart.myart;
export const { clearErr } = myartslice.actions;
