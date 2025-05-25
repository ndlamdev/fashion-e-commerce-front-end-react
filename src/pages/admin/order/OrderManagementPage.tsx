import { InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export default function OrderManagementPage() {
	return (
		<main>
			<header className={""}>
				<div className="flex justify-between items-end">
					<p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
						<InboxIcon className={'size-4 sm:size-6 lg:size-8'} />
						<span className={"font-bold "}>Orders</span>
					</p>
					<div className="flex items-center space-x-2 text-center">
						<Button variant={"outline"} className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>Export</Button>
						<Button className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>Create Order</Button>
					</div>
				</div>
			</header>
		</main>
	)
}