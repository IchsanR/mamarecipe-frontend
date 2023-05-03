import { Inter } from "next/font/google";
import Navbar from "@/Components/module/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addLikedRecipe,
	addSavedRecipe,
	deleteRecipe,
	getRecipeDetail,
	viewCount,
} from "../../../../Redux/Features/Action/recipe";
import Loading from "@/Components/module/Loading";
import Image from "next/image";
import Footer from "@/Components/module/Footer";
import { TextField } from "@mui/material";
import Button from "@/Components/base/Button";
import Link from "next/link";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function DetailRecipe() {
	const dispatch = useDispatch();
	const recipe = useSelector((state) => {
		return state.recipe;
	});
	const router = useRouter();
	const recipeId = router.query.id_recipe;
	const [isLoading, setIsLoading] = useState(true);
	const token = getCookie("token");
	const user = getCookie("users");

	useEffect(() => {
		dispatch(getRecipeDetail(recipeId));
		viewCount(recipeId);
		timeOut();
	}, [recipeId]);

	const timeOut = () => {
		return setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	if (isLoading === true) {
		return <Loading />;
	}

	const onSaved = (e) => {
		e.preventDefault();

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: response.data.message,
					icon: "success",
					timer: 3000,
				});
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

		addSavedRecipe(recipeId, token, handleSuccess);
		dispatch(getRecipeDetail(recipeId));
	};

	const onLiked = (e) => {
		e.preventDefault();

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: response.data.message,
					icon: "success",
					timer: 3000,
				});
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

		addLikedRecipe(recipeId, token, handleSuccess);
		dispatch(getRecipeDetail(recipeId));
	};

	const onDelete = (e, recipeId) => {
		e.preventDefault();

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: response.data.message,
					icon: "success",
					timer: 3000,
				});
				router.push(`/profile/${user}`);
			} else {
				Swal.fire({
					title: "Error!",
					text: response.data.message,
					timer: 2500,
					icon: "error",
					showConfirmButton: false,
				});
			}
		};

		dispatch(deleteRecipe({ recipeId, handleSuccess }));
	};

	return (
		<>
			<Head>
				{recipe.data.code === 404 || recipe.data.data.length === 0 ? (
					<title>Resep Tidak Ditemukan - Mamarecipe</title>
				) : (
					<title>Resep {recipe?.data?.data[0]?.title} - Mamarecipe</title>
				)}
				<meta
					name="description"
					content="Mamarecipe Detail Recipe"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>
			<Navbar />

			{recipe.data.code === 404 || recipe.data.data.length === 0 ? (
				<div className="tw-h-[80vh]">
					<div className="tw-h-full tw-text-center tw-relative tw-top-1/2">
						<h1 className="tw-translate-y-[-50%]">Resep Tidak Ada</h1>
						<Link
							className="tw-no-underline"
							href={"/"}>
							Back to Homepage
						</Link>
					</div>
				</div>
			) : (
				<div className={`lg:tw-w-10/12 lg:tw-mx-auto ${inter.className}`}>
					<section className="tw-mx-auto tw-mt-7 lg:tw-mt-10">
						<div className="tw-text-center">
							<p
								className="tw-font-bold tw-text-2xl lg:tw-text-4xl tw-text-[#2E266F]"
								data-aos="fade-up"
								data-aos-duration="1000">
								{recipe?.data?.data[0].title}
							</p>
						</div>
						<div
							className="tw-mx-auto lg:tw-w-7/12 tw-w-full tw-my-7 tw-px-3 lg:tw-px-0"
							data-aos="fade-down"
							data-aos-duration="1000">
							<Image
								src={recipe?.data?.data[0].image.split("|&&|")[0]}
								fill
								className="tw-rounded-xl tw-cursor-pointer tw-h-full tw-w-full tw-object-cover tw-relative"
								alt={recipe?.data?.data[0].title}
							/>
							<div className="tw-flex tw-w-full tw-flex-row-reverse -tw-mt-[60px] -tw-ml-4">
								<button
									type="button"
									onClick={(e) => onLiked(e)}
									className="tw-ml-2 tw-relative tw-p-1 tw-w-[40px] tw-h-[45px] tw-rounded tw-bg-[#FFF]">
									<Image
										src={"/like.svg"}
										fill
										className="tw-relative tw-m-auto"
										alt="Save"
									/>
								</button>
								<button
									type="button"
									onClick={(e) => onSaved(e)}
									className="tw-text-[24px] tw-relative tw-w-[40px] tw-h-[45px] tw-rounded tw-bg-yellow-400">
									<Image
										src={"/bookmark.svg"}
										fill
										className="tw-relative tw-m-auto"
										alt="Save"
									/>
								</button>
							</div>
							{user === recipe?.data?.data[0].id_user ? (
								<div
									className="tw-mt-5 tw-flex tw-w-full"
									data-aos="fade-left"
									data-aos-duration="1000">
									<div className="tw-flex tw-mx-auto">
										<Button
											description={"Delete"}
											type={"button"}
											className="tw-w-20 btn btn-danger"
											onClick={(e) => onDelete(e, recipeId)}
										/>
									</div>
								</div>
							) : (
								<></>
							)}
						</div>
						<div className="tw-text-center lg:tw-w-8/12 tw-mx-auto tw-px-5 tw-my-7">
							<p
								data-aos="fade-down"
								data-aos-duration="1000">
								Upload By:{" "}
								<span>
									<Link
										href={`/profile/${recipe?.data?.data[0]?.id_user}`}
										className="tw-font-bold tw-no-underline">
										{recipe?.data?.data[0]?.uploader}
									</Link>
								</span>
							</p>
							<p
								data-aos="fade-down"
								data-aos-duration="1000">
								{recipe?.data?.data[0]?.description}
							</p>
						</div>
						<div className="tw-px-3 lg:tw-px-0">
							<h1
								className="tw-text-bold lg:tw-mb-5 lg:tw-mt-10 tw-my-4"
								data-aos="fade-left"
								data-aos-duration="1000">
								Ingredients
							</h1>
							<ul style={{ listStyleType: "disc" }}>
								{recipe?.data?.data[0]?.ingredients
									?.split("\n")
									.map((item, index) => (
										<li
											data-aos="fade-left"
											data-aos-duration="1000"
											key={index}>
											{item}
										</li>
									))}
							</ul>
						</div>
						<div className="tw-px-3 lg:tw-px-0">
							<h1
								className="tw-text-bold lg:tw-mb-5 lg:tw-mt-10 tw-my-4"
								data-aos="fade-left"
								data-aos-duration="1000">
								Cooking Steps
							</h1>
							<ul style={{ listStyleType: "disc" }}>
								{recipe?.data?.data[0]?.steps
									?.split("\n")
									.map((item, index) => (
										<li
											data-aos="fade-left"
											data-aos-duration="1000"
											key={index}>
											{item}
										</li>
									))}
							</ul>
						</div>
					</section>

					{/* <section className="tw-mt-7 lg:tw-mt-10 lg:tw-w-full lg:tw-px-0 tw-px-5">
						<form>
							<div
								className="tw-my-3"
								data-aos="fade-up"
								data-aos-duration="1000">
								<TextField
									id="outlined-multiline-static"
									label="Comment"
									fullWidth
									multiline
									sx={{ bgcolor: "#F6F5F4" }}
									rows={2}
									// onChange={(e) => setForm({ ...form, steps: e.target.value })}
								/>
							</div>
							<div
								className="lg:tw-w-2/5 tw-w-full tw-mx-auto"
								data-aos="fade-up"
								data-aos-duration="1000">
								<Button
									className="tw-rounded tw-border tw-bg-yellow-400 tw-text-white tw-w-full tw-h-14 tw-my-3"
									type="submit"
									description="Send"
								/>
							</div>
						</form>
					</section> */}
				</div>
			)}

			<Footer />
		</>
	);
}
