import { createSlice } from "@reduxjs/toolkit";

const ParentSlice = createSlice({
    name: 'userData',
    initialState: {
        userData: null,
        loading: false,
        error: null,
        success: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            state.loading = false
            state.error = null
        },
        setSuccess:(state,action)=> {
            state.success= action.payload
            state.loading = false
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true
            state.error = null
        },
        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        clearStatus: (state) => {
            state.error = null;
            state.loading = false;
            state.success=false
        }
    }
})


export const { setUserData, setLoading, setError, clearStatus,setSuccess } = ParentSlice.actions
export default ParentSlice.reducer