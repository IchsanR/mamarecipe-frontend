"use client";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./Features/Reducers/user";
import recipeReducer from "./Features/Reducers/recipe";
import commentReducer from "./Features/Reducers/comment";
import logger from "redux-logger";

const store = configureStore({
	reducer: {
		user: userReducer,
		recipe: recipeReducer,
		comment: commentReducer,
	},
	middleware: [thunk, logger],
});

export default store;
