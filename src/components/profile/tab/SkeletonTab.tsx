import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

const SkeletonTab = memo(() => {
	return (
		<Skeleton className={"space-y-10 max-md:space-y-5 max-sm:mt-10"}>
			<Skeleton className={"text-4xl max-md:text-xl font-bold"}/>
			<Skeleton className="grid grid-cols-2 place-items-start gap-4 text-neutral-500 text-sm xl:text-xl md:text-lg">
			</Skeleton>
`
			<Skeleton className={"text-4xl font-bold max-md:text-xl"}/>
			<Skeleton
				className="grid grid-cols-2 place-items-start gap-4 even:text-neutral-500 text-sm xl:text-xl md:text-lg">

			</Skeleton>
		</Skeleton>
	);
});

export {SkeletonTab}