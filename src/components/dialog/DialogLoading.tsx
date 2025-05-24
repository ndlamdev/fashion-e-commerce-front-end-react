/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:55 AM - 18/05/2025
 *  User: Administrator
 **/

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";

function DialogLoading() {
	const open = useSelector((state: RootState) => state.dialog.loading);

	return (
		<Dialog open={open}>
			<DialogContent
				className={
					"data-[state=open]:animate-in data-[state=closed]:animate-out z-999999999 rounded-lg border-none bg-transparent p-6 shadow-none outline-none"
				}
				classIcon={"hidden"}>
				<DialogHeader>
					<DialogTitle className={"text-center text-xl"}></DialogTitle>
					<DialogDescription className={"mt-5 flex w-full gap-5 px-10"}> </DialogDescription>
					<div className={"flex justify-center"}>
						<HashLoader size={75} />
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default DialogLoading;
