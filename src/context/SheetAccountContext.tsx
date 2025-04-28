/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:42 PM - 18/04/2025
 *  User: kimin
 **/
import { createContext } from "react";

export const SheetAccountContext = createContext<{
	setSheetAccount: (show: boolean) => void;
	sheetAccount: boolean;
}>({
	setSheetAccount: () => {},
	sheetAccount: false,
});
