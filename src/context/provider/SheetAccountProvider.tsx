/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:43 PM - 18/04/2025
 *  User: kimin
 **/
import { ReactNode, useEffect, useState } from "react";
import SheetAccount from "@/components/header/SheetAccount.tsx";
import SheetFileSearch from "@/components/header/SheetFileSearch.tsx";
import { Sheet } from "@/components/ui/sheet.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { hiddenSheet } from "@/redux/slice/sheet.slice.ts";

export type SheetType = "ACCOUNT" | "FILE_SEARCH" | "NONE";

function SheetAccountProvider({ children }: { children: ReactNode }) {
	const { sheetType } = useSelector((state: RootState) => state.sheet);
	const dispatch = useDispatch();
	const [listElements, setListElements] = useState<ReactNode>();

	useEffect(() => {
		switch (sheetType) {
			case "ACCOUNT":
				setListElements(<SheetAccount />);
				break;
			case "FILE_SEARCH":
				setListElements(<SheetFileSearch />);
				break;
			case "NONE":
		}
	}, [sheetType]);

	return (
		<Sheet open={sheetType !== "NONE"} onOpenChange={(value) => !value && dispatch(hiddenSheet())}>
			{children}
			{listElements}
		</Sheet>
	);
}

export default SheetAccountProvider;
