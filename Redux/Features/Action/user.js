"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const regiterUser = createAsyncThunk("user/registerUser", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, args.body)
			.then((response) => {
				args.handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});

export const loginUser = createAsyncThunk("user/loginUser", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, args.body)
			.then((response) => {
				args.handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});

export const checkEmail = createAsyncThunk("user/checkEmail", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`, args.body)
			.then((response) => {
				args.handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});

export const passwordReset = createAsyncThunk("user/passwordReset", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forget`, args.body, {
				headers: {
					token: args.token,
				},
			})
			.then((response) => {
				args.handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});

export const getUserDetail = createAsyncThunk(
	"user/getUserDetail",
	(userId) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
);

export const updateProfilePic = (inputImage, token, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userPicture`, inputImage, {
				headers: {
					token: token,
				},
			})
			.then((response) => {
				handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const updateAccount = (data, token, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateAccount`, data, {
				headers: {
					token: token,
				},
			})
			.then((response) => {
				handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
