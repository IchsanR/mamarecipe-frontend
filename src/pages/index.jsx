import { Inter } from "next/font/google";
import Head from "next/head";
import Navbar from "@/Components/module/Navbar";
import Footer from "@/Components/module/Footer";
import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "@/Components/base/Header";
import { useDispatch, useSelector } from "react-redux";
import { mostViewed, searchRecipe } from "../../Redux/Features/Action/recipe";
import { useEffect, useState } from "react";
import { Card, CardLoading } from "@/Components/module/Card";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import Image from "next/image";
import homePicture from "../../public/homePicture.svg";
import Loading from "@/Components/module/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const router = useRouter();
	const path = router.pathname;
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const recipe = useSelector((state) => {
		return state.recipe;
	});
	const [title, setTitle] = useState("");
	const page = 1;
	const sortOrd = "ASC";
	const ordBy = "title";

	useEffect(() => {
		dispatch(mostViewed());
		timeOut();
	}, [path]);

	const timeOut = () => {
		return setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	if (isLoading === true) {
		return <Loading />;
	}

	const goToPage = (path) => {
		return router.push(`/detail/${path}`), setIsLoading(true);
	};

	// Search

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
		dispatch(searchRecipe({ title, page, sortOrder, orderBy }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		routeTo(title, page, sortOrd, ordBy);
	};

	return (
		<>
			<Head>
				<title>Home - Mamarecipe</title>
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
				<div className="tw-absolute tw-right-0 tw-top-0 -tw-z-10 tw-bg-yellow-400 tw-hidden lg:tw-block lg:tw-w-3/12 lg:tw-h-[110vh] 2xl:tw-h-[80vh]" />
				<section className="tw-ml-3 lg:tw-ml-0 tw-flex justify-content-between lg:tw-mb-20 tw-mb-10">
					<div className="lg:tw-my-auto lg:tw-w-7/12">
						<h1 className="tw-font-bold lg:tw-text-7xl tw-text-4xl tw-text-indigo-800">
							Discover Recipe & Delicious Food
						</h1>
						<form onSubmit={(e) => onSubmit(e)}>
							<div className="tw-flex tw-w-3/4">
								<FormControl
									variant="outlined"
									fullWidth>
									<InputLabel htmlFor="input-with-icon-adornment">
										Search Recipe
									</InputLabel>
									<OutlinedInput
										id="input-with-icon-adornment"
										type="text"
										onChange={(e) => setTitle(e.target.value)}
										endAdornment={
											<InputAdornment position="end">
												<SearchIcon
													onClick={(e) => onSubmit(e)}
													className="tw-cursor-pointer"
												/>
											</InputAdornment>
										}
										label="Search Recipe"
									/>
								</FormControl>
							</div>
						</form>
					</div>
					<div className="lg:tw-mt-16 lg:tw-justify-items-end lg:tw-w-4/12 lg:tw-grid tw-hidden">
						<Image
							src={homePicture}
							alt="Mamarecipe"
							priority
						/>
					</div>
				</section>

				<section className="lg:tw-ml-0 tw-w-[95%] tw-mx-auto">
					<Header
						description="Recipe For You"
						aos={"fade-left"}
						aosDuration={"1000"}
					/>
					<div className="lg:tw-flex tw-w-full tw-text-center">
						{recipe.data.data.length > 0 ? (
							recipe?.isLoading === false ? (
								recipe?.data?.data?.slice(0, 2).map((item, index) => (
									<div key={index}>
										<Card
											img={item.image.split("|&&|")[0]}
											title={item.title}
											aos={"fade-right"}
											aosDuration={"1000"}
											onclick={() => goToPage(item.id_recipe)}
										/>
									</div>
								))
							) : (
								<>
									<CardLoading />
									<CardLoading />
								</>
							)
						) : (
							<div className="tw-text-center tw-h-48 tw-mt-7">
								<h1>Resep Tidak Ditemukan</h1>
							</div>
						)}
					</div>
				</section>

				<section className="lg:tw-ml-0 tw-mb-5">
					<Header
						description="Popular Recipe"
						aos={"fade-down"}
						aosDuration={"1000"}
					/>
					<div
						data-aos="fade-up"
						data-aos-duration="1000">
						{recipe?.data?.data.length === 0 ? (
							<div className="tw-text-center tw-h-48 tw-mt-7">
								<h1>Resep Tidak Ditemukan</h1>
							</div>
						) : (
							<Swiper
								effect={"coverflow"}
								grabCursor={true}
								centeredSlides={true}
								slidesPerView={"auto"}
								coverflowEffect={{
									rotate: 50,
									stretch: 0,
									depth: 100,
									modifier: 1,
									slideShadows: true,
								}}
								pagination={true}
								modules={[EffectCoverflow, Pagination]}
								className="mySwiper tw-w-full tw-px-[50px]">
								{recipe.isLoading === false ? (
									recipe?.data?.data?.map((item, index) => (
										<SwiperSlide
											className="tw-bg-center tw-bg-cover tw-w-[300px] tw-h-[300px] tw-text-center tw-relative"
											key={index}>
											<Image
												src={item.image.split("|&&|")[0]}
												alt={item.title}
												fill
												className="tw-block tw-w-full tw-h-full tw-rounded tw-relative"
												onClick={() => goToPage(item.id_recipe)}
											/>
											<span className="tw-relative tw-bottom-10 tw-bg-[#25252588] tw-rounded tw-p-3 text-white tw-font-bold">
												{item.title}
											</span>
										</SwiperSlide>
									))
								) : (
									<div className="tw-flex">
										<CardLoading />
										<CardLoading />
										<CardLoading />
									</div>
								)}
							</Swiper>
						)}
					</div>
				</section>
			</div>

			<Footer />
		</>
	);
}
