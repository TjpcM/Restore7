import { createSlice } from "@reduxjs/toolkit";

export interface CounterState{
    data: number;
    title:string;
}

const initialState: CounterState = {
    data:42,
    title: 'YARC (Yet another react counter with redux toolkit)'
}

/* CreateSlice() is a function that accepts an initial state, an object full of reducer functions, and 
a "slice name", and automatically generates action creators and action types that 
correspond to the reducers and state. 
The reducer argument is passed to createReducer(). */

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment: (state,action) =>{
            state.data += action.payload
        },
        decrement: (state,action) => {
            state.data -= action.payload
        }
    }
})

export const {increment, decrement} = counterSlice.actions;