import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name:"error",
    initialState:{
        message:"null"
    },
    reducers:{
        setMessage:(state, action)=>{
            state.message = action.payload;
        }
    }
})

export const{setMessage}  = errorSlice.actions;

export default errorSlice.reducer;