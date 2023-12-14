import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {useDispatch, TypedUseSelectorHook, useSelector, } from "react-redux";
import drawerSlice from "../reducers/drawer.slice";
import osrmSlice from "../reducers/osrm.slice";

const rootReducer = combineReducers({
    drawerStatus: drawerSlice,
    osrm: osrmSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;