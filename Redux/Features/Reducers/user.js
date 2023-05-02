"use client";
import { createReducer } from "@reduxjs/toolkit";
import {
	checkEmail,
	getUserDetail,
	loginUser,
	passwordReset,
	regiterUser,
} from "../Action/user";

const initialState = {
	data: [],
	isLoading: true,
	isError: false,
};

const userReducer = createReducer(initialState, (builder) => {
	// Pending
	builder.addCase(regiterUser.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(loginUser.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(checkEmail.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(passwordReset.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});
	builder.addCase(getUserDetail.pending, (state) => {
		return {
			...state,
			isLoading: true,
		};
	});

	//Fulfilled
	builder.addCase(regiterUser.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(loginUser.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(checkEmail.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(passwordReset.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});
	builder.addCase(getUserDetail.fulfilled, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: false,
		};
	});

	// Rejected
	builder.addCase(regiterUser.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(loginUser.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(checkEmail.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(passwordReset.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
	builder.addCase(getUserDetail.rejected, (state, action) => {
		return {
			...state,
			isLoading: false,
			data: action.payload,
			isError: true,
		};
	});
});

export default userReducer;
