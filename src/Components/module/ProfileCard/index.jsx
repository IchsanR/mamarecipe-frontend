import { Skeleton } from "@mui/material";
import Image from "next/image";

const ProfileCard = ({ img, title, onclick, aos, aosDuration }) => {
	return (
		<div
			onClick={onclick}
			className={`tw-w-full lg:tw-w-72 tw-h-48 tw-mx-auto lg:tw-mr-4 lg:tw-ml-0 tw-mb-5`}
			data-aos={aos}
			data-aos-duration={aosDuration}>
			<Image
				src={img}
				alt={title}
				fill
				className="tw-rounded tw-cursor-pointer tw-h-full tw-w-full tw-object-cover tw-relative"
			/>
			<span className="tw-relative tw-bottom-10 tw-bg-[#25252588] tw-rounded tw-p-3 text-white tw-font-bold">
				{title}
			</span>
		</div>
	);
};

const ProfileCardLoading = () => {
	return (
		<div className="tw-w-full lg:tw-w-72 tw-h-48 tw-mx-auto lg:tw-mr-4 lg:tw-ml-0 tw-mb-5">
			<Skeleton
				variant="rectangular"
				className="tw-h-full tw-w-full"
			/>
		</div>
	);
};

export { ProfileCard, ProfileCardLoading };
