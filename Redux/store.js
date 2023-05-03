"use client";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./Features/Reducers/user";
import recipeReducer from "./Features/Reducers/recipe";

const store = configureStore({
	reducer: {
		user: userReducer,
		recipe: recipeReducer,
	},
	middleware: [thunk],
});

export default store;
