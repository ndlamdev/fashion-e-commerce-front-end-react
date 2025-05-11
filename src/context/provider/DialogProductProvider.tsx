import { ReactNode, useState } from "react";
import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import { Dialog } from "@/components/ui/dialog.tsx";
import ReferFriendDialog from "@/components/product-detail/dialog/ReferFriendDialog.tsx";
import { DialogProductContext } from "@/context/dialogProductContext.props.ts";
import GuideChooseSizeDialog from "@/components/product-detail/dialog/GuideChooseSizeDialog.tsx";

export const DialogProductProvider = ({ children }: { children: ReactNode }) => {
	const [dialog, setDialog] = useState<DialogTypeEnum>("none");
	const renderContent = (dialog: DialogTypeEnum): ReactNode => {
		switch (dialog) {
			case "none":
				return <></>;
			case "refer-friend":
				return <ReferFriendDialog/>;
			case "guide-choose-size":
				return <GuideChooseSizeDialog />;
		}
	}
	return (
		<DialogProductContext.Provider
			value={{
				showDialog: (type) => setDialog(type),
				dialog: dialog,
			}}
		>
			<Dialog open={dialog !== "none"} onOpenChange={(value) => !value && setDialog("none")}>
				{children}
				{renderContent(dialog)}
			</Dialog>
		</DialogProductContext.Provider>
	);
}