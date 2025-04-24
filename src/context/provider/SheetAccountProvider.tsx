/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:43 PM - 18/04/2025
 *  User: kimin
 **/
import { SheetAccountContext } from "@/context/SheetAccountContext.tsx";
import { ReactNode, useState } from "react";
import SheetAccount from "@/components/header/SheetAccount.tsx";
import { Sheet } from "@/components/ui/sheet.tsx";

function SheetAccountProvider({ children }: { children: ReactNode }) {
	const [sheetAccount, setSheetAccount] = useState(false);
	return (
		<SheetAccountContext.Provider
			value={{
				sheetAccount: sheetAccount,
				setSheetAccount: setSheetAccount,
			}}>
			<Sheet open={sheetAccount} onOpenChange={(value) => setSheetAccount(value)}>
				{children}
				<SheetAccount />
			</Sheet>
		</SheetAccountContext.Provider>
	);
}

export default SheetAccountProvider;
