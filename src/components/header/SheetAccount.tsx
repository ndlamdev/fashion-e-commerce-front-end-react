/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:34PM - 30/03/2025
 *  User: lam-nguyen
 **/
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { hiddenSheet } from "@/redux/slice/sheet.slice.ts";

function SheetAccount() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<SheetContent className={"px-5"}>
			<SheetHeader>
				<SheetTitle>Sheet Account</SheetTitle>
				<SheetDescription>Description sheet account</SheetDescription>
			</SheetHeader>
			<div className='grid gap-4 rounded-4xl border-1 border-green-500 py-4'>
				<button
					className={"px-4 py-2"}
					onClick={() => {
						dispatch(hiddenSheet());
						navigate("/test");
					}}>
					Change page test
				</button>
			</div>
			<SheetFooter>
				<SheetClose asChild>
					<Button type='submit'>Footer Sheet Account</Button>
				</SheetClose>
			</SheetFooter>
		</SheetContent>
	);
}

export default SheetAccount;