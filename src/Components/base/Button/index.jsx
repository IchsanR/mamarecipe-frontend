export default function Button({ type, className, description, ...params }) {
	return (
		<button
			type={type}
			className={className}
			{...params}>
			{description}
		</button>
	);
}
