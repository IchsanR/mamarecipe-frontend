"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk("comment/addComment", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${args.recipeId}`,
				args.form,
				{
					headers: {
						token: args.token,
					},
				}
			)
			.then((response) => {
				args.handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});

export const getRecipeComment = createAsyncThunk(
	"comment/getRecipeComment",
	(recipeId) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${recipeId}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
);
