import {configureStore} from "@reduxjs/toolkit"
import userReducer from '../slices/userSlice'
import { CartSlice } from "../slices/CartSlice"

export default configureStore({
    reducer:{
        user:userReducer,
        cart:CartSlice.reducer,
    }
})