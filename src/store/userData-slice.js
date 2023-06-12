import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    profile: "",
    dob: "",
    gender: ""
}

const userDataSlice = createSlice({
    name: "User Data",
    initialState,
    reducers: {

    }
})

export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;