import { TextField } from "@mui/material";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { passwordReset } from "../../../../../Redux/Features/Action/user";
import Button from "@/Components/base/Button";

const inter = Inter({ subsets: ["latin"] });

export default function RightPanelReset() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		password: "",
		confirmPassword: "",
	});
	const token = router.query.auth;

	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			password: form.password,
		};

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
				return [
					Swal.fire({
						title: "Success!",
						text: `Password Berhasil Diganti`,
						icon: "success",
						showConfirmButton: false,
						timer: 3000,
					}),
					router.push("/login"),
				];
			}
			if (response.data.code === 408 || response.data.code === 401) {
				return [
					Swal.fire({
						title: "Error!",
						text: response.data.message,
						timer: 2500,
						icon: "error",
						showConfirmButton: false,
					}),
					router.push("/checkemail"),
				];
			}
			if (response.data.code !== 200) {
				return Swal.fire({
					title: "Error!",
					text: response.data.message,
					timer: 2500,
					icon: "error",
					showConfirmButton: false,
				});
			}
		};

		dispatch(passwordReset({ body: data, handleSuccess, token }));
	};
	return (
		<>
			<div
				className={`${inter.className} tw-flex lg:tw-w-1/2 tw-h-screen tw-w-screen`}>
				<div className="tw-m-auto tw-text-center lg:tw-w-3/5 tw-w-4/5">
					<h1 className="tw-font-bold tw-text-3xl tw-text-yellow-400 tw-my-3">
						Reset Password
					</h1>
					<p className="tw-my-3 tw-text-slate-400">
						Make sure you&apos;re not forget your password this time
					</p>
					<form onSubmit={(e) => onSubmit(e)}>
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
						<Button
							type="submit"
							className="tw-rounded tw-border tw-bg-yellow-400 tw-text-white tw-w-full tw-h-14 tw-my-3"
							description={"Reset Password"}
						/>
					</form>
				</div>
			</div>
		</>
	);
}
