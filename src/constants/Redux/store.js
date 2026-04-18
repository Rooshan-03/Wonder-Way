import { configureStore } from "@reduxjs/toolkit";
import parentReducer from './ParentSlice'

export const store = configureStore({
    reducer: {
        userData: parentReducer
    }
})