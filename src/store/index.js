import { configureStore, createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
	name: "user",
	initialState: { isLogegdIn: false },
	reducers: {
		login(state) {
			state.isLogegdIn = true;
		},
		logout(state) {
			localStorage.removeItem("userId");
			localStorage.removeItem("token");
			state.isLogegdIn = false;
		},
	},
});

const adminSlice = createSlice({
	name: "admin",
	initialState: { isLogegdIn: false },
	reducers: {
		login(state) {
			state.isLogegdIn = true;
		},
		logout(state) {
			localStorage.removeItem("adminId");
			state.isLogegdIn = false;
		},
	},
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin:adminSlice.reducer
    }
    
})