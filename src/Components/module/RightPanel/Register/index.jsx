import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { regiterUser } from "../../../../../Redux/Features/Action/user";
import { useRouter } from "next/router";
import Button from "@/Components/base/Button";

const inter = Inter({ subsets: ["latin"] });

export default function RightPanelRegister() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [checked, setChecked] = useState(false);

	const handleChecked = (e) => {
		e.preventDefault();
		if (e.target.checked === true) return setChecked(true);
		if (e.target.checked === false) return setChecked(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			name: form.name,
			email: form.email,
			phone: form.phone,
			password: form.password,
		};

		if (checked === false)
			return Swal.fire({
				title: "Error!",
				text: "Please, accept the user agreement",
				icon: "error",
				showConfirmButton: true,
				confirmButtonText: "OK!",
			});

		if (form.password !== form.confirmPassword)
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Password tidak sama",
				timer: 2500,
			});
		if (form.password.length < 6)
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Password minimal 6 karakter",
				timer: 2500,
			});

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: `Registrasi Berhasil`,
					icon: "success",
					timer: 3000,
				});
				router.push("/login");
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

		if (checked === true)
			return dispatch(regiterUser({ body: data, handleSuccess }));
	};
	return (
		<>
			<div
				className={`${inter.className} tw-flex lg:tw-w-1/2 tw-h-screen tw-w-screen`}>
				<div className="tw-m-auto tw-text-center lg:tw-w-3/5 tw-w-4/5">
					<h1 className="tw-font-bold tw-text-3xl tw-text-yellow-400 tw-my-3">
						Let’s Get Started !
					</h1>
					<p className="tw-my-3 tw-text-slate-400">
						Create new account to access all features
					</p>
					<form onSubmit={(e) => onSubmit(e)}>
						<div className="tw-my-3">
							<TextField
								required
								label="Name"
								type="text"
								fullWidth
								onChange={(e) => setForm({ ...form, name: e.target.value })}
							/>
						</div>
						<div className="tw-my-3">
							<TextField
								required
								label="Email Address"
								type="email"
								fullWidth
								onChange={(e) => setForm({ ...form, email: e.target.value })}
							/>
						</div>
						<div className="tw-my-3">
							<TextField
								required
								label="Phone Number"
								type="text"
								fullWidth
								onChange={(e) => setForm({ ...form, phone: e.target.value })}
							/>
						</div>
						<div className="tw-my-3">
							<TextField
								required
								label="Create New Password"
								type="password"
								fullWidth
								onChange={(e) => setForm({ ...form, password: e.target.value })}
							/>
						</div>
						<div className="tw-my-3">
							<TextField
								required
								label="Confirm New Password"
								type="password"
								fullWidth
								onChange={(e) =>
									setForm({ ...form, confirmPassword: e.target.value })
								}
							/>
						</div>
						<div className="tw-ml-0 tw-absolute tw-text-slate-500">
							<FormControlLabel
								control={<Checkbox onChange={(e) => handleChecked(e)} />}
								label="I agree to terms & conditions"
							/>
						</div>
						<Button
							type="submit"
							className="tw-rounded tw-border tw-bg-yellow-400 tw-text-white tw-w-full tw-h-14 tw-mt-10"
							description="Register Account"
						/>
					</form>
					<div className="tw-text-center tw-my-3">
						<p className="tw-text-slate-400 tw-text-sm">
							Already Have Account?{" "}
							<span>
								<Link
									href={"/login"}
									className="tw-text-yellow-400">
									Log In
								</Link>
							</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
