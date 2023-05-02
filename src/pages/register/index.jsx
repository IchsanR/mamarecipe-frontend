import LeftPanel from "@/Components/module/LeftPanel";
import RightPanelRegister from "@/Components/module/RightPanel/Register";
import Head from "next/head";

export default function Register() {
	return (
		<>
			<Head>
				<title>Sign Up - Mamarecipe</title>
				<meta
					name="description"
					content="Mamarecipe Registration"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>
			<div className="tw-flex">
				<LeftPanel />
				<RightPanelRegister />
			</div>
		</>
	);
}
