import cn from "@utils/cn";
import { forwardRef, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement>;

export default forwardRef(function Button(
	{ children, className, ...props }: Props,
	ref: React.LegacyRef<HTMLButtonElement> | undefined,
) {
	return (
		<button
			ref={ref}
			type="button"
			className={cn(
				"group grid h-8 w-full grid-cols-[20px_auto_20px] items-center gap-x-2 px-3 text-start hover:bg-neutral-300 focus:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
});
