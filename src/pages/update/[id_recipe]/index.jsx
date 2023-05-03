import Button from "@/Components/base/Button";
import Footer from "@/Components/module/Footer";
import { TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "@/Components/module/Navbar";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import {
	getRecipeDetail,
	updateRecipe,
} from "../../../../Redux/Features/Action/recipe";
import Loading from "@/Components/module/Loading";
import Swal from "sweetalert2";

export default function UpdateRecipe() {
	const hiddenFileInput = useRef(null);
	const router = useRouter();
	const dispatch = useDispatch();
	const recipeId = router.query.id_recipe;
	const [isLoading, setIsLoading] = useState(true);

	const [image, setImage] = useState(null);
	const recipe = useSelector((state) => {
		return state.recipe;
	});

	useEffect(() => {
		dispatch(getRecipeDetail(recipeId));
		timeOut();
	}, [recipeId]);

	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

	const updateSubmit = (event) => {
		event.preventDefault();
		let formData = new FormData(event.target);
		formData.append("image", image);
		handlePost(Object.fromEntries(formData));
	};
	const updateImage = (event) => {
		const fileUploaded = event.target.files[0];
		document.getElementById("images").innerHTML = fileUploaded.name;
		setImage(fileUploaded);
	};
	const handlePost = (form) => {
		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: response.data.message,
					icon: "success",
					timer: 3000,
				});
				router.push(`/detail/${recipeId}`);
			} else {
				Swal.fire({
					title: "Profile Gagal Diupdate",
					text: response.data.message,
					timer: 2500,
					icon: "error",
					showConfirmButton: false,
				});
			}
		};
		dispatch(updateRecipe({ form, recipeId, handleSuccess }));
	};

	const timeOut = () => {
		return setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	if (isLoading === true) {
		return <Loading />;
	}
	return (
		<>
			<Head>
				<title>Update Recipe - Mamarecipe</title>
				<meta
					name="description"
					content="Mamarecipe Home"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>
			<Navbar />
			<div className="tw-w-10/12 lg:tw-w-9/12 tw-my-5 lg:tw-mt-14 tw-mx-auto">
				<form onSubmit={updateSubmit}>
					<div
						className="tw-w-full tw-h-72 lg:tw-h-96 tw-bg-[#F6F5F4] tw-rounded tw-border tw-cursor-pointer"
						onClick={handleClick}>
						<div className="tw-relative tw-translate-y-[-50%] tw-top-1/2">
							<div className="d-flex">
								<input
									type="file"
									ref={hiddenFileInput}
									onChange={updateImage}
									className={`start-50 position-relative translate-middle-x tw-hidden`}
								/>
								<div
									className="tw-mx-auto"
									id="images">
									<AddPhotoAlternateIcon fontSize="large" />
								</div>
							</div>
							<p className="text-center tw-text-[#666666] tw-font-semibold">
								Add Photo
							</p>
						</div>
					</div>
					<div className="tw-my-5">
						<TextField
							sx={{ bgcolor: "#F6F5F4" }}
							label="Title"
							fullWidth
							defaultValue={
								recipe?.data?.data?.length === 1
									? recipe?.data?.data[0].title
									: ""
							}
						/>
					</div>
					<div className="tw-my-5">
						<TextField
							id="outlined-multiline-static"
							label="Description"
							fullWidth
							multiline
							sx={{ bgcolor: "#F6F5F4" }}
							rows={3}
							defaultValue={
								recipe?.data?.data?.length === 1
									? recipe?.data?.data[0].description
									: ""
							}
						/>
					</div>
					<div className="tw-my-5">
						<TextField
							id="outlined-multiline-static"
							label="Ingredients"
							fullWidth
							multiline
							sx={{ bgcolor: "#F6F5F4" }}
							rows={9}
							defaultValue={
								recipe?.data?.data?.length === 1
									? recipe?.data?.data[0].ingredients
									: ""
							}
						/>
					</div>
					<div className="tw-my-5">
						<TextField
							id="outlined-multiline-static"
							label="Steps"
							fullWidth
							multiline
							sx={{ bgcolor: "#F6F5F4" }}
							rows={9}
							defaultValue={
								recipe?.data?.data?.length === 1
									? recipe?.data?.data[0].steps
									: ""
							}
						/>
					</div>
					<div className="lg:tw-w-2/5 tw-w-full tw-mx-auto">
						<Button
							className="tw-rounded tw-border tw-bg-yellow-400 tw-text-white tw-w-full tw-h-14 tw-my-3"
							type="submit"
							description="Post"
						/>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
}
