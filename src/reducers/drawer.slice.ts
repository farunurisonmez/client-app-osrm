
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface drawerState {
    drawerStatus: boolean
}

const initialState = { drawerStatus:true } as drawerState

const mapLeftDrawerSlice = createSlice({
    name:"drawer",
    initialState,
    reducers:{
        open(state){
            state.drawerStatus = true
        },
        close(state) {
            state.drawerStatus = false
        }
    }
})

export const { open, close  } = mapLeftDrawerSlice.actions
export default mapLeftDrawerSlice.reducer;