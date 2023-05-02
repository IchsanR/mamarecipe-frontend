import LeftPanel from "@/Components/module/LeftPanel";
import RightPanelCheck from "@/Components/module/RightPanel/CheckEmail";
import Head from "next/head";

export default function CheckEmail() {
	return (
		<>
			<Head>
				<title>Email Check - Mamarecipe</title>
				<meta
					name="description"
					content="Mamarecipe Check Email"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>
			<div className="tw-flex">
				<LeftPanel />
				<RightPanelCheck />
			</div>
		</>
	);
}
