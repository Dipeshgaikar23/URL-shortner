import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
    },
    // devTools: process.env
})

export default store;