type Props = JSX.IntrinsicElements["a"];

export default function ({ children, className, ...props }: Props) {
	return (
		<a
			target="_blank"
			className="text-blue-500 underline underline-offset-2 dark:text-blue-400"
			{...props}
		>
			{children}
		</a>
	);
}
