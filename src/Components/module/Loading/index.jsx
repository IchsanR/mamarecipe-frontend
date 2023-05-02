import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
	return (
		<div className="tw-flex tw-justify-center tw-items-center tw-h-screen tw-bg-[#efc81a]">
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="#FFF"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClassName=""
				visible={true}
			/>
		</div>
	);
}
