import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface osrmState {
    startingPoint: [number | null, number | null];
    endPoint: [number | null, number | null];
}

const initialState: osrmState = {
    startingPoint: [null, null],
    endPoint: [null, null],
};

const osrmSlice = createSlice({
    name:"osrm",
    initialState,
    reducers:{
        createStartingPoint(state, action: PayloadAction<[number|null, number|null]>){
            state.startingPoint = action.payload
        },
        createEndPoint(state, action: PayloadAction<[number|null, number|null]>){
            state.endPoint = action.payload
        }
    }
})

export const { createStartingPoint, createEndPoint } = osrmSlice.actions;

export default osrmSlice.reducer