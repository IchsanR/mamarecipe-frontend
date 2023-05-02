import Navbar from "@/Components/module/Navbar";
import Head from "next/head";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { TextField } from "@mui/material";
import Button from "@/Components/base/Button";
import Footer from "@/Components/module/Footer";
import { useRef, useState } from "react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../../Redux/Features/Action/recipe";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function AddRecipe() {
	const hiddenFileInput = useRef(null);
	const router = useRouter();
	const dispatch = useDispatch();
	const token = getCookie("token");
	const user = getCookie("users");
	const [form, setForm] = useState({
		title: "",
		description: "",
		ingredients: "",
		steps: "",
	});
	const [addImage, setAddImage] = useState();
	const [isUpload, setIsUpload] = useState(false);

	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

	const handleChange = (event) => {
		const fileUploaded = event.target.files[0];
		document.getElementById("images").innerHTML = fileUploaded.name;
		setAddImage(fileUploaded);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		let inputForm = new FormData();
		inputForm.append("title", form.title);
		inputForm.append("description", form.description);
		inputForm.append("ingredients", form.ingredients);
		inputForm.append("steps", form.steps);
		inputForm.append("image", addImage);

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: response.data.message,
					icon: "success",
					timer: 3000,
				});
				setIsUpload(false);
				router.push(`/profile/${user}`);
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
		dispatch(addRecipe({ token, handleSuccess, inputForm }));
	};

	return (
		<>
			<Head>
				<title>Add Recipe - Mamarecipe</title>
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
				<form onSubmit={(e) => onSubmit(e)}>
					<div
						className="tw-w-full tw-h-72 lg:tw-h-96 tw-bg-[#F6F5F4] tw-rounded tw-border tw-cursor-pointer"
						onClick={handleClick}>
						<div className="tw-relative tw-translate-y-[-50%] tw-top-1/2">
							<div className="d-flex">
								<input
									type="file"
									ref={hiddenFileInput}
									onChange={handleChange}
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
							onChange={(e) => setForm({ ...form, title: e.target.value })}
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
							onChange={(e) =>
								setForm({ ...form, description: e.target.value })
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
							onChange={(e) =>
								setForm({ ...form, ingredients: e.target.value })
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
							onChange={(e) => setForm({ ...form, steps: e.target.value })}
						/>
					</div>
					<div className="lg:tw-w-2/5 tw-w-full tw-mx-auto">
						<Button
							className="tw-rounded tw-border tw-bg-yellow-400 tw-text-white tw-w-full tw-h-14 tw-my-3"
							type="submit"
							description={
								isUpload === false ? (
									"Post"
								) : (
									<div
										className="spinner-border tw-text-center"
										role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								)
							}
						/>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
}
