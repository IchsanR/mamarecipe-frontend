import Image from "next/image";
import styles from "@/styles/Components.module.css";
export default function LeftPanel() {
	return (
		<>
			<div
				className={`tw-hidden lg:tw-flex lg:tw-w-1/2 lg:tw-h-screen tw-bg-no-repeat tw-bg-cover ${styles.leftPanel}`}>
				<Image
					src={"/logo.png"}
					width={182}
					height={224}
					alt="Mamarecipe"
					className="tw-m-auto"
				/>
			</div>
		</>
	);
}
