import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false,
    apiKey: "AIzaSyBeGTabK8LkrnAsFvd9mepKfz8c2-ydOGA",
    idToken: "",
    email: "",
    apiName: "",
}

const authSlice = createSlice({
    name: "Authentication",
    initialState: initialState,
    reducers: {
        updateOnLogin(state, action) {
            state.login = true;
            state.email = action.payload.email;
            state.idToken = action.payload.idToken;
            state.apiName = action.payload.email.split("").filter((i) => {
                return i !== "@" && i !== ".";
            }).join("");
        },
        updateOnSignup(state, action) {
            state.login = true;
            state.email = action.payload.email;
            state.idToken = action.payload.idToken;
            state.apiName = action.payload.email.split("").filter((i) => {
                return i !== "@" && i !== ".";
            }).join("");
        }
    }
})

export default authSlice.reducer;
export const authActions = authSlice.actions;