import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { hiddenDialog } from "@/redux/slice/dialog.slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import Address from "@/components/profile/tab/AddressTab.tsx";

export default function AddressManagementDialog() {
	const dispatch = useDispatch();
	const {dialog} = useSelector((state:RootState) => state.dialog);

	return (
		<Dialog open={dialog === 'manage-addresses'} onOpenChange={() => dispatch(hiddenDialog())}>
			<DialogContent classIcon={"bg-black text-white p-2 sm:p-5 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 "}>
				<DialogTitle />
				<DialogDescription>
					<ScrollArea className={'max-h-[50hw] overflow-y-auto'}>
						<Address />
					</ScrollArea>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}