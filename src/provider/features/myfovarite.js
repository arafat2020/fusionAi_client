import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/deplument";

export const fetchMyFovarite = createAsyncThunk('fetchMyFovarite',async (token)=>{
    const data = await axiosInstance.get('/myFovarite',{
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearar ${token}`
        }
    })

    return data.data
})

const myfovariteSlice = createSlice({
    name:'myfovarite',
    initialState:{
        loading:false,
        status:'idle',
        myfavorite:[],
        err:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchMyFovarite.pending, (state) => {
            state.loading = true
            state.status = "pending";
          });
          builder.addCase(fetchMyFovarite.fulfilled, (state, action) => {
            state.myfavorite = action.payload;
            state.loading = false
            state.status = "ok";
            state.err = null
          });
          builder.addCase(fetchMyFovarite.rejected, (state, action) => {
            state.status = "failed";
            state.loading = false
            state.err = action.error.message;
          });
    }
})

export const myFv = (state)=> state.myfovarite.myfavorite
export const myFvLd = (state)=> state.myfovarite.loading
export const myFovriteReducer = myfovariteSlice.reducer