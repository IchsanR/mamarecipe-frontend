"use client";
import { createReducer } from "@reduxjs/toolkit";
import { addComment, getRecipeComment } from "../Action/comment";

const initialState = {
	data: [],
	isLoading: true,
	isError: false,
};

const commentReducer = createReducer(initialState, (builder) => {
	// Pending
	builder.addCase(addComment.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(getRecipeComment.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});

	// Fulfilled
	builder.addCase(addComment.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(getRecipeComment.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});

	// Rejected
	builder.addCase(addComment.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(getRecipeComment.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
});

export default commentReducer;
