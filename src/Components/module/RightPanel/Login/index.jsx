import { Inter } from "next/font/google";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../../Redux/Features/Action/user";
import Swal from "sweetalert2";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Button from "@/Components/base/Button";

const inter = Inter({ subsets: ["latin"] });

export default function RightPanelLogin() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [checked, setChecked] = useState(false);

	const handleChecked = (e) => {
		e.preventDefault();
		if (e.target.checked === true) return setChecked(true);
		if (e.target.checked === false) return setChecked(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const body = {
			email: form.email,
			password: form.password,
		};
		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				Swal.fire({
					title: "Success!",
					text: `Selamat datang ${response.data.data.user.name}`,
					icon: "success",
					timer: 3000,
				});
				setCookie("token", response.data.data.token);
				setCookie("users", response.data.data.user.id_user);
				router.push("/");
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
		if (checked === false)
			return Swal.fire({
				title: "Error!",
				text: "Please, accept the user agreement",
				icon: "error",
				showConfirmButton: true,
				confirmButtonText: "OK!",
			});
		if (checked === true) return dispatch(loginUser({ body, handleSuccess }));
	};
	return (
		<>
			<div
				className={`${inter.className} tw-flex lg:tw-w-1/2 tw-h-screen tw-w-screen`}>
				<div className="tw-m-auto tw-text-center lg:tw-w-3/5 tw-w-4/5">
					<h1 className="tw-font-bold tw-text-3xl tw-text-yellow-400 tw-my-3">
						Welcome
					</h1>
					<p className="tw-my-3 tw-text-slate-400">
						Log in into your exiting account
					</p>
					<form onSubmit={(e) => onSubmit(e)}>
						<div className="tw-my-3">
							<TextField
								required
								label="E-mail"
								type="email"
								fullWidth
								onChange={(e) => setForm({ ...form, email: e.target.value })}
							/>
						</div>
						<div className="tw-my-3">
							<TextField
								required
								label="Password"
								type="password"
								fullWidth
								onChange={(e) => setForm({ ...form, password: e.target.value })}
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
							description={"Login"}
						/>
					</form>
					<div className="tw-text-right tw-my-3">
						<Link
							href={"/checkemail"}
							className="tw-text-slate-400 tw-text-sm">
							Forgot Password?
						</Link>
					</div>
					<div className="tw-text-center">
						<p className="tw-text-slate-400 tw-text-sm">
							Don&apos;t have account?{" "}
							<span>
								<Link
									href={"/register"}
									className="tw-text-yellow-400">
									Sign Up
								</Link>
							</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
