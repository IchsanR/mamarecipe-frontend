import LeftPanel from "@/Components/module/LeftPanel";
import RightPanelReset from "@/Components/module/RightPanel/ResetPassword";
import Head from "next/head";

export default function ResetPassword() {
	return (
		<>
			<Head>
				<title>Reset Password - Mamarecipe</title>
				<meta
					name="description"
					content="Mamarecipe Reset Password"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>
			<div className="tw-flex">
				<LeftPanel />
				<RightPanelReset />
			</div>
		</>
	);
}
