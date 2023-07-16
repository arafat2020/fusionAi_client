import { axiosInstance } from "../../lib/deplument";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const register = createAsyncThunk(
  "user/register",
  async ({ baio, email, name, password, img }) => {
    const res = await axiosInstance.post("/register", {
      baio,
      email,
      name,
      password,
      img,
    });
    await localStorage.setItem("ai_artist", JSON.stringify(res.data));
    return res.data;
  }
);
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const res = await axiosInstance.post("/login", {
      email,
      password,
    });
    console.log(res);

    await localStorage.setItem("ai_artist", JSON.stringify(res.data));
    return res.data;
  }
);

export const initialLoad = createAsyncThunk("user/load", async () => {
  const user = await JSON.parse(
    localStorage.getItem("ai_artist") ?? localStorage.getItem("ai_artist")
  );
  if (!user) return null
  const data = await axiosInstance.post(
    "/veryfy",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearar ${user.token}`,
      },
    }
  );
  return data.status === 200 && Date.now() > data.data.exp ? user : null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error:null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      localStorage.removeItem("ai_artist")
      state.user = null;
      state.status ='idle'
    },
    cleareUserErr:(state)=>{
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // register builder start
    builder.addCase(register.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.user = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "ok";
    });
    // register builder end
    // login builder start
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "ok";
    });
    // login builder end
    // initial loading start
    builder.addCase(initialLoad.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "ok";
    });
    builder.addCase(initialLoad.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(initialLoad.rejected,  (state) => {
      localStorage.removeItem("ai_artist")
      state.status = "Unathenticated";
      state.user = null;
    });
    // initial loading end
  },
});

export const { setUser, removeUser,cleareUserErr } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const user = (state) => state.user.user;
export const token = (state) => state.user.user?.token
export const userToken = (state) => state.user.user.token;
export const status = (state) => state.user.status;
export const userError = (state) => state.user.error;
