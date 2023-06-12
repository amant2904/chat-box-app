import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userDataReducer from "./userData-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        userData: userDataReducer
    }
})

export default store;