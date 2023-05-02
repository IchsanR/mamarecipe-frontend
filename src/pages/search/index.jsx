import Footer from "@/Components/module/Footer";
import Navbar from "@/Components/module/Navbar";
import Head from "next/head";
import Link from "next/link";

export default function Search() {
	return (
		<>
			<Head>
				<title>Search - Mamarecipe</title>
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
			<div className="tw-h-[80vh]">
				<div className="tw-h-full tw-text-center tw-relative tw-top-1/2">
					<h1 className="tw-translate-y-[-50%]">Page Under Construction</h1>
					<Link
						className="tw-no-underline"
						href={"/"}>
						Back to Homepage
					</Link>
				</div>
			</div>
			<Footer />
		</>
	);
}
