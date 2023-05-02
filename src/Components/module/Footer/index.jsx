import Image from "next/image";

export default function Footer() {
	return (
		<>
			<div className="tw-w-full tw-bg-yellow-400 tw-min-h-[300px] tw-bottom-0 tw-z-10">
				<div className="text-center tw-w-full lg:tw-py-10 tw-py-20">
					<h1 className="lg:tw-text-6xl tw-text-4xl lg:tw-my-6 tw-mb-4 tw-text-[#2E266F]">
						Eat, Cook, Repeat
					</h1>
					<p className="lg:tw-text-2xl tw-text-[#707070]">
						Share your best recipe by uploading here !
					</p>
				</div>
				<div className="tw-absolute tw-right-0 tw-mr-6">
					<div className="tw-flex">
						<Image
							src={"/copyright.svg"}
							width={15}
							height={15}
							alt="Copyright"
						/>
						<p className="tw-text-bolder tw-my-auto tw-ml-3">Ichsan Ramadhan</p>
					</div>
				</div>
			</div>
		</>
	);
}
