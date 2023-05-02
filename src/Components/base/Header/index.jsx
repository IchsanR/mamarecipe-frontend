export default function Header({ description, aos, aosDuration }) {
	return (
		<header
			data-aos={aos}
			data-aos-duration={aosDuration}>
			<h1 className="lg:tw-border-l-[#EFC81A] lg:tw-border-l-[15px] tw-text-center tw-font-semibold lg:tw-text-left tw-my-7 lg:tw-pl-3">
				{description}
			</h1>
		</header>
	);
}
