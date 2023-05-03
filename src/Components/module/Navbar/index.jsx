import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";

const Navbar = () => {
	const [background, setBackground] = useState(false);
	const [font, setFont] = useState(false);
	const router = useRouter();
	const path = router.pathname;
	const token = getCookie("token");
	const users = getCookie("users");

	const isLogged = () => {
		if (path !== "/" && !token) {
			return (
				Swal.fire({
					title: "Halaman tidak bisa di akses",
					text: "Harap login terlebih dahulu",
					icon: "error",
				}),
				router.push("/login")
			);
		}
	};

	const changeNavi = () => {
		if (window.scrollY >= 75) {
			setBackground(true);
			setFont(true);
		} else {
			setBackground(false);
			setFont(false);
		}
	};

	useEffect(() => {
		changeNavi();
		window.addEventListener("scroll", changeNavi);
		isLogged();
	}, []);

	const handleLogout = (e) => {
		e.preventDefault();
		deleteCookie("token");
		deleteCookie("users");
		return router.push("/");
	};

	return (
		<>
			<nav
				className={
					background
						? `navbar sticky-top navbar-expand-lg lg:tw-w-full lg:tw-mx-auto tw-min-h-[80px] tw-bg-[#FFF] tw-duration-500 tw-shadow-[0_0_10px_rgba(0,0,0,0.3)]`
						: `navbar sticky-top navbar-expand-lg lg:tw-w-full lg:tw-mx-auto tw-min-h-[80px] tw-bg-transparent tw-duration-500`
				}>
				<div className="container-fluid lg:tw-w-11/12">
					<Link
						className={`navbar-brand lg:tw-hidden tw-font-semibold tw-text-xl`}
						href={"/"}>
						Mamarecipe
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarText">
						<ul className="navbar-nav w-100 text-center d-flex justify-content-between me-auto mb-2 mb-lg-0">
							<div className="d-flex flex-column flex-md-row">
								<li className={`nav-item tw-mx-5`}>
									<Link
										className={`list fw-semibold tw-text-blue-800 tw-no-underline tw-font-bold tw-text-xl`}
										aria-current="page"
										href="/">
										Home
									</Link>
								</li>
								<li className={`nav-item nav-item tw-mx-5`}>
									<Link
										className={`list fw-semibold tw-text-blue-800 tw-no-underline tw-font-bold tw-text-xl`}
										aria-current="page"
										href="/addrecipe">
										Add Recipe
									</Link>
								</li>
								<li className={`nav-item nav-item tw-mx-5`}>
									<Link
										className={`list fw-semibold tw-text-blue-800 tw-no-underline tw-font-bold tw-text-xl`}
										aria-current="page"
										href={`/profile/${users}`}>
										Profile
									</Link>
								</li>
							</div>
							{token ? (
								<li
									className={`nav-item tw-mx-5 tw-cursor-pointer list fw-semibold tw-text-blue-800 ${
										font
											? "lg:tw-text-blue-800"
											: path === "/"
											? "lg:tw-text-white"
											: "lg:tw-text-blue-800"
									} tw-font-bold tw-text-xl`}
									onClick={(e) => handleLogout(e)}>
									Logout
								</li>
							) : (
								<li className={`nav-item tw-mx-5`}>
									<Link
										className={`tw-cursor-pointer list fw-semibold tw-text-blue-800 ${
											font ? `lg:tw-text-blue-800` : `lg:tw-text-white`
										} tw-no-underline tw-font-bold tw-text-xl`}
										aria-current="page"
										href="/login">
										Login
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
