import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/deplument";

// get Group thunk start

export const getGroups = createAsyncThunk(
  "group/groups",
  async ({ artID, tk }) => {
    console.log(artID, tk);
    const res = await axiosInstance.post(
      "/getGroupName",
      {
        artID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${tk}`,
        },
      }
    );
    console.log(res);
    return res.data;
  }
);

// get Group thunk end

// create group thunk start

export const createGroup = createAsyncThunk(
  "group/create",
  async ({ name, tk }) => {
    console.log(name, { tk });
    const res = await axiosInstance.post(
      "/createGroup",
      {
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${tk}`,
        },
      }
    );
    console.log(res);
    return res.data;
  }
);

// create group thunk end

// delete group thunk stat

export const deleteGroup = createAsyncThunk(
  "delete/Groups",
  async ({ id, tk }) => {
    console.log(id, tk);
    const res = await axiosInstance.post(
      "/deleteGroup",
      {
        id,
      },
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

// delete group thunk end

// Add to group start

export const addToGroup = createAsyncThunk(
  "group/add",
  async ({ artGroupID, artID, imgUrl, tk }) => {
    const res = await axiosInstance.post(
      "/addToGroup",
      {
        artGroupID,
        artID,
        imgUrl,
        tk,
        uuid:nanoid()
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${tk}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  }
);

// Add to group start
// remove from Group atart
export const removeFromGroup = createAsyncThunk(
  "group/remove",
  async ({ artGroupID, id, tk }) => {
    const res = await axiosInstance.post(
      "/removeFromFroup",
      {
        artGroupID,
        id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${tk}`,
        },
      }
    );
    return res.data
  }
);
// remove from Group end

const groupslice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    loading: true,
    loadingType: "idle",
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch groups start
    builder.addCase(getGroups.pending, (state, action) => {
      state.loading = true;
      state.loadingType = "fetch";
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.err = null;
      state.groups = action.payload;
      state.loadingType = "idle";
    });
    builder.addCase(getGroups.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
    // fetch groups end
    // create group start

    builder.addCase(createGroup.pending, (state) => {
      state.loading = true;
      state.loadingType = "create";
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.err = null;
      state.groups.unshift(action.payload);
      state.loadingType = "idle";
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
      console.log(action.error);
    });

    // create group end
    // delete group start
    builder.addCase(deleteGroup.pending, (state) => {
      state.loading = true;
      state.loadingType = "delete";
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      const index = state.groups.findIndex((e) => e.id === action.payload);
      state.groups.splice(index, 1);
      state.loading = false;
      state.err = null;
      state.loadingType = "idle";
    });
    builder.addCase(deleteGroup.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
      console.log(action.error);
    });
    // delete group end
    // Add to group
    builder.addCase(addToGroup.pending, (state) => {
      state.loading = true;
      state.loadingType = "add";
    });
    builder.addCase(addToGroup.fulfilled, (state, action) => {
      const index = state.groups.findIndex((e) => e.id === action.payload.ArtGroup.id);
      state.groups[index] = action.payload.ArtGroup;
      console.log(action.payload);
      state.loading = false;
      state.err = null;
      state.loadingType = "idle";
    });
    builder.addCase(addToGroup.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
      console.log(action.error);
    });
    // Add to group
    // Remove from group start
    builder.addCase(removeFromGroup.pending, (state) => {
      state.loading = true;
      state.loadingType = "remove";
    });
    builder.addCase(removeFromGroup.fulfilled, (state, action) => {
      const index = state.groups.findIndex((e) => e.id === action.payload.id);
      state.groups[index] = action.payload;
      state.loading = false;
      state.err = null;
      state.loadingType = "idle";
    });
    builder.addCase(removeFromGroup.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
      console.log(action.error);
    });
    // Remove from group end
  },
});

export const gruoReducer = groupslice.reducer;
export const groups = (state) => state.group.groups;
export const loading = (state) => state.group.loading;
