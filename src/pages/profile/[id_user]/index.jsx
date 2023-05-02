import Navbar from "@/Components/module/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserDetail,
	updateAccount,
	updateProfilePic,
} from "../../../../Redux/Features/Action/user";
import Loading from "@/Components/module/Loading";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import Footer from "@/Components/module/Footer";
import {
	getUserLiked,
	getUserRecipe,
	getUserSaved,
} from "../../../../Redux/Features/Action/recipe";
import {
	ProfileCardLoading,
	ProfileCard,
} from "@/Components/module/ProfileCard";

export default function Profile() {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector((state) => {
		return state.user;
	});
	const userId = router.query.id_user;
	const account = getCookie("users");
	const token = getCookie("token");
	const [isActive, setIsActive] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isUpload, setIsUpload] = useState(false);
	const [name, setName] = useState([]);
	const [addImage, setAddImage] = useState(null);
	const imageInputRef = useRef();
	const [form, setForm] = useState({
		name: null,
		phone: null,
	});
	const recipe = useSelector((state) => {
		return state.recipe;
	});
	const getInitials = (fullName) => {
		const allNames = fullName.trim().split(" ");
		const initials = allNames.reduce((acc, curr, index) => {
			if (index === 0 || index === allNames.length - 1) {
				acc = `${acc}${curr.charAt(0).toUpperCase()}`;
			}
			return acc;
		}, "");
		return initials;
	};

	const nameInitials = name?.map(getInitials).join();

	useEffect(() => {
		dispatch(getUserDetail(userId));
		timeOut();
		if (isActive === 1) {
			dispatch(getUserRecipe(userId));
		}
		if (isActive === 2) {
			dispatch(getUserSaved(userId));
		}
		if (isActive === 3) {
			dispatch(getUserLiked(userId));
		}
	}, [userId, isActive]);

	useEffect(() => {
		if (user.isLoading === false && user.data.data[0] !== undefined) {
			setName([user.data.data[0].name]);
		}
	}, [user]);

	const timeOut = () => {
		return setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	if (isLoading === true) {
		return <Loading />;
	}

	// Update account
	const onSubmit = (e) => {
		e.preventDefault();

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: response.data.message,
					icon: "success",
					timer: 3000,
				});
				setIsUpload(false);
				dispatch(getUserDetail(userId));
			} else {
				Swal.fire({
					title: "Profile Gagal Diupdate",
					text: response.data.message,
					timer: 2500,
					icon: "error",
					showConfirmButton: false,
				});
				setIsUpload(false);
			}
		};

		setIsUpload(true);
		updateAccount(form, token, handleSuccess);
	};

	// Update picture
	const handleChange = (e) => {
		const fileUploaded = e.target.files[0];
		document.getElementById("updatePics").innerHTML = fileUploaded.name;
		setAddImage(fileUploaded);
	};

	const updatePicture = (e) => {
		e.preventDefault();

		let inputImage = new FormData();
		inputImage.append("profile_pic", addImage);

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: response.data.message,
					icon: "success",
					timer: 3000,
				});
				setAddImage(null);
				imageInputRef.current.value = "";
				setIsUpload(false);
				dispatch(getUserDetail(userId));
			} else {
				Swal.fire({
					title: "Error!",
					text: response.data.message,
					timer: 2500,
					icon: "error",
					showConfirmButton: false,
				});
				setIsUpload(false);
			}
		};

		setIsUpload(true);
		updateProfilePic(inputImage, token, handleSuccess);
	};

	return (
		<>
			<Head>
				{user.data.code === 404 || user.data.data.length === 0 ? (
					<title>User Tidak Ditemukan - Mamarecipe</title>
				) : (
					<title>{user?.data?.data[0]?.name} - Mamarecipe</title>
				)}
				<meta
					name="description"
					content="Mamarecipe Profile"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>
			<Navbar />

			{user.data.code === 404 || user.data.data.length === 0 ? (
				<div className="tw-h-[80vh]">
					<div className="tw-h-full tw-text-center tw-relative tw-top-1/2">
						<h1 className="tw-translate-y-[-50%]">User Tidak Ditemukan</h1>
						<Link
							className="tw-no-underline"
							href={"/"}>
							Back to Homepage
						</Link>
					</div>
				</div>
			) : (
				<div className="lg:tw-w-10/12 tw-px-3 tw-mx-auto lg:tw-px-0">
					<section className="tw-w-full lg:tw-mt-20">
						<div className="tw-flex tw-justify-center">
							{user?.data?.data[0].profile_pic === null ? (
								<div className="tw-h-28 tw-w-28 tw-rounded-full tw-text-center tw-bg-slate-400">
									<h1 className="tw-relative tw-top-1/2 tw-left-1/2 tw-translate-y-[-50%] tw-translate-x-[-50%]">
										{nameInitials}
									</h1>
								</div>
							) : (
								<div className="tw-h-28 tw-w-28 tw-rounded-full">
									<Image
										src={user?.data?.data[0].profile_pic.split("|&&|")[0]}
										alt={user.data.data[0].name}
										fill
										className="tw-rounded-full tw-cursor-pointer tw-h-full tw-w-full tw-object-cover tw-relative"
									/>
								</div>
							)}
							{userId === account ? (
								<div className="tw-absolute tw-ml-[95px] tw-mt-[90px] tw-h-[24px] tw-w-[24px]">
									<Image
										src={"/editProfile.svg"}
										alt="Edit Profile"
										fill
										data-bs-toggle="collapse"
										data-bs-target="#edit-profile"
										aria-expanded="false"
										aria-controls="edit-profile"
										type="button"
									/>
								</div>
							) : (
								<></>
							)}
						</div>
						<div
							className={`tw-relative collapse tw-text-center tw-mt-3`}
							id="edit-profile">
							<button
								type="button"
								className="btn tw-bg-yellow-400 tw-rounded md:tw-mr-3 tw-mb-1 lg:tw-mb-0 tw-w-48 tw-font-bold tw-text-white"
								data-bs-toggle="modal"
								data-bs-target="#editProfileModal">
								Edit Profile
							</button>
							<button
								type="button"
								className="btn tw-bg-yellow-400 tw-rounded tw-w-48 tw-font-bold tw-text-white"
								data-bs-toggle="modal"
								data-bs-target="#changePicture">
								Change Picture
							</button>
							<div
								className="modal fade"
								id="editProfileModal"
								tabIndex="-1"
								aria-labelledby="editProfileModalLabel"
								aria-hidden="true">
								<form onSubmit={(e) => onSubmit(e)}>
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1
													className="modal-title fs-5"
													id="editProfileModalLabel">
													Edit Profile
												</h1>
												<button
													type="button"
													className="btn-close"
													data-bs-dismiss="modal"
													aria-label="Close"></button>
											</div>
											<div className="modal-body">
												<div className="tw-my-3">
													<TextField
														label="Name"
														type="text"
														required
														fullWidth
														onChange={(e) =>
															setForm({ ...form, name: e.target.value })
														}
														defaultValue={user.data.data[0].name}
													/>
												</div>
												<div className="tw-my-3">
													<TextField
														label="Phone Number"
														type="text"
														required
														fullWidth
														onChange={(e) =>
															setForm({ ...form, phone: e.target.value })
														}
														defaultValue={user.data.data[0].phone}
													/>
												</div>
											</div>
											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-secondary"
													data-bs-dismiss="modal">
													Close
												</button>
												<button
													type="submit"
													className="btn tw-bg-yellow-400 tw-text-white">
													{isUpload === false ? (
														"Save changes"
													) : (
														<div
															className="spinner-border tw-text-center"
															role="status">
															<span className="visually-hidden">
																Loading...
															</span>
														</div>
													)}
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div
								className="modal fade"
								id="changePicture"
								tabIndex="-1"
								aria-labelledby="changePictureLabel"
								aria-hidden="true">
								<form onSubmit={(e) => updatePicture(e)}>
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1
													className="modal-title fs-5"
													id="changePictureLabel">
													Change Picture
												</h1>
												<button
													type="button"
													className="btn-close"
													data-bs-dismiss="modal"
													aria-label="Close"></button>
											</div>
											<div className="modal-body">
												<input
													type="file"
													name="Profile Picture"
													id="updatePics"
													onChange={handleChange}
													ref={imageInputRef}
												/>
											</div>
											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-secondary"
													data-bs-dismiss="modal">
													Close
												</button>
												<button
													type="submit"
													className="btn tw-bg-yellow-400 tw-text-white">
													{isUpload === false ? (
														"Save changes"
													) : (
														<div
															className="spinner-border tw-text-center"
															role="status">
															<span className="visually-hidden">
																Loading...
															</span>
														</div>
													)}
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="tw-mt-5">
							<h1 className="tw-text-center">{user.data.data[0].name}</h1>
						</div>
					</section>
					<section className="tw-w-full lg:tw-mt-20">
						<div className="tw-flex tw-justify-evenly lg:tw-justify-start">
							<button
								type="button"
								className={`lg:tw-mr-10 tw-font-bold ${
									isActive === 1
										? "tw-underline tw-underline-offset-8 tw-decoration-4"
										: ""
								}`}
								onClick={() => setIsActive(1)}>
								My Recipe
							</button>
							<button
								type="button"
								className={`lg:tw-mr-10 tw-font-bold ${
									isActive === 2
										? "tw-underline tw-underline-offset-8 tw-decoration-4"
										: ""
								}`}
								onClick={() => setIsActive(2)}>
								Saved Recipe
							</button>
							<button
								type="button"
								className={`lg:tw-mr-10 tw-font-bold ${
									isActive === 3
										? "tw-underline tw-underline-offset-8 tw-decoration-4"
										: ""
								}`}
								onClick={() => setIsActive(3)}>
								Liked Recipe
							</button>
						</div>
						{recipe?.data?.isLoading === true ? (
							<>
								<ProfileCardLoading />
							</>
						) : recipe?.data?.data.length === 0 ? (
							<div className="tw-text-center tw-h-48 tw-mt-7">
								<h1>Resep Tidak Ditemukan</h1>
							</div>
						) : (
							<div className="lg:tw-flex tw-mt-7">
								{recipe?.data?.data?.map((item, index) => (
									<div key={index}>
										<ProfileCard
											img={item.image.split("|&&|")[0]}
											title={item.title}
											aos={"fade-left"}
											aosDuration={"1000"}
											onclick={() => router.push(`/detail/${item.id_recipe}`)}
										/>
									</div>
								))}
							</div>
						)}
					</section>
				</div>
			)}
			<Footer />
		</>
	);
}
