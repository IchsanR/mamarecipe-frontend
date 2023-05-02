import { TextField } from "@mui/material";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkEmail } from "../../../../../Redux/Features/Action/user";
import Swal from "sweetalert2";
import Button from "@/Components/base/Button";

const inter = Inter({ subsets: ["latin"] });

export default function RightPanelCheck() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: "",
		phone: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: form.email,
			phone: form.phone,
		};
		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				router.push({
					pathname: "/reset",
					query: { auth: response.data.data },
				});
			} else {
				Swal.fire({
					title: "Data tidak ditemukan",
					text: response.data.message,
					timer: 2500,
					icon: "error",
					showConfirmButton: false,
				});
			}
		};

		dispatch(checkEmail({ body: data, handleSuccess }));
	};
	return (
		<>
			<div
				className={`${inter.className} tw-flex lg:tw-w-1/2 tw-h-screen tw-w-screen`}>
				<div className="tw-m-auto tw-text-center lg:tw-w-3/5 tw-w-4/5">
					<h1 className="tw-font-bold tw-text-3xl tw-text-yellow-400 tw-my-3">
						Forgot Password?
					</h1>
					<p className="tw-my-3 tw-text-slate-400">
						We just need your registered e-mail address and phone number to
						verified your data
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
								label="Phone Number"
								type="text"
								fullWidth
								onChange={(e) => setForm({ ...form, phone: e.target.value })}
							/>
						</div>
						<Button
							type="submit"
							className="tw-rounded tw-border tw-bg-yellow-400 tw-text-white tw-w-full tw-h-14 tw-my-3"
							description={"Verify"}
						/>
					</form>
					<div className="tw-text-center tw-my-3">
						<p className="tw-text-slate-400 tw-text-sm">
							Remembered your password?{" "}
							<span>
								<Link
									href={"/login"}
									className="tw-text-yellow-400">
									Login Here
								</Link>
							</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
