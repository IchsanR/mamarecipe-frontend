import { Inter } from "next/font/google";
import Footer from "@/Components/module/Footer";
import Navbar from "@/Components/module/Navbar";
import Head from "next/head";
import SearchIcon from "@mui/icons-material/Search";
import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipe } from "../../../Redux/Features/Action/recipe";
import { Card, CardLoading } from "@/Components/module/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Search() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { title, page, sortOrder, orderBy } = router.query;
	const [searchTitle, setSearchTitle] = useState("");
	const [searchPage, setSearhPage] = useState(1);
	const [sortOrd, setSortOrd] = useState("ASC");
	const ordBy = "title";

	useEffect(() => {
		dispatch(searchRecipe({ title, page, sortOrder, orderBy }));
	}, [title, page, sortOrder, orderBy]);

	const recipe = useSelector((state) => {
		return state.recipe;
	});
	console.log(recipe);

	const routeTo = (title, page, sortOrder, orderBy) => {
		router.push({
			pathname: "/search",
			query: {
				title: `${title}`,
				page: `${page}`,
				sortOrder: `${sortOrder}`,
				orderBy: `${orderBy}`,
			},
		});
	};

	const handleSearch = (e) => {
		e.preventDefault();
		routeTo(searchTitle, searchPage, sortOrd, ordBy);
	};

	// pagination
	const nextPage = () => {
		setSearhPage(searchPage + 1);
		routeTo(title, searchPage + 1, sortOrder, orderBy);
	};

	const prevPage = () => {
		if (searchPage > 1) {
			setSearhPage(searchPage - 1);
			routeTo(title, searchPage - 1, sortOrder, orderBy);
		}
	};

	const sorting = () => {
		sortOrd === "ASC" ? setSortOrd("DESC") : setSortOrd("ASC");
		routeTo(title, page, sortOrd, orderBy);
	};

	const order = (value) => {
		routeTo(title, page, sortOrder, value);
	};

	return (
		<>
			<Head>
				<title>Search for {title} - Mamarecipe</title>
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

			<div className={`lg:tw-w-10/12 lg:tw-mx-auto ${inter.className}`}>
				<form
					className="tw-mt-5"
					onSubmit={(e) => handleSearch(e)}>
					<h1 className="tw-text-center">Searching for: {title}</h1>
					<div className="tw-flex tw-mx-auto tw-w-3/4">
						<FormControl
							variant="outlined"
							fullWidth>
							<InputLabel htmlFor="input-with-icon-adornment">
								Search Recipe
							</InputLabel>
							<OutlinedInput
								id="input-with-icon-adornment"
								type="text"
								onChange={(e) => setSearchTitle(e.target.value)}
								endAdornment={
									<InputAdornment position="end">
										<SearchIcon
											onClick={(e) => handleSearch(e)}
											className="tw-cursor-pointer"
										/>
									</InputAdornment>
								}
								label="Search Recipe"
							/>
						</FormControl>
						<div className="tw-ml-3">
							<div className="dropdown">
								<button
									className="btn btn-secondary dropdown-toggle"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									Sort By
								</button>
								<ul className="dropdown-menu">
									<li
										className="dropdown-item tw-cursor-pointer"
										onClick={() => order("title")}>
										Title
									</li>
									<li
										className="dropdown-item tw-cursor-pointer"
										onClick={() => order("view_count")}>
										Most Viewed
									</li>
									<li
										className="dropdown-item tw-cursor-pointer"
										onClick={() => order("liked_count")}>
										Most Liked
									</li>
									<li
										className="dropdown-item tw-cursor-pointer"
										onClick={() => order("saved_count")}>
										Most Saved
									</li>
								</ul>
							</div>
						</div>
					</div>
				</form>
				<div className="lg:tw-flex lg:tw-w-11/12 lg:tw-mx-auto tw-text-center lg:tw-mt-6 tw-mt-3">
					<div className="lg:tw-flex lg:tw-flex-wrap tw-w-full">
						{recipe?.data?.data?.length > 0 ? (
							recipe?.isLoading === false ? (
								recipe?.data?.data?.map((item, index) => (
									<div key={index}>
										<Card
											img={item.image.split("|&&|")[0]}
											title={item.title}
											onclick={() => router.push(`/detail/${item.id_recipe}`)}
										/>
									</div>
								))
							) : (
								<>
									<CardLoading />
									<CardLoading />
									<CardLoading />
								</>
							)
						) : (
							<div className="tw-text-center tw-h-48 tw-w-full tw-mt-7">
								<h1>Resep Tidak Ditemukan</h1>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-center mt-4">
				<nav aria-label="Page navigation example">
					<ul className="pagination">
						<li className="page-item">
							<button
								className="page-link"
								onClick={() => prevPage()}>
								Previous
							</button>
						</li>
						<li className="page-item">
							<button className="page-link">{page}</button>
						</li>
						<li
							className="page-item"
							disabled={recipe?.data?.data <= 0}>
							<button
								className="page-link"
								disabled={recipe?.data?.data <= 0}
								onClick={() => nextPage()}>
								Next
							</button>
						</li>
						<li className="page-item">
							<button
								className="page-link"
								aria-label="Next"
								onClick={() => sorting()}>
								<span aria-hidden="true">
									{sortOrder === "ASC" ? "A to Z" : "Z to A"}
								</span>
							</button>
						</li>
					</ul>
				</nav>
			</div>
			<Footer />
		</>
	);
}
