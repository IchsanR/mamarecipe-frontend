"use client";
import { createReducer } from "@reduxjs/toolkit";
import {
	addRecipe,
	deleteRecipe,
	getRecipeDetail,
	getUserLiked,
	getUserRecipe,
	getUserSaved,
	mostViewed,
	searchRecipe,
	updateRecipe,
} from "../Action/recipe";

const initialState = {
	data: [],
	isLoading: true,
	isError: false,
};

const recipeReducer = createReducer(initialState, (builder) => {
	// Pending
	builder.addCase(addRecipe.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(mostViewed.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(getRecipeDetail.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(getUserRecipe.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(getUserLiked.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(getUserSaved.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(searchRecipe.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(updateRecipe.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(deleteRecipe.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});

	// Fulfilled
	builder.addCase(addRecipe.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(mostViewed.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(getRecipeDetail.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(getUserRecipe.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(getUserLiked.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(getUserSaved.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(searchRecipe.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(updateRecipe.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(deleteRecipe.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});

	// Rejected
	builder.addCase(addRecipe.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(mostViewed.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(getRecipeDetail.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(getUserRecipe.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(getUserLiked.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(getUserSaved.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(searchRecipe.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(updateRecipe.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(deleteRecipe.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
});

export default recipeReducer;
