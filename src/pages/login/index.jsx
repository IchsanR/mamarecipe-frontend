import LeftPanel from "@/Components/module/LeftPanel";
import RightPanelLogin from "@/Components/module/RightPanel/Login";
import Head from "next/head";

export default function Login() {
	return (
		<>
			<Head>
				<title>Log In - Mamarecipe</title>
				<meta
					name="description"
					content="Mamarecipe Log In"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>
			<div className="tw-flex">
				<LeftPanel />
				<RightPanelLogin />
			</div>
		</>
	);
}
