"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addRecipe = createAsyncThunk("recipe/addRecipe", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe`, args.inputForm, {
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

export const mostViewed = createAsyncThunk("recipe/mostViewed", () => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mostview`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});

export const getRecipeDetail = createAsyncThunk(
	"recipe/getRecipeDetail",
	(recipeId) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/${recipeId}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
);

export const viewCount = (recipeId) => {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/viewcount/${recipeId}`
			)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const addLikedRecipe = (recipeId, token, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/liked/${recipeId}`,
				{},
				{
					headers: {
						token: token,
					},
				}
			)
			.then((response) => {
				handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const addSavedRecipe = (recipeId, token, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/saved/${recipeId}`,
				{},
				{
					headers: {
						token: token,
					},
				}
			)
			.then((response) => {
				handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getUserRecipe = createAsyncThunk(
	"recipe/getUserRecipe",
	(userId) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/user/${userId}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
);

export const getUserLiked = createAsyncThunk(
	"recipe/getUserLiked",
	(userId) => {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/user/${userId}/liked`
				)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
);

export const getUserSaved = createAsyncThunk(
	"recipe/getUserSaved",
	(userId) => {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/user/${userId}/saved`
				)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
);

export const searchRecipe = createAsyncThunk("recipe/searchRecipe", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes/search?title=${args.title}&sortOrder=${args.sortOrder}&orderBy=${args.orderBy}&page=${args.page}`
			)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});

export const updateRecipe = createAsyncThunk("recipe/updateRecipe", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/${args.recipeId}`,
				args.form
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

export const deleteRecipe = createAsyncThunk("recipe/deleteRecipe", (args) => {
	return new Promise((resolve, reject) => {
		axios
			.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/${args.recipeId}`)
			.then((response) => {
				args.handleSuccess(response);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
});
